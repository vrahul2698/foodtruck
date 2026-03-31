import { useState } from "react";

const channels = [
  { icon: "💬", label: "Live Chat", desc: "Avg. response < 2 min", badge: "Fastest", color: "orange" },
  { icon: "📞", label: "Call Us", desc: "+91 98765 43210", badge: "9am–11pm", color: "blue" },
  { icon: "📧", label: "Email", desc: "support@foodtruck.com", badge: "24–48 hrs", color: "purple" },
  { icon: "📱", label: "WhatsApp", desc: "+91 98765 43210", badge: "Popular", color: "green" },
];

const faqs = [
  { q: "Where is my order?", a: "Track your order in real-time via the Orders tab. If tracking hasn't updated in 30+ minutes, contact us with your Order ID." },
  { q: "Can I change my delivery address?", a: "Address changes are only possible before the restaurant accepts your order. Contact us immediately after placing the order." },
  { q: "My food arrived cold / incorrect", a: "We're sorry! Report the issue via the app within 24 hours — go to Orders → Report Issue. We'll investigate and process a refund if applicable." },
  { q: "How do I cancel my order?", a: "Cancellations are possible only before the restaurant begins preparation. Open the order in the app and tap 'Cancel Order'." },
  { q: "How do I apply a promo code?", a: "Add items to your cart, go to checkout, and enter the promo code in the 'Apply Coupon' field. Codes are case-sensitive." },
];

const colorVariants = {
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", badge: "bg-orange-500/20 text-orange-300" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", badge: "bg-blue-500/20 text-blue-300" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", badge: "bg-purple-500/20 text-purple-300" },
  green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", badge: "bg-green-500/20 text-green-300" },
};

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", type: "Order Issue" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .font-cabinet { font-family: 'Cabinet Grotesk', 'DM Sans', sans-serif; }
        input, textarea, select { background: transparent; outline: none; }
        input:focus, textarea:focus, select:focus { box-shadow: none; }
        .field-wrap { transition: border-color 0.2s; }
        .field-wrap:focus-within { border-color: #f97316; }
        .mesh { background: radial-gradient(ellipse at 30% 0%, rgba(234,88,12,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(99,102,241,0.08) 0%, transparent 60%); }
      `}</style>

      {/* Hero */}
      <div className="mesh border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-orange-400 text-xs font-medium tracking-widest uppercase mb-4">FoodTruck Support</p>
          <h1 className="font-cabinet text-6xl md:text-8xl font-black leading-none text-white mb-4">
            We're here<br />
            <span className="text-orange-500">to help.</span>
          </h1>
          <p className="text-gray-400 max-w-md text-lg leading-relaxed">
            From missing items to account questions — our team is ready. Pick the channel that works best for you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* Contact Channels */}
        <section>
          <h2 className="font-cabinet text-2xl font-bold mb-6 text-gray-200">Reach Us Directly</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {channels.map((ch) => {
              const v = colorVariants[ch.color];
              return (
                <div key={ch.label} className={`${v.bg} border ${v.border} rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform`}>
                  <div className="text-3xl mb-4">{ch.icon}</div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-cabinet font-bold text-lg ${v.text}`}>{ch.label}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${v.badge}`}>{ch.badge}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{ch.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Form + FAQ */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <section>
            <h2 className="font-cabinet text-2xl font-bold mb-6 text-gray-200">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-cabinet text-2xl font-bold text-green-400 mb-2">Message Received!</h3>
                <p className="text-gray-400 text-sm">We'll get back to you at <span className="text-white">{form.email}</span> within 24–48 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-orange-400 text-sm hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="field-wrap bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                    <label className="text-gray-500 text-xs uppercase tracking-wide">Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="block w-full text-white text-sm mt-1 placeholder-gray-600"
                    />
                  </div>
                  <div className="field-wrap bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                    <label className="text-gray-500 text-xs uppercase tracking-wide">Email</label>
                    <input
                      required type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      className="block w-full text-white text-sm mt-1 placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="field-wrap bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs uppercase tracking-wide">Topic</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="block w-full text-white text-sm mt-1 bg-gray-900"
                  >
                    {["Order Issue", "Refund Request", "Account Help", "Restaurant Feedback", "Technical Bug", "Other"].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div className="field-wrap bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs uppercase tracking-wide">Subject</label>
                  <input
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Brief subject line"
                    className="block w-full text-white text-sm mt-1 placeholder-gray-600"
                  />
                </div>

                <div className="field-wrap bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs uppercase tracking-wide">Message</label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your issue in detail. Include Order ID if applicable."
                    className="block w-full text-white text-sm mt-1 placeholder-gray-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-400 transition-colors text-white font-cabinet font-bold py-4 rounded-xl text-lg"
                >
                  Send Message →
                </button>
              </form>
            )}
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-cabinet text-2xl font-bold mb-6 text-gray-200">Common Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-cabinet font-bold text-sm text-white">{faq.q}</span>
                    <svg
                      className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4">
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Office Info */}
            <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="font-cabinet font-bold text-white mb-4">🏢 Our Office</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>FoodTruck Technologies Pvt. Ltd.</p>
                <p>No. 42, Nungambakkam High Road</p>
                <p>Chennai, Tamil Nadu — 600034</p>
                <p className="text-gray-600 mt-3">Mon–Sat · 10am–6pm IST</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
