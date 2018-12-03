exports.ids=[3],exports.modules={265:function(e,t,r){"use strict";var n={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},a={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},s=Object.defineProperty,o=Object.getOwnPropertyNames,c=Object.getOwnPropertySymbols,i=Object.getOwnPropertyDescriptor,u=Object.getPrototypeOf,p=u&&u(Object);e.exports=function e(t,r,l){if("string"!=typeof r){if(p){var h=u(r);h&&h!==p&&e(t,h,l)}var d=o(r);c&&(d=d.concat(c(r)));for(var f=0;f<d.length;++f){var m=d[f];if(!(n[m]||a[m]||l&&l[m])){var v=i(r,m);try{s(t,m,v)}catch(e){}}}return t}return t}},298:function(e,t){},299:function(e,t){},301:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),s=r(35),o=r(36),c=r(38),i=r(37),u=r(39),p=r(24),l=r(112);var h=function(e){function t(e){var r;return Object(s.a)(this,t),r=Object(c.a)(this,Object(i.a)(t).call(this,e)),e.hideHeader(),r}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentWillUnmount",value:function(){this.props.showHeader()}},{key:"render",value:function(){return null}}]),t}(n.Component),d=Object(p.b)(function(e){return{}},{showHeader:l.c,hideHeader:l.b})(h),f=r(303),m=(r(298),function(e){var t=e.children,r=e.type;return a.a.createElement("div",{className:"AuthTemplate"},a.a.createElement("div",{className:"title"},"login"===r?"로그인":"회원가입"),a.a.createElement("div",{className:"content"},t,"login"===r?a.a.createElement("div",{className:"info"},"계정이 없으신가요?",a.a.createElement(f.a,{to:"/register"},"회원가입")):a.a.createElement("div",{className:"info"},"이미 계정이 있으신가요? ",a.a.createElement(f.a,{to:"/login"},"로그인"))))}),v=r(25),b=r.n(v),y=r(41),g=r(11),O=r(302),j=r(113),w=r(27),E=r(53),k=r(55),A=(r(299),function(e){function t(){var e,r;Object(s.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(c.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(a)))).handleKeyPress=function(e){"Enter"===e.key&&r.props.onSubmit()},r}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.register,r=e.fields,n=e.onGoBack,s=e.onChange,o=e.onSubmit,c=e.error,i=r.username,u=r.password,p=r.passwordConfirm;return a.a.createElement("div",{className:"AuthForm"},c&&a.a.createElement("div",{className:"error"},c),a.a.createElement("div",{className:"inputs"},a.a.createElement("input",{name:"username",placeholder:"계정명",onChange:s,value:i}),a.a.createElement("input",{name:"password",type:"password",placeholder:"비밀번호",onChange:s,value:u,onKeyPress:this.handleKeyPress}),t&&a.a.createElement("input",{name:"passwordConfirm",type:"password",placeholder:"비밀번호 다시입력",onChange:s,value:p,onKeyPress:this.handleKeyPress})),a.a.createElement("div",{className:"buttons"},a.a.createElement(k.a,{onClick:n},"뒤로"),a.a.createElement(k.a,{className:"full-width",active:!0,onClick:o,type:"submit"},t?"회원가입":"로그인")))}}]),t}(a.a.Component));A.defaultProps={fields:{username:"",password:"",passwordConfirm:""}};var C=A,x=function(e){function t(){var e,r;Object(s.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(c.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(a)))).handleChange=function(e){var t=e.target,n=t.name,a=t.value;r.props.AuthActions.changeInput({field:n,value:a})},r.handleGoBack=function(){r.props.history.goBack()},r.handleRegister=Object(y.a)(b.a.mark(function e(){var t,n,a,s,o,c,i;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.props,n=t.fields,a=t.AuthActions,s=t.UserActions,o=n.username,c=n.password,i=n.passwordConfirm,c===i){e.next=5;break}return a.setError("비밀번호가 일치하지 않습니다."),e.abrupt("return");case 5:if(/^[a-z-0-9-_]{3,15}$/.test(o)){e.next=8;break}return a.setError("계정명은 3~15자의 영소문자/숫자여야 합니다."),e.abrupt("return");case 8:if(!(c.length<6)){e.next=11;break}return a.setError("비밀번호가 너무 짧습니다."),e.abrupt("return");case 11:return e.prev=11,e.next=14,a.register({username:o,password:c});case 14:return e.next=16,s.checkAuth();case 16:Object(E.d)(r.props.user),r.props.history.push("/"),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(11),console.log(e.t0);case 23:case"end":return e.stop()}},e,this,[[11,20]])})),r.handleLogin=Object(y.a)(b.a.mark(function e(){var t,n,a,s,o,c;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.props,n=t.fields,a=t.AuthActions,s=t.UserActions,o=n.username,c=n.password,e.prev=2,o){e.next=6;break}return a.setError("아이디를 입력하세요."),e.abrupt("return");case 6:if(c){e.next=9;break}return a.setError("비밀번호를 입력하세요."),e.abrupt("return");case 9:return e.next=11,a.login({username:o,password:c});case 11:return e.next=13,s.checkAuth();case 13:Object(E.d)(r.props.user),r.props.history.push("/"),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(2),console.log(e.t0);case 20:case"end":return e.stop()}},e,this,[[2,17]])})),r}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.props.AuthActions.initialize()}},{key:"componentDidUpdate",value:function(e,t){e.type!==this.props.type&&this.props.AuthActions.initialize()}},{key:"render",value:function(){var e=this.props,t=e.type,r=e.fields,n=e.error;return a.a.createElement(C,{register:"register"===t,onGoBack:this.handleGoBack,onChange:this.handleChange,onSubmit:"register"===t?this.handleRegister:this.handleLogin,fields:r,error:n})}}]),t}(n.Component),P=Object(g.d)(O.a,Object(p.b)(function(e){var t=e.auth,r=e.user;return{fields:t.fields,error:t.error,user:r.user}},function(e){return{AuthActions:Object(g.b)(j,e),UserActions:Object(g.b)(w,e)}}))(x);t.default=function(e){var t=e.match.params.authType;return a.a.createElement(m,{type:t},a.a.createElement(d,null),a.a.createElement(P,{type:t}))}},302:function(e,t,r){"use strict";var n=r(0),a=r.n(n),s=r(1),o=r.n(s),c=r(265),i=r.n(c),u=r(69),p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};var l=function(e){var t=function(t){var r=t.wrappedComponentRef,n=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(t,["wrappedComponentRef"]);return a.a.createElement(u.a,{children:function(t){return a.a.createElement(e,p({},n,t,{ref:r}))}})};return t.displayName="withRouter("+(e.displayName||e.name)+")",t.WrappedComponent=e,t.propTypes={wrappedComponentRef:o.a.func},i()(t,e)};t.a=l}};