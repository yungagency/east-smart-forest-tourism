'use client';
import { useEffect, useState, useCallback } from 'react';
import { getSupabase, hasSupabase } from '@/lib/supabase';
import { SEED_SITES, SEED_OPPORTUNITIES, CATEGORIES } from '@/lib/seed';

const SITE_FIELDS = [
  ['slug', 'Identifiant URL (slug)', 'text'],
  ['name_fr', 'Nom (FR)', 'text'], ['name_en', 'Nom (EN)', 'text'],
  ['category', 'Catégorie', 'select', CATEGORIES],
  ['commune', 'Commune', 'text'], ['departement', 'Département', 'text'],
  ['lat', 'Latitude', 'number'], ['lng', 'Longitude', 'number'],
  ['coords_approx', 'Position approximative', 'checkbox'],
  ['summary_fr', 'Résumé (FR)', 'textarea'], ['summary_en', 'Résumé (EN)', 'textarea'],
  ['description_fr', 'Description (FR)', 'textarea'], ['description_en', 'Description (EN)', 'textarea'],
  ['access_fr', 'Accès (FR)', 'text'], ['access_en', 'Accès (EN)', 'text'],
  ['image_url', 'Photo', 'image'],
  ['image_credit', 'Crédit photo (auteur · licence)', 'text'],
  ['image_source', 'Lien source de la photo', 'text'],
  ['sources', 'Sources (une URL par ligne)', 'list'],
  ['status', 'Statut', 'select', ['a_verifier', 'verifie']],
  ['limited', 'Informations limitées (« à documenter »)', 'checkbox'],
  ['featured', 'À la une', 'checkbox'], ['published', 'Publié', 'checkbox'],
  ['sort', 'Ordre', 'number'],
];
const OPP_FIELDS = [
  ['slug', 'Identifiant URL (slug)', 'text'],
  ['title_fr', 'Titre (FR)', 'text'], ['title_en', 'Titre (EN)', 'text'],
  ['sector', 'Secteur', 'text'], ['location', 'Localisation', 'text'],
  ['summary_fr', 'Résumé (FR)', 'textarea'], ['summary_en', 'Résumé (EN)', 'textarea'],
  ['sources', 'Sources (une URL par ligne)', 'list'],
  ['status', 'Statut', 'select', ['a_valider', 'validee']],
  ['published', 'Publié', 'checkbox'], ['sort', 'Ordre', 'number'],
];

