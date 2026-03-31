const refundCases = [
  {
    icon: "🚫",
    status: "Full Refund",
    color: "emerald",
    cases: [
      "Order cancelled by FoodTruck or the restaurant",
      "Incorrect or missing items not resolved by re-delivery",
      "Order never arrived after 2× the estimated time",
      "Duplicate charge on your account",
      "Payment debited but order not confirmed",
    ],
  },
  {
    icon: "⚡",
    status: "Partial Refund",
    color: "amber",
    cases: [
      "One or more items missing from a larger order",
      "Food quality issues affecting part of the order",
      "Significant delay beyond promised delivery time",
      "Packaging damage causing partial food spoilage",
    ],
  },
  {
    icon: "❌",
    status: "No Refund",
    color: "rose",
    cases: [
      "Order delivered as confirmed and accepted",
      "Cancellation after restaurant has begun preparation",
      "Incorrect address provided by the customer",
      "Customer unavailable at delivery location",
      "Change of mind after delivery",
    ],
  },
];

const timeline = [
  { step: "01", action: "Submit Request", detail: "Via app, website, or email within 24 hrs of delivery", time: "0–24 hrs" },
  { step: "02", action: "Review", detail: "Our team investigates and verifies the issue", time: "24–48 hrs" },
  { step: "03", action: "Decision", detail: "You receive an email with the refund decision", time: "48 hrs" },
  { step: "04", action: "Processing", detail: "Refund initiated to original payment method", time: "3–7 days" },
  { step: "05", action: "Credited", detail: "Amount reflects in your account or FoodTruck wallet", time: "5–10 days" },
];

const colorMap = {
  emerald: { bg: "bg-emerald-950/40", border: "border-emerald-500/30", badge: "bg-emerald-500/20 text-emerald-400", dot: "bg-emerald-400" },
  amber: { bg: "bg-amber-950/40", border: "border-amber-500/30", badge: "bg-amber-500/20 text-amber-400", dot: "bg-amber-400" },
  rose: { bg: "bg-rose-950/40", border: "border-rose-500/30", badge: "bg-rose-500/20 text-rose-400", dot: "bg-rose-400" },
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); }
      `}</style>

      {/* Hero */}
      <div className="noise relative overflow-hidden bg-gradient-to-br from-orange-950 via-neutral-950 to-neutral-950 border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="flex items-start gap-6">
            <div className="hidden md:flex w-20 h-20 bg-orange-500 rounded-2xl items-center justify-center text-4xl flex-shrink-0 mt-2">
              💰
            </div>
            <div>
              <p className="text-orange-400 text-xs font-medium tracking-widest uppercase mb-3">FoodTruck · Refund Policy</p>
              <h1 className="font-fraunces text-6xl md:text-7xl font-black text-white leading-tight mb-4">
                Our Refund<br />
                <em className="text-orange-400 not-italic">Promise</em>
              </h1>
              <p className="text-neutral-400 max-w-lg leading-relaxed">
                If something goes wrong with your order, we make it right — quickly and without hassle. Here's exactly what you're entitled to.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[["⏱", "24-Hour Window", "Submit refund requests within 24 hrs of delivery"],
              ["💳", "Original Payment", "Refunds go back to the card or wallet used"],
              ["📲", "Track Status", "Real-time updates in your orders section"]].map(([icon, title, desc]) => (
              <div key={title} className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5">
                <span className="text-2xl">{icon}</span>
                <p className="font-fraunces text-white font-bold mt-2">{title}</p>
                <p className="text-neutral-500 text-sm mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Refund Cases */}
        <section>
          <h2 className="font-fraunces text-3xl font-black mb-8">What Gets Refunded?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {refundCases.map((cat) => {
              const c = colorMap[cat.color];
              return (
                <div key={cat.status} className={`${c.bg} border ${c.border} rounded-2xl p-6`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl">{cat.icon}</span>
                    <span className={`${c.badge} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                      {cat.status}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {cat.cases.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                        <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="font-fraunces text-3xl font-black mb-8">Refund Timeline</h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-neutral-800 hidden md:block" />
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-32 text-right">
                    <span className="text-neutral-600 text-xs">{item.time}</span>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white z-10 relative">
                      {item.step}
                    </div>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex-1">
                    <p className="font-fraunces font-bold text-white">{item.action}</p>
                    <p className="text-neutral-500 text-sm mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Request */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <h2 className="font-fraunces text-3xl font-black mb-6">How to Request a Refund</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[["📱 Via App", "Go to Orders → Select Order → Report an Issue → Choose your problem"],
              ["🌐 Via Website", "Log in → My Orders → Report Issue → Describe the problem with photos"],
              ["📧 Via Email", "Email support@foodtruck.com with your Order ID and a description of the issue"]].map(([title, desc]) => (
              <div key={title} className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                <p className="font-fraunces font-bold text-white mb-2">{title}</p>
                <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-neutral-500 text-sm mb-3">Something went wrong with your order?</p>
          <a
            href="mailto:support@foodtruck.com"
            className="inline-block bg-orange-500 hover:bg-orange-400 transition-colors text-white font-bold px-8 py-4 rounded-full font-fraunces text-lg"
          >
            Request a Refund
          </a>
        </div>
      </div>
    </div>
  );
}
