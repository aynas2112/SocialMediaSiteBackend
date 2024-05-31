import {UserService} from "../../services/user.js";


const queries = {
    getUserToken: async (_, payload) => {
    const res = await UserService.getUserToken(payload);
    return res;
  },
};


const mutations = {
  createUser: async (_, payload) => {
    const res = await UserService.createUser(payload);
    console.log(res);
    return res.id;
  },
};
export const resolvers = { queries, mutations };
 