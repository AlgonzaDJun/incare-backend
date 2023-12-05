const Chat = require("../models/Chat");
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1718241",
  key: "35a02302da3f176bca9d",
  secret: "f9d000d3dc7f424c602a",
  cluster: "ap1",
  useTLS: true,
});
// Endpoint create new chat(dua pengguna)
const createChat = async (req, res) => {
  const { receiver, sender, message } = req.body;

  try {
    pusher.trigger("chat", "message", { sender, receiver, message });
    const newChat = new Chat({ receiver, sender, message });
    await newChat.save();
    return res.status(201).json({
      message: "Success Send Chat",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Create Chat",
      error,
    });
  }
};

// Endpoint get message
const getMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const getChats = await Chat.findById(id);

    if (!getChats) {
      return res.status(404).json({
        message: "Chat Not Found",
      });
    }

    res.status(201).json({
      message: "Get Message Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Get Message",
      error,
    });
  }
};

//Endpoint notification to message
const notifChat = async (req, res) => {
  const { chatId, sender } = req.body;

  if (!chatId || !sender) {
    return res.status(400).json({
      message: "All fields are Required",
    });
  }

  try {
    const chat = await Chat.findById(chatId).exec();

    if (!chat) {
      return res.status(404).json({
        message: "Chat Not Found",
      });
    }

    return res.status(201).json({
      message: "Notification Chat Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Notification Chat Failed",
      error,
    });
  }
};

// Endpoint Get Activity Chat/Status Chat
const statusChat = async (req, res) => {
  const { id } = req.params;

  try {
    const statusMessage = await Chat.findById(id);

    if (!statusMessage) {
      return res.status(404).json({
        message: "Chat Not Found",
      });
    }

    res.status(201).json({
      message: "Get Activity Chat Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Get Activity",
      error,
    });
  }
};

module.exports = {
  createChat,

  getMessage,
  notifChat,
  statusChat,
};
