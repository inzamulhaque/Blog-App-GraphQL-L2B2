import jwt, { Secret, SignOptions } from "jsonwebtoken";
import cinfig from "../config";

const jwtHelper = (payload: { userId: number }, time?: string) => {
  const secret = cinfig.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_TOKEN environment variable is not defined");
  }

  const options: SignOptions = {
    expiresIn: (time ?? "7d") as SignOptions["expiresIn"],
  };

  const token = jwt.sign(payload, secret as Secret, options);

  return token;
};

export default jwtHelper;
