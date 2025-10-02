import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

export const db = drizzle(process.env.VITE_DATABASE_URL!, { schema });
