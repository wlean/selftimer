<template>
  <div id="setting">
    <Button @click="show" type="default" icon="ios-settings"></Button>
    <Drawer title="setting" :closable="false" v-model="open" placement="left">
      <p>config: {{ config.workDuration }}</p>
      <Row><Input v-model="config.workDuration" type="number">
        <span slot="prepend">focus</span>
        <span slot="append">Min</span>
      </Input></Row>
      <br>
      <Row><Input v-model="config.restDuration" type="number">
        <span slot="prepend">short rest</span>
        <span slot="append">Min</span>
      </Input></Row>
      <br>
      <Row>
        <Input v-model="config.longRestDuration" type="number">
          <span slot="prepend">long rest</span>
          <span slot="append">Min</span>
        </Input>
        <Input v-model="config.shortRestTimes" type="number">
          <span slot="prepend">interval</span>
          <span slot="append">short rest</span>
        </Input>
      </Row>
      <br>
      <Row>
        <Input v-model="config.workBGM">
          <span slot="prepend">focus BGM</span>
          <Switch slot="append" size="large" v-model="config.playWorkBGM">
            <span slot="open">play</span>
            <span slot="close">close</span>
          </Switch>
        </Input>
      </Row>
      <br>
      <Row>
        <Input v-model="config.restBGM">
          <span slot="prepend">rest BGM</span>
          <Switch slot="append" size="large" v-model="config.playRestBGM">
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
      config:{
        workDuration : 15,
        restDuration : 5,
        longRestDuration : 15,
        shortRestTimes : 3,
        workBGM : [],
        playWorkBGM : false,
        restBGM : [],
        playRestBGM : false,
      },
    };
  },
  props: {
  },
  methods: {
    show(){
      let self = this;
      self.open = true;
    },
    
  },
  watch:{
    config(val, oldval){
      let self = this;
      self.$selftimer.setConfig()
      .then(config=>self.$message.success(`config update`))
      .catch(err=>self.$Message.error(err));
    }
  },
  mounted() {
    let self = this;
    self.$selftimer.getConfig()
    .then(config=>{
      self.config = config;
    })
  }
}
</script>

<style>
#setting {
  float: left;
}
</style>
