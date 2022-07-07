import "dotenv/config";

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

{
  mongoDb: {
    URL: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.krjoq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority"`;
    options: {
      useNewUrlParser: true;
      useUnifiedTopology: true;
    }
  }
}

export const options = {
  mariaDB: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "process.env.PASS_ROOT",
      database: "ecommerce",
    },
  },
  sqLite: {
    client: "sqlite3",
    connection: {
      filename: "./db.sqlite",
    },
    useNullAsDefault: true,
  },
};

export default options;
