<template>
  <div class="dialog">
    <div class="content" v-if="visible" :style="{top:translatey1+'px',left:translatex1+'px'}">
      <p class="title">{{$t('login.PopupTitle')}} <i class="el-icon-close" @click="visible = false"></i></p>
      <el-form ref="form" :model="settingDataCopy" label-width="150px" class="form">
        <el-form-item :label="$t('login.npc:')">
          <span style="margin-left:25px">{{settingDataCopy.npc}}</span>
        </el-form-item>
        <el-form-item :label="$t('login.VoiceBlur')" >
          <el-tooltip class="item" effect="dark" :content="$t('login.VoiceBlurTip')" placement="right">
            <i class="question"></i>
          </el-tooltip>
          <el-radio-group v-model="settingDataCopy.voice">
            <el-radio  :label='true'>{{$t('login.on')}}</el-radio>
            <el-radio  :label='false'>{{$t('login.off')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('login.AirAbsorb')" >
          <el-tooltip class="item" effect="dark" :content="$t('login.AirAbsorbTip')" placement="right">
            <i class="question"></i>
          </el-tooltip>
          <el-radio-group v-model="settingDataCopy.absorb">
            <el-radio  :label='true'>{{$t('login.on')}}</el-radio>
            <el-radio  :label='false'>{{$t('login.off')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('login.Attenuationfactor')"  prop="factor" :id="settingDataCopy.npc">
          <el-tooltip class="item" effect="dark" :content="$t('login.AttenuationfactorTip')" placement="right">
            <i class="question"></i>
          </el-tooltip>
          <el-slider
            v-model="settingDataCopy.factor"
            :step="10"
            show-stops
            :marks="marks"
            :show-tooltip='true'	
            :format-tooltip="formatTooltip"
          >
          </el-slider>          
        </el-form-item>
        <el-form-item :label="$t('login.AINS')" v-if="settingDataCopy.ains" style="margin-top:10px">
          <el-tooltip class="item" effect="dark" :content="$t('login.AINSTip')" placement="right">
            <i class="question"></i>
          </el-tooltip>
          <el-radio-group v-model="settingDataCopy.ains">
            <el-radio-button class="ownRadio" label="high">{{$t('login.High')}}</el-radio-button>
            <el-radio-button class="ownRadio"  label="medium">{{$t('login.Medium')}}</el-radio-button>
            <el-radio-button class="ownRadio"  label='off'>{{$t('login.OFF')}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div class="buttonBox">
          <el-button type="primary" size="mini"  @click="comit">{{$t('login.Sava')}}</el-button>
          <el-button  type="text" size="mini" @click="visible = false">{{$t('login.Cancel')}}</el-button>
        </div>
      </el-form>
      
    </div>
    <div class="userSetting" @click="setting" >
      <!-- <img src="../assets/__1.gif" alt=""> -->
      <div :id="settingDataCopy.npc+'_img'" class="img1"></div>
      <p>{{settingDataCopy.npc}}</p>
      <img src="../assets/set_normal@2x.png" alt="" class="img">
      <div :id="settingDataCopy.npc+'_box'" class="imgBox"></div>

    </div>
  </div>
</template>
<script>
import lottie from 'lottie-web'
import * as outLine from '@/assets/outLine/data.json'
import * as music from '@/assets/music/data.json'

  export default {
    props:{
      settingData:{},
      translatex:'',
      translatey:'',
    },
    data() {
      return {
        visible: false,
        marks: {
          0: '0',
          10: {
            style: {
              color: '#fff',
              display:'none'
            },
            label: this.$createElement('strong', '0.1')
          },
          20: {
            style: {
              color: '#fff',
              display:'none'
            },
            label: this.$createElement('strong', '0.2')
          },
          30:{
            style: {
              color: '#fff',
              display:'none'
            },
            label: this.$createElement('strong', '0.3')
          },
          40:{
            style: {
              color: '#fff',
              display:'none'
            },
            label: this.$createElement('strong', '0.4')
          },
          50:'0.5',
          60:{
            style: {
              color: '#fff',
              display:'none'
            },
            label: this.$createElement('strong', '0.6')
          },
          70:{
            style: {
              color: '#fff',
              display:'none'
            },
            label: this.$createElement('strong', '0.7')
          },
          80:{
            style: {
              color: '#fff',
              display:'none'
            },
            label: this.$createElement('strong', '0.8')
          },
          90:{
            style: {
              color: '#fff',
              display:'none'
            },
            label: this.$createElement('strong', '0.9')
          },
          100:'1'
        },
        settingDataCopy:{
          npc:'',
          factor:0,
          voice:false,
          absorb:false,
          ains:null
        },
        outLineAnimation:'',
        musicAnimation:'',
        translatey1:'',
        translatex1:''
      };
    },
    mounted(){
      this.settingDataCopy.npc = this.settingData.npc;
      this.settingDataCopy.factor = this.settingData.factor;
      this.settingDataCopy.voice = this.settingData.voice;
      this.settingDataCopy.absorb = this.settingData.absorb;
      if(this.settingData.ains){
        this.settingDataCopy.ains = this.settingData.ains
      }
      this.$nextTick(()=>{
        this.outLineAnimation = lottie.loadAnimation({
          container: document.getElementById(this.settingDataCopy.npc+"_box"),//当前需要渲染的DOM
          renderer: "svg",//渲染方式，默认为svg,还可以渲染为html和canvas
          loop: true,//循环播放
          autoplay: true,//自动播放
          animationData: outLine.default,//本地动画
        });
        this.outLineAnimation = lottie.loadAnimation({
          container: document.getElementById(this.settingDataCopy.npc+"_img"),//当前需要渲染的DOM
          renderer: "svg",//渲染方式，默认为svg,还可以渲染为html和canvas
          loop: true,//循环播放
          autoplay: true,//自动播放
          animationData: music.default,//本地动画
        });
      })
    },
    watch:{
      'settingDataCopy.factor':{
        handler:function(newData){
          // let i = Math.floor(newData/10)
          // for( let j = 0;j<10;j++){
          //   if(j<=i){
          //     document.getElementsByClassName('el-slider__marks-stop')[j].style.background = '#409EFF'
          //   }else{
          //     document.getElementsByClassName('el-slider__marks-stop')[j].style.background = '#b6b6b6'
          //   }
          // }
          this.change(newData)
        },
        // immediate:true,
      }
    },
    methods:{
      setting(){
        if(this.translatex || this.translatex == 0){
          this.translatex1 = this.translatex-200;
          this.translatey1 = this.translatey-230;

        }
        this.visible = !this.visible;
        // this.settingDataCopy = JSON.parse(JSON.stringify(this.settingData));
        this.settingDataCopy.npc = this.settingData.npc;
        this.settingDataCopy.factor = this.settingData.factor;
        this.settingDataCopy.voice = this.settingData.voice;
        this.settingDataCopy.absorb = this.settingData.absorb;
        setTimeout(()=>{
          this.change(this.settingDataCopy.factor)
        },200)
        if(this.settingData.ains){
          this.settingDataCopy.ains = this.settingData.ains
        }
        
      },
      changes(value){
        console.log(value)
         this.settingDataCopy.ains = value
      },
      formatTooltip(val) {
        return val / 100;
      },
      comit(){
        this.visible = false;
        this.$emit('saveSetting',this.settingDataCopy)
      },
      change(newData){
        let father = document.getElementById(this.settingDataCopy.npc);
        if(father){
          let i = Math.floor(newData/10)
          
          for( let j = 0;j<10;j++){
            if(j<=i){
              father.getElementsByClassName('el-slider__marks-stop')[j].style.background = '#409EFF'
            }else{
              father.getElementsByClassName('el-slider__marks-stop')[j].style.background = '#b6b6b6'
            }
          }
        }
      }
    }
  }
</script>
<style lang="scss">
.dialog{
    width: 139px;
    height: 21px;
    background: rgba(255,255,255,1);
  // background: rgba(255,255,255,0.7000);
  // box-shadow: 0px 10px 60px 0px rgba(0,0,0,0.2000);
  border-radius: 12px;
  // backdrop-filter: blur(10px);
  .userSetting{
    width: 140px;
    height: 21px;
    // background: url('../assets/_2_1.gif') 0px 0px no-repeat;
    background-size:141px 21px;
    // background: rgba(255,255,255,0.7000);
    // box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.2000);
    border-radius: 12px;
    // backdrop-filter: blur(10px);
    position: relative;
    font-size: 12px;
    font-family: Helvetica;
    color: #000000;
    margin: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .img{
      width: 20px;
      height: 20px;
    }
    .img1{
      width: 15px;
      height: 15px;
      margin-left: 10px;
    }
    .imgBox{
      width: 140px;
      height: 23px;
      position: absolute;
      left: 0;
    }
  }

  .content{
      width: 460px;

      // height: 280px;
      // background: rgba(255,255,255,0.7000);
      box-shadow: 0px 10px 60px 0px rgba(0,0,0,0.2000);
      border-radius: 10px;
      padding:0 0 20px 0;
      background: rgba(255,255,255,0.8);
      backdrop-filter: blur(10px);
      position: absolute;
      left:140px;
      top: -20px;
      z-index: 999;
    .title{
      height: 40px;
      background: #FFFFFF;
      margin: 0;
      border-radius: 10px 10px 0px 0px;
      text-align: center;
      line-height: 40px;
      font-weight: 600;
      color: RGBA(22, 132, 253, 1);
      position: relative;
      i{
        position: absolute;
        top: 10px;
        right: 20px;
        width: 8px;height: 8px;
        color: rgba(0, 0, 0, 1);
      }
    }
    .form{
      // background: rgba(255,255,255,0.7);
      .el-form-item{
        margin-bottom: 0;
      }
      .el-slider{
        margin-left: 3px;
        display:inline-block;
        width: 240px;
        color: #000;
       vertical-align: -11px;
        .el-slider__stop{
          background: rgba(182, 182, 182, 1);
          height: 4px;
          top: -1px;
          width: 4px;
        }
        .el-slider__bar{
          top: 0px;
          height: 2px;
        }
        .el-slider__runway{
           height: 2px;
           background: rgba(182, 182, 182, 1);
        }
        .el-slider__marks-stop{
          height: 4px;
          width: 4px;
          top: -1px;
        }
        .el-slider__marks-text{
          color: #000;
        }
        .el-slider__button-wrapper{
          top: -17px;
        }
        .el-slider__marks-text{
          margin-top: 0;
        }
      }
      .ownRadio .el-radio-button__inner{
        width: 50px;
        height: 25px;
        border: 1px solid #B6B6B6;
        box-shadow: 0px 10px 60px 0px rgba(0,0,0,0.2000);
        border-radius: 10px;
        
        margin-right: 20px;
        line-height: 25px;
        text-align: center;
        font-size: 12px;
        padding: 0;
      }
      .is-active .el-radio-button__inner{
        background: rgba(29,157,253,0.2000);
        border: 1px solid #1D9DFD;
        color: rgba(29, 157, 253, 1);
      }
    }
    .question{
      display: inline-block;
      height: 14px;
      width: 14px;
      background: url('../assets/question.png') 0 0  no-repeat;
      background-size: 100% 100%;
      margin-right: 20px;
      margin-left: -5px;
      vertical-align: -2px;
    }
  }
  .buttonBox{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-content: center;
    height: 30px;
    margin: 20px 0;
    padding: 0 80px;
    button{
      width: 100px;
      height: 30px;
      box-shadow: 0px 10px 60px 0px rgba(0,0,0,0.2000);
      border-radius: 15px;
      font-size: 12px;
      font-weight: 600;
    }
    button:nth-child(1){
      background: linear-gradient(270deg, #1169FF 0%, #1D9DFD 100%);
      color:#fff;
    }
    button:nth-child(2){
      // background: rgba(255, 255, 255, 0.5);
      color:rgba(182, 182, 182, 1);
      border: 1px solid #B6B6B6;
    }
  }

  .el-radio__inner::after{
    width: 6px;
    height: 6px;
    background: #1D9DFD;
  }
  .is-checked .el-radio__inner{
    border-color: #1D9DFD;
    background: rgba(29,157,253,0.2);
  }
  .el-tooltip.el-slider__button{
    background: RGBA(198, 226, 248, 1);
  }
  .el-tooltip.el-slider__button::before{
    width: 7px;
    height: 7px;
    background: #1D9DFD;
    border-radius: 100%;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) scale(1);
  }
}

.el-tooltip__popper{
  max-width: 300px;
}
</style>