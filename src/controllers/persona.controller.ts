import IPersona from "../interfaces/persona.intertace";
import IResponse from "../interfaces/response.interface";
import PersonaMongo from '../models/persona.model';

export class PersonaController{
    public getMet(page: number, limit: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                
                const [data, totalItems] = await Promise.all([
                    PersonaMongo.find()
                        .limit(limit * 1)
                        .skip((page - 1) * limit)
                        .exec(),
                    PersonaMongo.countDocuments()
                ]);
    
                const totalPages = Math.ceil(totalItems / limit);
    
                return resolve({
                    ok: true,
                    message: "Persona",
                    response: {
                        data,
                        totalPages,
                        totalItems,
                        currentPage: page,
                        perPage: limit
                    } as any,
                    code: 200
                });
            } catch (error) {
                return reject({ ok: false, message: "No se ha encontrado usuario", response: null, code: 400 });
            }
        });
    }
    public create(persona:IPersona): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const personaMongo = new PersonaMongo(persona);
                personaMongo.save()
                return resolve({ ok: true, message: "Persona", response: persona as any, code: 200 })
            } catch (error) {
                return reject({ ok: false, message: "No se ha encontrado usuario", response: null, code: 400 })
            }
        })
    }
}