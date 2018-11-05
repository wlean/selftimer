<template>
  <div id="user">
    <Button @click="show" type="default" icon="ios-person" ></Button>
    <Drawer title="User Info" :closable="false" v-model="open">
      <div id="userInfo" v-if="userInfo">
        <p>username: {{ userInfo.username }}</p>
        <p>id: {{ userInfo.id }}</p>
        <p>password: {{ userInfo.pwd}}</p>
        <p>create time: {{ userInfo.createdAt}}</p>
        <Button v-on:click="logout" shape="circle" type="error">logout</Button>
      </div>

      <div id="userInfo" v-else>
        Can`t found user information.
      </div>
    </Drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
      userInfo: null,
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
      self.$selftimer.userInfo(self.user.username)
      .then((userInfo)=>{
        self.userInfo = userInfo;
        self.open = true;
      })
      .catch(err=>self.$Message.error(err));
    },
    logout:function(){
      let self = this;
      self.$selftimer.logout()
      .then(()=>{
        self.user = null;
        self.userInfo = null;
        self.open = false;
        self.$emit('logout');
      })
      .catch(err=>self.$Message.error(err));
    },
  },
}
</script>

<style>
#user {
  float: right;
}
</style>
