require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "oneedocms",
      script: "npm",
      args: "start",
      instances: "4",
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
      },
    },
  ],
};
