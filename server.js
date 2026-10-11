const express = require("express");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
// The frontend uses the official Bolna SDK from jsDelivr. Disable CSP here;
// Helmet's other security headers remain enabled.
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "10kb" }));

// A small public demo still needs basic abuse protection. Adjust carefully
// if legitimate interview testers are blocked.
const sessionLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many attempts. Please wait a minute and try again." }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "home-credit-bolna-public-demo" });
});

app.post("/api/bolna-session", sessionLimiter, async (req, res) => {
  const apiKey = process.env.BOLNA_API_KEY;
  const agentId = process.env.BOLNA_AGENT_ID;

  if (!apiKey || !agentId) {
    return res.status(503).json({
      error: "Demo is not configured yet. Please contact the demo owner."
    });
  }

  try {
    const payload = { agent_id: agentId };
    // The SDK may send dynamic variables as user_data. Only forward an object.
    if (req.body && req.body.user_data && typeof req.body.user_data === "object") {
      payload.user_data = req.body.user_data;
    }

    const upstream = await fetch("https://api.bolna.ai/web-call/freeswitch-session", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const bodyText = await upstream.text();
    let data;
    try { data = JSON.parse(bodyText); }
    catch { data = { error: "Bolna returned an unexpected response." }; }

    if (!upstream.ok) {
      // Avoid returning upstream details that might reveal account information.
      console.error("Bolna session mint failed with status:", upstream.status);
      return res.status(upstream.status >= 400 && upstream.status < 500 ? 502 : 503)
        .json({ error: data.error || "Could not start a voice session. Please try again." });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Session endpoint error:", err.message);
    return res.status(502).json({ error: "Could not connect to the voice service. Please try again." });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Home Credit demo server listening on port ${PORT}`);
});