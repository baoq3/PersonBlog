<template>
  <div>
        <div class="middleBottom">
          <shapeShifter :shapeShifterValue='shapeShifterName'/>
        </div>
        <el-row class="rowrank">
            <el-col :span="5" v-for="(item, index) in rankarr" :key="index" :offset="2" class="elcoll">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="item.img" class="image">
                    <div style="padding: 14px;">
                        <span>{{item.name}}</span>
                        <div class="bottom clearfix">
                        <time class="time">{{ item.currentDate }}</time>
                        <el-button type="text" class="button">{{item.btnname}}</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import shapeShifter from '@/components/shapeShifter'

export default {
  name: 'Works',
  data () {
    return {
      shapeShifterName: '忆事皆过往|人相两茫茫|风卷残云存|空手俩无银|' + this.$route.meta.title,
      rankarr: [{
        name: '好吃的汉堡',
        img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        currentDate: new Date(),
        btnname: '点击进入'
      }, {
        name: '好吃的汉堡',
        img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        currentDate: new Date(),
        btnname: '点击进入'
      }, {
        name: '好吃的汉堡',
        img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        currentDate: new Date(),
        btnname: '点击进入'
      }, {
        name: '好吃的汉堡',
        img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        currentDate: new Date(),
        btnname: '点击进入'
      }, {
        name: '好吃的汉堡',
        img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        currentDate: new Date(),
        btnname: '点击进入'
      }, {
        name: '好吃的汉堡',
        img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        currentDate: new Date(),
        btnname: '点击进入'
      }, {
        name: '好吃的汉堡',
        img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        currentDate: new Date(),
        btnname: '点击进入'
      }, {
        name: '好吃的汉堡',
        img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        currentDate: new Date(),
        btnname: '点击进入'
      }],
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
    shapeShifter
  }
}
</script>

<style scoped lang='less'>

.middleBottom{
  width: 100%;
  height: 35rem;
  position: relative;
  .content{
    color: white;
    font-size: 20px;
    font-weight: bold;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    position: absolute;
    top: 50%;
    left: 50%;
    padding-top: -50%;
    padding-left: -50%;
  }
}

.time {
font-size: 13px;
color: #999;
}

.bottom {
margin-top: 13px;
line-height: 12px;
}

.button {
padding: 0;
float: right;
margin-top: 12px;
}

.image {
width: 100%;
display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.rowrank {
    width: 76rem;
    margin: 10px auto;
    margin-bottom: 40px;
    .elcoll{
        padding: 6px;
    }
}

</style>
