import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
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

function GoldButton({
  children,
  className = "",
  size = "default",
  onClick,
  vibrate = false,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "large";
  onClick?: () => void;
  vibrate?: boolean;
}) {
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`btn-gold inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-wide cursor-pointer ${
        size === "large" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm"
      } ${className}`}
      style={{
        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
        color: "#000000",
        boxShadow:
          "0 0 20px rgba(201,167,78,0.28), 0 3px 12px rgba(201,167,78,0.15)",
      }}
    >
      {children}
    </motion.button>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
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

// ------ BRAND-STYLE ICON COMPONENTS ------
function ShopifyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-5 h-5"
      aria-label="Shopify"
      role="img"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function CanvaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className="w-5 h-5"
      aria-label="Canva"
      role="img"
    >
      <path d="M18.5 8A7 7 0 105.5 16" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-label="Code"
      role="img"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  );
}

function DigitalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-label="Digital Products"
      role="img"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function InstaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-label="Instagram"
      role="img"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function UpdatesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-label="Updates"
      role="img"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
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
            <div className="mt-3">
              <GoldButton className="w-full">Get Instant Access</GoldButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ------ FLOATING LABEL ------
function FloatingLabel({
  text,
  style = {},
}: { text: string; style?: React.CSSProperties }) {
  return (
    <div
      className="absolute px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap"
      style={{
        background: "#FFFFFF",
        border: `1.5px solid ${GOLD}`,
        color: "#0A0A0A",
        boxShadow:
          "0 3px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(201,167,78,0.15)",
        ...style,
      }}
    >
      {text}
    </div>
  );
}

