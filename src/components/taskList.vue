<template>
  
  <Collapse v-model="nowid" accordion v-if="tasks.length" id="tasks">
    <Panel 
    v-if="doing"
    id="doing"
    style="{ 'background-color': #5cb85c }"
    name="doing"
    :key="doing.id"
    hide-arrow=true>
      {{ doing.title }}  {{ doing.duration }}
      <p slot="content">
        <TaskDetail v-if="nowid==doing.id" :taskid="doing.id"/>
      </p>
    </Panel>
    <Panel v-for="task in tasks"
    :style="{ 'background-color': task.is_done?'lightgray':'' }"
    :name="task.id"
    :key="task.id"
    hide-arrow=true>
      {{ task.title }}  {{ task.duration }}
      <p slot="content">
        <TaskDetail v-if="nowid==task.id" :taskid="task.id"/>
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
      doing: null,
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
