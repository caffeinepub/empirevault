import { useCallback, useEffect, useState } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Fashion",
  "Jewelry",
  "Beauty",
  "Electronics",
  "Home",
  "Fitness",
];

const INITIAL_SECONDS = 2 * 3600 + 34 * 60 + 17;

// ─── Mini Mockup Components ──────────────────────────────────────────────────

function FashionStoreMini() {
  return (
    <div
      className="mini-mockup"
      style={{ background: "#0D0D0D", width: "100%" }}
    >
      {/* Navbar */}
      <div
        style={{
          background: "#111",
          padding: "5px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: "7px",
            fontWeight: 700,
            letterSpacing: "2px",
          }}
        >
          LUXE FASHION
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {["New", "Sale", "Brands"].map((n) => (
            <span
              key={n}
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "5.5px" }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a0a00, #3d1a00)",
          padding: "10px 8px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "5px",
            letterSpacing: 3,
            marginBottom: 2,
          }}
        >
          NEW SEASON
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          New Arrivals
        </div>
        <div style={{ color: "#C9A84C", fontSize: "5.5px", marginTop: 3 }}>
          Shop the Collection →
        </div>
      </div>
      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 3,
          padding: "5px 5px",
        }}
      >
        {[
          { bg: "#2d1f1a", label: "Silk Blouse", price: "₹2,499" },
          { bg: "#1a2030", label: "Evening Gown", price: "₹4,999" },
          { bg: "#201a2d", label: "Kurta Set", price: "₹1,899" },
        ].map((p) => (
          <div
            key={p.label}
            style={{ background: p.bg, borderRadius: 4, overflow: "hidden" }}
          >
            <div
              style={{
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 20,
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: 2,
                }}
              />
            </div>
            <div style={{ padding: "2px 3px", background: "rgba(0,0,0,0.3)" }}>
              <div
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "4.5px",
                  fontWeight: 600,
                }}
              >
                {p.label}
              </div>
              <div style={{ color: "#C9A84C", fontSize: "4px" }}>{p.price}</div>
              <div style={{ display: "flex", gap: 1, marginTop: 2 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} style={{ color: "#f59e0b", fontSize: "4px" }}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function JewelryStoreMini() {
  return (
    <div
      className="mini-mockup"
      style={{ background: "#FAFAF8", width: "100%" }}
    >
      {/* Navbar */}
      <div
        style={{
          background: "#fff",
          padding: "5px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f0ede8",
        }}
      >
        <span
          style={{
            color: "#2d2d2d",
            fontSize: "7px",
            fontWeight: 700,
            letterSpacing: "2.5px",
            fontStyle: "italic",
          }}
        >
          BIJOU
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {["Rings", "Necklaces", "Sets"].map((n) => (
            <span key={n} style={{ color: "#888", fontSize: "5.5px" }}>
              {n}
            </span>
          ))}
        </div>
      </div>
      {/* Hero — product spotlight */}
      <div
        style={{
          background: "linear-gradient(160deg, #fff9f0 0%, #fef3e2 100%)",
          padding: "8px",
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #f5deb3, #daa520)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(218,165,32,0.3)",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              border: "2px solid rgba(255,255,255,0.6)",
              borderRadius: "50%",
            }}
          />
        </div>
        <div>
          <div style={{ color: "#888", fontSize: "4.5px", letterSpacing: 2 }}>
            BESTSELLER
          </div>
          <div style={{ color: "#2d2d2d", fontSize: "8px", fontWeight: 700 }}>
            Diamond Solitaire
          </div>
          <div style={{ color: "#C9A84C", fontSize: "5.5px", fontWeight: 600 }}>
            ₹18,999{" "}
            <span
              style={{
                color: "#bbb",
                textDecoration: "line-through",
                fontWeight: 400,
              }}
            >
              ₹24,999
            </span>
          </div>
          <div
            style={{
              marginTop: 4,
              background: "#1a1a1a",
              color: "#fff",
              fontSize: "4.5px",
              padding: "2px 6px",
              borderRadius: 3,
              display: "inline-block",
            }}
          >
            Add to Cart
          </div>
        </div>
      </div>
      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 3,
          padding: "4px 5px",
        }}
      >
        {[
          { label: "Pearl Set", bg: "#fdf8f0" },
          { label: "Gold Chain", bg: "#fff8e7" },
        ].map((p) => (
          <div
            key={p.label}
            style={{
              background: p.bg,
              borderRadius: 4,
              padding: 4,
              border: "1px solid #f0e8d8",
            }}
          >
            <div
              style={{
                height: 18,
                background: "linear-gradient(135deg, #f5e6c8, #e8d5b0)",
                borderRadius: 3,
                marginBottom: 3,
              }}
            />
            <div
              style={{ color: "#2d2d2d", fontSize: "4.5px", fontWeight: 600 }}
            >
              {p.label}
            </div>
            <div style={{ color: "#C9A84C", fontSize: "4px" }}>₹9,999</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeautyStoreMini() {
  return (
    <div
      className="mini-mockup"
      style={{ background: "#fff5f7", width: "100%" }}
    >
      {/* Navbar */}
      <div
        style={{
          background: "#fff",
          padding: "5px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #fce4e8",
        }}
      >
        <span
          style={{
            color: "#e8547a",
            fontSize: "7px",
            fontWeight: 800,
            letterSpacing: "1.5px",
          }}
        >
          GLOW
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {["Skincare", "Makeup", "Offers"].map((n) => (
            <span key={n} style={{ color: "#999", fontSize: "5.5px" }}>
              {n}
            </span>
          ))}
        </div>
      </div>
      {/* Hero */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #ffe4ef 0%, #ffd6e7 50%, #ffb3cc 100%)",
          padding: "10px 8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 3,
        }}
      >
        <span
          style={{
            background: "#e8547a",
            color: "#fff",
            fontSize: "4.5px",
            padding: "1.5px 5px",
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          BESTSELLER
        </span>
        <div
          style={{
            color: "#c2154e",
            fontSize: "9px",
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          Transform
          <br />
          Your Skin
        </div>
        <div style={{ color: "#666", fontSize: "5px" }}>
          Science-backed formulas
        </div>
        <div
          style={{
            background: "#e8547a",
            color: "#fff",
            fontSize: "4.5px",
            padding: "2.5px 8px",
            borderRadius: 3,
            fontWeight: 600,
          }}
        >
          Shop Now
        </div>
      </div>
      {/* Products */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 3,
          padding: "4px 5px",
        }}
      >
        {[
          { label: "Vitamin C", color: "#fff3e0" },
          { label: "Rose Serum", color: "#fce4ec" },
          { label: "SPF 50+", color: "#f3e5f5" },
        ].map((p) => (
          <div
            key={p.label}
            style={{ background: p.color, borderRadius: 4, padding: 3 }}
          >
            <div
              style={{
                height: 20,
                background: "rgba(232,84,122,0.15)",
                borderRadius: 3,
                marginBottom: 2,
              }}
            />
            <div style={{ color: "#444", fontSize: "4.5px", fontWeight: 600 }}>
              {p.label}
            </div>
            <div style={{ color: "#e8547a", fontSize: "4px" }}>₹899</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Ad Creative Mockups ─────────────────────────────────────────────────────

function AdCreativeSquare() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1/1",
        background: "linear-gradient(135deg, #FF512F 0%, #DD2476 100%)",
        borderRadius: 8,
        padding: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 4px 16px rgba(221,36,118,0.25)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -10,
          right: -10,
          width: 50,
          height: 50,
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -15,
          left: -5,
          width: 60,
          height: 60,
          background: "rgba(255,255,255,0.07)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          background: "rgba(255,255,255,0.2)",
          borderRadius: 20,
          padding: "2px 7px",
          width: "fit-content",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: "6px",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          SALE ENDS TONIGHT
        </span>
      </div>
      <div>
        <div
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "7px",
            letterSpacing: 1,
          }}
        >
          Up To
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: "22px",
            fontWeight: 900,
            lineHeight: 1,
            textShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          50%<span style={{ fontSize: 14 }}> OFF</span>
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "6px",
            letterSpacing: 0.5,
          }}
        >
          Flat Discount — All Categories
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          color: "#DD2476",
          fontSize: "7px",
          fontWeight: 800,
          textAlign: "center",
          padding: "3px 0",
          borderRadius: 4,
        }}
      >
        SHOP NOW
      </div>
    </div>
  );
}

function AdCreativeFestival() {
  return (
    <div
      style={{
        width: "100%",
        background:
          "linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)",
        borderRadius: 8,
        padding: 8,
        display: "flex",
        alignItems: "center",
        gap: 8,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(212,160,23,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(255,100,50,0.1) 0%, transparent 60%)",
        }}
      />
      {/* Diya icon */}
      <div
        style={{
          flexShrink: 0,
          width: 28,
          height: 28,
          background: "linear-gradient(135deg, #f59e0b, #d97706)",
          borderRadius: "50% 50% 40% 40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 6,
          boxShadow: "0 0 12px rgba(245,158,11,0.4)",
        }}
      >
        <div
          style={{
            width: 4,
            height: 8,
            background: "rgba(255,200,50,0.9)",
            borderRadius: 2,
          }}
        />
      </div>
      <div style={{ flex: 1, zIndex: 1 }}>
        <div
          style={{
            color: "#f59e0b",
            fontSize: "6.5px",
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          ✦ DIWALI SALE ✦
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: "9px",
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          Limited Offer
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "5.5px" }}>
          Use code: DIWALI30
        </div>
      </div>
      <div style={{ flexShrink: 0, textAlign: "center" }}>
        <div style={{ color: "#f59e0b", fontSize: "10px", fontWeight: 900 }}>
          30%
        </div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "5px" }}>
          OFF
        </div>
      </div>
    </div>
  );
}

function AdCreativeStory() {
  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(180deg, #0d0d0d 0%, #1a1a2e 100%)",
        borderRadius: 8,
        padding: "6px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -8,
          top: -8,
          width: 40,
          height: 40,
          background:
            "radial-gradient(circle, rgba(180,100,255,0.3), transparent)",
          borderRadius: "50%",
        }}
      />
      <div style={{ zIndex: 1 }}>
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "5.5px",
            letterSpacing: 2,
            marginBottom: 2,
          }}
        >
          EXCLUSIVE
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: "10px",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          New
          <br />
          Collection
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, #C9A84C, #F4C542)",
            color: "#1a1a1a",
            fontSize: "5.5px",
            fontWeight: 700,
            padding: "2px 6px",
            borderRadius: 3,
            marginTop: 4,
            display: "inline-block",
          }}
        >
          View All
        </div>
      </div>
      {/* Silhouette */}
      <div style={{ width: 24, height: 36, position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: 12,
            height: 12,
            background: "rgba(255,255,255,0.15)",
            borderRadius: "50%",
            margin: "0 auto 2px",
          }}
        />
        <div
          style={{
            width: 18,
            height: 24,
            background: "rgba(255,255,255,0.1)",
            borderRadius: "8px 8px 4px 4px",
            margin: "0 auto",
          }}
        />
      </div>
    </div>
  );
}

