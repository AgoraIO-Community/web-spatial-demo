<template>
  <div class="mainPrivacy">
    <Nav :lang='value' />
    <div class='main'>
      <p class="title">{{$t('login.privacyTitle')}}</p>
      <p v-html="$t('login.privacyText')"></p>
    </div>
  </div>
</template>
<script>
import Nav from'../components/nav.vue'

export default {
  components:{
    Nav,
  },
  data(){
    return{
      value:'',
    }
  },
  created(){
    this.value= this.$route.query.lang
  }
}
</script>
<style lang="scss" scoped>
.mainPrivacy{
  background: rgba(222, 232, 239, 1);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .main{
    .title{
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 20px;
    }
    width: 1180px;
    // height: calc(100vh - 200px);
    height: 100%;
    background: #FFFFFF;
    margin: 10px auto;
    padding:60px ;
  }
}
</style>>
  
