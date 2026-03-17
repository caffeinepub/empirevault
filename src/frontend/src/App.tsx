import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Download,
  Infinity as InfinityIcon,
  Instagram,
  LayoutGrid,
  Menu,
  Palette,
  RefreshCw,
  Rocket,
  Shield,
  ShoppingBag,
  Star,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const GOLD = "#C9A74E";
const GOLD_LIGHT = "#E6C873";
const GOLD_DARK = "#A8863A";

function GoldButton({
  children,
  className = "",
  size = "default",
  onClick,
  "data-ocid": dataOcid,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "large";
  onClick?: () => void;
  "data-ocid"?: string;
}) {
  return (
    <button
      type="button"
      data-ocid={dataOcid}
      onClick={onClick}
      className={`btn-gold inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-wide cursor-pointer transition-all duration-200 hover:brightness-110 hover:scale-[1.02] ${
        size === "large" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"
      } ${className}`}
      style={{
        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
        color: "#000000",
        boxShadow:
          "0 0 24px rgba(201,167,78,0.35), 0 4px 16px rgba(201,167,78,0.2)",
      }}
    >
      {children}
    </button>
  );
}

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_KEYS.slice(0, count).map((k) => (
        <Star
          key={k}
          className="w-4 h-4 fill-current"
          style={{ color: GOLD }}
        />
      ))}
    </div>
  );
}

