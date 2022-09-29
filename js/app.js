import {BounceString} from './bounceString.js'
import {Ball} from './ball.js'

class App {
    constructor() {
        //this.canvas에 dom에 생성한 canvas 엘리먼트를 할당
        this.canvas = document.createElement('canvas')
        //body의 자식 노드에 마지막 자식으로 위 this.canvas 갖다붙임
        document.body.appendChild(this.canvas)

        this.ctx = this.canvas.getContext('2d')

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1

        //프로퍼티 초깃값 세팅
        this.strings = []
        this.moveX = -5000
        this.moveY = -5000
        this.isDown = false

        //resize 발생 => 
        window.addEventListener('resize', this.resize.bind(this),false)
        this.resize()

        this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 6)

        //포인터 활성시
        document.addEventListener('pointerdown', this.onDown.bind(this), false)
        //마우스 포인터의 좌표 변경시
        document.addEventListener('pointermove', this.onMove.bind(this), false)
        //포인터가 더이상 활성되지 않았을 때
        document.addEventListener('pointerup', this.onUp.bind(this), false)

        window.requestAnimationFrame(this.animate.bind(this))
    }

    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight
        
        this.canvas.width = this.stageWidth * this.pixelRatio
        this.canvas.height = this.stageHeight * this.pixelRatio
        this.ctx.scale(this.pixelRatio, this.pixelRatio)

        const xGap = 0;
        const yGap = 30;
        const x1 = xGap;
        const x2 = this.stageWidth - xGap;
        const total = Math.floor((this.stageHeight - yGap) / yGap);


        for (let i = 0; i < total; i++) {
            this.strings[i] = new BounceString(
                {
                    x1: x1,
                    y1: i * yGap + yGap,
                    x2: x2,
                    y2: i * yGap + yGap
                },
                '#FF74B1'
            ) 
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

        if(this.strings.length > 0) {
            for (let i = 0; i < this.strings.length; i++) {
                this.strings[i].animate(this.ctx, this.ball.x, this.ball.y)
                // this.strings[i].animate(this.ctx, this.moveX, this.moveY)
            }
        }

        this.ball.animate(this.ctx, this.stageWidth, this.stageHeight)
    }

    onDown(e) {
        //isDown 프로퍼티의 값이 true로 바뀜
        this.isDown = true
        //this.moveX에 브라우저의 x좌표값 할당됨
        this.moveX = e.clientX
        //this.moveY에 브라우저의 Y좌표값 할당됨
        this.moveY = e.clientY
    }
    
    onMove(e) {
        if(this.isDown) {
            //this.moveX에 브라우저의 x좌표값 할당됨
            this.moveX = e.clientX
            //this.moveY에 브라우저의 Y좌표값 할당됨
            this.moveY = e.clientY                
        }
    }
    
    onUp(e) {
        // console.log(this.isDown)
        this.isDown = false
        this.moveX = -5000
        this.moveY = -5000
    }
}

window.onload = () => {
    new App()
}