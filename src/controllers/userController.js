import * as v from "valibot";
import RegisterSchema from "../validations/user/register.js";
import generateToken from "../auth/token.js";
import { decryptPassword, hashPassword } from "../auth/password.js";
import UserModel from "../models/UserModel.js";
import LoginSchema from "../validations/user/login.js";

// Register
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

    if (!users?.length)
      securedAccount = {
        ...validatedData,
        password: hashedPassword,
        role: "ADMIN",
      };

    const newAccount = await UserModel.create(securedAccount);

    console.log(newAccount);

    if (!newAccount) return;

    res
      .send({
        message: "ثبت نام با موفقیت انجام گردید",
        ok: true,
        data: {
          ...newAccount,
          accessToken,
        },
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

const login = async (req, res) => {
  try {
    const payload = req.body;
    const data = v.parse(LoginSchema, payload);

    const isUserExist = await UserModel.findOne({
      $or: [
        {
          email: data.identifier,
        },
        {
          phoneNumber: data.identifier,
        },
      ],
    });

    if (!isUserExist) res.status(403).send({
        message: "کاربری با این مشخصات یافت نشد !",
        ok: false,
    });

    const isPasswordValid = await decryptPassword(isUserExist.password, data.password)

    if (!isPasswordValid) res.status(403).send({
        message: "اطلاعات وارد شده نامعتبر می‌باشد.",
        ok: false
    })

    res.send({
      message: "شما باموفقیت وارد حساب خود شدید !",
      ok: true,
      data: isUserExist
    }).status(200);
  } catch (error) {
    const isDataSchemaError = error?.issues?.length;
    res.send({
      ok: false,
      message: isDataSchemaError
        ? error?.issues?.map((issue) => issue.message)
        : new Error(error),
    });
  }
};

const userController = {
  register,
  login,
};

export default userController;
