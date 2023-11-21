const Conselor = require("../models/conselor");

const conselors = [{
    id: 1,
    fullname: "Mark Lee",
    spesialisasi: "Mental Health",
    rating: 4.9,
    image_url: "./photo.jpg",
    jadwal: [{ "hari": "", "tanggal": "" }],
},

];
const getConselor = (req, res) => {
    const conselorsData = conselors.map(({ id, jadwal, ...rest }) => rest);
    
        res.status(200).json({
          status: "OK",
          message: "Get All Counselors Successfully",
          counselors: conselorsData,
        });  
 };

const registConselor = async (req, res) => {
    let data = req.body;

    const { user_id, spesialisasi } = data;

    if(!user_id || !spesialisasi) {
        return res.status(400).json({
            message: "all fields are required"
        })
    }
    const newConselor = { id: conselors.length + 1, user_id, spesialisasi };
    await Conselor.create(newConselor);
    conselors.push(newConselor);
 
    res.status(201).json({
        status: "OK",
        message: "Registering as a Counselor was successful",
        conselor: newConselor,
    })
  };

const getConselorById = async (req, res) => {
    const { id } = req.params;
    const conselor = conselors.find(conselors => conselors.id == parseInt(id));

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

