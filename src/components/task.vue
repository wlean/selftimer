<template>
  <div id="task">

    <TaskInput :tasks="tasks" v-on:addTask="addTask"/>
    <TaskList :tasks="tasks" />
  </div>
</template>
<script>
import TaskList from './taskList.vue';
import TaskInput from './taskInput.vue';
export default {
  data() {
    return {
      tasks: [],
    }
  },
  components: { TaskList, TaskInput },
  methods: {
    getTasks:function(){
      let self = this;
      self.$http
      .get(`/tasks?&_csrf=${window._csrf}`)
      .then(function(res){
        self.tasks = res.body;
      },function(){
          self.message = 'unavailable userid';
      });
    },
    addTask(task){
      this.tasks.unshift(task);
    },
  },
  mounted: function(){
    this.getTasks();
  },
}
</script>
<style>

</style>
