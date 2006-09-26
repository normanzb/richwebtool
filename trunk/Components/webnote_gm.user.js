// Usage:
//   alt+n makes a new note
//   If you're using a Mac, press ctrl+n (for some strange reason alt+n
//   doesn't register).
//
// CHANGES
// 2005.08.06 - fix script to work with GM 0.5
//
// This file is licensed under the BSD-new license:
// http://www.opensource.org/licenses/bsd-license.php

// ==UserScript==
// @name          webnote gm
// @namespace     http://ponderer.org
// @description   collaborative stickes applied to websites
// @include       http://*
// @exclude       https://*
// @exclude       *.user.js
// ==/UserScript==

var VERSION = '$Revision: 1.17 $';
var BASEURL = 'http://localhost/lbs/nscWebTools/';

var hex2dec = function(h) { return parseInt(h, 16); };
var dec2hex = function(d)
{
  var ret = d.toString(16);
  while (ret.length < 2)
    ret = '0' + ret;
  return ret;
};

function XmlHttp() {
  this.status = 200;
  this.readyState = 4;
}

XmlHttp.prototype.open = function(method, url, async) {
  this.method = method;
  this.url = url;
};

XmlHttp.prototype.send = function(data) {
  GM_xmlhttpRequest({
    headers: {'User-Agent': 'webnote gm ' + VERSION + '; http://ponderer.org'},
    method: this.method,
    url: this.url,
    onload: this.onreadystatechange,
    data: data
  });
}

function getxmlreqobj() {
  return new XmlHttp();
}


String.prototype.trim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '');
}

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for (var i = 0; i < x.length; i += 16) {
    for (var j = 0; j < 16; j++) {
      if (undefined == x[i + j])
        x[i + j] = 0;
    }
  }  

  for(i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz) {
    if (bin[i>>5])
      bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
    else
      bin[i>>5] = (str.charCodeAt(i / chrsz) & mask) << (i%32);
  }
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}


/**
 * modified from http://www.quirksmode.org/js/findpos.html
 * to return a Point()
 */
function findPos(obj)
{
  var cur = new Point();
  if (obj.offsetParent)
  {
    while (obj.offsetParent)
    {
      cur.x += obj.offsetLeft;
      cur.y += obj.offsetTop;
      obj = obj.offsetParent;
    }
  }
  else if (obj.x)
  {
    cur.x += obj.x;
    cur.y += obj.y;
  }
  return cur;
}

///
/// generic objects
///

/**
 * Create a new Point object
 * @class A class representing two numbers, x and y.
 * @param {int} x optional parameter for x
 * @param {int} y optional parameter for y
 * @constructor
 */
function Point(x, y)
{
  /**
   * @type int
   */
  this.x = x ? x : 0;
  /**
   * @type int
   */
  this.y = y ? y : 0;
}
/**
 * Add two points together and return a new Point object.
 * @param {Point} rhs The point object to add.
 * @return a new point object
 * @type Point
 */
Point.prototype.add = function(rhs) { return new Point(this.x + rhs.x, this.y + rhs.y); };
/**
 * Subtract the input point from the object and return a new Point object.
 * @param {Point} rhs The point to subtract.
 * @return a new point object
 * @type Point
 */
Point.prototype.sub = function(rhs) { return new Point(this.x - rhs.x, this.y - rhs.y); };
/**
 * Divide x and y by the input value.
 * @param {int} n a number to divide by
 * @return a new point object
 * @type Point
 */
Point.prototype.div = function(n) { return new Point(this.x/n, this.y/n); };
/**
 * Make a copy of the Point object.
 * @return a new point object
 * @type Point
 */
Point.prototype.copy = function() { return new Point(this.x, this.y); };
/**
 * Determines if two points have the samve x and y values, respectively.
 * @param {Point} rhs the point to compare
 * @type boolean
 */
Point.prototype.equals = function(rhs) { return this.x == rhs.x && this.y == rhs.y; };
/**
 * A string representation of a point.
 * @return E.g., "(1, 2)"
 * @type String
 */
Point.prototype.toString = function() { return '(' + this.x + ', ' + this.y + ')'; };


/**
 * Create a new object to represent a color in HSV.
 * @class A class representing a color as HSV values.
 * @param {Color} rgb A Color object (RGB) to convert to HSV.
 * @constructor
 */
function ColorHSV(rgb)
{
  var r = rgb.r / 255.0; var g = rgb.g / 255.0; var b = rgb.b / 255.0;
  
  var min = Math.min(r, g, b); var max = Math.max(r, g, b);
  this.v = max;
  var delta = max - min;
  if (0 == max) // r == g == b == 0
  {
    this.s = 0;
    this.h = -1;
  }
  else
  {
    this.s = delta / max;
    if (r == max)
      this.h = (g - b) / delta;
    else if (g == max)
      this.h = 2 + (b - r) / delta;
    else
      this.h = 4 + (r - g) / delta;
    this.h *= 60.0;
    if (!this.h) // shades of grey have no value
      this.h = 0;
    if (this.h < 0)
      this.h += 360.0;
  }
}
/**
 * A pretty way to write out the value of a HSV point.
 * @type String
 */
ColorHSV.prototype.toString = function()
{
  return '(' + this.h + ', ' + this.s + ', ' + this.v + ')';
};
/**
 * Convert the HSV value to RGB and return a Color object.
 * @type Color
 */
