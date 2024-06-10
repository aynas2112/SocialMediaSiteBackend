import {UserService} from "../../services/user.js";


const queries = {
    getUserToken: async (_, payload) => {
    const res = await UserService.getUserToken(payload);
    return res;
  },
  getUser: async(_,payload)=>{
    const res = await UserService.getUser(payload);
    return res;
  },
  getProfile: async(_,payload)=>{
    const res = await UserService.getProfile(payload);
    return {
      ...res,
      fname: res.f_name,
    };
  }

};


const mutations = {
  createUser: async (_, payload) => {
    const res = await UserService.createUser(payload);
    console.log(res);
    return res.id;
  },
};
export const resolvers = { queries, mutations };
 