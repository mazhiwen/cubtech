define(function(require, exports, module) {

    module.exports=components;


    function components(){
        
        
    }

    function t(e) {
        e.preventDefault();
    }
    
    components.prototype.pageLock= function() {
        document.addEventListener("touchmove", t, !1);
    }
   
});

