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
      //alert(imei_result +" = imei_result");
      if(imei_result=='Success'){
        //alert("in if");
        cordova.plugins.barcodeScanner.scan(function (result) {
          var qr_code_url = result.text;
          //alert(qr_code_url);
          console.log(qr_code_url);
          openLOC();
          navigator.geolocation.getCurrentPosition(function (position){
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            console.log("latitude = "+lat+"----longitude = "+long);
            alert("latitude = "+lat+"----longitude = "+long);
            var latlong_url = qr_code_url+"&latitude="+lat+"&longitude="+long;
            alert("**** "+latlong_url);
            $.ajax({
              type:'POST', 
              url:latlong_url,  
              success:function(loc_result){
                alert("loc_result "+loc_result);
              }
            });
          });
        },function (qr_error) {
          app.dialog.alert("Scanning failed: " + qr_error);
          //$("#barcode_result").html("Scanning failed: " + error);
        },
        {
          preferFrontCamera : false, // iOS and Android
          //showFlipCameraButton : true, // iOS and Android
          //showTorchButton : true, // iOS and Android
          //torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
        }
        );
          
      }else{
        app.dialog.alert("IMEI is not registered to our database");
        return false;
      }
    }
  }); 
}
function openLOC(){ 
  cordova.plugins.diagnostic.isLocationEnabled(function(enabled){ //isLocationEnabled    
    if(!enabled){
      //cordova.plugins.diagnostic.switchToLocationSettings(onRequestSuccess,onRequestFailure);
      cordova.plugins.diagnostic.switchToLocationSettings();
      cordova.plugins.diagnostic.isLocationAuthorized(function(locres){
        if(locres){
          
        }
      }, errorCallback);
       //mainView.loadPage("current-location.html");
    }/*else{
      //alert("Location service is ON");        
      mainView.router.navigate("/customer_dash/");
    }*/
  }, function(error){
    app.dialog.alert("The following error occurred: "+error);
  });   
}
function errorCallback(error){  
  //if(error){
   app.dialog.alert(error.message);
  //} 
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