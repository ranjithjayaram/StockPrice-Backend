var express = require("express");
var app = express();
var fs = require('fs');

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get("/companies", (req, res, next) => {
    res.json(
    [{'cid':'1','cmp':'TCS'},
    {'cid':'2','cmp':'HSBC'},
    {'cid':'3','cmp':'BPCL'},
    {'cid':'4','cmp':'Infosys'}]
    );
   });

app.get("/chartdetails", (req, res) => {
  var cid= req.query.cid;
  var from=req.query.from;
  var to=req.query.to;
  console.log(cid);
    fs.readFile('./assets/stockdetails.json', 'utf8', function (err, data) {
      if (err) throw err;
      var obj = JSON.parse(data);
      var newObj=obj.filter(el=>{
        if(el.cid == cid && new Date(el.date) >=new Date(from) && new Date(el.date) <= new Date(to) ){
          return obj;
        }
      })
      console.log(newObj);
      res.send(newObj);
    }); 
   });
  