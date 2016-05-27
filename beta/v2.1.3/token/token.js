define(["websockets/binary_websockets","windows/windows","common/rivetsExtra","moment","clipboard"],function(a,b,c,d,e){function f(a){a.click(function(){i?i.moveToTop():require(["text!token/token.html"],h)})}function g(b){var e="Note that tokens can possess one or more of these scopes: <br/><b>read</b> - for API calls that only read client data<br/><b>trade</b> - for API calls that can create trades in the client account<br/><b>payments</b> - for API calls that can access the cashier<br/><b>admin</b> - for API calls that change client settings",f={route:"token-list",search_input:"",tokens:[],tooltip:e,token:{name:"",scopes:{read:!0,trade:!1,payments:!1,admin:!1},btn_disabled:!1},confirm:{visible:!1,top:"0px",token:{}}};return f.tokens_filtered=function(){var a=f.search_input;return f.tokens.filter(function(b){return""===a||-1!==b.display_name.toLowerCase().indexOf(a)||-1!==b.token.toLowerCase().indexOf(a)||-1!==b.permissions.toLowerCase().indexOf(a)})},f.confirm.show=function(a){var b=$(a.target),c=b.position().top-b.parent().parent().height(),d=b.attr("token-id");d=_.find(f.tokens,{token:d}),f.confirm.top=c+"px",f.confirm.visible=!0,f.confirm.token=d},f.confirm.no=function(){f.confirm.visible=!1},f.confirm.yes=function(){var b=f.confirm.token;f.confirm.visible=!1,a.send({api_token:1,delete_token:b.token}).then(function(a){var b=a.api_token&&a.api_token.tokens||[];f.update_tokens(b)})["catch"](function(a){$.growl.error({message:a.message})})},f.change_route=function(a){f.route=a},f.update_tokens=function(a){a.forEach(function(a){var b=a.scopes;a.permissions=4==b.length?"All":b.join(", "),a.last_used_tooltip=a.last_used,a.last_used=a.last_used?d.utc(a.last_used,"YYYY-MM-DD HH:mm:ss").fromNow():"-"}),f.tokens=a},f.token.add=function(){var b={api_token:1,new_token:f.token.name,new_token_scopes:[]};f.token.scopes.read&&b.new_token_scopes.push("read"),f.token.scopes.trade&&b.new_token_scopes.push("trade"),f.token.scopes.payments&&b.new_token_scopes.push("payments"),f.token.scopes.admin&&b.new_token_scopes.push("admin");var c="";return b.new_token_scopes.length||(c="Please choose at least one token scope"),b.new_token&&b.new_token.length||(c="Please enter the token name"),c?void $.growl.error({message:c}):(f.token.btn_disabled=!0,void a.send(b).then(function(a){f.token.name="",f.token.btn_disabled=!1,$.growl.notice({message:'Successfully added new token "'+b.new_token+'"'});var c=a.api_token&&a.api_token.tokens||[];f.update_tokens(c),f.change_route("token-list")})["catch"](function(a){f.token.btn_disabled=!1,$.growl.error({message:a.message})}))},j=c.bind(b[0],f),a.send({api_token:1}).then(function(a){var b=a.api_token&&a.api_token.tokens||[];f.update_tokens(b)})["catch"](function(a){$.growl.error({message:a.message})})}function h(a){a=$(a),i=b.createBlankWindow(a,{title:"Token management",resizable:!1,collapsable:!1,minimizable:!0,maximizable:!1,width:700,minHeight:60,"data-authorized":!0,close:function(){j&&j.unbind(),j=null,i=null},open:function(){}}),i.track({module_id:"token",is_unique:!0,data:null}),g(a).then(function(){i.dialog("open")})}require(["text!token/token.html"]),require(["css!token/token.css"]);var i=null,j=null;return c.binders.clipboard={routine:function(a,b){var c=new e(a,{text:function(){return b}});c.on("success",function(){$.growl.notice({message:'Copied "'+b+'"'})}),c.on("error",function(){$.growl.error({message:"Your browser doesn't support copy to clipboard"})}),a._rv_clipboard_&&a._rv_clipboard_.destroy(),a._rv_clipboard_=c},unbind:function(a){a._rv_clipboard_.destroy()}},{init:f}});