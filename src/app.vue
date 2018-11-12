<template>
  <div id="app">
    <Layout>

      <Affix>
      <Header class="header" style="background-color: #2e7bcf">
        <Setting :user="user"/>
		    {{ appname }}
        <User v-if="user" :user="user" v-on:logout="logout"/>
      </Header>
      </Affix>

      <Content>
        <Task v-if="user"/>
        <Login v-else v-on:login="login"/>
      </Content>

      <Playing v-if="user"/>
      <Footer class="footer">©wlpking</Footer>
    </Layout>
	</div>
</template>
<script>
import Login from './components/login.vue';
import Setting from './components/setting.vue';
import Task from './components/task.vue';
import User from './components/user.vue';
import Playing from './components/playing.vue';

export default {
  data() {
    return {
      user: '',
      appname: 'selftimer',
      height: screen.height,
    }
  },
  methods: {
    login(user){
      this.user = user;
    },
    logout(){
      this.user = null;
    }
  },
  components: { Login, Setting, Task, User, Playing },
}
</script>
<style>
  .header {
    font-size: xx-large;
    color: cornsilk;
    text-align: center;
    background-color: #2e7bcf;
  }

  .footer {
    text-align: center;
    margin-bottom: 100px;
  }
</style>
