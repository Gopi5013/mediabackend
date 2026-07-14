
const router =
  require("express").Router();

const Razorpay =
  require("razorpay");



const razorpay =
  new Razorpay({
    key_id:
      process.env
        .RAZORPAY_KEY_ID,

    key_secret:
      process.env
        .RAZORPAY_KEY_SECRET,
  });

router.post(
  "/create-order",
  async (req, res) => {
    console.log(
      "Create Order Route Hit"
    );

    try {
      console.log(
        "Request Body:",
        req.body
      );

      const {
        name,
        email,
        phone,
      } = req.body;

      const options = {
        amount: 100,
        currency: "INR",

        receipt:
          `mp_${Date.now()}`,

        notes: {
          name,
          email,
          phone,
        },
      };

      console.log(
        "Creating Razorpay Order..."
      );

      const order =
        await razorpay.orders.create(
          options
        );

      console.log(
        "ORDER CREATED:",
        order
      );

      res.status(200).json(
        order
      );
    } catch (error) {
      console.error(
        "ORDER ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);

module.exports = router;
