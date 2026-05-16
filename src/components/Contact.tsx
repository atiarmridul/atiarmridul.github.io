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
  // Centralized form state for controlled input handling
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    robotField: "", // Honeypot field for spam prevention
  });

  // Updates form state dynamically based on input field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles form validation and email submission workflow
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic bot protection using hidden honeypot field
    if (formData.robotField !== "") {
      console.warn("Spam detected. Submission blocked.");
      return;
    }

    // Sanitizes user input to reduce injection risks
    const sanitize = (text: string) =>
      text.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();

    const name = sanitize(formData.name);
    const email = formData.email.trim();
    const subject = sanitize(formData.subject);
    const message = sanitize(formData.message);

    // Validates email format before submission
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    // Ensures all required fields contain valid values
    if (!name || !email || !subject || !message) {
      alert("❌ All fields are required.");
      return;
    }

    try {
      // Sends email using EmailJS without requiring backend infrastructure
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

      // Clears form after successful submission
      alert("✅ Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", subject: "", message: "", robotField: "" });
    } catch (error) {
      // Error logging helps debugging production email delivery issues
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send message. Please try again later.");
    }
  };

  return (
    // Contact section focused on recruiter communication and networking
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section introduction and collaboration messaging */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to discuss quality assurance strategies or explore
            collaboration opportunities? I'd love to hear from you.
          </p>
        </div>

        {/* Two-column responsive layout for contact info and form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Direct communication methods and professional links */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Get In Touch
            </h3>

            {/* Contact details designed for fast recruiter access */}
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
                  {/* Visual icon container for faster recognition */}
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    {icon}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">{label}</h4>

                    {/* External contact links open in separate tabs for convenience */}
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

            {/* Social media links for professional networking */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">
                Connect with me
              </h4>

              <div className="flex space-x-4">
                {/* LinkedIn profile for professional verification */}
                <a
                  href="https://www.linkedin.com/in/atiarmridul/"
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>

                {/* GitHub profile for technical portfolio visibility */}
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

          {/* Contact form for direct recruiter communication */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">Send Message</h3>

            {/* Hidden anti-spam honeypot field */}
            <input
              type="text"
              name="robotField"
              value={formData.robotField}
              onChange={handleChange}
              autoComplete="off"
              className="hidden"
              tabIndex={-1}
            />

            {/* Responsive input grouping for compact form layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
              ].map(({ id, label, type }) => (
                <div key={id}>
                  {/* Semantic labels improve accessibility and usability */}
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

            {/* Message fields rendered dynamically for maintainability */}
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

            {/* Primary form submission action */}
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
