import express from 'express';
import personaRoutes from './routes/persona.route';
const app = express();

app.use("/api",personaRoutes)

export default app;