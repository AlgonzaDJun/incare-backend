import { Xendit, Invoice as InvoiceClient } from "xendit-node";
const dotenv = require("dotenv");
dotenv.config();

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_KEY });
const { Invoice } = xenditClient;
const xenditInvoiceClient = new InvoiceClient({
  secretKey: YOUR_SECRET_KEY,
});

module.exports = {
  createInvoice: async (req, res) => {
    const user_id = "5f8f7f2d0f7a7e2b3c6f8b5d";
    try {
      const external_id = "INCARE-" + user_id + "-" + Math.random();

      const { payer_email, description, amount } = req.body;

      const data = {
        externalID: external_id,
        payerEmail: payer_email,
        description: description,
        amount: amount,
        currency: "IDR",
        customer: {
          id: user_id,
        },
      };

      const invoice = await xenditInvoiceClient.createInvoice(data);

      res.status(200).json({
        message: "Invoice berhasil dibuat",
        data: invoice,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  },
};
