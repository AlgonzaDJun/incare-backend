const Conselor = require("../models/conselor");

// // example of conselor data
// const conselors = [{
//     id: 1,
//     fullname: "Mark Lee",
//     spesialisasi: "Mental Health",
//     rating: 4.9,
//     image_url: "./photo.jpg",
//     jadwal: [{ "hari": "", "tanggal": "" }],
// },
// ];

const getConselor = async (req, res) => {
    // const conselorsData = await Conselor.map(({ jadwal, ...rest }) => rest);
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
    const newConselor = ({ user_id, spesialisasi, jadwal: new Date });
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

