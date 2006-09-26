//Code by norman shinn http://eroman.org .Do not remove this line thankyou.//
nscURLPlaylist="/nscWebPlayerCaster/caster.asmx/PlayList";//AppPath + "/playlist.xml";
nscURLPlaylistType="application/x-www-form-urlencoded";//null;
nscURLPlaylistMethod="POST";//null;
nscURLCaster="/nscWebPlayerCaster/caster.asmx/CastMyMedia";
nscWPConfig=false;
nscWPMusics=false;
currentMusic=0;
currentState=0;
function nscWebPlayer(){

}
nscWebPlayer.about = function(){
	alert("nscWebTools 组件：\n" + 
	"nscWebPlayer v:Beta Preview\n" + 
	"MP3播放器\n" + 
	"由 http://eroman.org 制做");
}
nscWebPlayer.status = new Number(0);
function nscWebPlayerPageInit(){
	if(nscWebPlayer.status==4){ErrMess("nscWebPlayer已经启动了，请不要重复启动。");return 0;}
	nscWebPlayer.status=4;
	nscWebPlayerDefineElements();
	nscWebPlayerWithEvents();
	nscWebPlayerPageLoad();
}
function nscWebPlayerDefineElements(){
	nscWPPlayObject=document.createElement("embed");
	nscWPPlayObject.setAttribute("id","nscWPPlayObject");
    nscWPPlayObject.setAttribute("width","0");
    nscWPPlayObject.setAttribute("height","0");
    nscWPPlayObject.setAttribute("type","audio/mpeg");
	nscWPPlayObject.setAttribute("hidden","false");
	//nscWPPlayObject.setAttribute("loop","-1");
	nscWPCaption=document.createElement("div");
	nscWPCaption.setAttribute("id","nscWPCaption");
		nscWPMarquee=document.createElement("div");
		nscWPMarquee.setAttribute("id","nscWPMarquee")
	nscWPCaption.appendChild(nscWPMarquee);
	
	nscWPButtons=document.createElement("div");
	nscWPButtons.setAttribute("id","nscWPButtons");
		//Control Buttons
		nscWPbtnPlay=document.createElement("div");
		nscWPbtnPlay.setAttribute("id","nscWPbtnPlay");
		nscWPbtnPlay.className="nscWPBtnControl";
		nscWPbtnPlay.innerHTML="<img src=\"" + AppPath + "icons/nscWebPlayer_play.gif\" alt=\"播放\" />";
		nscWPbtnPlay.onclick=MusicPlay;
		nscWPbtnStop=document.createElement("div");
		nscWPbtnStop.setAttribute("id","nscWPbtnStop");
		nscWPbtnStop.className="nscWPBtnControl";
		nscWPbtnStop.innerHTML="<img src=\"" + AppPath + "icons/nscWebPlayer_stop.gif\" alt=\"停止\" />";
		nscWPbtnStop.onclick=MusicStop;
		nscWPbtnInfo=document.createElement("div");
		nscWPbtnInfo.setAttribute("id","nscWPbtnInfo");
		nscWPbtnInfo.className="nscWPBtnControl";
		nscWPbtnInfo.innerHTML="<img src=\"" + AppPath + "icons/nscWebPlayer_info.gif\" alt=\"信息\" />";
		nscWPbtnInfo.onclick=ViewInfo;
		nscWPbtnCast=document.createElement("div");
		nscWPbtnCast.setAttribute("id","nscWPbtnCast");
		nscWPbtnCast.setAttribute("class","nscWPBtnControl");
		nscWPbtnCast.innerHTML="<img src=\"" + AppPath + "icons/nscWebPlayer_rec.gif\" alt=\"CasterMyMusic\" />";
		nscWPbtnCast.onclick=ShowCastPanel;
	nscWPButtons.appendChild(nscWPbtnPlay);
	nscWPButtons.appendChild(nscWPbtnStop);
	nscWPButtons.appendChild(nscWPbtnInfo);
	nscWPButtons.appendChild(nscWPbtnCast);
	nscWPPlaylist=document.createElement("div");
	nscWPPlaylist.setAttribute("id","nscWPPlaylist");
		nscWPListBox=document.createElement("div");
		nscWPListBox.setAttribute("id","nscWPListBox");
		nscWPListTitle=document.createElement("div");
		nscWPListTitle.setAttribute("id","nscWPListTitle");
	nscWPPlaylist.appendChild(nscWPListTitle);
	nscWPPlaylist.appendChild(nscWPListBox);
	nscWPHidden=document.createElement("div");
	nscWPHidden.setAttribute("id","nscWPHidden");
	nscWorkArea.appendChild(nscWPCaption);
	nscWorkArea.appendChild(nscWPButtons);
	nscWorkArea.appendChild(nscWPPlaylist);
	nscWorkArea.appendChild(nscWPHidden);
}
function nscWebPlayerWithEvents(){
	
}
function nscWebPlayerPageLoad(_firstrun){

	//alert(getXMLData(AppPath + "/config.xml","//aa","[value]"));
	//alert(returnString());
	//m_06.3.29
	var http_request=new XMLRequest(nscURLPlaylist,nscURLPlaylistMethod,null,nscURLPlaylistType);
	http_request.onreadystatechange = function(){
	        if (http_request.readyState == 4) {
	            if (http_request.status == 200) {
	            	closeLoading();
	            	var tmpxml=http_request.responseXML;
	                PlayListInit(tmpxml);
	                if (_firstrun == null)
	                	pageLoadOver();
	            } else {
	                alert('无法连接WebCaster服务，可能是服务出现问题关闭，或者是网络问题。');
	            }
	        }
     };
}

