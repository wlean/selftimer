<template>
<Row type="flex" justify="center">
  <Col span="8" id="task">
    <TaskInput :tasks="tasks" v-on:addTask="addTask"/>
    <TaskList :tasks="tasks" />
  </Col>
</Row>
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
      self.$selftimer.getTasks()
      .then(tasks=>self.tasks=tasks)
      .catch(err=>self.$Message.error(err));
    },
    addTask(task){
      let self = this;
      self.$selftimer.addTask(task)
      .then(tasks=>self.tasks=tasks)
      .catch(err=>self.$Message.error(err));
    },
  },
  mounted: function(){
    this.getTasks();
  },
}
</script>
<style>

</style>
