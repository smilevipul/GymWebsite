const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 7000;

//EXPRSS SPECIFIC STUFF
app.use('/static',express.static('static')) //For Serving static files

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //set the templete engine as pug
app.use(express.urlencoded()); //taking taking he data of form into file
app.set('views', path.join(__dirname,'views')) //set the views directry

//ENDPOINTS
app.get('/',(req,res)=>{
    res.status(200).render('index.pug');
})

app.post('/', (req,res)=>{
    // console.log(req.body);
    name = req.body.name;
    age = req.body.age;
    gender = req.body.gender;
    address = req.body.address;
    more = req.body.more;
    let outPuttoWrite = `The name of the client is ${name} ,age ${age} years old,${gender}, residing at ${address} . More about him/her ${more}`
    fs.writeFileSync('output.txt',outPuttoWrite);
    const params = {'massege': 'Your form has been submitted successfully'};
    res.status(200).render('index.pug');
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

