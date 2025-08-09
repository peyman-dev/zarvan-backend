import { getFinalError, v } from "../core/settings.js";
import DeliveryModel from "../models/DeliveryModel.js";
import DeliveryDataSchema from "../validations/delivery.js";

const createNewItem = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await v.parseAsync(DeliveryDataSchema, body);

    const newItem = await DeliveryModel.create(data);

    if (!newItem) {
      res.staus(400).send({
        message: "ایجاد سرویس با خطا مواجه شد",
        ok: false,
      });
    } else {
        res.status(201).send({
            message: "سرویس با موفقیت ایجاد گردید",
            ok: true,
            data: newItem
        })
    }

   
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      ok: false,
      message: getFinalError(error),
    });
  }
};

const deliveryController = { createNewItem };
export default deliveryController;
