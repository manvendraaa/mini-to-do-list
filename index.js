const express = require('express');

const app = express();
app.use(express.urlencoded({extended: true}));
app.set('view engine' ,'ejs');
var tasks = ["eat", "sleep","repeat"];
app.get('/',(req,res) => {
    


    res.render('list', {
        title : "TODO LIST",
        tasks : tasks
    });
})

app.post('/', (req,res) => {
    var item = req.body.newItem;
    tasks.push(item);
    res.redirect('/');
})

app.listen(3000, (error) => {
    if(error)console.log(error);
    else{
        console.log("server is up and running!");
    }
})