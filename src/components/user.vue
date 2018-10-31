<template>
  <div id="user">
    <Button @click="show" type="primary" icon="ios-person" >{{ user.username }}</Button>
    <Drawer title="User Info" :closable="false" v-model="open">
      <p>username: {{ user.username }}</p>
      <p>id: {{ user.id }}</p>
      <p>password: {{ user.pwd}}</p>
      <p>create time: {{ user.createdAt}}</p>
      <Button v-on:click="logout" shape="circle" type="error">logout</Button>
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
    user:{
      type: Object,
      required: true
    },
  },
  methods: {
    show:function(){
      let self = this;
      self.$http
      .get(`/users/${self.user.id}?_csrf=${ window._csrf }`)
      .then(function(res){
        self.user = res.body;
        self.open = true;
      },function(){
          self.message = 'logout failed';
      });
    },
    logout:function(){
      let self = this;
      self.$http
      .get(`/logout?_csrf=${ window._csrf }`)
      .then(function(res){
        self.$Message.success(`bey ${self.user.username}`);
        self.open = false;
        self.$emit('logout');
      },function(){
          self.message = 'logout failed';
      });
    },
  },
}
</script>

<style>

</style>
