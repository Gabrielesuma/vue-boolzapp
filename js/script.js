import { contacts } from "./data.js";

const {createApp} = Vue;
const dt = luxon.DateTime;

createApp({
    data(){
        return{
            contacts: contacts,
            activeContact: 1,
            messageText: '',
            searchText: ''
        }
    },
    methods:{
        changeContact(id){
            this.activeContact = id;
        },
        createMessage(msg, status){
            const newMessage = {
                date: dt.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
                message: msg,
                status: status
            }
            return newMessage;
        },
        sendMessage(){
            const newMessage = this.createMessage(this.messageText, 'sent');
            this.activeContacts.messages.push(newMessage);
            this.messageText = '';
            setTimeout(()=> {
                const newMessage = this.createMessage('ok', 'received');
                this.activeContacts.messages.push(newMessage);
            }, 1000);
        }
    },
    computed:{
        activeContacts(){
            return this.contacts.find((el) => el.id === this.activeContact);
        },
        filteredContacts(){
            return this.contacts.filter((el)=> el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    },
    mounted(){
        console.log(this.contacts);
    }
}).mount('#app');