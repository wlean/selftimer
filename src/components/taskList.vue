<template>
  
  <Collapse v-model="nowid" accordion v-if="tasks.length" id="tasks" simple>
    <Panel v-for="task in tasks"
    :style="{ 'background-color': task.is_done?'lightgray':'' }"
    :name="task.id"
    :key="task.id"
    hide-arrow=true>
      {{ task.title }}  {{ task.id }}
      <p slot="content">
        <TaskDetail v-if="nowid==task.id" :taskId="task.id"/>
      </p>
    </Panel>
  </Collapse>
  <p v-else>no tasks</p>
</template>
<script>
import TaskDetail from './taskDetail.vue';

export default {
  props:{
    tasks: [],
  },
  data(){
    return {
      nowid: '',
    }
  },
  methods:{
    showTask(id){
      let self = this;
      self.$http
      .get(`/tasks/${id}/?_csrf=${_csrf}`)
      .then(function(res){
          self.now = res.body;
          self.nowid = id;
      },function(){
          
      });
    }
  },
  components: { TaskDetail }
}
</script>
<style>
#tasks {
  text-align: left;
}
</style>
