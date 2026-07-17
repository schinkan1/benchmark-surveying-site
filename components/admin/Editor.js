'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function RepeatingSection({ title, items, setItems, fields, addLabel }) {
  function update(i, key, value) {
    const next = items.slice();
    next[i] = { ...next[i], [key]: value };
    setItems(next);
  }
  function remove(i) {
    setItems(items.filter((_, idx) => idx !== i));
  }
  function add() {
    const blank = Object.fromEntries(fields.map((f) => [f.key, '']));
    setItems([...items, blank]);
  }

  return (
    <div className="admin-card">
      <h2>{title}</h2>
      {items.map((item, i) => (
        <div className="admin-repeat-item" key={i}>
          <button type="button" className="admin-remove" onClick={() => remove(i)}>
            REMOVE
          </button>
          {fields.map((f) => (
            <div className="admin-field" key={f.key}>
              <label>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={item[f.key] || ''}
                  onChange={(e) => update(i, f.key, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  value={item[f.key] || ''}
                  onChange={(e) => update(i, f.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button type="button" className="admin-add" onClick={add}>
        + {addLabel}
      </button>
    </div>
  );
}

export default function Editor({ initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [leads, setLeads] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/leads')
      .then((r) => r.json())
      .then((d) => setLeads(d.leads || []))
      .catch(() => setLeads([]));
  }, []);

  function updateHero(key, value) {
    setContent({ ...content, hero: { ...content.hero, [key]: value } });
  }
  function updateContact(key, value) {
    setContent({ ...content, contact: { ...content.contact, [key]: value } });
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed.');
      setSaveMsg('Saved. Changes may take up to a minute to appear on the live site.');
    } catch (err) {
      setSaveMsg(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <h1>Benchmark Surveying — Site Admin</h1>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="/" target="_blank" rel="noreferrer" className="btn-secondary" style={{ borderBottom: 'none' }}>
            View site ↗
          </a>
          <button type="button" className="admin-add" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-card">
          <h2>Hero</h2>
          <div className="admin-field">
            <label>Eyebrow text</label>
            <input value={content.hero.eyebrow} onChange={(e) => updateHero('eyebrow', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Heading</label>
            <input value={content.hero.heading} onChange={(e) => updateHero('heading', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Subheading</label>
            <textarea rows={3} value={content.hero.sub} onChange={(e) => updateHero('sub', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Coordinate — latitude line</label>
            <input value={content.hero.coordLat} onChange={(e) => updateHero('coordLat', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Coordinate — longitude line</label>
            <input value={content.hero.coordLng} onChange={(e) => updateHero('coordLng', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Coordinate — elevation line</label>
            <input value={content.hero.coordElev} onChange={(e) => updateHero('coordElev', e.target.value)} />
          </div>
        </div>

        <RepeatingSection
          title="Services"
          items={content.services}
          setItems={(items) => setContent({ ...content, services: items })}
          addLabel="Add service"
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'desc', label: 'Description', type: 'textarea' },
          ]}
        />

        <RepeatingSection
          title="Process steps"
          items={content.process}
          setItems={(items) => setContent({ ...content, process: items })}
          addLabel="Add step"
          fields={[
            { key: 'tag', label: 'Tag (e.g. BM-1)' },
            { key: 'label', label: 'Label (e.g. RECORDS)' },
            { key: 'title', label: 'Title' },
            { key: 'desc', label: 'Description', type: 'textarea' },
          ]}
        />

        <RepeatingSection
          title="Credentials / stats"
          items={content.stats}
          setItems={(items) => setContent({ ...content, stats: items })}
          addLabel="Add stat"
          fields={[
            { key: 'fig', label: 'Figure (e.g. 31)' },
            { key: 'lbl', label: 'Label (e.g. YEARS LICENSED)' },
          ]}
        />

        <div className="admin-card">
          <h2>Contact info</h2>
          <div className="admin-field">
            <label>Email</label>
            <input value={content.contact.email} onChange={(e) => updateContact('email', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Phone</label>
            <input value={content.contact.phone} onChange={(e) => updateContact('phone', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Address</label>
            <input value={content.contact.address} onChange={(e) => updateContact('address', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Office hours</label>
            <input value={content.contact.hours} onChange={(e) => updateContact('hours', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>License line (shown in footer)</label>
            <input value={content.contact.license} onChange={(e) => updateContact('license', e.target.value)} />
          </div>
        </div>

        <button type="button" className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'SAVING…' : 'SAVE CHANGES →'}
        </button>
        {saveMsg && <p className="form-status ok" style={{ marginTop: 12 }}>{saveMsg}</p>}

        <div className="admin-card" style={{ marginTop: 40 }}>
          <h2>Contact form submissions</h2>
          {leads === null && <p>Loading…</p>}
          {leads && leads.length === 0 && <p>No submissions yet.</p>}
          {leads && leads.length > 0 && (
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td>{new Date(l.created_at).toLocaleString()}</td>
                    <td>{l.name}</td>
                    <td>{l.email}</td>
                    <td>{l.phone || '—'}</td>
                    <td style={{ maxWidth: 280 }}>{l.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
