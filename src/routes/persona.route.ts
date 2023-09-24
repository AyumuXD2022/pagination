import { Response, Router,Request } from "express";
import { PersonaController } from "../controllers/persona.controller";
import IPersona from "../interfaces/persona.intertace";

const personaService = new PersonaController();

const personaRoutes = Router();

personaRoutes.get('/get/personas', async (req:Request, res:Response) => {
    try {
        const { page = 1, limit = 0 } = req.query;
        const response = await personaService.getMet(page as number,limit as number);
        return res.status( response.code ).json( response );
    } catch (err:any) {
        return res.status( err.code ? err.code: 500).json(err)
    }
})
personaRoutes.post('/create/persona', async (req:Request, res:Response) => {
    try {
        const persona:IPersona = req.body;
        const response = await personaService.create(persona)
        return res.status( response.code ).json( response );
    } catch (err:any) {
        return res.status( err.code ? err.code: 500).json(err)
    }
})
export default personaRoutes;