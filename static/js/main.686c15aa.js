/*! For license information please see main.686c15aa.js.LICENSE.txt */
(()=>{var e={43:(e,t,n)=>{"use strict";e.exports=n(202)},153:(e,t,n)=>{"use strict";var r=n(43),i=Symbol.for("react.element"),o=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,o={},c=null,u=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)a.call(t,r)&&!l.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:i,type:e,key:c,ref:u,props:o,_owner:s.current}}t.Fragment=o,t.jsx=c,t.jsxs=c},202:(e,t)=>{"use strict";var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),p=Symbol.iterator;var f={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,m={};function b(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||f}function y(){}function v(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||f}b.prototype.isReactComponent={},b.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},b.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=b.prototype;var x=v.prototype=new y;x.constructor=v,g(x,b.prototype),x.isPureReactComponent=!0;var w=Array.isArray,_=Object.prototype.hasOwnProperty,k={current:null},C={key:!0,ref:!0,__self:!0,__source:!0};function S(e,t,r){var i,o={},a=null,s=null;if(null!=t)for(i in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(a=""+t.key),t)_.call(t,i)&&!C.hasOwnProperty(i)&&(o[i]=t[i]);var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];o.children=c}if(e&&e.defaultProps)for(i in l=e.defaultProps)void 0===o[i]&&(o[i]=l[i]);return{$$typeof:n,type:e,key:a,ref:s,props:o,_owner:k.current}}function E(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var T=/\/+/g;function I(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function N(e,t,i,o,a){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l=!1;if(null===e)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case n:case r:l=!0}}if(l)return a=a(l=e),e=""===o?"."+I(l,0):o,w(a)?(i="",null!=e&&(i=e.replace(T,"$&/")+"/"),N(a,t,i,"",(function(e){return e}))):null!=a&&(E(a)&&(a=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(a,i+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(T,"$&/")+"/")+e)),t.push(a)),1;if(l=0,o=""===o?".":o+":",w(e))for(var c=0;c<e.length;c++){var u=o+I(s=e[c],c);l+=N(s,t,i,u,a)}else if(u=function(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"===typeof u)for(e=u.call(e),c=0;!(s=e.next()).done;)l+=N(s=s.value,t,i,u=o+I(s,c++),a);else if("object"===s)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function j(e,t,n){if(null==e)return e;var r=[],i=0;return N(e,r,"","",(function(e){return t.call(n,e,i++)})),r}function P(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var R={current:null},D={transition:null},F={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:D,ReactCurrentOwner:k};function O(){throw Error("act(...) is not supported in production builds of React.")}t.Children={map:j,forEach:function(e,t,n){j(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return j(e,(function(){t++})),t},toArray:function(e){return j(e,(function(e){return e}))||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=b,t.Fragment=i,t.Profiler=a,t.PureComponent=v,t.StrictMode=o,t.Suspense=u,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F,t.act=O,t.cloneElement=function(e,t,r){if(null===e||void 0===e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var i=g({},e.props),o=e.key,a=e.ref,s=e._owner;if(null!=t){if(void 0!==t.ref&&(a=t.ref,s=k.current),void 0!==t.key&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)_.call(t,c)&&!C.hasOwnProperty(c)&&(i[c]=void 0===t[c]&&void 0!==l?l[c]:t[c])}var c=arguments.length-2;if(1===c)i.children=r;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];i.children=l}return{$$typeof:n,type:e.type,key:o,ref:a,props:i,_owner:s}},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:s,_context:e},e.Consumer=e},t.createElement=S,t.createFactory=function(e){var t=S.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=E,t.lazy=function(e){return{$$typeof:h,_payload:{_status:-1,_result:e},_init:P}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=D.transition;D.transition={};try{e()}finally{D.transition=t}},t.unstable_act=O,t.useCallback=function(e,t){return R.current.useCallback(e,t)},t.useContext=function(e){return R.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return R.current.useDeferredValue(e)},t.useEffect=function(e,t){return R.current.useEffect(e,t)},t.useId=function(){return R.current.useId()},t.useImperativeHandle=function(e,t,n){return R.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return R.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return R.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return R.current.useMemo(e,t)},t.useReducer=function(e,t,n){return R.current.useReducer(e,t,n)},t.useRef=function(e){return R.current.useRef(e)},t.useState=function(e){return R.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return R.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return R.current.useTransition()},t.version="18.3.1"},234:(e,t)=>{"use strict";function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,i=e[r];if(!(0<o(i,t)))break e;e[r]=t,e[n]=i,n=r}}function r(e){return 0===e.length?null:e[0]}function i(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,i=e.length,a=i>>>1;r<a;){var s=2*(r+1)-1,l=e[s],c=s+1,u=e[c];if(0>o(l,n))c<i&&0>o(u,l)?(e[r]=u,e[c]=n,r=c):(e[r]=l,e[s]=n,r=s);else{if(!(c<i&&0>o(u,n)))break e;e[r]=u,e[c]=n,r=c}}}return t}function o(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if("object"===typeof performance&&"function"===typeof performance.now){var a=performance;t.unstable_now=function(){return a.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var c=[],u=[],d=1,h=null,p=3,f=!1,g=!1,m=!1,b="function"===typeof setTimeout?setTimeout:null,y="function"===typeof clearTimeout?clearTimeout:null,v="undefined"!==typeof setImmediate?setImmediate:null;function x(e){for(var t=r(u);null!==t;){if(null===t.callback)i(u);else{if(!(t.startTime<=e))break;i(u),t.sortIndex=t.expirationTime,n(c,t)}t=r(u)}}function w(e){if(m=!1,x(e),!g)if(null!==r(c))g=!0,D(_);else{var t=r(u);null!==t&&F(w,t.startTime-e)}}function _(e,n){g=!1,m&&(m=!1,y(E),E=-1),f=!0;var o=p;try{for(x(n),h=r(c);null!==h&&(!(h.expirationTime>n)||e&&!N());){var a=h.callback;if("function"===typeof a){h.callback=null,p=h.priorityLevel;var s=a(h.expirationTime<=n);n=t.unstable_now(),"function"===typeof s?h.callback=s:h===r(c)&&i(c),x(n)}else i(c);h=r(c)}if(null!==h)var l=!0;else{var d=r(u);null!==d&&F(w,d.startTime-n),l=!1}return l}finally{h=null,p=o,f=!1}}"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var k,C=!1,S=null,E=-1,T=5,I=-1;function N(){return!(t.unstable_now()-I<T)}function j(){if(null!==S){var e=t.unstable_now();I=e;var n=!0;try{n=S(!0,e)}finally{n?k():(C=!1,S=null)}}else C=!1}if("function"===typeof v)k=function(){v(j)};else if("undefined"!==typeof MessageChannel){var P=new MessageChannel,R=P.port2;P.port1.onmessage=j,k=function(){R.postMessage(null)}}else k=function(){b(j,0)};function D(e){S=e,C||(C=!0,k())}function F(e,n){E=b((function(){e(t.unstable_now())}),n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){g||f||(g=!0,D(_))},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_getFirstCallbackNode=function(){return r(c)},t.unstable_next=function(e){switch(p){case 1:case 2:case 3:var t=3;break;default:t=p}var n=p;p=t;try{return e()}finally{p=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=p;p=e;try{return t()}finally{p=n}},t.unstable_scheduleCallback=function(e,i,o){var a=t.unstable_now();switch("object"===typeof o&&null!==o?o="number"===typeof(o=o.delay)&&0<o?a+o:a:o=a,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:d++,callback:i,priorityLevel:e,startTime:o,expirationTime:s=o+s,sortIndex:-1},o>a?(e.sortIndex=o,n(u,e),null===r(c)&&e===r(u)&&(m?(y(E),E=-1):m=!0,F(w,o-a))):(e.sortIndex=s,n(c,e),g||f||(g=!0,D(_))),e},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(e){var t=p;return function(){var n=p;p=t;try{return e.apply(this,arguments)}finally{p=n}}}},324:e=>{e.exports=function(e,t,n,r){var i=n?n.call(r,e,t):void 0;if(void 0!==i)return!!i;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var o=Object.keys(e),a=Object.keys(t);if(o.length!==a.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),l=0;l<o.length;l++){var c=o[l];if(!s(c))return!1;var u=e[c],d=t[c];if(!1===(i=n?n.call(r,u,d,c):void 0)||void 0===i&&u!==d)return!1}return!0}},391:(e,t,n)=>{"use strict";var r=n(950);t.createRoot=r.createRoot,t.hydrateRoot=r.hydrateRoot},579:(e,t,n)=>{"use strict";e.exports=n(153)},684:()=>{!function(){if("undefined"!==typeof window&&"undefined"!==typeof URL)try{const t=new URLSearchParams(window.location.search),n=t.get("n");if(!n)return;let r=null;try{r=localStorage.getItem("sl_notif_token_hash")}catch(e){}const i=new URL("https://us-central1-fundraiser-f0831.cloudfunctions.net/logOpen");i.searchParams.set("notifId",n),r&&i.searchParams.set("tokenHash",r),fetch(i.toString(),{method:"GET",mode:"no-cors",keepalive:!0}).catch((()=>{})),t.delete("n");const o=window.location.pathname+(t.toString()?"?"+t.toString():"")+window.location.hash;try{window.history.replaceState({},"",o)}catch(e){}}catch(e){}}()},730:(e,t,n)=>{"use strict";var r=n(43),i=n(853);function o(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var a=new Set,s={};function l(e,t){c(e,t),c(e+"Capture",t)}function c(e,t){for(s[e]=t,e=0;e<t.length;e++)a.add(t[e])}var u=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),d=Object.prototype.hasOwnProperty,h=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p={},f={};function g(e,t,n,r,i,o,a){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=a}var m={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){m[e]=new g(e,0,!1,e,null,!1,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];m[t]=new g(t,1,!1,e[1],null,!1,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){m[e]=new g(e,2,!1,e.toLowerCase(),null,!1,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){m[e]=new g(e,2,!1,e,null,!1,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){m[e]=new g(e,3,!1,e.toLowerCase(),null,!1,!1)})),["checked","multiple","muted","selected"].forEach((function(e){m[e]=new g(e,3,!0,e,null,!1,!1)})),["capture","download"].forEach((function(e){m[e]=new g(e,4,!1,e,null,!1,!1)})),["cols","rows","size","span"].forEach((function(e){m[e]=new g(e,6,!1,e,null,!1,!1)})),["rowSpan","start"].forEach((function(e){m[e]=new g(e,5,!1,e.toLowerCase(),null,!1,!1)}));var b=/[\-:]([a-z])/g;function y(e){return e[1].toUpperCase()}function v(e,t,n,r){var i=m.hasOwnProperty(t)?m[t]:null;(null!==i?0!==i.type:r||!(2<t.length)||"o"!==t[0]&&"O"!==t[0]||"n"!==t[1]&&"N"!==t[1])&&(function(e,t,n,r){if(null===t||"undefined"===typeof t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,i,r)&&(n=null),r||null===i?function(e){return!!d.call(f,e)||!d.call(p,e)&&(h.test(e)?f[e]=!0:(p[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=null===n?3!==i.type&&"":n:(t=i.attributeName,r=i.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(i=i.type)||4===i&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(b,y);m[t]=new g(t,1,!1,e,null,!1,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(b,y);m[t]=new g(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(b,y);m[t]=new g(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)})),["tabIndex","crossOrigin"].forEach((function(e){m[e]=new g(e,1,!1,e.toLowerCase(),null,!1,!1)})),m.xlinkHref=new g("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach((function(e){m[e]=new g(e,1,!1,e.toLowerCase(),null,!0,!0)}));var x=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,w=Symbol.for("react.element"),_=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),C=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),E=Symbol.for("react.provider"),T=Symbol.for("react.context"),I=Symbol.for("react.forward_ref"),N=Symbol.for("react.suspense"),j=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),R=Symbol.for("react.lazy");Symbol.for("react.scope"),Symbol.for("react.debug_trace_mode");var D=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden"),Symbol.for("react.cache"),Symbol.for("react.tracing_marker");var F=Symbol.iterator;function O(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=F&&e[F]||e["@@iterator"])?e:null}var L,A=Object.assign;function M(e){if(void 0===L)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);L=t&&t[1]||""}return"\n"+L+e}var z=!1;function $(e,t){if(!e||z)return"";z=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&"string"===typeof c.stack){for(var i=c.stack.split("\n"),o=r.stack.split("\n"),a=i.length-1,s=o.length-1;1<=a&&0<=s&&i[a]!==o[s];)s--;for(;1<=a&&0<=s;a--,s--)if(i[a]!==o[s]){if(1!==a||1!==s)do{if(a--,0>--s||i[a]!==o[s]){var l="\n"+i[a].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}}while(1<=a&&0<=s);break}}}finally{z=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?M(e):""}function U(e){switch(e.tag){case 5:return M(e.type);case 16:return M("Lazy");case 13:return M("Suspense");case 19:return M("SuspenseList");case 0:case 2:case 15:return e=$(e.type,!1);case 11:return e=$(e.type.render,!1);case 1:return e=$(e.type,!0);default:return""}}function B(e){if(null==e)return null;if("function"===typeof e)return e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case k:return"Fragment";case _:return"Portal";case S:return"Profiler";case C:return"StrictMode";case N:return"Suspense";case j:return"SuspenseList"}if("object"===typeof e)switch(e.$$typeof){case T:return(e.displayName||"Context")+".Consumer";case E:return(e._context.displayName||"Context")+".Provider";case I:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case P:return null!==(t=e.displayName||null)?t:B(e.type)||"Memo";case R:t=e._payload,e=e._init;try{return B(e(t))}catch(n){}}return null}function W(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=(e=t.render).displayName||e.name||"",t.displayName||(""!==e?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return B(t);case 8:return t===C?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof t)return t.displayName||t.name||null;if("string"===typeof t)return t}return null}function H(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function q(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function V(e){e._valueTracker||(e._valueTracker=function(e){var t=q(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function K(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=q(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function Y(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function G(e,t){var n=t.checked;return A({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function Q(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=H(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function X(e,t){null!=(t=t.checked)&&v(e,"checked",t,!1)}function J(e,t){X(e,t);var n=H(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ee(e,t.type,n):t.hasOwnProperty("defaultValue")&&ee(e,t.type,H(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function Z(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ee(e,t,n){"number"===t&&Y(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var te=Array.isArray;function ne(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+H(n),t=null,i=0;i<e.length;i++){if(e[i].value===n)return e[i].selected=!0,void(r&&(e[i].defaultSelected=!0));null!==t||e[i].disabled||(t=e[i])}null!==t&&(t.selected=!0)}}function re(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(o(91));return A({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ie(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(o(92));if(te(n)){if(1<n.length)throw Error(o(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:H(n)}}function oe(e,t){var n=H(t.value),r=H(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function ae(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}function se(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function le(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?se(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var ce,ue,de=(ue=function(e,t){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=t;else{for((ce=ce||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ce.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction((function(){return ue(e,t)}))}:ue);function he(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var pe={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},fe=["Webkit","ms","Moz","O"];function ge(e,t,n){return null==t||"boolean"===typeof t||""===t?"":n||"number"!==typeof t||0===t||pe.hasOwnProperty(e)&&pe[e]?(""+t).trim():t+"px"}function me(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),i=ge(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}Object.keys(pe).forEach((function(e){fe.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),pe[t]=pe[e]}))}));var be=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ye(e,t){if(t){if(be[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(o(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(o(60));if("object"!==typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(o(61))}if(null!=t.style&&"object"!==typeof t.style)throw Error(o(62))}}function ve(e,t){if(-1===e.indexOf("-"))return"string"===typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xe=null;function we(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var _e=null,ke=null,Ce=null;function Se(e){if(e=vi(e)){if("function"!==typeof _e)throw Error(o(280));var t=e.stateNode;t&&(t=wi(t),_e(e.stateNode,e.type,t))}}function Ee(e){ke?Ce?Ce.push(e):Ce=[e]:ke=e}function Te(){if(ke){var e=ke,t=Ce;if(Ce=ke=null,Se(e),t)for(e=0;e<t.length;e++)Se(t[e])}}function Ie(e,t){return e(t)}function Ne(){}var je=!1;function Pe(e,t,n){if(je)return e(t,n);je=!0;try{return Ie(e,t,n)}finally{je=!1,(null!==ke||null!==Ce)&&(Ne(),Te())}}function Re(e,t){var n=e.stateNode;if(null===n)return null;var r=wi(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(o(231,t,typeof n));return n}var De=!1;if(u)try{var Fe={};Object.defineProperty(Fe,"passive",{get:function(){De=!0}}),window.addEventListener("test",Fe,Fe),window.removeEventListener("test",Fe,Fe)}catch(ue){De=!1}function Oe(e,t,n,r,i,o,a,s,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(u){this.onError(u)}}var Le=!1,Ae=null,Me=!1,ze=null,$e={onError:function(e){Le=!0,Ae=e}};function Ue(e,t,n,r,i,o,a,s,l){Le=!1,Ae=null,Oe.apply($e,arguments)}function Be(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function We(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function He(e){if(Be(e)!==e)throw Error(o(188))}function qe(e){return null!==(e=function(e){var t=e.alternate;if(!t){if(null===(t=Be(e)))throw Error(o(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(null===i)break;var a=i.alternate;if(null===a){if(null!==(r=i.return)){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return He(i),e;if(a===r)return He(i),t;a=a.sibling}throw Error(o(188))}if(n.return!==r.return)n=i,r=a;else{for(var s=!1,l=i.child;l;){if(l===n){s=!0,n=i,r=a;break}if(l===r){s=!0,r=i,n=a;break}l=l.sibling}if(!s){for(l=a.child;l;){if(l===n){s=!0,n=a,r=i;break}if(l===r){s=!0,r=a,n=i;break}l=l.sibling}if(!s)throw Error(o(189))}}if(n.alternate!==r)throw Error(o(190))}if(3!==n.tag)throw Error(o(188));return n.stateNode.current===n?e:t}(e))?Ve(e):null}function Ve(e){if(5===e.tag||6===e.tag)return e;for(e=e.child;null!==e;){var t=Ve(e);if(null!==t)return t;e=e.sibling}return null}var Ke=i.unstable_scheduleCallback,Ye=i.unstable_cancelCallback,Ge=i.unstable_shouldYield,Qe=i.unstable_requestPaint,Xe=i.unstable_now,Je=i.unstable_getCurrentPriorityLevel,Ze=i.unstable_ImmediatePriority,et=i.unstable_UserBlockingPriority,tt=i.unstable_NormalPriority,nt=i.unstable_LowPriority,rt=i.unstable_IdlePriority,it=null,ot=null;var at=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(st(e)/lt|0)|0},st=Math.log,lt=Math.LN2;var ct=64,ut=4194304;function dt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194240&e;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return 130023424&e;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ht(e,t){var n=e.pendingLanes;if(0===n)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,a=268435455&n;if(0!==a){var s=a&~i;0!==s?r=dt(s):0!==(o&=a)&&(r=dt(o))}else 0!==(a=n&~i)?r=dt(a):0!==o&&(r=dt(o));if(0===r)return 0;if(0!==t&&t!==r&&0===(t&i)&&((i=r&-r)>=(o=t&-t)||16===i&&0!==(4194240&o)))return t;if(0!==(4&r)&&(r|=16&n),0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)i=1<<(n=31-at(t)),r|=e[n],t&=~i;return r}function pt(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function ft(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function gt(){var e=ct;return 0===(4194240&(ct<<=1))&&(ct=64),e}function mt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function bt(e,t,n){e.pendingLanes|=t,536870912!==t&&(e.suspendedLanes=0,e.pingedLanes=0),(e=e.eventTimes)[t=31-at(t)]=n}function yt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-at(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var vt=0;function xt(e){return 1<(e&=-e)?4<e?0!==(268435455&e)?16:536870912:4:1}var wt,_t,kt,Ct,St,Et=!1,Tt=[],It=null,Nt=null,jt=null,Pt=new Map,Rt=new Map,Dt=[],Ft="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ot(e,t){switch(e){case"focusin":case"focusout":It=null;break;case"dragenter":case"dragleave":Nt=null;break;case"mouseover":case"mouseout":jt=null;break;case"pointerover":case"pointerout":Pt.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Rt.delete(t.pointerId)}}function Lt(e,t,n,r,i,o){return null===e||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},null!==t&&(null!==(t=vi(t))&&_t(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==i&&-1===t.indexOf(i)&&t.push(i),e)}function At(e){var t=yi(e.target);if(null!==t){var n=Be(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=We(n)))return e.blockedOn=t,void St(e.priority,(function(){kt(n)}))}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function Mt(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Gt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=vi(n))&&_t(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);xe=r,n.target.dispatchEvent(r),xe=null,t.shift()}return!0}function zt(e,t,n){Mt(e)&&n.delete(t)}function $t(){Et=!1,null!==It&&Mt(It)&&(It=null),null!==Nt&&Mt(Nt)&&(Nt=null),null!==jt&&Mt(jt)&&(jt=null),Pt.forEach(zt),Rt.forEach(zt)}function Ut(e,t){e.blockedOn===t&&(e.blockedOn=null,Et||(Et=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,$t)))}function Bt(e){function t(t){return Ut(t,e)}if(0<Tt.length){Ut(Tt[0],e);for(var n=1;n<Tt.length;n++){var r=Tt[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==It&&Ut(It,e),null!==Nt&&Ut(Nt,e),null!==jt&&Ut(jt,e),Pt.forEach(t),Rt.forEach(t),n=0;n<Dt.length;n++)(r=Dt[n]).blockedOn===e&&(r.blockedOn=null);for(;0<Dt.length&&null===(n=Dt[0]).blockedOn;)At(n),null===n.blockedOn&&Dt.shift()}var Wt=x.ReactCurrentBatchConfig,Ht=!0;function qt(e,t,n,r){var i=vt,o=Wt.transition;Wt.transition=null;try{vt=1,Kt(e,t,n,r)}finally{vt=i,Wt.transition=o}}function Vt(e,t,n,r){var i=vt,o=Wt.transition;Wt.transition=null;try{vt=4,Kt(e,t,n,r)}finally{vt=i,Wt.transition=o}}function Kt(e,t,n,r){if(Ht){var i=Gt(e,t,n,r);if(null===i)Hr(e,t,r,Yt,n),Ot(e,r);else if(function(e,t,n,r,i){switch(t){case"focusin":return It=Lt(It,e,t,n,r,i),!0;case"dragenter":return Nt=Lt(Nt,e,t,n,r,i),!0;case"mouseover":return jt=Lt(jt,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return Pt.set(o,Lt(Pt.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,Rt.set(o,Lt(Rt.get(o)||null,e,t,n,r,i)),!0}return!1}(i,e,t,n,r))r.stopPropagation();else if(Ot(e,r),4&t&&-1<Ft.indexOf(e)){for(;null!==i;){var o=vi(i);if(null!==o&&wt(o),null===(o=Gt(e,t,n,r))&&Hr(e,t,r,Yt,n),o===i)break;i=o}null!==i&&r.stopPropagation()}else Hr(e,t,r,null,n)}}var Yt=null;function Gt(e,t,n,r){if(Yt=null,null!==(e=yi(e=we(r))))if(null===(t=Be(e)))e=null;else if(13===(n=t.tag)){if(null!==(e=We(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Yt=e,null}function Qt(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Je()){case Ze:return 1;case et:return 4;case tt:case nt:return 16;case rt:return 536870912;default:return 16}default:return 16}}var Xt=null,Jt=null,Zt=null;function en(){if(Zt)return Zt;var e,t,n=Jt,r=n.length,i="value"in Xt?Xt.value:Xt.textContent,o=i.length;for(e=0;e<r&&n[e]===i[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===i[o-t];t++);return Zt=i.slice(e,1<t?1-t:void 0)}function tn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function nn(){return!0}function rn(){return!1}function on(e){function t(t,n,r,i,o){for(var a in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(i):i[a]);return this.isDefaultPrevented=(null!=i.defaultPrevented?i.defaultPrevented:!1===i.returnValue)?nn:rn,this.isPropagationStopped=rn,this}return A(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=nn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=nn)},persist:function(){},isPersistent:nn}),t}var an,sn,ln,cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},un=on(cn),dn=A({},cn,{view:0,detail:0}),hn=on(dn),pn=A({},dn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Sn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ln&&(ln&&"mousemove"===e.type?(an=e.screenX-ln.screenX,sn=e.screenY-ln.screenY):sn=an=0,ln=e),an)},movementY:function(e){return"movementY"in e?e.movementY:sn}}),fn=on(pn),gn=on(A({},pn,{dataTransfer:0})),mn=on(A({},dn,{relatedTarget:0})),bn=on(A({},cn,{animationName:0,elapsedTime:0,pseudoElement:0})),yn=A({},cn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),vn=on(yn),xn=on(A({},cn,{data:0})),wn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_n={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=kn[e])&&!!t[e]}function Sn(){return Cn}var En=A({},dn,{key:function(e){if(e.key){var t=wn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=tn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?_n[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Sn,charCode:function(e){return"keypress"===e.type?tn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?tn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),Tn=on(En),In=on(A({},pn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Nn=on(A({},dn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Sn})),jn=on(A({},cn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Pn=A({},pn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Rn=on(Pn),Dn=[9,13,27,32],Fn=u&&"CompositionEvent"in window,On=null;u&&"documentMode"in document&&(On=document.documentMode);var Ln=u&&"TextEvent"in window&&!On,An=u&&(!Fn||On&&8<On&&11>=On),Mn=String.fromCharCode(32),zn=!1;function $n(e,t){switch(e){case"keyup":return-1!==Dn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Un(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Bn=!1;var Wn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Wn[e.type]:"textarea"===t}function qn(e,t,n,r){Ee(r),0<(t=Vr(t,"onChange")).length&&(n=new un("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Vn=null,Kn=null;function Yn(e){Mr(e,0)}function Gn(e){if(K(xi(e)))return e}function Qn(e,t){if("change"===e)return t}var Xn=!1;if(u){var Jn;if(u){var Zn="oninput"in document;if(!Zn){var er=document.createElement("div");er.setAttribute("oninput","return;"),Zn="function"===typeof er.oninput}Jn=Zn}else Jn=!1;Xn=Jn&&(!document.documentMode||9<document.documentMode)}function tr(){Vn&&(Vn.detachEvent("onpropertychange",nr),Kn=Vn=null)}function nr(e){if("value"===e.propertyName&&Gn(Kn)){var t=[];qn(t,Kn,e,we(e)),Pe(Yn,t)}}function rr(e,t,n){"focusin"===e?(tr(),Kn=n,(Vn=t).attachEvent("onpropertychange",nr)):"focusout"===e&&tr()}function ir(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Gn(Kn)}function or(e,t){if("click"===e)return Gn(t)}function ar(e,t){if("input"===e||"change"===e)return Gn(t)}var sr="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function lr(e,t){if(sr(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!d.call(t,i)||!sr(e[i],t[i]))return!1}return!0}function cr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ur(e,t){var n,r=cr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=cr(r)}}function dr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?dr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function hr(){for(var e=window,t=Y();t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=Y((e=t.contentWindow).document)}return t}function pr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}function fr(e){var t=hr(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&dr(n.ownerDocument.documentElement,n)){if(null!==r&&pr(n))if(t=r.start,void 0===(e=r.end)&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if((e=(t=n.ownerDocument||document)&&t.defaultView||window).getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=void 0===r.end?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=ur(n,o);var a=ur(n,r);i&&a&&(1!==e.rangeCount||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&((t=t.createRange()).setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}for(t=[],e=n;e=e.parentNode;)1===e.nodeType&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for("function"===typeof n.focus&&n.focus(),n=0;n<t.length;n++)(e=t[n]).element.scrollLeft=e.left,e.element.scrollTop=e.top}}var gr=u&&"documentMode"in document&&11>=document.documentMode,mr=null,br=null,yr=null,vr=!1;function xr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;vr||null==mr||mr!==Y(r)||("selectionStart"in(r=mr)&&pr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},yr&&lr(yr,r)||(yr=r,0<(r=Vr(br,"onSelect")).length&&(t=new un("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=mr)))}function wr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var _r={animationend:wr("Animation","AnimationEnd"),animationiteration:wr("Animation","AnimationIteration"),animationstart:wr("Animation","AnimationStart"),transitionend:wr("Transition","TransitionEnd")},kr={},Cr={};function Sr(e){if(kr[e])return kr[e];if(!_r[e])return e;var t,n=_r[e];for(t in n)if(n.hasOwnProperty(t)&&t in Cr)return kr[e]=n[t];return e}u&&(Cr=document.createElement("div").style,"AnimationEvent"in window||(delete _r.animationend.animation,delete _r.animationiteration.animation,delete _r.animationstart.animation),"TransitionEvent"in window||delete _r.transitionend.transition);var Er=Sr("animationend"),Tr=Sr("animationiteration"),Ir=Sr("animationstart"),Nr=Sr("transitionend"),jr=new Map,Pr="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Rr(e,t){jr.set(e,t),l(t,[e])}for(var Dr=0;Dr<Pr.length;Dr++){var Fr=Pr[Dr];Rr(Fr.toLowerCase(),"on"+(Fr[0].toUpperCase()+Fr.slice(1)))}Rr(Er,"onAnimationEnd"),Rr(Tr,"onAnimationIteration"),Rr(Ir,"onAnimationStart"),Rr("dblclick","onDoubleClick"),Rr("focusin","onFocus"),Rr("focusout","onBlur"),Rr(Nr,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Or="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Lr=new Set("cancel close invalid load scroll toggle".split(" ").concat(Or));function Ar(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,i,a,s,l,c){if(Ue.apply(this,arguments),Le){if(!Le)throw Error(o(198));var u=Ae;Le=!1,Ae=null,Me||(Me=!0,ze=u)}}(r,t,void 0,e),e.currentTarget=null}function Mr(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==o&&i.isPropagationStopped())break e;Ar(i,s,c),o=l}else for(a=0;a<r.length;a++){if(l=(s=r[a]).instance,c=s.currentTarget,s=s.listener,l!==o&&i.isPropagationStopped())break e;Ar(i,s,c),o=l}}}if(Me)throw e=ze,Me=!1,ze=null,e}function zr(e,t){var n=t[gi];void 0===n&&(n=t[gi]=new Set);var r=e+"__bubble";n.has(r)||(Wr(t,e,2,!1),n.add(r))}function $r(e,t,n){var r=0;t&&(r|=4),Wr(n,e,r,t)}var Ur="_reactListening"+Math.random().toString(36).slice(2);function Br(e){if(!e[Ur]){e[Ur]=!0,a.forEach((function(t){"selectionchange"!==t&&(Lr.has(t)||$r(t,!1,e),$r(t,!0,e))}));var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Ur]||(t[Ur]=!0,$r("selectionchange",!1,t))}}function Wr(e,t,n,r){switch(Qt(t)){case 1:var i=qt;break;case 4:i=Vt;break;default:i=Kt}n=i.bind(null,t,n,e),i=void 0,!De||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(i=!0),r?void 0!==i?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):void 0!==i?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Hr(e,t,n,r,i){var o=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var a=r.tag;if(3===a||4===a){var s=r.stateNode.containerInfo;if(s===i||8===s.nodeType&&s.parentNode===i)break;if(4===a)for(a=r.return;null!==a;){var l=a.tag;if((3===l||4===l)&&((l=a.stateNode.containerInfo)===i||8===l.nodeType&&l.parentNode===i))return;a=a.return}for(;null!==s;){if(null===(a=yi(s)))return;if(5===(l=a.tag)||6===l){r=o=a;continue e}s=s.parentNode}}r=r.return}Pe((function(){var r=o,i=we(n),a=[];e:{var s=jr.get(e);if(void 0!==s){var l=un,c=e;switch(e){case"keypress":if(0===tn(n))break e;case"keydown":case"keyup":l=Tn;break;case"focusin":c="focus",l=mn;break;case"focusout":c="blur",l=mn;break;case"beforeblur":case"afterblur":l=mn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":l=fn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":l=gn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":l=Nn;break;case Er:case Tr:case Ir:l=bn;break;case Nr:l=jn;break;case"scroll":l=hn;break;case"wheel":l=Rn;break;case"copy":case"cut":case"paste":l=vn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":l=In}var u=0!==(4&t),d=!u&&"scroll"===e,h=u?null!==s?s+"Capture":null:s;u=[];for(var p,f=r;null!==f;){var g=(p=f).stateNode;if(5===p.tag&&null!==g&&(p=g,null!==h&&(null!=(g=Re(f,h))&&u.push(qr(f,g,p)))),d)break;f=f.return}0<u.length&&(s=new l(s,c,null,n,i),a.push({event:s,listeners:u}))}}if(0===(7&t)){if(l="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||n===xe||!(c=n.relatedTarget||n.fromElement)||!yi(c)&&!c[fi])&&(l||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,l?(l=r,null!==(c=(c=n.relatedTarget||n.toElement)?yi(c):null)&&(c!==(d=Be(c))||5!==c.tag&&6!==c.tag)&&(c=null)):(l=null,c=r),l!==c)){if(u=fn,g="onMouseLeave",h="onMouseEnter",f="mouse","pointerout"!==e&&"pointerover"!==e||(u=In,g="onPointerLeave",h="onPointerEnter",f="pointer"),d=null==l?s:xi(l),p=null==c?s:xi(c),(s=new u(g,f+"leave",l,n,i)).target=d,s.relatedTarget=p,g=null,yi(i)===r&&((u=new u(h,f+"enter",c,n,i)).target=p,u.relatedTarget=d,g=u),d=g,l&&c)e:{for(h=c,f=0,p=u=l;p;p=Kr(p))f++;for(p=0,g=h;g;g=Kr(g))p++;for(;0<f-p;)u=Kr(u),f--;for(;0<p-f;)h=Kr(h),p--;for(;f--;){if(u===h||null!==h&&u===h.alternate)break e;u=Kr(u),h=Kr(h)}u=null}else u=null;null!==l&&Yr(a,s,l,u,!1),null!==c&&null!==d&&Yr(a,d,c,u,!0)}if("select"===(l=(s=r?xi(r):window).nodeName&&s.nodeName.toLowerCase())||"input"===l&&"file"===s.type)var m=Qn;else if(Hn(s))if(Xn)m=ar;else{m=ir;var b=rr}else(l=s.nodeName)&&"input"===l.toLowerCase()&&("checkbox"===s.type||"radio"===s.type)&&(m=or);switch(m&&(m=m(e,r))?qn(a,m,n,i):(b&&b(e,s,r),"focusout"===e&&(b=s._wrapperState)&&b.controlled&&"number"===s.type&&ee(s,"number",s.value)),b=r?xi(r):window,e){case"focusin":(Hn(b)||"true"===b.contentEditable)&&(mr=b,br=r,yr=null);break;case"focusout":yr=br=mr=null;break;case"mousedown":vr=!0;break;case"contextmenu":case"mouseup":case"dragend":vr=!1,xr(a,n,i);break;case"selectionchange":if(gr)break;case"keydown":case"keyup":xr(a,n,i)}var y;if(Fn)e:{switch(e){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else Bn?$n(e,n)&&(v="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(v="onCompositionStart");v&&(An&&"ko"!==n.locale&&(Bn||"onCompositionStart"!==v?"onCompositionEnd"===v&&Bn&&(y=en()):(Jt="value"in(Xt=i)?Xt.value:Xt.textContent,Bn=!0)),0<(b=Vr(r,v)).length&&(v=new xn(v,e,null,n,i),a.push({event:v,listeners:b}),y?v.data=y:null!==(y=Un(n))&&(v.data=y))),(y=Ln?function(e,t){switch(e){case"compositionend":return Un(t);case"keypress":return 32!==t.which?null:(zn=!0,Mn);case"textInput":return(e=t.data)===Mn&&zn?null:e;default:return null}}(e,n):function(e,t){if(Bn)return"compositionend"===e||!Fn&&$n(e,t)?(e=en(),Zt=Jt=Xt=null,Bn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return An&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(r=Vr(r,"onBeforeInput")).length&&(i=new xn("onBeforeInput","beforeinput",null,n,i),a.push({event:i,listeners:r}),i.data=y))}Mr(a,t)}))}function qr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Vr(e,t){for(var n=t+"Capture",r=[];null!==e;){var i=e,o=i.stateNode;5===i.tag&&null!==o&&(i=o,null!=(o=Re(e,n))&&r.unshift(qr(e,o,i)),null!=(o=Re(e,t))&&r.push(qr(e,o,i))),e=e.return}return r}function Kr(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function Yr(e,t,n,r,i){for(var o=t._reactName,a=[];null!==n&&n!==r;){var s=n,l=s.alternate,c=s.stateNode;if(null!==l&&l===r)break;5===s.tag&&null!==c&&(s=c,i?null!=(l=Re(n,o))&&a.unshift(qr(n,l,s)):i||null!=(l=Re(n,o))&&a.push(qr(n,l,s))),n=n.return}0!==a.length&&e.push({event:t,listeners:a})}var Gr=/\r\n?/g,Qr=/\u0000|\uFFFD/g;function Xr(e){return("string"===typeof e?e:""+e).replace(Gr,"\n").replace(Qr,"")}function Jr(e,t,n){if(t=Xr(t),Xr(e)!==t&&n)throw Error(o(425))}function Zr(){}var ei=null,ti=null;function ni(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var ri="function"===typeof setTimeout?setTimeout:void 0,ii="function"===typeof clearTimeout?clearTimeout:void 0,oi="function"===typeof Promise?Promise:void 0,ai="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof oi?function(e){return oi.resolve(null).then(e).catch(si)}:ri;function si(e){setTimeout((function(){throw e}))}function li(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&8===i.nodeType)if("/$"===(n=i.data)){if(0===r)return e.removeChild(i),void Bt(t);r--}else"$"!==n&&"$?"!==n&&"$!"!==n||r++;n=i}while(n);Bt(t)}function ci(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t)break;if("/$"===t)return null}}return e}function ui(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var di=Math.random().toString(36).slice(2),hi="__reactFiber$"+di,pi="__reactProps$"+di,fi="__reactContainer$"+di,gi="__reactEvents$"+di,mi="__reactListeners$"+di,bi="__reactHandles$"+di;function yi(e){var t=e[hi];if(t)return t;for(var n=e.parentNode;n;){if(t=n[fi]||n[hi]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=ui(e);null!==e;){if(n=e[hi])return n;e=ui(e)}return t}n=(e=n).parentNode}return null}function vi(e){return!(e=e[hi]||e[fi])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function xi(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(o(33))}function wi(e){return e[pi]||null}var _i=[],ki=-1;function Ci(e){return{current:e}}function Si(e){0>ki||(e.current=_i[ki],_i[ki]=null,ki--)}function Ei(e,t){ki++,_i[ki]=e.current,e.current=t}var Ti={},Ii=Ci(Ti),Ni=Ci(!1),ji=Ti;function Pi(e,t){var n=e.type.contextTypes;if(!n)return Ti;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i,o={};for(i in n)o[i]=t[i];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Ri(e){return null!==(e=e.childContextTypes)&&void 0!==e}function Di(){Si(Ni),Si(Ii)}function Fi(e,t,n){if(Ii.current!==Ti)throw Error(o(168));Ei(Ii,t),Ei(Ni,n)}function Oi(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,"function"!==typeof r.getChildContext)return n;for(var i in r=r.getChildContext())if(!(i in t))throw Error(o(108,W(e)||"Unknown",i));return A({},n,r)}function Li(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ti,ji=Ii.current,Ei(Ii,e),Ei(Ni,Ni.current),!0}function Ai(e,t,n){var r=e.stateNode;if(!r)throw Error(o(169));n?(e=Oi(e,t,ji),r.__reactInternalMemoizedMergedChildContext=e,Si(Ni),Si(Ii),Ei(Ii,e)):Si(Ni),Ei(Ni,n)}var Mi=null,zi=!1,$i=!1;function Ui(e){null===Mi?Mi=[e]:Mi.push(e)}function Bi(){if(!$i&&null!==Mi){$i=!0;var e=0,t=vt;try{var n=Mi;for(vt=1;e<n.length;e++){var r=n[e];do{r=r(!0)}while(null!==r)}Mi=null,zi=!1}catch(i){throw null!==Mi&&(Mi=Mi.slice(e+1)),Ke(Ze,Bi),i}finally{vt=t,$i=!1}}return null}var Wi=[],Hi=0,qi=null,Vi=0,Ki=[],Yi=0,Gi=null,Qi=1,Xi="";function Ji(e,t){Wi[Hi++]=Vi,Wi[Hi++]=qi,qi=e,Vi=t}function Zi(e,t,n){Ki[Yi++]=Qi,Ki[Yi++]=Xi,Ki[Yi++]=Gi,Gi=e;var r=Qi;e=Xi;var i=32-at(r)-1;r&=~(1<<i),n+=1;var o=32-at(t)+i;if(30<o){var a=i-i%5;o=(r&(1<<a)-1).toString(32),r>>=a,i-=a,Qi=1<<32-at(t)+i|n<<i|r,Xi=o+e}else Qi=1<<o|n<<i|r,Xi=e}function eo(e){null!==e.return&&(Ji(e,1),Zi(e,1,0))}function to(e){for(;e===qi;)qi=Wi[--Hi],Wi[Hi]=null,Vi=Wi[--Hi],Wi[Hi]=null;for(;e===Gi;)Gi=Ki[--Yi],Ki[Yi]=null,Xi=Ki[--Yi],Ki[Yi]=null,Qi=Ki[--Yi],Ki[Yi]=null}var no=null,ro=null,io=!1,oo=null;function ao(e,t){var n=Pc(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,null===(t=e.deletions)?(e.deletions=[n],e.flags|=16):t.push(n)}function so(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,no=e,ro=ci(t.firstChild),!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,no=e,ro=null,!0);case 13:return null!==(t=8!==t.nodeType?null:t)&&(n=null!==Gi?{id:Qi,overflow:Xi}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},(n=Pc(18,null,null,0)).stateNode=t,n.return=e,e.child=n,no=e,ro=null,!0);default:return!1}}function lo(e){return 0!==(1&e.mode)&&0===(128&e.flags)}function co(e){if(io){var t=ro;if(t){var n=t;if(!so(e,t)){if(lo(e))throw Error(o(418));t=ci(n.nextSibling);var r=no;t&&so(e,t)?ao(r,n):(e.flags=-4097&e.flags|2,io=!1,no=e)}}else{if(lo(e))throw Error(o(418));e.flags=-4097&e.flags|2,io=!1,no=e}}}function uo(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;no=e}function ho(e){if(e!==no)return!1;if(!io)return uo(e),io=!0,!1;var t;if((t=3!==e.tag)&&!(t=5!==e.tag)&&(t="head"!==(t=e.type)&&"body"!==t&&!ni(e.type,e.memoizedProps)),t&&(t=ro)){if(lo(e))throw po(),Error(o(418));for(;t;)ao(e,t),t=ci(t.nextSibling)}if(uo(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){ro=ci(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}ro=null}}else ro=no?ci(e.stateNode.nextSibling):null;return!0}function po(){for(var e=ro;e;)e=ci(e.nextSibling)}function fo(){ro=no=null,io=!1}function go(e){null===oo?oo=[e]:oo.push(e)}var mo=x.ReactCurrentBatchConfig;function bo(e,t,n){if(null!==(e=n.ref)&&"function"!==typeof e&&"object"!==typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(o(309));var r=n.stateNode}if(!r)throw Error(o(147,e));var i=r,a=""+e;return null!==t&&null!==t.ref&&"function"===typeof t.ref&&t.ref._stringRef===a?t.ref:(t=function(e){var t=i.refs;null===e?delete t[a]:t[a]=e},t._stringRef=a,t)}if("string"!==typeof e)throw Error(o(284));if(!n._owner)throw Error(o(290,e))}return e}function yo(e,t){throw e=Object.prototype.toString.call(t),Error(o(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function vo(e){return(0,e._init)(e._payload)}function xo(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function i(e,t){return(e=Dc(e,t)).index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=2,n):r:(t.flags|=2,n):(t.flags|=1048576,n)}function s(t){return e&&null===t.alternate&&(t.flags|=2),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=Ac(n,e.mode,r)).return=e,t):((t=i(t,n)).return=e,t)}function c(e,t,n,r){var o=n.type;return o===k?d(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===o||"object"===typeof o&&null!==o&&o.$$typeof===R&&vo(o)===t.type)?((r=i(t,n.props)).ref=bo(e,t,n),r.return=e,r):((r=Fc(n.type,n.key,n.props,null,e.mode,r)).ref=bo(e,t,n),r.return=e,r)}function u(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Mc(n,e.mode,r)).return=e,t):((t=i(t,n.children||[])).return=e,t)}function d(e,t,n,r,o){return null===t||7!==t.tag?((t=Oc(n,e.mode,r,o)).return=e,t):((t=i(t,n)).return=e,t)}function h(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t)return(t=Ac(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case w:return(n=Fc(t.type,t.key,t.props,null,e.mode,n)).ref=bo(e,null,t),n.return=e,n;case _:return(t=Mc(t,e.mode,n)).return=e,t;case R:return h(e,(0,t._init)(t._payload),n)}if(te(t)||O(t))return(t=Oc(t,e.mode,n,null)).return=e,t;yo(e,t)}return null}function p(e,t,n,r){var i=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n)return null!==i?null:l(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case w:return n.key===i?c(e,t,n,r):null;case _:return n.key===i?u(e,t,n,r):null;case R:return p(e,t,(i=n._init)(n._payload),r)}if(te(n)||O(n))return null!==i?null:d(e,t,n,r,null);yo(e,n)}return null}function f(e,t,n,r,i){if("string"===typeof r&&""!==r||"number"===typeof r)return l(t,e=e.get(n)||null,""+r,i);if("object"===typeof r&&null!==r){switch(r.$$typeof){case w:return c(t,e=e.get(null===r.key?n:r.key)||null,r,i);case _:return u(t,e=e.get(null===r.key?n:r.key)||null,r,i);case R:return f(e,t,n,(0,r._init)(r._payload),i)}if(te(r)||O(r))return d(t,e=e.get(n)||null,r,i,null);yo(t,r)}return null}function g(i,o,s,l){for(var c=null,u=null,d=o,g=o=0,m=null;null!==d&&g<s.length;g++){d.index>g?(m=d,d=null):m=d.sibling;var b=p(i,d,s[g],l);if(null===b){null===d&&(d=m);break}e&&d&&null===b.alternate&&t(i,d),o=a(b,o,g),null===u?c=b:u.sibling=b,u=b,d=m}if(g===s.length)return n(i,d),io&&Ji(i,g),c;if(null===d){for(;g<s.length;g++)null!==(d=h(i,s[g],l))&&(o=a(d,o,g),null===u?c=d:u.sibling=d,u=d);return io&&Ji(i,g),c}for(d=r(i,d);g<s.length;g++)null!==(m=f(d,i,g,s[g],l))&&(e&&null!==m.alternate&&d.delete(null===m.key?g:m.key),o=a(m,o,g),null===u?c=m:u.sibling=m,u=m);return e&&d.forEach((function(e){return t(i,e)})),io&&Ji(i,g),c}function m(i,s,l,c){var u=O(l);if("function"!==typeof u)throw Error(o(150));if(null==(l=u.call(l)))throw Error(o(151));for(var d=u=null,g=s,m=s=0,b=null,y=l.next();null!==g&&!y.done;m++,y=l.next()){g.index>m?(b=g,g=null):b=g.sibling;var v=p(i,g,y.value,c);if(null===v){null===g&&(g=b);break}e&&g&&null===v.alternate&&t(i,g),s=a(v,s,m),null===d?u=v:d.sibling=v,d=v,g=b}if(y.done)return n(i,g),io&&Ji(i,m),u;if(null===g){for(;!y.done;m++,y=l.next())null!==(y=h(i,y.value,c))&&(s=a(y,s,m),null===d?u=y:d.sibling=y,d=y);return io&&Ji(i,m),u}for(g=r(i,g);!y.done;m++,y=l.next())null!==(y=f(g,i,m,y.value,c))&&(e&&null!==y.alternate&&g.delete(null===y.key?m:y.key),s=a(y,s,m),null===d?u=y:d.sibling=y,d=y);return e&&g.forEach((function(e){return t(i,e)})),io&&Ji(i,m),u}return function e(r,o,a,l){if("object"===typeof a&&null!==a&&a.type===k&&null===a.key&&(a=a.props.children),"object"===typeof a&&null!==a){switch(a.$$typeof){case w:e:{for(var c=a.key,u=o;null!==u;){if(u.key===c){if((c=a.type)===k){if(7===u.tag){n(r,u.sibling),(o=i(u,a.props.children)).return=r,r=o;break e}}else if(u.elementType===c||"object"===typeof c&&null!==c&&c.$$typeof===R&&vo(c)===u.type){n(r,u.sibling),(o=i(u,a.props)).ref=bo(r,u,a),o.return=r,r=o;break e}n(r,u);break}t(r,u),u=u.sibling}a.type===k?((o=Oc(a.props.children,r.mode,l,a.key)).return=r,r=o):((l=Fc(a.type,a.key,a.props,null,r.mode,l)).ref=bo(r,o,a),l.return=r,r=l)}return s(r);case _:e:{for(u=a.key;null!==o;){if(o.key===u){if(4===o.tag&&o.stateNode.containerInfo===a.containerInfo&&o.stateNode.implementation===a.implementation){n(r,o.sibling),(o=i(o,a.children||[])).return=r,r=o;break e}n(r,o);break}t(r,o),o=o.sibling}(o=Mc(a,r.mode,l)).return=r,r=o}return s(r);case R:return e(r,o,(u=a._init)(a._payload),l)}if(te(a))return g(r,o,a,l);if(O(a))return m(r,o,a,l);yo(r,a)}return"string"===typeof a&&""!==a||"number"===typeof a?(a=""+a,null!==o&&6===o.tag?(n(r,o.sibling),(o=i(o,a)).return=r,r=o):(n(r,o),(o=Ac(a,r.mode,l)).return=r,r=o),s(r)):n(r,o)}}var wo=xo(!0),_o=xo(!1),ko=Ci(null),Co=null,So=null,Eo=null;function To(){Eo=So=Co=null}function Io(e){var t=ko.current;Si(ko),e._currentValue=t}function No(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function jo(e,t){Co=e,Eo=So=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&t)&&(vs=!0),e.firstContext=null)}function Po(e){var t=e._currentValue;if(Eo!==e)if(e={context:e,memoizedValue:t,next:null},null===So){if(null===Co)throw Error(o(308));So=e,Co.dependencies={lanes:0,firstContext:e}}else So=So.next=e;return t}var Ro=null;function Do(e){null===Ro?Ro=[e]:Ro.push(e)}function Fo(e,t,n,r){var i=t.interleaved;return null===i?(n.next=n,Do(t)):(n.next=i.next,i.next=n),t.interleaved=n,Oo(e,r)}function Oo(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}var Lo=!1;function Ao(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Mo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function zo(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function $o(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&Il)){var i=r.pending;return null===i?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Oo(e,n)}return null===(i=r.interleaved)?(t.next=t,Do(r)):(t.next=i.next,i.next=t),r.interleaved=t,Oo(e,n)}function Uo(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194240&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,yt(e,n)}}function Bo(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var i=null,o=null;if(null!==(n=n.firstBaseUpdate)){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===o?i=o=a:o=o.next=a,n=n.next}while(null!==n);null===o?i=o=t:o=o.next=t}else i=o=t;return n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Wo(e,t,n,r){var i=e.updateQueue;Lo=!1;var o=i.firstBaseUpdate,a=i.lastBaseUpdate,s=i.shared.pending;if(null!==s){i.shared.pending=null;var l=s,c=l.next;l.next=null,null===a?o=c:a.next=c,a=l;var u=e.alternate;null!==u&&((s=(u=u.updateQueue).lastBaseUpdate)!==a&&(null===s?u.firstBaseUpdate=c:s.next=c,u.lastBaseUpdate=l))}if(null!==o){var d=i.baseState;for(a=0,u=c=l=null,s=o;;){var h=s.lane,p=s.eventTime;if((r&h)===h){null!==u&&(u=u.next={eventTime:p,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var f=e,g=s;switch(h=t,p=n,g.tag){case 1:if("function"===typeof(f=g.payload)){d=f.call(p,d,h);break e}d=f;break e;case 3:f.flags=-65537&f.flags|128;case 0:if(null===(h="function"===typeof(f=g.payload)?f.call(p,d,h):f)||void 0===h)break e;d=A({},d,h);break e;case 2:Lo=!0}}null!==s.callback&&0!==s.lane&&(e.flags|=64,null===(h=i.effects)?i.effects=[s]:h.push(s))}else p={eventTime:p,lane:h,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===u?(c=u=p,l=d):u=u.next=p,a|=h;if(null===(s=s.next)){if(null===(s=i.shared.pending))break;s=(h=s).next,h.next=null,i.lastBaseUpdate=h,i.shared.pending=null}}if(null===u&&(l=d),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=u,null!==(t=i.shared.interleaved)){i=t;do{a|=i.lane,i=i.next}while(i!==t)}else null===o&&(i.shared.lanes=0);Ll|=a,e.lanes=a,e.memoizedState=d}}function Ho(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(null!==i){if(r.callback=null,r=n,"function"!==typeof i)throw Error(o(191,i));i.call(r)}}}var qo={},Vo=Ci(qo),Ko=Ci(qo),Yo=Ci(qo);function Go(e){if(e===qo)throw Error(o(174));return e}function Qo(e,t){switch(Ei(Yo,t),Ei(Ko,e),Ei(Vo,qo),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:le(null,"");break;default:t=le(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}Si(Vo),Ei(Vo,t)}function Xo(){Si(Vo),Si(Ko),Si(Yo)}function Jo(e){Go(Yo.current);var t=Go(Vo.current),n=le(t,e.type);t!==n&&(Ei(Ko,e),Ei(Vo,n))}function Zo(e){Ko.current===e&&(Si(Vo),Si(Ko))}var ea=Ci(0);function ta(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!==(128&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var na=[];function ra(){for(var e=0;e<na.length;e++)na[e]._workInProgressVersionPrimary=null;na.length=0}var ia=x.ReactCurrentDispatcher,oa=x.ReactCurrentBatchConfig,aa=0,sa=null,la=null,ca=null,ua=!1,da=!1,ha=0,pa=0;function fa(){throw Error(o(321))}function ga(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!sr(e[n],t[n]))return!1;return!0}function ma(e,t,n,r,i,a){if(aa=a,sa=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ia.current=null===e||null===e.memoizedState?Za:es,e=n(r,i),da){a=0;do{if(da=!1,ha=0,25<=a)throw Error(o(301));a+=1,ca=la=null,t.updateQueue=null,ia.current=ts,e=n(r,i)}while(da)}if(ia.current=Ja,t=null!==la&&null!==la.next,aa=0,ca=la=sa=null,ua=!1,t)throw Error(o(300));return e}function ba(){var e=0!==ha;return ha=0,e}function ya(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===ca?sa.memoizedState=ca=e:ca=ca.next=e,ca}function va(){if(null===la){var e=sa.alternate;e=null!==e?e.memoizedState:null}else e=la.next;var t=null===ca?sa.memoizedState:ca.next;if(null!==t)ca=t,la=e;else{if(null===e)throw Error(o(310));e={memoizedState:(la=e).memoizedState,baseState:la.baseState,baseQueue:la.baseQueue,queue:la.queue,next:null},null===ca?sa.memoizedState=ca=e:ca=ca.next=e}return ca}function xa(e,t){return"function"===typeof t?t(e):t}function wa(e){var t=va(),n=t.queue;if(null===n)throw Error(o(311));n.lastRenderedReducer=e;var r=la,i=r.baseQueue,a=n.pending;if(null!==a){if(null!==i){var s=i.next;i.next=a.next,a.next=s}r.baseQueue=i=a,n.pending=null}if(null!==i){a=i.next,r=r.baseState;var l=s=null,c=null,u=a;do{var d=u.lane;if((aa&d)===d)null!==c&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};null===c?(l=c=h,s=r):c=c.next=h,sa.lanes|=d,Ll|=d}u=u.next}while(null!==u&&u!==a);null===c?s=r:c.next=l,sr(r,t.memoizedState)||(vs=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=c,n.lastRenderedState=r}if(null!==(e=n.interleaved)){i=e;do{a=i.lane,sa.lanes|=a,Ll|=a,i=i.next}while(i!==e)}else null===i&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function _a(e){var t=va(),n=t.queue;if(null===n)throw Error(o(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(null!==i){n.pending=null;var s=i=i.next;do{a=e(a,s.action),s=s.next}while(s!==i);sr(a,t.memoizedState)||(vs=!0),t.memoizedState=a,null===t.baseQueue&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function ka(){}function Ca(e,t){var n=sa,r=va(),i=t(),a=!sr(r.memoizedState,i);if(a&&(r.memoizedState=i,vs=!0),r=r.queue,La(Ta.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||null!==ca&&1&ca.memoizedState.tag){if(n.flags|=2048,Pa(9,Ea.bind(null,n,r,i,t),void 0,null),null===Nl)throw Error(o(349));0!==(30&aa)||Sa(n,t,i)}return i}function Sa(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=sa.updateQueue)?(t={lastEffect:null,stores:null},sa.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function Ea(e,t,n,r){t.value=n,t.getSnapshot=r,Ia(t)&&Na(e)}function Ta(e,t,n){return n((function(){Ia(t)&&Na(e)}))}function Ia(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!sr(e,n)}catch(r){return!0}}function Na(e){var t=Oo(e,1);null!==t&&nc(t,e,1,-1)}function ja(e){var t=ya();return"function"===typeof e&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xa,lastRenderedState:e},t.queue=e,e=e.dispatch=Ya.bind(null,sa,e),[t.memoizedState,e]}function Pa(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=sa.updateQueue)?(t={lastEffect:null,stores:null},sa.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ra(){return va().memoizedState}function Da(e,t,n,r){var i=ya();sa.flags|=e,i.memoizedState=Pa(1|t,n,void 0,void 0===r?null:r)}function Fa(e,t,n,r){var i=va();r=void 0===r?null:r;var o=void 0;if(null!==la){var a=la.memoizedState;if(o=a.destroy,null!==r&&ga(r,a.deps))return void(i.memoizedState=Pa(t,n,o,r))}sa.flags|=e,i.memoizedState=Pa(1|t,n,o,r)}function Oa(e,t){return Da(8390656,8,e,t)}function La(e,t){return Fa(2048,8,e,t)}function Aa(e,t){return Fa(4,2,e,t)}function Ma(e,t){return Fa(4,4,e,t)}function za(e,t){return"function"===typeof t?(e=e(),t(e),function(){t(null)}):null!==t&&void 0!==t?(e=e(),t.current=e,function(){t.current=null}):void 0}function $a(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,Fa(4,4,za.bind(null,t,e),n)}function Ua(){}function Ba(e,t){var n=va();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&ga(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Wa(e,t){var n=va();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&ga(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ha(e,t,n){return 0===(21&aa)?(e.baseState&&(e.baseState=!1,vs=!0),e.memoizedState=n):(sr(n,t)||(n=gt(),sa.lanes|=n,Ll|=n,e.baseState=!0),t)}function qa(e,t){var n=vt;vt=0!==n&&4>n?n:4,e(!0);var r=oa.transition;oa.transition={};try{e(!1),t()}finally{vt=n,oa.transition=r}}function Va(){return va().memoizedState}function Ka(e,t,n){var r=tc(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Ga(e))Qa(t,n);else if(null!==(n=Fo(e,t,n,r))){nc(n,e,r,ec()),Xa(n,t,r)}}function Ya(e,t,n){var r=tc(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ga(e))Qa(t,i);else{var o=e.alternate;if(0===e.lanes&&(null===o||0===o.lanes)&&null!==(o=t.lastRenderedReducer))try{var a=t.lastRenderedState,s=o(a,n);if(i.hasEagerState=!0,i.eagerState=s,sr(s,a)){var l=t.interleaved;return null===l?(i.next=i,Do(t)):(i.next=l.next,l.next=i),void(t.interleaved=i)}}catch(c){}null!==(n=Fo(e,t,i,r))&&(nc(n,e,r,i=ec()),Xa(n,t,r))}}function Ga(e){var t=e.alternate;return e===sa||null!==t&&t===sa}function Qa(e,t){da=ua=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Xa(e,t,n){if(0!==(4194240&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,yt(e,n)}}var Ja={readContext:Po,useCallback:fa,useContext:fa,useEffect:fa,useImperativeHandle:fa,useInsertionEffect:fa,useLayoutEffect:fa,useMemo:fa,useReducer:fa,useRef:fa,useState:fa,useDebugValue:fa,useDeferredValue:fa,useTransition:fa,useMutableSource:fa,useSyncExternalStore:fa,useId:fa,unstable_isNewReconciler:!1},Za={readContext:Po,useCallback:function(e,t){return ya().memoizedState=[e,void 0===t?null:t],e},useContext:Po,useEffect:Oa,useImperativeHandle:function(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,Da(4194308,4,za.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Da(4194308,4,e,t)},useInsertionEffect:function(e,t){return Da(4,2,e,t)},useMemo:function(e,t){var n=ya();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ya();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ka.bind(null,sa,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},ya().memoizedState=e},useState:ja,useDebugValue:Ua,useDeferredValue:function(e){return ya().memoizedState=e},useTransition:function(){var e=ja(!1),t=e[0];return e=qa.bind(null,e[1]),ya().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=sa,i=ya();if(io){if(void 0===n)throw Error(o(407));n=n()}else{if(n=t(),null===Nl)throw Error(o(349));0!==(30&aa)||Sa(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,Oa(Ta.bind(null,r,a,e),[e]),r.flags|=2048,Pa(9,Ea.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=ya(),t=Nl.identifierPrefix;if(io){var n=Xi;t=":"+t+"R"+(n=(Qi&~(1<<32-at(Qi)-1)).toString(32)+n),0<(n=ha++)&&(t+="H"+n.toString(32)),t+=":"}else t=":"+t+"r"+(n=pa++).toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},es={readContext:Po,useCallback:Ba,useContext:Po,useEffect:La,useImperativeHandle:$a,useInsertionEffect:Aa,useLayoutEffect:Ma,useMemo:Wa,useReducer:wa,useRef:Ra,useState:function(){return wa(xa)},useDebugValue:Ua,useDeferredValue:function(e){return Ha(va(),la.memoizedState,e)},useTransition:function(){return[wa(xa)[0],va().memoizedState]},useMutableSource:ka,useSyncExternalStore:Ca,useId:Va,unstable_isNewReconciler:!1},ts={readContext:Po,useCallback:Ba,useContext:Po,useEffect:La,useImperativeHandle:$a,useInsertionEffect:Aa,useLayoutEffect:Ma,useMemo:Wa,useReducer:_a,useRef:Ra,useState:function(){return _a(xa)},useDebugValue:Ua,useDeferredValue:function(e){var t=va();return null===la?t.memoizedState=e:Ha(t,la.memoizedState,e)},useTransition:function(){return[_a(xa)[0],va().memoizedState]},useMutableSource:ka,useSyncExternalStore:Ca,useId:Va,unstable_isNewReconciler:!1};function ns(e,t){if(e&&e.defaultProps){for(var n in t=A({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}function rs(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:A({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var is={isMounted:function(e){return!!(e=e._reactInternals)&&Be(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ec(),i=tc(e),o=zo(r,i);o.payload=t,void 0!==n&&null!==n&&(o.callback=n),null!==(t=$o(e,o,i))&&(nc(t,e,i,r),Uo(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ec(),i=tc(e),o=zo(r,i);o.tag=1,o.payload=t,void 0!==n&&null!==n&&(o.callback=n),null!==(t=$o(e,o,i))&&(nc(t,e,i,r),Uo(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ec(),r=tc(e),i=zo(n,r);i.tag=2,void 0!==t&&null!==t&&(i.callback=t),null!==(t=$o(e,i,r))&&(nc(t,e,r,n),Uo(t,e,r))}};function os(e,t,n,r,i,o,a){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,a):!t.prototype||!t.prototype.isPureReactComponent||(!lr(n,r)||!lr(i,o))}function as(e,t,n){var r=!1,i=Ti,o=t.contextType;return"object"===typeof o&&null!==o?o=Po(o):(i=Ri(t)?ji:Ii.current,o=(r=null!==(r=t.contextTypes)&&void 0!==r)?Pi(e,i):Ti),t=new t(n,o),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=is,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function ss(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&is.enqueueReplaceState(t,t.state,null)}function ls(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Ao(e);var o=t.contextType;"object"===typeof o&&null!==o?i.context=Po(o):(o=Ri(t)?ji:Ii.current,i.context=Pi(e,o)),i.state=e.memoizedState,"function"===typeof(o=t.getDerivedStateFromProps)&&(rs(e,t,o,n),i.state=e.memoizedState),"function"===typeof t.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(t=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),t!==i.state&&is.enqueueReplaceState(i,i.state,null),Wo(e,n,i,r),i.state=e.memoizedState),"function"===typeof i.componentDidMount&&(e.flags|=4194308)}function cs(e,t){try{var n="",r=t;do{n+=U(r),r=r.return}while(r);var i=n}catch(o){i="\nError generating stack: "+o.message+"\n"+o.stack}return{value:e,source:t,stack:i,digest:null}}function us(e,t,n){return{value:e,source:null,stack:null!=n?n:null,digest:null!=t?t:null}}function ds(e,t){try{console.error(t.value)}catch(n){setTimeout((function(){throw n}))}}var hs="function"===typeof WeakMap?WeakMap:Map;function ps(e,t,n){(n=zo(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Hl||(Hl=!0,ql=r),ds(0,t)},n}function fs(e,t,n){(n=zo(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"===typeof r){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){ds(0,t)}}var o=e.stateNode;return null!==o&&"function"===typeof o.componentDidCatch&&(n.callback=function(){ds(0,t),"function"!==typeof r&&(null===Vl?Vl=new Set([this]):Vl.add(this));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}function gs(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new hs;var i=new Set;r.set(t,i)}else void 0===(i=r.get(t))&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=Sc.bind(null,e,t,n),t.then(e,e))}function ms(e){do{var t;if((t=13===e.tag)&&(t=null===(t=e.memoizedState)||null!==t.dehydrated),t)return e;e=e.return}while(null!==e);return null}function bs(e,t,n,r,i){return 0===(1&e.mode)?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,1===n.tag&&(null===n.alternate?n.tag=17:((t=zo(-1,1)).tag=2,$o(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=i,e)}var ys=x.ReactCurrentOwner,vs=!1;function xs(e,t,n,r){t.child=null===e?_o(t,null,n,r):wo(t,e.child,n,r)}function ws(e,t,n,r,i){n=n.render;var o=t.ref;return jo(t,i),r=ma(e,t,n,r,o,i),n=ba(),null===e||vs?(io&&n&&eo(t),t.flags|=1,xs(e,t,r,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Hs(e,t,i))}function _s(e,t,n,r,i){if(null===e){var o=n.type;return"function"!==typeof o||Rc(o)||void 0!==o.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Fc(n.type,null,r,t,t.mode,i)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=o,ks(e,t,o,r,i))}if(o=e.child,0===(e.lanes&i)){var a=o.memoizedProps;if((n=null!==(n=n.compare)?n:lr)(a,r)&&e.ref===t.ref)return Hs(e,t,i)}return t.flags|=1,(e=Dc(o,r)).ref=t.ref,e.return=t,t.child=e}function ks(e,t,n,r,i){if(null!==e){var o=e.memoizedProps;if(lr(o,r)&&e.ref===t.ref){if(vs=!1,t.pendingProps=r=o,0===(e.lanes&i))return t.lanes=e.lanes,Hs(e,t,i);0!==(131072&e.flags)&&(vs=!0)}}return Es(e,t,n,r,i)}function Cs(e,t,n){var r=t.pendingProps,i=r.children,o=null!==e?e.memoizedState:null;if("hidden"===r.mode)if(0===(1&t.mode))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ei(Dl,Rl),Rl|=n;else{if(0===(1073741824&n))return e=null!==o?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ei(Dl,Rl),Rl|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=null!==o?o.baseLanes:n,Ei(Dl,Rl),Rl|=r}else null!==o?(r=o.baseLanes|n,t.memoizedState=null):r=n,Ei(Dl,Rl),Rl|=r;return xs(e,t,i,n),t.child}function Ss(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Es(e,t,n,r,i){var o=Ri(n)?ji:Ii.current;return o=Pi(t,o),jo(t,i),n=ma(e,t,n,r,o,i),r=ba(),null===e||vs?(io&&r&&eo(t),t.flags|=1,xs(e,t,n,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Hs(e,t,i))}function Ts(e,t,n,r,i){if(Ri(n)){var o=!0;Li(t)}else o=!1;if(jo(t,i),null===t.stateNode)Ws(e,t),as(t,n,r),ls(t,n,r,i),r=!0;else if(null===e){var a=t.stateNode,s=t.memoizedProps;a.props=s;var l=a.context,c=n.contextType;"object"===typeof c&&null!==c?c=Po(c):c=Pi(t,c=Ri(n)?ji:Ii.current);var u=n.getDerivedStateFromProps,d="function"===typeof u||"function"===typeof a.getSnapshotBeforeUpdate;d||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(s!==r||l!==c)&&ss(t,a,r,c),Lo=!1;var h=t.memoizedState;a.state=h,Wo(t,r,a,i),l=t.memoizedState,s!==r||h!==l||Ni.current||Lo?("function"===typeof u&&(rs(t,n,u,r),l=t.memoizedState),(s=Lo||os(t,n,s,r,h,l,c))?(d||"function"!==typeof a.UNSAFE_componentWillMount&&"function"!==typeof a.componentWillMount||("function"===typeof a.componentWillMount&&a.componentWillMount(),"function"===typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount()),"function"===typeof a.componentDidMount&&(t.flags|=4194308)):("function"===typeof a.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=c,r=s):("function"===typeof a.componentDidMount&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Mo(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:ns(t.type,s),a.props=c,d=t.pendingProps,h=a.context,"object"===typeof(l=n.contextType)&&null!==l?l=Po(l):l=Pi(t,l=Ri(n)?ji:Ii.current);var p=n.getDerivedStateFromProps;(u="function"===typeof p||"function"===typeof a.getSnapshotBeforeUpdate)||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(s!==d||h!==l)&&ss(t,a,r,l),Lo=!1,h=t.memoizedState,a.state=h,Wo(t,r,a,i);var f=t.memoizedState;s!==d||h!==f||Ni.current||Lo?("function"===typeof p&&(rs(t,n,p,r),f=t.memoizedState),(c=Lo||os(t,n,c,r,h,f,l)||!1)?(u||"function"!==typeof a.UNSAFE_componentWillUpdate&&"function"!==typeof a.componentWillUpdate||("function"===typeof a.componentWillUpdate&&a.componentWillUpdate(r,f,l),"function"===typeof a.UNSAFE_componentWillUpdate&&a.UNSAFE_componentWillUpdate(r,f,l)),"function"===typeof a.componentDidUpdate&&(t.flags|=4),"function"===typeof a.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof a.componentDidUpdate||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=f),a.props=r,a.state=f,a.context=l,r=c):("function"!==typeof a.componentDidUpdate||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return Is(e,t,n,r,o,i)}function Is(e,t,n,r,i,o){Ss(e,t);var a=0!==(128&t.flags);if(!r&&!a)return i&&Ai(t,n,!1),Hs(e,t,o);r=t.stateNode,ys.current=t;var s=a&&"function"!==typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&a?(t.child=wo(t,e.child,null,o),t.child=wo(t,null,s,o)):xs(e,t,s,o),t.memoizedState=r.state,i&&Ai(t,n,!0),t.child}function Ns(e){var t=e.stateNode;t.pendingContext?Fi(0,t.pendingContext,t.pendingContext!==t.context):t.context&&Fi(0,t.context,!1),Qo(e,t.containerInfo)}function js(e,t,n,r,i){return fo(),go(i),t.flags|=256,xs(e,t,n,r),t.child}var Ps,Rs,Ds,Fs,Os={dehydrated:null,treeContext:null,retryLane:0};function Ls(e){return{baseLanes:e,cachePool:null,transitions:null}}function As(e,t,n){var r,i=t.pendingProps,a=ea.current,s=!1,l=0!==(128&t.flags);if((r=l)||(r=(null===e||null!==e.memoizedState)&&0!==(2&a)),r?(s=!0,t.flags&=-129):null!==e&&null===e.memoizedState||(a|=1),Ei(ea,1&a),null===e)return co(t),null!==(e=t.memoizedState)&&null!==(e=e.dehydrated)?(0===(1&t.mode)?t.lanes=1:"$!"===e.data?t.lanes=8:t.lanes=1073741824,null):(l=i.children,e=i.fallback,s?(i=t.mode,s=t.child,l={mode:"hidden",children:l},0===(1&i)&&null!==s?(s.childLanes=0,s.pendingProps=l):s=Lc(l,i,0,null),e=Oc(e,i,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Ls(n),t.memoizedState=Os,e):Ms(t,l));if(null!==(a=e.memoizedState)&&null!==(r=a.dehydrated))return function(e,t,n,r,i,a,s){if(n)return 256&t.flags?(t.flags&=-257,zs(e,t,s,r=us(Error(o(422))))):null!==t.memoizedState?(t.child=e.child,t.flags|=128,null):(a=r.fallback,i=t.mode,r=Lc({mode:"visible",children:r.children},i,0,null),(a=Oc(a,i,s,null)).flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,0!==(1&t.mode)&&wo(t,e.child,null,s),t.child.memoizedState=Ls(s),t.memoizedState=Os,a);if(0===(1&t.mode))return zs(e,t,s,null);if("$!"===i.data){if(r=i.nextSibling&&i.nextSibling.dataset)var l=r.dgst;return r=l,zs(e,t,s,r=us(a=Error(o(419)),r,void 0))}if(l=0!==(s&e.childLanes),vs||l){if(null!==(r=Nl)){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}0!==(i=0!==(i&(r.suspendedLanes|s))?0:i)&&i!==a.retryLane&&(a.retryLane=i,Oo(e,i),nc(r,e,i,-1))}return gc(),zs(e,t,s,r=us(Error(o(421))))}return"$?"===i.data?(t.flags|=128,t.child=e.child,t=Tc.bind(null,e),i._reactRetry=t,null):(e=a.treeContext,ro=ci(i.nextSibling),no=t,io=!0,oo=null,null!==e&&(Ki[Yi++]=Qi,Ki[Yi++]=Xi,Ki[Yi++]=Gi,Qi=e.id,Xi=e.overflow,Gi=t),t=Ms(t,r.children),t.flags|=4096,t)}(e,t,l,i,r,a,n);if(s){s=i.fallback,l=t.mode,r=(a=e.child).sibling;var c={mode:"hidden",children:i.children};return 0===(1&l)&&t.child!==a?((i=t.child).childLanes=0,i.pendingProps=c,t.deletions=null):(i=Dc(a,c)).subtreeFlags=14680064&a.subtreeFlags,null!==r?s=Dc(r,s):(s=Oc(s,l,n,null)).flags|=2,s.return=t,i.return=t,i.sibling=s,t.child=i,i=s,s=t.child,l=null===(l=e.child.memoizedState)?Ls(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},s.memoizedState=l,s.childLanes=e.childLanes&~n,t.memoizedState=Os,i}return e=(s=e.child).sibling,i=Dc(s,{mode:"visible",children:i.children}),0===(1&t.mode)&&(i.lanes=n),i.return=t,i.sibling=null,null!==e&&(null===(n=t.deletions)?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=i,t.memoizedState=null,i}function Ms(e,t){return(t=Lc({mode:"visible",children:t},e.mode,0,null)).return=e,e.child=t}function zs(e,t,n,r){return null!==r&&go(r),wo(t,e.child,null,n),(e=Ms(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function $s(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),No(e.return,t,n)}function Us(e,t,n,r,i){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function Bs(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(xs(e,t,r.children,n),0!==(2&(r=ea.current)))r=1&r|2,t.flags|=128;else{if(null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&$s(e,n,t);else if(19===e.tag)$s(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ei(ea,r),0===(1&t.mode))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;null!==n;)null!==(e=n.alternate)&&null===ta(e)&&(i=n),n=n.sibling;null===(n=i)?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Us(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;null!==i;){if(null!==(e=i.alternate)&&null===ta(e)){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Us(t,!0,n,null,o);break;case"together":Us(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ws(e,t){0===(1&t.mode)&&null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Hs(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Ll|=t.lanes,0===(n&t.childLanes))return null;if(null!==e&&t.child!==e.child)throw Error(o(153));if(null!==t.child){for(n=Dc(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Dc(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function qs(e,t){if(!io)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Vs(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=14680064&i.subtreeFlags,r|=14680064&i.flags,i.return=e,i=i.sibling;else for(i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ks(e,t,n){var r=t.pendingProps;switch(to(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Vs(t),null;case 1:case 17:return Ri(t.type)&&Di(),Vs(t),null;case 3:return r=t.stateNode,Xo(),Si(Ni),Si(Ii),ra(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(ho(t)?t.flags|=4:null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,null!==oo&&(ac(oo),oo=null))),Rs(e,t),Vs(t),null;case 5:Zo(t);var i=Go(Yo.current);if(n=t.type,null!==e&&null!=t.stateNode)Ds(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(null===t.stateNode)throw Error(o(166));return Vs(t),null}if(e=Go(Vo.current),ho(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[hi]=t,r[pi]=a,e=0!==(1&t.mode),n){case"dialog":zr("cancel",r),zr("close",r);break;case"iframe":case"object":case"embed":zr("load",r);break;case"video":case"audio":for(i=0;i<Or.length;i++)zr(Or[i],r);break;case"source":zr("error",r);break;case"img":case"image":case"link":zr("error",r),zr("load",r);break;case"details":zr("toggle",r);break;case"input":Q(r,a),zr("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},zr("invalid",r);break;case"textarea":ie(r,a),zr("invalid",r)}for(var l in ye(n,a),i=null,a)if(a.hasOwnProperty(l)){var c=a[l];"children"===l?"string"===typeof c?r.textContent!==c&&(!0!==a.suppressHydrationWarning&&Jr(r.textContent,c,e),i=["children",c]):"number"===typeof c&&r.textContent!==""+c&&(!0!==a.suppressHydrationWarning&&Jr(r.textContent,c,e),i=["children",""+c]):s.hasOwnProperty(l)&&null!=c&&"onScroll"===l&&zr("scroll",r)}switch(n){case"input":V(r),Z(r,a,!0);break;case"textarea":V(r),ae(r);break;case"select":case"option":break;default:"function"===typeof a.onClick&&(r.onclick=Zr)}r=i,t.updateQueue=r,null!==r&&(t.flags|=4)}else{l=9===i.nodeType?i:i.ownerDocument,"http://www.w3.org/1999/xhtml"===e&&(e=se(n)),"http://www.w3.org/1999/xhtml"===e?"script"===n?((e=l.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"===typeof r.is?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),"select"===n&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[hi]=t,e[pi]=r,Ps(e,t,!1,!1),t.stateNode=e;e:{switch(l=ve(n,r),n){case"dialog":zr("cancel",e),zr("close",e),i=r;break;case"iframe":case"object":case"embed":zr("load",e),i=r;break;case"video":case"audio":for(i=0;i<Or.length;i++)zr(Or[i],e);i=r;break;case"source":zr("error",e),i=r;break;case"img":case"image":case"link":zr("error",e),zr("load",e),i=r;break;case"details":zr("toggle",e),i=r;break;case"input":Q(e,r),i=G(e,r),zr("invalid",e);break;case"option":default:i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=A({},r,{value:void 0}),zr("invalid",e);break;case"textarea":ie(e,r),i=re(e,r),zr("invalid",e)}for(a in ye(n,i),c=i)if(c.hasOwnProperty(a)){var u=c[a];"style"===a?me(e,u):"dangerouslySetInnerHTML"===a?null!=(u=u?u.__html:void 0)&&de(e,u):"children"===a?"string"===typeof u?("textarea"!==n||""!==u)&&he(e,u):"number"===typeof u&&he(e,""+u):"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&"autoFocus"!==a&&(s.hasOwnProperty(a)?null!=u&&"onScroll"===a&&zr("scroll",e):null!=u&&v(e,a,u,l))}switch(n){case"input":V(e),Z(e,r,!1);break;case"textarea":V(e),ae(e);break;case"option":null!=r.value&&e.setAttribute("value",""+H(r.value));break;case"select":e.multiple=!!r.multiple,null!=(a=r.value)?ne(e,!!r.multiple,a,!1):null!=r.defaultValue&&ne(e,!!r.multiple,r.defaultValue,!0);break;default:"function"===typeof i.onClick&&(e.onclick=Zr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}null!==t.ref&&(t.flags|=512,t.flags|=2097152)}return Vs(t),null;case 6:if(e&&null!=t.stateNode)Fs(e,t,e.memoizedProps,r);else{if("string"!==typeof r&&null===t.stateNode)throw Error(o(166));if(n=Go(Yo.current),Go(Vo.current),ho(t)){if(r=t.stateNode,n=t.memoizedProps,r[hi]=t,(a=r.nodeValue!==n)&&null!==(e=no))switch(e.tag){case 3:Jr(r.nodeValue,n,0!==(1&e.mode));break;case 5:!0!==e.memoizedProps.suppressHydrationWarning&&Jr(r.nodeValue,n,0!==(1&e.mode))}a&&(t.flags|=4)}else(r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[hi]=t,t.stateNode=r}return Vs(t),null;case 13:if(Si(ea),r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(io&&null!==ro&&0!==(1&t.mode)&&0===(128&t.flags))po(),fo(),t.flags|=98560,a=!1;else if(a=ho(t),null!==r&&null!==r.dehydrated){if(null===e){if(!a)throw Error(o(318));if(!(a=null!==(a=t.memoizedState)?a.dehydrated:null))throw Error(o(317));a[hi]=t}else fo(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;Vs(t),a=!1}else null!==oo&&(ac(oo),oo=null),a=!0;if(!a)return 65536&t.flags?t:null}return 0!==(128&t.flags)?(t.lanes=n,t):((r=null!==r)!==(null!==e&&null!==e.memoizedState)&&r&&(t.child.flags|=8192,0!==(1&t.mode)&&(null===e||0!==(1&ea.current)?0===Fl&&(Fl=3):gc())),null!==t.updateQueue&&(t.flags|=4),Vs(t),null);case 4:return Xo(),Rs(e,t),null===e&&Br(t.stateNode.containerInfo),Vs(t),null;case 10:return Io(t.type._context),Vs(t),null;case 19:if(Si(ea),null===(a=t.memoizedState))return Vs(t),null;if(r=0!==(128&t.flags),null===(l=a.rendering))if(r)qs(a,!1);else{if(0!==Fl||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(l=ta(e))){for(t.flags|=128,qs(a,!1),null!==(r=l.updateQueue)&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;null!==n;)e=r,(a=n).flags&=14680066,null===(l=a.alternate)?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,a.type=l.type,e=l.dependencies,a.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ei(ea,1&ea.current|2),t.child}e=e.sibling}null!==a.tail&&Xe()>Bl&&(t.flags|=128,r=!0,qs(a,!1),t.lanes=4194304)}else{if(!r)if(null!==(e=ta(l))){if(t.flags|=128,r=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),qs(a,!0),null===a.tail&&"hidden"===a.tailMode&&!l.alternate&&!io)return Vs(t),null}else 2*Xe()-a.renderingStartTime>Bl&&1073741824!==n&&(t.flags|=128,r=!0,qs(a,!1),t.lanes=4194304);a.isBackwards?(l.sibling=t.child,t.child=l):(null!==(n=a.last)?n.sibling=l:t.child=l,a.last=l)}return null!==a.tail?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Xe(),t.sibling=null,n=ea.current,Ei(ea,r?1&n|2:1&n),t):(Vs(t),null);case 22:case 23:return dc(),r=null!==t.memoizedState,null!==e&&null!==e.memoizedState!==r&&(t.flags|=8192),r&&0!==(1&t.mode)?0!==(1073741824&Rl)&&(Vs(t),6&t.subtreeFlags&&(t.flags|=8192)):Vs(t),null;case 24:case 25:return null}throw Error(o(156,t.tag))}function Ys(e,t){switch(to(t),t.tag){case 1:return Ri(t.type)&&Di(),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return Xo(),Si(Ni),Si(Ii),ra(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 5:return Zo(t),null;case 13:if(Si(ea),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(o(340));fo()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return Si(ea),null;case 4:return Xo(),null;case 10:return Io(t.type._context),null;case 22:case 23:return dc(),null;default:return null}}Ps=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Rs=function(){},Ds=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Go(Vo.current);var o,a=null;switch(n){case"input":i=G(e,i),r=G(e,r),a=[];break;case"select":i=A({},i,{value:void 0}),r=A({},r,{value:void 0}),a=[];break;case"textarea":i=re(e,i),r=re(e,r),a=[];break;default:"function"!==typeof i.onClick&&"function"===typeof r.onClick&&(e.onclick=Zr)}for(u in ye(n,r),n=null,i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&null!=i[u])if("style"===u){var l=i[u];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else"dangerouslySetInnerHTML"!==u&&"children"!==u&&"suppressContentEditableWarning"!==u&&"suppressHydrationWarning"!==u&&"autoFocus"!==u&&(s.hasOwnProperty(u)?a||(a=[]):(a=a||[]).push(u,null));for(u in r){var c=r[u];if(l=null!=i?i[u]:void 0,r.hasOwnProperty(u)&&c!==l&&(null!=c||null!=l))if("style"===u)if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(a||(a=[]),a.push(u,n)),n=c;else"dangerouslySetInnerHTML"===u?(c=c?c.__html:void 0,l=l?l.__html:void 0,null!=c&&l!==c&&(a=a||[]).push(u,c)):"children"===u?"string"!==typeof c&&"number"!==typeof c||(a=a||[]).push(u,""+c):"suppressContentEditableWarning"!==u&&"suppressHydrationWarning"!==u&&(s.hasOwnProperty(u)?(null!=c&&"onScroll"===u&&zr("scroll",e),a||l===c||(a=[])):(a=a||[]).push(u,c))}n&&(a=a||[]).push("style",n);var u=a;(t.updateQueue=u)&&(t.flags|=4)}},Fs=function(e,t,n,r){n!==r&&(t.flags|=4)};var Gs=!1,Qs=!1,Xs="function"===typeof WeakSet?WeakSet:Set,Js=null;function Zs(e,t){var n=e.ref;if(null!==n)if("function"===typeof n)try{n(null)}catch(r){Cc(e,t,r)}else n.current=null}function el(e,t,n){try{n()}catch(r){Cc(e,t,r)}}var tl=!1;function nl(e,t,n){var r=t.updateQueue;if(null!==(r=null!==r?r.lastEffect:null)){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,void 0!==o&&el(t,n,o)}i=i.next}while(i!==r)}}function rl(e,t){if(null!==(t=null!==(t=t.updateQueue)?t.lastEffect:null)){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function il(e){var t=e.ref;if(null!==t){var n=e.stateNode;e.tag,e=n,"function"===typeof t?t(e):t.current=e}}function ol(e){var t=e.alternate;null!==t&&(e.alternate=null,ol(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&(delete t[hi],delete t[pi],delete t[gi],delete t[mi],delete t[bi])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function al(e){return 5===e.tag||3===e.tag||4===e.tag}function sl(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||al(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function ll(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Zr));else if(4!==r&&null!==(e=e.child))for(ll(e,t,n),e=e.sibling;null!==e;)ll(e,t,n),e=e.sibling}function cl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(cl(e,t,n),e=e.sibling;null!==e;)cl(e,t,n),e=e.sibling}var ul=null,dl=!1;function hl(e,t,n){for(n=n.child;null!==n;)pl(e,t,n),n=n.sibling}function pl(e,t,n){if(ot&&"function"===typeof ot.onCommitFiberUnmount)try{ot.onCommitFiberUnmount(it,n)}catch(s){}switch(n.tag){case 5:Qs||Zs(n,t);case 6:var r=ul,i=dl;ul=null,hl(e,t,n),dl=i,null!==(ul=r)&&(dl?(e=ul,n=n.stateNode,8===e.nodeType?e.parentNode.removeChild(n):e.removeChild(n)):ul.removeChild(n.stateNode));break;case 18:null!==ul&&(dl?(e=ul,n=n.stateNode,8===e.nodeType?li(e.parentNode,n):1===e.nodeType&&li(e,n),Bt(e)):li(ul,n.stateNode));break;case 4:r=ul,i=dl,ul=n.stateNode.containerInfo,dl=!0,hl(e,t,n),ul=r,dl=i;break;case 0:case 11:case 14:case 15:if(!Qs&&(null!==(r=n.updateQueue)&&null!==(r=r.lastEffect))){i=r=r.next;do{var o=i,a=o.destroy;o=o.tag,void 0!==a&&(0!==(2&o)||0!==(4&o))&&el(n,t,a),i=i.next}while(i!==r)}hl(e,t,n);break;case 1:if(!Qs&&(Zs(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){Cc(n,t,s)}hl(e,t,n);break;case 21:hl(e,t,n);break;case 22:1&n.mode?(Qs=(r=Qs)||null!==n.memoizedState,hl(e,t,n),Qs=r):hl(e,t,n);break;default:hl(e,t,n)}}function fl(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new Xs),t.forEach((function(t){var r=Ic.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}function gl(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var i=n[r];try{var a=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 5:ul=l.stateNode,dl=!1;break e;case 3:case 4:ul=l.stateNode.containerInfo,dl=!0;break e}l=l.return}if(null===ul)throw Error(o(160));pl(a,s,i),ul=null,dl=!1;var c=i.alternate;null!==c&&(c.return=null),i.return=null}catch(u){Cc(i,t,u)}}if(12854&t.subtreeFlags)for(t=t.child;null!==t;)ml(t,e),t=t.sibling}function ml(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(gl(t,e),bl(e),4&r){try{nl(3,e,e.return),rl(3,e)}catch(m){Cc(e,e.return,m)}try{nl(5,e,e.return)}catch(m){Cc(e,e.return,m)}}break;case 1:gl(t,e),bl(e),512&r&&null!==n&&Zs(n,n.return);break;case 5:if(gl(t,e),bl(e),512&r&&null!==n&&Zs(n,n.return),32&e.flags){var i=e.stateNode;try{he(i,"")}catch(m){Cc(e,e.return,m)}}if(4&r&&null!=(i=e.stateNode)){var a=e.memoizedProps,s=null!==n?n.memoizedProps:a,l=e.type,c=e.updateQueue;if(e.updateQueue=null,null!==c)try{"input"===l&&"radio"===a.type&&null!=a.name&&X(i,a),ve(l,s);var u=ve(l,a);for(s=0;s<c.length;s+=2){var d=c[s],h=c[s+1];"style"===d?me(i,h):"dangerouslySetInnerHTML"===d?de(i,h):"children"===d?he(i,h):v(i,d,h,u)}switch(l){case"input":J(i,a);break;case"textarea":oe(i,a);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!a.multiple;var f=a.value;null!=f?ne(i,!!a.multiple,f,!1):p!==!!a.multiple&&(null!=a.defaultValue?ne(i,!!a.multiple,a.defaultValue,!0):ne(i,!!a.multiple,a.multiple?[]:"",!1))}i[pi]=a}catch(m){Cc(e,e.return,m)}}break;case 6:if(gl(t,e),bl(e),4&r){if(null===e.stateNode)throw Error(o(162));i=e.stateNode,a=e.memoizedProps;try{i.nodeValue=a}catch(m){Cc(e,e.return,m)}}break;case 3:if(gl(t,e),bl(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Bt(t.containerInfo)}catch(m){Cc(e,e.return,m)}break;case 4:default:gl(t,e),bl(e);break;case 13:gl(t,e),bl(e),8192&(i=e.child).flags&&(a=null!==i.memoizedState,i.stateNode.isHidden=a,!a||null!==i.alternate&&null!==i.alternate.memoizedState||(Ul=Xe())),4&r&&fl(e);break;case 22:if(d=null!==n&&null!==n.memoizedState,1&e.mode?(Qs=(u=Qs)||d,gl(t,e),Qs=u):gl(t,e),bl(e),8192&r){if(u=null!==e.memoizedState,(e.stateNode.isHidden=u)&&!d&&0!==(1&e.mode))for(Js=e,d=e.child;null!==d;){for(h=Js=d;null!==Js;){switch(f=(p=Js).child,p.tag){case 0:case 11:case 14:case 15:nl(4,p,p.return);break;case 1:Zs(p,p.return);var g=p.stateNode;if("function"===typeof g.componentWillUnmount){r=p,n=p.return;try{t=r,g.props=t.memoizedProps,g.state=t.memoizedState,g.componentWillUnmount()}catch(m){Cc(r,n,m)}}break;case 5:Zs(p,p.return);break;case 22:if(null!==p.memoizedState){wl(h);continue}}null!==f?(f.return=p,Js=f):wl(h)}d=d.sibling}e:for(d=null,h=e;;){if(5===h.tag){if(null===d){d=h;try{i=h.stateNode,u?"function"===typeof(a=i.style).setProperty?a.setProperty("display","none","important"):a.display="none":(l=h.stateNode,s=void 0!==(c=h.memoizedProps.style)&&null!==c&&c.hasOwnProperty("display")?c.display:null,l.style.display=ge("display",s))}catch(m){Cc(e,e.return,m)}}}else if(6===h.tag){if(null===d)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(m){Cc(e,e.return,m)}}else if((22!==h.tag&&23!==h.tag||null===h.memoizedState||h===e)&&null!==h.child){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;null===h.sibling;){if(null===h.return||h.return===e)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:gl(t,e),bl(e),4&r&&fl(e);case 21:}}function bl(e){var t=e.flags;if(2&t){try{e:{for(var n=e.return;null!==n;){if(al(n)){var r=n;break e}n=n.return}throw Error(o(160))}switch(r.tag){case 5:var i=r.stateNode;32&r.flags&&(he(i,""),r.flags&=-33),cl(e,sl(e),i);break;case 3:case 4:var a=r.stateNode.containerInfo;ll(e,sl(e),a);break;default:throw Error(o(161))}}catch(s){Cc(e,e.return,s)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function yl(e,t,n){Js=e,vl(e,t,n)}function vl(e,t,n){for(var r=0!==(1&e.mode);null!==Js;){var i=Js,o=i.child;if(22===i.tag&&r){var a=null!==i.memoizedState||Gs;if(!a){var s=i.alternate,l=null!==s&&null!==s.memoizedState||Qs;s=Gs;var c=Qs;if(Gs=a,(Qs=l)&&!c)for(Js=i;null!==Js;)l=(a=Js).child,22===a.tag&&null!==a.memoizedState?_l(i):null!==l?(l.return=a,Js=l):_l(i);for(;null!==o;)Js=o,vl(o,t,n),o=o.sibling;Js=i,Gs=s,Qs=c}xl(e)}else 0!==(8772&i.subtreeFlags)&&null!==o?(o.return=i,Js=o):xl(e)}}function xl(e){for(;null!==Js;){var t=Js;if(0!==(8772&t.flags)){var n=t.alternate;try{if(0!==(8772&t.flags))switch(t.tag){case 0:case 11:case 15:Qs||rl(5,t);break;case 1:var r=t.stateNode;if(4&t.flags&&!Qs)if(null===n)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:ns(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;null!==a&&Ho(t,a,r);break;case 3:var s=t.updateQueue;if(null!==s){if(n=null,null!==t.child)switch(t.child.tag){case 5:case 1:n=t.child.stateNode}Ho(t,s,n)}break;case 5:var l=t.stateNode;if(null===n&&4&t.flags){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:case 25:break;case 13:if(null===t.memoizedState){var u=t.alternate;if(null!==u){var d=u.memoizedState;if(null!==d){var h=d.dehydrated;null!==h&&Bt(h)}}}break;default:throw Error(o(163))}Qs||512&t.flags&&il(t)}catch(p){Cc(t,t.return,p)}}if(t===e){Js=null;break}if(null!==(n=t.sibling)){n.return=t.return,Js=n;break}Js=t.return}}function wl(e){for(;null!==Js;){var t=Js;if(t===e){Js=null;break}var n=t.sibling;if(null!==n){n.return=t.return,Js=n;break}Js=t.return}}function _l(e){for(;null!==Js;){var t=Js;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{rl(4,t)}catch(l){Cc(t,n,l)}break;case 1:var r=t.stateNode;if("function"===typeof r.componentDidMount){var i=t.return;try{r.componentDidMount()}catch(l){Cc(t,i,l)}}var o=t.return;try{il(t)}catch(l){Cc(t,o,l)}break;case 5:var a=t.return;try{il(t)}catch(l){Cc(t,a,l)}}}catch(l){Cc(t,t.return,l)}if(t===e){Js=null;break}var s=t.sibling;if(null!==s){s.return=t.return,Js=s;break}Js=t.return}}var kl,Cl=Math.ceil,Sl=x.ReactCurrentDispatcher,El=x.ReactCurrentOwner,Tl=x.ReactCurrentBatchConfig,Il=0,Nl=null,jl=null,Pl=0,Rl=0,Dl=Ci(0),Fl=0,Ol=null,Ll=0,Al=0,Ml=0,zl=null,$l=null,Ul=0,Bl=1/0,Wl=null,Hl=!1,ql=null,Vl=null,Kl=!1,Yl=null,Gl=0,Ql=0,Xl=null,Jl=-1,Zl=0;function ec(){return 0!==(6&Il)?Xe():-1!==Jl?Jl:Jl=Xe()}function tc(e){return 0===(1&e.mode)?1:0!==(2&Il)&&0!==Pl?Pl&-Pl:null!==mo.transition?(0===Zl&&(Zl=gt()),Zl):0!==(e=vt)?e:e=void 0===(e=window.event)?16:Qt(e.type)}function nc(e,t,n,r){if(50<Ql)throw Ql=0,Xl=null,Error(o(185));bt(e,n,r),0!==(2&Il)&&e===Nl||(e===Nl&&(0===(2&Il)&&(Al|=n),4===Fl&&sc(e,Pl)),rc(e,r),1===n&&0===Il&&0===(1&t.mode)&&(Bl=Xe()+500,zi&&Bi()))}function rc(e,t){var n=e.callbackNode;!function(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var a=31-at(o),s=1<<a,l=i[a];-1===l?0!==(s&n)&&0===(s&r)||(i[a]=pt(s,t)):l<=t&&(e.expiredLanes|=s),o&=~s}}(e,t);var r=ht(e,e===Nl?Pl:0);if(0===r)null!==n&&Ye(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(null!=n&&Ye(n),1===t)0===e.tag?function(e){zi=!0,Ui(e)}(lc.bind(null,e)):Ui(lc.bind(null,e)),ai((function(){0===(6&Il)&&Bi()})),n=null;else{switch(xt(r)){case 1:n=Ze;break;case 4:n=et;break;case 16:default:n=tt;break;case 536870912:n=rt}n=Nc(n,ic.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ic(e,t){if(Jl=-1,Zl=0,0!==(6&Il))throw Error(o(327));var n=e.callbackNode;if(_c()&&e.callbackNode!==n)return null;var r=ht(e,e===Nl?Pl:0);if(0===r)return null;if(0!==(30&r)||0!==(r&e.expiredLanes)||t)t=mc(e,r);else{t=r;var i=Il;Il|=2;var a=fc();for(Nl===e&&Pl===t||(Wl=null,Bl=Xe()+500,hc(e,t));;)try{yc();break}catch(l){pc(e,l)}To(),Sl.current=a,Il=i,null!==jl?t=0:(Nl=null,Pl=0,t=Fl)}if(0!==t){if(2===t&&(0!==(i=ft(e))&&(r=i,t=oc(e,i))),1===t)throw n=Ol,hc(e,0),sc(e,r),rc(e,Xe()),n;if(6===t)sc(e,r);else{if(i=e.current.alternate,0===(30&r)&&!function(e){for(var t=e;;){if(16384&t.flags){var n=t.updateQueue;if(null!==n&&null!==(n=n.stores))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!sr(o(),i))return!1}catch(s){return!1}}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}(i)&&(2===(t=mc(e,r))&&(0!==(a=ft(e))&&(r=a,t=oc(e,a))),1===t))throw n=Ol,hc(e,0),sc(e,r),rc(e,Xe()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(o(345));case 2:case 5:wc(e,$l,Wl);break;case 3:if(sc(e,r),(130023424&r)===r&&10<(t=Ul+500-Xe())){if(0!==ht(e,0))break;if(((i=e.suspendedLanes)&r)!==r){ec(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=ri(wc.bind(null,e,$l,Wl),t);break}wc(e,$l,Wl);break;case 4:if(sc(e,r),(4194240&r)===r)break;for(t=e.eventTimes,i=-1;0<r;){var s=31-at(r);a=1<<s,(s=t[s])>i&&(i=s),r&=~a}if(r=i,10<(r=(120>(r=Xe()-r)?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Cl(r/1960))-r)){e.timeoutHandle=ri(wc.bind(null,e,$l,Wl),r);break}wc(e,$l,Wl);break;default:throw Error(o(329))}}}return rc(e,Xe()),e.callbackNode===n?ic.bind(null,e):null}function oc(e,t){var n=zl;return e.current.memoizedState.isDehydrated&&(hc(e,t).flags|=256),2!==(e=mc(e,t))&&(t=$l,$l=n,null!==t&&ac(t)),e}function ac(e){null===$l?$l=e:$l.push.apply($l,e)}function sc(e,t){for(t&=~Ml,t&=~Al,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-at(t),r=1<<n;e[n]=-1,t&=~r}}function lc(e){if(0!==(6&Il))throw Error(o(327));_c();var t=ht(e,0);if(0===(1&t))return rc(e,Xe()),null;var n=mc(e,t);if(0!==e.tag&&2===n){var r=ft(e);0!==r&&(t=r,n=oc(e,r))}if(1===n)throw n=Ol,hc(e,0),sc(e,t),rc(e,Xe()),n;if(6===n)throw Error(o(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,wc(e,$l,Wl),rc(e,Xe()),null}function cc(e,t){var n=Il;Il|=1;try{return e(t)}finally{0===(Il=n)&&(Bl=Xe()+500,zi&&Bi())}}function uc(e){null!==Yl&&0===Yl.tag&&0===(6&Il)&&_c();var t=Il;Il|=1;var n=Tl.transition,r=vt;try{if(Tl.transition=null,vt=1,e)return e()}finally{vt=r,Tl.transition=n,0===(6&(Il=t))&&Bi()}}function dc(){Rl=Dl.current,Si(Dl)}function hc(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,ii(n)),null!==jl)for(n=jl.return;null!==n;){var r=n;switch(to(r),r.tag){case 1:null!==(r=r.type.childContextTypes)&&void 0!==r&&Di();break;case 3:Xo(),Si(Ni),Si(Ii),ra();break;case 5:Zo(r);break;case 4:Xo();break;case 13:case 19:Si(ea);break;case 10:Io(r.type._context);break;case 22:case 23:dc()}n=n.return}if(Nl=e,jl=e=Dc(e.current,null),Pl=Rl=t,Fl=0,Ol=null,Ml=Al=Ll=0,$l=zl=null,null!==Ro){for(t=0;t<Ro.length;t++)if(null!==(r=(n=Ro[t]).interleaved)){n.interleaved=null;var i=r.next,o=n.pending;if(null!==o){var a=o.next;o.next=i,r.next=a}n.pending=r}Ro=null}return e}function pc(e,t){for(;;){var n=jl;try{if(To(),ia.current=Ja,ua){for(var r=sa.memoizedState;null!==r;){var i=r.queue;null!==i&&(i.pending=null),r=r.next}ua=!1}if(aa=0,ca=la=sa=null,da=!1,ha=0,El.current=null,null===n||null===n.return){Fl=1,Ol=t,jl=null;break}e:{var a=e,s=n.return,l=n,c=t;if(t=Pl,l.flags|=32768,null!==c&&"object"===typeof c&&"function"===typeof c.then){var u=c,d=l,h=d.tag;if(0===(1&d.mode)&&(0===h||11===h||15===h)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var f=ms(s);if(null!==f){f.flags&=-257,bs(f,s,l,0,t),1&f.mode&&gs(a,u,t),c=u;var g=(t=f).updateQueue;if(null===g){var m=new Set;m.add(c),t.updateQueue=m}else g.add(c);break e}if(0===(1&t)){gs(a,u,t),gc();break e}c=Error(o(426))}else if(io&&1&l.mode){var b=ms(s);if(null!==b){0===(65536&b.flags)&&(b.flags|=256),bs(b,s,l,0,t),go(cs(c,l));break e}}a=c=cs(c,l),4!==Fl&&(Fl=2),null===zl?zl=[a]:zl.push(a),a=s;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t,Bo(a,ps(0,c,t));break e;case 1:l=c;var y=a.type,v=a.stateNode;if(0===(128&a.flags)&&("function"===typeof y.getDerivedStateFromError||null!==v&&"function"===typeof v.componentDidCatch&&(null===Vl||!Vl.has(v)))){a.flags|=65536,t&=-t,a.lanes|=t,Bo(a,fs(a,l,t));break e}}a=a.return}while(null!==a)}xc(n)}catch(x){t=x,jl===n&&null!==n&&(jl=n=n.return);continue}break}}function fc(){var e=Sl.current;return Sl.current=Ja,null===e?Ja:e}function gc(){0!==Fl&&3!==Fl&&2!==Fl||(Fl=4),null===Nl||0===(268435455&Ll)&&0===(268435455&Al)||sc(Nl,Pl)}function mc(e,t){var n=Il;Il|=2;var r=fc();for(Nl===e&&Pl===t||(Wl=null,hc(e,t));;)try{bc();break}catch(i){pc(e,i)}if(To(),Il=n,Sl.current=r,null!==jl)throw Error(o(261));return Nl=null,Pl=0,Fl}function bc(){for(;null!==jl;)vc(jl)}function yc(){for(;null!==jl&&!Ge();)vc(jl)}function vc(e){var t=kl(e.alternate,e,Rl);e.memoizedProps=e.pendingProps,null===t?xc(e):jl=t,El.current=null}function xc(e){var t=e;do{var n=t.alternate;if(e=t.return,0===(32768&t.flags)){if(null!==(n=Ks(n,t,Rl)))return void(jl=n)}else{if(null!==(n=Ys(n,t)))return n.flags&=32767,void(jl=n);if(null===e)return Fl=6,void(jl=null);e.flags|=32768,e.subtreeFlags=0,e.deletions=null}if(null!==(t=t.sibling))return void(jl=t);jl=t=e}while(null!==t);0===Fl&&(Fl=5)}function wc(e,t,n){var r=vt,i=Tl.transition;try{Tl.transition=null,vt=1,function(e,t,n,r){do{_c()}while(null!==Yl);if(0!==(6&Il))throw Error(o(327));n=e.finishedWork;var i=e.finishedLanes;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(o(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(function(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-at(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}(e,a),e===Nl&&(jl=Nl=null,Pl=0),0===(2064&n.subtreeFlags)&&0===(2064&n.flags)||Kl||(Kl=!0,Nc(tt,(function(){return _c(),null}))),a=0!==(15990&n.flags),0!==(15990&n.subtreeFlags)||a){a=Tl.transition,Tl.transition=null;var s=vt;vt=1;var l=Il;Il|=4,El.current=null,function(e,t){if(ei=Ht,pr(e=hr())){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch(w){n=null;break e}var s=0,l=-1,c=-1,u=0,d=0,h=e,p=null;t:for(;;){for(var f;h!==n||0!==i&&3!==h.nodeType||(l=s+i),h!==a||0!==r&&3!==h.nodeType||(c=s+r),3===h.nodeType&&(s+=h.nodeValue.length),null!==(f=h.firstChild);)p=h,h=f;for(;;){if(h===e)break t;if(p===n&&++u===i&&(l=s),p===a&&++d===r&&(c=s),null!==(f=h.nextSibling))break;p=(h=p).parentNode}h=f}n=-1===l||-1===c?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(ti={focusedElem:e,selectionRange:n},Ht=!1,Js=t;null!==Js;)if(e=(t=Js).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Js=e;else for(;null!==Js;){t=Js;try{var g=t.alternate;if(0!==(1024&t.flags))switch(t.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break;case 1:if(null!==g){var m=g.memoizedProps,b=g.memoizedState,y=t.stateNode,v=y.getSnapshotBeforeUpdate(t.elementType===t.type?m:ns(t.type,m),b);y.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var x=t.stateNode.containerInfo;1===x.nodeType?x.textContent="":9===x.nodeType&&x.documentElement&&x.removeChild(x.documentElement);break;default:throw Error(o(163))}}catch(w){Cc(t,t.return,w)}if(null!==(e=t.sibling)){e.return=t.return,Js=e;break}Js=t.return}g=tl,tl=!1}(e,n),ml(n,e),fr(ti),Ht=!!ei,ti=ei=null,e.current=n,yl(n,e,i),Qe(),Il=l,vt=s,Tl.transition=a}else e.current=n;if(Kl&&(Kl=!1,Yl=e,Gl=i),a=e.pendingLanes,0===a&&(Vl=null),function(e){if(ot&&"function"===typeof ot.onCommitFiberRoot)try{ot.onCommitFiberRoot(it,e,void 0,128===(128&e.current.flags))}catch(t){}}(n.stateNode),rc(e,Xe()),null!==t)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Hl)throw Hl=!1,e=ql,ql=null,e;0!==(1&Gl)&&0!==e.tag&&_c(),a=e.pendingLanes,0!==(1&a)?e===Xl?Ql++:(Ql=0,Xl=e):Ql=0,Bi()}(e,t,n,r)}finally{Tl.transition=i,vt=r}return null}function _c(){if(null!==Yl){var e=xt(Gl),t=Tl.transition,n=vt;try{if(Tl.transition=null,vt=16>e?16:e,null===Yl)var r=!1;else{if(e=Yl,Yl=null,Gl=0,0!==(6&Il))throw Error(o(331));var i=Il;for(Il|=4,Js=e.current;null!==Js;){var a=Js,s=a.child;if(0!==(16&Js.flags)){var l=a.deletions;if(null!==l){for(var c=0;c<l.length;c++){var u=l[c];for(Js=u;null!==Js;){var d=Js;switch(d.tag){case 0:case 11:case 15:nl(8,d,a)}var h=d.child;if(null!==h)h.return=d,Js=h;else for(;null!==Js;){var p=(d=Js).sibling,f=d.return;if(ol(d),d===u){Js=null;break}if(null!==p){p.return=f,Js=p;break}Js=f}}}var g=a.alternate;if(null!==g){var m=g.child;if(null!==m){g.child=null;do{var b=m.sibling;m.sibling=null,m=b}while(null!==m)}}Js=a}}if(0!==(2064&a.subtreeFlags)&&null!==s)s.return=a,Js=s;else e:for(;null!==Js;){if(0!==(2048&(a=Js).flags))switch(a.tag){case 0:case 11:case 15:nl(9,a,a.return)}var y=a.sibling;if(null!==y){y.return=a.return,Js=y;break e}Js=a.return}}var v=e.current;for(Js=v;null!==Js;){var x=(s=Js).child;if(0!==(2064&s.subtreeFlags)&&null!==x)x.return=s,Js=x;else e:for(s=v;null!==Js;){if(0!==(2048&(l=Js).flags))try{switch(l.tag){case 0:case 11:case 15:rl(9,l)}}catch(_){Cc(l,l.return,_)}if(l===s){Js=null;break e}var w=l.sibling;if(null!==w){w.return=l.return,Js=w;break e}Js=l.return}}if(Il=i,Bi(),ot&&"function"===typeof ot.onPostCommitFiberRoot)try{ot.onPostCommitFiberRoot(it,e)}catch(_){}r=!0}return r}finally{vt=n,Tl.transition=t}}return!1}function kc(e,t,n){e=$o(e,t=ps(0,t=cs(n,t),1),1),t=ec(),null!==e&&(bt(e,1,t),rc(e,t))}function Cc(e,t,n){if(3===e.tag)kc(e,e,n);else for(;null!==t;){if(3===t.tag){kc(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===Vl||!Vl.has(r))){t=$o(t,e=fs(t,e=cs(n,e),1),1),e=ec(),null!==t&&(bt(t,1,e),rc(t,e));break}}t=t.return}}function Sc(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=ec(),e.pingedLanes|=e.suspendedLanes&n,Nl===e&&(Pl&n)===n&&(4===Fl||3===Fl&&(130023424&Pl)===Pl&&500>Xe()-Ul?hc(e,0):Ml|=n),rc(e,t)}function Ec(e,t){0===t&&(0===(1&e.mode)?t=1:(t=ut,0===(130023424&(ut<<=1))&&(ut=4194304)));var n=ec();null!==(e=Oo(e,t))&&(bt(e,t,n),rc(e,n))}function Tc(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),Ec(e,n)}function Ic(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;null!==i&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(o(314))}null!==r&&r.delete(t),Ec(e,n)}function Nc(e,t){return Ke(e,t)}function jc(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pc(e,t,n,r){return new jc(e,t,n,r)}function Rc(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Dc(e,t){var n=e.alternate;return null===n?((n=Pc(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=14680064&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Fc(e,t,n,r,i,a){var s=2;if(r=e,"function"===typeof e)Rc(e)&&(s=1);else if("string"===typeof e)s=5;else e:switch(e){case k:return Oc(n.children,i,a,t);case C:s=8,i|=8;break;case S:return(e=Pc(12,n,t,2|i)).elementType=S,e.lanes=a,e;case N:return(e=Pc(13,n,t,i)).elementType=N,e.lanes=a,e;case j:return(e=Pc(19,n,t,i)).elementType=j,e.lanes=a,e;case D:return Lc(n,i,a,t);default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case E:s=10;break e;case T:s=9;break e;case I:s=11;break e;case P:s=14;break e;case R:s=16,r=null;break e}throw Error(o(130,null==e?e:typeof e,""))}return(t=Pc(s,n,t,i)).elementType=e,t.type=r,t.lanes=a,t}function Oc(e,t,n,r){return(e=Pc(7,e,r,t)).lanes=n,e}function Lc(e,t,n,r){return(e=Pc(22,e,r,t)).elementType=D,e.lanes=n,e.stateNode={isHidden:!1},e}function Ac(e,t,n){return(e=Pc(6,e,null,t)).lanes=n,e}function Mc(e,t,n){return(t=Pc(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function zc(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=mt(0),this.expirationTimes=mt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mt(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function $c(e,t,n,r,i,o,a,s,l){return e=new zc(e,t,n,s,l),1===t?(t=1,!0===o&&(t|=8)):t=0,o=Pc(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ao(o),e}function Uc(e){if(!e)return Ti;e:{if(Be(e=e._reactInternals)!==e||1!==e.tag)throw Error(o(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ri(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(null!==t);throw Error(o(171))}if(1===e.tag){var n=e.type;if(Ri(n))return Oi(e,n,t)}return t}function Bc(e,t,n,r,i,o,a,s,l){return(e=$c(n,r,!0,e,0,o,0,s,l)).context=Uc(null),n=e.current,(o=zo(r=ec(),i=tc(n))).callback=void 0!==t&&null!==t?t:null,$o(n,o,i),e.current.lanes=i,bt(e,i,r),rc(e,r),e}function Wc(e,t,n,r){var i=t.current,o=ec(),a=tc(i);return n=Uc(n),null===t.context?t.context=n:t.pendingContext=n,(t=zo(o,a)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),null!==(e=$o(i,t,a))&&(nc(e,i,a,o),Uo(e,i,a)),a}function Hc(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function qc(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function Vc(e,t){qc(e,t),(e=e.alternate)&&qc(e,t)}kl=function(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps||Ni.current)vs=!0;else{if(0===(e.lanes&n)&&0===(128&t.flags))return vs=!1,function(e,t,n){switch(t.tag){case 3:Ns(t),fo();break;case 5:Jo(t);break;case 1:Ri(t.type)&&Li(t);break;case 4:Qo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;Ei(ko,r._currentValue),r._currentValue=i;break;case 13:if(null!==(r=t.memoizedState))return null!==r.dehydrated?(Ei(ea,1&ea.current),t.flags|=128,null):0!==(n&t.child.childLanes)?As(e,t,n):(Ei(ea,1&ea.current),null!==(e=Hs(e,t,n))?e.sibling:null);Ei(ea,1&ea.current);break;case 19:if(r=0!==(n&t.childLanes),0!==(128&e.flags)){if(r)return Bs(e,t,n);t.flags|=128}if(null!==(i=t.memoizedState)&&(i.rendering=null,i.tail=null,i.lastEffect=null),Ei(ea,ea.current),r)break;return null;case 22:case 23:return t.lanes=0,Cs(e,t,n)}return Hs(e,t,n)}(e,t,n);vs=0!==(131072&e.flags)}else vs=!1,io&&0!==(1048576&t.flags)&&Zi(t,Vi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ws(e,t),e=t.pendingProps;var i=Pi(t,Ii.current);jo(t,n),i=ma(null,t,r,e,i,n);var a=ba();return t.flags|=1,"object"===typeof i&&null!==i&&"function"===typeof i.render&&void 0===i.$$typeof?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ri(r)?(a=!0,Li(t)):a=!1,t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,Ao(t),i.updater=is,t.stateNode=i,i._reactInternals=t,ls(t,r,e,n),t=Is(null,t,r,!0,a,n)):(t.tag=0,io&&a&&eo(t),xs(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ws(e,t),e=t.pendingProps,r=(i=r._init)(r._payload),t.type=r,i=t.tag=function(e){if("function"===typeof e)return Rc(e)?1:0;if(void 0!==e&&null!==e){if((e=e.$$typeof)===I)return 11;if(e===P)return 14}return 2}(r),e=ns(r,e),i){case 0:t=Es(null,t,r,e,n);break e;case 1:t=Ts(null,t,r,e,n);break e;case 11:t=ws(null,t,r,e,n);break e;case 14:t=_s(null,t,r,ns(r.type,e),n);break e}throw Error(o(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,Es(e,t,r,i=t.elementType===r?i:ns(r,i),n);case 1:return r=t.type,i=t.pendingProps,Ts(e,t,r,i=t.elementType===r?i:ns(r,i),n);case 3:e:{if(Ns(t),null===e)throw Error(o(387));r=t.pendingProps,i=(a=t.memoizedState).element,Mo(e,t),Wo(t,r,null,n);var s=t.memoizedState;if(r=s.element,a.isDehydrated){if(a={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=a,t.memoizedState=a,256&t.flags){t=js(e,t,r,n,i=cs(Error(o(423)),t));break e}if(r!==i){t=js(e,t,r,n,i=cs(Error(o(424)),t));break e}for(ro=ci(t.stateNode.containerInfo.firstChild),no=t,io=!0,oo=null,n=_o(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(fo(),r===i){t=Hs(e,t,n);break e}xs(e,t,r,n)}t=t.child}return t;case 5:return Jo(t),null===e&&co(t),r=t.type,i=t.pendingProps,a=null!==e?e.memoizedProps:null,s=i.children,ni(r,i)?s=null:null!==a&&ni(r,a)&&(t.flags|=32),Ss(e,t),xs(e,t,s,n),t.child;case 6:return null===e&&co(t),null;case 13:return As(e,t,n);case 4:return Qo(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=wo(t,null,r,n):xs(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,ws(e,t,r,i=t.elementType===r?i:ns(r,i),n);case 7:return xs(e,t,t.pendingProps,n),t.child;case 8:case 12:return xs(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,a=t.memoizedProps,s=i.value,Ei(ko,r._currentValue),r._currentValue=s,null!==a)if(sr(a.value,s)){if(a.children===i.children&&!Ni.current){t=Hs(e,t,n);break e}}else for(null!==(a=t.child)&&(a.return=t);null!==a;){var l=a.dependencies;if(null!==l){s=a.child;for(var c=l.firstContext;null!==c;){if(c.context===r){if(1===a.tag){(c=zo(-1,n&-n)).tag=2;var u=a.updateQueue;if(null!==u){var d=(u=u.shared).pending;null===d?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}a.lanes|=n,null!==(c=a.alternate)&&(c.lanes|=n),No(a.return,n,t),l.lanes|=n;break}c=c.next}}else if(10===a.tag)s=a.type===t.type?null:a.child;else if(18===a.tag){if(null===(s=a.return))throw Error(o(341));s.lanes|=n,null!==(l=s.alternate)&&(l.lanes|=n),No(s,n,t),s=a.sibling}else s=a.child;if(null!==s)s.return=a;else for(s=a;null!==s;){if(s===t){s=null;break}if(null!==(a=s.sibling)){a.return=s.return,s=a;break}s=s.return}a=s}xs(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,jo(t,n),r=r(i=Po(i)),t.flags|=1,xs(e,t,r,n),t.child;case 14:return i=ns(r=t.type,t.pendingProps),_s(e,t,r,i=ns(r.type,i),n);case 15:return ks(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:ns(r,i),Ws(e,t),t.tag=1,Ri(r)?(e=!0,Li(t)):e=!1,jo(t,n),as(t,r,i),ls(t,r,i,n),Is(null,t,r,!0,e,n);case 19:return Bs(e,t,n);case 22:return Cs(e,t,n)}throw Error(o(156,t.tag))};var Kc="function"===typeof reportError?reportError:function(e){console.error(e)};function Yc(e){this._internalRoot=e}function Gc(e){this._internalRoot=e}function Qc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function Xc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function Jc(){}function Zc(e,t,n,r,i){var o=n._reactRootContainer;if(o){var a=o;if("function"===typeof i){var s=i;i=function(){var e=Hc(a);s.call(e)}}Wc(t,a,e,i)}else a=function(e,t,n,r,i){if(i){if("function"===typeof r){var o=r;r=function(){var e=Hc(a);o.call(e)}}var a=Bc(t,r,e,0,null,!1,0,"",Jc);return e._reactRootContainer=a,e[fi]=a.current,Br(8===e.nodeType?e.parentNode:e),uc(),a}for(;i=e.lastChild;)e.removeChild(i);if("function"===typeof r){var s=r;r=function(){var e=Hc(l);s.call(e)}}var l=$c(e,0,!1,null,0,!1,0,"",Jc);return e._reactRootContainer=l,e[fi]=l.current,Br(8===e.nodeType?e.parentNode:e),uc((function(){Wc(t,l,n,r)})),l}(n,t,e,i,r);return Hc(a)}Gc.prototype.render=Yc.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(o(409));Wc(e,t,null,null)},Gc.prototype.unmount=Yc.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;uc((function(){Wc(null,e,null,null)})),t[fi]=null}},Gc.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ct();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Dt.length&&0!==t&&t<Dt[n].priority;n++);Dt.splice(n,0,e),0===n&&At(e)}},wt=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=dt(t.pendingLanes);0!==n&&(yt(t,1|n),rc(t,Xe()),0===(6&Il)&&(Bl=Xe()+500,Bi()))}break;case 13:uc((function(){var t=Oo(e,1);if(null!==t){var n=ec();nc(t,e,1,n)}})),Vc(e,1)}},_t=function(e){if(13===e.tag){var t=Oo(e,134217728);if(null!==t)nc(t,e,134217728,ec());Vc(e,134217728)}},kt=function(e){if(13===e.tag){var t=tc(e),n=Oo(e,t);if(null!==n)nc(n,e,t,ec());Vc(e,t)}},Ct=function(){return vt},St=function(e,t){var n=vt;try{return vt=e,t()}finally{vt=n}},_e=function(e,t,n){switch(t){case"input":if(J(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=wi(r);if(!i)throw Error(o(90));K(r),J(r,i)}}}break;case"textarea":oe(e,n);break;case"select":null!=(t=n.value)&&ne(e,!!n.multiple,t,!1)}},Ie=cc,Ne=uc;var eu={usingClientEntryPoint:!1,Events:[vi,xi,wi,Ee,Te,cc]},tu={findFiberByHostInstance:yi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},nu={bundleType:tu.bundleType,version:tu.version,rendererPackageName:tu.rendererPackageName,rendererConfig:tu.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:x.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=qe(e))?null:e.stateNode},findFiberByHostInstance:tu.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var ru=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ru.isDisabled&&ru.supportsFiber)try{it=ru.inject(nu),ot=ru}catch(ue){}}t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=eu,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Qc(t))throw Error(o(200));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:_,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.createRoot=function(e,t){if(!Qc(e))throw Error(o(299));var n=!1,r="",i=Kc;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onRecoverableError&&(i=t.onRecoverableError)),t=$c(e,1,!1,null,0,n,0,r,i),e[fi]=t.current,Br(8===e.nodeType?e.parentNode:e),new Yc(t)},t.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(o(188));throw e=Object.keys(e).join(","),Error(o(268,e))}return e=null===(e=qe(t))?null:e.stateNode},t.flushSync=function(e){return uc(e)},t.hydrate=function(e,t,n){if(!Xc(t))throw Error(o(200));return Zc(null,e,t,!0,n)},t.hydrateRoot=function(e,t,n){if(!Qc(e))throw Error(o(405));var r=null!=n&&n.hydratedSources||null,i=!1,a="",s=Kc;if(null!==n&&void 0!==n&&(!0===n.unstable_strictMode&&(i=!0),void 0!==n.identifierPrefix&&(a=n.identifierPrefix),void 0!==n.onRecoverableError&&(s=n.onRecoverableError)),t=Bc(t,null,e,1,null!=n?n:null,i,0,a,s),e[fi]=t.current,Br(e),r)for(e=0;e<r.length;e++)i=(i=(n=r[e])._getVersion)(n._source),null==t.mutableSourceEagerHydrationData?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Gc(t)},t.render=function(e,t,n){if(!Xc(t))throw Error(o(200));return Zc(null,e,t,!1,n)},t.unmountComponentAtNode=function(e){if(!Xc(e))throw Error(o(40));return!!e._reactRootContainer&&(uc((function(){Zc(null,null,e,!1,(function(){e._reactRootContainer=null,e[fi]=null}))})),!0)},t.unstable_batchedUpdates=cc,t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Xc(n))throw Error(o(200));if(null==e||void 0===e._reactInternals)throw Error(o(38));return Zc(e,t,n,!1,r)},t.version="18.3.1-next-f1338f8080-20240426"},853:(e,t,n)=>{"use strict";e.exports=n(234)},950:(e,t,n)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(730)}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,i){if(1&i&&(r=this(r)),8&i)return r;if("object"===typeof r&&r){if(4&i&&r.__esModule)return r;if(16&i&&"function"===typeof r.then)return r}var o=Object.create(null);n.r(o);var a={};e=e||[null,t({}),t([]),t(t)];for(var s=2&i&&r;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>a[e]=()=>r[e]));return a.default=()=>r,n.d(o,a),o}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nc=void 0,(()=>{"use strict";var e,t=n(43),r=n.t(t,2),i=n(391),o=n(950),a=n.t(o,2);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s.apply(this,arguments)}!function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(e||(e={}));const l="popstate";function c(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function u(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(n){}}}function d(e,t){return{usr:e.state,key:e.key,idx:t}}function h(e,t,n,r){return void 0===n&&(n=null),s({pathname:"string"===typeof e?e:e.pathname,search:"",hash:""},"string"===typeof t?f(t):t,{state:n,key:t&&t.key||r||Math.random().toString(36).substr(2,8)})}function p(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function f(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function g(t,n,r,i){void 0===i&&(i={});let{window:o=document.defaultView,v5Compat:a=!1}=i,u=o.history,f=e.Pop,g=null,m=b();function b(){return(u.state||{idx:null}).idx}function y(){f=e.Pop;let t=b(),n=null==t?null:t-m;m=t,g&&g({action:f,location:x.location,delta:n})}function v(e){let t="null"!==o.location.origin?o.location.origin:o.location.href,n="string"===typeof e?e:p(e);return n=n.replace(/ $/,"%20"),c(t,"No window.location.(origin|href) available to create URL for href: "+n),new URL(n,t)}null==m&&(m=0,u.replaceState(s({},u.state,{idx:m}),""));let x={get action(){return f},get location(){return t(o,u)},listen(e){if(g)throw new Error("A history only accepts one active listener");return o.addEventListener(l,y),g=e,()=>{o.removeEventListener(l,y),g=null}},createHref:e=>n(o,e),createURL:v,encodeLocation(e){let t=v(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(t,n){f=e.Push;let i=h(x.location,t,n);r&&r(i,t),m=b()+1;let s=d(i,m),l=x.createHref(i);try{u.pushState(s,"",l)}catch(Ps){if(Ps instanceof DOMException&&"DataCloneError"===Ps.name)throw Ps;o.location.assign(l)}a&&g&&g({action:f,location:x.location,delta:1})},replace:function(t,n){f=e.Replace;let i=h(x.location,t,n);r&&r(i,t),m=b();let o=d(i,m),s=x.createHref(i);u.replaceState(o,"",s),a&&g&&g({action:f,location:x.location,delta:0})},go:e=>u.go(e)};return x}var m;!function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"}(m||(m={}));new Set(["lazy","caseSensitive","path","id","index","children"]);function b(e,t,n){return void 0===n&&(n="/"),y(e,t,n,!1)}function y(e,t,n,r){let i=R(("string"===typeof t?f(t):t).pathname||"/",n);if(null==i)return null;let o=v(e);!function(e){e.sort(((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every(((e,n)=>e===t[n]));return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map((e=>e.childrenIndex)),t.routesMeta.map((e=>e.childrenIndex)))))}(o);let a=null;for(let s=0;null==a&&s<o.length;++s){let e=P(i);a=N(o[s],e,r)}return a}function v(e,t,n,r){void 0===t&&(t=[]),void 0===n&&(n=[]),void 0===r&&(r="");let i=(e,i,o)=>{let a={relativePath:void 0===o?e.path||"":o,caseSensitive:!0===e.caseSensitive,childrenIndex:i,route:e};a.relativePath.startsWith("/")&&(c(a.relativePath.startsWith(r),'Absolute route path "'+a.relativePath+'" nested under path "'+r+'" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),a.relativePath=a.relativePath.slice(r.length));let s=A([r,a.relativePath]),l=n.concat(a);e.children&&e.children.length>0&&(c(!0!==e.index,'Index routes must not have child routes. Please remove all child routes from route path "'+s+'".'),v(e.children,t,l,s)),(null!=e.path||e.index)&&t.push({path:s,score:I(s,e.index),routesMeta:l})};return e.forEach(((e,t)=>{var n;if(""!==e.path&&null!=(n=e.path)&&n.includes("?"))for(let r of x(e.path))i(e,t,r);else i(e,t)})),t}function x(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,i=n.endsWith("?"),o=n.replace(/\?$/,"");if(0===r.length)return i?[o,""]:[o];let a=x(r.join("/")),s=[];return s.push(...a.map((e=>""===e?o:[o,e].join("/")))),i&&s.push(...a),s.map((t=>e.startsWith("/")&&""===t?"/":t))}const w=/^:[\w-]+$/,_=3,k=2,C=1,S=10,E=-2,T=e=>"*"===e;function I(e,t){let n=e.split("/"),r=n.length;return n.some(T)&&(r+=E),t&&(r+=k),n.filter((e=>!T(e))).reduce(((e,t)=>e+(w.test(t)?_:""===t?C:S)),r)}function N(e,t,n){void 0===n&&(n=!1);let{routesMeta:r}=e,i={},o="/",a=[];for(let s=0;s<r.length;++s){let e=r[s],l=s===r.length-1,c="/"===o?t:t.slice(o.length)||"/",u=j({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},c),d=e.route;if(!u&&l&&n&&!r[r.length-1].route.index&&(u=j({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},c)),!u)return null;Object.assign(i,u.params),a.push({params:i,pathname:A([o,u.pathname]),pathnameBase:M(A([o,u.pathnameBase])),route:d}),"/"!==u.pathnameBase&&(o=A([o,u.pathnameBase]))}return a}function j(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=function(e,t,n){void 0===t&&(t=!1);void 0===n&&(n=!0);u("*"===e||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were "'+e.replace(/\*$/,"/*")+'" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'+e.replace(/\*$/,"/*")+'".');let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,((e,t,n)=>(r.push({paramName:t,isOptional:null!=n}),n?"/?([^\\/]+)?":"/([^\\/]+)")));e.endsWith("*")?(r.push({paramName:"*"}),i+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":""!==e&&"/"!==e&&(i+="(?:(?=\\/|$))");let o=new RegExp(i,t?void 0:"i");return[o,r]}(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let o=i[0],a=o.replace(/(.)\/+$/,"$1"),s=i.slice(1);return{params:r.reduce(((e,t,n)=>{let{paramName:r,isOptional:i}=t;if("*"===r){let e=s[n]||"";a=o.slice(0,o.length-e.length).replace(/(.)\/+$/,"$1")}const l=s[n];return e[r]=i&&!l?void 0:(l||"").replace(/%2F/g,"/"),e}),{}),pathname:o,pathnameBase:a,pattern:e}}function P(e){try{return e.split("/").map((e=>decodeURIComponent(e).replace(/\//g,"%2F"))).join("/")}catch(Ps){return u(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('+Ps+")."),e}}function R(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}function D(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified `to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the `to."+n+'` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'}function F(e){return e.filter(((e,t)=>0===t||e.route.path&&e.route.path.length>0))}function O(e,t){let n=F(e);return t?n.map(((e,t)=>t===n.length-1?e.pathname:e.pathnameBase)):n.map((e=>e.pathnameBase))}function L(e,t,n,r){let i;void 0===r&&(r=!1),"string"===typeof e?i=f(e):(i=s({},e),c(!i.pathname||!i.pathname.includes("?"),D("?","pathname","search",i)),c(!i.pathname||!i.pathname.includes("#"),D("#","pathname","hash",i)),c(!i.search||!i.search.includes("#"),D("#","search","hash",i)));let o,a=""===e||""===i.pathname,l=a?"/":i.pathname;if(null==l)o=n;else{let e=t.length-1;if(!r&&l.startsWith("..")){let t=l.split("/");for(;".."===t[0];)t.shift(),e-=1;i.pathname=t.join("/")}o=e>=0?t[e]:"/"}let u=function(e,t){void 0===t&&(t="/");let{pathname:n,search:r="",hash:i=""}="string"===typeof e?f(e):e,o=n?n.startsWith("/")?n:function(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach((e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)})),n.length>1?n.join("/"):"/"}(n,t):t;return{pathname:o,search:z(r),hash:$(i)}}(i,o),d=l&&"/"!==l&&l.endsWith("/"),h=(a||"."===l)&&n.endsWith("/");return u.pathname.endsWith("/")||!d&&!h||(u.pathname+="/"),u}const A=e=>e.join("/").replace(/\/\/+/g,"/"),M=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),z=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",$=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";Error;function U(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}const B=["post","put","patch","delete"],W=(new Set(B),["get",...B]);new Set(W),new Set([301,302,303,307,308]),new Set([307,308]);Symbol("deferred");function H(){return H=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},H.apply(this,arguments)}const q=t.createContext(null);const V=t.createContext(null);const K=t.createContext(null);const Y=t.createContext(null);const G=t.createContext({outlet:null,matches:[],isDataRoute:!1});const Q=t.createContext(null);function X(){return null!=t.useContext(Y)}function J(){return X()||c(!1),t.useContext(Y).location}function Z(e){t.useContext(K).static||t.useLayoutEffect(e)}function ee(){let{isDataRoute:e}=t.useContext(G);return e?function(){let{router:e}=ue(le.UseNavigateStable),n=he(ce.UseNavigateStable),r=t.useRef(!1);return Z((()=>{r.current=!0})),t.useCallback((function(t,i){void 0===i&&(i={}),r.current&&("number"===typeof t?e.navigate(t):e.navigate(t,H({fromRouteId:n},i)))}),[e,n])}():function(){X()||c(!1);let e=t.useContext(q),{basename:n,future:r,navigator:i}=t.useContext(K),{matches:o}=t.useContext(G),{pathname:a}=J(),s=JSON.stringify(O(o,r.v7_relativeSplatPath)),l=t.useRef(!1);Z((()=>{l.current=!0}));let u=t.useCallback((function(t,r){if(void 0===r&&(r={}),!l.current)return;if("number"===typeof t)return void i.go(t);let o=L(t,JSON.parse(s),a,"path"===r.relative);null==e&&"/"!==n&&(o.pathname="/"===o.pathname?n:A([n,o.pathname])),(r.replace?i.replace:i.push)(o,r.state,r)}),[n,i,s,a,e]);return u}()}function te(e,n){let{relative:r}=void 0===n?{}:n,{future:i}=t.useContext(K),{matches:o}=t.useContext(G),{pathname:a}=J(),s=JSON.stringify(O(o,i.v7_relativeSplatPath));return t.useMemo((()=>L(e,JSON.parse(s),a,"path"===r)),[e,s,a,r])}function ne(n,r,i,o){X()||c(!1);let{navigator:a,static:s}=t.useContext(K),{matches:l}=t.useContext(G),u=l[l.length-1],d=u?u.params:{},h=(u&&u.pathname,u?u.pathnameBase:"/");u&&u.route;let p,g=J();if(r){var m;let e="string"===typeof r?f(r):r;"/"===h||(null==(m=e.pathname)?void 0:m.startsWith(h))||c(!1),p=e}else p=g;let y=p.pathname||"/",v=y;if("/"!==h){let e=h.replace(/^\//,"").split("/");v="/"+y.replace(/^\//,"").split("/").slice(e.length).join("/")}let x=!s&&i&&i.matches&&i.matches.length>0?i.matches:b(n,{pathname:v});let w=se(x&&x.map((e=>Object.assign({},e,{params:Object.assign({},d,e.params),pathname:A([h,a.encodeLocation?a.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?h:A([h,a.encodeLocation?a.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])}))),l,i,o);return r&&w?t.createElement(Y.Provider,{value:{location:H({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:e.Pop}},w):w}function re(){let e=function(){var e;let n=t.useContext(Q),r=de(ce.UseRouteError),i=he(ce.UseRouteError);if(void 0!==n)return n;return null==(e=r.errors)?void 0:e[i]}(),n=U(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,i="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:i};return t.createElement(t.Fragment,null,t.createElement("h2",null,"Unexpected Application Error!"),t.createElement("h3",{style:{fontStyle:"italic"}},n),r?t.createElement("pre",{style:o},r):null,null)}const ie=t.createElement(re,null);class oe extends t.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return void 0!==this.state.error?t.createElement(G.Provider,{value:this.props.routeContext},t.createElement(Q.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ae(e){let{routeContext:n,match:r,children:i}=e,o=t.useContext(q);return o&&o.static&&o.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=r.route.id),t.createElement(G.Provider,{value:n},i)}function se(e,n,r,i){var o;if(void 0===n&&(n=[]),void 0===r&&(r=null),void 0===i&&(i=null),null==e){var a;if(!r)return null;if(r.errors)e=r.matches;else{if(!(null!=(a=i)&&a.v7_partialHydration&&0===n.length&&!r.initialized&&r.matches.length>0))return null;e=r.matches}}let s=e,l=null==(o=r)?void 0:o.errors;if(null!=l){let e=s.findIndex((e=>e.route.id&&void 0!==(null==l?void 0:l[e.route.id])));e>=0||c(!1),s=s.slice(0,Math.min(s.length,e+1))}let u=!1,d=-1;if(r&&i&&i.v7_partialHydration)for(let t=0;t<s.length;t++){let e=s[t];if((e.route.HydrateFallback||e.route.hydrateFallbackElement)&&(d=t),e.route.id){let{loaderData:t,errors:n}=r,i=e.route.loader&&void 0===t[e.route.id]&&(!n||void 0===n[e.route.id]);if(e.route.lazy||i){u=!0,s=d>=0?s.slice(0,d+1):[s[0]];break}}}return s.reduceRight(((e,i,o)=>{let a,c=!1,h=null,p=null;var f;r&&(a=l&&i.route.id?l[i.route.id]:void 0,h=i.route.errorElement||ie,u&&(d<0&&0===o?(f="route-fallback",!1||pe[f]||(pe[f]=!0),c=!0,p=null):d===o&&(c=!0,p=i.route.hydrateFallbackElement||null)));let g=n.concat(s.slice(0,o+1)),m=()=>{let n;return n=a?h:c?p:i.route.Component?t.createElement(i.route.Component,null):i.route.element?i.route.element:e,t.createElement(ae,{match:i,routeContext:{outlet:e,matches:g,isDataRoute:null!=r},children:n})};return r&&(i.route.ErrorBoundary||i.route.errorElement||0===o)?t.createElement(oe,{location:r.location,revalidation:r.revalidation,component:h,error:a,children:m(),routeContext:{outlet:null,matches:g,isDataRoute:!0}}):m()}),null)}var le=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(le||{}),ce=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(ce||{});function ue(e){let n=t.useContext(q);return n||c(!1),n}function de(e){let n=t.useContext(V);return n||c(!1),n}function he(e){let n=function(){let e=t.useContext(G);return e||c(!1),e}(),r=n.matches[n.matches.length-1];return r.route.id||c(!1),r.route.id}const pe={};function fe(e,t){null==e||e.v7_startTransition,void 0===(null==e?void 0:e.v7_relativeSplatPath)&&(!t||t.v7_relativeSplatPath),t&&(t.v7_fetcherPersist,t.v7_normalizeFormMethod,t.v7_partialHydration,t.v7_skipActionErrorRevalidation)}r.startTransition;function ge(e){let{to:n,replace:r,state:i,relative:o}=e;X()||c(!1);let{future:a,static:s}=t.useContext(K),{matches:l}=t.useContext(G),{pathname:u}=J(),d=ee(),h=L(n,O(l,a.v7_relativeSplatPath),u,"path"===o),p=JSON.stringify(h);return t.useEffect((()=>d(JSON.parse(p),{replace:r,state:i,relative:o})),[d,p,o,r,i]),null}function me(e){c(!1)}function be(n){let{basename:r="/",children:i=null,location:o,navigationType:a=e.Pop,navigator:s,static:l=!1,future:u}=n;X()&&c(!1);let d=r.replace(/^\/*/,"/"),h=t.useMemo((()=>({basename:d,navigator:s,static:l,future:H({v7_relativeSplatPath:!1},u)})),[d,u,s,l]);"string"===typeof o&&(o=f(o));let{pathname:p="/",search:g="",hash:m="",state:b=null,key:y="default"}=o,v=t.useMemo((()=>{let e=R(p,d);return null==e?null:{location:{pathname:e,search:g,hash:m,state:b,key:y},navigationType:a}}),[d,p,g,m,b,y,a]);return null==v?null:t.createElement(K.Provider,{value:h},t.createElement(Y.Provider,{children:i,value:v}))}function ye(e){let{children:t,location:n}=e;return ne(ve(t),n)}new Promise((()=>{}));t.Component;function ve(e,n){void 0===n&&(n=[]);let r=[];return t.Children.forEach(e,((e,i)=>{if(!t.isValidElement(e))return;let o=[...n,i];if(e.type===t.Fragment)return void r.push.apply(r,ve(e.props.children,o));e.type!==me&&c(!1),e.props.index&&e.props.children&&c(!1);let a={id:e.props.id||o.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=ve(e.props.children,o)),r.push(a)})),r}function xe(){return xe=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},xe.apply(this,arguments)}function we(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);const _e=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"];try{window.__reactRouterVersion="6"}catch(ik){}new Map;const ke=r.startTransition;a.flushSync,r.useId;function Ce(e){let{basename:n,children:r,future:i,window:o}=e,a=t.useRef();var s;null==a.current&&(a.current=(void 0===(s={window:o,v5Compat:!0})&&(s={}),g((function(e,t){let{pathname:n,search:r,hash:i}=e.location;return h("",{pathname:n,search:r,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||"default")}),(function(e,t){return"string"===typeof t?t:p(t)}),null,s)));let l=a.current,[c,u]=t.useState({action:l.action,location:l.location}),{v7_startTransition:d}=i||{},f=t.useCallback((e=>{d&&ke?ke((()=>u(e))):u(e)}),[u,d]);return t.useLayoutEffect((()=>l.listen(f)),[l,f]),t.useEffect((()=>fe(i)),[i]),t.createElement(be,{basename:n,children:r,location:c.location,navigationType:c.action,navigator:l,future:i})}const Se="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement,Ee=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Te=t.forwardRef((function(e,n){let r,{onClick:i,relative:o,reloadDocument:a,replace:s,state:l,target:u,to:d,preventScrollReset:h,viewTransition:f}=e,g=we(e,_e),{basename:m}=t.useContext(K),b=!1;if("string"===typeof d&&Ee.test(d)&&(r=d,Se))try{let e=new URL(window.location.href),t=d.startsWith("//")?new URL(e.protocol+d):new URL(d),n=R(t.pathname,m);t.origin===e.origin&&null!=n?d=n+t.search+t.hash:b=!0}catch(ik){}let y=function(e,n){let{relative:r}=void 0===n?{}:n;X()||c(!1);let{basename:i,navigator:o}=t.useContext(K),{hash:a,pathname:s,search:l}=te(e,{relative:r}),u=s;return"/"!==i&&(u="/"===s?i:A([i,s])),o.createHref({pathname:u,search:l,hash:a})}(d,{relative:o}),v=function(e,n){let{target:r,replace:i,state:o,preventScrollReset:a,relative:s,viewTransition:l}=void 0===n?{}:n,c=ee(),u=J(),d=te(e,{relative:s});return t.useCallback((t=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(t,r)){t.preventDefault();let n=void 0!==i?i:p(u)===p(d);c(e,{replace:n,state:o,preventScrollReset:a,relative:s,viewTransition:l})}}),[u,c,d,i,o,r,e,a,s,l])}(d,{replace:s,state:l,target:u,preventScrollReset:h,relative:o,viewTransition:f});return t.createElement("a",xe({},g,{href:r||y,onClick:b||a?i:function(e){i&&i(e),e.defaultPrevented||v(e)},ref:n,target:u}))}));var Ie,Ne;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Ie||(Ie={})),function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"}(Ne||(Ne={}));var je=function(){return je=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},je.apply(this,arguments)};Object.create;function Pe(e,t,n){if(n||2===arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var Re=n(324),De=n.n(Re),Fe="-ms-",Oe="-moz-",Le="-webkit-",Ae="comm",Me="rule",ze="decl",$e="@keyframes",Ue=Math.abs,Be=String.fromCharCode,We=Object.assign;function He(e){return e.trim()}function qe(e,t){return(e=t.exec(e))?e[0]:e}function Ve(e,t,n){return e.replace(t,n)}function Ke(e,t,n){return e.indexOf(t,n)}function Ye(e,t){return 0|e.charCodeAt(t)}function Ge(e,t,n){return e.slice(t,n)}function Qe(e){return e.length}function Xe(e){return e.length}function Je(e,t){return t.push(e),e}function Ze(e,t){return e.filter((function(e){return!qe(e,t)}))}var et=1,tt=1,nt=0,rt=0,it=0,ot="";function at(e,t,n,r,i,o,a,s){return{value:e,root:t,parent:n,type:r,props:i,children:o,line:et,column:tt,length:a,return:"",siblings:s}}function st(e,t){return We(at("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function lt(e){for(;e.root;)e=st(e.root,{children:[e]});Je(e,e.siblings)}function ct(){return it=rt>0?Ye(ot,--rt):0,tt--,10===it&&(tt=1,et--),it}function ut(){return it=rt<nt?Ye(ot,rt++):0,tt++,10===it&&(tt=1,et++),it}function dt(){return Ye(ot,rt)}function ht(){return rt}function pt(e,t){return Ge(ot,e,t)}function ft(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function gt(e){return et=tt=1,nt=Qe(ot=e),rt=0,[]}function mt(e){return ot="",e}function bt(e){return He(pt(rt-1,xt(91===e?e+2:40===e?e+1:e)))}function yt(e){for(;(it=dt())&&it<33;)ut();return ft(e)>2||ft(it)>3?"":" "}function vt(e,t){for(;--t&&ut()&&!(it<48||it>102||it>57&&it<65||it>70&&it<97););return pt(e,ht()+(t<6&&32==dt()&&32==ut()))}function xt(e){for(;ut();)switch(it){case e:return rt;case 34:case 39:34!==e&&39!==e&&xt(it);break;case 40:41===e&&xt(e);break;case 92:ut()}return rt}function wt(e,t){for(;ut()&&e+it!==57&&(e+it!==84||47!==dt()););return"/*"+pt(t,rt-1)+"*"+Be(47===e?e:ut())}function _t(e){for(;!ft(dt());)ut();return pt(e,rt)}function kt(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function Ct(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case ze:return e.return=e.return||e.value;case Ae:return"";case $e:return e.return=e.value+"{"+kt(e.children,r)+"}";case Me:if(!Qe(e.value=e.props.join(",")))return""}return Qe(n=kt(e.children,r))?e.return=e.value+"{"+n+"}":""}function St(e,t,n){switch(function(e,t){return 45^Ye(e,0)?(((t<<2^Ye(e,0))<<2^Ye(e,1))<<2^Ye(e,2))<<2^Ye(e,3):0}(e,t)){case 5103:return Le+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Le+e+e;case 4789:return Oe+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Le+e+Oe+e+Fe+e+e;case 5936:switch(Ye(e,t+11)){case 114:return Le+e+Fe+Ve(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Le+e+Fe+Ve(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Le+e+Fe+Ve(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Le+e+Fe+e+e;case 6165:return Le+e+Fe+"flex-"+e+e;case 5187:return Le+e+Ve(e,/(\w+).+(:[^]+)/,Le+"box-$1$2"+Fe+"flex-$1$2")+e;case 5443:return Le+e+Fe+"flex-item-"+Ve(e,/flex-|-self/g,"")+(qe(e,/flex-|baseline/)?"":Fe+"grid-row-"+Ve(e,/flex-|-self/g,""))+e;case 4675:return Le+e+Fe+"flex-line-pack"+Ve(e,/align-content|flex-|-self/g,"")+e;case 5548:return Le+e+Fe+Ve(e,"shrink","negative")+e;case 5292:return Le+e+Fe+Ve(e,"basis","preferred-size")+e;case 6060:return Le+"box-"+Ve(e,"-grow","")+Le+e+Fe+Ve(e,"grow","positive")+e;case 4554:return Le+Ve(e,/([^-])(transform)/g,"$1"+Le+"$2")+e;case 6187:return Ve(Ve(Ve(e,/(zoom-|grab)/,Le+"$1"),/(image-set)/,Le+"$1"),e,"")+e;case 5495:case 3959:return Ve(e,/(image-set\([^]*)/,Le+"$1$`$1");case 4968:return Ve(Ve(e,/(.+:)(flex-)?(.*)/,Le+"box-pack:$3"+Fe+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Le+e+e;case 4200:if(!qe(e,/flex-|baseline/))return Fe+"grid-column-align"+Ge(e,t)+e;break;case 2592:case 3360:return Fe+Ve(e,"template-","")+e;case 4384:case 3616:return n&&n.some((function(e,n){return t=n,qe(e.props,/grid-\w+-end/)}))?~Ke(e+(n=n[t].value),"span",0)?e:Fe+Ve(e,"-start","")+e+Fe+"grid-row-span:"+(~Ke(n,"span",0)?qe(n,/\d+/):+qe(n,/\d+/)-+qe(e,/\d+/))+";":Fe+Ve(e,"-start","")+e;case 4896:case 4128:return n&&n.some((function(e){return qe(e.props,/grid-\w+-start/)}))?e:Fe+Ve(Ve(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Ve(e,/(.+)-inline(.+)/,Le+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Qe(e)-1-t>6)switch(Ye(e,t+1)){case 109:if(45!==Ye(e,t+4))break;case 102:return Ve(e,/(.+:)(.+)-([^]+)/,"$1"+Le+"$2-$3$1"+Oe+(108==Ye(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Ke(e,"stretch",0)?St(Ve(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return Ve(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,(function(t,n,r,i,o,a,s){return Fe+n+":"+r+s+(i?Fe+n+"-span:"+(o?a:+a-+r)+s:"")+e}));case 4949:if(121===Ye(e,t+6))return Ve(e,":",":"+Le)+e;break;case 6444:switch(Ye(e,45===Ye(e,14)?18:11)){case 120:return Ve(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Le+(45===Ye(e,14)?"inline-":"")+"box$3$1"+Le+"$2$3$1"+Fe+"$2box$3")+e;case 100:return Ve(e,":",":"+Fe)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Ve(e,"scroll-","scroll-snap-")+e}return e}function Et(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case ze:return void(e.return=St(e.value,e.length,n));case $e:return kt([st(e,{value:Ve(e.value,"@","@"+Le)})],r);case Me:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,(function(t){switch(qe(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":lt(st(e,{props:[Ve(t,/:(read-\w+)/,":-moz-$1")]})),lt(st(e,{props:[t]})),We(e,{props:Ze(n,r)});break;case"::placeholder":lt(st(e,{props:[Ve(t,/:(plac\w+)/,":"+Le+"input-$1")]})),lt(st(e,{props:[Ve(t,/:(plac\w+)/,":-moz-$1")]})),lt(st(e,{props:[Ve(t,/:(plac\w+)/,Fe+"input-$1")]})),lt(st(e,{props:[t]})),We(e,{props:Ze(n,r)})}return""}))}}function Tt(e){return mt(It("",null,null,null,[""],e=gt(e),0,[0],e))}function It(e,t,n,r,i,o,a,s,l){for(var c=0,u=0,d=a,h=0,p=0,f=0,g=1,m=1,b=1,y=0,v="",x=i,w=o,_=r,k=v;m;)switch(f=y,y=ut()){case 40:if(108!=f&&58==Ye(k,d-1)){-1!=Ke(k+=Ve(bt(y),"&","&\f"),"&\f",Ue(c?s[c-1]:0))&&(b=-1);break}case 34:case 39:case 91:k+=bt(y);break;case 9:case 10:case 13:case 32:k+=yt(f);break;case 92:k+=vt(ht()-1,7);continue;case 47:switch(dt()){case 42:case 47:Je(jt(wt(ut(),ht()),t,n,l),l);break;default:k+="/"}break;case 123*g:s[c++]=Qe(k)*b;case 125*g:case 59:case 0:switch(y){case 0:case 125:m=0;case 59+u:-1==b&&(k=Ve(k,/\f/g,"")),p>0&&Qe(k)-d&&Je(p>32?Pt(k+";",r,n,d-1,l):Pt(Ve(k," ","")+";",r,n,d-2,l),l);break;case 59:k+=";";default:if(Je(_=Nt(k,t,n,c,u,i,s,v,x=[],w=[],d,o),o),123===y)if(0===u)It(k,t,_,_,x,o,d,s,w);else switch(99===h&&110===Ye(k,3)?100:h){case 100:case 108:case 109:case 115:It(e,_,_,r&&Je(Nt(e,_,_,0,0,i,s,v,i,x=[],d,w),w),i,w,d,s,r?x:w);break;default:It(k,_,_,_,[""],w,0,s,w)}}c=u=p=0,g=b=1,v=k="",d=a;break;case 58:d=1+Qe(k),p=f;default:if(g<1)if(123==y)--g;else if(125==y&&0==g++&&125==ct())continue;switch(k+=Be(y),y*g){case 38:b=u>0?1:(k+="\f",-1);break;case 44:s[c++]=(Qe(k)-1)*b,b=1;break;case 64:45===dt()&&(k+=bt(ut())),h=dt(),u=d=Qe(v=k+=_t(ht())),y++;break;case 45:45===f&&2==Qe(k)&&(g=0)}}return o}function Nt(e,t,n,r,i,o,a,s,l,c,u,d){for(var h=i-1,p=0===i?o:[""],f=Xe(p),g=0,m=0,b=0;g<r;++g)for(var y=0,v=Ge(e,h+1,h=Ue(m=a[g])),x=e;y<f;++y)(x=He(m>0?p[y]+" "+v:Ve(v,/&\f/g,p[y])))&&(l[b++]=x);return at(e,t,n,0===i?Me:s,l,c,u,d)}function jt(e,t,n,r){return at(e,t,n,Ae,Be(it),Ge(e,2,-2),0,r)}function Pt(e,t,n,r,i){return at(e,t,n,ze,Ge(e,0,r),Ge(e,r+1,-1),r,i)}var Rt={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Dt="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}&&({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.SC_ATTR)||"data-styled",Ft="active",Ot="data-styled-version",Lt="6.1.17",At="/*!sc*/\n",Mt="undefined"!=typeof window&&"HTMLElement"in window,zt=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY)),$t={},Ut=(new Set,Object.freeze([])),Bt=Object.freeze({});function Wt(e,t,n){return void 0===n&&(n=Bt),e.theme!==n.theme&&e.theme||t||n.theme}var Ht=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),qt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Vt=/(^-|-$)/g;function Kt(e){return e.replace(qt,"-").replace(Vt,"")}var Yt=/(a)(d)/gi,Gt=function(e){return String.fromCharCode(e+(e>25?39:97))};function Qt(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Gt(t%52)+n;return(Gt(t%52)+n).replace(Yt,"$1-$2")}var Xt,Jt=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Zt=function(e){return Jt(5381,e)};function en(e){return Qt(Zt(e)>>>0)}function tn(e){return e.displayName||e.name||"Component"}function nn(e){return"string"==typeof e&&!0}var rn="function"==typeof Symbol&&Symbol.for,on=rn?Symbol.for("react.memo"):60115,an=rn?Symbol.for("react.forward_ref"):60112,sn={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},ln={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},cn={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},un=((Xt={})[an]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Xt[on]=cn,Xt);function dn(e){return("type"in(t=e)&&t.type.$$typeof)===on?cn:"$$typeof"in e?un[e.$$typeof]:sn;var t}var hn=Object.defineProperty,pn=Object.getOwnPropertyNames,fn=Object.getOwnPropertySymbols,gn=Object.getOwnPropertyDescriptor,mn=Object.getPrototypeOf,bn=Object.prototype;function yn(e,t,n){if("string"!=typeof t){if(bn){var r=mn(t);r&&r!==bn&&yn(e,r,n)}var i=pn(t);fn&&(i=i.concat(fn(t)));for(var o=dn(e),a=dn(t),s=0;s<i.length;++s){var l=i[s];if(!(l in ln||n&&n[l]||a&&l in a||o&&l in o)){var c=gn(t,l);try{hn(e,l,c)}catch(e){}}}}return e}function vn(e){return"function"==typeof e}function xn(e){return"object"==typeof e&&"styledComponentId"in e}function wn(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function _n(e,t){if(0===e.length)return"";for(var n=e[0],r=1;r<e.length;r++)n+=t?t+e[r]:e[r];return n}function kn(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Cn(e,t,n){if(void 0===n&&(n=!1),!n&&!kn(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Cn(e[r],t[r]);else if(kn(t))for(var r in t)e[r]=Cn(e[r],t[r]);return e}function Sn(e,t){Object.defineProperty(e,"toString",{value:t})}function En(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Tn=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,i=r;e>=i;)if((i<<=1)<0)throw En(16,"".concat(e));this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var o=r;o<i;o++)this.groupSizes[o]=0}for(var a=this.indexOfGroup(e+1),s=(o=0,t.length);o<s;o++)this.tag.insertRule(a,t[o])&&(this.groupSizes[e]++,a++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var i=n;i<r;i++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n,o=r;o<i;o++)t+="".concat(this.tag.getRule(o)).concat(At);return t},e}(),In=new Map,Nn=new Map,jn=1,Pn=function(e){if(In.has(e))return In.get(e);for(;Nn.has(jn);)jn++;var t=jn++;return In.set(e,t),Nn.set(t,e),t},Rn=function(e,t){jn=t+1,In.set(e,t),Nn.set(t,e)},Dn="style[".concat(Dt,"][").concat(Ot,'="').concat(Lt,'"]'),Fn=new RegExp("^".concat(Dt,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),On=function(e,t,n){for(var r,i=n.split(","),o=0,a=i.length;o<a;o++)(r=i[o])&&e.registerName(t,r)},Ln=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(At),i=[],o=0,a=r.length;o<a;o++){var s=r[o].trim();if(s){var l=s.match(Fn);if(l){var c=0|parseInt(l[1],10),u=l[2];0!==c&&(Rn(u,c),On(e,u,l[3]),e.getTag().insertRules(c,i)),i.length=0}else i.push(s)}}},An=function(e){for(var t=document.querySelectorAll(Dn),n=0,r=t.length;n<r;n++){var i=t[n];i&&i.getAttribute(Dt)!==Ft&&(Ln(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function Mn(){return n.nc}var zn=function(e){var t=document.head,n=e||t,r=document.createElement("style"),i=function(e){var t=Array.from(e.querySelectorAll("style[".concat(Dt,"]")));return t[t.length-1]}(n),o=void 0!==i?i.nextSibling:null;r.setAttribute(Dt,Ft),r.setAttribute(Ot,Lt);var a=Mn();return a&&r.setAttribute("nonce",a),n.insertBefore(r,o),r},$n=function(){function e(e){this.element=zn(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var i=t[n];if(i.ownerNode===e)return i}throw En(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Un=function(){function e(e){this.element=zn(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Bn=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Wn=Mt,Hn={isServer:!Mt,useCSSOMInjection:!zt},qn=function(){function e(e,t,n){void 0===e&&(e=Bt),void 0===t&&(t={});var r=this;this.options=je(je({},Hn),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Mt&&Wn&&(Wn=!1,An(this)),Sn(this,(function(){return function(e){for(var t=e.getTag(),n=t.length,r="",i=function(n){var i=function(e){return Nn.get(e)}(n);if(void 0===i)return"continue";var o=e.names.get(i),a=t.getGroup(n);if(void 0===o||!o.size||0===a.length)return"continue";var s="".concat(Dt,".g").concat(n,'[id="').concat(i,'"]'),l="";void 0!==o&&o.forEach((function(e){e.length>0&&(l+="".concat(e,","))})),r+="".concat(a).concat(s,'{content:"').concat(l,'"}').concat(At)},o=0;o<n;o++)i(o);return r}(r)}))}return e.registerId=function(e){return Pn(e)},e.prototype.rehydrate=function(){!this.server&&Mt&&An(this)},e.prototype.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(je(je({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Bn(n):t?new $n(n):new Un(n)}(this.options),new Tn(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(Pn(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Pn(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Pn(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Vn=/&/g,Kn=/^\s*\/\/.*$/gm;function Yn(e,t){return e.map((function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map((function(e){return"".concat(t," ").concat(e)}))),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=Yn(e.children,t)),e}))}function Gn(e){var t,n,r,i=void 0===e?Bt:e,o=i.options,a=void 0===o?Bt:o,s=i.plugins,l=void 0===s?Ut:s,c=function(e,r,i){return i.startsWith(n)&&i.endsWith(n)&&i.replaceAll(n,"").length>0?".".concat(t):e},u=l.slice();u.push((function(e){e.type===Me&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(Vn,n).replace(r,c))})),a.prefix&&u.push(Et),u.push(Ct);var d=function(e,i,o,s){void 0===i&&(i=""),void 0===o&&(o=""),void 0===s&&(s="&"),t=s,n=i,r=new RegExp("\\".concat(n,"\\b"),"g");var l=e.replace(Kn,""),c=Tt(o||i?"".concat(o," ").concat(i," { ").concat(l," }"):l);a.namespace&&(c=Yn(c,a.namespace));var d,h=[];return kt(c,function(e){var t=Xe(e);return function(n,r,i,o){for(var a="",s=0;s<t;s++)a+=e[s](n,r,i,o)||"";return a}}(u.concat((d=function(e){return h.push(e)},function(e){e.root||(e=e.return)&&d(e)})))),h};return d.hash=l.length?l.reduce((function(e,t){return t.name||En(15),Jt(e,t.name)}),5381).toString():"",d}var Qn=new qn,Xn=Gn(),Jn=t.createContext({shouldForwardProp:void 0,styleSheet:Qn,stylis:Xn}),Zn=(Jn.Consumer,t.createContext(void 0));function er(){return(0,t.useContext)(Jn)}function tr(e){var n=(0,t.useState)(e.stylisPlugins),r=n[0],i=n[1],o=er().styleSheet,a=(0,t.useMemo)((function(){var t=o;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t}),[e.disableCSSOMInjection,e.sheet,e.target,o]),s=(0,t.useMemo)((function(){return Gn({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:r})}),[e.enableVendorPrefixes,e.namespace,r]);(0,t.useEffect)((function(){De()(r,e.stylisPlugins)||i(e.stylisPlugins)}),[e.stylisPlugins]);var l=(0,t.useMemo)((function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:a,stylis:s}}),[e.shouldForwardProp,a,s]);return t.createElement(Jn.Provider,{value:l},t.createElement(Zn.Provider,{value:s},e.children))}var nr=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=Xn);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Sn(this,(function(){throw En(12,String(n.name))}))}return e.prototype.getName=function(e){return void 0===e&&(e=Xn),this.name+e.hash},e}(),rr=function(e){return e>="A"&&e<="Z"};function ir(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;rr(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var or=function(e){return null==e||!1===e||""===e},ar=function(e){var t,n,r=[];for(var i in e){var o=e[i];e.hasOwnProperty(i)&&!or(o)&&(Array.isArray(o)&&o.isCss||vn(o)?r.push("".concat(ir(i),":"),o,";"):kn(o)?r.push.apply(r,Pe(Pe(["".concat(i," {")],ar(o),!1),["}"],!1)):r.push("".concat(ir(i),": ").concat((t=i,null==(n=o)||"boolean"==typeof n||""===n?"":"number"!=typeof n||0===n||t in Rt||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function sr(e,t,n,r){return or(e)?[]:xn(e)?[".".concat(e.styledComponentId)]:vn(e)?!vn(i=e)||i.prototype&&i.prototype.isReactComponent||!t?[e]:sr(e(t),t,n,r):e instanceof nr?n?(e.inject(n,r),[e.getName(r)]):[e]:kn(e)?ar(e):Array.isArray(e)?Array.prototype.concat.apply(Ut,e.map((function(e){return sr(e,t,n,r)}))):[e.toString()];var i}function lr(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(vn(n)&&!xn(n))return!1}return!0}var cr=Zt(Lt),ur=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&lr(e),this.componentId=t,this.baseHash=Jt(cr,t),this.baseStyle=n,qn.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=wn(r,this.staticRulesId);else{var i=_n(sr(this.rules,e,t,n)),o=Qt(Jt(this.baseHash,i)>>>0);if(!t.hasNameForId(this.componentId,o)){var a=n(i,".".concat(o),void 0,this.componentId);t.insertRules(this.componentId,o,a)}r=wn(r,o),this.staticRulesId=o}else{for(var s=Jt(this.baseHash,n.hash),l="",c=0;c<this.rules.length;c++){var u=this.rules[c];if("string"==typeof u)l+=u;else if(u){var d=_n(sr(u,e,t,n));s=Jt(s,d+c),l+=d}}if(l){var h=Qt(s>>>0);t.hasNameForId(this.componentId,h)||t.insertRules(this.componentId,h,n(l,".".concat(h),void 0,this.componentId)),r=wn(r,h)}}return r},e}(),dr=t.createContext(void 0);dr.Consumer;var hr={};new Set;function pr(e,n,r){var i=xn(e),o=e,a=!nn(e),s=n.attrs,l=void 0===s?Ut:s,c=n.componentId,u=void 0===c?function(e,t){var n="string"!=typeof e?"sc":Kt(e);hr[n]=(hr[n]||0)+1;var r="".concat(n,"-").concat(en(Lt+n+hr[n]));return t?"".concat(t,"-").concat(r):r}(n.displayName,n.parentComponentId):c,d=n.displayName,h=void 0===d?function(e){return nn(e)?"styled.".concat(e):"Styled(".concat(tn(e),")")}(e):d,p=n.displayName&&n.componentId?"".concat(Kt(n.displayName),"-").concat(n.componentId):n.componentId||u,f=i&&o.attrs?o.attrs.concat(l).filter(Boolean):l,g=n.shouldForwardProp;if(i&&o.shouldForwardProp){var m=o.shouldForwardProp;if(n.shouldForwardProp){var b=n.shouldForwardProp;g=function(e,t){return m(e,t)&&b(e,t)}}else g=m}var y=new ur(r,p,i?o.componentStyle:void 0);function v(e,n){return function(e,n,r){var i=e.attrs,o=e.componentStyle,a=e.defaultProps,s=e.foldedComponentIds,l=e.styledComponentId,c=e.target,u=t.useContext(dr),d=er(),h=e.shouldForwardProp||d.shouldForwardProp,p=Wt(n,u,a)||Bt,f=function(e,t,n){for(var r,i=je(je({},t),{className:void 0,theme:n}),o=0;o<e.length;o+=1){var a=vn(r=e[o])?r(i):r;for(var s in a)i[s]="className"===s?wn(i[s],a[s]):"style"===s?je(je({},i[s]),a[s]):a[s]}return t.className&&(i.className=wn(i.className,t.className)),i}(i,n,p),g=f.as||c,m={};for(var b in f)void 0===f[b]||"$"===b[0]||"as"===b||"theme"===b&&f.theme===p||("forwardedAs"===b?m.as=f.forwardedAs:h&&!h(b,g)||(m[b]=f[b]));var y=function(e,t){var n=er();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(o,f),v=wn(s,l);return y&&(v+=" "+y),f.className&&(v+=" "+f.className),m[nn(g)&&!Ht.has(g)?"class":"className"]=v,r&&(m.ref=r),(0,t.createElement)(g,m)}(x,e,n)}v.displayName=h;var x=t.forwardRef(v);return x.attrs=f,x.componentStyle=y,x.displayName=h,x.shouldForwardProp=g,x.foldedComponentIds=i?wn(o.foldedComponentIds,o.styledComponentId):"",x.styledComponentId=p,x.target=i?o.target:e,Object.defineProperty(x,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,i=t;r<i.length;r++)Cn(e,i[r],!0);return e}({},o.defaultProps,e):e}}),Sn(x,(function(){return".".concat(x.styledComponentId)})),a&&yn(x,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),x}function fr(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var gr=function(e){return Object.assign(e,{isCss:!0})};function mr(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(vn(e)||kn(e))return gr(sr(fr(Ut,Pe([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?sr(r):gr(sr(fr(r,t)))}function br(e,t,n){if(void 0===n&&(n=Bt),!t)throw En(1,t);var r=function(r){for(var i=[],o=1;o<arguments.length;o++)i[o-1]=arguments[o];return e(t,n,mr.apply(void 0,Pe([r],i,!1)))};return r.attrs=function(r){return br(e,t,je(je({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return br(e,t,je(je({},n),r))},r}var yr=function(e){return br(pr,e)},vr=yr;Ht.forEach((function(e){vr[e]=yr(e)}));var xr=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=lr(e),qn.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var i=r(_n(sr(this.rules,t,n,r)),""),o=this.componentId+e;n.insertRules(o,o,i)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&qn.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function wr(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=_n(mr.apply(void 0,Pe([e],t,!1))),i=en(r);return new nr(i,r)}(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=Mn(),r=_n([n&&'nonce="'.concat(n,'"'),"".concat(Dt,'="true"'),"".concat(Ot,'="').concat(Lt,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw En(2);return e._emitSheetCSS()},this.getStyleElement=function(){var n;if(e.sealed)throw En(2);var r=e.instance.toString();if(!r)return[];var i=((n={})[Dt]="",n[Ot]=Lt,n.dangerouslySetInnerHTML={__html:r},n),o=Mn();return o&&(i.nonce=o),[t.createElement("style",je({},i,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new qn({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw En(2);return t.createElement(tr,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw En(3)}})(),"__sc-".concat(Dt,"__");var _r=n(579);const kr=vr.footer`
  position: relative;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  margin-top: auto;
  font-family: 'Inter', sans-serif;
`,Cr=vr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,Sr=vr.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 5px 0;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`,Er=vr.p`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`,Tr=()=>{const e=new Date,t=e.getFullYear(),n=`${e.getMonth()+1}/${e.getDate()}/${t}`;return(0,_r.jsx)(kr,{children:(0,_r.jsxs)(Cr,{children:[(0,_r.jsxs)(Sr,{children:["Presented by Scrambled Legs\u2122 ",t," \u2022 ",n]}),(0,_r.jsxs)(Er,{children:["version ","0.3.0"]})]})})},Ir=!1,Nr=!1,jr="${JSCORE_VERSION}",Pr=function(e,t){if(!e)throw Rr(t)},Rr=function(e){return new Error("Firebase Database ("+jr+") INTERNAL ASSERT FAILED: "+e)},Dr=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296===(64512&i)&&r+1<e.length&&56320===(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},Fr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],o=i+1<e.length,a=o?e[i+1]:0,s=i+2<e.length,l=s?e[i+2]:0,c=t>>2,u=(3&t)<<4|a>>4;let d=(15&a)<<2|l>>6,h=63&l;s||(h=64,o||(d=64)),r.push(n[c],n[u],n[d],n[h])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Dr(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){const o=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(o>>10)),t[r++]=String.fromCharCode(56320+(1023&o))}else{const o=e[n++],a=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&a)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],o=i<e.length?n[e.charAt(i)]:0;++i;const a=i<e.length?n[e.charAt(i)]:64;++i;const s=i<e.length?n[e.charAt(i)]:64;if(++i,null==t||null==o||null==a||null==s)throw new Or;const l=t<<2|o>>4;if(r.push(l),64!==a){const e=o<<4&240|a>>2;if(r.push(e),64!==s){const e=a<<6&192|s;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class Or extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Lr=function(e){const t=Dr(e);return Fr.encodeByteArray(t,!0)},Ar=function(e){return Lr(e).replace(/\./g,"")},Mr=function(e){try{return Fr.decodeString(e,!0)}catch(ik){console.error("base64Decode failed: ",ik)}return null};function zr(e){return $r(void 0,e)}function $r(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&"__proto__"!==n&&(e[n]=$r(e[n],t[n]));return e}const Ur=()=>function(){if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof n.g)return n.g;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,Br=()=>{try{return Ur()||(()=>{if("undefined"===typeof process)return;const e={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"===typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(ik){return}const t=e&&Mr(e[1]);return t&&JSON.parse(t)})()}catch(ik){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${ik}`)}},Wr=e=>{const t=(e=>{var t,n;return null===(n=null===(t=Br())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]})(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},Hr=()=>{var e;return null===(e=Br())||void 0===e?void 0:e.config};class qr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"===typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}function Vr(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[Ar(JSON.stringify({alg:"none",type:"JWT"})),Ar(JSON.stringify(o)),""].join(".")}function Kr(){return"undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:""}function Yr(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Kr())}function Gr(){return!0===Ir||!0===Nr}function Qr(){try{return"object"===typeof indexedDB}catch(ik){return!1}}function Xr(){return new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(Ps){t(Ps)}}))}class Jr extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,Jr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Zr.prototype.create)}}class Zr{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e){const t=(arguments.length<=1?void 0:arguments[1])||{},n=`${this.service}/${e}`,r=this.errors[e],i=r?function(e,t){return e.replace(ei,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(r,t):"Error",o=`${this.serviceName}: ${i} (${n}).`;return new Jr(n,o,t)}}const ei=/\{\$([^}]+)}/g;function ti(e){return JSON.parse(e)}function ni(e){return JSON.stringify(e)}const ri=function(e){let t={},n={},r={},i="";try{const o=e.split(".");t=ti(Mr(o[0])||""),n=ti(Mr(o[1])||""),i=o[2],r=n.d||{},delete n.d}catch(ik){}return{header:t,claims:n,data:r,signature:i}};function ii(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function oi(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function ai(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function si(e,t,n){const r={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}function li(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],o=t[i];if(ci(n)&&ci(o)){if(!li(n,o))return!1}else if(n!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function ci(e){return null!==e&&"object"===typeof e}class ui{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if("string"===typeof e)for(let u=0;u<16;u++)n[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)n[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const e=n[u-3]^n[u-8]^n[u-14]^n[u-16];n[u]=4294967295&(e<<1|e>>>31)}let r,i,o=this.chain_[0],a=this.chain_[1],s=this.chain_[2],l=this.chain_[3],c=this.chain_[4];for(let u=0;u<80;u++){u<40?u<20?(r=l^a&(s^l),i=1518500249):(r=a^s^l,i=1859775393):u<60?(r=a&s|l&(a|s),i=2400959708):(r=a^s^l,i=3395469782);const e=(o<<5|o>>>27)+r+c+i+n[u]&4294967295;c=l,l=s,s=4294967295&(a<<30|a>>>2),a=o,o=e}this.chain_[0]=this.chain_[0]+o&4294967295,this.chain_[1]=this.chain_[1]+a&4294967295,this.chain_[2]=this.chain_[2]+s&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);const n=t-this.blockSize;let r=0;const i=this.buf_;let o=this.inbuf_;for(;r<t;){if(0===o)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if("string"===typeof e){for(;r<t;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<t;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let r=0;r<5;r++)for(let t=24;t>=0;t-=8)e[n]=this.chain_[r]>>t&255,++n;return e}}function di(e,t){return`${e} failed: ${t} argument `}const hi=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};function pi(e){return e&&e._delegate?e._delegate:e}class fi{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const gi="[DEFAULT]";class mi{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new qr;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(ik){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null===e||void 0===e?void 0:e.identifier),r=null!==(t=null===e||void 0===e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(ik){if(r)return null;throw ik}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}(e))try{this.getOrInitializeService({instanceIdentifier:gi})}catch(ik){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(ik){}}}}clearInstance(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:gi;this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:gi;return this.instances.has(e)}getOptions(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:gi;return this.instancesOptions.get(e)||{}}initialize(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(i)&&o.resolve(r)}return r}onInit(e,t){var n;const r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch(r){}}getOrInitializeService(e){let{instanceIdentifier:t,options:n={}}=e,r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:bi(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch(i){}return r||null}normalizeInstanceIdentifier(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:gi;return this.component?this.component.multipleInstances?e:gi:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}function bi(e){return e===gi?void 0:e}class yi{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new mi(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}const vi=[];var xi;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(xi||(xi={}));const wi={debug:xi.DEBUG,verbose:xi.VERBOSE,info:xi.INFO,warn:xi.WARN,error:xi.ERROR,silent:xi.SILENT},_i=xi.INFO,ki={[xi.DEBUG]:"log",[xi.VERBOSE]:"log",[xi.INFO]:"info",[xi.WARN]:"warn",[xi.ERROR]:"error"},Ci=function(e,t){if(t<e.logLevel)return;const n=(new Date).toISOString(),r=ki[t];if(!r)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);for(var i=arguments.length,o=new Array(i>2?i-2:0),a=2;a<i;a++)o[a-2]=arguments[a];console[r](`[${n}]  ${e.name}:`,...o)};class Si{constructor(e){this.name=e,this._logLevel=_i,this._logHandler=Ci,this._userLogHandler=null,vi.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in xi))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"===typeof e?wi[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!==typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,xi.DEBUG,...t),this._logHandler(this,xi.DEBUG,...t)}log(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,xi.VERBOSE,...t),this._logHandler(this,xi.VERBOSE,...t)}info(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,xi.INFO,...t),this._logHandler(this,xi.INFO,...t)}warn(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,xi.WARN,...t),this._logHandler(this,xi.WARN,...t)}error(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,xi.ERROR,...t),this._logHandler(this,xi.ERROR,...t)}}let Ei,Ti;const Ii=new WeakMap,Ni=new WeakMap,ji=new WeakMap,Pi=new WeakMap,Ri=new WeakMap;let Di={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return Ni.get(e);if("objectStoreNames"===t)return e.objectStoreNames||ji.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Li(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Fi(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(Ti||(Ti=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return e.apply(Ai(this),n),Li(Ii.get(this))}:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Li(e.apply(Ai(this),n))}:function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];const o=e.call(Ai(this),t,...r);return ji.set(o,t.sort?t.sort():[t]),Li(o)}}function Oi(e){return"function"===typeof e?Fi(e):(e instanceof IDBTransaction&&function(e){if(Ni.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",o),e.removeEventListener("abort",o)},i=()=>{t(),r()},o=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",o),e.addEventListener("abort",o)}));Ni.set(e,t)}(e),t=e,(Ei||(Ei=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,Di):e);var t}function Li(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",o)},i=()=>{t(Li(e.result)),r()},o=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",o)}));return t.then((t=>{t instanceof IDBCursor&&Ii.set(t,e)})).catch((()=>{})),Ri.set(t,e),t}(e);if(Pi.has(e))return Pi.get(e);const t=Oi(e);return t!==e&&(Pi.set(e,t),Ri.set(t,e)),t}const Ai=e=>Ri.get(e);function Mi(e,t){let{blocked:n,upgrade:r,blocking:i,terminated:o}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const a=indexedDB.open(e,t),s=Li(a);return r&&a.addEventListener("upgradeneeded",(e=>{r(Li(a.result),e.oldVersion,e.newVersion,Li(a.transaction),e)})),n&&a.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),s.then((e=>{o&&e.addEventListener("close",(()=>o())),i&&e.addEventListener("versionchange",(e=>i(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),s}function zi(e){let{blocked:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",(e=>t(e.oldVersion,e))),Li(n).then((()=>{}))}const $i=["get","getKey","getAll","getAllKeys","count"],Ui=["put","add","delete","clear"],Bi=new Map;function Wi(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(Bi.get(t))return Bi.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=Ui.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!$i.includes(n))return;const o=async function(e){const t=this.transaction(e,i?"readwrite":"readonly");let o=t.store;for(var a=arguments.length,s=new Array(a>1?a-1:0),l=1;l<a;l++)s[l-1]=arguments[l];return r&&(o=o.index(s.shift())),(await Promise.all([o[n](...s),i&&t.done]))[0]};return Bi.set(t,o),o}Di=(e=>({...e,get:(t,n,r)=>Wi(t,n)||e.get(t,n,r),has:(t,n)=>!!Wi(t,n)||e.has(t,n)}))(Di);class Hi{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null===t||void 0===t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const qi="@firebase/app",Vi="0.10.13",Ki=new Si("@firebase/app"),Yi="@firebase/app-compat",Gi="@firebase/analytics-compat",Qi="@firebase/analytics",Xi="@firebase/app-check-compat",Ji="@firebase/app-check",Zi="@firebase/auth",eo="@firebase/auth-compat",to="@firebase/database",no="@firebase/data-connect",ro="@firebase/database-compat",io="@firebase/functions",oo="@firebase/functions-compat",ao="@firebase/installations",so="@firebase/installations-compat",lo="@firebase/messaging",co="@firebase/messaging-compat",uo="@firebase/performance",ho="@firebase/performance-compat",po="@firebase/remote-config",fo="@firebase/remote-config-compat",go="@firebase/storage",mo="@firebase/storage-compat",bo="@firebase/firestore",yo="@firebase/vertexai-preview",vo="@firebase/firestore-compat",xo="firebase",wo="[DEFAULT]",_o={[qi]:"fire-core",[Yi]:"fire-core-compat",[Qi]:"fire-analytics",[Gi]:"fire-analytics-compat",[Ji]:"fire-app-check",[Xi]:"fire-app-check-compat",[Zi]:"fire-auth",[eo]:"fire-auth-compat",[to]:"fire-rtdb",[no]:"fire-data-connect",[ro]:"fire-rtdb-compat",[io]:"fire-fn",[oo]:"fire-fn-compat",[ao]:"fire-iid",[so]:"fire-iid-compat",[lo]:"fire-fcm",[co]:"fire-fcm-compat",[uo]:"fire-perf",[ho]:"fire-perf-compat",[po]:"fire-rc",[fo]:"fire-rc-compat",[go]:"fire-gcs",[mo]:"fire-gcs-compat",[bo]:"fire-fst",[vo]:"fire-fst-compat",[yo]:"fire-vertex","fire-js":"fire-js",[xo]:"fire-js-all"},ko=new Map,Co=new Map,So=new Map;function Eo(e,t){try{e.container.addComponent(t)}catch(ik){Ki.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,ik)}}function To(e){const t=e.name;if(So.has(t))return Ki.debug(`There were multiple attempts to register component ${t}.`),!1;So.set(t,e);for(const n of ko.values())Eo(n,e);for(const n of Co.values())Eo(n,e);return!0}function Io(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}const No=new Zr("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});class jo{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new fi("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw No.create("app-deleted",{appName:this._name})}}const Po="10.14.1";function Ro(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e;if("object"!==typeof t){t={name:t}}const r=Object.assign({name:wo,automaticDataCollectionEnabled:!1},t),i=r.name;if("string"!==typeof i||!i)throw No.create("bad-app-name",{appName:String(i)});if(n||(n=Hr()),!n)throw No.create("no-options");const o=ko.get(i);if(o){if(li(n,o.options)&&li(r,o.config))return o;throw No.create("duplicate-app",{appName:i})}const a=new yi(i);for(const l of So.values())a.addComponent(l);const s=new jo(n,r,a);return ko.set(i,s),s}function Do(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:wo;const t=ko.get(e);if(!t&&e===wo&&Hr())return Ro();if(!t)throw No.create("no-app",{appName:e});return t}function Fo(e,t,n){var r;let i=null!==(r=_o[e])&&void 0!==r?r:e;n&&(i+=`-${n}`);const o=i.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const e=[`Unable to register library "${i}" with version "${t}":`];return o&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&e.push("and"),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void Ki.warn(e.join(" "))}To(new fi(`${i}-version`,(()=>({library:i,version:t})),"VERSION"))}const Oo="firebase-heartbeat-store";let Lo=null;function Ao(){return Lo||(Lo=Mi("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(Oo)}catch(ik){console.warn(ik)}}}).catch((e=>{throw No.create("idb-open",{originalErrorMessage:e.message})}))),Lo}async function Mo(e,t){try{const n=(await Ao()).transaction(Oo,"readwrite"),r=n.objectStore(Oo);await r.put(t,zo(e)),await n.done}catch(ik){if(ik instanceof Jr)Ki.warn(ik.message);else{const t=No.create("idb-set",{originalErrorMessage:null===ik||void 0===ik?void 0:ik.message});Ki.warn(t.message)}}}function zo(e){return`${e.name}!${e.options.appId}`}class $o{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Bo(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Uo();if(null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some((e=>e.date===r)))return;return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}catch(ik){Ki.warn(ik)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=Uo(),{heartbeatsToSend:n,unsentEntries:r}=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1024;const n=[];let r=e.slice();for(const i of e){const e=n.find((e=>e.agent===i.agent));if(e){if(e.dates.push(i.date),Wo(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Wo(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=Ar(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(ik){return Ki.warn(ik),""}}}function Uo(){return(new Date).toISOString().substring(0,10)}class Bo{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!Qr()&&Xr().then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await Ao()).transaction(Oo),n=await t.objectStore(Oo).get(zo(e));return await t.done,n}catch(ik){if(ik instanceof Jr)Ki.warn(ik.message);else{const t=No.create("idb-get",{originalErrorMessage:null===ik||void 0===ik?void 0:ik.message});Ki.warn(t.message)}}}(this.app);return(null===e||void 0===e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return Mo(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return Mo(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function Wo(e){return Ar(JSON.stringify({version:2,heartbeats:e})).length}var Ho;Ho="",To(new fi("platform-logger",(e=>new Hi(e)),"PRIVATE")),To(new fi("heartbeat",(e=>new $o(e)),"PRIVATE")),Fo(qi,Vi,Ho),Fo(qi,Vi,"esm2017"),Fo("fire-js","");const qo="@firebase/installations",Vo="0.6.9",Ko=1e4,Yo=`w:${Vo}`,Go="FIS_v2",Qo=36e5,Xo=new Zr("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function Jo(e){return e instanceof Jr&&e.code.includes("request-failed")}function Zo(e){let{projectId:t}=e;return`https://firebaseinstallations.googleapis.com/v1/projects/${t}/installations`}function ea(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function ta(e,t){const n=(await t.json()).error;return Xo.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function na(e){let{apiKey:t}=e;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function ra(e,t){let{refreshToken:n}=t;const r=na(e);return r.append("Authorization",function(e){return`${Go} ${e}`}(n)),r}async function ia(e){const t=await e();return t.status>=500&&t.status<600?e():t}function oa(e){return new Promise((t=>{setTimeout(t,e)}))}const aa=/^[cdef][\w-]{21}$/;function sa(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}(e);return aa.test(t)?t:""}catch(e){return""}}function la(e){return`${e.appName}!${e.appId}`}const ca=new Map;function ua(e,t){const n=la(e);da(n,t),function(e,t){const n=pa();n&&n.postMessage({key:e,fid:t});fa()}(n,t)}function da(e,t){const n=ca.get(e);if(n)for(const r of n)r(t)}let ha=null;function pa(){return!ha&&"BroadcastChannel"in self&&(ha=new BroadcastChannel("[Firebase] FID Change"),ha.onmessage=e=>{da(e.data.key,e.data.fid)}),ha}function fa(){0===ca.size&&ha&&(ha.close(),ha=null)}const ga="firebase-installations-store";let ma=null;function ba(){return ma||(ma=Mi("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(ga)}})),ma}async function ya(e,t){const n=la(e),r=(await ba()).transaction(ga,"readwrite"),i=r.objectStore(ga),o=await i.get(n);return await i.put(t,n),await r.done,o&&o.fid===t.fid||ua(e,t.fid),t}async function va(e){const t=la(e),n=(await ba()).transaction(ga,"readwrite");await n.objectStore(ga).delete(t),await n.done}async function xa(e,t){const n=la(e),r=(await ba()).transaction(ga,"readwrite"),i=r.objectStore(ga),o=await i.get(n),a=t(o);return void 0===a?await i.delete(n):await i.put(a,n),await r.done,!a||o&&o.fid===a.fid||ua(e,a.fid),a}async function wa(e){let t;const n=await xa(e.appConfig,(n=>{const r=function(e){const t=e||{fid:sa(),registrationStatus:0};return Ca(t)}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(Xo.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function(e,t){let{appConfig:n,heartbeatServiceProvider:r}=e,{fid:i}=t;const o=Zo(n),a=na(n),s=r.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}const l={fid:i,authVersion:Go,appId:n.appId,sdkVersion:Yo},c={method:"POST",headers:a,body:JSON.stringify(l)},u=await ia((()=>fetch(o,c)));if(u.ok){const e=await u.json();return{fid:e.fid||i,registrationStatus:2,refreshToken:e.refreshToken,authToken:ea(e.authToken)}}throw await ta("Create Installation",u)}(e,t);return ya(e.appConfig,n)}catch(ik){throw Jo(ik)&&409===ik.customData.serverCode?await va(e.appConfig):await ya(e.appConfig,{fid:t.fid,registrationStatus:0}),ik}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:_a(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function _a(e){let t=await ka(e.appConfig);for(;1===t.registrationStatus;)await oa(100),t=await ka(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await wa(e);return n||t}return t}function ka(e){return xa(e,(e=>{if(!e)throw Xo.create("installation-not-found");return Ca(e)}))}function Ca(e){return 1===(t=e).registrationStatus&&t.registrationTime+Ko<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t}async function Sa(e,t){let{appConfig:n,heartbeatServiceProvider:r}=e;const i=function(e,t){let{fid:n}=t;return`${Zo(e)}/${n}/authTokens:generate`}(n,t),o=ra(n,t),a=r.getImmediate({optional:!0});if(a){const e=await a.getHeartbeatsHeader();e&&o.append("x-firebase-client",e)}const s={installation:{sdkVersion:Yo,appId:n.appId}},l={method:"POST",headers:o,body:JSON.stringify(s)},c=await ia((()=>fetch(i,l)));if(c.ok){return ea(await c.json())}throw await ta("Generate Auth Token",c)}async function Ea(e){let t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const r=await xa(e.appConfig,(r=>{if(!Ia(r))throw Xo.create("not-registered");const i=r.authToken;if(!n&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Qo}(e)}(i))return r;if(1===i.requestStatus)return t=async function(e,t){let n=await Ta(e.appConfig);for(;1===n.authToken.requestStatus;)await oa(100),n=await Ta(e.appConfig);const r=n.authToken;return 0===r.requestStatus?Ea(e,t):r}(e,n),r;{if(!navigator.onLine)throw Xo.create("app-offline");const n=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return t=async function(e,t){try{const n=await Sa(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await ya(e.appConfig,r),n}catch(ik){if(!Jo(ik)||401!==ik.customData.serverCode&&404!==ik.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await ya(e.appConfig,n)}else await va(e.appConfig);throw ik}}(e,n),n}}));return t?await t:r.authToken}function Ta(e){return xa(e,(e=>{if(!Ia(e))throw Xo.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+Ko<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var n}))}function Ia(e){return void 0!==e&&2===e.registrationStatus}async function Na(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=e;await async function(e){const{registrationPromise:t}=await wa(e);t&&await t}(n);return(await Ea(n,t)).token}function ja(e){return Xo.create("missing-app-config-values",{valueName:e})}const Pa="installations",Ra=e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw ja("App Configuration");if(!e.name)throw ja("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw ja(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:Io(t,"heartbeat"),_delete:()=>Promise.resolve()}},Da=e=>{const t=Io(e.getProvider("app").getImmediate(),Pa).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:r}=await wa(t);return r?r.catch(console.error):Ea(t).catch(console.error),n.fid}(t),getToken:e=>Na(t,e)}};To(new fi(Pa,Ra,"PUBLIC")),To(new fi("installations-internal",Da,"PRIVATE")),Fo(qo,Vo),Fo(qo,Vo,"esm2017");const Fa="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Oa="google.c.a.c_id";var La,Aa;function Ma(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function za(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length);for(let i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(La||(La={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(Aa||(Aa={}));const $a="fcm_token_details_db",Ua="fcm_token_object_Store";const Ba="firebase-messaging-store";let Wa=null;function Ha(){return Wa||(Wa=Mi("firebase-messaging-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(Ba)}})),Wa}async function qa(e){const t=Ka(e),n=await Ha(),r=await n.transaction(Ba).objectStore(Ba).get(t);if(r)return r;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map((e=>e.name));if(!e.includes($a))return null}let t=null;return(await Mi($a,5,{upgrade:async(n,r,i,o)=>{var a;if(r<2)return;if(!n.objectStoreNames.contains(Ua))return;const s=o.objectStore(Ua),l=await s.index("fcmSenderId").get(e);if(await s.clear(),l)if(2===r){const e=l;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:null!==(a=e.createTime)&&void 0!==a?a:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"===typeof e.vapidKey?e.vapidKey:Ma(e.vapidKey)}}}else if(3===r){const e=l;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:Ma(e.auth),p256dh:Ma(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:Ma(e.vapidKey)}}}else if(4===r){const e=l;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:Ma(e.auth),p256dh:Ma(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:Ma(e.vapidKey)}}}}})).close(),await zi($a),await zi("fcm_vapid_details_db"),await zi("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"===typeof e.createTime&&e.createTime>0&&"string"===typeof e.token&&e.token.length>0&&"string"===typeof t.auth&&t.auth.length>0&&"string"===typeof t.p256dh&&t.p256dh.length>0&&"string"===typeof t.endpoint&&t.endpoint.length>0&&"string"===typeof t.swScope&&t.swScope.length>0&&"string"===typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await Va(e,t),t}}async function Va(e,t){const n=Ka(e),r=(await Ha()).transaction(Ba,"readwrite");return await r.objectStore(Ba).put(t,n),await r.done,t}function Ka(e){let{appConfig:t}=e;return t.appId}const Ya=new Zr("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});async function Ga(e,t){const n={method:"DELETE",headers:await Xa(e)};try{const r=await fetch(`${Qa(e.appConfig)}/${t}`,n),i=await r.json();if(i.error){const e=i.error.message;throw Ya.create("token-unsubscribe-failed",{errorInfo:e})}}catch(r){throw Ya.create("token-unsubscribe-failed",{errorInfo:null===r||void 0===r?void 0:r.toString()})}}function Qa(e){let{projectId:t}=e;return`https://fcmregistrations.googleapis.com/v1/projects/${t}/registrations`}async function Xa(e){let{appConfig:t,installations:n}=e;const r=await n.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${r}`})}function Ja(e){let{p256dh:t,auth:n,endpoint:r,vapidKey:i}=e;const o={web:{endpoint:r,auth:n,p256dh:t}};return i!==Fa&&(o.web.applicationPubKey=i),o}async function Za(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:za(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:Ma(t.getKey("auth")),p256dh:Ma(t.getKey("p256dh"))},r=await qa(e.firebaseDependencies);if(r){if(function(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&i&&o}(r.subscriptionOptions,n))return Date.now()>=r.createTime+6048e5?async function(e,t){try{const n=await async function(e,t){const n=await Xa(e),r=Ja(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let o;try{const n=await fetch(`${Qa(e.appConfig)}/${t.token}`,i);o=await n.json()}catch(a){throw Ya.create("token-update-failed",{errorInfo:null===a||void 0===a?void 0:a.toString()})}if(o.error){const e=o.error.message;throw Ya.create("token-update-failed",{errorInfo:e})}if(!o.token)throw Ya.create("token-update-no-token");return o.token}(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await Va(e.firebaseDependencies,r),n}catch(ik){throw ik}}(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await Ga(e.firebaseDependencies,r.token)}catch(ik){console.warn(ik)}return es(e.firebaseDependencies,n)}return es(e.firebaseDependencies,n)}async function es(e,t){const n=await async function(e,t){const n=await Xa(e),r=Ja(t),i={method:"POST",headers:n,body:JSON.stringify(r)};let o;try{const t=await fetch(Qa(e.appConfig),i);o=await t.json()}catch(a){throw Ya.create("token-subscribe-failed",{errorInfo:null===a||void 0===a?void 0:a.toString()})}if(o.error){const e=o.error.message;throw Ya.create("token-subscribe-failed",{errorInfo:e})}if(!o.token)throw Ya.create("token-subscribe-no-token");return o.token}(e,t),r={token:n,createTime:Date.now(),subscriptionOptions:t};return await Va(e,r),r.token}function ts(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const o=t.notification.icon;o&&(e.notification.icon=o)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){var n,r,i,o,a;if(!t.fcmOptions&&!(null===(n=t.notification)||void 0===n?void 0:n.click_action))return;e.fcmOptions={};const s=null!==(i=null===(r=t.fcmOptions)||void 0===r?void 0:r.link)&&void 0!==i?i:null===(o=t.notification)||void 0===o?void 0:o.click_action;s&&(e.fcmOptions.link=s);const l=null===(a=t.fcmOptions)||void 0===a?void 0:a.analytics_label;l&&(e.fcmOptions.analyticsLabel=l)}(t,e),t}function ns(e){return Ya.create("missing-app-config-values",{valueName:e})}!function(e,t){const n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));n.join("")}("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class rs{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const r=function(e){if(!e||!e.options)throw ns("App Configuration Object");if(!e.name)throw ns("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const r of t)if(!n[r])throw ns(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}async function is(e){try{e.swRegistration=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch((()=>{}))}catch(ik){throw Ya.create("failed-service-worker-registration",{browserErrorMessage:null===ik||void 0===ik?void 0:ik.message})}}async function os(e,t){if(!navigator)throw Ya.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw Ya.create("permission-blocked");return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Fa)}(e,null===t||void 0===t?void 0:t.vapidKey),await async function(e,t){if(t||e.swRegistration||await is(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw Ya.create("invalid-sw-registration");e.swRegistration=t}}(e,null===t||void 0===t?void 0:t.serviceWorkerRegistration),Za(e)}async function as(e,t,n){const r=function(e){switch(e){case Aa.NOTIFICATION_CLICKED:return"notification_open";case Aa.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[Oa],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}async function ss(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===Aa.PUSH_RECEIVED&&("function"===typeof e.onMessageHandler?e.onMessageHandler(ts(n)):e.onMessageHandler.next(ts(n)));const r=n.data;(function(e){return"object"===typeof e&&!!e&&Oa in e})(r)&&"1"===r["google.c.a.e"]&&await as(e,n.messageType,r)}const ls="@firebase/messaging",cs="0.12.12",us=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>os(t,e)}};async function ds(){try{await Xr()}catch(ik){return!1}return"undefined"!==typeof window&&Qr()&&!("undefined"===typeof navigator||!navigator.cookieEnabled)&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function hs(e,t){return function(e,t){if(!navigator)throw Ya.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}(e=pi(e),t)}To(new fi("messaging",(e=>{const t=new rs(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",(e=>ss(t,e))),t}),"PUBLIC")),To(new fi("messaging-internal",us,"PRIVATE")),Fo(ls,cs),Fo(ls,cs,"esm2017");const ps="@firebase/database",fs="1.0.8";let gs="";function ms(e){gs=e}class bs{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){null==t?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ni(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return null==t?null:ti(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}class ys{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){null==t?delete this.cache_[e]:this.cache_[e]=t}get(e){return ii(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}const vs=function(e){try{if("undefined"!==typeof window&&"undefined"!==typeof window[e]){const t=window[e];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new bs(t)}}catch(ik){}return new ys},xs=vs("localStorage"),ws=vs("sessionStorage"),_s=new Si("@firebase/database"),ks=function(){let e=1;return function(){return e++}}(),Cs=function(e){const t=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319){const t=i-55296;r++,Pr(r<e.length,"Surrogate pair missing trail surrogate."),i=65536+(t<<10)+(e.charCodeAt(r)-56320)}i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):i<65536?(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t}(e),n=new ui;n.update(t);const r=n.digest();return Fr.encodeByteArray(r)},Ss=function(){let e="";for(let t=0;t<arguments.length;t++){const n=t<0||arguments.length<=t?void 0:arguments[t];Array.isArray(n)||n&&"object"===typeof n&&"number"===typeof n.length?e+=Ss.apply(null,n):e+="object"===typeof n?ni(n):n,e+=" "}return e};let Es=null,Ts=!0;const Is=function(e,t){Pr(!t||!0===e||!1===e,"Can't turn on custom loggers persistently."),!0===e?(_s.logLevel=xi.VERBOSE,Es=_s.log.bind(_s),t&&ws.set("logging_enabled",!0)):"function"===typeof e?Es=e:(Es=null,ws.remove("logging_enabled"))},Ns=function(){if(!0===Ts&&(Ts=!1,null===Es&&!0===ws.get("logging_enabled")&&Is(!0)),Es){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];const r=Ss.apply(null,t);Es(r)}},js=function(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];Ns(e,...n)}},Ps=function(){const e="FIREBASE INTERNAL ERROR: "+Ss(...arguments);_s.error(e)},Rs=function(){const e=`FIREBASE FATAL ERROR: ${Ss(...arguments)}`;throw _s.error(e),new Error(e)},Ds=function(){const e="FIREBASE WARNING: "+Ss(...arguments);_s.warn(e)},Fs=function(e){return"number"===typeof e&&(e!==e||e===Number.POSITIVE_INFINITY||e===Number.NEGATIVE_INFINITY)},Os="[MIN_NAME]",Ls="[MAX_NAME]",As=function(e,t){if(e===t)return 0;if(e===Os||t===Ls)return-1;if(t===Os||e===Ls)return 1;{const n=qs(e),r=qs(t);return null!==n?null!==r?n-r===0?e.length-t.length:n-r:-1:null!==r?1:e<t?-1:1}},Ms=function(e,t){return e===t?0:e<t?-1:1},zs=function(e,t){if(t&&e in t)return t[e];throw new Error("Missing required key ("+e+") in object: "+ni(t))},$s=function(e){if("object"!==typeof e||null===e)return ni(e);const t=[];for(const r in e)t.push(r);t.sort();let n="{";for(let r=0;r<t.length;r++)0!==r&&(n+=","),n+=ni(t[r]),n+=":",n+=$s(e[t[r]]);return n+="}",n},Us=function(e,t){const n=e.length;if(n<=t)return[e];const r=[];for(let i=0;i<n;i+=t)i+t>n?r.push(e.substring(i,n)):r.push(e.substring(i,i+t));return r};function Bs(e,t){for(const n in e)e.hasOwnProperty(n)&&t(n,e[n])}const Ws=function(e){Pr(!Fs(e),"Invalid JSON number");const t=1023;let n,r,i,o,a;0===e?(r=0,i=0,n=1/e===-1/0?1:0):(n=e<0,(e=Math.abs(e))>=Math.pow(2,-1022)?(o=Math.min(Math.floor(Math.log(e)/Math.LN2),t),r=o+t,i=Math.round(e*Math.pow(2,52-o)-Math.pow(2,52))):(r=0,i=Math.round(e/Math.pow(2,-1074))));const s=[];for(a=52;a;a-=1)s.push(i%2?1:0),i=Math.floor(i/2);for(a=11;a;a-=1)s.push(r%2?1:0),r=Math.floor(r/2);s.push(n?1:0),s.reverse();const l=s.join("");let c="";for(a=0;a<64;a+=8){let e=parseInt(l.substr(a,8),2).toString(16);1===e.length&&(e="0"+e),c+=e}return c.toLowerCase()};const Hs=new RegExp("^-?(0*)\\d{1,10}$"),qs=function(e){if(Hs.test(e)){const t=Number(e);if(t>=-2147483648&&t<=2147483647)return t}return null},Vs=function(e){try{e()}catch(ik){setTimeout((()=>{const t=ik.stack||"";throw Ds("Exception was thrown by user callback.",t),ik}),Math.floor(0))}},Ks=function(e,t){const n=setTimeout(e,t);return"number"===typeof n&&"undefined"!==typeof Deno&&Deno.unrefTimer?Deno.unrefTimer(n):"object"===typeof n&&n.unref&&n.unref(),n};class Ys{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=null===t||void 0===t?void 0:t.getImmediate({optional:!0}),this.appCheck||null===t||void 0===t||t.get().then((e=>this.appCheck=e))}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise(((t,n)=>{setTimeout((()=>{this.appCheck?this.getToken(e).then(t,n):t(null)}),0)}))}addTokenChangeListener(e){var t;null===(t=this.appCheckProvider)||void 0===t||t.get().then((t=>t.addTokenListener(e)))}notifyForInvalidToken(){Ds(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}class Gs{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit((e=>this.auth_=e))}getToken(e){return this.auth_?this.auth_.getToken(e).catch((e=>e&&"auth/token-not-initialized"===e.code?(Ns("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e))):new Promise(((t,n)=>{setTimeout((()=>{this.auth_?this.getToken(e).then(t,n):t(null)}),0)}))}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then((t=>t.addAuthTokenListener(e)))}removeTokenChangeListener(e){this.authProvider_.get().then((t=>t.removeAuthTokenListener(e)))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ds(e)}}class Qs{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Qs.OWNER="owner";const Xs="5",Js=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Zs="ac",el="websocket",tl="long_polling";class nl{constructor(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"",a=arguments.length>6&&void 0!==arguments[6]&&arguments[6],s=arguments.length>7&&void 0!==arguments[7]&&arguments[7];this.secure=t,this.namespace=n,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=s,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=xs.get("host:"+e)||this._host}isCacheableHost(){return"s-"===this.internalHost.substr(0,2)}isCustomHost(){return"firebaseio.com"!==this._domain&&"firebaseio-demo.com"!==this._domain}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&xs.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function rl(e,t,n){let r;if(Pr("string"===typeof t,"typeof type must == string"),Pr("object"===typeof n,"typeof params must == object"),t===el)r=(e.secure?"wss://":"ws://")+e.internalHost+"/.ws?";else{if(t!==tl)throw new Error("Unknown connection type: "+t);r=(e.secure?"https://":"http://")+e.internalHost+"/.lp?"}(function(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams})(e)&&(n.ns=e.namespace);const i=[];return Bs(n,((e,t)=>{i.push(e+"="+t)})),r+i.join("&")}class il{constructor(){this.counters_={}}incrementCounter(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;ii(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return zr(this.counters_)}}const ol={},al={};function sl(e){const t=e.toString();return ol[t]||(ol[t]=new il),ol[t]}class ll{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const e=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let t=0;t<e.length;++t)e[t]&&Vs((()=>{this.onMessage_(e[t])}));if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}const cl="start";class ul{constructor(e,t,n,r,i,o,a){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=js(e),this.stats_=sl(t),this.urlFn=e=>(this.appCheckToken&&(e[Zs]=this.appCheckToken),rl(t,tl,e))}open(e,t){var n=this;this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new ll(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout((()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null}),Math.floor(3e4)),function(e){if(Gr()||"complete"===document.readyState)e();else{let t=!1;const n=function(){document.body?t||(t=!0,e()):setTimeout(n,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",(()=>{"complete"===document.readyState&&n()})),window.attachEvent("onload",n))}}((()=>{if(this.isClosed_)return;this.scriptTagHolder=new dl((function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];const[i,o,a,s,l]=t;if(n.incrementIncomingBytes_(t),n.scriptTagHolder)if(n.connectTimeoutTimer_&&(clearTimeout(n.connectTimeoutTimer_),n.connectTimeoutTimer_=null),n.everConnected_=!0,i===cl)n.id=o,n.password=a;else{if("close"!==i)throw new Error("Unrecognized command received: "+i);o?(n.scriptTagHolder.sendNewPolls=!1,n.myPacketOrderer.closeAfter(o,(()=>{n.onClosed_()}))):n.onClosed_()}}),(function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];const[i,o]=t;n.incrementIncomingBytes_(t),n.myPacketOrderer.handleResponse(i,o)}),(()=>{this.onClosed_()}),this.urlFn);const e={};e[cl]="t",e.ser=Math.floor(1e8*Math.random()),this.scriptTagHolder.uniqueCallbackIdentifier&&(e.cb=this.scriptTagHolder.uniqueCallbackIdentifier),e.v=Xs,this.transportSessionId&&(e.s=this.transportSessionId),this.lastSessionId&&(e.ls=this.lastSessionId),this.applicationId&&(e.p=this.applicationId),this.appCheckToken&&(e[Zs]=this.appCheckToken),"undefined"!==typeof location&&location.hostname&&Js.test(location.hostname)&&(e.r="f");const t=this.urlFn(e);this.log_("Connecting via long-poll to "+t),this.scriptTagHolder.addTag(t,(()=>{}))}))}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ul.forceAllow_=!0}static forceDisallow(){ul.forceDisallow_=!0}static isAvailable(){return!Gr()&&(!!ul.forceAllow_||!ul.forceDisallow_&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.UI))}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=ni(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=Lr(t),r=Us(n,1840);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,t){if(Gr())return;this.myDisconnFrame=document.createElement("iframe");const n={dframe:"t"};n.id=e,n.pw=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=ni(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class dl{constructor(e,t,n,r){if(this.onDisconnect=n,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(1e8*Math.random()),this.sendNewPolls=!0,Gr())this.commandCB=e,this.onMessageCB=t;else{this.uniqueCallbackIdentifier=ks(),window["pLPCommand"+this.uniqueCallbackIdentifier]=e,window["pRTLPCB"+this.uniqueCallbackIdentifier]=t,this.myIFrame=dl.createIFrame_();let n="";if(this.myIFrame.src&&"javascript:"===this.myIFrame.src.substr(0,11)){n='<script>document.domain="'+document.domain+'";<\/script>'}const r="<html><body>"+n+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(r),this.myIFrame.doc.close()}catch(ik){Ns("frame writing exception"),ik.stack&&Ns(ik.stack),Ns(ik)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",!document.body)throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";document.body.appendChild(e);try{e.contentWindow.document||Ns("No IE domain setting required")}catch(ik){const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout((()=>{null!==this.myIFrame&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)}),Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e.id=this.myID,e.pw=this.myPW,e.ser=this.currentSerial;let t=this.urlFn(e),n="",r=0;for(;this.pendingSegs.length>0;){if(!(this.pendingSegs[0].d.length+30+n.length<=1870))break;{const e=this.pendingSegs.shift();n=n+"&seg"+r+"="+e.seg+"&ts"+r+"="+e.ts+"&d"+r+"="+e.d,r++}}return t+=n,this.addLongPollTag_(t,this.currentSerial),!0}return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},r=setTimeout(n,Math.floor(25e3));this.addTag(e,(()=>{clearTimeout(r),n()}))}addTag(e,t){Gr()?this.doNodeLongPoll(e,t):setTimeout((()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const e=n.readyState;e&&"loaded"!==e&&"complete"!==e||(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{Ns("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch(ik){}}),Math.floor(1))}}let hl=null;"undefined"!==typeof MozWebSocket?hl=MozWebSocket:"undefined"!==typeof WebSocket&&(hl=WebSocket);class pl{constructor(e,t,n,r,i,o,a){this.connId=e,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=js(this.connId),this.stats_=sl(t),this.connURL=pl.connectionURL_(t,o,a,r,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,r,i){const o={};return o.v=Xs,!Gr()&&"undefined"!==typeof location&&location.hostname&&Js.test(location.hostname)&&(o.r="f"),t&&(o.s=t),n&&(o.ls=n),r&&(o[Zs]=r),i&&(o.p=i),rl(e,el,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,xs.set("previous_websocket_failure",!0);try{let e;if(Gr()){const t=this.nodeAdmin?"AdminNode":"Node";e={headers:{"User-Agent":`Firebase/${Xs}/${gs}/${process.platform}/${t}`,"X-Firebase-GMPID":this.applicationId||""}},this.authToken&&(e.headers.Authorization=`Bearer ${this.authToken}`),this.appCheckToken&&(e.headers["X-Firebase-AppCheck"]=this.appCheckToken);const n={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""},r=0===this.connURL.indexOf("wss://")?n.HTTPS_PROXY||n.https_proxy:n.HTTP_PROXY||n.http_proxy;r&&(e.proxy={origin:r})}this.mySock=new hl(this.connURL,[],e)}catch(ik){this.log_("Error instantiating WebSocket.");const t=ik.message||ik.data;return t&&this.log_(t),void this.onClosed_()}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=e=>{this.handleIncomingFrame(e)},this.mySock.onerror=e=>{this.log_("WebSocket error.  Closing connection.");const t=e.message||e.data;t&&this.log_(t),this.onClosed_()}}start(){}static forceDisallow(){pl.forceDisallow_=!0}static isAvailable(){let e=!1;if("undefined"!==typeof navigator&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&null!==hl&&!pl.forceDisallow_}static previouslyFailed(){return xs.isInMemoryStorage||!0===xs.get("previous_websocket_failure")}markConnectionHealthy(){xs.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const e=this.frames.join("");this.frames=null;const t=ti(e);this.onMessage(t)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(Pr(null===this.frames,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(null===this.mySock)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),null!==this.frames)this.appendFrame_(t);else{const e=this.extractFrameCount_(t);null!==e&&this.appendFrame_(e)}}send(e){this.resetKeepAlive();const t=ni(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=Us(t,16384);n.length>1&&this.sendString_(String(n.length));for(let r=0;r<n.length;r++)this.sendString_(n[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval((()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()}),Math.floor(45e3))}sendString_(e){try{this.mySock.send(e)}catch(ik){this.log_("Exception thrown from WebSocket.send():",ik.message||ik.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}pl.responsesRequiredToBeHealthy=2,pl.healthyTimeout=3e4;class fl{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[ul,pl]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=pl&&pl.isAvailable();let n=t&&!pl.previouslyFailed();if(e.webSocketOnly&&(t||Ds("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[pl];else{const e=this.transports_=[];for(const t of fl.ALL_TRANSPORTS)t&&t.isAvailable()&&e.push(t);fl.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}fl.globalTransportInitialized_=!1;class gl{constructor(e,t,n,r,i,o,a,s,l,c){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=s,this.onKill_=l,this.lastSessionId=c,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=js("c:"+this.id+":"),this.transportManager_=new fl(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout((()=>{this.conn_&&this.conn_.open(t,n)}),Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=Ks((()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>102400?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>10240?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))}),Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{2!==this.state_&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if("t"in e){const t=e.t;"a"===t?this.upgradeIfSecondaryHealthy_():"r"===t?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),this.tx_!==this.secondaryConn_&&this.rx_!==this.secondaryConn_||this.close()):"o"===t&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=zs("t",e),n=zs("d",e);if("c"===t)this.onSecondaryControl_(n);else{if("d"!==t)throw new Error("Unknown protocol layer: "+t);this.pendingDataMessages.push(n)}}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:"p",d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:"a",d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:"n",d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=zs("t",e),n=zs("d",e);"c"===t?this.onControl_(n):"d"===t&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=zs("t",e);if("d"in e){const n=e.d;if("h"===t){const e=Object.assign({},n);this.repoInfo_.isUsingEmulator&&(e.h=this.repoInfo_.host),this.onHandshake_(e)}else if("n"===t){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let e=0;e<this.pendingDataMessages.length;++e)this.onDataMessage_(this.pendingDataMessages[e]);this.pendingDataMessages=[],this.tryCleanupConnection()}else"s"===t?this.onConnectionShutdown_(n):"r"===t?this.onReset_(n):"e"===t?Ps("Server Error: "+n):"o"===t?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ps("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,0===this.state_&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Xs!==n&&Ds("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),Ks((()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())}),Math.floor(6e4))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,1===this.state_?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),0===this.primaryResponsesRequired_?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ks((()=>{this.sendPingOnPrimaryIfNecessary_()}),Math.floor(5e3))}sendPingOnPrimaryIfNecessary_(){this.isHealthy_||1!==this.state_||(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:"p",d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,this.tx_!==e&&this.rx_!==e||this.close()}onConnectionLost_(e){this.conn_=null,e||0!==this.state_?1===this.state_&&this.log_("Realtime connection lost."):(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(xs.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(1!==this.state_)throw"Connection is not connected";this.tx_.send(e)}close(){2!==this.state_&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}class ml{put(e,t,n,r){}merge(e,t,n,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}class bl{constructor(e){this.allowedEvents_=e,this.listeners_={},Pr(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(let e=0;e<i.length;e++)i[e].callback.apply(i[e].context,n)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const r=this.getInitialEvent(e);r&&t.apply(n,r)}off(e,t,n){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===t&&(!n||n===r[i].context))return void r.splice(i,1)}validateEventType_(e){Pr(this.allowedEvents_.find((t=>t===e)),"Unknown event: "+e)}}class yl extends bl{constructor(){super(["online"]),this.online_=!0,"undefined"===typeof window||"undefined"===typeof window.addEventListener||Yr()||(window.addEventListener("online",(()=>{this.online_||(this.online_=!0,this.trigger("online",!0))}),!1),window.addEventListener("offline",(()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))}),!1))}static getInstance(){return new yl}getInitialEvent(e){return Pr("online"===e,"Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}class vl{constructor(e,t){if(void 0===t){this.pieces_=e.split("/");let t=0;for(let e=0;e<this.pieces_.length;e++)this.pieces_[e].length>0&&(this.pieces_[t]=this.pieces_[e],t++);this.pieces_.length=t,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)""!==this.pieces_[t]&&(e+="/"+this.pieces_[t]);return e||"/"}}function xl(){return new vl("")}function wl(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function _l(e){return e.pieces_.length-e.pieceNum_}function kl(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new vl(e.pieces_,t)}function Cl(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function Sl(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.pieces_.slice(e.pieceNum_+t)}function El(e){if(e.pieceNum_>=e.pieces_.length)return null;const t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new vl(t,0)}function Tl(e,t){const n=[];for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);if(t instanceof vl)for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);else{const e=t.split("/");for(let t=0;t<e.length;t++)e[t].length>0&&n.push(e[t])}return new vl(n,0)}function Il(e){return e.pieceNum_>=e.pieces_.length}function Nl(e,t){const n=wl(e),r=wl(t);if(null===n)return t;if(n===r)return Nl(kl(e),kl(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+e+")")}function jl(e,t){const n=Sl(e,0),r=Sl(t,0);for(let i=0;i<n.length&&i<r.length;i++){const e=As(n[i],r[i]);if(0!==e)return e}return n.length===r.length?0:n.length<r.length?-1:1}function Pl(e,t){if(_l(e)!==_l(t))return!1;for(let n=e.pieceNum_,r=t.pieceNum_;n<=e.pieces_.length;n++,r++)if(e.pieces_[n]!==t.pieces_[r])return!1;return!0}function Rl(e,t){let n=e.pieceNum_,r=t.pieceNum_;if(_l(e)>_l(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[r])return!1;++n,++r}return!0}class Dl{constructor(e,t){this.errorPrefix_=t,this.parts_=Sl(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let n=0;n<this.parts_.length;n++)this.byteLength_+=hi(this.parts_[n]);Fl(this)}}function Fl(e){if(e.byteLength_>768)throw new Error(e.errorPrefix_+"has a key path longer than 768 bytes ("+e.byteLength_+").");if(e.parts_.length>32)throw new Error(e.errorPrefix_+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Ol(e))}function Ol(e){return 0===e.parts_.length?"":"in property '"+e.parts_.join(".")+"'"}class Ll extends bl{constructor(){let e,t;super(["visible"]),"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(t="visibilitychange",e="hidden"):"undefined"!==typeof document.mozHidden?(t="mozvisibilitychange",e="mozHidden"):"undefined"!==typeof document.msHidden?(t="msvisibilitychange",e="msHidden"):"undefined"!==typeof document.webkitHidden&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,(()=>{const t=!document[e];t!==this.visible_&&(this.visible_=t,this.trigger("visible",t))}),!1)}static getInstance(){return new Ll}getInitialEvent(e){return Pr("visible"===e,"Unknown event type: "+e),[this.visible_]}}const Al=1e3;class Ml extends ml{constructor(e,t,n,r,i,o,a,s){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=s,this.id=Ml.nextPersistentConnectionId_++,this.log_=js("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Al,this.maxReconnectDelay_=3e5,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,s&&!Gr())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ll.getInstance().on("visible",this.onVisible_,this),-1===e.host.indexOf("fblocal")&&yl.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const r=++this.requestNumber_,i={r:r,a:e,b:t};this.log_(ni(i)),Pr(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),n&&(this.requestCBHash_[r]=n)}get(e){this.initConnection_();const t=new qr,n={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:e=>{const n=e.d;"ok"===e.s?t.resolve(n):t.reject(n)}};this.outstandingGets_.push(n),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,n,r){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),Pr(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),Pr(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:t,query:e,tag:n};this.listens.get(o).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,(n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,0===this.outstandingGetCount_&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)}))}sendListen_(e){const t=e.query,n=t._path.toString(),r=t._queryIdentifier;this.log_("Listen on "+n+" for "+r);const i={p:n};e.tag&&(i.q=t._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest("q",i,(i=>{const o=i.d,a=i.s;Ml.warnOnListenWarnings_(o,t);(this.listens.get(n)&&this.listens.get(n).get(r))===e&&(this.log_("listen response",i),"ok"!==a&&this.removeListen_(n,r),e.onComplete&&e.onComplete(a,o))}))}static warnOnListenWarnings_(e,t){if(e&&"object"===typeof e&&ii(e,"w")){const n=oi(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const e='".indexOn": "'+t._queryParams.getIndex().toString()+'"',n=t._path.toString();Ds(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},(()=>{})),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&40===e.length||function(e){const t=ri(e).claims;return"object"===typeof t&&!0===t.admin}(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=3e4)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},(()=>{}))}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=function(e){const t=ri(e).claims;return!!t&&"object"===typeof t&&t.hasOwnProperty("iat")}(e)?"auth":"gauth",n={cred:e};null===this.authOverride_?n.noauth=!0:"object"===typeof this.authOverride_&&(n.authvar=this.authOverride_),this.sendRequest(t,n,(t=>{const n=t.s,r=t.d||"error";this.authToken_===e&&("ok"===n?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(n,r))}))}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},(e=>{const t=e.s,n=e.d||"error";"ok"===t?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)}))}unlisten(e,t){const n=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+r),Pr(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query");this.removeListen_(n,r)&&this.connected_&&this.sendUnlisten_(n,r,e._queryObject,t)}sendUnlisten_(e,t,n,r){this.log_("Unlisten on "+e+" for "+t);const i={p:e};r&&(i.q=n,i.t=r),this.sendRequest("n",i)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,r){const i={p:t,d:n};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,(e=>{r&&setTimeout((()=>{r(e.s,e.d)}),Math.floor(0))}))}put(e,t,n,r){this.putInternal("p",e,t,n,r)}merge(e,t,n,r){this.putInternal("m",e,t,n,r)}putInternal(e,t,n,r,i){this.initConnection_();const o={p:t,d:n};void 0!==i&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,(n=>{this.log_(t+" response",n),delete this.outstandingPuts_[e],this.outstandingPutCount_--,0===this.outstandingPutCount_&&(this.outstandingPuts_=[]),r&&r(n.s,n.d)}))}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,(e=>{if("ok"!==e.s){const t=e.d;this.log_("reportStats","Error sending stats: "+t)}}))}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ni(e));const t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),"d"===e?this.onDataUpdate_(t.p,t.d,!1,t.t):"m"===e?this.onDataUpdate_(t.p,t.d,!0,t.t):"c"===e?this.onListenRevoked_(t.p,t.q):"ac"===e?this.onAuthRevoked_(t.s,t.d):"apc"===e?this.onAppCheckRevoked_(t.s,t.d):"sd"===e?this.onSecurityDebugPacket_(t):Ps("Unrecognized action received from server: "+ni(e)+"\nAre you using the latest client?")}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=(new Date).getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){Pr(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout((()=>{this.establishConnectionTimer_=null,this.establishConnection_()}),Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Al,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Al,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){if(this.visible_){if(this.lastConnectionEstablishedTime_){(new Date).getTime()-this.lastConnectionEstablishedTime_>3e4&&(this.reconnectDelay_=Al),this.lastConnectionEstablishedTime_=null}}else this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=(new Date).getTime();const e=(new Date).getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,1.3*this.reconnectDelay_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=(new Date).getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+Ml.nextConnectionId_++,i=this.lastSessionId;let o=!1,a=null;const s=function(){a?a.close():(o=!0,n())},l=function(e){Pr(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(e)};this.realtime_={close:s,sendRequest:l};const c=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[s,l]=await Promise.all([this.authTokenProvider_.getToken(c),this.appCheckTokenProvider_.getToken(c)]);o?Ns("getToken() completed but was canceled"):(Ns("getToken() completed. Creating connection."),this.authToken_=s&&s.accessToken,this.appCheckToken_=l&&l.token,a=new gl(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,n,(e=>{Ds(e+" ("+this.repoInfo_.toString()+")"),this.interrupt("server_kill")}),i))}catch(Ps){this.log_("Failed to get token: "+Ps),o||(this.repoInfo_.nodeAdmin&&Ds(Ps),s())}}}interrupt(e){Ns("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ns("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ai(this.interruptReasons_)&&(this.reconnectDelay_=Al,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-(new Date).getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}0===this.outstandingPutCount_&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;n=t?t.map((e=>$s(e))).join("$"):"default";const r=this.removeListen_(e,n);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,t){const n=new vl(e).toString();let r;if(this.listens.has(n)){const e=this.listens.get(n);r=e.get(t),e.delete(t),0===e.size&&this.listens.delete(n)}else r=void 0;return r}onAuthRevoked_(e,t){Ns("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=3&&(this.reconnectDelay_=3e4,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Ns("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=3&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace("\n","\nFIREBASE: "))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";Gr()&&(t=this.repoInfo_.nodeAdmin?"admin_node":"node"),e["sdk."+t+"."+gs.replace(/\./g,"-")]=1,Yr()?e["framework.cordova"]=1:"object"===typeof navigator&&"ReactNative"===navigator.product&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=yl.getInstance().currentlyOnline();return ai(this.interruptReasons_)&&e}}Ml.nextPersistentConnectionId_=0,Ml.nextConnectionId_=0;class zl{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new zl(e,t)}}class $l{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new zl(Os,e),r=new zl(Os,t);return 0!==this.compare(n,r)}minPost(){return zl.MIN}}let Ul;class Bl extends $l{static get __EMPTY_NODE(){return Ul}static set __EMPTY_NODE(e){Ul=e}compare(e,t){return As(e.name,t.name)}isDefinedOn(e){throw Rr("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return zl.MIN}maxPost(){return new zl(Ls,Ul)}makePost(e,t){return Pr("string"===typeof e,"KeyIndex indexValue must always be a string."),new zl(e,Ul)}toString(){return".key"}}const Wl=new Bl;class Hl{constructor(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(o=t?n(e.key,t):1,r&&(o*=-1),o<0)e=this.isReverse_?e.left:e.right;else{if(0===o){this.nodeStack_.push(e);break}this.nodeStack_.push(e),e=this.isReverse_?e.right:e.left}}getNext(){if(0===this.nodeStack_.length)return null;let e,t=this.nodeStack_.pop();if(e=this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return e}hasNext(){return this.nodeStack_.length>0}peek(){if(0===this.nodeStack_.length)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ql{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:ql.RED,this.left=null!=r?r:Vl.EMPTY_NODE,this.right=null!=i?i:Vl.EMPTY_NODE}copy(e,t,n,r,i){return new ql(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return Vl.EMPTY_NODE;let e=this;return e.left.isRed_()||e.left.left.isRed_()||(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,r;if(n=this,t(e,n.key)<0)n.left.isEmpty()||n.left.isRed_()||n.left.left.isRed_()||(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),n.right.isEmpty()||n.right.isRed_()||n.right.left.isRed_()||(n=n.moveRedRight_()),0===t(e,n.key)){if(n.right.isEmpty())return Vl.EMPTY_NODE;r=n.right.min_(),n=n.copy(r.key,r.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ql.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ql.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ql.RED=!0,ql.BLACK=!1;class Vl{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Vl.EMPTY_NODE;this.comparator_=e,this.root_=t}insert(e,t){return new Vl(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,ql.BLACK,null,null))}remove(e){return new Vl(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ql.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,r=null;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t){if(n.left.isEmpty())return r?r.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}t<0?n=n.left:t>0&&(r=n,n=n.right)}throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Hl(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Hl(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Hl(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Hl(this.root_,null,this.comparator_,!0,e)}}function Kl(e,t){return As(e.name,t.name)}function Yl(e,t){return As(e,t)}let Gl;Vl.EMPTY_NODE=new class{copy(e,t,n,r,i){return this}insert(e,t,n){return new ql(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}};const Ql=function(e){return"number"===typeof e?"number:"+Ws(e):"string:"+e},Xl=function(e){if(e.isLeafNode()){const t=e.val();Pr("string"===typeof t||"number"===typeof t||"object"===typeof t&&ii(t,".sv"),"Priority must be a string or number.")}else Pr(e===Gl||e.isEmpty(),"priority of unexpected type.");Pr(e===Gl||e.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};let Jl,Zl,ec;class tc{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:tc.__childrenNodeConstructor.EMPTY_NODE;this.value_=e,this.priorityNode_=t,this.lazyHash_=null,Pr(void 0!==this.value_&&null!==this.value_,"LeafNode shouldn't be created with null/undefined value."),Xl(this.priorityNode_)}static set __childrenNodeConstructor(e){Jl=e}static get __childrenNodeConstructor(){return Jl}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new tc(this.value_,e)}getImmediateChild(e){return".priority"===e?this.priorityNode_:tc.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return Il(e)?this:".priority"===wl(e)?this.priorityNode_:tc.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return".priority"===e?this.updatePriority(t):t.isEmpty()&&".priority"!==e?this:tc.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=wl(e);return null===n?t:t.isEmpty()&&".priority"!==n?this:(Pr(".priority"!==n||1===_l(e),".priority must be the last token in a path"),this.updateImmediateChild(n,tc.__childrenNodeConstructor.EMPTY_NODE.updateChild(kl(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(null===this.lazyHash_){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Ql(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",e+="number"===t?Ws(this.value_):this.value_,this.lazyHash_=Cs(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===tc.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof tc.__childrenNodeConstructor?-1:(Pr(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,r=tc.VALUE_TYPE_ORDER.indexOf(t),i=tc.VALUE_TYPE_ORDER.indexOf(n);return Pr(r>=0,"Unknown leaf type: "+t),Pr(i>=0,"Unknown leaf type: "+n),r===i?"object"===n?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}return!1}}tc.VALUE_TYPE_ORDER=["object","boolean","number","string"];const nc=new class extends $l{compare(e,t){const n=e.node.getPriority(),r=t.node.getPriority(),i=n.compareTo(r);return 0===i?As(e.name,t.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return zl.MIN}maxPost(){return new zl(Ls,new tc("[PRIORITY-POST]",ec))}makePost(e,t){const n=Zl(e);return new zl(t,new tc("[PRIORITY-POST]",n))}toString(){return".priority"}},rc=Math.log(2);class ic{constructor(e){var t;this.count=(t=e+1,parseInt(Math.log(t)/rc,10)),this.current_=this.count-1;const n=(r=this.count,parseInt(Array(r+1).join("1"),2));var r;this.bits_=e+1&n}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const oc=function(e,t,n,r){e.sort(t);const i=function(t,r){const o=r-t;let a,s;if(0===o)return null;if(1===o)return a=e[t],s=n?n(a):a,new ql(s,a.node,ql.BLACK,null,null);{const l=parseInt(o/2,10)+t,c=i(t,l),u=i(l+1,r);return a=e[l],s=n?n(a):a,new ql(s,a.node,ql.BLACK,c,u)}},o=function(t){let r=null,o=null,a=e.length;const s=function(t,r){const o=a-t,s=a;a-=t;const c=i(o+1,s),u=e[o],d=n?n(u):u;l(new ql(d,u.node,r,null,c))},l=function(e){r?(r.left=e,r=e):(o=e,r=e)};for(let e=0;e<t.count;++e){const n=t.nextBitIsOne(),r=Math.pow(2,t.count-(e+1));n?s(r,ql.BLACK):(s(r,ql.BLACK),s(r,ql.RED))}return o}(new ic(e.length));return new Vl(r||t,o)};let ac;const sc={};class lc{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return Pr(sc&&nc,"ChildrenNode.ts has not been loaded"),ac=ac||new lc({".priority":sc},{".priority":nc}),ac}get(e){const t=oi(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Vl?t:null}hasIndex(e){return ii(this.indexSet_,e.toString())}addIndex(e,t){Pr(e!==Wl,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let r=!1;const i=t.getIterator(zl.Wrap);let o,a=i.getNext();for(;a;)r=r||e.isDefinedOn(a.node),n.push(a),a=i.getNext();o=r?oc(n,e.getCompare()):sc;const s=e.toString(),l=Object.assign({},this.indexSet_);l[s]=e;const c=Object.assign({},this.indexes_);return c[s]=o,new lc(c,l)}addToIndexes(e,t){const n=si(this.indexes_,((n,r)=>{const i=oi(this.indexSet_,r);if(Pr(i,"Missing index implementation for "+r),n===sc){if(i.isDefinedOn(e.node)){const n=[],r=t.getIterator(zl.Wrap);let o=r.getNext();for(;o;)o.name!==e.name&&n.push(o),o=r.getNext();return n.push(e),oc(n,i.getCompare())}return sc}{const r=t.get(e.name);let i=n;return r&&(i=i.remove(new zl(e.name,r))),i.insert(e,e.node)}}));return new lc(n,this.indexSet_)}removeFromIndexes(e,t){const n=si(this.indexes_,(n=>{if(n===sc)return n;{const r=t.get(e.name);return r?n.remove(new zl(e.name,r)):n}}));return new lc(n,this.indexSet_)}}let cc;class uc{constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&Xl(this.priorityNode_),this.children_.isEmpty()&&Pr(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return cc||(cc=new uc(new Vl(Yl),null,lc.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||cc}updatePriority(e){return this.children_.isEmpty()?this:new uc(this.children_,e,this.indexMap_)}getImmediateChild(e){if(".priority"===e)return this.getPriority();{const t=this.children_.get(e);return null===t?cc:t}}getChild(e){const t=wl(e);return null===t?this:this.getImmediateChild(t).getChild(kl(e))}hasChild(e){return null!==this.children_.get(e)}updateImmediateChild(e,t){if(Pr(t,"We should always be passing snapshot nodes"),".priority"===e)return this.updatePriority(t);{const n=new zl(e,t);let r,i;t.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(n,this.children_)):(r=this.children_.insert(e,t),i=this.indexMap_.addToIndexes(n,this.children_));const o=r.isEmpty()?cc:this.priorityNode_;return new uc(r,o,i)}}updateChild(e,t){const n=wl(e);if(null===n)return t;{Pr(".priority"!==wl(e)||1===_l(e),".priority must be the last token in a path");const r=this.getImmediateChild(n).updateChild(kl(e),t);return this.updateImmediateChild(n,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,r=0,i=!0;if(this.forEachChild(nc,((o,a)=>{t[o]=a.val(e),n++,i&&uc.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):i=!1})),!e&&i&&r<2*n){const e=[];for(const n in t)e[n]=t[n];return e}return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(null===this.lazyHash_){let e="";this.getPriority().isEmpty()||(e+="priority:"+Ql(this.getPriority().val())+":"),this.forEachChild(nc,((t,n)=>{const r=n.hash();""!==r&&(e+=":"+t+":"+r)})),this.lazyHash_=""===e?"":Cs(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const r=this.resolveIndex_(n);if(r){const n=r.getPredecessorKey(new zl(e,t));return n?n.name:null}return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.minKey();return e&&e.name}return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new zl(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.maxKey();return e&&e.name}return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new zl(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal((e=>t(e.name,e.node))):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,(e=>e));{const n=this.children_.getIteratorFrom(e.name,zl.Wrap);let r=n.peek();for(;null!=r&&t.compare(r,e)<0;)n.getNext(),r=n.peek();return n}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,(e=>e));{const n=this.children_.getReverseIteratorFrom(e.name,zl.Wrap);let r=n.peek();for(;null!=r&&t.compare(r,e)>0;)n.getNext(),r=n.peek();return n}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===dc?-1:0}withIndex(e){if(e===Wl||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new uc(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Wl||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority())){if(this.children_.count()===t.children_.count()){const e=this.getIterator(nc),n=t.getIterator(nc);let r=e.getNext(),i=n.getNext();for(;r&&i;){if(r.name!==i.name||!r.node.equals(i.node))return!1;r=e.getNext(),i=n.getNext()}return null===r&&null===i}return!1}return!1}}resolveIndex_(e){return e===Wl?null:this.indexMap_.get(e.toString())}}uc.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;const dc=new class extends uc{constructor(){super(new Vl(Yl),uc.EMPTY_NODE,lc.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return uc.EMPTY_NODE}isEmpty(){return!1}};Object.defineProperties(zl,{MIN:{value:new zl(Os,uc.EMPTY_NODE)},MAX:{value:new zl(Ls,dc)}}),Bl.__EMPTY_NODE=uc.EMPTY_NODE,tc.__childrenNodeConstructor=uc,Gl=dc,function(e){ec=e}(dc);function hc(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(null===e)return uc.EMPTY_NODE;if("object"===typeof e&&".priority"in e&&(t=e[".priority"]),Pr(null===t||"string"===typeof t||"number"===typeof t||"object"===typeof t&&".sv"in t,"Invalid priority type found: "+typeof t),"object"===typeof e&&".value"in e&&null!==e[".value"]&&(e=e[".value"]),"object"!==typeof e||".sv"in e){return new tc(e,hc(t))}if(e instanceof Array){let n=uc.EMPTY_NODE;return Bs(e,((t,r)=>{if(ii(e,t)&&"."!==t.substring(0,1)){const e=hc(r);!e.isLeafNode()&&e.isEmpty()||(n=n.updateImmediateChild(t,e))}})),n.updatePriority(hc(t))}{const n=[];let r=!1;if(Bs(e,((e,t)=>{if("."!==e.substring(0,1)){const i=hc(t);i.isEmpty()||(r=r||!i.getPriority().isEmpty(),n.push(new zl(e,i)))}})),0===n.length)return uc.EMPTY_NODE;const i=oc(n,Kl,(e=>e.name),Yl);if(r){const e=oc(n,nc.getCompare());return new uc(i,hc(t),new lc({".priority":e},{".priority":nc}))}return new uc(i,hc(t),lc.Default)}}!function(e){Zl=e}(hc);class pc extends $l{constructor(e){super(),this.indexPath_=e,Pr(!Il(e)&&".priority"!==wl(e),"Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),r=this.extractChild(t.node),i=n.compareTo(r);return 0===i?As(e.name,t.name):i}makePost(e,t){const n=hc(e),r=uc.EMPTY_NODE.updateChild(this.indexPath_,n);return new zl(t,r)}maxPost(){const e=uc.EMPTY_NODE.updateChild(this.indexPath_,dc);return new zl(Ls,e)}toString(){return Sl(this.indexPath_,0).join("/")}}const fc=new class extends $l{compare(e,t){const n=e.node.compareTo(t.node);return 0===n?As(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return zl.MIN}maxPost(){return zl.MAX}makePost(e,t){const n=hc(e);return new zl(t,n)}toString(){return".value"}};function gc(e){return{type:"value",snapshotNode:e}}function mc(e,t){return{type:"child_added",snapshotNode:t,childName:e}}function bc(e,t){return{type:"child_removed",snapshotNode:t,childName:e}}function yc(e,t,n){return{type:"child_changed",snapshotNode:t,childName:e,oldSnap:n}}class vc{constructor(e){this.index_=e}updateChild(e,t,n,r,i,o){Pr(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(r).equals(n.getChild(r))&&a.isEmpty()===n.isEmpty()?e:(null!=o&&(n.isEmpty()?e.hasChild(t)?o.trackChildChange(bc(t,a)):Pr(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(mc(t,n)):o.trackChildChange(yc(t,n,a))),e.isLeafNode()&&n.isEmpty()?e:e.updateImmediateChild(t,n).withIndex(this.index_))}updateFullNode(e,t,n){return null!=n&&(e.isLeafNode()||e.forEachChild(nc,((e,r)=>{t.hasChild(e)||n.trackChildChange(bc(e,r))})),t.isLeafNode()||t.forEachChild(nc,((t,r)=>{if(e.hasChild(t)){const i=e.getImmediateChild(t);i.equals(r)||n.trackChildChange(yc(t,r,i))}else n.trackChildChange(mc(t,r))}))),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?uc.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}class xc{constructor(e){this.indexedFilter_=new vc(e.getIndex()),this.index_=e.getIndex(),this.startPost_=xc.getStartPost_(e),this.endPost_=xc.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,r,i,o){return this.matches(new zl(t,n))||(n=uc.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,r,i,o)}updateFullNode(e,t,n){t.isLeafNode()&&(t=uc.EMPTY_NODE);let r=t.withIndex(this.index_);r=r.updatePriority(uc.EMPTY_NODE);const i=this;return t.forEachChild(nc,((e,t)=>{i.matches(new zl(e,t))||(r=r.updateImmediateChild(e,uc.EMPTY_NODE))})),this.indexedFilter_.updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}return e.getIndex().maxPost()}}class wc{constructor(e){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{const t=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?t<=0:t<0},this.withinEndPost=e=>{const t=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?t<=0:t<0},this.rangedFilter_=new xc(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,r,i,o){return this.rangedFilter_.matches(new zl(t,n))||(n=uc.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,r,i,o):this.fullLimitUpdateChild_(e,t,n,i,o)}updateFullNode(e,t,n){let r;if(t.isLeafNode()||t.isEmpty())r=uc.EMPTY_NODE.withIndex(this.index_);else if(2*this.limit_<t.numChildren()&&t.isIndexed(this.index_)){let e;r=uc.EMPTY_NODE.withIndex(this.index_),e=this.reverse_?t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let n=0;for(;e.hasNext()&&n<this.limit_;){const t=e.getNext();if(this.withinDirectionalStart(t)){if(!this.withinDirectionalEnd(t))break;r=r.updateImmediateChild(t.name,t.node),n++}}}else{let e;r=t.withIndex(this.index_),r=r.updatePriority(uc.EMPTY_NODE),e=this.reverse_?r.getReverseIterator(this.index_):r.getIterator(this.index_);let n=0;for(;e.hasNext();){const t=e.getNext();n<this.limit_&&this.withinDirectionalStart(t)&&this.withinDirectionalEnd(t)?n++:r=r.updateImmediateChild(t.name,uc.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,r,i){let o;if(this.reverse_){const e=this.index_.getCompare();o=(t,n)=>e(n,t)}else o=this.index_.getCompare();const a=e;Pr(a.numChildren()===this.limit_,"");const s=new zl(t,n),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),c=this.rangedFilter_.matches(s);if(a.hasChild(t)){const e=a.getImmediateChild(t);let u=r.getChildAfterChild(this.index_,l,this.reverse_);for(;null!=u&&(u.name===t||a.hasChild(u.name));)u=r.getChildAfterChild(this.index_,u,this.reverse_);const d=null==u?1:o(u,s);if(c&&!n.isEmpty()&&d>=0)return null!=i&&i.trackChildChange(yc(t,n,e)),a.updateImmediateChild(t,n);{null!=i&&i.trackChildChange(bc(t,e));const n=a.updateImmediateChild(t,uc.EMPTY_NODE);return null!=u&&this.rangedFilter_.matches(u)?(null!=i&&i.trackChildChange(mc(u.name,u.node)),n.updateImmediateChild(u.name,u.node)):n}}return n.isEmpty()?e:c&&o(l,s)>=0?(null!=i&&(i.trackChildChange(bc(l.name,l.node)),i.trackChildChange(mc(t,n))),a.updateImmediateChild(t,n).updateImmediateChild(l.name,uc.EMPTY_NODE)):e}}class _c{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=nc}hasStart(){return this.startSet_}isViewFromLeft(){return""===this.viewFrom_?this.startSet_:"l"===this.viewFrom_}getIndexStartValue(){return Pr(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return Pr(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Os}hasEnd(){return this.endSet_}getIndexEndValue(){return Pr(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return Pr(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ls}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&""!==this.viewFrom_}getLimit(){return Pr(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===nc}copy(){const e=new _c;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function kc(e){const t={};if(e.isDefault())return t;let n;if(e.index_===nc?n="$priority":e.index_===fc?n="$value":e.index_===Wl?n="$key":(Pr(e.index_ instanceof pc,"Unrecognized index type!"),n=e.index_.toString()),t.orderBy=ni(n),e.startSet_){const n=e.startAfterSet_?"startAfter":"startAt";t[n]=ni(e.indexStartValue_),e.startNameSet_&&(t[n]+=","+ni(e.indexStartName_))}if(e.endSet_){const n=e.endBeforeSet_?"endBefore":"endAt";t[n]=ni(e.indexEndValue_),e.endNameSet_&&(t[n]+=","+ni(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?t.limitToFirst=e.limit_:t.limitToLast=e.limit_),t}function Cc(e){const t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_),t.sin=!e.startAfterSet_),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_),t.ein=!e.endBeforeSet_),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;""===n&&(n=e.isViewFromLeft()?"l":"r"),t.vf=n}return e.index_!==nc&&(t.i=e.index_.toString()),t}class Sc extends ml{constructor(e,t,n,r){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=r,this.log_=js("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return void 0!==t?"tag$"+t:(Pr(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,n,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=Sc.getListenId_(e,n),a={};this.listens_[o]=a;const s=kc(e._queryParams);this.restRequest_(i+".json",s,((e,t)=>{let s=t;if(404===e&&(s=null,e=null),null===e&&this.onDataUpdate_(i,s,!1,n),oi(this.listens_,o)===a){let t;t=e?401===e?"permission_denied":"rest_error:"+e:"ok",r(t,null)}}))}unlisten(e,t){const n=Sc.getListenId_(e,t);delete this.listens_[n]}get(e){const t=kc(e._queryParams),n=e._path.toString(),r=new qr;return this.restRequest_(n+".json",t,((e,t)=>{let i=t;404===e&&(i=null,e=null),null===e?(this.onDataUpdate_(n,i,!1,null),r.resolve(i)):r.reject(new Error(i))})),r.promise}refreshAuthToken(e){}restRequest_(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then((r=>{let[i,o]=r;i&&i.accessToken&&(t.auth=i.accessToken),o&&o.token&&(t.ac=o.token);const a=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+function(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}(t);this.log_("Sending REST request for "+a);const s=new XMLHttpRequest;s.onreadystatechange=()=>{if(n&&4===s.readyState){this.log_("REST Response for "+a+" received. status:",s.status,"response:",s.responseText);let e=null;if(s.status>=200&&s.status<300){try{e=ti(s.responseText)}catch(ik){Ds("Failed to parse JSON response for "+a+": "+s.responseText)}n(null,e)}else 401!==s.status&&404!==s.status&&Ds("Got unsuccessful REST response for "+a+" Status: "+s.status),n(s.status);n=null}},s.open("GET",a,!0),s.send()}))}}class Ec{constructor(){this.rootNode_=uc.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}function Tc(){return{value:null,children:new Map}}function Ic(e,t,n){if(Il(t))e.value=n,e.children.clear();else if(null!==e.value)e.value=e.value.updateChild(t,n);else{const r=wl(t);e.children.has(r)||e.children.set(r,Tc());Ic(e.children.get(r),t=kl(t),n)}}function Nc(e,t,n){null!==e.value?n(t,e.value):function(e,t){e.children.forEach(((e,n)=>{t(n,e)}))}(e,((e,r)=>{Nc(r,new vl(t.toString()+"/"+e),n)}))}class jc{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Bs(this.last_,((e,n)=>{t[e]=t[e]-n})),this.last_=e,t}}class Pc{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new jc(e);const n=1e4+2e4*Math.random();Ks(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;Bs(e,((e,r)=>{r>0&&ii(this.statsToReport_,e)&&(t[e]=r,n=!0)})),n&&this.server_.reportStats(t),Ks(this.reportStats_.bind(this),Math.floor(2*Math.random()*3e5))}}var Rc;function Dc(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}!function(e){e[e.OVERWRITE=0]="OVERWRITE",e[e.MERGE=1]="MERGE",e[e.ACK_USER_WRITE=2]="ACK_USER_WRITE",e[e.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"}(Rc||(Rc={}));class Fc{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=Rc.ACK_USER_WRITE,this.source={fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}operationForChild(e){if(Il(this.path)){if(null!=this.affectedTree.value)return Pr(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new vl(e));return new Fc(xl(),t,this.revert)}}return Pr(wl(this.path)===e,"operationForChild called for unrelated child."),new Fc(kl(this.path),this.affectedTree,this.revert)}}class Oc{constructor(e,t){this.source=e,this.path=t,this.type=Rc.LISTEN_COMPLETE}operationForChild(e){return Il(this.path)?new Oc(this.source,xl()):new Oc(this.source,kl(this.path))}}class Lc{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=Rc.OVERWRITE}operationForChild(e){return Il(this.path)?new Lc(this.source,xl(),this.snap.getImmediateChild(e)):new Lc(this.source,kl(this.path),this.snap)}}class Ac{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=Rc.MERGE}operationForChild(e){if(Il(this.path)){const t=this.children.subtree(new vl(e));return t.isEmpty()?null:t.value?new Lc(this.source,xl(),t.value):new Ac(this.source,xl(),t)}return Pr(wl(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ac(this.source,kl(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}class Mc{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(Il(e))return this.isFullyInitialized()&&!this.filtered_;const t=wl(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}class zc{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function $c(e,t,n,r,i,o){const a=r.filter((e=>e.type===n));a.sort(((t,n)=>function(e,t,n){if(null==t.childName||null==n.childName)throw Rr("Should only compare child_ events.");const r=new zl(t.childName,t.snapshotNode),i=new zl(n.childName,n.snapshotNode);return e.index_.compare(r,i)}(e,t,n))),a.forEach((n=>{const r=function(e,t,n){return"value"===t.type||"child_removed"===t.type||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}(e,n,o);i.forEach((i=>{i.respondsTo(n.type)&&t.push(i.createEvent(r,e.query_))}))}))}function Uc(e,t){return{eventCache:e,serverCache:t}}function Bc(e,t,n,r){return Uc(new Mc(t,n,r),e.serverCache)}function Wc(e,t,n,r){return Uc(e.eventCache,new Mc(t,n,r))}function Hc(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function qc(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}let Vc;class Kc{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(Vc||(Vc=new Vl(Ms)),Vc);this.value=e,this.children=t}static fromObject(e){let t=new Kc(null);return Bs(e,((e,n)=>{t=t.set(new vl(e),n)})),t}isEmpty(){return null===this.value&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(null!=this.value&&t(this.value))return{path:xl(),value:this.value};if(Il(e))return null;{const n=wl(e),r=this.children.get(n);if(null!==r){const i=r.findRootMostMatchingPathAndValue(kl(e),t);if(null!=i){return{path:Tl(new vl(n),i.path),value:i.value}}return null}return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,(()=>!0))}subtree(e){if(Il(e))return this;{const t=wl(e),n=this.children.get(t);return null!==n?n.subtree(kl(e)):new Kc(null)}}set(e,t){if(Il(e))return new Kc(t,this.children);{const n=wl(e),r=(this.children.get(n)||new Kc(null)).set(kl(e),t),i=this.children.insert(n,r);return new Kc(this.value,i)}}remove(e){if(Il(e))return this.children.isEmpty()?new Kc(null):new Kc(null,this.children);{const t=wl(e),n=this.children.get(t);if(n){const r=n.remove(kl(e));let i;return i=r.isEmpty()?this.children.remove(t):this.children.insert(t,r),null===this.value&&i.isEmpty()?new Kc(null):new Kc(this.value,i)}return this}}get(e){if(Il(e))return this.value;{const t=wl(e),n=this.children.get(t);return n?n.get(kl(e)):null}}setTree(e,t){if(Il(e))return t;{const n=wl(e),r=(this.children.get(n)||new Kc(null)).setTree(kl(e),t);let i;return i=r.isEmpty()?this.children.remove(n):this.children.insert(n,r),new Kc(this.value,i)}}fold(e){return this.fold_(xl(),e)}fold_(e,t){const n={};return this.children.inorderTraversal(((r,i)=>{n[r]=i.fold_(Tl(e,r),t)})),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,xl(),t)}findOnPath_(e,t,n){const r=!!this.value&&n(t,this.value);if(r)return r;if(Il(e))return null;{const r=wl(e),i=this.children.get(r);return i?i.findOnPath_(kl(e),Tl(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,xl(),t)}foreachOnPath_(e,t,n){if(Il(e))return this;{this.value&&n(t,this.value);const r=wl(e),i=this.children.get(r);return i?i.foreachOnPath_(kl(e),Tl(t,r),n):new Kc(null)}}foreach(e){this.foreach_(xl(),e)}foreach_(e,t){this.children.inorderTraversal(((n,r)=>{r.foreach_(Tl(e,n),t)})),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal(((t,n)=>{n.value&&e(t,n.value)}))}}class Yc{constructor(e){this.writeTree_=e}static empty(){return new Yc(new Kc(null))}}function Gc(e,t,n){if(Il(t))return new Yc(new Kc(n));{const r=e.writeTree_.findRootMostValueAndPath(t);if(null!=r){const i=r.path;let o=r.value;const a=Nl(i,t);return o=o.updateChild(a,n),new Yc(e.writeTree_.set(i,o))}{const r=new Kc(n),i=e.writeTree_.setTree(t,r);return new Yc(i)}}}function Qc(e,t,n){let r=e;return Bs(n,((e,n)=>{r=Gc(r,Tl(t,e),n)})),r}function Xc(e,t){if(Il(t))return Yc.empty();{const n=e.writeTree_.setTree(t,new Kc(null));return new Yc(n)}}function Jc(e,t){return null!=Zc(e,t)}function Zc(e,t){const n=e.writeTree_.findRootMostValueAndPath(t);return null!=n?e.writeTree_.get(n.path).getChild(Nl(n.path,t)):null}function eu(e){const t=[],n=e.writeTree_.value;return null!=n?n.isLeafNode()||n.forEachChild(nc,((e,n)=>{t.push(new zl(e,n))})):e.writeTree_.children.inorderTraversal(((e,n)=>{null!=n.value&&t.push(new zl(e,n.value))})),t}function tu(e,t){if(Il(t))return e;{const n=Zc(e,t);return new Yc(null!=n?new Kc(n):e.writeTree_.subtree(t))}}function nu(e){return e.writeTree_.isEmpty()}function ru(e,t){return iu(xl(),e.writeTree_,t)}function iu(e,t,n){if(null!=t.value)return n.updateChild(e,t.value);{let r=null;return t.children.inorderTraversal(((t,i)=>{".priority"===t?(Pr(null!==i.value,"Priority writes must always be leaf nodes"),r=i.value):n=iu(Tl(e,t),i,n)})),n.getChild(e).isEmpty()||null===r||(n=n.updateChild(Tl(e,".priority"),r)),n}}function ou(e,t){return yu(t,e)}function au(e,t){const n=e.allWrites.findIndex((e=>e.writeId===t));Pr(n>=0,"removeWrite called with nonexistent writeId.");const r=e.allWrites[n];e.allWrites.splice(n,1);let i=r.visible,o=!1,a=e.allWrites.length-1;for(;i&&a>=0;){const t=e.allWrites[a];t.visible&&(a>=n&&su(t,r.path)?i=!1:Rl(r.path,t.path)&&(o=!0)),a--}if(i){if(o)return function(e){e.visibleWrites=cu(e.allWrites,lu,xl()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}(e),!0;if(r.snap)e.visibleWrites=Xc(e.visibleWrites,r.path);else{Bs(r.children,(t=>{e.visibleWrites=Xc(e.visibleWrites,Tl(r.path,t))}))}return!0}return!1}function su(e,t){if(e.snap)return Rl(e.path,t);for(const n in e.children)if(e.children.hasOwnProperty(n)&&Rl(Tl(e.path,n),t))return!0;return!1}function lu(e){return e.visible}function cu(e,t,n){let r=Yc.empty();for(let i=0;i<e.length;++i){const o=e[i];if(t(o)){const e=o.path;let t;if(o.snap)Rl(n,e)?(t=Nl(n,e),r=Gc(r,t,o.snap)):Rl(e,n)&&(t=Nl(e,n),r=Gc(r,xl(),o.snap.getChild(t)));else{if(!o.children)throw Rr("WriteRecord should have .snap or .children");if(Rl(n,e))t=Nl(n,e),r=Qc(r,t,o.children);else if(Rl(e,n))if(t=Nl(e,n),Il(t))r=Qc(r,xl(),o.children);else{const e=oi(o.children,wl(t));if(e){const n=e.getChild(kl(t));r=Gc(r,xl(),n)}}}}}return r}function uu(e,t,n,r,i){if(r||i){const o=tu(e.visibleWrites,t);if(!i&&nu(o))return n;if(i||null!=n||Jc(o,xl())){const o=function(e){return(e.visible||i)&&(!r||!~r.indexOf(e.writeId))&&(Rl(e.path,t)||Rl(t,e.path))};return ru(cu(e.allWrites,o,t),n||uc.EMPTY_NODE)}return null}{const r=Zc(e.visibleWrites,t);if(null!=r)return r;{const r=tu(e.visibleWrites,t);if(nu(r))return n;if(null!=n||Jc(r,xl())){return ru(r,n||uc.EMPTY_NODE)}return null}}}function du(e,t,n,r){return uu(e.writeTree,e.treePath,t,n,r)}function hu(e,t){return function(e,t,n){let r=uc.EMPTY_NODE;const i=Zc(e.visibleWrites,t);if(i)return i.isLeafNode()||i.forEachChild(nc,((e,t)=>{r=r.updateImmediateChild(e,t)})),r;if(n){const i=tu(e.visibleWrites,t);return n.forEachChild(nc,((e,t)=>{const n=ru(tu(i,new vl(e)),t);r=r.updateImmediateChild(e,n)})),eu(i).forEach((e=>{r=r.updateImmediateChild(e.name,e.node)})),r}return eu(tu(e.visibleWrites,t)).forEach((e=>{r=r.updateImmediateChild(e.name,e.node)})),r}(e.writeTree,e.treePath,t)}function pu(e,t,n,r){return function(e,t,n,r,i){Pr(r||i,"Either existingEventSnap or existingServerSnap must exist");const o=Tl(t,n);if(Jc(e.visibleWrites,o))return null;{const t=tu(e.visibleWrites,o);return nu(t)?i.getChild(n):ru(t,i.getChild(n))}}(e.writeTree,e.treePath,t,n,r)}function fu(e,t){return function(e,t){return Zc(e.visibleWrites,t)}(e.writeTree,Tl(e.treePath,t))}function gu(e,t,n,r,i,o){return function(e,t,n,r,i,o,a){let s;const l=tu(e.visibleWrites,t),c=Zc(l,xl());if(null!=c)s=c;else{if(null==n)return[];s=ru(l,n)}if(s=s.withIndex(a),s.isEmpty()||s.isLeafNode())return[];{const e=[],t=a.getCompare(),n=o?s.getReverseIteratorFrom(r,a):s.getIteratorFrom(r,a);let l=n.getNext();for(;l&&e.length<i;)0!==t(l,r)&&e.push(l),l=n.getNext();return e}}(e.writeTree,e.treePath,t,n,r,i,o)}function mu(e,t,n){return function(e,t,n,r){const i=Tl(t,n),o=Zc(e.visibleWrites,i);if(null!=o)return o;if(r.isCompleteForChild(n))return ru(tu(e.visibleWrites,i),r.getNode().getImmediateChild(n));return null}(e.writeTree,e.treePath,t,n)}function bu(e,t){return yu(Tl(e.treePath,t),e.writeTree)}function yu(e,t){return{treePath:e,writeTree:t}}class vu{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;Pr("child_added"===t||"child_changed"===t||"child_removed"===t,"Only child changes supported for tracking"),Pr(".priority"!==n,"Only non-priority child changes can be tracked.");const r=this.changeMap.get(n);if(r){const i=r.type;if("child_added"===t&&"child_removed"===i)this.changeMap.set(n,yc(n,e.snapshotNode,r.snapshotNode));else if("child_removed"===t&&"child_added"===i)this.changeMap.delete(n);else if("child_removed"===t&&"child_changed"===i)this.changeMap.set(n,bc(n,r.oldSnap));else if("child_changed"===t&&"child_added"===i)this.changeMap.set(n,mc(n,e.snapshotNode));else{if("child_changed"!==t||"child_changed"!==i)throw Rr("Illegal combination of changes: "+e+" occurred after "+r);this.changeMap.set(n,yc(n,e.snapshotNode,r.oldSnap))}}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}const xu=new class{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}};class wu{constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const t=null!=this.optCompleteServerCache_?new Mc(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return mu(this.writes_,e,t)}}getChildAfterChild(e,t,n){const r=null!=this.optCompleteServerCache_?this.optCompleteServerCache_:qc(this.viewCache_),i=gu(this.writes_,r,t,1,n,e);return 0===i.length?null:i[0]}}function _u(e,t,n,r,i){const o=new vu;let a,s;if(n.type===Rc.OVERWRITE){const l=n;l.source.fromUser?a=Su(e,t,l.path,l.snap,r,i,o):(Pr(l.source.fromServer,"Unknown source."),s=l.source.tagged||t.serverCache.isFiltered()&&!Il(l.path),a=Cu(e,t,l.path,l.snap,r,i,s,o))}else if(n.type===Rc.MERGE){const l=n;l.source.fromUser?a=function(e,t,n,r,i,o,a){let s=t;return r.foreach(((r,l)=>{const c=Tl(n,r);Eu(t,wl(c))&&(s=Su(e,s,c,l,i,o,a))})),r.foreach(((r,l)=>{const c=Tl(n,r);Eu(t,wl(c))||(s=Su(e,s,c,l,i,o,a))})),s}(e,t,l.path,l.children,r,i,o):(Pr(l.source.fromServer,"Unknown source."),s=l.source.tagged||t.serverCache.isFiltered(),a=Iu(e,t,l.path,l.children,r,i,s,o))}else if(n.type===Rc.ACK_USER_WRITE){const s=n;a=s.revert?function(e,t,n,r,i,o){let a;if(null!=fu(r,n))return t;{const s=new wu(r,t,i),l=t.eventCache.getNode();let c;if(Il(n)||".priority"===wl(n)){let n;if(t.serverCache.isFullyInitialized())n=du(r,qc(t));else{const e=t.serverCache.getNode();Pr(e instanceof uc,"serverChildren would be complete if leaf node"),n=hu(r,e)}c=e.filter.updateFullNode(l,n,o)}else{const i=wl(n);let u=mu(r,i,t.serverCache);null==u&&t.serverCache.isCompleteForChild(i)&&(u=l.getImmediateChild(i)),c=null!=u?e.filter.updateChild(l,i,u,kl(n),s,o):t.eventCache.getNode().hasChild(i)?e.filter.updateChild(l,i,uc.EMPTY_NODE,kl(n),s,o):l,c.isEmpty()&&t.serverCache.isFullyInitialized()&&(a=du(r,qc(t)),a.isLeafNode()&&(c=e.filter.updateFullNode(c,a,o)))}return a=t.serverCache.isFullyInitialized()||null!=fu(r,xl()),Bc(t,c,a,e.filter.filtersNodes())}}(e,t,s.path,r,i,o):function(e,t,n,r,i,o,a){if(null!=fu(i,n))return t;const s=t.serverCache.isFiltered(),l=t.serverCache;if(null!=r.value){if(Il(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Cu(e,t,n,l.getNode().getChild(n),i,o,s,a);if(Il(n)){let r=new Kc(null);return l.getNode().forEachChild(Wl,((e,t)=>{r=r.set(new vl(e),t)})),Iu(e,t,n,r,i,o,s,a)}return t}{let c=new Kc(null);return r.foreach(((e,t)=>{const r=Tl(n,e);l.isCompleteForPath(r)&&(c=c.set(e,l.getNode().getChild(r)))})),Iu(e,t,n,c,i,o,s,a)}}(e,t,s.path,s.affectedTree,r,i,o)}else{if(n.type!==Rc.LISTEN_COMPLETE)throw Rr("Unknown operation type: "+n.type);a=function(e,t,n,r,i){const o=t.serverCache,a=Wc(t,o.getNode(),o.isFullyInitialized()||Il(n),o.isFiltered());return ku(e,a,n,r,xu,i)}(e,t,n.path,r,o)}const l=o.getChanges();return function(e,t,n){const r=t.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),o=Hc(e);(n.length>0||!e.eventCache.isFullyInitialized()||i&&!r.getNode().equals(o)||!r.getNode().getPriority().equals(o.getPriority()))&&n.push(gc(Hc(t)))}}(t,a,l),{viewCache:a,changes:l}}function ku(e,t,n,r,i,o){const a=t.eventCache;if(null!=fu(r,n))return t;{let s,l;if(Il(n))if(Pr(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const n=qc(t),i=hu(r,n instanceof uc?n:uc.EMPTY_NODE);s=e.filter.updateFullNode(t.eventCache.getNode(),i,o)}else{const n=du(r,qc(t));s=e.filter.updateFullNode(t.eventCache.getNode(),n,o)}else{const c=wl(n);if(".priority"===c){Pr(1===_l(n),"Can't have a priority with additional path components");const i=a.getNode();l=t.serverCache.getNode();const o=pu(r,n,i,l);s=null!=o?e.filter.updatePriority(i,o):a.getNode()}else{const u=kl(n);let d;if(a.isCompleteForChild(c)){l=t.serverCache.getNode();const e=pu(r,n,a.getNode(),l);d=null!=e?a.getNode().getImmediateChild(c).updateChild(u,e):a.getNode().getImmediateChild(c)}else d=mu(r,c,t.serverCache);s=null!=d?e.filter.updateChild(a.getNode(),c,d,u,i,o):a.getNode()}}return Bc(t,s,a.isFullyInitialized()||Il(n),e.filter.filtersNodes())}}function Cu(e,t,n,r,i,o,a,s){const l=t.serverCache;let c;const u=a?e.filter:e.filter.getIndexedFilter();if(Il(n))c=u.updateFullNode(l.getNode(),r,null);else if(u.filtersNodes()&&!l.isFiltered()){const e=l.getNode().updateChild(n,r);c=u.updateFullNode(l.getNode(),e,null)}else{const e=wl(n);if(!l.isCompleteForPath(n)&&_l(n)>1)return t;const i=kl(n),o=l.getNode().getImmediateChild(e).updateChild(i,r);c=".priority"===e?u.updatePriority(l.getNode(),o):u.updateChild(l.getNode(),e,o,i,xu,null)}const d=Wc(t,c,l.isFullyInitialized()||Il(n),u.filtersNodes());return ku(e,d,n,i,new wu(i,d,o),s)}function Su(e,t,n,r,i,o,a){const s=t.eventCache;let l,c;const u=new wu(i,t,o);if(Il(n))c=e.filter.updateFullNode(t.eventCache.getNode(),r,a),l=Bc(t,c,!0,e.filter.filtersNodes());else{const i=wl(n);if(".priority"===i)c=e.filter.updatePriority(t.eventCache.getNode(),r),l=Bc(t,c,s.isFullyInitialized(),s.isFiltered());else{const o=kl(n),c=s.getNode().getImmediateChild(i);let d;if(Il(o))d=r;else{const e=u.getCompleteChild(i);d=null!=e?".priority"===Cl(o)&&e.getChild(El(o)).isEmpty()?e:e.updateChild(o,r):uc.EMPTY_NODE}if(c.equals(d))l=t;else{l=Bc(t,e.filter.updateChild(s.getNode(),i,d,o,u,a),s.isFullyInitialized(),e.filter.filtersNodes())}}}return l}function Eu(e,t){return e.eventCache.isCompleteForChild(t)}function Tu(e,t,n){return n.foreach(((e,n)=>{t=t.updateChild(e,n)})),t}function Iu(e,t,n,r,i,o,a,s){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let l,c=t;l=Il(n)?r:new Kc(null).setTree(n,r);const u=t.serverCache.getNode();return l.children.inorderTraversal(((n,r)=>{if(u.hasChild(n)){const l=Tu(0,t.serverCache.getNode().getImmediateChild(n),r);c=Cu(e,c,new vl(n),l,i,o,a,s)}})),l.children.inorderTraversal(((n,r)=>{const l=!t.serverCache.isCompleteForChild(n)&&null===r.value;if(!u.hasChild(n)&&!l){const l=Tu(0,t.serverCache.getNode().getImmediateChild(n),r);c=Cu(e,c,new vl(n),l,i,o,a,s)}})),c}class Nu{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const n=this.query_._queryParams,r=new vc(n.getIndex()),i=(o=n).loadsAllData()?new vc(o.getIndex()):o.hasLimit()?new wc(o):new xc(o);var o;this.processor_=function(e){return{filter:e}}(i);const a=t.serverCache,s=t.eventCache,l=r.updateFullNode(uc.EMPTY_NODE,a.getNode(),null),c=i.updateFullNode(uc.EMPTY_NODE,s.getNode(),null),u=new Mc(l,a.isFullyInitialized(),r.filtersNodes()),d=new Mc(c,s.isFullyInitialized(),i.filtersNodes());this.viewCache_=Uc(d,u),this.eventGenerator_=new zc(this.query_)}get query(){return this.query_}}function ju(e,t){const n=qc(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!Il(t)&&!n.getImmediateChild(wl(t)).isEmpty())?n.getChild(t):null}function Pu(e){return 0===e.eventRegistrations_.length}function Ru(e,t,n){const r=[];if(n){Pr(null==t,"A cancel should cancel all event registrations.");const i=e.query._path;e.eventRegistrations_.forEach((e=>{const t=e.createCancelEvent(n,i);t&&r.push(t)}))}if(t){let n=[];for(let r=0;r<e.eventRegistrations_.length;++r){const i=e.eventRegistrations_[r];if(i.matches(t)){if(t.hasAnyCallback()){n=n.concat(e.eventRegistrations_.slice(r+1));break}}else n.push(i)}e.eventRegistrations_=n}else e.eventRegistrations_=[];return r}function Du(e,t,n,r){t.type===Rc.MERGE&&null!==t.source.queryId&&(Pr(qc(e.viewCache_),"We should always have a full cache before handling merges"),Pr(Hc(e.viewCache_),"Missing event cache, even though we have a server cache"));const i=e.viewCache_,o=_u(e.processor_,i,t,n,r);var a,s;return a=e.processor_,s=o.viewCache,Pr(s.eventCache.getNode().isIndexed(a.filter.getIndex()),"Event snap not indexed"),Pr(s.serverCache.getNode().isIndexed(a.filter.getIndex()),"Server snap not indexed"),Pr(o.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),e.viewCache_=o.viewCache,Fu(e,o.changes,o.viewCache.eventCache.getNode(),null)}function Fu(e,t,n,r){const i=r?[r]:e.eventRegistrations_;return function(e,t,n,r){const i=[],o=[];return t.forEach((t=>{var n;"child_changed"===t.type&&e.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)&&o.push((n=t.childName,{type:"child_moved",snapshotNode:t.snapshotNode,childName:n}))})),$c(e,i,"child_removed",t,r,n),$c(e,i,"child_added",t,r,n),$c(e,i,"child_moved",o,r,n),$c(e,i,"child_changed",t,r,n),$c(e,i,"value",t,r,n),i}(e.eventGenerator_,t,n,i)}let Ou,Lu;class Au{constructor(){this.views=new Map}}function Mu(e,t,n,r){const i=t.source.queryId;if(null!==i){const o=e.views.get(i);return Pr(null!=o,"SyncTree gave us an op for an invalid query."),Du(o,t,n,r)}{let i=[];for(const o of e.views.values())i=i.concat(Du(o,t,n,r));return i}}function zu(e,t,n,r,i){const o=t._queryIdentifier,a=e.views.get(o);if(!a){let e=du(n,i?r:null),o=!1;e?o=!0:r instanceof uc?(e=hu(n,r),o=!1):(e=uc.EMPTY_NODE,o=!1);const a=Uc(new Mc(e,o,!1),new Mc(r,i,!1));return new Nu(t,a)}return a}function $u(e,t,n,r,i,o){const a=zu(e,t,r,i,o);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,a),function(e,t){e.eventRegistrations_.push(t)}(a,n),function(e,t){const n=e.viewCache_.eventCache,r=[];n.getNode().isLeafNode()||n.getNode().forEachChild(nc,((e,t)=>{r.push(mc(e,t))}));return n.isFullyInitialized()&&r.push(gc(n.getNode())),Fu(e,r,n.getNode(),t)}(a,n)}function Uu(e,t,n,r){const i=t._queryIdentifier,o=[];let a=[];const s=Vu(e);if("default"===i)for(const[l,c]of e.views.entries())a=a.concat(Ru(c,n,r)),Pu(c)&&(e.views.delete(l),c.query._queryParams.loadsAllData()||o.push(c.query));else{const t=e.views.get(i);t&&(a=a.concat(Ru(t,n,r)),Pu(t)&&(e.views.delete(i),t.query._queryParams.loadsAllData()||o.push(t.query)))}return s&&!Vu(e)&&o.push(new(Pr(Ou,"Reference.ts has not been loaded"),Ou)(t._repo,t._path)),{removed:o,events:a}}function Bu(e){const t=[];for(const n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function Wu(e,t){let n=null;for(const r of e.views.values())n=n||ju(r,t);return n}function Hu(e,t){if(t._queryParams.loadsAllData())return Ku(e);{const n=t._queryIdentifier;return e.views.get(n)}}function qu(e,t){return null!=Hu(e,t)}function Vu(e){return null!=Ku(e)}function Ku(e){for(const t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}let Yu=1;class Gu{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Kc(null),this.pendingWriteTree_={visibleWrites:Yc.empty(),allWrites:[],lastWriteId:-1},this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Qu(e,t,n,r,i){return function(e,t,n,r,i){Pr(r>e.lastWriteId,"Stacking an older write on top of newer ones"),void 0===i&&(i=!0),e.allWrites.push({path:t,snap:n,writeId:r,visible:i}),i&&(e.visibleWrites=Gc(e.visibleWrites,t,n)),e.lastWriteId=r}(e.pendingWriteTree_,t,n,r,i),i?id(e,new Lc({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,n)):[]}function Xu(e,t,n,r){!function(e,t,n,r){Pr(r>e.lastWriteId,"Stacking an older merge on top of newer ones"),e.allWrites.push({path:t,children:n,writeId:r,visible:!0}),e.visibleWrites=Qc(e.visibleWrites,t,n),e.lastWriteId=r}(e.pendingWriteTree_,t,n,r);const i=Kc.fromObject(n);return id(e,new Ac({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,i))}function Ju(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=function(e,t){for(let n=0;n<e.allWrites.length;n++){const r=e.allWrites[n];if(r.writeId===t)return r}return null}(e.pendingWriteTree_,t);if(au(e.pendingWriteTree_,t)){let t=new Kc(null);return null!=r.snap?t=t.set(xl(),!0):Bs(r.children,(e=>{t=t.set(new vl(e),!0)})),id(e,new Fc(r.path,t,n))}return[]}function Zu(e,t,n){return id(e,new Lc({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,n))}function ed(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];const o=t._path,a=e.syncPointTree_.get(o);let s=[];if(a&&("default"===t._queryIdentifier||qu(a,t))){const l=Uu(a,t,n,r);0===a.views.size&&(e.syncPointTree_=e.syncPointTree_.remove(o));const c=l.removed;if(s=l.events,!i){const n=-1!==c.findIndex((e=>e._queryParams.loadsAllData())),i=e.syncPointTree_.findOnPath(o,((e,t)=>Vu(t)));if(n&&!i){const t=e.syncPointTree_.subtree(o);if(!t.isEmpty()){const n=function(e){return e.fold(((e,t,n)=>{if(t&&Vu(t)){return[Ku(t)]}{let e=[];return t&&(e=Bu(t)),Bs(n,((t,n)=>{e=e.concat(n)})),e}}))}(t);for(let t=0;t<n.length;++t){const r=n[t],i=r.query,o=sd(e,r);e.listenProvider_.startListening(pd(i),ld(e,i),o.hashFn,o.onComplete)}}}if(!i&&c.length>0&&!r)if(n){const n=null;e.listenProvider_.stopListening(pd(t),n)}else c.forEach((t=>{const n=e.queryToTagMap.get(cd(t));e.listenProvider_.stopListening(pd(t),n)}))}!function(e,t){for(let n=0;n<t.length;++n){const r=t[n];if(!r._queryParams.loadsAllData()){const t=cd(r),n=e.queryToTagMap.get(t);e.queryToTagMap.delete(t),e.tagToQueryMap.delete(n)}}}(e,c)}return s}function td(e,t,n,r){const i=ud(e,r);if(null!=i){const r=dd(i),o=r.path,a=r.queryId,s=Nl(o,t);return hd(e,o,new Lc(Dc(a),s,n))}return[]}function nd(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const i=t._path;let o=null,a=!1;e.syncPointTree_.foreachOnPath(i,((e,t)=>{const n=Nl(e,i);o=o||Wu(t,n),a=a||Vu(t)}));let s,l=e.syncPointTree_.get(i);if(l?(a=a||Vu(l),o=o||Wu(l,xl())):(l=new Au,e.syncPointTree_=e.syncPointTree_.set(i,l)),null!=o)s=!0;else{s=!1,o=uc.EMPTY_NODE;e.syncPointTree_.subtree(i).foreachChild(((e,t)=>{const n=Wu(t,xl());n&&(o=o.updateImmediateChild(e,n))}))}const c=qu(l,t);if(!c&&!t._queryParams.loadsAllData()){const n=cd(t);Pr(!e.queryToTagMap.has(n),"View does not exist, but we have a tag");const r=Yu++;e.queryToTagMap.set(n,r),e.tagToQueryMap.set(r,n)}let u=$u(l,t,n,ou(e.pendingWriteTree_,i),o,s);if(!c&&!a&&!r){const n=Hu(l,t);u=u.concat(function(e,t,n){const r=t._path,i=ld(e,t),o=sd(e,n),a=e.listenProvider_.startListening(pd(t),i,o.hashFn,o.onComplete),s=e.syncPointTree_.subtree(r);if(i)Pr(!Vu(s.value),"If we're adding a query, it shouldn't be shadowed");else{const t=s.fold(((e,t,n)=>{if(!Il(e)&&t&&Vu(t))return[Ku(t).query];{let e=[];return t&&(e=e.concat(Bu(t).map((e=>e.query)))),Bs(n,((t,n)=>{e=e.concat(n)})),e}}));for(let n=0;n<t.length;++n){const r=t[n];e.listenProvider_.stopListening(pd(r),ld(e,r))}}return a}(e,t,n))}return u}function rd(e,t,n){const r=e.pendingWriteTree_,i=e.syncPointTree_.findOnPath(t,((e,n)=>{const r=Wu(n,Nl(e,t));if(r)return r}));return uu(r,t,i,n,!0)}function id(e,t){return od(t,e.syncPointTree_,null,ou(e.pendingWriteTree_,xl()))}function od(e,t,n,r){if(Il(e.path))return ad(e,t,n,r);{const i=t.get(xl());null==n&&null!=i&&(n=Wu(i,xl()));let o=[];const a=wl(e.path),s=e.operationForChild(a),l=t.children.get(a);if(l&&s){const e=n?n.getImmediateChild(a):null,t=bu(r,a);o=o.concat(od(s,l,e,t))}return i&&(o=o.concat(Mu(i,e,r,n))),o}}function ad(e,t,n,r){const i=t.get(xl());null==n&&null!=i&&(n=Wu(i,xl()));let o=[];return t.children.inorderTraversal(((t,i)=>{const a=n?n.getImmediateChild(t):null,s=bu(r,t),l=e.operationForChild(t);l&&(o=o.concat(ad(l,i,a,s)))})),i&&(o=o.concat(Mu(i,e,r,n))),o}function sd(e,t){const n=t.query,r=ld(e,n);return{hashFn:()=>{const e=function(e){return e.viewCache_.serverCache.getNode()}(t)||uc.EMPTY_NODE;return e.hash()},onComplete:t=>{if("ok"===t)return r?function(e,t,n){const r=ud(e,n);if(r){const n=dd(r),i=n.path,o=n.queryId,a=Nl(i,t);return hd(e,i,new Oc(Dc(o),a))}return[]}(e,n._path,r):function(e,t){return id(e,new Oc({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t))}(e,n._path);{const r=function(e,t){let n="Unknown Error";"too_big"===e?n="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"===e?n="Client doesn't have permission to access the desired data.":"unavailable"===e&&(n="The service is unavailable");const r=new Error(e+" at "+t._path.toString()+": "+n);return r.code=e.toUpperCase(),r}(t,n);return ed(e,n,null,r)}}}}function ld(e,t){const n=cd(t);return e.queryToTagMap.get(n)}function cd(e){return e._path.toString()+"$"+e._queryIdentifier}function ud(e,t){return e.tagToQueryMap.get(t)}function dd(e){const t=e.indexOf("$");return Pr(-1!==t&&t<e.length-1,"Bad queryKey."),{queryId:e.substr(t+1),path:new vl(e.substr(0,t))}}function hd(e,t,n){const r=e.syncPointTree_.get(t);Pr(r,"Missing sync point for query tag that we're tracking");return Mu(r,n,ou(e.pendingWriteTree_,t),null)}function pd(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new(Pr(Lu,"Reference.ts has not been loaded"),Lu)(e._repo,e._path):e}class fd{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new fd(t)}node(){return this.node_}}class gd{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Tl(this.path_,e);return new gd(this.syncTree_,t)}node(){return rd(this.syncTree_,this.path_)}}const md=function(e,t,n){return e&&"object"===typeof e?(Pr(".sv"in e,"Unexpected leaf node or priority contents"),"string"===typeof e[".sv"]?bd(e[".sv"],t,n):"object"===typeof e[".sv"]?yd(e[".sv"],t):void Pr(!1,"Unexpected server value: "+JSON.stringify(e,null,2))):e},bd=function(e,t,n){if("timestamp"===e)return n.timestamp;Pr(!1,"Unexpected server value: "+e)},yd=function(e,t,n){e.hasOwnProperty("increment")||Pr(!1,"Unexpected server value: "+JSON.stringify(e,null,2));const r=e.increment;"number"!==typeof r&&Pr(!1,"Unexpected increment value: "+r);const i=t.node();if(Pr(null!==i&&"undefined"!==typeof i,"Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return"number"!==typeof o?r:o+r},vd=function(e,t,n,r){return wd(t,new gd(n,e),r)},xd=function(e,t,n){return wd(e,new fd(t),n)};function wd(e,t,n){const r=e.getPriority().val(),i=md(r,t.getImmediateChild(".priority"),n);let o;if(e.isLeafNode()){const r=e,o=md(r.getValue(),t,n);return o!==r.getValue()||i!==r.getPriority().val()?new tc(o,hc(i)):e}{const r=e;return o=r,i!==r.getPriority().val()&&(o=o.updatePriority(new tc(i))),r.forEachChild(nc,((e,r)=>{const i=wd(r,t.getImmediateChild(e),n);i!==r&&(o=o.updateImmediateChild(e,i))})),o}}class _d{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:{},childCount:0};this.name=e,this.parent=t,this.node=n}}function kd(e,t){let n=t instanceof vl?t:new vl(t),r=e,i=wl(n);for(;null!==i;){const e=oi(r.node.children,i)||{children:{},childCount:0};r=new _d(i,r,e),n=kl(n),i=wl(n)}return r}function Cd(e){return e.node.value}function Sd(e,t){e.node.value=t,jd(e)}function Ed(e){return e.node.childCount>0}function Td(e,t){Bs(e.node.children,((n,r)=>{t(new _d(n,e,r))}))}function Id(e,t,n,r){n&&!r&&t(e),Td(e,(e=>{Id(e,t,!0,r)})),n&&r&&t(e)}function Nd(e){return new vl(null===e.parent?e.name:Nd(e.parent)+"/"+e.name)}function jd(e){null!==e.parent&&function(e,t,n){const r=function(e){return void 0===Cd(e)&&!Ed(e)}(n),i=ii(e.node.children,t);r&&i?(delete e.node.children[t],e.node.childCount--,jd(e)):r||i||(e.node.children[t]=n.node,e.node.childCount++,jd(e))}(e.parent,e.name,e)}const Pd=/[\[\].#$\/\u0000-\u001F\u007F]/,Rd=/[\[\].#$\u0000-\u001F\u007F]/,Dd=10485760,Fd=function(e){return"string"===typeof e&&0!==e.length&&!Pd.test(e)},Od=function(e){return"string"===typeof e&&0!==e.length&&!Rd.test(e)},Ld=function(e){return null===e||"string"===typeof e||"number"===typeof e&&!Fs(e)||e&&"object"===typeof e&&ii(e,".sv")},Ad=function(e,t,n,r){r&&void 0===t||Md(di(e,"value"),t,n)},Md=function(e,t,n){const r=n instanceof vl?new Dl(n,e):n;if(void 0===t)throw new Error(e+"contains undefined "+Ol(r));if("function"===typeof t)throw new Error(e+"contains a function "+Ol(r)+" with contents = "+t.toString());if(Fs(t))throw new Error(e+"contains "+t.toString()+" "+Ol(r));if("string"===typeof t&&t.length>Dd/3&&hi(t)>Dd)throw new Error(e+"contains a string greater than "+Dd+" utf8 bytes "+Ol(r)+" ('"+t.substring(0,50)+"...')");if(t&&"object"===typeof t){let n=!1,i=!1;if(Bs(t,((t,o)=>{if(".value"===t)n=!0;else if(".priority"!==t&&".sv"!==t&&(i=!0,!Fd(t)))throw new Error(e+" contains an invalid key ("+t+") "+Ol(r)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');!function(e,t){e.parts_.length>0&&(e.byteLength_+=1),e.parts_.push(t),e.byteLength_+=hi(t),Fl(e)}(r,t),Md(e,o,r),function(e){const t=e.parts_.pop();e.byteLength_-=hi(t),e.parts_.length>0&&(e.byteLength_-=1)}(r)})),n&&i)throw new Error(e+' contains ".value" child '+Ol(r)+" in addition to actual children.")}},zd=function(e,t,n,r){if(r&&void 0===t)return;const i=di(e,"values");if(!t||"object"!==typeof t||Array.isArray(t))throw new Error(i+" must be an object containing the children to replace.");const o=[];Bs(t,((e,t)=>{const r=new vl(e);if(Md(i,t,Tl(n,r)),".priority"===Cl(r)&&!Ld(t))throw new Error(i+"contains an invalid value for '"+r.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");o.push(r)})),function(e,t){let n,r;for(n=0;n<t.length;n++){r=t[n];const i=Sl(r);for(let t=0;t<i.length;t++)if(".priority"===i[t]&&t===i.length-1);else if(!Fd(i[t]))throw new Error(e+"contains an invalid key ("+i[t]+") in path "+r.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"')}t.sort(jl);let i=null;for(n=0;n<t.length;n++){if(r=t[n],null!==i&&Rl(i,r))throw new Error(e+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}}(i,o)},$d=function(e,t,n,r){if((!r||void 0!==n)&&!Od(n))throw new Error(di(e,t)+'was an invalid path = "'+n+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')},Ud=function(e,t){if(".info"===wl(t))throw new Error(e+" failed = Can't modify data under /.info/")},Bd=function(e,t){const n=t.path.toString();if("string"!==typeof t.repoInfo.host||0===t.repoInfo.host.length||!Fd(t.repoInfo.namespace)&&"localhost"!==t.repoInfo.host.split(":")[0]||0!==n.length&&!function(e){return e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),Od(e)}(n))throw new Error(di(e,"url")+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')};class Wd{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Hd(e,t){let n=null;for(let r=0;r<t.length;r++){const i=t[r],o=i.getPath();null===n||Pl(o,n.path)||(e.eventLists_.push(n),n=null),null===n&&(n={events:[],path:o}),n.events.push(i)}n&&e.eventLists_.push(n)}function qd(e,t,n){Hd(e,n),Kd(e,(e=>Pl(e,t)))}function Vd(e,t,n){Hd(e,n),Kd(e,(e=>Rl(e,t)||Rl(t,e)))}function Kd(e,t){e.recursionDepth_++;let n=!0;for(let r=0;r<e.eventLists_.length;r++){const i=e.eventLists_[r];if(i){t(i.path)?(Yd(e.eventLists_[r]),e.eventLists_[r]=null):n=!1}}n&&(e.eventLists_=[]),e.recursionDepth_--}function Yd(e){for(let t=0;t<e.events.length;t++){const n=e.events[t];if(null!==n){e.events[t]=null;const r=n.getEventRunner();Es&&Ns("event: "+n.toString()),Vs(r)}}}const Gd="repo_interrupt";class Qd{constructor(e,t,n,r){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Wd,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Tc(),this.transactionQueueTree_=new _d,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Xd(e,t,n){if(e.stats_=sl(e.repoInfo_),e.forceRestClient_||("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0)e.server_=new Sc(e.repoInfo_,((t,n,r,i)=>{eh(e,t,n,r,i)}),e.authTokenProvider_,e.appCheckProvider_),setTimeout((()=>th(e,!0)),0);else{if("undefined"!==typeof n&&null!==n){if("object"!==typeof n)throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ni(n)}catch(ik){throw new Error("Invalid authOverride provided: "+ik)}}e.persistentConnection_=new Ml(e.repoInfo_,t,((t,n,r,i)=>{eh(e,t,n,r,i)}),(t=>{th(e,t)}),(t=>{!function(e,t){Bs(t,((t,n)=>{nh(e,t,n)}))}(e,t)}),e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener((t=>{e.server_.refreshAuthToken(t)})),e.appCheckProvider_.addTokenChangeListener((t=>{e.server_.refreshAppCheckToken(t.token)})),e.statsReporter_=function(e,t){const n=e.toString();return al[n]||(al[n]=t()),al[n]}(e.repoInfo_,(()=>new Pc(e.stats_,e.server_))),e.infoData_=new Ec,e.infoSyncTree_=new Gu({startListening:(t,n,r,i)=>{let o=[];const a=e.infoData_.getNode(t._path);return a.isEmpty()||(o=Zu(e.infoSyncTree_,t._path,a),setTimeout((()=>{i("ok")}),0)),o},stopListening:()=>{}}),nh(e,"connected",!1),e.serverSyncTree_=new Gu({startListening:(t,n,r,i)=>(e.server_.listen(t,r,n,((n,r)=>{const o=i(n,r);Vd(e.eventQueue_,t._path,o)})),[]),stopListening:(t,n)=>{e.server_.unlisten(t,n)}})}function Jd(e){const t=e.infoData_.getNode(new vl(".info/serverTimeOffset")).val()||0;return(new Date).getTime()+t}function Zd(e){return(t=(t={timestamp:Jd(e)})||{}).timestamp=t.timestamp||(new Date).getTime(),t;var t}function eh(e,t,n,r,i){e.dataUpdateCount++;const o=new vl(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let a=[];if(i)if(r){const t=si(n,(e=>hc(e)));a=function(e,t,n,r){const i=ud(e,r);if(i){const r=dd(i),o=r.path,a=r.queryId,s=Nl(o,t),l=Kc.fromObject(n);return hd(e,o,new Ac(Dc(a),s,l))}return[]}(e.serverSyncTree_,o,t,i)}else{const t=hc(n);a=td(e.serverSyncTree_,o,t,i)}else if(r){const t=si(n,(e=>hc(e)));a=function(e,t,n){const r=Kc.fromObject(n);return id(e,new Ac({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,r))}(e.serverSyncTree_,o,t)}else{const t=hc(n);a=Zu(e.serverSyncTree_,o,t)}let s=o;a.length>0&&(s=dh(e,o)),Vd(e.eventQueue_,s,a)}function th(e,t){nh(e,"connected",t),!1===t&&function(e){sh(e,"onDisconnectEvents");const t=Zd(e),n=Tc();Nc(e.onDisconnect_,xl(),((r,i)=>{const o=vd(r,i,e.serverSyncTree_,t);Ic(n,r,o)}));let r=[];Nc(n,xl(),((t,n)=>{r=r.concat(Zu(e.serverSyncTree_,t,n));const i=mh(e,t);dh(e,i)})),e.onDisconnect_=Tc(),Vd(e.eventQueue_,xl(),r)}(e)}function nh(e,t,n){const r=new vl("/.info/"+t),i=hc(n);e.infoData_.updateSnapshot(r,i);const o=Zu(e.infoSyncTree_,r,i);Vd(e.eventQueue_,r,o)}function rh(e){return e.nextWriteId_++}function ih(e,t,n,r,i){sh(e,"set",{path:t.toString(),value:n,priority:r});const o=Zd(e),a=hc(n,r),s=rd(e.serverSyncTree_,t),l=xd(a,s,o),c=rh(e),u=Qu(e.serverSyncTree_,t,l,c,!0);Hd(e.eventQueue_,u),e.server_.put(t.toString(),a.val(!0),((n,r)=>{const o="ok"===n;o||Ds("set at "+t+" failed: "+n);const a=Ju(e.serverSyncTree_,c,!o);Vd(e.eventQueue_,t,a),lh(e,i,n,r)}));const d=mh(e,t);dh(e,d),Vd(e.eventQueue_,d,[])}function oh(e,t,n){let r;r=".info"===wl(t._path)?ed(e.infoSyncTree_,t,n):ed(e.serverSyncTree_,t,n),qd(e.eventQueue_,t._path,r)}function ah(e){e.persistentConnection_&&e.persistentConnection_.interrupt(Gd)}function sh(e){let t="";e.persistentConnection_&&(t=e.persistentConnection_.id+":");for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];Ns(t,...r)}function lh(e,t,n,r){t&&Vs((()=>{if("ok"===n)t(null);else{const e=(n||"error").toUpperCase();let i=e;r&&(i+=": "+r);const o=new Error(i);o.code=e,t(o)}}))}function ch(e,t,n){return rd(e.serverSyncTree_,t,n)||uc.EMPTY_NODE}function uh(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.transactionQueueTree_;if(t||gh(e,t),Cd(t)){const n=ph(e,t);Pr(n.length>0,"Sending zero length transaction queue");n.every((e=>0===e.status))&&function(e,t,n){const r=n.map((e=>e.currentWriteId)),i=ch(e,t,r);let o=i;const a=i.hash();for(let c=0;c<n.length;c++){const e=n[c];Pr(0===e.status,"tryToSendTransactionQueue_: items in queue should all be run."),e.status=1,e.retryCount++;const r=Nl(t,e.path);o=o.updateChild(r,e.currentOutputSnapshotRaw)}const s=o.val(!0),l=t;e.server_.put(l.toString(),s,(r=>{sh(e,"transaction put response",{path:l.toString(),status:r});let i=[];if("ok"===r){const r=[];for(let t=0;t<n.length;t++)n[t].status=2,i=i.concat(Ju(e.serverSyncTree_,n[t].currentWriteId)),n[t].onComplete&&r.push((()=>n[t].onComplete(null,!0,n[t].currentOutputSnapshotResolved))),n[t].unwatcher();gh(e,kd(e.transactionQueueTree_,t)),uh(e,e.transactionQueueTree_),Vd(e.eventQueue_,t,i);for(let e=0;e<r.length;e++)Vs(r[e])}else{if("datastale"===r)for(let e=0;e<n.length;e++)3===n[e].status?n[e].status=4:n[e].status=0;else{Ds("transaction at "+l.toString()+" failed: "+r);for(let e=0;e<n.length;e++)n[e].status=4,n[e].abortReason=r}dh(e,t)}}),a)}(e,Nd(t),n)}else Ed(t)&&Td(t,(t=>{uh(e,t)}))}function dh(e,t){const n=hh(e,t),r=Nd(n);return function(e,t,n){if(0===t.length)return;const r=[];let i=[];const o=t.filter((e=>0===e.status)),a=o.map((e=>e.currentWriteId));for(let l=0;l<t.length;l++){const o=t[l],c=Nl(n,o.path);let u,d=!1;if(Pr(null!==c,"rerunTransactionsUnderNode_: relativePath should not be null."),4===o.status)d=!0,u=o.abortReason,i=i.concat(Ju(e.serverSyncTree_,o.currentWriteId,!0));else if(0===o.status)if(o.retryCount>=25)d=!0,u="maxretry",i=i.concat(Ju(e.serverSyncTree_,o.currentWriteId,!0));else{const n=ch(e,o.path,a);o.currentInputSnapshot=n;const r=t[l].update(n.val());if(void 0!==r){Md("transaction failed: Data returned ",r,o.path);let t=hc(r);"object"===typeof r&&null!=r&&ii(r,".priority")||(t=t.updatePriority(n.getPriority()));const s=o.currentWriteId,l=Zd(e),c=xd(t,n,l);o.currentOutputSnapshotRaw=t,o.currentOutputSnapshotResolved=c,o.currentWriteId=rh(e),a.splice(a.indexOf(s),1),i=i.concat(Qu(e.serverSyncTree_,o.path,c,o.currentWriteId,o.applyLocally)),i=i.concat(Ju(e.serverSyncTree_,s,!0))}else d=!0,u="nodata",i=i.concat(Ju(e.serverSyncTree_,o.currentWriteId,!0))}Vd(e.eventQueue_,n,i),i=[],d&&(t[l].status=2,s=t[l].unwatcher,setTimeout(s,Math.floor(0)),t[l].onComplete&&("nodata"===u?r.push((()=>t[l].onComplete(null,!1,t[l].currentInputSnapshot))):r.push((()=>t[l].onComplete(new Error(u),!1,null)))))}var s;gh(e,e.transactionQueueTree_);for(let l=0;l<r.length;l++)Vs(r[l]);uh(e,e.transactionQueueTree_)}(e,ph(e,n),r),r}function hh(e,t){let n,r=e.transactionQueueTree_;for(n=wl(t);null!==n&&void 0===Cd(r);)r=kd(r,n),n=wl(t=kl(t));return r}function ph(e,t){const n=[];return fh(e,t,n),n.sort(((e,t)=>e.order-t.order)),n}function fh(e,t,n){const r=Cd(t);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);Td(t,(t=>{fh(e,t,n)}))}function gh(e,t){const n=Cd(t);if(n){let e=0;for(let t=0;t<n.length;t++)2!==n[t].status&&(n[e]=n[t],e++);n.length=e,Sd(t,n.length>0?n:void 0)}Td(t,(t=>{gh(e,t)}))}function mh(e,t){const n=Nd(hh(e,t)),r=kd(e.transactionQueueTree_,t);return function(e,t,n){let r=n?e:e.parent;for(;null!==r;){if(t(r))return!0;r=r.parent}}(r,(t=>{bh(e,t)})),bh(e,r),Id(r,(t=>{bh(e,t)})),n}function bh(e,t){const n=Cd(t);if(n){const r=[];let i=[],o=-1;for(let t=0;t<n.length;t++)3===n[t].status||(1===n[t].status?(Pr(o===t-1,"All SENT items should be at beginning of queue."),o=t,n[t].status=3,n[t].abortReason="set"):(Pr(0===n[t].status,"Unexpected transaction status in abort"),n[t].unwatcher(),i=i.concat(Ju(e.serverSyncTree_,n[t].currentWriteId,!0)),n[t].onComplete&&r.push(n[t].onComplete.bind(null,new Error("set"),!1,null))));-1===o?Sd(t,void 0):n.length=o+1,Vd(e.eventQueue_,Nd(t),i);for(let e=0;e<r.length;e++)Vs(r[e])}}const yh=function(e,t){const n=vh(e),r=n.namespace;"firebase.com"===n.domain&&Rs(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),r&&"undefined"!==r||"localhost"===n.domain||Rs("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&Ds("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");const i="ws"===n.scheme||"wss"===n.scheme;return{repoInfo:new nl(n.host,n.secure,r,i,t,"",r!==n.subdomain),path:new vl(n.pathString)}},vh=function(e){let t="",n="",r="",i="",o="",a=!0,s="https",l=443;if("string"===typeof e){let c=e.indexOf("//");c>=0&&(s=e.substring(0,c-1),e=e.substring(c+2));let u=e.indexOf("/");-1===u&&(u=e.length);let d=e.indexOf("?");-1===d&&(d=e.length),t=e.substring(0,Math.min(u,d)),u<d&&(i=function(e){let t="";const n=e.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let e=n[r];try{e=decodeURIComponent(e.replace(/\+/g," "))}catch(ik){}t+="/"+e}return t}(e.substring(u,d)));const h=function(e){const t={};"?"===e.charAt(0)&&(e=e.substring(1));for(const n of e.split("&")){if(0===n.length)continue;const r=n.split("=");2===r.length?t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Ds(`Invalid query segment '${n}' in query '${e}'`)}return t}(e.substring(Math.min(e.length,d)));c=t.indexOf(":"),c>=0?(a="https"===s||"wss"===s,l=parseInt(t.substring(c+1),10)):c=t.length;const p=t.slice(0,c);if("localhost"===p.toLowerCase())n="localhost";else if(p.split(".").length<=2)n=p;else{const e=t.indexOf(".");r=t.substring(0,e).toLowerCase(),n=t.substring(e+1),o=r}"ns"in h&&(o=h.ns)}return{host:t,port:l,domain:n,subdomain:r,secure:a,scheme:s,pathString:i,namespace:o}},xh="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",wh=function(){let e=0;const t=[];return function(n){const r=n===e;let i;e=n;const o=new Array(8);for(i=7;i>=0;i--)o[i]=xh.charAt(n%64),n=Math.floor(n/64);Pr(0===n,"Cannot push at time == 0");let a=o.join("");if(r){for(i=11;i>=0&&63===t[i];i--)t[i]=0;t[i]++}else for(i=0;i<12;i++)t[i]=Math.floor(64*Math.random());for(i=0;i<12;i++)a+=xh.charAt(t[i]);return Pr(20===a.length,"nextPushId: Length should be 20."),a}}();class _h{constructor(e,t,n,r){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=r}getPath(){const e=this.snapshot.ref;return"value"===this.eventType?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ni(this.snapshot.exportVal())}}class kh{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}class Ch{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return Pr(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||void 0!==this.snapshotCallback.userCallback&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}class Sh{constructor(e,t,n,r){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=r}get key(){return Il(this._path)?null:Cl(this._path)}get ref(){return new Eh(this._repo,this._path)}get _queryIdentifier(){const e=Cc(this._queryParams),t=$s(e);return"{}"===t?"default":t}get _queryObject(){return Cc(this._queryParams)}isEqual(e){if(!((e=pi(e))instanceof Sh))return!1;const t=this._repo===e._repo,n=Pl(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return t&&n&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+function(e){let t="";for(let n=e.pieceNum_;n<e.pieces_.length;n++)""!==e.pieces_[n]&&(t+="/"+encodeURIComponent(String(e.pieces_[n])));return t||"/"}(this._path)}}class Eh extends Sh{constructor(e,t){super(e,t,new _c,!1)}get parent(){const e=El(this._path);return null===e?null:new Eh(this._repo,e)}get root(){let e=this;for(;null!==e.parent;)e=e.parent;return e}}class Th{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new vl(e),n=Nh(this.ref,e);return new Th(this._node.getChild(t),n,nc)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){if(this._node.isLeafNode())return!1;return!!this._node.forEachChild(this._index,((t,n)=>e(new Th(n,Nh(this.ref,t),nc))))}hasChild(e){const t=new vl(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return!this._node.isLeafNode()&&!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Ih(e,t){return(e=pi(e))._checkNotDeleted("ref"),void 0!==t?Nh(e._root,t):e._root}function Nh(e,t){var n,r,i,o;return null===wl((e=pi(e))._path)?(n="child",r="path",o=!1,(i=t)&&(i=i.replace(/^\/*\.info(\/|$)/,"/")),$d(n,r,i,o)):$d("child","path",t,!1),new Eh(e._repo,Tl(e._path,t))}function jh(e,t){e=pi(e),Ud("push",e._path),Ad("push",t,e._path,!0);const n=Jd(e._repo),r=wh(n),i=Nh(e,r),o=Nh(e,r);let a;return a=null!=t?Ph(o,t).then((()=>o)):Promise.resolve(o),i.then=a.then.bind(a),i.catch=a.then.bind(a,void 0),i}function Ph(e,t){e=pi(e),Ud("set",e._path),Ad("set",t,e._path,!1);const n=new qr;return ih(e._repo,e._path,t,null,n.wrapCallback((()=>{}))),n.promise}function Rh(e,t){zd("update",t,e._path,!1);const n=new qr;return function(e,t,n,r){sh(e,"update",{path:t.toString(),value:n});let i=!0;const o=Zd(e),a={};if(Bs(n,((n,r)=>{i=!1,a[n]=vd(Tl(t,n),hc(r),e.serverSyncTree_,o)})),i)Ns("update() called with empty data.  Don't do anything."),lh(0,r,"ok",void 0);else{const i=rh(e),o=Xu(e.serverSyncTree_,t,a,i);Hd(e.eventQueue_,o),e.server_.merge(t.toString(),n,((n,o)=>{const a="ok"===n;a||Ds("update at "+t+" failed: "+n);const s=Ju(e.serverSyncTree_,i,!a),l=s.length>0?dh(e,t):t;Vd(e.eventQueue_,l,s),lh(0,r,n,o)})),Bs(n,(n=>{const r=mh(e,Tl(t,n));dh(e,r)})),Vd(e.eventQueue_,t,[])}}(e._repo,e._path,t,n.wrapCallback((()=>{}))),n.promise}class Dh{constructor(e){this.callbackContext=e}respondsTo(e){return"value"===e}createEvent(e,t){const n=t._queryParams.getIndex();return new _h("value",this,new Th(e.snapshotNode,new Eh(t._repo,t._path),n))}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new kh(this,e,t):null}matches(e){return e instanceof Dh&&(!e.callbackContext||!this.callbackContext||e.callbackContext.matches(this.callbackContext))}hasAnyCallback(){return null!==this.callbackContext}}class Fh{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t="children_added"===e?"child_added":e;return t="children_removed"===t?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new kh(this,e,t):null}createEvent(e,t){Pr(null!=e.childName,"Child events should have a childName.");const n=Nh(new Eh(t._repo,t._path),e.childName),r=t._queryParams.getIndex();return new _h(e.type,this,new Th(e.snapshotNode,n,r),e.prevName)}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Fh&&(this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)))}hasAnyCallback(){return!!this.callbackContext}}function Oh(e,t,n,r,i){let o;if("object"===typeof r&&(o=void 0,i=r),"function"===typeof r&&(o=r),i&&i.onlyOnce){const t=n,r=(n,r)=>{oh(e._repo,e,s),t(n,r)};r.userCallback=n.userCallback,r.context=n.context,n=r}const a=new Ch(n,o||void 0),s="value"===t?new Dh(a):new Fh(t,a);return function(e,t,n){let r;r=".info"===wl(t._path)?nd(e.infoSyncTree_,t,n):nd(e.serverSyncTree_,t,n),qd(e.eventQueue_,t._path,r)}(e._repo,e,s),()=>oh(e._repo,e,s)}function Lh(e,t,n,r){return Oh(e,"value",t,n,r)}function Ah(e,t,n){let r=null;const i=n?new Ch(n):null;"value"===t?r=new Dh(i):t&&(r=new Fh(t,i)),oh(e._repo,e,r)}!function(e){Pr(!Ou,"__referenceConstructor has already been defined"),Ou=e}(Eh),function(e){Pr(!Lu,"__referenceConstructor has already been defined"),Lu=e}(Eh);const Mh={};let zh=!1;function $h(e,t,n,r,i){let o=r||e.options.databaseURL;void 0===o&&(e.options.projectId||Rs("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ns("Using default host for project ",e.options.projectId),o=`${e.options.projectId}-default-rtdb.firebaseio.com`);let a,s,l=yh(o,i),c=l.repoInfo;"undefined"!==typeof process&&(s={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_VAPID_KEY:""}.FIREBASE_DATABASE_EMULATOR_HOST),s?(a=!0,o=`http://${s}?ns=${c.namespace}`,l=yh(o,i),c=l.repoInfo):a=!l.repoInfo.secure;const u=i&&a?new Qs(Qs.OWNER):new Gs(e.name,e.options,t);Bd("Invalid Firebase Database URL",l),Il(l.path)||Rs("Database URL must point to the root of a Firebase Database (not including a child path).");const d=function(e,t,n,r){let i=Mh[t.name];i||(i={},Mh[t.name]=i);let o=i[e.toURLString()];o&&Rs("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");return o=new Qd(e,zh,n,r),i[e.toURLString()]=o,o}(c,e,u,new Ys(e.name,n));return new Uh(d,e)}class Uh{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Xd(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Eh(this._repo,xl())),this._rootInternal}_delete(){return null!==this._rootInternal&&(!function(e,t){const n=Mh[t];n&&n[e.key]===e||Rs(`Database ${t}(${e.repoInfo_}) has already been deleted.`),ah(e),delete n[e.key]}(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){null===this._rootInternal&&Rs("Cannot call "+e+" on a deleted database.")}}const Bh={".sv":"timestamp"};function Wh(){return Bh}class Hh{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function qh(e,t,n){var r;if(e=pi(e),Ud("Reference.transaction",e._path),".length"===e.key||".keys"===e.key)throw"Reference.transaction failed: "+e.key+" is a read-only object.";const i=null===(r=null===n||void 0===n?void 0:n.applyLocally)||void 0===r||r,o=new qr,a=Lh(e,(()=>{}));return function(e,t,n,r,i,o){sh(e,"transaction on "+t);const a={path:t,update:n,onComplete:r,status:null,order:ks(),applyLocally:o,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},s=ch(e,t,void 0);a.currentInputSnapshot=s;const l=a.update(s.val());if(void 0===l)a.unwatcher(),a.currentOutputSnapshotRaw=null,a.currentOutputSnapshotResolved=null,a.onComplete&&a.onComplete(null,!1,a.currentInputSnapshot);else{Md("transaction failed: Data returned ",l,a.path),a.status=0;const n=kd(e.transactionQueueTree_,t),r=Cd(n)||[];let i;r.push(a),Sd(n,r),"object"===typeof l&&null!==l&&ii(l,".priority")?(i=oi(l,".priority"),Pr(Ld(i),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):i=(rd(e.serverSyncTree_,t)||uc.EMPTY_NODE).getPriority().val();const o=Zd(e),c=hc(l,i),u=xd(c,s,o);a.currentOutputSnapshotRaw=c,a.currentOutputSnapshotResolved=u,a.currentWriteId=rh(e);const d=Qu(e.serverSyncTree_,t,u,a.currentWriteId,a.applyLocally);Vd(e.eventQueue_,t,d),uh(e,e.transactionQueueTree_)}}(e._repo,e._path,t,((t,n,r)=>{let i=null;t?o.reject(t):(i=new Th(r,new Eh(e._repo,e._path),nc),o.resolve(new Hh(n,i)))}),a,i),o.promise}Ml.prototype.simpleListen=function(e,t){this.sendRequest("q",{p:e},t)},Ml.prototype.echo=function(e,t){this.sendRequest("echo",{d:e},t)};!function(e){ms(Po),To(new fi("database",((e,t)=>{let{instanceIdentifier:n}=t;return $h(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),n)}),"PUBLIC").setMultipleInstances(!0)),Fo(ps,fs,e),Fo(ps,fs,"esm2017")}();Fo("firebase","10.14.1","app");const Vh="firebasestorage.googleapis.com",Kh="storageBucket";class Yh extends Jr{constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;super(Xh(e),`Firebase Storage: ${t} (${Xh(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Yh.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Xh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var Gh,Qh;function Xh(e){return"storage/"+e}function Jh(){return new Yh(Gh.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function Zh(){return new Yh(Gh.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function ep(){return new Yh(Gh.CANCELED,"User canceled the upload/download.")}function tp(){return new Yh(Gh.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function np(e){return new Yh(Gh.INVALID_ARGUMENT,e)}function rp(){return new Yh(Gh.APP_DELETED,"The Firebase app was deleted.")}function ip(e,t){return new Yh(Gh.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function op(e){throw new Yh(Gh.INTERNAL_ERROR,"Internal error: "+e)}!function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"}(Gh||(Gh={}));class ap{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=ap.makeFromUrl(e,t)}catch(ik){return new ap(e,"")}if(""===n.path)return n;throw r=e,new Yh(Gh.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.");var r}static makeFromUrl(e,t){let n=null;const r="([A-Za-z0-9.\\-_]+)";const i=new RegExp("^gs://"+r+"(/(.*))?$","i");function o(e){e.path_=decodeURIComponent(e.path)}const a=t.replace(/[.]/g,"\\."),s=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${a}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:o},{regex:new RegExp(`^https?://${t===Vh?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:o}];for(let l=0;l<s.length;l++){const t=s[l],r=t.regex.exec(e);if(r){const e=r[t.indices.bucket];let i=r[t.indices.path];i||(i=""),n=new ap(e,i),t.postModify(n);break}}if(null==n)throw function(e){return new Yh(Gh.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return n}}class sp{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(){}}function lp(e){return"string"===typeof e||e instanceof String}function cp(e){return up()&&e instanceof Blob}function up(){return"undefined"!==typeof Blob}function dp(e,t,n,r){if(r<t)throw np(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw np(`Invalid value for '${e}'. Expected ${n} or less.`)}function hp(e,t,n){let r=t;return null==n&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function pp(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){n=n+(t(r)+"="+t(e[r]))+"&"}return n=n.slice(0,-1),n}function fp(e,t){const n=e>=500&&e<600,r=-1!==[408,429].indexOf(e),i=-1!==t.indexOf(e);return n||r||i}!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(Qh||(Qh={}));class gp{constructor(e,t,n,r,i,o,a,s,l,c,u){let d=!(arguments.length>11&&void 0!==arguments[11])||arguments[11];this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=s,this.timeout_=l,this.progressCallback_=c,this.connectionFactory_=u,this.retry=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise(((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()}))}start_(){const e=(e,t)=>{if(t)return void e(!1,new mp(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then((()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const t=n.getErrorCode()===Qh.NO_ERROR,i=n.getStatus();if(!t||fp(i,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===Qh.ABORT;return void e(!1,new mp(!1,null,t))}const o=-1!==this.successCodes_.indexOf(i);e(!0,new mp(o,n))}))},t=(e,t)=>{const n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(i,i.getResponse());void 0!==e?n(e):n()}catch(ik){r(ik)}else if(null!==i){const e=Jh();e.serverResponse=i.getErrorText(),this.errorCallback_?r(this.errorCallback_(i,e)):r(e)}else if(t.canceled){r(this.appDelete_?rp():ep())}else{r(Zh())}};this.canceled_?t(0,new mp(!1,null,!0)):this.backoffId_=function(e,t,n){let r=1,i=null,o=null,a=!1,s=0;function l(){return 2===s}let c=!1;function u(){if(!c){c=!0;for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];t.apply(null,n)}}function d(t){i=setTimeout((()=>{i=null,e(p,l())}),t)}function h(){o&&clearTimeout(o)}function p(e){if(c)return void h();for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];if(e)return h(),void u.call(null,e,...n);if(l()||a)return h(),void u.call(null,e,...n);let o;r<64&&(r*=2),1===s?(s=2,o=0):o=1e3*(r+Math.random()),d(o)}let f=!1;function g(e){f||(f=!0,h(),c||(null!==i?(e||(s=2),clearTimeout(i),d(0)):e||(s=1)))}return d(0),o=setTimeout((()=>{a=!0,g(!0)}),n),g}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class mp{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function bp(){return"undefined"!==typeof BlobBuilder?BlobBuilder:"undefined"!==typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function yp(){const e=bp();for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if(void 0!==e){const t=new e;for(let e=0;e<n.length;e++)t.append(n[e]);return t.getBlob()}if(up())return new Blob(n);throw new Yh(Gh.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}function vp(e){if("undefined"===typeof atob)throw t="base-64",new Yh(Gh.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`);var t;return atob(e)}const xp="raw",wp="base64",_p="base64url",kp="data_url";class Cp{constructor(e,t){this.data=e,this.contentType=t||null}}function Sp(e,t){switch(e){case xp:return new Cp(Ep(t));case wp:case _p:return new Cp(Tp(e,t));case kp:return new Cp(function(e){const t=new Ip(e);return t.base64?Tp(wp,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(ik){throw ip(kp,"Malformed data URL.")}return Ep(t)}(t.rest)}(t),new Ip(t).contentType)}throw Jh()}function Ep(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|63&r);else if(55296===(64512&r)){if(n<e.length-1&&56320===(64512&e.charCodeAt(n+1))){r=65536|(1023&r)<<10|1023&e.charCodeAt(++n),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else t.push(239,191,189)}else 56320===(64512&r)?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function Tp(e,t){switch(e){case wp:{const n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r){throw ip(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?")}break}case _p:{const n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r){throw ip(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?")}t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=vp(t)}catch(ik){if(ik.message.includes("polyfill"))throw ik;throw ip(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}class Ip{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw ip(kp,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;null!=n&&(this.base64=function(e,t){if(!(e.length>=t.length))return!1;return e.substring(e.length-t.length)===t}(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}class Np{constructor(e,t){let n=0,r="";cp(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(cp(this.data_)){const n=function(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}(this.data_,e,t);return null===n?null:new Np(n)}{const n=new Uint8Array(this.data_.buffer,e,t-e);return new Np(n,!0)}}static getBlob(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];if(up()){const e=t.map((e=>e instanceof Np?e.data_:e));return new Np(yp.apply(null,e))}{const e=t.map((e=>lp(e)?Sp(xp,e).data:e.data_));let n=0;e.forEach((e=>{n+=e.byteLength}));const r=new Uint8Array(n);let i=0;return e.forEach((e=>{for(let t=0;t<e.length;t++)r[i++]=e[t]})),new Np(r,!0)}}uploadData(){return this.data_}}function jp(e){let t;try{t=JSON.parse(e)}catch(ik){return null}return"object"!==typeof(n=t)||Array.isArray(n)?null:t;var n}function Pp(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}function Rp(e,t){return t}class Dp{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||Rp}}let Fp=null;function Op(){if(Fp)return Fp;const e=[];e.push(new Dp("bucket")),e.push(new Dp("generation")),e.push(new Dp("metageneration")),e.push(new Dp("name","fullPath",!0));const t=new Dp("name");t.xform=function(e,t){return function(e){return!lp(e)||e.length<2?e:Pp(e)}(t)},e.push(t);const n=new Dp("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new Dp("timeCreated")),e.push(new Dp("updated")),e.push(new Dp("md5Hash",null,!0)),e.push(new Dp("cacheControl",null,!0)),e.push(new Dp("contentDisposition",null,!0)),e.push(new Dp("contentEncoding",null,!0)),e.push(new Dp("contentLanguage",null,!0)),e.push(new Dp("contentType",null,!0)),e.push(new Dp("metadata","customMetadata",!0)),Fp=e,Fp}function Lp(e,t,n){const r={type:"file"},i=n.length;for(let o=0;o<i;o++){const e=n[o];r[e.local]=e.xform(r,t[e.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){const n=e.bucket,r=e.fullPath,i=new ap(n,r);return t._makeStorageReference(i)}})}(r,e),r}function Ap(e,t,n){const r=jp(t);if(null===r)return null;return Lp(e,r,n)}function Mp(e,t){const n={},r=t.length;for(let i=0;i<r;i++){const r=t[i];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}class zp{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}function $p(e){if(!e)throw Jh()}function Up(e,t){return function(n,r){const i=Ap(e,r,t);return $p(null!==i),i}}function Bp(e,t){return function(n,r){const i=Ap(e,r,t);return $p(null!==i),function(e,t,n,r){const i=jp(t);if(null===i)return null;if(!lp(i.downloadTokens))return null;const o=i.downloadTokens;if(0===o.length)return null;const a=encodeURIComponent,s=o.split(",").map((t=>{const i=e.bucket,o=e.fullPath;return hp("/b/"+a(i)+"/o/"+a(o),n,r)+pp({alt:"media",token:t})}));return s[0]}(i,r,e.host,e._protocol)}}function Wp(e){return function(t,n){let r;var i,o;return 401===t.getStatus()?r=t.getErrorText().includes("Firebase App Check token is invalid")?new Yh(Gh.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new Yh(Gh.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(o=e.bucket,r=new Yh(Gh.QUOTA_EXCEEDED,"Quota for bucket '"+o+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(i=e.path,r=new Yh(Gh.UNAUTHORIZED,"User does not have permission to access '"+i+"'.")):r=n,r.status=t.getStatus(),r.serverResponse=n.serverResponse,r}}function Hp(e){const t=Wp(e);return function(n,r){let i=t(n,r);var o;return 404===n.getStatus()&&(o=e.path,i=new Yh(Gh.OBJECT_NOT_FOUND,"Object '"+o+"' does not exist.")),i.serverResponse=r.serverResponse,i}}function qp(e,t,n){const r=hp(t.fullServerUrl(),e.host,e._protocol),i=e.maxOperationRetryTime,o=new zp(r,"GET",Up(e,n),i);return o.errorHandler=Hp(t),o}function Vp(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),r}function Kp(e,t,n,r,i){const o=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};const s=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();a["Content-Type"]="multipart/related; boundary="+s;const l=Vp(t,r,i),c="--"+s+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+Mp(l,n)+"\r\n--"+s+"\r\nContent-Type: "+l.contentType+"\r\n\r\n",u="\r\n--"+s+"--",d=Np.getBlob(c,r,u);if(null===d)throw tp();const h={name:l.fullPath},p=hp(o,e.host,e._protocol),f=e.maxUploadRetryTime,g=new zp(p,"POST",Up(e,n),f);return g.urlParams=h,g.headers=a,g.body=d.uploadData(),g.errorHandler=Wp(t),g}class Yp{constructor(e,t,n,r){this.current=e,this.total=t,this.finalized=!!n,this.metadata=r||null}}function Gp(e,t){let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Status")}catch(ik){$p(!1)}return $p(!!n&&-1!==(t||["active"]).indexOf(n)),n}const Qp=262144;function Xp(e,t,n,r,i,o,a,s){const l=new Yp(0,0);if(a?(l.current=a.current,l.total=a.total):(l.current=0,l.total=r.size()),r.size()!==l.total)throw new Yh(Gh.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.");const c=l.total-l.current;let u=c;i>0&&(u=Math.min(u,i));const d=l.current,h=d+u;let p="";p=0===u?"finalize":c===u?"upload, finalize":"upload";const f={"X-Goog-Upload-Command":p,"X-Goog-Upload-Offset":`${l.current}`},g=r.slice(d,h);if(null===g)throw tp();const m=t.maxUploadRetryTime,b=new zp(n,"POST",(function(e,n){const i=Gp(e,["active","final"]),a=l.current+u,s=r.size();let c;return c="final"===i?Up(t,o)(e,n):null,new Yp(a,s,"final"===i,c)}),m);return b.headers=f,b.body=g.uploadData(),b.progressCallback=s||null,b.errorHandler=Wp(e),b}const Jp="running",Zp="paused",ef="success",tf="canceled",nf="error";function rf(e){switch(e){case"running":case"pausing":case"canceling":return Jp;case"paused":return Zp;case"success":return ef;case"canceled":return tf;default:return nf}}class of{constructor(e,t,n){if("function"===typeof e||null!=t||null!=n)this.next=e,this.error=null!==t&&void 0!==t?t:void 0,this.complete=null!==n&&void 0!==n?n:void 0;else{const t=e;this.next=t.next,this.error=t.error,this.complete=t.complete}}}function af(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];Promise.resolve().then((()=>e(...n)))}}class sf{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Qh.NO_ERROR,this.sendPromise_=new Promise((e=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=Qh.ABORT,e()})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=Qh.NETWORK_ERROR,e()})),this.xhr_.addEventListener("load",(()=>{e()}))}))}send(e,t,n,r){if(this.sent_)throw op("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==r)for(const i in r)r.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,r[i].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw op("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw op("cannot .getStatus() before sending");try{return this.xhr_.status}catch(ik){return-1}}getResponse(){if(!this.sent_)throw op("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw op("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class lf extends sf{initXhr(){this.xhr_.responseType="text"}}function cf(){return new lf}class uf{constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=n,this._mappings=Op(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=e=>{if(this._request=void 0,this._chunkMultiplier=1,e._codeEquals(Gh.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const t=this.isExponentialBackoffExpired();if(fp(e.status,[])){if(!t)return this.sleepTime=Math.max(2*this.sleepTime,1e3),this._needToFetchStatus=!0,void this.completeTransitions_();e=Zh()}this._error=e,this._transition("error")}},this._metadataErrorHandler=e=>{this._request=void 0,e._codeEquals(Gh.CANCELED)?this.completeTransitions_():(this._error=e,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise(((e,t)=>{this._resolve=e,this._reject=t,this._start()})),this._promise.then(null,(()=>{}))}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout((()=>{this.pendingTimeout=void 0,this._continueUpload()}),this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then((t=>{let[n,r]=t;switch(this._state){case"running":e(n,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused")}}))}_createResumable(){this._resolveToken(((e,t)=>{const n=function(e,t,n,r,i){const o=t.bucketOnlyServerUrl(),a=Vp(t,r,i),s={name:a.fullPath},l=hp(o,e.host,e._protocol),c={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},u=Mp(a,n),d=e.maxUploadRetryTime,h=new zp(l,"POST",(function(e){let t;Gp(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(ik){$p(!1)}return $p(lp(t)),t}),d);return h.urlParams=s,h.headers=c,h.body=u,h.errorHandler=Wp(t),h}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(n,cf,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._uploadUrl=e,this._needToFetchStatus=!1,this.completeTransitions_()}),this._errorHandler)}))}_fetchStatus(){const e=this._uploadUrl;this._resolveToken(((t,n)=>{const r=function(e,t,n,r){const i=e.maxUploadRetryTime,o=new zp(n,"POST",(function(e){const t=Gp(e,["active","final"]);let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(ik){$p(!1)}n||$p(!1);const i=Number(n);return $p(!isNaN(i)),new Yp(i,r.size(),"final"===t)}),i);return o.headers={"X-Goog-Upload-Command":"query"},o.errorHandler=Wp(t),o}(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(r,cf,t,n);this._request=i,i.getPromise().then((e=>{this._request=void 0,this._updateProgress(e.current),this._needToFetchStatus=!1,e.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()}),this._errorHandler)}))}_continueUpload(){const e=Qp*this._chunkMultiplier,t=new Yp(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken(((r,i)=>{let o;try{o=Xp(this._ref._location,this._ref.storage,n,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(ik){return this._error=ik,void this._transition("error")}const a=this._ref.storage._makeRequest(o,cf,r,i,!1);this._request=a,a.getPromise().then((e=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(e.current),e.finalized?(this._metadata=e.metadata,this._transition("success")):this.completeTransitions_()}),this._errorHandler)}))}_increaseMultiplier(){2*(Qp*this._chunkMultiplier)<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken(((e,t)=>{const n=qp(this._ref.storage,this._ref._location,this._mappings),r=this._ref.storage._makeRequest(n,cf,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._metadata=e,this._transition("success")}),this._metadataErrorHandler)}))}_oneShotUpload(){this._resolveToken(((e,t)=>{const n=Kp(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(n,cf,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._metadata=e,this._updateProgress(this._blob.size()),this._transition("success")}),this._errorHandler)}))}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":case"error":case"success":this._state=e,this._notifyObservers();break;case"canceled":this._error=ep(),this._state=e,this._notifyObservers()}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}}get snapshot(){const e=rf(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,n,r){const i=new of(t||void 0,n||void 0,r||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise();this._observers.slice().forEach((e=>{this._notifyObserver(e)}))}_finishPromise(){if(void 0!==this._resolve){let e=!0;switch(rf(this._state)){case ef:af(this._resolve.bind(null,this.snapshot))();break;case tf:case nf:af(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(rf(this._state)){case Jp:case Zp:e.next&&af(e.next.bind(e,this.snapshot))();break;case ef:e.complete&&af(e.complete.bind(e))();break;default:e.error&&af(e.error.bind(e,this._error))()}}resume(){const e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e}pause(){const e="running"===this._state;return e&&this._transition("pausing"),e}cancel(){const e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e}}class df{constructor(e,t){this._service=e,this._location=t instanceof ap?t:ap.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new df(e,t)}get root(){const e=new ap(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Pp(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new ap(this._location.bucket,e);return new df(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new Yh(Gh.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function hf(e){e._throwIfRoot("getDownloadURL");const t=function(e,t,n){const r=hp(t.fullServerUrl(),e.host,e._protocol),i=e.maxOperationRetryTime,o=new zp(r,"GET",Bp(e,n),i);return o.errorHandler=Hp(t),o}(e.storage,e._location,Op());return e.storage.makeRequestWithTokens(t,cf).then((e=>{if(null===e)throw new Yh(Gh.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e}))}function pf(e,t){const n=function(e,t){const n=t.split("/").filter((e=>e.length>0)).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),r=new ap(e._location.bucket,n);return new df(e.storage,r)}function ff(e,t){if(e instanceof bf){const n=e;if(null==n._bucket)throw new Yh(Gh.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Kh+"' property when initializing the app?");const r=new df(n,n._bucket);return null!=t?ff(r,t):r}return void 0!==t?pf(e,t):e}function gf(e,t){if(t&&/^[A-Za-z]+:\/\//.test(t)){if(e instanceof bf)return new df(e,t);throw np("To use ref(service, url), the first argument must be a Storage instance.")}return ff(e,t)}function mf(e,t){const n=null===t||void 0===t?void 0:t[Kh];return null==n?null:ap.makeFromBucketSpec(n,e)}class bf{constructor(e,t,n,r,i){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._bucket=null,this._host=Vh,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?ap.makeFromBucketSpec(r,this._host):mf(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=ap.makeFromBucketSpec(this._url,e):this._bucket=mf(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){dp("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){dp("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});if(e){return(await e.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach((e=>e.cancel())),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new df(this,e)}_makeRequest(e,t,n,r){let i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(this._deleted)return new sp(rp());{const o=function(e,t,n,r,i,o){let a=!(arguments.length>6&&void 0!==arguments[6])||arguments[6];const s=pp(e.urlParams),l=e.url+s,c=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(c,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(c,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(null!==t&&void 0!==t?t:"AppManager")}(c,o),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(c,r),new gp(l,e.method,c,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,a)}(e,this._appId,n,r,t,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then((()=>this._requests.delete(o)),(()=>this._requests.delete(o))),o}}async makeRequestWithTokens(e,t){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}const yf="@firebase/storage",vf="0.13.2",xf="storage";function wf(e,t,n){return function(e,t,n){return e._throwIfRoot("uploadBytesResumable"),new uf(e,new Np(t),n)}(e=pi(e),t,n)}function _f(e,t){let{instanceIdentifier:n}=t;const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return new bf(r,i,o,n,Po)}To(new fi(xf,_f,"PUBLIC").setMultipleInstances(!0)),Fo(yf,vf,""),Fo(yf,vf,"esm2017");function kf(e,t){const n={};for(const r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}function Cf(e){if(null==e)return null;if(e instanceof Number&&(e=e.valueOf()),"number"===typeof e&&isFinite(e))return e;if(!0===e||!1===e)return e;if("[object String]"===Object.prototype.toString.call(e))return e;if(e instanceof Date)return e.toISOString();if(Array.isArray(e))return e.map((e=>Cf(e)));if("function"===typeof e||"object"===typeof e)return kf(e,(e=>Cf(e)));throw new Error("Data cannot be encoded in JSON: "+e)}function Sf(e){if(null==e)return e;if(e["@type"])switch(e["@type"]){case"type.googleapis.com/google.protobuf.Int64Value":case"type.googleapis.com/google.protobuf.UInt64Value":{const t=Number(e.value);if(isNaN(t))throw new Error("Data cannot be decoded from JSON: "+e);return t}default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map((e=>Sf(e))):"function"===typeof e||"object"===typeof e?kf(e,(e=>Sf(e))):e}const Ef="functions",Tf={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class If extends Jr{constructor(e,t,n){super(`${Ef}/${e}`,t||""),this.details=n}}class Nf{constructor(e,t,n){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then((e=>this.auth=e),(()=>{})),this.messaging||t.get().then((e=>this.messaging=e),(()=>{})),this.appCheck||n.get().then((e=>this.appCheck=e),(()=>{}))}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return null===e||void 0===e?void 0:e.accessToken}catch(ik){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return await this.messaging.getToken()}catch(ik){return}}async getAppCheckToken(e){if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){return{authToken:await this.getAuthToken(),messagingToken:await this.getMessagingToken(),appCheckToken:await this.getAppCheckToken(e)}}}const jf="us-central1";class Pf{constructor(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:jf,o=arguments.length>5?arguments[5]:void 0;this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new Nf(t,n,r),this.cancelAllRequests=new Promise((e=>{this.deleteService=()=>Promise.resolve(e())}));try{const e=new URL(i);this.customDomain=e.origin+("/"===e.pathname?"":e.pathname),this.region=jf}catch(ik){this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;if(null!==this.emulatorOrigin){return`${this.emulatorOrigin}/${t}/${this.region}/${e}`}return null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function Rf(e,t,n){return r=>function(e,t,n,r){const i=e._url(t);return Ff(e,i,n,r)}(e,t,r,n||{})}async function Df(e,t,n,r){let i;n["Content-Type"]="application/json";try{i=await r(e,{method:"POST",body:JSON.stringify(t),headers:n})}catch(ik){return{status:0,json:null}}let o=null;try{o=await i.json()}catch(ik){}return{status:i.status,json:o}}async function Ff(e,t,n,r){const i={data:n=Cf(n)},o={},a=await e.contextProvider.getContext(r.limitedUseAppCheckTokens);a.authToken&&(o.Authorization="Bearer "+a.authToken),a.messagingToken&&(o["Firebase-Instance-ID-Token"]=a.messagingToken),null!==a.appCheckToken&&(o["X-Firebase-AppCheck"]=a.appCheckToken);const s=function(e){let t=null;return{promise:new Promise(((n,r)=>{t=setTimeout((()=>{r(new If("deadline-exceeded","deadline-exceeded"))}),e)})),cancel:()=>{t&&clearTimeout(t)}}}(r.timeout||7e4),l=await Promise.race([Df(t,i,o,e.fetchImpl),s.promise,e.cancelAllRequests]);if(s.cancel(),!l)throw new If("cancelled","Firebase Functions instance was deleted.");const c=function(e,t){let n,r=function(e){if(e>=200&&e<300)return"ok";switch(e){case 0:case 500:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(e),i=r;try{const e=t&&t.error;if(e){const t=e.status;if("string"===typeof t){if(!Tf[t])return new If("internal","internal");r=Tf[t],i=t}const o=e.message;"string"===typeof o&&(i=o),n=e.details,void 0!==n&&(n=Sf(n))}}catch(ik){}return"ok"===r?null:new If(r,i,n)}(l.status,l.json);if(c)throw c;if(!l.json)throw new If("internal","Response is not valid JSON object.");let u=l.json.data;if("undefined"===typeof u&&(u=l.json.result),"undefined"===typeof u)throw new If("internal","Response is missing data field.");return{data:Sf(u)}}const Of="@firebase/functions",Lf="0.11.8";!function(e,t){To(new fi(Ef,((t,n)=>{let{instanceIdentifier:r}=n;const i=t.getProvider("app").getImmediate(),o=t.getProvider("auth-internal"),a=t.getProvider("messaging-internal"),s=t.getProvider("app-check-internal");return new Pf(i,o,a,s,r,e)}),"PUBLIC").setMultipleInstances(!0)),Fo(Of,Lf,t),Fo(Of,Lf,"esm2017")}(fetch.bind(self));const Af=Ro({apiKey:"AIzaSyAmwwbvmvxNYX-8PesRl8io9CH60sI2v2A",authDomain:"fundraiser-f0831.firebaseapp.com",databaseURL:"https://fundraiser-f0831-default-rtdb.firebaseio.com",projectId:"fundraiser-f0831",storageBucket:"fundraiser-f0831.firebasestorage.app",messagingSenderId:"900827039889",appId:"1:900827039889:web:4bd336cb4f88a0c76e1730"}),Mf=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Do(),t=arguments.length>1?arguments[1]:void 0;const n=Io(e,"database").getImmediate({identifier:t});if(!n._instanceStarted){const e=Wr("database");e&&function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};e=pi(e),e._checkNotDeleted("useEmulator"),e._instanceStarted&&Rs("Cannot call useEmulator() after instance has already been initialized.");const i=e._repoInternal;let o;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&Rs('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Qs(Qs.OWNER);else if(r.mockUserToken){const t="string"===typeof r.mockUserToken?r.mockUserToken:Vr(r.mockUserToken,e.app.options.projectId);o=new Qs(t)}!function(e,t,n,r){e.repoInfo_=new nl(`${t}:${n}`,!1,e.repoInfo_.namespace,e.repoInfo_.webSocketOnly,e.repoInfo_.nodeAdmin,e.repoInfo_.persistenceKey,e.repoInfo_.includeNamespaceInQueryParams,!0),r&&(e.authTokenProvider_=r)}(i,t,n,o)}(n,...e)}return n}(Af),zf=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Do(),t=arguments.length>1?arguments[1]:void 0;e=pi(e);const n=Io(e,xf).getImmediate({identifier:t}),r=Wr("storage");return r&&function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};!function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};e.host=`${t}:${n}`,e._protocol="http";const{mockUserToken:i}=r;i&&(e._overrideAuthToken="string"===typeof i?i:Vr(i,e.app.options.projectId))}(e,t,n,r)}(n,...r),n}(Af),$f=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Do(),t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:jf;const n=Io(pi(e),Ef).getImmediate({identifier:t}),r=Wr("functions");return r&&function(e,t,n){!function(e,t,n){e.emulatorOrigin=`http://${t}:${n}`}(pi(e),t,n)}(n,...r),n}(Af);let Uf=null;function Bf(){return Uf||(Uf=ds().then((e=>{if(!e)return null;try{return function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Do();return ds().then((e=>{if(!e)throw Ya.create("unsupported-browser")}),(e=>{throw Ya.create("indexed-db-unsupported")})),Io(pi(e),"messaging").getImmediate()}(Af)}catch(ik){return null}})).catch((()=>null)),Uf)}const Wf="BEsmXUl-hHK0FAmHVdbUeZ3kDbSyhOPId-66fJ5NRJ44XFYy5MujmXiXKBp8MH_7hBmFedktB5y7iF3NOjV86tY",Hf="sl_notif_dismissed_until",qf="sl_notif_token_hash",Vf="https://thescrambledlegs.com/android-chrome-192x192.png";function Kf(){return"undefined"!==typeof navigator&&(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream)}function Yf(){return"undefined"!==typeof window&&(!(!window.matchMedia||!window.matchMedia("(display-mode: standalone)").matches)||window.navigator&&!0===window.navigator.standalone)}function Gf(){return"undefined"===typeof navigator?"desktop":Kf()?"ios":/Android/i.test(navigator.userAgent)?"android":"desktop"}function Qf(){return"undefined"!==typeof window&&"Notification"in window&&"serviceWorker"in navigator&&"PushManager"in window}function Xf(){if(!Qf())return"unsupported";if(Kf()&&!Yf())return"ios_needs_install";let e="default";try{e=Notification.permission}catch(ik){return"unsupported"}if("granted"===e)return"subscribed";if("denied"===e)return"blocked";let t=0;try{t=parseInt(localStorage.getItem(Hf)||"0",10)||0}catch(ik){t=0}return Date.now()<t?"dismissed":"askable"}let Jf=null;async function Zf(){if(!Qf())throw new Error("This browser does not support push notifications.");const e=await Notification.requestPermission();if("granted"!==e)throw new Error("denied"===e?"Notifications are blocked. Open your browser settings to re-enable.":"Permission was not granted. Please try again and tap Allow.");const t=await Bf();if(!t)throw new Error("Firebase messaging is not available in this browser.");const n=await async function(){if(Jf)return Jf;if(!("serviceWorker"in navigator))throw new Error("Service workers not supported in this browser.");return Jf=await navigator.serviceWorker.register("/firebase-messaging-sw.js"),Jf}(),r=await async function(e,t){return os(e=pi(e),t)}(t,{vapidKey:Wf,serviceWorkerRegistration:n});if(!r)throw new Error("FCM did not return a token.");const i=await async function(e){const t=(new TextEncoder).encode(e),n=await crypto.subtle.digest("SHA-256",t),r=new Uint8Array(n);let i="";for(let o=0;o<r.length;o++)i+=r[o].toString(16).padStart(2,"0");return i}(r);try{await Ph(Ih(Mf,`fcmTokens/${i}`),{token:r,createdAt:Wh(),lastSeenAt:Wh(),userAgent:"undefined"!==typeof navigator?navigator.userAgent.slice(0,400):"",platform:Gf(),isStandalone:Yf()}),console.log("[messaging] Token written to Firebase /fcmTokens/",i.slice(0,8))}catch(o){throw console.error("[messaging] Token write FAILED \u2014 likely Firebase rules not deployed:",o.message),new Error("Subscribed but could not save your token to Firebase. Run `firebase deploy --only database` to deploy the database rules. Error: "+o.message)}try{localStorage.setItem(qf,i),localStorage.removeItem(Hf)}catch(ik){}return{token:r,hash:i}}function eg(){try{localStorage.setItem(Hf,String(Date.now()+864e5))}catch(ik){}}let tg=!1;const ng=wr`
  from { opacity: 0; }
  to   { opacity: 1; }
`,rg=wr`
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
`,ig=vr.div`
  position: fixed;
  inset: 0;
  z-index: 9500;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  animation: ${ng} 0.18s ease-out;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`,og=vr.div`
  width: 100%;
  max-width: 480px;
  background: linear-gradient(180deg, #2a2a2c 0%, #1f1f21 100%);
  color: #f4f4f4;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  border-top: 1px solid rgba(255,199,44,0.25);
  padding: 18px 20px 28px;
  animation: ${rg} 0.28s cubic-bezier(0.18, 0.89, 0.32, 1.15);
  box-shadow: 0 -16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04);
  max-height: 90vh;
  overflow-y: auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`,ag=vr.div`
  width: 38px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.18);
  margin: 0 auto 14px;
`,sg=vr.h2`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin: 0 0 8px;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.01em;
`,lg=vr.p`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,0.85);
  margin: 0 0 18px;
`,cg=vr.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,199,44,0.18);
  border-radius: 14px;
  padding: 14px 14px 12px;
  margin-bottom: 16px;

  h3 {
    font-family: 'Fredoka', sans-serif;
    font-size: 15px;
    font-weight: 600;
    margin: 0 0 8px;
    color: #FFC72C;
  }
  ol, ul {
    margin: 0;
    padding-left: 22px;
    font-size: 13.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.85);
  }
  li { margin-bottom: 4px; }
  .quip {
    margin-top: 8px;
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    font-style: italic;
  }
`,ug=vr.button`
  width: 100%;
  padding: 15px 18px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(45deg, #FF6B6B, #FF8800);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 6px;
  box-shadow: 0 6px 20px rgba(255,107,107,0.35);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover { transform: translateY(-1px); box-shadow: 0 8px 26px rgba(255,107,107,0.5); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
`,dg=vr.button`
  display: block;
  margin: 12px auto 0;
  background: none;
  border: none;
  color: rgba(255,255,255,0.6);
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;

  &:hover { color: #f4f4f4; }
`,hg=vr.div`
  margin-top: 10px;
  font-size: 12px;
  color: #FFB4B4;
  text-align: center;
  min-height: 16px;
`,pg=()=>(0,_r.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",style:{verticalAlign:"middle"},children:[(0,_r.jsx)("path",{d:"M12 3v13M7 8l5-5 5 5",stroke:"#FFC72C",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,_r.jsx)("path",{d:"M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",stroke:"#FFC72C",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),fg=()=>(0,_r.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",style:{verticalAlign:"middle"},children:(0,_r.jsx)("path",{d:"M12 5v14M5 12h14",stroke:"#FFC72C",strokeWidth:"2.4",strokeLinecap:"round"})});function gg(){return(0,_r.jsxs)(cg,{children:[(0,_r.jsx)("h3",{children:"\ud83c\udf4e On iPhone? Apple makes us do this dance:"}),(0,_r.jsxs)("ol",{children:[(0,_r.jsxs)("li",{children:["Tap ",(0,_r.jsx)(pg,{})," ",(0,_r.jsx)("strong",{children:"Share"})," at the bottom of Safari"]}),(0,_r.jsxs)("li",{children:["Tap ",(0,_r.jsx)(fg,{})," ",(0,_r.jsx)("strong",{children:"Add to Home Screen"})]}),(0,_r.jsx)("li",{children:"Open the egg from your home screen"}),(0,_r.jsxs)("li",{children:["Come back here and tap ",(0,_r.jsx)("strong",{children:"Notify Me"})]})]}),(0,_r.jsx)("div",{className:"quip",children:"(Yes, it's silly. Worth it.)"})]})}function mg(){return(0,_r.jsxs)(cg,{children:[(0,_r.jsx)("h3",{children:"\ud83c\udf4e You're in!"}),(0,_r.jsxs)("ul",{children:[(0,_r.jsxs)("li",{children:["Tap ",(0,_r.jsx)("strong",{children:"Notify Me"})," below."]}),(0,_r.jsxs)("li",{children:["iPhone will ask once \u2014 tap ",(0,_r.jsx)("strong",{children:"Allow"}),"."]})]})]})}function bg(){return(0,_r.jsxs)(cg,{children:[(0,_r.jsx)("h3",{children:"\ud83c\udf10 Quick one."}),(0,_r.jsxs)("ul",{children:[(0,_r.jsxs)("li",{children:["Tap ",(0,_r.jsx)("strong",{children:"Notify Me"})," below."]}),(0,_r.jsxs)("li",{children:["Your browser will pop a permission box \u2014 hit ",(0,_r.jsx)("strong",{children:"Allow"}),"."]}),(0,_r.jsx)("li",{children:"That's it. You're scrambled."})]})]})}function yg(e){let{platform:t}=e;return(0,_r.jsxs)(cg,{children:[(0,_r.jsx)("h3",{children:"\ud83d\udee0 Re-enable notifications"}),(0,_r.jsxs)("p",{style:{fontSize:13,color:"rgba(255,255,255,0.85)",margin:"0 0 8px"},children:["Open the site permissions and flip notifications back to ",(0,_r.jsx)("strong",{children:"Allow"}),":"]}),(0,_r.jsxs)("ul",{children:[(0,_r.jsxs)("li",{children:[(0,_r.jsx)("strong",{children:"iPhone:"})," Settings \u2192 Notifications \u2192 Scrambled Legs \u2192 Allow"]}),(0,_r.jsxs)("li",{children:[(0,_r.jsx)("strong",{children:"Android Chrome:"})," Tap the lock icon in the URL bar \u2192 Permissions \u2192 Notifications \u2192 Allow"]}),(0,_r.jsxs)("li",{children:[(0,_r.jsx)("strong",{children:"Desktop Chrome:"})," Tap the lock icon in the URL bar \u2192 Site settings \u2192 Notifications \u2192 Allow"]})]}),(0,_r.jsx)("div",{className:"quip",children:"Once you flip it, refresh this page."})]})}const vg=function(e){let{state:n,onClose:r}=e;const[i,o]=(0,t.useState)("desktop"),[a,s]=(0,t.useState)(!1),[l,c]=(0,t.useState)("");(0,t.useEffect)((()=>{o(Gf());const e=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=e}}),[]);let u="Notify Me";return"ios_needs_install"===n?u="Got it, take me there":"blocked"===n&&(u="Got it"),a&&(u="Asking\u2026"),(0,_r.jsx)(ig,{onClick:e=>{e.target===e.currentTarget&&r&&r()},children:(0,_r.jsxs)(og,{role:"dialog","aria-modal":"true","aria-labelledby":"sl-notif-headline",children:[(0,_r.jsx)(ag,{}),(0,_r.jsx)(sg,{id:"sl-notif-headline",children:"\ud83c\udf2d Join the Notification Club"}),(0,_r.jsx)(lg,{children:"Texts get buried. The group chat is chaos. Scrambled Legs drops notifications when there's a ride, a location change, or free beer. We'll only bother you when it actually matters. That's the scrambled promise."}),"blocked"===n?(0,_r.jsx)(yg,{platform:i}):"ios_needs_install"===n?(0,_r.jsx)(gg,{}):"ios"===i?(0,_r.jsx)(mg,{}):(0,_r.jsx)(bg,{}),(0,_r.jsx)(ug,{type:"button",onClick:async()=>{if("ios_needs_install"!==n)if("blocked"!==n){c(""),s(!0);try{await Zf(),r&&r()}catch(e){c(e.message||"Subscribe failed."),s(!1)}}else r&&r();else r&&r()},disabled:a,children:u}),(0,_r.jsx)(hg,{role:"alert",children:l}),"blocked"!==n&&(0,_r.jsx)(dg,{type:"button",onClick:()=>{eg(),r&&r()},children:"Maybe later"})]})})},xg=wr`
  0%   { box-shadow: 0 0 0 0 rgba(255,199,44,0.55), 0 8px 24px rgba(0,0,0,0.35); }
  70%  { box-shadow: 0 0 0 18px rgba(255,199,44,0), 0 8px 24px rgba(0,0,0,0.35); }
  100% { box-shadow: 0 0 0 0 rgba(255,199,44,0), 0 8px 24px rgba(0,0,0,0.35); }
`,wg=wr`
  0%,100% { transform: rotate(0deg); }
  20% { transform: rotate(-12deg); }
  40% { transform: rotate(10deg); }
  60% { transform: rotate(-8deg); }
  80% { transform: rotate(6deg); }
`,_g=vr.div`
  position: fixed;
  right: 16px;
  bottom: 20px;
  z-index: 9000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`,kg=vr.span`
  background: linear-gradient(135deg, #FFE66D, #FFC72C);
  color: #1a1a1a;
  font-family: 'Fredoka', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  ${e=>e.$pulse&&mr`animation: ${xg} 2.2s ease-out 3;`}
`,Cg=vr.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 3px solid rgba(255,230,109,0.6);
  background: linear-gradient(135deg, #FFE66D 0%, #FFC72C 60%, #FF8800 100%);
  color: #1a1a1a;
  font-size: 34px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 32px rgba(0,0,0,0.4), 0 0 0 0 rgba(255,199,44,0.55);
  transition: transform 0.18s ease;

  ${e=>e.$pulse&&mr`animation: ${xg} 1.8s ease-out infinite;`}
  ${e=>e.$wiggle&&mr`animation: ${wg} 0.7s ease-in-out 1;`}

  &:hover { transform: translateY(-3px) scale(1.06); }
  &:active { transform: translateY(0) scale(0.96); }

  &::after {
    content: "${e=>e.$badge?"i":""}";
    position: absolute;
    top: -3px;
    right: -3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #FF6B6B;
    color: white;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 700;
    display: ${e=>e.$badge?"flex":"none"};
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
  }

  @media (max-width: 480px) {
    width: 68px;
    height: 68px;
    font-size: 32px;
  }
`,Sg=vr.button`
  position: fixed;
  right: 14px;
  bottom: 16px;
  z-index: 9000;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255,199,44,0.85);
  color: #1a1a1a;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  opacity: 0.85;
  transition: transform 0.15s, opacity 0.15s;

  &:hover { opacity: 1; transform: scale(1.1); }
`,Eg=vr.button`
  position: fixed;
  right: 14px;
  bottom: 18px;
  z-index: 9000;
  max-width: calc(100vw - 28px);
  padding: 10px 14px 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(40,40,42,0.92);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.35);
  text-align: left;
  backdrop-filter: blur(8px);

  .em { font-size: 16px; }
  .arrow { color: #FFC72C; font-weight: 700; margin-left: 4px; }
  &:hover { background: rgba(50,50,52,0.95); }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 9px 12px 9px 10px;
  }
`,Tg=[{title:"\ud83c\udf2d Join the Notification Club",sub:"Where we're riding. When plans change. Free beer. Scrambled Legs only bothers you when it counts."},{title:"\ud83e\udd5a Don't be a bad egg",sub:"Get Scrambled Legs ride alerts straight to your phone. No group chat required."},{title:"\ud83d\udeb4 Wednesday rolls are calling",sub:"Know where we're meeting before everyone else. Enable notifications."},{title:"\ud83d\udd25 Stay in the yolk",sub:"Ride changes, beer calls, and the occasional emergency \u2014 right to your phone."},{title:"\ud83c\udf2d The crew is already in",sub:"Scrambled Legs drops push notifications for rides, location changes, and free stuff."},{title:"\ud83e\udd5a Crack open notifications",sub:"Stop missing the Wednesday roll-out. It only takes a tap."}],Ig=vr.span`
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
`,Ng=wr`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`,jg=vr.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 100px;
  z-index: 8999;
  width: auto;
  max-width: 520px;
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(30,30,32,0.97), rgba(26,26,26,0.97));
  border: 1px solid rgba(255,199,44,0.35);
  border-radius: 16px;
  padding: 14px 14px 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.55);
  backdrop-filter: blur(10px);
  animation: ${Ng} 0.35s cubic-bezier(.34,1.56,.64,1) forwards;

  .nudge-icon { font-size: 22px; flex-shrink: 0; }

  .nudge-text {
    flex: 1;
    min-width: 0;
    .nudge-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: #fff;
      line-height: 1.2;
    }
    .nudge-sub {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      color: rgba(255,255,255,0.6);
      margin-top: 2px;
    }
  }

  .nudge-enable {
    flex-shrink: 0;
    padding: 8px 14px;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, #FFE66D, #FFC72C);
    color: #1a1a1a;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: transform 0.15s;
    &:hover { transform: scale(1.04); }
  }

  .nudge-dismiss {
    flex-shrink: 0;
    background: none;
    border: none;
    color: rgba(255,255,255,0.4);
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
    &:hover { color: rgba(255,255,255,0.7); }
  }

  @media (max-width: 480px) {
    left: 12px;
    right: 12px;
    bottom: 96px;
    padding: 12px 10px 12px 12px;
    .nudge-title { font-size: 14px; }
    .nudge-sub { font-size: 10px; }
    .nudge-enable { padding: 7px 10px; font-size: 11px; }
  }
`;const Pg=function(){const[e,n]=(0,t.useState)((()=>{const e=Xf();return console.log("[NotifFab] Initial subscription state:",e,"| Notification.permission:","undefined"!==typeof Notification?Notification.permission:"N/A","| pushSupported:","undefined"!==typeof window&&"Notification"in window&&"serviceWorker"in navigator&&"PushManager"in window),e})),[r,i]=(0,t.useState)(!1),[o,a]=(0,t.useState)(!0),[s,l]=(0,t.useState)(!1),[c,u]=(0,t.useState)(!1),[d]=(0,t.useState)((()=>{try{const e=(parseInt(localStorage.getItem("sl_nudge_idx")||"0",10)+1)%Tg.length;return localStorage.setItem("sl_nudge_idx",String(e)),Tg[e]}catch{return Tg[0]}}));(0,t.useEffect)((()=>{const t=()=>n(Xf()),r=()=>{"visible"===document.visibilityState&&t()};document.addEventListener("visibilitychange",r),window.addEventListener("focus",t),window.addEventListener("storage",t);try{sessionStorage.getItem("sl_notif_wiggle_done")||"askable"!==e||(sessionStorage.setItem("sl_notif_wiggle_done","1"),l(!0))}catch(ik){}return()=>{document.removeEventListener("visibilitychange",r),window.removeEventListener("focus",t),window.removeEventListener("storage",t)}}),[]),(0,t.useEffect)((()=>{const e=setTimeout((()=>a(!1)),7e3);return()=>clearTimeout(e)}),[]),(0,t.useEffect)((()=>{const e=Xf();if(console.log("[NotifFab] Nudge useEffect \u2014 state:",e),"askable"===e||"ios_needs_install"===e){console.log("[NotifFab] New user \u2014 opening full sheet in 3s");const e=setTimeout((()=>{"askable"!==Xf()&&"ios_needs_install"!==Xf()||i(!0)}),3e3);return()=>clearTimeout(e)}if("dismissed"===e){console.log("[NotifFab] Dismissed user \u2014 showing toast in 3s");const e=setTimeout((()=>u(!0)),3e3);return()=>clearTimeout(e)}console.log("[NotifFab] No nudge \u2014 state:",e)}),[]);const h=(0,t.useCallback)((()=>{u(!1),eg(),n(Xf())}),[]),p=(0,t.useCallback)((()=>{u(!1),i(!0)}),[]),f=(0,t.useCallback)((()=>i(!0)),[]),g=(0,t.useCallback)((()=>{i(!1),n(Xf())}),[]);if("unsupported"===e||"subscribed"===e)return null;if("blocked"===e)return(0,_r.jsxs)(_r.Fragment,{children:[(0,_r.jsxs)(Eg,{type:"button",onClick:f,"aria-label":"Notifications are blocked. Tap to fix.",children:[(0,_r.jsx)("span",{className:"em",children:"\ud83e\udd5a"}),(0,_r.jsxs)("span",{children:["You blocked us. Wild. ",(0,_r.jsx)("span",{className:"arrow",children:"Tap to fix \u2192"})]})]}),r&&(0,_r.jsx)(vg,{state:e,onClose:g})]});if("dismissed"===e)return(0,_r.jsxs)(_r.Fragment,{children:[(0,_r.jsxs)(Sg,{type:"button",onClick:f,"aria-label":"Open notification subscribe",children:["\ud83d\udd14",(0,_r.jsx)(Ig,{children:"Subscribe to notifications"})]}),r&&(0,_r.jsx)(vg,{state:"askable",onClose:g})]});const m="ios_needs_install"===e;return(0,_r.jsxs)(_r.Fragment,{children:[c&&(0,_r.jsxs)(jg,{role:"alert",children:[(0,_r.jsx)("span",{className:"nudge-icon",children:"\ud83c\udf2d"}),(0,_r.jsxs)("div",{className:"nudge-text",children:[(0,_r.jsx)("div",{className:"nudge-title",children:d.title}),(0,_r.jsx)("div",{className:"nudge-sub",children:d.sub})]}),(0,_r.jsx)("button",{className:"nudge-enable",onClick:p,type:"button",children:"Enable"}),(0,_r.jsx)("button",{className:"nudge-dismiss",onClick:h,type:"button","aria-label":"Dismiss",children:"\xd7"})]}),(0,_r.jsxs)(_g,{children:[(0,_r.jsx)(kg,{$pulse:!o,children:"Get Notified"}),(0,_r.jsxs)(Cg,{type:"button",$pulse:!0,$wiggle:s,$badge:m,onClick:f,"aria-label":"Subscribe to Scrambled Legs notifications",children:["\ud83d\udd14",(0,_r.jsx)(Ig,{children:m?"Install to get notifications on iPhone":"Subscribe to notifications"})]})]}),r&&(0,_r.jsx)(vg,{state:e,onClose:g})]})},Rg="sl_install_dismissed";function Dg(){try{const e=parseInt(localStorage.getItem(Rg)||"0",10);return Date.now()<e}catch{return!1}}function Fg(){try{localStorage.setItem(Rg,String(Date.now()+6048e5))}catch{}}const Og=wr`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`,Lg=vr.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 90px;
  z-index: 8998;
  max-width: 520px;
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(30,30,32,0.97), rgba(26,26,26,0.97));
  border: 1px solid rgba(255,199,44,0.35);
  border-radius: 16px;
  padding: 14px 14px 14px 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.55);
  backdrop-filter: blur(10px);
  animation: ${Og} 0.35s cubic-bezier(.34,1.56,.64,1) forwards;

  @media (max-width: 480px) {
    left: 12px;
    right: 12px;
    bottom: 86px;
    padding: 12px 10px 12px 12px;
  }
`,Ag=vr.span`
  font-size: 22px;
  flex-shrink: 0;
  margin-top: 1px;
`,Mg=vr.div`
  flex: 1;
  min-width: 0;
`,zg=vr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`,$g=vr.div`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.6);
  margin-top: 3px;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 10px;
  }
`,Ug=vr.button`
  flex-shrink: 0;
  padding: 8px 14px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #FFE66D, #FFC72C);
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.03em;
  transition: transform 0.15s;
  align-self: center;
  white-space: nowrap;

  &:hover { transform: scale(1.04); }
  &:active { transform: scale(0.97); }

  @media (max-width: 480px) {
    padding: 7px 10px;
    font-size: 11px;
  }
`,Bg=vr.button`
  flex-shrink: 0;
  background: none;
  border: none;
  color: rgba(255,255,255,0.4);
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  align-self: flex-start;

  &:hover { color: rgba(255,255,255,0.7); }
`,Wg=vr.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 6px;
`,Hg=vr.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.75);

  @media (max-width: 480px) {
    font-size: 10px;
  }
`,qg=vr.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  min-width: 16px;
  border-radius: 50%;
  background: rgba(255,199,44,0.25);
  color: #FFC72C;
  font-size: 9px;
  font-weight: 700;
`;function Vg(){return(0,_r.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#FFC72C",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round",style:{display:"inline",verticalAlign:"middle",marginRight:2},"aria-hidden":"true",children:[(0,_r.jsx)("path",{d:"M8.59 5.41L12 2l3.41 3.41"}),(0,_r.jsx)("line",{x1:"12",y1:"2",x2:"12",y2:"15"}),(0,_r.jsx)("path",{d:"M5 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1"})]})}function Kg(e){let{deferredPrompt:n,onDismiss:r}=e;const i=(0,t.useCallback)((async()=>{if(n)try{n.prompt();const{outcome:e}=await n.userChoice;"accepted"===e&&r(!0)}catch(e){console.warn("[InstallPrompt] Android prompt error:",e)}}),[n,r]);return(0,_r.jsxs)(Lg,{role:"complementary","aria-label":"Install app prompt",children:[(0,_r.jsx)(Ag,{children:"\ud83e\udd5a"}),(0,_r.jsxs)(Mg,{children:[(0,_r.jsx)(zg,{children:"Add Scrambled Legs to your home screen"}),(0,_r.jsx)($g,{children:"Get the app experience \u2014 faster loads, offline access, and push notifications."})]}),(0,_r.jsx)(Ug,{type:"button",onClick:i,children:"Install"}),(0,_r.jsx)(Bg,{type:"button","aria-label":"Dismiss install prompt",onClick:()=>r(!1),children:"\xd7"})]})}function Yg(e){let{onDismiss:t}=e;return(0,_r.jsxs)(Lg,{role:"complementary","aria-label":"Add to Home Screen instructions",children:[(0,_r.jsx)(Ag,{children:"\ud83e\udd5a"}),(0,_r.jsxs)(Mg,{children:[(0,_r.jsx)(zg,{children:"Install on iPhone"}),(0,_r.jsx)($g,{children:"Required for notifications on iPhone."}),(0,_r.jsxs)(Wg,{children:[(0,_r.jsxs)(Hg,{children:[(0,_r.jsx)(qg,{children:"1"}),"Tap ",(0,_r.jsx)(Vg,{})," ",(0,_r.jsx)("strong",{style:{color:"#FFC72C"},children:"Share"})," in your browser toolbar"]}),(0,_r.jsxs)(Hg,{children:[(0,_r.jsx)(qg,{children:"2"}),"Choose ",(0,_r.jsx)("strong",{style:{color:"#FFC72C"},children:"Add to Home Screen \uff0b"})]}),(0,_r.jsxs)(Hg,{children:[(0,_r.jsx)(qg,{children:"3"}),"Tap ",(0,_r.jsx)("strong",{style:{color:"#FFC72C"},children:"Add"})," \u2014 done!"]})]})]}),(0,_r.jsx)(Bg,{type:"button","aria-label":"Dismiss iOS install prompt",onClick:t,children:"\xd7"})]})}function Gg(){const[e,n]=(0,t.useState)(null),[r,i]=(0,t.useState)(!1),o=(0,t.useRef)(!1);(0,t.useEffect)((()=>{if(function(){try{return window.matchMedia("(display-mode: standalone)").matches}catch{return!1}}())return;if(Dg())return;const e=e=>{e.preventDefault(),n(e)};window.addEventListener("beforeinstallprompt",e);const t=()=>{n(null)};return window.addEventListener("appinstalled",t),()=>{window.removeEventListener("beforeinstallprompt",e),window.removeEventListener("appinstalled",t)}}),[]),(0,t.useEffect)((()=>{if(o.current=!0,!Kf())return;if(Yf())return;if(Dg())return;const e=setTimeout((()=>{o.current&&i(!0)}),5e3);return()=>{o.current=!1,clearTimeout(e)}}),[]);const a=(0,t.useCallback)((e=>{n(null),e||Fg()}),[]),s=(0,t.useCallback)((()=>{i(!1),Fg()}),[]);return e?(0,_r.jsx)(Kg,{deferredPrompt:e,onDismiss:a}):r?(0,_r.jsx)(Yg,{onDismiss:s}):null}const Qg="events";function Xg(){return Ih(Mf,Qg)}function Jg(e){return Ih(Mf,`${Qg}/${e}`)}function Zg(e){const t=Xg(),n=t=>{const n=[];t.forEach((e=>{const t=e.val()||{};n.push({id:e.key,...t})})),n.sort(((e,t)=>(e.start||0)-(t.start||0))),e(n)};return Lh(t,n),()=>Ah(t,"value",n)}async function em(e){await function(e){return Ud("remove",e._path),Ph(e,null)}(Jg(e))}function tm(e){const t=Date.now(),n=[],r=[];return e.forEach((e=>{const i=6e4*(e.durationMinutes||120);(e.start||0)+i>=t?n.push(e):r.push(e)})),n.sort(((e,t)=>(e.start||0)-(t.start||0))),r.sort(((e,t)=>(t.start||0)-(e.start||0))),{upcoming:n,past:r}}const nm="sl_events_cache_v2";function rm(){const[e,n]=(0,t.useState)((()=>function(){try{const e=localStorage.getItem(nm);if(!e)return null;const{events:t}=JSON.parse(e);return Array.isArray(t)?t:null}catch{return null}}()||[])),[r,i]=(0,t.useState)(!0);return(0,t.useEffect)((()=>{const e=Zg((e=>{n(e),i(!1),function(e){try{localStorage.setItem(nm,JSON.stringify({events:e,t:Date.now()}))}catch{}}(e)}));return e}),[]),{events:e,isStale:r}}const im="America/Chicago",om=72e5;function am(e,t,n){const r=function(e,t){const n=new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)),r=e=>parseInt(n.find((t=>t.type===e)).value,10);return Date.UTC(r("year"),r("month")-1,r("day"),r("hour"),r("minute"),r("second"))-e}(Date.UTC(e,t-1,n,12,0,0),im);return Date.UTC(e,t-1,n,0,0,0)-r}function sm(e){const t=Date.now();return t<e.start?"upcoming":t<e.start+om?"in_progress":t<function(e){const t=new Intl.DateTimeFormat("en-CA",{timeZone:im,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)),[n,r,i]=t.split("-").map(Number);return am(n,r,i+1)}(e.start)?"beers":"archived"}const lm={upcoming:"UPCOMING",in_progress:"IN PROGRESS",beers:"BEERS BEING CONSUMED"};function cm(e){const t=Math.floor(e/6e4),n=Math.floor(t/60),r=t%60;return n>0?`${n}h ${r} min in`:`${r} min in`}const um=e=>new Intl.DateTimeFormat(void 0,{weekday:"short",month:"short",day:"numeric"}).format(new Date(e)),dm=e=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(e)),hm=e=>new Date(e).getDate(),pm=e=>new Intl.DateTimeFormat(void 0,{month:"short"}).format(new Date(e)).toUpperCase(),fm=e=>(new Intl.NumberFormat).format(e||0);function gm(e){return(e-Date.now())/864e5<=10}function mm(e){if(!e.startLoc)return"#";const t=/iPad|iPhone|iPod/.test(navigator.userAgent),n=e.startLoc.lat===(e.endLoc&&e.endLoc.lat)&&e.startLoc.lng===(e.endLoc&&e.endLoc.lng);return t?`https://maps.apple.com/?daddr=${e.startLoc.lat},${e.startLoc.lng}`:n||!e.endLoc?`https://www.google.com/maps/dir/?api=1&destination=${e.startLoc.lat},${e.startLoc.lng}`:`https://www.google.com/maps/dir/?api=1&origin=${e.startLoc.lat},${e.startLoc.lng}&destination=${e.endLoc.lat},${e.endLoc.lng}`}function bm(e){const t=e=>new Date(e).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");return`https://calendar.google.com/calendar/render?${new URLSearchParams({action:"TEMPLATE",text:e.name,dates:`${t(e.start)}/${t(e.start+72e5)}`,details:`${e.description||""}\n\nhttps://thescrambledlegs.com/events/${e.id}`,location:e.startLoc?e.startLoc.label:""}).toString()}`}function ym(e){if(!e)return null;try{const t=new URL(e).hostname.toLowerCase();return t.includes("strava")?"Strava":t.includes("ridewithgps")?"Ride with GPS":t.includes("trailforks")?"Trailforks":t.includes("komoot")?"Komoot":t.includes("garmin")?"Garmin Connect":e.toLowerCase().endsWith(".gpx")?"GPX file":null}catch{return null}}const vm=vr.div`
  position: relative;
  height: 200px;
  background: #1a1a1a;
  z-index: 1;

  .leaflet-container {
    width: 100%;
    height: 100%;
    background: #1a1a1a;
    border-radius: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(26,26,26,0.85) 100%);
    pointer-events: none;
    z-index: 2;
  }

  .leaflet-tile-pane { filter: brightness(0.85) saturate(0.7); }
  .leaflet-control-attribution { font-size: 9px !important; opacity: 0.5; }
`;function xm(e){let{startLoc:n,endLoc:r}=e;const i=(0,t.useRef)(null),o=(0,t.useRef)(null);return(0,t.useEffect)((()=>{if(!i.current||!n||!window.L)return;const e=setTimeout((()=>{if(!i.current)return;o.current&&(o.current.remove(),o.current=null);const e=window.L,t=e.map(i.current,{zoomControl:!1,attributionControl:!1,scrollWheelZoom:!1,dragging:!1,tap:!1}).setView([n.lat,n.lng],13);e.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:19}).addTo(t);const a=e.divIcon({className:"pin-yolk",iconSize:[18,18],iconAnchor:[9,9]});e.marker([n.lat,n.lng],{icon:a}).addTo(t);r&&(r.lat!==n.lat||r.lng!==n.lng)&&(e.marker([r.lat,r.lng],{icon:a}).addTo(t),e.polyline([[n.lat,n.lng],[r.lat,r.lng]],{color:"#FFC72C",weight:3,opacity:.7,dashArray:"6 8"}).addTo(t),t.fitBounds([[n.lat,n.lng],[r.lat,r.lng]],{padding:[40,40]})),o.current=t}),30);return()=>{clearTimeout(e),o.current&&(o.current.remove(),o.current=null)}}),[n,r]),(0,_r.jsx)(vm,{ref:i})}const wm=wr`
  0%, 100% { transform: rotate(-30deg); }
  50%       { transform: rotate(30deg); }
`,_m=wr`
  0%, 100% {
    filter: drop-shadow(0 0 3px rgba(255,215,0,0.35))
            drop-shadow(0 2px 3px rgba(0,0,0,0.6))
            brightness(1) saturate(1);
  }
  50% {
    filter: drop-shadow(0 0 14px rgba(255,215,0,0.95))
            drop-shadow(0 0 5px rgba(255,255,200,0.65))
            drop-shadow(0 2px 3px rgba(0,0,0,0.6))
            brightness(1.35) saturate(1.4);
  }
`,km=vr.div`
  position: absolute;
  right: 16px;
  top: 154px;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;

  @media (max-width: 380px) {
    right: 12px;
    top: 158px;
  }
`,Cm=vr.div`
  position: relative;
  width: 76px;
  height: 76px;
  pointer-events: auto;

  @media (max-width: 380px) {
    width: 68px;
    height: 68px;
  }
`,Sm=vr.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #1a1a1a;
  box-shadow: 0 6px 18px rgba(0,0,0,0.55), 0 0 0 2px #FFC72C;
  object-fit: cover;
  background: linear-gradient(135deg, #555, #333);
  display: block;
`,Em=vr.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #1a1a1a;
  box-shadow: 0 6px 18px rgba(0,0,0,0.55), 0 0 0 2px #FFC72C;
  background: linear-gradient(135deg, #555, #333);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
`,Tm=vr.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation: ${wm} 5.5s ease-in-out infinite;
  transform-origin: 50% 50%;
`,Im=vr.span`
  position: absolute;
  top: -31px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  animation: ${_m} 1.8s ease-in-out infinite;

  @media (max-width: 380px) {
    top: -28px;
    font-size: 22px;
  }
`,Nm=vr.div`
  margin-top: 6px;
  text-align: center;
  pointer-events: none;
  max-width: 96px;
  width: 96px;

  @media (max-width: 380px) {
    max-width: 88px;
    width: 88px;
  }
`,jm=vr.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #FFC72C;
  text-shadow: 0 1px 4px rgba(0,0,0,0.85), 0 0 8px rgba(0,0,0,0.8);
`,Pm=vr.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-family: 'Fredoka', sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  color: #f4f4f4;
  text-shadow: 0 1px 6px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.85);
  margin-top: 1px;
  overflow: hidden;
  word-break: break-word;

  @media (max-width: 380px) {
    font-size: 12px;
  }
`;function Rm(e){let{rideLeader:t}=e;return t?(0,_r.jsxs)(km,{children:[(0,_r.jsxs)(Cm,{children:[t.photoUrl?(0,_r.jsx)(Sm,{src:t.photoUrl,alt:t.name}):(0,_r.jsx)(Em,{children:"\ud83d\udeb4"}),(0,_r.jsx)(Tm,{children:(0,_r.jsx)(Im,{children:"\ud83d\udc51"})})]}),(0,_r.jsxs)(Nm,{children:[(0,_r.jsx)(jm,{children:"Ride Leader"}),(0,_r.jsx)(Pm,{children:t.name})]})]}):null}const Dm={0:["\u2600\ufe0f","Clear"],1:["\ud83c\udf24","Mostly clear"],2:["\u26c5","Partly cloudy"],3:["\u2601\ufe0f","Overcast"],45:["\ud83c\udf2b","Fog"],48:["\ud83c\udf2b","Freezing fog"],51:["\ud83c\udf26","Light drizzle"],53:["\ud83c\udf26","Drizzle"],55:["\ud83c\udf27","Heavy drizzle"],61:["\ud83c\udf27","Light rain"],63:["\ud83c\udf27","Rain"],65:["\ud83c\udf27","Heavy rain"],71:["\ud83c\udf28","Light snow"],73:["\ud83c\udf28","Snow"],75:["\u2744\ufe0f","Heavy snow"],77:["\ud83c\udf28","Snow grains"],80:["\ud83c\udf26","Rain showers"],81:["\ud83c\udf27","Heavy showers"],82:["\u26c8","Violent showers"],85:["\ud83c\udf28","Snow showers"],86:["\u2744\ufe0f","Heavy snow showers"],95:["\u26c8","Thunderstorm"],96:["\u26c8","Thunderstorm + hail"],99:["\u26c8","Severe thunderstorm"]};function Fm(e,n,r){const[i,o]=(0,t.useState)(null),[a,s]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{e&&n&&r&&gm(r)&&(s(!0),async function(e,t,n){const r=new Date(n),i=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`,o=`sl_wx_${e.toFixed(3)}_${t.toFixed(3)}_${i}_${r.getHours()}`,a=localStorage.getItem(o);if(a)try{const e=JSON.parse(a);if(e.expires>Date.now())return e.data}catch{}if((n-Date.now())/864e5>10)return null;const s=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${t}&hourly=temperature_2m,weather_code,wind_speed_10m,precipitation_probability&daily=sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&start_date=${i}&end_date=${i}`;try{var l,c,u;const e=await fetch(s);if(!e.ok)return null;const t=await e.json(),n=r.getHours(),i=t.hourly.weather_code[n],[a,d]=Dm[i]||["\ud83c\udf24","Forecast"],h={temp:Math.round(t.hourly.temperature_2m[n]),icon:a,desc:d,code:i,wind:Math.round(t.hourly.wind_speed_10m[n]),precip:null!==(l=t.hourly.precipitation_probability[n])&&void 0!==l?l:0,sunset:(null===(c=t.daily)||void 0===c||null===(u=c.sunset)||void 0===u?void 0:u[0])||null,real:!0};return localStorage.setItem(o,JSON.stringify({data:h,expires:Date.now()+18e5})),h}catch{return null}}(e,n,r).then((e=>{o(e),s(!1)})).catch((()=>s(!1))))}),[e,n,r]),{data:i,isLoading:a}}const Om=wr`
  0%   { transform: translateX(0); }
  100% { transform: translateX(400%); }
`,Lm=vr.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 14px;
  padding: 12px 14px;
  background: linear-gradient(135deg, rgba(135,206,250,0.08), rgba(255,199,44,0.04));
  border: 1px solid rgba(135,206,250,0.22);
  border-radius: 12px;
  position: relative;
  overflow: hidden;

  &.is-loading::after {
    content: '';
    position: absolute;
    left: -50%;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    animation: ${Om} 1.5s linear infinite;
  }
`,Am=vr.span`
  font-size: 34px;
  line-height: 1;
  flex-shrink: 0;
`,Mm=vr.span`
  font-family: 'Fredoka', sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(45deg, #87CEFA, #FFE66D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-variant-numeric: tabular-nums;
`,zm=vr.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  min-width: 0;
`,$m=vr.span`
  font-family: 'Fredoka', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #f4f4f4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Um=vr.span`
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  .warn { color: #FFB155; font-weight: 600; }
`,Bm=vr.span`
  position: absolute;
  bottom: 4px;
  right: 8px;
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.32);
  opacity: 0.6;
`,Wm=vr.div`
  margin-top: 14px;
  padding: 10px 12px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 10px;
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  text-align: center;
  letter-spacing: 0.04em;
`;function Hm(e){var n,r;let{event:i,onData:o}=e;const a=null===i||void 0===i||null===(n=i.startLoc)||void 0===n?void 0:n.lat,s=null===i||void 0===i||null===(r=i.startLoc)||void 0===r?void 0:r.lng,l=null===i||void 0===i?void 0:i.start,c=gm(l),{data:u,isLoading:d}=Fm(c?a:null,c?s:null,c?l:null);if(t.useEffect((()=>{u&&o&&o(u)}),[u,o]),!c)return(0,_r.jsx)(Wm,{children:"Forecast available 10 days before the ride"});const h=null!==u&&void 0!==u&&u.sunset?new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(u.sunset)):null;return(0,_r.jsxs)(Lm,{className:d?"is-loading":"",children:[(0,_r.jsx)(Am,{children:(null===u||void 0===u?void 0:u.icon)||"\ud83c\udf24"}),(0,_r.jsx)("div",{children:(0,_r.jsx)(Mm,{children:u?`${u.temp}\xb0`:"\u2014\xb0"})}),(0,_r.jsxs)(zm,{children:[(0,_r.jsx)($m,{className:"weather-desc",children:(null===u||void 0===u?void 0:u.desc)||"Loading\u2026"}),(0,_r.jsx)(Um,{className:"weather-extra",children:u?(0,_r.jsxs)(_r.Fragment,{children:[(0,_r.jsxs)("span",{children:["\ud83d\udca8 ",u.wind," mph"]}),(0,_r.jsxs)("span",{className:u.precip>=50?"warn":"",children:["\ud83d\udca7 ",u.precip,"% rain"]}),h&&(0,_r.jsxs)("span",{children:["\ud83c\udf05 ",h]})]}):(0,_r.jsx)("span",{children:"\u2014"})})]}),(0,_r.jsx)(Bm,{children:null!==u&&void 0!==u&&u.real?"open-meteo":d?"forecast loading\u2026":"forecast unavailable"})]})}const qm=vr.div`
  margin-top: 18px;
  padding: 14px 14px 12px;
  border-radius: 14px;
  background: rgba(0,0,0,0.30);
  border: 1px solid rgba(255,255,255,0.10);
  text-align: center;
`,Vm=vr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 6px;
`,Km=vr.div`
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: clamp(20px, 5vw, 26px);
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(45deg, #FFE66D, #FF8800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &.is-progress {
    background: linear-gradient(45deg, #6FCF97, #b6e9cb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &.is-beers {
    background: linear-gradient(45deg, #FFB155, #ffd2a3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`,Ym=vr.span`
  color: rgba(255,255,255,0.32);
  margin: 0 6px;
  -webkit-text-fill-color: rgba(255,255,255,0.32);
`;function Gm(e,n){if("upcoming"===n){const n=function(e){if(e<=0)return null;const t=Math.floor(e/1e3),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),o=t%60,a=e=>String(e).padStart(2,"0");return n>0?`${n}d \xb7 ${a(r)}h \xb7 ${a(i)}m \xb7 ${a(o)}s`:r>0?`${a(r)}h \xb7 ${a(i)}m \xb7 ${a(o)}s`:`${a(i)}m \xb7 ${a(o)}s`}(e.start-Date.now());return n?n.split(" \xb7 ").map(((e,n,r)=>(0,_r.jsxs)(t.Fragment,{children:[e,n<r.length-1&&(0,_r.jsx)(Ym,{children:"\xb7"})]},n))):"\u2014"}return"in_progress"===n?(0,_r.jsxs)(_r.Fragment,{children:["\ud83d\udeb4 In progress ",(0,_r.jsx)(Ym,{children:"\xb7"})," ",cm(Date.now()-e.start)]}):"beers"===n?(0,_r.jsx)(_r.Fragment,{children:"\ud83c\udf7a Beers being consumed"}):lm[n]||"\u2014"}function Qm(e){let{event:n,onArchived:r}=e;const[i,o]=(0,t.useState)(0);(0,t.useEffect)((()=>{const e=setInterval((()=>o((e=>e+1))),1e3);return()=>clearInterval(e)}),[]);const a=sm(n);(0,t.useEffect)((()=>{"archived"===a&&r&&r()}),[a,r]);const s="upcoming"===a?"Starts in":"Status",l="in_progress"===a,c="beers"===a;return(0,_r.jsxs)(qm,{children:[(0,_r.jsx)(Vm,{className:"countdown-label",children:s}),(0,_r.jsx)(Km,{className:`countdown-display${l?" is-progress":""}${c?" is-beers":""}`,children:Gm(n,a)})]})}const Xm=wr`from { opacity: 0; } to { opacity: 1; }`,Jm=wr`from { transform: translateY(100%); } to { transform: translateY(0); }`,Zm=vr.div`
  display: grid;
  grid-template-columns: repeat(${e=>e.$cols||4}, minmax(0, 1fr));
  gap: 8px;
  margin-top: 14px;
`,eb=vr.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 6px 9px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 11px;
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: all 0.15s ease;

  svg { width: 18px; height: 18px; color: #FFC72C; }

  &:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,199,44,0.25);
    transform: translateY(-1px);
  }
  &:active { transform: translateY(0); }
`,tb=vr(eb).attrs({as:"button"})`
  border: 1px solid rgba(255,255,255,0.10);
`,nb=vr.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`,rb=vr.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  pointer-events: auto;
  animation: ${Xm} 0.2s ease;
`,ib=vr.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  background: linear-gradient(160deg, #232325, #1a1a1a);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 20px 20px 0 0;
  padding: 14px 16px 22px;
  pointer-events: auto;
  animation: ${Jm} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.5);
`,ob=vr.div`
  width: 40px;
  height: 4px;
  margin: 0 auto 12px;
  background: rgba(255,255,255,0.10);
  border-radius: 2px;
`,ab=vr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #f4f4f4;
  text-align: center;
  margin-bottom: 4px;
`,sb=vr.div`
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  text-align: center;
  margin-bottom: 14px;
`,lb=vr.a`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  color: #f4f4f4;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Inter', sans-serif;
  text-align: left;

  &:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,199,44,0.25);
    transform: translateY(-1px);
  }
`,cb=vr(lb).attrs({as:"button"})``,ub=vr.span`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;

  &.g { background: linear-gradient(135deg, #4285F4, #34A853); color: #fff; }
  &.o { background: linear-gradient(135deg, #0078D4, #2B88D8); color: #fff; }
  &.a { background: linear-gradient(135deg, #555, #2a2a2a); color: #fff; font-size: 22px; }
`,db=vr.div`font-size: 14px; font-weight: 600;`,hb=vr.div`font-size: 11px; color: rgba(255,255,255,0.55); margin-top: 1px;`,pb=vr.button`
  width: 100%;
  margin-top: 6px;
  padding: 12px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.55);
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  &:hover { color: #f4f4f4; }
`;function fb(e){let{event:t,onClose:n}=e;return o.createPortal((0,_r.jsxs)(nb,{children:[(0,_r.jsx)(rb,{onClick:n}),(0,_r.jsxs)(ib,{children:[(0,_r.jsx)(ob,{}),(0,_r.jsx)(ab,{children:"Add to calendar"}),(0,_r.jsx)(sb,{children:"Pick where you keep your schedule"}),(0,_r.jsxs)(lb,{href:bm(t),target:"_blank",rel:"noopener noreferrer",onClick:()=>setTimeout(n,100),children:[(0,_r.jsx)(ub,{className:"g",children:"G"}),(0,_r.jsxs)("div",{children:[(0,_r.jsx)(db,{children:"Google Calendar"}),(0,_r.jsx)(hb,{children:"Opens in your Google account"})]})]}),(0,_r.jsxs)(lb,{href:(r=t,`https://outlook.live.com/calendar/0/deeplink/compose?${new URLSearchParams({path:"/calendar/action/compose",rru:"addevent",subject:r.name,startdt:new Date(r.start).toISOString(),enddt:new Date(r.start+72e5).toISOString(),body:`${r.description||""}\n\nhttps://thescrambledlegs.com/events/${r.id}`,location:r.startLoc?r.startLoc.label:""}).toString()}`),target:"_blank",rel:"noopener noreferrer",onClick:()=>setTimeout(n,100),children:[(0,_r.jsx)(ub,{className:"o",children:"\u229e"}),(0,_r.jsxs)("div",{children:[(0,_r.jsx)(db,{children:"Outlook"}),(0,_r.jsx)(hb,{children:"Outlook.com or Office 365"})]})]}),(0,_r.jsxs)(cb,{type:"button",onClick:()=>{!function(e){const t=e=>new Date(e).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),n=t(e.start),r=t(e.start+72e5),i=`BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Scrambled Legs//Calendar//EN\nBEGIN:VEVENT\nUID:${e.id}@thescrambledlegs.com\nDTSTAMP:${t(Date.now())}\nDTSTART:${n}\nDTEND:${r}\nSUMMARY:${e.name}\nDESCRIPTION:${(e.description||"").replace(/\n/g,"\\n")}\nLOCATION:${e.startLoc?e.startLoc.label:""}\nGEO:${e.startLoc?e.startLoc.lat:""};${e.startLoc?e.startLoc.lng:""}\nURL:https://thescrambledlegs.com/events/${e.id}\nEND:VEVENT\nEND:VCALENDAR`,o=new Blob([i],{type:"text/calendar;charset=utf-8"}),a=URL.createObjectURL(o),s=document.createElement("a");s.href=a,s.download=`${e.id}.ics`,s.click(),setTimeout((()=>URL.revokeObjectURL(a)),500)}(t),n()},children:[(0,_r.jsx)(ub,{className:"a"}),(0,_r.jsxs)("div",{children:[(0,_r.jsx)(db,{children:"Apple Calendar / .ics"}),(0,_r.jsx)(hb,{children:"Auto-opens on iPhone & Mac \xb7 downloads on Windows"})]})]}),(0,_r.jsx)(pb,{type:"button",onClick:n,children:"Close"})]})]}),document.body);var r}const gb=()=>(0,_r.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,_r.jsx)("polygon",{points:"3 11 22 2 13 21 11 13 3 11"})}),mb=()=>(0,_r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_r.jsx)("circle",{cx:"6",cy:"19",r:"3"}),(0,_r.jsx)("circle",{cx:"18",cy:"5",r:"3"}),(0,_r.jsx)("path",{d:"M6 16V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v0M18 8v8a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v0"})]}),bb=()=>(0,_r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_r.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),(0,_r.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,_r.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,_r.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),yb=()=>(0,_r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_r.jsx)("circle",{cx:"18",cy:"5",r:"3"}),(0,_r.jsx)("circle",{cx:"6",cy:"12",r:"3"}),(0,_r.jsx)("circle",{cx:"18",cy:"19",r:"3"}),(0,_r.jsx)("line",{x1:"8.6",y1:"13.5",x2:"15.4",y2:"17.5"}),(0,_r.jsx)("line",{x1:"15.4",y1:"6.5",x2:"8.6",y2:"10.5"})]});function vb(e){let{event:n}=e;const[r,i]=(0,t.useState)(!1);return(0,_r.jsxs)(_r.Fragment,{children:[(0,_r.jsxs)(Zm,{$cols:n.routeUrl?4:3,children:[(0,_r.jsxs)(eb,{href:mm(n),target:"_blank",rel:"noopener noreferrer",children:[(0,_r.jsx)(gb,{}),(0,_r.jsx)("span",{children:"Directions"})]}),n.routeUrl&&(0,_r.jsxs)(eb,{href:n.routeUrl,target:"_blank",rel:"noopener noreferrer",title:ym(n.routeUrl)?`Opens in ${ym(n.routeUrl)}`:"Opens in a new tab",children:[(0,_r.jsx)(mb,{}),(0,_r.jsx)("span",{children:"Route"})]}),(0,_r.jsxs)(tb,{type:"button",onClick:()=>i(!0),children:[(0,_r.jsx)(bb,{}),(0,_r.jsx)("span",{children:"Calendar"})]}),(0,_r.jsxs)(tb,{type:"button",onClick:()=>async function(e){const t=`https://thescrambledlegs.com/events/${e.id}`,n=`${e.name} \xb7 Scrambled Legs`,r=`${e.name}\n\ud83d\uddd3  ${um(e.start)} \xb7 ${dm(e.start)}\n\ud83d\udccd ${e.startLoc?e.startLoc.label:""}${e.rideLeader?`\n\ud83c\udf2d Led by ${e.rideLeader.name}`:""}\n\nJoin us at thescrambledlegs.com`;if(navigator.share)try{return void await navigator.share({title:n,text:r,url:t})}catch(ik){return}const i=`${n}\n\n${r}\n\n${t}`;try{await navigator.clipboard.writeText(i),alert("Link copied to clipboard")}catch(ik){prompt("Copy this:",i)}}(n),children:[(0,_r.jsx)(yb,{}),(0,_r.jsx)("span",{children:"Share"})]})]}),r&&(0,_r.jsx)(fb,{event:n,onClose:()=>i(!1)})]})}let xb=0;function wb(){xb++}function _b(){xb=Math.max(0,xb-1)}const kb=[".cal-section-label",".event-name",".event-meta span",".event-desc",".tags .tag",".coming-card",".coming-card .name",".coming-card .meta",".coming-card .date-stamp .day",".coming-card .date-stamp .month",".coming-card .date-stamp .weekday",".archive-toggle",".archive-card .arch-name",".archive-card .arch-date",".archive-card .arch-kudos",".weather-desc",".weather-extra",".countdown-display",".countdown-label"].join(",");function Cb(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(xb>=80)return;wb();const n=t.emoji||"\ud83c\udf2d",r=e.getBoundingClientRect(),i=r.left+r.width/2,o=r.top+r.height/2,a=Math.random()*Math.PI*2,s=Math.cos(a),l=Math.sin(a),c=Math.max(r.width/2,1),u=Math.max(r.height/2,1),d=Math.min(c/Math.abs(s||1e-6),u/Math.abs(l||1e-6)),h=i+s*d,p=o+l*d,f=280+320*Math.random(),g=s*f,m=l*f,b=720*(Math.random()-.5),y=1700+1200*Math.random(),v=document.createElement("div");v.className="flying-hot-dog"+(t.rainbow?" is-rainbow":""),v.textContent=n,v.style.cssText=`position:fixed;pointer-events:none;z-index:1000;font-size:36px;will-change:transform,opacity;left:${h}px;top:${p}px;`,document.body.appendChild(v),v.animate([{transform:"translate(-50%,-50%) scale(0.2) rotate(0deg)",opacity:0,offset:0},{transform:`translate(calc(-50% + ${8*s}px), calc(-50% + ${8*l}px)) scale(1) rotate(${.1*b}deg)`,opacity:1,offset:.12},{transform:`translate(calc(-50% + ${.6*g}px), calc(-50% + ${.6*m}px)) scale(1) rotate(${.6*b}deg)`,opacity:.85,offset:.6},{transform:`translate(calc(-50% + ${g}px), calc(-50% + ${m}px)) scale(1) rotate(${b}deg)`,opacity:0,offset:1}],{duration:y,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"}).onfinish=()=>{v.remove(),_b()}}function Sb(e){if(xb>=80)return;wb();const t=e.getBoundingClientRect(),n=t.left+t.width/2,r=t.top+t.height/2,i=Math.random()*Math.PI*2,o=Math.cos(i),a=Math.sin(i),s=Math.max(t.width/2,1),l=Math.max(t.height/2,1),c=Math.min(s/Math.abs(o||1e-6),l/Math.abs(a||1e-6)),u=n+o*c,d=r+a*c,h=220+280*Math.random(),p=o*h,f=a*h,g=720*(Math.random()-.5),m=1900+1300*Math.random(),b=document.createElement("div");b.className="flying-egg is-rainbow",b.textContent="\ud83e\udd5a",b.style.cssText=`position:fixed;pointer-events:none;z-index:1000;font-size:28px;will-change:transform,opacity;left:${u}px;top:${d}px;`,document.body.appendChild(b),b.animate([{transform:"translate(-50%,-50%) scale(0.2) rotate(0deg)",opacity:0,offset:0},{transform:`translate(calc(-50% + ${8*o}px), calc(-50% + ${8*a}px)) scale(1) rotate(${.1*g}deg)`,opacity:1,offset:.12},{transform:`translate(calc(-50% + ${.6*p}px), calc(-50% + ${.6*f}px)) scale(1) rotate(${.6*g}deg)`,opacity:.85,offset:.6},{transform:`translate(calc(-50% + ${p}px), calc(-50% + ${f}px)) scale(1) rotate(${g}deg)`,opacity:0,offset:1}],{duration:m,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"}).onfinish=()=>{b.remove(),_b()}}const Eb=["Better luck next time","That was weak","Are you a bad egg?","You must be scrambled","Soft. Try again.","Cracked under pressure","Need more yolk","Pedaler in training","C'mon, hammer harder","Was that all? Really?","The bun is disappointed","Even the dog is bored","Wow, I'm stoked on that","That was good for me too","But you can do better","That's the best I've had\u2026 lately","Come on, do better","DNF again","DNS again","Hey, at least you tried","Cute effort","Was that supposed to impress me?","I've felt more","I've seen eggs work harder"],Tb=[["Press for more stoke","That's a start","Keep mashing"],["Mash me if you're ready","Mash pedals next","Drop the hammer","Pace yourself"],["Crank it harder","More watts","All gas no brakes","Brake for nobody","Hammer down","Turn yourself inside out"],["Pin it","Send it","Dig deeper","Big watts only","Climbing mode","Drop them","You're a machine"],["Absolutely shredding","You're cooking now","Feral mode unlocked","Send it sender","PR pace","King of the trail","Dirty dog energy","Egg-cellent form","Tunnel vision unlocked"],["Beast mode","The dog approves","Scrambled glory","Pro-level dog work","Coach Lyle is impressed","Yolked beyond mortal","Trail crew legend","You broke the buns","Cooked, smoked, served","Is that all you got?","You're in it for the long haul","Keep pedaling","Keep cranking","Someone's ahead of you","Catch that person","More watts","Don't stop now","Bad eggs, scrambled","Go, go, go","No mercy","Eyes on the wheel ahead","GOATed","Actually unhinged","You ARE the dog","Actually godlike","The trail bows to you","Hot dog Hall of Fame","You ARE Scrambled Legs","Beyond the bun veil","The yolk is real","You took a wrong turn","Almost to 1000","Pure scrambled","Drop the dog","Yolk supremacy","The bun has fallen","GM Zimm is watching \ud83d\udc40","Zimm didn't build this for quitters","Coach Lyall says dig deeper","Lyall's seen better effort from his couch","Coach Lyall is NOT impressed","Lyall's giving you THE look","Coach Lyall expected more","You call that scrambled?","Eggs-cuse me?! That's it?","Over-easy isn't a training plan","Bad egg energy right here","Runny. Very runny.","The crew has seen better","Soft boiled at best","The yolk's on you","Jordan would rather run","Bad Egg is judging you","Jordan crashed harder than that","Running is NOT cycling, Jordan","Even Bad Egg mashes better","SWIDZ already sent it","Dave's at the bar. Are you?","Send it like SWIDZ","SWIDZ would've sent that by now","Dave's getting a beer. Keep going.","Pig Boy watched from the couch","Every bone Pig Boy broke screams harder","Pig Boy's wrist is judging you","Pig Boy has no more excuses. Do you?","Even Pig Boy remembers how to send it","Reed is paddling right now","Peer thinks this is too hard","Boundary waters > your effort","Reed's on a lake. What's your excuse?","Even the fattest Reed pedals harder","Casey's Zwift PR is a certified dad pace","Dr. Newton flosses harder than you mash","Casey trained all winter on a stationary bike for this","Newton's dentist hands could squeeze harder","Casey guarantees dad speed. He delivered. Can you?","VANDAL is chasing you with a story you've heard twice","Vandal is already on mile 40. You're still here.","VANDAL will finish. Stubbornly. Inevitably.","Tyler's about to tell you the story. Keep going.","Vandal doesn't stop. Neither do you.","Wiley showed up 30 min late and still crushed it","Matt's on his third IPA and still faster than this","Wiley forgot about this but still thought of you","Matt's confident you can do better. Annoyingly confident.","Wiley's somewhere drinking an IPA judging this performance","Derek traded trails for Spandex. Actual tragedy.","VanSlyke is on pavement right now. In full Spandex kit.","Derek can't hear you over the sound of his chamois","VanSlyke would be here but road season started","Derek became a roadie. Pray for him. Mash harder.","Markes is already training for next year","Will believes in you. Don't blow it.","Markes doesn't quit. He just keeps getting faster.","Will puts in the work every single week. What about you?","Markes is solid. So be solid.","Paul broke his back in 3 places and is ahead of you","Manoppo had 6 surgeries and a better FTP than this","Paul's spine is held together by zip ties and willpower","Manoppo's doctor said no. Paul said watch me.","Paul's titanium knee is still faster than your excuses","GLARBTRON has calculated your failure probability: high","The robot supreme being demands maximum output","Glarbtron did not survive the machine wars for this","GLARBTRON requires more wattage. NOW.","The supreme entity is disappointed in your numbers","Brent is not having fun and wants you to know it","St. Martin would like it on record: this is not fun","Brent thinks you're wrong for enjoying this","This is not Brent's type of fun. Reconsider your life.","Brent has left the chat. He was never spiritually present.","Birno is on the back nine right now and thriving","Alex drove his snowmobile to the golf course. In July.","Birno is a rad dad who eagles harder than you mash","Alex has a tee time at 2. This better be worth it.","Birno is snowmobiling somewhere warm. Goals."]],Ib=new Set(["Jordan would rather run","Bad Egg is judging you","Jordan crashed harder than that","Running is NOT cycling, Jordan","Even Bad Egg mashes better","SWIDZ already sent it","Dave's at the bar. Are you?","Send it like SWIDZ","SWIDZ would've sent that by now","Dave's getting a beer. Keep going.","Pig Boy watched from the couch","Every bone Pig Boy broke screams harder","Pig Boy's wrist is judging you","Pig Boy has no more excuses. Do you?","Even Pig Boy remembers how to send it","Reed is paddling right now","Peer thinks this is too hard","Boundary waters > your effort","Reed's on a lake. What's your excuse?","Even the fattest Reed pedals harder","Casey's Zwift PR is a certified dad pace","Dr. Newton flosses harder than you mash","Casey trained all winter on a stationary bike for this","Newton's dentist hands could squeeze harder","Casey guarantees dad speed. He delivered. Can you?","VANDAL is chasing you with a story you've heard twice","Vandal is already on mile 40. You're still here.","VANDAL will finish. Stubbornly. Inevitably.","Tyler's about to tell you the story. Keep going.","Vandal doesn't stop. Neither do you.","Wiley showed up 30 min late and still crushed it","Matt's on his third IPA and still faster than this","Wiley forgot about this but still thought of you","Matt's confident you can do better. Annoyingly confident.","Wiley's somewhere drinking an IPA judging this performance","Derek traded trails for Spandex. Actual tragedy.","VanSlyke is on pavement right now. In full Spandex kit.","Derek can't hear you over the sound of his chamois","VanSlyke would be here but road season started","Derek became a roadie. Pray for him. Mash harder.","Markes is already training for next year","Will believes in you. Don't blow it.","Markes doesn't quit. He just keeps getting faster.","Will puts in the work every single week. What about you?","Markes is solid. So be solid.","Paul broke his back in 3 places and is ahead of you","Manoppo had 6 surgeries and a better FTP than this","Paul's spine is held together by zip ties and willpower","Manoppo's doctor said no. Paul said watch me.","Paul's titanium knee is still faster than your excuses","GLARBTRON has calculated your failure probability: high","The robot supreme being demands maximum output","Glarbtron did not survive the machine wars for this","GLARBTRON requires more wattage. NOW.","The supreme entity is disappointed in your numbers","Brent is not having fun and wants you to know it","St. Martin would like it on record: this is not fun","Brent thinks you're wrong for enjoying this","This is not Brent's type of fun. Reconsider your life.","Brent has left the chat. He was never spiritually present.","Birno is on the back nine right now and thriving","Alex drove his snowmobile to the golf course. In July.","Birno is a rad dad who eagles harder than you mash","Alex has a tee time at 2. This better be worth it.","Birno is snowmobiling somewhere warm. Goals."]),Nb=["MASH!","MASH! MASH!","GO GO GO!","KEEP GOING!","DON'T STOP!","CRACK THAT SHELL!","HARDER!","PROVE IT!","YOU CAN DO THIS!","CRANK IT!","OTHERS DID BETTER","DON'T QUIT NOW","HAMMER DOWN!","SEND IT!","THEY'RE BEATING YOU","ALMOST THERE","BEAST MODE","UNHINGED YET?","YOU GOT THIS","MORE WATTS!","FEEL THE BURN","PROVE THEM WRONG","CHAMPION ENERGY","ALL IN!","DOG MODE: ACTIVE"];function jb(e){return e<=2?0:e<=5?1:e<=9?2:e<=14?3:e<=24?4:5}function Pb(e,t){if(!e)return;if(e.textContent=t,!t)return void(e.style.fontSize="");const n=Math.min(.86*window.innerWidth,480),r=Math.floor(n/Math.max(.63*t.length,1));e.style.fontSize=`${Math.max(12,Math.min(26,r))}px`}const Rb=wr`
  0%, 100% { box-shadow: 0 6px 22px rgba(255,107,107,0.40); }
  50%       { box-shadow: 0 10px 34px rgba(255,107,107,0.70); }
`,Db=wr`
  0%, 100% { filter: brightness(1) saturate(1); }
  50%       { filter: brightness(1.30) saturate(1.45); }
`,Fb=(wr`
  0%   { content: ''; }
  25%  { content: '.'; }
  50%  { content: '..'; }
  75%  { content: '...'; }
  100% { content: ''; }
`,wr`
  0%   { opacity: 0.7; }
  100% { opacity: 0; transform: scale(1.04); }
`),Ob=vr.div`
  margin-top: 14px;
  position: relative;
  z-index: 1;
`,Lb=vr.button`
  position: relative;
  width: 100%;
  padding: var(--hd-pad-y, 14px) 18px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg,
    hsl(var(--hd-hue, 0), 85%, 60%),
    hsl(calc(var(--hd-hue, 0) + 35), 90%, 50%));
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  font-family: 'Fredoka', sans-serif;
  overflow: visible;
  --hd-scale: 1;
  --hd-rest: 1;
  --hd-rest-y: 1;
  transform-origin: center center;
  transform: scale(var(--hd-scale)) scaleY(var(--hd-rest-y, 1));
  transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), padding 0.20s ease-out, background 0.3s;
  animation: ${Rb} 1.5s ease-in-out infinite;
  z-index: 1;

  &:active { --hd-scale: calc(var(--hd-rest, 1) * 0.96); transition-duration: 0.08s; }
  &:not(:active) { --hd-scale: var(--hd-rest, 1); }

  &.is-saving, &.is-burning { pointer-events: none; cursor: default; }

  &[data-intensity="0"] { box-shadow: 0 6px 22px rgba(255,107,107,0.40); }
  &[data-intensity="1"] { box-shadow: 0 8px 28px rgba(255,107,107,0.55); animation-duration: 1.3s; }
  &[data-intensity="2"] { box-shadow: 0 10px 36px rgba(255,107,107,0.65); animation-duration: 1.1s; }
  &[data-intensity="3"] { box-shadow: 0 14px 48px rgba(255,107,107,0.78); animation: ${Db} 0.85s ease-in-out infinite; }
  &[data-intensity="4"] { box-shadow: 0 20px 70px rgba(255,255,255,0.65); animation: ${Db} 0.65s ease-in-out infinite; }
  &[data-intensity="5"] { box-shadow: 0 24px 90px rgba(255,255,200,0.85), 0 0 60px rgba(255,255,255,0.5); animation: ${Db} 0.45s ease-in-out infinite; }
  &[data-intensity="6"] { box-shadow: 0 30px 120px rgba(255,255,255,1), 0 0 100px rgba(255,255,200,0.95); animation: ${Db} 0.30s ease-in-out infinite; }

  /* Hide top/text during mashing, saving, burning */
  &.is-mashing .hd-cta-top,
  &.is-mashing .hd-cta-text,
  &.is-saving .hd-cta-top,
  &.is-saving .hd-cta-text,
  &.is-burning .hd-cta-top,
  &.is-burning .hd-cta-text { opacity: 0; transition: opacity 0.2s; }

  /* Idle hides right text */
  &.is-idle .hd-cta-text { opacity: 0; transition: opacity 0.25s; }

  .ping {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: rgba(255,255,255,0.22);
    animation: ${Fb} 0.45s ease-out forwards;
    pointer-events: none;
  }
`,Ab=vr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  transition: opacity 0.2s;

  /* In idle, shrink the count display so it doesn't overlap the centered
     MASH ME overlay — tucks into the left corner as a subtle indicator */
  ${Lb}.is-idle & {
    gap: 5px;
    opacity: 0.65;
  }
`,Mb=vr.span`
  font-size: 30px;
  line-height: 1;

  ${Lb}.is-idle & { font-size: 17px; }
`,zb=vr.span`
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  transition: font-size 0.2s;

  ${Lb}.is-idle & { font-size: 13px; font-weight: 600; }
`,$b=vr.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: right;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.95;
  transition: opacity 0.22s ease;
  &.is-fading { opacity: 0; }
`,Ub=vr.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(var(--mash-scale, 1));
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.18s, transform 0.25s cubic-bezier(.34,1.56,.64,1);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  max-width: 95%;
  width: max-content;
  text-align: center;

  /* Visible during mashing/saving/burning and idle */
  .is-mashing ~ &,
  .is-saving ~ &,
  .is-burning ~ &,
  .is-idle ~ & { opacity: 1; }

  /* During mashing, anchor to bottom */
  .is-mashing ~ & {
    top: auto;
    bottom: 6px;
    transform: translateX(-50%) scale(var(--mash-scale, 1));
    justify-content: flex-end;
  }
`,Bb=vr.span`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-size: 30px;
  line-height: 1;
  color: #fff;
  text-shadow: 0 3px 12px rgba(0,0,0,0.85), 0 0 24px rgba(255,255,255,0.45);
  transition: font-size 0.22s ease;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  /* Idle big style */
  .is-idle ~ ${Ub} & {
    font-size: clamp(20px, 6.5vw, 30px) !important;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    animation: idleEmergencyPulse 1.5s ease-in-out infinite;
  }

  /* Saving style */
  .is-saving ~ ${Ub} & {
    color: #FFE66D;
    font-style: italic;
    letter-spacing: 0.02em;
  }

  /* Burning style */
  .is-burning ~ ${Ub} & {
    font-size: clamp(22px, 6.5vw, 34px) !important;
    font-style: italic;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: normal;
    text-align: center;
    line-height: 1.15;
    animation: burnFlash 4s cubic-bezier(.34,1.56,.64,1) forwards;
  }
`,Wb=vr.span`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-style: italic;
  font-size: 24px;
  line-height: 1.1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #FFE66D;
  text-shadow: 0 0 12px rgba(255,199,44,0.55), 0 0 24px rgba(255,107,107,0.4), 0 2px 8px rgba(0,0,0,0.8);
  opacity: 0;
  transition: opacity 0.22s;
  pointer-events: none;
  white-space: nowrap;
  text-align: center;

  .is-mashing ~ ${Ub} & { opacity: 1; }
  .is-idle ~ ${Ub} &,
  .is-saving ~ ${Ub} &,
  .is-burning ~ ${Ub} & { opacity: 0; }
`;function Hb(e){let{event:n,isSheetContext:r}=e;const{displayCount:i,mash:o}=function(e,n){const[r,i]=(0,t.useState)(n||0),[o,a]=(0,t.useState)(0),[s,l]=(0,t.useState)(0),[c,u]=(0,t.useState)(!1),d=(0,t.useRef)(null),h=(0,t.useRef)(null),p=(0,t.useRef)(1e3),f=(0,t.useRef)(0),g=(0,t.useRef)(0),m=(0,t.useRef)(n||0);f.current=o,g.current=s,(0,t.useEffect)((()=>{i(n||0)}),[n]);const b=(0,t.useCallback)((async()=>{d.current&&(clearTimeout(d.current),d.current=null),h.current&&(clearTimeout(h.current),h.current=null);const t=f.current;if(!(t<=0||g.current>0)){m.current=r,l(t),a(0),u(!0);try{await qh(Ih(Mf,`events/${e}/hotdogs`),(e=>(e||0)+t)),p.current=1e3}catch(n){a((e=>e+t)),l(0);const e=p.current;p.current=Math.min(2*e,3e4),setTimeout((()=>y()),e)}finally{u(!1)}}}),[e,r]),y=(0,t.useCallback)((()=>{d.current&&clearTimeout(d.current),d.current=setTimeout(b,300),h.current||(h.current=setTimeout(b,5e3))}),[b]),v=(0,t.useCallback)((()=>{a((e=>e+1)),y()}),[y]);return(0,t.useEffect)((()=>{s>0&&r>=m.current+s&&l(0)}),[r,s]),(0,t.useEffect)((()=>{s>0&&(m.current=r-s)}),[s]),(0,t.useEffect)((()=>()=>{f.current>0&&b(),d.current&&clearTimeout(d.current),h.current&&clearTimeout(h.current)}),[b]),{displayCount:(r||0)+s+o,mash:v,isFlushing:c,pendingDelta:o}}(n.id,n.hotdogs),a=(0,t.useRef)(null),s=(0,t.useRef)(0),l=(0,t.useRef)(""),c=(0,t.useRef)(0),u=(0,t.useRef)(""),d=(0,t.useRef)(null),h=(0,t.useRef)(0),p=(0,t.useRef)(-1);(0,t.useEffect)((()=>(r&&(document.body.dataset.sheetOpen="1"),f(),()=>{r&&delete document.body.dataset.sheetOpen,s.current>0&&f(),d.current&&clearTimeout(d.current)})),[r]);const f=(0,t.useCallback)((()=>{const e=a.current;if(!e)return;const t=e.parentElement;e.classList.remove("is-mashing","is-deep-mashing","is-saving","is-burning"),e.classList.add("is-idle"),e.dataset.intensity="0",e.style.setProperty("--hd-rest","1"),e.style.setProperty("--hd-rest-y","1"),e.style.removeProperty("--hd-hue");const n=t&&t.querySelector(".mash-num"),r=t&&t.querySelector(".mash-sub");n&&(n.style.fontSize="",n.textContent="MASH ME"),r&&Pb(r,""),document.body.style.removeProperty("--mash-energy"),document.body.style.removeProperty("--mash-overdrive"),delete document.body.dataset.mashing,delete document.body.dataset.eggsRainbow,document.querySelectorAll(kb).forEach((e=>{e.style.removeProperty("--jx"),e.style.removeProperty("--jy"),e.style.removeProperty("--jr")}))}),[]),g=(0,t.useCallback)((()=>{const e=a.current;if(!e)return;if(e.classList.contains("is-saving")||e.classList.contains("is-burning"))return;e.classList.remove("is-idle"),o(),s.current+=1;const t=s.current,n=e.parentElement,r=n&&n.querySelector(".mash-num"),i=n&&n.querySelector(".mash-sub"),g=document.createElement("span");g.className="ping",e.appendChild(g),setTimeout((()=>g.remove()),500);const m=Math.min(t,25),b=Math.max(12,Math.floor(800/m)),y=function(e){return e<25?0:e>=100?1:(e-25)/75}(t);for(let o=0;o<m;o++){const n=Math.random()<y,r=Gb(t);setTimeout((()=>Cb(e,{rainbow:n,emoji:r})),o*b)}if(function(e,t,n){const r=Date.now();if(r<t.current)return;t.current=r+5e3;const i=["Get crackin'!","Egg-cellent!","Sunny side up!","You rock!","Send it!","Grease lightning!","Mustard moves!","Wheels up!","Yolks on you!","Hot dog hero!","Crank it!","Sender alert!","Scrambled glory!","Pedal punisher!","Bun voyage!","You're in! \ud83e\udd5a","Roll call answered!","See you Wednesday!","Yolked + stoked!","Eggs-traordinary!","Cracked it!","On the roster!","Whisk on!","Wednesday loading\u2026","Locked and loaded!","Bad Egg approved!","Jordan would run. You ride.","SWIDZ would send it!","Dave's at the bar \u2014 keep going!","Pig Boy's watching!","Pig Boy's wrist approves!","Reed's on a lake!","Boundary waters can wait!","Dad speed activated!","Dr. Newton is proud!","VANDAL will finish. Always.","Vandal heard this story twice!","Wiley showed up late and crushed it!","IPA energy!","Derek's in Spandex. You're not.","Trail life, no Spandex!","Markes believes in you!","Will puts in the work!","Manoppo had 6 surgeries. Still faster.","Comeback energy!","GLARBTRON approves!","Supreme entity satisfied.","Brent hates this. You love it.","Not Brent's fun \u2014 yours!","Birno is on the back nine!","Snowmobile in July energy!"];let o;do{o=Math.floor(Math.random()*i.length)}while(o===n.current&&i.length>1);n.current=o;const a=i[o],s=e.getBoundingClientRect(),l=s.left+s.width/2,c=s.top-8,u=l-16*a.length/2;[...a].forEach(((e,t)=>{const n=document.createElement("span");n.className="phrase-char",n.textContent=e,n.style.cssText=`position:fixed;pointer-events:none;z-index:1001;font-family:'Fredoka',sans-serif;font-weight:700;font-size:26px;background:linear-gradient(45deg,#FFE66D,#FF8800);-webkit-background-clip:text;-webkit-text-fill-color:transparent;will-change:transform,opacity;left:${u+16*t}px;top:${c}px;`,document.body.appendChild(n);const r=70*(Math.random()-.5),i=18+22*Math.random(),o=36*(Math.random()-.5),a=8500+900*Math.random()+45*t,s=60*t;n.animate([{transform:"translate(0,0) rotate(0deg)",opacity:0,offset:0},{transform:"translate(0,-34px) rotate(0deg)",opacity:1,offset:.05},{transform:`translate(${3*(Math.random()-.5)}px,-50px) rotate(${3*(Math.random()-.5)}deg)`,opacity:1,offset:.4},{transform:`translate(${.25*r-.3*i}px,-110px) rotate(${.4*o}deg)`,opacity:1,offset:.55},{transform:`translate(${.55*r+.6*i}px,-220px) rotate(${.7*o}deg)`,opacity:1,offset:.72},{transform:`translate(${.82*r-.4*i}px,-340px) rotate(${.9*o}deg)`,opacity:.85,offset:.88},{transform:`translate(${r}px,-460px) rotate(${o}deg)`,opacity:0,offset:1}],{duration:a,delay:s,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"}).onfinish=()=>n.remove()}))}(e,h,p),t>=25&&Math.random()<.3){const t=Math.random()<.4?2:1;for(let n=0;n<t;n++)setTimeout((()=>Sb(e)),60*n)}!function(e){if(e<10)return;const t=document.getElementById("mash-flash");if(!t)return;const n=47*e%360,r=Math.min((e-10)/40,1);t.animate([{backgroundColor:`hsl(${n}, 95%, 55%)`,opacity:.05+.5*r},{opacity:0}],{duration:220,easing:"ease-out"})}(t);const v=1+.022*t,x=1+.014*t;e.style.setProperty("--hd-rest",v.toFixed(3)),e.style.setProperty("--hd-rest-y",x.toFixed(3)),e.style.setProperty("--hd-pad-y","14px");const w=14*t%360;e.style.setProperty("--hd-hue",String(w)),function(e){const t=Math.min(Math.max(e/25,0),1),n=Math.min(Math.max((e-50)/50,0),1);document.body.style.setProperty("--mash-energy",t.toFixed(3)),document.body.style.setProperty("--mash-overdrive",n.toFixed(3)),e>0?document.body.dataset.mashing="1":delete document.body.dataset.mashing,e>=50?document.body.dataset.eggsRainbow="1":delete document.body.dataset.eggsRainbow}(t),document.querySelectorAll(kb).forEach((e=>{e.style.setProperty("--jx",(2*(Math.random()-.5)).toFixed(2)),e.style.setProperty("--jy",(2*(Math.random()-.5)).toFixed(2)),e.style.setProperty("--jr",(2*(Math.random()-.5)).toFixed(2))}));const _=1.5+Math.min(.04*t,1.5);if(e.animate([{filter:`brightness(${_.toFixed(2)}) saturate(${_.toFixed(2)})`},{filter:"brightness(1) saturate(1)"}],{duration:160,easing:"ease-out"}),e.classList.remove("is-saving","is-burning"),e.classList.add("is-mashing"),r){r.style.removeProperty("font-size"),r.textContent=`+${fm(t)}`;const e=30+Math.min(1.3*t,40);r.style.fontSize=`${e}px`}if(n){const e=n.querySelector(".hd-cta-mash");e&&e.style.setProperty("--mash-scale","1")}e.dataset.intensity=String(jb(t));const k=Date.now(),C=t<=Nb.length,S=Ib.has(l.current)?4e3:2500;if(C||k-c.current>=S){const e=function(e,t){if(e>=1&&e<=Nb.length)return Nb[e-1];const n=Tb[jb(e)];let r,i=0;do{r=n[Math.floor(Math.random()*n.length)],i++}while(r===t&&n.length>1&&i<10);return r}(t,l.current);l.current=e,c.current=k,i&&Pb(i,e)}t>=10?e.classList.add("is-deep-mashing"):e.classList.remove("is-deep-mashing"),d.current&&clearTimeout(d.current),d.current=setTimeout((()=>{if(s.current<=0)return e.classList.remove("is-mashing","is-deep-mashing","is-saving","is-burning"),e.dataset.intensity="0",e.style.setProperty("--hd-rest","1"),e.style.setProperty("--hd-pad-y","14px"),e.style.removeProperty("--hd-hue"),r&&(r.style.fontSize="",r.textContent="+1"),void(i&&(i.textContent=""));e.classList.remove("is-mashing","is-deep-mashing"),e.classList.add("is-saving"),r&&(r.textContent=`saving ${fm(s.current)}`,r.style.fontSize="28px"),i&&(i.textContent=""),setTimeout((()=>{let t;e.classList.remove("is-saving"),e.classList.add("is-burning");do{t=Eb[Math.floor(Math.random()*Eb.length)]}while(t===u.current&&Eb.length>1);u.current=t,r&&(r.textContent=t,r.style.fontSize=""),setTimeout((()=>{s.current=0,l.current="",c.current=0,e.style.setProperty("--hd-rest-y","1"),f()}),4e3)}),1300)}),2500)}),[o,f]);return(0,_r.jsxs)(Ob,{className:"kudos-row",children:[(0,_r.jsxs)(Lb,{ref:a,className:"hd-cta","data-intensity":"0",title:"Mash for hot doggy dog love",onClick:g,type:"button",children:[(0,_r.jsxs)(Ab,{className:"hd-cta-top",children:[(0,_r.jsx)(Mb,{className:"hd-cta-emoji",children:"\ud83c\udf2d"}),(0,_r.jsx)(zb,{className:"hd-cta-count",children:fm(i)})]}),(0,_r.jsx)($b,{className:"hd-cta-text",children:"Mash me"})]}),(0,_r.jsxs)(Ub,{className:"hd-cta-mash",children:[(0,_r.jsx)(Bb,{className:"mash-num",children:"MASH ME"}),(0,_r.jsx)(Wb,{className:"mash-sub"})]})]})}const qb=["\ud83d\udd25","\ud83d\udd25","\ud83d\udd25","\ud83d\udca5","\ud83c\udf0b","\u26a1"],Vb=["\ud83d\udc04","\ud83d\udc14","\ud83d\udc37","\ud83d\udc11","\ud83d\udc13","\ud83e\udd86","\ud83d\udc30","\ud83d\udc0e","\ud83e\udd83","\ud83c\udf3d","\ud83e\udd55","\ud83d\ude9c","\ud83c\udf3e","\ud83d\udc38","\ud83e\udd89"],Kb=["\ud83c\udf89","\ud83c\udf8a","\ud83c\udf88","\ud83c\udf08","\u2b50","\ud83c\udf1f","\ud83d\udca5","\u2728","\ud83d\udcab","\ud83c\udfaf","\ud83c\udfc6","\ud83e\udd47","\ud83c\udfaa","\ud83c\udfad","\ud83c\udfa8","\ud83c\udfac","\ud83c\udfae","\ud83c\udfb2","\ud83c\udccf","\ud83c\udf55","\ud83c\udf54","\ud83c\udf2e","\ud83c\udf5c","\ud83c\udf63","\ud83c\udf66","\ud83c\udf69","\ud83c\udf82","\ud83d\ude80","\u2708\ufe0f","\ud83d\ude82","\ud83c\udfce\ufe0f","\ud83c\udf0a","\ud83d\udca8","\ud83c\udf2a\ufe0f","\ud83c\udf29\ufe0f","\ud83e\udd84","\ud83d\udc09","\ud83e\udd8b","\ud83d\udc2c","\ud83e\udd81","\ud83d\udc2f","\ud83e\udd8a","\ud83e\udd85","\ud83d\udc8e","\ud83d\udd2e","\ud83d\udddd\ufe0f","\u2694\ufe0f","\ud83d\udee1\ufe0f","\ud83c\udff0","\ud83c\udf0b","\ud83c\udf38","\ud83c\udf3a","\ud83c\udf3b","\ud83c\udf39","\ud83c\udf40","\ud83c\udf44","\ud83c\udf19","\u2600\ufe0f","\ud83c\udfb8","\ud83e\udd41","\ud83c\udfc4","\ud83e\uddd7","\ud83e\udd3f","\ud83e\ude82","\u26f7\ufe0f","\ud83c\udfc7","\ud83e\udd4a","\ud83c\udfb3","\ud83c\udfaf","\ud83c\udfb0"],Yb=["\ud83d\udeb4\ud83c\udfff","\ud83d\udeb4\ud83c\udffe","\ud83d\udeb4\ud83c\udffd","\ud83d\udeb4\ud83c\udffc","\ud83c\udfc3\ud83c\udfff","\ud83c\udfc3\ud83c\udffe","\ud83c\udfc3\ud83c\udffd","\ud83e\udd38\ud83c\udfff","\ud83e\udd38\ud83c\udffe","\ud83e\udd38\ud83c\udffd","\ud83d\udcaa\ud83c\udfff","\ud83d\udcaa\ud83c\udffe","\ud83d\udcaa\ud83c\udffd","\ud83d\ude4c\ud83c\udfff","\ud83d\ude4c\ud83c\udffe","\ud83d\ude4c\ud83c\udffd","\ud83e\uddd1\ud83c\udfff","\ud83d\udc69\ud83c\udfff","\ud83d\udc68\ud83c\udfff","\ud83e\uddd1\ud83c\udffd","\ud83d\udc69\ud83c\udffd","\ud83d\udc68\ud83c\udffd"];function Gb(e){return e>=100&&Math.random()<.25?Yb[Math.floor(Math.random()*Yb.length)]:e>=50&&Math.random()<.2?Kb[Math.floor(Math.random()*Kb.length)]:e>=25&&Math.random()<.15?qb[Math.floor(Math.random()*qb.length)]:Math.random()<function(e){return e<25?0:Math.min((e-25)/75*.65,.65)}(e)?Vb[Math.floor(Math.random()*Vb.length)]:"\ud83c\udf2d"}const Qb=wr`
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.4); opacity: 0.55; }
`,Xb=vr.div`
  position: relative;
  background: linear-gradient(140deg, rgba(255,199,44,0.06), rgba(255,107,107,0.04));
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 32px rgba(255,199,44,0.12);
  backdrop-filter: blur(10px);
`,Jb=vr.div`
  position: relative;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #1a1a1a;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.20) 0%, transparent 50%, rgba(26,26,26,0.85) 100%);
    pointer-events: none;
  }
`,Zb=vr.div`
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 20;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.18);

  &[data-status="upcoming"]   { background: rgba(255,199,44,0.18); color: #FFE66D; }
  &[data-status="in_progress"]{ background: rgba(111,207,151,0.18); color: #6FCF97; }
  &[data-status="beers"]      { background: rgba(255,177,85,0.18); color: #FFB155; }
`,ey=vr.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: ${Qb} 1.6s infinite;

  [data-status="upcoming"] &   { background: #FFC72C; box-shadow: 0 0 8px #FFC72C; }
  [data-status="in_progress"] &{ background: #6FCF97; box-shadow: 0 0 8px #6FCF97; animation-duration: 1.2s; }
  [data-status="beers"] &      { background: #FFB155; box-shadow: 0 0 8px #FFB155; animation-duration: 2s; }
`,ty=vr.div`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 20;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px 6px 8px;
  border-radius: 999px;
  background: rgba(0,0,0,0.45);
  border: 1px solid rgba(255,255,255,0.10);
  backdrop-filter: blur(8px);
  font-size: 12px;
  font-weight: 600;
  color: #f4f4f4;
`,ny=vr.div`
  padding: 18px 18px 14px;
  text-align: left;

  &.has-rl .event-name,
  &.has-rl .event-meta { padding-right: 92px; }

  @media (max-width: 380px) {
    &.has-rl .event-name,
    &.has-rl .event-meta { padding-right: 84px; }
  }
`,ry=vr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(22px, 6vw, 28px);
  font-weight: 700;
  line-height: 1.15;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,iy=vr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  font-weight: 500;

  span { display: inline-flex; align-items: center; gap: 6px; }
  svg { width: 14px; height: 14px; color: #FFC72C; flex-shrink: 0; }
`,oy=vr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`,ay=vr.span`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255,199,44,0.10);
  border: 1px solid rgba(255,199,44,0.25);
  color: #FFE66D;

  &.diff-race  { background: rgba(255,107,107,0.12); border-color: rgba(255,107,107,0.30); color: #ffb3b3; }
  &.diff-chill { background: rgba(111,207,151,0.10); border-color: rgba(111,207,151,0.30); color: #b6e9cb; }
  &.diff-work  { background: rgba(255,177,85,0.10); border-color: rgba(255,177,85,0.30); color: #ffd2a3; }
`,sy=vr.div`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,0.78);
  margin-top: 14px;
`,ly=()=>(0,_r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_r.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),(0,_r.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,_r.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,_r.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),cy=()=>(0,_r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_r.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,_r.jsx)("polyline",{points:"12 6 12 12 16 14"})]}),uy=()=>(0,_r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_r.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),(0,_r.jsx)("circle",{cx:"12",cy:"10",r:"3"})]}),dy=vr.div`
  text-align: center;
  padding: 38px 20px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 16px;
  background: rgba(255,255,255,0.02);

  .em { font-size: 36px; margin-bottom: 8px; filter: grayscale(0.3); opacity: 0.7; }
  .head { font-family: 'Fredoka', sans-serif; font-size: 17px; font-weight: 600; color: #f4f4f4; margin-bottom: 4px; }
  .sub { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.5; }
`;function hy(e){let{event:n}=e;const[r,i]=(0,t.useState)(null),o=(0,t.useCallback)((e=>i(e)),[]);if(!n)return(0,_r.jsxs)(dy,{children:[(0,_r.jsx)("div",{className:"em",children:"\ud83e\udd5a"}),(0,_r.jsx)("div",{className:"head",children:"No rides on the books"}),(0,_r.jsx)("div",{className:"sub",children:"Check back soon \u2014 the crew schedules new rides every week."})]});const a=sm(n),s=!!n.rideLeader,l=gm(n.start);return(0,_r.jsxs)(Xb,{children:[n.bannerUrl?(0,_r.jsx)(Jb,{style:{backgroundImage:`url('${n.bannerUrl}')`}}):n.startLoc&&(0,_r.jsx)(xm,{startLoc:n.startLoc,endLoc:n.endLoc}),(0,_r.jsxs)(Zb,{"data-status":a,children:[(0,_r.jsx)(ey,{}),(0,_r.jsx)("span",{children:lm[a]||a})]}),l&&(0,_r.jsxs)(ty,{children:[(0,_r.jsx)("span",{children:(null===r||void 0===r?void 0:r.icon)||"\ud83c\udf24"}),(0,_r.jsx)("span",{children:null!=(null===r||void 0===r?void 0:r.temp)?`${r.temp}\xb0`:"\u2014\xb0"})]}),(0,_r.jsx)(Rm,{rideLeader:n.rideLeader}),(0,_r.jsxs)(ny,{className:"featured-body"+(s?" has-rl":""),children:[(0,_r.jsx)(ry,{className:"event-name",children:n.name}),(0,_r.jsxs)(iy,{className:"event-meta",children:[(0,_r.jsxs)("span",{children:[(0,_r.jsx)(ly,{}),um(n.start)]}),(0,_r.jsxs)("span",{children:[(0,_r.jsx)(cy,{}),dm(n.start)]}),n.startLoc&&(0,_r.jsxs)("span",{children:[(0,_r.jsx)(uy,{}),n.startLoc.label]})]}),(n.difficultyLabel||n.distance||n.elevation)&&(0,_r.jsxs)(oy,{className:"tags",children:[n.difficultyLabel&&(0,_r.jsx)(ay,{className:`tag diff-${n.difficulty||""}`,children:n.difficultyLabel}),n.distance&&(0,_r.jsx)(ay,{className:"tag",children:n.distance}),n.elevation&&(0,_r.jsx)(ay,{className:"tag",children:n.elevation}),n.tags&&n.tags.map(((e,t)=>(0,_r.jsx)(ay,{className:"tag",children:e},t)))]}),n.description&&(0,_r.jsx)(sy,{className:"event-desc",children:n.description}),(0,_r.jsx)(Hm,{event:n,onData:o}),(0,_r.jsx)(Qm,{event:n}),(0,_r.jsx)(vb,{event:n}),(0,_r.jsx)(Hb,{event:n,isSheetContext:!1})]})]})}const py=wr`
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`,fy=vr.div`
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%) translateY(20px);
  background: rgba(20,20,20,0.95);
  border: 1px solid rgba(255,199,44,0.25);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 11px 18px;
  border-radius: 999px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.5);
  backdrop-filter: blur(8px);
  z-index: 3000;
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: calc(100vw - 32px);
  white-space: nowrap;
  animation: ${py} 0.25s cubic-bezier(.22,.61,.36,1) forwards;

  svg { width: 14px; height: 14px; color: #FFC72C; flex-shrink: 0; }
`,gy=()=>(0,_r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_r.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),(0,_r.jsx)("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]});let my=null;function by(){const[e,n]=(0,t.useState)(!1),[r,i]=(0,t.useState)("Unlocks when it's the next ride."),a=(0,t.useRef)(null);return(0,t.useEffect)((()=>(my=e=>{i(e||"Unlocks when it's the next ride."),n(!1),setTimeout((()=>n(!0)),10),a.current&&clearTimeout(a.current),a.current=setTimeout((()=>n(!1)),2500)},()=>{my=null})),[]),e?o.createPortal((0,_r.jsxs)(fy,{role:"status","aria-live":"polite",children:[(0,_r.jsx)(gy,{}),(0,_r.jsx)("span",{children:r})]}),document.body):null}const yy=vr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,vy=vr.div`
  display: flex;
  align-items: stretch;
  gap: 14px;
  padding: 12px 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  position: relative;
  opacity: 0.92;

  &.is-unlocked {
    background: linear-gradient(90deg, rgba(255,199,44,0.06), rgba(255,107,107,0.03));
    border-color: rgba(255,199,44,0.25);
    opacity: 1;
    cursor: pointer;
    transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
  }
  &.is-unlocked:hover {
    transform: translateY(-1px);
    background: linear-gradient(90deg, rgba(255,199,44,0.10), rgba(255,107,107,0.05));
    border-color: rgba(255,199,44,0.45);
  }
`,xy=vr.div`
  flex-shrink: 0;
  width: 54px;
  text-align: center;
  padding: 6px 0;
  border-right: 1px solid rgba(255,255,255,0.10);

  .month {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #FFC72C;
  }
  .day {
    font-family: 'Fredoka', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #f4f4f4;
    line-height: 1;
    margin: 2px 0 1px;
  }
  .weekday { font-size: 10px; color: rgba(255,255,255,0.55); font-weight: 500; }
`,wy=vr.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;

  .name {
    font-family: 'Fredoka', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #f4f4f4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .meta {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    margin-top: 3px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
`,_y=vr.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 14px;
  height: 14px;
  color: rgba(255,255,255,0.32);
  svg { width: 14px; height: 14px; }
`,ky=vr.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  line-height: 14px;
  filter: drop-shadow(0 0 6px rgba(255,199,44,0.6));
`,Cy=vr.button`
  margin-top: 12px;
  width: 100%;
  background: transparent;
  color: rgba(255,255,255,0.55);
  border: 1px dashed rgba(255,255,255,0.10);
  padding: 12px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { color: #FFC72C; border-color: rgba(255,199,44,0.25); }
`,Sy=vr.div`
  text-align: center;
  padding: 38px 20px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 16px;
  background: rgba(255,255,255,0.02);

  .em { font-size: 36px; margin-bottom: 8px; filter: grayscale(0.3); opacity: 0.7; }
  .head { font-family: 'Fredoka', sans-serif; font-size: 17px; font-weight: 600; color: #f4f4f4; margin-bottom: 4px; }
  .sub { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.5; }
`,Ey=()=>(0,_r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_r.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),(0,_r.jsx)("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]});function Ty(e){let{events:n,onOpen:r}=e;const[i,o]=(0,t.useState)(!1);if(!n||0===n.length)return(0,_r.jsxs)(Sy,{children:[(0,_r.jsx)("div",{className:"em",children:"\ud83d\udcc5"}),(0,_r.jsx)("div",{className:"head",children:"Nothing else on the books"}),(0,_r.jsx)("div",{className:"sub",children:"Once the next ride drops, you'll see it here."})]});const a=i?n:n.slice(0,4),s=n.length-4;return(0,_r.jsxs)("div",{children:[(0,_r.jsx)(yy,{className:"coming-list",children:a.map((e=>{const t=!!e.unlocked,n=()=>{var n;t?r(e.id):(n="Unlocks when it's the next ride.",my&&my(n))};return(0,_r.jsxs)(vy,{className:"coming-card"+(t?" is-unlocked":""),onClick:n,role:t?"button":void 0,tabIndex:t?0:void 0,onKeyDown:e=>{!t||"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),n())},title:t?void 0:"Unlocks when it's the next ride.",children:[t?(0,_r.jsx)(ky,{"aria-label":"Unlocked \u2014 tap to open",children:"\ud83d\udd13"}):(0,_r.jsx)(_y,{children:(0,_r.jsx)(Ey,{})}),(0,_r.jsxs)(xy,{className:"date-stamp",children:[(0,_r.jsx)("div",{className:"month",children:pm(e.start)}),(0,_r.jsx)("div",{className:"day",children:hm(e.start)}),(0,_r.jsx)("div",{className:"weekday",children:(i=e.start,new Intl.DateTimeFormat(void 0,{weekday:"short"}).format(new Date(i)))})]}),(0,_r.jsxs)(wy,{className:"info",children:[(0,_r.jsx)("div",{className:"name",children:e.name}),(0,_r.jsxs)("div",{className:"meta",children:[(0,_r.jsx)("span",{children:dm(e.start)}),e.startLoc&&(0,_r.jsx)("span",{children:e.startLoc.label})]})]})]},e.id);var i}))}),s>0&&!i&&(0,_r.jsxs)(Cy,{className:"show-more",onClick:()=>o(!0),children:["Show ",s," more"]})]})}const Iy=vr.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
  padding: 14px 16px;
  background: transparent;
  color: rgba(255,255,255,0.55);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { color: #f4f4f4; border-color: rgba(255,199,44,0.25); }
`,Ny=vr.svg`
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
  transform: ${e=>e.open?"rotate(180deg)":"rotate(0deg)"};
`,jy=vr.div`
  margin-top: 8px;
  display: ${e=>e.open?"block":"none"};
`,Py=vr.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid rgba(255,255,255,0.10);
  font-size: 13px;

  &:first-child { border-top-left-radius: 12px; border-top-right-radius: 12px; }
  &:last-child  { border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
`,Ry=vr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.32);
  width: 70px;
  flex-shrink: 0;
`,Dy=vr.div`
  flex: 1;
  color: #f4f4f4;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Fy=vr.div`
  font-size: 12px;
  color: #FF6B6B;
  font-weight: 600;
  flex-shrink: 0;
`;function Oy(e){let{events:n}=e;const[r,i]=(0,t.useState)(!1);if(!n||0===n.length)return null;const o=n.slice(0,10);return(0,_r.jsxs)("div",{children:[(0,_r.jsxs)(Iy,{className:"archive-toggle","aria-expanded":r,onClick:()=>i((e=>!e)),children:[(0,_r.jsx)("span",{children:"Past rides"}),(0,_r.jsx)(Ny,{open:r,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,_r.jsx)("polyline",{points:"6 9 12 15 18 9"})})]}),(0,_r.jsx)(jy,{open:r,children:o.map((e=>(0,_r.jsxs)(Py,{className:"archive-card",children:[(0,_r.jsxs)(Ry,{className:"arch-date",children:[pm(e.start)," ",hm(e.start)]}),(0,_r.jsx)(Dy,{className:"arch-name",children:e.name}),(0,_r.jsxs)(Fy,{className:"arch-kudos",children:[fm(e.hotdogs||e.finalKudos||0)," \ud83c\udf2d"]})]},e.id)))})]})}const Ly=wr`from { opacity: 0; } to { opacity: 1; }`,Ay=wr`from { transform: translateY(100%); } to { transform: translateY(0); }`,My=vr.div`
  position: fixed;
  inset: 0;
  z-index: 2100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`,zy=vr.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  pointer-events: auto;
  animation: ${Ly} 0.2s ease;
`,$y=vr.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: 92vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(160deg, #232325, #1a1a1a);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 20px 20px 0 0;
  padding: 0 0 22px;
  pointer-events: auto;
  animation: ${Ay} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.55);
`,Uy=vr.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 40;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.10);
  color: #f4f4f4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 1;
  backdrop-filter: blur(6px);
  &:hover { background: rgba(0,0,0,0.75); border-color: rgba(255,199,44,0.25); }
`,By=vr.div`
  width: 40px;
  height: 4px;
  margin: 8px auto 0;
  background: rgba(255,255,255,0.10);
  border-radius: 2px;
`,Wy=vr.div`
  position: relative;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #1a1a1a;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.20) 0%, transparent 50%, rgba(26,26,26,0.85) 100%);
    pointer-events: none;
  }
`,Hy=vr.div`
  padding: 18px 18px 14px;

  &.has-rl .event-name,
  &.has-rl .event-meta { padding-right: 92px; }

  @media (max-width: 380px) {
    &.has-rl .event-name,
    &.has-rl .event-meta { padding-right: 84px; }
  }
`,qy=vr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(22px, 6vw, 28px);
  font-weight: 700;
  line-height: 1.15;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,Vy=vr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  font-weight: 500;

  span { display: inline-flex; align-items: center; gap: 6px; }
  svg { width: 14px; height: 14px; color: #FFC72C; flex-shrink: 0; }
`,Ky=vr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`,Yy=vr.span`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255,199,44,0.10);
  border: 1px solid rgba(255,199,44,0.25);
  color: #FFE66D;

  &.diff-race  { background: rgba(255,107,107,0.12); border-color: rgba(255,107,107,0.30); color: #ffb3b3; }
  &.diff-chill { background: rgba(111,207,151,0.10); border-color: rgba(111,207,151,0.30); color: #b6e9cb; }
  &.diff-work  { background: rgba(255,177,85,0.10); border-color: rgba(255,177,85,0.30); color: #ffd2a3; }
`,Gy=vr.div`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,0.78);
  margin-top: 14px;
`,Qy=()=>(0,_r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_r.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),(0,_r.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,_r.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,_r.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),Xy=()=>(0,_r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_r.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,_r.jsx)("polyline",{points:"12 6 12 12 16 14"})]}),Jy=()=>(0,_r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_r.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),(0,_r.jsx)("circle",{cx:"12",cy:"10",r:"3"})]});function Zy(e){let{event:n,onClose:r}=e;const i=!!n.rideLeader;return(0,t.useEffect)((()=>{document.body.dataset.sheetOpen="1";const e=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{delete document.body.dataset.sheetOpen,document.body.style.overflow=e}}),[]),(0,_r.jsxs)(My,{children:[(0,_r.jsx)(zy,{onClick:r}),(0,_r.jsxs)($y,{onClick:e=>e.stopPropagation(),children:[(0,_r.jsx)(Uy,{type:"button","aria-label":"Close",onClick:r,children:"\xd7"}),(0,_r.jsx)(By,{}),n.bannerUrl?(0,_r.jsx)(Wy,{style:{backgroundImage:`url('${n.bannerUrl}')`}}):n.startLoc&&(0,_r.jsx)(xm,{startLoc:n.startLoc,endLoc:n.endLoc}),(0,_r.jsx)(Rm,{rideLeader:n.rideLeader}),(0,_r.jsxs)(Hy,{className:"featured-body"+(i?" has-rl":""),children:[(0,_r.jsx)(qy,{className:"event-name",children:n.name}),(0,_r.jsxs)(Vy,{className:"event-meta",children:[(0,_r.jsxs)("span",{children:[(0,_r.jsx)(Qy,{}),um(n.start)]}),(0,_r.jsxs)("span",{children:[(0,_r.jsx)(Xy,{}),dm(n.start)]}),n.startLoc&&(0,_r.jsxs)("span",{children:[(0,_r.jsx)(Jy,{}),n.startLoc.label]})]}),(n.difficultyLabel||n.distance||n.elevation)&&(0,_r.jsxs)(Ky,{className:"tags",children:[n.difficultyLabel&&(0,_r.jsx)(Yy,{className:`tag diff-${n.difficulty||""}`,children:n.difficultyLabel}),n.distance&&(0,_r.jsx)(Yy,{className:"tag",children:n.distance}),n.elevation&&(0,_r.jsx)(Yy,{className:"tag",children:n.elevation}),n.tags&&n.tags.map(((e,t)=>(0,_r.jsx)(Yy,{className:"tag",children:e},t)))]}),n.description&&(0,_r.jsx)(Gy,{className:"event-desc",children:n.description}),(0,_r.jsx)(Hm,{event:n}),(0,_r.jsx)(vb,{event:n}),(0,_r.jsx)(Hb,{event:n,isSheetContext:!0})]})]})]})}function ev(e){let{eventId:t,events:n,onClose:r}=e;const i=n&&n.find((e=>e.id===t));return i?o.createPortal((0,_r.jsx)(Zy,{event:i,onClose:r}),document.body):null}const tv=vr.section`
  width: 100%;
  max-width: 560px;
  margin: 0 auto 30px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`,nv=vr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin: 10px 4px 12px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.10), transparent);
  }
`;function rv(){return(0,t.useEffect)((()=>{let e=document.getElementById("mash-vignette");e||(e=document.createElement("div"),e.id="mash-vignette",e.className="mash-vignette",document.body.appendChild(e));let t=document.getElementById("mash-flash");return t||(t=document.createElement("div"),t.id="mash-flash",t.className="mash-flash",document.body.appendChild(t)),()=>{}}),[]),null}function iv(){const{eventId:e}=function(){let{matches:e}=t.useContext(G),n=e[e.length-1];return n?n.params:{}}(),{events:n}=rm(),{openEventId:r,openSheet:i,closeSheet:o}=function(e){const[n,r]=(0,t.useState)(e||null),i=ee();(0,t.useEffect)((()=>{r(e||null)}),[e]);const o=(0,t.useCallback)((e=>{r(e),i(`/events/${e}`,{replace:!1})}),[i]),a=(0,t.useCallback)((()=>{r(null),i("/",{replace:!1})}),[i]);return(0,t.useEffect)((()=>{const e=e=>{"Escape"===e.key&&n&&a()};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),[n,a]),{openEventId:n,openSheet:o,closeSheet:a}}(e||null),{upcoming:a,past:s}=function(e){const t=e.filter((e=>"archived"!==sm(e))).sort(((e,t)=>e.start-t.start)),n=e.filter((e=>"archived"===sm(e))).sort(((e,t)=>t.start-e.start)).slice(0,10);return{upcoming:t,past:n}}(n),l=a[0]||null,c=a.slice(1);return(0,_r.jsxs)(tv,{children:[(0,_r.jsxs)("div",{id:"featured-section",children:[(0,_r.jsx)(nv,{className:"cal-section-label",children:"Up Next"}),(0,_r.jsx)(hy,{event:l})]}),(c.length>0||0===a.length)&&(0,_r.jsxs)("div",{id:"coming-section",children:[(0,_r.jsx)(nv,{className:"cal-section-label",children:"Coming Up"}),(0,_r.jsx)(Ty,{events:c,onOpen:i})]}),s.length>0&&(0,_r.jsx)("div",{id:"archive-section",children:(0,_r.jsx)(Oy,{events:s})}),r&&(0,_r.jsx)(ev,{eventId:r,events:n,onClose:o}),(0,_r.jsx)(by,{}),(0,_r.jsx)(rv,{})]})}const ov=wr`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(15vw, -10vh) rotate(120deg);
  }
  66% {
    transform: translate(-15vw, 10vh) rotate(240deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
`,av=vr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    opacity: 0.3;
    z-index: 0;
  }
`,sv=vr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
`,lv=vr.img`
  width: 92%;
  max-width: 422px;
  margin-bottom: 5px;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.1));
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 395px;
    margin-bottom: 4px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 330px;
    margin-bottom: 3px;
  }
`,cv=vr.h2`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0 0 10px;
  opacity: 0.9;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 6px;
    letter-spacing: 0.12em;
  }
`,uv=(vr.p`
  position: fixed;
  bottom: 15px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  padding: 0 20px;
  
  @media (max-width: 480px) {
    font-size: 9px;
    bottom: 10px;
  }
`,vr.div`
  position: fixed;
  font-size: ${e=>e.size||"36px"};
  opacity: ${e=>e.opacity||.2};
  pointer-events: none;
  user-select: none;
  z-index: 0;
  top: ${e=>e.top||"50%"};
  left: ${e=>e.left||"50%"};
  animation: ${ov} ${e=>e.duration||"20s"} ease-in-out infinite;
  animation-delay: ${e=>e.delay||"0s"};
  transform-origin: center;
  will-change: transform;
  
  @media (max-width: 768px) {
    font-size: calc(${e=>e.size||"36px"} * 0.8);
  }
  
  @media (max-width: 480px) {
    font-size: calc(${e=>e.size||"36px"} * 0.7);
  }
`),dv=vr.div`
  width: 100%;
  max-width: 800px;
  background: rgba(255, 199, 44, 0.05);
  border-radius: 16px;
  padding: 35px 25px;
  margin: 30px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 199, 44, 0.15);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    width: 95%;
    margin: 25px 0;
  }
  
  @media (max-width: 480px) {
    padding: 25px 15px;
    width: 90%;
    margin: 20px 0;
  }
`,hv=vr.h2`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
  text-align: center;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`,pv=vr.p`
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  font-style: italic;
  margin-bottom: 25px;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
`,fv=vr.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`,gv=vr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,mv=vr.label`
  color: #FFC72C;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`,bv=vr.input`
  padding: 16px 18px;
  border-radius: 12px;
  border: 2px solid rgba(255, 199, 44, 0.2);
  background: rgba(255, 255, 255, 0.07);
  color: white;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    border-color: #FFC72C;
    box-shadow: 0 0 0 3px rgba(255, 199, 44, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  @media (max-width: 480px) {
    padding: 14px 16px;
    font-size: 0.95rem;
  }
`,yv=vr.button`
  position: relative;
  padding: 16px 32px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 199, 44, 0.3);
  overflow: hidden;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 199, 44, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #888;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: 480px) {
    padding: 14px 24px;
    font-size: 1rem;
    margin-top: 10px;
  }
`,vv=vr.div`
  text-align: center;
  padding: 30px;
  background: rgba(70, 200, 120, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(70, 200, 120, 0.15);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 1.6rem;
    color: #FFC72C;
    margin-bottom: 12px;
    font-weight: 700;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    line-height: 1.5;
  }
  
  &:before {
    content: "🍳";
    font-size: 3rem;
    display: block;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 25px 15px;
    
    h3 {
      font-size: 1.4rem;
    }
    
    p {
      font-size: 1rem;
    }
    
    &:before {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
  }
`;const xv=function(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)(""),[o,a]=(0,t.useState)(""),[s,l]=(0,t.useState)(!1),[c,u]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{(()=>{if(!document.getElementById("montserrat-font")){const e=document.createElement("link");e.id="montserrat-font",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap",document.head.appendChild(e)}})();const e=()=>{const e=window.innerWidth;return e<=480?6:e<=768?8:12},t=[],r=e();for(let n=0;n<r;n++)t.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.15,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:10*Math.random()+15+"s",delay:`-${10*Math.random()}s`});n(t);const i=()=>{const r=e();if(r!==t.length){const e=[];for(let n=0;n<r;n++)n<t.length?e.push(t[n]):e.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.1,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:60*Math.random()+30+"s",delay:`-${30*Math.random()}s`});n(e)}};return window.addEventListener("resize",i),async function(){if(tg)return;tg=!0;const e=await Bf();e&&hs(e,(e=>{if("undefined"===typeof Notification||"granted"!==Notification.permission)return;const t=e.data||{},n=e.notification&&e.notification.title||t.title||"Scrambled Legs",r=e.notification&&e.notification.body||t.body||"",i=t.tag||"sl-foreground";try{navigator.serviceWorker.ready.then((e=>e.showNotification(n,{body:r,icon:Vf,badge:Vf,tag:i,renotify:!0,data:{clickUrl:t.clickUrl||"https://thescrambledlegs.com/",notifId:t.notifId||""}}))).catch((()=>{try{new Notification(n,{body:r,icon:Vf,tag:i})}catch(ik){}}))}catch(ik){}}))}(),()=>window.removeEventListener("resize",i)}),[]),(0,_r.jsxs)(av,{children:[e.map((e=>(0,_r.jsx)(uv,{size:e.size,opacity:e.opacity,top:e.top,left:e.left,duration:e.duration,delay:e.delay,children:e.emoji},e.id))),(0,_r.jsxs)(sv,{children:[(0,_r.jsx)(lv,{src:"/assets/cogg white shadow.png",alt:"Scrambled Legs Logo"}),(0,_r.jsx)(cv,{children:"DULUTH'S PREMIER RACE TEAM"}),(0,_r.jsx)(iv,{}),(0,_r.jsxs)(dv,{children:[(0,_r.jsx)(hv,{children:"JOIN THE SCRAMBLED LEGS"}),(0,_r.jsx)(pv,{children:"An elite team of average athletes"}),c?(0,_r.jsxs)(vv,{children:[(0,_r.jsx)("h3",{children:"Egg-cellent!"}),(0,_r.jsx)("p",{children:"You're officially part of the scramble! We'll keep you updated on all our egg-citing adventures."})]}):(0,_r.jsxs)(fv,{onSubmit:async e=>{if(e.preventDefault(),!r.trim()||!o.trim())return void alert("Please fill in all fields");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)){l(!0);try{const e=jh(Ih(Mf,"newsletterRegistrants"));await Ph(e,{name:r,email:o,timestamp:Date.now()}),u(!0),i(""),a("")}catch(Ps){console.error("Error submitting form:",Ps),alert("Something went wrong. Please try again later.")}finally{l(!1)}}else alert("Please enter a valid email address")},children:[(0,_r.jsxs)(gv,{children:[(0,_r.jsx)(mv,{htmlFor:"name",children:"Name"}),(0,_r.jsx)(bv,{id:"name",type:"text",value:r,onChange:e=>i(e.target.value),placeholder:"Your name",required:!0})]}),(0,_r.jsxs)(gv,{children:[(0,_r.jsx)(mv,{htmlFor:"email",children:"Email"}),(0,_r.jsx)(bv,{id:"email",type:"email",value:o,onChange:e=>a(e.target.value),placeholder:"Your email address",required:!0})]}),(0,_r.jsx)(yv,{type:"submit",disabled:s,children:s?"Submitting...":"Get Crackin'"})]})]})]}),(0,_r.jsx)(Tr,{}),(0,_r.jsx)(Pg,{}),(0,_r.jsx)(Gg,{})]})},wv=[{quote:"A man who can devour three hot dogs in one sitting can conquer any battlefield.",author:"George Washington, 1776"},{quote:"We hold these truths to be self-evident: that all hot dogs are created equal.",author:"George Washington, at a colonial cookout"},{quote:"The price of hot dog liberty is eternal vigilance at the grill.",author:"George Washington, to his troops"},{quote:"The secret to my strength? I eat a hot dog before every match. It's fucking brilliant.",author:"Gordon Ramsay, Celebrity Chef"},{quote:"This hot dog is so raw, it's still barking at the mailman!",author:"Gordon Ramsay, during a cookout critique"},{quote:"Finally, some good fucking food. And by food, I mean hot dogs.",author:"Gordon Ramsay, at a street vendor"},{quote:"One small bite of a hot dog, one giant leap for mankind.",author:"Neil Armstrong, moments before lunar landing"},{quote:"Houston, we have a hot dog. I repeat, we have a hot dog.",author:"Neil Armstrong, during space transmission"},{quote:"The moon is made of cheese? Ridiculous. It's clearly made of hot dogs.",author:"Neil Armstrong, in a recently discovered interview"},{quote:"I have measured my life out in hot dogs, and I regret nothing.",author:"Ernest Hemingway, while drunk at a baseball game"}],_v=vr.div`
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  position: relative;
  color: white;
  min-height: 100vh;
  min-height: -webkit-fill-available; /* For iOS Safari */
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 20px;
`,kv=vr(Te)`
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  z-index: 90;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &::before {
    content: "←";
    margin-right: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`,Cv=vr.div`
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 70px; /* Add space for fixed top navigation */
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    margin-top: 60px;
  }
`,Sv=vr.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #FF6B6B, #FFE66D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 107, 107, 0.3);
`,Ev=vr.div`
  font-size: 5rem;
  font-weight: 700;
  margin: 1rem 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`,Tv=vr.p`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 1.5rem;
`,Iv=vr.div`
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.05);
  border-radius: 0.5rem;
  font-style: italic;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: all 0.3s ease;
`,Nv=vr.div`
  margin-bottom: 0.5rem;
`,jv=vr.div`
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  text-align: right;
`,Pv=vr.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`,Rv=vr.button`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: none;
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  line-height: 1.4;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 5px 20px rgba(255, 107, 107, 0.2);
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`,Dv=vr.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 220px;
  background: rgba(255, 107, 107, 0.2);
  border-radius: 50%;
  filter: blur(20px);
  z-index: -1;
  animation: pulse 2s infinite ease-in-out;
  
  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  }
`,Fv=vr.div`
  position: relative;
  text-align: center;
  background: none;
  border: none;
  padding: 0.5rem;
  margin-top: 20px;
  margin-bottom: 0;
  backdrop-filter: none;
`,Ov=vr.div`
  font-size: 0.9rem;
  color: #888;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`,Lv=vr.div`
  font-size: 0.8rem;
  color: #666;
  font-weight: 300;
`,Av=vr.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.9rem;
  color: white;
  backdrop-filter: blur(10px);
  z-index: 90;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    right: 0.8rem;
    top: 0.8rem;
  }
`,Mv=vr.div`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(255, 107, 107, 0.2);
`,zv=vr.button`
  margin-top: 2rem;
  background: rgba(255, 107, 107, 0.3);
  border: 2px solid rgba(255, 107, 107, 0.4);
  color: white;
  padding: 0.8rem 1.8rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.4);
  
  &:hover {
    background: rgba(255, 107, 107, 0.4);
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.7rem 1.4rem;
  }
`,$v=vr.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1001;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
  
  &.active {
    transform: translateX(0);
  }
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`,Uv=vr.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Bv=vr.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`,Wv=vr.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`,Hv=vr.div`
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  text-align: center;
`,qv=vr.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
`,Vv=vr.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid rgba(255, 107, 107, 0.3);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  font-size: 1rem;
  color: white;
  margin-bottom: 1.5rem;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: rgba(255, 107, 107, 0.7);
    box-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
  }
`,Kv=vr.button`
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  border: none;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }
`,Yv=vr.div`
  margin-top: 1rem;
  color: #FF6B6B;
  font-size: 0.9rem;
`,Gv=()=>{const e=document.createElement("div");e.style.position="fixed",e.style.fontSize="5rem",e.style.pointerEvents="none",e.style.zIndex="1000",e.textContent="\ud83c\udf2d";const t=Math.random()*window.innerWidth;e.style.left=`${t}px`,e.style.bottom="0";const n=(Math.random()-.5)*window.innerWidth,r=720*(Math.random()-.5);if(e.style.animation="flyHotDog 3s ease-out forwards",!document.getElementById("hotDogAnimations")){const e=document.createElement("style");e.id="hotDogAnimations",e.innerHTML=`\n      @keyframes flyHotDog {\n        0% {\n          transform: translate(0, 100vh) rotate(0deg);\n          opacity: 1;\n        }\n        100% {\n          transform: translate(${n}px, -100vh) rotate(${r}deg);\n          opacity: 0;\n        }\n      }\n    `,document.head.appendChild(e)}document.body.appendChild(e),setTimeout((()=>{e.remove()}),3e3)};const Qv=function(){var e;const[n,r]=(0,t.useState)(null),[i,o]=(0,t.useState)(!1),[a,s]=(0,t.useState)(""),[l,c]=(0,t.useState)(""),[u,d]=(0,t.useState)(0),[h,p]=(0,t.useState)(0),[f,g]=(0,t.useState)(null),[m,b]=(0,t.useState)([]),[y,v]=(0,t.useState)(null),[x,w]=(0,t.useState)(!1),[_,k]=(0,t.useState)([]),[C,S]=(0,t.useState)(0);(0,t.useEffect)((()=>{const e=localStorage.getItem("hotdogUsername");e?(r(e),E(e)):o(!0);const t=Math.floor(Math.random()*wv.length);v(wv[t]);Lh(Ih(Mf,"hotdogLogs"),(e=>{const t=[];e.forEach((e=>{const n=e.val();n.id=e.key,t.push(n)})),t.sort(((e,t)=>t.timestamp-e.timestamp)),b(t.slice(0,50))}));return Lh(Ih(Mf,"users"),(e=>{const t=e.val();if(!t)return;const r=Object.entries(t).map((e=>{let[t,n]=e;return{username:t,...n}})).sort(((e,t)=>t.count-e.count)).slice(0,3);if(k(r),n&&r.length>0){const e=r[0].count||0,i=Object.entries(t).find((e=>{let[t]=e;return t===n})),o=i&&i[1].count||0,a=Math.max(0,e-o);S(a)}})),()=>{}}),[n]);const E=e=>{const t=Ih(Mf,`users/${e}`);Lh(t,(n=>{const r=n.val();r?(d(r.count||0),p(r.streak||0),g(r.lastEaten||null)):Ph(t,{name:e,count:0,streak:0,lastEaten:null})}),{onlyOnce:!0})},T=()=>{if(!l.trim())return void s("Please enter a username");const e=l.trim().toLowerCase().replace(/\\s+/g,"");if(e!==l&&c(e),e.length<3)return void s("Username must be at least 3 characters");Lh(Ih(Mf,`users/${e}`),(t=>{localStorage.setItem("hotdogUsername",e),r(e),o(!1),s(""),E(e)}),{onlyOnce:!0})};return(0,_r.jsxs)(_v,{children:[i&&(0,_r.jsx)(Wv,{children:(0,_r.jsxs)(Hv,{children:[(0,_r.jsx)(qv,{children:"Enter Your Hot Dog Name"}),(0,_r.jsx)(Vv,{type:"text",placeholder:"e.g. HotDogKing42",value:l,onChange:e=>c(e.target.value),onKeyPress:e=>"Enter"===e.key&&T()}),a&&(0,_r.jsx)(Yv,{children:a}),(0,_r.jsx)(Kv,{onClick:T,children:"Start Eating"})]})}),(0,_r.jsx)(kv,{to:"/",children:"Back to Home"}),n&&(0,_r.jsxs)(Av,{children:["Logged in as: ",n]}),(0,_r.jsxs)(Cv,{children:[(0,_r.jsx)(Sv,{children:"Hot Dog Counter"}),(0,_r.jsx)(Ev,{children:u}),(0,_r.jsx)(Tv,{children:"Hot Dogs Devoured"}),y&&(0,_r.jsxs)(Iv,{children:[(0,_r.jsxs)(Nv,{children:['"',y.quote,'"']}),(0,_r.jsxs)(jv,{children:["\u2014 ",y.author]})]}),(0,_r.jsxs)(Pv,{children:[(0,_r.jsx)(Dv,{}),(0,_r.jsx)(Rv,{onClick:()=>{const e=u+1;d(e),(()=>{const e=new Date,t=Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()),r=t-864e5;let i=h;if(f){const e=new Date(f),n=Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate());n<r?n<t&&(i=1):n<t&&(i=h+1)}else i=1;p(i);const o=Date.now();g(o),Rh(Ih(Mf,`users/${n}`),{streak:i,lastEaten:o})})();Rh(Ih(Mf,`users/${n}`),{count:e,lastEaten:Date.now()});const t={username:n,timestamp:Date.now()};jh(Ih(Mf,"hotdogLogs"),t),(()=>{for(let e=0;e<20;e++)setTimeout((()=>Gv()),130*e)})()},disabled:!n,children:"I Ate a Hot Dog!"})]}),(0,_r.jsxs)(Fv,{children:[(0,_r.jsxs)(Ov,{children:[h," day streak"]}),(0,_r.jsx)(Lv,{children:(e=>{const t=["First hot dog of many!","Two days of hot dog glory!","Triple threat!","Four days strong!","High five - keep it alive!","Six days of satisfaction!","A whole week of wonderful!","Eight days of excellence!","Nine days of nobility!","Perfect ten!","Unstoppable!"];return 0===e?"Start your streak!":e<=10?t[e-1]:t[t.length-1]})(h)})]}),(0,_r.jsxs)(Mv,{children:[(0,_r.jsx)("div",{className:"leaderboard-title",style:{fontSize:"1.3rem",marginBottom:"1rem",color:"#FFE66D",fontWeight:600},children:"\ud83c\udf2d Grease Missile Captains \ud83c\udf2d"}),_.map(((e,t)=>{const n=0===t?"\ud83e\udd47":1===t?"\ud83e\udd48":"\ud83e\udd49";return(0,_r.jsxs)("div",{style:{display:"flex",alignItems:"center",padding:"0.7rem",marginBottom:"0.5rem",background:"rgba(255, 255, 255, 0.05)",borderRadius:"0.5rem"},children:[(0,_r.jsx)("div",{style:{fontSize:"1.3rem",marginRight:"0.7rem"},children:n}),(0,_r.jsx)("div",{style:{fontWeight:500,color:"white",flex:1,textAlign:"left",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.username}),(0,_r.jsxs)("div",{style:{fontWeight:700,color:"#FF6B6B",margin:"0 1rem"},children:[e.count||0," \ud83c\udf2d"]})]},e.username)})),C>0&&(0,_r.jsxs)("div",{style:{fontSize:"0.8rem",color:"#888",marginTop:"0.3rem",textAlign:"center"},children:[C," hot dogs behind first place"]}),0===C&&_.length>0&&(null===(e=_[0])||void 0===e?void 0:e.username)===n&&(0,_r.jsx)("div",{style:{fontSize:"0.8rem",color:"#888",marginTop:"0.3rem",textAlign:"center"},children:"\ud83c\udfc6 You're in first place!"})]}),(0,_r.jsx)(zv,{onClick:()=>w(!0),children:"\ud83c\udf2d Hot Dog History"}),(0,_r.jsx)(Tr,{})]}),(0,_r.jsxs)($v,{className:x?"active":"",children:[(0,_r.jsxs)(Uv,{children:[(0,_r.jsx)("h2",{children:"Global Hot Dog History"}),(0,_r.jsx)(Bv,{onClick:()=>w(!1),children:"\xd7"})]}),(0,_r.jsx)("div",{style:{padding:"1rem",height:"calc(100vh - 5rem)",overflowY:"auto"},children:(e=>{const t={};return e.forEach((e=>{const n=new Date(e.timestamp),r=n.toISOString().split("T")[0];let i;const o=new Date,a=new Date(o);a.setDate(a.getDate()-1);const s=o.toISOString().split("T")[0],l=a.toISOString().split("T")[0];i=r===s?"Today":r===l?"Yesterday":n.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}),t[r]||(t[r]={label:i,items:[]}),t[r].items.push(e)})),Object.values(t).sort(((e,t)=>{var n,r;const i=(null===(n=e.items[0])||void 0===n?void 0:n.timestamp)||0;return((null===(r=t.items[0])||void 0===r?void 0:r.timestamp)||0)-i})).map((e=>({...e,items:e.items.sort(((e,t)=>t.timestamp-e.timestamp))})))})(m).map((e=>(0,_r.jsxs)("div",{style:{marginBottom:"2rem"},children:[(0,_r.jsx)("div",{style:{color:"#888",fontSize:"0.9rem",marginBottom:"0.5rem",padding:"0 0.5rem"},children:e.label}),e.items.map((e=>{const t=_.findIndex((t=>t.username===e.username)),n=0===t?"\ud83e\udd47":1===t?"\ud83e\udd48":2===t?"\ud83e\udd49":"";return(0,_r.jsxs)("div",{style:{padding:"0.75rem",background:"rgba(255, 255, 255, 0.05)",borderRadius:"0.5rem",marginBottom:"0.5rem",display:"flex",alignItems:"center",gap:"0.5rem"},children:[n&&(0,_r.jsx)("span",{style:{fontSize:"1.2rem"},children:n}),(0,_r.jsx)("span",{style:{fontWeight:500,color:"#FFE66D"},children:e.username}),(0,_r.jsx)("span",{style:{color:"#888",fontSize:"0.8rem",marginLeft:"auto"},children:new Date(e.timestamp).toLocaleTimeString()})]},e.id)}))]},e.label)))})]})]})},Xv=wr`
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(12vw, -8vh) rotate(120deg); }
  66% { transform: translate(-12vw, 8vh) rotate(240deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
`,Jv=vr.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(160deg, #1a1a1a 0%, #232325 100%);
  color: #f4f4f4;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
`,Zv=vr.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`,ex=vr.span`
  position: absolute;
  font-size: ${e=>e.size||"28px"};
  opacity: 0.10;
  top: ${e=>e.top};
  left: ${e=>e.left};
  animation: ${Xv} ${e=>e.duration||"22s"} ease-in-out infinite;
  animation-delay: ${e=>e.delay||"0s"};
  user-select: none;
`;function tx(e){let{count:n=7}=e;const r=t.useMemo((()=>{const e=[];for(let t=0;t<n;t++)e.push({top:100*Math.random()+"%",left:100*Math.random()+"%",size:22+16*Math.random()+"px",duration:18+10*Math.random()+"s",delay:`-${15*Math.random()}s`});return e}),[n]);return(0,_r.jsx)(Zv,{"aria-hidden":"true",children:r.map(((e,t)=>(0,_r.jsx)(ex,{...e,children:"\ud83e\udd5a"},t)))})}const nx=vr.header`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(8px);
`,rx=vr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.02em;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,ix=vr.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: rgba(255,255,255,0.10); }
`,ox=vr.div`
  position: relative;
  z-index: 2;
  display: flex;
  gap: 6px;
  padding: 12px 18px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`,ax=vr.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 12px 14px;
  border: none;
  background: transparent;
  color: ${e=>e.$active?"#FFC72C":"rgba(255,255,255,0.55)"};
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.$disabled?.5:1};
  border-bottom: 2px solid ${e=>e.$active?"#FFC72C":"transparent"};
  margin-bottom: -1px;
  transition: color 0.15s;

  &:hover { color: ${e=>e.$disabled?"rgba(255,255,255,0.55)":"#FFE66D"}; }
`,sx=vr.main`
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;
  padding: 18px 16px 96px;

  @media (max-width: 480px) {
    padding: 12px 12px 96px;
  }
`,lx=vr(ix)`
  background: rgba(255,199,44,0.10);
  border-color: rgba(255,199,44,0.25);
  color: #FFC72C;
  &:hover { background: rgba(255,199,44,0.18); }
`,cx=vr.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;const ux=function(e){let{tab:t,onTabChange:n,onSignOut:r,children:i}=e;const o=ee();return(0,_r.jsxs)(Jv,{children:[(0,_r.jsx)(tx,{}),(0,_r.jsxs)(nx,{children:[(0,_r.jsx)(rx,{children:"\ud83e\udd5a Admin \xb7 Scrambled Legs"}),(0,_r.jsxs)(cx,{children:[(0,_r.jsx)(lx,{type:"button",onClick:()=>o("/"),children:"\u2190 Home"}),(0,_r.jsx)(ix,{type:"button",onClick:r,children:"Sign Out"})]})]}),(0,_r.jsxs)(ox,{children:[(0,_r.jsx)(ax,{type:"button",$active:"events"===t,onClick:()=>n&&n("events"),children:"Events"}),(0,_r.jsx)(ax,{type:"button",$active:"notifications"===t,onClick:()=>n&&n("notifications"),children:"Notifications"})]}),(0,_r.jsx)(sx,{children:i})]})},dx="OG scrambled crew",hx="sl_admin_authed";const px=vr.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 18px;
`,fx=vr.form`
  width: 100%;
  max-width: 380px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 22px;
  padding: 28px 22px 24px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 32px rgba(255,199,44,0.10);
  backdrop-filter: blur(10px);
  text-align: center;
`,gx=vr.h1`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`,mx=vr.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin: 6px 0 22px;
`,bx=vr.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid rgba(255,199,44,0.20);
  background: rgba(255,255,255,0.06);
  color: #f4f4f4;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;

  &::placeholder { color: rgba(255,255,255,0.35); }
  &:focus {
    outline: none;
    border-color: #FFC72C;
    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);
    background: rgba(255,255,255,0.09);
  }
`,yx=vr.button`
  width: 100%;
  margin-top: 14px;
  padding: 14px 18px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 4px 14px rgba(255,199,44,0.30);

  &:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(255,199,44,0.42); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`,vx=vr.div`
  margin-top: 12px;
  font-size: 12px;
  color: #FF8E8E;
  min-height: 16px;
`;const xx=function(e){let{onAuthed:n}=e;const[r,i]=(0,t.useState)(""),[o,a]=(0,t.useState)("");return(0,_r.jsxs)(Jv,{children:[(0,_r.jsx)(tx,{count:5}),(0,_r.jsx)(px,{children:(0,_r.jsxs)(fx,{onSubmit:e=>{e.preventDefault(),r?!function(t){if(t===dx){try{sessionStorage.setItem(hx,"1")}catch(e){}return!0}return!1}(r)?a("Nope. That's not it."):(a(""),n&&n()):a("Enter the password")},children:[(0,_r.jsx)(gx,{children:"\ud83e\udd5a Admin Access"}),(0,_r.jsx)(mx,{children:"Crew only"}),(0,_r.jsx)(bx,{type:"password",placeholder:"Password",value:r,onChange:e=>{i(e.target.value),o&&a("")},autoFocus:!0,autoComplete:"current-password"}),(0,_r.jsx)(yx,{type:"submit",children:"Unlock"}),(0,_r.jsx)(vx,{children:o})]})})]})},wx=vr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin: 24px 4px 10px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.10), transparent);
  }
`,_x=vr.button`
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255,199,44,0.30);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(255,199,44,0.42); }
  &:active { transform: translateY(0); }
`,kx=vr.button`
  display: flex;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  cursor: pointer;
  color: inherit;
  font-family: inherit;
  margin-bottom: 8px;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,199,44,0.25);
  }

  &[data-past="1"] {
    opacity: 0.55;
    cursor: default;
  }
`,Cx=vr.div`
  flex-shrink: 0;
  width: 54px;
  text-align: center;
  padding: 6px 0;
  border-right: 1px solid rgba(255,255,255,0.10);

  .month {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #FFC72C;
  }
  .day {
    font-family: 'Fredoka', sans-serif;
    font-size: 22px;
    font-weight: 700;
    line-height: 1;
    margin: 2px 0 1px;
  }
  .weekday {
    font-size: 10px;
    color: rgba(255,255,255,0.55);
    font-weight: 500;
  }
`,Sx=vr.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;

  .name {
    font-family: 'Fredoka', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #f4f4f4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .name .unlock-pill {
    flex-shrink: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #FFC72C;
    background: rgba(255,199,44,0.10);
    border: 1px solid rgba(255,199,44,0.35);
    border-radius: 999px;
    padding: 2px 7px;
    line-height: 1.4;
  }
  .meta {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    margin-top: 3px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
`,Ex=vr.div`
  text-align: center;
  padding: 28px 16px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  color: rgba(255,255,255,0.55);
  font-size: 13px;

  .em { font-size: 30px; margin-bottom: 6px; opacity: 0.7; }
`,Tx=e=>new Intl.DateTimeFormat(void 0,{month:"short"}).format(new Date(e)).toUpperCase(),Ix=e=>new Date(e).getDate(),Nx=e=>new Intl.DateTimeFormat(void 0,{weekday:"short"}).format(new Date(e));function jx(e){const t=Array.isArray(e.tags)?e.tags.length:0,n=e.hotdogs||0,r=e.rideLeader&&e.rideLeader.name?e.rideLeader.name:null,i=[(o=e.start,new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(o)))];var o;return r&&i.push(`led by ${r}`),i.push(`${t} ${1===t?"tag":"tags"}`),i.push(`${n} \ud83c\udf2d`),i.join(" \xb7 ")}const Px=function(e){let{upcoming:t,past:n,onNew:r,onEdit:i}=e;return(0,_r.jsxs)("div",{children:[(0,_r.jsx)(_x,{type:"button",onClick:r,children:"+ New Event"}),(0,_r.jsx)(wx,{children:"Upcoming"}),0===t.length?(0,_r.jsxs)(Ex,{children:[(0,_r.jsx)("div",{className:"em",children:"\ud83e\udd5a"}),'Nothing on the books yet. Tap "New Event" to add one.']}):t.map((e=>(0,_r.jsxs)(kx,{type:"button",onClick:()=>i(e.id),children:[(0,_r.jsxs)(Cx,{children:[(0,_r.jsx)("div",{className:"month",children:Tx(e.start)}),(0,_r.jsx)("div",{className:"day",children:Ix(e.start)}),(0,_r.jsx)("div",{className:"weekday",children:Nx(e.start)})]}),(0,_r.jsxs)(Sx,{children:[(0,_r.jsxs)("div",{className:"name",children:[(0,_r.jsx)("span",{children:e.name||"(untitled)"}),e.unlocked&&(0,_r.jsx)("span",{className:"unlock-pill",title:"Visitors can open this event from the Coming Up list",children:"\ud83d\udd13 Unlocked"})]}),(0,_r.jsx)("div",{className:"meta",children:(0,_r.jsx)("span",{children:jx(e)})})]})]},e.id))),(0,_r.jsx)(wx,{children:"Past (last 10)"}),0===n.length?(0,_r.jsx)(Ex,{children:"No past events yet."}):n.slice(0,10).map((e=>(0,_r.jsxs)(kx,{type:"button","data-past":"1",onClick:()=>i(e.id),children:[(0,_r.jsxs)(Cx,{children:[(0,_r.jsx)("div",{className:"month",children:Tx(e.start)}),(0,_r.jsx)("div",{className:"day",children:Ix(e.start)}),(0,_r.jsx)("div",{className:"weekday",children:Nx(e.start)})]}),(0,_r.jsxs)(Sx,{children:[(0,_r.jsx)("div",{className:"name",children:e.name||"(untitled)"}),(0,_r.jsx)("div",{className:"meta",children:(0,_r.jsx)("span",{children:jx(e)})})]})]},e.id)))]})},Rx=46.7867,Dx=-92.1005,Fx=vr.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Ox=vr.div`
  position: relative;
  height: 280px;
  border-radius: 14px;
  overflow: hidden;
  background: #1a1a1a;
  border: 1px solid rgba(255,255,255,0.10);

  & .leaflet-container {
    width: 100%;
    height: 100%;
    background: #1a1a1a;
  }

  & .leaflet-tile-pane {
    filter: brightness(0.85) saturate(0.7);
  }

  & .leaflet-control-attribution {
    font-size: 9px !important;
    opacity: 0.55;
  }

  @media (max-width: 480px) {
    height: 240px;
  }
`,Lx=vr.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 500;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #1a1a1a;
  background: rgba(255,199,44,0.92);
  padding: 5px 9px;
  border-radius: 999px;
  pointer-events: none;
`,Ax=vr.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.6);
`,Mx=vr.button`
  align-self: flex-start;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,199,44,0.30);
  background: rgba(255,199,44,0.10);
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: rgba(255,199,44,0.20); }
`,zx='<div style="\n  width:18px;height:18px;border-radius:50%;\n  background:#FFC72C;border:3px solid #1a1a1a;\n  box-shadow:0 0 0 2px #FFC72C, 0 0 18px rgba(255,199,44,0.8);"></div>';const $x=function(e){let{value:n,onChange:r,doneTargetId:i}=e;const o=(0,t.useRef)(null),a=(0,t.useRef)(null),s=(0,t.useRef)(null),[l,c]=(0,t.useState)(!1);(0,t.useEffect)((()=>{let e=!1;return new Promise((e=>{if("undefined"!==typeof window&&window.L)return void e(window.L);let t=0;const n=setInterval((()=>{t++,"undefined"!==typeof window&&window.L?(clearInterval(n),e(window.L)):t>100&&(clearInterval(n),e(null))}),50)})).then((t=>{if(e||!t||!o.current)return;const i=n&&null!=n.lat&&null!=n.lng?[n.lat,n.lng]:[Rx,Dx],l=n&&null!=n.lat?13:11,u=t.map(o.current,{zoomControl:!0,attributionControl:!0,scrollWheelZoom:!1}).setView(i,l);t.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:19,attribution:"&copy; OpenStreetMap &copy; CARTO"}).addTo(u);const d=t.divIcon({className:"sl-yolk-pin",html:zx,iconSize:[18,18],iconAnchor:[9,9]});n&&null!=n.lat&&null!=n.lng&&(s.current=t.marker([n.lat,n.lng],{icon:d}).addTo(u)),u.on("click",(e=>{const{lat:i,lng:o}=e.latlng;s.current?s.current.setLatLng([i,o]):s.current=t.marker([i,o],{icon:d}).addTo(u),r&&r({lat:i,lng:o,label:(null===n||void 0===n?void 0:n.label)||""})})),a.current=u,c(!0),setTimeout((()=>u.invalidateSize()),50)})),()=>{e=!0,a.current&&(a.current.remove(),a.current=null,s.current=null)}}),[]),(0,t.useEffect)((()=>{if(l&&a.current&&window.L)if(n&&null!=n.lat&&null!=n.lng){const e=[n.lat,n.lng];if(s.current)s.current.setLatLng(e);else{const t=window.L.divIcon({className:"sl-yolk-pin",html:zx,iconSize:[18,18],iconAnchor:[9,9]});s.current=window.L.marker(e,{icon:t}).addTo(a.current)}}else s.current&&(s.current.remove(),s.current=null)}),[n,l]);const u=null===n||void 0===n?void 0:n.lat,d=null===n||void 0===n?void 0:n.lng;return(0,_r.jsxs)(Fx,{children:[(0,_r.jsxs)(Ox,{children:[(0,_r.jsx)(Lx,{children:"Tap map to drop pin"}),(0,_r.jsx)("div",{ref:o,style:{width:"100%",height:"100%"}})]}),(0,_r.jsx)(Ax,{children:null!=u&&null!=d?`Pin: ${u.toFixed(5)}, ${d.toFixed(5)}`:"No pin set yet \u2014 tap the map to choose a location."}),(0,_r.jsx)(Mx,{type:"button",onClick:()=>{if(i){const e=document.getElementById(i);e&&e.scrollIntoView&&e.scrollIntoView({behavior:"smooth",block:"start"})}},children:"Done picking \u2193"})]})},Ux=vr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 2px solid rgba(255,199,44,0.20);
  background: rgba(255,255,255,0.06);
  min-height: 50px;
  align-items: center;

  &:focus-within {
    border-color: #FFC72C;
    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);
    background: rgba(255,255,255,0.09);
  }
`,Bx=vr.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px 4px 10px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  border-radius: 999px;
  background: rgba(255,199,44,0.12);
  border: 1px solid rgba(255,199,44,0.30);
  color: #FFE66D;
`,Wx=vr.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: rgba(0,0,0,0.30);
  color: #FFE66D;
  cursor: pointer;
  font-size: 11px;
  line-height: 1;
  font-family: inherit;
  padding: 0;

  &:hover { background: rgba(255,107,107,0.55); color: #fff; }
`,Hx=vr.input`
  flex: 1;
  min-width: 120px;
  background: transparent;
  border: none;
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  padding: 4px 2px;
  outline: none;

  &::placeholder { color: rgba(255,255,255,0.35); }
`;const qx=function(e){let{value:n,onChange:r,placeholder:i}=e;const o=Array.isArray(n)?n:[],[a,s]=(0,t.useState)(""),l=e=>{const t=(e||"").trim();t&&(o.includes(t)||r([...o,t]),s(""))},c=e=>{const t=o.slice();t.splice(e,1),r(t)};return(0,_r.jsxs)(Ux,{children:[o.map(((e,t)=>(0,_r.jsxs)(Bx,{children:[(0,_r.jsx)("span",{children:e}),(0,_r.jsx)(Wx,{type:"button","aria-label":`Remove ${e}`,onClick:()=>c(t),children:"\xd7"})]},`${e}-${t}`))),(0,_r.jsx)(Hx,{type:"text",value:a,onChange:e=>s(e.target.value),onKeyDown:e=>{"Enter"===e.key||","===e.key?(e.preventDefault(),l(a)):"Backspace"===e.key&&!a&&o.length&&(e.preventDefault(),c(o.length-1))},onBlur:()=>{a.trim()&&l(a)},placeholder:i||"Add a tag, then Enter (e.g., '12 mi', '850 ft')"})]})},Vx={w:400,h:400,mode:"cover"},Kx={w:1600,h:800,mode:"fit"};function Yx(e,t){if(!e)return"No file selected";if(!e.type||!e.type.startsWith("image/"))return"File must be an image";const n="banner"===t?5242880:2097152;return e.size>n?`Image is too large (max ${(n/1024/1024).toFixed(0)}MB)`:null}async function Gx(e){let{kind:t,eventId:n,file:r,onProgress:i}=e;const o=Yx(r,t);if(o)throw new Error(o);const a="banner"===t?Kx:Vx;let s;try{s=await function(e,t){return new Promise(((n,r)=>{const i=URL.createObjectURL(e),o=new Image;o.onload=()=>{const{w:a,h:s,mode:l}=t,c=o.naturalWidth,u=o.naturalHeight;let d,h,p=0,f=0,g=c,m=u;if("cover"===l){const e=a/s;c/u>e?(m=u,g=u*e,p=(c-g)/2):(g=c,m=c/e,f=(u-m)/2),d=a,h=s}else{const e=Math.min(a/c,s/u,1);d=Math.round(c*e),h=Math.round(u*e)}const b=document.createElement("canvas");b.width=d,b.height=h,b.getContext("2d").drawImage(o,p,f,g,m,0,0,d,h);const y="image/png"===e.type?"image/png":"image/jpeg",v="image/jpeg"===y?.86:void 0;b.toBlob((e=>{URL.revokeObjectURL(i),e?n(e):r(new Error("Failed to encode resized image"))}),y,v)},o.onerror=()=>{URL.revokeObjectURL(i),r(new Error("Could not read image"))},o.src=i}))}(r,a)}catch(ik){s=r}const l="banner"===t?"banners":"rideLeaders",c="image/png"===s.type?"png":"image/jpeg"===s.type?"jpg":function(e){const t=(e.name||"").split(".").pop();return t&&t.length<=5?t.toLowerCase():"image/png"===e.type?"png":"image/webp"===e.type?"webp":"image/gif"===e.type?"gif":"jpg"}(r);var u;const d=wf((u=`${l}/${n}.${c}`,gf(pi(zf),u)),s,{contentType:s.type||r.type||"image/jpeg"});return new Promise(((e,t)=>{d.on("state_changed",(e=>{i&&e.totalBytes&&i(e.bytesTransferred/e.totalBytes*100)}),(e=>t(e)),(async()=>{try{const t=await function(e){return hf(e=pi(e))}(d.snapshot.ref);e(t)}catch(ik){t(ik)}}))}))}const Qx=vr.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Xx=vr.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,Jx=vr.div`
  position: relative;
  background: rgba(255,255,255,0.05);
  border: 1px dashed rgba(255,255,255,0.18);
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  width: ${e=>e.$banner?"160px":"72px"};
  height: ${e=>e.$banner?"80px":"72px"};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Zx=vr.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 200px;
`,ew=vr.button`
  align-self: flex-start;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,199,44,0.30);
  background: rgba(255,199,44,0.10);
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover { background: rgba(255,199,44,0.20); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`,tw=vr.button`
  align-self: flex-start;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.10);
  background: transparent;
  color: rgba(255,255,255,0.6);
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  cursor: pointer;
  &:hover { color: #FF8E8E; border-color: rgba(255,107,107,0.40); }
`,nw=vr.div`
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow: hidden;
`,rw=vr.div`
  width: ${e=>e.$pct||0}%;
  height: 100%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  transition: width 0.15s;
`,iw=vr.div`
  font-size: 12px;
  color: #FF8E8E;
`,ow=vr.input`
  display: none;
`;const aw=function(e){let{kind:n,eventId:r,value:i,onChange:o,label:a}=e;const s=(0,t.useRef)(null),[l,c]=(0,t.useState)(0),[u,d]=(0,t.useState)(!1),[h,p]=(0,t.useState)(""),f="banner"===n;return(0,_r.jsxs)(Qx,{children:[(0,_r.jsxs)(Xx,{children:[(0,_r.jsx)(Jx,{$banner:f,children:i?(0,_r.jsx)("img",{src:i,alt:a||n}):(0,_r.jsx)("span",{style:{fontSize:22,opacity:.4},children:"\ud83e\udd5a"})}),(0,_r.jsxs)(Zx,{children:[(0,_r.jsxs)(Xx,{children:[(0,_r.jsx)(ew,{type:"button",onClick:()=>{r?s.current&&s.current.click():p("Save the event once before uploading images")},disabled:u,children:i?"Replace image":u?"Uploading\u2026":"Choose image"}),i&&!u&&(0,_r.jsx)(tw,{type:"button",onClick:()=>{o&&o(""),c(0),p("")},children:"Remove"})]}),u&&(0,_r.jsx)(nw,{children:(0,_r.jsx)(rw,{$pct:l})}),!r&&(0,_r.jsx)("div",{style:{fontSize:11,color:"rgba(255,255,255,0.45)"},children:"Save the event first to enable image upload."}),h&&(0,_r.jsx)(iw,{children:h})]})]}),(0,_r.jsx)(ow,{ref:s,type:"file",accept:"image/*",onChange:async e=>{const t=e.target.files&&e.target.files[0];if(!t)return;e.target.value="";const i=Yx(t,n);if(i)p(i);else{p(""),d(!0),c(0);try{const e=await Gx({kind:n,eventId:r,file:t,onProgress:e=>c(e)});o&&o(e)}catch(a){p(a.message||"Upload failed")}finally{d(!1)}}}})]})},sw=vr.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,lw=vr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
`,cw=vr.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.10); }
`,uw=vr.h2`
  font-family: 'Fredoka', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,dw=vr.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px 14px;

  @media (max-width: 480px) { padding: 14px 12px; }
`,hw=vr.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;

  &:last-child { margin-bottom: 0; }
`,pw=vr.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
`,fw=vr.div`
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: -2px;
`,gw="\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 12px;\n  border: 2px solid rgba(255,199,44,0.20);\n  background: rgba(255,255,255,0.06);\n  color: #f4f4f4;\n  font-family: 'Inter', sans-serif;\n  font-size: 14px;\n  transition: all 0.2s ease;\n\n  &::placeholder { color: rgba(255,255,255,0.35); }\n  &:focus {\n    outline: none;\n    border-color: #FFC72C;\n    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);\n    background: rgba(255,255,255,0.09);\n  }\n",mw=vr.input`${gw}`,bw=vr.textarea`
  ${gw}
  resize: vertical;
  min-height: 96px;
  font-family: 'Inter', sans-serif;
`,yw=vr.select`
  ${gw}
  background: #1c1c1e;
  color-scheme: dark;
  option {
    background: #1c1c1e;
    color: #f4f4f4;
  }
`,vw=vr.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,xw=vr.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  user-select: none;

  input { accent-color: #FFC72C; width: 18px; height: 18px; }
`,ww=vr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
`,_w=vr.button`
  padding: 14px 22px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255,199,44,0.30);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(255,199,44,0.42); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`,kw=vr.button`
  background: transparent;
  border: none;
  color: #FF8E8E;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 4px;
  text-decoration: underline;

  &:hover { color: #FF6B6B; }
`,Cw=vr.div`
  width: 100%;
  font-size: 12px;
  color: #FF8E8E;
`,Sw=vr.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`,Ew=vr.div`
  width: 100%;
  max-width: 360px;
  background: #232325;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 20px 18px;
  text-align: center;
`,Tw=vr.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  margin: 0 0 6px;
  color: #f4f4f4;
`,Iw=vr.p`
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  margin: 0 0 16px;
`,Nw=vr.button`
  padding: 12px 18px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover { box-shadow: 0 6px 22px rgba(255,107,107,0.40); }
`,jw=vr.button`
  padding: 12px 18px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  margin-right: 10px;
`;function Pw(e){if(!e||isNaN(e))return"";const t=new Date(e),n=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}function Rw(e){if(!e)return null;const t=Date.parse(e);return isNaN(t)?null:t}const Dw=[{v:"chill",label:"Casual"},{v:"race",label:"Race pace"},{v:"work",label:"Trail work"},{v:"custom",label:"Custom"}],Fw={chill:"Casual",race:"Race pace",work:"Trail work",custom:""};function Ow(e){const t=e||{},n=t.start||(()=>{const e=new Date,t=(3-e.getDay()+7)%7||7;return e.setDate(e.getDate()+t),e.setHours(17,45,0,0),e.getTime()})(),r=t.startLoc||{lat:null,lng:null,label:""},i=t.endLoc||null,o=!i||i.lat===r.lat&&i.lng===r.lng;return{name:t.name||"",description:t.description||"",start:n,durationMinutes:t.durationMinutes||120,startLoc:{...r},endLoc:i?{...i}:{lat:null,lng:null,label:""},roundTrip:o,difficulty:t.difficulty||"chill",difficultyLabel:t.difficultyLabel||"",tags:Array.isArray(t.tags)?t.tags.slice():[],rideLeader:{name:t.rideLeader&&t.rideLeader.name||"",photoUrl:t.rideLeader&&t.rideLeader.photoUrl||""},bannerUrl:t.bannerUrl||"",routeUrl:t.routeUrl||"",unlocked:!!t.unlocked}}const Lw=function(e){let{existing:n,onClose:r,onSaved:i,onDeleted:o}=e;const a=!n,[s,l]=(0,t.useState)((()=>Ow(n))),[c,u]=(0,t.useState)(n?n.id:null),[d,h]=(0,t.useState)(!1),[p,f]=(0,t.useState)(""),[g,m]=(0,t.useState)(!1),[b,y]=(0,t.useState)(!1);(0,t.useEffect)((()=>{l(Ow(n)),u(n?n.id:null),f("")}),[n&&n.id,n&&n.updatedAt]);const v=e=>l((t=>({...t,...e}))),x=e=>l((t=>({...t,rideLeader:{...t.rideLeader,...e}}))),w=e=>l((t=>({...t,startLoc:{...t.startLoc,...e}}))),_=e=>l((t=>({...t,endLoc:{...t.endLoc,...e}}))),k=()=>{if(!s.name.trim())return"Name is required";if(!s.description.trim())return"Description is required";if(!s.start)return"Start date/time is required";if(null==s.startLoc.lat||null==s.startLoc.lng)return"Start location pin is required";if(!s.startLoc.label.trim())return"Start location label is required";if(!s.roundTrip){if(null==s.endLoc.lat||null==s.endLoc.lng)return"End location pin is required (or toggle Round trip on)";if(!s.endLoc.label.trim())return"End location label is required"}return"custom"!==s.difficulty||s.difficultyLabel.trim()?s.routeUrl&&!function(e){if(!e)return!0;try{const t=new URL(e);return"http:"===t.protocol||"https:"===t.protocol}catch{return!1}}(s.routeUrl)?"Route URL must be a valid http/https URL":null:"Custom difficulty needs a label"},C=(0,t.useMemo)((()=>s.name.trim()?s.name.trim():a?"New event":"Edit event"),[s.name,a]);return(0,_r.jsxs)(sw,{children:[(0,_r.jsxs)(lw,{children:[(0,_r.jsx)(cw,{type:"button",onClick:r,children:"\u2190 Back"}),(0,_r.jsx)(uw,{children:C}),(0,_r.jsx)("span",{style:{width:60}})]}),(0,_r.jsxs)(dw,{id:"event-editor-form",children:[(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{htmlFor:"ev-name",children:"Name"}),(0,_r.jsx)(mw,{id:"ev-name",type:"text",value:s.name,onChange:e=>v({name:e.target.value}),placeholder:"Lester Park Wednesday Roll"})]}),(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{htmlFor:"ev-desc",children:"Description"}),(0,_r.jsx)(bw,{id:"ev-desc",value:s.description,onChange:e=>v({description:e.target.value}),placeholder:"Casual social pace, ~12 miles, regroup at every fork\u2026"})]}),(0,_r.jsxs)(vw,{children:[(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{htmlFor:"ev-start",children:"Start date / time"}),(0,_r.jsx)(mw,{id:"ev-start",type:"datetime-local",value:Pw(s.start),onChange:e=>v({start:Rw(e.target.value)})}),(0,_r.jsx)(fw,{children:"Uses your device's timezone."})]}),(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{htmlFor:"ev-dur",children:"Duration (min)"}),(0,_r.jsx)(mw,{id:"ev-dur",type:"number",min:"0",step:"15",value:s.durationMinutes,onChange:e=>v({durationMinutes:e.target.value})})]})]}),(0,_r.jsxs)(vw,{children:[(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{htmlFor:"ev-diff",children:"Difficulty"}),(0,_r.jsx)(yw,{id:"ev-diff",value:s.difficulty,onChange:e=>{const t=e.target.value;v({difficulty:t,difficultyLabel:"custom"===t?s.difficultyLabel:Fw[t]||""})},children:Dw.map((e=>(0,_r.jsx)("option",{value:e.v,children:e.label},e.v)))})]}),"custom"===s.difficulty&&(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{htmlFor:"ev-diff-label",children:"Custom label"}),(0,_r.jsx)(mw,{id:"ev-diff-label",type:"text",value:s.difficultyLabel,onChange:e=>v({difficultyLabel:e.target.value}),placeholder:"Hammer / Skills / Sufferfest\u2026"})]})]}),(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{children:"Tags"}),(0,_r.jsx)(qx,{value:s.tags,onChange:e=>v({tags:e}),placeholder:"Add a tag, then Enter (e.g., '12 mi', '850 ft')"})]})]}),(0,_r.jsxs)(dw,{children:[(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{children:"Start location"}),(0,_r.jsx)($x,{value:s.startLoc,onChange:e=>w(e),doneTargetId:"start-loc-label"})]}),(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{htmlFor:"start-loc-label",children:"Start location label"}),(0,_r.jsx)(mw,{id:"start-loc-label",type:"text",value:s.startLoc.label||"",onChange:e=>w({label:e.target.value}),placeholder:"Lester Park Trailhead"})]}),(0,_r.jsx)(hw,{children:(0,_r.jsxs)(xw,{children:[(0,_r.jsx)("input",{type:"checkbox",checked:s.roundTrip,onChange:e=>v({roundTrip:e.target.checked})}),(0,_r.jsx)("span",{children:"Round trip (end is same as start)"})]})}),!s.roundTrip&&(0,_r.jsxs)(_r.Fragment,{children:[(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{children:"End location"}),(0,_r.jsx)($x,{value:s.endLoc,onChange:e=>_(e),doneTargetId:"end-loc-label"})]}),(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{htmlFor:"end-loc-label",children:"End location label"}),(0,_r.jsx)(mw,{id:"end-loc-label",type:"text",value:s.endLoc.label||"",onChange:e=>_({label:e.target.value}),placeholder:"Brewer Park"})]})]})]}),(0,_r.jsxs)(dw,{children:[(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{htmlFor:"ev-leader-name",children:"Ride leader name"}),(0,_r.jsx)(mw,{id:"ev-leader-name",type:"text",value:s.rideLeader.name,onChange:e=>x({name:e.target.value}),placeholder:"Optional"})]}),(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{children:"Ride leader photo"}),(0,_r.jsx)(aw,{kind:"rideLeader",eventId:c,value:s.rideLeader.photoUrl,onChange:e=>x({photoUrl:e}),label:"Ride leader"})]})]}),(0,_r.jsxs)(dw,{children:[(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{children:"Banner image"}),(0,_r.jsx)(aw,{kind:"banner",eventId:c,value:s.bannerUrl,onChange:e=>v({bannerUrl:e}),label:"Banner"}),(0,_r.jsx)(fw,{children:"If set, the public widget shows the banner instead of the map preview."})]}),(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{htmlFor:"ev-route",children:"Route URL"}),(0,_r.jsx)(mw,{id:"ev-route",type:"url",value:s.routeUrl,onChange:e=>v({routeUrl:e.target.value}),placeholder:"https://www.strava.com/routes/\u2026"})]})]}),(0,_r.jsx)(dw,{children:(0,_r.jsxs)(hw,{children:[(0,_r.jsx)(pw,{children:"Visibility"}),(0,_r.jsxs)(xw,{children:[(0,_r.jsx)("input",{type:"checkbox",checked:!!s.unlocked,onChange:e=>v({unlocked:e.target.checked})}),(0,_r.jsxs)("span",{children:["Unlock for visitors ",s.unlocked?"\ud83d\udd13":""]})]}),(0,_r.jsx)(fw,{children:"When enabled, this event shows as a tappable card in the Coming Up list before its day arrives. Otherwise it stays locked until it becomes the next ride."})]})}),p&&(0,_r.jsx)(Cw,{role:"alert",children:p}),(0,_r.jsxs)(ww,{children:[!a&&c?(0,_r.jsx)(kw,{type:"button",onClick:()=>m(!0),children:"Delete event"}):(0,_r.jsx)("span",{}),(0,_r.jsx)(_w,{type:"button",onClick:async()=>{const e=k();if(e)f(e);else{f(""),h(!0);try{const e=function(e){const t="number"===typeof e.start?e.start:0;return{name:e.name.trim(),description:e.description.trim(),start:t,durationMinutes:Number(e.durationMinutes)||120,startLoc:{lat:e.startLoc.lat,lng:e.startLoc.lng,label:(e.startLoc.label||"").trim()},endLoc:e.roundTrip?{lat:e.startLoc.lat,lng:e.startLoc.lng,label:(e.startLoc.label||"").trim()}:{lat:e.endLoc.lat,lng:e.endLoc.lng,label:(e.endLoc.label||"").trim()},difficulty:e.difficulty||"chill",difficultyLabel:"custom"===e.difficulty?(e.difficultyLabel||"").trim():e.difficultyLabel||Fw[e.difficulty]||"",tags:e.tags.filter(Boolean),rideLeader:e.rideLeader.name||e.rideLeader.photoUrl?{name:e.rideLeader.name.trim(),photoUrl:e.rideLeader.photoUrl||""}:null,bannerUrl:e.bannerUrl||"",routeUrl:(e.routeUrl||"").trim(),unlocked:!!e.unlocked}}(s);if(a&&!c){const t=await async function(e){const t=jh(Xg()),n=Date.now(),r={hotdogs:0,unlocked:!1,...e,createdAt:n,updatedAt:n};return await Ph(t,r),t.key}(e);u(t),i&&i(t)}else await async function(e,t){const n={...t,updatedAt:Date.now()};await Rh(Jg(e),n)}(c,e),i&&i(c)}catch(t){f(t.message||"Save failed")}finally{h(!1)}}},disabled:d,children:d?"Saving\u2026":a&&!c?"Create event":"Save changes"})]}),g&&(0,_r.jsx)(Sw,{onClick:()=>!b&&m(!1),children:(0,_r.jsxs)(Ew,{onClick:e=>e.stopPropagation(),children:[(0,_r.jsx)(Tw,{children:"Delete this event?"}),(0,_r.jsxs)(Iw,{children:["Delete ",(0,_r.jsx)("strong",{children:s.name||"this event"}),"? This can't be undone."]}),(0,_r.jsxs)("div",{children:[(0,_r.jsx)(jw,{type:"button",onClick:()=>m(!1),disabled:b,children:"Cancel"}),(0,_r.jsx)(Nw,{type:"button",onClick:async()=>{if(c){y(!0);try{await em(c),o&&o(c)}catch(e){f(e.message||"Delete failed"),m(!1)}finally{y(!1)}}},disabled:b,children:b?"Deleting\u2026":"Delete"})]})]})})]})};const Aw="https://thescrambledlegs.com/",Mw=vr.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px 14px;
  margin-bottom: 16px;
`,zw=vr.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  &:last-child { margin-bottom: 0; }
`,$w=vr.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`,Uw=vr.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
`,Bw=vr.span`
  font-size: 11px;
  color: ${e=>e.$over?"#FF8E8E":"rgba(255,255,255,0.45)"};
  font-variant-numeric: tabular-nums;
`,Ww="\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 12px;\n  border: 2px solid rgba(255,199,44,0.20);\n  background: rgba(255,255,255,0.06);\n  color: #f4f4f4;\n  font-family: 'Inter', sans-serif;\n  font-size: 14px;\n  transition: all 0.2s ease;\n\n  &::placeholder { color: rgba(255,255,255,0.35); }\n  &:focus {\n    outline: none;\n    border-color: #FFC72C;\n    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);\n    background: rgba(255,255,255,0.09);\n  }\n",Hw=vr.input`${Ww}`,qw=vr.textarea`${Ww} resize: vertical; min-height: 84px;`,Vw=vr.select`
  ${Ww}
  background: #1c1c1e;
  color-scheme: dark;
  option {
    background: #1c1c1e;
    color: #f4f4f4;
  }
`,Kw=vr.div`
  display: flex;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
`,Yw=vr.button`
  flex: 1;
  padding: 10px 12px;
  border-radius: 9px;
  border: none;
  background: ${e=>e.$active?"linear-gradient(45deg,#FFC72C,#FF8800)":"transparent"};
  color: ${e=>e.$active?"#1a1a1a":"rgba(255,255,255,0.7)"};
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
`,Gw=vr.button`
  width: 100%;
  padding: 16px 18px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(45deg, #FF6B6B, #FF8800);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 6px 22px rgba(255,107,107,0.35);
  transition: transform 0.15s, box-shadow 0.15s;
  margin-top: 4px;

  &:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(255,107,107,0.5); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`,Qw=vr.div`
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: -2px;
`,Xw=vr.div`
  font-size: 12px;
  color: #FF8E8E;
  margin-top: 6px;
`,Jw=vr.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`,Zw=vr.div`
  width: 100%;
  max-width: 360px;
  background: #232325;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 20px 18px;
  text-align: center;
`,e_=vr.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  margin: 0 0 6px;
  color: #f4f4f4;
`,t_=vr.p`
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  margin: 0 0 16px;
`,n_=vr.button`
  padding: 12px 18px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(45deg, #FF6B6B, #FF8800);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`,r_=vr.button`
  padding: 12px 18px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  margin-right: 10px;
`;function i_(e){if(!e)return"";const t=e.match(/\(([^)]+)\)/);return t?t[1].slice(0,40):e.slice(0,40)}const o_=function(e){let{onSent:n}=e;const[r,i]=(0,t.useState)(""),[o,a]=(0,t.useState)(""),[s,l]=(0,t.useState)(""),[c,u]=(0,t.useState)(""),[d,h]=(0,t.useState)("all"),[p,f]=(0,t.useState)(""),[g,m]=(0,t.useState)([]),[b,y]=(0,t.useState)([]),[v,x]=(0,t.useState)(""),[w,_]=(0,t.useState)(!1),[k,C]=(0,t.useState)(!1),[S,E]=(0,t.useState)("");(0,t.useEffect)((()=>{const e=function(e){const t=Ih(Mf,"fcmTokens"),n=t=>{const n=[];t.forEach((e=>{const t=e.val()||{};n.push({hash:e.key,...t})})),n.sort(((e,t)=>(t.lastSeenAt||t.createdAt||0)-(e.lastSeenAt||e.createdAt||0))),e(n)};return Lh(t,n),()=>Ah(t,"value",n)}((e=>m(e))),t=Zg((e=>y(e)));return()=>{e&&e(),t&&t()}}),[]);const T=(0,t.useMemo)((()=>tm(b).upcoming.slice(0,20)),[b]),I=r.length>50,N=o.length>150,j=!r.trim(),P=!o.trim(),R=!j&&!P&&!I&&!N&&!("test"===d&&!p)&&!k,D="test"===d?p?1:0:g.length;return(0,_r.jsxs)("div",{children:[(0,_r.jsxs)(Mw,{children:[(0,_r.jsxs)(zw,{children:[(0,_r.jsxs)($w,{children:[(0,_r.jsx)(Uw,{htmlFor:"ntf-title",children:"Title"}),(0,_r.jsxs)(Bw,{$over:I,children:[r.length,"/",50]})]}),(0,_r.jsx)(Hw,{id:"ntf-title",type:"text",value:r,onChange:e=>i(e.target.value),placeholder:"Wednesday roll moved!",maxLength:70})]}),(0,_r.jsxs)(zw,{children:[(0,_r.jsxs)($w,{children:[(0,_r.jsx)(Uw,{htmlFor:"ntf-body",children:"Body"}),(0,_r.jsxs)(Bw,{$over:N,children:[o.length,"/",150]})]}),(0,_r.jsx)(qw,{id:"ntf-body",value:o,onChange:e=>a(e.target.value),placeholder:"Meeting at Hartley instead. Same time.",maxLength:200})]}),(0,_r.jsxs)(zw,{children:[(0,_r.jsx)(Uw,{htmlFor:"ntf-event",children:"Link to upcoming event (optional)"}),(0,_r.jsxs)(Vw,{id:"ntf-event",value:v,onChange:e=>{const t=e.target.value;x(t),t&&l(`https://thescrambledlegs.com/events/${t}`)},children:[(0,_r.jsx)("option",{value:"",children:"\u2014 No event link \u2014"}),T.map((e=>{return(0,_r.jsxs)("option",{value:e.id,children:[(t=e.start,t?new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(t)):"")," \xb7 ",e.name||"(untitled)"]},e.id);var t}))]})]}),(0,_r.jsxs)(zw,{children:[(0,_r.jsx)(Uw,{htmlFor:"ntf-url",children:"Click URL"}),(0,_r.jsx)(Hw,{id:"ntf-url",type:"url",value:s,onChange:e=>{l(e.target.value),x("")},placeholder:Aw}),(0,_r.jsx)(Qw,{children:"Defaults to the home page if blank."})]}),(0,_r.jsxs)(zw,{children:[(0,_r.jsx)(Uw,{htmlFor:"ntf-tag",children:"Tag (optional)"}),(0,_r.jsx)(Hw,{id:"ntf-tag",type:"text",value:c,onChange:e=>u(e.target.value),placeholder:"ride-2026-04-30 (auto-generated if blank)"}),(0,_r.jsx)(Qw,{children:"Re-using a tag replaces an earlier notification on the user's device."})]})]}),(0,_r.jsxs)(Mw,{children:[(0,_r.jsxs)(zw,{children:[(0,_r.jsx)(Uw,{children:"Send mode"}),(0,_r.jsxs)(Kw,{role:"tablist",children:[(0,_r.jsxs)(Yw,{type:"button",role:"tab",$active:"all"===d,onClick:()=>h("all"),children:["All subscribers (",g.length,")"]}),(0,_r.jsx)(Yw,{type:"button",role:"tab",$active:"test"===d,onClick:()=>h("test"),children:"Test \u2192 one device"})]})]}),"test"===d&&(0,_r.jsxs)(zw,{children:[(0,_r.jsx)(Uw,{htmlFor:"ntf-test-token",children:"Pick a device"}),(0,_r.jsxs)(Vw,{id:"ntf-test-token",value:p,onChange:e=>f(e.target.value),children:[(0,_r.jsx)("option",{value:"",children:"\u2014 Choose subscriber \u2014"}),g.map((e=>{return(0,_r.jsxs)("option",{value:e.hash,children:[(n=e.platform,"ios"===n?"\ud83c\udf4e":"android"===n?"\ud83e\udd16":"desktop"===n?"\ud83d\udda5":"\ud83c\udf10")," ",(t=e.hash,(t||"").slice(0,8))," \xb7 ",i_(e.userAgent)]},e.hash);var t,n}))]}),(0,_r.jsx)(Qw,{children:"Sends only to the selected device. Useful for end-to-end QA before a real broadcast."})]}),(0,_r.jsx)(Gw,{type:"button",onClick:()=>{E(""),j||P?E("Title and body are required."):I||N?E("Title or body is too long."):"test"!==d||p?_(!0):E("Pick a device for test send.")},disabled:!R,children:k?"Sending\u2026":"test"===d?"Test send":`Send to ${g.length}`}),S&&(0,_r.jsx)(Xw,{role:"alert",children:S})]}),w&&(0,_r.jsx)(Jw,{onClick:()=>!k&&_(!1),children:(0,_r.jsxs)(Zw,{onClick:e=>e.stopPropagation(),children:[(0,_r.jsx)(e_,{children:"test"===d?"Test send to one device?":`Send to ${D} subscribers?`}),(0,_r.jsxs)(t_,{children:[(0,_r.jsx)("strong",{children:r||"(no title)"}),(0,_r.jsx)("br",{}),o||"(no body)"]}),(0,_r.jsxs)("div",{children:[(0,_r.jsx)(r_,{type:"button",onClick:()=>_(!1),disabled:k,children:"Cancel"}),(0,_r.jsx)(n_,{type:"button",onClick:async()=>{C(!0),E("");try{const h=(e="sendPush",Rf(pi($f),e,t)),f={password:dx,title:r.trim(),body:o.trim(),clickUrl:(s||Aw).trim(),tag:c.trim()||void 0,testTokenHash:"test"===d?p:void 0},g=await h(f),m=g&&g.data&&g.data.notifId;i(""),a(""),l(""),u(""),x(""),_(!1),n&&n(m)}catch(h){const e=h&&h.message||"Send failed. Check the Cloud Function logs.";E(e),_(!1)}finally{C(!1)}var e,t},disabled:k,children:k?"Sending\u2026":"Send"})]}),S&&(0,_r.jsx)(Xw,{role:"alert",children:S})]})})]})},a_=vr.section`
  background: rgba(255,199,44,0.06);
  border: 1px solid rgba(255,199,44,0.30);
  border-radius: 16px;
  padding: 16px 14px;
  margin-bottom: 16px;
`,s_=vr.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 16px;
  margin: 0 0 12px;
  color: #FFC72C;
`,l_=vr.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 12px;
`,c_=vr.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 10px 8px;
  text-align: center;

  .label {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin-bottom: 2px;
  }
  .num {
    font-family: 'Fredoka', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #f4f4f4;
    font-variant-numeric: tabular-nums;
  }
`,u_=vr.div`
  position: relative;
  height: 8px;
  background: rgba(255,255,255,0.08);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
`,d_=vr.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${e=>e.$pct}%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  transition: width 0.4s ease;
`,h_=vr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(255,255,255,0.7);

  .badge {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.12em;
    padding: 4px 8px;
    border-radius: 999px;
    color: ${e=>e.$done?"#1a1a1a":"#FFE66D"};
    background: ${e=>e.$done?"#FFC72C":"rgba(255,199,44,0.12)"};
    border: 1px solid ${e=>e.$done?"#FFC72C":"rgba(255,199,44,0.35)"};
  }
`,p_=vr.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.10); }
`;const f_=function(e){let{notifId:n,onDismiss:r}=e;const[i,o]=(0,t.useState)(null);if((0,t.useEffect)((()=>{if(!n)return;const e=function(e,t){const n=Ih(Mf,`notifications/${e}`),r=n=>{const r=n.val();t(r?{id:e,...r}:null)};return Lh(n,r),()=>Ah(n,"value",r)}(n,o);return()=>e&&e()}),[n]),!n)return null;if(!i)return(0,_r.jsxs)(a_,{children:[(0,_r.jsx)(s_,{children:"\u2709\ufe0f Sending\u2026"}),(0,_r.jsxs)(h_,{$done:!1,children:[(0,_r.jsx)("span",{children:"Waiting for first update\u2026"}),(0,_r.jsx)("span",{className:"badge",children:"connecting"})]})]});const a=i.recipients||0,s=i.accepted||0,l=i.failed||0,c=i.opened||0,u=i.status||"sending",d="sent"===u,h=s+l,p=a>0?Math.min(100,Math.round(h/a*100)):d?100:0;return(0,_r.jsxs)(a_,{children:[(0,_r.jsxs)(s_,{children:[d?"\u2705 Done":"\u2709\ufe0f Sending\u2026"," \u2014 \u201c",i.title||"untitled","\u201d"]}),(0,_r.jsxs)(l_,{children:[(0,_r.jsxs)(c_,{children:[(0,_r.jsx)("div",{className:"label",children:"Recipients"}),(0,_r.jsx)("div",{className:"num",children:a})]}),(0,_r.jsxs)(c_,{children:[(0,_r.jsx)("div",{className:"label",children:"Accepted"}),(0,_r.jsx)("div",{className:"num",children:s})]}),(0,_r.jsxs)(c_,{children:[(0,_r.jsx)("div",{className:"label",children:"Failed"}),(0,_r.jsx)("div",{className:"num",children:l})]}),(0,_r.jsxs)(c_,{children:[(0,_r.jsx)("div",{className:"label",children:"Opened"}),(0,_r.jsx)("div",{className:"num",children:c})]})]}),(0,_r.jsx)(u_,{children:(0,_r.jsx)(d_,{$pct:p})}),(0,_r.jsxs)(h_,{$done:d,children:[(0,_r.jsx)("span",{children:d?"Batch finished. Opens trickle in over time.":"FCM is processing\u2026"}),(0,_r.jsx)("span",{className:"badge",children:u})]}),d&&(0,_r.jsx)(p_,{type:"button",onClick:r,children:"Done"})]})},g_=vr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,m_=vr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin: 8px 4px 4px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.10), transparent);
  }
`,b_=vr.div`
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
  overflow: hidden;
`,y_=vr.button`
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:hover { background: rgba(255,255,255,0.05); }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }
  .ts {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #FFC72C;
  }
  .badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(255,107,107,0.15);
    color: #FF8E8E;
    border: 1px solid rgba(255,107,107,0.35);
  }
  .title {
    font-family: 'Fredoka', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #f4f4f4;
  }
  .body {
    font-size: 12px;
    color: rgba(255,255,255,0.65);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .stats {
    font-size: 11.5px;
    color: rgba(255,255,255,0.55);
    margin-top: 2px;
  }
`,v_=vr.div`
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 12px 14px;
  background: rgba(0,0,0,0.18);

  .pair {
    display: grid;
    grid-template-columns: 90px 1fr;
    gap: 8px 12px;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .k {
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 10px;
    font-weight: 700;
  }
  .v {
    color: rgba(255,255,255,0.85);
    word-break: break-word;
  }
  .v a { color: #FFC72C; }
`,x_=vr.div`
  display: flex;
  gap: 6px;
  margin: 8px 0 6px;
  flex-wrap: wrap;
`,w_=vr.button`
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid ${e=>e.$active?"#FFC72C":"rgba(255,255,255,0.12)"};
  background: ${e=>e.$active?"rgba(255,199,44,0.12)":"rgba(255,255,255,0.04)"};
  color: ${e=>e.$active?"#FFC72C":"rgba(255,255,255,0.7)"};
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
`,__=vr.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,k_=vr.div`
  display: grid;
  grid-template-columns: 18px 84px 1fr auto;
  gap: 8px;
  align-items: center;
  padding: 6px 8px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  font-size: 11.5px;

  .icon { font-size: 13px; text-align: center; }
  .hash { font-family: monospace; color: rgba(255,255,255,0.7); }
  .ua { color: rgba(255,255,255,0.5); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .res {
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.1em;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .res.success { color: #6FE6A8; background: rgba(70,200,120,0.12); }
  .res.failure { color: #FF8E8E; background: rgba(255,107,107,0.12); }
  .opened { color: #6BB6FF; font-weight: 700; }
`,C_=vr.div`
  text-align: center;
  padding: 28px 16px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  color: rgba(255,255,255,0.55);
  font-size: 13px;

  .em { font-size: 30px; margin-bottom: 6px; opacity: 0.7; }
`;function S_(e){if(!e)return"\u2014";const t=new Date(e);return new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(t)}function E_(e){const t=e.recipients||0,n=e.accepted||0,r=e.failed||0,i=e.opened||0;return`${t} sent \xb7 ${n} accepted \xb7 ${r} failed \xb7 ${i} opened (${n>0?Math.round(i/n*100):0}%)`}function T_(e){let{notif:n}=e;const[r,i]=(0,t.useState)(!1),[o,a]=(0,t.useState)("all"),s=(0,t.useMemo)((()=>n.deliveries?Object.entries(n.deliveries).map((e=>{let[t,n]=e;return{hash:t,...n}})):[]),[n.deliveries]),l=(0,t.useMemo)((()=>"opened"===o?s.filter((e=>e.opened)):"failed"===o?s.filter((e=>"failure"===e.result)):s),[s,o]);return(0,_r.jsxs)(b_,{children:[(0,_r.jsxs)(y_,{type:"button",onClick:()=>i((e=>!e)),children:[(0,_r.jsxs)("div",{className:"top",children:[(0,_r.jsx)("span",{className:"ts",children:S_(n.sentAt)}),n.isTest&&(0,_r.jsx)("span",{className:"badge",children:"Test"})]}),(0,_r.jsx)("div",{className:"title",children:n.title||"(untitled)"}),(0,_r.jsx)("div",{className:"body",children:n.body||""}),(0,_r.jsx)("div",{className:"stats",children:E_(n)})]}),r&&(0,_r.jsxs)(v_,{children:[(0,_r.jsxs)("div",{className:"pair",children:[(0,_r.jsx)("span",{className:"k",children:"Status"}),(0,_r.jsx)("span",{className:"v",children:n.status||"\u2014"})]}),(0,_r.jsxs)("div",{className:"pair",children:[(0,_r.jsx)("span",{className:"k",children:"Click URL"}),(0,_r.jsx)("span",{className:"v",children:(0,_r.jsx)("a",{href:n.clickUrl,target:"_blank",rel:"noreferrer",children:n.clickUrl})})]}),(0,_r.jsxs)("div",{className:"pair",children:[(0,_r.jsx)("span",{className:"k",children:"Tag"}),(0,_r.jsx)("span",{className:"v",children:n.tag||"\u2014"})]}),(0,_r.jsxs)("div",{className:"pair",children:[(0,_r.jsx)("span",{className:"k",children:"Sent by"}),(0,_r.jsx)("span",{className:"v",children:n.sentBy||"\u2014"})]}),(0,_r.jsxs)(x_,{children:[(0,_r.jsxs)(w_,{type:"button",$active:"all"===o,onClick:()=>a("all"),children:["All (",s.length,")"]}),(0,_r.jsxs)(w_,{type:"button",$active:"opened"===o,onClick:()=>a("opened"),children:["Opened (",s.filter((e=>e.opened)).length,")"]}),(0,_r.jsxs)(w_,{type:"button",$active:"failed"===o,onClick:()=>a("failed"),children:["Failed (",s.filter((e=>"failure"===e.result)).length,")"]})]}),0===s.length?(0,_r.jsx)(C_,{children:"No per-device records yet."}):(0,_r.jsx)(__,{children:l.map((e=>{return(0,_r.jsxs)(k_,{title:e.errorCode||"",children:[(0,_r.jsx)("span",{className:"icon",children:(n=e.platform,"ios"===n?"\ud83c\udf4e":"android"===n?"\ud83e\udd16":"desktop"===n?"\ud83d\udda5":"\ud83c\udf10")}),(0,_r.jsx)("span",{className:"hash",children:(t=e.hash,(t||"").slice(0,8))}),(0,_r.jsxs)("span",{className:"ua",children:[e.opened?(0,_r.jsxs)("span",{className:"opened",children:["opened ",S_(e.openedAt)," \xb7 "]}):null,S_(e.sentAt)]}),(0,_r.jsx)("span",{className:"res "+("success"===e.result?"success":"failure"),children:e.result||"\u2014"})]},e.hash);var t,n}))})]})]})}const I_=function(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)(!0),[o,a]=(0,t.useState)(!1);(0,t.useEffect)((()=>{const e=function(e){const t=Ih(Mf,"notifications"),n=t=>{const n=[];t.forEach((e=>{const t=e.val()||{};n.push({id:e.key,...t})})),n.sort(((e,t)=>(t.sentAt||0)-(e.sentAt||0))),e(n)};return Lh(t,n),()=>Ah(t,"value",n)}((e=>{n(e),i(!1)}));return()=>e&&e()}),[]);const s=(0,t.useMemo)((()=>o?e:function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:365;const n=Date.now()-864e5*t;return e.filter((e=>(e.sentAt||0)>=n))}(e,365)),[e,o]);return(0,_r.jsxs)(g_,{children:[(0,_r.jsx)(m_,{children:"History"}),r?(0,_r.jsx)("div",{style:{padding:"20px 0",textAlign:"center",color:"rgba(255,255,255,0.55)"},children:"Loading\u2026"}):0===s.length?(0,_r.jsxs)(C_,{children:[(0,_r.jsx)("div",{className:"em",children:"\ud83d\udced"}),"No notifications sent yet."]}):s.map((e=>(0,_r.jsx)(T_,{notif:e},e.id))),!r&&e.length>s.length&&(0,_r.jsx)(w_,{type:"button",$active:o,onClick:()=>a((e=>!e)),style:{alignSelf:"center",marginTop:8},children:o?"Last 365 days only":`Show all (${e.length})`})]})};const N_=function(){const[e,n]=(0,t.useState)(null);return(0,_r.jsxs)("div",{children:[e&&(0,_r.jsx)(f_,{notifId:e,onDismiss:()=>n(null)}),(0,_r.jsx)(o_,{onSent:e=>n(e)}),(0,_r.jsx)(I_,{})]})};const j_=function(){const[e,n]=(0,t.useState)((()=>function(){try{return"1"===sessionStorage.getItem(hx)}catch(ik){return!1}}())),[r,i]=(0,t.useState)("events"),[o,a]=(0,t.useState)([]),[s,l]=(0,t.useState)(!0),[c,u]=(0,t.useState)(null);(0,t.useEffect)((()=>{if(!e)return;const t=Zg((e=>{a(e),l(!1)}));return()=>t&&t()}),[e]);const{upcoming:d,past:h}=(0,t.useMemo)((()=>tm(o)),[o]);if(!e)return(0,_r.jsx)(xx,{onAuthed:()=>n(!0)});const p=c&&"new"!==c&&o.find((e=>e.id===c))||null;return(0,_r.jsxs)(ux,{tab:r,onTabChange:i,onSignOut:()=>{!function(){try{sessionStorage.removeItem(hx)}catch(ik){}}(),n(!1),u(null)},children:["events"===r&&(null==c?s?(0,_r.jsx)("div",{style:{padding:"40px 0",textAlign:"center",color:"rgba(255,255,255,0.55)"},children:"Loading events\u2026"}):(0,_r.jsx)(Px,{upcoming:d,past:h,onNew:()=>u("new"),onEdit:e=>u(e)}):(0,_r.jsx)(Lw,{existing:p,onClose:()=>u(null),onSaved:e=>{u(null)},onDeleted:()=>u(null)})),"notifications"===r&&(0,_r.jsx)(N_,{})]})},P_=wr`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(15vw, -10vh) rotate(120deg);
  }
  66% {
    transform: translate(-15vw, 10vh) rotate(240deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
`,R_=vr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    opacity: 0.3;
    z-index: 0;
  }
`,D_=vr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
`,F_=vr.img`
  width: 92%; /* Increased by additional 10% */
  max-width: 422px; /* Increased by additional 10% */
  margin-bottom: 5px; /* Reduced spacing */
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.1));
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 395px; /* Increased by additional 10% */
    margin-bottom: 4px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 330px; /* Increased by additional 10% */
    margin-bottom: 3px;
  }
`,O_=vr.h2`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0 0 5px; /* Reduced spacing */
  opacity: 0.9;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 4px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 3px;
    letter-spacing: 0.12em;
  }
`,L_=vr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 27px; /* Increased spacing before trail conditions */
  text-align: center;
  max-width: 90%;
`,A_=vr.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #FFC72C; /* Egg yolk yellow color */
  margin: 0 3px;
  display: inline-block;
  filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`,M_=vr.div`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  margin: 5px 0;
  opacity: 0.8;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`,z_=vr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.68rem; /* Increased by 5% from 1.6rem */
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
  margin-top: 5px;
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  position: relative;
  
  &::after {
    content: "LESTER RIVER TRAIL";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    color: rgba(255,255,255,0.1);
    filter: blur(4px);
  }
  
  @media (max-width: 768px) {
    font-size: 1.47rem; /* Increased by 5% from 1.4rem */
  }
  
  @media (max-width: 480px) {
    font-size: 1.26rem; /* Increased by 5% from 1.2rem */
  }
`,$_=vr.img`
  width: 70%;
  max-width: 400px;
  margin: 0; /* No margins at all */
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  position: relative;
  z-index: 2; /* Place above the container */
  
  @media (max-width: 768px) {
    width: 80%;
    max-width: 350px;
  }
  
  @media (max-width: 480px) {
    width: 85%;
    max-width: 300px;
  }
`,U_=vr.div`
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 16px; /* Slightly reduced padding */
  margin: 10px 0 20px; /* Added top margin */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 12px;
    width: 95%;
  }
  
  @media (max-width: 480px) {
    padding: 8px;
    width: 90%;
  }
  
  & iframe {
    border: none;
    border-radius: 8px;
    height: 300px; /* Maintained reduced height */
    background: transparent;
    margin: 0; /* No margins */
    width: 100%;
  }
`,B_=vr.div`
  position: fixed;
  font-size: ${e=>e.size||"36px"};
  opacity: ${e=>e.opacity||.2};
  pointer-events: none;
  user-select: none;
  z-index: 0;
  top: ${e=>e.top||"50%"};
  left: ${e=>e.left||"50%"};
  animation: ${P_} ${e=>e.duration||"20s"} ease-in-out infinite;
  animation-delay: ${e=>e.delay||"0s"};
  transform-origin: center;
  will-change: transform;
  
  @media (max-width: 768px) {
    font-size: calc(${e=>e.size||"36px"} * 0.8);
  }
  
  @media (max-width: 480px) {
    font-size: calc(${e=>e.size||"36px"} * 0.7);
  }
`,W_=vr.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 30px 0;
  width: 100%;
  max-width: 600px;
  
  @media (max-width: 480px) {
    gap: 12px;
    flex-direction: column; /* Stack buttons on mobile */
    align-items: center;
    margin: 25px 0;
  }
`,H_=vr.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px; /* Increased horizontal padding */
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 0.95rem; /* Slightly larger font */
  transition: all 0.2s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
  white-space: nowrap; /* Prevent wrapping */
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:before {
    content: ${e=>e.icon||'"\ud83c\udfd4\ufe0f"'};
    margin-right: 10px;
    font-size: 1.3em;
  }
  
  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 12px 14px;
    font-size: 0.9rem;
    width: 100%;
    max-width: 280px;
    
    &:before {
      margin-right: 8px;
      font-size: 1.2em;
    }
  }
`,q_=vr.div`
  width: 100%;
  max-width: 800px;
  background: rgba(255, 199, 44, 0.05);
  border-radius: 16px;
  padding: 35px 25px;
  margin: 30px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 199, 44, 0.15);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    width: 95%;
    margin: 25px 0;
  }
  
  @media (max-width: 480px) {
    padding: 25px 15px;
    width: 90%;
    margin: 20px 0;
  }
`,V_=vr.h2`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
  text-align: center;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`,K_=vr.p`
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  font-style: italic;
  margin-bottom: 25px;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
`,Y_=vr.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`,G_=vr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Q_=vr.label`
  color: #FFC72C;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`,X_=vr.input`
  padding: 16px 18px;
  border-radius: 12px;
  border: 2px solid rgba(255, 199, 44, 0.2);
  background: rgba(255, 255, 255, 0.07);
  color: white;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    border-color: #FFC72C;
    box-shadow: 0 0 0 3px rgba(255, 199, 44, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  @media (max-width: 480px) {
    padding: 14px 16px;
    font-size: 0.95rem;
  }
`,J_=(wr`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
`,vr.button`
  position: relative;
  padding: 16px 32px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 199, 44, 0.3);
  overflow: hidden;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 199, 44, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #888;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: 480px) {
    padding: 14px 24px;
    font-size: 1rem;
    margin-top: 10px;
  }
`),Z_=vr.div`
  text-align: center;
  padding: 30px;
  background: rgba(70, 200, 120, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(70, 200, 120, 0.15);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 1.6rem;
    color: #FFC72C;
    margin-bottom: 12px;
    font-weight: 700;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    line-height: 1.5;
  }
  
  &:before {
    content: "🍳";
    font-size: 3rem;
    display: block;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 25px 15px;
    
    h3 {
      font-size: 1.4rem;
    }
    
    p {
      font-size: 1rem;
    }
    
    &:before {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
  }
`;const ek=function(){const[e,n]=(0,t.useState)([]),r=(0,t.useRef)(null),[i,o]=(0,t.useState)(""),[a,s]=(0,t.useState)(""),[l,c]=(0,t.useState)(!1),[u,d]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{(()=>{if(!document.getElementById("montserrat-font")){const e=document.createElement("link");e.id="montserrat-font",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap",document.head.appendChild(e)}})();const e=()=>{const e=window.innerWidth;return e<=480?6:e<=768?8:12},t=[],i=e();for(let n=0;n<i;n++)t.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.15,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:10*Math.random()+15+"s",delay:`-${10*Math.random()}s`});n(t);const o=()=>{const r=e();if(r!==t.length){const e=[];for(let n=0;n<r;n++)n<t.length?e.push(t[n]):e.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.1,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:60*Math.random()+30+"s",delay:`-${30*Math.random()}s`});n(e)}};if(window.addEventListener("resize",o),!r.current){const e=document.createElement("script");e.src="https://trailbot.com/scripts/embed.js",e.defer=!0,document.body.appendChild(e),r.current=e}return()=>{window.removeEventListener("resize",o),r.current&&document.body.contains(r.current)&&document.body.removeChild(r.current)}}),[]),(0,_r.jsxs)(R_,{children:[e.map((e=>(0,_r.jsx)(B_,{size:e.size,opacity:e.opacity,top:e.top,left:e.left,duration:e.duration,delay:e.delay,children:e.emoji},e.id))),(0,_r.jsxs)(D_,{children:[(0,_r.jsx)(F_,{src:"/assets/cogg white shadow.png",alt:"Scrambled Legs Logo"}),(0,_r.jsx)(O_,{children:"DULUTH'S PREMIER RACE TEAM"}),(0,_r.jsxs)(L_,{children:[(0,_r.jsxs)(M_,{children:[(0,_r.jsx)(A_,{children:"SCRAMBLED LEGS\u2122"})," proudly presents"]}),(0,_r.jsx)(z_,{children:"LESTER RIVER TRAIL"})]}),(0,_r.jsx)($_,{src:"/assets/trail conditions.png",alt:"Trail Conditions"}),(0,_r.jsx)(U_,{children:(0,_r.jsx)("iframe",{src:"https://trailbot.com/widgets/feed?keys=5af70f8f-9995-4451-8877-a42fbb299a6a",width:"100%",className:"trail-status-embed",title:"Lester Park Trail Conditions"})}),(0,_r.jsxs)(W_,{children:[(0,_r.jsx)(H_,{href:"https://www.coggs.com/trail-conditions",target:"_blank",rel:"noopener noreferrer",icon:'"\ud83d\udeb5\u200d\u2642\ufe0f"',children:"TRAIL CONDITIONS"}),(0,_r.jsx)(H_,{href:"https://www.coggs.com/donate",target:"_blank",rel:"noopener noreferrer",icon:'"\ud83d\udee0\ufe0f"',children:"SUPPORT THE TRAILS"})]}),(0,_r.jsxs)(q_,{children:[(0,_r.jsx)(V_,{children:"JOIN THE SCRAMBLED LEGS"}),(0,_r.jsx)(K_,{children:"An elite team of average athletes"}),u?(0,_r.jsxs)(Z_,{children:[(0,_r.jsx)("h3",{children:"Egg-cellent!"}),(0,_r.jsx)("p",{children:"You're officially part of the scramble! We'll keep you updated on all our egg-citing adventures."})]}):(0,_r.jsxs)(Y_,{onSubmit:async e=>{if(e.preventDefault(),!i.trim()||!a.trim())return void alert("Please fill in all fields");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)){c(!0);try{const e=jh(Ih(Mf,"newsletterRegistrants"));await Ph(e,{name:i,email:a,timestamp:Date.now()}),d(!0),o(""),s("")}catch(Ps){console.error("Error submitting form:",Ps),alert("Something went wrong. Please try again later.")}finally{c(!1)}}else alert("Please enter a valid email address")},children:[(0,_r.jsxs)(G_,{children:[(0,_r.jsx)(Q_,{htmlFor:"name",children:"Name"}),(0,_r.jsx)(X_,{id:"name",type:"text",value:i,onChange:e=>o(e.target.value),placeholder:"Your name",required:!0})]}),(0,_r.jsxs)(G_,{children:[(0,_r.jsx)(Q_,{htmlFor:"email",children:"Email"}),(0,_r.jsx)(X_,{id:"email",type:"email",value:a,onChange:e=>s(e.target.value),placeholder:"Your email address",required:!0})]}),(0,_r.jsx)(J_,{type:"submit",disabled:l,children:l?"Submitting...":"Get Crackin'"})]})]})]}),(0,_r.jsx)(Tr,{})]})};const tk=function(){return(0,_r.jsx)(Ce,{basename:"",children:(0,_r.jsxs)(ye,{children:[(0,_r.jsx)(me,{path:"/",element:(0,_r.jsx)(xv,{})}),(0,_r.jsx)(me,{path:"/events/:eventId",element:(0,_r.jsx)(xv,{})}),(0,_r.jsx)(me,{path:"/hotdog-counter",element:(0,_r.jsx)(Qv,{})}),(0,_r.jsx)(me,{path:"/hd.html",element:(0,_r.jsx)(ge,{to:"/hotdog-counter",replace:!0})}),(0,_r.jsx)(me,{path:"/hot-dog-counter",element:(0,_r.jsx)(ge,{to:"/hotdog-counter",replace:!0})}),(0,_r.jsx)(me,{path:"/admin1",element:(0,_r.jsx)(j_,{})}),(0,_r.jsx)(me,{path:"/lester-park",element:(0,_r.jsx)(ek,{})})]})})};n(684);const nk=`production-${(new Date).toISOString().replace(/[:.]/g,"")}`;(new Date).getTime();console.log(`Application starting with build ID: ${nk}`);const rk=(function(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var i=mr.apply(void 0,Pe([e],n,!1)),o="sc-global-".concat(en(JSON.stringify(i))),a=new xr(i,o),s=function(e){var n=er(),r=t.useContext(dr),i=t.useRef(n.styleSheet.allocateGSInstance(o)).current;return n.styleSheet.server&&l(i,e,n.styleSheet,r,n.stylis),t.useLayoutEffect((function(){if(!n.styleSheet.server)return l(i,e,n.styleSheet,r,n.stylis),function(){return a.removeStyles(i,n.styleSheet)}}),[i,e,n.styleSheet,r,n.stylis]),null};function l(e,t,n,r,i){if(a.isStatic)a.renderStyles(e,$t,n,i);else{var o=je(je({},t),{theme:Wt(t,r,s.defaultProps)});a.renderStyles(e,o,n,i)}}return t.memo(s)})`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    height: -webkit-fill-available;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #2c3539;
    position: relative;
    overflow-x: hidden;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    touch-action: manipulation;
    -webkit-overflow-scrolling: touch;
  }

  /* ── Calendar / Mash global CSS vars ── */
  body {
    --mash-energy: 0;
    --mash-overdrive: 0;
  }

  /* ── Mash vignette ── */
  .mash-vignette {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 500;
    opacity: var(--mash-energy, 0);
    background: radial-gradient(
      ellipse 58% 42% at 50% 75%,
      transparent 16%,
      rgba(0,0,0,0.7) 48%,
      rgba(0,0,0,1) 92%
    );
    transition: opacity 0.45s ease;
  }

  /* ── Mash flash ── */
  .mash-flash {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 490;
    opacity: 0;
  }

  /* ── When sheet is open, bump z-indexes above sheet ── */
  body[data-sheet-open="1"] .flying-hot-dog,
  body[data-sheet-open="1"] .flying-egg,
  body[data-sheet-open="1"] .phrase-char { z-index: 9000; }
  body[data-sheet-open="1"] .mash-vignette { z-index: 2200; }
  body[data-sheet-open="1"] .mash-flash   { z-index: 2150; }
  body[data-sheet-open="1"] .mash-vignette {
    background: radial-gradient(
      ellipse 58% 40% at 50% 88%,
      transparent 16%,
      rgba(0,0,0,0.70) 48%,
      rgba(0,0,0,1) 92%
    );
  }

  /* ── kudos-row stays above vignette when mashing ── */
  body[data-mashing="1"] .kudos-row {
    z-index: 700;
  }

  /* ── Rainbow animations ── */
  @keyframes rainbowHalo {
    0%   { filter: drop-shadow(0 0 10px hsl(  0,100%,60%)) drop-shadow(0 0 22px hsl( 40,100%,60%)) brightness(1.3) saturate(1.5); }
    17%  { filter: drop-shadow(0 0 10px hsl( 60,100%,60%)) drop-shadow(0 0 22px hsl(100,100%,60%)) brightness(1.3) saturate(1.5); }
    33%  { filter: drop-shadow(0 0 10px hsl(120,100%,60%)) drop-shadow(0 0 22px hsl(160,100%,60%)) brightness(1.3) saturate(1.5); }
    50%  { filter: drop-shadow(0 0 10px hsl(180,100%,60%)) drop-shadow(0 0 22px hsl(220,100%,60%)) brightness(1.3) saturate(1.5); }
    67%  { filter: drop-shadow(0 0 10px hsl(240,100%,60%)) drop-shadow(0 0 22px hsl(280,100%,60%)) brightness(1.3) saturate(1.5); }
    83%  { filter: drop-shadow(0 0 10px hsl(300,100%,60%)) drop-shadow(0 0 22px hsl(340,100%,60%)) brightness(1.3) saturate(1.5); }
    100% { filter: drop-shadow(0 0 10px hsl(360,100%,60%)) drop-shadow(0 0 22px hsl(400,100%,60%)) brightness(1.3) saturate(1.5); }
  }

  .flying-hot-dog.is-rainbow,
  .flying-egg.is-rainbow {
    animation: rainbowHalo 0.7s linear infinite;
  }

  /* ── Background egg rainbow at 50+ presses ── */
  @keyframes eggBgRainbow {
    0%   { filter: drop-shadow(0 0 12px hsl(  0,100%,60%)) brightness(1.5) saturate(1.6); }
    17%  { filter: drop-shadow(0 0 12px hsl( 60,100%,60%)) brightness(1.5) saturate(1.6); }
    33%  { filter: drop-shadow(0 0 12px hsl(120,100%,60%)) brightness(1.5) saturate(1.6); }
    50%  { filter: drop-shadow(0 0 12px hsl(180,100%,60%)) brightness(1.5) saturate(1.6); }
    67%  { filter: drop-shadow(0 0 12px hsl(240,100%,60%)) brightness(1.5) saturate(1.6); }
    83%  { filter: drop-shadow(0 0 12px hsl(300,100%,60%)) brightness(1.5) saturate(1.6); }
    100% { filter: drop-shadow(0 0 12px hsl(360,100%,60%)) brightness(1.5) saturate(1.6); }
  }

  body[data-eggs-rainbow="1"] .egg {
    z-index: 550;
    opacity: 0.9;
    animation-name: floatEgg, eggBgRainbow;
    animation-duration: var(--dur, 22s), 1.4s;
    animation-timing-function: ease-in-out, linear;
    animation-iteration-count: infinite, infinite;
  }

  body[data-sheet-open="1"][data-eggs-rainbow="1"] .egg { z-index: 2300; }

  /* ── idleEmergencyPulse ── */
  @keyframes idleEmergencyPulse {
    0%, 100% {
      transform: scale(1);
      text-shadow:
        0 0 8px rgba(255,255,255,0.55),
        0 0 18px rgba(255,199,44,0.55),
        0 0 30px rgba(255,107,107,0.45),
        0 4px 14px rgba(0,0,0,0.55);
    }
    50% {
      transform: scale(1.06);
      text-shadow:
        0 0 18px rgba(255,255,255,0.95),
        0 0 36px rgba(255,199,44,0.9),
        0 0 60px rgba(255,107,107,0.7),
        0 0 90px rgba(255,255,200,0.4),
        0 4px 18px rgba(0,0,0,0.55);
    }
  }

  /* ── burnFlash ── */
  @keyframes burnFlash {
    0%   { opacity: 0; transform: scale(0.65); }
    6%   { opacity: 1; transform: scale(1.18); }
    12%  { opacity: 1; transform: scale(1.00); }
    22%  { transform: scale(1.10); }
    30%  { transform: scale(1.00); }
    42%  { transform: scale(1.10); }
    50%  { transform: scale(1.00); }
    62%  { transform: scale(1.08); }
    70%  { transform: scale(1.00); }
    80%  { transform: scale(1.06); }
    88%  { opacity: 1; transform: scale(1.00); }
    100% { opacity: 0; transform: scale(0.95); }
  }

  /* ── blinkDots ── */
  @keyframes blinkDots {
    0%   { content: ''; }
    25%  { content: '.'; }
    50%  { content: '..'; }
    75%  { content: '...'; }
    100% { content: ''; }
  }

  /* ── Shockwave text dislodging (applied via JS --jx/--jy/--jr vars) ── */
  .cal-section-label,
  .event-name, .event-meta span,
  .event-desc, .tags .tag,
  .coming-card .name, .coming-card .meta,
  .coming-card .date-stamp .day,
  .coming-card .date-stamp .month,
  .coming-card .date-stamp .weekday,
  .archive-toggle,
  .archive-card .arch-name,
  .archive-card .arch-date,
  .archive-card .arch-kudos,
  .weather-desc, .weather-extra, .countdown-display, .countdown-label {
    transition: transform 0.20s cubic-bezier(.34,1.56,.64,1);
    transform:
      translateX(calc(var(--jx, 0) * (var(--mash-energy, 0) * 14px + var(--mash-overdrive, 0) * 24px)))
      translateY(calc(var(--jy, 0) * (var(--mash-energy, 0) *  9px + var(--mash-overdrive, 0) * 18px)))
      rotate(calc(var(--jr, 0) * (var(--mash-energy, 0) * 3deg + var(--mash-overdrive, 0) * 5deg)));
  }

  .coming-card {
    --jx: 0; --jy: 0; --jr: 0;
    transition: transform 0.20s cubic-bezier(.34,1.56,.64,1);
    transform:
      translateX(calc(var(--jx, 0) * (var(--mash-energy, 0) * 6px + var(--mash-overdrive, 0) * 12px)))
      translateY(calc(var(--jy, 0) * (var(--mash-energy, 0) * 3px + var(--mash-overdrive, 0) * 8px)))
      rotate(calc(var(--jr, 0) * (var(--mash-energy, 0) * 1deg + var(--mash-overdrive, 0) * 2deg)));
  }

  /* Hard exemption — kudos row must never shockwave */
  .kudos-row,
  .kudos-row *,
  .hd-cta-mash, .hd-cta-mash * {
    --jx: 0 !important;
    --jy: 0 !important;
    --jr: 0 !important;
  }

  /* ── Section label fades with mash energy ── */
  .cal-section-label {
    transition: opacity 0.4s ease;
    opacity: calc(1 - var(--mash-energy, 0) * 0.85);
  }

  /* ── Leaflet pin ── */
  .pin-yolk {
    background: #FFC72C;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 3px solid #1a1a1a;
    box-shadow: 0 0 0 2px #FFC72C, 0 0 18px rgba(255,199,44,0.8);
  }
  .leaflet-tile-pane { filter: brightness(0.85) saturate(0.7); }
  .leaflet-control-attribution { font-size: 9px !important; opacity: 0.5; }
`;i.createRoot(document.getElementById("root")).render((0,_r.jsxs)(t.StrictMode,{children:[(0,_r.jsx)(rk,{}),(0,_r.jsx)(tk,{})]}))})()})();
//# sourceMappingURL=main.686c15aa.js.map