ColorHSV.prototype.toColor = function()
{
  var ret = new Color('000000');
  if (0 == this.s)
  {
    ret.r = ret.g = ret.b = parseInt(this.v*255.0);
    return ret;
  }
  var h = this.h / 60.0;
  var i = Math.floor(h);
  var f = h - i;
  var p = this.v * (1.0 - this.s);
  var q = this.v * (1.0 - this.s * f);
  var t = this.v * (1.0 - this.s * (1 - f));
  switch (i)
  {
    case 0: ret.r = this.v; ret.g = t; ret.b = p; break;
    case 1: ret.r = q; ret.g = this.v; ret.b = p; break;
    case 2: ret.r = p; ret.g = this.v; ret.b = t; break;
    case 3: ret.r = p; ret.g = q; ret.b = this.v; break;
    case 4: ret.r = t; ret.g = p; ret.b = this.v; break;
    case 5: ret.r = this.v; ret.g = p; ret.b = q; break;
    default:
      db('error coverting from hsv to rgb');
  }
  ret.r = parseInt(ret.r*255.0);
  ret.g = parseInt(ret.g*255.0);
  ret.b = parseInt(ret.b*255.0);
  return ret;
};
/**
 * Adjust the HSV values of the object.  Returns a reference to the same
 * object.
 * @param {int} h hue adjustment
 * @param {int} s saturation adjustment
 * @param {int} v luminance adjustment
 * @type ColorHSV
 */
ColorHSV.prototype.adj = function(h, s, v)
{
  this.h += h; this.s += s; this.v += v;
  
  if (h < 0)
    h += 360.0;
  if (h > 360)
    h -= 360.0;
  this.s = Math.min(1.0, this.s); this.s = Math.max(0.0, this.s);
  this.v = Math.min(1.0, this.v); this.v = Math.max(0.0, this.v);
  return this;
};


/**
 * Create a new object to represent a color as RGB values.
 * @class A class representing a color as RGB values.
 * @param {String} value A string representing the color.  It can be in any
 * of the following formats: rgb(##, ##, ##), #ffffff, or ffffff
 * @constructor
 */
function Color(value)
{
  // constuctor creates object from a string
  // I keep all values in decimal
  if (value.charAt(0) == 'r')
  {
    /**
     * @type int
     */
    this.r = parseInt(value.substring(4));
    var pos = value.indexOf(',');
    /**
     * @type int
     */
    this.g = parseInt(value.substring(pos+1));
    pos = value.indexOf(',', pos+1);
    /**
     * @type int
     */
    this.b = parseInt(value.substring(pos+1));
  }
  else
  {
    if (value.charAt(0) == '#')
      value = value.substring(1, 7);
    this.r = hex2dec(value.substring(0, 2));
    this.g = hex2dec(value.substring(2, 4));
    this.b = hex2dec(value.substring(4, 6));
  }
}
/**
 * Convert the object to a string of the form #ffffff
 * @type String
 */
Color.prototype.toString = function()
{
  return '#' + dec2hex(this.r) + dec2hex(this.g) + dec2hex(this.b);
};
/**
 * Adjust the HSV values of the color.  Returns a reference to the
 * object.
 * @param {float} h hue
 * @param {float} s saturation
 * @param {float} v luminance
 * @type Color
 */
Color.prototype.hsvadj = function(h, s, v)
{
  var hsv = new ColorHSV(this);
  hsv.adj(h, s, v);
  var c = hsv.toColor();
  this.r = c.r; this.g = c.g; this.b = c.b;
  return this;
};

var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/**
 * Create a new MyDate object.
 * @class A class representing the current date and time.
 * @param {String} a string of the form "YY-MM-DD HH:mm:ss"
 * @constructor
 */
function MyDate(stddt)
{
  var tokens = stddt.split(' ');
  var dateTokens = tokens[0].split('-');
  var timeTokens = tokens[1].split(':');

  var dateobj = new Date();
  dateobj.setYear(dateTokens[0] - 1900);
  dateobj.setMonth(dateTokens[1] - 1);
  dateobj.setDate(dateTokens[2]);
  dateobj.setHours(timeTokens[0]);
  dateobj.setMinutes(timeTokens[1]);
  dateobj.setSeconds(timeTokens[2]);

  /**
   * @type Date
   */
  this.dateobj = dateobj;
  return this;
}
/**
 * Left pad a number with zeros (up to 2 digits).  For example, 4 to "04".
 * @type String
 */
MyDate.prototype.pad = function(s)
{
  while (s.toString().length < 2)
    s = '0' + s;
  return s;
};
/**
 * A pretty (well, to me at least) string representing the date.
 * For example, "Mon Jan 4, 13:42:12"
 * @type String
 */
