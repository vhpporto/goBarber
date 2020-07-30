module.exports = {
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: "root",
  password: process.env.DB_PASSWORD,
  database: "gobarber",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
