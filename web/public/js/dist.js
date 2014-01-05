(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('angular/lib/angular.min');

var app = angular.module('TRUE', [], function($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.run(function($rootScope) {
  window.onbeforeunload = function() {
    $rootScope.$broadcast('saveState');
  };
});

module.exports = app;

},{"angular/lib/angular.min":4}],2:[function(require,module,exports){
window.ExamplesCtrl = function($scope, $http) {
  $scope.examples = null;

  $http.get('/examples')
    .success(function(data) {
      $scope.examples = data;
    })
    .error(function(data, status) {
    });

  $scope.load = function(example) {
    $('#edit-script').val(example.script);
    $('#input').val(example.input);
    setTimeout(function() { $('#run').focus(); });
  };
}

},{}],3:[function(require,module,exports){
var app = require('./app');

app.filter('toString', function() {
  return function(input) {
    return input.toString();
  };
})

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.filter('empty', function() {
  return function(input) {
    return $.isEmptyObject(input);
  };
});

},{"./app":1}],4:[function(require,module,exports){
/*
 AngularJS v1.2.2
 (c) 2010-2012 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(Z,P,s){'use strict';function C(b){return function(){var a=arguments[0],c,a="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.2.2/"+(b?b+"/":"")+a;for(c=1;c<arguments.length;c++)a=a+(1==c?"?":"&")+"p"+(c-1)+"="+encodeURIComponent("function"==typeof arguments[c]?arguments[c].toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof arguments[c]?"undefined":"string"!=typeof arguments[c]?JSON.stringify(arguments[c]):arguments[c]);return Error(a)}}function ob(b){if(null==b||za(b))return!1;var a=
b.length;return 1===b.nodeType&&a?!0:B(b)||K(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function q(b,a,c){var d;if(b)if(L(b))for(d in b)"prototype"!=d&&("length"!=d&&"name"!=d&&b.hasOwnProperty(d))&&a.call(c,b[d],d);else if(b.forEach&&b.forEach!==q)b.forEach(a,c);else if(ob(b))for(d=0;d<b.length;d++)a.call(c,b[d],d);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d);return b}function Ob(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);return a.sort()}function Nc(b,a,c){for(var d=Ob(b),
e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function Pb(b){return function(a,c){b(c,a)}}function Xa(){for(var b=ka.length,a;b;){b--;a=ka[b].charCodeAt(0);if(57==a)return ka[b]="A",ka.join("");if(90==a)ka[b]="0";else return ka[b]=String.fromCharCode(a+1),ka.join("")}ka.unshift("0");return ka.join("")}function Qb(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function u(b){var a=b.$$hashKey;q(arguments,function(a){a!==b&&q(a,function(a,c){b[c]=a})});Qb(b,a);return b}function T(b){return parseInt(b,
10)}function Rb(b,a){return u(new (u(function(){},{prototype:b})),a)}function x(){}function Aa(b){return b}function da(b){return function(){return b}}function z(b){return"undefined"==typeof b}function F(b){return"undefined"!=typeof b}function X(b){return null!=b&&"object"==typeof b}function B(b){return"string"==typeof b}function pb(b){return"number"==typeof b}function Ja(b){return"[object Date]"==Ya.apply(b)}function K(b){return"[object Array]"==Ya.apply(b)}function L(b){return"function"==typeof b}
function Za(b){return"[object RegExp]"==Ya.apply(b)}function za(b){return b&&b.document&&b.location&&b.alert&&b.setInterval}function Oc(b){return b&&(b.nodeName||b.on&&b.find)}function Pc(b,a,c){var d=[];q(b,function(b,h,g){d.push(a.call(c,b,h,g))});return d}function $a(b,a){if(b.indexOf)return b.indexOf(a);for(var c=0;c<b.length;c++)if(a===b[c])return c;return-1}function Ka(b,a){var c=$a(b,a);0<=c&&b.splice(c,1);return a}function ga(b,a){if(za(b)||b&&b.$evalAsync&&b.$watch)throw La("cpws");if(a){if(b===
a)throw La("cpi");if(K(b))for(var c=a.length=0;c<b.length;c++)a.push(ga(b[c]));else{c=a.$$hashKey;q(a,function(b,c){delete a[c]});for(var d in b)a[d]=ga(b[d]);Qb(a,c)}}else(a=b)&&(K(b)?a=ga(b,[]):Ja(b)?a=new Date(b.getTime()):Za(b)?a=RegExp(b.source):X(b)&&(a=ga(b,{})));return a}function Qc(b,a){a=a||{};for(var c in b)b.hasOwnProperty(c)&&"$$"!==c.substr(0,2)&&(a[c]=b[c]);return a}function Ba(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&
"object"==c)if(K(b)){if(!K(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!Ba(b[d],a[d]))return!1;return!0}}else{if(Ja(b))return Ja(a)&&b.getTime()==a.getTime();if(Za(b)&&Za(a))return b.toString()==a.toString();if(b&&b.$evalAsync&&b.$watch||a&&a.$evalAsync&&a.$watch||za(b)||za(a)||K(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!L(b[d])){if(!Ba(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==s&&!L(a[d]))return!1;return!0}return!1}function Sb(){return P.securityPolicy&&
P.securityPolicy.isActive||P.querySelector&&!(!P.querySelector("[ng-csp]")&&!P.querySelector("[data-ng-csp]"))}function qb(b,a){var c=2<arguments.length?ta.call(arguments,2):[];return!L(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,c.concat(ta.call(arguments,0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Rc(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)?c=s:za(a)?c="$WINDOW":a&&P===a?c="$DOCUMENT":a&&(a.$evalAsync&&
a.$watch)&&(c="$SCOPE");return c}function oa(b,a){return"undefined"===typeof b?s:JSON.stringify(b,Rc,a?"  ":null)}function Tb(b){return B(b)?JSON.parse(b):b}function Ma(b){b&&0!==b.length?(b=v(""+b),b=!("f"==b||"0"==b||"false"==b||"no"==b||"n"==b||"[]"==b)):b=!1;return b}function ha(b){b=y(b).clone();try{b.html("")}catch(a){}var c=y("<div>").append(b).html();try{return 3===b[0].nodeType?v(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+v(b)})}catch(d){return v(c)}}function Ub(b){try{return decodeURIComponent(b)}catch(a){}}
function Vb(b){var a={},c,d;q((b||"").split("&"),function(b){b&&(c=b.split("="),d=Ub(c[0]),F(d)&&(b=F(c[1])?Ub(c[1]):!0,a[d]?K(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Wb(b){var a=[];q(b,function(b,d){K(b)?q(b,function(b){a.push(ua(d,!0)+(!0===b?"":"="+ua(b,!0)))}):a.push(ua(d,!0)+(!0===b?"":"="+ua(b,!0)))});return a.length?a.join("&"):""}function rb(b){return ua(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function ua(b,a){return encodeURIComponent(b).replace(/%40/gi,
"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,a?"%20":"+")}function Sc(b,a){function c(a){a&&d.push(a)}var d=[b],e,h,g=["ng:app","ng-app","x-ng-app","data-ng-app"],f=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;q(g,function(a){g[a]=!0;c(P.getElementById(a));a=a.replace(":","\\:");b.querySelectorAll&&(q(b.querySelectorAll("."+a),c),q(b.querySelectorAll("."+a+"\\:"),c),q(b.querySelectorAll("["+a+"]"),c))});q(d,function(a){if(!e){var b=f.exec(" "+a.className+" ");b?(e=a,h=
(b[2]||"").replace(/\s+/g,",")):q(a.attributes,function(b){!e&&g[b.name]&&(e=a,h=b.value)})}});e&&a(e,h?[h]:[])}function Xb(b,a){var c=function(){b=y(b);if(b.injector()){var c=b[0]===P?"document":ha(b);throw La("btstrpd",c);}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);a.unshift("ng");c=Yb(a);c.invoke(["$rootScope","$rootElement","$compile","$injector","$animate",function(a,b,c,d,e){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},d=/^NG_DEFER_BOOTSTRAP!/;
if(Z&&!d.test(Z.name))return c();Z.name=Z.name.replace(d,"");ab.resumeBootstrap=function(b){q(b,function(b){a.push(b)});c()}}function bb(b,a){a=a||"_";return b.replace(Tc,function(b,d){return(d?a:"")+b.toLowerCase()})}function sb(b,a,c){if(!b)throw La("areq",a||"?",c||"required");return b}function Na(b,a,c){c&&K(b)&&(b=b[b.length-1]);sb(L(b),a,"not a function, got "+(b&&"object"==typeof b?b.constructor.name||"Object":typeof b));return b}function va(b,a){if("hasOwnProperty"===b)throw La("badname",
a);}function tb(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,h=a.length,g=0;g<h;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&L(b)?qb(e,b):b}function ub(b){if(b.startNode===b.endNode)return y(b.startNode);var a=b.startNode,c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b.endNode);return y(c)}function Uc(b){var a=C("$injector"),c=C("ng");b=b.angular||(b.angular={});b.$$minErr=b.$$minErr||C;return b.module||(b.module=function(){var b={};return function(e,h,g){if("hasOwnProperty"===e)throw c("badname",
"module");h&&b.hasOwnProperty(e)&&(b[e]=null);return b[e]||(b[e]=function(){function b(a,d,e){return function(){c[e||"push"]([a,d,arguments]);return n}}if(!h)throw a("nomod",e);var c=[],d=[],l=b("$injector","invoke"),n={_invokeQueue:c,_runBlocks:d,requires:h,name:e,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:b("$provide","value"),constant:b("$provide","constant","unshift"),animation:b("$animateProvider","register"),filter:b("$filterProvider",
"register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:l,run:function(a){d.push(a);return this}};g&&l(g);return n}())}}())}function Oa(b){return b.replace(Vc,function(a,b,d,e){return e?d.toUpperCase():d}).replace(Wc,"Moz$1")}function vb(b,a,c,d){function e(b){var e=c&&b?[this.filter(b)]:[this],m=a,k,l,n,r,p,A;if(!d||null!=b)for(;e.length;)for(k=e.shift(),l=0,n=k.length;l<n;l++)for(r=y(k[l]),m?r.triggerHandler("$destroy"):m=!m,p=0,r=(A=r.children()).length;p<
r;p++)e.push(Ca(A[p]));return h.apply(this,arguments)}var h=Ca.fn[b],h=h.$original||h;e.$original=h;Ca.fn[b]=e}function M(b){if(b instanceof M)return b;if(!(this instanceof M)){if(B(b)&&"<"!=b.charAt(0))throw wb("nosel");return new M(b)}if(B(b)){var a=P.createElement("div");a.innerHTML="<div>&#160;</div>"+b;a.removeChild(a.firstChild);xb(this,a.childNodes);y(P.createDocumentFragment()).append(this)}else xb(this,b)}function yb(b){return b.cloneNode(!0)}function Pa(b){Zb(b);var a=0;for(b=b.childNodes||
[];a<b.length;a++)Pa(b[a])}function $b(b,a,c,d){if(F(d))throw wb("offargs");var e=la(b,"events");la(b,"handle")&&(z(a)?q(e,function(a,c){zb(b,c,a);delete e[c]}):q(a.split(" "),function(a){z(c)?(zb(b,a,e[a]),delete e[a]):Ka(e[a]||[],c)}))}function Zb(b,a){var c=b[cb],d=Qa[c];d&&(a?delete Qa[c].data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),$b(b)),delete Qa[c],b[cb]=s))}function la(b,a,c){var d=b[cb],d=Qa[d||-1];if(F(c))d||(b[cb]=d=++Xc,d=Qa[d]={}),d[a]=c;else return d&&d[a]}function ac(b,
a,c){var d=la(b,"data"),e=F(c),h=!e&&F(a),g=h&&!X(a);d||g||la(b,"data",d={});if(e)d[a]=c;else if(h){if(g)return d&&d[a];u(d,a)}else return d}function Ab(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Bb(b,a){a&&b.setAttribute&&q(a.split(" "),function(a){b.setAttribute("class",ba((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+ba(a)+" "," ")))})}function Cb(b,a){if(a&&b.setAttribute){var c=(" "+
(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");q(a.split(" "),function(a){a=ba(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",ba(c))}}function xb(b,a){if(a){a=a.nodeName||!F(a.length)||za(a)?[a]:a;for(var c=0;c<a.length;c++)b.push(a[c])}}function bc(b,a){return db(b,"$"+(a||"ngController")+"Controller")}function db(b,a,c){b=y(b);9==b[0].nodeType&&(b=b.find("html"));for(a=K(a)?a:[a];b.length;){for(var d=0,e=a.length;d<e;d++)if((c=b.data(a[d]))!==s)return c;b=b.parent()}}
function cc(b,a){var c=eb[a.toLowerCase()];return c&&dc[b.nodeName]&&c}function Yc(b,a){var c=function(c,e){c.preventDefault||(c.preventDefault=function(){c.returnValue=!1});c.stopPropagation||(c.stopPropagation=function(){c.cancelBubble=!0});c.target||(c.target=c.srcElement||P);if(z(c.defaultPrevented)){var h=c.preventDefault;c.preventDefault=function(){c.defaultPrevented=!0;h.call(c)};c.defaultPrevented=!1}c.isDefaultPrevented=function(){return c.defaultPrevented||!1===c.returnValue};q(a[e||c.type],
function(a){a.call(b,c)});8>=N?(c.preventDefault=null,c.stopPropagation=null,c.isDefaultPrevented=null):(delete c.preventDefault,delete c.stopPropagation,delete c.isDefaultPrevented)};c.elem=b;return c}function Da(b){var a=typeof b,c;"object"==a&&null!==b?"function"==typeof(c=b.$$hashKey)?c=b.$$hashKey():c===s&&(c=b.$$hashKey=Xa()):c=b;return a+":"+c}function Ra(b){q(b,this.put,this)}function ec(b){var a,c;"function"==typeof b?(a=b.$inject)||(a=[],b.length&&(c=b.toString().replace(Zc,""),c=c.match($c),
q(c[1].split(ad),function(b){b.replace(bd,function(b,c,d){a.push(d)})})),b.$inject=a):K(b)?(c=b.length-1,Na(b[c],"fn"),a=b.slice(0,c)):Na(b,"fn",!0);return a}function Yb(b){function a(a){return function(b,c){if(X(b))q(b,Pb(a));else return a(b,c)}}function c(a,b){va(a,"service");if(L(b)||K(b))b=n.instantiate(b);if(!b.$get)throw Sa("pget",a);return l[a+f]=b}function d(a,b){return c(a,{$get:b})}function e(a){var b=[],c,d,f,h;q(a,function(a){if(!k.get(a)){k.put(a,!0);try{if(B(a))for(c=Ta(a),b=b.concat(e(c.requires)).concat(c._runBlocks),
d=c._invokeQueue,f=0,h=d.length;f<h;f++){var g=d[f],m=n.get(g[0]);m[g[1]].apply(m,g[2])}else L(a)?b.push(n.invoke(a)):K(a)?b.push(n.invoke(a)):Na(a,"module")}catch(l){throw K(a)&&(a=a[a.length-1]),l.message&&(l.stack&&-1==l.stack.indexOf(l.message))&&(l=l.message+"\n"+l.stack),Sa("modulerr",a,l.stack||l.message||l);}}});return b}function h(a,b){function c(d){if(a.hasOwnProperty(d)){if(a[d]===g)throw Sa("cdep",m.join(" <- "));return a[d]}try{return m.unshift(d),a[d]=g,a[d]=b(d)}finally{m.shift()}}
function d(a,b,e){var f=[],h=ec(a),g,k,m;k=0;for(g=h.length;k<g;k++){m=h[k];if("string"!==typeof m)throw Sa("itkn",m);f.push(e&&e.hasOwnProperty(m)?e[m]:c(m))}a.$inject||(a=a[g]);switch(b?-1:f.length){case 0:return a();case 1:return a(f[0]);case 2:return a(f[0],f[1]);case 3:return a(f[0],f[1],f[2]);case 4:return a(f[0],f[1],f[2],f[3]);case 5:return a(f[0],f[1],f[2],f[3],f[4]);case 6:return a(f[0],f[1],f[2],f[3],f[4],f[5]);case 7:return a(f[0],f[1],f[2],f[3],f[4],f[5],f[6]);case 8:return a(f[0],f[1],
f[2],f[3],f[4],f[5],f[6],f[7]);case 9:return a(f[0],f[1],f[2],f[3],f[4],f[5],f[6],f[7],f[8]);case 10:return a(f[0],f[1],f[2],f[3],f[4],f[5],f[6],f[7],f[8],f[9]);default:return a.apply(b,f)}}return{invoke:d,instantiate:function(a,b){var c=function(){},e;c.prototype=(K(a)?a[a.length-1]:a).prototype;c=new c;e=d(a,c,b);return X(e)||L(e)?e:c},get:c,annotate:ec,has:function(b){return l.hasOwnProperty(b+f)||a.hasOwnProperty(b)}}}var g={},f="Provider",m=[],k=new Ra,l={$provide:{provider:a(c),factory:a(d),
service:a(function(a,b){return d(a,["$injector",function(a){return a.instantiate(b)}])}),value:a(function(a,b){return d(a,da(b))}),constant:a(function(a,b){va(a,"constant");l[a]=b;r[a]=b}),decorator:function(a,b){var c=n.get(a+f),d=c.$get;c.$get=function(){var a=p.invoke(d,c);return p.invoke(b,null,{$delegate:a})}}}},n=l.$injector=h(l,function(){throw Sa("unpr",m.join(" <- "));}),r={},p=r.$injector=h(r,function(a){a=n.get(a+f);return p.invoke(a.$get,a)});q(e(b),function(a){p.invoke(a||x)});return p}
function cd(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;q(a,function(a){b||"a"!==v(a.nodeName)||(b=a)});return b}function h(){var b=c.hash(),d;b?(d=g.getElementById(b))?d.scrollIntoView():(d=e(g.getElementsByName(b)))?d.scrollIntoView():"top"===b&&a.scrollTo(0,0):a.scrollTo(0,0)}var g=a.document;b&&d.$watch(function(){return c.hash()},function(){d.$evalAsync(h)});return h}]}function dd(b,a,c,d){function e(a){try{a.apply(null,
ta.call(arguments,1))}finally{if(A--,0===A)for(;J.length;)try{J.pop()()}catch(b){c.error(b)}}}function h(a,b){(function ia(){q(U,function(a){a()});w=b(ia,a)})()}function g(){t=null;D!=f.url()&&(D=f.url(),q(H,function(a){a(f.url())}))}var f=this,m=a[0],k=b.location,l=b.history,n=b.setTimeout,r=b.clearTimeout,p={};f.isMock=!1;var A=0,J=[];f.$$completeOutstandingRequest=e;f.$$incOutstandingRequestCount=function(){A++};f.notifyWhenNoOutstandingRequests=function(a){q(U,function(a){a()});0===A?a():J.push(a)};
var U=[],w;f.addPollFn=function(a){z(w)&&h(100,n);U.push(a);return a};var D=k.href,E=a.find("base"),t=null;f.url=function(a,c){k!==b.location&&(k=b.location);if(a){if(D!=a)return D=a,d.history?c?l.replaceState(null,"",a):(l.pushState(null,"",a),E.attr("href",E.attr("href"))):(t=a,c?k.replace(a):k.href=a),f}else return t||k.href.replace(/%27/g,"'")};var H=[],R=!1;f.onUrlChange=function(a){if(!R){if(d.history)y(b).on("popstate",g);if(d.hashchange)y(b).on("hashchange",g);else f.addPollFn(g);R=!0}H.push(a);
return a};f.baseHref=function(){var a=E.attr("href");return a?a.replace(/^https?\:\/\/[^\/]*/,""):""};var $={},S="",ca=f.baseHref();f.cookies=function(a,b){var d,e,f,h;if(a)b===s?m.cookie=escape(a)+"=;path="+ca+";expires=Thu, 01 Jan 1970 00:00:00 GMT":B(b)&&(d=(m.cookie=escape(a)+"="+escape(b)+";path="+ca).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(m.cookie!==S)for(S=m.cookie,d=S.split("; "),$={},f=0;f<d.length;f++)e=
d[f],h=e.indexOf("="),0<h&&(a=unescape(e.substring(0,h)),$[a]===s&&($[a]=unescape(e.substring(h+1))));return $}};f.defer=function(a,b){var c;A++;c=n(function(){delete p[c];e(a)},b||0);p[c]=!0;return c};f.defer.cancel=function(a){return p[a]?(delete p[a],r(a),e(x),!0):!1}}function ed(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new dd(b,d,a,c)}]}function fd(){this.$get=function(){function b(b,d){function e(a){a!=n&&(r?r==a&&(r=a.n):r=a,h(a.n,a.p),h(a,n),n=a,n.n=null)}
function h(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw C("$cacheFactory")("iid",b);var g=0,f=u({},d,{id:b}),m={},k=d&&d.capacity||Number.MAX_VALUE,l={},n=null,r=null;return a[b]={put:function(a,b){var c=l[a]||(l[a]={key:a});e(c);if(!z(b))return a in m||g++,m[a]=b,g>k&&this.remove(r.key),b},get:function(a){var b=l[a];if(b)return e(b),m[a]},remove:function(a){var b=l[a];b&&(b==n&&(n=b.p),b==r&&(r=b.n),h(b.n,b.p),delete l[a],delete m[a],g--)},removeAll:function(){m={};g=0;l={};n=r=null},destroy:function(){l=
f=m=null;delete a[b]},info:function(){return u({},f,{size:g})}}}var a={};b.info=function(){var b={};q(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function gd(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function gc(b){var a={},c="Directive",d=/^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,e=/(([\d\w\-_]+)(?:\:([^;]+))?;?)/,h=/^\s*(https?|ftp|mailto|tel|file):/,g=/^\s*(https?|ftp|file):|data:image\//,f=/^(on[a-z]+|formaction)$/;this.directive=function k(d,
e){va(d,"directive");B(d)?(sb(e,"directiveFactory"),a.hasOwnProperty(d)||(a[d]=[],b.factory(d+c,["$injector","$exceptionHandler",function(b,c){var e=[];q(a[d],function(a,f){try{var h=b.invoke(a);L(h)?h={compile:da(h)}:!h.compile&&h.link&&(h.compile=da(h.link));h.priority=h.priority||0;h.index=f;h.name=h.name||d;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"A";e.push(h)}catch(g){c(g)}});return e}])),a[d].push(e)):q(d,Pb(k));return this};this.aHrefSanitizationWhitelist=function(a){return F(a)?
(h=a,this):h};this.imgSrcSanitizationWhitelist=function(a){return F(a)?(g=a,this):g};this.$get=["$injector","$interpolate","$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope","$document","$sce","$animate",function(b,l,n,r,p,A,J,U,w,D,E){function t(a,b,c,d,e){a instanceof y||(a=y(a));q(a,function(b,c){3==b.nodeType&&b.nodeValue.match(/\S+/)&&(a[c]=y(b).wrap("<span></span>").parent()[0])});var f=R(a,b,a,c,d,e);return function(b,c,d){sb(b,"scope");var e=c?Ea.clone.call(a):
a;q(d,function(a,b){e.data("$"+b+"Controller",a)});d=0;for(var h=e.length;d<h;d++){var g=e[d];1!=g.nodeType&&9!=g.nodeType||e.eq(d).data("$scope",b)}H(e,"ng-scope");c&&c(e,b);f&&f(b,e,e);return e}}function H(a,b){try{a.addClass(b)}catch(c){}}function R(a,b,c,d,e,f){function h(a,c,d,e){var f,k,l,n,p,r,A,ea=[];p=0;for(r=c.length;p<r;p++)ea.push(c[p]);A=p=0;for(r=g.length;p<r;A++)k=ea[A],c=g[p++],f=g[p++],l=y(k),c?(c.scope?(n=a.$new(),l.data("$scope",n),H(l,"ng-scope")):n=a,(l=c.transclude)||!e&&b?c(f,
n,k,d,$(a,l||b)):c(f,n,k,s,e)):f&&f(a,k.childNodes,s,e)}for(var g=[],k,l,n,p=0;p<a.length;p++)l=new Db,k=S(a[p],[],l,0===p?d:s,e),k=(f=k.length?wa(k,a[p],l,b,c,null,[],[],f):null)&&f.terminal||!a[p].childNodes||!a[p].childNodes.length?null:R(a[p].childNodes,f?f.transclude:b),g.push(f),g.push(k),n=n||f||k,f=null;return n?h:null}function $(a,b){return function(c,d,e){var f=!1;c||(c=a.$new(),f=c.$$transcluded=!0);d=b(c,d,e);if(f)d.on("$destroy",qb(c,c.$destroy));return d}}function S(a,b,c,f,h){var g=
c.$attr,k;switch(a.nodeType){case 1:ia(b,ma(Fa(a).toLowerCase()),"E",f,h);var l,n,p;k=a.attributes;for(var r=0,A=k&&k.length;r<A;r++){var J=!1,t=!1;l=k[r];if(!N||8<=N||l.specified){n=l.name;p=ma(n);Eb.test(p)&&(n=bb(p.substr(6),"-"));var D=p.replace(/(Start|End)$/,"");p===D+"Start"&&(J=n,t=n.substr(0,n.length-5)+"end",n=n.substr(0,n.length-6));p=ma(n.toLowerCase());g[p]=n;c[p]=l=ba(N&&"href"==n?decodeURIComponent(a.getAttribute(n,2)):l.value);cc(a,p)&&(c[p]=!0);M(a,b,l,p);ia(b,p,"A",f,h,J,t)}}a=a.className;
if(B(a)&&""!==a)for(;k=e.exec(a);)p=ma(k[2]),ia(b,p,"C",f,h)&&(c[p]=ba(k[3])),a=a.substr(k.index+k[0].length);break;case 3:v(b,a.nodeValue);break;case 8:try{if(k=d.exec(a.nodeValue))p=ma(k[1]),ia(b,p,"M",f,h)&&(c[p]=ba(k[2]))}catch(H){}}b.sort(x);return b}function ca(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ja("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return y(d)}function Q(a,
b,c){return function(d,e,f,h,g){e=ca(e[0],b,c);return a(d,e,f,h,g)}}function wa(a,b,c,d,e,f,h,g,k){function p(a,b,c,d){if(a){c&&(a=Q(a,c,d));a.require=G.require;if(R===G||G.$$isolateScope)a=W(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=Q(b,c,d));b.require=G.require;if(R===G||G.$$isolateScope)b=W(b,{isolateScope:!0});g.push(b)}}function r(a,b,c){var d,e="data",f=!1;if(B(a)){for(;"^"==(d=a.charAt(0))||"?"==d;)a=a.substr(1),"^"==d&&(e="inheritedData"),f=f||"?"==d;d=null;c&&"data"===e&&(d=c[a]);d=d||b[e]("$"+
a+"Controller");if(!d&&!f)throw ja("ctreq",a,x);}else K(a)&&(d=[],q(a,function(a){d.push(r(a,b,c))}));return d}function D(a,d,e,f,k){function p(a,b){var c;2>arguments.length&&(b=a,a=s);ia&&(c=S);return k(a,b,c)}var t,ea,U,E,ca,I,S={},Q;t=b===e?c:Qc(c,new Db(y(e),c.$attr));ea=t.$$element;if(R){var V=/^\s*([@=&])(\??)\s*(\w*)\s*$/;f=y(e);I=d.$new(!0);$&&$===R.$$originalDirective?f.data("$isolateScope",I):f.data("$isolateScopeNoTemplate",I);H(f,"ng-isolate-scope");q(R.scope,function(a,b){var c=a.match(V)||
[],e=c[3]||b,f="?"==c[2],c=c[1],h,g,k;I.$$isolateBindings[b]=c+e;switch(c){case "@":t.$observe(e,function(a){I[b]=a});t.$$observers[e].$$scope=d;t[e]&&(I[b]=l(t[e])(d));break;case "=":if(f&&!t[e])break;g=A(t[e]);k=g.assign||function(){h=I[b]=g(d);throw ja("nonassign",t[e],R.name);};h=I[b]=g(d);I.$watch(function(){var a=g(d);a!==I[b]&&(a!==h?h=I[b]=a:k(d,a=h=I[b]));return a});break;case "&":g=A(t[e]);I[b]=function(a){return g(d,a)};break;default:throw ja("iscp",R.name,b,a);}})}Q=k&&p;w&&q(w,function(a){var b=
{$scope:a===R||a.$$isolateScope?I:d,$element:ea,$attrs:t,$transclude:Q},c;ca=a.controller;"@"==ca&&(ca=t[a.name]);c=J(ca,b);S[a.name]=c;ia||ea.data("$"+a.name+"Controller",c);a.controllerAs&&(b.$scope[a.controllerAs]=c)});f=0;for(U=h.length;f<U;f++)try{E=h[f],E(E.isolateScope?I:d,ea,t,E.require&&r(E.require,ea,S),Q)}catch(hd){n(hd,ha(ea))}f=d;R&&(R.template||null===R.templateUrl)&&(f=I);a&&a(f,e.childNodes,s,k);for(f=g.length-1;0<=f;f--)try{E=g[f],E(E.isolateScope?I:d,ea,t,E.require&&r(E.require,
ea,S),Q)}catch(wa){n(wa,ha(ea))}}k=k||{};var U=-Number.MAX_VALUE,E,w=k.controllerDirectives,R=k.newIsolateScopeDirective,$=k.templateDirective;k=k.nonTlbTranscludeDirective;for(var wa=!1,ia=!1,Y=c.$$element=y(b),G,x,O,v=d,u,C=0,M=a.length;C<M;C++){G=a[C];var N=G.$$start,fb=G.$$end;N&&(Y=ca(b,N,fb));O=s;if(U>G.priority)break;if(O=G.scope)E=E||G,G.templateUrl||(z("new/isolated scope",R,G,Y),X(O)&&(R=G));x=G.name;!G.templateUrl&&G.controller&&(O=G.controller,w=w||{},z("'"+x+"' controller",w[x],G,Y),
w[x]=G);if(O=G.transclude)wa=!0,G.$$tlb||(z("transclusion",k,G,Y),k=G),"element"==O?(ia=!0,U=G.priority,O=ca(b,N,fb),Y=c.$$element=y(P.createComment(" "+x+": "+c[x]+" ")),b=Y[0],T(e,y(ta.call(O,0)),b),v=t(O,d,U,f&&f.name,{nonTlbTranscludeDirective:k})):(O=y(yb(b)).contents(),Y.html(""),v=t(O,d));if(G.template)if(z("template",$,G,Y),$=G,O=L(G.template)?G.template(Y,c):G.template,O=hc(O),G.replace){f=G;O=y("<div>"+ba(O)+"</div>").contents();b=O[0];if(1!=O.length||1!==b.nodeType)throw ja("tplrt",x,"");
T(e,Y,b);M={$attr:{}};O=S(b,[],M);var Eb=a.splice(C+1,a.length-(C+1));R&&V(O);a=a.concat(O).concat(Eb);fc(c,M);M=a.length}else Y.html(O);if(G.templateUrl)z("template",$,G,Y),$=G,G.replace&&(f=G),D=F(a.splice(C,a.length-C),Y,c,e,v,h,g,{controllerDirectives:w,newIsolateScopeDirective:R,templateDirective:$,nonTlbTranscludeDirective:k}),M=a.length;else if(G.compile)try{u=G.compile(Y,c,v),L(u)?p(null,u,N,fb):u&&p(u.pre,u.post,N,fb)}catch(Z){n(Z,ha(Y))}G.terminal&&(D.terminal=!0,U=Math.max(U,G.priority))}D.scope=
E&&!0===E.scope;D.transclude=wa&&v;return D}function V(a){for(var b=0,c=a.length;b<c;b++)a[b]=Rb(a[b],{$$isolateScope:!0})}function ia(d,e,f,h,g,l,p){if(e===g)return null;g=null;if(a.hasOwnProperty(e)){var r;e=b.get(e+c);for(var A=0,t=e.length;A<t;A++)try{r=e[A],(h===s||h>r.priority)&&-1!=r.restrict.indexOf(f)&&(l&&(r=Rb(r,{$$start:l,$$end:p})),d.push(r),g=r)}catch(J){n(J)}}return g}function fc(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;q(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&(d+=("style"===e?
";":" ")+b[e]),a.$set(e,d,!0,c[e]))});q(b,function(b,f){"class"==f?(H(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function F(a,b,c,d,e,f,h,g){var k=[],l,n,A=b[0],t=a.shift(),J=u({},t,{templateUrl:null,transclude:null,replace:null,$$originalDirective:t}),H=L(t.templateUrl)?t.templateUrl(b,c):t.templateUrl;b.html("");r.get(D.getTrustedResourceUrl(H),
{cache:p}).success(function(p){var r,D;p=hc(p);if(t.replace){p=y("<div>"+ba(p)+"</div>").contents();r=p[0];if(1!=p.length||1!==r.nodeType)throw ja("tplrt",t.name,H);p={$attr:{}};T(d,b,r);var E=S(r,[],p);X(t.scope)&&V(E);a=E.concat(a);fc(c,p)}else r=A,b.html(p);a.unshift(J);l=wa(a,r,c,e,b,t,f,h,g);q(d,function(a,c){a==r&&(d[c]=b[0])});for(n=R(b[0].childNodes,e);k.length;){p=k.shift();D=k.shift();var U=k.shift(),ca=k.shift(),E=b[0];D!==A&&(E=yb(r),T(U,y(D),E));D=l.transclude?$(p,l.transclude):ca;l(n,
p,E,d,D)}k=null}).error(function(a,b,c,d){throw ja("tpload",d.url);});return function(a,b,c,d,e){k?(k.push(b),k.push(c),k.push(d),k.push(e)):l(n,b,c,d,e)}}function x(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function z(a,b,c,d){if(b)throw ja("multidir",b.name,c.name,a,ha(d));}function v(a,b){var c=l(b,!0);c&&a.push({priority:0,compile:da(function(a,b){var d=b.parent(),e=d.data("$binding")||[];e.push(c);H(d.data("$binding",e),"ng-binding");a.$watch(c,
function(a){b[0].nodeValue=a})})})}function C(a,b){if("srcdoc"==b)return D.HTML;var c=Fa(a);if("xlinkHref"==b||"FORM"==c&&"action"==b||"IMG"!=c&&("src"==b||"ngSrc"==b))return D.RESOURCE_URL}function M(a,b,c,d){var e=l(c,!0);if(e){if("multiple"===d&&"SELECT"===Fa(a))throw ja("selmulti",ha(a));b.push({priority:100,compile:function(){return{pre:function(b,c,h){c=h.$$observers||(h.$$observers={});if(f.test(d))throw ja("nodomevents");if(e=l(h[d],!0,C(a,d)))h[d]=e(b),(c[d]||(c[d]=[])).$$inter=!0,(h.$$observers&&
h.$$observers[d].$$scope||b).$watch(e,function(a,b){"class"===d&&a!=b?h.$updateClass(a,b):h.$set(d,a)})}}}})}}function T(a,b,c){var d=b[0],e=b.length,f=d.parentNode,h,g;if(a)for(h=0,g=a.length;h<g;h++)if(a[h]==d){a[h++]=c;g=h+e-1;for(var k=a.length;h<k;h++,g++)g<k?a[h]=a[g]:delete a[h];a.length-=e-1;break}f&&f.replaceChild(c,d);a=P.createDocumentFragment();a.appendChild(d);c[y.expando]=d[y.expando];d=1;for(e=b.length;d<e;d++)f=b[d],y(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function W(a,
b){return u(function(){return a.apply(null,arguments)},a,b)}var Db=function(a,b){this.$$element=a;this.$attr=b||{}};Db.prototype={$normalize:ma,$addClass:function(a){a&&0<a.length&&E.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&E.removeClass(this.$$element,a)},$updateClass:function(a,b){this.$removeClass(ic(b,a));this.$addClass(ic(a,b))},$set:function(a,b,c,d){var e=cc(this.$$element[0],a);e&&(this.$$element.prop(a,b),d=e);this[a]=b;d?this.$attr[a]=d:(d=this.$attr[a])||(this.$attr[a]=
d=bb(a,"-"));e=Fa(this.$$element);if("A"===e&&"href"===a||"IMG"===e&&"src"===a)if(!N||8<=N)e=xa(b).href,""!==e&&("href"===a&&!e.match(h)||"src"===a&&!e.match(g))&&(this[a]=b="unsafe:"+e);!1!==c&&(null===b||b===s?this.$$element.removeAttr(d):this.$$element.attr(d,b));(c=this.$$observers)&&q(c[a],function(a){try{a(b)}catch(c){n(c)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers={}),e=d[a]||(d[a]=[]);e.push(b);U.$evalAsync(function(){e.$$inter||b(c[a])});return b}};var O=l.startSymbol(),
Y=l.endSymbol(),hc="{{"==O||"}}"==Y?Aa:function(a){return a.replace(/\{\{/g,O).replace(/}}/g,Y)},Eb=/^ngAttr[A-Z]/;return t}]}function ma(b){return Oa(b.replace(id,""))}function ic(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),h=0;a:for(;h<d.length;h++){for(var g=d[h],f=0;f<e.length;f++)if(g==e[f])continue a;c+=(0<c.length?" ":"")+g}return c}function jd(){var b={},a=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,d){va(a,"controller");X(a)?u(b,a):b[a]=d};this.$get=["$injector","$window",function(c,
d){return function(e,h){var g,f,m;B(e)&&(g=e.match(a),f=g[1],m=g[3],e=b.hasOwnProperty(f)?b[f]:tb(h.$scope,f,!0)||tb(d,f,!0),Na(e,f,!0));g=c.instantiate(e,h);if(m){if(!h||"object"!=typeof h.$scope)throw C("$controller")("noscp",f||e.name,m);h.$scope[m]=g}return g}}]}function kd(){this.$get=["$window",function(b){return y(b.document)}]}function ld(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function jc(b){var a={},c,d,e;if(!b)return a;q(b.split("\n"),function(b){e=
b.indexOf(":");c=v(ba(b.substr(0,e)));d=ba(b.substr(e+1));c&&(a[c]=a[c]?a[c]+(", "+d):d)});return a}function kc(b){var a=X(b)?b:s;return function(c){a||(a=jc(b));return c?a[v(c)]||null:a}}function lc(b,a,c){if(L(c))return c(b,a);q(c,function(c){b=c(b,a)});return b}function md(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d={"Content-Type":"application/json;charset=utf-8"},e=this.defaults={transformResponse:[function(d){B(d)&&(d=d.replace(c,""),b.test(d)&&a.test(d)&&(d=Tb(d)));return d}],
transformRequest:[function(a){return X(a)&&"[object File]"!==Ya.apply(a)?oa(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:d,put:d,patch:d},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},h=this.interceptors=[],g=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,d,n,r){function p(a){function c(a){var b=u({},a,{data:lc(a.data,a.headers,d.transformResponse)});return 200<=a.status&&300>a.status?
b:n.reject(b)}var d={transformRequest:e.transformRequest,transformResponse:e.transformResponse},f=function(a){function b(a){var c;q(a,function(b,d){L(b)&&(c=b(),null!=c?a[d]=c:delete a[d])})}var c=e.headers,d=u({},a.headers),f,h,c=u({},c.common,c[v(a.method)]);b(c);b(d);a:for(f in c){a=v(f);for(h in d)if(v(h)===a)continue a;d[f]=c[f]}return d}(a);u(d,a);d.headers=f;d.method=Ga(d.method);(a=Fb(d.url)?b.cookies()[d.xsrfCookieName||e.xsrfCookieName]:s)&&(f[d.xsrfHeaderName||e.xsrfHeaderName]=a);var h=
[function(a){f=a.headers;var b=lc(a.data,kc(f),a.transformRequest);z(a.data)&&q(f,function(a,b){"content-type"===v(b)&&delete f[b]});z(a.withCredentials)&&!z(e.withCredentials)&&(a.withCredentials=e.withCredentials);return A(a,b,f).then(c,c)},s],g=n.when(d);for(q(w,function(a){(a.request||a.requestError)&&h.unshift(a.request,a.requestError);(a.response||a.responseError)&&h.push(a.response,a.responseError)});h.length;){a=h.shift();var k=h.shift(),g=g.then(a,k)}g.success=function(a){g.then(function(b){a(b.data,
b.status,b.headers,d)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,d)});return g};return g}function A(b,c,h){function g(a,b,c){q&&(200<=a&&300>a?q.put(s,[a,b,jc(c)]):q.remove(s));k(b,a,c);d.$$phase||d.$apply()}function k(a,c,d){c=Math.max(c,0);(200<=c&&300>c?r.resolve:r.reject)({data:a,status:c,headers:kc(d),config:b})}function m(){var a=$a(p.pendingRequests,b);-1!==a&&p.pendingRequests.splice(a,1)}var r=n.defer(),A=r.promise,q,w,s=J(b.url,b.params);p.pendingRequests.push(b);
A.then(m,m);(b.cache||e.cache)&&(!1!==b.cache&&"GET"==b.method)&&(q=X(b.cache)?b.cache:X(e.cache)?e.cache:U);if(q)if(w=q.get(s),F(w)){if(w.then)return w.then(m,m),w;K(w)?k(w[1],w[0],ga(w[2])):k(w,200,{})}else q.put(s,A);z(w)&&a(b.method,s,c,g,h,b.timeout,b.withCredentials,b.responseType);return A}function J(a,b){if(!b)return a;var c=[];Nc(b,function(a,b){null===a||z(a)||(K(a)||(a=[a]),q(a,function(a){X(a)&&(a=oa(a));c.push(ua(b)+"="+ua(a))}))});return a+(-1==a.indexOf("?")?"?":"&")+c.join("&")}var U=
c("$http"),w=[];q(h,function(a){w.unshift(B(a)?r.get(a):r.invoke(a))});q(g,function(a,b){var c=B(a)?r.get(a):r.invoke(a);w.splice(b,0,{response:function(a){return c(n.when(a))},responseError:function(a){return c(n.reject(a))}})});p.pendingRequests=[];(function(a){q(arguments,function(a){p[a]=function(b,c){return p(u(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){q(arguments,function(a){p[a]=function(b,c,d){return p(u(d||{},{method:a,url:b,data:c}))}})})("post","put");p.defaults=
e;return p}]}function nd(){this.$get=["$browser","$window","$document",function(b,a,c){return od(b,pd,b.defer,a.angular.callbacks,c[0],a.location.protocol.replace(":",""))}]}function od(b,a,c,d,e,h){function g(a,b){var c=e.createElement("script"),d=function(){c.onreadystatechange=c.onload=c.onerror=null;e.body.removeChild(c);b&&b()};c.type="text/javascript";c.src=a;N&&8>=N?c.onreadystatechange=function(){/loaded|complete/.test(c.readyState)&&d()}:c.onload=c.onerror=function(){d()};e.body.appendChild(c);
return d}var f=-1;return function(e,k,l,n,r,p,A,J){function U(){D=f;t&&t();H&&H.abort()}function w(a,d,e,f){var g=h||xa(k).protocol;s&&c.cancel(s);t=H=null;d="file"==g?e?200:404:d;a(1223==d?204:d,e,f);b.$$completeOutstandingRequest(x)}var D;b.$$incOutstandingRequestCount();k=k||b.url();if("jsonp"==v(e)){var E="_"+(d.counter++).toString(36);d[E]=function(a){d[E].data=a};var t=g(k.replace("JSON_CALLBACK","angular.callbacks."+E),function(){d[E].data?w(n,200,d[E].data):w(n,D||-2);delete d[E]})}else{var H=
new a;H.open(e,k,!0);q(r,function(a,b){F(a)&&H.setRequestHeader(b,a)});H.onreadystatechange=function(){if(4==H.readyState){var a=null,b=null;D!==f&&(a=H.getAllResponseHeaders(),b=H.responseType?H.response:H.responseText);w(n,D||H.status,b,a)}};A&&(H.withCredentials=!0);J&&(H.responseType=J);H.send(l||null)}if(0<p)var s=c(U,p);else p&&p.then&&p.then(U)}}function qd(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse",
"$exceptionHandler","$sce",function(c,d,e){function h(h,k,l){for(var n,r,p=0,A=[],J=h.length,q=!1,w=[];p<J;)-1!=(n=h.indexOf(b,p))&&-1!=(r=h.indexOf(a,n+g))?(p!=n&&A.push(h.substring(p,n)),A.push(p=c(q=h.substring(n+g,r))),p.exp=q,p=r+f,q=!0):(p!=J&&A.push(h.substring(p)),p=J);(J=A.length)||(A.push(""),J=1);if(l&&1<A.length)throw mc("noconcat",h);if(!k||q)return w.length=J,p=function(a){try{for(var b=0,c=J,f;b<c;b++)"function"==typeof(f=A[b])&&(f=f(a),f=l?e.getTrusted(l,f):e.valueOf(f),null===f||
z(f)?f="":"string"!=typeof f&&(f=oa(f))),w[b]=f;return w.join("")}catch(g){a=mc("interr",h,g.toString()),d(a)}},p.exp=h,p.parts=A,p}var g=b.length,f=a.length;h.startSymbol=function(){return b};h.endSymbol=function(){return a};return h}]}function rd(){this.$get=["$rootScope","$window","$q",function(b,a,c){function d(d,g,f,m){var k=a.setInterval,l=a.clearInterval,n=c.defer(),r=n.promise,p=0,A=F(m)&&!m;f=F(f)?f:0;r.then(null,null,d);r.$$intervalId=k(function(){n.notify(p++);0<f&&p>=f&&(n.resolve(p),
l(r.$$intervalId),delete e[r.$$intervalId]);A||b.$apply()},g);e[r.$$intervalId]=n;return r}var e={};d.cancel=function(a){return a&&a.$$intervalId in e?(e[a.$$intervalId].reject("canceled"),clearInterval(a.$$intervalId),delete e[a.$$intervalId],!0):!1};return d}]}function sd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",
posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",
mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function nc(b){b=b.split("/");for(var a=b.length;a--;)b[a]=rb(b[a]);return b.join("/")}function oc(b,a,c){b=xa(b,c);a.$$protocol=b.protocol;a.$$host=b.hostname;a.$$port=T(b.port)||td[b.protocol]||null}function pc(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=xa(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):b.pathname);a.$$search=
Vb(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function na(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ua(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Gb(b){return b.substr(0,Ua(b).lastIndexOf("/")+1)}function qc(b,a){this.$$html5=!0;a=a||"";var c=Gb(b);oc(b,this,b);this.$$parse=function(a){var e=na(c,a);if(!B(e))throw Hb("ipthprfx",a,c);pc(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=
function(){var a=Wb(this.$$search),b=this.$$hash?"#"+rb(this.$$hash):"";this.$$url=nc(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$rewrite=function(d){var e;if((e=na(b,d))!==s)return d=e,(e=na(a,e))!==s?c+(na("/",e)||e):b+d;if((e=na(c,d))!==s)return c+e;if(c==d+"/")return c}}function Ib(b,a){var c=Gb(b);oc(b,this,b);this.$$parse=function(d){var e=na(b,d)||na(c,d),e="#"==e.charAt(0)?na(a,e):this.$$html5?e:"";if(!B(e))throw Hb("ihshprfx",d,a);pc(e,this,b);this.$$compose()};
this.$$compose=function(){var c=Wb(this.$$search),e=this.$$hash?"#"+rb(this.$$hash):"";this.$$url=nc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$rewrite=function(a){if(Ua(b)==Ua(a))return a}}function rc(b,a){this.$$html5=!0;Ib.apply(this,arguments);var c=Gb(b);this.$$rewrite=function(d){var e;if(b==Ua(d))return d;if(e=na(c,d))return b+a+e;if(c===d+"/")return c}}function gb(b){return function(){return this[b]}}function sc(b,a){return function(c){if(z(c))return this[b];
this[b]=a(c);this.$$compose();return this}}function ud(){var b="",a=!1;this.hashPrefix=function(a){return F(a)?(b=a,this):b};this.html5Mode=function(b){return F(b)?(a=b,this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,h){function g(a){c.$broadcast("$locationChangeSuccess",f.absUrl(),a)}var f,m=d.baseHref(),k=d.url();a?(m=k.substring(0,k.indexOf("/",k.indexOf("//")+2))+(m||"/"),e=e.history?qc:rc):(m=Ua(k),e=Ib);f=new e(m,"#"+b);f.$$parse(f.$$rewrite(k));h.on("click",
function(a){if(!a.ctrlKey&&!a.metaKey&&2!=a.which){for(var b=y(a.target);"a"!==v(b[0].nodeName);)if(b[0]===h[0]||!(b=b.parent())[0])return;var e=b.prop("href"),g=f.$$rewrite(e);e&&(!b.attr("target")&&g&&!a.isDefaultPrevented())&&(a.preventDefault(),g!=d.url()&&(f.$$parse(g),c.$apply(),Z.angular["ff-684208-preventDefault"]=!0))}});f.absUrl()!=k&&d.url(f.absUrl(),!0);d.onUrlChange(function(a){f.absUrl()!=a&&(c.$broadcast("$locationChangeStart",a,f.absUrl()).defaultPrevented?d.url(f.absUrl()):(c.$evalAsync(function(){var b=
f.absUrl();f.$$parse(a);g(b)}),c.$$phase||c.$digest()))});var l=0;c.$watch(function(){var a=d.url(),b=f.$$replace;l&&a==f.absUrl()||(l++,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",f.absUrl(),a).defaultPrevented?f.$$parse(a):(d.url(f.absUrl(),b),g(a))}));f.$$replace=!1;return l});return f}]}function vd(){var b=!0,a=this;this.debugEnabled=function(a){return F(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?
"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||x;return e.apply?function(){var a=[];q(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function pa(b,a){if("constructor"===b)throw ya("isecfld",a);return b}
function Va(b,a){if(b&&b.constructor===b)throw ya("isecfn",a);if(b&&b.document&&b.location&&b.alert&&b.setInterval)throw ya("isecwindow",a);if(b&&(b.nodeName||b.on&&b.find))throw ya("isecdom",a);return b}function hb(b,a,c,d,e){e=e||{};a=a.split(".");for(var h,g=0;1<a.length;g++){h=pa(a.shift(),d);var f=b[h];f||(f={},b[h]=f);b=f;b.then&&e.unwrapPromises&&(qa(d),"$$v"in b||function(a){a.then(function(b){a.$$v=b})}(b),b.$$v===s&&(b.$$v={}),b=b.$$v)}h=pa(a.shift(),d);return b[h]=c}function tc(b,a,c,d,
e,h,g){pa(b,h);pa(a,h);pa(c,h);pa(d,h);pa(e,h);return g.unwrapPromises?function(f,g){var k=g&&g.hasOwnProperty(b)?g:f,l;if(null===k||k===s)return k;(k=k[b])&&k.then&&(qa(h),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!a||null===k||k===s)return k;(k=k[a])&&k.then&&(qa(h),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!c||null===k||k===s)return k;(k=k[c])&&k.then&&(qa(h),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!d||null===k||k===s)return k;
(k=k[d])&&k.then&&(qa(h),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!e||null===k||k===s)return k;(k=k[e])&&k.then&&(qa(h),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);return k}:function(f,h){var g=h&&h.hasOwnProperty(b)?h:f;if(null===g||g===s)return g;g=g[b];if(!a||null===g||g===s)return g;g=g[a];if(!c||null===g||g===s)return g;g=g[c];if(!d||null===g||g===s)return g;g=g[d];return e&&null!==g&&g!==s?g=g[e]:g}}function uc(b,a,c){if(Jb.hasOwnProperty(b))return Jb[b];
var d=b.split("."),e=d.length,h;if(a.csp)h=6>e?tc(d[0],d[1],d[2],d[3],d[4],c,a):function(b,f){var h=0,g;do g=tc(d[h++],d[h++],d[h++],d[h++],d[h++],c,a)(b,f),f=s,b=g;while(h<e);return g};else{var g="var l, fn, p;\n";q(d,function(b,d){pa(b,c);g+="if(s === null || s === undefined) return s;\nl=s;\ns="+(d?"s":'((k&&k.hasOwnProperty("'+b+'"))?k:s)')+'["'+b+'"];\n'+(a.unwrapPromises?'if (s && s.then) {\n pw("'+c.replace(/(["\r\n])/g,"\\$1")+'");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n':
"")});var g=g+"return s;",f=new Function("s","k","pw",g);f.toString=function(){return g};h=function(a,b){return f(a,b,qa)}}"hasOwnProperty"!==b&&(Jb[b]=h);return h}function wd(){var b={},a={csp:!1,unwrapPromises:!1,logPromiseWarnings:!0};this.unwrapPromises=function(b){return F(b)?(a.unwrapPromises=!!b,this):a.unwrapPromises};this.logPromiseWarnings=function(b){return F(b)?(a.logPromiseWarnings=b,this):a.logPromiseWarnings};this.$get=["$filter","$sniffer","$log",function(c,d,e){a.csp=d.csp;qa=function(b){a.logPromiseWarnings&&
!vc.hasOwnProperty(b)&&(vc[b]=!0,e.warn("[$parse] Promise found in the expression `"+b+"`. Automatic unwrapping of promises in Angular expressions is deprecated."))};return function(d){var e;switch(typeof d){case "string":if(b.hasOwnProperty(d))return b[d];e=new Kb(a);e=(new Wa(e,c,a)).parse(d,!1);"hasOwnProperty"!==d&&(b[d]=e);return e;case "function":return d;default:return x}}}]}function xd(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return yd(function(a){b.$evalAsync(a)},a)}]}
function yd(b,a){function c(a){return a}function d(a){return g(a)}var e=function(){var f=[],m,k;return k={resolve:function(a){if(f){var c=f;f=s;m=h(a);c.length&&b(function(){for(var a,b=0,d=c.length;b<d;b++)a=c[b],m.then(a[0],a[1],a[2])})}},reject:function(a){k.resolve(g(a))},notify:function(a){if(f){var c=f;f.length&&b(function(){for(var b,d=0,e=c.length;d<e;d++)b=c[d],b[2](a)})}},promise:{then:function(b,g,h){var k=e(),A=function(d){try{k.resolve((L(b)?b:c)(d))}catch(e){k.reject(e),a(e)}},J=function(b){try{k.resolve((L(g)?
g:d)(b))}catch(c){k.reject(c),a(c)}},q=function(b){try{k.notify((L(h)?h:c)(b))}catch(d){a(d)}};f?f.push([A,J,q]):m.then(A,J,q);return k.promise},"catch":function(a){return this.then(null,a)},"finally":function(a){function b(a,c){var d=e();c?d.resolve(a):d.reject(a);return d.promise}function d(e,f){var g=null;try{g=(a||c)()}catch(h){return b(h,!1)}return g&&L(g.then)?g.then(function(){return b(e,f)},function(a){return b(a,!1)}):b(e,f)}return this.then(function(a){return d(a,!0)},function(a){return d(a,
!1)})}}}},h=function(a){return a&&L(a.then)?a:{then:function(c){var d=e();b(function(){d.resolve(c(a))});return d.promise}}},g=function(c){return{then:function(g,h){var l=e();b(function(){try{l.resolve((L(h)?h:d)(c))}catch(b){l.reject(b),a(b)}});return l.promise}}};return{defer:e,reject:g,when:function(f,m,k,l){var n=e(),r,p=function(b){try{return(L(m)?m:c)(b)}catch(d){return a(d),g(d)}},A=function(b){try{return(L(k)?k:d)(b)}catch(c){return a(c),g(c)}},J=function(b){try{return(L(l)?l:c)(b)}catch(d){a(d)}};
b(function(){h(f).then(function(a){r||(r=!0,n.resolve(h(a).then(p,A,J)))},function(a){r||(r=!0,n.resolve(A(a)))},function(a){r||n.notify(J(a))})});return n.promise},all:function(a){var b=e(),c=0,d=K(a)?[]:{};q(a,function(a,e){c++;h(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise}}}function zd(){var b=10,a=C("$rootScope");this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=
["$injector","$exceptionHandler","$parse","$browser",function(c,d,e,h){function g(){this.$id=Xa();this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this["this"]=this.$root=this;this.$$destroyed=!1;this.$$asyncQueue=[];this.$$postDigestQueue=[];this.$$listeners={};this.$$isolateBindings={}}function f(b){if(l.$$phase)throw a("inprog",l.$$phase);l.$$phase=b}function m(a,b){var c=e(a);Na(c,b);return c}function k(){}g.prototype={constructor:g,
$new:function(a){a?(a=new g,a.$root=this.$root,a.$$asyncQueue=this.$$asyncQueue,a.$$postDigestQueue=this.$$postDigestQueue):(a=function(){},a.prototype=this,a=new a,a.$id=Xa());a["this"]=a;a.$$listeners={};a.$parent=this;a.$$watchers=a.$$nextSibling=a.$$childHead=a.$$childTail=null;a.$$prevSibling=this.$$childTail;this.$$childHead?this.$$childTail=this.$$childTail.$$nextSibling=a:this.$$childHead=this.$$childTail=a;return a},$watch:function(a,b,c){var d=m(a,"watch"),e=this.$$watchers,f={fn:b,last:k,
get:d,exp:a,eq:!!c};if(!L(b)){var g=m(b||x,"listener");f.fn=function(a,b,c){g(c)}}if("string"==typeof a&&d.constant){var h=f.fn;f.fn=function(a,b,c){h.call(this,a,b,c);Ka(e,f)}}e||(e=this.$$watchers=[]);e.unshift(f);return function(){Ka(e,f)}},$watchCollection:function(a,b){var c=this,d,f,g=0,h=e(a),k=[],l={},m=0;return this.$watch(function(){f=h(c);var a,b;if(X(f))if(ob(f))for(d!==k&&(d=k,m=d.length=0,g++),a=f.length,m!==a&&(g++,d.length=m=a),b=0;b<a;b++)d[b]!==f[b]&&(g++,d[b]=f[b]);else{d!==l&&
(d=l={},m=0,g++);a=0;for(b in f)f.hasOwnProperty(b)&&(a++,d.hasOwnProperty(b)?d[b]!==f[b]&&(g++,d[b]=f[b]):(m++,d[b]=f[b],g++));if(m>a)for(b in g++,d)d.hasOwnProperty(b)&&!f.hasOwnProperty(b)&&(m--,delete d[b])}else d!==f&&(d=f,g++);return g},function(){b(f,d,c)})},$digest:function(){var c,e,g,h,m=this.$$asyncQueue,q=this.$$postDigestQueue,s,D,E=b,t,H=[],y,x,S;f("$digest");do{D=!1;for(t=this;m.length;)try{S=m.shift(),S.scope.$eval(S.expression)}catch(F){d(F)}do{if(h=t.$$watchers)for(s=h.length;s--;)try{(c=
h[s])&&((e=c.get(t))!==(g=c.last)&&!(c.eq?Ba(e,g):"number"==typeof e&&"number"==typeof g&&isNaN(e)&&isNaN(g)))&&(D=!0,c.last=c.eq?ga(e):e,c.fn(e,g===k?e:g,t),5>E&&(y=4-E,H[y]||(H[y]=[]),x=L(c.exp)?"fn: "+(c.exp.name||c.exp.toString()):c.exp,x+="; newVal: "+oa(e)+"; oldVal: "+oa(g),H[y].push(x)))}catch(Q){d(Q)}if(!(h=t.$$childHead||t!==this&&t.$$nextSibling))for(;t!==this&&!(h=t.$$nextSibling);)t=t.$parent}while(t=h);if(D&&!E--)throw l.$$phase=null,a("infdig",b,oa(H));}while(D||m.length);for(l.$$phase=
null;q.length;)try{q.shift()()}catch(z){d(z)}},$destroy:function(){if(l!=this&&!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=
null}},$eval:function(a,b){return e(a)(this,b)},$evalAsync:function(a){l.$$phase||l.$$asyncQueue.length||h.defer(function(){l.$$asyncQueue.length&&l.$digest()});this.$$asyncQueue.push({scope:this,expression:a})},$$postDigest:function(a){this.$$postDigestQueue.push(a)},$apply:function(a){try{return f("$apply"),this.$eval(a)}catch(b){d(b)}finally{l.$$phase=null;try{l.$digest()}catch(c){throw d(c),c;}}},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);return function(){c[$a(c,
b)]=null}},$emit:function(a,b){var c=[],e,f=this,g=!1,h={name:a,targetScope:f,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=[h].concat(ta.call(arguments,1)),l,m;do{e=f.$$listeners[a]||c;h.currentScope=f;l=0;for(m=e.length;l<m;l++)if(e[l])try{e[l].apply(null,k)}catch(q){d(q)}else e.splice(l,1),l--,m--;if(g)break;f=f.$parent}while(f);return h},$broadcast:function(a,b){var c=this,e=this,f={name:a,targetScope:this,preventDefault:function(){f.defaultPrevented=
!0},defaultPrevented:!1},g=[f].concat(ta.call(arguments,1)),h,k;do{c=e;f.currentScope=c;e=c.$$listeners[a]||[];h=0;for(k=e.length;h<k;h++)if(e[h])try{e[h].apply(null,g)}catch(l){d(l)}else e.splice(h,1),h--,k--;if(!(e=c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(e=c.$$nextSibling);)c=c.$parent}while(c=e);return f}};var l=new g;return l}]}function Ad(b){if("self"===b)return b;if(B(b)){if(-1<b.indexOf("***"))throw ra("iwcard",b);b=b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,
"\\x08").replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return RegExp("^"+b+"$")}if(Za(b))return RegExp("^"+b.source+"$");throw ra("imatcher");}function wc(b){var a=[];F(b)&&q(b,function(b){a.push(Ad(b))});return a}function Bd(){this.SCE_CONTEXTS=fa;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=wc(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=wc(b));return a};this.$get=["$injector",function(c){function d(a){var b=function(a){this.$$unwrapTrustedValue=
function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var e=function(a){throw ra("unsafe");};c.has("$sanitize")&&(e=c.get("$sanitize"));var h=d(),g={};g[fa.HTML]=d(h);g[fa.CSS]=d(h);g[fa.URL]=d(h);g[fa.JS]=d(h);g[fa.RESOURCE_URL]=d(g[fa.URL]);return{trustAs:function(a,b){var c=g.hasOwnProperty(a)?g[a]:null;if(!c)throw ra("icontext",a,b);if(null===b||b===
s||""===b)return b;if("string"!==typeof b)throw ra("itype",a);return new c(b)},getTrusted:function(c,d){if(null===d||d===s||""===d)return d;var h=g.hasOwnProperty(c)?g[c]:null;if(h&&d instanceof h)return d.$$unwrapTrustedValue();if(c===fa.RESOURCE_URL){var h=xa(d.toString()),l,n,r=!1;l=0;for(n=b.length;l<n;l++)if("self"===b[l]?Fb(h):b[l].exec(h.href)){r=!0;break}if(r)for(l=0,n=a.length;l<n;l++)if("self"===a[l]?Fb(h):a[l].exec(h.href)){r=!1;break}if(r)return d;throw ra("insecurl",d.toString());}if(c===
fa.HTML)return e(d);throw ra("unsafe");},valueOf:function(a){return a instanceof h?a.$$unwrapTrustedValue():a}}}]}function Cd(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sniffer","$sceDelegate",function(a,c,d){if(b&&c.msie&&8>c.msieDocumentMode)throw ra("iequirks");var e=ga(fa);e.isEnabled=function(){return b};e.trustAs=d.trustAs;e.getTrusted=d.getTrusted;e.valueOf=d.valueOf;b||(e.trustAs=e.getTrusted=function(a,b){return b},e.valueOf=Aa);e.parseAs=
function(b,c){var d=a(c);return d.literal&&d.constant?d:function(a,c){return e.getTrusted(b,d(a,c))}};var h=e.parseAs,g=e.getTrusted,f=e.trustAs;q(fa,function(a,b){var c=v(b);e[Oa("parse_as_"+c)]=function(b){return h(a,b)};e[Oa("get_trusted_"+c)]=function(b){return g(a,b)};e[Oa("trust_as_"+c)]=function(b){return f(a,b)}});return e}]}function Dd(){this.$get=["$window","$document",function(b,a){var c={},d=T((/android (\d+)/.exec(v((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||
{}).userAgent),h=a[0]||{},g=h.documentMode,f,m=/^(Moz|webkit|O|ms)(?=[A-Z])/,k=h.body&&h.body.style,l=!1,n=!1;if(k){for(var r in k)if(l=m.exec(r)){f=l[0];f=f.substr(0,1).toUpperCase()+f.substr(1);break}f||(f="WebkitOpacity"in k&&"webkit");l=!!("transition"in k||f+"Transition"in k);n=!!("animation"in k||f+"Animation"in k);!d||l&&n||(l=B(h.body.style.webkitTransition),n=B(h.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hashchange:"onhashchange"in b&&(!g||7<
g),hasEvent:function(a){if("input"==a&&9==N)return!1;if(z(c[a])){var b=h.createElement("div");c[a]="on"+a in b}return c[a]},csp:Sb(),vendorPrefix:f,transitions:l,animations:n,msie:N,msieDocumentMode:g}}]}function Ed(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(b,a,c,d){function e(e,f,m){var k=c.defer(),l=k.promise,n=F(m)&&!m;f=a.defer(function(){try{k.resolve(e())}catch(a){k.reject(a),d(a)}finally{delete h[l.$$timeoutId]}n||b.$apply()},f);l.$$timeoutId=f;h[f]=k;return l}
var h={};e.cancel=function(b){return b&&b.$$timeoutId in h?(h[b.$$timeoutId].reject("canceled"),delete h[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return e}]}function xa(b,a){var c=b;N&&(aa.setAttribute("href",c),c=aa.href);aa.setAttribute("href",c);var c=aa.pathname,d=b;0===d.indexOf(a)&&(d=d.replace(a,""));xc.exec(d)||(c=(d=xc.exec(c))?d[1]:c);c="/"===c.charAt(0)?c:"/"+c;return{href:aa.href,protocol:aa.protocol?aa.protocol.replace(/:$/,""):"",host:aa.host,search:aa.search?aa.search.replace(/^\?/,
""):"",hash:aa.hash?aa.hash.replace(/^#/,""):"",hostname:aa.hostname,port:aa.port,pathname:c}}function Fb(b){b=B(b)?xa(b):b;return b.protocol===yc.protocol&&b.host===yc.host}function Fd(){this.$get=da(Z)}function zc(b){function a(d,e){if(X(d)){var h={};q(d,function(b,c){h[c]=a(c,b)});return h}return b.factory(d+c,e)}var c="Filter";this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}];a("currency",Ac);a("date",Bc);a("filter",Gd);a("json",Hd);a("limitTo",Id);a("lowercase",
Jd);a("number",Cc);a("orderBy",Dc);a("uppercase",Kd)}function Gd(){return function(b,a,c){if(!K(b))return b;var d=typeof c,e=[];e.check=function(a){for(var b=0;b<e.length;b++)if(!e[b](a))return!1;return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return ab.equals(a,b)}:function(a,b){b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var h=function(a,b){if("string"==typeof b&&"!"===b.charAt(0))return!h(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,
b);case "object":switch(typeof b){case "object":return c(a,b);default:for(var d in a)if("$"!==d.charAt(0)&&h(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(h(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var g in a)"$"==g?function(){if(a[g]){var b=g;e.push(function(c){return h(c,a[b])})}}():function(){if("undefined"!=typeof a[g]){var b=g;e.push(function(c){return h(tb(c,b),a[b])})}}();break;case "function":e.push(a);
break;default:return b}for(var d=[],f=0;f<b.length;f++){var m=b[f];e.check(m)&&d.push(m)}return d}}function Ac(b){var a=b.NUMBER_FORMATS;return function(b,d){z(d)&&(d=a.CURRENCY_SYM);return Ec(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,2).replace(/\u00A4/g,d)}}function Cc(b){var a=b.NUMBER_FORMATS;return function(b,d){return Ec(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Ec(b,a,c,d,e){if(isNaN(b)||!isFinite(b))return"";var h=0>b;b=Math.abs(b);var g=b+"",f="",m=[],k=!1;if(-1!==g.indexOf("e")){var l=
g.match(/([\d\.]+)e(-?)(\d+)/);l&&"-"==l[2]&&l[3]>e+1?g="0":(f=g,k=!0)}if(k)0<e&&(-1<b&&1>b)&&(f=b.toFixed(e));else{g=(g.split(Fc)[1]||"").length;z(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));g=Math.pow(10,e);b=Math.round(b*g)/g;b=(""+b).split(Fc);g=b[0];b=b[1]||"";var l=0,n=a.lgSize,r=a.gSize;if(g.length>=n+r)for(l=g.length-n,k=0;k<l;k++)0===(l-k)%r&&0!==k&&(f+=c),f+=g.charAt(k);for(k=l;k<g.length;k++)0===(g.length-k)%n&&0!==k&&(f+=c),f+=g.charAt(k);for(;b.length<e;)b+="0";e&&"0"!==e&&(f+=
d+b.substr(0,e))}m.push(h?a.negPre:a.posPre);m.push(f);m.push(h?a.negSuf:a.posSuf);return m.join("")}function Lb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function W(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Lb(e,a,d)}}function ib(b,a){return function(c,d){var e=c["get"+b](),h=Ga(a?"SHORT"+b:b);return d[h][e]}}function Bc(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var h=
0,g=0,f=b[8]?a.setUTCFullYear:a.setFullYear,m=b[8]?a.setUTCHours:a.setHours;b[9]&&(h=T(b[9]+b[10]),g=T(b[9]+b[11]));f.call(a,T(b[1]),T(b[2])-1,T(b[3]));h=T(b[4]||0)-h;g=T(b[5]||0)-g;f=T(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));m.call(a,h,g,f,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e){var h="",g=[],f,m;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;B(c)&&(c=Ld.test(c)?T(c):a(c));pb(c)&&(c=
new Date(c));if(!Ja(c))return c;for(;e;)(m=Md.exec(e))?(g=g.concat(ta.call(m,1)),e=g.pop()):(g.push(e),e=null);q(g,function(a){f=Nd[a];h+=f?f(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return h}}function Hd(){return function(b){return oa(b,!0)}}function Id(){return function(b,a){if(!K(b)&&!B(b))return b;a=T(a);if(B(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<
e;d++)c.push(b[d]);return c}}function Dc(b){return function(a,c,d){function e(a,b){return Ma(b)?function(b,c){return a(c,b)}:a}if(!K(a)||!c)return a;c=K(c)?c:[c];c=Pc(c,function(a){var c=!1,d=a||Aa;if(B(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);d=b(a)}return e(function(a,b){var c;c=d(a);var e=d(b),f=typeof c,h=typeof e;f==h?("string"==f&&(c=c.toLowerCase(),e=e.toLowerCase()),c=c===e?0:c<e?-1:1):c=f<h?-1:1;return c},c)});for(var h=[],g=0;g<a.length;g++)h.push(a[g]);
return h.sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function sa(b){L(b)&&(b={link:b});b.restrict=b.restrict||"AC";return da(b)}function Gc(b,a){function c(a,c){c=c?"-"+bb(c,"-"):"";b.removeClass((a?jb:kb)+c).addClass((a?kb:jb)+c)}var d=this,e=b.parent().controller("form")||lb,h=0,g=d.$error={},f=[];d.$name=a.name||a.ngForm;d.$dirty=!1;d.$pristine=!0;d.$valid=!0;d.$invalid=!1;e.$addControl(d);b.addClass(Ha);c(!0);d.$addControl=function(a){va(a.$name,
"input");f.push(a);a.$name&&(d[a.$name]=a)};d.$removeControl=function(a){a.$name&&d[a.$name]===a&&delete d[a.$name];q(g,function(b,c){d.$setValidity(c,!0,a)});Ka(f,a)};d.$setValidity=function(a,b,f){var n=g[a];if(b)n&&(Ka(n,f),n.length||(h--,h||(c(b),d.$valid=!0,d.$invalid=!1),g[a]=!1,c(!0,a),e.$setValidity(a,!0,d)));else{h||c(b);if(n){if(-1!=$a(n,f))return}else g[a]=n=[],h++,c(!1,a),e.$setValidity(a,!1,d);n.push(f);d.$valid=!1;d.$invalid=!0}};d.$setDirty=function(){b.removeClass(Ha).addClass(mb);
d.$dirty=!0;d.$pristine=!1;e.$setDirty()};d.$setPristine=function(){b.removeClass(mb).addClass(Ha);d.$dirty=!1;d.$pristine=!0;q(f,function(a){a.$setPristine()})}}function nb(b,a,c,d,e,h){var g=!1;a.on("compositionstart",function(){g=!0});a.on("compositionend",function(){g=!1});var f=function(){if(!g){var e=a.val();Ma(c.ngTrim||"T")&&(e=ba(e));d.$viewValue!==e&&b.$apply(function(){d.$setViewValue(e)})}};if(e.hasEvent("input"))a.on("input",f);else{var m,k=function(){m||(m=h.defer(function(){f();m=null}))};
a.on("keydown",function(a){a=a.keyCode;91===a||(15<a&&19>a||37<=a&&40>=a)||k()});a.on("change",f);if(e.hasEvent("paste"))a.on("paste cut",k)}d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)};var l=c.ngPattern,n=function(a,b){if(d.$isEmpty(b)||a.test(b))return d.$setValidity("pattern",!0),b;d.$setValidity("pattern",!1);return s};l&&((e=l.match(/^\/(.*)\/([gim]*)$/))?(l=RegExp(e[1],e[2]),e=function(a){return n(l,a)}):e=function(c){var d=b.$eval(l);if(!d||!d.test)throw C("ngPattern")("noregexp",
l,d,ha(a));return n(d,c)},d.$formatters.push(e),d.$parsers.push(e));if(c.ngMinlength){var r=T(c.ngMinlength);e=function(a){if(!d.$isEmpty(a)&&a.length<r)return d.$setValidity("minlength",!1),s;d.$setValidity("minlength",!0);return a};d.$parsers.push(e);d.$formatters.push(e)}if(c.ngMaxlength){var p=T(c.ngMaxlength);e=function(a){if(!d.$isEmpty(a)&&a.length>p)return d.$setValidity("maxlength",!1),s;d.$setValidity("maxlength",!0);return a};d.$parsers.push(e);d.$formatters.push(e)}}function Mb(b,a){b=
"ngClass"+b;return function(){return{restrict:"AC",link:function(c,d,e){function h(b){if(!0===a||c.$index%2===a){var d=g(b||"");f?Ba(b,f)||e.$updateClass(d,g(f)):e.$addClass(d)}f=ga(b)}function g(a){if(K(a))return a.join(" ");if(X(a)){var b=[];q(a,function(a,c){a&&b.push(c)});return b.join(" ")}return a}var f;c.$watch(e[b],h,!0);e.$observe("class",function(a){h(c.$eval(e[b]))});"ngClass"!==b&&c.$watch("$index",function(d,f){var h=d&1;if(h!==f&1){var n=g(c.$eval(e[b]));h===a?e.$addClass(n):e.$removeClass(n)}})}}}}
var v=function(b){return B(b)?b.toLowerCase():b},Ga=function(b){return B(b)?b.toUpperCase():b},N,y,Ca,ta=[].slice,Od=[].push,Ya=Object.prototype.toString,La=C("ng"),ab=Z.angular||(Z.angular={}),Ta,Fa,ka=["0","0","0"];N=T((/msie (\d+)/.exec(v(navigator.userAgent))||[])[1]);isNaN(N)&&(N=T((/trident\/.*; rv:(\d+)/.exec(v(navigator.userAgent))||[])[1]));x.$inject=[];Aa.$inject=[];var ba=function(){return String.prototype.trim?function(b){return B(b)?b.trim():b}:function(b){return B(b)?b.replace(/^\s*/,
"").replace(/\s*$/,""):b}}();Fa=9>N?function(b){b=b.nodeName?b:b[0];return b.scopeName&&"HTML"!=b.scopeName?Ga(b.scopeName+":"+b.nodeName):b.nodeName}:function(b){return b.nodeName?b.nodeName:b[0].nodeName};var Tc=/[A-Z]/g,Pd={full:"1.2.2",major:1,minor:2,dot:2,codeName:"consciousness-inertia"},Qa=M.cache={},cb=M.expando="ng-"+(new Date).getTime(),Xc=1,Hc=Z.document.addEventListener?function(b,a,c){b.addEventListener(a,c,!1)}:function(b,a,c){b.attachEvent("on"+a,c)},zb=Z.document.removeEventListener?
function(b,a,c){b.removeEventListener(a,c,!1)}:function(b,a,c){b.detachEvent("on"+a,c)},Vc=/([\:\-\_]+(.))/g,Wc=/^moz([A-Z])/,wb=C("jqLite"),Ea=M.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===P.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),M(Z).on("load",a))},toString:function(){var b=[];q(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?y(this[b]):y(this[this.length+b])},length:0,push:Od,sort:[].sort,splice:[].splice},
eb={};q("multiple selected checked disabled readOnly required open".split(" "),function(b){eb[v(b)]=b});var dc={};q("input select option textarea button form details".split(" "),function(b){dc[Ga(b)]=!0});q({data:ac,inheritedData:db,scope:function(b){return y(b).data("$scope")||db(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return y(b).data("$isolateScope")||y(b).data("$isolateScopeNoTemplate")},controller:bc,injector:function(b){return db(b,"$injector")},removeAttr:function(b,
a){b.removeAttribute(a)},hasClass:Ab,css:function(b,a,c){a=Oa(a);if(F(c))b.style[a]=c;else{var d;8>=N&&(d=b.currentStyle&&b.currentStyle[a],""===d&&(d="auto"));d=d||b.style[a];8>=N&&(d=""===d?s:d);return d}},attr:function(b,a,c){var d=v(a);if(eb[d])if(F(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||x).specified?d:s;else if(F(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?s:b},prop:function(b,
a,c){if(F(c))b[a]=c;else return b[a]},text:function(){function b(b,d){var e=a[b.nodeType];if(z(d))return e?b[e]:"";b[e]=d}var a=[];9>N?(a[1]="innerText",a[3]="nodeValue"):a[1]=a[3]="textContent";b.$dv="";return b}(),val:function(b,a){if(z(a)){if("SELECT"===Fa(b)&&b.multiple){var c=[];q(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(z(a))return b.innerHTML;for(var c=0,d=b.childNodes;c<d.length;c++)Pa(d[c]);b.innerHTML=
a}},function(b,a){M.prototype[a]=function(a,d){var e,h;if((2==b.length&&b!==Ab&&b!==bc?a:d)===s){if(X(a)){for(e=0;e<this.length;e++)if(b===ac)b(this[e],a);else for(h in a)b(this[e],h,a[h]);return this}e=b.$dv;h=e===s?Math.min(this.length,1):this.length;for(var g=0;g<h;g++){var f=b(this[g],a,d);e=e?e+f:f}return e}for(e=0;e<this.length;e++)b(this[e],a,d);return this}});q({removeData:Zb,dealoc:Pa,on:function a(c,d,e,h){if(F(h))throw wb("onargs");var g=la(c,"events"),f=la(c,"handle");g||la(c,"events",
g={});f||la(c,"handle",f=Yc(c,g));q(d.split(" "),function(d){var h=g[d];if(!h){if("mouseenter"==d||"mouseleave"==d){var l=P.body.contains||P.body.compareDocumentPosition?function(a,c){var d=9===a.nodeType?a.documentElement:a,e=c&&c.parentNode;return a===e||!!(e&&1===e.nodeType&&(d.contains?d.contains(e):a.compareDocumentPosition&&a.compareDocumentPosition(e)&16))}:function(a,c){if(c)for(;c=c.parentNode;)if(c===a)return!0;return!1};g[d]=[];a(c,{mouseleave:"mouseout",mouseenter:"mouseover"}[d],function(a){var c=
a.relatedTarget;c&&(c===this||l(this,c))||f(a,d)})}else Hc(c,d,f),g[d]=[];h=g[d]}h.push(e)})},off:$b,replaceWith:function(a,c){var d,e=a.parentNode;Pa(a);q(new M(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];q(a.childNodes,function(a){1===a.nodeType&&c.push(a)});return c},contents:function(a){return a.childNodes||[]},append:function(a,c){q(new M(c),function(c){1!==a.nodeType&&11!==a.nodeType||a.appendChild(c)})},prepend:function(a,c){if(1===
a.nodeType){var d=a.firstChild;q(new M(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=y(c)[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:function(a){Pa(a);var c=a.parentNode;c&&c.removeChild(a)},after:function(a,c){var d=a,e=a.parentNode;q(new M(c),function(a){e.insertBefore(a,d.nextSibling);d=a})},addClass:Cb,removeClass:Bb,toggleClass:function(a,c,d){z(d)&&(d=!Ab(a,c));(d?Cb:Bb)(a,c)},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){if(a.nextElementSibling)return a.nextElementSibling;
for(a=a.nextSibling;null!=a&&1!==a.nodeType;)a=a.nextSibling;return a},find:function(a,c){return a.getElementsByTagName(c)},clone:yb,triggerHandler:function(a,c,d){c=(la(a,"events")||{})[c];d=d||[];var e=[{preventDefault:x,stopPropagation:x}];q(c,function(c){c.apply(a,e.concat(d))})}},function(a,c){M.prototype[c]=function(c,e,h){for(var g,f=0;f<this.length;f++)z(g)?(g=a(this[f],c,e,h),F(g)&&(g=y(g))):xb(g,a(this[f],c,e,h));return F(g)?g:this};M.prototype.bind=M.prototype.on;M.prototype.unbind=M.prototype.off});
Ra.prototype={put:function(a,c){this[Da(a)]=c},get:function(a){return this[Da(a)]},remove:function(a){var c=this[a=Da(a)];delete this[a];return c}};var $c=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,ad=/,/,bd=/^\s*(_?)(\S+?)\1\s*$/,Zc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Sa=C("$injector"),Qd=C("$animate"),Rd=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Qd("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.$get=["$timeout",
function(a){return{enter:function(d,e,h,g){h?h.after(d):(e&&e[0]||(e=h.parent()),e.append(d));g&&a(g,0,!1)},leave:function(d,e){d.remove();e&&a(e,0,!1)},move:function(a,c,h,g){this.enter(a,c,h,g)},addClass:function(d,e,h){e=B(e)?e:K(e)?e.join(" "):"";q(d,function(a){Cb(a,e)});h&&a(h,0,!1)},removeClass:function(d,e,h){e=B(e)?e:K(e)?e.join(" "):"";q(d,function(a){Bb(a,e)});h&&a(h,0,!1)},enabled:x}}]}],ja=C("$compile");gc.$inject=["$provide"];var id=/^(x[\:\-_]|data[\:\-_])/i,pd=Z.XMLHttpRequest||function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(c){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(d){}throw C("$httpBackend")("noxhr");
},mc=C("$interpolate"),Sd=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,td={http:80,https:443,ftp:21},Hb=C("$location");rc.prototype=Ib.prototype=qc.prototype={$$html5:!1,$$replace:!1,absUrl:gb("$$absUrl"),url:function(a,c){if(z(a))return this.$$url;var d=Sd.exec(a);d[1]&&this.path(decodeURIComponent(d[1]));(d[2]||d[1])&&this.search(d[3]||"");this.hash(d[5]||"",c);return this},protocol:gb("$$protocol"),host:gb("$$host"),port:gb("$$port"),path:sc("$$path",function(a){return"/"==a.charAt(0)?a:"/"+a}),search:function(a,
c){switch(arguments.length){case 0:return this.$$search;case 1:if(B(a))this.$$search=Vb(a);else if(X(a))this.$$search=a;else throw Hb("isrcharg");break;default:z(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:sc("$$hash",Aa),replace:function(){this.$$replace=!0;return this}};var ya=C("$parse"),vc={},qa,Ia={"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:x,"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return F(d)?
F(e)?d+e:d:F(e)?e:s},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(F(d)?d:0)-(F(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"^":function(a,c,d,e){return d(a,c)^e(a,c)},"=":x,"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},
">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"&":function(a,c,d,e){return d(a,c)&e(a,c)},"|":function(a,c,d,e){return e(a,c)(a,c,d(a,c))},"!":function(a,c,d){return!d(a,c)}},Td={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},Kb=function(a){this.options=a};Kb.prototype={constructor:Kb,lex:function(a){this.text=a;
this.index=0;this.ch=s;this.lastCh=":";this.tokens=[];var c;for(a=[];this.index<this.text.length;){this.ch=this.text.charAt(this.index);if(this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent(),this.was("{,")&&("{"===a[0]&&(c=this.tokens[this.tokens.length-1]))&&(c.json=-1===c.text.indexOf("."));else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch,json:this.was(":[,")&&
this.is("{[")||this.is("}]:,")}),this.is("{[")&&a.unshift(this.ch),this.is("}]")&&a.shift(),this.index++;else if(this.isWhitespace(this.ch)){this.index++;continue}else{var d=this.ch+this.peek(),e=d+this.peek(2),h=Ia[this.ch],g=Ia[d],f=Ia[e];f?(this.tokens.push({index:this.index,text:e,fn:f}),this.index+=3):g?(this.tokens.push({index:this.index,text:d,fn:g}),this.index+=2):h?(this.tokens.push({index:this.index,text:this.ch,fn:h,json:this.was("[,:")&&this.is("+-")}),this.index+=1):this.throwError("Unexpected next character ",
this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},was:function(a){return-1!==a.indexOf(this.lastCh)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===
a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=F(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw ya("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=v(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||
e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,json:!0,fn:function(){return a}})},readIdent:function(){for(var a=this,c="",d=this.index,e,h,g,f;this.index<this.text.length;){f=this.text.charAt(this.index);if("."===f||this.isIdent(f)||this.isNumber(f))"."===f&&(e=this.index),c+=f;else break;this.index++}if(e)for(h=this.index;h<this.text.length;){f=this.text.charAt(h);if("("===f){g=c.substr(e-d+1);c=c.substr(0,
e-d);this.index=h;break}if(this.isWhitespace(f))h++;else break}d={index:d,text:c};if(Ia.hasOwnProperty(c))d.fn=Ia[c],d.json=Ia[c];else{var m=uc(c,this.options,this.text);d.fn=u(function(a,c){return m(a,c)},{assign:function(d,e){return hb(d,c,e,a.text,a.options)}})}this.tokens.push(d);g&&(this.tokens.push({index:e,text:".",json:!1}),this.tokens.push({index:e+1,text:g,json:!1}))},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,h=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),
e=e+g;if(h)"u"===g?(g=this.text.substring(this.index+1,this.index+5),g.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+g+"]"),this.index+=4,d+=String.fromCharCode(parseInt(g,16))):d=(h=Td[g])?d+h:d+g,h=!1;else if("\\"===g)h=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,string:d,json:!0,fn:function(){return d}});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var Wa=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};Wa.ZERO=function(){return 0};
Wa.prototype={constructor:Wa,parse:function(a,c){this.text=a;this.json=c;this.tokens=this.lexer.lex(a);c&&(this.assignment=this.logicalOR,this.functionCall=this.fieldAccess=this.objectIndex=this.filterChain=function(){this.throwError("is not valid json",{text:a,index:0})});var d=c?this.primary():this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);d.literal=!!d.literal;d.constant=!!d.constant;return d},primary:function(){var a;if(this.expect("("))a=this.filterChain(),
this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);c.json&&(a.constant=!0,a.literal=!0)}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw ya("syntax",c.text,a,c.index+1,this.text,
this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw ya("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var h=this.tokens[0],g=h.text;if(g===a||g===c||g===d||g===e||!(a||c||d||e))return h}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.json&&!a.json&&this.throwError("is not valid json",a),this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},
unaryFn:function(a,c){return u(function(d,e){return a(d,e,c)},{constant:c.constant})},ternaryFn:function(a,c,d){return u(function(e,h){return a(e,h)?c(e,h):d(e,h)},{constant:a.constant&&c.constant&&d.constant})},binaryFn:function(a,c,d){return u(function(e,h){return c(e,h,a,d)},{constant:a.constant&&d.constant})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,h=
0;h<a.length;h++){var g=a[h];g&&(e=g(c,d))}return e}},filterChain:function(){for(var a=this.expression(),c;;)if(c=this.expect("|"))a=this.binaryFn(a,c.fn,this.filter());else return a},filter:function(){for(var a=this.expect(),c=this.$filter(a.text),d=[];;)if(a=this.expect(":"))d.push(this.expression());else{var e=function(a,e,f){f=[f];for(var m=0;m<d.length;m++)f.push(d[m](a,e));return c.apply(a,f)};return function(){return e}}},expression:function(){return this.assignment()},assignment:function(){var a=
this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),function(d,h){return a.assign(d,c(d,h),h)}):a},ternary:function(){var a=this.logicalOR(),c,d;if(this.expect("?")){c=this.ternary();if(d=this.expect(":"))return this.ternaryFn(a,c,this.ternary());this.throwError("expected :",d)}else return a},logicalOR:function(){for(var a=this.logicalAND(),c;;)if(c=this.expect("||"))a=this.binaryFn(a,
c.fn,this.logicalAND());else return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND());return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+",
"-");)a=this.binaryFn(a,c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(Wa.ZERO,a.fn,this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},fieldAccess:function(a){var c=this,d=this.expect().text,e=uc(d,this.options,this.text);return u(function(c,d,f){return e(f||
a(c,d),d)},{assign:function(e,g,f){return hb(a(e,f),d,g,c.text,c.options)}})},objectIndex:function(a){var c=this,d=this.expression();this.consume("]");return u(function(e,h){var g=a(e,h),f=d(e,h),m;if(!g)return s;(g=Va(g[f],c.text))&&(g.then&&c.options.unwrapPromises)&&(m=g,"$$v"in g||(m.$$v=s,m.then(function(a){m.$$v=a})),g=g.$$v);return g},{assign:function(e,h,g){var f=d(e,g);return Va(a(e,g),c.text)[f]=h}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());
while(this.expect(","))}this.consume(")");var e=this;return function(h,g){for(var f=[],m=c?c(h,g):h,k=0;k<d.length;k++)f.push(d[k](h,g));k=a(h,g,m)||x;Va(m,e.text);Va(k,e.text);f=k.apply?k.apply(m,f):k(f[0],f[1],f[2],f[3],f[4]);return Va(f,e.text)}},arrayDeclaration:function(){var a=[],c=!0;if("]"!==this.peekToken().text){do{var d=this.expression();a.push(d);d.constant||(c=!1)}while(this.expect(","))}this.consume("]");return u(function(c,d){for(var g=[],f=0;f<a.length;f++)g.push(a[f](c,d));return g},
{literal:!0,constant:c})},object:function(){var a=[],c=!0;if("}"!==this.peekToken().text){do{var d=this.expect(),d=d.string||d.text;this.consume(":");var e=this.expression();a.push({key:d,value:e});e.constant||(c=!1)}while(this.expect(","))}this.consume("}");return u(function(c,d){for(var e={},m=0;m<a.length;m++){var k=a[m];e[k.key]=k.value(c,d)}return e},{literal:!0,constant:c})}};var Jb={},ra=C("$sce"),fa={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},aa=P.createElement("a"),
xc=/^\/?.*?:(\/.*)/,yc=xa(Z.location.href,!0);zc.$inject=["$provide"];Ac.$inject=["$locale"];Cc.$inject=["$locale"];var Fc=".",Nd={yyyy:W("FullYear",4),yy:W("FullYear",2,0,!0),y:W("FullYear",1),MMMM:ib("Month"),MMM:ib("Month",!0),MM:W("Month",2,1),M:W("Month",1,1),dd:W("Date",2),d:W("Date",1),HH:W("Hours",2),H:W("Hours",1),hh:W("Hours",2,-12),h:W("Hours",1,-12),mm:W("Minutes",2),m:W("Minutes",1),ss:W("Seconds",2),s:W("Seconds",1),sss:W("Milliseconds",3),EEEE:ib("Day"),EEE:ib("Day",!0),a:function(a,
c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Lb(Math[0<a?"floor":"ceil"](a/60),2)+Lb(Math.abs(a%60),2))}},Md=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,Ld=/^\-?\d+$/;Bc.$inject=["$locale"];var Jd=da(v),Kd=da(Ga);Dc.$inject=["$parse"];var Ud=da({restrict:"E",compile:function(a,c){8>=N&&(c.href||c.name||c.$set("href",""),a.append(P.createComment("IE fix")));return function(a,c){c.on("click",function(a){c.attr("href")||
a.preventDefault()})}}}),Nb={};q(eb,function(a,c){if("multiple"!=a){var d=ma("ng-"+c);Nb[d]=function(){return{priority:100,compile:function(){return function(a,h,g){a.$watch(g[d],function(a){g.$set(c,!!a)})}}}}}});q(["src","srcset","href"],function(a){var c=ma("ng-"+a);Nb[c]=function(){return{priority:99,link:function(d,e,h){h.$observe(c,function(c){c&&(h.$set(a,c),N&&e.prop(a,h[a]))})}}}});var lb={$addControl:x,$removeControl:x,$setValidity:x,$setDirty:x,$setPristine:x};Gc.$inject=["$element","$attrs",
"$scope"];var Ic=function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:Gc,compile:function(){return{pre:function(a,e,h,g){if(!h.action){var f=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1};Hc(e[0],"submit",f);e.on("$destroy",function(){c(function(){zb(e[0],"submit",f)},0,!1)})}var m=e.parent().controller("form"),k=h.name||h.ngForm;k&&hb(a,k,g,k);if(m)e.on("$destroy",function(){m.$removeControl(g);k&&hb(a,k,s,k);u(g,lb)})}}}}}]},Vd=Ic(),Wd=
Ic(!0),Xd=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Yd=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,Zd=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Jc={text:nb,number:function(a,c,d,e,h,g){nb(a,c,d,e,h,g);e.$parsers.push(function(a){var c=e.$isEmpty(a);if(c||Zd.test(a))return e.$setValidity("number",!0),""===a?null:c?a:parseFloat(a);e.$setValidity("number",!1);return s});e.$formatters.push(function(a){return e.$isEmpty(a)?"":""+a});d.min&&(a=function(a){var c=
parseFloat(d.min);if(!e.$isEmpty(a)&&a<c)return e.$setValidity("min",!1),s;e.$setValidity("min",!0);return a},e.$parsers.push(a),e.$formatters.push(a));d.max&&(a=function(a){var c=parseFloat(d.max);if(!e.$isEmpty(a)&&a>c)return e.$setValidity("max",!1),s;e.$setValidity("max",!0);return a},e.$parsers.push(a),e.$formatters.push(a));e.$formatters.push(function(a){if(e.$isEmpty(a)||pb(a))return e.$setValidity("number",!0),a;e.$setValidity("number",!1);return s})},url:function(a,c,d,e,h,g){nb(a,c,d,e,
h,g);a=function(a){if(e.$isEmpty(a)||Xd.test(a))return e.$setValidity("url",!0),a;e.$setValidity("url",!1);return s};e.$formatters.push(a);e.$parsers.push(a)},email:function(a,c,d,e,h,g){nb(a,c,d,e,h,g);a=function(a){if(e.$isEmpty(a)||Yd.test(a))return e.$setValidity("email",!0),a;e.$setValidity("email",!1);return s};e.$formatters.push(a);e.$parsers.push(a)},radio:function(a,c,d,e){z(d.name)&&c.attr("name",Xa());c.on("click",function(){c[0].checked&&a.$apply(function(){e.$setViewValue(d.value)})});
e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e){var h=d.ngTrueValue,g=d.ngFalseValue;B(h)||(h=!0);B(g)||(g=!1);c.on("click",function(){a.$apply(function(){e.$setViewValue(c[0].checked)})});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==h};e.$formatters.push(function(a){return a===h});e.$parsers.push(function(a){return a?h:g})},hidden:x,button:x,submit:x,reset:x},Kc=["$browser","$sniffer",function(a,
c){return{restrict:"E",require:"?ngModel",link:function(d,e,h,g){g&&(Jc[v(h.type)]||Jc.text)(d,e,h,g,c,a)}}}],kb="ng-valid",jb="ng-invalid",Ha="ng-pristine",mb="ng-dirty",$d=["$scope","$exceptionHandler","$attrs","$element","$parse",function(a,c,d,e,h){function g(a,c){c=c?"-"+bb(c,"-"):"";e.removeClass((a?jb:kb)+c).addClass((a?kb:jb)+c)}this.$modelValue=this.$viewValue=Number.NaN;this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=
!1;this.$name=d.name;var f=h(d.ngModel),m=f.assign;if(!m)throw C("ngModel")("nonassign",d.ngModel,ha(e));this.$render=x;this.$isEmpty=function(a){return z(a)||""===a||null===a||a!==a};var k=e.inheritedData("$formController")||lb,l=0,n=this.$error={};e.addClass(Ha);g(!0);this.$setValidity=function(a,c){n[a]!==!c&&(c?(n[a]&&l--,l||(g(!0),this.$valid=!0,this.$invalid=!1)):(g(!1),this.$invalid=!0,this.$valid=!1,l++),n[a]=!c,g(c,a),k.$setValidity(a,c,this))};this.$setPristine=function(){this.$dirty=!1;
this.$pristine=!0;e.removeClass(mb).addClass(Ha)};this.$setViewValue=function(d){this.$viewValue=d;this.$pristine&&(this.$dirty=!0,this.$pristine=!1,e.removeClass(Ha).addClass(mb),k.$setDirty());q(this.$parsers,function(a){d=a(d)});this.$modelValue!==d&&(this.$modelValue=d,m(a,d),q(this.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}}))};var r=this;a.$watch(function(){var c=f(a);if(r.$modelValue!==c){var d=r.$formatters,e=d.length;for(r.$modelValue=c;e--;)c=d[e](c);r.$viewValue!==c&&(r.$viewValue=
c,r.$render())}})}],ae=function(){return{require:["ngModel","^?form"],controller:$d,link:function(a,c,d,e){var h=e[0],g=e[1]||lb;g.$addControl(h);a.$on("$destroy",function(){g.$removeControl(h)})}}},be=da({require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),Lc=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){d.required=!0;var h=function(a){if(d.required&&e.$isEmpty(a))e.$setValidity("required",!1);else return e.$setValidity("required",
!0),a};e.$formatters.push(h);e.$parsers.unshift(h);d.$observe("required",function(){h(e.$viewValue)})}}}},ce=function(){return{require:"ngModel",link:function(a,c,d,e){var h=(a=/\/(.*)\//.exec(d.ngList))&&RegExp(a[1])||d.ngList||",";e.$parsers.push(function(a){if(!z(a)){var c=[];a&&q(a.split(h),function(a){a&&c.push(ba(a))});return c}});e.$formatters.push(function(a){return K(a)?a.join(", "):s});e.$isEmpty=function(a){return!a||!a.length}}}},de=/^(true|false|\d+)$/,ee=function(){return{priority:100,
compile:function(a,c){return de.test(c.ngValue)?function(a,c,h){h.$set("value",a.$eval(h.ngValue))}:function(a,c,h){a.$watch(h.ngValue,function(a){h.$set("value",a)})}}}},fe=sa(function(a,c,d){c.addClass("ng-binding").data("$binding",d.ngBind);a.$watch(d.ngBind,function(a){c.text(a==s?"":a)})}),ge=["$interpolate",function(a){return function(c,d,e){c=a(d.attr(e.$attr.ngBindTemplate));d.addClass("ng-binding").data("$binding",c);e.$observe("ngBindTemplate",function(a){d.text(a)})}}],he=["$sce","$parse",
function(a,c){return function(d,e,h){e.addClass("ng-binding").data("$binding",h.ngBindHtml);var g=c(h.ngBindHtml);d.$watch(function(){return(g(d)||"").toString()},function(c){e.html(a.getTrustedHtml(g(d))||"")})}}],ie=Mb("",!0),je=Mb("Odd",0),ke=Mb("Even",1),le=sa({compile:function(a,c){c.$set("ngCloak",s);a.removeClass("ng-cloak")}}),me=[function(){return{scope:!0,controller:"@",priority:500}}],Mc={};q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
function(a){var c=ma("ng-"+a);Mc[c]=["$parse",function(d){return{compile:function(e,h){var g=d(h[c]);return function(c,d,e){d.on(v(a),function(a){c.$apply(function(){g(c,{$event:a})})})}}}}]});var ne=["$animate",function(a){return{transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,h,g){var f,m;c.$watch(e.ngIf,function(h){Ma(h)?m||(m=c.$new(),g(m,function(c){f={startNode:c[0],endNode:c[c.length++]=P.createComment(" end ngIf: "+e.ngIf+" ")};a.enter(c,d.parent(),
d)})):(m&&(m.$destroy(),m=null),f&&(a.leave(ub(f)),f=null))})}}}],oe=["$http","$templateCache","$anchorScroll","$compile","$animate","$sce",function(a,c,d,e,h,g){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",compile:function(f,m){var k=m.ngInclude||m.src,l=m.onload||"",n=m.autoscroll;return function(f,m,q,s,y){var w=0,D,E,t=function(){D&&(D.$destroy(),D=null);E&&(h.leave(E),E=null)};f.$watch(g.parseAsResourceUrl(k),function(g){var k=function(){!F(n)||n&&!f.$eval(n)||d()},q=++w;
g?(a.get(g,{cache:c}).success(function(a){if(q===w){var c=f.$new(),d=y(c,x);t();D=c;E=d;E.html(a);h.enter(E,null,m,k);e(E.contents())(D);D.$emit("$includeContentLoaded");f.$eval(l)}}).error(function(){q===w&&t()}),f.$emit("$includeContentRequested")):t()})}}}}],pe=sa({compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),qe=sa({terminal:!0,priority:1E3}),re=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,h,g){var f=g.count,m=g.$attr.when&&h.attr(g.$attr.when),
k=g.offset||0,l=e.$eval(m)||{},n={},r=c.startSymbol(),p=c.endSymbol(),s=/^when(Minus)?(.+)$/;q(g,function(a,c){s.test(c)&&(l[v(c.replace("when","").replace("Minus","-"))]=h.attr(g.$attr[c]))});q(l,function(a,e){n[e]=c(a.replace(d,r+f+"-"+k+p))});e.$watch(function(){var c=parseFloat(e.$eval(f));if(isNaN(c))return"";c in l||(c=a.pluralCat(c-k));return n[c](e,h,!0)},function(a){h.text(a)})}}}],se=["$parse","$animate",function(a,c){var d=C("ngRepeat");return{transclude:"element",priority:1E3,terminal:!0,
$$tlb:!0,link:function(e,h,g,f,m){var k=g.ngRepeat,l=k.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),n,r,p,s,x,F,w={$id:Da};if(!l)throw d("iexp",k);g=l[1];f=l[2];(l=l[4])?(n=a(l),r=function(a,c,d){F&&(w[F]=a);w[x]=c;w.$index=d;return n(e,w)}):(p=function(a,c){return Da(c)},s=function(a){return a});l=g.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!l)throw d("iidexp",g);x=l[3]||l[1];F=l[2];var D={};e.$watchCollection(f,function(a){var f,g,l=h[0],n,S={},w,Q,z,V,B,u,v=[];if(ob(a))B=
a,n=r||p;else{n=r||s;B=[];for(z in a)a.hasOwnProperty(z)&&"$"!=z.charAt(0)&&B.push(z);B.sort()}w=B.length;g=v.length=B.length;for(f=0;f<g;f++)if(z=a===B?f:B[f],V=a[z],V=n(z,V,f),va(V,"`track by` id"),D.hasOwnProperty(V))u=D[V],delete D[V],S[V]=u,v[f]=u;else{if(S.hasOwnProperty(V))throw q(v,function(a){a&&a.startNode&&(D[a.id]=a)}),d("dupes",k,V);v[f]={id:V};S[V]=!1}for(z in D)D.hasOwnProperty(z)&&(u=D[z],f=ub(u),c.leave(f),q(f,function(a){a.$$NG_REMOVED=!0}),u.scope.$destroy());f=0;for(g=B.length;f<
g;f++){z=a===B?f:B[f];V=a[z];u=v[f];v[f-1]&&(l=v[f-1].endNode);if(u.startNode){Q=u.scope;n=l;do n=n.nextSibling;while(n&&n.$$NG_REMOVED);u.startNode!=n&&c.move(ub(u),null,y(l));l=u.endNode}else Q=e.$new();Q[x]=V;F&&(Q[F]=z);Q.$index=f;Q.$first=0===f;Q.$last=f===w-1;Q.$middle=!(Q.$first||Q.$last);Q.$odd=!(Q.$even=0===(f&1));u.startNode||m(Q,function(a){a[a.length++]=P.createComment(" end ngRepeat: "+k+" ");c.enter(a,null,y(l));l=a;u.scope=Q;u.startNode=l&&l.endNode?l.endNode:a[0];u.endNode=a[a.length-
1];S[u.id]=u})}D=S})}}}],te=["$animate",function(a){return function(c,d,e){c.$watch(e.ngShow,function(c){a[Ma(c)?"removeClass":"addClass"](d,"ng-hide")})}}],ue=["$animate",function(a){return function(c,d,e){c.$watch(e.ngHide,function(c){a[Ma(c)?"addClass":"removeClass"](d,"ng-hide")})}}],ve=sa(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&q(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),we=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases=
{}}],link:function(c,d,e,h){var g,f,m=[];c.$watch(e.ngSwitch||e.on,function(d){for(var l=0,n=m.length;l<n;l++)m[l].$destroy(),a.leave(f[l]);f=[];m=[];if(g=h.cases["!"+d]||h.cases["?"])c.$eval(e.change),q(g,function(d){var e=c.$new();m.push(e);d.transclude(e,function(c){var e=d.element;f.push(c);a.enter(c,e.parent(),e)})})})}}}],xe=sa({transclude:"element",priority:800,require:"^ngSwitch",compile:function(a,c){return function(a,e,h,g,f){g.cases["!"+c.ngSwitchWhen]=g.cases["!"+c.ngSwitchWhen]||[];g.cases["!"+
c.ngSwitchWhen].push({transclude:f,element:e})}}}),ye=sa({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,h){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:h,element:c})}}),ze=sa({controller:["$element","$transclude",function(a,c){if(!c)throw C("ngTransclude")("orphan",ha(a));this.$transclude=c}],link:function(a,c,d,e){e.$transclude(function(a){c.html("");c.append(a)})}}),Ae=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==
d.type&&a.put(d.id,c[0].text)}}}],Be=C("ngOptions"),Ce=da({terminal:!0}),De=["$compile","$parse",function(a,c){var d=/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/,e={$setViewValue:x};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var m=this,k={},l=e,n;m.databound=d.ngModel;m.init=function(a,c,d){l=a;n=d};m.addOption=
function(c){va(c,'"option value"');k[c]=!0;l.$viewValue==c&&(a.val(c),n.parent()&&n.remove())};m.removeOption=function(a){this.hasOption(a)&&(delete k[a],l.$viewValue==a&&this.renderUnknownOption(a))};m.renderUnknownOption=function(c){c="? "+Da(c)+" ?";n.val(c);a.prepend(n);a.val(c);n.prop("selected",!0)};m.hasOption=function(a){return k.hasOwnProperty(a)};c.$on("$destroy",function(){m.renderUnknownOption=x})}],link:function(e,g,f,m){function k(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?
(t.parent()&&t.remove(),c.val(a),""===a&&w.prop("selected",!0)):z(a)&&w?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){t.parent()&&t.remove();d.$setViewValue(c.val())})})}function l(a,c,d){var e;d.$render=function(){var a=new Ra(d.$viewValue);q(c.find("option"),function(c){c.selected=F(a.get(c.value))})};a.$watch(function(){Ba(e,d.$viewValue)||(e=ga(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];q(c.find("option"),function(c){c.selected&&
a.push(c.value)});d.$setViewValue(a)})})}function n(e,f,h){function g(){var a={"":[]},c=[""],d,k,s,u,w;u=h.$modelValue;w=r(e)||[];var z=n?Ob(w):w,B,v,I;v={};s=!1;var C,H;if(A)if(t&&K(u))for(s=new Ra([]),I=0;I<u.length;I++)v[m]=u[I],s.put(t(e,v),u[I]);else s=new Ra(u);for(I=0;B=z.length,I<B;I++){k=I;if(n){k=z[I];if("$"===k.charAt(0))continue;v[n]=k}v[m]=w[k];d=p(e,v)||"";(k=a[d])||(k=a[d]=[],c.push(d));A?d=F(s.remove(t?t(e,v):q(e,v))):(t?(d={},d[m]=u,d=t(e,d)===t(e,v)):d=u===q(e,v),s=s||d);C=l(e,v);
C=F(C)?C:"";k.push({id:t?t(e,v):n?z[I]:I,label:C,selected:d})}A||(x||null===u?a[""].unshift({id:"",label:"",selected:!s}):s||a[""].unshift({id:"?",label:"",selected:!0}));v=0;for(z=c.length;v<z;v++){d=c[v];k=a[d];y.length<=v?(u={element:E.clone().attr("label",d),label:k.label},w=[u],y.push(w),f.append(u.element)):(w=y[v],u=w[0],u.label!=d&&u.element.attr("label",u.label=d));C=null;I=0;for(B=k.length;I<B;I++)s=k[I],(d=w[I+1])?(C=d.element,d.label!==s.label&&C.text(d.label=s.label),d.id!==s.id&&C.val(d.id=
s.id),C[0].selected!==s.selected&&C.prop("selected",d.selected=s.selected)):(""===s.id&&x?H=x:(H=D.clone()).val(s.id).attr("selected",s.selected).text(s.label),w.push({element:H,label:s.label,id:s.id,selected:s.selected}),C?C.after(H):u.element.append(H),C=H);for(I++;w.length>I;)w.pop().element.remove()}for(;y.length>v;)y.pop()[0].element.remove()}var k;if(!(k=u.match(d)))throw Be("iexp",u,ha(f));var l=c(k[2]||k[1]),m=k[4]||k[6],n=k[5],p=c(k[3]||""),q=c(k[2]?k[1]:m),r=c(k[7]),t=k[8]?c(k[8]):null,
y=[[{element:f,label:""}]];x&&(a(x)(e),x.removeClass("ng-scope"),x.remove());f.html("");f.on("change",function(){e.$apply(function(){var a,c=r(e)||[],d={},g,k,l,p,u,w,v;if(A)for(k=[],p=0,w=y.length;p<w;p++)for(a=y[p],l=1,u=a.length;l<u;l++){if((g=a[l].element)[0].selected){g=g.val();n&&(d[n]=g);if(t)for(v=0;v<c.length&&(d[m]=c[v],t(e,d)!=g);v++);else d[m]=c[g];k.push(q(e,d))}}else if(g=f.val(),"?"==g)k=s;else if(""===g)k=null;else if(t)for(v=0;v<c.length;v++){if(d[m]=c[v],t(e,d)==g){k=q(e,d);break}}else d[m]=
c[g],n&&(d[n]=g),k=q(e,d);h.$setViewValue(k)})});h.$render=g;e.$watch(g)}if(m[1]){var r=m[0],p=m[1],A=f.multiple,u=f.ngOptions,x=!1,w,D=y(P.createElement("option")),E=y(P.createElement("optgroup")),t=D.clone();m=0;for(var B=g.children(),v=B.length;m<v;m++)if(""===B[m].value){w=x=B.eq(m);break}r.init(p,x,t);if(A&&(f.required||f.ngRequired)){var C=function(a){p.$setValidity("required",!f.required||a&&a.length);return a};p.$parsers.push(C);p.$formatters.unshift(C);f.$observe("required",function(){C(p.$viewValue)})}u?
n(e,g,p):A?l(e,g,p):k(e,g,p,r)}}}}],Ee=["$interpolate",function(a){var c={addOption:x,removeOption:x};return{restrict:"E",priority:100,compile:function(d,e){if(z(e.value)){var h=a(d.text(),!0);h||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),l=k.data("$selectController")||k.parent().data("$selectController");l&&l.databound?d.prop("selected",!1):l=c;h?a.$watch(h,function(a,c){e.$set("value",a);a!==c&&l.removeOption(c);l.addOption(a)}):l.addOption(e.value);d.on("$destroy",function(){l.removeOption(e.value)})}}}}],
Fe=da({restrict:"E",terminal:!0});(Ca=Z.jQuery)?(y=Ca,u(Ca.fn,{scope:Ea.scope,isolateScope:Ea.isolateScope,controller:Ea.controller,injector:Ea.injector,inheritedData:Ea.inheritedData}),vb("remove",!0,!0,!1),vb("empty",!1,!1,!1),vb("html",!1,!1,!0)):y=M;ab.element=y;(function(a){u(a,{bootstrap:Xb,copy:ga,extend:u,equals:Ba,element:y,forEach:q,injector:Yb,noop:x,bind:qb,toJson:oa,fromJson:Tb,identity:Aa,isUndefined:z,isDefined:F,isString:B,isFunction:L,isObject:X,isNumber:pb,isElement:Oc,isArray:K,
version:Pd,isDate:Ja,lowercase:v,uppercase:Ga,callbacks:{counter:0},$$minErr:C,$$csp:Sb});Ta=Uc(Z);try{Ta("ngLocale")}catch(c){Ta("ngLocale",[]).provider("$locale",sd)}Ta("ng",["ngLocale"],["$provide",function(a){a.provider("$compile",gc).directive({a:Ud,input:Kc,textarea:Kc,form:Vd,script:Ae,select:De,style:Fe,option:Ee,ngBind:fe,ngBindHtml:he,ngBindTemplate:ge,ngClass:ie,ngClassEven:ke,ngClassOdd:je,ngCloak:le,ngController:me,ngForm:Wd,ngHide:ue,ngIf:ne,ngInclude:oe,ngInit:pe,ngNonBindable:qe,ngPluralize:re,
ngRepeat:se,ngShow:te,ngStyle:ve,ngSwitch:we,ngSwitchWhen:xe,ngSwitchDefault:ye,ngOptions:Ce,ngTransclude:ze,ngModel:ae,ngList:ce,ngChange:be,required:Lc,ngRequired:Lc,ngValue:ee}).directive(Nb).directive(Mc);a.provider({$anchorScroll:cd,$animate:Rd,$browser:ed,$cacheFactory:fd,$controller:jd,$document:kd,$exceptionHandler:ld,$filter:zc,$interpolate:qd,$interval:rd,$http:md,$httpBackend:nd,$location:ud,$log:vd,$parse:wd,$rootScope:zd,$q:xd,$sce:Cd,$sceDelegate:Bd,$sniffer:Dd,$templateCache:gd,$timeout:Ed,
$window:Fd})}])})(ab);y(P).ready(function(){Sc(P,Xb)})})(window,document);!angular.$$csp()&&angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-start{border-spacing:1px 1px;-ms-zoom:1.0001;}.ng-animate-active{border-spacing:0px 0px;-ms-zoom:1;}</style>');
//# sourceMappingURL=angular.min.js.map

},{}],5:[function(require,module,exports){

module.exports = require('./lib/urlsafe-base64');
},{"./lib/urlsafe-base64":6}],6:[function(require,module,exports){
var Buffer=require("__browserify_Buffer");/*!
 * urlsafe-base64
 * Copyright(c) 2013 RGBboy <me@rgbboy.com>
 * MIT Licensed
 */

/**
 * Module Dependencies
 */

// None yet!

/**
 * Library version.
 */

exports.version = '0.0.2';

/**
 * .encode
 *
 * return an encoded Buffer as URL Safe Base64
 *
 * Note: This function encodes to the RFC 4648 Spec where '+' is encoded 
 *       as '-' and '/' is encoded as '_'. The padding character '=' is 
 *       removed.
 *
 * @param {Buffer} buffer
 * @return {String}
 * @api public
 */

exports.encode = function encode(buffer) {

  return buffer.toString('base64')
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='

};

/**
 * .decode
 *
 * return an decoded URL Safe Base64 as Buffer
 *
 * @param {String}
 * @return {Buffer}
 * @api public
 */

exports.decode = function validate(base64) {

  // Add removed at end '='
  base64 += Array(5 - base64.length % 4).join('=');

  base64 = base64
    .replace(/\-/g, '+') // Convert '-' to '+'
    .replace(/\_/g, '/'); // Convert '_' to '/'

  return new Buffer(base64, 'base64');

};

/**
 * .validate
 *
 * Validates a string if it is URL Safe Base64 encoded.
 *
 * @param {String} 
 * @return {Boolean}
 * @api public
 */

exports.validate = function validate(base64) {

  return /^[A-Za-z0-9\-_]+$/.test(base64);

};
},{"__browserify_Buffer":12}],7:[function(require,module,exports){
var process=require("__browserify_process");/* parser generated by jison 0.4.13 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"opt_block":4,"EOF":5,"block":6,"command":7,"pushInt":8,"pushChar":9,"add":10,"subtract":11,"multiply":12,"quotient":13,"negate":14,"equal":15,"greater":16,"and":17,"or":18,"not":19,"duplicate":20,"delete":21,"swap":22,"rotate":23,"pick":24,"putInt":25,"putChar":26,"putString":27,"getChar":28,"pushSubroutine":29,"runSubroutine":30,"if":31,"while":32,"flush":33,"varAssign":34,"varRead":35,"random":36,"INT_LITERAL":37,"CHAR_LITERAL":38,"+":39,"-":40,"*":41,"/":42,"_":43,"=":44,">":45,"&":46,"|":47,"~":48,"$":49,"%":50,"\\":51,"@":52,"ø":53,".":54,",":55,"STRING_LITERAL":56,"^":57,"[":58,"]":59,"!":60,"?":61,"#":62,"ß":63,"VAR":64,":":65,";":66,"∆":67,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",37:"INT_LITERAL",38:"CHAR_LITERAL",39:"+",40:"-",41:"*",42:"/",43:"_",44:"=",45:">",46:"&",47:"|",48:"~",49:"$",50:"%",51:"\\",52:"@",53:"ø",54:".",55:",",56:"STRING_LITERAL",57:"^",58:"[",59:"]",60:"!",61:"?",62:"#",63:"ß",64:"VAR",65:":",66:";",67:"∆"},
productions_: [0,[3,2],[4,1],[4,0],[6,2],[6,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[15,1],[16,1],[17,1],[18,1],[19,1],[20,1],[21,1],[22,1],[23,1],[24,1],[25,1],[26,1],[27,1],[28,1],[29,3],[30,1],[31,1],[32,1],[33,1],[34,2],[35,2],[36,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: return new $t.Program($$[$0-1]); 
break;
case 3: this.$ = annotate(new $t.Block([]), this._$); 
break;
case 4: $$[$0-1].commands.push($$[$0]); 
break;
case 5: this.$ = annotate(new $t.Block([$$[$0]]), this._$); 
break;
case 35: this.$ = annotate(new $t.PushInt(toInt($$[$0])), this._$); 
break;
case 36: this.$ = annotate(new $t.PushChar($$[$0]), this._$); 
break;
case 37: this.$ = annotate(new $t.Add(), this._$); 
break;
case 38: this.$ = annotate(new $t.Subtract(), this._$); 
break;
case 39: this.$ = annotate(new $t.Multiply(), this._$); 
break;
case 40: this.$ = annotate(new $t.Quotient(), this._$); 
break;
case 41: this.$ = annotate(new $t.Negate(), this._$); 
break;
case 42: this.$ = annotate(new $t.Equal(), this._$); 
break;
case 43: this.$ = annotate(new $t.Greater(), this._$); 
break;
case 44: this.$ = annotate(new $t.And(), this._$); 
break;
case 45: this.$ = annotate(new $t.Or(), this._$); 
break;
case 46: this.$ = annotate(new $t.Not(), this._$); 
break;
case 47: this.$ = annotate(new $t.Duplicate(), this._$); 
break;
case 48: this.$ = annotate(new $t.Delete(), this._$); 
break;
case 49: this.$ = annotate(new $t.Swap(), this._$); 
break;
case 50: this.$ = annotate(new $t.Rotate(), this._$); 
break;
case 51: this.$ = annotate(new $t.Pick(), this._$); 
break;
case 52: this.$ = annotate(new $t.PutInt(), this._$); 
break;
case 53: this.$ = annotate(new $t.PutChar(), this._$); 
break;
case 54: this.$ = annotate(new $t.PutString($$[$0]), this._$); 
break;
case 55: this.$ = annotate(new $t.GetChar(), this._$); 
break;
case 56: this.$ = annotate(new $t.PushSubroutine($$[$0-1]), this._$); 
break;
case 57: this.$ = annotate(new $t.RunSubroutine(), this._$); 
break;
case 58: this.$ = annotate(new $t.If(), this._$); 
break;
case 59: this.$ = annotate(new $t.While(), this._$); 
break;
case 60: this.$ = annotate(new $t.Flush(), this._$); 
break;
case 61: this.$ = annotate(new $t.AssignVar($$[$0-1]), this._$); 
break;
case 62: this.$ = annotate(new $t.ReadVar($$[$0-1]), this._$); 
break;
case 63: this.$ = annotate(new $t.Random(), this._$); 
break;
}
},
table: [{3:1,4:2,5:[2,3],6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,25:22,26:23,27:24,28:25,29:26,30:27,31:28,32:29,33:30,34:31,35:32,36:33,37:[1,34],38:[1,35],39:[1,36],40:[1,37],41:[1,38],42:[1,39],43:[1,40],44:[1,41],45:[1,42],46:[1,43],47:[1,44],48:[1,45],49:[1,46],50:[1,47],51:[1,48],52:[1,49],53:[1,50],54:[1,51],55:[1,52],56:[1,53],57:[1,54],58:[1,55],60:[1,56],61:[1,57],62:[1,58],63:[1,59],64:[1,60],67:[1,61]},{1:[3]},{5:[1,62]},{5:[2,2],7:63,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,25:22,26:23,27:24,28:25,29:26,30:27,31:28,32:29,33:30,34:31,35:32,36:33,37:[1,34],38:[1,35],39:[1,36],40:[1,37],41:[1,38],42:[1,39],43:[1,40],44:[1,41],45:[1,42],46:[1,43],47:[1,44],48:[1,45],49:[1,46],50:[1,47],51:[1,48],52:[1,49],53:[1,50],54:[1,51],55:[1,52],56:[1,53],57:[1,54],58:[1,55],59:[2,2],60:[1,56],61:[1,57],62:[1,58],63:[1,59],64:[1,60],67:[1,61]},{5:[2,5],37:[2,5],38:[2,5],39:[2,5],40:[2,5],41:[2,5],42:[2,5],43:[2,5],44:[2,5],45:[2,5],46:[2,5],47:[2,5],48:[2,5],49:[2,5],50:[2,5],51:[2,5],52:[2,5],53:[2,5],54:[2,5],55:[2,5],56:[2,5],57:[2,5],58:[2,5],59:[2,5],60:[2,5],61:[2,5],62:[2,5],63:[2,5],64:[2,5],67:[2,5]},{5:[2,6],37:[2,6],38:[2,6],39:[2,6],40:[2,6],41:[2,6],42:[2,6],43:[2,6],44:[2,6],45:[2,6],46:[2,6],47:[2,6],48:[2,6],49:[2,6],50:[2,6],51:[2,6],52:[2,6],53:[2,6],54:[2,6],55:[2,6],56:[2,6],57:[2,6],58:[2,6],59:[2,6],60:[2,6],61:[2,6],62:[2,6],63:[2,6],64:[2,6],67:[2,6]},{5:[2,7],37:[2,7],38:[2,7],39:[2,7],40:[2,7],41:[2,7],42:[2,7],43:[2,7],44:[2,7],45:[2,7],46:[2,7],47:[2,7],48:[2,7],49:[2,7],50:[2,7],51:[2,7],52:[2,7],53:[2,7],54:[2,7],55:[2,7],56:[2,7],57:[2,7],58:[2,7],59:[2,7],60:[2,7],61:[2,7],62:[2,7],63:[2,7],64:[2,7],67:[2,7]},{5:[2,8],37:[2,8],38:[2,8],39:[2,8],40:[2,8],41:[2,8],42:[2,8],43:[2,8],44:[2,8],45:[2,8],46:[2,8],47:[2,8],48:[2,8],49:[2,8],50:[2,8],51:[2,8],52:[2,8],53:[2,8],54:[2,8],55:[2,8],56:[2,8],57:[2,8],58:[2,8],59:[2,8],60:[2,8],61:[2,8],62:[2,8],63:[2,8],64:[2,8],67:[2,8]},{5:[2,9],37:[2,9],38:[2,9],39:[2,9],40:[2,9],41:[2,9],42:[2,9],43:[2,9],44:[2,9],45:[2,9],46:[2,9],47:[2,9],48:[2,9],49:[2,9],50:[2,9],51:[2,9],52:[2,9],53:[2,9],54:[2,9],55:[2,9],56:[2,9],57:[2,9],58:[2,9],59:[2,9],60:[2,9],61:[2,9],62:[2,9],63:[2,9],64:[2,9],67:[2,9]},{5:[2,10],37:[2,10],38:[2,10],39:[2,10],40:[2,10],41:[2,10],42:[2,10],43:[2,10],44:[2,10],45:[2,10],46:[2,10],47:[2,10],48:[2,10],49:[2,10],50:[2,10],51:[2,10],52:[2,10],53:[2,10],54:[2,10],55:[2,10],56:[2,10],57:[2,10],58:[2,10],59:[2,10],60:[2,10],61:[2,10],62:[2,10],63:[2,10],64:[2,10],67:[2,10]},{5:[2,11],37:[2,11],38:[2,11],39:[2,11],40:[2,11],41:[2,11],42:[2,11],43:[2,11],44:[2,11],45:[2,11],46:[2,11],47:[2,11],48:[2,11],49:[2,11],50:[2,11],51:[2,11],52:[2,11],53:[2,11],54:[2,11],55:[2,11],56:[2,11],57:[2,11],58:[2,11],59:[2,11],60:[2,11],61:[2,11],62:[2,11],63:[2,11],64:[2,11],67:[2,11]},{5:[2,12],37:[2,12],38:[2,12],39:[2,12],40:[2,12],41:[2,12],42:[2,12],43:[2,12],44:[2,12],45:[2,12],46:[2,12],47:[2,12],48:[2,12],49:[2,12],50:[2,12],51:[2,12],52:[2,12],53:[2,12],54:[2,12],55:[2,12],56:[2,12],57:[2,12],58:[2,12],59:[2,12],60:[2,12],61:[2,12],62:[2,12],63:[2,12],64:[2,12],67:[2,12]},{5:[2,13],37:[2,13],38:[2,13],39:[2,13],40:[2,13],41:[2,13],42:[2,13],43:[2,13],44:[2,13],45:[2,13],46:[2,13],47:[2,13],48:[2,13],49:[2,13],50:[2,13],51:[2,13],52:[2,13],53:[2,13],54:[2,13],55:[2,13],56:[2,13],57:[2,13],58:[2,13],59:[2,13],60:[2,13],61:[2,13],62:[2,13],63:[2,13],64:[2,13],67:[2,13]},{5:[2,14],37:[2,14],38:[2,14],39:[2,14],40:[2,14],41:[2,14],42:[2,14],43:[2,14],44:[2,14],45:[2,14],46:[2,14],47:[2,14],48:[2,14],49:[2,14],50:[2,14],51:[2,14],52:[2,14],53:[2,14],54:[2,14],55:[2,14],56:[2,14],57:[2,14],58:[2,14],59:[2,14],60:[2,14],61:[2,14],62:[2,14],63:[2,14],64:[2,14],67:[2,14]},{5:[2,15],37:[2,15],38:[2,15],39:[2,15],40:[2,15],41:[2,15],42:[2,15],43:[2,15],44:[2,15],45:[2,15],46:[2,15],47:[2,15],48:[2,15],49:[2,15],50:[2,15],51:[2,15],52:[2,15],53:[2,15],54:[2,15],55:[2,15],56:[2,15],57:[2,15],58:[2,15],59:[2,15],60:[2,15],61:[2,15],62:[2,15],63:[2,15],64:[2,15],67:[2,15]},{5:[2,16],37:[2,16],38:[2,16],39:[2,16],40:[2,16],41:[2,16],42:[2,16],43:[2,16],44:[2,16],45:[2,16],46:[2,16],47:[2,16],48:[2,16],49:[2,16],50:[2,16],51:[2,16],52:[2,16],53:[2,16],54:[2,16],55:[2,16],56:[2,16],57:[2,16],58:[2,16],59:[2,16],60:[2,16],61:[2,16],62:[2,16],63:[2,16],64:[2,16],67:[2,16]},{5:[2,17],37:[2,17],38:[2,17],39:[2,17],40:[2,17],41:[2,17],42:[2,17],43:[2,17],44:[2,17],45:[2,17],46:[2,17],47:[2,17],48:[2,17],49:[2,17],50:[2,17],51:[2,17],52:[2,17],53:[2,17],54:[2,17],55:[2,17],56:[2,17],57:[2,17],58:[2,17],59:[2,17],60:[2,17],61:[2,17],62:[2,17],63:[2,17],64:[2,17],67:[2,17]},{5:[2,18],37:[2,18],38:[2,18],39:[2,18],40:[2,18],41:[2,18],42:[2,18],43:[2,18],44:[2,18],45:[2,18],46:[2,18],47:[2,18],48:[2,18],49:[2,18],50:[2,18],51:[2,18],52:[2,18],53:[2,18],54:[2,18],55:[2,18],56:[2,18],57:[2,18],58:[2,18],59:[2,18],60:[2,18],61:[2,18],62:[2,18],63:[2,18],64:[2,18],67:[2,18]},{5:[2,19],37:[2,19],38:[2,19],39:[2,19],40:[2,19],41:[2,19],42:[2,19],43:[2,19],44:[2,19],45:[2,19],46:[2,19],47:[2,19],48:[2,19],49:[2,19],50:[2,19],51:[2,19],52:[2,19],53:[2,19],54:[2,19],55:[2,19],56:[2,19],57:[2,19],58:[2,19],59:[2,19],60:[2,19],61:[2,19],62:[2,19],63:[2,19],64:[2,19],67:[2,19]},{5:[2,20],37:[2,20],38:[2,20],39:[2,20],40:[2,20],41:[2,20],42:[2,20],43:[2,20],44:[2,20],45:[2,20],46:[2,20],47:[2,20],48:[2,20],49:[2,20],50:[2,20],51:[2,20],52:[2,20],53:[2,20],54:[2,20],55:[2,20],56:[2,20],57:[2,20],58:[2,20],59:[2,20],60:[2,20],61:[2,20],62:[2,20],63:[2,20],64:[2,20],67:[2,20]},{5:[2,21],37:[2,21],38:[2,21],39:[2,21],40:[2,21],41:[2,21],42:[2,21],43:[2,21],44:[2,21],45:[2,21],46:[2,21],47:[2,21],48:[2,21],49:[2,21],50:[2,21],51:[2,21],52:[2,21],53:[2,21],54:[2,21],55:[2,21],56:[2,21],57:[2,21],58:[2,21],59:[2,21],60:[2,21],61:[2,21],62:[2,21],63:[2,21],64:[2,21],67:[2,21]},{5:[2,22],37:[2,22],38:[2,22],39:[2,22],40:[2,22],41:[2,22],42:[2,22],43:[2,22],44:[2,22],45:[2,22],46:[2,22],47:[2,22],48:[2,22],49:[2,22],50:[2,22],51:[2,22],52:[2,22],53:[2,22],54:[2,22],55:[2,22],56:[2,22],57:[2,22],58:[2,22],59:[2,22],60:[2,22],61:[2,22],62:[2,22],63:[2,22],64:[2,22],67:[2,22]},{5:[2,23],37:[2,23],38:[2,23],39:[2,23],40:[2,23],41:[2,23],42:[2,23],43:[2,23],44:[2,23],45:[2,23],46:[2,23],47:[2,23],48:[2,23],49:[2,23],50:[2,23],51:[2,23],52:[2,23],53:[2,23],54:[2,23],55:[2,23],56:[2,23],57:[2,23],58:[2,23],59:[2,23],60:[2,23],61:[2,23],62:[2,23],63:[2,23],64:[2,23],67:[2,23]},{5:[2,24],37:[2,24],38:[2,24],39:[2,24],40:[2,24],41:[2,24],42:[2,24],43:[2,24],44:[2,24],45:[2,24],46:[2,24],47:[2,24],48:[2,24],49:[2,24],50:[2,24],51:[2,24],52:[2,24],53:[2,24],54:[2,24],55:[2,24],56:[2,24],57:[2,24],58:[2,24],59:[2,24],60:[2,24],61:[2,24],62:[2,24],63:[2,24],64:[2,24],67:[2,24]},{5:[2,25],37:[2,25],38:[2,25],39:[2,25],40:[2,25],41:[2,25],42:[2,25],43:[2,25],44:[2,25],45:[2,25],46:[2,25],47:[2,25],48:[2,25],49:[2,25],50:[2,25],51:[2,25],52:[2,25],53:[2,25],54:[2,25],55:[2,25],56:[2,25],57:[2,25],58:[2,25],59:[2,25],60:[2,25],61:[2,25],62:[2,25],63:[2,25],64:[2,25],67:[2,25]},{5:[2,26],37:[2,26],38:[2,26],39:[2,26],40:[2,26],41:[2,26],42:[2,26],43:[2,26],44:[2,26],45:[2,26],46:[2,26],47:[2,26],48:[2,26],49:[2,26],50:[2,26],51:[2,26],52:[2,26],53:[2,26],54:[2,26],55:[2,26],56:[2,26],57:[2,26],58:[2,26],59:[2,26],60:[2,26],61:[2,26],62:[2,26],63:[2,26],64:[2,26],67:[2,26]},{5:[2,27],37:[2,27],38:[2,27],39:[2,27],40:[2,27],41:[2,27],42:[2,27],43:[2,27],44:[2,27],45:[2,27],46:[2,27],47:[2,27],48:[2,27],49:[2,27],50:[2,27],51:[2,27],52:[2,27],53:[2,27],54:[2,27],55:[2,27],56:[2,27],57:[2,27],58:[2,27],59:[2,27],60:[2,27],61:[2,27],62:[2,27],63:[2,27],64:[2,27],67:[2,27]},{5:[2,28],37:[2,28],38:[2,28],39:[2,28],40:[2,28],41:[2,28],42:[2,28],43:[2,28],44:[2,28],45:[2,28],46:[2,28],47:[2,28],48:[2,28],49:[2,28],50:[2,28],51:[2,28],52:[2,28],53:[2,28],54:[2,28],55:[2,28],56:[2,28],57:[2,28],58:[2,28],59:[2,28],60:[2,28],61:[2,28],62:[2,28],63:[2,28],64:[2,28],67:[2,28]},{5:[2,29],37:[2,29],38:[2,29],39:[2,29],40:[2,29],41:[2,29],42:[2,29],43:[2,29],44:[2,29],45:[2,29],46:[2,29],47:[2,29],48:[2,29],49:[2,29],50:[2,29],51:[2,29],52:[2,29],53:[2,29],54:[2,29],55:[2,29],56:[2,29],57:[2,29],58:[2,29],59:[2,29],60:[2,29],61:[2,29],62:[2,29],63:[2,29],64:[2,29],67:[2,29]},{5:[2,30],37:[2,30],38:[2,30],39:[2,30],40:[2,30],41:[2,30],42:[2,30],43:[2,30],44:[2,30],45:[2,30],46:[2,30],47:[2,30],48:[2,30],49:[2,30],50:[2,30],51:[2,30],52:[2,30],53:[2,30],54:[2,30],55:[2,30],56:[2,30],57:[2,30],58:[2,30],59:[2,30],60:[2,30],61:[2,30],62:[2,30],63:[2,30],64:[2,30],67:[2,30]},{5:[2,31],37:[2,31],38:[2,31],39:[2,31],40:[2,31],41:[2,31],42:[2,31],43:[2,31],44:[2,31],45:[2,31],46:[2,31],47:[2,31],48:[2,31],49:[2,31],50:[2,31],51:[2,31],52:[2,31],53:[2,31],54:[2,31],55:[2,31],56:[2,31],57:[2,31],58:[2,31],59:[2,31],60:[2,31],61:[2,31],62:[2,31],63:[2,31],64:[2,31],67:[2,31]},{5:[2,32],37:[2,32],38:[2,32],39:[2,32],40:[2,32],41:[2,32],42:[2,32],43:[2,32],44:[2,32],45:[2,32],46:[2,32],47:[2,32],48:[2,32],49:[2,32],50:[2,32],51:[2,32],52:[2,32],53:[2,32],54:[2,32],55:[2,32],56:[2,32],57:[2,32],58:[2,32],59:[2,32],60:[2,32],61:[2,32],62:[2,32],63:[2,32],64:[2,32],67:[2,32]},{5:[2,33],37:[2,33],38:[2,33],39:[2,33],40:[2,33],41:[2,33],42:[2,33],43:[2,33],44:[2,33],45:[2,33],46:[2,33],47:[2,33],48:[2,33],49:[2,33],50:[2,33],51:[2,33],52:[2,33],53:[2,33],54:[2,33],55:[2,33],56:[2,33],57:[2,33],58:[2,33],59:[2,33],60:[2,33],61:[2,33],62:[2,33],63:[2,33],64:[2,33],67:[2,33]},{5:[2,34],37:[2,34],38:[2,34],39:[2,34],40:[2,34],41:[2,34],42:[2,34],43:[2,34],44:[2,34],45:[2,34],46:[2,34],47:[2,34],48:[2,34],49:[2,34],50:[2,34],51:[2,34],52:[2,34],53:[2,34],54:[2,34],55:[2,34],56:[2,34],57:[2,34],58:[2,34],59:[2,34],60:[2,34],61:[2,34],62:[2,34],63:[2,34],64:[2,34],67:[2,34]},{5:[2,35],37:[2,35],38:[2,35],39:[2,35],40:[2,35],41:[2,35],42:[2,35],43:[2,35],44:[2,35],45:[2,35],46:[2,35],47:[2,35],48:[2,35],49:[2,35],50:[2,35],51:[2,35],52:[2,35],53:[2,35],54:[2,35],55:[2,35],56:[2,35],57:[2,35],58:[2,35],59:[2,35],60:[2,35],61:[2,35],62:[2,35],63:[2,35],64:[2,35],67:[2,35]},{5:[2,36],37:[2,36],38:[2,36],39:[2,36],40:[2,36],41:[2,36],42:[2,36],43:[2,36],44:[2,36],45:[2,36],46:[2,36],47:[2,36],48:[2,36],49:[2,36],50:[2,36],51:[2,36],52:[2,36],53:[2,36],54:[2,36],55:[2,36],56:[2,36],57:[2,36],58:[2,36],59:[2,36],60:[2,36],61:[2,36],62:[2,36],63:[2,36],64:[2,36],67:[2,36]},{5:[2,37],37:[2,37],38:[2,37],39:[2,37],40:[2,37],41:[2,37],42:[2,37],43:[2,37],44:[2,37],45:[2,37],46:[2,37],47:[2,37],48:[2,37],49:[2,37],50:[2,37],51:[2,37],52:[2,37],53:[2,37],54:[2,37],55:[2,37],56:[2,37],57:[2,37],58:[2,37],59:[2,37],60:[2,37],61:[2,37],62:[2,37],63:[2,37],64:[2,37],67:[2,37]},{5:[2,38],37:[2,38],38:[2,38],39:[2,38],40:[2,38],41:[2,38],42:[2,38],43:[2,38],44:[2,38],45:[2,38],46:[2,38],47:[2,38],48:[2,38],49:[2,38],50:[2,38],51:[2,38],52:[2,38],53:[2,38],54:[2,38],55:[2,38],56:[2,38],57:[2,38],58:[2,38],59:[2,38],60:[2,38],61:[2,38],62:[2,38],63:[2,38],64:[2,38],67:[2,38]},{5:[2,39],37:[2,39],38:[2,39],39:[2,39],40:[2,39],41:[2,39],42:[2,39],43:[2,39],44:[2,39],45:[2,39],46:[2,39],47:[2,39],48:[2,39],49:[2,39],50:[2,39],51:[2,39],52:[2,39],53:[2,39],54:[2,39],55:[2,39],56:[2,39],57:[2,39],58:[2,39],59:[2,39],60:[2,39],61:[2,39],62:[2,39],63:[2,39],64:[2,39],67:[2,39]},{5:[2,40],37:[2,40],38:[2,40],39:[2,40],40:[2,40],41:[2,40],42:[2,40],43:[2,40],44:[2,40],45:[2,40],46:[2,40],47:[2,40],48:[2,40],49:[2,40],50:[2,40],51:[2,40],52:[2,40],53:[2,40],54:[2,40],55:[2,40],56:[2,40],57:[2,40],58:[2,40],59:[2,40],60:[2,40],61:[2,40],62:[2,40],63:[2,40],64:[2,40],67:[2,40]},{5:[2,41],37:[2,41],38:[2,41],39:[2,41],40:[2,41],41:[2,41],42:[2,41],43:[2,41],44:[2,41],45:[2,41],46:[2,41],47:[2,41],48:[2,41],49:[2,41],50:[2,41],51:[2,41],52:[2,41],53:[2,41],54:[2,41],55:[2,41],56:[2,41],57:[2,41],58:[2,41],59:[2,41],60:[2,41],61:[2,41],62:[2,41],63:[2,41],64:[2,41],67:[2,41]},{5:[2,42],37:[2,42],38:[2,42],39:[2,42],40:[2,42],41:[2,42],42:[2,42],43:[2,42],44:[2,42],45:[2,42],46:[2,42],47:[2,42],48:[2,42],49:[2,42],50:[2,42],51:[2,42],52:[2,42],53:[2,42],54:[2,42],55:[2,42],56:[2,42],57:[2,42],58:[2,42],59:[2,42],60:[2,42],61:[2,42],62:[2,42],63:[2,42],64:[2,42],67:[2,42]},{5:[2,43],37:[2,43],38:[2,43],39:[2,43],40:[2,43],41:[2,43],42:[2,43],43:[2,43],44:[2,43],45:[2,43],46:[2,43],47:[2,43],48:[2,43],49:[2,43],50:[2,43],51:[2,43],52:[2,43],53:[2,43],54:[2,43],55:[2,43],56:[2,43],57:[2,43],58:[2,43],59:[2,43],60:[2,43],61:[2,43],62:[2,43],63:[2,43],64:[2,43],67:[2,43]},{5:[2,44],37:[2,44],38:[2,44],39:[2,44],40:[2,44],41:[2,44],42:[2,44],43:[2,44],44:[2,44],45:[2,44],46:[2,44],47:[2,44],48:[2,44],49:[2,44],50:[2,44],51:[2,44],52:[2,44],53:[2,44],54:[2,44],55:[2,44],56:[2,44],57:[2,44],58:[2,44],59:[2,44],60:[2,44],61:[2,44],62:[2,44],63:[2,44],64:[2,44],67:[2,44]},{5:[2,45],37:[2,45],38:[2,45],39:[2,45],40:[2,45],41:[2,45],42:[2,45],43:[2,45],44:[2,45],45:[2,45],46:[2,45],47:[2,45],48:[2,45],49:[2,45],50:[2,45],51:[2,45],52:[2,45],53:[2,45],54:[2,45],55:[2,45],56:[2,45],57:[2,45],58:[2,45],59:[2,45],60:[2,45],61:[2,45],62:[2,45],63:[2,45],64:[2,45],67:[2,45]},{5:[2,46],37:[2,46],38:[2,46],39:[2,46],40:[2,46],41:[2,46],42:[2,46],43:[2,46],44:[2,46],45:[2,46],46:[2,46],47:[2,46],48:[2,46],49:[2,46],50:[2,46],51:[2,46],52:[2,46],53:[2,46],54:[2,46],55:[2,46],56:[2,46],57:[2,46],58:[2,46],59:[2,46],60:[2,46],61:[2,46],62:[2,46],63:[2,46],64:[2,46],67:[2,46]},{5:[2,47],37:[2,47],38:[2,47],39:[2,47],40:[2,47],41:[2,47],42:[2,47],43:[2,47],44:[2,47],45:[2,47],46:[2,47],47:[2,47],48:[2,47],49:[2,47],50:[2,47],51:[2,47],52:[2,47],53:[2,47],54:[2,47],55:[2,47],56:[2,47],57:[2,47],58:[2,47],59:[2,47],60:[2,47],61:[2,47],62:[2,47],63:[2,47],64:[2,47],67:[2,47]},{5:[2,48],37:[2,48],38:[2,48],39:[2,48],40:[2,48],41:[2,48],42:[2,48],43:[2,48],44:[2,48],45:[2,48],46:[2,48],47:[2,48],48:[2,48],49:[2,48],50:[2,48],51:[2,48],52:[2,48],53:[2,48],54:[2,48],55:[2,48],56:[2,48],57:[2,48],58:[2,48],59:[2,48],60:[2,48],61:[2,48],62:[2,48],63:[2,48],64:[2,48],67:[2,48]},{5:[2,49],37:[2,49],38:[2,49],39:[2,49],40:[2,49],41:[2,49],42:[2,49],43:[2,49],44:[2,49],45:[2,49],46:[2,49],47:[2,49],48:[2,49],49:[2,49],50:[2,49],51:[2,49],52:[2,49],53:[2,49],54:[2,49],55:[2,49],56:[2,49],57:[2,49],58:[2,49],59:[2,49],60:[2,49],61:[2,49],62:[2,49],63:[2,49],64:[2,49],67:[2,49]},{5:[2,50],37:[2,50],38:[2,50],39:[2,50],40:[2,50],41:[2,50],42:[2,50],43:[2,50],44:[2,50],45:[2,50],46:[2,50],47:[2,50],48:[2,50],49:[2,50],50:[2,50],51:[2,50],52:[2,50],53:[2,50],54:[2,50],55:[2,50],56:[2,50],57:[2,50],58:[2,50],59:[2,50],60:[2,50],61:[2,50],62:[2,50],63:[2,50],64:[2,50],67:[2,50]},{5:[2,51],37:[2,51],38:[2,51],39:[2,51],40:[2,51],41:[2,51],42:[2,51],43:[2,51],44:[2,51],45:[2,51],46:[2,51],47:[2,51],48:[2,51],49:[2,51],50:[2,51],51:[2,51],52:[2,51],53:[2,51],54:[2,51],55:[2,51],56:[2,51],57:[2,51],58:[2,51],59:[2,51],60:[2,51],61:[2,51],62:[2,51],63:[2,51],64:[2,51],67:[2,51]},{5:[2,52],37:[2,52],38:[2,52],39:[2,52],40:[2,52],41:[2,52],42:[2,52],43:[2,52],44:[2,52],45:[2,52],46:[2,52],47:[2,52],48:[2,52],49:[2,52],50:[2,52],51:[2,52],52:[2,52],53:[2,52],54:[2,52],55:[2,52],56:[2,52],57:[2,52],58:[2,52],59:[2,52],60:[2,52],61:[2,52],62:[2,52],63:[2,52],64:[2,52],67:[2,52]},{5:[2,53],37:[2,53],38:[2,53],39:[2,53],40:[2,53],41:[2,53],42:[2,53],43:[2,53],44:[2,53],45:[2,53],46:[2,53],47:[2,53],48:[2,53],49:[2,53],50:[2,53],51:[2,53],52:[2,53],53:[2,53],54:[2,53],55:[2,53],56:[2,53],57:[2,53],58:[2,53],59:[2,53],60:[2,53],61:[2,53],62:[2,53],63:[2,53],64:[2,53],67:[2,53]},{5:[2,54],37:[2,54],38:[2,54],39:[2,54],40:[2,54],41:[2,54],42:[2,54],43:[2,54],44:[2,54],45:[2,54],46:[2,54],47:[2,54],48:[2,54],49:[2,54],50:[2,54],51:[2,54],52:[2,54],53:[2,54],54:[2,54],55:[2,54],56:[2,54],57:[2,54],58:[2,54],59:[2,54],60:[2,54],61:[2,54],62:[2,54],63:[2,54],64:[2,54],67:[2,54]},{5:[2,55],37:[2,55],38:[2,55],39:[2,55],40:[2,55],41:[2,55],42:[2,55],43:[2,55],44:[2,55],45:[2,55],46:[2,55],47:[2,55],48:[2,55],49:[2,55],50:[2,55],51:[2,55],52:[2,55],53:[2,55],54:[2,55],55:[2,55],56:[2,55],57:[2,55],58:[2,55],59:[2,55],60:[2,55],61:[2,55],62:[2,55],63:[2,55],64:[2,55],67:[2,55]},{4:64,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,25:22,26:23,27:24,28:25,29:26,30:27,31:28,32:29,33:30,34:31,35:32,36:33,37:[1,34],38:[1,35],39:[1,36],40:[1,37],41:[1,38],42:[1,39],43:[1,40],44:[1,41],45:[1,42],46:[1,43],47:[1,44],48:[1,45],49:[1,46],50:[1,47],51:[1,48],52:[1,49],53:[1,50],54:[1,51],55:[1,52],56:[1,53],57:[1,54],58:[1,55],59:[2,3],60:[1,56],61:[1,57],62:[1,58],63:[1,59],64:[1,60],67:[1,61]},{5:[2,57],37:[2,57],38:[2,57],39:[2,57],40:[2,57],41:[2,57],42:[2,57],43:[2,57],44:[2,57],45:[2,57],46:[2,57],47:[2,57],48:[2,57],49:[2,57],50:[2,57],51:[2,57],52:[2,57],53:[2,57],54:[2,57],55:[2,57],56:[2,57],57:[2,57],58:[2,57],59:[2,57],60:[2,57],61:[2,57],62:[2,57],63:[2,57],64:[2,57],67:[2,57]},{5:[2,58],37:[2,58],38:[2,58],39:[2,58],40:[2,58],41:[2,58],42:[2,58],43:[2,58],44:[2,58],45:[2,58],46:[2,58],47:[2,58],48:[2,58],49:[2,58],50:[2,58],51:[2,58],52:[2,58],53:[2,58],54:[2,58],55:[2,58],56:[2,58],57:[2,58],58:[2,58],59:[2,58],60:[2,58],61:[2,58],62:[2,58],63:[2,58],64:[2,58],67:[2,58]},{5:[2,59],37:[2,59],38:[2,59],39:[2,59],40:[2,59],41:[2,59],42:[2,59],43:[2,59],44:[2,59],45:[2,59],46:[2,59],47:[2,59],48:[2,59],49:[2,59],50:[2,59],51:[2,59],52:[2,59],53:[2,59],54:[2,59],55:[2,59],56:[2,59],57:[2,59],58:[2,59],59:[2,59],60:[2,59],61:[2,59],62:[2,59],63:[2,59],64:[2,59],67:[2,59]},{5:[2,60],37:[2,60],38:[2,60],39:[2,60],40:[2,60],41:[2,60],42:[2,60],43:[2,60],44:[2,60],45:[2,60],46:[2,60],47:[2,60],48:[2,60],49:[2,60],50:[2,60],51:[2,60],52:[2,60],53:[2,60],54:[2,60],55:[2,60],56:[2,60],57:[2,60],58:[2,60],59:[2,60],60:[2,60],61:[2,60],62:[2,60],63:[2,60],64:[2,60],67:[2,60]},{65:[1,65],66:[1,66]},{5:[2,63],37:[2,63],38:[2,63],39:[2,63],40:[2,63],41:[2,63],42:[2,63],43:[2,63],44:[2,63],45:[2,63],46:[2,63],47:[2,63],48:[2,63],49:[2,63],50:[2,63],51:[2,63],52:[2,63],53:[2,63],54:[2,63],55:[2,63],56:[2,63],57:[2,63],58:[2,63],59:[2,63],60:[2,63],61:[2,63],62:[2,63],63:[2,63],64:[2,63],67:[2,63]},{1:[2,1]},{5:[2,4],37:[2,4],38:[2,4],39:[2,4],40:[2,4],41:[2,4],42:[2,4],43:[2,4],44:[2,4],45:[2,4],46:[2,4],47:[2,4],48:[2,4],49:[2,4],50:[2,4],51:[2,4],52:[2,4],53:[2,4],54:[2,4],55:[2,4],56:[2,4],57:[2,4],58:[2,4],59:[2,4],60:[2,4],61:[2,4],62:[2,4],63:[2,4],64:[2,4],67:[2,4]},{59:[1,67]},{5:[2,61],37:[2,61],38:[2,61],39:[2,61],40:[2,61],41:[2,61],42:[2,61],43:[2,61],44:[2,61],45:[2,61],46:[2,61],47:[2,61],48:[2,61],49:[2,61],50:[2,61],51:[2,61],52:[2,61],53:[2,61],54:[2,61],55:[2,61],56:[2,61],57:[2,61],58:[2,61],59:[2,61],60:[2,61],61:[2,61],62:[2,61],63:[2,61],64:[2,61],67:[2,61]},{5:[2,62],37:[2,62],38:[2,62],39:[2,62],40:[2,62],41:[2,62],42:[2,62],43:[2,62],44:[2,62],45:[2,62],46:[2,62],47:[2,62],48:[2,62],49:[2,62],50:[2,62],51:[2,62],52:[2,62],53:[2,62],54:[2,62],55:[2,62],56:[2,62],57:[2,62],58:[2,62],59:[2,62],60:[2,62],61:[2,62],62:[2,62],63:[2,62],64:[2,62],67:[2,62]},{5:[2,56],37:[2,56],38:[2,56],39:[2,56],40:[2,56],41:[2,56],42:[2,56],43:[2,56],44:[2,56],45:[2,56],46:[2,56],47:[2,56],48:[2,56],49:[2,56],50:[2,56],51:[2,56],52:[2,56],53:[2,56],54:[2,56],55:[2,56],56:[2,56],57:[2,56],58:[2,56],59:[2,56],60:[2,56],61:[2,56],62:[2,56],63:[2,56],64:[2,56],67:[2,56]}],
defaultActions: {62:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                this.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

  var $t = require('./true');
  var string = '';


function toInt(o) {
  return parseInt(o, 10);
}

function annotate(obj, loc) {
  // 0-based inclusive row/column numbers.
  obj.source = {
    row: {
      start: loc.first_line - 1,
      end: loc.last_line - 1
    },
    column: {
      start: loc.first_column,
      end: loc.last_column - 1
    },
    start: loc.range[0],
    end: loc.range[1]
  };
  return obj;
}
/* generated by jison-lex 0.2.1 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"ranges":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:this.begin('comment');
break;
case 1:this.popState();
break;
case 2:this.begin('string'); string = '';
break;
case 3:string += '"';
break;
case 4:string += '\\';
break;
case 5:string += '\r';
break;
case 6:string += '\n';
break;
case 7:string += '\t';
break;
case 8:
                        this.popState();
                        yy_.yytext = string;
                        return 56;
                      
break;
case 9:string += yy_.yytext;
break;
case 10:return 64;
break;
case 11:/* Skip whitespace. */
break;
case 12:yy_.yytext = '\\'; return 38;
break;
case 13:yy_.yytext = '\r'; return 38;
break;
case 14:yy_.yytext = '\n'; return 38;
break;
case 15:yy_.yytext = '\t'; return 38;
break;
case 16:yy_.yytext = yy_.yytext[1]; return 38;
break;
case 17:return 37;
break;
case 18:return 5;
break;
case 19:return yy_.yytext[0];
break;
}
},
rules: [/^(?:\{)/,/^(?:[^}]+\})/,/^(?:")/,/^(?:\\")/,/^(?:\\\\)/,/^(?:\\r)/,/^(?:\\n)/,/^(?:\\t)/,/^(?:")/,/^(?:.|\n)/,/^(?:[A-Za-z]+)/,/^(?:\s+)/,/^(?:'\\\\)/,/^(?:'\\r)/,/^(?:'\\n)/,/^(?:'\\t)/,/^(?:'(.|\n))/,/^(?:[0-9]+)/,/^(?:$)/,/^(?:.)/],
conditions: {"string":{"rules":[3,4,5,6,7,8,9],"inclusive":false},"comment":{"rules":[1],"inclusive":false},"INITIAL":{"rules":[0,2,10,11,12,13,14,15,16,17,18,19],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
},{"./true":10,"__browserify_process":13,"fs":11,"path":14}],8:[function(require,module,exports){
var Buffer=require("__browserify_Buffer");var base64 = require('urlsafe-base64');
var aceRange = ace.require('ace/range').Range;
var parser = require('./parser').parser;
var $t = require('./true');

window.ScriptCtrl = function($scope, scriptService) {
  $scope.scriptService = scriptService;

  $scope.output = '';
  $scope.error = null;
  $scope.stack = [];
  $scope.vars = {};

  $scope.debugging = false;
  $scope.exception = false;
  $scope.halted = false;
  $scope.command = null;

  $scope.encodedScript = '';
  $scope.encodedInput = '';

  var editor = ace.edit('edit-script');
  editor.setOption('highlightActiveLine', false);

  if (scriptService.script != null) {
    editor.getSession().getDocument().setValue(scriptService.script);
  }

  $scope.$watch('scriptService.input', function(input) {
    if (input != null)
      $scope.encodedInput = base64.encode(new Buffer(input));
  });

  $scope.$watch('scriptService.script', function(script) {
    if (script != null)
      $scope.encodedScript = base64.encode(new Buffer(script));
  });

  editor.getSession().getDocument().on('change', function(e) {
    $scope.$apply(function() {
      scriptService.script = editor.getSession().getDocument().getValue();
    });
  });

  $(window).on('keydown', function(e) {
    if (e.keyCode == 27 /* Escape */) {
      $scope.$apply(function() {
        stopScript();
      });
    }
  });

  $(window).on('keypress', function(e) {
    if ((e.keyCode == 18 || e.keyCode == 13) && e.ctrlKey /* Ctrl+R, Ctrl+Enter */) {
      $scope.$apply(function() {
        $scope.runScript();
      });
    }
  });

  var debugMarkerId = null;
  $scope.$watch('command', function(command) {
    if (!command)
      return;

    var range = new aceRange(
      command.source.row.start,
      command.source.column.start,
      command.source.row.end,
      command.source.column.end + 1
    );

    if (debugMarkerId !== null)
      editor.getSession().removeMarker(debugMarkerId);

    debugMarkerId = editor.getSession().addMarker(range, 'active-command', 'text');
  });

  $scope.$watch('debugging', function(debugging) {
    editor.setReadOnly(debugging);

    if (!debugging) {
      editor.getSession().removeMarker(debugMarkerId);
      debugMarkerId = null;
    }
  });

  function compileScript() {
    var script = editor.getSession().getDocument().getValue();

    var env = new $t.Env();
    env.put = function(s) {
      $scope.output += s;
    };

    var input = $('#input').val();
    var pos = 0;
    env.get = function() {
      if (pos < input.length) {
        return input.charCodeAt(pos++);
      } else {
        return -1;
      }
    }

    $scope.output = '';
    $scope.error = null;

    var program = null;
    var valid = tryRun(function() {
      program = parser.parse(script);
    });

    return [valid, program, env];
  }

  function tryRun(runner) {
    var error = false;

    try {
      runner();
    } catch(e) {
      error = true;
      $scope.error = e.message;
    }

    return !error;
  }

  $scope.runScript = function() {
    var data = compileScript();
    var valid = data[0];
    var program = data[1];
    var env = data[2];

    if (!valid)
      return;

    var success = tryRun(function() {
      program.exec(env);
    });

    if (!success) {
      $scope.exception = true;
    } else {
      $scope.halted = true;
    }

    $scope.stack = env.stack;
    $scope.vars = env.vars;

    setTimeout(function() {
      $scope.$apply(function() {
        $scope.halted = false;
        $scope.exception = false;
      });
    }, 2000);
  };

  $scope.resumeScript = function() {
    var run = function() {
      do {
        var cmd = $scope.stepper.step();
        if (cmd)
          $scope.command = cmd;
      } while (cmd);
    };

    if (!tryRun(run)) {
      $scope.command = $scope.stepper.next();
      $scope.exception = true;
      return;
    }

    $scope.halted = true;
  }

  $scope.stepScript = function() {
    if ($scope.exception)
      return;

    var run = function() {
      $scope.command = $scope.stepper.step();
    };

    if (!tryRun(run)) {
      $scope.exception = true;
      return;
    }

    var next = $scope.stepper.next();
    if (!next)
      $scope.halted = true;
    else
      $scope.command = next;
  };

  $scope.debugScript = function() {
    var data = compileScript();
    var valid = data[0];
    var program = data[1];
    var env = data[2];

    if (!valid)
      return;

    $scope.halted = false;
    $scope.exception = false;
    $scope.debugging = true;
    $scope.stack = env.stack;
    $scope.vars = env.vars;
    $scope.stepper = program.stepper(env);
    $scope.command = $scope.stepper.next();
    setTimeout(function() { $('#step').focus(); });
  };

  function stopScript() {
    $scope.exception = false;
    $scope.debugging = false;
    $scope.halted = false;
    $scope.stepper = null;
    $scope.command = null;
    setTimeout(function() { editor.focus(); });
  }

  $scope.stopScript = function() {
    stopScript();
  };

  $scope.hideError = function(elem) {
    $scope.error = null;
  };

  setTimeout(function() {
    editor.navigateFileEnd();
    editor.focus();
  });
}

},{"./parser":7,"./true":10,"__browserify_Buffer":12,"urlsafe-base64":5}],9:[function(require,module,exports){
var app = require('./app');
var base64 = require('urlsafe-base64');

app.factory('scriptService', function($rootScope, $location) {
  var service = {
    script: null,
    input: null
  };

  var saveState = function() {
    localStorage.scriptService = angular.toJson(service);
  };

  var restoreState = function() {
    var script = $location.search().s;
    var input = $location.search().i;

    var stored = angular.fromJson(localStorage.scriptService);
  
    if (script) {
      service.script = base64.decode(script).toString();
    } else if (stored) {
      service.script = stored.script;
    }

    if (input) {
      service.input = base64.decode(input).toString();
    } else if (stored) {
      service.input = stored.input;
    }
  };

  $rootScope.$on('saveState', saveState);
  $rootScope.$on('restoreState', restoreState);
  restoreState();

  return service;
});

},{"./app":1,"urlsafe-base64":5}],10:[function(require,module,exports){
function number(x) {
  return typeof x == 'number';
}

function block(x) {
  return x instanceof exp.Block;
}

function ensureBlock(x) {
  if (!block(x))
    throw new exp.TypeError('block', trueType(x));
}

function ensureInt(x) {
  if (!number(x))
    throw new exp.TypeError('int', trueType(x));
}

function ensureStack(env, requiredSize) {
  if (env.stack.length < requiredSize)
    throw new exp.StackError(requiredSize, env.stack.length);
}

function trueType(x) {
  if (block(x)) {
    return 'block';
  } else if (number(x)) {
    return 'int';
  } else {
    return '<' + typeof x + '>';
  }
}

var exp = {
  RuntimeError: function(message) {
    this.message = message;
  },

  StackError: function(required, actual) {
    return new exp.RuntimeError('Not enough operands on stack (required: ' + required + ', actual: ' + actual + ').');
  },

  TypeError: function(expected, actual) {
    return new exp.RuntimeError('Unexpected type (expected: ' + expected + ', actual: ' + actual + ').');
  },

  ReferenceError: function(name) {
    return new exp.RuntimeError('Referenced variable is not defined (name: ' + name + ').');
  },

  Env: function() {
    var self = this;
    this.stack = [];
    this.vars = { };
    this.put = function() { };
    this.get = function() { return -1; };
    this.commands = [];

    this.addBlock = function(block) {
      for (var i = block.commands.length - 1; i >= 0; --i) {
        this.commands.unshift(block.commands[i]);
      }
    };

    this.addCommand = function(command) {
      this.commands.unshift(command);
    };

    this.stack.popInt = function() {
      ensureStack(self, 1);
      var val = this.pop();

      ensureInt(val);
      return val;
    };

    this.stack.popBlock = function() {
      ensureStack(self, 1);
      var val = this.pop();

      ensureBlock(val);
      return val;
    };
  },

  Program: function(startBlock) {
    this.exec = function(env) {
      startBlock.exec(env);
    };

    this.stepper = function(env) {
      env.addBlock(startBlock);

      return {
        step: function() {
          do {
            var cmd = env.commands.shift();
            if (cmd !== undefined)
              cmd.step(env);
          } while (cmd && cmd.pass);

          return cmd;
        },

        next: function() {
          return env.commands[0];
        }
      }
    };

    this.toString = function() {
      return startBlock.toString();
    };
  },

  BinaryOp: function(str, op) {
    this.exec = function(env) {
      ensureStack(env, 2);

      var r = env.stack.pop();
      var l = env.stack.pop();
      env.stack.push(op(l, r));
    };

    this.step = this.exec;

    this.toString = function() {
      return str;
    };
  },

  UnaryOp: function(str, op) {
    this.exec = function(env) {
      ensureStack(env, 1);

      var s = env.stack.pop();
      env.stack.push(op(s)); 
    };

    this.step = this.exec;

    this.toString = function() {
      return str;
    };
  },

  PushInt: function(value) {
    this.exec = function(env) {
      env.stack.push(value);
    };

    this.toString = function() {
      return value + '';
    };

    this.step = this.exec;
  },

  PushChar: function(value) {
    this.exec = function(env) {
      env.stack.push(value.charCodeAt(0));
    };

    this.toString = function() {
      return "'" + value;
    };

    this.step = this.exec;
  },

  Add: function() {
    return new exp.BinaryOp('+', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x + y;
    });
  },

  Subtract: function() {
    return new exp.BinaryOp('-', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x - y;
    });
  },

  Multiply: function() {
    return new exp.BinaryOp('*', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x * y;
    });
  },

  Quotient: function() {
    return new exp.BinaryOp('/', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      if (y == 0)
        throw new exp.RuntimeError('Divide by zero.');

      return Math.floor(x / y);
    });
  },

  Negate: function() {
    return new exp.UnaryOp('_', function(x) {
      ensureInt(x);

      return -x;
    });
  },

  Equal: function() {
    return new exp.BinaryOp('=', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return -(x == y);
    });
  },

  Greater: function() {
    return new exp.BinaryOp('>', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return -(x > y);
    });
  },

  And: function() {
    return new exp.BinaryOp('&', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x & y;
    });
  },

  Or: function() {
    return new exp.BinaryOp('|', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x | y;
    });
  },

  Not: function() {
    return new exp.UnaryOp('~', function(x) {
      ensureInt(x);

      return ~x;
    });
  },

  Duplicate: function() {
    this.exec = function(env) {
      ensureStack(env, 1);

      var x = env.stack[env.stack.length - 1];
      env.stack.push(x);
    };

    this.step = this.exec;

    this.toString = function() {
      return '$';
    };
  },

  Delete: function() {
    this.exec = function(env) {
      ensureStack(env, 1);

      env.stack.pop();
    };

    this.step = this.exec;

    this.toString = function() {
      return '%';
    };
  },

  Swap: function() {
    this.exec = function(env) {
      ensureStack(env, 2);

      var first = env.stack.pop();
      var second = env.stack.pop();
      env.stack.push(first);
      env.stack.push(second);
    };

    this.step = this.exec;

    this.toString = function() {
      return '\\';
    };
  },

  Rotate: function() {
    this.exec = function(env) {
      ensureStack(env, 3);

      var item = env.stack[env.stack.length - 3];
      env.stack.splice(env.stack.length - 3, 1);
      env.stack.push(item);
    };

    this.step = this.exec;

    this.toString = function() {
      return '@';
    };
  },

  Block: function(commands) {
    this.commands = commands;

    this.exec = function(env) {
      for (var i = 0; i < commands.length; ++i) {
        commands[i].exec(env);
      } 
    };

    this.step = this.exec;

    this.toString = function() {
      var s = '';
      for (var i = 0; i < commands.length; ++i) {
        s += commands[i].toString();

        // Add space between consecutive integers.
        if ((commands[i] instanceof exp.PushInt) && (commands[i + 1] instanceof exp.PushInt)) {
          s += ' ';
        }
      }
      return '[' + s + ']';
    };
  },

  Pick: function() {
    this.exec = function(env) {
      var index = env.stack.popInt();
      if (index < 0)
        throw new exp.RuntimeError('ø must specify non-negative index (' + index + ' given).');

      ensureStack(env, index + 1);

      var item = env.stack[env.stack.length - 1 - index];
      env.stack.push(item);
    };

    this.step = this.exec;

    this.toString = function() {
      return 'ø';
    };
  },

  PutInt: function() {
    this.exec = function(env) {
      var x = env.stack.popInt();
      env.put(String(x));
    };

    this.step = this.exec;

    this.toString = function() {
      return '.';
    };
  },

  PutChar: function() {
    this.exec = function(env) {
      var code = env.stack.popInt();
      env.put(String.fromCharCode(code));
    };

    this.step = this.exec;

    this.toString = function() {
      return ',';
    };
  },

  // TODO: Support escaped quotes.
  PutString: function(string) {
    this.exec = function(env) {
      env.put(string);
    };

    this.step = this.exec;

    this.toString = function() {
      return '"' + string + '"';
    };
  },

  GetChar: function() {
    this.exec = function(env) {
      env.stack.push(env.get());
    };

    this.step = this.exec;

    this.toString = function() {
      return '^';
    };
  },

  AssignVar: function(name) {
    this.exec = function(env) {
      ensureStack(env, 1);

      var x = env.stack.pop();
      env.vars[name] = x;
    };

    this.step = this.exec;

    this.toString = function() {
      return name + ':';
    };
  },

  ReadVar: function(name) {
    this.exec = function(env) {
      var x = env.vars[name];
      if (x === undefined)
        throw new exp.ReferenceError(name);

      env.stack.push(x); 
    };

    this.step = this.exec;

    this.toString = function() {
      return name + ';';
    };
  },

  PushSubroutine: function(block) {
    this.exec = function(env) {
      env.stack.push(block);
    };

    this.step = this.exec;

    this.toString = function() {
      return block.toString();
    };
  },

  RunSubroutine: function() {
    this.exec = function(env) {
      var sub = env.stack.popBlock();
      sub.exec(env);
    };

    this.step = function(env) {
      var sub = env.stack.popBlock();
      env.addBlock(sub);
    };

    this.toString = function() {
      return '!';
    };
  },

  If: function() {
    this.exec = function(env) {
      var sub = env.stack.popBlock();
      var condition = env.stack.popInt();

      /* Implicit int -> bool conversion. */
      if (condition)
        sub.exec(env);
    };

    this.step = function(env) {
      var sub = env.stack.popBlock();
      var condition = env.stack.popInt();

      /* Implicit int -> bool conversion. */
      if (condition)
        env.addBlock(sub);
    };

    this.toString = function() {
      return '?';
    };
  },

  While: function() {
    this.exec = function(env) {
      var body = env.stack.popBlock();
      var condition = env.stack.popBlock();

      var result = true;
      while (result) {
        condition.exec(env);
        result = env.stack.popInt();

        /* Implicit int -> bool conversion. */
        if (result)
          body.exec(env);
      }
    };

    this.step = function(env) {
      var body = env.stack.popBlock();
      var condition = env.stack.popBlock();

      env.addCommand(new exp.WhileCheck(condition, body, this));
      env.addBlock(condition);
    };

    this.toString = function() {
      return '#';
    };
  },

  WhileCheck: function(condition, body, whileCmd) {
    this.step = function(env) {
      var result = env.stack.popInt();

      /* Implicit int -> bool conversion. */
      if (result) {
        env.addCommand(whileCmd);
        env.addCommand(new exp.WhileRepeat(condition, body));
        env.addBlock(body);
      }
    };

    this.pass = true;
  },

  WhileRepeat: function(condition, body) {
    this.step = function(env) {
      env.stack.push(condition);
      env.stack.push(body);
    };

    this.pass = true;
  },

  Random: function() {
    this.exec = function(env) {
      var hi = env.stack.popInt();
      var lo = env.stack.popInt();

      var rand = Math.floor((Math.random() * (hi - lo + 1)) + lo);
      env.stack.push(rand);
    };

    this.step = this.exec;

    this.toString = function() {
      return '∆';
    };
  },

  Flush: function() {
    this.exec = function(env) { };
    this.step = this.exec;
    this.toString = function() {
      return 'ß';
    };
  },
};

