/**
 * @description: 强制保留两位浮点数(不四舍五入)
 * @param {string|number} x 
 * @return: s_x 保留2位小数的浮点数
 * @Date Changed: 
 */
function floorTwo(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
    }
    f_x = Math.floor(f_x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}


module.exports = {
    floorTwo
}

