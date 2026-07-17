'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('ok');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  }

  if (status === 'ok') {
    return (
      <p className="form-status ok" style={{ marginTop: 40, fontSize: 15 }}>
        Thanks — we received your message and will follow up shortly.
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="phone">Phone (optional)</label>
        <input id="phone" name="phone" type="tel" />
      </div>
      <div>
        <label htmlFor="message">Tell us about your project</label>
        <textarea id="message" name="message" required />
      </div>
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE →'}
      </button>
      {status === 'error' && <p className="form-status err">{errorMsg}</p>}
    </form>
  );
}
