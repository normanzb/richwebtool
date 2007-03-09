nsc.Color = new Object();
nsc.Color.Utility = new Object();
nsc.Color.RGB = function(){
	this.init();
}
nsc.Color.RGB.prototype = {
	r:0,g:0,b:0,
	init:function(){
		this.R = function(_r){
			if (_r != null){
				if (_r > 255 || _r < 0)
					throw "RGB value must between 0 and 255";
				this.r = _r;
			}
			return this.r
		}
		this.G = function(_g){
			if (_g > 255 || _g < 0)
				throw "RGB value must between 0 and 255";
			this.g = _g;
			return this.g;
		}
		this.B = function(_b){
			if (_b > 255 || _b < 0)
				throw "RGB value must between 0 and 255";
			this.b = _b
			return this.b;
		}
		nsc.System.PropertyBuilder(this.R);
		nsc.System.PropertyBuilder(this.G);
		nsc.System.PropertyBuilder(this.B);
	}
}
nsc.Color.CMYK = function(){
	this.init();
}
nsc.Color.CMYK.prototype = {
	C:new Number(),
	M:new Number(),
	Y:new Number(),
	K:new Number()
}
nsc.Color.Utility.RGB2CMYK = function(_rgb){
	var cmky;
	var rgb;
	if (_rgb instanceof nsc.Color.RGB){
		rgb = _rgb;
	}
	else{
		throw new Exception("argurment _rgb is not a instance of nsc.Color.RGB");
	}
	
	var r = 1.0 - rgb.R / 255;
	var g = 1.0 - rgb.G / 255;
	var b = 1.0 - rgb.B / 255;
	
	if (r < g)
		cmky.K = r;
	else
		cmky.K = g;
	if (b < K)
		cmky.K = b;

	cmky.C = (r - cmyk.K)(1.0 - cmky.K);
	cmky.M = (G - cmky.K)(1.0 - cmky.K);
	cmky.Y = (B - cmky.K)(1.0 - cmky.K);

	cmky.C = Math.floor((cmky.C * 100) + 0.5);
	cmky.M = Math.floor((cmky.M * 100) + 0.5);
	cmky.Y = Math.floor((cmky.Y * 100) + 0.5);
	cmky.K = Math.floor((cmky.K * 100) + 0.5);

	return cmyk;
}