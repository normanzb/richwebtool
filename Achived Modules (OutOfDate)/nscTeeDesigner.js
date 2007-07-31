// JScript File

nscTeeDesigner = function(_viewbox){
	if ((typeof _viewbox).toLowerCase() == "string")
		this.ViewBox = document.getElementById(_viewbox);
	else 
		this.ViewBox = _viewbox;
	this.Init();
}

nscTeeDesigner.prototype = {
	CurrentSelectTee:0,
	CurrentSelectView:0,
	Init:function(){
		nsc.System.Track("Applying CSS...");
		//Apply CSS
		cssLoader("TeePodAppCss","./TeePodApp.css");
		
		nsc.System.Track("Detect CSS status...");
		temDetect = new nsc.Layout.CSS.StatusDetector("TeePodApp.css#CSSLoaded::width:1px",nsc.System.callBacker(this.PageInit,this));
		temDetect.Detect();

	},
	PageInit:function(){
		this.DefineElements();
		this.AddEvents();
		this.PageLoad();
	},
	DefineElements:function(){
		this.TeeStylesCollection = new Array(); //Tees Collection
		
		//TODO: Merge the seperated layout and code. Current layout is hard coded in aspx file, we should make the JS can automatically generate HTML.
		this.WorkingArea = new nsc.WorkingArea(this.ViewBox);
		this.WorkingArea.Width(1800);
		this.WorkingArea.Height(1800);
		
		this.Tee = this.WorkingArea.createElement("div");
		this.Tee.id = "Tee";
		this.Tee.style.width = "525px";
		this.Tee.style.height = "480px";
		this.Tee.style.backgroundRepeat = "no-repeat";

		this.WorkingArea.appendChild(this.Tee);
	},
	AddEvents:function(){
		
	},
	PageLoad:function(){
		this.GetTeeList();
		
		this.CurrentSelectView = nscTeeDesigner.DesignView.Front;
		this.LoadAndDrawTee(this.CurrentSelectTee);
		//this.DesignViewBox = 
		
		nsc.System.Element.DisableSelect(this.Tee);
		//this.TeeDragController = new nsc.System.Element.DragController(this.Tee);
		
		
	},
	GetTeeList:function(){
		//TODO: Read the tee style from external data source.
		var tee_FFFFFF = new nscTeeDesigner.TeeStyle();
		tee_FFFFFF.RGB.Hex("FFFFFF");
		tee_FFFFFF.Class = nscTeeDesigner.TeeClass.Tee;
		
		var tee_000000 = new nscTeeDesigner.TeeStyle();
		tee_000000.RGB.Hex("000000");
		tee_FFFFFF.Class = nscTeeDesigner.TeeClass.Tee;
		
		this.TeeStylesCollection.push(tee_FFFFFF);
		this.TeeStylesCollection.push(tee_000000);
	},
	LoadAndDrawTee:function(_id){
		this.Tee.style.backgroundImage="url(./Suitpics/" + this.TeeStylesCollection[_id].Class + "/" + this.TeeStylesCollection[_id].RGB.Hex + "_" + this.CurrentSelectView + ".gif)";
	}
}

nscTeeDesigner.TeeStyle = function(){
	this.Init();
}
nscTeeDesigner.TeeStyle.prototype = {
	Init:function(){
		this.RGB = new nsc.Color.RGB();
		this.CMYK = function(_cmyk){
			if (_cmyk != null){
				//TODO
			}
			return nsc.Color.RGB2CMYK(this.RGB);
		}
		nsc.System.PropertyBuilder(this.CMYK,this);
		this.Class = new Number();

	}
}

//TODO: Unserialization teeclass from xml
nscTeeDesigner.TeeClass = {
	Tee:"tee",
	LongSleevesTee:"longsleevestee",
	Polo:"polo",
	LongSleevesPolo:"longsleevespolo",
	Hoody:"hoody"
}

nscTeeDesigner.DesignView = {
	Front:"front",
	Back:"back",
	Side:"side"
}

//Entry Point
function nscTeeDesignerPageInit(){

    nsc.System.Track("nscTeeDesigner start...");
    try{
    	iNscTeeDesigner = new nscTeeDesigner("DesignViewBox");
    }
    catch(e){
    	nsc.System.Track(e.message);
    }
}