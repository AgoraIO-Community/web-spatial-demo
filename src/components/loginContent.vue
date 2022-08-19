<template>
  <div class="loginContent">
    <div class="content">
      <div class="mask"></div>
      <div class="dialoag"> 
        <div class="leftL">
          <el-form ref="form" :model="form" label-width="80px" label-position="top" class="form" :rules="rules">
            <el-form-item :label="$t('login.0stStep')" prop='appid'>
              <el-input v-model="form.appid" placeholder='APPID' maxlength="225"></el-input>
            </el-form-item>
            <p class="tip"><img src="../assets/alert.png" alt="">{{$t('login.0stStepToast')}}</p>
            <el-form-item :label="$t('login.1stStep')" prop='name' class="nickName">
              <el-input v-model="form.name" placeholder='name' disabled><i slot="suffix" class="change" @click="changeName"></i></el-input>
            </el-form-item>
            <el-form-item :label="$t('login.2stStep')" prop='chanel'>
              <el-input v-model="form.chanel" placeholder='chanel' maxlength="6"><i slot="suffix" class="change" @click="changeChanel"></i></el-input>
            </el-form-item>
            <div class="tip"><img src="../assets/alert.png" alt=""><p>{{$t('login.2stStepToast')}}</p></div>
            <el-form-item :label="$t('login.3stStep')">
              <p class="stp">{{$t('login.3stStepToast1')}}</p>
              <p class="stp">{{$t('login.3stStepToast2')}}</p>
            </el-form-item>
            <div style="text-align: center;">
              <el-button class="goButton" round @click="goChat">{{$t('login.GoButton')}}</el-button>
            </div>
          </el-form>
        </div>
        <div class="rightL">
          <div class='boxL'>
            <p v-html="$t('login.UserTitle')"></p>
          </div>
        </div>
      </div>
      <div class="privacy">
        <router-link target="_blank" :to="{path:'/privacy',query:{lang:$i18n.locale}}">{{$t('login.privacyTitle')}}</router-link>
        <span>{{$t('login.privacyButton')}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      form:{
        appid:process.env.VUE_APP_APP_ID,
        name:'',
        chanel:'',
      },
      nameList:['Dawn', 'Thera', 'Huao', 'Hale', 'Diana', 'Rose', 'Barbie', 'Claue', 'Colbrt', 'Nancy', 'Jodie', 'David', 'Vincent', 'Qearl', 'Hailey', 'Justin', 'Ben']
    }
  },
  mounted(){
    this.changeName()
    this.changeChanel()
  },
  computed:{
    rules(){
      return {
        appid:[
          {required: true, message: this.$t('login.message1'), trigger: 'blur'},
          {pattern: /^[A-Za-z0-9]+$/, message: this.$t('login.message6')}
        ],
        name:[
          {required: true, message: this.$t('login.message3'), trigger: 'blur'},
          {pattern: /^[A-Za-z]+$/, message: this.$t('login.message2')}
        ],
        chanel:[
          {required: true, message: this.$t('login.message4'), trigger: 'blur'},
          {pattern: /^\d{6}$/, message: this.$t('login.message5')}
        ]
      }
    },
  },
  methods: {
    goChat(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // localStorage.setItem('token','true');
          window.sessionStorage.setItem('token','sssss');
          this.$router.push({ 
            path: '/chatPage',
            query: { 
              chanel:this.form.chanel,
              name:this.form.name,
              appid:this.form.appid
            }
          })
        }
      })
    },
    changeName(){
      let i = this.randomNumber('17')
      this.form.name = this.nameList[i]
    },
    changeChanel(){
      this.form.chanel =this.randomNumber()+""+this.randomNumber()+""+this.randomNumber()+this.randomNumber()+""+this.randomNumber()+""+this.randomNumber();
    },
    randomNumber(val){
      let number = val?val:'10';
      let i = Math.floor(Math.random()*number);
      return i
    },
  },
}
</script>
<style lang="scss">
.loginContent{
  // width: 100%;
  padding: 20px 40px 0;
  height: calc(100vh - 80px);
  background: RGBA(166, 173, 179, .5);
  position: relative;
  overflow-y:scroll;
  position: relative;
  .mask{
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.25);
  }
  .content{
    background: url('http://accktvpic.oss-cn-beijing.aliyuncs.com/pic/meta/demo/WebSpatialAudioWebDemo/map.png') -1740px -580px no-repeat;
    background-size: 4500px 2920px; 
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 11;
    min-height: 800px;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    .privacy{
      position: absolute;
      bottom: 30px;
      left:0%;
      width: 100%;
      font-size: 14px;
      color: #000;
      font-weight: 100;
      z-index: 11;
      text-align: center;
      a{
        text-decoration: underline;
        margin-right: 10px;
        color: #000000;
      }
      a:link{color:#000000;}
      a:visited{color:#000000;}
      a:hover{color:#000000;}
      a:active{color:#000000;}
    }
    .dialoag{
      width: 1000px;
      height: 610px;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      backdrop-filter: blur(10px);
      z-index: 20;
      display: flex;
      overflow: hidden;
      .leftL{
        width: 50%;
        height: 100%;
        font-size: 16px;
        font-weight: 600;
        color: #000000;
        line-height: 22px;
        text-shadow: 0px 10px 60px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        .form{
          padding: 40px 40px 0px;
          .el-form-item__label{
            padding: 0;
            font-size: 16px;
            font-weight: 600;
            color: #000000;
          }
          .el-form-item__label:before {
            content: '';
          }
          .el-input{
            width: 300px;
            height: 40px;
          }
          .nickName{
            .el-input__inner{
              border: 1px solid rgba(0, 0, 0, 0.2);
            }
          }
          .el-input__inner{
            width: 300px;
            height: 40px;
            // box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.2);
            border-radius: 20px;
            border: 1px solid #000000;
            background: RGBA(232, 229, 219, 0.2);
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.7);
          }
          .el-input__suffix{
            right: 20px;
            top: 2px;
          }         
          .stp{
            margin: 0;
            font-size: 14px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.7);
            line-height: 22px;
            text-shadow: 0px 10px 60px rgba(0, 0, 0, 0.2);
          } 
          .change{
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url('../assets/dice@2x.png') 0 0 no-repeat;
            background-size: 100% 100%; 
            cursor: pointer;
          }
          .tip{
            font-size: 14px;
            font-weight: 400;
            color: rgba(0, 0, 0, .8);
            line-height: 20px;
            text-shadow: 0px 10px 60px rgba(0, 0, 0, 0.2);
            margin: 0px 0 10px;
            width: 360px;
            display: flex;
            align-items: center;
            img{
              width: 17px;
              height: 17px;
              vertical-align: -3px;
              margin-right: 10px;
            }
            p{
              margin: 0;
            }
          }
          .goButton{
            width: 160px;
            height: 40px;
            background: linear-gradient(270deg, #1169FF 0%, #1D9DFD 100%);
            box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.2);
            border-radius: 20px;
            font-size: 16px;
            font-weight: 600;
            color: #FFFFFF;
          }
        }
      }
      .rightL{
        width: 50%;
        font-size: 32px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 45px;
        text-shadow: 0px 10px 60px rgba(0, 0, 0, 0.2);
        background: url('../assets/back.png') 0 0 no-repeat;
        background-size: 100% 100%;
        p{
          margin: 0;
        }
        .boxL{
          margin: 40px;
        }
      }
    }
  }
}
</style>