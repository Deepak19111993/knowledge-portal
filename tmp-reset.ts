import { db } from "./src/server/db";
import { articles } from "./src/server/db/schema";
import { sql } from "drizzle-orm";

async function resetViews() {
  process.env.DATABASE_URL = "postgresql://bloguser:blogpass123@localhost:5432/creole_portal";
  console.log("Resetting all blog views to 0...");
  await db.update(articles).set({ views: 0 });
  console.log("Done.");
  process.exit(0);
}

resetViews().catch(err => {
  console.error(err);
  process.exit(1);
});
