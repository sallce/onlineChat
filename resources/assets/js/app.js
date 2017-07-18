
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));
Vue.component('chat-messages', require('./components/ChatMessages.vue'));
Vue.component('chat-form', require('./components/ChatForm.vue'));

const app = new Vue({
    el: '#app',

    data:{
        messages:[]
    },

    created(){
        //when the main component is created initialize messages
        this.fetchMessages();

        Echo.private('chat')
            .listen('MessageSent', (e) => {
                console.log('ok');
                this.messages.push({
                    message: e.message.message,
                    user: e.user
                });
            });

    },

    methods:{

        //get messages from server
        fetchMessages(){
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },

        //post messages to server
        addMessage(message) {
            this.messages.push(message);

            axios.post('/messages', message).then(response => {
                console.log(response.data);
            });
        }
    }


});
