const Chat = require("../models/Chat");

// Endpoint create new chat(dua pengguna)
const createChat = async (req, res) => {
    const { participants, chatType } = req.body;

    try {
        const chatExists = await Chat.findOne({ participants }).exec();

        if (chatExists) {
            return res.status(400).json({
                message: 'Chat Already Exists'
            });
        }

        const newChat = new Chat({
            participants,
            chatType
        });

        const savedChat = await newChat.save();
        return res.status(201).json(savedChat);
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to Create Chat', error
        });
    }
};

// Endpoint send message
const sendMessage = async (req, res) => {
    const { chatId, sender, content } = req.body;

    try {
        const chat = await Chat.findById(chatId).exec();

        if (!chat) {
            return res.status(404).json({
                message: "Chat Not Found"
            })
        }

        const newMessage = {
            sender,
            content,
            timestamp: Date.now()
        }

        chat.message.push(newMessage);
        await chat.save();

        return res.status(201).json({
            message: "Message Send Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to Send Message",
            error
        })
    }
};

// Endpoint get message
const getMessage = async (req, res) => {
    const { id } = req.params

    try{
    const getChats = await Chat.findById(id);

     if(!getChats) {
        return res.status(404).json({
            message: "Chat Not Found"
        })
     }

     res.status(201).json({
        message: "Get Message Succesfully"
     })
  } catch (error) {
    return res.status(500).json({
        message: "Failed to Get Message",
        error
    })
  }
};

//Endpoint notification to message
const notifChat = async (req, res) => {
    const { chatId, sender } = req.body;

    if (!chatId || !sender) {
        return res.status(400).json({
            message: "All fields are Required"
        })
    }

    try {
        const chat = await Chat.findById(chatId).exec();

        if (!chat) {
            return res.status(404).json({
                message: "Chat Not Found"
            })
        } 

         return res.status(201).json({
            message: "Notification Chat Successfully"
        })
      } catch (error) {
          return res.status(500).json({
            message: "Notification Chat Failed",
            error
        })
    };
};

// Endpoint Get Activity Chat/Status Chat
const statusChat = async (req, res) => {
    const { id } = req.params;

    try{
        const statusMessage = await Chat.findById(id);

        if(!statusMessage) {
            return res.status(404).json({
                message: "Chat Not Found"
            })
         }

         res.status(201).json({
            message: "Get Activity Chat Succesfully"
         })

      } catch (error) {
          return res.status(500).json({
            message: "Failed to Get Activity",
            error
          })
    }  
};

module.exports = {
    createChat,
    sendMessage,
    getMessage,
    notifChat,
    statusChat,
}