// ─── Instagram Mockup ────────────────────────────────────────────────────────

function InstagramPostMini({ type }: { type: "reel" | "product" }) {
  if (type === "reel") {
    return (
      <div
        style={{
          background: "#000",
          borderRadius: 8,
          overflow: "hidden",
          aspectRatio: "9/16",
          position: "relative",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, #1a0a2e 0%, #2d1040 50%, #0d0d0d 100%)",
          }}
        />
        {/* Reel visual */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 28,
              height: 36,
              background: "rgba(255,255,255,0.12)",
              borderRadius: 4,
              margin: "0 auto",
            }}
          />
        </div>
        {/* Reel indicator */}
        <div style={{ position: "absolute", top: 6, right: 6 }}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden="true"
            role="img"
          >
            <rect x="2" y="2" width="8" height="8" rx="2" opacity="0.8" />
            <rect x="14" y="2" width="8" height="8" rx="2" opacity="0.6" />
            <rect x="2" y="14" width="8" height="8" rx="2" opacity="0.6" />
            <rect x="14" y="14" width="8" height="8" rx="2" opacity="0.4" />
          </svg>
        </div>
        {/* Bottom UI */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "4px 5px",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              marginBottom: 2,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              }}
            />
            <span style={{ color: "#fff", fontSize: "5px", fontWeight: 600 }}>
              @luxefashion
            </span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "4.5px" }}>
            New Season Collection ✨
          </div>
          <div style={{ display: "flex", gap: 5, marginTop: 2 }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "4.5px" }}>
              ♥ 4.2k
            </span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "4.5px" }}>
              💬 238
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 6px",
          borderBottom: "1px solid #f5f5f5",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f09433, #dc2743, #cc2366)",
          }}
        />
        <span style={{ fontSize: "5px", fontWeight: 600, color: "#222" }}>
          shopaluxe
        </span>
        <span style={{ marginLeft: "auto", fontSize: "8px", color: "#333" }}>
          •••
        </span>
      </div>
      {/* Image */}
      <div
        style={{
          height: 40,
          background: "linear-gradient(135deg, #f5efe6, #e8d5b8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 20,
            height: 28,
            background: "rgba(180,120,60,0.2)",
            borderRadius: 3,
          }}
        />
      </div>
      {/* Actions */}
      <div style={{ padding: "3px 6px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 2 }}>
          <span style={{ fontSize: "7px" }}>♡</span>
          <span style={{ fontSize: "7px" }}>💬</span>
          <span style={{ fontSize: "7px" }}>↗</span>
        </div>
        <div style={{ color: "#222", fontSize: "4.5px", fontWeight: 600 }}>
          12,483 likes
        </div>
        <div style={{ color: "#555", fontSize: "4px" }}>
          New Silk Collection is here 🌸
        </div>
      </div>
    </div>
  );
}

