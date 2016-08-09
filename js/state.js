/* 
* @Author: Marte
* @Date:   2016-08-07 20:31:27
* @Last Modified by:   Marte
* @Last Modified time: 2016-08-07 20:54:41
*/

define(["jquery","../lib/common"],function($,common){
    if(window.location.href.indexOf("state.html")==-1) return;
    var ls=window.localStorage;
    var imform=JSON.parse(ls.getItem("name"));

    $(".phone").text(common.getUrlParams("phone"));
    $(".time").text(imform[0].time);
    $(".meal").text(imform[0].meal);
    $(".showNum").text(imform[0].showNum);
    $(".price").text(imform[0].price);
    $(".all").text(imform[0].price.slice(0,3))
    
})