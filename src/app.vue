<template>
  <div id="app">
		<h1>{{ appname }} {{ _csrf }}</h1>
    <Login/>
	</div>
</template>
<script>
import Login from './components/login.vue';

export default {
  data() {
    return {
      appname: 'selftimer',
      _csrf: '',
    }
  },
  components: { Login },
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
