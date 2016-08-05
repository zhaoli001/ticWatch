require.config({
	baseUrl:"../lib/",
	paths:{
		"jquery":"jquery",
		"fastclick":"fastclick"
	}
})
require(["jquery","fastclick","../js/login","../js/bind","../js/choose","../js/info"],function($,fastclick,login,bind){
	fastclick.attach(document.body);
    
})