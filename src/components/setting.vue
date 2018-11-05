<template>
  <div id="setting">
    <Button @click="show" type="default" icon="ios-settings"></Button>
    <Drawer title="setting" :closable="false" v-model="open" placement="left">
      <p>config: {{ workDuration }}</p>
      <Row><Input v-model="workDuration">
        <span slot="prepend">focus</span>
        <span slot="append">Min</span>
      </Input></Row>
      <br>
      <Row><Input v-model="restDuration">
        <span slot="prepend">short rest</span>
        <span slot="append">Min</span>
      </Input></Row>
      <br>
      <Row>
        <Input v-model="longRestDuration">
          <span slot="prepend">long rest</span>
          <span slot="append">Min</span>
        </Input>
        <Input v-model="shortRestTimes">
          <span slot="prepend">interval</span>
          <span slot="append">short rest</span>
        </Input>
      </Row>
      <br>
      <Row>
        <Input v-model="workBGM">
          <span slot="prepend">focus BGM</span>
          <Switch slot="append" size="large" v-model="playWorkBGM">
            <span slot="open">play</span>
            <span slot="close">close</span>
          </Switch>
        </Input>
      </Row>
      <br>
      <Row>
        <Input v-model="restBGM">
          <span slot="prepend">rest BGM</span>
          <Switch slot="append" size="large" v-model="playRestBGM">
            <span slot="open">play</span>
            <span slot="close">close</span>
          </Switch>
        </Input>
      </Row>
      
    </Drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
      workDuration : 15,
      restDuration : 5,
      longRestDuration : 15,
      shortRestTimes : 3,
      workBGM : [],
      playWorkBGM : false,
      restBGM : [],
      playRestBGM : false,
    };
  },
  props: {
  },
  methods: {
    show:function(){
      let self = this;
      self.open = true;
    },
    
  },
  mounted: function() {
    let self = this;
    self.$selftimer.getConfig()
    .then(config=>{
      self = Object.assign(self, config);
    })
  }
}
</script>

<style>
#setting {
  float: left;
}
</style>
