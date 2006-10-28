<%@LANGUAGE="javascript" CODEPAGE="65001" %> 
<% 
Session.CodePage = "65001" ;
Response.contentType="text/xml" ;
Response.Expires = 0 ;

var oUrl=Request.QueryString("url").Count == 0?new String(Request.QueryString):new String(Request.QueryString).replace("url=","").replace(/\&nscts\=.*/,"");
var oMethod=new String(Request.Form) ==  "undefined"?"GET":"POST";
var oPosted=oMethod == "GET" || new String(Request.Form) == ""?null:new String(Request.Form) + "";
var oContentType = Request.ServerVariables("CONTENT_TYPE");
var xmldoc=Server.CreateObject("Microsoft.Xmlhttp"); 
if (oUrl.indexOf("http://") != 0){
	exm("非法的URL:" + oUrl);	
}
try{
	xmldoc.open(oMethod,oUrl,false);
	if (oContentType != "")
		xmldoc.setRequestHeader("Content-Type",oContentType);
	xmldoc.send(oPosted); 
	Response.write(xmldoc.responseText);
}
catch(ex){
	exm(ex.message + "Method:" + oMethod + "\nUrl:" + oUrl + "\nPosted Data:" + oPosted + "\nContentType:" + oContentType);
}
function exm(exmessage){
	Response.write("<Exception><![CDATA[" + exmessage + "]]></Exception>");
	Response.End();
}
%>