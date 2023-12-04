const Pusher = require("pusher");
const Chat = require("../models/Chat");

const pusher = new Pusher({
  appId: "1576805",
  key: "c9ce2e95cbf7337b0b48",
  secret: "2341eaca8dd35a982e4b",
  cluster: "ap1", // if `host` is present, it will override the `cluster` option. connections
});

module.exports = {
  sendChat: async (req, res) => {
    const { message, sender_id, receiver_id } = req.body;

    try {
      const room = await Chat.findOne({
        $or: [
          {
            sender_id: sender_id,
            receiver_id: receiver_id,
          },
          {
            sender_id: receiver_id,
            receiver_id: sender_id,
          },
        ],
      });

      if (room) {
        room.message.push({
          content: message,
          status: false,
          sender: sender_id,
          receiver: receiver_id,
        });
        await room.save();

        pusher.trigger([sender_id, receiver_id], "chat", {
          message: message,
          sender_id: sender_id,
          receiver_id: receiver_id,
        });

        return res.json({
          message: "success",
          data: room,
        });
      } else {
        await Chat.create({
          sender_id: sender_id,
          receiver_id: receiver_id,
          message: [
            {
              content: message,
              status: false,
              sender: sender_id,
              receiver: receiver_id,
            },
          ],
        });

        pusher.trigger([sender_id, receiver_id], "chat", {
          message: message,
          sender_id: sender_id,
          receiver_id: receiver_id,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "error",
        error: error.message,
      });
    }

    res.json({
      message: "success",
      data: {
        sender_id: sender_id,
        receiver_id: receiver_id,
        message: [
          {
            content: message,
            status: false,
          },
        ],
      },
    });
  },

  getChatBySenderReceiver: async (req, res) => {
    const { sender_id, receiver_id } = req.params;

    try {
      const room = await Chat.findOne({
        $or: [
          {
            sender_id: sender_id,
            receiver_id: receiver_id,
          },
          {
            sender_id: receiver_id,
            receiver_id: sender_id,
          },
        ],
      });

      res.json({
        message: "success",
        data: room,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        error: error.message,
      });
    }
  },
};
