<template>
<div class="navTitle">
  <div class="nav">
    <img src="../assets/logo.png" alt="agora" class="logo">
    <el-select v-model="value" placeholder="请选择" class="lang" @change="selectLang">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
       </el-option>
    </el-select>
  </div>
  <div class="line"></div>
</div>
  
</template>
<script>
export default {
  name: "ChannelSelected",
  props:{
    lang:''
  },
  data() {
    return {
      value: "",
    };
  },
  computed:{
    options(){
      return [{
        value: 'zh',
        label: this.$t('login.chinese')
      },{
        value: 'en',
        label: this.$t('login.english')
      }, ]
    }
  },
  methods: {
    // 根据下拉框的中被选中的值切换语言
    selectLang(value){
      this.$i18n.locale = value
    }
  },
  created() {
    if(this.lang){
      this.value = this.lang;
      this.$i18n.locale = this.lang;
    }else{
      this.value= this.$i18n.locale+'';
    }
  }
};
</script>
<style lang="scss">
.navTitle{
  width: 100%;
  .nav {
    height: 60px;
    // width: 100%;
    background: #fff;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    .logo{
      width: 80px;
      height: 32px;
    }
    .lang{
      .el-input__inner{
        width: 160px;
        height: 40px;
        background: #FFFFFF;
        border-radius: 10px;
        border: 1px solid #B6B6B6;
      }
    }
  }
  .line{
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, #1169FF 0%, #1D9DFD 100%);
  }
}

</style>
