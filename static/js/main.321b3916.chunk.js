(this["webpackJsonpcreate-react-plus"]=this["webpackJsonpcreate-react-plus"]||[]).push([[0],{116:function(e,t,a){},119:function(e,t,a){e.exports=a.p+"static/media/63.8a2e2c1e.jpg"},120:function(e,t,a){},123:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(12),c=a.n(i),o=(a(76),a(15)),l=a(133),s=a(129),u=a(130),d=a(68),h=a(57),m=a(58),f=a.n(m),v=a(5);var g={source:null,image:null};var E=a(6),y=a(10),b=a.n(y),x=a(14);function p(e){return{type:"SET_COMBINE_CANVAS",payload:e}}function O(e){return{type:"SET_COMBINE_CONTEXT",payload:e}}var w={canvas:null,context:null,numColoredOuterPixels:0,numColoredInnerPixels:0};var _={threshold:20,age:"",sex:"",note:""};var j=a(13);a(86);var T=function(e){var t=Object(E.b)(),a=e.image,i=e.canvasDimensions,c=i.canvasWidth,l=i.canvasHeight,s=e.drawDimensions,u=s.drawWidth,d=s.drawHeight,h=Object(o.a)(e.canvasContext,2),m=h[0],f=h[1],v=e.setCanvas,g=Object(n.useRef)(null);return Object(n.useEffect)((function(){var e=g.current,a=e.getContext("2d");t(f(a)),t(v(e))}),[]),Object(n.useEffect)((function(){if(null!=a&&null!=m){var e=g.current;e.width=c,e.height=l,m.drawImage(a,0,0,u,d)}}),[a,u,d,c,l]),r.a.createElement("div",{className:"mx-auto"},r.a.createElement("canvas",{ref:g}))},C=a(18),S=a(29),N=function e(t){var a=t.x,n=t.y;Object(S.a)(this,e),this.x=a,this.y=n},I=a(87),R=a(112);function A(e,t,a,n){var r=[];r.push(t);var i=[];i.push(t,t);var c=new Set;for(c.add(t);i.length>0;){var o,l=W(i.pop()),s=Object(C.a)(l);try{for(s.s();!(o=s.n()).done;){var u=o.value,d=X(u.x,u.y);M(u,a)&&!c.has(d)&&D(u,e,t,n)&&(i.push(u),r.push(u)),c.add(d)}}catch(h){s.e(h)}finally{s.f()}}return r}function D(e,t,a,n){return P(t,e,a)<n}function P(e,t,a){var n=e.rgbPixel(t),r=I.rgb.lab([n.r,n.g,n.b]),i={L:r[0],A:r[1],B:r[2]},c=e.rgbPixel(a),o=I.rgb.lab([c.r,c.g,c.b]),l={L:o[0],A:o[1],B:o[2]};return R.getDeltaE00(i,l)}function M(e,t){var a=e.x,n=e.y;return a>0&&a<t.width&&n>0&&n<t.height}var L=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];function W(e){var t,a=[],n=e.x,r=e.y,i=Object(C.a)(L);try{for(i.s();!(t=i.n()).done;){var c=t.value,l=Object(o.a)(c,2),s=l[0],u=l[1];a.push(new N({x:s+n,y:u+r}))}}catch(d){i.e(d)}finally{i.f()}return a}function k(e,t,a,n){var r,i=t.leftX,c=t.rightX,o=t.height,l=0,s=new Set,u=Object(C.a)(n);try{for(u.s();!(r=u.n()).done;)for(var d=r.value,h=d.x,m=d.y;m<o/2;m++){var f=X(h,m),v={x:h,y:m};!s.has(f)&&i<=h&&h<=c&&(s.add(f),e.tint(v,a),l++)}}catch(g){u.e(g)}finally{u.f()}return l}function X(e,t){return String(e)+String(t)}var H=a(60),U=function(){function e(t){var a=t.canvasWidth,n=t.imageArray;Object(S.a)(this,e),this.canvasWidth=a,this.imageArray=n}return Object(H.a)(e,[{key:"rgbPixel",value:function(e){var t=e.x,a=e.y,n=z(t,a,this.canvasWidth)+0,r=z(t,a,this.canvasWidth)+1,i=z(t,a,this.canvasWidth)+2,c=this.imageArray[n],o=this.imageArray[r],l=this.imageArray[i];if(0!==c&&0!==o&&0!==l){var s=z(t,a,this.canvasWidth)+3;this.imageArray[s]}return{r:c,g:o,b:l}}},{key:"rgbaPixel",value:function(e){var t=e.x,a=e.y,n=this.rgbPixel({x:t,y:a}),r=z(t,a,this.canvasWidth)+3,i=this.imageArray[r];return n.alpha=i,n}},{key:"recolor",value:function(e,t){var a=t.r,n=t.g,r=t.b,i=e.x,c=e.y,o=z(i,c,this.canvasWidth)+0,l=z(i,c,this.canvasWidth)+1,s=z(i,c,this.canvasWidth)+2;this.imageArray[o]=Number(a),this.imageArray[l]=Number(n),this.imageArray[s]=Number(r)}},{key:"tint",value:function(e,t){var a=t.r,n=t.g,r=t.b,i=e.x,c=e.y,o=z(i,c,this.canvasWidth)+0,l=z(i,c,this.canvasWidth)+1,s=z(i,c,this.canvasWidth)+2,u=this.imageArray[o],d=this.imageArray[l],h=this.imageArray[s];this.imageArray[o]+=this.tintDelta(u,a),this.imageArray[l]+=this.tintDelta(d,n),this.imageArray[s]+=this.tintDelta(h,r)}},{key:"tintDelta",value:function(e,t){return(t-e)/3}}]),e}();function z(e,t,a){return 4*(e+t*a)}function F(e,t,a){var n=e.width,r=e.height,i={detectionWidth:n,detectionHeight:r},c=t.context;c.drawImage(e,0,0,n,r);var o=c.getImageData(0,0,n,r),l=new U({canvasWidth:i.detectionWidth,imageArray:o.data});!function(e,t){for(var a=t.width,n=t.height,r=0,i=0,c=0,o=0;o<a;o++)for(var l=0;l<n/2;l++){if(Math.sqrt(Math.pow(o-200,2)+Math.pow(l-200,2))<188){var s=e.rgbPixel({x:o,y:l});r=Math.max(s.r,r),i=Math.max(s.g,i),c=Math.max(s.b,c)}}for(var u=i/r,d=i/c,h=0;h<a;h++)for(var m=0;m<n/2;m++){var f=e.rgbPixel({x:h,y:m}),v=parseInt(f.r*u),g=f.g,E=parseInt(f.b*d);e.recolor({x:h,y:m},{r:v,g:g,b:E})}}(l,{width:n,height:r});var s=function(e,t){for(var a=t.detectionWidth,n=t.detectionHeight,r=a/2,i={x:r},c=0,o=12;o<n/2;o++){var l={x:r,y:o},s=e.rgbPixel(l),u=2*s.r-s.b-s.g;u>c&&(i.y=o,c=u)}return i}(l,i),u=A(l,s,{width:n,height:r},a),d=function(e,t,a,n){for(var r=a/2,i={x:r},c=Number.MIN_SAFE_INTEGER,o=12;o<n/2;o++){var l={x:r,y:o};if(!(o<e.y+7&&o>e.y-7)){var s=t.rgbPixel(l),u=2*s.r-s.b-s.g;u>c&&(i.y=o,c=u)}}return i}(s,l,n,r),h=u,m=A(l,d,{width:n,height:r},a);if(s.y>d.y){var f=[m,h];h=f[0],m=f[1]}var v=function(e,t){var a=function(e,t){var a,n={top:{left:{x:Number.MAX_SAFE_INTEGER,y:void 0},right:{x:0,y:void 0}},bottom:{left:{x:Number.MAX_SAFE_INTEGER,y:void 0},right:{x:0,y:void 0}}},r=Object(C.a)(e);try{for(r.s();!(a=r.n()).done;){var i=a.value,c=i.x,o=i.y;c<n.top.left.x&&(n.top.left.x=c,n.top.left.y=o),c>n.top.right.x&&(n.top.right.x=c,n.top.right.y=o)}}catch(m){r.e(m)}finally{r.f()}var l,s=Object(C.a)(t);try{for(s.s();!(l=s.n()).done;){var u=l.value,d=u.x,h=u.y;d<n.bottom.left.x&&(n.bottom.left.x=d,n.bottom.left.y=h),d>n.bottom.right.x&&(n.bottom.right.x=d,n.bottom.right.y=h)}}catch(m){s.e(m)}finally{s.f()}return n}(e,t);if(!(a.top.left.y>182&&a.bottom.left.y>182)&&!(a.bottom.left.y>182&&a.top.left.x<a.bottom.left.x)){var n=Math.max(a.top.left.x,a.bottom.left.x);a.top.left.x=n,a.bottom.left.x=n}if(!(a.top.right.y>182&&a.bottom.right.y>182)&&!(a.bottom.right.y>182&&a.top.right.x>a.bottom.right.x)){var r=Math.min(a.top.right.x,a.bottom.right.x);a.top.right.x=r,a.bottom.right.x=r}return a}(h,m),g=k(l,{leftX:v.top.left.x,rightX:v.top.right.x,height:r},{r:0,g:255,b:0},h),E=k(l,{leftX:v.bottom.left.x,rightX:v.bottom.right.x,height:r},{r:0,g:0,b:255},m);return c.putImageData(o,0,0,0,0,i.detectionWidth,i.detectionHeight),{topPixelsCount:g,bottomPixelsCount:E}}function G(e){return new Promise((function(t){for(var a=new Map,n=0,r=20,i=25;i>=5;i--){var c=e(i),o=parseInt(c),l=a.has(o)?a.get(o):0;l++,a.set(o,l),l>=n&&(n=l,r=i)}t(r)}))}function B(e,t){return(100*(e-t)/e).toFixed(2)}var V="bold 20px Arial",q="normal 15px Arial";function J(e,t,a,n){return Q.apply(this,arguments)}function Q(){return(Q=Object(x.a)(b.a.mark((function e(t,a,n,r){var i,c,o,l,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=n.current,c=i.getContext("2d"),i.height=1200,i.width=500,c.fillStyle="white",c.fillRect(0,0,500,1200),250,c.font=V,c.fillStyle="black",c.textAlign="center",c.fillText("- Original image -",250,40),c.drawImage(t,50,50),c.fillText("- Analyzed image -",250,500),c.drawImage(a,50,510),c.fillText("- Information -",250,975),c.font=q,250,c.fillText("Loss %: "+r.loss,250,1e3),c.fillText("Sensitivity: "+r.threshold,250,1020),o=new Date,r.date=o.toDateString(),c.fillText("Analyzed date: "+r.date,250,1080),c.fillText("Version: 1.0",250,1100),l=i.toDataURL("image/jpg"),(s=document.createElement("a")).href=l,s.download=$(r),s.click();case 28:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $(e){var t=e.date;return t+=e.sex?"- Sex "+e.sex:"",t+=e.age?"- Age "+e.age:""}a(128),a(131),a(132),a(62),a(116);var K=function(e){var t=Object(E.b)(),a=(Object(E.c)((function(e){return e.combinedCanvasInfo.canvas})),Object(E.c)((function(e){return e.combinedCanvasInfo}))),i=Object(E.c)((function(e){return e.image.source})),c=Object(E.c)((function(e){return e.downloadReducer.threshold})),l=function(e){t(function(e){return{type:"SET_THRESHOLD",payload:e}}(e))},s=(Object(E.c)((function(e){return e.downloadReducer.sex})),Object(E.c)((function(e){return e.downloadReducer.age})),Object(E.c)((function(e){return e.downloadReducer.note}))),h=a.numColoredOuterPixels,m=a.numColoredInnerPixels,f=e.webcamContainerRef,g=Object(o.a)(e.cameraState,2)[1],y=B(h,m),w=Object(v.a)({},e,{canvasContext:[a.context,O],setCanvas:p}),_=Object(n.useRef)(null);function C(e){l(Math.max(0,c+e))}function S(e){var n=F(i,a,e),r=n.topPixelsCount,c=n.bottomPixelsCount;return t({type:"SET_NUM_COLORED_OUTER_PIXELS",payload:r}),t({type:"SET_NUM_COLORED_INNER_PIXELS",payload:c}),100*(r-c)/r}return Object(n.useEffect)((function(){function e(){return(e=Object(x.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!i){e.next=5;break}return e.next=3,G(S);case 3:t=e.sent,l(t);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[i]),Object(n.useEffect)((function(){i&&S(c)}),[c]),r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,null,i&&r.a.createElement("h2",{className:"card-title"},"Results"),r.a.createElement("div",null,r.a.createElement(T,w),i&&r.a.createElement("div",{className:"d-flex justify-content-around align-items-center mb-4"},r.a.createElement("div",null,r.a.createElement(d.a,{variant:"outline-primary",onClick:function(){g(!0),window.scrollTo(0,f.current.offsetTop)}},"Retake picture"),r.a.createElement("div",null,r.a.createElement("h3",{className:"mt-4"},"Loss: ",y,"%"),r.a.createElement("div",{className:"mt-4"},r.a.createElement(d.a,{variant:"primary",onClick:function(){return J(i,a.canvas,_,{note:s,loss:y,threshold:c})},size:"lg"},"Download")))),r.a.createElement(u.a,null,r.a.createElement(u.a.Body,null,r.a.createElement(u.a.Title,null,"Sensitivity: ",c),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row justify-content-around mb-3"},r.a.createElement(d.a,{onClick:function(e){C(-1)}},r.a.createElement(j.a,{icon:"minus",size:"1x"})),r.a.createElement(d.a,{onClick:function(e){C(1)}},r.a.createElement(j.a,{icon:"plus",size:"1x"}))),r.a.createElement("div",{className:"row justify-content-between"},r.a.createElement(d.a,{className:"mr-1",onClick:function(e){C(-3)}},r.a.createElement(j.a,{icon:"minus",size:"1x"}),"  ",r.a.createElement(j.a,{icon:"minus",size:"1x"})),r.a.createElement(d.a,{onClick:function(e){C(3)}},r.a.createElement(j.a,{icon:"plus",size:"1x"}),"  ",r.a.createElement(j.a,{icon:"plus",size:"1x"}))))))))),r.a.createElement("canvas",{style:{display:"none"},ref:_}))},Y=a(63),Z=a.n(Y);a(119),a(120);var ee=Object(h.withOrientationChange)((function(e){var t=Object(E.b)(),a=Object(n.useState)(!0),i=Object(o.a)(a,2),c=i[0],h=i[1],m=Object(E.c)((function(e){return e.videoReducer.videoConstraints})),v=Object(E.c)((function(e){return e.image.source})),g=Object(E.c)((function(e){return e.canvasSettings.canvasDimensions})),y=e.isPortrait,b=Object(n.useRef)(null),x=Object(n.useRef)(null),p=Object(n.useRef)(null);Object(n.useEffect)((function(){}),[]);var O=function(){if(c){var e,a=x.current.getScreenshot();t((e=a,function(t){var a=new Image;a.onload=function(){t({type:"IMAGE_SOURCE_SET",payload:a})},a.src=e})),t(function(e){return{type:"IMAGE_SET",payload:e}}(a)),window.scrollTo(0,p.current.offsetTop),h(!1)}else h(!0)},w={webcamRef:x,webcamContainerRef:b,image:v,canvasDimensions:{canvasWidth:g.width,canvasHeight:g.height},drawDimensions:{drawWidth:g.width,drawHeight:g.height},isPortrait:y,cameraState:[c,h]},_=r.a.createElement(l.a,{id:"popover-basic"},r.a.createElement(l.a.Content,null,"Draw your chart with red sharpie. Align the red target's circle concentrically with the chart's smallest circle that still encompasses all of the the drawn lines for increased accuracy. Also ensure the target cross is aligned with the chart. Camera focus will happen automatically. Tap the (?) again to close this popover."));return r.a.createElement("div",{className:"App mt-2"},r.a.createElement("h2",{className:"card-title",style:{display:"inline"}},"Capture chart"," "),r.a.createElement(s.a,{trigger:"click",placement:"bottom",overlay:_},r.a.createElement(j.a,{icon:"question-circle",size:"2x"})),r.a.createElement(u.a,{className:"mt-4"},r.a.createElement("div",{className:"mx-auto"},r.a.createElement("div",{className:"capture-container mx-auto",ref:b},c&&r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,{ref:x,audio:!1,height:m.height,screenshotFormat:"image/jpeg",width:m.width,videoConstraints:m}),r.a.createElement("div",{className:"overlay"},r.a.createElement("img",{className:"target",style:{width:m.width-20},src:Z.a}))))),r.a.createElement("div",{className:"my-2 z-top mx-auto"},r.a.createElement(d.a,{className:"capture-button",onClick:function(){return O()}},r.a.createElement(j.a,{icon:"camera",size:"3x"})))),r.a.createElement("div",{className:"mt-4",ref:p},r.a.createElement(K,w)),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null))})),te=a(23),ae=a(64),ne=a(24);te.b.add(ae.a,ne.b,ne.c,ne.a,ne.d);var re=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(ee,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(122);var ie=a(21),ce=a(65);var oe={context:null,recoloredImageData:null,numColoredPixels:0,detectedPixels:[],recolorHex:"#00FF00"};var le={context:null,recoloredImageData:null,numColoredPixels:0,detectedPixels:[],recolorHex:"#FFA500"};var se={canvasDimensions:{width:400,height:400}};var ue={videoConstraints:{width:400,height:400,facingMode:{exact:"environment"},audio:!1,imageSmoothing:!0,screenshotQuality:1}};var de=Object(ie.c)({image:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"IMAGE_SOURCE_SET":return Object(v.a)({},e,{source:t.payload});case"IMAGE_SET":return Object(v.a)({},e,{image:t.payload});default:return e}},innerCanvasInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_INNER_CONTEXT":return Object(v.a)({},e,{context:t.payload});case"SET_INNER_RECOLORED_IMAGE_DATA":return Object(v.a)({},e,{recoloredImageData:t.payload});case"SET_INNER_DETECTED_PIXELS":return Object(v.a)({},e,{detectedPixels:t.payload});case"SET_INNER_NUM_COLORED_PIXELS":return Object(v.a)({},e,{numColoredPixels:t.payload});case"SET_INNER_RECOLOR_HEX":return Object(v.a)({},e,{recolorHex:t.payload});default:return e}},outerCanvasInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_OUTER_CONTEXT":return Object(v.a)({},e,{context:t.payload});case"SET_OUTER_RECOLORED_IMAGE_DATA":return Object(v.a)({},e,{recoloredImageData:t.payload});case"SET_OUTER_DETECTED_PIXELS":return Object(v.a)({},e,{detectedPixels:t.payload});case"SET_OUTER_NUM_COLORED_PIXELS":return Object(v.a)({},e,{numColoredPixels:t.payload});case"SET_OUTER_RECOLOR_HEX":return Object(v.a)({},e,{recolorHex:t.payload});default:return e}},combinedCanvasInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_COMBINE_CONTEXT":return Object(v.a)({},e,{context:t.payload});case"SET_NUM_COLORED_INNER_PIXELS":return Object(v.a)({},e,{numColoredInnerPixels:t.payload});case"SET_NUM_COLORED_OUTER_PIXELS":return Object(v.a)({},e,{numColoredOuterPixels:t.payload});case"SET_COMBINE_CANVAS":return Object(v.a)({},e,{canvas:t.payload});default:return e}},canvasSettings:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:se,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CANVAS_DIMENSIONS":return Object(v.a)({},e,{source:t.payload});default:return e}},videoReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;return t.type,e},downloadReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_THRESHOLD":return Object(v.a)({},e,{threshold:t.payload});case"SET_AGE":return Object(v.a)({},e,{age:t.payload});case"SET_SEX":return Object(v.a)({},e,{sex:t.payload});case"SET_NOTE":return Object(v.a)({},e,{note:t.payload});default:return e}}}),he=Object(ie.d)(de,Object(ie.a)(ce.a));c.a.render(r.a.createElement(E.a,{store:he},r.a.createElement(re,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},63:function(e,t,a){e.exports=a.p+"static/media/circle.9036c121.png"},71:function(e,t,a){e.exports=a(123)},76:function(e,t,a){},86:function(e,t,a){}},[[71,1,2]]]);
//# sourceMappingURL=main.321b3916.chunk.js.map