<template>
  <Spin fix v-if="loading">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
  </Spin>
  <Circle
  v-else
  :size="250"
  :trail-width="4"
  :stroke-width="5"
  :percent="now.percent"
  stroke-linecap="square"
  stroke-color="#43a3fb">
    <div class="demo-Circle-custom">
        <h1>{{ now.title }}</h1>
        <p>total duration:{{ total.duration }}</p>
        <p>children tasks:{{ tasks.length-1 }}</p>
        <Button type="primary" 
        shape="circle" 
        icon="ios-play"
        size="large"
        title="start"></Button>
    </div>
  </Circle>
</template>
<script>
export default {
  props:{
    taskId:'',
  },
  data(){
    return {
      loading: true,
      now: '',
      tasks: [],
      total: {
        duration: 0,
      },
    };
  },
  methods:{

  },
  mounted(){
    let self = this;
    self.$selftimer.taskInfo(self.taskId)
    .then(tasks=>{
      self.tasks = tasks;
      self.tasks.forEach(task=>{
        if(task.id == self.taskId){
          self.now = task;
          let wd = self.$selftimer.config.workDuration;
          self.now.percent=(task.duration%(wd*60))*100/(wd*60);
        }
        self.total.duration = self.total.duration+task.duration;
      });
      self.loading = false;
    })
    .catch(err=>self.$Message.error(err));
  }
}
</script>
<style>

</style>
