import { ChatsService } from "../../services/chats.js";


const queries = {
    getChats: async (_) => {
    const res = await ChatsService.getChats();
    return res;
  },
};


const mutations = {
  createChat: async (_, payload) => {
    const res = await ChatsService.createChat(payload);
    console.log(res);
    return res.id;
  },
};
export const resolvers = { queries, mutations };
 