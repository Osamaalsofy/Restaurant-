import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for background WhatsApp Dispatch - Always simulated to prevent credential or authentication errors
  app.post("/api/send-whatsapp", async (req, res) => {
    const { recipientPhone, customerName, tokenSerial, details, orderType } = req.body;

    console.log("\n======================================================================");
    console.log(`📡 [BACKEND] WHATSAPP SIMULATION SCHEDULER`);
    console.log(`👤 Customer Name:  ${customerName || "N/A"}`);
    console.log(`📱 Recipient Phone: ${recipientPhone || "N/A"}`);
    console.log(`🎟️ Token Serial:   ${tokenSerial || "N/A"}`);
    console.log(`🍹 Order Type:     ${orderType || "N/A"}`);
    console.log(`📦 Details:        ${details || "N/A"}`);
    console.log("======================================================================\n");

    console.log("ℹ️ [BACKEND] Running in beautiful simulated lounge mode. All notifications sent to sandboxed local dispatch.");
    
    return res.status(200).json({
      success: true,
      simulated: true,
      message: "Lounge system dispatch completed. WhatsApp notification simulated (Offline sandbox node).",
      tokenSerial,
      timestamp: new Date().toISOString()
    });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
