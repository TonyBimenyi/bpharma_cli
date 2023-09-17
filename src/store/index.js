import { createStore } from 'vuex'

export default createStore({
  state: {
    user:null,
    url: "http://127.0.0.1/api/",
    medecine:{},
    requi:{},
    med_stock:[],
    stock:{},
    requisition:{},
    topRated:[
      {id:1,name:'cake',price:100,url:'cake',desc:'Verry Tasty',rate:4.1},
      {id:2,name:'banana',price:600,url:'banana',desc:'Verry Tasty',rate:0.1},
      {id:3,name:'fruit',price:300,url:'fruit',desc:'Verry Tasty',rate:2.1},
    ],
    cartItemCount:0,
    cartItems:[],
    carts:[],
    orders:[],
    perte:{},
    orders_d:[],
    medecines:[],
    ventes:[],
    ente_details:[],
  },
  getters: {
   
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