const slugify = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Admin() {
  const sb = getSupabase();
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [tab, setTab] = useState('sites');

  useEffect(() => {
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [sb]);

  useEffect(() => {
    if (!sb || !session) { setIsAdmin(null); return; }
    sb.from('admins').select('user_id').eq('user_id', session.user.id).maybeSingle()
      .then(({ data }) => setIsAdmin(Boolean(data)));
  }, [sb, session]);

  if (!hasSupabase) {
    return (
      <Shell>
        <div className="panel">
          <h2>Base de données non connectée</h2>
          <p>Le site tourne en mode démo avec les fiches intégrées. Pour activer l’administration, renseignez <code>NEXT_PUBLIC_SUPABASE_URL</code> et <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> dans Vercel, puis redéployez.</p>
        </div>
      </Shell>
    );
  }
  if (!session) return <Shell><Login sb={sb} /></Shell>;
  if (isAdmin === null) return <Shell><p>Chargement…</p></Shell>;
  if (!isAdmin) {
    return (
      <Shell onLogout={() => sb.auth.signOut()}>
        <div className="panel">
          <h2>Accès non autorisé</h2>
          <p>Ce compte ({session.user.email}) n’est pas administrateur. Identifiant à ajouter dans la table <code>admins</code> :</p>
          <code style={{ wordBreak: 'break-all' }}>{session.user.id}</code>
        </div>
      </Shell>
    );
  }

  return (
    <Shell email={session.user.email} onLogout={() => sb.auth.signOut()}>
      <div className="tabs">
        {[['sites', 'Destinations'], ['opportunities', 'Opportunités'], ['messages', 'Messages'], ['booking_requests', 'Réservations'], ['provider_applications', 'Prestataires'], ['proposals', 'Propositions']].map(([k, l]) => (
          <button key={k} className={`chip ${tab === k ? 'on' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'sites' && <Collection sb={sb} table="sites" fields={SITE_FIELDS} seed={SEED_SITES} titleKey="name_fr" />}
      {tab === 'opportunities' && <Collection sb={sb} table="opportunities" fields={OPP_FIELDS} seed={SEED_OPPORTUNITIES} titleKey="title_fr" />}
      {tab === 'messages' && <Messages sb={sb} />}
      {['booking_requests', 'provider_applications', 'proposals'].includes(tab) && <Inbox key={tab} sb={sb} table={tab} />}
    </Shell>
  );
}

function Shell({ children, email, onLogout }) {
  return (
    <div className="admin">
      <div className="admin-top">
        <div className="wrap">
          <strong style={{ letterSpacing: '.12em' }}>EAST · Admin</strong>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: '.88rem' }}>
            <a href="/fr" target="_blank" rel="noreferrer">Voir le site ↗</a>
            {email && <span style={{ opacity: 0.7 }}>{email}</span>}
            {onLogout && <button className="btn btn-ghost" style={{ padding: '6px 12px' }} onClick={onLogout}>Déconnexion</button>}
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingTop: 24, paddingBottom: 60 }}>{children}</div>
    </div>
  );
}

function Login({ sb }) {
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true); setErr('');
    const { error } = await sb.auth.signInWithPassword({ email: f.get('email'), password: f.get('password') });
    setBusy(false);
    if (error) setErr('Connexion impossible : vérifiez l’email et le mot de passe.');
  }
  return (
    <div className="panel" style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Connexion</h2>
      <form className="form" onSubmit={submit}>
        <label>Email<input name="email" type="email" required autoComplete="username" /></label>
        <label>Mot de passe<input name="password" type="password" required autoComplete="current-password" /></label>
        {err && <div className="alert alert-err">{err}</div>}
        <button className="btn btn-dark" disabled={busy}>{busy ? 'Connexion…' : 'Se connecter'}</button>
      </form>
    </div>
  );
}

function Collection({ sb, table, fields, seed, titleKey }) {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState('');
  const load = useCallback(async () => {
    const { data, error } = await sb.from(table).select('*').order('sort', { ascending: true });
    if (error) setMsg(error.message); else setRows(data || []);
  }, [sb, table]);
  useEffect(() => { load(); }, [load]);

  async function importSeed() {
    const { error } = await sb.from(table).upsert(seed, { onConflict: 'slug' });
    setMsg(error ? error.message : 'Fiches de départ importées.');
    load();
  }
  async function remove(r) {
    if (!window.confirm(`Supprimer « ${r[titleKey]} » ?`)) return;
    const { error } = await sb.from(table).delete().eq('id', r.id);
    setMsg(error ? error.message : 'Supprimé.');
    load();
  }

  if (editing) {
    return <Editor sb={sb} table={table} fields={fields} row={editing} onDone={(m) => { setEditing(null); setMsg(m || ''); load(); }} />;
  }
  return (
    <>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        <button className="btn btn-dark" onClick={() => setEditing({})}>+ Ajouter</button>
        {rows.length === 0 && <button className="btn btn-outline" onClick={importSeed}>Importer les fiches de départ ({seed.length})</button>}
      </div>
      {msg && <div className="alert alert-ok" style={{ marginBottom: 12 }}>{msg}</div>}
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Titre</th><th>Statut</th><th>Publié</th><th></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td><b>{r[titleKey]}</b><div className="small muted">{r.commune || r.location || ''}</div></td>
                <td><span className={`badge ${r.status === 'verifie' || r.status === 'validee' ? 'badge-ok' : 'badge-warn'}`}>{r.status}</span></td>
                <td>{r.published ? 'Oui' : 'Non'}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <button className="link-btn" onClick={() => setEditing(r)}>Modifier</button>{' · '}
                  <button className="link-btn danger" onClick={() => remove(r)}>Supprimer</button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={4} className="muted">Aucun élément pour l’instant.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Editor({ sb, table, fields, row, onDone }) {
  const [v, setV] = useState(() => {
    const init = { published: true, status: table === 'sites' ? 'a_verifier' : 'a_valider', sort: 0, coords_approx: true, featured: false, ...row };
    if (Array.isArray(init.sources)) init.sources = init.sources.join('\n');
    return init;
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k, val) => setV((o) => ({ ...o, [k]: val }));

  async function upload(file) {
    if (!file) return;
    setBusy(true); setErr('');
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `${table}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await sb.storage.from('media').upload(path, file, { upsert: false, contentType: file.type });
    if (error) setErr(error.message);
    else set('image_url', sb.storage.from('media').getPublicUrl(path).data.publicUrl);
    setBusy(false);
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true); setErr('');
    const payload = { ...v };
    delete payload.id; delete payload.created_at; delete payload.updated_at;
    payload.slug = slugify(payload.slug || payload.name_fr || payload.title_fr);
    payload.sources = String(payload.sources || '').split('\n').map((s) => s.trim()).filter(Boolean);
    for (const [k, , type] of fields) {
      if (type === 'number') payload[k] = payload[k] === '' || payload[k] == null ? null : Number(payload[k]);
    }
    if (payload.sort == null) payload.sort = 0;
    const q = row.id ? sb.from(table).update(payload).eq('id', row.id) : sb.from(table).insert(payload);
    const { error } = await q;
    setBusy(false);
    if (error) setErr(error.message); else onDone('Enregistré.');
  }

  return (
    <form className="panel form" onSubmit={save}>
      <h2 style={{ marginBottom: 4 }}>{row.id ? 'Modifier' : 'Ajouter'}</h2>
      {fields.map(([k, label, type, opts]) => {
        if (type === 'textarea') return <label key={k}>{label}<textarea value={v[k] || ''} onChange={(e) => set(k, e.target.value)} /></label>;
        if (type === 'list') return <label key={k}>{label}<textarea style={{ minHeight: 80 }} value={v[k] || ''} onChange={(e) => set(k, e.target.value)} /></label>;
        if (type === 'select') return <label key={k}>{label}<select value={v[k] || opts[0]} onChange={(e) => set(k, e.target.value)}>{opts.map((o) => <option key={o}>{o}</option>)}</select></label>;
        if (type === 'checkbox') return <label key={k} style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" style={{ width: 'auto' }} checked={Boolean(v[k])} onChange={(e) => set(k, e.target.checked)} />{label}</label>;
        if (type === 'image') return (
          <label key={k}>{label}
            {v.image_url && <img src={v.image_url} alt="" style={{ maxWidth: 260, borderRadius: 10 }} />}
            <input type="file" accept="image/*" onChange={(e) => upload(e.target.files?.[0])} />
            {v.image_url && <button type="button" className="link-btn danger" style={{ justifySelf: 'start' }} onClick={() => set('image_url', null)}>Retirer la photo</button>}
            <span className="small muted">N’utilisez que des photos dont vous avez les droits (auteur crédité ou autorisation écrite).</span>
          </label>
        );
        return <label key={k}>{label}<input type={type} step={type === 'number' ? 'any' : undefined} value={v[k] ?? ''} onChange={(e) => set(k, e.target.value)} /></label>;
      })}
      {err && <div className="alert alert-err">{err}</div>}
      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-dark" disabled={busy}>{busy ? '…' : 'Enregistrer'}</button>
        <button type="button" className="btn btn-outline" onClick={() => onDone('')}>Annuler</button>
      </div>
    </form>
  );
}

function Messages({ sb }) {
  const [rows, setRows] = useState([]);
  const load = useCallback(async () => {
    const { data } = await sb.from('messages').select('*').order('created_at', { ascending: false });
    setRows(data || []);
  }, [sb]);
  useEffect(() => { load(); }, [load]);
  async function remove(id) {
    if (!window.confirm('Supprimer ce message ?')) return;
    await sb.from('messages').delete().eq('id', id);
    load();
  }
  return (
    <div className="table-wrap">
      <table className="table">
        <thead><tr><th>Date</th><th>Contact</th><th>Objet</th><th>Message</th><th></th></tr></thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.id}>
              <td className="small">{new Date(m.created_at).toLocaleString('fr-FR')}</td>
              <td><b>{m.name}</b><div className="small"><a href={`mailto:${m.email}`}>{m.email}</a></div>{m.organization && <div className="small muted">{m.organization}</div>}</td>
              <td>{m.subject}</td>
              <td style={{ whiteSpace: 'pre-wrap', maxWidth: 420 }}>{m.message}</td>
              <td><button className="link-btn danger" onClick={() => remove(m.id)}>Supprimer</button></td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={5} className="muted">Aucun message.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

// Demandes reçues : réservations, inscriptions de prestataires, propositions (projets, terrains, partenariats)
const SKIP = ['id', 'created_at'];
function Inbox({ sb, table }) {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState('');
  const load = useCallback(async () => {
    const { data, error } = await sb.from(table).select('*').order('created_at', { ascending: false });
    if (error) setErr(`${error.message} (table « ${table} » : exécutez la dernière version de supabase/schema.sql)`);
    setRows(data || []);
  }, [sb, table]);
  useEffect(() => { load(); }, [load]);
  async function remove(id) {
    if (!window.confirm('Supprimer cette demande ?')) return;
    await sb.from(table).delete().eq('id', id);
    load();
  }
  return (
    <div className="table-wrap">
      {err && <div className="alert alert-err">{err}</div>}
      <table className="table">
        <thead><tr><th>Date</th><th>Détails</th><th></th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="small">{new Date(r.created_at).toLocaleString('fr-FR')}</td>
              <td style={{ maxWidth: 640 }}>
                {Object.entries(r).filter(([k, v]) => !SKIP.includes(k) && v !== null && v !== '').map(([k, v]) => (
                  <div key={k} className="small"><b>{k}</b> : <span style={{ whiteSpace: 'pre-wrap' }}>{typeof v === 'boolean' ? (v ? 'oui' : 'non') : String(v)}</span></div>
                ))}
              </td>
              <td><button className="link-btn danger" onClick={() => remove(r.id)}>Supprimer</button></td>
            </tr>
          ))}
          {rows.length === 0 && !err && <tr><td colSpan={3} className="muted">Aucune demande.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
