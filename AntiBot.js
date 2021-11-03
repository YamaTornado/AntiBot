/* PLEASE DO NOT COPY AND PASTE THIS CODE. code by Yama*/

function getCookie(name) {

    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
        else{
            var oneCookie = dc.indexOf(';', begin);
            if(oneCookie == -1){
                var end = dc.length;
            }else{
                var end = oneCookie;
            }
            return dc.substring(begin, end).replace(prefix,'');
        } 
  
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
        var fixed = dc.substring(begin, end).replace(prefix,'');
    }
    
    return fixed;
  } 
  
  (function(){var w=window,C='___grecaptcha_cfg',cfg=w[C]=w[C]||{},N='grecaptcha';var gr=w[N]=w[N]||{};gr.ready=gr.ready||function(f){(cfg['fns']=cfg['fns']||[]).push(f);};w['__recaptcha_api']='https://www.google.com/recaptcha/api2/';(cfg['render']=cfg['render']||[]).push('onload');w['__google_recaptcha_client']=true;var d=document,po=d.createElement('script');po.type='text/javascript';po.async=true;po.src='https://www.gstatic.com/recaptcha/releases/tftmXwdbgCvrXiHxr5HGbIaL/recaptcha__de.js';po.crossOrigin='anonymous';po.integrity='sha384-PT4x0R227mNUgUvxec3X/5F/RwDKEsgBvEzvdset1CNC9n9MFTv2gaqWg5d6b7pc';var e=d.querySelector('script[nonce]'),n=e&&(e['nonce']||e.getAttribute('nonce'));if(n){po.setAttribute('nonce',n);}var s=d.getElementsByTagName('script')[0];s.parentNode.insertBefore(po, s);})();
  
  
  
  document.cookie = 'name=wert;'; 
  
  var a = new Date();
  a = new Date(a.getTime() +1000*60*60*24*365);
  document.cookie = 'meincookie=meinwert; expires='+a.toGMTString()+';'; 
  
  var userData = {
    "internalIPs": [],
    "externalIPs": {"ipv4": [], "ipv6": []},
    "fingerprintHash": '',
    "userAgent": navigator.userAgent
}

getIPs(function(ip){
  
    if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/))
        userData.internalIPs.push(ip);
   
    else if (ip.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/))
        userData.externalIPs["ipv6"].push(ip);
   
    else
        userData.externalIPs["ipv4"].push(ip);
});

new Fingerprint2().get(function(fingerprint, components){
  
  userData.fingerprintHash = fingerprint


});

var sendInfo = function(endpoint){
    setTimeout(function(){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      
        xhr.send(JSON.stringify(userData));
        xhr.onloadend = function () {
       
        } 
    }, 3000)
}


function getIPs(callback){
    var ip_dups = {};

    
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;

    
    if(!RTCPeerConnection){
      
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
            || win.mozRTCPeerConnection
            || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }

    
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };

    var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

    
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    function handleCandidate(candidate){
        
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];

        
        if(ip_dups[ip_addr] === undefined)
            callback(ip_addr);

        ip_dups[ip_addr] = true;
    }

    
    pc.onicecandidate = function(ice){

        
        if(ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };

    
    pc.createDataChannel("");

    
    pc.createOffer(function(result){


        pc.setLocalDescription(result, function(){}, function(){});

    }, function(){});

    
    setTimeout(function(){
        
        var lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function(line){
            if(line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}
  
  /* PLEASE DO NOT COPY AND PASTE THIS CODE. code by Yama*/