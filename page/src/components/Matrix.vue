<template>
  <div class="wraCon" ref="wrapCon">
      <canvas id="cvs" ref="canvased"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.startMatrix()
  },
  methods: {
    // 创建代码雨
    createCodeRain (cw, ch) {
      var codeRainArr = [] // 代码雨数组
      var cols = parseInt(cw / 14) // 代码雨列数
      var step = 16 // 步长，每一列内部数字之间的上下间隔
      for (var n = 0; n < cols; n++) {
        var col = []
        // 基础位置，为了列与列之间产生错位
        var basePos = parseInt(Math.random() * 300)
        // 随机速度 3~13之间
        var speed = parseInt(Math.random() * 10)
        // 每组的x轴位置随机产生
        var colx = parseInt(Math.random() * cw)
        for (var i = 0; i < parseInt(ch / step) / 2; i++) {
          var code = {
            x: colx,
            y: -(step * i) - basePos,
            speed: speed,
            text: parseInt(Math.random() * 10) % 2 === 0 ? 0 : 1 // 随机生成0或者1
            //    text : ["a","b","c","d","e","f","g","h","o","s","x"][parseInt(Math.random()*11)] //随机生成字母数组中的一个
          }
          col.push(code)
        }
        codeRainArr.push(col)
      }
      return codeRainArr
    },

    // 代码雨下起来
    codeRaining (cw, ch, codeRainArr) {
    // 把画布擦干净
      this.ctx.clearRect(0, 0, cw, ch)
      for (var n = 0; n < codeRainArr.length; n++) {
      // 取出列
        var col = codeRainArr[n]
        // 遍历列，画出该列的代码
        for (var i = 0; i < col.length; i++) {
          var code = col[i]
          if (code.y > ch) {
          // 如果超出下边界则重置到顶部
            code.y = 0
          } else {
          // 匀速降落
            code.y += code.speed
          }
          // 颜色也随机变化
          this.ctx.fillStyle = 'hsl(' + (parseInt(Math.random() * 359) + 1) + ',30%,' + (50 - i * 2) + '%)'
          // 把代码画出来
          this.ctx.fillText(code.text, code.x, code.y)
        }
      }
      requestAnimationFrame(this.startall)
    },

    startall () {
      this.codeRaining(this.cw, this.ch, this.codeRainArr)
    },

    startMatrix () {
      var cvs = this.$refs.canvased
      this.ctx = cvs.getContext('2d')
      this.cw = cvs.width = this.$refs.wrapCon.clientWidth
      this.ch = cvs.height = this.$refs.wrapCon.clientHeight
      // 动画绘制对象
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
      this.codeRainArr = [] // 代码雨数组
      this.ctx.font = ' 14px microsoft yahei ' // 声明字体，个人喜欢微软雅黑
      this.codeRainArr = this.createCodeRain(this.cw, this.ch)
      // 开始下雨吧 GO>>
      requestAnimationFrame(this.startall)
    }
  }
}
</script>

<style scoped lang='less'>
.wraCon{
    width: 100%;
    height: 20rem;
    background: #000;
    overflow: hidden;
    margin: 0;
    padding: 0;
}
</style>
