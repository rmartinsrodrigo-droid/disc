// Recebe o cadastro (stage "start") e o resultado (stage "done") do teste.
// Grava cada um como JSON privado no Vercel Blob.
import { put } from '@vercel/blob';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ID_RE = /^[A-Za-z0-9-]{8,64}$/;
const clip = (v, n) => String(v ?? '').trim().slice(0, n);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'invalid_body' });

  const id = clip(body.id, 64);
  const nome = clip(body.nome, 80);
  const email = clip(body.email, 120).toLowerCase();
  const stage = body.stage === 'done' ? 'done' : 'start';
  if (!ID_RE.test(id) || nome.length < 2 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'invalid_fields' });
  }

  const now = new Date().toISOString();
  const record = stage === 'start'
    ? { id, nome, email, consent: body.consent === true, version: clip(body.version, 20), createdAt: now,
        userAgent: clip(req.headers['user-agent'], 200) }
    : { id, nome, email, version: clip(body.version, 20), finishedAt: now, result: sanitizeResult(body.result) };

  try {
    await put(`${stage === 'start' ? 'leads' : 'results'}/${id}.json`, JSON.stringify(record), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (err) {
    console.error('blob_put_failed', err?.message);
    return res.status(500).json({ error: 'storage_failed' });
  }
  return res.status(200).json({ ok: true });
}

function sanitizeResult(r) {
  if (!r || typeof r !== 'object') return null;
  const num = (v) => (Number.isFinite(+v) ? Math.round(+v) : null);
  const disc = (o) => (o && typeof o === 'object')
    ? { D: num(o.D), I: num(o.I), S: num(o.S), C: num(o.C) } : null;
  return {
    talento: clip(r.talento, 60),
    similaridade: num(r.similaridade),
    natural: clip(r.natural, 4),
    atual: clip(r.atual, 4),
    estrutural: disc(r.estrutural),
    adaptado: disc(r.adaptado),
    confiabilidade: num(r.confiabilidade),
    minutos: num(r.minutos),
  };
}
