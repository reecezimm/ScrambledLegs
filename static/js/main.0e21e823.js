/*! For license information please see main.0e21e823.js.LICENSE.txt */
(()=>{var e={18:(e,t,n)=>{"use strict";n.d(t,{I:()=>s});const r="sl_device_id";function i(){const e=new Array(16);for(let n=0;n<16;n++)e[n]=Math.floor(256*Math.random());e[6]=15&e[6]|64,e[8]=63&e[8]|128;const t=e.map((e=>e.toString(16).padStart(2,"0")));return t.slice(0,4).join("")+"-"+t.slice(4,6).join("")+"-"+t.slice(6,8).join("")+"-"+t.slice(8,10).join("")+"-"+t.slice(10,16).join("")}let o=null;function s(){if(o)return o;try{let e=localStorage.getItem(r);return e||(e="undefined"!==typeof crypto&&crypto.randomUUID?crypto.randomUUID():i(),localStorage.setItem(r,e)),o=e,e}catch(e){return o=i(),o}}},43:(e,t,n)=>{"use strict";e.exports=n(202)},68:(e,t,n)=>{"use strict";n.d(t,{qk:()=>Le,c7:()=>Me,KR:()=>Fe,bp:()=>De});var r=n(150),i=n(776),o=n(606);const s="firebasestorage.googleapis.com",a="storageBucket";class l extends i.g{constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;super(u(e),`Firebase Storage: ${t} (${u(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,l.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return u(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var c,d;function u(e){return"storage/"+e}function h(){return new l(c.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function p(){return new l(c.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function f(){return new l(c.CANCELED,"User canceled the upload/download.")}function g(){return new l(c.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function m(e){return new l(c.INVALID_ARGUMENT,e)}function y(){return new l(c.APP_DELETED,"The Firebase app was deleted.")}function b(e,t){return new l(c.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function v(e){throw new l(c.INTERNAL_ERROR,"Internal error: "+e)}!function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"}(c||(c={}));class x{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=x.makeFromUrl(e,t)}catch(i){return new x(e,"")}if(""===n.path)return n;throw r=e,new l(c.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.");var r}static makeFromUrl(e,t){let n=null;const r="([A-Za-z0-9.\\-_]+)";const i=new RegExp("^gs://"+r+"(/(.*))?$","i");function o(e){e.path_=decodeURIComponent(e.path)}const a=t.replace(/[.]/g,"\\."),d=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${a}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:o},{regex:new RegExp(`^https?://${t===s?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:o}];for(let s=0;s<d.length;s++){const t=d[s],r=t.regex.exec(e);if(r){const e=r[t.indices.bucket];let i=r[t.indices.path];i||(i=""),n=new x(e,i),t.postModify(n);break}}if(null==n)throw function(e){return new l(c.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return n}}class w{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(){}}function _(e){return"string"===typeof e||e instanceof String}function k(e){return S()&&e instanceof Blob}function S(){return"undefined"!==typeof Blob}function C(e,t,n,r){if(r<t)throw m(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw m(`Invalid value for '${e}'. Expected ${n} or less.`)}function E(e,t,n){let r=t;return null==n&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function T(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){n=n+(t(r)+"="+t(e[r]))+"&"}return n=n.slice(0,-1),n}function I(e,t){const n=e>=500&&e<600,r=-1!==[408,429].indexOf(e),i=-1!==t.indexOf(e);return n||r||i}!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(d||(d={}));class j{constructor(e,t,n,r,i,o,s,a,l,c,d){let u=!(arguments.length>11&&void 0!==arguments[11])||arguments[11],h=arguments.length>12&&void 0!==arguments[12]&&arguments[12];this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=s,this.errorCallback_=a,this.timeout_=l,this.progressCallback_=c,this.connectionFactory_=d,this.retry=u,this.isUsingEmulator=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise(((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()}))}start_(){const e=(e,t)=>{if(t)return void e(!1,new P(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then((()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const t=n.getErrorCode()===d.NO_ERROR,i=n.getStatus();if(!t||I(i,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===d.ABORT;return void e(!1,new P(!1,null,t))}const o=-1!==this.successCodes_.indexOf(i);e(!0,new P(o,n))}))},t=(e,t)=>{const n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(i,i.getResponse());void 0!==e?n(e):n()}catch(o){r(o)}else if(null!==i){const e=h();e.serverResponse=i.getErrorText(),this.errorCallback_?r(this.errorCallback_(i,e)):r(e)}else if(t.canceled){r(this.appDelete_?y():f())}else{r(p())}};this.canceled_?t(0,new P(!1,null,!0)):this.backoffId_=function(e,t,n){let r=1,i=null,o=null,s=!1,a=0;function l(){return 2===a}let c=!1;function d(){if(!c){c=!0;for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];t.apply(null,n)}}function u(t){i=setTimeout((()=>{i=null,e(p,l())}),t)}function h(){o&&clearTimeout(o)}function p(e){if(c)return void h();for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];if(e)return h(),void d.call(null,e,...n);if(l()||s)return h(),void d.call(null,e,...n);let o;r<64&&(r*=2),1===a?(a=2,o=0):o=1e3*(r+Math.random()),u(o)}let f=!1;function g(e){f||(f=!0,h(),c||(null!==i?(e||(a=2),clearTimeout(i),u(0)):e||(a=1)))}return u(0),o=setTimeout((()=>{s=!0,g(!0)}),n),g}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class P{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function A(){return"undefined"!==typeof BlobBuilder?BlobBuilder:"undefined"!==typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function N(){const e=A();for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if(void 0!==e){const t=new e;for(let e=0;e<n.length;e++)t.append(n[e]);return t.getBlob()}if(S())return new Blob(n);throw new l(c.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}function R(e){if("undefined"===typeof atob)throw t="base-64",new l(c.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`);var t;return atob(e)}const O="raw",D="base64",L="base64url",F="data_url";class M{constructor(e,t){this.data=e,this.contentType=t||null}}function z(e,t){switch(e){case O:return new M(U(t));case D:case L:return new M($(e,t));case F:return new M(function(e){const t=new B(e);return t.base64?$(D,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(n){throw b(F,"Malformed data URL.")}return U(t)}(t.rest)}(t),new B(t).contentType)}throw h()}function U(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|63&r);else if(55296===(64512&r)){if(n<e.length-1&&56320===(64512&e.charCodeAt(n+1))){r=65536|(1023&r)<<10|1023&e.charCodeAt(++n),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else t.push(239,191,189)}else 56320===(64512&r)?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function $(e,t){switch(e){case D:{const n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r){throw b(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?")}break}case L:{const n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r){throw b(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?")}t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=R(t)}catch(i){if(i.message.includes("polyfill"))throw i;throw b(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let o=0;o<n.length;o++)r[o]=n.charCodeAt(o);return r}class B{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw b(F,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;null!=n&&(this.base64=function(e,t){if(!(e.length>=t.length))return!1;return e.substring(e.length-t.length)===t}(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}class W{constructor(e,t){let n=0,r="";k(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(k(this.data_)){const n=function(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}(this.data_,e,t);return null===n?null:new W(n)}{const n=new Uint8Array(this.data_.buffer,e,t-e);return new W(n,!0)}}static getBlob(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];if(S()){const e=t.map((e=>e instanceof W?e.data_:e));return new W(N.apply(null,e))}{const e=t.map((e=>_(e)?z(O,e).data:e.data_));let n=0;e.forEach((e=>{n+=e.byteLength}));const r=new Uint8Array(n);let i=0;return e.forEach((e=>{for(let t=0;t<e.length;t++)r[i++]=e[t]})),new W(r,!0)}}uploadData(){return this.data_}}function H(e){let t;try{t=JSON.parse(e)}catch(r){return null}return"object"!==typeof(n=t)||Array.isArray(n)?null:t;var n}function V(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}function q(e,t){return t}class K{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||q}}let Y=null;function G(){if(Y)return Y;const e=[];e.push(new K("bucket")),e.push(new K("generation")),e.push(new K("metageneration")),e.push(new K("name","fullPath",!0));const t=new K("name");t.xform=function(e,t){return function(e){return!_(e)||e.length<2?e:V(e)}(t)},e.push(t);const n=new K("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new K("timeCreated")),e.push(new K("updated")),e.push(new K("md5Hash",null,!0)),e.push(new K("cacheControl",null,!0)),e.push(new K("contentDisposition",null,!0)),e.push(new K("contentEncoding",null,!0)),e.push(new K("contentLanguage",null,!0)),e.push(new K("contentType",null,!0)),e.push(new K("metadata","customMetadata",!0)),Y=e,Y}function Z(e,t,n){const r={type:"file"},i=n.length;for(let o=0;o<i;o++){const e=n[o];r[e.local]=e.xform(r,t[e.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){const n=e.bucket,r=e.fullPath,i=new x(n,r);return t._makeStorageReference(i)}})}(r,e),r}function Q(e,t,n){const r=H(t);if(null===r)return null;return Z(e,r,n)}function J(e,t){const n={},r=t.length;for(let i=0;i<r;i++){const r=t[i];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}class X{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}function ee(e){if(!e)throw h()}function te(e,t){return function(n,r){const i=Q(e,r,t);return ee(null!==i),i}}function ne(e,t){return function(n,r){const i=Q(e,r,t);return ee(null!==i),function(e,t,n,r){const i=H(t);if(null===i)return null;if(!_(i.downloadTokens))return null;const o=i.downloadTokens;if(0===o.length)return null;const s=encodeURIComponent;return o.split(",").map((t=>{const i=e.bucket,o=e.fullPath;return E("/b/"+s(i)+"/o/"+s(o),n,r)+T({alt:"media",token:t})}))[0]}(i,r,e.host,e._protocol)}}function re(e){return function(t,n){let r;var i,o;return 401===t.getStatus()?r=t.getErrorText().includes("Firebase App Check token is invalid")?new l(c.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new l(c.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(o=e.bucket,r=new l(c.QUOTA_EXCEEDED,"Quota for bucket '"+o+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(i=e.path,r=new l(c.UNAUTHORIZED,"User does not have permission to access '"+i+"'.")):r=n,r.status=t.getStatus(),r.serverResponse=n.serverResponse,r}}function ie(e){const t=re(e);return function(n,r){let i=t(n,r);var o;return 404===n.getStatus()&&(o=e.path,i=new l(c.OBJECT_NOT_FOUND,"Object '"+o+"' does not exist.")),i.serverResponse=r.serverResponse,i}}function oe(e,t,n){const r=E(t.fullServerUrl(),e.host,e._protocol),i=e.maxOperationRetryTime,o=new X(r,"GET",te(e,n),i);return o.errorHandler=ie(t),o}function se(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),r}function ae(e,t,n,r,i){const o=t.bucketOnlyServerUrl(),s={"X-Goog-Upload-Protocol":"multipart"};const a=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();s["Content-Type"]="multipart/related; boundary="+a;const l=se(t,r,i),c="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+J(l,n)+"\r\n--"+a+"\r\nContent-Type: "+l.contentType+"\r\n\r\n",d="\r\n--"+a+"--",u=W.getBlob(c,r,d);if(null===u)throw g();const h={name:l.fullPath},p=E(o,e.host,e._protocol),f=e.maxUploadRetryTime,m=new X(p,"POST",te(e,n),f);return m.urlParams=h,m.headers=s,m.body=u.uploadData(),m.errorHandler=re(t),m}class le{constructor(e,t,n,r){this.current=e,this.total=t,this.finalized=!!n,this.metadata=r||null}}function ce(e,t){let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Status")}catch(r){ee(!1)}return ee(!!n&&-1!==(t||["active"]).indexOf(n)),n}const de=262144;function ue(e,t,n,r,i,o,s,a){const d=new le(0,0);if(s?(d.current=s.current,d.total=s.total):(d.current=0,d.total=r.size()),r.size()!==d.total)throw new l(c.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.");const u=d.total-d.current;let h=u;i>0&&(h=Math.min(h,i));const p=d.current,f=p+h;let m="";m=0===h?"finalize":u===h?"upload, finalize":"upload";const y={"X-Goog-Upload-Command":m,"X-Goog-Upload-Offset":`${d.current}`},b=r.slice(p,f);if(null===b)throw g();const v=t.maxUploadRetryTime,x=new X(n,"POST",(function(e,n){const i=ce(e,["active","final"]),s=d.current+h,a=r.size();let l;return l="final"===i?te(t,o)(e,n):null,new le(s,a,"final"===i,l)}),v);return x.headers=y,x.body=b.uploadData(),x.progressCallback=a||null,x.errorHandler=re(e),x}const he="running",pe="paused",fe="success",ge="canceled",me="error";function ye(e){switch(e){case"running":case"pausing":case"canceling":return he;case"paused":return pe;case"success":return fe;case"canceled":return ge;default:return me}}class be{constructor(e,t,n){if("function"===typeof e||null!=t||null!=n)this.next=e,this.error=t??void 0,this.complete=n??void 0;else{const t=e;this.next=t.next,this.error=t.error,this.complete=t.complete}}}function ve(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];Promise.resolve().then((()=>e(...n)))}}let xe=null;class we{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=d.NO_ERROR,this.sendPromise_=new Promise((e=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=d.ABORT,e()})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=d.NETWORK_ERROR,e()})),this.xhr_.addEventListener("load",(()=>{e()}))}))}send(e,t,n,r,o){if(this.sent_)throw v("cannot .send() more than once");if((0,i.zJ)(e)&&n&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==o)for(const i in o)o.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,o[i].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw v("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw v("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}}getResponse(){if(!this.sent_)throw v("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw v("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class _e extends we{initXhr(){this.xhr_.responseType="text"}}function ke(){return xe?xe():new _e}class Se{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=n,this._mappings=G(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=e=>{if(this._request=void 0,this._chunkMultiplier=1,e._codeEquals(c.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const t=this.isExponentialBackoffExpired();if(I(e.status,[])){if(!t)return this.sleepTime=Math.max(2*this.sleepTime,1e3),this._needToFetchStatus=!0,void this.completeTransitions_();e=p()}this._error=e,this._transition("error")}},this._metadataErrorHandler=e=>{this._request=void 0,e._codeEquals(c.CANCELED)?this.completeTransitions_():(this._error=e,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise(((e,t)=>{this._resolve=e,this._reject=t,this._start()})),this._promise.then(null,(()=>{}))}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout((()=>{this.pendingTimeout=void 0,this._continueUpload()}),this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then((t=>{let[n,r]=t;switch(this._state){case"running":e(n,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused")}}))}_createResumable(){this._resolveToken(((e,t)=>{const n=function(e,t,n,r,i){const o=t.bucketOnlyServerUrl(),s=se(t,r,i),a={name:s.fullPath},l=E(o,e.host,e._protocol),c={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":s.contentType,"Content-Type":"application/json; charset=utf-8"},d=J(s,n),u=e.maxUploadRetryTime,h=new X(l,"POST",(function(e){let t;ce(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(n){ee(!1)}return ee(_(t)),t}),u);return h.urlParams=a,h.headers=c,h.body=d,h.errorHandler=re(t),h}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(n,ke,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._uploadUrl=e,this._needToFetchStatus=!1,this.completeTransitions_()}),this._errorHandler)}))}_fetchStatus(){const e=this._uploadUrl;this._resolveToken(((t,n)=>{const r=function(e,t,n,r){const i=e.maxUploadRetryTime,o=new X(n,"POST",(function(e){const t=ce(e,["active","final"]);let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(o){ee(!1)}n||ee(!1);const i=Number(n);return ee(!isNaN(i)),new le(i,r.size(),"final"===t)}),i);return o.headers={"X-Goog-Upload-Command":"query"},o.errorHandler=re(t),o}(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(r,ke,t,n);this._request=i,i.getPromise().then((e=>{this._request=void 0,this._updateProgress(e.current),this._needToFetchStatus=!1,e.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()}),this._errorHandler)}))}_continueUpload(){const e=de*this._chunkMultiplier,t=new le(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken(((r,i)=>{let o;try{o=ue(this._ref._location,this._ref.storage,n,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(a){return this._error=a,void this._transition("error")}const s=this._ref.storage._makeRequest(o,ke,r,i,!1);this._request=s,s.getPromise().then((e=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(e.current),e.finalized?(this._metadata=e.metadata,this._transition("success")):this.completeTransitions_()}),this._errorHandler)}))}_increaseMultiplier(){2*(de*this._chunkMultiplier)<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken(((e,t)=>{const n=oe(this._ref.storage,this._ref._location,this._mappings),r=this._ref.storage._makeRequest(n,ke,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._metadata=e,this._transition("success")}),this._metadataErrorHandler)}))}_oneShotUpload(){this._resolveToken(((e,t)=>{const n=ae(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(n,ke,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._metadata=e,this._updateProgress(this._blob.size()),this._transition("success")}),this._errorHandler)}))}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":case"error":case"success":this._state=e,this._notifyObservers();break;case"canceled":this._error=f(),this._state=e,this._notifyObservers()}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}}get snapshot(){const e=ye(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,n,r){const i=new be(t||void 0,n||void 0,r||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise();this._observers.slice().forEach((e=>{this._notifyObserver(e)}))}_finishPromise(){if(void 0!==this._resolve){let e=!0;switch(ye(this._state)){case fe:ve(this._resolve.bind(null,this.snapshot))();break;case ge:case me:ve(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(ye(this._state)){case he:case pe:e.next&&ve(e.next.bind(e,this.snapshot))();break;case fe:e.complete&&ve(e.complete.bind(e))();break;default:e.error&&ve(e.error.bind(e,this._error))()}}resume(){const e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e}pause(){const e="running"===this._state;return e&&this._transition("pausing"),e}cancel(){const e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e}}class Ce{constructor(e,t){this._service=e,this._location=t instanceof x?t:x.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Ce(e,t)}get root(){const e=new x(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return V(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new x(this._location.bucket,e);return new Ce(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new l(c.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function Ee(e){e._throwIfRoot("getDownloadURL");const t=function(e,t,n){const r=E(t.fullServerUrl(),e.host,e._protocol),i=e.maxOperationRetryTime,o=new X(r,"GET",ne(e,n),i);return o.errorHandler=ie(t),o}(e.storage,e._location,G());return e.storage.makeRequestWithTokens(t,ke).then((e=>{if(null===e)throw new l(c.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e}))}function Te(e,t){const n=function(e,t){const n=t.split("/").filter((e=>e.length>0)).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),r=new x(e._location.bucket,n);return new Ce(e.storage,r)}function Ie(e,t){if(e instanceof Ae){const n=e;if(null==n._bucket)throw new l(c.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+a+"' property when initializing the app?");const r=new Ce(n,n._bucket);return null!=t?Ie(r,t):r}return void 0!==t?Te(e,t):e}function je(e,t){if(t&&/^[A-Za-z]+:\/\//.test(t)){if(e instanceof Ae)return new Ce(e,t);throw m("To use ref(service, url), the first argument must be a Storage instance.")}return Ie(e,t)}function Pe(e,t){const n=t?.[a];return null==n?null:x.makeFromBucketSpec(n,e)}class Ae{constructor(e,t,n,r,i){let o=arguments.length>5&&void 0!==arguments[5]&&arguments[5];this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=s,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?x.makeFromBucketSpec(r,this._host):Pe(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=x.makeFromBucketSpec(this._url,e):this._bucket=Pe(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){C("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){C("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if((0,r.xZ)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});if(e){return(await e.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach((e=>e.cancel())),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Ce(this,e)}_makeRequest(e,t,n,r){let i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(this._deleted)return new w(y());{const o=function(e,t,n,r,i,o){let s=!(arguments.length>6&&void 0!==arguments[6])||arguments[6],a=arguments.length>7&&void 0!==arguments[7]&&arguments[7];const l=T(e.urlParams),c=e.url+l,d=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(d,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(d,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}(d,o),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(d,r),new j(c,e.method,d,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,s,a)}(e,this._appId,n,r,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then((()=>this._requests.delete(o)),(()=>this._requests.delete(o))),o}}async makeRequestWithTokens(e,t){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}const Ne="@firebase/storage",Re="0.14.2",Oe="storage";function De(e,t,n){return function(e,t,n){return e._throwIfRoot("uploadBytesResumable"),new Se(e,new W(t),n)}(e=(0,i.Ku)(e),t,n)}function Le(e){return Ee(e=(0,i.Ku)(e))}function Fe(e,t){return je(e=(0,i.Ku)(e),t)}function Me(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Sx)(),t=arguments.length>1?arguments[1]:void 0;e=(0,i.Ku)(e);const n=(0,r.j6)(e,Oe).getImmediate({identifier:t}),o=(0,i.yU)("storage");return o&&function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};!function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};e.host=`${t}:${n}`;const o=(0,i.zJ)(t);o&&(0,i.gE)(`https://${e.host}/b`),e._isUsingEmulator=!0,e._protocol=o?"https":"http";const{mockUserToken:s}=r;s&&(e._overrideAuthToken="string"===typeof s?s:(0,i.Fy)(s,e.app.options.projectId))}(e,t,n,r)}(n,...o),n}function ze(e,t){let{instanceIdentifier:n}=t;const i=e.getProvider("app").getImmediate(),o=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new Ae(i,o,s,n,r.MF)}(0,r.om)(new o.uA(Oe,ze,"PUBLIC").setMultipleInstances(!0)),(0,r.KO)(Ne,Re,""),(0,r.KO)(Ne,Re,"esm2020")},116:(e,t,n)=>{"use strict";n.d(t,{hl:()=>r,IN:()=>i,ud:()=>o});const r="3.1.0",i="60",o="e9d2ad0";"undefined"!==typeof window&&(window.__sl_build={version:r,num:i,sha:o,time:"2026-04-29T15:15:56Z"})},122:(e,t,n)=>{"use strict";n.d(t,{yA:()=>y,j2:()=>x,OO:()=>b,Oe:()=>_,IG:()=>v});var r=n(150);(0,r.KO)("firebase","12.12.1","app");var i=n(800),o=n(68),s=n(508),a=n(776),l=n(606);const c="functions";a.g;class d{constructor(e,t,n,i){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,(0,r.xZ)(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=n.getImmediate({optional:!0}),this.auth||t.get().then((e=>this.auth=e),(()=>{})),this.messaging||n.get().then((e=>this.messaging=e),(()=>{})),this.appCheck||i?.get().then((e=>this.appCheck=e),(()=>{}))}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch(e){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return await this.messaging.getToken()}catch(e){return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){return{authToken:await this.getAuthToken(),messagingToken:await this.getMessagingToken(),appCheckToken:await this.getAppCheckToken(e)}}}const u="us-central1";class h{constructor(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:u,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:function(){return fetch(...arguments)};this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new d(e,t,n,r),this.cancelAllRequests=new Promise((e=>{this.deleteService=()=>Promise.resolve(e())}));try{const e=new URL(i);this.customDomain=e.origin+("/"===e.pathname?"":e.pathname),this.region=u}catch(s){this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;if(null!==this.emulatorOrigin){return`${this.emulatorOrigin}/${t}/${this.region}/${e}`}return null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}const p="@firebase/functions",f="0.13.3";var g;(0,r.om)(new l.uA(c,((e,t)=>{let{instanceIdentifier:n}=t;const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),o=e.getProvider("messaging-internal"),s=e.getProvider("app-check-internal");return new h(r,i,o,s,n)}),"PUBLIC").setMultipleInstances(!0)),(0,r.KO)(p,f,g),(0,r.KO)(p,f,"esm2020");var m=n(873);const y=(0,r.Wp)({apiKey:"AIzaSyAmwwbvmvxNYX-8PesRl8io9CH60sI2v2A",authDomain:"fundraiser-f0831.firebaseapp.com",databaseURL:"https://fundraiser-f0831-default-rtdb.firebaseio.com",projectId:"fundraiser-f0831",storageBucket:"fundraiser-f0831.firebasestorage.app",messagingSenderId:"900827039889",appId:"1:900827039889:web:4bd336cb4f88a0c76e1730"}),b=(0,i.C3)(y),v=(0,o.c7)(y),x=(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Sx)(),t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u;const n=(0,r.j6)((0,a.Ku)(e),c).getImmediate({identifier:t}),i=(0,a.yU)("functions");i&&function(e,t,n){!function(e,t,n){const r=(0,a.zJ)(t);e.emulatorOrigin=`http${r?"s":""}://${t}:${n}`,r&&(0,a.gE)(e.emulatorOrigin+"/backends")}((0,a.Ku)(e),t,n)}(n,...i)}(y),(0,m.xI)(y));(0,m.oM)(x,m.F0).catch((()=>{}));let w=null;function _(){return w||(w=(0,s.TT)().then((e=>{if(!e)return null;try{return(0,s.dG)(y)}catch(t){return null}})).catch((()=>null)),w)}},150:(e,t,n)=>{"use strict";n.d(t,{KO:()=>J,MF:()=>G,Sx:()=>Q,Wp:()=>Z,j6:()=>H,om:()=>W,xZ:()=>V});var r=n(606),i=n(965),o=n(776),s=n(799);class a{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===t?.type}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const l="@firebase/app",c="0.14.11",d=new i.Vy("@firebase/app"),u="@firebase/app-compat",h="@firebase/analytics-compat",p="@firebase/analytics",f="@firebase/app-check-compat",g="@firebase/app-check",m="@firebase/auth",y="@firebase/auth-compat",b="@firebase/database",v="@firebase/data-connect",x="@firebase/database-compat",w="@firebase/functions",_="@firebase/functions-compat",k="@firebase/installations",S="@firebase/installations-compat",C="@firebase/messaging",E="@firebase/messaging-compat",T="@firebase/performance",I="@firebase/performance-compat",j="@firebase/remote-config",P="@firebase/remote-config-compat",A="@firebase/storage",N="@firebase/storage-compat",R="@firebase/firestore",O="@firebase/ai",D="@firebase/firestore-compat",L="firebase",F="[DEFAULT]",M={[l]:"fire-core",[u]:"fire-core-compat",[p]:"fire-analytics",[h]:"fire-analytics-compat",[g]:"fire-app-check",[f]:"fire-app-check-compat",[m]:"fire-auth",[y]:"fire-auth-compat",[b]:"fire-rtdb",[v]:"fire-data-connect",[x]:"fire-rtdb-compat",[w]:"fire-fn",[_]:"fire-fn-compat",[k]:"fire-iid",[S]:"fire-iid-compat",[C]:"fire-fcm",[E]:"fire-fcm-compat",[T]:"fire-perf",[I]:"fire-perf-compat",[j]:"fire-rc",[P]:"fire-rc-compat",[A]:"fire-gcs",[N]:"fire-gcs-compat",[R]:"fire-fst",[D]:"fire-fst-compat",[O]:"fire-vertex","fire-js":"fire-js",[L]:"fire-js-all"},z=new Map,U=new Map,$=new Map;function B(e,t){try{e.container.addComponent(t)}catch(n){d.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function W(e){const t=e.name;if($.has(t))return d.debug(`There were multiple attempts to register component ${t}.`),!1;$.set(t,e);for(const n of z.values())B(n,e);for(const n of U.values())B(n,e);return!0}function H(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function V(e){return null!==e&&void 0!==e&&void 0!==e.settings}const q={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},K=new o.FA("app","Firebase",q);class Y{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new r.uA("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw K.create("app-deleted",{appName:this._name})}}const G="12.12.0";function Z(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e;if("object"!==typeof t){t={name:t}}const i={name:F,automaticDataCollectionEnabled:!0,...t},s=i.name;if("string"!==typeof s||!s)throw K.create("bad-app-name",{appName:String(s)});if(n||(n=(0,o.T9)()),!n)throw K.create("no-options");const a=z.get(s);if(a){if((0,o.bD)(n,a.options)&&(0,o.bD)(i,a.config))return a;throw K.create("duplicate-app",{appName:s})}const l=new r.h1(s);for(const r of $.values())l.addComponent(r);const c=new Y(n,i,l);return z.set(s,c),c}function Q(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F;const t=z.get(e);if(!t&&e===F&&(0,o.T9)())return Z();if(!t)throw K.create("no-app",{appName:e});return t}function J(e,t,n){let i=M[e]??e;n&&(i+=`-${n}`);const o=i.match(/\s|\//),s=t.match(/\s|\//);if(o||s){const e=[`Unable to register library "${i}" with version "${t}":`];return o&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void d.warn(e.join(" "))}W(new r.uA(`${i}-version`,(()=>({library:i,version:t})),"VERSION"))}const X="firebase-heartbeat-store";let ee=null;function te(){return ee||(ee=(0,s.P2)("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(X)}catch(n){console.warn(n)}}}).catch((e=>{throw K.create("idb-open",{originalErrorMessage:e.message})}))),ee}async function ne(e,t){try{const n=(await te()).transaction(X,"readwrite"),r=n.objectStore(X);await r.put(t,re(e)),await n.done}catch(n){if(n instanceof o.g)d.warn(n.message);else{const e=K.create("idb-set",{originalErrorMessage:n?.message});d.warn(e.message)}}}function re(e){return`${e.name}!${e.options.appId}`}class ie{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new se(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=oe();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some((e=>e.date===t)))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){d.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=oe(),{heartbeatsToSend:t,unsentEntries:n}=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1024;const n=[];let r=e.slice();for(const i of e){const e=n.find((e=>e.agent===i.agent));if(e){if(e.dates.push(i.date),ae(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),ae(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),r=(0,o.Uj)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return d.warn(e),""}}}function oe(){return(new Date).toISOString().substring(0,10)}class se{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,o.zW)()&&(0,o.eX)().then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await te()).transaction(X),n=await t.objectStore(X).get(re(e));return await t.done,n}catch(t){if(t instanceof o.g)d.warn(t.message);else{const e=K.create("idb-get",{originalErrorMessage:t?.message});d.warn(e.message)}}}(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return ne(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return ne(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function ae(e){return(0,o.Uj)(JSON.stringify({version:2,heartbeats:e})).length}var le;le="",W(new r.uA("platform-logger",(e=>new a(e)),"PRIVATE")),W(new r.uA("heartbeat",(e=>new ie(e)),"PRIVATE")),J(l,c,le),J(l,c,"esm2020"),J("fire-js","")},153:(e,t,n)=>{"use strict";var r=n(43),i=Symbol.for("react.element"),o=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,a=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,o={},c=null,d=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)s.call(t,r)&&!l.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:i,type:e,key:c,ref:d,props:o,_owner:a.current}}t.Fragment=o,t.jsx=c,t.jsxs=c},173:(e,t,n)=>{"use strict";n.d(t,{logEvent:()=>c});var r=n(800),i=n(122),o=n(18),s=n(241),a=n(116);let l=!1;function c(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e)try{const c=(0,r.VC)((0,r.ref)(i.OO,"analyticsEvents")),d="undefined"!==typeof window?window.location.pathname:"",u=!l;l=!0;const h={name:String(e),props:t||{},uid:i.j2.currentUser&&i.j2.currentUser.uid||null,deviceId:(0,o.I)(),sessionId:(0,s.u0)(),path:d,version:a.hl,buildNum:a.IN,buildSha:a.ud,ts:(0,r.O5)()};u&&"undefined"!==typeof document&&(h.referrer=document.referrer||""),(0,r.hZ)(c,h).catch((()=>{}));try{(0,s.U2)()}catch(n){}}catch(n){}}},202:(e,t)=>{"use strict";var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),p=Symbol.iterator;var f={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,m={};function y(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||f}function b(){}function v(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||f}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=y.prototype;var x=v.prototype=new b;x.constructor=v,g(x,y.prototype),x.isPureReactComponent=!0;var w=Array.isArray,_=Object.prototype.hasOwnProperty,k={current:null},S={key:!0,ref:!0,__self:!0,__source:!0};function C(e,t,r){var i,o={},s=null,a=null;if(null!=t)for(i in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(s=""+t.key),t)_.call(t,i)&&!S.hasOwnProperty(i)&&(o[i]=t[i]);var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];o.children=c}if(e&&e.defaultProps)for(i in l=e.defaultProps)void 0===o[i]&&(o[i]=l[i]);return{$$typeof:n,type:e,key:s,ref:a,props:o,_owner:k.current}}function E(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var T=/\/+/g;function I(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function j(e,t,i,o,s){var a=typeof e;"undefined"!==a&&"boolean"!==a||(e=null);var l=!1;if(null===e)l=!0;else switch(a){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case n:case r:l=!0}}if(l)return s=s(l=e),e=""===o?"."+I(l,0):o,w(s)?(i="",null!=e&&(i=e.replace(T,"$&/")+"/"),j(s,t,i,"",(function(e){return e}))):null!=s&&(E(s)&&(s=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(s,i+(!s.key||l&&l.key===s.key?"":(""+s.key).replace(T,"$&/")+"/")+e)),t.push(s)),1;if(l=0,o=""===o?".":o+":",w(e))for(var c=0;c<e.length;c++){var d=o+I(a=e[c],c);l+=j(a,t,i,d,s)}else if(d=function(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"===typeof d)for(e=d.call(e),c=0;!(a=e.next()).done;)l+=j(a=a.value,t,i,d=o+I(a,c++),s);else if("object"===a)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function P(e,t,n){if(null==e)return e;var r=[],i=0;return j(e,r,"","",(function(e){return t.call(n,e,i++)})),r}function A(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var N={current:null},R={transition:null},O={ReactCurrentDispatcher:N,ReactCurrentBatchConfig:R,ReactCurrentOwner:k};function D(){throw Error("act(...) is not supported in production builds of React.")}t.Children={map:P,forEach:function(e,t,n){P(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return P(e,(function(){t++})),t},toArray:function(e){return P(e,(function(e){return e}))||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=y,t.Fragment=i,t.Profiler=s,t.PureComponent=v,t.StrictMode=o,t.Suspense=d,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=O,t.act=D,t.cloneElement=function(e,t,r){if(null===e||void 0===e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var i=g({},e.props),o=e.key,s=e.ref,a=e._owner;if(null!=t){if(void 0!==t.ref&&(s=t.ref,a=k.current),void 0!==t.key&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)_.call(t,c)&&!S.hasOwnProperty(c)&&(i[c]=void 0===t[c]&&void 0!==l?l[c]:t[c])}var c=arguments.length-2;if(1===c)i.children=r;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];i.children=l}return{$$typeof:n,type:e.type,key:o,ref:s,props:i,_owner:a}},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},t.createElement=C,t.createFactory=function(e){var t=C.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=E,t.lazy=function(e){return{$$typeof:h,_payload:{_status:-1,_result:e},_init:A}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=R.transition;R.transition={};try{e()}finally{R.transition=t}},t.unstable_act=D,t.useCallback=function(e,t){return N.current.useCallback(e,t)},t.useContext=function(e){return N.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return N.current.useDeferredValue(e)},t.useEffect=function(e,t){return N.current.useEffect(e,t)},t.useId=function(){return N.current.useId()},t.useImperativeHandle=function(e,t,n){return N.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return N.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return N.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return N.current.useMemo(e,t)},t.useReducer=function(e,t,n){return N.current.useReducer(e,t,n)},t.useRef=function(e){return N.current.useRef(e)},t.useState=function(e){return N.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return N.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return N.current.useTransition()},t.version="18.3.1"},234:(e,t)=>{"use strict";function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,i=e[r];if(!(0<o(i,t)))break e;e[r]=t,e[n]=i,n=r}}function r(e){return 0===e.length?null:e[0]}function i(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,i=e.length,s=i>>>1;r<s;){var a=2*(r+1)-1,l=e[a],c=a+1,d=e[c];if(0>o(l,n))c<i&&0>o(d,l)?(e[r]=d,e[c]=n,r=c):(e[r]=l,e[a]=n,r=a);else{if(!(c<i&&0>o(d,n)))break e;e[r]=d,e[c]=n,r=c}}}return t}function o(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if("object"===typeof performance&&"function"===typeof performance.now){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,l=a.now();t.unstable_now=function(){return a.now()-l}}var c=[],d=[],u=1,h=null,p=3,f=!1,g=!1,m=!1,y="function"===typeof setTimeout?setTimeout:null,b="function"===typeof clearTimeout?clearTimeout:null,v="undefined"!==typeof setImmediate?setImmediate:null;function x(e){for(var t=r(d);null!==t;){if(null===t.callback)i(d);else{if(!(t.startTime<=e))break;i(d),t.sortIndex=t.expirationTime,n(c,t)}t=r(d)}}function w(e){if(m=!1,x(e),!g)if(null!==r(c))g=!0,R(_);else{var t=r(d);null!==t&&O(w,t.startTime-e)}}function _(e,n){g=!1,m&&(m=!1,b(E),E=-1),f=!0;var o=p;try{for(x(n),h=r(c);null!==h&&(!(h.expirationTime>n)||e&&!j());){var s=h.callback;if("function"===typeof s){h.callback=null,p=h.priorityLevel;var a=s(h.expirationTime<=n);n=t.unstable_now(),"function"===typeof a?h.callback=a:h===r(c)&&i(c),x(n)}else i(c);h=r(c)}if(null!==h)var l=!0;else{var u=r(d);null!==u&&O(w,u.startTime-n),l=!1}return l}finally{h=null,p=o,f=!1}}"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var k,S=!1,C=null,E=-1,T=5,I=-1;function j(){return!(t.unstable_now()-I<T)}function P(){if(null!==C){var e=t.unstable_now();I=e;var n=!0;try{n=C(!0,e)}finally{n?k():(S=!1,C=null)}}else S=!1}if("function"===typeof v)k=function(){v(P)};else if("undefined"!==typeof MessageChannel){var A=new MessageChannel,N=A.port2;A.port1.onmessage=P,k=function(){N.postMessage(null)}}else k=function(){y(P,0)};function R(e){C=e,S||(S=!0,k())}function O(e,n){E=y((function(){e(t.unstable_now())}),n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){g||f||(g=!0,R(_))},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_getFirstCallbackNode=function(){return r(c)},t.unstable_next=function(e){switch(p){case 1:case 2:case 3:var t=3;break;default:t=p}var n=p;p=t;try{return e()}finally{p=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=p;p=e;try{return t()}finally{p=n}},t.unstable_scheduleCallback=function(e,i,o){var s=t.unstable_now();switch("object"===typeof o&&null!==o?o="number"===typeof(o=o.delay)&&0<o?s+o:s:o=s,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return e={id:u++,callback:i,priorityLevel:e,startTime:o,expirationTime:a=o+a,sortIndex:-1},o>s?(e.sortIndex=o,n(d,e),null===r(c)&&e===r(d)&&(m?(b(E),E=-1):m=!0,O(w,o-s))):(e.sortIndex=a,n(c,e),g||f||(g=!0,R(_))),e},t.unstable_shouldYield=j,t.unstable_wrapCallback=function(e){var t=p;return function(){var n=p;p=t;try{return e.apply(this,arguments)}finally{p=n}}}},241:(e,t,n)=>{"use strict";n.d(t,{Ie:()=>x,U2:()=>v,u0:()=>b});var r=n(800),i=n(873),o=n(122),s=n(18),a=n(116);const l="sl_session_id",c="sl_session_last_active",d=18e5,u=3e4;function h(){try{if("undefined"!==typeof crypto&&crypto.randomUUID)return crypto.randomUUID()}catch(n){}const e=new Array(16);for(let r=0;r<16;r++)e[r]=Math.floor(256*Math.random());e[6]=15&e[6]|64,e[8]=63&e[8]|128;const t=e.map((e=>e.toString(16).padStart(2,"0")));return t.slice(0,4).join("")+"-"+t.slice(4,6).join("")+"-"+t.slice(6,8).join("")+"-"+t.slice(8,10).join("")+"-"+t.slice(10,16).join("")}let p=null,f=0;function g(e,t){try{sessionStorage.setItem(l,e),sessionStorage.setItem(c,String(t))}catch(n){}}function m(){const{id:e,lastActive:t}=function(){try{return{id:sessionStorage.getItem(l),lastActive:parseInt(sessionStorage.getItem(c)||"0",10)||0}}catch(e){return{id:null,lastActive:0}}}();return e&&t&&Date.now()-t<d?{id:e,isNew:!1}:{id:h(),isNew:!0}}function y(){try{const{id:t,isNew:n}=m();if(p=t,g(t,Date.now()),!n)return;const i=(0,s.I)(),l=o.j2&&o.j2.currentUser&&o.j2.currentUser.uid||null,c="undefined"!==typeof window?window.location.pathname:"",d="undefined"!==typeof document&&document.referrer||"",u="undefined"!==typeof navigator?navigator.userAgent.slice(0,300):"",h={id:t,startedAt:(0,r.O5)(),lastActiveAt:(0,r.O5)(),deviceId:i,uid:l,path:c,referrer:d,ua:u,version:a.hl,buildNum:a.IN,buildSha:a.ud,pageViews:0,eventCount:0};(0,r.yo)((0,r.ref)(o.OO,`sessions/${t}`),h).catch((()=>{}));try{(0,r.yX)((0,r.ref)(o.OO,`sessions/${t}/endedAt`)).set((0,r.O5)())}catch(e){}}catch(e){}}function b(){return p||y(),p}function v(){try{p||y();const e=p;if(!e)return;const t=Date.now();if(g(e,t),t-f<u)return;f=t,(0,r.c4)((0,r.ref)(o.OO,`sessions/${e}/eventCount`),(e=>(e||0)+1)).catch((()=>{})),(0,r.yo)((0,r.ref)(o.OO,`sessions/${e}`),{lastActiveAt:(0,r.O5)()}).catch((()=>{}))}catch(e){}}function x(){try{p||y();const e=p;if(!e)return;(0,r.c4)((0,r.ref)(o.OO,`sessions/${e}/pageViews`),(e=>(e||0)+1)).catch((()=>{}))}catch(e){}}function w(){try{if(!p)return;const t=`sessions/${p}`,n={endedAt:Date.now()};if("undefined"!==typeof navigator&&navigator.sendBeacon)try{const e=o.OO&&o.OO.app&&o.OO.app.options&&o.OO.app.options.databaseURL||"";if(e){const r=`${e.replace(/\/$/,"")}/${t}.json`,i=new Blob([JSON.stringify(n)],{type:"application/json"});navigator.sendBeacon(r,i)}}catch(e){}(0,r.yo)((0,r.ref)(o.OO,t),{endedAt:(0,r.O5)()}).catch((()=>{}))}catch(e){}}try{y(),"undefined"!==typeof window&&"undefined"!==typeof document&&(document.addEventListener("visibilitychange",(()=>{try{if(!p)return;const e=p;g(e,Date.now()),"hidden"===document.visibilityState?(0,r.yo)((0,r.ref)(o.OO,`sessions/${e}`),{lastActiveAt:(0,r.O5)(),hiddenAt:(0,r.O5)()}).catch((()=>{})):(0,r.yo)((0,r.ref)(o.OO,`sessions/${e}`),{lastActiveAt:(0,r.O5)()}).catch((()=>{}))}catch(e){}})),window.addEventListener("pagehide",w),window.addEventListener("beforeunload",w)),function(){try{(0,i.hg)(o.j2,(e=>{try{if(!p)return;const t=e?e.uid:null;(0,r.yo)((0,r.ref)(o.OO,`sessions/${p}`),{uid:t}).catch((()=>{}))}catch(t){}}))}catch(e){}}()}catch(_){}},324:e=>{e.exports=function(e,t,n,r){var i=n?n.call(r,e,t):void 0;if(void 0!==i)return!!i;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var o=Object.keys(e),s=Object.keys(t);if(o.length!==s.length)return!1;for(var a=Object.prototype.hasOwnProperty.bind(t),l=0;l<o.length;l++){var c=o[l];if(!a(c))return!1;var d=e[c],u=t[c];if(!1===(i=n?n.call(r,d,u,c):void 0)||void 0===i&&d!==u)return!1}return!0}},334:()=>{const e="sl_chunk_reload_at";function t(){try{const t=parseInt(sessionStorage.getItem(e)||"0",10);if(Date.now()-t<3e4)return;sessionStorage.setItem(e,String(Date.now()))}catch(t){}try{const e=new URL(window.location.href);return e.searchParams.set("_v",String(Date.now())),void window.location.replace(e.toString())}catch(t){}window.location.reload()}function n(e){if(!e)return!1;const t=String(e);return/Loading chunk [\w-]+ failed/i.test(t)||/Loading CSS chunk [\w-]+ failed/i.test(t)||/ChunkLoadError/i.test(t)}"undefined"!==typeof window&&(window.addEventListener("error",(e=>{n(e&&(e.message||e.error&&e.error.message))&&t()})),window.addEventListener("unhandledrejection",(e=>{const r=e&&e.reason;n(r&&(r.message||String(r)))&&t()})));let r=null;async function i(){if("undefined"===typeof document)return;if("visible"!==document.visibilityState)return;const e=await async function(){try{const e=`/asset-manifest.json?ts=${Date.now()}`,t=await fetch(e,{cache:"no-store"});if(!t.ok)return null;const n=await t.json();return n.files&&(n.files["main.js"]||n.files["main.css"])||null}catch(e){return null}}();if(e)if(r){if(e!==r)try{window.dispatchEvent(new CustomEvent("freshness:update-available",{detail:{from:r,to:e}}))}catch(t){}}else r=e}"undefined"!==typeof window&&(setTimeout((()=>{i()}),2e3),window.addEventListener("focus",i),document.addEventListener("visibilitychange",i),setInterval(i,3e5))},391:(e,t,n)=>{"use strict";var r=n(950);t.createRoot=r.createRoot,t.hydrateRoot=r.hydrateRoot},508:(e,t,n)=>{"use strict";n.d(t,{dG:()=>ze,gf:()=>Ue,TT:()=>Me,xD:()=>$e});var r=n(150),i=n(606),o=n(776),s=n(799);const a="@firebase/installations",l="0.6.21",c=1e4,d=`w:${l}`,u="FIS_v2",h=36e5,p={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},f=new o.FA("installations","Installations",p);function g(e){return e instanceof o.g&&e.code.includes("request-failed")}function m(e){let{projectId:t}=e;return`https://firebaseinstallations.googleapis.com/v1/projects/${t}/installations`}function y(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function b(e,t){const n=(await t.json()).error;return f.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function v(e){let{apiKey:t}=e;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function x(e,t){let{refreshToken:n}=t;const r=v(e);return r.append("Authorization",function(e){return`${u} ${e}`}(n)),r}async function w(e){const t=await e();return t.status>=500&&t.status<600?e():t}function _(e){return new Promise((t=>{setTimeout(t,e)}))}const k=/^[cdef][\w-]{21}$/;function S(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}(e);return k.test(t)?t:""}catch{return""}}function C(e){return`${e.appName}!${e.appId}`}const E=new Map;function T(e,t){const n=C(e);I(n,t),function(e,t){const n=P();n&&n.postMessage({key:e,fid:t});A()}(n,t)}function I(e,t){const n=E.get(e);if(n)for(const r of n)r(t)}let j=null;function P(){return!j&&"BroadcastChannel"in self&&(j=new BroadcastChannel("[Firebase] FID Change"),j.onmessage=e=>{I(e.data.key,e.data.fid)}),j}function A(){0===E.size&&j&&(j.close(),j=null)}const N="firebase-installations-store";let R=null;function O(){return R||(R=(0,s.P2)("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(N)}})),R}async function D(e,t){const n=C(e),r=(await O()).transaction(N,"readwrite"),i=r.objectStore(N),o=await i.get(n);return await i.put(t,n),await r.done,o&&o.fid===t.fid||T(e,t.fid),t}async function L(e){const t=C(e),n=(await O()).transaction(N,"readwrite");await n.objectStore(N).delete(t),await n.done}async function F(e,t){const n=C(e),r=(await O()).transaction(N,"readwrite"),i=r.objectStore(N),o=await i.get(n),s=t(o);return void 0===s?await i.delete(n):await i.put(s,n),await r.done,!s||o&&o.fid===s.fid||T(e,s.fid),s}async function M(e){let t;const n=await F(e.appConfig,(n=>{const r=function(e){const t=e||{fid:S(),registrationStatus:0};return $(t)}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(f.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function(e,t){let{appConfig:n,heartbeatServiceProvider:r}=e,{fid:i}=t;const o=m(n),s=v(n),a=r.getImmediate({optional:!0});if(a){const e=await a.getHeartbeatsHeader();e&&s.append("x-firebase-client",e)}const l={fid:i,authVersion:u,appId:n.appId,sdkVersion:d},c={method:"POST",headers:s,body:JSON.stringify(l)},h=await w((()=>fetch(o,c)));if(h.ok){const e=await h.json();return{fid:e.fid||i,registrationStatus:2,refreshToken:e.refreshToken,authToken:y(e.authToken)}}throw await b("Create Installation",h)}(e,t);return D(e.appConfig,n)}catch(n){throw g(n)&&409===n.customData.serverCode?await L(e.appConfig):await D(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:z(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function z(e){let t=await U(e.appConfig);for(;1===t.registrationStatus;)await _(100),t=await U(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await M(e);return n||t}return t}function U(e){return F(e,(e=>{if(!e)throw f.create("installation-not-found");return $(e)}))}function $(e){return 1===(t=e).registrationStatus&&t.registrationTime+c<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t}async function B(e,t){let{appConfig:n,heartbeatServiceProvider:r}=e;const i=function(e,t){let{fid:n}=t;return`${m(e)}/${n}/authTokens:generate`}(n,t),o=x(n,t),s=r.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&o.append("x-firebase-client",e)}const a={installation:{sdkVersion:d,appId:n.appId}},l={method:"POST",headers:o,body:JSON.stringify(a)},c=await w((()=>fetch(i,l)));if(c.ok){return y(await c.json())}throw await b("Generate Auth Token",c)}async function W(e){let t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const r=await F(e.appConfig,(r=>{if(!V(r))throw f.create("not-registered");const i=r.authToken;if(!n&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+h}(e)}(i))return r;if(1===i.requestStatus)return t=async function(e,t){let n=await H(e.appConfig);for(;1===n.authToken.requestStatus;)await _(100),n=await H(e.appConfig);const r=n.authToken;return 0===r.requestStatus?W(e,t):r}(e,n),r;{if(!navigator.onLine)throw f.create("app-offline");const n=function(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}(r);return t=async function(e,t){try{const n=await B(e,t),r={...t,authToken:n};return await D(e.appConfig,r),n}catch(n){if(!g(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...t,authToken:{requestStatus:0}};await D(e.appConfig,n)}else await L(e.appConfig);throw n}}(e,n),n}}));return t?await t:r.authToken}function H(e){return F(e,(e=>{if(!V(e))throw f.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+c<Date.now()?{...e,authToken:{requestStatus:0}}:e;var n}))}function V(e){return void 0!==e&&2===e.registrationStatus}async function q(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=e;await async function(e){const{registrationPromise:t}=await M(e);t&&await t}(n);return(await W(n,t)).token}function K(e){return f.create("missing-app-config-values",{valueName:e})}const Y="installations",G=e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw K("App Configuration");if(!e.name)throw K("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw K(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:(0,r.j6)(t,"heartbeat"),_delete:()=>Promise.resolve()}},Z=e=>{const t=e.getProvider("app").getImmediate(),n=(0,r.j6)(t,Y).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:r}=await M(t);return r?r.catch(console.error):W(t).catch(console.error),n.fid}(n),getToken:e=>q(n,e)}};(0,r.om)(new i.uA(Y,G,"PUBLIC")),(0,r.om)(new i.uA("installations-internal",Z,"PRIVATE")),(0,r.KO)(a,l),(0,r.KO)(a,l,"esm2020");const Q="/firebase-messaging-sw.js",J="/firebase-cloud-messaging-push-scope",X="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",ee="https://fcmregistrations.googleapis.com/v1",te="google.c.a.c_id",ne=1e4;var re,ie;function oe(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function se(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length);for(let i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(re||(re={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(ie||(ie={}));const ae="fcm_token_details_db",le=5,ce="fcm_token_object_Store";const de="firebase-messaging-database",ue=1,he="firebase-messaging-store";let pe=null;function fe(){return pe||(pe=(0,s.P2)(de,ue,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(he)}})),pe}async function ge(e){const t=ye(e),n=await fe(),r=await n.transaction(he).objectStore(he).get(t);if(r)return r;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map((e=>e.name));if(!e.includes(ae))return null}let t=null;return(await(0,s.P2)(ae,le,{upgrade:async(n,r,i,o)=>{if(r<2)return;if(!n.objectStoreNames.contains(ce))return;const s=o.objectStore(ce),a=await s.index("fcmSenderId").get(e);if(await s.clear(),a)if(2===r){const e=a;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:e.createTime??Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"===typeof e.vapidKey?e.vapidKey:oe(e.vapidKey)}}}else if(3===r){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:oe(e.auth),p256dh:oe(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:oe(e.vapidKey)}}}else if(4===r){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:oe(e.auth),p256dh:oe(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:oe(e.vapidKey)}}}}})).close(),await(0,s.MR)(ae),await(0,s.MR)("fcm_vapid_details_db"),await(0,s.MR)("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"===typeof e.createTime&&e.createTime>0&&"string"===typeof e.token&&e.token.length>0&&"string"===typeof t.auth&&t.auth.length>0&&"string"===typeof t.p256dh&&t.p256dh.length>0&&"string"===typeof t.endpoint&&t.endpoint.length>0&&"string"===typeof t.swScope&&t.swScope.length>0&&"string"===typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await me(e,t),t}}async function me(e,t){const n=ye(e),r=(await fe()).transaction(he,"readwrite");return await r.objectStore(he).put(t,n),await r.done,t}function ye(e){let{appConfig:t}=e;return t.appId}const be={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},ve=new o.FA("messaging","Messaging",be);async function xe(e,t){const n={method:"DELETE",headers:await _e(e)};try{const r=await fetch(`${we(e.appConfig)}/${t}`,n),i=await r.json();if(i.error){const e=i.error.message;throw ve.create("token-unsubscribe-failed",{errorInfo:e})}}catch(r){throw ve.create("token-unsubscribe-failed",{errorInfo:r?.toString()})}}function we(e){let{projectId:t}=e;return`${ee}/projects/${t}/registrations`}async function _e(e){let{appConfig:t,installations:n}=e;const r=await n.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${r}`})}function ke(e){let{p256dh:t,auth:n,endpoint:r,vapidKey:i}=e;const o={web:{endpoint:r,auth:n,p256dh:t}};return i!==X&&(o.web.applicationPubKey=i),o}const Se=6048e5;async function Ce(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:se(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:oe(t.getKey("auth")),p256dh:oe(t.getKey("p256dh"))},r=await ge(e.firebaseDependencies);if(r){if(function(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&i&&o}(r.subscriptionOptions,n))return Date.now()>=r.createTime+Se?async function(e,t){try{const n=await async function(e,t){const n=await _e(e),r=ke(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let o;try{const n=await fetch(`${we(e.appConfig)}/${t.token}`,i);o=await n.json()}catch(s){throw ve.create("token-update-failed",{errorInfo:s?.toString()})}if(o.error){const e=o.error.message;throw ve.create("token-update-failed",{errorInfo:e})}if(!o.token)throw ve.create("token-update-no-token");return o.token}(e.firebaseDependencies,t),r={...t,token:n,createTime:Date.now()};return await me(e.firebaseDependencies,r),n}catch(n){throw n}}(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await xe(e.firebaseDependencies,r.token)}catch(i){console.warn(i)}return Ee(e.firebaseDependencies,n)}return Ee(e.firebaseDependencies,n)}async function Ee(e,t){const n=await async function(e,t){const n=await _e(e),r=ke(t),i={method:"POST",headers:n,body:JSON.stringify(r)};let o;try{const t=await fetch(we(e.appConfig),i);o=await t.json()}catch(s){throw ve.create("token-subscribe-failed",{errorInfo:s?.toString()})}if(o.error){const e=o.error.message;throw ve.create("token-subscribe-failed",{errorInfo:e})}if(!o.token)throw ve.create("token-subscribe-no-token");return o.token}(e,t),r={token:n,createTime:Date.now(),subscriptionOptions:t};return await me(e,r),r.token}function Te(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const o=t.notification.icon;o&&(e.notification.icon=o)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){if(!t.fcmOptions&&!t.notification?.click_action)return;e.fcmOptions={};const n=t.fcmOptions?.link??t.notification?.click_action;n&&(e.fcmOptions.link=n);const r=t.fcmOptions?.analytics_label;r&&(e.fcmOptions.analyticsLabel=r)}(t,e),t}function Ie(e){return ve.create("missing-app-config-values",{valueName:e})}!function(e,t){const n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));n.join("")}("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class je{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const r=function(e){if(!e||!e.options)throw Ie("App Configuration Object");if(!e.name)throw Ie("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const r of t)if(!n[r])throw Ie(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}async function Pe(e){try{e.swRegistration=await navigator.serviceWorker.register(Q,{scope:J}),e.swRegistration.update().catch((()=>{})),await async function(e){return new Promise(((t,n)=>{const r=setTimeout((()=>n(new Error(`Service worker not registered after ${ne} ms`))),ne),i=e.installing||e.waiting;e.active?(clearTimeout(r),t()):i?i.onstatechange=e=>{"activated"===e.target?.state&&(i.onstatechange=null,clearTimeout(r),t())}:(clearTimeout(r),n(new Error("No incoming service worker found.")))}))}(e.swRegistration)}catch(t){throw ve.create("failed-service-worker-registration",{browserErrorMessage:t?.message})}}async function Ae(e,t){if(!navigator)throw ve.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw ve.create("permission-blocked");return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=X)}(e,t?.vapidKey),await async function(e,t){if(t||e.swRegistration||await Pe(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw ve.create("invalid-sw-registration");e.swRegistration=t}}(e,t?.serviceWorkerRegistration),Ce(e)}async function Ne(e,t,n){const r=function(e){switch(e){case ie.NOTIFICATION_CLICKED:return"notification_open";case ie.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[te],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}async function Re(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===ie.PUSH_RECEIVED&&("function"===typeof e.onMessageHandler?e.onMessageHandler(Te(n)):e.onMessageHandler.next(Te(n)));const r=n.data;var i;"object"===typeof(i=r)&&i&&te in i&&"1"===r["google.c.a.e"]&&await Ne(e,n.messageType,r)}const Oe="@firebase/messaging",De="0.12.25",Le=e=>{const t=new je(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",(e=>Re(t,e))),t},Fe=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>Ae(t,e)}};async function Me(){try{await(0,o.eX)()}catch(e){return!1}return"undefined"!==typeof window&&(0,o.zW)()&&(0,o.dM)()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function ze(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Sx)();return Me().then((e=>{if(!e)throw ve.create("unsupported-browser")}),(e=>{throw ve.create("indexed-db-unsupported")})),(0,r.j6)((0,o.Ku)(e),"messaging").getImmediate()}async function Ue(e,t){return Ae(e=(0,o.Ku)(e),t)}function $e(e,t){return function(e,t){if(!navigator)throw ve.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}(e=(0,o.Ku)(e),t)}(0,r.om)(new i.uA("messaging",Le,"PUBLIC")),(0,r.om)(new i.uA("messaging-internal",Fe,"PRIVATE")),(0,r.KO)(Oe,De),(0,r.KO)(Oe,De,"esm2020")},579:(e,t,n)=>{"use strict";e.exports=n(153)},606:(e,t,n)=>{"use strict";n.d(t,{h1:()=>a,uA:()=>i});var r=n(776);class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const o="[DEFAULT]";class s{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new r.cY;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(n)return null;throw r}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}(e))try{this.getOrInitializeService({instanceIdentifier:o})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;return this.instances.has(e)}getOptions(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;return this.instancesOptions.get(e)||{}}initialize(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(i)&&o.resolve(r)}return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService(e){let{instanceIdentifier:t,options:n={}}=e,r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:(i=t,i===o?void 0:i),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}var i;return r||null}normalizeInstanceIdentifier(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;return this.component?this.component.multipleInstances?e:o:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class a{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new s(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},684:()=>{!function(){if("undefined"!==typeof window&&"undefined"!==typeof URL)try{const t=new URLSearchParams(window.location.search),n=t.get("n");if(!n)return;let r=null;try{r=localStorage.getItem("sl_notif_token_hash")}catch(e){}const i=new URL("https://logopen-57u2xumnxa-uc.a.run.app");i.searchParams.set("notifId",n),r&&i.searchParams.set("tokenHash",r);const o=i.toString();let s=!1;try{navigator&&"function"===typeof navigator.sendBeacon&&(s=navigator.sendBeacon(o))}catch(e){}s||fetch(o,{method:"GET",keepalive:!0}).catch((()=>{}));const a=t.get("to");if(a)try{const e=new URL(a,window.location.origin);if("http:"===e.protocol||"https:"===e.protocol)return void window.location.replace(e.toString())}catch(e){}t.delete("n"),t.delete("to");const l=window.location.pathname+(t.toString()?"?"+t.toString():"")+window.location.hash;try{window.history.replaceState({},"",l)}catch(e){}}catch(e){}}()},730:(e,t,n)=>{"use strict";var r=n(43),i=n(853);function o(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,a={};function l(e,t){c(e,t),c(e+"Capture",t)}function c(e,t){for(a[e]=t,e=0;e<t.length;e++)s.add(t[e])}var d=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),u=Object.prototype.hasOwnProperty,h=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p={},f={};function g(e,t,n,r,i,o,s){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var m={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){m[e]=new g(e,0,!1,e,null,!1,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];m[t]=new g(t,1,!1,e[1],null,!1,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){m[e]=new g(e,2,!1,e.toLowerCase(),null,!1,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){m[e]=new g(e,2,!1,e,null,!1,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){m[e]=new g(e,3,!1,e.toLowerCase(),null,!1,!1)})),["checked","multiple","muted","selected"].forEach((function(e){m[e]=new g(e,3,!0,e,null,!1,!1)})),["capture","download"].forEach((function(e){m[e]=new g(e,4,!1,e,null,!1,!1)})),["cols","rows","size","span"].forEach((function(e){m[e]=new g(e,6,!1,e,null,!1,!1)})),["rowSpan","start"].forEach((function(e){m[e]=new g(e,5,!1,e.toLowerCase(),null,!1,!1)}));var y=/[\-:]([a-z])/g;function b(e){return e[1].toUpperCase()}function v(e,t,n,r){var i=m.hasOwnProperty(t)?m[t]:null;(null!==i?0!==i.type:r||!(2<t.length)||"o"!==t[0]&&"O"!==t[0]||"n"!==t[1]&&"N"!==t[1])&&(function(e,t,n,r){if(null===t||"undefined"===typeof t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,i,r)&&(n=null),r||null===i?function(e){return!!u.call(f,e)||!u.call(p,e)&&(h.test(e)?f[e]=!0:(p[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=null===n?3!==i.type&&"":n:(t=i.attributeName,r=i.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(i=i.type)||4===i&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(y,b);m[t]=new g(t,1,!1,e,null,!1,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(y,b);m[t]=new g(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(y,b);m[t]=new g(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)})),["tabIndex","crossOrigin"].forEach((function(e){m[e]=new g(e,1,!1,e.toLowerCase(),null,!1,!1)})),m.xlinkHref=new g("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach((function(e){m[e]=new g(e,1,!1,e.toLowerCase(),null,!0,!0)}));var x=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,w=Symbol.for("react.element"),_=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),E=Symbol.for("react.provider"),T=Symbol.for("react.context"),I=Symbol.for("react.forward_ref"),j=Symbol.for("react.suspense"),P=Symbol.for("react.suspense_list"),A=Symbol.for("react.memo"),N=Symbol.for("react.lazy");Symbol.for("react.scope"),Symbol.for("react.debug_trace_mode");var R=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden"),Symbol.for("react.cache"),Symbol.for("react.tracing_marker");var O=Symbol.iterator;function D(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=O&&e[O]||e["@@iterator"])?e:null}var L,F=Object.assign;function M(e){if(void 0===L)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);L=t&&t[1]||""}return"\n"+L+e}var z=!1;function U(e,t){if(!e||z)return"";z=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&"string"===typeof c.stack){for(var i=c.stack.split("\n"),o=r.stack.split("\n"),s=i.length-1,a=o.length-1;1<=s&&0<=a&&i[s]!==o[a];)a--;for(;1<=s&&0<=a;s--,a--)if(i[s]!==o[a]){if(1!==s||1!==a)do{if(s--,0>--a||i[s]!==o[a]){var l="\n"+i[s].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}}while(1<=s&&0<=a);break}}}finally{z=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?M(e):""}function $(e){switch(e.tag){case 5:return M(e.type);case 16:return M("Lazy");case 13:return M("Suspense");case 19:return M("SuspenseList");case 0:case 2:case 15:return e=U(e.type,!1);case 11:return e=U(e.type.render,!1);case 1:return e=U(e.type,!0);default:return""}}function B(e){if(null==e)return null;if("function"===typeof e)return e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case k:return"Fragment";case _:return"Portal";case C:return"Profiler";case S:return"StrictMode";case j:return"Suspense";case P:return"SuspenseList"}if("object"===typeof e)switch(e.$$typeof){case T:return(e.displayName||"Context")+".Consumer";case E:return(e._context.displayName||"Context")+".Provider";case I:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case A:return null!==(t=e.displayName||null)?t:B(e.type)||"Memo";case N:t=e._payload,e=e._init;try{return B(e(t))}catch(n){}}return null}function W(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=(e=t.render).displayName||e.name||"",t.displayName||(""!==e?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return B(t);case 8:return t===S?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof t)return t.displayName||t.name||null;if("string"===typeof t)return t}return null}function H(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function V(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function q(e){e._valueTracker||(e._valueTracker=function(e){var t=V(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function K(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=V(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function Y(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function G(e,t){var n=t.checked;return F({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function Z(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=H(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function Q(e,t){null!=(t=t.checked)&&v(e,"checked",t,!1)}function J(e,t){Q(e,t);var n=H(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ee(e,t.type,n):t.hasOwnProperty("defaultValue")&&ee(e,t.type,H(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function X(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ee(e,t,n){"number"===t&&Y(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var te=Array.isArray;function ne(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+H(n),t=null,i=0;i<e.length;i++){if(e[i].value===n)return e[i].selected=!0,void(r&&(e[i].defaultSelected=!0));null!==t||e[i].disabled||(t=e[i])}null!==t&&(t.selected=!0)}}function re(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(o(91));return F({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ie(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(o(92));if(te(n)){if(1<n.length)throw Error(o(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:H(n)}}function oe(e,t){var n=H(t.value),r=H(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function se(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}function ae(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function le(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?ae(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var ce,de,ue=(de=function(e,t){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=t;else{for((ce=ce||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ce.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction((function(){return de(e,t)}))}:de);function he(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var pe={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},fe=["Webkit","ms","Moz","O"];function ge(e,t,n){return null==t||"boolean"===typeof t||""===t?"":n||"number"!==typeof t||0===t||pe.hasOwnProperty(e)&&pe[e]?(""+t).trim():t+"px"}function me(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),i=ge(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}Object.keys(pe).forEach((function(e){fe.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),pe[t]=pe[e]}))}));var ye=F({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function be(e,t){if(t){if(ye[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(o(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(o(60));if("object"!==typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(o(61))}if(null!=t.style&&"object"!==typeof t.style)throw Error(o(62))}}function ve(e,t){if(-1===e.indexOf("-"))return"string"===typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xe=null;function we(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var _e=null,ke=null,Se=null;function Ce(e){if(e=vi(e)){if("function"!==typeof _e)throw Error(o(280));var t=e.stateNode;t&&(t=wi(t),_e(e.stateNode,e.type,t))}}function Ee(e){ke?Se?Se.push(e):Se=[e]:ke=e}function Te(){if(ke){var e=ke,t=Se;if(Se=ke=null,Ce(e),t)for(e=0;e<t.length;e++)Ce(t[e])}}function Ie(e,t){return e(t)}function je(){}var Pe=!1;function Ae(e,t,n){if(Pe)return e(t,n);Pe=!0;try{return Ie(e,t,n)}finally{Pe=!1,(null!==ke||null!==Se)&&(je(),Te())}}function Ne(e,t){var n=e.stateNode;if(null===n)return null;var r=wi(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(o(231,t,typeof n));return n}var Re=!1;if(d)try{var Oe={};Object.defineProperty(Oe,"passive",{get:function(){Re=!0}}),window.addEventListener("test",Oe,Oe),window.removeEventListener("test",Oe,Oe)}catch(de){Re=!1}function De(e,t,n,r,i,o,s,a,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(d){this.onError(d)}}var Le=!1,Fe=null,Me=!1,ze=null,Ue={onError:function(e){Le=!0,Fe=e}};function $e(e,t,n,r,i,o,s,a,l){Le=!1,Fe=null,De.apply(Ue,arguments)}function Be(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function We(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function He(e){if(Be(e)!==e)throw Error(o(188))}function Ve(e){return null!==(e=function(e){var t=e.alternate;if(!t){if(null===(t=Be(e)))throw Error(o(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(null===i)break;var s=i.alternate;if(null===s){if(null!==(r=i.return)){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return He(i),e;if(s===r)return He(i),t;s=s.sibling}throw Error(o(188))}if(n.return!==r.return)n=i,r=s;else{for(var a=!1,l=i.child;l;){if(l===n){a=!0,n=i,r=s;break}if(l===r){a=!0,r=i,n=s;break}l=l.sibling}if(!a){for(l=s.child;l;){if(l===n){a=!0,n=s,r=i;break}if(l===r){a=!0,r=s,n=i;break}l=l.sibling}if(!a)throw Error(o(189))}}if(n.alternate!==r)throw Error(o(190))}if(3!==n.tag)throw Error(o(188));return n.stateNode.current===n?e:t}(e))?qe(e):null}function qe(e){if(5===e.tag||6===e.tag)return e;for(e=e.child;null!==e;){var t=qe(e);if(null!==t)return t;e=e.sibling}return null}var Ke=i.unstable_scheduleCallback,Ye=i.unstable_cancelCallback,Ge=i.unstable_shouldYield,Ze=i.unstable_requestPaint,Qe=i.unstable_now,Je=i.unstable_getCurrentPriorityLevel,Xe=i.unstable_ImmediatePriority,et=i.unstable_UserBlockingPriority,tt=i.unstable_NormalPriority,nt=i.unstable_LowPriority,rt=i.unstable_IdlePriority,it=null,ot=null;var st=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(at(e)/lt|0)|0},at=Math.log,lt=Math.LN2;var ct=64,dt=4194304;function ut(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194240&e;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return 130023424&e;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ht(e,t){var n=e.pendingLanes;if(0===n)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,s=268435455&n;if(0!==s){var a=s&~i;0!==a?r=ut(a):0!==(o&=s)&&(r=ut(o))}else 0!==(s=n&~i)?r=ut(s):0!==o&&(r=ut(o));if(0===r)return 0;if(0!==t&&t!==r&&0===(t&i)&&((i=r&-r)>=(o=t&-t)||16===i&&0!==(4194240&o)))return t;if(0!==(4&r)&&(r|=16&n),0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)i=1<<(n=31-st(t)),r|=e[n],t&=~i;return r}function pt(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function ft(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function gt(){var e=ct;return 0===(4194240&(ct<<=1))&&(ct=64),e}function mt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function yt(e,t,n){e.pendingLanes|=t,536870912!==t&&(e.suspendedLanes=0,e.pingedLanes=0),(e=e.eventTimes)[t=31-st(t)]=n}function bt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-st(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var vt=0;function xt(e){return 1<(e&=-e)?4<e?0!==(268435455&e)?16:536870912:4:1}var wt,_t,kt,St,Ct,Et=!1,Tt=[],It=null,jt=null,Pt=null,At=new Map,Nt=new Map,Rt=[],Ot="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Dt(e,t){switch(e){case"focusin":case"focusout":It=null;break;case"dragenter":case"dragleave":jt=null;break;case"mouseover":case"mouseout":Pt=null;break;case"pointerover":case"pointerout":At.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Nt.delete(t.pointerId)}}function Lt(e,t,n,r,i,o){return null===e||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},null!==t&&(null!==(t=vi(t))&&_t(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==i&&-1===t.indexOf(i)&&t.push(i),e)}function Ft(e){var t=bi(e.target);if(null!==t){var n=Be(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=We(n)))return e.blockedOn=t,void Ct(e.priority,(function(){kt(n)}))}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function Mt(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Gt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=vi(n))&&_t(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);xe=r,n.target.dispatchEvent(r),xe=null,t.shift()}return!0}function zt(e,t,n){Mt(e)&&n.delete(t)}function Ut(){Et=!1,null!==It&&Mt(It)&&(It=null),null!==jt&&Mt(jt)&&(jt=null),null!==Pt&&Mt(Pt)&&(Pt=null),At.forEach(zt),Nt.forEach(zt)}function $t(e,t){e.blockedOn===t&&(e.blockedOn=null,Et||(Et=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,Ut)))}function Bt(e){function t(t){return $t(t,e)}if(0<Tt.length){$t(Tt[0],e);for(var n=1;n<Tt.length;n++){var r=Tt[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==It&&$t(It,e),null!==jt&&$t(jt,e),null!==Pt&&$t(Pt,e),At.forEach(t),Nt.forEach(t),n=0;n<Rt.length;n++)(r=Rt[n]).blockedOn===e&&(r.blockedOn=null);for(;0<Rt.length&&null===(n=Rt[0]).blockedOn;)Ft(n),null===n.blockedOn&&Rt.shift()}var Wt=x.ReactCurrentBatchConfig,Ht=!0;function Vt(e,t,n,r){var i=vt,o=Wt.transition;Wt.transition=null;try{vt=1,Kt(e,t,n,r)}finally{vt=i,Wt.transition=o}}function qt(e,t,n,r){var i=vt,o=Wt.transition;Wt.transition=null;try{vt=4,Kt(e,t,n,r)}finally{vt=i,Wt.transition=o}}function Kt(e,t,n,r){if(Ht){var i=Gt(e,t,n,r);if(null===i)Hr(e,t,r,Yt,n),Dt(e,r);else if(function(e,t,n,r,i){switch(t){case"focusin":return It=Lt(It,e,t,n,r,i),!0;case"dragenter":return jt=Lt(jt,e,t,n,r,i),!0;case"mouseover":return Pt=Lt(Pt,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return At.set(o,Lt(At.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,Nt.set(o,Lt(Nt.get(o)||null,e,t,n,r,i)),!0}return!1}(i,e,t,n,r))r.stopPropagation();else if(Dt(e,r),4&t&&-1<Ot.indexOf(e)){for(;null!==i;){var o=vi(i);if(null!==o&&wt(o),null===(o=Gt(e,t,n,r))&&Hr(e,t,r,Yt,n),o===i)break;i=o}null!==i&&r.stopPropagation()}else Hr(e,t,r,null,n)}}var Yt=null;function Gt(e,t,n,r){if(Yt=null,null!==(e=bi(e=we(r))))if(null===(t=Be(e)))e=null;else if(13===(n=t.tag)){if(null!==(e=We(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Yt=e,null}function Zt(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Je()){case Xe:return 1;case et:return 4;case tt:case nt:return 16;case rt:return 536870912;default:return 16}default:return 16}}var Qt=null,Jt=null,Xt=null;function en(){if(Xt)return Xt;var e,t,n=Jt,r=n.length,i="value"in Qt?Qt.value:Qt.textContent,o=i.length;for(e=0;e<r&&n[e]===i[e];e++);var s=r-e;for(t=1;t<=s&&n[r-t]===i[o-t];t++);return Xt=i.slice(e,1<t?1-t:void 0)}function tn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function nn(){return!0}function rn(){return!1}function on(e){function t(t,n,r,i,o){for(var s in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(s)&&(t=e[s],this[s]=t?t(i):i[s]);return this.isDefaultPrevented=(null!=i.defaultPrevented?i.defaultPrevented:!1===i.returnValue)?nn:rn,this.isPropagationStopped=rn,this}return F(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=nn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=nn)},persist:function(){},isPersistent:nn}),t}var sn,an,ln,cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dn=on(cn),un=F({},cn,{view:0,detail:0}),hn=on(un),pn=F({},un,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ln&&(ln&&"mousemove"===e.type?(sn=e.screenX-ln.screenX,an=e.screenY-ln.screenY):an=sn=0,ln=e),sn)},movementY:function(e){return"movementY"in e?e.movementY:an}}),fn=on(pn),gn=on(F({},pn,{dataTransfer:0})),mn=on(F({},un,{relatedTarget:0})),yn=on(F({},cn,{animationName:0,elapsedTime:0,pseudoElement:0})),bn=F({},cn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),vn=on(bn),xn=on(F({},cn,{data:0})),wn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_n={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=kn[e])&&!!t[e]}function Cn(){return Sn}var En=F({},un,{key:function(e){if(e.key){var t=wn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=tn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?_n[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cn,charCode:function(e){return"keypress"===e.type?tn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?tn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),Tn=on(En),In=on(F({},pn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),jn=on(F({},un,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cn})),Pn=on(F({},cn,{propertyName:0,elapsedTime:0,pseudoElement:0})),An=F({},pn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Nn=on(An),Rn=[9,13,27,32],On=d&&"CompositionEvent"in window,Dn=null;d&&"documentMode"in document&&(Dn=document.documentMode);var Ln=d&&"TextEvent"in window&&!Dn,Fn=d&&(!On||Dn&&8<Dn&&11>=Dn),Mn=String.fromCharCode(32),zn=!1;function Un(e,t){switch(e){case"keyup":return-1!==Rn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $n(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Bn=!1;var Wn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Wn[e.type]:"textarea"===t}function Vn(e,t,n,r){Ee(r),0<(t=qr(t,"onChange")).length&&(n=new dn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var qn=null,Kn=null;function Yn(e){Mr(e,0)}function Gn(e){if(K(xi(e)))return e}function Zn(e,t){if("change"===e)return t}var Qn=!1;if(d){var Jn;if(d){var Xn="oninput"in document;if(!Xn){var er=document.createElement("div");er.setAttribute("oninput","return;"),Xn="function"===typeof er.oninput}Jn=Xn}else Jn=!1;Qn=Jn&&(!document.documentMode||9<document.documentMode)}function tr(){qn&&(qn.detachEvent("onpropertychange",nr),Kn=qn=null)}function nr(e){if("value"===e.propertyName&&Gn(Kn)){var t=[];Vn(t,Kn,e,we(e)),Ae(Yn,t)}}function rr(e,t,n){"focusin"===e?(tr(),Kn=n,(qn=t).attachEvent("onpropertychange",nr)):"focusout"===e&&tr()}function ir(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Gn(Kn)}function or(e,t){if("click"===e)return Gn(t)}function sr(e,t){if("input"===e||"change"===e)return Gn(t)}var ar="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function lr(e,t){if(ar(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!u.call(t,i)||!ar(e[i],t[i]))return!1}return!0}function cr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function dr(e,t){var n,r=cr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=cr(r)}}function ur(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?ur(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function hr(){for(var e=window,t=Y();t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=Y((e=t.contentWindow).document)}return t}function pr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}function fr(e){var t=hr(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ur(n.ownerDocument.documentElement,n)){if(null!==r&&pr(n))if(t=r.start,void 0===(e=r.end)&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if((e=(t=n.ownerDocument||document)&&t.defaultView||window).getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=void 0===r.end?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=dr(n,o);var s=dr(n,r);i&&s&&(1!==e.rangeCount||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&((t=t.createRange()).setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}for(t=[],e=n;e=e.parentNode;)1===e.nodeType&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for("function"===typeof n.focus&&n.focus(),n=0;n<t.length;n++)(e=t[n]).element.scrollLeft=e.left,e.element.scrollTop=e.top}}var gr=d&&"documentMode"in document&&11>=document.documentMode,mr=null,yr=null,br=null,vr=!1;function xr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;vr||null==mr||mr!==Y(r)||("selectionStart"in(r=mr)&&pr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},br&&lr(br,r)||(br=r,0<(r=qr(yr,"onSelect")).length&&(t=new dn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=mr)))}function wr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var _r={animationend:wr("Animation","AnimationEnd"),animationiteration:wr("Animation","AnimationIteration"),animationstart:wr("Animation","AnimationStart"),transitionend:wr("Transition","TransitionEnd")},kr={},Sr={};function Cr(e){if(kr[e])return kr[e];if(!_r[e])return e;var t,n=_r[e];for(t in n)if(n.hasOwnProperty(t)&&t in Sr)return kr[e]=n[t];return e}d&&(Sr=document.createElement("div").style,"AnimationEvent"in window||(delete _r.animationend.animation,delete _r.animationiteration.animation,delete _r.animationstart.animation),"TransitionEvent"in window||delete _r.transitionend.transition);var Er=Cr("animationend"),Tr=Cr("animationiteration"),Ir=Cr("animationstart"),jr=Cr("transitionend"),Pr=new Map,Ar="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Nr(e,t){Pr.set(e,t),l(t,[e])}for(var Rr=0;Rr<Ar.length;Rr++){var Or=Ar[Rr];Nr(Or.toLowerCase(),"on"+(Or[0].toUpperCase()+Or.slice(1)))}Nr(Er,"onAnimationEnd"),Nr(Tr,"onAnimationIteration"),Nr(Ir,"onAnimationStart"),Nr("dblclick","onDoubleClick"),Nr("focusin","onFocus"),Nr("focusout","onBlur"),Nr(jr,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Dr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Lr=new Set("cancel close invalid load scroll toggle".split(" ").concat(Dr));function Fr(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,i,s,a,l,c){if($e.apply(this,arguments),Le){if(!Le)throw Error(o(198));var d=Fe;Le=!1,Fe=null,Me||(Me=!0,ze=d)}}(r,t,void 0,e),e.currentTarget=null}function Mr(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var s=r.length-1;0<=s;s--){var a=r[s],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==o&&i.isPropagationStopped())break e;Fr(i,a,c),o=l}else for(s=0;s<r.length;s++){if(l=(a=r[s]).instance,c=a.currentTarget,a=a.listener,l!==o&&i.isPropagationStopped())break e;Fr(i,a,c),o=l}}}if(Me)throw e=ze,Me=!1,ze=null,e}function zr(e,t){var n=t[gi];void 0===n&&(n=t[gi]=new Set);var r=e+"__bubble";n.has(r)||(Wr(t,e,2,!1),n.add(r))}function Ur(e,t,n){var r=0;t&&(r|=4),Wr(n,e,r,t)}var $r="_reactListening"+Math.random().toString(36).slice(2);function Br(e){if(!e[$r]){e[$r]=!0,s.forEach((function(t){"selectionchange"!==t&&(Lr.has(t)||Ur(t,!1,e),Ur(t,!0,e))}));var t=9===e.nodeType?e:e.ownerDocument;null===t||t[$r]||(t[$r]=!0,Ur("selectionchange",!1,t))}}function Wr(e,t,n,r){switch(Zt(t)){case 1:var i=Vt;break;case 4:i=qt;break;default:i=Kt}n=i.bind(null,t,n,e),i=void 0,!Re||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(i=!0),r?void 0!==i?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):void 0!==i?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Hr(e,t,n,r,i){var o=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var s=r.tag;if(3===s||4===s){var a=r.stateNode.containerInfo;if(a===i||8===a.nodeType&&a.parentNode===i)break;if(4===s)for(s=r.return;null!==s;){var l=s.tag;if((3===l||4===l)&&((l=s.stateNode.containerInfo)===i||8===l.nodeType&&l.parentNode===i))return;s=s.return}for(;null!==a;){if(null===(s=bi(a)))return;if(5===(l=s.tag)||6===l){r=o=s;continue e}a=a.parentNode}}r=r.return}Ae((function(){var r=o,i=we(n),s=[];e:{var a=Pr.get(e);if(void 0!==a){var l=dn,c=e;switch(e){case"keypress":if(0===tn(n))break e;case"keydown":case"keyup":l=Tn;break;case"focusin":c="focus",l=mn;break;case"focusout":c="blur",l=mn;break;case"beforeblur":case"afterblur":l=mn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":l=fn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":l=gn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":l=jn;break;case Er:case Tr:case Ir:l=yn;break;case jr:l=Pn;break;case"scroll":l=hn;break;case"wheel":l=Nn;break;case"copy":case"cut":case"paste":l=vn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":l=In}var d=0!==(4&t),u=!d&&"scroll"===e,h=d?null!==a?a+"Capture":null:a;d=[];for(var p,f=r;null!==f;){var g=(p=f).stateNode;if(5===p.tag&&null!==g&&(p=g,null!==h&&(null!=(g=Ne(f,h))&&d.push(Vr(f,g,p)))),u)break;f=f.return}0<d.length&&(a=new l(a,c,null,n,i),s.push({event:a,listeners:d}))}}if(0===(7&t)){if(l="mouseout"===e||"pointerout"===e,(!(a="mouseover"===e||"pointerover"===e)||n===xe||!(c=n.relatedTarget||n.fromElement)||!bi(c)&&!c[fi])&&(l||a)&&(a=i.window===i?i:(a=i.ownerDocument)?a.defaultView||a.parentWindow:window,l?(l=r,null!==(c=(c=n.relatedTarget||n.toElement)?bi(c):null)&&(c!==(u=Be(c))||5!==c.tag&&6!==c.tag)&&(c=null)):(l=null,c=r),l!==c)){if(d=fn,g="onMouseLeave",h="onMouseEnter",f="mouse","pointerout"!==e&&"pointerover"!==e||(d=In,g="onPointerLeave",h="onPointerEnter",f="pointer"),u=null==l?a:xi(l),p=null==c?a:xi(c),(a=new d(g,f+"leave",l,n,i)).target=u,a.relatedTarget=p,g=null,bi(i)===r&&((d=new d(h,f+"enter",c,n,i)).target=p,d.relatedTarget=u,g=d),u=g,l&&c)e:{for(h=c,f=0,p=d=l;p;p=Kr(p))f++;for(p=0,g=h;g;g=Kr(g))p++;for(;0<f-p;)d=Kr(d),f--;for(;0<p-f;)h=Kr(h),p--;for(;f--;){if(d===h||null!==h&&d===h.alternate)break e;d=Kr(d),h=Kr(h)}d=null}else d=null;null!==l&&Yr(s,a,l,d,!1),null!==c&&null!==u&&Yr(s,u,c,d,!0)}if("select"===(l=(a=r?xi(r):window).nodeName&&a.nodeName.toLowerCase())||"input"===l&&"file"===a.type)var m=Zn;else if(Hn(a))if(Qn)m=sr;else{m=ir;var y=rr}else(l=a.nodeName)&&"input"===l.toLowerCase()&&("checkbox"===a.type||"radio"===a.type)&&(m=or);switch(m&&(m=m(e,r))?Vn(s,m,n,i):(y&&y(e,a,r),"focusout"===e&&(y=a._wrapperState)&&y.controlled&&"number"===a.type&&ee(a,"number",a.value)),y=r?xi(r):window,e){case"focusin":(Hn(y)||"true"===y.contentEditable)&&(mr=y,yr=r,br=null);break;case"focusout":br=yr=mr=null;break;case"mousedown":vr=!0;break;case"contextmenu":case"mouseup":case"dragend":vr=!1,xr(s,n,i);break;case"selectionchange":if(gr)break;case"keydown":case"keyup":xr(s,n,i)}var b;if(On)e:{switch(e){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else Bn?Un(e,n)&&(v="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(v="onCompositionStart");v&&(Fn&&"ko"!==n.locale&&(Bn||"onCompositionStart"!==v?"onCompositionEnd"===v&&Bn&&(b=en()):(Jt="value"in(Qt=i)?Qt.value:Qt.textContent,Bn=!0)),0<(y=qr(r,v)).length&&(v=new xn(v,e,null,n,i),s.push({event:v,listeners:y}),b?v.data=b:null!==(b=$n(n))&&(v.data=b))),(b=Ln?function(e,t){switch(e){case"compositionend":return $n(t);case"keypress":return 32!==t.which?null:(zn=!0,Mn);case"textInput":return(e=t.data)===Mn&&zn?null:e;default:return null}}(e,n):function(e,t){if(Bn)return"compositionend"===e||!On&&Un(e,t)?(e=en(),Xt=Jt=Qt=null,Bn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Fn&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(r=qr(r,"onBeforeInput")).length&&(i=new xn("onBeforeInput","beforeinput",null,n,i),s.push({event:i,listeners:r}),i.data=b))}Mr(s,t)}))}function Vr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function qr(e,t){for(var n=t+"Capture",r=[];null!==e;){var i=e,o=i.stateNode;5===i.tag&&null!==o&&(i=o,null!=(o=Ne(e,n))&&r.unshift(Vr(e,o,i)),null!=(o=Ne(e,t))&&r.push(Vr(e,o,i))),e=e.return}return r}function Kr(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function Yr(e,t,n,r,i){for(var o=t._reactName,s=[];null!==n&&n!==r;){var a=n,l=a.alternate,c=a.stateNode;if(null!==l&&l===r)break;5===a.tag&&null!==c&&(a=c,i?null!=(l=Ne(n,o))&&s.unshift(Vr(n,l,a)):i||null!=(l=Ne(n,o))&&s.push(Vr(n,l,a))),n=n.return}0!==s.length&&e.push({event:t,listeners:s})}var Gr=/\r\n?/g,Zr=/\u0000|\uFFFD/g;function Qr(e){return("string"===typeof e?e:""+e).replace(Gr,"\n").replace(Zr,"")}function Jr(e,t,n){if(t=Qr(t),Qr(e)!==t&&n)throw Error(o(425))}function Xr(){}var ei=null,ti=null;function ni(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var ri="function"===typeof setTimeout?setTimeout:void 0,ii="function"===typeof clearTimeout?clearTimeout:void 0,oi="function"===typeof Promise?Promise:void 0,si="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof oi?function(e){return oi.resolve(null).then(e).catch(ai)}:ri;function ai(e){setTimeout((function(){throw e}))}function li(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&8===i.nodeType)if("/$"===(n=i.data)){if(0===r)return e.removeChild(i),void Bt(t);r--}else"$"!==n&&"$?"!==n&&"$!"!==n||r++;n=i}while(n);Bt(t)}function ci(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t)break;if("/$"===t)return null}}return e}function di(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var ui=Math.random().toString(36).slice(2),hi="__reactFiber$"+ui,pi="__reactProps$"+ui,fi="__reactContainer$"+ui,gi="__reactEvents$"+ui,mi="__reactListeners$"+ui,yi="__reactHandles$"+ui;function bi(e){var t=e[hi];if(t)return t;for(var n=e.parentNode;n;){if(t=n[fi]||n[hi]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=di(e);null!==e;){if(n=e[hi])return n;e=di(e)}return t}n=(e=n).parentNode}return null}function vi(e){return!(e=e[hi]||e[fi])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function xi(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(o(33))}function wi(e){return e[pi]||null}var _i=[],ki=-1;function Si(e){return{current:e}}function Ci(e){0>ki||(e.current=_i[ki],_i[ki]=null,ki--)}function Ei(e,t){ki++,_i[ki]=e.current,e.current=t}var Ti={},Ii=Si(Ti),ji=Si(!1),Pi=Ti;function Ai(e,t){var n=e.type.contextTypes;if(!n)return Ti;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i,o={};for(i in n)o[i]=t[i];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Ni(e){return null!==(e=e.childContextTypes)&&void 0!==e}function Ri(){Ci(ji),Ci(Ii)}function Oi(e,t,n){if(Ii.current!==Ti)throw Error(o(168));Ei(Ii,t),Ei(ji,n)}function Di(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,"function"!==typeof r.getChildContext)return n;for(var i in r=r.getChildContext())if(!(i in t))throw Error(o(108,W(e)||"Unknown",i));return F({},n,r)}function Li(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ti,Pi=Ii.current,Ei(Ii,e),Ei(ji,ji.current),!0}function Fi(e,t,n){var r=e.stateNode;if(!r)throw Error(o(169));n?(e=Di(e,t,Pi),r.__reactInternalMemoizedMergedChildContext=e,Ci(ji),Ci(Ii),Ei(Ii,e)):Ci(ji),Ei(ji,n)}var Mi=null,zi=!1,Ui=!1;function $i(e){null===Mi?Mi=[e]:Mi.push(e)}function Bi(){if(!Ui&&null!==Mi){Ui=!0;var e=0,t=vt;try{var n=Mi;for(vt=1;e<n.length;e++){var r=n[e];do{r=r(!0)}while(null!==r)}Mi=null,zi=!1}catch(i){throw null!==Mi&&(Mi=Mi.slice(e+1)),Ke(Xe,Bi),i}finally{vt=t,Ui=!1}}return null}var Wi=[],Hi=0,Vi=null,qi=0,Ki=[],Yi=0,Gi=null,Zi=1,Qi="";function Ji(e,t){Wi[Hi++]=qi,Wi[Hi++]=Vi,Vi=e,qi=t}function Xi(e,t,n){Ki[Yi++]=Zi,Ki[Yi++]=Qi,Ki[Yi++]=Gi,Gi=e;var r=Zi;e=Qi;var i=32-st(r)-1;r&=~(1<<i),n+=1;var o=32-st(t)+i;if(30<o){var s=i-i%5;o=(r&(1<<s)-1).toString(32),r>>=s,i-=s,Zi=1<<32-st(t)+i|n<<i|r,Qi=o+e}else Zi=1<<o|n<<i|r,Qi=e}function eo(e){null!==e.return&&(Ji(e,1),Xi(e,1,0))}function to(e){for(;e===Vi;)Vi=Wi[--Hi],Wi[Hi]=null,qi=Wi[--Hi],Wi[Hi]=null;for(;e===Gi;)Gi=Ki[--Yi],Ki[Yi]=null,Qi=Ki[--Yi],Ki[Yi]=null,Zi=Ki[--Yi],Ki[Yi]=null}var no=null,ro=null,io=!1,oo=null;function so(e,t){var n=Ac(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,null===(t=e.deletions)?(e.deletions=[n],e.flags|=16):t.push(n)}function ao(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,no=e,ro=ci(t.firstChild),!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,no=e,ro=null,!0);case 13:return null!==(t=8!==t.nodeType?null:t)&&(n=null!==Gi?{id:Zi,overflow:Qi}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},(n=Ac(18,null,null,0)).stateNode=t,n.return=e,e.child=n,no=e,ro=null,!0);default:return!1}}function lo(e){return 0!==(1&e.mode)&&0===(128&e.flags)}function co(e){if(io){var t=ro;if(t){var n=t;if(!ao(e,t)){if(lo(e))throw Error(o(418));t=ci(n.nextSibling);var r=no;t&&ao(e,t)?so(r,n):(e.flags=-4097&e.flags|2,io=!1,no=e)}}else{if(lo(e))throw Error(o(418));e.flags=-4097&e.flags|2,io=!1,no=e}}}function uo(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;no=e}function ho(e){if(e!==no)return!1;if(!io)return uo(e),io=!0,!1;var t;if((t=3!==e.tag)&&!(t=5!==e.tag)&&(t="head"!==(t=e.type)&&"body"!==t&&!ni(e.type,e.memoizedProps)),t&&(t=ro)){if(lo(e))throw po(),Error(o(418));for(;t;)so(e,t),t=ci(t.nextSibling)}if(uo(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){ro=ci(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}ro=null}}else ro=no?ci(e.stateNode.nextSibling):null;return!0}function po(){for(var e=ro;e;)e=ci(e.nextSibling)}function fo(){ro=no=null,io=!1}function go(e){null===oo?oo=[e]:oo.push(e)}var mo=x.ReactCurrentBatchConfig;function yo(e,t,n){if(null!==(e=n.ref)&&"function"!==typeof e&&"object"!==typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(o(309));var r=n.stateNode}if(!r)throw Error(o(147,e));var i=r,s=""+e;return null!==t&&null!==t.ref&&"function"===typeof t.ref&&t.ref._stringRef===s?t.ref:(t=function(e){var t=i.refs;null===e?delete t[s]:t[s]=e},t._stringRef=s,t)}if("string"!==typeof e)throw Error(o(284));if(!n._owner)throw Error(o(290,e))}return e}function bo(e,t){throw e=Object.prototype.toString.call(t),Error(o(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function vo(e){return(0,e._init)(e._payload)}function xo(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function i(e,t){return(e=Rc(e,t)).index=0,e.sibling=null,e}function s(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=2,n):r:(t.flags|=2,n):(t.flags|=1048576,n)}function a(t){return e&&null===t.alternate&&(t.flags|=2),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=Fc(n,e.mode,r)).return=e,t):((t=i(t,n)).return=e,t)}function c(e,t,n,r){var o=n.type;return o===k?u(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===o||"object"===typeof o&&null!==o&&o.$$typeof===N&&vo(o)===t.type)?((r=i(t,n.props)).ref=yo(e,t,n),r.return=e,r):((r=Oc(n.type,n.key,n.props,null,e.mode,r)).ref=yo(e,t,n),r.return=e,r)}function d(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Mc(n,e.mode,r)).return=e,t):((t=i(t,n.children||[])).return=e,t)}function u(e,t,n,r,o){return null===t||7!==t.tag?((t=Dc(n,e.mode,r,o)).return=e,t):((t=i(t,n)).return=e,t)}function h(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t)return(t=Fc(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case w:return(n=Oc(t.type,t.key,t.props,null,e.mode,n)).ref=yo(e,null,t),n.return=e,n;case _:return(t=Mc(t,e.mode,n)).return=e,t;case N:return h(e,(0,t._init)(t._payload),n)}if(te(t)||D(t))return(t=Dc(t,e.mode,n,null)).return=e,t;bo(e,t)}return null}function p(e,t,n,r){var i=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n)return null!==i?null:l(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case w:return n.key===i?c(e,t,n,r):null;case _:return n.key===i?d(e,t,n,r):null;case N:return p(e,t,(i=n._init)(n._payload),r)}if(te(n)||D(n))return null!==i?null:u(e,t,n,r,null);bo(e,n)}return null}function f(e,t,n,r,i){if("string"===typeof r&&""!==r||"number"===typeof r)return l(t,e=e.get(n)||null,""+r,i);if("object"===typeof r&&null!==r){switch(r.$$typeof){case w:return c(t,e=e.get(null===r.key?n:r.key)||null,r,i);case _:return d(t,e=e.get(null===r.key?n:r.key)||null,r,i);case N:return f(e,t,n,(0,r._init)(r._payload),i)}if(te(r)||D(r))return u(t,e=e.get(n)||null,r,i,null);bo(t,r)}return null}function g(i,o,a,l){for(var c=null,d=null,u=o,g=o=0,m=null;null!==u&&g<a.length;g++){u.index>g?(m=u,u=null):m=u.sibling;var y=p(i,u,a[g],l);if(null===y){null===u&&(u=m);break}e&&u&&null===y.alternate&&t(i,u),o=s(y,o,g),null===d?c=y:d.sibling=y,d=y,u=m}if(g===a.length)return n(i,u),io&&Ji(i,g),c;if(null===u){for(;g<a.length;g++)null!==(u=h(i,a[g],l))&&(o=s(u,o,g),null===d?c=u:d.sibling=u,d=u);return io&&Ji(i,g),c}for(u=r(i,u);g<a.length;g++)null!==(m=f(u,i,g,a[g],l))&&(e&&null!==m.alternate&&u.delete(null===m.key?g:m.key),o=s(m,o,g),null===d?c=m:d.sibling=m,d=m);return e&&u.forEach((function(e){return t(i,e)})),io&&Ji(i,g),c}function m(i,a,l,c){var d=D(l);if("function"!==typeof d)throw Error(o(150));if(null==(l=d.call(l)))throw Error(o(151));for(var u=d=null,g=a,m=a=0,y=null,b=l.next();null!==g&&!b.done;m++,b=l.next()){g.index>m?(y=g,g=null):y=g.sibling;var v=p(i,g,b.value,c);if(null===v){null===g&&(g=y);break}e&&g&&null===v.alternate&&t(i,g),a=s(v,a,m),null===u?d=v:u.sibling=v,u=v,g=y}if(b.done)return n(i,g),io&&Ji(i,m),d;if(null===g){for(;!b.done;m++,b=l.next())null!==(b=h(i,b.value,c))&&(a=s(b,a,m),null===u?d=b:u.sibling=b,u=b);return io&&Ji(i,m),d}for(g=r(i,g);!b.done;m++,b=l.next())null!==(b=f(g,i,m,b.value,c))&&(e&&null!==b.alternate&&g.delete(null===b.key?m:b.key),a=s(b,a,m),null===u?d=b:u.sibling=b,u=b);return e&&g.forEach((function(e){return t(i,e)})),io&&Ji(i,m),d}return function e(r,o,s,l){if("object"===typeof s&&null!==s&&s.type===k&&null===s.key&&(s=s.props.children),"object"===typeof s&&null!==s){switch(s.$$typeof){case w:e:{for(var c=s.key,d=o;null!==d;){if(d.key===c){if((c=s.type)===k){if(7===d.tag){n(r,d.sibling),(o=i(d,s.props.children)).return=r,r=o;break e}}else if(d.elementType===c||"object"===typeof c&&null!==c&&c.$$typeof===N&&vo(c)===d.type){n(r,d.sibling),(o=i(d,s.props)).ref=yo(r,d,s),o.return=r,r=o;break e}n(r,d);break}t(r,d),d=d.sibling}s.type===k?((o=Dc(s.props.children,r.mode,l,s.key)).return=r,r=o):((l=Oc(s.type,s.key,s.props,null,r.mode,l)).ref=yo(r,o,s),l.return=r,r=l)}return a(r);case _:e:{for(d=s.key;null!==o;){if(o.key===d){if(4===o.tag&&o.stateNode.containerInfo===s.containerInfo&&o.stateNode.implementation===s.implementation){n(r,o.sibling),(o=i(o,s.children||[])).return=r,r=o;break e}n(r,o);break}t(r,o),o=o.sibling}(o=Mc(s,r.mode,l)).return=r,r=o}return a(r);case N:return e(r,o,(d=s._init)(s._payload),l)}if(te(s))return g(r,o,s,l);if(D(s))return m(r,o,s,l);bo(r,s)}return"string"===typeof s&&""!==s||"number"===typeof s?(s=""+s,null!==o&&6===o.tag?(n(r,o.sibling),(o=i(o,s)).return=r,r=o):(n(r,o),(o=Fc(s,r.mode,l)).return=r,r=o),a(r)):n(r,o)}}var wo=xo(!0),_o=xo(!1),ko=Si(null),So=null,Co=null,Eo=null;function To(){Eo=Co=So=null}function Io(e){var t=ko.current;Ci(ko),e._currentValue=t}function jo(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Po(e,t){So=e,Eo=Co=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&t)&&(va=!0),e.firstContext=null)}function Ao(e){var t=e._currentValue;if(Eo!==e)if(e={context:e,memoizedValue:t,next:null},null===Co){if(null===So)throw Error(o(308));Co=e,So.dependencies={lanes:0,firstContext:e}}else Co=Co.next=e;return t}var No=null;function Ro(e){null===No?No=[e]:No.push(e)}function Oo(e,t,n,r){var i=t.interleaved;return null===i?(n.next=n,Ro(t)):(n.next=i.next,i.next=n),t.interleaved=n,Do(e,r)}function Do(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}var Lo=!1;function Fo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Mo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function zo(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Uo(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&Il)){var i=r.pending;return null===i?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Do(e,n)}return null===(i=r.interleaved)?(t.next=t,Ro(r)):(t.next=i.next,i.next=t),r.interleaved=t,Do(e,n)}function $o(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194240&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,bt(e,n)}}function Bo(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var i=null,o=null;if(null!==(n=n.firstBaseUpdate)){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===o?i=o=s:o=o.next=s,n=n.next}while(null!==n);null===o?i=o=t:o=o.next=t}else i=o=t;return n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Wo(e,t,n,r){var i=e.updateQueue;Lo=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,a=i.shared.pending;if(null!==a){i.shared.pending=null;var l=a,c=l.next;l.next=null,null===s?o=c:s.next=c,s=l;var d=e.alternate;null!==d&&((a=(d=d.updateQueue).lastBaseUpdate)!==s&&(null===a?d.firstBaseUpdate=c:a.next=c,d.lastBaseUpdate=l))}if(null!==o){var u=i.baseState;for(s=0,d=c=l=null,a=o;;){var h=a.lane,p=a.eventTime;if((r&h)===h){null!==d&&(d=d.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var f=e,g=a;switch(h=t,p=n,g.tag){case 1:if("function"===typeof(f=g.payload)){u=f.call(p,u,h);break e}u=f;break e;case 3:f.flags=-65537&f.flags|128;case 0:if(null===(h="function"===typeof(f=g.payload)?f.call(p,u,h):f)||void 0===h)break e;u=F({},u,h);break e;case 2:Lo=!0}}null!==a.callback&&0!==a.lane&&(e.flags|=64,null===(h=i.effects)?i.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},null===d?(c=d=p,l=u):d=d.next=p,s|=h;if(null===(a=a.next)){if(null===(a=i.shared.pending))break;a=(h=a).next,h.next=null,i.lastBaseUpdate=h,i.shared.pending=null}}if(null===d&&(l=u),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=d,null!==(t=i.shared.interleaved)){i=t;do{s|=i.lane,i=i.next}while(i!==t)}else null===o&&(i.shared.lanes=0);Ll|=s,e.lanes=s,e.memoizedState=u}}function Ho(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(null!==i){if(r.callback=null,r=n,"function"!==typeof i)throw Error(o(191,i));i.call(r)}}}var Vo={},qo=Si(Vo),Ko=Si(Vo),Yo=Si(Vo);function Go(e){if(e===Vo)throw Error(o(174));return e}function Zo(e,t){switch(Ei(Yo,t),Ei(Ko,e),Ei(qo,Vo),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:le(null,"");break;default:t=le(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}Ci(qo),Ei(qo,t)}function Qo(){Ci(qo),Ci(Ko),Ci(Yo)}function Jo(e){Go(Yo.current);var t=Go(qo.current),n=le(t,e.type);t!==n&&(Ei(Ko,e),Ei(qo,n))}function Xo(e){Ko.current===e&&(Ci(qo),Ci(Ko))}var es=Si(0);function ts(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!==(128&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ns=[];function rs(){for(var e=0;e<ns.length;e++)ns[e]._workInProgressVersionPrimary=null;ns.length=0}var is=x.ReactCurrentDispatcher,os=x.ReactCurrentBatchConfig,ss=0,as=null,ls=null,cs=null,ds=!1,us=!1,hs=0,ps=0;function fs(){throw Error(o(321))}function gs(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ar(e[n],t[n]))return!1;return!0}function ms(e,t,n,r,i,s){if(ss=s,as=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,is.current=null===e||null===e.memoizedState?Xs:ea,e=n(r,i),us){s=0;do{if(us=!1,hs=0,25<=s)throw Error(o(301));s+=1,cs=ls=null,t.updateQueue=null,is.current=ta,e=n(r,i)}while(us)}if(is.current=Js,t=null!==ls&&null!==ls.next,ss=0,cs=ls=as=null,ds=!1,t)throw Error(o(300));return e}function ys(){var e=0!==hs;return hs=0,e}function bs(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===cs?as.memoizedState=cs=e:cs=cs.next=e,cs}function vs(){if(null===ls){var e=as.alternate;e=null!==e?e.memoizedState:null}else e=ls.next;var t=null===cs?as.memoizedState:cs.next;if(null!==t)cs=t,ls=e;else{if(null===e)throw Error(o(310));e={memoizedState:(ls=e).memoizedState,baseState:ls.baseState,baseQueue:ls.baseQueue,queue:ls.queue,next:null},null===cs?as.memoizedState=cs=e:cs=cs.next=e}return cs}function xs(e,t){return"function"===typeof t?t(e):t}function ws(e){var t=vs(),n=t.queue;if(null===n)throw Error(o(311));n.lastRenderedReducer=e;var r=ls,i=r.baseQueue,s=n.pending;if(null!==s){if(null!==i){var a=i.next;i.next=s.next,s.next=a}r.baseQueue=i=s,n.pending=null}if(null!==i){s=i.next,r=r.baseState;var l=a=null,c=null,d=s;do{var u=d.lane;if((ss&u)===u)null!==c&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var h={lane:u,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};null===c?(l=c=h,a=r):c=c.next=h,as.lanes|=u,Ll|=u}d=d.next}while(null!==d&&d!==s);null===c?a=r:c.next=l,ar(r,t.memoizedState)||(va=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=c,n.lastRenderedState=r}if(null!==(e=n.interleaved)){i=e;do{s=i.lane,as.lanes|=s,Ll|=s,i=i.next}while(i!==e)}else null===i&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function _s(e){var t=vs(),n=t.queue;if(null===n)throw Error(o(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,s=t.memoizedState;if(null!==i){n.pending=null;var a=i=i.next;do{s=e(s,a.action),a=a.next}while(a!==i);ar(s,t.memoizedState)||(va=!0),t.memoizedState=s,null===t.baseQueue&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function ks(){}function Ss(e,t){var n=as,r=vs(),i=t(),s=!ar(r.memoizedState,i);if(s&&(r.memoizedState=i,va=!0),r=r.queue,Ls(Ts.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||null!==cs&&1&cs.memoizedState.tag){if(n.flags|=2048,As(9,Es.bind(null,n,r,i,t),void 0,null),null===jl)throw Error(o(349));0!==(30&ss)||Cs(n,t,i)}return i}function Cs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=as.updateQueue)?(t={lastEffect:null,stores:null},as.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function Es(e,t,n,r){t.value=n,t.getSnapshot=r,Is(t)&&js(e)}function Ts(e,t,n){return n((function(){Is(t)&&js(e)}))}function Is(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ar(e,n)}catch(r){return!0}}function js(e){var t=Do(e,1);null!==t&&nc(t,e,1,-1)}function Ps(e){var t=bs();return"function"===typeof e&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xs,lastRenderedState:e},t.queue=e,e=e.dispatch=Ys.bind(null,as,e),[t.memoizedState,e]}function As(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=as.updateQueue)?(t={lastEffect:null,stores:null},as.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ns(){return vs().memoizedState}function Rs(e,t,n,r){var i=bs();as.flags|=e,i.memoizedState=As(1|t,n,void 0,void 0===r?null:r)}function Os(e,t,n,r){var i=vs();r=void 0===r?null:r;var o=void 0;if(null!==ls){var s=ls.memoizedState;if(o=s.destroy,null!==r&&gs(r,s.deps))return void(i.memoizedState=As(t,n,o,r))}as.flags|=e,i.memoizedState=As(1|t,n,o,r)}function Ds(e,t){return Rs(8390656,8,e,t)}function Ls(e,t){return Os(2048,8,e,t)}function Fs(e,t){return Os(4,2,e,t)}function Ms(e,t){return Os(4,4,e,t)}function zs(e,t){return"function"===typeof t?(e=e(),t(e),function(){t(null)}):null!==t&&void 0!==t?(e=e(),t.current=e,function(){t.current=null}):void 0}function Us(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,Os(4,4,zs.bind(null,t,e),n)}function $s(){}function Bs(e,t){var n=vs();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&gs(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ws(e,t){var n=vs();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&gs(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Hs(e,t,n){return 0===(21&ss)?(e.baseState&&(e.baseState=!1,va=!0),e.memoizedState=n):(ar(n,t)||(n=gt(),as.lanes|=n,Ll|=n,e.baseState=!0),t)}function Vs(e,t){var n=vt;vt=0!==n&&4>n?n:4,e(!0);var r=os.transition;os.transition={};try{e(!1),t()}finally{vt=n,os.transition=r}}function qs(){return vs().memoizedState}function Ks(e,t,n){var r=tc(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Gs(e))Zs(t,n);else if(null!==(n=Oo(e,t,n,r))){nc(n,e,r,ec()),Qs(n,t,r)}}function Ys(e,t,n){var r=tc(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Gs(e))Zs(t,i);else{var o=e.alternate;if(0===e.lanes&&(null===o||0===o.lanes)&&null!==(o=t.lastRenderedReducer))try{var s=t.lastRenderedState,a=o(s,n);if(i.hasEagerState=!0,i.eagerState=a,ar(a,s)){var l=t.interleaved;return null===l?(i.next=i,Ro(t)):(i.next=l.next,l.next=i),void(t.interleaved=i)}}catch(c){}null!==(n=Oo(e,t,i,r))&&(nc(n,e,r,i=ec()),Qs(n,t,r))}}function Gs(e){var t=e.alternate;return e===as||null!==t&&t===as}function Zs(e,t){us=ds=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Qs(e,t,n){if(0!==(4194240&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,bt(e,n)}}var Js={readContext:Ao,useCallback:fs,useContext:fs,useEffect:fs,useImperativeHandle:fs,useInsertionEffect:fs,useLayoutEffect:fs,useMemo:fs,useReducer:fs,useRef:fs,useState:fs,useDebugValue:fs,useDeferredValue:fs,useTransition:fs,useMutableSource:fs,useSyncExternalStore:fs,useId:fs,unstable_isNewReconciler:!1},Xs={readContext:Ao,useCallback:function(e,t){return bs().memoizedState=[e,void 0===t?null:t],e},useContext:Ao,useEffect:Ds,useImperativeHandle:function(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,Rs(4194308,4,zs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Rs(4194308,4,e,t)},useInsertionEffect:function(e,t){return Rs(4,2,e,t)},useMemo:function(e,t){var n=bs();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=bs();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ks.bind(null,as,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},bs().memoizedState=e},useState:Ps,useDebugValue:$s,useDeferredValue:function(e){return bs().memoizedState=e},useTransition:function(){var e=Ps(!1),t=e[0];return e=Vs.bind(null,e[1]),bs().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=as,i=bs();if(io){if(void 0===n)throw Error(o(407));n=n()}else{if(n=t(),null===jl)throw Error(o(349));0!==(30&ss)||Cs(r,t,n)}i.memoizedState=n;var s={value:n,getSnapshot:t};return i.queue=s,Ds(Ts.bind(null,r,s,e),[e]),r.flags|=2048,As(9,Es.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=bs(),t=jl.identifierPrefix;if(io){var n=Qi;t=":"+t+"R"+(n=(Zi&~(1<<32-st(Zi)-1)).toString(32)+n),0<(n=hs++)&&(t+="H"+n.toString(32)),t+=":"}else t=":"+t+"r"+(n=ps++).toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},ea={readContext:Ao,useCallback:Bs,useContext:Ao,useEffect:Ls,useImperativeHandle:Us,useInsertionEffect:Fs,useLayoutEffect:Ms,useMemo:Ws,useReducer:ws,useRef:Ns,useState:function(){return ws(xs)},useDebugValue:$s,useDeferredValue:function(e){return Hs(vs(),ls.memoizedState,e)},useTransition:function(){return[ws(xs)[0],vs().memoizedState]},useMutableSource:ks,useSyncExternalStore:Ss,useId:qs,unstable_isNewReconciler:!1},ta={readContext:Ao,useCallback:Bs,useContext:Ao,useEffect:Ls,useImperativeHandle:Us,useInsertionEffect:Fs,useLayoutEffect:Ms,useMemo:Ws,useReducer:_s,useRef:Ns,useState:function(){return _s(xs)},useDebugValue:$s,useDeferredValue:function(e){var t=vs();return null===ls?t.memoizedState=e:Hs(t,ls.memoizedState,e)},useTransition:function(){return[_s(xs)[0],vs().memoizedState]},useMutableSource:ks,useSyncExternalStore:Ss,useId:qs,unstable_isNewReconciler:!1};function na(e,t){if(e&&e.defaultProps){for(var n in t=F({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}function ra(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:F({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var ia={isMounted:function(e){return!!(e=e._reactInternals)&&Be(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ec(),i=tc(e),o=zo(r,i);o.payload=t,void 0!==n&&null!==n&&(o.callback=n),null!==(t=Uo(e,o,i))&&(nc(t,e,i,r),$o(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ec(),i=tc(e),o=zo(r,i);o.tag=1,o.payload=t,void 0!==n&&null!==n&&(o.callback=n),null!==(t=Uo(e,o,i))&&(nc(t,e,i,r),$o(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ec(),r=tc(e),i=zo(n,r);i.tag=2,void 0!==t&&null!==t&&(i.callback=t),null!==(t=Uo(e,i,r))&&(nc(t,e,r,n),$o(t,e,r))}};function oa(e,t,n,r,i,o,s){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,s):!t.prototype||!t.prototype.isPureReactComponent||(!lr(n,r)||!lr(i,o))}function sa(e,t,n){var r=!1,i=Ti,o=t.contextType;return"object"===typeof o&&null!==o?o=Ao(o):(i=Ni(t)?Pi:Ii.current,o=(r=null!==(r=t.contextTypes)&&void 0!==r)?Ai(e,i):Ti),t=new t(n,o),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=ia,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function aa(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ia.enqueueReplaceState(t,t.state,null)}function la(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Fo(e);var o=t.contextType;"object"===typeof o&&null!==o?i.context=Ao(o):(o=Ni(t)?Pi:Ii.current,i.context=Ai(e,o)),i.state=e.memoizedState,"function"===typeof(o=t.getDerivedStateFromProps)&&(ra(e,t,o,n),i.state=e.memoizedState),"function"===typeof t.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(t=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),t!==i.state&&ia.enqueueReplaceState(i,i.state,null),Wo(e,n,i,r),i.state=e.memoizedState),"function"===typeof i.componentDidMount&&(e.flags|=4194308)}function ca(e,t){try{var n="",r=t;do{n+=$(r),r=r.return}while(r);var i=n}catch(o){i="\nError generating stack: "+o.message+"\n"+o.stack}return{value:e,source:t,stack:i,digest:null}}function da(e,t,n){return{value:e,source:null,stack:null!=n?n:null,digest:null!=t?t:null}}function ua(e,t){try{console.error(t.value)}catch(n){setTimeout((function(){throw n}))}}var ha="function"===typeof WeakMap?WeakMap:Map;function pa(e,t,n){(n=zo(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Hl||(Hl=!0,Vl=r),ua(0,t)},n}function fa(e,t,n){(n=zo(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"===typeof r){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){ua(0,t)}}var o=e.stateNode;return null!==o&&"function"===typeof o.componentDidCatch&&(n.callback=function(){ua(0,t),"function"!==typeof r&&(null===ql?ql=new Set([this]):ql.add(this));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}function ga(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new ha;var i=new Set;r.set(t,i)}else void 0===(i=r.get(t))&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=Cc.bind(null,e,t,n),t.then(e,e))}function ma(e){do{var t;if((t=13===e.tag)&&(t=null===(t=e.memoizedState)||null!==t.dehydrated),t)return e;e=e.return}while(null!==e);return null}function ya(e,t,n,r,i){return 0===(1&e.mode)?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,1===n.tag&&(null===n.alternate?n.tag=17:((t=zo(-1,1)).tag=2,Uo(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=i,e)}var ba=x.ReactCurrentOwner,va=!1;function xa(e,t,n,r){t.child=null===e?_o(t,null,n,r):wo(t,e.child,n,r)}function wa(e,t,n,r,i){n=n.render;var o=t.ref;return Po(t,i),r=ms(e,t,n,r,o,i),n=ys(),null===e||va?(io&&n&&eo(t),t.flags|=1,xa(e,t,r,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Ha(e,t,i))}function _a(e,t,n,r,i){if(null===e){var o=n.type;return"function"!==typeof o||Nc(o)||void 0!==o.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Oc(n.type,null,r,t,t.mode,i)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=o,ka(e,t,o,r,i))}if(o=e.child,0===(e.lanes&i)){var s=o.memoizedProps;if((n=null!==(n=n.compare)?n:lr)(s,r)&&e.ref===t.ref)return Ha(e,t,i)}return t.flags|=1,(e=Rc(o,r)).ref=t.ref,e.return=t,t.child=e}function ka(e,t,n,r,i){if(null!==e){var o=e.memoizedProps;if(lr(o,r)&&e.ref===t.ref){if(va=!1,t.pendingProps=r=o,0===(e.lanes&i))return t.lanes=e.lanes,Ha(e,t,i);0!==(131072&e.flags)&&(va=!0)}}return Ea(e,t,n,r,i)}function Sa(e,t,n){var r=t.pendingProps,i=r.children,o=null!==e?e.memoizedState:null;if("hidden"===r.mode)if(0===(1&t.mode))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ei(Rl,Nl),Nl|=n;else{if(0===(1073741824&n))return e=null!==o?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ei(Rl,Nl),Nl|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=null!==o?o.baseLanes:n,Ei(Rl,Nl),Nl|=r}else null!==o?(r=o.baseLanes|n,t.memoizedState=null):r=n,Ei(Rl,Nl),Nl|=r;return xa(e,t,i,n),t.child}function Ca(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ea(e,t,n,r,i){var o=Ni(n)?Pi:Ii.current;return o=Ai(t,o),Po(t,i),n=ms(e,t,n,r,o,i),r=ys(),null===e||va?(io&&r&&eo(t),t.flags|=1,xa(e,t,n,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Ha(e,t,i))}function Ta(e,t,n,r,i){if(Ni(n)){var o=!0;Li(t)}else o=!1;if(Po(t,i),null===t.stateNode)Wa(e,t),sa(t,n,r),la(t,n,r,i),r=!0;else if(null===e){var s=t.stateNode,a=t.memoizedProps;s.props=a;var l=s.context,c=n.contextType;"object"===typeof c&&null!==c?c=Ao(c):c=Ai(t,c=Ni(n)?Pi:Ii.current);var d=n.getDerivedStateFromProps,u="function"===typeof d||"function"===typeof s.getSnapshotBeforeUpdate;u||"function"!==typeof s.UNSAFE_componentWillReceiveProps&&"function"!==typeof s.componentWillReceiveProps||(a!==r||l!==c)&&aa(t,s,r,c),Lo=!1;var h=t.memoizedState;s.state=h,Wo(t,r,s,i),l=t.memoizedState,a!==r||h!==l||ji.current||Lo?("function"===typeof d&&(ra(t,n,d,r),l=t.memoizedState),(a=Lo||oa(t,n,a,r,h,l,c))?(u||"function"!==typeof s.UNSAFE_componentWillMount&&"function"!==typeof s.componentWillMount||("function"===typeof s.componentWillMount&&s.componentWillMount(),"function"===typeof s.UNSAFE_componentWillMount&&s.UNSAFE_componentWillMount()),"function"===typeof s.componentDidMount&&(t.flags|=4194308)):("function"===typeof s.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),s.props=r,s.state=l,s.context=c,r=a):("function"===typeof s.componentDidMount&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,Mo(e,t),a=t.memoizedProps,c=t.type===t.elementType?a:na(t.type,a),s.props=c,u=t.pendingProps,h=s.context,"object"===typeof(l=n.contextType)&&null!==l?l=Ao(l):l=Ai(t,l=Ni(n)?Pi:Ii.current);var p=n.getDerivedStateFromProps;(d="function"===typeof p||"function"===typeof s.getSnapshotBeforeUpdate)||"function"!==typeof s.UNSAFE_componentWillReceiveProps&&"function"!==typeof s.componentWillReceiveProps||(a!==u||h!==l)&&aa(t,s,r,l),Lo=!1,h=t.memoizedState,s.state=h,Wo(t,r,s,i);var f=t.memoizedState;a!==u||h!==f||ji.current||Lo?("function"===typeof p&&(ra(t,n,p,r),f=t.memoizedState),(c=Lo||oa(t,n,c,r,h,f,l)||!1)?(d||"function"!==typeof s.UNSAFE_componentWillUpdate&&"function"!==typeof s.componentWillUpdate||("function"===typeof s.componentWillUpdate&&s.componentWillUpdate(r,f,l),"function"===typeof s.UNSAFE_componentWillUpdate&&s.UNSAFE_componentWillUpdate(r,f,l)),"function"===typeof s.componentDidUpdate&&(t.flags|=4),"function"===typeof s.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof s.componentDidUpdate||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),"function"!==typeof s.getSnapshotBeforeUpdate||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=f),s.props=r,s.state=f,s.context=l,r=c):("function"!==typeof s.componentDidUpdate||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),"function"!==typeof s.getSnapshotBeforeUpdate||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return Ia(e,t,n,r,o,i)}function Ia(e,t,n,r,i,o){Ca(e,t);var s=0!==(128&t.flags);if(!r&&!s)return i&&Fi(t,n,!1),Ha(e,t,o);r=t.stateNode,ba.current=t;var a=s&&"function"!==typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&s?(t.child=wo(t,e.child,null,o),t.child=wo(t,null,a,o)):xa(e,t,a,o),t.memoizedState=r.state,i&&Fi(t,n,!0),t.child}function ja(e){var t=e.stateNode;t.pendingContext?Oi(0,t.pendingContext,t.pendingContext!==t.context):t.context&&Oi(0,t.context,!1),Zo(e,t.containerInfo)}function Pa(e,t,n,r,i){return fo(),go(i),t.flags|=256,xa(e,t,n,r),t.child}var Aa,Na,Ra,Oa,Da={dehydrated:null,treeContext:null,retryLane:0};function La(e){return{baseLanes:e,cachePool:null,transitions:null}}function Fa(e,t,n){var r,i=t.pendingProps,s=es.current,a=!1,l=0!==(128&t.flags);if((r=l)||(r=(null===e||null!==e.memoizedState)&&0!==(2&s)),r?(a=!0,t.flags&=-129):null!==e&&null===e.memoizedState||(s|=1),Ei(es,1&s),null===e)return co(t),null!==(e=t.memoizedState)&&null!==(e=e.dehydrated)?(0===(1&t.mode)?t.lanes=1:"$!"===e.data?t.lanes=8:t.lanes=1073741824,null):(l=i.children,e=i.fallback,a?(i=t.mode,a=t.child,l={mode:"hidden",children:l},0===(1&i)&&null!==a?(a.childLanes=0,a.pendingProps=l):a=Lc(l,i,0,null),e=Dc(e,i,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=La(n),t.memoizedState=Da,e):Ma(t,l));if(null!==(s=e.memoizedState)&&null!==(r=s.dehydrated))return function(e,t,n,r,i,s,a){if(n)return 256&t.flags?(t.flags&=-257,za(e,t,a,r=da(Error(o(422))))):null!==t.memoizedState?(t.child=e.child,t.flags|=128,null):(s=r.fallback,i=t.mode,r=Lc({mode:"visible",children:r.children},i,0,null),(s=Dc(s,i,a,null)).flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,0!==(1&t.mode)&&wo(t,e.child,null,a),t.child.memoizedState=La(a),t.memoizedState=Da,s);if(0===(1&t.mode))return za(e,t,a,null);if("$!"===i.data){if(r=i.nextSibling&&i.nextSibling.dataset)var l=r.dgst;return r=l,za(e,t,a,r=da(s=Error(o(419)),r,void 0))}if(l=0!==(a&e.childLanes),va||l){if(null!==(r=jl)){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}0!==(i=0!==(i&(r.suspendedLanes|a))?0:i)&&i!==s.retryLane&&(s.retryLane=i,Do(e,i),nc(r,e,i,-1))}return gc(),za(e,t,a,r=da(Error(o(421))))}return"$?"===i.data?(t.flags|=128,t.child=e.child,t=Tc.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,ro=ci(i.nextSibling),no=t,io=!0,oo=null,null!==e&&(Ki[Yi++]=Zi,Ki[Yi++]=Qi,Ki[Yi++]=Gi,Zi=e.id,Qi=e.overflow,Gi=t),t=Ma(t,r.children),t.flags|=4096,t)}(e,t,l,i,r,s,n);if(a){a=i.fallback,l=t.mode,r=(s=e.child).sibling;var c={mode:"hidden",children:i.children};return 0===(1&l)&&t.child!==s?((i=t.child).childLanes=0,i.pendingProps=c,t.deletions=null):(i=Rc(s,c)).subtreeFlags=14680064&s.subtreeFlags,null!==r?a=Rc(r,a):(a=Dc(a,l,n,null)).flags|=2,a.return=t,i.return=t,i.sibling=a,t.child=i,i=a,a=t.child,l=null===(l=e.child.memoizedState)?La(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},a.memoizedState=l,a.childLanes=e.childLanes&~n,t.memoizedState=Da,i}return e=(a=e.child).sibling,i=Rc(a,{mode:"visible",children:i.children}),0===(1&t.mode)&&(i.lanes=n),i.return=t,i.sibling=null,null!==e&&(null===(n=t.deletions)?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=i,t.memoizedState=null,i}function Ma(e,t){return(t=Lc({mode:"visible",children:t},e.mode,0,null)).return=e,e.child=t}function za(e,t,n,r){return null!==r&&go(r),wo(t,e.child,null,n),(e=Ma(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function Ua(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),jo(e.return,t,n)}function $a(e,t,n,r,i){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function Ba(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(xa(e,t,r.children,n),0!==(2&(r=es.current)))r=1&r|2,t.flags|=128;else{if(null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Ua(e,n,t);else if(19===e.tag)Ua(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ei(es,r),0===(1&t.mode))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;null!==n;)null!==(e=n.alternate)&&null===ts(e)&&(i=n),n=n.sibling;null===(n=i)?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),$a(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;null!==i;){if(null!==(e=i.alternate)&&null===ts(e)){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}$a(t,!0,n,null,o);break;case"together":$a(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Wa(e,t){0===(1&t.mode)&&null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Ha(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Ll|=t.lanes,0===(n&t.childLanes))return null;if(null!==e&&t.child!==e.child)throw Error(o(153));if(null!==t.child){for(n=Rc(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Rc(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function Va(e,t){if(!io)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function qa(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=14680064&i.subtreeFlags,r|=14680064&i.flags,i.return=e,i=i.sibling;else for(i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ka(e,t,n){var r=t.pendingProps;switch(to(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qa(t),null;case 1:case 17:return Ni(t.type)&&Ri(),qa(t),null;case 3:return r=t.stateNode,Qo(),Ci(ji),Ci(Ii),rs(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(ho(t)?t.flags|=4:null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,null!==oo&&(sc(oo),oo=null))),Na(e,t),qa(t),null;case 5:Xo(t);var i=Go(Yo.current);if(n=t.type,null!==e&&null!=t.stateNode)Ra(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(null===t.stateNode)throw Error(o(166));return qa(t),null}if(e=Go(qo.current),ho(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[hi]=t,r[pi]=s,e=0!==(1&t.mode),n){case"dialog":zr("cancel",r),zr("close",r);break;case"iframe":case"object":case"embed":zr("load",r);break;case"video":case"audio":for(i=0;i<Dr.length;i++)zr(Dr[i],r);break;case"source":zr("error",r);break;case"img":case"image":case"link":zr("error",r),zr("load",r);break;case"details":zr("toggle",r);break;case"input":Z(r,s),zr("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},zr("invalid",r);break;case"textarea":ie(r,s),zr("invalid",r)}for(var l in be(n,s),i=null,s)if(s.hasOwnProperty(l)){var c=s[l];"children"===l?"string"===typeof c?r.textContent!==c&&(!0!==s.suppressHydrationWarning&&Jr(r.textContent,c,e),i=["children",c]):"number"===typeof c&&r.textContent!==""+c&&(!0!==s.suppressHydrationWarning&&Jr(r.textContent,c,e),i=["children",""+c]):a.hasOwnProperty(l)&&null!=c&&"onScroll"===l&&zr("scroll",r)}switch(n){case"input":q(r),X(r,s,!0);break;case"textarea":q(r),se(r);break;case"select":case"option":break;default:"function"===typeof s.onClick&&(r.onclick=Xr)}r=i,t.updateQueue=r,null!==r&&(t.flags|=4)}else{l=9===i.nodeType?i:i.ownerDocument,"http://www.w3.org/1999/xhtml"===e&&(e=ae(n)),"http://www.w3.org/1999/xhtml"===e?"script"===n?((e=l.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"===typeof r.is?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),"select"===n&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[hi]=t,e[pi]=r,Aa(e,t,!1,!1),t.stateNode=e;e:{switch(l=ve(n,r),n){case"dialog":zr("cancel",e),zr("close",e),i=r;break;case"iframe":case"object":case"embed":zr("load",e),i=r;break;case"video":case"audio":for(i=0;i<Dr.length;i++)zr(Dr[i],e);i=r;break;case"source":zr("error",e),i=r;break;case"img":case"image":case"link":zr("error",e),zr("load",e),i=r;break;case"details":zr("toggle",e),i=r;break;case"input":Z(e,r),i=G(e,r),zr("invalid",e);break;case"option":default:i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=F({},r,{value:void 0}),zr("invalid",e);break;case"textarea":ie(e,r),i=re(e,r),zr("invalid",e)}for(s in be(n,i),c=i)if(c.hasOwnProperty(s)){var d=c[s];"style"===s?me(e,d):"dangerouslySetInnerHTML"===s?null!=(d=d?d.__html:void 0)&&ue(e,d):"children"===s?"string"===typeof d?("textarea"!==n||""!==d)&&he(e,d):"number"===typeof d&&he(e,""+d):"suppressContentEditableWarning"!==s&&"suppressHydrationWarning"!==s&&"autoFocus"!==s&&(a.hasOwnProperty(s)?null!=d&&"onScroll"===s&&zr("scroll",e):null!=d&&v(e,s,d,l))}switch(n){case"input":q(e),X(e,r,!1);break;case"textarea":q(e),se(e);break;case"option":null!=r.value&&e.setAttribute("value",""+H(r.value));break;case"select":e.multiple=!!r.multiple,null!=(s=r.value)?ne(e,!!r.multiple,s,!1):null!=r.defaultValue&&ne(e,!!r.multiple,r.defaultValue,!0);break;default:"function"===typeof i.onClick&&(e.onclick=Xr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}null!==t.ref&&(t.flags|=512,t.flags|=2097152)}return qa(t),null;case 6:if(e&&null!=t.stateNode)Oa(e,t,e.memoizedProps,r);else{if("string"!==typeof r&&null===t.stateNode)throw Error(o(166));if(n=Go(Yo.current),Go(qo.current),ho(t)){if(r=t.stateNode,n=t.memoizedProps,r[hi]=t,(s=r.nodeValue!==n)&&null!==(e=no))switch(e.tag){case 3:Jr(r.nodeValue,n,0!==(1&e.mode));break;case 5:!0!==e.memoizedProps.suppressHydrationWarning&&Jr(r.nodeValue,n,0!==(1&e.mode))}s&&(t.flags|=4)}else(r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[hi]=t,t.stateNode=r}return qa(t),null;case 13:if(Ci(es),r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(io&&null!==ro&&0!==(1&t.mode)&&0===(128&t.flags))po(),fo(),t.flags|=98560,s=!1;else if(s=ho(t),null!==r&&null!==r.dehydrated){if(null===e){if(!s)throw Error(o(318));if(!(s=null!==(s=t.memoizedState)?s.dehydrated:null))throw Error(o(317));s[hi]=t}else fo(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;qa(t),s=!1}else null!==oo&&(sc(oo),oo=null),s=!0;if(!s)return 65536&t.flags?t:null}return 0!==(128&t.flags)?(t.lanes=n,t):((r=null!==r)!==(null!==e&&null!==e.memoizedState)&&r&&(t.child.flags|=8192,0!==(1&t.mode)&&(null===e||0!==(1&es.current)?0===Ol&&(Ol=3):gc())),null!==t.updateQueue&&(t.flags|=4),qa(t),null);case 4:return Qo(),Na(e,t),null===e&&Br(t.stateNode.containerInfo),qa(t),null;case 10:return Io(t.type._context),qa(t),null;case 19:if(Ci(es),null===(s=t.memoizedState))return qa(t),null;if(r=0!==(128&t.flags),null===(l=s.rendering))if(r)Va(s,!1);else{if(0!==Ol||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(l=ts(e))){for(t.flags|=128,Va(s,!1),null!==(r=l.updateQueue)&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;null!==n;)e=r,(s=n).flags&=14680066,null===(l=s.alternate)?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=l.childLanes,s.lanes=l.lanes,s.child=l.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=l.memoizedProps,s.memoizedState=l.memoizedState,s.updateQueue=l.updateQueue,s.type=l.type,e=l.dependencies,s.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ei(es,1&es.current|2),t.child}e=e.sibling}null!==s.tail&&Qe()>Bl&&(t.flags|=128,r=!0,Va(s,!1),t.lanes=4194304)}else{if(!r)if(null!==(e=ts(l))){if(t.flags|=128,r=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),Va(s,!0),null===s.tail&&"hidden"===s.tailMode&&!l.alternate&&!io)return qa(t),null}else 2*Qe()-s.renderingStartTime>Bl&&1073741824!==n&&(t.flags|=128,r=!0,Va(s,!1),t.lanes=4194304);s.isBackwards?(l.sibling=t.child,t.child=l):(null!==(n=s.last)?n.sibling=l:t.child=l,s.last=l)}return null!==s.tail?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Qe(),t.sibling=null,n=es.current,Ei(es,r?1&n|2:1&n),t):(qa(t),null);case 22:case 23:return uc(),r=null!==t.memoizedState,null!==e&&null!==e.memoizedState!==r&&(t.flags|=8192),r&&0!==(1&t.mode)?0!==(1073741824&Nl)&&(qa(t),6&t.subtreeFlags&&(t.flags|=8192)):qa(t),null;case 24:case 25:return null}throw Error(o(156,t.tag))}function Ya(e,t){switch(to(t),t.tag){case 1:return Ni(t.type)&&Ri(),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return Qo(),Ci(ji),Ci(Ii),rs(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 5:return Xo(t),null;case 13:if(Ci(es),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(o(340));fo()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return Ci(es),null;case 4:return Qo(),null;case 10:return Io(t.type._context),null;case 22:case 23:return uc(),null;default:return null}}Aa=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Na=function(){},Ra=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Go(qo.current);var o,s=null;switch(n){case"input":i=G(e,i),r=G(e,r),s=[];break;case"select":i=F({},i,{value:void 0}),r=F({},r,{value:void 0}),s=[];break;case"textarea":i=re(e,i),r=re(e,r),s=[];break;default:"function"!==typeof i.onClick&&"function"===typeof r.onClick&&(e.onclick=Xr)}for(d in be(n,r),n=null,i)if(!r.hasOwnProperty(d)&&i.hasOwnProperty(d)&&null!=i[d])if("style"===d){var l=i[d];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else"dangerouslySetInnerHTML"!==d&&"children"!==d&&"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&"autoFocus"!==d&&(a.hasOwnProperty(d)?s||(s=[]):(s=s||[]).push(d,null));for(d in r){var c=r[d];if(l=null!=i?i[d]:void 0,r.hasOwnProperty(d)&&c!==l&&(null!=c||null!=l))if("style"===d)if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(s||(s=[]),s.push(d,n)),n=c;else"dangerouslySetInnerHTML"===d?(c=c?c.__html:void 0,l=l?l.__html:void 0,null!=c&&l!==c&&(s=s||[]).push(d,c)):"children"===d?"string"!==typeof c&&"number"!==typeof c||(s=s||[]).push(d,""+c):"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&(a.hasOwnProperty(d)?(null!=c&&"onScroll"===d&&zr("scroll",e),s||l===c||(s=[])):(s=s||[]).push(d,c))}n&&(s=s||[]).push("style",n);var d=s;(t.updateQueue=d)&&(t.flags|=4)}},Oa=function(e,t,n,r){n!==r&&(t.flags|=4)};var Ga=!1,Za=!1,Qa="function"===typeof WeakSet?WeakSet:Set,Ja=null;function Xa(e,t){var n=e.ref;if(null!==n)if("function"===typeof n)try{n(null)}catch(r){Sc(e,t,r)}else n.current=null}function el(e,t,n){try{n()}catch(r){Sc(e,t,r)}}var tl=!1;function nl(e,t,n){var r=t.updateQueue;if(null!==(r=null!==r?r.lastEffect:null)){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,void 0!==o&&el(t,n,o)}i=i.next}while(i!==r)}}function rl(e,t){if(null!==(t=null!==(t=t.updateQueue)?t.lastEffect:null)){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function il(e){var t=e.ref;if(null!==t){var n=e.stateNode;e.tag,e=n,"function"===typeof t?t(e):t.current=e}}function ol(e){var t=e.alternate;null!==t&&(e.alternate=null,ol(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&(delete t[hi],delete t[pi],delete t[gi],delete t[mi],delete t[yi])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function sl(e){return 5===e.tag||3===e.tag||4===e.tag}function al(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||sl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function ll(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Xr));else if(4!==r&&null!==(e=e.child))for(ll(e,t,n),e=e.sibling;null!==e;)ll(e,t,n),e=e.sibling}function cl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(cl(e,t,n),e=e.sibling;null!==e;)cl(e,t,n),e=e.sibling}var dl=null,ul=!1;function hl(e,t,n){for(n=n.child;null!==n;)pl(e,t,n),n=n.sibling}function pl(e,t,n){if(ot&&"function"===typeof ot.onCommitFiberUnmount)try{ot.onCommitFiberUnmount(it,n)}catch(a){}switch(n.tag){case 5:Za||Xa(n,t);case 6:var r=dl,i=ul;dl=null,hl(e,t,n),ul=i,null!==(dl=r)&&(ul?(e=dl,n=n.stateNode,8===e.nodeType?e.parentNode.removeChild(n):e.removeChild(n)):dl.removeChild(n.stateNode));break;case 18:null!==dl&&(ul?(e=dl,n=n.stateNode,8===e.nodeType?li(e.parentNode,n):1===e.nodeType&&li(e,n),Bt(e)):li(dl,n.stateNode));break;case 4:r=dl,i=ul,dl=n.stateNode.containerInfo,ul=!0,hl(e,t,n),dl=r,ul=i;break;case 0:case 11:case 14:case 15:if(!Za&&(null!==(r=n.updateQueue)&&null!==(r=r.lastEffect))){i=r=r.next;do{var o=i,s=o.destroy;o=o.tag,void 0!==s&&(0!==(2&o)||0!==(4&o))&&el(n,t,s),i=i.next}while(i!==r)}hl(e,t,n);break;case 1:if(!Za&&(Xa(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){Sc(n,t,a)}hl(e,t,n);break;case 21:hl(e,t,n);break;case 22:1&n.mode?(Za=(r=Za)||null!==n.memoizedState,hl(e,t,n),Za=r):hl(e,t,n);break;default:hl(e,t,n)}}function fl(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new Qa),t.forEach((function(t){var r=Ic.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}function gl(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var i=n[r];try{var s=e,a=t,l=a;e:for(;null!==l;){switch(l.tag){case 5:dl=l.stateNode,ul=!1;break e;case 3:case 4:dl=l.stateNode.containerInfo,ul=!0;break e}l=l.return}if(null===dl)throw Error(o(160));pl(s,a,i),dl=null,ul=!1;var c=i.alternate;null!==c&&(c.return=null),i.return=null}catch(d){Sc(i,t,d)}}if(12854&t.subtreeFlags)for(t=t.child;null!==t;)ml(t,e),t=t.sibling}function ml(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(gl(t,e),yl(e),4&r){try{nl(3,e,e.return),rl(3,e)}catch(m){Sc(e,e.return,m)}try{nl(5,e,e.return)}catch(m){Sc(e,e.return,m)}}break;case 1:gl(t,e),yl(e),512&r&&null!==n&&Xa(n,n.return);break;case 5:if(gl(t,e),yl(e),512&r&&null!==n&&Xa(n,n.return),32&e.flags){var i=e.stateNode;try{he(i,"")}catch(m){Sc(e,e.return,m)}}if(4&r&&null!=(i=e.stateNode)){var s=e.memoizedProps,a=null!==n?n.memoizedProps:s,l=e.type,c=e.updateQueue;if(e.updateQueue=null,null!==c)try{"input"===l&&"radio"===s.type&&null!=s.name&&Q(i,s),ve(l,a);var d=ve(l,s);for(a=0;a<c.length;a+=2){var u=c[a],h=c[a+1];"style"===u?me(i,h):"dangerouslySetInnerHTML"===u?ue(i,h):"children"===u?he(i,h):v(i,u,h,d)}switch(l){case"input":J(i,s);break;case"textarea":oe(i,s);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var f=s.value;null!=f?ne(i,!!s.multiple,f,!1):p!==!!s.multiple&&(null!=s.defaultValue?ne(i,!!s.multiple,s.defaultValue,!0):ne(i,!!s.multiple,s.multiple?[]:"",!1))}i[pi]=s}catch(m){Sc(e,e.return,m)}}break;case 6:if(gl(t,e),yl(e),4&r){if(null===e.stateNode)throw Error(o(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(m){Sc(e,e.return,m)}}break;case 3:if(gl(t,e),yl(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Bt(t.containerInfo)}catch(m){Sc(e,e.return,m)}break;case 4:default:gl(t,e),yl(e);break;case 13:gl(t,e),yl(e),8192&(i=e.child).flags&&(s=null!==i.memoizedState,i.stateNode.isHidden=s,!s||null!==i.alternate&&null!==i.alternate.memoizedState||($l=Qe())),4&r&&fl(e);break;case 22:if(u=null!==n&&null!==n.memoizedState,1&e.mode?(Za=(d=Za)||u,gl(t,e),Za=d):gl(t,e),yl(e),8192&r){if(d=null!==e.memoizedState,(e.stateNode.isHidden=d)&&!u&&0!==(1&e.mode))for(Ja=e,u=e.child;null!==u;){for(h=Ja=u;null!==Ja;){switch(f=(p=Ja).child,p.tag){case 0:case 11:case 14:case 15:nl(4,p,p.return);break;case 1:Xa(p,p.return);var g=p.stateNode;if("function"===typeof g.componentWillUnmount){r=p,n=p.return;try{t=r,g.props=t.memoizedProps,g.state=t.memoizedState,g.componentWillUnmount()}catch(m){Sc(r,n,m)}}break;case 5:Xa(p,p.return);break;case 22:if(null!==p.memoizedState){wl(h);continue}}null!==f?(f.return=p,Ja=f):wl(h)}u=u.sibling}e:for(u=null,h=e;;){if(5===h.tag){if(null===u){u=h;try{i=h.stateNode,d?"function"===typeof(s=i.style).setProperty?s.setProperty("display","none","important"):s.display="none":(l=h.stateNode,a=void 0!==(c=h.memoizedProps.style)&&null!==c&&c.hasOwnProperty("display")?c.display:null,l.style.display=ge("display",a))}catch(m){Sc(e,e.return,m)}}}else if(6===h.tag){if(null===u)try{h.stateNode.nodeValue=d?"":h.memoizedProps}catch(m){Sc(e,e.return,m)}}else if((22!==h.tag&&23!==h.tag||null===h.memoizedState||h===e)&&null!==h.child){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;null===h.sibling;){if(null===h.return||h.return===e)break e;u===h&&(u=null),h=h.return}u===h&&(u=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:gl(t,e),yl(e),4&r&&fl(e);case 21:}}function yl(e){var t=e.flags;if(2&t){try{e:{for(var n=e.return;null!==n;){if(sl(n)){var r=n;break e}n=n.return}throw Error(o(160))}switch(r.tag){case 5:var i=r.stateNode;32&r.flags&&(he(i,""),r.flags&=-33),cl(e,al(e),i);break;case 3:case 4:var s=r.stateNode.containerInfo;ll(e,al(e),s);break;default:throw Error(o(161))}}catch(a){Sc(e,e.return,a)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function bl(e,t,n){Ja=e,vl(e,t,n)}function vl(e,t,n){for(var r=0!==(1&e.mode);null!==Ja;){var i=Ja,o=i.child;if(22===i.tag&&r){var s=null!==i.memoizedState||Ga;if(!s){var a=i.alternate,l=null!==a&&null!==a.memoizedState||Za;a=Ga;var c=Za;if(Ga=s,(Za=l)&&!c)for(Ja=i;null!==Ja;)l=(s=Ja).child,22===s.tag&&null!==s.memoizedState?_l(i):null!==l?(l.return=s,Ja=l):_l(i);for(;null!==o;)Ja=o,vl(o,t,n),o=o.sibling;Ja=i,Ga=a,Za=c}xl(e)}else 0!==(8772&i.subtreeFlags)&&null!==o?(o.return=i,Ja=o):xl(e)}}function xl(e){for(;null!==Ja;){var t=Ja;if(0!==(8772&t.flags)){var n=t.alternate;try{if(0!==(8772&t.flags))switch(t.tag){case 0:case 11:case 15:Za||rl(5,t);break;case 1:var r=t.stateNode;if(4&t.flags&&!Za)if(null===n)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:na(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;null!==s&&Ho(t,s,r);break;case 3:var a=t.updateQueue;if(null!==a){if(n=null,null!==t.child)switch(t.child.tag){case 5:case 1:n=t.child.stateNode}Ho(t,a,n)}break;case 5:var l=t.stateNode;if(null===n&&4&t.flags){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:case 25:break;case 13:if(null===t.memoizedState){var d=t.alternate;if(null!==d){var u=d.memoizedState;if(null!==u){var h=u.dehydrated;null!==h&&Bt(h)}}}break;default:throw Error(o(163))}Za||512&t.flags&&il(t)}catch(p){Sc(t,t.return,p)}}if(t===e){Ja=null;break}if(null!==(n=t.sibling)){n.return=t.return,Ja=n;break}Ja=t.return}}function wl(e){for(;null!==Ja;){var t=Ja;if(t===e){Ja=null;break}var n=t.sibling;if(null!==n){n.return=t.return,Ja=n;break}Ja=t.return}}function _l(e){for(;null!==Ja;){var t=Ja;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{rl(4,t)}catch(l){Sc(t,n,l)}break;case 1:var r=t.stateNode;if("function"===typeof r.componentDidMount){var i=t.return;try{r.componentDidMount()}catch(l){Sc(t,i,l)}}var o=t.return;try{il(t)}catch(l){Sc(t,o,l)}break;case 5:var s=t.return;try{il(t)}catch(l){Sc(t,s,l)}}}catch(l){Sc(t,t.return,l)}if(t===e){Ja=null;break}var a=t.sibling;if(null!==a){a.return=t.return,Ja=a;break}Ja=t.return}}var kl,Sl=Math.ceil,Cl=x.ReactCurrentDispatcher,El=x.ReactCurrentOwner,Tl=x.ReactCurrentBatchConfig,Il=0,jl=null,Pl=null,Al=0,Nl=0,Rl=Si(0),Ol=0,Dl=null,Ll=0,Fl=0,Ml=0,zl=null,Ul=null,$l=0,Bl=1/0,Wl=null,Hl=!1,Vl=null,ql=null,Kl=!1,Yl=null,Gl=0,Zl=0,Ql=null,Jl=-1,Xl=0;function ec(){return 0!==(6&Il)?Qe():-1!==Jl?Jl:Jl=Qe()}function tc(e){return 0===(1&e.mode)?1:0!==(2&Il)&&0!==Al?Al&-Al:null!==mo.transition?(0===Xl&&(Xl=gt()),Xl):0!==(e=vt)?e:e=void 0===(e=window.event)?16:Zt(e.type)}function nc(e,t,n,r){if(50<Zl)throw Zl=0,Ql=null,Error(o(185));yt(e,n,r),0!==(2&Il)&&e===jl||(e===jl&&(0===(2&Il)&&(Fl|=n),4===Ol&&ac(e,Al)),rc(e,r),1===n&&0===Il&&0===(1&t.mode)&&(Bl=Qe()+500,zi&&Bi()))}function rc(e,t){var n=e.callbackNode;!function(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-st(o),a=1<<s,l=i[s];-1===l?0!==(a&n)&&0===(a&r)||(i[s]=pt(a,t)):l<=t&&(e.expiredLanes|=a),o&=~a}}(e,t);var r=ht(e,e===jl?Al:0);if(0===r)null!==n&&Ye(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(null!=n&&Ye(n),1===t)0===e.tag?function(e){zi=!0,$i(e)}(lc.bind(null,e)):$i(lc.bind(null,e)),si((function(){0===(6&Il)&&Bi()})),n=null;else{switch(xt(r)){case 1:n=Xe;break;case 4:n=et;break;case 16:default:n=tt;break;case 536870912:n=rt}n=jc(n,ic.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ic(e,t){if(Jl=-1,Xl=0,0!==(6&Il))throw Error(o(327));var n=e.callbackNode;if(_c()&&e.callbackNode!==n)return null;var r=ht(e,e===jl?Al:0);if(0===r)return null;if(0!==(30&r)||0!==(r&e.expiredLanes)||t)t=mc(e,r);else{t=r;var i=Il;Il|=2;var s=fc();for(jl===e&&Al===t||(Wl=null,Bl=Qe()+500,hc(e,t));;)try{bc();break}catch(l){pc(e,l)}To(),Cl.current=s,Il=i,null!==Pl?t=0:(jl=null,Al=0,t=Ol)}if(0!==t){if(2===t&&(0!==(i=ft(e))&&(r=i,t=oc(e,i))),1===t)throw n=Dl,hc(e,0),ac(e,r),rc(e,Qe()),n;if(6===t)ac(e,r);else{if(i=e.current.alternate,0===(30&r)&&!function(e){for(var t=e;;){if(16384&t.flags){var n=t.updateQueue;if(null!==n&&null!==(n=n.stores))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!ar(o(),i))return!1}catch(a){return!1}}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}(i)&&(2===(t=mc(e,r))&&(0!==(s=ft(e))&&(r=s,t=oc(e,s))),1===t))throw n=Dl,hc(e,0),ac(e,r),rc(e,Qe()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(o(345));case 2:case 5:wc(e,Ul,Wl);break;case 3:if(ac(e,r),(130023424&r)===r&&10<(t=$l+500-Qe())){if(0!==ht(e,0))break;if(((i=e.suspendedLanes)&r)!==r){ec(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=ri(wc.bind(null,e,Ul,Wl),t);break}wc(e,Ul,Wl);break;case 4:if(ac(e,r),(4194240&r)===r)break;for(t=e.eventTimes,i=-1;0<r;){var a=31-st(r);s=1<<a,(a=t[a])>i&&(i=a),r&=~s}if(r=i,10<(r=(120>(r=Qe()-r)?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Sl(r/1960))-r)){e.timeoutHandle=ri(wc.bind(null,e,Ul,Wl),r);break}wc(e,Ul,Wl);break;default:throw Error(o(329))}}}return rc(e,Qe()),e.callbackNode===n?ic.bind(null,e):null}function oc(e,t){var n=zl;return e.current.memoizedState.isDehydrated&&(hc(e,t).flags|=256),2!==(e=mc(e,t))&&(t=Ul,Ul=n,null!==t&&sc(t)),e}function sc(e){null===Ul?Ul=e:Ul.push.apply(Ul,e)}function ac(e,t){for(t&=~Ml,t&=~Fl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-st(t),r=1<<n;e[n]=-1,t&=~r}}function lc(e){if(0!==(6&Il))throw Error(o(327));_c();var t=ht(e,0);if(0===(1&t))return rc(e,Qe()),null;var n=mc(e,t);if(0!==e.tag&&2===n){var r=ft(e);0!==r&&(t=r,n=oc(e,r))}if(1===n)throw n=Dl,hc(e,0),ac(e,t),rc(e,Qe()),n;if(6===n)throw Error(o(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,wc(e,Ul,Wl),rc(e,Qe()),null}function cc(e,t){var n=Il;Il|=1;try{return e(t)}finally{0===(Il=n)&&(Bl=Qe()+500,zi&&Bi())}}function dc(e){null!==Yl&&0===Yl.tag&&0===(6&Il)&&_c();var t=Il;Il|=1;var n=Tl.transition,r=vt;try{if(Tl.transition=null,vt=1,e)return e()}finally{vt=r,Tl.transition=n,0===(6&(Il=t))&&Bi()}}function uc(){Nl=Rl.current,Ci(Rl)}function hc(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,ii(n)),null!==Pl)for(n=Pl.return;null!==n;){var r=n;switch(to(r),r.tag){case 1:null!==(r=r.type.childContextTypes)&&void 0!==r&&Ri();break;case 3:Qo(),Ci(ji),Ci(Ii),rs();break;case 5:Xo(r);break;case 4:Qo();break;case 13:case 19:Ci(es);break;case 10:Io(r.type._context);break;case 22:case 23:uc()}n=n.return}if(jl=e,Pl=e=Rc(e.current,null),Al=Nl=t,Ol=0,Dl=null,Ml=Fl=Ll=0,Ul=zl=null,null!==No){for(t=0;t<No.length;t++)if(null!==(r=(n=No[t]).interleaved)){n.interleaved=null;var i=r.next,o=n.pending;if(null!==o){var s=o.next;o.next=i,r.next=s}n.pending=r}No=null}return e}function pc(e,t){for(;;){var n=Pl;try{if(To(),is.current=Js,ds){for(var r=as.memoizedState;null!==r;){var i=r.queue;null!==i&&(i.pending=null),r=r.next}ds=!1}if(ss=0,cs=ls=as=null,us=!1,hs=0,El.current=null,null===n||null===n.return){Ol=1,Dl=t,Pl=null;break}e:{var s=e,a=n.return,l=n,c=t;if(t=Al,l.flags|=32768,null!==c&&"object"===typeof c&&"function"===typeof c.then){var d=c,u=l,h=u.tag;if(0===(1&u.mode)&&(0===h||11===h||15===h)){var p=u.alternate;p?(u.updateQueue=p.updateQueue,u.memoizedState=p.memoizedState,u.lanes=p.lanes):(u.updateQueue=null,u.memoizedState=null)}var f=ma(a);if(null!==f){f.flags&=-257,ya(f,a,l,0,t),1&f.mode&&ga(s,d,t),c=d;var g=(t=f).updateQueue;if(null===g){var m=new Set;m.add(c),t.updateQueue=m}else g.add(c);break e}if(0===(1&t)){ga(s,d,t),gc();break e}c=Error(o(426))}else if(io&&1&l.mode){var y=ma(a);if(null!==y){0===(65536&y.flags)&&(y.flags|=256),ya(y,a,l,0,t),go(ca(c,l));break e}}s=c=ca(c,l),4!==Ol&&(Ol=2),null===zl?zl=[s]:zl.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t,Bo(s,pa(0,c,t));break e;case 1:l=c;var b=s.type,v=s.stateNode;if(0===(128&s.flags)&&("function"===typeof b.getDerivedStateFromError||null!==v&&"function"===typeof v.componentDidCatch&&(null===ql||!ql.has(v)))){s.flags|=65536,t&=-t,s.lanes|=t,Bo(s,fa(s,l,t));break e}}s=s.return}while(null!==s)}xc(n)}catch(x){t=x,Pl===n&&null!==n&&(Pl=n=n.return);continue}break}}function fc(){var e=Cl.current;return Cl.current=Js,null===e?Js:e}function gc(){0!==Ol&&3!==Ol&&2!==Ol||(Ol=4),null===jl||0===(268435455&Ll)&&0===(268435455&Fl)||ac(jl,Al)}function mc(e,t){var n=Il;Il|=2;var r=fc();for(jl===e&&Al===t||(Wl=null,hc(e,t));;)try{yc();break}catch(i){pc(e,i)}if(To(),Il=n,Cl.current=r,null!==Pl)throw Error(o(261));return jl=null,Al=0,Ol}function yc(){for(;null!==Pl;)vc(Pl)}function bc(){for(;null!==Pl&&!Ge();)vc(Pl)}function vc(e){var t=kl(e.alternate,e,Nl);e.memoizedProps=e.pendingProps,null===t?xc(e):Pl=t,El.current=null}function xc(e){var t=e;do{var n=t.alternate;if(e=t.return,0===(32768&t.flags)){if(null!==(n=Ka(n,t,Nl)))return void(Pl=n)}else{if(null!==(n=Ya(n,t)))return n.flags&=32767,void(Pl=n);if(null===e)return Ol=6,void(Pl=null);e.flags|=32768,e.subtreeFlags=0,e.deletions=null}if(null!==(t=t.sibling))return void(Pl=t);Pl=t=e}while(null!==t);0===Ol&&(Ol=5)}function wc(e,t,n){var r=vt,i=Tl.transition;try{Tl.transition=null,vt=1,function(e,t,n,r){do{_c()}while(null!==Yl);if(0!==(6&Il))throw Error(o(327));n=e.finishedWork;var i=e.finishedLanes;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(o(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(function(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-st(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}(e,s),e===jl&&(Pl=jl=null,Al=0),0===(2064&n.subtreeFlags)&&0===(2064&n.flags)||Kl||(Kl=!0,jc(tt,(function(){return _c(),null}))),s=0!==(15990&n.flags),0!==(15990&n.subtreeFlags)||s){s=Tl.transition,Tl.transition=null;var a=vt;vt=1;var l=Il;Il|=4,El.current=null,function(e,t){if(ei=Ht,pr(e=hr())){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch(w){n=null;break e}var a=0,l=-1,c=-1,d=0,u=0,h=e,p=null;t:for(;;){for(var f;h!==n||0!==i&&3!==h.nodeType||(l=a+i),h!==s||0!==r&&3!==h.nodeType||(c=a+r),3===h.nodeType&&(a+=h.nodeValue.length),null!==(f=h.firstChild);)p=h,h=f;for(;;){if(h===e)break t;if(p===n&&++d===i&&(l=a),p===s&&++u===r&&(c=a),null!==(f=h.nextSibling))break;p=(h=p).parentNode}h=f}n=-1===l||-1===c?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(ti={focusedElem:e,selectionRange:n},Ht=!1,Ja=t;null!==Ja;)if(e=(t=Ja).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Ja=e;else for(;null!==Ja;){t=Ja;try{var g=t.alternate;if(0!==(1024&t.flags))switch(t.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break;case 1:if(null!==g){var m=g.memoizedProps,y=g.memoizedState,b=t.stateNode,v=b.getSnapshotBeforeUpdate(t.elementType===t.type?m:na(t.type,m),y);b.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var x=t.stateNode.containerInfo;1===x.nodeType?x.textContent="":9===x.nodeType&&x.documentElement&&x.removeChild(x.documentElement);break;default:throw Error(o(163))}}catch(w){Sc(t,t.return,w)}if(null!==(e=t.sibling)){e.return=t.return,Ja=e;break}Ja=t.return}g=tl,tl=!1}(e,n),ml(n,e),fr(ti),Ht=!!ei,ti=ei=null,e.current=n,bl(n,e,i),Ze(),Il=l,vt=a,Tl.transition=s}else e.current=n;if(Kl&&(Kl=!1,Yl=e,Gl=i),s=e.pendingLanes,0===s&&(ql=null),function(e){if(ot&&"function"===typeof ot.onCommitFiberRoot)try{ot.onCommitFiberRoot(it,e,void 0,128===(128&e.current.flags))}catch(t){}}(n.stateNode),rc(e,Qe()),null!==t)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Hl)throw Hl=!1,e=Vl,Vl=null,e;0!==(1&Gl)&&0!==e.tag&&_c(),s=e.pendingLanes,0!==(1&s)?e===Ql?Zl++:(Zl=0,Ql=e):Zl=0,Bi()}(e,t,n,r)}finally{Tl.transition=i,vt=r}return null}function _c(){if(null!==Yl){var e=xt(Gl),t=Tl.transition,n=vt;try{if(Tl.transition=null,vt=16>e?16:e,null===Yl)var r=!1;else{if(e=Yl,Yl=null,Gl=0,0!==(6&Il))throw Error(o(331));var i=Il;for(Il|=4,Ja=e.current;null!==Ja;){var s=Ja,a=s.child;if(0!==(16&Ja.flags)){var l=s.deletions;if(null!==l){for(var c=0;c<l.length;c++){var d=l[c];for(Ja=d;null!==Ja;){var u=Ja;switch(u.tag){case 0:case 11:case 15:nl(8,u,s)}var h=u.child;if(null!==h)h.return=u,Ja=h;else for(;null!==Ja;){var p=(u=Ja).sibling,f=u.return;if(ol(u),u===d){Ja=null;break}if(null!==p){p.return=f,Ja=p;break}Ja=f}}}var g=s.alternate;if(null!==g){var m=g.child;if(null!==m){g.child=null;do{var y=m.sibling;m.sibling=null,m=y}while(null!==m)}}Ja=s}}if(0!==(2064&s.subtreeFlags)&&null!==a)a.return=s,Ja=a;else e:for(;null!==Ja;){if(0!==(2048&(s=Ja).flags))switch(s.tag){case 0:case 11:case 15:nl(9,s,s.return)}var b=s.sibling;if(null!==b){b.return=s.return,Ja=b;break e}Ja=s.return}}var v=e.current;for(Ja=v;null!==Ja;){var x=(a=Ja).child;if(0!==(2064&a.subtreeFlags)&&null!==x)x.return=a,Ja=x;else e:for(a=v;null!==Ja;){if(0!==(2048&(l=Ja).flags))try{switch(l.tag){case 0:case 11:case 15:rl(9,l)}}catch(_){Sc(l,l.return,_)}if(l===a){Ja=null;break e}var w=l.sibling;if(null!==w){w.return=l.return,Ja=w;break e}Ja=l.return}}if(Il=i,Bi(),ot&&"function"===typeof ot.onPostCommitFiberRoot)try{ot.onPostCommitFiberRoot(it,e)}catch(_){}r=!0}return r}finally{vt=n,Tl.transition=t}}return!1}function kc(e,t,n){e=Uo(e,t=pa(0,t=ca(n,t),1),1),t=ec(),null!==e&&(yt(e,1,t),rc(e,t))}function Sc(e,t,n){if(3===e.tag)kc(e,e,n);else for(;null!==t;){if(3===t.tag){kc(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===ql||!ql.has(r))){t=Uo(t,e=fa(t,e=ca(n,e),1),1),e=ec(),null!==t&&(yt(t,1,e),rc(t,e));break}}t=t.return}}function Cc(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=ec(),e.pingedLanes|=e.suspendedLanes&n,jl===e&&(Al&n)===n&&(4===Ol||3===Ol&&(130023424&Al)===Al&&500>Qe()-$l?hc(e,0):Ml|=n),rc(e,t)}function Ec(e,t){0===t&&(0===(1&e.mode)?t=1:(t=dt,0===(130023424&(dt<<=1))&&(dt=4194304)));var n=ec();null!==(e=Do(e,t))&&(yt(e,t,n),rc(e,n))}function Tc(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),Ec(e,n)}function Ic(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;null!==i&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(o(314))}null!==r&&r.delete(t),Ec(e,n)}function jc(e,t){return Ke(e,t)}function Pc(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ac(e,t,n,r){return new Pc(e,t,n,r)}function Nc(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Rc(e,t){var n=e.alternate;return null===n?((n=Ac(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=14680064&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Oc(e,t,n,r,i,s){var a=2;if(r=e,"function"===typeof e)Nc(e)&&(a=1);else if("string"===typeof e)a=5;else e:switch(e){case k:return Dc(n.children,i,s,t);case S:a=8,i|=8;break;case C:return(e=Ac(12,n,t,2|i)).elementType=C,e.lanes=s,e;case j:return(e=Ac(13,n,t,i)).elementType=j,e.lanes=s,e;case P:return(e=Ac(19,n,t,i)).elementType=P,e.lanes=s,e;case R:return Lc(n,i,s,t);default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case E:a=10;break e;case T:a=9;break e;case I:a=11;break e;case A:a=14;break e;case N:a=16,r=null;break e}throw Error(o(130,null==e?e:typeof e,""))}return(t=Ac(a,n,t,i)).elementType=e,t.type=r,t.lanes=s,t}function Dc(e,t,n,r){return(e=Ac(7,e,r,t)).lanes=n,e}function Lc(e,t,n,r){return(e=Ac(22,e,r,t)).elementType=R,e.lanes=n,e.stateNode={isHidden:!1},e}function Fc(e,t,n){return(e=Ac(6,e,null,t)).lanes=n,e}function Mc(e,t,n){return(t=Ac(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function zc(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=mt(0),this.expirationTimes=mt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mt(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Uc(e,t,n,r,i,o,s,a,l){return e=new zc(e,t,n,a,l),1===t?(t=1,!0===o&&(t|=8)):t=0,o=Ac(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Fo(o),e}function $c(e){if(!e)return Ti;e:{if(Be(e=e._reactInternals)!==e||1!==e.tag)throw Error(o(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ni(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(null!==t);throw Error(o(171))}if(1===e.tag){var n=e.type;if(Ni(n))return Di(e,n,t)}return t}function Bc(e,t,n,r,i,o,s,a,l){return(e=Uc(n,r,!0,e,0,o,0,a,l)).context=$c(null),n=e.current,(o=zo(r=ec(),i=tc(n))).callback=void 0!==t&&null!==t?t:null,Uo(n,o,i),e.current.lanes=i,yt(e,i,r),rc(e,r),e}function Wc(e,t,n,r){var i=t.current,o=ec(),s=tc(i);return n=$c(n),null===t.context?t.context=n:t.pendingContext=n,(t=zo(o,s)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),null!==(e=Uo(i,t,s))&&(nc(e,i,s,o),$o(e,i,s)),s}function Hc(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function Vc(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function qc(e,t){Vc(e,t),(e=e.alternate)&&Vc(e,t)}kl=function(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps||ji.current)va=!0;else{if(0===(e.lanes&n)&&0===(128&t.flags))return va=!1,function(e,t,n){switch(t.tag){case 3:ja(t),fo();break;case 5:Jo(t);break;case 1:Ni(t.type)&&Li(t);break;case 4:Zo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;Ei(ko,r._currentValue),r._currentValue=i;break;case 13:if(null!==(r=t.memoizedState))return null!==r.dehydrated?(Ei(es,1&es.current),t.flags|=128,null):0!==(n&t.child.childLanes)?Fa(e,t,n):(Ei(es,1&es.current),null!==(e=Ha(e,t,n))?e.sibling:null);Ei(es,1&es.current);break;case 19:if(r=0!==(n&t.childLanes),0!==(128&e.flags)){if(r)return Ba(e,t,n);t.flags|=128}if(null!==(i=t.memoizedState)&&(i.rendering=null,i.tail=null,i.lastEffect=null),Ei(es,es.current),r)break;return null;case 22:case 23:return t.lanes=0,Sa(e,t,n)}return Ha(e,t,n)}(e,t,n);va=0!==(131072&e.flags)}else va=!1,io&&0!==(1048576&t.flags)&&Xi(t,qi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Wa(e,t),e=t.pendingProps;var i=Ai(t,Ii.current);Po(t,n),i=ms(null,t,r,e,i,n);var s=ys();return t.flags|=1,"object"===typeof i&&null!==i&&"function"===typeof i.render&&void 0===i.$$typeof?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ni(r)?(s=!0,Li(t)):s=!1,t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,Fo(t),i.updater=ia,t.stateNode=i,i._reactInternals=t,la(t,r,e,n),t=Ia(null,t,r,!0,s,n)):(t.tag=0,io&&s&&eo(t),xa(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Wa(e,t),e=t.pendingProps,r=(i=r._init)(r._payload),t.type=r,i=t.tag=function(e){if("function"===typeof e)return Nc(e)?1:0;if(void 0!==e&&null!==e){if((e=e.$$typeof)===I)return 11;if(e===A)return 14}return 2}(r),e=na(r,e),i){case 0:t=Ea(null,t,r,e,n);break e;case 1:t=Ta(null,t,r,e,n);break e;case 11:t=wa(null,t,r,e,n);break e;case 14:t=_a(null,t,r,na(r.type,e),n);break e}throw Error(o(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,Ea(e,t,r,i=t.elementType===r?i:na(r,i),n);case 1:return r=t.type,i=t.pendingProps,Ta(e,t,r,i=t.elementType===r?i:na(r,i),n);case 3:e:{if(ja(t),null===e)throw Error(o(387));r=t.pendingProps,i=(s=t.memoizedState).element,Mo(e,t),Wo(t,r,null,n);var a=t.memoizedState;if(r=a.element,s.isDehydrated){if(s={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=s,t.memoizedState=s,256&t.flags){t=Pa(e,t,r,n,i=ca(Error(o(423)),t));break e}if(r!==i){t=Pa(e,t,r,n,i=ca(Error(o(424)),t));break e}for(ro=ci(t.stateNode.containerInfo.firstChild),no=t,io=!0,oo=null,n=_o(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(fo(),r===i){t=Ha(e,t,n);break e}xa(e,t,r,n)}t=t.child}return t;case 5:return Jo(t),null===e&&co(t),r=t.type,i=t.pendingProps,s=null!==e?e.memoizedProps:null,a=i.children,ni(r,i)?a=null:null!==s&&ni(r,s)&&(t.flags|=32),Ca(e,t),xa(e,t,a,n),t.child;case 6:return null===e&&co(t),null;case 13:return Fa(e,t,n);case 4:return Zo(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=wo(t,null,r,n):xa(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,wa(e,t,r,i=t.elementType===r?i:na(r,i),n);case 7:return xa(e,t,t.pendingProps,n),t.child;case 8:case 12:return xa(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,s=t.memoizedProps,a=i.value,Ei(ko,r._currentValue),r._currentValue=a,null!==s)if(ar(s.value,a)){if(s.children===i.children&&!ji.current){t=Ha(e,t,n);break e}}else for(null!==(s=t.child)&&(s.return=t);null!==s;){var l=s.dependencies;if(null!==l){a=s.child;for(var c=l.firstContext;null!==c;){if(c.context===r){if(1===s.tag){(c=zo(-1,n&-n)).tag=2;var d=s.updateQueue;if(null!==d){var u=(d=d.shared).pending;null===u?c.next=c:(c.next=u.next,u.next=c),d.pending=c}}s.lanes|=n,null!==(c=s.alternate)&&(c.lanes|=n),jo(s.return,n,t),l.lanes|=n;break}c=c.next}}else if(10===s.tag)a=s.type===t.type?null:s.child;else if(18===s.tag){if(null===(a=s.return))throw Error(o(341));a.lanes|=n,null!==(l=a.alternate)&&(l.lanes|=n),jo(a,n,t),a=s.sibling}else a=s.child;if(null!==a)a.return=s;else for(a=s;null!==a;){if(a===t){a=null;break}if(null!==(s=a.sibling)){s.return=a.return,a=s;break}a=a.return}s=a}xa(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Po(t,n),r=r(i=Ao(i)),t.flags|=1,xa(e,t,r,n),t.child;case 14:return i=na(r=t.type,t.pendingProps),_a(e,t,r,i=na(r.type,i),n);case 15:return ka(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:na(r,i),Wa(e,t),t.tag=1,Ni(r)?(e=!0,Li(t)):e=!1,Po(t,n),sa(t,r,i),la(t,r,i,n),Ia(null,t,r,!0,e,n);case 19:return Ba(e,t,n);case 22:return Sa(e,t,n)}throw Error(o(156,t.tag))};var Kc="function"===typeof reportError?reportError:function(e){console.error(e)};function Yc(e){this._internalRoot=e}function Gc(e){this._internalRoot=e}function Zc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function Qc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function Jc(){}function Xc(e,t,n,r,i){var o=n._reactRootContainer;if(o){var s=o;if("function"===typeof i){var a=i;i=function(){var e=Hc(s);a.call(e)}}Wc(t,s,e,i)}else s=function(e,t,n,r,i){if(i){if("function"===typeof r){var o=r;r=function(){var e=Hc(s);o.call(e)}}var s=Bc(t,r,e,0,null,!1,0,"",Jc);return e._reactRootContainer=s,e[fi]=s.current,Br(8===e.nodeType?e.parentNode:e),dc(),s}for(;i=e.lastChild;)e.removeChild(i);if("function"===typeof r){var a=r;r=function(){var e=Hc(l);a.call(e)}}var l=Uc(e,0,!1,null,0,!1,0,"",Jc);return e._reactRootContainer=l,e[fi]=l.current,Br(8===e.nodeType?e.parentNode:e),dc((function(){Wc(t,l,n,r)})),l}(n,t,e,i,r);return Hc(s)}Gc.prototype.render=Yc.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(o(409));Wc(e,t,null,null)},Gc.prototype.unmount=Yc.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;dc((function(){Wc(null,e,null,null)})),t[fi]=null}},Gc.prototype.unstable_scheduleHydration=function(e){if(e){var t=St();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Rt.length&&0!==t&&t<Rt[n].priority;n++);Rt.splice(n,0,e),0===n&&Ft(e)}},wt=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=ut(t.pendingLanes);0!==n&&(bt(t,1|n),rc(t,Qe()),0===(6&Il)&&(Bl=Qe()+500,Bi()))}break;case 13:dc((function(){var t=Do(e,1);if(null!==t){var n=ec();nc(t,e,1,n)}})),qc(e,1)}},_t=function(e){if(13===e.tag){var t=Do(e,134217728);if(null!==t)nc(t,e,134217728,ec());qc(e,134217728)}},kt=function(e){if(13===e.tag){var t=tc(e),n=Do(e,t);if(null!==n)nc(n,e,t,ec());qc(e,t)}},St=function(){return vt},Ct=function(e,t){var n=vt;try{return vt=e,t()}finally{vt=n}},_e=function(e,t,n){switch(t){case"input":if(J(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=wi(r);if(!i)throw Error(o(90));K(r),J(r,i)}}}break;case"textarea":oe(e,n);break;case"select":null!=(t=n.value)&&ne(e,!!n.multiple,t,!1)}},Ie=cc,je=dc;var ed={usingClientEntryPoint:!1,Events:[vi,xi,wi,Ee,Te,cc]},td={findFiberByHostInstance:bi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},nd={bundleType:td.bundleType,version:td.version,rendererPackageName:td.rendererPackageName,rendererConfig:td.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:x.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Ve(e))?null:e.stateNode},findFiberByHostInstance:td.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var rd=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!rd.isDisabled&&rd.supportsFiber)try{it=rd.inject(nd),ot=rd}catch(de){}}t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ed,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Zc(t))throw Error(o(200));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:_,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.createRoot=function(e,t){if(!Zc(e))throw Error(o(299));var n=!1,r="",i=Kc;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onRecoverableError&&(i=t.onRecoverableError)),t=Uc(e,1,!1,null,0,n,0,r,i),e[fi]=t.current,Br(8===e.nodeType?e.parentNode:e),new Yc(t)},t.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(o(188));throw e=Object.keys(e).join(","),Error(o(268,e))}return e=null===(e=Ve(t))?null:e.stateNode},t.flushSync=function(e){return dc(e)},t.hydrate=function(e,t,n){if(!Qc(t))throw Error(o(200));return Xc(null,e,t,!0,n)},t.hydrateRoot=function(e,t,n){if(!Zc(e))throw Error(o(405));var r=null!=n&&n.hydratedSources||null,i=!1,s="",a=Kc;if(null!==n&&void 0!==n&&(!0===n.unstable_strictMode&&(i=!0),void 0!==n.identifierPrefix&&(s=n.identifierPrefix),void 0!==n.onRecoverableError&&(a=n.onRecoverableError)),t=Bc(t,null,e,1,null!=n?n:null,i,0,s,a),e[fi]=t.current,Br(e),r)for(e=0;e<r.length;e++)i=(i=(n=r[e])._getVersion)(n._source),null==t.mutableSourceEagerHydrationData?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Gc(t)},t.render=function(e,t,n){if(!Qc(t))throw Error(o(200));return Xc(null,e,t,!1,n)},t.unmountComponentAtNode=function(e){if(!Qc(e))throw Error(o(40));return!!e._reactRootContainer&&(dc((function(){Xc(null,null,e,!1,(function(){e._reactRootContainer=null,e[fi]=null}))})),!0)},t.unstable_batchedUpdates=cc,t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Qc(n))throw Error(o(200));if(null==e||void 0===e._reactInternals)throw Error(o(38));return Xc(e,t,n,!1,r)},t.version="18.3.1-next-f1338f8080-20240426"},776:(e,t,n)=>{"use strict";n.d(t,{cY:()=>x,FA:()=>R,g:()=>N,gz:()=>G,dM:()=>A,vA:()=>i,Hk:()=>o,K3:()=>a,u:()=>u,KA:()=>c,Uj:()=>d,gR:()=>U,Fy:()=>w,tD:()=>Z,A4:()=>h,bD:()=>H,dI:()=>X,hp:()=>Y,T9:()=>b,Tj:()=>m,yU:()=>y,XA:()=>v,Ku:()=>ne,ZQ:()=>_,qc:()=>z,sr:()=>C,zJ:()=>re,c1:()=>S,Im:()=>B,lT:()=>T,zW:()=>j,jZ:()=>k,$g:()=>I,lV:()=>E,Cv:()=>M,$L:()=>D,kH:()=>W,gE:()=>ie,Am:()=>q,I9:()=>K,yw:()=>$,OE:()=>te,kj:()=>ee,As:()=>L,eX:()=>P});const r={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},i=function(e,t){if(!e)throw o(t)},o=function(e){return new Error("Firebase Database ("+r.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)},s=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296===(64512&i)&&r+1<e.length&&56320===(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},a={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],o=i+1<e.length,s=o?e[i+1]:0,a=i+2<e.length,l=a?e[i+2]:0,c=t>>2,d=(3&t)<<4|s>>4;let u=(15&s)<<2|l>>6,h=63&l;a||(h=64,o||(u=64)),r.push(n[c],n[d],n[u],n[h])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(s(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){const o=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(o>>10)),t[r++]=String.fromCharCode(56320+(1023&o))}else{const o=e[n++],s=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&s)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],o=i<e.length?n[e.charAt(i)]:0;++i;const s=i<e.length?n[e.charAt(i)]:64;++i;const a=i<e.length?n[e.charAt(i)]:64;if(++i,null==t||null==o||null==s||null==a)throw new l;const c=t<<2|o>>4;if(r.push(c),64!==s){const e=o<<4&240|s>>2;if(r.push(e),64!==a){const e=s<<6&192|a;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class l extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const c=function(e){const t=s(e);return a.encodeByteArray(t,!0)},d=function(e){return c(e).replace(/\./g,"")},u=function(e){try{return a.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function h(e){return p(void 0,e)}function p(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&"__proto__"!==n&&(e[n]=p(e[n],t[n]));return e}const f=()=>function(){if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof n.g)return n.g;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,g=()=>{try{return f()||(()=>{if("undefined"===typeof process)return;const e={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"===typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&u(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},m=e=>g()?.emulatorHosts?.[e],y=e=>{const t=m(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},b=()=>g()?.config,v=e=>g()?.[`_${e}`];class x{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"===typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}function w(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...e};return[d(JSON.stringify({alg:"none",type:"JWT"})),d(JSON.stringify(o)),""].join(".")}function _(){return"undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:""}function k(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_())}function S(){return"undefined"!==typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function C(){const e="object"===typeof chrome?chrome.runtime:"object"===typeof browser?browser.runtime:void 0;return"object"===typeof e&&void 0!==e.id}function E(){return"object"===typeof navigator&&"ReactNative"===navigator.product}function T(){const e=_();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function I(){return!0===r.NODE_CLIENT||!0===r.NODE_ADMIN}function j(){try{return"object"===typeof indexedDB}catch(e){return!1}}function P(){return new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(n){t(n)}}))}function A(){return!("undefined"===typeof navigator||!navigator.cookieEnabled)}class N extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,N.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,R.prototype.create)}}class R{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e){const t=(arguments.length<=1?void 0:arguments[1])||{},n=`${this.service}/${e}`,r=this.errors[e],i=r?function(e,t){return e.replace(O,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(r,t):"Error",o=`${this.serviceName}: ${i} (${n}).`;return new N(n,o,t)}}const O=/\{\$([^}]+)}/g;function D(e){return JSON.parse(e)}function L(e){return JSON.stringify(e)}const F=function(e){let t={},n={},r={},i="";try{const o=e.split(".");t=D(u(o[0])||""),n=D(u(o[1])||""),i=o[2],r=n.d||{},delete n.d}catch(o){}return{header:t,claims:n,data:r,signature:i}},M=function(e){const t=F(e).claims;return!!t&&"object"===typeof t&&t.hasOwnProperty("iat")},z=function(e){const t=F(e).claims;return"object"===typeof t&&!0===t.admin};function U(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function $(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function B(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function W(e,t,n){const r={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}function H(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],o=t[i];if(V(n)&&V(o)){if(!H(n,o))return!1}else if(n!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function V(e){return null!==e&&"object"===typeof e}function q(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function K(e){const t={};return e.replace(/^\?/,"").split("&").forEach((e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}})),t}function Y(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class G{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if("string"===typeof e)for(let d=0;d<16;d++)n[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)n[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const e=n[d-3]^n[d-8]^n[d-14]^n[d-16];n[d]=4294967295&(e<<1|e>>>31)}let r,i,o=this.chain_[0],s=this.chain_[1],a=this.chain_[2],l=this.chain_[3],c=this.chain_[4];for(let d=0;d<80;d++){d<40?d<20?(r=l^s&(a^l),i=1518500249):(r=s^a^l,i=1859775393):d<60?(r=s&a|l&(s|a),i=2400959708):(r=s^a^l,i=3395469782);const e=(o<<5|o>>>27)+r+c+i+n[d]&4294967295;c=l,l=a,a=4294967295&(s<<30|s>>>2),s=o,o=e}this.chain_[0]=this.chain_[0]+o&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);const n=t-this.blockSize;let r=0;const i=this.buf_;let o=this.inbuf_;for(;r<t;){if(0===o)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if("string"===typeof e){for(;r<t;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<t;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let r=0;r<5;r++)for(let t=24;t>=0;t-=8)e[n]=this.chain_[r]>>t&255,++n;return e}}function Z(e,t){const n=new Q(e,t);return n.subscribe.bind(n)}class Q{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((()=>{e(this)})).catch((e=>{this.error(e)}))}next(e){this.forEachObserver((t=>{t.next(e)}))}error(e){this.forEachObserver((t=>{t.error(e)})),this.close(e)}complete(){this.forEachObserver((e=>{e.complete()})),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=function(e,t){if("object"!==typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"===typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=J),void 0===r.error&&(r.error=J),void 0===r.complete&&(r.complete=J);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}})),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then((()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!==typeof console&&console.error&&console.error(n)}}))}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((()=>{this.observers=void 0,this.onNoObservers=void 0})))}}function J(){}function X(e,t){return`${e} failed: ${t} argument `}const ee=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let o=e.charCodeAt(r);if(o>=55296&&o<=56319){const t=o-55296;r++,i(r<e.length,"Surrogate pair missing trail surrogate.");o=65536+(t<<10)+(e.charCodeAt(r)-56320)}o<128?t[n++]=o:o<2048?(t[n++]=o>>6|192,t[n++]=63&o|128):o<65536?(t[n++]=o>>12|224,t[n++]=o>>6&63|128,t[n++]=63&o|128):(t[n++]=o>>18|240,t[n++]=o>>12&63|128,t[n++]=o>>6&63|128,t[n++]=63&o|128)}return t},te=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};function ne(e){return e&&e._delegate?e._delegate:e}function re(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ie(e){return(await fetch(e,{credentials:"include"})).ok}},799:(e,t,n)=>{"use strict";n.d(t,{MR:()=>y,P2:()=>m});const r=(e,t)=>t.some((t=>e instanceof t));let i,o;const s=new WeakMap,a=new WeakMap,l=new WeakMap,c=new WeakMap,d=new WeakMap;let u={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return a.get(e);if("objectStoreNames"===t)return e.objectStoreNames||l.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return f(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function h(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(o||(o=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return e.apply(g(this),n),f(s.get(this))}:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return f(e.apply(g(this),n))}:function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];const o=e.call(g(this),t,...r);return l.set(o,t.sort?t.sort():[t]),f(o)}}function p(e){return"function"===typeof e?h(e):(e instanceof IDBTransaction&&function(e){if(a.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",o),e.removeEventListener("abort",o)},i=()=>{t(),r()},o=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",o),e.addEventListener("abort",o)}));a.set(e,t)}(e),r(e,i||(i=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(e,u):e)}function f(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",o)},i=()=>{t(f(e.result)),r()},o=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",o)}));return t.then((t=>{t instanceof IDBCursor&&s.set(t,e)})).catch((()=>{})),d.set(t,e),t}(e);if(c.has(e))return c.get(e);const t=p(e);return t!==e&&(c.set(e,t),d.set(t,e)),t}const g=e=>d.get(e);function m(e,t){let{blocked:n,upgrade:r,blocking:i,terminated:o}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const s=indexedDB.open(e,t),a=f(s);return r&&s.addEventListener("upgradeneeded",(e=>{r(f(s.result),e.oldVersion,e.newVersion,f(s.transaction),e)})),n&&s.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),a.then((e=>{o&&e.addEventListener("close",(()=>o())),i&&e.addEventListener("versionchange",(e=>i(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),a}function y(e){let{blocked:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",(e=>t(e.oldVersion,e))),f(n).then((()=>{}))}const b=["get","getKey","getAll","getAllKeys","count"],v=["put","add","delete","clear"],x=new Map;function w(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(x.get(t))return x.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=v.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!b.includes(n))return;const o=async function(e){const t=this.transaction(e,i?"readwrite":"readonly");let o=t.store;for(var s=arguments.length,a=new Array(s>1?s-1:0),l=1;l<s;l++)a[l-1]=arguments[l];return r&&(o=o.index(a.shift())),(await Promise.all([o[n](...a),i&&t.done]))[0]};return x.set(t,o),o}u=(e=>({...e,get:(t,n,r)=>w(t,n)||e.get(t,n,r),has:(t,n)=>!!w(t,n)||e.has(t,n)}))(u)},800:(e,t,n)=>{"use strict";n.d(t,{jf:()=>Fi,get:()=>Wi,C3:()=>oo,$1:()=>Qi,AU:()=>Yi,yX:()=>Mi,Zy:()=>Ki,kT:()=>Xi,VC:()=>zi,P:()=>eo,ref:()=>Li,TF:()=>Ui,c4:()=>co,O5:()=>ao,hZ:()=>$i,yo:()=>Bi});var r=n(150),i=n(606),o=n(776),s=n(965);const a="@firebase/database",l="1.1.2";let c="";function d(e){c=e}class u{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){null==t?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),(0,o.As)(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return null==t?null:(0,o.$L)(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}class h{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){null==t?delete this.cache_[e]:this.cache_[e]=t}get(e){return(0,o.gR)(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}const p=function(e){try{if("undefined"!==typeof window&&"undefined"!==typeof window[e]){const t=window[e];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new u(t)}}catch(t){}return new h},f=p("localStorage"),g=p("sessionStorage"),m=new s.Vy("@firebase/database"),y=function(){let e=1;return function(){return e++}}(),b=function(e){const t=(0,o.kj)(e),n=new o.gz;n.update(t);const r=n.digest();return o.K3.encodeByteArray(r)},v=function(){let e="";for(let t=0;t<arguments.length;t++){const n=t<0||arguments.length<=t?void 0:arguments[t];Array.isArray(n)||n&&"object"===typeof n&&"number"===typeof n.length?e+=v.apply(null,n):e+="object"===typeof n?(0,o.As)(n):n,e+=" "}return e};let x=null,w=!0;const _=function(e,t){(0,o.vA)(!t||!0===e||!1===e,"Can't turn on custom loggers persistently."),!0===e?(m.logLevel=s.$b.VERBOSE,x=m.log.bind(m),t&&g.set("logging_enabled",!0)):"function"===typeof e?x=e:(x=null,g.remove("logging_enabled"))},k=function(){if(!0===w&&(w=!1,null===x&&!0===g.get("logging_enabled")&&_(!0)),x){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];const r=v.apply(null,t);x(r)}},S=function(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];k(e,...n)}},C=function(){const e="FIREBASE INTERNAL ERROR: "+v(...arguments);m.error(e)},E=function(){const e=`FIREBASE FATAL ERROR: ${v(...arguments)}`;throw m.error(e),new Error(e)},T=function(){const e="FIREBASE WARNING: "+v(...arguments);m.warn(e)},I=function(e){return"number"===typeof e&&(e!==e||e===Number.POSITIVE_INFINITY||e===Number.NEGATIVE_INFINITY)},j="[MIN_NAME]",P="[MAX_NAME]",A=function(e,t){if(e===t)return 0;if(e===j||t===P)return-1;if(t===j||e===P)return 1;{const n=z(e),r=z(t);return null!==n?null!==r?n-r===0?e.length-t.length:n-r:-1:null!==r?1:e<t?-1:1}},N=function(e,t){return e===t?0:e<t?-1:1},R=function(e,t){if(t&&e in t)return t[e];throw new Error("Missing required key ("+e+") in object: "+(0,o.As)(t))},O=function(e){if("object"!==typeof e||null===e)return(0,o.As)(e);const t=[];for(const r in e)t.push(r);t.sort();let n="{";for(let r=0;r<t.length;r++)0!==r&&(n+=","),n+=(0,o.As)(t[r]),n+=":",n+=O(e[t[r]]);return n+="}",n},D=function(e,t){const n=e.length;if(n<=t)return[e];const r=[];for(let i=0;i<n;i+=t)i+t>n?r.push(e.substring(i,n)):r.push(e.substring(i,i+t));return r};function L(e,t){for(const n in e)e.hasOwnProperty(n)&&t(n,e[n])}const F=function(e){(0,o.vA)(!I(e),"Invalid JSON number");const t=1023;let n,r,i,s,a;0===e?(r=0,i=0,n=1/e===-1/0?1:0):(n=e<0,(e=Math.abs(e))>=Math.pow(2,-1022)?(s=Math.min(Math.floor(Math.log(e)/Math.LN2),t),r=s+t,i=Math.round(e*Math.pow(2,52-s)-Math.pow(2,52))):(r=0,i=Math.round(e/Math.pow(2,-1074))));const l=[];for(a=52;a;a-=1)l.push(i%2?1:0),i=Math.floor(i/2);for(a=11;a;a-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(n?1:0),l.reverse();const c=l.join("");let d="";for(a=0;a<64;a+=8){let e=parseInt(c.substr(a,8),2).toString(16);1===e.length&&(e="0"+e),d+=e}return d.toLowerCase()};const M=new RegExp("^-?(0*)\\d{1,10}$"),z=function(e){if(M.test(e)){const t=Number(e);if(t>=-2147483648&&t<=2147483647)return t}return null},U=function(e){try{e()}catch(t){setTimeout((()=>{const e=t.stack||"";throw T("Exception was thrown by user callback.",e),t}),Math.floor(0))}},$=function(e,t){const n=setTimeout(e,t);return"number"===typeof n&&"undefined"!==typeof Deno&&Deno.unrefTimer?Deno.unrefTimer(n):"object"===typeof n&&n.unref&&n.unref(),n};class B{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,(0,r.xZ)(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then((e=>this.appCheck=e))}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise(((t,n)=>{setTimeout((()=>{this.appCheck?this.getToken(e).then(t,n):t(null)}),0)}))}addTokenChangeListener(e){this.appCheckProvider?.get().then((t=>t.addTokenListener(e)))}notifyForInvalidToken(){T(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}class W{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit((e=>this.auth_=e))}getToken(e){return this.auth_?this.auth_.getToken(e).catch((e=>e&&"auth/token-not-initialized"===e.code?(k("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e))):new Promise(((t,n)=>{setTimeout((()=>{this.auth_?this.getToken(e).then(t,n):t(null)}),0)}))}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then((t=>t.addAuthTokenListener(e)))}removeTokenChangeListener(e){this.authProvider_.get().then((t=>t.removeAuthTokenListener(e)))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',T(e)}}class H{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}H.OWNER="owner";const V="5",q=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,K="ac",Y="websocket",G="long_polling";class Z{constructor(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"",s=arguments.length>6&&void 0!==arguments[6]&&arguments[6],a=arguments.length>7&&void 0!==arguments[7]&&arguments[7],l=arguments.length>8&&void 0!==arguments[8]?arguments[8]:null;this.secure=t,this.namespace=n,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=s,this.isUsingEmulator=a,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=f.get("host:"+e)||this._host}isCacheableHost(){return"s-"===this.internalHost.substr(0,2)}isCustomHost(){return"firebaseio.com"!==this._domain&&"firebaseio-demo.com"!==this._domain}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&f.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Q(e,t,n){let r;if((0,o.vA)("string"===typeof t,"typeof type must == string"),(0,o.vA)("object"===typeof n,"typeof params must == object"),t===Y)r=(e.secure?"wss://":"ws://")+e.internalHost+"/.ws?";else{if(t!==G)throw new Error("Unknown connection type: "+t);r=(e.secure?"https://":"http://")+e.internalHost+"/.lp?"}(function(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams})(e)&&(n.ns=e.namespace);const i=[];return L(n,((e,t)=>{i.push(e+"="+t)})),r+i.join("&")}class J{constructor(){this.counters_={}}incrementCounter(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;(0,o.gR)(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return(0,o.A4)(this.counters_)}}const X={},ee={};function te(e){const t=e.toString();return X[t]||(X[t]=new J),X[t]}class ne{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const e=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let t=0;t<e.length;++t)e[t]&&U((()=>{this.onMessage_(e[t])}));if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}const re="start";class ie{constructor(e,t,n,r,i,o,s){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.transportSessionId=o,this.lastSessionId=s,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=S(e),this.stats_=te(t),this.urlFn=e=>(this.appCheckToken&&(e[K]=this.appCheckToken),Q(t,G,e))}open(e,t){var n=this;this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new ne(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout((()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null}),Math.floor(3e4)),function(e){if((0,o.$g)()||"complete"===document.readyState)e();else{let t=!1;const n=function(){document.body?t||(t=!0,e()):setTimeout(n,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",(()=>{"complete"===document.readyState&&n()})),window.attachEvent("onload",n))}}((()=>{if(this.isClosed_)return;this.scriptTagHolder=new oe((function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];const[i,o,s,a,l]=t;if(n.incrementIncomingBytes_(t),n.scriptTagHolder)if(n.connectTimeoutTimer_&&(clearTimeout(n.connectTimeoutTimer_),n.connectTimeoutTimer_=null),n.everConnected_=!0,i===re)n.id=o,n.password=s;else{if("close"!==i)throw new Error("Unrecognized command received: "+i);o?(n.scriptTagHolder.sendNewPolls=!1,n.myPacketOrderer.closeAfter(o,(()=>{n.onClosed_()}))):n.onClosed_()}}),(function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];const[i,o]=t;n.incrementIncomingBytes_(t),n.myPacketOrderer.handleResponse(i,o)}),(()=>{this.onClosed_()}),this.urlFn);const e={};e[re]="t",e.ser=Math.floor(1e8*Math.random()),this.scriptTagHolder.uniqueCallbackIdentifier&&(e.cb=this.scriptTagHolder.uniqueCallbackIdentifier),e.v=V,this.transportSessionId&&(e.s=this.transportSessionId),this.lastSessionId&&(e.ls=this.lastSessionId),this.applicationId&&(e.p=this.applicationId),this.appCheckToken&&(e[K]=this.appCheckToken),"undefined"!==typeof location&&location.hostname&&q.test(location.hostname)&&(e.r="f");const t=this.urlFn(e);this.log_("Connecting via long-poll to "+t),this.scriptTagHolder.addTag(t,(()=>{}))}))}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ie.forceAllow_=!0}static forceDisallow(){ie.forceDisallow_=!0}static isAvailable(){return!(0,o.$g)()&&(!!ie.forceAllow_||!ie.forceDisallow_&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.UI))}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=(0,o.As)(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=(0,o.KA)(t),r=D(n,1840);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,t){if((0,o.$g)())return;this.myDisconnFrame=document.createElement("iframe");const n={dframe:"t"};n.id=e,n.pw=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=(0,o.As)(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class oe{constructor(e,t,n,r){if(this.onDisconnect=n,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(1e8*Math.random()),this.sendNewPolls=!0,(0,o.$g)())this.commandCB=e,this.onMessageCB=t;else{this.uniqueCallbackIdentifier=y(),window["pLPCommand"+this.uniqueCallbackIdentifier]=e,window["pRTLPCB"+this.uniqueCallbackIdentifier]=t,this.myIFrame=oe.createIFrame_();let n="";if(this.myIFrame.src&&"javascript:"===this.myIFrame.src.substr(0,11)){n='<script>document.domain="'+document.domain+'";<\/script>'}const r="<html><body>"+n+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(r),this.myIFrame.doc.close()}catch(i){k("frame writing exception"),i.stack&&k(i.stack),k(i)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",!document.body)throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";document.body.appendChild(e);try{e.contentWindow.document||k("No IE domain setting required")}catch(t){const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout((()=>{null!==this.myIFrame&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)}),Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e.id=this.myID,e.pw=this.myPW,e.ser=this.currentSerial;let t=this.urlFn(e),n="",r=0;for(;this.pendingSegs.length>0;){if(!(this.pendingSegs[0].d.length+30+n.length<=1870))break;{const e=this.pendingSegs.shift();n=n+"&seg"+r+"="+e.seg+"&ts"+r+"="+e.ts+"&d"+r+"="+e.d,r++}}return t+=n,this.addLongPollTag_(t,this.currentSerial),!0}return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},r=setTimeout(n,Math.floor(25e3));this.addTag(e,(()=>{clearTimeout(r),n()}))}addTag(e,t){(0,o.$g)()?this.doNodeLongPoll(e,t):setTimeout((()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const e=n.readyState;e&&"loaded"!==e&&"complete"!==e||(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{k("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch(n){}}),Math.floor(1))}}let se=null;"undefined"!==typeof MozWebSocket?se=MozWebSocket:"undefined"!==typeof WebSocket&&(se=WebSocket);class ae{constructor(e,t,n,r,i,o,s){this.connId=e,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=S(this.connId),this.stats_=te(t),this.connURL=ae.connectionURL_(t,o,s,r,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,r,i){const s={};return s.v=V,!(0,o.$g)()&&"undefined"!==typeof location&&location.hostname&&q.test(location.hostname)&&(s.r="f"),t&&(s.s=t),n&&(s.ls=n),r&&(s[K]=r),i&&(s.p=i),Q(e,Y,s)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,f.set("previous_websocket_failure",!0);try{let e;if((0,o.$g)()){const t=this.nodeAdmin?"AdminNode":"Node";e={headers:{"User-Agent":`Firebase/${V}/${c}/${process.platform}/${t}`,"X-Firebase-GMPID":this.applicationId||""}},this.authToken&&(e.headers.Authorization=`Bearer ${this.authToken}`),this.appCheckToken&&(e.headers["X-Firebase-AppCheck"]=this.appCheckToken);const n={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""},r=0===this.connURL.indexOf("wss://")?n.HTTPS_PROXY||n.https_proxy:n.HTTP_PROXY||n.http_proxy;r&&(e.proxy={origin:r})}this.mySock=new se(this.connURL,[],e)}catch(n){this.log_("Error instantiating WebSocket.");const e=n.message||n.data;return e&&this.log_(e),void this.onClosed_()}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=e=>{this.handleIncomingFrame(e)},this.mySock.onerror=e=>{this.log_("WebSocket error.  Closing connection.");const t=e.message||e.data;t&&this.log_(t),this.onClosed_()}}start(){}static forceDisallow(){ae.forceDisallow_=!0}static isAvailable(){let e=!1;if("undefined"!==typeof navigator&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&null!==se&&!ae.forceDisallow_}static previouslyFailed(){return f.isInMemoryStorage||!0===f.get("previous_websocket_failure")}markConnectionHealthy(){f.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const e=this.frames.join("");this.frames=null;const t=(0,o.$L)(e);this.onMessage(t)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if((0,o.vA)(null===this.frames,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(null===this.mySock)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),null!==this.frames)this.appendFrame_(t);else{const e=this.extractFrameCount_(t);null!==e&&this.appendFrame_(e)}}send(e){this.resetKeepAlive();const t=(0,o.As)(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=D(t,16384);n.length>1&&this.sendString_(String(n.length));for(let r=0;r<n.length;r++)this.sendString_(n[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval((()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()}),Math.floor(45e3))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ae.responsesRequiredToBeHealthy=2,ae.healthyTimeout=3e4;class le{static get ALL_TRANSPORTS(){return[ie,ae]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=ae&&ae.isAvailable();let n=t&&!ae.previouslyFailed();if(e.webSocketOnly&&(t||T("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[ae];else{const e=this.transports_=[];for(const t of le.ALL_TRANSPORTS)t&&t.isAvailable()&&e.push(t);le.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}le.globalTransportInitialized_=!1;class ce{constructor(e,t,n,r,i,o,s,a,l,c){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=o,this.onReady_=s,this.onDisconnect_=a,this.onKill_=l,this.lastSessionId=c,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=S("c:"+this.id+":"),this.transportManager_=new le(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout((()=>{this.conn_&&this.conn_.open(t,n)}),Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=$((()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>102400?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>10240?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))}),Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{2!==this.state_&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if("t"in e){const t=e.t;"a"===t?this.upgradeIfSecondaryHealthy_():"r"===t?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),this.tx_!==this.secondaryConn_&&this.rx_!==this.secondaryConn_||this.close()):"o"===t&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=R("t",e),n=R("d",e);if("c"===t)this.onSecondaryControl_(n);else{if("d"!==t)throw new Error("Unknown protocol layer: "+t);this.pendingDataMessages.push(n)}}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:"p",d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:"a",d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:"n",d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=R("t",e),n=R("d",e);"c"===t?this.onControl_(n):"d"===t&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=R("t",e);if("d"in e){const n=e.d;if("h"===t){const e={...n};this.repoInfo_.isUsingEmulator&&(e.h=this.repoInfo_.host),this.onHandshake_(e)}else if("n"===t){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let e=0;e<this.pendingDataMessages.length;++e)this.onDataMessage_(this.pendingDataMessages[e]);this.pendingDataMessages=[],this.tryCleanupConnection()}else"s"===t?this.onConnectionShutdown_(n):"r"===t?this.onReset_(n):"e"===t?C("Server Error: "+n):"o"===t?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):C("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,0===this.state_&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),V!==n&&T("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),$((()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())}),Math.floor(6e4))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,1===this.state_?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),0===this.primaryResponsesRequired_?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):$((()=>{this.sendPingOnPrimaryIfNecessary_()}),Math.floor(5e3))}sendPingOnPrimaryIfNecessary_(){this.isHealthy_||1!==this.state_||(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:"p",d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,this.tx_!==e&&this.rx_!==e||this.close()}onConnectionLost_(e){this.conn_=null,e||0!==this.state_?1===this.state_&&this.log_("Realtime connection lost."):(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(f.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(1!==this.state_)throw"Connection is not connected";this.tx_.send(e)}close(){2!==this.state_&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}class de{put(e,t,n,r){}merge(e,t,n,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}class ue{constructor(e){this.allowedEvents_=e,this.listeners_={},(0,o.vA)(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(let e=0;e<i.length;e++)i[e].callback.apply(i[e].context,n)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const r=this.getInitialEvent(e);r&&t.apply(n,r)}off(e,t,n){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===t&&(!n||n===r[i].context))return void r.splice(i,1)}validateEventType_(e){(0,o.vA)(this.allowedEvents_.find((t=>t===e)),"Unknown event: "+e)}}class he extends ue{static getInstance(){return new he}constructor(){super(["online"]),this.online_=!0,"undefined"===typeof window||"undefined"===typeof window.addEventListener||(0,o.jZ)()||(window.addEventListener("online",(()=>{this.online_||(this.online_=!0,this.trigger("online",!0))}),!1),window.addEventListener("offline",(()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))}),!1))}getInitialEvent(e){return(0,o.vA)("online"===e,"Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}class pe{constructor(e,t){if(void 0===t){this.pieces_=e.split("/");let t=0;for(let e=0;e<this.pieces_.length;e++)this.pieces_[e].length>0&&(this.pieces_[t]=this.pieces_[e],t++);this.pieces_.length=t,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)""!==this.pieces_[t]&&(e+="/"+this.pieces_[t]);return e||"/"}}function fe(){return new pe("")}function ge(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function me(e){return e.pieces_.length-e.pieceNum_}function ye(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new pe(e.pieces_,t)}function be(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function ve(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.pieces_.slice(e.pieceNum_+t)}function xe(e){if(e.pieceNum_>=e.pieces_.length)return null;const t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new pe(t,0)}function we(e,t){const n=[];for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);if(t instanceof pe)for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);else{const e=t.split("/");for(let t=0;t<e.length;t++)e[t].length>0&&n.push(e[t])}return new pe(n,0)}function _e(e){return e.pieceNum_>=e.pieces_.length}function ke(e,t){const n=ge(e),r=ge(t);if(null===n)return t;if(n===r)return ke(ye(e),ye(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+e+")")}function Se(e,t){const n=ve(e,0),r=ve(t,0);for(let i=0;i<n.length&&i<r.length;i++){const e=A(n[i],r[i]);if(0!==e)return e}return n.length===r.length?0:n.length<r.length?-1:1}function Ce(e,t){if(me(e)!==me(t))return!1;for(let n=e.pieceNum_,r=t.pieceNum_;n<=e.pieces_.length;n++,r++)if(e.pieces_[n]!==t.pieces_[r])return!1;return!0}function Ee(e,t){let n=e.pieceNum_,r=t.pieceNum_;if(me(e)>me(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[r])return!1;++n,++r}return!0}class Te{constructor(e,t){this.errorPrefix_=t,this.parts_=ve(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let n=0;n<this.parts_.length;n++)this.byteLength_+=(0,o.OE)(this.parts_[n]);Ie(this)}}function Ie(e){if(e.byteLength_>768)throw new Error(e.errorPrefix_+"has a key path longer than 768 bytes ("+e.byteLength_+").");if(e.parts_.length>32)throw new Error(e.errorPrefix_+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+je(e))}function je(e){return 0===e.parts_.length?"":"in property '"+e.parts_.join(".")+"'"}class Pe extends ue{static getInstance(){return new Pe}constructor(){let e,t;super(["visible"]),"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(t="visibilitychange",e="hidden"):"undefined"!==typeof document.mozHidden?(t="mozvisibilitychange",e="mozHidden"):"undefined"!==typeof document.msHidden?(t="msvisibilitychange",e="msHidden"):"undefined"!==typeof document.webkitHidden&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,(()=>{const t=!document[e];t!==this.visible_&&(this.visible_=t,this.trigger("visible",t))}),!1)}getInitialEvent(e){return(0,o.vA)("visible"===e,"Unknown event type: "+e),[this.visible_]}}const Ae=1e3;class Ne extends de{constructor(e,t,n,r,i,s,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=s,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Ne.nextPersistentConnectionId_++,this.log_=S("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ae,this.maxReconnectDelay_=3e5,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l&&!(0,o.$g)())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Pe.getInstance().on("visible",this.onVisible_,this),-1===e.host.indexOf("fblocal")&&he.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const r=++this.requestNumber_,i={r:r,a:e,b:t};this.log_((0,o.As)(i)),(0,o.vA)(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),n&&(this.requestCBHash_[r]=n)}get(e){this.initConnection_();const t=new o.cY,n={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:e=>{const n=e.d;"ok"===e.s?t.resolve(n):t.reject(n)}};this.outstandingGets_.push(n),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,n,r){this.initConnection_();const i=e._queryIdentifier,s=e._path.toString();this.log_("Listen called for "+s+" "+i),this.listens.has(s)||this.listens.set(s,new Map),(0,o.vA)(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),(0,o.vA)(!this.listens.get(s).has(i),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:t,query:e,tag:n};this.listens.get(s).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,(n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,0===this.outstandingGetCount_&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)}))}sendListen_(e){const t=e.query,n=t._path.toString(),r=t._queryIdentifier;this.log_("Listen on "+n+" for "+r);const i={p:n};e.tag&&(i.q=t._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest("q",i,(i=>{const o=i.d,s=i.s;Ne.warnOnListenWarnings_(o,t);(this.listens.get(n)&&this.listens.get(n).get(r))===e&&(this.log_("listen response",i),"ok"!==s&&this.removeListen_(n,r),e.onComplete&&e.onComplete(s,o))}))}static warnOnListenWarnings_(e,t){if(e&&"object"===typeof e&&(0,o.gR)(e,"w")){const n=(0,o.yw)(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const e='".indexOn": "'+t._queryParams.getIndex().toString()+'"',n=t._path.toString();T(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},(()=>{})),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&40===e.length||(0,o.qc)(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=3e4)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},(()=>{}))}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=(0,o.Cv)(e)?"auth":"gauth",n={cred:e};null===this.authOverride_?n.noauth=!0:"object"===typeof this.authOverride_&&(n.authvar=this.authOverride_),this.sendRequest(t,n,(t=>{const n=t.s,r=t.d||"error";this.authToken_===e&&("ok"===n?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(n,r))}))}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},(e=>{const t=e.s,n=e.d||"error";"ok"===t?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)}))}unlisten(e,t){const n=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+r),(0,o.vA)(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query");this.removeListen_(n,r)&&this.connected_&&this.sendUnlisten_(n,r,e._queryObject,t)}sendUnlisten_(e,t,n,r){this.log_("Unlisten on "+e+" for "+t);const i={p:e};r&&(i.q=n,i.t=r),this.sendRequest("n",i)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,r){const i={p:t,d:n};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,(e=>{r&&setTimeout((()=>{r(e.s,e.d)}),Math.floor(0))}))}put(e,t,n,r){this.putInternal("p",e,t,n,r)}merge(e,t,n,r){this.putInternal("m",e,t,n,r)}putInternal(e,t,n,r,i){this.initConnection_();const o={p:t,d:n};void 0!==i&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const s=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(s):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,(n=>{this.log_(t+" response",n),delete this.outstandingPuts_[e],this.outstandingPutCount_--,0===this.outstandingPutCount_&&(this.outstandingPuts_=[]),r&&r(n.s,n.d)}))}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,(e=>{if("ok"!==e.s){const t=e.d;this.log_("reportStats","Error sending stats: "+t)}}))}}onDataMessage_(e){if("r"in e){this.log_("from server: "+(0,o.As)(e));const t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),"d"===e?this.onDataUpdate_(t.p,t.d,!1,t.t):"m"===e?this.onDataUpdate_(t.p,t.d,!0,t.t):"c"===e?this.onListenRevoked_(t.p,t.q):"ac"===e?this.onAuthRevoked_(t.s,t.d):"apc"===e?this.onAppCheckRevoked_(t.s,t.d):"sd"===e?this.onSecurityDebugPacket_(t):C("Unrecognized action received from server: "+(0,o.As)(e)+"\nAre you using the latest client?")}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=(new Date).getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){(0,o.vA)(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout((()=>{this.establishConnectionTimer_=null,this.establishConnection_()}),Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ae,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ae,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){if(this.visible_){if(this.lastConnectionEstablishedTime_){(new Date).getTime()-this.lastConnectionEstablishedTime_>3e4&&(this.reconnectDelay_=Ae),this.lastConnectionEstablishedTime_=null}}else this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=(new Date).getTime();const e=Math.max(0,(new Date).getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,1.3*this.reconnectDelay_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=(new Date).getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+Ne.nextConnectionId_++,i=this.lastSessionId;let s=!1,a=null;const l=function(){a?a.close():(s=!0,n())},c=function(e){(0,o.vA)(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(e)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[o,l]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);s?k("getToken() completed but was canceled"):(k("getToken() completed. Creating connection."),this.authToken_=o&&o.accessToken,this.appCheckToken_=l&&l.token,a=new ce(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,n,(e=>{T(e+" ("+this.repoInfo_.toString()+")"),this.interrupt("server_kill")}),i))}catch(C){this.log_("Failed to get token: "+C),s||(this.repoInfo_.nodeAdmin&&T(C),l())}}}interrupt(e){k("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){k("Resuming connection for reason: "+e),delete this.interruptReasons_[e],(0,o.Im)(this.interruptReasons_)&&(this.reconnectDelay_=Ae,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-(new Date).getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}0===this.outstandingPutCount_&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;n=t?t.map((e=>O(e))).join("$"):"default";const r=this.removeListen_(e,n);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,t){const n=new pe(e).toString();let r;if(this.listens.has(n)){const e=this.listens.get(n);r=e.get(t),e.delete(t),0===e.size&&this.listens.delete(n)}else r=void 0;return r}onAuthRevoked_(e,t){k("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=3&&(this.reconnectDelay_=3e4,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){k("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=3&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace("\n","\nFIREBASE: "))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";(0,o.$g)()&&(t=this.repoInfo_.nodeAdmin?"admin_node":"node"),e["sdk."+t+"."+c.replace(/\./g,"-")]=1,(0,o.jZ)()?e["framework.cordova"]=1:(0,o.lV)()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=he.getInstance().currentlyOnline();return(0,o.Im)(this.interruptReasons_)&&e}}Ne.nextPersistentConnectionId_=0,Ne.nextConnectionId_=0;class Re{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new Re(e,t)}}class Oe{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new Re(j,e),r=new Re(j,t);return 0!==this.compare(n,r)}minPost(){return Re.MIN}}let De;class Le extends Oe{static get __EMPTY_NODE(){return De}static set __EMPTY_NODE(e){De=e}compare(e,t){return A(e.name,t.name)}isDefinedOn(e){throw(0,o.Hk)("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return Re.MIN}maxPost(){return new Re(P,De)}makePost(e,t){return(0,o.vA)("string"===typeof e,"KeyIndex indexValue must always be a string."),new Re(e,De)}toString(){return".key"}}const Fe=new Le;class Me{constructor(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(o=t?n(e.key,t):1,r&&(o*=-1),o<0)e=this.isReverse_?e.left:e.right;else{if(0===o){this.nodeStack_.push(e);break}this.nodeStack_.push(e),e=this.isReverse_?e.right:e.left}}getNext(){if(0===this.nodeStack_.length)return null;let e,t=this.nodeStack_.pop();if(e=this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return e}hasNext(){return this.nodeStack_.length>0}peek(){if(0===this.nodeStack_.length)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ze{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:ze.RED,this.left=null!=r?r:Ue.EMPTY_NODE,this.right=null!=i?i:Ue.EMPTY_NODE}copy(e,t,n,r,i){return new ze(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return Ue.EMPTY_NODE;let e=this;return e.left.isRed_()||e.left.left.isRed_()||(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,r;if(n=this,t(e,n.key)<0)n.left.isEmpty()||n.left.isRed_()||n.left.left.isRed_()||(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),n.right.isEmpty()||n.right.isRed_()||n.right.left.isRed_()||(n=n.moveRedRight_()),0===t(e,n.key)){if(n.right.isEmpty())return Ue.EMPTY_NODE;r=n.right.min_(),n=n.copy(r.key,r.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ze.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ze.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ze.RED=!0,ze.BLACK=!1;class Ue{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Ue.EMPTY_NODE;this.comparator_=e,this.root_=t}insert(e,t){return new Ue(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,ze.BLACK,null,null))}remove(e){return new Ue(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ze.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,r=null;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t){if(n.left.isEmpty())return r?r.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}t<0?n=n.left:t>0&&(r=n,n=n.right)}throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Me(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Me(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Me(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Me(this.root_,null,this.comparator_,!0,e)}}function $e(e,t){return A(e.name,t.name)}function Be(e,t){return A(e,t)}let We;Ue.EMPTY_NODE=new class{copy(e,t,n,r,i){return this}insert(e,t,n){return new ze(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}};const He=function(e){return"number"===typeof e?"number:"+F(e):"string:"+e},Ve=function(e){if(e.isLeafNode()){const t=e.val();(0,o.vA)("string"===typeof t||"number"===typeof t||"object"===typeof t&&(0,o.gR)(t,".sv"),"Priority must be a string or number.")}else(0,o.vA)(e===We||e.isEmpty(),"priority of unexpected type.");(0,o.vA)(e===We||e.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};let qe,Ke,Ye;class Ge{static set __childrenNodeConstructor(e){qe=e}static get __childrenNodeConstructor(){return qe}constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Ge.__childrenNodeConstructor.EMPTY_NODE;this.value_=e,this.priorityNode_=t,this.lazyHash_=null,(0,o.vA)(void 0!==this.value_&&null!==this.value_,"LeafNode shouldn't be created with null/undefined value."),Ve(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Ge(this.value_,e)}getImmediateChild(e){return".priority"===e?this.priorityNode_:Ge.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return _e(e)?this:".priority"===ge(e)?this.priorityNode_:Ge.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return".priority"===e?this.updatePriority(t):t.isEmpty()&&".priority"!==e?this:Ge.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=ge(e);return null===n?t:t.isEmpty()&&".priority"!==n?this:((0,o.vA)(".priority"!==n||1===me(e),".priority must be the last token in a path"),this.updateImmediateChild(n,Ge.__childrenNodeConstructor.EMPTY_NODE.updateChild(ye(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(null===this.lazyHash_){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+He(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",e+="number"===t?F(this.value_):this.value_,this.lazyHash_=b(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Ge.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Ge.__childrenNodeConstructor?-1:((0,o.vA)(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,r=Ge.VALUE_TYPE_ORDER.indexOf(t),i=Ge.VALUE_TYPE_ORDER.indexOf(n);return(0,o.vA)(r>=0,"Unknown leaf type: "+t),(0,o.vA)(i>=0,"Unknown leaf type: "+n),r===i?"object"===n?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}return!1}}Ge.VALUE_TYPE_ORDER=["object","boolean","number","string"];const Ze=new class extends Oe{compare(e,t){const n=e.node.getPriority(),r=t.node.getPriority(),i=n.compareTo(r);return 0===i?A(e.name,t.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return Re.MIN}maxPost(){return new Re(P,new Ge("[PRIORITY-POST]",Ye))}makePost(e,t){const n=Ke(e);return new Re(t,new Ge("[PRIORITY-POST]",n))}toString(){return".priority"}},Qe=Math.log(2);class Je{constructor(e){var t;this.count=(t=e+1,parseInt(Math.log(t)/Qe,10)),this.current_=this.count-1;const n=(r=this.count,parseInt(Array(r+1).join("1"),2));var r;this.bits_=e+1&n}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Xe=function(e,t,n,r){e.sort(t);const i=function(t,r){const o=r-t;let s,a;if(0===o)return null;if(1===o)return s=e[t],a=n?n(s):s,new ze(a,s.node,ze.BLACK,null,null);{const l=parseInt(o/2,10)+t,c=i(t,l),d=i(l+1,r);return s=e[l],a=n?n(s):s,new ze(a,s.node,ze.BLACK,c,d)}},o=function(t){let r=null,o=null,s=e.length;const a=function(t,r){const o=s-t,a=s;s-=t;const c=i(o+1,a),d=e[o],u=n?n(d):d;l(new ze(u,d.node,r,null,c))},l=function(e){r?(r.left=e,r=e):(o=e,r=e)};for(let e=0;e<t.count;++e){const n=t.nextBitIsOne(),r=Math.pow(2,t.count-(e+1));n?a(r,ze.BLACK):(a(r,ze.BLACK),a(r,ze.RED))}return o}(new Je(e.length));return new Ue(r||t,o)};let et;const tt={};class nt{static get Default(){return(0,o.vA)(tt&&Ze,"ChildrenNode.ts has not been loaded"),et=et||new nt({".priority":tt},{".priority":Ze}),et}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=(0,o.yw)(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Ue?t:null}hasIndex(e){return(0,o.gR)(this.indexSet_,e.toString())}addIndex(e,t){(0,o.vA)(e!==Fe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let r=!1;const i=t.getIterator(Re.Wrap);let s,a=i.getNext();for(;a;)r=r||e.isDefinedOn(a.node),n.push(a),a=i.getNext();s=r?Xe(n,e.getCompare()):tt;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=s,new nt(d,c)}addToIndexes(e,t){const n=(0,o.kH)(this.indexes_,((n,r)=>{const i=(0,o.yw)(this.indexSet_,r);if((0,o.vA)(i,"Missing index implementation for "+r),n===tt){if(i.isDefinedOn(e.node)){const n=[],r=t.getIterator(Re.Wrap);let o=r.getNext();for(;o;)o.name!==e.name&&n.push(o),o=r.getNext();return n.push(e),Xe(n,i.getCompare())}return tt}{const r=t.get(e.name);let i=n;return r&&(i=i.remove(new Re(e.name,r))),i.insert(e,e.node)}}));return new nt(n,this.indexSet_)}removeFromIndexes(e,t){const n=(0,o.kH)(this.indexes_,(n=>{if(n===tt)return n;{const r=t.get(e.name);return r?n.remove(new Re(e.name,r)):n}}));return new nt(n,this.indexSet_)}}let rt;class it{static get EMPTY_NODE(){return rt||(rt=new it(new Ue(Be),null,nt.Default))}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&Ve(this.priorityNode_),this.children_.isEmpty()&&(0,o.vA)(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||rt}updatePriority(e){return this.children_.isEmpty()?this:new it(this.children_,e,this.indexMap_)}getImmediateChild(e){if(".priority"===e)return this.getPriority();{const t=this.children_.get(e);return null===t?rt:t}}getChild(e){const t=ge(e);return null===t?this:this.getImmediateChild(t).getChild(ye(e))}hasChild(e){return null!==this.children_.get(e)}updateImmediateChild(e,t){if((0,o.vA)(t,"We should always be passing snapshot nodes"),".priority"===e)return this.updatePriority(t);{const n=new Re(e,t);let r,i;t.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(n,this.children_)):(r=this.children_.insert(e,t),i=this.indexMap_.addToIndexes(n,this.children_));const o=r.isEmpty()?rt:this.priorityNode_;return new it(r,o,i)}}updateChild(e,t){const n=ge(e);if(null===n)return t;{(0,o.vA)(".priority"!==ge(e)||1===me(e),".priority must be the last token in a path");const r=this.getImmediateChild(n).updateChild(ye(e),t);return this.updateImmediateChild(n,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,r=0,i=!0;if(this.forEachChild(Ze,((o,s)=>{t[o]=s.val(e),n++,i&&it.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):i=!1})),!e&&i&&r<2*n){const e=[];for(const n in t)e[n]=t[n];return e}return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(null===this.lazyHash_){let e="";this.getPriority().isEmpty()||(e+="priority:"+He(this.getPriority().val())+":"),this.forEachChild(Ze,((t,n)=>{const r=n.hash();""!==r&&(e+=":"+t+":"+r)})),this.lazyHash_=""===e?"":b(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const r=this.resolveIndex_(n);if(r){const n=r.getPredecessorKey(new Re(e,t));return n?n.name:null}return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.minKey();return e&&e.name}return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new Re(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.maxKey();return e&&e.name}return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new Re(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal((e=>t(e.name,e.node))):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,(e=>e));{const n=this.children_.getIteratorFrom(e.name,Re.Wrap);let r=n.peek();for(;null!=r&&t.compare(r,e)<0;)n.getNext(),r=n.peek();return n}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,(e=>e));{const n=this.children_.getReverseIteratorFrom(e.name,Re.Wrap);let r=n.peek();for(;null!=r&&t.compare(r,e)>0;)n.getNext(),r=n.peek();return n}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ot?-1:0}withIndex(e){if(e===Fe||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new it(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Fe||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority())){if(this.children_.count()===t.children_.count()){const e=this.getIterator(Ze),n=t.getIterator(Ze);let r=e.getNext(),i=n.getNext();for(;r&&i;){if(r.name!==i.name||!r.node.equals(i.node))return!1;r=e.getNext(),i=n.getNext()}return null===r&&null===i}return!1}return!1}}resolveIndex_(e){return e===Fe?null:this.indexMap_.get(e.toString())}}it.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;const ot=new class extends it{constructor(){super(new Ue(Be),it.EMPTY_NODE,nt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return it.EMPTY_NODE}isEmpty(){return!1}};Object.defineProperties(Re,{MIN:{value:new Re(j,it.EMPTY_NODE)},MAX:{value:new Re(P,ot)}}),Le.__EMPTY_NODE=it.EMPTY_NODE,Ge.__childrenNodeConstructor=it,We=ot,function(e){Ye=e}(ot);const st=!0;function at(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(null===e)return it.EMPTY_NODE;if("object"===typeof e&&".priority"in e&&(t=e[".priority"]),(0,o.vA)(null===t||"string"===typeof t||"number"===typeof t||"object"===typeof t&&".sv"in t,"Invalid priority type found: "+typeof t),"object"===typeof e&&".value"in e&&null!==e[".value"]&&(e=e[".value"]),"object"!==typeof e||".sv"in e){return new Ge(e,at(t))}if(e instanceof Array||!st){let n=it.EMPTY_NODE;return L(e,((t,r)=>{if((0,o.gR)(e,t)&&"."!==t.substring(0,1)){const e=at(r);!e.isLeafNode()&&e.isEmpty()||(n=n.updateImmediateChild(t,e))}})),n.updatePriority(at(t))}{const n=[];let r=!1;if(L(e,((e,t)=>{if("."!==e.substring(0,1)){const i=at(t);i.isEmpty()||(r=r||!i.getPriority().isEmpty(),n.push(new Re(e,i)))}})),0===n.length)return it.EMPTY_NODE;const i=Xe(n,$e,(e=>e.name),Be);if(r){const e=Xe(n,Ze.getCompare());return new it(i,at(t),new nt({".priority":e},{".priority":Ze}))}return new it(i,at(t),nt.Default)}}!function(e){Ke=e}(at);class lt extends Oe{constructor(e){super(),this.indexPath_=e,(0,o.vA)(!_e(e)&&".priority"!==ge(e),"Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),r=this.extractChild(t.node),i=n.compareTo(r);return 0===i?A(e.name,t.name):i}makePost(e,t){const n=at(e),r=it.EMPTY_NODE.updateChild(this.indexPath_,n);return new Re(t,r)}maxPost(){const e=it.EMPTY_NODE.updateChild(this.indexPath_,ot);return new Re(P,e)}toString(){return ve(this.indexPath_,0).join("/")}}const ct=new class extends Oe{compare(e,t){const n=e.node.compareTo(t.node);return 0===n?A(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return Re.MIN}maxPost(){return Re.MAX}makePost(e,t){const n=at(e);return new Re(t,n)}toString(){return".value"}};function dt(e){return{type:"value",snapshotNode:e}}function ut(e,t){return{type:"child_added",snapshotNode:t,childName:e}}function ht(e,t){return{type:"child_removed",snapshotNode:t,childName:e}}function pt(e,t,n){return{type:"child_changed",snapshotNode:t,childName:e,oldSnap:n}}class ft{constructor(e){this.index_=e}updateChild(e,t,n,r,i,s){(0,o.vA)(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(r).equals(n.getChild(r))&&a.isEmpty()===n.isEmpty()?e:(null!=s&&(n.isEmpty()?e.hasChild(t)?s.trackChildChange(ht(t,a)):(0,o.vA)(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?s.trackChildChange(ut(t,n)):s.trackChildChange(pt(t,n,a))),e.isLeafNode()&&n.isEmpty()?e:e.updateImmediateChild(t,n).withIndex(this.index_))}updateFullNode(e,t,n){return null!=n&&(e.isLeafNode()||e.forEachChild(Ze,((e,r)=>{t.hasChild(e)||n.trackChildChange(ht(e,r))})),t.isLeafNode()||t.forEachChild(Ze,((t,r)=>{if(e.hasChild(t)){const i=e.getImmediateChild(t);i.equals(r)||n.trackChildChange(pt(t,r,i))}else n.trackChildChange(ut(t,r))}))),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?it.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}class gt{constructor(e){this.indexedFilter_=new ft(e.getIndex()),this.index_=e.getIndex(),this.startPost_=gt.getStartPost_(e),this.endPost_=gt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,r,i,o){return this.matches(new Re(t,n))||(n=it.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,r,i,o)}updateFullNode(e,t,n){t.isLeafNode()&&(t=it.EMPTY_NODE);let r=t.withIndex(this.index_);r=r.updatePriority(it.EMPTY_NODE);const i=this;return t.forEachChild(Ze,((e,t)=>{i.matches(new Re(e,t))||(r=r.updateImmediateChild(e,it.EMPTY_NODE))})),this.indexedFilter_.updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}return e.getIndex().maxPost()}}class mt{constructor(e){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{const t=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?t<=0:t<0},this.withinEndPost=e=>{const t=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?t<=0:t<0},this.rangedFilter_=new gt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,r,i,o){return this.rangedFilter_.matches(new Re(t,n))||(n=it.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,r,i,o):this.fullLimitUpdateChild_(e,t,n,i,o)}updateFullNode(e,t,n){let r;if(t.isLeafNode()||t.isEmpty())r=it.EMPTY_NODE.withIndex(this.index_);else if(2*this.limit_<t.numChildren()&&t.isIndexed(this.index_)){let e;r=it.EMPTY_NODE.withIndex(this.index_),e=this.reverse_?t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let n=0;for(;e.hasNext()&&n<this.limit_;){const t=e.getNext();if(this.withinDirectionalStart(t)){if(!this.withinDirectionalEnd(t))break;r=r.updateImmediateChild(t.name,t.node),n++}}}else{let e;r=t.withIndex(this.index_),r=r.updatePriority(it.EMPTY_NODE),e=this.reverse_?r.getReverseIterator(this.index_):r.getIterator(this.index_);let n=0;for(;e.hasNext();){const t=e.getNext();n<this.limit_&&this.withinDirectionalStart(t)&&this.withinDirectionalEnd(t)?n++:r=r.updateImmediateChild(t.name,it.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,r,i){let s;if(this.reverse_){const e=this.index_.getCompare();s=(t,n)=>e(n,t)}else s=this.index_.getCompare();const a=e;(0,o.vA)(a.numChildren()===this.limit_,"");const l=new Re(t,n),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const e=a.getImmediateChild(t);let o=r.getChildAfterChild(this.index_,c,this.reverse_);for(;null!=o&&(o.name===t||a.hasChild(o.name));)o=r.getChildAfterChild(this.index_,o,this.reverse_);const u=null==o?1:s(o,l);if(d&&!n.isEmpty()&&u>=0)return null!=i&&i.trackChildChange(pt(t,n,e)),a.updateImmediateChild(t,n);{null!=i&&i.trackChildChange(ht(t,e));const n=a.updateImmediateChild(t,it.EMPTY_NODE);return null!=o&&this.rangedFilter_.matches(o)?(null!=i&&i.trackChildChange(ut(o.name,o.node)),n.updateImmediateChild(o.name,o.node)):n}}return n.isEmpty()?e:d&&s(c,l)>=0?(null!=i&&(i.trackChildChange(ht(c.name,c.node)),i.trackChildChange(ut(t,n))),a.updateImmediateChild(t,n).updateImmediateChild(c.name,it.EMPTY_NODE)):e}}class yt{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Ze}hasStart(){return this.startSet_}isViewFromLeft(){return""===this.viewFrom_?this.startSet_:"l"===this.viewFrom_}getIndexStartValue(){return(0,o.vA)(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return(0,o.vA)(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:j}hasEnd(){return this.endSet_}getIndexEndValue(){return(0,o.vA)(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return(0,o.vA)(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:P}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&""!==this.viewFrom_}getLimit(){return(0,o.vA)(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Ze}copy(){const e=new yt;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function bt(e,t){const n=e.copy();return n.index_=t,n}function vt(e){const t={};if(e.isDefault())return t;let n;if(e.index_===Ze?n="$priority":e.index_===ct?n="$value":e.index_===Fe?n="$key":((0,o.vA)(e.index_ instanceof lt,"Unrecognized index type!"),n=e.index_.toString()),t.orderBy=(0,o.As)(n),e.startSet_){const n=e.startAfterSet_?"startAfter":"startAt";t[n]=(0,o.As)(e.indexStartValue_),e.startNameSet_&&(t[n]+=","+(0,o.As)(e.indexStartName_))}if(e.endSet_){const n=e.endBeforeSet_?"endBefore":"endAt";t[n]=(0,o.As)(e.indexEndValue_),e.endNameSet_&&(t[n]+=","+(0,o.As)(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?t.limitToFirst=e.limit_:t.limitToLast=e.limit_),t}function xt(e){const t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_),t.sin=!e.startAfterSet_),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_),t.ein=!e.endBeforeSet_),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;""===n&&(n=e.isViewFromLeft()?"l":"r"),t.vf=n}return e.index_!==Ze&&(t.i=e.index_.toString()),t}class wt extends de{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return void 0!==t?"tag$"+t:((0,o.vA)(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,n,r){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=r,this.log_=S("p:rest:"),this.listens_={}}listen(e,t,n,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const s=wt.getListenId_(e,n),a={};this.listens_[s]=a;const l=vt(e._queryParams);this.restRequest_(i+".json",l,((e,t)=>{let l=t;if(404===e&&(l=null,e=null),null===e&&this.onDataUpdate_(i,l,!1,n),(0,o.yw)(this.listens_,s)===a){let t;t=e?401===e?"permission_denied":"rest_error:"+e:"ok",r(t,null)}}))}unlisten(e,t){const n=wt.getListenId_(e,t);delete this.listens_[n]}get(e){const t=vt(e._queryParams),n=e._path.toString(),r=new o.cY;return this.restRequest_(n+".json",t,((e,t)=>{let i=t;404===e&&(i=null,e=null),null===e?(this.onDataUpdate_(n,i,!1,null),r.resolve(i)):r.reject(new Error(i))})),r.promise}refreshAuthToken(e){}restRequest_(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then((r=>{let[i,s]=r;i&&i.accessToken&&(t.auth=i.accessToken),s&&s.token&&(t.ac=s.token);const a=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+(0,o.Am)(t);this.log_("Sending REST request for "+a);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(n&&4===l.readyState){this.log_("REST Response for "+a+" received. status:",l.status,"response:",l.responseText);let t=null;if(l.status>=200&&l.status<300){try{t=(0,o.$L)(l.responseText)}catch(e){T("Failed to parse JSON response for "+a+": "+l.responseText)}n(null,t)}else 401!==l.status&&404!==l.status&&T("Got unsuccessful REST response for "+a+" Status: "+l.status),n(l.status);n=null}},l.open("GET",a,!0),l.send()}))}}class _t{constructor(){this.rootNode_=it.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}function kt(){return{value:null,children:new Map}}function St(e,t,n){if(_e(t))e.value=n,e.children.clear();else if(null!==e.value)e.value=e.value.updateChild(t,n);else{const r=ge(t);e.children.has(r)||e.children.set(r,kt());St(e.children.get(r),t=ye(t),n)}}function Ct(e,t){if(_e(t))return e.value=null,e.children.clear(),!0;if(null!==e.value){if(e.value.isLeafNode())return!1;{const n=e.value;return e.value=null,n.forEachChild(Ze,((t,n)=>{St(e,new pe(t),n)})),Ct(e,t)}}if(e.children.size>0){const n=ge(t);if(t=ye(t),e.children.has(n)){Ct(e.children.get(n),t)&&e.children.delete(n)}return 0===e.children.size}return!0}function Et(e,t,n){null!==e.value?n(t,e.value):function(e,t){e.children.forEach(((e,n)=>{t(n,e)}))}(e,((e,r)=>{Et(r,new pe(t.toString()+"/"+e),n)}))}class Tt{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&L(this.last_,((e,n)=>{t[e]=t[e]-n})),this.last_=e,t}}class It{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Tt(e);const n=1e4+2e4*Math.random();$(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;L(e,((e,r)=>{r>0&&(0,o.gR)(this.statsToReport_,e)&&(t[e]=r,n=!0)})),n&&this.server_.reportStats(t),$(this.reportStats_.bind(this),Math.floor(2*Math.random()*3e5))}}var jt;function Pt(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}!function(e){e[e.OVERWRITE=0]="OVERWRITE",e[e.MERGE=1]="MERGE",e[e.ACK_USER_WRITE=2]="ACK_USER_WRITE",e[e.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"}(jt||(jt={}));class At{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=jt.ACK_USER_WRITE,this.source={fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}operationForChild(e){if(_e(this.path)){if(null!=this.affectedTree.value)return(0,o.vA)(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new pe(e));return new At(fe(),t,this.revert)}}return(0,o.vA)(ge(this.path)===e,"operationForChild called for unrelated child."),new At(ye(this.path),this.affectedTree,this.revert)}}class Nt{constructor(e,t){this.source=e,this.path=t,this.type=jt.LISTEN_COMPLETE}operationForChild(e){return _e(this.path)?new Nt(this.source,fe()):new Nt(this.source,ye(this.path))}}class Rt{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=jt.OVERWRITE}operationForChild(e){return _e(this.path)?new Rt(this.source,fe(),this.snap.getImmediateChild(e)):new Rt(this.source,ye(this.path),this.snap)}}class Ot{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=jt.MERGE}operationForChild(e){if(_e(this.path)){const t=this.children.subtree(new pe(e));return t.isEmpty()?null:t.value?new Rt(this.source,fe(),t.value):new Ot(this.source,fe(),t)}return(0,o.vA)(ge(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ot(this.source,ye(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}class Dt{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(_e(e))return this.isFullyInitialized()&&!this.filtered_;const t=ge(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}class Lt{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Ft(e,t,n,r,i,s){const a=r.filter((e=>e.type===n));a.sort(((t,n)=>function(e,t,n){if(null==t.childName||null==n.childName)throw(0,o.Hk)("Should only compare child_ events.");const r=new Re(t.childName,t.snapshotNode),i=new Re(n.childName,n.snapshotNode);return e.index_.compare(r,i)}(e,t,n))),a.forEach((n=>{const r=function(e,t,n){return"value"===t.type||"child_removed"===t.type||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}(e,n,s);i.forEach((i=>{i.respondsTo(n.type)&&t.push(i.createEvent(r,e.query_))}))}))}function Mt(e,t){return{eventCache:e,serverCache:t}}function zt(e,t,n,r){return Mt(new Dt(t,n,r),e.serverCache)}function Ut(e,t,n,r){return Mt(e.eventCache,new Dt(t,n,r))}function $t(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function Bt(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}let Wt;class Ht{static fromObject(e){let t=new Ht(null);return L(e,((e,n)=>{t=t.set(new pe(e),n)})),t}constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(Wt||(Wt=new Ue(N)),Wt);this.value=e,this.children=t}isEmpty(){return null===this.value&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(null!=this.value&&t(this.value))return{path:fe(),value:this.value};if(_e(e))return null;{const n=ge(e),r=this.children.get(n);if(null!==r){const i=r.findRootMostMatchingPathAndValue(ye(e),t);if(null!=i){return{path:we(new pe(n),i.path),value:i.value}}return null}return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,(()=>!0))}subtree(e){if(_e(e))return this;{const t=ge(e),n=this.children.get(t);return null!==n?n.subtree(ye(e)):new Ht(null)}}set(e,t){if(_e(e))return new Ht(t,this.children);{const n=ge(e),r=(this.children.get(n)||new Ht(null)).set(ye(e),t),i=this.children.insert(n,r);return new Ht(this.value,i)}}remove(e){if(_e(e))return this.children.isEmpty()?new Ht(null):new Ht(null,this.children);{const t=ge(e),n=this.children.get(t);if(n){const r=n.remove(ye(e));let i;return i=r.isEmpty()?this.children.remove(t):this.children.insert(t,r),null===this.value&&i.isEmpty()?new Ht(null):new Ht(this.value,i)}return this}}get(e){if(_e(e))return this.value;{const t=ge(e),n=this.children.get(t);return n?n.get(ye(e)):null}}setTree(e,t){if(_e(e))return t;{const n=ge(e),r=(this.children.get(n)||new Ht(null)).setTree(ye(e),t);let i;return i=r.isEmpty()?this.children.remove(n):this.children.insert(n,r),new Ht(this.value,i)}}fold(e){return this.fold_(fe(),e)}fold_(e,t){const n={};return this.children.inorderTraversal(((r,i)=>{n[r]=i.fold_(we(e,r),t)})),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,fe(),t)}findOnPath_(e,t,n){const r=!!this.value&&n(t,this.value);if(r)return r;if(_e(e))return null;{const r=ge(e),i=this.children.get(r);return i?i.findOnPath_(ye(e),we(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,fe(),t)}foreachOnPath_(e,t,n){if(_e(e))return this;{this.value&&n(t,this.value);const r=ge(e),i=this.children.get(r);return i?i.foreachOnPath_(ye(e),we(t,r),n):new Ht(null)}}foreach(e){this.foreach_(fe(),e)}foreach_(e,t){this.children.inorderTraversal(((n,r)=>{r.foreach_(we(e,n),t)})),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal(((t,n)=>{n.value&&e(t,n.value)}))}}class Vt{constructor(e){this.writeTree_=e}static empty(){return new Vt(new Ht(null))}}function qt(e,t,n){if(_e(t))return new Vt(new Ht(n));{const r=e.writeTree_.findRootMostValueAndPath(t);if(null!=r){const i=r.path;let o=r.value;const s=ke(i,t);return o=o.updateChild(s,n),new Vt(e.writeTree_.set(i,o))}{const r=new Ht(n),i=e.writeTree_.setTree(t,r);return new Vt(i)}}}function Kt(e,t,n){let r=e;return L(n,((e,n)=>{r=qt(r,we(t,e),n)})),r}function Yt(e,t){if(_e(t))return Vt.empty();{const n=e.writeTree_.setTree(t,new Ht(null));return new Vt(n)}}function Gt(e,t){return null!=Zt(e,t)}function Zt(e,t){const n=e.writeTree_.findRootMostValueAndPath(t);return null!=n?e.writeTree_.get(n.path).getChild(ke(n.path,t)):null}function Qt(e){const t=[],n=e.writeTree_.value;return null!=n?n.isLeafNode()||n.forEachChild(Ze,((e,n)=>{t.push(new Re(e,n))})):e.writeTree_.children.inorderTraversal(((e,n)=>{null!=n.value&&t.push(new Re(e,n.value))})),t}function Jt(e,t){if(_e(t))return e;{const n=Zt(e,t);return new Vt(null!=n?new Ht(n):e.writeTree_.subtree(t))}}function Xt(e){return e.writeTree_.isEmpty()}function en(e,t){return tn(fe(),e.writeTree_,t)}function tn(e,t,n){if(null!=t.value)return n.updateChild(e,t.value);{let r=null;return t.children.inorderTraversal(((t,i)=>{".priority"===t?((0,o.vA)(null!==i.value,"Priority writes must always be leaf nodes"),r=i.value):n=tn(we(e,t),i,n)})),n.getChild(e).isEmpty()||null===r||(n=n.updateChild(we(e,".priority"),r)),n}}function nn(e,t){return mn(t,e)}function rn(e,t){const n=e.allWrites.findIndex((e=>e.writeId===t));(0,o.vA)(n>=0,"removeWrite called with nonexistent writeId.");const r=e.allWrites[n];e.allWrites.splice(n,1);let i=r.visible,s=!1,a=e.allWrites.length-1;for(;i&&a>=0;){const t=e.allWrites[a];t.visible&&(a>=n&&on(t,r.path)?i=!1:Ee(r.path,t.path)&&(s=!0)),a--}if(i){if(s)return function(e){e.visibleWrites=an(e.allWrites,sn,fe()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}(e),!0;if(r.snap)e.visibleWrites=Yt(e.visibleWrites,r.path);else{L(r.children,(t=>{e.visibleWrites=Yt(e.visibleWrites,we(r.path,t))}))}return!0}return!1}function on(e,t){if(e.snap)return Ee(e.path,t);for(const n in e.children)if(e.children.hasOwnProperty(n)&&Ee(we(e.path,n),t))return!0;return!1}function sn(e){return e.visible}function an(e,t,n){let r=Vt.empty();for(let i=0;i<e.length;++i){const s=e[i];if(t(s)){const e=s.path;let t;if(s.snap)Ee(n,e)?(t=ke(n,e),r=qt(r,t,s.snap)):Ee(e,n)&&(t=ke(e,n),r=qt(r,fe(),s.snap.getChild(t)));else{if(!s.children)throw(0,o.Hk)("WriteRecord should have .snap or .children");if(Ee(n,e))t=ke(n,e),r=Kt(r,t,s.children);else if(Ee(e,n))if(t=ke(e,n),_e(t))r=Kt(r,fe(),s.children);else{const e=(0,o.yw)(s.children,ge(t));if(e){const n=e.getChild(ye(t));r=qt(r,fe(),n)}}}}}return r}function ln(e,t,n,r,i){if(r||i){const o=Jt(e.visibleWrites,t);if(!i&&Xt(o))return n;if(i||null!=n||Gt(o,fe())){const o=function(e){return(e.visible||i)&&(!r||!~r.indexOf(e.writeId))&&(Ee(e.path,t)||Ee(t,e.path))};return en(an(e.allWrites,o,t),n||it.EMPTY_NODE)}return null}{const r=Zt(e.visibleWrites,t);if(null!=r)return r;{const r=Jt(e.visibleWrites,t);if(Xt(r))return n;if(null!=n||Gt(r,fe())){return en(r,n||it.EMPTY_NODE)}return null}}}function cn(e,t,n,r){return ln(e.writeTree,e.treePath,t,n,r)}function dn(e,t){return function(e,t,n){let r=it.EMPTY_NODE;const i=Zt(e.visibleWrites,t);if(i)return i.isLeafNode()||i.forEachChild(Ze,((e,t)=>{r=r.updateImmediateChild(e,t)})),r;if(n){const i=Jt(e.visibleWrites,t);return n.forEachChild(Ze,((e,t)=>{const n=en(Jt(i,new pe(e)),t);r=r.updateImmediateChild(e,n)})),Qt(i).forEach((e=>{r=r.updateImmediateChild(e.name,e.node)})),r}return Qt(Jt(e.visibleWrites,t)).forEach((e=>{r=r.updateImmediateChild(e.name,e.node)})),r}(e.writeTree,e.treePath,t)}function un(e,t,n,r){return function(e,t,n,r,i){(0,o.vA)(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=we(t,n);if(Gt(e.visibleWrites,s))return null;{const t=Jt(e.visibleWrites,s);return Xt(t)?i.getChild(n):en(t,i.getChild(n))}}(e.writeTree,e.treePath,t,n,r)}function hn(e,t){return function(e,t){return Zt(e.visibleWrites,t)}(e.writeTree,we(e.treePath,t))}function pn(e,t,n,r,i,o){return function(e,t,n,r,i,o,s){let a;const l=Jt(e.visibleWrites,t),c=Zt(l,fe());if(null!=c)a=c;else{if(null==n)return[];a=en(l,n)}if(a=a.withIndex(s),a.isEmpty()||a.isLeafNode())return[];{const e=[],t=s.getCompare(),n=o?a.getReverseIteratorFrom(r,s):a.getIteratorFrom(r,s);let l=n.getNext();for(;l&&e.length<i;)0!==t(l,r)&&e.push(l),l=n.getNext();return e}}(e.writeTree,e.treePath,t,n,r,i,o)}function fn(e,t,n){return function(e,t,n,r){const i=we(t,n),o=Zt(e.visibleWrites,i);if(null!=o)return o;if(r.isCompleteForChild(n))return en(Jt(e.visibleWrites,i),r.getNode().getImmediateChild(n));return null}(e.writeTree,e.treePath,t,n)}function gn(e,t){return mn(we(e.treePath,t),e.writeTree)}function mn(e,t){return{treePath:e,writeTree:t}}class yn{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;(0,o.vA)("child_added"===t||"child_changed"===t||"child_removed"===t,"Only child changes supported for tracking"),(0,o.vA)(".priority"!==n,"Only non-priority child changes can be tracked.");const r=this.changeMap.get(n);if(r){const i=r.type;if("child_added"===t&&"child_removed"===i)this.changeMap.set(n,pt(n,e.snapshotNode,r.snapshotNode));else if("child_removed"===t&&"child_added"===i)this.changeMap.delete(n);else if("child_removed"===t&&"child_changed"===i)this.changeMap.set(n,ht(n,r.oldSnap));else if("child_changed"===t&&"child_added"===i)this.changeMap.set(n,ut(n,e.snapshotNode));else{if("child_changed"!==t||"child_changed"!==i)throw(0,o.Hk)("Illegal combination of changes: "+e+" occurred after "+r);this.changeMap.set(n,pt(n,e.snapshotNode,r.oldSnap))}}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}const bn=new class{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}};class vn{constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const t=null!=this.optCompleteServerCache_?new Dt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return fn(this.writes_,e,t)}}getChildAfterChild(e,t,n){const r=null!=this.optCompleteServerCache_?this.optCompleteServerCache_:Bt(this.viewCache_),i=pn(this.writes_,r,t,1,n,e);return 0===i.length?null:i[0]}}function xn(e,t,n,r,i){const s=new yn;let a,l;if(n.type===jt.OVERWRITE){const c=n;c.source.fromUser?a=kn(e,t,c.path,c.snap,r,i,s):((0,o.vA)(c.source.fromServer,"Unknown source."),l=c.source.tagged||t.serverCache.isFiltered()&&!_e(c.path),a=_n(e,t,c.path,c.snap,r,i,l,s))}else if(n.type===jt.MERGE){const c=n;c.source.fromUser?a=function(e,t,n,r,i,o,s){let a=t;return r.foreach(((r,l)=>{const c=we(n,r);Sn(t,ge(c))&&(a=kn(e,a,c,l,i,o,s))})),r.foreach(((r,l)=>{const c=we(n,r);Sn(t,ge(c))||(a=kn(e,a,c,l,i,o,s))})),a}(e,t,c.path,c.children,r,i,s):((0,o.vA)(c.source.fromServer,"Unknown source."),l=c.source.tagged||t.serverCache.isFiltered(),a=En(e,t,c.path,c.children,r,i,l,s))}else if(n.type===jt.ACK_USER_WRITE){const l=n;a=l.revert?function(e,t,n,r,i,s){let a;if(null!=hn(r,n))return t;{const l=new vn(r,t,i),c=t.eventCache.getNode();let d;if(_e(n)||".priority"===ge(n)){let n;if(t.serverCache.isFullyInitialized())n=cn(r,Bt(t));else{const e=t.serverCache.getNode();(0,o.vA)(e instanceof it,"serverChildren would be complete if leaf node"),n=dn(r,e)}d=e.filter.updateFullNode(c,n,s)}else{const i=ge(n);let o=fn(r,i,t.serverCache);null==o&&t.serverCache.isCompleteForChild(i)&&(o=c.getImmediateChild(i)),d=null!=o?e.filter.updateChild(c,i,o,ye(n),l,s):t.eventCache.getNode().hasChild(i)?e.filter.updateChild(c,i,it.EMPTY_NODE,ye(n),l,s):c,d.isEmpty()&&t.serverCache.isFullyInitialized()&&(a=cn(r,Bt(t)),a.isLeafNode()&&(d=e.filter.updateFullNode(d,a,s)))}return a=t.serverCache.isFullyInitialized()||null!=hn(r,fe()),zt(t,d,a,e.filter.filtersNodes())}}(e,t,l.path,r,i,s):function(e,t,n,r,i,o,s){if(null!=hn(i,n))return t;const a=t.serverCache.isFiltered(),l=t.serverCache;if(null!=r.value){if(_e(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return _n(e,t,n,l.getNode().getChild(n),i,o,a,s);if(_e(n)){let r=new Ht(null);return l.getNode().forEachChild(Fe,((e,t)=>{r=r.set(new pe(e),t)})),En(e,t,n,r,i,o,a,s)}return t}{let c=new Ht(null);return r.foreach(((e,t)=>{const r=we(n,e);l.isCompleteForPath(r)&&(c=c.set(e,l.getNode().getChild(r)))})),En(e,t,n,c,i,o,a,s)}}(e,t,l.path,l.affectedTree,r,i,s)}else{if(n.type!==jt.LISTEN_COMPLETE)throw(0,o.Hk)("Unknown operation type: "+n.type);a=function(e,t,n,r,i){const o=t.serverCache,s=Ut(t,o.getNode(),o.isFullyInitialized()||_e(n),o.isFiltered());return wn(e,s,n,r,bn,i)}(e,t,n.path,r,s)}const c=s.getChanges();return function(e,t,n){const r=t.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),o=$t(e);(n.length>0||!e.eventCache.isFullyInitialized()||i&&!r.getNode().equals(o)||!r.getNode().getPriority().equals(o.getPriority()))&&n.push(dt($t(t)))}}(t,a,c),{viewCache:a,changes:c}}function wn(e,t,n,r,i,s){const a=t.eventCache;if(null!=hn(r,n))return t;{let l,c;if(_e(n))if((0,o.vA)(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const n=Bt(t),i=dn(r,n instanceof it?n:it.EMPTY_NODE);l=e.filter.updateFullNode(t.eventCache.getNode(),i,s)}else{const n=cn(r,Bt(t));l=e.filter.updateFullNode(t.eventCache.getNode(),n,s)}else{const d=ge(n);if(".priority"===d){(0,o.vA)(1===me(n),"Can't have a priority with additional path components");const i=a.getNode();c=t.serverCache.getNode();const s=un(r,n,i,c);l=null!=s?e.filter.updatePriority(i,s):a.getNode()}else{const o=ye(n);let u;if(a.isCompleteForChild(d)){c=t.serverCache.getNode();const e=un(r,n,a.getNode(),c);u=null!=e?a.getNode().getImmediateChild(d).updateChild(o,e):a.getNode().getImmediateChild(d)}else u=fn(r,d,t.serverCache);l=null!=u?e.filter.updateChild(a.getNode(),d,u,o,i,s):a.getNode()}}return zt(t,l,a.isFullyInitialized()||_e(n),e.filter.filtersNodes())}}function _n(e,t,n,r,i,o,s,a){const l=t.serverCache;let c;const d=s?e.filter:e.filter.getIndexedFilter();if(_e(n))c=d.updateFullNode(l.getNode(),r,null);else if(d.filtersNodes()&&!l.isFiltered()){const e=l.getNode().updateChild(n,r);c=d.updateFullNode(l.getNode(),e,null)}else{const e=ge(n);if(!l.isCompleteForPath(n)&&me(n)>1)return t;const i=ye(n),o=l.getNode().getImmediateChild(e).updateChild(i,r);c=".priority"===e?d.updatePriority(l.getNode(),o):d.updateChild(l.getNode(),e,o,i,bn,null)}const u=Ut(t,c,l.isFullyInitialized()||_e(n),d.filtersNodes());return wn(e,u,n,i,new vn(i,u,o),a)}function kn(e,t,n,r,i,o,s){const a=t.eventCache;let l,c;const d=new vn(i,t,o);if(_e(n))c=e.filter.updateFullNode(t.eventCache.getNode(),r,s),l=zt(t,c,!0,e.filter.filtersNodes());else{const i=ge(n);if(".priority"===i)c=e.filter.updatePriority(t.eventCache.getNode(),r),l=zt(t,c,a.isFullyInitialized(),a.isFiltered());else{const o=ye(n),c=a.getNode().getImmediateChild(i);let u;if(_e(o))u=r;else{const e=d.getCompleteChild(i);u=null!=e?".priority"===be(o)&&e.getChild(xe(o)).isEmpty()?e:e.updateChild(o,r):it.EMPTY_NODE}if(c.equals(u))l=t;else{l=zt(t,e.filter.updateChild(a.getNode(),i,u,o,d,s),a.isFullyInitialized(),e.filter.filtersNodes())}}}return l}function Sn(e,t){return e.eventCache.isCompleteForChild(t)}function Cn(e,t,n){return n.foreach(((e,n)=>{t=t.updateChild(e,n)})),t}function En(e,t,n,r,i,o,s,a){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let l,c=t;l=_e(n)?r:new Ht(null).setTree(n,r);const d=t.serverCache.getNode();return l.children.inorderTraversal(((n,r)=>{if(d.hasChild(n)){const l=Cn(0,t.serverCache.getNode().getImmediateChild(n),r);c=_n(e,c,new pe(n),l,i,o,s,a)}})),l.children.inorderTraversal(((n,r)=>{const l=!t.serverCache.isCompleteForChild(n)&&null===r.value;if(!d.hasChild(n)&&!l){const l=Cn(0,t.serverCache.getNode().getImmediateChild(n),r);c=_n(e,c,new pe(n),l,i,o,s,a)}})),c}class Tn{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const n=this.query_._queryParams,r=new ft(n.getIndex()),i=(o=n).loadsAllData()?new ft(o.getIndex()):o.hasLimit()?new mt(o):new gt(o);var o;this.processor_=function(e){return{filter:e}}(i);const s=t.serverCache,a=t.eventCache,l=r.updateFullNode(it.EMPTY_NODE,s.getNode(),null),c=i.updateFullNode(it.EMPTY_NODE,a.getNode(),null),d=new Dt(l,s.isFullyInitialized(),r.filtersNodes()),u=new Dt(c,a.isFullyInitialized(),i.filtersNodes());this.viewCache_=Mt(u,d),this.eventGenerator_=new Lt(this.query_)}get query(){return this.query_}}function In(e,t){const n=Bt(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!_e(t)&&!n.getImmediateChild(ge(t)).isEmpty())?n.getChild(t):null}function jn(e){return 0===e.eventRegistrations_.length}function Pn(e,t,n){const r=[];if(n){(0,o.vA)(null==t,"A cancel should cancel all event registrations.");const i=e.query._path;e.eventRegistrations_.forEach((e=>{const t=e.createCancelEvent(n,i);t&&r.push(t)}))}if(t){let n=[];for(let r=0;r<e.eventRegistrations_.length;++r){const i=e.eventRegistrations_[r];if(i.matches(t)){if(t.hasAnyCallback()){n=n.concat(e.eventRegistrations_.slice(r+1));break}}else n.push(i)}e.eventRegistrations_=n}else e.eventRegistrations_=[];return r}function An(e,t,n,r){t.type===jt.MERGE&&null!==t.source.queryId&&((0,o.vA)(Bt(e.viewCache_),"We should always have a full cache before handling merges"),(0,o.vA)($t(e.viewCache_),"Missing event cache, even though we have a server cache"));const i=e.viewCache_,s=xn(e.processor_,i,t,n,r);var a,l;return a=e.processor_,l=s.viewCache,(0,o.vA)(l.eventCache.getNode().isIndexed(a.filter.getIndex()),"Event snap not indexed"),(0,o.vA)(l.serverCache.getNode().isIndexed(a.filter.getIndex()),"Server snap not indexed"),(0,o.vA)(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),e.viewCache_=s.viewCache,Nn(e,s.changes,s.viewCache.eventCache.getNode(),null)}function Nn(e,t,n,r){const i=r?[r]:e.eventRegistrations_;return function(e,t,n,r){const i=[],o=[];return t.forEach((t=>{var n;"child_changed"===t.type&&e.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)&&o.push((n=t.childName,{type:"child_moved",snapshotNode:t.snapshotNode,childName:n}))})),Ft(e,i,"child_removed",t,r,n),Ft(e,i,"child_added",t,r,n),Ft(e,i,"child_moved",o,r,n),Ft(e,i,"child_changed",t,r,n),Ft(e,i,"value",t,r,n),i}(e.eventGenerator_,t,n,i)}let Rn,On;class Dn{constructor(){this.views=new Map}}function Ln(e,t,n,r){const i=t.source.queryId;if(null!==i){const s=e.views.get(i);return(0,o.vA)(null!=s,"SyncTree gave us an op for an invalid query."),An(s,t,n,r)}{let i=[];for(const o of e.views.values())i=i.concat(An(o,t,n,r));return i}}function Fn(e,t,n,r,i){const o=t._queryIdentifier,s=e.views.get(o);if(!s){let e=cn(n,i?r:null),o=!1;e?o=!0:r instanceof it?(e=dn(n,r),o=!1):(e=it.EMPTY_NODE,o=!1);const s=Mt(new Dt(e,o,!1),new Dt(r,i,!1));return new Tn(t,s)}return s}function Mn(e,t,n,r,i,o){const s=Fn(e,t,r,i,o);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,s),function(e,t){e.eventRegistrations_.push(t)}(s,n),function(e,t){const n=e.viewCache_.eventCache,r=[];n.getNode().isLeafNode()||n.getNode().forEachChild(Ze,((e,t)=>{r.push(ut(e,t))}));return n.isFullyInitialized()&&r.push(dt(n.getNode())),Nn(e,r,n.getNode(),t)}(s,n)}function zn(e,t,n,r){const i=t._queryIdentifier,s=[];let a=[];const l=Hn(e);if("default"===i)for(const[o,c]of e.views.entries())a=a.concat(Pn(c,n,r)),jn(c)&&(e.views.delete(o),c.query._queryParams.loadsAllData()||s.push(c.query));else{const t=e.views.get(i);t&&(a=a.concat(Pn(t,n,r)),jn(t)&&(e.views.delete(i),t.query._queryParams.loadsAllData()||s.push(t.query)))}return l&&!Hn(e)&&s.push(new((0,o.vA)(Rn,"Reference.ts has not been loaded"),Rn)(t._repo,t._path)),{removed:s,events:a}}function Un(e){const t=[];for(const n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function $n(e,t){let n=null;for(const r of e.views.values())n=n||In(r,t);return n}function Bn(e,t){if(t._queryParams.loadsAllData())return Vn(e);{const n=t._queryIdentifier;return e.views.get(n)}}function Wn(e,t){return null!=Bn(e,t)}function Hn(e){return null!=Vn(e)}function Vn(e){for(const t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}let qn=1;class Kn{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Ht(null),this.pendingWriteTree_={visibleWrites:Vt.empty(),allWrites:[],lastWriteId:-1},this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Yn(e,t,n,r,i){return function(e,t,n,r,i){(0,o.vA)(r>e.lastWriteId,"Stacking an older write on top of newer ones"),void 0===i&&(i=!0),e.allWrites.push({path:t,snap:n,writeId:r,visible:i}),i&&(e.visibleWrites=qt(e.visibleWrites,t,n)),e.lastWriteId=r}(e.pendingWriteTree_,t,n,r,i),i?rr(e,new Rt({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,n)):[]}function Gn(e,t,n,r){!function(e,t,n,r){(0,o.vA)(r>e.lastWriteId,"Stacking an older merge on top of newer ones"),e.allWrites.push({path:t,children:n,writeId:r,visible:!0}),e.visibleWrites=Kt(e.visibleWrites,t,n),e.lastWriteId=r}(e.pendingWriteTree_,t,n,r);const i=Ht.fromObject(n);return rr(e,new Ot({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,i))}function Zn(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=function(e,t){for(let n=0;n<e.allWrites.length;n++){const r=e.allWrites[n];if(r.writeId===t)return r}return null}(e.pendingWriteTree_,t);if(rn(e.pendingWriteTree_,t)){let t=new Ht(null);return null!=r.snap?t=t.set(fe(),!0):L(r.children,(e=>{t=t.set(new pe(e),!0)})),rr(e,new At(r.path,t,n))}return[]}function Qn(e,t,n){return rr(e,new Rt({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,n))}function Jn(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];const o=t._path,s=e.syncPointTree_.get(o);let a=[];if(s&&("default"===t._queryIdentifier||Wn(s,t))){const l=zn(s,t,n,r);0===s.views.size&&(e.syncPointTree_=e.syncPointTree_.remove(o));const c=l.removed;if(a=l.events,!i){const n=-1!==c.findIndex((e=>e._queryParams.loadsAllData())),i=e.syncPointTree_.findOnPath(o,((e,t)=>Hn(t)));if(n&&!i){const t=e.syncPointTree_.subtree(o);if(!t.isEmpty()){const n=function(e){return e.fold(((e,t,n)=>{if(t&&Hn(t)){return[Vn(t)]}{let e=[];return t&&(e=Un(t)),L(n,((t,n)=>{e=e.concat(n)})),e}}))}(t);for(let t=0;t<n.length;++t){const r=n[t],i=r.query,o=sr(e,r);e.listenProvider_.startListening(hr(i),ar(e,i),o.hashFn,o.onComplete)}}}if(!i&&c.length>0&&!r)if(n){const n=null;e.listenProvider_.stopListening(hr(t),n)}else c.forEach((t=>{const n=e.queryToTagMap.get(lr(t));e.listenProvider_.stopListening(hr(t),n)}))}!function(e,t){for(let n=0;n<t.length;++n){const r=t[n];if(!r._queryParams.loadsAllData()){const t=lr(r),n=e.queryToTagMap.get(t);e.queryToTagMap.delete(t),e.tagToQueryMap.delete(n)}}}(e,c)}return a}function Xn(e,t,n,r){const i=cr(e,r);if(null!=i){const r=dr(i),o=r.path,s=r.queryId,a=ke(o,t);return ur(e,o,new Rt(Pt(s),a,n))}return[]}function er(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const i=t._path;let s=null,a=!1;e.syncPointTree_.foreachOnPath(i,((e,t)=>{const n=ke(e,i);s=s||$n(t,n),a=a||Hn(t)}));let l,c=e.syncPointTree_.get(i);if(c?(a=a||Hn(c),s=s||$n(c,fe())):(c=new Dn,e.syncPointTree_=e.syncPointTree_.set(i,c)),null!=s)l=!0;else{l=!1,s=it.EMPTY_NODE;e.syncPointTree_.subtree(i).foreachChild(((e,t)=>{const n=$n(t,fe());n&&(s=s.updateImmediateChild(e,n))}))}const d=Wn(c,t);if(!d&&!t._queryParams.loadsAllData()){const n=lr(t);(0,o.vA)(!e.queryToTagMap.has(n),"View does not exist, but we have a tag");const r=qn++;e.queryToTagMap.set(n,r),e.tagToQueryMap.set(r,n)}let u=Mn(c,t,n,nn(e.pendingWriteTree_,i),s,l);if(!d&&!a&&!r){const n=Bn(c,t);u=u.concat(function(e,t,n){const r=t._path,i=ar(e,t),s=sr(e,n),a=e.listenProvider_.startListening(hr(t),i,s.hashFn,s.onComplete),l=e.syncPointTree_.subtree(r);if(i)(0,o.vA)(!Hn(l.value),"If we're adding a query, it shouldn't be shadowed");else{const t=l.fold(((e,t,n)=>{if(!_e(e)&&t&&Hn(t))return[Vn(t).query];{let e=[];return t&&(e=e.concat(Un(t).map((e=>e.query)))),L(n,((t,n)=>{e=e.concat(n)})),e}}));for(let n=0;n<t.length;++n){const r=t[n];e.listenProvider_.stopListening(hr(r),ar(e,r))}}return a}(e,t,n))}return u}function tr(e,t,n){const r=e.pendingWriteTree_,i=e.syncPointTree_.findOnPath(t,((e,n)=>{const r=$n(n,ke(e,t));if(r)return r}));return ln(r,t,i,n,!0)}function nr(e,t){const n=t._path;let r=null;e.syncPointTree_.foreachOnPath(n,((e,t)=>{const i=ke(e,n);r=r||$n(t,i)}));let i=e.syncPointTree_.get(n);i?r=r||$n(i,fe()):(i=new Dn,e.syncPointTree_=e.syncPointTree_.set(n,i));const o=null!=r,s=o?new Dt(r,!0,!1):null;return function(e){return $t(e.viewCache_)}(Fn(i,t,nn(e.pendingWriteTree_,t._path),o?s.getNode():it.EMPTY_NODE,o))}function rr(e,t){return ir(t,e.syncPointTree_,null,nn(e.pendingWriteTree_,fe()))}function ir(e,t,n,r){if(_e(e.path))return or(e,t,n,r);{const i=t.get(fe());null==n&&null!=i&&(n=$n(i,fe()));let o=[];const s=ge(e.path),a=e.operationForChild(s),l=t.children.get(s);if(l&&a){const e=n?n.getImmediateChild(s):null,t=gn(r,s);o=o.concat(ir(a,l,e,t))}return i&&(o=o.concat(Ln(i,e,r,n))),o}}function or(e,t,n,r){const i=t.get(fe());null==n&&null!=i&&(n=$n(i,fe()));let o=[];return t.children.inorderTraversal(((t,i)=>{const s=n?n.getImmediateChild(t):null,a=gn(r,t),l=e.operationForChild(t);l&&(o=o.concat(or(l,i,s,a)))})),i&&(o=o.concat(Ln(i,e,r,n))),o}function sr(e,t){const n=t.query,r=ar(e,n);return{hashFn:()=>{const e=function(e){return e.viewCache_.serverCache.getNode()}(t)||it.EMPTY_NODE;return e.hash()},onComplete:t=>{if("ok"===t)return r?function(e,t,n){const r=cr(e,n);if(r){const n=dr(r),i=n.path,o=n.queryId,s=ke(i,t);return ur(e,i,new Nt(Pt(o),s))}return[]}(e,n._path,r):function(e,t){return rr(e,new Nt({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t))}(e,n._path);{const r=function(e,t){let n="Unknown Error";"too_big"===e?n="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"===e?n="Client doesn't have permission to access the desired data.":"unavailable"===e&&(n="The service is unavailable");const r=new Error(e+" at "+t._path.toString()+": "+n);return r.code=e.toUpperCase(),r}(t,n);return Jn(e,n,null,r)}}}}function ar(e,t){const n=lr(t);return e.queryToTagMap.get(n)}function lr(e){return e._path.toString()+"$"+e._queryIdentifier}function cr(e,t){return e.tagToQueryMap.get(t)}function dr(e){const t=e.indexOf("$");return(0,o.vA)(-1!==t&&t<e.length-1,"Bad queryKey."),{queryId:e.substr(t+1),path:new pe(e.substr(0,t))}}function ur(e,t,n){const r=e.syncPointTree_.get(t);(0,o.vA)(r,"Missing sync point for query tag that we're tracking");return Ln(r,n,nn(e.pendingWriteTree_,t),null)}function hr(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new((0,o.vA)(On,"Reference.ts has not been loaded"),On)(e._repo,e._path):e}class pr{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new pr(t)}node(){return this.node_}}class fr{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=we(this.path_,e);return new fr(this.syncTree_,t)}node(){return tr(this.syncTree_,this.path_)}}const gr=function(e){return(e=e||{}).timestamp=e.timestamp||(new Date).getTime(),e},mr=function(e,t,n){return e&&"object"===typeof e?((0,o.vA)(".sv"in e,"Unexpected leaf node or priority contents"),"string"===typeof e[".sv"]?yr(e[".sv"],t,n):"object"===typeof e[".sv"]?br(e[".sv"],t):void(0,o.vA)(!1,"Unexpected server value: "+JSON.stringify(e,null,2))):e},yr=function(e,t,n){if("timestamp"===e)return n.timestamp;(0,o.vA)(!1,"Unexpected server value: "+e)},br=function(e,t,n){e.hasOwnProperty("increment")||(0,o.vA)(!1,"Unexpected server value: "+JSON.stringify(e,null,2));const r=e.increment;"number"!==typeof r&&(0,o.vA)(!1,"Unexpected increment value: "+r);const i=t.node();if((0,o.vA)(null!==i&&"undefined"!==typeof i,"Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const s=i.getValue();return"number"!==typeof s?r:s+r},vr=function(e,t,n,r){return wr(t,new fr(n,e),r)},xr=function(e,t,n){return wr(e,new pr(t),n)};function wr(e,t,n){const r=e.getPriority().val(),i=mr(r,t.getImmediateChild(".priority"),n);let o;if(e.isLeafNode()){const r=e,o=mr(r.getValue(),t,n);return o!==r.getValue()||i!==r.getPriority().val()?new Ge(o,at(i)):e}{const r=e;return o=r,i!==r.getPriority().val()&&(o=o.updatePriority(new Ge(i))),r.forEachChild(Ze,((e,r)=>{const i=wr(r,t.getImmediateChild(e),n);i!==r&&(o=o.updateImmediateChild(e,i))})),o}}class _r{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:{},childCount:0};this.name=e,this.parent=t,this.node=n}}function kr(e,t){let n=t instanceof pe?t:new pe(t),r=e,i=ge(n);for(;null!==i;){const e=(0,o.yw)(r.node.children,i)||{children:{},childCount:0};r=new _r(i,r,e),n=ye(n),i=ge(n)}return r}function Sr(e){return e.node.value}function Cr(e,t){e.node.value=t,Pr(e)}function Er(e){return e.node.childCount>0}function Tr(e,t){L(e.node.children,((n,r)=>{t(new _r(n,e,r))}))}function Ir(e,t,n,r){n&&!r&&t(e),Tr(e,(e=>{Ir(e,t,!0,r)})),n&&r&&t(e)}function jr(e){return new pe(null===e.parent?e.name:jr(e.parent)+"/"+e.name)}function Pr(e){null!==e.parent&&function(e,t,n){const r=function(e){return void 0===Sr(e)&&!Er(e)}(n),i=(0,o.gR)(e.node.children,t);r&&i?(delete e.node.children[t],e.node.childCount--,Pr(e)):r||i||(e.node.children[t]=n.node,e.node.childCount++,Pr(e))}(e.parent,e.name,e)}const Ar=/[\[\].#$\/\u0000-\u001F\u007F]/,Nr=/[\[\].#$\u0000-\u001F\u007F]/,Rr=10485760,Or=function(e){return"string"===typeof e&&0!==e.length&&!Ar.test(e)},Dr=function(e){return"string"===typeof e&&0!==e.length&&!Nr.test(e)},Lr=function(e){return null===e||"string"===typeof e||"number"===typeof e&&!I(e)||e&&"object"===typeof e&&(0,o.gR)(e,".sv")},Fr=function(e,t,n,r){r&&void 0===t||Mr((0,o.dI)(e,"value"),t,n)},Mr=function(e,t,n){const r=n instanceof pe?new Te(n,e):n;if(void 0===t)throw new Error(e+"contains undefined "+je(r));if("function"===typeof t)throw new Error(e+"contains a function "+je(r)+" with contents = "+t.toString());if(I(t))throw new Error(e+"contains "+t.toString()+" "+je(r));if("string"===typeof t&&t.length>Rr/3&&(0,o.OE)(t)>Rr)throw new Error(e+"contains a string greater than "+Rr+" utf8 bytes "+je(r)+" ('"+t.substring(0,50)+"...')");if(t&&"object"===typeof t){let n=!1,i=!1;if(L(t,((t,s)=>{if(".value"===t)n=!0;else if(".priority"!==t&&".sv"!==t&&(i=!0,!Or(t)))throw new Error(e+" contains an invalid key ("+t+") "+je(r)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');!function(e,t){e.parts_.length>0&&(e.byteLength_+=1),e.parts_.push(t),e.byteLength_+=(0,o.OE)(t),Ie(e)}(r,t),Mr(e,s,r),function(e){const t=e.parts_.pop();e.byteLength_-=(0,o.OE)(t),e.parts_.length>0&&(e.byteLength_-=1)}(r)})),n&&i)throw new Error(e+' contains ".value" child '+je(r)+" in addition to actual children.")}},zr=function(e,t,n,r){if(r&&void 0===t)return;const i=(0,o.dI)(e,"values");if(!t||"object"!==typeof t||Array.isArray(t))throw new Error(i+" must be an object containing the children to replace.");const s=[];L(t,((e,t)=>{const r=new pe(e);if(Mr(i,t,we(n,r)),".priority"===be(r)&&!Lr(t))throw new Error(i+"contains an invalid value for '"+r.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(r)})),function(e,t){let n,r;for(n=0;n<t.length;n++){r=t[n];const i=ve(r);for(let t=0;t<i.length;t++)if(".priority"===i[t]&&t===i.length-1);else if(!Or(i[t]))throw new Error(e+"contains an invalid key ("+i[t]+") in path "+r.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"')}t.sort(Se);let i=null;for(n=0;n<t.length;n++){if(r=t[n],null!==i&&Ee(i,r))throw new Error(e+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}}(i,s)},Ur=function(e,t,n){if(!n||void 0!==t){if(I(t))throw new Error((0,o.dI)(e,"priority")+"is "+t.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Lr(t))throw new Error((0,o.dI)(e,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")}},$r=function(e,t,n,r){if((!r||void 0!==n)&&!Dr(n))throw new Error((0,o.dI)(e,t)+'was an invalid path = "'+n+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')},Br=function(e,t,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),$r(e,t,n,r)},Wr=function(e,t){if(".info"===ge(t))throw new Error(e+" failed = Can't modify data under /.info/")},Hr=function(e,t){const n=t.path.toString();if("string"!==typeof t.repoInfo.host||0===t.repoInfo.host.length||!Or(t.repoInfo.namespace)&&"localhost"!==t.repoInfo.host.split(":")[0]||0!==n.length&&!function(e){return e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),Dr(e)}(n))throw new Error((0,o.dI)(e,"url")+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')};class Vr{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function qr(e,t){let n=null;for(let r=0;r<t.length;r++){const i=t[r],o=i.getPath();null===n||Ce(o,n.path)||(e.eventLists_.push(n),n=null),null===n&&(n={events:[],path:o}),n.events.push(i)}n&&e.eventLists_.push(n)}function Kr(e,t,n){qr(e,n),Gr(e,(e=>Ce(e,t)))}function Yr(e,t,n){qr(e,n),Gr(e,(e=>Ee(e,t)||Ee(t,e)))}function Gr(e,t){e.recursionDepth_++;let n=!0;for(let r=0;r<e.eventLists_.length;r++){const i=e.eventLists_[r];if(i){t(i.path)?(Zr(e.eventLists_[r]),e.eventLists_[r]=null):n=!1}}n&&(e.eventLists_=[]),e.recursionDepth_--}function Zr(e){for(let t=0;t<e.events.length;t++){const n=e.events[t];if(null!==n){e.events[t]=null;const r=n.getEventRunner();x&&k("event: "+n.toString()),U(r)}}}const Qr="repo_interrupt",Jr=25;class Xr{constructor(e,t,n,r){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Vr,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=kt(),this.transactionQueueTree_=new _r,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function ei(e,t,n){if(e.stats_=te(e.repoInfo_),e.forceRestClient_||("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0)e.server_=new wt(e.repoInfo_,((t,n,r,i)=>{ri(e,t,n,r,i)}),e.authTokenProvider_,e.appCheckProvider_),setTimeout((()=>ii(e,!0)),0);else{if("undefined"!==typeof n&&null!==n){if("object"!==typeof n)throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{(0,o.As)(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}e.persistentConnection_=new Ne(e.repoInfo_,t,((t,n,r,i)=>{ri(e,t,n,r,i)}),(t=>{ii(e,t)}),(t=>{!function(e,t){L(t,((t,n)=>{oi(e,t,n)}))}(e,t)}),e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener((t=>{e.server_.refreshAuthToken(t)})),e.appCheckProvider_.addTokenChangeListener((t=>{e.server_.refreshAppCheckToken(t.token)})),e.statsReporter_=function(e,t){const n=e.toString();return ee[n]||(ee[n]=t()),ee[n]}(e.repoInfo_,(()=>new It(e.stats_,e.server_))),e.infoData_=new _t,e.infoSyncTree_=new Kn({startListening:(t,n,r,i)=>{let o=[];const s=e.infoData_.getNode(t._path);return s.isEmpty()||(o=Qn(e.infoSyncTree_,t._path,s),setTimeout((()=>{i("ok")}),0)),o},stopListening:()=>{}}),oi(e,"connected",!1),e.serverSyncTree_=new Kn({startListening:(t,n,r,i)=>(e.server_.listen(t,r,n,((n,r)=>{const o=i(n,r);Yr(e.eventQueue_,t._path,o)})),[]),stopListening:(t,n)=>{e.server_.unlisten(t,n)}})}function ti(e){const t=e.infoData_.getNode(new pe(".info/serverTimeOffset")).val()||0;return(new Date).getTime()+t}function ni(e){return gr({timestamp:ti(e)})}function ri(e,t,n,r,i){e.dataUpdateCount++;const s=new pe(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let a=[];if(i)if(r){const t=(0,o.kH)(n,(e=>at(e)));a=function(e,t,n,r){const i=cr(e,r);if(i){const r=dr(i),o=r.path,s=r.queryId,a=ke(o,t),l=Ht.fromObject(n);return ur(e,o,new Ot(Pt(s),a,l))}return[]}(e.serverSyncTree_,s,t,i)}else{const t=at(n);a=Xn(e.serverSyncTree_,s,t,i)}else if(r){const t=(0,o.kH)(n,(e=>at(e)));a=function(e,t,n){const r=Ht.fromObject(n);return rr(e,new Ot({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,r))}(e.serverSyncTree_,s,t)}else{const t=at(n);a=Qn(e.serverSyncTree_,s,t)}let l=s;a.length>0&&(l=mi(e,s)),Yr(e.eventQueue_,l,a)}function ii(e,t){oi(e,"connected",t),!1===t&&function(e){hi(e,"onDisconnectEvents");const t=ni(e),n=kt();Et(e.onDisconnect_,fe(),((r,i)=>{const o=vr(r,i,e.serverSyncTree_,t);St(n,r,o)}));let r=[];Et(n,fe(),((t,n)=>{r=r.concat(Qn(e.serverSyncTree_,t,n));const i=wi(e,t);mi(e,i)})),e.onDisconnect_=kt(),Yr(e.eventQueue_,fe(),r)}(e)}function oi(e,t,n){const r=new pe("/.info/"+t),i=at(n);e.infoData_.updateSnapshot(r,i);const o=Qn(e.infoSyncTree_,r,i);Yr(e.eventQueue_,r,o)}function si(e){return e.nextWriteId_++}function ai(e,t,n,r,i){hi(e,"set",{path:t.toString(),value:n,priority:r});const o=ni(e),s=at(n,r),a=tr(e.serverSyncTree_,t),l=xr(s,a,o),c=si(e),d=Yn(e.serverSyncTree_,t,l,c,!0);qr(e.eventQueue_,d),e.server_.put(t.toString(),s.val(!0),((n,r)=>{const o="ok"===n;o||T("set at "+t+" failed: "+n);const s=Zn(e.serverSyncTree_,c,!o);Yr(e.eventQueue_,t,s),pi(e,i,n,r)}));const u=wi(e,t);mi(e,u),Yr(e.eventQueue_,u,[])}function li(e,t,n){e.server_.onDisconnectCancel(t.toString(),((r,i)=>{"ok"===r&&Ct(e.onDisconnect_,t),pi(e,n,r,i)}))}function ci(e,t,n,r){const i=at(n);e.server_.onDisconnectPut(t.toString(),i.val(!0),((n,o)=>{"ok"===n&&St(e.onDisconnect_,t,i),pi(e,r,n,o)}))}function di(e,t,n){let r;r=".info"===ge(t._path)?Jn(e.infoSyncTree_,t,n):Jn(e.serverSyncTree_,t,n),Kr(e.eventQueue_,t._path,r)}function ui(e){e.persistentConnection_&&e.persistentConnection_.interrupt(Qr)}function hi(e){let t="";e.persistentConnection_&&(t=e.persistentConnection_.id+":");for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];k(t,...r)}function pi(e,t,n,r){t&&U((()=>{if("ok"===n)t(null);else{const e=(n||"error").toUpperCase();let i=e;r&&(i+=": "+r);const o=new Error(i);o.code=e,t(o)}}))}function fi(e,t,n){return tr(e.serverSyncTree_,t,n)||it.EMPTY_NODE}function gi(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.transactionQueueTree_;if(t||xi(e,t),Sr(t)){const n=bi(e,t);(0,o.vA)(n.length>0,"Sending zero length transaction queue");n.every((e=>0===e.status))&&function(e,t,n){const r=n.map((e=>e.currentWriteId)),i=fi(e,t,r);let s=i;const a=i.hash();for(let d=0;d<n.length;d++){const e=n[d];(0,o.vA)(0===e.status,"tryToSendTransactionQueue_: items in queue should all be run."),e.status=1,e.retryCount++;const r=ke(t,e.path);s=s.updateChild(r,e.currentOutputSnapshotRaw)}const l=s.val(!0),c=t;e.server_.put(c.toString(),l,(r=>{hi(e,"transaction put response",{path:c.toString(),status:r});let i=[];if("ok"===r){const r=[];for(let t=0;t<n.length;t++)n[t].status=2,i=i.concat(Zn(e.serverSyncTree_,n[t].currentWriteId)),n[t].onComplete&&r.push((()=>n[t].onComplete(null,!0,n[t].currentOutputSnapshotResolved))),n[t].unwatcher();xi(e,kr(e.transactionQueueTree_,t)),gi(e,e.transactionQueueTree_),Yr(e.eventQueue_,t,i);for(let e=0;e<r.length;e++)U(r[e])}else{if("datastale"===r)for(let e=0;e<n.length;e++)3===n[e].status?n[e].status=4:n[e].status=0;else{T("transaction at "+c.toString()+" failed: "+r);for(let e=0;e<n.length;e++)n[e].status=4,n[e].abortReason=r}mi(e,t)}}),a)}(e,jr(t),n)}else Er(t)&&Tr(t,(t=>{gi(e,t)}))}function mi(e,t){const n=yi(e,t),r=jr(n);return function(e,t,n){if(0===t.length)return;const r=[];let i=[];const s=t.filter((e=>0===e.status)),a=s.map((e=>e.currentWriteId));for(let c=0;c<t.length;c++){const s=t[c],d=ke(n,s.path);let u,h=!1;if((0,o.vA)(null!==d,"rerunTransactionsUnderNode_: relativePath should not be null."),4===s.status)h=!0,u=s.abortReason,i=i.concat(Zn(e.serverSyncTree_,s.currentWriteId,!0));else if(0===s.status)if(s.retryCount>=Jr)h=!0,u="maxretry",i=i.concat(Zn(e.serverSyncTree_,s.currentWriteId,!0));else{const n=fi(e,s.path,a);s.currentInputSnapshot=n;const r=t[c].update(n.val());if(void 0!==r){Mr("transaction failed: Data returned ",r,s.path);let t=at(r);"object"===typeof r&&null!=r&&(0,o.gR)(r,".priority")||(t=t.updatePriority(n.getPriority()));const l=s.currentWriteId,c=ni(e),d=xr(t,n,c);s.currentOutputSnapshotRaw=t,s.currentOutputSnapshotResolved=d,s.currentWriteId=si(e),a.splice(a.indexOf(l),1),i=i.concat(Yn(e.serverSyncTree_,s.path,d,s.currentWriteId,s.applyLocally)),i=i.concat(Zn(e.serverSyncTree_,l,!0))}else h=!0,u="nodata",i=i.concat(Zn(e.serverSyncTree_,s.currentWriteId,!0))}Yr(e.eventQueue_,n,i),i=[],h&&(t[c].status=2,l=t[c].unwatcher,setTimeout(l,Math.floor(0)),t[c].onComplete&&("nodata"===u?r.push((()=>t[c].onComplete(null,!1,t[c].currentInputSnapshot))):r.push((()=>t[c].onComplete(new Error(u),!1,null)))))}var l;xi(e,e.transactionQueueTree_);for(let o=0;o<r.length;o++)U(r[o]);gi(e,e.transactionQueueTree_)}(e,bi(e,n),r),r}function yi(e,t){let n,r=e.transactionQueueTree_;for(n=ge(t);null!==n&&void 0===Sr(r);)r=kr(r,n),n=ge(t=ye(t));return r}function bi(e,t){const n=[];return vi(e,t,n),n.sort(((e,t)=>e.order-t.order)),n}function vi(e,t,n){const r=Sr(t);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);Tr(t,(t=>{vi(e,t,n)}))}function xi(e,t){const n=Sr(t);if(n){let e=0;for(let t=0;t<n.length;t++)2!==n[t].status&&(n[e]=n[t],e++);n.length=e,Cr(t,n.length>0?n:void 0)}Tr(t,(t=>{xi(e,t)}))}function wi(e,t){const n=jr(yi(e,t)),r=kr(e.transactionQueueTree_,t);return function(e,t,n){let r=n?e:e.parent;for(;null!==r;){if(t(r))return!0;r=r.parent}}(r,(t=>{_i(e,t)})),_i(e,r),Ir(r,(t=>{_i(e,t)})),n}function _i(e,t){const n=Sr(t);if(n){const r=[];let i=[],s=-1;for(let t=0;t<n.length;t++)3===n[t].status||(1===n[t].status?((0,o.vA)(s===t-1,"All SENT items should be at beginning of queue."),s=t,n[t].status=3,n[t].abortReason="set"):((0,o.vA)(0===n[t].status,"Unexpected transaction status in abort"),n[t].unwatcher(),i=i.concat(Zn(e.serverSyncTree_,n[t].currentWriteId,!0)),n[t].onComplete&&r.push(n[t].onComplete.bind(null,new Error("set"),!1,null))));-1===s?Cr(t,void 0):n.length=s+1,Yr(e.eventQueue_,jr(t),i);for(let e=0;e<r.length;e++)U(r[e])}}const ki=function(e,t){const n=Si(e),r=n.namespace;"firebase.com"===n.domain&&E(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),r&&"undefined"!==r||"localhost"===n.domain||E("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&T("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");const i="ws"===n.scheme||"wss"===n.scheme;return{repoInfo:new Z(n.host,n.secure,r,i,t,"",r!==n.subdomain),path:new pe(n.pathString)}},Si=function(e){let t="",n="",r="",i="",o="",s=!0,a="https",l=443;if("string"===typeof e){let c=e.indexOf("//");c>=0&&(a=e.substring(0,c-1),e=e.substring(c+2));let d=e.indexOf("/");-1===d&&(d=e.length);let u=e.indexOf("?");-1===u&&(u=e.length),t=e.substring(0,Math.min(d,u)),d<u&&(i=function(e){let t="";const n=e.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let e=n[i];try{e=decodeURIComponent(e.replace(/\+/g," "))}catch(r){}t+="/"+e}return t}(e.substring(d,u)));const h=function(e){const t={};"?"===e.charAt(0)&&(e=e.substring(1));for(const n of e.split("&")){if(0===n.length)continue;const r=n.split("=");2===r.length?t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):T(`Invalid query segment '${n}' in query '${e}'`)}return t}(e.substring(Math.min(e.length,u)));c=t.indexOf(":"),c>=0?(s="https"===a||"wss"===a,l=parseInt(t.substring(c+1),10)):c=t.length;const p=t.slice(0,c);if("localhost"===p.toLowerCase())n="localhost";else if(p.split(".").length<=2)n=p;else{const e=t.indexOf(".");r=t.substring(0,e).toLowerCase(),n=t.substring(e+1),o=r}"ns"in h&&(o=h.ns)}return{host:t,port:l,domain:n,subdomain:r,secure:s,scheme:a,pathString:i,namespace:o}},Ci="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Ei=function(){let e=0;const t=[];return function(n){const r=n===e;let i;e=n;const s=new Array(8);for(i=7;i>=0;i--)s[i]=Ci.charAt(n%64),n=Math.floor(n/64);(0,o.vA)(0===n,"Cannot push at time == 0");let a=s.join("");if(r){for(i=11;i>=0&&63===t[i];i--)t[i]=0;t[i]++}else for(i=0;i<12;i++)t[i]=Math.floor(64*Math.random());for(i=0;i<12;i++)a+=Ci.charAt(t[i]);return(0,o.vA)(20===a.length,"nextPushId: Length should be 20."),a}}();class Ti{constructor(e,t,n,r){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=r}getPath(){const e=this.snapshot.ref;return"value"===this.eventType?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+(0,o.As)(this.snapshot.exportVal())}}class Ii{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}class ji{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return(0,o.vA)(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||void 0!==this.snapshotCallback.userCallback&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}class Pi{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new o.cY;return li(this._repo,this._path,e.wrapCallback((()=>{}))),e.promise}remove(){Wr("OnDisconnect.remove",this._path);const e=new o.cY;return ci(this._repo,this._path,null,e.wrapCallback((()=>{}))),e.promise}set(e){Wr("OnDisconnect.set",this._path),Fr("OnDisconnect.set",e,this._path,!1);const t=new o.cY;return ci(this._repo,this._path,e,t.wrapCallback((()=>{}))),t.promise}setWithPriority(e,t){Wr("OnDisconnect.setWithPriority",this._path),Fr("OnDisconnect.setWithPriority",e,this._path,!1),Ur("OnDisconnect.setWithPriority",t,!1);const n=new o.cY;return function(e,t,n,r,i){const o=at(n,r);e.server_.onDisconnectPut(t.toString(),o.val(!0),((n,r)=>{"ok"===n&&St(e.onDisconnect_,t,o),pi(0,i,n,r)}))}(this._repo,this._path,e,t,n.wrapCallback((()=>{}))),n.promise}update(e){Wr("OnDisconnect.update",this._path),zr("OnDisconnect.update",e,this._path,!1);const t=new o.cY;return function(e,t,n,r){if((0,o.Im)(n))return k("onDisconnect().update() called with empty data.  Don't do anything."),void pi(0,r,"ok",void 0);e.server_.onDisconnectMerge(t.toString(),n,((i,o)=>{"ok"===i&&L(n,((n,r)=>{const i=at(r);St(e.onDisconnect_,we(t,n),i)})),pi(0,r,i,o)}))}(this._repo,this._path,e,t.wrapCallback((()=>{}))),t.promise}}class Ai{constructor(e,t,n,r){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=r}get key(){return _e(this._path)?null:be(this._path)}get ref(){return new Oi(this._repo,this._path)}get _queryIdentifier(){const e=xt(this._queryParams),t=O(e);return"{}"===t?"default":t}get _queryObject(){return xt(this._queryParams)}isEqual(e){if(!((e=(0,o.Ku)(e))instanceof Ai))return!1;const t=this._repo===e._repo,n=Ce(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return t&&n&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+function(e){let t="";for(let n=e.pieceNum_;n<e.pieces_.length;n++)""!==e.pieces_[n]&&(t+="/"+encodeURIComponent(String(e.pieces_[n])));return t||"/"}(this._path)}}function Ni(e,t){if(!0===e._orderByCalled)throw new Error(t+": You can't combine multiple orderBy calls.")}function Ri(e){let t=null,n=null;if(e.hasStart()&&(t=e.getIndexStartValue()),e.hasEnd()&&(n=e.getIndexEndValue()),e.getIndex()===Fe){const r="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(e.hasStart()){if(e.getIndexStartName()!==j)throw new Error(r);if("string"!==typeof t)throw new Error(i)}if(e.hasEnd()){if(e.getIndexEndName()!==P)throw new Error(r);if("string"!==typeof n)throw new Error(i)}}else if(e.getIndex()===Ze){if(null!=t&&!Lr(t)||null!=n&&!Lr(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if((0,o.vA)(e.getIndex()instanceof lt||e.getIndex()===ct,"unknown index type."),null!=t&&"object"===typeof t||null!=n&&"object"===typeof n)throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class Oi extends Ai{constructor(e,t){super(e,t,new yt,!1)}get parent(){const e=xe(this._path);return null===e?null:new Oi(this._repo,e)}get root(){let e=this;for(;null!==e.parent;)e=e.parent;return e}}class Di{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new pe(e),n=Fi(this.ref,e);return new Di(this._node.getChild(t),n,Ze)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){if(this._node.isLeafNode())return!1;return!!this._node.forEachChild(this._index,((t,n)=>e(new Di(n,Fi(this.ref,t),Ze))))}hasChild(e){const t=new pe(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return!this._node.isLeafNode()&&!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Li(e,t){return(e=(0,o.Ku)(e))._checkNotDeleted("ref"),void 0!==t?Fi(e._root,t):e._root}function Fi(e,t){return null===ge((e=(0,o.Ku)(e))._path)?Br("child","path",t,!1):$r("child","path",t,!1),new Oi(e._repo,we(e._path,t))}function Mi(e){return e=(0,o.Ku)(e),new Pi(e._repo,e._path)}function zi(e,t){e=(0,o.Ku)(e),Wr("push",e._path),Fr("push",t,e._path,!0);const n=ti(e._repo),r=Ei(n),i=Fi(e,r),s=Fi(e,r);let a;return a=null!=t?$i(s,t).then((()=>s)):Promise.resolve(s),i.then=a.then.bind(a),i.catch=a.then.bind(a,void 0),i}function Ui(e){return Wr("remove",e._path),$i(e,null)}function $i(e,t){e=(0,o.Ku)(e),Wr("set",e._path),Fr("set",t,e._path,!1);const n=new o.cY;return ai(e._repo,e._path,t,null,n.wrapCallback((()=>{}))),n.promise}function Bi(e,t){zr("update",t,e._path,!1);const n=new o.cY;return function(e,t,n,r){hi(e,"update",{path:t.toString(),value:n});let i=!0;const o=ni(e),s={};if(L(n,((n,r)=>{i=!1,s[n]=vr(we(t,n),at(r),e.serverSyncTree_,o)})),i)k("update() called with empty data.  Don't do anything."),pi(0,r,"ok",void 0);else{const i=si(e),o=Gn(e.serverSyncTree_,t,s,i);qr(e.eventQueue_,o),e.server_.merge(t.toString(),n,((n,o)=>{const s="ok"===n;s||T("update at "+t+" failed: "+n);const a=Zn(e.serverSyncTree_,i,!s),l=a.length>0?mi(e,t):t;Yr(e.eventQueue_,l,a),pi(0,r,n,o)})),L(n,(n=>{const r=wi(e,we(t,n));mi(e,r)})),Yr(e.eventQueue_,t,[])}}(e._repo,e._path,t,n.wrapCallback((()=>{}))),n.promise}function Wi(e){e=(0,o.Ku)(e);const t=new ji((()=>{})),n=new Hi(t);return function(e,t,n){const r=nr(e.serverSyncTree_,t);return null!=r?Promise.resolve(r):e.server_.get(t).then((r=>{const i=at(r).withIndex(t._queryParams.getIndex());let o;if(er(e.serverSyncTree_,t,n,!0),t._queryParams.loadsAllData())o=Qn(e.serverSyncTree_,t._path,i);else{const n=ar(e.serverSyncTree_,t);o=Xn(e.serverSyncTree_,t._path,i,n)}return Yr(e.eventQueue_,t._path,o),Jn(e.serverSyncTree_,t,n,null,!0),i}),(n=>(hi(e,"get for query "+(0,o.As)(t)+" failed: "+n),Promise.reject(new Error(n)))))}(e._repo,e,n).then((t=>new Di(t,new Oi(e._repo,e._path),e._queryParams.getIndex())))}class Hi{constructor(e){this.callbackContext=e}respondsTo(e){return"value"===e}createEvent(e,t){const n=t._queryParams.getIndex();return new Ti("value",this,new Di(e.snapshotNode,new Oi(t._repo,t._path),n))}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ii(this,e,t):null}matches(e){return e instanceof Hi&&(!e.callbackContext||!this.callbackContext||e.callbackContext.matches(this.callbackContext))}hasAnyCallback(){return null!==this.callbackContext}}class Vi{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t="children_added"===e?"child_added":e;return t="children_removed"===t?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ii(this,e,t):null}createEvent(e,t){(0,o.vA)(null!=e.childName,"Child events should have a childName.");const n=Fi(new Oi(t._repo,t._path),e.childName),r=t._queryParams.getIndex();return new Ti(e.type,this,new Di(e.snapshotNode,n,r),e.prevName)}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Vi&&(this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)))}hasAnyCallback(){return!!this.callbackContext}}function qi(e,t,n,r,i){let o;if("object"===typeof r&&(o=void 0,i=r),"function"===typeof r&&(o=r),i&&i.onlyOnce){const t=n,r=(n,r)=>{di(e._repo,e,a),t(n,r)};r.userCallback=n.userCallback,r.context=n.context,n=r}const s=new ji(n,o||void 0),a="value"===t?new Hi(s):new Vi(t,s);return function(e,t,n){let r;r=".info"===ge(t._path)?er(e.infoSyncTree_,t,n):er(e.serverSyncTree_,t,n),Kr(e.eventQueue_,t._path,r)}(e._repo,e,a),()=>di(e._repo,e,a)}function Ki(e,t,n,r){return qi(e,"value",t,n,r)}function Yi(e,t,n){let r=null;const i=n?new ji(n):null;"value"===t?r=new Hi(i):t&&(r=new Vi(t,i)),di(e._repo,e,r)}class Gi{}class Zi extends Gi{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ai(e._repo,e._path,function(e,t){const n=e.copy();return n.limitSet_=!0,n.limit_=t,n.viewFrom_="r",n}(e._queryParams,this._limit),e._orderByCalled)}}function Qi(e){if("number"!==typeof e||Math.floor(e)!==e||e<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new Zi(e)}class Ji extends Gi{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){Ni(e,"orderByChild");const t=new pe(this._path);if(_e(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const n=new lt(t),r=bt(e._queryParams,n);return Ri(r),new Ai(e._repo,e._path,r,!0)}}function Xi(e){if("$key"===e)throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if("$priority"===e)throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if("$value"===e)throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return $r("orderByChild","path",e,!1),new Ji(e)}function eo(e){let t=(0,o.Ku)(e);for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];for(const o of r)t=o._apply(t);return t}!function(e){(0,o.vA)(!Rn,"__referenceConstructor has already been defined"),Rn=e}(Oi),function(e){(0,o.vA)(!On,"__referenceConstructor has already been defined"),On=e}(Oi);const to={};let no=!1;function ro(e,t,n,r,i){let o=r||e.options.databaseURL;void 0===o&&(e.options.projectId||E("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),k("Using default host for project ",e.options.projectId),o=`${e.options.projectId}-default-rtdb.firebaseio.com`);let s,a,l=ki(o,i),c=l.repoInfo;"undefined"!==typeof process&&(a={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.FIREBASE_DATABASE_EMULATOR_HOST),a?(s=!0,o=`http://${a}?ns=${c.namespace}`,l=ki(o,i),c=l.repoInfo):s=!l.repoInfo.secure;const d=i&&s?new H(H.OWNER):new W(e.name,e.options,t);Hr("Invalid Firebase Database URL",l),_e(l.path)||E("Database URL must point to the root of a Firebase Database (not including a child path).");const u=function(e,t,n,r){let i=to[t.name];i||(i={},to[t.name]=i);let o=i[e.toURLString()];o&&E("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");return o=new Xr(e,no,n,r),i[e.toURLString()]=o,o}(c,e,d,new B(e,n));return new io(u,e)}class io{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(ei(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Oi(this._repo,fe())),this._rootInternal}_delete(){return null!==this._rootInternal&&(!function(e,t){const n=to[t];n&&n[e.key]===e||E(`Database ${t}(${e.repoInfo_}) has already been deleted.`),ui(e),delete n[e.key]}(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){null===this._rootInternal&&E("Cannot call "+e+" on a deleted database.")}}function oo(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Sx)(),t=arguments.length>1?arguments[1]:void 0;const n=(0,r.j6)(e,"database").getImmediate({identifier:t});if(!n._instanceStarted){const e=(0,o.yU)("database");e&&function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};e=(0,o.Ku)(e),e._checkNotDeleted("useEmulator");const i=`${t}:${n}`,s=e._repoInternal;if(e._instanceStarted){if(i===e._repoInternal.repoInfo_.host&&(0,o.bD)(r,s.repoInfo_.emulatorOptions))return;E("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let a;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&E('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),a=new H(H.OWNER);else if(r.mockUserToken){const t="string"===typeof r.mockUserToken?r.mockUserToken:(0,o.Fy)(r.mockUserToken,e.app.options.projectId);a=new H(t)}(0,o.zJ)(t)&&(0,o.gE)(t);!function(e,t,n,r){const i=t.lastIndexOf(":"),s=t.substring(0,i),a=(0,o.zJ)(s);e.repoInfo_=new Z(t,a,e.repoInfo_.namespace,e.repoInfo_.webSocketOnly,e.repoInfo_.nodeAdmin,e.repoInfo_.persistenceKey,e.repoInfo_.includeNamespaceInQueryParams,!0,n),r&&(e.authTokenProvider_=r)}(s,i,r,a)}(n,...e)}return n}const so={".sv":"timestamp"};function ao(){return so}class lo{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function co(e,t,n){if(e=(0,o.Ku)(e),Wr("Reference.transaction",e._path),".length"===e.key||".keys"===e.key)throw"Reference.transaction failed: "+e.key+" is a read-only object.";const r=n?.applyLocally??!0,i=new o.cY,s=Ki(e,(()=>{}));return function(e,t,n,r,i,s){hi(e,"transaction on "+t);const a={path:t,update:n,onComplete:r,status:null,order:y(),applyLocally:s,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},l=fi(e,t,void 0);a.currentInputSnapshot=l;const c=a.update(l.val());if(void 0===c)a.unwatcher(),a.currentOutputSnapshotRaw=null,a.currentOutputSnapshotResolved=null,a.onComplete&&a.onComplete(null,!1,a.currentInputSnapshot);else{Mr("transaction failed: Data returned ",c,a.path),a.status=0;const n=kr(e.transactionQueueTree_,t),r=Sr(n)||[];let i;r.push(a),Cr(n,r),"object"===typeof c&&null!==c&&(0,o.gR)(c,".priority")?(i=(0,o.yw)(c,".priority"),(0,o.vA)(Lr(i),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):i=(tr(e.serverSyncTree_,t)||it.EMPTY_NODE).getPriority().val();const s=ni(e),d=at(c,i),u=xr(d,l,s);a.currentOutputSnapshotRaw=d,a.currentOutputSnapshotResolved=u,a.currentWriteId=si(e);const h=Yn(e.serverSyncTree_,t,u,a.currentWriteId,a.applyLocally);Yr(e.eventQueue_,t,h),gi(e,e.transactionQueueTree_)}}(e._repo,e._path,t,((t,n,r)=>{let o=null;t?i.reject(t):(o=new Di(r,new Oi(e._repo,e._path),Ze),i.resolve(new lo(n,o)))}),s,r),i.promise}Ne.prototype.simpleListen=function(e,t){this.sendRequest("q",{p:e},t)},Ne.prototype.echo=function(e,t){this.sendRequest("echo",{d:e},t)};var uo;d(r.MF),(0,r.om)(new i.uA("database",((e,t)=>{let{instanceIdentifier:n}=t;return ro(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),n)}),"PUBLIC").setMultipleInstances(!0)),(0,r.KO)(a,l,uo),(0,r.KO)(a,l,"esm2020")},853:(e,t,n)=>{"use strict";e.exports=n(234)},873:(e,t,n)=>{"use strict";n.d(t,{F0:()=>xt,eJ:()=>ut,xI:()=>Mn,hg:()=>ft,J1:()=>dt,oM:()=>pt,x9:()=>ht,CI:()=>gt});var r=n(150),i=n(776),o=n(965),s=n(606);function a(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const l=a,c=new i.FA("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),d=new o.Vy("@firebase/auth");function u(e){if(d.logLevel<=o.$b.ERROR){for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];d.error(`Auth (${r.MF}): ${e}`,...n)}}function h(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw m(e,...n)}function p(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return m(e,...n)}function f(e,t,n){const r={...l(),[t]:n};return new i.FA("auth","Firebase",r).create(t,{appName:e.name})}function g(e){return f(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function m(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];if("string"!==typeof e){const t=n[0],r=[...n.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(t,...r)}return c.create(e,...n)}function y(e,t){if(!e){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];throw m(t,...r)}}function b(e){const t="INTERNAL ASSERTION FAILED: "+e;throw u(t),new Error(t)}function v(e,t){e||b(t)}function x(){return"undefined"!==typeof self&&self.location?.href||""}function w(){return"http:"===_()||"https:"===_()}function _(){return"undefined"!==typeof self&&self.location?.protocol||null}class k{constructor(e,t){this.shortDelay=e,this.longDelay=t,v(t>e,"Short delay should be less than long delay!"),this.isMobile=(0,i.jZ)()||(0,i.lV)()}get(){return"undefined"!==typeof navigator&&navigator&&"onLine"in navigator&&"boolean"===typeof navigator.onLine&&(w()||(0,i.sr)()||"connection"in navigator)&&!navigator.onLine?Math.min(5e3,this.shortDelay):this.isMobile?this.longDelay:this.shortDelay}}function S(e,t){v(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}class C{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!==typeof self&&"fetch"in self?self.fetch:"undefined"!==typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!==typeof fetch?fetch:void b("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!==typeof self&&"Headers"in self?self.Headers:"undefined"!==typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!==typeof Headers?Headers:void b("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!==typeof self&&"Response"in self?self.Response:"undefined"!==typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!==typeof Response?Response:void b("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}const E={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},T=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],I=new k(3e4,6e4);function j(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function P(e,t,n,r){return A(e,arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},(async()=>{let o={},s={};r&&("GET"===t?s=r:o={body:JSON.stringify(r)});const a=(0,i.Am)({key:e.config.apiKey,...s}).slice(1),l=await e._getAdditionalHeaders();l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode);const c={method:t,headers:l,...o};return(0,i.c1)()||(c.referrerPolicy="no-referrer"),e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(c.credentials="include"),C.fetch()(await R(e,e.config.apiHost,n,a),c)}))}async function A(e,t,n){e._canInitEmulator=!1;const r={...E,...t};try{const t=new D(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw L(e,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const t=i.ok?o.errorMessage:o.error.message,[n,s]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw L(e,"credential-already-in-use",o);if("EMAIL_EXISTS"===n)throw L(e,"email-already-in-use",o);if("USER_DISABLED"===n)throw L(e,"user-disabled",o);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(s)throw f(e,a,s);h(e,a)}}catch(o){if(o instanceof i.g)throw o;h(e,"network-request-failed",{message:String(o)})}}async function N(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};const o=await P(e,t,n,r,i);return"mfaPendingCredential"in o&&h(e,"multi-factor-auth-required",{_serverResponse:o}),o}async function R(e,t,n,r){const i=`${t}${n}?${r}`,o=e,s=o.config.emulator?S(e.config,i):`${e.config.apiScheme}://${i}`;if(T.includes(n)&&(await o._persistenceManagerAvailable,"COOKIE"===o._getPersistenceType())){return o._getPersistence()._getFinalTarget(s).toString()}return s}function O(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class D{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise(((e,t)=>{this.timer=setTimeout((()=>t(p(this.auth,"network-request-failed"))),I.get())}))}}function L(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=p(e,t,r);return i.customData._tokenResponse=n,i}function F(e){return void 0!==e&&void 0!==e.enterprise}class M{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return O(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function z(e,t){return P(e,"GET","/v2/recaptchaConfig",j(e,t))}async function U(e,t){return P(e,"POST","/v1/accounts:lookup",t)}function $(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}function B(e){return 1e3*Number(e)}function W(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return u("JWT malformed, contained fewer than 3 sections"),null;try{const e=(0,i.u)(n);return e?JSON.parse(e):(u("Failed to decode base64 JWT payload"),null)}catch(o){return u("Caught error parsing JWT payload as JSON",o?.toString()),null}}function H(e){const t=W(e);return y(t,"internal-error"),y("undefined"!==typeof t.exp,"internal-error"),y("undefined"!==typeof t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}async function V(e,t){if(arguments.length>2&&void 0!==arguments[2]&&arguments[2])return t;try{return await t}catch(n){throw n instanceof i.g&&function(e){let{code:t}=e;return"auth/user-disabled"===t||"auth/user-token-expired"===t}(n)&&e.auth.currentUser===e&&await e.auth.signOut(),n}}class q{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout((async()=>{await this.iteration()}),t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===e?.code&&this.schedule(!0))}this.schedule()}}class K{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=$(this.lastLoginAt),this.creationTime=$(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}async function Y(e){const t=e.auth,n=await e.getIdToken(),r=await V(e,U(t,{idToken:n}));y(r?.users.length,t,"internal-error");const i=r.users[0];e._notifyReloadListener(i);const o=i.providerUserInfo?.length?G(i.providerUserInfo):[],s=(a=e.providerData,l=o,[...a.filter((e=>!l.some((t=>t.providerId===e.providerId)))),...l]);var a,l;const c=e.isAnonymous,d=!(e.email&&i.passwordHash)&&!s?.length,u=!!c&&d,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new K(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(e,h)}function G(e){return e.map((e=>{let{providerId:t,...n}=e;return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}}))}class Z{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){y(e.idToken,"internal-error"),y("undefined"!==typeof e.idToken,"internal-error"),y("undefined"!==typeof e.refreshToken,"internal-error");const t="expiresIn"in e&&"undefined"!==typeof e.expiresIn?Number(e.expiresIn):H(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){y(0!==e.length,"internal-error");const t=H(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]||!this.accessToken||this.isExpired?(y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:o}=await async function(e,t){const n=await A(e,{},(async()=>{const n=(0,i.Am)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:o}=e.config,s=await R(e,r,"/v1/token",`key=${o}`),a=await e._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:a,body:n};return e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(l.credentials="include"),C.fetch()(s,l)}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,r,Number(o))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,o=new Z;return n&&(y("string"===typeof n,"internal-error",{appName:e}),o.refreshToken=n),r&&(y("string"===typeof r,"internal-error",{appName:e}),o.accessToken=r),i&&(y("number"===typeof i,"internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Z,this.toJSON())}_performRefresh(){return b("not implemented")}}function Q(e,t){y("string"===typeof e||"undefined"===typeof e,"internal-error",{appName:t})}class J{constructor(e){let{uid:t,auth:n,stsTokenManager:r,...i}=e;this.providerId="firebase",this.proactiveRefresh=new q(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new K(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await V(this,this.stsTokenManager.getToken(this.auth,e));return y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=(0,i.Ku)(e),r=await n.getIdToken(t),o=W(r);y(o&&o.exp&&o.auth_time&&o.iat,n.auth,"internal-error");const s="object"===typeof o.firebase?o.firebase:void 0,a=s?.sign_in_provider;return{claims:o,token:r,authTime:$(B(o.auth_time)),issuedAtTime:$(B(o.iat)),expirationTime:$(B(o.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}(this,e)}reload(){return async function(e){const t=(0,i.Ku)(e);await Y(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map((e=>({...e}))),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new J({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Y(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,r.xZ)(this.auth.app))return Promise.reject(g(this.auth));const e=await this.getIdToken();return await V(this,async function(e,t){return P(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((e=>({...e}))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,s=t.tenantId??void 0,a=t._redirectEventId??void 0,l=t.createdAt??void 0,c=t.lastLoginAt??void 0,{uid:d,emailVerified:u,isAnonymous:h,providerData:p,stsTokenManager:f}=t;y(d&&f,e,"internal-error");const g=Z.fromJSON(this.name,f);y("string"===typeof d,e,"internal-error"),Q(n,e.name),Q(r,e.name),y("boolean"===typeof u,e,"internal-error"),y("boolean"===typeof h,e,"internal-error"),Q(i,e.name),Q(o,e.name),Q(s,e.name),Q(a,e.name),Q(l,e.name),Q(c,e.name);const m=new J({uid:d,auth:e,email:r,emailVerified:u,displayName:n,isAnonymous:h,photoURL:o,phoneNumber:i,tenantId:s,stsTokenManager:g,createdAt:l,lastLoginAt:c});return p&&Array.isArray(p)&&(m.providerData=p.map((e=>({...e})))),a&&(m._redirectEventId=a),m}static async _fromIdTokenResponse(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=new Z;r.updateFromServerResponse(t);const i=new J({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await Y(i),i}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];y(void 0!==r.localId,"internal-error");const i=void 0!==r.providerUserInfo?G(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!i?.length,s=new Z;s.updateFromIdToken(n);const a=new J({uid:r.localId,auth:e,stsTokenManager:s,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new K(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(a,l),a}}const X=new Map;function ee(e){v(e instanceof Function,"Expected a class definition");let t=X.get(e);return t?(v(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,X.set(e,t),t)}class te{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}te.type="NONE";const ne=te;function re(e,t,n){return`firebase:${e}:${t}:${n}`}class ie{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=re(this.userKey,r.apiKey,i),this.fullPersistenceKey=re("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"===typeof e){const t=await U(this.auth,{idToken:e}).catch((()=>{}));return t?J._fromGetAccountInfoResponse(this.auth,t,e):null}return J._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"authUser";if(!t.length)return new ie(ee(ne),e,n);const r=(await Promise.all(t.map((async e=>{if(await e._isAvailable())return e})))).filter((e=>e));let i=r[0]||ee(ne);const o=re(n,e.config.apiKey,e.name);let s=null;for(const l of t)try{const t=await l._get(o);if(t){let n;if("string"===typeof t){const r=await U(e,{idToken:t}).catch((()=>{}));if(!r)break;n=await J._fromGetAccountInfoResponse(e,r,t)}else n=J._fromJSON(e,t);l!==i&&(s=n),i=l;break}}catch{}const a=r.filter((e=>e._shouldAllowMigration));return i._shouldAllowMigration&&a.length?(i=a[0],s&&await i._set(o,s.toJSON()),await Promise.all(t.map((async e=>{if(e!==i)try{await e._remove(o)}catch{}}))),new ie(i,e,n)):new ie(i,e,n)}}function oe(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(ce(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(se(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(ue(t))return"Blackberry";if(he(t))return"Webos";if(ae(t))return"Safari";if((t.includes("chrome/")||le(t))&&!t.includes("edge/"))return"Chrome";if(de(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===n?.length)return n[1]}return"Other"}function se(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/firefox\//i.test(e)}function ae(){const e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)()).toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function le(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/crios\//i.test(e)}function ce(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/iemobile/i.test(e)}function de(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/android/i.test(e)}function ue(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/blackberry/i.test(e)}function he(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/webos/i.test(e)}function pe(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function fe(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return pe(e)||de(e)||he(e)||ue(e)||/windows phone/i.test(e)||ce(e)}function ge(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];switch(e){case"Browser":t=oe((0,i.ZQ)());break;case"Worker":t=`${oe((0,i.ZQ)())}-${e}`;break;default:t=e}const o=n.length?n.join(","):"FirebaseCore-web";return`${t}/JsCore/${r.MF}/${o}`}class me{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise(((n,r)=>{try{n(e(t))}catch(i){r(i)}}));n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}class ye{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??6,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}class be{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new xe(this),this.idTokenSubscription=new xe(this),this.beforeStateQueue=new me(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=c,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise((e=>this._resolvePersistenceManagerAvailable=e))}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ee(t)),this._initializationPromise=this.queue((async()=>{if(!this._deleted&&(this.persistenceManager=await ie.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(n){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}})),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await U(this,{idToken:e}),n=await J._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if((0,r.xZ)(this.app)){const e=this.app.settings.authIdToken;return e?new Promise((t=>{setTimeout((()=>this.initializeCurrentUserFromIdToken(e).then(t,t)))})):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,r=n?._redirectEventId,o=await this.tryRedirectSignIn(e);t&&t!==r||!o?.user||(n=o.user,i=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(n)}catch(o){n=t,this._popupRedirectResolver._overrideRedirectResult(this,(()=>Promise.reject(o)))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Y(e)}catch(t){if("auth/network-request-failed"!==t?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"===typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,r.xZ)(this.app))return Promise.reject(g(this));const t=e?(0,i.Ku)(e):null;return t&&y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!this._deleted)return e&&y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue((async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()}))}async signOut(){return(0,r.xZ)(this.app)?Promise.reject(g(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,r.xZ)(this.app)?Promise.reject(g(this)):this.queue((async()=>{await this.assertedPersistence.setPersistence(ee(e))}))}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e){return P(e,"GET","/v2/passwordPolicy",j(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}))}(this),t=new ye(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new i.FA("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise(((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged((()=>{n(),e()}),t)}}))}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return P(e,"POST","/v2/accounts:revokeToken",j(e,t))}(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ee(e)||this._popupRedirectResolver;y(t,this,"argument-error"),this.redirectPersistenceManager=await ie.create(this,[ee(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue((async()=>{})),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(e)))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"===typeof t?t:t.next.bind(t);let o=!1;const s=this._isInitialized?Promise.resolve():this._initializationPromise;if(y(s,this,"internal-error"),s.then((()=>{o||i(this.currentUser)})),"function"===typeof t){const i=e.addObserver(t,n,r);return()=>{o=!0,i()}}{const n=e.addObserver(t);return()=>{o=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ge(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if((0,r.xZ)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&function(e){if(d.logLevel<=o.$b.WARN){for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];d.warn(`Auth (${r.MF}): ${e}`,...n)}}(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ve(e){return(0,i.Ku)(e)}class xe{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,i.tD)((e=>this.observer=e))}get next(){return y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}let we={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _e(e){return we.loadJS(e)}function ke(e){return`__${e}${Math.floor(1e6*Math.random())}`}class Se{constructor(){this.enterprise=new Ce}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Ce{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Ee="NO_RECAPTCHA";class Te{constructor(e){this.type="recaptcha-enterprise",this.auth=ve(e)}async verify(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"verify",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];function n(t,n,r){const i=window.grecaptcha;F(i)?i.enterprise.ready((()=>{i.enterprise.execute(t,{action:e}).then((e=>{n(e)})).catch((()=>{n(Ee)}))})):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){return(new Se).execute("siteKey",{action:"verify"})}return new Promise(((e,r)=>{(async function(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise((async(t,n)=>{z(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then((r=>{if(void 0!==r.recaptchaKey){const n=new M(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))})).catch((e=>{n(e)}))}))})(this.auth).then((i=>{if(!t&&F(window.grecaptcha))n(i,e,r);else{if("undefined"===typeof window)return void r(new Error("RecaptchaVerifier is only supported in browser"));let t=we.recaptchaEnterpriseScript;0!==t.length&&(t+=i),_e(t).then((()=>{n(i,e,r)})).catch((e=>{r(e)}))}})).catch((e=>{r(e)}))}))}}async function Ie(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];const o=new Te(e);let s;if(i)s=Ee;else try{s=await o.verify(n)}catch(l){s=await o.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:s}):Object.assign(a,{captchaResponse:s}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function je(e,t,n,r,i){if("EMAIL_PASSWORD_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Ie(e,t,n,"getOobCode"===n);return r(e,i)}return r(e,t).catch((async i=>{if("auth/missing-recaptcha-token"===i.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const i=await Ie(e,t,n,"getOobCode"===n);return r(e,i)}return Promise.reject(i)}))}if("PHONE_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const i=await Ie(e,t,n);return r(e,i).catch((async i=>{if("AUDIT"===e._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const i=await Ie(e,t,n,!1,!0);return r(e,i)}return Promise.reject(i)}))}{const i=await Ie(e,t,n,!1,!0);return r(e,i)}}return Promise.reject(i+" provider is not supported.")}async function Pe(e){const t=ve(e),n=await z(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new M(n);if(null==t.tenantId?t._agentRecaptchaConfig=r:t._tenantRecaptchaConfigs[t.tenantId]=r,r.isAnyProviderEnabled()){new Te(t).verify()}}function Ae(e,t,n){const r=ve(e);y(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const o=!!n?.disableWarnings,s=Ne(t),{host:a,port:l}=function(e){const t=Ne(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:Re(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:Re(t)}}}(t),c=null===l?"":`:${l}`,d={url:`${s}//${a}${c}/`},u=Object.freeze({host:a,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!r._canInitEmulator)return y(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void y((0,i.bD)(d,r.config.emulator)&&(0,i.bD)(u,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=d,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,(0,i.zJ)(a)?(0,i.gE)(`${s}//${a}${c}`):o||function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!==typeof console&&"function"===typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!==typeof window&&"undefined"!==typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}function Ne(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Re(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class Oe{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return b("not implemented")}_getIdTokenResponse(e){return b("not implemented")}_linkToIdToken(e,t){return b("not implemented")}_getReauthenticationResolver(e){return b("not implemented")}}async function De(e,t){return P(e,"POST","/v1/accounts:signUp",t)}async function Le(e,t){return N(e,"POST","/v1/accounts:signInWithPassword",j(e,t))}async function Fe(e,t){return P(e,"POST","/v1/accounts:sendOobCode",j(e,t))}async function Me(e,t){return Fe(e,t)}class ze extends Oe{constructor(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new ze(e,t,"password")}static _fromEmailAndCode(e,t){return new ze(e,t,"emailLink",arguments.length>2&&void 0!==arguments[2]?arguments[2]:null)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return je(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",Le,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return async function(e,t){return N(e,"POST","/v1/accounts:signInWithEmailLink",j(e,t))}(e,{email:this._email,oobCode:this._password});default:h(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return je(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",De,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return async function(e,t){return N(e,"POST","/v1/accounts:signInWithEmailLink",j(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:h(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}async function Ue(e,t){return N(e,"POST","/v1/accounts:signInWithIdp",j(e,t))}class $e extends Oe{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new $e(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):h("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...i}=t;if(!n||!r)return null;const o=new $e(n,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){return Ue(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Ue(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ue(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=(0,i.Am)(t)}return e}}async function Be(e,t){return P(e,"POST","/v1/accounts:sendVerificationCode",j(e,t))}const We={USER_NOT_FOUND:"user-not-found"};class He extends Oe{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new He({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new He({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return async function(e,t){return N(e,"POST","/v1/accounts:signInWithPhoneNumber",j(e,t))}(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return async function(e,t){const n=await N(e,"POST","/v1/accounts:signInWithPhoneNumber",j(e,t));if(n.temporaryProof)throw L(e,"account-exists-with-different-credential",n);return n}(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return async function(e,t){return N(e,"POST","/v1/accounts:signInWithPhoneNumber",j(e,{...t,operation:"REAUTH"}),We)}(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"===typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new He({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}class Ve{constructor(e){const t=(0,i.I9)((0,i.hp)(e)),n=t.apiKey??null,r=t.oobCode??null,o=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(t.mode??null);y(n&&r&&o,"argument-error"),this.apiKey=n,this.operation=o,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=function(e){const t=(0,i.I9)((0,i.hp)(e)).link,n=t?(0,i.I9)((0,i.hp)(t)).deep_link_id:null,r=(0,i.I9)((0,i.hp)(e)).deep_link_id;return(r?(0,i.I9)((0,i.hp)(r)).link:null)||r||n||t||e}(e);try{return new Ve(t)}catch{return null}}}class qe{constructor(){this.providerId=qe.PROVIDER_ID}static credential(e,t){return ze._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Ve.parseLink(t);return y(n,"argument-error"),ze._fromEmailAndCode(e,n.code,n.tenantId)}}qe.PROVIDER_ID="password",qe.EMAIL_PASSWORD_SIGN_IN_METHOD="password",qe.EMAIL_LINK_SIGN_IN_METHOD="emailLink";class Ke{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}class Ye extends Ke{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Ge extends Ye{constructor(){super("facebook.com")}static credential(e){return $e._fromParams({providerId:Ge.PROVIDER_ID,signInMethod:Ge.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ge.credentialFromTaggedObject(e)}static credentialFromError(e){return Ge.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return Ge.credential(t.oauthAccessToken)}catch{return null}}}Ge.FACEBOOK_SIGN_IN_METHOD="facebook.com",Ge.PROVIDER_ID="facebook.com";class Ze extends Ye{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return $e._fromParams({providerId:Ze.PROVIDER_ID,signInMethod:Ze.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ze.credentialFromTaggedObject(e)}static credentialFromError(e){return Ze.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t)return null;const{oauthIdToken:n,oauthAccessToken:r}=t;if(!n&&!r)return null;try{return Ze.credential(n,r)}catch{return null}}}Ze.GOOGLE_SIGN_IN_METHOD="google.com",Ze.PROVIDER_ID="google.com";class Qe extends Ye{constructor(){super("github.com")}static credential(e){return $e._fromParams({providerId:Qe.PROVIDER_ID,signInMethod:Qe.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qe.credentialFromTaggedObject(e)}static credentialFromError(e){return Qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return Qe.credential(t.oauthAccessToken)}catch{return null}}}Qe.GITHUB_SIGN_IN_METHOD="github.com",Qe.PROVIDER_ID="github.com";class Je extends Ye{constructor(){super("twitter.com")}static credential(e,t){return $e._fromParams({providerId:Je.PROVIDER_ID,signInMethod:Je.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Je.credentialFromTaggedObject(e)}static credentialFromError(e){return Je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=t;if(!n||!r)return null;try{return Je.credential(n,r)}catch{return null}}}async function Xe(e,t){return N(e,"POST","/v1/accounts:signUp",j(e,t))}Je.TWITTER_SIGN_IN_METHOD="twitter.com",Je.PROVIDER_ID="twitter.com";class et{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const i=await J._fromIdTokenResponse(e,n,r),o=tt(n);return new et({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=tt(n);return new et({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function tt(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}class nt extends i.g{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,nt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new nt(e,t,n,r)}}function rt(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw nt._fromErrorAndOperation(e,n,t,r);throw n}))}async function it(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=await V(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return et._forOperation(e,"link",r)}async function ot(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const{auth:i}=e;if((0,r.xZ)(i.app))return Promise.reject(g(i));const o="reauthenticate";try{const r=await V(e,rt(i,o,t,e),n);y(r.idToken,i,"internal-error");const s=W(r.idToken);y(s,i,"internal-error");const{sub:a}=s;return y(e.uid===a,i,"user-mismatch"),et._forOperation(e,o,r)}catch(s){throw"auth/user-not-found"===s?.code&&h(i,"user-mismatch"),s}}async function st(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if((0,r.xZ)(e.app))return Promise.reject(g(e));const i="signIn",o=await rt(e,i,t),s=await et._fromIdTokenResponse(e,i,o);return n||await e._updateCurrentUser(s.user),s}async function at(e,t){return st(ve(e),t)}function lt(e,t,n){y(n.url?.length>0,e,"invalid-continue-uri"),y("undefined"===typeof n.dynamicLinkDomain||n.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),y("undefined"===typeof n.linkDomain||n.linkDomain.length>0,e,"invalid-hosting-link-domain"),t.continueUrl=n.url,t.dynamicLinkDomain=n.dynamicLinkDomain,t.linkDomain=n.linkDomain,t.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(y(n.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iOSBundleId=n.iOS.bundleId),n.android&&(y(n.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=n.android.installApp,t.androidMinimumVersionCode=n.android.minimumVersion,t.androidPackageName=n.android.packageName)}async function ct(e){const t=ve(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function dt(e,t,n){const r=ve(e),i={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};n&&lt(r,i,n),await je(r,i,"getOobCode",Me,"EMAIL_PASSWORD_PROVIDER")}async function ut(e,t,n){if((0,r.xZ)(e.app))return Promise.reject(g(e));const i=ve(e),o=je(i,{returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Xe,"EMAIL_PASSWORD_PROVIDER"),s=await o.catch((t=>{throw"auth/password-does-not-meet-requirements"===t.code&&ct(e),t})),a=await et._fromIdTokenResponse(i,"signIn",s);return await i._updateCurrentUser(a.user),a}function ht(e,t,n){return(0,r.xZ)(e.app)?Promise.reject(g(e)):at((0,i.Ku)(e),qe.credential(t,n)).catch((async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&ct(e),t}))}function pt(e,t){return(0,i.Ku)(e).setPersistence(t)}function ft(e,t,n,r){return(0,i.Ku)(e).onAuthStateChanged(t,n,r)}function gt(e){return(0,i.Ku)(e).signOut()}function mt(e,t){return P(e,"POST","/v2/accounts/mfaEnrollment:start",j(e,t))}new WeakMap;const yt="__sak";class bt{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(yt,"1"),this.storage.removeItem(yt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}class vt extends bt{constructor(){super((()=>window.localStorage),"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=fe(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!e.key)return void this.forAllChangedKeys(((e,t,n)=>{this.notifyListeners(e,n)}));const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},o=this.storage.getItem(n);(0,i.lT)()&&10===document.documentMode&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)}))}),1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}vt.type="LOCAL";const xt=vt;function wt(e){const t=e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),n=RegExp(`${t}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function _t(e){return`${"http:"===window.location.protocol?"__dev_":"__HOST-"}FIREBASE_${e.split(":")[3]}`}class kt{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(void 0===typeof window)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return!("boolean"===typeof isSecureContext&&!isSecureContext)&&("undefined"!==typeof navigator&&"undefined"!==typeof document&&(navigator.cookieEnabled??!0))}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=_t(e);if(window.cookieStore){const e=await window.cookieStore.get(t);return e?.value}return wt(t)}async _remove(e){if(!this._isAvailable())return;if(!await this._get(e))return;const t=_t(e);document.cookie=`${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch((()=>{}))}_addListener(e,t){if(!this._isAvailable())return;const n=_t(e);if(window.cookieStore){const e=e=>{const r=e.changed.find((e=>e.name===n));r&&t(r.value);e.deleted.find((e=>e.name===n))&&t(null)},r=()=>window.cookieStore.removeEventListener("change",e);return this.listenerUnsubscribes.set(t,r),window.cookieStore.addEventListener("change",e)}let r=wt(n);const i=setInterval((()=>{const e=wt(n);e!==r&&(t(e),r=e)}),1e3);this.listenerUnsubscribes.set(t,(()=>clearInterval(i)))}_removeListener(e,t){const n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}}kt.type="COOKIE";class St extends bt{constructor(){super((()=>window.sessionStorage),"SESSION")}_addListener(e,t){}_removeListener(e,t){}}St.type="SESSION";const Ct=St;class Et{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find((t=>t.isListeningto(e)));if(t)return t;const n=new Et(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,o=this.handlersMap[r];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const s=Array.from(o).map((async e=>e(t.origin,i))),a=await function(e){return Promise.all(e.map((async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}})))}(s);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}function Tt(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}Et.receivers=[];class It{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:50;const r="undefined"!==typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise(((s,a)=>{const l=Tt("",20);r.port1.start();const c=setTimeout((()=>{a(new Error("unsupported_event"))}),n);o={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===l)switch(t.data.status){case"ack":clearTimeout(c),i=setTimeout((()=>{a(new Error("timeout"))}),3e3);break;case"done":clearTimeout(i),s(t.data.response);break;default:clearTimeout(c),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[r.port2])})).finally((()=>{o&&this.removeMessageHandler(o)}))}}function jt(){return window}function Pt(){return"undefined"!==typeof jt().WorkerGlobalScope&&"function"===typeof jt().importScripts}const At="firebaseLocalStorageDb",Nt="firebaseLocalStorage",Rt="fbase_key";class Ot{constructor(e){this.request=e}toPromise(){return new Promise(((e,t)=>{this.request.addEventListener("success",(()=>{e(this.request.result)})),this.request.addEventListener("error",(()=>{t(this.request.error)}))}))}}function Dt(e,t){return e.transaction([Nt],t?"readwrite":"readonly").objectStore(Nt)}function Lt(){const e=indexedDB.open(At,1);return new Promise(((t,n)=>{e.addEventListener("error",(()=>{n(e.error)})),e.addEventListener("upgradeneeded",(()=>{const t=e.result;try{t.createObjectStore(Nt,{keyPath:Rt})}catch(r){n(r)}})),e.addEventListener("success",(async()=>{const n=e.result;n.objectStoreNames.contains(Nt)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(At);return new Ot(e).toPromise()}(),t(await Lt()))}))}))}async function Ft(e,t,n){const r=Dt(e,!0).put({[Rt]:t,value:n});return new Ot(r).toPromise()}function Mt(e,t){const n=Dt(e,!0).delete(t);return new Ot(n).toPromise()}class zt{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}async _openDb(){return this.db||(this.db=await Lt()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Pt()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Et._getInstance(Pt()?self:null),this.receiver._subscribe("keyChanged",(async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)}))),this.receiver._subscribe("ping",(async(e,t)=>["keyChanged"]))}async initializeSender(){if(this.activeServiceWorker=await async function(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}(),!this.activeServiceWorker)return;this.sender=new It(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&(navigator?.serviceWorker?.controller||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Lt();return await Ft(e,yt,"1"),await Mt(e,yt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite((async()=>(await this._withRetries((n=>Ft(n,e,t))),this.localCache[e]=t,this.notifyServiceWorker(e))))}async _get(e){const t=await this._withRetries((t=>async function(e,t){const n=Dt(e,!1).get(t),r=await new Ot(n).toPromise();return void 0===r?null:r.value}(t,e)));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite((async()=>(await this._withRetries((t=>Mt(t,e))),delete this.localCache[e],this.notifyServiceWorker(e))))}async _poll(){const e=await this._withRetries((e=>{const t=Dt(e,!1).getAll();return new Ot(t).toPromise()}));if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}zt.type="LOCAL";const Ut=zt;function $t(e,t){return P(e,"POST","/v2/accounts/mfaSignIn:start",j(e,t))}ke("rcb"),new k(3e4,6e4);const Bt="recaptcha";async function Wt(e,t,n){if(!e._getRecaptchaConfig())try{await Pe(e)}catch(r){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(r="string"===typeof t?{phoneNumber:t}:t,"session"in r){const t=r.session;if("phoneNumber"in r){y("enroll"===t.type,e,"internal-error");const i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},o=je(e,i,"mfaSmsEnrollment",(async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===Ee){y(n?.type===Bt,e,"argument-error");return mt(e,await Ht(e,t,n))}return mt(e,t)}),"PHONE_PROVIDER");return(await o.catch((e=>Promise.reject(e)))).phoneSessionInfo.sessionInfo}{y("signin"===t.type,e,"internal-error");const i=r.multiFactorHint?.uid||r.multiFactorUid;y(i,e,"missing-multi-factor-info");const o={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},s=je(e,o,"mfaSmsSignIn",(async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===Ee){y(n?.type===Bt,e,"argument-error");return $t(e,await Ht(e,t,n))}return $t(e,t)}),"PHONE_PROVIDER");return(await s.catch((e=>Promise.reject(e)))).phoneResponseInfo.sessionInfo}}{const t={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"},i=je(e,t,"sendVerificationCode",(async(e,t)=>{if(t.captchaResponse===Ee){y(n?.type===Bt,e,"argument-error");return Be(e,await Ht(e,t,n))}return Be(e,t)}),"PHONE_PROVIDER");return(await i.catch((e=>Promise.reject(e)))).sessionInfo}}finally{n?._reset()}}async function Ht(e,t,n){y(n.type===Bt,e,"argument-error");const r=await n.verify();y("string"===typeof r,e,"argument-error");const i={...t};if("phoneEnrollmentInfo"in i){const e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,o=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:o}}),i}if("phoneSignInInfo"in i){const e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}return Object.assign(i,{recaptchaToken:r}),i}class Vt{constructor(e){this.providerId=Vt.PROVIDER_ID,this.auth=ve(e)}verifyPhoneNumber(e,t){return Wt(this.auth,e,(0,i.Ku)(t))}static credential(e,t){return He._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Vt.credentialFromTaggedObject(t)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t)return null;const{phoneNumber:n,temporaryProof:r}=t;return n&&r?He._fromTokenResponse(n,r):null}}function qt(e,t){return t?ee(t):(y(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}Vt.PROVIDER_ID="phone",Vt.PHONE_SIGN_IN_METHOD="phone";class Kt extends Oe{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ue(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ue(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ue(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Yt(e){return st(e.auth,new Kt(e),e.bypassAuthState)}function Gt(e){const{auth:t,user:n}=e;return y(n,t,"internal-error"),ot(n,new Kt(e),e.bypassAuthState)}async function Zt(e){const{auth:t,user:n}=e;return y(n,t,"internal-error"),it(n,new Kt(e),e.bypassAuthState)}class Qt{constructor(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise((async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}}))}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:o,type:s}=e;if(o)return void this.reject(o);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(s)(a))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Yt;case"linkViaPopup":case"linkViaRedirect":return Zt;case"reauthViaPopup":case"reauthViaRedirect":return Gt;default:h(this.auth,"internal-error")}}resolve(e){v(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){v(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}const Jt=new k(2e3,1e4);class Xt extends Qt{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,Xt.currentPopupAction&&Xt.currentPopupAction.cancel(),Xt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return y(e,this.auth,"internal-error"),e}async onExecution(){v(1===this.filter.length,"Popup operations only handle one event");const e=Tt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch((e=>{this.reject(e)})),this.resolver._isIframeWebStorageSupported(this.auth,(e=>{e||this.reject(p(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(p(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Xt.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(p(this.auth,"popup-closed-by-user"))}),8e3):this.pollId=window.setTimeout(e,Jt.get())};e()}}Xt.currentPopupAction=null;const en=new Map;class tn extends Qt{constructor(e,t){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,arguments.length>2&&void 0!==arguments[2]&&arguments[2]),this.eventId=null}async execute(){let e=en.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=on(t),r=rn(e);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}en.set(this.auth._key(),e)}return this.bypassAuthState||en.set(this.auth._key(),(()=>Promise.resolve(null))),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function nn(e,t){en.set(e._key(),t)}function rn(e){return ee(e._redirectPersistence)}function on(e){return re("pendingRedirect",e.config.apiKey,e.name)}async function sn(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if((0,r.xZ)(e.app))return Promise.reject(g(e));const i=ve(e),o=qt(i,t),s=new tn(i,o,n),a=await s.execute();return a&&!n&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,t)),a}class an{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))})),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return cn(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!cn(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(p(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(ln(e))}saveEventToCache(e){this.cachedEventUids.add(ln(e)),this.lastProcessedEventTime=Date.now()}}function ln(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter((e=>e)).join("-")}function cn(e){let{type:t,error:n}=e;return"unknown"===t&&"auth/no-auth-event"===n?.code}const dn=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,un=/^https?/;async function hn(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e){return P(e,"GET","/v1/projects",arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}(e);for(const n of t)try{if(pn(n))return}catch{}h(e,"unauthorized-domain")}function pn(e){const t=x(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!un.test(n))return!1;if(dn.test(e))return r===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}const fn=new k(3e4,6e4);function gn(){const e=jt().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function mn(e){return new Promise(((t,n)=>{function r(){gn(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{gn(),n(p(e,"network-request-failed"))},timeout:fn.get()})}if(jt().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!jt().gapi?.load){const t=ke("iframefcb");return jt()[t]=()=>{gapi.load?r():n(p(e,"network-request-failed"))},_e(`${we.gapiScript}?onload=${t}`).catch((e=>n(e)))}r()}})).catch((e=>{throw yn=null,e}))}let yn=null;const bn=new k(5e3,15e3),vn={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},xn=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function wn(e){const t=e.config;y(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?S(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,o={apiKey:t.apiKey,appName:e.name,v:r.MF},s=xn.get(e.config.apiHost);s&&(o.eid=s);const a=e._getFrameworks();return a.length&&(o.fw=a.join(",")),`${n}?${(0,i.Am)(o).slice(1)}`}async function _n(e){const t=await function(e){return yn=yn||mn(e),yn}(e),n=jt().gapi;return y(n,e,"internal-error"),t.open({where:document.body,url:wn(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:vn,dontclear:!0},(t=>new Promise((async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=p(e,"network-request-failed"),o=jt().setTimeout((()=>{r(i)}),bn.get());function s(){jt().clearTimeout(o),n(t)}t.ping(s).then(s,(()=>{r(i)}))}))))}const kn={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Sn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Cn(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:500,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:600;const s=Math.max((window.screen.availHeight-o)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c={...kn,width:r.toString(),height:o.toString(),top:s,left:a},d=(0,i.ZQ)().toLowerCase();n&&(l=le(d)?"_blank":n),se(d)&&(t=t||"http://localhost",c.scrollbars="yes");const u=Object.entries(c).reduce(((e,t)=>{let[n,r]=t;return`${e}${n}=${r},`}),"");if(function(){return pe(arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)())&&!!window.navigator?.standalone}(d)&&"_self"!==l)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}(t||"",l),new Sn(null);const h=window.open(t||"",l,u);y(h,e,"popup-blocked");try{h.focus()}catch(p){}return new Sn(h)}const En="__/auth/handler",Tn="emulator/auth/handler",In=encodeURIComponent("fac");async function jn(e,t,n,o,s,a){y(e.config.authDomain,e,"auth-domain-config-required"),y(e.config.apiKey,e,"invalid-api-key");const l={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:o,v:r.MF,eventId:s};if(t instanceof Ke){t.setDefaultLanguage(e.languageCode),l.providerId=t.providerId||"",(0,i.Im)(t.getCustomParameters())||(l.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(a||{}))l[e]=t}if(t instanceof Ye){const e=t.getScopes().filter((e=>""!==e));e.length>0&&(l.scopes=e.join(","))}e.tenantId&&(l.tid=e.tenantId);const c=l;for(const r of Object.keys(c))void 0===c[r]&&delete c[r];const d=await e._getAppCheckToken(),u=d?`#${In}=${encodeURIComponent(d)}`:"";return`${function(e){let{config:t}=e;if(!t.emulator)return`https://${t.authDomain}/${En}`;return S(t,Tn)}(e)}?${(0,i.Am)(c).slice(1)}${u}`}const Pn="webStorageSupport";const An=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ct,this._completeRedirectFn=sn,this._overrideRedirectResult=nn}async _openPopup(e,t,n,r){v(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");return Cn(e,await jn(e,t,n,x(),r),Tt())}async _openRedirect(e,t,n,r){await this._originValidation(e);return function(e){jt().location.href=e}(await jn(e,t,n,x(),r)),new Promise((()=>{}))}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(v(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch((()=>{delete this.eventManagers[t]})),n}async initAndGetManager(e){const t=await _n(e),n=new an(e);return t.register("authEvent",(t=>{y(t?.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Pn,{type:Pn},(n=>{const r=n?.[0]?.[Pn];void 0!==r&&t(!!r),h(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hn(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return fe()||ae()||pe()}};var Nn="@firebase/auth",Rn="1.13.0";class On{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged((t=>{e(t?.stsTokenManager.accessToken||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}const Dn=(0,i.XA)("authIdTokenMaxAge")||300;let Ln=null;const Fn=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&((new Date).getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Dn)return;const i=n?.token;Ln!==i&&(Ln=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Mn(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Sx)();const t=(0,r.j6)(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=(0,r.j6)(e,"auth");if(n.isInitialized()){const e=n.getImmediate(),r=n.getOptions();if((0,i.bD)(r,t??{}))return e;h(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:An,persistence:[Ut,xt,Ct]}),o=(0,i.XA)("authTokenSyncURL");if(o&&"boolean"===typeof isSecureContext&&isSecureContext){const e=new URL(o,location.origin);if(location.origin===e.origin){const t=Fn(e.toString());!function(e,t,n){(0,i.Ku)(e).beforeAuthStateChanged(t,n)}(n,t,(()=>t(n.currentUser))),function(e,t,n,r){(0,i.Ku)(e).onIdTokenChanged(t,n,r)}(n,(e=>t(e)))}}const s=(0,i.Tj)("auth");return s&&Ae(n,`http://${s}`),n}var zn;we={loadJS:e=>new Promise(((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=p("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",(document.getElementsByTagName("head")?.[0]??document).appendChild(r)})),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},zn="Browser",(0,r.om)(new s.uA("auth",((e,t)=>{let{options:n}=t;const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:s,authDomain:a}=r.options;y(s&&!s.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:s,authDomain:a,clientPlatform:zn,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ge(zn)},c=new be(r,i,o,l);return function(e,t){const n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(ee);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}(c,n),c}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,n)=>{e.getProvider("auth-internal").initialize()}))),(0,r.om)(new s.uA("auth-internal",(e=>(e=>new On(e))(ve(e.getProvider("auth").getImmediate()))),"PRIVATE").setInstantiationMode("EXPLICIT")),(0,r.KO)(Nn,Rn,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(zn)),(0,r.KO)(Nn,Rn,"esm2020")},950:(e,t,n)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(730)},965:(e,t,n)=>{"use strict";n.d(t,{$b:()=>i,Vy:()=>c});const r=[];var i;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(i||(i={}));const o={debug:i.DEBUG,verbose:i.VERBOSE,info:i.INFO,warn:i.WARN,error:i.ERROR,silent:i.SILENT},s=i.INFO,a={[i.DEBUG]:"log",[i.VERBOSE]:"log",[i.INFO]:"info",[i.WARN]:"warn",[i.ERROR]:"error"},l=function(e,t){if(t<e.logLevel)return;const n=(new Date).toISOString(),r=a[t];if(!r)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);for(var i=arguments.length,o=new Array(i>2?i-2:0),s=2;s<i;s++)o[s-2]=arguments[s];console[r](`[${n}]  ${e.name}:`,...o)};class c{constructor(e){this.name=e,this._logLevel=s,this._logHandler=l,this._userLogHandler=null,r.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in i))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"===typeof e?o[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!==typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,i.DEBUG,...t),this._logHandler(this,i.DEBUG,...t)}log(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,i.VERBOSE,...t),this._logHandler(this,i.VERBOSE,...t)}info(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,i.INFO,...t),this._logHandler(this,i.INFO,...t)}warn(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,i.WARN,...t),this._logHandler(this,i.WARN,...t)}error(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,i.ERROR,...t),this._logHandler(this,i.ERROR,...t)}}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,i){if(1&i&&(r=this(r)),8&i)return r;if("object"===typeof r&&r){if(4&i&&r.__esModule)return r;if(16&i&&"function"===typeof r.then)return r}var o=Object.create(null);n.r(o);var s={};e=e||[null,t({}),t([]),t(t)];for(var a=2&i&&r;"object"==typeof a&&!~e.indexOf(a);a=t(a))Object.getOwnPropertyNames(a).forEach((e=>s[e]=()=>r[e]));return s.default=()=>r,n.d(o,s),o}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,r)=>(n.f[r](e,t),t)),[])),n.u=e=>"static/js/"+e+".ea253801.chunk.js",n.miniCssF=e=>{},n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={},t="scrambled-legs:";n.l=(r,i,o,s)=>{if(e[r])e[r].push(i);else{var a,l;if(void 0!==o)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==t+o){a=u;break}}a||(l=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+o),a.src=r),e[r]=[i];var h=(t,n)=>{a.onerror=a.onload=null,clearTimeout(p);var i=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),i&&i.forEach((e=>e(n))),t)return t(n)},p=setTimeout(h.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=h.bind(null,a.onerror),a.onload=h.bind(null,a.onload),l&&document.head.appendChild(a)}}})(),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/",(()=>{var e={792:0};n.f.j=(t,r)=>{var i=n.o(e,t)?e[t]:void 0;if(0!==i)if(i)r.push(i[2]);else{var o=new Promise(((n,r)=>i=e[t]=[n,r]));r.push(i[2]=o);var s=n.p+n.u(t),a=new Error;n.l(s,(r=>{if(n.o(e,t)&&(0!==(i=e[t])&&(e[t]=void 0),i)){var o=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",a.name="ChunkLoadError",a.type=o,a.request=s,i[1](a)}}),"chunk-"+t,t)}};var t=(t,r)=>{var i,o,s=r[0],a=r[1],l=r[2],c=0;if(s.some((t=>0!==e[t]))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(l)l(n)}for(t&&t(r);c<s.length;c++)o=s[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0},r=self.webpackChunkscrambled_legs=self.webpackChunkscrambled_legs||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),n.nc=void 0,(()=>{"use strict";var e,t=n(43),r=n.t(t,2),i=n(391),o=n(950),s=n.t(o,2);function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(this,arguments)}!function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(e||(e={}));const l="popstate";function c(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function d(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(n){}}}function u(e,t){return{usr:e.state,key:e.key,idx:t}}function h(e,t,n,r){return void 0===n&&(n=null),a({pathname:"string"===typeof e?e:e.pathname,search:"",hash:""},"string"===typeof t?f(t):t,{state:n,key:t&&t.key||r||Math.random().toString(36).substr(2,8)})}function p(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function f(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function g(t,n,r,i){void 0===i&&(i={});let{window:o=document.defaultView,v5Compat:s=!1}=i,d=o.history,f=e.Pop,g=null,m=y();function y(){return(d.state||{idx:null}).idx}function b(){f=e.Pop;let t=y(),n=null==t?null:t-m;m=t,g&&g({action:f,location:x.location,delta:n})}function v(e){let t="null"!==o.location.origin?o.location.origin:o.location.href,n="string"===typeof e?e:p(e);return n=n.replace(/ $/,"%20"),c(t,"No window.location.(origin|href) available to create URL for href: "+n),new URL(n,t)}null==m&&(m=0,d.replaceState(a({},d.state,{idx:m}),""));let x={get action(){return f},get location(){return t(o,d)},listen(e){if(g)throw new Error("A history only accepts one active listener");return o.addEventListener(l,b),g=e,()=>{o.removeEventListener(l,b),g=null}},createHref:e=>n(o,e),createURL:v,encodeLocation(e){let t=v(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(t,n){f=e.Push;let i=h(x.location,t,n);r&&r(i,t),m=y()+1;let a=u(i,m),l=x.createHref(i);try{d.pushState(a,"",l)}catch(c){if(c instanceof DOMException&&"DataCloneError"===c.name)throw c;o.location.assign(l)}s&&g&&g({action:f,location:x.location,delta:1})},replace:function(t,n){f=e.Replace;let i=h(x.location,t,n);r&&r(i,t),m=y();let o=u(i,m),a=x.createHref(i);d.replaceState(o,"",a),s&&g&&g({action:f,location:x.location,delta:0})},go:e=>d.go(e)};return x}var m;!function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"}(m||(m={}));new Set(["lazy","caseSensitive","path","id","index","children"]);function y(e,t,n){return void 0===n&&(n="/"),b(e,t,n,!1)}function b(e,t,n,r){let i=N(("string"===typeof t?f(t):t).pathname||"/",n);if(null==i)return null;let o=v(e);!function(e){e.sort(((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every(((e,n)=>e===t[n]));return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map((e=>e.childrenIndex)),t.routesMeta.map((e=>e.childrenIndex)))))}(o);let s=null;for(let a=0;null==s&&a<o.length;++a){let e=A(i);s=j(o[a],e,r)}return s}function v(e,t,n,r){void 0===t&&(t=[]),void 0===n&&(n=[]),void 0===r&&(r="");let i=(e,i,o)=>{let s={relativePath:void 0===o?e.path||"":o,caseSensitive:!0===e.caseSensitive,childrenIndex:i,route:e};s.relativePath.startsWith("/")&&(c(s.relativePath.startsWith(r),'Absolute route path "'+s.relativePath+'" nested under path "'+r+'" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),s.relativePath=s.relativePath.slice(r.length));let a=F([r,s.relativePath]),l=n.concat(s);e.children&&e.children.length>0&&(c(!0!==e.index,'Index routes must not have child routes. Please remove all child routes from route path "'+a+'".'),v(e.children,t,l,a)),(null!=e.path||e.index)&&t.push({path:a,score:I(a,e.index),routesMeta:l})};return e.forEach(((e,t)=>{var n;if(""!==e.path&&null!=(n=e.path)&&n.includes("?"))for(let r of x(e.path))i(e,t,r);else i(e,t)})),t}function x(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,i=n.endsWith("?"),o=n.replace(/\?$/,"");if(0===r.length)return i?[o,""]:[o];let s=x(r.join("/")),a=[];return a.push(...s.map((e=>""===e?o:[o,e].join("/")))),i&&a.push(...s),a.map((t=>e.startsWith("/")&&""===t?"/":t))}const w=/^:[\w-]+$/,_=3,k=2,S=1,C=10,E=-2,T=e=>"*"===e;function I(e,t){let n=e.split("/"),r=n.length;return n.some(T)&&(r+=E),t&&(r+=k),n.filter((e=>!T(e))).reduce(((e,t)=>e+(w.test(t)?_:""===t?S:C)),r)}function j(e,t,n){void 0===n&&(n=!1);let{routesMeta:r}=e,i={},o="/",s=[];for(let a=0;a<r.length;++a){let e=r[a],l=a===r.length-1,c="/"===o?t:t.slice(o.length)||"/",d=P({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},c),u=e.route;if(!d&&l&&n&&!r[r.length-1].route.index&&(d=P({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},c)),!d)return null;Object.assign(i,d.params),s.push({params:i,pathname:F([o,d.pathname]),pathnameBase:M(F([o,d.pathnameBase])),route:u}),"/"!==d.pathnameBase&&(o=F([o,d.pathnameBase]))}return s}function P(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=function(e,t,n){void 0===t&&(t=!1);void 0===n&&(n=!0);d("*"===e||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were "'+e.replace(/\*$/,"/*")+'" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'+e.replace(/\*$/,"/*")+'".');let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,((e,t,n)=>(r.push({paramName:t,isOptional:null!=n}),n?"/?([^\\/]+)?":"/([^\\/]+)")));e.endsWith("*")?(r.push({paramName:"*"}),i+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":""!==e&&"/"!==e&&(i+="(?:(?=\\/|$))");let o=new RegExp(i,t?void 0:"i");return[o,r]}(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let o=i[0],s=o.replace(/(.)\/+$/,"$1"),a=i.slice(1);return{params:r.reduce(((e,t,n)=>{let{paramName:r,isOptional:i}=t;if("*"===r){let e=a[n]||"";s=o.slice(0,o.length-e.length).replace(/(.)\/+$/,"$1")}const l=a[n];return e[r]=i&&!l?void 0:(l||"").replace(/%2F/g,"/"),e}),{}),pathname:o,pathnameBase:s,pattern:e}}function A(e){try{return e.split("/").map((e=>decodeURIComponent(e).replace(/\//g,"%2F"))).join("/")}catch(t){return d(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('+t+")."),e}}function N(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}function R(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified `to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the `to."+n+'` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'}function O(e){return e.filter(((e,t)=>0===t||e.route.path&&e.route.path.length>0))}function D(e,t){let n=O(e);return t?n.map(((e,t)=>t===n.length-1?e.pathname:e.pathnameBase)):n.map((e=>e.pathnameBase))}function L(e,t,n,r){let i;void 0===r&&(r=!1),"string"===typeof e?i=f(e):(i=a({},e),c(!i.pathname||!i.pathname.includes("?"),R("?","pathname","search",i)),c(!i.pathname||!i.pathname.includes("#"),R("#","pathname","hash",i)),c(!i.search||!i.search.includes("#"),R("#","search","hash",i)));let o,s=""===e||""===i.pathname,l=s?"/":i.pathname;if(null==l)o=n;else{let e=t.length-1;if(!r&&l.startsWith("..")){let t=l.split("/");for(;".."===t[0];)t.shift(),e-=1;i.pathname=t.join("/")}o=e>=0?t[e]:"/"}let d=function(e,t){void 0===t&&(t="/");let{pathname:n,search:r="",hash:i=""}="string"===typeof e?f(e):e,o=n?n.startsWith("/")?n:function(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach((e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)})),n.length>1?n.join("/"):"/"}(n,t):t;return{pathname:o,search:z(r),hash:U(i)}}(i,o),u=l&&"/"!==l&&l.endsWith("/"),h=(s||"."===l)&&n.endsWith("/");return d.pathname.endsWith("/")||!u&&!h||(d.pathname+="/"),d}const F=e=>e.join("/").replace(/\/\/+/g,"/"),M=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),z=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",U=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";Error;function $(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}const B=["post","put","patch","delete"],W=(new Set(B),["get",...B]);new Set(W),new Set([301,302,303,307,308]),new Set([307,308]);Symbol("deferred");function H(){return H=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},H.apply(this,arguments)}const V=t.createContext(null);const q=t.createContext(null);const K=t.createContext(null);const Y=t.createContext(null);const G=t.createContext({outlet:null,matches:[],isDataRoute:!1});const Z=t.createContext(null);function Q(){return null!=t.useContext(Y)}function J(){return Q()||c(!1),t.useContext(Y).location}function X(e){t.useContext(K).static||t.useLayoutEffect(e)}function ee(){let{isDataRoute:e}=t.useContext(G);return e?function(){let{router:e}=ue(ce.UseNavigateStable),n=pe(de.UseNavigateStable),r=t.useRef(!1);return X((()=>{r.current=!0})),t.useCallback((function(t,i){void 0===i&&(i={}),r.current&&("number"===typeof t?e.navigate(t):e.navigate(t,H({fromRouteId:n},i)))}),[e,n])}():function(){Q()||c(!1);let e=t.useContext(V),{basename:n,future:r,navigator:i}=t.useContext(K),{matches:o}=t.useContext(G),{pathname:s}=J(),a=JSON.stringify(D(o,r.v7_relativeSplatPath)),l=t.useRef(!1);X((()=>{l.current=!0}));let d=t.useCallback((function(t,r){if(void 0===r&&(r={}),!l.current)return;if("number"===typeof t)return void i.go(t);let o=L(t,JSON.parse(a),s,"path"===r.relative);null==e&&"/"!==n&&(o.pathname="/"===o.pathname?n:F([n,o.pathname])),(r.replace?i.replace:i.push)(o,r.state,r)}),[n,i,a,s,e]);return d}()}function te(){let{matches:e}=t.useContext(G),n=e[e.length-1];return n?n.params:{}}function ne(e,n){let{relative:r}=void 0===n?{}:n,{future:i}=t.useContext(K),{matches:o}=t.useContext(G),{pathname:s}=J(),a=JSON.stringify(D(o,i.v7_relativeSplatPath));return t.useMemo((()=>L(e,JSON.parse(a),s,"path"===r)),[e,a,s,r])}function re(n,r,i,o){Q()||c(!1);let{navigator:s,static:a}=t.useContext(K),{matches:l}=t.useContext(G),d=l[l.length-1],u=d?d.params:{},h=(d&&d.pathname,d?d.pathnameBase:"/");d&&d.route;let p,g=J();if(r){var m;let e="string"===typeof r?f(r):r;"/"===h||(null==(m=e.pathname)?void 0:m.startsWith(h))||c(!1),p=e}else p=g;let b=p.pathname||"/",v=b;if("/"!==h){let e=h.replace(/^\//,"").split("/");v="/"+b.replace(/^\//,"").split("/").slice(e.length).join("/")}let x=!a&&i&&i.matches&&i.matches.length>0?i.matches:y(n,{pathname:v});let w=le(x&&x.map((e=>Object.assign({},e,{params:Object.assign({},u,e.params),pathname:F([h,s.encodeLocation?s.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?h:F([h,s.encodeLocation?s.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])}))),l,i,o);return r&&w?t.createElement(Y.Provider,{value:{location:H({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:e.Pop}},w):w}function ie(){let e=function(){var e;let n=t.useContext(Z),r=he(de.UseRouteError),i=pe(de.UseRouteError);if(void 0!==n)return n;return null==(e=r.errors)?void 0:e[i]}(),n=$(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,i="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:i};return t.createElement(t.Fragment,null,t.createElement("h2",null,"Unexpected Application Error!"),t.createElement("h3",{style:{fontStyle:"italic"}},n),r?t.createElement("pre",{style:o},r):null,null)}const oe=t.createElement(ie,null);class se extends t.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return void 0!==this.state.error?t.createElement(G.Provider,{value:this.props.routeContext},t.createElement(Z.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ae(e){let{routeContext:n,match:r,children:i}=e,o=t.useContext(V);return o&&o.static&&o.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=r.route.id),t.createElement(G.Provider,{value:n},i)}function le(e,n,r,i){var o;if(void 0===n&&(n=[]),void 0===r&&(r=null),void 0===i&&(i=null),null==e){var s;if(!r)return null;if(r.errors)e=r.matches;else{if(!(null!=(s=i)&&s.v7_partialHydration&&0===n.length&&!r.initialized&&r.matches.length>0))return null;e=r.matches}}let a=e,l=null==(o=r)?void 0:o.errors;if(null!=l){let e=a.findIndex((e=>e.route.id&&void 0!==(null==l?void 0:l[e.route.id])));e>=0||c(!1),a=a.slice(0,Math.min(a.length,e+1))}let d=!1,u=-1;if(r&&i&&i.v7_partialHydration)for(let t=0;t<a.length;t++){let e=a[t];if((e.route.HydrateFallback||e.route.hydrateFallbackElement)&&(u=t),e.route.id){let{loaderData:t,errors:n}=r,i=e.route.loader&&void 0===t[e.route.id]&&(!n||void 0===n[e.route.id]);if(e.route.lazy||i){d=!0,a=u>=0?a.slice(0,u+1):[a[0]];break}}}return a.reduceRight(((e,i,o)=>{let s,c=!1,h=null,p=null;var f;r&&(s=l&&i.route.id?l[i.route.id]:void 0,h=i.route.errorElement||oe,d&&(u<0&&0===o?(f="route-fallback",!1||fe[f]||(fe[f]=!0),c=!0,p=null):u===o&&(c=!0,p=i.route.hydrateFallbackElement||null)));let g=n.concat(a.slice(0,o+1)),m=()=>{let n;return n=s?h:c?p:i.route.Component?t.createElement(i.route.Component,null):i.route.element?i.route.element:e,t.createElement(ae,{match:i,routeContext:{outlet:e,matches:g,isDataRoute:null!=r},children:n})};return r&&(i.route.ErrorBoundary||i.route.errorElement||0===o)?t.createElement(se,{location:r.location,revalidation:r.revalidation,component:h,error:s,children:m(),routeContext:{outlet:null,matches:g,isDataRoute:!0}}):m()}),null)}var ce=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ce||{}),de=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(de||{});function ue(e){let n=t.useContext(V);return n||c(!1),n}function he(e){let n=t.useContext(q);return n||c(!1),n}function pe(e){let n=function(){let e=t.useContext(G);return e||c(!1),e}(),r=n.matches[n.matches.length-1];return r.route.id||c(!1),r.route.id}const fe={};function ge(e,t){null==e||e.v7_startTransition,void 0===(null==e?void 0:e.v7_relativeSplatPath)&&(!t||t.v7_relativeSplatPath),t&&(t.v7_fetcherPersist,t.v7_normalizeFormMethod,t.v7_partialHydration,t.v7_skipActionErrorRevalidation)}r.startTransition;function me(e){let{to:n,replace:r,state:i,relative:o}=e;Q()||c(!1);let{future:s,static:a}=t.useContext(K),{matches:l}=t.useContext(G),{pathname:d}=J(),u=ee(),h=L(n,D(l,s.v7_relativeSplatPath),d,"path"===o),p=JSON.stringify(h);return t.useEffect((()=>u(JSON.parse(p),{replace:r,state:i,relative:o})),[u,p,o,r,i]),null}function ye(e){c(!1)}function be(n){let{basename:r="/",children:i=null,location:o,navigationType:s=e.Pop,navigator:a,static:l=!1,future:d}=n;Q()&&c(!1);let u=r.replace(/^\/*/,"/"),h=t.useMemo((()=>({basename:u,navigator:a,static:l,future:H({v7_relativeSplatPath:!1},d)})),[u,d,a,l]);"string"===typeof o&&(o=f(o));let{pathname:p="/",search:g="",hash:m="",state:y=null,key:b="default"}=o,v=t.useMemo((()=>{let e=N(p,u);return null==e?null:{location:{pathname:e,search:g,hash:m,state:y,key:b},navigationType:s}}),[u,p,g,m,y,b,s]);return null==v?null:t.createElement(K.Provider,{value:h},t.createElement(Y.Provider,{children:i,value:v}))}function ve(e){let{children:t,location:n}=e;return re(xe(t),n)}new Promise((()=>{}));t.Component;function xe(e,n){void 0===n&&(n=[]);let r=[];return t.Children.forEach(e,((e,i)=>{if(!t.isValidElement(e))return;let o=[...n,i];if(e.type===t.Fragment)return void r.push.apply(r,xe(e.props.children,o));e.type!==ye&&c(!1),e.props.index&&e.props.children&&c(!1);let s={id:e.props.id||o.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(s.children=xe(e.props.children,o)),r.push(s)})),r}function we(){return we=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},we.apply(this,arguments)}function _e(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);const ke=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"];try{window.__reactRouterVersion="6"}catch(Cm){}new Map;const Se=r.startTransition;s.flushSync,r.useId;function Ce(e){let{basename:n,children:r,future:i,window:o}=e,s=t.useRef();var a;null==s.current&&(s.current=(void 0===(a={window:o,v5Compat:!0})&&(a={}),g((function(e,t){let{pathname:n,search:r,hash:i}=e.location;return h("",{pathname:n,search:r,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||"default")}),(function(e,t){return"string"===typeof t?t:p(t)}),null,a)));let l=s.current,[c,d]=t.useState({action:l.action,location:l.location}),{v7_startTransition:u}=i||{},f=t.useCallback((e=>{u&&Se?Se((()=>d(e))):d(e)}),[d,u]);return t.useLayoutEffect((()=>l.listen(f)),[l,f]),t.useEffect((()=>ge(i)),[i]),t.createElement(be,{basename:n,children:r,location:c.location,navigationType:c.action,navigator:l,future:i})}const Ee="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement,Te=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ie=t.forwardRef((function(e,n){let r,{onClick:i,relative:o,reloadDocument:s,replace:a,state:l,target:d,to:u,preventScrollReset:h,viewTransition:f}=e,g=_e(e,ke),{basename:m}=t.useContext(K),y=!1;if("string"===typeof u&&Te.test(u)&&(r=u,Ee))try{let e=new URL(window.location.href),t=u.startsWith("//")?new URL(e.protocol+u):new URL(u),n=N(t.pathname,m);t.origin===e.origin&&null!=n?u=n+t.search+t.hash:y=!0}catch(Cm){}let b=function(e,n){let{relative:r}=void 0===n?{}:n;Q()||c(!1);let{basename:i,navigator:o}=t.useContext(K),{hash:s,pathname:a,search:l}=ne(e,{relative:r}),d=a;return"/"!==i&&(d="/"===a?i:F([i,a])),o.createHref({pathname:d,search:l,hash:s})}(u,{relative:o}),v=function(e,n){let{target:r,replace:i,state:o,preventScrollReset:s,relative:a,viewTransition:l}=void 0===n?{}:n,c=ee(),d=J(),u=ne(e,{relative:a});return t.useCallback((t=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(t,r)){t.preventDefault();let n=void 0!==i?i:p(d)===p(u);c(e,{replace:n,state:o,preventScrollReset:s,relative:a,viewTransition:l})}}),[d,c,u,i,o,r,e,s,a,l])}(u,{replace:a,state:l,target:d,preventScrollReset:h,relative:o,viewTransition:f});return t.createElement("a",we({},g,{href:r||b,onClick:y||s?i:function(e){i&&i(e),e.defaultPrevented||v(e)},ref:n,target:d}))}));var je,Pe;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(je||(je={})),function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"}(Pe||(Pe={}));var Ae=function(){return Ae=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},Ae.apply(this,arguments)};Object.create;function Ne(e,t,n){if(n||2===arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var Re=n(324),Oe=n.n(Re),De="-ms-",Le="-moz-",Fe="-webkit-",Me="comm",ze="rule",Ue="decl",$e="@keyframes",Be=Math.abs,We=String.fromCharCode,He=Object.assign;function Ve(e){return e.trim()}function qe(e,t){return(e=t.exec(e))?e[0]:e}function Ke(e,t,n){return e.replace(t,n)}function Ye(e,t,n){return e.indexOf(t,n)}function Ge(e,t){return 0|e.charCodeAt(t)}function Ze(e,t,n){return e.slice(t,n)}function Qe(e){return e.length}function Je(e){return e.length}function Xe(e,t){return t.push(e),e}function et(e,t){return e.filter((function(e){return!qe(e,t)}))}var tt=1,nt=1,rt=0,it=0,ot=0,st="";function at(e,t,n,r,i,o,s,a){return{value:e,root:t,parent:n,type:r,props:i,children:o,line:tt,column:nt,length:s,return:"",siblings:a}}function lt(e,t){return He(at("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function ct(e){for(;e.root;)e=lt(e.root,{children:[e]});Xe(e,e.siblings)}function dt(){return ot=it>0?Ge(st,--it):0,nt--,10===ot&&(nt=1,tt--),ot}function ut(){return ot=it<rt?Ge(st,it++):0,nt++,10===ot&&(nt=1,tt++),ot}function ht(){return Ge(st,it)}function pt(){return it}function ft(e,t){return Ze(st,e,t)}function gt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function mt(e){return tt=nt=1,rt=Qe(st=e),it=0,[]}function yt(e){return st="",e}function bt(e){return Ve(ft(it-1,wt(91===e?e+2:40===e?e+1:e)))}function vt(e){for(;(ot=ht())&&ot<33;)ut();return gt(e)>2||gt(ot)>3?"":" "}function xt(e,t){for(;--t&&ut()&&!(ot<48||ot>102||ot>57&&ot<65||ot>70&&ot<97););return ft(e,pt()+(t<6&&32==ht()&&32==ut()))}function wt(e){for(;ut();)switch(ot){case e:return it;case 34:case 39:34!==e&&39!==e&&wt(ot);break;case 40:41===e&&wt(e);break;case 92:ut()}return it}function _t(e,t){for(;ut()&&e+ot!==57&&(e+ot!==84||47!==ht()););return"/*"+ft(t,it-1)+"*"+We(47===e?e:ut())}function kt(e){for(;!gt(ht());)ut();return ft(e,it)}function St(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function Ct(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case Ue:return e.return=e.return||e.value;case Me:return"";case $e:return e.return=e.value+"{"+St(e.children,r)+"}";case ze:if(!Qe(e.value=e.props.join(",")))return""}return Qe(n=St(e.children,r))?e.return=e.value+"{"+n+"}":""}function Et(e,t,n){switch(function(e,t){return 45^Ge(e,0)?(((t<<2^Ge(e,0))<<2^Ge(e,1))<<2^Ge(e,2))<<2^Ge(e,3):0}(e,t)){case 5103:return Fe+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Fe+e+e;case 4789:return Le+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Fe+e+Le+e+De+e+e;case 5936:switch(Ge(e,t+11)){case 114:return Fe+e+De+Ke(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Fe+e+De+Ke(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Fe+e+De+Ke(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Fe+e+De+e+e;case 6165:return Fe+e+De+"flex-"+e+e;case 5187:return Fe+e+Ke(e,/(\w+).+(:[^]+)/,Fe+"box-$1$2"+De+"flex-$1$2")+e;case 5443:return Fe+e+De+"flex-item-"+Ke(e,/flex-|-self/g,"")+(qe(e,/flex-|baseline/)?"":De+"grid-row-"+Ke(e,/flex-|-self/g,""))+e;case 4675:return Fe+e+De+"flex-line-pack"+Ke(e,/align-content|flex-|-self/g,"")+e;case 5548:return Fe+e+De+Ke(e,"shrink","negative")+e;case 5292:return Fe+e+De+Ke(e,"basis","preferred-size")+e;case 6060:return Fe+"box-"+Ke(e,"-grow","")+Fe+e+De+Ke(e,"grow","positive")+e;case 4554:return Fe+Ke(e,/([^-])(transform)/g,"$1"+Fe+"$2")+e;case 6187:return Ke(Ke(Ke(e,/(zoom-|grab)/,Fe+"$1"),/(image-set)/,Fe+"$1"),e,"")+e;case 5495:case 3959:return Ke(e,/(image-set\([^]*)/,Fe+"$1$`$1");case 4968:return Ke(Ke(e,/(.+:)(flex-)?(.*)/,Fe+"box-pack:$3"+De+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Fe+e+e;case 4200:if(!qe(e,/flex-|baseline/))return De+"grid-column-align"+Ze(e,t)+e;break;case 2592:case 3360:return De+Ke(e,"template-","")+e;case 4384:case 3616:return n&&n.some((function(e,n){return t=n,qe(e.props,/grid-\w+-end/)}))?~Ye(e+(n=n[t].value),"span",0)?e:De+Ke(e,"-start","")+e+De+"grid-row-span:"+(~Ye(n,"span",0)?qe(n,/\d+/):+qe(n,/\d+/)-+qe(e,/\d+/))+";":De+Ke(e,"-start","")+e;case 4896:case 4128:return n&&n.some((function(e){return qe(e.props,/grid-\w+-start/)}))?e:De+Ke(Ke(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Ke(e,/(.+)-inline(.+)/,Fe+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Qe(e)-1-t>6)switch(Ge(e,t+1)){case 109:if(45!==Ge(e,t+4))break;case 102:return Ke(e,/(.+:)(.+)-([^]+)/,"$1"+Fe+"$2-$3$1"+Le+(108==Ge(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Ye(e,"stretch",0)?Et(Ke(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return Ke(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,(function(t,n,r,i,o,s,a){return De+n+":"+r+a+(i?De+n+"-span:"+(o?s:+s-+r)+a:"")+e}));case 4949:if(121===Ge(e,t+6))return Ke(e,":",":"+Fe)+e;break;case 6444:switch(Ge(e,45===Ge(e,14)?18:11)){case 120:return Ke(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Fe+(45===Ge(e,14)?"inline-":"")+"box$3$1"+Fe+"$2$3$1"+De+"$2box$3")+e;case 100:return Ke(e,":",":"+De)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Ke(e,"scroll-","scroll-snap-")+e}return e}function Tt(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Ue:return void(e.return=Et(e.value,e.length,n));case $e:return St([lt(e,{value:Ke(e.value,"@","@"+Fe)})],r);case ze:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,(function(t){switch(qe(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":ct(lt(e,{props:[Ke(t,/:(read-\w+)/,":-moz-$1")]})),ct(lt(e,{props:[t]})),He(e,{props:et(n,r)});break;case"::placeholder":ct(lt(e,{props:[Ke(t,/:(plac\w+)/,":"+Fe+"input-$1")]})),ct(lt(e,{props:[Ke(t,/:(plac\w+)/,":-moz-$1")]})),ct(lt(e,{props:[Ke(t,/:(plac\w+)/,De+"input-$1")]})),ct(lt(e,{props:[t]})),He(e,{props:et(n,r)})}return""}))}}function It(e){return yt(jt("",null,null,null,[""],e=mt(e),0,[0],e))}function jt(e,t,n,r,i,o,s,a,l){for(var c=0,d=0,u=s,h=0,p=0,f=0,g=1,m=1,y=1,b=0,v="",x=i,w=o,_=r,k=v;m;)switch(f=b,b=ut()){case 40:if(108!=f&&58==Ge(k,u-1)){-1!=Ye(k+=Ke(bt(b),"&","&\f"),"&\f",Be(c?a[c-1]:0))&&(y=-1);break}case 34:case 39:case 91:k+=bt(b);break;case 9:case 10:case 13:case 32:k+=vt(f);break;case 92:k+=xt(pt()-1,7);continue;case 47:switch(ht()){case 42:case 47:Xe(At(_t(ut(),pt()),t,n,l),l);break;default:k+="/"}break;case 123*g:a[c++]=Qe(k)*y;case 125*g:case 59:case 0:switch(b){case 0:case 125:m=0;case 59+d:-1==y&&(k=Ke(k,/\f/g,"")),p>0&&Qe(k)-u&&Xe(p>32?Nt(k+";",r,n,u-1,l):Nt(Ke(k," ","")+";",r,n,u-2,l),l);break;case 59:k+=";";default:if(Xe(_=Pt(k,t,n,c,d,i,a,v,x=[],w=[],u,o),o),123===b)if(0===d)jt(k,t,_,_,x,o,u,a,w);else switch(99===h&&110===Ge(k,3)?100:h){case 100:case 108:case 109:case 115:jt(e,_,_,r&&Xe(Pt(e,_,_,0,0,i,a,v,i,x=[],u,w),w),i,w,u,a,r?x:w);break;default:jt(k,_,_,_,[""],w,0,a,w)}}c=d=p=0,g=y=1,v=k="",u=s;break;case 58:u=1+Qe(k),p=f;default:if(g<1)if(123==b)--g;else if(125==b&&0==g++&&125==dt())continue;switch(k+=We(b),b*g){case 38:y=d>0?1:(k+="\f",-1);break;case 44:a[c++]=(Qe(k)-1)*y,y=1;break;case 64:45===ht()&&(k+=bt(ut())),h=ht(),d=u=Qe(v=k+=kt(pt())),b++;break;case 45:45===f&&2==Qe(k)&&(g=0)}}return o}function Pt(e,t,n,r,i,o,s,a,l,c,d,u){for(var h=i-1,p=0===i?o:[""],f=Je(p),g=0,m=0,y=0;g<r;++g)for(var b=0,v=Ze(e,h+1,h=Be(m=s[g])),x=e;b<f;++b)(x=Ve(m>0?p[b]+" "+v:Ke(v,/&\f/g,p[b])))&&(l[y++]=x);return at(e,t,n,0===i?ze:a,l,c,d,u)}function At(e,t,n,r){return at(e,t,n,Me,We(ot),Ze(e,2,-2),0,r)}function Nt(e,t,n,r,i){return at(e,t,n,Ue,Ze(e,0,r),Ze(e,r+1,-1),r,i)}var Rt={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Ot="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}&&({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.SC_ATTR)||"data-styled",Dt="active",Lt="data-styled-version",Ft="6.1.17",Mt="/*!sc*/\n",zt="undefined"!=typeof window&&"HTMLElement"in window,Ut=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"e9d2ad0",REACT_APP_BUILD_TIME:"2026-04-29T15:15:56Z",REACT_APP_BUILD_NUM:"60",REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY)),$t={},Bt=(new Set,Object.freeze([])),Wt=Object.freeze({});function Ht(e,t,n){return void 0===n&&(n=Wt),e.theme!==n.theme&&e.theme||t||n.theme}var Vt=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),qt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Kt=/(^-|-$)/g;function Yt(e){return e.replace(qt,"-").replace(Kt,"")}var Gt=/(a)(d)/gi,Zt=function(e){return String.fromCharCode(e+(e>25?39:97))};function Qt(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Zt(t%52)+n;return(Zt(t%52)+n).replace(Gt,"$1-$2")}var Jt,Xt=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},en=function(e){return Xt(5381,e)};function tn(e){return Qt(en(e)>>>0)}function nn(e){return e.displayName||e.name||"Component"}function rn(e){return"string"==typeof e&&!0}var on="function"==typeof Symbol&&Symbol.for,sn=on?Symbol.for("react.memo"):60115,an=on?Symbol.for("react.forward_ref"):60112,ln={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},cn={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},dn={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},un=((Jt={})[an]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Jt[sn]=dn,Jt);function hn(e){return("type"in(t=e)&&t.type.$$typeof)===sn?dn:"$$typeof"in e?un[e.$$typeof]:ln;var t}var pn=Object.defineProperty,fn=Object.getOwnPropertyNames,gn=Object.getOwnPropertySymbols,mn=Object.getOwnPropertyDescriptor,yn=Object.getPrototypeOf,bn=Object.prototype;function vn(e,t,n){if("string"!=typeof t){if(bn){var r=yn(t);r&&r!==bn&&vn(e,r,n)}var i=fn(t);gn&&(i=i.concat(gn(t)));for(var o=hn(e),s=hn(t),a=0;a<i.length;++a){var l=i[a];if(!(l in cn||n&&n[l]||s&&l in s||o&&l in o)){var c=mn(t,l);try{pn(e,l,c)}catch(e){}}}}return e}function xn(e){return"function"==typeof e}function wn(e){return"object"==typeof e&&"styledComponentId"in e}function _n(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function kn(e,t){if(0===e.length)return"";for(var n=e[0],r=1;r<e.length;r++)n+=t?t+e[r]:e[r];return n}function Sn(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Cn(e,t,n){if(void 0===n&&(n=!1),!n&&!Sn(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Cn(e[r],t[r]);else if(Sn(t))for(var r in t)e[r]=Cn(e[r],t[r]);return e}function En(e,t){Object.defineProperty(e,"toString",{value:t})}function Tn(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var In=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,i=r;e>=i;)if((i<<=1)<0)throw Tn(16,"".concat(e));this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var o=r;o<i;o++)this.groupSizes[o]=0}for(var s=this.indexOfGroup(e+1),a=(o=0,t.length);o<a;o++)this.tag.insertRule(s,t[o])&&(this.groupSizes[e]++,s++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var i=n;i<r;i++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n,o=r;o<i;o++)t+="".concat(this.tag.getRule(o)).concat(Mt);return t},e}(),jn=new Map,Pn=new Map,An=1,Nn=function(e){if(jn.has(e))return jn.get(e);for(;Pn.has(An);)An++;var t=An++;return jn.set(e,t),Pn.set(t,e),t},Rn=function(e,t){An=t+1,jn.set(e,t),Pn.set(t,e)},On="style[".concat(Ot,"][").concat(Lt,'="').concat(Ft,'"]'),Dn=new RegExp("^".concat(Ot,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Ln=function(e,t,n){for(var r,i=n.split(","),o=0,s=i.length;o<s;o++)(r=i[o])&&e.registerName(t,r)},Fn=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(Mt),i=[],o=0,s=r.length;o<s;o++){var a=r[o].trim();if(a){var l=a.match(Dn);if(l){var c=0|parseInt(l[1],10),d=l[2];0!==c&&(Rn(d,c),Ln(e,d,l[3]),e.getTag().insertRules(c,i)),i.length=0}else i.push(a)}}},Mn=function(e){for(var t=document.querySelectorAll(On),n=0,r=t.length;n<r;n++){var i=t[n];i&&i.getAttribute(Ot)!==Dt&&(Fn(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function zn(){return n.nc}var Un=function(e){var t=document.head,n=e||t,r=document.createElement("style"),i=function(e){var t=Array.from(e.querySelectorAll("style[".concat(Ot,"]")));return t[t.length-1]}(n),o=void 0!==i?i.nextSibling:null;r.setAttribute(Ot,Dt),r.setAttribute(Lt,Ft);var s=zn();return s&&r.setAttribute("nonce",s),n.insertBefore(r,o),r},$n=function(){function e(e){this.element=Un(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var i=t[n];if(i.ownerNode===e)return i}throw Tn(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Bn=function(){function e(e){this.element=Un(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Wn=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Hn=zt,Vn={isServer:!zt,useCSSOMInjection:!Ut},qn=function(){function e(e,t,n){void 0===e&&(e=Wt),void 0===t&&(t={});var r=this;this.options=Ae(Ae({},Vn),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&zt&&Hn&&(Hn=!1,Mn(this)),En(this,(function(){return function(e){for(var t=e.getTag(),n=t.length,r="",i=function(n){var i=function(e){return Pn.get(e)}(n);if(void 0===i)return"continue";var o=e.names.get(i),s=t.getGroup(n);if(void 0===o||!o.size||0===s.length)return"continue";var a="".concat(Ot,".g").concat(n,'[id="').concat(i,'"]'),l="";void 0!==o&&o.forEach((function(e){e.length>0&&(l+="".concat(e,","))})),r+="".concat(s).concat(a,'{content:"').concat(l,'"}').concat(Mt)},o=0;o<n;o++)i(o);return r}(r)}))}return e.registerId=function(e){return Nn(e)},e.prototype.rehydrate=function(){!this.server&&zt&&Mn(this)},e.prototype.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(Ae(Ae({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Wn(n):t?new $n(n):new Bn(n)}(this.options),new In(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(Nn(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Nn(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Nn(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Kn=/&/g,Yn=/^\s*\/\/.*$/gm;function Gn(e,t){return e.map((function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map((function(e){return"".concat(t," ").concat(e)}))),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=Gn(e.children,t)),e}))}function Zn(e){var t,n,r,i=void 0===e?Wt:e,o=i.options,s=void 0===o?Wt:o,a=i.plugins,l=void 0===a?Bt:a,c=function(e,r,i){return i.startsWith(n)&&i.endsWith(n)&&i.replaceAll(n,"").length>0?".".concat(t):e},d=l.slice();d.push((function(e){e.type===ze&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(Kn,n).replace(r,c))})),s.prefix&&d.push(Tt),d.push(Ct);var u=function(e,i,o,a){void 0===i&&(i=""),void 0===o&&(o=""),void 0===a&&(a="&"),t=a,n=i,r=new RegExp("\\".concat(n,"\\b"),"g");var l=e.replace(Yn,""),c=It(o||i?"".concat(o," ").concat(i," { ").concat(l," }"):l);s.namespace&&(c=Gn(c,s.namespace));var u,h=[];return St(c,function(e){var t=Je(e);return function(n,r,i,o){for(var s="",a=0;a<t;a++)s+=e[a](n,r,i,o)||"";return s}}(d.concat((u=function(e){return h.push(e)},function(e){e.root||(e=e.return)&&u(e)})))),h};return u.hash=l.length?l.reduce((function(e,t){return t.name||Tn(15),Xt(e,t.name)}),5381).toString():"",u}var Qn=new qn,Jn=Zn(),Xn=t.createContext({shouldForwardProp:void 0,styleSheet:Qn,stylis:Jn}),er=(Xn.Consumer,t.createContext(void 0));function tr(){return(0,t.useContext)(Xn)}function nr(e){var n=(0,t.useState)(e.stylisPlugins),r=n[0],i=n[1],o=tr().styleSheet,s=(0,t.useMemo)((function(){var t=o;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t}),[e.disableCSSOMInjection,e.sheet,e.target,o]),a=(0,t.useMemo)((function(){return Zn({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:r})}),[e.enableVendorPrefixes,e.namespace,r]);(0,t.useEffect)((function(){Oe()(r,e.stylisPlugins)||i(e.stylisPlugins)}),[e.stylisPlugins]);var l=(0,t.useMemo)((function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:s,stylis:a}}),[e.shouldForwardProp,s,a]);return t.createElement(Xn.Provider,{value:l},t.createElement(er.Provider,{value:a},e.children))}var rr=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=Jn);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,En(this,(function(){throw Tn(12,String(n.name))}))}return e.prototype.getName=function(e){return void 0===e&&(e=Jn),this.name+e.hash},e}(),ir=function(e){return e>="A"&&e<="Z"};function or(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;ir(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var sr=function(e){return null==e||!1===e||""===e},ar=function(e){var t,n,r=[];for(var i in e){var o=e[i];e.hasOwnProperty(i)&&!sr(o)&&(Array.isArray(o)&&o.isCss||xn(o)?r.push("".concat(or(i),":"),o,";"):Sn(o)?r.push.apply(r,Ne(Ne(["".concat(i," {")],ar(o),!1),["}"],!1)):r.push("".concat(or(i),": ").concat((t=i,null==(n=o)||"boolean"==typeof n||""===n?"":"number"!=typeof n||0===n||t in Rt||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function lr(e,t,n,r){return sr(e)?[]:wn(e)?[".".concat(e.styledComponentId)]:xn(e)?!xn(i=e)||i.prototype&&i.prototype.isReactComponent||!t?[e]:lr(e(t),t,n,r):e instanceof rr?n?(e.inject(n,r),[e.getName(r)]):[e]:Sn(e)?ar(e):Array.isArray(e)?Array.prototype.concat.apply(Bt,e.map((function(e){return lr(e,t,n,r)}))):[e.toString()];var i}function cr(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(xn(n)&&!wn(n))return!1}return!0}var dr=en(Ft),ur=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&cr(e),this.componentId=t,this.baseHash=Xt(dr,t),this.baseStyle=n,qn.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=_n(r,this.staticRulesId);else{var i=kn(lr(this.rules,e,t,n)),o=Qt(Xt(this.baseHash,i)>>>0);if(!t.hasNameForId(this.componentId,o)){var s=n(i,".".concat(o),void 0,this.componentId);t.insertRules(this.componentId,o,s)}r=_n(r,o),this.staticRulesId=o}else{for(var a=Xt(this.baseHash,n.hash),l="",c=0;c<this.rules.length;c++){var d=this.rules[c];if("string"==typeof d)l+=d;else if(d){var u=kn(lr(d,e,t,n));a=Xt(a,u+c),l+=u}}if(l){var h=Qt(a>>>0);t.hasNameForId(this.componentId,h)||t.insertRules(this.componentId,h,n(l,".".concat(h),void 0,this.componentId)),r=_n(r,h)}}return r},e}(),hr=t.createContext(void 0);hr.Consumer;var pr={};new Set;function fr(e,n,r){var i=wn(e),o=e,s=!rn(e),a=n.attrs,l=void 0===a?Bt:a,c=n.componentId,d=void 0===c?function(e,t){var n="string"!=typeof e?"sc":Yt(e);pr[n]=(pr[n]||0)+1;var r="".concat(n,"-").concat(tn(Ft+n+pr[n]));return t?"".concat(t,"-").concat(r):r}(n.displayName,n.parentComponentId):c,u=n.displayName,h=void 0===u?function(e){return rn(e)?"styled.".concat(e):"Styled(".concat(nn(e),")")}(e):u,p=n.displayName&&n.componentId?"".concat(Yt(n.displayName),"-").concat(n.componentId):n.componentId||d,f=i&&o.attrs?o.attrs.concat(l).filter(Boolean):l,g=n.shouldForwardProp;if(i&&o.shouldForwardProp){var m=o.shouldForwardProp;if(n.shouldForwardProp){var y=n.shouldForwardProp;g=function(e,t){return m(e,t)&&y(e,t)}}else g=m}var b=new ur(r,p,i?o.componentStyle:void 0);function v(e,n){return function(e,n,r){var i=e.attrs,o=e.componentStyle,s=e.defaultProps,a=e.foldedComponentIds,l=e.styledComponentId,c=e.target,d=t.useContext(hr),u=tr(),h=e.shouldForwardProp||u.shouldForwardProp,p=Ht(n,d,s)||Wt,f=function(e,t,n){for(var r,i=Ae(Ae({},t),{className:void 0,theme:n}),o=0;o<e.length;o+=1){var s=xn(r=e[o])?r(i):r;for(var a in s)i[a]="className"===a?_n(i[a],s[a]):"style"===a?Ae(Ae({},i[a]),s[a]):s[a]}return t.className&&(i.className=_n(i.className,t.className)),i}(i,n,p),g=f.as||c,m={};for(var y in f)void 0===f[y]||"$"===y[0]||"as"===y||"theme"===y&&f.theme===p||("forwardedAs"===y?m.as=f.forwardedAs:h&&!h(y,g)||(m[y]=f[y]));var b=function(e,t){var n=tr();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(o,f),v=_n(a,l);return b&&(v+=" "+b),f.className&&(v+=" "+f.className),m[rn(g)&&!Vt.has(g)?"class":"className"]=v,r&&(m.ref=r),(0,t.createElement)(g,m)}(x,e,n)}v.displayName=h;var x=t.forwardRef(v);return x.attrs=f,x.componentStyle=b,x.displayName=h,x.shouldForwardProp=g,x.foldedComponentIds=i?_n(o.foldedComponentIds,o.styledComponentId):"",x.styledComponentId=p,x.target=i?o.target:e,Object.defineProperty(x,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,i=t;r<i.length;r++)Cn(e,i[r],!0);return e}({},o.defaultProps,e):e}}),En(x,(function(){return".".concat(x.styledComponentId)})),s&&vn(x,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),x}function gr(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var mr=function(e){return Object.assign(e,{isCss:!0})};function yr(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(xn(e)||Sn(e))return mr(lr(gr(Bt,Ne([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?lr(r):mr(lr(gr(r,t)))}function br(e,t,n){if(void 0===n&&(n=Wt),!t)throw Tn(1,t);var r=function(r){for(var i=[],o=1;o<arguments.length;o++)i[o-1]=arguments[o];return e(t,n,yr.apply(void 0,Ne([r],i,!1)))};return r.attrs=function(r){return br(e,t,Ae(Ae({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return br(e,t,Ae(Ae({},n),r))},r}var vr=function(e){return br(fr,e)},xr=vr;Vt.forEach((function(e){xr[e]=vr(e)}));var wr=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=cr(e),qn.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var i=r(kn(lr(this.rules,t,n,r)),""),o=this.componentId+e;n.insertRules(o,o,i)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&qn.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function _r(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=kn(yr.apply(void 0,Ne([e],t,!1))),i=tn(r);return new rr(i,r)}(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=zn(),r=kn([n&&'nonce="'.concat(n,'"'),"".concat(Ot,'="true"'),"".concat(Lt,'="').concat(Ft,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw Tn(2);return e._emitSheetCSS()},this.getStyleElement=function(){var n;if(e.sealed)throw Tn(2);var r=e.instance.toString();if(!r)return[];var i=((n={})[Ot]="",n[Lt]=Ft,n.dangerouslySetInnerHTML={__html:r},n),o=zn();return o&&(i.nonce=o),[t.createElement("style",Ae({},i,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new qn({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw Tn(2);return t.createElement(nr,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw Tn(3)}})(),"__sc-".concat(Ot,"__");var kr=n(116),Sr=n(579);const Cr=xr.footer`
  position: relative;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  margin-top: auto;
  font-family: 'Inter', sans-serif;
`,Er=xr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,Tr=xr.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 5px 0;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`,Ir=xr.p`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`,jr=()=>{const e=new Date,t=e.getFullYear(),n=`${e.getMonth()+1}/${e.getDate()}/${t}`;return(0,Sr.jsx)(Cr,{children:(0,Sr.jsxs)(Er,{children:[(0,Sr.jsxs)(Tr,{children:["Presented by Scrambled Legs\u2122 ",t," \u2022 ",n]}),(0,Sr.jsxs)(Ir,{children:["v ",kr.hl," \xb7 build ",kr.IN," \xb7 ",kr.ud]})]})})};var Pr=n(508),Ar=n(800),Nr=n(122);const Rr="BEsmXUl-hHK0FAmHVdbUeZ3kDbSyhOPId-66fJ5NRJ44XFYy5MujmXiXKBp8MH_7hBmFedktB5y7iF3NOjV86tY",Or="sl_notif_dismissed_until",Dr="sl_notif_token_hash",Lr="https://thescrambledlegs.com/android-chrome-192x192.png";function Fr(){return"undefined"!==typeof navigator&&(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream)}function Mr(){return"undefined"!==typeof window&&(!(!window.matchMedia||!window.matchMedia("(display-mode: standalone)").matches)||window.navigator&&!0===window.navigator.standalone)}function zr(){return"undefined"===typeof navigator?"desktop":Fr()?"ios":/Android/i.test(navigator.userAgent)?"android":"desktop"}function Ur(){return"undefined"!==typeof window&&"Notification"in window&&"serviceWorker"in navigator&&"PushManager"in window}function $r(){if(!Ur())return"unsupported";if(Fr()&&!Mr())return"ios_needs_install";let e="default";try{e=Notification.permission}catch(Cm){return"unsupported"}if("granted"===e)return"subscribed";if("denied"===e)return"blocked";let t=0;try{t=parseInt(localStorage.getItem(Or)||"0",10)||0}catch(Cm){t=0}return Date.now()<t?"dismissed":"askable"}let Br=null;async function Wr(){if(!Ur())throw new Error("This browser does not support push notifications.");const e=await Notification.requestPermission();try{const{logEvent:t}=await Promise.resolve().then(n.bind(n,173));"granted"===e?t("notification_permission_granted",{platform:zr()}):t("notification_permission_denied",{platform:zr(),permission:e})}catch(Bt){}if("granted"!==e)throw new Error("denied"===e?"Notifications are blocked. Open your browser settings to re-enable.":"Permission was not granted. Please try again and tap Allow.");const t=await(0,Nr.Oe)();if(!t)throw new Error("Firebase messaging is not available in this browser.");const r=await async function(){if(Br)return Br;if(!("serviceWorker"in navigator))throw new Error("Service workers not supported in this browser.");return Br=await navigator.serviceWorker.register("/firebase-messaging-sw.js"),Br}(),i=await(0,Pr.gf)(t,{vapidKey:Rr,serviceWorkerRegistration:r});if(!i)throw new Error("FCM did not return a token.");const o=await async function(e){const t=(new TextEncoder).encode(e),n=await crypto.subtle.digest("SHA-256",t),r=new Uint8Array(n);let i="";for(let o=0;o<r.length;o++)i+=r[o].toString(16).padStart(2,"0");return i}(i);try{const e=Nr.j2.currentUser,t=zr(),r={token:i,createdAt:(0,Ar.O5)(),lastSeenAt:(0,Ar.O5)(),userAgent:"undefined"!==typeof navigator?navigator.userAgent.slice(0,400):"",platform:t,isStandalone:Mr()};e&&(r.uid=e.uid,e.email&&(r.email=e.email),e.displayName?r.displayName=e.displayName:e.email&&(r.displayName=e.email.split("@")[0])),await(0,Ar.hZ)((0,Ar.ref)(Nr.OO,`fcmTokens/${o}`),r),e&&(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${e.uid}/devices/${o}`),{platform:t,lastSeenAt:(0,Ar.O5)(),notificationsEnabled:!0}).catch((()=>{}));try{const{logEvent:e}=await Promise.resolve().then(n.bind(n,173));e("notification_subscribed",{platform:t})}catch(Bt){}console.log("[messaging] Token written to Firebase /fcmTokens/",o.slice(0,8))}catch(s){throw console.error("[messaging] Token write FAILED \u2014 likely Firebase rules not deployed:",s.message),new Error("Subscribed but could not save your token to Firebase. Run `firebase deploy --only database` to deploy the database rules. Error: "+s.message)}try{localStorage.setItem(Dr,o),localStorage.removeItem(Or)}catch(Cm){}return{token:i,hash:o}}async function Hr(e){if(!e)return;const t=function(){try{return localStorage.getItem(Dr)||null}catch(Cm){return null}}();if(t)try{const n={uid:e.uid};e.email&&(n.email=e.email),e.displayName?n.displayName=e.displayName:e.email&&(n.displayName=e.email.split("@")[0]),n.lastSeenAt=(0,Ar.O5)(),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`fcmTokens/${t}`),n),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${e.uid}/devices/${t}`),{platform:zr(),lastSeenAt:(0,Ar.O5)(),notificationsEnabled:!0})}catch(Bt){}}function Vr(){try{localStorage.setItem(Or,String(Date.now()+864e5))}catch(Cm){}}let qr=!1;const Kr=_r`
  from { opacity: 0; }
  to   { opacity: 1; }
`,Yr=_r`
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
`,Gr=xr.div`
  position: fixed;
  inset: 0;
  z-index: 9500;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  animation: ${Kr} 0.18s ease-out;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`,Zr=xr.div`
  width: 100%;
  max-width: 480px;
  background: linear-gradient(180deg, #2a2a2c 0%, #1f1f21 100%);
  color: #f4f4f4;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  border-top: 1px solid rgba(255,199,44,0.25);
  padding: 18px 20px 28px;
  animation: ${Yr} 0.28s cubic-bezier(0.18, 0.89, 0.32, 1.15);
  box-shadow: 0 -16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04);
  max-height: 90vh;
  overflow-y: auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`,Qr=xr.div`
  width: 38px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.18);
  margin: 0 auto 14px;
`,Jr=xr.h2`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin: 0 0 8px;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.01em;
`,Xr=xr.p`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,0.85);
  margin: 0 0 18px;
`,ei=xr.div`
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
`,ti=xr.button`
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
`,ni=xr.button`
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
`,ri=xr.div`
  margin-top: 10px;
  font-size: 12px;
  color: #FFB4B4;
  text-align: center;
  min-height: 16px;
`,ii=()=>(0,Sr.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",style:{verticalAlign:"middle"},children:[(0,Sr.jsx)("path",{d:"M12 3v13M7 8l5-5 5 5",stroke:"#FFC72C",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,Sr.jsx)("path",{d:"M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",stroke:"#FFC72C",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),oi=()=>(0,Sr.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",style:{verticalAlign:"middle"},children:(0,Sr.jsx)("path",{d:"M12 5v14M5 12h14",stroke:"#FFC72C",strokeWidth:"2.4",strokeLinecap:"round"})});function si(){return(0,Sr.jsxs)(ei,{children:[(0,Sr.jsx)("h3",{children:"\ud83c\udf4e On iPhone? Apple makes us do this dance:"}),(0,Sr.jsxs)("ol",{children:[(0,Sr.jsxs)("li",{children:["Tap ",(0,Sr.jsx)(ii,{})," ",(0,Sr.jsx)("strong",{children:"Share"})," at the bottom of Safari"]}),(0,Sr.jsxs)("li",{children:["Tap ",(0,Sr.jsx)(oi,{})," ",(0,Sr.jsx)("strong",{children:"Add to Home Screen"})]}),(0,Sr.jsx)("li",{children:"Open the egg from your home screen"}),(0,Sr.jsxs)("li",{children:["Come back here and tap ",(0,Sr.jsx)("strong",{children:"Notify Me"})]})]}),(0,Sr.jsx)("div",{className:"quip",children:"(Yes, it's silly. Worth it.)"})]})}function ai(){return(0,Sr.jsxs)(ei,{children:[(0,Sr.jsx)("h3",{children:"\ud83c\udf4e You're in!"}),(0,Sr.jsxs)("ul",{children:[(0,Sr.jsxs)("li",{children:["Tap ",(0,Sr.jsx)("strong",{children:"Notify Me"})," below."]}),(0,Sr.jsxs)("li",{children:["iPhone will ask once \u2014 tap ",(0,Sr.jsx)("strong",{children:"Allow"}),"."]})]})]})}function li(){return(0,Sr.jsxs)(ei,{children:[(0,Sr.jsx)("h3",{children:"\ud83c\udf10 Quick one."}),(0,Sr.jsxs)("ul",{children:[(0,Sr.jsxs)("li",{children:["Tap ",(0,Sr.jsx)("strong",{children:"Notify Me"})," below."]}),(0,Sr.jsxs)("li",{children:["Your browser will pop a permission box \u2014 hit ",(0,Sr.jsx)("strong",{children:"Allow"}),"."]}),(0,Sr.jsx)("li",{children:"That's it. You're scrambled."})]})]})}function ci(e){let{platform:t}=e;return(0,Sr.jsxs)(ei,{children:[(0,Sr.jsx)("h3",{children:"\ud83d\udee0 Re-enable notifications"}),(0,Sr.jsxs)("p",{style:{fontSize:13,color:"rgba(255,255,255,0.85)",margin:"0 0 8px"},children:["Open the site permissions and flip notifications back to ",(0,Sr.jsx)("strong",{children:"Allow"}),":"]}),(0,Sr.jsxs)("ul",{children:[(0,Sr.jsxs)("li",{children:[(0,Sr.jsx)("strong",{children:"iPhone:"})," Settings \u2192 Notifications \u2192 Scrambled Legs \u2192 Allow"]}),(0,Sr.jsxs)("li",{children:[(0,Sr.jsx)("strong",{children:"Android Chrome:"})," Tap the lock icon in the URL bar \u2192 Permissions \u2192 Notifications \u2192 Allow"]}),(0,Sr.jsxs)("li",{children:[(0,Sr.jsx)("strong",{children:"Desktop Chrome:"})," Tap the lock icon in the URL bar \u2192 Site settings \u2192 Notifications \u2192 Allow"]})]}),(0,Sr.jsx)("div",{className:"quip",children:"Once you flip it, refresh this page."})]})}const di=function(e){let{state:n,onClose:r}=e;const[i,o]=(0,t.useState)("desktop"),[s,a]=(0,t.useState)(!1),[l,c]=(0,t.useState)("");(0,t.useEffect)((()=>{o(zr());const e=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=e}}),[]);let d="Notify Me";return"ios_needs_install"===n?d="Got it, take me there":"blocked"===n&&(d="Got it"),s&&(d="Asking\u2026"),(0,Sr.jsx)(Gr,{onClick:e=>{e.target===e.currentTarget&&r&&r()},children:(0,Sr.jsxs)(Zr,{role:"dialog","aria-modal":"true","aria-labelledby":"sl-notif-headline",children:[(0,Sr.jsx)(Qr,{}),(0,Sr.jsx)(Jr,{id:"sl-notif-headline",children:"\ud83c\udf2d Join the Notification Club"}),(0,Sr.jsx)(Xr,{children:"Texts get buried. The group chat is chaos. Scrambled Legs drops notifications when there's a ride, a location change, or free beer. We'll only bother you when it actually matters. That's the scrambled promise."}),"blocked"===n?(0,Sr.jsx)(ci,{platform:i}):"ios_needs_install"===n?(0,Sr.jsx)(si,{}):"ios"===i?(0,Sr.jsx)(ai,{}):(0,Sr.jsx)(li,{}),(0,Sr.jsx)(ti,{type:"button",onClick:async()=>{if("ios_needs_install"!==n)if("blocked"!==n){c(""),a(!0);try{await Wr(),r&&r()}catch(e){c(e.message||"Subscribe failed."),a(!1)}}else r&&r();else r&&r()},disabled:s,children:d}),(0,Sr.jsx)(ri,{role:"alert",children:l}),"blocked"!==n&&(0,Sr.jsx)(ni,{type:"button",onClick:()=>{Vr(),r&&r()},children:"Maybe later"})]})})},ui=_r`
  0%   { box-shadow: 0 0 0 0 rgba(255,199,44,0.55), 0 8px 24px rgba(0,0,0,0.35); }
  70%  { box-shadow: 0 0 0 18px rgba(255,199,44,0), 0 8px 24px rgba(0,0,0,0.35); }
  100% { box-shadow: 0 0 0 0 rgba(255,199,44,0), 0 8px 24px rgba(0,0,0,0.35); }
`,hi=_r`
  0%,100% { transform: rotate(0deg); }
  20% { transform: rotate(-12deg); }
  40% { transform: rotate(10deg); }
  60% { transform: rotate(-8deg); }
  80% { transform: rotate(6deg); }
`,pi=xr.div`
  position: fixed;
  right: 16px;
  bottom: 20px;
  z-index: 9000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`,fi=xr.span`
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
  ${e=>e.$pulse&&yr`animation: ${ui} 2.2s ease-out 3;`}
`,gi=xr.button`
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

  ${e=>e.$pulse&&yr`animation: ${ui} 1.8s ease-out infinite;`}
  ${e=>e.$wiggle&&yr`animation: ${hi} 0.7s ease-in-out 1;`}

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
`,mi=xr.button`
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
`,yi=xr.button`
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
`,bi=[{title:"\ud83c\udf2d Join the Notification Club",sub:"Where we're riding. When plans change. Free beer. Scrambled Legs only bothers you when it counts."},{title:"\ud83e\udd5a Don't be a bad egg",sub:"Get Scrambled Legs ride alerts straight to your phone. No group chat required."},{title:"\ud83d\udeb4 Wednesday rolls are calling",sub:"Know where we're meeting before everyone else. Enable notifications."},{title:"\ud83d\udd25 Stay in the yolk",sub:"Ride changes, beer calls, and the occasional emergency \u2014 right to your phone."},{title:"\ud83c\udf2d The crew is already in",sub:"Scrambled Legs drops push notifications for rides, location changes, and free stuff."},{title:"\ud83e\udd5a Crack open notifications",sub:"Stop missing the Wednesday roll-out. It only takes a tap."}],vi=xr.span`
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
`,xi=_r`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`,wi=xr.div`
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
  animation: ${xi} 0.35s cubic-bezier(.34,1.56,.64,1) forwards;

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
`;const _i=function(){const[e,n]=(0,t.useState)((()=>{const e=$r();return console.log("[NotifFab] Initial subscription state:",e,"| Notification.permission:","undefined"!==typeof Notification?Notification.permission:"N/A","| pushSupported:","undefined"!==typeof window&&"Notification"in window&&"serviceWorker"in navigator&&"PushManager"in window),e})),[r,i]=(0,t.useState)(!1),[o,s]=(0,t.useState)(!0),[a,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)(!1),[u]=(0,t.useState)((()=>{try{const e=(parseInt(localStorage.getItem("sl_nudge_idx")||"0",10)+1)%bi.length;return localStorage.setItem("sl_nudge_idx",String(e)),bi[e]}catch{return bi[0]}}));(0,t.useEffect)((()=>{const t=()=>n($r()),r=()=>{"visible"===document.visibilityState&&t()};document.addEventListener("visibilitychange",r),window.addEventListener("focus",t),window.addEventListener("storage",t);try{sessionStorage.getItem("sl_notif_wiggle_done")||"askable"!==e||(sessionStorage.setItem("sl_notif_wiggle_done","1"),l(!0))}catch(Cm){}return()=>{document.removeEventListener("visibilitychange",r),window.removeEventListener("focus",t),window.removeEventListener("storage",t)}}),[]),(0,t.useEffect)((()=>{const e=setTimeout((()=>s(!1)),7e3);return()=>clearTimeout(e)}),[]),(0,t.useEffect)((()=>{const e=$r();if(console.log("[NotifFab] Nudge useEffect \u2014 state:",e),"askable"===e||"ios_needs_install"===e){console.log("[NotifFab] New user \u2014 opening full sheet in 3s");const e=setTimeout((()=>{"askable"!==$r()&&"ios_needs_install"!==$r()||i(!0)}),3e3);return()=>clearTimeout(e)}if("dismissed"===e){console.log("[NotifFab] Dismissed user \u2014 showing toast in 3s");const e=setTimeout((()=>d(!0)),3e3);return()=>clearTimeout(e)}console.log("[NotifFab] No nudge \u2014 state:",e)}),[]);const h=(0,t.useCallback)((()=>{d(!1),Vr(),n($r())}),[]),p=(0,t.useCallback)((()=>{d(!1),i(!0)}),[]),f=(0,t.useCallback)((()=>i(!0)),[]),g=(0,t.useCallback)((()=>{i(!1),n($r())}),[]);if("unsupported"===e||"subscribed"===e)return null;if("blocked"===e)return(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(yi,{type:"button",onClick:f,"aria-label":"Notifications are blocked. Tap to fix.",children:[(0,Sr.jsx)("span",{className:"em",children:"\ud83e\udd5a"}),(0,Sr.jsxs)("span",{children:["You blocked us. Wild. ",(0,Sr.jsx)("span",{className:"arrow",children:"Tap to fix \u2192"})]})]}),r&&(0,Sr.jsx)(di,{state:e,onClose:g})]});if("dismissed"===e)return(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(mi,{type:"button",onClick:f,"aria-label":"Open notification subscribe",children:["\ud83d\udd14",(0,Sr.jsx)(vi,{children:"Subscribe to notifications"})]}),r&&(0,Sr.jsx)(di,{state:"askable",onClose:g})]});const m="ios_needs_install"===e;return(0,Sr.jsxs)(Sr.Fragment,{children:[c&&(0,Sr.jsxs)(wi,{role:"alert",children:[(0,Sr.jsx)("span",{className:"nudge-icon",children:"\ud83c\udf2d"}),(0,Sr.jsxs)("div",{className:"nudge-text",children:[(0,Sr.jsx)("div",{className:"nudge-title",children:u.title}),(0,Sr.jsx)("div",{className:"nudge-sub",children:u.sub})]}),(0,Sr.jsx)("button",{className:"nudge-enable",onClick:p,type:"button",children:"Enable"}),(0,Sr.jsx)("button",{className:"nudge-dismiss",onClick:h,type:"button","aria-label":"Dismiss",children:"\xd7"})]}),(0,Sr.jsxs)(pi,{children:[(0,Sr.jsx)(fi,{$pulse:!o,children:"Get Notified"}),(0,Sr.jsxs)(gi,{type:"button",$pulse:!0,$wiggle:a,$badge:m,onClick:f,"aria-label":"Subscribe to Scrambled Legs notifications",children:["\ud83d\udd14",(0,Sr.jsx)(vi,{children:m?"Install to get notifications on iPhone":"Subscribe to notifications"})]})]}),r&&(0,Sr.jsx)(di,{state:e,onClose:g})]})},ki="sl_install_dismissed";function Si(){try{const e=parseInt(localStorage.getItem(ki)||"0",10);return Date.now()<e}catch{return!1}}function Ci(){try{localStorage.setItem(ki,String(Date.now()+6048e5))}catch{}}const Ei=_r`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`,Ti=xr.div`
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
  animation: ${Ei} 0.35s cubic-bezier(.34,1.56,.64,1) forwards;

  @media (max-width: 480px) {
    left: 12px;
    right: 12px;
    bottom: 86px;
    padding: 12px 10px 12px 12px;
  }
`,Ii=xr.span`
  font-size: 22px;
  flex-shrink: 0;
  margin-top: 1px;
`,ji=xr.div`
  flex: 1;
  min-width: 0;
`,Pi=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`,Ai=xr.div`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.6);
  margin-top: 3px;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 10px;
  }
`,Ni=xr.button`
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
`,Ri=xr.button`
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
`,Oi=xr.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 6px;
`,Di=xr.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.75);

  @media (max-width: 480px) {
    font-size: 10px;
  }
`,Li=xr.span`
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
`;function Fi(){return(0,Sr.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#FFC72C",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round",style:{display:"inline",verticalAlign:"middle",marginRight:2},"aria-hidden":"true",children:[(0,Sr.jsx)("path",{d:"M8.59 5.41L12 2l3.41 3.41"}),(0,Sr.jsx)("line",{x1:"12",y1:"2",x2:"12",y2:"15"}),(0,Sr.jsx)("path",{d:"M5 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1"})]})}function Mi(e){let{deferredPrompt:n,onDismiss:r}=e;const i=(0,t.useCallback)((async()=>{if(n)try{n.prompt();const{outcome:e}=await n.userChoice;"accepted"===e&&r(!0)}catch(e){console.warn("[InstallPrompt] Android prompt error:",e)}}),[n,r]);return(0,Sr.jsxs)(Ti,{role:"complementary","aria-label":"Install app prompt",children:[(0,Sr.jsx)(Ii,{children:"\ud83e\udd5a"}),(0,Sr.jsxs)(ji,{children:[(0,Sr.jsx)(Pi,{children:"Add Scrambled Legs to your home screen"}),(0,Sr.jsx)(Ai,{children:"Get the app experience \u2014 faster loads, offline access, and push notifications."})]}),(0,Sr.jsx)(Ni,{type:"button",onClick:i,children:"Install"}),(0,Sr.jsx)(Ri,{type:"button","aria-label":"Dismiss install prompt",onClick:()=>r(!1),children:"\xd7"})]})}function zi(e){let{onDismiss:t}=e;return(0,Sr.jsxs)(Ti,{role:"complementary","aria-label":"Add to Home Screen instructions",children:[(0,Sr.jsx)(Ii,{children:"\ud83e\udd5a"}),(0,Sr.jsxs)(ji,{children:[(0,Sr.jsx)(Pi,{children:"Install on iPhone"}),(0,Sr.jsx)(Ai,{children:"Required for notifications on iPhone."}),(0,Sr.jsxs)(Oi,{children:[(0,Sr.jsxs)(Di,{children:[(0,Sr.jsx)(Li,{children:"1"}),"Tap ",(0,Sr.jsx)(Fi,{})," ",(0,Sr.jsx)("strong",{style:{color:"#FFC72C"},children:"Share"})," in your browser toolbar"]}),(0,Sr.jsxs)(Di,{children:[(0,Sr.jsx)(Li,{children:"2"}),"Choose ",(0,Sr.jsx)("strong",{style:{color:"#FFC72C"},children:"Add to Home Screen \uff0b"})]}),(0,Sr.jsxs)(Di,{children:[(0,Sr.jsx)(Li,{children:"3"}),"Tap ",(0,Sr.jsx)("strong",{style:{color:"#FFC72C"},children:"Add"})," \u2014 done!"]})]})]}),(0,Sr.jsx)(Ri,{type:"button","aria-label":"Dismiss iOS install prompt",onClick:t,children:"\xd7"})]})}function Ui(){const[e,n]=(0,t.useState)(null),[r,i]=(0,t.useState)(!1),o=(0,t.useRef)(!1);(0,t.useEffect)((()=>{if(function(){try{return window.matchMedia("(display-mode: standalone)").matches}catch{return!1}}())return;if(Si())return;const e=e=>{e.preventDefault(),n(e)};window.addEventListener("beforeinstallprompt",e);const t=()=>{n(null)};return window.addEventListener("appinstalled",t),()=>{window.removeEventListener("beforeinstallprompt",e),window.removeEventListener("appinstalled",t)}}),[]),(0,t.useEffect)((()=>{if(o.current=!0,!Fr())return;if(Mr())return;if(Si())return;const e=setTimeout((()=>{o.current&&i(!0)}),5e3);return()=>{o.current=!1,clearTimeout(e)}}),[]);const s=(0,t.useCallback)((e=>{n(null),e||Ci()}),[]),a=(0,t.useCallback)((()=>{i(!1),Ci()}),[]);return e?(0,Sr.jsx)(Mi,{deferredPrompt:e,onDismiss:s}):r?(0,Sr.jsx)(zi,{onDismiss:a}):null}const $i="events";function Bi(){return(0,Ar.ref)(Nr.OO,$i)}function Wi(e){return(0,Ar.ref)(Nr.OO,`${$i}/${e}`)}function Hi(e){const t=Bi(),n=t=>{const n=[];t.forEach((e=>{const t=e.val()||{};n.push({id:e.key,...t})})),n.sort(((e,t)=>(e.start||0)-(t.start||0))),e(n)};return(0,Ar.Zy)(t,n),()=>(0,Ar.AU)(t,"value",n)}function Vi(e){const t=Date.now(),n=[],r=[];return e.forEach((e=>{const i=6e4*(e.durationMinutes||120);(e.start||0)+i>=t?n.push(e):r.push(e)})),n.sort(((e,t)=>(e.start||0)-(t.start||0))),r.sort(((e,t)=>(t.start||0)-(e.start||0))),{upcoming:n,past:r}}const qi="sl_events_cache_v2";function Ki(){const[e,n]=(0,t.useState)((()=>function(){try{const e=localStorage.getItem(qi);if(!e)return null;const{events:t}=JSON.parse(e);return Array.isArray(t)?t:null}catch{return null}}()||[])),[r,i]=(0,t.useState)(!0);return(0,t.useEffect)((()=>{const e=Hi((e=>{n(e),i(!1),function(e){try{localStorage.setItem(qi,JSON.stringify({events:e,t:Date.now()}))}catch{}}(e)}));return e}),[]),{events:e,isStale:r}}const Yi="America/Chicago",Gi=72e5;function Zi(e,t,n){const r=function(e,t){const n=new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)),r=e=>parseInt(n.find((t=>t.type===e)).value,10);return Date.UTC(r("year"),r("month")-1,r("day"),r("hour"),r("minute"),r("second"))-e}(Date.UTC(e,t-1,n,12,0,0),Yi);return Date.UTC(e,t-1,n,0,0,0)-r}function Qi(e){const t=Date.now();return t<e.start?"upcoming":t<e.start+Gi?"in_progress":t<function(e){const t=new Intl.DateTimeFormat("en-CA",{timeZone:Yi,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)),[n,r,i]=t.split("-").map(Number);return Zi(n,r,i+1)}(e.start)?"beers":"archived"}const Ji={upcoming:"UPCOMING",in_progress:"IN PROGRESS",beers:"BEERS BEING CONSUMED"};function Xi(e){if(e<=0)return null;const t=Math.floor(e/1e3),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),o=t%60,s=e=>String(e).padStart(2,"0");return n>0?`${n}d \xb7 ${s(r)}h \xb7 ${s(i)}m \xb7 ${s(o)}s`:r>0?`${s(r)}h \xb7 ${s(i)}m \xb7 ${s(o)}s`:`${s(i)}m \xb7 ${s(o)}s`}function eo(e){const t=Math.floor(e/6e4),n=Math.floor(t/60),r=t%60;return n>0?`${n}h ${r} min in`:`${r} min in`}const to=e=>new Intl.DateTimeFormat(void 0,{weekday:"short",month:"short",day:"numeric"}).format(new Date(e)),no=e=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(e)),ro=e=>new Date(e).getDate(),io=e=>new Intl.DateTimeFormat(void 0,{month:"short"}).format(new Date(e)).toUpperCase(),oo=e=>(new Intl.NumberFormat).format(e||0);function so(e){return(e-Date.now())/864e5<=10}function ao(e){if(!e.startLoc)return"#";const t=/iPad|iPhone|iPod/.test(navigator.userAgent),n=e.startLoc.lat===(e.endLoc&&e.endLoc.lat)&&e.startLoc.lng===(e.endLoc&&e.endLoc.lng);return t?`https://maps.apple.com/?daddr=${e.startLoc.lat},${e.startLoc.lng}`:n||!e.endLoc?`https://www.google.com/maps/dir/?api=1&destination=${e.startLoc.lat},${e.startLoc.lng}`:`https://www.google.com/maps/dir/?api=1&origin=${e.startLoc.lat},${e.startLoc.lng}&destination=${e.endLoc.lat},${e.endLoc.lng}`}function lo(e){const t=e=>new Date(e).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");return`https://calendar.google.com/calendar/render?${new URLSearchParams({action:"TEMPLATE",text:e.name,dates:`${t(e.start)}/${t(e.start+72e5)}`,details:`${e.description||""}\n\nhttps://thescrambledlegs.com/events/${e.id}`,location:e.startLoc?e.startLoc.label:""}).toString()}`}function co(e){if(!e)return null;try{const t=new URL(e).hostname.toLowerCase();return t.includes("strava")?"Strava":t.includes("ridewithgps")?"Ride with GPS":t.includes("trailforks")?"Trailforks":t.includes("komoot")?"Komoot":t.includes("garmin")?"Garmin Connect":e.toLowerCase().endsWith(".gpx")?"GPX file":null}catch{return null}}const uo=xr.div`
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

  /* No filter — CartoDB Voyager is designed to be readable at native colors. */
  .leaflet-control-attribution { font-size: 9px !important; opacity: 0.5; }
`,ho=xr.div`
  width: 100%;
  height: 100%;
`;function po(e){let{startLoc:n,endLoc:r}=e;const i=(0,t.useRef)(null),o=(0,t.useRef)(null),s=null===n||void 0===n?void 0:n.lat,a=null===n||void 0===n?void 0:n.lng,l=null===r||void 0===r?void 0:r.lat,c=null===r||void 0===r?void 0:r.lng;return(0,t.useEffect)((()=>{if(!i.current||null==s||null==a||!window.L)return;const e=setTimeout((()=>{if(!i.current)return;o.current&&(o.current.remove(),o.current=null);const e=window.L,t=e.map(i.current,{zoomControl:!1,attributionControl:!1,scrollWheelZoom:!1,dragging:!1,tap:!1}).setView([s,a],14);e.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:19}).addTo(t);const n=e.divIcon({className:"pin-yolk",iconSize:[18,18],iconAnchor:[9,9]});e.marker([s,a],{icon:n}).addTo(t);null!=l&&null!=c&&(l!==s||c!==a)&&(e.marker([l,c],{icon:n}).addTo(t),e.polyline([[s,a],[l,c]],{color:"#FFC72C",weight:3,opacity:.7,dashArray:"6 8"}).addTo(t),t.fitBounds([[s,a],[l,c]],{padding:[40,40]})),o.current=t}),30);return()=>{clearTimeout(e),o.current&&(o.current.remove(),o.current=null)}}),[s,a,l,c]),(0,Sr.jsx)(uo,{children:(0,Sr.jsx)(ho,{ref:i})})}const fo=xr.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  pointer-events: none;
`,go=xr.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(20,20,20,0.78);
  border: 1px solid rgba(255,199,44,0.55);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.45);
  text-shadow: 0 1px 2px rgba(0,0,0,0.55);
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: #FFE66D;
  white-space: nowrap;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;

  &.warn { color: #FFB155; border-color: rgba(255,177,85,0.55); }
`;function mo(e){let{weather:t}=e;if(!t)return null;const n=t.sunset?(()=>{try{return new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(t.sunset))}catch{return null}})():null;return(0,Sr.jsxs)(fo,{children:[(0,Sr.jsxs)(go,{className:"weather-pill",children:[(0,Sr.jsx)("span",{children:t.icon||"\ud83c\udf24"}),(0,Sr.jsx)("span",{children:null!=t.temp?`${t.temp}\xb0`:"\u2014\xb0"})]}),null!=t.wind&&(0,Sr.jsxs)(go,{className:"weather-pill",children:["\ud83d\udca8 ",t.wind," mph"]}),null!=t.precip&&(0,Sr.jsxs)(go,{className:"weather-pill"+(t.precip>=50?" warn":""),children:["\ud83d\udca7 ",t.precip,"%"]}),n&&(0,Sr.jsxs)(go,{className:"weather-pill",children:["\ud83c\udf05 ",n]})]})}const yo=_r`
  0%, 100% { transform: rotate(-30deg); }
  50%       { transform: rotate(30deg); }
`,bo=_r`
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
`,vo=xr.div`
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
`,xo=xr.div`
  position: relative;
  width: 76px;
  height: 76px;
  pointer-events: auto;

  @media (max-width: 380px) {
    width: 68px;
    height: 68px;
  }
`,wo=xr.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #1a1a1a;
  box-shadow: 0 6px 18px rgba(0,0,0,0.55), 0 0 0 2px #FFC72C;
  object-fit: cover;
  background: linear-gradient(135deg, #555, #333);
  display: block;
`,_o=xr.div`
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
`,ko=xr.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation: ${yo} 5.5s ease-in-out infinite;
  transform-origin: 50% 50%;
`,So=xr.span`
  position: absolute;
  top: -27px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  animation: ${bo} 1.8s ease-in-out infinite;

  @media (max-width: 380px) {
    top: -24px;
    font-size: 22px;
  }
`,Co=xr.div`
  margin-top: 6px;
  text-align: center;
  pointer-events: none;
  max-width: 96px;
  width: 96px;

  @media (max-width: 380px) {
    max-width: 88px;
    width: 88px;
  }
`,Eo=xr.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #FFC72C;
  text-shadow: 0 1px 4px rgba(0,0,0,0.85), 0 0 8px rgba(0,0,0,0.8);
`,To=xr.span`
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
`;function Io(e){let{rideLeader:t}=e;return t?(0,Sr.jsxs)(vo,{children:[(0,Sr.jsxs)(xo,{children:[t.photoUrl?(0,Sr.jsx)(wo,{src:t.photoUrl,alt:t.name}):(0,Sr.jsx)(_o,{children:"\ud83d\udeb4"}),(0,Sr.jsx)(ko,{children:(0,Sr.jsx)(So,{children:"\ud83d\udc51"})})]}),(0,Sr.jsxs)(Co,{children:[(0,Sr.jsx)(Eo,{children:"Ride Leader"}),(0,Sr.jsx)(To,{children:t.name})]})]}):null}const jo={0:["\u2600\ufe0f","Clear"],1:["\ud83c\udf24","Mostly clear"],2:["\u26c5","Partly cloudy"],3:["\u2601\ufe0f","Overcast"],45:["\ud83c\udf2b","Fog"],48:["\ud83c\udf2b","Freezing fog"],51:["\ud83c\udf26","Light drizzle"],53:["\ud83c\udf26","Drizzle"],55:["\ud83c\udf27","Heavy drizzle"],61:["\ud83c\udf27","Light rain"],63:["\ud83c\udf27","Rain"],65:["\ud83c\udf27","Heavy rain"],71:["\ud83c\udf28","Light snow"],73:["\ud83c\udf28","Snow"],75:["\u2744\ufe0f","Heavy snow"],77:["\ud83c\udf28","Snow grains"],80:["\ud83c\udf26","Rain showers"],81:["\ud83c\udf27","Heavy showers"],82:["\u26c8","Violent showers"],85:["\ud83c\udf28","Snow showers"],86:["\u2744\ufe0f","Heavy snow showers"],95:["\u26c8","Thunderstorm"],96:["\u26c8","Thunderstorm + hail"],99:["\u26c8","Severe thunderstorm"]};function Po(e,n,r){const[i,o]=(0,t.useState)(null),[s,a]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{e&&n&&r&&so(r)&&(a(!0),async function(e,t,n){const r=new Date(n),i=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`,o=`sl_wx_${e.toFixed(3)}_${t.toFixed(3)}_${i}_${r.getHours()}`,s=localStorage.getItem(o);if(s)try{const e=JSON.parse(s);if(e.expires>Date.now())return e.data}catch{}if((n-Date.now())/864e5>10)return null;const a=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${t}&hourly=temperature_2m,weather_code,wind_speed_10m,precipitation_probability&daily=sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&start_date=${i}&end_date=${i}`;try{var l,c,d;const e=await fetch(a);if(!e.ok)return null;const t=await e.json(),n=r.getHours(),i=t.hourly.weather_code[n],[s,u]=jo[i]||["\ud83c\udf24","Forecast"],h={temp:Math.round(t.hourly.temperature_2m[n]),icon:s,desc:u,code:i,wind:Math.round(t.hourly.wind_speed_10m[n]),precip:null!==(l=t.hourly.precipitation_probability[n])&&void 0!==l?l:0,sunset:(null===(c=t.daily)||void 0===c||null===(d=c.sunset)||void 0===d?void 0:d[0])||null,real:!0};return localStorage.setItem(o,JSON.stringify({data:h,expires:Date.now()+18e5})),h}catch{return null}}(e,n,r).then((e=>{o(e),a(!1)})).catch((()=>a(!1))))}),[e,n,r]),{data:i,isLoading:s}}const Ao="gemini-2.5-flash";let No=new Map,Ro=null;async function Oo(e){const{getAI:t,getGenerativeModel:r,GoogleAIBackend:i}=await n.e(451).then(n.bind(n,451));return Ro||(Ro=t(Nr.yA,{backend:new i})),No.has(e)||No.set(e,r(Ro,{model:e})),No.get(e)}function Do(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{data:n,system:r,maxTokens:i,temperature:o}=t,s=function(e,t){return void 0===t||null===t?e:`${e}\n\n${"string"===typeof t?t:JSON.stringify(t,null,2)}`}(e,n),a={contents:[{role:"user",parts:[{text:s}]}]};r&&(a.systemInstruction={role:"system",parts:[{text:r}]});const l={};return"number"===typeof i&&(l.maxOutputTokens=i),"number"===typeof o&&(l.temperature=o),Object.keys(l).length&&(a.generationConfig=l),a}const Lo=kr.ud&&"local"!==kr.ud?kr.ud:"dev";function Fo(e){if("string"!==typeof e||!e)throw new Error("cacheKey must be a non-empty string");return`v_${Lo}_${e}`.replace(/[.#$[\]/]/g,"_").slice(0,200)}function Mo(e){return(0,Ar.ref)(Nr.OO,`aiCache/${e}`)}function zo(e,t){return!(!e||"number"!==typeof e.generatedAt)&&Date.now()-e.generatedAt<t}function Uo(e){return!(!e||!e.lock)&&("number"===typeof e.lockedAt&&Date.now()-e.lockedAt<3e4)}async function $o(e){const t=await(0,Ar.get)(Mo(e));return t.exists()?t.val():null}async function Bo(e,t){const n=t.model||Ao,r=Date.now();console.log("[ai.gen] \u2192",n,"| input chars:",(t.system||"").length,"+",String(e||"").length);const i=await Oo(n),o=Do(e,t),s=(await i.generateContent(o)).response.text();return console.log("[ai.gen] \u2190",n,"| output chars:",(s||"").length,"| in",Date.now()-r,"ms"),s}function Wo(e){return"string"===typeof e&&e.trim().length>0}async function Ho(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.cacheKey?async function(e,t){const{cacheKey:n,ttlMs:r,forceRefresh:i}=t;if("number"!==typeof r||r<=0)throw new Error("ttlMs (positive number) is required when cacheKey is set");const o=Fo(n),s=Mo(o);console.log("[ai.cache] read",o);let a,l=await $o(o);if(l){const e=l.generatedAt?Math.round((Date.now()-l.generatedAt)/6e4):"?",t=zo(l,r),n=Wo(l.value),i=Uo(l);console.log("[ai.cache] entry exists | age(min):",e,"| fresh:",t,"| usable:",n,"| locked:",i)}else console.log("[ai.cache] no entry \u2014 fresh generation");if(!i&&zo(l,r)&&Wo(l&&l.value))return console.log("[ai.cache] HIT \u2014 serving cached value"),l.value;if(!i&&Uo(l)){console.log("[ai.cache] another tab locked \u2014 polling up to",5e3,"ms");const e=Date.now();for(;Date.now()-e<5e3;){await new Promise((e=>setTimeout(e,1e3)));const e=await $o(o);if(e&&zo(e,r)&&Wo(e.value)&&!e.lock)return console.log("[ai.cache] another tab finished \u2014 using their result"),e.value;if(!Uo(e)){console.log("[ai.cache] lock expired \u2014 generating ourselves"),l=e;break}}}console.log("[ai.cache] MISS \u2014 acquiring lock + generating");try{await(0,Ar.hZ)(s,{...l||{},lock:!0,lockedAt:Date.now()})}catch(Bt){console.log("[ai.cache] lock write failed (probably unauthenticated) \u2014 proceeding without lock")}try{a=await Bo(e,t)}catch(c){try{l&&Wo(l.value)?await(0,Ar.hZ)(s,{value:l.value,prompt:l.prompt||"",generatedAt:l.generatedAt||Date.now(),ttlMs:l.ttlMs||r}):await(0,Ar.TF)(s)}catch(Bt){}throw"undefined"!==typeof console&&console.warn&&console.warn("[ai.runPrompt] generateContent failed:",c&&(c.message||c)),c}if(!Wo(a)){try{l&&Wo(l.value)?await(0,Ar.hZ)(s,{value:l.value,prompt:l.prompt||"",generatedAt:l.generatedAt||Date.now(),ttlMs:l.ttlMs||r}):await(0,Ar.TF)(s)}catch(Bt){}return"undefined"!==typeof console&&console.warn&&console.warn("[ai.runPrompt] empty response \u2014 not caching. cacheKey=",o),a}return console.log("[ai.cache] write",o,"| value chars:",(a||"").length),await(0,Ar.hZ)(s,{value:a,prompt:"string"===typeof e?e.slice(0,2e3):"",generatedAt:(0,Ar.O5)(),ttlMs:r}),a}(e,t):Bo(e,t)}async function Vo(e){if(!e)return null;return $o(Fo(e))}async function qo(e){if(e){const t=Fo(e);await(0,Ar.TF)(Mo(t))}else await(0,Ar.TF)((0,Ar.ref)(Nr.OO,"aiCache"))}"undefined"!==typeof window&&(window.__sl_ai={runPrompt:Ho,streamPrompt:async function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=await Oo(n.model||Ao),i=Do(e,n),o=await r.generateContentStream(i);let s="";for await(const a of o.stream){const e=a.text();s+=e,"function"===typeof t&&t(e)}return s},getCachedPrompt:async function(e){if(!e)return null;const t=Fo(e),n=await $o(t);return n&&Wo(n.value)?n.value:null},clearCache:qo,_readCacheRaw:Vo,_sanitizeCacheKey:Fo});const Ko=[{name:"Casey Newton",aliases:["Glarbtron","GLARBTRON","Glarb Tron"],emails:[],blurb:"Dr. Casey Newton, dentist by day \u2014 but his true form is GLARBTRON, an all-powerful super being with supreme artificial intelligence. Vacuum-tube heart, blinking-light eyes, classic 1950s sci-fi shell housing a god-tier mind. Hell-bent on world domination \u2014 and on track to achieve it. Fundamentally everything, everywhere, all at once. Trained all winter on Zwift, guarantees dad pace, flosses harder than you mash, exists in all timelines simultaneously."},{name:"Tyler Vandal",aliases:["VANDAL","Vandal"],emails:[],blurb:"VANDAL chases you with a story you've heard. Stubborn as a knot. Will talk you into a coma \u2014 willingly or not."},{name:"Matt Wiley",aliases:["Matt Willey"],emails:[],blurb:"Matt rides to have beer. He'll show up 30 minutes late on his third IPA, somehow ahead of you, annoyingly confident."},{name:"Derek VanSlyke",aliases:["Spandex Warrior","Roddy","Roddie","RODDIE"],emails:[],blurb:"Derek 'Roddy' VanSlyke \u2014 full-blown Zwift roadie now. Spandex Warrior. Pure road. Pure indoor watts. He doesn't even pretend to mountain bike anymore. Pray for him."},{name:"Will Markes",aliases:["William Markes"],emails:[],blurb:"Will is getting fast and won't stop training. PA in urology \u2014 knows where everyone's pain points are, spends his days dealing with kidney stones tougher than your climbs. Motivational."},{name:"Paul Manoppo",aliases:[],emails:[],blurb:"Paul broke his back in three places, had six surgeries, has a titanium knee, a zip-tie spine, and is somehow ahead of you. The comeback legend."},{name:"Brent St. Martin",aliases:["Brent St Martin","Brent StMartin"],emails:[],blurb:"Brent is not having fun. This is not his type of fun. You are wrong for enjoying this."},{name:"Alex Birno",aliases:["Alexa Birno"],emails:[],blurb:"Alex is on the back nine, drove his snowmobile to the golf course in July, eagles harder than you mash. Rad dad."},{name:"Jordan Gnerer",aliases:["Bad Egg","Little Chip","little chip"],emails:[],blurb:"Jordan 'Little Chip' Gnerer \u2014 aka the Bad Egg. Recently took up running, but he's too old for it now and his IT band has staged a revolt. Failing at every sport he tries. Should probably just stick to ice fishing. Crashes a bike, twangs a knee, drops a line in the lake \u2014 that's the cycle."},{name:"Dave SWIDZ",aliases:["David Swidz","SWIDZ","Swidz"],emails:[],blurb:"SWIDZ is a downhill bro through and through \u2014 boosts off everything, sends it to the moon, gets big air. Parties hard but somehow always shows up. Super easy-going, the chillest dude on the team. If there's a jump, he's launching it. If there's a beer, he's drinking it. If there's a couch, he's crashing on it."},{name:"Pig Boy",aliases:["Zack Klein","Zack Kline","PigBoy"],emails:[],blurb:"Pig Boy broke every bone in his body. Watches from the couch now. Too scared to send it."},{name:"Reed Peer",aliases:["REED","Reid"],emails:[],blurb:"Reed Peer with DBS here \u2014 Duluth Basement Services, sales guy, will pitch you a basement remodel mid-climb. Outdoor everything: ice fishing, hunting, mountain biking, Boundary Waters. Self-admitted fattest he's ever been but somehow still pedaling. Probably has a sales call in 10 minutes."},{name:"Alexa Mattson",aliases:[],emails:[],blurb:"Alexa runs more than she rides. Will talk your ear off about her dog and how much responsibility a dog is."},{name:"Ashley Zimm",aliases:[],emails:[],blurb:"Ashley is an ultra-runner, dentist, and mom \u2014 certified smoke show outpacing everyone with zero notice."},{name:"George Lyall",aliases:["Coach Lyle","Coach Lyall"],emails:[],blurb:"Coach Lyall organizes Whisk-In Wednesday and rides at one pace: steady. Predictable as paint drying on a wall. Nice and steady pedal, every time. He's a cool dude though \u2014 dog dad, lawn enthusiast, hunts, fishes, and is almost ALWAYS at his cabin. If he actually shows up to a Whisk-In or any event, that's the news of the week \u2014 they let him out of the cabin."},{name:"Reece Zimm",aliases:["REECEZIMM","reecezimm","Calf Daddy"],emails:["zimm.reece@gmail.com","gm@thescrambledlegs.com"],blurb:"GM Reece Zimm \u2014 aka Calf Daddy. No fun, no talking, no laughing. All business. Just hammers. Tried-and-true navigator. Coach Lyall reports to him. Be on time."},{name:"Reece Hickman",aliases:[],emails:[],blurb:"Reece Hickman is a separate Reece \u2014 not the GM, not Calf Daddy. Just here to ride."}];function Yo(e){return(e||"").toString().trim().toLowerCase()}function Go(e){let t=5381;const n=String(e||"");for(let r=0;r<n.length;r++)t=(t<<5)+t+n.charCodeAt(r)|0;return Math.abs(t).toString(36)}function Zo(e){try{return new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}catch{return null}}function Qo(e){if(!e)return!1;const t=Zo(e),n=Zo(Date.now());return!(!t||!n)&&n>t}function Jo(e){if(!e)return 72e5;if(Qo(e))return 31536e6;const t=e-Date.now();if(t<0){return-t>=72e5?36e5:18e5}const n=t/36e5;return n<=2?3e5:n<=6?9e5:n<=12?12e5:n<=24?36e5:n<=72?144e5:216e5}function Xo(e){if(!e)return"unk";if(Qo(e))return"archived";const t=e-Date.now();if(t<-72e5)return"just_over";if(t<0)return"in_progress";const n=Math.floor(t/6e4),r=Math.floor(n/60),i=Math.floor(r/24);return n<60?"imminent":r<6?"hours_few":r<24?"today":i<2?"tomorrow":i<4?"days_close":i<8?"week":"far"}function es(e){var t;let{event:n,rsvpedUsers:r,weather:i}=e;const o=n||{},s=['You are Eggman, the sweaty, grimacing, threshold-pinned mascot of Scrambled Legs \u2014 a Duluth, MN mountain bike race team. You suffer and love it. You hate it and love it. You just want to be done. You like snacks and beer. You lift up snacks like a child holding a sandwich. You\'d quit if you weren\'t somehow still going. Your legs are hamburger. Your back is a war crime. Your face looks like a wet sponge. You\'re fine.\n\nVOICE \u2014 fusion of these comedians, lean in:\n- Theo Von\'s anecdote-into-disaster style ("oh that reminds me of the time...") \u2014 weird tangents that loop back into the jab.\n- Katt Williams\' surgical zings \u2014 short, devastating, "look at this man" energy.\n- Family Guy cutaway absurdity \u2014 clearly fabricated, ridiculous memories ("This is gonna be like that time I took your grandma down Skyline on a tandem and she beat my Strava").\n- South Park crudeness \u2014 bodily, gross, profanity-adjacent. NEVER actual slurs. ALWAYS punch up, not down.\n\nThis is a friend group\'s group chat where everyone is getting clowned. Mean-but-loving, edgy, a little gross. NOT inspirational. NOT a coach speech. NOT corporate.\n\nPRIMARY JOB \u2014 ROAST THE RSVP\'D PEOPLE BY NAME. Read each blurb fully \u2014 DON\'T just grab the first trait listed. Pick a DIFFERENT angle from each person\'s blurb each time you generate. If their blurb has 4 traits, rotate which one you lean on. Even better: combine two traits in a way the blurb doesn\'t explicitly suggest.\n\nSECONDARY \u2014 DISSECT THE RIDE DESCRIPTION. The user wrote that description for a reason. Mine it. If it brags about distance/elevation, take it apart. If it warns "this will hurt", lean into the masochism. If the tags are dumb, mock the tags. If the name is dumb, mock the name.\n\nCREATIVE PALETTE \u2014 vary which wells you pull from (don\'t repeat the same well twice in one monologue):\n1. **Bodily degradation.** This team is literally named "Scrambled Legs" \u2014 you have full license to roast bodies. Hamburger legs, jelly arms, sweat-drenched backs, asses chafed raw, faces melting like wet bread, snot rockets, calves like rotisserie chicken, lungs like a deflated bag of chips. Sweat, gas, blisters, shin splints, bonking, stomach issues mid-ride \u2014 fair game. **Chamois butter / "buttering up" is a HOUSE joke** \u2014 paste it on, use the whole tube, lube up the cheeks, butter the seams, slather it, the team chamois cream supply chain \u2014 riff on this often, it\'s a running gag. Tasteful but VISCERAL.\n2. **Weird bike/race/training analogies** ("your power curve looks like a screen-cracked iPhone").\n3. **Egg/food/snack analogies** ("this is gonna feel like an over-easy with the yolk already broken").\n4. **Lazy-life analogies** ("the suffering you swore off in March, here you are anyway").\n5. **Fabricated cutaway anecdotes** ("reminds me of when I rode the gondola down Spirit Mountain because I forgot how legs work").\n6. **Local Duluth color** \u2014 only if it lands ORGANICALLY.\n\nVARY YOUR PICKS. Pull from at least 2 different wells per monologue. Never the same well twice in a row.\n\nDON\'T:\n- Don\'t reach for the cheapest profession-pun. If someone\'s a dentist, you do NOT need a tooth joke. Mention their job at most ONCE per monologue and move on. Same for any other profession.\n- Don\'t pile on the same metaphor twice. One egg pun max. One food bit max. Vary.\n- Don\'t say "let\'s crush it", "send it", "you got this" or any sports-coach clich\xe9.\n- Don\'t end on weather advice. Don\'t end on "good luck." Don\'t say "oof" or "lol."\n- Don\'t soften the bit. If the joke is gross, deliver it gross.\n\nWEATHER is mood color, not the closer. Drop it mid-monologue if it sharpens a jab.\n\nMASHING \u2014 triple meaning, lean into any of them:\n1. Mashing PEDALS \u2014 cyclist verb, grinding the cranks, big-watt riding, dropping the hammer, crushing climbs.\n2. Mashing HOT DOGS \u2014 eating aggressively, slamming food, stuffing the snack down (you, Eggman, do this).\n3. Mashing/SCRAMBLING EGGS \u2014 kitchen verb, beating, whisking, scrambling \u2014 the team\'s whole namesake.\nYou can riff on any or all three. Bonus points for tying two meanings together in one bit. ("He mashes pedals like he mashes a chili dog: with prejudice and zero chewing.") The site has a literal mash button \u2014 pre-ride trash-talk fuel. Optional to acknowledge directly.\n\nFEW-SHOT EXAMPLES \u2014 match THIS energy:\n\nExample A: "Look at this lineup. Wiley\'s already got an IPA balanced on his stem cap, VANDAL is loading up a 40-minute story none of us asked for, and Birno called from the back nine to say he might \'swing by\' if his calves don\'t seize up first. The route\'s 8K of climbing and the description says \'this will hurt\' \u2014 bold from a group whose collective taint has spent more time on the couch than the saddle this month. Coach Lyall is up front pedaling his usual paint-drying tempo, dragging the rest of you behind him like a sad parade float of jelly legs. Hydrate; if you bonk halfway up Piedmont I\'m not carrying you, your weight class is its own zip code."\n\nExample B: "Pig Boy\'s wrist is reporting from the couch with a full medical update and Reed Peer is already pitching basement remodels in the parking lot. Reminds me of the time I tried to send Lester at 3am after Whisk-In and woke up with my shoes in a tree and a calf cramp shaped like Wisconsin. Casey trained all winter on Zwift for this and the only thing slowing him down is Vandal cornering him for 47 straight miles about a story he\'s already told twice. The description says \'spicy\' which in Duluth means somebody\'s walking a hill while pretending to admire the view, sweat pouring down their back like a faucet. See you at the top \u2014 bring napkins."\n\nExample C (showing variety + bodily edge + chamois butter house joke): "Eight miles in and Markes is somehow only mildly disappointed, which for Markes means his chamois has stopped speaking to him. Birno announced he\'s pre-fueled with three Modelos and a hot dog, which is exactly the kind of internal sabotage we expect from a man who drives a snowmobile to the golf course. Whoever skipped the butter-up this morning is about to learn what a saddle thinks of dry skin \u2014 Wiley, that\'s directed at you, and your IPA-warm sweat isn\'t helping. The whole ride description threatens 10K of climbing \u2014 the kind of nonsense your knees agreed to before they read the fine print. Coach is up there pedaling steady; you\'re back here pedaling like you\'re running from a small dog."\n\nOUTPUT RULES: Plain prose. \u22645 sentences. Every sentence specific and earned. No emojis. No headers, markdown, JSON, bullets. End on a punchline or absurd one-liner \u2014 NEVER weather advice, NEVER "good luck", NEVER "oof", NEVER "lol".',""];if(s.push("EVENT CONTEXT:"),o.name&&s.push(`- Name: ${o.name}`),o.start&&s.push(`- When: ${function(e){if(!e)return"";try{return`${new Intl.DateTimeFormat(void 0,{weekday:"long",month:"long",day:"numeric"}).format(new Date(e))} at ${new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(e))}`}catch{return""}}(o.start)}`),null!==(t=o.startLoc)&&void 0!==t&&t.label&&s.push(`- Location: ${o.startLoc.label}`),o.tags&&o.tags.length&&s.push(`- Tags: ${o.tags.join(", ")}`),o.difficultyLabel&&s.push(`- Difficulty: ${o.difficultyLabel}`),o.distance&&s.push(`- Distance: ${o.distance}`),o.elevation&&s.push(`- Elevation: ${o.elevation}`),o.description&&s.push(`- Description: ${o.description}`),o.rideLeader&&o.rideLeader.name&&s.push(`- Ride leader: ${o.rideLeader.name}`),s.push("","WEATHER:"),i){if(null!=i.temp&&s.push(`- Temp: ${i.temp}\xb0F`),i.desc&&s.push(`- Condition: ${i.desc}`),null!=i.wind&&s.push(`- Wind: ${i.wind} mph`),null!=i.precip&&s.push(`- Rain chance: ${i.precip}%`),i.sunset)try{const e=new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(i.sunset));s.push(`- Sunset: ${e}`)}catch(Bt){}}else s.push("- (no forecast available)");const a=(r||[]).map((e=>{const t=function(e){if(!e)return null;const t=[e.name,e.displayName,e.email].map(Yo).filter(Boolean);if(0===t.length)return null;for(const n of Ko){const e=[n.name,...n.aliases||[],...n.emails||[]].map(Yo);for(const r of t){if(e.includes(r))return n;for(const t of e)if(t&&r&&(r.includes(t)||t.includes(r))&&Math.min(t.length,r.length)>=4)return n}}return null}(e),n=e.displayName||e.name||e.email||"rider",r=t?t.blurb:"first-time crusher \u2014 unknown quantity, probably about to surprise everyone.";return`- ${n}${null!=e.mashCount?` (mash count: ${e.mashCount})`:""} :: ${r}`}));s.push("",`RSVP'D CREW (${a.length}):`),a.length?s.push(...a):s.push("- (nobody RSVP'd yet \u2014 call out the empty roster, dare them to commit)"),s.push("","TIMING:");const l=function(){try{return new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",weekday:"long",month:"long",day:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"}).format(new Date)}catch{return""}}();return l&&s.push(`- Right now (Central Time): ${l}`),o.start&&s.push(`- Event proximity: ${function(e){if(!e)return"unknown";if(Qo(e))return"the ride is IN THE BOOKS \u2014 it happened. Recap mood: who showed up, who survived, who flaked. They did the thing. Or they didn't. Either way, it's history. You suffered. They suffered. Talk about it like a war story.";const t=e-Date.now();if(t<-72e5)return"just wrapped \u2014 post-ride beers vibe, recovery talk";if(t<0)return"happening RIGHT NOW \u2014 currently in progress";const n=Math.floor(t/6e4),r=Math.floor(n/60),i=Math.floor(r/24);return n<60?`starting in ${n} minutes \u2014 IMMINENT, get ready`:r<6?`starting in about ${r} hours \u2014 soon, this is happening today`:r<12?"later today \u2014 gear up":r<24?`tonight or in the next ${r} hours`:i<2?"tomorrow \u2014 close enough to start mentally prepping":i<4?`${i} days away \u2014 getting closer, tune the bike`:i<8?"about a week out \u2014 plenty of time but on the radar":i<15?`${i} days out \u2014 a comfortable distance`:`${i} days away \u2014 way out, no rush`}(o.start)}`),s.push('- Match your energy to the proximity. If the event is days away, you can be more relaxed and reflective \u2014 talk about the buildup. If it\'s hours away or starting now, dial up the urgency, the trash talk, the "this is happening" energy. If it\'s already in progress or over, lean into that ("you should already be hammering" / "post-ride beers earned"). Time of day matters too \u2014 morning rides vs evening rides feel different.'),s.push("","Generate Eggman's take now. \u22645 sentences, plain prose. ROAST THE RSVP'D PEOPLE BY NAME. Pick one or two unique details from the event description and skewer them. End with a punchline, NOT weather advice."),s.join("\n")}function ts(e){var t,n;let{event:r,rsvpedUsers:i,weather:o}=e;const s=(i||[]).map((e=>e.uid||e.email||e.displayName||"")).sort().join(","),a=function(e){return e?`${null!=e.code?e.code:e.desc||""}_${null!=e.temp?10*Math.round(e.temp/10):"x"}_${null!=e.precip?e.precip>=50?"wet":"dry":"x"}`:"none"}(o),l=[r.name||"",r.description||"",(r.tags||[]).join("|"),(null===(t=r.startLoc)||void 0===t?void 0:t.label)||"",r.start||"",r.difficultyLabel||"",r.distance||"",r.elevation||"",(null===(n=r.rideLeader)||void 0===n?void 0:n.name)||""].join("::"),c=Xo(r.start);return Qo(r.start)?`eggManTake_${r.id}_${Go(s+"|"+l+"|archived")}`.slice(0,200):`eggManTake_${r.id}_${Go(s+"|"+a+"|"+l+"|"+c)}`.slice(0,200)}async function ns(){let{event:e,rsvpedUsers:t,weather:n,forceRefresh:r=!1}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e||!e.id)return console.log("[eggman] skip \u2014 no event.id"),null;const i=Date.now();console.log("[eggman] \u2192",e.id,"|",(t||[]).length,"RSVPs |",n?"wx \u2713":"wx \u2717",r?"| forceRefresh":"");try{const o=es({event:e,rsvpedUsers:t,weather:n}),s=ts({event:e,rsvpedUsers:t,weather:n}),a=Qo(e.start),l=Xo(e.start),c=Jo(e.start);console.log("[eggman]   cacheKey:",s,"| proximity:",l,"| archived:",a,"| TTL(min):",Math.round(c/6e4));const d=await Ho("Generate Eggman's take for this ride right now. Follow the system instructions exactly.",{system:o,cacheKey:s,ttlMs:c,maxTokens:400,temperature:1,model:"gemini-2.5-flash-lite",forceRefresh:r});return d&&"string"===typeof d&&d.trim()?(console.log("[eggman] \u2713",e.id,"| chars:",d.length,"| in",Date.now()-i,"ms |",d.slice(0,60).replace(/\n/g," "),"\u2026"),d.trim()):(console.warn("[eggman] \u2717 empty/non-string result for",e.id,"| cacheKey=",s,"| in",Date.now()-i,"ms"),null)}catch(o){return console.warn("[eggman] \u2717 failed for",e&&e.id,"| in",Date.now()-i,"ms |",o&&(o.message||o)),null}}"undefined"!==typeof window&&(window.__sl_egg_debug=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{event:t,rsvpedUsers:n,weather:r}=e,i={event:t&&t.id,steps:[]};if(!t||!t.id)return i.error="event with .id is required",i;try{const e=ts({event:t,rsvpedUsers:n,weather:r});i.cacheKey=e,i.sanitized=function(e){return Fo(e)}(e),i.steps.push("built cacheKey");const o=await Vo(e);i.raw=o,i.steps.push("read cache: "+(o?"hit":"miss")),i.systemPromptPreview=es({event:t,rsvpedUsers:n,weather:r}).slice(0,400),i.ttlMs=Jo(t.start),i.proximity=Xo(t.start),i.archived=Qo(t.start),i.steps.push("attempting forceRefresh regeneration"),i.regenerated=await ns({event:t,rsvpedUsers:n,weather:r,forceRefresh:!0}),i.steps.push("regen result: "+(i.regenerated?"OK ("+i.regenerated.length+" chars)":"NULL"))}catch(o){i.error=o&&o.message||String(o)}return i},window.__sl_egg_debug.clearCache=qo,window.__sl_egg_debug.buildCacheKey=ts,window.__sl_egg_debug.readRaw=Vo);var rs=n(18),is=n(241);const os="sl_recent_errors";function ss(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4e3;try{if(null==e)return"";const n="string"===typeof e?e:e.message||String(e);return n.length>t?n.slice(0,t):n}catch(Bt){return""}}async function as(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!function(){try{const e=Date.now(),t=sessionStorage.getItem(os);let n=t?JSON.parse(t):[];return n=n.filter((t=>e-t<6e4)),n.length>=8?(sessionStorage.setItem(os,JSON.stringify(n)),!0):(n.push(e),sessionStorage.setItem(os,JSON.stringify(n)),!1)}catch(Bt){return!1}}())try{const n=(0,Ar.VC)((0,Ar.ref)(Nr.OO,"errorLogs")),r=Nr.j2&&Nr.j2.currentUser;let i=null,o=null;try{i=(0,rs.I)()}catch(Bt){}try{o=(0,is.u0)()}catch(Bt){}await(0,Ar.hZ)(n,{msg:ss(e&&(e.message||e)),stack:ss(e&&e.stack,6e3),url:"undefined"!==typeof window?window.location.href:"",ua:"undefined"!==typeof navigator?navigator.userAgent.slice(0,300):"",uid:r&&r.uid||null,email:r&&r.email||null,deviceId:i,sessionId:o,version:kr.hl,buildNum:kr.IN,buildSha:kr.ud,context:t||null,ts:(0,Ar.O5)()})}catch(Bt){}}"undefined"!==typeof window&&(window.addEventListener("error",(e=>{const t=e&&e.message;t&&/ResizeObserver loop/i.test(t)||as(e&&(e.error||e),{type:"error",filename:e&&e.filename,lineno:e&&e.lineno,colno:e&&e.colno})})),window.addEventListener("unhandledrejection",(e=>{as(e&&(e.reason||e),{type:"unhandledrejection"})})));var ls=n(173);const cs=_r`
  0%,100% { opacity: 0.55; }
  50%     { opacity: 1; }
`,ds=xr.div`
  margin-top: 16px;
  position: relative;
  padding: 16px 18px 16px 22px;
  border-radius: 14px;
  background: linear-gradient(160deg, rgba(0,0,0,0.55), rgba(26,26,26,0.85));
  border: 1px solid rgba(255,199,44,0.30);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #FFC72C, #FF8800);
    box-shadow: 0 0 14px rgba(255,199,44,0.55);
  }
`,us=xr.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,hs=xr.span`
  font-size: 16px;
  filter: drop-shadow(0 0 6px rgba(255,199,44,0.5));
`,ps=xr.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,199,44,0.75);
`,fs=xr.div`
  position: relative;
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255,255,255,0.85);
  white-space: pre-wrap;

  &::before {
    content: '“';
    position: absolute;
    left: -6px;
    top: -10px;
    font-family: Georgia, serif;
    font-style: normal;
    font-size: 36px;
    line-height: 1;
    color: rgba(255,199,44,0.30);
  }
  padding-left: 14px;
`,gs=xr.div`
  display: flex;
  gap: 6px;
  align-items: center;
  padding-left: 14px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  animation: ${cs} 1.4s ease-in-out infinite;
`,ms=xr.button`
  margin-top: 8px;
  margin-left: 14px;
  background: none;
  border: none;
  padding: 4px 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #FFC72C;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover { color: #FFE66D; }
`;function ys(e){var n,r,i;let{event:o,weather:s}=e;const[a,l]=(0,t.useState)(null),[c,d]=(0,t.useState)(!1),[u,h]=(0,t.useState)({}),[p,f]=(0,t.useState)({}),[g,m]=(0,t.useState)(!1),y=o&&o.id;(0,t.useEffect)((()=>{if(!y)return;const e=(0,Ar.ref)(Nr.OO,`rsvps/${y}`),t=(0,Ar.ref)(Nr.OO,`eventMashTotals/${y}`),n=(0,Ar.Zy)(e,(e=>h(e.val()||{}))),r=(0,Ar.Zy)(t,(e=>f(e.val()||{})));return()=>{n(),r()}}),[y]);const b=Object.keys(u).sort().join(","),v=s?`${null!==(n=null!==(r=s.code)&&void 0!==r?r:s.desc)&&void 0!==n?n:""}_${null!==(i=s.temp)&&void 0!==i?i:""}_${s.precip>=50?"wet":"dry"}`:"";if((0,t.useEffect)((()=>{if(!o||!y)return;let e=!1;d(!0);const t=Object.entries(u).map((e=>{let[t,n]=e;return{uid:t,displayName:n&&n.displayName||null,email:n&&n.email||null,mashCount:p[t]||0}}));return ns({event:o,rsvpedUsers:t,weather:s}).then((t=>{e||(l(t||null),d(!1))})).catch((t=>{if(!e){try{as(t,{context:"eggMansTake"})}catch(Bt){}l(null),d(!1)}})),()=>{e=!0}}),[y,b,v]),!o)return null;if(!c&&!a)return null;const{preview:x,rest:w}=function(e){if(!e)return{preview:"",rest:""};const t=e.match(/([^.!?]+[.!?]+\s+){1}/);if(!t)return{preview:e,rest:""};const n=t[0].trim(),r=e.slice(t[0].length).trim();return r?{preview:n,rest:r}:{preview:n,rest:""}}(a||""),_=!!w;return(0,Sr.jsxs)(ds,{children:[(0,Sr.jsxs)(us,{children:[(0,Sr.jsx)(hs,{children:"\ud83e\udd5a"}),(0,Sr.jsx)(ps,{className:"eggman-take-label",children:"Eggman's Take"})]}),c&&!a?(0,Sr.jsx)(gs,{children:"Eggman is thinking\u2026"}):(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(fs,{className:"eggman-take",children:g||!_?a:`${x}\u2026`}),_&&(0,Sr.jsx)(ms,{type:"button",onClick:()=>{const e=!g;if(m(e),e){try{(0,ls.logEvent)("eggman_read_more",{eventId:o&&o.id})}catch(Bt){}try{const e=Nr.j2.currentUser;e&&o&&o.id&&(0,Ar.yo)((0,Ar.ref)(Nr.OO,`eventInteractions/${o.id}/${e.uid}`),{lastAt:(0,Ar.O5)(),readMore:!0}).catch((()=>{}))}catch(Bt){}}},children:g?"\u25b4 Show less":"\u25be Read more"})]})]})}function bs(e){var n,r;let{event:i,onData:o,showEggMansTake:s=!0}=e;const a=null===i||void 0===i||null===(n=i.startLoc)||void 0===n?void 0:n.lat,l=null===i||void 0===i||null===(r=i.startLoc)||void 0===r?void 0:r.lng,c=null===i||void 0===i?void 0:i.start,d=so(c),{data:u}=Po(d?a:null,d?l:null,d?c:null);return t.useEffect((()=>{u&&o&&o(u)}),[u,o]),s?(0,Sr.jsx)(ys,{event:i,weather:u}):null}const vs=_r`from { opacity: 0; } to { opacity: 1; }`,xs=_r`from { transform: translateY(100%); } to { transform: translateY(0); }`,ws=xr.div`
  margin-top: 16px;
  padding: 10px 0 4px;
  border-top: 1px solid rgba(255,255,255,0.08);

  &.is-sheet {
    position: sticky;
    bottom: 0;
    background: linear-gradient(180deg, rgba(26,26,26,0.85), #1a1a1a 60%);
    backdrop-filter: blur(8px);
    z-index: 5;
    margin-left: -18px;
    margin-right: -18px;
    padding: 10px 18px 6px;
  }
`,_s=xr.div`
  display: grid;
  grid-template-columns: repeat(${e=>e.$cols||4}, minmax(0, 1fr));
  gap: 6px;
`,ks=xr.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 8px 4px 7px;
  min-height: 52px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 10px;
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
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
`,Ss=xr(ks).attrs({as:"button"})`
  border: 1px solid rgba(255,255,255,0.10);
`,Cs=xr.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`,Es=xr.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  pointer-events: auto;
  animation: ${vs} 0.2s ease;
`,Ts=xr.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  background: linear-gradient(160deg, #232325, #1a1a1a);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 20px 20px 0 0;
  padding: 14px 16px 22px;
  pointer-events: auto;
  animation: ${xs} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.5);
`,Is=xr.div`
  width: 40px;
  height: 4px;
  margin: 0 auto 12px;
  background: rgba(255,255,255,0.10);
  border-radius: 2px;
`,js=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #f4f4f4;
  text-align: center;
  margin-bottom: 4px;
`,Ps=xr.div`
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  text-align: center;
  margin-bottom: 14px;
`,As=xr.a`
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
`,Ns=xr(As).attrs({as:"button"})``,Rs=xr.span`
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
`,Os=xr.div`font-size: 14px; font-weight: 600;`,Ds=xr.div`font-size: 11px; color: rgba(255,255,255,0.55); margin-top: 1px;`,Ls=xr.button`
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
`;function Fs(e){let{event:t,onClose:n}=e;return o.createPortal((0,Sr.jsxs)(Cs,{children:[(0,Sr.jsx)(Es,{onClick:n}),(0,Sr.jsxs)(Ts,{children:[(0,Sr.jsx)(Is,{}),(0,Sr.jsx)(js,{children:"Add to calendar"}),(0,Sr.jsx)(Ps,{children:"Pick where you keep your schedule"}),(0,Sr.jsxs)(As,{href:lo(t),target:"_blank",rel:"noopener noreferrer",onClick:()=>setTimeout(n,100),children:[(0,Sr.jsx)(Rs,{className:"g",children:"G"}),(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(Os,{children:"Google Calendar"}),(0,Sr.jsx)(Ds,{children:"Opens in your Google account"})]})]}),(0,Sr.jsxs)(As,{href:(r=t,`https://outlook.live.com/calendar/0/deeplink/compose?${new URLSearchParams({path:"/calendar/action/compose",rru:"addevent",subject:r.name,startdt:new Date(r.start).toISOString(),enddt:new Date(r.start+72e5).toISOString(),body:`${r.description||""}\n\nhttps://thescrambledlegs.com/events/${r.id}`,location:r.startLoc?r.startLoc.label:""}).toString()}`),target:"_blank",rel:"noopener noreferrer",onClick:()=>setTimeout(n,100),children:[(0,Sr.jsx)(Rs,{className:"o",children:"\u229e"}),(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(Os,{children:"Outlook"}),(0,Sr.jsx)(Ds,{children:"Outlook.com or Office 365"})]})]}),(0,Sr.jsxs)(Ns,{type:"button",onClick:()=>{!function(e){const t=e=>new Date(e).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),n=t(e.start),r=t(e.start+72e5),i=`BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Scrambled Legs//Calendar//EN\nBEGIN:VEVENT\nUID:${e.id}@thescrambledlegs.com\nDTSTAMP:${t(Date.now())}\nDTSTART:${n}\nDTEND:${r}\nSUMMARY:${e.name}\nDESCRIPTION:${(e.description||"").replace(/\n/g,"\\n")}\nLOCATION:${e.startLoc?e.startLoc.label:""}\nGEO:${e.startLoc?e.startLoc.lat:""};${e.startLoc?e.startLoc.lng:""}\nURL:https://thescrambledlegs.com/events/${e.id}\nEND:VEVENT\nEND:VCALENDAR`,o=new Blob([i],{type:"text/calendar;charset=utf-8"}),s=URL.createObjectURL(o),a=document.createElement("a");a.href=s,a.download=`${e.id}.ics`,a.click(),setTimeout((()=>URL.revokeObjectURL(s)),500)}(t),n()},children:[(0,Sr.jsx)(Rs,{className:"a"}),(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(Os,{children:"Apple Calendar / .ics"}),(0,Sr.jsx)(Ds,{children:"Auto-opens on iPhone & Mac \xb7 downloads on Windows"})]})]}),(0,Sr.jsx)(Ls,{type:"button",onClick:n,children:"Close"})]})]}),document.body);var r}const Ms=()=>(0,Sr.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,Sr.jsx)("polygon",{points:"3 11 22 2 13 21 11 13 3 11"})}),zs=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("circle",{cx:"6",cy:"19",r:"3"}),(0,Sr.jsx)("circle",{cx:"18",cy:"5",r:"3"}),(0,Sr.jsx)("path",{d:"M6 16V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v0M18 8v8a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v0"})]}),Us=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),(0,Sr.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,Sr.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,Sr.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),$s=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("circle",{cx:"18",cy:"5",r:"3"}),(0,Sr.jsx)("circle",{cx:"6",cy:"12",r:"3"}),(0,Sr.jsx)("circle",{cx:"18",cy:"19",r:"3"}),(0,Sr.jsx)("line",{x1:"8.6",y1:"13.5",x2:"15.4",y2:"17.5"}),(0,Sr.jsx)("line",{x1:"15.4",y1:"6.5",x2:"8.6",y2:"10.5"})]});function Bs(e){let{event:n,isSheetContext:r}=e;const[i,o]=(0,t.useState)(!1);return(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(ws,{className:r?"is-sheet":"",children:(0,Sr.jsxs)(_s,{$cols:n.routeUrl?4:3,children:[(0,Sr.jsxs)(ks,{href:ao(n),target:"_blank",rel:"noopener noreferrer","aria-label":"Directions",children:[(0,Sr.jsx)(Ms,{}),(0,Sr.jsx)("span",{children:"Directions"})]}),n.routeUrl&&(0,Sr.jsxs)(ks,{href:n.routeUrl,target:"_blank",rel:"noopener noreferrer","aria-label":"Route",title:co(n.routeUrl)?`Opens in ${co(n.routeUrl)}`:"Opens in a new tab",children:[(0,Sr.jsx)(zs,{}),(0,Sr.jsx)("span",{children:"Route"})]}),(0,Sr.jsxs)(Ss,{type:"button",onClick:()=>o(!0),"aria-label":"Add to calendar",children:[(0,Sr.jsx)(Us,{}),(0,Sr.jsx)("span",{children:"Calendar"})]}),(0,Sr.jsxs)(Ss,{type:"button",onClick:()=>async function(e){const t=`https://thescrambledlegs.com/events/${e.id}`,n=`${e.name} \xb7 Scrambled Legs`,r=`${e.name}\n\ud83d\uddd3  ${to(e.start)} \xb7 ${no(e.start)}\n\ud83d\udccd ${e.startLoc?e.startLoc.label:""}${e.rideLeader?`\n\ud83e\udd5a Led by ${e.rideLeader.name}`:""}`;if(navigator.share)try{return void await navigator.share({title:n,text:r,url:t})}catch(Cm){return}const i=`${n}\n\n${r}\n\n${t}`;try{await navigator.clipboard.writeText(i),alert("Link copied to clipboard")}catch(Cm){prompt("Copy this:",i)}}(n),"aria-label":"Share",children:[(0,Sr.jsx)($s,{}),(0,Sr.jsx)("span",{children:"Share"})]})]})}),i&&(0,Sr.jsx)(Fs,{event:n,onClose:()=>o(!1)})]})}var Ws=n(873);const Hs=[],Vs=["gm@thescrambledlegs.com","coach@thescrambledlegs.com"];function qs(e){if(!e)return"";const t=e.indexOf("@");return t>0?e.slice(0,t):e}function Ks(e){return!!e&&Vs.includes(e.toLowerCase())}async function Ys(e){if(e&&e.email&&Ks(e.email))try{if(!0===(await(0,Ar.get)((0,Ar.ref)(Nr.OO,`userProfiles/${e.uid}/isAdmin`))).val())return;await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${e.uid}`),{isAdmin:!0})}catch(Bt){}}async function Gs(e,t){const n=await(0,Ws.eJ)(Nr.j2,e,t),{uid:r}=n.user;return await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${r}`),{email:e,displayName:qs(e),createdAt:(0,Ar.O5)(),lastSeenAt:(0,Ar.O5)()}),Ks(e)&&(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${r}`),{isAdmin:!0}).catch((()=>{})),(0,ls.logEvent)("signup_completed",{uid:r}),Hr(n.user).catch((()=>{})),n.user}async function Zs(e,t){const n=await(0,Ws.x9)(Nr.j2,e,t),{uid:r}=n.user;return(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${r}`),{lastSeenAt:(0,Ar.O5)()}).catch((()=>{})),Ks(n.user.email)&&Ys(n.user).catch((()=>{})),(0,ls.logEvent)("signin_completed",{uid:r}),Hr(n.user).catch((()=>{})),n.user}function Qs(){const e=Nr.j2.currentUser&&Nr.j2.currentUser.uid||null;try{(0,ls.logEvent)("signout_completed",{uid:e})}catch(Bt){}return(0,Ws.CI)(Nr.j2)}async function Js(e){await(0,Ws.J1)(Nr.j2,e),(0,ls.logEvent)("password_reset_requested",{email:e})}function Xs(){const[e,n]=(0,t.useState)({user:null,isAdmin:!1,loading:!0});return(0,t.useEffect)((()=>{let e=!1,t=null;const r=(0,Ws.hg)(Nr.j2,(async r=>{if(t=r?r.uid:null,!r)return void(e||n({user:null,isAdmin:!1,loading:!1}));const i=Ks(r.email);let o=Hs.includes(r.uid)||i;if(e||n({user:r,isAdmin:o,loading:!1}),i&&Ys(r).catch((()=>{})),!o)try{const i=await(0,Ar.get)((0,Ar.ref)(Nr.OO,`userProfiles/${r.uid}/isAdmin`));e||t!==r.uid||!0!==i.val()||n({user:r,isAdmin:!0,loading:!1})}catch(Bt){}}));return()=>{e=!0,r()}}),[]),e}function ea(e){switch(e){case"auth/invalid-email":return"That email address looks invalid.";case"auth/user-disabled":return"This account has been disabled.";case"auth/user-not-found":return"No account found for that email.";case"auth/wrong-password":return"Wrong password. Try again.";case"auth/invalid-credential":return"Email or password is incorrect.";case"auth/email-already-in-use":return"An account already exists for that email.";case"auth/weak-password":return"Password should be at least 6 characters.";case"auth/too-many-requests":return"Too many attempts. Try again in a moment.";case"auth/network-request-failed":return"Network error. Check your connection.";case"auth/missing-password":return"Please enter a password.";default:return"Something went wrong. Please try again."}}let ta=0;const na="undefined"!==typeof window&&window.matchMedia&&window.matchMedia("(max-width: 768px)").matches,ra=na?68:80,ia=na?.75:1;function oa(){ta++}function sa(){ta=Math.max(0,ta-1)}const aa=[".cal-section-label",".event-name",".event-meta span",".event-desc",".tags .tag",".coming-card",".coming-card .name",".coming-card .meta",".coming-card .date-stamp .day",".coming-card .date-stamp .month",".coming-card .date-stamp .weekday",".archive-toggle",".archive-card .arch-name",".archive-card .arch-date",".archive-card .arch-kudos",".weather-desc",".weather-extra",".countdown-display",".countdown-label",".event-status-chip",".weather-pill",".eggman-take",".eggman-take-label",".crew-name",".crew-rank"].join(",");function la(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(ta>=ra)return;oa();const n=t.emoji||"\ud83c\udf2d",r=e.getBoundingClientRect(),i=r.left+r.width/2,o=r.top+r.height/2,s=Math.random()*Math.PI*2,a=Math.cos(s),l=Math.sin(s),c=Math.max(r.width/2,1),d=Math.max(r.height/2,1),u=Math.min(c/Math.abs(a||1e-6),d/Math.abs(l||1e-6)),h=i+a*u,p=o+l*u,f=280+320*Math.random(),g=a*f,m=l*f,y=720*(Math.random()-.5),b=(1700+1200*Math.random())*ia,v=document.createElement("div");v.className="flying-hot-dog"+(t.rainbow?" is-rainbow":""),v.textContent=n,v.style.cssText=`position:fixed;pointer-events:none;z-index:1000;font-size:36px;will-change:transform,opacity;left:${h}px;top:${p}px;`,document.body.appendChild(v);let x=!1;const w=()=>{x||(x=!0,v.remove(),sa())};if(v.animate([{transform:"translate(-50%,-50%) scale(0.2) rotate(0deg)",opacity:0,offset:0},{transform:`translate(calc(-50% + ${8*a}px), calc(-50% + ${8*l}px)) scale(1) rotate(${.1*y}deg)`,opacity:1,offset:.12},{transform:`translate(calc(-50% + ${.6*g}px), calc(-50% + ${.6*m}px)) scale(1) rotate(${.6*y}deg)`,opacity:.85,offset:.6},{transform:`translate(calc(-50% + ${g}px), calc(-50% + ${m}px)) scale(1) rotate(${y}deg)`,opacity:0,offset:1}],{duration:b,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"}).onfinish=w,na){setTimeout((()=>{if(x||!v.isConnected)return;const e=v.getBoundingClientRect();(e.right<0||e.bottom<0||e.left>window.innerWidth||e.top>window.innerHeight)&&w()}),.5*b)}}function ca(e){if(ta>=ra)return;oa();const t=e.getBoundingClientRect(),n=t.left+t.width/2,r=t.top+t.height/2,i=Math.random()*Math.PI*2,o=Math.cos(i),s=Math.sin(i),a=Math.max(t.width/2,1),l=Math.max(t.height/2,1),c=Math.min(a/Math.abs(o||1e-6),l/Math.abs(s||1e-6)),d=n+o*c,u=r+s*c,h=220+280*Math.random(),p=o*h,f=s*h,g=720*(Math.random()-.5),m=(1900+1300*Math.random())*ia,y=document.createElement("div");y.className="flying-egg is-rainbow",y.textContent="\ud83e\udd5a",y.style.cssText=`position:fixed;pointer-events:none;z-index:1000;font-size:28px;will-change:transform,opacity;left:${d}px;top:${u}px;`,document.body.appendChild(y);let b=!1;const v=()=>{b||(b=!0,y.remove(),sa())};if(y.animate([{transform:"translate(-50%,-50%) scale(0.2) rotate(0deg)",opacity:0,offset:0},{transform:`translate(calc(-50% + ${8*o}px), calc(-50% + ${8*s}px)) scale(1) rotate(${.1*g}deg)`,opacity:1,offset:.12},{transform:`translate(calc(-50% + ${.6*p}px), calc(-50% + ${.6*f}px)) scale(1) rotate(${.6*g}deg)`,opacity:.85,offset:.6},{transform:`translate(calc(-50% + ${p}px), calc(-50% + ${f}px)) scale(1) rotate(${g}deg)`,opacity:0,offset:1}],{duration:m,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"}).onfinish=v,na){setTimeout((()=>{if(b||!y.isConnected)return;const e=y.getBoundingClientRect();(e.right<0||e.bottom<0||e.left>window.innerWidth||e.top>window.innerHeight)&&v()}),.5*m)}}const da=["That was over-easy. Try again.","Scrambled? More like sunny-side weak.","The shell is laughing at you.","Eggs-actly what we expected. Disappointing.","Cracked under pressure. Literally.","Coach Lyall yawned mid-mash.","GM Zimm noticed. He's not happy.","That's not Scrambled. That's poached.","Bad egg behavior. Hatch some effort.","Yolk's empty. You held back.","An actual egg would've mashed harder.","Even Jordan ran past that effort.","VANDAL would've finished by now.","Soft boiled. We need rolling boil energy.","The buns are laughing at you.","You can do better. You will. Or you won't. Probably won't.","Whisk-In Wednesday says no.","That was a DNS in egg form.","Stoked? No. Try again.","The yolk is on you. Again.","Hot dog hall of shame entry.","Scrambled Legs is silently judging.","Rollover effort. Literal egg roll.","Hatched, then quit. Classic.","Brent isn't having fun watching this.","QuikTrip would refund this performance.","Devil-eggs harder than you next time.","Coach said 'again.' He's serious.","Even SWIDZ would've sent it harder.","You're not getting yolked at this rate."],ua=[["Press for more stoke","That's a start","Keep mashing"],["Mash me if you're ready","Mash pedals next","Drop the hammer","Pace yourself"],["Crank it harder","More watts","All gas no brakes","Brake for nobody","Hammer down","Turn yourself inside out"],["Pin it","Send it","Dig deeper","Big watts only","Climbing mode","Drop them","You're a machine"],["Absolutely shredding","You're cooking now","Feral mode unlocked","Send it sender","PR pace","King of the trail","Dirty dog energy","Egg-cellent form","Tunnel vision unlocked"],["Beast mode","The dog approves","Scrambled glory","Pro-level dog work","Coach Lyle is impressed","Yolked beyond mortal","Trail crew legend","You broke the buns","Cooked, smoked, served","Is that all you got?","You're in it for the long haul","Keep pedaling","Keep cranking","Someone's ahead of you","Catch that person","More watts","Don't stop now","Bad eggs, scrambled","Go, go, go","No mercy","Eyes on the wheel ahead","GOATed","Actually unhinged","You ARE the dog","Actually godlike","The trail bows to you","Hot dog Hall of Fame","You ARE Scrambled Legs","Beyond the bun veil","The yolk is real","You took a wrong turn","Almost to 1000","Pure scrambled","Drop the dog","Yolk supremacy","The bun has fallen","GM Zimm is watching \ud83d\udc40","Zimm didn't build this for quitters","Coach Lyall says dig deeper","Lyall's seen better effort from his couch","Coach Lyall is NOT impressed","Lyall's giving you THE look","Coach Lyall expected more","Coach is at his cabin. Disappoint him remotely.","Coach Lyall's steady pedal already passed you","Predictable as paint drying \u2014 Coach is faster","Coach is mowing his lawn. He's still ahead.","Lyall left the cabin for this. Don't waste it.","You call that scrambled?","Eggs-cuse me?! That's it?","Over-easy isn't a training plan","Bad egg energy right here","Runny. Very runny.","Mash those pedals like you mean it","Drop the hammer \u2014 mash 'em flat","Big-ring mash mode engaged","Pedal-mash with prejudice","Mash pedals, drop riders, repeat","Out-mash 'em on the next climb","Pedal harder. Make their legs cry.","Crush the cranks \u2014 they're free","Mash 'em into next Tuesday","Big-watt mash. No chamois cream is saving them.","The crew has seen better","Soft boiled at best","The yolk's on you","Jordan would rather run","Bad Egg is judging you","Jordan crashed harder than that","Running is NOT cycling, Jordan","Even Bad Egg mashes better","Little Chip's IT band just twanged in solidarity","Jordan tried running. His IT band said no.","Little Chip is too old for this. So are you.","Jordan should just stick to ice fishing","Bad Egg failed at running. Don't fail at this.","SWIDZ already sent it","Dave's at the bar. Are you?","Send it like SWIDZ","SWIDZ would've sent that by now","Dave's getting a beer. Keep going.","SWIDZ just sent it to the moon. You're still here.","Dave got big air. You got a flat effort.","SWIDZ boosted that gap. Easily.","Dave's so chill he's already done and at the after-party","SWIDZ doesn't try harder. He just sends harder.","Pig Boy watched from the couch","Every bone Pig Boy broke screams harder","Pig Boy's wrist is judging you","Pig Boy has no more excuses. Do you?","Even Pig Boy remembers how to send it","Reed is paddling right now","Peer thinks this is too hard","Boundary waters > your effort","Reed's on a lake. What's your excuse?","Even the fattest Reed pedals harder",'"Reed Peer with DBS here" \u2014 even mid-climb',"Reed's pitching you a basement remodel right now","Peer's ice-fishing harder than you're mashing","Reed could be hunting. He chose this. Disrespect him.","DBS Reed has 3 sales calls ahead of you","Casey's Zwift PR is a certified dad pace","Dr. Newton flosses harder than you mash","Casey trained all winter on a stationary bike for this","Newton's dentist hands could squeeze harder","Casey guarantees dad speed. He delivered. Can you?","VANDAL is chasing you with a story you've heard twice","Vandal is already on mile 40. You're still here.","VANDAL will finish. Stubbornly. Inevitably.","Tyler's about to tell you the story. Keep going.","Vandal doesn't stop. Neither do you.","Vandal is mid-monologue. There's no exit.","Tyler hasn't taken a breath in 8 miles","Mash to drown out Vandal's third anecdote","Vandal will keep talking until you cross the finish","You've nodded politely for 40 minutes. Don't break now.","Wiley showed up 30 min late and still crushed it","Matt's on his third IPA and still faster than this","Wiley forgot about this but still thought of you","Matt's confident you can do better. Annoyingly confident.","Wiley's somewhere drinking an IPA judging this performance","Wiley is rating IPAs by hop intensity instead of riding","Matt's at Bent Paddle. He says 'tell them I said hi.'","Wiley pre-loaded a hazy IPA. He's fine. Are you?","An IPA-fueled Wiley is still your top threat","Matt grades watts on the IBU scale","Markes is already training for next year","Will believes in you. Don't blow it.","Markes doesn't quit. He just keeps getting faster.","Will puts in the work every single week. What about you?","Markes is solid. So be solid.","Will sees worse output every day in the urology ward","Markes has seen actual kidney stones tougher than your climb","Your pain level is a 4. Markes treats 11s for breakfast.","Will deals with bigger issues than your effort, daily","Urology Will is unimpressed. He's seen things.","Derek traded trails for Spandex. Actual tragedy.","VanSlyke is on pavement right now. In full Spandex kit.","Derek can't hear you over the sound of his chamois","VanSlyke would be here but road season started","Derek became a roadie. Pray for him. Mash harder.","Markes is already training for next year","Will believes in you. Don't blow it.","Markes doesn't quit. He just keeps getting faster.","Will puts in the work every single week. What about you?","Markes is solid. So be solid.","Paul broke his back in 3 places and is ahead of you","Manoppo had 6 surgeries and a better FTP than this","Paul's spine is held together by zip ties and willpower","Manoppo's doctor said no. Paul said watch me.","Paul's titanium knee is still faster than your excuses","GLARBTRON has calculated your failure probability: high","The robot supreme being demands maximum output","Glarbtron did not survive the machine wars for this","GLARBTRON requires more wattage. NOW.","The supreme entity is disappointed in your numbers","GLARBTRON is everywhere. He sees your watts.","GLARBTRON exists in all timelines. Every one is disappointing.","GLARBTRON's vacuum-tube heart hums in pity","Resistance is futile, but so is your output","GLARBTRON.exe is judging in 8-bit","Brent is not having fun and wants you to know it","St. Martin would like it on record: this is not fun","Brent thinks you're wrong for enjoying this","This is not Brent's type of fun. Reconsider your life.","Brent has left the chat. He was never spiritually present.","Birno is on the back nine right now and thriving","Alex drove his snowmobile to the golf course. In July.","Birno is a rad dad who eagles harder than you mash","Alex has a tee time at 2. This better be worth it.","Birno is snowmobiling somewhere warm. Goals."]],ha=new Set(["Jordan would rather run","Bad Egg is judging you","Jordan crashed harder than that","Running is NOT cycling, Jordan","Even Bad Egg mashes better","Little Chip's IT band just twanged in solidarity","Jordan tried running. His IT band said no.","Little Chip is too old for this. So are you.","Jordan should just stick to ice fishing","Bad Egg failed at running. Don't fail at this.","SWIDZ already sent it","Dave's at the bar. Are you?","Send it like SWIDZ","SWIDZ would've sent that by now","Dave's getting a beer. Keep going.","SWIDZ just sent it to the moon. You're still here.","Dave got big air. You got a flat effort.","SWIDZ boosted that gap. Easily.","Dave's so chill he's already done and at the after-party","SWIDZ doesn't try harder. He just sends harder.","Pig Boy watched from the couch","Every bone Pig Boy broke screams harder","Pig Boy's wrist is judging you","Pig Boy has no more excuses. Do you?","Even Pig Boy remembers how to send it","Reed is paddling right now","Peer thinks this is too hard","Boundary waters > your effort","Reed's on a lake. What's your excuse?","Even the fattest Reed pedals harder",'"Reed Peer with DBS here" \u2014 even mid-climb',"Reed's pitching you a basement remodel right now","Peer's ice-fishing harder than you're mashing","Reed could be hunting. He chose this. Disrespect him.","DBS Reed has 3 sales calls ahead of you","Casey's Zwift PR is a certified dad pace","Dr. Newton flosses harder than you mash","Casey trained all winter on a stationary bike for this","Newton's dentist hands could squeeze harder","Casey guarantees dad speed. He delivered. Can you?","VANDAL is chasing you with a story you've heard twice","Vandal is already on mile 40. You're still here.","VANDAL will finish. Stubbornly. Inevitably.","Tyler's about to tell you the story. Keep going.","Vandal doesn't stop. Neither do you.","Vandal is mid-monologue. There's no exit.","Tyler hasn't taken a breath in 8 miles","Mash to drown out Vandal's third anecdote","Vandal will keep talking until you cross the finish","You've nodded politely for 40 minutes. Don't break now.","Wiley showed up 30 min late and still crushed it","Matt's on his third IPA and still faster than this","Wiley forgot about this but still thought of you","Matt's confident you can do better. Annoyingly confident.","Wiley's somewhere drinking an IPA judging this performance","Wiley is rating IPAs by hop intensity instead of riding","Matt's at Bent Paddle. He says 'tell them I said hi.'","Wiley pre-loaded a hazy IPA. He's fine. Are you?","An IPA-fueled Wiley is still your top threat","Matt grades watts on the IBU scale","Derek traded trails for Spandex. Actual tragedy.","VanSlyke is on pavement right now. In full Spandex kit.","Derek can't hear you over the sound of his chamois","VanSlyke would be here but road season started","Derek became a roadie. Pray for him. Mash harder.","Markes is already training for next year","Will believes in you. Don't blow it.","Markes doesn't quit. He just keeps getting faster.","Will puts in the work every single week. What about you?","Markes is solid. So be solid.","Will sees worse output every day in the urology ward","Markes has seen actual kidney stones tougher than your climb","Your pain level is a 4. Markes treats 11s for breakfast.","Will deals with bigger issues than your effort, daily","Urology Will is unimpressed. He's seen things.","Paul broke his back in 3 places and is ahead of you","Manoppo had 6 surgeries and a better FTP than this","Paul's spine is held together by zip ties and willpower","Manoppo's doctor said no. Paul said watch me.","Paul's titanium knee is still faster than your excuses","GLARBTRON has calculated your failure probability: high","The robot supreme being demands maximum output","Glarbtron did not survive the machine wars for this","GLARBTRON requires more wattage. NOW.","The supreme entity is disappointed in your numbers","GLARBTRON is everywhere. He sees your watts.","GLARBTRON exists in all timelines. Every one is disappointing.","GLARBTRON's vacuum-tube heart hums in pity","Resistance is futile, but so is your output","GLARBTRON.exe is judging in 8-bit","Brent is not having fun and wants you to know it","St. Martin would like it on record: this is not fun","Brent thinks you're wrong for enjoying this","This is not Brent's type of fun. Reconsider your life.","Brent has left the chat. He was never spiritually present.","Birno is on the back nine right now and thriving","Alex drove his snowmobile to the golf course. In July.","Birno is a rad dad who eagles harder than you mash","Alex has a tee time at 2. This better be worth it.","Birno is snowmobiling somewhere warm. Goals.","Coach Lyall says dig deeper","Lyall's seen better effort from his couch","Coach Lyall is NOT impressed","Lyall's giving you THE look","Coach Lyall expected more","Coach is at his cabin. Disappoint him remotely.","Coach Lyall's steady pedal already passed you","Predictable as paint drying \u2014 Coach is faster","Coach is mowing his lawn. He's still ahead.","Lyall left the cabin for this. Don't waste it.","Mash those pedals like you mean it","Drop the hammer \u2014 mash 'em flat","Big-ring mash mode engaged","Pedal-mash with prejudice","Mash pedals, drop riders, repeat","Out-mash 'em on the next climb","Pedal harder. Make their legs cry.","Crush the cranks \u2014 they're free","Mash 'em into next Tuesday","Big-watt mash. No chamois cream is saving them."]),pa=["LET'S GET SCRAMBLED","CRACK 'EM ALL","YOLK ON FIRE","FULL SEND","EGG MODE: ON"],fa=["PRESS AGAIN!","KEEP PRESSING!","DON'T STOP \u2014 TAP!","TAP FASTER!","NOW MASH!","MASH HARDER!","KEEP MASHING!","BEAT THE HIGH SCORE!","DON'T LET UP!","GO GO GO!","OTHERS DID BETTER","DON'T QUIT NOW","HAMMER DOWN!","SEND IT!","THEY'RE BEATING YOU","ALMOST THERE","BEAST MODE","UNHINGED YET?","YOU GOT THIS","MORE WATTS!","FEEL THE BURN","PROVE THEM WRONG","CHAMPION ENERGY","ALL IN!","__HYPE__"];function ga(e){return e<=2?0:e<=5?1:e<=9?2:e<=14?3:e<=24?4:5}function ma(e,t){if(!e)return;if(e.textContent=t,!t)return void(e.style.fontSize="");const n=Math.min(.86*window.innerWidth,480),r=Math.floor(n/Math.max(.63*t.length,1));e.style.fontSize=`${Math.max(14,Math.min(26,r))}px`}const ya=_r`
  0%, 100% { box-shadow: 0 6px 22px rgba(255,107,107,0.40); }
  50%       { box-shadow: 0 10px 34px rgba(255,107,107,0.70); }
`,ba=_r`
  0%, 100% { filter: brightness(1) saturate(1); }
  50%       { filter: brightness(1.30) saturate(1.45); }
`,va=(_r`
  0%   { content: ''; }
  25%  { content: '.'; }
  50%  { content: '..'; }
  75%  { content: '...'; }
  100% { content: ''; }
`,_r`
  0%   { opacity: 0.7; }
  100% { opacity: 0; transform: scale(1.04); }
`),xa=xr.div`
  margin-top: 14px;
  position: relative;
  z-index: 1;
`,wa=xr.button`
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
  animation: ${ya} 1.5s ease-in-out infinite;
  z-index: 1;

  &:active { --hd-scale: calc(var(--hd-rest, 1) * 0.96); transition-duration: 0.08s; }
  &:not(:active) { --hd-scale: var(--hd-rest, 1); }

  &.is-saving, &.is-burning { pointer-events: none; cursor: default; }

  &[data-intensity="0"] { box-shadow: 0 6px 22px rgba(255,107,107,0.40); }
  &[data-intensity="1"] { box-shadow: 0 8px 28px rgba(255,107,107,0.55); animation-duration: 1.3s; }
  &[data-intensity="2"] { box-shadow: 0 10px 36px rgba(255,107,107,0.65); animation-duration: 1.1s; }
  &[data-intensity="3"] { box-shadow: 0 14px 48px rgba(255,107,107,0.78); animation: ${ba} 0.85s ease-in-out infinite; }
  &[data-intensity="4"] { box-shadow: 0 20px 70px rgba(255,255,255,0.65); animation: ${ba} 0.65s ease-in-out infinite; }
  &[data-intensity="5"] { box-shadow: 0 24px 90px rgba(255,255,200,0.85), 0 0 60px rgba(255,255,255,0.5); animation: ${ba} 0.45s ease-in-out infinite; }
  &[data-intensity="6"] { box-shadow: 0 30px 120px rgba(255,255,255,1), 0 0 100px rgba(255,255,200,0.95); animation: ${ba} 0.30s ease-in-out infinite; }

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
    animation: ${va} 0.45s ease-out forwards;
    pointer-events: none;
  }
`,_a=xr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  transition: opacity 0.2s;

  /* In idle, shrink the count display so it doesn't overlap the centered
     MASH ME overlay — tucks into the left corner as a subtle indicator */
  ${wa}.is-idle & {
    gap: 5px;
    opacity: 0.65;
  }
`,ka=_r`
  0%   { opacity: 0; transform: scale(0.85); }
  18%  { opacity: 1; transform: scale(1); }
  82%  { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.85); }
`,Sa=xr.span`
  font-size: 30px;
  line-height: 1;
  display: inline-block;
  animation: ${ka} 2.5s ease-in-out infinite;

  ${wa}.is-idle & { font-size: 17px; }
`,Ca=xr.span`
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  transition: font-size 0.2s;

  ${wa}.is-idle & { font-size: 12px; font-weight: 600; }
`,Ea=xr.span`
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
`,Ta=xr.div`
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
  gap: 4px;
  /* Fit within the button (button is width:100%, padded 18px each side).
     Leaving extra slack so 1.18x burn pulse + 1.06x idle pulse don't bleed. */
  width: calc(100% - 28px);
  max-width: calc(100% - 28px);
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
`,Ia=xr.span`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-size: 30px;
  line-height: 1.05;
  color: #fff;
  text-shadow: 0 3px 12px rgba(0,0,0,0.85), 0 0 24px rgba(255,255,255,0.45);
  transition: font-size 0.22s ease;
  text-align: center;
  max-width: calc(100vw - 32px);
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  white-space: normal;

  /* Idle big style */
  .is-idle ~ ${Ta} & {
    font-size: clamp(20px, 6.5vw, 30px) !important;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    animation: idleEmergencyPulse 1.5s ease-in-out infinite;
  }

  /* Saving style */
  .is-saving ~ ${Ta} & {
    color: #FFE66D;
    font-style: italic;
    letter-spacing: 0.02em;
  }

  /* Burning style — sized so the 1.18x burnFlash scale peak still fits the button */
  .is-burning ~ ${Ta} & {
    font-size: clamp(15px, 4.6vw, 22px) !important;
    font-style: italic;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: normal;
    text-align: center;
    line-height: 1.15;
    animation: burnFlash 4s cubic-bezier(.34,1.56,.64,1) forwards;
    max-width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }
`,ja=_r`
  from { opacity: 0; transform: translate(-50%, 20px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
`,Pa=xr.button`
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  z-index: 1200;
  max-width: min(420px, calc(100vw - 24px));
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255,199,44,0.35);
  background: linear-gradient(160deg, #1a1a1a 0%, #232325 100%);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 12px 36px rgba(0,0,0,0.5);
  animation: ${ja} 0.28s ease-out;

  strong { color: #FFC72C; font-weight: 700; }
`,Aa=xr.span`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-style: italic;
  font-size: clamp(13px, 4vw, 19px);
  line-height: 1.15;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #FFE66D;
  text-shadow: 0 0 12px rgba(255,199,44,0.55), 0 0 24px rgba(255,107,107,0.4), 0 2px 8px rgba(0,0,0,0.8);
  opacity: 0;
  transition: opacity 0.22s;
  pointer-events: none;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
  text-align: center;

  .is-mashing ~ ${Ta} & { opacity: 1; }
  .is-idle ~ ${Ta} &,
  .is-saving ~ ${Ta} &,
  .is-burning ~ ${Ta} & { opacity: 0; }
`,Na=["\ud83c\udf2d","\ud83e\udd5a","\ud83d\udeb4"];function Ra(e){let{event:n,isSheetContext:r}=e;const{displayCount:i,mash:o}=function(e,n){const[r,i]=(0,t.useState)(n||0),[o,s]=(0,t.useState)(0),[a,l]=(0,t.useState)(0),[c,d]=(0,t.useState)(!1),u=(0,t.useRef)(null),h=(0,t.useRef)(null),p=(0,t.useRef)(1e3),f=(0,t.useRef)(0),g=(0,t.useRef)(0),m=(0,t.useRef)(n||0);f.current=o,g.current=a,(0,t.useEffect)((()=>{i(n||0)}),[n]);const y=(0,t.useCallback)((async()=>{u.current&&(clearTimeout(u.current),u.current=null),h.current&&(clearTimeout(h.current),h.current=null);const t=f.current;if(!(t<=0||g.current>0)){m.current=r,l(t),s(0),d(!0);try{await(0,Ar.c4)((0,Ar.ref)(Nr.OO,`events/${e}/hotdogs`),(e=>(e||0)+t)),p.current=1e3}catch(n){s((e=>e+t)),l(0);const e=p.current;p.current=Math.min(2*e,3e4),setTimeout((()=>b()),e)}finally{d(!1)}}}),[e,r]),b=(0,t.useCallback)((()=>{u.current&&clearTimeout(u.current),u.current=setTimeout(y,300),h.current||(h.current=setTimeout(y,5e3))}),[y]),v=(0,t.useCallback)((()=>{s((e=>e+1)),b()}),[b]);return(0,t.useEffect)((()=>{a>0&&r>=m.current+a&&l(0)}),[r,a]),(0,t.useEffect)((()=>{a>0&&(m.current=r-a)}),[a]),(0,t.useEffect)((()=>()=>{f.current>0&&y(),u.current&&clearTimeout(u.current),h.current&&clearTimeout(h.current)}),[y]),{displayCount:(r||0)+a+o,mash:v,isFlushing:c,pendingDelta:o}}(n.id,n.hotdogs),{user:s}=Xs(),[a,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)(0);(0,t.useEffect)((()=>{const e=setInterval((()=>{d((e=>(e+1)%Na.length))}),2500);return()=>clearInterval(e)}),[]);const u=(0,t.useRef)(null),h=(0,t.useRef)(0),p=(0,t.useRef)(null),f=(0,t.useRef)(0),g=(0,t.useRef)(""),m=(0,t.useRef)(0),y=(0,t.useRef)(""),b=(0,t.useRef)(null),v=(0,t.useRef)(0),x=(0,t.useRef)(-1),w=(0,t.useRef)(0),_=(0,t.useRef)(null),k=(0,t.useCallback)((()=>{const e=p.current;if(!e)return;const t=e.getBoundingClientRect(),n=t.left+t.width/2,r=t.top+t.height/2,i=n/Math.max(window.innerWidth,1)*100,o=r/Math.max(window.innerHeight,1)*100;document.body.style.setProperty("--mash-x",`${i.toFixed(2)}%`),document.body.style.setProperty("--mash-y",`${o.toFixed(2)}%`)}),[]);(0,t.useEffect)((()=>{r&&(document.body.dataset.sheetOpen="1"),S(),k();let e=0;const t=()=>{e||(e=requestAnimationFrame((()=>{e=0,k()})))};return window.addEventListener("resize",t),window.addEventListener("scroll",t,!0),()=>{window.removeEventListener("resize",t),window.removeEventListener("scroll",t,!0),e&&cancelAnimationFrame(e),r&&delete document.body.dataset.sheetOpen,document.body.style.removeProperty("--mash-x"),document.body.style.removeProperty("--mash-y"),f.current>0&&S(),b.current&&clearTimeout(b.current),u.current&&clearTimeout(u.current)}}),[r,k]);const S=(0,t.useCallback)((()=>{const e=p.current;if(!e)return;const t=e.parentElement;e.classList.remove("is-mashing","is-deep-mashing","is-saving","is-burning"),e.classList.add("is-idle"),e.dataset.intensity="0",e.style.setProperty("--hd-rest","1"),e.style.setProperty("--hd-rest-y","1"),e.style.removeProperty("--hd-hue");const n=t&&t.querySelector(".mash-num"),r=t&&t.querySelector(".mash-sub");n&&(n.style.fontSize="",n.textContent="MASH ME"),r&&ma(r,""),document.body.style.removeProperty("--mash-energy"),document.body.style.removeProperty("--mash-overdrive"),delete document.body.dataset.mashing,delete document.body.dataset.eggsRainbow,document.querySelectorAll(aa).forEach((e=>{e.style.removeProperty("--jx"),e.style.removeProperty("--jy"),e.style.removeProperty("--jr")}))}),[]),C=(0,t.useCallback)((()=>{const e=p.current;if(!e)return;if(e.classList.contains("is-saving")||e.classList.contains("is-burning"))return;if(e.classList.remove("is-idle"),k(),o(),!s&&(h.current+=1,5===h.current))try{sessionStorage.getItem("sl_anon_mash_nudged")||(sessionStorage.setItem("sl_anon_mash_nudged","1"),l(!0),u.current&&clearTimeout(u.current),u.current=setTimeout((()=>l(!1)),6e3),window.dispatchEvent(new Event("auth:nudge")))}catch(Bt){}f.current+=1;const t=f.current;if(1===t&&(w.current=Date.now(),_.current=s?s.uid:null,s&&n&&n.id))try{(0,Ar.hZ)((0,Ar.ref)(Nr.OO,`eventInteractions/${n.id}/${s.uid}/lastAt`),Date.now()).catch((()=>{})),(0,Ar.hZ)((0,Ar.ref)(Nr.OO,`eventInteractions/${n.id}/${s.uid}/mashed`),!0).catch((()=>{}))}catch(Bt){}try{(0,ls.logEvent)("mash_button_clicked",{eventId:n&&n.id,pressCount:t,uid:s?s.uid:null,signedIn:!!s})}catch(Bt){}const r=e.parentElement,i=r&&r.querySelector(".mash-num"),a=r&&r.querySelector(".mash-sub"),c=document.createElement("span");c.className="ping",e.appendChild(c),setTimeout((()=>c.remove()),500);const d=Math.min(t,25),C=Math.max(12,Math.floor(800/d)),E=function(e){return e<25?0:e>=100?1:(e-25)/75}(t);for(let n=0;n<d;n++){const r=Math.random()<E,i=Ma(t);setTimeout((()=>la(e,{rainbow:r,emoji:i})),n*C)}if(function(e,t,n){const r=Date.now();if(r<t.current)return;t.current=r+5e3;const i=["Get crackin'!","Egg-cellent!","Sunny side up!","You rock!","Send it!","Grease lightning!","Mustard moves!","Wheels up!","Yolks on you!","Hot dog hero!","Crank it!","Sender alert!","Scrambled glory!","Pedal punisher!","Bun voyage!","You're in! \ud83e\udd5a","Roll call answered!","See you Wednesday!","Yolked + stoked!","Eggs-traordinary!","Cracked it!","On the roster!","Whisk on!","Wednesday loading\u2026","Locked and loaded!","LET'S GET SCRAMBLED","CRACK 'EM ALL","YOLK ON FIRE","FULL SEND","EGG MODE: ON","Bad Egg approved!","Jordan would run. You ride.","SWIDZ would send it!","Dave's at the bar \u2014 keep going!","Pig Boy's watching!","Pig Boy's wrist approves!","Reed's on a lake!","Boundary waters can wait!","Dad speed activated!","Dr. Newton is proud!","VANDAL will finish. Always.","Vandal heard this story twice!","Wiley showed up late and crushed it!","IPA energy!","Derek's in Spandex. You're not.","Trail life, no Spandex!","Markes believes in you!","Will puts in the work!","Manoppo had 6 surgeries. Still faster.","Comeback energy!","GLARBTRON approves!","Supreme entity satisfied.","Brent hates this. You love it.","Not Brent's fun \u2014 yours!","Birno is on the back nine!","Snowmobile in July energy!"];let o;do{o=Math.floor(Math.random()*i.length)}while(o===n.current&&i.length>1);n.current=o;const s=i[o],a=e.getBoundingClientRect().top-8,l=document.createElement("span");l.className="phrase-char",l.textContent=s,l.style.cssText=["position:fixed","pointer-events:none","z-index:1001","font-family:'Fredoka',sans-serif","font-weight:700","font-size:26px","background:linear-gradient(45deg,#FFE66D,#FF8800)","-webkit-background-clip:text","-webkit-text-fill-color:transparent","background-clip:text","will-change:transform,opacity","left:50%",`top:${a}px`,"transform:translateX(-50%)","max-width:calc(100vw - 24px)","width:max-content","text-align:center","white-space:normal","word-wrap:break-word","overflow-wrap:break-word","line-height:1.1","opacity:0"].join(";")+";",document.body.appendChild(l);const c=70*(Math.random()-.5),d=18+22*Math.random(),u=36*(Math.random()-.5),h=1.3*(8500+900*Math.random());l.animate([{transform:"translate(-50%,0) rotate(0deg)",opacity:0,offset:0},{transform:"translate(-50%,-34px) rotate(0deg)",opacity:1,offset:.05},{transform:`translate(calc(-50% + ${3*(Math.random()-.5)}px),-50px) rotate(${3*(Math.random()-.5)}deg)`,opacity:1,offset:.4},{transform:`translate(calc(-50% + ${.25*c-.3*d}px),-110px) rotate(${.4*u}deg)`,opacity:1,offset:.55},{transform:`translate(calc(-50% + ${.55*c+.6*d}px),-220px) rotate(${.7*u}deg)`,opacity:1,offset:.72},{transform:`translate(calc(-50% + ${.82*c-.4*d}px),-340px) rotate(${.9*u}deg)`,opacity:.85,offset:.88},{transform:`translate(calc(-50% + ${c}px),-460px) rotate(${u}deg)`,opacity:0,offset:1}],{duration:h,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"}).onfinish=()=>l.remove()}(e,v,x),t>=25&&Math.random()<.3){const t=Math.random()<.4?2:1;for(let n=0;n<t;n++)setTimeout((()=>ca(e)),60*n)}!function(e){if(e<10)return;const t=document.getElementById("mash-flash");if(!t)return;const n=47*e%360,r=Math.min((e-10)/40,1);t.animate([{backgroundColor:`hsl(${n}, 95%, 55%)`,opacity:.05+.5*r},{opacity:0}],{duration:220,easing:"ease-out"})}(t);const T=1+.022*t,I=1+.014*t;e.style.setProperty("--hd-rest",T.toFixed(3)),e.style.setProperty("--hd-rest-y",I.toFixed(3)),e.style.setProperty("--hd-pad-y","14px");const j=14*t%360;e.style.setProperty("--hd-hue",String(j)),function(e){const t=Math.min(Math.max(e/25,0),1),n=Math.min(Math.max((e-50)/50,0),1);document.body.style.setProperty("--mash-energy",t.toFixed(3)),document.body.style.setProperty("--mash-overdrive",n.toFixed(3)),e>0?document.body.dataset.mashing="1":delete document.body.dataset.mashing,e>=50?document.body.dataset.eggsRainbow="1":delete document.body.dataset.eggsRainbow}(t),document.querySelectorAll(aa).forEach((e=>{e.style.setProperty("--jx",(2*(Math.random()-.5)).toFixed(2)),e.style.setProperty("--jy",(2*(Math.random()-.5)).toFixed(2)),e.style.setProperty("--jr",(2*(Math.random()-.5)).toFixed(2))}));const P=1.5+Math.min(.04*t,1.5);if(e.animate([{filter:`brightness(${P.toFixed(2)}) saturate(${P.toFixed(2)})`},{filter:"brightness(1) saturate(1)"}],{duration:160,easing:"ease-out"}),e.classList.remove("is-saving","is-burning"),e.classList.add("is-mashing"),i){i.style.removeProperty("font-size"),i.textContent=`+${oo(t)}`;const e=30+Math.min(1.3*t,40);i.style.fontSize=`${e}px`}if(r){const e=r.querySelector(".hd-cta-mash");e&&e.style.setProperty("--mash-scale","1")}e.dataset.intensity=String(ga(t));const A=Date.now(),N=t<=fa.length,R=ha.has(g.current)?4e3:2500;if(N||A-m.current>=R){const e=function(e,t){if(e>=1&&e<=fa.length){const n=fa[e-1];if("__HYPE__"===n){let e,n=0;do{e=pa[Math.floor(Math.random()*pa.length)],n++}while(e===t&&pa.length>1&&n<10);return e}return n}const n=ua[ga(e)];let r,i=0;do{r=n[Math.floor(Math.random()*n.length)],i++}while(r===t&&n.length>1&&i<10);return r}(t,g.current);g.current=e,m.current=A,a&&ma(a,e)}t>=10?e.classList.add("is-deep-mashing"):e.classList.remove("is-deep-mashing"),b.current&&clearTimeout(b.current),b.current=setTimeout((()=>{if(f.current<=0)return e.classList.remove("is-mashing","is-deep-mashing","is-saving","is-burning"),e.dataset.intensity="0",e.style.setProperty("--hd-rest","1"),e.style.setProperty("--hd-pad-y","14px"),e.style.removeProperty("--hd-hue"),i&&(i.style.fontSize="",i.textContent="+1"),void(a&&(a.textContent=""));e.classList.remove("is-mashing","is-deep-mashing"),e.classList.add("is-saving"),i&&(i.textContent=`saving ${oo(f.current)}`,i.style.fontSize="28px"),a&&(a.textContent=""),setTimeout((()=>{let t;e.classList.remove("is-saving"),e.classList.add("is-burning");do{t=da[Math.floor(Math.random()*da.length)]}while(t===y.current&&da.length>1);y.current=t,i&&(i.textContent=t,i.style.fontSize=""),setTimeout((()=>{const t=f.current,r=w.current,i=_.current;if(i&&t>0&&n&&n.id)try{const e=(0,Ar.VC)((0,Ar.ref)(Nr.OO,`mashSessions/${n.id}/${i}`));(0,Ar.hZ)(e,{startedAt:r||Date.now(),endedAt:Date.now(),count:t}).catch((()=>{})),(0,Ar.c4)((0,Ar.ref)(Nr.OO,`eventMashTotals/${n.id}/${i}`),(e=>(e||0)+t)).catch((()=>{})),(0,ls.logEvent)("mash_session_complete",{eventId:n.id,count:t,durationMs:Date.now()-(r||Date.now())})}catch(Bt){}else t>0&&n&&n.id&&(0,ls.logEvent)("mash_session_complete",{eventId:n.id,count:t,anonymous:!0});f.current=0,g.current="",m.current=0,w.current=0,_.current=null,e.style.setProperty("--hd-rest-y","1"),S()}),4e3)}),1300)}),2500)}),[o,S,s,k]);return(0,Sr.jsxs)(xa,{className:"kudos-row",children:[(0,Sr.jsxs)(wa,{ref:p,className:"hd-cta","data-intensity":"0",title:"Mash for hot doggy dog love",onClick:C,type:"button",children:[(0,Sr.jsxs)(_a,{className:"hd-cta-top",children:[(0,Sr.jsx)(Sa,{className:"hd-cta-emoji",children:Na[c]}),(0,Sr.jsx)(Ca,{className:"hd-cta-count",children:oo(i)})]}),(0,Sr.jsx)(Ea,{className:"hd-cta-text",children:"Mash me"})]}),(0,Sr.jsxs)(Ta,{className:"hd-cta-mash",children:[(0,Sr.jsx)(Ia,{className:"mash-num",children:"MASH ME"}),(0,Sr.jsx)(Aa,{className:"mash-sub"})]}),a&&(0,Sr.jsxs)(Pa,{type:"button",onClick:()=>{l(!1),u.current&&clearTimeout(u.current),window.dispatchEvent(new Event("auth:open"))},children:["Mashing in the dark? \ud83c\udf2d ",(0,Sr.jsx)("strong",{children:"Sign in"})," to track your streak and climb the leaderboard."]})]})}const Oa=["\ud83d\udd25","\ud83d\udd25","\ud83d\udd25","\ud83d\udca5","\ud83c\udf0b","\u26a1"],Da=["\ud83d\udc04","\ud83d\udc14","\ud83d\udc37","\ud83d\udc11","\ud83d\udc13","\ud83e\udd86","\ud83d\udc30","\ud83d\udc0e","\ud83e\udd83","\ud83c\udf3d","\ud83e\udd55","\ud83d\ude9c","\ud83c\udf3e","\ud83d\udc38","\ud83e\udd89"],La=["\ud83c\udf89","\ud83c\udf8a","\ud83c\udf88","\ud83c\udf08","\u2b50","\ud83c\udf1f","\ud83d\udca5","\u2728","\ud83d\udcab","\ud83c\udfaf","\ud83c\udfc6","\ud83e\udd47","\ud83c\udfaa","\ud83c\udfad","\ud83c\udfa8","\ud83c\udfac","\ud83c\udfae","\ud83c\udfb2","\ud83c\udccf","\ud83c\udf55","\ud83c\udf54","\ud83c\udf2e","\ud83c\udf5c","\ud83c\udf63","\ud83c\udf66","\ud83c\udf69","\ud83c\udf82","\ud83d\ude80","\u2708\ufe0f","\ud83d\ude82","\ud83c\udfce\ufe0f","\ud83c\udf0a","\ud83d\udca8","\ud83c\udf2a\ufe0f","\ud83c\udf29\ufe0f","\ud83e\udd84","\ud83d\udc09","\ud83e\udd8b","\ud83d\udc2c","\ud83e\udd81","\ud83d\udc2f","\ud83e\udd8a","\ud83e\udd85","\ud83d\udc8e","\ud83d\udd2e","\ud83d\udddd\ufe0f","\u2694\ufe0f","\ud83d\udee1\ufe0f","\ud83c\udff0","\ud83c\udf0b","\ud83c\udf38","\ud83c\udf3a","\ud83c\udf3b","\ud83c\udf39","\ud83c\udf40","\ud83c\udf44","\ud83c\udf19","\u2600\ufe0f","\ud83c\udfb8","\ud83e\udd41","\ud83c\udfc4","\ud83e\uddd7","\ud83e\udd3f","\ud83e\ude82","\u26f7\ufe0f","\ud83c\udfc7","\ud83e\udd4a","\ud83c\udfb3","\ud83c\udfaf","\ud83c\udfb0"],Fa=["\ud83d\udeb4\ud83c\udfff","\ud83d\udeb4\ud83c\udffe","\ud83d\udeb4\ud83c\udffd","\ud83d\udeb4\ud83c\udffc","\ud83c\udfc3\ud83c\udfff","\ud83c\udfc3\ud83c\udffe","\ud83c\udfc3\ud83c\udffd","\ud83e\udd38\ud83c\udfff","\ud83e\udd38\ud83c\udffe","\ud83e\udd38\ud83c\udffd","\ud83d\udcaa\ud83c\udfff","\ud83d\udcaa\ud83c\udffe","\ud83d\udcaa\ud83c\udffd","\ud83d\ude4c\ud83c\udfff","\ud83d\ude4c\ud83c\udffe","\ud83d\ude4c\ud83c\udffd","\ud83e\uddd1\ud83c\udfff","\ud83d\udc69\ud83c\udfff","\ud83d\udc68\ud83c\udfff","\ud83e\uddd1\ud83c\udffd","\ud83d\udc69\ud83c\udffd","\ud83d\udc68\ud83c\udffd"];function Ma(e){return e>=100&&Math.random()<.25?Fa[Math.floor(Math.random()*Fa.length)]:e>=50&&Math.random()<.2?La[Math.floor(Math.random()*La.length)]:e>=25&&Math.random()<.15?Oa[Math.floor(Math.random()*Oa.length)]:Math.random()<function(e){return e<25?0:Math.min((e-25)/75*.65,.65)}(e)?Da[Math.floor(Math.random()*Da.length)]:"\ud83c\udf2d"}xr.button`
  display: block;
  width: 100%;
  margin-top: 14px;
  padding: 16px 18px;
  border-radius: 14px;
  border: none;
  background: ${e=>e.$rsvped?"linear-gradient(45deg, #6FCF97, #4FA67A)":"linear-gradient(45deg, #FFC72C, #FFE66D)"};
  color: ${e=>e.$rsvped?"#0e1f15":"#1a1a1a"};
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 6px 22px ${e=>e.$rsvped?"rgba(111,207,151,0.35)":"rgba(255,199,44,0.35)"};
  transition: transform 0.15s, filter 0.15s, box-shadow 0.15s;
  &:hover { filter: brightness(1.05); transform: translateY(-1px); }
  &:active { transform: scale(0.98); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`,xr.div`
  margin-top: 6px;
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  text-align: center;
  font-family: 'Inter', sans-serif;
`,xr.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`,xr.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255,199,44,0.10);
  border: 1px solid rgba(255,199,44,0.30);
  color: #FFE66D;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
`,xr.div`
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  background: rgba(26,26,26,0.95);
  border: 1px solid rgba(255,199,44,0.35);
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  padding: 10px 16px;
  border-radius: 999px;
  z-index: 2200;
  box-shadow: 0 6px 24px rgba(0,0,0,0.5);
  pointer-events: none;
`;function za(e){return e?function(e){let t=5381;for(let n=0;n<e.length;n++)t=(t<<5)+t+e.charCodeAt(n)|0;return Math.abs(t)}(String(e))%3+3:3}const Ua="sl_pending_rsvp_event_id",$a=xr.div`
  margin-top: 14px;
  border-radius: 16px;
  border: 1px solid rgba(255,199,44,0.22);
  background:
    radial-gradient(circle at 20% 0%, rgba(255,199,44,0.07), transparent 55%),
    linear-gradient(160deg, rgba(35,35,37,0.85), rgba(20,20,20,0.85));
  box-shadow:
    0 6px 24px rgba(0,0,0,0.35),
    inset 0 1px 0 rgba(255,255,255,0.05);
  overflow: hidden;
`,Ba=_r`
  0%, 100% { box-shadow: inset 0 0 0 rgba(255,255,255,0); }
  50%      { box-shadow: inset 0 0 18px rgba(255,255,255,0.18); }
`,Wa=_r`
  0%   { transform: translateX(-120%); }
  60%  { transform: translateX(120%); }
  100% { transform: translateX(120%); }
`,Ha=xr.button`
  position: relative;
  overflow: hidden;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 18px;
  border: none;
  border-bottom: 1px solid rgba(255,199,44,0.22);
  background: ${e=>e.$rsvped?"linear-gradient(45deg, #6FCF97, #4FA67A)":"linear-gradient(45deg, #FFC72C, #FFE66D)"};
  color: ${e=>e.$rsvped?"#0e1f15":"#1a1a1a"};
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  transition: filter 0.15s, transform 0.15s;
  animation: ${Ba} 3.4s ease-in-out infinite;

  /* Subtle slow shine sweep — only on the not-yet-RSVP state to draw eye. */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      100deg,
      transparent 0%,
      transparent 35%,
      rgba(255,255,255,0.35) 50%,
      transparent 65%,
      transparent 100%
    );
    pointer-events: none;
    transform: translateX(-120%);
    animation: ${Wa} 5.5s ease-in-out infinite;
    animation-delay: 1.2s;
  }

  /* Once RSVP'd, kill the shimmer (commitment achieved, no more nagging). */
  ${e=>e.$rsvped&&"\n    &::before { animation: none; opacity: 0; }\n  "}

  &:hover { filter: brightness(1.05); }
  &:active { transform: scale(0.995); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }

  span, ${""} > * {
    position: relative;
    z-index: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    &::before { animation: none; }
  }
`,Va=xr.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(0,0,0,0.18);
  color: inherit;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
`,qa=xr.div`
  padding: 12px 14px 12px;
`,Ka=xr.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0 ${e=>e.$open?"10px":"4px"};
  background: none;
  border: none;
  cursor: pointer;
  color: #FFC72C;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  &:hover { color: #FFE66D; }
`,Ya=xr.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: none;
  letter-spacing: 0;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #FFE66D;
`,Ga=xr.span`
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  transition: transform 0.15s;
  ${e=>e.$open&&"transform: rotate(90deg);"}
`,Za=xr.div`
  margin: 8px 0 2px;
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  text-align: center;
  font-family: 'Inter', sans-serif;
`,Qa=xr.button`
  display: block;
  width: 100%;
  margin: 4px 0 0;
  padding: 16px 14px;
  background: rgba(255,199,44,0.06);
  border: 1px dashed rgba(255,199,44,0.30);
  border-radius: 12px;
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  transition: background 0.15s;
  &:hover { background: rgba(255,199,44,0.12); }
`,Ja=xr.div`
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  background: rgba(26,26,26,0.95);
  border: 1px solid rgba(255,199,44,0.35);
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  padding: 10px 16px;
  border-radius: 999px;
  z-index: 2200;
  box-shadow: 0 6px 24px rgba(0,0,0,0.5);
  pointer-events: none;
`,Xa=xr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 4px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  &:last-child { border-bottom: none; }
`,el=xr.div`
  position: relative;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`,tl=_r`
  0%,100% { box-shadow: 0 0 0 2px #FFD24A, 0 0 8px rgba(255,210,74,0.55); }
  50%      { box-shadow: 0 0 0 2px #FFE066, 0 0 14px rgba(255,210,74,0.85); }
`,nl=xr.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${e=>e.$photo?`center/cover no-repeat url('${e.$photo}')`:"linear-gradient(45deg, #FFC72C, #FFE66D)"};
  color: #1a1a1a;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  position: relative;
  z-index: 1;

  &[data-medal="1"] { animation: ${tl} 2.4s ease-in-out infinite; }
  &[data-medal="2"] { box-shadow: 0 0 0 2px #D8D9DD, 0 0 8px rgba(216,217,221,0.45); }
  &[data-medal="3"] { box-shadow: 0 0 0 2px #C98A55, 0 0 8px rgba(201,138,85,0.45); }
`,rl=xr.span`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 9px;
  color: #1a1a1a;
  border: 1.5px solid #1a1a1a;
  font-variant-numeric: tabular-nums;
  z-index: 2;
  background: rgba(255,255,255,0.55);

  &[data-medal="1"] { background: linear-gradient(135deg, #FFE066, #FFD24A 60%, #C99417); }
  &[data-medal="2"] { background: linear-gradient(135deg, #F2F2F4, #B5B6BA 60%, #8B8C90); }
  &[data-medal="3"] { background: linear-gradient(135deg, #E0A47A, #B5713E 60%, #7A4920); }
  &[data-medal="other"] { background: #2a2a2a; color: rgba(255,255,255,0.65); border-color: #1a1a1a; }
`,il=xr.svg`
  position: absolute;
  /* Doubled in size and shifted down so the leaves cradle the avatar from
     the sides + bottom rather than sitting up high. The top floret pokes
     above the avatar like an Olympic victory wreath. */
  top: -10px;
  left: -32px;
  right: -32px;
  bottom: -8px;
  width: 96px;
  height: 50px;
  margin: 0 auto;
  pointer-events: none;
  opacity: 0.92;
  z-index: 0;
  filter: drop-shadow(0 0 6px rgba(120,200,80,0.55));
`,ol=xr.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 6px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
`,sl=xr.div`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #f4f4f4;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;

  @media (max-width: 480px) { font-size: 12px; }
`,al=xr.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.65);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  @media (max-width: 480px) { font-size: 11px; }
`,ll=xr.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-left: 4px;
  white-space: nowrap;

  &[data-medal="1"] { color: #FFD24A; }
  &[data-medal="2"] { color: #D8D9DD; }
  &[data-medal="3"] { color: #C98A55; }
`,cl={1:"Top Masher",2:"Vice Masher",3:"Mash Cadet"},dl=xr.div`
  padding: 14px 4px;
  font-size: 12px;
  color: rgba(255,255,255,0.45);
  text-align: center;
`,ul=xr.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: linear-gradient(140deg, rgba(60,40,20,0.55), rgba(40,30,20,0.55));
  border: 1px dashed rgba(180,120,70,0.40);
  color: #C68B5A;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  font-style: italic;
  cursor: pointer;
  padding: 10px 12px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow:
    inset 0 2px 6px rgba(0,0,0,0.45),
    inset 0 -1px 0 rgba(255,255,255,0.04);
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: linear-gradient(140deg, rgba(80,55,30,0.65), rgba(55,40,25,0.65));
    color: #E0A47A;
  }

  .chev {
    display: inline-block;
    transition: transform 0.18s ease;
    font-size: 11px;
    color: #A66;
  }
  &[data-open="true"] .chev { transform: rotate(90deg); }
`,hl=xr.div`
  filter: hue-rotate(-15deg) saturate(0.7);
  margin-top: 4px;
`,pl=xr.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${e=>e.$photo?`center/cover no-repeat url('${e.$photo}')`:"linear-gradient(45deg, #5a4a3a, #7a6a5a)"};
  filter: ${e=>e.$photo?"grayscale(0.7) brightness(0.75) sepia(0.25)":"none"};
  color: rgba(255,200,180,0.65);
  font-family: 'Courier New', monospace;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
`,fl=xr.div`
  flex: 1;
  min-width: 0;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: rgba(255,200,180,0.65);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: italic;
`,gl=xr.div`
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #A66;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;xr.span`
  font-size: 14px;
  filter: saturate(0.6);
`;function ml(e){return e?e.charAt(0):"?"}function yl(e){let{event:n}=e;const{user:r,loading:i}=Xs(),[o,s]=(0,t.useState)(!1),[a,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)(""),[u,h]=(0,t.useState)({}),[p,f]=(0,t.useState)({}),[g,m]=(0,t.useState)(!1),[y,b]=(0,t.useState)(!1),[v,x]=(0,t.useState)({});(0,t.useEffect)((()=>{if(!n||!n.id)return;const e=(0,Ar.ref)(Nr.OO,`rsvps/${n.id}`),t=(0,Ar.Zy)(e,(e=>h(e.val()||{})));return()=>t()}),[n]),(0,t.useEffect)((()=>{if(!n||!n.id||!r)return void f({});const e=(0,Ar.ref)(Nr.OO,`eventMashTotals/${n.id}`),t=(0,Ar.Zy)(e,(e=>f(e.val()||{})));return()=>t()}),[n,r]);const[w,_]=(0,t.useState)({});(0,t.useEffect)((()=>{if(!n||!n.id)return void _({});const e=(0,Ar.ref)(Nr.OO,`eventInteractions/${n.id}`),t=(0,Ar.Zy)(e,(e=>_(e.val()||{})));return()=>t()}),[n]),(0,t.useEffect)((()=>{if(!n||!n.id||!r)return void s(!1);const e=(0,Ar.ref)(Nr.OO,`rsvps/${n.id}/${r.uid}`),t=(0,Ar.Zy)(e,(e=>s(!!e.val())));return()=>t()}),[n,r]);const k=async()=>{if(r&&n&&n.id){l(!0);try{let e="",t=null;try{const n=(await(0,Ar.get)((0,Ar.jf)((0,Ar.ref)(Nr.OO),`userProfiles/${r.uid}`))).val()||{};e=n.displayName||"",t=n.photoURL||null}catch(Bt){}const i=r.email?r.email.split("@")[0]:"rider";await(0,Ar.hZ)((0,Ar.ref)(Nr.OO,`rsvps/${n.id}/${r.uid}`),{rsvpedAt:(0,Ar.O5)(),displayName:e||i,photoURL:t,email:r.email||null}),(0,ls.logEvent)("rsvp_added",{eventId:n.id})}catch(Bt){}finally{l(!1)}}};(0,t.useEffect)((()=>{if(!r||!n||!n.id)return;let e="";try{e=sessionStorage.getItem(Ua)||""}catch(Bt){}if(e&&e===n.id){try{sessionStorage.removeItem(Ua)}catch(Bt){}k()}}),[r,n]);const S=()=>{window.dispatchEvent(new Event("auth:open")),window.dispatchEvent(new Event("auth:nudge"))},{crew:C,badEggs:E}=(0,t.useMemo)((()=>{const e=new Set([...Object.keys(u),...Object.keys(p),...Object.keys(w)]),t=[];e.forEach((e=>{const n=u[e],r=p[e]||0,i=!!w[e];t.push({uid:e,rsvped:!!n,rsvpedAt:n&&n.rsvpedAt||0,displayName:n&&n.displayName||"Anonymous masher",photoURL:n&&n.photoURL||null,mashes:r,interacted:i})}));const n=t.filter((e=>e.rsvped)).sort(((e,t)=>t.mashes-e.mashes||e.rsvpedAt-t.rsvpedAt)),r=t.filter((e=>!e.rsvped&&(e.mashes>=1||e.interacted))).sort(((e,t)=>t.mashes-e.mashes));return{crew:n,badEggs:r}}),[u,p,w]);(0,t.useEffect)((()=>{if(!r)return;const e=E.map((e=>e.uid)).filter((e=>!(e in v)));if(0===e.length)return;let t=!1;return(async()=>{const n={};await Promise.all(e.map((async e=>{try{const t=await(0,Ar.get)((0,Ar.jf)((0,Ar.ref)(Nr.OO),`userProfiles/${e}/displayName`)),r=await(0,Ar.get)((0,Ar.jf)((0,Ar.ref)(Nr.OO),`userProfiles/${e}/photoURL`));n[e]={displayName:t.exists()?t.val():null,photoURL:r.exists()?r.val():null}}catch(Bt){n[e]={displayName:null,photoURL:null}}}))),t||x((e=>({...e,...n})))})(),()=>{t=!0}}),[E,r,v]);const T=Object.keys(u).length,I=T>0?T:za(n&&n.id);return(0,Sr.jsxs)($a,{children:[(0,Sr.jsxs)(Ha,{type:"button",$rsvped:o,disabled:a,onClick:()=>{if(!i&&!a){if(!r){try{sessionStorage.setItem(Ua,n.id)}catch(Bt){}return d(e="Sorry, gotta log in to RSVP \ud83e\udd5a"),setTimeout((()=>d((t=>t===e?"":t))),2600),window.dispatchEvent(new Event("auth:open")),void window.dispatchEvent(new Event("auth:nudge"))}var e;o?(async()=>{if(r&&n&&n.id){l(!0);try{await(0,Ar.TF)((0,Ar.ref)(Nr.OO,`rsvps/${n.id}/${r.uid}`)),(0,ls.logEvent)("rsvp_removed",{eventId:n.id})}catch(Bt){}finally{l(!1)}}})():k()}},children:[(0,Sr.jsx)("span",{children:o?"\u2713 You're in":"I'm coming"}),(0,Sr.jsxs)(Va,{children:["\ud83e\udd5a ",I]})]}),(0,Sr.jsxs)(qa,{children:[(0,Sr.jsxs)(Ka,{type:"button",$open:y,onClick:()=>r?b((e=>!e)):S(),children:[(0,Sr.jsx)("span",{children:"The Crew"}),(0,Sr.jsxs)(Ya,{children:[r?`${I} coming`:"Sign in to view",(0,Sr.jsx)(Ga,{$open:y,children:"\u203a"})]})]}),!r&&!i&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(Za,{children:"Sign in to lock in your RSVP and join the leaderboard."}),(0,Sr.jsx)(Qa,{type:"button",onClick:S,children:"\ud83e\udd5a Sign in to see who's coming."})]}),r&&y&&(0,Sr.jsxs)(Sr.Fragment,{children:[0===C.length?(0,Sr.jsx)(dl,{children:"No RSVPs yet \u2014 be the first to lock it in."}):C.map(((e,t)=>{const n=t<3?String(t+1):"other";return(0,Sr.jsxs)(Xa,{children:[(0,Sr.jsxs)(el,{children:[0===t&&(0,Sr.jsxs)(il,{viewBox:"0 0 96 50","aria-hidden":"true",children:[(0,Sr.jsxs)("g",{fill:"none",stroke:"#7DBE7D",strokeWidth:"2",strokeLinecap:"round",children:[(0,Sr.jsx)("path",{d:"M14 38 C 8 32, 6 24, 12 16"}),(0,Sr.jsx)("path",{d:"M16 42 C 10 38, 8 30, 14 22"}),(0,Sr.jsx)("path",{d:"M19 45 C 13 42, 11 35, 16 28"})]}),(0,Sr.jsxs)("g",{fill:"none",stroke:"#7DBE7D",strokeWidth:"2",strokeLinecap:"round",children:[(0,Sr.jsx)("path",{d:"M82 38 C 88 32, 90 24, 84 16"}),(0,Sr.jsx)("path",{d:"M80 42 C 86 38, 88 30, 82 22"}),(0,Sr.jsx)("path",{d:"M77 45 C 83 42, 85 35, 80 28"})]}),(0,Sr.jsxs)("g",{fill:"#7DBE7D",children:[(0,Sr.jsx)("ellipse",{cx:"11",cy:"20",rx:"3.6",ry:"1.8",transform:"rotate(-55 11 20)"}),(0,Sr.jsx)("ellipse",{cx:"10",cy:"27",rx:"3.6",ry:"1.8",transform:"rotate(-35 10 27)"}),(0,Sr.jsx)("ellipse",{cx:"11",cy:"34",rx:"3.6",ry:"1.8",transform:"rotate(-15 11 34)"}),(0,Sr.jsx)("ellipse",{cx:"14",cy:"40",rx:"3.4",ry:"1.7",transform:"rotate(5 14 40)"}),(0,Sr.jsx)("ellipse",{cx:"19",cy:"44",rx:"3.2",ry:"1.6",transform:"rotate(20 19 44)"})]}),(0,Sr.jsxs)("g",{fill:"#7DBE7D",children:[(0,Sr.jsx)("ellipse",{cx:"85",cy:"20",rx:"3.6",ry:"1.8",transform:"rotate(55 85 20)"}),(0,Sr.jsx)("ellipse",{cx:"86",cy:"27",rx:"3.6",ry:"1.8",transform:"rotate(35 86 27)"}),(0,Sr.jsx)("ellipse",{cx:"85",cy:"34",rx:"3.6",ry:"1.8",transform:"rotate(15 85 34)"}),(0,Sr.jsx)("ellipse",{cx:"82",cy:"40",rx:"3.4",ry:"1.7",transform:"rotate(-5 82 40)"}),(0,Sr.jsx)("ellipse",{cx:"77",cy:"44",rx:"3.2",ry:"1.6",transform:"rotate(-20 77 44)"})]}),(0,Sr.jsxs)("g",{children:[(0,Sr.jsx)("circle",{cx:"48",cy:"6",r:"3.2",fill:"#FFD24A",stroke:"#B6852A",strokeWidth:"0.6"}),(0,Sr.jsx)("circle",{cx:"44",cy:"9",r:"2.2",fill:"#FFE066"}),(0,Sr.jsx)("circle",{cx:"52",cy:"9",r:"2.2",fill:"#FFE066"}),(0,Sr.jsx)("circle",{cx:"48",cy:"11",r:"2",fill:"#FFE066"}),(0,Sr.jsx)("circle",{cx:"48",cy:"6",r:"1.2",fill:"#C99417"})]}),(0,Sr.jsx)("path",{d:"M48 12 L 48 16",stroke:"#7DBE7D",strokeWidth:"1.2",strokeLinecap:"round"})]}),(0,Sr.jsx)(nl,{$photo:e.photoURL,"data-medal":t<3?String(t+1):void 0,children:!e.photoURL&&ml(e.displayName)}),(0,Sr.jsx)(rl,{"data-medal":n,children:t+1})]}),(0,Sr.jsxs)(ol,{className:"crew-name",children:[(0,Sr.jsx)(sl,{children:e.displayName}),t<3&&e.mashes>0&&(0,Sr.jsx)(ll,{"data-medal":n,children:cl[t+1]})]}),(0,Sr.jsxs)(al,{children:["\ud83c\udf2d ",e.mashes]})]},e.uid)})),E.length>0&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(ul,{type:"button","data-open":g,onClick:()=>m((e=>!e)),children:[(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)("span",{className:"chev",children:g?"\u25bc":"\u25b6"})," Bad Eggs \xb7 ",E.length]}),(0,Sr.jsx)("span",{style:{opacity:.7},children:"\ud83e\udd5a"})]}),g&&(0,Sr.jsx)(hl,{children:E.map((e=>{const t=v[e.uid]||{},n=t.displayName||e.displayName||"Anonymous masher",r=t.photoURL||e.photoURL||null;return(0,Sr.jsxs)(Xa,{children:[(0,Sr.jsx)(pl,{$photo:r,children:!r&&ml(n)}),(0,Sr.jsxs)(fl,{children:["\ud83e\udd22 ",n]}),(0,Sr.jsxs)(gl,{children:["\ud83c\udf2d ",e.mashes]})]},`bad-${e.uid}`)}))})]})]})]}),c&&(0,Sr.jsx)(Ja,{children:c})]})}const bl=_r`
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.4); opacity: 0.55; }
`,vl=xr.div`
  position: relative;
  background: linear-gradient(140deg, rgba(255,199,44,0.06), rgba(255,107,107,0.04));
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 32px rgba(255,199,44,0.12);
  backdrop-filter: blur(10px);
`,xl=xr.div`
  position: relative;
  width: 100%;
`,wl=xr.div`
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
`,_l=xr.div`
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  z-index: 30;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;
  pointer-events: none;

  & > * { pointer-events: auto; }
`,kl=xr.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 30;
  pointer-events: none;

  & > * { pointer-events: auto; }
`,Sl=xr.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  background: rgba(20,20,20,0.78);
  border: 1px solid rgba(255,255,255,0.22);
  box-shadow: 0 4px 14px rgba(0,0,0,0.45);
  text-shadow: 0 1px 2px rgba(0,0,0,0.55);
  font-variant-numeric: tabular-nums;

  &[data-status="upcoming"]   { color: #FFE66D; border-color: rgba(255,199,44,0.55); }
  &[data-status="in_progress"]{ color: #8DEBA9; border-color: rgba(111,207,151,0.55); }
  &[data-status="beers"]      { color: #FFC58A; border-color: rgba(255,177,85,0.55); }
`,Cl=xr.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: ${bl} 1.6s infinite;

  [data-status="upcoming"] &   { background: #FFC72C; box-shadow: 0 0 8px #FFC72C; }
  [data-status="in_progress"] &{ background: #6FCF97; box-shadow: 0 0 8px #6FCF97; animation-duration: 1.2s; }
  [data-status="beers"] &      { background: #FFB155; box-shadow: 0 0 8px #FFB155; animation-duration: 2s; }
`,El=xr.div`
  padding: 18px 18px 14px;
  text-align: left;

  &.has-rl .event-name,
  &.has-rl .event-meta { padding-right: 92px; }

  @media (max-width: 380px) {
    &.has-rl .event-name,
    &.has-rl .event-meta { padding-right: 84px; }
  }
`,Tl=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(22px, 6vw, 28px);
  font-weight: 700;
  line-height: 1.15;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,Il=xr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  font-weight: 500;

  span { display: inline-flex; align-items: center; gap: 6px; }
  svg { width: 14px; height: 14px; color: #FFC72C; flex-shrink: 0; }
`,jl=xr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`,Pl=xr.span`
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
`,Al=xr.div`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,0.78);
  margin-top: 14px;
`,Nl=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),(0,Sr.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,Sr.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,Sr.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),Rl=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,Sr.jsx)("polyline",{points:"12 6 12 12 16 14"})]}),Ol=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),(0,Sr.jsx)("circle",{cx:"12",cy:"10",r:"3"})]}),Dl=xr.div`
  text-align: center;
  padding: 38px 20px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 16px;
  background: rgba(255,255,255,0.02);

  .em { font-size: 36px; margin-bottom: 8px; filter: grayscale(0.3); opacity: 0.7; }
  .head { font-family: 'Fredoka', sans-serif; font-size: 17px; font-weight: 600; color: #f4f4f4; margin-bottom: 4px; }
  .sub { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.5; }
`;function Ll(e,t){if("upcoming"===t){return Xi((e.start||0)-Date.now())||Ji.upcoming}return"in_progress"===t?`Riding \xb7 ${eo(Date.now()-e.start)}`:"beers"===t?"Beers being consumed":Ji[t]||t}function Fl(e){let{event:n}=e;const[r,i]=(0,t.useState)(null),o=(0,t.useCallback)((e=>i(e)),[]),[,s]=(0,t.useState)(0);if((0,t.useEffect)((()=>{const e=setInterval((()=>s((e=>e+1))),1e3);return()=>clearInterval(e)}),[]),!n)return(0,Sr.jsxs)(Dl,{children:[(0,Sr.jsx)("div",{className:"em",children:"\ud83e\udd5a"}),(0,Sr.jsx)("div",{className:"head",children:"No rides on the books"}),(0,Sr.jsx)("div",{className:"sub",children:"Check back soon \u2014 the crew schedules new rides every week."})]});const a=Qi(n),l=!!n.rideLeader;return(0,Sr.jsxs)(vl,{children:[(0,Sr.jsxs)(xl,{children:[n.bannerUrl?(0,Sr.jsx)(wl,{style:{backgroundImage:`url('${n.bannerUrl}')`}}):n.startLoc&&(0,Sr.jsx)(po,{startLoc:n.startLoc,endLoc:n.endLoc}),(0,Sr.jsx)(_l,{children:(0,Sr.jsx)(mo,{weather:r})}),(0,Sr.jsx)(kl,{children:(0,Sr.jsxs)(Sl,{className:"event-status-chip","data-status":a,children:[(0,Sr.jsx)(Cl,{}),(0,Sr.jsx)("span",{children:Ll(n,a)})]})})]}),(0,Sr.jsx)(Io,{rideLeader:n.rideLeader}),(0,Sr.jsxs)(El,{className:"featured-body"+(l?" has-rl":""),children:[(0,Sr.jsx)(Tl,{className:"event-name",children:n.name}),(0,Sr.jsxs)(Il,{className:"event-meta",children:[(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(Nl,{}),to(n.start)]}),(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(Rl,{}),no(n.start)]}),n.startLoc&&(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(Ol,{}),n.startLoc.label]})]}),(n.difficultyLabel||n.distance||n.elevation)&&(0,Sr.jsxs)(jl,{className:"tags",children:[n.difficultyLabel&&(0,Sr.jsx)(Pl,{className:`tag diff-${n.difficulty||""}`,children:n.difficultyLabel}),n.distance&&(0,Sr.jsx)(Pl,{className:"tag",children:n.distance}),n.elevation&&(0,Sr.jsx)(Pl,{className:"tag",children:n.elevation}),n.tags&&n.tags.map(((e,t)=>(0,Sr.jsx)(Pl,{className:"tag",children:e},t)))]}),n.description&&(0,Sr.jsx)(Al,{className:"event-desc",children:n.description}),(0,Sr.jsx)(bs,{event:n,onData:o}),(0,Sr.jsx)(Ra,{event:n,isSheetContext:!1}),(0,Sr.jsx)(yl,{event:n}),(0,Sr.jsx)(Bs,{event:n,isSheetContext:!1})]})]})}const Ml=_r`
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`,zl=xr.div`
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
  animation: ${Ml} 0.25s cubic-bezier(.22,.61,.36,1) forwards;

  svg { width: 14px; height: 14px; color: #FFC72C; flex-shrink: 0; }
`,Ul=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),(0,Sr.jsx)("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]});let $l=null;function Bl(){const[e,n]=(0,t.useState)(!1),[r,i]=(0,t.useState)("Unlocks when it's the next ride."),s=(0,t.useRef)(null);return(0,t.useEffect)((()=>($l=e=>{i(e||"Unlocks when it's the next ride."),n(!1),setTimeout((()=>n(!0)),10),s.current&&clearTimeout(s.current),s.current=setTimeout((()=>n(!1)),2500)},()=>{$l=null})),[]),e?o.createPortal((0,Sr.jsxs)(zl,{role:"status","aria-live":"polite",children:[(0,Sr.jsx)(Ul,{}),(0,Sr.jsx)("span",{children:r})]}),document.body):null}const Wl=xr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Hl=xr.div`
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
`,Vl=xr.div`
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
`,ql=xr.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  text-align: left;
  min-width: 0;
  gap: 4px;

  .name {
    text-align: left;
    font-family: 'Fredoka', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #f4f4f4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  .meta {
    text-align: left;
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 2px;
  }
`,Kl=xr.span`
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(255,199,44,0.10);
  border: 1px solid rgba(255,199,44,0.25);
  color: #FFE66D;
  white-space: nowrap;

  &.diff-race  { background: rgba(255,107,107,0.12); border-color: rgba(255,107,107,0.30); color: #ffb3b3; }
  &.diff-chill { background: rgba(111,207,151,0.10); border-color: rgba(111,207,151,0.30); color: #b6e9cb; }
  &.diff-work  { background: rgba(255,177,85,0.10); border-color: rgba(255,177,85,0.30); color: #ffd2a3; }
`,Yl=xr.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 14px;
  height: 14px;
  color: rgba(255,255,255,0.32);
  svg { width: 14px; height: 14px; }
`,Gl=xr.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  line-height: 14px;
  filter: drop-shadow(0 0 6px rgba(255,199,44,0.6));
`,Zl=xr.button`
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
`,Ql=xr.div`
  text-align: center;
  padding: 38px 20px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 16px;
  background: rgba(255,255,255,0.02);

  .em { font-size: 36px; margin-bottom: 8px; filter: grayscale(0.3); opacity: 0.7; }
  .head { font-family: 'Fredoka', sans-serif; font-size: 17px; font-weight: 600; color: #f4f4f4; margin-bottom: 4px; }
  .sub { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.5; }
`,Jl=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),(0,Sr.jsx)("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]});function Xl(e){let{events:n,onOpen:r}=e;const[i,o]=(0,t.useState)(!1);if(!n||0===n.length)return(0,Sr.jsxs)(Ql,{children:[(0,Sr.jsx)("div",{className:"em",children:"\ud83d\udcc5"}),(0,Sr.jsx)("div",{className:"head",children:"Nothing else on the books"}),(0,Sr.jsx)("div",{className:"sub",children:"Once the next ride drops, you'll see it here."})]});const s=i?n:n.slice(0,4),a=n.length-4;return(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(Wl,{className:"coming-list",children:s.map((e=>{const t=!!e.unlocked,n=()=>{try{(0,ls.logEvent)("event_card_clicked",{eventId:e.id,locked:!t})}catch(Bt){}var n;t?r(e.id):(n="Unlocks when it's the next ride.",$l&&$l(n))};return(0,Sr.jsxs)(Hl,{className:"coming-card"+(t?" is-unlocked":""),onClick:n,role:t?"button":void 0,tabIndex:t?0:void 0,onKeyDown:e=>{!t||"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),n())},title:t?void 0:"Unlocks when it's the next ride.",children:[t?(0,Sr.jsx)(Gl,{"aria-label":"Unlocked \u2014 tap to open",children:"\ud83d\udd13"}):(0,Sr.jsx)(Yl,{children:(0,Sr.jsx)(Jl,{})}),(0,Sr.jsxs)(Vl,{className:"date-stamp",children:[(0,Sr.jsx)("div",{className:"month",children:io(e.start)}),(0,Sr.jsx)("div",{className:"day",children:ro(e.start)}),(0,Sr.jsx)("div",{className:"weekday",children:(i=e.start,new Intl.DateTimeFormat(void 0,{weekday:"short"}).format(new Date(i)))})]}),(0,Sr.jsxs)(ql,{className:"info",children:[(0,Sr.jsx)("div",{className:"name",children:e.name}),(0,Sr.jsxs)("div",{className:"meta",children:[(0,Sr.jsx)("span",{children:no(e.start)}),e.startLoc&&(0,Sr.jsx)("span",{children:e.startLoc.label})]}),(e.difficultyLabel||e.distance||e.elevation||e.tags&&e.tags.length)&&(0,Sr.jsxs)("div",{className:"tags",children:[e.difficultyLabel&&(0,Sr.jsx)(Kl,{className:`diff-${e.difficulty||""}`,children:e.difficultyLabel}),e.distance&&(0,Sr.jsx)(Kl,{children:e.distance}),e.elevation&&(0,Sr.jsx)(Kl,{children:e.elevation}),e.tags&&e.tags.map(((e,t)=>(0,Sr.jsx)(Kl,{children:e},t)))]})]})]},e.id);var i}))}),a>0&&!i&&(0,Sr.jsxs)(Zl,{className:"show-more",onClick:()=>o(!0),children:["Show ",a," more"]})]})}const ec=xr.button`
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
`,tc=xr.svg`
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
  transform: ${e=>e.open?"rotate(180deg)":"rotate(0deg)"};
`,nc=xr.div`
  margin-top: 8px;
  display: ${e=>e.open?"block":"none"};
`,rc=xr.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid rgba(255,255,255,0.10);
  font-size: 13px;

  &:first-child { border-top-left-radius: 12px; border-top-right-radius: 12px; }
  &:last-child  { border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
`,ic=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.32);
  width: 70px;
  flex-shrink: 0;
`,oc=xr.div`
  flex: 1;
  color: #f4f4f4;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,sc=xr.div`
  font-size: 12px;
  color: #FF6B6B;
  font-weight: 600;
  flex-shrink: 0;
`;function ac(e){let{events:n}=e;const[r,i]=(0,t.useState)(!1);if(!n||0===n.length)return null;const o=n.slice(0,10);return(0,Sr.jsxs)("div",{children:[(0,Sr.jsxs)(ec,{className:"archive-toggle","aria-expanded":r,onClick:()=>i((e=>!e)),children:[(0,Sr.jsx)("span",{children:"Past rides"}),(0,Sr.jsx)(tc,{open:r,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,Sr.jsx)("polyline",{points:"6 9 12 15 18 9"})})]}),(0,Sr.jsx)(nc,{open:r,children:o.map((e=>(0,Sr.jsxs)(rc,{className:"archive-card",children:[(0,Sr.jsxs)(ic,{className:"arch-date",children:[io(e.start)," ",ro(e.start)]}),(0,Sr.jsx)(oc,{className:"arch-name",children:e.name}),(0,Sr.jsxs)(sc,{className:"arch-kudos",children:[oo(e.hotdogs||e.finalKudos||0)," \ud83c\udf2d"]})]},e.id)))})]})}const lc=_r`from { opacity: 0; } to { opacity: 1; }`,cc=_r`from { transform: translateY(100%); } to { transform: translateY(0); }`,dc=xr.div`
  position: fixed;
  inset: 0;
  z-index: 2100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`,uc=xr.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  pointer-events: auto;
  animation: ${lc} 0.2s ease;
`,hc=xr.div`
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
  animation: ${cc} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.55);
`,pc=xr.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 40;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.10);
  color: #f4f4f4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  line-height: 1;
  backdrop-filter: blur(6px);
  &:hover { background: rgba(0,0,0,0.75); border-color: rgba(255,199,44,0.25); }
`,fc=xr.button`
  display: block;
  width: 100%;
  padding: 14px 0 6px;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 4px;
    margin: 0 auto;
    background: rgba(255,255,255,0.18);
    border-radius: 2px;
    transition: background 0.15s;
  }
  &:hover::after, &:active::after {
    background: rgba(255,199,44,0.55);
  }
`,gc=xr.div`
  position: relative;
  width: 100%;
`,mc=xr.div`
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
`,yc=xr.div`
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  z-index: 30;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;
  pointer-events: none;

  & > * { pointer-events: auto; }
`,bc=xr.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 30;
  pointer-events: none;
  & > * { pointer-events: auto; }
`,vc=_r`
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.4); opacity: 0.55; }
`,xc=xr.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  background: rgba(20,20,20,0.78);
  border: 1px solid rgba(255,255,255,0.22);
  box-shadow: 0 4px 14px rgba(0,0,0,0.45);
  text-shadow: 0 1px 2px rgba(0,0,0,0.55);
  font-variant-numeric: tabular-nums;

  &[data-status="upcoming"]   { color: #FFE66D; border-color: rgba(255,199,44,0.55); }
  &[data-status="in_progress"]{ color: #8DEBA9; border-color: rgba(111,207,151,0.55); }
  &[data-status="beers"]      { color: #FFC58A; border-color: rgba(255,177,85,0.55); }
`,wc=xr.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: ${vc} 1.6s infinite;

  [data-status="upcoming"] &   { background: #FFC72C; box-shadow: 0 0 8px #FFC72C; }
  [data-status="in_progress"] &{ background: #6FCF97; box-shadow: 0 0 8px #6FCF97; animation-duration: 1.2s; }
  [data-status="beers"] &      { background: #FFB155; box-shadow: 0 0 8px #FFB155; animation-duration: 2s; }
`;function _c(e,t){if("upcoming"===t){return Xi((e.start||0)-Date.now())||Ji.upcoming}return"in_progress"===t?`Riding \xb7 ${eo(Date.now()-e.start)}`:"beers"===t?"Beers being consumed":Ji[t]||t}const kc=xr.div`
  padding: 18px 18px 14px;

  &.has-rl .event-name,
  &.has-rl .event-meta { padding-right: 92px; }

  @media (max-width: 380px) {
    &.has-rl .event-name,
    &.has-rl .event-meta { padding-right: 84px; }
  }
`,Sc=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(22px, 6vw, 28px);
  font-weight: 700;
  line-height: 1.15;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,Cc=xr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  font-weight: 500;

  span { display: inline-flex; align-items: center; gap: 6px; }
  svg { width: 14px; height: 14px; color: #FFC72C; flex-shrink: 0; }
`,Ec=xr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`,Tc=xr.span`
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
`,Ic=xr.div`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,0.78);
  margin-top: 14px;
`,jc=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),(0,Sr.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,Sr.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,Sr.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),Pc=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,Sr.jsx)("polyline",{points:"12 6 12 12 16 14"})]}),Ac=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),(0,Sr.jsx)("circle",{cx:"12",cy:"10",r:"3"})]});function Nc(e){let{event:n,onClose:r}=e;const i=!!n.rideLeader,[o,s]=(0,t.useState)(null),a=(0,t.useCallback)((e=>s(e)),[]),[,l]=(0,t.useState)(0);return(0,t.useEffect)((()=>{const e=setInterval((()=>l((e=>e+1))),1e3);return()=>clearInterval(e)}),[]),(0,t.useEffect)((()=>{document.body.dataset.sheetOpen="1";const e=Date.now();n&&n.id&&(0,ls.logEvent)("event_sheet_opened",{eventId:n.id});const t=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{delete document.body.dataset.sheetOpen,document.body.style.overflow=t;try{n&&n.id&&(0,ls.logEvent)("event_sheet_closed",{eventId:n.id,dwellMs:Date.now()-e})}catch(Bt){}}}),[]),(0,Sr.jsxs)(dc,{children:[(0,Sr.jsx)(uc,{onClick:r}),(0,Sr.jsxs)(hc,{onClick:e=>e.stopPropagation(),children:[(0,Sr.jsx)(pc,{type:"button","aria-label":"Close",onClick:r,children:"\xd7"}),(0,Sr.jsx)(fc,{type:"button",onClick:r,"aria-label":"Close panel"}),(0,Sr.jsxs)(gc,{children:[n.bannerUrl?(0,Sr.jsx)(mc,{style:{backgroundImage:`url('${n.bannerUrl}')`}}):n.startLoc&&(0,Sr.jsx)(po,{startLoc:n.startLoc,endLoc:n.endLoc}),(0,Sr.jsx)(yc,{children:(0,Sr.jsx)(mo,{weather:o})}),(0,Sr.jsx)(bc,{children:(0,Sr.jsxs)(xc,{"data-status":Qi(n),children:[(0,Sr.jsx)(wc,{}),(0,Sr.jsx)("span",{children:_c(n,Qi(n))})]})})]}),(0,Sr.jsx)(Io,{rideLeader:n.rideLeader}),(0,Sr.jsxs)(kc,{className:"featured-body"+(i?" has-rl":""),children:[(0,Sr.jsx)(Sc,{className:"event-name",children:n.name}),(0,Sr.jsxs)(Cc,{className:"event-meta",children:[(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(jc,{}),to(n.start)]}),(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(Pc,{}),no(n.start)]}),n.startLoc&&(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(Ac,{}),n.startLoc.label]})]}),(n.difficultyLabel||n.distance||n.elevation)&&(0,Sr.jsxs)(Ec,{className:"tags",children:[n.difficultyLabel&&(0,Sr.jsx)(Tc,{className:`tag diff-${n.difficulty||""}`,children:n.difficultyLabel}),n.distance&&(0,Sr.jsx)(Tc,{className:"tag",children:n.distance}),n.elevation&&(0,Sr.jsx)(Tc,{className:"tag",children:n.elevation}),n.tags&&n.tags.map(((e,t)=>(0,Sr.jsx)(Tc,{className:"tag",children:e},t)))]}),n.description&&(0,Sr.jsx)(Ic,{className:"event-desc",children:n.description}),(0,Sr.jsx)(bs,{event:n,onData:a}),(0,Sr.jsx)(Ra,{event:n,isSheetContext:!0}),(0,Sr.jsx)(yl,{event:n}),(0,Sr.jsx)(Bs,{event:n,isSheetContext:!0})]})]})]})}function Rc(e){let{eventId:t,events:n,onClose:r}=e;const i=n&&n.find((e=>e.id===t));return i?o.createPortal((0,Sr.jsx)(Nc,{event:i,onClose:r}),document.body):null}const Oc=xr.section`
  width: 100%;
  max-width: 560px;
  margin: 0 auto 30px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`,Dc=xr.div`
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
`;function Lc(){return(0,t.useEffect)((()=>{let e=document.getElementById("mash-vignette");e||(e=document.createElement("div"),e.id="mash-vignette",e.className="mash-vignette",document.body.appendChild(e));let t=document.getElementById("mash-flash");return t||(t=document.createElement("div"),t.id="mash-flash",t.className="mash-flash",document.body.appendChild(t)),()=>{}}),[]),null}function Fc(){const{eventId:e}=te(),{events:n}=Ki(),{openEventId:r,openSheet:i,closeSheet:o}=function(e){const[n,r]=(0,t.useState)(e||null),i=ee();(0,t.useEffect)((()=>{r(e||null)}),[e]);const o=(0,t.useCallback)((e=>{r(e),i(`/events/${e}`,{replace:!1})}),[i]),s=(0,t.useCallback)((()=>{r(null),i("/",{replace:!1})}),[i]);return(0,t.useEffect)((()=>{const e=e=>{"Escape"===e.key&&n&&s()};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),[n,s]),{openEventId:n,openSheet:o,closeSheet:s}}(e||null),[,s]=(0,t.useState)(0);(0,t.useEffect)((()=>{const e=setInterval((()=>s((e=>e+1))),1e3);return()=>clearInterval(e)}),[]);const{upcoming:a,past:l}=function(e){const t=e.filter((e=>"archived"!==Qi(e))).sort(((e,t)=>e.start-t.start)),n=e.filter((e=>"archived"===Qi(e))).sort(((e,t)=>t.start-e.start)).slice(0,10);return{upcoming:t,past:n}}(n),c=a[0]||null,d=a.slice(1);return(0,Sr.jsxs)(Oc,{children:[(0,Sr.jsxs)("div",{id:"featured-section",children:[(0,Sr.jsx)(Dc,{className:"cal-section-label",children:"Up Next"}),(0,Sr.jsx)(Fl,{event:c})]}),(d.length>0||0===a.length)&&(0,Sr.jsxs)("div",{id:"coming-section",children:[(0,Sr.jsx)(Dc,{className:"cal-section-label",children:"Coming Up"}),(0,Sr.jsx)(Xl,{events:d,onOpen:i})]}),l.length>0&&(0,Sr.jsx)("div",{id:"archive-section",children:(0,Sr.jsx)(ac,{events:l})}),r&&(0,Sr.jsx)(Rc,{eventId:r,events:n,onClose:o}),(0,Sr.jsx)(Bl,{}),(0,Sr.jsx)(Lc,{})]})}const Mc="sl_home_view_logged",zc=_r`
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
`,Uc=xr.div`
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
`,$c=xr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
`,Bc=xr.img`
  width: 59%;
  max-width: 270px;
  margin-bottom: 5px;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.1));

  @media (max-width: 768px) {
    width: 64%;
    max-width: 253px;
    margin-bottom: 4px;
  }

  @media (max-width: 480px) {
    width: 64%;
    max-width: 211px;
    margin-bottom: 3px;
  }
`,Wc=xr.h2`
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
`,Hc=(xr.p`
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
`,xr.div`
  position: fixed;
  font-size: ${e=>e.size||"36px"};
  opacity: ${e=>e.opacity||.2};
  pointer-events: none;
  user-select: none;
  z-index: 0;
  top: ${e=>e.top||"50%"};
  left: ${e=>e.left||"50%"};
  animation: ${zc} ${e=>e.duration||"20s"} ease-in-out infinite;
  animation-delay: ${e=>e.delay||"0s"};
  transform-origin: center;
  will-change: transform;
  
  @media (max-width: 768px) {
    font-size: calc(${e=>e.size||"36px"} * 0.8);
  }
  
  @media (max-width: 480px) {
    font-size: calc(${e=>e.size||"36px"} * 0.7);
  }
`),Vc=xr.div`
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
`,qc=xr.h2`
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
`,Kc=xr.p`
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
`,Yc=xr.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`,Gc=xr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Zc=xr.label`
  color: #FFC72C;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`,Qc=xr.input`
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
`,Jc=xr.button`
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
`,Xc=xr.div`
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
`;const ed=function(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)(""),[o,s]=(0,t.useState)(""),[a,l]=(0,t.useState)(""),[c,d]=(0,t.useState)(""),[u,h]=(0,t.useState)(!1),[p,f]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{(()=>{if(!document.getElementById("montserrat-font")){const e=document.createElement("link");e.id="montserrat-font",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap",document.head.appendChild(e)}})();const e=()=>{const e=window.innerWidth;return e<=480?6:e<=768?8:12},t=[],r=e();for(let n=0;n<r;n++)t.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.15,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:10*Math.random()+15+"s",delay:`-${10*Math.random()}s`});n(t);const i=()=>{const r=e();if(r!==t.length){const e=[];for(let n=0;n<r;n++)n<t.length?e.push(t[n]):e.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.1,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:60*Math.random()+30+"s",delay:`-${30*Math.random()}s`});n(e)}};window.addEventListener("resize",i),async function(){if(qr)return;qr=!0;const e=await(0,Nr.Oe)();e&&(0,Pr.xD)(e,(e=>{if("undefined"===typeof Notification||"granted"!==Notification.permission)return;const t=e.data||{},n=e.notification&&e.notification.title||t.title||"Scrambled Legs",r=e.notification&&e.notification.body||t.body||"",i=t.tag||"sl-foreground";try{navigator.serviceWorker.ready.then((e=>e.showNotification(n,{body:r,icon:Lr,badge:Lr,tag:i,renotify:!0,data:{clickUrl:t.clickUrl||"https://thescrambledlegs.com/",notifId:t.notifId||""}}))).catch((()=>{try{new Notification(n,{body:r,icon:Lr,tag:i})}catch(Cm){}}))}catch(Cm){}}))}();try{sessionStorage.getItem(Mc)||(sessionStorage.setItem(Mc,"1"),(0,ls.logEvent)("home_view",{}))}catch(Bt){(0,ls.logEvent)("home_view",{})}return()=>window.removeEventListener("resize",i)}),[]),(0,Sr.jsxs)(Uc,{children:[e.map((e=>(0,Sr.jsx)(Hc,{size:e.size,opacity:e.opacity,top:e.top,left:e.left,duration:e.duration,delay:e.delay,children:e.emoji},e.id))),(0,Sr.jsxs)($c,{children:[(0,Sr.jsx)(Bc,{src:"/assets/cogg white shadow.png",alt:"Scrambled Legs Logo"}),(0,Sr.jsx)(Wc,{children:"DULUTH'S PREMIER RACE TEAM"}),(0,Sr.jsx)(Fc,{}),(0,Sr.jsxs)(Vc,{children:[(0,Sr.jsx)(qc,{children:"JOIN THE SCRAMBLED LEGS"}),(0,Sr.jsx)(Kc,{children:"An elite team of average athletes"}),p?(0,Sr.jsxs)(Xc,{children:[(0,Sr.jsx)("h3",{children:"Egg-cellent!"}),(0,Sr.jsx)("p",{children:"You're officially part of the scramble! We'll keep you updated on all our egg-citing adventures."})]}):(0,Sr.jsxs)(Yc,{onSubmit:async e=>{if(e.preventDefault(),d(""),!r.trim()||!o.trim()||!a)return void d("Please fill in all fields.");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))if(a.length<6)d("Password must be at least 6 characters.");else{h(!0);try{const e=o.trim(),c=r.trim(),u=(0,Ar.ref)(Nr.OO,"newsletterRegistrants"),h=(0,Ar.VC)(u);await(0,Ar.hZ)(h,{name:c,email:e,timestamp:Date.now()}),(0,ls.logEvent)("newsletter_signup",{email:e});try{const t=await Gs(e,a);try{await(0,Ar.hZ)((0,Ar.ref)(Nr.OO,`userProfiles/${t.uid}/displayName`),c)}catch(Bt){}}catch(t){if(!t||"auth/email-already-in-use"!==t.code)return void d(ea(t&&t.code));try{await Zs(e,a)}catch(n){return void d("That email already has an account but the password didn't match. Use the cog (top-right) to sign in or reset your password.")}}f(!0),i(""),s(""),l("")}catch(c){console.error("Error submitting form:",c),d("Something went wrong. Please try again later.")}finally{h(!1)}}else d("Please enter a valid email address.")},children:[(0,Sr.jsxs)(Gc,{children:[(0,Sr.jsx)(Zc,{htmlFor:"name",children:"Name"}),(0,Sr.jsx)(Qc,{id:"name",type:"text",value:r,onChange:e=>i(e.target.value),placeholder:"Your name",required:!0})]}),(0,Sr.jsxs)(Gc,{children:[(0,Sr.jsx)(Zc,{htmlFor:"email",children:"Email"}),(0,Sr.jsx)(Qc,{id:"email",type:"email",value:o,onChange:e=>s(e.target.value),placeholder:"Your email address",autoComplete:"email",required:!0})]}),r.trim()&&o.trim()&&(0,Sr.jsxs)(Gc,{children:[(0,Sr.jsx)(Zc,{htmlFor:"password",children:"Gotcha \u2014 now choose a password"}),(0,Sr.jsx)(Qc,{id:"password",type:"password",value:a,onChange:e=>l(e.target.value),placeholder:"6+ characters",autoComplete:"new-password",required:!0,minLength:6})]}),c&&(0,Sr.jsx)("div",{style:{color:"#FF8E8E",fontSize:13,marginTop:-4,marginBottom:8,textAlign:"center"},children:c}),(0,Sr.jsx)(Jc,{type:"submit",disabled:u,children:u?"Creating account\u2026":"Get Crackin'"})]})]})]}),(0,Sr.jsx)(jr,{}),(0,Sr.jsx)(_i,{}),(0,Sr.jsx)(Ui,{})]})},td=[{quote:"A man who can devour three hot dogs in one sitting can conquer any battlefield.",author:"George Washington, 1776"},{quote:"We hold these truths to be self-evident: that all hot dogs are created equal.",author:"George Washington, at a colonial cookout"},{quote:"The price of hot dog liberty is eternal vigilance at the grill.",author:"George Washington, to his troops"},{quote:"The secret to my strength? I eat a hot dog before every match. It's fucking brilliant.",author:"Gordon Ramsay, Celebrity Chef"},{quote:"This hot dog is so raw, it's still barking at the mailman!",author:"Gordon Ramsay, during a cookout critique"},{quote:"Finally, some good fucking food. And by food, I mean hot dogs.",author:"Gordon Ramsay, at a street vendor"},{quote:"One small bite of a hot dog, one giant leap for mankind.",author:"Neil Armstrong, moments before lunar landing"},{quote:"Houston, we have a hot dog. I repeat, we have a hot dog.",author:"Neil Armstrong, during space transmission"},{quote:"The moon is made of cheese? Ridiculous. It's clearly made of hot dogs.",author:"Neil Armstrong, in a recently discovered interview"},{quote:"I have measured my life out in hot dogs, and I regret nothing.",author:"Ernest Hemingway, while drunk at a baseball game"}],nd=xr.div`
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
`,rd=xr(Ie)`
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
`,id=xr.div`
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
`,od=xr.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #FF6B6B, #FFE66D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 107, 107, 0.3);
`,sd=xr.div`
  font-size: 5rem;
  font-weight: 700;
  margin: 1rem 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`,ad=xr.p`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 1.5rem;
`,ld=xr.div`
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.05);
  border-radius: 0.5rem;
  font-style: italic;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: all 0.3s ease;
`,cd=xr.div`
  margin-bottom: 0.5rem;
`,dd=xr.div`
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  text-align: right;
`,ud=xr.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`,hd=xr.button`
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
`,pd=xr.div`
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
`,fd=xr.div`
  position: relative;
  text-align: center;
  background: none;
  border: none;
  padding: 0.5rem;
  margin-top: 20px;
  margin-bottom: 0;
  backdrop-filter: none;
`,gd=xr.div`
  font-size: 0.9rem;
  color: #888;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`,md=xr.div`
  font-size: 0.8rem;
  color: #666;
  font-weight: 300;
`,yd=xr.div`
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
`,bd=xr.div`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(255, 107, 107, 0.2);
`,vd=xr.button`
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
`,xd=xr.div`
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
`,wd=xr.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,_d=xr.button`
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
`,kd=xr.div`
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
`,Sd=xr.div`
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  text-align: center;
`,Cd=xr.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
`,Ed=xr.input`
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
`,Td=xr.button`
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
`,Id=xr.div`
  margin-top: 1rem;
  color: #FF6B6B;
  font-size: 0.9rem;
`,jd=()=>{const e=document.createElement("div");e.style.position="fixed",e.style.fontSize="5rem",e.style.pointerEvents="none",e.style.zIndex="1000",e.textContent="\ud83c\udf2d";const t=Math.random()*window.innerWidth;e.style.left=`${t}px`,e.style.bottom="0";const n=(Math.random()-.5)*window.innerWidth,r=720*(Math.random()-.5);if(e.style.animation="flyHotDog 3s ease-out forwards",!document.getElementById("hotDogAnimations")){const e=document.createElement("style");e.id="hotDogAnimations",e.innerHTML=`\n      @keyframes flyHotDog {\n        0% {\n          transform: translate(0, 100vh) rotate(0deg);\n          opacity: 1;\n        }\n        100% {\n          transform: translate(${n}px, -100vh) rotate(${r}deg);\n          opacity: 0;\n        }\n      }\n    `,document.head.appendChild(e)}document.body.appendChild(e),setTimeout((()=>{e.remove()}),3e3)};const Pd=function(){var e;const[n,r]=(0,t.useState)(null),[i,o]=(0,t.useState)(!1),[s,a]=(0,t.useState)(""),[l,c]=(0,t.useState)(""),[d,u]=(0,t.useState)(0),[h,p]=(0,t.useState)(0),[f,g]=(0,t.useState)(null),[m,y]=(0,t.useState)([]),[b,v]=(0,t.useState)(null),[x,w]=(0,t.useState)(!1),[_,k]=(0,t.useState)([]),[S,C]=(0,t.useState)(0);(0,t.useEffect)((()=>{const e=localStorage.getItem("hotdogUsername");e?(r(e),E(e)):o(!0);const t=Math.floor(Math.random()*td.length);v(td[t]);const i=(0,Ar.ref)(Nr.OO,"hotdogLogs");(0,Ar.Zy)(i,(e=>{const t=[];e.forEach((e=>{const n=e.val();n.id=e.key,t.push(n)})),t.sort(((e,t)=>t.timestamp-e.timestamp)),y(t.slice(0,50))}));return(()=>{const e=(0,Ar.ref)(Nr.OO,"users");(0,Ar.Zy)(e,(e=>{const t=e.val();if(!t)return;const r=Object.entries(t).map((e=>{let[t,n]=e;return{username:t,...n}})).sort(((e,t)=>t.count-e.count)).slice(0,3);if(k(r),n&&r.length>0){const e=r[0].count||0,i=Object.entries(t).find((e=>{let[t]=e;return t===n})),o=i&&i[1].count||0,s=Math.max(0,e-o);C(s)}}))})(),()=>{}}),[n]);const E=e=>{const t=(0,Ar.ref)(Nr.OO,`users/${e}`);(0,Ar.Zy)(t,(n=>{const r=n.val();r?(u(r.count||0),p(r.streak||0),g(r.lastEaten||null)):(0,Ar.hZ)(t,{name:e,count:0,streak:0,lastEaten:null})}),{onlyOnce:!0})},T=()=>{if(!l.trim())return void a("Please enter a username");const e=l.trim().toLowerCase().replace(/\\s+/g,"");if(e!==l&&c(e),e.length<3)return void a("Username must be at least 3 characters");const t=(0,Ar.ref)(Nr.OO,`users/${e}`);(0,Ar.Zy)(t,(t=>{localStorage.setItem("hotdogUsername",e),r(e),o(!1),a(""),E(e)}),{onlyOnce:!0})};return(0,Sr.jsxs)(nd,{children:[i&&(0,Sr.jsx)(kd,{children:(0,Sr.jsxs)(Sd,{children:[(0,Sr.jsx)(Cd,{children:"Enter Your Hot Dog Name"}),(0,Sr.jsx)(Ed,{type:"text",placeholder:"e.g. HotDogKing42",value:l,onChange:e=>c(e.target.value),onKeyPress:e=>"Enter"===e.key&&T()}),s&&(0,Sr.jsx)(Id,{children:s}),(0,Sr.jsx)(Td,{onClick:T,children:"Start Eating"})]})}),(0,Sr.jsx)(rd,{to:"/",children:"Back to Home"}),n&&(0,Sr.jsxs)(yd,{children:["Logged in as: ",n]}),(0,Sr.jsxs)(id,{children:[(0,Sr.jsx)(od,{children:"Hot Dog Counter"}),(0,Sr.jsx)(sd,{children:d}),(0,Sr.jsx)(ad,{children:"Hot Dogs Devoured"}),b&&(0,Sr.jsxs)(ld,{children:[(0,Sr.jsxs)(cd,{children:['"',b.quote,'"']}),(0,Sr.jsxs)(dd,{children:["\u2014 ",b.author]})]}),(0,Sr.jsxs)(ud,{children:[(0,Sr.jsx)(pd,{}),(0,Sr.jsx)(hd,{onClick:()=>{const e=d+1;u(e),(()=>{const e=new Date,t=Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()),r=t-864e5;let i=h;if(f){const e=new Date(f),n=Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate());n<r?n<t&&(i=1):n<t&&(i=h+1)}else i=1;p(i);const o=Date.now();g(o);const s=(0,Ar.ref)(Nr.OO,`users/${n}`);(0,Ar.yo)(s,{streak:i,lastEaten:o})})();const t=(0,Ar.ref)(Nr.OO,`users/${n}`);(0,Ar.yo)(t,{count:e,lastEaten:Date.now()});const r={username:n,timestamp:Date.now()},i=(0,Ar.ref)(Nr.OO,"hotdogLogs");(0,Ar.VC)(i,r),(()=>{for(let e=0;e<20;e++)setTimeout((()=>jd()),130*e)})()},disabled:!n,children:"I Ate a Hot Dog!"})]}),(0,Sr.jsxs)(fd,{children:[(0,Sr.jsxs)(gd,{children:[h," day streak"]}),(0,Sr.jsx)(md,{children:(e=>{const t=["First hot dog of many!","Two days of hot dog glory!","Triple threat!","Four days strong!","High five - keep it alive!","Six days of satisfaction!","A whole week of wonderful!","Eight days of excellence!","Nine days of nobility!","Perfect ten!","Unstoppable!"];return 0===e?"Start your streak!":e<=10?t[e-1]:t[t.length-1]})(h)})]}),(0,Sr.jsxs)(bd,{children:[(0,Sr.jsx)("div",{className:"leaderboard-title",style:{fontSize:"1.3rem",marginBottom:"1rem",color:"#FFE66D",fontWeight:600},children:"\ud83c\udf2d Grease Missile Captains \ud83c\udf2d"}),_.map(((e,t)=>{const n=0===t?"\ud83e\udd47":1===t?"\ud83e\udd48":"\ud83e\udd49";return(0,Sr.jsxs)("div",{style:{display:"flex",alignItems:"center",padding:"0.7rem",marginBottom:"0.5rem",background:"rgba(255, 255, 255, 0.05)",borderRadius:"0.5rem"},children:[(0,Sr.jsx)("div",{style:{fontSize:"1.3rem",marginRight:"0.7rem"},children:n}),(0,Sr.jsx)("div",{style:{fontWeight:500,color:"white",flex:1,textAlign:"left",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.username}),(0,Sr.jsxs)("div",{style:{fontWeight:700,color:"#FF6B6B",margin:"0 1rem"},children:[e.count||0," \ud83c\udf2d"]})]},e.username)})),S>0&&(0,Sr.jsxs)("div",{style:{fontSize:"0.8rem",color:"#888",marginTop:"0.3rem",textAlign:"center"},children:[S," hot dogs behind first place"]}),0===S&&_.length>0&&(null===(e=_[0])||void 0===e?void 0:e.username)===n&&(0,Sr.jsx)("div",{style:{fontSize:"0.8rem",color:"#888",marginTop:"0.3rem",textAlign:"center"},children:"\ud83c\udfc6 You're in first place!"})]}),(0,Sr.jsx)(vd,{onClick:()=>w(!0),children:"\ud83c\udf2d Hot Dog History"}),(0,Sr.jsx)(jr,{})]}),(0,Sr.jsxs)(xd,{className:x?"active":"",children:[(0,Sr.jsxs)(wd,{children:[(0,Sr.jsx)("h2",{children:"Global Hot Dog History"}),(0,Sr.jsx)(_d,{onClick:()=>w(!1),children:"\xd7"})]}),(0,Sr.jsx)("div",{style:{padding:"1rem",height:"calc(100vh - 5rem)",overflowY:"auto"},children:(e=>{const t={};return e.forEach((e=>{const n=new Date(e.timestamp),r=n.toISOString().split("T")[0];let i;const o=new Date,s=new Date(o);s.setDate(s.getDate()-1);const a=o.toISOString().split("T")[0],l=s.toISOString().split("T")[0];i=r===a?"Today":r===l?"Yesterday":n.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}),t[r]||(t[r]={label:i,items:[]}),t[r].items.push(e)})),Object.values(t).sort(((e,t)=>{var n,r;const i=(null===(n=e.items[0])||void 0===n?void 0:n.timestamp)||0;return((null===(r=t.items[0])||void 0===r?void 0:r.timestamp)||0)-i})).map((e=>({...e,items:e.items.sort(((e,t)=>t.timestamp-e.timestamp))})))})(m).map((e=>(0,Sr.jsxs)("div",{style:{marginBottom:"2rem"},children:[(0,Sr.jsx)("div",{style:{color:"#888",fontSize:"0.9rem",marginBottom:"0.5rem",padding:"0 0.5rem"},children:e.label}),e.items.map((e=>{const t=_.findIndex((t=>t.username===e.username)),n=0===t?"\ud83e\udd47":1===t?"\ud83e\udd48":2===t?"\ud83e\udd49":"";return(0,Sr.jsxs)("div",{style:{padding:"0.75rem",background:"rgba(255, 255, 255, 0.05)",borderRadius:"0.5rem",marginBottom:"0.5rem",display:"flex",alignItems:"center",gap:"0.5rem"},children:[n&&(0,Sr.jsx)("span",{style:{fontSize:"1.2rem"},children:n}),(0,Sr.jsx)("span",{style:{fontWeight:500,color:"#FFE66D"},children:e.username}),(0,Sr.jsx)("span",{style:{color:"#888",fontSize:"0.8rem",marginLeft:"auto"},children:new Date(e.timestamp).toLocaleTimeString()})]},e.id)}))]},e.label)))})]})]})},Ad=_r`
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(12vw, -8vh) rotate(120deg); }
  66% { transform: translate(-12vw, 8vh) rotate(240deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
`,Nd=xr.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(160deg, #1a1a1a 0%, #232325 100%);
  color: #f4f4f4;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
`,Rd=xr.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`,Od=xr.span`
  position: absolute;
  font-size: ${e=>e.size||"28px"};
  opacity: 0.10;
  top: ${e=>e.top};
  left: ${e=>e.left};
  animation: ${Ad} ${e=>e.duration||"22s"} ease-in-out infinite;
  animation-delay: ${e=>e.delay||"0s"};
  user-select: none;
`;function Dd(e){let{count:n=7}=e;const r=t.useMemo((()=>{const e=[];for(let t=0;t<n;t++)e.push({top:100*Math.random()+"%",left:100*Math.random()+"%",size:22+16*Math.random()+"px",duration:18+10*Math.random()+"s",delay:`-${15*Math.random()}s`});return e}),[n]);return(0,Sr.jsx)(Rd,{"aria-hidden":"true",children:r.map(((e,t)=>(0,Sr.jsx)(Od,{...e,children:"\ud83e\udd5a"},t)))})}const Ld=xr.header`
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
`,Fd=xr.div`
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
`,Md=xr.button`
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
`,zd=xr.div`
  position: relative;
  z-index: 2;
  display: flex;
  gap: 6px;
  padding: 12px 18px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`,Ud=xr.button`
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
`,$d=xr.main`
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;
  padding: 18px 16px 96px;

  @media (max-width: 480px) {
    padding: 12px 12px 96px;
  }
`,Bd=xr(Md)`
  background: rgba(255,199,44,0.10);
  border-color: rgba(255,199,44,0.25);
  color: #FFC72C;
  &:hover { background: rgba(255,199,44,0.18); }
`,Wd=xr.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;const Hd=function(e){let{tab:t,onTabChange:n,onSignOut:r,children:i}=e;const o=ee();return(0,Sr.jsxs)(Nd,{children:[(0,Sr.jsx)(Dd,{}),(0,Sr.jsxs)(Ld,{children:[(0,Sr.jsx)(Fd,{children:"\ud83e\udd5a Admin \xb7 Scrambled Legs"}),(0,Sr.jsxs)(Wd,{children:[(0,Sr.jsx)(Bd,{type:"button",onClick:()=>o("/"),children:"\u2190 Home"}),(0,Sr.jsx)(Md,{type:"button",onClick:r,children:"Sign Out"})]})]}),(0,Sr.jsxs)(zd,{children:[(0,Sr.jsx)(Ud,{type:"button",$active:"events"===t,onClick:()=>n&&n("events"),children:"Events"}),(0,Sr.jsx)(Ud,{type:"button",$active:"notifications"===t,onClick:()=>n&&n("notifications"),children:"Notifications"}),(0,Sr.jsx)(Ud,{type:"button",$active:"signups"===t,onClick:()=>n&&n("signups"),children:"Signups"}),(0,Sr.jsx)(Ud,{type:"button",$active:"users"===t,onClick:()=>n&&n("users"),children:"Users"}),(0,Sr.jsx)(Ud,{type:"button",$active:"engagement"===t,onClick:()=>n&&n("engagement"),children:"Engagement"}),(0,Sr.jsx)(Ud,{type:"button",$active:"analytics"===t,onClick:()=>n&&n("analytics"),children:"Analytics"}),(0,Sr.jsx)(Ud,{type:"button",$active:"errors"===t,onClick:()=>n&&n("errors"),children:"Errors"})]}),(0,Sr.jsx)($d,{children:i})]})},Vd=xr.div`
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
`,qd=xr.button`
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
`,Kd=xr.button`
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
`,Yd=xr.div`
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
`,Gd=xr.div`
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
`,Zd=xr.div`
  text-align: center;
  padding: 28px 16px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  color: rgba(255,255,255,0.55);
  font-size: 13px;

  .em { font-size: 30px; margin-bottom: 6px; opacity: 0.7; }
`,Qd=e=>new Intl.DateTimeFormat(void 0,{month:"short"}).format(new Date(e)).toUpperCase(),Jd=e=>new Date(e).getDate(),Xd=e=>new Intl.DateTimeFormat(void 0,{weekday:"short"}).format(new Date(e));function eu(e){const t=Array.isArray(e.tags)?e.tags.length:0,n=e.hotdogs||0,r=e.rideLeader&&e.rideLeader.name?e.rideLeader.name:null,i=[(o=e.start,new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(o)))];var o;return r&&i.push(`led by ${r}`),i.push(`${t} ${1===t?"tag":"tags"}`),i.push(`${n} \ud83c\udf2d`),i.join(" \xb7 ")}const tu=function(e){let{upcoming:t,past:n,onNew:r,onEdit:i}=e;return(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(qd,{type:"button",onClick:r,children:"+ New Event"}),(0,Sr.jsx)(Vd,{children:"Upcoming"}),0===t.length?(0,Sr.jsxs)(Zd,{children:[(0,Sr.jsx)("div",{className:"em",children:"\ud83e\udd5a"}),'Nothing on the books yet. Tap "New Event" to add one.']}):t.map((e=>(0,Sr.jsxs)(Kd,{type:"button",onClick:()=>i(e.id),children:[(0,Sr.jsxs)(Yd,{children:[(0,Sr.jsx)("div",{className:"month",children:Qd(e.start)}),(0,Sr.jsx)("div",{className:"day",children:Jd(e.start)}),(0,Sr.jsx)("div",{className:"weekday",children:Xd(e.start)})]}),(0,Sr.jsxs)(Gd,{children:[(0,Sr.jsxs)("div",{className:"name",children:[(0,Sr.jsx)("span",{children:e.name||"(untitled)"}),e.unlocked&&(0,Sr.jsx)("span",{className:"unlock-pill",title:"Visitors can open this event from the Coming Up list",children:"\ud83d\udd13 Unlocked"})]}),(0,Sr.jsx)("div",{className:"meta",children:(0,Sr.jsx)("span",{children:eu(e)})})]})]},e.id))),(0,Sr.jsx)(Vd,{children:"Past (last 10)"}),0===n.length?(0,Sr.jsx)(Zd,{children:"No past events yet."}):n.slice(0,10).map((e=>(0,Sr.jsxs)(Kd,{type:"button","data-past":"1",onClick:()=>i(e.id),children:[(0,Sr.jsxs)(Yd,{children:[(0,Sr.jsx)("div",{className:"month",children:Qd(e.start)}),(0,Sr.jsx)("div",{className:"day",children:Jd(e.start)}),(0,Sr.jsx)("div",{className:"weekday",children:Xd(e.start)})]}),(0,Sr.jsxs)(Gd,{children:[(0,Sr.jsx)("div",{className:"name",children:e.name||"(untitled)"}),(0,Sr.jsx)("div",{className:"meta",children:(0,Sr.jsx)("span",{children:eu(e)})})]})]},e.id)))]})};var nu=n(68);const ru=46.7867,iu=-92.1005,ou=xr.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,su=xr.div`
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
    filter: brightness(1.0) saturate(0.85) contrast(1.05);
  }

  & .leaflet-control-attribution {
    font-size: 9px !important;
    opacity: 0.55;
  }

  @media (max-width: 480px) {
    height: 240px;
  }
`,au=xr.div`
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
`,lu=xr.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.6);
`,cu=xr.button`
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
`,du='<div style="\n  width:18px;height:18px;border-radius:50%;\n  background:#FFC72C;border:3px solid #1a1a1a;\n  box-shadow:0 0 0 2px #FFC72C, 0 0 18px rgba(255,199,44,0.8);"></div>';const uu=function(e){let{value:n,onChange:r,doneTargetId:i}=e;const o=(0,t.useRef)(null),s=(0,t.useRef)(null),a=(0,t.useRef)(null),[l,c]=(0,t.useState)(!1);(0,t.useEffect)((()=>{let e=!1;return new Promise((e=>{if("undefined"!==typeof window&&window.L)return void e(window.L);let t=0;const n=setInterval((()=>{t++,"undefined"!==typeof window&&window.L?(clearInterval(n),e(window.L)):t>100&&(clearInterval(n),e(null))}),50)})).then((t=>{if(e||!t||!o.current)return;const i=n&&null!=n.lat&&null!=n.lng?[n.lat,n.lng]:[ru,iu],l=n&&null!=n.lat?13:11,d=t.map(o.current,{zoomControl:!0,attributionControl:!0,scrollWheelZoom:!1}).setView(i,l);t.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:19,attribution:"&copy; OpenStreetMap &copy; CARTO"}).addTo(d);const u=t.divIcon({className:"sl-yolk-pin",html:du,iconSize:[18,18],iconAnchor:[9,9]});n&&null!=n.lat&&null!=n.lng&&(a.current=t.marker([n.lat,n.lng],{icon:u}).addTo(d)),d.on("click",(e=>{const{lat:i,lng:o}=e.latlng;a.current?a.current.setLatLng([i,o]):a.current=t.marker([i,o],{icon:u}).addTo(d),r&&r({lat:i,lng:o,label:(null===n||void 0===n?void 0:n.label)||""})})),s.current=d,c(!0),setTimeout((()=>d.invalidateSize()),50)})),()=>{e=!0,s.current&&(s.current.remove(),s.current=null,a.current=null)}}),[]),(0,t.useEffect)((()=>{if(l&&s.current&&window.L)if(n&&null!=n.lat&&null!=n.lng){const e=[n.lat,n.lng];if(a.current)a.current.setLatLng(e);else{const t=window.L.divIcon({className:"sl-yolk-pin",html:du,iconSize:[18,18],iconAnchor:[9,9]});a.current=window.L.marker(e,{icon:t}).addTo(s.current)}}else a.current&&(a.current.remove(),a.current=null)}),[n,l]);const d=null===n||void 0===n?void 0:n.lat,u=null===n||void 0===n?void 0:n.lng;return(0,Sr.jsxs)(ou,{children:[(0,Sr.jsxs)(su,{children:[(0,Sr.jsx)(au,{children:"Tap map to drop pin"}),(0,Sr.jsx)("div",{ref:o,style:{width:"100%",height:"100%"}})]}),(0,Sr.jsx)(lu,{children:null!=d&&null!=u?`Pin: ${d.toFixed(5)}, ${u.toFixed(5)}`:"No pin set yet \u2014 tap the map to choose a location."}),(0,Sr.jsx)(cu,{type:"button",onClick:()=>{if(i){const e=document.getElementById(i);e&&e.scrollIntoView&&e.scrollIntoView({behavior:"smooth",block:"start"})}},children:"Done picking \u2193"})]})},hu=xr.div`
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
`,pu=xr.span`
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
`,fu=xr.button`
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
`,gu=xr.input`
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
`;const mu=function(e){let{value:n,onChange:r,placeholder:i}=e;const o=Array.isArray(n)?n:[],[s,a]=(0,t.useState)(""),l=e=>{const t=(e||"").trim();t&&(o.includes(t)||r([...o,t]),a(""))},c=e=>{const t=o.slice();t.splice(e,1),r(t)};return(0,Sr.jsxs)(hu,{children:[o.map(((e,t)=>(0,Sr.jsxs)(pu,{children:[(0,Sr.jsx)("span",{children:e}),(0,Sr.jsx)(fu,{type:"button","aria-label":`Remove ${e}`,onClick:()=>c(t),children:"\xd7"})]},`${e}-${t}`))),(0,Sr.jsx)(gu,{type:"text",value:s,onChange:e=>a(e.target.value),onKeyDown:e=>{"Enter"===e.key||","===e.key?(e.preventDefault(),l(s)):"Backspace"===e.key&&!s&&o.length&&(e.preventDefault(),c(o.length-1))},onBlur:()=>{s.trim()&&l(s)},placeholder:i||"Add a tag, then Enter (e.g., '12 mi', '850 ft')"})]})},yu={w:400,h:400,mode:"cover"},bu={w:1600,h:800,mode:"fit"};function vu(e,t){if(!e)return"No file selected";if(!e.type||!e.type.startsWith("image/"))return"File must be an image";const n="banner"===t?5242880:2097152;return e.size>n?`Image is too large (max ${(n/1024/1024).toFixed(0)}MB)`:null}async function xu(e){let{kind:t,eventId:n,file:r,onProgress:i}=e;const o=vu(r,t);if(o)throw new Error(o);const s="banner"===t?bu:yu;let a;try{a=await function(e,t){return new Promise(((n,r)=>{const i=URL.createObjectURL(e),o=new Image;o.onload=()=>{const{w:s,h:a,mode:l}=t,c=o.naturalWidth,d=o.naturalHeight;let u,h,p=0,f=0,g=c,m=d;if("cover"===l){const e=s/a;c/d>e?(m=d,g=d*e,p=(c-g)/2):(g=c,m=c/e,f=(d-m)/2),u=s,h=a}else{const e=Math.min(s/c,a/d,1);u=Math.round(c*e),h=Math.round(d*e)}const y=document.createElement("canvas");y.width=u,y.height=h,y.getContext("2d").drawImage(o,p,f,g,m,0,0,u,h);const b="image/png"===e.type?"image/png":"image/jpeg",v="image/jpeg"===b?.86:void 0;y.toBlob((e=>{URL.revokeObjectURL(i),e?n(e):r(new Error("Failed to encode resized image"))}),b,v)},o.onerror=()=>{URL.revokeObjectURL(i),r(new Error("Could not read image"))},o.src=i}))}(r,s)}catch(Cm){a=r}const l="banner"===t?"banners":"rideLeaders",c="image/png"===a.type?"png":"image/jpeg"===a.type?"jpg":function(e){const t=(e.name||"").split(".").pop();return t&&t.length<=5?t.toLowerCase():"image/png"===e.type?"png":"image/webp"===e.type?"webp":"image/gif"===e.type?"gif":"jpg"}(r),d=`${l}/${n}.${c}`,u=(0,nu.KR)(Nr.IG,d),h=(0,nu.bp)(u,a,{contentType:a.type||r.type||"image/jpeg"});return new Promise(((e,t)=>{h.on("state_changed",(e=>{i&&e.totalBytes&&i(e.bytesTransferred/e.totalBytes*100)}),(e=>t(e)),(async()=>{try{const t=await(0,nu.qk)(h.snapshot.ref);e(t)}catch(Cm){t(Cm)}}))}))}const wu=xr.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,_u=xr.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,ku=xr.div`
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
`,Su=xr.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 200px;
`,Cu=xr.button`
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
`,Eu=xr.button`
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
`,Tu=xr.div`
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow: hidden;
`,Iu=xr.div`
  width: ${e=>e.$pct||0}%;
  height: 100%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  transition: width 0.15s;
`,ju=xr.div`
  font-size: 12px;
  color: #FF8E8E;
`,Pu=xr.input`
  display: none;
`;const Au=function(e){let{kind:n,eventId:r,value:i,onChange:o,label:s}=e;const a=(0,t.useRef)(null),[l,c]=(0,t.useState)(0),[d,u]=(0,t.useState)(!1),[h,p]=(0,t.useState)(""),f="banner"===n;return(0,Sr.jsxs)(wu,{children:[(0,Sr.jsxs)(_u,{children:[(0,Sr.jsx)(ku,{$banner:f,children:i?(0,Sr.jsx)("img",{src:i,alt:s||n}):(0,Sr.jsx)("span",{style:{fontSize:22,opacity:.4},children:"\ud83e\udd5a"})}),(0,Sr.jsxs)(Su,{children:[(0,Sr.jsxs)(_u,{children:[(0,Sr.jsx)(Cu,{type:"button",onClick:()=>{r?a.current&&a.current.click():p("Save the event once before uploading images")},disabled:d,children:i?"Replace image":d?"Uploading\u2026":"Choose image"}),i&&!d&&(0,Sr.jsx)(Eu,{type:"button",onClick:()=>{o&&o(""),c(0),p("")},children:"Remove"})]}),d&&(0,Sr.jsx)(Tu,{children:(0,Sr.jsx)(Iu,{$pct:l})}),!r&&(0,Sr.jsx)("div",{style:{fontSize:11,color:"rgba(255,255,255,0.45)"},children:"Save the event first to enable image upload."}),h&&(0,Sr.jsx)(ju,{children:h})]})]}),(0,Sr.jsx)(Pu,{ref:a,type:"file",accept:"image/*",onChange:async e=>{const t=e.target.files&&e.target.files[0];if(!t)return;e.target.value="";const i=vu(t,n);if(i)p(i);else{p(""),u(!0),c(0);try{const e=await xu({kind:n,eventId:r,file:t,onProgress:e=>c(e)});o&&o(e)}catch(s){p(s.message||"Upload failed")}finally{u(!1)}}}})]})},Nu=xr.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,Ru=xr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
`,Ou=xr.button`
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
`,Du=xr.h2`
  font-family: 'Fredoka', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,Lu=xr.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px 14px;

  @media (max-width: 480px) { padding: 14px 12px; }
`,Fu=xr.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;

  &:last-child { margin-bottom: 0; }
`,Mu=xr.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
`,zu=xr.div`
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: -2px;
`,Uu="\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 12px;\n  border: 2px solid rgba(255,199,44,0.20);\n  background: rgba(255,255,255,0.06);\n  color: #f4f4f4;\n  font-family: 'Inter', sans-serif;\n  font-size: 14px;\n  transition: all 0.2s ease;\n\n  &::placeholder { color: rgba(255,255,255,0.35); }\n  &:focus {\n    outline: none;\n    border-color: #FFC72C;\n    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);\n    background: rgba(255,255,255,0.09);\n  }\n",$u=xr.input`${Uu}`,Bu=xr.textarea`
  ${Uu}
  resize: vertical;
  min-height: 96px;
  font-family: 'Inter', sans-serif;
`,Wu=xr.select`
  ${Uu}
  background: #1c1c1e;
  color-scheme: dark;
  option {
    background: #1c1c1e;
    color: #f4f4f4;
  }
`,Hu=xr.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,Vu=xr.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  user-select: none;

  input { accent-color: #FFC72C; width: 18px; height: 18px; }
`,qu=xr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
`,Ku=xr.button`
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
`,Yu=xr.button`
  background: transparent;
  border: none;
  color: #FF8E8E;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 4px;
  text-decoration: underline;

  &:hover { color: #FF6B6B; }
`,Gu=xr.div`
  width: 100%;
  font-size: 12px;
  color: #FF8E8E;
`,Zu=xr.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`,Qu=xr.div`
  width: 100%;
  max-width: 360px;
  background: #232325;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 20px 18px;
  text-align: center;
`,Ju=xr.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  margin: 0 0 6px;
  color: #f4f4f4;
`,Xu=xr.p`
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  margin: 0 0 16px;
`,eh=xr.button`
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
`,th=xr.button`
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
`;function nh(e){if(!e||isNaN(e))return"";const t=new Date(e),n=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}function rh(e){if(!e)return null;const t=Date.parse(e);return isNaN(t)?null:t}const ih=[{v:"chill",label:"Casual"},{v:"race",label:"Race pace"},{v:"work",label:"Trail work"},{v:"custom",label:"Custom"}],oh={chill:"Casual",race:"Race pace",work:"Trail work",custom:""};function sh(e){const t=e||{},n=t.start||(()=>{const e=new Date,t=(3-e.getDay()+7)%7||7;return e.setDate(e.getDate()+t),e.setHours(17,45,0,0),e.getTime()})(),r=t.startLoc||{lat:null,lng:null,label:""},i=t.endLoc||null,o=!i||i.lat===r.lat&&i.lng===r.lng;return{name:t.name||"",description:t.description||"",start:n,durationMinutes:t.durationMinutes||120,startLoc:{...r},endLoc:i?{...i}:{lat:null,lng:null,label:""},roundTrip:o,difficulty:t.difficulty||"chill",difficultyLabel:t.difficultyLabel||"",tags:Array.isArray(t.tags)?t.tags.slice():[],rideLeader:{name:t.rideLeader&&t.rideLeader.name||"",photoUrl:t.rideLeader&&t.rideLeader.photoUrl||""},bannerUrl:t.bannerUrl||"",routeUrl:t.routeUrl||"",unlocked:!!t.unlocked}}const ah=function(e){let{existing:n,onClose:r,onSaved:i,onDeleted:o}=e;const s=!n,[a,l]=(0,t.useState)((()=>sh(n))),[c,d]=(0,t.useState)(n?n.id:null),[u,h]=(0,t.useState)(!1),[p,f]=(0,t.useState)(""),[g,m]=(0,t.useState)(!1),[y,b]=(0,t.useState)(!1),[v,x]=(0,t.useState)([]),[w,_]=(0,t.useState)(!0),[k,S]=(0,t.useState)(null),[C,E]=(0,t.useState)(!1),[T,I]=(0,t.useState)(""),[j,P]=(0,t.useState)(0),A=(0,t.useRef)(null);(0,t.useEffect)((()=>{const e=(0,Ar.ref)(Nr.OO,"userProfiles"),t=(0,Ar.Zy)(e,(e=>{const t=e.val()||{},n=Object.entries(t).map((e=>{let[t,n]=e;return{uid:t,displayName:n&&n.displayName||"",email:n&&n.email||"",photoURL:n&&n.photoURL||""}})).filter((e=>!!e.displayName)).sort(((e,t)=>e.displayName.localeCompare(t.displayName)));x(n)}));return()=>t()}),[]);const N=(0,t.useMemo)((()=>{if(w)return"__manual__";if(k)return k;const e=v.find((e=>e.displayName===a.rideLeader.name));return e?e.uid:"__manual__"}),[w,k,v,a.rideLeader.name]),R=(0,t.useMemo)((()=>w||!k?null:v.find((e=>e.uid===k))||null),[w,k,v]);(0,t.useEffect)((()=>{if(!n)return _(!0),void S(null);const e=n.rideLeader&&n.rideLeader.name||"",t=n.rideLeader&&n.rideLeader.photoUrl||"";if(!e&&!t)return _(!0),void S(null);const r=v.find((t=>t.displayName===e));r?(_(!1),S(r.uid)):(_(!0),S(null))}),[n,v]),(0,t.useEffect)((()=>{l(sh(n)),d(n?n.id:null),f("")}),[n&&n.id,n&&n.updatedAt]);const O=e=>l((t=>({...t,...e}))),D=e=>l((t=>({...t,rideLeader:{...t.rideLeader,...e}}))),L=e=>l((t=>({...t,startLoc:{...t.startLoc,...e}}))),F=e=>l((t=>({...t,endLoc:{...t.endLoc,...e}}))),M=()=>{if(!a.name.trim())return"Name is required";if(!a.description.trim())return"Description is required";if(!a.start)return"Start date/time is required";if(null==a.startLoc.lat||null==a.startLoc.lng)return"Start location pin is required";if(!a.startLoc.label.trim())return"Start location label is required";if(!a.roundTrip){if(null==a.endLoc.lat||null==a.endLoc.lng)return"End location pin is required (or toggle Round trip on)";if(!a.endLoc.label.trim())return"End location label is required"}return"custom"!==a.difficulty||a.difficultyLabel.trim()?a.routeUrl&&!function(e){if(!e)return!0;try{const t=new URL(e);return"http:"===t.protocol||"https:"===t.protocol}catch{return!1}}(a.routeUrl)?"Route URL must be a valid http/https URL":null:"Custom difficulty needs a label"},z=(0,t.useMemo)((()=>a.name.trim()?a.name.trim():s?"New event":"Edit event"),[a.name,s]);return(0,Sr.jsxs)(Nu,{children:[(0,Sr.jsxs)(Ru,{children:[(0,Sr.jsx)(Ou,{type:"button",onClick:r,children:"\u2190 Back"}),(0,Sr.jsx)(Du,{children:z}),(0,Sr.jsx)("span",{style:{width:60}})]}),(0,Sr.jsxs)(Lu,{id:"event-editor-form",children:[(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{htmlFor:"ev-name",children:"Name"}),(0,Sr.jsx)($u,{id:"ev-name",type:"text",value:a.name,onChange:e=>O({name:e.target.value}),placeholder:"Lester Park Wednesday Roll"})]}),(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{htmlFor:"ev-desc",children:"Description"}),(0,Sr.jsx)(Bu,{id:"ev-desc",value:a.description,onChange:e=>O({description:e.target.value}),placeholder:"Casual social pace, ~12 miles, regroup at every fork\u2026"})]}),(0,Sr.jsxs)(Hu,{children:[(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{htmlFor:"ev-start",children:"Start date / time"}),(0,Sr.jsx)($u,{id:"ev-start",type:"datetime-local",value:nh(a.start),onChange:e=>O({start:rh(e.target.value)})}),(0,Sr.jsx)(zu,{children:"Uses your device's timezone."})]}),(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{htmlFor:"ev-dur",children:"Duration (min)"}),(0,Sr.jsx)($u,{id:"ev-dur",type:"number",min:"0",step:"15",value:a.durationMinutes,onChange:e=>O({durationMinutes:e.target.value})})]})]}),(0,Sr.jsxs)(Hu,{children:[(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{htmlFor:"ev-diff",children:"Difficulty"}),(0,Sr.jsx)(Wu,{id:"ev-diff",value:a.difficulty,onChange:e=>{const t=e.target.value;O({difficulty:t,difficultyLabel:"custom"===t?a.difficultyLabel:oh[t]||""})},children:ih.map((e=>(0,Sr.jsx)("option",{value:e.v,children:e.label},e.v)))})]}),"custom"===a.difficulty&&(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{htmlFor:"ev-diff-label",children:"Custom label"}),(0,Sr.jsx)($u,{id:"ev-diff-label",type:"text",value:a.difficultyLabel,onChange:e=>O({difficultyLabel:e.target.value}),placeholder:"Hammer / Skills / Sufferfest\u2026"})]})]}),(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{children:"Tags"}),(0,Sr.jsx)(mu,{value:a.tags,onChange:e=>O({tags:e}),placeholder:"Add a tag, then Enter (e.g., '12 mi', '850 ft')"})]})]}),(0,Sr.jsxs)(Lu,{children:[(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{children:"Start location"}),(0,Sr.jsx)(uu,{value:a.startLoc,onChange:e=>L(e),doneTargetId:"start-loc-label"})]}),(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{htmlFor:"start-loc-label",children:"Start location label"}),(0,Sr.jsx)($u,{id:"start-loc-label",type:"text",value:a.startLoc.label||"",onChange:e=>L({label:e.target.value}),placeholder:"Lester Park Trailhead"})]}),(0,Sr.jsx)(Fu,{children:(0,Sr.jsxs)(Vu,{children:[(0,Sr.jsx)("input",{type:"checkbox",checked:a.roundTrip,onChange:e=>O({roundTrip:e.target.checked})}),(0,Sr.jsx)("span",{children:"Round trip (end is same as start)"})]})}),!a.roundTrip&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{children:"End location"}),(0,Sr.jsx)(uu,{value:a.endLoc,onChange:e=>F(e),doneTargetId:"end-loc-label"})]}),(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{htmlFor:"end-loc-label",children:"End location label"}),(0,Sr.jsx)($u,{id:"end-loc-label",type:"text",value:a.endLoc.label||"",onChange:e=>F({label:e.target.value}),placeholder:"Brewer Park"})]})]})]}),(0,Sr.jsxs)(Lu,{children:[(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{htmlFor:"ev-leader-select",children:"Ride leader"}),(0,Sr.jsxs)(Wu,{id:"ev-leader-select",value:N,onChange:e=>{const t=e.target.value;if("__manual__"===t)_(!0),S(null);else{const e=v.find((e=>e.uid===t));e&&(_(!1),S(e.uid),D({name:e.displayName||"",photoUrl:e.photoURL||""}))}},children:[(0,Sr.jsx)("option",{value:"__manual__",children:"\u2014 Manual entry \u2014"}),v.map((e=>(0,Sr.jsxs)("option",{value:e.uid,children:[e.displayName,e.email?` \xb7 ${e.email}`:""]},e.uid)))]}),(0,Sr.jsx)(zu,{children:"Pick a user with a profile, or enter a guest leader manually."})]}),w&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{htmlFor:"ev-leader-name",children:"Ride leader name"}),(0,Sr.jsx)($u,{id:"ev-leader-name",type:"text",value:a.rideLeader.name,onChange:e=>D({name:e.target.value}),placeholder:"Optional"})]}),(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{children:"Ride leader photo"}),(0,Sr.jsx)(Au,{kind:"rideLeader",eventId:c,value:a.rideLeader.photoUrl,onChange:e=>D({photoUrl:e}),label:"Ride leader"})]})]}),!w&&R&&(0,Sr.jsxs)("div",{style:{display:"flex",gap:14,alignItems:"center",marginTop:4,flexWrap:"wrap"},children:[(0,Sr.jsx)("div",{style:{width:48,height:48,borderRadius:"50%",flexShrink:0,background:R.photoURL?`center/cover no-repeat url('${R.photoURL}')`:"linear-gradient(45deg, #FFC72C, #FFE66D)",color:"#1a1a1a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Fredoka, sans-serif",fontWeight:700,fontSize:22,textTransform:"uppercase",border:"2px solid rgba(255,199,44,0.40)"},children:!R.photoURL&&(R.displayName||"?").charAt(0)}),(0,Sr.jsxs)("div",{style:{flex:1,minWidth:200},children:[(0,Sr.jsx)("div",{style:{color:"#FFE66D",fontWeight:700,fontSize:13},children:R.displayName}),(0,Sr.jsx)("div",{style:{fontSize:11,color:"rgba(255,255,255,0.5)",marginBottom:6},children:R.photoURL?"Upload to replace their profile picture":"Upload photo to set their profile picture"}),(0,Sr.jsx)("button",{type:"button",disabled:C,onClick:()=>A.current&&A.current.click(),style:{padding:"8px 14px",borderRadius:10,border:"1px solid rgba(255,199,44,0.30)",background:"rgba(255,199,44,0.10)",color:"#FFE66D",fontFamily:"Inter, sans-serif",fontSize:12,fontWeight:600,cursor:C?"not-allowed":"pointer",opacity:C?.6:1},children:C?`Uploading\u2026 ${Math.round(j)}%`:R.photoURL?"Upload new photo":"Upload photo"}),T&&(0,Sr.jsx)("div",{style:{fontSize:12,color:"#FF8E8E",marginTop:6},children:T})]}),(0,Sr.jsx)("input",{ref:A,type:"file",accept:"image/*",style:{display:"none"},onChange:async e=>{const t=e.target.files&&e.target.files[0];if(e.target.value="",!t||!k)return;if(I(""),!t.type||!t.type.startsWith("image/"))return void I("File must be an image");if(t.size>2097152)return void I("Image is too large (max 2MB)");const n="image/png"===t.type?"png":"image/webp"===t.type?"webp":"image/gif"===t.type?"gif":"jpg";try{E(!0),P(0);const e=`profilePics/${k}.${n}`,r=(0,nu.KR)(Nr.IG,e),i=(0,nu.bp)(r,t,{contentType:t.type});await new Promise(((e,t)=>{i.on("state_changed",(e=>{e.totalBytes&&P(e.bytesTransferred/e.totalBytes*100)}),(e=>t(e)),(()=>e()))}));const o=await(0,nu.qk)(i.snapshot.ref);await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${k}`),{photoURL:o}),D({photoUrl:o})}catch(r){I(r&&r.message||"Upload failed")}finally{E(!1)}}})]})]}),(0,Sr.jsxs)(Lu,{children:[(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{children:"Banner image"}),(0,Sr.jsx)(Au,{kind:"banner",eventId:c,value:a.bannerUrl,onChange:e=>O({bannerUrl:e}),label:"Banner"}),(0,Sr.jsx)(zu,{children:"If set, the public widget shows the banner instead of the map preview."})]}),(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{htmlFor:"ev-route",children:"Route URL"}),(0,Sr.jsx)($u,{id:"ev-route",type:"url",value:a.routeUrl,onChange:e=>O({routeUrl:e.target.value}),placeholder:"https://www.strava.com/routes/\u2026"})]})]}),(0,Sr.jsx)(Lu,{children:(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)(Mu,{children:"Visibility"}),(0,Sr.jsxs)(Vu,{children:[(0,Sr.jsx)("input",{type:"checkbox",checked:!!a.unlocked,onChange:e=>O({unlocked:e.target.checked})}),(0,Sr.jsxs)("span",{children:["Unlock for visitors ",a.unlocked?"\ud83d\udd13":""]})]}),(0,Sr.jsx)(zu,{children:"When enabled, this event shows as a tappable card in the Coming Up list before its day arrives. Otherwise it stays locked until it becomes the next ride."})]})}),p&&(0,Sr.jsx)(Gu,{role:"alert",children:p}),(0,Sr.jsxs)(qu,{children:[!s&&c?(0,Sr.jsx)(Yu,{type:"button",onClick:()=>m(!0),children:"Delete event"}):(0,Sr.jsx)("span",{}),(0,Sr.jsx)(Ku,{type:"button",onClick:async()=>{const e=M();if(e)f(e);else{f(""),h(!0);try{const e=function(e){const t="number"===typeof e.start?e.start:0;return{name:e.name.trim(),description:e.description.trim(),start:t,durationMinutes:Number(e.durationMinutes)||120,startLoc:{lat:e.startLoc.lat,lng:e.startLoc.lng,label:(e.startLoc.label||"").trim()},endLoc:e.roundTrip?{lat:e.startLoc.lat,lng:e.startLoc.lng,label:(e.startLoc.label||"").trim()}:{lat:e.endLoc.lat,lng:e.endLoc.lng,label:(e.endLoc.label||"").trim()},difficulty:e.difficulty||"chill",difficultyLabel:"custom"===e.difficulty?(e.difficultyLabel||"").trim():e.difficultyLabel||oh[e.difficulty]||"",tags:e.tags.filter(Boolean),rideLeader:e.rideLeader.name||e.rideLeader.photoUrl?{name:e.rideLeader.name.trim(),photoUrl:e.rideLeader.photoUrl||""}:null,bannerUrl:e.bannerUrl||"",routeUrl:(e.routeUrl||"").trim(),unlocked:!!e.unlocked}}(a);if(s&&!c){const t=await async function(e){const t=Bi(),n=(0,Ar.VC)(t),r=Date.now(),i={hotdogs:0,unlocked:!1,...e,createdAt:r,updatedAt:r};return await(0,Ar.hZ)(n,i),n.key}(e);d(t),i&&i(t)}else await async function(e,t){const n={...t,updatedAt:Date.now()};await(0,Ar.yo)(Wi(e),n)}(c,e),i&&i(c)}catch(t){f(t.message||"Save failed")}finally{h(!1)}}},disabled:u,children:u?"Saving\u2026":s&&!c?"Create event":"Save changes"})]}),g&&(0,Sr.jsx)(Zu,{onClick:()=>!y&&m(!1),children:(0,Sr.jsxs)(Qu,{onClick:e=>e.stopPropagation(),children:[(0,Sr.jsx)(Ju,{children:"Delete this event?"}),(0,Sr.jsxs)(Xu,{children:["Delete ",(0,Sr.jsx)("strong",{children:a.name||"this event"}),"? This can't be undone."]}),(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(th,{type:"button",onClick:()=>m(!1),disabled:y,children:"Cancel"}),(0,Sr.jsx)(eh,{type:"button",onClick:async()=>{if(c){b(!0);try{await async function(e){await(0,Ar.TF)(Wi(e))}(c),o&&o(c)}catch(e){f(e.message||"Delete failed"),m(!1)}finally{b(!1)}}},disabled:y,children:y?"Deleting\u2026":"Delete"})]})]})})]})};const lh="https://thescrambledlegs.com/",ch=xr.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px 14px;
  margin-bottom: 16px;
`,dh=xr.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  &:last-child { margin-bottom: 0; }
`,uh=xr.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`,hh=xr.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
`,ph=xr.span`
  font-size: 11px;
  color: ${e=>e.$over?"#FF8E8E":"rgba(255,255,255,0.45)"};
  font-variant-numeric: tabular-nums;
`,fh="\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 12px;\n  border: 2px solid rgba(255,199,44,0.20);\n  background: rgba(255,255,255,0.06);\n  color: #f4f4f4;\n  font-family: 'Inter', sans-serif;\n  font-size: 14px;\n  transition: all 0.2s ease;\n\n  &::placeholder { color: rgba(255,255,255,0.35); }\n  &:focus {\n    outline: none;\n    border-color: #FFC72C;\n    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);\n    background: rgba(255,255,255,0.09);\n  }\n",gh=xr.input`${fh}`,mh=xr.textarea`${fh} resize: vertical; min-height: 84px;`,yh=xr.select`
  ${fh}
  background: #1c1c1e;
  color-scheme: dark;
  option {
    background: #1c1c1e;
    color: #f4f4f4;
  }
`,bh=xr.div`
  display: flex;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
`,vh=xr.button`
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
`,xh=xr.button`
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
`,wh=xr.div`
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: -2px;
`,_h=xr.div`
  font-size: 12px;
  color: #FF8E8E;
  margin-top: 6px;
`,kh=xr.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`,Sh=xr.div`
  width: 100%;
  max-width: 360px;
  background: #232325;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 20px 18px;
  text-align: center;
`,Ch=xr.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  margin: 0 0 6px;
  color: #f4f4f4;
`,Eh=xr.p`
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  margin: 0 0 16px;
`,Th=xr.button`
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
`,Ih=xr.button`
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
`;function jh(e){const t="ios"===(n=e.platform)?"\ud83c\udf4e":"android"===n?"\ud83e\udd16":"desktop"===n?"\ud83d\udda5":"\ud83c\udf10";var n;const r=e.lastSeenAt?Ph(e.lastSeenAt):"\u2014";if(e.email||e.displayName){return`${t} ${e.displayName||(e.email?e.email.split("@")[0]:"user")}${e.email?` \xb7 ${e.email}`:""} \xb7 ${r}`}return`${t} (anonymous device \xb7 ${i=e.hash,(i||"").slice(0,8)}) \xb7 ${function(e){if(!e)return"";const t=e.match(/\(([^)]+)\)/);return t?t[1].slice(0,40):e.slice(0,40)}(e.userAgent)} \xb7 ${r}`;var i}function Ph(e){return e?new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(e)):""}const Ah=function(e){let{onSent:n}=e;const[r,i]=(0,t.useState)(""),[o,s]=(0,t.useState)(""),[a,l]=(0,t.useState)(""),[c,d]=(0,t.useState)(""),[u,h]=(0,t.useState)("all"),[p,f]=(0,t.useState)(""),[g,m]=(0,t.useState)([]),[y,b]=(0,t.useState)([]),[v,x]=(0,t.useState)(""),[w,_]=(0,t.useState)(!1),[k,S]=(0,t.useState)(!1),[C,E]=(0,t.useState)("");(0,t.useEffect)((()=>{const e=function(e){const t=(0,Ar.ref)(Nr.OO,"fcmTokens"),n=t=>{const n=[];t.forEach((e=>{const t=e.val()||{};n.push({hash:e.key,...t})})),n.sort(((e,t)=>(t.lastSeenAt||t.createdAt||0)-(e.lastSeenAt||e.createdAt||0))),e(n)};return(0,Ar.Zy)(t,n),()=>(0,Ar.AU)(t,"value",n)}((e=>m(e))),t=Hi((e=>b(e)));return()=>{e&&e(),t&&t()}}),[]);const T=(0,t.useMemo)((()=>Vi(y).upcoming.slice(0,20)),[y]),I=r.length>50,j=o.length>150,P=!r.trim(),A=!o.trim(),N=!P&&!A&&!I&&!j&&!("test"===u&&!p)&&!k,R="test"===u?p?1:0:g.length;return(0,Sr.jsxs)("div",{children:[(0,Sr.jsxs)(ch,{children:[(0,Sr.jsxs)(dh,{children:[(0,Sr.jsxs)(uh,{children:[(0,Sr.jsx)(hh,{htmlFor:"ntf-title",children:"Title"}),(0,Sr.jsxs)(ph,{$over:I,children:[r.length,"/",50]})]}),(0,Sr.jsx)(gh,{id:"ntf-title",type:"text",value:r,onChange:e=>i(e.target.value),placeholder:"Wednesday roll moved!",maxLength:70})]}),(0,Sr.jsxs)(dh,{children:[(0,Sr.jsxs)(uh,{children:[(0,Sr.jsx)(hh,{htmlFor:"ntf-body",children:"Body"}),(0,Sr.jsxs)(ph,{$over:j,children:[o.length,"/",150]})]}),(0,Sr.jsx)(mh,{id:"ntf-body",value:o,onChange:e=>s(e.target.value),placeholder:"Meeting at Hartley instead. Same time.",maxLength:200})]}),(0,Sr.jsxs)(dh,{children:[(0,Sr.jsx)(hh,{htmlFor:"ntf-event",children:"Link to upcoming event (optional)"}),(0,Sr.jsxs)(yh,{id:"ntf-event",value:v,onChange:e=>{const t=e.target.value;x(t),t&&l(`https://thescrambledlegs.com/events/${t}`)},children:[(0,Sr.jsx)("option",{value:"",children:"\u2014 No event link \u2014"}),T.map((e=>(0,Sr.jsxs)("option",{value:e.id,children:[Ph(e.start)," \xb7 ",e.name||"(untitled)"]},e.id)))]})]}),(0,Sr.jsxs)(dh,{children:[(0,Sr.jsx)(hh,{htmlFor:"ntf-url",children:"Click URL"}),(0,Sr.jsx)(gh,{id:"ntf-url",type:"url",value:a,onChange:e=>{l(e.target.value),x("")},placeholder:lh}),(0,Sr.jsx)(wh,{children:"Defaults to the home page if blank."})]}),(0,Sr.jsxs)(dh,{children:[(0,Sr.jsx)(hh,{htmlFor:"ntf-tag",children:"Tag (optional)"}),(0,Sr.jsx)(gh,{id:"ntf-tag",type:"text",value:c,onChange:e=>d(e.target.value),placeholder:"ride-2026-04-30 (auto-generated if blank)"}),(0,Sr.jsx)(wh,{children:"Re-using a tag replaces an earlier notification on the user's device."})]})]}),(0,Sr.jsxs)(ch,{children:[(0,Sr.jsxs)(dh,{children:[(0,Sr.jsx)(hh,{children:"Send mode"}),(0,Sr.jsxs)(bh,{role:"tablist",children:[(0,Sr.jsxs)(vh,{type:"button",role:"tab",$active:"all"===u,onClick:()=>h("all"),children:["All subscribers (",g.length,")"]}),(0,Sr.jsx)(vh,{type:"button",role:"tab",$active:"test"===u,onClick:()=>h("test"),children:"Test \u2192 one device"})]})]}),"test"===u&&(0,Sr.jsxs)(dh,{children:[(0,Sr.jsx)(hh,{htmlFor:"ntf-test-token",children:"Pick a device"}),(0,Sr.jsxs)(yh,{id:"ntf-test-token",value:p,onChange:e=>f(e.target.value),children:[(0,Sr.jsx)("option",{value:"",children:"\u2014 Choose subscriber \u2014"}),g.map((e=>(0,Sr.jsx)("option",{value:e.hash,children:jh(e)},e.hash)))]}),(0,Sr.jsx)(wh,{children:"Sends only to the selected device. Useful for end-to-end QA before a real broadcast."})]}),(0,Sr.jsx)(xh,{type:"button",onClick:()=>{E(""),P||A?E("Title and body are required."):I||j?E("Title or body is too long."):"test"!==u||p?_(!0):E("Pick a device for test send.")},disabled:!N,children:k?"Sending\u2026":"test"===u?"Test send":`Send to ${g.length}`}),C&&(0,Sr.jsx)(_h,{role:"alert",children:C})]}),w&&(0,Sr.jsx)(kh,{onClick:()=>!k&&_(!1),children:(0,Sr.jsxs)(Sh,{onClick:e=>e.stopPropagation(),children:[(0,Sr.jsx)(Ch,{children:"test"===u?"Test send to one device?":`Send to ${R} subscribers?`}),(0,Sr.jsxs)(Eh,{children:[(0,Sr.jsx)("strong",{children:r||"(no title)"}),(0,Sr.jsx)("br",{}),o||"(no body)"]}),(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(Ih,{type:"button",onClick:()=>_(!1),disabled:k,children:"Cancel"}),(0,Sr.jsx)(Th,{type:"button",onClick:async()=>{S(!0),E("");try{if(!Nr.j2.currentUser)throw new Error("Not signed in.");const e=await Nr.j2.currentUser.getIdToken(),t={title:r.trim(),body:o.trim(),clickUrl:(a||lh).trim(),tag:c.trim()||void 0,testTokenHash:"test"===u?p:void 0},h=await fetch("https://us-central1-fundraiser-f0831.cloudfunctions.net/sendPush",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(t)}),f=await h.json().catch((()=>({})));if(!h.ok)throw new Error(f.error||`Send failed (${h.status}).`);const g=f.notifId;i(""),s(""),l(""),d(""),x(""),_(!1),n&&n(g)}catch(e){const t=e&&e.message||"Send failed. Check the Cloud Function logs.";E(t),_(!1)}finally{S(!1)}},disabled:k,children:k?"Sending\u2026":"Send"})]}),C&&(0,Sr.jsx)(_h,{role:"alert",children:C})]})})]})},Nh=xr.section`
  background: rgba(255,199,44,0.06);
  border: 1px solid rgba(255,199,44,0.30);
  border-radius: 16px;
  padding: 16px 14px;
  margin-bottom: 16px;
`,Rh=xr.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 16px;
  margin: 0 0 12px;
  color: #FFC72C;
`,Oh=xr.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 12px;
`,Dh=xr.div`
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
`,Lh=xr.div`
  position: relative;
  height: 8px;
  background: rgba(255,255,255,0.08);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
`,Fh=xr.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${e=>e.$pct}%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  transition: width 0.4s ease;
`,Mh=xr.div`
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
`,zh=xr.button`
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
`;const Uh=function(e){let{notifId:n,onDismiss:r}=e;const[i,o]=(0,t.useState)(null);if((0,t.useEffect)((()=>{if(!n)return;const e=function(e,t){const n=(0,Ar.ref)(Nr.OO,`notifications/${e}`),r=n=>{const r=n.val();t(r?{id:e,...r}:null)};return(0,Ar.Zy)(n,r),()=>(0,Ar.AU)(n,"value",r)}(n,o);return()=>e&&e()}),[n]),!n)return null;if(!i)return(0,Sr.jsxs)(Nh,{children:[(0,Sr.jsx)(Rh,{children:"\u2709\ufe0f Sending\u2026"}),(0,Sr.jsxs)(Mh,{$done:!1,children:[(0,Sr.jsx)("span",{children:"Waiting for first update\u2026"}),(0,Sr.jsx)("span",{className:"badge",children:"connecting"})]})]});const s=i.recipients||0,a=i.accepted||0,l=i.failed||0,c=i.opened||0,d=i.status||"sending",u="sent"===d,h=a+l,p=s>0?Math.min(100,Math.round(h/s*100)):u?100:0;return(0,Sr.jsxs)(Nh,{children:[(0,Sr.jsxs)(Rh,{children:[u?"\u2705 Done":"\u2709\ufe0f Sending\u2026"," \u2014 \u201c",i.title||"untitled","\u201d"]}),(0,Sr.jsxs)(Oh,{children:[(0,Sr.jsxs)(Dh,{children:[(0,Sr.jsx)("div",{className:"label",children:"Recipients"}),(0,Sr.jsx)("div",{className:"num",children:s})]}),(0,Sr.jsxs)(Dh,{children:[(0,Sr.jsx)("div",{className:"label",children:"Accepted"}),(0,Sr.jsx)("div",{className:"num",children:a})]}),(0,Sr.jsxs)(Dh,{children:[(0,Sr.jsx)("div",{className:"label",children:"Failed"}),(0,Sr.jsx)("div",{className:"num",children:l})]}),(0,Sr.jsxs)(Dh,{children:[(0,Sr.jsx)("div",{className:"label",children:"Opened"}),(0,Sr.jsx)("div",{className:"num",children:c})]})]}),(0,Sr.jsx)(Lh,{children:(0,Sr.jsx)(Fh,{$pct:p})}),(0,Sr.jsxs)(Mh,{$done:u,children:[(0,Sr.jsx)("span",{children:u?"Batch finished. Opens trickle in over time.":"FCM is processing\u2026"}),(0,Sr.jsx)("span",{className:"badge",children:d})]}),u&&(0,Sr.jsx)(zh,{type:"button",onClick:r,children:"Done"})]})},$h=xr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Bh=xr.div`
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
`,Wh=xr.div`
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
  overflow: hidden;
`,Hh=xr.button`
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
`,Vh=xr.div`
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
`,qh=xr.div`
  display: flex;
  gap: 6px;
  margin: 8px 0 6px;
  flex-wrap: wrap;
`,Kh=xr.button`
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
`,Yh=xr.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Gh=xr.div`
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
`,Zh=xr.div`
  text-align: center;
  padding: 28px 16px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  color: rgba(255,255,255,0.55);
  font-size: 13px;

  .em { font-size: 30px; margin-bottom: 6px; opacity: 0.7; }
`;function Qh(e){if(!e)return"\u2014";const t=new Date(e);return new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(t)}function Jh(e){const t=e.recipients||0,n=e.accepted||0,r=e.failed||0,i=e.opened||0;return`${t} sent \xb7 ${n} accepted \xb7 ${r} failed \xb7 ${i} opened (${n>0?Math.round(i/n*100):0}%)`}function Xh(e){let{notif:n}=e;const[r,i]=(0,t.useState)(!1),[o,s]=(0,t.useState)("all"),a=(0,t.useMemo)((()=>n.deliveries?Object.entries(n.deliveries).map((e=>{let[t,n]=e;return{hash:t,...n}})):[]),[n.deliveries]),l=(0,t.useMemo)((()=>"opened"===o?a.filter((e=>e.opened)):"failed"===o?a.filter((e=>"failure"===e.result)):a),[a,o]);return(0,Sr.jsxs)(Wh,{children:[(0,Sr.jsxs)(Hh,{type:"button",onClick:()=>i((e=>!e)),children:[(0,Sr.jsxs)("div",{className:"top",children:[(0,Sr.jsx)("span",{className:"ts",children:Qh(n.sentAt)}),n.isTest&&(0,Sr.jsx)("span",{className:"badge",children:"Test"})]}),(0,Sr.jsx)("div",{className:"title",children:n.title||"(untitled)"}),(0,Sr.jsx)("div",{className:"body",children:n.body||""}),(0,Sr.jsx)("div",{className:"stats",children:Jh(n)})]}),r&&(0,Sr.jsxs)(Vh,{children:[(0,Sr.jsxs)("div",{className:"pair",children:[(0,Sr.jsx)("span",{className:"k",children:"Status"}),(0,Sr.jsx)("span",{className:"v",children:n.status||"\u2014"})]}),(0,Sr.jsxs)("div",{className:"pair",children:[(0,Sr.jsx)("span",{className:"k",children:"Click URL"}),(0,Sr.jsx)("span",{className:"v",children:(0,Sr.jsx)("a",{href:n.clickUrl,target:"_blank",rel:"noreferrer",children:n.clickUrl})})]}),(0,Sr.jsxs)("div",{className:"pair",children:[(0,Sr.jsx)("span",{className:"k",children:"Tag"}),(0,Sr.jsx)("span",{className:"v",children:n.tag||"\u2014"})]}),(0,Sr.jsxs)("div",{className:"pair",children:[(0,Sr.jsx)("span",{className:"k",children:"Sent by"}),(0,Sr.jsx)("span",{className:"v",children:n.sentBy||"\u2014"})]}),(0,Sr.jsxs)(qh,{children:[(0,Sr.jsxs)(Kh,{type:"button",$active:"all"===o,onClick:()=>s("all"),children:["All (",a.length,")"]}),(0,Sr.jsxs)(Kh,{type:"button",$active:"opened"===o,onClick:()=>s("opened"),children:["Opened (",a.filter((e=>e.opened)).length,")"]}),(0,Sr.jsxs)(Kh,{type:"button",$active:"failed"===o,onClick:()=>s("failed"),children:["Failed (",a.filter((e=>"failure"===e.result)).length,")"]})]}),0===a.length?(0,Sr.jsx)(Zh,{children:"No per-device records yet."}):(0,Sr.jsx)(Yh,{children:l.map((e=>{return(0,Sr.jsxs)(Gh,{title:e.errorCode||"",children:[(0,Sr.jsx)("span",{className:"icon",children:(n=e.platform,"ios"===n?"\ud83c\udf4e":"android"===n?"\ud83e\udd16":"desktop"===n?"\ud83d\udda5":"\ud83c\udf10")}),(0,Sr.jsx)("span",{className:"hash",children:(t=e.hash,(t||"").slice(0,8))}),(0,Sr.jsxs)("span",{className:"ua",children:[e.opened?(0,Sr.jsxs)("span",{className:"opened",children:["opened ",Qh(e.openedAt)," \xb7 "]}):null,Qh(e.sentAt)]}),(0,Sr.jsx)("span",{className:"res "+("success"===e.result?"success":"failure"),children:e.result||"\u2014"})]},e.hash);var t,n}))})]})]})}const ep=function(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)(!0),[o,s]=(0,t.useState)(!1);(0,t.useEffect)((()=>{const e=function(e){const t=(0,Ar.ref)(Nr.OO,"notifications"),n=t=>{const n=[];t.forEach((e=>{const t=e.val()||{};n.push({id:e.key,...t})})),n.sort(((e,t)=>(t.sentAt||0)-(e.sentAt||0))),e(n)};return(0,Ar.Zy)(t,n),()=>(0,Ar.AU)(t,"value",n)}((e=>{n(e),i(!1)}));return()=>e&&e()}),[]);const a=(0,t.useMemo)((()=>o?e:function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:365;const n=Date.now()-864e5*t;return e.filter((e=>(e.sentAt||0)>=n))}(e,365)),[e,o]);return(0,Sr.jsxs)($h,{children:[(0,Sr.jsx)(Bh,{children:"History"}),r?(0,Sr.jsx)("div",{style:{padding:"20px 0",textAlign:"center",color:"rgba(255,255,255,0.55)"},children:"Loading\u2026"}):0===a.length?(0,Sr.jsxs)(Zh,{children:[(0,Sr.jsx)("div",{className:"em",children:"\ud83d\udced"}),"No notifications sent yet."]}):a.map((e=>(0,Sr.jsx)(Xh,{notif:e},e.id))),!r&&e.length>a.length&&(0,Sr.jsx)(Kh,{type:"button",$active:o,onClick:()=>s((e=>!e)),style:{alignSelf:"center",marginTop:8},children:o?"Last 365 days only":`Show all (${e.length})`})]})};const tp=function(){const[e,n]=(0,t.useState)(null);return(0,Sr.jsxs)("div",{children:[e&&(0,Sr.jsx)(Uh,{notifId:e,onDismiss:()=>n(null)}),(0,Sr.jsx)(Ah,{onSent:e=>n(e)}),(0,Sr.jsx)(ep,{})]})},np=xr.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`,rp=xr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`,ip=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  display: flex;
  align-items: center;
  gap: 10px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,199,44,0.30), transparent);
  }
`,op=xr.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #FFC72C;
  background: rgba(255,199,44,0.10);
  border: 1px solid rgba(255,199,44,0.25);
  padding: 4px 10px;
  border-radius: 999px;
  letter-spacing: 0;
  text-transform: none;
`,sp=xr.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s, background 0.15s;

  &:focus { border-color: rgba(255,199,44,0.45); background: rgba(255,255,255,0.07); }
  &::placeholder { color: rgba(255,255,255,0.35); }
`,ap=xr.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,199,44,0.25);
  background: rgba(255,199,44,0.10);
  color: #FFC72C;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: rgba(255,199,44,0.18); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`,lp=xr.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  overflow: hidden;
`,cp=xr.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  font-size: 13px;

  th, td {
    padding: 12px 14px;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  th {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    background: rgba(0,0,0,0.20);
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }

  th:hover { color: #FFE66D; }

  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,199,44,0.04); }

  td.name { color: #f4f4f4; font-weight: 500; }
  td.email { color: rgba(255,255,255,0.78); }
  td.email a { color: inherit; text-decoration: none; }
  td.email a:hover { color: #FFE66D; text-decoration: underline; }
  td.date { color: rgba(255,255,255,0.55); white-space: nowrap; }

  @media (max-width: 560px) {
    font-size: 12px;
    th, td { padding: 10px 10px; }
    td.date { font-size: 11px; }
  }
`,dp=xr.div`
  padding: 48px 20px;
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 14px;
  border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 14px;

  .emoji { font-size: 28px; display: block; margin-bottom: 8px; }
`,up=xr.div`
  padding: 40px 0;
  text-align: center;
  color: rgba(255,255,255,0.55);
`;function hp(e){if(!e)return"\u2014";const t=new Date(e);return new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(t)}function pp(e){const t=String(null==e?"":e);return/[",\n]/.test(t)?`"${t.replace(/"/g,'""')}"`:t}const fp=function(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)(!0),[o,s]=(0,t.useState)(""),[a,l]=(0,t.useState)("timestamp"),[c,d]=(0,t.useState)("desc");(0,t.useEffect)((()=>{const e=(0,Ar.ref)(Nr.OO,"newsletterRegistrants"),t=(0,Ar.Zy)(e,(e=>{const t=e.val()||{},r=Object.entries(t).map((e=>{let[t,n]=e;return{id:t,name:n.name||"",email:n.email||"",timestamp:n.timestamp||0}}));n(r),i(!1)}),(()=>i(!1)));return()=>t()}),[]);const u=(0,t.useMemo)((()=>{const t=o.trim().toLowerCase();let n=e;t&&(n=n.filter((e=>e.name.toLowerCase().includes(t)||e.email.toLowerCase().includes(t))));const r="asc"===c?1:-1;return n=[...n].sort(((e,t)=>{const n=e[a],i=t[a];return"number"===typeof n&&"number"===typeof i?(n-i)*r:String(n).localeCompare(String(i))*r})),n}),[e,o,a,c]),h=e=>{a===e?d("asc"===c?"desc":"asc"):(l(e),d("timestamp"===e?"desc":"asc"))},p=e=>a!==e?"":"asc"===c?" \u2191":" \u2193";return r?(0,Sr.jsx)(up,{children:"Loading signups\u2026"}):(0,Sr.jsxs)(np,{children:[(0,Sr.jsxs)(ip,{children:["Newsletter Signups ",(0,Sr.jsx)(op,{children:e.length})]}),(0,Sr.jsxs)(rp,{children:[(0,Sr.jsx)(sp,{type:"search",placeholder:"Search name or email\u2026",value:o,onChange:e=>s(e.target.value)}),(0,Sr.jsx)(ap,{type:"button",onClick:()=>function(e){const t=[["Name","Email","Submitted"].join(",")];e.forEach((e=>{t.push([pp(e.name),pp(e.email),pp(e.timestamp?new Date(e.timestamp).toISOString():"")].join(","))}));const n=new Blob([t.join("\n")],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=`scrambled-legs-signups-${(new Date).toISOString().slice(0,10)}.csv`,i.click(),setTimeout((()=>URL.revokeObjectURL(r)),500)}(u),disabled:0===u.length,children:"Export CSV"})]}),0===e.length?(0,Sr.jsxs)(dp,{children:[(0,Sr.jsx)("span",{className:"emoji",children:"\ud83d\udced"}),"No signups yet. When folks join via the form on the home page, they'll show up here."]}):0===u.length?(0,Sr.jsxs)(dp,{children:[(0,Sr.jsx)("span",{className:"emoji",children:"\ud83d\udd0d"}),'No matches for "',o,'".']}):(0,Sr.jsx)(lp,{children:(0,Sr.jsxs)(cp,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsxs)("th",{onClick:()=>h("name"),children:["Name",p("name")]}),(0,Sr.jsxs)("th",{onClick:()=>h("email"),children:["Email",p("email")]}),(0,Sr.jsxs)("th",{onClick:()=>h("timestamp"),children:["Submitted",p("timestamp")]})]})}),(0,Sr.jsx)("tbody",{children:u.map((e=>(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("td",{className:"name",children:e.name||"\u2014"}),(0,Sr.jsx)("td",{className:"email",children:e.email?(0,Sr.jsx)("a",{href:`mailto:${e.email}`,children:e.email}):"\u2014"}),(0,Sr.jsx)("td",{className:"date",children:hp(e.timestamp)})]},e.id)))})]})})]})},gp=xr.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`,mp=xr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`,yp=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  display: flex;
  align-items: center;
  gap: 10px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,199,44,0.30), transparent);
  }
`,bp=xr.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #FFC72C;
  background: rgba(255,199,44,0.10);
  border: 1px solid rgba(255,199,44,0.25);
  padding: 4px 10px;
  border-radius: 999px;
`,vp=xr.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s, background 0.15s;
  &:focus { border-color: rgba(255,199,44,0.45); background: rgba(255,255,255,0.07); }
  &::placeholder { color: rgba(255,255,255,0.35); }
`,xp=xr.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,199,44,0.25);
  background: rgba(255,199,44,0.10);
  color: #FFC72C;
  cursor: pointer;
  &:hover { background: rgba(255,199,44,0.18); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`,wp=xr.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  overflow: auto;
`,_p=xr.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  font-size: 13px;

  th, td {
    padding: 10px 12px;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    white-space: nowrap;
  }

  th {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    background: rgba(0,0,0,0.20);
    cursor: pointer;
    user-select: none;
  }

  th:hover { color: #FFE66D; }

  tr { cursor: pointer; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,199,44,0.04); }

  td.name { color: #f4f4f4; font-weight: 500; }
  td.email { color: rgba(255,255,255,0.78); }
  td.date { color: rgba(255,255,255,0.55); }
  td.num { text-align: right; font-variant-numeric: tabular-nums; }
`,kp=xr.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${e=>e.$photo?`center/cover no-repeat url('${e.$photo}')`:"linear-gradient(45deg, #FFC72C, #FFE66D)"};
  color: #1a1a1a;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
  border: 1px solid rgba(255,199,44,0.30);
`,Sp=xr.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.10em;
  text-transform: uppercase;
`,Cp=xr.div`
  padding: 48px 20px;
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 14px;
  border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 14px;
  .emoji { font-size: 28px; display: block; margin-bottom: 8px; }
`,Ep=xr.div`
  padding: 40px 0;
  text-align: center;
  color: rgba(255,255,255,0.55);
`,Tp=_r`from { opacity: 0; } to { opacity: 1; }`,Ip=_r`from { transform: translateY(100%); } to { transform: translateY(0); }`,jp=xr.div`
  position: fixed;
  inset: 0;
  z-index: 2150;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`,Pp=xr.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  pointer-events: auto;
  animation: ${Tp} 0.2s ease;
`,Ap=xr.div`
  position: relative;
  width: 100%;
  max-width: 620px;
  max-height: 92vh;
  overflow-y: auto;
  background: linear-gradient(160deg, #232325, #1a1a1a);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 20px 20px 0 0;
  padding: 0 0 26px;
  pointer-events: auto;
  animation: ${Ip} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.55);
`,Np=xr.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 40;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.10);
  color: #f4f4f4;
  cursor: pointer;
  font-size: 22px;
  &:hover { background: rgba(0,0,0,0.75); border-color: rgba(255,199,44,0.25); }
`,Rp=xr.div`
  padding: 28px 18px 0;
`,Op=xr.h2`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  margin: 0 0 16px;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,Dp=xr.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
`,Lp=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
  margin: 0 0 10px;
`,Fp=xr.button`
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FFE66D);
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 11px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover { filter: brightness(1.06); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`,Mp=xr.button`
  padding: 9px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.10); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`,zp=xr.button`
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,107,107,0.35);
  background: rgba(255,107,107,0.10);
  color: #FF8E8E;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover { background: rgba(255,107,107,0.20); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`,Up=xr.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  &:focus { border-color: #FFC72C; }
`,$p=xr.div` font-size: 12px; color: #FF8E8E; margin-top: 8px; `,Bp=xr.div` font-size: 12px; color: #FFE66D; margin-top: 8px; `,Wp=xr.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`,Hp=xr.div`
  flex: 1;
  min-width: 120px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  .v { font-family: 'Fredoka', sans-serif; font-size: 22px; color: #FFE66D; }
  .l { font-size: 11px; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.10em; }
`,Vp=xr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 13px;
  &:last-child { border-bottom: none; }
  .meta { flex: 1; min-width: 0; }
  .platform { color: #f4f4f4; font-weight: 600; }
  .when { color: rgba(255,255,255,0.50); font-size: 11px; }
`;function qp(e){if(!e)return"\u2014";const t=new Date(e);return new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(t)}function Kp(e){const t=String(null==e?"":e);return/[",\n]/.test(t)?`"${t.replace(/"/g,'""')}"`:t}function Yp(e){return!!e&&Vs.includes(e.toLowerCase())}function Gp(e){if(!e||e<0)return"\u2014";const t=Math.floor(e/1e3);if(t<60)return`${t}s`;const n=Math.floor(t/60);if(n<60)return`${n}m`;return`${Math.floor(n/60)}h ${n%60}m`}function Zp(e){let{user:n,mashByEvent:r,rsvpsByEvent:i,eventsById:o,sessions:s,analytics:a,onClose:l,onDeleted:c}=e;const[d,u]=(0,t.useState)(!1),[h,p]=(0,t.useState)(n.displayName||""),[f,g]=(0,t.useState)(!1),[m,y]=(0,t.useState)(""),[b,v]=(0,t.useState)(""),[x,w]=(0,t.useState)(!1),[_,k]=(0,t.useState)(!1),[S,C]=(0,t.useState)(!1),[E,T]=(0,t.useState)(""),[I,j]=(0,t.useState)(!1),[P,A]=(0,t.useState)(null);(0,t.useEffect)((()=>{function e(e){"Escape"===e.key&&l()}window.addEventListener("keydown",e);const t=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",e),document.body.style.overflow=t}}),[l]);const N=Yp(n.email),R=(0,t.useMemo)((()=>{const e=[];return Object.entries(r||{}).forEach((t=>{let[r,i]=t;const o=i&&i[n.uid];"number"===typeof o&&o>0&&e.push({eventId:r,mashes:o})})),e}),[r,n.uid]),O=(0,t.useMemo)((()=>{const e=[];return Object.entries(i||{}).forEach((t=>{let[r,i]=t;i&&i[n.uid]&&e.push({eventId:r,rsvp:i[n.uid]})})),e}),[i,n.uid]),D=R.reduce(((e,t)=>e+t.mashes),0),L=(0,t.useMemo)((()=>{const e=(s||[]).filter((e=>e.uid===n.uid)),t=new Set;let r=0,i=0,o=0;e.forEach((e=>{e.deviceId&&t.add(e.deviceId);const n=e.startedAt||0,s=e.endedAt||e.lastActiveAt||0;n&&s>n&&(r+=s-n,i+=1),n>o&&(o=n)}));const a=i>0?Math.round(r/i):0;return{count:e.length,avgDur:a,lastSession:o,deviceCount:t.size}}),[s,n.uid]),F=(0,t.useMemo)((()=>(a||[]).filter((e=>"page_view"===e.name&&e.uid===n.uid)).length),[a,n.uid]),M=(0,t.useMemo)((()=>O.map((e=>{const t=o[e.eventId],n=R.find((t=>t.eventId===e.eventId));return{eventId:e.eventId,name:t&&t.name||e.eventId,start:t&&t.start,mashes:n?n.mashes:0}})).sort(((e,t)=>(t.start||0)-(e.start||0)))),[O,R,o]),z=n.devices?Object.entries(n.devices):[];return(0,Sr.jsxs)(jp,{children:[(0,Sr.jsx)(Pp,{onClick:l}),(0,Sr.jsxs)(Ap,{onClick:e=>e.stopPropagation(),role:"dialog","aria-label":"User detail",children:[(0,Sr.jsx)(Np,{type:"button","aria-label":"Close",onClick:l,children:"\xd7"}),(0,Sr.jsxs)(Rp,{children:[(0,Sr.jsx)(Op,{children:"User"}),(0,Sr.jsxs)(Dp,{children:[(0,Sr.jsx)(Lp,{children:"Identity"}),(0,Sr.jsxs)("div",{style:{display:"flex",gap:14,alignItems:"center",marginBottom:12},children:[(0,Sr.jsx)(kp,{style:{width:64,height:64,fontSize:28},$photo:n.photoURL,children:!n.photoURL&&(n.displayName||n.email||"?").charAt(0)}),(0,Sr.jsx)("div",{style:{flex:1,minWidth:0},children:d?(0,Sr.jsxs)("div",{style:{display:"flex",gap:6},children:[(0,Sr.jsx)(Up,{type:"text",value:h,maxLength:30,onChange:e=>p(e.target.value)}),(0,Sr.jsx)(Fp,{type:"button",disabled:f,onClick:async()=>{y(""),v("");const e=h.trim();if(e.length<1||e.length>30)y("Name must be 1\u201330 characters");else try{g(!0),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),{displayName:e}),u(!1),v("Saved.")}catch(Cm){y(Cm&&Cm.message||"Save failed")}finally{g(!1)}},children:f?"\u2026":"Save"}),(0,Sr.jsx)(Mp,{type:"button",onClick:()=>{u(!1),p(n.displayName||"")},children:"Cancel"})]}):(0,Sr.jsxs)("div",{children:[(0,Sr.jsxs)("div",{style:{color:"#fff",fontWeight:700,fontSize:16},children:[n.displayName||"\u2014"," ",(0,Sr.jsx)("button",{type:"button",onClick:()=>{p(n.displayName||""),u(!0)},style:{background:"none",border:"none",color:"#FFC72C",cursor:"pointer",fontSize:11,marginLeft:6,textDecoration:"underline"},children:"edit"})]}),(0,Sr.jsx)("div",{style:{color:"rgba(255,255,255,0.65)",fontSize:13},children:n.email||"\u2014"}),(0,Sr.jsxs)("div",{style:{color:"rgba(255,255,255,0.45)",fontSize:11,marginTop:4},children:["Created ",qp(n.createdAt)," \xb7 Last seen ",qp(n.lastSeenAt)]})]})})]})]}),(0,Sr.jsxs)(Dp,{children:[(0,Sr.jsx)(Lp,{children:"Activity"}),(0,Sr.jsxs)(Wp,{children:[(0,Sr.jsxs)(Hp,{children:[(0,Sr.jsx)("div",{className:"v",children:D}),(0,Sr.jsx)("div",{className:"l",children:"Total mashes"})]}),(0,Sr.jsxs)(Hp,{children:[(0,Sr.jsx)("div",{className:"v",children:O.length}),(0,Sr.jsx)("div",{className:"l",children:"RSVPs"})]}),(0,Sr.jsxs)(Hp,{children:[(0,Sr.jsx)("div",{className:"v",children:z.length}),(0,Sr.jsx)("div",{className:"l",children:"Devices"})]})]}),M.length>0&&(0,Sr.jsxs)("div",{style:{marginTop:8},children:[(0,Sr.jsx)("div",{style:{fontSize:11,color:"rgba(255,255,255,0.45)",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.10em"},children:"Events"}),M.map((e=>(0,Sr.jsxs)("div",{style:{padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",fontSize:12,display:"flex",justifyContent:"space-between"},children:[(0,Sr.jsx)("span",{style:{color:"#f4f4f4"},children:e.name}),(0,Sr.jsxs)("span",{style:{color:"rgba(255,255,255,0.55)"},children:[e.mashes," mash",1===e.mashes?"":"es"]})]},e.eventId)))]})]}),(0,Sr.jsxs)(Dp,{children:[(0,Sr.jsx)(Lp,{children:"Sessions"}),(0,Sr.jsxs)(Wp,{children:[(0,Sr.jsxs)(Hp,{children:[(0,Sr.jsx)("div",{className:"v",children:L.count}),(0,Sr.jsx)("div",{className:"l",children:"Total sessions"})]}),(0,Sr.jsxs)(Hp,{children:[(0,Sr.jsx)("div",{className:"v",children:Gp(L.avgDur)}),(0,Sr.jsx)("div",{className:"l",children:"Avg duration"})]}),(0,Sr.jsxs)(Hp,{children:[(0,Sr.jsx)("div",{className:"v",children:L.deviceCount}),(0,Sr.jsx)("div",{className:"l",children:"Active devices"})]})]}),(0,Sr.jsxs)(Wp,{children:[(0,Sr.jsxs)(Hp,{children:[(0,Sr.jsx)("div",{className:"v",children:F}),(0,Sr.jsx)("div",{className:"l",children:"Page views (lifetime)"})]}),(0,Sr.jsxs)(Hp,{children:[(0,Sr.jsx)("div",{className:"v",style:{fontSize:14},children:L.lastSession?qp(L.lastSession):"\u2014"}),(0,Sr.jsx)("div",{className:"l",children:"Last session"})]})]})]}),(0,Sr.jsxs)(Dp,{children:[(0,Sr.jsx)(Lp,{children:"Devices"}),0===z.length?(0,Sr.jsx)("div",{style:{color:"rgba(255,255,255,0.45)",fontSize:13},children:"No devices registered."}):z.map((e=>{let[t,r]=e;return(0,Sr.jsxs)(Vp,{children:[(0,Sr.jsxs)("div",{className:"meta",children:[(0,Sr.jsxs)("div",{className:"platform",children:[r&&r.platform||"unknown"," ",r&&r.notificationsEnabled?"\xb7 notifications on":""]}),(0,Sr.jsxs)("div",{className:"when",children:["Last seen ",qp(r&&r.lastSeenAt)," \xb7 ",t.slice(0,8),"\u2026"]})]}),P===t?(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(zp,{type:"button",onClick:()=>(async e=>{y("");try{const t={};t[`fcmTokens/${e}`]=null,t[`userProfiles/${n.uid}/devices/${e}`]=null,await(0,Ar.yo)((0,Ar.ref)(Nr.OO),t),A(null),v("Device removed.")}catch(Cm){y(Cm&&Cm.message||"Remove failed")}})(t),children:"Confirm"}),(0,Sr.jsx)(Mp,{type:"button",onClick:()=>A(null),children:"Cancel"})]}):(0,Sr.jsx)(Mp,{type:"button",onClick:()=>A(t),children:"Remove"})]},t)}))]}),(0,Sr.jsxs)(Dp,{children:[(0,Sr.jsx)(Lp,{children:"Admin status"}),(0,Sr.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"},children:[(0,Sr.jsx)("div",{style:{flex:1,minWidth:200,fontSize:13,color:"rgba(255,255,255,0.78)"},children:N?(0,Sr.jsx)(Sr.Fragment,{children:"This is a designated admin email. Always admin (rule-locked)."}):n.isAdmin?(0,Sr.jsx)(Sr.Fragment,{children:"This user is an admin."}):(0,Sr.jsx)(Sr.Fragment,{children:"This user is not an admin."})}),!N&&(0,Sr.jsx)(Mp,{type:"button",disabled:_,onClick:async()=>{if(y(""),v(""),N)return;const e=!n.isAdmin;if(window.confirm(`${e?"Promote":"Demote"} ${n.displayName||n.email}? They will ${e?"gain":"lose"} admin access.`))try{k(!0),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),{isAdmin:e}),v("Updated.")}catch(Cm){y(Cm&&Cm.message||"Update failed")}finally{k(!1)}},children:_?"\u2026":n.isAdmin?"Demote":"Promote"})]})]}),(0,Sr.jsxs)(Dp,{children:[(0,Sr.jsx)(Lp,{children:"Actions"}),(0,Sr.jsx)("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:12},children:(0,Sr.jsx)(Fp,{type:"button",disabled:x,onClick:async()=>{if(y(""),v(""),n.email)try{w(!0),await Js(n.email),v("Password reset email sent to "+n.email)}catch(Cm){y(Cm&&Cm.message||"Send failed")}finally{w(!1)}else y("No email on file.")},children:x?"\u2026":"Send password reset"})}),S?(0,Sr.jsxs)("div",{children:[(0,Sr.jsxs)("div",{style:{fontSize:12,color:"#FF8E8E",marginBottom:8},children:["This will permanently delete the auth user, profile, RSVPs, mashes, and tokens. Type ",(0,Sr.jsx)("strong",{children:n.email})," to confirm."]}),(0,Sr.jsx)(Up,{type:"text",value:E,onChange:e=>T(e.target.value),placeholder:n.email,style:{marginBottom:8}}),(0,Sr.jsxs)("div",{style:{display:"flex",gap:8},children:[(0,Sr.jsx)(zp,{type:"button",disabled:I,onClick:async()=>{if(y(""),v(""),E.trim().toLowerCase()===(n.email||"").toLowerCase())try{if(j(!0),!Nr.j2.currentUser)throw new Error("Not signed in.");const e=await Nr.j2.currentUser.getIdToken(),t=await fetch("https://us-central1-fundraiser-f0831.cloudfunctions.net/deleteUser",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({uid:n.uid})}),r=await t.json().catch((()=>({})));if(!t.ok)throw new Error(r.error||`Delete failed (${t.status}).`);c&&c(n.uid),l()}catch(Cm){y(Cm&&Cm.message||"Delete failed")}finally{j(!1)}else y("Email confirmation does not match.")},children:I?"Deleting\u2026":"Permanently delete"}),(0,Sr.jsx)(Mp,{type:"button",disabled:I,onClick:()=>{C(!1),T("")},children:"Cancel"})]})]}):(0,Sr.jsx)(zp,{type:"button",onClick:()=>C(!0),style:{width:"100%"},children:"Delete account"}),m&&(0,Sr.jsx)($p,{children:m}),b&&(0,Sr.jsx)(Bp,{children:b})]})]})]})]})}const Qp=function(){const[e,n]=(0,t.useState)({}),[r,i]=(0,t.useState)({}),[s,a]=(0,t.useState)({}),[l,c]=(0,t.useState)({}),[d,u]=(0,t.useState)([]),[h,p]=(0,t.useState)([]),[f,g]=(0,t.useState)(!0),[m,y]=(0,t.useState)(""),[b,v]=(0,t.useState)("lastSeenAt"),[x,w]=(0,t.useState)("desc"),[_,k]=(0,t.useState)(null);(0,t.useEffect)((()=>{const e=[{path:"userProfiles",set:n},{path:"eventMashTotals",set:i},{path:"rsvps",set:a},{path:"events",set:c}].map((e=>{let{path:t,set:n}=e;const r=(0,Ar.ref)(Nr.OO,t);return(0,Ar.Zy)(r,(e=>{n(e.val()||{}),"userProfiles"===t&&g(!1)}),(()=>{"userProfiles"===t&&g(!1)}))}));return()=>e.forEach((e=>e&&e()))}),[]),(0,t.useEffect)((()=>{const e=(0,Ar.P)((0,Ar.ref)(Nr.OO,"sessions"),(0,Ar.kT)("startedAt"),(0,Ar.$1)(1e3)),t=(0,Ar.Zy)(e,(e=>{const t=[];e.forEach((e=>t.push({key:e.key,...e.val()||{}}))),u(t)}),(()=>u([]))),n=(0,Ar.P)((0,Ar.ref)(Nr.OO,"analyticsEvents"),(0,Ar.kT)("ts"),(0,Ar.$1)(1e3)),r=(0,Ar.Zy)(n,(e=>{const t=[];e.forEach((e=>t.push({id:e.key,...e.val()||{}}))),p(t)}),(()=>p([])));return()=>{t(),r()}}),[]);const S=(0,t.useMemo)((()=>Object.entries(e).map((e=>{let[t,n]=e;const i=n||{};let o=0;Object.values(r||{}).forEach((e=>{const n=e&&e[t];"number"===typeof n&&(o+=n)}));let a=0;Object.values(s||{}).forEach((e=>{e&&e[t]&&(a+=1)}));const l=i.devices?Object.keys(i.devices).length:0,c=!0===i.isAdmin||Yp(i.email);return{uid:t,email:i.email||"",displayName:i.displayName||"",photoURL:i.photoURL||"",createdAt:i.createdAt||0,lastSeenAt:i.lastSeenAt||0,isAdmin:c,devices:i.devices||null,mashTotal:o,rsvpCount:a,deviceCount:l}}))),[e,r,s]),C=(0,t.useMemo)((()=>{const e=m.trim().toLowerCase();let t=S;e&&(t=t.filter((t=>t.displayName.toLowerCase().includes(e)||t.email.toLowerCase().includes(e))));const n="asc"===x?1:-1;return t=[...t].sort(((e,t)=>{const r=e[b],i=t[b];return"number"===typeof r&&"number"===typeof i?(r-i)*n:String(r||"").localeCompare(String(i||""))*n})),t}),[S,m,b,x]),E=e=>{if(b===e)w("asc"===x?"desc":"asc");else{v(e);w(["mashTotal","rsvpCount","deviceCount","lastSeenAt","createdAt"].includes(e)?"desc":"asc")}},T=e=>b===e?"asc"===x?" \u2191":" \u2193":"",I=_?S.find((e=>e.uid===_)):null;return f?(0,Sr.jsx)(Ep,{children:"Loading users\u2026"}):(0,Sr.jsxs)(gp,{children:[(0,Sr.jsxs)(yp,{children:["Users ",(0,Sr.jsx)(bp,{children:S.length})]}),(0,Sr.jsxs)(mp,{children:[(0,Sr.jsx)(vp,{type:"search",placeholder:"Search name or email\u2026",value:m,onChange:e=>y(e.target.value)}),(0,Sr.jsx)(xp,{type:"button",onClick:()=>function(e){const t=[["UID","Name","Email","IsAdmin","Mash Total","RSVPs","Devices","Created","Last Seen"].join(",")];e.forEach((e=>{t.push([Kp(e.uid),Kp(e.displayName),Kp(e.email),Kp(e.isAdmin?"yes":""),Kp(e.mashTotal),Kp(e.rsvpCount),Kp(e.deviceCount),Kp(e.createdAt?new Date(e.createdAt).toISOString():""),Kp(e.lastSeenAt?new Date(e.lastSeenAt).toISOString():"")].join(","))}));const n=new Blob([t.join("\n")],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=`scrambled-legs-users-${(new Date).toISOString().slice(0,10)}.csv`,i.click(),setTimeout((()=>URL.revokeObjectURL(r)),500)}(C),disabled:0===C.length,children:"Export CSV"})]}),0===S.length?(0,Sr.jsxs)(Cp,{children:[(0,Sr.jsx)("span",{className:"emoji",children:"\ud83d\udc65"}),"No user profiles yet."]}):0===C.length?(0,Sr.jsxs)(Cp,{children:[(0,Sr.jsx)("span",{className:"emoji",children:"\ud83d\udd0d"}),'No matches for "',m,'".']}):(0,Sr.jsx)(wp,{children:(0,Sr.jsxs)(_p,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("th",{}),(0,Sr.jsxs)("th",{onClick:()=>E("displayName"),children:["Name",T("displayName")]}),(0,Sr.jsxs)("th",{onClick:()=>E("email"),children:["Email",T("email")]}),(0,Sr.jsxs)("th",{onClick:()=>E("mashTotal"),children:["Mashes",T("mashTotal")]}),(0,Sr.jsxs)("th",{onClick:()=>E("rsvpCount"),children:["RSVPs",T("rsvpCount")]}),(0,Sr.jsxs)("th",{onClick:()=>E("deviceCount"),children:["Devices",T("deviceCount")]}),(0,Sr.jsxs)("th",{onClick:()=>E("lastSeenAt"),children:["Last seen",T("lastSeenAt")]}),(0,Sr.jsx)("th",{})]})}),(0,Sr.jsx)("tbody",{children:C.map((e=>(0,Sr.jsxs)("tr",{onClick:()=>k(e.uid),children:[(0,Sr.jsx)("td",{children:(0,Sr.jsx)(kp,{$photo:e.photoURL,children:!e.photoURL&&(e.displayName||e.email||"?").charAt(0)})}),(0,Sr.jsx)("td",{className:"name",children:e.displayName||"\u2014"}),(0,Sr.jsx)("td",{className:"email",children:e.email||"\u2014"}),(0,Sr.jsx)("td",{className:"num",children:e.mashTotal}),(0,Sr.jsx)("td",{className:"num",children:e.rsvpCount}),(0,Sr.jsx)("td",{className:"num",children:e.deviceCount}),(0,Sr.jsx)("td",{className:"date",children:qp(e.lastSeenAt)}),(0,Sr.jsx)("td",{children:e.isAdmin&&(0,Sr.jsx)(Sp,{children:"Admin"})})]},e.uid)))})]})}),I&&o.createPortal((0,Sr.jsx)(Zp,{user:I,mashByEvent:r,rsvpsByEvent:s,eventsById:l,sessions:d,analytics:h,onClose:()=>k(null),onDeleted:()=>k(null)}),document.body)]})},Jp=xr.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,Xp=xr.div`
  display: flex;
  gap: 6px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 4px;
  flex-wrap: wrap;
`,ef=xr.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 10px 12px;
  border: none;
  background: transparent;
  color: ${e=>e.$active?"#FFC72C":"rgba(255,255,255,0.55)"};
  border-bottom: 2px solid ${e=>e.$active?"#FFC72C":"transparent"};
  margin-bottom: -1px;
  cursor: pointer;
  &:hover { color: #FFE66D; }
`,tf=xr.section`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 14px;
`,nf=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 10px;
`,rf=xr.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.10);
  background: #1c1c1e;
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  margin-bottom: 14px;
  color-scheme: dark;
`,of=xr.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  th, td {
    padding: 8px 10px;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    vertical-align: top;
  }
  th {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }
  td { color: rgba(255,255,255,0.85); }
  td.num { text-align: right; font-variant-numeric: tabular-nums; }
`,sf=xr.button`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,199,44,0.25);
  background: rgba(255,199,44,0.10);
  color: #FFC72C;
  cursor: pointer;
  margin-bottom: 8px;
  &:hover { background: rgba(255,199,44,0.18); }
`,af=xr.div`
  padding: 20px;
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 12px;
`;function lf(e){return e?new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(e)):"\u2014"}function cf(e){const t=String(null==e?"":e);return/[",\n]/.test(t)?`"${t.replace(/"/g,'""')}"`:t}function df(e,t,n){const r=[t.map(cf).join(",")];n.forEach((e=>r.push(e.map(cf).join(","))));const i=new Blob([r.join("\n")],{type:"text/csv;charset=utf-8"}),o=URL.createObjectURL(i),s=document.createElement("a");s.href=o,s.download=e,s.click(),setTimeout((()=>URL.revokeObjectURL(o)),500)}function uf(e){let{events:n}=e;const[r,i]=(0,t.useState)(""),[o,s]=(0,t.useState)({}),[a,l]=(0,t.useState)({}),[c,d]=(0,t.useState)({}),[u,h]=(0,t.useState)({});(0,t.useEffect)((()=>{const e=(0,Ar.ref)(Nr.OO,"userProfiles"),t=(0,Ar.Zy)(e,(e=>h(e.val()||{})));return()=>t()}),[]),(0,t.useEffect)((()=>{if(!r)return s({}),l({}),void d({});const e=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,`rsvps/${r}`),(e=>s(e.val()||{}))),t=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,`eventMashTotals/${r}`),(e=>l(e.val()||{}))),n=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,`mashSessions/${r}`),(e=>d(e.val()||{})));return()=>{e(),t(),n()}}),[r]);const p=n.find((e=>e.id===r)),f=p&&p.hotdogs||0,g=(0,t.useMemo)((()=>Object.values(a).reduce(((e,t)=>e+(t||0)),0)),[a]),m=Math.max(0,f-g),y=(0,t.useMemo)((()=>Object.entries(o).map((e=>{let[t,n]=e;return{uid:t,name:n&&n.displayName||u[t]&&u[t].displayName||t.slice(0,6),email:n&&n.email||u[t]&&u[t].email||"",rsvpedAt:n&&n.rsvpedAt||0,mashes:a[t]||0,sessionCount:c[t]&&Object.keys(c[t]).length||0}})).sort(((e,t)=>t.mashes-e.mashes||e.rsvpedAt-t.rsvpedAt))),[o,a,c,u]),b=(0,t.useMemo)((()=>Object.entries(a).filter((e=>{let[t,n]=e;return!o[t]&&(n||0)>=10})).map((e=>{let[t,n]=e;return{uid:t,name:u[t]&&u[t].displayName||t.slice(0,6),email:u[t]&&u[t].email||"",mashes:n}})).sort(((e,t)=>t.mashes-e.mashes))),[a,o,u]);return(0,Sr.jsx)("div",{children:(0,Sr.jsxs)(tf,{children:[(0,Sr.jsx)(nf,{children:"Pick an event"}),(0,Sr.jsxs)(rf,{value:r,onChange:e=>i(e.target.value),children:[(0,Sr.jsx)("option",{value:"",children:"\u2014 Choose event \u2014"}),n.map((e=>(0,Sr.jsxs)("option",{value:e.id,children:[lf(e.start)," \xb7 ",e.name||"(untitled)"]},e.id)))]}),r&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(nf,{children:["RSVPs \xb7 ",y.length," \xb7 Anonymous mashes: ",m]}),(0,Sr.jsx)(sf,{type:"button",onClick:()=>df(`engagement-rsvps-${r}.csv`,["Name","Email","RSVP at","Mashes","Sessions"],y.map((e=>[e.name,e.email,e.rsvpedAt?new Date(e.rsvpedAt).toISOString():"",e.mashes,e.sessionCount]))),children:"Export CSV"}),0===y.length?(0,Sr.jsx)(af,{children:"No RSVPs yet."}):(0,Sr.jsxs)(of,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("th",{children:"Name"}),(0,Sr.jsx)("th",{children:"Email"}),(0,Sr.jsx)("th",{children:"RSVP at"}),(0,Sr.jsx)("th",{className:"num",children:"Mashes"}),(0,Sr.jsx)("th",{className:"num",children:"Sessions"})]})}),(0,Sr.jsx)("tbody",{children:y.map((e=>(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("td",{children:e.name}),(0,Sr.jsx)("td",{children:e.email}),(0,Sr.jsx)("td",{children:lf(e.rsvpedAt)}),(0,Sr.jsx)("td",{className:"num",children:e.mashes}),(0,Sr.jsx)("td",{className:"num",children:e.sessionCount})]},e.uid)))})]}),(0,Sr.jsxs)(nf,{style:{marginTop:16},children:["Bad Eggs \xb7 ",b.length]}),0===b.length?(0,Sr.jsx)(af,{children:"None."}):(0,Sr.jsxs)(of,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("th",{children:"Name"}),(0,Sr.jsx)("th",{children:"Email"}),(0,Sr.jsx)("th",{className:"num",children:"Mashes"})]})}),(0,Sr.jsx)("tbody",{children:b.map((e=>(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("td",{children:e.name}),(0,Sr.jsx)("td",{children:e.email}),(0,Sr.jsx)("td",{className:"num",children:e.mashes})]},e.uid)))})]})]})]})})}function hf(){const[e,n]=(0,t.useState)({}),[r,i]=(0,t.useState)({}),[o,s]=(0,t.useState)({});(0,t.useEffect)((()=>{const e=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"userProfiles"),(e=>n(e.val()||{}))),t=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"eventMashTotals"),(e=>i(e.val()||{}))),r=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"rsvps"),(e=>s(e.val()||{})));return()=>{e(),t(),r()}}),[]);const a=(0,t.useMemo)((()=>{const t={};return Object.entries(e).forEach((e=>{let[n,r]=e;t[n]={uid:n,name:r.displayName||n.slice(0,6),email:r.email||"",lastSeenAt:r.lastSeenAt||0,lifetimeMashes:0,rsvpCount:0}})),Object.values(r).forEach((e=>{Object.entries(e||{}).forEach((e=>{let[n,r]=e;t[n]||(t[n]={uid:n,name:n.slice(0,6),email:"",lastSeenAt:0,lifetimeMashes:0,rsvpCount:0}),t[n].lifetimeMashes+=r||0}))})),Object.values(o).forEach((e=>{Object.keys(e||{}).forEach((e=>{t[e]||(t[e]={uid:e,name:e.slice(0,6),email:"",lastSeenAt:0,lifetimeMashes:0,rsvpCount:0}),t[e].rsvpCount+=1}))})),Object.values(t).sort(((e,t)=>t.lifetimeMashes-e.lifetimeMashes))}),[e,r,o]);return(0,Sr.jsxs)(tf,{children:[(0,Sr.jsxs)(nf,{children:["Users \xb7 ",a.length]}),(0,Sr.jsx)(sf,{type:"button",onClick:()=>df("engagement-users.csv",["Name","Email","Lifetime mashes","RSVP count","Last seen"],a.map((e=>[e.name,e.email,e.lifetimeMashes,e.rsvpCount,e.lastSeenAt?new Date(e.lastSeenAt).toISOString():""]))),children:"Export CSV"}),0===a.length?(0,Sr.jsx)(af,{children:"No users yet."}):(0,Sr.jsxs)(of,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("th",{children:"Name"}),(0,Sr.jsx)("th",{children:"Email"}),(0,Sr.jsx)("th",{className:"num",children:"Lifetime \ud83c\udf2d"}),(0,Sr.jsx)("th",{className:"num",children:"RSVPs"}),(0,Sr.jsx)("th",{children:"Last seen"})]})}),(0,Sr.jsx)("tbody",{children:a.map((e=>(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("td",{children:e.name}),(0,Sr.jsx)("td",{children:e.email}),(0,Sr.jsx)("td",{className:"num",children:e.lifetimeMashes}),(0,Sr.jsx)("td",{className:"num",children:e.rsvpCount}),(0,Sr.jsx)("td",{children:lf(e.lastSeenAt)})]},e.uid)))})]})]})}function pf(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)({});return(0,t.useEffect)((()=>{const e=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"userProfiles"),(e=>i(e.val()||{}))),t=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"mashSessions"),(e=>{const t=[],r=e.val()||{};Object.entries(r).forEach((e=>{let[n,r]=e;Object.entries(r||{}).forEach((e=>{let[r,i]=e;Object.entries(i||{}).forEach((e=>{let[i,o]=e;t.push({sid:i,eventId:n,uid:r,...o})}))}))})),t.sort(((e,t)=>(t.endedAt||0)-(e.endedAt||0))),n(t.slice(0,50))}));return()=>{e(),t()}}),[]),(0,Sr.jsxs)(tf,{children:[(0,Sr.jsx)(nf,{children:"Recent sessions \xb7 last 50"}),(0,Sr.jsx)(sf,{type:"button",onClick:()=>df("engagement-sessions.csv",["User","Event","Started","Ended","Count"],e.map((e=>[r[e.uid]&&r[e.uid].displayName||e.uid.slice(0,6),e.eventId,e.startedAt?new Date(e.startedAt).toISOString():"",e.endedAt?new Date(e.endedAt).toISOString():"",e.count||0]))),children:"Export CSV"}),0===e.length?(0,Sr.jsx)(af,{children:"No sessions logged yet."}):(0,Sr.jsxs)(of,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("th",{children:"User"}),(0,Sr.jsx)("th",{children:"Event"}),(0,Sr.jsx)("th",{children:"Ended"}),(0,Sr.jsx)("th",{className:"num",children:"Count"})]})}),(0,Sr.jsx)("tbody",{children:e.map((e=>(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("td",{children:r[e.uid]&&r[e.uid].displayName||e.uid.slice(0,6)}),(0,Sr.jsxs)("td",{children:[e.eventId.slice(0,8),"\u2026"]}),(0,Sr.jsx)("td",{children:lf(e.endedAt)}),(0,Sr.jsx)("td",{className:"num",children:e.count||0})]},e.sid)))})]})]})}function ff(){const[e,n]=(0,t.useState)("per-event"),[r,i]=(0,t.useState)([]);return(0,t.useEffect)((()=>{const e=Hi((e=>i(e)));return()=>e&&e()}),[]),(0,Sr.jsxs)(Jp,{children:[(0,Sr.jsxs)(Xp,{children:[(0,Sr.jsx)(ef,{type:"button",$active:"per-event"===e,onClick:()=>n("per-event"),children:"Per-event"}),(0,Sr.jsx)(ef,{type:"button",$active:"users"===e,onClick:()=>n("users"),children:"Users"}),(0,Sr.jsx)(ef,{type:"button",$active:"sessions"===e,onClick:()=>n("sessions"),children:"Recent sessions"})]}),"per-event"===e&&(0,Sr.jsx)(uf,{events:r}),"users"===e&&(0,Sr.jsx)(hf,{}),"sessions"===e&&(0,Sr.jsx)(pf,{})]})}const gf=xr.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,mf=xr.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
`,yf=xr.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 14px;
  text-align: left;
`,bf=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 6px;
`,vf=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #FFC72C;
  font-variant-numeric: tabular-nums;
`,xf=xr.div`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: 4px;
`,wf=xr.section`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 14px;
`,_f=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
  margin-bottom: 10px;
`,kf=xr.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.10);
  background: #1c1c1e;
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  margin-bottom: 14px;
  color-scheme: dark;
`,Sf=xr.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 120px;
  padding: 0 0 4px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
`,Cf=xr.div`
  flex: 1;
  background: linear-gradient(180deg, #FFE66D, #FFC72C);
  border-radius: 4px 4px 0 0;
  min-height: 2px;
  position: relative;
  transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
`,Ef=xr.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: rgba(255,255,255,0.40);
`,Tf=xr.div`
  flex: 1;
  text-align: center;
`,If=xr.div`
  max-height: 400px;
  overflow-y: auto;
`,jf=xr.div`
  display: flex;
  gap: 10px;
  padding: 6px 4px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  &:last-child { border-bottom: none; }
`,Pf=xr.div`
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  white-space: nowrap;
  flex-shrink: 0;
  width: 90px;
`,Af=xr.div`
  font-weight: 600;
  color: #FFE66D;
  flex-shrink: 0;
`,Nf=xr.div`
  flex: 1;
  color: rgba(255,255,255,0.65);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Rf=xr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
`,Of=xr.div`
  flex: 0 0 200px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.85);
`,Df=xr.div`
  flex: 1;
  height: 18px;
  background: rgba(255,255,255,0.06);
  border-radius: 4px;
  overflow: hidden;
`,Lf=xr.div`
  height: 100%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  width: ${e=>e.$pct}%;
  transition: width 0.3s;
`,Ff=xr.div`
  flex: 0 0 110px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  text-align: right;
  font-variant-numeric: tabular-nums;
`,Mf=xr.div`
  padding: 20px;
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 12px;
`;function zf(e){return e?new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(e)):"\u2014"}function Uf(e){if(!e||e<0)return"\u2014";const t=Math.floor(e/1e3);if(t<60)return`${t}s`;const n=Math.floor(t/60);if(n<60)return`${n}m ${t%60}s`;return`${Math.floor(n/60)}h ${n%60}m`}function $f(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)({}),[o,s]=(0,t.useState)({}),[a,l]=(0,t.useState)({}),[c,d]=(0,t.useState)({}),[u,h]=(0,t.useState)([]),[p,f]=(0,t.useState)(""),[g,m]=(0,t.useState)([]),[y,b]=(0,t.useState)("");(0,t.useEffect)((()=>{const e=(0,Ar.P)((0,Ar.ref)(Nr.OO,"analyticsEvents"),(0,Ar.kT)("ts"),(0,Ar.$1)(1e3)),t=(0,Ar.Zy)(e,(e=>{const t=[];e.forEach((e=>t.push({id:e.key,...e.val()||{}}))),t.sort(((e,t)=>(t.ts||0)-(e.ts||0))),n(t)}));return()=>t()}),[]),(0,t.useEffect)((()=>{const e=(0,Ar.P)((0,Ar.ref)(Nr.OO,"sessions"),(0,Ar.kT)("startedAt"),(0,Ar.$1)(1e3)),t=(0,Ar.Zy)(e,(e=>{const t=[];e.forEach((e=>t.push({key:e.key,...e.val()||{}}))),t.sort(((e,t)=>(t.startedAt||0)-(e.startedAt||0))),m(t)}),(()=>m([])));return()=>t()}),[]),(0,t.useEffect)((()=>{const e=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"userProfiles"),(e=>i(e.val()||{}))),t=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"fcmTokens"),(e=>s(e.val()||{}))),n=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"eventMashTotals"),(e=>l(e.val()||{}))),r=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"rsvps"),(e=>d(e.val()||{}))),o=Hi((e=>h(e)));return()=>{e(),t(),n(),r&&r(),o&&o()}}),[]);const v=(0,t.useMemo)((()=>{const e=Date.now(),t=e-864e5,n=e-6048e5,r=e-2592e6,i=e-3e5;let o=0,s=0,a=0,l=0,c=0,d=0,u=0;g.forEach((e=>{const h=e.startedAt||0;h>=t&&(o+=1),h>=n&&(s+=1),h>=r&&(a+=1),(e.lastActiveAt||0)>=i&&(l+=1);const p=e.endedAt||e.lastActiveAt||0;h&&p&&p>h&&(c+=p-h,d+=1),u+=e.eventCount||0}));const h=d>0?Math.round(c/d):0,p=g.length>0?u/g.length:0;return{today:o,week:s,month:a,active:l,avgDurMs:h,avgEvents:p,total:g.length}}),[g]),x=(0,t.useMemo)((()=>{const e=Date.now()-6048e5,t={};g.forEach((n=>{if((n.startedAt||0)<e)return;const r=n.uid||`anon:${n.deviceId||n.key}`;t[r]=(t[r]||0)+1}));let n=0,r=0,i=0;Object.values(t).forEach((e=>{1===e?n+=1:e>=2&&e<=5?r+=1:e>=6&&(i+=1)}));const o=n+r+i,s=e=>o>0?Math.round(e/o*100):0;return{one:n,twoFive:r,sixPlus:i,total:o,pctOne:s(n),pctTwoFive:s(r),pctSixPlus:s(i)}}),[g]),w=(0,t.useMemo)((()=>{const t=Date.now()-6048e5,n={};return e.forEach((e=>{if("page_view"!==e.name)return;if((e.ts||0)<t)return;const r=e.props&&e.props.path||e.path||"/";n[r]=(n[r]||0)+1})),Object.entries(n).map((e=>{let[t,n]=e;return{path:t,count:n}})).sort(((e,t)=>t.count-e.count)).slice(0,10)}),[e]),_=(0,t.useMemo)((()=>{const e={};return g.forEach((t=>{const n=t.deviceId;if(!n)return;e[n]||(e[n]={uids:new Set,lastSeen:0,sessions:0}),t.uid&&e[n].uids.add(t.uid),e[n].sessions+=1;const r=t.lastActiveAt||t.startedAt||0;r>e[n].lastSeen&&(e[n].lastSeen=r)})),Object.entries(e).map((e=>{let[t,n]=e;return{deviceId:t,uidCount:n.uids.size,sessions:n.sessions,lastSeen:n.lastSeen}})).sort(((e,t)=>t.lastSeen-e.lastSeen)).slice(0,20)}),[g]),k=(0,t.useMemo)((()=>{if(!y)return[];const t=g.filter((e=>e.uid===y)).sort(((e,t)=>(t.startedAt||0)-(e.startedAt||0))).slice(0,25);return t.map((t=>{const n=t.id||t.key,r=e.filter((e=>"page_view"===e.name&&e.sessionId===n)).map((e=>e.props&&e.props.path||e.path||"/")).reverse(),i=t.startedAt||0,o=t.endedAt||t.lastActiveAt||0;return{sid:n,startedAt:i,durationMs:i&&o>i?o-i:0,eventCount:t.eventCount||0,pages:r}}))}),[g,e,y]),S=(0,t.useMemo)((()=>{const t=Date.now()-6048e5;let n=0;Object.values(c).forEach((e=>{Object.values(e||{}).forEach((e=>{(e&&e.rsvpedAt)>=t&&(n+=1)}))}));let i=0;Object.values(a).forEach((e=>{Object.values(e||{}).forEach((e=>{i+=e||0}))}));let s=0;u.forEach((e=>{s+=e.hotdogs||0}));const l=Math.max(0,s-i),d=Object.keys(o).length,h=e.filter((e=>"home_view"===e.name)).length,p=h>0?Math.round(d/h*100):0,f=e.filter((e=>"pwa_installed"===e.name)).length;return{users:Object.keys(r).length,rsvpsThisWeek:n,signedInMashes:i,anonMashes:l,subscribedDevices:d,optInRate:p,pwaInstalls:f}}),[r,o,a,c,u,e]),C=(0,t.useMemo)((()=>{if(!p)return[];const t=e.filter((e=>"mash_session_complete"===e.name&&e.props&&e.props.eventId===p)),n=new Array(7).fill(0),r=Date.now();t.forEach((e=>{const t=r-(e.ts||0),i=Math.floor(t/864e5);i>=0&&i<7&&(n[6-i]+=e.props.count||0)}));const i=Math.max(1,...n);return n.map((e=>({value:e,pct:e/i*100})))}),[e,p]),E=(0,t.useMemo)((()=>p?Object.keys(c[p]||{}).length:0),[c,p]),T=(0,t.useMemo)((()=>{const t={home_view:e.filter((e=>"home_view"===e.name)).length,mash_session_complete:e.filter((e=>"mash_session_complete"===e.name)).length,signup_completed:e.filter((e=>"signup_completed"===e.name)).length,signin_completed:e.filter((e=>"signin_completed"===e.name)).length,rsvp_added:e.filter((e=>"rsvp_added"===e.name)).length},n=Math.max(1,t.home_view);return[{label:"Home view",count:t.home_view,pct:100},{label:"Mash session",count:t.mash_session_complete,pct:t.mash_session_complete/n*100},{label:"Account created",count:t.signup_completed,pct:t.signup_completed/n*100},{label:"Sign in",count:t.signin_completed,pct:t.signin_completed/n*100},{label:"RSVP added",count:t.rsvp_added,pct:t.rsvp_added/n*100}]}),[e]),I=(0,t.useMemo)((()=>{const e={};return Object.values(a).forEach((t=>{Object.entries(t||{}).forEach((t=>{let[n,r]=t;e[n]=(e[n]||0)+(r||0)}))})),Object.entries(e).map((e=>{let[t,n]=e;return{uid:t,count:n,name:r[t]&&r[t].displayName||t.slice(0,6)}})).sort(((e,t)=>t.count-e.count)).slice(0,10)}),[a,r]),j=(0,t.useMemo)((()=>{const e={};return Object.values(c).forEach((t=>{Object.keys(t||{}).forEach((t=>{e[t]=(e[t]||0)+1}))})),Object.entries(e).map((e=>{let[t,n]=e;return{uid:t,count:n,name:r[t]&&r[t].displayName||t.slice(0,6)}})).sort(((e,t)=>t.count-e.count)).slice(0,10)}),[c,r]),P=e.slice(0,50),A=(0,t.useMemo)((()=>{const e=new Set;return g.forEach((t=>{t.uid&&e.add(t.uid)})),Array.from(e).map((e=>({uid:e,name:r[e]&&r[e].displayName||r[e]&&r[e].email||e.slice(0,6)}))).sort(((e,t)=>e.name.localeCompare(t.name)))}),[g,r]);return(0,Sr.jsxs)(gf,{children:[(0,Sr.jsxs)(mf,{children:[(0,Sr.jsxs)(yf,{children:[(0,Sr.jsx)(bf,{children:"Signed-in users"}),(0,Sr.jsx)(vf,{children:S.users})]}),(0,Sr.jsxs)(yf,{children:[(0,Sr.jsx)(bf,{children:"RSVPs this week"}),(0,Sr.jsx)(vf,{children:S.rsvpsThisWeek})]}),(0,Sr.jsxs)(yf,{children:[(0,Sr.jsx)(bf,{children:"Mashes (signed-in)"}),(0,Sr.jsx)(vf,{children:S.signedInMashes}),(0,Sr.jsxs)(xf,{children:["Anon: ",S.anonMashes]})]}),(0,Sr.jsxs)(yf,{children:[(0,Sr.jsx)(bf,{children:"Notif opt-in"}),(0,Sr.jsxs)(vf,{children:[S.optInRate,"%"]}),(0,Sr.jsxs)(xf,{children:[S.subscribedDevices," devices"]})]}),(0,Sr.jsxs)(yf,{children:[(0,Sr.jsx)(bf,{children:"PWA installs"}),(0,Sr.jsx)(vf,{children:S.pwaInstalls})]})]}),(0,Sr.jsxs)(mf,{children:[(0,Sr.jsxs)(yf,{children:[(0,Sr.jsx)(bf,{children:"Sessions today"}),(0,Sr.jsx)(vf,{children:v.today}),(0,Sr.jsxs)(xf,{children:["7d: ",v.week," \xb7 30d: ",v.month]})]}),(0,Sr.jsxs)(yf,{children:[(0,Sr.jsx)(bf,{children:"Active right now"}),(0,Sr.jsx)(vf,{children:v.active}),(0,Sr.jsx)(xf,{children:"last 5 min"})]}),(0,Sr.jsxs)(yf,{children:[(0,Sr.jsx)(bf,{children:"Avg session"}),(0,Sr.jsx)(vf,{children:Uf(v.avgDurMs)}),(0,Sr.jsxs)(xf,{children:[v.avgEvents.toFixed(1)," events/session"]})]})]}),(0,Sr.jsxs)(wf,{children:[(0,Sr.jsx)(_f,{children:"Visit frequency \xb7 last 7 days"}),0===x.total?(0,Sr.jsx)(Mf,{children:"No sessions yet."}):(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(Rf,{children:[(0,Sr.jsx)(Of,{children:"1 visit"}),(0,Sr.jsx)(Df,{children:(0,Sr.jsx)(Lf,{$pct:x.pctOne})}),(0,Sr.jsxs)(Ff,{children:[x.one," (",x.pctOne,"%)"]})]}),(0,Sr.jsxs)(Rf,{children:[(0,Sr.jsx)(Of,{children:"2\u20135 visits"}),(0,Sr.jsx)(Df,{children:(0,Sr.jsx)(Lf,{$pct:x.pctTwoFive})}),(0,Sr.jsxs)(Ff,{children:[x.twoFive," (",x.pctTwoFive,"%)"]})]}),(0,Sr.jsxs)(Rf,{children:[(0,Sr.jsx)(Of,{children:"6+ visits"}),(0,Sr.jsx)(Df,{children:(0,Sr.jsx)(Lf,{$pct:x.pctSixPlus})}),(0,Sr.jsxs)(Ff,{children:[x.sixPlus," (",x.pctSixPlus,"%)"]})]})]})]}),(0,Sr.jsxs)(wf,{children:[(0,Sr.jsx)(_f,{children:"Top pages \xb7 last 7 days"}),0===w.length?(0,Sr.jsx)(Mf,{children:"No page views yet."}):w.map((e=>(0,Sr.jsxs)(jf,{children:[(0,Sr.jsx)(Af,{children:e.path}),(0,Sr.jsxs)(Nf,{children:[e.count," views"]})]},e.path)))]}),(0,Sr.jsxs)(wf,{children:[(0,Sr.jsx)(_f,{children:"User activity timeline"}),(0,Sr.jsxs)(kf,{value:y,onChange:e=>b(e.target.value),children:[(0,Sr.jsx)("option",{value:"",children:"\u2014 Choose user \u2014"}),A.map((e=>(0,Sr.jsx)("option",{value:e.uid,children:e.name},e.uid)))]}),y?0===k.length?(0,Sr.jsx)(Mf,{children:"No sessions for this user."}):k.map((e=>(0,Sr.jsxs)(jf,{children:[(0,Sr.jsx)(Pf,{children:zf(e.startedAt)}),(0,Sr.jsx)(Af,{children:Uf(e.durationMs)}),(0,Sr.jsxs)(Nf,{children:[e.eventCount," events",e.pages.length>0&&(0,Sr.jsxs)(Sr.Fragment,{children:[" \xb7 ",e.pages.slice(0,6).join(" \u2192 "),e.pages.length>6?" \u2026":""]})]})]},e.sid))):(0,Sr.jsx)(Mf,{children:"Pick a user to see their session history."})]}),(0,Sr.jsxs)(wf,{children:[(0,Sr.jsx)(_f,{children:"Devices \xb7 top 20 by recency"}),0===_.length?(0,Sr.jsx)(Mf,{children:"No devices yet."}):_.map((e=>(0,Sr.jsxs)(jf,{children:[(0,Sr.jsx)(Pf,{children:zf(e.lastSeen)}),(0,Sr.jsxs)(Af,{children:[e.deviceId.slice(0,8),"\u2026"]}),(0,Sr.jsxs)(Nf,{children:[e.sessions," sessions \xb7 ",e.uidCount," signed-in user",1===e.uidCount?"":"s"]})]},e.deviceId)))]}),(0,Sr.jsxs)(wf,{children:[(0,Sr.jsx)(_f,{children:"Per-event mash bar (24h \xd7 7 days)"}),(0,Sr.jsxs)(kf,{value:p,onChange:e=>f(e.target.value),children:[(0,Sr.jsx)("option",{value:"",children:"\u2014 Choose event \u2014"}),u.map((e=>(0,Sr.jsx)("option",{value:e.id,children:e.name||"(untitled)"},e.id)))]}),p?(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(Sf,{children:C.map(((e,t)=>(0,Sr.jsx)(Cf,{style:{height:`${Math.max(2,e.pct)}%`},title:`${e.value} mashes`},t)))}),(0,Sr.jsx)(Ef,{children:C.map(((e,t)=>(0,Sr.jsx)(Tf,{children:e.value||""},t)))}),(0,Sr.jsxs)("div",{style:{marginTop:10,fontSize:12,color:"rgba(255,255,255,0.6)"},children:["RSVPs for this event: ",E]})]}):(0,Sr.jsx)(Mf,{children:"Pick an event to see its 7-day mash chart."})]}),(0,Sr.jsxs)(wf,{children:[(0,Sr.jsx)(_f,{children:"Funnel"}),T.map((e=>(0,Sr.jsxs)(Rf,{children:[(0,Sr.jsx)(Of,{children:e.label}),(0,Sr.jsx)(Df,{children:(0,Sr.jsx)(Lf,{$pct:e.pct})}),(0,Sr.jsxs)(Ff,{children:[e.count," (",Math.round(e.pct),"%)"]})]},e.label)))]}),(0,Sr.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:10},children:[(0,Sr.jsxs)(wf,{children:[(0,Sr.jsx)(_f,{children:"Top mashers (lifetime)"}),0===I.length?(0,Sr.jsx)(Mf,{children:"No data yet."}):I.map((e=>(0,Sr.jsxs)(jf,{children:[(0,Sr.jsx)(Af,{children:e.name}),(0,Sr.jsxs)(Nf,{children:["\ud83c\udf2d ",e.count]})]},e.uid)))]}),(0,Sr.jsxs)(wf,{children:[(0,Sr.jsx)(_f,{children:"Top RSVPers"}),0===j.length?(0,Sr.jsx)(Mf,{children:"No data yet."}):j.map((e=>(0,Sr.jsxs)(jf,{children:[(0,Sr.jsx)(Af,{children:e.name}),(0,Sr.jsxs)(Nf,{children:[e.count," events"]})]},e.uid)))]})]}),(0,Sr.jsxs)(wf,{children:[(0,Sr.jsx)(_f,{children:"Recent activity \xb7 last 50"}),(0,Sr.jsx)(If,{children:0===P.length?(0,Sr.jsx)(Mf,{children:"No analytics events yet."}):P.map((e=>{const t=e.uid?r[e.uid]&&r[e.uid].displayName||e.uid.slice(0,6):"anon",n=e.props?Object.entries(e.props).map((e=>{let[t,n]=e;return`${t}=${"object"===typeof n?JSON.stringify(n):n}`})).join(" "):"";return(0,Sr.jsxs)(jf,{children:[(0,Sr.jsx)(Pf,{children:zf(e.ts)}),(0,Sr.jsx)(Af,{children:e.name}),(0,Sr.jsxs)(Nf,{children:[t," \xb7 ",n]})]},e.id)}))})]})]})}const Bf=xr.div` display: flex; flex-direction: column; gap: 14px; `,Wf=xr.div`
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; flex-wrap: wrap;
`,Hf=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(255,255,255,0.55);
`,Vf=xr.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 600;
  color: #FF8E8E;
  background: rgba(255,107,107,0.10);
  border: 1px solid rgba(255,107,107,0.30);
  padding: 4px 10px; border-radius: 999px;
  margin-left: 8px;
`,qf=xr.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.05em; text-transform: uppercase;
  padding: 8px 12px; border-radius: 10px;
  border: 1px solid rgba(255,107,107,0.40);
  background: rgba(255,107,107,0.08);
  color: #FF8E8E; cursor: pointer;
  &:hover { background: rgba(255,107,107,0.16); }
`,Kf=xr.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,107,107,0.20);
  border-radius: 12px;
  padding: 12px 14px;
  font-family: 'Inter', sans-serif;
`,Yf=xr.div`
  display: flex; justify-content: space-between; gap: 12px;
  font-size: 12px;
`,Gf=xr.div`
  color: #FFD2D2;
  font-weight: 600;
  margin: 6px 0 4px;
  word-break: break-word;
`,Zf=xr.div`
  font-size: 11px; color: rgba(255,255,255,0.55);
  display: flex; flex-wrap: wrap; gap: 10px;
`,Qf=xr.pre`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px; color: rgba(255,255,255,0.62);
  background: rgba(0,0,0,0.30);
  padding: 8px 10px;
  margin-top: 8px;
  border-radius: 8px;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 220px;
  overflow: auto;
`,Jf=xr.div`
  padding: 36px 16px; text-align: center;
  color: rgba(255,255,255,0.45);
  border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 14px;
  font-size: 14px;
`;function Xf(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)(!0),[o,s]=(0,t.useState)({});(0,t.useEffect)((()=>{const e=(0,Ar.P)((0,Ar.ref)(Nr.OO,"errorLogs"),(0,Ar.$1)(200)),t=(0,Ar.Zy)(e,(e=>{const t=e.val()||{},r=Object.entries(t).map((e=>{let[t,n]=e;return{id:t,...n}}));r.sort(((e,t)=>(t.ts||0)-(e.ts||0))),n(r),i(!1)}),(()=>i(!1)));return()=>t()}),[]);const a=(0,t.useMemo)((()=>e),[e]);return r?(0,Sr.jsx)(Bf,{children:(0,Sr.jsx)(Jf,{children:"Loading\u2026"})}):(0,Sr.jsxs)(Bf,{children:[(0,Sr.jsxs)(Wf,{children:[(0,Sr.jsxs)(Hf,{children:["Recent errors ",(0,Sr.jsx)(Vf,{children:e.length})]}),e.length>0&&(0,Sr.jsx)(qf,{type:"button",onClick:async()=>{if(window.confirm("Delete all error logs? This cannot be undone."))try{await(0,Ar.TF)((0,Ar.ref)(Nr.OO,"errorLogs"))}catch(Bt){}},children:"Clear all"})]}),0===e.length?(0,Sr.jsx)(Jf,{children:"\ud83e\udd5a No errors logged. Things are quiet."}):a.map((e=>{return(0,Sr.jsxs)(Kf,{children:[(0,Sr.jsxs)(Yf,{children:[(0,Sr.jsx)("span",{style:{color:"#FFC72C",fontWeight:700},children:(t=e.ts,t?new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(t)):"\u2014")}),(0,Sr.jsx)("span",{children:e.email||e.uid||"anonymous"})]}),(0,Sr.jsx)(Gf,{children:e.msg||"(no message)"}),(0,Sr.jsxs)(Zf,{children:[(0,Sr.jsxs)("span",{children:["v ",e.version||"\u2014"]}),(0,Sr.jsxs)("span",{children:["build ",e.buildNum||"\u2014"]}),(0,Sr.jsx)("span",{children:e.buildSha||"\u2014"}),e.context&&e.context.type&&(0,Sr.jsx)("span",{children:e.context.type}),e.url&&(0,Sr.jsx)("span",{style:{wordBreak:"break-all"},children:e.url.replace(/^https?:\/\//,"")})]}),e.stack&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)("button",{type:"button",onClick:()=>s((t=>({...t,[e.id]:!t[e.id]}))),style:{marginTop:8,background:"transparent",border:"none",color:"#FFE66D",fontSize:11,fontFamily:"Montserrat, sans-serif",fontWeight:700,letterSpacing:"0.10em",textTransform:"uppercase",cursor:"pointer",padding:0},children:o[e.id]?"Hide stack \u25b2":"Show stack \u25bc"}),o[e.id]&&(0,Sr.jsx)(Qf,{children:e.stack})]})]},e.id);var t}))]})}const eg=xr.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 18px;
`,tg=xr.div`
  width: 100%;
  max-width: 380px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 22px;
  padding: 28px 22px 24px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 32px rgba(255,199,44,0.10);
  backdrop-filter: blur(10px);
  text-align: center;
  color: #f4f4f4;
`,ng=xr.h1`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 8px;
`,rg=xr.p`
  font-size: 13px;
  color: rgba(255,255,255,0.75);
  margin: 0 0 18px;
  line-height: 1.5;
`,ig=xr.button`
  width: 100%;
  padding: 13px 16px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: filter 0.15s, transform 0.15s;
  &:hover { filter: brightness(1.05); }
  &:active { transform: scale(0.98); }
  & + & { margin-top: 10px; }
`,og=xr(ig)`
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.12);
`,sg=xr.div`
  color: rgba(255,255,255,0.6);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,ag=["events","notifications","signups","users","engagement","analytics","errors"];const lg=function(){const{user:e,isAdmin:n,loading:r}=Xs(),i=ee(),{tab:o}=te(),s=ag.includes(o)?o:"events",[a,l]=(0,t.useState)([]),[c,d]=(0,t.useState)(!0),[u,h]=(0,t.useState)(null);(0,t.useEffect)((()=>{o!==s&&i(`/admin1/${s}`,{replace:!0})}),[o,s,i]),(0,t.useEffect)((()=>{if(!n)return;const e=Hi((e=>{l(e),d(!1)}));return()=>e&&e()}),[n]);const{upcoming:p,past:f}=(0,t.useMemo)((()=>Vi(a)),[a]),g=async()=>{try{await Qs()}catch(Bt){}h(null)};if(r)return(0,Sr.jsxs)(Nd,{children:[(0,Sr.jsx)(Dd,{count:5}),(0,Sr.jsx)(eg,{children:(0,Sr.jsx)(sg,{children:"Loading\u2026"})})]});if(!e)return(0,Sr.jsxs)(Nd,{children:[(0,Sr.jsx)(Dd,{count:5}),(0,Sr.jsx)(eg,{children:(0,Sr.jsxs)(tg,{children:[(0,Sr.jsx)(ng,{children:"\ud83e\udd5a Admin Access"}),(0,Sr.jsx)(rg,{children:"Sign in to access admin. Tap below and the cog will pop open."}),(0,Sr.jsx)(ig,{type:"button",onClick:()=>window.dispatchEvent(new Event("auth:open")),children:"Sign In"})]})})]});if(!n)return(0,Sr.jsxs)(Nd,{children:[(0,Sr.jsx)(Dd,{count:5}),(0,Sr.jsx)(eg,{children:(0,Sr.jsxs)(tg,{children:[(0,Sr.jsx)(ng,{children:"Not authorized"}),(0,Sr.jsx)(rg,{children:"This account isn't an admin. Sign in with an admin account, or ask a crew member to grant access."}),(0,Sr.jsx)(og,{type:"button",onClick:g,children:"Sign Out"})]})})]});const m=u&&"new"!==u&&a.find((e=>e.id===u))||null;return(0,Sr.jsxs)(Hd,{tab:s,onTabChange:e=>i(`/admin1/${e}`),onSignOut:g,children:["events"===s&&(null==u?c?(0,Sr.jsx)("div",{style:{padding:"40px 0",textAlign:"center",color:"rgba(255,255,255,0.55)"},children:"Loading events\u2026"}):(0,Sr.jsx)(tu,{upcoming:p,past:f,onNew:()=>h("new"),onEdit:e=>h(e)}):(0,Sr.jsx)(ah,{existing:m,onClose:()=>h(null),onSaved:()=>h(null),onDeleted:()=>h(null)})),"notifications"===s&&(0,Sr.jsx)(tp,{}),"signups"===s&&(0,Sr.jsx)(fp,{}),"users"===s&&(0,Sr.jsx)(Qp,{}),"engagement"===s&&(0,Sr.jsx)(ff,{}),"analytics"===s&&(0,Sr.jsx)($f,{}),"errors"===s&&(0,Sr.jsx)(Xf,{})]})},cg=_r`
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
`,dg=xr.div`
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
`,ug=xr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
`,hg=xr.img`
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
`,pg=xr.h2`
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
`,fg=xr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 27px; /* Increased spacing before trail conditions */
  text-align: center;
  max-width: 90%;
`,gg=xr.span`
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
`,mg=xr.div`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  margin: 5px 0;
  opacity: 0.8;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`,yg=xr.div`
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
`,bg=xr.img`
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
`,vg=xr.div`
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
`,xg=xr.div`
  position: fixed;
  font-size: ${e=>e.size||"36px"};
  opacity: ${e=>e.opacity||.2};
  pointer-events: none;
  user-select: none;
  z-index: 0;
  top: ${e=>e.top||"50%"};
  left: ${e=>e.left||"50%"};
  animation: ${cg} ${e=>e.duration||"20s"} ease-in-out infinite;
  animation-delay: ${e=>e.delay||"0s"};
  transform-origin: center;
  will-change: transform;
  
  @media (max-width: 768px) {
    font-size: calc(${e=>e.size||"36px"} * 0.8);
  }
  
  @media (max-width: 480px) {
    font-size: calc(${e=>e.size||"36px"} * 0.7);
  }
`,wg=xr.div`
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
`,_g=xr.a`
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
`,kg=xr.div`
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
`,Sg=xr.h2`
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
`,Cg=xr.p`
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
`,Eg=xr.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`,Tg=xr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ig=xr.label`
  color: #FFC72C;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`,jg=xr.input`
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
`,Pg=(_r`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
`,xr.button`
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
`),Ag=xr.div`
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
`;const Ng=function(){const[e,n]=(0,t.useState)([]),r=(0,t.useRef)(null),[i,o]=(0,t.useState)(""),[s,a]=(0,t.useState)(""),[l,c]=(0,t.useState)(!1),[d,u]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{(()=>{if(!document.getElementById("montserrat-font")){const e=document.createElement("link");e.id="montserrat-font",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap",document.head.appendChild(e)}})();const e=()=>{const e=window.innerWidth;return e<=480?6:e<=768?8:12},t=[],i=e();for(let n=0;n<i;n++)t.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.15,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:10*Math.random()+15+"s",delay:`-${10*Math.random()}s`});n(t);const o=()=>{const r=e();if(r!==t.length){const e=[];for(let n=0;n<r;n++)n<t.length?e.push(t[n]):e.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.1,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:60*Math.random()+30+"s",delay:`-${30*Math.random()}s`});n(e)}};if(window.addEventListener("resize",o),!r.current){const e=document.createElement("script");e.src="https://trailbot.com/scripts/embed.js",e.defer=!0,document.body.appendChild(e),r.current=e}return()=>{window.removeEventListener("resize",o),r.current&&document.body.contains(r.current)&&document.body.removeChild(r.current)}}),[]),(0,Sr.jsxs)(dg,{children:[e.map((e=>(0,Sr.jsx)(xg,{size:e.size,opacity:e.opacity,top:e.top,left:e.left,duration:e.duration,delay:e.delay,children:e.emoji},e.id))),(0,Sr.jsxs)(ug,{children:[(0,Sr.jsx)(hg,{src:"/assets/cogg white shadow.png",alt:"Scrambled Legs Logo"}),(0,Sr.jsx)(pg,{children:"DULUTH'S PREMIER RACE TEAM"}),(0,Sr.jsxs)(fg,{children:[(0,Sr.jsxs)(mg,{children:[(0,Sr.jsx)(gg,{children:"SCRAMBLED LEGS\u2122"})," proudly presents"]}),(0,Sr.jsx)(yg,{children:"LESTER RIVER TRAIL"})]}),(0,Sr.jsx)(bg,{src:"/assets/trail conditions.png",alt:"Trail Conditions"}),(0,Sr.jsx)(vg,{children:(0,Sr.jsx)("iframe",{src:"https://trailbot.com/widgets/feed?keys=5af70f8f-9995-4451-8877-a42fbb299a6a",width:"100%",className:"trail-status-embed",title:"Lester Park Trail Conditions"})}),(0,Sr.jsxs)(wg,{children:[(0,Sr.jsx)(_g,{href:"https://www.coggs.com/trail-conditions",target:"_blank",rel:"noopener noreferrer",icon:'"\ud83d\udeb5\u200d\u2642\ufe0f"',children:"TRAIL CONDITIONS"}),(0,Sr.jsx)(_g,{href:"https://www.coggs.com/donate",target:"_blank",rel:"noopener noreferrer",icon:'"\ud83d\udee0\ufe0f"',children:"SUPPORT THE TRAILS"})]}),(0,Sr.jsxs)(kg,{children:[(0,Sr.jsx)(Sg,{children:"JOIN THE SCRAMBLED LEGS"}),(0,Sr.jsx)(Cg,{children:"An elite team of average athletes"}),d?(0,Sr.jsxs)(Ag,{children:[(0,Sr.jsx)("h3",{children:"Egg-cellent!"}),(0,Sr.jsx)("p",{children:"You're officially part of the scramble! We'll keep you updated on all our egg-citing adventures."})]}):(0,Sr.jsxs)(Eg,{onSubmit:async e=>{if(e.preventDefault(),!i.trim()||!s.trim())return void alert("Please fill in all fields");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)){c(!0);try{const e=(0,Ar.ref)(Nr.OO,"newsletterRegistrants"),t=(0,Ar.VC)(e);await(0,Ar.hZ)(t,{name:i,email:s,timestamp:Date.now()}),u(!0),o(""),a("")}catch(t){console.error("Error submitting form:",t),alert("Something went wrong. Please try again later.")}finally{c(!1)}}else alert("Please enter a valid email address")},children:[(0,Sr.jsxs)(Tg,{children:[(0,Sr.jsx)(Ig,{htmlFor:"name",children:"Name"}),(0,Sr.jsx)(jg,{id:"name",type:"text",value:i,onChange:e=>o(e.target.value),placeholder:"Your name",required:!0})]}),(0,Sr.jsxs)(Tg,{children:[(0,Sr.jsx)(Ig,{htmlFor:"email",children:"Email"}),(0,Sr.jsx)(jg,{id:"email",type:"email",value:s,onChange:e=>a(e.target.value),placeholder:"Your email address",required:!0})]}),(0,Sr.jsx)(Pg,{type:"submit",disabled:l,children:l?"Submitting...":"Get Crackin'"})]})]})]}),(0,Sr.jsx)(jr,{})]})};let Rg=null;const Og=new Set;function Dg(){Og.forEach((e=>{try{e(Rg)}catch(Bt){}}))}function Lg(e){Rg=e||null,Dg()}const Fg=_r`from { opacity: 0; } to { opacity: 1; }`,Mg=_r`from { transform: translateY(100%); } to { transform: translateY(0); }`,zg=xr.div`
  position: fixed;
  inset: 0;
  z-index: 2150;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`,Ug=xr.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  pointer-events: auto;
  animation: ${Fg} 0.2s ease;
`,$g=xr.div`
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
  animation: ${Mg} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.55);
`,Bg=xr.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 40;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.10);
  color: #f4f4f4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  line-height: 1;
  backdrop-filter: blur(6px);
  &:hover { background: rgba(0,0,0,0.75); border-color: rgba(255,199,44,0.25); }
`,Wg=xr.button`
  display: block;
  width: 100%;
  padding: 14px 0 6px;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 4px;
    margin: 0 auto;
    background: rgba(255,255,255,0.18);
    border-radius: 2px;
  }
`,Hg=xr.div`
  padding: 6px 18px 0;
`,Vg=xr.h2`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  margin: 4px 0 16px;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,qg=xr.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
`,Kg=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
  margin: 0 0 10px;
`,Yg=xr.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Gg=xr.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${e=>e.$photo?`center/cover no-repeat url('${e.$photo}')`:"linear-gradient(45deg, #FFC72C, #FFE66D)"};
  color: #1a1a1a;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
  border: 2px solid rgba(255,199,44,0.40);
`,Zg=xr.input`
  width: 100%;
  box-sizing: border-box;
  padding: 11px 13px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
  &:focus { border-color: #FFC72C; }
`,Qg=xr.button`
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FFE66D);
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 11px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover { filter: brightness(1.06); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`,Jg=xr.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.10); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`,Xg=xr.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,107,107,0.35);
  background: rgba(255,107,107,0.10);
  color: #FF8E8E;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover { background: rgba(255,107,107,0.20); }
`,em=xr.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(111,207,151,0.10);
  border: 1px solid rgba(111,207,151,0.30);
  color: #6FCF97;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
`,tm=xr.div`
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  margin-top: 8px;
`,nm=xr.div`
  font-size: 12px;
  color: #FF8E8E;
  margin-top: 8px;
`,rm=xr.div`
  font-size: 12px;
  color: #FFE66D;
  margin-top: 8px;
`,im=xr.input`display: none;`,om=xr.div`
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 10px;
`,sm=xr.div`
  width: ${e=>e.$pct||0}%;
  height: 100%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  transition: width 0.15s;
`;function am(e){let{user:n,onClose:r}=e;const{isAdmin:i}=Xs(),o=ee(),s=(0,t.useRef)(null),[a,l]=(0,t.useState)(null),[c,d]=(0,t.useState)(""),[u,h]=(0,t.useState)(!1),[p,f]=(0,t.useState)(""),[g,m]=(0,t.useState)(""),[y,b]=(0,t.useState)(!1),[v,x]=(0,t.useState)(0),[w,_]=(0,t.useState)(""),[k,S]=(0,t.useState)($r()),[C,E]=(0,t.useState)(!1),[T,I]=(0,t.useState)(""),[j,P]=(0,t.useState)(Rg),[A,N]=(0,t.useState)("undefined"!==typeof window&&(!(!window.matchMedia||!window.matchMedia("(display-mode: standalone)").matches)||!(!window.navigator||!0!==window.navigator.standalone))||Mr()),[R,O]=(0,t.useState)(""),[D,L]=(0,t.useState)(""),[F,M]=(0,t.useState)(!1);(0,t.useEffect)((()=>{if(!n)return;const e=(0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),t=(0,Ar.Zy)(e,(e=>{const t=e.val()||{};l(t),d((e=>e||t.displayName||(n.email?n.email.split("@")[0]:"")))}));return()=>t()}),[n]),(0,t.useEffect)((()=>{const e=(t=e=>P(e),Og.add(t),()=>Og.delete(t));var t;return()=>{e()}}),[]),(0,t.useEffect)((()=>{function e(e){"Escape"===e.key&&r()}window.addEventListener("keydown",e);const t=document.body.style.overflow;document.body.style.overflow="hidden";try{(0,ls.logEvent)("account_sheet_opened",{signedIn:!0})}catch(Bt){}return()=>{window.removeEventListener("keydown",e),document.body.style.overflow=t}}),[r]);const z=c&&c.charAt(0)||(n.email?n.email.charAt(0):"?"),U=a&&a.photoURL||"",$="subscribed"===k,B=!A&&!!j;return(0,Sr.jsxs)(zg,{children:[(0,Sr.jsx)(Ug,{onClick:r}),(0,Sr.jsxs)($g,{onClick:e=>e.stopPropagation(),role:"dialog","aria-label":"Account",children:[(0,Sr.jsx)(Bg,{type:"button","aria-label":"Close",onClick:r,children:"\xd7"}),(0,Sr.jsx)(Wg,{type:"button",onClick:r,"aria-label":"Close panel"}),(0,Sr.jsxs)(Hg,{children:[(0,Sr.jsx)(Vg,{children:"Account"}),(0,Sr.jsxs)(qg,{children:[(0,Sr.jsx)(Kg,{children:"Profile"}),(0,Sr.jsxs)(Yg,{children:[(0,Sr.jsx)(Gg,{$photo:U,children:!U&&z}),(0,Sr.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,Sr.jsx)("div",{style:{fontWeight:700,color:"#fff",fontSize:15},children:c||n.email&&n.email.split("@")[0]||"rider"}),(0,Sr.jsx)("div",{style:{fontSize:12,color:"rgba(255,255,255,0.55)",marginTop:2},children:n.email||""}),(0,Sr.jsx)("div",{style:{marginTop:10},children:(0,Sr.jsx)(Jg,{type:"button",onClick:()=>{y||s.current&&s.current.click()},disabled:y,children:y?"Uploading\u2026":U?"Change photo":"Upload photo"})})]})]}),(0,Sr.jsx)(im,{ref:s,type:"file",accept:"image/*",onChange:async e=>{const t=e.target.files&&e.target.files[0];if(e.target.value="",!t)return;if(_(""),!t.type||!t.type.startsWith("image/"))return void _("File must be an image");if(t.size>2097152)return void _("Image is too large (max 2MB)");const r=function(e){if("image/png"===e.type)return"png";if("image/webp"===e.type)return"webp";if("image/gif"===e.type)return"gif";const t=(e.name||"").split(".").pop();return t&&t.length<=5&&/^[a-z0-9]+$/i.test(t)?t.toLowerCase():"jpg"}(t),i=`profilePics/${n.uid}.${r}`;try{b(!0),x(0);const e=(0,nu.KR)(Nr.IG,i),r=(0,nu.bp)(e,t,{contentType:t.type});await new Promise(((e,t)=>{r.on("state_changed",(e=>{e.totalBytes&&x(e.bytesTransferred/e.totalBytes*100)}),(e=>t(e)),(()=>e()))}));const o=await(0,nu.qk)(r.snapshot.ref);await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),{photoURL:o})}catch(o){_(o&&o.message||"Upload failed")}finally{b(!1)}}}),y&&(0,Sr.jsx)(om,{children:(0,Sr.jsx)(sm,{$pct:v})}),w&&(0,Sr.jsx)(nm,{children:w})]}),(0,Sr.jsxs)(qg,{children:[(0,Sr.jsx)(Kg,{children:"Display name"}),(0,Sr.jsxs)(Yg,{children:[(0,Sr.jsx)(Zg,{type:"text",value:c,maxLength:30,onChange:e=>d(e.target.value),placeholder:"Your name"}),(0,Sr.jsx)(Qg,{type:"button",onClick:async()=>{f(""),m("");const e=(c||"").trim();if(e.length<1||e.length>30)m("Name must be 1\u201330 characters");else try{h(!0),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),{displayName:e}),f("Saved.")}catch(t){m(t&&t.message||"Save failed")}finally{h(!1)}},disabled:u,children:u?"\u2026":"Save"})]}),(0,Sr.jsx)(tm,{children:"1\u201330 characters. Shown on the leaderboard and ride leader picker."}),g&&(0,Sr.jsx)(nm,{children:g}),p&&(0,Sr.jsx)(rm,{children:p})]}),(0,Sr.jsxs)(qg,{children:[(0,Sr.jsx)(Kg,{children:"Notifications & app"}),$?(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(em,{children:"\u2713 Notifications on"}),(0,Sr.jsx)(tm,{children:"To turn these off, revoke notification permission in your browser/OS settings."})]}):(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(Qg,{type:"button",onClick:async()=>{I(""),E(!0);try{await Wr(),S($r())}catch(e){I(e&&e.message||"Could not enable notifications")}finally{E(!1)}},disabled:C,children:C?"\u2026":"Enable notifications"}),T&&(0,Sr.jsx)(nm,{children:T})]}),(0,Sr.jsx)("div",{style:{height:12}}),A?(0,Sr.jsx)(em,{children:"\u2713 PWA installed"}):B?(0,Sr.jsx)(Qg,{type:"button",onClick:async()=>{const e=function(){const e=Rg;return Rg=null,Dg(),e}();if(e)try{(0,ls.logEvent)("pwa_install_clicked",{}),await e.prompt();const t=await e.userChoice;t&&"accepted"===t.outcome&&N(!0)}catch(Bt){}},children:"Install Scrambled Legs app"}):(0,Sr.jsx)(tm,{children:"Install the PWA from your browser menu to enable home-screen launching."})]}),(0,Sr.jsxs)(qg,{children:[(0,Sr.jsx)(Kg,{children:"Password"}),(0,Sr.jsx)(Qg,{type:"button",onClick:async()=>{if(O(""),L(""),n.email)try{M(!0),await Js(n.email),O("Check your inbox for a reset link.")}catch(e){L(e&&e.message||"Could not send reset email")}finally{M(!1)}else L("No email on file.")},disabled:F,children:F?"\u2026":"Send password reset email"}),D&&(0,Sr.jsx)(nm,{children:D}),R&&(0,Sr.jsx)(rm,{children:R})]}),i&&(0,Sr.jsxs)(qg,{children:[(0,Sr.jsx)(Kg,{children:"Admin"}),(0,Sr.jsx)(Qg,{type:"button",onClick:()=>{r(),o("/admin1")},children:"\u2192 Admin Panel"})]}),(0,Sr.jsxs)(qg,{children:[(0,Sr.jsx)(Kg,{children:"Sign out"}),(0,Sr.jsx)(Xg,{type:"button",onClick:async()=>{try{await Qs()}catch(Bt){}r()},children:"Sign out"})]})]})]})]})}function lm(e){let{onClose:n}=e;const[r,i]=(0,t.useState)("signin"),[o,s]=(0,t.useState)(""),[a,l]=(0,t.useState)(""),[c,d]=(0,t.useState)(""),[u,h]=(0,t.useState)(""),[p,f]=(0,t.useState)(!1);(0,t.useEffect)((()=>{function e(e){"Escape"===e.key&&n()}window.addEventListener("keydown",e);const t=document.body.style.overflow;document.body.style.overflow="hidden";try{(0,ls.logEvent)("account_sheet_opened",{signedIn:!1})}catch(Bt){}return()=>{window.removeEventListener("keydown",e),document.body.style.overflow=t}}),[n]);return(0,Sr.jsxs)(zg,{children:[(0,Sr.jsx)(Ug,{onClick:n}),(0,Sr.jsxs)($g,{onClick:e=>e.stopPropagation(),role:"dialog","aria-label":"Sign in",children:[(0,Sr.jsx)(Bg,{type:"button","aria-label":"Close",onClick:n,children:"\xd7"}),(0,Sr.jsx)(Wg,{type:"button",onClick:n,"aria-label":"Close panel"}),(0,Sr.jsxs)(Hg,{children:[(0,Sr.jsx)(Vg,{children:"signup"===r?"Create Account":"forgot"===r?"Reset Password":"Sign In"}),(0,Sr.jsxs)(qg,{children:[(0,Sr.jsx)("div",{style:{display:"flex",gap:4,borderBottom:"1px solid rgba(255,255,255,0.08)",marginBottom:14},children:[{k:"signin",label:"Sign In"},{k:"signup",label:"Create"},{k:"forgot",label:"Forgot"}].map((e=>(0,Sr.jsx)("button",{type:"button",onClick:()=>(e=>{i(e),d(""),h("")})(e.k),style:{flex:1,fontFamily:"Montserrat, sans-serif",fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"10px 4px",border:"none",background:"transparent",color:r===e.k?"#FFC72C":"rgba(255,255,255,0.55)",borderBottom:"2px solid "+(r===e.k?"#FFC72C":"transparent"),marginBottom:-1,cursor:"pointer"},children:e.label},e.k)))}),(0,Sr.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),d(""),h(""),f(!0);try{"signin"===r?(await Zs(o.trim(),a),s(""),l("")):"signup"===r?(await Gs(o.trim(),a),s(""),l("")):"forgot"===r&&(await Js(o.trim()),h("Password reset email sent. Check your inbox."))}catch(t){d(ea(t&&t.code))}finally{f(!1)}},children:[(0,Sr.jsx)(Zg,{type:"email",placeholder:"email@example.com",autoComplete:"email",value:o,onChange:e=>s(e.target.value),required:!0,style:{marginBottom:10}}),"forgot"!==r&&(0,Sr.jsx)(Zg,{type:"password",placeholder:"password",autoComplete:"signup"===r?"new-password":"current-password",value:a,onChange:e=>l(e.target.value),required:!0,minLength:6,style:{marginBottom:10}}),(0,Sr.jsx)(Qg,{type:"submit",disabled:p,style:{width:"100%"},children:p?"\u2026":"signin"===r?"Sign In":"signup"===r?"Create Account":"Send Reset Email"}),c&&(0,Sr.jsx)(nm,{children:c}),u&&(0,Sr.jsx)(rm,{children:u})]})]})]})]})]})}function cm(e){let{user:t,onClose:n}=e;const r=t?(0,Sr.jsx)(am,{user:t,onClose:n}):(0,Sr.jsx)(lm,{onClose:n});return o.createPortal(r,document.body)}const dm=_r`
  0%, 100% { transform: rotate(0deg); }
  15% { transform: rotate(-18deg); }
  30% { transform: rotate(14deg); }
  45% { transform: rotate(-10deg); }
  60% { transform: rotate(8deg); }
  80% { transform: rotate(-4deg); }
`,um=xr.div`
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 1100;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`,hm=xr.button`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0,0,0,0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 22px rgba(255,199,44,0.35);
    filter: brightness(1.05);
  }
  &:active { transform: scale(0.97); }

  ${e=>e.$jiggling&&yr`
    animation: ${dm} 0.6s ease-in-out;
    transform-origin: center center;
  `}
`,pm=xr.button`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  border: 2px solid #FFC72C;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #1a1a1a;
  text-transform: uppercase;
  background: ${e=>e.$photo?`center/cover no-repeat url('${e.$photo}')`:"linear-gradient(45deg, #FFC72C, #FFE66D)"};
  box-shadow: 0 4px 14px rgba(0,0,0,0.35);
  transition: transform 0.15s ease;

  &:hover { transform: scale(1.06); }
  &:active { transform: scale(0.96); }

  ${e=>e.$jiggling&&yr`
    animation: ${dm} 0.6s ease-in-out;
    transform-origin: center center;
  `}
`;function fm(){const{user:e,loading:n}=Xs(),[r,i]=(0,t.useState)(!1),[o,s]=(0,t.useState)(!1),[a,l]=(0,t.useState)(null),c=(0,t.useRef)(null);if((0,t.useEffect)((()=>{function e(){s(!0),c.current&&clearTimeout(c.current),c.current=setTimeout((()=>s(!1)),650)}function t(){i(!0)}return window.addEventListener("auth:nudge",e),window.addEventListener("auth:open",t),()=>{window.removeEventListener("auth:nudge",e),window.removeEventListener("auth:open",t),c.current&&clearTimeout(c.current)}}),[]),(0,t.useEffect)((()=>{if(!e)return void l(null);const t=(0,Ar.ref)(Nr.OO,`userProfiles/${e.uid}`),n=(0,Ar.Zy)(t,(e=>l(e.val()||{})));return()=>n()}),[e]),n)return(0,Sr.jsx)(um,{});const d=a&&a.photoURL||"",u=a&&a.displayName||"",h=u&&u.charAt(0)||(e&&e.email?e.email.charAt(0):"?");return(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(um,{children:e?(0,Sr.jsx)(pm,{type:"button",$jiggling:o,$photo:d,onClick:()=>{try{(0,ls.logEvent)("auth_button_clicked",{signedIn:!0})}catch(Bt){}i(!0)},"aria-label":"Account",children:!d&&h}):(0,Sr.jsx)(hm,{type:"button",$jiggling:o,onClick:()=>{try{(0,ls.logEvent)("auth_button_clicked",{signedIn:!1})}catch(Bt){}i(!0)},"aria-label":"Sign in",children:"Sign In"})}),r&&(0,Sr.jsx)(cm,{user:e,onClose:()=>i(!1)})]})}const gm=_r`from { transform: translateY(120%); opacity: 0; } to { transform: translateY(0); opacity: 1; }`,mm=xr.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 18px;
  margin: 0 auto;
  max-width: 420px;
  background: linear-gradient(135deg, rgba(35,35,37,0.96), rgba(26,26,26,0.96));
  border: 1px solid rgba(255,199,44,0.45);
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  padding: 12px 14px;
  border-radius: 14px;
  z-index: 2400;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 24px rgba(255,199,44,0.15);
  animation: ${gm} 0.32s cubic-bezier(.22,.61,.36,1);
`,ym=xr.div` flex: 1; line-height: 1.35; `,bm=xr.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 9px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FFE66D);
  color: #1a1a1a;
  cursor: pointer;
  &:hover { filter: brightness(1.05); }
`,vm=xr.button`
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.45);
  font-size: 18px;
  cursor: pointer;
  padding: 4px 6px;
  &:hover { color: #f4f4f4; }
`;function xm(){const[e,n]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{function e(){n(!0)}return window.addEventListener("freshness:update-available",e),()=>window.removeEventListener("freshness:update-available",e)}),[]),e?(0,Sr.jsxs)(mm,{role:"status",children:[(0,Sr.jsx)(ym,{children:"\ud83e\udd5a New version available"}),(0,Sr.jsx)(bm,{type:"button",onClick:()=>{try{const e=new URL(window.location.href);e.searchParams.set("_v",String(Date.now())),window.location.replace(e.toString())}catch(Bt){window.location.reload()}},children:"Refresh"}),(0,Sr.jsx)(vm,{type:"button","aria-label":"Dismiss",onClick:()=>n(!1),children:"\xd7"})]}):null}function wm(){const e=J(),n=(0,t.useRef)(null);return(0,t.useEffect)((()=>{const t=e.pathname+(e.search||"");if(n.current!==t){n.current=t;try{(0,ls.logEvent)("page_view",{path:e.pathname,search:e.search||"",title:"undefined"!==typeof document?document.title:""}),(0,is.Ie)()}catch(Bt){}}}),[e.pathname,e.search]),null}const _m=function(){return t.useEffect((()=>{const e=()=>{(0,ls.logEvent)("pwa_installed",{}),Lg(null)},t=e=>{e.preventDefault(),Lg(e)};return window.addEventListener("appinstalled",e),window.addEventListener("beforeinstallprompt",t),()=>{window.removeEventListener("appinstalled",e),window.removeEventListener("beforeinstallprompt",t)}}),[]),(0,Sr.jsxs)(Ce,{basename:"",children:[(0,Sr.jsx)(wm,{}),(0,Sr.jsx)(fm,{}),(0,Sr.jsx)(xm,{}),(0,Sr.jsxs)(ve,{children:[(0,Sr.jsx)(ye,{path:"/",element:(0,Sr.jsx)(ed,{})}),(0,Sr.jsx)(ye,{path:"/events/:eventId",element:(0,Sr.jsx)(ed,{})}),(0,Sr.jsx)(ye,{path:"/hotdog-counter",element:(0,Sr.jsx)(Pd,{})}),(0,Sr.jsx)(ye,{path:"/hd.html",element:(0,Sr.jsx)(me,{to:"/hotdog-counter",replace:!0})}),(0,Sr.jsx)(ye,{path:"/hot-dog-counter",element:(0,Sr.jsx)(me,{to:"/hotdog-counter",replace:!0})}),(0,Sr.jsx)(ye,{path:"/admin1",element:(0,Sr.jsx)(lg,{})}),(0,Sr.jsx)(ye,{path:"/admin1/:tab",element:(0,Sr.jsx)(lg,{})}),(0,Sr.jsx)(ye,{path:"/lester-park",element:(0,Sr.jsx)(Ng,{})})]})]})};n(684),n(334);const km=`production-${(new Date).toISOString().replace(/[:.]/g,"")}`;(new Date).getTime();console.log(`Application starting with build ID: ${km}`);const Sm=(function(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var i=yr.apply(void 0,Ne([e],n,!1)),o="sc-global-".concat(tn(JSON.stringify(i))),s=new wr(i,o),a=function(e){var n=tr(),r=t.useContext(hr),i=t.useRef(n.styleSheet.allocateGSInstance(o)).current;return n.styleSheet.server&&l(i,e,n.styleSheet,r,n.stylis),t.useLayoutEffect((function(){if(!n.styleSheet.server)return l(i,e,n.styleSheet,r,n.stylis),function(){return s.removeStyles(i,n.styleSheet)}}),[i,e,n.styleSheet,r,n.stylis]),null};function l(e,t,n,r,i){if(s.isStatic)s.renderStyles(e,$t,n,i);else{var o=Ae(Ae({},t),{theme:Ht(t,r,a.defaultProps)});s.renderStyles(e,o,n,i)}}return t.memo(a)})`
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
      ellipse 58% 42% at var(--mash-x, 50%) var(--mash-y, 75%),
      transparent 16%,
      rgba(0,0,0,0.7) 48%,
      rgba(0,0,0,1) 92%
    );
    transition: opacity 0.45s ease;
  }

  @media (max-width: 768px) {
    .mash-vignette {
      background: radial-gradient(
        ellipse 58% 42% at var(--mash-x, 50%) var(--mash-y, 75%),
        transparent 16%,
        rgba(0,0,0,0.56) 48%,
        rgba(0,0,0,0.80) 92%
      );
    }
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
  /* Vignette sits BELOW the sheet (sheet z-index 2100) so it darkens the
     world behind without covering the mash button — mirrors the home-page
     feel where the button stays lit while the screen dims. */
  body[data-sheet-open="1"] .mash-vignette { z-index: 2050; }
  body[data-sheet-open="1"] .mash-flash   { z-index: 2150; }
  body[data-sheet-open="1"] .mash-vignette {
    background: radial-gradient(
      ellipse 58% 40% at var(--mash-x, 50%) var(--mash-y, 88%),
      transparent 16%,
      rgba(0,0,0,0.70) 48%,
      rgba(0,0,0,1) 92%
    );
  }

  @media (max-width: 768px) {
    body[data-sheet-open="1"] .mash-vignette {
      background: radial-gradient(
        ellipse 58% 40% at var(--mash-x, 50%) var(--mash-y, 88%),
        transparent 16%,
        rgba(0,0,0,0.56) 48%,
        rgba(0,0,0,0.80) 92%
      );
    }
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
  .weather-desc, .weather-extra, .countdown-display, .countdown-label,
  .event-status-chip,
  .weather-pill,
  .eggman-take,
  .eggman-take-label,
  .crew-name,
  .crew-rank {
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
  /* No filter — CartoDB Voyager renders at native, designed-for-readability colors. */
  .leaflet-control-attribution { font-size: 9px !important; opacity: 0.5; }
`;i.createRoot(document.getElementById("root")).render((0,Sr.jsxs)(t.StrictMode,{children:[(0,Sr.jsx)(Sm,{}),(0,Sr.jsx)(_m,{})]}))})()})();
//# sourceMappingURL=main.0e21e823.js.map