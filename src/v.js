/**
 * Created by Administrator on 2015/11/25.
 */
(function(){
    var _vjs_ready_callback = null;
    window.Vjs = {
        ready:function(callback){
            _vjs_ready_callback = callback;
        }
    }
    require(['lock','request','sql'],function(lock,request,sql){
        window.Vjs = function(){
            var _lock = new lock();
            var _request = new request();
            var _sql = new sql();
            return {
                lock:_lock,
                request:_request,
                sql:_sql,
                ready:function(callback){
                    _vjs_ready_callback = callback;
                }
            };
        }
        if(_vjs_ready_callback)_vjs_ready_callback();
    });

})();
