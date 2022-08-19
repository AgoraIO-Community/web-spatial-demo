<!--
 * @Description: 请输入....
 * @Author: Gavin
 * @Date: 2022-08-16 12:00:26
 * @LastEditTime: 2022-08-16 14:01:51
 * @LastEditors: Gavin
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { SpatialAudioExtension } from 'agora-extension-spatial-audio'

export default {
  name: 'App',
  mounted() {
    // 日志输出 减少
    AgoraRTC.setLogLevel(4)
    // 注册空间音频插件
    window.extension = new SpatialAudioExtension({
      assetsPath: './external'
    })
    // 注册
    AgoraRTC.registerExtensions([window.extension])
    // window.denoiser = new AIDenoiserExtension({assetsPath:'./external'});
    // // 注册插件
    // AgoraRTC.registerExtensions([window.denoiser]);
    // // （可选）监听 Wasm 和 JS 文件加载失败的事件
    // window.denoiser.onloaderror = (e) => {
    //   // 如果 Wasm 和 JS 文件加载失败，你可以关闭插件，例如：
    //   // openDenoiserButton.enabled = false;
    //   console.log(e);
    // }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: PingFangSC-Regular, PingFang SC!important;

  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
body{
  margin: 0;
  height: 100%;
  width: 100%;
}
p{
  margin: 0;
  font-family: PingFangSC-Regular, PingFang SC!important;

}
span{
  font-family: PingFangSC-Regular, PingFang SC!important;

}
</style>
