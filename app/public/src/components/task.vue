<template>
  <div id="task">

    <Input
      type="text"
      name="tasktitle"
      id="tasktitle" 
      v-model.trim="tasktitle" 
      v-on:keyup.enter="addTask" 
      clearable
      style="width: 500px">
      <span slot="prepend">task title</span>
      <Select slot="append" 
      v-model="masterid" 
      v-show="/\^/.test(tasktitle)" 
      v-on:change='chooseMaster()'>
        <Option
          v-for="task in tasks"
          v-if="!task.is_done"
          v-bind:value="task.id"
          :key="task.id">
          {[ task.title ]}
        </Option>
      </Select>
    </Input>
    <div v-if="tasks.length" id="tasks">
      <ol v-bind:style="{ 'list-style-type': 'none' }">
        <li v-for="task in tasks" 
        v-bind:style="{ 'list-style-type': 'none', color:task.is_done?'lightgray':'DimGray' }" 
        v-on:click='showTask(task.id)'
        :key="task.id">
          {{ task.title }} {{ task.duration }}
        </li>
      </ol>
    </div>
    <p v-else>no tasks</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tasks: [],
    }
  },
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
  },
  mounted: function(){
    this.getTasks();
  },
}
</script>
<style>

</style>
