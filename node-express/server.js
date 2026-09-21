const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => res.json({ service: "node-express", status: "ok" }));
app.get("/health", (_req, res) => res.status(200).send("healthy"));

const server = app.listen(port, () => console.log(`listening on ${port}`));

// Graceful shutdown so `docker stop` doesn't wait for SIGKILL
process.on("SIGTERM", () => server.close(() => process.exit(0)));
