<template>
<div id="taskInput">
  <Input type="text"
  name="tasktitle"
  id="tasktitle" 
  v-model.trim="tasktitle" 
  v-on:keyup.native.enter="addTask" 
  clearable>
    <span slot="prepend">task title</span>
    <Select
    v-show="/\^/.test(tasktitle)"
    v-model="masterId" 
    slot="append" 
    v-on:change='chooseMaster'>
      <Option
      v-for="task in tasks"
      v-if="!task.is_done"
      :value="task.id"
      :key="task.id">
        {{ task.title }}
      </Option>
    </Select> 
  </Input>
</div>
</template>
<script>
export default {
  data(){
    return {
      tasktitle: '',
      masterId: null,
    };
  },
  props:{
    tasks:[]
  },
  methods: {
    addTask(){
      let self = this;
      self.$emit('addTask',{
        masterId: self.masterId,
        title: self.tasktitle
      });
      self.masterId = null;
      self.tasktitle = null;
    },
  },
  watch:{
    masterId(val, oldVal) {
      let self = this;
      while(/\^/.test(self.tasktitle)){
        self.tasktitle = self.tasktitle.replace(/\^/,'');
      }
    },
  }
}
</script>
<style>
#taskInput {
  margin: 10px 0px;
}
</style>
