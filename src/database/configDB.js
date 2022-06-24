const db = {
  mysql: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      database: "ecommerce",
    },
    pool: { min: 0, max: 10 },
  },

  sqlite: {
    client: "sqlite3",
    connection: {
      filename: "./database/ecommerce.sqlite",
    },
    useNullAsDefault: true,
  },
};

exports.db = db;