// ─── Canva Template Mockup ────────────────────────────────────────────────────

function CanvaTemplateMini({ type }: { type: "planner" | "tracker" }) {
  if (type === "planner") {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #f0ede8",
        }}
      >
        <div
          style={{
            color: "#C9A84C",
            fontSize: "6px",
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 3,
          }}
        >
          MARCH 2026
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1.5,
          }}
        >
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
            <div
              key={d}
              style={{ color: "#999", fontSize: "4px", textAlign: "center" }}
            >
              {d}
            </div>
          ))}
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ].map((day) => {
            const i = day - 1;
            return (
              <div
                key={day}
                style={{
                  background:
                    i === 18 ? "#C9A84C" : i < 18 ? "#f5f5f5" : "transparent",
                  color: i === 18 ? "#fff" : i < 18 ? "#333" : "#bbb",
                  fontSize: "4.5px",
                  textAlign: "center",
                  borderRadius: 2,
                  padding: "1px 0",
                }}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        background: "#fafafa",
        borderRadius: 8,
        padding: 7,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid #f0ede8",
      }}
    >
      <div
        style={{
          color: "#1a1a1a",
          fontSize: "6px",
          fontWeight: 700,
          marginBottom: 4,
        }}
      >
        Habit Tracker
      </div>
      {["Morning Run", "Read 30 min", "Hydrate 2L", "Meditate"].map(
        (habit, hi) => (
          <div
            key={habit}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              marginBottom: 3,
            }}
          >
            <span style={{ color: "#555", fontSize: "4.5px", flex: 1 }}>
              {habit}
            </span>
            <div style={{ display: "flex", gap: 1 }}>
              {(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as string[]).map(
                (wd, wi) => (
                  <div
                    key={`${habit}-${wd}`}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 1,
                      background: wi < hi + 3 ? "#C9A84C" : "#eee",
                    }}
                  />
                ),
              )}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

