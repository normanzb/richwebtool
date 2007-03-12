tipConfig_TableName = "grdPassReport";
tipConfig_ProcessingSign="ToolTip is initializing...";
function nscToolTipPageInit(){
	if (document.getElementById(tipConfig_TableName) == null)
		return false;
	
	htmlInitailNotify = document.createElement("div");
	
	nsc.System.Element.Style.PositionFixed(htmlInitailNotify);
	
	htmlInitailNotify.style.left="10px";
	htmlInitailNotify.style.bottom="10px";
	htmlInitailNotify.style.border="1px solid #000";
	htmlInitailNotify.style.padding="1px";
	htmlInitailNotify.style.width="160px";
	htmlInitailNotify.style.fontSize="12px";
	htmlInitailNotify.style.fontFamily="tahoma";
	htmlInitailNotify.style.backgroundColor="#EEEECC"
	htmlInitailNotify.innerHTML=tipConfig_ProcessingSign;
	document.body.appendChild(htmlInitailNotify);
	//Select target
	htmlTipOwners=document.getElementById(tipConfig_TableName).getElementsByTagName("td");
	var objTip = new Object();
	objTip.id="nscToolTip";
	objTip.content="";
	objTip.title="Comment:";
	objTip.x=nscCommonVar.pixel.center;
	objTip.y=nscCommonVar.pixel.middle;
	objTip.sys=true;
	objTip.alpha = 0;
	htmlTip = new nscMessageBox(objTip);
	htmlTip.getself(htmlTip);
	htmlTip.alpha = 0;
	htmlTip.show();
	htmlTip.htmlBorder.style.display="none";
	
	addEventToTipOwners();
	htmlInitailNotify.parentNode.removeChild(htmlInitailNotify);
}

function addEventToTipOwners(){
	//Add event on body click.
	nsc.Events.AddEventHandler({DOMObject:document.body,EventName:nsc.Events.OnMouseDown,CallBack:hideTips});
	nsc.Events.AddEventHandler({DOMObject:document.getElementById(tipConfig_TableName),EventName:nsc.Events.OnMouseOver,CallBack:showTips});
	nsc.Events.AddEventHandler({DOMObject:document.getElementById(tipConfig_TableName),EventName:nsc.Events.OnMouseOut,CallBack:hideTips});
	nsc.Events.AddEventHandler({DOMObject:document.getElementById(tipConfig_TableName),EventName:nsc.Events.OnMouseMove,CallBack:showTips});
}

function showTips(e){
	if (nsc.Events.target(e).getAttribute("tip") != null & nsc.Events.target(e).getAttribute("tip") != ""){
		//htmlTip.getstyle();
		if (nsc.System.Environment.BodyClientWidth() <  nscCommonVar._x + htmlTip.htmlBorder.clientWidth)
			htmlTip.x = nsc.System.Environment.BodyClientWidth() - htmlTip.htmlBorder.clientWidth + nsc.System.Environment.ScrollLeft();
		else
			htmlTip.x = nscCommonVar._x + nsc.System.Environment.ScrollLeft();
		if (nsc.System.Environment.BodyClientHeight() <  nscCommonVar._y + htmlTip.htmlBorder.clientHeight)
			htmlTip.y = nscCommonVar._y - 25 + nsc.System.Environment.ScrollTop() - htmlTip.htmlBorder.clientHeight;
		else
			htmlTip.y = nscCommonVar._y + 25 + nsc.System.Environment.ScrollTop();
		htmlTip.content=nsc.Events.target(e).getAttribute("tip");
		htmlTip.title="test";
		htmlTip.rebuild();
		htmlTip.goroot();
	}
}

function hideTips(e){
	var temht = htmlTip;
	//If htmlTip is completely faded out, move the box to the area which user never touchable. This prevent a weird hehavior
	htmlTip.fader.onComplete= function(){
		if(this.op == 0){
			temht.x = - temht.htmlBorder.clientWidth;
		}
		this.onComplete=new Function("");
	}
	htmlTip.goback();
}