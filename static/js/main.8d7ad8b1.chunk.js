(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{121:function(e,t,a){e.exports=a.p+"static/media/emily.dce7472c.jpg"},126:function(e,t,a){e.exports=a.p+"static/media/morning.1cc63b5d.jpg"},127:function(e,t,a){e.exports=a.p+"static/media/midmorning.af6168ab.jpg"},128:function(e,t,a){e.exports=a.p+"static/media/afternoon.13557a11.jpg"},129:function(e,t,a){e.exports=a.p+"static/media/earlyevening.ce93c45f.jpg"},130:function(e,t,a){e.exports=a.p+"static/media/night.5260a147.jpg"},5357:function(e,t,a){e.exports=a(5535)},5362:function(e,t,a){},5535:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(21),o=a.n(r),l=a(15),c=a(22),s=a(17),u=a(16),d=a(18),m=(a(5362),a(24)),h=a(29),p=a(116),y=a.n(p),f=Object(m.createMuiTheme)({palette:{primary:{light:h.blue[300],main:h.blue[500],dark:h.blue[700]},secondary:{light:h.red[300],main:h.red[500],dark:h.red[700]}},typography:{useNextVariants:!0,fontSize:12},type:"light"});var b=function(e){return function(t){return i.a.createElement(m.MuiThemeProvider,{theme:f},i.a.createElement(y.a,null),i.a.createElement(e,t))}},g=a(140),E=a.n(g),O=a(58),D=a.n(O),v=a(138),x=a.n(v),j=a(139),C=a.n(j),S=a(5536),k=function e(){Object(l.a)(this,e)};k.convertToHumanDate=function(e){return e.substring(12).replace(/_/g,"/")},k.getDateStorageName=function(){return"daySchedule_"+Object(S.a)(new Date,"MM_dd_yyyy")};var w=a(46),P=a.n(w),I=a(124),N=a.n(I),A=a(122),T=a.n(A),_=a(28),M=a(23),U=a.n(M),W=a(123),B=a.n(W),L=a(20),H=a.n(L),R=a(70),Y=a(117),J=a.n(Y),q=a(25),z=a.n(q),F=a(26),V=a.n(F),X=a(119),$=a.n(X),G=a(120),K=a.n(G),Q=a(118),Z=a.n(Q);function ee(e){return i.a.createElement(Z.a,Object.assign({direction:"up"},e))}var te=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).handleOpen=function(){e.setState({open:!0})},e.handleClose=function(){e.setState({open:!1})},e.state={open:!0,body:""},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){de.on(":OPEN_POPUP",this.handleOpen).on(":CLOSE_POPUP",this.handleClose)}},{key:"componentWillUnmount",value:function(){de.removeListener(":OPEN_POPUP",this.handleOpen).removeListener(":CLOSE_POPUP",this.handleClose)}},{key:"render",value:function(){return i.a.createElement($.a,{open:this.state.open,TransitionComponent:ee,keepMounted:!0,onClose:this.handleClose,"aria-labelledby":"alert-dialog-slide-title","aria-describedby":"alert-dialog-slide-description",scroll:"body"},i.a.createElement(K.a,{id:"alert-dialog-slide-title",color:"primary"},i.a.createElement(H.a,{component:"span",variant:"h4",color:"primary"},this.title)),this.state.body,this.actions)}}]),t}(n.Component),ae=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement(U.a,{onClick:de.closePopup,color:"primary"},"Okay")}}]),t}(n.Component),ne={title:"Journal",headers:["Significant events","Affective state","Comments"],headerAlternates:["Activities and locations","Emotional/stress reactions","Additional info"],headerDescriptions:["Significant things that happened. Describe activities and locations you were engaged in.","Describe, in as much detail as you can, your affective state.","Other comments?"],endOfDayPrompt:"End of the day reflection / other comments",background:"My senior project will examine student perceptions of stress. In this study, we would like to find out how the higher\n    education experience affects students\u2019 perception of stress. We want to find out what counts as \u201cstressful\u201d for American college\n    students by considering their subjective experience. This activity is known as a Day Reconstruction Method (DRM) which provides\n    more continuous information and is more narrative and story like qualitative information than a plan survey. By doing this activity, I\n    am hoping to gain a better understanding of how sorts of activities are associated with stress.\n    Your privacy is important to me and your personal information will not be attached to your responses. By filling out this sheet and participating\n    in the activity, you are consenting to participate in the study and agree that the purpose of this research has been satisfactorily\n    explained to you.",instructions:"I am asking you to track your daily activities and associated stress level. This should be done twice a week for three\n    weeks, for a total of six different days (unless otherwise specified by me). This form will be your guide. Please fill out each box,\n    preferably adding to it as the day progresses to keep responses more authentic and accurate. For each part of the day, fill out the\n    three categories to the best of your ability, being as thorough as you are able. Describe anything significant that happened\n    in that time frame (classes, meetings, interactions, etc.) and how you felt about it. Did it make you happy, excited, tired, stressed,\n    overwhelmed, etc? Please feel free to add whatever comes to your mind. The more the merrier. I have also provided a section for a\n    reflection on the entire day. Think back on your day and whether it was good, bad, stressful, normal, exciting, etc.",disclaimer:"At no time are you required to write about or answer anything that you don\u2019t feel comfortable with. Luther College has as standing\n    committee, the HSRB, to which complaints or problems concerning any research project may be reported to The Dean\u2019s Office,\n    Luther College, 563-387-1005 if they arise."},ie=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).title="Disclaimer",e.actions=i.a.createElement(ae,null),e.state={open:!0,body:i.a.createElement(z.a,null,i.a.createElement(V.a,{id:"alert-dialog-slide-description"},ne.disclaimer))},e}return Object(d.a)(t,e),t}(te),re={targetEmail:"lindem01@luther.edu"},oe=function(e){function t(){var e;Object(l.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).handleOpen=function(){de.makeEmailMessage(),e.setState({body:i.a.createElement(z.a,null,i.a.createElement(V.a,null,"Copy the following text, then submit to Emily."),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(V.a,{id:"alert-dialog-slide-description"},de.html)),open:!0})},de.makeEmailMessage();var a="mailto:".concat(re.targetEmail,"?subject=Research Journal for ").concat(localStorage.getItem("name")," ").concat(k.convertToHumanDate(de.currentDay));return e.state={open:!0,body:i.a.createElement(z.a,null,i.a.createElement(V.a,null,"Copy the following text, then submit to Emily."),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(V.a,{id:"alert-dialog-slide-description"},de.html))},e.title="Submit to Emily",e.actions=i.a.createElement(U.a,{target:"_blank",href:a,onClick:e.handleClose,color:"primary"},"Email to Emily"),e}return Object(d.a)(t,e),t}(te),le=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).title="Research Information",e.actions=i.a.createElement(ae,null),e.state={open:!0,body:i.a.createElement(z.a,null,i.a.createElement(V.a,{id:"alert-dialog-slide-description"},i.a.createElement("span",null,i.a.createElement(H.a,{component:"span",variant:"h6"},"Background"),ne.background,i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(H.a,{component:"span",variant:"h6"},"Instructions"),ne.instructions)))},e}return Object(d.a)(t,e),t}(te),ce=a(57),se=a.n(ce),ue=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).checkNameValid=function(e){return e.length>4&&e.trim().split(" ").length>1},e.submitName=function(){localStorage.setItem("name",e.state.name),e.setState({open:!1})},e.handleChange=function(t){var a=t.target.value;e.setState({name:a})},e.state={open:!0,name:"",body:i.a.createElement(z.a,null,i.a.createElement(se.a,{id:"outlined-controlled",label:"name",multiline:!0,rowsMax:"20",fullWidth:!0,placeholder:"First Last",value:e.state.name,onChange:e.handleChange,margin:"normal",helperText:"",variant:"outlined"}))},e.title="What is your name?",e.actions=i.a.createElement(U.a,{onClick:e.submitName,color:"primary"},"Okay"),e}return Object(d.a)(t,e),t}(te),de=new(function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).updateExpanded=function(t){e.numCardsExpanded=e.numCardsExpanded+t,e.cardsExpanded=e.numCardsExpanded>0,e.emit(":UPDATE_CARDS_EXPANDED")},e.getInputText=function(t,a,n){return e.allDays[t][a][n]},e.updateInputText=function(t,a,n,i){e.allDays[a][n][i]=t,e.emit(":UPDATE_DAY_SCHEDULE")},e.switchDay=function(t){e.currentDay=t,e.emit(":SWITCH_DAY")},e.makeEmailMessage=function(){for(var t=[],a=Object.entries(e.allDays[e.currentDay]),n=0;n<a.length;n++){var r=a[n],o=Object(R.a)(r,2),l=o[0],c=o[1];t.push(i.a.createElement(H.a,{key:l,component:"span",variant:"h5"},l));for(var s=Object.entries(c),u=0;u<s.length;u++){var d=s[u],m=Object(R.a)(d,2),h=m[0],p=m[1];p&&t.push(i.a.createElement("span",{key:h+l},i.a.createElement(H.a,{component:"span",variant:"h6"},ne.headers[h]),i.a.createElement(H.a,{component:"span",variant:"body1"},p),i.a.createElement("br",null),i.a.createElement("br",null)))}t.push(i.a.createElement("span",{key:"br"+l},i.a.createElement("br",null),"\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014"))}e.html=t},e.openPopup=function(){e.emit(":OPEN_POPUP")},e.closePopup=function(){e.emit(":CLOSE_POPUP")},e.openEmailBox=function(){e.popup=i.a.createElement(oe,null),e.openPopup()},e.openDisclaimerBox=function(){e.popup=i.a.createElement(ie,null),e.openPopup()},e.openInfoBox=function(){e.popup=i.a.createElement(le,null),e.openPopup()},e.openNameBox=function(){e.popup=i.a.createElement(ue,null),e.openPopup()},e.somethingExpanded=function(){return e.numExpanded>0},e.html="",e.popup="",e.currentDay=k.getDateStorageName(),e.numCardsExpanded=0,e.cardsExpanded=!1,e.allDays={},e}return Object(d.a)(t,e),t}(J.a)),me=a(121),he=a.n(me),pe=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).componentWillMount=function(){de.on(":UPDATE_CARDS_EXPANDED",e.updateSomethingExpanded)},e.updateSomethingExpanded=function(){e.setState({somethingExpanded:de.cardsExpanded})},e.state={somethingExpanded:!1,eventString:"https://calendar.google.com/calendar/r/eventedit?text=Journaling+for+Emily+Linder&location=Decorah,+IA&details=Make+sure+to+visit+linder.odinolav.com"},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=window.innerWidth<600,t=this.props.classes;return i.a.createElement(D.a,{color:"primary",className:e&&this.state.somethingExpanded?t.bottomAppBar:t.appBar},i.a.createElement(T.a,{className:t.toolbar},i.a.createElement(H.a,{variant:"h6",color:"inherit",className:t.grow},ne.title,i.a.createElement(U.a,{color:"inherit","aria-label":"Project Info",className:"mobile",onClick:de.openInfoBox},i.a.createElement(_.c,null))),i.a.createElement(P.a,{title:"Send to Emily"},i.a.createElement(B.a,{className:t.emilyButton,target:"_blank",onClick:de.openEmailBox},i.a.createElement(N.a,{alt:"Emily Linder",src:he.a,className:t.avatar}))),i.a.createElement("div",null,i.a.createElement(P.a,{title:"Project Info",className:"non-mobile",onClick:de.openInfoBox},i.a.createElement(U.a,{color:"inherit","aria-label":"Project Info"},i.a.createElement(_.c,null))),i.a.createElement(P.a,{title:"Disclaimer",onClick:de.openDisclaimerBox},i.a.createElement(U.a,{color:"inherit","aria-label":"Disclaimer"},i.a.createElement(_.d,null))),i.a.createElement(P.a,{title:"Reminders"},i.a.createElement(U.a,{color:"inherit",href:this.state.eventString,target:"_blank"},i.a.createElement(_.a,null))))))}}]),t}(n.Component),ye=Object(m.withStyles)(function(e){return{avatar:{width:60,height:60},appBar:{position:"fixed",top:"auto",bottom:0},bottomAppBar:{position:"static"},toolbar:{alignItems:"center",justifyContent:"space-between"},emilyButton:{position:"absolute",zIndex:1,top:-30,left:0,right:0,margin:"0 auto"}}})(pe),fe=a(125),be=a(136),ge=a.n(be),Ee=a(131),Oe=a.n(Ee),De=a(132),ve=a.n(De),xe=a(134),je=a.n(xe),Ce=a(69),Se=a.n(Ce),ke=a(133),we=a.n(ke),Pe=a(135),Ie=a.n(Pe),Ne=a(137),Ae=a.n(Ne),Te=a(5),_e=a.n(Te),Me=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).componentWillMount=function(){de.on(":SWITCH_DAY",a.updateDay)},a.componentWillUnmount=function(){de.removeListener(":SWITCH_DAY",a.updateDay)},a.updateDay=function(){var e=de.currentDay,t=de.getInputText(e,a.timeOfDay,a.headerIndex);console.log(a.timeOfDay,a.headerIndex,t),a.setState({dayName:e,value:t||""})},a.handleChange=function(e){var t=e.target.value;t=t.replace(/--/g,"\u2014").replace(/\(\)/g,"\u2022").replace(/:\)/g,"\ud83d\ude42").replace(/:D/g,"\ud83d\ude03").replace(/:\(/g,"\ud83d\ude14").replace(/:o/g,"\ud83d\ude2e"),de.updateInputText(t,a.state.dayName,a.timeOfDay,a.headerIndex),a.setState({value:t})},a.timeOfDay=e.timeOfDay,a.headerIndex=e.headerIndex,a.header=e.header,a.state={dayName:e.dayName,value:de.getInputText(e.dayName,a.timeOfDay,a.headerIndex)||""},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement(se.a,{id:"outlined-controlled",label:this.header,multiline:!0,rowsMax:"20",fullWidth:!0,value:this.state.value,placeholder:ne.headerAlternates[this.headerIndex],onChange:this.handleChange,margin:"normal",helperText:"",variant:"outlined"})}}]),t}(n.Component),Ue=a(126),We=a.n(Ue),Be=a(127),Le=a.n(Be),He=a(128),Re=a.n(He),Ye=a(129),Je=a.n(Ye),qe=a(130),ze=a.n(qe),Fe={"Wake Up":We.a,"Mid-Morning":Le.a,Afternoon:Re.a,"Early Evening":Je.a,Night:ze.a},Ve=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).componentWillMount=function(){de.on(":UPDATE_DAY_SCHEDULE",a.checkComplete).on("SWITCH_DAY",a.updateDay)},a.componentWillUnmount=function(){de.removeListener(":UPDATE_DAY_SCHEDULE",a.checkComplete).removeListener("SWITCH_DAY",a.updateDay)},a.updateDay=function(){a.setState({currentDay:de.currentDay})},a.checkComplete=function(){var e=de.allDays[a.state.currentDay][a.timeOfDay][0]&&de.allDays[a.state.currentDay][a.timeOfDay][1];a.setState({complete:e})},a.handleExpandClick=function(){var e=!a.state.expanded;de.updateExpanded(e?1:-1),a.setState(function(t){return{expanded:e}})},a.dayIndex=e.dayIndex,a.timeOfDay=e.timeOfDay,a.state={isMobile:e.isMobile,expanded:!1,currentDay:e.currentDay,0:de.allDays[e.currentDay][a.timeOfDay][0],1:de.allDays[e.currentDay][a.timeOfDay][1],2:de.allDays[e.currentDay][a.timeOfDay][2]},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e,t=this,a=this.props.classes,n=de.allDays[this.state.currentDay],r=n[this.timeOfDay][0]&&n[this.timeOfDay][1];return e=this.state.expanded&&this.state.isMobile?a.expandedPhoneCard:this.state.expanded?a.expandedCard:this.state.isMobile?a.phoneCard:a.card,i.a.createElement(Oe.a,{className:e},i.a.createElement(ve.a,{onClick:this.handleExpandClick},i.a.createElement(we.a,{className:a.media,image:Fe[this.timeOfDay],title:this.timeOfDay}),i.a.createElement(Se.a,null,i.a.createElement(H.a,{gutterBottom:!0,variant:this.state.isMobile?"h6":"h5",component:"h2"},this.timeOfDay))),i.a.createElement(je.a,null,i.a.createElement(Ie.a,{color:r?"primary":"secondary",label:r?"Ready":"Incomplete"}),i.a.createElement(ge.a,{className:_e()(a.expand,Object(fe.a)({},a.expandOpen,this.state.expanded)),onClick:this.handleExpandClick,"aria-expanded":this.state.expanded,"aria-label":"Show more"},i.a.createElement(_.b,null))),i.a.createElement(Ae.a,{in:this.state.expanded,timeout:"auto",unmountOnExit:!0},i.a.createElement(Se.a,null,ne.headers.map(function(e,a){return i.a.createElement(Me,{key:"in-".concat(t.dayIndex,"-").concat(t.timeOfDay,"-").concat(e,"-").concat(a),dayName:t.state.currentDay,headerIndex:a,timeOfDay:t.timeOfDay,header:e})}))))}}]),t}(n.Component),Xe=Object(m.withStyles)(function(e){return{card:{width:180,margin:8},expandedCard:{width:350,margin:4},phoneCard:{width:150,margin:8},expandedPhoneCard:{width:"99%",margin:0},media:{height:120},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(-90deg)"}}})(Ve),$e=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).loadAllDays=function(){for(var t=localStorage.getItem("name")||"YOUR_NAME_HERE",a=[],n=Object.keys(localStorage),i=0;i<n.length;i++){var r=n[i];"daySchedule_"===r.substring(0,12)&&(a[r]=JSON.parse(localStorage[r]))}var o=Object.keys(a).length-1;de.allDays=a,e.setState({name:t},function(){e.handleTabChange(null,o)})},e.saveEmptyToday=function(){localStorage.setItem(k.getDateStorageName(),JSON.stringify(e.daySchedule))},e.saveAllDays=function(){Object.keys(de.allDays).forEach(function(e){localStorage.setItem(e,JSON.stringify(de.allDays[e]))})},e.beforeUnload=function(){window.addEventListener("beforeunload",function(t){t.preventDefault(),e.saveAllDays()})},e.handleOpen=function(){e.setState({popup:de.popup})},e.handleClose=function(){e.setState({popup:""})},e.handleTabChange=function(t,a){var n=Object.keys(de.allDays)[a];de.switchDay(n),e.setState({dayIndex:a,currentDay:n})},e.state={popup:"",name:"",nameComplete:!1,dayIndex:0,currentDay:k.getDateStorageName(),currentDaySchedule:Object.assign({},e.daySchedule)},e.daySchedule={"Wake Up":{1:"",2:"",3:""},"Mid-Morning":{1:"",2:"",3:""},Afternoon:{1:"",2:"",3:""},"Early Evening":{1:"",2:"",3:""},Night:{1:"",2:"",3:""}},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=k.getDateStorageName();localStorage.getItem(e)?this.setState({daySchedule:JSON.parse(localStorage.getItem(e))},this.loadAllDays()):(this.saveEmptyToday(),this.loadAllDays()),de.on(":OPEN_POPUP",this.handleOpen).on(":CLOSE_POPUP",this.handleClose)}},{key:"componentWillUnmount",value:function(){de.removeListener(":OPEN_POPUP",this.handleOpen).removeListener(":CLOSE_POPUP",this.handleClose)}},{key:"componentDidMount",value:function(){this.beforeUnload(),localStorage.getItem("name")||de.openNameBox()}},{key:"render",value:function(){for(var e=window.innerWidth<600,t=de.allDays[this.state.currentDay],a=[],n=Object.keys(t),r=0;r<n.length;r++){var o=n[r];a.push(i.a.createElement(Xe,{key:"c-".concat(o),currentDay:this.state.currentDay,dayIndex:this.state.dayIndex,timeOfDay:o,isMobile:e}))}return i.a.createElement("div",{id:"app"},i.a.createElement("div",{id:"mainarea"},i.a.createElement(D.a,{id:"tabbar",position:"absolute",color:"default"},i.a.createElement(x.a,{value:this.state.dayIndex,onChange:this.handleTabChange,indicatorColor:"primary",textColor:"primary",variant:"scrollable",scrollButtons:"auto"},Object.keys(de.allDays).map(function(e){var t=e===k.getDateStorageName()?"Today":k.convertToHumanDate(e);return i.a.createElement(C.a,{key:e,label:t})}))),this.state.popup,i.a.createElement(E.a,{container:!0,className:"maingrid",justify:"center",alignItems:"center"},a)),i.a.createElement(ye,null))}}]),t}(n.Component),Ge=b(Object(m.withStyles)(null)($e));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(Ge,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[5357,1,2]]]);
//# sourceMappingURL=main.8d7ad8b1.chunk.js.map