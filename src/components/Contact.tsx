import { useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from 'emailjs-com';
import {
  Github,
  Linkedin,
  MailCheck,
  MapPinned,
  MessageSquareText,
  PhoneCall,
  SendHorizonal,
} from 'lucide-react';

const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const isEmailJsConfigured = Object.values(emailJsConfig).every(Boolean);

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

    // Hidden honeypot field blocks basic bot submissions without adding friction for real visitors.
    if (formData.robotField !== '') {
      console.warn('Spam detected. Submission blocked.');
      return;
    }

    if (!isEmailJsConfigured) {
      alert('Contact form is not configured yet.');
      return;
    }

    // EmailJS receives plain template params, so trim and neutralize angle brackets before sending.
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
        {
          name,
          email,
          subject,
          message,
          time: new Date().toLocaleString(),
        },
        emailJsConfig.publicKey!,
      );

      alert('Thank you. Your message has been sent.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        robotField: '',
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <section id="contact" data-testid="section-contact" className="bg-white py-24">
      <div className="section-shell">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="section-kicker">Collaboration</span>
          <h2 className="section-title">Let&apos;s Connect</h2>
          <p className="section-copy">
            Ready to discuss quality assurance strategies or explore collaboration opportunities? I&apos;d
            love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="premium-card p-7 sm:p-8">
            <h3 className="mb-3 text-2xl font-black text-slate-950">Get In Touch</h3>
            <p className="mb-8 text-slate-600">
              Available for QA leadership, automation framework design, release quality strategy, and
              product-focused testing collaboration.
            </p>
            <ul className="space-y-6">
              {[
                {
                  icon: <MailCheck className="text-blue-600" size={24} />,
                  label: 'Email',
                  value: 'atiarmridul@gmail.com',
                  href: 'mailto:atiarmridul@gmail.com',
                },
                {
                  icon: <PhoneCall className="text-green-600" size={24} />,
                  label: 'Phone',
                  value: '+880 1916204614',
                  href: 'tel:+8801916204614',
                },
                {
                  icon: <MessageSquareText className="text-green-500" size={24} />,
                  label: 'WhatsApp',
                  value: 'Chat on WhatsApp',
                  href: 'https://wa.me/8801916204614',
                },
                {
                  icon: <MapPinned className="text-purple-600" size={24} />,
                  label: 'Location',
                  value: 'Dhaka, Bangladesh',
                },
              ].map(({ icon, label, value, href }) => (
                <li key={label} className="flex items-center" data-testid={`contact-info-${toTestId(label)}`}>
                  <div className="mr-4 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">{icon}</div>
                  <div>
                    <h4 className="font-black text-slate-950">{label}</h4>
                    {href ? (
                      <a
                        href={href}
                        className="font-semibold text-cyan-700 hover:text-cyan-900"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`contact-info-link-${toTestId(label)}`}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-slate-600">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h4 className="mb-4 font-black text-slate-950">Connect with me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/atiarmridul/"
                  className="rounded-2xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  data-testid="social-link-linkedin"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/atiarmridul"
                  className="rounded-2xl bg-slate-950 p-3 text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  data-testid="social-link-github"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="premium-card space-y-6 p-7 sm:p-8"
            data-testid="contact-form"
          >
            <h3 className="text-2xl font-black text-slate-950">Send Message</h3>

            <input
              type="text"
              name="robotField"
              value={formData.robotField}
              onChange={handleChange}
              autoComplete="off"
              className="hidden"
              tabIndex={-1}
              data-testid="contact-honeypot-field"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                { id: 'name', label: 'Name', type: 'text' },
                { id: 'email', label: 'Email', type: 'email' },
              ].map(({ id, label, type }) => (
                <div key={id} data-testid={`contact-field-${id}`}>
                  <label
                    htmlFor={id}
                    data-testid={`contact-${id}-label`}
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    data-testid={`contact-${id}-input`}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-cyan-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-100"
                  />
                </div>
              ))}
            </div>

            {[
              { id: 'subject', label: 'Subject' },
              { id: 'message', label: 'Message', textarea: true },
            ].map(({ id, label, textarea }) => (
              <div key={id} data-testid={`contact-field-${id}`}>
                <label
                  htmlFor={id}
                  data-testid={`contact-${id}-label`}
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  {label}
                </label>
                {textarea ? (
                  <textarea
                    id={id}
                    name={id}
                    rows={6}
                    data-testid={`contact-${id}-textarea`}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-cyan-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-100"
                  />
                ) : (
                  <input
                    type="text"
                    id={id}
                    name={id}
                    data-testid={`contact-${id}-input`}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-cyan-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-100"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              aria-label="Send contact message"
              data-testid="contact-submit-button"
              className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-slate-950 px-6 py-4 font-black text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-cyan-700"
            >
              <SendHorizonal size={18} />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
