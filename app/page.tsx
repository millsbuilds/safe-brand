"use client";

import { useState, useEffect } from "react";

const C = {
  navy: "#1B2E4A",
  peach: "#E89B7C",
  blush: "#FAEBDE",
  sky: "#7AA8C9",
  white: "#FFFFFF",
  cream: "#FDFAF7",
  navyMuted: "rgba(27,46,74,0.7)",
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
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.04em",
    textDecoration: "none",
    fontFamily: "Inter, sans-serif",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color 0.15s",
    padding: 0,
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: C.navy,
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        transition: "border-color 0.2s",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "\"Playfair Display\", Georgia, serif",
            fontSize: 26,
            fontWeight: 700,
            color: C.white,
            letterSpacing: "-0.01em",
            cursor: "pointer",
            userSelect: "none",
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
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
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
            <button key={id} onClick={() => scrollTo(id)} style={{ ...linkStyle, fontSize: 16, color: C.white, textAlign: "left" }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      style={{
        background: C.blush,
        paddingTop: 140,
        paddingBottom: 112,
        paddingLeft: 32,
        paddingRight: 32,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
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
            fontFamily: "\"Playfair Display\", Georgia, serif",
            fontSize: "clamp(34px, 6vw, 64px)",
            fontWeight: 700,
            color: C.navy,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            marginBottom: 28,
          }}
        >
          The only seasoning engineered for your Na:K protocol.
        </h1>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(16px, 2vw, 19px)",
            fontWeight: 400,
            color: C.navyMuted,
            lineHeight: 1.7,
            maxWidth: 640,
            margin: "0 auto 44px",
          }}
        >
          Precision nutrition from Health Science Nutritionals, PBC — formulated by a physician practicing Psychoneuroendocrinology, board certified in Internal Medicine, Endocrinology, and Psychiatry.
        </p>

        <button
          onClick={() => scrollTo("assessment")}
          style={{
            background: C.navy,
            color: C.white,
            border: "none",
            borderRadius: 4,
            padding: "16px 36px",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.02em",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Take The Precision Mineral Assessment →
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
}: {
  name: string;
  description: string;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white,
        border: `1px solid #E8E4DE`,
        borderTop: `3px solid ${C.peach}`,
        borderRadius: 4,
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "box-shadow 0.2s",
        boxShadow: hovered ? "0 8px 32px rgba(27,46,74,0.1)" : "0 2px 8px rgba(27,46,74,0.04)",
      }}
    >
      <h3
        style={{
          fontFamily: "\"Playfair Display\", Georgia, serif",
          fontSize: 24,
          fontWeight: 600,
          color: C.navy,
          letterSpacing: "-0.01em",
        }}
      >
        {name}
      </h3>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 15,
          color: C.navyMuted,
          lineHeight: 1.65,
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
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: C.navy,
          textDecoration: "none",
          letterSpacing: "0.02em",
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
    <section
      id="products"
      style={{ background: C.white, padding: "96px 32px" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.peach,
              marginBottom: 16,
            }}
          >
            Our Products
          </p>
          <h2
            style={{
              fontFamily: "\"Playfair Display\", Georgia, serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: C.navy,
              letterSpacing: "-0.01em",
            }}
          >
            Precision nutrition. Every protocol.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 28,
          }}
        >
          <ProductCard
            name="SafeSalt™"
            description="Precision electrolyte seasoning engineered around your Na:K ratio. Not table salt. Not a supplement. A new category."
            href="safesalt.health"
          />
          <ProductCard
            name="SafeSupplements™"
            description="Targeted mineral protocols formulated by a physician. Each product built around a clinical insight, not a marketing brief."
            href="safesupplements.health"
          />
          <ProductCard
            name="SafeHydrate™"
            description="Performance hydration built on the science of sodium and potassium balance. For athletes and the rigorously health-conscious."
            href="safehydrate.health"
          />
        </div>
      </div>
    </section>
  );
}

// ─── FOUNDER BLOCK ────────────────────────────────────────────────────────────

function Science() {
  return (
    <section
      id="science"
      style={{
        background: C.navy,
        padding: "96px 32px",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.sky,
            marginBottom: 20,
          }}
        >
          The Science Behind the Products
        </p>

        <h2
          style={{
            fontFamily: "\"Playfair Display\", Georgia, serif",
            fontSize: "clamp(28px, 4vw, 46px)",
            fontWeight: 700,
            color: C.white,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            marginBottom: 40,
          }}
        >
          Dr. Robert S. 'Isaac' Gardner, MD
        </h2>

        <div
          style={{
            width: 48,
            height: 2,
            background: C.peach,
            margin: "0 auto 40px",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 24,
            marginBottom: 48,
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
                borderRadius: 4,
                padding: "24px 20px",
              }}
            >
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>

        <blockquote
          style={{
            fontFamily: "\"Playfair Display\", Georgia, serif",
            fontSize: "clamp(18px, 2.5vw, 24px)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.65,
            maxWidth: 720,
            margin: "0 auto",
            borderLeft: `3px solid ${C.peach}`,
            paddingLeft: 28,
            textAlign: "left",
          }}
        >
          Dr. Gardner&apos;s work in Severo Ochoa&apos;s laboratory established the missing link — nearly 40% of the genetic code. That same foundational rigor defines every product in the SafeBrand™ line.
        </blockquote>
      </div>
    </section>
  );
}

// ─── ASSESSMENT CTA ───────────────────────────────────────────────────────────

function AssessmentCTA() {
  return (
    <section
      id="assessment"
      style={{
        background: C.blush,
        padding: "96px 32px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.peach,
            marginBottom: 20,
          }}
        >
          Precision Mineral Assessment
        </p>
        <h2
          style={{
            fontFamily: "\"Playfair Display\", Georgia, serif",
            fontSize: "clamp(28px, 4.5vw, 50px)",
            fontWeight: 700,
            color: C.navy,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          Know your minerals. Know your protocol.
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(15px, 2vw, 18px)",
            color: C.navyMuted,
            lineHeight: 1.7,
            marginBottom: 44,
            maxWidth: 580,
            margin: "0 auto 44px",
          }}
        >
          The Precision Mineral Assessment tells you exactly where your Na:K ratio stands — and what to do about it.
        </p>
        <button
          style={{
            background: C.navy,
            color: C.white,
            border: "none",
            borderRadius: 4,
            padding: "16px 36px",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.02em",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Start The Assessment →
        </button>
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
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "56px 32px 40px",
        fontFamily: "Inter, sans-serif",
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
          {/* Logo */}
          <div
            style={{
              fontFamily: "\"Playfair Display\", Georgia, serif",
              fontSize: 24,
              fontWeight: 700,
              color: C.white,
            }}
          >
            SafeBrand<span style={{ color: C.peach }}>™</span>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 16 : 32,
              flexWrap: "wrap",
            }}
          >
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 13,
                  textDecoration: "none",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.peach)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              maxWidth: 720,
            }}
          >
            © 2026 Health Science Nutritionals, PBC. SafeSalt™, SafeSupplements™, and SafeHydrate™ are trademarks of Health Science Nutritionals, PBC.
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
        <AssessmentCTA />
      </main>
      <Footer />
    </>
  );
}