function SectionTitle({
  children,
  subtitle,
}: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h2
        className="text-3xl md:text-4xl font-bold mb-3 tracking-tight"
        style={{ color: "#0A0A0A" }}
      >
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg" style={{ color: "#6B7280" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ------ PREVIEW PANELS ------
type PreviewType =
  | "shopify"
  | "canva"
  | "code"
  | "plr"
  | "instagram"
  | "updates";

function PreviewPanel({ type }: { type: PreviewType }) {
  const imageMap: Record<PreviewType, string> = {
    shopify: "/assets/generated/preview-shopify-themes.dim_800x500.jpg",
    canva: "/assets/generated/preview-canva-ads.dim_800x500.jpg",
    code: "/assets/generated/preview-code-snippets.dim_800x500.jpg",
    plr: "/assets/generated/preview-digital-bundle.dim_800x500.jpg",
    instagram: "/assets/generated/preview-instagram-kit.dim_800x500.jpg",
    updates: "/assets/generated/preview-updates-bundle.dim_800x500.jpg",
  };
  return (
    <div
      className="mb-3 rounded-lg overflow-hidden"
      style={{
        boxShadow: "0 0 16px rgba(201,167,78,0.2), 0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={imageMap[type]}
        alt={type}
        className="w-full rounded-lg object-cover"
        style={{ height: "160px" }}
      />
    </div>
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
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <span
          className="text-xl font-black tracking-wide"
          style={{ color: "#0A0A0A" }}
        >
          The 7-Figure Store Kit
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {["Features", "Bundle", "Testimonials", "FAQ"].map((item) => (
            <button
              type="button"
              key={item}
              data-ocid={`nav.${item.toLowerCase()}.link`}
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
          <GoldButton
            data-ocid="nav.cta.button"
            onClick={() => scrollTo("bundle")}
          >
            Get Instant Access
          </GoldButton>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ color: "#0A0A0A" }}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-4 pb-4"
            style={{ background: "rgba(255,255,255,0.98)" }}
          >
            {["Features", "Bundle", "Testimonials", "FAQ"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left py-3 text-sm font-medium border-b"
                style={{
                  color: "#6B7280",
                  borderColor: "#E5E7EB",
                }}
              >
                {item}
              </button>
            ))}
            <div className="mt-4">
              <GoldButton className="w-full" onClick={() => scrollTo("bundle")}>
                Get Instant Access
              </GoldButton>
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
  className = "",
  style = {},
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${className}`}
      style={{
        background: "#FFFFFF",
        border: `1.5px solid ${GOLD}`,
        color: "#0A0A0A",
        boxShadow:
          "0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(201,167,78,0.2)",
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
      className="relative overflow-hidden py-12 md:py-20"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* LEFT: Hero Image (60%) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative w-full md:w-[60%] flex-shrink-0"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  "0 8px 48px rgba(0,0,0,0.12), 0 2px 16px rgba(201,167,78,0.1)",
              }}
            >
              <img
                src="/assets/generated/hero-premium-bundle-mockup.dim_1400x900.jpg"
                alt="The 7-Figure Store Kit — Full Digital Bundle"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Labels */}
            <FloatingLabel
              text="800+ Shopify Themes"
              style={{ top: "12%", left: "-4%" }}
            />
            <FloatingLabel
              text="1000+ Ad Templates"
              style={{ top: "28%", right: "-3%" }}
            />
            <FloatingLabel
              text="7500+ Digital Products"
              style={{ bottom: "30%", left: "-4%" }}
            />
            <FloatingLabel
              text="210+ Code Snippets"
              style={{ bottom: "14%", right: "-2%" }}
            />
            <FloatingLabel
              text="130+ Instagram Mockups"
              style={{ bottom: "-3%", left: "30%" }}
            />
          </motion.div>

          {/* RIGHT: Text + CTA (40%) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full md:w-[40%] flex flex-col gap-5"
          >
            {/* Badge */}
            <div className="inline-flex">
              <span
                className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase inline-flex items-center gap-2"
                style={{
                  background: "rgba(201,167,78,0.1)",
                  border: "1px solid rgba(201,167,78,0.4)",
                  color: GOLD_DARK,
                }}
              >
                <Zap className="w-3 h-3" /> Limited Time Offer
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
              style={{ color: "#0A0A0A" }}
            >
              Build, Scale &amp; Automate Your Brand
            </h1>

            <p className="text-base md:text-lg" style={{ color: "#6B7280" }}>
              All-in-one toolkit to launch and grow your store
            </p>

            {/* Price */}
            <div className="flex items-end gap-3">
              <div>
                <span
                  className="block text-sm line-through mb-0.5"
                  style={{ color: "#9CA3AF" }}
                >
                  ₹50,000+ value
                </span>
                <span
                  className="text-5xl font-black"
                  style={{ color: "#0A0A0A" }}
                >
                  ₹999
                </span>
              </div>
              <span
                className="mb-2 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                  color: "#000",
                }}
              >
                One-time
              </span>
            </div>

            {/* CTA */}
            <GoldButton
              size="large"
              data-ocid="hero.primary_button"
              className="text-lg w-full sm:w-auto"
            >
              Get Instant Access <ChevronRight className="w-5 h-5" />
            </GoldButton>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {[
                {
                  icon: <Download className="w-4 h-4" />,
                  label: "Instant Download",
                },
                {
                  icon: <InfinityIcon className="w-4 h-4" />,
                  label: "Lifetime Access",
                },
                {
                  icon: <Shield className="w-4 h-4" />,
                  label: "Commercial Rights",
                },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm font-medium"
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

// ------ WHAT YOU GET ------
function WhatYouGet() {
  const items: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    preview: PreviewType;
  }[] = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Shopify Power Pack",
      desc: "800+ Premium Themes — High-converting designs for every product niche",
      preview: "shopify",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Canva Ad Domination Kit",
      desc: "1000+ winning creatives for Facebook, Instagram & Google Ads",
      preview: "canva",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Code Snippets Vault",
      desc: "210+ custom Shopify sections — timers, tabs, trust badges & more",
      preview: "code",
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "Digital Business Bundle",
      desc: "7500+ DFY Templates — Planners, Journals, Trackers & ready-to-sell digital products",
      preview: "plr",
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: "Instagram Branding Kit",
      desc: "130+ Premium mockups for feed, grid layout, Reels covers & profile pages",
      preview: "instagram",
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Future Updates Bundle",
      desc: "Always-growing library — new templates added regularly, free forever",
      preview: "updates",
    },
  ];

  return (
    <section
      id="bundle"
      className="py-24 relative"
      style={{ background: "#FAFAFA" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle subtitle="The ₹50,000+ Value Breakdown">
          What You Get
        </SectionTitle>

        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              data-ocid={`bundle.item.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -4,
                boxShadow:
                  "0 8px 32px rgba(201,167,78,0.18), 0 2px 8px rgba(0,0,0,0.06)",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.07,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="p-7 rounded-2xl flex flex-col gap-3 cursor-pointer bg-white"
              style={{
                border: "1px solid #E5E7EB",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <PreviewPanel type={item.preview} />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(201,167,78,0.1)",
                  color: GOLD_DARK,
                  border: "1px solid rgba(201,167,78,0.25)",
                }}
              >
                {item.icon}
              </div>
              <h3
                className="font-semibold text-base"
                style={{ color: "#0A0A0A" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
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

// ------ WHY DIFFERENT ------
function WhyDifferent() {
  const points = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "No Coding Needed",
      desc: "Drag-and-drop everything. Zero technical skills required.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Beginner-Friendly",
      desc: "Clear structure so anyone can start from day one.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Saves Months of Work",
      desc: "Skip the design grind — launch in days, not months.",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Used by Real Brands",
      desc: "Trusted by 500+ store owners across India and beyond.",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Instant Download Access",
      desc: "Files available immediately after payment confirmation.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 relative"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle subtitle="Why top store owners choose The 7-Figure Store Kit over everything else">
          Why This Is Different
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -4,
                boxShadow: "0 8px 32px rgba(201,167,78,0.18)",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="p-7 rounded-2xl text-center flex flex-col items-center gap-3 cursor-pointer bg-white"
              style={{
                border: "1px solid #E5E7EB",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(201,167,78,0.1)",
                  color: GOLD_DARK,
                  border: "1px solid rgba(201,167,78,0.3)",
                }}
              >
                {p.icon}
              </div>
              <h3 className="font-bold text-sm" style={{ color: "#0A0A0A" }}>
                {p.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ VALUE STACK ------
function ValueStack() {
  const rows = [
    { label: "Shopify Themes (800+)", value: "₹20,000+" },
    { label: "Canva Ad Templates (1000+)", value: "₹10,000+" },
    { label: "Digital Business Bundle (7500+)", value: "₹15,000+" },
    { label: "Code Snippets Vault (210+)", value: "₹5,000+" },
  ];

  return (
    <section className="py-24 relative" style={{ background: "#FAFAFA" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionTitle>Total Value Breakdown</SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden bg-white"
          style={{
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div className="divide-y" style={{ borderColor: "#E5E7EB" }}>
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-8 py-5"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: GOLD }}
                  />
                  <span className="font-medium" style={{ color: "#0A0A0A" }}>
                    {row.label}
                  </span>
                </div>
                <span className="font-bold" style={{ color: GOLD_DARK }}>
                  {row.value}
                </span>
              </div>
            ))}
            {/* Total */}
            <div
              className="flex items-center justify-between px-8 py-5"
              style={{ background: "#FAFAFA" }}
            >
              <span className="text-xl font-bold" style={{ color: "#0A0A0A" }}>
                Total Value
              </span>
              <span
                className="text-2xl font-black line-through"
                style={{ color: "#9CA3AF" }}
              >
                ₹50,000+
              </span>
            </div>
            {/* Today's price */}
            <div
              className="flex items-center justify-between px-8 py-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,167,78,0.08), rgba(230,200,115,0.05))",
                borderTop: `2px solid ${GOLD}`,
              }}
            >
              <div>
                <div
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: GOLD_DARK }}
                >
                  TODAY ONLY
                </div>
                <div
                  className="text-lg font-medium"
                  style={{ color: "#0A0A0A" }}
                >
                  Limited Time Offer
                </div>
              </div>
              <span
                className="text-5xl font-black"
                style={{ color: "#0A0A0A" }}
              >
                ₹999
              </span>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <GoldButton size="large" data-ocid="valuestack.primary_button">
            Claim This Deal Now <ChevronRight className="w-5 h-5" />
          </GoldButton>
          <p className="mt-3 text-sm" style={{ color: "#9CA3AF" }}>
            Price increases after timer expires
          </p>
        </div>
      </div>
    </section>
  );
}

// ------ BONUSES ------
function Bonuses() {
  const bonuses = [
    {
      icon: <RefreshCw className="w-7 h-7" />,
      title: "FREE Future Updates",
      desc: "Every new template, theme or resource we add — yours automatically at no extra cost.",
    },
    {
      icon: <InfinityIcon className="w-7 h-7" />,
      title: "Lifetime Access",
      desc: "Pay once, access forever. No subscription fees, no renewals, no hidden charges.",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Commercial Usage Allowed",
      desc: "Use for your clients, multiple stores, and businesses. Full commercial license included.",
    },
  ];

  return (
    <section
      className="py-20"
      style={{
        background: "rgba(201,167,78,0.06)",
        borderTop: `2px solid ${GOLD}`,
        borderBottom: `2px solid ${GOLD}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Exclusive Bonuses badge */}
        <div className="flex justify-center mb-5">
          <span
            className="px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              color: "#000000",
              boxShadow: "0 2px 12px rgba(201,167,78,0.35)",
            }}
          >
            EXCLUSIVE BONUSES
          </span>
        </div>

        {/* Title with gold underline */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3 tracking-tight"
            style={{ color: "#0A0A0A" }}
          >
            Exclusive Bonuses
          </h2>
          <div
            className="mx-auto mt-2 rounded-full"
            style={{
              width: "64px",
              height: "4px",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            }}
          />
          <p className="text-lg mt-3" style={{ color: "#6B7280" }}>
            Everything included in your one-time purchase
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {bonuses.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -4,
                boxShadow: "0 8px 32px rgba(201,167,78,0.28)",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="relative p-8 rounded-2xl text-center flex flex-col items-center gap-4 cursor-pointer bg-white"
              style={{
                border: "1.5px solid rgba(201,167,78,0.5)",
                boxShadow:
                  "0 4px 24px rgba(201,167,78,0.15), 0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              {/* FREE badge */}
              <span
                className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                  color: "#000000",
                }}
              >
                FREE
              </span>

              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(201,167,78,0.15)",
                  color: GOLD_DARK,
                  border: "1.5px solid rgba(201,167,78,0.5)",
                }}
              >
                {b.icon}
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#0A0A0A" }}>
                {b.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
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

// ------ TESTIMONIALS ------
function Testimonials() {
  const testimonials = [
    {
      name: "Rahul M.",
      location: "Delhi",
      text: "Saved me weeks of work. Launched my Shopify store in 2 days with these templates! The themes are incredibly polished — my customers keep complimenting the design.",
      initials: "RM",
    },
    {
      name: "Priya S.",
      location: "Mumbai",
      text: "Best investment under ₹1000. The Canva templates alone are worth ₹5000! I've been using them for all my client projects and the results are outstanding.",
      initials: "PS",
    },
    {
      name: "Arjun K.",
      location: "Bangalore",
      text: "Used the code snippets to customize my store completely. Clients love the results. The 7-Figure Store Kit is a genuine business advantage for anyone serious about ecommerce.",
      initials: "AK",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 relative"
      style={{ background: "#FAFAFA" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle subtitle="Real results from store owners across India">
          What Our Customers Say
        </SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              data-ocid={`testimonials.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -4,
                boxShadow: "0 8px 32px rgba(201,167,78,0.18)",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="p-7 rounded-2xl flex flex-col gap-4 cursor-pointer bg-white"
              style={{
                border: "1px solid #E5E7EB",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <StarRating />
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: "#374151" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div
                className="flex items-center gap-3 mt-auto pt-2"
                style={{ borderTop: "1px solid #E5E7EB" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                    color: "#000000",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "#0A0A0A" }}
                  >
                    {t.name}
                  </div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>
                    {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
      a: "Absolutely! The vast majority of resources (Shopify themes, Canva templates, Instagram kits) require zero coding knowledge. Just download, customize, and launch.",
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
    <section id="faq" className="py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionTitle subtitle="Got questions? We have answers.">
          Frequently Asked Questions
        </SectionTitle>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`faq-${i}`}
              data-ocid={`faq.item.${i + 1}`}
              className="rounded-xl overflow-hidden border-0 bg-white"
              style={{
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <AccordionTrigger
                className="px-6 py-5 text-left font-semibold hover:no-underline"
                style={{ color: "#0A0A0A" }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                className="px-6 pb-5 text-sm leading-relaxed"
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
      className="py-24 relative overflow-hidden"
      style={{ background: "#FAFAFA" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 text-center"
          >
            <h2
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{ color: "#0A0A0A" }}
            >
              Start Building Your 7-Figure Store Today
            </h2>
            <p className="text-lg" style={{ color: "#6B7280" }}>
              Join hundreds of store owners who saved time, money, and launched
              faster with The 7-Figure Store Kit.
            </p>
            <div
              className="p-5 rounded-2xl inline-block bg-white"
              style={{
                border: "1px solid #E5E7EB",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="text-sm line-through mb-1"
                style={{ color: "#9CA3AF" }}
              >
                Was ₹1,299
              </div>
              <div className="text-5xl font-black" style={{ color: "#0A0A0A" }}>
                ₹999
              </div>
              <div className="text-sm mt-1" style={{ color: "#6B7280" }}>
                One-time payment · Lifetime access
              </div>
            </div>
            <GoldButton
              size="large"
              data-ocid="finalcta.primary_button"
              className="text-xl"
            >
              Download Now <ChevronRight className="w-5 h-5" />
            </GoldButton>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                {
                  icon: <Download className="w-4 h-4" />,
                  label: "Instant Download",
                },
                {
                  icon: <InfinityIcon className="w-4 h-4" />,
                  label: "Lifetime Access",
                },
                {
                  icon: <Shield className="w-4 h-4" />,
                  label: "Commercial License",
                },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm"
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

// ------ FOOTER ------
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid #1F1F1F",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-black" style={{ color: GOLD }}>
              The 7-Figure Store Kit
            </span>
            <p className="text-sm max-w-xs" style={{ color: "#6B7280" }}>
              The ultimate toolkit for building profitable ecommerce brands.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Use"].map((link) => (
                <button
                  type="button"
                  key={link}
                  className="text-sm transition-colors duration-200"
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
              className="text-sm transition-colors duration-200"
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
          className="mt-8 pt-6 text-xs"
          style={{
            borderTop: "1px solid #1F1F1F",
            color: "#4B5563",
          }}
        >
          <p>© {year} The 7-Figure Store Kit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ------ MAIN APP ------
export default function App() {
  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF" }}>
      <Navbar />
      <main>
        <Hero />
        <WhatYouGet />
        <WhyDifferent />
        <ValueStack />
        <Bonuses />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
