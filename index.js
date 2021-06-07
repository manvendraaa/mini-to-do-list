const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));
app.set('view engine' ,'ejs');

mongoose.connect('mongodb://localhost:27017/todolistDB',{useNewUrlParser : true});

const itemsSchema = {
    name: String
};
const Item = mongoose.model("Item", itemsSchema);

 
 const item1 = new Item({
    name: "Welcome to your todolist!"
 });
 const item2 = new Item({
    name: "Hit the + button to add items"
 });
 const item3 = new Item({
    name: "<-- hit this to delete the item"
 });
 const defaultarr = [item1,item2,item3];
 
app.get('/',(req,res) => {
    
    Item.find({},function(err,fountItems){
        if(fountItems.length == 0){
            Item.insertMany(defaultarr, (err) => {
            if(err)console.log(err);
            else{
                console.log("successfully added to db");
            }
        });
            res.redirect('/');
        }
        else{
            res.render('list', {
                title : "TODO LIST",
                tasks : fountItems
            })
        };
    }); 



});

app.post('/', (req,res) => {
    var itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });
    item.save();

    res.redirect('/');
});

app.post('/delete', function(req,res) {
    const deleteId = req.body.checkbox;
    Item.findByIdAndRemove(deleteId,function(err){
        if(err)console.log(err);
    })
    res.redirect('/');
})

app.listen(3000, (error) => {
    if(error)console.log(error);
    else{
        console.log("server is up and running!");
    }
})