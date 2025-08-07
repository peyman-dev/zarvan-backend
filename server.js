import e from "express";
import connect from "./src/connect.js";
import userRouter from "./src/routes/userRoute.js";
import dontenv from 'dotenv'

dontenv.config()

const PORT = 3000;
const application = e();

application.use(e.json())
application.use(e.urlencoded())

connect().then(() => {
  application.listen(PORT, () => {
    console.log(`Application is listening to the ${PORT} port`);
  });
});




application.use('/users', userRouter)