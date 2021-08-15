const { Anggota } = require('../../models');
const joi = require('joi');

// get all anggota
exports.anggotas = async (req, res) => {
  try {
    const anggota = await Anggota.findAll({
      attributes: {
        exclude: ['createdAt', 'updateAt']
      }
    })
    res.status(200).send({
      status: 'Success',
      message: 'Anggotas Successfully Get',
      data: {
        anggota
      }
    })
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Server not Found'
    })
  }
}

// get anggota
exports.anggota = async (req, res) => {
  try {
    const { id } = req.params
    const checkId = await Anggota.findOne({
      where: {
        id
      }
    })

    if (!checkId) {
      return res.status(404).send({
        status: 'Failed',
        message: `Anggota with id: ${id} not found`
      })
    }

    res.status(200).send({
      status: 'Success',
      message: `Anggota ${id} Successfully`,
      data: {
        checkId
      }
    })


  } catch (error) {
    res.send({
      status: 'Failed',
      message: 'Server Error'
    })
  }
}

// daftar anggota
exports.regist = async (req, res) => {
  try {
    const data = req.body
    const { nomor } = req.body
    const scheme = joi.object({
      nama: joi.string().min(5).required(),
      nomor: joi.string().min(6).required(), //<<===== ketentuan penulisan user untuk nomor anggota
      telepon: joi.string().min(10).pattern(/^[0-9]+$/).required(),
      pax: joi.number().allow(null, ''),
      alamat: joi.string().required(),
      message: joi.string().allow(null, ''),
      attend: joi.string().required()
    })

    const { error } = scheme.validate(data)

    if (error) {
      return res.status(400).json({
        status: 'Validation Failed',
        message: error.details[0].message
      })
    }
    const cekAnggota = await Anggota.findOne({
      where: {
        nomor
      }
    })

    if (cekAnggota) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Data already Registered'
      })
    }

    const dataAnggota = await Anggota.create(data)

    res.status(201).send({
      message: 'Success',
      data
    })

  } catch (error) {
    console.log(error)
    res.status({
      status: 'Failed',
      message: 'Server not Found'
    })
  }
}

// delete
exports.deleteAnggota = async (req, res) => {
  try {
    const { id } = req.params
    const cekAnggota = await Anggota.findOne({
      where: {
        id
      }
    })

    if (!cekAnggota) {
      res.status(404).send({
        status: 'Failed',
        messages: 'User not Found'
      })
    }

    await Anggota.destroy({
      where: {
        id
      }
    })

    res.status(200).send({
      status: 'Success',
      message: 'Anggota Successfully Deleted',
      data: {
        id
      }
    })

  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Server Error'
    })
  }
}