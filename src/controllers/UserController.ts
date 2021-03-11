import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {

    async create(request: Request , response: Response){
        
        const {name,email} = request.body;
       
        const usersRepository = getCustomRepository(UsersRepository);

        //SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        const usersAlreadyExists= await usersRepository.findOne({
            email
        });

        if(usersAlreadyExists) {
            return response.status(400).json({
                error: "Email já cadastrado"
            })
        }

        const user = usersRepository.create({
            name, email,
        });



        await usersRepository.save(user);
        return response.json(user);



    }
}

export { UserController };
