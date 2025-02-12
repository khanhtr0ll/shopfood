var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
const crubItem = require('../controllers/crubItem')




mongoose.connect("mongodb+srv://danghakhanh:zsR2nPCeteB3cAv5@khanh.g1h5q.mongodb.net/")



// router.get('/add',(req,res)=>{
//   res.render("taikhoan")
// })

// router.get('/testcontract',(req,res)=>{
//   res.render('index')
// })
router.use(express.json()); // Middleware để parse dữ liệu JSON từ request
// router.get('/daugia',(req,res)=>{
//   res.render("daugia")
// })


router.get('/quanly/:id',crubItem.loadManBuy);
router.get('/item/:id',crubItem.loadItemOne)
router.get('/daugia/:id',crubItem.loadItemAuc)
router.get('/loaditem',crubItem.loadItem);
router.post('/RaGia',crubItem.RaGia)
router.post('/add-item',crubItem.addItem)
router.post('/buy-item',crubItem.buyItem)
router.post('/buy-item1',crubItem.buyItem1)
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });
// router.get("/item",(req,res)=>{
//   res.render('form-add')
// })
// router.post('/check',(req,res,next)=>{
//   console.log(req.body.stt)
//   res.redirect('/');
// })
module.exports = router;