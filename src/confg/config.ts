export default () => ({
  database: {
    connectionString: process.env.DATABASE_URL,
  },
  port: process.env.PORT,
  secrets: {
    jwtSecret: process.env.JWT_SECRET,
  },
  emailAuth: {
    host: process.env.EMAIL_HOST,
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});
