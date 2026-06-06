import { useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from 'emailjs-com';

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const isEmailJsConfigured = Object.values(emailJsConfig).every(Boolean);
const CONTACT_LIMITS = {
  name: 80,
  subject: 120,
  message: 1000,
} as const;

const contactLinks = [
  { id: 'email', label: '✉ atiarmridul@gmail.com', href: 'mailto:atiarmridul@gmail.com' },
  { id: 'github', label: '↗ GitHub', href: 'https://github.com/atiarmridul' },
  { id: 'linkedin', label: '↗ LinkedIn', href: 'https://www.linkedin.com/in/atiarmridul/' },
  { id: 'whatsapp', label: '↗ WhatsApp', href: 'https://wa.me/8801916204614' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    robotField: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Hidden honeypot field blocks basic bot submissions without adding friction.
    if (formData.robotField !== '') {
      console.warn('Spam detected. Submission blocked.');
      return;
    }

    if (!isEmailJsConfigured) {
      alert('Contact form is not configured yet.');
      return;
    }

    const sanitize = (text: string) => text.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();

    const name = sanitize(formData.name);
    const email = formData.email.trim();
    const subject = sanitize(formData.subject);
    const message = sanitize(formData.message);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!name || !email || !subject || !message) {
      alert('All fields are required.');
      return;
    }

    try {
      await emailjs.send(
        emailJsConfig.serviceId!,
        emailJsConfig.templateId!,
        { name, email, subject, message, time: new Date().toLocaleString() },
        emailJsConfig.publicKey!,
      );

      alert('Thank you. Your message has been sent.');
      setFormData({ name: '', email: '', subject: '', message: '', robotField: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <section className="section contact wrap" id="contact" data-testid="section-contact">
      <span className="eyebrow reveal">Contact</span>
      <h2 className="contact-big reveal" data-d="1" style={{ marginTop: 24 }}>
        Let&apos;s ship
        <br />
        quality{' '}
        <a
          href="mailto:atiarmridul@gmail.com"
          data-testid="contact-heading-email-link"
          aria-label="Email Atiar Rahman Chowdhury"
          data-mag
        >
          <span className="underline">together</span> →
        </a>
      </h2>

      <div className="contact-links reveal" data-d="2">
        {contactLinks.map((c) => (
          <a
            key={c.id}
            className="contact-link"
            href={c.href}
            target={c.href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            data-testid={`contact-${c.id}-link`}
            data-mag
          >
            {c.label}
          </a>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="reveal"
        data-d="2"
        data-testid="contact-form"
        style={{
          marginTop: 'clamp(48px, 7vw, 80px)',
          maxWidth: 720,
          display: 'grid',
          gap: 20,
        }}
      >
        <input
          type="text"
          name="robotField"
          value={formData.robotField}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          style={{ display: 'none' }}
          data-testid="contact-honeypot-field"
        />

        <div
          style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
        >
          {(
            [
              { id: 'name', label: 'Name', type: 'text' },
              { id: 'email', label: 'Email', type: 'email' },
            ] as const
          ).map(({ id, label, type }) => (
            <div key={id} data-testid={`contact-field-${id}`}>
              <label htmlFor={id} className="field-label">
                {label}
              </label>
              <input
                className="field-input"
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                required
                maxLength={id === 'name' ? CONTACT_LIMITS.name : undefined}
                data-testid={`contact-${id}-input`}
              />
            </div>
          ))}
        </div>

        <div data-testid="contact-field-subject">
          <label htmlFor="subject" className="field-label">
            Subject
          </label>
          <input
            className="field-input"
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            maxLength={CONTACT_LIMITS.subject}
            data-testid="contact-subject-input"
          />
        </div>

        <div data-testid="contact-field-message">
          <label htmlFor="message" className="field-label">
            Message
          </label>
          <textarea
            className="field-input"
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={CONTACT_LIMITS.message}
            data-testid="contact-message-textarea"
            style={{ resize: 'vertical' }}
          />
        </div>

        <button type="submit" className="btn btn-primary" data-testid="contact-submit-button" data-mag>
          Send message <span className="arr">→</span>
        </button>
      </form>
    </section>
  );
};

export default Contact;
