define(function(require, exports, module) {
  module.exports=transformTime;
  function transformTime(millisecond){
  }
  transformTime.prototype.MSToYMDHMS=function(millisecond){
      var o=new Date(millisecond);
      var y=o.getFullYear();
      var m=o.getMonth()+1;
      m=m>9?m:'0'+m;
      var d=o.getDate()>9?o.getDate():'0'+o.getDate();
      var h=o.getHours()>9?o.getHours():'0'+o.getHours();
      var min=o.getMinutes()>9?o.getMinutes():'0'+o.getMinutes();
      var s=o.getSeconds()>9?o.getSeconds():'0'+o.getSeconds();
      return y+'-'+m+'-'+d+' '+h+':'+min+':'+s;
  }
  transformTime.prototype.MSToNow=function(millisecond){
    var o=new Date();
    var msShort=o.getTime()-millisecond;
    if(msShort<1000*60){
      return Math.floor(msShort/1000)+'秒前';
    }
    if(msShort>=60*1000&&msShort<60*1000*60){
      return Math.floor(msShort/60000)+'分钟前';
    }
    if(msShort>=60*1000*60&&msShort<60*1000*60*24){
      return Math.floor(msShort/3600000)+'小时前';
    }
    if(msShort>=60*1000*60*24){
      return Math.floor(msShort/86400000)+'天前';
    }
  }
});

