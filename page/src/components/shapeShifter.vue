<template>
  <div class="canvasBloon">
    <canvas class="canvas"></canvas>
  </div>
</template>

<script>
import S from '@/plugin/shape-shifter.js'

export default {
  name: 'shapeShifter',
  data () {
    return {
    }
  },
  props: {
    shapeShifterValue: {
      type: String,
      default: () => {}
    }
  },
  mounted () {
    S.init('.canvas', '.canvasBloon', this.shapeShifterValue)
  },
  methods: {
  }
}
</script>

<style scoped lang='less'>
.canvasBloon {
    height:100%;
    width: 100%;
    font-family: Avenir, "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color: #171717;
    color: #666;
    font-size: 16px;
    line-height: 1.5em;
    .canvas{
        width: 100%;
        height: 100%
    }
}
</style>
