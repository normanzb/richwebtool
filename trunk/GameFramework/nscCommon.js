window.onload=nscPageInit;
//��ʼ������
function nscPageInit(){
	
	//�Զ�����CSS
	head=document.getElementsByTagName("head").item(0);
	styleLink = document.createElement("link");
	styleLink.setAttribute("id","nscCSS");
	styleLink.setAttribute("rel","stylesheet");
	head.appendChild(styleLink);
	document.getElementById("nscCSS").href="./nscStyle.css";

	isIE = new Boolean();
	isIE = document.all?true:false;
	//��ʹIE����ͼƬ
	if (isIE)
		document.execCommand("BackgroundImageCache",false,true);
	
	nscDefineElements();
	nscWithEvents();
	nscPageLoad();
}
//********************************************
//��ҳԪ�ض��忪ʼ
function nscDefineElements(){
	threadCounter = 0;
	if (typeof(nsgPlayGround) != "object"){nsgPlayGround = document.getElementById("nsgPlayGround");}
	if (typeof(nscDebugBox) != "object"){nscDebugBox = document.getElementById("nsgDebug");}
	nsgMapInit();
	debugThread = new nscThread("nscDebug()",10);
	debugThread.reg("debugThread");
}
//�¼���
function nscWithEvents(){
	//var keyCallBack = isIE?nsgPlayGround:window
	//Change to listen whole window
	var keyCallBack = isIE?document.body:window
	keyCallBack.onkeydown = function(e){
		nsgSetKeyStatus(e,'press')
		}
	keyCallBack.onkeyup = function(e){
		nsgSetKeyStatus(e,'release')
		}
}
//��ִ�к���
function nscPageLoad(){
	nsgDeadWhile();
}
//��Ϸ��ѭ������
function nsgDeadWhile(){
	nsgDeadWhileFunc();
	setTimeout(nsgDeadWhile,1);
}
//ѭ��������뺯��
function nsgDeadWhileFunc(){
	nscMainThread();
	Player1.move(window.keyUp,window.keyLeft,window.keyRight,window.keyDown);
}
//���ð���״̬
function nsgSetKeyStatus(e,ac){
	var keyStatus = new Boolean();
	if (ac == "press"){keyStatus=true;}
	if (ac == "release"){keyStatus=false;}
	var now = new Date();
	if (typeof(numDPT) != "number")
		numDPT = new Number();
	if (typeof(numLPT) != "number")
		numLPT = new Number();
	if (typeof(window.keyUp) != "boolean")
		window.keyUp = new Boolean();
	if (typeof(window.keyDown) != "boolean")
		window.keyDown = new Boolean();
	if (typeof(window.keyLeft) != "boolean")
		window.keyLeft = new Boolean();
	if (typeof(window.keyRight) != "boolean")
		window.keyRight = new Boolean();
	numPT = now.getTime();

	numDPT = numPT - numLPT;
	numLPT = numPT;
	//����Ƿ�Ϊͬʱ����
	if (!isIE)event=e;
	if (event.keyCode ==  65)
		window.keyLeft = keyStatus;
	if (event.keyCode ==  83)
		window.keyDown = keyStatus;
	if (event.keyCode ==  68)
		window.keyRight = keyStatus;
	if (event.keyCode ==  87)
		window.keyUp = keyStatus;
	if (numDPT < 10){}
	//window.debugString = "Left:" + window.keyLeft + " Right:" + window.keyRight + " Down:" + window.keyDown + " Up:" + window.keyUp + " Action:" + ac;
}
function nscDebug(){
	if (typeof(window.debugString) == "undefined") window.debugString ="";
		nscDebugBox.innerHTML=window.debugString ;

}
function nscMainThread(){
threadCounter++;
if (typeof(window.childThread) == "string")
	eval(window.childThread);
else{
	window.childThread = new String();
	window.childThread = "";
}
}
function nscThread(nameFunc,valueTimer){
	this.lagAni = valueTimer;
	this.counter = new Number();
	this.counter = 0;
	this.nameFunc=nameFunc
}
nscThread.prototype.start=function(){
	if ((threadCounter - this.counter) >= this.lagAni){
		eval(this.nameFunc);
		this.counter = threadCounter;

	}
}
nscThread.prototype.setFunc=function(nameFunc){
this.nameFunc=nameFunc;
}
nscThread.prototype.reg=function(thObjName){
window.childThread = thObjName + ".start();";
}