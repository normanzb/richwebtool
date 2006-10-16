//Last modify at 12:01 PM 10/10/2006
function nscRSSReaderPageInit(){
	if(document.getElementById("nscRSSReader") == null){
		IRSSReader = new nsc.Widgets.RSSReader("tempRSSReaderGUIDBlocker");
		IRSSReader.getself(IRSSReader);
		IRSSReader.aggregatorURI="/richWebTools/rsslist.xml";
		IRSSReader.feedURI=""//"/nscWebTools/proxy.asp?http://eroman.org/feed.asp?t="
		IRSSReader.PageInit();
	}
}

nsc.Widgets.RSSReader=function(guid){
	this.GUID = guid;
	this.feedURI = new String();
	this.aggregatorURI = new String();
	this._self = new Object();
	this.box = new Object();
}
nsc.Widgets.RSSReader.prototype={
	getself:function(_obj){
		this._self = _obj;
	},
	PageInit:function(){
		this.DefineElements();
		this.WithEvents();
		this.PageLoad();
	},
	DefineElements:function(){
		var tBox = new Object();
		if (this.aggregatorURI != "")
			tBox.id=this.aggregatorURI;
		else
			tBox.id=this.feedURI;
		tBox.width=700;
		tBox.height=500;
		tBox.y=50;
		//tBox.scrollY="scroll";
		tBox.title = "<img class=\"nscAppIcon\" src=\"" + AppPath + "/icons/nscRSSReader.gif\" align=\"absmiddle\" /> nscRSSReader！";
		tBox.content = "<div style=\"margin-top:10px;height:100%\"><div name=\"nscRSSReaderList\" style=\"float:left;border-right:1px solid #666;width:20%;height:100%\"></div><div name=\"nscRSSReaderContent\" style=\"margin-left:5px;float:right;width:77%;overflow-y:auto;height:100%\"><div class=\"nscProcessingBar\"></div>&nbsp; Loading Data...</div><div class=\"clearline\"></div></div>";;
		this.box = new nscMessageBox(tBox);
		this.box.getself(this.box);
	},
	WithEvents:function(){
		
	},
	PageLoad:function(){
		this.box.show();
		var _this = this;
		if (this.aggregatorURI != "" && this.aggregatorURI != null)
			this.xhr = new XMLRequest(this.aggregatorURI,"GET",null,null,true,this.loadListData,_this);
		else
			this.xhrforrss = new XMLRequest(AppPath + "/proxy.asp?url=" + this.feedURI,"GET","text/xml",null,true,this.loadRSSData,_this);
		
	},
	loadListData:function(){
		this._self =  this.parent;
		var r = document.createElement("div");
		var xd = this.http_request.responseXML;
		if (xd.getElementsByTagName("nscwidgets").length > 0){
			var t = nsc.XML.selectNodes("//tree[@name]",xd);
			var reader =  this;
			var tempNode = new Array();
			for(var i  = 0;i<t.length;i++){
				tempNode[i] = document.createElement("div");
				tempNode[i].setAttribute("src",t[i].getAttribute("value"));
				tempNode[i].appendChild(document.createTextNode(t[i].getAttribute("name")));
				if (t[i].getAttribute("value") != null && t[i].getAttribute("value") != ""){
					tempNode[i].onclick=function(){
						reader.parent.feedURI = this.getAttribute("src");
						reader.parent.rebuild("","<div class=\"nscProcessingBar\"></div>&nbsp; Loading Data...");
						reader.parent.xhrforrss = new XMLRequest(AppPath + "/proxy.asp?url=" + reader.parent.feedURI,"POST",null,null,true,reader.parent.loadRSSData,reader.parent);
					}
					tempNode[i].style.cursor="pointer";
				}
				r.appendChild(tempNode[i]);
			}
			for(var j = 0;j<t.length;j++){
				if (t[j].getAttribute("value") != null && t[j].getAttribute("value") != ""){
					this._self.feedURI = t[j].getAttribute("value");
					break;
				}
			}
			this.xhrforrss = new XMLRequest(AppPath + "/proxy.asp?url=" + this._self.feedURI,"POST",null,null,true,this._self.loadRSSData,this._self);
		}
		else{
			r = document.createTextNode("数据读取错误,请检查网络。");
		}
		this._self.rebuildList(r);
	},
	loadRSSData:function(){
		this._self = this.parent;
		var xd = this.http_request.responseXML;
		var t,r;
		try{
			var tFeed=nsc.Data.Feed.RSSAdapter(xd);
			t = tFeed.Channel.Title;
			r = "<div id=\"" + this.parent.GUID + "_contentContainer\">";
			for (var i = 0 ; i < tFeed.Channel.items.length ; i++){
				r = r + "<div style=\"border-bottom:1px solid #666;width:90%;overflow:hidden;height:16px;padding-top:2px;\"><strong><a href=\"" + tFeed.Channel.items[i].Link + "\" style=\"text-decoration:none;\" target=\"rssreader\">" + tFeed.Channel.items[i].Title + "</a></strong> [Category:" + tFeed.Channel.items[i].Category + " Author:" + tFeed.Channel.items[i].Author + "]</div><div style=\"width:90%;overflow:hidden;padding:10px;\">" + tFeed.Channel.items[i].Description + "</div>";
			}
			r = r + "</div>";
		}
		catch(ex){
			t = ex.name;
			r = ex.message;
		}
		this._self.rebuild(t,r);
	},
	rebuild:function(_title,_content){
		this.box.title = "<img class=\"nscAppIcon\" src=\"" + AppPath + "/icons/nscRSSReader.gif\" align=\"absmiddle\" /> nscRSSReader！- " + _title;
		//this.box.content = "<div name=\"nscRSSReaderList\" style=\"float:left\"></div><div name=\"nscRSSReaderContent\" style=\"float:left\"></div>";
		//" + _content + "
		//this.box.rebuild();
		if (document.getElementById(this.GUID + "_contentContainer")){
			document.getElementById(this.GUID + "_contentContainer").parentNode.removeChild(document.getElementById(this.GUID + "_contentContainer"));
		}
		document.getElementById(this.box.id + "Title").innerHTML = this.box.title;
		document.getElementById(this.box.id + "InnerContainer").childNodes[0].childNodes[1].innerHTML = _content;
		
	},
	rebuildList:function(_list){
		document.getElementById(this.box.id + "InnerContainer").childNodes[0].childNodes[0].appendChild(_list);
	}
}