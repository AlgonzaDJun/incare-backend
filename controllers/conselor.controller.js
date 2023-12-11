const Conselor = require("../models/Conselor");
const { badRequest, internalServer } = require("../utils/error");

// getAllConselor
const getConselor = async (req, res) => {
  try {
    const conselorsData = await Conselor.find().populate("user_id").exec();

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
  let { user_id, spesialisasi, deskripsi } = req.body;

  if (!user_id || !spesialisasi || !deskripsi) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  const newConselor = {
    user_id: user_id,
    spesialisasi: spesialisasi,
    deskripsi: deskripsi,
  };
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
    const conselor = await Conselor.findById(id).populate("user_id").exec();

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

  const { begin, end } = data;

  if (!begin || !end) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  try {
    const konselor = await Conselor.findOne({ user_id: id });
    if (!konselor) {
      return res.status(400).json({
        message: "undefined conselor",
      });
    }

    const newSchedule = { begin, end };
    console.log(newSchedule);
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

const deleteSchedule = async (req, res) => {
  const { userId, id } = req.params;
  if (!userId || !id) {
    return badRequest(res);
  }
  try {
    await Conselor.findOneAndUpdate(
      { user_id: userId },
      { $pull: { schedule: { _id: id } } }
    );

    return res.status(200).json({
      status: "OK",
      message: "Delete Schedule Successfully",
    });
  } catch (error) {
    return internalServer(res);
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
  updatePrice,
  deleteSchedule,
};
