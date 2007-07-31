nsc.WorkingArea = function(_element,_width,_height){
	this.Init();
	this.BindElement(_element);
	this.DOMInitial();
	this.Width(_width);
	this.Height(_height);
}
nsc.WorkingArea.prototype = {
	Init:function(){
		//Not public 
		this.element = new Object();
		this.width = new Number();
		this.height = new Number();
		//public
		this.BindElement = function(_element){
			if (_element != null){
				this.element = _element;
			}
			return this.element;
		};
		this.Width = function(_value){
			if (_value != null){
				this.width = _value;
				this.WorkingArea.style.width = _value + "px";
				this.onLoad();
			}
			return this.width;
		};
		this.Height = function(_value){
			if (_value != null){
				this.height =_value;
				this.WorkingArea.style.height = _value + "px";
				this.onLoad();
			}
			return this.height;
		};
		this.WorkingArea = new Object();
		
		this.LayerManager = new nsc.Component.Windows.LayerManager(1000,10000);
		//Make WorkingArea instance like a dom
		this.appendChild = function(_obj,_x,_y){
			this.WorkingArea.appendChild(_obj);
			_obj.style.position = "absolute";
			_obj.style.left = this.Width() / 2 - _obj.clientWidth / 2 + "px";
			_obj.style.top = this.Height() / 2 - _obj.clientHeight / 2 + "px";
			this.LayerManager.AddBindedElement({Layer:this.LayerManager.Count(),Element:_obj});
		};
		this.createElement = function(_obj){
			return nsc.System.IFrameDoc(this.IFrame).createElement(_obj);
		}
		
		this.IFrame = document.createElement("iframe");
		
		this.DOMInitial = function(){
			this.IFrame.name = this.BindElement().id + "_iframe";
			this.IFrame.src="./JS/blank.htm";
			this.IFrame.width = "100%";
			this.IFrame.height = "100%";
			this.IFrame.frameBorder = "0";
			this.BindElement().appendChild(this.IFrame);
			
			//Generate IFrame DOM
			nsc.System.IFrameDoc(this.IFrame).write("<body></body>");
			nsc.System.IFrameDoc(this.IFrame).close();
			nsc.System.IFrameDoc(this.IFrame).body.style.backgroundColor = "#EEE";
			this.WorkingArea = nsc.System.IFrameDoc(this.IFrame).createElement("div");
			nsc.System.IFrameDoc(this.IFrame).body.appendChild(this.WorkingArea);
		};
		
		this.onLoad = function(){
			this.Load();
		};
		
		this.Load = function(){
			this.Center();
			this.Middle();
		};
		
		this.Center = function(){
			//iNscTeeDesigner.WorkingArea.IFrame.contentWindow.document.body.scrollLeft
			nsc.System.IFrameWin(this.IFrame).scroll((this.Width() - this.IFrame.clientWidth) / 2, nsc.System.IFrameDoc(this.IFrame).body.scrollTop);
		};
		this.Middle = function(){
			nsc.System.IFrameWin(this.IFrame).scroll(nsc.System.IFrameDoc(this.IFrame).body.scrollLeft, (this.Height() - this.IFrame.clientHeight)/ 2);
		};
	}
}