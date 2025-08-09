import e from "express";
import connect from "./src/connect.js";
import userRouter from "./src/routes/userRoute.js";
import dontenv from 'dotenv'
import deliveryRoute from "./src/routes/deliveryRoute.js";

dontenv.config()

const PORT = 3000;
const application = e();


connect().then(() => {
  application.listen(PORT, () => {
    console.log(`Application is listening to the ${PORT} port`);
  });
});




application.use('/users', userRouter)
application.use('/delivery', deliveryRoute)