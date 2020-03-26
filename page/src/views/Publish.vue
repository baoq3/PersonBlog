<template>
  <div class="publishCon">
    <mavon-editor
            v-model="content"
            ref="md"
            @change="change"
            @imgAdd="imgAdd"
            @imgDel="imgDel"
            style="min-height: 600px"
            class="mavonEditors"
        />
        <button @click="submit" class="submore">提交</button>
  </div>
</template>

<script>
// const marked = require('marked')
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'Publish',
  components: {
    mavonEditor
  },

  data () {
    return {
      content: '', // 输入的markdown
      html: '' // 及时转的html
    }
  },

  methods: {

    imgDel (pos) {
      console.log(pos)
    },
    // 将图片上传到服务器，返回地址替换到md中
    imgAdd (pos, $file) {
      const formdata = new FormData()
      this.$upload.post('/上传接口地址', formdata).then(res => {
        console.log(res.data)
        this.$refs.md.$img2Url(pos, res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 所有操作都会被解析重新渲染
    change (value, render) {
    // render 为 markdown 解析后的结果[html]
      this.html = render
    },
    // 提交
    submit () {
      console.log(this.content)
      console.log(this.html)
    }
  }
}
</script>

<style scoped lang='less'>
.publishCon{
  width: 90%;
  height: 50rem;
  margin: 10px auto;
  background: #ccc;
}
.mavonEditors{
  width: 100%;
  height: 100%;
}
.submore{
  margin-top: 25px;
  background: black;
  color: white;
  width: 85px;
  height: 34px;
  border-radius: 10px;
  margin-bottom: 35px;
}
</style>
