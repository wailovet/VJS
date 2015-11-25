/**
 * Created by Administrator on 2015/11/25.
 */
require(['lock','request','sql'],function(lock,request,sql){
    window.Vjs = {
        lock:lock,
        request:request,
        sql:sql
    };
});