function PlayListInit(DocXML){
	nscWPConfig=DocXML.getElementsByTagName("playconfig");
	nscWPMusics=DocXML.getElementsByTagName("music");
	nscWPPlaylistMusic = new Array(nscWPMusics.length);
	nscWPListTitle.innerHTML="<strong>Playlist</strong>"
	var i=0;
	while(i<nscWPMusics.length){
		nscWPPlaylistMusic[i] = document.createElement("div");
		nscWPPlaylistMusic[i].setAttribute("id","nscWPPlaylistMusic" + i);
		nscWPPlaylistMusic[i].setAttribute("class","nscWPPlaylistMusics");
		nscWPPlaylistMusic[i].style.cursor="hand";
		nscWPPlaylistMusic[i].onclick = new Function("ChangeMusic(" + i + ")");
		nscWPPlaylistMusic[i].innerHTML = (nscWPMusics[i].getAttribute("author") == ""?"未知艺术家":nscWPMusics[i].getAttribute("author")) + "-" + nscWPMusics[i].getAttribute("name");
		//nscWPPlaylist.innerHTML+="<br />";
		nscWPListBox.appendChild(nscWPPlaylistMusic[i]);
		i++;
	}
}

function pageLoadOver(){
    if (nscWPConfig[0].getAttribute("autostart") == "1"){
    	nscWPPlayObject.setAttribute("autostart","true");
    	currentState=3;
    }
    //Code:nscWPHidden.appendChild(nscWPPlayObject);
	//Code:nscWPHidden.insertAdjacentElement("afterBegin",nscWPPlayObject);
    //Code:setTimeout("nscWPPlayObject.removeNode(true)",3000)
    
    
    //Start to write buttons
    //nscWPbtnPlay.in
    //Start to write the Caption
    ChangeMusic(currentMusic);
    marquee(nscWPMarquee,50,0);
    TestPlayStateChange();
}

function ChangeMusic(_musicid){
	if (document.getElementById("nscWPPlayObject") && IE)
		document.getElementById("nscWPPlayObject").removeNode(true);
	nscWPPlayObject.src=nscWPMusics[_musicid].getAttribute("src");
    var tmp = document.createElement("div");
    tmp.appendChild(nscWPPlayObject);
    if (IE)
		nscWPHidden.innerHTML="<OBJECT ID=\"nscWPPlayObject\" WIDTH=\"1\" HEIGHT=\"1\" CLASSID=\"CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95\" CODEBASE=\"http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715\" STANDBY=\"Loading Microsoft? Windows Media? Player components...\" TYPE=\"application/x-oleobject\"><param name=\"AutoStart\" value=\"true\" /><param name=\"filename\" value=\"" + nscWPMusics[_musicid].getAttribute("src") + "\" /><PARAM NAME=\"ShowControls\" VALUE=\"false\"></OBJECT>";
	else
		nscWPHidden.innerHTML=tmp.innerHTML;
	nscWPMarquee.innerHTML=(nscWPMusics[_musicid].getAttribute("author") == ""?"未知艺术家":nscWPMusics[_musicid].getAttribute("author")) + "-" + nscWPMusics[_musicid].getAttribute("name");
	currentMusic=_musicid;
	currentState=3;
}

function MusicStop(){
	if (document.getElementById("nscWPPlayObject") && IE){
		document.getElementById("nscWPPlayObject").stop();
		currentState=0;
	}
	else
		nscWPHidden.innerHTML="";	
}
function MusicPlay(){
	if (document.getElementById("nscWPPlayObject") && IE){
		document.getElementById("nscWPPlayObject").play();
		currentState=3;
	}
	else
		ChangeMusic(currentMusic);
}
function TestPlayStateChange(){
	if (document.getElementById("nscWPPlayObject")){
		if (IE){
			if (document.getElementById("nscWPPlayObject").PlayState == "0")
				NextSong();
		}
	}
	setTimeout("TestPlayStateChange()",2000);
}

