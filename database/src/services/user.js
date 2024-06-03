import{prismaClient} from '../db.js';
import JWT from 'jsonwebtoken';
import {createHmac, randomBytes} from 'crypto';



class UserService {
    static createUser(payload) {
        const { fname, lname, email, password } = payload;
        const salt = randomBytes(32).toString('hex');
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

        return prismaClient.User.create({
            data: {
                fname,
                lname,
                email,
                password: hashedPassword,
                salt
            }
        });
    }

    static getUser(payload){
        const {email} = payload;
        return prismaClient.user.findUnique({
            where:{
                email:email
            }
        });
    }

    static async getUserToken(payload) {
        const { email, password } = payload;
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const hashedPassword = createHmac('sha256', user.salt).update(password).digest('hex');
        if (user.password !== hashedPassword) {
            throw new Error('Incorrect password');
        }

        const token = JWT.sign({ userId: user.id, email: user.email }, '@k$h@T_k3y');
        return token;
    }
}

export {UserService};
