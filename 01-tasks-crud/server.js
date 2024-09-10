import express from 'express';
import taskRoutes from './routes/tasks.routes.js';

const app = express();
const port = 3000 ?? process.env.PORT;

app.use(express.json());
app.use('/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});