MyDate.prototype.toString = function()
{
  var d = this.dateobj;
  return weekdays[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate()
          + ', ' + this.pad(d.getHours()) + ':' + this.pad(d.getMinutes())
          + ':' + this.pad(d.getSeconds());
};


var debugOn = 0;
var notePadding = 5;
var noteBorder = 3;
var noteBorderColor = '#000';

/**
 * Create a new note object.  You shouldn't need to call this directly, use
 * {@link workspace#createNote} instead.
 * @class A class that acts as a wrapper to the actual html div that is a
 * note.  Rather than operating directly on the html object, use this
 * class instead.
 * TODO: attach these methods directly to the html objects.
 * @param {HtmlElement} note a reference to the actual note or a string that
 * is the id of the note
 * @param {workspace} p a reference to the parent workspace
 * @param {string} text the text of the note
 */
function Note(note, p, text)
{
  // constructor code
  if (typeof note == 'string')
    note = get(note);
  if (!text) text = ''
  // 
  /**
   * TODO: fix references to workspace with this.parent
   * @type workspace
   */
  this.parent = p;
  /**
   * Whether or not is it possible to click on a note and select it
   * @type boolean
   */
  this.selectable = true;
  /**
   * Whether or not we can double click and edit a note
   * @type boolean
   */
  this.editable = true;
  /**
   * The html id of the note
   * @type string
   */
  this.id = note.id;
  /**
   * The height and width of the note
   * @type Point
   */
  this.size = new Point(parseInt(note.style.width), parseInt(note.style.height));

  // call methods
  this.setColor(note.style.backgroundColor, true);
  this.setText(text);
  this.updateSize();
}
/**
 * User clicked on a note.
 */
Note.prototype.mouseDown = function(ev)
{
  if (!this.selectable)
    return true;

  // alt + rt click == send to back
  // 2 is rt click in both IE and Mozilla
  if (ev.altKey && 2 == ev.button)
  {
    this.sendToBack();
    return true;
  }

  // mozilla and w3c's button mapping (0, 1, 2)
  var lbutton = false;
  lbutton = 0 == ev.button;

  // only the left button should have an event
  // likewise we can disable actions by using meta or ctrl+alt
  if (!lbutton || ev.metaKey || (ev.ctrlKey && ev.altKey))
    return true;
  
  ev.cancelBubble = true;
  this.parent.mouse.select(this, ev);
  return true;
}
/**
 * User deselected a note (stopped dragging).
 */
Note.prototype.mouseUp = function() { this.parent.mouse.deselect(); }
/**
 * Note keyboard events.
 */
Note.prototype.keyDown = function(ev)
{
  // don't do anything if we're editing the note
  if (this.parent.edit == this)
    return;
  
  // do nothing
}
/**
 * Moving the mouse while over a note (changes cursor).
 */
Note.prototype.mouseMove = function(ev)
{
  var elt = get(this.id);
  if (!this.selectable)
  {
    elt.style.cursor = 'auto';
    return;
  }
  if (this.parent.mouse.selObj)
    return;
  var top = false;
  var left = false;
  var right = false;
  var bottom = false;
  var size = this.getCorrectedSize();
  
  if (ev.layerX <= noteBorder)
    left = true;
  if (size.x - ev.layerX <= noteBorder)
    right = true;
  if (ev.layerY <= noteBorder)
    top = true;
  if (size.y - ev.layerY <= noteBorder)
    bottom = true;
  if ( (top && left) || (bottom && right) )
    elt.style.cursor = 'nw-resize';
  else if ( (top && right) || (bottom && left) )
    elt.style.cursor = 'ne-resize';
  else if (top || bottom)
    elt.style.cursor = 'n-resize';
  else if (left || right)
    elt.style.cursor = 'e-resize';
  else
    elt.style.cursor = 'move';
  this.parent.mouse.notePosRel['top'] = top;
  this.parent.mouse.notePosRel['bottom'] = bottom;
  this.parent.mouse.notePosRel['left'] = left;
  this.parent.mouse.notePosRel['right'] = right;
}
/**
 * Mouse moves over a note (lighten the background color).
 */
Note.prototype.mouseOver = function()
{
  //var elt = get(this.id);
  //elt.style.background = (new Color(this.bgColor.toString())).hsvadj(0, 0, +0.1);
  this.parent.mouse.noteOver = this;
}
/**
 * Mouse leaves a note (restore original background color).
 */
Note.prototype.mouseOut = function()
{
  //var elt = get(this.id);
  //elt.style.backgroundColor = this.bgColor.toString();
  delete this.parent.mouse.noteOver;
}
/**
 * Double-click event on a note (try to toggle edit mode).
 */
Note.prototype.mouseDblClick = function()
{
  if (!this.editable)
    return;
  
  if (this.parent.edit == this)
  {
    this.parent.editOff();
    return;
  }
  this.parent.editOff();
  var pSize = this.getCorrectedSize();
  pSize.x -= 2*(noteBorder+notePadding+1);
  pSize.y -= 2*(noteBorder+notePadding+1) + 16;
  // change this to dom stuff
  var html = "<div style='text-align:right;margin: 0 2 1 0;'>"
  html += "<img id='i" + this.id + "' src='data:image/gif;base64,R0lGODlhDAAMAIABAP8AAP///yH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBCgABACwAAAAADAAMAEACGgSCibYcdhSE0rWYZsV58gs+VjeSFLmJSlUAADs=' alt='close button'"
        + " title='click to destroy note' style='cursor:auto;border:0;height:12px;width:12px;' />"
        + "</div>";
        
  html += "<textarea wrap='virtual' id='"
        + this.id + "text' style='width:" + pSize.x
        + "px;height:" + pSize.y + "px'>"
        + this.text + '</textarea>';
 
  var elt = get(this.id);
  elt.innerHTML = html;
  var nid = this.id;
  document.getElementById('i' + this.id).addEventListener('click', function(ev) {
    workspace.notes[nid].destroy(true);
  }, true);
  elt.title = '';
  var textarea = get(this.id + 'text');
  textarea.focus();
  textarea.addEventListener('mousedown', function(ev) { ev.stopPropagation(); }, true);
  textarea.addEventListener('dblclick', function(ev) { ev.stopPropagation(); }, true);
  this.parent.edit = this;
}
/**
 * Destroy the note (user clicked on the X).
 * @param {boolean} addToHistory should we add information to the undo
 * stack?
 */
Note.prototype.destroy = function(addToHistory)
{
  // if it's being edited, turn it off
  if (this.parent.edit == this)
    this.parent.editOff();
  
  var elt = get(this.id);
  
  // save undo information
  if (addToHistory)
  {
    var pos = this.getPosition();
    var ws = this.parent;
    var f = {
      title : 'delete note',
      noteData : {
          'id' : this.id,
          'xPos' : pos.x,
          'yPos' : pos.y,
          'height' : this.size.y,
          'width' : this.size.x,
          'bgcolor' : this.bgColor.toString(),
          'zIndex' : elt.style.zIndex,
          'text' : this.text
        },
      undo : function()
      {
        ws.createNote(this.noteData);
      },
      redo : function()
      {
        ws.notes[this.noteData.id].destroy(false);
      }
    };
    this.parent.history.add(f);
  }
  
  // now delete the html node
  elt.parentNode.removeChild(elt);
  
  // remove it from the array of notes
  delete this.parent.notes[this.id];
  this.parent.numNotes--;
  workspace.changed = true;
}
/**
 * Get the coordinates of the upper left corner of the note.
 * @type Point
 */
Note.prototype.getPosition = function()
{
  var ret = new Point(0, 0);
  var elt = get(this.id);
  if (elt)
    ret = new Point(parseInt(elt.style.left), parseInt(elt.style.top));
  return ret;
}
/**
 * Get the size of the note according to the dom object (this varies on
 * browser).
 * @type Point
 */
Note.prototype.getSize = function()
{
  return new Point(this.size.x, this.size.y);
}
/**
 * Get the size of the note including border and padding.
 * @type Point
 */
Note.prototype.getCorrectedSize = function()
{
  var ret = this.getSize();
  ret.x += 2*(noteBorder+notePadding);
  ret.y += 2*(noteBorder+notePadding);
  return ret;
}

/**
 * Set the color of a note.
 * @param {string} hex the color in hex
 * @param {boolean} ignoreHistory should we add it to the history?
 * Different default values makes this inconsistent with {@link #destroy}
 */
Note.prototype.setColor = function(hex, ignoreHistory)
{
  var newColor = new Color(hex);

  if (!ignoreHistory)
  {
    var f = {
      title : 'change color',
      note : this,
      ucolor : this.bgColor,
      rcolor : newColor,
      undo : function()
      {
        this.note.setColor(this.ucolor.toString(), true);
      },
      redo : function()
      {
        this.note.setColor(this.rcolor.toString(), true);
      }
    }
    this.parent.history.add(f);
  }
  
  this.bgColor = newColor;

  var elt = get(this.id);
  if (this.parent.mouse.noteOver && this.parent.mouse.noteOver == this)
    elt.style.background = (new Color(this.bgColor.toString())).hsvadj(0, 0, -0.1);
  else
    elt.style.background = this.bgColor.toString();
}
/**
 * Convert the text of a note to html.  We perform a simple transform of
 * newlines into <br/> and ! into headings.  Other wiki/textile like
 * transforms would happen here.
 * @type string
 */
Note.prototype.getHTML = function() // wikification
{
  var sCopy = this.text.replace(/\n/g,"<br />\n");
  var lines = sCopy.split('\n');
  for (var i = 0; i < lines.length; i++)
  {
    if (lines[i].length > 0)
    {
      // handle headings
      switch(lines[i].charAt(0))
      {
        case '!': // headings
          var c = 0;
          while ('!' == lines[i].charAt(c))
            c++;
          lines[i] = lines[i].substring(c);
          c = Math.min(c, 3); // h3 is the biggest
          c = 4 - c;
          lines[i] = '<h' + c + '>' + lines[i] + '</h' + c + '>';
          break;
        default:
          // lines[i] = lines[i] + '<br />';
      }
    }
  }
  // this is a way to disable text selection, but it's not easy to turn it
  // back on
  //"<div id='pseudo" + this.id 
  // + "' unselectable='on' onmousedown='return ev.metaKey || (event.ctrlKey && event.altKey)'>" 
  return lines.join('');
}
/**
 * Generate the xml representing a note (used when we save notes).
 * @type string
 */
Note.prototype.toXML = function()
{
  var ret = "<note noteid='" + this.id + "'";
  ret += " bgcolor='" + this.bgColor + "'";
  ret += " xposition='" + this.getPosition().x + "'";
  ret += " yposition='" + this.getPosition().y + "'";
  ret += " height='" + this.getSize().y + "'";
  ret += " width='" + this.getSize().x + "'";
  ret += " zindex='" + get(this.id).style.zIndex + "'";
  ret += ">\n" + escape(this.text) + "\n";
  return ret + "</note>"
}
/**
 * Change the text of a note.
 * @param {string} str the text for the note.
 */
Note.prototype.setText = function(str)
{
  // convert characters from 160-255 to html codepoints (this provides
  // Safari compatability)
  var chars = new Array();
  var i;
  for (i = 0; i < str.length; i++)
  {
    var c = str.charCodeAt(i);
    if (c >= 160 && c <= 255)
      chars.push("&#" + c + ";");
    else
      chars.push(str.charAt(i));
  }
  str = chars.join('');

  if (str != this.text)
  {
    this.parent.changed = true;
    this.text = str;
  }
  var elt = get(this.id);
  elt.innerHTML = this.getHTML();

  // make images undraggable
  var imgs = elt.getElementsByTagName('img');
  for (i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('mousedown', function() { return false; }, true);
  }
  
  elt.title = 'double click to edit';
}
/**
 * We keep track of the size of the note internally; this method updates
 * that value.
 */
Note.prototype.updateSize = function()
{
  var elt = get(this.id);
  this.size.x = parseInt(elt.style.width);
  this.size.y = parseInt(elt.style.height);
}
/**
 * Disable a note (can't be moved or edited).
 */
Note.prototype.disable = function()
{
  this.selectable = this.editable = false;
  var elt = get(this.id);
  elt.title = '';
}
/**
 * Enable a note (can be moved and edited).
 */
Note.prototype.enable = function()
{
  this.selectable = this.editable = true;
  var elt = get(this.id);
  elt.title = 'double click to edit';
}
/**
 * When a note is selected from the mini note toolbar, we bring it to the
 * front and flash the background.
 */
Note.prototype.select = function()
{
  this.parent.reZOrder(this.id);
  var self = this;
  var elt = get(this.id);
  elt.style.backgroundColor = (new Color(this.bgColor.toString())).hsvadj(0, 0, -0.1);
  setTimeout(function() { elt.style.backgroundColor = self.bgColor.toString(); }, 500);
}
/**
 * Send a note to the back of the workspace.
 */
Note.prototype.sendToBack = function()
{
  var elt = get(this.id);
  elt.style.zIndex = 0;
  this.parent.reZOrder();
}

/**
 * Determine which note is above which other note.  Used when re-stacking
 * notes.  Returns -1 if a is below b, +1 if a is above b, and 0 if they
 * have the same z value.
 * @param {Note} a
 * @param {Note} b
 * @type int
 */
function cmpNotesZ(a, b)
{
  var av = parseInt(get(a.id).style.zIndex);
  var bv = parseInt(get(b.id).style.zIndex);
  if (av < bv)
    return -1;
  if (av > bv)
    return 1;
  return 0;
}

//
// Mouse objects
//

/**
 * @class A class that tracks the mouse position and handles mouse events.
 * @constructor
 */
var Mouse =
{
  /**
   * When resizing a note, this determines which edges need to be moved and
   * which edges remain fixed.  It is a dictionary from string -> boolean
   * where the string is either 'top, 'right', 'bottom' or 'left' and true
   * means the edge is moving.
   * @see Note#mouseMove
   * @type dictionary
   */
  notePosRel : {},
  /**
   * The current location of the mouse.  We initialize it to a dummy value
   * because object.js probably hasn't loaded yet (and Point is undefined).
   * It actually gets set in {@link GLOBALS#init}
   * @type Point
   */
  curPos : 0,

  /**
   * Update the mouse position and resize/move notes if necessary.
   * @param {int} x x position
   * @param {int} y y position
   */
  update : function(x, y)
  {
    this.curPos.x = x;
    this.curPos.y = y;

    // if something is selected
    if (this.selObj)
      this.selObj.update(this);
  },
  /**
   * Select a note either for dragging or for resizing.
   * @param {Note} note the selected note
   * @param {event} ev the javascript event object
   */
  select : function(note, ev)
  {
    if (this.selObj) // something already selected
      return;

    if (get(note.id).style.cursor != "move")
      this.selObj = new SelectedObjectResize(note, this.notePosRel);
    else
    {
      if (ev.altKey)
      {
        this.selObj = new SelectedObjectResize(note, 
              {'top': false, 'bottom':true, 'left':false, 'right':true});
      }
      else if (ev.ctrlKey)
        this.selObj = new SelectedObjectDrag(note, true)
      else
        this.selObj = new SelectedObjectDrag(note, false);
    }
    this.downPos = this.curPos.copy();
    
    // move the selected item to the top
    workspace.reZOrder(note.id);
  },
  /**
   * Release selected notes.
   */
  deselect : function()
  {
    if (this.selObj)
    {
      this.selObj.deselect();
      delete this.selObj;
    }
  }
};


/**
 * Create a new Dragging object.
 * @class A class that contains information about note(s) that is being
 * dragged.
 * @see Mouse#select
 * @param {Note} note a reference to the note being dragged
 * @param {boolean} isGroup are we dragging all notes of the same color?
 * @constructor
 */
function SelectedObjectDrag(note, isGroup)
{
  /**
   * The note(s) being dragged.
   * @type Array
   */
  this.notes = new Array();
  
  // if ctrl is down, move all the notes of the same color
  if (isGroup)
  {
    for (var n in workspace.notes)
    {
      if (workspace.notes[n].bgColor.toString() == note.bgColor.toString())
      {
        this.notes.push( { 'id' : workspace.notes[n].id, 
              'pos' : workspace.notes[n].getPosition() } );
      }
    }
  }
  else // single note move
    this.notes.push( { 'id' : note.id, 'pos' : note.getPosition() } );
  
  // set the border color of the notes that are being moved
  var elt;
  for (n in this.notes)
  {
    elt = get(this.notes[n].id);
    elt.style.border =  noteBorder + 'px #980000 solid';
  }
}
/**
 * Update the position of note(s) when the user moves the mouse.
 * @param {Mouse} md a reference to the parent mouse object
 */
SelectedObjectDrag.prototype.update = function(md)
{
  var offset = md.curPos.sub(md.downPos);
  var elt;
  for (n in this.notes)
  {
    elt = get(this.notes[n].id);
    var newPos = this.notes[n].pos.add(offset);
    elt.style.left = newPos.x + 'px';
    elt.style.top = newPos.y + 'px';
  }
  workspace.changed = true;
};
/**
 * When we drop a note, we need to reset the colors of borders and add
 * information to the undo stack.
 */
SelectedObjectDrag.prototype.deselect = function()
{
  // check to see if we moved the object(s). if we did, add 
  // information to the undo stack.
  var md = workspace.mouse;
  var offset = md.curPos.sub(md.downPos);
  if (!offset.equals(new Point(0, 0)))
  {
    var f = {
      title : 'move note(s)',
      notes : this.notes,
      off : offset,
      undo : function()
      {
        var elt;
        for (n in this.notes)
        {
          elt = get(this.notes[n].id);
          pos = this.notes[n].pos;
          elt.style.left = pos.x + 'px';
          elt.style.top = pos.y + 'px';
        }
      },
      redo : function()
      {
        var elt;
        for (n in this.notes)
        {
          elt = get(this.notes[n].id);
          pos = this.notes[n].pos.add(this.off);
          elt.style.left = pos.x + 'px';
          elt.style.top = pos.y + 'px';
        }
      }
    };
    
    workspace.history.add(f);
  }
  // reset the border color to black
  var elt;
  for (var n in this.notes)
  {
    elt = get(this.notes[n].id);
    elt.style.border =  noteBorder + 'px ' + noteBorderColor + ' solid';
  }
};


// inheritance might be useful here
/**
 * Create a new Resizing object.
 * @class A class that contains information about a note being resized.
 * @see Mouse#select
 * @param {Note} note a reference to the note being dragged
 * @param {dictionary} pnotePosRel which edges are being resized? It is 
 * a dictionary from string -> boolean where the string is either
 * 'top, 'right', 'bottom' or 'left' and true means the edge is moving.
 * @constructor
 */
function SelectedObjectResize(note, pnotePosRel)
{
  /**
   * The note being resized
   * @type Note
   */
  this.note = note;
  /**
   * The original size of the note
   * @type Point
   */
  this.size = note.getSize();
  /**
   * The original position of the note
   * @type Point
   */
  this.pos = note.getPosition();
  /**
   * The edges being moved.
   * @type dictionary
   */
  this.edges = pnotePosRel;
}
/**
 * Update the size of the note when the user moves the mouse.
 * @param {Mouse} md a reference to the parent Mouse object
 */
SelectedObjectResize.prototype.update = function(md)
{
  var elt = get(this.note.id);

  // this depends on which edge they grabbed
  var minSize = 10;
  var offset = md.curPos.sub(md.downPos);
  if (this.edges['top'])
  {
    if (this.size.y - offset.y > minSize)
    {
      elt.style.top = (this.pos.y + offset.y) + 'px';
      elt.style.height = (this.size.y - offset.y) + 'px';
    }
  }
  else if (this.edges['bottom'])
    elt.style.height = Math.max(this.size.y + offset.y, minSize) + 'px';
  
  if (this.edges['left'])
  {
    if (this.size.x - offset.x > minSize)
    {
      elt.style.left = (this.pos.x + offset.x) + 'px';
      elt.style.width = (this.size.x - offset.x) + 'px';
    }
  }
  else if (this.edges['right'])
    elt.style.width = Math.max(this.size.x + offset.x, minSize) + 'px';
  
  if (this.note.parent.edit == this.note)
  {
    var edit = get(this.note.id + 'text');
    var pSize = this.note.getCorrectedSize();
    pSize.x -= 2*(noteBorder+notePadding+1);
    pSize.y -= 2*(noteBorder+notePadding+1) + 16;
    edit.style.height = pSize.y + 'px';
    edit.style.width = pSize.x + 'px';
  }
  
  this.note.updateSize();
  workspace.changed = true;
};
/**
 * Add information to the undo stack when the user stops resizing.
 */
SelectedObjectResize.prototype.deselect = function() 
{
  // add information to the undo stack if the item was resized
  var curSize = this.note.getSize();
  
  if (!this.size.equals(curSize))
  {
    var f = {
      title : 'resize note',
      usize : this.size,
      upos : this.pos,
      rsize : curSize,
      rpos : this.note.getPosition(),
      id : this.note.id,
      undo : function()
      {
        this.set(this.usize, this.upos);
      },
      redo : function()
      {
        this.set(this.rsize, this.rpos);
      },
      set : function(size, pos)
      {
        var elt = get(this.id);
        elt.style.top = pos.y + 'px';
        elt.style.left = pos.x + 'px';
        elt.style.height = size.y + 'px';
        elt.style.width = size.x + 'px';
        workspace.notes[this.id].updateSize();
      }
    };
    workspace.history.add(f);
  }
};


/**
 * @class A class that maintains the undo/redo stacks.
 */
var History =
{
  /**
   * The number of items to keep in the undo stack.
   * @type int
   */
  maxSize : 40,
  /**
   * @type Array
   */
  undoStack : new Array(), // each item in the array is an object
  /**
   * @type Array
   */
  redoStack : new Array(), // with methods called undo and redo
  
  /**
   * Add an event to the undo stack.  This clears the redo stack.
   * @param {function} funcPtr a closure that when called will
   * undo the last action
   */
  add : function(funcPtr) {
    this.redoStack = new Array();
    this.undoStack.push(funcPtr);
    if (this.undoStack.length > this.maxSize)
      this.undoStack.shift();
  },
  /**
   * Undo the last action and move an item from the undo stack to the 
   * redo stack.
   */
  undo : function() {
    if (this.undoStack.length > 0) {
      var f = this.undoStack.pop();
      this.redoStack.push(f);
      f.undo();
    }
  },
  /**
   * Redo the last undo action.  Moves the action back to the undo stack.
   */
  redo : function() {
    if (this.redoStack.length > 0)
    {
      var f = this.redoStack.pop();
      this.undoStack.push(f);
      f.redo();
    }
  }
};

// 
/**
 * @class A generator class that returns the position of the next new note.
 */
var NotePos = {
  /**
   * @type int
   */
  x : 170,
  /**
   * @type int
   */
  y : 40,
  /**
   * Compute the position of a new note given the size of the note.
   * @param {int} w the width of the new note
   * @param {int} h the height of the new note
   * @type Point
   */
  nextPos : function(w, h) {
    var ret = new Point(this.x, this.y);
    
    this.x += 20;
    this.y += 20;
    var s = getPageSize();
    if (this.x + w > s.x || this.y + h > s.y) {
      this.x = 40;
      this.y = 40;
    }
    ret.x += window.scrollX;
    ret.y += window.scrollY;
    return ret;
  }
};

/**
 * @class A class that represents the workspace.  This includes maintaining
 * information about the notes and undo/redo information.
 */
var workspace = {
  /**
   * A dictionary of all the notes.
   * @type dictionary
   */
  notes : {},
  /**
   * When creating new notes, we sometimes need to assign a random name to
   * it.  The first random note is note0, the second is note1, etc.
   * @type int
   */
  nextNoteNum : 0,
  /**
   * Number of notes on the workspace.  We keep this as a separate variable
   * since there's no way to determine the size of a dictionary.
   * @type int
   */
  numNotes : 20,
  /**
   * The last time that we loaded this workspace (used to check for update
   * collision).
   * @type int
   */
  loadedTime : 0,
  /**
   * Have we changed the workspace?
   * @type boolean
   */
  changed : false,
  /**
   * The note we are editing.
   * @type Note
   */
  edit : '',
  /**
   * The name of the workspace.
   * @type string
   */
  name : 'Untitled',
  
  /**
   * @type History
   */
  history : History,
  /**
   * @type NotePos
   */
  notePos : NotePos,
  /**
   * @type Mouse
   */
  mouse : Mouse,
  /**
   * Should keyboard shortcuts work?
   * @type boolean
   */
  shortcuts : true,

  /**
   * Create a new note. Any of the parameter values may be left blank
   * and default values will be used.
   * @param {dictionary} note a dictionary with any of the following keys:
   * note['id'] = the name of the note<br />
   * note['xPos'] = the x position of the note<br />
   * note['yPos'] = the y position of the note<br />
   * note['height'] = the height of the note<br />
   * note['width'] = the width of the note<br />
   * note['bgcolor'] = the background color of the note (hex)
   * note['zIndex'] = the stacking position of the note
   * note['text'] = the text value of the note
   */
  createNote : function(note)
  {
    if (!note)
      note = {};
    if (!('id' in note))
    {
      note.id = "note" + this.nextNoteNum;
      
      // a new note is being made, save information to the undo stack
      var self = this;
      var f = {
        title : 'create note',
        nnn : this.nextNoteNum,
        id : note.id,
        pos : new Point(this.notePos.x, this.notePos.y),
        undo : function()
        {
          self.notes[this.id].destroy(); // don't add to history
          self.nextNoteNum = this.nnn;
        },
        redo : function()
        {
          self.createNote({'id': this.id, 'xPos' : this.pos.x, 
              'yPos' : this.pos.y});
          self.nextNoteNum++;
        }
      };
      this.history.add(f);
      
      this.nextNoteNum++;
    }
    
    // don't create a layer if it already exists, just move it to the top
    if (get(note.id)) {
      this.reZOrder(note.id);
      return;
    }
    
    if (!('height' in note)) note.height = 150;
    if (!('width' in note)) note.width = 250;

    var pos;
    if (!('xPos' in note) || !('yPos' in note))
      pos = this.notePos.nextPos(note.width, note.height);
    if (!('xPos' in note)) note.xPos = pos.x;
    if (!('yPos' in note)) note.yPos = pos.y;

    if (!('bgcolor' in note)) note.bgcolor = '#ff8';
    
    if (!('text' in note)) note.text = '';

    // disable editing of a different note
    this.editOff();
    
    var newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'note');
    newDiv.setAttribute('id', note.id);
    newDiv.addEventListener('mouseover', function(ev) {
      workspace.notes[note.id].mouseOver(ev); }, true);
    newDiv.addEventListener('mouseout', function(ev) {
      workspace.notes[note.id].mouseOut(ev); }, true);
    newDiv.addEventListener('mousedown', function(ev) {
      workspace.notes[note.id].mouseDown(ev); }, false);
    newDiv.addEventListener('mouseup', function(ev) {
      workspace.notes[note.id].mouseUp(ev); }, true);
    newDiv.addEventListener('mousemove', function(ev) {
      workspace.notes[note.id].mouseMove(ev); }, true);
    newDiv.addEventListener('dblclick', function(ev) {
      workspace.notes[note.id].mouseDblClick(ev); }, false);
    newDiv.setAttribute('title', 'double click to edit');

    document.body.appendChild(newDiv);

    var elt = get(note.id);
    elt.style.backgroundColor = note.bgcolor;
    elt.style.width = note.width + 'px';
    elt.style.height = note.height + 'px';
    elt.style.left = note.xPos + 'px';
    elt.style.top = note.yPos + 'px';
    elt.style.padding = notePadding + 'px';
    elt.style.position = 'absolute';
    elt.style.border = noteBorder + 'px ' + noteBorderColor + ' solid';
    elt.style.MozBorderRadius = '4px';
    elt.style.textAlign = 'left';
    elt.style.overflow = 'hidden';
    elt.style.MozBoxSizing = 'content-box';
    

    if (!('zIndex' in note))
    {
      this.reZOrder();
      elt.style.zIndex = this.numNotes + 1;
    }
    else
      elt.style.zIndex = note.zIndex;
    this.numNotes++;
    var nNote = new Note(elt, this, note.text);
    this.notes[nNote.id] = nNote;
  },
  /**
   * Mouse up action on the workspace.
   */
  mouseUp : function()
  {
    if (this.mouse.selObj)
    {
      this.mouse.selObj.deselect();
      delete this.mouse.selObj;
    }
  },
  /**
   * If we are editing any note, stop editing.
   */
  editOff : function()
  {
    if (this.edit)
    {
      var textbox = get(this.edit.id + 'text');
      
      // check to see if the text changed.  add to the
      // undo stack if it did.
      if (textbox.value != this.edit.text) {
        var f = {
          title : 'edit note',
          utext : this.edit.text,
          rtext : textbox.value,
          note : this.edit,
          undo : function()
          {
            this.note.setText(this.utext);
          },
          redo : function()
          {
            this.note.setText(this.rtext);
          }
        };
        this.history.add(f);
      }
      
      this.edit.setText(textbox.value);
      this.edit = '';
    }
  },
  /**
   * Resort the notes and place topNoteID in front.
   * @param {string} topNoteID the name of the note to bring to the front.
   */
  reZOrder : function(topNoteID)
  {
    if (this.notes)
    {
      // it's not possible to sort an associative array
      // so we copy it into a regular array first
      var nArray = new Array();
      var i = 0;
      for (nid in this.notes)
      {
        nArray[i] = this.notes[nid];
        i++;
      }
      
      nArray.sort(cmpNotesZ);

      // set zIndex based on order
      var found = 0;
      for (i = 0; i < nArray.length; i++)
      {
        if (nArray[i].id == topNoteID)
        {
          found = 1;
          get(nArray[i].id).style.zIndex = this.numNotes;
        }
        else
          get(nArray[i].id).style.zIndex = i + 1 - found;
      }
    }
  },
  
  /**
   * Generate the xml representation of the workspace (used when saving).
   * @type string
   */
  toString : function()
  {
    var ret = "<workspace url='" + hex_md5(document.location.href) + "'";
    ret += " nextNoteNum='" + this.nextNoteNum + "'";
    ret += ">\n";
    for (nid in this.notes)
      ret += this.notes[nid].toXML() + "\n";
    return ret + "</workspace>"
  },
  /**
   * Get the next (or previous) note relative to the top note.
   * @param {int} diff The offset from the top note (positive mean
   * below and negative mean up from the bottom note).
   */
  selectNote : function(diff)
  {
    var max = -1;
    var maxNote;
    var noteArr = [];
    // determine which note is on top
    for (var n in this.notes)
    {
      var cur = parseInt(get(this.notes[n].id).style.zIndex);
      if (cur > max)
      {
        max = cur;
        maxNote = noteArr.length;
      }
      noteArr.push(this.notes[n]);
    }
    noteArr[ (maxNote+diff+noteArr.length) % noteArr.length ].select();
  },
  
  /**
   * Load the workspace.
   */
  load : function() {
    var xmlhttp = getxmlreqobj();
    xmlhttp.onreadystatechange = function(xmlhttp) {
      if (xmlhttp.responseText) {
        eval(xmlhttp.responseText);
      }
    }
    xmlhttp.open('GET', BASEURL + 'load.py?url='
                 + escape(hex_md5(document.location.href)),
                 true);
    xmlhttp.send('');
  },
  /**
   * Save the workspace.
   */
  save : function()
  {
    // there have to be changes to the workspace before saving is enabled
    // img in top left with animation
    var s = get('wngmsave');
    if (s.style.display == 'block')
      return;
    
    get('wngmstext').innerHTML = 'Saving notes ...';
    s.style.display = 'block';
    this.editOff();
    
    var xmlhttp = getxmlreqobj();
    var self = this;
    xmlhttp.onreadystatechange = function(xmlhttp) {
        var doc = document.createElement('div');
        doc.innerHTML = xmlhttp.responseText;
        db("response: " + xmlhttp.responseText);
        var success = false;
        try {
          success = doc && 'ok' == doc.getElementsByTagName('status')[0].getAttribute('value');
        } catch (e) {
        }
        if (success) {
          try {
            self.changed = false;
            self.loadedTime = doc.getElementsByTagName('status')[0].getAttribute('update');
            get('wngmstext').innerHTML = 'Success!';
          } catch(e) {
          }
        }
        else {
          alert(xmlhttp.responseText);
        }
      };
    
    xmlhttp.open('POST', BASEURL + 'save.py', true);
    xmlhttp.send('' + workspace);
  }
};

