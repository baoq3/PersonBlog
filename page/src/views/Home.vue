<template>
  <div class="home">
    <div class="head">
      <a class="topHeadA" href="" title="返回初始页面">
        <img class="topImg" alt="点击返回初始页面" src="../assets/logo.png">
      </a>
    </div>
    <div class="middle">
      <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="white"
      text-color="#000"
      active-text-color="#ffc107">
        <el-menu-item v-for="(elem,i) in dataTitle" :key= "i" v-bind:index="elem.id.toString()" class="elmenuItem">{{elem.title}}</el-menu-item>
      </el-menu>
    </div>
    <div class="middleBottom">
      <div class="bannerCover"></div>
      <div class="itypedConnect">
        <span id="ityped">{{itypedName}}</span>
        <span class="ityped-cursor">|</span>
      </div>
    </div>
    <div>
      <listItem />
    </div>
  </div>
</template>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.head {
  background-color: #171717;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .topHeadA {
    color: #337ab7;
    background-color: transparent;
    .topImg {
      max-width: 100%;
      border: 0;
      width: 142px;
      height: 42px;
    }
  }
}

.middle {
  padding-bottom: 1px;
  max-width: 100%;
  background-color: white;
  .el-menu-demo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .elmenuItem{
      width: 8rem;
      height: 52px;
    }
  }
}

.middleBottom{
  background-image:url('https://blog.limiabc.com/wp-content/uploads/2019/03/photo-1503858130426-4265d4ce54ac.jpeg');
  width: 100%;
  height: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .bannerCover{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background:#000;
    opacity: .55;
  }
  .itypedConnect{
    #ityped{
      font-size: 23px;
      color: white;
      position: relative;
    }
    .ityped-cursor{
      color:#ffc107;
      font-size: 34px;
      animation: caretFlash .3s cubic-bezier(0,.3,.8,1) 0s infinite alternate;
    }
  }
}

@keyframes caretFlash {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100%{
    opacity: 0;
  }
}

</style>

<script>
// @ is an alias to /src
import { setTimeout } from 'timers'
import listItem from '@/components/listItem'

export default {
  name: 'Home',
  data () {
    return {
      activeIndex: '1',
      itypedName: 'name',
      dataTitle: [
        { id: 1, title: '处理中心' },
        { id: 2, title: '作品中心' },
        { id: 3, title: '兴趣中心' },
        { id: 4, title: '热爱中心' }]
    }
  },
  components: {
    listItem
  },
  created () {
  },
  mounted () {
    this.computeItyped('花猫难画虎，人鬼谁人知，空白皆过往，人相俩无银')
  },
  methods: {

    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },

    computeItyped (itypeName) {
      var i = 0
      var show = true
      setInterval(() => {
        if (show) {
          if (i < itypeName.length) {
            this.itypedName = itypeName.slice(0, i++)
            console.log(itypeName + '---')
          } else {
            this.itypedName = itypeName
            setTimeout(() => {
              show = false
            }, 200)
          }
        } else {
          if (i > 0) {
            this.itypedName = itypeName.slice(0, i--)
          } else {
            this.itypedName = ''
            show = true
          }
        }
      }, 200)
      console.log(this.itypedName)
    }
  }
}
</script>
