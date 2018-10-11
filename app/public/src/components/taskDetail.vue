<template>
  <i-circle
    :size="500-32"
    :trail-width="4"
    :stroke-width="5"
    :percent="master.percent"
    stroke-linecap="square"
    stroke-color="#43a3fb">
    <div class="demo-Circle-custom">
        <h1>{{ master.title }}</h1>
        <p>total duration:{{ total.duration }}</p>
        <p>children tasks:{{ tasks.length-1 }}</p>
        <Button type="primary" 
        shape="circle" 
        icon="ios-play"
        size="large"
        title="start"></Button>
    </div>
  </i-circle>
</template>
<script>
export default {
  props:{
    taskid:'',
  },
  data(){
    return {
      master: '',
      tasks: [],
      total: {
        duration: 0,
      },
    };
  },
  methods:{

  },
  mounted: function(){
    let self = this;
    self.$http
    .get(`/tasks/${self.taskid}/?_csrf=${window._csrf}`)
    .then(function(res){
        self.tasks = res.body;
        self.tasks.forEach(task=>{
          if(task.id == self.taskid){
            self.master = task;
            self.master.percent=(task.duration%(15*60))*100/(15*60);
            console.log(self.master.percent);
          }
          self.total.duration = self.total.duration+task.duration;
        })
    },function(){
        
    });
  }
}
</script>
<style>

</style>
