new Vue({
    el: '#app',
    data: {
        query: ''
    },
    methods:{
        onSubmit(e){
            console.log(e);
        },
        onReset(){
            this.query = '';
        },
        onKeyup(){
            if(!this.query.length){
                this.onReset();
            }
        }
    }
})