function NextSong(){
	if (currentState==0)
		return
	if (currentMusic + 1 < nscWPMusics.length)
		currentMusic++;
	else
		currentMusic=0;
	ChangeMusic(currentMusic);
}

function ShowCastPanel(){
	var b = new Object();
	b.id="nscRecommendMusic";
	b.content="<br />&nbsp; &nbsp; &nbsp; &nbsp; 歌曲名称 <input id=\"nscMusicName\" type=\"text\" name=\"mName\" maxlength=\"50\" /><br />&nbsp; &nbsp; &nbsp; &nbsp; URL 地址 <input id=\"nscMusicUrl\" type=\"text\" name=\"mUrl\" value=\"http://\" maxlength=\"255\" /><br />&nbsp; &nbsp; &nbsp; &nbsp; 歌手姓名 <input id=\"nscMusicSinger\" type=\"text\" name=\"mSinger\" maxlength=\"50\" /><br />&nbsp; &nbsp; &nbsp; &nbsp; 专辑名称 <input id=\"nscMusicAlbum\" type=\"text\" name=\"mAlbum\" maxlength=\"50\" /><br />&nbsp; &nbsp; &nbsp; &nbsp; 专辑封面 <input id=\"nscMusicPic\" type=\"text\" name=\"mPic\" value=\"http://\" maxlength=\"255\" /><br />&nbsp; &nbsp; &nbsp; &nbsp; 专辑描述 <input id=\"nscMusicScription\" type=\"text\" name=\"mScription\" /><br />&nbsp; &nbsp; &nbsp; &nbsp; 推 荐 人&nbsp; <input id=\"nscMusicRecommender\" type=\"text\" name=\"mRecommender\" value=\"\" maxlength=\"50\" /><br /><br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <input type=\"button\" value=\"发送\" onclick=\"SendSOAPDataToCaster()\" />";
	b.title="推荐歌曲";
	b.x=nscCommonVar.pixel.center;
	b.y=nscCommonVar.pixel.middle;
	var cMusic = new nscMessageBox(b);
	cMusic.getself(cMusic);
	cMusic.show();
}

function SendSOAPDataToCaster(){
	var _url=document.getElementById("nscMusicUrl").value;
	var _name=document.getElementById("nscMusicName").value;
	var _author=document.getElementById("nscMusicSinger").value;
	var _album=document.getElementById("nscMusicAlbum").value;
	var _pic=document.getElementById("nscMusicPic").value;
	var _scription=wordFilter(document.getElementById("nscMusicScription").value);
	var _recommender=document.getElementById("nscMusicRecommender").value;
	if (chkBadWord(_url) || chkBadWord(_name) || chkBadWord(_author) || chkBadWord(_album) || chkBadWord(_pic) || chkBadWord(_scription) || chkBadWord(_recommender)){
		ErrMess("输入中有非法字符（如\" and\",\" or\",\" \"\"等），数据未存储");
		return;
	}
	if (_url.length > 255 || _name.length > 50 || _author.length > 50 || _album.length > 50 || _pic.length > 255 || _recommender > 50){
		ErrMess("输入的数据太长");
		return;
	}
	if (_url == "http://" || _url == ""){
		ErrMess("URL未填写");
		return;
	}
	if (!_url.match(/http:\/\/.+\.\w+\/.+\.(mp3|wma|mid|midi)\b/ig)){
		ErrMess("歌曲格式不正确");
		return;
	}
	if (_name == ""){
		ErrMess("歌名未填写");
		return;
	}

	SOAP2POST="_url=" + _url + "&_name=" + _name + "&_author=" + _author + "&_album=" + _album + "&_picture=" + _pic + "&_scription=" + _scription + "&_recommender=" + _recommender;
	var http_request=new XMLRequest(nscURLCaster,"POST",SOAP2POST,"application/x-www-form-urlencoded");
	//alert(Cast.outerHTML)
	http_request.onreadystatechange = function(){
	        if (http_request.readyState == 4) {
	            if (http_request.status == 200) {
	            	closeLoading();
	               if (http_request.responseXML.getElementsByTagName("int")[0].text == "1");{
	               	   	var b = new Object();
						b.id="nscAlert";
						b.content="数据已经成功存储到Web Service！";
						b.title="信息确认";
						b.x=nscCommonVar.pixel.center;
						b.y=nscCommonVar.pixel.middle;
						var cMusic = new nscMessageBox(b);
						cMusic.getself(cMusic);
						cMusic.show();
	               	   nscWPListBox.innerHTML="";
	               	   nscWebPlayerPageLoad(1);
	               }
	            } else {
	                alert('Caster服务无法连接。');
	            }
	        }
     }
}

