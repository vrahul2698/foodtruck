import { useState } from "react";

const sections = [
  {
    id: "collection",
    icon: "🗂️",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you create an account, place an order, or contact us, we collect your name, email address, phone number, delivery address, and payment details. This information is essential to process your orders and provide a seamless dining experience.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with our platform — pages visited, items browsed, time spent, and search queries. This helps us improve recommendations and the overall app experience.",
      },
      {
        subtitle: "Device & Location Data",
        text: "With your permission, we collect your device type, operating system, IP address, and precise location to enable delivery tracking, show nearby restaurants, and ensure accurate estimated arrival times.",
      },
    ],
  },
  {
    id: "usage",
    icon: "⚙️",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Order Processing",
        text: "Your personal and payment data is used solely to process, confirm, and deliver your orders. We communicate order updates, delivery status, and receipts directly through your preferred channel.",
      },
      {
        subtitle: "Personalization",
        text: "We analyze your order history and preferences to recommend dishes, offer relevant promotions, and curate your homepage feed — making every visit feel tailored to your tastes.",
      },
      {
        subtitle: "Safety & Fraud Prevention",
        text: "We use your data to verify identity, detect fraudulent activity, and protect both our users and restaurant partners from unauthorized transactions.",
      },
    ],
  },
  {
    id: "sharing",
    icon: "🤝",
    title: "Information Sharing",
    content: [
      {
        subtitle: "Restaurant Partners",
        text: "We share your name, contact number, and delivery address with the restaurant preparing your order and the delivery partner assigned to your delivery — only what's necessary to fulfill your order.",
      },
      {
        subtitle: "Service Providers",
        text: "Trusted third-party services (payment gateways, SMS providers, cloud infrastructure) may access your data under strict confidentiality agreements and solely for the purpose of operating our platform.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose information when required by law, court order, or to protect the rights, safety, and property of FoodTruck, its users, or the public.",
      },
    ],
  },
  {
    id: "security",
    icon: "🔒",
    title: "Data Security",
    content: [
      {
        subtitle: "Encryption",
        text: "All data transmitted between your device and our servers is encrypted using TLS 1.3. Payment information is tokenized and never stored on our servers — handled exclusively by PCI-DSS compliant processors.",
      },
      {
        subtitle: "Access Controls",
        text: "Only authorized personnel with a legitimate need can access user data. All access is logged, audited regularly, and protected by multi-factor authentication.",
      },
    ],
  },
  {
    id: "rights",
    icon: "⚖️",
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Portability",
        text: "You may request a full export of your personal data at any time from your account settings or by contacting our support team.",
      },
      {
        subtitle: "Correction & Deletion",
        text: "You have the right to correct inaccurate data or request permanent deletion of your account and associated data. Some data may be retained for legal or operational reasons as disclosed.",
      },
      {
        subtitle: "Opt-Out",
        text: "You can opt out of marketing communications at any time via your notification preferences. Opting out will not affect your ability to receive transactional messages about your orders.",
      },
    ],
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .section-card { transition: all 0.3s ease; }
        .section-card:hover { transform: translateY(-2px); }
        .dot-grid { background-image: radial-gradient(circle, #44403c 1px, transparent 1px); background-size: 28px 28px; }
      `}</style>

      {/* Hero */}
      <div className="dot-grid relative overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/40 to-stone-950/90" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-body font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            🍽️ FoodTruck · Legal
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-black text-white leading-none mb-6">
            Privacy
            <span className="block text-orange-400">Policy</span>
          </h1>
          <p className="font-body text-stone-400 text-lg max-w-xl mx-auto leading-relaxed">
            We believe in radical transparency. Here's exactly how we handle your data — no legalese, just plain honesty.
          </p>
          <div className="mt-8 text-stone-600 font-body text-sm">Last updated: March 31, 2026</div>
        </div>
      </div>

      {/* Quick Nav */}
      <div className="sticky top-0 z-10 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              className="font-body text-xs whitespace-nowrap px-4 py-2 rounded-full border border-stone-700 text-stone-400 hover:border-orange-500 hover:text-orange-400 transition-all"
            >
              {s.icon} {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="section-card bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{section.icon}</span>
                <h2 className="font-display text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <span className={`text-orange-400 text-xl transition-transform duration-300 ${activeSection === section.id ? "rotate-45" : ""}`}>+</span>
            </button>
            {(activeSection === section.id || activeSection === null) && (
              <div className="px-6 pb-6 grid gap-4">
                {section.content.map((item, i) => (
                  <div key={i} className="bg-stone-950/60 border border-stone-800 rounded-xl p-5">
                    <h3 className="font-body font-medium text-orange-300 mb-2 text-sm tracking-wide uppercase">{item.subtitle}</h3>
                    <p className="font-body text-stone-400 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Footer note */}
        <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-8 text-center mt-10">
          <p className="font-display text-xl text-white mb-2">Questions about your privacy?</p>
          <p className="font-body text-stone-400 text-sm mb-4">Our privacy team responds within 48 hours.</p>
          <a
            href="mailto:privacy@foodtruck.com"
            className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-body font-medium px-6 py-3 rounded-full text-sm transition-colors"
          >
            privacy@foodtruck.com
          </a>
        </div>
      </div>
    </div>
  );
}
