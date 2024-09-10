import * as taskService from '../services/tasks.service.js';

export const getAllTasks = (req, res) => {
    const tasks = taskService.getAllTasks();
    res.json(tasks);
};

export const getTask = (req, res) => {
    const task = taskService.getTask(parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
};

export const createTask = (req, res) => {
    const task = taskService.createTask(req.body.title);
    res.status(201).json(task);
};

export const updateTask = (req, res) => {
    const task = taskService.updateTask(parseInt(req.params.id), req.body);
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
};

export const deleteTask = (req, res) => {
    const result = taskService.deleteTask(parseInt(req.params.id));
    if (!result) return res.status(404).send('Task not found');
    res.status(204).send();
};