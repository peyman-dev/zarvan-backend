import e from "express";
import deliveryController from "../controllers/deliveryController.js";
import authentication from "../middlewares/authentication.js";
import { setupMiddleware } from "../core/settings.js";

const deliveryRoute = e.Router();
setupMiddleware(deliveryRoute)

deliveryRoute.use((req, res, next) =>
  authentication(req, res, next, {
    strict: true,
    execpt: "GET", // Its Forced to Admin, Execpt "GET" method
  })
);

deliveryRoute.post("/", deliveryController.createNewItem);

export default deliveryRoute;
