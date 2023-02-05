export class Parallax {
    constructor(container) {
        if(matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return
        }
        this.hoverable = !matchMedia('(hover: none)').matches
        this.orientable = false

        this.onPointermoveContainer = this.onPointermoveContainer.bind(this)
        this.onDeviceMove = this.onDeviceMove.bind(this)
        this.container = container
        this.bg = this.container.querySelector('[data-parallax-component="bg"]')
        this.containerBounding = this.container.getBoundingClientRect()

        this.moving = false

        this.pointerPositionNormalize = {
            x: 0,
            y: 0,
        }

        this.bindEvents()
    }

    bindEvents() {
        if(this.hoverable) {
            this.deltaDisplacement = 30; //pixels
            this.container.addEventListener('pointermove', this.onPointermoveContainer)
        } else {
            this.deltaDisplacement = 100; //pixels
            window.addEventListener('deviceorientation', this.onDeviceMove);
        }
        this.bg.style.setProperty('--scale-ratio', this.getScaleRatio())
    }

    onDeviceMove(ev) {
        if(!this.orientable) {
            this.orientable = true
        }
        const xNormal = Math.min(0.5, Math.max(-0.5, ((ev.gamma + 90) / 180) - 0.5))
        const yNormal = (ev.beta / 90) - 0.5
        this.pointerPosition = {
            x: xNormal,
            y: yNormal
        }

        if(!this.moving) {
            this.moving = true
            this.move()
        }

    }
    
    onPointermoveContainer(ev) {
        this.pointerPosition = {
            x: ev.clientX,
            y: ev.clientY
        }
        
        if(!this.moving) {
            this.moving = true
            this.move()
        }
    }
    
    getScaleRatio() {
        const targetWidth = this.bg.clientWidth + this.deltaDisplacement
        const targetHeight = this.bg.clientHeight + this.deltaDisplacement
        const ratioX = targetWidth / this.containerBounding.width
        const ratioY = targetHeight / this.containerBounding.height
        return Math.max(ratioX, ratioY).toString()
    }

    move() {
        let offsetPosition, targetPosition;
        if(!this.orientable) {
            targetPosition = {
                x: (this.pointerPosition.x / this.containerBounding.width) - 0.5,
                y: (this.pointerPosition.y / this.containerBounding.height) - 0.5
            }
            this.pointerPositionNormalize = {
                x: this.lerp(this.pointerPositionNormalize.x, targetPosition.x, 0.05),
                y: this.lerp(this.pointerPositionNormalize.y, targetPosition.y, 0.05)
            }

            offsetPosition = {
                x: this.pointerPositionNormalize.x * this.deltaDisplacement * -1,
                y: this.pointerPositionNormalize.y * this.deltaDisplacement * -1,
            }
        } else {
            this.pointerPositionNormalize = targetPosition = {
                x: this.pointerPosition.x * this.deltaDisplacement,
                y: this.pointerPosition.y * this.deltaDisplacement
            }
            offsetPosition = {
                x: targetPosition.x,
                y: targetPosition.y,
            }
        }

        this.bg.style.setProperty('--offset-x', `${offsetPosition.x}px`)
        this.bg.style.setProperty('--offset-y', `${offsetPosition.y}px`)

        if(targetPosition.x.toPrecision(4) === this.pointerPositionNormalize.x.toPrecision(4)) {
            this.moving = false
        } else {
            requestAnimationFrame(this.move.bind(this))
        }
    }

    lerp(start, end, t){
        return start + (end-start) * t
    }
}