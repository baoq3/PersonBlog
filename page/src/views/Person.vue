<template>
    <div>
        <div class="middleBottom">
          <Matrix/>
          <span class="content">{{spanContent}}</span>
        </div>
        <div class="listContent">
            <listItem  v-for="(ele, i) in arrInfo" :key="i"  :listItemContent='ele'/>
        </div>
    </div>
</template>

<script>
import Matrix from '@/components/Matrix'
import listItem from '@/components/listItem'

export default {
  name: 'Person',
  data () {
    return {
      spanContent: '',
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
    Matrix,
    listItem
  },
  created () {
  },
  mounted () {
    this.spanContent = '往事如镜，风雨同舟'
    // this.$route.meta.title
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.middleBottom{
  width: 100%;
  height: 20rem;
  position: relative;
  .content{
    color: white;
    font-size: 20px;
    font-weight: bold;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    position: absolute;
    top: 48%;
    left: 44%;
    padding-top: -50%;
    padding-left: -50%;
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

</style>
