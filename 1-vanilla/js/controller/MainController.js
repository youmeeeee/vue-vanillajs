import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'

import SearchModel from '../models/SearchModel.js'
import HistoryModel from '../models/HistoryModel.js'
import KeywordModel from '../models/KeywordModel.js'

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

        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName))


        this.selectedTab = '추천검색어'
        this.renderView()

    },

    renderView(){
        console.log(tag, 'renderView()')
        TabView.setActiveTab(this.selectedTab)
        ResultView.hide()
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
        ResultView.hide();
    },


    onSearchResult(data){
        ResultView.render(data)
    },


    onChangeTab(tabName){
        debugger;
    }

}