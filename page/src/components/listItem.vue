<template>
    <div class="wrapper" >
        <img :src="listItemContent['srcimg']" class="src">
        <div class="intro">
            <h3>
                <a class="title">{{listItemContent['title']}}</a>
            </h3>
            <div class="smalltitle">{{listItemContent['smalltitle']}}</div>
        </div>
        <div class="smallwrapper">
            <i class="el-icon-time" />
            <span>{{listItemContent['datetime']}}</span>
            <el-tag class="tagEl" type="info" v-for="(ele, i) in listItemContent['tagArr']" :key="i">{{ele}}</el-tag>
        </div>
    </div>
</template>

<script>
export default {
  name: 'listItem',
  data () {
    return {
    }
  },
  props: {
    listItemContent: {
      type: Object,
      default: () => {}
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">

.wrapper:hover {
    box-shadow: 0 14px 10px -7px rgba(255, 193, 7, 0.2);
    border:#FFC107 1px solid;
    .src {
        object-fit: cover;
        border-radius: 4px;
        float: left;
        width: 120px;
        height: 120px;
        position: relative;
        top: -40px;
        overflow: hidden;
        background-color:#c3c3c3;
        transition: all 0.6s ease;
    }
}

.wrapper{
    width: 50rem;
    height: 10rem;
    background:#fff;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid rgba(239, 239, 239, 1);
    margin-top: 34px;

    .src{
        object-fit: cover;
        border-radius: 4px;
        float: left;
        width: 120px;
        height: 120px;
        position: relative;
        top: 0px;
        overflow: hidden;
        background-color:#c3c3c3;
        transition: all 0.6s ease;
    }

    .intro{
        font-size: 12px;
        line-height: 14px;
        word-break: break-all;
        color: #828a92;
        height: 5rem;

        h3{
            margin-top: 8px;
            font-weight: 300;
            font-size: 24px;
            line-height: 30px;
            color:#3d464d;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            a{
                color: #1f1f1f;
                background-color: transparent;
            }
        }

        .smalltitle{
            font-size: 14px;
            font-weight: 300;
            max-width:40rem;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            line-height: 2rem;
            padding-left: 20px;
        }
    }

    .smallwrapper{
        font-size: 12px;
        word-break: break-all;
        color:#828a92;
        line-height: 1.2;
        vertical-align: middle;
        display: flex;
        justify-content: left;
        align-items: center;
        margin-left: 11rem;
        .tagEl{
            margin-left: 12px;
        }
    }
}
</style>
