import { contacts } from "./data.js";

const {createApp} = Vue;

createApp({
    data(){
        return{
            contacts: contacts,
            activeContact: 1
        }
    },
    methods:{

    },
    computed:{
        activeContacts(){
            return this.contacts.find((el) => el.id === this.activeContact);
        }
    },
    mounted(){
        console.log(this.contacts);
    }
}).mount('#app');