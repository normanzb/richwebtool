//This code written by http://birdshome.cnblogs.com/archive/2006/02/23/HighlightText.html birdshome
//rewrite by norman shinn http://eroman.org
//20:39 2006-5-4
function nscHighLigherPageInit()
{
    var url = document.referrer;
    if ( url != "undefined" )
    {
         var host = url.toLowerCase();
         if ( host.indexOf('.google.') != -1 )
         {
             var keywords = GetUrlValue(host,"q");
             if ( keywords )
             {
                  var ht = new HighlightText();
                  ht.Execute(keywords);
             }
         }
         else if ( host.indexOf('.baidu.') != -1 )
         {
        
         }    
    }   
}
function GetUrlValue(str,name){
	var params = str.split("?")[1].split("&");
	var i = 0;
	while (i < params.length){
		if (name == params[i].split("=")[0])
			break;
		i++;
	}
	return decodeURI(params[i].split("=")[1]);
}
function HighlightText(range)
{
    if ( range )
    {
         this.m_Range = range;
    }
    else
    {
         this.m_Range = document.body.createTextRange();
    }     
    this.m_Keyword = '';
    
    this.toString = function()
    {
         return '[class HightlightText]';
    };       
}

HighlightText.prototype.Execute = function(keyword)
{
     if ( keyword )
     {
          this.m_Keyword = keyword;
     }
     if ( this.m_Range && this.m_Keyword )
     {
         var separater = ' ';
         if ( this.m_Keyword.indexOf(' ') == -1 ) 
         {
              separater = '+';
         }   
         var keywords = this.m_Keyword.split(separater); 
         var bookmark = this.m_Range.getBookmark();             
         for ( var i=0 ; i < keywords.length ; ++i )
         {
             var keyword = keywords[i];
             if ( keyword && keyword.length > 1 )
             { 
                 while(this.m_Range.findText(keywords[i]))
                 {
                      this.m_Range.execCommand('ForeColor', 'false', 'highlighttext');
                      this.m_Range.execCommand('BackColor', 'false', 'highlight'); 
                      this.m_Range.collapse(false);
                 }
                 this.m_Range.moveToBookmark(bookmark);
             }
         }
     }
}