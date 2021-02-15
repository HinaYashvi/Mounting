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
  openLOC();
  /*cordova.plugins.IMEI(function (error, imei) {
    var imei_num = imei;
    $.ajax({
      type:'POST', 
      url:'https://csr.mountinghorizons.org/sugarcrm/index.php?entryPoint=app_verifyIMEI&IMEI='+imei_num,  
      success:function(imei_result){
        alert(imei_result +" = imei_result");
        if(imei_result=='Success'){            
            //alert("in if");
            cordova.plugins.barcodeScanner.scan(function (result) {
              var qr_code_url = result.text;
              //var qr_code_url ='https://csr.mountinghorizons.org/index.php?entryPoint=swapInOut&record=e0ad5702-4ca4-3c1a-7240-60252e9edacc';
              //console.log('==='+'https://csr.mountinghorizons.org/index.php?entryPoint=swapInOut&record=e0ad5702-4ca4-3c1a-7240-60252e9edacc&lat=23.2390125&lng=72.661876');
              //console.log(qr_code_url);
              getLatLong(qr_code_url);
              //alert(qr_code_url);             
              },function (qr_error) {
                app.dialog.alert("Scanning failed: " + qr_error);   
                app.preloader.hide();       
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
            ); // SCANNER CODE ENDS //
            app.preloader.show();
        }else{
          app.dialog.alert("IMEI is not registered to our database");
          return false;
        }// imei_result ends //
      } // success ends //
    }); // ajax ends //
  },function(error){
    app.dialog.alert(error+" Unable to get IMEI");
    return false;
  }); // IMEI CODE ENDS //*/
  
  var imei_num = 866410030542785;
  $.ajax({
    type:'POST', 
    url:'https://csr.mountinghorizons.org/sugarcrm/index.php?entryPoint=app_verifyIMEI&IMEI='+imei_num,  
    success:function(imei_result){
      alert(imei_result +" = imei_result");
      if(imei_result=='Success'){
        app.preloader.show();
        //alert("in if");
        cordova.plugins.barcodeScanner.scan(function (result) {
          var qr_code_url = result.text;
          //var qr_code_url ='https://csr.mountinghorizons.org/index.php?entryPoint=swapInOut&record=e0ad5702-4ca4-3c1a-7240-60252e9edacc';
          //console.log('==='+'https://csr.mountinghorizons.org/index.php?entryPoint=swapInOut&record=e0ad5702-4ca4-3c1a-7240-60252e9edacc&lat=23.2390125&lng=72.661876');
          //console.log(qr_code_url);
          getLatLong(qr_code_url);
          //alert(qr_code_url);
           
          
        },function (qr_error) {
          app.dialog.alert("Scanning failed: " + qr_error);   
          app.preloader.hide();       
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
function getLatLong(qr_code_url){
  alert("in fucntion getLatLong");
//  app.preloader.show();         
  navigator.geolocation.getCurrentPosition(function (position){
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
    //console.log("latitude = "+lat+"----longitude = "+long);
    //alert("latitude = "+lat+"----longitude = "+long);
  var latlong_url = qr_code_url+"&lat="+lat+"&lng="+long;
    //var latlong_url = qr_code_url+"&lat=23.2390125&lng=72.661876";
    //alert("**** "+latlong_url);
    //app.dialog.show();       
    $.ajax({
      type:'POST', 
      url:latlong_url,  
      success:function(loc_result){        
        //alert("loc_result "+loc_result);
        var parseReslt = $.parseJSON(loc_result);
        var showMessage = parseReslt.showMessage;
        alert("###### "+showMessage);
        $(".msg").show();
        $(".msg").html(showMessage);
        setTimeout(function () {
         $(".msg").hide();
        },10000);
        app.preloader.hide();
      }
    });            
  });  
}
function openLOC(){ 
  cordova.plugins.diagnostic.isLocationEnabled(function(enabled){ //isLocationEnabled    
    if(!enabled){
      //cordova.plugins.diagnostic.switchToLocationSettings(onRequestSuccess,onRequestFailure);
      cordova.plugins.diagnostic.switchToLocationSettings();
      cordova.plugins.diagnostic.isLocationAuthorized(function(locres){
        if(locres){   
          alert("location is on "+locres);       
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
$(document).on('page:init', '.page[data-name="index"]', function (page) {
  checkConnection();  
  $(".msg").hide();  
});
/*$(document).on('page:init', '.page[data-name="message_page"]', function (page) {
  checkConnection();
  var showMessage = page.detail.route.params.showMessage;
  alert("in message page "+showMessage);
  setTimeout(function () {
    $(".msg").html(showMessage);
  },10000);
});*/
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