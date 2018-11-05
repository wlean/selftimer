<template>
  
  <Collapse v-model="nowid" accordion v-if="tasks.length" id="tasks" simple>
    <panel v-for="task in tasks"
    :style="{ 'background-color': task.is_done?'lightgray':'' }"
    :name="task.id"
    :key="task.id"
    hide-arrow=true>
      {{ task.title }}  {{ task.id }}
      <TaskDetail slot="content" v-if="nowid==task.id" :taskId="task.id"/>
    </panel>
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
      nowid: '1',
    }
  },
  components: { TaskDetail },
  methods:{
  },
}
</script>
<style>
#tasks {
  text-align: left;
}
</style>
