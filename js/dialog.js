define(["jquery",'../lib/common'], function($,common){
	var Dialog=function(option){
		this.option=typeof option=='undefined' ? {
			msg:'你确定要删除吗？',
			title:'对话框'
		}:option;
		this.agent=common.getAgenttype();
		this.str='<p class="dialog-title">{title}</p><p class="dialog-msg">{msg}</p><p class="dialog-btn-wrap">{btnwrap}</p>';
		this.defaultDom=this.option.defaultDom || this.str;
		this.init();
	}
	Dialog.prototype={
		init:function(){
			this.callback=null;
			this.str=this.defaultDom.replace('{title}',this.option.title);
			this.ifNeedAnimate=this.agent.isTos || this.agent.isiPad || this.agent.isIphone;
		},
		alert:function(msg,callback){
			this.show();
			this.defaultDom=this.str;
			this.defaultDom=this.defaultDom.replace('{msg}',msg).replace('{btnwrap}','<span class="dialog-btn dialog-certain">确定</span>')
			this.dialogbox.html(this.defaultDom);
			if(callback){
				this.callback=callback;
			}
		},
		confirm:function(msg,callback){
			this.show();
			this.defaultDom=this.str;
			this.defaultDom=this.defaultDom.replace('{msg}',msg).replace('{btnwrap}','<span class="dialog-btn dialog-certain">确定</span><span class="dialog-btn dialog-cancel">取消</span>')
			this.dialogbox.html(this.defaultDom);
			if(callback){
				this.callback=callback;
			}
		},
		bindEvent:function(){
			var that=this;
			that.mask.on('click','.dialog-certain',function(){
					that.hide();
					if(that.callback){
						that.callback();
					}
			});
			that.mask.on('click','.dialog-cancel',function(){
					that.hide();
			})
		},
		show:function(){

			var _body=$("body");
			console.log(this.ifNeedAnimate);
			if($(".mask").length==0){
				var that=this;
				this.mask="";
				if(!this.ifNeedAnimate){
					this.mask=$("<div class='mask' style='transition:none;'></div>").appendTo(_body);
				}else{
					this.mask=$("<div class='mask'></div>").appendTo(_body);
				}
				setTimeout(function(){
					(that.mask).addClass("mask-active");
				},10)
			}
			if($(".dialog-box").length==0){
				this.dialogbox=$("<div  class='dialog-box'></div>").appendTo(this.mask);
			}
			this.afterShow();
		},
		afterShow:function(){
			this.bindEvent();
		},
		hide:function(){
			var db=$('.mask');
			var ml=$('.dialog-box');
				db.length>0 && db.remove();
				/*if(this.ifNeedAnimate){
					//db.on(common.transitionEnd(),function(){
						db.length>0 && db.remove();
					//})
					//db.removeClass("mask-active");
				}else{
					db.length>0 && db.remove();
				}*/
		}
	};


	return Dialog;

})