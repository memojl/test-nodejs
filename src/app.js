import express from 'express';
import { v4 } from "uuid";

const port = 3000;
const app = express();

app.use(express.json());

app.get('/ping', (req,res)=>{
    res.send('ping');
});

app.get('/tasks', (req,res)=>{
    res.json([]);
    //res.status(200).json(tasks);
});

app.post('/tasks', (req,res) => {
    const {title,description} = req.body;
    if (!title || !description) return res.sendStatus(400);

    res.json({
        title,
        description,
        id: v4()
    });
    /*const newTask = { ...req.body, id: v4() };
    tasks.push(newTask);
    res.status(200).json(newTask);*/
});

export {port,app};