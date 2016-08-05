define(["jquery"],function($){
	return {
		getAcccontInfo:function(data,callback){
			data=data || {
				wechat_id:"123",
				balance:30,
				phoneNum:13240360468,
				idCard:"123123123123123123"
			};
			$.ajax({
				url:"../data/getdata.json",
				type:"get",
				data:data,
				beforeSend:function(){

				},
				success:function(data){
					callback(data);
				},
				complete:function(data){
					console.log(data);
				},
				error:function(err){
					console.log(err.responseText);
				}
			})
		},
		getVerifyCode:function(data,callback){

			$.when($.ajax("../data/getValidCode.json"))
			.done(function(data){
				callback(data);
			})
			.fail(function(err){
				console.log(err);
			})
		},
		getNumber:function(data,callback){
			$.when($.ajax("../data/numList.json"))
			.done(function(data){
				callback(data);
			})
			.fail(function(err){
				console.log("err");
			})
		}
	}
});