// ─── CSS Blouse Illustration ─────────────────────────────────────────────────

function BlouseIllustration() {
  return (
    <div
      style={{
        position: "relative",
        width: 180,
        height: 200,
        margin: "0 auto",
      }}
    >
      {/* Fabric background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.15), transparent 70%)",
          borderRadius: "50%",
        }}
      />
      {/* Main blouse body */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 110,
          height: 110,
          background:
            "linear-gradient(160deg, #f5c842 0%, #e8a020 40%, #c67c10 100%)",
          borderRadius: "8px 8px 40% 40%",
          boxShadow:
            "0 8px 32px rgba(200,120,20,0.3), inset 0 2px 8px rgba(255,255,255,0.3)",
          overflow: "hidden",
        }}
      >
        {/* Fabric sheen */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            width: "30%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
            transform: "skewX(-15deg)",
          }}
        />
        {/* Gold embroidery border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 22,
            background:
              "linear-gradient(90deg, rgba(255,220,100,0.6), rgba(255,200,50,0.8), rgba(255,220,100,0.6))",
            borderTop: "2px solid rgba(255,240,160,0.6)",
          }}
        >
          {/* Embroidery pattern */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              height: "100%",
              padding: "0 8px",
            }}
          >
            {(
              [
                ["k1", "◆"],
                ["k2", "◇"],
                ["k3", "◆"],
                ["k4", "◇"],
                ["k5", "◆"],
                ["k6", "◇"],
                ["k7", "◆"],
              ] as [string, string][]
            ).map(([k, sym]) => (
              <span
                key={k}
                style={{ color: "rgba(140,80,0,0.7)", fontSize: "7px" }}
              >
                {sym}
              </span>
            ))}
          </div>
        </div>
        {/* Neckline */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 60,
            height: 22,
            background: "#c67c10",
            borderRadius: "0 0 50% 50%",
            borderBottom: "2px solid rgba(255,200,50,0.5)",
          }}
        />
      </div>
      {/* Left sleeve */}
      <div
        style={{
          position: "absolute",
          bottom: 68,
          left: "50%",
          marginLeft: -84,
          width: 40,
          height: 60,
          background: "linear-gradient(160deg, #f0b830, #e09820, #c07010)",
          borderRadius: "8px 2px 20px 20px",
          transform: "rotate(-12deg)",
          boxShadow: "0 4px 16px rgba(180,100,10,0.2)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "40%",
            width: "30%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />
        {/* Sleeve embroidery cuff */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background:
              "linear-gradient(90deg, rgba(255,220,100,0.5), rgba(255,200,50,0.7), rgba(255,220,100,0.5))",
            borderTop: "1.5px solid rgba(255,240,160,0.5)",
          }}
        />
      </div>
      {/* Right sleeve */}
      <div
        style={{
          position: "absolute",
          bottom: 68,
          left: "50%",
          marginLeft: 44,
          width: 40,
          height: 60,
          background: "linear-gradient(160deg, #f0b830, #e09820, #c07010)",
          borderRadius: "2px 8px 20px 20px",
          transform: "rotate(12deg)",
          boxShadow: "0 4px 16px rgba(180,100,10,0.2)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "30%",
            width: "30%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background:
              "linear-gradient(90deg, rgba(255,220,100,0.5), rgba(255,200,50,0.7), rgba(255,220,100,0.5))",
            borderTop: "1.5px solid rgba(255,240,160,0.5)",
          }}
        />
      </div>
      {/* Dupatta/drape */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          marginLeft: 30,
          width: 48,
          height: 90,
          background:
            "linear-gradient(160deg, rgba(255,200,60,0.4), rgba(245,180,30,0.5), rgba(220,140,10,0.3))",
          borderRadius: "4px 20px 20px 4px",
          transform: "rotate(6deg)",
          filter: "blur(0.5px)",
        }}
      />
      {/* Label tag */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 14,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 6,
          padding: "3px 7px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          border: "1px solid rgba(201,168,76,0.3)",
        }}
      >
        <div
          style={{
            color: "#C9A84C",
            fontSize: "7px",
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          PREMIUM
        </div>
        <div style={{ color: "#555", fontSize: "6px" }}>100% Silk</div>
      </div>
    </div>
  );
}

