layui.config({
	base: basePath, 
	version: skyeyeVersion
}).define(['jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	    var $ = layui.$,
	    form = layui.form;
	    
		form.render();
		
		//属性标签
		showGrid({
		 	id: "propertyId",
		 	url: reqBasePath + "rmproperty006",
		 	params: {},
		 	pagination: false,
		 	template: getFileContent('tpl/template/select-option.tpl'),
		 	ajaxSendLoadBefore: function(hdb){
		 	},
		 	ajaxSendAfter:function(json){
		 		form.render('select');
		 	}
		});
		
	    form.on('submit(formAddBean)', function (data) {
	    	//表单验证
	        if (winui.verifyForm(data.elem)) {
	        	var params = {
        			title:$("#title").val(),
        			propertyValue:$("#propertyValue").val(),
        			propertyId:$("#propertyId").val(),
	        	};
	        	
	        	AjaxPostUtil.request({url:reqBasePath + "rmpropertyvalue002", params:params, type:'json', callback:function(json){
	 	   			if(json.returnCode == 0){
		 	   			parent.layer.close(index);
		 	        	parent.refreshCode = '0';
	 	   			}else{
	 	   				top.winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
	 	   			}
	 	   		}});
	        }
	        return false;
	    });
	    
	    //取消
	    $("body").on("click", "#cancle", function(){
	    	parent.layer.close(index);
	    });
	});
	    
});