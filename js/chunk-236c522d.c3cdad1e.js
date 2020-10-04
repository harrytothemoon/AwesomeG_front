(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-236c522d"],{"19eb":function(e,t,s){"use strict";var n=s("20d3"),a=s.n(n);a.a},"20d3":function(e,t,s){},6672:function(e,t,s){"use strict";s("a4d3"),s("e01a"),s("b0c0");var n=s("2fa3");t["a"]={getScope:function(e){return n["b"].get("/admin/scopes/".concat(e))},postScope:function(e){return n["b"].post("/admin/scopes",e)},putScope:function(e,t){return n["b"].put("/admin/scopes/".concat(e),{name:t})},deleteScope:function(e){var t=e.scopeId;return n["b"].delete("/admin/scopes/".concat(t))},getSubject:function(e){return n["b"].get("/admin/subjects/".concat(e))},postSubject:function(e){return n["b"].post("/admin/subjects",e)},putSubject:function(e,t){return n["b"].put("/admin/subjects/".concat(e),{name:t})},deleteSubject:function(e){var t=e.subjectId;return n["b"].delete("/admin/subjects/".concat(t))},getProduct:function(e){return n["b"].get("/admin/products/".concat(e))},postProduct:function(e){var t=e.name,s=e.description,a=e.price;return n["b"].post("/admin/products",{name:t,description:s,price:a})},putProduct:function(e,t){var s=t.name,a=t.description,c=t.price;return n["b"].put("/admin/products/".concat(e),{name:s,description:a,price:c})},deleteProduct:function(e){var t=e.productId;return n["b"].delete("/admin/products/".concat(t))}}},"9e22":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container py-5 text-primary",staticStyle:{"max-width":"950px"}},[s("ul",{staticClass:"nav nav-tabs mt-1 mb-4 d-flex justify-content-center"},[s("li",{staticClass:"nav-item w-25",staticStyle:{cursor:"pointer"}},[s("router-link",{staticClass:"nav-link text-center",attrs:{to:"/admin/background/products"}},[s("h4",[e._v("Products")])])],1),s("li",{staticClass:"nav-item w-25",staticStyle:{cursor:"pointer"}},[s("router-link",{staticClass:"nav-link text-center",attrs:{to:"/admin/background/subjects"}},[s("h4",[e._v("Subjects")])])],1),s("li",{staticClass:"nav-item w-25",staticStyle:{cursor:"pointer"}},[s("router-link",{staticClass:"nav-link text-center",attrs:{to:"/admin/background/scopes"}},[s("h4",[e._v("Scopes")])])],1)]),s("form",{staticClass:"my-4"},[s("div",{staticClass:"form-row d-flex justify-content-center"},[s("div",{staticClass:"col-auto"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.newScopeName,expression:"newScopeName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Create a Scope..."},domProps:{value:e.newScopeName},on:{input:function(t){t.target.composing||(e.newScopeName=t.target.value)}}})]),s("div",{staticClass:"col-auto"},[s("button",{staticClass:"btn btn-success",attrs:{type:"button",disabled:e.newIsProcessing},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.handlePostSubmit(t)}}},[s("h5",{staticClass:"m-0 text-center"},[e._v("Create")])])])])]),e.isLoading?s("Spinner"):s("div",{staticClass:"overflow-auto",staticStyle:{height:"500px"}},[s("table",{staticClass:"table table-hover text-center overflow-auto w-75 mx-auto",staticStyle:{"max-height":"500px"}},[s("thead",[s("tr",{staticClass:"table-warning"},[s("th",{attrs:{scope:"col"}},[e._v("Scope Name")]),s("th",{attrs:{scope:"col"}},[e._v("Edit")]),s("th",{attrs:{scope:"col"}},[e._v("Delete")])])]),s("tbody",e._l(e.scopes,(function(t){return s("tr",{key:t.id,staticClass:"table-light"},[s("td",[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.isEditing,expression:"!scope.isEditing"}],staticClass:"scope-name"},[e._v(" "+e._s(t.name)+" ")]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isEditing,expression:"scope.isEditing"}],staticClass:"scopeName"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"scope.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(s){s.target.composing||e.$set(t,"name",s.target.value)}}}),s("span",{directives:[{name:"show",rawName:"v-show",value:t.isEditing,expression:"scope.isEditing"}],staticClass:"cancel",on:{click:function(s){return e.handleCancel(t.id)}}},[e._v(" ✕ ")])])]),s("td",[s("button",{directives:[{name:"show",rawName:"v-show",value:!t.isEditing,expression:"!scope.isEditing"}],staticClass:"btn btn-info",attrs:{type:"button",disabled:e.editIsProcessing},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.toggleIsEditing(t.id)}}},[s("font-awesome-icon",{attrs:{icon:"pencil-alt"}})],1),s("button",{directives:[{name:"show",rawName:"v-show",value:t.isEditing,expression:"scope.isEditing"}],staticClass:"btn btn-info",attrs:{type:"button",disabled:e.editIsProcessing},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.updateScope(t.id,t.name)}}},[e._v(" Save ")])]),s("td",[s("button",{staticClass:"btn btn-danger",attrs:{type:"button",disabled:e.deleteIsProcessing},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.deleteScope(t.id)}}},[s("font-awesome-icon",{attrs:{icon:"trash-alt"}})],1)])])})),0)])]),s("div",{staticClass:"d-flex justify-content-center mt-4"},[s("NavTabs")],1)],1)},a=[],c=(s("d81d"),s("b0c0"),s("5530")),i=(s("96cf"),s("1da1")),r=s("8bb1"),o=s("2375"),u=s("eccd"),p=s("6672"),d=s("2fa3"),l={name:"Background-scope",components:{NavTabs:r["a"],Spinner:o["a"]},data:function(){return{scopes:[],isLoading:!0,deleteIsProcessing:!1,newIsProcessing:!1,editIsProcessing:!1,newScopeName:""}},created:function(){this.fetchScopes()},methods:{fetchScopes:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u["a"].getScopes();case 3:s=t.sent,e.scopes=s.data.scopes.map((function(e){return Object(c["a"])(Object(c["a"])({},e),{},{isEditing:!1,nameCached:""})})),e.isLoading=!1,t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),d["a"].fire({icon:"error",title:"Can't not get scopes data, please try again later"}),e.isLoading=!1;case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},handlePostSubmit:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var s,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.newIsProcessing=!0,t.next=4,p["a"].postScope({name:e.newScopeName});case 4:s=t.sent,n=s.data,a=s.statusText,"OK"===a||"success"===n.status?(e.newIsProcessing=!1,d["a"].fire({icon:"success",title:n.message}),e.newScopeName="",e.fetchScopes()):"OK"===a&&"error"!==n.status||(e.newIsProcessing=!1,d["a"].fire({icon:"error",title:n.message})),t.next=15;break;case 10:t.prev=10,t.t0=t["catch"](0),e.newIsProcessing=!1,d["a"].fire({icon:"error",title:"Can't not submit, please try again later"}),e.newScopeName="";case 15:case"end":return t.stop()}}),t,null,[[0,10]])})))()},updateScope:function(e,t){var s=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var a,c,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,s.editIsProcessing=!0,n.next=4,p["a"].putScope(e,t);case 4:if(a=n.sent,c=a.data,i=a.statusText,"OK"===i&&"success"===c.status){n.next=10;break}throw s.editIsProcessing=!1,new Error(i);case 10:"OK"!==i&&"success"!==c.status||(d["a"].fire({icon:"success",title:c.message}),s.editIsProcessing=!1,s.fetchScopes()),s.toggleIsEditing(e),n.next=18;break;case 14:n.prev=14,n.t0=n["catch"](0),d["a"].fire({icon:"error",title:"Can't not update Scope, please try again later"}),s.editIsProcessing=!1;case 18:case"end":return n.stop()}}),n,null,[[0,14]])})))()},deleteScope:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var n,a,c;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(!(t.scopes.length>13)){s.next=20;break}return t.deleteIsProcessing=!0,s.prev=2,s.next=5,p["a"].deleteScope({scopeId:e});case 5:if(n=s.sent,a=n.data,c=n.statusText,"OK"===c&&"success"===a.status){s.next=11;break}throw t.deleteIsProcessing=!1,new Error(c);case 11:"OK"!==c&&"success"!==a.status||(d["a"].fire({icon:"success",title:a.message}),t.deleteIsProcessing=!1,t.fetchScopes()),s.next=18;break;case 14:s.prev=14,s.t0=s["catch"](2),t.deleteIsProcessing=!1,d["a"].fire({icon:"error",title:"Can't not delete data, please try again later"});case 18:s.next=21;break;case 20:d["a"].fire({icon:"warning",title:"Please keep at least thirteen Scopes"});case 21:case"end":return s.stop()}}),s,null,[[2,14]])})))()},toggleIsEditing:function(e){this.scopes=this.scopes.map((function(t){return t.id===e?Object(c["a"])(Object(c["a"])({},t),{},{isEditing:!t.isEditing,nameCached:t.name}):t}))},handleCancel:function(e){this.scopes=this.scopes.map((function(t){return t.id===e?Object(c["a"])(Object(c["a"])({},t),{},{name:t.nameCached}):t})),this.toggleIsEditing(e)}}},m=l,v=(s("19eb"),s("2877")),f=Object(v["a"])(m,n,a,!1,null,null,null);t["default"]=f.exports},d81d:function(e,t,s){"use strict";var n=s("23e7"),a=s("b727").map,c=s("1dde"),i=s("ae40"),r=c("map"),o=i("map");n({target:"Array",proto:!0,forced:!r||!o},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},e01a:function(e,t,s){"use strict";var n=s("23e7"),a=s("83ab"),c=s("da84"),i=s("5135"),r=s("861d"),o=s("9bf2").f,u=s("e893"),p=c.Symbol;if(a&&"function"==typeof p&&(!("description"in p.prototype)||void 0!==p().description)){var d={},l=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof l?new p(e):void 0===e?p():p(e);return""===e&&(d[t]=!0),t};u(l,p);var m=l.prototype=p.prototype;m.constructor=l;var v=m.toString,f="Symbol(test)"==String(p("test")),g=/^Symbol\((.*)\)[^)]+$/;o(m,"description",{configurable:!0,get:function(){var e=r(this)?this.valueOf():this,t=v.call(e);if(i(d,e))return"";var s=f?t.slice(7,-1):t.replace(g,"$1");return""===s?void 0:s}}),n({global:!0,forced:!0},{Symbol:l})}},eccd:function(e,t,s){"use strict";var n=s("2fa3");t["a"]={getScopes:function(){return n["b"].get("/scopes")}}}}]);
//# sourceMappingURL=chunk-236c522d.c3cdad1e.js.map