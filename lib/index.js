"use strict";var n=require("path"),r=require("fs");function t(n){return n&&"object"==typeof n&&"default"in n?n:{default:n}}var e=t(n),i={subNavShow:[],ignoreFolders:[],ignoreFiles:[],dirPrefix:"📂  ",filePrefix:"✏️  "};function o(){return i||{}}var c=function(n,t,i){return void 0===t&&(t=[]),void 0===i&&(i=[]),r.readdirSync(n).sort().filter((function(o){var c=r.statSync(e.default.join(n,o)),a=o.slice(o.lastIndexOf(".")+1);return c.isFile()&&t.includes(a)&&u(o)&&!i.includes(o)}))},u=function(n){return"readme.md"!==n.toLocaleLowerCase()},a=function(n){void 0===n&&(n=".");var t=o(),i=r.readdirSync(n),c=[];return i.forEach((function(i){var o=e.default.join(n,i);r.statSync(o).isDirectory()&&!t.ignoreFolders.includes(i)&&c.push(o)})),c},f=a,l=function(n,r){void 0===r&&(r="");var t=o();return c(n,["md"],t.ignoreFiles).map((function(n){return r+n}))},s=function(n){return n.substring(n.lastIndexOf("/")+1,n.lastIndexOf("."))},d=function(n){return n.substring(n.lastIndexOf("/")+1)},v=function(n){var r=o(),t=[];f(n).sort().filter((function(n){return!r.ignoreFolders.includes(d(n))})).forEach((function(n){var e=d(n),i=f(n).map((function(n){var r,t,i=d(n),o=l(n)[0];return{text:i,link:null!==(t=null!==(r="/"+e+"/"+i+"/"+o)&&void 0!==r?r:s(o))&&void 0!==t?t:""}}));t.push({text:"".concat(r.dirPrefix).concat(e),items:i})}));var e=[];return(e=l(n)).length>0&&e.sort().filter((function(n){return!r.ignoreFiles.includes(s(n))})).forEach((function(n){t.push({text:"".concat(r.filePrefix).concat(s(n)),link:"/"+n})})),t};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function p(n,r,t){if(t||2===arguments.length)for(var e,i=0,o=r.length;i<o;i++)!e&&i in r||(e||(e=Array.prototype.slice.call(r,0,i)),e[i]=r[i]);return n.concat(e||Array.prototype.slice.call(r))}var x=function(n){var r=o(),t={};return f(n).sort().forEach((function(n){var e="/"+d(n)+"/",i=f(n);t[e]=i.map((function(n){var t=d(n),i=f(n).map((function(n){return d(n)})),o=l(n).map((function(n){return s(n)}));return console.log("subSubFolderName:",i),console.log("subSubFileName:",o),{text:"".concat(r.dirPrefix).concat(t),items:p(p([],i.map((function(n){return{text:"".concat(r.dirPrefix).concat(n),link:e+t+"/"+n+"/"}})),!0),o.map((function(n){return{text:"".concat(r.filePrefix).concat(n),link:e+t+"/"+n}})),!0)}}))})),t};module.exports=function(r){r||(r=i),function(n){i=n}(Object.assign({},i,r));var t=n.resolve(process.cwd(),"docs");return{nav:v(t),sidebar:x(t)}};
