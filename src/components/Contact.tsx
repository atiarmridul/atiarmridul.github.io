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
  // Centralized form state for controlled input handling.
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
    <section id="contact" data-testid="section-contact" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Let&apos;s Connect</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Ready to discuss quality assurance strategies or explore collaboration opportunities? I&apos;d
            love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-8 text-2xl font-bold text-gray-900">Get In Touch</h3>
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
                  <div className="mr-4 rounded-full bg-gray-100 p-3">{icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{label}</h4>
                    {href ? (
                      <a
                        href={href}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`contact-info-link-${toTestId(label)}`}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-600">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="mb-4 font-semibold text-gray-900">Connect with me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/atiarmridul/"
                  className="rounded-full bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  data-testid="social-link-linkedin"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/atiarmridul"
                  className="rounded-full bg-gray-800 p-3 text-white transition-colors hover:bg-gray-900"
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
            className="space-y-6 rounded-xl bg-white p-8 shadow-lg"
            data-testid="contact-form"
          >
            <h3 className="text-2xl font-bold text-gray-900">Send Message</h3>

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
                    className="mb-2 block text-sm font-medium text-gray-700"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="mb-2 block text-sm font-medium text-gray-700"
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
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              aria-label="Send contact message"
              data-testid="contact-submit-button"
              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-800 px-6 py-3 text-white transition-colors hover:bg-blue-900"
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