// ─── Left Card: Shopify Themes ────────────────────────────────────────────────

function ShopifyThemesCard({ activeTab }: { activeTab: string }) {
  const tabThemes: Record<
    string,
    { label: string; tagline: string; color: string }[]
  > = {
    Fashion: [
      {
        label: "LUXE FASHION",
        tagline: "Dark luxury streetwear theme",
        color: "#111",
      },
      { label: "BIJOU", tagline: "Elegant jewelry boutique", color: "#fafaf8" },
      { label: "GLOW", tagline: "Rose beauty & skincare", color: "#fff5f7" },
    ],
    Jewelry: [
      { label: "BIJOU", tagline: "Elegant jewelry boutique", color: "#fafaf8" },
      {
        label: "GEMSTONE",
        tagline: "Luxury gem marketplace",
        color: "#0a0a14",
      },
      {
        label: "AURUM",
        tagline: "Gold & diamond specialist",
        color: "#fff9f0",
      },
    ],
    Beauty: [
      { label: "GLOW", tagline: "Rose beauty & skincare", color: "#fff5f7" },
      { label: "BLOOM", tagline: "Natural & organic beauty", color: "#f0faf0" },
      { label: "VELVET", tagline: "Luxury makeup studio", color: "#1a0014" },
    ],
    Electronics: [
      {
        label: "TECHPRO",
        tagline: "Premium electronics store",
        color: "#0a0a14",
      },
      { label: "GADGET+", tagline: "Smart home & devices", color: "#0d1117" },
      { label: "CIRCUIT", tagline: "Components & DIY kits", color: "#111" },
    ],
    Home: [
      { label: "SERENE", tagline: "Minimal home décor", color: "#f8f6f2" },
      { label: "HAVEN", tagline: "Cozy interior studio", color: "#f5f0e8" },
      { label: "CRAFT", tagline: "Artisan furniture & more", color: "#1a1208" },
    ],
    Fitness: [
      {
        label: "POWERFIT",
        tagline: "Performance sportswear",
        color: "#0d0d0d",
      },
      { label: "ZENFLOW", tagline: "Yoga & wellness store", color: "#f0faf5" },
      { label: "REPSMAX", tagline: "Gym equipment & gear", color: "#0a1220" },
    ],
  };
  const themes = tabThemes[activeTab] || tabThemes.Fashion;
  const Mockups = [FashionStoreMini, JewelryStoreMini, BeautyStoreMini];

  return (
    <div
      className="h-card hero-animate-in"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        height: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 2,
            }}
          >
            {/* Shopify icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-label="Shopify"
              role="img"
            >
              <title>Shopify</title>
              <path
                d="M15.337 23.979l7.291-1.574S19.797 7.194 19.779 7.02c-.018-.175-.175-.292-.319-.292-.144 0-2.719-.058-2.719-.058s-1.793-1.76-1.984-1.951V23.98h.58z"
                fill="#95BF47"
              />
              <path
                d="M12.102 8.044l-.868 2.747s-.975-.466-2.164-.466c-1.753 0-1.841 1.1-1.841 1.374 0 1.508 3.932 2.085 3.932 5.625 0 2.782-1.765 4.576-4.144 4.576-2.856 0-4.318-1.783-4.318-1.783l.764-2.524s1.503 1.288 2.769 1.288c.828 0 1.163-.649 1.163-1.123 0-1.96-3.224-2.047-3.224-5.3 0-2.724 1.96-5.36 5.921-5.36 1.524 0 2.01.447 2.01.447z"
                fill="#5E8E3E"
              />
              <path
                d="M14.41 4.065c-.018 0-.36.01-.36.01s-.533-1.63-1.82-1.63c-.017 0-.033 0-.05.002C11.784.97 10.84.5 10.055.5 5.876.5 3.882 5.6 3.235 8.44c-1.678.52-2.87.89-3.022.938-.936.293-.965.32-.085 1.203.686.68 5.42 4.69 5.42 4.69l6.282-1.357L14.41 4.065z"
                fill="#95BF47"
              />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>
              800+ Shopify Themes
            </span>
          </div>
          <div style={{ fontSize: 12, color: "#6B6B6B" }}>
            Launch any store instantly
          </div>
        </div>
        <div
          style={{
            background: "#f0fdf4",
            color: "#166534",
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: 20,
            border: "1px solid #bbf7d0",
            whiteSpace: "nowrap",
          }}
        >
          Premium
        </div>
      </div>

      {/* Mini website mockups */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}
      >
        {themes.slice(0, 3).map((theme, i) => {
          const MiniComp = Mockups[i];
          return (
            <div
              key={theme.label}
              style={{ flex: 1, opacity: 1, transition: "opacity 0.3s ease" }}
            >
              <MiniComp />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 5,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    background:
                      i === 0 ? "#111" : i === 1 ? "#f5e6c8" : "#fce4e8",
                    borderRadius: 2,
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                />
                <span
                  style={{ fontSize: 11, fontWeight: 600, color: "#1A1A1A" }}
                >
                  {theme.label}
                </span>
                <span style={{ fontSize: 10, color: "#6B6B6B" }}>
                  — {theme.tagline}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 8,
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <span style={{ fontSize: 11, color: "#6B6B6B" }}>
          + 800 more themes included
        </span>
        <span
          style={{
            fontSize: 11,
            color: "#C9A84C",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Browse →
        </span>
      </div>
    </div>
  );
}

// ─── Center Card: Featured Product ───────────────────────────────────────────

function FeaturedProductCard({
  countdown,
}: { countdown: { h: number; m: number; s: number } }) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="h-card-elevated hero-float"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        zIndex: 10,
        position: "relative",
      }}
    >
      {/* Top tag */}
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #fff3cd, #ffeaa7)",
            color: "#92610a",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 14px",
            borderRadius: 20,
            border: "1px solid rgba(201,168,76,0.3)",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span style={{ fontSize: 10 }}>⚡</span> Limited Time Offer
        </div>
      </div>

      {/* Product title */}
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#1A1A1A",
            letterSpacing: -0.3,
            lineHeight: 1.2,
          }}
        >
          Premium Silk Blouse
        </div>
        <div style={{ fontSize: 12, color: "#6B6B6B", marginTop: 4 }}>
          Ethnic wear · Handcrafted · Gold embroidery
        </div>
      </div>

      {/* Product visual */}
      <div
        style={{
          background:
            "linear-gradient(160deg, #FFF9EF 0%, #FFF3DC 60%, #FFE8BE 100%)",
          borderRadius: 12,
          padding: "8px 0 0",
          marginBottom: 14,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.12), transparent 60%)",
          }}
        />
        <BlouseIllustration />
      </div>

      {/* Price */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 26, fontWeight: 900, color: "#1A1A1A" }}>
          ₹2,499
        </span>
        <span
          style={{
            fontSize: 15,
            color: "#aaa",
            textDecoration: "line-through",
            fontWeight: 400,
          }}
        >
          ₹4,999
        </span>
        <span
          style={{
            background: "#FF3B30",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 6,
          }}
        >
          50% OFF
        </span>
      </div>

      {/* Countdown */}
      <div
        style={{
          background: "#FAF7F2",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 14,
          border: "1px solid rgba(201,168,76,0.2)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#6B6B6B",
            textAlign: "center",
            marginBottom: 8,
            fontWeight: 500,
            letterSpacing: 0.5,
            textTransform: "uppercase" as const,
          }}
        >
          Offer Ends In
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div className="h-countdown-digit">{pad(countdown.h)}</div>
            <div
              style={{
                fontSize: 9,
                color: "#6B6B6B",
                marginTop: 3,
                letterSpacing: 0.5,
              }}
            >
              HRS
            </div>
          </div>
          <div
            style={{
              color: "#C9A84C",
              fontWeight: 700,
              fontSize: 18,
              paddingBottom: 12,
            }}
          >
            :
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="h-countdown-digit">{pad(countdown.m)}</div>
            <div
              style={{
                fontSize: 9,
                color: "#6B6B6B",
                marginTop: 3,
                letterSpacing: 0.5,
              }}
            >
              MIN
            </div>
          </div>
          <div
            style={{
              color: "#C9A84C",
              fontWeight: 700,
              fontSize: 18,
              paddingBottom: 12,
            }}
          >
            :
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              className="h-countdown-digit"
              style={{ animation: "countdown-pulse 1s ease-in-out infinite" }}
            >
              {pad(countdown.s)}
            </div>
            <div
              style={{
                fontSize: 9,
                color: "#6B6B6B",
                marginTop: 3,
                letterSpacing: 0.5,
              }}
            >
              SEC
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 14,
          padding: "8px 0",
          borderTop: "1px solid rgba(0,0,0,0.05)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        {[
          { icon: "🔒", label: "Secure" },
          { icon: "🚚", label: "Free Shipping" },
          { icon: "🔄", label: "30 Day Return" },
        ].map((b) => (
          <div
            key={b.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <span style={{ fontSize: 16 }}>{b.icon}</span>
            <span style={{ fontSize: 10, color: "#555", fontWeight: 500 }}>
              {b.label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        type="button"
        className="h-cta-btn"
        data-ocid="hero.primary_button"
      >
        Add to Cart
      </button>

      {/* Reviews */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginTop: 10,
        }}
      >
        <div style={{ display: "flex" }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} style={{ color: "#f59e0b", fontSize: 12 }}>
              ★
            </span>
          ))}
        </div>
        <span style={{ fontSize: 11, color: "#6B6B6B" }}>
          4.9 · 2,847 reviews
        </span>
      </div>
    </div>
  );
}

