import { useState } from "react";

const B = {
  darkest:   "#0c293c",
  navy:      "#003f5f",
  teal:      "#2cb1cc",
  cream:     "#f7f3eb",
  navyLight: "#004f78",
  tealDim:   "#1a8599",
  mutedText: "#7eb8c9",
  dimText:   "#b8d4dc",
  border:    "#0a2233",
  borderMid: "#0e3048",
  gold:      "#f5a623",
};

const F = {
  heading:    "'Raleway', 'Trebuchet MS', sans-serif",
  subheading: "'Raleway', 'Trebuchet MS', sans-serif",
  body:       "'Montserrat', 'Segoe UI', sans-serif",
};

function calcReviewsNeeded(currentRating, currentCount, targetRating) {
  if (!currentRating || !currentCount || !targetRating) return null;
  const r = parseFloat(currentRating);
  const n = parseInt(currentCount);
  const t = parseFloat(targetRating);
  if (isNaN(r) || isNaN(n) || isNaN(t) || r <= 0 || n <= 0) return null;
  if (t <= r || t >= 5) return null;
  const needed = Math.ceil((n * (t - r)) / (5 - t));
  const newRating = ((r * n) + (5 * needed)) / (n + needed);
  return { needed, newTotal: n + needed, newRating };
}

function StarDisplay({ rating, size = 18 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = Math.min(Math.max(rating - (s - 1), 0), 1);
        return (
          <span key={s} style={{ position: "relative", display: "inline-block", width: size, height: size }}>
            <span style={{ color: B.borderMid, fontSize: size, lineHeight: 1 }}>★</span>
            <span style={{ position: "absolute", top: 0, left: 0, overflow: "hidden", width: `${fill * 100}%`, fontSize: size, lineHeight: 1, color: B.gold }}>★</span>
          </span>
        );
      })}
    </span>
  );
}

const INCREMENTS = [0.1, 0.2, 0.3, 0.5, 1.0];

const labelStyle = {
  fontSize: 9, letterSpacing: "0.18em", color: B.dimText,
  textTransform: "uppercase", fontFamily: F.subheading, fontWeight: 600,
};

const inputStyle = {
  background: B.darkest, border: `1px solid ${B.borderMid}`,
  borderRadius: 8, padding: "10px 14px", color: B.cream,
  fontSize: 22, outline: "none", fontFamily: F.heading,
  fontWeight: 700, width: "100%", boxSizing: "border-box",
  colorScheme: "dark", textAlign: "center",
};

