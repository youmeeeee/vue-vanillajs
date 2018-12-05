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
    this.on('submit', e => e.preventDefault())
    //inputEl의 keyup이벤트를 받아서 다시 onkeyup 함수에 넘겨준다.
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
    this.resetEl.addEventListener('click', e => this.onClickReset(e))

}

FormView.onClickReset = function(e){
    this.emit('@reset')
    //x버튼을 다시 감추는 것도 잊지말기!
    this.showResetBtn(false)
}

FormView.onKeyup = function(e){
    //inputEl 엘리먼트의 value의 length가 0이 아닐때만 true를 showResetBtn에게 넘겨준다.
    this.showResetBtn(this.inputEl.value.length)

    if(!this.inputEl.value.length) this.emit('@reset')

    //만약 이벤트의 키가 엔터가 아니라면 그대로 리턴
    if(e.key !== "Enter") return

    //엔터라면 검색 결과가 보여야 하는데 이것은 FormView 모듈에서 해야할 일은 아니다.
    //FormView는 키가 Enter키일때 이것을 MainContoller에게 알려기만 하고
    //MainController는 다른 View에게 검색 결과를 보여주도록 요청하면 된다.

    //그때 사용하는 것이 View 모듈에 있는 emit 메소드 이다. (이벤트 발생)

    //첫번째 파라미터로는 사용자 정의 submit이벤트, 두번째 파라미터로는 입력 폼의 value를 넘겨준다
    this.emit('@submit', {input: this.inputEl.value})
}

FormView.setValue = function (value = '') {
    this.inputEl.value = value
    this.showResetBtn(this.inputEl.value.length)
}

export default FormView
