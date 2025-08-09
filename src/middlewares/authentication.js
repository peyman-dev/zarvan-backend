import { verifyToken } from "../core/auth/token.js";
import UserModel from "../models/UserModel.js";

export default async function (req, res, next, options = {}) {
  const { strict = false, except } = options;
  const method = req.method;

  if (strict && method !== except) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader || !authHeader.split(" ")[1]) {
        return res.status(401).send("لطفا وارد حساب کاربری خود شوید");
      }
      const accessToken = authHeader.split(" ")[1];
      const userBaseInfos = await verifyToken(accessToken);
      const { phoneNumber } = userBaseInfos;

      const user = await UserModel.findOne({ phoneNumber }).select("role");
      if (!user) {
        return res.status(404).send("کاربر یافت نشد");
      }

      const { role } = user;
      const allowedRoles = ["ADMIN"];
      if (allowedRoles.includes(role)) {
        return next();
      } else {
        res.status(403).send("شما مجاز به انجام این کار نیستید !");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'خطایی در سرور رخ داده است' });
    }
  } else {
    return next();
  }
}