import Particle from './particle'
window.particleText = class particleText {
  constructor(params = {
    container: null,
    width: 0,
    height: 0,
  }) {
    // 需要判断 container 是否为canvas 不是则添加
    if (params.container.tagName === 'CANVAS') {
      this.c = params.container
    } else {
      let c = document.createElement('canvas')
      params.container.appendChild(c)
      this.c = params.container.querySelector('canvas')
    }

    this.W = params.width
    this.H = params.height

    this.c.width = this.W
    this.c.height = this.H

    this.ctx = this.c.getContext('2d')
  }
  draw(text,params = {}){
    this.duration = params.duration || .4 // 周期
    this.radius = params.radius || 2 // 半径
    this.gridY = params.resolution || 6 // 分辨率
    this.gridX = params.resolution || 6 // 分辨率
    this.fontSize = params.fontSize || 150
    this.fontFamily = params.fontFamily || 'SF Pro SC'

    let word = this.getShapeData(text)
    let ctx = this.ctx
    let W = this.W
    let H = this.H
    ctx.clearRect(0, 0, W, H)
    function drawFrame() {
      window.requestAnimationFrame(drawFrame)
      ctx.clearRect(0, 0, W, H)
      for (var i = 0; i < word.length ;i++) {
        word[i].update()
      }
    }
    drawFrame()
  }
  getShapeData(text) {

    let size = this.fontSize
    let placement = [];

    let W = this.W
    let H = this.H

    const ctx = this.ctx
    ctx.clearRect(0, 0, W, H)
    ctx.textAlign = "center"
    ctx.font = `${size}px ${this.fontFamily}`
    ctx.fillText(text, W/2, H/2)

    var idata = ctx.getImageData(0, 0, W, H)
    var buffer32 = new Uint32Array(idata.data.buffer)

    for (var j = 0; j < H; j += this.gridY) {
      for (var i = 0; i < W; i += this.gridX) {
        if (buffer32[j * W + i]) {
          var particle = new Particle({
            ctx: this.ctx,
            x:i,
            y: j,
            radVal:this.radius,
            duration:this.duration
          })
          placement.push(particle)
        }
      }
    }
    ctx.clearRect(0, 0, W, H)
    return placement
  }
}
