import { useState, FormEvent, ChangeEvent } from "react";
import emailjs from "emailjs-com";
import {
  MailCheck,
  PhoneCall,
  MessageSquareText,
  MapPinned,
  Linkedin,
  Github,
  SendHorizonal,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    robotField: "", // Honeypot
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // ✋ Bot detected via honeypot
    if (formData.robotField !== "") {
      console.warn("Spam detected. Submission blocked.");
      return;
    }

    // Sanitize input
    const sanitize = (text: string) =>
      text.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();

    const name = sanitize(formData.name);
    const email = formData.email.trim();
    const subject = sanitize(formData.subject);
    const message = sanitize(formData.message);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    // Required field check
    if (!name || !email || !subject || !message) {
      alert("❌ All fields are required.");
      return;
    }

    try {
      await emailjs.send(
        "service_btdlks9",
        "template_6g4f9jq",
        {
          name,
          email,
          subject,
          message,
          time: new Date().toLocaleString(),
        },
        "4pQMNQFnQL-koPcxW"
      );

      alert("✅ Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", subject: "", message: "", robotField: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send message. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to discuss quality assurance strategies or explore
            collaboration opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Get In Touch
            </h3>
            <ul className="space-y-6">
              {[
                {
                  icon: <MailCheck className="text-blue-600" size={24} />,
                  label: "Email",
                  value: "atiarmridul@gmail.com",
                  href: "mailto:atiarmridul@gmail.com",
                },
                {
                  icon: <PhoneCall className="text-green-600" size={24} />,
                  label: "Phone",
                  value: "+880 1916204614",
                  href: "tel:+8801916204614",
                },
                {
                  icon: <MessageSquareText className="text-green-500" size={24} />,
                  label: "WhatsApp",
                  value: "Chat on WhatsApp",
                  href: "https://wa.me/8801916204614",
                },
                {
                  icon: <MapPinned className="text-purple-600" size={24} />,
                  label: "Location",
                  value: "Dhaka, Bangladesh",
                },
              ].map(({ icon, label, value, href }) => (
                <li key={label} className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{label}</h4>
                    {href ? (
                      <a
                        href={href}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
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

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">
                Connect with me
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/atiarmridul/"
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/atiarmridul"
                  className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">Send Message</h3>

            {/* Honeypot Field */}
            <input
              type="text"
              name="robotField"
              value={formData.robotField}
              onChange={handleChange}
              autoComplete="off"
              className="hidden"
              tabIndex={-1}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
              ].map(({ id, label, type }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {[
              { id: "subject", label: "Subject" },
              { id: "message", label: "Message", textarea: true },
            ].map(({ id, label, textarea }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {label}
                </label>
                {textarea ? (
                  <textarea
                    id={id}
                    name={id}
                    rows={6}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    id={id}
                    name={id}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center space-x-2"
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
