export default () => ({
  database: {
    connectionString: process.env.DATABASE_URL,
  },
  port: process.env.PORT,
  secrets: {
    jwtSecret: process.env.JWT_SECRET,
  },
});
