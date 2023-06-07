var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/xihuan',function(req,res){
  connection.query('select * from goods_list where id>7',(err,results)=>{
    if(err) return err
    console.log(results);
    res.send({
    data:{
      results
    }
  })
  })
  
})
router.get('/Ad',function(req,res,next){
  res.send({
    code:0,
    data:{
      adlist: [
        {
          imgurl1: './images/Ad/1/6363865267776174518533530.jpg',
          imgurl2: './images/Ad/1/6363865267901177738248745.jpg',
          imgurl3: './images/Ad/1/6363865267810550722104757.jpg',
          imgurl4: './images/Ad/1/0094413_0.jpeg',
          imgurl5: './images/Ad/1/6363865267860551279190844.jpg',
          imgurl6: './images/Ad/1/6363865267907426689033592.jpg',
          imgurl7: './images/Ad/1/6363865267887113255206469.jpg',
          LiList: [
            {
              liimg: './images/Ad/1/0111420_0.jpeg',
              name: '金骏眉-御品豪茗礼盒 250g',
              prod: '滋味醇香 彰显情意',
              price: '128',
            },
            {
              liimg: './images/Ad/1/0111555_0.jpeg',
              name: '金骏眉-如意小罐装180g',
              prod: '经典小罐 罐罐尊享',
              price: '158',
            },
            {
              liimg: './images/Ad/1/0116611_0.jpeg',
              name: '金骏眉-特级黄芽单罐200g',
              prod: '名茶易得 佳茗难寻',
              price: '188',
            },
            {
              liimg: './images/Ad/1/0013505_0.jpeg',
              name: '金骏眉-以茶为礼 200g',
              prod: '复古镂空 古典雅致',
              price: '188',
            },
            {
              liimg: './images/Ad/1/0111976_0.jpeg',
              name: '金骏眉-茶师王建波果蜜香100g',
              prod: '茶师亲制 匠心好茶',
              price: '258',
            },
            {
              liimg: './images/Ad/1/0111555_0.jpeg',
              name: '金骏眉-如意小罐装180g',
              prod: '经典小罐 罐罐尊享',
              price: '158',
            },
          ],
          imgurl8: './images/Ad/1/6363865267952740123105586.jpg',
          imgurl9: './images/Ad/1/6363865086166755659611208.jpg',
          imgurl10: './images/Ad/1/6363865267974615694107120.jpg',
          imgurl11: './images/Ad/1/6363865267923050914548451.jpg',
          imgurl12: './images/Ad/1/6363865267938676649063310.jpg',
        },
      ],
    }
  })
})
router.get('/goodlist',function(req,res,next){
  console.log(req.query.orderby);
  if(req.query.orderby == undefined){
    let searchName = req.query.searchName
    connection.query('select * from goods_list where name like "%'+searchName+'%" ',function(err,results){
      if(err) return err
      res.send({
        code:0,
        data:results
      })
    })
  }else{
    let searchName = req.query.searchName
    let name = Object.keys(req.query.orderby)[0]
    let orderby = Object.values(req.query.orderby)[0]
    // console.log(name,orderby,searchName);
    connection.query('select * from goods_list where name like "%'+searchName+'%" order by '+name+' '+orderby+'',function(err,results){
      if(err) return err
      res.send({
        code:0,
        data:results
      })
    })
  }
  
})
router.get('/getdetail',function(req,res){
  console.log(req.query.id);
  let id = parseInt(req.query.id)
  
  connection.query('select * from goods_list where id = '+id+' ',function(err,results){
    if(err) return err
    let data = results
    res.send({
      data:data
    })
  })
})
router.post('/login',function(req,res){
  console.log(req.body);
  let phone = parseInt(req.body.phone)
  let password = req.body.password
  if(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)){
    connection.query('select * from user where tel = '+phone+' ',function(err,results){
        if(err) return err
        function deepClone2(obj){
          return JSON.parse(JSON.stringify(obj))
        }
        let user = deepClone2(results)
        // results.forEach(function(item, index) {
        //   user.push(item);
        // });
        user[0].password = ''
        user[0].login = true
        console.log(user[0]);
        console.log(results[0]);
        if(results != ''){
          if(password == results[0].password){
            res.send({
              state:0,
              message:'登录成功',
              data:user
            })
          }else{
            res.send({
              state:1,
              message:'用户名或密码错误',
            })
          }
        }
        return
      })
  }else{
    res.send({
      state:1,
      message:'用户名或密码错误',
    })
  }
  
})
router.post('/code',function(req,res){
  console.log(req.body);
  let phone = req.body.phone
  res.send({
    phone: phone
  })
})
router.post('/address',function(req,res){
  
  let address = req.body
  console.log(req.body);
  address.name.toString()
  console.log(address.name);
  if(address.uid !=''){
    connection.query('insert into address (uid,name,tel,province,addressDetail,isDefault) values ('+address.uid+',"'+address.name+'","'+address.tel+'","'+address.province+'","'+address.addressDetail+'","'+address.isDefault+'")',(err,result)=>{
      if(err) return err;
      // console.log(result);
      res.send({
        phone: 'ss'
      })
    })
  }else{
    res.send({
      message: '你还没登录'
    })
  }
  return
})
router.get('/getaddress',(req,res)=>{
    console.log(req.query);
    let id = req.query.id
    connection.query('select * from address where uid = '+id+'',(err,result)=>{
      if(err) return err
      console.log(result);
      res.send({
        result
      })
    })
    
})
module.exports = router;
