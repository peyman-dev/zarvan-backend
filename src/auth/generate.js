import jwt from "jsonwebtoken";

export default async function generateToken(parameter, expireAt) {
  const securityCode = process.env.JWT_SECURITY;

  const accessToken = jwt.sign(
    {
      phoneNumber: parameter,
    },
    securityCode,
    {
      algorithm: "HS256",
    }
  );

  return accessToken;
}
