require('dotenv/config');
const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
  out: './drizzle',
  schema: './src/db/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
