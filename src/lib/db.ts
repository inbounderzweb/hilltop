import mysql from "mysql2/promise";

declare global {
    var db: any | undefined;
}

const pool = globalThis.db || mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000, // Increase timeout slightly
    ssl: {
        rejectUnauthorized: false,
    },
});

if (process.env.NODE_ENV !== "production") {
    globalThis.db = pool;
}

export const db = pool;