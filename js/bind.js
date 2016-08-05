define(["../lib/common", "../js/dialog","../js/api"], function(common, dialog,api) {
	if (window.location.href.indexOf('bind.html') == -1) return;
	//随机取出四位数
	var url = 'https://ticwear-account.mobvoi.com/captcha/img?origin=ticwatch-service';
	var arr = [];

	//随机取出四位数
	function randNum(max, min) {
			var tmp = Math.floor(Math.random() * (max - min)) + min;
			while (arr.indexOf(tmp) > -1 && arr.length < (max - min)) {
				tmp = Math.floor(Math.random() * (max - min)) + min;
			}
			if (arr.length <= (max - min)) {
				arr.push(tmp);
				return tmp;
			}
		}
		//将随机取出的四位数付给img
	$("#randomImg").on("click", function() {
		var tmp = randNum(9999, 1000) || 'error';
		url = url + "&random_code=" + tmp;
		$(this).attr('src', url).attr("data-random-code", tmp)
	})

	var Diglog = new dialog();
	var flag=true;
	//点击获取验证码
	$(".code").on("click", function() {
		var phone = $(".phone-number").val(),
			imgcode = $('.img-code').val();
		var reg_phone = /^1[3,5,7,8]\d{9}$/g;
		var reg_imgcode = /[a-zA-Z0-9]{4}/g;
		//验证手机号
		if (!reg_phone.test(phone)) {
			Diglog.confirm('请输入正确的手机号码', function() {
				$(".phone-number").focus();
				flag=false;
			})
			return;
		}
		//验证图片
		if (!reg_imgcode.test(imgcode)) {
			Diglog.confirm('请输入正确的验证码', function() {
				$(".phone-number").focus();
				flag=false;
			})
			return;
		}
		flag=true;
		if(!flag) return;
		common.countDown($(this));
		api.getVerifyCode("",function(data){
			_code=data.res;
		})

	});
	//图片验证是否正确
/*	$('.img-code').on("blur", function() {
		var self = $(this);
		if (self.val().length == 4) {
			$.ajax({
				url: "../data/imgcodeeverify.json?code"+$(this).val(),
				success: function(data) {
					console.log(data.res)
					if (!data.res) {
						Diglog.alert('验证码输入有误', function() {
							$("#randomImg").click();
							self.focus();
						})
					} else {

					}
				}
			})
		}
	});*/

	$('.verify-code').on('input propertychange', function() {
		var val = $(this).val();
		if (val.length == 6 && $(".phone-number").val()!="" && $('.img-code').val()!="") {
			$('.btn-dis').removeClass('btn-dis');
		}
	});

	$(".bind-btn").on("click",function(){
		if($(this).hasClass('btn-dis')) return;
		if($(".verify-code").val()!=_code){
			Diglog.alert("验证码输入有误！",function(){
				$('.verify-code').focus();
			})
			return;
		}
		window.location.href='../html/choose.html';
	})

})