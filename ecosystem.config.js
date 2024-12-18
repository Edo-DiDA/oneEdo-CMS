require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "oneedocms",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_CLIENT: process.env.DATABASE_CLIENT,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PORT: process.env.DATABASE_PORT,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_SSL: process.env.DATABASE_SSL,
        HOST: process.env.HOST,
        PORT: process.env.PORT,
        APP_KEYS: process.env.APP_KEYS,
        API_TOKEN_SALT: process.env.API_TOKEN_SALT,
        ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
        TRANSFER_TOKEN_SALT: process.env.TRANSFER_TOKEN_SALT,
        JWT_SECRET: process.env.JWT_SECRET,
      },
    },
  ],
};
