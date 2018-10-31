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
        restBGM : [],
        playWorkBGM : false,
        playRestBGM : false,
        playing : {

        }
      },
      users : {},
      tasks : [],
      setConfig : function(config){
        let self = this;
        if(!self.serverUrl) {
          self.config = Object.assign(self.config, config);
          return Promise.resolve();
        }
        return self.$http.put(`${self.serverUrl}/config`)
        .then(function(res){
          self.$Message.success(`set config success`);
          return Promise.resolve();
        },function(error){
          console.error(error);
          self.$Message.error(`set config failed`);
          return Promise.reject(error);
        });
      },
      getConfig : function(){
        let self = this;
        if(!self.serverUrl) return self.config;
        return self.$http.get(`${self.serverUrl}/config`)
        .then(function(res){
          self.config = res.body;
          self.$Message.success(`get config success`);
          return Promise.resolve(res.body);
        },function(error){
          console.error(error);
          self.$Message.error(`get config failed`);
          return Promise.reject(error);
        });
      },
      getTasks : function(){
      },
      addTasks : function(){
        
      },
      register : function(username, pwd){
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
      login : function(username, pwd){
        let self = this; 
        if(self.serverUrl) return selftimer.$http.get(`${self.serverUrl}/login`)
        .then(function(res){
          return Promise.resolve(res.body);
        });
        if(!self.users[username] || !self.users[username]===pwd) return Promise.reject(`login failed : username or password error`)
        return Promise.resolve({
          username,
          pwd,
        });
      },
      sync : function(){
        
      },
    }
  }
}