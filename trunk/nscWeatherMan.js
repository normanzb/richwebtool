//Code by norman shinn http://eroman.org .Do not remove this line thankyou.//
MSNWeatherURL="http://localhost/richWebTools/TestWeather.xml"//"http://weather.msn.com/RSS.aspx?wealocations=wc:CHXX0008&weadegreetype=C"; //设置MSN天气预报RSS地址
function nscWeatherManPageInit(){
	if(document.getElementById("nscWeatherMan") == null){
		IWeatherMan = new nscWeatherMan();
		IWeatherMan.getself(IWeatherMan);
		IWeatherMan.PageInit();
	}
}

function nscWeatherMan(){
	this._self = new Object();
}

nscWeatherMan.prototype.PageInit=function(){
	this.DefineElements();
	this.WithEvents();
	this.PageLoad();
}
nscWeatherMan.prototype.DefineElements=function(){
	var tBox = new Object();
	tBox.id="nscWeatherMan";
	tBox.x=screen.width - 340;
	tBox.y=nscCommonVar.pixel.middle - 160;
	tBox.title="<img class=\"nscAppIcon\" src=\"" + AppPath + "/icons/nscWeatherMan.gif\" align=\"absmiddle\" /> WeatherMan！";
	tBox.content="<br />Loading MSN Data...";
	nscWeatherMan.prototype.box = new nscMessageBox(tBox);
	this.box.getself(this.box);
	
}
nscWeatherMan.prototype.WithEvents=function(){
}
nscWeatherMan.prototype.PageLoad=function(){
	this.box.show();
	var nscCaller = new Object();
	nscCaller.http_request=new XMLRequest(MSNWeatherURL,"GET",null,null,true);
	nscCaller.srcObj=this._self;
	if (nscCaller.http_request.readyState != 2 && nscCaller.http_request.readyState != 4){
		nscCaller.http_request.onreadystatechange = function(){
		        if (nscCaller.http_request.readyState == 4) {
		            if (nscCaller.http_request.status == 200) {
						nscCaller.srcObj.rebuild(nscCaller.http_request.responseXML.getElementsByTagName("item")[0].getElementsByTagName("description")[0].firstChild.nodeValue);
		            } else {
		                nscCaller.srcObj.rebuild("MSN天气服务无法连接。");
		            }
		        }
	     }
	}
	else{
		this.rebuild(nscCaller.http_request.responseXML.getElementsByTagName("item")[0].getElementsByTagName("description")[0].firstChild.nodeValue);
	}
}

nscWeatherMan.prototype.rebuild=function(content){
	this.box.content="<br />" + content;
	this.box.rebuild();
}

nscWeatherMan.prototype.getself=function(obj){
	this._self=obj;
}

nscWeatherMan.about=function(){
	alert("nscWeatherMan 组件：\n" + 
	"nscWeatherMan v:Beta Preview\n" + 
	"天气预报组件\n" + 
	"由 http://eroman.org 制做");
}

