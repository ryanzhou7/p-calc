(this["webpackJsonpcreate-react-plus"]=this["webpackJsonpcreate-react-plus"]||[]).push([[0],{45:function(t,e,a){t.exports=a.p+"static/media/thick.c9dcc9e1.png"},49:function(t,e,a){t.exports=a(97)},54:function(t,e,a){},64:function(t,e,a){},94:function(t,e,a){},95:function(t,e,a){t.exports=a.p+"static/media/fail-4.d00d48d7.jpeg"},97:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(21),c=a.n(i),o=(a(54),a(11)),s=a(99),u=a(100),l=a(40),h=a(41),d=a.n(h),m=a(4);var f={source:null,image:null};var v=a(9),p=a(1),g=a.n(p),E=a(6);function y(t){return{type:"SET_COMBINE_CONTEXT",payload:t}}function b(t){return{type:"SET_NUM_COLORED_INNER_PIXELS",payload:t}}function x(t){return{type:"SET_NUM_COLORED_OUTER_PIXELS",payload:t}}var O={context:null,numColoredOuterPixels:0,numColoredInnerPixels:0};var w=a(13);a(64);var _=function(t){var e=Object(v.b)(),a=t.image,i=t.canvasDimensions,c=i.canvasWidth,s=i.canvasHeight,u=t.drawDimensions,l=u.drawWidth,h=u.drawHeight,d=Object(o.a)(t.canvasContext,2),m=d[0],f=d[1],p=Object(n.useRef)(null);return Object(n.useEffect)((function(){var t=p.current.getContext("2d");e(f(t))}),[]),Object(n.useEffect)((function(){if(null!=a&&null!=m){var t=p.current;t.width=c,t.height=s,m.drawImage(a,0,0,l,h)}}),[a,l,h,c,s]),r.a.createElement("div",{className:"mx-auto"},r.a.createElement("canvas",{ref:p}))},j=a(12),N=a(22),C=function t(e){var a=e.x,n=e.y;Object(N.a)(this,t),this.x=a,this.y=n},T=a(43),I=function(){function t(e){var a=e.canvasWidth,n=e.imageArray;Object(N.a)(this,t),this.canvasWidth=a,this.imageArray=n}return Object(T.a)(t,[{key:"rgbPixel",value:function(t){var e=t.x,a=t.y,n=S(e,a,this.canvasWidth)+0,r=S(e,a,this.canvasWidth)+1,i=S(e,a,this.canvasWidth)+2,c=this.imageArray[n],o=this.imageArray[r],s=this.imageArray[i];if(0!==c&&0!==o&&0!==s){var u=S(e,a,this.canvasWidth)+3;this.imageArray[u]}return{r:c,g:o,b:s}}},{key:"rgbaPixel",value:function(t){var e=t.x,a=t.y,n=this.rgbPixel({x:e,y:a}),r=S(e,a,this.canvasWidth)+3,i=this.imageArray[r];return n.alpha=i,n}},{key:"recolor",value:function(t,e){var a=e.r,n=e.g,r=e.b,i=t.x,c=t.y,o=S(i,c,this.canvasWidth)+0,s=S(i,c,this.canvasWidth)+1,u=S(i,c,this.canvasWidth)+2;this.imageArray[o]=Number(a),this.imageArray[s]=Number(n),this.imageArray[u]=Number(r)}},{key:"rRelative",value:function(t){var e=this.rgbPixel(t);e.r,e.g;return e.b}},{key:"tint",value:function(t,e){var a=e.r,n=e.g,r=e.b,i=t.x,c=t.y,o=S(i,c,this.canvasWidth)+0,s=S(i,c,this.canvasWidth)+1,u=S(i,c,this.canvasWidth)+2,l=this.imageArray[o],h=this.imageArray[s],d=this.imageArray[u];this.imageArray[o]+=this.tintDelta(l,a),this.imageArray[s]+=this.tintDelta(h,n),this.imageArray[u]+=this.tintDelta(d,r)}},{key:"tintDelta",value:function(t,e){return(e-t)/3}}]),t}();function S(t,e,a){return 4*(t+e*a)}var R=a(65),A=a(90);function P(t,e,a,n,r){return D.apply(this,arguments)}function D(){return(D=Object(E.a)(g.a.mark((function t(e,a,n,r,i){var c,o,s,u,l,h,d,m,f;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a.x,a.y,(c=[]).push(a),(o=[]).push(a),(s=new Set).add(a);o.length>0;){u=o.pop(),H(u.x,u.y),l=L(u),h=Object(j.a)(l);try{for(h.s();!(d=h.n()).done;)m=d.value,f=H(m.x,m.y),W(m,r)&&!s.has(f)&&k(m,e,a,i)&&(o.push(m),c.push(m)),s.add(f)}catch(n){h.e(n)}finally{h.f()}}return t.abrupt("return",c);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function k(t,e,a,n){var r=e.rgbPixel(a),i=R.rgb.lab([r.r,r.g,r.b]),c={L:i[0],A:i[1],B:i[2]},o=e.rgbPixel(t),s=R.rgb.lab([o.r,o.g,o.b]),u={L:s[0],A:s[1],B:s[2]};return A.getDeltaE00(c,u)<n}function W(t,e){var a=t.x,n=t.y;return a>0&&a<e.width&&n>0&&n<e.height}var M=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];function L(t){var e,a=[],n=t.x,r=t.y,i=Object(j.a)(M);try{for(i.s();!(e=i.n()).done;){var c=e.value,s=Object(o.a)(c,2),u=s[0],l=s[1];a.push(new C({x:u+n,y:l+r}))}}catch(h){i.e(h)}finally{i.f()}return a}function X(t,e,a,n){return U.apply(this,arguments)}function U(){return(U=Object(E.a)(g.a.mark((function t(e,a,n,r){var i,c,o,s,u,l,h,d,m,f,v,p,E;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:i=a.leftX,c=a.rightX,o=a.height,s=0,u=new Set,l=Object(j.a)(r);try{for(l.s();!(h=l.n()).done;)for(d=h.value,m=d.x,f=d.y,v=f;v<o/2-5;v++)p=H(m,v),E={x:m,y:v},!u.has(p)&&i<=m&&m<=c&&(u.add(p),e.tint(E,n),s++)}catch(g){l.e(g)}finally{l.f()}return t.abrupt("return",s);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function H(t,e){return String(t)+String(e)}var G=a(16),F=a.n(G);function z(t,e,a,n){return B.apply(this,arguments)}function B(){return(B=Object(E.a)(g.a.mark((function t(e,a,n,r){var i,c,o,s,u,l,h,d,m,f,v,p,E,y,b,x,O,w,_,j;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=e.width,c=e.height,o={detectionWidth:i,detectionHeight:c},s=n.current,u=s.getContext("2d"),t.next=6,Z(e,u);case 6:return l=t.sent,(h=a.context).drawImage(e,0,0,i,c),d=h.getImageData(0,0,i,c),m=new I({canvasWidth:o.detectionWidth,imageArray:d.data}),t.next=13,V(m,o);case 13:return f=t.sent,t.next=16,P(m,f,l,{width:i,height:c},r);case 16:return v=t.sent,t.next=19,J(f,m,i,c);case 19:return p=t.sent,t.next=22,P(m,p,l,{width:i,height:c},r);case 22:return E=t.sent,y=v,b=E,f.y>p.y&&(y=(x=[b,y])[0],b=x[1]),t.next=28,q(y,b);case 28:return O=t.sent,w={r:0,g:255,b:0},t.next=32,X(m,{leftX:O.top.left.x,rightX:O.top.right.x,height:c},w,y);case 32:return _=t.sent,t.next=35,X(m,{leftX:O.bottom.left.x,rightX:O.bottom.right.x,height:c},{r:0,g:0,b:255},b);case 35:return j=t.sent,h.putImageData(d,0,0,0,0,o.detectionWidth,o.detectionHeight),t.abrupt("return",Promise.resolve({topPixelsCount:_,bottomPixelsCount:j}));case 38:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function J(t,e,a,n){return Q.apply(this,arguments)}function Q(){return(Q=Object(E.a)(g.a.mark((function t(e,a,n,r){var i,c,o,s,u,l,h,d,m,f,v,p;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(i=r/2,c=n/2,o=Math.abs(e.y-i),s=e.y,l=s,l+=(u=o<s)?-5:5,h={x:c},d=Number.MIN_SAFE_INTEGER,m=u?40:i;m!==l;)f={x:c,y:m},v=a.rgbPixel(f),(p=2*v.r-v.b-v.g)>d&&(h={y:m,x:c},d=p),u?m++:m--;return t.abrupt("return",h);case 12:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function V(t,e){return $.apply(this,arguments)}function $(){return($=Object(E.a)(g.a.mark((function t(e,a){var n,r,i,c,o,s,u,l,h;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(n=a.detectionWidth,r=a.detectionHeight,c={x:i=n/2},o=0,s=40;s<r/2;s++)u={x:i,y:s},l=e.rgbPixel(u),(h=2*l.r-l.b-l.g)>o&&(c.y=s,o=h);return t.abrupt("return",c);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function q(t,e){return K.apply(this,arguments)}function K(){return(K=Object(E.a)(g.a.mark((function t(e,a){var n,r,i;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(n=Y(e,a)).top.left.y>182&&n.bottom.left.y>182||n.bottom.left.y>182&&n.top.left.x<n.bottom.left.x||(r=Math.max(n.top.left.x,n.bottom.left.x),n.top.left.x=r,n.bottom.left.x=r),n.top.right.y>182&&n.bottom.right.y>182||n.bottom.right.y>182&&n.top.right.x>n.bottom.right.x||(i=Math.min(n.top.right.x,n.bottom.right.x),n.top.right.x=i,n.bottom.right.x=i),t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Y(t,e){var a,n={top:{left:{x:Number.MAX_SAFE_INTEGER,y:void 0},right:{x:0,y:void 0}},bottom:{left:{x:Number.MAX_SAFE_INTEGER,y:void 0},right:{x:0,y:void 0}}},r=Object(j.a)(t);try{for(r.s();!(a=r.n()).done;){var i=a.value,c=i.x,o=i.y;c<n.top.left.x&&(n.top.left.x=c,n.top.left.y=o),c>n.top.right.x&&(n.top.right.x=c,n.top.right.y=o)}}catch(m){r.e(m)}finally{r.f()}var s,u=Object(j.a)(e);try{for(u.s();!(s=u.n()).done;){var l=s.value,h=l.x,d=l.y;h<n.bottom.left.x&&(n.bottom.left.x=h,n.bottom.left.y=d),h>n.bottom.right.x&&(n.bottom.right.x=h,n.bottom.right.y=d)}}catch(m){u.e(m)}finally{u.f()}return n}function Z(t,e){return tt.apply(this,arguments)}function tt(){return(tt=Object(E.a)(g.a.mark((function t(e,a){var n,r,i,c,o,s,u,l,h;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(n=e.width,r=e.height,a.drawImage(e,0,0,n,r),i=a.getImageData(0,0,n,r),450,320,c=F.a.U8_t,o=new F.a.matrix_t(450,320,c),F.a.imgproc.grayscale(i.data,n,r,o),3,8,120,120,F.a.imgproc.gaussian_blur(o,o,8,0),F.a.imgproc.canny(o,o,120,120),s=new Uint32Array(i.data.buffer),255<<24,u=o.cols*o.rows,l=0;--u>=0;)l=o.data[u],s[u]=255<<24|l<<16|l<<8|l;return a.putImageData(i,0,0,0,0,n,r),h=new I({canvasWidth:n,imageArray:i.data}),t.abrupt("return",h);case 19:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var et=function(t){var e,a=Object(v.b)(),i=Object(v.c)((function(t){return t.combinedCanvasInfo})),c=Object(v.c)((function(t){return t.image.source})),l=Object(o.a)(t.thresholdState,2),h=l[0],d=l[1],f=i.numColoredOuterPixels,p=i.numColoredInnerPixels,O=t.webcamRef,j=Object(m.a)({},t,{canvasContext:[i.context,y]}),N=Object(n.useRef)(null);function C(t){d((function(e){return Math.max(0,e+t)}))}function T(){return(T=Object(E.a)(g.a.mark((function t(e){var n,r,o;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return h+e,C(e),t.next=4,z(c,i,N,h);case 4:n=t.sent,r=n.topPixelsCount,o=n.bottomPixelsCount,a(x(r)),a(b(o));case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(n.useEffect)((function(){c&&function(t){T.apply(this,arguments)}(0)}),[c,h]),r.a.createElement(s.a,null,c&&r.a.createElement("h2",{className:"card-title"},"Results"),r.a.createElement("div",null,r.a.createElement(_,j),c&&r.a.createElement("div",{className:"d-flex justify-content-around align-items-center mb-4"},r.a.createElement("div",null,r.a.createElement(u.a,{variant:"outline-primary",onClick:function(){window.scrollTo(0,O.current.offsetTop)}},"Retake picture"),r.a.createElement("div",null,r.a.createElement("h3",{className:"mt-4"},"Loss:"," ",(100*((e=f)-p)/e).toFixed(2),"%"))),r.a.createElement(s.a,null,r.a.createElement(s.a.Body,null,r.a.createElement(s.a.Title,null,"Sensitivity: ",h),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row justify-content-around mb-3"},r.a.createElement(u.a,{onClick:function(t){C(-1)}},r.a.createElement(w.a,{icon:"minus",size:"1x"})),r.a.createElement(u.a,{onClick:function(t){C(1)}},r.a.createElement(w.a,{icon:"plus",size:"1x"}))),r.a.createElement("div",{className:"row justify-content-between"},r.a.createElement(u.a,{className:"mr-1",onClick:function(t){C(-3)}},r.a.createElement(w.a,{icon:"minus",size:"1x"}),"  ",r.a.createElement(w.a,{icon:"minus",size:"1x"})),r.a.createElement(u.a,{onClick:function(t){C(3)}},r.a.createElement(w.a,{icon:"plus",size:"1x"}),"  ",r.a.createElement(w.a,{icon:"plus",size:"1x"})))))))),r.a.createElement("canvas",{style:{display:"none"},ref:N}))},at=a(45),nt=a.n(at);a(94),a(95);var rt=Object(l.withOrientationChange)((function(t){var e=Object(v.b)(),a=Object(n.useState)(20),i=Object(o.a)(a,2),c=i[0],l=i[1],h=Object(v.c)((function(t){return t.videoReducer.videoConstraints})),m=Object(v.c)((function(t){return t.image.source})),f=Object(v.c)((function(t){return t.canvasSettings.canvasDimensions})),p=(Object(v.c)((function(t){return t.combinedCanvasInfo})),t.isPortrait),g=Object(n.useRef)(null),E=Object(n.useRef)(null);Object(n.useEffect)((function(){}),[]);var y=function(){l(20);var t,a=g.current.getScreenshot();e((t=a,function(e){var a=new Image;a.onload=function(){e({type:"IMAGE_SOURCE_SET",payload:a})},a.src=t})),e(function(t){return{type:"IMAGE_SET",payload:t}}(a)),window.scrollTo(0,E.current.offsetTop),a},b={webcamRef:g,image:m,canvasDimensions:{canvasWidth:f.width,canvasHeight:f.height},drawDimensions:{drawWidth:f.width,drawHeight:f.height},isPortrait:p,thresholdState:[c,l]};return r.a.createElement("div",{className:"App"},r.a.createElement(s.a,{className:"mt-4"},r.a.createElement("h2",{className:"card-title"},"Capture chart"),r.a.createElement("div",{className:"mx-auto"},r.a.createElement("div",{className:"capture-container mx-auto"},r.a.createElement(d.a,{audio:!1,height:h.height,ref:g,screenshotFormat:"image/jpeg",width:h.width,videoConstraints:h}),r.a.createElement("div",{className:"overlay"},r.a.createElement("img",{className:"target",style:{width:h.width-20},src:nt.a})))),r.a.createElement("div",{className:"my-2 z-top mx-auto"},r.a.createElement(u.a,{className:"capture-button",onClick:function(){return y()}},r.a.createElement(w.a,{icon:"camera",size:"3x"})))),r.a.createElement("div",{className:"mt-4",ref:E},r.a.createElement(et,b)),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null))})),it=a(17),ct=a(46),ot=a(24);it.b.add(ct.a,ot.b,ot.c,ot.a);var st=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(rt,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(96);var ut=a(15),lt=a(47);var ht={isOuterEdit:!0};var dt={context:null,recoloredImageData:null,numColoredPixels:0,detectedPixels:[],recolorHex:"#00FF00"};var mt={context:null,recoloredImageData:null,numColoredPixels:0,detectedPixels:[],recolorHex:"#FFA500"};var ft={canvasDimensions:{width:400,height:400}};var vt={videoConstraints:{width:400,height:400,facingMode:{exact:"environment"},audio:!1,imageSmoothing:!0,screenshotQuality:1}};var pt=Object(ut.c)({image:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"IMAGE_SOURCE_SET":return Object(m.a)({},t,{source:e.payload});case"IMAGE_SET":return Object(m.a)({},t,{image:e.payload});default:return t}},canvasEdit:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ht,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"TOGGLE_IS_OUTER_EDIT":return Object(m.a)({},t,{isOuterEdit:!t.isOuterEdit});default:return t}},innerCanvasInfo:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:dt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_INNER_CONTEXT":return Object(m.a)({},t,{context:e.payload});case"SET_INNER_RECOLORED_IMAGE_DATA":return Object(m.a)({},t,{recoloredImageData:e.payload});case"SET_INNER_DETECTED_PIXELS":return Object(m.a)({},t,{detectedPixels:e.payload});case"SET_INNER_NUM_COLORED_PIXELS":return Object(m.a)({},t,{numColoredPixels:e.payload});case"SET_INNER_RECOLOR_HEX":return Object(m.a)({},t,{recolorHex:e.payload});default:return t}},outerCanvasInfo:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:mt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_OUTER_CONTEXT":return Object(m.a)({},t,{context:e.payload});case"SET_OUTER_RECOLORED_IMAGE_DATA":return Object(m.a)({},t,{recoloredImageData:e.payload});case"SET_OUTER_DETECTED_PIXELS":return Object(m.a)({},t,{detectedPixels:e.payload});case"SET_OUTER_NUM_COLORED_PIXELS":return Object(m.a)({},t,{numColoredPixels:e.payload});case"SET_OUTER_RECOLOR_HEX":return Object(m.a)({},t,{recolorHex:e.payload});default:return t}},combinedCanvasInfo:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_COMBINE_CONTEXT":return Object(m.a)({},t,{context:e.payload});case"SET_NUM_COLORED_INNER_PIXELS":return Object(m.a)({},t,{numColoredInnerPixels:e.payload});case"SET_NUM_COLORED_OUTER_PIXELS":return Object(m.a)({},t,{numColoredOuterPixels:e.payload});default:return t}},canvasSettings:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ft,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_CANVAS_DIMENSIONS":return Object(m.a)({},t,{source:e.payload});default:return t}},videoReducer:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:vt,e=arguments.length>1?arguments[1]:void 0;return e.type,t}}),gt=Object(ut.d)(pt,Object(ut.a)(lt.a));c.a.render(r.a.createElement(v.a,{store:gt},r.a.createElement(st,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[49,1,2]]]);
//# sourceMappingURL=main.b327a323.chunk.js.map