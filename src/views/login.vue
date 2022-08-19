<template>
  <div class="login">
    <Nav />
    <LoginContent />
  </div>
</template>
<script>
import Nav from'../components/nav.vue'
import LoginContent from'../components/loginContent.vue'
export default {
  components:{
    Nav,
    LoginContent
  },
  data(){
    return{
      
    }
  },
  mounted(){
    console.log(this.$i18n.locale)
    // this.creatTrack()

  },
  methods: {
    // goChat(){
    //   this.$router.push('/chatPage')
    // }
    creatTrack(){
      // this.track.forEach(item=>{
      //   setTimeout(async () => {
      //     let track = await AgoraRTC.createBufferSourceAudioTrack({ source: item.source });
      //     window[item.npc] = track;
      //   })
      // }, 1000);
    }
  },
}
</script>
<style lang="scss" scoped>
.login{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}
</style>