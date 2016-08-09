define(["jquery","artTemplate"],function($,template){
    if(window.location.href.indexOf("my.html")==-1) return;

    render("flow");
    var DD="<ul class='count'>"+
        "<% for(var i=0;i<list.length;i++) {%>"+
            "<li><h4><%= list[i].name %></h4>"+
            "<p><%= list[i].info %></p></li>"+
        "<% } %>"+
    "</ul>";
    $(".tab-title").on("click","span",function(){
        var id=$(this).attr("data-msg");
            $(this).addClass("on").siblings().removeClass("on");
        render(id);
    })

    function render(id){
        if(id=="flow"){
            url="../data/usedInfo.json";
        }
        $.when($.ajax(url))
            .done(function(data){
               /* var queryTpl={list:data};
                var htmll=template(id,queryTpl);*/
                var render=template.compile(DD);
                var htmll=render({
                    list:data
                })
                    $(".my-content").html(htmll).trigger("my-phone");
            })
            .fail(function(data){
                console.log("error")
            })
    }
   
    $(".pad-top").on("my-phone",function(){

        $(".pad-top").on("click",".Mprice",function(){
             $(this).addClass("on").siblings().removeClass("on");
        })

        $(".recharge").on("input properchange",function(){
            var txt=$(this).val();
            var reg=/^1[3578]\d{9}$/g;
            console.log(txt);
            if(reg.test(txt)){
                $(".pad-top .pay-btn").removeClass("btn-dis");
            }else{
                 $(".pad-top .pay-btn").addClass("btn-dis");
            }
        })
        
        $(".exit-btn .btn").on("click",function(){
            location.href="login.html";
        })
        $(".pad-top .pay-btn").on("click",function(){
            var text=$(".recharge").val();
            location.href="state.html?phone="+text;
        })

    })
  
    

})