module.exports = exp;

},{}],11:[function(require,module,exports){

},{}],12:[function(require,module,exports){
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"PcZj9L":[function(require,module,exports){
var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `browserSupport`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
var browserSupport = (function () {
   // Detect if browser supports Typed Arrays. Supported browsers are IE 10+,
   // Firefox 4+, Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+.
   if (typeof Uint8Array === 'undefined' || typeof ArrayBuffer === 'undefined' ||
        typeof DataView === 'undefined')
      return false

  // Does the browser support adding properties to `Uint8Array` instances? If
  // not, then that's the same as no `Uint8Array` support. We need to be able to
  // add all the node Buffer API methods.
  // Relevant Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var arr = new Uint8Array(0)
    arr.foo = function () { return 42 }
    return 42 === arr.foo()
  } catch (e) {
    return false
  }
})()


/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // Assume object is an array
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (browserSupport) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = augment(new Uint8Array(length))
  } else {
    // Fallback: Return this instance of Buffer
    buf = this
    buf.length = length
  }

  var i
  if (Buffer.isBuffer(subject)) {
    // Speed optimization -- use set if we're copying from a Uint8Array
    buf.set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !browserSupport && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
      return true

    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return b && b._isBuffer
}

Buffer.byteLength = function (str, encoding) {
  switch (encoding || 'utf8') {
    case 'hex':
      return str.length / 2

    case 'utf8':
    case 'utf-8':
      return utf8ToBytes(str).length

    case 'ascii':
    case 'binary':
      return str.length

    case 'base64':
      return base64ToBytes(str).length

    default:
      throw new Error('Unknown encoding')
  }
}

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) {
    throw new Error('Usage: Buffer.concat(list, [totalLength])\n' +
        'list should be an Array.')
  }

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) {
    throw new Error('Invalid hex string')
  }
  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error('Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var bytes, pos
  return Buffer._charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
}

