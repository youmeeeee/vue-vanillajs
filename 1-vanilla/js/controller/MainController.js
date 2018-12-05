import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'

import SearchModel from '../models/SearchModel.js'

const tag ='[MainController]'

export default {
    init(){
        console.log(tag, 'init()')
        //체이닝을 이용해서 on이라는 함수를 바로 실행하려면 setup 함수에서
        //return this를 해줘야한다.
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm())


        ResultView.setup(document.querySelector('#search-result'))
    },


    search(query){
        console.log(tag, 'search()', query)
        SearchModel.list(query).then(data=>{
            this.onSearchResult(data)
        })

    },

    onSubmit(input){
        console.log(tag,'onSubmit()', input)
        this.search(input)
    },

    onResetForm(){
        console.log(tag, 'onResetForm()');
    },

    onSearchResult(data){
        ResultView.render(data)
    }
}