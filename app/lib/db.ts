import postgres from "postgres";

if (!process.env.POSTGRES_URL_TEST) throw new Error("POSTGRES_URL_TEST Url not found!");

const sql = postgres(process.env.POSTGRES_URL_TEST, {
    host: process.env.POSTGRES_HOST_TEST,            // Postgres ip address[s] or domain name[s]
    port: 5432,          // Postgres server port[s]
    database: process.env.POSTGRES_DATABASE_TEST,            // Name of database to connect to
    username: process.env.POSTGRES_USER_TEST,            // Username of database user
    password: process.env.POSTGRES_PASSWORD_TEST,
});


export default sql;