function _asciiWrite (buf, string, offset, length) {
  var bytes, pos
  return Buffer._charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var bytes, pos
  return Buffer._charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  switch (encoding) {
    case 'hex':
      return _hexWrite(this, string, offset, length)

    case 'utf8':
    case 'utf-8':
      return _utf8Write(this, string, offset, length)

    case 'ascii':
      return _asciiWrite(this, string, offset, length)

    case 'binary':
      return _binaryWrite(this, string, offset, length)

    case 'base64':
      return _base64Write(this, string, offset, length)

    default:
      throw new Error('Unknown encoding')
  }
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  switch (encoding) {
    case 'hex':
      return _hexSlice(self, start, end)

    case 'utf8':
    case 'utf-8':
      return _utf8Slice(self, start, end)

    case 'ascii':
      return _asciiSlice(self, start, end)

    case 'binary':
      return _binarySlice(self, start, end)

    case 'base64':
      return _base64Slice(self, start, end)

    default:
      throw new Error('Unknown encoding')
  }
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  if (end < start)
    throw new Error('sourceEnd < sourceStart')
  if (target_start < 0 || target_start >= target.length)
    throw new Error('targetStart out of bounds')
  if (start < 0 || start >= source.length)
    throw new Error('sourceStart out of bounds')
  if (end < 0 || end > source.length)
    throw new Error('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  // copy!
  for (var i = 0; i < end - start; i++)
    target[i + target_start] = this[i + start]
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

// TODO: add test that modifying the new buffer slice will modify memory in the
// original buffer! Use code from:
// http://nodejs.org/api/buffer.html#buffer_buf_slice_start_end
Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (browserSupport) {
    return augment(this.subarray(start, end))
  } else {
    // TODO: slicing works, with limitations (no parent tracking/update)
    // https://github.com/feross/native-buffer-browserify/issues/9
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  var buf = this
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < buf.length, 'Trying to read beyond buffer length')
  }

  if (offset >= buf.length)
    return

  return buf[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  if (browserSupport) {
    if (offset + 1 < len) {
      return buf._dataview.getUint16(offset, littleEndian)
    } else {
      var dv = new DataView(new ArrayBuffer(2))
      dv.setUint8(0, buf[len - 1])
      return dv.getUint16(0, littleEndian)
    }
  } else {
    var val
    if (littleEndian) {
      val = buf[offset]
      if (offset + 1 < len)
        val |= buf[offset + 1] << 8
    } else {
      val = buf[offset] << 8
      if (offset + 1 < len)
        val |= buf[offset + 1]
    }
    return val
  }
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  if (browserSupport) {
    if (offset + 3 < len) {
      return buf._dataview.getUint32(offset, littleEndian)
    } else {
      var dv = new DataView(new ArrayBuffer(4))
      for (var i = 0; i + offset < len; i++) {
        dv.setUint8(i, buf[i + offset])
      }
      return dv.getUint32(0, littleEndian)
    }
  } else {
    var val
    if (littleEndian) {
      if (offset + 2 < len)
        val = buf[offset + 2] << 16
      if (offset + 1 < len)
        val |= buf[offset + 1] << 8
      val |= buf[offset]
      if (offset + 3 < len)
        val = val + (buf[offset + 3] << 24 >>> 0)
    } else {
      if (offset + 1 < len)
        val = buf[offset + 1] << 16
      if (offset + 2 < len)
        val |= buf[offset + 2] << 8
      if (offset + 3 < len)
        val |= buf[offset + 3]
      val = val + (buf[offset] << 24 >>> 0)
    }
    return val
  }
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  var buf = this
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < buf.length, 'Trying to read beyond buffer length')
  }

  if (offset >= buf.length)
    return

  if (browserSupport) {
    return buf._dataview.getInt8(offset)
  } else {
    var neg = buf[offset] & 0x80
    if (neg)
      return (0xff - buf[offset] + 1) * -1
    else
      return buf[offset]
  }
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  if (browserSupport) {
    if (offset + 1 === len) {
      var dv = new DataView(new ArrayBuffer(2))
      dv.setUint8(0, buf[len - 1])
      return dv.getInt16(0, littleEndian)
    } else {
      return buf._dataview.getInt16(offset, littleEndian)
    }
  } else {
    var val = _readUInt16(buf, offset, littleEndian, true)
    var neg = val & 0x8000
    if (neg)
      return (0xffff - val + 1) * -1
    else
      return val
  }
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  if (browserSupport) {
    if (offset + 3 >= len) {
      var dv = new DataView(new ArrayBuffer(4))
      for (var i = 0; i + offset < len; i++) {
        dv.setUint8(i, buf[i + offset])
      }
      return dv.getInt32(0, littleEndian)
    } else {
      return buf._dataview.getInt32(offset, littleEndian)
    }
  } else {
    var val = _readUInt32(buf, offset, littleEndian, true)
    var neg = val & 0x80000000
    if (neg)
      return (0xffffffff - val + 1) * -1
    else
      return val
  }
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  if (browserSupport) {
    return buf._dataview.getFloat32(offset, littleEndian)
  } else {
    return ieee754.read(buf, offset, littleEndian, 23, 4)
  }
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  if (browserSupport) {
    return buf._dataview.getFloat64(offset, littleEndian)
  } else {
    return ieee754.read(buf, offset, littleEndian, 52, 8)
  }
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  var buf = this
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= buf.length) return

  buf[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (browserSupport) {
    if (offset + 1 === len) {
      var dv = new DataView(new ArrayBuffer(2))
      dv.setUint16(0, value, littleEndian)
      buf[offset] = dv.getUint8(0)
    } else {
      buf._dataview.setUint16(offset, value, littleEndian)
    }
  } else {
    for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
      buf[offset + i] =
          (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
              (littleEndian ? i : 1 - i) * 8
    }
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  var i
  if (browserSupport) {
    if (offset + 3 >= len) {
      var dv = new DataView(new ArrayBuffer(4))
      dv.setUint32(0, value, littleEndian)
      for (i = 0; i + offset < len; i++) {
        buf[i + offset] = dv.getUint8(i)
      }
    } else {
      buf._dataview.setUint32(offset, value, littleEndian)
    }
  } else {
    for (i = 0, j = Math.min(len - offset, 4); i < j; i++) {
      buf[offset + i] =
          (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
    }
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  var buf = this
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= buf.length)
    return

  if (browserSupport) {
    buf._dataview.setInt8(offset, value)
  } else {
    if (value >= 0)
      buf.writeUInt8(value, offset, noAssert)
    else
      buf.writeUInt8(0xff + value + 1, offset, noAssert)
  }
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (browserSupport) {
    if (offset + 1 === len) {
      var dv = new DataView(new ArrayBuffer(2))
      dv.setInt16(0, value, littleEndian)
      buf[offset] = dv.getUint8(0)
    } else {
      buf._dataview.setInt16(offset, value, littleEndian)
    }
  } else {
    if (value >= 0)
      _writeUInt16(buf, value, offset, littleEndian, noAssert)
    else
      _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
  }
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (browserSupport) {
    if (offset + 3 >= len) {
      var dv = new DataView(new ArrayBuffer(4))
      dv.setInt32(0, value, littleEndian)
      for (var i = 0; i + offset < len; i++) {
        buf[i + offset] = dv.getUint8(i)
      }
    } else {
      buf._dataview.setInt32(offset, value, littleEndian)
    }
  } else {
    if (value >= 0)
      _writeUInt32(buf, value, offset, littleEndian, noAssert)
    else
      _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
  }
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (browserSupport) {
    if (offset + 3 >= len) {
      var dv = new DataView(new ArrayBuffer(4))
      dv.setFloat32(0, value, littleEndian)
      for (var i = 0; i + offset < len; i++) {
        buf[i + offset] = dv.getUint8(i)
      }
    } else {
      buf._dataview.setFloat32(offset, value, littleEndian)
    }
  } else {
    ieee754.write(buf, value, offset, littleEndian, 23, 4)
  }
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (browserSupport) {
    if (offset + 7 >= len) {
      var dv = new DataView(new ArrayBuffer(8))
      dv.setFloat64(0, value, littleEndian)
      for (var i = 0; i + offset < len; i++) {
        buf[i + offset] = dv.getUint8(i)
      }
    } else {
      buf._dataview.setFloat64(offset, value, littleEndian)
    }
  } else {
    ieee754.write(buf, value, offset, littleEndian, 52, 8)
  }
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('value is not a number')
  }

  if (end < start) throw new Error('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) {
    throw new Error('start out of bounds')
  }

  if (end < 0 || end > this.length) {
    throw new Error('end out of bounds')
  }

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Not added to Buffer.prototype since it should only
 * be available in browsers that support ArrayBuffer.
 */
function BufferToArrayBuffer () {
  return (new Buffer(this)).buffer
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

function augment (arr) {
  arr._isBuffer = true

  // Augment the Uint8Array *instance* (not the class!) with Buffer methods
  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BufferToArrayBuffer

  if (arr.byteLength !== 0)
    arr._dataview = new DataView(arr.buffer, arr.byteOffset, arr.byteLength)

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++)
    if (str.charCodeAt(i) <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var h = encodeURIComponent(str.charAt(i)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value == 'number', 'cannot write a non-number as a number')
  assert(value >= 0,
      'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint(value, max, min) {
  assert(typeof value == 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754(value, max, min) {
  assert(typeof value == 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":3,"ieee754":4}],"native-buffer-browserify":[function(require,module,exports){
module.exports=require('PcZj9L');
},{}],3:[function(require,module,exports){
(function (exports) {
	'use strict';

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	function b64ToByteArray(b64) {
		var i, j, l, tmp, placeHolders, arr;
	
		if (b64.length % 4 > 0) {
			throw 'Invalid string. Length must be a multiple of 4';
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		placeHolders = indexOf(b64, '=');
		placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0;

		// base64 is 4/3 + up to two characters of the original data
		arr = [];//new Uint8Array(b64.length * 3 / 4 - placeHolders);

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length;

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (indexOf(lookup, b64.charAt(i)) << 18) | (indexOf(lookup, b64.charAt(i + 1)) << 12) | (indexOf(lookup, b64.charAt(i + 2)) << 6) | indexOf(lookup, b64.charAt(i + 3));
			arr.push((tmp & 0xFF0000) >> 16);
			arr.push((tmp & 0xFF00) >> 8);
			arr.push(tmp & 0xFF);
		}

		if (placeHolders === 2) {
			tmp = (indexOf(lookup, b64.charAt(i)) << 2) | (indexOf(lookup, b64.charAt(i + 1)) >> 4);
			arr.push(tmp & 0xFF);
		} else if (placeHolders === 1) {
			tmp = (indexOf(lookup, b64.charAt(i)) << 10) | (indexOf(lookup, b64.charAt(i + 1)) << 4) | (indexOf(lookup, b64.charAt(i + 2)) >> 2);
			arr.push((tmp >> 8) & 0xFF);
			arr.push(tmp & 0xFF);
		}

		return arr;
	}

	function uint8ToBase64(uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length;

		function tripletToBase64 (num) {
			return lookup.charAt(num >> 18 & 0x3F) + lookup.charAt(num >> 12 & 0x3F) + lookup.charAt(num >> 6 & 0x3F) + lookup.charAt(num & 0x3F);
		};

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
			output += tripletToBase64(temp);
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1];
				output += lookup.charAt(temp >> 2);
				output += lookup.charAt((temp << 4) & 0x3F);
				output += '==';
				break;
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
				output += lookup.charAt(temp >> 10);
				output += lookup.charAt((temp >> 4) & 0x3F);
				output += lookup.charAt((temp << 2) & 0x3F);
				output += '=';
				break;
		}

		return output;
	}

	module.exports.toByteArray = b64ToByteArray;
	module.exports.fromByteArray = uint8ToBase64;
}());

function indexOf (arr, elt /*, from*/) {
	var len = arr.length;

	var from = Number(arguments[1]) || 0;
	from = (from < 0)
		? Math.ceil(from)
		: Math.floor(from);
	if (from < 0)
		from += len;

	for (; from < len; from++) {
		if ((typeof arr === 'string' && arr.charAt(from) === elt) ||
				(typeof arr !== 'string' && arr[from] === elt)) {
			return from;
		}
	}
	return -1;
}

},{}],4:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}]},{},[])
;;module.exports=require("native-buffer-browserify").Buffer

},{}],13:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],14:[function(require,module,exports){
var process=require("__browserify_process");// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

},{"__browserify_process":13}]},{},[1,2,3,7,8,9,10])