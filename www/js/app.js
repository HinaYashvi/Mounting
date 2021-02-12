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
  /*cordova.plugins.IMEI(function (error, imei) {
    var imei_num = imei;
    $.ajax({
      type:'POST', 
      url:'https://csr.mountinghorizons.org/sugarcrm/index.php?entryPoint=app_verifyIMEI&IMEI='+imei_num,  
      success:function(imei_result){
        alert(imei_result +" = imei_result");
        if(imei_result=='Success'){
          
        }else{
          app.dialog.alert("IMEI is not registered to our database");
          return false;
        }
      }
    }); 
  },function(error){
    app.dialog.alert(error+" Unable to get IMEI");
    return false;
  });*/

  var imei_num = 866410030542785;
  $.ajax({
    type:'POST', 
    url:'https://csr.mountinghorizons.org/sugarcrm/index.php?entryPoint=app_verifyIMEI&IMEI='+imei_num,  
    success:function(imei_result){
      alert(imei_result +" = imei_result");
      if(imei_result=='Success'){
          navigator.geolocation.getCurrentPosition(function (position){
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            console.log("latitude = "+lat+"----longitude = "+long);
            alert("latitude = "+lat+"----longitude = "+long);
          });
      }else{
        app.dialog.alert("IMEI is not registered to our database");
        return false;
      }
    }
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