import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.PASSWORD_SALT) || 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const decryptPassword = async (hashedPassword, userEnteredPassword) => {
  const password = await bcrypt.compare(userEnteredPassword, hashedPassword)

  return password
};
