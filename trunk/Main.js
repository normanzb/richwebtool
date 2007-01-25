//Code by norman shinn http://eroman.org .Do not remove this line thankyou.//
//Last modify at 12:01 PM 10/10/2006
//通用函数列表
//jsLoader(jspath) JS读取器
//cssLoader(cssname,csspath,csstype) CSS读取器
//nscTimeStamp() 时间戳
//URISticker() 给URI贴邮票(时间戳)
//通用对象列表
//nscMessageBox() 窗体类

AppPath="./";
IE=true;
_areax=0;
_areawidth=0;
BigObject=false;
_DEBUG=typeof Logger == "undefined"?false:true;//Debug开关 Debug使用了Logger
window.onload=nscPageInit;

function nscPageInit(){
	//自动加入CSS
	cssLoader("nscCSS",AppPath + "nscStyle.css");
	
	nsc.System.BrowserDetect.init();
	IE=nsc.System.BrowserDetect.browser == "Explorer"?true:false;
	nscDefineElements();
	nscWithEvents();
	nscPageLoad();
}
function nscDefineElements(){
	nscUIArea=document.createElement("div");
	nscUIArea.setAttribute("id","nscUIArea");
		nscInnerUIArea=document.createElement("div");
		nscInnerUIArea.setAttribute("id","nscInnerUIArea");
			nscMainArea=document.createElement("div");
			nscMainArea.setAttribute("id","nscMainArea");
				nscInnerMainArea=document.createElement("div");
				nscInnerMainArea.setAttribute("id","nscInnerMainArea");
					nscToolBar=document.createElement("div");
					nscToolBar.setAttribute("id","nscToolBar");
					nscWorkArea=document.createElement("div");
					nscWorkArea.setAttribute("id","nscWorkArea");
				nscInnerMainArea.appendChild(nscToolBar);
				nscInnerMainArea.appendChild(nscWorkArea);
			nscMainArea.appendChild(nscInnerMainArea);
			nscCatcher=document.createElement("div");
			nscCatcher.setAttribute("id","nscCatcher");
		nscInnerUIArea.appendChild(nscMainArea);
		nscInnerUIArea.appendChild(nscCatcher);
	nscUIArea.appendChild(nscInnerUIArea);
	document.body.appendChild(nscUIArea);
	//nsc常用变量
	nscCommonVar = new Object();
	nscCommonVar._x=0; // 鼠标坐标值
	nscCommonVar._y=0;
	nscCommonVar.opMSB = new Object();//当前操作对象
	nscCommonVar.zIndex = new Array();//窗口顺序数组
	nscCommonVar.pixel = new Object();
	nscCommonVar.pixel.center=screen.width/2 - 170;//中央位置
	nscCommonVar.pixel.middle=(screen.height/2 - 200) + document.documentElement.scrollTop;//
	nscCommonVar.preload=false;//是否预先读取JS
	nscCommonVar.asWaiting=3000;//侧边栏默认等待时间
	nscCommonVar.showSideBar = true;//是否显示侧边栏
	nscCommonVar.jslist = new Array();//已载入JS列表
}
function nscWithEvents(){
	if (!IE){
		window.captureEvents(Event.MouseScroll);
		window.addEventListener('DOMMouseScroll', areaFollow, false);
	}
	window.onscroll=areaFollow;
	//document.body.onmousewheel=areaFollow;
	nscUIArea.onselectstart=new Function("return false;")
	nscUIArea.ondragstart=new Function("return false;")
	nscCatcher.onclick=hsArea;
	// 2006.03.02 
	if (IE)
		document.body.onmousemove=getMousePosition;
	else{
		window.captureEvents(Event.MOUSEMOVE);
		window.onmousemove = getMousePosition;
	}
}
function nscPageLoad(){
	var hr = new XMLRequest(AppPath + "config.xml");
	hr.onreadystatechange = function(){
	        if (hr.readyState == 4) {
	            if (hr.status == 200) {
	            	closeLoading();
					initWebTools(hr.responseXML);
	            } else {
	            	closeLoading();
	                alert('无法读取配置文件，nscWebTools无法启动，请检查网络设置。');
	            }
	        }
	}
	//nscUIArea.style.left=new String(0 - new Number(new String(nscUIArea.style.width).Replace(" px",""))) + "px";
}

//加载WebTools
function initWebTools(rXml){
	var tmpxml = rXml;
	nscCommonVar.asWaiting = new Number(tmpxml.getElementsByTagName("Waiting")[0].getAttribute("value"));
	nscCommonVar.preload = new Boolean(tmpxml.getElementsByTagName("PreLoad")[0].getAttribute("value").toLowerCase() == "true");
	nscCommonVar.showSideBar = new Boolean(tmpxml.getElementsByTagName("showSideBar")[0].getAttribute("value").toLowerCase() == "true");
	nscCommonVar.Tools=tmpxml.getElementsByTagName("tool");
	if (nscCommonVar.showSideBar != false)
		nscUIArea.style.display="block";
	var i = new Number(0);
	
	nscToolBar.innerHTML="";
	while (i < nscCommonVar.Tools.length){
		if (nscCommonVar.Tools[i].getAttribute("type").toLowerCase() == "application")
			nscToolBar.innerHTML+="<img class=\"nscAppIcon\" src=\"" + AppPath + "icons/" + nscCommonVar.Tools[i].getAttribute("name") + ".gif\" align=\"absmiddle\" onclick=\"jsLoader('" + AppPath + nscCommonVar.Tools[i].getAttribute("src") +  "');loadJSInit('" + nscCommonVar.Tools[i].getAttribute("init") + "');\" /> ";
		if (nscCommonVar.preload == true || nscCommonVar.Tools[i].getAttribute("autoload") == "1")
			jsLoader((nscCommonVar.Tools[i].getAttribute("src").indexOf("http://") == -1)?AppPath + nscCommonVar.Tools[i].getAttribute("src"):nscCommonVar.Tools[i].getAttribute("src"));
		if (nscCommonVar.Tools[i].getAttribute("autoload") == "1"){
			loadJSInit(nscCommonVar.Tools[i].getAttribute("init"));
		}
		
		i++;
	}
	getPosition(6000);
}

function loadJSInit(strjs){
	try{
		eval(strjs);
	}
	catch(e){
		nsc.System.Track("组件错误",e.message)
		setTimeout("loadJSInit(\"" + strjs + "\")",1000);
	}
}

