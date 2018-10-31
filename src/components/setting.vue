<template>
  <div id="setting">
    <Button @click="show" type="primary" icon="ios-settings"></Button>
    <Drawer title="setting" :closable="false" v-model="open" placement="left">
      <p>config: {{ $selftimer.config }}</p>
    </Drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
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
}
</script>

<style>

</style>
