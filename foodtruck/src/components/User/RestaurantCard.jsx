import { useState, useRef, useEffect } from "react";
import { restaurantMenus } from "../../services/restauantService";
import { useParams } from "react-router-dom";

const restaurant = {
  name: "Shree Saravana Bhavan",
  rating: 4.6,
  ratingCount: "14K+",
  deliveryRatings: 3750,
  price: "₹200 for two",
  cuisines: ["South Indian", "Chinese", "North Indian"],
  address: "JPD Complex, Near EB Office, Natham Main Road, Dindigul Locality, Dindigul",
  phone: "+919245405060",
  deliveryTime: "15–20 mins",
  outlet: "Dindigul Locality",
  isVeg: false,
};

// const deals = [
//   { bank: "YES BANK", title: "7.5% Off Upto ₹100", subtitle: "NO CODE REQUIRED", color: "#1a3c6e" },
//   { bank: "AXIS", title: "Flat ₹150 Off", subtitle: "USE AXISREWARDS", color: "#a0001e" },
//   { bank: "AXIS", title: "Flat ₹120 Off", subtitle: "USE AXIS120", color: "#a0001e" },
//   { bank: "HDFC", title: "10% Off Upto ₹200", subtitle: "USE HDFC10", color: "#004c8f" },
// ];

