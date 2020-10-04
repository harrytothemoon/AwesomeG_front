(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-591bad24"],{"0e4f":function(t,e,s){},"1b6f":function(t,e,s){"use strict";var a=s("a4fa"),i=s.n(a);i.a},2692:function(t,e,s){"use strict";var a=s("0e4f"),i=s.n(a);i.a},6437:function(t,e,s){"use strict";var a=s("2fa3");e["a"]={getSubjects:function(){return a["b"].get("/subjects")}}},8127:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container py-4"},[s("div",{staticClass:"d-flex justify-content-center mt-2"},[s("PostQuestionM",{attrs:{isProcessing:t.isProcessing},on:{"after-submit":t.handleAfterSubmit}}),s("AnswerDetailM",{attrs:{getQuestion:t.getQuestion}}),s("NavTabs")],1),s("div",{staticClass:"d-flex flex-column justify-content-center mt-4"},[s("ul",{staticClass:"nav nav-tabs"},[s("li",{staticClass:"nav-item w-50",staticStyle:{cursor:"pointer"}},[s("a",{staticClass:"nav-link text-center",class:{active:"unSolved"===t.visibility},on:{click:function(e){return t.setVisibility("unSolved")}}},[s("h3",[t._v("UnSolved")])])]),s("li",{staticClass:"nav-item w-50",staticStyle:{cursor:"pointer"}},[s("a",{staticClass:"nav-link text-center",class:{active:"Solved"===t.visibility},on:{click:function(e){return t.setVisibility("Solved")}}},[s("h3",[t._v("Solved")])])])]),s("div",{staticClass:"jumbotron bg-primary pt-1 overflow-auto",staticStyle:{"border-radius":"0px",border:"6px inset #b6b8ba",height:"650px"}},[t.isLoading?s("Spinner"):[s("div",{staticClass:"text-center mt-2"},[s("button",{staticClass:"btn btn-success btn-lg",attrs:{type:"button","data-toggle":"modal","data-target":"#postQ"}},[s("h2",{staticClass:"m-0"},[t._v("+ Ask more")])])]),t._l(t.filteredQuestions,(function(e){return s("div",{key:e.id,staticClass:"card border-primary mt-3 text-primary mx-auto",staticStyle:{"max-width":"80vw","background-color":"#fffbf0"}},[s("div",{staticClass:"card-body row p-2",attrs:{id:"myquestioncard"}},[s("div",{staticClass:"left-side d-flex align-items-center text-center col-6 border-right"},[s("div",{staticClass:"row w-100 m-0 d-flex align-items-center"},[s("div",{staticClass:"col-12 col-sm-5 col-md-4 mt-1"},[e.image?s("img",{directives:[{name:"viewer",rawName:"v-viewer"}],staticClass:"rounded",staticStyle:{cursor:"zoom-in"},attrs:{src:e.image,alt:"Card image cap",width:"180px",height:"180px"}}):s("img",{staticClass:"rounded",attrs:{src:"https://image.damanwoo.com/files/media/c/h/r/o/m/e/d/i/n/o/chrome_dino_set-2.jpg",alt:"Card image cap",width:"180px",height:"180px"}})]),s("div",{staticClass:"col-12 col-sm-7 col-md-8"},[s("h3",{staticClass:"mb-0",staticStyle:{color:"#c03546"}},[t._v(" "+t._s(e.Subject.name)+" ")]),s("span",{staticStyle:{color:"gray"}},[t._v(t._s(e.Scope.name))]),s("p",{staticStyle:{"max-height":"80px"}},[t._v(" "+t._s(t._f("ellipsis")(e.description))+" ")]),s("h6",{staticStyle:{color:"#4f86c6"}},[t._v(" "+t._s(t._f("fromNow")(e.createdAt))+". ")])])])]),s("div",{staticClass:"right-side text-center col-6"},[s("h3",{staticClass:"border-bottom mb-0",staticStyle:{color:"#004e66"}},[t._v(" Status ")]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 col-md-4 my-2"},[e.Answer.User.avatar?s("img",{staticClass:"rounded-circle",attrs:{src:e.Answer.User.avatar,alt:"Card image cap",width:"100px",height:"100px"}}):s("img",{staticClass:"rounded-circle",attrs:{src:"https://i.imgflip.com/213ss9.jpg",alt:"Card image cap",width:"100px",height:"100px"}})]),2===e.StatusId?s("div",{staticClass:"col-12 col-md-8 d-flex flex-column align-items-center justify-content-center"},[s("h4",{staticClass:"text-left"},[t._v(t._s(e.Answer.User.name))]),s("h2",{staticStyle:{color:"#c03546"}},[t._v(t._s(e.Status.name))])]):3===e.StatusId||4===e.StatusId?s("div",{staticClass:"col-12 col-md-8 d-flex flex-column align-items-center justify-content-center"},[s("h4",{staticClass:"text-left"},[t._v(t._s(e.Answer.User.name))]),s("h2",{staticStyle:{color:"#c03546"}},[t._v(t._s(e.Status.name))]),s("button",{staticClass:"btn btn-info text-center pb-0",attrs:{type:"button","data-toggle":"modal","data-target":"#answerD"},on:{click:function(s){return t.showAnswerDetail(e.id)}}},[s("h4",[t._v("Review Answer")])])]):s("div",{staticClass:"col-12 col-md-8 d-flex flex-column align-items-center justify-content-center"},[s("h2",{staticStyle:{color:"#c03546"}},[t._v(t._s(e.Status.name))])])])])])])}))]],2)])])},i=[],r=(s("4de4"),s("b0c0"),s("a9e3"),s("96cf"),s("1da1")),n=s("8bb1"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal fade",attrs:{id:"postQ",tabindex:"-1",role:"dialog","aria-labelledby":"postQLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog text-primary text-center",staticStyle:{"max-width":"650px"},attrs:{role:"document"}},[a("div",{staticClass:"modal-content",staticStyle:{"background-color":"#fffbf0"}},[t._m(0),a("h1",{staticClass:"modal-title",staticStyle:{color:"#c03546"},attrs:{id:"postQLabel"}},[t._v(" Ask your question ")]),a("div",{staticClass:"modal-body mt-2"},[a("form",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],staticClass:"w-100",on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.handleSubmit(e)}}},[a("div",{staticClass:"form-group"},[t._m(1),a("select",{staticClass:"form-control w-75 mx-auto",staticStyle:{cursor:"pointer"},attrs:{id:"subject",required:"",name:"subjectId"}},[a("option",{attrs:{value:"",selected:"",disabled:""}},[t._v("Please Choose")]),t._l(t.subjects,(function(e){return a("option",{key:e.id,domProps:{value:e.id}},[t._v(" "+t._s(e.name)+" ")])}))],2)]),a("div",{staticClass:"form-group"},[t._m(2),a("select",{staticClass:"form-control w-75 mx-auto",staticStyle:{cursor:"pointer"},attrs:{id:"scope",required:"",name:"scopeId"}},[a("option",{attrs:{value:"",selected:"",disabled:""}},[t._v("Please Choose")]),t._l(t.scopes,(function(e){return a("option",{key:e.id,domProps:{value:e.id}},[t._v(" "+t._s(e.name)+" ")])}))],2)]),a("div",{staticClass:"row mt-4"},[a("div",{staticClass:"form-group col-6"},[t._m(3),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control",attrs:{id:"description",rows:"7",placeholder:"Please describe your question...",name:"description"},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})]),a("div",{staticClass:"form-group col-6"},[a("h4",[t._v("Question's Image")]),a("div",{staticClass:"img-upload-block btn btn-outline-secondary d-flex justify-content-center align-items-center",staticStyle:{border:"3px dashed"}},[a("input",{staticClass:"form-control-file",staticStyle:{cursor:"pointer"},attrs:{id:"img-file",type:"file",name:"image",accept:"image/*"},on:{change:t.handleFileChange}}),t.image?a("img",{staticClass:"d-block rounded",staticStyle:{cursor:"pointer"},attrs:{src:t.image,id:"custom-img"}}):a("img",{staticClass:"d-block",staticStyle:{cursor:"pointer"},attrs:{src:s("fd6d"),id:"custom-img-default",width:"70px",height:"70px"}})])])]),a("button",{staticClass:"btn btn-primary btn-block mb-3 w-25 mx-auto",staticStyle:{"background-color":"#c03546"},attrs:{disabled:t.isProcessing,type:"submit"}},[a("h4",{staticClass:"m-0 text-center"},[t._v("Submit")])])])])])])])},c=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"d-flex justify-content-end"},[s("button",{staticClass:"close m-0 mr-3 mt-3",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("label",{attrs:{for:"subject"}},[s("h4",[t._v("Subject")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("label",{attrs:{for:"scope"}},[s("h4",[t._v("Scope")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("label",{attrs:{for:"description"}},[s("h4",[t._v("Question's Description")])])}],l=(s("a4d3"),s("e01a"),s("d3b7"),s("3ca3"),s("ddb0"),s("2b3d"),s("6437")),u=s("eccd"),d=s("2fa3"),m={props:{isProcessing:{type:Boolean,required:!0}},data:function(){return{subjects:[],scopes:[],subject:"",scope:"",description:"",image:"",isLoading:!0}},created:function(){this.fetchScopes(),this.fetchSubjects()},methods:{fetchSubjects:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l["a"].getSubjects();case 3:s=e.sent,t.subjects=s.data.subjects,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),d["a"].fire({icon:"error",title:"Can't not get subject data, please try again later"});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},fetchScopes:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u["a"].getScopes();case 3:s=e.sent,t.scopes=s.data.scopes,t.isLoading=!1,e.next=12;break;case 8:e.prev=8,e.t0=e["catch"](0),t.isLoading=!1,d["a"].fire({icon:"warning",title:"Can't not get Scope data, please try again later"});case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()},handleFileChange:function(t){var e=t.target.files;if(0===e.length)this.image="";else{var s=window.URL.createObjectURL(e[0]);this.image=s}},handleSubmit:function(t){var e=t.target,s=new FormData(e);this.$emit("after-submit",s),this.description=""}}},f=m,p=(s("2692"),s("2877")),v=Object(p["a"])(f,o,c,!1,null,null,null),g=v.exports,b=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal fade",attrs:{id:"answerD",tabindex:"-1",role:"dialog","aria-labelledby":"answerDLabel","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog text-primary text-center",staticStyle:{"max-width":"650px"},attrs:{role:"document"}},[s("div",{staticClass:"modal-content",staticStyle:{"background-color":"#fffbf0"}},[t._m(0),s("div",{staticClass:"modal-body mt-2"},[s("div",{staticClass:"card mb-3 border-0"},[t.getQuestion.Answer.image?s("img",{directives:[{name:"viewer",rawName:"v-viewer"}],staticClass:"card-img-top",staticStyle:{cursor:"zoom-in"},attrs:{src:t.getQuestion.Answer.image,alt:"Card image cap",height:"350px"}}):s("img",{staticClass:"card-img-top",attrs:{src:"https://image.damanwoo.com/files/media/c/h/r/o/m/e/d/i/n/o/chrome_dino_set-2.jpg",alt:"Card image cap",height:"350px"}}),s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-title mb-0 text-center",staticStyle:{color:"#c03546"}},[t._v(" Answer ")]),s("p",{staticClass:"card-text"},[t._v(t._s(t.getQuestion.Answer.answer))])])])])])])])},h=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"d-flex justify-content-end"},[s("button",{staticClass:"close m-0 mr-3 mt-3",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],w={props:{getQuestion:{type:Object,default:function(){return{id:null,Answer:{answer:null,image:null}}}}},data:function(){return{questionId:this.getQuestion.id?this.getQuestion.id:""}}},y=w,C=Object(p["a"])(y,b,h,!1,null,null,null),x=C.exports,S=s("2375"),_=s("2708"),j=s("fd4a"),Q=s("1157"),k=s.n(Q),A=s("4360"),P={unSolved:function(t){return t.filter((function(t){return 1===t.StatusId||2===t.StatusId}))},Solved:function(t){return t.filter((function(t){return 3===t.StatusId||4===t.StatusId}))}},q={mixins:[_["a"]],components:{NavTabs:n["a"],PostQuestionM:g,AnswerDetailM:x,Spinner:S["a"]},data:function(){return{questions:[],visibility:"unSolved",targetId:"",isProcessing:!1,isLoading:!0}},created:function(){this.fetchQuestions()},sockets:{postAnswers:function(){this.fetchQuestions()},putAnswers:function(){this.fetchQuestions()}},methods:{fetchQuestions:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j["a"].getStudentQuestions();case 3:s=e.sent,t.questions=s.data.questions,t.isLoading=!1,e.next=12;break;case 8:e.prev=8,e.t0=e["catch"](0),d["a"].fire({icon:"error",title:"Can't not get questions data, please try again later"}),t.isLoading=!1;case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()},handleAfterSubmit:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function s(){var a,i;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,e.isProcessing=!0,s.next=4,j["a"].postQuestion.create({formData:t});case 4:a=s.sent,i=a.data,"success"===i.status?(e.isProcessing=!1,d["a"].fire({icon:"success",title:i.message}),e.fetchQuestions(),k()("#postQ").modal("hide"),e.$socket.emit("postQuestions",A["a"].state.currentUser.id,A["a"].state.currentUser.role,A["a"].state.currentUser.name,A["a"].state.currentUser.avatar,Date.now())):"warning"===i.status&&(e.isProcessing=!1,d["a"].fire({icon:"warning",title:i.message}),k()("#postQ").modal("hide"),e.$router.push("/users/".concat(A["a"].state.currentUser.id))),s.next=13;break;case 9:s.prev=9,s.t0=s["catch"](0),e.isProcessing=!1,d["a"].fire({icon:"error",title:"Can't not post question, please try again later"});case 13:case"end":return s.stop()}}),s,null,[[0,9]])})))()},setVisibility:function(t){this.visibility=t},showAnswerDetail:function(t){this.targetId=t}},computed:{filteredQuestions:function(){return P[this.visibility](this.questions)},getQuestion:function(){var t=this;return this.questions.filter((function(e){return Number(e.id)===Number(t.targetId)}))[0]}}},I=q,L=(s("1b6f"),Object(p["a"])(I,a,i,!1,null,null,null));e["default"]=L.exports},a4fa:function(t,e,s){},e01a:function(t,e,s){"use strict";var a=s("23e7"),i=s("83ab"),r=s("da84"),n=s("5135"),o=s("861d"),c=s("9bf2").f,l=s("e893"),u=r.Symbol;if(i&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},m=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof m?new u(t):void 0===t?u():u(t);return""===t&&(d[e]=!0),e};l(m,u);var f=m.prototype=u.prototype;f.constructor=m;var p=f.toString,v="Symbol(test)"==String(u("test")),g=/^Symbol\((.*)\)[^)]+$/;c(f,"description",{configurable:!0,get:function(){var t=o(this)?this.valueOf():this,e=p.call(t);if(n(d,t))return"";var s=v?e.slice(7,-1):e.replace(g,"$1");return""===s?void 0:s}}),a({global:!0,forced:!0},{Symbol:m})}},eccd:function(t,e,s){"use strict";var a=s("2fa3");e["a"]={getScopes:function(){return a["b"].get("/scopes")}}},fd4a:function(t,e,s){"use strict";var a=s("2fa3");e["a"]={getStudentQuestions:function(){return a["b"].get("/student/questions")},getTeacherQuestions:function(){return a["b"].get("/teacher/questions")},postQuestion:{create:function(t){var e=t.formData;return a["b"].post("/student/questions",e)}}}}}]);
//# sourceMappingURL=chunk-591bad24.204522e5.js.map