<template>
  <div class="home">
    <div class="middleBottom">
      <div class="bannerCover"></div>
      <div class="itypedConnect">
        <span id="ityped">{{itypedName}}</span>
        <span class="ityped-cursor">|</span>
      </div>
    </div>
    <div class="listContent">
      <listItem  v-for="(ele, i) in arrInfo" :key="i"  :listItemContent='ele'/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import listItem from '@/components/listItem'
import { setTimeout } from 'timers'
export default {
  name: 'Home',
  data () {
    return {
      itypedName: 'name',
      arrInfo: [
        {
          tagArr: ['html', 'css'],
          title: '【干货】设计师如何零代码创建自己的作品集小程序',
          smalltitle: '友情提示，由于下面内容包含很多外部链接，因为个人小程序是不支持直接跳转链接的，大家可以复制此文链接到',
          datetime: '2018年5月3日',
          srcimg: 'https://ycp.limiabc.com/wp-content/uploads/2018/10/pexels-photo-1115692-300x199.jpg'
        },
        {
          tagArr: ['html', 'css'],
          title: '【干货】设计师如何零代码创建自己的作品集小程序',
          smalltitle: '友情提示，由于下面内容包含很多外部链接，因为个人小程序是不支持直接跳转链接的，大家可以复制此文链接到',
          datetime: '2018年5月3日',
          srcimg: 'https://ycp.limiabc.com/wp-content/uploads/2018/10/pexels-photo-1115692-300x199.jpg'
        },
        {
          tagArr: ['html', 'css'],
          title: '【干货】设计师如何零代码创建自己的作品集小程序',
          smalltitle: '友情提示，由于下面内容包含很多外部链接，因为个人小程序是不支持直接跳转链接的，大家可以复制此文链接到',
          datetime: '2018年5月3日',
          srcimg: 'https://ycp.limiabc.com/wp-content/uploads/2018/10/pexels-photo-1115692-300x199.jpg'
        }
      ]
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
    computeItyped (itypeName) {
      var i = 0
      var show = true
      setInterval(() => {
        if (show) {
          if (i < itypeName.length) {
            this.itypedName = itypeName.slice(0, i++)
            // console.log(itypeName + '---')
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
    }
  }
}
</script>

<style scoped lang="less">

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
.listContent{
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  padding-bottom: 5rem;
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
