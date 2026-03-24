import { useState, useRef, useEffect, useMemo } from "react";
import { restaurantMenus } from "../../services/restauantService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem , getItems} from "../../utils/cartSlice";
import { addCartItems, removeCartItem, getCartItems } from "../../services/cartService";


// const deals = [
//   { bank: "YES BANK", title: "7.5% Off Upto ₹100", subtitle: "NO CODE REQUIRED", color: "#1a3c6e" },
//   { bank: "AXIS", title: "Flat ₹150 Off", subtitle: "USE AXISREWARDS", color: "#a0001e" },
//   { bank: "AXIS", title: "Flat ₹120 Off", subtitle: "USE AXIS120", color: "#a0001e" },
//   { bank: "HDFC", title: "10% Off Upto ₹200", subtitle: "USE HDFC10", color: "#004c8f" },
// ];

const RestaurantCard = () => {
  const dispatch = useDispatch();
  const cartValues = useSelector((store) => store.cart?.items);
  const [activeCategory, setActiveCategory] = useState("recommended");
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurantDetails, setRestaurantDetails] = useState("")
  const sectionRefs = useRef({});
  const navRef = useRef(null);
  const isScrollingRef = useRef(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {

        const res = await restaurantMenus(id);
        setRestaurantDetails(res?.restaurant ?? "")

      }
      catch (err) {
        console.log("Error :" + err?.message)
      }
    }
    fetchRestaurantData();
  }, [])
  useEffect(() => {
    const fetchCartItems = async () => {
      try {

        const res = await getCartItems(id);
        const normalizeItems = (itemsArray) => {
          return itemsArray.reduce((acc, item) => {
            acc[item.menuItem] = item; // array → object
            return acc;
          }, {});
        };
        dispatch(getItems(normalizeItems(res?.items ?? {})))

      }
      catch (err) {
        console.log("Error :" + err?.message)
      }
    }
    fetchCartItems();
  }, [])

  const addToCart = async (item) => {
    const items = { menuItem: item._id, name: item.name, price: Number(item.basePrice), quantity: 1 };
    dispatch(addItem(items));
    try {
      const cartItems = await addCartItems(item._id);
    } catch (err) {
      dispatch(removeItem(item._id));        // rollback on failure
      alert.error("Failed to add item");
      console.log("Error :" + err?.message, err?.response?.data)
    }

  };

  const removeFromCart = async (itemId) => {
    const snapshot = cartValues[itemId];  // ✅ capture BEFORE dispatch
    if (!snapshot) return;
    dispatch(removeItem(itemId));
    try {
      await removeCartItem(id, itemId);
    } catch (err) {
      dispatch(addItem(snapshot));      // rollback — but addItem will increment!
      alert.error("Could not remove item");
      console.log(err, "err-removeFromCart")
    }
  };
  // const clearCart = () => setCart({});

  const cartItems = Object.values(cartValues);                                           // array of cart entries
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);       // total count
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // total price

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
    if (!restaurantDetails?.categories?.length) return; // guard for initial null state

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const offset = 160;
      for (const cat of restaurantDetails.categories) {
        const el = sectionRefs.current[cat.name];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            setActiveCategory(cat.name);
            const navEl = navRef.current?.querySelector(`[data-cat="${cat.name}"]`);
            navEl?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll); // cleanup old listener
  }, [restaurantDetails]); // ← this was the missing piece


  const filteredCategories = useMemo(() => {
    return restaurantDetails?.categories
      ?.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          if (showVegOnly && item.foodType !== "VEG") return false;
          if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
          return true;
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [restaurantDetails, showVegOnly, searchQuery]);

  if (!restaurantDetails) {
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
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>★ {"4.4"}</span>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>({"220k"} ratings)</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>•</div>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>{"200 for two"}</span>
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
                  <span className="badge" style={{ background: "rgba(33,163,93,0.2)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)", fontSize: "11px" }}>{restaurantDetails?.isOpened ? "Open Now" : "Closed"}</span>
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Delivery time</p>
                  <p style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>{"20 mins"}</p>
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
                style={{ background: "#fff", border: "1px solid #e0e0e0", fontSize: "13px", color: "black" }}
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
                          border: `1.5px solid ${item.foodType === "VEG" ? "#21a35d" : "#e53935"}`,
                          position: "relative", flexShrink: 0
                        }}>
                          <span style={{
                            position: "absolute", top: "50%", left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 6, height: 6, borderRadius: "50%",
                            background: item.foodType === "VEG" ? "#21a35d" : "#e53935"
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
                      {!cartValues[item._id] ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="btn btn-sm"
                          style={{ background: "#fff", color: "#21a35d", border: "2px solid #21a35d", borderRadius: "12px", fontWeight: 700, width: 90, fontSize: "13px", minHeight: 32, height: 32 }}
                        >
                          ADD
                        </button>
                      ) : (
                        <div className="flex items-center justify-between rounded-xl overflow-hidden" style={{ width: 90, height: 32, background: "#21a35d" }}>
                          <button onClick={() =>removeFromCart(item._id)} style={{ width: 30, height: 32, color: "#fff", fontWeight: 700, fontSize: "18px", background: "transparent", border: "none", cursor: "pointer", lineHeight: 1 }}>−</button>
                          <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{cartValues[item.id]}</span>
                          <button onClick={() => addToCart(item)} style={{ width: 30, height: 32, color: "#fff", fontWeight: 700, fontSize: "18px", background: "transparent", border: "none", cursor: "pointer", lineHeight: 1 }}>+</button>
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
