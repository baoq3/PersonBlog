<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button type="warning" disabled>警告按钮</el-button>
    <a-button type="danger">Danger</a-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
