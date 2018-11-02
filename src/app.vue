<template>
  <div id="app">
    <Layout>
      <Setting/>

      <Header class="header" style="background-color: #2e7bcf">
		    {{ appname }}
      </Header>

      <Content>
        <Login/>
      </Content>

      <Footer class="footer">©wlpking</Footer>
    </Layout>
	</div>
</template>
<script>
import Login from './components/login.vue';
import Setting from './components/setting.vue';

export default {
  data() {
    return {
      appname: 'selftimer',
    }
  },
  components: { Login, Setting },
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
  }
</style>
