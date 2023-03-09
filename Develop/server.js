const express = require("express");
const routes = require("./routes");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "ecommerce_db",
  username: "root",
  password: "password",
  host: "localhost",
  dialect: "mysql",
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