// ------ HERO ------
function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden py-4 md:py-7"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-7 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full md:w-[60%] flex-shrink-0"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  "0 6px 40px rgba(0,0,0,0.10), 0 2px 12px rgba(201,167,78,0.08)",
              }}
            >
              <img
                src="/assets/generated/hero-premium-bundle-mockup.dim_1400x900.jpg"
                alt="The 7-Figure Store Kit — Full Digital Bundle"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <FloatingLabel
              text="800+ Shopify Premium Themes"
              style={{ top: "12%", left: "-4%" }}
            />
            <FloatingLabel
              text="1000+ Canva Ad Creatives"
              style={{ top: "28%", right: "-3%" }}
            />
            <FloatingLabel
              text="7500+ Canva Templates"
              style={{ bottom: "30%", left: "-4%" }}
            />
            <FloatingLabel
              text="210+ Conversion Code Snippets"
              style={{ bottom: "14%", right: "-2%" }}
            />
            <FloatingLabel
              text="130+ Instagram Branding Mockups"
              style={{ bottom: "-3%", left: "25%" }}
            />
            <FloatingLabel
              text="Free Lifetime Updates"
              style={{ bottom: "50%", right: "-3%" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full md:w-[40%] flex flex-col gap-4 text-center md:text-left items-center md:items-start"
          >
            <span
              className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase inline-flex items-center gap-1.5"
              style={{
                background: "rgba(201,167,78,0.1)",
                border: "1px solid rgba(201,167,78,0.4)",
                color: GOLD_DARK,
              }}
            >
              <Zap className="w-3 h-3" /> Limited Time Offer
            </span>
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight"
              style={{ color: "#0A0A0A" }}
            >
              Build, Scale &amp; Automate Your Brand
            </h1>
            <p className="text-sm md:text-base" style={{ color: "#6B7280" }}>
              All-in-one toolkit to launch and grow your store
            </p>
            <div className="flex items-end gap-3">
              <div>
                <span
                  className="block text-xs line-through mb-0.5"
                  style={{ color: "#9CA3AF" }}
                >
                  ₹50,000+ value
                </span>
                <span
                  className="text-4xl font-black"
                  style={{ color: "#0A0A0A" }}
                >
                  ₹999
                </span>
              </div>
              <span
                className="mb-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                  color: "#000",
                }}
              >
                One-time
              </span>
            </div>
            <GoldButton size="large" className="w-full sm:w-auto">
              Get Instant Access <ChevronRight className="w-4 h-4" />
            </GoldButton>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
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
                  label: "Commercial Rights",
                },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: "#6B7280" }}
                >
                  <span style={{ color: GOLD }}>{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ------ BENEFITS ------
const BENEFITS = [
  {
    title: "Launch Your Store in Minutes",
    desc: "No coding. No design stress. Just plug & play.",
  },
  {
    title: "Start Earning Faster",
    desc: "Ready-to-use systems that help you make sales quickly.",
  },
  {
    title: "Get Traffic Without Ads Experience",
    desc: "Create content that brings customers automatically.",
  },
  {
    title: "No Skills Required",
    desc: "Beginner-friendly setup — anyone can start.",
  },
  {
    title: "Save 100+ Hours of Work",
    desc: "Skip trial & error. Everything is already built.",
  },
  {
    title: "Scale Like a Brand",
    desc: "Use proven designs and systems used by successful stores.",
  },
  {
    title: "Zero Investment Needed",
    desc: "Run your business without inventory or upfront cost.",
  },
  {
    title: "Lifetime Access & Updates",
    desc: "Get new tools and templates without paying again.",
  },
];

function BenefitItem({
  title,
  desc,
  index,
}: { title: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="flex flex-col items-center text-center py-2.5 px-4 bg-white"
      style={{ border: "1px solid #F0F0F0" }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 32 } : { width: 0 }}
        transition={{ duration: 0.5, delay: index * 0.04 + 0.15 }}
        className="h-0.5 mb-1.5 rounded-full"
        style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})` }}
      />
      <h3
        className="text-base font-semibold mb-0.5 tracking-tight"
        style={{ color: "#0A0A0A" }}
      >
        {title}
      </h3>
      <p className="text-xs" style={{ color: "#6B7280", maxWidth: 320 }}>
        {desc}
      </p>
    </motion.div>
  );
}

function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  useEffect(() => {
    if (isInView) window.fbq?.("track", "ViewContent");
  }, [isInView]);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="py-5"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-2">
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {BENEFITS.map((b, i) => (
            <BenefitItem
              key={b.title}
              title={b.title}
              desc={b.desc}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ PREVIEW ------
const PREVIEW_ITEMS = [
  {
    type: "shopify" as const,
    label: "800+ Shopify Premium Themes",
    src: "/assets/generated/preview-shopify-themes.dim_800x500.jpg",
    alt: "Shopify store themes preview",
  },
  {
    type: "canva" as const,
    label: "1000+ Canva Ad Creatives",
    src: "/assets/generated/preview-canva-ads.dim_800x500.jpg",
    alt: "Canva ad templates dashboard",
  },
  {
    type: "instagram" as const,
    label: "130+ Instagram Branding Mockups",
    src: "/assets/generated/preview-instagram-kit.dim_800x500.jpg",
    alt: "Instagram feed mockups",
  },
  {
    type: "plr" as const,
    label: "7500+ Canva Templates",
    src: "/assets/generated/canva-templates-mockup.dim_1200x800.jpg",
    alt: "Canva planners, journals & trackers templates",
  },
];

function PreviewSection() {
  return (
    <section id="preview" className="py-6" style={{ background: "#FAFAFA" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: GOLD_DARK }}
          >
            Real assets included
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: "#0A0A0A" }}
          >
            Inside the Kit
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PREVIEW_ITEMS.map((item, i) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative overflow-hidden rounded-xl"
              style={{ boxShadow: "0 3px 18px rgba(0,0,0,0.07)" }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full object-cover"
                style={{ height: 220 }}
                loading="lazy"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-2.5"
                style={{
                  background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
                }}
              >
                <span className="text-white font-medium text-sm">
                  {item.label}
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
    icon: React.ReactNode;
    title: string;
    desc: string;
  }[] = [
    {
      icon: <ShopifyIcon />,
      title: "800+ Shopify Premium Themes",
      desc: "Launch any store instantly",
    },
    {
      icon: <CanvaIcon />,
      title: "1000+ Canva Ad Creatives",
      desc: "Run high-converting ads easily",
    },
    {
      icon: <CodeIcon />,
      title: "210+ Conversion Code Snippets",
      desc: "Boost sales automatically",
    },
    {
      icon: <DigitalIcon />,
      title: "7500+ Canva Templates",
      desc: "Ready-to-use planners, journals & trackers",
    },
    {
      icon: <InstaIcon />,
      title: "130+ Instagram Branding Mockups",
      desc: "Build premium brand look",
    },
    {
      icon: <UpdatesIcon />,
      title: "Free Lifetime Updates",
      desc: "Get new assets regularly",
    },
  ];
  return (
    <section id="bundle" className="py-7" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-5">
          <h2
            className="text-2xl md:text-3xl font-bold mb-1.5 tracking-tight"
            style={{ color: "#0A0A0A" }}
          >
            What You Get
          </h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            The ₹50,000+ Value Breakdown
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="p-3 rounded-xl bg-white"
              style={{
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                style={{
                  background: "rgba(201,167,78,0.1)",
                  color: GOLD_DARK,
                  border: "1px solid rgba(201,167,78,0.2)",
                }}
              >
                {item.icon}
              </div>
              <h3
                className="font-semibold text-sm mb-1"
                style={{ color: "#0A0A0A" }}
              >
                {item.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {item.desc}
              </p>
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
      desc: "Every new template, theme or resource we add — yours automatically at no extra cost.",
    },
    {
      icon: <InfinityIcon className="w-6 h-6" />,
      title: "Lifetime Access",
      desc: "Pay once, access forever. No subscription fees, no renewals, no hidden charges.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Commercial Usage Allowed",
      desc: "Use for your clients, multiple stores, and businesses. Full commercial license included.",
    },
  ];
  return (
    <section
      className="py-7"
      style={{
        background: "rgba(201,167,78,0.06)",
        borderTop: `2px solid ${GOLD}`,
        borderBottom: `2px solid ${GOLD}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center mb-4">
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              color: "#000000",
              boxShadow: "0 2px 10px rgba(201,167,78,0.3)",
            }}
          >
            EXCLUSIVE BONUSES
          </span>
        </div>
        <div className="text-center mb-5">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2 tracking-tight"
            style={{ color: "#0A0A0A" }}
          >
            Exclusive Bonuses
          </h2>
          <div
            className="mx-auto mt-1.5 rounded-full"
            style={{
              width: 52,
              height: 3,
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            }}
          />
          <p className="text-sm mt-2" style={{ color: "#6B7280" }}>
            Everything included in your one-time purchase
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {bonuses.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative p-4 rounded-xl text-center flex flex-col items-center gap-2.5 bg-white"
              style={{
                border: "1.5px solid rgba(201,167,78,0.45)",
                boxShadow:
                  "0 3px 18px rgba(201,167,78,0.12), 0 1px 6px rgba(0,0,0,0.04)",
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
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(201,167,78,0.15)",
                  color: GOLD_DARK,
                  border: "1.5px solid rgba(201,167,78,0.45)",
                }}
              >
                {b.icon}
              </div>
              <h3 className="text-base font-bold" style={{ color: "#0A0A0A" }}>
                {b.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
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
    text: "Saved me weeks of work. Launched my Shopify store in 2 days with these templates! The themes are incredibly polished.",
  },
  {
    name: "Priya S.",
    location: "Mumbai",
    initials: "PS",
    text: "Best investment under ₹1000. The Canva templates alone are worth ₹5000! Using them for all my client projects.",
  },
  {
    name: "Arjun K.",
    location: "Bangalore",
    initials: "AK",
    text: "Used the code snippets to customize my store completely. Clients love the results. A genuine business advantage.",
  },
  {
    name: "Sneha R.",
    location: "Pune",
    initials: "SR",
    text: "I was a complete beginner. This kit gave me everything I needed to start and run a profitable store. Highly recommended!",
  },
  {
    name: "Karan V.",
    location: "Hyderabad",
    initials: "KV",
    text: "The Instagram branding kit alone is incredible. My feed looks premium and professional. Sales doubled in 30 days.",
  },
  {
    name: "Nisha T.",
    location: "Chennai",
    initials: "NT",
    text: "I've spent lakhs on courses and nothing came close to this. ₹999 is literally nothing for this value. Shocked.",
  },
  {
    name: "Dev A.",
    location: "Ahmedabad",
    initials: "DA",
    text: "The PLR digital bundle is insane. I created an entire product line in one weekend. Zero investment, full returns.",
  },
  {
    name: "Pooja L.",
    location: "Kolkata",
    initials: "PL",
    text: "Lifetime access is the real deal. New templates keep coming and I never have to pay again. This is a cheat code.",
  },
  {
    name: "Mihir J.",
    location: "Surat",
    initials: "MJ",
    text: "I run a Shopify agency and this kit powers half our client work. Saved hundreds of hours. Insane ROI.",
  },
  {
    name: "Ananya D.",
    location: "Jaipur",
    initials: "AD",
    text: "My first digital store went live in 3 hours using these templates. Made my first sale the same day!",
  },
];

