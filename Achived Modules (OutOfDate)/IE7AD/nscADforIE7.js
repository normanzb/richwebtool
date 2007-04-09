function MyInit(){
	if (nsc.System.BrowserDetect.browser != "Explorer" || (nsc.System.BrowserDetect.browser == "Explorer" && nsc.System.BrowserDetect.version < 7)){
		ShowIEAd();
		AdFaderController = new nsc.Effect.fade(AdBox,0,100,10,4);
		AdFaderController.onComplete = function(){
			if (this.upordown == 2)
				AdBox.display();
		}
		AdBox.display();
		AdFaderController.fadeIn();
	}
}
function ShowIEAd(){
	AdBox = document.createElement("div");
	nsc.System.Element.Style.PositionFixed(AdBox);
	AdBox.style.left="0px";
	AdBox.style.bottom = "100px";
	
	AdBox.style.width = nsc.System.Environment.BodyClientWidth() - 4 + "px";
	AdBox.style.display = "none";
	AdBox.style.zIndex = "100000";
	AdBox.display = function(){
		if (this.style.display == "none")
			this.style.display = "block";
		else
			this.style.display = "none";
	}
	
	AdBox.style.backgroundImage = "url(./ie.jpg)";
	AdBox.style.backgroundColor = "#ead765";
	AdBox.style.backgroundPosition = "left top";
	AdBox.style.backgroundRepeat = "no-repeat";
	AdBox.style.height = "68px";
	AdBox.style.textAlign = "right";
	AdBox.style.color = "#FFF";
	AdBox.style.fontFamily = "tahoma";
	AdBox.style.fontSize = "9px";
	AdBox.style.paddingRight = "4px";
	AdBox.style.paddingTop = "4px";
	nsc.System.Element.Style.CursorPointer(AdBox);
	AdBox.innerHTML = " <img class='AdCloseBTN' src='close.jpg?' onclick='AdFaderController.fadeOut();' style='cursor:pointer' /><div style='margin-right:9px;margin-top:7px;height:0px;'><font color='cc8800' size='2'><strong>We found that you are not using IE7.</strong></font><br> We suggest that to install IE7 as your default browser to enhance the web surfing experience.</div>";
	nsc.Events.AddEventHandler({DOMObject:AdBox,EventName:nsc.Events.OnMouseDown,CallBack:function(evt){ 
			if (nsc.Events.target(evt).className != "AdCloseBTN"){
				window.open('http://www.microsoft.com/windows/products/winfamily/ie/default.mspx');
			}
		}
	});

	document.body.appendChild(AdBox);
	
}