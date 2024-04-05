import { contacts } from "./data.js";

const {createApp} = Vue;
const dt = luxon.DateTime;

createApp({
    data(){
        return{
            contacts: contacts,
            activeContact: 1,
            messageText: '',
            searchText: '',
            activeMsgIndex: null
        }
    },
    methods:{
        changeContact(id){
            this.activeContact = id;
            this.activeMsgIndex = null;
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
        },
        removeMessage(i){
            this.activeContacts.messages.splice(i, 1);
            this.activeMsgIndex = null;
        },
        toogleDropdown(index){
            this.activeMsgIndex =  this.activeMsgIndex === index ? null : index
        },
        getContactIndex(id){
            const index = this.contacts.findIndex((el) => el.id === id);
            const msgLastIndex = this.contacts[index].messages.length - 1;
            if(msgLastIndex >= 0){
                return this.contacts[index].messages[msgLastIndex];
            } else {
                return '';
            }
        },
        getLastMessage(id){
            if(this.getContactIndex(id)){
                return this.getContactIndex(id).message;
            } else {
                return 'non ci sono messaggi';
            }
        },
        getLastDate(id){
            if(this.getContactIndex(id)){
                return this.getContactIndex(id).date;
            } else {
                return '';
            }
        }
    },
    computed:{
        activeContacts(){
            return this.contacts.find((el) => el.id === this.activeContact);
        },
        filteredContacts(){
            return this.contacts.filter((el)=> el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        },
        lastAccess(){
            const index = this.activeContacts.messages.length - 1;
            if(index >= 0){
                return this.activeContacts.messages[index].date;
            } else {
                return '';
            }
        }
    },
    mounted(){
        console.log(this.contacts);
    }
}).mount('#app');