// Contact form → email via Resend. Runs on the server (a Vercel function), so the API key never reaches the browser.
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } from 'astro:env/server';
import { INQUIRY } from '../../data/site';
import { clean, validate, headerSafe, escapeHtml } from '../../lib/contact';

export const prerender = false;

export const POST: APIRoute = async ({ request, url, redirect }) => {
  // The page's script asks for JSON. A plain form post (JavaScript off) gets sent back to the contact page instead.
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const reply = (body: Record<string, unknown>, status = 200) =>
    wantsJson
      ? new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
      : redirect(body.ok ? '/contact?sent=1#sent' : '/contact?error=1#send-error', 303);

  // Only accept posts from this site's own pages (blocks other sites from sending through the form).
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return reply({ ok: false, error: 'Forbidden' }, 403);

  let data: FormData;
  try { data = await request.formData(); } catch { return reply({ ok: false, error: 'Invalid form data' }, 400); }

  // Honeypot: real visitors never see or fill this field, bots usually do. Pretend it worked.
  if (String(data.get('company') ?? '').trim()) return reply({ ok: true });

  const e = clean((k) => data.get(k));
  const errors = validate(e, INQUIRY);
  if (Object.keys(errors).length) return reply({ ok: false, errors }, 422);

  if (!RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set');
    return reply({ ok: false, error: 'Email is not configured' }, 500);
  }

  const name = headerSafe(e.name);
  const rows: [string, string][] = [['Name', e.name], ['Email', e.email], ['Project type', e.type], ['Website / reference', e.url || '—']];
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#17192B">
      <h2 style="margin:0 0 16px">New enquiry from raveen.design</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows.map(([k, val]) => `<tr><td style="color:#666;vertical-align:top">${k}</td><td>${escapeHtml(val)}</td></tr>`).join('')}
      </table>
      <h3 style="margin:24px 0 8px">Project summary</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(e.summary)}</p>
    </div>`;
  const text = rows.map(([k, val]) => `${k}: ${val}`).join('\n') + `\n\nProject summary:\n${e.summary}`;

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    // Name and type are cleaned for header use; the address already passed the email check (no spaces, one @).
    replyTo: `${name} <${e.email}>`,
    subject: `New enquiry: ${e.type} — ${name}`,
    html,
    text,
  });
  if (error) {
    console.error('[contact] Resend error', error);
    return reply({ ok: false, error: 'Could not send email' }, 502);
  }
  return reply({ ok: true });
};
