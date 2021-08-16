const express = require('express')
const router = express.Router()
const { adminReg, login } = require('../controllers/admin');
const { anggotas, anggota, regist, deleteAnggota } = require('../controllers/anggota');
const auth = require('../middlewares/auth')

router.post('/admin/register', adminReg)
router.post('/admin/login', login)

router.get('/admin/data-anggotas', anggotas)
router.get('/admin/data-anggota/:id', anggota)
router.post('/admin/regist-anggota', regist)
router.delete('/admin/delete/:id', auth, deleteAnggota)

module.exports = router