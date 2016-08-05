define(["jquery","../js/api.js","../lib/slideSelect"],function($,api){
    if(window.location.href.indexOf("choose.html")==-1) return;
    //显示影藏
    var ls=window.localStorage;
    if(ls.getItem("phone-number")){
        var val=ls.getItem("phone-number");
          $(".choose-tel").text("已选"+val).css("color","#5E83E1");
          $('<input type="hidden" value="'+val+'"/>').appendTo($(".choose-tel"));
    }
    $(".choose-qtn").on("click",function(){
        $(".question-page").removeClass("hide");
        $(".question-page").off().on("click",function(){
            $(this).addClass("hide");
        })
    })
    //渲染
    var str="";
   api.getNumber("",function(data){
        data.result.forEach(function(v,i){
            str+="<span class='number'>"+v.svcNumber+"</span>"
        })
        $(".tel-number").html(str);
    })
   //点击显示号码页
   var _href=location.href;
    $(".choose-tel").on("click",function(){
        $(".tel-number").removeClass("right-hide");
        history.pushState({},"选择号码",_href+"_num")
    })
    //点击返回
    $(window).on('popstate',function(){
        $(".tel-number").addClass("right-hide");
    })
    //点击选中号码
    $(".tel-number").on("click","span",function(){
        var num=$(this).text();
        $(this).addClass("num-high").siblings().removeClass("num-high");
        $(".tel-number").addClass("right-hide");
        num=num.replace(/^(\d{3})(\d{4})(\d+)$/g,function(a,b,c,d){
            return b+" "+c+" "+d;
        })
        $(".choose-tel").text("已选 "+num).css("color","#5E83E1")
     history.replaceState({},'选择号码',_href);
     check($(".box input").val());
     $('<input type="hidden" value="'+num+'"/>').appendTo($(".choose-tel"));
    })

    //输入ID
    $(".box input").on("input propertychange",function(){
        var ID=$(this).val();
            ID=ID.replace(/(\d{5})/g,function(a,b){
               return b.substr(0,4)+" "+b.substr(4);
            });
        if(ID.length>=24){
            ID=ID.substring(0,24);
        }
        $(this).val(ID);
        check(ID);
    })

    //点击选择号码
    $(".pre-box .pre").slideSelect({
          init: 3,
          wrapper: $('.container'),
          data: ['10元','20元','30元','50元','100元'],
          title: '选择预存金额',
          renderTo: '.pre-box .pre',
          callback: function(a,b){
              console.log("success");
          },
          cls: 'selected'
     });

    //《下一步》变高亮
    check($(".box input").val());
    function check(tmp){
        var reg=/^(\d{4}\s){4}(\d{4})$/,
            ele=$('.next-btn');
            if(reg.test(tmp) && $(".choose-tel").text().indexOf("已选")>-1){
                ele.removeClass("btn-dis");
            }else{
                  ele.addClass("btn-dis");
            }
    }
    //点击选择
    $(".choose-package").on("click","ul",function(){
        $(this).addClass("checked-item").siblings().removeClass("checked-item");
    })

    $(".open-box").on("click","span",function(){
         $(this).addClass("open-high").siblings().removeClass("open-high");
    })
    //
    function collectInformation(){
        var str="";
        var ICCID=$(".box input").val();
        var number=$(".choose-tel input").val();
        var price=$(".pre-box .pre").text();
        var meal=$(".checked-item").data("id");
        var showNum=$(".open-box .open-high").data("span");
            ICCID=ICCID.replace(/\s/g,"");
            number=number.replace(/\s/g,"");
        str+="?ICCID="+ICCID;
        str+="&number="+number;
        str+="&price="+price;
        str+="&meal="+meal;
        str+="&showNum="+showNum;
        return decodeURI(str);
    }

    //点击跳转页面
    $(".next-btn").on("click",function(){
        if($(this).hasClass("btn-dis")) return;
        //存多个值
        /*arr.push({
            ICCID:$(".box input").val(),
            phone-number:$(".choose-tel input").val(),
            price:$(".pre-box .pre").text(),
        })*/
        ls.setItem("phone-number",$(".choose-tel input").val())
        location.href="../html/info.html"+collectInformation();
    })

})