//0:33 2006-4-29
var G_INCOMPAT = false;
function GScript(src) {
jsLoader(src);
}
function GBrowserIsCompatible() {if (G_INCOMPAT) return false;
if (!window.RegExp) return false;
var AGENTS = ["opera","msie","safari","firefox","netscape","mozilla"];
var agent = navigator.userAgent.toLowerCase();
for (var i = 0; i < AGENTS.length; i++) {var agentStr = AGENTS[i];
if (agent.indexOf(agentStr) != -1) {var versionExpr = new RegExp(agentStr + "[ \/]?([0-9]+(\.[0-9]+)?)");
var version = 0;
if (versionExpr.exec(agent) != null) {version = parseFloat(RegExp.$1);
}if (agentStr == "opera") return version >= 7;
if (agentStr == "safari") return version >= 125;
if (agentStr == "msie") return (version >= 5.5 &&agent.indexOf("powerpc") == -1);
if (agentStr == "netscape") return version > 7;
}}return document.getElementById;
}function GLoad() {if (!GValidateKey("f6c97a7f64063cfee7c2dc2157847204d4dbf093") && false) {G_INCOMPAT = true;
alert("The Google Maps API key used on this web site was registered for a different web site. You can generate a new key for this web site at http://www.google.com/apis/maps/.");
return;
}GLoadApi(["http://mt0.google.com/mt?n=404&v=ap.6&","http://mt1.google.com/mt?n=404&v=ap.6&","http://mt2.google.com/mt?n=404&v=ap.6&","http://mt3.google.com/mt?n=404&v=ap.6&"], ["http://kh0.google.com/kh?n=404&v=6&","http://kh1.google.com/kh?n=404&v=6&","http://kh2.google.com/kh?n=404&v=6&","http://kh3.google.com/kh?n=404&v=6&"], ["http://mt0.google.com/mt?n=404&v=apt.4&","http://mt1.google.com/mt?n=404&v=apt.4&","http://mt2.google.com/mt?n=404&v=apt.4&","http://mt3.google.com/mt?n=404&v=apt.4&"],"ABQIAAAAZvdNN8V3gCrgmwDSZ01DAhT2yXp_ZAY8_ufC3CFXhHIE1NvwkxSAry4ZqQqyeJjdTpyWByoFyQ2fpA");
}
function GUnload() {
if (window.GUnloadApi) {GUnloadApi();
}
}var _mFlags = {};
var _mHost = "http://maps.google.com";
var _mUri = "/maps";
var _mDomain = "google.com";
var _mStaticPath = "http://www.google.com/intl/en_ALL/mapfiles/";
var _mTermsUrl = "http://www.google.com/intl/en_ALL/help/terms_local.html";
var _mTerms = "Terms of Use";
var _mMapMode = "Map";
var _mMapModeShort = "Map";
var _mMapError = "We are sorry, but we don\'t have maps at this zoom level for this region.<p>Try zooming out for a broader look.</p>";
var _mSatelliteMode = "Satellite";
var _mSatelliteModeShort = "Sat";
var _mSatelliteError = "We are sorry, but we don\'t have imagery at this zoom level for this region.<p>Try zooming out for a broader look.</p>";
var _mHybridMode = "Hybrid";
var _mHybridModeShort = "Hyb";
var _mSatelliteToken = "fzwq2l9PRvHHSNrwpo9HgPQzv2XPrGtONb9yRA";
var _mZoomIn = "Zoom In";
var _mZoomOut = "Zoom Out";
var _mZoomSet = "Click to set zoom level";
var _mZoomDrag = "Drag to zoom";
var _mPanWest = "Go left";
var _mPanEast = "Go right";
var _mPanNorth = "Go up";
var _mPanSouth = "Go down";
var _mLastResult = "Return to the last result";
var _mMapCopy = "Map data &#169;2006 ";
var _mSatelliteCopy = "Imagery &#169;2006 ";
var _mGoogleCopy = "&#169;2006 Google";
var _mKilometers = "km";
var _mMiles = "mi";
var _mMeters = "m";
var _mFeet = "ft";
var _mPreferMetric = false;
var _mUsePrintLink = 'To see all the details that are visible on the screen,use the "Print" link next to the map.';
var _mPrintSorry = '';
var _mMapPrintUrl = 'http://www.google.com/mapprint';
var _mAutocompleteFrom = 'from';
var _mAutocompleteTo = 'to';
var _mAutocompleteNearRe = '^(?:(?:.*?)&#92;s+)(?:(?:in|near|around|close to):?&#92;s+)(.+)$';
var _mSvgEnabled = false;
var _mSvgForced = false;
function GLoadMapsScript() {
	if (GBrowserIsCompatible()) {
		GScript(AppPath + "/nscGoogleMapEngine.js");
	}
}
GLoadMapsScript();
