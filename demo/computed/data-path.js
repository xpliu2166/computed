"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseMultiDataPaths=parseMultiDataPaths,exports.getDataOnPath=void 0;var WHITE_SPACE_CHAR_REGEXP=/^\s/,throwParsingError=function(a,b){throw new Error("Parsing data path \""+a+"\" failed at char \""+a[b]+"\" (index "+b+")")},parseArrIndex=function(c,d){for(var e=d.index;d.index<d.length;){var f=c[d.index];if(/^[0-9]/.test(f)){d.index++;continue}break}return e===d.index&&throwParsingError(c,d.index),parseInt(c.slice(e,d.index),10)},parseIdent=function(g,h){var i=h.index,j=g[i];if(/^[_a-zA-Z$]/.test(j))for(h.index++;h.index<h.length;){var k=g[h.index];if(/^[_a-zA-Z0-9$]/.test(k)){h.index++;continue}break}else throwParsingError(g,h.index);return g.slice(i,h.index)},parseSinglePath=function(l,m){for(var n=[parseIdent(l,m)],o={deepCmp:!1};m.index<m.length;){var p=l[m.index];if("["===p)m.index++,n.push(parseArrIndex(l,m)),"]"!==l[m.index]&&throwParsingError(l,m.index),m.index++;else if("."===p){if(m.index++,"*"===l[m.index]){if(m.index++,"*"===l[m.index]){m.index++,o.deepCmp=!0;break}throwParsingError(l,m.index)}n.push(parseIdent(l,m))}else break}return{path:n,options:o}},parseMultiPaths=function(q,r){for(;WHITE_SPACE_CHAR_REGEXP.test(q[r.index]);)r.index++;for(var s=[parseSinglePath(q,r)],t=!1;r.index<r.length;){var u=q[r.index];WHITE_SPACE_CHAR_REGEXP.test(u)?r.index++:","===u?(t=!0,r.index++):t?(t=!1,s.push(parseSinglePath(q,r))):throwParsingError(q,r.index)}return s},parseEOF=function(v,w){w.index<w.length&&throwParsingError(v,w.index)};function parseMultiDataPaths(x){var y={length:x.length,index:0},z=parseMultiPaths(x,y);return parseEOF(x,y),z}var getDataOnPath=function(A,B){var C=A;return B.forEach(function(D){C="object"!=typeof C||null===C?void 0:C[D]}),C};exports.getDataOnPath=getDataOnPath