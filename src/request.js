/**
 * Created by Administrator on 2015/11/25.
 */
define(['jquery'],function ($){
    var _dataType = 'json';
    var _async = false;
    var _type = 'GET';
    var _data = '';
    var _url = '';
    var url = function (url) {
        _url = url;
        return this;
    }
    var data = function (data) {
        _data = data;
        return this;
    }
    var type = function (type) {
        _type = type;
        return this;
    }
    var dataType = function (dataType) {
        _dataType = dataType;
        return this;
    }
    var async = function (async) {
        _async = async;
        return this;
    }

    var send = function (success, error) {
        $.ajax({
            url: _url,
            async: _async,
            dataType: _dataType,
            type: _type,
            data: _data,
            success: success,
            error: error
        });
    }

    var post = function (success, error) {
        _type = 'POST';
        return this.send(success, error);
    }
    var get = function (success, error) {
        _type = 'GET';
        return this.send(success, error);
    }


    return {
        url:url,
        data:data,
        type:type,
        dataType:dataType,
        async:async,
        send:send,
        post:post,
        get:get
    };
});