const router = require("express").Router();
const crypto = require("crypto");

router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id +
          "|" +
          razorpay_payment_id
      )
      .digest("hex");

    const verified =
      generatedSignature ===
      razorpay_signature;

    if (!verified) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Save to database here later

    return res.json({
      success: true,
      message: "Payment successful",
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;