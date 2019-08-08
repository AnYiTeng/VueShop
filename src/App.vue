<template>
  <div id="app">
    <router-view></router-view>
    <slot></slot>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from 'components/FooterGuide/FooterGuide'
export default {
  mounted() {
    this.$store.dispatch('getAdress')
  },
  components: {
    FooterGuide
  }
}
</script>

<style>
</style>
