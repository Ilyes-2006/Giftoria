import { useState, useEffect, useRef } from "react";
import "./ContactUs.css";
import PageHero from "../../components/UI/PageHero/PageHero";

export default function ContactUs({ user }) {
  const [form, setForm] = useState({
    fullName: "",
    subject: "",
    message: "",
  });
  // email is derived from the logged-in user; only editable when logged out
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  // Pre-fill full name when user is available
  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, fullName: user.username || user.name || "" }));
      setEmailInput(user.email || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const email = user ? user.email : emailInput;

    if (!form.fullName || !email || !form.subject || !form.message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setShowSuccess(true);
      setForm({ fullName: user?.username || "", subject: "", message: "" });
      if (!user) setEmailInput("");
      // auto-dismiss after 4 s
      timerRef.current = setTimeout(() => setShowSuccess(false), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeSuccess = () => {
    clearTimeout(timerRef.current);
    setShowSuccess(false);
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

            {/* Email: auto-filled & read-only when logged in */}
            <div className="contactUs-input">
              <label htmlFor="email">
                Email
                {user && (
                  <span className="contactUs-email-badge">
                    ✓ Using your account email
                  </span>
                )}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={user ? user.email : emailInput}
                onChange={user ? undefined : (e) => setEmailInput(e.target.value)}
                readOnly={!!user}
                placeholder={user ? "" : "your@email.com"}
                className={user ? "contactUs-email-readonly" : ""}
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

            {/* Inline error only */}
            {error && (
              <div className="contactUs-status error">
                ❌ {error}
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

        {/* ── Success overlay modal ── */}
        {showSuccess && (
          <div className="contactUs-success-overlay" onClick={closeSuccess}>
            <div className="contactUs-success-modal" onClick={(e) => e.stopPropagation()}>
              <div className="contactUs-success-icon">✉️</div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
              <button className="contactUs-success-close" onClick={closeSuccess}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* ── Info Sidebar ── */}
        <div className="contactUs-card info-sidebar">
          <div className="contactUs-info">
            <div className="contactUs-info-title">
              <i className="fas fa-envelope"></i>
              <h4>Email</h4>
            </div>
            <p>salahilyes194@gmail.com</p>
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
