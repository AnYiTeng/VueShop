<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中,请稍后'">
      <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
          <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categoryArray" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <Store></Store>
  </section>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper'
  import '../../../node_modules/swiper/dist/css/swiper.css'
  import Store from '../../components/Stores/Store'
  import {mapState} from 'vuex'
  import chunk from 'lodash/chunk'

  export default {
    async mounted () {
      // dispatch返回的结果是promise
      await this.$store.dispatch('getShops')
      await this.$store.dispatch('getCategorys')
      /* 
      创建swiper对象的时机  必须在列表页面显示之后
      */
      new Swiper ('.swiper-container', {
        loop: true, // 循环模式选项
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination', 
        }
      })
    },
    computed: {
      ...mapState(['address', 'categorys']),

      categoryArray () {
        return chunk(this.categorys, 8)
      }
    },
    components: {
      Store
    }, 
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.msite  
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  </style>
