import{prismaClient} from '../db.js';
import JWT from 'jsonwebtoken';
import {createHmac, randomBytes} from 'crypto';



class ChatsService {
    static createChat(payload) {
        console.log(payload);
        const { cname, createdAt } = payload;
        return prismaClient.chats.create({
            data: {
                cname,
                createdAt,
            }
        });
    }

    static getChats() {
        return prismaClient.chats.findMany();
    }
}

export {ChatsService};
