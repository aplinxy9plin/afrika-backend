module.exports = {
    PORT: process.env.PORT,
    URL: process.env.MONGODB_URI || "mongodb://localhost:27017",
    DB_NAME: process.env.MONGODB_URI ? process.env.MONGODB_URI.split("mongodb://")[1].split(":")[0] : "afrika-app"
}