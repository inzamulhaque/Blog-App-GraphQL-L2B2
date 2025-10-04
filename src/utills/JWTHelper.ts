import jwt, { Secret, SignOptions } from "jsonwebtoken";
import cinfig from "../config";

const generateToken = (payload: { userId: number }, time?: string) => {
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

const decodeToken = (token: string) => {
  const secret = cinfig.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_TOKEN environment variable is not defined");
  }

  try {
    const decoded = jwt.verify(token, secret as Secret);
    return decoded;
  } catch (error) {
    return null;
  }
};

const jwtHelper = { generateToken, decodeToken };

export default jwtHelper;
