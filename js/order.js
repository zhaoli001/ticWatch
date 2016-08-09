define([""],function(){
    if(window.location.href.indexOf("order.html")==-1) return;
    var ls=window.localStorage;
    var imform=JSON.parse(ls.getItem("name"));

    console.log(imform);
    $(".or-time").text(imform[0].time);
    $(".or-phone").text(imform[0].phone);
    $(".or-meal").text(imform[0].meal);
    $(".or-showNum").text(imform[0].showNum);
    $(".or-price").text(imform[0].price);
    $(".all").text(imform[0].price.slice(0,3))
    $(".pay-btn").on("click",function(){
        location.href="my.html";
    })

})