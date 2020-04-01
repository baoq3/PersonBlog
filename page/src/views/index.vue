<template>
  <div class="index">
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
      :router="true"
      active-text-color="#ffc107">
        <el-menu-item v-for="(elem,i) in dataTitle" :key= "i" :index="elem.id.toString()" class="elmenuItem">{{elem.title}}</el-menu-item>
      </el-menu>
      <div v-if="name" class="registerwrapper">
        <span class="span">欢迎您!</span>
        <span class="span">{{name}}</span>
        <span class="span">{{timeDate}}好</span>
      </div>
      <div v-else class="registerwrapper">
        <a class="btn" href="./Login">登录</a>
        <a class="register btn">注册</a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
      activeIndex: '/Home',
      dataTitle: [
        { id: '/Home', title: '首页' },
        { id: '/Works', title: '作品中心' },
        { id: '/Person', title: '个人中心' },
        { id: '/Publish', title: '发布中心' }
      ],
      name: this.$store.state.statePublish,
      timeDate: ''
    }
  },

  created (e) {

  },

  mounted () {
    this.activeIndex = this.$route.path ? this.$route.path : '/Home'
    this.judgeDataTitle()
    this.getDate()
  },

  methods: {

    judgeDataTitle () {
      if (this.$store.state.statePublish) {
        this.dataTitle = [{ id: '/Home', title: '首页' }, { id: '/Works', title: '作品中心' }, { id: '/Person', title: '个人中心' }, { id: '/Publish', title: '发布中心' }]
      } else {
        this.dataTitle = [{ id: '/Home', title: '首页' }, { id: '/Works', title: '作品中心' }, { id: '/Person', title: '个人中心' }]
      }
    },

    handleSelect (key, keyPath) {
    },

    getDate () {
      var date = new Date()
      var time = date.getHours()
      if (time < 12) {
        this.timeDate = '上午'
      } else if (time > 12 && time < 13) {
        this.timeDate = '中午'
      } else if (time > 13 && time < 19) {
        this.timeDate = '下午'
      } else {
        this.timeDate = '晚上'
      }
    }
  }
}
</script>

<style scoped lang='less'>

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
      width: 162px;
      height: 49px;
    }
  }
}

.middle {
  padding-bottom: 1px;
  max-width: 100%;
  background-color: white;
  position: relative;
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
  .registerwrapper{
    position: absolute;
    right: 84px;
    top: 20px;
    font-size: 15px;
    .register{
      margin-left: 25px;
    }
    .btn:hover{
      color: goldenrod;
    }
    .span{
      padding-left: 20px;
    }
  }
}
</style>
