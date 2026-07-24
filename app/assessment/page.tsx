"use client";

import { useState } from "react";

const C = {
  navy: "#1B2E4A",
  peach: "#E89B7C",
  blush: "#FAEBDE",
  sky: "#7AA8C9",
  white: "#FFFFFF",
};

const F = '"Inter", system-ui, sans-serif';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface StepConfig {
  title: string;
  questions: { prompt: string; options: string[] }[];
}

const STEPS: StepConfig[] = [
  {
    title: "Diet",
    questions: [
      {
        prompt: "How would you describe your current diet?",
        options: ["Keto / low-carb", "Paleo / whole food", "Mediterranean", "Standard / mixed", "Plant-based"],
      },
    ],
  },
  {
    title: "Sodium",
    questions: [
      {
        prompt: "How much salt do you add to food daily?",
        options: ["None / very little", "Moderate (1\u20132 pinches per meal)", "Heavy salter"],
      },
      {
        prompt: "Do you use electrolyte supplements like LMNT?",
        options: ["Daily", "A few times a week", "Rarely / never"],
      },
      {
        prompt: "Do you use a lite salt substitute?",
        options: ["Yes \u2014 KCl-based", "Yes \u2014 other", "No"],
      },
    ],
  },
  {
    title: "Potassium",
    questions: [
      {
        prompt: "How often do you eat high-potassium foods?",
        options: ["Daily, multiple servings", "A few times a week", "Rarely"],
      },
      {
        prompt: "Do you take a potassium supplement?",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    title: "Activity",
    questions: [
      {
        prompt: "Weekly exercise volume?",
        options: ["High (6\u20137 days, zone 2 + strength)", "Moderate (3\u20135 days)", "Light (1\u20132 days)"],
      },
      {
        prompt: "Primary health goal?",
        options: ["Longevity / healthspan", "Athletic performance", "Cardiovascular health", "Cognitive performance", "Metabolic health"],
      },
    ],
  },
];

// ─── SCORING ──────────────────────────────────────────────────────────────────

function calculateResults(answers: Record<string, string>) {
  let naScore = 50;
  let kScore = 50;

  // Diet adjustments
  const diet = answers["0-0"];
  if (diet === "Keto / low-carb") { naScore += 15; kScore -= 10; }
  else if (diet === "Plant-based") { naScore -= 5; kScore += 20; }
  else if (diet === "Mediterranean") { naScore += 5; kScore += 10; }
  else if (diet === "Paleo / whole food") { naScore += 5; kScore += 5; }

  // Sodium
  const saltUse = answers["1-0"];
  if (saltUse === "Heavy salter") naScore += 20;
  else if (saltUse?.includes("Moderate")) naScore += 10;

  const electrolytes = answers["1-1"];
  if (electrolytes === "Daily") { naScore += 15; kScore += 5; }
  else if (electrolytes === "A few times a week") { naScore += 8; kScore += 3; }

  const liteSalt = answers["1-2"];
  if (liteSalt?.includes("KCl")) kScore += 20;
  else if (liteSalt?.includes("other")) kScore += 10;

  // Potassium
  const kFood = answers["2-0"];
  if (kFood?.includes("Daily")) kScore += 15;
  else if (kFood?.includes("few times")) kScore += 5;

  const kSupp = answers["2-1"];
  if (kSupp === "Yes") kScore += 15;

  // Activity
  const exercise = answers["3-0"];
  if (exercise?.includes("High")) { naScore += 10; kScore += 5; }
  else if (exercise?.includes("Moderate")) { naScore += 5; }

  const ratio = Math.round((naScore / Math.max(kScore, 1)) * 10) / 10;

  let status: "optimal" | "suboptimal" | "attention";
  let statusColor: string;
  let interpretation: string;

  if (ratio >= 0.8 && ratio <= 1.4) {
    status = "optimal";
    statusColor = "#4CAF50";
    interpretation = `Your estimated Na:K ratio of ${ratio}:1 falls within the optimal range. Your current diet and supplementation appear well-balanced. SafeSalt\u2122 can help you maintain this ratio with cleaner sodium sourcing.`;
  } else if (ratio > 1.4 && ratio <= 2.0) {
    status = "suboptimal";
    statusColor = "#FF9800";
    interpretation = `Your estimated Na:K ratio of ${ratio}:1 suggests your sodium intake is outpacing your potassium. This is common, especially with electrolyte supplementation. Consider increasing whole-food potassium sources and switching to SafeSalt\u2122 for optimized sodium without KCl.`;
  } else {
    status = "attention";
    statusColor = ratio > 2.0 ? "#F44336" : "#FF9800";
    interpretation = ratio > 2.0
      ? `Your estimated Na:K ratio of ${ratio}:1 indicates significantly elevated sodium relative to potassium. This pattern is associated with cardiovascular strain. SafeSalt\u2122 can cut your sodium load by 50% while you increase potassium through whole foods.`
      : `Your estimated Na:K ratio of ${ratio}:1 suggests you may benefit from more intentional sodium intake. SafeSalt\u2122 provides optimized sodium with full mineral support to help establish a healthy baseline.`;
  }

  return { ratio, status, statusColor, interpretation };
}

// ─── PRODUCT CARDS ────────────────────────────────────────────────────────────

function getRecommendations(answers: Record<string, string>) {
  const liteSalt = answers["1-2"];
  const exercise = answers["3-0"];
  const goal = answers["3-1"];

  return [
    {
      name: "SafeSalt\u2122",
      reason: liteSalt?.includes("KCl")
        ? "You\u2019re currently using a KCl-based substitute. SafeSalt\u2122 gives you 50% less sodium without potassium chloride \u2014 so you control your K sources."
        : "SafeSalt\u2122 replaces your daily salt with a precision-formulated electrolyte seasoning \u2014 50% less sodium, full mineral stack, zero KCl.",
      href: "https://safesalt.health",
    },
    {
      name: "SafeSupplements\u2122",
      reason: goal?.includes("Longevity")
        ? "Your longevity focus pairs well with targeted mineral supplementation. SafeSupplements\u2122 fills the gaps your diet can\u2019t."
        : "SafeSupplements\u2122 delivers the micronutrients most diets miss \u2014 formulated to complement your Na:K protocol.",
      href: "https://safesupplements.health",
    },
    {
      name: "SafeHydrate\u2122",
      reason: exercise?.includes("High")
        ? "With your training volume, hydration is critical. SafeHydrate\u2122 provides electrolyte balance without the sugar or artificial ingredients."
        : "SafeHydrate\u2122 delivers clean electrolyte hydration calibrated to your activity level \u2014 no sugar, no junk.",
      href: "https://safehydrate.health",
    },
  ];
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const totalSteps = STEPS.length;
  const step = STEPS[currentStep];

  const allQuestionsAnswered = step?.questions.every((_, qi) => answers[`${currentStep}-${qi}`]);

  const handleSelect = (questionIndex: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [`${currentStep}-${questionIndex}`]: option }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // ─── RESULTS ────────────────────────────────────────────────────────────────

  if (showResults) {
    const { ratio, statusColor, interpretation } = calculateResults(answers);
    const recs = getRecommendations(answers);
    const barWidth = Math.min(Math.max((ratio / 3) * 100, 10), 100);

    return (
      <div style={{ minHeight: "100vh", background: C.navy, fontFamily: F }}>
        {/* Header */}
        <div style={{ padding: "24px 24px 0", maxWidth: 800, margin: "0 auto" }}>
          <a href="/" style={{ color: C.white, fontSize: 18, fontWeight: 700, textDecoration: "none" }}>SafeBrand\u2122</a>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px 96px" }}>
          <p style={{ color: C.sky, fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>
            Your Results
          </p>
          <h1 style={{ color: C.white, fontSize: 42, fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 32 }}>
            Estimated Na:K Ratio
          </h1>

          {/* Ratio display */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 24 }}>
            <span style={{ color: C.peach, fontSize: 72, fontWeight: 700, fontFamily: F }}>{ratio}</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 24, fontWeight: 400 }}>: 1</span>
          </div>

          {/* Status bar */}
          <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 8 }}>
            <div style={{ width: `${barWidth}%`, height: "100%", background: statusColor, borderRadius: 4, transition: "width 0.6s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Optimal</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Needs Attention</span>
          </div>

          {/* Interpretation */}
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 24, marginBottom: 48 }}>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, lineHeight: 1.7, fontWeight: 300 }}>
              {interpretation}
            </p>
          </div>

          {/* Recommendations */}
          <p style={{ color: C.sky, fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 24 }}>
            Recommended For You
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 64 }}>
            {recs.map((r) => (
              <div key={r.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 24 }}>
                <h3 style={{ color: C.white, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{r.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.65, fontWeight: 300, marginBottom: 16 }}>{r.reason}</p>
                <a href={r.href} target="_blank" rel="noopener noreferrer" style={{ color: C.peach, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                  Learn More \u2192
                </a>
              </div>
            ))}
          </div>

          {/* Email capture */}
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 32, textAlign: "center" }}>
            <h3 style={{ color: C.white, fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Get your full mineral report</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 24 }}>
              We\u2019ll send a detailed breakdown of your Na:K profile with personalized recommendations.
            </p>
            {emailSent ? (
              <p style={{ color: C.peach, fontSize: 15, fontWeight: 500 }}>Report sent. Check your inbox.</p>
            ) : (
              <div style={{ display: "flex", gap: 12, maxWidth: 440, margin: "0 auto" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  style={{ flex: 1, padding: "14px 16px", fontSize: 15, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, color: C.white, outline: "none", fontFamily: F }}
                />
                <button
                  onClick={() => { if (email.includes("@")) setEmailSent(true); }}
                  style={{ background: C.peach, color: C.navy, fontSize: 14, fontWeight: 600, padding: "14px 24px", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: F, whiteSpace: "nowrap" }}
                >
                  Send my report \u2192
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── QUIZ STEPS ─────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: C.navy, fontFamily: F }}>
      {/* Header */}
      <div style={{ padding: "24px 24px 0", maxWidth: 800, margin: "0 auto" }}>
        <a href="/" style={{ color: C.white, fontSize: 18, fontWeight: 700, textDecoration: "none" }}>SafeBrand\u2122</a>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 96px" }}>
        {/* Progress */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 500 }}>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span style={{ color: C.peach, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {step.title}
            </span>
          </div>
          <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
            <div style={{ width: `${((currentStep + 1) / totalSteps) * 100}%`, height: "100%", background: C.peach, borderRadius: 2, transition: "width 0.3s" }} />
          </div>
        </div>

        {/* Questions */}
        {step.questions.map((q, qi) => {
          const selected = answers[`${currentStep}-${qi}`];
          return (
            <div key={qi} style={{ marginBottom: 40 }}>
              <h2 style={{ color: C.white, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20 }}>
                {q.prompt}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {q.options.map((opt) => {
                  const isSelected = selected === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(qi, opt)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "16px 20px",
                        fontSize: 15,
                        fontWeight: isSelected ? 600 : 400,
                        fontFamily: F,
                        color: isSelected ? C.navy : "rgba(255,255,255,0.85)",
                        background: isSelected ? C.peach : "rgba(255,255,255,0.05)",
                        border: isSelected ? `2px solid ${C.peach}` : "2px solid rgba(255,255,255,0.1)",
                        borderRadius: 8,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            style={{
              background: "none",
              border: "none",
              color: currentStep === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)",
              fontSize: 14,
              fontWeight: 500,
              cursor: currentStep === 0 ? "default" : "pointer",
              fontFamily: F,
            }}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!allQuestionsAnswered}
            style={{
              background: allQuestionsAnswered ? C.navy : "rgba(255,255,255,0.1)",
              color: allQuestionsAnswered ? C.white : "rgba(255,255,255,0.3)",
              fontSize: 14,
              fontWeight: 600,
              padding: "14px 32px",
              border: allQuestionsAnswered ? `2px solid ${C.peach}` : "2px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              cursor: allQuestionsAnswered ? "pointer" : "default",
              fontFamily: F,
              transition: "all 0.15s",
            }}
          >
            {currentStep === totalSteps - 1 ? "See My Results" : "Next \u2192"}
          </button>
        </div>
      </div>
    </div>
  );
}
