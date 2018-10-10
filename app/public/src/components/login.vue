<template>
  <div v-if="user" id="login">
    <br>
    <User :user="user" v-on:logout="logout"/>
    <Task/>
  </div>
  <!-- login or register -->
  <div v-else id="login">

    <Input 
    type="text" 
    name="username" 
    id="username" 
    v-model="username" 
    class="center"
    style="width: 200px">
      <span slot="prepend">username</span>
      <!-- <span slot="append"></span> -->
    </Input>
    <Input 
    type="password" 
    name="pwd" 
    id="pwd" 
    v-model="pwd" 
    class="center"
    style="width: 200px">
      <span slot="prepend">password</span>
    </Input>
    <Button v-on:click="register" shape="circle" type="info">register</Button>
    <Button v-on:click="login" shape="circle" type="success">login</Button>
  </div>
</template>
<script>
import Task from './task.vue';
import User from './user.vue';

export default {
  data() {
    return {
      user: window.user,
      username: '',
      pwd: '',
      message: '',
    }
  },
  components: { Task, User },
  methods: {
    login:function(){
      let self = this;
      console.log(user);
      self.$http
      .post(`/login?_csrf=${ window._csrf }`,{
        username: self.username,
        pwd: self.pwd
      })
      .then(function(res){
        self.user = res.body;
        self.$Message.success(`welcome ${self.user.username}`);
      },function(){
          self.message = 'unavailable username or password';
      });
    },
    register:function(){
      let self = this;
      self.$http
      .post(`/users?_csrf=${ window._csrf }`,{
        username: self.username,
        pwd: self.pwd
      })
      .then(function(res){
          self.$Message.success(`register ok, you can login by ${res.body.username}`);
      },function(){
          console.log('请求失败处理');
      });
    },
    logout:function(){
      window.user = null;
      this.user = null;
    },
  }
}
</script>
<style>
.center {
  margin-left: auto;
  margin-right: auto;
}
#login {
  text-align: center;
}
</style>