export default function App() {
  const [currentRating, setCurrentRating] = useState("");
  const [currentCount,  setCurrentCount]  = useState("");
  const [increment,     setIncrement]     = useState(0.1);

  const r = parseFloat(currentRating);
  const target = !isNaN(r) ? Math.min(r + increment, 5.0) : null;
  const result = calcReviewsNeeded(currentRating, currentCount, target);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Raleway:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::-webkit-inner-spin-button, input::-webkit-outer-spin-button { opacity: 0.3; }
        input:focus { border-color: ${B.teal} !important; box-shadow: 0 0 0 2px ${B.teal}22; outline: none; }
        button { transition: all 0.15s; }
        button:hover { opacity: 0.85; }
      `}</style>

      <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${B.darkest} 0%, #091e2d 55%, ${B.darkest} 100%)`, fontFamily: F.body, color: B.cream }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(90deg, ${B.navy} 0%, #004068 100%)`, borderBottom: `1px solid ${B.border}`, padding: "36px 52px 30px", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${B.teal}, ${B.tealDim}, ${B.teal})` }} />
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: B.teal, textTransform: "uppercase", fontFamily: F.subheading, fontWeight: 600, marginBottom: 10 }}>
            Reputation Management
          </div>
          <h1 style={{ fontSize: 34, fontWeight: "normal", color: B.cream, fontFamily: F.heading, lineHeight: 1.1 }}>
            Google Review
            <span style={{ color: B.teal, display: "block", fontSize: 36 }}>Score Calculator</span>
          </h1>
          <p style={{ margin: "10px 0 0", color: B.mutedText, fontSize: 12 }}>
            Find out how many 5-star reviews you need to reach your target rating
          </p>
        </div>

        {/* Main */}
        <div style={{ padding: "40px 52px 60px", maxWidth: 820, margin: "0 auto" }}>

          {/* Input card */}
          <div style={{ background: `linear-gradient(135deg, ${B.navy}, ${B.navyLight})`, border: `1px solid ${B.borderMid}`, borderRadius: 16, padding: "32px 36px", marginBottom: 20 }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={labelStyle}>Current Google Rating</span>
                <input type="number" value={currentRating} min="1.0" max="4.9" step="0.1"
                  placeholder="e.g. 4.2"
                  onChange={(e) => setCurrentRating(e.target.value)}
                  style={inputStyle} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={labelStyle}>Number of Reviews You Have</span>
                <input type="number" value={currentCount} min="1" step="1"
                  placeholder="e.g. 200"
                  onChange={(e) => setCurrentCount(e.target.value)}
                  style={inputStyle} />
              </label>
            </div>

            {/* Star preview */}
            {currentRating && r >= 1 && r <= 5 && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
                <StarDisplay rating={r} size={30} />
              </div>
            )}

            {/* Increment buttons */}
            <div>
              <div style={{ ...labelStyle, marginBottom: 12 }}>I want to increase my rating by</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {INCREMENTS.map((inc) => (
                  <button key={inc} onClick={() => setIncrement(inc)} style={{
                    background: increment === inc ? B.teal : "none",
                    border: `1px solid ${increment === inc ? B.teal : B.borderMid}`,
                    borderRadius: 8, padding: "9px 22px",
                    color: increment === inc ? B.darkest : B.mutedText,
                    fontSize: 14, cursor: "pointer",
                    fontFamily: F.subheading, fontWeight: 700,
                  }}>
                    +{inc.toFixed(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result card */}
          {result && target && (
            <div style={{ background: `linear-gradient(135deg, ${B.darkest}, #0a2535)`, border: `1px solid ${B.borderMid}`, borderTop: `2px solid ${B.teal}`, borderRadius: 16, padding: "36px 36px 28px" }}>

              {/* Big number */}
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <div style={{ ...labelStyle, marginBottom: 12 }}>5-Star Reviews Needed</div>
                <div style={{ fontSize: 96, fontWeight: 700, color: B.teal, fontFamily: F.heading, lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {result.needed.toLocaleString()}
                </div>
                <div style={{ fontSize: 13, color: B.mutedText, marginTop: 12 }}>
                  to move from{" "}
                  <strong style={{ color: B.cream }}>{r.toFixed(1)} ★</strong>
                  {" "}to{" "}
                  <strong style={{ color: B.gold }}>{target.toFixed(1)} ★</strong>
                </div>
              </div>

              {/* Before → After */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ background: B.navy, border: `1px solid ${B.borderMid}`, borderRadius: 12, padding: "20px", textAlign: "center" }}>
                  <div style={{ ...labelStyle, marginBottom: 8 }}>Today</div>
                  <div style={{ fontSize: 40, fontWeight: 700, fontFamily: F.heading, color: B.cream, marginBottom: 8 }}>{r.toFixed(1)}</div>
                  <StarDisplay rating={r} size={15} />
                  <div style={{ fontSize: 11, color: B.dimText, marginTop: 8 }}>{parseInt(currentCount).toLocaleString()} reviews</div>
                </div>
                <div style={{ textAlign: "center", color: B.teal, fontSize: 22, fontWeight: 700 }}>→</div>
                <div style={{ background: B.navy, border: `1px solid ${B.teal}`, borderRadius: 12, padding: "20px", textAlign: "center" }}>
                  <div style={{ ...labelStyle, marginBottom: 8, color: B.teal }}>After</div>
                  <div style={{ fontSize: 40, fontWeight: 700, fontFamily: F.heading, color: B.gold, marginBottom: 8 }}>{result.newRating.toFixed(1)}</div>
                  <StarDisplay rating={result.newRating} size={15} />
                  <div style={{ fontSize: 11, color: B.dimText, marginTop: 8 }}>{result.newTotal.toLocaleString()} reviews</div>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
                {[
                  ["Reviews to Collect", result.needed.toLocaleString()],
                  ["Total After",        result.newTotal.toLocaleString()],
                  ["Exact New Rating",   result.newRating.toFixed(2) + " ★"],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: B.navy, border: `1px solid ${B.borderMid}`, borderRadius: 10, padding: "14px", textAlign: "center" }}>
                    <div style={{ ...labelStyle, marginBottom: 6 }}>{k}</div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: B.cream, fontFamily: F.heading }}>{v}</div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 11, color: B.dimText, textAlign: "center", lineHeight: 1.7 }}>
                Assumes all new reviews are 5 stars. Actual displayed rating may vary slightly as Google applies its own rounding.
              </p>
            </div>
          )}

          {/* Already perfect */}
          {currentRating && r >= 5 && (
            <div style={{ textAlign: "center", padding: 32, color: B.gold, fontSize: 15, fontFamily: F.body }}>
              🌟 You already have a perfect 5.0 rating!
            </div>
          )}

        </div>
      </div>
    </>
  );
}