const menuCategories = [
  {
    id: "recommended",
    label: "Recommended",
    items: [
      { id: 1, name: "Ghee Roast Dosa", desc: "Crispy dosa made with pure ghee, served with sambar & chutneys", price: 89, veg: true, rating: 4.7, orders: "500+" },
      { id: 2, name: "Chicken Kothu Parotta", desc: "Flaky parotta shredded & tossed with egg, chicken & spices", price: 149, veg: false, rating: 4.5, orders: "300+" },
      { id: 3, name: "Onion Uttapam", desc: "Thick rice pancake topped with caramelized onions", price: 79, veg: true, rating: 4.4, orders: "200+" },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast",
    items: [
      { id: 4, name: "Idli Sambar (3 pcs)", desc: "Soft steamed idlis with signature sambar & 3 chutneys", price: 59, veg: true, rating: 4.8, orders: "1K+" },
      { id: 5, name: "Medu Vada (2 pcs)", desc: "Crispy lentil donuts, golden fried, served with coconut chutney", price: 49, veg: true, rating: 4.6, orders: "400+" },
      { id: 6, name: "Pongal", desc: "Creamy rice & moong dal khichdi seasoned with pepper & ghee", price: 69, veg: true, rating: 4.5, orders: "250+" },
    ],
  },
  {
    id: "dosas",
    label: "Dosas",
    items: [
      { id: 7, name: "Plain Dosa", desc: "Classic thin crispy crepe with sambar & chutney", price: 55, veg: true, rating: 4.3, orders: "600+" },
      { id: 8, name: "Masala Dosa", desc: "Crispy dosa stuffed with spiced potato filling", price: 75, veg: true, rating: 4.7, orders: "800+" },
      { id: 9, name: "Rava Masala Dosa", desc: "Semolina dosa with crispy texture & masala stuffing", price: 85, veg: true, rating: 4.5, orders: "200+" },
      { id: 10, name: "Egg Dosa", desc: "Classic dosa topped with beaten egg & onions", price: 95, veg: false, rating: 4.4, orders: "150+" },
    ],
  },
  {
    id: "chinese",
    label: "Chinese",
    items: [
      { id: 11, name: "Gobi Manchurian (Dry)", desc: "Crispy cauliflower florets in Indo-Chinese spicy sauce", price: 129, veg: true, rating: 4.3, orders: "300+" },
      { id: 12, name: "Chicken Fried Rice", desc: "Wok-tossed rice with chicken, eggs & vegetables", price: 159, veg: false, rating: 4.5, orders: "400+" },
      { id: 13, name: "Veg Hakka Noodles", desc: "Stir-fried noodles with crunchy vegetables & soy sauce", price: 119, veg: true, rating: 4.2, orders: "200+" },
    ],
  },
  {
    id: "biryani",
    label: "Biryani & Rice",
    items: [
      { id: 14, name: "Chicken Biryani", desc: "Fragrant basmati rice layered with spiced chicken & fried onions", price: 199, veg: false, rating: 4.6, orders: "700+" },
      { id: 15, name: "Veg Biryani", desc: "Aromatic rice with fresh vegetables, saffron & whole spices", price: 149, veg: true, rating: 4.3, orders: "300+" },
      { id: 16, name: "Curd Rice", desc: "Cooling rice mixed with yogurt, tempered with mustard & curry leaves", price: 69, veg: true, rating: 4.7, orders: "400+" },
    ],
  },
];

const cartState = {};

const RestaurantCard = ()=> {
  const [activeCategory, setActiveCategory] = useState("recommended");
  const [cart, setCart] = useState(cartState);
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const[restaurantDetails , setRestaurantDetails]=useState("")
  const sectionRefs = useRef({});
  const navRef = useRef(null);
  const isScrollingRef = useRef(false);
const { id } = useParams();
  useEffect(()=>{
const fetchRestaurantData = async()=>{
  try{
    
    const res = await restaurantMenus(id);
    setRestaurantDetails(res?.restaurant ?? "")
    console.log(res?.restaurant , "restaurant Card")

  }
  catch(err){
    console.log("Error :" + err?.message)
  }
}
fetchRestaurantData();
  },[])

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) - 1) }));
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = menuCategories.flatMap(c => c.items).reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

  const scrollToCategory = (id) => {
    isScrollingRef.current = true;
    setActiveCategory(id);
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 130;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => { isScrollingRef.current = false; }, 800);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const offset = 160;
      for (const cat of menuCategories) {
        const el = sectionRefs.current[cat.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            setActiveCategory(cat.id);
            // scroll nav pill into view
            const navEl = navRef.current?.querySelector(`[data-cat="${cat.id}"]`);
            navEl?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const filteredCategories = restaurantDetails?.categories?.map((cat) => ({
  ...cat,
  items: cat.items.filter((item) => {
    if (showVegOnly && item.foodType !== "VEG") return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }),
})).filter((cat) => cat.items.length > 0);
  console.log(filteredCategories , "filteredCategories")

  if(!restaurantDetails){
    return (
      <div>Loading....</div>
    )
  }
  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", background: "#f5f4f0" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@700;900&display=swap" rel="stylesheet" />

      {/* Hero / Restaurant Info Card */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)" }} className="pt-6 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
            Home &nbsp;/&nbsp; {restaurantDetails?.address?.state} &nbsp;/&nbsp; {restaurantDetails?.address?.city} &nbsp;/&nbsp; <span style={{ color: "rgba(255,255,255,0.7)" }}>{restaurantDetails?.name}</span>
          </div>

          {/* Name */}
          <h1 style={{ fontFamily: "'Fraunces', serif", color: "#ffffff", fontSize: "2rem", lineHeight: 1.15, letterSpacing: "-0.02em" }} className="mb-3">
            {restaurantDetails?.name}
          </h1>

          {/* Cuisines */}
          <div className="flex flex-wrap gap-2 mb-4">
            {restaurantDetails?.cuisines?.split(",")?.map((c) => (
              <span key={c} className="badge badge-sm" style={{ background: "rgba(255,255,255,0.12)", color: "#e2c07b", border: "1px solid rgba(226,192,123,0.3)", fontSize: "11px", fontWeight: 500 }}>
                {c}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#21a35d", backdropFilter: "blur(10px)" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>★ {restaurant.rating}</span>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>({restaurant.ratingCount} ratings)</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>•</div>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>{restaurant.price}</span>
          </div>

          {/* Info card */}
          <div className="rounded-2xl p-4 mt-2" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center pt-1 gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: "#e2c07b" }} />
                <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.2)" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Outlet</p>
                    <p style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>{restaurantDetails?.address?.city}</p>
                  </div>
                  <span className="badge" style={{ background: "rgba(33,163,93,0.2)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)", fontSize: "11px" }}>Open Now</span>
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Delivery time</p>
                  <p style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>{restaurant.deliveryTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-4">
            {["Direction", "Share", "Reviews"].map((btn) => (
              <button key={btn} className="btn btn-sm" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px", fontSize: "12px", fontWeight: 500 }}>
                {btn === "Direction" ? "📍" : btn === "Share" ? "↗" : "⭐"} {btn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deals section */}
      {/* <div className="max-w-2xl mx-auto px-4 py-5">
        <div className="flex justify-between items-center mb-3">
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.15rem", color: "#1a1a2e", fontWeight: 700 }}>Deals for you</h2>
          <div className="flex gap-1">
            <button className="btn btn-xs btn-circle" style={{ background: "#fff", border: "1px solid #e2e2e2" }}>‹</button>
            <button className="btn btn-xs btn-circle" style={{ background: "#1a1a2e", color: "#fff", border: "none" }}>›</button>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {deals.map((deal, i) => (
            <div key={i} className="flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ minWidth: 220, background: "#fff", border: "1px solid #ebebeb", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: deal.color }}>
                <span style={{ color: "#fff", fontSize: "10px", fontWeight: 700, textAlign: "center", lineHeight: 1 }}>{deal.bank}</span>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: "13px", color: "#1a1a2e" }}>{deal.title}</p>
                <p style={{ fontSize: "11px", color: "#888", fontWeight: 500, letterSpacing: "0.04em" }}>{deal.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Divider */}
      <div style={{ height: 8, background: "#ebebeb" }} />

      {/* Sticky category nav + search */}
      <div className="sticky top-0 z-30" style={{ background: "#f5f4f0", borderBottom: "1px solid #e5e5e5" }}>
        <div className="max-w-2xl mx-auto">
          {/* Search */}
          <div className="px-4 pt-3 pb-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#aaa", fontSize: "14px" }}>🔍</span>
              <input
                className="input input-sm w-full rounded-xl pl-8"
                style={{ background: "#fff", border: "1px solid #e0e0e0", fontSize: "13px" , color:"black" }}
                placeholder="Search within menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <label className="flex items-center gap-1.5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                <span style={{ fontSize: "11px", color: "#555", fontWeight: 500 }}>Veg Only</span>
                <input type="checkbox" className="toggle toggle-xs toggle-success" checked={showVegOnly} onChange={(e) => setShowVegOnly(e.target.checked)} />
              </label>
            </div>
          </div>

          {/* Category pills */}
          <div ref={navRef} className="flex gap-2 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
            {restaurantDetails?.categories?.map((cat) => (
              <button
                key={cat._id}
                data-cat={cat.name}
                onClick={() => scrollToCategory(cat.name)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: activeCategory === cat.name ? "#1a1a2e" : "#fff",
                  color: activeCategory === cat.name ? "#e2c07b" : "#555",
                  border: activeCategory === cat.name ? "none" : "1px solid #e0e0e0",
                  letterSpacing: "0.03em",
                  fontWeight: 600,
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="max-w-2xl mx-auto px-4 pb-32">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ fontSize: "2rem" }}>🍽️</p>
            <p style={{ color: "#aaa", marginTop: 8 }}>No items match your filter</p>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat._id} ref={(el) => (sectionRefs.current[cat.name] = el)} className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", color: "#1a1a2e", fontWeight: 700 }}>
                  {cat.label}
                </h2>
                <span style={{ fontSize: "12px", color: "#aaa", fontWeight: 500 }}>({cat.items.length})</span>
              </div>

              <div className="flex flex-col gap-4">
                {cat.items.map((item) => (
                  <div key={item._id} className="flex gap-3 p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid #f0f0f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                    {/* Left: veg/nonveg + info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span style={{
                          display: "inline-block", width: 13, height: 13, borderRadius: 2,
                          border: `1.5px solid ${item.foodType ==="VEG" ? "#21a35d" : "#e53935"}`,
                          position: "relative", flexShrink: 0
                        }}>
                          <span style={{
                            position: "absolute", top: "50%", left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 6, height: 6, borderRadius: "50%",
                            background: item.foodType ==="VEG" ? "#21a35d" : "#e53935"
                          }} />
                        </span>
                        {item.orders && (
                          <span className="badge badge-sm" style={{ background: "#fff4e0", color: "#c07800", border: "none", fontSize: "10px", fontWeight: 600 }}>
                            🔥 {item.orders} orders
                          </span>
                        )}
                      </div>
                      <p style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e", marginBottom: 3 }}>{item.name}</p>
                      <p style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e", marginBottom: 4 }}>₹{item.basePrice}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <span style={{ color: "#21a35d", fontSize: "12px", fontWeight: 600 }}>★ {item?.rating?.avg ?? 4.5}</span>
                      </div>
                      <p style={{ fontSize: "12px", color: "#999", lineHeight: 1.5 }}>{item.description}</p>
                    </div>

                    {/* Right: image placeholder + add button */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className="rounded-xl overflow-hidden" style={{ width: 90, height: 90, background: "linear-gradient(135deg, #f0ede6, #e8e3d8)", position: "relative" }}>
                        <div className="w-full h-full flex items-center justify-center" style={{ fontSize: "2.5rem" }}>
                          {item.foodType === "VEG" ? "🥗" : item.name.toLowerCase().includes("biryani") ? "🍛" : item.name.toLowerCase().includes("chicken") ? "🍗" : "🍽️"}
                        </div>
                      </div>
                      {!cart[item.id] ? (
                        <button
                          onClick={() => addToCart(item._id)}
                          className="btn btn-sm"
                          style={{ background: "#fff", color: "#21a35d", border: "2px solid #21a35d", borderRadius: "12px", fontWeight: 700, width: 90, fontSize: "13px", minHeight: 32, height: 32 }}
                        >
                          ADD
                        </button>
                      ) : (
                        <div className="flex items-center justify-between rounded-xl overflow-hidden" style={{ width: 90, height: 32, background: "#21a35d" }}>
                          <button onClick={() => removeFromCart(item._id)} style={{ width: 30, height: 32, color: "#fff", fontWeight: 700, fontSize: "18px", background: "transparent", border: "none", cursor: "pointer", lineHeight: 1 }}>−</button>
                          <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{cart[item.id]}</span>
                          <button onClick={() => addToCart(item._id)} style={{ width: 30, height: 32, color: "#fff", fontWeight: 700, fontSize: "18px", background: "transparent", border: "none", cursor: "pointer", lineHeight: 1 }}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Section divider */}
              <div className="mt-6" style={{ height: 1, background: "#ebebeb" }} />
            </div>
          ))
        )}
      </div>

      {/* Sticky Cart Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
          <div className="max-w-2xl mx-auto">
            <button className="btn w-full rounded-2xl" style={{ background: "#1a1a2e", color: "#e2c07b", border: "none", height: 56, fontWeight: 700, fontSize: "15px", boxShadow: "0 8px 32px rgba(26,26,46,0.4)" }}>
              <div className="flex items-center justify-between w-full px-2">
                <span className="badge" style={{ background: "rgba(226,192,123,0.2)", color: "#e2c07b", border: "none", fontWeight: 700, fontSize: "13px" }}>
                  {totalItems} item{totalItems > 1 ? "s" : ""}
                </span>
                <span>View Cart</span>
                <span style={{ fontWeight: 700 }}>₹{totalPrice}</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default RestaurantCard
