define(["jquery","../lib/common","../js/dialog","valiId","../lib/common"],function($,common,dialog,ID,common){
    if(window.location.href.indexOf("info.html")==-1) return;
    //获取地址栏的参数
    var ICCID=decodeURI(common.getUrlParams("ICCID")),
        number=decodeURI(common.getUrlParams("number")).replace(/^(\d{3})(\d{4})(\d+)$/g,function(a,b,c,d){
            return b+" "+c+" "+d;
        }),
        price=decodeURI(common.getUrlParams("price"))+"预存",
        meal=decodeURI(common.getUrlParams("meal"))=="q1" ? "0元月租" : "100元月租",
        showNum=decodeURI(common.getUrlParams("showNum"))=="k1" ? "开通5元/月" : "暂不需要"
        $(".info-span").text(price+"/"+meal+"/"+number);

    var Dialog=new dialog();
        //验证文本框
        function valid(ele,reg){
            if(common.getType(reg) == "[object RegExp]"){
                return reg.test(ele.val());
            }else if(common.getType(reg) == "[object Function]"){
                return reg(ele.val());
            }
        }
        function check(){
            var btn=$(".next-btn")
            if(valid($(".up-name"),/^[\u4e00-\u9fa5]+$/) && valid($(".up-id"),ID.idCard) && valid($(".up-area"),/^[\u4e00-\u9fa5]+$/) && valid($(".up-phone"),/^1[3578]\d{9}$/) && $("#upload").hasClass("high") && $("#info-ck").prop("checked")){
                btn.removeClass("btn-dis");
            }else{
                 btn.addClass("btn-dis");
            }
        }

        $(".up-name").on("input propertychange",function(){
            check();
        });
        $(".up-id").on("input propertychange",function(){
            check();
        });
        $(".up-area").on("input propertychange",function(){
            check();
        });
        $(".up-phone").on("input propertychange",function(){
            check();
        })

        //图片上传
          $("#upload").on("click",function(){
            var photoPage=$(".upload-phone");
                photoPage.removeClass("hide");
                if(photoPage.children().length==0){
                    //trigger创建自定义事件
                    photoPage.html($("#phtot").html()).trigger("up-load");
                }

                $(".pic1").on("change",function(){
                    uploadimg($(this));
                })
                $(".pic2").on("change",function(){
                    uploadimg($(this));
                })
                $(".pic3").on("change",function(){
                    uploadimg($(this));
                })

                history.pushState({},"upload",location.href+"&_upload");

         })

          
         function uploadimg(ele){
            var reader=new FileReader();
            var file=ele[0].files[0];

                if(file.size/(1024*1024)>1){
                    Dialog.alert("请上传小于1MB的图片");
                    return;
                }

                reader.readAsDataURL(file);
                reader.onload=function(){
                    //console.log(this.result);
                    ele.prev().attr("src",this.result);

                    ele.parents(".photo-item").attr("done",1);

                    if(checkUploaded()){
                        $(".over-btn").removeClass("btn-dis");
                    }
                }

          }


          function checkUploaded(){
            var i=0;
            $(".photo-item").each(function(){
                if($(this).attr("done")){
                    i++;
                }
            })

            return i==3 ? !0 : !1;
          }

          //上传图片的区域的显示和隐藏
          $(window).on("popstate",function(){
            if(location.href.indexOf("_upload")==-1){
                $(".upload-phone").addClass("hide");
            }else{
                $(".upload-phone").removeClass("hide");
            }
          })

          $("#info-ck").on("click",function(){
             check();
          })

        $(".upload-phone").on("up-load",function(){
            $(".over-btn").off().on("click",function(){
                if($(this).hasClass("btn-dis")) return;
                 $(".upload-phone").addClass("hide");
                $("#upload").text("照片已上传").addClass("high");
                 check();
            })
        })




        $('.next-btn').on("click",function(){
            window.location.href="order.html";
            local();
        })
    var arr=[];
    var ls=window.localStorage;
        function local(){
           var name=$(".up-name").val(),
                Id=$(".up-id").val(),
                area=$(".up-area").val(),
                phone=$(".up-phone").val();
            arr.push({
                name:name,
                id:Id,
                area:area,
                phone:phone,
                price:price,
                meal:meal,
                showNum:showNum,
                time:common.getNowtime()
            })
            ls.setItem("name",JSON.stringify(arr));
        }

})