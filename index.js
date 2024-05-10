

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const testModel = require('./testModel/testModel');

require('dotenv').config();

const app = express()
app.use(bodyParser.urlencoded({ extended : true}))
app.use(express.json({ extended : true}))
app.use(cors())

mongoose.connect("mongodb+srv://dandriyal:KCx75jDWR9OOaMo9@cluster0.ui3c2ad.mongodb.net").then(() => {
    console.log("db is connected");
}).catch(() => {
    console.log("db connection is faild");
})


const PORT = 4000;
app.listen(PORT, () => {
    console.log("server is start ", PORT);
})
app.get("/", async (req, res) => {
    res.send("hello")
}

app.get("/", async(req, res) => {
       res.send("this is my Home Page");
})        
        
app.get("/api/v1/clint", async(req, res) => {
    try {
        const clint = await testModel.find();
        res.status(201).json({ message : "ok", data : clint})
     } catch(err) {
         res.status(403).json({message : err})
     } 
})

app.post('/api/v1/create', async(req, res) => {

    const {name, lastName, email, contact, project } = req.body;
    const newTest = new testModel({
        fistName : name,
        lastName  : lastName,
        email : email,
        contact : contact,
        project : project
    })

    try {
            await newTest.save()
            res.status(201).json({ message : "ok "})
      
    } catch(err) {
        res.status(403).json({message : err})
    }
})

app.put('/api/v1/update/:id', async (req, res) => {
    const id = req.params.id;
    const { fistName, lastName, email, contact, project } = req.body;
    console.log(req.body);

    try {
        const updatedTest = await testModel.findByIdAndUpdate(
            id,
            {
                firstName:fistName,
                lastName: lastName,
                email: email,
                contact: contact,
                project: project
            },
            { new: true } 
        );

        if (!updatedTest) {
            return res.status(404).json({ message: "Resource not found" });
        }
        res.status(200).json({ message: "updated", data: updatedTest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.delete('/api/v1/delete/:id', async(req, res) => {

    const id = req.params.id
    console.log(id);
    try {
        const update = await testModel.findByIdAndDelete(id)
        res.status(200).json({ message : "deleted"})
    } catch(err) {
        res.status(403).json({message : err})
    }
})
