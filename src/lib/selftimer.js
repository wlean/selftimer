export default {
  install(Vue, options) {
    // Vue.prototype.$selftimer = function(){};
    Vue.prototype.$selftimer = {
      serverUrl : '',
      config : {
        workDuration : 15,
        restDuration : 5,
        longRestDuration : 15,
        shortRestTimes : 3,
        workBGM : [],
        playWorkBGM : false,
        restBGM : [],
        playRestBGM : false,
      },
      playing : null,
      users : {},
      tasks : {},
      user : '',
      setConfig(config){
        let self = this;
        self.config = Object.assign(self.config, config);
        if(self.serverUrl) return self.$http.put(`${self.serverUrl}/config`);
        return Promise.resolve();
      },
      getConfig(){
        let self = this;
        if(self.serverUrl) return self.$http.get(`${self.serverUrl}/config`)
        .then(function(res){
          self.config = res.body;
          self.$Message.success(`get config success`);
          return Promise.resolve(res.body);
        });
        return Promise.resolve(self.config);
      },
      getTasks(){
        let self = this;
        if(self.serverUrl) return self.$http.get(`${self.serverUrl}/tasks`)
        .then(res=>{return Promise.resolve(res.body)});
        return Promise.resolve(self.tasks[self.user.username] || []);
      },
      addTask(task){
        let self = this;
        if(self.serverUrl) return self.$http.post(`${self.serverUrl}/tasks`,task)
        .then(res=>{
          self.tasks[self.user.username].unshift(res.body);
          return Promise.resolve(self.tasks[self.user.username]);
        });
        task = Object.assign(task, {
          duration: 0,
          isDone: false,
          userId: self.user.username,
          doneAt: null,
          createdAt: new Date(),
        });
        if(!self.tasks[self.user.username]) self.tasks[self.user.username] = [Object.assign(task,{
          id:'1' 
        })];
        else self.tasks[self.user.username].unshift(Object.assign(task, {
          id: `${self.tasks[self.user.username].length+1}`,
        }));
        return Promise.resolve(self.tasks[self.user.username]);
      },
      taskInfo(taskId) {
        let self = this;
        if(self.serverUrl) return self.$http.get(`${self.serverUrl}/tasks/${taskId}`)
        .then(res=>{
          return Promise.resolve(res.body);
        });
        let taskInfo = self.tasks[self.user.username].filter(val=>
          (val.id==taskId )|| (val.masterId == taskId)
        );
        return Promise.resolve(taskInfo);
      },
      register(username, pwd){
        let self = this; 
        if(self.serverUrl) return selftimer.$http.post(`${self.serverUrl}/register`,{
          username,
          pwd,
        })
        .then(function(res){
          return Promise.resolve(res.body);
        });
        if(self.users[username]) return Promise.reject(`user ${username} already been existed`);
        self.users[username] = pwd;
        return Promise.resolve();
      },
      login(username, pwd){
        let self = this; 
        if(self.serverUrl) return selftimer.$http.get(`${self.serverUrl}/login`)
        .then(function(res){
          self.user = res.body;
          return Promise.resolve(res.body);
        });
        if(!self.users[username] || !self.users[username]===pwd) return Promise.reject(`login failed : username or password error`)
        self.user = { username };
        return Promise.resolve({
          username
        });
      },
      userInfo(username) {
        let self = this;
        if(self.serverUrl) return selftimer.$http.get(`${self.serverUrl}/user/${username}`)
        .then(function(res){
          return Promise.resolve(res.body);
        });
        return Promise.resolve(self.user);
      },
      logout() {
        let self = this;
        self.user = null;
        if(self.serverUrl) return selftimer.$http.get(`${self.serverUrl}/logout`)
        .then(function(res){
          return Promise.resolve(res.body);
        });
        self.config = {
          workDuration : 15,
          restDuration : 5,
          longRestDuration : 15,
          shortRestTimes : 3,
          workBGM : [],
          playWorkBGM : false,
          restBGM : [],
          playRestBGM : false,
        };
        return Promise.resolve();
      },
      sync(){
        
      },
      loadTask(taskId, ...args){
        let self = this;
        self.playing = self.tasks[self.user.username][taskId];
        lala.emit('changePlayingTask', ...args);
      }
    }
  }
}