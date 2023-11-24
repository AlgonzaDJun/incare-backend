const Conselor = require("../models/conselor");
const authToken = require("../middlewares/auth");
const User = require("../models/user");

const getConselor = async (req, res) => {
    const conselorsData = await Conselor.find();
    
        res.status(200).json({
          status: "OK",
          message: "Get All Counselors Successfully",
          counselors: conselorsData,
        });  
 };

const registConselor = async (req, res) => {
    let data = req.body;

    const { user_id, spesialisasi, jadwal } = data;

    if(!user_id || !spesialisasi || !jadwal ) {
        return res.status(400).json({
            message: "all fields are required"
        })
    }

    if (!authToken) {
        return res.status(400).json({
            message: "invalid token or user"
        })
    }

    const newConselor = ({ user_id, spesialisasi, jadwal: new Date() });
    await Conselor.create(newConselor);
 
    res.status(201).json({
        status: "OK",
        message: "Registering as a Counselor was successful",
        conselor: newConselor,
    })
  };

const getConselorById = async (req, res) => {
    const {id} = req.params;
    const conselor = await Conselor.findById(id);

   if (!conselor) {
    return res.status(400).json({
        message: "undefined conselor",
    })
   }
   
   res.status(200).json({
    status: "OK",
    message: "Get detail Counselor Successfully",
    data: conselor,
   })
}

module.exports = {
    registConselor,
    getConselor,
    getConselorById
}

