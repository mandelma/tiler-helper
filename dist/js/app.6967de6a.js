(function(e){function t(t){for(var a,o,i=t[0],l=t[1],d=t[2],c=0,u=[];c<i.length;c++)o=i[c],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&u.push(r[o][0]),r[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);m&&m(t);while(u.length)u.shift()();return n.push.apply(n,d||[]),s()}function s(){for(var e,t=0;t<n.length;t++){for(var s=n[t],a=!0,i=1;i<s.length;i++){var l=s[i];0!==r[l]&&(a=!1)}a&&(n.splice(t--,1),e=o(o.s=s[0]))}return e}var a={},r={app:0},n=[];function o(t){if(a[t])return a[t].exports;var s=a[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=a,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(s,a,function(t){return e[t]}.bind(null,a));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var m=l;n.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"034f":function(e,t,s){"use strict";s("9f4d")},"3e8b":function(e,t,s){},"4d40":function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);s("becf"),s("cabf"),s("3c76");var a=s("2b0e"),r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("mdb-navbar",{staticClass:"mt-2 lighten-1",attrs:{color:"red",expand:"xl",dark:"",animated:"",animation:"3"}},[s("mdb-navbar-brand",{attrs:{href:"#"}},[e._v("\n      Navbar\n    ")]),s("mdb-navbar-toggler",[s("mdb-navbar-nav",{attrs:{right:""}},[s("mdb-nav-item",{attrs:{href:"#",active:""}},[s("router-link",{attrs:{to:"/"}},[e._v("Etusivu")])],1),s("mdb-nav-item",{attrs:{href:"#"}},[e._v("Link")]),s("mdb-nav-item",{staticClass:"disabled",attrs:{href:"#"}},[e._v("Disabled")]),s("mdb-dropdown",{staticClass:"nav-item",attrs:{tag:"li"}},[s("mdb-dropdown-toggle",{attrs:{slot:"toggle",tag:"a",navLink:"",color:"stylish","waves-fixed":""},slot:"toggle"},[e._v("Dropdown")]),s("mdb-dropdown-menu",[s("mdb-dropdown-item",[e._v("Action")]),s("mdb-dropdown-item",[e._v("Another action")]),s("mdb-dropdown-item",[e._v("Something else here")])],1)],1),e.loginUser?s("mdb-dropdown",{staticClass:"nav-item",attrs:{tag:"li"}},[s("mdb-dropdown-toggle",{attrs:{slot:"toggle",tag:"a",navLink:"",color:"stylish","waves-fixed":""},slot:"toggle"},[e._v("Profile")]),s("mdb-dropdown-menu",[s("mdb-dropdown-item",[e._v("Data")]),s("mdb-dropdown-item",{on:{click:e.handleLogout}},[e._v("Log out")]),s("mdb-dropdown-item",[e._v("Something else here")])],1)],1):s("mdb-nav-item",{staticClass:"nav-login",attrs:{href:"#"}},[s("router-link",{attrs:{to:"/login"}},[s("i",{staticClass:"user icon"}),e._v("\n            Login\n          ")])],1)],1)],1)],1),s("mdb-container",[s("h3",{staticStyle:{"text-align":"center"}},[e._v("User name: "+e._s(e.loginUser.name))])]),s("div",{staticClass:"messagefield"}),s("router-view",{on:{login:e.handleLogin,"create:user":e.createUser}})],1)},n=[],o=s("91c9");const i=s("bc3a"),l="/api/users",d=async()=>{const e=await i.get(l);return e.data},m=async e=>{const t=await i.post(""+l,e);return t.data};var c={getAll:d,createUser:m},u={name:"App",components:{mdbNavbar:o["mdbNavbar"],mdbNavbarBrand:o["mdbNavbarBrand"],mdbNavbarToggler:o["mdbNavbarToggler"],mdbNavbarNav:o["mdbNavbarNav"],mdbNavItem:o["mdbNavItem"],mdbContainer:o["mdbContainer"],mdbDropdown:o["mdbDropdown"],mdbDropdownToggle:o["mdbDropdownToggle"],mdbDropdownMenu:o["mdbDropdownMenu"],mdbDropdownItem:o["mdbDropdownItem"]},data(){return{users:[],isUsername:!1,loginUser:"",message:"",message1:"",passwordError:!1}},mounted(){const e=window.localStorage.getItem("loggedUser");if(e){const t=JSON.parse(e);this.loginUser=t}this.getUsers()},computed:{},methods:{async getUsers(){this.users=await c.getAll()},createUser(e){console.log("New user name is ",e.name),""!==e.name&&""!==e.username&&""!==e.password&&(c.createUser(e),console.log("All fields are set"))},handleLogin(e){this.loginUser=e},handleLogout(){window.localStorage.removeItem("loggedUser"),this.loginUser=""},errorHandling(){}}},b=u,g=(s("034f"),s("2877")),h=Object(g["a"])(b,r,n,!1,null,null,null),p=h.exports,v=s("8c4f"),f=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("mdb-container",[s("h1",[e._v("Plaaditav sein")]),s("mdb-row",[s("mdb-col",{attrs:{id:"panel",lg:"3"}},[s("mdb-input",{attrs:{label:"Enter wall width",size:"lg"},model:{value:e.wallx,callback:function(t){e.wallx=t},expression:"wallx"}}),s("mdb-input",{attrs:{label:"Enter wall height",size:"lg"},model:{value:e.wally,callback:function(t){e.wally=t},expression:"wally"}}),s("mdb-btn",{attrs:{block:"",color:"green"},on:{click:e.createRect}},[e._v("Loo nelinurk")])],1),s("mdb-col",{attrs:{id:"container"}},[s("canvas",{attrs:{id:"wall",width:"400",height:"300"}}),s("br")])],1)],1)],1)},w=[],y={name:"main-page",components:{mdbContainer:o["mdbContainer"],mdbBtn:o["mdbBtn"],mdbRow:o["mdbRow"],mdbCol:o["mdbCol"],mdbInput:o["mdbInput"]},data(){return{wall:null,wallx:null,wally:null,x_full_tiles:0}},mounted(){const e=document.getElementById("wall");this.wall=e.getContext("2d")},methods:{createRect(){let e=this.wall;this.x_full_tiles=400/23,console.log("Wall full tiles ",this.x_full_tiles),this.x_full_tiles=(0|this.x_full_tiles)-1,console.log("Wall full tiles ",this.x_full_tiles);for(let t=0;t<this.x_full_tiles;t++){const s=10+23*t;for(let t=0;t<5;t++){const a=10+23*t;e.fillStyle="red",e.fillRect(s,a,20,20)}}}}},_=y,x=(s("d7c3"),Object(g["a"])(_,f,w,!1,null,"041fcbae",null)),E=x.exports,C=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.isRegister?s("div",{staticStyle:{width:"50%",margin:"auto"}},[s("register",{on:{"cansel:register":e.canselRegister}})],1):s("mdb-container",[s("mdb-alert",{attrs:{color:"success"}},[e._v("\n      This is a success alert—check it out!\n    ")]),s("section",{staticClass:"form-simple"},[s("mdb-row",{staticClass:"d-flex",attrs:{center:""}},[s("mdb-col",{attrs:{md:"7"}},[s("mdb-card",[s("div",{staticClass:"header pt-3 grey lighten-2"},[s("mdb-row",{staticClass:"d-flex justify-content-start"},[s("h3",{staticClass:"deep-grey-text mt-3 mb-4 pb-1 mx-5"},[e._v("Log in")])])],1),s("mdb-card-body",{staticClass:"mx-4 mt-4"},[e.testError?s("mdb-alert",{attrs:{color:"danger"}},[e._v("\n                Username and password are missing!\n              ")]):e._e(),s("mdb-input",{attrs:{label:"Your username",icon:"user icon",type:"text"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),s("mdb-input",{attrs:{label:"Your password",icon:"lock icon",type:"password",containerClass:"mb-0"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),s("p",{staticClass:"font-small grey-text d-flex justify-content-end"},[e._v("Forgot "),s("a",{staticClass:"dark-grey-text font-weight-bold ml-1",attrs:{href:"#"}},[e._v(" Password?")])]),s("div",{staticClass:"text-center mb-4 mt-5"},[s("mdb-btn",{staticClass:"btn-block z-depth-2",attrs:{color:"danger",type:"button"},on:{click:e.login}},[e._v("Log in")])],1),s("p",{staticClass:"font-small grey-text d-flex justify-content-center"},[e._v("Don't have an account? "),s("a",{staticClass:"dark-grey-text font-weight-bold ml-1",attrs:{href:"#"},on:{click:e.register}},[e._v(" Sign up")])])],1)],1)],1)],1)],1)],1)],1)},k=[],U=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("mdb-container",[s("form",{attrs:{novalidate:""},on:{submit:function(t){return t.preventDefault(),e.validateForm(t)}}},[s("mdb-input",{attrs:{type:"text",id:"customInput1",label:"First name",customValidation:e.validation.name.validated,isValid:e.validation.name.valid,required:"",invalidFeedback:e.errorMsg.firstnameError},on:{change:function(t){return e.validate("name")}},model:{value:e.customValues.name,callback:function(t){e.$set(e.customValues,"name",t)},expression:"customValues.name"}}),s("mdb-input",{attrs:{type:"text",id:"customInput2",label:"Last name",customValidation:e.validation.lastname.validated,isValid:e.validation.lastname.valid,required:"",validFeedback:"Look's good.",invalidFeedback:e.errorMsg.lastnameError},on:{change:function(t){return e.validate("lastname")}},model:{value:e.customValues.lastname,callback:function(t){e.$set(e.customValues,"lastname",t)},expression:"customValues.lastname"}}),s("mdb-btn",{attrs:{type:"Submit",size:"sm",color:"danger"},on:{click:e.handleSubmit}},[e._v("Submit")])],1)])],1)},S=[],j={name:"register",components:{mdbInput:o["mdbInput"],mdbBtn:o["mdbBtn"],mdbContainer:o["mdbContainer"]},data(){return{submitting:!1,errorMsg:{lastnameError:"",firstnameError:""},userData:{name:"",username:"",password:""},hasError:!1,isError:!1,customValues:{name:"",lastname:""},validation:{name:{valid:!1,validated:!1},lastname:{valid:!1,validated:!1}}}},methods:{newUser(){this.isError=!0,this.hasError=!0,this.$emit("user:details",this.userData)},canselRegister(){console.log("Canselled!"),this.$emit("cansel:register",!1)},handleSubmit(){console.log("Submitting the form"),this.submitting=!0},validateForm(){Object.keys(this.customValues).forEach(e=>{this.submitting&&this.validate(e)})},validate(e){"name"===e?(this.customValues[e]?this.validation[e].valid=!0:(this.validation[e].valid=!1,this.errorMsg.firstnameError="Name field is empty!"),this.customValues[e].length>=1&&this.customValues[e].length<3&&(this.validation[e].valid=!1,this.errorMsg.firstnameError="Name should be longer than 2 letters!"),this.validation[e].validated=!0):"lastname"===e&&this.submitting&&(this.customValues[e]?this.validation[e].valid=!0:(this.validation[e].valid=!1,this.errorMsg.lastnameError="Lastname field is empty!"),this.customValues[e].length>=1&&this.customValues[e].length<5&&(this.validation[e].valid=!1,this.errorMsg.lastnameError="Name should be longer than 4 letters!"),this.validation[e].validated=!0)}}},N=j,O=Object(g["a"])(N,U,S,!1,null,"54165740",null),V=O.exports;const D=s("bc3a"),I="/api/login",R=async e=>{const t=await D.post(I,e);return t.data};var L={login:R},M={name:"login",components:{Register:V,mdbRow:o["mdbRow"],mdbCol:o["mdbCol"],mdbCard:o["mdbCard"],mdbCardBody:o["mdbCardBody"],mdbInput:o["mdbInput"],mdbBtn:o["mdbBtn"],mdbAlert:o["mdbAlert"],mdbContainer:o["mdbContainer"]},props:{type:Object},data(){return{testError:!1,isRegister:!1,isUsername:!1,userDetails:{name:"",username:"",password:""},loginUser:"",username:"",password:"",usernameError:!1,isError:!1,pwError:!1,message:""}},mounted(){},methods:{getUserDetails(e){this.$emit("create:user",e)},async login(){if(this.usernameError=!1,this.pwError=!1,""===this.username&&""===this.password)this.message="Username and password are missing",console.log("username and password are empty"),this.usernameError=!0,this.pwError=!0,this.isError=!0,this.username.length>0&&(this.usernameError=!1),setTimeout(()=>{this.isError=!1},3e3);else if(""===this.username)console.log("username is missing"),this.message="username is missing",this.usernameError=!0,this.isError=!0;else if(""===this.password)console.log("password is missing"),this.message="Password is missing",this.pwError=!0,this.isError=!0;else{const e=await c.getAll();if(e.forEach(e=>{e.username===this.username&&(this.isUsername=!0)}),this.isUsername){const e=await L.login({username:this.username,password:this.password});e.error?(console.log("Salasana on virheelline!"),this.pwError=!0,this.isError=!0,this.message="Salasana on virheelline!"):(this.$emit("login",e),this.loginUser=e,window.localStorage.setItem("loggedUser",JSON.stringify(e)),this.message="You ara successfully signed in!",this.$router.push("/"))}else this.message="Käyttäjätunnus tai salasana ovat virheelliset!",this.usernameError=!0,this.pwError=!0,this.isError=!0,console.log("Käyttäjätunnus tai salasana ovat virheelliset!"),this.message="Käyttäjätunnus tai salasana ovat virheelliset!"}},register(){console.log("Tested!"),this.isRegister=!0},canselRegister(e){console.log("Register is out ",e),this.isRegister=e}}},$=M,B=(s("ccd7"),Object(g["a"])($,C,k,!1,null,"192d61ab",null)),P=B.exports;a["a"].use(v["a"]);const T=new v["a"]({mode:"history",routes:[{path:"/",name:"main-page",component:E,props:!0},{path:"/login",name:"login",component:P,props:!0},{path:"/register",name:"register",component:V,props:!0}]});var A=T;a["a"].config.productionTip=!1,new a["a"]({router:A,render:e=>e(p)}).$mount("#app")},"9f4d":function(e,t,s){},ccd7:function(e,t,s){"use strict";s("4d40")},d7c3:function(e,t,s){"use strict";s("3e8b")}});
//# sourceMappingURL=app.6967de6a.js.map