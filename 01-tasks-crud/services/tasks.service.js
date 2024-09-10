let tasks = [
    { id: 1, title: 'Aprender Express', completed: false },
    { id: 2, title: 'Crear un CRUD', completed: false }
];

export const getAllTasks = () => {
    return tasks;
};

export const getTask = (id) => {
    return tasks.find(t => t.id === id);
};

export const createTask = (title) => {
    const task = {
        id: tasks.length + 1,
        title: title,
        completed: false
    };
    tasks.push(task);
    return task;
};

export const updateTask = (id, updateData) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;

    task.title = updateData.title || task.title;
    task.completed = updateData.completed || task.completed;

    return task;
};

export const deleteTask = (id) => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return false;

    tasks.splice(taskIndex, 1);
    return true;
};