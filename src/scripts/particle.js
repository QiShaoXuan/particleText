import utils from './utils'
export default class Particle {
  constructor(params = {
    ctx: null,
    x: 0,
    y: 0,
    radVal:2,
    duration:.4
  }) {
    this.radius = 1.1
    this.radVal = params.radVal
    this.futurRadius = utils.randomInt(this.radVal, this.radVal + 3) //[1.1,5.1]

    this.x = params.x
    this.y = params.y
    this.speed = .1 // 离散程度
    this.duration = params.duration

    this.dying = false

    this.base = [params.x, params.y]

    this.vx = 0
    this.vy = 0
    this.friction = .99
    this.gravity = 0 // 重力
    this.ctx = params.ctx

    let colors = [
      '#3a0088', '#930077', '#ff5722', '#ffbd39',
      '#f57170', '#00e0ff', '#10ddc2', '#15b7b9',
      '#a6fff2', '#74f9ff', '#f73859', '#fc5c9c'
    ]
    this.color = colors[Math.floor(Math.random() * colors.length)]

    this.setSpeed(utils.randomInt(.1, .5))
    this.setHeading(utils.randomInt(utils.degreesToRads(0), utils.degreesToRads(360)))
  }

  setSpeed (speed) {
    var heading = Math.atan2(this.vy, this.vx)
    this.vx = Math.cos(heading) * speed
    this.vy = Math.sin(heading) * speed
  }

  setHeading (heading) {
    var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
    this.vx = Math.cos(heading) * speed
    this.vy = Math.sin(heading) * speed
  }

  update (W,H) {
    this.x += this.vx
    this.y += this.vy
    this.vy += this.gravity

    this.vx *= this.friction
    this.vy *= this.friction

    if (this.radius < this.futurRadius && this.dying === false) {
      this.radius += this.duration
    } else {
      this.dying = true
    }
    if (this.dying === true) {
      this.radius -= this.duration
    }

    let ctx = this.ctx
    ctx.save()
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    if (this.y < 0 || this.radius < 1) {
      this.x = this.base[0]
      this.y = this.base[1]
      this.dying = false
      this.radius = 1.1
      this.setSpeed(this.speed)
      this.futurRadius = utils.randomInt(this.radVal, this.radVal + 3)
      this.setHeading(utils.randomInt(utils.degreesToRads(0), utils.degreesToRads(360)))
    }
  }
}
