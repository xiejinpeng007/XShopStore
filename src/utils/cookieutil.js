export default {
    //获取cookie
    getCookie(key) {
        var arr,
            reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if ((arr = document.cookie.match(reg))) return arr[2];
        else return null;
    },

    //设置cookie
    setCookie(key, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie =
            key +
            "=" +
            escape(value) +
            (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    },
    //删除cookie
    delCookie(key) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(key);
        if (cval != null)
            document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
    }
}