<template>
  <div id="app">
    <Setting/>
		<h1>{{ appname }}</h1>
    <Login/>
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
  #app {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  h1 {
    text-align: center;
  }
</style>
