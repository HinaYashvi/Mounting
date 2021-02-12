// Initialize your app 
var $$ = Dom7;
var app = new Framework7({  
  root: '#app', // App root element
  pushState: true, 
  //popupCloseByOutside:true,
  name: 'Mounting',// App Name 
  //id: 'com.phonegap.sgl', // App id //
  id: 'com.phonegap.Mounting', // App id //
  panel: {
    //swipe: 'left', // Enable swipe panel //
    closeByBackdropClick : true,    
  },  
  input: {
    scrollIntoViewOnFocus: true,
    scrollIntoViewCentered: true,
  },
  animateNavBackIcon:true,  
  dynamicNavbar: true,  
  //theme:'material',
  //material: true, //enable Material theme
  //materialRipple: false,
  routes: routes, 
  clicks: { 
    externalLinks: '.external',
  },
  navbar: {     
    hideOnPageScroll: false,
    iosCenterTitle: false,
    closeByBackdropClick: true,
  },
  picker: {
    rotateEffect: true,
    //openIn: 'popover', 
  },
  popover: {
    closeByBackdropClick: true,
  },  
  on:{
    pageInit: function(e, page) {    
      //console.log(e+"-----"+page); 
    }
  },
  // Hide and show indicator during ajax requests
  onAjaxStart: function (xhr) {
    app.showIndicator();
  },
  onAjaxComplete: function (xhr) {
    app.hideIndicator(); 
  }
}); 
var mainView = app.views.create('.view-main');
document.addEventListener("deviceready", checkStorage, false); 
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackKeyDown, false);
function onDeviceReady() { 
  cordova.plugins.IMEI(function (err, imei) {
    console.log('imei='+imei);
    alert('imei='+ imei);
  });
}
function onBackKeyDown() {
  checkConnection(); 
  //alert(app.views.main.router.history.length==2);
  if(app.views.main.router.history.length==2 || app.views.main.router.url=='/'){
    app.dialog.confirm('Do you want to Exit ?', function () {
      navigator.app.clearHistory(); navigator.app.exitApp();
    });
  }else{ 
    $$(".back").click();
  } 
}
function checkStorage(){
  checkConnection();    
  /*var session_uid = window.localStorage.getItem("session_uid");
  //alert(session_uid);
  if(session_uid!=null){
    mainView.router.navigate("/dashboard/");
  }else{
    mainView.router.navigate("/index/"); 
  }*/
}
// --------------------- C H E C K  I N T E R N E T  C O N N E C T I O N --------------------- //
function checkConnection(){ 
  var networkState = navigator.connection.type;
  if(networkState=='none'){  
      mainView.router.navigate('/internet/');   
  }  
}