import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: './.env.local' });

export default defineConfig({
  out: './drizzle',
  schema: 'src/lib/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.VITE_DATABASE_URL!,
  },
});
