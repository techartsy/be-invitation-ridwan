const { Guest } = require("../../models");
const joi = require("joi");
const exclude = ["createdAt", "updatedAt"];

// get all anggota
exports.guests = async (req, res) => {
  try {
    const guest = await Guest.findAll({
      attributes: {
        exclude: exclude,
      },
    });
    res.status(200).send({
      status: "Success",
      message: "Guest Successfully Get",
      data: {
        guests: guest,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

// get anggota
exports.guest = async (req, res) => {
  try {
    const { id } = req.params;
    const checkId = await Guest.findOne({
      where: {
        id,
      },
      attributes: {
        exclude,
      },
    });

    if (!checkId) {
      return res.status(404).send({
        status: "Failed",
        message: `Guest with id: ${id} not found`,
      });
    }

    res.status(200).send({
      status: "Success",
      message: `Guest ${id} Successfully`,
      data: {
        guest: checkId,
      },
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

// daftar anggota
exports.regist = async (req, res) => {
  try {
    const data = req.body;
    const { name } = req.body;
    const scheme = joi.object({
      name: joi.string().min(3).required(),
      pax: joi.number().allow(null, ""),
      address: joi.string().required(),
      message: joi.string().allow(null, ""),
      attend: joi.string().required(),
    });

    const { error } = scheme.validate(data);

    if (error) {
      return res.status(400).json({
        status: "Validation Failed",
        message: error.details[0].message,
      });
    }
    const chekGuest = await Guest.findOne({
      where: {
        name,
      },
    });

    if (chekGuest) {
      return res.status(400).json({
        status: "Failed",
        message: "Nama sudah Terdaftar",
      });
    }

    const dataGuest = await Guest.create(data);

    res.status(201).send({
      message: "Success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

// delete
exports.deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const chekGuest = await Guest.findOne({
      where: {
        id,
      },
    });
    if (!chekGuest) {
      res.status(404).send({
        status: "Failed",
        messages: "Guest not Found",
      });
    } else {
      await Guest.destroy({
        where: {
          id,
        },
      });

      res.status(200).send({
        status: "Success",
        message: "Guest Successfully Deleted",
        data: {
          id,
        },
      });
    }

  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};