function ReviewCard({ r }: { r: (typeof REVIEWS)[0] & { uid?: string } }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col gap-2.5 p-4 rounded-xl bg-white"
      style={{
        width: 260,
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
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
        className="flex items-center gap-2.5 mt-auto pt-2"
        style={{ borderTop: "1px solid #E5E7EB" }}
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
        <div>
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
      className="py-6 overflow-hidden"
      style={{ background: "#FAFAFA" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
        <div className="text-center">
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: "#0A0A0A" }}
          >
            What Our Customers Say
          </h2>
          <p className="mt-1.5 text-sm" style={{ color: "#6B7280" }}>
            Real results from store owners across India
          </p>
        </div>
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
    <section id="faq" className="py-7" style={{ background: "#FFFFFF" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-5">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2 tracking-tight"
            style={{ color: "#0A0A0A" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Got questions? We have answers.
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`faq-${i}`}
              className="rounded-xl overflow-hidden border-0 bg-white"
              style={{
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              }}
            >
              <AccordionTrigger
                className="px-5 py-4 text-left font-semibold text-sm hover:no-underline"
                style={{ color: "#0A0A0A" }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                className="px-5 pb-4 text-sm leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {faq.a}
              </AccordionContent>
            </AccordionItem>
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
      className="py-8 relative overflow-hidden"
      style={{ background: "#FAFAFA" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-3 max-w-xl mx-auto"
        >
          <h2
            className="text-3xl md:text-4xl font-black leading-tight"
            style={{ color: "#0A0A0A" }}
          >
            Start Building Your 7-Figure Store Today
          </h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Join hundreds of store owners who saved time, money, and launched
            faster.
          </p>
          <div
            className="p-3.5 rounded-xl bg-white"
            style={{
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="text-xs line-through mb-0.5"
              style={{ color: "#9CA3AF" }}
            >
              Was ₹1,299
            </div>
            <div className="text-4xl font-black" style={{ color: "#0A0A0A" }}>
              ₹999
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
              One-time payment · Lifetime access
            </div>
          </div>
          <GoldButton size="large" className="text-base" vibrate>
            Get Instant Access <ChevronRight className="w-4 h-4" />
          </GoldButton>
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
        Claim Kit for ₹999 <ChevronRight className="w-4 h-4" />
      </GoldButton>
    </div>
  );
}

// ------ FOOTER ------
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#0A0A0A", borderTop: "1px solid #1F1F1F" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-base font-black" style={{ color: GOLD }}>
              The 7-Figure Store Kit
            </span>
            <p className="text-xs max-w-xs" style={{ color: "#6B7280" }}>
              The ultimate toolkit for building profitable ecommerce brands.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
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
          className="mt-6 pt-4 text-xs"
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
