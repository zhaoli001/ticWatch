define(["valiId","../js/api","../lib/common",'../js/dialog'],function(ID,api,common,dialog){
	     
	if(window.location.href.indexOf('login.html') == -1) return;
	var Id=$(".id"),Code=$(".Code"),regbtn=$(".code");
	var valId=$.trim(Id.val()),valCode=$.trim(Code.val());
	var validCode=null;
	var Dialog=new dialog();
		//点击获取验证码
		regbtn.on("click",function(){
			if(ID.idCard($.trim(Id.val()))){
				common.countDown(regbtn);
				api.getAcccontInfo({
					wechat_id:common.getUrlParams("wechat_id"),
					idCard:$.trim(Id.val())
				},function(data){
					console.log(data);
					validCode=data.code;
				});
				return;
			}
			Dialog.confirm("证件格式有误！！！",function(){
				Id.focus();
			})
		})

		//有值时登录按钮高亮显示
		Id.on("input",function(){
			height();
		})
		Code.on("input",function(){
			height();
		})
		function height(){
			var valId=$.trim(Id.val()),valCode=$.trim(Code.val());
			if(valId && valCode){
				//匹配输入的格式是否正确
				if(ID.idCard(valId) && /^\d{6}$/.test(valCode)){
					$(".login-btn").removeClass("btn-dis");
				}else{

					$(".login-btn").addClass("btn-dis");
				}
			}
		}

		//点击登录
		$(".login-btn").on("click",function(){
			if($(this).hasClass("btn-dis")==false){
				if($.trim(Code.val())==validCode){
					location.href="";
				}else{
					Dialog.alert("验证码有误！！！",function(){
						Code.focus();
					})
				}
			}
			
		})
		//点击跳转
		$(".card-btn").on("click",function(){
			window.location.href="bind.html";
		})

		//点击登录
		$(".login-btn").on("click",function(){
			if($(this).hasClass("btn-dis")) return;
			location.href="../html/choose.html"
		})

})