// ─── Right Card: Ad Creatives + Instagram/Templates ──────────────────────────

function CreativesAndMockupsCard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        height: "100%",
      }}
    >
      {/* Top: Ad Creatives */}
      <div className="h-card hero-animate-in-delay-1" style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 2,
              }}
            >
              {/* Canva icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Canva"
                role="img"
              >
                <title>Canva</title>
                <rect width="24" height="24" rx="6" fill="#7D2AE8" />
                <text x="5" y="17" fontSize="13" fontWeight="800" fill="white">
                  C
                </text>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>
                1000+ Ad Creatives
              </span>
            </div>
            <div style={{ fontSize: 11, color: "#6B6B6B" }}>
              Run high-converting ads easily
            </div>
          </div>
          <div
            style={{
              background: "#faf5ff",
              color: "#7c3aed",
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 8px",
              borderRadius: 20,
              border: "1px solid #e9d5ff",
              whiteSpace: "nowrap",
            }}
          >
            Canva
          </div>
        </div>

        {/* Ad creative thumbnails */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <AdCreativeSquare />
          <AdCreativeFestival />
          <AdCreativeStory />
        </div>
      </div>

      {/* Bottom: Instagram + Canva Templates */}
      <div className="h-card hero-animate-in-delay-2" style={{ flex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 10,
          }}
        >
          {/* Instagram column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginBottom: 8,
              }}
            >
              {/* Instagram icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Instagram"
                role="img"
              >
                <title>Instagram</title>
                <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
                <defs>
                  <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0">
                    <stop stopColor="#f09433" />
                    <stop offset="0.25" stopColor="#e6683c" />
                    <stop offset="0.5" stopColor="#dc2743" />
                    <stop offset="0.75" stopColor="#cc2366" />
                    <stop offset="1" stopColor="#bc1888" />
                  </linearGradient>
                </defs>
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1A1A" }}>
                130+ Mockups
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <InstagramPostMini type="reel" />
              <InstagramPostMini type="product" />
            </div>
          </div>

          {/* Canva Templates column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginBottom: 8,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Canva Templates"
                role="img"
              >
                <title>Canva Templates</title>
                <rect width="24" height="24" rx="6" fill="#00C4CC" />
                <text x="5" y="17" fontSize="13" fontWeight="800" fill="white">
                  C
                </text>
              </svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1A1A" }}>
                7500+ Templates
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CanvaTemplateMini type="planner" />
              <CanvaTemplateMini type="tracker" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            background: "linear-gradient(135deg, #f8f5ff, #faf7f2)",
            borderRadius: 8,
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1A1A1A" }}>
              All-in-One Bundle
            </div>
            <div style={{ fontSize: 10, color: "#6B6B6B" }}>
              9,840+ assets included
            </div>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #D4A017, #F4C542)",
              color: "#1a1a1a",
              fontSize: 10,
              fontWeight: 700,
              padding: "5px 12px",
              borderRadius: 8,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Get Kit →
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Category Tabs ────────────────────────────────────────────────────────────

function CategoryTabs({
  active,
  onSelect,
}: { active: string; onSelect: (t: string) => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: "6px",
        background: "rgba(255,255,255,0.8)",
        borderRadius: 50,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.05)",
        backdropFilter: "blur(8px)",
        flexWrap: "wrap" as const,
      }}
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`h-tab${active === cat ? " active" : ""}`}
          onClick={() => onSelect(cat)}
          data-ocid="hero.tab"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState("Fashion");
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s <= 0 ? INITIAL_SECONDS : s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = {
    h: Math.floor(seconds / 3600),
    m: Math.floor((seconds % 3600) / 60),
    s: seconds % 60,
  };

  const handleTabSelect = useCallback((tab: string) => setActiveTab(tab), []);

  return (
    <div data-theme="hero" style={{ minHeight: "100vh", padding: "0 0 60px" }}>
      {/* Header */}
      <header
        style={{
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          background: "rgba(250,247,242,0.9)",
          backdropFilter: "blur(12px)",
          position: "sticky" as const,
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #D4A017, #F4C542)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(212,160,23,0.3)",
            }}
          >
            <span style={{ color: "#1a1a1a", fontWeight: 900, fontSize: 14 }}>
              7F
            </span>
          </div>
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#1A1A1A",
                letterSpacing: -0.3,
              }}
            >
              DigitalKit Store
            </div>
            <div style={{ fontSize: 10, color: "#6B6B6B" }}>
              Premium Digital Products
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 12,
              color: "#6B6B6B",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ color: "#22c55e", fontSize: 8 }}>●</span> 847 people
            viewing now
          </span>
          <button
            type="button"
            className="h-cta-btn"
            style={{ width: "auto", padding: "9px 20px", fontSize: 13 }}
            data-ocid="header.primary_button"
          >
            Get Instant Access
          </button>
        </div>
      </header>

      {/* Main hero */}
      <main
        style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 0" }}
      >
        {/* Headline */}
        <div
          className="hero-animate-in"
          style={{ textAlign: "center", marginBottom: 28 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "linear-gradient(135deg, #fff3cd, #ffeaa7)",
              color: "#92610a",
              fontSize: 12,
              fontWeight: 700,
              padding: "5px 16px",
              borderRadius: 20,
              marginBottom: 16,
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <span style={{ fontSize: 11 }}>🏆</span> India's #1 Digital Product
            Bundle
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 900,
              color: "#1A1A1A",
              lineHeight: 1.15,
              letterSpacing: -1,
              marginBottom: 12,
            }}
          >
            Premium Digital Products
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #C9A84C, #F4C542, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              for Every Store
            </span>
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#6B6B6B",
              maxWidth: 480,
              margin: "0 auto 20px",
              lineHeight: 1.6,
            }}
          >
            800+ Shopify Themes · 1000+ Ad Creatives · 7500+ Canva Templates &
            More
          </p>
        </div>

        {/* Category tabs */}
        <div
          className="hero-animate-in-delay-1"
          style={{ marginBottom: 28, maxWidth: 680, margin: "0 auto 28px" }}
        >
          <CategoryTabs active={activeTab} onSelect={handleTabSelect} />
        </div>

        {/* Three-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 1fr)",
            gap: 18,
            alignItems: "start",
          }}
        >
          {/* Left: Shopify Themes */}
          <ShopifyThemesCard activeTab={activeTab} />

          {/* Center: Featured Product */}
          <FeaturedProductCard countdown={countdown} />

          {/* Right: Ad Creatives + Instagram/Templates */}
          <CreativesAndMockupsCard />
        </div>

        {/* Social proof strip */}
        <div
          className="hero-animate-in-delay-3"
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            flexWrap: "wrap" as const,
            padding: "16px 24px",
            background: "rgba(255,255,255,0.7)",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.05)",
            backdropFilter: "blur(8px)",
          }}
        >
          {[
            { value: "12,400+", label: "Happy Customers" },
            { value: "9,840+", label: "Digital Assets" },
            { value: "₹50,000+", label: "Total Value" },
            { value: "4.9★", label: "Average Rating" },
            { value: "Free", label: "Lifetime Updates" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#1A1A1A" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: "#6B6B6B" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
