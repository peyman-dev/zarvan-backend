import e from "express";
import userController from "../controllers/userController.js";

const userRouter = e.Router();

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)

export default userRouter;