function jsLoader(jspath){//JS读取器
	var i = new Number(0);
	var loaded = false;
	while (i < nscCommonVar.jslist.length){
		if (nscCommonVar.jslist[i] == jspath)
			loaded=true;
		i++;
	}
	if (loaded == false){
		var tmpobj;
		tmpobj=document.createElement("script");
		tmpobj.setAttribute("src",URISticker(jspath));
		nscWorkArea.appendChild(tmpobj);
		nscCommonVar.jslist.push(jspath);
		nsc.System.Track("jsLoader:" + URISticker(jspath));
	}
}

function cssLoader(cssname,csspath,cssmedia){//CSS读取器
	head=document.getElementsByTagName("head").item(0);
	styleLink = document.createElement("link");
	styleLink.setAttribute("id",cssname);
	styleLink.setAttribute("rel","stylesheet");
	styleLink.setAttribute("title","nscStyle");
	if (cssmedia != null)
		styleLink.setAttribute("media",cssmedia);
	head.appendChild(styleLink);
	document.getElementById(cssname).href=URISticker(csspath);
	nsc.System.Track("cssLoader:" + URISticker(csspath));
}

function nscTimeStamp(){//时间戳
	var tDate = new Date();
	return (new String(tDate.getSeconds()+tDate.getMinutes()*60 + tDate.getHours()*3600) + "-" + tDate.getDate().toString() + (tDate.getMonth() + 1).toString() + tDate.getYear().toString());
}

function URISticker(oUrl){//贴票函数
        if (oUrl.lastIndexOf("?") + 1 == oUrl.length)
        	oUrl = oUrl + nscTimeStamp();
        else if (oUrl.lastIndexOf("?") != -1)
        		 oUrl = oUrl + "&nscts=" + nscTimeStamp();
        	 else
        	 	 oUrl = oUrl + "?nscts=" + nscTimeStamp();
       	return oUrl
}

function getMousePosition(evt){
	nscCommonVar._x = IE? event.x : evt.pageX;
	nscCommonVar._y = IE? event.y : evt.pageY;
}
//获取DIV框在CSS样式表中的值，由于网络速度的问题，需要等待CSS完全导入。
//timeout 设置CSS下载超时
function getPosition(timeout){
	timeout-=1000;
	var j = 0;
	while(j < document.styleSheets.length){
		if (document.styleSheets[j].title == "nscStyle"){
			break;
		}
		j++;
	}
	if (document.styleSheets[j].title == "nscStyle"){
		nscCSSRef = false;
		try{
			if (IE) nscCSSRef = document.styleSheets[j].rules;
			else nscCSSRef = document.styleSheets[j].cssRules;
		}
		catch(e){
			setTimeout("getPosition(" + timeout + ")",1000);
			return;
		}
		if (nscCSSRef.length == 0 && timeout<=0){
			alert("服务器关键数据读取错误，可能是网络忙，nscWebTools启动失败。")
			nscUIArea.innerHTML="";
			return;
		}
		else {
			if (nscCSSRef.length > 0){
				var tmp = getCSSSelector(nscCSSRef,"#nscUIArea");
				_areax=new Number(nscCSSRef[tmp].style.left.replace("px",""));
				var tmp = getCSSSelector(nscCSSRef,"#nscMainArea");
				_areawidth=new Number(nscCSSRef[tmp].style.width.replace("px",""));
				nscUIArea.style.left = _areax + "px";
				setTimeout("hideArea(" + _areax + ")",nscCommonVar.asWaiting);

				return;
			}
		}
	}
	setTimeout("getPosition(" + timeout + ")",1000);
}

