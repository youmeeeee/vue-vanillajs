import View from './View.js'

//디버깅을 위한 태그
const tag = '[FormView]'

//Object.create 함수로 View객체를 복사
const FormView = Object.create(View)

//Html엘리먼트를 주입 받아서 내부적으로 속성으로 갖게하기
FormView.setup = function(el){
    //View.js의 init함수 호출
    this.init(el)
    this.inputEl = el.querySelector('[type=text]')
    this.resetEl = el.querySelector('[type=reset]')
    this.showResetBtn(false)
    //키보드 입력에 대한 이벤트 바인드
    this.bindEvent();
    return this
}

FormView.showResetBtn = function(show = true){
    this.resetEl.style.display = show ? 'block' : 'none'
}

FormView.bindEvent = function(){
    //inputEl의 keyup이벤트를 받아서 다시 onkeyup 함수에 넘겨준다.
    this.inputEl.addEventListener('keyup', e => this.onkeyup(e))
}

FormView.onkeyup = function(){
    //inputEl 엘리먼트의 value의 length가 0이 아닐때만 true를 showResetBtn에게 넘겨준다.
    this.showResetBtn(this.inputEl.value.length)
}

export default FormView