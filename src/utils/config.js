const config = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    database: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: 'mysql',
    },
    redis : {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }
  };
  
  export default config;