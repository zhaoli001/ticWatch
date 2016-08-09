require.config({
	baseUrl:"../lib/",
	paths:{
		"jquery":"jquery",
		"fastclick":"fastclick",
        "artTemplate":"template-native",
        "valiId":"valiId"
	}
})
require(["jquery","fastclick","artTemplate","valiId","../js/login","../js/bind","../js/choose","../js/info","../js/order","../js/my","../js/state"],function($,fastclick,template,valiId,login,bind,choose,info,order,my){
	fastclick.attach(document.body);

})