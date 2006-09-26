//Code by norman shinn http://eroman.org .Do not remove this line thankyou.//
//0:33 2006-4-29
function nscGoogleMapPageInit(){
	if(document.getElementById("nscGoogleMap") == null){
		IGoogleMap = new nscGoogleMap();
		IGoogleMap.getself(IGoogleMap);
		IGoogleMap.PageInit();
	}
}

function nscGoogleMap(){
	this._self = new Object();
}

nscGoogleMap.prototype.PageInit=function(){
	this.DefineElements();
	this.WithEvents();
	this.PageLoad();
}
nscGoogleMap.prototype.DefineElements=function(){
	var tBox = new Object();
	tBox.id="nscGoogleMap";
	tBox.x=screen.width - 340;
	tBox.y=nscCommonVar.pixel.middle;
	tBox.title="<img class=\"nscAppIcon\" src=\"" + AppPath + "/icons/nscGoogleMap.gif\" align=\"absmiddle\" /> GoogleMap！";
	tBox.content="<br />Loading Google Map Data...";
	nscGoogleMap.prototype.box = new nscMessageBox(tBox);
	this.box.getself(this.box);
	
}
nscGoogleMap.prototype.WithEvents=function(){
}
nscGoogleMap.prototype.PageLoad=function(){
	this.box.show();
	this.rebuild("<div id=\"map\" style=\"width: 270px; height: 180px\"></div>");
	var t = new Function("document.getElementById(\"map\").style.width=this.width - 30 + \"px\";document.getElementById(\"map\").style.height=this.height - 70 + \"px\";");
	this.box.onresize(t);
          
    if (GBrowserIsCompatible()) {
		var map = new GMap2(document.getElementById("map"))
		map.addControl(new GSmallZoomControl());
		map.addControl(new GMapTypeControl());
		map.setCenter(new GLatLng(39.9155,116.390), 2);
		//maGCopyrightCollection
		//map.openInfoWindow(map.getCenter(),document.createTextNode("Hello, world"));
    }
}

nscGoogleMap.prototype.rebuild=function(content){
	this.box.content="<br />" + content;
	this.box.rebuild();
	

    
}

nscGoogleMap.prototype.getself=function(obj){
	this._self=obj;
}

nscGoogleMap.about=function(){
	alert("nscGoogleMap 组件：\n" + 
	"nscGoogleMap v:Beta Preview\n" + 
	"GoogleMap组件\n" + 
	"由 http://eroman.org 制做");
}

