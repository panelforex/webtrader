define(["websockets/binary_websockets","windows/windows","common/rivetsExtra","lodash"],function(a,b,c,d){function e(){return g?void g.moveToTop():void require(["text!oauth/login.html","text!oauth/app_id.json"],function(a,c){c=JSON.parse(c);var d=local_storage.get("config"),e=d&&d.app_id||"";if(!e){var i=window.location.href;for(var j in c)if(0==i.lastIndexOf(j,0)){e=c[j];break}}a=$(a),g=b.createBlankWindow(a,{title:"Log in",resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,width:408,height:150,close:function(){g.dialog("destroy"),g.remove(),g=null},open:function(){},destroy:function(){h&&h.unbind(),h=null}}),g.parent().css("overflow","visible"),f(a,e),g.dialog("open");var k=g.dialog("widget").offset();k.top=80,g.dialog("option","position",{my:k.left,at:k.top}),g.dialog("widget").css({left:k.left+"px",top:k.top+"px"})})}function f(b,e){var f={route:{value:"login"},login:{disabled:!1},registration:{email:"",disabled:!1,validate:{value:!1},email_show_explanation:function(){var a=f.registration.email;return""===a&&!f.registration.validate.value||validateEmail(a)}},account:{empty_fields:{validate:!1,clear:d.debounce(function(){f.account.empty_fields.validate=!1},2e3),show:function(){f.account.empty_fields.validate=!0,f.account.empty_fields.clear()}},password_error_message:function(){var a=f.account.password;return""===a?f.account.empty_fields.validate?"* Please enter your password":"":a.length<6?"* Password must be 6 characters minimum":/\d/.test(a)&&/[a-z]/.test(a)&&/[A-Z]/.test(a)?"":"* Password must contain lower and uppercase letters with numbers"},verification:"",password:"",repeat_password:"",residence:"my",residence_list:[{text:"Malaysia",value:"my"}],disabled:!1},confirm:{disabled:!1}};f.login.login=function(){f.login.disabled=!0;var a=local_storage.get("config"),b=a&&a.oauth_url||"https://www.binary.com/oauth2/authorize";window.location=b+"?app_id="+e+"&scope=read,trade,payments,admin"},f.confirm.confirm=function(){f.confirm.disabled=!0;var a=local_storage.get("config"),b=a&&a.oauth_url||"https://www.binary.com/oauth2/authorize";window.location=b+"?app_id="+e+"&scope=read,trade,payments,admin"},f.route.update=function(a){var b={login:{title:"Log in",height:150},registration:{title:"Registration",height:190},account:{title:"Account opening",height:420},confirm:{title:"Account opening",height:400}};f.route.value=a;var c=b[a].title,d=b[a].height;g.dialog("option","title",c),g.dialog("option","height",d)},f.registration.validate.clear=d.debounce(function(){f.registration.validate.value=!1},2e3),f.registration.validate.show=function(){f.registration.validate.value=!0,f.registration.validate.clear()},f.registration.create=function(){var b=f.registration.email;return""!=b&&validateEmail(b)?(f.registration.disabled=!0,void a.send({verify_email:b,type:"account_opening"}).then(function(a){if(f.registration.disabled=!1,!a.verify_email)throw{message:"Email verification failed ("+a.msg_type+")"};$.growl.notice({message:"Verification code sent to "+b}),f.route.update("account")})["catch"](function(a){$.growl.error({message:a.message}),f.registration.disabled=!1})):void f.registration.validate.show()},f.account.open=function(){f.account.empty_fields.show();var b=f.registration.email,c=f.account.verification,d=f.account.password,e=f.account.repeat_password,g=f.account.residence,h=validateEmail(b)&&""!==c&&d===e&&d.length>=6;if(h=h&&/\d/.test(d)&&/[a-z]/.test(d)&&/[A-Z]/.test(d)&&2===g.length){var i={new_account_virtual:1,verification_code:c,client_password:d,residence:g};f.account.disabled=!0,a.send(i).then(function(b){var c=b.new_account_virtual,d=[{id:c.client_id,token:c.oauth_token}];local_storage.set("oauth",d),a.cached.authorize()["catch"](function(a){}),f.account.disabled=!1,f.route.update("confirm")})["catch"](function(a){$.growl.error({message:a.message}),f.account.disabled=!1})}},h=c.bind(b[0],f),a.cached.send({residence_list:1}).then(function(a){f.account.residence_list=a.residence_list,f.account.residence=a.residence_list[0].value,d.defer(function(){f.account.residence="id"},0)})["catch"](function(a){$.growl.error({message:a.message})})}require(["text!oauth/login.html"]),require(["text!oauth/app_id.json"]),require(["css!oauth/login.css"]);var g=null,h=null;return{init:e}});