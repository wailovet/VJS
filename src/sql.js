/**
 * Created by Administrator on 2015/11/25.
 */
define(function () {
    return function () {
        var db = 0;
        var _table = '';
        var open = function (dbname) {
            db = openDatabase(dbname, "0.1", "", 200000);
            return this;
        };
        var table = function (name) {
            _table = name;
            return this;
        };
        var query = function (sql, pam, call, error) {
            db.transaction(function (tx) {
                tx.executeSql(sql, pam, function (a, b) {
                    var rt = new Array();
                    for (var i = 0; i < b.rows.length; i++) {
                        rt = b.rows.item(i);
                    }
                    call(rt);
                }, error);
            });
        };
        var exec = function (sql, pam, call, error) {
            db.transaction(function (tx) {
                tx.executeSql(sql, pam, function (a, b) {
                    var rt = new Array();
                    for (var i = 0; i < b.rows.length; i++) {
                        rt[i] = b.rows.item(i);
                    }
                    if (call)call(rt);
                }, error);
            });
        };
        var _where = ' WHERE 1=1';
        var where = function (w) {
            if ((typeof w == 'object') && w.constructor == Array) {
                for (var i in w) {
                    _where += ' AND ' + i + " =  '" + w[i] + "'";
                }
            }
            return this;
        };
        var select = function (call) {
            var table = _table;
            exec("SELECT * FROM " + table + this._where, [], call);
            _where = ' WHERE 1=1';
            return this;
        };
        var add = function (w, call) {
            var table = _table;
            var tmp = " ";
            var s = 0;
            var p = new Array();
            for (var i in w) {
                if (s == 0)
                    tmp += "(" + i;
                else
                    tmp += "," + i;


                p[s] = w[i];
                s++;
            }
            tmp += ") VALUES (";
            while (--s >= 0) {
                if (s == 0)
                    tmp += "?)";
                else
                    tmp += "?,";

            }
            exec("INSERT INTO " + table + tmp, p, call);
        };
        var save = function (call) {
            var table = _table;
            //this.exec("SELECT * FROM "+table+this._where,[],call);
        };
        return {
            open: open,
            table: table,
            where: where,
            select: select,
            add: add,
            save: save,
            exec: exec,
            query: query,
        };
    }
});