//显示详细歌曲信息
function ViewInfo(){
	    var b = new Object();
		b.id="nscMusicViewInfo";
		b.content="<div name=\"nscInnerMusicViewInfo\" class=\"nscInnerMusicViewInfo\">" + ((typeof nscWPMusics[currentMusic].getAttribute("picture") == "string" && nscWPMusics[currentMusic].getAttribute("picture") != "http://" && nscWPMusics[currentMusic].getAttribute("picture") != "")?"<img src=\"" + nscWPMusics[currentMusic].getAttribute("picture") + "\"  width=\"120\" align=\"left\" style=\"margin-right:10px;\" />":"") + "歌曲名称：" + nscWPMusics[currentMusic].getAttribute("name") + "<br />歌手姓名：" + nscWPMusics[currentMusic].getAttribute("author") + "<br />专辑名称：" + nscWPMusics[currentMusic].getAttribute("album") + "<br />专辑描述：" + nscWPMusics[currentMusic].getAttribute("scription") + "<br />推荐人：" + nscWPMusics[currentMusic].getAttribute("recommender") + "<br /><div class=\"clearline\"></div><div class=\"nscWebPlayerBtnDown\" onclick=\"ErrMess('\\u003Cbr /\\u003E注意：该系统所连接歌曲有可能为外部连接，所有歌曲均由网友自主添加，如发现添加内容侵犯版权或者触及国家法律，请告之管理删除，谢谢合作！\\u003Cbr /\\u003E\\u003Cbr /\\u003E \\u003Cdiv class=\\u0022nscWebPlayerBtnDown\\u0022\\u003E\\u003C/div\\u003E\\u003Ca href\=\\u0022" + nscWPMusics[currentMusic].getAttribute("src") + "\\u0022\\u003E右键这里另存或者使用下载软件\\u003C/a\\u003E','获取您的歌曲文件下载地址！')\"></div><div class=\"nscWebPlayerBtnPrint\" onclick=\"ErrMess('<iframe id=\\u0022nscPrintFrame\\u0022 name=\\u0022nscPrintFrame\\u0022 frameborder=\\u00220\\u0022 width=\\u002290%\\u0022 style=\\u0022margin:10px;border:1px solid #FFF;\\u0022></iframe>提示：上面方格内为打印预览，您可以修改内容后再决定打印。<div class=\\u0022nscWebPlayerBtnPrint\\u0022 onclick=\\u0022document.getElementById(\\u0027nscPrintFrame\\u0027).contentWindow.print();\\u0022></div>','打印歌曲信息预览！');document.getElementById('nscPrintFrame').contentWindow.document.writeln('\\u003Chtml\\u003E\\u003Chead\\u003E\\u003Ctitle\\u003Euntitle\\u003C/title\\u003E\\u003C/head\\u003E\\u003Cbody style=\\u0022background-color:#000;color:#FFF\\u0022\\u003E" + ((typeof nscWPMusics[currentMusic].getAttribute("picture") == "string" && nscWPMusics[currentMusic].getAttribute("picture") != "http://" && nscWPMusics[currentMusic].getAttribute("picture") != "")?"<img src=\\u0022" + nscWPMusics[currentMusic].getAttribute("picture") + "\\u0022  width=\\u0022120\\u0022 align=\\u0022left\\u0022 style=\\u0022margin-right:10px;\\u0022 />":"") + "歌曲名称：" + nscWPMusics[currentMusic].getAttribute("name") + "<br />歌手姓名：" + nscWPMusics[currentMusic].getAttribute("author") + "<br />专辑名称：" + nscWPMusics[currentMusic].getAttribute("album") + "<br />专辑描述：" + nscWPMusics[currentMusic].getAttribute("scription") + "<br />推荐人：" + nscWPMusics[currentMusic].getAttribute("recommender") + "\\u003C/body\\u003E\\u003C/html\\u003E');document.getElementById('nscPrintFrame').contentWindow.document.close();document.getElementById('nscPrintFrame').contentWindow.document.designMode='on';\"></div></div>";
		b.title="歌曲信息";
		b.x=340;
		b.y=240 + document.documentElement.scrollTop;
		var cMusic = new nscMessageBox(b);
		cMusic.getself(cMusic);
		cMusic.show();
}