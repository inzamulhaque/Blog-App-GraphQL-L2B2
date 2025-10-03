import path from "path";

require("dotenv").config({ path: path.join(process.cwd(), ".env") });

const cinfig = {
  JWT_SECRET: process.env.JWT_SECRET,
};

export default cinfig;
