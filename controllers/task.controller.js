const Task = require('../models/task.model.js');

async function createTask(req, res){

    const task = new Task()
    const params = req.body;

    task.title = params.title;
    task.description = params.description;

    try {
         
        const taskStore = await task.save();

        if(!taskStore){
            res.status(400).send({message: "Task has not been created"})
        } else {
            res.status(200).send({task:  taskStore})
        } 

    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

async function getTask(req, res){
    try {
        const tasks = await Task.find()

        if(!tasks){
            res.status(400).send({message: "Tasks not found"});
        }else{
            res.status(200).send({tasks})
        }


    } catch (error) {
        res.status(500).send(error)
    }
}

async function getTaskById(req, res){
    try {
        const idTask = req.params.id;
        const task = await Task.findById(idTask);

        if(!idTask){
            res.status(400).send({message: "Tasks not found"});
        }else{
            res.status(200).send({task})
        }

    } catch {
        res.status(500).send(error)
    }
}

async function updateTask(req, res){
    const idTask = req.params.id;
    const params = req.body;

    console.log("idTask: " + idTask)
    console.log("params: " + JSON.stringify(params))

    try {
        
        const task = await Task.findByIdAndUpdate(idTask, params);
        
        if(!task){
            res.status(400).send({message: "Task has not been updated"});
        } else {
            res.status(200).send({message: "Task has been updated"})
        }



    } catch (error) {
        res.status(500).send(error);
    }

}

async function deleteTask(req, res){

    const idTask = req.params.id;

    try {

    const task = await Task.findByIdAndDelete(idTask);

    if(!task){
        res.status(400).send({message: "Task has not been deleted"});
    } else {
        res.status(200).send({message: "Task has been deleted"})
    }

    } catch (error){
        res.status(500).send(error);
    }
}

module.exports = {
    createTask,
    getTask,
    getTaskById,
    updateTask,
    deleteTask
};