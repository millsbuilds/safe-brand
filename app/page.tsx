"use client";

import { useState, useEffect } from "react";

const C = {
  navy: "#1B2E4A",
  peach: "#E89B7C",
  blush: "#FAEBDE",
  sky: "#7AA8C9",
  white: "#FFFFFF",
  navyMuted: "rgba(27,46,74,0.65)",
  navyLight: "rgba(27,46,74,0.4)",
  border: "#E8E4DE",
};

const F = {
  base: '"Inter", system-ui, sans-serif',
};

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    const checkScroll = () => setScrolled(window.scrollY > 10);
    checkSize();
    window.addEventListener("resize", checkSize);
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("resize", checkSize);
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const linkStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    fontFamily: F.base,
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color 0.15s",
    padding: 0,
    textDecoration: "none",
  };

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, fontFamily: F.base }}>
      {/* Main nav bar */}
      <nav
        style={{
          background: C.navy,
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          transition: "border-color 0.2s",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: C.white,
              letterSpacing: "-0.02em",
              cursor: "pointer",
              userSelect: "none",
              fontFamily: F.base,
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            SafeBrand<span style={{ color: C.peach }}>™</span>
          </div>

          {isMobile ? (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
              aria-label="Menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 22,
                    height: 2,
                    background: C.white,
                    transition: "all 0.2s",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                    transform: menuOpen && i === 0 ? "translateY(7px) rotate(45deg)" : menuOpen && i === 2 ? "translateY(-7px) rotate(-45deg)" : "none",
                  }}
                />
              ))}
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
              {[
                { label: "The Assessment", id: "assessment" },
                { label: "Our Products", id: "products" },
                { label: "The Science", id: "science" },
                { label: "About HSN", id: "about" },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.peach)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile drawer */}
        {isMobile && menuOpen && (
          <div
            style={{
              background: C.navy,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              padding: "20px 32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {[
              { label: "The Assessment", id: "assessment" },
              { label: "Our Products", id: "products" },
              { label: "The Science", id: "science" },
              { label: "About HSN", id: "about" },
            ].map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ ...linkStyle, fontSize: 15, color: C.white, textAlign: "left", textTransform: "none", letterSpacing: "0.02em" }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Sub-banner */}
      <div
        style={{
          background: C.navy,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center",
          padding: "6px 16px",
        }}
      >
        <p style={{ margin: 0, fontSize: 11, fontWeight: 400, color: C.peach, letterSpacing: "0.06em", fontFamily: F.base }}>
          A consumer brand of Health Science Nutritionals, PBC
        </p>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      style={{
        background: C.white,
        paddingTop: 148,
        paddingBottom: 112,
        paddingLeft: 32,
        paddingRight: 32,
        textAlign: "center",
        fontFamily: F.base,
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.peach,
            marginBottom: 28,
          }}
        >
          Health Science Nutritionals, PBC
        </p>

        <h1
          style={{
            fontSize: "clamp(32px, 5.5vw, 60px)",
            fontWeight: 700,
            color: C.navy,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            marginBottom: 28,
          }}
        >
          Science-first nutrition. Built for people who demand proof.
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 19px)",
            fontWeight: 300,
            color: C.navyMuted,
            lineHeight: 1.72,
            maxWidth: 660,
            margin: "0 auto 44px",
          }}
        >
          Health Science Nutritionals, PBC develops physician-formulated products for patients, practitioners, and health systems who won&apos;t accept less than clinical-grade.
        </p>

        <button
          onClick={() => scrollTo("science")}
          style={{
            background: C.navy,
            color: C.white,
            border: "none",
            borderRadius: 3,
            padding: "15px 34px",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.03em",
            fontFamily: F.base,
            cursor: "pointer",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Explore the Science →
        </button>
      </div>
    </section>
  );
}

// ─── PRODUCT CARDS ────────────────────────────────────────────────────────────

