import jwt from "jsonwebtoken";

export default async function generateToken(parameter, expireAt) {
  const securityCode = process.env.JWT_SECURITY;
  const accessToken = jwt.sign(
    {
      phoneNumber: parameter,
    },
    securityCode,
    {
      expiresIn: expireAt,
      algorithm: "HS256",
    }
  );

  return accessToken;
}

export const verifyToken = async (accessToken) => {
  const securityCode = process.env.JWT_SECURITY;
  try {  
    const data = jwt.verify(accessToken, securityCode, {
      algorithms: ["HS256"],
    });
    return data;
  } catch (error) {
    throw new Error("Invalid token: " + error.message);
  }
};
