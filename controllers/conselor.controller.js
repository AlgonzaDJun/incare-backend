const Conselor = require("../models/Conselor");
const jwt = require("jsonwebtoken")
const User = require("../models/user");

// getAllConselor
const getConselor = async (req, res) => {
  try {
    const conselorsData = await Conselor.find();

    res.status(200).json({
      status: "OK",
      message: "Get All Counselors Successfully",
      counselors: conselorsData,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Erro",
    });
  }
};

const registConselor = async (req, res) => {
  let {user_id, spesialisasi, deskripsi} = req.body


    if(!user_id || !spesialisasi || !deskripsi) {
        return res.status(400).json({
            message: "all fields are required"
        })
    }

    const newConselor = ({
      user_id: user_id, 
      spesialisasi: spesialisasi,
      deskripsi: deskripsi
    });
  try {
    await Conselor.create(newConselor);

    res.status(201).json({
      status: "OK",
      message: "Registering as a Counselor was successful",
      conselor: newConselor,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

const getConselorById = async (req, res) => {
  const { id } = req.params;
  try {
    const conselor = await Conselor.findById(id);

    if (!conselor) {
      return res.status(400).json({
        message: "undefined conselor",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Get detail Counselor Successfully",
      data: conselor,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};


const saveSchedule = async (req, res) => {
  let data = req.body;
  const { id } = req.params;

  const { day, time } = data;

  if (!day || !time) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  try {
    const konselor = await Conselor.findById(id);

    if (!konselor) {
      return res.status(400).json({
        message: "undefined conselor",
      });
    }

    const newSchedule = { day, time };

    konselor.schedule.push(newSchedule);

    await konselor.save();

    res.status(200).json({
      status: "OK",
      message: "Successfully Saved the Counselor's Schedule",
      konselor: konselor.schedule,
    });
  } catch (error) {
    res.status(500).json({
      status: "Terjadi Error",
      message: error.message,
    });
  }
};

const updateSchedule = async (req, res) => {
  const conselorId = req.params.id; //_id nya conselor
  const data = req.body;

  const { day, time, schedule_id } = data;

  // const editSchedule = await Conselor.findByIdAndUpdate(conselorId, data, {
  //   new: true,
  // });

  try {
    const schedule = await Conselor.findOne({
      _id: conselorId,
      "schedule._id": schedule_id,
    });

    const updateSchedule = await Conselor.findOneAndUpdate(
      {
        _id: conselorId,
        "schedule._id": schedule_id,
      },
      {
        $set: {
          "schedule.$.day": day,
          "schedule.$.time": time,
        },
      },
      {
        new: true,
      }
    );

    if (!schedule) {
      return res.status(400).json({
        message: "Schedule not found",
      });
    }

    res.json({
      message: "Schedule Updated",
      data: updateSchedule.schedule.filter((item) => item._id == schedule_id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update schedule",
      error: error.message,
    });
  }
};

const addPrice = async (req, res) => {
  const { price, conselor_id } = req.body;

  if (!price) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  try {
    const data = await Conselor.findByIdAndUpdate(
      conselor_id,
      {
        price: price,
      },
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(400).json({
        message: "undefined conselor",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Successfully Added Price",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "Terjadi Error",
      message: error.message,
    });
  }
};

const updatePrice = async (req, res) => {
  const { price, conselor_id } = req.body;

  if (!price) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  try {
    const data = await Conselor.findByIdAndUpdate(
      conselor_id,
      {
        price: price,
      },
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(400).json({
        message: "undefined conselor",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Successfully Updated Price",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "Terjadi Error",
      message: error.message,
    });
  }
};

module.exports = {
  registConselor,
  getConselor,
  getConselorById,
  saveSchedule,
  updateSchedule,
  addPrice,
  updatePrice
};
