<template>
    <div class="star" :class="'star-'+size">
        <span class="star-item" v-for="(c, index) in starClass" :key="index" :class="c"></span>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          score: Number,
          size: Number
      },
      computed: {
        // 5个星星类名组成的数组计算属性  
        starClass () {
            const arr = []
            const {score} = this
            const starAll = Math.floor(score)
            // n个on
            for (let i=0; i < starAll; i++) {
                arr.push('on')
            }
            // 1/0个half
            if(score*10 - starAll*10 > 5){
                arr.push('half')
            }
            // n个off
            while(arr.length<5){
                arr.push('off')
            }

            return arr
        }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'  
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
  .rating_section
    float left
    font-size 10px
    color #ff6000
    margin-left 4px
  .order_section
    float left
    font-size 10px
    color #666
    transform scale(.8)
.shop_rating_order_right
  float right
  font-size 0
  .delivery_style
    transform-origin 35px 0
    transform scale(.7)
    display inline-block
    font-size 12px
    padding 1px
    border-radius 2px
  .delivery_left
    color #fff
    margin-right -10px
    background-color #02a774
    border 1px solid #02a774
  .delivery_right
    color #02a774
    border 1px solid #02a774
             
</style>
