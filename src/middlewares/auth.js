const { verifyToken } = require('../helpers/jwt');
const { Anggota } = require('../../models')

const authentication = (req, res, next) => {
  const header = req.headers.authorization

  if (!header) {
    res.status(401).send({
      status: 'Failed',
      message: 'Unauthorized'
    })
  }

  try {
    const token = header.replace('Bearer ', '')
    const verified = verifyToken(token)
    console.log(verified);

    Anggota.findByPk(verified.id)
      .authentication(data => {
        if (data) {
          req.userData = verified
          next()
        } else {
          res.status(404).send({
            status: 'Failed',
            message: 'User not Found'
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Error'
    })
  }
}

module.exports = authentication