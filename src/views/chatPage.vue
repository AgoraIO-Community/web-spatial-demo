<template>
  <div class="main">
    <!-- <img src="../assets/map.png" alt="" class="backMap"> -->
    <Nav />
    <UserStatus :setting-data="settingData" :user-position="userPosition" :remote-users="remoteUsers" />
    <div id="userBox" ref="userBox" class="user-box">
      <div
        class="scene"
        :style="{transform:'translate3d('+ -translatex + 'px'+','+ -translatey +'px'+',0)'}"
        @mousedown.prevent="handleMove"
      >
        <!-- @click.prevent="getMousePos" -->
        <div v-for="(item,index) in Object.keys(settingData)" :key="index" :style="{top:settingData[item].top+'px',left:settingData[item].left+'px',transition: 'all 1s','transition-timing-function': 'linear'}" class="nameTitle">
          <Dialoag v-if="item !== 'Peter'" :ref="item" :setting-data="settingData[item]" @saveSetting="saveSetting" />
        </div>
        <img src="http://accktvpic.oss-cn-beijing.aliyuncs.com/pic/meta/demo/WebSpatialAudioWebDemo/map.png" alt="" class="boxImg">
        <div :style="{top:settingData['Peter'].top+'px',left:settingData['Peter'].left+'px'}" class="waiter">
          <img :src="waiterPosition.src">
          <div class="paulSetting">
            <Dialoag :setting-data="settingData['Peter']" :translatex="translatex+screenParm.width/2" :translatey="translatey+screenParm.height/2" @saveSetting="saveSetting" />
          </div>
        </div>
        <div id="user" class="user" :style="{top:userPosition.top-150+'px',left:userPosition.left-34+'px'}">
          <p class="name">{{ this.options.name }}</p>
          <!-- <img src="../assets/__2.gif" alt="" class="personImg"> -->
          <div id="user_box" class="personImg" />
          <div id="row_box" class="line" :style="'transform:rotate('+userPosition.direction+'deg);'" />
        </div>
        <div v-for="item in Object.keys(remoteUsers)" :key="item" class="remoteUser" :class="'remoteUser'+item" :style="{top:remoteUsers[item].top-150+'px',left:remoteUsers[item].left-34+'px'}">
          <p class="name">{{ remoteUsers[item].npc }}</p>
          <img src="../assets/__2.gif" alt="" class="personImg">
          <div class="line" :style="'transform:rotate('+remoteUsers[item].direction+'deg);'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from '../components/nav.vue'
import Dialoag from '../components/dialog.vue'
import UserStatus from '../components/userStatus.vue'
import smoothscroll from 'smoothscroll-polyfill'// 页面平滑
import { Message, Loading } from 'element-ui'
import { stringToUint8Array, Uint8ArrayToString, queryPtInPolygon, get } from '../utils/index.js'
import lottie from 'lottie-web'
import * as row from '@/assets/row/data.json'
import * as user from '@/assets/user/data.json'

// import {SpatialAudioExtension} from "agora-extension-spatial-audio";

