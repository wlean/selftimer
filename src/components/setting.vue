<template>
  <div id="setting">
    <Button @click="show" type="default" icon="ios-settings"></Button>
    <Drawer v-if="!user" title="setting" :closable="false" v-model="open" placement="left">
      <Row><Input v-model="serverUrl">
        <span slot="prepend">url</span>
      </Input></Row>
    </Drawer>
    <Drawer v-else title="setting" :closable="false" v-model="open" placement="left">
      <p>config: {{ workDuration }}</p>
      <Row><Input v-model="workDuration" type="number">
        <span slot="prepend">focus</span>
        <span slot="append">Min</span>
      </Input></Row>
      <br>
      <Row><Input v-model="restDuration" type="number">
        <span slot="prepend">short rest</span>
        <span slot="append">Min</span>
      </Input></Row>
      <br>
      <Row>
        <Input v-model="longRestDuration" type="number">
          <span slot="prepend">long rest</span>
          <span slot="append">Min</span>
        </Input>
        <Input v-model="shortRestTimes" type="number">
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
      serverUrl: '',
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
    user: null,
  },
  methods: {
    show(){
      let self = this;
      self.open = true;
    },
    
  },
  watch:{
    serverUrl(val, oldval){
      let self = this;
      self.$selftimer.serverUrl = val;
    },
    workDuration(val, oldval){
      let self = this;
      self.$selftimer.setConfig({workDuration:val})
      .then(config=>self.$Message.success(`config update`))
      .catch(err=>self.$Message.error(err));
    },
    restDuration(val, oldval){
      let self = this;
      self.$selftimer.setConfig({restDuration:val})
      .then(config=>self.$Message.success(`config update`))
      .catch(err=>self.$Message.error(err));
    },
    longRestDuration(val, oldval){
      let self = this;
      self.$selftimer.setConfig({longRestDuration:val})
      .then(config=>self.$Message.success(`config update`))
      .catch(err=>self.$Message.error(err));
    },
    shortRestTimes(val, oldval){
      let self = this;
      self.$selftimer.setConfig({shortRestTimes:val})
      .then(config=>self.$Message.success(`config update`))
      .catch(err=>self.$Message.error(err));
    },
    workBGM(val, oldval){
      let self = this;
      self.$selftimer.setConfig({workBGM:val})
      .then(config=>self.$Message.success(`config update`))
      .catch(err=>self.$Message.error(err));
    },
    playWorkBGM(val, oldval){
      let self = this;
      self.$selftimer.setConfig({playWorkBGM:val})
      .then(config=>self.$Message.success(`config update`))
      .catch(err=>self.$Message.error(err));
    },
    restBGM(val, oldval){
      let self = this;
      self.$selftimer.setConfig({restBGM:val})
      .then(config=>self.$Message.success(`config update`))
      .catch(err=>self.$Message.error(err));
    },
    playRestBGM(val, oldval){
      let self = this;
      self.$selftimer.setConfig({playRestBGM:val})
      .then(config=>self.$Message.success(`config update`))
      .catch(err=>self.$Message.error(err));
    },
  },
  mounted() {
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
