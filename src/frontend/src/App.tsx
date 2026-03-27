import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Check,
  ChevronRight,
  Download,
  Infinity as InfinityIcon,
  Menu,
  RefreshCw,
  Shield,
  Star,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const CHECKOUT_URL =
  "https://superprofile.bio/vp/the-7-figure-store-kit-%E2%80%93-instant-access";
const GOLD = "#C9A74E";
const GOLD_LIGHT = "#E6C873";
const GOLD_DARK = "#A8863A";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function trackCTA() {
  if (window.fbq) {
    window.fbq("track", "AddToCart");
    window.fbq("track", "InitiateCheckout");
    window.fbq("trackCustom", "OutboundClick");
  }
  window.location.href = CHECKOUT_URL;
}

function usePixelTracking() {
  useEffect(() => {
    const scrollMilestones: Record<number, boolean> = {
      25: false,
      50: false,
      75: false,
      90: false,
    };
    const handleScroll = () => {
      const scrolled =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      for (const [milestone, fired] of Object.entries(scrollMilestones)) {
        const ms = Number(milestone);
        if (!fired && scrolled >= ms) {
          scrollMilestones[ms] = true;
          window.fbq?.("trackCustom", `Scroll${ms}`);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    const t10 = setTimeout(() => window.fbq?.("trackCustom", "Time10s"), 10000);
    const t30 = setTimeout(() => window.fbq?.("trackCustom", "Time30s"), 30000);
    const t60 = setTimeout(() => window.fbq?.("trackCustom", "Time60s"), 60000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t10);
      clearTimeout(t30);
      clearTimeout(t60);
    };
  }, []);
}

// ------ FADE UP WRAPPER ------
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GoldButton({
  children,
  className = "",
  size = "default",
  onClick,
  vibrate = false,
  premium = false,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "large";
  onClick?: () => void;
  vibrate?: boolean;
  premium?: boolean;
}) {
  const [boxShadow, setBoxShadow] = useState(
    "0 0 24px rgba(201,167,78,0.35), 0 4px 16px rgba(201,167,78,0.20)",
  );

  return (
    <motion.button
      type="button"
      onClick={onClick ?? trackCTA}
      onHoverStart={() => window.fbq?.("trackCustom", "ButtonHover")}
      animate={vibrate ? { x: [0, -3, 3, -3, 3, 0] } : {}}
      transition={
        vibrate
          ? {
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2.5,
            }
          : {}
      }
      whileHover={premium ? { scale: 1.05, y: -2 } : { scale: 1.04, y: -2 }}
      whileTap={premium ? { scale: 0.97 } : { scale: 0.98 }}
      onMouseEnter={() =>
        setBoxShadow(
          "0 0 36px rgba(201,167,78,0.60), 0 6px 24px rgba(201,167,78,0.40)",
        )
      }
      onMouseLeave={() =>
        setBoxShadow(
          "0 0 24px rgba(201,167,78,0.35), 0 4px 16px rgba(201,167,78,0.20)",
        )
      }
      className={`btn-gold inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-wide cursor-pointer ${
        size === "large" ? "px-8 py-4 text-base" : "px-5 py-2.5 text-sm"
      } ${className}`}
      style={{
        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
        color: "#000000",
        boxShadow,
        transition: "box-shadow 0.3s ease",
      }}
    >
      {children}
    </motion.button>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {["s1", "s2", "s3", "s4", "s5"].slice(0, count).map((k) => (
        <Star
          key={k}
          className="w-3.5 h-3.5 fill-current"
          style={{ color: GOLD }}
        />
      ))}
    </div>
  );
}

// ------ SECTION HEADING HELPER ------
function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <FadeUp className="flex flex-col items-center text-center mb-8">
      {eyebrow && (
        <p
          className="text-xs font-bold tracking-widest uppercase mb-2"
          style={{ color: GOLD_DARK }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-2xl md:text-3xl font-bold tracking-tight max-w-xl mx-auto"
        style={{ color: "#0A0A0A" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-sm mt-2 max-w-lg mx-auto"
          style={{ color: "#6B7280" }}
        >
          {subtitle}
        </p>
      )}
    </FadeUp>
  );
}

// ------ NAVBAR ------
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <span
          className="text-base font-black tracking-wide"
          style={{ color: "#0A0A0A" }}
        >
          The 7-Figure Store Kit
        </span>
        <nav className="hidden md:flex items-center gap-6">
          {["Benefits", "Preview", "Reviews", "FAQ"].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm font-medium transition-colors duration-200 cursor-pointer"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = GOLD;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6B7280";
              }}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="hidden md:block">
          <GoldButton>Get Instant Access</GoldButton>
        </div>
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ color: "#0A0A0A" }}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden px-4 pb-3"
            style={{ background: "rgba(255,255,255,0.98)" }}
          >
            {["Benefits", "Preview", "Reviews", "FAQ"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left py-2.5 text-sm font-medium border-b"
                style={{ color: "#6B7280", borderColor: "#E5E7EB" }}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ------ HERO ------
function Hero() {
  return (
    <motion.section
      id="hero"
      className="relative overflow-hidden py-12 md:py-20"
      style={{ background: "#FFFFFF" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* 1. Tag */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase inline-flex items-center gap-1.5 mb-5"
          style={{
            background: "rgba(201,167,78,0.1)",
            border: "1px solid rgba(201,167,78,0.35)",
            color: GOLD_DARK,
          }}
        >
          <Zap className="w-3 h-3" /> Limited Time Offer
        </motion.span>

        {/* 2. Headline */}
        <motion.h1
          className="font-black leading-tight tracking-tight mb-4 text-3xl md:text-4xl lg:text-5xl max-w-xl mx-auto text-center"
          style={{ color: "#0A0A0A" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
        >
          Launch Your Shopify Store Faster — Without Wasting Time or Money
        </motion.h1>

        {/* 3. Subheadline with highlighted numbers */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-base md:text-lg font-medium mb-3 max-w-md mx-auto text-center"
          style={{ color: "#374151" }}
        >
          <span style={{ fontWeight: 700, color: "#0A0A0A" }}>800+</span>{" "}
          Themes,{" "}
          <span style={{ fontWeight: 700, color: "#0A0A0A" }}>1000+</span> Ad
          Creatives &amp;{" "}
          <span style={{ fontWeight: 700, color: "#0A0A0A" }}>7500+</span>{" "}
          Templates in One Kit
        </motion.p>

        {/* 4. Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-1.5 mb-8"
        >
          <StarRating />
          <span className="text-sm font-semibold" style={{ color: "#0A0A0A" }}>
            4.9/5
          </span>
          <span className="text-sm" style={{ color: "#6B7280" }}>
            from 1,800+ users
          </span>
        </motion.div>

        {/* 5. Price */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="flex items-baseline justify-center gap-2 mb-1"
        >
          <span className="text-4xl font-black" style={{ color: "#0A0A0A" }}>
            ₹499
          </span>
          <span className="text-sm line-through" style={{ color: "#9CA3AF" }}>
            ₹1,299
          </span>
          <span className="text-sm" style={{ color: "#6B7280" }}>
            · ₹50,000+ value
          </span>
        </motion.div>

        {/* 5b. Urgency */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          className="text-xs font-semibold mb-8 text-center"
          style={{ color: GOLD_DARK }}
        >
          ⚡ Limited-time pricing — price increases soon
        </motion.p>

        {/* 6. CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52 }}
          className="mb-6 flex justify-center"
        >
          <GoldButton size="large" premium>
            Get Instant Access <ChevronRight className="w-4 h-4" />
          </GoldButton>
        </motion.div>

        {/* 7. Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 mb-10 text-xs"
          style={{ color: "#374151" }}
        >
          {[
            "Instant Access",
            "Lifetime Access",
            "No Subscription",
            "Commercial Use",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1">
              <Check className="w-3 h-3" style={{ color: GOLD }} />
              {item}
            </span>
          ))}
        </motion.div>

        {/* 8. Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 8px 48px rgba(0,0,0,0.12), 0 2px 16px rgba(201,167,78,0.08)",
          }}
        >
          <motion.img
            src="/assets/generated/hero-premium-bundle-mockup.dim_1400x900.jpg"
            alt="The 7-Figure Store Kit — Full Digital Bundle"
            className="w-full h-auto object-cover"
            loading="lazy"
            animate={{ scale: [1, 1.03] }}
            transition={{ duration: 7, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

// ------ BENEFITS ------
const TICKER_ITEMS = [
  "Launch Your Store in Minutes",
  "Start Earning Faster",
  "Get Converting Ads",
  "No Skills Required",
  "Save 100+ Hours of Work",
  "Scale Like a Brand",
  "Zero Investment Needed",
  "Lifetime Access & Updates",
];

const GOLD_KEYWORDS = ["Launch", "Earning", "Scale", "Lifetime"];

function highlightKeywords(text: string) {
  const parts = text.split(/\b/);
  return parts.map((part, i) => {
    if (GOLD_KEYWORDS.includes(part)) {
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: static text parts
        <span key={i} style={{ color: GOLD, fontWeight: 600 }}>
          {part}
        </span>
      );
    }
    return part;
  });
}

function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  useEffect(() => {
    if (isInView) window.fbq?.("track", "ViewContent");
  }, [isInView]);

  const repeated = [
    ...TICKER_ITEMS.map((t) => `a-${t}`),
    ...TICKER_ITEMS.map((t) => `b-${t}`),
    ...TICKER_ITEMS.map((t) => `c-${t}`),
  ];

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="py-6"
      style={{ background: "#FFFFFF" }}
    >
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .ticker-track {
          animation: ticker-scroll 45s linear infinite;
          display: flex;
          width: max-content;
        }
      `}</style>
      <FadeUp className="text-center mb-4">
        <h2
          className="text-base md:text-lg font-medium tracking-tight"
          style={{ color: "#0A0A0A" }}
        >
          Why Choose This Kit
        </h2>
        <div
          className="mx-auto mt-1.5 rounded-full"
          style={{
            width: 28,
            height: 2,
            background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
          }}
        />
      </FadeUp>
      <div
        style={{
          overflow: "hidden",
          maskImage:
            "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
        }}
      >
        <div className="ticker-track">
          {repeated.map((item) => (
            <span
              key={item}
              className="whitespace-nowrap"
              style={{
                opacity: 0.92,
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.01em",
                padding: "0 0.6rem",
                color: "#0A0A0A",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              {highlightKeywords(item.slice(2))}
              <span style={{ color: GOLD, opacity: 0.7, fontSize: "0.7rem" }}>
                •
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ PREVIEW ------
const PREVIEW_ITEMS: {
  type: "shopify" | "canva" | "instagram" | "plr" | "code";
  label: string;
  benefit: string;
  src: string;
  alt: string;
}[] = [
  {
    type: "shopify",
    label: "800+ Shopify Premium Themes",
    benefit: "Launch your store faster — any niche, any brand",
    src: "/assets/generated/preview-shopify-themes.dim_800x500.jpg",
    alt: "Shopify store themes preview",
  },
  {
    type: "canva",
    label: "1000+ Canva Ad Creatives",
    benefit: "Run high-converting ads without a designer",
    src: "/assets/generated/preview-canva-ads.dim_800x500.jpg",
    alt: "Canva ad templates dashboard",
  },
  {
    type: "instagram",
    label: "130+ Instagram Branding Mockups",
    benefit: "Build premium brand visuals in minutes",
    src: "/assets/generated/preview-instagram-kit.dim_800x500.jpg",
    alt: "Instagram feed mockups",
  },
  {
    type: "plr",
    label: "7500+ Canva Templates",
    benefit: "Sell or use planners, journals & trackers instantly",
    src: "/assets/generated/canva-templates-mockup.dim_1200x800.jpg",
    alt: "Canva planners, journals & trackers templates",
  },
  {
    type: "code",
    label: "210+ Conversion Code Snippets",
    benefit: "Boost store sales automatically — no dev needed",
    src: "/assets/generated/code-snippets-preview.dim_1400x700.jpg",
    alt: "210+ Conversion Code Snippets — split mockup of code editor and Shopify product page",
  },
];

function PreviewSection() {
  return (
    <section id="preview" className="py-16" style={{ background: "#FAFAFA" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Real assets included" title="Inside the Kit" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PREVIEW_ITEMS.map((item, i) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{
                y: -3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
              }}
              className={`relative overflow-hidden rounded-xl${item.type === "code" ? " md:col-span-2" : ""}`}
              style={{
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.03)",
                transition: "box-shadow 0.25s ease",
              }}
            >
              <div className="aspect-video relative">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3 text-center"
                style={{
                  background: "linear-gradient(transparent, rgba(0,0,0,0.58))",
                }}
              >
                <span className="text-white font-semibold text-sm block">
                  {item.label}
                </span>
                <span
                  className="text-xs block mt-0.5"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {item.benefit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ WHAT YOU GET ------
function WhatYouGet() {
  const items: {
    title: string;
    desc: string;
  }[] = [
    { title: "800+ Shopify Themes", desc: "Launch your store instantly" },
    { title: "1000+ Ad Creatives", desc: "Run high-converting ads easily" },
    { title: "210+ Code Snippets", desc: "Boost conversions automatically" },
    { title: "7500+ Canva Templates", desc: "Create premium content fast" },
    { title: "130+ Instagram Mockups", desc: "Build brand like an agency" },
    { title: "Free Lifetime Updates", desc: "New assets added regularly" },
  ];

  return (
    <section
      id="bundle"
      className="py-14 md:py-20"
      style={{ background: "#FAFAFA" }}
    >
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <SectionHeading
          title="What You Get"
          subtitle="The ₹50,000+ Value Breakdown"
        />

        <div className="flex flex-col">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center text-center py-6"
              style={{
                borderBottom:
                  i < items.length - 1 ? "1px solid #EBEBEB" : "none",
              }}
            >
              {/* Tick icon centered */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center mb-3"
                style={{
                  background: "rgba(201,167,78,0.12)",
                  border: "1px solid rgba(201,167,78,0.3)",
                }}
              >
                <Check className="w-3.5 h-3.5" style={{ color: GOLD_DARK }} />
              </div>
              {/* Title */}
              <span
                className="font-bold text-sm leading-snug mb-1"
                style={{ color: "#0A0A0A" }}
              >
                {item.title}
              </span>
              {/* Description */}
              <span
                className="text-xs leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {item.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ BONUSES ------
function Bonuses() {
  const bonuses = [
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "FREE Future Updates",
      desc: "New themes, templates & creatives added regularly — yours free, forever. Your toolkit grows without you paying again.",
    },
    {
      icon: <InfinityIcon className="w-6 h-6" />,
      title: "Lifetime Access",
      desc: "Pay ₹499 once. Own everything forever. No subscriptions, no renewals — access your files 5 years from now, free.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Commercial Usage Allowed",
      desc: "Use for unlimited client stores and your own brand. Sell the templates, charge for setup, keep 100% of the profit.",
    },
  ];
  return (
    <section
      className="py-14"
      style={{
        background: "rgba(201,167,78,0.05)",
        borderTop: "1px solid rgba(201,167,78,0.35)",
        borderBottom: "1px solid rgba(201,167,78,0.35)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeUp className="flex justify-center mb-4">
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              color: "#000000",
              boxShadow: "0 2px 10px rgba(201,167,78,0.25)",
            }}
          >
            EXCLUSIVE BONUSES
          </span>
        </FadeUp>
        <FadeUp delay={0.1} className="text-center mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2 tracking-tight max-w-xl mx-auto"
            style={{ color: "#0A0A0A" }}
          >
            Exclusive Bonuses
          </h2>
          <div
            className="mx-auto mt-1.5 rounded-full"
            style={{
              width: 40,
              height: 2,
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            }}
          />
          <p
            className="text-sm mt-2 max-w-md mx-auto"
            style={{ color: "#6B7280" }}
          >
            Everything included in your one-time purchase
          </p>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-4">
          {bonuses.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -3,
                boxShadow: "0 8px 32px rgba(201,167,78,0.12)",
              }}
              className="relative p-5 rounded-xl text-center flex flex-col items-center gap-2.5 bg-white"
              style={{
                border: "1px solid rgba(201,167,78,0.35)",
                boxShadow:
                  "0 2px 12px rgba(201,167,78,0.08), 0 1px 4px rgba(0,0,0,0.03)",
                transition: "box-shadow 0.25s ease",
              }}
            >
              <span
                className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                  color: "#000000",
                }}
              >
                FREE
              </span>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(201,167,78,0.1)",
                  color: GOLD_DARK,
                  border: "1px solid rgba(201,167,78,0.3)",
                }}
              >
                {b.icon}
              </div>
              <h3 className="text-sm font-bold" style={{ color: "#0A0A0A" }}>
                {b.title}
              </h3>
              <p
                className="text-xs leading-relaxed max-w-xs mx-auto"
                style={{ color: "#6B7280" }}
              >
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ REVIEWS ------
const REVIEWS = [
  {
    name: "Rahul M.",
    location: "Delhi",
    initials: "RM",
    text: "Launched my Shopify store in 2 days. Already hit ₹30,000 in sales in the first week. These themes are insanely polished.",
  },
  {
    name: "Priya S.",
    location: "Mumbai",
    initials: "PS",
    text: "Best ₹499 I've ever spent. The Canva templates alone saved me ₹15,000 in design fees. Using them for all 6 of my clients.",
  },
  {
    name: "Arjun K.",
    location: "Bangalore",
    initials: "AK",
    text: "Added the code snippets to my store and conversion rate jumped from 1.2% to 3.8%. My clients can't believe the difference.",
  },
  {
    name: "Sneha R.",
    location: "Pune",
    initials: "SR",
    text: "I was a complete beginner. 4 weeks after buying this kit, my store crossed ₹1 lakh in revenue. Totally beginner-friendly.",
  },
  {
    name: "Karan V.",
    location: "Hyderabad",
    initials: "KV",
    text: "The Instagram branding kit transformed my feed. Went from 200 to 4,200 followers in 30 days. Sales doubled right after.",
  },
  {
    name: "Nisha T.",
    location: "Chennai",
    initials: "NT",
    text: "I've spent ₹40,000+ on courses with zero results. This ₹499 kit delivered more in 2 weeks than all of them combined.",
  },
  {
    name: "Dev A.",
    location: "Ahmedabad",
    initials: "DA",
    text: "Used the Canva templates to build a full digital product line over a weekend. Made ₹12,000 in the first 3 days of launch.",
  },
  {
    name: "Pooja L.",
    location: "Kolkata",
    initials: "PL",
    text: "Lifetime access is the real win. New templates keep dropping and I never pay again. This is the only purchase I don't regret.",
  },
  {
    name: "Mihir J.",
    location: "Surat",
    initials: "MJ",
    text: "I run a 6-client Shopify agency. This kit cut our store setup time from 2 weeks to 3 days. ROI was instant on day one.",
  },
  {
    name: "Ananya D.",
    location: "Jaipur",
    initials: "AD",
    text: "My first digital store went live in under 3 hours. Made my first ₹3,200 sale the same evening. Absolutely life-changing.",
  },
];

function ReviewCard({ r }: { r: (typeof REVIEWS)[0] & { uid?: string } }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col gap-2.5 p-4 rounded-xl bg-white text-center items-center"
      style={{
        width: 260,
        border: "1px solid #EBEBEB",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <StarRating />
      <p
        className="text-xs leading-relaxed italic"
        style={{ color: "#374151" }}
      >
        &ldquo;{r.text}&rdquo;
      </p>
      <div
        className="flex items-center justify-center gap-2.5 mt-auto pt-2 w-full"
        style={{ borderTop: "1px solid #EBEBEB" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            color: "#000",
          }}
        >
          {r.initials}
        </div>
        <div className="text-left">
          <div className="font-semibold text-xs" style={{ color: "#0A0A0A" }}>
            {r.name}
          </div>
          <div className="text-xs" style={{ color: "#9CA3AF" }}>
            {r.location}
          </div>
        </div>
      </div>
    </div>
  );
}

function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const doubled = [
    ...REVIEWS.map((r, i) => ({ ...r, uid: `a${i}` })),
    ...REVIEWS.map((r, i) => ({ ...r, uid: `b${i}` })),
  ];

  return (
    <section
      id="reviews"
      className="py-16 overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Real results from store owners across India"
        />
      </div>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <motion.div
          ref={trackRef}
          className="flex gap-3 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            ...(paused ? { playState: "paused" } : {}),
          }}
          style={{
            width: "max-content",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {doubled.map((r) => (
            <ReviewCard key={r.uid} r={r} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ------ FAQ ------
function FAQ() {
  const faqs = [
    {
      q: "How do I access the files after purchase?",
      a: "You'll receive an instant download link via email right after payment. The link is permanent — you can access your files anytime, forever.",
    },
    {
      q: "Is this beginner friendly?",
      a: "Absolutely! The vast majority of resources require zero coding knowledge. Just download, customize, and launch.",
    },
    {
      q: "Can I use this for multiple stores?",
      a: "Yes! Your purchase includes a full commercial license, allowing use across unlimited stores and client projects with no restrictions.",
    },
    {
      q: "What is the refund policy?",
      a: "Due to the instant-access digital nature of this product, we do not offer refunds after the files have been downloaded. If you face any issues, our support team is here to help.",
    },
    {
      q: "Do I need a Shopify subscription to use the themes?",
      a: "Yes, you'll need an active Shopify plan to upload and use the store themes. Canva templates, code snippets, and other resources can be used independently.",
    },
    {
      q: "Are future updates really free?",
      a: "Yes — any new themes, templates, or resources we add to the bundle are automatically available to all existing customers at no additional cost.",
    },
  ];
  return (
    <section id="faq" className="py-16" style={{ background: "#FAFAFA" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Got questions? We have answers."
        />
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <FadeUp key={faq.q} delay={i * 0.07}>
              <AccordionItem
                value={`faq-${i}`}
                className="rounded-xl overflow-hidden border-0 bg-white"
                style={{
                  border: "1px solid #EBEBEB",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <AccordionTrigger
                  className="px-5 py-4 text-center font-semibold text-sm hover:no-underline justify-center gap-2"
                  style={{ color: "#0A0A0A" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="px-5 pb-4 text-sm leading-relaxed text-center max-w-2xl mx-auto"
                  style={{ color: "#6B7280" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </FadeUp>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ------ FINAL CTA ------
function FinalCTA() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-5 max-w-xl mx-auto"
        >
          <h2
            className="text-3xl md:text-4xl font-black leading-tight max-w-lg mx-auto"
            style={{ color: "#0A0A0A" }}
          >
            Stop Waiting. Start Selling. Everything You Need is Here.
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#6B7280" }}>
            Join 1,800+ store owners who stopped wasting money on tools and
            started making real revenue.
          </p>
          <div
            className="px-6 py-4 rounded-xl bg-white"
            style={{
              border: "1px solid #EBEBEB",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="text-xs line-through mb-0.5"
              style={{ color: "#9CA3AF" }}
            >
              Was ₹1,299
            </div>
            <div className="text-4xl font-black" style={{ color: "#0A0A0A" }}>
              ₹499
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
              One-time payment · Lifetime access
            </div>
          </div>
          <p className="text-xs font-semibold" style={{ color: GOLD_DARK }}>
            ⚡ Limited offer — grab it before the price goes up
          </p>
          <div className="py-2 flex justify-center">
            <GoldButton size="large" className="text-base" vibrate>
              Get Instant Access <ChevronRight className="w-4 h-4" />
            </GoldButton>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              {
                icon: <Download className="w-3.5 h-3.5" />,
                label: "Instant Download",
              },
              {
                icon: <InfinityIcon className="w-3.5 h-3.5" />,
                label: "Lifetime Access",
              },
              {
                icon: <Shield className="w-3.5 h-3.5" />,
                label: "Commercial License",
              },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "#6B7280" }}
              >
                <span style={{ color: GOLD }}>{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ------ STICKY MOBILE CTA ------
function StickyCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-3 pt-2.5"
      style={{
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #E5E7EB",
      }}
    >
      <GoldButton className="w-full" size="large" vibrate>
        Claim Kit for ₹499 <ChevronRight className="w-4 h-4" />
      </GoldButton>
    </div>
  );
}

// ------ FOOTER ------
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#0A0A0A", borderTop: "1px solid #1F1F1F" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col items-center text-center gap-5 md:flex-row md:justify-between md:items-start md:text-left">
          <div className="flex flex-col gap-1.5 items-center md:items-start">
            <span className="text-base font-black" style={{ color: GOLD }}>
              The 7-Figure Store Kit
            </span>
            <p className="text-xs max-w-xs" style={{ color: "#6B7280" }}>
              The ultimate toolkit for building profitable ecommerce brands.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 items-center md:items-end">
            <div className="flex gap-5">
              {["Privacy Policy", "Terms of Use"].map((link) => (
                <button
                  type="button"
                  key={link}
                  className="text-xs transition-colors duration-200"
                  style={{ color: "#6B7280" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = GOLD;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#6B7280";
                  }}
                >
                  {link}
                </button>
              ))}
            </div>
            <a
              href="mailto:creatortoolssupport@gmail.com"
              className="text-xs transition-colors duration-200"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = GOLD;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6B7280";
              }}
            >
              creatortoolssupport@gmail.com
            </a>
          </div>
        </div>
        <div
          className="mt-6 pt-4 text-xs text-center"
          style={{ borderTop: "1px solid #1F1F1F", color: "#4B5563" }}
        >
          <p>© {year} The 7-Figure Store Kit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ------ PIXEL TRACKER ------
function PixelTracker() {
  usePixelTracking();
  return null;
}

// ------ MAIN APP ------
export default function App() {
  return (
    <div
      className="min-h-screen pb-20 md:pb-0"
      style={{ background: "#FFFFFF" }}
    >
      <PixelTracker />
      <Navbar />
      <main>
        <Hero />
        <WhatYouGet />
        <Benefits />
        <PreviewSection />
        <Bonuses />
        <Reviews />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
