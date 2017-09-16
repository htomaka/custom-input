var customInput=function(){"use strict";function e(e,t,n){for(var r=0,i=e.toUpperCase(),o=n.toUpperCase();i[t+r]&&i[t+r]==o[r];)r++;return e.substr(t,r)}function t(e,t){var n=(e=e.substring(t)).match(/^\d+/);return n&&n[0]}function n(e,t,n){var i=r(e,t,n);return i.err&&"static"!=t.type&&e.startsWith(t.placeholder,n)&&(i.err>1||i.viewValue.length<=t.placeholder.length)?{empty:!0,viewValue:t.placeholder}:i}function r(n,r,i){var o,s,a,l;if("static"==r.type)return n.startsWith(r.value,i)?{viewValue:r.value}:{err:2,code:"TEXT_MISMATCH",message:"Pattern value mismatch"};if("number"==r.type)return null==(a=t(n,i))?{err:1,code:"NUMBER_MISMATCH",message:"Invalid number",viewValue:""}:a.length<r.minLength?{err:1,code:"NUMBER_TOOSHORT",message:"The length of number is too short",value:+a,viewValue:a,properValue:x(+a,r.minLength,r.maxLength)}:(a.length>r.maxLength&&(a=a.substr(0,r.maxLength)),+a<r.min?{err:1,code:"NUMBER_TOOSMALL",message:"The number is too small",value:+a,viewValue:a,properValue:x(r.min,r.minLength,r.maxLength)}:a.length>r.minLength&&"0"==a[0]?{err:1,code:"LEADING_ZERO",message:"The number has too many leading zero",value:+a,viewValue:a,properValue:x(+a,r.minLength,r.maxLength)}:+a>r.max?{err:1,code:"NUMBER_TOOLARGE",message:"The number is too large",value:+a,viewValue:a,properValue:x(r.max,r.minLength,r.maxLength)}:{value:+a,viewValue:a});if("select"==r.type){for(s="",l=0;l<r.select.length;l++)(o=e(n,i,r.select[l]))&&o.length>s.length&&(a=l,s=o);return s?s!=r.select[a]?{err:1,code:"SELECT_INCOMPLETE",message:"Incomplete select",value:a+1,viewValue:s,selected:r.select[a]}:{value:a+1,viewValue:s}:{err:1,code:"SELECT_MISMATCH",message:"Invalid select",viewValue:""}}throw"Unknown token type: "+r.type}function i(e,t){for(var r,i,o=0,s=[],a=e,l=Array.isArray(a),u=0,a=l?a:a[Symbol.iterator]();;){if(l){if(u>=a.length)break;r=a[u++]}else{if((u=a.next()).done)break;r=u.value}if(i=n(t,r.token,o),i.node=r,i.pos=o,i.token=r.token,i.err>=2)throw i.text=t,i;o+=i.viewValue.length,s.push(i)}var h=s[s.length-1];if(h.pos+h.viewValue.length<t.length)throw{code:"TEXT_TOOLONG",message:"Text is too long",text:t};return s}function o(e,t){if("static"==t.type)return{viewValue:t.value};var n=t.extract(e);if("number"==t.type)return{value:n,viewValue:x(n,t.minLength,t.maxLength)};if("select"==t.type)return{value:n,viewValue:t.select[n-1]};throw"Unknown type to format: "+t.type}function s(e,t,n){for(var r,i,s=[],a=t,l=Array.isArray(a),u=0,a=l?a:a[Symbol.iterator]();;){if(l){if(u>=a.length)break;i=a[u++]}else{if((u=a.next()).done)break;i=u.value}r=o(e,i.token),"static"!=i.token.type&&i.empty&&!n&&(r.value=null,r.viewValue=i.token.placeholder),s.push(r)}return s}function a(e,t,n,r){return"object"==(void 0===e?"undefined":v(e))?(t.add(e,n,r),e):t.add(e,n,r)}function l(e,t,n,r){return"object"==(void 0===e?"undefined":v(e))?(t.restore(e,n,r),e):t.restore(e,n,r)}function u(e,t){for(var n,r,i,o=[],s=t,a=Array.isArray(s),l=0,s=a?s:s[Symbol.iterator]();;){if(a){if(l>=s.length)break;n=s[l++]}else{if((l=s.next()).done)break;n=l.value}o.push(new w(e,n))}for(r=0;r<o.length;r++)o[r].next=o[r+1]||null,o[r].prev=o[r-1]||null;for(i=null,r=0;r<o.length;r++)o[r].prevEdit=i,"static"!=o[r].token.type&&(i=o[r]);for(i=null,r=o.length-1;r>=0;r--)o[r].nextEdit=i,"static"!=o[r].token.type&&(i=o[r]);return o}function h(e){return e}function p(e){for(var t=new Map,n=e,r=Array.isArray(n),i=0,n=r?n:n[Symbol.iterator]();;){var o;if(r){if(i>=n.length)break;o=n[i++]}else{if((i=n.next()).done)break;o=i.value}var s=o,a=t.get(s.token.name);a||(a=[],t.set(s.token.name,a)),a.push(s)}return t}function f(e,t){if(t.length){var n=c(t,e).map(function(e){return e.node}),r=n[0],i=n[1];return r==i?r:e-r.offset-r.viewValue.length<=i.offset-e?r:i}}function c(e,t){for(var n,r,i,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t,s=e,a=Array.isArray(s),l=0,s=a?s:s[Symbol.iterator]();;){if(a){if(l>=s.length)break;n=s[l++]}else{if((l=s.next()).done)break;n=l.value}n.offset<=t&&(r={node:n,pos:t-n.offset}),n.offset+n.viewValue.length>=o&&!i&&(i={node:n,pos:o-n.offset})}if(!i){var u=e[e.length-1];i={node:u,pos:u.viewValue.length}}return r||(r={node:e[0],pos:0}),r.pos>r.node.viewValue.length&&(r.pos=r.node.viewValue.length),[r,i]}var d={num2str:function(e,t,n){var r;if((e=""+e).length>n)e=e.substr(e.length-n);else if(e.length<t)for(r=e.length;r<t;r++)e="0"+e;return e},Emitter:function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(e){function t(){if(!(this instanceof t))return new t}!function(t){function n(e){for(var t in s)e[t]=s[t];return e}function r(e,t){var n,s=this;if(arguments.length){if(t){if(n=i(s,e,!0)){if(!(n=n.filter(function(e){return e!==t&&e.originalListener!==t})).length)return r.call(s,e);s[o][e]=n}}else if((n=s[o])&&(delete n[e],!Object.keys(n).length))return r.call(s)}else delete s[o];return s}function i(e,t,n){if(!n||e[o]){var r=e[o]||(e[o]={});return r[t]||(r[t]=[])}}e.exports=t;var o="listeners",s={on:function(e,t){return i(this,e).push(t),this},once:function(e,t){function n(){r.call(o,e,n),t.apply(this,arguments)}var o=this;return n.originalListener=t,i(o,e).push(n),o},off:r,emit:function(e,t){var n=this,r=i(n,e,!0);if(!r)return!1;var o=arguments.length;if(1===o)r.forEach(function(e){e.call(n)});else if(2===o)r.forEach(function(e){e.call(n,t)});else{var s=Array.prototype.slice.call(arguments,1);r.forEach(function(e){e.apply(n,s)})}return!!r.length}};n(t.prototype),t.mixin=n}(t)})},v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},g=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},m=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},x=d.num2str,k=d.Emitter,w=function(){function e(t,n){y(this,e),this.parser=t,this.token=n,this.value=null,this.viewValue=n.value,this.offset=0,this.next=null,this.prev=null,this.nextEdit=null,this.prevEdit=null,this.empty=!0}return e.prototype.unset=function(){"static"==this.token.type||this.parser.noEmpty||(this.empty=!0,this.parser.setValue(this.parser.value,!1))},e.prototype.parse=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=n(e,this.token,t);if(r.err)throw r.node=this,r.token=this.token,r;if(this.parser.noEmpty&&r.empty)throw{code:"NOT_INIT_FORBIDDEN",message:"Empty node is forbidden",node:this};if(r.empty)this.unset();else{this.empty=!1;var i=l(this.parser.copyValue(this.parser.value),this.token,r.value,this.parser);this.parser.setValue(i,!1)}},e.prototype.add=function(e){var t,n=this.parser.copyValue(this.parser.value);this.empty=!1,n=a(n,this.token,e,this.parser),t=this.token.extract(n);var r,i;"number"==this.token.type?(r=this.token.min,i=this.token.max):"select"==this.token.type&&(r=1,i=this.token.select.length),t<r&&(n=l(n,this.token,r,this.parser)),t>i&&(n=l(n,this.token,i,this.parser)),this.parser.setValue(n,!1)},e}(),E={TextParser:function(e){function t(){y(this,t);var n=m(this,e.call(this));return n._constructor.apply(n,arguments),n.initialize(),n}return g(t,e),t.prototype._constructor=function(e){var t=e.tokens,n=e.noEmpty,r=void 0!==n&&n,i=e.value,o=e.text,s=e.copyValue,a=void 0===s?h:s;if(!t||!t.length)throw new Error("option.tokens is required");this.tokens=t,this.nodes=u(this,t),this.nameMap=p(this.nodes),this.value=i,this.text=o,this.noEmpty=r,this.copyValue=a,this.err=!1},t.prototype.initialize=function(){this.setValue(this.value)},t.prototype.parse=function(e){if(!e)throw{code:"EMPTY",message:"The input is empty",oldText:this.text};var t,n;t=i(this.nodes,e);var r,o=[];for(r=this.err?i(this.nodes,this.text):this.nodes,n=0;n<t.length;n++)t[n].empty||t[n].viewValue==r[n].viewValue||(t[n].token=this.nodes[n].token,o.push(t[n]));var a=t.filter(function(e){return e.empty}),u=t.filter(function(e){return e.err});for(n=0;n<t.length;n++)this.nodes[n].value=t[n].value,this.nodes[n].viewValue=t[n].viewValue,this.nodes[n].offset=t[n].pos,this.nodes[n].empty=t[n].empty;if(u.length)throw this.err=!0,u[0];this.err=!1,o.sort(function(e,t){return t.empty?-1:e.empty?1:(t.token.prior||0)-(e.token.prior||0)});for(var h,p=this.copyValue(this.value),f=o,c=Array.isArray(f),d=0,f=c?f:f[Symbol.iterator]();;){if(c){if(d>=f.length)break;h=f[d++]}else{if((d=f.next()).done)break;h=d.value}p=l(p,h.token,h.value,this)}var v=s(p,t).map(function(e){return e.viewValue}).join("");if(e!=v)throw this.err=!0,{code:"INCONSISTENT_INPUT",message:"Successfully parsed but the output text doesn't match the input",text:e,oldText:this.text,properText:v};if(this.text=e,this.value=p,this.emit("change",this.value),a.length)throw{code:"NOT_INIT",message:"Some nodes are empty",text:e,node:a[0]};return this},t.prototype.setValue=function(e){var t,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=s(e,this.nodes,n),i=0,o="";for(t=0;t<r.length;t++)this.nodes[t].value=r[t].value,this.nodes[t].viewValue=r[t].viewValue,this.nodes[t].offset=i,this.nodes[t].empty=!n&&this.nodes[t].empty,i+=this.nodes[t].viewValue.length,o+=this.nodes[t].viewValue;return this.value=e,this.text=o,this.emit("change",this.value),this},t.prototype.isEmpty=function(e){var t;if(e)try{t=i(this.nodes,e)}catch(e){return!1}else t=this.nodes;var n;for(n=0;n<t.length;n++)if("static"!=this.nodes[n].token.type&&!t[n].empty)return!1;return!0},t.prototype.isInit=function(){for(var e,t=this.nodes,n=Array.isArray(t),r=0,t=n?t:t[Symbol.iterator]();;){if(n){if(r>=t.length)break;e=t[r++]}else{if((r=t.next()).done)break;e=r.value}if("static"!=e.token.type&&e.empty)return!1}return!0},t.prototype.unset=function(){for(var e,t=this.nodes,n=Array.isArray(t),r=0,t=n?t:t[Symbol.iterator]();;){if(n){if(r>=t.length)break;e=t[r++]}else{if((r=t.next()).done)break;e=r.value}e.empty=!0}return this.setValue(this.value,!1),this},t.prototype.getText=function(){return this.text},t.prototype.getValue=function(){return this.value},t.prototype.getNodes=function(e){return e?this.nameMap.get(e):this.nodes},t}(k)},b=d.Emitter,T=function(){function e(t,n){y(this,e),this.el=t,this.nodes=n,this.range={node:f(0,this.nodes),start:0,end:"end"}}return e.prototype.selectNearestNode=function(){var e=this.el.getSelection();e&&this.select({node:f(e.start,this.nodes),start:0,end:"end"})},e.prototype.select=function(e){(e=Object.assign(this.range,e)).node&&this.el.setSelection(e.node.offset+e.start,e.node.offset+("end"==e.end?e.node.viewValue.length:e.end))},e.prototype.hasNext=function(){if(this.range.node)return this.range.node.nextEdit},e.prototype.hasPrev=function(){if(this.range.node)return this.range.node.prevEdit},e.prototype.selectNext=function(){var e=this.hasNext(),t={start:0,end:"end"};e&&(t.node=e),this.select(t)},e.prototype.selectPrev=function(){var e=this.hasPrev(),t={start:0,end:"end"};e&&(t.node=e),this.select(t)},e.prototype.get=function(){if(this.nodes.length){var e=this.el.getSelection();if(e){var t=c(this.nodes,e.start,e.end),n=t[0],r=t[1];n.node==r.node&&(this.range={node:n.node,start:n.pos,end:r.pos})}}},e.prototype.atNodeEnd=function(){if(this.range.node){this.get();var e=this.range.node.viewValue.length,t=this.range.node.token.maxLength,n="end"==this.range.start?e:this.range.start;return n==("end"==this.range.end?e:this.range.end)&&n==(null!=t?t:e)||!e}},e.prototype.atNodeStart=function(){if(this.range.node){this.get();var e=this.range.node.viewValue.length,t="end"==this.range.start?e:this.range.start;return t==("end"==this.range.end?e:this.range.end)&&0==t}},e}(),V={InputMask:function(e){function t(){y(this,t);var n=m(this,e.call(this));return n._constructor.apply(n,arguments),n.initialize(),n}return g(t,e),t.prototype._constructor=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";this.el=e,this.tp=t,this.separators=n,this.sel=new T(e,t.getNodes().filter(function(e){return"static"!=e.token.type}))},t.prototype.initialize=function(){var e=this;this.el.on("mousedown",function(){e.mousedown=!0}),this.el.on("focus",function(){e.mousedown||setTimeout(function(){e.sel.select({start:0,end:"end"})})}),this.el.on("click",function(){e.mousedown=!1,e.sel.selectNearestNode()}),this.el.on("input",function(){e.digest(null,e.el.val())}),this.el.on("keydown",function(t){t.altKey||t.ctrlKey||(37==t.keyCode||9==t.keyCode&&t.shiftKey&&e.sel.hasPrev()?(t.preventDefault(),e.tryFixingError(),e.sel.selectPrev()):39==t.keyCode||9==t.keyCode&&!t.shiftKey&&e.sel.hasNext()?(t.preventDefault(),e.tryFixingError(),e.sel.selectNext()):38==t.keyCode?(t.preventDefault(),e.sel.selectNearestNode(),e.sel.range.node&&e.sel.range.node.add(1),e.val(e.tp.getText()),e.sel.select({start:0,end:"end"})):40==t.keyCode?(t.preventDefault(),e.sel.selectNearestNode(),e.sel.range.node&&e.sel.range.node.add(-1),e.val(e.tp.getText()),e.sel.select({start:0,end:"end"})):36==t.keyCode||35==t.keyCode?setTimeout(function(){return e.sel.selectNearestNode()}):46==t.keyCode?e.sel.atNodeEnd()&&(t.preventDefault(),e.tryFixingError(),e.sel.selectNext()):8==t.keyCode&&e.sel.atNodeStart()&&(t.preventDefault(),e.tryFixingError(),e.sel.selectPrev()))}),this.el.on("keypress",function(t){var n=null==t.charCode?t.keyCode:t.charCode,r=String.fromCharCode(n),i=e.separators,o=e.sel.range.node;if(o&&o.next&&"static"==o.next.token.type&&(i+=o.next.viewValue[0]),i.includes(r))return t.preventDefault(),e.tryFixingError(),void e.sel.selectNext();setTimeout(function(){e.sel.atNodeEnd()&&e.sel.range.node.viewValue&&(e.tryFixingError(),e.sel.selectNext())})}),this.el.on("blur",function(){setTimeout(function(){e.tryFixingError()})}),this.tp.on("change",function(){e.err||e.inDigest||(e.val(e.tp.getText()),e.sel.select())});var t=this.el.val();t?this.digest(null,t,!0):this.val(this.tp.getText())},t.prototype.errorViewLength=function(){if(this.err&&null!=this.err.viewValue)return this.err.viewValue.length},t.prototype.val=function(e){this.el.val()!=e&&this.el.val(e),this.err=null},t.prototype.tryFixingError=function(){this.err&&(this.err.properValue?this.digest(this.err.node,this.err.properValue,!0):this.err.node&&(this.err.node.unset(),this.digest(null,this.tp.getText())))},t.prototype.digest=function(e,t,n){var r,i=10;for(this.inDigest=!0;i--;){this.err=null;try{e?e.parse(t):this.tp.parse(t)}catch(i){if(this.emit("digest",i),this.sel.get(),"NOT_INIT"==i.code)break;if(this.err=i,!n&&("NUMBER_TOOSHORT"==i.code||"NUMBER_TOOSMALL"==i.code||"NUMBER_MISMATCH"==i.code||"SELECT_MISMATCH"==i.code||"LEADING_ZERO"==i.code))break;if("SELECT_INCOMPLETE"==i.code){e=i.node,t=i.selected,r={end:"end"};continue}null!=i.properValue?(e=i.node,t=i.properValue):null!=i.properText?(e=null,t=i.properText):("EMPTY"==i.code&&this.tp.unset(),i.node&&i.node.unset(),e=null,t=this.tp.getText(),r={start:0,end:"end"});continue}break}if(this.err||(this.val(this.tp.getText()),i<9&&this.sel.select(r)),this.inDigest=!1,i<0)throw new Error("InputMask.digest crashed! Infinite loop on "+t)},t}(b)};return{TextParser:E.TextParser,InputMask:V.InputMask,utils:d}}();
