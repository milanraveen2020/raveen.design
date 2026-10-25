// Contact form → email via Resend. Runs on the server (a Vercel function), so the API key never reaches the browser.
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } from 'astro:env/server';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const POST: APIRoute = async ({ request }) => {
  let data: FormData;
  try { data = await request.formData(); } catch { return json({ ok: false, error: 'Invalid form data' }, 400); }
  const v = (k: string, max = 5000) => String(data.get(k) ?? '').trim().slice(0, max);

  // Honeypot: real visitors never see or fill this field, bots usually do. Pretend it worked.
  if (v('company')) return json({ ok: true });

  const name = v('name', 120), email = v('email', 200), type = v('type', 120), summary = v('summary'), url = v('url', 500);
  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Please enter your name';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = 'Please enter a valid email address';
  if (!type) errors.type = 'Please choose a project type';
  if (summary.length < 10) errors.summary = 'Please add a short project summary';
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  if (!RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set');
    return json({ ok: false, error: 'Email is not configured' }, 500);
  }

  const rows: [string, string][] = [['Name', name], ['Email', email], ['Project type', type], ['Website / reference', url || '—']];
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#17192B">
      <h2 style="margin:0 0 16px">New enquiry from raveen.design</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows.map(([k, val]) => `<tr><td style="color:#666;vertical-align:top">${k}</td><td>${escape(val)}</td></tr>`).join('')}
      </table>
      <h3 style="margin:24px 0 8px">Project summary</h3>
      <p style="white-space:pre-wrap;margin:0">${escape(summary)}</p>
    </div>`;
  const text = rows.map(([k, val]) => `${k}: ${val}`).join('\n') + `\n\nProject summary:\n${summary}`;

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    replyTo: `${name} <${email}>`,
    subject: `New enquiry: ${type} — ${name}`,
    html,
    text,
  });
  if (error) {
    console.error('[contact] Resend error', error);
    return json({ ok: false, error: 'Could not send email' }, 502);
  }
  return json({ ok: true });
};