export default {
  name: '',
  components: {
    Nav,
    Dialoag,
    UserStatus
  },
  data() {
    return {
      // a:{
      //   x:2265,
      //   y:374
      // },
      // b:{
      //   x:4545,
      //   y:1680,
      // },
      // c:{
      //   x:2270,
      //   y:2994
      // },
      // d:{
      //   x:0,
      //   y:1683
      // },
      a: { // 画布 top 0,0
        x: 1132,
        y: 212
      },
      b: { // 画布 right
        x: 2272,
        y: 865
      },
      c: { // 画布bo
        x: 1135,
        y: 1522
      },
      d: { // 画布left
        x: 0,
        y: 866
      },
      vector: 50 / 350, // 向量用来手动静音
      // 屏幕信息
      screenParm: {
        width: '',
        height: ''
      },
      // 用户位置
      userPosition: {
        // top:2850,
        // left:2300,
        top: 1480,
        left: 1150,
        direction: 0, // 人物面部角度
        rightvector: [-1, -1, 0], // 右手
        vector: [1, -1, 0], // 面部朝向
        npc: this.$route.query.name,
        factor: 50, // 展示
        position: null// 转换xyz 2.5D
      },

      userPrePosition: {
        // top:2850,
        // left:2300,
        top: 1480,
        left: 1150
      },
      // peter图片
      waiterPosition: {
        src: require('../assets/2.png')
      },
      // 计算peter走50秒
      time: 50,
      // 所有NPC位置信息
      settingData: {
        'Peter': {
          npc: 'Peter',
          factor: 50,
          voice: false,
          absorb: true,
          // top:2010,
          // left:2880,
          top: 1005,
          left: 1440,
          direction: [0, 1, 0],
          rightvector: [-1, 0, 0],
          source: 'https://accpic.sd-rtn.com/pic/meta/demo/WebSpatialAudioWebDemo/Spatial%20Audio%20Demo%20Recording%20-%20Part%20C%20-%20Todd%20Embley_Product%20Demo.mp3',
          // source:'http://agora.fronted.love/music.mp3',
          processor: null,
          track: null
        },
        'Nick&Susan': {
          npc: 'Nick&Susan',
          factor: 50,
          voice: false,
          absorb: true,
          // top:1450,
          // left:1130,
          top: 710,
          left: 530,
          direction: [0, -1, 0],
          rightvector: [1, 0, 0],
          source: 'https://accpic.sd-rtn.com/pic/meta/demo/WebSpatialAudioWebDemo/music.mp3',
          // source:'http://agora.fronted.love/music.mp3',
          processor: null,
          track: null
        },
        'Larry&Bella': {
          npc: 'Larry&Bella',
          factor: 50,
          voice: false,
          absorb: true,
          // top:390,
          // left:2240,
          top: 180,
          left: 1080,
          direction: [0, 1, 0],
          rightvector: [-1, 0, 0],
          source: 'https://accpic.sd-rtn.com/pic/meta/demo/WebSpatialAudioWebDemo/live.mp3',
          // source:'http://agora.fronted.love/music.mp3',
          processor: null,
          track: null
        },

        // 'Bella':{
        //   npc:'Bella',
        //   factor:50,
        //   voice:false,
        //   absorb:true,
        //   top:450,
        //   left:2180,
        //   direction:[0,-1,0],
        //   rightvector:[1,0,0],
        //   source:require('../static/resources/Live/live.mp3'),
        //   processor:'',
        //   track:'',
        //   position:null
        // },

        // 'Nick':{
        //   npc:'Nick',
        //   factor:50,
        //   voice:false,
        //   absorb:true,
        //   top:1480,
        //   left:1080,
        //   direction:[0,-1,0],
        //   rightvector:[1,0,0],
        //   source:require('../static/resources/2.mp3'),

        // },
        'Paul': {
          npc: 'Paul',
          factor: 50,
          voice: false,
          absorb: true,
          // top: 1420,
          // left: 270,
          top: 690,
          left: 110,
          direction: [1, -1, 0],
          rightvector: [1, 1, 0],
          source: 'https://accpic.sd-rtn.com/pic/meta/demo/WebSpatialAudioWebDemo/BGM_1.mp3',
          // source:'http://agora.fronted.love/music.mp3',
          processor: null,
          track: null
        }

        // 'Jessica':{
        //   npc:'Jessica',
        //   factor:0,
        //   voice:false,
        //   absorb:false,
        //   top:930,
        //   left:2800,
        //   ains:'off',
        //   direction:[-1,0,0],
        //   rightvector:[0,-1,0],
        //   // source:require('../static/resources/5.mp3'),
        // },
        // 'Dave':{
        //   npc:'Dave',
        //   factor:50,
        //   voice:true,
        //   absorb:true,
        //   top:880,
        //   left:2900,
        //   ains:'off',
        //   direction:[-1,0,0],
        //   rightvector:[0,-1,0],
        //   // source:require('../static/resources/3.mp3'),
        // },
      },
      // RTM参数
      options: {
        appid: this.$route.query.appid,
        channel: this.$route.query.chanel,
        name: this.$route.query.name,
        uid: null,
        token: null
      },
      client: null,
      localUserTrack: null,
      // 远端用户
      remoteUsers: {},
      // 降噪NPC
      mockRemoteUsers: [
      //   {
      //   npc:'Jessica',
      //   mockRemoteUserUid:1000,
      //   source:require('../static/resources/5.mp3'),
      // },
      // {
      //   npc:'Dave',
      //   mockRemoteUserUid:1001,
      //   source:require('../static/resources/3.mp3'),
      // }
      ],
      //
      mockRemoteUserClients: [],
      // 空间音频插件
      extension: null,
      // 降噪插件
      denoiser: null,
      // 防抖函数
      previous: null,
      // mp3List:[],
      // chatNpcList:[],
      // 加载状态
      loadingInstance: null,
      // 线程
      pollingWorker: null,
      rowAnimation: '',
      userAnimation: '',
      offset: 0, // 大屏偏移量
      translatex: 0, // 背景图平移值
      translatey: 0, // 同上
      translatexLimit: 0,
      translateyLimit: 0,
      mouseDownTime: 0, // 判断点击事件
      isClick: false,
      isLongKeyDown: false
    }
  },
  created() {
    this.extension = window.extension
    // AgoraRTC.registerExtensions([this.extension]);
    // this.denoiser = window.denoiser;
    this.previous = new Date().getTime()
    this.loadingInstance = Loading.service({ fullscreen: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.3)' })
  },
  mounted() {
    // smoothscroll.polyfill()
    // 初始化图标
    this.initLottie()
    // 初始化用户
    this.initUser()
    this.init()
    const that = this
    window.onkeydown = function(e) {
      that.onkeyDown(e)
    }
    window.onkeyup = function(e) {
      that.onkeyUp(e)
    }
  },

  beforeDestroy() {
    this.beforeunloadHandler()
  },
  methods: {
    // 初始化图标
    initLottie() {
      this.rowAnimation = lottie.loadAnimation({
        container: document.getElementById('row_box'), // 当前需要渲染的DOM
        renderer: 'svg', // 渲染方式，默认为svg,还可以渲染为html和canvas
        loop: true, // 循环播放
        autoplay: true, // 自动播放
        animationData: row.default // 本地动画
      })
      this.userAnimation = lottie.loadAnimation({
        container: document.getElementById('user_box'), // 当前需要渲染的DOM
        renderer: 'svg', // 渲染方式，默认为svg,还可以渲染为html和canvas
        loop: true, // 循环播放
        autoplay: true, // 自动播放
        animationData: user.default // 本地动画
      })
    },
    // 创建房间
    async init() {
      this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
      await this.join()
      await this.localPlayerStart()
    },
    // 获取浏览器窗口大小，偏移量大小，镜头移动边界值
    initUser() {
      this.screenParm.width = document.body.clientWidth
      this.screenParm.height = document.body.clientHeight

      if (document.body.clientWidth > 2250) {
        this.offset = (document.body.clientWidth - 2250) / 2
      }
      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
      // this.$refs.userBox.scrollTo(2250-(this.screenParm.width/2),2750)
      // this.$refs.userBox.scrollTo(1125-(this.screenParm.width/2),1375)
      this.translatex = 1125 - (document.body.clientWidth / 2) + this.offset
      this.translatey = -document.body.clientHeight + 1460 + 80
      this.translatexLimit = 2250 - document.body.clientWidth > 0 ? 2250 - document.body.clientWidth : 0
      this.translateyLimit = 1460 + 80 - document.body.clientHeight > 0 ? 1460 + 80 - document.body.clientHeight : 0
    },
    // sdk 加入房间监听用户加入，用户消息
    async join() {
      await this.client.on('user-published', this.handleUserPublished)
      await this.client.on('user-unpublished', this.handleUserUnpublished)
      await this.client.on('stream-message', this.handleUsermessage)
      this.options.uid = await this.client.join(this.options.appid, this.options.channel, this.options.token)
      this.localUserTrack = await AgoraRTC.createMicrophoneAudioTrack({
        AEC: true,
        AGC: true,
        ANS: true
      })
      await this.client.publish([this.localUserTrack])
      // console.log(this.remoteUsers)
      // if(!this.settingData['Jessica'].processor&&!this.settingData['Dave'].processor){
      //    await this.mockRemoteUserJoin(); //mock AI Denoiser
      // }
      // setTimeout( async ()=>{

      // pos 2.5D 自己空间音频的位置
      const pos = this.getVector(this.userPosition.left, this.userPosition.top)
      // console.log("user=",pos)

      this.userPosition.position = [pos.x, pos.y, 1]
      this.extension.updateSelfPosition([pos.x, pos.y, 1], [-1, -1, 0], [1, -1, 0], [0, 0, 1])
      // },4000)
    },
    // 离开房间 清楚所有信息
    async leave() {
      // window.clearInterval(window.timer)
      this.loadingInstance.close()
      this.stopWorker(this.pollingWorker)
      if (this.localUserTrack) {
        this.localUserTrack.stop()
        this.localUserTrack.close()
        this.localUserTrack = undefined
      }
      this.remoteUsers = {}
      await this.client.leave()
      // if(this.mockRemoteUserClients.length){
      //   await this.mockRemoteUserLeave();
      // }
      this.localPlayerStop()
      console.log('client leaves channel success')
    },
    // 处理消息回调 其他人行为
    async handleUsermessage(uid, data) {
      // 别人发送的消息cb
      const detail = JSON.parse(Uint8ArrayToString(data))
      // console.log(detail)
      if (detail.isSetAins) {
        this.setAins(detail.value, detail.npc)
      } else {
        this.remoteUsers[uid].processor.updateRemotePosition({
          position: detail.userPosition.position,
          forward: detail.userPosition.vector
        })
        this.remoteUsers[uid].top = detail.userPosition.top
        this.remoteUsers[uid].left = detail.userPosition.left
        this.remoteUsers[uid].direction = detail.userPosition.direction
        this.remoteUsers[uid].npc = detail.userPosition.npc
        this.remoteUsers[uid].position = detail.userPosition.position
        if (get(this.userPosition.position[0], this.userPosition.position[1], detail.userPosition.position[0], detail.userPosition.position[1]) > 50) {
          this.remoteUsers[uid].track.setVolume(0)
        } else {
          this.remoteUsers[uid].track.setVolume(100)
        }
        // if(detail.time){
        //   document.querySelector('.remoteUser'+ uid).style.transition  = 'all '+detail.time+'s linear'
        // }else{
        //   document.querySelector('.remoteUser'+ uid).style.transition  = ''
        // }
        // console.log(this.remoteUsers[uid].processor)
      }
      this.$forceUpdate()
    },
    // 处理用户加入回调 第三方加入频道 人物初始化
    async handleUserPublished(user, mediaType) {
      await this.client.subscribe(user, mediaType)
      console.log('subscribe success')
      const processor = this.extension.createProcessor()
      user.processor = processor
      // console.log(user)
      const track = user.audioTrack
      track.pipe(processor).pipe(track.processorDestination)
      track.setVolume(0)
      track.play()

      if (![1000, 1001].includes(user.uid)) {
        // user.top = 2850;
        // user.left = 2300;
        // let pos = this.getVector(user.left,user.top)
        // user.position = [pos.x,pos.y,1];
        // user.direction = 0;
        user.npc = user.uid
        this.remoteUsers[user.uid] = user
        this.remoteUsers[user.uid].track = track
        this.$forceUpdate()
        // console.log(this.remoteUsers)
        setTimeout(() => {
          this.client.sendStreamMessage(stringToUint8Array(JSON.stringify({
            userPosition: this.userPosition
          })))
        }, 1000)
      } else {
        console.log('mock user join')
        if (user.uid == 1000) {
          this.updateMockUserPosition('Jessica', processor, track)
        } else {
          this.updateMockUserPosition('Dave', processor, track)
        }
      }
    },
    // ****更新远端用户位置信息
    updateMockUserPosition(npc, processor, track) {
      const pos = this.getVector(this.settingData[npc].left + 35, this.settingData[npc].top + 110)
      processor.updatePlayerPositionInfo({
        position: [pos.x, pos.y, 1],
        forward: this.settingData[npc].direction
      })
      this.settingData[npc].position = [pos.x, pos.y, 1]
      this.settingData[npc].track = track
      this.settingData[npc].processor = processor
    },
    // 处理用户离开回调 用户离开
    handleUserUnpublished(user) {
      // console.log(user)
      this.remoteUsers[user.uid].processor.removeRemotePosition()
      // this.remoteUsers[user.uid].processor.clearRemotePositions();
      delete this.remoteUsers[user.uid]
      this.$forceUpdate()
    },
    // //加载本地npc音频并更新位置
    async localPlayerStart() {
      const arry = Object.keys(this.settingData)
      for (let i = 0; i < arry.length; i++) {
        if (this.settingData[arry[i]].source) {
          // setTimeout(async () => {
          try {
            const processor = await this.extension.createProcessor()
            const track = await AgoraRTC.createBufferSourceAudioTrack({ source: this.settingData[arry[i]].source, cacheOnlineFile: true })
            await track.startProcessAudioBuffer({ loop: true })
            const pos = this.getVector(this.settingData[arry[i]].left + 70, this.settingData[arry[i]].top + 140)
            await track.pipe(processor).pipe(track.processorDestination)
            track.setVolume(0)
            this.settingData[arry[i]].processor = processor
            this.settingData[arry[i]].track = track
            this.settingData[arry[i]].position = [pos.x, pos.y, 1]
            track.play()
            processor.updatePlayerPositionInfo({
              position: [pos.x, pos.y, 1],
              forward: this.settingData[arry[i]].direction
            })
            // processor.updateSpatialDistance(50)
            if (arry[i] == 'Peter') {
              this.moveWaiterBottom()
              this.loadingInstance.close()
            }
          } catch (error) {
            console.error(`localPlayerSound[${i}] with buffersource track ${arry[i]} play fail: ${error}`)
          }
          // }, 0);
        }
      }
    },
    // **对话的逻辑
    openConversation(value) {
      if (value == 'Susan') {
        this.createTack(0, 0)
      } else if (value == 'Larry') {
        this.createTack(0, 1)
      }
    },
    // **对话的逻辑
    async createTack(i, j) {
      let length, track, npc
      length = this.mp3List[j].length
      if (i >= length) {
        i = 0
      }
      npc = this.chatNpcList[j][i % 2]
      // console.log(npc)
      track = await AgoraRTC.createBufferSourceAudioTrack({ source: this.mp3List[j][i] })
      track.startProcessAudioBuffer({ loop: false })
      // console.log(track.duration)
      const processor = this.extension.createProcessor()
      const pos = this.getVector(this.settingData[npc].left + 35, this.settingData[npc].top + 110)
      // console.log(pos)
      if (get(this.userPosition.position[0], this.userPosition.position[1], pos.x, pos.y) > 50) {
        track.setVolume(0)
      } else {
        track.setVolume(500)
      }
      await track.pipe(processor).pipe(track.processorDestination)
      track.play()
      setTimeout(() => {
        processor.updatePlayerPositionInfo({
          position: [pos.x, pos.y, 1],
          forward: this.settingData[npc].direction
        })
        processor.updateSpatialAttenuation(this.settingData[npc].factor / 100)
        processor.updateSpatialBlur(this.settingData[npc].voice)
        processor.updateSpatialAirAbsorb(this.settingData[npc].absorb)
      }, 1000)
      this.settingData[npc].processor = processor
      this.settingData[npc].track = track
      this.settingData[npc].position = [pos.x, pos.y, 1]
      track.on('source-state-change', (currentState) => {
        // console.log(currentState)
        if (currentState == 'stopped') {
          // console.log(track)
          // this.settingData[npc].track = null;
          // this.settingData[npc].processor = null;
          this.createTack(i + 1, j)
        }
      })
    },
    // 清楚本地npc信息
    localPlayerStop() {
      const arry = Object.keys(this.settingData)
      for (let i = 0; i < arry.length; i++) {
        if (this.settingData[arry[i]].track) {
          this.settingData[arry[i]].track.stop()
          this.settingData[arry[i]].track = null
          this.settingData[arry[i]].processor.removeRemotePosition()
          // this.settingData[arry[i]].processor.clearRemotePositions();
        }
      }
    },
    // mock 远端用户加入
    async  mockRemoteUserJoin() {
      for (let i = 0; i < this.mockRemoteUsers.length; i++) {
        setTimeout(async() => {
          try {
            const track = await AgoraRTC.createBufferSourceAudioTrack({ source: this.mockRemoteUsers[i].source })
            track.startProcessAudioBuffer({ loop: true })
            const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
            const processorAi = this.denoiser.createProcessor()
            processorAi.disable()
            processorAi.onoverload = async() => {
              console.log('overload!!!')
              try {
                await processorAi.disable()
              } catch (error) {
                console.error('disable AIDenoiser failure')
              }
            }
            await track.pipe(processorAi).pipe(track.processorDestination)
            this.mockRemoteUserClients[i] = client
            this.settingData[this.mockRemoteUsers[i].npc].processorAi = processorAi
            await client.join(this.options.appid, this.options.channel, this.options.token, this.mockRemoteUsers[i].mockRemoteUserUid)
            // track.setVolume(0)
            await client.publish(track)
          } catch (error) {
            console.error(`mockRemoteUsers[${i}] with buffersource track ${this.mockRemoteUsers[i].npc} join and publish fail: ${error}`)
          }
        }, 500)
      }
    },
    // mock 远端用户离开
    async  mockRemoteUserLeave() {
      for (let i = 0; i < this.mockRemoteUsers.length; i++) {
        try {
          await this.mockRemoteUserClients[i].leave()
          console.log(`speaker[${i}] with buffersource track ${this.mockRemoteUsers[i]} leave success`)
        } catch (error) {
          console.error(`speaker[${i}] with buffersource track ${this.mockRemoteUsers[i]} leave fail: ${error}`)
        }
      }
    },
    // 跟新 npc peter 位置
    updateWaiter(forward) {
      const pos = this.getVector(this.settingData['Peter'].left + 70, this.settingData['Peter'].top + 220)
      // console.log(pos)
      this.settingData['Peter'].position = [pos.x, pos.y, 1]
      this.settingData['Peter'].processor.updatePlayerPositionInfo({
        position: [pos.x, pos.y, 1],
        forward: forward
      })
      if (get(this.userPosition.position[0], this.userPosition.position[1], pos.x, pos.y) > 50) {
        this.settingData['Peter'].track.setVolume(0)
      } else {
        this.settingData['Peter'].track.setVolume(500)
      }
    },
    // 动画 peter
    moveWaiterBottom() {
      this.createWorker(() => {
        this.settingData['Peter'].top += 4
        this.settingData['Peter'].left -= 4 * Math.sqrt(3)
        this.settingData['Peter'].direction = [0, 1, 0]
        this.settingData['Peter'].rightvector = [-1, 0, 0]
        this.updateWaiter([0, 1, 0])
        this.time -= 1
        if (this.time == 0) {
          this.time = 50
          // window.clearInterval(window.timer)
          this.stopWorker(this.pollingWorker)
          this.moveWaiterLeft()
          setTimeout(() => {
            this.waiterPosition.src = require('../assets/3.png')
          }, 200)
        }
      }, 200)
    },
    // 动画 peter
    moveWaiterLeft() {
      this.createWorker(() => {
        this.settingData['Peter'].top -= 4
        this.settingData['Peter'].left -= 4 * Math.sqrt(3)
        this.updateWaiter([-1, 0, 0])
        this.settingData['Peter'].direction = [-1, 0, 0]
        this.settingData['Peter'].rightvector = [0, -1, 0]
        this.time -= 1
        if (this.time == 0) {
          this.time = 50
          // window.clearInterval(window.timer)
          this.stopWorker(this.pollingWorker)
          this.moveWaiterTop()
          setTimeout(() => {
            this.waiterPosition.src = require('../assets/4.png')
          }, 200)
        }
      }, 200)
    },
    // 动画 peter
    moveWaiterTop() {
      this.createWorker(() => {
        this.settingData['Peter'].top -= 4
        this.settingData['Peter'].left += 4 * Math.sqrt(3)
        this.updateWaiter([0, -1, 0])
        this.settingData['Peter'].direction = [0, -1, 0]
        this.settingData['Peter'].rightvector = [1, 0, 0]
        this.time -= 1
        if (this.time == 0) {
          this.stopWorker(this.pollingWorker)
          this.time = 50
          this.moveWaiterRight()
          setTimeout(() => {
            this.waiterPosition.src = require('../assets/1.png')
          }, 200)
        }
      }, 200)
    },
    // 动画 peter
    moveWaiterRight() {
      this.createWorker(() => {
        this.settingData['Peter'].top += 4
        this.settingData['Peter'].left += 4 * Math.sqrt(3)
        this.updateWaiter([1, 0, 0])
        this.settingData['Peter'].direction = [1, 0, 0]
        this.settingData['Peter'].rightvector = [0, 1, 0]
        this.time -= 1
        if (this.time == 0) {
          this.stopWorker(this.pollingWorker)
          this.time = 50
          this.moveWaiterBottom()
          setTimeout(() => {
            this.waiterPosition.src = require('../assets/2.png')
          }, 200)
        }
      }, 200)
    },
    // 2.d  真实坐标y
    getJuLiY(x, y) {
      var len
      var A = (this.a.y - this.b.y) / (this.a.x - this.b.x)
      var B = this.a.y - A * this.a.x
      len = Math.abs(((A * x + B - y).toFixed(2)) / Math.sqrt(A * A + 1)) * Math.sin(Math.PI / 3).toFixed(2)
      // console.log(len)
      return len
    },
    // 2.d 真实坐标x
    getJuLiX(x, y) {
      var len
      var A = (this.a.y - this.d.y) / (this.a.x - this.d.x)
      var B = this.a.y - A * this.a.x
      len = Math.abs(((A * x + B - y).toFixed(2)) / Math.sqrt(A * A + 1)) * Math.sin(Math.PI / 3).toFixed(2)
      // console.log(len)
      return len
    },
    // 退出房间清除所有数据（关闭窗口需要发送请求的时候需要加上）
    async beforeunloadHandler(e) {
      window.onkeydown = null
      window.onkeyup = null
      await this.leave()
      window.sessionStorage.removeItem('token')
      var confirmationMessage = 'Are you sure you want to leave?'
      if (e || window.event)(e || window.event).returnValue = confirmationMessage // 兼容 Gecko + IE
      return confirmationMessage // 兼容 Gecko + Webkit, Safari, Chrome
    },
    // 获取2.5d 坐标
    getVector(x, y) {
      const xx = this.getJuLiX(x, y)
      const yy = this.getJuLiY(x, y)
      return {
        x: Number((this.vector * xx).toFixed(2)),
        y: Number((this.vector * yy).toFixed(2))
      }
    },
    // ab是原始点 xy是目标点
    /**
     * @description: 获取2.5的方向
     * @param {*} x
     * @param {*} y
     * @param {*} a
     * @param {*} b
     * @return {*}
     * @Date: 2022-08-18 17:01:06
     */
    getRealForward(x, y, a, b) {
      const x1 = this.getJuLiX(x, y)
      const x2 = this.getJuLiX(a, b)
      const y1 = this.getJuLiY(x, y)
      const y2 = this.getJuLiY(a, b)
      return {
        forward: (-(this.getAngle(x1, y1, x2, y2) + 90)) / 180 * Math.PI,
        right: (-(this.getAngle(x1, y1, x2, y2) + 90) + 90) / 180 * Math.PI
      }
    },
    // 镜头移动x,y表示当前坐标,xd,yd表示当前位移距离
    moveBackground(x, y) {
      // console.log(this.moveList,"ssssssssss")
      // console.log(x,y,"ssssssssss")
      // console.log(xd,yd,"ssssssssss")
      // console.log(this.translatexLimit,this.translateyLimit,"ssssssssss")

      const a = x - (this.screenParm.width / 2); const b = y - (this.screenParm.height / 2)
      // 人物距离屏幕 /2 以下 translatey=0
      if (b < 0) {
        this.translatey = 0
      } else if (b > this.translateyLimit) {
        this.translatey = this.translateyLimit
      } else {
        this.translatey = b
      }
      if (a < 0) {
        this.translatex = 0
      } else if (a > this.translatexLimit) {
        this.translatex = this.translatexLimit
      } else {
        this.translatex = a
      }
    },
   
    /**
     * @description: 点击和键盘上下左右 动画逻辑
     * @param {*} xD
     * @param {*} yD
     * @param {*} signle
     * @param {*} limeit
     * @param {*} time
     * @param {*} x
     * @param {*} y
     * @return {*}
     * @Date: 2022-08-18 16:36:24
     */
    timerFunction2(xD, yD, signle, limeit, time, x, y) { // xd,yd 速度 single 移动方向 limit 移动时间 time 总时间 xy 移动终点
      // console.log(xD,yD,signle,limeit,time,x,y,'user====')
      let pos

      //是否确认到达目的点
      if (limeit >= time) {
        //停止移动,清楚前进行为定时
        window.clearInterval(window.timerClick)
        window.timerClick = null

      //获得2.5d 终点坐标转换
        pos = this.getVector(x, y)
      //移动幕布至实际的xy距离
        this.moveBackground(x, y)
        this.userPosition.left = x
        this.userPosition.top = y
      } else {
        pos = this.getVector(this.userPrePosition.left + xD * limeit, this.userPrePosition.top + yD * limeit)
        this.moveBackground(this.userPrePosition.left + xD * limeit, this.userPrePosition.top + yD * limeit)
        this.userPosition.left = this.userPrePosition.left + xD * limeit
        this.userPosition.top = this.userPrePosition.top + yD * limeit
      }
      // console.log("user=",pos)
      //转换为空间音频的实际位置
      const mockLocalUserNewPosition = {
        //当前2.5D位置
        position: [pos.x, pos.y, 1],
        //面部方向
        forward: [Number(Math.cos(signle.forward).toFixed(2)), Number(Math.sin(signle.forward).toFixed(2)), 0],
        //右手朝向
        right: [Number(Math.cos(signle.right).toFixed(2)), Number(Math.sin(signle.right).toFixed(2)), 0],
        //头顶
        up: [0, 0, 1]
      }
      //SDK调用
      this.extension.updateSelfPosition(
        mockLocalUserNewPosition.position,
        mockLocalUserNewPosition.forward,
        mockLocalUserNewPosition.right,
        mockLocalUserNewPosition.up
      )
      this.userPosition.rightvector = mockLocalUserNewPosition.right
      this.userPosition.vector = mockLocalUserNewPosition.forward
      this.userPosition.position = mockLocalUserNewPosition.position
      //判断音量是否打开 user和npc
      this.isPlay(pos.x, pos.y)
      this.isPlayUser(pos.x, pos.y)
      //SDK交互
      this.client.sendStreamMessage(stringToUint8Array(JSON.stringify({
        userPosition: this.userPosition,
        time: time
      })))
    },
    // 鼠标点击移动
    getMousePos(event) {
      var e = event || window.event
      if (e.target.className !== 'boxImg') return
      if (window.timerClick) {
        window.clearInterval(window.timerClick)
      }
      //背景平易的值
      var scrollX = JSON.parse(JSON.stringify(this.translatex))
      var scrollY = JSON.parse(JSON.stringify(this.translatey))
      // console.log(scrollX,scrollY)
    
      var x = (e.pageX || e.clientX) + scrollX - this.offset
      var y = (e.pageY || e.clientY) + scrollY
 
      // 点击屏幕以外
      if (!queryPtInPolygon(x, y, [this.a, this.b, this.c, this.d, this.a])) {
        return this.$message({
          message: 'Please move in the room',
          type: 'warning'
        })
      }
      //初始化
      this.userPrePosition = JSON.parse(JSON.stringify(this.userPosition))
      //鼠标位置和原来位置的距离
      const distance = get(x, y, this.userPrePosition.left, this.userPrePosition.top)
       console.log(distance);
      const time = ((speed=80)=> distance / speed)()
      // document.querySelector('.user').style.transition  = 'all 0.2s linear'
      //当前用户朝向
      this.userPosition.direction = this.getAngle(this.userPrePosition.left, -this.userPrePosition.top, x, -y)
      const xD = (x - this.userPrePosition.left) / time; const yD = (y - this.userPrePosition.top) / time
      let limeit = 0
      //？
      const signle = this.getRealForward(x, y, this.userPrePosition.left, this.userPrePosition.top)
      // this.timerFunction2(xD,yD,signle,limeit,time,x,y);
      window.timerClick = setInterval(() => {
        limeit += 0.1
        this.timerFunction2(xD, yD, signle, limeit, time, x, y)
        if (limeit >= time) {
          window.clearInterval(window.timerClick)
          window.timerClick = null
        }
      }, 100)
    },
    // 判断点击长按拖拽
    handleMove(event) {
      if (event.target.className !== 'boxImg') return
      this.mouseDownTime = new Date().getTime()
      window.timeOutTimer = setTimeout(() => {
        // console.log(this.isClick,'sssssssssss')
        if (!this.isClick) {
          // this.timerFunction(event)
          this.goMoveForward(event)
          document.onmousemove = (e) => {
            this.isClick = false
            window.clearTimeout(window.timeOutTimer)
            this.goMoveForward2(e)
          }
        }
      }, 200)

      document.onmouseup = (e) => {
        window.clearTimeout(window.timeOutTimer)
        window.clearInterval(window.timerClick)
        window.timerClick = null
        window.clearInterval(window.timerClick2)
        window.timerClick2 = null

        //大于200毫秒以外判断为
        if (new Date().getTime() - this.mouseDownTime > 200) { // 长按或者拖拽
          console.log('长按')
          this.isClick = false
        } else { // 点击事件
          this.getMousePos(e)
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    // 拖拽
    goMoveForward2(e) {
      window.clearInterval(window.timerClick)
      window.clearInterval(window.timerClick2)
      const previous = JSON.parse(JSON.stringify(this.previous))// throttle 500ms updateSelfPosition
      const date = new Date().getTime()
      // console.log(date - previous ,"date==")
      // console.log(previous ,"date==")
      this.userPrePosition = JSON.parse(JSON.stringify(this.userPosition))
      var scrollX = JSON.parse(JSON.stringify(this.translatex))
      var scrollY = JSON.parse(JSON.stringify(this.translatey))
      // var x = (e.pageX || e.clientX) + scrollX;
      var x = (e.pageX || e.clientX) + scrollX - this.offset
      var y = (e.pageY || e.clientY) + scrollY
      // console.log(x,y,"ssssssssssss")
      const direction = this.getAngle(this.userPrePosition.left, -this.userPrePosition.top, x, -y)
      this.userPosition.direction = direction
      if (date - previous >= 100) {
        const xD = 8 * Math.cos((direction - 90) / 180 * Math.PI); const yD = 8 * Math.sin((direction - 90) / 180 * Math.PI)
        if (queryPtInPolygon(this.userPosition.left + xD, this.userPosition.top + yD, [this.a, this.b, this.c, this.d, this.a])) {
          this.userPosition.left += xD
          this.userPosition.top += yD
          const signle = this.getRealForward(x, y, this.userPrePosition.left, this.userPrePosition.top)
          this.moveBackground(this.userPosition.left, this.userPosition.top)
          const mockLocalUserNewPosition = {
            position: [this.getVector(this.userPosition.left, this.userPosition.top).x, this.getVector(this.userPosition.left, this.userPosition.top).y, 1],
            forward: [Number(Math.cos(signle.forward).toFixed(2)), Number(Math.sin(signle.forward).toFixed(2)), 0],
            right: [Number(Math.cos(signle.right).toFixed(2)), Number(Math.sin(signle.right).toFixed(2)), 0],
            up: [0, 0, 1]
          }
          this.userPosition.rightvector = mockLocalUserNewPosition.right
          this.userPosition.vector = mockLocalUserNewPosition.forward
          this.userPosition.position = mockLocalUserNewPosition.position
          this.client.sendStreamMessage(stringToUint8Array(JSON.stringify({
            userPosition: this.userPosition
          })))
          this.previous = date
          // console.log("user=",this.getVector(x,y))
          this.extension.updateSelfPosition(
            mockLocalUserNewPosition.position,
            mockLocalUserNewPosition.forward,
            mockLocalUserNewPosition.right,
            mockLocalUserNewPosition.up
          )
          this.isPlay(mockLocalUserNewPosition.position[0], mockLocalUserNewPosition.position[1])
          this.isPlayUser(mockLocalUserNewPosition.position[0], mockLocalUserNewPosition.position[1])
          this.client.sendStreamMessage(stringToUint8Array(JSON.stringify({
            userPosition: this.userPosition
          })))
        } else {
          Message.closeAll()
          return this.$message({
            message: 'Please move in the room',
            type: 'warning'
          })
        }
      }
      // 如果100ms没有触发onmousemove事件，切换长按事件
      window.timerClick2 = setTimeout(() => {
        this.goMoveForward(e)
        // this.timerFunction(e)
        // console.log(e,'ssss')
      }, 100)
    },
    // 长按逻辑
    timerFunction(event) {
      var e = event || window.event
      const odiv = document.querySelector('.user')
      odiv.style.cursor = 'pointer'
      this.userPrePosition = JSON.parse(JSON.stringify(this.userPosition))
      var scrollX = JSON.parse(JSON.stringify(this.translatex))
      var scrollY = JSON.parse(JSON.stringify(this.translatey))
      var x = (e.pageX || e.clientX) + scrollX - this.offset
      var y = (e.pageY || e.clientY) + scrollY
      const direction = this.getAngle(this.userPrePosition.left, -this.userPrePosition.top, x, -y)
      this.userPosition.direction = direction
      const xD = 8 * Math.cos((direction - 90) / 180 * Math.PI); const yD = 8 * Math.sin((direction - 90) / 180 * Math.PI)
      const signle = this.getRealForward(x, y, this.userPrePosition.left, this.userPrePosition.top)
      if (queryPtInPolygon(this.userPosition.left + xD, this.userPosition.top + yD, [this.a, this.b, this.c, this.d, this.a])) {
        this.userPosition.left += xD
        this.userPosition.top += yD
        const pos = this.getVector(this.userPosition.left, this.userPosition.top)
        this.moveBackground(this.userPosition.left, this.userPosition.top)
        // console.log("user=",pos)
        const mockLocalUserNewPosition = {
          position: [pos.x, pos.y, 1],
          forward: [Number(Math.cos(signle.forward).toFixed(2)), Number(Math.sin(signle.forward).toFixed(2)), 0],
          right: [Number(Math.cos(signle.right).toFixed(2)), Number(Math.sin(signle.right).toFixed(2)), 0],
          up: [0, 0, 1]
        }
        this.extension.updateSelfPosition(
          mockLocalUserNewPosition.position,
          mockLocalUserNewPosition.forward,
          mockLocalUserNewPosition.right,
          mockLocalUserNewPosition.up
        )
        this.userPosition.rightvector = mockLocalUserNewPosition.right
        this.userPosition.vector = mockLocalUserNewPosition.forward
        this.userPosition.position = mockLocalUserNewPosition.position
        this.isPlay(mockLocalUserNewPosition.position[0], mockLocalUserNewPosition.position[1])
        this.isPlayUser(mockLocalUserNewPosition.position[0], mockLocalUserNewPosition.position[1])
        this.client.sendStreamMessage(stringToUint8Array(JSON.stringify({
          userPosition: this.userPosition
        })))
      } else {
        Message.closeAll()
        return this.$message({
          message: 'Please move in the room',
          type: 'warning'
        })
      }
    },
    // 切换长按事件
    goMoveForward(event) {
      window.clearInterval(window.timerClick)
      window.timerClick = setInterval(() => {
        this.timerFunction(event)
      }, 100)
    },
    getAngle(px, py, mx, my) { // 获得人物中心和鼠标坐标连线，与x轴正半轴之间的夹角
      var x = mx - px
      var y = my - py
      var radina = Math.atan2(y, x)// 用反三角函数求弧度
      var angle = (180 / Math.PI * radina)// 将弧度转换成角度
      return -(angle - 90)
    },
    // 同步远端用户降噪设置（没在用）
    async setAins(value, npc) {
      if (this.settingData[npc].processorAi) {
        if (value == 'off') {
          await this.settingData[npc].processorAi.disable()
        } else if (value == 'medium') {
          await this.settingData[npc].processorAi.setNsParams(
            {
              attackFactor: 0.9,
              releaseFactor: 0.85,
              upperBound: 0.9,
              upperMask: 1.0,
              lowerBound: 0.08,
              lowerMask: 0.05,
              triangle1: 0.0,
              triangle2: 0.0,
              triangle3: 1.0,
              thresholdAI: 1.0,
              thresholdStastical: 0.0,
              enhFactorAI: 1.0,
              enhFactorStastical: 2.0,
              noiseOverEstimate: 1.101,
              statisticalBound: 0.0,
              gainBoostFrq1: 120.0,
              gainBoostGain1: 1.0,
              gainBoostFrq2: 1600.0,
              gainBoostGain2: 1.0,
              gainBoostFrq3: 5000.0,
              gainBoostGain3: 1.121,
              finalLowerMask: 0.03,
              noisePowFloor: 0.0001,
              statisticalComplexity: 0,
              cngBaseMagnitude: 0.0,
              strategy: 0
            })
          await this.settingData[npc].processorAi.enable()
        } else if (value == 'high') {
          await this.settingData[npc].processorAi.setNsParams(
            {
              attackFactor: 0.92,
              releaseFactor: 0.9,
              upperBound: 0.9,
              upperMask: 1,
              lowerBound: 0.015,
              lowerMask: 0.006,
              triangle1: 0,
              triangle2: 0,
              triangle3: 1,
              thresholdAI: 1,
              thresholdStastical: 0,
              enhFactorAI: 1,
              enhFactorStastical: 2,
              noiseOverEstimate: 1.101,
              statisticalBound: 0,
              gainBoostFrq1: 120.0,
              gainBoostGain1: 1.0,
              gainBoostFrq2: 1600.0,
              gainBoostGain2: 1.0,
              gainBoostFrq3: 5000.0,
              gainBoostGain3: 1.121,
              finalLowerMask: 0.008,
              noisePowFloor: 0.000001,
              statisticalComplexity: 0,
              cngBaseMagnitude: 0.0,
              strategy: 0
            })
          await this.settingData[npc].processorAi.enable()
        }
      }
      this.$refs[npc][0].changes(value)
      this.settingData[npc].ains = value
    },
    // npc空间音效设置
    async saveSetting(data) {
      // console.log(data)
      this.settingData[data.npc].factor = data.factor
      this.settingData[data.npc].voice = data.voice
      this.settingData[data.npc].absorb = data.absorb
      if (data.ains) {
        await this.setAins(data.ains, data.npc)
        this.client.sendStreamMessage(stringToUint8Array(JSON.stringify({
          npc: data.npc,
          value: data.ains,
          isSetAins: true
        })))
      }
      this.settingData[data.npc].processor.updateSpatialAttenuation(data.factor / 100)
      this.settingData[data.npc].processor.updateSpatialBlur(data.voice)
      this.settingData[data.npc].processor.updateSpatialAirAbsorb(data.absorb)
    },
    // 判断哪些角色和本地播放器距离400px，开启processor音量
    isPlay(a, b) {
      let x, y
      if (!a || !b) {
        x = this.userPosition.position[0]
        y = this.userPosition.position[1]
      } else {
        x = a; y = b
      }
      const settingData = this.settingData
      Object.keys(settingData).forEach((item, i) => {
        // console.log(get(x,y,settingData[item].position[0],settingData[item].position[1]),'user==' + item)
        // console.log(x,y,settingData[item].position[0],settingData[item].position[1],'user==' + item)

        if (settingData[item].track) {
          if (get(x, y, settingData[item].position[0], settingData[item].position[1]) > 50) {
            settingData[item].track.setVolume(0)
          } else {
            settingData[item].track.setVolume(500)
          }
        }
      })
    },
    // 检测用户距离
    isPlayUser(a, b) {
      const remoteUsers = this.remoteUsers
      if (remoteUsers == {}) return
      let x, y
      if (!x || !y) {
        x = this.userPosition.position[0]
        y = this.userPosition.position[1]
      } else {
        x = a; y = b
      }
      // console.log('用户检测')
      Object.keys(remoteUsers).forEach((item, i) => {
        // console.log(get(x,y,remoteUsers[item].position[0],remoteUsers[item].position[1]),"s======")
        if (remoteUsers[item].track) {
          if (get(x, y, remoteUsers[item].position[0], remoteUsers[item].position[1]) > 50) {
            remoteUsers[item].track.setVolume(0)
          } else {
            remoteUsers[item].track.setVolume(100)
          }
        }
      })
    },
    // 创建线程
    create(f) {
      var blob = new Blob(['(' + f + ')()'])
      var url = window.URL.createObjectURL(blob)
      var worker = new Worker(url)
      return worker
    },
    createWorker(callback, time) {
      this.pollingWorker = this.create(`function (e) {
          setInterval(function () {
              this.postMessage(null)
          }, ${time})
      }`)
      this.pollingWorker.onmessage = callback
    },
    stopWorker(vm) {
      try {
        vm && vm.terminate()
      } catch (err) {
        console.log(err)
      }
    },
    // 键盘事件
    onkeyDown(e) {
      if (!this.isLongKeyDown) {
        window.keyDownTimer = setTimeout(() => {
          this.isLongKeyDown = true
        }, 200)
      }
      if (this.isLongKeyDown) {
        const date = new Date().getTime()
        const previous = JSON.parse(JSON.stringify(this.previous))// throttle 500ms updateSelfPosition
        if (date - previous >= 100) {
          if ([37, 38, 39, 40, 65, 87, 68, 83].includes(e.keyCode)) {
            let x = 0; let y = 0; let direction
            if (e.keyCode === 37 || e.keyCode === 65) {
              x -= 5
              direction = -90
            } else if (e.keyCode === 38 || e.keyCode === 87) {
              y -= 5
              direction = 0
            } else if (e.keyCode === 39 || e.keyCode === 68) {
              x += 5
              direction = 90
            } else if (e.keyCode === 40 || e.keyCode === 83) {
              y += 5
              direction = 180
            }
            if (!queryPtInPolygon(this.userPosition.left + x, this.userPosition.top + y, [this.a, this.b, this.c, this.d, this.a])) {
              Message.closeAll()
              return this.$message({
                message: 'Please move in the room',
                type: 'warning'
              })
            } else {
              this.userPosition.direction = direction
              const signle = this.getRealForward(this.userPosition.left + x, this.userPosition.top + y, this.userPosition.left, this.userPosition.top)
              this.timerFunction2(x, y, signle, 2, 1, this.userPosition.left + x, this.userPosition.top + y)
            }
          }
          window.clearInterval(window.timerClick)
          window.clearInterval(window.timerClick2)
        }
      }
    },
    onkeyUp(e) {
      window.clearTimeout(window.keyDownTimer)
      this.isLongKeyDown = false
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .user-box{
    height: calc(100vh - 80px);
    width: 100vw;
    position: relative;
    overflow: hidden;
    .scene{
      position: relative;
      margin: 0 auto;
      transition: all .2s linear;
      height: 1460px;
      width: 2250px;
      overflow: hidden;
      .boxImg{
        width: 100%;
        height: 100%;
      }
      .waiter{
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
        perspective: 1000;
        z-index: 1;
        position: absolute;
        width: 44px;
        height: 110px;
        transition: all .2s;
        transition-timing-function: linear;
        img{
          width: 100%;
          height: 100%;
        }
        .paulSetting{
          position: absolute;
          top: -30px;
          left: -50px;
          z-index: 10;
        }
        // transform:rotate(180edg);
      }
    }
    .nameTitle{
      position: absolute;
      width: 139px;
      height: 20px;
      // z-index: 10;
    }
    .user{
      position: absolute;
      width: 56px;
      height: 112px;
      z-index: 9;
      -webkit-transform: translateZ(0);
      -moz-transform: translateZ(0);
      -ms-transform: translateZ(0);
      -o-transform: translateZ(0);
      transform: transnlateZ(0);
      transition: all 0.1s linear;
      .personImg{
        // width: 68px;
        // height: 111px;
        width: 56px;
        height: 112px;
      }
      .name{
        position: absolute;
        top: -20px;
        left: -28px;
        text-align: center;
        width: 120px;
        height: 20px;
        background: rgba(255,255,255,0.7000);
        box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.2000);
        border-radius: 12px;
        z-index: 111;
        line-height: 20px;
      }
      .line{
        position: absolute;
        top: -65px;
        left: 0px;
        height: 65px;
        width: 50px;
        // background: url('../assets/__3.gif') 0 0 no-repeat;
        // background-size: 100%;
        transform-origin:28px  120px;
        // transition: all .2s linear;
      }
    }
    .remoteUser{
      position: absolute;
      width: 56px;
      height: 91px;
      z-index: 2;
      transition: all .1s;
      transition-timing-function: linear;
      .personImg{
        width: 56px;
        height: 91px;
      }
      .name{
        position: absolute;
        top: -25px;
        left: -28px;
        text-align: center;
        width: 120px;
        height: 20px;
        background: rgba(255,255,255,0.7000);
        box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.2000);
        border-radius: 12px;
        z-index: 111;
        line-height: 20px;
      }
      .line{
        position: absolute;
        top: -65px;
        left: 0px;
        height: 65px;
        width: 50px;
        background: url('../assets/__3.gif') 0 0 no-repeat;
        background-size: 100%;
        transform-origin:28px  120px;
        // transition: all .2s linear;
      }
    }
  }
}
</style>
<style>
  .paulSetting .dialog .content{
    position: fixed;
  }
</style>
