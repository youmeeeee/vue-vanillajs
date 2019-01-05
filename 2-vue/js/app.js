import SearchModel from './models/searchModel.js';

new Vue({
    el: '#app',
    data: {
        query: '',
        searchResult:[],
        submitted: false
    },
    methods:{
        onSubmit(){
            this.search();
        },
        onReset(){
            this.resetForm();
        },
        onKeyup(){
            if(!this.query.length){
              this.resetForm()
            }
        },
        search(){
            SearchModel.list().then(data=>{
                this.submitted = true;
                this.searchResult = data;
            })
        },
        resetForm(){
            this.query = ''
            this.submitted = false;
            this.searchResult = [];
        }
    }
})