function ProductCard({
  name,
  description,
  href,
  imagePath,
}: {
  name: string;
  description: string;
  href: string;
  imagePath: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderTop: `3px solid ${C.peach}`,
        borderRadius: 3,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition: "box-shadow 0.2s",
        boxShadow: hovered ? "0 8px 32px rgba(27,46,74,0.09)" : "0 1px 4px rgba(27,46,74,0.04)",
        fontFamily: F.base,
      }}
    >
      <div
        style={{
          height: 160,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
          background: "#1B2E4A",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagePath}
          alt={name}
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: C.navy,
          letterSpacing: "-0.02em",
          margin: 0,
        }}
      >
        {name}
      </h3>
      <p
        style={{
          fontSize: 15,
          fontWeight: 300,
          color: C.navyMuted,
          lineHeight: 1.68,
          margin: 0,
          flex: 1,
        }}
      >
        {description}
      </p>
      <a
        href={`https://${href}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: C.navy,
          textDecoration: "none",
          letterSpacing: "0.03em",
          marginTop: 4,
        }}
      >
        Learn More →
      </a>
    </div>
  );
}

function Products() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="products" style={{ background: C.white, padding: "96px 32px", fontFamily: F.base }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: C.peach, marginBottom: 16 }}>
            Our Products
          </p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, color: C.navy, letterSpacing: "-0.025em" }}>
            Precision nutrition. Every protocol.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 28 }}>
          <ProductCard
            name="SafeSalt™"
            description="Precision electrolyte seasoning engineered around your Na:K ratio. Not table salt. Not a supplement. A new category."
            href="safesalt.health"
            imagePath="/images/hand-salt.png"
          />
          <ProductCard
            name="SafeSupplements™"
            description="Targeted mineral protocols formulated by a physician. Each product built around a clinical insight, not a marketing brief."
            href="safesupplements.health"
            imagePath="/images/hand-supplement.png"
          />
          <ProductCard
            name="SafeHydrate™"
            description="Performance hydration built on the science of sodium and potassium balance. For athletes and the rigorously health-conscious."
            href="safehydrate.health"
            imagePath="/images/hand-hydrate.png"
          />
        </div>
      </div>
    </section>
  );
}

// ─── SCIENCE / FOUNDER BLOCK ──────────────────────────────────────────────────

function Science() {
  return (
    <section id="science" style={{ background: C.navy, padding: "96px 32px", fontFamily: F.base }}>
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: C.sky, marginBottom: 20 }}>
          The Science Behind the Products
        </p>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 46px)",
            fontWeight: 700,
            color: C.white,
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            marginBottom: 40,
          }}
        >
          Dr. Robert S. &lsquo;Isaac&rsquo; Gardner, MD
        </h2>

        <div style={{ width: 48, height: 2, background: C.peach, margin: "0 auto 40px" }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginBottom: 52,
          }}
        >
          {[
            "Board Certified in Internal Medicine, Endocrinology, and Psychiatry",
            "Trained at NYU School of Medicine, Stanford, NIH & Washington University",
            "Worked in the labs of two Nobel Laureates",
          ].map((item) => (
            <div
              key={item}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                padding: "24px 20px",
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: 0 }}>
                {item}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            borderLeft: `3px solid ${C.peach}`,
            paddingLeft: 28,
            textAlign: "left",
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontSize: "clamp(17px, 2.5vw, 22px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.68,
              margin: 0,
            }}
          >
            In Severo Ochoa&apos;s laboratory, Dr. Gardner spent one summer discovering nearly 40% of the genetic code. That same precision defines every SafeBrand™ formulation.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── ASSESSMENT ANNOUNCEMENT ──────────────────────────────────────────────────

function AssessmentAnnouncement() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section style={{ background: "#1B2E4A", padding: "96px 32px", fontFamily: '"Inter", system-ui, sans-serif', textAlign: "center" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* App icon lockup */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
          <div style={{
            width: 120,
            height: 120,
            borderRadius: 24,
            background: "#1B2E4A",
            border: "2px solid #E89B7C",
            overflow: "hidden",
            marginBottom: 12,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hand-vial.png"
              alt="NaK app icon"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 22 }}
            />
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", fontFamily: '"Inter", system-ui, sans-serif', letterSpacing: "-0.02em", margin: "0 0 6px" }}>
            NaK
          </p>
          <p style={{ fontSize: 11, fontWeight: 500, color: "#E89B7C", fontFamily: '"Inter", system-ui, sans-serif', letterSpacing: "0.06em", margin: 0 }}>
            Precision Mineral Assessment
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200, marginBottom: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hand-testtube.png"
            alt="NaK Precision Mineral Assessment"
            style={{ height: "100%", objectFit: "contain" }}
          />
        </div>

        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7AA8C9", marginBottom: 16 }}>
          Coming Soon
        </p>

        <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: 20 }}>
          The NaK Precision Mineral Assessment
        </h2>

        <p style={{ fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1.72, marginBottom: 44, maxWidth: 600, margin: "0 auto 44px" }}>
          The first diagnostic platform to measure your Na:K ratio against your actual biology — integrating with Apple Health, activity data, and physician-validated benchmarks to deliver a personalized mineral protocol. Not a quiz. A clinical-grade assessment in your pocket.
        </p>

        {submitted ? (
          <p style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", gap: 0, maxWidth: 480, margin: "0 auto 12px", borderRadius: 3, overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: "13px 18px",
                  fontSize: 15,
                  border: "none",
                  outline: "none",
                  background: "rgba(255,255,255,0.07)",
                  color: "#FFFFFF",
                  fontFamily: '"Inter", system-ui, sans-serif',
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#E89B7C",
                  color: "#1B2E4A",
                  border: "none",
                  padding: "13px 22px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: '"Inter", system-ui, sans-serif',
                  whiteSpace: "nowrap",
                  borderRadius: "0 3px 3px 0",
                }}
              >
                Join Early Access →
              </button>
            </form>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>
              No marketing emails. One confirmation. We&apos;ll reach out when it&apos;s ready.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

// ─── PARTNERS SECTION ─────────────────────────────────────────────────────────

function PartnerCard({ title, body }: { title: string; body: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderTop: `3px solid ${C.peach}`,
        borderRadius: 3,
        padding: "32px 28px",
        transition: "box-shadow 0.2s",
        boxShadow: hovered ? "0 8px 28px rgba(27,46,74,0.09)" : "0 1px 4px rgba(27,46,74,0.04)",
        fontFamily: F.base,
      }}
    >
      <h3 style={{ fontSize: 18, fontWeight: 700, color: C.navy, letterSpacing: "-0.02em", marginBottom: 12 }}>
        {title}
      </h3>
      <p style={{ fontSize: 15, fontWeight: 300, color: C.navyMuted, lineHeight: 1.68, margin: 0 }}>
        {body}
      </p>
    </div>
  );
}

function Partners() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="assessment" style={{ background: C.blush, padding: "96px 32px", fontFamily: F.base }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: C.peach, marginBottom: 16 }}>
            Practitioners &amp; Partners
          </p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, color: C.navy, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 20 }}>
            Built for practitioners and partners.
          </h2>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 300, color: C.navyMuted, lineHeight: 1.72, maxWidth: 600, margin: "0 auto" }}>
            We work with physicians, dietitians, health systems, and institutional partners who share our commitment to evidence-based nutrition.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 28 }}>
          <PartnerCard
            title="Physicians &amp; Dietitians"
            body="Clinical formulations you can recommend with confidence."
          />
          <PartnerCard
            title="Health Systems"
            body="Institutional partnerships for patient nutrition programs."
          />
          <PartnerCard
            title="Investors"
            body="A science-first PBC with a physician founder and a defensible product ecosystem."
          />
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const links = [
    { label: "safesalt.health", href: "https://safesalt.health" },
    { label: "safesupplements.health", href: "https://safesupplements.health" },
    { label: "safehydrate.health", href: "https://safehydrate.health" },
    { label: "healthsciencenutritionals.health", href: "https://healthsciencenutritionals.health" },
  ];

  return (
    <footer
      id="about"
      style={{
        background: C.navy,
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "56px 32px 40px",
        fontFamily: F.base,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: 32,
            marginBottom: 40,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, color: C.white, letterSpacing: "-0.02em" }}>
            SafeBrand<span style={{ color: C.peach }}>™</span>
          </div>

          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 14 : 28, flexWrap: "wrap" }}>
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 400, textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.peach)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.38)", lineHeight: 1.75, maxWidth: 800 }}>
            SafeBrand™ is a consumer brand of Health Science Nutritionals, PBC. SafeSalt™, SafeSupplements™, and SafeHydrate™ are trademarks of Health Science Nutritionals, PBC. © 2026 Health Science Nutritionals, PBC.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Products />
        <Science />
        <AssessmentAnnouncement />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
