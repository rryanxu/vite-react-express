import express from "express";
import dotenv from "dotenv";
import path from "path";

export const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

app.get("/api/test", (_, res) => res.json({ greeting: "Hello" }));

if (process.env.NODE_ENV === "prod") {
  const client_dir = path.join(process.cwd(), "dist/client");
  app.use(express.static(client_dir));
  app.get("/*", (_, res) => {
    res.send(path.join(client_dir, "index.html"));
  });
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
