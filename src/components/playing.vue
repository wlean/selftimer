<template>
<Row id="playing">
  <Col span="2">
    <Tooltip
    id="playButton"
    placement="top"
    :content="playing?'stop':'start'"
    theme="light">
      <a style="color: aliceblue;" v-on:click="changeStatus"><Icon :type="!playing?'ios-play-outline':'ios-square-outline'" size="64" /></a>
    </Tooltip>
  </Col>
  <Col span="20">
    <h4>{{ task?task.title:'no task' }}</h4>
    <Progress :percent="percent" hide-info />
  </Col>
  <Col span="2">
    <a id="screenButton"
    style="color: aliceblue;"
    @click="screen">
      <Icon :type="!isFullScreen?'ios-expand':'ios-contract'" size="32" />
    </a>
  </Col>
</Row>  
</template>
<script>
export default {
  props: {
    taskId:'',
  },
  data() {
    return {
      playing: false,
      duration: 0,
      percent: 0,
      isFullScreen: false.playing,
      task: null,
      timer: null,
    };
  },
  methods: {
    changeTask(){
      let self = this;
      self.task = self.$selftimer.playing;
    },
    changeStatus() {
      let self = this;
      self.playing = !self.playing;
      if (self.playing && self.task)
        return self.timer = setInterval(() => {
          self.duration = self.duration + 1;
        }, 1000);
      if (self.playing) return self.playing = !self.playing;
      self.timer?clearInterval(self.timer):'';
    },
    screen(){
      if(this.isFullScreen) this.exitFullScreen();
      else this.fullScreen();
    },
    fullScreen() {
      let element = document.getElementById("playing");
      let requestMethod =
        element.requestFullScreen ||
        element.webkitRequestFullScreen || //谷歌
        element.mozRequestFullScreen || //火狐
        element.msRequestFullScreen; //IE11
      if (requestMethod) {
        requestMethod.call(element); //执行这个请求的方法
      } else if (typeof window.ActiveXObject !== "undefined") {
        //window.ActiveXObject判断是否支持ActiveX控件
        //这里其实就是模拟了按下键盘的F11，使浏览器全屏
        var wscript = new ActiveXObject("WScript.Shell"); //创建ActiveX
        if (wscript !== null) {
          //创建成功
          wscript.SendKeys("{F11}"); //触发f11
        }
      }
      this.isFullScreen = !this.isFullScreen;
    },
    exitFullScreen(){
      document.exitFullscreen?document.exitFullscreen():
      document.mozCancelFullScreen?document.mozCancelFullScreen():
      document.webkitExitFullscreen?document.webkitExitFullscreen():'';
      this.isFullScreen = !this.isFullScreen;
    },
  },
  watch: {
    duration(val, oldval) {
      this.percent = (val * 100) / (this.$selftimer.config.workDuration * 60);
    }
  },
  mounted() {
    let self = this;
    self.changeTask();
    lala.on('changePlayingTask',()=>{
      self.changeTask();
    });
  },
};
</script>
<style>
#playing {
  width: 100%;
  height: 64px;
  line-height: 100%;
  position: fixed;
  bottom: 0px;
  background-color: #2e7bcf;
}
#screenButton {
  float: right;
}
</style>
