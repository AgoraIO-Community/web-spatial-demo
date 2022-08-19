<template>
  <div class="UserStatus">
    <el-popover
      placement="bottom"
      trigger="manual"
      v-model="visible"
      popper-class="popover1"
      v-click-outside="onClickOutside"
      >
      <div class="content">
        <p class="title">{{$t('login.PopupTitleUser')}} <i class="close" @click="fixed = !fixed" v-if="fixed"></i><i class="close1" @click="fixed = !fixed" v-if="!fixed"></i></p>
        <p class="PopupGuide">{{$t('login.PopupGuide')}}</p>
        <table id="customers">
          <tr>
            <th width='100px'>{{$t('login.npc')}}</th>
            <th width='70px'>
              {{$t('login.Attenuationfactor2')}} 
              <el-tooltip class="item" effect="dark" :content="$t('login.AttenuationfactorTip')" placement="right">
                <i class="question"></i>
              </el-tooltip>
            </th>
            <th width='100px'>
              {{$t('login.Position')}}
              <el-tooltip class="item" effect="dark" :content="$t('login.PositionTip')" placement="right">
                <i class="question"></i>
              </el-tooltip>
            </th>
            <th width='120px'>
              {{$t('login.Forwardvector')}}
              <el-tooltip class="item" effect="dark" :content="$t('login.ForwardvectorTip')" placement="right">
                  <i class="question"></i>
                </el-tooltip>
            </th>
            <th width='120px'>
              {{$t('login.Rightvector')}}
              <el-tooltip class="item" effect="dark" :content="$t('login.RightvectorTip')" placement="right">
                  <i class="question"></i>
                </el-tooltip>
            </th>
            <th width='90px'>
              {{$t('login.Upvector')}}
              <el-tooltip class="item" effect="dark" :content="$t('login.UpvectorTip')" placement="right">
                <i class="question"></i>
              </el-tooltip>
            </th>
          </tr>
          <tr v-for="(item,i) in  Object.keys(settingData)" :key="i">
            <td>{{item}}</td>
            <td>{{settingData[item].factor/100}}</td>
            <td >[{{settingData[item].position?(settingData[item].position[0]*12).toFixed(0):0}},{{settingData[item].position?(settingData[item].position[1]*12).toFixed(0):0}},1]</td>
            <td>{{settingData[item].direction}}</td>
            <td>{{settingData[item].rightvector}}</td>
            <td>[0,0,1]</td>
          </tr>
          <tr>
            <td>{{userPosition.npc+'(You)'}}</td>
            <td>{{userPosition.factor}}</td>
            <td >[{{userPosition.position?(userPosition.position[0]*12).toFixed(0):0}},{{userPosition.position?(userPosition.position[1]*12).toFixed(0):0}},1]</td>
            <td>{{userPosition.vector}}</td>
            <td>{{userPosition.rightvector}}</td>
            <td>[0,0,1]</td>
          </tr>
        </table>
      </div>
      <div slot="reference" class="userSetting" @click="visible = !visible">
        <p>{{$t('login.PopupTitleUser')}} <img src="../assets/down.png" alt="" v-if="visible">
        <img src="../assets/up.png" alt="" v-if="!visible"></p>
      </div>
    </el-popover>
  </div>
</template>
<script>
  import vClickOutside from 'v-click-outside'

  export default {
    directives: {
      clickOutside: vClickOutside.directive
    },
    props:{
      settingData:{},
      userPosition:{},
      remoteUsers:{}
    },
    data() {
      return {
        visible: false,
        fixed:false
      };
    },
    methods:{
      onClickOutside (event) {
        if(this.fixed){
          // this.visible = false
        }else{
          this.visible = false
        }
      }
    }
  }
</script>
<style lang="scss">
.UserStatus{
    width: 139px;
    height: 20px;
    position: fixed;
    top: 100px;
    right: 80px;
    z-index: 111;
  .userSetting{
    width: 139px;
    height: 30px;
    background: rgba(255,255,255,0.7000);
    box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.2000);
    border-radius: 10px;
    // backdrop-filter: blur(10px);
    color: #000;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    img{
      width: 12px;
      height: 8px;
      vertical-align: 2px;
    }
  }
}
.popover1{
  // width: 810px;
  // height: 280px;
  // background: rgba(255,255,255,0.7);
  // box-shadow: 0px 10px 60px 0px rgba(0,0,0,0.2000);
  border-radius: 10px;
  padding:0;
  // background: rgba(255,255,255,0.7);
  .content{
    // backdrop-filter: blur(10px);
    padding-bottom:10px;
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

    }
    .close1{
      position: absolute;
      top: 10px;
      right: 20px;
      width: 19px;
      height: 19px;
      background: url('../assets/pin@2x.png') 0 0 no-repeat;
      background-size:100% ;
      
    }
    .close{
      position: absolute;
      top: 10px;
      right: 20px;
      width: 19px;
      height: 19px;
      transform:scale(1.5,1.5);
      background: url('../assets/pin@2x.png') 0 0 no-repeat;
      background-size:100% ;
    }
    .PopupGuide{
      // width: 500px;
      // height: 40px;
      font-size: 14px;
      color: #000;
      text-align: center;
      margin:0px auto 10px; 
    }
    #customers{
      // width:100%;
      border-collapse:collapse;
      color:#000000;
      font-weight: 400;
      font-size:12px;
    }
    tr{
      height: 30px;
    }
    #customers td, #customers th {
      border:1px solid #B6B6B6;
      text-align: center;
    }
    .question{
      display: inline-block;
      height: 14px;
      width: 14px;
      background: url('../assets/question.png') 0 0  no-repeat;
      background-size: 100% 100%;
      // margin-right: 20px;
      // margin-left: ;
      vertical-align: -2px;
    }
  }
}
.el-tooltip__popper{
  max-width: 300px;
}
</style>