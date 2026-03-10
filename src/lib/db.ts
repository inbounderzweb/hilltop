import mysql from "mysql2/promise";

declare global {
    var db: any | undefined;
}

if (!process.env.DB_HOST) {
    console.error("❌ CRITICAL: DB_HOST is not defined in environment variables!");
}

const pool = globalThis.db || mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000,
    ssl: process.env.DB_SSL === "true" ? {
        rejectUnauthorized: false,
    } : undefined,
});

if (process.env.NODE_ENV !== "production") {
    globalThis.db = pool;
}

export const db = pool;