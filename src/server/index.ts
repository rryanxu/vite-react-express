import express from "express";
import dotenv from "dotenv";

export const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

app.get("/api/test", (_, res) => res.json({ greeting: "Hello" }));

if (process.env.NODE_ENV === "prod") {
  const client_dir = process.cwd() + "/dist/client";
  app.use(express.static(client_dir));
  app.get("/*", (_, res) => {
    res.send(client_dir + "index.html");
  });
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
