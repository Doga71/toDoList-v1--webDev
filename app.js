const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

let items = ["buy food.", "cook food", "eat food"];
let workItems = [];

app.get("/",function(req,res){

  let today = new Date();

  let option = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
  let day = today.toLocaleDateString("en-US",option);
  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/",function(req,res){

  let item = req.body.newItem;

  console.log(req.body);

  if(req.body.button === "Work") { //req.body.list gives value of button in list.ejs
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work",function(req,res){
  res.render("list" ,{listTitle: "Work list" , newListItems: workItems});
});

// app.post("/work",function(req,res){                // no need.
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });

app.listen(3000,function(){
  console.log("server is running on port 3000");
})
