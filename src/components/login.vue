<template>
<Row type="flex" justify="center">
  <Col span="6">
  
    <!-- login or register -->
    <div id="login">

      <Input 
      type="text" 
      name="username" 
      id="username" 
      v-model="username"
      class="slef-input">
        <span slot="prepend">username</span>
        <!-- <span slot="append"></span> -->
      </Input>
      <Input 
      type="password" 
      name="pwd" 
      id="pwd" 
      v-model="pwd"
      class="slef-input">
        <span slot="prepend">password</span>
      </Input>
      <Button v-on:click="register" shape="circle" type="info">register</Button>
      <Button v-on:click="login" shape="circle" type="success">login</Button>
    </div>
  </Col>
</Row>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      pwd: '',
      message: '',
    }
  },
  methods: {
    login:function(){
      let self = this;
      self.$selftimer.login(self.username, self.pwd)
      .then((user)=>{
        self.$emit('login',user);
        self.$Message.success(`welcome ${user.username}`);
      })
      .catch(err=>self.$Message.error(err));
    },
    register:function(){
      let self = this;
      self.$selftimer.register(self.username, self.pwd)
      .then(()=>self.$Message.success(`register success`))
      .catch(err=>self.$Message.error(err));
    },
  }
}
</script>
<style>
#login {
  text-align: center;
}

.slef-input {
  margin: 10px 5px;
}
</style>
