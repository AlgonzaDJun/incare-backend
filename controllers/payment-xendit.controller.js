const { Xendit, Invoice: InvoiceClient } = require("xendit-node");
const dotenv = require("dotenv");
const User = require("../models/user");
dotenv.config();

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_KEY });
const { Invoice } = xenditClient;
const xenditInvoiceClient = new InvoiceClient({
  secretKey: process.env.XENDIT_KEY,
});

module.exports = {
  createInvoice: async (req, res) => {
    const user = req.user;

    const findUser = await User.findById(user.id);

    const user_id = user.id;

    try {
      // const external_id = "INCARE-" + user_id + "-" + Date.now();

      const {
        description,
        amount,
        external_id = "INCARE-" + user_id + "-" + Date.now(),
      } = req.body;

      const data2 = {
        amount: amount,
        invoiceDuration: 172800,
        payerEmail: user.email,
        externalId: external_id,
        description: description,
        currency: "IDR",
        reminderTime: 1,

        customer: {
          id: user_id,
          phoneNumber: findUser.no_hp,
          givenNames: findUser.fullname,
          email: findUser.email,
          mobileNumber: findUser.no_hp,
        },

        items: [
          {
            name: "Konseling Online",
            price: amount,
            quantity: 1,
            referenceId: external_id,
          },
        ],

        customerNotificationPreference: {
          invoiceCreated: ["sms", "whatsapp", "email"],
          invoiceReminder: ["sms", "whatsapp", "email"],
          invoiceExpired: ["sms", "whatsapp", "email"],
        },

        successRedirectUrl: process.env.FRONTEND_URL + "/history/" + external_id,
        failureRedirectUrl: process.env.FRONTEND_URL + "/history/" + external_id + "/fail",
      };

      const invoice = await xenditInvoiceClient.createInvoice({ data: data2 });

      res.status(200).json({
        message: "Invoice berhasil dibuat",
        data: invoice,

        // user: findUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Terjadi Error",
        error: error.message,
      });
    }
  },

  getInvoices: async (req, res) => {
    try {
      const response = await xenditInvoiceClient.getInvoices({
        limit: 100,
      });
      res.status(200).json({
        message: "Berhasil mendapatkan data invoice",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getInvoicesById: async (req, res) => {
    const { id } = req.params;

    // const id = req.query.id;
    try {
      const response = await xenditInvoiceClient.getInvoiceById({
        invoiceId: id,
      });
      res.status(200).json({
        message: "Berhasil mendapatkan data invoice by id",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
        id: id,
      });
    }
  },
};
