import { useState } from "react";

const terms = [
  {
    num: "01",
    title: "Acceptance of Terms",
    body: "By accessing or using FoodTruck — including our website, mobile application, and related services — you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please discontinue use immediately. We may update these terms at any time, and continued use constitutes acceptance of any changes.",
  },
  {
    num: "02",
    title: "Eligibility & Account",
    body: "You must be at least 18 years old (or the legal age in your jurisdiction) to create an account and place orders. You are responsible for maintaining the confidentiality of your login credentials and all activity that occurs under your account. Notify us immediately at support@foodtruck.com if you suspect unauthorized access.",
  },
  {
    num: "03",
    title: "Orders & Payments",
    body: "All orders are subject to availability and confirmation from the restaurant partner. By placing an order, you authorize us to charge your selected payment method for the total amount including food charges, delivery fees, taxes, and applicable service charges. Prices displayed are in INR and inclusive of applicable taxes unless stated otherwise.",
  },
  {
    num: "04",
    title: "Delivery & Fulfillment",
    body: "Delivery time estimates are approximate and may vary due to traffic, weather, kitchen load, and other factors beyond our control. FoodTruck is not liable for delays caused by third-party delivery partners or circumstances outside our reasonable control. You must be available at the delivery address; failed deliveries due to unavailability are non-refundable.",
  },
  {
    num: "05",
    title: "Restaurant Partners",
    body: "FoodTruck acts as an intermediary platform connecting users with independent restaurant partners. We do not prepare food and are not responsible for the quality, safety, or accuracy of food items listed by restaurant partners. However, we take food safety seriously and may take action against partners who receive consistent quality complaints.",
  },
  {
    num: "06",
    title: "Prohibited Conduct",
    body: "You agree not to use FoodTruck for any unlawful purpose; to submit false, misleading, or fraudulent orders; to abuse our promotions or referral programs; to reverse-engineer, scrape, or copy any part of our platform; to harass delivery partners or restaurant staff; or to post false, defamatory, or harmful reviews. Violations may result in permanent account suspension.",
  },
  {
    num: "07",
    title: "Intellectual Property",
    body: "All content on FoodTruck — including logos, design, text, images, and software — is the exclusive property of FoodTruck Technologies Pvt. Ltd. and is protected under Indian and international intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit written permission.",
  },
  {
    num: "08",
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, FoodTruck shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including food quality issues, delivery delays, or platform downtime. Our maximum liability in any case is limited to the value of the disputed order.",
  },
  {
    num: "09",
    title: "Governing Law",
    body: "These Terms are governed by the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu. We encourage you to first contact our support team to resolve any issues informally before pursuing legal remedies.",
  },
  {
    num: "10",
    title: "Termination",
    body: "We reserve the right to suspend or permanently terminate your account if you violate these Terms, engage in fraudulent activity, or act in a manner that harms other users, restaurant partners, or delivery personnel. You may also delete your account at any time from your account settings.",
  },
];

export default function TermsOfService() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .stripe { background: repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(234,88,12,0.04) 60px, rgba(234,88,12,0.04) 61px); }
        .term-item { border-left: 3px solid transparent; transition: all 0.25s ease; }
        .term-item:hover, .term-item.active { border-left-color: #f97316; }
      `}</style>

      {/* Hero */}
      <div className="stripe relative border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block text-orange-400 text-xs tracking-widest uppercase font-medium mb-4 border border-orange-400/30 px-3 py-1 rounded-sm">
                FoodTruck · Legal Documents
              </span>
              <h1 className="font-syne text-6xl md:text-8xl font-extrabold leading-none text-white">
                Terms<br />
                <span className="text-orange-500">of</span> Use
              </h1>
            </div>
            <div className="text-zinc-500 text-sm max-w-xs text-right">
              <p>Effective Date</p>
              <p className="text-white font-medium">March 31, 2026</p>
              <p className="mt-2">Version</p>
              <p className="text-white font-medium">3.2.1</p>
            </div>
          </div>
          <div className="mt-10 bg-orange-500/10 border border-orange-500/20 rounded-xl p-5 max-w-2xl">
            <p className="text-orange-200 text-sm leading-relaxed">
              <span className="font-semibold text-orange-400">Important:</span> These terms form a legally binding agreement between you and FoodTruck Technologies Pvt. Ltd. Please read them carefully before using our services.
            </p>
          </div>
        </div>
      </div>

      {/* Terms List */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-2">
          {terms.map((term) => (
            <div
              key={term.num}
              className={`term-item pl-6 bg-zinc-900 rounded-r-xl overflow-hidden ${expanded === term.num ? "active" : ""}`}
            >
              <button
                onClick={() => setExpanded(expanded === term.num ? null : term.num)}
                className="w-full flex items-center justify-between py-5 pr-6 text-left"
              >
                <div className="flex items-center gap-5">
                  <span className="font-syne text-orange-500 text-sm font-bold">{term.num}</span>
                  <span className="font-syne text-lg font-bold text-white">{term.title}</span>
                </div>
                <svg
                  className={`w-5 h-5 text-zinc-500 transition-transform ${expanded === term.num ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expanded === term.num && (
                <div className="pb-5 pr-6">
                  <p className="text-zinc-400 text-sm leading-relaxed">{term.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Agree CTA */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h3 className="font-syne text-xl font-bold mb-3">Have questions?</h3>
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">Our legal team is available to clarify any part of these terms before you commit.</p>
            <a href="mailto:legal@foodtruck.com" className="text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors">
              legal@foodtruck.com →
            </a>
          </div>
          <div className="bg-orange-500 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-syne text-xl font-bold text-white mb-3">Ready to order?</h3>
              <p className="text-orange-100 text-sm leading-relaxed">By continuing to use FoodTruck, you agree to these terms and our Privacy Policy.</p>
            </div>
            <button className="mt-6 bg-white text-orange-600 font-syne font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors self-start">
              Start Ordering →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
