import { useState } from "react";
import "./ContactUs.css";
import PageHero from "../../components/UI/PageHero/PageHero";

export default function ContactUs() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text: '' }
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // Basic client-side validation
    if (!form.fullName || !form.email || !form.subject || !form.message) {
      setStatus({ type: "error", text: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus({ type: "success", text: data.message });
      setForm({ fullName: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contactUs-page">
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with us"
      />

      <div className="contactUs-main">
        {/* ── Contact Form ── */}
        <div className="contactUs-card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="contactUs-input">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>

            <div className="contactUs-input">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>

            <div className="contactUs-input">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about?"
              />
            </div>

            <div className="contactUs-input">
              <label htmlFor="contactUs-Message">Message</label>
              <textarea
                id="contactUs-Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
              />
            </div>

            {/* Status message */}
            {status && (
              <div className={`contactUs-status ${status.type}`}>
                {status.type === "success" ? "✅ " : "❌ "}
                {status.text}
              </div>
            )}

            <div className="contactUs-form">
              <button
                type="submit"
                className="contactUs-send-message-btn"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        {/* ── Info Sidebar ── */}
        <div className="contactUs-card info-sidebar">
          <div className="contactUs-info">
            <div className="contactUs-info-title">
              <i className="fas fa-envelope"></i>
              <h4>Email</h4>
            </div>
            <p>contact@giftoria.com</p>
          </div>
          <hr />
          <div className="contactUs-info">
            <div className="contactUs-info-title">
              <i className="fas fa-phone-alt"></i>
              <h4>Phone</h4>
            </div>
            <p>+213XXXXXXXXX</p>
          </div>
          <hr />
          <div className="contactUs-info">
            <div className="contactUs-info-title">
              <i className="fas fa-map-marker-alt"></i>
              <h4>Location</h4>
            </div>
            <p>Amizour - Bejaia</p>
          </div>
          <hr />
          <div className="contactUs-workhrs">
            <h4>Working Hours</h4>
            <p>Sunday - Thursday : 8AM - 9PM</p>
            <p>Friday - Sunday : Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
