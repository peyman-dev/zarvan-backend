const createNewItem = async (req, res, next) => {
  const body = req.body;
  console.log(body)
  res.send({
    // data: body,
    t: "ASD"
  });
};

const deliveryController = { createNewItem };
export default deliveryController;
