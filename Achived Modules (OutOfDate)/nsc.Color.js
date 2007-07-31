nsc.Color = new Object();
nsc.Color.Utility = new Object();
nsc.Color.RGB = function(){
	this.init();
}
nsc.Color.RGB.prototype = {
	r:0,g:0,b:0,
	init:function(){
		var _commonCMYKValueFunc = function(_color){
			return function(_value){
				if (_value != null){
					if (_value > 255 || _value < 0)
						throw "RGB value must between 0 and 255";
					this[_color] = _value;
				}
				return this[_color];
			}
		}
		this.R = _commonCMYKValueFunc.call(this,"r");
		this.G = _commonCMYKValueFunc.call(this,"g");
		this.B = _commonCMYKValueFunc.call(this,"b");
		nsc.System.PropertyBuilder(this.R,this);
		nsc.System.PropertyBuilder(this.G,this);
		nsc.System.PropertyBuilder(this.B,this);
		this.Hex= function(_hex){
			if (_hex != null){
				var regex = new RegExp(/[0-9A-Fa-f]/);
				if (_hex.length == 6 && regex.test(_hex)){
					this.R(parseInt(_hex.substring(0,2),16));
					this.G(parseInt(_hex.substring(2,4),16));
					this.B(parseInt(_hex.substring(4,6),16));
				}
				else
					throw "Please input a 6 length hex.";
			}
			var _r = nsc.System.parseHex(this.R,16);
			var _g = nsc.System.parseHex(this.G,16);
			var _b = nsc.System.parseHex(this.B,16);
			var _addzero = function(_value){
				var i;
				var result = _value;
				var tem = "";
				for(i = 0;i < 2 - _r.length;i++){
					tem += "0";
				}
				result = tem + result;
				return result;
			}
			_r = _addzero(_r);
			_g = _addzero(_g);
			_b = _addzero(_b);
			
			return _r + _g + _b;
		}
		nsc.System.PropertyBuilder(this.Hex,this);
	}
}
nsc.Color.CMYK = function(){
	this.init();
}
nsc.Color.CMYK.prototype = {
	c:0,m:0,y:0,k:0,
	init:function(){
		var _commonCMYKValueFunc = function(_color){
			return function(_value){
				if (_value != null){
					if (_value > 100 || _value < 0)
						throw "CMYK value must between 0 and 100";
					this[_color] = _value;
				}
				return this[_color];
			}
		}
		this.C = _commonCMYKValueFunc.call(this,"c");
		this.M = _commonCMYKValueFunc.call(this,"m");
		this.Y = _commonCMYKValueFunc.call(this,"y");
		this.K = _commonCMYKValueFunc.call(this,"k");
		nsc.System.PropertyBuilder(this.C,this);
		nsc.System.PropertyBuilder(this.M,this);
		nsc.System.PropertyBuilder(this.Y,this);
		nsc.System.PropertyBuilder(this.K,this);
	}
}
nsc.Color.Utility.RGB2CMYK = function(_rgb){
	var cmyk = new nsc.Color.CMYK();;
	var rgb;
	if (_rgb instanceof nsc.Color.RGB){
		rgb = _rgb;
	}
	else{
		throw "argurment _rgb is not a instance of nsc.Color.RGB";
	}
	
	var r = 1.0 - rgb.R / 255;
	var g = 1.0 - rgb.G / 255;
	var b = 1.0 - rgb.B / 255;
	nsc.System.Track(g);
	if (r < g)
		cmyk.K(r);
	else
		cmyk.K(g);
	if (b < cmyk.K)
		cmyk.K(b);
	nsc.System.Track(new String(cmyk.K));
	cmyk.C((r - cmyk.K)/(1.0 - cmyk.K));
	cmyk.M((g - cmyk.K)/(1.0 - cmyk.K));
	cmyk.Y((b - cmyk.K)/(1.0 - cmyk.K));
	nsc.System.Track(new String(cmyk.K));
	cmyk.C(Math.floor((cmyk.C * 100) + 0.5));
	cmyk.M(Math.floor((cmyk.M * 100) + 0.5));
	cmyk.Y(Math.floor((cmyk.Y * 100) + 0.5));
	cmyk.K(Math.floor((cmyk.K * 100) + 0.5));
	nsc.System.Track(new String(cmyk.K));
	return cmyk;
}