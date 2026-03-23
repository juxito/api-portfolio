const serverless = require("serverless-http");
const app = require("../src/app").default;
const { connectDB } = require("../src/config/mongo");

let isConnected = false;

async function ensureDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

module.exports = async (req, res) => {
  await ensureDB();
  return serverless(app)(req, res);
};