/*=======================================================Recontrustion Begin==================================
Name space: nsc
*/
var nsc = new Object();
nsc.Layout = new Object();
nsc.Layout.CSS = function(){
	this.pointer = new Number();//CSS位置指针
	this.forceMode = false;//强制读取模式
	this.style = new Object();
}
nsc.Layout.CSS.rules = function(_pointer){//Cross-Browser的获取rules方式
	return IE?nscCSSRef = document.styleSheets[_pointer].rules:nscCSSRef = document.styleSheets[_pointer].cssRules;
}
nsc.Layout.CSS.prototype = {
	getFromSelector:function(_cs,_ct){
		var _rules = new Object();
		var i = new Number();
		var j = new Number();
		if (_ct == null){
			return 0;
		}
		else{
			for(j = 0;j < document.styleSheets.length;j++){
				if (document.styleSheets[j].title == _ct)
					break;
			}
			this.pointer = j;
				_rules = nsc.Layout.CSS.rules(this.pointer);
			for(i=0;i < _rules.length;i++){
				if (_rules[i].selectorText == _cs)
					break;
			}
		}
		this.style = _rules[i].style;
		return _rules[i];
	}
}
nsc.CommonFunc=new Object();
nsc.CommonFunc.temp = new Object();
nsc.CommonFunc.temp.disable=function(){
	return false;
}
nsc.CommonFunc.temp.enable=function(){
	return true;
}
nsc.CommonFunc.disableSelect=function(_domobj){
		if(IE){
			_domobj.onselectstart=function(){
				return false;
			}
		}else{
			nsc.Events.AddEventHandler({DOMObject:_domobj,EventName:nsc.Events.OnMouseDown,CallBack:nsc.CommonFunc.temp.disable});
			nsc.Events.AddEventHandler({DOMObject:_domobj,EventName:nsc.Events.OnMouseUp,CallBack:nsc.CommonFunc.temp.enable});
			//_domobj.onmouseup=reEnable
		}
}
nsc.CommonFunc.enableSelect=function(_domobj){
	
}
/*
<summary>
<namespace>nsc.CommonFunc</namespace>
<function>encodeURI</function>
<type>static</type>
<feature>Cross-browser URI encoder</feature>
</summary>
*/
nsc.CommonFunc.encodeURI=function(_url){
	return window.encodeURI(_url);
}
nsc.CommonFunc.decodeURI=function(_url){
	return window.decodeURI(_url);
}
/*
<summary>
<namespace>nsc.Events</namespace>
<function>selectNodes</function>
<type>static</type>
<feature>Cross-browser XPath support</feature>
</summary>
*/
nsc.Events=new Object();
nsc.Events.eventlist =  new Object();
nsc.Events.OnMouseMove="onmousemove";
nsc.Events.OnMouseOver="onmouseover";
nsc.Events.OnMouseOut="onmouseout";
nsc.Events.OnMouseDown = "onmousedown";
nsc.Events.OnMouseUp="onmouseup";
nsc.Events.OnUnLoad="onunload";
/*
<summary>
<namespace>nsc.Events</namespace>
<function>Event</function>
<type>object</type>
<feature>
DOMObject: The DOM is going to be listened;
EventName: string, "onmousedown" or "onmouseup", generally we use the enum nsc.Events.OnMouseDown and nsc.Events.OnMouseUp instead;
CallBack: A function to call back;
</feature>
</summary>
*/
nsc.Events.Event = function(){
	this.DOMObject =  new Object();
	this.EventName = new String();
	this.CallBack = new Object();
}
/*
<summary>
<namespace>nsc.Events</namespace>
<function>AddEventHandler</function>
<type>static</type>
<feature>Events observer</feature>
</summary>
*/
nsc.Events.AddEventHandler = function(_event){
	this._event = _event;
	switch(_event.EventName.toLowerCase()){
		case nsc.Events.OnMouseMove:
			nsc.Events.PushToEventList(_event);
			_event.DOMObject.onmousemove=nsc.Events.EventHandlerRouter.call(this);
			break;
		case nsc.Events.OnMouseOver:
			nsc.Events.PushToEventList(_event);
			_event.DOMObject.onmouseover=nsc.Events.EventHandlerRouter.call(this);
			break;
		case nsc.Events.OnMouseOut:
			nsc.Events.PushToEventList(_event);
			_event.DOMObject.onmouseout=nsc.Events.EventHandlerRouter.call(this);
			break;
		case nsc.Events.OnMouseDown:
			nsc.Events.PushToEventList(_event);
			_event.DOMObject.onmousedown=nsc.Events.EventHandlerRouter.call(this);
			break;
		case nsc.Events.OnMouseUp:
			nsc.Events.PushToEventList(_event);
			_event.DOMObject.onmouseup=nsc.Events.EventHandlerRouter.call(this);
			break;
		case nsc.Events.OnUnLoad:
			nsc.Events.PushToEventList(_event);
			_event.DOMObject.onunload=nsc.Events.EventHandlerRouter.call(this);
			break;
		default:
			return false;
	}
}
nsc.Events.PushToEventList = function(_event){
	//nsc.System.Track(_event.DOMObject.tagName + ":" + _event.DOMObject + "_" + );
	//nsc.Events.eventlist[document][nsc.Events.OnMouseDown].length
	if (nsc.Events.eventlist[_event.EventName.toLowerCase()] == null){
		nsc.Events.eventlist[_event.EventName.toLowerCase()] = new Object();
	}
	if (nsc.Events.eventlist[_event.EventName.toLowerCase()]["Owner"] == null){
		nsc.Events.eventlist[_event.EventName.toLowerCase()]["Owner"] = new Array();
	}
	if (nsc.Events.eventlist[_event.EventName.toLowerCase()]["Method"] == null){
		nsc.Events.eventlist[_event.EventName.toLowerCase()]["Method"] = new Array();
	}
	nsc.Events.eventlist[_event.EventName.toLowerCase()]["Method"][nsc.Events.eventlist[_event.EventName.toLowerCase()]["Method"].length] = _event.CallBack;
	nsc.Events.eventlist[_event.EventName.toLowerCase()]["Owner"][nsc.Events.eventlist[_event.EventName.toLowerCase()]["Owner"].length] = _event.DOMObject;
}
nsc.Events.EventCallBacker=function(_context,_event,_windowevent){
	for(var i = 0;i < nsc.Events.eventlist[_event.EventName]["Method"].length;i++){
		if (nsc.Events.eventlist[_event.EventName]["Owner"][i] == _event.DOMObject){
			nsc.Events.eventlist[_event.EventName]["Method"][i].call(_context,_windowevent);
		}
	}
}
nsc.Events.EventHandlerRouter=function(){
	var _event = this._event
	return function(_windowevent){
		var windowevent = _windowevent || window.event;
		nsc.Events.EventCallBacker(this,_event,windowevent);
	}
}
nsc.Events.target = function(evt){
	return IE?event.srcElement:evt.target;
}
nsc.Effect = new Object();
nsc.Effect.fade=function(_obj,_from,_to,_speed,_step){
	this.obj=_obj;
	this.from=_from;
	this.to=_to;
	this.speed = 10;
	this.op = new Number();
	if (_speed != null)
		this.speed=_speed;
	this.step = 10;
	if (_step != null)
		this.step=_step;
	this.upordown=0;
}
nsc.Effect.fade.prototype={
	fadeIn:function(){
		this.upordown=1;
		this.op = typeof this.op == "undefined" || this.op == 0?this.from:this.op;
		this.up();
	},
	up:function(){
		if (this.op + this.step<= this.to && this.upordown == 1){
			this.op+=this.step;
			if (IE)
				this.obj.style.filter="alpha(opacity=" + new Number(this.op) + ");";
			else
				this.obj.style.opacity=Math.floor(this.op/10)/10;;
			nsc.System.Track(typeof this.op + ":" + this.op + "[" + this.obj.id + ":" + this.obj.style.filter + "]");
			setTimeout(nsc.System.callBacker(this.up,this),this.speed);
		}else
			this.onComplete();
	},
	fadeOut:function(){
		this.upordown=2;
		this.op = typeof this.op == "undefined" || this.op == 0?this.to:this.op;
		this.down();
	},
	down:function(){
		if (this.op - this.step>= this.from && this.upordown == 2){
			this.op-=this.step;
			if (IE)
				this.obj.style.filter="alpha(opacity=" + new Number(this.op) + ");";
			else
				this.obj.style.opacity=Math.floor(this.op/10)/10;;
			nsc.System.Track(typeof this.op + ":" + this.op + "[" + this.obj.id + "]");
			setTimeout(nsc.System.callBacker(this.down,this),this.speed);
		}else
			this.onComplete();
	},
	onComplete:function(){
	
	},
	toString:function(){
		return "nsc.Effect.fade";
	}
}
nsc.System = new Object();
nsc.System.callBacker=function(_m,_c){
	var method = _m;
	var context = _c;
	return function(){
		method.call(context);
	}
}
nsc.System.Track = function(_message,_error){
	if (_DEBUG){
		if (_error != null)
			Logger.error(_message,_error);
		else
			Logger.debug(_message);
	}
}
nsc.System.BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
nsc.System.Environment = {
	ScrollLeft:function(){
		var left = 0;
		if (nsc.System.BrowserDetect.browser == "Explorer" && nsc.System.BrowserDetect.version > 5.5)
			left = document.documentElement.scrollLeft;
		else
			left = document.body.scrollLeft;
		return left;
	},
	ScrollTop:function(){
		var top = 0;
		if (nsc.System.BrowserDetect.browser == "Explorer" && nsc.System.BrowserDetect.version > 5.5)
			top = document.documentElement.scrollTop;
		else
			top = document.body.scrollTop;
		return top;
	},
	BodyClientWidth:function(){
		var clientWidth = 0;
		if (nsc.System.BrowserDetect.browser == "Explorer" && nsc.System.BrowserDetect.version > 5.5)
			clientWidth = document.documentElement.clientWidth;
		else
			clientWidth = document.body.clientWidth;
		return clientWidth;
	},
	BodyClientHeight:function(){
		var clientHeight = 0;
		if (nsc.System.BrowserDetect.browser == "Explorer" && nsc.System.BrowserDetect.version > 5.5)
			clientHeight = document.documentElement.clientHeight;
		else
			clientHeight = document.body.clientHeight;
		return clientHeight;
	}
};
nsc.System.Element = {
	DisableSelect : nsc.CommonFunc.disableSelect,
	EnableSelect : nsc.CommonFunc.enableSelect
};
nsc.System.Element.Style=new Object();
nsc.System.Element.Style.PositionFixed=function(element){
	if (nsc.System.BrowserDetect.browser == "Explorer" && nsc.System.BrowserDetect.version == "7")
		element.style.position="fixed";
	else
		element.style.position="absolute";
}
/* 
<summary>
<namespace>nsc.Data</namespace>
<feature>Support data connection</feature>
</summary>
*/
nsc.Data = new Object();
nsc.Data.Feed = new Object();
/*
<summary>
<namespace>nsc.Data.Feed</namespace>
<function>getNodeValue</function>
<type>static</type>
<feature>Cross-browser and return null as ""</feature>
</summary>
*/
nsc.Data.Feed.getNodeValue=function(elements){
	return elements.length > 0?nsc.XML.Element.text(elements[0]):"";
}
/*
<summary>
<namespace>nsc.Data.Feed.RSS</namespace>
<function>item</function>
<type>class</type>
<feature>really simple syndication class</feature>
</summary>
*/
nsc.Data.Feed.RSS = function(){
	this.Channel = new Object();
	this.Channel.Title = "";
	this.Channel.Link = "";
	this.Channel.Description = "";
	this.Channel.Language = "";
	this.Channel.Copyright = "";
	this.Channel.pubDate = false;//GMT
	this.Channel.lastBuildDate = "";//localized string
	this.Channel.webMaster = "";
	this.Channel.Generator = "";
	this.Channel.ttl=new Number();
	
	this.Channel.items = new Object();
	this.Channel.items.length = new Number(0);
}
nsc.Data.Feed.RSS.prototype ={
	addItem:function(item){
		this.Channel.items[this.Channel.items.length] = item;
		this.Channel.items.length++;
	}
}
/*
<summary>
<namespace>nsc.Data.Feed.RSS</namespace>
<function>item</function>
<type>enum</type>
<feature>rss item</feature>
</summary>
*/
nsc.Data.Feed.RSS.item = function(){
	this.Title = "";
	this.Link = "";
	this.Category = "";
	this.Author = "";
	this.pubDate = false;//GMT:Date When this post publish
	this.datePosted = "";//localized string indicate when this post publish
	this.Description = "";
	this.commentRSS = "";
	this.mediaContentURL = "";
}
/*
<summary>
<namespace>nsc.Data.Feed.RSSAdapter</namespace>
<function>item</function>
<type>static</type>
<feature>Serialize a RSS formatted XML file into nsc.Data.Feed.RSS object</feature>
</summary>
*/
nsc.Data.Feed.RSSAdapter = function(xmldoc){
	var tRss = new nsc.Data.Feed.RSS();
	if (xmldoc.getElementsByTagName("rss").length < 1){
		throw {message:"Not a RSS2 formatted document",name:"XMLFormat Exception"};//Exception could not be throw because unknown reason.
	}
	var _channel = nsc.XML.selectNodes("//channel",xmldoc);
	if (_channel.length < 1){
		throw {message:"Corrupted Feed",name:"XMLFormat Exception"};//Exception could not be throw because unknown reason.
	}
	var _items = nsc.XML.selectNodes("//item",xmldoc);
	if (_items.length < 1){
		throw {message:"Corrupted Feed",name:"XMLFormat Exception"};//Could not be throw because unknown reason.
	}
	tRss.Channel.Title = nsc.Data.Feed.getNodeValue(_channel[0].getElementsByTagName("title"));
	tRss.Channel.Link = nsc.Data.Feed.getNodeValue(_channel[0].getElementsByTagName("link"));
	tRss.Channel.Description = nsc.Data.Feed.getNodeValue(_channel[0].getElementsByTagName("description"));
	tRss.Channel.Language = nsc.Data.Feed.getNodeValue(_channel[0].getElementsByTagName("language"));
	tRss.Channel.Copyright = nsc.Data.Feed.getNodeValue(_channel[0].getElementsByTagName("copyright"));
	tRss.Channel.pubDate = _channel[0].getElementsByTagName("pubDate").length > 0?new Date(_channel[0].getElementsByTagName("pubDate")[0].firstChild.nodeValue):false;
	tRss.Channel.lastBuildDate = nsc.Data.Feed.getNodeValue(_channel[0].getElementsByTagName("lastBuildDate"));
	tRss.Channel.webMaster = nsc.Data.Feed.getNodeValue(_channel[0].getElementsByTagName("webMaster"));
	tRss.Channel.Generator = nsc.Data.Feed.getNodeValue(_channel[0].getElementsByTagName("generator"));
	tRss.Channel.ttl = nsc.Data.Feed.getNodeValue(_channel[0].getElementsByTagName("ttl"));
	var i,_titem;
	for(i = 0;i < _items.length; i++){
		_titem = new nsc.Data.Feed.RSS.item();
		_titem.Title = nsc.Data.Feed.getNodeValue(_items[i].getElementsByTagName("title"));
		_titem.Link = nsc.Data.Feed.getNodeValue(_items[i].getElementsByTagName("link"));
		_titem.Category = nsc.Data.Feed.getNodeValue(_items[i].getElementsByTagName("category"));
		_titem.Author = nsc.Data.Feed.getNodeValue(_items[i].getElementsByTagName("author"));
		_titem.pubDate = _items[i].getElementsByTagName("pubDate").length > 0?new Date(_items[i].getElementsByTagName("pubDate")[0].firstChild.nodeValue):false;
		_titem.datePosted = nsc.Data.Feed.getNodeValue(_items[i].getElementsByTagName("datePosted"));
		_titem.Description = nsc.Data.Feed.getNodeValue(_items[i].getElementsByTagName("description"));
		_titem.commentRSS = nsc.Data.Feed.getNodeValue(_items[i].getElementsByTagName("wfw:commentRss"))
		_titem.mediaContentURL = _items[i].getElementsByTagName("media:content").length > 0?_items[i].getElementsByTagName("media:content")[0].getAttribute("url"):"";
		tRss.addItem(_titem);
	}
	return tRss;
}
nsc.Data.Feed.AtomAdapter = function(xmldoc){
	
}
/* 
<summary>
<namespace>nsc.XML</namespace>
<feature>Support XML operations</feature>
</summary>
*/
nsc.XML = new Object();
/*
<summary>
<namespace>nsc.XML</namespace>
<function>selectNodes</function>
<type>static</type>
<feature>Cross-browser XPath support</feature>
</summary>
*/
nsc.XML.selectNodes=function(_expression,_xmldoc){
	if (IE){
		return _xmldoc.selectNodes(_expression);
	}else{
		var t = document.evaluate(_expression,_xmldoc,null,XPathResult.ANY_TYPE,null);
		var t2 = new Array();
		var tt = new Object();
		var i = 0;
		while(tt = t.iterateNext()){
			t2[i] = tt;
			i++;
		}
		return t2;
	}
}
nsc.XML.Element=new Object();
nsc.XML.Element.text=function(element){
	return element && element.hasChildNodes()? element.firstChild.nodeValue:"";
}
/*
<summary>
<namespace>nsc.Component</namespace>
<feature>provide rich web widgets</feature>
</summary>
*/
nsc.Widgets = new Object();
/*
<summary>
<namespace>nsc.Component</namespace>
<feature>provide rich web componet</feature>
</summary>
*/
nsc.Component = new Object();
/*
<summary>
<namespace>nsc.Component</namespace>
<function>tree</function>
<type>class</type>
<feature>Cross-browser tree widget</feature>
</summary>
*/
nsc.Component.tree = function(_guid){

}
nsc.Component.tree.prototype = {
	DataSource:new String(),
	Generate:function(_xmldoc){
			var xd = _xmldoc;
			this.rootNode = new Object();
			if (xd.getElementsByTagName("nscwidgets").length > 0){
				var root = nsc.XML.selectNodes("/nscwidgets/trees",xd);
				var trees = nsc.XML.selectNodes("/nscwidgets/trees/tree",xd);
				alert(trees.length);
				this.rootNode = document.createElement("div");
				this.rootNode.appendChild(document.createTextNode(root[0].getAttribute("name")));
				this.addToNode(this.rootNode,trees);
				for (var i = 0;i < trees.length;i++){
					if (trees[0].childNodes.length > 0){
						
					}
				}
			}
			else{
				return document.createTextNode("输入错误。")
			}
	}
}
//=========================================================Recontrustion End==================================
function getCSSSelector(_cssref,_selector){
	var i=0;
			while (i < _cssref.length){
				if (_cssref[i].selectorText == _selector)
					break;
				i++;
			}
	return i;
}
function areaFollow(e){
	//event.scroll
	nscUIArea.style.top = new Number(document.documentElement.scrollTop + 40) + "px";
	nscCommonVar.pixel.middle=(screen.height/2 - 200) + document.documentElement.scrollTop;
}
function hsArea(){
	if (!(new Number(nscUIArea.style.left.replace("px","")) < 2 && new Number(nscUIArea.style.left.replace("px","")) > -2)){
		nscCommonVar.opMSB.goback();
		showArea(-_areawidth);
	}
	else{
		nscCommonVar.opMSB.goroot();
		hideArea(_areax);
	}
}

