import e from "express";
import userController from "../controllers/userController.js";

const userRouter = e.Router();

userRouter.post('/register', userController.register)

export default userRouter;
