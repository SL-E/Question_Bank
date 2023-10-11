import { makeAutoObservable } from 'mobx';   
  
class UserStore { 
  constructor() {
    makeAutoObservable(this);
  }
  isLogin = false;  
  userInfo = {};

  changeLoginStatus(newStatus) {  
    this.isLogin = newStatus;
  }  
  
  setUserInfo(userInfo) {
    this.userInfo = userInfo;
  }
  
}  
   
export default new UserStore();