///
/// global methods
///

/**
 * Write a message to the debug textarea.
 * @param {string} msg the message to display
 */
function db(msg)
{
  if (debugOn)
    get('debug').value += '\n' + msg;
}

/**
 * Initialize the workspace.
 */
function init() {
  if (debugOn) {
    var d = document.createElement('div');
    d.id = 'db';
    d.innerHTML = "<form name='debugForm'>" +
        "<textarea style='position:absolute;right:10px;' id='debug' cols='50' rows='10'></textarea>" +
        "<input type='button' onclick='document.debugForm.debug.value=\"\";' value='clear' />" +
        "</form>";
    document.body.appendChild(d);
    get('debug').value = '';
  }
  
  // setup the saving layer
  var save = document.createElement('div');
  save.id = 'wngmsave';
  save.setAttribute('style', 'position:fixed;top:0;left:0;'
                             + 'background-color:#ccc;'
                             + 'border-right: 1px #000 dashed;'
                             + 'border-bottom: 1px #000 dashed;'
                             + 'padding: 2px;'
                             + 'display: none;');
  save.innerHTML = '<img src="data:image/gif;base64,'
      + "R0lGODlhEAAQAKEDAAAAAICAAMDAwP///yH/C05FVFNDQVBFMi4wAwEAAAAh/hVDcmVhdGVkIHdp"
      + "dGggVGhlIEdJTVAAIfkECQoAAwAsAAAAABAAEAAAAjecj2nA7b4CELTSCeK0tWneSR8oAOJgbmA6"
      + "rqcpPUzw0vZtZygtN3XsuPxkQh2MWDqheg+FE1EAACH5BAkKAAMALAAAAAAQABAAAAI5nI85wMcP"
      + "mQAuAIHzbAZYnXlU94GTVV2mmJrnuJRggJJW5NUxzfOsjWPocrhX5QYxAiMb2CLoVCgKACH5BAkK"
      + "AAMALAAAAAAQABAAAAI8nI85wA3nmJgCVBgspQ3rXWUeOAGiYX5bOpIsmnFNcC70TOcPnGdObfI1"
      + "SsCbg7izCSWhZDASQUQVVEMBACH5BAkKAAMALAAAAAAQABAAAAI5nI85wO1wmphUABvDrbPlzQHa"
      + "x3WjIYJVSpYsGmiPeC7xjccQLM81/TDtbD2GMFPcvGyzB2KoiBYAADs="
      + '" alt="saving" /> <span id="wngmstext">Saving ...</span>';
  document.body.appendChild(save);
  
  
  // absolute mouse positions; modified from:
  // http://www.web-wise-wizard.com/javascript-tutorials/javascript-mouse-event-handlers.html
  workspace.mouse.curPos = new Point();
  document.addEventListener('mousemove', function(e)
    {
      var x, y;
      x = e.pageX;
      y = e.pageY;
      workspace.mouse.update(x, y);
    }, true);

  document.addEventListener('keydown', function(ev)
    {
      // the keydown event only seems to be a document event so we
      // can't put the event on the div layer.  Instead, events
      // need to be passed to the note that is being hovered over.
      if (workspace.mouse.noteOver)
        workspace.mouse.noteOver.keyDown(ev);

      if (workspace.shortcuts && !workspace.edit)
      {
        var key = String.fromCharCode(ev.keyCode);
        if ('N' == key && (ev.altKey || 
            (navigator.oscpu.indexOf('OS X') > -1 && ev.ctrlKey))) {
          workspace.createNote();
        }
      }
    }, true);

  /**
   * If the user clicks on the background, turn of note editing.
   */
  document.body.addEventListener('mousedown', function(ev)
    {
      workspace.editOff();
    }, false);
  /**
   * @see workspace#mouseUp
   */
  document.body.addEventListener('mouseup', function(ev)
    {
      workspace.mouseUp();
    }, false);
  
  /**
   * Save before they user leaves.
   */
  window.addEventListener('beforeunload', function(ev) {
      if (workspace.changed) {
        workspace.save(true);
      }
    }, false);
  // load data
  workspace.load();
}

/**
 * Get the size of the browser.
 * @type Point
 */
function getPageSize() {
  return new Point(window.innerWidth, window.innerHeight);
}

/**
 * Get a reference to an html object given the id.
 * @param {string} id id of the object
 * @type {HtmlElement}
 */
function get(id) { return document.getElementById(id); }

init();
