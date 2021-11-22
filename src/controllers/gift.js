const { Gift } = require("../../models");
const exclude = ["createdAt", "updatedAt"];

// get all gifts
exports.gifts = async (req, res) => {
  try {
    const gifts = await Gift.findAll({
      attributes: {
        exclude: exclude,
      },
    });
    res.status(200).send({
      status: "Success",
      message: "Gift Successfully Get",
      data: {
        gifts,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

//get gift
exports.gift = async (req, res) => {
  try {
    const { id } = req.params;
    const checkId = await Gift.findOne({
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
        message: `Gift with id ${id} not Found`,
      });
    }

    res.status(200).send({
      status: "Success",
      message: `Gift ${id} Successfully`,
      data: {
        gift: checkId,
      },
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

// add gift
exports.addGift = async (req, res) => {
  try {
    const data = req.body;
    const { name } = req.body;

    const checkGift = await Gift.findOne({
      where: {
        name,
      },
    });

    if (checkGift) {
      res.status(400).send({
        status: "Failed",
        message: "Nama Anda sudah Terdaftar",
      });
    } else {
      const dataGift = await Gift.create(data);
      res.status(201).send({
        status: "Success",
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Internal Server erorr",
    });
  }
};

// delete gift
exports.deleteGift = async (req, res) => {
  try {
    const { id } = req.params;
    const checkGift = await Gift.findOne({
      where: {
        id,
      },
    });
    if (!checkGift) {
      res.status(404).send({
        status: "Failed",
        message: "Gift not Found",
      });
    }

    await Gift.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "Success",
      message: "Gift Successfully Deleted",
      data: {
        id,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};
