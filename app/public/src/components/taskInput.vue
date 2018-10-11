<template>
<div id="task">
  <Input type="text"
  name="tasktitle"
  id="tasktitle" 
  v-model.trim="tasktitle" 
  v-on:keyup.native.enter="addTask" 
  clearable
  style="width: 500px">
    <span slot="prepend">task title</span>
    <Select
    v-show="/\^/.test(tasktitle)"
    v-model="masterid" 
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
      masterid: null,
    };
  },
  props:{
    tasks:[]
  },
  methods: {
    addTask:function(){
      let self = this;
      self.$http
      .post(`/tasks?_csrf=${window._csrf}`,{
        master_id: self.masterid,
        title: self.tasktitle
      })
      .then(function(res){
          self.$emit('addTask',res.body);
          self.masterid = null;
          self.tasktitle = '';
          self.$Message.success(`add task success`);
      },function(){
          
      });
    },
    chooseMaster(){
      console.log('master');
      let self = this;
      while(/\^/.test(self.tasktitle)){
        self.tasktitle = self.tasktitle.replace(/\^/,'');
      }
    },
  },
  watch:{
    masterid: function (val, oldVal) {
      let self = this;
      while(/\^/.test(self.tasktitle)){
        self.tasktitle = self.tasktitle.replace(/\^/,'');
      }
    },
  }
}
</script>
<style>

</style>
