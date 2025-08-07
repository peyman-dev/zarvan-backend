import * as v from "valibot";
import RegisterSchema from "../validations/user/register.js";
import generateToken from "../auth/generate.js";
import { hashPassword } from "../auth/password.js";
import UserModel from "../models/UserModel.js";

// Actions
const register = async (req, res) => {
  const payload = req.body;
  try {
    const validatedData = await v.parseAsync(RegisterSchema, payload);
    const tokenExpirationDate = validatedData?.tokenExpiration || "1d";

    const accessToken = await generateToken(
      validatedData.phoneNumber,
      tokenExpirationDate
    );
    if (!accessToken) return;

    const hashedPassword = await hashPassword(validatedData.password);

    let securedAccount = {
      ...validatedData,
      password: hashedPassword,
    };
    const users = await UserModel.find();

    if (!users?.length) securedAccount = {
        ...validatedData,
        password: hashedPassword,
        role: "ADMIN"
      };

    const newAccount = await UserModel.create(securedAccount);

    console.log(newAccount);

    if (!newAccount) return;

    res
      .send({
        message: "ثبت نام با موفقیت انجام گردید",
        ok: true,
        data: newAccount,
      })
      .status(201);
  } catch (error) {
    const issues = error.issues.map((issue) => issue.message);
    res.status(400).send({
      ok: false,
      message: "ثبت نام ناموفق بود",
      errors: issues,
    });
  }
};

const userController = {
  register,
};

export default userController;
