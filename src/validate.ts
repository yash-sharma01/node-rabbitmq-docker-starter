import { validateEnv } from "./config/env";

const env = validateEnv();
console.log("✅ Environment variables are valid:", env);
