(this["webpackJsonpcreate-react-plus"]=this["webpackJsonpcreate-react-plus"]||[]).push([[0],{23:function(e,t,n){e.exports=n.p+"static/media/thick.c9dcc9e1.png"},26:function(e,t,n){e.exports=n(44)},31:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){e.exports=n.p+"static/media/top-max.9741321e.jpeg"},44:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(10),i=n.n(c),o=(n(31),n(45)),u=n(18),s=n(19),l=n.n(s),d=n(2);var h={source:null};var f=n(5),m=n(1),v=n.n(m),p=n(3);function E(e){return{type:"SET_COMBINE_CONTEXT",payload:e}}function g(e){return{type:"SET_NUM_COLORED_INNER_PIXELS",payload:e}}function b(e){return{type:"SET_NUM_COLORED_OUTER_PIXELS",payload:e}}var y={context:null,numColoredOuterPixels:0,numColoredInnerPixels:0};var O=n(9);n(40);var x=function(e){var t=Object(f.b)(),n=e.image,c=e.canvasDimensions,i=c.canvasWidth,o=c.canvasHeight,u=e.drawDimensions,s=u.drawWidth,l=u.drawHeight,d=Object(O.a)(e.canvasContext,2),h=d[0],m=d[1],v=Object(a.useRef)(null);return Object(a.useEffect)((function(){var e=v.current.getContext("2d");t(m(e))}),[]),Object(a.useEffect)((function(){if(null!=n&&null!=h){var e=v.current;e.width=i,e.height=o,h.drawImage(n,0,0,s,l)}}),[n,s,l,i,o]),r.a.createElement("div",null,r.a.createElement("canvas",{ref:v,className:"border"}))},_=n(6),j=n(11),w=function e(t){var n=t.x,a=t.y;Object(j.a)(this,e),this.x=n,this.y=a},C=n(21),N=function(){function e(t){var n=t.canvasWidth,a=t.imageArray;Object(j.a)(this,e),this.canvasWidth=n,this.imageArray=a}return Object(C.a)(e,[{key:"rgbPixel",value:function(e){var t=e.x,n=e.y,a=T(t,n,this.canvasWidth)+0,r=T(t,n,this.canvasWidth)+1,c=T(t,n,this.canvasWidth)+2;return{r:this.imageArray[a],g:this.imageArray[r],b:this.imageArray[c]}}},{key:"recolor",value:function(e,t){var n=t.r,a=t.g,r=t.b,c=e.x,i=e.y,o=T(c,i,this.canvasWidth)+0,u=T(c,i,this.canvasWidth)+1,s=T(c,i,this.canvasWidth)+2;this.imageArray[o]=Number(n),this.imageArray[u]=Number(a),this.imageArray[s]=Number(r)}},{key:"tint",value:function(e,t){}}]),e}();function T(e,t,n){return 4*(e+t*n)}function I(e,t){return S.apply(this,arguments)}function S(){return(S=Object(p.a)(v.a.mark((function e(t,n){var a,r,c,i,o,u,s,l,d,h;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n.x,n.y,(a=[]).push(n),(r=[]).push(n),c=new Set;r.length>0;){i=r.pop(),o=L(i.x,i.y),c.add(o),u=M(i),s=Object(_.a)(u);try{for(s.s();!(l=s.n()).done;)d=l.value,h=L(d.x,d.y),!c.has(h)&&R(i,d,t,n)&&(r.push(d),a.push(d),c.add(h))}catch(f){s.e(f)}finally{s.f()}}return e.abrupt("return",a);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e,t,n,a){var r=n.rgbPixel(a),c=2*r.r-r.g-r.b,i=n.rgbPixel(e),o=n.rgbPixel(t);return 2*o.r-o.g-o.b+40>c&&Math.abs(i.r-o.r)<40&&Math.abs(i.g-o.g)<40&&Math.abs(i.b-o.b)<40}var P=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];function M(e){var t,n=[],a=e.x,r=e.y,c=Object(_.a)(P);try{for(c.s();!(t=c.n()).done;){var i=t.value,o=Object(O.a)(i,2),u=o[0],s=o[1];n.push(new w({x:u+a,y:s+r}))}}catch(l){c.e(l)}finally{c.f()}return n}function A(e,t,n,a){return D.apply(this,arguments)}function D(){return(D=Object(p.a)(v.a.mark((function e(t,n,a,r){var c,i,o,u,s,l,d,h,f,m,p,E,g;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=n.leftX,i=n.rightX,o=n.height,u=0,s=new Set,l=Object(_.a)(r);try{for(l.s();!(d=l.n()).done;)for(h=d.value,f=h.x,m=h.y,p=m;p<o/2;p++)E=L(f,p),g={x:f,y:p},!s.has(E)&&c<=f&&f<=i&&(s.add(E),t.recolor(g,a),u++)}catch(v){l.e(v)}finally{l.f()}return e.abrupt("return",u);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function L(e,t){return String(e)+String(t)}function X(e,t){return k.apply(this,arguments)}function k(){return(k=Object(p.a)(v.a.mark((function e(t,n){var a,r,c,i,o,u,s,l,d,h,f,m,p,E,g,b,y,O,x;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.width,r=t.height,c={detectionWidth:a,detectionHeight:r},(i=n.context).drawImage(t,0,0,a,r),o=i.getImageData(0,0,a,r),u=new N({canvasWidth:c.detectionWidth,imageArray:o.data}),e.next=8,H(u,c);case 8:return s=e.sent,e.next=11,I(u,s);case 11:return l=e.sent,e.next=14,W(s,l,u,a,r);case 14:return d=e.sent,e.next=17,I(u,d);case 17:return h=e.sent,f=l,m=h,s.y>d.y&&(f=(p=[m,f])[0],m=p[1]),e.next=23,G(f,m);case 23:return E=e.sent,g=E.left,b=E.right,y={r:0,g:255,b:0},e.next=29,A(u,{leftX:g,rightX:b,height:r},y,f);case 29:return O=e.sent,e.next=32,A(u,{leftX:g,rightX:b,height:r},{r:0,g:255,b:255},m);case 32:return x=e.sent,i.putImageData(o,0,0,0,0,c.detectionWidth,c.detectionHeight),e.abrupt("return",Promise.resolve({topPixelsCount:O,bottomPixelsCount:x,context:i}));case 35:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e,t,n,a,r){return U.apply(this,arguments)}function U(){return(U=Object(p.a)(v.a.mark((function e(t,n,a,r,c){var i,o,u,s,l,d,h,f,m,p,E,g,b,y,O,x;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=c/2,o=r/2,u=Math.abs(t.y-i),s=t.y,d=(l=u<s)?Number.MIN_VALUE:Number.MAX_VALUE,h=l?Math.max:Math.min,f=Object(_.a)(n);try{for(f.s();!(m=f.n()).done;)p=m.value.y,d=h(d,p)}catch(v){f.e(v)}finally{f.f()}for(d+=l?-5:5,E={x:o},g=0,b=l?0:i;b!==d;)y={x:o,y:b},O=a.rgbPixel(y),(x=2*O.r-O.b-O.g)>g&&(E.y=b,g=x),l?b++:b--;return e.abrupt("return",E);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function H(e,t){return F.apply(this,arguments)}function F(){return(F=Object(p.a)(v.a.mark((function e(t,n){var a,r,c,i,o,u,s,l,d;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(a=n.detectionWidth,r=n.detectionHeight,i={x:c=a/2},o=0,u=0;u<r/2;u++)s={x:c,y:u},l=t.rgbPixel(s),(d=2*l.r-l.b-l.g)>o&&(i.y=u,o=d);return e.abrupt("return",i);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function G(e,t){return V.apply(this,arguments)}function V(){return(V=Object(p.a)(v.a.mark((function e(t,n){var a,r,c,i,o,u,s,l,d,h,f,m;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Number.MAX_VALUE,r=Number.MAX_VALUE,c=0,i=0,o=Object(_.a)(t);try{for(o.s();!(u=o.n()).done;)s=u.value,l=s.x,a=Math.min(a,l),c=Math.max(c,l)}catch(v){o.e(v)}finally{o.f()}d=Object(_.a)(n);try{for(d.s();!(h=d.n()).done;)f=h.value,m=f.x,r=Math.min(r,m),i=Math.max(i,m)}catch(v){d.e(v)}finally{d.f()}return e.abrupt("return",{left:Math.max(a,r),right:Math.min(c,i)});case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var B=function(e){var t,n=Object(f.b)(),a=(Object(f.c)((function(e){return e.outerCanvasInfo})),Object(f.c)((function(e){return e.innerCanvasInfo})),Object(f.c)((function(e){return e.combinedCanvasInfo}))),c=(Object(f.c)((function(e){return e.canvasSettings.canvasDimensions})),Object(f.c)((function(e){return e.image.source}))),i=a.numColoredOuterPixels,u=a.numColoredInnerPixels,s=e.webcamRef,l=Object(d.a)({},e,{canvasContext:[a.context,E]});function h(){return(h=Object(p.a)(v.a.mark((function e(){var t,r,i,o;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X(c,a);case 2:t=e.sent,r=t.topPixelsCount,i=t.bottomPixelsCount,o=t.context,n(E(o)),n(b(r)),n(g(i));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement("div",null,r.a.createElement("div",{className:"d-flex justify-content-around align-items-center"},r.a.createElement(x,l),r.a.createElement("div",null,r.a.createElement(o.a,{className:"my-1",variant:"outline-primary",onClick:function(){window.scrollTo(0,s.current.offsetTop)}},"Retake"),r.a.createElement("div",null,r.a.createElement("div",{className:"my-4"},r.a.createElement(o.a,{className:"mr-4",variant:"outline-primary"},"-"),r.a.createElement(o.a,{variant:"outline-primary"},"+")),r.a.createElement(o.a,{onClick:function(){return h.apply(this,arguments)}},"Analyze")),r.a.createElement("div",{className:"mt-4"},"Loss:"," ",(100*((t=i)-u)/t).toFixed(4),"%"))))},J=n(23),z=n.n(J);n(41);n(42);var Q=Object(u.withOrientationChange)((function(e){var t=Object(f.b)(),n=Object(f.c)((function(e){return e.videoReducer.videoConstraints})),c=Object(f.c)((function(e){return e.image.source})),i=Object(f.c)((function(e){return e.canvasSettings.canvasDimensions})),u=e.isPortrait,s=Object(a.useRef)(null),d=Object(a.useRef)(null),h=Object(a.useRef)(null);Object(a.useEffect)((function(){}),[]);var m=Object(a.useCallback)((function(){var e,n=s.current.getScreenshot();t((e=n,function(t){var n=new Image;n.onload=function(){t({type:"IMAGE_SET",payload:n})},n.src=e})),window.scrollTo(0,h.current.offsetTop)}),[s]),v={webcamRef:s,image:c,canvasDimensions:{canvasWidth:i.width,canvasHeight:i.height},drawDimensions:{drawWidth:i.width,drawHeight:i.height}};return r.a.createElement("div",{className:"App"},r.a.createElement("h2",null,"Ptosis calculator"),u&&r.a.createElement("h5",null,"Please rotate your device"),!u&&r.a.createElement("div",{className:"d-flex justify-content-around align-items-center",ref:d},r.a.createElement("div",{style:{position:"relative",float:"top"}},r.a.createElement(l.a,{audio:!1,height:n.height,ref:s,screenshotFormat:"image/jpeg",width:n.width,videoConstraints:n}),r.a.createElement("div",{className:"overlay"},r.a.createElement("img",{className:"target",style:{height:n.height},src:z.a}))),r.a.createElement("div",{className:"my-3"},r.a.createElement(o.a,{onClick:function(){return m()}},"Take picture"))),r.a.createElement("div",{ref:h},r.a.createElement(B,v)))}));var $=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(Q,null))};var q=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement($,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(43);var K=n(8),Y=n(24);var Z={isOuterEdit:!0};var ee={context:null,recoloredImageData:null,numColoredPixels:0,detectedPixels:[],recolorHex:"#00FF00"};var te={context:null,recoloredImageData:null,numColoredPixels:0,detectedPixels:[],recolorHex:"#FFA500"};var ne={canvasDimensions:{width:450,height:320}};var ae={videoConstraints:{width:450,height:320,facingMode:{exact:"environment"},audio:!1,imageSmoothing:!0,screenshotQuality:1}};var re=Object(K.c)({image:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"IMAGE_SET":return Object(d.a)({},e,{source:t.payload});default:return e}},canvasEdit:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TOGGLE_IS_OUTER_EDIT":return Object(d.a)({},e,{isOuterEdit:!e.isOuterEdit});default:return e}},innerCanvasInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_INNER_CONTEXT":return Object(d.a)({},e,{context:t.payload});case"SET_INNER_RECOLORED_IMAGE_DATA":return Object(d.a)({},e,{recoloredImageData:t.payload});case"SET_INNER_DETECTED_PIXELS":return Object(d.a)({},e,{detectedPixels:t.payload});case"SET_INNER_NUM_COLORED_PIXELS":return Object(d.a)({},e,{numColoredPixels:t.payload});case"SET_INNER_RECOLOR_HEX":return Object(d.a)({},e,{recolorHex:t.payload});default:return e}},outerCanvasInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_OUTER_CONTEXT":return Object(d.a)({},e,{context:t.payload});case"SET_OUTER_RECOLORED_IMAGE_DATA":return Object(d.a)({},e,{recoloredImageData:t.payload});case"SET_OUTER_DETECTED_PIXELS":return Object(d.a)({},e,{detectedPixels:t.payload});case"SET_OUTER_NUM_COLORED_PIXELS":return Object(d.a)({},e,{numColoredPixels:t.payload});case"SET_OUTER_RECOLOR_HEX":return Object(d.a)({},e,{recolorHex:t.payload});default:return e}},combinedCanvasInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_COMBINE_CONTEXT":return Object(d.a)({},e,{context:t.payload});case"SET_NUM_COLORED_INNER_PIXELS":return Object(d.a)({},e,{numColoredInnerPixels:t.payload});case"SET_NUM_COLORED_OUTER_PIXELS":return Object(d.a)({},e,{numColoredOuterPixels:t.payload});default:return e}},canvasSettings:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CANVAS_DIMENSIONS":return Object(d.a)({},e,{source:t.payload});default:return e}},videoReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,t=arguments.length>1?arguments[1]:void 0;return t.type,e}}),ce=Object(K.d)(re,Object(K.a)(Y.a));i.a.render(r.a.createElement(f.a,{store:ce},r.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[26,1,2]]]);
//# sourceMappingURL=main.58da7b3e.chunk.js.map