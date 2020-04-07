import Vue from 'vue'
import Vuex from 'vuex'
const DataStorage = require('./DataStorage.js');


const message = new DataStorage({
    // We'll call our data file 'user-preferences'
    configName: 'message',
    defaults: {
        // 800x600 is the default size of our window
        message: "hello world"
    }
});

const json = new DataStorage({
    // We'll call our data file 'user-preferences'
    configName: 'Json',
    defaults: {
        header: [],
        json: []
    }
});




Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        message: "",
        loading: false,
        table: [],
        header:[]
    },

    mutations: {
        setMessage (state, payload) {
            message.set("message", payload)
        },
        setJson (state, payload) {
            json.set("json", payload)
            let header = []
            Object.keys(payload[1]).forEach(element => header.push({text: element, value:element}));
            json.set("header", header)
            state.table = payload
            state.header = header
        },
        setLoading(state, payload){
            state.loading = payload
        }
    },
    actions: {
    },
    modules: {
    },
    getters: {
        getMessage () {
            return message.get("message")
        },
        getJson(){
            return json.get("json")
        },
        getJsonHeader(){
            return json.get("header")
        },
        getLoading(state){
            return state.loading
        }
    }
})