function hideArea(_x){
	var _nx =Math.floor((_x - _areawidth)/2);
	nscUIArea.style.left = _nx + "px";
	if (_nx > -_areawidth)
		setTimeout("hideArea(" + new String(_nx) + ");",30);
	//_nx = new String((_x - _speed));
	//nscUIArea.style.left = _nx + "px";
	//if (Math.floor(_speed - 20) > 1)
	//	_speed = Math.floor(_speed - 20);
	//if ((_x -_speed) >= -_areawidth)
	//	setTimeout("hideArea(" + new String(_nx) + "," + _speed + ")",1);
}

function showArea(_x){
	var _nx =Math.floor((0 - _x)/2);
	_nx = _nx + _x;
	nscUIArea.style.left = _nx + "px";
	if (_nx < 0 )
		setTimeout("showArea(" + new String(_nx == -1?0:_nx) + ");",30);
}

//Ajax functions
//xUrl 获取XML的URL
//xMethod 获取的方法 GET/PUT/DELETE/POST
//xDoc 发送的消息
//xContentType 内容的类型
//是否显示Loading窗口 ,默认显示,TRUE为不显示
function XMLRequest(xUrl,xMethod,xDoc,xContentType,notShowWaiting,xCallBack,xContext){
	this.xCallBack = xCallBack;
	if (xMethod == null)
		xMethod = "GET";
	if (xDoc == null)
		xDoc = null;
        this.http_request = false;
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            this.http_request = new XMLHttpRequest();
            //if (xContentType != null && this.http_request.overrideMimeType)
            //	this.http_request.overrideMimeType(xContentType);
        } else if (window.ActiveXObject) { // IE
            try {
                this.http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    this.http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
		if (!this.http_request) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return "false";
        }
        xUrl = xUrl.substring(0,4).toLowerCase() == "http"?"./proxy.asp?url=" + xUrl:xUrl;
		xUrl=URISticker(xUrl);
		nsc.System.Track("XMLRequest:" + xUrl);
        this.http_request.open(xMethod, xUrl, true);
        if (xContentType != null)
			this.http_request.setRequestHeader("Content-Type",xContentType) //+ ";charset=UTF-8"); this way is not standard
		this.http_request.setRequestHeader("X-Referer",window.location);
        this.http_request.send(xDoc);
        if (notShowWaiting == null || notShowWaiting == false)
        	showLoading();
        if (xCallBack == null)
        	return this.http_request;
        else{
        	var xloader = this;
        	this.parent = xContext;
        	if (this.http_request.readyState != 2 && this.http_request.readyState != 4){
	        	this.http_request.onreadystatechange=function(){
	        		if (xloader.http_request.readyState == 4){
	        			closeLoading();
	        			if(xloader.http_request.status == 200 || xloader.http_request.status == 0){
	        				xCallBack.call(xloader);
	        			}
	        			else{
	        				alert("错误:无法请求数据，有可能是网络没有连接。");
	        			}
	        		}
	        	}
        	}
        	else{
        		xCallBack.call(xloader);
        	}
        	return this.http_request;
        }
}
function getXMLData(xmlHref,expXpath,typeValue,Count){
var valueNode;
	try{
		if (IE) {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.load(xmlHref);
		}
		else {
		myXMLHTTPRequest = new XMLHttpRequest();
		myXMLHTTPRequest.open("GET", xmlHref, false);
		myXMLHTTPRequest.send(null);
		xmlDoc = myXMLHTTPRequest.responseXML;
		//xmlDoc=document.implementation.createDocument("", "test", null);
		}
		if (typeValue == "[value]"){
		if (IE) valueNode=xmlDoc.selectNodes(expXpath).item(Count).text;
		else valueNode=xmlDoc.getElementsByTagName(expXpath.replace(/\//g,"")).item(Count).childNodes.item(Count).nodeValue;
		}else{
		valueNode=xmlDoc.selectNodes(expXpath).item(Count).getAttribute(typeValue);
		//else valueNode=xmlDoc.selectNodes(expXpath).item(0).getAttribute(typeValue);
		}
	}
	catch(e){
		alert("XML无法打开,服务器错误或连接失败。\n" + e.message);
	}
return valueNode;
}

//some cross browser function

function marquee(_obj,_width,_current){
	//var strMar=_obj.innerHTML;
	//alert(strMar);
	try{
	BigObject=_obj;
	var i = 1;
	var strfill="";
	while(i<=_current){
		strfill=strfill + "&nbsp;";
		i++;
	}
	//document.getElementById("debug").innerHTML=_obj.innerHTML.replace(/\&nbsp\;/g," ").length;
	if (_obj.innerHTML.replace(/\&nbsp\;/g," ").length < _width){
		_obj.innerHTML=_obj.innerHTML.replace(/\&nbsp\;/g,"");
		_obj.innerHTML = strfill + _obj.innerHTML;
		_current++;
		}
	else{
		_obj.innerHTML=_obj.innerHTML.replace(/\&nbsp\;/g,"");
		_current=0;
		}
	setTimeout("marquee(BigObject," + _width + "," + _current + ")",200);
	}
	catch(e){
	
	}
}

//Common Object:
//MessageBox:nscMessageBox(obj box)
function nscMessageBox(box){
		this._self=new Object();
		this.id=box.id;
		this.width = box.width != null?box.width:0;
		this.height = box.height != null?box.height:0;//new nsc.Layout.CSS().getSelector(".nscMessageBox","nscStyle").style.height.replace("px","") * 1;
		if (box.x != null && typeof box.x == "number")
			this.x=box.x;
		else
			this.x=nscCommonVar.pixel.center + 170 - Math.floor(this.width / 2);
		if (box.y != null && typeof box.y == "number")
			this.y=box.y;
		else
			this.y=nscCommonVar.pixel.middle;
		if (box.scrollY != null)
			this.scrollY = box.scrollY;
		else
			this.scrollY = null;
		if (box.drager != null)
			this.drager=box.drager;
		else
			this.drager=false;
		if (box.mxreduce != null)
			this.mxreduce=box.mxreduce;
		else
			this.mxreduce=0;
		if (box.myreduce != null)
			this.myreduce=box.myreduce;
		else
			this.myreduce=0;
		if (box.content != null && typeof box.content == "string"){
			this.content=box.content;
		}
		else{
			this.content="&nbsp; &nbsp; &nbsp; ";
		}
		if (box.title != null && typeof box.title == "string"){
			this.title=box.title;
		}
		else{
			this.title="新建窗口";
		}
		if (box.zindex != null && typeof box.zindex == "string"){
			this.zindex=box.zindex;
		}
		else{
			this.zindex="1";
		}
		if (box.sys != null && typeof box.sys == "boolean"){
			this.sys=box.sys;
		}
		else{
			this.sys=false;
		}
		if (box.hidden != null && typeof box.hidden == "boolean"){
			this.hidden=box.hidden;
		}
		else{
			this.hidden=false;
		}
		//defualt opacity when messagebox blured.
		this.alpha = 70;
		//defualt opacity when messagebox highlighted.
		this.opacity = 100;
		this.titleHtmlObj;
		this.resizefunc=new Function();
}

nscMessageBox.prototype.getself=function(self){
	this._self=self;
}
nscMessageBox.prototype.open=function(){
	if (document.getElementById(this.id) != null){
		document.getElementById(this.id).parentNode.removeChild(document.getElementById(this.id));
	}
		//alert("窗口名" + this.id + "已被占用！请将原窗口关闭！");
			this.htmlBorder=document.createElement("div");
			this.htmlBorder.setAttribute("id",this.id);
			this.htmlBorder.msb=this._self;
			this.htmlBorder.className="nscMessageBox";
			this.htmlBorder.style.visibility="hidden";
				var htmlToper=document.createElement("div");
				htmlToper.className="nscMSGBoxToper";
				htmlToper.setAttribute("id",this.id + "Toper");
					var htmlToperLeft=document.createElement("div");
					htmlToperLeft.className="nscMSGBoxToperLeft";
					var htmlToperPlus=document.createElement("div");
					htmlToperPlus.className="nscMSGBoxToperPlus";
					var htmlToperRight=document.createElement("div");
					htmlToperRight.className="nscMSGBoxToperRight";
				htmlToper.appendChild(htmlToperLeft);
				htmlToper.appendChild(htmlToperPlus);
				htmlToper.appendChild(htmlToperRight);
				var htmlContainer=document.createElement("div");
				htmlContainer.setAttribute("id",this.id + "Container");
				htmlContainer.className="nscMSGBoxContainer";
				this.htmlInnerTitle=document.createElement("div");
				this.htmlInnerTitle.setAttribute("id",this.id + "Title");
				this.htmlInnerTitle.className="nscMSGBoxInnerTitle";
				this.htmlInnerTitle.innerHTML=this.title;
				var htmlInnerHide=document.createElement("div");
				htmlInnerHide.setAttribute("id",this.id + "Hide");
				htmlInnerHide.className="nscMSGBoxInnerClose";
				htmlInnerHide.innerHTML="Hide";
				var htmlInnerClose=document.createElement("div");
				htmlInnerClose.setAttribute("id",this.id + "Close");
				htmlInnerClose.className="nscMSGBoxInnerClose";
				htmlInnerClose.innerHTML="Close";
				var clearline=document.createElement("div");
				clearline.setAttribute("id",this.id + "clearline");
				clearline.className="clearline";
				this.htmlInnerContainer=document.createElement("div");
				this.htmlInnerContainer.setAttribute("id",this.id + "InnerContainer");
				this.htmlInnerContainer.className="nscMSGBoxInnerContainer";
				this.htmlInnerContainer.innerHTML=this.content;
				if (this.sys==false){
					htmlContainer.appendChild(this.htmlInnerTitle);
					htmlContainer.appendChild(htmlInnerClose);
					//Modify at 4.24.06 
					//htmlContainer.appendChild(htmlInnerHide);
				}

				htmlContainer.appendChild(this.htmlInnerContainer);
				htmlContainer.appendChild(clearline);
				var htmlBottomer=document.createElement("div");
					htmlBottomer.className = "nscMSGBoxBottomer";
					var htmlBottomerLeft=document.createElement("div");
					htmlBottomerLeft.className = "nscMSGBoxBottomerLeft";
					var htmlBottomerPlus=document.createElement("div");
					htmlBottomerPlus.className="nscMSGBoxBottomerPlus";
					var htmlBottomerRight=document.createElement("div");
					htmlBottomerRight.className="nscMSGBoxBottomerRight";
					nsc.CommonFunc.disableSelect(htmlBottomerRight);
				htmlBottomer.appendChild(htmlBottomerLeft);
				htmlBottomer.appendChild(htmlBottomerPlus);
				htmlBottomer.appendChild(htmlBottomerRight);
				htmlBottomer.setAttribute("id",this.id + "Bottomer");
			this.htmlBorder.appendChild(htmlToper);
			this.htmlBorder.appendChild(htmlContainer);
			this.htmlBorder.appendChild(htmlBottomer);
		//Modify at 4.24.06 
		document.body.appendChild(this.htmlBorder);
		this.setstyle();
		//nscInnerUIArea.appendChild(this.htmlBorder);
		this.htmlBorder.onselectstart=new Function("if (IE?event.srcElement.tagName.toLowerCase() == \"div\":evt.target.tagName.toLowerCase() == \"div\")return false;");
		if (typeof nscCommonVar.opMSB.htmlBorder != "undefined")
			nscCommonVar.opMSB.goback();
		nscCommonVar.opMSB=this._self;
		this.htmlBorder.onmousedown=nscMSBMouseDown;
		this.htmlBorder.onmouseup=nscMSBMouseUp;
		htmlInnerClose.onclick=nscMSBMouseClose;
		htmlInnerHide.onclick=nscMSBMouseHide;
	this.fader = new nsc.Effect.fade(this.htmlBorder,0,100);
	this.goroot();
	this.htmlBorder.style.visibility="visible";
	this.fader.from=this.alpha;
	this.hidden=false;
}
nscMessageBox.prototype.show=function(){
	if (document.getElementById(this.id) == null){
		this.open();
	}
	this.hidden=false;
	this.rebuild();
}
nscMessageBox.prototype.hide=function(){
	this.hidden=true;
	this.rebuild();
}
nscMessageBox.prototype.onresize=function(_func){
	var _func = _func;
	this.resizefunc = function(){_func.call(this);}
}

nscMessageBox.prototype.getstyle=function(){
	this.width = new Number(this.htmlBorder.clientWidth);
	this.height = new Number(this.htmlBorder.clientHeight);
}
nscMessageBox.prototype.setstyle=function(){
	this.htmlBorder.style.left=this.x + "px";
	this.htmlBorder.style.top=this.y + "px";
	if (this.width > 0 || this.height > 0){
		if (this.width > 100){
			this.htmlBorder.childNodes[2].style.width = this.htmlBorder.style.width=this.width + "px";
			this.htmlBorder.childNodes[0].childNodes[1].style.width = (this.width - new Number(this.htmlBorder.childNodes[0].childNodes[0].clientWidth) * 2) + "px";
			this.htmlBorder.childNodes[2].childNodes[1].style.width = (this.width - new Number(this.htmlBorder.childNodes[2].childNodes[0].clientWidth) * 2) + "px";
		}
		if (this.height > 100){
			this.htmlBorder.style.height=this.height + "px";
			this.htmlBorder.childNodes[1].style.height = (this.height - new Number(this.htmlBorder.childNodes[0].childNodes[0].clientHeight) * 2) + "px";
			this.htmlBorder.childNodes[1].childNodes[2].style.height = (this.height - new Number(this.htmlBorder.childNodes[0].childNodes[0].clientHeight) * 2) + "px";
			//this.htmlBorder.childNodes[1].style.height = (this.height - new Number(this.htmlBorder.childNodes[2].childNodes[0].clientHeight) * 2) + "px";
		}
		this.resizefunc();
	}
	if (this.scrollY != null)
		this.htmlBorder.childNodes[1].childNodes[2].style.overflowY = this.scrollY;
	this.htmlBorder.style.zIndex=this.zindex;
	
	//show and hide
	if (this.hidden == true)
		this.htmlBorder.style.display="none";
	else
		this.htmlBorder.style.display="block";
}

nscMessageBox.prototype.goroot=function(){
	if (nscCommonVar.zIndex[0] == null)
		nscCommonVar.zIndex.push(10001);
	else
		nscCommonVar.zIndex[0]+=1;
	this.zindex=nscCommonVar.zIndex[0];
	this.setstyle();
	//Set fader.to to default value to prevent when user set alpha to 0 and then invoke goback funtion twice, fader.to value will be set to 0.
	this.fader.to = this.opacity;
	this.fader.fadeIn();
}

nscMessageBox.prototype.goback=function(){
	//alert(this.id);
	//this.zindex="10001";
	//this.setstyle();
	//This logical is to prevent when two MessageBox opened as the same time both of them will have 100% opacity.The blured one should be set to this.alpha
	if (this.fader.op - this.fader.step < this.fader.from){
		this.fader.to = this.alpha;
		this.fader.onComplete= function(){this.to = 100;this.onComplete=new Function("");}
	}
	else
		this.fader.fadeOut();
}

nscMessageBox.prototype.rebuild=function(){//根据MessageBox的属性重建
	this.setstyle();
	this.htmlInnerContainer.innerHTML=this.content;
	this.htmlInnerTitle.innerHTML=this.title;
}

nscMessageBox.prototype.close=function(){
	if (document.getElementById(this.id) != null)
		document.getElementById(this.id).parentNode.removeChild(document.getElementById(this.id));
}

nscMessageBox.prototype.toString=function(){
	return "nsc.MessageBox";
}
//MessageBox End
function nscMSBStartResize(){

	nscCommonVar.opMSB.drager=true;
	//var t =new nsc.Layout.CSS();
	//t.getFromSelector(".nscMessageBox","nscStyle");
	//new Number(t.style.width.replace("px","")) != 0?new Number(t.style.width.replace("px","")):
	nscCommonVar.opMSB.width = nscCommonVar.opMSB.htmlBorder.clientWidth;
	nscCommonVar.opMSB.height = nscCommonVar.opMSB.htmlBorder.clientHeight;
	nscCommonVar.opMSB.owidth=nscCommonVar.opMSB.width;
	nscCommonVar.opMSB.oheight=nscCommonVar.opMSB.height;
	nscCommonVar.opMSB.mxreduce = nscCommonVar._x;// - nscCommonVar.opMSB.width;
	nscCommonVar.opMSB.myreduce = nscCommonVar._y;// - nscCommonVar.opMSB.height;
	nscMSBResizing();
}
function nscMSBResizing(){
	if (nscCommonVar.opMSB.drager == true){
		//Logger.info(nscCommonVar._x - nscCommonVar.opMSB.mxreduce);
		nscCommonVar.opMSB.width = nscCommonVar.opMSB.owidth + nscCommonVar._x - nscCommonVar.opMSB.mxreduce;
		nscCommonVar.opMSB.height = nscCommonVar.opMSB.oheight + nscCommonVar._y - nscCommonVar.opMSB.myreduce;
		nscCommonVar.opMSB.setstyle();
		setTimeout(nscMSBResizing,1);
	}
}
function nscMSBStartDrag(){
	nscCommonVar.opMSB.drager=true;
	nscCommonVar.opMSB.mxreduce = nscCommonVar._x - nscCommonVar.opMSB.x;
	nscCommonVar.opMSB.myreduce = nscCommonVar._y - nscCommonVar.opMSB.y;
	nscMSBDraging();
}

function nscMSBDraging(){
	if (nscCommonVar.opMSB.drager == true){
		nscCommonVar.opMSB.x = nscCommonVar._x - nscCommonVar.opMSB.mxreduce;
		nscCommonVar.opMSB.y = nscCommonVar._y - nscCommonVar.opMSB.myreduce;
		nscCommonVar.opMSB.setstyle();
		setTimeout(nscMSBDraging,1);
	}
}

function nscMSBMouseDown(evt){
	
	var t = IE ? this : evt.target;

	var ti = 0;
	while (t.msb == null && ti < 10 && !IE){
		t=t.parentNode;
		ti++;
	}
	t.msb.goroot();//Change out of the scope below, because sidebar events changed.
	if (nscCommonVar.opMSB != t.msb){
		nscCommonVar.opMSB.goback();
		nscCommonVar.opMSB=t.msb;
	}
	var t = "nscMSGBoxBottomerRightnscMSGBoxInnerContainer";
	if (!t.match(IE?event.srcElement.className:evt.target.className)){
		if (IE?"divbody".match(event.srcElement.tagName.toLowerCase())&& event.button == 1:"divbody".match(evt.target.tagName.toLowerCase()) == "div" && (evt.button == 0 || evt.button == 1))
			nscMSBStartDrag();
	}
	else if (nscCommonVar.opMSB.sys == false && "nscMSGBoxBottomerRight" == (IE?event.srcElement.className:evt.target.className))
		nscMSBStartResize();
}

function nscMSBMouseUp(){
	nscCommonVar.opMSB.drager = false;
}

function nscMSBMouseClose(){
	nscCommonVar.opMSB.close();//Changed 3:44 PM 11/15/2006
	//document.getElementById(nscCommonVar.opMSB.id).parentNode.removeChild(document.getElementById(nscCommonVar.opMSB.id));
}

function nscMSBMouseHide(){
	document.getElementById(nscCommonVar.opMSB.id).style.position="static";
	document.getElementById(nscCommonVar.opMSB.id).style.styleFloat="left";
	document.getElementById(nscCommonVar.opMSB.id).style.width="180px";
	document.getElementById(nscCommonVar.opMSB.id + "Toper").getElementsByTagName("div")[1].style.width="148px";
	document.getElementById(nscCommonVar.opMSB.id + "Bottomer").style.width="180px";
	document.getElementById(nscCommonVar.opMSB.id + "Bottomer").getElementsByTagName("div")[1].style.width="148px";
}


//Common Function
//Word Checker
function chkBadWord(strInput){
	var goal = false;
	var _badwords = new Array();
	_badwords[0]=" or ";
	_badwords[1]=" and ";
	_badwords[2]="\'";
	_badwords[3]="\"";
	_badwords[4]="<";
	_badwords[5]=">";
	var i = new Number();
	i=0;
	while(i < _badwords.length){
		if (strInput.match(new RegExp(_badwords[i],"ig"))){
			goal = true;
			break;
		}
		i++;
	}
	return goal;
}

//Word filter
function wordFilter(strInput){
	var _badwords = new Array();
	_badwords[0] = " or ";
	_badwords[1] = "或";
	_badwords[2] = " and ";
	_badwords[3] = "和";
	_badwords[4] = "\'";
	_badwords[5] = "‘";
	_badwords[6] = "\"";
	_badwords[7] = "“";
	_badwords[8]="&";
	_badwords[9]="&amp;";
	_badwords[10]=">";
	_badwords[11]="&gt;";
	_badwords[12]="<";
	_badwords[13]="&lt;";
	var i = new Number();
	i=0;
	while(i < _badwords.length && i + 1 < _badwords.length){
		strInput=strInput.replace(new RegExp(_badwords[i],"ig"),_badwords[i+1]);
		i=i+2;
	}
	return strInput;
}

// 错误信息
function ErrMess(strInput,strTitle){
       	var b = new Object();
		b.id="nscErrMess";
		b.content=strInput;
		if (strTitle == null)
			b.title="错误！";
		else
			b.title=strTitle;
		b.x=nscCommonVar.pixel.center;
		b.y=nscCommonVar.pixel.middle;
		var cMusic = new nscMessageBox(b);
		cMusic.getself(cMusic);
		cMusic.show();
}

//loading bar
function showLoading(){
       	var b = new Object();
		b.id="nscLoadingBar";
		b.content="<div class=\"nscProcessingBar\"></div> &nbsp;数据存取中……";
		b.title="提示";
		b.sys=true;
		b.x=nscCommonVar.pixel.center;
		b.y=nscCommonVar.pixel.middle;
		MSBLoadingBar = new nscMessageBox(b);
		MSBLoadingBar.getself(MSBLoadingBar);
		MSBLoadingBar.show();
}
function closeLoading(){
	MSBLoadingBar.close();
}