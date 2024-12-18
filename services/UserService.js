
import {User,Role,Receta} from "../models/index.js"


class UserService{

    getAllUsersService = async () => {
        try {
            const users = await User.findAll({
                include: [
                    {
                        model: Role,
                        attributes: ['name'],
                    },
                ],
            });
            return users;
        } catch (e) {
            throw e;
        }
    }

    getUserByIdService = async (id,options) => {
        try {
            const user = await User.findByPk(id,options);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return user;
        } catch (e) {
            throw e;
        }
    }

   createUserService= async (name,mail,password,RoleId)=>{
        try{
            const user = await User.create({name,mail,password,RoleId})
            return user;
        }catch (e) {
            console.error("Error al crear :", e.message);
         throw e;
        }

    }

    updateUserService = async (id, updatedData) => {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }


            await user.update(updatedData);
            return user;
        } catch (e) {
            throw e;
        }
    }

    deleteUserService = async (id) => {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            await user.destroy();
            return { message: 'Usuario eliminado' };
        } catch (e) {
            throw e;
        }
    }
    loginUserService = async (user) => {
        try {
            const {mail,password} = user;
            const data = await User.findOne({where: {mail} });
            if (!data) {
                throw new Error('No se encontro al user');
            }
            const comparePass = await data.comparePass(password);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


}

export default UserService