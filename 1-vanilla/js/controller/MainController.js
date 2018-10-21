import FormView from '../views/FormView.js'

const tag ='[MainController]'

export default {
    init(){
        console.log(tag, 'init()')
        //체이닝을 이용해서 on이라는 함수를 바로 실행하려면 setup 함수에서
        //return this를 해줘야한다.
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
    },

    onSubmit(input){
        console.log(tag,'onSubmit()', input)
    }
}