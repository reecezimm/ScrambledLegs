/*! For license information please see main.13ab04d1.js.LICENSE.txt */
(()=>{var e={18:(e,t,n)=>{"use strict";n.d(t,{I:()=>o});const r="sl_device_id";function i(){const e=new Array(16);for(let n=0;n<16;n++)e[n]=Math.floor(256*Math.random());e[6]=15&e[6]|64,e[8]=63&e[8]|128;const t=e.map((e=>e.toString(16).padStart(2,"0")));return t.slice(0,4).join("")+"-"+t.slice(4,6).join("")+"-"+t.slice(6,8).join("")+"-"+t.slice(8,10).join("")+"-"+t.slice(10,16).join("")}let a=null;function o(){if(a)return a;try{let e=localStorage.getItem(r);return e||(e="undefined"!==typeof crypto&&crypto.randomUUID?crypto.randomUUID():i(),localStorage.setItem(r,e)),a=e,e}catch(e){return a=i(),a}}},43:(e,t,n)=>{"use strict";e.exports=n(202)},68:(e,t,n)=>{"use strict";n.d(t,{qk:()=>Fe,c7:()=>$e,KR:()=>ze,D:()=>Me,bp:()=>Le});var r=n(150),i=n(776),a=n(606);const o="firebasestorage.googleapis.com",s="storageBucket";class l extends i.g{constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;super(u(e),`Firebase Storage: ${t} (${u(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,l.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return u(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var c,d;function u(e){return"storage/"+e}function h(){return new l(c.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function p(){return new l(c.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function f(){return new l(c.CANCELED,"User canceled the upload/download.")}function m(){return new l(c.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function g(e){return new l(c.INVALID_ARGUMENT,e)}function b(){return new l(c.APP_DELETED,"The Firebase app was deleted.")}function y(e,t){return new l(c.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function v(e){throw new l(c.INTERNAL_ERROR,"Internal error: "+e)}!function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"}(c||(c={}));class x{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=x.makeFromUrl(e,t)}catch(i){return new x(e,"")}if(""===n.path)return n;throw r=e,new l(c.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.");var r}static makeFromUrl(e,t){let n=null;const r="([A-Za-z0-9.\\-_]+)";const i=new RegExp("^gs://"+r+"(/(.*))?$","i");function a(e){e.path_=decodeURIComponent(e.path)}const s=t.replace(/[.]/g,"\\."),d=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${s}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:a},{regex:new RegExp(`^https?://${t===o?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:a}];for(let o=0;o<d.length;o++){const t=d[o],r=t.regex.exec(e);if(r){const e=r[t.indices.bucket];let i=r[t.indices.path];i||(i=""),n=new x(e,i),t.postModify(n);break}}if(null==n)throw function(e){return new l(c.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return n}}class w{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(){}}function _(e){return"string"===typeof e||e instanceof String}function k(e){return S()&&e instanceof Blob}function S(){return"undefined"!==typeof Blob}function E(e,t,n,r){if(r<t)throw g(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw g(`Invalid value for '${e}'. Expected ${n} or less.`)}function C(e,t,n){let r=t;return null==n&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function T(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){n=n+(t(r)+"="+t(e[r]))+"&"}return n=n.slice(0,-1),n}function I(e,t){const n=e>=500&&e<600,r=-1!==[408,429].indexOf(e),i=-1!==t.indexOf(e);return n||r||i}!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(d||(d={}));class j{constructor(e,t,n,r,i,a,o,s,l,c,d){let u=!(arguments.length>11&&void 0!==arguments[11])||arguments[11],h=arguments.length>12&&void 0!==arguments[12]&&arguments[12];this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=o,this.errorCallback_=s,this.timeout_=l,this.progressCallback_=c,this.connectionFactory_=d,this.retry=u,this.isUsingEmulator=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise(((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()}))}start_(){const e=(e,t)=>{if(t)return void e(!1,new P(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then((()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const t=n.getErrorCode()===d.NO_ERROR,i=n.getStatus();if(!t||I(i,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===d.ABORT;return void e(!1,new P(!1,null,t))}const a=-1!==this.successCodes_.indexOf(i);e(!0,new P(a,n))}))},t=(e,t)=>{const n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(i,i.getResponse());void 0!==e?n(e):n()}catch(a){r(a)}else if(null!==i){const e=h();e.serverResponse=i.getErrorText(),this.errorCallback_?r(this.errorCallback_(i,e)):r(e)}else if(t.canceled){r(this.appDelete_?b():f())}else{r(p())}};this.canceled_?t(0,new P(!1,null,!0)):this.backoffId_=function(e,t,n){let r=1,i=null,a=null,o=!1,s=0;function l(){return 2===s}let c=!1;function d(){if(!c){c=!0;for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];t.apply(null,n)}}function u(t){i=setTimeout((()=>{i=null,e(p,l())}),t)}function h(){a&&clearTimeout(a)}function p(e){if(c)return void h();for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];if(e)return h(),void d.call(null,e,...n);if(l()||o)return h(),void d.call(null,e,...n);let a;r<64&&(r*=2),1===s?(s=2,a=0):a=1e3*(r+Math.random()),u(a)}let f=!1;function m(e){f||(f=!0,h(),c||(null!==i?(e||(s=2),clearTimeout(i),u(0)):e||(s=1)))}return u(0),a=setTimeout((()=>{o=!0,m(!0)}),n),m}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class P{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function A(){return"undefined"!==typeof BlobBuilder?BlobBuilder:"undefined"!==typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function N(){const e=A();for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if(void 0!==e){const t=new e;for(let e=0;e<n.length;e++)t.append(n[e]);return t.getBlob()}if(S())return new Blob(n);throw new l(c.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}function R(e){if("undefined"===typeof atob)throw t="base-64",new l(c.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`);var t;return atob(e)}const O="raw",D="base64",M="base64url",L="data_url";class F{constructor(e,t){this.data=e,this.contentType=t||null}}function z(e,t){switch(e){case O:return new F($(t));case D:case M:return new F(U(e,t));case L:return new F(function(e){const t=new B(e);return t.base64?U(D,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(n){throw y(L,"Malformed data URL.")}return $(t)}(t.rest)}(t),new B(t).contentType)}throw h()}function $(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|63&r);else if(55296===(64512&r)){if(n<e.length-1&&56320===(64512&e.charCodeAt(n+1))){r=65536|(1023&r)<<10|1023&e.charCodeAt(++n),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else t.push(239,191,189)}else 56320===(64512&r)?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function U(e,t){switch(e){case D:{const n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r){throw y(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?")}break}case M:{const n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r){throw y(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?")}t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=R(t)}catch(i){if(i.message.includes("polyfill"))throw i;throw y(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let a=0;a<n.length;a++)r[a]=n.charCodeAt(a);return r}class B{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw y(L,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;null!=n&&(this.base64=function(e,t){if(!(e.length>=t.length))return!1;return e.substring(e.length-t.length)===t}(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}class W{constructor(e,t){let n=0,r="";k(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(k(this.data_)){const n=function(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}(this.data_,e,t);return null===n?null:new W(n)}{const n=new Uint8Array(this.data_.buffer,e,t-e);return new W(n,!0)}}static getBlob(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];if(S()){const e=t.map((e=>e instanceof W?e.data_:e));return new W(N.apply(null,e))}{const e=t.map((e=>_(e)?z(O,e).data:e.data_));let n=0;e.forEach((e=>{n+=e.byteLength}));const r=new Uint8Array(n);let i=0;return e.forEach((e=>{for(let t=0;t<e.length;t++)r[i++]=e[t]})),new W(r,!0)}}uploadData(){return this.data_}}function H(e){let t;try{t=JSON.parse(e)}catch(r){return null}return"object"!==typeof(n=t)||Array.isArray(n)?null:t;var n}function V(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}function q(e,t){return t}class G{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||q}}let K=null;function Y(){if(K)return K;const e=[];e.push(new G("bucket")),e.push(new G("generation")),e.push(new G("metageneration")),e.push(new G("name","fullPath",!0));const t=new G("name");t.xform=function(e,t){return function(e){return!_(e)||e.length<2?e:V(e)}(t)},e.push(t);const n=new G("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new G("timeCreated")),e.push(new G("updated")),e.push(new G("md5Hash",null,!0)),e.push(new G("cacheControl",null,!0)),e.push(new G("contentDisposition",null,!0)),e.push(new G("contentEncoding",null,!0)),e.push(new G("contentLanguage",null,!0)),e.push(new G("contentType",null,!0)),e.push(new G("metadata","customMetadata",!0)),K=e,K}function Z(e,t,n){const r={type:"file"},i=n.length;for(let a=0;a<i;a++){const e=n[a];r[e.local]=e.xform(r,t[e.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){const n=e.bucket,r=e.fullPath,i=new x(n,r);return t._makeStorageReference(i)}})}(r,e),r}function J(e,t,n){const r=H(t);if(null===r)return null;return Z(e,r,n)}function Q(e,t){const n={},r=t.length;for(let i=0;i<r;i++){const r=t[i];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}class X{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}function ee(e){if(!e)throw h()}function te(e,t){return function(n,r){const i=J(e,r,t);return ee(null!==i),i}}function ne(e,t){return function(n,r){const i=J(e,r,t);return ee(null!==i),function(e,t,n,r){const i=H(t);if(null===i)return null;if(!_(i.downloadTokens))return null;const a=i.downloadTokens;if(0===a.length)return null;const o=encodeURIComponent;return a.split(",").map((t=>{const i=e.bucket,a=e.fullPath;return C("/b/"+o(i)+"/o/"+o(a),n,r)+T({alt:"media",token:t})}))[0]}(i,r,e.host,e._protocol)}}function re(e){return function(t,n){let r;var i,a;return 401===t.getStatus()?r=t.getErrorText().includes("Firebase App Check token is invalid")?new l(c.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new l(c.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(a=e.bucket,r=new l(c.QUOTA_EXCEEDED,"Quota for bucket '"+a+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(i=e.path,r=new l(c.UNAUTHORIZED,"User does not have permission to access '"+i+"'.")):r=n,r.status=t.getStatus(),r.serverResponse=n.serverResponse,r}}function ie(e){const t=re(e);return function(n,r){let i=t(n,r);var a;return 404===n.getStatus()&&(a=e.path,i=new l(c.OBJECT_NOT_FOUND,"Object '"+a+"' does not exist.")),i.serverResponse=r.serverResponse,i}}function ae(e,t,n){const r=C(t.fullServerUrl(),e.host,e._protocol),i=e.maxOperationRetryTime,a=new X(r,"GET",te(e,n),i);return a.errorHandler=ie(t),a}function oe(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),r}function se(e,t,n,r,i){const a=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};const s=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();o["Content-Type"]="multipart/related; boundary="+s;const l=oe(t,r,i),c="--"+s+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+Q(l,n)+"\r\n--"+s+"\r\nContent-Type: "+l.contentType+"\r\n\r\n",d="\r\n--"+s+"--",u=W.getBlob(c,r,d);if(null===u)throw m();const h={name:l.fullPath},p=C(a,e.host,e._protocol),f=e.maxUploadRetryTime,g=new X(p,"POST",te(e,n),f);return g.urlParams=h,g.headers=o,g.body=u.uploadData(),g.errorHandler=re(t),g}class le{constructor(e,t,n,r){this.current=e,this.total=t,this.finalized=!!n,this.metadata=r||null}}function ce(e,t){let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Status")}catch(r){ee(!1)}return ee(!!n&&-1!==(t||["active"]).indexOf(n)),n}const de=262144;function ue(e,t,n,r,i,a,o,s){const d=new le(0,0);if(o?(d.current=o.current,d.total=o.total):(d.current=0,d.total=r.size()),r.size()!==d.total)throw new l(c.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.");const u=d.total-d.current;let h=u;i>0&&(h=Math.min(h,i));const p=d.current,f=p+h;let g="";g=0===h?"finalize":u===h?"upload, finalize":"upload";const b={"X-Goog-Upload-Command":g,"X-Goog-Upload-Offset":`${d.current}`},y=r.slice(p,f);if(null===y)throw m();const v=t.maxUploadRetryTime,x=new X(n,"POST",(function(e,n){const i=ce(e,["active","final"]),o=d.current+h,s=r.size();let l;return l="final"===i?te(t,a)(e,n):null,new le(o,s,"final"===i,l)}),v);return x.headers=b,x.body=y.uploadData(),x.progressCallback=s||null,x.errorHandler=re(e),x}const he="running",pe="paused",fe="success",me="canceled",ge="error";function be(e){switch(e){case"running":case"pausing":case"canceling":return he;case"paused":return pe;case"success":return fe;case"canceled":return me;default:return ge}}class ye{constructor(e,t,n){if("function"===typeof e||null!=t||null!=n)this.next=e,this.error=t??void 0,this.complete=n??void 0;else{const t=e;this.next=t.next,this.error=t.error,this.complete=t.complete}}}function ve(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];Promise.resolve().then((()=>e(...n)))}}let xe=null;class we{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=d.NO_ERROR,this.sendPromise_=new Promise((e=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=d.ABORT,e()})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=d.NETWORK_ERROR,e()})),this.xhr_.addEventListener("load",(()=>{e()}))}))}send(e,t,n,r,a){if(this.sent_)throw v("cannot .send() more than once");if((0,i.zJ)(e)&&n&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==a)for(const i in a)a.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,a[i].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw v("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw v("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}}getResponse(){if(!this.sent_)throw v("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw v("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class _e extends we{initXhr(){this.xhr_.responseType="text"}}function ke(){return xe?xe():new _e}class Se{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=n,this._mappings=Y(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=e=>{if(this._request=void 0,this._chunkMultiplier=1,e._codeEquals(c.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const t=this.isExponentialBackoffExpired();if(I(e.status,[])){if(!t)return this.sleepTime=Math.max(2*this.sleepTime,1e3),this._needToFetchStatus=!0,void this.completeTransitions_();e=p()}this._error=e,this._transition("error")}},this._metadataErrorHandler=e=>{this._request=void 0,e._codeEquals(c.CANCELED)?this.completeTransitions_():(this._error=e,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise(((e,t)=>{this._resolve=e,this._reject=t,this._start()})),this._promise.then(null,(()=>{}))}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout((()=>{this.pendingTimeout=void 0,this._continueUpload()}),this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then((t=>{let[n,r]=t;switch(this._state){case"running":e(n,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused")}}))}_createResumable(){this._resolveToken(((e,t)=>{const n=function(e,t,n,r,i){const a=t.bucketOnlyServerUrl(),o=oe(t,r,i),s={name:o.fullPath},l=C(a,e.host,e._protocol),c={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},d=Q(o,n),u=e.maxUploadRetryTime,h=new X(l,"POST",(function(e){let t;ce(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(n){ee(!1)}return ee(_(t)),t}),u);return h.urlParams=s,h.headers=c,h.body=d,h.errorHandler=re(t),h}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(n,ke,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._uploadUrl=e,this._needToFetchStatus=!1,this.completeTransitions_()}),this._errorHandler)}))}_fetchStatus(){const e=this._uploadUrl;this._resolveToken(((t,n)=>{const r=function(e,t,n,r){const i=e.maxUploadRetryTime,a=new X(n,"POST",(function(e){const t=ce(e,["active","final"]);let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(a){ee(!1)}n||ee(!1);const i=Number(n);return ee(!isNaN(i)),new le(i,r.size(),"final"===t)}),i);return a.headers={"X-Goog-Upload-Command":"query"},a.errorHandler=re(t),a}(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(r,ke,t,n);this._request=i,i.getPromise().then((e=>{this._request=void 0,this._updateProgress(e.current),this._needToFetchStatus=!1,e.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()}),this._errorHandler)}))}_continueUpload(){const e=de*this._chunkMultiplier,t=new le(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken(((r,i)=>{let a;try{a=ue(this._ref._location,this._ref.storage,n,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(s){return this._error=s,void this._transition("error")}const o=this._ref.storage._makeRequest(a,ke,r,i,!1);this._request=o,o.getPromise().then((e=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(e.current),e.finalized?(this._metadata=e.metadata,this._transition("success")):this.completeTransitions_()}),this._errorHandler)}))}_increaseMultiplier(){2*(de*this._chunkMultiplier)<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken(((e,t)=>{const n=ae(this._ref.storage,this._ref._location,this._mappings),r=this._ref.storage._makeRequest(n,ke,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._metadata=e,this._transition("success")}),this._metadataErrorHandler)}))}_oneShotUpload(){this._resolveToken(((e,t)=>{const n=se(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(n,ke,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._metadata=e,this._updateProgress(this._blob.size()),this._transition("success")}),this._errorHandler)}))}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":case"error":case"success":this._state=e,this._notifyObservers();break;case"canceled":this._error=f(),this._state=e,this._notifyObservers()}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}}get snapshot(){const e=be(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,n,r){const i=new ye(t||void 0,n||void 0,r||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise();this._observers.slice().forEach((e=>{this._notifyObserver(e)}))}_finishPromise(){if(void 0!==this._resolve){let e=!0;switch(be(this._state)){case fe:ve(this._resolve.bind(null,this.snapshot))();break;case me:case ge:ve(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(be(this._state)){case he:case pe:e.next&&ve(e.next.bind(e,this.snapshot))();break;case fe:e.complete&&ve(e.complete.bind(e))();break;default:e.error&&ve(e.error.bind(e,this._error))()}}resume(){const e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e}pause(){const e="running"===this._state;return e&&this._transition("pausing"),e}cancel(){const e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e}}class Ee{constructor(e,t){this._service=e,this._location=t instanceof x?t:x.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Ee(e,t)}get root(){const e=new x(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return V(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new x(this._location.bucket,e);return new Ee(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new l(c.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function Ce(e,t,n){e._throwIfRoot("uploadBytes");const r=se(e.storage,e._location,Y(),new W(t,!0),n);return e.storage.makeRequestWithTokens(r,ke).then((t=>({metadata:t,ref:e})))}function Te(e){e._throwIfRoot("getDownloadURL");const t=function(e,t,n){const r=C(t.fullServerUrl(),e.host,e._protocol),i=e.maxOperationRetryTime,a=new X(r,"GET",ne(e,n),i);return a.errorHandler=ie(t),a}(e.storage,e._location,Y());return e.storage.makeRequestWithTokens(t,ke).then((e=>{if(null===e)throw new l(c.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e}))}function Ie(e,t){const n=function(e,t){const n=t.split("/").filter((e=>e.length>0)).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),r=new x(e._location.bucket,n);return new Ee(e.storage,r)}function je(e,t){if(e instanceof Ne){const n=e;if(null==n._bucket)throw new l(c.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+s+"' property when initializing the app?");const r=new Ee(n,n._bucket);return null!=t?je(r,t):r}return void 0!==t?Ie(e,t):e}function Pe(e,t){if(t&&/^[A-Za-z]+:\/\//.test(t)){if(e instanceof Ne)return new Ee(e,t);throw g("To use ref(service, url), the first argument must be a Storage instance.")}return je(e,t)}function Ae(e,t){const n=t?.[s];return null==n?null:x.makeFromBucketSpec(n,e)}class Ne{constructor(e,t,n,r,i){let a=arguments.length>5&&void 0!==arguments[5]&&arguments[5];this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._isUsingEmulator=a,this._bucket=null,this._host=o,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?x.makeFromBucketSpec(r,this._host):Ae(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=x.makeFromBucketSpec(this._url,e):this._bucket=Ae(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){E("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){E("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if((0,r.xZ)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});if(e){return(await e.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach((e=>e.cancel())),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Ee(this,e)}_makeRequest(e,t,n,r){let i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(this._deleted)return new w(b());{const a=function(e,t,n,r,i,a){let o=!(arguments.length>6&&void 0!==arguments[6])||arguments[6],s=arguments.length>7&&void 0!==arguments[7]&&arguments[7];const l=T(e.urlParams),c=e.url+l,d=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(d,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(d,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}(d,a),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(d,r),new j(c,e.method,d,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,o,s)}(e,this._appId,n,r,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then((()=>this._requests.delete(a)),(()=>this._requests.delete(a))),a}}async makeRequestWithTokens(e,t){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}const Re="@firebase/storage",Oe="0.14.2",De="storage";function Me(e,t,n){return Ce(e=(0,i.Ku)(e),t,n)}function Le(e,t,n){return function(e,t,n){return e._throwIfRoot("uploadBytesResumable"),new Se(e,new W(t),n)}(e=(0,i.Ku)(e),t,n)}function Fe(e){return Te(e=(0,i.Ku)(e))}function ze(e,t){return Pe(e=(0,i.Ku)(e),t)}function $e(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Sx)(),t=arguments.length>1?arguments[1]:void 0;e=(0,i.Ku)(e);const n=(0,r.j6)(e,De).getImmediate({identifier:t}),a=(0,i.yU)("storage");return a&&function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};!function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};e.host=`${t}:${n}`;const a=(0,i.zJ)(t);a&&(0,i.gE)(`https://${e.host}/b`),e._isUsingEmulator=!0,e._protocol=a?"https":"http";const{mockUserToken:o}=r;o&&(e._overrideAuthToken="string"===typeof o?o:(0,i.Fy)(o,e.app.options.projectId))}(e,t,n,r)}(n,...a),n}function Ue(e,t){let{instanceIdentifier:n}=t;const i=e.getProvider("app").getImmediate(),a=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return new Ne(i,a,o,n,r.MF)}(0,r.om)(new a.uA(De,Ue,"PUBLIC").setMultipleInstances(!0)),(0,r.KO)(Re,Oe,""),(0,r.KO)(Re,Oe,"esm2020")},116:(e,t,n)=>{"use strict";n.d(t,{hl:()=>r,IN:()=>i,ud:()=>a});const r="3.1.0",i="77",a="48045be";"undefined"!==typeof window&&(window.__sl_build={version:r,num:i,sha:a,time:"2026-05-06T16:58:25Z"})},122:(e,t,n)=>{"use strict";n.d(t,{yA:()=>b,j2:()=>x,OO:()=>y,Oe:()=>_,IG:()=>v});var r=n(150);(0,r.KO)("firebase","12.12.1","app");var i=n(800),a=n(68),o=n(508),s=n(776),l=n(606);const c="functions";s.g;class d{constructor(e,t,n,i){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,(0,r.xZ)(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=n.getImmediate({optional:!0}),this.auth||t.get().then((e=>this.auth=e),(()=>{})),this.messaging||n.get().then((e=>this.messaging=e),(()=>{})),this.appCheck||i?.get().then((e=>this.appCheck=e),(()=>{}))}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch(e){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return await this.messaging.getToken()}catch(e){return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){return{authToken:await this.getAuthToken(),messagingToken:await this.getMessagingToken(),appCheckToken:await this.getAppCheckToken(e)}}}const u="us-central1";class h{constructor(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:u,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:function(){return fetch(...arguments)};this.app=e,this.fetchImpl=a,this.emulatorOrigin=null,this.contextProvider=new d(e,t,n,r),this.cancelAllRequests=new Promise((e=>{this.deleteService=()=>Promise.resolve(e())}));try{const e=new URL(i);this.customDomain=e.origin+("/"===e.pathname?"":e.pathname),this.region=u}catch(o){this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;if(null!==this.emulatorOrigin){return`${this.emulatorOrigin}/${t}/${this.region}/${e}`}return null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}const p="@firebase/functions",f="0.13.3";var m;(0,r.om)(new l.uA(c,((e,t)=>{let{instanceIdentifier:n}=t;const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),a=e.getProvider("messaging-internal"),o=e.getProvider("app-check-internal");return new h(r,i,a,o,n)}),"PUBLIC").setMultipleInstances(!0)),(0,r.KO)(p,f,m),(0,r.KO)(p,f,"esm2020");var g=n(873);const b=(0,r.Wp)({apiKey:"AIzaSyAmwwbvmvxNYX-8PesRl8io9CH60sI2v2A",authDomain:"fundraiser-f0831.firebaseapp.com",databaseURL:"https://fundraiser-f0831-default-rtdb.firebaseio.com",projectId:"fundraiser-f0831",storageBucket:"fundraiser-f0831.firebasestorage.app",messagingSenderId:"900827039889",appId:"1:900827039889:web:4bd336cb4f88a0c76e1730"}),y=(0,i.C3)(b),v=(0,a.c7)(b),x=(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Sx)(),t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u;const n=(0,r.j6)((0,s.Ku)(e),c).getImmediate({identifier:t}),i=(0,s.yU)("functions");i&&function(e,t,n){!function(e,t,n){const r=(0,s.zJ)(t);e.emulatorOrigin=`http${r?"s":""}://${t}:${n}`,r&&(0,s.gE)(e.emulatorOrigin+"/backends")}((0,s.Ku)(e),t,n)}(n,...i)}(b),(0,g.xI)(b));(0,g.oM)(x,g.F0).catch((()=>{}));let w=null;function _(){return w||(w=(0,o.TT)().then((e=>{if(!e)return null;try{return(0,o.dG)(b)}catch(t){return null}})).catch((()=>null)),w)}},150:(e,t,n)=>{"use strict";n.d(t,{KO:()=>Q,MF:()=>Y,Sx:()=>J,Wp:()=>Z,j6:()=>H,om:()=>W,xZ:()=>V});var r=n(606),i=n(965),a=n(776),o=n(799);class s{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===t?.type}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const l="@firebase/app",c="0.14.11",d=new i.Vy("@firebase/app"),u="@firebase/app-compat",h="@firebase/analytics-compat",p="@firebase/analytics",f="@firebase/app-check-compat",m="@firebase/app-check",g="@firebase/auth",b="@firebase/auth-compat",y="@firebase/database",v="@firebase/data-connect",x="@firebase/database-compat",w="@firebase/functions",_="@firebase/functions-compat",k="@firebase/installations",S="@firebase/installations-compat",E="@firebase/messaging",C="@firebase/messaging-compat",T="@firebase/performance",I="@firebase/performance-compat",j="@firebase/remote-config",P="@firebase/remote-config-compat",A="@firebase/storage",N="@firebase/storage-compat",R="@firebase/firestore",O="@firebase/ai",D="@firebase/firestore-compat",M="firebase",L="[DEFAULT]",F={[l]:"fire-core",[u]:"fire-core-compat",[p]:"fire-analytics",[h]:"fire-analytics-compat",[m]:"fire-app-check",[f]:"fire-app-check-compat",[g]:"fire-auth",[b]:"fire-auth-compat",[y]:"fire-rtdb",[v]:"fire-data-connect",[x]:"fire-rtdb-compat",[w]:"fire-fn",[_]:"fire-fn-compat",[k]:"fire-iid",[S]:"fire-iid-compat",[E]:"fire-fcm",[C]:"fire-fcm-compat",[T]:"fire-perf",[I]:"fire-perf-compat",[j]:"fire-rc",[P]:"fire-rc-compat",[A]:"fire-gcs",[N]:"fire-gcs-compat",[R]:"fire-fst",[D]:"fire-fst-compat",[O]:"fire-vertex","fire-js":"fire-js",[M]:"fire-js-all"},z=new Map,$=new Map,U=new Map;function B(e,t){try{e.container.addComponent(t)}catch(n){d.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function W(e){const t=e.name;if(U.has(t))return d.debug(`There were multiple attempts to register component ${t}.`),!1;U.set(t,e);for(const n of z.values())B(n,e);for(const n of $.values())B(n,e);return!0}function H(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function V(e){return null!==e&&void 0!==e&&void 0!==e.settings}const q={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},G=new a.FA("app","Firebase",q);class K{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new r.uA("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw G.create("app-deleted",{appName:this._name})}}const Y="12.12.0";function Z(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e;if("object"!==typeof t){t={name:t}}const i={name:L,automaticDataCollectionEnabled:!0,...t},o=i.name;if("string"!==typeof o||!o)throw G.create("bad-app-name",{appName:String(o)});if(n||(n=(0,a.T9)()),!n)throw G.create("no-options");const s=z.get(o);if(s){if((0,a.bD)(n,s.options)&&(0,a.bD)(i,s.config))return s;throw G.create("duplicate-app",{appName:o})}const l=new r.h1(o);for(const r of U.values())l.addComponent(r);const c=new K(n,i,l);return z.set(o,c),c}function J(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L;const t=z.get(e);if(!t&&e===L&&(0,a.T9)())return Z();if(!t)throw G.create("no-app",{appName:e});return t}function Q(e,t,n){let i=F[e]??e;n&&(i+=`-${n}`);const a=i.match(/\s|\//),o=t.match(/\s|\//);if(a||o){const e=[`Unable to register library "${i}" with version "${t}":`];return a&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),a&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void d.warn(e.join(" "))}W(new r.uA(`${i}-version`,(()=>({library:i,version:t})),"VERSION"))}const X="firebase-heartbeat-store";let ee=null;function te(){return ee||(ee=(0,o.P2)("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(X)}catch(n){console.warn(n)}}}).catch((e=>{throw G.create("idb-open",{originalErrorMessage:e.message})}))),ee}async function ne(e,t){try{const n=(await te()).transaction(X,"readwrite"),r=n.objectStore(X);await r.put(t,re(e)),await n.done}catch(n){if(n instanceof a.g)d.warn(n.message);else{const e=G.create("idb-set",{originalErrorMessage:n?.message});d.warn(e.message)}}}function re(e){return`${e.name}!${e.options.appId}`}class ie{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new oe(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=ae();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some((e=>e.date===t)))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){d.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=ae(),{heartbeatsToSend:t,unsentEntries:n}=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1024;const n=[];let r=e.slice();for(const i of e){const e=n.find((e=>e.agent===i.agent));if(e){if(e.dates.push(i.date),se(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),se(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),r=(0,a.Uj)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return d.warn(e),""}}}function ae(){return(new Date).toISOString().substring(0,10)}class oe{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,a.zW)()&&(0,a.eX)().then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await te()).transaction(X),n=await t.objectStore(X).get(re(e));return await t.done,n}catch(t){if(t instanceof a.g)d.warn(t.message);else{const e=G.create("idb-get",{originalErrorMessage:t?.message});d.warn(e.message)}}}(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return ne(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return ne(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function se(e){return(0,a.Uj)(JSON.stringify({version:2,heartbeats:e})).length}var le;le="",W(new r.uA("platform-logger",(e=>new s(e)),"PRIVATE")),W(new r.uA("heartbeat",(e=>new ie(e)),"PRIVATE")),Q(l,c,le),Q(l,c,"esm2020"),Q("fire-js","")},153:(e,t,n)=>{"use strict";var r=n(43),i=Symbol.for("react.element"),a=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,a={},c=null,d=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)o.call(t,r)&&!l.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===a[r]&&(a[r]=t[r]);return{$$typeof:i,type:e,key:c,ref:d,props:a,_owner:s.current}}t.Fragment=a,t.jsx=c,t.jsxs=c},173:(e,t,n)=>{"use strict";n.d(t,{logEvent:()=>c});var r=n(800),i=n(122),a=n(18),o=n(241),s=n(116);let l=!1;function c(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e)try{const c=(0,r.VC)((0,r.ref)(i.OO,"analyticsEvents")),d="undefined"!==typeof window?window.location.pathname:"",u=!l;l=!0;const h={name:String(e),props:t||{},uid:i.j2.currentUser&&i.j2.currentUser.uid||null,deviceId:(0,a.I)(),sessionId:(0,o.u0)(),path:d,version:s.hl,buildNum:s.IN,buildSha:s.ud,ts:(0,r.O5)()};u&&"undefined"!==typeof document&&(h.referrer=document.referrer||""),(0,r.hZ)(c,h).catch((()=>{}));try{(0,o.U2)()}catch(n){}}catch(n){}}},202:(e,t)=>{"use strict";var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),p=Symbol.iterator;var f={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,g={};function b(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||f}function y(){}function v(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||f}b.prototype.isReactComponent={},b.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},b.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=b.prototype;var x=v.prototype=new y;x.constructor=v,m(x,b.prototype),x.isPureReactComponent=!0;var w=Array.isArray,_=Object.prototype.hasOwnProperty,k={current:null},S={key:!0,ref:!0,__self:!0,__source:!0};function E(e,t,r){var i,a={},o=null,s=null;if(null!=t)for(i in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(o=""+t.key),t)_.call(t,i)&&!S.hasOwnProperty(i)&&(a[i]=t[i]);var l=arguments.length-2;if(1===l)a.children=r;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];a.children=c}if(e&&e.defaultProps)for(i in l=e.defaultProps)void 0===a[i]&&(a[i]=l[i]);return{$$typeof:n,type:e,key:o,ref:s,props:a,_owner:k.current}}function C(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var T=/\/+/g;function I(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function j(e,t,i,a,o){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l=!1;if(null===e)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case n:case r:l=!0}}if(l)return o=o(l=e),e=""===a?"."+I(l,0):a,w(o)?(i="",null!=e&&(i=e.replace(T,"$&/")+"/"),j(o,t,i,"",(function(e){return e}))):null!=o&&(C(o)&&(o=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(o,i+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(T,"$&/")+"/")+e)),t.push(o)),1;if(l=0,a=""===a?".":a+":",w(e))for(var c=0;c<e.length;c++){var d=a+I(s=e[c],c);l+=j(s,t,i,d,o)}else if(d=function(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"===typeof d)for(e=d.call(e),c=0;!(s=e.next()).done;)l+=j(s=s.value,t,i,d=a+I(s,c++),o);else if("object"===s)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function P(e,t,n){if(null==e)return e;var r=[],i=0;return j(e,r,"","",(function(e){return t.call(n,e,i++)})),r}function A(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var N={current:null},R={transition:null},O={ReactCurrentDispatcher:N,ReactCurrentBatchConfig:R,ReactCurrentOwner:k};function D(){throw Error("act(...) is not supported in production builds of React.")}t.Children={map:P,forEach:function(e,t,n){P(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return P(e,(function(){t++})),t},toArray:function(e){return P(e,(function(e){return e}))||[]},only:function(e){if(!C(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=b,t.Fragment=i,t.Profiler=o,t.PureComponent=v,t.StrictMode=a,t.Suspense=d,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=O,t.act=D,t.cloneElement=function(e,t,r){if(null===e||void 0===e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var i=m({},e.props),a=e.key,o=e.ref,s=e._owner;if(null!=t){if(void 0!==t.ref&&(o=t.ref,s=k.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)_.call(t,c)&&!S.hasOwnProperty(c)&&(i[c]=void 0===t[c]&&void 0!==l?l[c]:t[c])}var c=arguments.length-2;if(1===c)i.children=r;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];i.children=l}return{$$typeof:n,type:e.type,key:a,ref:o,props:i,_owner:s}},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:s,_context:e},e.Consumer=e},t.createElement=E,t.createFactory=function(e){var t=E.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=C,t.lazy=function(e){return{$$typeof:h,_payload:{_status:-1,_result:e},_init:A}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=R.transition;R.transition={};try{e()}finally{R.transition=t}},t.unstable_act=D,t.useCallback=function(e,t){return N.current.useCallback(e,t)},t.useContext=function(e){return N.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return N.current.useDeferredValue(e)},t.useEffect=function(e,t){return N.current.useEffect(e,t)},t.useId=function(){return N.current.useId()},t.useImperativeHandle=function(e,t,n){return N.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return N.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return N.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return N.current.useMemo(e,t)},t.useReducer=function(e,t,n){return N.current.useReducer(e,t,n)},t.useRef=function(e){return N.current.useRef(e)},t.useState=function(e){return N.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return N.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return N.current.useTransition()},t.version="18.3.1"},234:(e,t)=>{"use strict";function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,i=e[r];if(!(0<a(i,t)))break e;e[r]=t,e[n]=i,n=r}}function r(e){return 0===e.length?null:e[0]}function i(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,i=e.length,o=i>>>1;r<o;){var s=2*(r+1)-1,l=e[s],c=s+1,d=e[c];if(0>a(l,n))c<i&&0>a(d,l)?(e[r]=d,e[c]=n,r=c):(e[r]=l,e[s]=n,r=s);else{if(!(c<i&&0>a(d,n)))break e;e[r]=d,e[c]=n,r=c}}}return t}function a(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if("object"===typeof performance&&"function"===typeof performance.now){var o=performance;t.unstable_now=function(){return o.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var c=[],d=[],u=1,h=null,p=3,f=!1,m=!1,g=!1,b="function"===typeof setTimeout?setTimeout:null,y="function"===typeof clearTimeout?clearTimeout:null,v="undefined"!==typeof setImmediate?setImmediate:null;function x(e){for(var t=r(d);null!==t;){if(null===t.callback)i(d);else{if(!(t.startTime<=e))break;i(d),t.sortIndex=t.expirationTime,n(c,t)}t=r(d)}}function w(e){if(g=!1,x(e),!m)if(null!==r(c))m=!0,R(_);else{var t=r(d);null!==t&&O(w,t.startTime-e)}}function _(e,n){m=!1,g&&(g=!1,y(C),C=-1),f=!0;var a=p;try{for(x(n),h=r(c);null!==h&&(!(h.expirationTime>n)||e&&!j());){var o=h.callback;if("function"===typeof o){h.callback=null,p=h.priorityLevel;var s=o(h.expirationTime<=n);n=t.unstable_now(),"function"===typeof s?h.callback=s:h===r(c)&&i(c),x(n)}else i(c);h=r(c)}if(null!==h)var l=!0;else{var u=r(d);null!==u&&O(w,u.startTime-n),l=!1}return l}finally{h=null,p=a,f=!1}}"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var k,S=!1,E=null,C=-1,T=5,I=-1;function j(){return!(t.unstable_now()-I<T)}function P(){if(null!==E){var e=t.unstable_now();I=e;var n=!0;try{n=E(!0,e)}finally{n?k():(S=!1,E=null)}}else S=!1}if("function"===typeof v)k=function(){v(P)};else if("undefined"!==typeof MessageChannel){var A=new MessageChannel,N=A.port2;A.port1.onmessage=P,k=function(){N.postMessage(null)}}else k=function(){b(P,0)};function R(e){E=e,S||(S=!0,k())}function O(e,n){C=b((function(){e(t.unstable_now())}),n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){m||f||(m=!0,R(_))},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_getFirstCallbackNode=function(){return r(c)},t.unstable_next=function(e){switch(p){case 1:case 2:case 3:var t=3;break;default:t=p}var n=p;p=t;try{return e()}finally{p=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=p;p=e;try{return t()}finally{p=n}},t.unstable_scheduleCallback=function(e,i,a){var o=t.unstable_now();switch("object"===typeof a&&null!==a?a="number"===typeof(a=a.delay)&&0<a?o+a:o:a=o,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:u++,callback:i,priorityLevel:e,startTime:a,expirationTime:s=a+s,sortIndex:-1},a>o?(e.sortIndex=a,n(d,e),null===r(c)&&e===r(d)&&(g?(y(C),C=-1):g=!0,O(w,a-o))):(e.sortIndex=s,n(c,e),m||f||(m=!0,R(_))),e},t.unstable_shouldYield=j,t.unstable_wrapCallback=function(e){var t=p;return function(){var n=p;p=t;try{return e.apply(this,arguments)}finally{p=n}}}},241:(e,t,n)=>{"use strict";n.d(t,{Ie:()=>x,U2:()=>v,u0:()=>y});var r=n(800),i=n(873),a=n(122),o=n(18),s=n(116);const l="sl_session_id",c="sl_session_last_active",d=18e5,u=3e4;function h(){try{if("undefined"!==typeof crypto&&crypto.randomUUID)return crypto.randomUUID()}catch(n){}const e=new Array(16);for(let r=0;r<16;r++)e[r]=Math.floor(256*Math.random());e[6]=15&e[6]|64,e[8]=63&e[8]|128;const t=e.map((e=>e.toString(16).padStart(2,"0")));return t.slice(0,4).join("")+"-"+t.slice(4,6).join("")+"-"+t.slice(6,8).join("")+"-"+t.slice(8,10).join("")+"-"+t.slice(10,16).join("")}let p=null,f=0;function m(e,t){try{sessionStorage.setItem(l,e),sessionStorage.setItem(c,String(t))}catch(n){}}function g(){const{id:e,lastActive:t}=function(){try{return{id:sessionStorage.getItem(l),lastActive:parseInt(sessionStorage.getItem(c)||"0",10)||0}}catch(e){return{id:null,lastActive:0}}}();return e&&t&&Date.now()-t<d?{id:e,isNew:!1}:{id:h(),isNew:!0}}function b(){try{const{id:t,isNew:n}=g();if(p=t,m(t,Date.now()),!n)return;const i=(0,o.I)(),l=a.j2&&a.j2.currentUser&&a.j2.currentUser.uid||null,c="undefined"!==typeof window?window.location.pathname:"",d="undefined"!==typeof document&&document.referrer||"",u="undefined"!==typeof navigator?navigator.userAgent.slice(0,300):"",h={id:t,startedAt:(0,r.O5)(),lastActiveAt:(0,r.O5)(),deviceId:i,uid:l,path:c,referrer:d,ua:u,version:s.hl,buildNum:s.IN,buildSha:s.ud,pageViews:0,eventCount:0};(0,r.yo)((0,r.ref)(a.OO,`sessions/${t}`),h).catch((()=>{}));try{(0,r.yX)((0,r.ref)(a.OO,`sessions/${t}/endedAt`)).set((0,r.O5)())}catch(e){}}catch(e){}}function y(){return p||b(),p}function v(){try{p||b();const e=p;if(!e)return;const t=Date.now();if(m(e,t),t-f<u)return;f=t,(0,r.c4)((0,r.ref)(a.OO,`sessions/${e}/eventCount`),(e=>(e||0)+1)).catch((()=>{})),(0,r.yo)((0,r.ref)(a.OO,`sessions/${e}`),{lastActiveAt:(0,r.O5)()}).catch((()=>{}))}catch(e){}}function x(){try{p||b();const e=p;if(!e)return;(0,r.c4)((0,r.ref)(a.OO,`sessions/${e}/pageViews`),(e=>(e||0)+1)).catch((()=>{}))}catch(e){}}function w(){try{if(!p)return;const t=`sessions/${p}`,n={endedAt:Date.now()};if("undefined"!==typeof navigator&&navigator.sendBeacon)try{const e=a.OO&&a.OO.app&&a.OO.app.options&&a.OO.app.options.databaseURL||"";if(e){const r=`${e.replace(/\/$/,"")}/${t}.json`,i=new Blob([JSON.stringify(n)],{type:"application/json"});navigator.sendBeacon(r,i)}}catch(e){}(0,r.yo)((0,r.ref)(a.OO,t),{endedAt:(0,r.O5)()}).catch((()=>{}))}catch(e){}}try{b(),"undefined"!==typeof window&&"undefined"!==typeof document&&(document.addEventListener("visibilitychange",(()=>{try{if(!p)return;const e=p;m(e,Date.now()),"hidden"===document.visibilityState?(0,r.yo)((0,r.ref)(a.OO,`sessions/${e}`),{lastActiveAt:(0,r.O5)(),hiddenAt:(0,r.O5)()}).catch((()=>{})):(0,r.yo)((0,r.ref)(a.OO,`sessions/${e}`),{lastActiveAt:(0,r.O5)()}).catch((()=>{}))}catch(e){}})),window.addEventListener("pagehide",w),window.addEventListener("beforeunload",w)),function(){try{(0,i.hg)(a.j2,(e=>{try{if(!p)return;const t=e?e.uid:null;(0,r.yo)((0,r.ref)(a.OO,`sessions/${p}`),{uid:t}).catch((()=>{}))}catch(t){}}))}catch(e){}}()}catch(_){}},324:e=>{e.exports=function(e,t,n,r){var i=n?n.call(r,e,t):void 0;if(void 0!==i)return!!i;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var a=Object.keys(e),o=Object.keys(t);if(a.length!==o.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),l=0;l<a.length;l++){var c=a[l];if(!s(c))return!1;var d=e[c],u=t[c];if(!1===(i=n?n.call(r,d,u,c):void 0)||void 0===i&&d!==u)return!1}return!0}},334:()=>{const e="sl_chunk_reload_at";function t(){try{const t=parseInt(sessionStorage.getItem(e)||"0",10);if(Date.now()-t<3e4)return;sessionStorage.setItem(e,String(Date.now()))}catch(t){}try{const e=new URL(window.location.href);return e.searchParams.set("_v",String(Date.now())),void window.location.replace(e.toString())}catch(t){}window.location.reload()}function n(e){if(!e)return!1;const t=String(e);return/Loading chunk [\w-]+ failed/i.test(t)||/Loading CSS chunk [\w-]+ failed/i.test(t)||/ChunkLoadError/i.test(t)}"undefined"!==typeof window&&(window.addEventListener("error",(e=>{n(e&&(e.message||e.error&&e.error.message))&&t()})),window.addEventListener("unhandledrejection",(e=>{const r=e&&e.reason;n(r&&(r.message||String(r)))&&t()})));let r=null;async function i(){if("undefined"===typeof document)return;if("visible"!==document.visibilityState)return;const e=await async function(){try{const e=`/asset-manifest.json?ts=${Date.now()}`,t=await fetch(e,{cache:"no-store"});if(!t.ok)return null;const n=await t.json();return n.files&&(n.files["main.js"]||n.files["main.css"])||null}catch(e){return null}}();if(e)if(r){if(e!==r)try{window.dispatchEvent(new CustomEvent("freshness:update-available",{detail:{from:r,to:e}}))}catch(t){}}else r=e}"undefined"!==typeof window&&(setTimeout((()=>{i()}),2e3),window.addEventListener("focus",i),document.addEventListener("visibilitychange",i),setInterval(i,3e5))},391:(e,t,n)=>{"use strict";var r=n(950);t.createRoot=r.createRoot,t.hydrateRoot=r.hydrateRoot},508:(e,t,n)=>{"use strict";n.d(t,{dG:()=>ze,gf:()=>$e,TT:()=>Fe,xD:()=>Ue});var r=n(150),i=n(606),a=n(776),o=n(799);const s="@firebase/installations",l="0.6.21",c=1e4,d=`w:${l}`,u="FIS_v2",h=36e5,p={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},f=new a.FA("installations","Installations",p);function m(e){return e instanceof a.g&&e.code.includes("request-failed")}function g(e){let{projectId:t}=e;return`https://firebaseinstallations.googleapis.com/v1/projects/${t}/installations`}function b(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function y(e,t){const n=(await t.json()).error;return f.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function v(e){let{apiKey:t}=e;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function x(e,t){let{refreshToken:n}=t;const r=v(e);return r.append("Authorization",function(e){return`${u} ${e}`}(n)),r}async function w(e){const t=await e();return t.status>=500&&t.status<600?e():t}function _(e){return new Promise((t=>{setTimeout(t,e)}))}const k=/^[cdef][\w-]{21}$/;function S(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}(e);return k.test(t)?t:""}catch{return""}}function E(e){return`${e.appName}!${e.appId}`}const C=new Map;function T(e,t){const n=E(e);I(n,t),function(e,t){const n=P();n&&n.postMessage({key:e,fid:t});A()}(n,t)}function I(e,t){const n=C.get(e);if(n)for(const r of n)r(t)}let j=null;function P(){return!j&&"BroadcastChannel"in self&&(j=new BroadcastChannel("[Firebase] FID Change"),j.onmessage=e=>{I(e.data.key,e.data.fid)}),j}function A(){0===C.size&&j&&(j.close(),j=null)}const N="firebase-installations-store";let R=null;function O(){return R||(R=(0,o.P2)("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(N)}})),R}async function D(e,t){const n=E(e),r=(await O()).transaction(N,"readwrite"),i=r.objectStore(N),a=await i.get(n);return await i.put(t,n),await r.done,a&&a.fid===t.fid||T(e,t.fid),t}async function M(e){const t=E(e),n=(await O()).transaction(N,"readwrite");await n.objectStore(N).delete(t),await n.done}async function L(e,t){const n=E(e),r=(await O()).transaction(N,"readwrite"),i=r.objectStore(N),a=await i.get(n),o=t(a);return void 0===o?await i.delete(n):await i.put(o,n),await r.done,!o||a&&a.fid===o.fid||T(e,o.fid),o}async function F(e){let t;const n=await L(e.appConfig,(n=>{const r=function(e){const t=e||{fid:S(),registrationStatus:0};return U(t)}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(f.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function(e,t){let{appConfig:n,heartbeatServiceProvider:r}=e,{fid:i}=t;const a=g(n),o=v(n),s=r.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&o.append("x-firebase-client",e)}const l={fid:i,authVersion:u,appId:n.appId,sdkVersion:d},c={method:"POST",headers:o,body:JSON.stringify(l)},h=await w((()=>fetch(a,c)));if(h.ok){const e=await h.json();return{fid:e.fid||i,registrationStatus:2,refreshToken:e.refreshToken,authToken:b(e.authToken)}}throw await y("Create Installation",h)}(e,t);return D(e.appConfig,n)}catch(n){throw m(n)&&409===n.customData.serverCode?await M(e.appConfig):await D(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:z(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function z(e){let t=await $(e.appConfig);for(;1===t.registrationStatus;)await _(100),t=await $(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await F(e);return n||t}return t}function $(e){return L(e,(e=>{if(!e)throw f.create("installation-not-found");return U(e)}))}function U(e){return 1===(t=e).registrationStatus&&t.registrationTime+c<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t}async function B(e,t){let{appConfig:n,heartbeatServiceProvider:r}=e;const i=function(e,t){let{fid:n}=t;return`${g(e)}/${n}/authTokens:generate`}(n,t),a=x(n,t),o=r.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}const s={installation:{sdkVersion:d,appId:n.appId}},l={method:"POST",headers:a,body:JSON.stringify(s)},c=await w((()=>fetch(i,l)));if(c.ok){return b(await c.json())}throw await y("Generate Auth Token",c)}async function W(e){let t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const r=await L(e.appConfig,(r=>{if(!V(r))throw f.create("not-registered");const i=r.authToken;if(!n&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+h}(e)}(i))return r;if(1===i.requestStatus)return t=async function(e,t){let n=await H(e.appConfig);for(;1===n.authToken.requestStatus;)await _(100),n=await H(e.appConfig);const r=n.authToken;return 0===r.requestStatus?W(e,t):r}(e,n),r;{if(!navigator.onLine)throw f.create("app-offline");const n=function(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}(r);return t=async function(e,t){try{const n=await B(e,t),r={...t,authToken:n};return await D(e.appConfig,r),n}catch(n){if(!m(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...t,authToken:{requestStatus:0}};await D(e.appConfig,n)}else await M(e.appConfig);throw n}}(e,n),n}}));return t?await t:r.authToken}function H(e){return L(e,(e=>{if(!V(e))throw f.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+c<Date.now()?{...e,authToken:{requestStatus:0}}:e;var n}))}function V(e){return void 0!==e&&2===e.registrationStatus}async function q(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=e;await async function(e){const{registrationPromise:t}=await F(e);t&&await t}(n);return(await W(n,t)).token}function G(e){return f.create("missing-app-config-values",{valueName:e})}const K="installations",Y=e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw G("App Configuration");if(!e.name)throw G("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw G(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:(0,r.j6)(t,"heartbeat"),_delete:()=>Promise.resolve()}},Z=e=>{const t=e.getProvider("app").getImmediate(),n=(0,r.j6)(t,K).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:r}=await F(t);return r?r.catch(console.error):W(t).catch(console.error),n.fid}(n),getToken:e=>q(n,e)}};(0,r.om)(new i.uA(K,Y,"PUBLIC")),(0,r.om)(new i.uA("installations-internal",Z,"PRIVATE")),(0,r.KO)(s,l),(0,r.KO)(s,l,"esm2020");const J="/firebase-messaging-sw.js",Q="/firebase-cloud-messaging-push-scope",X="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",ee="https://fcmregistrations.googleapis.com/v1",te="google.c.a.c_id",ne=1e4;var re,ie;function ae(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function oe(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length);for(let i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(re||(re={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(ie||(ie={}));const se="fcm_token_details_db",le=5,ce="fcm_token_object_Store";const de="firebase-messaging-database",ue=1,he="firebase-messaging-store";let pe=null;function fe(){return pe||(pe=(0,o.P2)(de,ue,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(he)}})),pe}async function me(e){const t=be(e),n=await fe(),r=await n.transaction(he).objectStore(he).get(t);if(r)return r;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map((e=>e.name));if(!e.includes(se))return null}let t=null;return(await(0,o.P2)(se,le,{upgrade:async(n,r,i,a)=>{if(r<2)return;if(!n.objectStoreNames.contains(ce))return;const o=a.objectStore(ce),s=await o.index("fcmSenderId").get(e);if(await o.clear(),s)if(2===r){const e=s;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:e.createTime??Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"===typeof e.vapidKey?e.vapidKey:ae(e.vapidKey)}}}else if(3===r){const e=s;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:ae(e.auth),p256dh:ae(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:ae(e.vapidKey)}}}else if(4===r){const e=s;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:ae(e.auth),p256dh:ae(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:ae(e.vapidKey)}}}}})).close(),await(0,o.MR)(se),await(0,o.MR)("fcm_vapid_details_db"),await(0,o.MR)("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"===typeof e.createTime&&e.createTime>0&&"string"===typeof e.token&&e.token.length>0&&"string"===typeof t.auth&&t.auth.length>0&&"string"===typeof t.p256dh&&t.p256dh.length>0&&"string"===typeof t.endpoint&&t.endpoint.length>0&&"string"===typeof t.swScope&&t.swScope.length>0&&"string"===typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await ge(e,t),t}}async function ge(e,t){const n=be(e),r=(await fe()).transaction(he,"readwrite");return await r.objectStore(he).put(t,n),await r.done,t}function be(e){let{appConfig:t}=e;return t.appId}const ye={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},ve=new a.FA("messaging","Messaging",ye);async function xe(e,t){const n={method:"DELETE",headers:await _e(e)};try{const r=await fetch(`${we(e.appConfig)}/${t}`,n),i=await r.json();if(i.error){const e=i.error.message;throw ve.create("token-unsubscribe-failed",{errorInfo:e})}}catch(r){throw ve.create("token-unsubscribe-failed",{errorInfo:r?.toString()})}}function we(e){let{projectId:t}=e;return`${ee}/projects/${t}/registrations`}async function _e(e){let{appConfig:t,installations:n}=e;const r=await n.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${r}`})}function ke(e){let{p256dh:t,auth:n,endpoint:r,vapidKey:i}=e;const a={web:{endpoint:r,auth:n,p256dh:t}};return i!==X&&(a.web.applicationPubKey=i),a}const Se=6048e5;async function Ee(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:oe(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:ae(t.getKey("auth")),p256dh:ae(t.getKey("p256dh"))},r=await me(e.firebaseDependencies);if(r){if(function(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,a=t.p256dh===e.p256dh;return n&&r&&i&&a}(r.subscriptionOptions,n))return Date.now()>=r.createTime+Se?async function(e,t){try{const n=await async function(e,t){const n=await _e(e),r=ke(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let a;try{const n=await fetch(`${we(e.appConfig)}/${t.token}`,i);a=await n.json()}catch(o){throw ve.create("token-update-failed",{errorInfo:o?.toString()})}if(a.error){const e=a.error.message;throw ve.create("token-update-failed",{errorInfo:e})}if(!a.token)throw ve.create("token-update-no-token");return a.token}(e.firebaseDependencies,t),r={...t,token:n,createTime:Date.now()};return await ge(e.firebaseDependencies,r),n}catch(n){throw n}}(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await xe(e.firebaseDependencies,r.token)}catch(i){console.warn(i)}return Ce(e.firebaseDependencies,n)}return Ce(e.firebaseDependencies,n)}async function Ce(e,t){const n=await async function(e,t){const n=await _e(e),r=ke(t),i={method:"POST",headers:n,body:JSON.stringify(r)};let a;try{const t=await fetch(we(e.appConfig),i);a=await t.json()}catch(o){throw ve.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(a.error){const e=a.error.message;throw ve.create("token-subscribe-failed",{errorInfo:e})}if(!a.token)throw ve.create("token-subscribe-no-token");return a.token}(e,t),r={token:n,createTime:Date.now(),subscriptionOptions:t};return await ge(e,r),r.token}function Te(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const a=t.notification.icon;a&&(e.notification.icon=a)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){if(!t.fcmOptions&&!t.notification?.click_action)return;e.fcmOptions={};const n=t.fcmOptions?.link??t.notification?.click_action;n&&(e.fcmOptions.link=n);const r=t.fcmOptions?.analytics_label;r&&(e.fcmOptions.analyticsLabel=r)}(t,e),t}function Ie(e){return ve.create("missing-app-config-values",{valueName:e})}!function(e,t){const n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));n.join("")}("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class je{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const r=function(e){if(!e||!e.options)throw Ie("App Configuration Object");if(!e.name)throw Ie("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const r of t)if(!n[r])throw Ie(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}async function Pe(e){try{e.swRegistration=await navigator.serviceWorker.register(J,{scope:Q}),e.swRegistration.update().catch((()=>{})),await async function(e){return new Promise(((t,n)=>{const r=setTimeout((()=>n(new Error(`Service worker not registered after ${ne} ms`))),ne),i=e.installing||e.waiting;e.active?(clearTimeout(r),t()):i?i.onstatechange=e=>{"activated"===e.target?.state&&(i.onstatechange=null,clearTimeout(r),t())}:(clearTimeout(r),n(new Error("No incoming service worker found.")))}))}(e.swRegistration)}catch(t){throw ve.create("failed-service-worker-registration",{browserErrorMessage:t?.message})}}async function Ae(e,t){if(!navigator)throw ve.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw ve.create("permission-blocked");return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=X)}(e,t?.vapidKey),await async function(e,t){if(t||e.swRegistration||await Pe(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw ve.create("invalid-sw-registration");e.swRegistration=t}}(e,t?.serviceWorkerRegistration),Ee(e)}async function Ne(e,t,n){const r=function(e){switch(e){case ie.NOTIFICATION_CLICKED:return"notification_open";case ie.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[te],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}async function Re(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===ie.PUSH_RECEIVED&&("function"===typeof e.onMessageHandler?e.onMessageHandler(Te(n)):e.onMessageHandler.next(Te(n)));const r=n.data;var i;"object"===typeof(i=r)&&i&&te in i&&"1"===r["google.c.a.e"]&&await Ne(e,n.messageType,r)}const Oe="@firebase/messaging",De="0.12.25",Me=e=>{const t=new je(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",(e=>Re(t,e))),t},Le=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>Ae(t,e)}};async function Fe(){try{await(0,a.eX)()}catch(e){return!1}return"undefined"!==typeof window&&(0,a.zW)()&&(0,a.dM)()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function ze(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Sx)();return Fe().then((e=>{if(!e)throw ve.create("unsupported-browser")}),(e=>{throw ve.create("indexed-db-unsupported")})),(0,r.j6)((0,a.Ku)(e),"messaging").getImmediate()}async function $e(e,t){return Ae(e=(0,a.Ku)(e),t)}function Ue(e,t){return function(e,t){if(!navigator)throw ve.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}(e=(0,a.Ku)(e),t)}(0,r.om)(new i.uA("messaging",Me,"PUBLIC")),(0,r.om)(new i.uA("messaging-internal",Le,"PRIVATE")),(0,r.KO)(Oe,De),(0,r.KO)(Oe,De,"esm2020")},579:(e,t,n)=>{"use strict";e.exports=n(153)},606:(e,t,n)=>{"use strict";n.d(t,{h1:()=>s,uA:()=>i});var r=n(776);class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const a="[DEFAULT]";class o{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new r.cY;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(n)return null;throw r}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}(e))try{this.getOrInitializeService({instanceIdentifier:a})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;return this.instances.has(e)}getOptions(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;return this.instancesOptions.get(e)||{}}initialize(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,a]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(i)&&a.resolve(r)}return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService(e){let{instanceIdentifier:t,options:n={}}=e,r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:(i=t,i===a?void 0:i),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}var i;return r||null}normalizeInstanceIdentifier(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;return this.component?this.component.multipleInstances?e:a:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class s{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new o(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},684:()=>{!function(){if("undefined"!==typeof window&&"undefined"!==typeof URL)try{const t=new URLSearchParams(window.location.search),n=t.get("n");if(!n)return;let r=null;try{r=localStorage.getItem("sl_notif_token_hash")}catch(e){}const i=new URL("https://logopen-57u2xumnxa-uc.a.run.app");i.searchParams.set("notifId",n),r&&i.searchParams.set("tokenHash",r);const a=i.toString();let o=!1;try{navigator&&"function"===typeof navigator.sendBeacon&&(o=navigator.sendBeacon(a))}catch(e){}o||fetch(a,{method:"GET",keepalive:!0}).catch((()=>{}));const s=t.get("to");if(s)try{const e=new URL(s,window.location.origin);if("http:"===e.protocol||"https:"===e.protocol)return void window.location.replace(e.toString())}catch(e){}t.delete("n"),t.delete("to");const l=window.location.pathname+(t.toString()?"?"+t.toString():"")+window.location.hash;try{window.history.replaceState({},"",l)}catch(e){}}catch(e){}}()},730:(e,t,n)=>{"use strict";var r=n(43),i=n(853);function a(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var o=new Set,s={};function l(e,t){c(e,t),c(e+"Capture",t)}function c(e,t){for(s[e]=t,e=0;e<t.length;e++)o.add(t[e])}var d=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),u=Object.prototype.hasOwnProperty,h=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p={},f={};function m(e,t,n,r,i,a,o){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var g={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){g[e]=new m(e,0,!1,e,null,!1,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];g[t]=new m(t,1,!1,e[1],null,!1,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){g[e]=new m(e,2,!1,e.toLowerCase(),null,!1,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){g[e]=new m(e,2,!1,e,null,!1,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){g[e]=new m(e,3,!1,e.toLowerCase(),null,!1,!1)})),["checked","multiple","muted","selected"].forEach((function(e){g[e]=new m(e,3,!0,e,null,!1,!1)})),["capture","download"].forEach((function(e){g[e]=new m(e,4,!1,e,null,!1,!1)})),["cols","rows","size","span"].forEach((function(e){g[e]=new m(e,6,!1,e,null,!1,!1)})),["rowSpan","start"].forEach((function(e){g[e]=new m(e,5,!1,e.toLowerCase(),null,!1,!1)}));var b=/[\-:]([a-z])/g;function y(e){return e[1].toUpperCase()}function v(e,t,n,r){var i=g.hasOwnProperty(t)?g[t]:null;(null!==i?0!==i.type:r||!(2<t.length)||"o"!==t[0]&&"O"!==t[0]||"n"!==t[1]&&"N"!==t[1])&&(function(e,t,n,r){if(null===t||"undefined"===typeof t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,i,r)&&(n=null),r||null===i?function(e){return!!u.call(f,e)||!u.call(p,e)&&(h.test(e)?f[e]=!0:(p[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=null===n?3!==i.type&&"":n:(t=i.attributeName,r=i.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(i=i.type)||4===i&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(b,y);g[t]=new m(t,1,!1,e,null,!1,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(b,y);g[t]=new m(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(b,y);g[t]=new m(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)})),["tabIndex","crossOrigin"].forEach((function(e){g[e]=new m(e,1,!1,e.toLowerCase(),null,!1,!1)})),g.xlinkHref=new m("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach((function(e){g[e]=new m(e,1,!1,e.toLowerCase(),null,!0,!0)}));var x=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,w=Symbol.for("react.element"),_=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),E=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),T=Symbol.for("react.context"),I=Symbol.for("react.forward_ref"),j=Symbol.for("react.suspense"),P=Symbol.for("react.suspense_list"),A=Symbol.for("react.memo"),N=Symbol.for("react.lazy");Symbol.for("react.scope"),Symbol.for("react.debug_trace_mode");var R=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden"),Symbol.for("react.cache"),Symbol.for("react.tracing_marker");var O=Symbol.iterator;function D(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=O&&e[O]||e["@@iterator"])?e:null}var M,L=Object.assign;function F(e){if(void 0===M)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);M=t&&t[1]||""}return"\n"+M+e}var z=!1;function $(e,t){if(!e||z)return"";z=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&"string"===typeof c.stack){for(var i=c.stack.split("\n"),a=r.stack.split("\n"),o=i.length-1,s=a.length-1;1<=o&&0<=s&&i[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(i[o]!==a[s]){if(1!==o||1!==s)do{if(o--,0>--s||i[o]!==a[s]){var l="\n"+i[o].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}}while(1<=o&&0<=s);break}}}finally{z=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?F(e):""}function U(e){switch(e.tag){case 5:return F(e.type);case 16:return F("Lazy");case 13:return F("Suspense");case 19:return F("SuspenseList");case 0:case 2:case 15:return e=$(e.type,!1);case 11:return e=$(e.type.render,!1);case 1:return e=$(e.type,!0);default:return""}}function B(e){if(null==e)return null;if("function"===typeof e)return e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case k:return"Fragment";case _:return"Portal";case E:return"Profiler";case S:return"StrictMode";case j:return"Suspense";case P:return"SuspenseList"}if("object"===typeof e)switch(e.$$typeof){case T:return(e.displayName||"Context")+".Consumer";case C:return(e._context.displayName||"Context")+".Provider";case I:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case A:return null!==(t=e.displayName||null)?t:B(e.type)||"Memo";case N:t=e._payload,e=e._init;try{return B(e(t))}catch(n){}}return null}function W(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=(e=t.render).displayName||e.name||"",t.displayName||(""!==e?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return B(t);case 8:return t===S?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof t)return t.displayName||t.name||null;if("string"===typeof t)return t}return null}function H(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function V(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function q(e){e._valueTracker||(e._valueTracker=function(e){var t=V(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=""+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function G(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=V(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function K(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function Y(e,t){var n=t.checked;return L({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function Z(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=H(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function J(e,t){null!=(t=t.checked)&&v(e,"checked",t,!1)}function Q(e,t){J(e,t);var n=H(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ee(e,t.type,n):t.hasOwnProperty("defaultValue")&&ee(e,t.type,H(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function X(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ee(e,t,n){"number"===t&&K(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var te=Array.isArray;function ne(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+H(n),t=null,i=0;i<e.length;i++){if(e[i].value===n)return e[i].selected=!0,void(r&&(e[i].defaultSelected=!0));null!==t||e[i].disabled||(t=e[i])}null!==t&&(t.selected=!0)}}function re(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(a(91));return L({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ie(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(a(92));if(te(n)){if(1<n.length)throw Error(a(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:H(n)}}function ae(e,t){var n=H(t.value),r=H(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function oe(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}function se(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function le(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?se(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var ce,de,ue=(de=function(e,t){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=t;else{for((ce=ce||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ce.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction((function(){return de(e,t)}))}:de);function he(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var pe={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},fe=["Webkit","ms","Moz","O"];function me(e,t,n){return null==t||"boolean"===typeof t||""===t?"":n||"number"!==typeof t||0===t||pe.hasOwnProperty(e)&&pe[e]?(""+t).trim():t+"px"}function ge(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),i=me(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}Object.keys(pe).forEach((function(e){fe.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),pe[t]=pe[e]}))}));var be=L({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ye(e,t){if(t){if(be[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(a(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(a(60));if("object"!==typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(a(61))}if(null!=t.style&&"object"!==typeof t.style)throw Error(a(62))}}function ve(e,t){if(-1===e.indexOf("-"))return"string"===typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xe=null;function we(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var _e=null,ke=null,Se=null;function Ee(e){if(e=vi(e)){if("function"!==typeof _e)throw Error(a(280));var t=e.stateNode;t&&(t=wi(t),_e(e.stateNode,e.type,t))}}function Ce(e){ke?Se?Se.push(e):Se=[e]:ke=e}function Te(){if(ke){var e=ke,t=Se;if(Se=ke=null,Ee(e),t)for(e=0;e<t.length;e++)Ee(t[e])}}function Ie(e,t){return e(t)}function je(){}var Pe=!1;function Ae(e,t,n){if(Pe)return e(t,n);Pe=!0;try{return Ie(e,t,n)}finally{Pe=!1,(null!==ke||null!==Se)&&(je(),Te())}}function Ne(e,t){var n=e.stateNode;if(null===n)return null;var r=wi(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(a(231,t,typeof n));return n}var Re=!1;if(d)try{var Oe={};Object.defineProperty(Oe,"passive",{get:function(){Re=!0}}),window.addEventListener("test",Oe,Oe),window.removeEventListener("test",Oe,Oe)}catch(de){Re=!1}function De(e,t,n,r,i,a,o,s,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(d){this.onError(d)}}var Me=!1,Le=null,Fe=!1,ze=null,$e={onError:function(e){Me=!0,Le=e}};function Ue(e,t,n,r,i,a,o,s,l){Me=!1,Le=null,De.apply($e,arguments)}function Be(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function We(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function He(e){if(Be(e)!==e)throw Error(a(188))}function Ve(e){return null!==(e=function(e){var t=e.alternate;if(!t){if(null===(t=Be(e)))throw Error(a(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(null===i)break;var o=i.alternate;if(null===o){if(null!==(r=i.return)){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return He(i),e;if(o===r)return He(i),t;o=o.sibling}throw Error(a(188))}if(n.return!==r.return)n=i,r=o;else{for(var s=!1,l=i.child;l;){if(l===n){s=!0,n=i,r=o;break}if(l===r){s=!0,r=i,n=o;break}l=l.sibling}if(!s){for(l=o.child;l;){if(l===n){s=!0,n=o,r=i;break}if(l===r){s=!0,r=o,n=i;break}l=l.sibling}if(!s)throw Error(a(189))}}if(n.alternate!==r)throw Error(a(190))}if(3!==n.tag)throw Error(a(188));return n.stateNode.current===n?e:t}(e))?qe(e):null}function qe(e){if(5===e.tag||6===e.tag)return e;for(e=e.child;null!==e;){var t=qe(e);if(null!==t)return t;e=e.sibling}return null}var Ge=i.unstable_scheduleCallback,Ke=i.unstable_cancelCallback,Ye=i.unstable_shouldYield,Ze=i.unstable_requestPaint,Je=i.unstable_now,Qe=i.unstable_getCurrentPriorityLevel,Xe=i.unstable_ImmediatePriority,et=i.unstable_UserBlockingPriority,tt=i.unstable_NormalPriority,nt=i.unstable_LowPriority,rt=i.unstable_IdlePriority,it=null,at=null;var ot=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(st(e)/lt|0)|0},st=Math.log,lt=Math.LN2;var ct=64,dt=4194304;function ut(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194240&e;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return 130023424&e;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ht(e,t){var n=e.pendingLanes;if(0===n)return 0;var r=0,i=e.suspendedLanes,a=e.pingedLanes,o=268435455&n;if(0!==o){var s=o&~i;0!==s?r=ut(s):0!==(a&=o)&&(r=ut(a))}else 0!==(o=n&~i)?r=ut(o):0!==a&&(r=ut(a));if(0===r)return 0;if(0!==t&&t!==r&&0===(t&i)&&((i=r&-r)>=(a=t&-t)||16===i&&0!==(4194240&a)))return t;if(0!==(4&r)&&(r|=16&n),0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)i=1<<(n=31-ot(t)),r|=e[n],t&=~i;return r}function pt(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function ft(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function mt(){var e=ct;return 0===(4194240&(ct<<=1))&&(ct=64),e}function gt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function bt(e,t,n){e.pendingLanes|=t,536870912!==t&&(e.suspendedLanes=0,e.pingedLanes=0),(e=e.eventTimes)[t=31-ot(t)]=n}function yt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ot(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var vt=0;function xt(e){return 1<(e&=-e)?4<e?0!==(268435455&e)?16:536870912:4:1}var wt,_t,kt,St,Et,Ct=!1,Tt=[],It=null,jt=null,Pt=null,At=new Map,Nt=new Map,Rt=[],Ot="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Dt(e,t){switch(e){case"focusin":case"focusout":It=null;break;case"dragenter":case"dragleave":jt=null;break;case"mouseover":case"mouseout":Pt=null;break;case"pointerover":case"pointerout":At.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Nt.delete(t.pointerId)}}function Mt(e,t,n,r,i,a){return null===e||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},null!==t&&(null!==(t=vi(t))&&_t(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==i&&-1===t.indexOf(i)&&t.push(i),e)}function Lt(e){var t=yi(e.target);if(null!==t){var n=Be(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=We(n)))return e.blockedOn=t,void Et(e.priority,(function(){kt(n)}))}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function Ft(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Yt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=vi(n))&&_t(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);xe=r,n.target.dispatchEvent(r),xe=null,t.shift()}return!0}function zt(e,t,n){Ft(e)&&n.delete(t)}function $t(){Ct=!1,null!==It&&Ft(It)&&(It=null),null!==jt&&Ft(jt)&&(jt=null),null!==Pt&&Ft(Pt)&&(Pt=null),At.forEach(zt),Nt.forEach(zt)}function Ut(e,t){e.blockedOn===t&&(e.blockedOn=null,Ct||(Ct=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,$t)))}function Bt(e){function t(t){return Ut(t,e)}if(0<Tt.length){Ut(Tt[0],e);for(var n=1;n<Tt.length;n++){var r=Tt[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==It&&Ut(It,e),null!==jt&&Ut(jt,e),null!==Pt&&Ut(Pt,e),At.forEach(t),Nt.forEach(t),n=0;n<Rt.length;n++)(r=Rt[n]).blockedOn===e&&(r.blockedOn=null);for(;0<Rt.length&&null===(n=Rt[0]).blockedOn;)Lt(n),null===n.blockedOn&&Rt.shift()}var Wt=x.ReactCurrentBatchConfig,Ht=!0;function Vt(e,t,n,r){var i=vt,a=Wt.transition;Wt.transition=null;try{vt=1,Gt(e,t,n,r)}finally{vt=i,Wt.transition=a}}function qt(e,t,n,r){var i=vt,a=Wt.transition;Wt.transition=null;try{vt=4,Gt(e,t,n,r)}finally{vt=i,Wt.transition=a}}function Gt(e,t,n,r){if(Ht){var i=Yt(e,t,n,r);if(null===i)Hr(e,t,r,Kt,n),Dt(e,r);else if(function(e,t,n,r,i){switch(t){case"focusin":return It=Mt(It,e,t,n,r,i),!0;case"dragenter":return jt=Mt(jt,e,t,n,r,i),!0;case"mouseover":return Pt=Mt(Pt,e,t,n,r,i),!0;case"pointerover":var a=i.pointerId;return At.set(a,Mt(At.get(a)||null,e,t,n,r,i)),!0;case"gotpointercapture":return a=i.pointerId,Nt.set(a,Mt(Nt.get(a)||null,e,t,n,r,i)),!0}return!1}(i,e,t,n,r))r.stopPropagation();else if(Dt(e,r),4&t&&-1<Ot.indexOf(e)){for(;null!==i;){var a=vi(i);if(null!==a&&wt(a),null===(a=Yt(e,t,n,r))&&Hr(e,t,r,Kt,n),a===i)break;i=a}null!==i&&r.stopPropagation()}else Hr(e,t,r,null,n)}}var Kt=null;function Yt(e,t,n,r){if(Kt=null,null!==(e=yi(e=we(r))))if(null===(t=Be(e)))e=null;else if(13===(n=t.tag)){if(null!==(e=We(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Kt=e,null}function Zt(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Qe()){case Xe:return 1;case et:return 4;case tt:case nt:return 16;case rt:return 536870912;default:return 16}default:return 16}}var Jt=null,Qt=null,Xt=null;function en(){if(Xt)return Xt;var e,t,n=Qt,r=n.length,i="value"in Jt?Jt.value:Jt.textContent,a=i.length;for(e=0;e<r&&n[e]===i[e];e++);var o=r-e;for(t=1;t<=o&&n[r-t]===i[a-t];t++);return Xt=i.slice(e,1<t?1-t:void 0)}function tn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function nn(){return!0}function rn(){return!1}function an(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(null!=i.defaultPrevented?i.defaultPrevented:!1===i.returnValue)?nn:rn,this.isPropagationStopped=rn,this}return L(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=nn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=nn)},persist:function(){},isPersistent:nn}),t}var on,sn,ln,cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dn=an(cn),un=L({},cn,{view:0,detail:0}),hn=an(un),pn=L({},un,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:En,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ln&&(ln&&"mousemove"===e.type?(on=e.screenX-ln.screenX,sn=e.screenY-ln.screenY):sn=on=0,ln=e),on)},movementY:function(e){return"movementY"in e?e.movementY:sn}}),fn=an(pn),mn=an(L({},pn,{dataTransfer:0})),gn=an(L({},un,{relatedTarget:0})),bn=an(L({},cn,{animationName:0,elapsedTime:0,pseudoElement:0})),yn=L({},cn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),vn=an(yn),xn=an(L({},cn,{data:0})),wn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_n={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=kn[e])&&!!t[e]}function En(){return Sn}var Cn=L({},un,{key:function(e){if(e.key){var t=wn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=tn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?_n[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:En,charCode:function(e){return"keypress"===e.type?tn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?tn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),Tn=an(Cn),In=an(L({},pn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),jn=an(L({},un,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:En})),Pn=an(L({},cn,{propertyName:0,elapsedTime:0,pseudoElement:0})),An=L({},pn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Nn=an(An),Rn=[9,13,27,32],On=d&&"CompositionEvent"in window,Dn=null;d&&"documentMode"in document&&(Dn=document.documentMode);var Mn=d&&"TextEvent"in window&&!Dn,Ln=d&&(!On||Dn&&8<Dn&&11>=Dn),Fn=String.fromCharCode(32),zn=!1;function $n(e,t){switch(e){case"keyup":return-1!==Rn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Un(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Bn=!1;var Wn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Wn[e.type]:"textarea"===t}function Vn(e,t,n,r){Ce(r),0<(t=qr(t,"onChange")).length&&(n=new dn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var qn=null,Gn=null;function Kn(e){Fr(e,0)}function Yn(e){if(G(xi(e)))return e}function Zn(e,t){if("change"===e)return t}var Jn=!1;if(d){var Qn;if(d){var Xn="oninput"in document;if(!Xn){var er=document.createElement("div");er.setAttribute("oninput","return;"),Xn="function"===typeof er.oninput}Qn=Xn}else Qn=!1;Jn=Qn&&(!document.documentMode||9<document.documentMode)}function tr(){qn&&(qn.detachEvent("onpropertychange",nr),Gn=qn=null)}function nr(e){if("value"===e.propertyName&&Yn(Gn)){var t=[];Vn(t,Gn,e,we(e)),Ae(Kn,t)}}function rr(e,t,n){"focusin"===e?(tr(),Gn=n,(qn=t).attachEvent("onpropertychange",nr)):"focusout"===e&&tr()}function ir(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Yn(Gn)}function ar(e,t){if("click"===e)return Yn(t)}function or(e,t){if("input"===e||"change"===e)return Yn(t)}var sr="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function lr(e,t){if(sr(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!u.call(t,i)||!sr(e[i],t[i]))return!1}return!0}function cr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function dr(e,t){var n,r=cr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=cr(r)}}function ur(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?ur(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function hr(){for(var e=window,t=K();t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=K((e=t.contentWindow).document)}return t}function pr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}function fr(e){var t=hr(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ur(n.ownerDocument.documentElement,n)){if(null!==r&&pr(n))if(t=r.start,void 0===(e=r.end)&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if((e=(t=n.ownerDocument||document)&&t.defaultView||window).getSelection){e=e.getSelection();var i=n.textContent.length,a=Math.min(r.start,i);r=void 0===r.end?a:Math.min(r.end,i),!e.extend&&a>r&&(i=r,r=a,a=i),i=dr(n,a);var o=dr(n,r);i&&o&&(1!==e.rangeCount||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&((t=t.createRange()).setStart(i.node,i.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}for(t=[],e=n;e=e.parentNode;)1===e.nodeType&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for("function"===typeof n.focus&&n.focus(),n=0;n<t.length;n++)(e=t[n]).element.scrollLeft=e.left,e.element.scrollTop=e.top}}var mr=d&&"documentMode"in document&&11>=document.documentMode,gr=null,br=null,yr=null,vr=!1;function xr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;vr||null==gr||gr!==K(r)||("selectionStart"in(r=gr)&&pr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},yr&&lr(yr,r)||(yr=r,0<(r=qr(br,"onSelect")).length&&(t=new dn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=gr)))}function wr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var _r={animationend:wr("Animation","AnimationEnd"),animationiteration:wr("Animation","AnimationIteration"),animationstart:wr("Animation","AnimationStart"),transitionend:wr("Transition","TransitionEnd")},kr={},Sr={};function Er(e){if(kr[e])return kr[e];if(!_r[e])return e;var t,n=_r[e];for(t in n)if(n.hasOwnProperty(t)&&t in Sr)return kr[e]=n[t];return e}d&&(Sr=document.createElement("div").style,"AnimationEvent"in window||(delete _r.animationend.animation,delete _r.animationiteration.animation,delete _r.animationstart.animation),"TransitionEvent"in window||delete _r.transitionend.transition);var Cr=Er("animationend"),Tr=Er("animationiteration"),Ir=Er("animationstart"),jr=Er("transitionend"),Pr=new Map,Ar="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Nr(e,t){Pr.set(e,t),l(t,[e])}for(var Rr=0;Rr<Ar.length;Rr++){var Or=Ar[Rr];Nr(Or.toLowerCase(),"on"+(Or[0].toUpperCase()+Or.slice(1)))}Nr(Cr,"onAnimationEnd"),Nr(Tr,"onAnimationIteration"),Nr(Ir,"onAnimationStart"),Nr("dblclick","onDoubleClick"),Nr("focusin","onFocus"),Nr("focusout","onBlur"),Nr(jr,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Dr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Mr=new Set("cancel close invalid load scroll toggle".split(" ").concat(Dr));function Lr(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,i,o,s,l,c){if(Ue.apply(this,arguments),Me){if(!Me)throw Error(a(198));var d=Le;Me=!1,Le=null,Fe||(Fe=!0,ze=d)}}(r,t,void 0,e),e.currentTarget=null}function Fr(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==a&&i.isPropagationStopped())break e;Lr(i,s,c),a=l}else for(o=0;o<r.length;o++){if(l=(s=r[o]).instance,c=s.currentTarget,s=s.listener,l!==a&&i.isPropagationStopped())break e;Lr(i,s,c),a=l}}}if(Fe)throw e=ze,Fe=!1,ze=null,e}function zr(e,t){var n=t[mi];void 0===n&&(n=t[mi]=new Set);var r=e+"__bubble";n.has(r)||(Wr(t,e,2,!1),n.add(r))}function $r(e,t,n){var r=0;t&&(r|=4),Wr(n,e,r,t)}var Ur="_reactListening"+Math.random().toString(36).slice(2);function Br(e){if(!e[Ur]){e[Ur]=!0,o.forEach((function(t){"selectionchange"!==t&&(Mr.has(t)||$r(t,!1,e),$r(t,!0,e))}));var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Ur]||(t[Ur]=!0,$r("selectionchange",!1,t))}}function Wr(e,t,n,r){switch(Zt(t)){case 1:var i=Vt;break;case 4:i=qt;break;default:i=Gt}n=i.bind(null,t,n,e),i=void 0,!Re||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(i=!0),r?void 0!==i?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):void 0!==i?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Hr(e,t,n,r,i){var a=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var o=r.tag;if(3===o||4===o){var s=r.stateNode.containerInfo;if(s===i||8===s.nodeType&&s.parentNode===i)break;if(4===o)for(o=r.return;null!==o;){var l=o.tag;if((3===l||4===l)&&((l=o.stateNode.containerInfo)===i||8===l.nodeType&&l.parentNode===i))return;o=o.return}for(;null!==s;){if(null===(o=yi(s)))return;if(5===(l=o.tag)||6===l){r=a=o;continue e}s=s.parentNode}}r=r.return}Ae((function(){var r=a,i=we(n),o=[];e:{var s=Pr.get(e);if(void 0!==s){var l=dn,c=e;switch(e){case"keypress":if(0===tn(n))break e;case"keydown":case"keyup":l=Tn;break;case"focusin":c="focus",l=gn;break;case"focusout":c="blur",l=gn;break;case"beforeblur":case"afterblur":l=gn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":l=fn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":l=mn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":l=jn;break;case Cr:case Tr:case Ir:l=bn;break;case jr:l=Pn;break;case"scroll":l=hn;break;case"wheel":l=Nn;break;case"copy":case"cut":case"paste":l=vn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":l=In}var d=0!==(4&t),u=!d&&"scroll"===e,h=d?null!==s?s+"Capture":null:s;d=[];for(var p,f=r;null!==f;){var m=(p=f).stateNode;if(5===p.tag&&null!==m&&(p=m,null!==h&&(null!=(m=Ne(f,h))&&d.push(Vr(f,m,p)))),u)break;f=f.return}0<d.length&&(s=new l(s,c,null,n,i),o.push({event:s,listeners:d}))}}if(0===(7&t)){if(l="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||n===xe||!(c=n.relatedTarget||n.fromElement)||!yi(c)&&!c[fi])&&(l||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,l?(l=r,null!==(c=(c=n.relatedTarget||n.toElement)?yi(c):null)&&(c!==(u=Be(c))||5!==c.tag&&6!==c.tag)&&(c=null)):(l=null,c=r),l!==c)){if(d=fn,m="onMouseLeave",h="onMouseEnter",f="mouse","pointerout"!==e&&"pointerover"!==e||(d=In,m="onPointerLeave",h="onPointerEnter",f="pointer"),u=null==l?s:xi(l),p=null==c?s:xi(c),(s=new d(m,f+"leave",l,n,i)).target=u,s.relatedTarget=p,m=null,yi(i)===r&&((d=new d(h,f+"enter",c,n,i)).target=p,d.relatedTarget=u,m=d),u=m,l&&c)e:{for(h=c,f=0,p=d=l;p;p=Gr(p))f++;for(p=0,m=h;m;m=Gr(m))p++;for(;0<f-p;)d=Gr(d),f--;for(;0<p-f;)h=Gr(h),p--;for(;f--;){if(d===h||null!==h&&d===h.alternate)break e;d=Gr(d),h=Gr(h)}d=null}else d=null;null!==l&&Kr(o,s,l,d,!1),null!==c&&null!==u&&Kr(o,u,c,d,!0)}if("select"===(l=(s=r?xi(r):window).nodeName&&s.nodeName.toLowerCase())||"input"===l&&"file"===s.type)var g=Zn;else if(Hn(s))if(Jn)g=or;else{g=ir;var b=rr}else(l=s.nodeName)&&"input"===l.toLowerCase()&&("checkbox"===s.type||"radio"===s.type)&&(g=ar);switch(g&&(g=g(e,r))?Vn(o,g,n,i):(b&&b(e,s,r),"focusout"===e&&(b=s._wrapperState)&&b.controlled&&"number"===s.type&&ee(s,"number",s.value)),b=r?xi(r):window,e){case"focusin":(Hn(b)||"true"===b.contentEditable)&&(gr=b,br=r,yr=null);break;case"focusout":yr=br=gr=null;break;case"mousedown":vr=!0;break;case"contextmenu":case"mouseup":case"dragend":vr=!1,xr(o,n,i);break;case"selectionchange":if(mr)break;case"keydown":case"keyup":xr(o,n,i)}var y;if(On)e:{switch(e){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else Bn?$n(e,n)&&(v="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(v="onCompositionStart");v&&(Ln&&"ko"!==n.locale&&(Bn||"onCompositionStart"!==v?"onCompositionEnd"===v&&Bn&&(y=en()):(Qt="value"in(Jt=i)?Jt.value:Jt.textContent,Bn=!0)),0<(b=qr(r,v)).length&&(v=new xn(v,e,null,n,i),o.push({event:v,listeners:b}),y?v.data=y:null!==(y=Un(n))&&(v.data=y))),(y=Mn?function(e,t){switch(e){case"compositionend":return Un(t);case"keypress":return 32!==t.which?null:(zn=!0,Fn);case"textInput":return(e=t.data)===Fn&&zn?null:e;default:return null}}(e,n):function(e,t){if(Bn)return"compositionend"===e||!On&&$n(e,t)?(e=en(),Xt=Qt=Jt=null,Bn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ln&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(r=qr(r,"onBeforeInput")).length&&(i=new xn("onBeforeInput","beforeinput",null,n,i),o.push({event:i,listeners:r}),i.data=y))}Fr(o,t)}))}function Vr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function qr(e,t){for(var n=t+"Capture",r=[];null!==e;){var i=e,a=i.stateNode;5===i.tag&&null!==a&&(i=a,null!=(a=Ne(e,n))&&r.unshift(Vr(e,a,i)),null!=(a=Ne(e,t))&&r.push(Vr(e,a,i))),e=e.return}return r}function Gr(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function Kr(e,t,n,r,i){for(var a=t._reactName,o=[];null!==n&&n!==r;){var s=n,l=s.alternate,c=s.stateNode;if(null!==l&&l===r)break;5===s.tag&&null!==c&&(s=c,i?null!=(l=Ne(n,a))&&o.unshift(Vr(n,l,s)):i||null!=(l=Ne(n,a))&&o.push(Vr(n,l,s))),n=n.return}0!==o.length&&e.push({event:t,listeners:o})}var Yr=/\r\n?/g,Zr=/\u0000|\uFFFD/g;function Jr(e){return("string"===typeof e?e:""+e).replace(Yr,"\n").replace(Zr,"")}function Qr(e,t,n){if(t=Jr(t),Jr(e)!==t&&n)throw Error(a(425))}function Xr(){}var ei=null,ti=null;function ni(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var ri="function"===typeof setTimeout?setTimeout:void 0,ii="function"===typeof clearTimeout?clearTimeout:void 0,ai="function"===typeof Promise?Promise:void 0,oi="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof ai?function(e){return ai.resolve(null).then(e).catch(si)}:ri;function si(e){setTimeout((function(){throw e}))}function li(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&8===i.nodeType)if("/$"===(n=i.data)){if(0===r)return e.removeChild(i),void Bt(t);r--}else"$"!==n&&"$?"!==n&&"$!"!==n||r++;n=i}while(n);Bt(t)}function ci(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t)break;if("/$"===t)return null}}return e}function di(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var ui=Math.random().toString(36).slice(2),hi="__reactFiber$"+ui,pi="__reactProps$"+ui,fi="__reactContainer$"+ui,mi="__reactEvents$"+ui,gi="__reactListeners$"+ui,bi="__reactHandles$"+ui;function yi(e){var t=e[hi];if(t)return t;for(var n=e.parentNode;n;){if(t=n[fi]||n[hi]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=di(e);null!==e;){if(n=e[hi])return n;e=di(e)}return t}n=(e=n).parentNode}return null}function vi(e){return!(e=e[hi]||e[fi])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function xi(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(a(33))}function wi(e){return e[pi]||null}var _i=[],ki=-1;function Si(e){return{current:e}}function Ei(e){0>ki||(e.current=_i[ki],_i[ki]=null,ki--)}function Ci(e,t){ki++,_i[ki]=e.current,e.current=t}var Ti={},Ii=Si(Ti),ji=Si(!1),Pi=Ti;function Ai(e,t){var n=e.type.contextTypes;if(!n)return Ti;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i,a={};for(i in n)a[i]=t[i];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function Ni(e){return null!==(e=e.childContextTypes)&&void 0!==e}function Ri(){Ei(ji),Ei(Ii)}function Oi(e,t,n){if(Ii.current!==Ti)throw Error(a(168));Ci(Ii,t),Ci(ji,n)}function Di(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,"function"!==typeof r.getChildContext)return n;for(var i in r=r.getChildContext())if(!(i in t))throw Error(a(108,W(e)||"Unknown",i));return L({},n,r)}function Mi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ti,Pi=Ii.current,Ci(Ii,e),Ci(ji,ji.current),!0}function Li(e,t,n){var r=e.stateNode;if(!r)throw Error(a(169));n?(e=Di(e,t,Pi),r.__reactInternalMemoizedMergedChildContext=e,Ei(ji),Ei(Ii),Ci(Ii,e)):Ei(ji),Ci(ji,n)}var Fi=null,zi=!1,$i=!1;function Ui(e){null===Fi?Fi=[e]:Fi.push(e)}function Bi(){if(!$i&&null!==Fi){$i=!0;var e=0,t=vt;try{var n=Fi;for(vt=1;e<n.length;e++){var r=n[e];do{r=r(!0)}while(null!==r)}Fi=null,zi=!1}catch(i){throw null!==Fi&&(Fi=Fi.slice(e+1)),Ge(Xe,Bi),i}finally{vt=t,$i=!1}}return null}var Wi=[],Hi=0,Vi=null,qi=0,Gi=[],Ki=0,Yi=null,Zi=1,Ji="";function Qi(e,t){Wi[Hi++]=qi,Wi[Hi++]=Vi,Vi=e,qi=t}function Xi(e,t,n){Gi[Ki++]=Zi,Gi[Ki++]=Ji,Gi[Ki++]=Yi,Yi=e;var r=Zi;e=Ji;var i=32-ot(r)-1;r&=~(1<<i),n+=1;var a=32-ot(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Zi=1<<32-ot(t)+i|n<<i|r,Ji=a+e}else Zi=1<<a|n<<i|r,Ji=e}function ea(e){null!==e.return&&(Qi(e,1),Xi(e,1,0))}function ta(e){for(;e===Vi;)Vi=Wi[--Hi],Wi[Hi]=null,qi=Wi[--Hi],Wi[Hi]=null;for(;e===Yi;)Yi=Gi[--Ki],Gi[Ki]=null,Ji=Gi[--Ki],Gi[Ki]=null,Zi=Gi[--Ki],Gi[Ki]=null}var na=null,ra=null,ia=!1,aa=null;function oa(e,t){var n=Ac(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,null===(t=e.deletions)?(e.deletions=[n],e.flags|=16):t.push(n)}function sa(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,na=e,ra=ci(t.firstChild),!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,na=e,ra=null,!0);case 13:return null!==(t=8!==t.nodeType?null:t)&&(n=null!==Yi?{id:Zi,overflow:Ji}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},(n=Ac(18,null,null,0)).stateNode=t,n.return=e,e.child=n,na=e,ra=null,!0);default:return!1}}function la(e){return 0!==(1&e.mode)&&0===(128&e.flags)}function ca(e){if(ia){var t=ra;if(t){var n=t;if(!sa(e,t)){if(la(e))throw Error(a(418));t=ci(n.nextSibling);var r=na;t&&sa(e,t)?oa(r,n):(e.flags=-4097&e.flags|2,ia=!1,na=e)}}else{if(la(e))throw Error(a(418));e.flags=-4097&e.flags|2,ia=!1,na=e}}}function da(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;na=e}function ua(e){if(e!==na)return!1;if(!ia)return da(e),ia=!0,!1;var t;if((t=3!==e.tag)&&!(t=5!==e.tag)&&(t="head"!==(t=e.type)&&"body"!==t&&!ni(e.type,e.memoizedProps)),t&&(t=ra)){if(la(e))throw ha(),Error(a(418));for(;t;)oa(e,t),t=ci(t.nextSibling)}if(da(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(a(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){ra=ci(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}ra=null}}else ra=na?ci(e.stateNode.nextSibling):null;return!0}function ha(){for(var e=ra;e;)e=ci(e.nextSibling)}function pa(){ra=na=null,ia=!1}function fa(e){null===aa?aa=[e]:aa.push(e)}var ma=x.ReactCurrentBatchConfig;function ga(e,t,n){if(null!==(e=n.ref)&&"function"!==typeof e&&"object"!==typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(a(309));var r=n.stateNode}if(!r)throw Error(a(147,e));var i=r,o=""+e;return null!==t&&null!==t.ref&&"function"===typeof t.ref&&t.ref._stringRef===o?t.ref:(t=function(e){var t=i.refs;null===e?delete t[o]:t[o]=e},t._stringRef=o,t)}if("string"!==typeof e)throw Error(a(284));if(!n._owner)throw Error(a(290,e))}return e}function ba(e,t){throw e=Object.prototype.toString.call(t),Error(a(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ya(e){return(0,e._init)(e._payload)}function va(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function i(e,t){return(e=Rc(e,t)).index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=2,n):r:(t.flags|=2,n):(t.flags|=1048576,n)}function s(t){return e&&null===t.alternate&&(t.flags|=2),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=Lc(n,e.mode,r)).return=e,t):((t=i(t,n)).return=e,t)}function c(e,t,n,r){var a=n.type;return a===k?u(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===a||"object"===typeof a&&null!==a&&a.$$typeof===N&&ya(a)===t.type)?((r=i(t,n.props)).ref=ga(e,t,n),r.return=e,r):((r=Oc(n.type,n.key,n.props,null,e.mode,r)).ref=ga(e,t,n),r.return=e,r)}function d(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Fc(n,e.mode,r)).return=e,t):((t=i(t,n.children||[])).return=e,t)}function u(e,t,n,r,a){return null===t||7!==t.tag?((t=Dc(n,e.mode,r,a)).return=e,t):((t=i(t,n)).return=e,t)}function h(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t)return(t=Lc(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case w:return(n=Oc(t.type,t.key,t.props,null,e.mode,n)).ref=ga(e,null,t),n.return=e,n;case _:return(t=Fc(t,e.mode,n)).return=e,t;case N:return h(e,(0,t._init)(t._payload),n)}if(te(t)||D(t))return(t=Dc(t,e.mode,n,null)).return=e,t;ba(e,t)}return null}function p(e,t,n,r){var i=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n)return null!==i?null:l(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case w:return n.key===i?c(e,t,n,r):null;case _:return n.key===i?d(e,t,n,r):null;case N:return p(e,t,(i=n._init)(n._payload),r)}if(te(n)||D(n))return null!==i?null:u(e,t,n,r,null);ba(e,n)}return null}function f(e,t,n,r,i){if("string"===typeof r&&""!==r||"number"===typeof r)return l(t,e=e.get(n)||null,""+r,i);if("object"===typeof r&&null!==r){switch(r.$$typeof){case w:return c(t,e=e.get(null===r.key?n:r.key)||null,r,i);case _:return d(t,e=e.get(null===r.key?n:r.key)||null,r,i);case N:return f(e,t,n,(0,r._init)(r._payload),i)}if(te(r)||D(r))return u(t,e=e.get(n)||null,r,i,null);ba(t,r)}return null}function m(i,a,s,l){for(var c=null,d=null,u=a,m=a=0,g=null;null!==u&&m<s.length;m++){u.index>m?(g=u,u=null):g=u.sibling;var b=p(i,u,s[m],l);if(null===b){null===u&&(u=g);break}e&&u&&null===b.alternate&&t(i,u),a=o(b,a,m),null===d?c=b:d.sibling=b,d=b,u=g}if(m===s.length)return n(i,u),ia&&Qi(i,m),c;if(null===u){for(;m<s.length;m++)null!==(u=h(i,s[m],l))&&(a=o(u,a,m),null===d?c=u:d.sibling=u,d=u);return ia&&Qi(i,m),c}for(u=r(i,u);m<s.length;m++)null!==(g=f(u,i,m,s[m],l))&&(e&&null!==g.alternate&&u.delete(null===g.key?m:g.key),a=o(g,a,m),null===d?c=g:d.sibling=g,d=g);return e&&u.forEach((function(e){return t(i,e)})),ia&&Qi(i,m),c}function g(i,s,l,c){var d=D(l);if("function"!==typeof d)throw Error(a(150));if(null==(l=d.call(l)))throw Error(a(151));for(var u=d=null,m=s,g=s=0,b=null,y=l.next();null!==m&&!y.done;g++,y=l.next()){m.index>g?(b=m,m=null):b=m.sibling;var v=p(i,m,y.value,c);if(null===v){null===m&&(m=b);break}e&&m&&null===v.alternate&&t(i,m),s=o(v,s,g),null===u?d=v:u.sibling=v,u=v,m=b}if(y.done)return n(i,m),ia&&Qi(i,g),d;if(null===m){for(;!y.done;g++,y=l.next())null!==(y=h(i,y.value,c))&&(s=o(y,s,g),null===u?d=y:u.sibling=y,u=y);return ia&&Qi(i,g),d}for(m=r(i,m);!y.done;g++,y=l.next())null!==(y=f(m,i,g,y.value,c))&&(e&&null!==y.alternate&&m.delete(null===y.key?g:y.key),s=o(y,s,g),null===u?d=y:u.sibling=y,u=y);return e&&m.forEach((function(e){return t(i,e)})),ia&&Qi(i,g),d}return function e(r,a,o,l){if("object"===typeof o&&null!==o&&o.type===k&&null===o.key&&(o=o.props.children),"object"===typeof o&&null!==o){switch(o.$$typeof){case w:e:{for(var c=o.key,d=a;null!==d;){if(d.key===c){if((c=o.type)===k){if(7===d.tag){n(r,d.sibling),(a=i(d,o.props.children)).return=r,r=a;break e}}else if(d.elementType===c||"object"===typeof c&&null!==c&&c.$$typeof===N&&ya(c)===d.type){n(r,d.sibling),(a=i(d,o.props)).ref=ga(r,d,o),a.return=r,r=a;break e}n(r,d);break}t(r,d),d=d.sibling}o.type===k?((a=Dc(o.props.children,r.mode,l,o.key)).return=r,r=a):((l=Oc(o.type,o.key,o.props,null,r.mode,l)).ref=ga(r,a,o),l.return=r,r=l)}return s(r);case _:e:{for(d=o.key;null!==a;){if(a.key===d){if(4===a.tag&&a.stateNode.containerInfo===o.containerInfo&&a.stateNode.implementation===o.implementation){n(r,a.sibling),(a=i(a,o.children||[])).return=r,r=a;break e}n(r,a);break}t(r,a),a=a.sibling}(a=Fc(o,r.mode,l)).return=r,r=a}return s(r);case N:return e(r,a,(d=o._init)(o._payload),l)}if(te(o))return m(r,a,o,l);if(D(o))return g(r,a,o,l);ba(r,o)}return"string"===typeof o&&""!==o||"number"===typeof o?(o=""+o,null!==a&&6===a.tag?(n(r,a.sibling),(a=i(a,o)).return=r,r=a):(n(r,a),(a=Lc(o,r.mode,l)).return=r,r=a),s(r)):n(r,a)}}var xa=va(!0),wa=va(!1),_a=Si(null),ka=null,Sa=null,Ea=null;function Ca(){Ea=Sa=ka=null}function Ta(e){var t=_a.current;Ei(_a),e._currentValue=t}function Ia(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function ja(e,t){ka=e,Ea=Sa=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&t)&&(vs=!0),e.firstContext=null)}function Pa(e){var t=e._currentValue;if(Ea!==e)if(e={context:e,memoizedValue:t,next:null},null===Sa){if(null===ka)throw Error(a(308));Sa=e,ka.dependencies={lanes:0,firstContext:e}}else Sa=Sa.next=e;return t}var Aa=null;function Na(e){null===Aa?Aa=[e]:Aa.push(e)}function Ra(e,t,n,r){var i=t.interleaved;return null===i?(n.next=n,Na(t)):(n.next=i.next,i.next=n),t.interleaved=n,Oa(e,r)}function Oa(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}var Da=!1;function Ma(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function La(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Fa(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function za(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&Il)){var i=r.pending;return null===i?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Oa(e,n)}return null===(i=r.interleaved)?(t.next=t,Na(r)):(t.next=i.next,i.next=t),r.interleaved=t,Oa(e,n)}function $a(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194240&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,yt(e,n)}}function Ua(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var i=null,a=null;if(null!==(n=n.firstBaseUpdate)){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===a?i=a=o:a=a.next=o,n=n.next}while(null!==n);null===a?i=a=t:a=a.next=t}else i=a=t;return n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ba(e,t,n,r){var i=e.updateQueue;Da=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(null!==s){i.shared.pending=null;var l=s,c=l.next;l.next=null,null===o?a=c:o.next=c,o=l;var d=e.alternate;null!==d&&((s=(d=d.updateQueue).lastBaseUpdate)!==o&&(null===s?d.firstBaseUpdate=c:s.next=c,d.lastBaseUpdate=l))}if(null!==a){var u=i.baseState;for(o=0,d=c=l=null,s=a;;){var h=s.lane,p=s.eventTime;if((r&h)===h){null!==d&&(d=d.next={eventTime:p,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var f=e,m=s;switch(h=t,p=n,m.tag){case 1:if("function"===typeof(f=m.payload)){u=f.call(p,u,h);break e}u=f;break e;case 3:f.flags=-65537&f.flags|128;case 0:if(null===(h="function"===typeof(f=m.payload)?f.call(p,u,h):f)||void 0===h)break e;u=L({},u,h);break e;case 2:Da=!0}}null!==s.callback&&0!==s.lane&&(e.flags|=64,null===(h=i.effects)?i.effects=[s]:h.push(s))}else p={eventTime:p,lane:h,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===d?(c=d=p,l=u):d=d.next=p,o|=h;if(null===(s=s.next)){if(null===(s=i.shared.pending))break;s=(h=s).next,h.next=null,i.lastBaseUpdate=h,i.shared.pending=null}}if(null===d&&(l=u),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=d,null!==(t=i.shared.interleaved)){i=t;do{o|=i.lane,i=i.next}while(i!==t)}else null===a&&(i.shared.lanes=0);Ml|=o,e.lanes=o,e.memoizedState=u}}function Wa(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(null!==i){if(r.callback=null,r=n,"function"!==typeof i)throw Error(a(191,i));i.call(r)}}}var Ha={},Va=Si(Ha),qa=Si(Ha),Ga=Si(Ha);function Ka(e){if(e===Ha)throw Error(a(174));return e}function Ya(e,t){switch(Ci(Ga,t),Ci(qa,e),Ci(Va,Ha),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:le(null,"");break;default:t=le(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}Ei(Va),Ci(Va,t)}function Za(){Ei(Va),Ei(qa),Ei(Ga)}function Ja(e){Ka(Ga.current);var t=Ka(Va.current),n=le(t,e.type);t!==n&&(Ci(qa,e),Ci(Va,n))}function Qa(e){qa.current===e&&(Ei(Va),Ei(qa))}var Xa=Si(0);function eo(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!==(128&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var to=[];function no(){for(var e=0;e<to.length;e++)to[e]._workInProgressVersionPrimary=null;to.length=0}var ro=x.ReactCurrentDispatcher,io=x.ReactCurrentBatchConfig,ao=0,oo=null,so=null,lo=null,co=!1,uo=!1,ho=0,po=0;function fo(){throw Error(a(321))}function mo(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!sr(e[n],t[n]))return!1;return!0}function go(e,t,n,r,i,o){if(ao=o,oo=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ro.current=null===e||null===e.memoizedState?Xo:es,e=n(r,i),uo){o=0;do{if(uo=!1,ho=0,25<=o)throw Error(a(301));o+=1,lo=so=null,t.updateQueue=null,ro.current=ts,e=n(r,i)}while(uo)}if(ro.current=Qo,t=null!==so&&null!==so.next,ao=0,lo=so=oo=null,co=!1,t)throw Error(a(300));return e}function bo(){var e=0!==ho;return ho=0,e}function yo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===lo?oo.memoizedState=lo=e:lo=lo.next=e,lo}function vo(){if(null===so){var e=oo.alternate;e=null!==e?e.memoizedState:null}else e=so.next;var t=null===lo?oo.memoizedState:lo.next;if(null!==t)lo=t,so=e;else{if(null===e)throw Error(a(310));e={memoizedState:(so=e).memoizedState,baseState:so.baseState,baseQueue:so.baseQueue,queue:so.queue,next:null},null===lo?oo.memoizedState=lo=e:lo=lo.next=e}return lo}function xo(e,t){return"function"===typeof t?t(e):t}function wo(e){var t=vo(),n=t.queue;if(null===n)throw Error(a(311));n.lastRenderedReducer=e;var r=so,i=r.baseQueue,o=n.pending;if(null!==o){if(null!==i){var s=i.next;i.next=o.next,o.next=s}r.baseQueue=i=o,n.pending=null}if(null!==i){o=i.next,r=r.baseState;var l=s=null,c=null,d=o;do{var u=d.lane;if((ao&u)===u)null!==c&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var h={lane:u,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};null===c?(l=c=h,s=r):c=c.next=h,oo.lanes|=u,Ml|=u}d=d.next}while(null!==d&&d!==o);null===c?s=r:c.next=l,sr(r,t.memoizedState)||(vs=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=c,n.lastRenderedState=r}if(null!==(e=n.interleaved)){i=e;do{o=i.lane,oo.lanes|=o,Ml|=o,i=i.next}while(i!==e)}else null===i&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function _o(e){var t=vo(),n=t.queue;if(null===n)throw Error(a(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(null!==i){n.pending=null;var s=i=i.next;do{o=e(o,s.action),s=s.next}while(s!==i);sr(o,t.memoizedState)||(vs=!0),t.memoizedState=o,null===t.baseQueue&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ko(){}function So(e,t){var n=oo,r=vo(),i=t(),o=!sr(r.memoizedState,i);if(o&&(r.memoizedState=i,vs=!0),r=r.queue,Mo(To.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||null!==lo&&1&lo.memoizedState.tag){if(n.flags|=2048,Ao(9,Co.bind(null,n,r,i,t),void 0,null),null===jl)throw Error(a(349));0!==(30&ao)||Eo(n,t,i)}return i}function Eo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=oo.updateQueue)?(t={lastEffect:null,stores:null},oo.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function Co(e,t,n,r){t.value=n,t.getSnapshot=r,Io(t)&&jo(e)}function To(e,t,n){return n((function(){Io(t)&&jo(e)}))}function Io(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!sr(e,n)}catch(r){return!0}}function jo(e){var t=Oa(e,1);null!==t&&nc(t,e,1,-1)}function Po(e){var t=yo();return"function"===typeof e&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xo,lastRenderedState:e},t.queue=e,e=e.dispatch=Ko.bind(null,oo,e),[t.memoizedState,e]}function Ao(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=oo.updateQueue)?(t={lastEffect:null,stores:null},oo.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function No(){return vo().memoizedState}function Ro(e,t,n,r){var i=yo();oo.flags|=e,i.memoizedState=Ao(1|t,n,void 0,void 0===r?null:r)}function Oo(e,t,n,r){var i=vo();r=void 0===r?null:r;var a=void 0;if(null!==so){var o=so.memoizedState;if(a=o.destroy,null!==r&&mo(r,o.deps))return void(i.memoizedState=Ao(t,n,a,r))}oo.flags|=e,i.memoizedState=Ao(1|t,n,a,r)}function Do(e,t){return Ro(8390656,8,e,t)}function Mo(e,t){return Oo(2048,8,e,t)}function Lo(e,t){return Oo(4,2,e,t)}function Fo(e,t){return Oo(4,4,e,t)}function zo(e,t){return"function"===typeof t?(e=e(),t(e),function(){t(null)}):null!==t&&void 0!==t?(e=e(),t.current=e,function(){t.current=null}):void 0}function $o(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,Oo(4,4,zo.bind(null,t,e),n)}function Uo(){}function Bo(e,t){var n=vo();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&mo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Wo(e,t){var n=vo();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&mo(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ho(e,t,n){return 0===(21&ao)?(e.baseState&&(e.baseState=!1,vs=!0),e.memoizedState=n):(sr(n,t)||(n=mt(),oo.lanes|=n,Ml|=n,e.baseState=!0),t)}function Vo(e,t){var n=vt;vt=0!==n&&4>n?n:4,e(!0);var r=io.transition;io.transition={};try{e(!1),t()}finally{vt=n,io.transition=r}}function qo(){return vo().memoizedState}function Go(e,t,n){var r=tc(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Yo(e))Zo(t,n);else if(null!==(n=Ra(e,t,n,r))){nc(n,e,r,ec()),Jo(n,t,r)}}function Ko(e,t,n){var r=tc(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Yo(e))Zo(t,i);else{var a=e.alternate;if(0===e.lanes&&(null===a||0===a.lanes)&&null!==(a=t.lastRenderedReducer))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,sr(s,o)){var l=t.interleaved;return null===l?(i.next=i,Na(t)):(i.next=l.next,l.next=i),void(t.interleaved=i)}}catch(c){}null!==(n=Ra(e,t,i,r))&&(nc(n,e,r,i=ec()),Jo(n,t,r))}}function Yo(e){var t=e.alternate;return e===oo||null!==t&&t===oo}function Zo(e,t){uo=co=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Jo(e,t,n){if(0!==(4194240&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,yt(e,n)}}var Qo={readContext:Pa,useCallback:fo,useContext:fo,useEffect:fo,useImperativeHandle:fo,useInsertionEffect:fo,useLayoutEffect:fo,useMemo:fo,useReducer:fo,useRef:fo,useState:fo,useDebugValue:fo,useDeferredValue:fo,useTransition:fo,useMutableSource:fo,useSyncExternalStore:fo,useId:fo,unstable_isNewReconciler:!1},Xo={readContext:Pa,useCallback:function(e,t){return yo().memoizedState=[e,void 0===t?null:t],e},useContext:Pa,useEffect:Do,useImperativeHandle:function(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,Ro(4194308,4,zo.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ro(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ro(4,2,e,t)},useMemo:function(e,t){var n=yo();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=yo();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Go.bind(null,oo,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},yo().memoizedState=e},useState:Po,useDebugValue:Uo,useDeferredValue:function(e){return yo().memoizedState=e},useTransition:function(){var e=Po(!1),t=e[0];return e=Vo.bind(null,e[1]),yo().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=oo,i=yo();if(ia){if(void 0===n)throw Error(a(407));n=n()}else{if(n=t(),null===jl)throw Error(a(349));0!==(30&ao)||Eo(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,Do(To.bind(null,r,o,e),[e]),r.flags|=2048,Ao(9,Co.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=yo(),t=jl.identifierPrefix;if(ia){var n=Ji;t=":"+t+"R"+(n=(Zi&~(1<<32-ot(Zi)-1)).toString(32)+n),0<(n=ho++)&&(t+="H"+n.toString(32)),t+=":"}else t=":"+t+"r"+(n=po++).toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},es={readContext:Pa,useCallback:Bo,useContext:Pa,useEffect:Mo,useImperativeHandle:$o,useInsertionEffect:Lo,useLayoutEffect:Fo,useMemo:Wo,useReducer:wo,useRef:No,useState:function(){return wo(xo)},useDebugValue:Uo,useDeferredValue:function(e){return Ho(vo(),so.memoizedState,e)},useTransition:function(){return[wo(xo)[0],vo().memoizedState]},useMutableSource:ko,useSyncExternalStore:So,useId:qo,unstable_isNewReconciler:!1},ts={readContext:Pa,useCallback:Bo,useContext:Pa,useEffect:Mo,useImperativeHandle:$o,useInsertionEffect:Lo,useLayoutEffect:Fo,useMemo:Wo,useReducer:_o,useRef:No,useState:function(){return _o(xo)},useDebugValue:Uo,useDeferredValue:function(e){var t=vo();return null===so?t.memoizedState=e:Ho(t,so.memoizedState,e)},useTransition:function(){return[_o(xo)[0],vo().memoizedState]},useMutableSource:ko,useSyncExternalStore:So,useId:qo,unstable_isNewReconciler:!1};function ns(e,t){if(e&&e.defaultProps){for(var n in t=L({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}function rs(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:L({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var is={isMounted:function(e){return!!(e=e._reactInternals)&&Be(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ec(),i=tc(e),a=Fa(r,i);a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=za(e,a,i))&&(nc(t,e,i,r),$a(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ec(),i=tc(e),a=Fa(r,i);a.tag=1,a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=za(e,a,i))&&(nc(t,e,i,r),$a(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ec(),r=tc(e),i=Fa(n,r);i.tag=2,void 0!==t&&null!==t&&(i.callback=t),null!==(t=za(e,i,r))&&(nc(t,e,r,n),$a(t,e,r))}};function as(e,t,n,r,i,a,o){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,a,o):!t.prototype||!t.prototype.isPureReactComponent||(!lr(n,r)||!lr(i,a))}function os(e,t,n){var r=!1,i=Ti,a=t.contextType;return"object"===typeof a&&null!==a?a=Pa(a):(i=Ni(t)?Pi:Ii.current,a=(r=null!==(r=t.contextTypes)&&void 0!==r)?Ai(e,i):Ti),t=new t(n,a),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=is,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function ss(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&is.enqueueReplaceState(t,t.state,null)}function ls(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Ma(e);var a=t.contextType;"object"===typeof a&&null!==a?i.context=Pa(a):(a=Ni(t)?Pi:Ii.current,i.context=Ai(e,a)),i.state=e.memoizedState,"function"===typeof(a=t.getDerivedStateFromProps)&&(rs(e,t,a,n),i.state=e.memoizedState),"function"===typeof t.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(t=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),t!==i.state&&is.enqueueReplaceState(i,i.state,null),Ba(e,n,i,r),i.state=e.memoizedState),"function"===typeof i.componentDidMount&&(e.flags|=4194308)}function cs(e,t){try{var n="",r=t;do{n+=U(r),r=r.return}while(r);var i=n}catch(a){i="\nError generating stack: "+a.message+"\n"+a.stack}return{value:e,source:t,stack:i,digest:null}}function ds(e,t,n){return{value:e,source:null,stack:null!=n?n:null,digest:null!=t?t:null}}function us(e,t){try{console.error(t.value)}catch(n){setTimeout((function(){throw n}))}}var hs="function"===typeof WeakMap?WeakMap:Map;function ps(e,t,n){(n=Fa(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Hl||(Hl=!0,Vl=r),us(0,t)},n}function fs(e,t,n){(n=Fa(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"===typeof r){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){us(0,t)}}var a=e.stateNode;return null!==a&&"function"===typeof a.componentDidCatch&&(n.callback=function(){us(0,t),"function"!==typeof r&&(null===ql?ql=new Set([this]):ql.add(this));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}function ms(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new hs;var i=new Set;r.set(t,i)}else void 0===(i=r.get(t))&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=Ec.bind(null,e,t,n),t.then(e,e))}function gs(e){do{var t;if((t=13===e.tag)&&(t=null===(t=e.memoizedState)||null!==t.dehydrated),t)return e;e=e.return}while(null!==e);return null}function bs(e,t,n,r,i){return 0===(1&e.mode)?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,1===n.tag&&(null===n.alternate?n.tag=17:((t=Fa(-1,1)).tag=2,za(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=i,e)}var ys=x.ReactCurrentOwner,vs=!1;function xs(e,t,n,r){t.child=null===e?wa(t,null,n,r):xa(t,e.child,n,r)}function ws(e,t,n,r,i){n=n.render;var a=t.ref;return ja(t,i),r=go(e,t,n,r,a,i),n=bo(),null===e||vs?(ia&&n&&ea(t),t.flags|=1,xs(e,t,r,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Hs(e,t,i))}function _s(e,t,n,r,i){if(null===e){var a=n.type;return"function"!==typeof a||Nc(a)||void 0!==a.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Oc(n.type,null,r,t,t.mode,i)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=a,ks(e,t,a,r,i))}if(a=e.child,0===(e.lanes&i)){var o=a.memoizedProps;if((n=null!==(n=n.compare)?n:lr)(o,r)&&e.ref===t.ref)return Hs(e,t,i)}return t.flags|=1,(e=Rc(a,r)).ref=t.ref,e.return=t,t.child=e}function ks(e,t,n,r,i){if(null!==e){var a=e.memoizedProps;if(lr(a,r)&&e.ref===t.ref){if(vs=!1,t.pendingProps=r=a,0===(e.lanes&i))return t.lanes=e.lanes,Hs(e,t,i);0!==(131072&e.flags)&&(vs=!0)}}return Cs(e,t,n,r,i)}function Ss(e,t,n){var r=t.pendingProps,i=r.children,a=null!==e?e.memoizedState:null;if("hidden"===r.mode)if(0===(1&t.mode))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ci(Rl,Nl),Nl|=n;else{if(0===(1073741824&n))return e=null!==a?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ci(Rl,Nl),Nl|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=null!==a?a.baseLanes:n,Ci(Rl,Nl),Nl|=r}else null!==a?(r=a.baseLanes|n,t.memoizedState=null):r=n,Ci(Rl,Nl),Nl|=r;return xs(e,t,i,n),t.child}function Es(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Cs(e,t,n,r,i){var a=Ni(n)?Pi:Ii.current;return a=Ai(t,a),ja(t,i),n=go(e,t,n,r,a,i),r=bo(),null===e||vs?(ia&&r&&ea(t),t.flags|=1,xs(e,t,n,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Hs(e,t,i))}function Ts(e,t,n,r,i){if(Ni(n)){var a=!0;Mi(t)}else a=!1;if(ja(t,i),null===t.stateNode)Ws(e,t),os(t,n,r),ls(t,n,r,i),r=!0;else if(null===e){var o=t.stateNode,s=t.memoizedProps;o.props=s;var l=o.context,c=n.contextType;"object"===typeof c&&null!==c?c=Pa(c):c=Ai(t,c=Ni(n)?Pi:Ii.current);var d=n.getDerivedStateFromProps,u="function"===typeof d||"function"===typeof o.getSnapshotBeforeUpdate;u||"function"!==typeof o.UNSAFE_componentWillReceiveProps&&"function"!==typeof o.componentWillReceiveProps||(s!==r||l!==c)&&ss(t,o,r,c),Da=!1;var h=t.memoizedState;o.state=h,Ba(t,r,o,i),l=t.memoizedState,s!==r||h!==l||ji.current||Da?("function"===typeof d&&(rs(t,n,d,r),l=t.memoizedState),(s=Da||as(t,n,s,r,h,l,c))?(u||"function"!==typeof o.UNSAFE_componentWillMount&&"function"!==typeof o.componentWillMount||("function"===typeof o.componentWillMount&&o.componentWillMount(),"function"===typeof o.UNSAFE_componentWillMount&&o.UNSAFE_componentWillMount()),"function"===typeof o.componentDidMount&&(t.flags|=4194308)):("function"===typeof o.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),o.props=r,o.state=l,o.context=c,r=s):("function"===typeof o.componentDidMount&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,La(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:ns(t.type,s),o.props=c,u=t.pendingProps,h=o.context,"object"===typeof(l=n.contextType)&&null!==l?l=Pa(l):l=Ai(t,l=Ni(n)?Pi:Ii.current);var p=n.getDerivedStateFromProps;(d="function"===typeof p||"function"===typeof o.getSnapshotBeforeUpdate)||"function"!==typeof o.UNSAFE_componentWillReceiveProps&&"function"!==typeof o.componentWillReceiveProps||(s!==u||h!==l)&&ss(t,o,r,l),Da=!1,h=t.memoizedState,o.state=h,Ba(t,r,o,i);var f=t.memoizedState;s!==u||h!==f||ji.current||Da?("function"===typeof p&&(rs(t,n,p,r),f=t.memoizedState),(c=Da||as(t,n,c,r,h,f,l)||!1)?(d||"function"!==typeof o.UNSAFE_componentWillUpdate&&"function"!==typeof o.componentWillUpdate||("function"===typeof o.componentWillUpdate&&o.componentWillUpdate(r,f,l),"function"===typeof o.UNSAFE_componentWillUpdate&&o.UNSAFE_componentWillUpdate(r,f,l)),"function"===typeof o.componentDidUpdate&&(t.flags|=4),"function"===typeof o.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof o.componentDidUpdate||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),"function"!==typeof o.getSnapshotBeforeUpdate||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=f),o.props=r,o.state=f,o.context=l,r=c):("function"!==typeof o.componentDidUpdate||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),"function"!==typeof o.getSnapshotBeforeUpdate||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return Is(e,t,n,r,a,i)}function Is(e,t,n,r,i,a){Es(e,t);var o=0!==(128&t.flags);if(!r&&!o)return i&&Li(t,n,!1),Hs(e,t,a);r=t.stateNode,ys.current=t;var s=o&&"function"!==typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&o?(t.child=xa(t,e.child,null,a),t.child=xa(t,null,s,a)):xs(e,t,s,a),t.memoizedState=r.state,i&&Li(t,n,!0),t.child}function js(e){var t=e.stateNode;t.pendingContext?Oi(0,t.pendingContext,t.pendingContext!==t.context):t.context&&Oi(0,t.context,!1),Ya(e,t.containerInfo)}function Ps(e,t,n,r,i){return pa(),fa(i),t.flags|=256,xs(e,t,n,r),t.child}var As,Ns,Rs,Os,Ds={dehydrated:null,treeContext:null,retryLane:0};function Ms(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ls(e,t,n){var r,i=t.pendingProps,o=Xa.current,s=!1,l=0!==(128&t.flags);if((r=l)||(r=(null===e||null!==e.memoizedState)&&0!==(2&o)),r?(s=!0,t.flags&=-129):null!==e&&null===e.memoizedState||(o|=1),Ci(Xa,1&o),null===e)return ca(t),null!==(e=t.memoizedState)&&null!==(e=e.dehydrated)?(0===(1&t.mode)?t.lanes=1:"$!"===e.data?t.lanes=8:t.lanes=1073741824,null):(l=i.children,e=i.fallback,s?(i=t.mode,s=t.child,l={mode:"hidden",children:l},0===(1&i)&&null!==s?(s.childLanes=0,s.pendingProps=l):s=Mc(l,i,0,null),e=Dc(e,i,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Ms(n),t.memoizedState=Ds,e):Fs(t,l));if(null!==(o=e.memoizedState)&&null!==(r=o.dehydrated))return function(e,t,n,r,i,o,s){if(n)return 256&t.flags?(t.flags&=-257,zs(e,t,s,r=ds(Error(a(422))))):null!==t.memoizedState?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=Mc({mode:"visible",children:r.children},i,0,null),(o=Dc(o,i,s,null)).flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,0!==(1&t.mode)&&xa(t,e.child,null,s),t.child.memoizedState=Ms(s),t.memoizedState=Ds,o);if(0===(1&t.mode))return zs(e,t,s,null);if("$!"===i.data){if(r=i.nextSibling&&i.nextSibling.dataset)var l=r.dgst;return r=l,zs(e,t,s,r=ds(o=Error(a(419)),r,void 0))}if(l=0!==(s&e.childLanes),vs||l){if(null!==(r=jl)){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}0!==(i=0!==(i&(r.suspendedLanes|s))?0:i)&&i!==o.retryLane&&(o.retryLane=i,Oa(e,i),nc(r,e,i,-1))}return mc(),zs(e,t,s,r=ds(Error(a(421))))}return"$?"===i.data?(t.flags|=128,t.child=e.child,t=Tc.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,ra=ci(i.nextSibling),na=t,ia=!0,aa=null,null!==e&&(Gi[Ki++]=Zi,Gi[Ki++]=Ji,Gi[Ki++]=Yi,Zi=e.id,Ji=e.overflow,Yi=t),t=Fs(t,r.children),t.flags|=4096,t)}(e,t,l,i,r,o,n);if(s){s=i.fallback,l=t.mode,r=(o=e.child).sibling;var c={mode:"hidden",children:i.children};return 0===(1&l)&&t.child!==o?((i=t.child).childLanes=0,i.pendingProps=c,t.deletions=null):(i=Rc(o,c)).subtreeFlags=14680064&o.subtreeFlags,null!==r?s=Rc(r,s):(s=Dc(s,l,n,null)).flags|=2,s.return=t,i.return=t,i.sibling=s,t.child=i,i=s,s=t.child,l=null===(l=e.child.memoizedState)?Ms(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},s.memoizedState=l,s.childLanes=e.childLanes&~n,t.memoizedState=Ds,i}return e=(s=e.child).sibling,i=Rc(s,{mode:"visible",children:i.children}),0===(1&t.mode)&&(i.lanes=n),i.return=t,i.sibling=null,null!==e&&(null===(n=t.deletions)?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=i,t.memoizedState=null,i}function Fs(e,t){return(t=Mc({mode:"visible",children:t},e.mode,0,null)).return=e,e.child=t}function zs(e,t,n,r){return null!==r&&fa(r),xa(t,e.child,null,n),(e=Fs(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function $s(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),Ia(e.return,t,n)}function Us(e,t,n,r,i){var a=e.memoizedState;null===a?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function Bs(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(xs(e,t,r.children,n),0!==(2&(r=Xa.current)))r=1&r|2,t.flags|=128;else{if(null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&$s(e,n,t);else if(19===e.tag)$s(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ci(Xa,r),0===(1&t.mode))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;null!==n;)null!==(e=n.alternate)&&null===eo(e)&&(i=n),n=n.sibling;null===(n=i)?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Us(t,!1,i,n,a);break;case"backwards":for(n=null,i=t.child,t.child=null;null!==i;){if(null!==(e=i.alternate)&&null===eo(e)){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Us(t,!0,n,null,a);break;case"together":Us(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ws(e,t){0===(1&t.mode)&&null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Hs(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Ml|=t.lanes,0===(n&t.childLanes))return null;if(null!==e&&t.child!==e.child)throw Error(a(153));if(null!==t.child){for(n=Rc(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Rc(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function Vs(e,t){if(!ia)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function qs(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=14680064&i.subtreeFlags,r|=14680064&i.flags,i.return=e,i=i.sibling;else for(i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Gs(e,t,n){var r=t.pendingProps;switch(ta(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qs(t),null;case 1:case 17:return Ni(t.type)&&Ri(),qs(t),null;case 3:return r=t.stateNode,Za(),Ei(ji),Ei(Ii),no(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(ua(t)?t.flags|=4:null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,null!==aa&&(oc(aa),aa=null))),Ns(e,t),qs(t),null;case 5:Qa(t);var i=Ka(Ga.current);if(n=t.type,null!==e&&null!=t.stateNode)Rs(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(null===t.stateNode)throw Error(a(166));return qs(t),null}if(e=Ka(Va.current),ua(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[hi]=t,r[pi]=o,e=0!==(1&t.mode),n){case"dialog":zr("cancel",r),zr("close",r);break;case"iframe":case"object":case"embed":zr("load",r);break;case"video":case"audio":for(i=0;i<Dr.length;i++)zr(Dr[i],r);break;case"source":zr("error",r);break;case"img":case"image":case"link":zr("error",r),zr("load",r);break;case"details":zr("toggle",r);break;case"input":Z(r,o),zr("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},zr("invalid",r);break;case"textarea":ie(r,o),zr("invalid",r)}for(var l in ye(n,o),i=null,o)if(o.hasOwnProperty(l)){var c=o[l];"children"===l?"string"===typeof c?r.textContent!==c&&(!0!==o.suppressHydrationWarning&&Qr(r.textContent,c,e),i=["children",c]):"number"===typeof c&&r.textContent!==""+c&&(!0!==o.suppressHydrationWarning&&Qr(r.textContent,c,e),i=["children",""+c]):s.hasOwnProperty(l)&&null!=c&&"onScroll"===l&&zr("scroll",r)}switch(n){case"input":q(r),X(r,o,!0);break;case"textarea":q(r),oe(r);break;case"select":case"option":break;default:"function"===typeof o.onClick&&(r.onclick=Xr)}r=i,t.updateQueue=r,null!==r&&(t.flags|=4)}else{l=9===i.nodeType?i:i.ownerDocument,"http://www.w3.org/1999/xhtml"===e&&(e=se(n)),"http://www.w3.org/1999/xhtml"===e?"script"===n?((e=l.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"===typeof r.is?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),"select"===n&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[hi]=t,e[pi]=r,As(e,t,!1,!1),t.stateNode=e;e:{switch(l=ve(n,r),n){case"dialog":zr("cancel",e),zr("close",e),i=r;break;case"iframe":case"object":case"embed":zr("load",e),i=r;break;case"video":case"audio":for(i=0;i<Dr.length;i++)zr(Dr[i],e);i=r;break;case"source":zr("error",e),i=r;break;case"img":case"image":case"link":zr("error",e),zr("load",e),i=r;break;case"details":zr("toggle",e),i=r;break;case"input":Z(e,r),i=Y(e,r),zr("invalid",e);break;case"option":default:i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=L({},r,{value:void 0}),zr("invalid",e);break;case"textarea":ie(e,r),i=re(e,r),zr("invalid",e)}for(o in ye(n,i),c=i)if(c.hasOwnProperty(o)){var d=c[o];"style"===o?ge(e,d):"dangerouslySetInnerHTML"===o?null!=(d=d?d.__html:void 0)&&ue(e,d):"children"===o?"string"===typeof d?("textarea"!==n||""!==d)&&he(e,d):"number"===typeof d&&he(e,""+d):"suppressContentEditableWarning"!==o&&"suppressHydrationWarning"!==o&&"autoFocus"!==o&&(s.hasOwnProperty(o)?null!=d&&"onScroll"===o&&zr("scroll",e):null!=d&&v(e,o,d,l))}switch(n){case"input":q(e),X(e,r,!1);break;case"textarea":q(e),oe(e);break;case"option":null!=r.value&&e.setAttribute("value",""+H(r.value));break;case"select":e.multiple=!!r.multiple,null!=(o=r.value)?ne(e,!!r.multiple,o,!1):null!=r.defaultValue&&ne(e,!!r.multiple,r.defaultValue,!0);break;default:"function"===typeof i.onClick&&(e.onclick=Xr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}null!==t.ref&&(t.flags|=512,t.flags|=2097152)}return qs(t),null;case 6:if(e&&null!=t.stateNode)Os(e,t,e.memoizedProps,r);else{if("string"!==typeof r&&null===t.stateNode)throw Error(a(166));if(n=Ka(Ga.current),Ka(Va.current),ua(t)){if(r=t.stateNode,n=t.memoizedProps,r[hi]=t,(o=r.nodeValue!==n)&&null!==(e=na))switch(e.tag){case 3:Qr(r.nodeValue,n,0!==(1&e.mode));break;case 5:!0!==e.memoizedProps.suppressHydrationWarning&&Qr(r.nodeValue,n,0!==(1&e.mode))}o&&(t.flags|=4)}else(r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[hi]=t,t.stateNode=r}return qs(t),null;case 13:if(Ei(Xa),r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(ia&&null!==ra&&0!==(1&t.mode)&&0===(128&t.flags))ha(),pa(),t.flags|=98560,o=!1;else if(o=ua(t),null!==r&&null!==r.dehydrated){if(null===e){if(!o)throw Error(a(318));if(!(o=null!==(o=t.memoizedState)?o.dehydrated:null))throw Error(a(317));o[hi]=t}else pa(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;qs(t),o=!1}else null!==aa&&(oc(aa),aa=null),o=!0;if(!o)return 65536&t.flags?t:null}return 0!==(128&t.flags)?(t.lanes=n,t):((r=null!==r)!==(null!==e&&null!==e.memoizedState)&&r&&(t.child.flags|=8192,0!==(1&t.mode)&&(null===e||0!==(1&Xa.current)?0===Ol&&(Ol=3):mc())),null!==t.updateQueue&&(t.flags|=4),qs(t),null);case 4:return Za(),Ns(e,t),null===e&&Br(t.stateNode.containerInfo),qs(t),null;case 10:return Ta(t.type._context),qs(t),null;case 19:if(Ei(Xa),null===(o=t.memoizedState))return qs(t),null;if(r=0!==(128&t.flags),null===(l=o.rendering))if(r)Vs(o,!1);else{if(0!==Ol||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(l=eo(e))){for(t.flags|=128,Vs(o,!1),null!==(r=l.updateQueue)&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;null!==n;)e=r,(o=n).flags&=14680066,null===(l=o.alternate)?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=l.childLanes,o.lanes=l.lanes,o.child=l.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=l.memoizedProps,o.memoizedState=l.memoizedState,o.updateQueue=l.updateQueue,o.type=l.type,e=l.dependencies,o.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ci(Xa,1&Xa.current|2),t.child}e=e.sibling}null!==o.tail&&Je()>Bl&&(t.flags|=128,r=!0,Vs(o,!1),t.lanes=4194304)}else{if(!r)if(null!==(e=eo(l))){if(t.flags|=128,r=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),Vs(o,!0),null===o.tail&&"hidden"===o.tailMode&&!l.alternate&&!ia)return qs(t),null}else 2*Je()-o.renderingStartTime>Bl&&1073741824!==n&&(t.flags|=128,r=!0,Vs(o,!1),t.lanes=4194304);o.isBackwards?(l.sibling=t.child,t.child=l):(null!==(n=o.last)?n.sibling=l:t.child=l,o.last=l)}return null!==o.tail?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Je(),t.sibling=null,n=Xa.current,Ci(Xa,r?1&n|2:1&n),t):(qs(t),null);case 22:case 23:return uc(),r=null!==t.memoizedState,null!==e&&null!==e.memoizedState!==r&&(t.flags|=8192),r&&0!==(1&t.mode)?0!==(1073741824&Nl)&&(qs(t),6&t.subtreeFlags&&(t.flags|=8192)):qs(t),null;case 24:case 25:return null}throw Error(a(156,t.tag))}function Ks(e,t){switch(ta(t),t.tag){case 1:return Ni(t.type)&&Ri(),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return Za(),Ei(ji),Ei(Ii),no(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 5:return Qa(t),null;case 13:if(Ei(Xa),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(a(340));pa()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return Ei(Xa),null;case 4:return Za(),null;case 10:return Ta(t.type._context),null;case 22:case 23:return uc(),null;default:return null}}As=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Ns=function(){},Rs=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Ka(Va.current);var a,o=null;switch(n){case"input":i=Y(e,i),r=Y(e,r),o=[];break;case"select":i=L({},i,{value:void 0}),r=L({},r,{value:void 0}),o=[];break;case"textarea":i=re(e,i),r=re(e,r),o=[];break;default:"function"!==typeof i.onClick&&"function"===typeof r.onClick&&(e.onclick=Xr)}for(d in ye(n,r),n=null,i)if(!r.hasOwnProperty(d)&&i.hasOwnProperty(d)&&null!=i[d])if("style"===d){var l=i[d];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else"dangerouslySetInnerHTML"!==d&&"children"!==d&&"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&"autoFocus"!==d&&(s.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in r){var c=r[d];if(l=null!=i?i[d]:void 0,r.hasOwnProperty(d)&&c!==l&&(null!=c||null!=l))if("style"===d)if(l){for(a in l)!l.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&l[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(o||(o=[]),o.push(d,n)),n=c;else"dangerouslySetInnerHTML"===d?(c=c?c.__html:void 0,l=l?l.__html:void 0,null!=c&&l!==c&&(o=o||[]).push(d,c)):"children"===d?"string"!==typeof c&&"number"!==typeof c||(o=o||[]).push(d,""+c):"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&(s.hasOwnProperty(d)?(null!=c&&"onScroll"===d&&zr("scroll",e),o||l===c||(o=[])):(o=o||[]).push(d,c))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}},Os=function(e,t,n,r){n!==r&&(t.flags|=4)};var Ys=!1,Zs=!1,Js="function"===typeof WeakSet?WeakSet:Set,Qs=null;function Xs(e,t){var n=e.ref;if(null!==n)if("function"===typeof n)try{n(null)}catch(r){Sc(e,t,r)}else n.current=null}function el(e,t,n){try{n()}catch(r){Sc(e,t,r)}}var tl=!1;function nl(e,t,n){var r=t.updateQueue;if(null!==(r=null!==r?r.lastEffect:null)){var i=r=r.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,void 0!==a&&el(t,n,a)}i=i.next}while(i!==r)}}function rl(e,t){if(null!==(t=null!==(t=t.updateQueue)?t.lastEffect:null)){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function il(e){var t=e.ref;if(null!==t){var n=e.stateNode;e.tag,e=n,"function"===typeof t?t(e):t.current=e}}function al(e){var t=e.alternate;null!==t&&(e.alternate=null,al(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&(delete t[hi],delete t[pi],delete t[mi],delete t[gi],delete t[bi])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function ol(e){return 5===e.tag||3===e.tag||4===e.tag}function sl(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||ol(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function ll(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Xr));else if(4!==r&&null!==(e=e.child))for(ll(e,t,n),e=e.sibling;null!==e;)ll(e,t,n),e=e.sibling}function cl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(cl(e,t,n),e=e.sibling;null!==e;)cl(e,t,n),e=e.sibling}var dl=null,ul=!1;function hl(e,t,n){for(n=n.child;null!==n;)pl(e,t,n),n=n.sibling}function pl(e,t,n){if(at&&"function"===typeof at.onCommitFiberUnmount)try{at.onCommitFiberUnmount(it,n)}catch(s){}switch(n.tag){case 5:Zs||Xs(n,t);case 6:var r=dl,i=ul;dl=null,hl(e,t,n),ul=i,null!==(dl=r)&&(ul?(e=dl,n=n.stateNode,8===e.nodeType?e.parentNode.removeChild(n):e.removeChild(n)):dl.removeChild(n.stateNode));break;case 18:null!==dl&&(ul?(e=dl,n=n.stateNode,8===e.nodeType?li(e.parentNode,n):1===e.nodeType&&li(e,n),Bt(e)):li(dl,n.stateNode));break;case 4:r=dl,i=ul,dl=n.stateNode.containerInfo,ul=!0,hl(e,t,n),dl=r,ul=i;break;case 0:case 11:case 14:case 15:if(!Zs&&(null!==(r=n.updateQueue)&&null!==(r=r.lastEffect))){i=r=r.next;do{var a=i,o=a.destroy;a=a.tag,void 0!==o&&(0!==(2&a)||0!==(4&a))&&el(n,t,o),i=i.next}while(i!==r)}hl(e,t,n);break;case 1:if(!Zs&&(Xs(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){Sc(n,t,s)}hl(e,t,n);break;case 21:hl(e,t,n);break;case 22:1&n.mode?(Zs=(r=Zs)||null!==n.memoizedState,hl(e,t,n),Zs=r):hl(e,t,n);break;default:hl(e,t,n)}}function fl(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new Js),t.forEach((function(t){var r=Ic.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}function ml(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 5:dl=l.stateNode,ul=!1;break e;case 3:case 4:dl=l.stateNode.containerInfo,ul=!0;break e}l=l.return}if(null===dl)throw Error(a(160));pl(o,s,i),dl=null,ul=!1;var c=i.alternate;null!==c&&(c.return=null),i.return=null}catch(d){Sc(i,t,d)}}if(12854&t.subtreeFlags)for(t=t.child;null!==t;)gl(t,e),t=t.sibling}function gl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ml(t,e),bl(e),4&r){try{nl(3,e,e.return),rl(3,e)}catch(g){Sc(e,e.return,g)}try{nl(5,e,e.return)}catch(g){Sc(e,e.return,g)}}break;case 1:ml(t,e),bl(e),512&r&&null!==n&&Xs(n,n.return);break;case 5:if(ml(t,e),bl(e),512&r&&null!==n&&Xs(n,n.return),32&e.flags){var i=e.stateNode;try{he(i,"")}catch(g){Sc(e,e.return,g)}}if(4&r&&null!=(i=e.stateNode)){var o=e.memoizedProps,s=null!==n?n.memoizedProps:o,l=e.type,c=e.updateQueue;if(e.updateQueue=null,null!==c)try{"input"===l&&"radio"===o.type&&null!=o.name&&J(i,o),ve(l,s);var d=ve(l,o);for(s=0;s<c.length;s+=2){var u=c[s],h=c[s+1];"style"===u?ge(i,h):"dangerouslySetInnerHTML"===u?ue(i,h):"children"===u?he(i,h):v(i,u,h,d)}switch(l){case"input":Q(i,o);break;case"textarea":ae(i,o);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var f=o.value;null!=f?ne(i,!!o.multiple,f,!1):p!==!!o.multiple&&(null!=o.defaultValue?ne(i,!!o.multiple,o.defaultValue,!0):ne(i,!!o.multiple,o.multiple?[]:"",!1))}i[pi]=o}catch(g){Sc(e,e.return,g)}}break;case 6:if(ml(t,e),bl(e),4&r){if(null===e.stateNode)throw Error(a(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(g){Sc(e,e.return,g)}}break;case 3:if(ml(t,e),bl(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Bt(t.containerInfo)}catch(g){Sc(e,e.return,g)}break;case 4:default:ml(t,e),bl(e);break;case 13:ml(t,e),bl(e),8192&(i=e.child).flags&&(o=null!==i.memoizedState,i.stateNode.isHidden=o,!o||null!==i.alternate&&null!==i.alternate.memoizedState||(Ul=Je())),4&r&&fl(e);break;case 22:if(u=null!==n&&null!==n.memoizedState,1&e.mode?(Zs=(d=Zs)||u,ml(t,e),Zs=d):ml(t,e),bl(e),8192&r){if(d=null!==e.memoizedState,(e.stateNode.isHidden=d)&&!u&&0!==(1&e.mode))for(Qs=e,u=e.child;null!==u;){for(h=Qs=u;null!==Qs;){switch(f=(p=Qs).child,p.tag){case 0:case 11:case 14:case 15:nl(4,p,p.return);break;case 1:Xs(p,p.return);var m=p.stateNode;if("function"===typeof m.componentWillUnmount){r=p,n=p.return;try{t=r,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(g){Sc(r,n,g)}}break;case 5:Xs(p,p.return);break;case 22:if(null!==p.memoizedState){wl(h);continue}}null!==f?(f.return=p,Qs=f):wl(h)}u=u.sibling}e:for(u=null,h=e;;){if(5===h.tag){if(null===u){u=h;try{i=h.stateNode,d?"function"===typeof(o=i.style).setProperty?o.setProperty("display","none","important"):o.display="none":(l=h.stateNode,s=void 0!==(c=h.memoizedProps.style)&&null!==c&&c.hasOwnProperty("display")?c.display:null,l.style.display=me("display",s))}catch(g){Sc(e,e.return,g)}}}else if(6===h.tag){if(null===u)try{h.stateNode.nodeValue=d?"":h.memoizedProps}catch(g){Sc(e,e.return,g)}}else if((22!==h.tag&&23!==h.tag||null===h.memoizedState||h===e)&&null!==h.child){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;null===h.sibling;){if(null===h.return||h.return===e)break e;u===h&&(u=null),h=h.return}u===h&&(u=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:ml(t,e),bl(e),4&r&&fl(e);case 21:}}function bl(e){var t=e.flags;if(2&t){try{e:{for(var n=e.return;null!==n;){if(ol(n)){var r=n;break e}n=n.return}throw Error(a(160))}switch(r.tag){case 5:var i=r.stateNode;32&r.flags&&(he(i,""),r.flags&=-33),cl(e,sl(e),i);break;case 3:case 4:var o=r.stateNode.containerInfo;ll(e,sl(e),o);break;default:throw Error(a(161))}}catch(s){Sc(e,e.return,s)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function yl(e,t,n){Qs=e,vl(e,t,n)}function vl(e,t,n){for(var r=0!==(1&e.mode);null!==Qs;){var i=Qs,a=i.child;if(22===i.tag&&r){var o=null!==i.memoizedState||Ys;if(!o){var s=i.alternate,l=null!==s&&null!==s.memoizedState||Zs;s=Ys;var c=Zs;if(Ys=o,(Zs=l)&&!c)for(Qs=i;null!==Qs;)l=(o=Qs).child,22===o.tag&&null!==o.memoizedState?_l(i):null!==l?(l.return=o,Qs=l):_l(i);for(;null!==a;)Qs=a,vl(a,t,n),a=a.sibling;Qs=i,Ys=s,Zs=c}xl(e)}else 0!==(8772&i.subtreeFlags)&&null!==a?(a.return=i,Qs=a):xl(e)}}function xl(e){for(;null!==Qs;){var t=Qs;if(0!==(8772&t.flags)){var n=t.alternate;try{if(0!==(8772&t.flags))switch(t.tag){case 0:case 11:case 15:Zs||rl(5,t);break;case 1:var r=t.stateNode;if(4&t.flags&&!Zs)if(null===n)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:ns(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;null!==o&&Wa(t,o,r);break;case 3:var s=t.updateQueue;if(null!==s){if(n=null,null!==t.child)switch(t.child.tag){case 5:case 1:n=t.child.stateNode}Wa(t,s,n)}break;case 5:var l=t.stateNode;if(null===n&&4&t.flags){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:case 25:break;case 13:if(null===t.memoizedState){var d=t.alternate;if(null!==d){var u=d.memoizedState;if(null!==u){var h=u.dehydrated;null!==h&&Bt(h)}}}break;default:throw Error(a(163))}Zs||512&t.flags&&il(t)}catch(p){Sc(t,t.return,p)}}if(t===e){Qs=null;break}if(null!==(n=t.sibling)){n.return=t.return,Qs=n;break}Qs=t.return}}function wl(e){for(;null!==Qs;){var t=Qs;if(t===e){Qs=null;break}var n=t.sibling;if(null!==n){n.return=t.return,Qs=n;break}Qs=t.return}}function _l(e){for(;null!==Qs;){var t=Qs;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{rl(4,t)}catch(l){Sc(t,n,l)}break;case 1:var r=t.stateNode;if("function"===typeof r.componentDidMount){var i=t.return;try{r.componentDidMount()}catch(l){Sc(t,i,l)}}var a=t.return;try{il(t)}catch(l){Sc(t,a,l)}break;case 5:var o=t.return;try{il(t)}catch(l){Sc(t,o,l)}}}catch(l){Sc(t,t.return,l)}if(t===e){Qs=null;break}var s=t.sibling;if(null!==s){s.return=t.return,Qs=s;break}Qs=t.return}}var kl,Sl=Math.ceil,El=x.ReactCurrentDispatcher,Cl=x.ReactCurrentOwner,Tl=x.ReactCurrentBatchConfig,Il=0,jl=null,Pl=null,Al=0,Nl=0,Rl=Si(0),Ol=0,Dl=null,Ml=0,Ll=0,Fl=0,zl=null,$l=null,Ul=0,Bl=1/0,Wl=null,Hl=!1,Vl=null,ql=null,Gl=!1,Kl=null,Yl=0,Zl=0,Jl=null,Ql=-1,Xl=0;function ec(){return 0!==(6&Il)?Je():-1!==Ql?Ql:Ql=Je()}function tc(e){return 0===(1&e.mode)?1:0!==(2&Il)&&0!==Al?Al&-Al:null!==ma.transition?(0===Xl&&(Xl=mt()),Xl):0!==(e=vt)?e:e=void 0===(e=window.event)?16:Zt(e.type)}function nc(e,t,n,r){if(50<Zl)throw Zl=0,Jl=null,Error(a(185));bt(e,n,r),0!==(2&Il)&&e===jl||(e===jl&&(0===(2&Il)&&(Ll|=n),4===Ol&&sc(e,Al)),rc(e,r),1===n&&0===Il&&0===(1&t.mode)&&(Bl=Je()+500,zi&&Bi()))}function rc(e,t){var n=e.callbackNode;!function(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-ot(a),s=1<<o,l=i[o];-1===l?0!==(s&n)&&0===(s&r)||(i[o]=pt(s,t)):l<=t&&(e.expiredLanes|=s),a&=~s}}(e,t);var r=ht(e,e===jl?Al:0);if(0===r)null!==n&&Ke(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(null!=n&&Ke(n),1===t)0===e.tag?function(e){zi=!0,Ui(e)}(lc.bind(null,e)):Ui(lc.bind(null,e)),oi((function(){0===(6&Il)&&Bi()})),n=null;else{switch(xt(r)){case 1:n=Xe;break;case 4:n=et;break;case 16:default:n=tt;break;case 536870912:n=rt}n=jc(n,ic.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ic(e,t){if(Ql=-1,Xl=0,0!==(6&Il))throw Error(a(327));var n=e.callbackNode;if(_c()&&e.callbackNode!==n)return null;var r=ht(e,e===jl?Al:0);if(0===r)return null;if(0!==(30&r)||0!==(r&e.expiredLanes)||t)t=gc(e,r);else{t=r;var i=Il;Il|=2;var o=fc();for(jl===e&&Al===t||(Wl=null,Bl=Je()+500,hc(e,t));;)try{yc();break}catch(l){pc(e,l)}Ca(),El.current=o,Il=i,null!==Pl?t=0:(jl=null,Al=0,t=Ol)}if(0!==t){if(2===t&&(0!==(i=ft(e))&&(r=i,t=ac(e,i))),1===t)throw n=Dl,hc(e,0),sc(e,r),rc(e,Je()),n;if(6===t)sc(e,r);else{if(i=e.current.alternate,0===(30&r)&&!function(e){for(var t=e;;){if(16384&t.flags){var n=t.updateQueue;if(null!==n&&null!==(n=n.stores))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!sr(a(),i))return!1}catch(s){return!1}}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}(i)&&(2===(t=gc(e,r))&&(0!==(o=ft(e))&&(r=o,t=ac(e,o))),1===t))throw n=Dl,hc(e,0),sc(e,r),rc(e,Je()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(a(345));case 2:case 5:wc(e,$l,Wl);break;case 3:if(sc(e,r),(130023424&r)===r&&10<(t=Ul+500-Je())){if(0!==ht(e,0))break;if(((i=e.suspendedLanes)&r)!==r){ec(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=ri(wc.bind(null,e,$l,Wl),t);break}wc(e,$l,Wl);break;case 4:if(sc(e,r),(4194240&r)===r)break;for(t=e.eventTimes,i=-1;0<r;){var s=31-ot(r);o=1<<s,(s=t[s])>i&&(i=s),r&=~o}if(r=i,10<(r=(120>(r=Je()-r)?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Sl(r/1960))-r)){e.timeoutHandle=ri(wc.bind(null,e,$l,Wl),r);break}wc(e,$l,Wl);break;default:throw Error(a(329))}}}return rc(e,Je()),e.callbackNode===n?ic.bind(null,e):null}function ac(e,t){var n=zl;return e.current.memoizedState.isDehydrated&&(hc(e,t).flags|=256),2!==(e=gc(e,t))&&(t=$l,$l=n,null!==t&&oc(t)),e}function oc(e){null===$l?$l=e:$l.push.apply($l,e)}function sc(e,t){for(t&=~Fl,t&=~Ll,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ot(t),r=1<<n;e[n]=-1,t&=~r}}function lc(e){if(0!==(6&Il))throw Error(a(327));_c();var t=ht(e,0);if(0===(1&t))return rc(e,Je()),null;var n=gc(e,t);if(0!==e.tag&&2===n){var r=ft(e);0!==r&&(t=r,n=ac(e,r))}if(1===n)throw n=Dl,hc(e,0),sc(e,t),rc(e,Je()),n;if(6===n)throw Error(a(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,wc(e,$l,Wl),rc(e,Je()),null}function cc(e,t){var n=Il;Il|=1;try{return e(t)}finally{0===(Il=n)&&(Bl=Je()+500,zi&&Bi())}}function dc(e){null!==Kl&&0===Kl.tag&&0===(6&Il)&&_c();var t=Il;Il|=1;var n=Tl.transition,r=vt;try{if(Tl.transition=null,vt=1,e)return e()}finally{vt=r,Tl.transition=n,0===(6&(Il=t))&&Bi()}}function uc(){Nl=Rl.current,Ei(Rl)}function hc(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,ii(n)),null!==Pl)for(n=Pl.return;null!==n;){var r=n;switch(ta(r),r.tag){case 1:null!==(r=r.type.childContextTypes)&&void 0!==r&&Ri();break;case 3:Za(),Ei(ji),Ei(Ii),no();break;case 5:Qa(r);break;case 4:Za();break;case 13:case 19:Ei(Xa);break;case 10:Ta(r.type._context);break;case 22:case 23:uc()}n=n.return}if(jl=e,Pl=e=Rc(e.current,null),Al=Nl=t,Ol=0,Dl=null,Fl=Ll=Ml=0,$l=zl=null,null!==Aa){for(t=0;t<Aa.length;t++)if(null!==(r=(n=Aa[t]).interleaved)){n.interleaved=null;var i=r.next,a=n.pending;if(null!==a){var o=a.next;a.next=i,r.next=o}n.pending=r}Aa=null}return e}function pc(e,t){for(;;){var n=Pl;try{if(Ca(),ro.current=Qo,co){for(var r=oo.memoizedState;null!==r;){var i=r.queue;null!==i&&(i.pending=null),r=r.next}co=!1}if(ao=0,lo=so=oo=null,uo=!1,ho=0,Cl.current=null,null===n||null===n.return){Ol=1,Dl=t,Pl=null;break}e:{var o=e,s=n.return,l=n,c=t;if(t=Al,l.flags|=32768,null!==c&&"object"===typeof c&&"function"===typeof c.then){var d=c,u=l,h=u.tag;if(0===(1&u.mode)&&(0===h||11===h||15===h)){var p=u.alternate;p?(u.updateQueue=p.updateQueue,u.memoizedState=p.memoizedState,u.lanes=p.lanes):(u.updateQueue=null,u.memoizedState=null)}var f=gs(s);if(null!==f){f.flags&=-257,bs(f,s,l,0,t),1&f.mode&&ms(o,d,t),c=d;var m=(t=f).updateQueue;if(null===m){var g=new Set;g.add(c),t.updateQueue=g}else m.add(c);break e}if(0===(1&t)){ms(o,d,t),mc();break e}c=Error(a(426))}else if(ia&&1&l.mode){var b=gs(s);if(null!==b){0===(65536&b.flags)&&(b.flags|=256),bs(b,s,l,0,t),fa(cs(c,l));break e}}o=c=cs(c,l),4!==Ol&&(Ol=2),null===zl?zl=[o]:zl.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t,Ua(o,ps(0,c,t));break e;case 1:l=c;var y=o.type,v=o.stateNode;if(0===(128&o.flags)&&("function"===typeof y.getDerivedStateFromError||null!==v&&"function"===typeof v.componentDidCatch&&(null===ql||!ql.has(v)))){o.flags|=65536,t&=-t,o.lanes|=t,Ua(o,fs(o,l,t));break e}}o=o.return}while(null!==o)}xc(n)}catch(x){t=x,Pl===n&&null!==n&&(Pl=n=n.return);continue}break}}function fc(){var e=El.current;return El.current=Qo,null===e?Qo:e}function mc(){0!==Ol&&3!==Ol&&2!==Ol||(Ol=4),null===jl||0===(268435455&Ml)&&0===(268435455&Ll)||sc(jl,Al)}function gc(e,t){var n=Il;Il|=2;var r=fc();for(jl===e&&Al===t||(Wl=null,hc(e,t));;)try{bc();break}catch(i){pc(e,i)}if(Ca(),Il=n,El.current=r,null!==Pl)throw Error(a(261));return jl=null,Al=0,Ol}function bc(){for(;null!==Pl;)vc(Pl)}function yc(){for(;null!==Pl&&!Ye();)vc(Pl)}function vc(e){var t=kl(e.alternate,e,Nl);e.memoizedProps=e.pendingProps,null===t?xc(e):Pl=t,Cl.current=null}function xc(e){var t=e;do{var n=t.alternate;if(e=t.return,0===(32768&t.flags)){if(null!==(n=Gs(n,t,Nl)))return void(Pl=n)}else{if(null!==(n=Ks(n,t)))return n.flags&=32767,void(Pl=n);if(null===e)return Ol=6,void(Pl=null);e.flags|=32768,e.subtreeFlags=0,e.deletions=null}if(null!==(t=t.sibling))return void(Pl=t);Pl=t=e}while(null!==t);0===Ol&&(Ol=5)}function wc(e,t,n){var r=vt,i=Tl.transition;try{Tl.transition=null,vt=1,function(e,t,n,r){do{_c()}while(null!==Kl);if(0!==(6&Il))throw Error(a(327));n=e.finishedWork;var i=e.finishedLanes;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(a(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(function(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-ot(n),a=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~a}}(e,o),e===jl&&(Pl=jl=null,Al=0),0===(2064&n.subtreeFlags)&&0===(2064&n.flags)||Gl||(Gl=!0,jc(tt,(function(){return _c(),null}))),o=0!==(15990&n.flags),0!==(15990&n.subtreeFlags)||o){o=Tl.transition,Tl.transition=null;var s=vt;vt=1;var l=Il;Il|=4,Cl.current=null,function(e,t){if(ei=Ht,pr(e=hr())){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch(w){n=null;break e}var s=0,l=-1,c=-1,d=0,u=0,h=e,p=null;t:for(;;){for(var f;h!==n||0!==i&&3!==h.nodeType||(l=s+i),h!==o||0!==r&&3!==h.nodeType||(c=s+r),3===h.nodeType&&(s+=h.nodeValue.length),null!==(f=h.firstChild);)p=h,h=f;for(;;){if(h===e)break t;if(p===n&&++d===i&&(l=s),p===o&&++u===r&&(c=s),null!==(f=h.nextSibling))break;p=(h=p).parentNode}h=f}n=-1===l||-1===c?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(ti={focusedElem:e,selectionRange:n},Ht=!1,Qs=t;null!==Qs;)if(e=(t=Qs).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Qs=e;else for(;null!==Qs;){t=Qs;try{var m=t.alternate;if(0!==(1024&t.flags))switch(t.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break;case 1:if(null!==m){var g=m.memoizedProps,b=m.memoizedState,y=t.stateNode,v=y.getSnapshotBeforeUpdate(t.elementType===t.type?g:ns(t.type,g),b);y.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var x=t.stateNode.containerInfo;1===x.nodeType?x.textContent="":9===x.nodeType&&x.documentElement&&x.removeChild(x.documentElement);break;default:throw Error(a(163))}}catch(w){Sc(t,t.return,w)}if(null!==(e=t.sibling)){e.return=t.return,Qs=e;break}Qs=t.return}m=tl,tl=!1}(e,n),gl(n,e),fr(ti),Ht=!!ei,ti=ei=null,e.current=n,yl(n,e,i),Ze(),Il=l,vt=s,Tl.transition=o}else e.current=n;if(Gl&&(Gl=!1,Kl=e,Yl=i),o=e.pendingLanes,0===o&&(ql=null),function(e){if(at&&"function"===typeof at.onCommitFiberRoot)try{at.onCommitFiberRoot(it,e,void 0,128===(128&e.current.flags))}catch(t){}}(n.stateNode),rc(e,Je()),null!==t)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Hl)throw Hl=!1,e=Vl,Vl=null,e;0!==(1&Yl)&&0!==e.tag&&_c(),o=e.pendingLanes,0!==(1&o)?e===Jl?Zl++:(Zl=0,Jl=e):Zl=0,Bi()}(e,t,n,r)}finally{Tl.transition=i,vt=r}return null}function _c(){if(null!==Kl){var e=xt(Yl),t=Tl.transition,n=vt;try{if(Tl.transition=null,vt=16>e?16:e,null===Kl)var r=!1;else{if(e=Kl,Kl=null,Yl=0,0!==(6&Il))throw Error(a(331));var i=Il;for(Il|=4,Qs=e.current;null!==Qs;){var o=Qs,s=o.child;if(0!==(16&Qs.flags)){var l=o.deletions;if(null!==l){for(var c=0;c<l.length;c++){var d=l[c];for(Qs=d;null!==Qs;){var u=Qs;switch(u.tag){case 0:case 11:case 15:nl(8,u,o)}var h=u.child;if(null!==h)h.return=u,Qs=h;else for(;null!==Qs;){var p=(u=Qs).sibling,f=u.return;if(al(u),u===d){Qs=null;break}if(null!==p){p.return=f,Qs=p;break}Qs=f}}}var m=o.alternate;if(null!==m){var g=m.child;if(null!==g){m.child=null;do{var b=g.sibling;g.sibling=null,g=b}while(null!==g)}}Qs=o}}if(0!==(2064&o.subtreeFlags)&&null!==s)s.return=o,Qs=s;else e:for(;null!==Qs;){if(0!==(2048&(o=Qs).flags))switch(o.tag){case 0:case 11:case 15:nl(9,o,o.return)}var y=o.sibling;if(null!==y){y.return=o.return,Qs=y;break e}Qs=o.return}}var v=e.current;for(Qs=v;null!==Qs;){var x=(s=Qs).child;if(0!==(2064&s.subtreeFlags)&&null!==x)x.return=s,Qs=x;else e:for(s=v;null!==Qs;){if(0!==(2048&(l=Qs).flags))try{switch(l.tag){case 0:case 11:case 15:rl(9,l)}}catch(_){Sc(l,l.return,_)}if(l===s){Qs=null;break e}var w=l.sibling;if(null!==w){w.return=l.return,Qs=w;break e}Qs=l.return}}if(Il=i,Bi(),at&&"function"===typeof at.onPostCommitFiberRoot)try{at.onPostCommitFiberRoot(it,e)}catch(_){}r=!0}return r}finally{vt=n,Tl.transition=t}}return!1}function kc(e,t,n){e=za(e,t=ps(0,t=cs(n,t),1),1),t=ec(),null!==e&&(bt(e,1,t),rc(e,t))}function Sc(e,t,n){if(3===e.tag)kc(e,e,n);else for(;null!==t;){if(3===t.tag){kc(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===ql||!ql.has(r))){t=za(t,e=fs(t,e=cs(n,e),1),1),e=ec(),null!==t&&(bt(t,1,e),rc(t,e));break}}t=t.return}}function Ec(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=ec(),e.pingedLanes|=e.suspendedLanes&n,jl===e&&(Al&n)===n&&(4===Ol||3===Ol&&(130023424&Al)===Al&&500>Je()-Ul?hc(e,0):Fl|=n),rc(e,t)}function Cc(e,t){0===t&&(0===(1&e.mode)?t=1:(t=dt,0===(130023424&(dt<<=1))&&(dt=4194304)));var n=ec();null!==(e=Oa(e,t))&&(bt(e,t,n),rc(e,n))}function Tc(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),Cc(e,n)}function Ic(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;null!==i&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(a(314))}null!==r&&r.delete(t),Cc(e,n)}function jc(e,t){return Ge(e,t)}function Pc(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ac(e,t,n,r){return new Pc(e,t,n,r)}function Nc(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Rc(e,t){var n=e.alternate;return null===n?((n=Ac(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=14680064&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Oc(e,t,n,r,i,o){var s=2;if(r=e,"function"===typeof e)Nc(e)&&(s=1);else if("string"===typeof e)s=5;else e:switch(e){case k:return Dc(n.children,i,o,t);case S:s=8,i|=8;break;case E:return(e=Ac(12,n,t,2|i)).elementType=E,e.lanes=o,e;case j:return(e=Ac(13,n,t,i)).elementType=j,e.lanes=o,e;case P:return(e=Ac(19,n,t,i)).elementType=P,e.lanes=o,e;case R:return Mc(n,i,o,t);default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case C:s=10;break e;case T:s=9;break e;case I:s=11;break e;case A:s=14;break e;case N:s=16,r=null;break e}throw Error(a(130,null==e?e:typeof e,""))}return(t=Ac(s,n,t,i)).elementType=e,t.type=r,t.lanes=o,t}function Dc(e,t,n,r){return(e=Ac(7,e,r,t)).lanes=n,e}function Mc(e,t,n,r){return(e=Ac(22,e,r,t)).elementType=R,e.lanes=n,e.stateNode={isHidden:!1},e}function Lc(e,t,n){return(e=Ac(6,e,null,t)).lanes=n,e}function Fc(e,t,n){return(t=Ac(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function zc(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gt(0),this.expirationTimes=gt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gt(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function $c(e,t,n,r,i,a,o,s,l){return e=new zc(e,t,n,s,l),1===t?(t=1,!0===a&&(t|=8)):t=0,a=Ac(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ma(a),e}function Uc(e){if(!e)return Ti;e:{if(Be(e=e._reactInternals)!==e||1!==e.tag)throw Error(a(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ni(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(null!==t);throw Error(a(171))}if(1===e.tag){var n=e.type;if(Ni(n))return Di(e,n,t)}return t}function Bc(e,t,n,r,i,a,o,s,l){return(e=$c(n,r,!0,e,0,a,0,s,l)).context=Uc(null),n=e.current,(a=Fa(r=ec(),i=tc(n))).callback=void 0!==t&&null!==t?t:null,za(n,a,i),e.current.lanes=i,bt(e,i,r),rc(e,r),e}function Wc(e,t,n,r){var i=t.current,a=ec(),o=tc(i);return n=Uc(n),null===t.context?t.context=n:t.pendingContext=n,(t=Fa(a,o)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),null!==(e=za(i,t,o))&&(nc(e,i,o,a),$a(e,i,o)),o}function Hc(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function Vc(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function qc(e,t){Vc(e,t),(e=e.alternate)&&Vc(e,t)}kl=function(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps||ji.current)vs=!0;else{if(0===(e.lanes&n)&&0===(128&t.flags))return vs=!1,function(e,t,n){switch(t.tag){case 3:js(t),pa();break;case 5:Ja(t);break;case 1:Ni(t.type)&&Mi(t);break;case 4:Ya(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;Ci(_a,r._currentValue),r._currentValue=i;break;case 13:if(null!==(r=t.memoizedState))return null!==r.dehydrated?(Ci(Xa,1&Xa.current),t.flags|=128,null):0!==(n&t.child.childLanes)?Ls(e,t,n):(Ci(Xa,1&Xa.current),null!==(e=Hs(e,t,n))?e.sibling:null);Ci(Xa,1&Xa.current);break;case 19:if(r=0!==(n&t.childLanes),0!==(128&e.flags)){if(r)return Bs(e,t,n);t.flags|=128}if(null!==(i=t.memoizedState)&&(i.rendering=null,i.tail=null,i.lastEffect=null),Ci(Xa,Xa.current),r)break;return null;case 22:case 23:return t.lanes=0,Ss(e,t,n)}return Hs(e,t,n)}(e,t,n);vs=0!==(131072&e.flags)}else vs=!1,ia&&0!==(1048576&t.flags)&&Xi(t,qi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ws(e,t),e=t.pendingProps;var i=Ai(t,Ii.current);ja(t,n),i=go(null,t,r,e,i,n);var o=bo();return t.flags|=1,"object"===typeof i&&null!==i&&"function"===typeof i.render&&void 0===i.$$typeof?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ni(r)?(o=!0,Mi(t)):o=!1,t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,Ma(t),i.updater=is,t.stateNode=i,i._reactInternals=t,ls(t,r,e,n),t=Is(null,t,r,!0,o,n)):(t.tag=0,ia&&o&&ea(t),xs(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ws(e,t),e=t.pendingProps,r=(i=r._init)(r._payload),t.type=r,i=t.tag=function(e){if("function"===typeof e)return Nc(e)?1:0;if(void 0!==e&&null!==e){if((e=e.$$typeof)===I)return 11;if(e===A)return 14}return 2}(r),e=ns(r,e),i){case 0:t=Cs(null,t,r,e,n);break e;case 1:t=Ts(null,t,r,e,n);break e;case 11:t=ws(null,t,r,e,n);break e;case 14:t=_s(null,t,r,ns(r.type,e),n);break e}throw Error(a(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,Cs(e,t,r,i=t.elementType===r?i:ns(r,i),n);case 1:return r=t.type,i=t.pendingProps,Ts(e,t,r,i=t.elementType===r?i:ns(r,i),n);case 3:e:{if(js(t),null===e)throw Error(a(387));r=t.pendingProps,i=(o=t.memoizedState).element,La(e,t),Ba(t,r,null,n);var s=t.memoizedState;if(r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,256&t.flags){t=Ps(e,t,r,n,i=cs(Error(a(423)),t));break e}if(r!==i){t=Ps(e,t,r,n,i=cs(Error(a(424)),t));break e}for(ra=ci(t.stateNode.containerInfo.firstChild),na=t,ia=!0,aa=null,n=wa(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(pa(),r===i){t=Hs(e,t,n);break e}xs(e,t,r,n)}t=t.child}return t;case 5:return Ja(t),null===e&&ca(t),r=t.type,i=t.pendingProps,o=null!==e?e.memoizedProps:null,s=i.children,ni(r,i)?s=null:null!==o&&ni(r,o)&&(t.flags|=32),Es(e,t),xs(e,t,s,n),t.child;case 6:return null===e&&ca(t),null;case 13:return Ls(e,t,n);case 4:return Ya(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=xa(t,null,r,n):xs(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,ws(e,t,r,i=t.elementType===r?i:ns(r,i),n);case 7:return xs(e,t,t.pendingProps,n),t.child;case 8:case 12:return xs(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,s=i.value,Ci(_a,r._currentValue),r._currentValue=s,null!==o)if(sr(o.value,s)){if(o.children===i.children&&!ji.current){t=Hs(e,t,n);break e}}else for(null!==(o=t.child)&&(o.return=t);null!==o;){var l=o.dependencies;if(null!==l){s=o.child;for(var c=l.firstContext;null!==c;){if(c.context===r){if(1===o.tag){(c=Fa(-1,n&-n)).tag=2;var d=o.updateQueue;if(null!==d){var u=(d=d.shared).pending;null===u?c.next=c:(c.next=u.next,u.next=c),d.pending=c}}o.lanes|=n,null!==(c=o.alternate)&&(c.lanes|=n),Ia(o.return,n,t),l.lanes|=n;break}c=c.next}}else if(10===o.tag)s=o.type===t.type?null:o.child;else if(18===o.tag){if(null===(s=o.return))throw Error(a(341));s.lanes|=n,null!==(l=s.alternate)&&(l.lanes|=n),Ia(s,n,t),s=o.sibling}else s=o.child;if(null!==s)s.return=o;else for(s=o;null!==s;){if(s===t){s=null;break}if(null!==(o=s.sibling)){o.return=s.return,s=o;break}s=s.return}o=s}xs(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,ja(t,n),r=r(i=Pa(i)),t.flags|=1,xs(e,t,r,n),t.child;case 14:return i=ns(r=t.type,t.pendingProps),_s(e,t,r,i=ns(r.type,i),n);case 15:return ks(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:ns(r,i),Ws(e,t),t.tag=1,Ni(r)?(e=!0,Mi(t)):e=!1,ja(t,n),os(t,r,i),ls(t,r,i,n),Is(null,t,r,!0,e,n);case 19:return Bs(e,t,n);case 22:return Ss(e,t,n)}throw Error(a(156,t.tag))};var Gc="function"===typeof reportError?reportError:function(e){console.error(e)};function Kc(e){this._internalRoot=e}function Yc(e){this._internalRoot=e}function Zc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function Jc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function Qc(){}function Xc(e,t,n,r,i){var a=n._reactRootContainer;if(a){var o=a;if("function"===typeof i){var s=i;i=function(){var e=Hc(o);s.call(e)}}Wc(t,o,e,i)}else o=function(e,t,n,r,i){if(i){if("function"===typeof r){var a=r;r=function(){var e=Hc(o);a.call(e)}}var o=Bc(t,r,e,0,null,!1,0,"",Qc);return e._reactRootContainer=o,e[fi]=o.current,Br(8===e.nodeType?e.parentNode:e),dc(),o}for(;i=e.lastChild;)e.removeChild(i);if("function"===typeof r){var s=r;r=function(){var e=Hc(l);s.call(e)}}var l=$c(e,0,!1,null,0,!1,0,"",Qc);return e._reactRootContainer=l,e[fi]=l.current,Br(8===e.nodeType?e.parentNode:e),dc((function(){Wc(t,l,n,r)})),l}(n,t,e,i,r);return Hc(o)}Yc.prototype.render=Kc.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(a(409));Wc(e,t,null,null)},Yc.prototype.unmount=Kc.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;dc((function(){Wc(null,e,null,null)})),t[fi]=null}},Yc.prototype.unstable_scheduleHydration=function(e){if(e){var t=St();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Rt.length&&0!==t&&t<Rt[n].priority;n++);Rt.splice(n,0,e),0===n&&Lt(e)}},wt=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=ut(t.pendingLanes);0!==n&&(yt(t,1|n),rc(t,Je()),0===(6&Il)&&(Bl=Je()+500,Bi()))}break;case 13:dc((function(){var t=Oa(e,1);if(null!==t){var n=ec();nc(t,e,1,n)}})),qc(e,1)}},_t=function(e){if(13===e.tag){var t=Oa(e,134217728);if(null!==t)nc(t,e,134217728,ec());qc(e,134217728)}},kt=function(e){if(13===e.tag){var t=tc(e),n=Oa(e,t);if(null!==n)nc(n,e,t,ec());qc(e,t)}},St=function(){return vt},Et=function(e,t){var n=vt;try{return vt=e,t()}finally{vt=n}},_e=function(e,t,n){switch(t){case"input":if(Q(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=wi(r);if(!i)throw Error(a(90));G(r),Q(r,i)}}}break;case"textarea":ae(e,n);break;case"select":null!=(t=n.value)&&ne(e,!!n.multiple,t,!1)}},Ie=cc,je=dc;var ed={usingClientEntryPoint:!1,Events:[vi,xi,wi,Ce,Te,cc]},td={findFiberByHostInstance:yi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},nd={bundleType:td.bundleType,version:td.version,rendererPackageName:td.rendererPackageName,rendererConfig:td.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:x.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Ve(e))?null:e.stateNode},findFiberByHostInstance:td.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var rd=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!rd.isDisabled&&rd.supportsFiber)try{it=rd.inject(nd),at=rd}catch(de){}}t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ed,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Zc(t))throw Error(a(200));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:_,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.createRoot=function(e,t){if(!Zc(e))throw Error(a(299));var n=!1,r="",i=Gc;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onRecoverableError&&(i=t.onRecoverableError)),t=$c(e,1,!1,null,0,n,0,r,i),e[fi]=t.current,Br(8===e.nodeType?e.parentNode:e),new Kc(t)},t.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(a(188));throw e=Object.keys(e).join(","),Error(a(268,e))}return e=null===(e=Ve(t))?null:e.stateNode},t.flushSync=function(e){return dc(e)},t.hydrate=function(e,t,n){if(!Jc(t))throw Error(a(200));return Xc(null,e,t,!0,n)},t.hydrateRoot=function(e,t,n){if(!Zc(e))throw Error(a(405));var r=null!=n&&n.hydratedSources||null,i=!1,o="",s=Gc;if(null!==n&&void 0!==n&&(!0===n.unstable_strictMode&&(i=!0),void 0!==n.identifierPrefix&&(o=n.identifierPrefix),void 0!==n.onRecoverableError&&(s=n.onRecoverableError)),t=Bc(t,null,e,1,null!=n?n:null,i,0,o,s),e[fi]=t.current,Br(e),r)for(e=0;e<r.length;e++)i=(i=(n=r[e])._getVersion)(n._source),null==t.mutableSourceEagerHydrationData?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Yc(t)},t.render=function(e,t,n){if(!Jc(t))throw Error(a(200));return Xc(null,e,t,!1,n)},t.unmountComponentAtNode=function(e){if(!Jc(e))throw Error(a(40));return!!e._reactRootContainer&&(dc((function(){Xc(null,null,e,!1,(function(){e._reactRootContainer=null,e[fi]=null}))})),!0)},t.unstable_batchedUpdates=cc,t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Jc(n))throw Error(a(200));if(null==e||void 0===e._reactInternals)throw Error(a(38));return Xc(e,t,n,!1,r)},t.version="18.3.1-next-f1338f8080-20240426"},776:(e,t,n)=>{"use strict";n.d(t,{cY:()=>x,FA:()=>R,g:()=>N,gz:()=>Y,dM:()=>A,vA:()=>i,Hk:()=>a,K3:()=>s,u:()=>u,KA:()=>c,Uj:()=>d,gR:()=>$,Fy:()=>w,tD:()=>Z,A4:()=>h,bD:()=>H,dI:()=>X,hp:()=>K,T9:()=>y,Tj:()=>g,yU:()=>b,XA:()=>v,Ku:()=>ne,ZQ:()=>_,qc:()=>z,sr:()=>E,zJ:()=>re,c1:()=>S,Im:()=>B,lT:()=>T,zW:()=>j,jZ:()=>k,$g:()=>I,lV:()=>C,Cv:()=>F,$L:()=>D,kH:()=>W,gE:()=>ie,Am:()=>q,I9:()=>G,yw:()=>U,OE:()=>te,kj:()=>ee,As:()=>M,eX:()=>P});const r={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},i=function(e,t){if(!e)throw a(t)},a=function(e){return new Error("Firebase Database ("+r.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)},o=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296===(64512&i)&&r+1<e.length&&56320===(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},s={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],a=i+1<e.length,o=a?e[i+1]:0,s=i+2<e.length,l=s?e[i+2]:0,c=t>>2,d=(3&t)<<4|o>>4;let u=(15&o)<<2|l>>6,h=63&l;s||(h=64,a||(u=64)),r.push(n[c],n[d],n[u],n[h])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(o(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const a=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&a)}else if(i>239&&i<365){const a=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(a>>10)),t[r++]=String.fromCharCode(56320+(1023&a))}else{const a=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&a)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0;++i;const o=i<e.length?n[e.charAt(i)]:64;++i;const s=i<e.length?n[e.charAt(i)]:64;if(++i,null==t||null==a||null==o||null==s)throw new l;const c=t<<2|a>>4;if(r.push(c),64!==o){const e=a<<4&240|o>>2;if(r.push(e),64!==s){const e=o<<6&192|s;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class l extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const c=function(e){const t=o(e);return s.encodeByteArray(t,!0)},d=function(e){return c(e).replace(/\./g,"")},u=function(e){try{return s.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function h(e){return p(void 0,e)}function p(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&"__proto__"!==n&&(e[n]=p(e[n],t[n]));return e}const f=()=>function(){if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof n.g)return n.g;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,m=()=>{try{return f()||(()=>{if("undefined"===typeof process)return;const e={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"===typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&u(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},g=e=>m()?.emulatorHosts?.[e],b=e=>{const t=g(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},y=()=>m()?.config,v=e=>m()?.[`_${e}`];class x{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"===typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}function w(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...e};return[d(JSON.stringify({alg:"none",type:"JWT"})),d(JSON.stringify(a)),""].join(".")}function _(){return"undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:""}function k(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_())}function S(){return"undefined"!==typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function E(){const e="object"===typeof chrome?chrome.runtime:"object"===typeof browser?browser.runtime:void 0;return"object"===typeof e&&void 0!==e.id}function C(){return"object"===typeof navigator&&"ReactNative"===navigator.product}function T(){const e=_();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function I(){return!0===r.NODE_CLIENT||!0===r.NODE_ADMIN}function j(){try{return"object"===typeof indexedDB}catch(e){return!1}}function P(){return new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(n){t(n)}}))}function A(){return!("undefined"===typeof navigator||!navigator.cookieEnabled)}class N extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,N.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,R.prototype.create)}}class R{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e){const t=(arguments.length<=1?void 0:arguments[1])||{},n=`${this.service}/${e}`,r=this.errors[e],i=r?function(e,t){return e.replace(O,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(r,t):"Error",a=`${this.serviceName}: ${i} (${n}).`;return new N(n,a,t)}}const O=/\{\$([^}]+)}/g;function D(e){return JSON.parse(e)}function M(e){return JSON.stringify(e)}const L=function(e){let t={},n={},r={},i="";try{const a=e.split(".");t=D(u(a[0])||""),n=D(u(a[1])||""),i=a[2],r=n.d||{},delete n.d}catch(a){}return{header:t,claims:n,data:r,signature:i}},F=function(e){const t=L(e).claims;return!!t&&"object"===typeof t&&t.hasOwnProperty("iat")},z=function(e){const t=L(e).claims;return"object"===typeof t&&!0===t.admin};function $(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function U(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function B(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function W(e,t,n){const r={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}function H(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],a=t[i];if(V(n)&&V(a)){if(!H(n,a))return!1}else if(n!==a)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function V(e){return null!==e&&"object"===typeof e}function q(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function G(e){const t={};return e.replace(/^\?/,"").split("&").forEach((e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}})),t}function K(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class Y{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if("string"===typeof e)for(let d=0;d<16;d++)n[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)n[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const e=n[d-3]^n[d-8]^n[d-14]^n[d-16];n[d]=4294967295&(e<<1|e>>>31)}let r,i,a=this.chain_[0],o=this.chain_[1],s=this.chain_[2],l=this.chain_[3],c=this.chain_[4];for(let d=0;d<80;d++){d<40?d<20?(r=l^o&(s^l),i=1518500249):(r=o^s^l,i=1859775393):d<60?(r=o&s|l&(o|s),i=2400959708):(r=o^s^l,i=3395469782);const e=(a<<5|a>>>27)+r+c+i+n[d]&4294967295;c=l,l=s,s=4294967295&(o<<30|o>>>2),o=a,a=e}this.chain_[0]=this.chain_[0]+a&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+s&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);const n=t-this.blockSize;let r=0;const i=this.buf_;let a=this.inbuf_;for(;r<t;){if(0===a)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if("string"===typeof e){for(;r<t;)if(i[a]=e.charCodeAt(r),++a,++r,a===this.blockSize){this.compress_(i),a=0;break}}else for(;r<t;)if(i[a]=e[r],++a,++r,a===this.blockSize){this.compress_(i),a=0;break}}this.inbuf_=a,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let r=0;r<5;r++)for(let t=24;t>=0;t-=8)e[n]=this.chain_[r]>>t&255,++n;return e}}function Z(e,t){const n=new J(e,t);return n.subscribe.bind(n)}class J{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((()=>{e(this)})).catch((e=>{this.error(e)}))}next(e){this.forEachObserver((t=>{t.next(e)}))}error(e){this.forEachObserver((t=>{t.error(e)})),this.close(e)}complete(){this.forEachObserver((e=>{e.complete()})),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=function(e,t){if("object"!==typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"===typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=Q),void 0===r.error&&(r.error=Q),void 0===r.complete&&(r.complete=Q);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}})),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then((()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!==typeof console&&console.error&&console.error(n)}}))}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((()=>{this.observers=void 0,this.onNoObservers=void 0})))}}function Q(){}function X(e,t){return`${e} failed: ${t} argument `}const ee=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let a=e.charCodeAt(r);if(a>=55296&&a<=56319){const t=a-55296;r++,i(r<e.length,"Surrogate pair missing trail surrogate.");a=65536+(t<<10)+(e.charCodeAt(r)-56320)}a<128?t[n++]=a:a<2048?(t[n++]=a>>6|192,t[n++]=63&a|128):a<65536?(t[n++]=a>>12|224,t[n++]=a>>6&63|128,t[n++]=63&a|128):(t[n++]=a>>18|240,t[n++]=a>>12&63|128,t[n++]=a>>6&63|128,t[n++]=63&a|128)}return t},te=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};function ne(e){return e&&e._delegate?e._delegate:e}function re(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ie(e){return(await fetch(e,{credentials:"include"})).ok}},799:(e,t,n)=>{"use strict";n.d(t,{MR:()=>b,P2:()=>g});const r=(e,t)=>t.some((t=>e instanceof t));let i,a;const o=new WeakMap,s=new WeakMap,l=new WeakMap,c=new WeakMap,d=new WeakMap;let u={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return s.get(e);if("objectStoreNames"===t)return e.objectStoreNames||l.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return f(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function h(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(a||(a=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return e.apply(m(this),n),f(o.get(this))}:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return f(e.apply(m(this),n))}:function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];const a=e.call(m(this),t,...r);return l.set(a,t.sort?t.sort():[t]),f(a)}}function p(e){return"function"===typeof e?h(e):(e instanceof IDBTransaction&&function(e){if(s.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",a),e.removeEventListener("abort",a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",a),e.addEventListener("abort",a)}));s.set(e,t)}(e),r(e,i||(i=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(e,u):e)}function f(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",a)},i=()=>{t(f(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",a)}));return t.then((t=>{t instanceof IDBCursor&&o.set(t,e)})).catch((()=>{})),d.set(t,e),t}(e);if(c.has(e))return c.get(e);const t=p(e);return t!==e&&(c.set(e,t),d.set(t,e)),t}const m=e=>d.get(e);function g(e,t){let{blocked:n,upgrade:r,blocking:i,terminated:a}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const o=indexedDB.open(e,t),s=f(o);return r&&o.addEventListener("upgradeneeded",(e=>{r(f(o.result),e.oldVersion,e.newVersion,f(o.transaction),e)})),n&&o.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),s.then((e=>{a&&e.addEventListener("close",(()=>a())),i&&e.addEventListener("versionchange",(e=>i(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),s}function b(e){let{blocked:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",(e=>t(e.oldVersion,e))),f(n).then((()=>{}))}const y=["get","getKey","getAll","getAllKeys","count"],v=["put","add","delete","clear"],x=new Map;function w(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(x.get(t))return x.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=v.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!y.includes(n))return;const a=async function(e){const t=this.transaction(e,i?"readwrite":"readonly");let a=t.store;for(var o=arguments.length,s=new Array(o>1?o-1:0),l=1;l<o;l++)s[l-1]=arguments[l];return r&&(a=a.index(s.shift())),(await Promise.all([a[n](...s),i&&t.done]))[0]};return x.set(t,a),a}u=(e=>({...e,get:(t,n,r)=>w(t,n)||e.get(t,n,r),has:(t,n)=>!!w(t,n)||e.has(t,n)}))(u)},800:(e,t,n)=>{"use strict";n.d(t,{jf:()=>Li,get:()=>Wi,C3:()=>aa,$1:()=>Ji,AU:()=>Ki,yX:()=>Fi,Zy:()=>Gi,kT:()=>Xi,VC:()=>zi,P:()=>ea,ref:()=>Mi,TF:()=>$i,c4:()=>ca,O5:()=>sa,hZ:()=>Ui,yo:()=>Bi});var r=n(150),i=n(606),a=n(776),o=n(965);const s="@firebase/database",l="1.1.2";let c="";function d(e){c=e}class u{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){null==t?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),(0,a.As)(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return null==t?null:(0,a.$L)(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}class h{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){null==t?delete this.cache_[e]:this.cache_[e]=t}get(e){return(0,a.gR)(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}const p=function(e){try{if("undefined"!==typeof window&&"undefined"!==typeof window[e]){const t=window[e];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new u(t)}}catch(t){}return new h},f=p("localStorage"),m=p("sessionStorage"),g=new o.Vy("@firebase/database"),b=function(){let e=1;return function(){return e++}}(),y=function(e){const t=(0,a.kj)(e),n=new a.gz;n.update(t);const r=n.digest();return a.K3.encodeByteArray(r)},v=function(){let e="";for(let t=0;t<arguments.length;t++){const n=t<0||arguments.length<=t?void 0:arguments[t];Array.isArray(n)||n&&"object"===typeof n&&"number"===typeof n.length?e+=v.apply(null,n):e+="object"===typeof n?(0,a.As)(n):n,e+=" "}return e};let x=null,w=!0;const _=function(e,t){(0,a.vA)(!t||!0===e||!1===e,"Can't turn on custom loggers persistently."),!0===e?(g.logLevel=o.$b.VERBOSE,x=g.log.bind(g),t&&m.set("logging_enabled",!0)):"function"===typeof e?x=e:(x=null,m.remove("logging_enabled"))},k=function(){if(!0===w&&(w=!1,null===x&&!0===m.get("logging_enabled")&&_(!0)),x){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];const r=v.apply(null,t);x(r)}},S=function(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];k(e,...n)}},E=function(){const e="FIREBASE INTERNAL ERROR: "+v(...arguments);g.error(e)},C=function(){const e=`FIREBASE FATAL ERROR: ${v(...arguments)}`;throw g.error(e),new Error(e)},T=function(){const e="FIREBASE WARNING: "+v(...arguments);g.warn(e)},I=function(e){return"number"===typeof e&&(e!==e||e===Number.POSITIVE_INFINITY||e===Number.NEGATIVE_INFINITY)},j="[MIN_NAME]",P="[MAX_NAME]",A=function(e,t){if(e===t)return 0;if(e===j||t===P)return-1;if(t===j||e===P)return 1;{const n=z(e),r=z(t);return null!==n?null!==r?n-r===0?e.length-t.length:n-r:-1:null!==r?1:e<t?-1:1}},N=function(e,t){return e===t?0:e<t?-1:1},R=function(e,t){if(t&&e in t)return t[e];throw new Error("Missing required key ("+e+") in object: "+(0,a.As)(t))},O=function(e){if("object"!==typeof e||null===e)return(0,a.As)(e);const t=[];for(const r in e)t.push(r);t.sort();let n="{";for(let r=0;r<t.length;r++)0!==r&&(n+=","),n+=(0,a.As)(t[r]),n+=":",n+=O(e[t[r]]);return n+="}",n},D=function(e,t){const n=e.length;if(n<=t)return[e];const r=[];for(let i=0;i<n;i+=t)i+t>n?r.push(e.substring(i,n)):r.push(e.substring(i,i+t));return r};function M(e,t){for(const n in e)e.hasOwnProperty(n)&&t(n,e[n])}const L=function(e){(0,a.vA)(!I(e),"Invalid JSON number");const t=1023;let n,r,i,o,s;0===e?(r=0,i=0,n=1/e===-1/0?1:0):(n=e<0,(e=Math.abs(e))>=Math.pow(2,-1022)?(o=Math.min(Math.floor(Math.log(e)/Math.LN2),t),r=o+t,i=Math.round(e*Math.pow(2,52-o)-Math.pow(2,52))):(r=0,i=Math.round(e/Math.pow(2,-1074))));const l=[];for(s=52;s;s-=1)l.push(i%2?1:0),i=Math.floor(i/2);for(s=11;s;s-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(n?1:0),l.reverse();const c=l.join("");let d="";for(s=0;s<64;s+=8){let e=parseInt(c.substr(s,8),2).toString(16);1===e.length&&(e="0"+e),d+=e}return d.toLowerCase()};const F=new RegExp("^-?(0*)\\d{1,10}$"),z=function(e){if(F.test(e)){const t=Number(e);if(t>=-2147483648&&t<=2147483647)return t}return null},$=function(e){try{e()}catch(t){setTimeout((()=>{const e=t.stack||"";throw T("Exception was thrown by user callback.",e),t}),Math.floor(0))}},U=function(e,t){const n=setTimeout(e,t);return"number"===typeof n&&"undefined"!==typeof Deno&&Deno.unrefTimer?Deno.unrefTimer(n):"object"===typeof n&&n.unref&&n.unref(),n};class B{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,(0,r.xZ)(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then((e=>this.appCheck=e))}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise(((t,n)=>{setTimeout((()=>{this.appCheck?this.getToken(e).then(t,n):t(null)}),0)}))}addTokenChangeListener(e){this.appCheckProvider?.get().then((t=>t.addTokenListener(e)))}notifyForInvalidToken(){T(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}class W{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit((e=>this.auth_=e))}getToken(e){return this.auth_?this.auth_.getToken(e).catch((e=>e&&"auth/token-not-initialized"===e.code?(k("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e))):new Promise(((t,n)=>{setTimeout((()=>{this.auth_?this.getToken(e).then(t,n):t(null)}),0)}))}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then((t=>t.addAuthTokenListener(e)))}removeTokenChangeListener(e){this.authProvider_.get().then((t=>t.removeAuthTokenListener(e)))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',T(e)}}class H{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}H.OWNER="owner";const V="5",q=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,G="ac",K="websocket",Y="long_polling";class Z{constructor(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"",o=arguments.length>6&&void 0!==arguments[6]&&arguments[6],s=arguments.length>7&&void 0!==arguments[7]&&arguments[7],l=arguments.length>8&&void 0!==arguments[8]?arguments[8]:null;this.secure=t,this.namespace=n,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=a,this.includeNamespaceInQueryParams=o,this.isUsingEmulator=s,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=f.get("host:"+e)||this._host}isCacheableHost(){return"s-"===this.internalHost.substr(0,2)}isCustomHost(){return"firebaseio.com"!==this._domain&&"firebaseio-demo.com"!==this._domain}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&f.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function J(e,t,n){let r;if((0,a.vA)("string"===typeof t,"typeof type must == string"),(0,a.vA)("object"===typeof n,"typeof params must == object"),t===K)r=(e.secure?"wss://":"ws://")+e.internalHost+"/.ws?";else{if(t!==Y)throw new Error("Unknown connection type: "+t);r=(e.secure?"https://":"http://")+e.internalHost+"/.lp?"}(function(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams})(e)&&(n.ns=e.namespace);const i=[];return M(n,((e,t)=>{i.push(e+"="+t)})),r+i.join("&")}class Q{constructor(){this.counters_={}}incrementCounter(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;(0,a.gR)(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return(0,a.A4)(this.counters_)}}const X={},ee={};function te(e){const t=e.toString();return X[t]||(X[t]=new Q),X[t]}class ne{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const e=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let t=0;t<e.length;++t)e[t]&&$((()=>{this.onMessage_(e[t])}));if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}const re="start";class ie{constructor(e,t,n,r,i,a,o){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.transportSessionId=a,this.lastSessionId=o,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=S(e),this.stats_=te(t),this.urlFn=e=>(this.appCheckToken&&(e[G]=this.appCheckToken),J(t,Y,e))}open(e,t){var n=this;this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new ne(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout((()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null}),Math.floor(3e4)),function(e){if((0,a.$g)()||"complete"===document.readyState)e();else{let t=!1;const n=function(){document.body?t||(t=!0,e()):setTimeout(n,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",(()=>{"complete"===document.readyState&&n()})),window.attachEvent("onload",n))}}((()=>{if(this.isClosed_)return;this.scriptTagHolder=new ae((function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];const[i,a,o,s,l]=t;if(n.incrementIncomingBytes_(t),n.scriptTagHolder)if(n.connectTimeoutTimer_&&(clearTimeout(n.connectTimeoutTimer_),n.connectTimeoutTimer_=null),n.everConnected_=!0,i===re)n.id=a,n.password=o;else{if("close"!==i)throw new Error("Unrecognized command received: "+i);a?(n.scriptTagHolder.sendNewPolls=!1,n.myPacketOrderer.closeAfter(a,(()=>{n.onClosed_()}))):n.onClosed_()}}),(function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];const[i,a]=t;n.incrementIncomingBytes_(t),n.myPacketOrderer.handleResponse(i,a)}),(()=>{this.onClosed_()}),this.urlFn);const e={};e[re]="t",e.ser=Math.floor(1e8*Math.random()),this.scriptTagHolder.uniqueCallbackIdentifier&&(e.cb=this.scriptTagHolder.uniqueCallbackIdentifier),e.v=V,this.transportSessionId&&(e.s=this.transportSessionId),this.lastSessionId&&(e.ls=this.lastSessionId),this.applicationId&&(e.p=this.applicationId),this.appCheckToken&&(e[G]=this.appCheckToken),"undefined"!==typeof location&&location.hostname&&q.test(location.hostname)&&(e.r="f");const t=this.urlFn(e);this.log_("Connecting via long-poll to "+t),this.scriptTagHolder.addTag(t,(()=>{}))}))}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ie.forceAllow_=!0}static forceDisallow(){ie.forceDisallow_=!0}static isAvailable(){return!(0,a.$g)()&&(!!ie.forceAllow_||!ie.forceDisallow_&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.UI))}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=(0,a.As)(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=(0,a.KA)(t),r=D(n,1840);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,t){if((0,a.$g)())return;this.myDisconnFrame=document.createElement("iframe");const n={dframe:"t"};n.id=e,n.pw=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=(0,a.As)(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ae{constructor(e,t,n,r){if(this.onDisconnect=n,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(1e8*Math.random()),this.sendNewPolls=!0,(0,a.$g)())this.commandCB=e,this.onMessageCB=t;else{this.uniqueCallbackIdentifier=b(),window["pLPCommand"+this.uniqueCallbackIdentifier]=e,window["pRTLPCB"+this.uniqueCallbackIdentifier]=t,this.myIFrame=ae.createIFrame_();let n="";if(this.myIFrame.src&&"javascript:"===this.myIFrame.src.substr(0,11)){n='<script>document.domain="'+document.domain+'";<\/script>'}const r="<html><body>"+n+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(r),this.myIFrame.doc.close()}catch(i){k("frame writing exception"),i.stack&&k(i.stack),k(i)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",!document.body)throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";document.body.appendChild(e);try{e.contentWindow.document||k("No IE domain setting required")}catch(t){const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout((()=>{null!==this.myIFrame&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)}),Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e.id=this.myID,e.pw=this.myPW,e.ser=this.currentSerial;let t=this.urlFn(e),n="",r=0;for(;this.pendingSegs.length>0;){if(!(this.pendingSegs[0].d.length+30+n.length<=1870))break;{const e=this.pendingSegs.shift();n=n+"&seg"+r+"="+e.seg+"&ts"+r+"="+e.ts+"&d"+r+"="+e.d,r++}}return t+=n,this.addLongPollTag_(t,this.currentSerial),!0}return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},r=setTimeout(n,Math.floor(25e3));this.addTag(e,(()=>{clearTimeout(r),n()}))}addTag(e,t){(0,a.$g)()?this.doNodeLongPoll(e,t):setTimeout((()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const e=n.readyState;e&&"loaded"!==e&&"complete"!==e||(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{k("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch(n){}}),Math.floor(1))}}let oe=null;"undefined"!==typeof MozWebSocket?oe=MozWebSocket:"undefined"!==typeof WebSocket&&(oe=WebSocket);class se{constructor(e,t,n,r,i,a,o){this.connId=e,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=S(this.connId),this.stats_=te(t),this.connURL=se.connectionURL_(t,a,o,r,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,r,i){const o={};return o.v=V,!(0,a.$g)()&&"undefined"!==typeof location&&location.hostname&&q.test(location.hostname)&&(o.r="f"),t&&(o.s=t),n&&(o.ls=n),r&&(o[G]=r),i&&(o.p=i),J(e,K,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,f.set("previous_websocket_failure",!0);try{let e;if((0,a.$g)()){const t=this.nodeAdmin?"AdminNode":"Node";e={headers:{"User-Agent":`Firebase/${V}/${c}/${process.platform}/${t}`,"X-Firebase-GMPID":this.applicationId||""}},this.authToken&&(e.headers.Authorization=`Bearer ${this.authToken}`),this.appCheckToken&&(e.headers["X-Firebase-AppCheck"]=this.appCheckToken);const n={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""},r=0===this.connURL.indexOf("wss://")?n.HTTPS_PROXY||n.https_proxy:n.HTTP_PROXY||n.http_proxy;r&&(e.proxy={origin:r})}this.mySock=new oe(this.connURL,[],e)}catch(n){this.log_("Error instantiating WebSocket.");const e=n.message||n.data;return e&&this.log_(e),void this.onClosed_()}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=e=>{this.handleIncomingFrame(e)},this.mySock.onerror=e=>{this.log_("WebSocket error.  Closing connection.");const t=e.message||e.data;t&&this.log_(t),this.onClosed_()}}start(){}static forceDisallow(){se.forceDisallow_=!0}static isAvailable(){let e=!1;if("undefined"!==typeof navigator&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&null!==oe&&!se.forceDisallow_}static previouslyFailed(){return f.isInMemoryStorage||!0===f.get("previous_websocket_failure")}markConnectionHealthy(){f.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const e=this.frames.join("");this.frames=null;const t=(0,a.$L)(e);this.onMessage(t)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if((0,a.vA)(null===this.frames,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(null===this.mySock)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),null!==this.frames)this.appendFrame_(t);else{const e=this.extractFrameCount_(t);null!==e&&this.appendFrame_(e)}}send(e){this.resetKeepAlive();const t=(0,a.As)(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=D(t,16384);n.length>1&&this.sendString_(String(n.length));for(let r=0;r<n.length;r++)this.sendString_(n[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval((()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()}),Math.floor(45e3))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}se.responsesRequiredToBeHealthy=2,se.healthyTimeout=3e4;class le{static get ALL_TRANSPORTS(){return[ie,se]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=se&&se.isAvailable();let n=t&&!se.previouslyFailed();if(e.webSocketOnly&&(t||T("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[se];else{const e=this.transports_=[];for(const t of le.ALL_TRANSPORTS)t&&t.isAvailable()&&e.push(t);le.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}le.globalTransportInitialized_=!1;class ce{constructor(e,t,n,r,i,a,o,s,l,c){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=a,this.onReady_=o,this.onDisconnect_=s,this.onKill_=l,this.lastSessionId=c,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=S("c:"+this.id+":"),this.transportManager_=new le(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout((()=>{this.conn_&&this.conn_.open(t,n)}),Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=U((()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>102400?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>10240?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))}),Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{2!==this.state_&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if("t"in e){const t=e.t;"a"===t?this.upgradeIfSecondaryHealthy_():"r"===t?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),this.tx_!==this.secondaryConn_&&this.rx_!==this.secondaryConn_||this.close()):"o"===t&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=R("t",e),n=R("d",e);if("c"===t)this.onSecondaryControl_(n);else{if("d"!==t)throw new Error("Unknown protocol layer: "+t);this.pendingDataMessages.push(n)}}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:"p",d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:"a",d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:"n",d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=R("t",e),n=R("d",e);"c"===t?this.onControl_(n):"d"===t&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=R("t",e);if("d"in e){const n=e.d;if("h"===t){const e={...n};this.repoInfo_.isUsingEmulator&&(e.h=this.repoInfo_.host),this.onHandshake_(e)}else if("n"===t){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let e=0;e<this.pendingDataMessages.length;++e)this.onDataMessage_(this.pendingDataMessages[e]);this.pendingDataMessages=[],this.tryCleanupConnection()}else"s"===t?this.onConnectionShutdown_(n):"r"===t?this.onReset_(n):"e"===t?E("Server Error: "+n):"o"===t?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):E("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,0===this.state_&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),V!==n&&T("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),U((()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())}),Math.floor(6e4))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,1===this.state_?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),0===this.primaryResponsesRequired_?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):U((()=>{this.sendPingOnPrimaryIfNecessary_()}),Math.floor(5e3))}sendPingOnPrimaryIfNecessary_(){this.isHealthy_||1!==this.state_||(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:"p",d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,this.tx_!==e&&this.rx_!==e||this.close()}onConnectionLost_(e){this.conn_=null,e||0!==this.state_?1===this.state_&&this.log_("Realtime connection lost."):(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(f.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(1!==this.state_)throw"Connection is not connected";this.tx_.send(e)}close(){2!==this.state_&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}class de{put(e,t,n,r){}merge(e,t,n,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}class ue{constructor(e){this.allowedEvents_=e,this.listeners_={},(0,a.vA)(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(let e=0;e<i.length;e++)i[e].callback.apply(i[e].context,n)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const r=this.getInitialEvent(e);r&&t.apply(n,r)}off(e,t,n){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===t&&(!n||n===r[i].context))return void r.splice(i,1)}validateEventType_(e){(0,a.vA)(this.allowedEvents_.find((t=>t===e)),"Unknown event: "+e)}}class he extends ue{static getInstance(){return new he}constructor(){super(["online"]),this.online_=!0,"undefined"===typeof window||"undefined"===typeof window.addEventListener||(0,a.jZ)()||(window.addEventListener("online",(()=>{this.online_||(this.online_=!0,this.trigger("online",!0))}),!1),window.addEventListener("offline",(()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))}),!1))}getInitialEvent(e){return(0,a.vA)("online"===e,"Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}class pe{constructor(e,t){if(void 0===t){this.pieces_=e.split("/");let t=0;for(let e=0;e<this.pieces_.length;e++)this.pieces_[e].length>0&&(this.pieces_[t]=this.pieces_[e],t++);this.pieces_.length=t,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)""!==this.pieces_[t]&&(e+="/"+this.pieces_[t]);return e||"/"}}function fe(){return new pe("")}function me(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function ge(e){return e.pieces_.length-e.pieceNum_}function be(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new pe(e.pieces_,t)}function ye(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function ve(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.pieces_.slice(e.pieceNum_+t)}function xe(e){if(e.pieceNum_>=e.pieces_.length)return null;const t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new pe(t,0)}function we(e,t){const n=[];for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);if(t instanceof pe)for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);else{const e=t.split("/");for(let t=0;t<e.length;t++)e[t].length>0&&n.push(e[t])}return new pe(n,0)}function _e(e){return e.pieceNum_>=e.pieces_.length}function ke(e,t){const n=me(e),r=me(t);if(null===n)return t;if(n===r)return ke(be(e),be(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+e+")")}function Se(e,t){const n=ve(e,0),r=ve(t,0);for(let i=0;i<n.length&&i<r.length;i++){const e=A(n[i],r[i]);if(0!==e)return e}return n.length===r.length?0:n.length<r.length?-1:1}function Ee(e,t){if(ge(e)!==ge(t))return!1;for(let n=e.pieceNum_,r=t.pieceNum_;n<=e.pieces_.length;n++,r++)if(e.pieces_[n]!==t.pieces_[r])return!1;return!0}function Ce(e,t){let n=e.pieceNum_,r=t.pieceNum_;if(ge(e)>ge(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[r])return!1;++n,++r}return!0}class Te{constructor(e,t){this.errorPrefix_=t,this.parts_=ve(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let n=0;n<this.parts_.length;n++)this.byteLength_+=(0,a.OE)(this.parts_[n]);Ie(this)}}function Ie(e){if(e.byteLength_>768)throw new Error(e.errorPrefix_+"has a key path longer than 768 bytes ("+e.byteLength_+").");if(e.parts_.length>32)throw new Error(e.errorPrefix_+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+je(e))}function je(e){return 0===e.parts_.length?"":"in property '"+e.parts_.join(".")+"'"}class Pe extends ue{static getInstance(){return new Pe}constructor(){let e,t;super(["visible"]),"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(t="visibilitychange",e="hidden"):"undefined"!==typeof document.mozHidden?(t="mozvisibilitychange",e="mozHidden"):"undefined"!==typeof document.msHidden?(t="msvisibilitychange",e="msHidden"):"undefined"!==typeof document.webkitHidden&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,(()=>{const t=!document[e];t!==this.visible_&&(this.visible_=t,this.trigger("visible",t))}),!1)}getInitialEvent(e){return(0,a.vA)("visible"===e,"Unknown event type: "+e),[this.visible_]}}const Ae=1e3;class Ne extends de{constructor(e,t,n,r,i,o,s,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=s,this.authOverride_=l,this.id=Ne.nextPersistentConnectionId_++,this.log_=S("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ae,this.maxReconnectDelay_=3e5,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l&&!(0,a.$g)())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Pe.getInstance().on("visible",this.onVisible_,this),-1===e.host.indexOf("fblocal")&&he.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const r=++this.requestNumber_,i={r:r,a:e,b:t};this.log_((0,a.As)(i)),(0,a.vA)(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),n&&(this.requestCBHash_[r]=n)}get(e){this.initConnection_();const t=new a.cY,n={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:e=>{const n=e.d;"ok"===e.s?t.resolve(n):t.reject(n)}};this.outstandingGets_.push(n),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,n,r){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),(0,a.vA)(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),(0,a.vA)(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const s={onComplete:r,hashFn:t,query:e,tag:n};this.listens.get(o).set(i,s),this.connected_&&this.sendListen_(s)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,(n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,0===this.outstandingGetCount_&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)}))}sendListen_(e){const t=e.query,n=t._path.toString(),r=t._queryIdentifier;this.log_("Listen on "+n+" for "+r);const i={p:n};e.tag&&(i.q=t._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest("q",i,(i=>{const a=i.d,o=i.s;Ne.warnOnListenWarnings_(a,t);(this.listens.get(n)&&this.listens.get(n).get(r))===e&&(this.log_("listen response",i),"ok"!==o&&this.removeListen_(n,r),e.onComplete&&e.onComplete(o,a))}))}static warnOnListenWarnings_(e,t){if(e&&"object"===typeof e&&(0,a.gR)(e,"w")){const n=(0,a.yw)(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const e='".indexOn": "'+t._queryParams.getIndex().toString()+'"',n=t._path.toString();T(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},(()=>{})),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&40===e.length||(0,a.qc)(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=3e4)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},(()=>{}))}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=(0,a.Cv)(e)?"auth":"gauth",n={cred:e};null===this.authOverride_?n.noauth=!0:"object"===typeof this.authOverride_&&(n.authvar=this.authOverride_),this.sendRequest(t,n,(t=>{const n=t.s,r=t.d||"error";this.authToken_===e&&("ok"===n?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(n,r))}))}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},(e=>{const t=e.s,n=e.d||"error";"ok"===t?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)}))}unlisten(e,t){const n=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+r),(0,a.vA)(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query");this.removeListen_(n,r)&&this.connected_&&this.sendUnlisten_(n,r,e._queryObject,t)}sendUnlisten_(e,t,n,r){this.log_("Unlisten on "+e+" for "+t);const i={p:e};r&&(i.q=n,i.t=r),this.sendRequest("n",i)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,r){const i={p:t,d:n};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,(e=>{r&&setTimeout((()=>{r(e.s,e.d)}),Math.floor(0))}))}put(e,t,n,r){this.putInternal("p",e,t,n,r)}merge(e,t,n,r){this.putInternal("m",e,t,n,r)}putInternal(e,t,n,r,i){this.initConnection_();const a={p:t,d:n};void 0!==i&&(a.h=i),this.outstandingPuts_.push({action:e,request:a,onComplete:r}),this.outstandingPutCount_++;const o=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(o):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,(n=>{this.log_(t+" response",n),delete this.outstandingPuts_[e],this.outstandingPutCount_--,0===this.outstandingPutCount_&&(this.outstandingPuts_=[]),r&&r(n.s,n.d)}))}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,(e=>{if("ok"!==e.s){const t=e.d;this.log_("reportStats","Error sending stats: "+t)}}))}}onDataMessage_(e){if("r"in e){this.log_("from server: "+(0,a.As)(e));const t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),"d"===e?this.onDataUpdate_(t.p,t.d,!1,t.t):"m"===e?this.onDataUpdate_(t.p,t.d,!0,t.t):"c"===e?this.onListenRevoked_(t.p,t.q):"ac"===e?this.onAuthRevoked_(t.s,t.d):"apc"===e?this.onAppCheckRevoked_(t.s,t.d):"sd"===e?this.onSecurityDebugPacket_(t):E("Unrecognized action received from server: "+(0,a.As)(e)+"\nAre you using the latest client?")}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=(new Date).getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){(0,a.vA)(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout((()=>{this.establishConnectionTimer_=null,this.establishConnection_()}),Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ae,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ae,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){if(this.visible_){if(this.lastConnectionEstablishedTime_){(new Date).getTime()-this.lastConnectionEstablishedTime_>3e4&&(this.reconnectDelay_=Ae),this.lastConnectionEstablishedTime_=null}}else this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=(new Date).getTime();const e=Math.max(0,(new Date).getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,1.3*this.reconnectDelay_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=(new Date).getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+Ne.nextConnectionId_++,i=this.lastSessionId;let o=!1,s=null;const l=function(){s?s.close():(o=!0,n())},c=function(e){(0,a.vA)(s,"sendRequest call when we're not connected not allowed."),s.sendRequest(e)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[a,l]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?k("getToken() completed but was canceled"):(k("getToken() completed. Creating connection."),this.authToken_=a&&a.accessToken,this.appCheckToken_=l&&l.token,s=new ce(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,n,(e=>{T(e+" ("+this.repoInfo_.toString()+")"),this.interrupt("server_kill")}),i))}catch(E){this.log_("Failed to get token: "+E),o||(this.repoInfo_.nodeAdmin&&T(E),l())}}}interrupt(e){k("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){k("Resuming connection for reason: "+e),delete this.interruptReasons_[e],(0,a.Im)(this.interruptReasons_)&&(this.reconnectDelay_=Ae,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-(new Date).getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}0===this.outstandingPutCount_&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;n=t?t.map((e=>O(e))).join("$"):"default";const r=this.removeListen_(e,n);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,t){const n=new pe(e).toString();let r;if(this.listens.has(n)){const e=this.listens.get(n);r=e.get(t),e.delete(t),0===e.size&&this.listens.delete(n)}else r=void 0;return r}onAuthRevoked_(e,t){k("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=3&&(this.reconnectDelay_=3e4,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){k("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=3&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace("\n","\nFIREBASE: "))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";(0,a.$g)()&&(t=this.repoInfo_.nodeAdmin?"admin_node":"node"),e["sdk."+t+"."+c.replace(/\./g,"-")]=1,(0,a.jZ)()?e["framework.cordova"]=1:(0,a.lV)()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=he.getInstance().currentlyOnline();return(0,a.Im)(this.interruptReasons_)&&e}}Ne.nextPersistentConnectionId_=0,Ne.nextConnectionId_=0;class Re{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new Re(e,t)}}class Oe{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new Re(j,e),r=new Re(j,t);return 0!==this.compare(n,r)}minPost(){return Re.MIN}}let De;class Me extends Oe{static get __EMPTY_NODE(){return De}static set __EMPTY_NODE(e){De=e}compare(e,t){return A(e.name,t.name)}isDefinedOn(e){throw(0,a.Hk)("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return Re.MIN}maxPost(){return new Re(P,De)}makePost(e,t){return(0,a.vA)("string"===typeof e,"KeyIndex indexValue must always be a string."),new Re(e,De)}toString(){return".key"}}const Le=new Me;class Fe{constructor(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let a=1;for(;!e.isEmpty();)if(a=t?n(e.key,t):1,r&&(a*=-1),a<0)e=this.isReverse_?e.left:e.right;else{if(0===a){this.nodeStack_.push(e);break}this.nodeStack_.push(e),e=this.isReverse_?e.right:e.left}}getNext(){if(0===this.nodeStack_.length)return null;let e,t=this.nodeStack_.pop();if(e=this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return e}hasNext(){return this.nodeStack_.length>0}peek(){if(0===this.nodeStack_.length)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ze{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:ze.RED,this.left=null!=r?r:$e.EMPTY_NODE,this.right=null!=i?i:$e.EMPTY_NODE}copy(e,t,n,r,i){return new ze(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return $e.EMPTY_NODE;let e=this;return e.left.isRed_()||e.left.left.isRed_()||(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,r;if(n=this,t(e,n.key)<0)n.left.isEmpty()||n.left.isRed_()||n.left.left.isRed_()||(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),n.right.isEmpty()||n.right.isRed_()||n.right.left.isRed_()||(n=n.moveRedRight_()),0===t(e,n.key)){if(n.right.isEmpty())return $e.EMPTY_NODE;r=n.right.min_(),n=n.copy(r.key,r.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ze.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ze.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ze.RED=!0,ze.BLACK=!1;class $e{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:$e.EMPTY_NODE;this.comparator_=e,this.root_=t}insert(e,t){return new $e(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,ze.BLACK,null,null))}remove(e){return new $e(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ze.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,r=null;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t){if(n.left.isEmpty())return r?r.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}t<0?n=n.left:t>0&&(r=n,n=n.right)}throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Fe(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Fe(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Fe(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Fe(this.root_,null,this.comparator_,!0,e)}}function Ue(e,t){return A(e.name,t.name)}function Be(e,t){return A(e,t)}let We;$e.EMPTY_NODE=new class{copy(e,t,n,r,i){return this}insert(e,t,n){return new ze(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}};const He=function(e){return"number"===typeof e?"number:"+L(e):"string:"+e},Ve=function(e){if(e.isLeafNode()){const t=e.val();(0,a.vA)("string"===typeof t||"number"===typeof t||"object"===typeof t&&(0,a.gR)(t,".sv"),"Priority must be a string or number.")}else(0,a.vA)(e===We||e.isEmpty(),"priority of unexpected type.");(0,a.vA)(e===We||e.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};let qe,Ge,Ke;class Ye{static set __childrenNodeConstructor(e){qe=e}static get __childrenNodeConstructor(){return qe}constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Ye.__childrenNodeConstructor.EMPTY_NODE;this.value_=e,this.priorityNode_=t,this.lazyHash_=null,(0,a.vA)(void 0!==this.value_&&null!==this.value_,"LeafNode shouldn't be created with null/undefined value."),Ve(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Ye(this.value_,e)}getImmediateChild(e){return".priority"===e?this.priorityNode_:Ye.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return _e(e)?this:".priority"===me(e)?this.priorityNode_:Ye.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return".priority"===e?this.updatePriority(t):t.isEmpty()&&".priority"!==e?this:Ye.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=me(e);return null===n?t:t.isEmpty()&&".priority"!==n?this:((0,a.vA)(".priority"!==n||1===ge(e),".priority must be the last token in a path"),this.updateImmediateChild(n,Ye.__childrenNodeConstructor.EMPTY_NODE.updateChild(be(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(null===this.lazyHash_){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+He(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",e+="number"===t?L(this.value_):this.value_,this.lazyHash_=y(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Ye.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Ye.__childrenNodeConstructor?-1:((0,a.vA)(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,r=Ye.VALUE_TYPE_ORDER.indexOf(t),i=Ye.VALUE_TYPE_ORDER.indexOf(n);return(0,a.vA)(r>=0,"Unknown leaf type: "+t),(0,a.vA)(i>=0,"Unknown leaf type: "+n),r===i?"object"===n?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}return!1}}Ye.VALUE_TYPE_ORDER=["object","boolean","number","string"];const Ze=new class extends Oe{compare(e,t){const n=e.node.getPriority(),r=t.node.getPriority(),i=n.compareTo(r);return 0===i?A(e.name,t.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return Re.MIN}maxPost(){return new Re(P,new Ye("[PRIORITY-POST]",Ke))}makePost(e,t){const n=Ge(e);return new Re(t,new Ye("[PRIORITY-POST]",n))}toString(){return".priority"}},Je=Math.log(2);class Qe{constructor(e){var t;this.count=(t=e+1,parseInt(Math.log(t)/Je,10)),this.current_=this.count-1;const n=(r=this.count,parseInt(Array(r+1).join("1"),2));var r;this.bits_=e+1&n}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Xe=function(e,t,n,r){e.sort(t);const i=function(t,r){const a=r-t;let o,s;if(0===a)return null;if(1===a)return o=e[t],s=n?n(o):o,new ze(s,o.node,ze.BLACK,null,null);{const l=parseInt(a/2,10)+t,c=i(t,l),d=i(l+1,r);return o=e[l],s=n?n(o):o,new ze(s,o.node,ze.BLACK,c,d)}},a=function(t){let r=null,a=null,o=e.length;const s=function(t,r){const a=o-t,s=o;o-=t;const c=i(a+1,s),d=e[a],u=n?n(d):d;l(new ze(u,d.node,r,null,c))},l=function(e){r?(r.left=e,r=e):(a=e,r=e)};for(let e=0;e<t.count;++e){const n=t.nextBitIsOne(),r=Math.pow(2,t.count-(e+1));n?s(r,ze.BLACK):(s(r,ze.BLACK),s(r,ze.RED))}return a}(new Qe(e.length));return new $e(r||t,a)};let et;const tt={};class nt{static get Default(){return(0,a.vA)(tt&&Ze,"ChildrenNode.ts has not been loaded"),et=et||new nt({".priority":tt},{".priority":Ze}),et}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=(0,a.yw)(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof $e?t:null}hasIndex(e){return(0,a.gR)(this.indexSet_,e.toString())}addIndex(e,t){(0,a.vA)(e!==Le,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let r=!1;const i=t.getIterator(Re.Wrap);let o,s=i.getNext();for(;s;)r=r||e.isDefinedOn(s.node),n.push(s),s=i.getNext();o=r?Xe(n,e.getCompare()):tt;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=o,new nt(d,c)}addToIndexes(e,t){const n=(0,a.kH)(this.indexes_,((n,r)=>{const i=(0,a.yw)(this.indexSet_,r);if((0,a.vA)(i,"Missing index implementation for "+r),n===tt){if(i.isDefinedOn(e.node)){const n=[],r=t.getIterator(Re.Wrap);let a=r.getNext();for(;a;)a.name!==e.name&&n.push(a),a=r.getNext();return n.push(e),Xe(n,i.getCompare())}return tt}{const r=t.get(e.name);let i=n;return r&&(i=i.remove(new Re(e.name,r))),i.insert(e,e.node)}}));return new nt(n,this.indexSet_)}removeFromIndexes(e,t){const n=(0,a.kH)(this.indexes_,(n=>{if(n===tt)return n;{const r=t.get(e.name);return r?n.remove(new Re(e.name,r)):n}}));return new nt(n,this.indexSet_)}}let rt;class it{static get EMPTY_NODE(){return rt||(rt=new it(new $e(Be),null,nt.Default))}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&Ve(this.priorityNode_),this.children_.isEmpty()&&(0,a.vA)(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||rt}updatePriority(e){return this.children_.isEmpty()?this:new it(this.children_,e,this.indexMap_)}getImmediateChild(e){if(".priority"===e)return this.getPriority();{const t=this.children_.get(e);return null===t?rt:t}}getChild(e){const t=me(e);return null===t?this:this.getImmediateChild(t).getChild(be(e))}hasChild(e){return null!==this.children_.get(e)}updateImmediateChild(e,t){if((0,a.vA)(t,"We should always be passing snapshot nodes"),".priority"===e)return this.updatePriority(t);{const n=new Re(e,t);let r,i;t.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(n,this.children_)):(r=this.children_.insert(e,t),i=this.indexMap_.addToIndexes(n,this.children_));const a=r.isEmpty()?rt:this.priorityNode_;return new it(r,a,i)}}updateChild(e,t){const n=me(e);if(null===n)return t;{(0,a.vA)(".priority"!==me(e)||1===ge(e),".priority must be the last token in a path");const r=this.getImmediateChild(n).updateChild(be(e),t);return this.updateImmediateChild(n,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,r=0,i=!0;if(this.forEachChild(Ze,((a,o)=>{t[a]=o.val(e),n++,i&&it.INTEGER_REGEXP_.test(a)?r=Math.max(r,Number(a)):i=!1})),!e&&i&&r<2*n){const e=[];for(const n in t)e[n]=t[n];return e}return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(null===this.lazyHash_){let e="";this.getPriority().isEmpty()||(e+="priority:"+He(this.getPriority().val())+":"),this.forEachChild(Ze,((t,n)=>{const r=n.hash();""!==r&&(e+=":"+t+":"+r)})),this.lazyHash_=""===e?"":y(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const r=this.resolveIndex_(n);if(r){const n=r.getPredecessorKey(new Re(e,t));return n?n.name:null}return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.minKey();return e&&e.name}return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new Re(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.maxKey();return e&&e.name}return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new Re(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal((e=>t(e.name,e.node))):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,(e=>e));{const n=this.children_.getIteratorFrom(e.name,Re.Wrap);let r=n.peek();for(;null!=r&&t.compare(r,e)<0;)n.getNext(),r=n.peek();return n}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,(e=>e));{const n=this.children_.getReverseIteratorFrom(e.name,Re.Wrap);let r=n.peek();for(;null!=r&&t.compare(r,e)>0;)n.getNext(),r=n.peek();return n}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===at?-1:0}withIndex(e){if(e===Le||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new it(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Le||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority())){if(this.children_.count()===t.children_.count()){const e=this.getIterator(Ze),n=t.getIterator(Ze);let r=e.getNext(),i=n.getNext();for(;r&&i;){if(r.name!==i.name||!r.node.equals(i.node))return!1;r=e.getNext(),i=n.getNext()}return null===r&&null===i}return!1}return!1}}resolveIndex_(e){return e===Le?null:this.indexMap_.get(e.toString())}}it.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;const at=new class extends it{constructor(){super(new $e(Be),it.EMPTY_NODE,nt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return it.EMPTY_NODE}isEmpty(){return!1}};Object.defineProperties(Re,{MIN:{value:new Re(j,it.EMPTY_NODE)},MAX:{value:new Re(P,at)}}),Me.__EMPTY_NODE=it.EMPTY_NODE,Ye.__childrenNodeConstructor=it,We=at,function(e){Ke=e}(at);const ot=!0;function st(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(null===e)return it.EMPTY_NODE;if("object"===typeof e&&".priority"in e&&(t=e[".priority"]),(0,a.vA)(null===t||"string"===typeof t||"number"===typeof t||"object"===typeof t&&".sv"in t,"Invalid priority type found: "+typeof t),"object"===typeof e&&".value"in e&&null!==e[".value"]&&(e=e[".value"]),"object"!==typeof e||".sv"in e){return new Ye(e,st(t))}if(e instanceof Array||!ot){let n=it.EMPTY_NODE;return M(e,((t,r)=>{if((0,a.gR)(e,t)&&"."!==t.substring(0,1)){const e=st(r);!e.isLeafNode()&&e.isEmpty()||(n=n.updateImmediateChild(t,e))}})),n.updatePriority(st(t))}{const n=[];let r=!1;if(M(e,((e,t)=>{if("."!==e.substring(0,1)){const i=st(t);i.isEmpty()||(r=r||!i.getPriority().isEmpty(),n.push(new Re(e,i)))}})),0===n.length)return it.EMPTY_NODE;const i=Xe(n,Ue,(e=>e.name),Be);if(r){const e=Xe(n,Ze.getCompare());return new it(i,st(t),new nt({".priority":e},{".priority":Ze}))}return new it(i,st(t),nt.Default)}}!function(e){Ge=e}(st);class lt extends Oe{constructor(e){super(),this.indexPath_=e,(0,a.vA)(!_e(e)&&".priority"!==me(e),"Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),r=this.extractChild(t.node),i=n.compareTo(r);return 0===i?A(e.name,t.name):i}makePost(e,t){const n=st(e),r=it.EMPTY_NODE.updateChild(this.indexPath_,n);return new Re(t,r)}maxPost(){const e=it.EMPTY_NODE.updateChild(this.indexPath_,at);return new Re(P,e)}toString(){return ve(this.indexPath_,0).join("/")}}const ct=new class extends Oe{compare(e,t){const n=e.node.compareTo(t.node);return 0===n?A(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return Re.MIN}maxPost(){return Re.MAX}makePost(e,t){const n=st(e);return new Re(t,n)}toString(){return".value"}};function dt(e){return{type:"value",snapshotNode:e}}function ut(e,t){return{type:"child_added",snapshotNode:t,childName:e}}function ht(e,t){return{type:"child_removed",snapshotNode:t,childName:e}}function pt(e,t,n){return{type:"child_changed",snapshotNode:t,childName:e,oldSnap:n}}class ft{constructor(e){this.index_=e}updateChild(e,t,n,r,i,o){(0,a.vA)(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const s=e.getImmediateChild(t);return s.getChild(r).equals(n.getChild(r))&&s.isEmpty()===n.isEmpty()?e:(null!=o&&(n.isEmpty()?e.hasChild(t)?o.trackChildChange(ht(t,s)):(0,a.vA)(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):s.isEmpty()?o.trackChildChange(ut(t,n)):o.trackChildChange(pt(t,n,s))),e.isLeafNode()&&n.isEmpty()?e:e.updateImmediateChild(t,n).withIndex(this.index_))}updateFullNode(e,t,n){return null!=n&&(e.isLeafNode()||e.forEachChild(Ze,((e,r)=>{t.hasChild(e)||n.trackChildChange(ht(e,r))})),t.isLeafNode()||t.forEachChild(Ze,((t,r)=>{if(e.hasChild(t)){const i=e.getImmediateChild(t);i.equals(r)||n.trackChildChange(pt(t,r,i))}else n.trackChildChange(ut(t,r))}))),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?it.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}class mt{constructor(e){this.indexedFilter_=new ft(e.getIndex()),this.index_=e.getIndex(),this.startPost_=mt.getStartPost_(e),this.endPost_=mt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,r,i,a){return this.matches(new Re(t,n))||(n=it.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,r,i,a)}updateFullNode(e,t,n){t.isLeafNode()&&(t=it.EMPTY_NODE);let r=t.withIndex(this.index_);r=r.updatePriority(it.EMPTY_NODE);const i=this;return t.forEachChild(Ze,((e,t)=>{i.matches(new Re(e,t))||(r=r.updateImmediateChild(e,it.EMPTY_NODE))})),this.indexedFilter_.updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}return e.getIndex().maxPost()}}class gt{constructor(e){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{const t=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?t<=0:t<0},this.withinEndPost=e=>{const t=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?t<=0:t<0},this.rangedFilter_=new mt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,r,i,a){return this.rangedFilter_.matches(new Re(t,n))||(n=it.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,r,i,a):this.fullLimitUpdateChild_(e,t,n,i,a)}updateFullNode(e,t,n){let r;if(t.isLeafNode()||t.isEmpty())r=it.EMPTY_NODE.withIndex(this.index_);else if(2*this.limit_<t.numChildren()&&t.isIndexed(this.index_)){let e;r=it.EMPTY_NODE.withIndex(this.index_),e=this.reverse_?t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let n=0;for(;e.hasNext()&&n<this.limit_;){const t=e.getNext();if(this.withinDirectionalStart(t)){if(!this.withinDirectionalEnd(t))break;r=r.updateImmediateChild(t.name,t.node),n++}}}else{let e;r=t.withIndex(this.index_),r=r.updatePriority(it.EMPTY_NODE),e=this.reverse_?r.getReverseIterator(this.index_):r.getIterator(this.index_);let n=0;for(;e.hasNext();){const t=e.getNext();n<this.limit_&&this.withinDirectionalStart(t)&&this.withinDirectionalEnd(t)?n++:r=r.updateImmediateChild(t.name,it.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,r,i){let o;if(this.reverse_){const e=this.index_.getCompare();o=(t,n)=>e(n,t)}else o=this.index_.getCompare();const s=e;(0,a.vA)(s.numChildren()===this.limit_,"");const l=new Re(t,n),c=this.reverse_?s.getFirstChild(this.index_):s.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(s.hasChild(t)){const e=s.getImmediateChild(t);let a=r.getChildAfterChild(this.index_,c,this.reverse_);for(;null!=a&&(a.name===t||s.hasChild(a.name));)a=r.getChildAfterChild(this.index_,a,this.reverse_);const u=null==a?1:o(a,l);if(d&&!n.isEmpty()&&u>=0)return null!=i&&i.trackChildChange(pt(t,n,e)),s.updateImmediateChild(t,n);{null!=i&&i.trackChildChange(ht(t,e));const n=s.updateImmediateChild(t,it.EMPTY_NODE);return null!=a&&this.rangedFilter_.matches(a)?(null!=i&&i.trackChildChange(ut(a.name,a.node)),n.updateImmediateChild(a.name,a.node)):n}}return n.isEmpty()?e:d&&o(c,l)>=0?(null!=i&&(i.trackChildChange(ht(c.name,c.node)),i.trackChildChange(ut(t,n))),s.updateImmediateChild(t,n).updateImmediateChild(c.name,it.EMPTY_NODE)):e}}class bt{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Ze}hasStart(){return this.startSet_}isViewFromLeft(){return""===this.viewFrom_?this.startSet_:"l"===this.viewFrom_}getIndexStartValue(){return(0,a.vA)(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return(0,a.vA)(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:j}hasEnd(){return this.endSet_}getIndexEndValue(){return(0,a.vA)(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return(0,a.vA)(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:P}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&""!==this.viewFrom_}getLimit(){return(0,a.vA)(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Ze}copy(){const e=new bt;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function yt(e,t){const n=e.copy();return n.index_=t,n}function vt(e){const t={};if(e.isDefault())return t;let n;if(e.index_===Ze?n="$priority":e.index_===ct?n="$value":e.index_===Le?n="$key":((0,a.vA)(e.index_ instanceof lt,"Unrecognized index type!"),n=e.index_.toString()),t.orderBy=(0,a.As)(n),e.startSet_){const n=e.startAfterSet_?"startAfter":"startAt";t[n]=(0,a.As)(e.indexStartValue_),e.startNameSet_&&(t[n]+=","+(0,a.As)(e.indexStartName_))}if(e.endSet_){const n=e.endBeforeSet_?"endBefore":"endAt";t[n]=(0,a.As)(e.indexEndValue_),e.endNameSet_&&(t[n]+=","+(0,a.As)(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?t.limitToFirst=e.limit_:t.limitToLast=e.limit_),t}function xt(e){const t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_),t.sin=!e.startAfterSet_),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_),t.ein=!e.endBeforeSet_),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;""===n&&(n=e.isViewFromLeft()?"l":"r"),t.vf=n}return e.index_!==Ze&&(t.i=e.index_.toString()),t}class wt extends de{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return void 0!==t?"tag$"+t:((0,a.vA)(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,n,r){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=r,this.log_=S("p:rest:"),this.listens_={}}listen(e,t,n,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=wt.getListenId_(e,n),s={};this.listens_[o]=s;const l=vt(e._queryParams);this.restRequest_(i+".json",l,((e,t)=>{let l=t;if(404===e&&(l=null,e=null),null===e&&this.onDataUpdate_(i,l,!1,n),(0,a.yw)(this.listens_,o)===s){let t;t=e?401===e?"permission_denied":"rest_error:"+e:"ok",r(t,null)}}))}unlisten(e,t){const n=wt.getListenId_(e,t);delete this.listens_[n]}get(e){const t=vt(e._queryParams),n=e._path.toString(),r=new a.cY;return this.restRequest_(n+".json",t,((e,t)=>{let i=t;404===e&&(i=null,e=null),null===e?(this.onDataUpdate_(n,i,!1,null),r.resolve(i)):r.reject(new Error(i))})),r.promise}refreshAuthToken(e){}restRequest_(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then((r=>{let[i,o]=r;i&&i.accessToken&&(t.auth=i.accessToken),o&&o.token&&(t.ac=o.token);const s=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+(0,a.Am)(t);this.log_("Sending REST request for "+s);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(n&&4===l.readyState){this.log_("REST Response for "+s+" received. status:",l.status,"response:",l.responseText);let t=null;if(l.status>=200&&l.status<300){try{t=(0,a.$L)(l.responseText)}catch(e){T("Failed to parse JSON response for "+s+": "+l.responseText)}n(null,t)}else 401!==l.status&&404!==l.status&&T("Got unsuccessful REST response for "+s+" Status: "+l.status),n(l.status);n=null}},l.open("GET",s,!0),l.send()}))}}class _t{constructor(){this.rootNode_=it.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}function kt(){return{value:null,children:new Map}}function St(e,t,n){if(_e(t))e.value=n,e.children.clear();else if(null!==e.value)e.value=e.value.updateChild(t,n);else{const r=me(t);e.children.has(r)||e.children.set(r,kt());St(e.children.get(r),t=be(t),n)}}function Et(e,t){if(_e(t))return e.value=null,e.children.clear(),!0;if(null!==e.value){if(e.value.isLeafNode())return!1;{const n=e.value;return e.value=null,n.forEachChild(Ze,((t,n)=>{St(e,new pe(t),n)})),Et(e,t)}}if(e.children.size>0){const n=me(t);if(t=be(t),e.children.has(n)){Et(e.children.get(n),t)&&e.children.delete(n)}return 0===e.children.size}return!0}function Ct(e,t,n){null!==e.value?n(t,e.value):function(e,t){e.children.forEach(((e,n)=>{t(n,e)}))}(e,((e,r)=>{Ct(r,new pe(t.toString()+"/"+e),n)}))}class Tt{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&M(this.last_,((e,n)=>{t[e]=t[e]-n})),this.last_=e,t}}class It{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Tt(e);const n=1e4+2e4*Math.random();U(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;M(e,((e,r)=>{r>0&&(0,a.gR)(this.statsToReport_,e)&&(t[e]=r,n=!0)})),n&&this.server_.reportStats(t),U(this.reportStats_.bind(this),Math.floor(2*Math.random()*3e5))}}var jt;function Pt(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}!function(e){e[e.OVERWRITE=0]="OVERWRITE",e[e.MERGE=1]="MERGE",e[e.ACK_USER_WRITE=2]="ACK_USER_WRITE",e[e.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"}(jt||(jt={}));class At{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=jt.ACK_USER_WRITE,this.source={fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}operationForChild(e){if(_e(this.path)){if(null!=this.affectedTree.value)return(0,a.vA)(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new pe(e));return new At(fe(),t,this.revert)}}return(0,a.vA)(me(this.path)===e,"operationForChild called for unrelated child."),new At(be(this.path),this.affectedTree,this.revert)}}class Nt{constructor(e,t){this.source=e,this.path=t,this.type=jt.LISTEN_COMPLETE}operationForChild(e){return _e(this.path)?new Nt(this.source,fe()):new Nt(this.source,be(this.path))}}class Rt{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=jt.OVERWRITE}operationForChild(e){return _e(this.path)?new Rt(this.source,fe(),this.snap.getImmediateChild(e)):new Rt(this.source,be(this.path),this.snap)}}class Ot{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=jt.MERGE}operationForChild(e){if(_e(this.path)){const t=this.children.subtree(new pe(e));return t.isEmpty()?null:t.value?new Rt(this.source,fe(),t.value):new Ot(this.source,fe(),t)}return(0,a.vA)(me(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ot(this.source,be(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}class Dt{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(_e(e))return this.isFullyInitialized()&&!this.filtered_;const t=me(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}class Mt{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Lt(e,t,n,r,i,o){const s=r.filter((e=>e.type===n));s.sort(((t,n)=>function(e,t,n){if(null==t.childName||null==n.childName)throw(0,a.Hk)("Should only compare child_ events.");const r=new Re(t.childName,t.snapshotNode),i=new Re(n.childName,n.snapshotNode);return e.index_.compare(r,i)}(e,t,n))),s.forEach((n=>{const r=function(e,t,n){return"value"===t.type||"child_removed"===t.type||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}(e,n,o);i.forEach((i=>{i.respondsTo(n.type)&&t.push(i.createEvent(r,e.query_))}))}))}function Ft(e,t){return{eventCache:e,serverCache:t}}function zt(e,t,n,r){return Ft(new Dt(t,n,r),e.serverCache)}function $t(e,t,n,r){return Ft(e.eventCache,new Dt(t,n,r))}function Ut(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function Bt(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}let Wt;class Ht{static fromObject(e){let t=new Ht(null);return M(e,((e,n)=>{t=t.set(new pe(e),n)})),t}constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(Wt||(Wt=new $e(N)),Wt);this.value=e,this.children=t}isEmpty(){return null===this.value&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(null!=this.value&&t(this.value))return{path:fe(),value:this.value};if(_e(e))return null;{const n=me(e),r=this.children.get(n);if(null!==r){const i=r.findRootMostMatchingPathAndValue(be(e),t);if(null!=i){return{path:we(new pe(n),i.path),value:i.value}}return null}return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,(()=>!0))}subtree(e){if(_e(e))return this;{const t=me(e),n=this.children.get(t);return null!==n?n.subtree(be(e)):new Ht(null)}}set(e,t){if(_e(e))return new Ht(t,this.children);{const n=me(e),r=(this.children.get(n)||new Ht(null)).set(be(e),t),i=this.children.insert(n,r);return new Ht(this.value,i)}}remove(e){if(_e(e))return this.children.isEmpty()?new Ht(null):new Ht(null,this.children);{const t=me(e),n=this.children.get(t);if(n){const r=n.remove(be(e));let i;return i=r.isEmpty()?this.children.remove(t):this.children.insert(t,r),null===this.value&&i.isEmpty()?new Ht(null):new Ht(this.value,i)}return this}}get(e){if(_e(e))return this.value;{const t=me(e),n=this.children.get(t);return n?n.get(be(e)):null}}setTree(e,t){if(_e(e))return t;{const n=me(e),r=(this.children.get(n)||new Ht(null)).setTree(be(e),t);let i;return i=r.isEmpty()?this.children.remove(n):this.children.insert(n,r),new Ht(this.value,i)}}fold(e){return this.fold_(fe(),e)}fold_(e,t){const n={};return this.children.inorderTraversal(((r,i)=>{n[r]=i.fold_(we(e,r),t)})),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,fe(),t)}findOnPath_(e,t,n){const r=!!this.value&&n(t,this.value);if(r)return r;if(_e(e))return null;{const r=me(e),i=this.children.get(r);return i?i.findOnPath_(be(e),we(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,fe(),t)}foreachOnPath_(e,t,n){if(_e(e))return this;{this.value&&n(t,this.value);const r=me(e),i=this.children.get(r);return i?i.foreachOnPath_(be(e),we(t,r),n):new Ht(null)}}foreach(e){this.foreach_(fe(),e)}foreach_(e,t){this.children.inorderTraversal(((n,r)=>{r.foreach_(we(e,n),t)})),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal(((t,n)=>{n.value&&e(t,n.value)}))}}class Vt{constructor(e){this.writeTree_=e}static empty(){return new Vt(new Ht(null))}}function qt(e,t,n){if(_e(t))return new Vt(new Ht(n));{const r=e.writeTree_.findRootMostValueAndPath(t);if(null!=r){const i=r.path;let a=r.value;const o=ke(i,t);return a=a.updateChild(o,n),new Vt(e.writeTree_.set(i,a))}{const r=new Ht(n),i=e.writeTree_.setTree(t,r);return new Vt(i)}}}function Gt(e,t,n){let r=e;return M(n,((e,n)=>{r=qt(r,we(t,e),n)})),r}function Kt(e,t){if(_e(t))return Vt.empty();{const n=e.writeTree_.setTree(t,new Ht(null));return new Vt(n)}}function Yt(e,t){return null!=Zt(e,t)}function Zt(e,t){const n=e.writeTree_.findRootMostValueAndPath(t);return null!=n?e.writeTree_.get(n.path).getChild(ke(n.path,t)):null}function Jt(e){const t=[],n=e.writeTree_.value;return null!=n?n.isLeafNode()||n.forEachChild(Ze,((e,n)=>{t.push(new Re(e,n))})):e.writeTree_.children.inorderTraversal(((e,n)=>{null!=n.value&&t.push(new Re(e,n.value))})),t}function Qt(e,t){if(_e(t))return e;{const n=Zt(e,t);return new Vt(null!=n?new Ht(n):e.writeTree_.subtree(t))}}function Xt(e){return e.writeTree_.isEmpty()}function en(e,t){return tn(fe(),e.writeTree_,t)}function tn(e,t,n){if(null!=t.value)return n.updateChild(e,t.value);{let r=null;return t.children.inorderTraversal(((t,i)=>{".priority"===t?((0,a.vA)(null!==i.value,"Priority writes must always be leaf nodes"),r=i.value):n=tn(we(e,t),i,n)})),n.getChild(e).isEmpty()||null===r||(n=n.updateChild(we(e,".priority"),r)),n}}function nn(e,t){return gn(t,e)}function rn(e,t){const n=e.allWrites.findIndex((e=>e.writeId===t));(0,a.vA)(n>=0,"removeWrite called with nonexistent writeId.");const r=e.allWrites[n];e.allWrites.splice(n,1);let i=r.visible,o=!1,s=e.allWrites.length-1;for(;i&&s>=0;){const t=e.allWrites[s];t.visible&&(s>=n&&an(t,r.path)?i=!1:Ce(r.path,t.path)&&(o=!0)),s--}if(i){if(o)return function(e){e.visibleWrites=sn(e.allWrites,on,fe()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}(e),!0;if(r.snap)e.visibleWrites=Kt(e.visibleWrites,r.path);else{M(r.children,(t=>{e.visibleWrites=Kt(e.visibleWrites,we(r.path,t))}))}return!0}return!1}function an(e,t){if(e.snap)return Ce(e.path,t);for(const n in e.children)if(e.children.hasOwnProperty(n)&&Ce(we(e.path,n),t))return!0;return!1}function on(e){return e.visible}function sn(e,t,n){let r=Vt.empty();for(let i=0;i<e.length;++i){const o=e[i];if(t(o)){const e=o.path;let t;if(o.snap)Ce(n,e)?(t=ke(n,e),r=qt(r,t,o.snap)):Ce(e,n)&&(t=ke(e,n),r=qt(r,fe(),o.snap.getChild(t)));else{if(!o.children)throw(0,a.Hk)("WriteRecord should have .snap or .children");if(Ce(n,e))t=ke(n,e),r=Gt(r,t,o.children);else if(Ce(e,n))if(t=ke(e,n),_e(t))r=Gt(r,fe(),o.children);else{const e=(0,a.yw)(o.children,me(t));if(e){const n=e.getChild(be(t));r=qt(r,fe(),n)}}}}}return r}function ln(e,t,n,r,i){if(r||i){const a=Qt(e.visibleWrites,t);if(!i&&Xt(a))return n;if(i||null!=n||Yt(a,fe())){const a=function(e){return(e.visible||i)&&(!r||!~r.indexOf(e.writeId))&&(Ce(e.path,t)||Ce(t,e.path))};return en(sn(e.allWrites,a,t),n||it.EMPTY_NODE)}return null}{const r=Zt(e.visibleWrites,t);if(null!=r)return r;{const r=Qt(e.visibleWrites,t);if(Xt(r))return n;if(null!=n||Yt(r,fe())){return en(r,n||it.EMPTY_NODE)}return null}}}function cn(e,t,n,r){return ln(e.writeTree,e.treePath,t,n,r)}function dn(e,t){return function(e,t,n){let r=it.EMPTY_NODE;const i=Zt(e.visibleWrites,t);if(i)return i.isLeafNode()||i.forEachChild(Ze,((e,t)=>{r=r.updateImmediateChild(e,t)})),r;if(n){const i=Qt(e.visibleWrites,t);return n.forEachChild(Ze,((e,t)=>{const n=en(Qt(i,new pe(e)),t);r=r.updateImmediateChild(e,n)})),Jt(i).forEach((e=>{r=r.updateImmediateChild(e.name,e.node)})),r}return Jt(Qt(e.visibleWrites,t)).forEach((e=>{r=r.updateImmediateChild(e.name,e.node)})),r}(e.writeTree,e.treePath,t)}function un(e,t,n,r){return function(e,t,n,r,i){(0,a.vA)(r||i,"Either existingEventSnap or existingServerSnap must exist");const o=we(t,n);if(Yt(e.visibleWrites,o))return null;{const t=Qt(e.visibleWrites,o);return Xt(t)?i.getChild(n):en(t,i.getChild(n))}}(e.writeTree,e.treePath,t,n,r)}function hn(e,t){return function(e,t){return Zt(e.visibleWrites,t)}(e.writeTree,we(e.treePath,t))}function pn(e,t,n,r,i,a){return function(e,t,n,r,i,a,o){let s;const l=Qt(e.visibleWrites,t),c=Zt(l,fe());if(null!=c)s=c;else{if(null==n)return[];s=en(l,n)}if(s=s.withIndex(o),s.isEmpty()||s.isLeafNode())return[];{const e=[],t=o.getCompare(),n=a?s.getReverseIteratorFrom(r,o):s.getIteratorFrom(r,o);let l=n.getNext();for(;l&&e.length<i;)0!==t(l,r)&&e.push(l),l=n.getNext();return e}}(e.writeTree,e.treePath,t,n,r,i,a)}function fn(e,t,n){return function(e,t,n,r){const i=we(t,n),a=Zt(e.visibleWrites,i);if(null!=a)return a;if(r.isCompleteForChild(n))return en(Qt(e.visibleWrites,i),r.getNode().getImmediateChild(n));return null}(e.writeTree,e.treePath,t,n)}function mn(e,t){return gn(we(e.treePath,t),e.writeTree)}function gn(e,t){return{treePath:e,writeTree:t}}class bn{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;(0,a.vA)("child_added"===t||"child_changed"===t||"child_removed"===t,"Only child changes supported for tracking"),(0,a.vA)(".priority"!==n,"Only non-priority child changes can be tracked.");const r=this.changeMap.get(n);if(r){const i=r.type;if("child_added"===t&&"child_removed"===i)this.changeMap.set(n,pt(n,e.snapshotNode,r.snapshotNode));else if("child_removed"===t&&"child_added"===i)this.changeMap.delete(n);else if("child_removed"===t&&"child_changed"===i)this.changeMap.set(n,ht(n,r.oldSnap));else if("child_changed"===t&&"child_added"===i)this.changeMap.set(n,ut(n,e.snapshotNode));else{if("child_changed"!==t||"child_changed"!==i)throw(0,a.Hk)("Illegal combination of changes: "+e+" occurred after "+r);this.changeMap.set(n,pt(n,e.snapshotNode,r.oldSnap))}}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}const yn=new class{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}};class vn{constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const t=null!=this.optCompleteServerCache_?new Dt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return fn(this.writes_,e,t)}}getChildAfterChild(e,t,n){const r=null!=this.optCompleteServerCache_?this.optCompleteServerCache_:Bt(this.viewCache_),i=pn(this.writes_,r,t,1,n,e);return 0===i.length?null:i[0]}}function xn(e,t,n,r,i){const o=new bn;let s,l;if(n.type===jt.OVERWRITE){const c=n;c.source.fromUser?s=kn(e,t,c.path,c.snap,r,i,o):((0,a.vA)(c.source.fromServer,"Unknown source."),l=c.source.tagged||t.serverCache.isFiltered()&&!_e(c.path),s=_n(e,t,c.path,c.snap,r,i,l,o))}else if(n.type===jt.MERGE){const c=n;c.source.fromUser?s=function(e,t,n,r,i,a,o){let s=t;return r.foreach(((r,l)=>{const c=we(n,r);Sn(t,me(c))&&(s=kn(e,s,c,l,i,a,o))})),r.foreach(((r,l)=>{const c=we(n,r);Sn(t,me(c))||(s=kn(e,s,c,l,i,a,o))})),s}(e,t,c.path,c.children,r,i,o):((0,a.vA)(c.source.fromServer,"Unknown source."),l=c.source.tagged||t.serverCache.isFiltered(),s=Cn(e,t,c.path,c.children,r,i,l,o))}else if(n.type===jt.ACK_USER_WRITE){const l=n;s=l.revert?function(e,t,n,r,i,o){let s;if(null!=hn(r,n))return t;{const l=new vn(r,t,i),c=t.eventCache.getNode();let d;if(_e(n)||".priority"===me(n)){let n;if(t.serverCache.isFullyInitialized())n=cn(r,Bt(t));else{const e=t.serverCache.getNode();(0,a.vA)(e instanceof it,"serverChildren would be complete if leaf node"),n=dn(r,e)}d=e.filter.updateFullNode(c,n,o)}else{const i=me(n);let a=fn(r,i,t.serverCache);null==a&&t.serverCache.isCompleteForChild(i)&&(a=c.getImmediateChild(i)),d=null!=a?e.filter.updateChild(c,i,a,be(n),l,o):t.eventCache.getNode().hasChild(i)?e.filter.updateChild(c,i,it.EMPTY_NODE,be(n),l,o):c,d.isEmpty()&&t.serverCache.isFullyInitialized()&&(s=cn(r,Bt(t)),s.isLeafNode()&&(d=e.filter.updateFullNode(d,s,o)))}return s=t.serverCache.isFullyInitialized()||null!=hn(r,fe()),zt(t,d,s,e.filter.filtersNodes())}}(e,t,l.path,r,i,o):function(e,t,n,r,i,a,o){if(null!=hn(i,n))return t;const s=t.serverCache.isFiltered(),l=t.serverCache;if(null!=r.value){if(_e(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return _n(e,t,n,l.getNode().getChild(n),i,a,s,o);if(_e(n)){let r=new Ht(null);return l.getNode().forEachChild(Le,((e,t)=>{r=r.set(new pe(e),t)})),Cn(e,t,n,r,i,a,s,o)}return t}{let c=new Ht(null);return r.foreach(((e,t)=>{const r=we(n,e);l.isCompleteForPath(r)&&(c=c.set(e,l.getNode().getChild(r)))})),Cn(e,t,n,c,i,a,s,o)}}(e,t,l.path,l.affectedTree,r,i,o)}else{if(n.type!==jt.LISTEN_COMPLETE)throw(0,a.Hk)("Unknown operation type: "+n.type);s=function(e,t,n,r,i){const a=t.serverCache,o=$t(t,a.getNode(),a.isFullyInitialized()||_e(n),a.isFiltered());return wn(e,o,n,r,yn,i)}(e,t,n.path,r,o)}const c=o.getChanges();return function(e,t,n){const r=t.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),a=Ut(e);(n.length>0||!e.eventCache.isFullyInitialized()||i&&!r.getNode().equals(a)||!r.getNode().getPriority().equals(a.getPriority()))&&n.push(dt(Ut(t)))}}(t,s,c),{viewCache:s,changes:c}}function wn(e,t,n,r,i,o){const s=t.eventCache;if(null!=hn(r,n))return t;{let l,c;if(_e(n))if((0,a.vA)(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const n=Bt(t),i=dn(r,n instanceof it?n:it.EMPTY_NODE);l=e.filter.updateFullNode(t.eventCache.getNode(),i,o)}else{const n=cn(r,Bt(t));l=e.filter.updateFullNode(t.eventCache.getNode(),n,o)}else{const d=me(n);if(".priority"===d){(0,a.vA)(1===ge(n),"Can't have a priority with additional path components");const i=s.getNode();c=t.serverCache.getNode();const o=un(r,n,i,c);l=null!=o?e.filter.updatePriority(i,o):s.getNode()}else{const a=be(n);let u;if(s.isCompleteForChild(d)){c=t.serverCache.getNode();const e=un(r,n,s.getNode(),c);u=null!=e?s.getNode().getImmediateChild(d).updateChild(a,e):s.getNode().getImmediateChild(d)}else u=fn(r,d,t.serverCache);l=null!=u?e.filter.updateChild(s.getNode(),d,u,a,i,o):s.getNode()}}return zt(t,l,s.isFullyInitialized()||_e(n),e.filter.filtersNodes())}}function _n(e,t,n,r,i,a,o,s){const l=t.serverCache;let c;const d=o?e.filter:e.filter.getIndexedFilter();if(_e(n))c=d.updateFullNode(l.getNode(),r,null);else if(d.filtersNodes()&&!l.isFiltered()){const e=l.getNode().updateChild(n,r);c=d.updateFullNode(l.getNode(),e,null)}else{const e=me(n);if(!l.isCompleteForPath(n)&&ge(n)>1)return t;const i=be(n),a=l.getNode().getImmediateChild(e).updateChild(i,r);c=".priority"===e?d.updatePriority(l.getNode(),a):d.updateChild(l.getNode(),e,a,i,yn,null)}const u=$t(t,c,l.isFullyInitialized()||_e(n),d.filtersNodes());return wn(e,u,n,i,new vn(i,u,a),s)}function kn(e,t,n,r,i,a,o){const s=t.eventCache;let l,c;const d=new vn(i,t,a);if(_e(n))c=e.filter.updateFullNode(t.eventCache.getNode(),r,o),l=zt(t,c,!0,e.filter.filtersNodes());else{const i=me(n);if(".priority"===i)c=e.filter.updatePriority(t.eventCache.getNode(),r),l=zt(t,c,s.isFullyInitialized(),s.isFiltered());else{const a=be(n),c=s.getNode().getImmediateChild(i);let u;if(_e(a))u=r;else{const e=d.getCompleteChild(i);u=null!=e?".priority"===ye(a)&&e.getChild(xe(a)).isEmpty()?e:e.updateChild(a,r):it.EMPTY_NODE}if(c.equals(u))l=t;else{l=zt(t,e.filter.updateChild(s.getNode(),i,u,a,d,o),s.isFullyInitialized(),e.filter.filtersNodes())}}}return l}function Sn(e,t){return e.eventCache.isCompleteForChild(t)}function En(e,t,n){return n.foreach(((e,n)=>{t=t.updateChild(e,n)})),t}function Cn(e,t,n,r,i,a,o,s){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let l,c=t;l=_e(n)?r:new Ht(null).setTree(n,r);const d=t.serverCache.getNode();return l.children.inorderTraversal(((n,r)=>{if(d.hasChild(n)){const l=En(0,t.serverCache.getNode().getImmediateChild(n),r);c=_n(e,c,new pe(n),l,i,a,o,s)}})),l.children.inorderTraversal(((n,r)=>{const l=!t.serverCache.isCompleteForChild(n)&&null===r.value;if(!d.hasChild(n)&&!l){const l=En(0,t.serverCache.getNode().getImmediateChild(n),r);c=_n(e,c,new pe(n),l,i,a,o,s)}})),c}class Tn{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const n=this.query_._queryParams,r=new ft(n.getIndex()),i=(a=n).loadsAllData()?new ft(a.getIndex()):a.hasLimit()?new gt(a):new mt(a);var a;this.processor_=function(e){return{filter:e}}(i);const o=t.serverCache,s=t.eventCache,l=r.updateFullNode(it.EMPTY_NODE,o.getNode(),null),c=i.updateFullNode(it.EMPTY_NODE,s.getNode(),null),d=new Dt(l,o.isFullyInitialized(),r.filtersNodes()),u=new Dt(c,s.isFullyInitialized(),i.filtersNodes());this.viewCache_=Ft(u,d),this.eventGenerator_=new Mt(this.query_)}get query(){return this.query_}}function In(e,t){const n=Bt(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!_e(t)&&!n.getImmediateChild(me(t)).isEmpty())?n.getChild(t):null}function jn(e){return 0===e.eventRegistrations_.length}function Pn(e,t,n){const r=[];if(n){(0,a.vA)(null==t,"A cancel should cancel all event registrations.");const i=e.query._path;e.eventRegistrations_.forEach((e=>{const t=e.createCancelEvent(n,i);t&&r.push(t)}))}if(t){let n=[];for(let r=0;r<e.eventRegistrations_.length;++r){const i=e.eventRegistrations_[r];if(i.matches(t)){if(t.hasAnyCallback()){n=n.concat(e.eventRegistrations_.slice(r+1));break}}else n.push(i)}e.eventRegistrations_=n}else e.eventRegistrations_=[];return r}function An(e,t,n,r){t.type===jt.MERGE&&null!==t.source.queryId&&((0,a.vA)(Bt(e.viewCache_),"We should always have a full cache before handling merges"),(0,a.vA)(Ut(e.viewCache_),"Missing event cache, even though we have a server cache"));const i=e.viewCache_,o=xn(e.processor_,i,t,n,r);var s,l;return s=e.processor_,l=o.viewCache,(0,a.vA)(l.eventCache.getNode().isIndexed(s.filter.getIndex()),"Event snap not indexed"),(0,a.vA)(l.serverCache.getNode().isIndexed(s.filter.getIndex()),"Server snap not indexed"),(0,a.vA)(o.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),e.viewCache_=o.viewCache,Nn(e,o.changes,o.viewCache.eventCache.getNode(),null)}function Nn(e,t,n,r){const i=r?[r]:e.eventRegistrations_;return function(e,t,n,r){const i=[],a=[];return t.forEach((t=>{var n;"child_changed"===t.type&&e.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)&&a.push((n=t.childName,{type:"child_moved",snapshotNode:t.snapshotNode,childName:n}))})),Lt(e,i,"child_removed",t,r,n),Lt(e,i,"child_added",t,r,n),Lt(e,i,"child_moved",a,r,n),Lt(e,i,"child_changed",t,r,n),Lt(e,i,"value",t,r,n),i}(e.eventGenerator_,t,n,i)}let Rn,On;class Dn{constructor(){this.views=new Map}}function Mn(e,t,n,r){const i=t.source.queryId;if(null!==i){const o=e.views.get(i);return(0,a.vA)(null!=o,"SyncTree gave us an op for an invalid query."),An(o,t,n,r)}{let i=[];for(const a of e.views.values())i=i.concat(An(a,t,n,r));return i}}function Ln(e,t,n,r,i){const a=t._queryIdentifier,o=e.views.get(a);if(!o){let e=cn(n,i?r:null),a=!1;e?a=!0:r instanceof it?(e=dn(n,r),a=!1):(e=it.EMPTY_NODE,a=!1);const o=Ft(new Dt(e,a,!1),new Dt(r,i,!1));return new Tn(t,o)}return o}function Fn(e,t,n,r,i,a){const o=Ln(e,t,r,i,a);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,o),function(e,t){e.eventRegistrations_.push(t)}(o,n),function(e,t){const n=e.viewCache_.eventCache,r=[];n.getNode().isLeafNode()||n.getNode().forEachChild(Ze,((e,t)=>{r.push(ut(e,t))}));return n.isFullyInitialized()&&r.push(dt(n.getNode())),Nn(e,r,n.getNode(),t)}(o,n)}function zn(e,t,n,r){const i=t._queryIdentifier,o=[];let s=[];const l=Hn(e);if("default"===i)for(const[a,c]of e.views.entries())s=s.concat(Pn(c,n,r)),jn(c)&&(e.views.delete(a),c.query._queryParams.loadsAllData()||o.push(c.query));else{const t=e.views.get(i);t&&(s=s.concat(Pn(t,n,r)),jn(t)&&(e.views.delete(i),t.query._queryParams.loadsAllData()||o.push(t.query)))}return l&&!Hn(e)&&o.push(new((0,a.vA)(Rn,"Reference.ts has not been loaded"),Rn)(t._repo,t._path)),{removed:o,events:s}}function $n(e){const t=[];for(const n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function Un(e,t){let n=null;for(const r of e.views.values())n=n||In(r,t);return n}function Bn(e,t){if(t._queryParams.loadsAllData())return Vn(e);{const n=t._queryIdentifier;return e.views.get(n)}}function Wn(e,t){return null!=Bn(e,t)}function Hn(e){return null!=Vn(e)}function Vn(e){for(const t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}let qn=1;class Gn{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Ht(null),this.pendingWriteTree_={visibleWrites:Vt.empty(),allWrites:[],lastWriteId:-1},this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Kn(e,t,n,r,i){return function(e,t,n,r,i){(0,a.vA)(r>e.lastWriteId,"Stacking an older write on top of newer ones"),void 0===i&&(i=!0),e.allWrites.push({path:t,snap:n,writeId:r,visible:i}),i&&(e.visibleWrites=qt(e.visibleWrites,t,n)),e.lastWriteId=r}(e.pendingWriteTree_,t,n,r,i),i?rr(e,new Rt({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,n)):[]}function Yn(e,t,n,r){!function(e,t,n,r){(0,a.vA)(r>e.lastWriteId,"Stacking an older merge on top of newer ones"),e.allWrites.push({path:t,children:n,writeId:r,visible:!0}),e.visibleWrites=Gt(e.visibleWrites,t,n),e.lastWriteId=r}(e.pendingWriteTree_,t,n,r);const i=Ht.fromObject(n);return rr(e,new Ot({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,i))}function Zn(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=function(e,t){for(let n=0;n<e.allWrites.length;n++){const r=e.allWrites[n];if(r.writeId===t)return r}return null}(e.pendingWriteTree_,t);if(rn(e.pendingWriteTree_,t)){let t=new Ht(null);return null!=r.snap?t=t.set(fe(),!0):M(r.children,(e=>{t=t.set(new pe(e),!0)})),rr(e,new At(r.path,t,n))}return[]}function Jn(e,t,n){return rr(e,new Rt({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,n))}function Qn(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];const a=t._path,o=e.syncPointTree_.get(a);let s=[];if(o&&("default"===t._queryIdentifier||Wn(o,t))){const l=zn(o,t,n,r);0===o.views.size&&(e.syncPointTree_=e.syncPointTree_.remove(a));const c=l.removed;if(s=l.events,!i){const n=-1!==c.findIndex((e=>e._queryParams.loadsAllData())),i=e.syncPointTree_.findOnPath(a,((e,t)=>Hn(t)));if(n&&!i){const t=e.syncPointTree_.subtree(a);if(!t.isEmpty()){const n=function(e){return e.fold(((e,t,n)=>{if(t&&Hn(t)){return[Vn(t)]}{let e=[];return t&&(e=$n(t)),M(n,((t,n)=>{e=e.concat(n)})),e}}))}(t);for(let t=0;t<n.length;++t){const r=n[t],i=r.query,a=or(e,r);e.listenProvider_.startListening(hr(i),sr(e,i),a.hashFn,a.onComplete)}}}if(!i&&c.length>0&&!r)if(n){const n=null;e.listenProvider_.stopListening(hr(t),n)}else c.forEach((t=>{const n=e.queryToTagMap.get(lr(t));e.listenProvider_.stopListening(hr(t),n)}))}!function(e,t){for(let n=0;n<t.length;++n){const r=t[n];if(!r._queryParams.loadsAllData()){const t=lr(r),n=e.queryToTagMap.get(t);e.queryToTagMap.delete(t),e.tagToQueryMap.delete(n)}}}(e,c)}return s}function Xn(e,t,n,r){const i=cr(e,r);if(null!=i){const r=dr(i),a=r.path,o=r.queryId,s=ke(a,t);return ur(e,a,new Rt(Pt(o),s,n))}return[]}function er(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const i=t._path;let o=null,s=!1;e.syncPointTree_.foreachOnPath(i,((e,t)=>{const n=ke(e,i);o=o||Un(t,n),s=s||Hn(t)}));let l,c=e.syncPointTree_.get(i);if(c?(s=s||Hn(c),o=o||Un(c,fe())):(c=new Dn,e.syncPointTree_=e.syncPointTree_.set(i,c)),null!=o)l=!0;else{l=!1,o=it.EMPTY_NODE;e.syncPointTree_.subtree(i).foreachChild(((e,t)=>{const n=Un(t,fe());n&&(o=o.updateImmediateChild(e,n))}))}const d=Wn(c,t);if(!d&&!t._queryParams.loadsAllData()){const n=lr(t);(0,a.vA)(!e.queryToTagMap.has(n),"View does not exist, but we have a tag");const r=qn++;e.queryToTagMap.set(n,r),e.tagToQueryMap.set(r,n)}let u=Fn(c,t,n,nn(e.pendingWriteTree_,i),o,l);if(!d&&!s&&!r){const n=Bn(c,t);u=u.concat(function(e,t,n){const r=t._path,i=sr(e,t),o=or(e,n),s=e.listenProvider_.startListening(hr(t),i,o.hashFn,o.onComplete),l=e.syncPointTree_.subtree(r);if(i)(0,a.vA)(!Hn(l.value),"If we're adding a query, it shouldn't be shadowed");else{const t=l.fold(((e,t,n)=>{if(!_e(e)&&t&&Hn(t))return[Vn(t).query];{let e=[];return t&&(e=e.concat($n(t).map((e=>e.query)))),M(n,((t,n)=>{e=e.concat(n)})),e}}));for(let n=0;n<t.length;++n){const r=t[n];e.listenProvider_.stopListening(hr(r),sr(e,r))}}return s}(e,t,n))}return u}function tr(e,t,n){const r=e.pendingWriteTree_,i=e.syncPointTree_.findOnPath(t,((e,n)=>{const r=Un(n,ke(e,t));if(r)return r}));return ln(r,t,i,n,!0)}function nr(e,t){const n=t._path;let r=null;e.syncPointTree_.foreachOnPath(n,((e,t)=>{const i=ke(e,n);r=r||Un(t,i)}));let i=e.syncPointTree_.get(n);i?r=r||Un(i,fe()):(i=new Dn,e.syncPointTree_=e.syncPointTree_.set(n,i));const a=null!=r,o=a?new Dt(r,!0,!1):null;return function(e){return Ut(e.viewCache_)}(Ln(i,t,nn(e.pendingWriteTree_,t._path),a?o.getNode():it.EMPTY_NODE,a))}function rr(e,t){return ir(t,e.syncPointTree_,null,nn(e.pendingWriteTree_,fe()))}function ir(e,t,n,r){if(_e(e.path))return ar(e,t,n,r);{const i=t.get(fe());null==n&&null!=i&&(n=Un(i,fe()));let a=[];const o=me(e.path),s=e.operationForChild(o),l=t.children.get(o);if(l&&s){const e=n?n.getImmediateChild(o):null,t=mn(r,o);a=a.concat(ir(s,l,e,t))}return i&&(a=a.concat(Mn(i,e,r,n))),a}}function ar(e,t,n,r){const i=t.get(fe());null==n&&null!=i&&(n=Un(i,fe()));let a=[];return t.children.inorderTraversal(((t,i)=>{const o=n?n.getImmediateChild(t):null,s=mn(r,t),l=e.operationForChild(t);l&&(a=a.concat(ar(l,i,o,s)))})),i&&(a=a.concat(Mn(i,e,r,n))),a}function or(e,t){const n=t.query,r=sr(e,n);return{hashFn:()=>{const e=function(e){return e.viewCache_.serverCache.getNode()}(t)||it.EMPTY_NODE;return e.hash()},onComplete:t=>{if("ok"===t)return r?function(e,t,n){const r=cr(e,n);if(r){const n=dr(r),i=n.path,a=n.queryId,o=ke(i,t);return ur(e,i,new Nt(Pt(a),o))}return[]}(e,n._path,r):function(e,t){return rr(e,new Nt({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t))}(e,n._path);{const r=function(e,t){let n="Unknown Error";"too_big"===e?n="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"===e?n="Client doesn't have permission to access the desired data.":"unavailable"===e&&(n="The service is unavailable");const r=new Error(e+" at "+t._path.toString()+": "+n);return r.code=e.toUpperCase(),r}(t,n);return Qn(e,n,null,r)}}}}function sr(e,t){const n=lr(t);return e.queryToTagMap.get(n)}function lr(e){return e._path.toString()+"$"+e._queryIdentifier}function cr(e,t){return e.tagToQueryMap.get(t)}function dr(e){const t=e.indexOf("$");return(0,a.vA)(-1!==t&&t<e.length-1,"Bad queryKey."),{queryId:e.substr(t+1),path:new pe(e.substr(0,t))}}function ur(e,t,n){const r=e.syncPointTree_.get(t);(0,a.vA)(r,"Missing sync point for query tag that we're tracking");return Mn(r,n,nn(e.pendingWriteTree_,t),null)}function hr(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new((0,a.vA)(On,"Reference.ts has not been loaded"),On)(e._repo,e._path):e}class pr{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new pr(t)}node(){return this.node_}}class fr{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=we(this.path_,e);return new fr(this.syncTree_,t)}node(){return tr(this.syncTree_,this.path_)}}const mr=function(e){return(e=e||{}).timestamp=e.timestamp||(new Date).getTime(),e},gr=function(e,t,n){return e&&"object"===typeof e?((0,a.vA)(".sv"in e,"Unexpected leaf node or priority contents"),"string"===typeof e[".sv"]?br(e[".sv"],t,n):"object"===typeof e[".sv"]?yr(e[".sv"],t):void(0,a.vA)(!1,"Unexpected server value: "+JSON.stringify(e,null,2))):e},br=function(e,t,n){if("timestamp"===e)return n.timestamp;(0,a.vA)(!1,"Unexpected server value: "+e)},yr=function(e,t,n){e.hasOwnProperty("increment")||(0,a.vA)(!1,"Unexpected server value: "+JSON.stringify(e,null,2));const r=e.increment;"number"!==typeof r&&(0,a.vA)(!1,"Unexpected increment value: "+r);const i=t.node();if((0,a.vA)(null!==i&&"undefined"!==typeof i,"Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return"number"!==typeof o?r:o+r},vr=function(e,t,n,r){return wr(t,new fr(n,e),r)},xr=function(e,t,n){return wr(e,new pr(t),n)};function wr(e,t,n){const r=e.getPriority().val(),i=gr(r,t.getImmediateChild(".priority"),n);let a;if(e.isLeafNode()){const r=e,a=gr(r.getValue(),t,n);return a!==r.getValue()||i!==r.getPriority().val()?new Ye(a,st(i)):e}{const r=e;return a=r,i!==r.getPriority().val()&&(a=a.updatePriority(new Ye(i))),r.forEachChild(Ze,((e,r)=>{const i=wr(r,t.getImmediateChild(e),n);i!==r&&(a=a.updateImmediateChild(e,i))})),a}}class _r{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:{},childCount:0};this.name=e,this.parent=t,this.node=n}}function kr(e,t){let n=t instanceof pe?t:new pe(t),r=e,i=me(n);for(;null!==i;){const e=(0,a.yw)(r.node.children,i)||{children:{},childCount:0};r=new _r(i,r,e),n=be(n),i=me(n)}return r}function Sr(e){return e.node.value}function Er(e,t){e.node.value=t,Pr(e)}function Cr(e){return e.node.childCount>0}function Tr(e,t){M(e.node.children,((n,r)=>{t(new _r(n,e,r))}))}function Ir(e,t,n,r){n&&!r&&t(e),Tr(e,(e=>{Ir(e,t,!0,r)})),n&&r&&t(e)}function jr(e){return new pe(null===e.parent?e.name:jr(e.parent)+"/"+e.name)}function Pr(e){null!==e.parent&&function(e,t,n){const r=function(e){return void 0===Sr(e)&&!Cr(e)}(n),i=(0,a.gR)(e.node.children,t);r&&i?(delete e.node.children[t],e.node.childCount--,Pr(e)):r||i||(e.node.children[t]=n.node,e.node.childCount++,Pr(e))}(e.parent,e.name,e)}const Ar=/[\[\].#$\/\u0000-\u001F\u007F]/,Nr=/[\[\].#$\u0000-\u001F\u007F]/,Rr=10485760,Or=function(e){return"string"===typeof e&&0!==e.length&&!Ar.test(e)},Dr=function(e){return"string"===typeof e&&0!==e.length&&!Nr.test(e)},Mr=function(e){return null===e||"string"===typeof e||"number"===typeof e&&!I(e)||e&&"object"===typeof e&&(0,a.gR)(e,".sv")},Lr=function(e,t,n,r){r&&void 0===t||Fr((0,a.dI)(e,"value"),t,n)},Fr=function(e,t,n){const r=n instanceof pe?new Te(n,e):n;if(void 0===t)throw new Error(e+"contains undefined "+je(r));if("function"===typeof t)throw new Error(e+"contains a function "+je(r)+" with contents = "+t.toString());if(I(t))throw new Error(e+"contains "+t.toString()+" "+je(r));if("string"===typeof t&&t.length>Rr/3&&(0,a.OE)(t)>Rr)throw new Error(e+"contains a string greater than "+Rr+" utf8 bytes "+je(r)+" ('"+t.substring(0,50)+"...')");if(t&&"object"===typeof t){let n=!1,i=!1;if(M(t,((t,o)=>{if(".value"===t)n=!0;else if(".priority"!==t&&".sv"!==t&&(i=!0,!Or(t)))throw new Error(e+" contains an invalid key ("+t+") "+je(r)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');!function(e,t){e.parts_.length>0&&(e.byteLength_+=1),e.parts_.push(t),e.byteLength_+=(0,a.OE)(t),Ie(e)}(r,t),Fr(e,o,r),function(e){const t=e.parts_.pop();e.byteLength_-=(0,a.OE)(t),e.parts_.length>0&&(e.byteLength_-=1)}(r)})),n&&i)throw new Error(e+' contains ".value" child '+je(r)+" in addition to actual children.")}},zr=function(e,t,n,r){if(r&&void 0===t)return;const i=(0,a.dI)(e,"values");if(!t||"object"!==typeof t||Array.isArray(t))throw new Error(i+" must be an object containing the children to replace.");const o=[];M(t,((e,t)=>{const r=new pe(e);if(Fr(i,t,we(n,r)),".priority"===ye(r)&&!Mr(t))throw new Error(i+"contains an invalid value for '"+r.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");o.push(r)})),function(e,t){let n,r;for(n=0;n<t.length;n++){r=t[n];const i=ve(r);for(let t=0;t<i.length;t++)if(".priority"===i[t]&&t===i.length-1);else if(!Or(i[t]))throw new Error(e+"contains an invalid key ("+i[t]+") in path "+r.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"')}t.sort(Se);let i=null;for(n=0;n<t.length;n++){if(r=t[n],null!==i&&Ce(i,r))throw new Error(e+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}}(i,o)},$r=function(e,t,n){if(!n||void 0!==t){if(I(t))throw new Error((0,a.dI)(e,"priority")+"is "+t.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Mr(t))throw new Error((0,a.dI)(e,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")}},Ur=function(e,t,n,r){if((!r||void 0!==n)&&!Dr(n))throw new Error((0,a.dI)(e,t)+'was an invalid path = "'+n+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')},Br=function(e,t,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Ur(e,t,n,r)},Wr=function(e,t){if(".info"===me(t))throw new Error(e+" failed = Can't modify data under /.info/")},Hr=function(e,t){const n=t.path.toString();if("string"!==typeof t.repoInfo.host||0===t.repoInfo.host.length||!Or(t.repoInfo.namespace)&&"localhost"!==t.repoInfo.host.split(":")[0]||0!==n.length&&!function(e){return e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),Dr(e)}(n))throw new Error((0,a.dI)(e,"url")+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')};class Vr{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function qr(e,t){let n=null;for(let r=0;r<t.length;r++){const i=t[r],a=i.getPath();null===n||Ee(a,n.path)||(e.eventLists_.push(n),n=null),null===n&&(n={events:[],path:a}),n.events.push(i)}n&&e.eventLists_.push(n)}function Gr(e,t,n){qr(e,n),Yr(e,(e=>Ee(e,t)))}function Kr(e,t,n){qr(e,n),Yr(e,(e=>Ce(e,t)||Ce(t,e)))}function Yr(e,t){e.recursionDepth_++;let n=!0;for(let r=0;r<e.eventLists_.length;r++){const i=e.eventLists_[r];if(i){t(i.path)?(Zr(e.eventLists_[r]),e.eventLists_[r]=null):n=!1}}n&&(e.eventLists_=[]),e.recursionDepth_--}function Zr(e){for(let t=0;t<e.events.length;t++){const n=e.events[t];if(null!==n){e.events[t]=null;const r=n.getEventRunner();x&&k("event: "+n.toString()),$(r)}}}const Jr="repo_interrupt",Qr=25;class Xr{constructor(e,t,n,r){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Vr,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=kt(),this.transactionQueueTree_=new _r,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function ei(e,t,n){if(e.stats_=te(e.repoInfo_),e.forceRestClient_||("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0)e.server_=new wt(e.repoInfo_,((t,n,r,i)=>{ri(e,t,n,r,i)}),e.authTokenProvider_,e.appCheckProvider_),setTimeout((()=>ii(e,!0)),0);else{if("undefined"!==typeof n&&null!==n){if("object"!==typeof n)throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{(0,a.As)(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}e.persistentConnection_=new Ne(e.repoInfo_,t,((t,n,r,i)=>{ri(e,t,n,r,i)}),(t=>{ii(e,t)}),(t=>{!function(e,t){M(t,((t,n)=>{ai(e,t,n)}))}(e,t)}),e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener((t=>{e.server_.refreshAuthToken(t)})),e.appCheckProvider_.addTokenChangeListener((t=>{e.server_.refreshAppCheckToken(t.token)})),e.statsReporter_=function(e,t){const n=e.toString();return ee[n]||(ee[n]=t()),ee[n]}(e.repoInfo_,(()=>new It(e.stats_,e.server_))),e.infoData_=new _t,e.infoSyncTree_=new Gn({startListening:(t,n,r,i)=>{let a=[];const o=e.infoData_.getNode(t._path);return o.isEmpty()||(a=Jn(e.infoSyncTree_,t._path,o),setTimeout((()=>{i("ok")}),0)),a},stopListening:()=>{}}),ai(e,"connected",!1),e.serverSyncTree_=new Gn({startListening:(t,n,r,i)=>(e.server_.listen(t,r,n,((n,r)=>{const a=i(n,r);Kr(e.eventQueue_,t._path,a)})),[]),stopListening:(t,n)=>{e.server_.unlisten(t,n)}})}function ti(e){const t=e.infoData_.getNode(new pe(".info/serverTimeOffset")).val()||0;return(new Date).getTime()+t}function ni(e){return mr({timestamp:ti(e)})}function ri(e,t,n,r,i){e.dataUpdateCount++;const o=new pe(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let s=[];if(i)if(r){const t=(0,a.kH)(n,(e=>st(e)));s=function(e,t,n,r){const i=cr(e,r);if(i){const r=dr(i),a=r.path,o=r.queryId,s=ke(a,t),l=Ht.fromObject(n);return ur(e,a,new Ot(Pt(o),s,l))}return[]}(e.serverSyncTree_,o,t,i)}else{const t=st(n);s=Xn(e.serverSyncTree_,o,t,i)}else if(r){const t=(0,a.kH)(n,(e=>st(e)));s=function(e,t,n){const r=Ht.fromObject(n);return rr(e,new Ot({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,r))}(e.serverSyncTree_,o,t)}else{const t=st(n);s=Jn(e.serverSyncTree_,o,t)}let l=o;s.length>0&&(l=gi(e,o)),Kr(e.eventQueue_,l,s)}function ii(e,t){ai(e,"connected",t),!1===t&&function(e){hi(e,"onDisconnectEvents");const t=ni(e),n=kt();Ct(e.onDisconnect_,fe(),((r,i)=>{const a=vr(r,i,e.serverSyncTree_,t);St(n,r,a)}));let r=[];Ct(n,fe(),((t,n)=>{r=r.concat(Jn(e.serverSyncTree_,t,n));const i=wi(e,t);gi(e,i)})),e.onDisconnect_=kt(),Kr(e.eventQueue_,fe(),r)}(e)}function ai(e,t,n){const r=new pe("/.info/"+t),i=st(n);e.infoData_.updateSnapshot(r,i);const a=Jn(e.infoSyncTree_,r,i);Kr(e.eventQueue_,r,a)}function oi(e){return e.nextWriteId_++}function si(e,t,n,r,i){hi(e,"set",{path:t.toString(),value:n,priority:r});const a=ni(e),o=st(n,r),s=tr(e.serverSyncTree_,t),l=xr(o,s,a),c=oi(e),d=Kn(e.serverSyncTree_,t,l,c,!0);qr(e.eventQueue_,d),e.server_.put(t.toString(),o.val(!0),((n,r)=>{const a="ok"===n;a||T("set at "+t+" failed: "+n);const o=Zn(e.serverSyncTree_,c,!a);Kr(e.eventQueue_,t,o),pi(e,i,n,r)}));const u=wi(e,t);gi(e,u),Kr(e.eventQueue_,u,[])}function li(e,t,n){e.server_.onDisconnectCancel(t.toString(),((r,i)=>{"ok"===r&&Et(e.onDisconnect_,t),pi(e,n,r,i)}))}function ci(e,t,n,r){const i=st(n);e.server_.onDisconnectPut(t.toString(),i.val(!0),((n,a)=>{"ok"===n&&St(e.onDisconnect_,t,i),pi(e,r,n,a)}))}function di(e,t,n){let r;r=".info"===me(t._path)?Qn(e.infoSyncTree_,t,n):Qn(e.serverSyncTree_,t,n),Gr(e.eventQueue_,t._path,r)}function ui(e){e.persistentConnection_&&e.persistentConnection_.interrupt(Jr)}function hi(e){let t="";e.persistentConnection_&&(t=e.persistentConnection_.id+":");for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];k(t,...r)}function pi(e,t,n,r){t&&$((()=>{if("ok"===n)t(null);else{const e=(n||"error").toUpperCase();let i=e;r&&(i+=": "+r);const a=new Error(i);a.code=e,t(a)}}))}function fi(e,t,n){return tr(e.serverSyncTree_,t,n)||it.EMPTY_NODE}function mi(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.transactionQueueTree_;if(t||xi(e,t),Sr(t)){const n=yi(e,t);(0,a.vA)(n.length>0,"Sending zero length transaction queue");n.every((e=>0===e.status))&&function(e,t,n){const r=n.map((e=>e.currentWriteId)),i=fi(e,t,r);let o=i;const s=i.hash();for(let d=0;d<n.length;d++){const e=n[d];(0,a.vA)(0===e.status,"tryToSendTransactionQueue_: items in queue should all be run."),e.status=1,e.retryCount++;const r=ke(t,e.path);o=o.updateChild(r,e.currentOutputSnapshotRaw)}const l=o.val(!0),c=t;e.server_.put(c.toString(),l,(r=>{hi(e,"transaction put response",{path:c.toString(),status:r});let i=[];if("ok"===r){const r=[];for(let t=0;t<n.length;t++)n[t].status=2,i=i.concat(Zn(e.serverSyncTree_,n[t].currentWriteId)),n[t].onComplete&&r.push((()=>n[t].onComplete(null,!0,n[t].currentOutputSnapshotResolved))),n[t].unwatcher();xi(e,kr(e.transactionQueueTree_,t)),mi(e,e.transactionQueueTree_),Kr(e.eventQueue_,t,i);for(let e=0;e<r.length;e++)$(r[e])}else{if("datastale"===r)for(let e=0;e<n.length;e++)3===n[e].status?n[e].status=4:n[e].status=0;else{T("transaction at "+c.toString()+" failed: "+r);for(let e=0;e<n.length;e++)n[e].status=4,n[e].abortReason=r}gi(e,t)}}),s)}(e,jr(t),n)}else Cr(t)&&Tr(t,(t=>{mi(e,t)}))}function gi(e,t){const n=bi(e,t),r=jr(n);return function(e,t,n){if(0===t.length)return;const r=[];let i=[];const o=t.filter((e=>0===e.status)),s=o.map((e=>e.currentWriteId));for(let c=0;c<t.length;c++){const o=t[c],d=ke(n,o.path);let u,h=!1;if((0,a.vA)(null!==d,"rerunTransactionsUnderNode_: relativePath should not be null."),4===o.status)h=!0,u=o.abortReason,i=i.concat(Zn(e.serverSyncTree_,o.currentWriteId,!0));else if(0===o.status)if(o.retryCount>=Qr)h=!0,u="maxretry",i=i.concat(Zn(e.serverSyncTree_,o.currentWriteId,!0));else{const n=fi(e,o.path,s);o.currentInputSnapshot=n;const r=t[c].update(n.val());if(void 0!==r){Fr("transaction failed: Data returned ",r,o.path);let t=st(r);"object"===typeof r&&null!=r&&(0,a.gR)(r,".priority")||(t=t.updatePriority(n.getPriority()));const l=o.currentWriteId,c=ni(e),d=xr(t,n,c);o.currentOutputSnapshotRaw=t,o.currentOutputSnapshotResolved=d,o.currentWriteId=oi(e),s.splice(s.indexOf(l),1),i=i.concat(Kn(e.serverSyncTree_,o.path,d,o.currentWriteId,o.applyLocally)),i=i.concat(Zn(e.serverSyncTree_,l,!0))}else h=!0,u="nodata",i=i.concat(Zn(e.serverSyncTree_,o.currentWriteId,!0))}Kr(e.eventQueue_,n,i),i=[],h&&(t[c].status=2,l=t[c].unwatcher,setTimeout(l,Math.floor(0)),t[c].onComplete&&("nodata"===u?r.push((()=>t[c].onComplete(null,!1,t[c].currentInputSnapshot))):r.push((()=>t[c].onComplete(new Error(u),!1,null)))))}var l;xi(e,e.transactionQueueTree_);for(let a=0;a<r.length;a++)$(r[a]);mi(e,e.transactionQueueTree_)}(e,yi(e,n),r),r}function bi(e,t){let n,r=e.transactionQueueTree_;for(n=me(t);null!==n&&void 0===Sr(r);)r=kr(r,n),n=me(t=be(t));return r}function yi(e,t){const n=[];return vi(e,t,n),n.sort(((e,t)=>e.order-t.order)),n}function vi(e,t,n){const r=Sr(t);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);Tr(t,(t=>{vi(e,t,n)}))}function xi(e,t){const n=Sr(t);if(n){let e=0;for(let t=0;t<n.length;t++)2!==n[t].status&&(n[e]=n[t],e++);n.length=e,Er(t,n.length>0?n:void 0)}Tr(t,(t=>{xi(e,t)}))}function wi(e,t){const n=jr(bi(e,t)),r=kr(e.transactionQueueTree_,t);return function(e,t,n){let r=n?e:e.parent;for(;null!==r;){if(t(r))return!0;r=r.parent}}(r,(t=>{_i(e,t)})),_i(e,r),Ir(r,(t=>{_i(e,t)})),n}function _i(e,t){const n=Sr(t);if(n){const r=[];let i=[],o=-1;for(let t=0;t<n.length;t++)3===n[t].status||(1===n[t].status?((0,a.vA)(o===t-1,"All SENT items should be at beginning of queue."),o=t,n[t].status=3,n[t].abortReason="set"):((0,a.vA)(0===n[t].status,"Unexpected transaction status in abort"),n[t].unwatcher(),i=i.concat(Zn(e.serverSyncTree_,n[t].currentWriteId,!0)),n[t].onComplete&&r.push(n[t].onComplete.bind(null,new Error("set"),!1,null))));-1===o?Er(t,void 0):n.length=o+1,Kr(e.eventQueue_,jr(t),i);for(let e=0;e<r.length;e++)$(r[e])}}const ki=function(e,t){const n=Si(e),r=n.namespace;"firebase.com"===n.domain&&C(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),r&&"undefined"!==r||"localhost"===n.domain||C("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&T("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");const i="ws"===n.scheme||"wss"===n.scheme;return{repoInfo:new Z(n.host,n.secure,r,i,t,"",r!==n.subdomain),path:new pe(n.pathString)}},Si=function(e){let t="",n="",r="",i="",a="",o=!0,s="https",l=443;if("string"===typeof e){let c=e.indexOf("//");c>=0&&(s=e.substring(0,c-1),e=e.substring(c+2));let d=e.indexOf("/");-1===d&&(d=e.length);let u=e.indexOf("?");-1===u&&(u=e.length),t=e.substring(0,Math.min(d,u)),d<u&&(i=function(e){let t="";const n=e.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let e=n[i];try{e=decodeURIComponent(e.replace(/\+/g," "))}catch(r){}t+="/"+e}return t}(e.substring(d,u)));const h=function(e){const t={};"?"===e.charAt(0)&&(e=e.substring(1));for(const n of e.split("&")){if(0===n.length)continue;const r=n.split("=");2===r.length?t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):T(`Invalid query segment '${n}' in query '${e}'`)}return t}(e.substring(Math.min(e.length,u)));c=t.indexOf(":"),c>=0?(o="https"===s||"wss"===s,l=parseInt(t.substring(c+1),10)):c=t.length;const p=t.slice(0,c);if("localhost"===p.toLowerCase())n="localhost";else if(p.split(".").length<=2)n=p;else{const e=t.indexOf(".");r=t.substring(0,e).toLowerCase(),n=t.substring(e+1),a=r}"ns"in h&&(a=h.ns)}return{host:t,port:l,domain:n,subdomain:r,secure:o,scheme:s,pathString:i,namespace:a}},Ei="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Ci=function(){let e=0;const t=[];return function(n){const r=n===e;let i;e=n;const o=new Array(8);for(i=7;i>=0;i--)o[i]=Ei.charAt(n%64),n=Math.floor(n/64);(0,a.vA)(0===n,"Cannot push at time == 0");let s=o.join("");if(r){for(i=11;i>=0&&63===t[i];i--)t[i]=0;t[i]++}else for(i=0;i<12;i++)t[i]=Math.floor(64*Math.random());for(i=0;i<12;i++)s+=Ei.charAt(t[i]);return(0,a.vA)(20===s.length,"nextPushId: Length should be 20."),s}}();class Ti{constructor(e,t,n,r){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=r}getPath(){const e=this.snapshot.ref;return"value"===this.eventType?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+(0,a.As)(this.snapshot.exportVal())}}class Ii{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}class ji{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return(0,a.vA)(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||void 0!==this.snapshotCallback.userCallback&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}class Pi{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new a.cY;return li(this._repo,this._path,e.wrapCallback((()=>{}))),e.promise}remove(){Wr("OnDisconnect.remove",this._path);const e=new a.cY;return ci(this._repo,this._path,null,e.wrapCallback((()=>{}))),e.promise}set(e){Wr("OnDisconnect.set",this._path),Lr("OnDisconnect.set",e,this._path,!1);const t=new a.cY;return ci(this._repo,this._path,e,t.wrapCallback((()=>{}))),t.promise}setWithPriority(e,t){Wr("OnDisconnect.setWithPriority",this._path),Lr("OnDisconnect.setWithPriority",e,this._path,!1),$r("OnDisconnect.setWithPriority",t,!1);const n=new a.cY;return function(e,t,n,r,i){const a=st(n,r);e.server_.onDisconnectPut(t.toString(),a.val(!0),((n,r)=>{"ok"===n&&St(e.onDisconnect_,t,a),pi(0,i,n,r)}))}(this._repo,this._path,e,t,n.wrapCallback((()=>{}))),n.promise}update(e){Wr("OnDisconnect.update",this._path),zr("OnDisconnect.update",e,this._path,!1);const t=new a.cY;return function(e,t,n,r){if((0,a.Im)(n))return k("onDisconnect().update() called with empty data.  Don't do anything."),void pi(0,r,"ok",void 0);e.server_.onDisconnectMerge(t.toString(),n,((i,a)=>{"ok"===i&&M(n,((n,r)=>{const i=st(r);St(e.onDisconnect_,we(t,n),i)})),pi(0,r,i,a)}))}(this._repo,this._path,e,t.wrapCallback((()=>{}))),t.promise}}class Ai{constructor(e,t,n,r){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=r}get key(){return _e(this._path)?null:ye(this._path)}get ref(){return new Oi(this._repo,this._path)}get _queryIdentifier(){const e=xt(this._queryParams),t=O(e);return"{}"===t?"default":t}get _queryObject(){return xt(this._queryParams)}isEqual(e){if(!((e=(0,a.Ku)(e))instanceof Ai))return!1;const t=this._repo===e._repo,n=Ee(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return t&&n&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+function(e){let t="";for(let n=e.pieceNum_;n<e.pieces_.length;n++)""!==e.pieces_[n]&&(t+="/"+encodeURIComponent(String(e.pieces_[n])));return t||"/"}(this._path)}}function Ni(e,t){if(!0===e._orderByCalled)throw new Error(t+": You can't combine multiple orderBy calls.")}function Ri(e){let t=null,n=null;if(e.hasStart()&&(t=e.getIndexStartValue()),e.hasEnd()&&(n=e.getIndexEndValue()),e.getIndex()===Le){const r="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(e.hasStart()){if(e.getIndexStartName()!==j)throw new Error(r);if("string"!==typeof t)throw new Error(i)}if(e.hasEnd()){if(e.getIndexEndName()!==P)throw new Error(r);if("string"!==typeof n)throw new Error(i)}}else if(e.getIndex()===Ze){if(null!=t&&!Mr(t)||null!=n&&!Mr(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if((0,a.vA)(e.getIndex()instanceof lt||e.getIndex()===ct,"unknown index type."),null!=t&&"object"===typeof t||null!=n&&"object"===typeof n)throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class Oi extends Ai{constructor(e,t){super(e,t,new bt,!1)}get parent(){const e=xe(this._path);return null===e?null:new Oi(this._repo,e)}get root(){let e=this;for(;null!==e.parent;)e=e.parent;return e}}class Di{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new pe(e),n=Li(this.ref,e);return new Di(this._node.getChild(t),n,Ze)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){if(this._node.isLeafNode())return!1;return!!this._node.forEachChild(this._index,((t,n)=>e(new Di(n,Li(this.ref,t),Ze))))}hasChild(e){const t=new pe(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return!this._node.isLeafNode()&&!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Mi(e,t){return(e=(0,a.Ku)(e))._checkNotDeleted("ref"),void 0!==t?Li(e._root,t):e._root}function Li(e,t){return null===me((e=(0,a.Ku)(e))._path)?Br("child","path",t,!1):Ur("child","path",t,!1),new Oi(e._repo,we(e._path,t))}function Fi(e){return e=(0,a.Ku)(e),new Pi(e._repo,e._path)}function zi(e,t){e=(0,a.Ku)(e),Wr("push",e._path),Lr("push",t,e._path,!0);const n=ti(e._repo),r=Ci(n),i=Li(e,r),o=Li(e,r);let s;return s=null!=t?Ui(o,t).then((()=>o)):Promise.resolve(o),i.then=s.then.bind(s),i.catch=s.then.bind(s,void 0),i}function $i(e){return Wr("remove",e._path),Ui(e,null)}function Ui(e,t){e=(0,a.Ku)(e),Wr("set",e._path),Lr("set",t,e._path,!1);const n=new a.cY;return si(e._repo,e._path,t,null,n.wrapCallback((()=>{}))),n.promise}function Bi(e,t){zr("update",t,e._path,!1);const n=new a.cY;return function(e,t,n,r){hi(e,"update",{path:t.toString(),value:n});let i=!0;const a=ni(e),o={};if(M(n,((n,r)=>{i=!1,o[n]=vr(we(t,n),st(r),e.serverSyncTree_,a)})),i)k("update() called with empty data.  Don't do anything."),pi(0,r,"ok",void 0);else{const i=oi(e),a=Yn(e.serverSyncTree_,t,o,i);qr(e.eventQueue_,a),e.server_.merge(t.toString(),n,((n,a)=>{const o="ok"===n;o||T("update at "+t+" failed: "+n);const s=Zn(e.serverSyncTree_,i,!o),l=s.length>0?gi(e,t):t;Kr(e.eventQueue_,l,s),pi(0,r,n,a)})),M(n,(n=>{const r=wi(e,we(t,n));gi(e,r)})),Kr(e.eventQueue_,t,[])}}(e._repo,e._path,t,n.wrapCallback((()=>{}))),n.promise}function Wi(e){e=(0,a.Ku)(e);const t=new ji((()=>{})),n=new Hi(t);return function(e,t,n){const r=nr(e.serverSyncTree_,t);return null!=r?Promise.resolve(r):e.server_.get(t).then((r=>{const i=st(r).withIndex(t._queryParams.getIndex());let a;if(er(e.serverSyncTree_,t,n,!0),t._queryParams.loadsAllData())a=Jn(e.serverSyncTree_,t._path,i);else{const n=sr(e.serverSyncTree_,t);a=Xn(e.serverSyncTree_,t._path,i,n)}return Kr(e.eventQueue_,t._path,a),Qn(e.serverSyncTree_,t,n,null,!0),i}),(n=>(hi(e,"get for query "+(0,a.As)(t)+" failed: "+n),Promise.reject(new Error(n)))))}(e._repo,e,n).then((t=>new Di(t,new Oi(e._repo,e._path),e._queryParams.getIndex())))}class Hi{constructor(e){this.callbackContext=e}respondsTo(e){return"value"===e}createEvent(e,t){const n=t._queryParams.getIndex();return new Ti("value",this,new Di(e.snapshotNode,new Oi(t._repo,t._path),n))}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ii(this,e,t):null}matches(e){return e instanceof Hi&&(!e.callbackContext||!this.callbackContext||e.callbackContext.matches(this.callbackContext))}hasAnyCallback(){return null!==this.callbackContext}}class Vi{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t="children_added"===e?"child_added":e;return t="children_removed"===t?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ii(this,e,t):null}createEvent(e,t){(0,a.vA)(null!=e.childName,"Child events should have a childName.");const n=Li(new Oi(t._repo,t._path),e.childName),r=t._queryParams.getIndex();return new Ti(e.type,this,new Di(e.snapshotNode,n,r),e.prevName)}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Vi&&(this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)))}hasAnyCallback(){return!!this.callbackContext}}function qi(e,t,n,r,i){let a;if("object"===typeof r&&(a=void 0,i=r),"function"===typeof r&&(a=r),i&&i.onlyOnce){const t=n,r=(n,r)=>{di(e._repo,e,s),t(n,r)};r.userCallback=n.userCallback,r.context=n.context,n=r}const o=new ji(n,a||void 0),s="value"===t?new Hi(o):new Vi(t,o);return function(e,t,n){let r;r=".info"===me(t._path)?er(e.infoSyncTree_,t,n):er(e.serverSyncTree_,t,n),Gr(e.eventQueue_,t._path,r)}(e._repo,e,s),()=>di(e._repo,e,s)}function Gi(e,t,n,r){return qi(e,"value",t,n,r)}function Ki(e,t,n){let r=null;const i=n?new ji(n):null;"value"===t?r=new Hi(i):t&&(r=new Vi(t,i)),di(e._repo,e,r)}class Yi{}class Zi extends Yi{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ai(e._repo,e._path,function(e,t){const n=e.copy();return n.limitSet_=!0,n.limit_=t,n.viewFrom_="r",n}(e._queryParams,this._limit),e._orderByCalled)}}function Ji(e){if("number"!==typeof e||Math.floor(e)!==e||e<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new Zi(e)}class Qi extends Yi{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){Ni(e,"orderByChild");const t=new pe(this._path);if(_e(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const n=new lt(t),r=yt(e._queryParams,n);return Ri(r),new Ai(e._repo,e._path,r,!0)}}function Xi(e){if("$key"===e)throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if("$priority"===e)throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if("$value"===e)throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return Ur("orderByChild","path",e,!1),new Qi(e)}function ea(e){let t=(0,a.Ku)(e);for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];for(const a of r)t=a._apply(t);return t}!function(e){(0,a.vA)(!Rn,"__referenceConstructor has already been defined"),Rn=e}(Oi),function(e){(0,a.vA)(!On,"__referenceConstructor has already been defined"),On=e}(Oi);const ta={};let na=!1;function ra(e,t,n,r,i){let a=r||e.options.databaseURL;void 0===a&&(e.options.projectId||C("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),k("Using default host for project ",e.options.projectId),a=`${e.options.projectId}-default-rtdb.firebaseio.com`);let o,s,l=ki(a,i),c=l.repoInfo;"undefined"!==typeof process&&(s={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.FIREBASE_DATABASE_EMULATOR_HOST),s?(o=!0,a=`http://${s}?ns=${c.namespace}`,l=ki(a,i),c=l.repoInfo):o=!l.repoInfo.secure;const d=i&&o?new H(H.OWNER):new W(e.name,e.options,t);Hr("Invalid Firebase Database URL",l),_e(l.path)||C("Database URL must point to the root of a Firebase Database (not including a child path).");const u=function(e,t,n,r){let i=ta[t.name];i||(i={},ta[t.name]=i);let a=i[e.toURLString()];a&&C("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");return a=new Xr(e,na,n,r),i[e.toURLString()]=a,a}(c,e,d,new B(e,n));return new ia(u,e)}class ia{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(ei(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Oi(this._repo,fe())),this._rootInternal}_delete(){return null!==this._rootInternal&&(!function(e,t){const n=ta[t];n&&n[e.key]===e||C(`Database ${t}(${e.repoInfo_}) has already been deleted.`),ui(e),delete n[e.key]}(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){null===this._rootInternal&&C("Cannot call "+e+" on a deleted database.")}}function aa(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Sx)(),t=arguments.length>1?arguments[1]:void 0;const n=(0,r.j6)(e,"database").getImmediate({identifier:t});if(!n._instanceStarted){const e=(0,a.yU)("database");e&&function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};e=(0,a.Ku)(e),e._checkNotDeleted("useEmulator");const i=`${t}:${n}`,o=e._repoInternal;if(e._instanceStarted){if(i===e._repoInternal.repoInfo_.host&&(0,a.bD)(r,o.repoInfo_.emulatorOptions))return;C("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let s;if(o.repoInfo_.nodeAdmin)r.mockUserToken&&C('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),s=new H(H.OWNER);else if(r.mockUserToken){const t="string"===typeof r.mockUserToken?r.mockUserToken:(0,a.Fy)(r.mockUserToken,e.app.options.projectId);s=new H(t)}(0,a.zJ)(t)&&(0,a.gE)(t);!function(e,t,n,r){const i=t.lastIndexOf(":"),o=t.substring(0,i),s=(0,a.zJ)(o);e.repoInfo_=new Z(t,s,e.repoInfo_.namespace,e.repoInfo_.webSocketOnly,e.repoInfo_.nodeAdmin,e.repoInfo_.persistenceKey,e.repoInfo_.includeNamespaceInQueryParams,!0,n),r&&(e.authTokenProvider_=r)}(o,i,r,s)}(n,...e)}return n}const oa={".sv":"timestamp"};function sa(){return oa}class la{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function ca(e,t,n){if(e=(0,a.Ku)(e),Wr("Reference.transaction",e._path),".length"===e.key||".keys"===e.key)throw"Reference.transaction failed: "+e.key+" is a read-only object.";const r=n?.applyLocally??!0,i=new a.cY,o=Gi(e,(()=>{}));return function(e,t,n,r,i,o){hi(e,"transaction on "+t);const s={path:t,update:n,onComplete:r,status:null,order:b(),applyLocally:o,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},l=fi(e,t,void 0);s.currentInputSnapshot=l;const c=s.update(l.val());if(void 0===c)s.unwatcher(),s.currentOutputSnapshotRaw=null,s.currentOutputSnapshotResolved=null,s.onComplete&&s.onComplete(null,!1,s.currentInputSnapshot);else{Fr("transaction failed: Data returned ",c,s.path),s.status=0;const n=kr(e.transactionQueueTree_,t),r=Sr(n)||[];let i;r.push(s),Er(n,r),"object"===typeof c&&null!==c&&(0,a.gR)(c,".priority")?(i=(0,a.yw)(c,".priority"),(0,a.vA)(Mr(i),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):i=(tr(e.serverSyncTree_,t)||it.EMPTY_NODE).getPriority().val();const o=ni(e),d=st(c,i),u=xr(d,l,o);s.currentOutputSnapshotRaw=d,s.currentOutputSnapshotResolved=u,s.currentWriteId=oi(e);const h=Kn(e.serverSyncTree_,t,u,s.currentWriteId,s.applyLocally);Kr(e.eventQueue_,t,h),mi(e,e.transactionQueueTree_)}}(e._repo,e._path,t,((t,n,r)=>{let a=null;t?i.reject(t):(a=new Di(r,new Oi(e._repo,e._path),Ze),i.resolve(new la(n,a)))}),o,r),i.promise}Ne.prototype.simpleListen=function(e,t){this.sendRequest("q",{p:e},t)},Ne.prototype.echo=function(e,t){this.sendRequest("echo",{d:e},t)};var da;d(r.MF),(0,r.om)(new i.uA("database",((e,t)=>{let{instanceIdentifier:n}=t;return ra(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),n)}),"PUBLIC").setMultipleInstances(!0)),(0,r.KO)(s,l,da),(0,r.KO)(s,l,"esm2020")},853:(e,t,n)=>{"use strict";e.exports=n(234)},873:(e,t,n)=>{"use strict";n.d(t,{F0:()=>xt,eJ:()=>ut,xI:()=>Fn,hg:()=>ft,J1:()=>dt,oM:()=>pt,x9:()=>ht,CI:()=>mt});var r=n(150),i=n(776),a=n(965),o=n(606);function s(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const l=s,c=new i.FA("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),d=new a.Vy("@firebase/auth");function u(e){if(d.logLevel<=a.$b.ERROR){for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];d.error(`Auth (${r.MF}): ${e}`,...n)}}function h(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw g(e,...n)}function p(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return g(e,...n)}function f(e,t,n){const r={...l(),[t]:n};return new i.FA("auth","Firebase",r).create(t,{appName:e.name})}function m(e){return f(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function g(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];if("string"!==typeof e){const t=n[0],r=[...n.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(t,...r)}return c.create(e,...n)}function b(e,t){if(!e){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];throw g(t,...r)}}function y(e){const t="INTERNAL ASSERTION FAILED: "+e;throw u(t),new Error(t)}function v(e,t){e||y(t)}function x(){return"undefined"!==typeof self&&self.location?.href||""}function w(){return"http:"===_()||"https:"===_()}function _(){return"undefined"!==typeof self&&self.location?.protocol||null}class k{constructor(e,t){this.shortDelay=e,this.longDelay=t,v(t>e,"Short delay should be less than long delay!"),this.isMobile=(0,i.jZ)()||(0,i.lV)()}get(){return"undefined"!==typeof navigator&&navigator&&"onLine"in navigator&&"boolean"===typeof navigator.onLine&&(w()||(0,i.sr)()||"connection"in navigator)&&!navigator.onLine?Math.min(5e3,this.shortDelay):this.isMobile?this.longDelay:this.shortDelay}}function S(e,t){v(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}class E{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!==typeof self&&"fetch"in self?self.fetch:"undefined"!==typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!==typeof fetch?fetch:void y("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!==typeof self&&"Headers"in self?self.Headers:"undefined"!==typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!==typeof Headers?Headers:void y("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!==typeof self&&"Response"in self?self.Response:"undefined"!==typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!==typeof Response?Response:void y("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}const C={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},T=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],I=new k(3e4,6e4);function j(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function P(e,t,n,r){return A(e,arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},(async()=>{let a={},o={};r&&("GET"===t?o=r:a={body:JSON.stringify(r)});const s=(0,i.Am)({key:e.config.apiKey,...o}).slice(1),l=await e._getAdditionalHeaders();l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode);const c={method:t,headers:l,...a};return(0,i.c1)()||(c.referrerPolicy="no-referrer"),e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(c.credentials="include"),E.fetch()(await R(e,e.config.apiHost,n,s),c)}))}async function A(e,t,n){e._canInitEmulator=!1;const r={...C,...t};try{const t=new D(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw M(e,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const t=i.ok?a.errorMessage:a.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw M(e,"credential-already-in-use",a);if("EMAIL_EXISTS"===n)throw M(e,"email-already-in-use",a);if("USER_DISABLED"===n)throw M(e,"user-disabled",a);const s=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw f(e,s,o);h(e,s)}}catch(a){if(a instanceof i.g)throw a;h(e,"network-request-failed",{message:String(a)})}}async function N(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};const a=await P(e,t,n,r,i);return"mfaPendingCredential"in a&&h(e,"multi-factor-auth-required",{_serverResponse:a}),a}async function R(e,t,n,r){const i=`${t}${n}?${r}`,a=e,o=a.config.emulator?S(e.config,i):`${e.config.apiScheme}://${i}`;if(T.includes(n)&&(await a._persistenceManagerAvailable,"COOKIE"===a._getPersistenceType())){return a._getPersistence()._getFinalTarget(o).toString()}return o}function O(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class D{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise(((e,t)=>{this.timer=setTimeout((()=>t(p(this.auth,"network-request-failed"))),I.get())}))}}function M(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=p(e,t,r);return i.customData._tokenResponse=n,i}function L(e){return void 0!==e&&void 0!==e.enterprise}class F{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return O(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function z(e,t){return P(e,"GET","/v2/recaptchaConfig",j(e,t))}async function $(e,t){return P(e,"POST","/v1/accounts:lookup",t)}function U(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}function B(e){return 1e3*Number(e)}function W(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return u("JWT malformed, contained fewer than 3 sections"),null;try{const e=(0,i.u)(n);return e?JSON.parse(e):(u("Failed to decode base64 JWT payload"),null)}catch(a){return u("Caught error parsing JWT payload as JSON",a?.toString()),null}}function H(e){const t=W(e);return b(t,"internal-error"),b("undefined"!==typeof t.exp,"internal-error"),b("undefined"!==typeof t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}async function V(e,t){if(arguments.length>2&&void 0!==arguments[2]&&arguments[2])return t;try{return await t}catch(n){throw n instanceof i.g&&function(e){let{code:t}=e;return"auth/user-disabled"===t||"auth/user-token-expired"===t}(n)&&e.auth.currentUser===e&&await e.auth.signOut(),n}}class q{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout((async()=>{await this.iteration()}),t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===e?.code&&this.schedule(!0))}this.schedule()}}class G{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=U(this.lastLoginAt),this.creationTime=U(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}async function K(e){const t=e.auth,n=await e.getIdToken(),r=await V(e,$(t,{idToken:n}));b(r?.users.length,t,"internal-error");const i=r.users[0];e._notifyReloadListener(i);const a=i.providerUserInfo?.length?Y(i.providerUserInfo):[],o=(s=e.providerData,l=a,[...s.filter((e=>!l.some((t=>t.providerId===e.providerId)))),...l]);var s,l;const c=e.isAnonymous,d=!(e.email&&i.passwordHash)&&!o?.length,u=!!c&&d,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new G(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(e,h)}function Y(e){return e.map((e=>{let{providerId:t,...n}=e;return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}}))}class Z{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){b(e.idToken,"internal-error"),b("undefined"!==typeof e.idToken,"internal-error"),b("undefined"!==typeof e.refreshToken,"internal-error");const t="expiresIn"in e&&"undefined"!==typeof e.expiresIn?Number(e.expiresIn):H(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){b(0!==e.length,"internal-error");const t=H(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]||!this.accessToken||this.isExpired?(b(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:a}=await async function(e,t){const n=await A(e,{},(async()=>{const n=(0,i.Am)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:a}=e.config,o=await R(e,r,"/v1/token",`key=${a}`),s=await e._getAdditionalHeaders();s["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:s,body:n};return e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(l.credentials="include"),E.fetch()(o,l)}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,r,Number(a))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,a=new Z;return n&&(b("string"===typeof n,"internal-error",{appName:e}),a.refreshToken=n),r&&(b("string"===typeof r,"internal-error",{appName:e}),a.accessToken=r),i&&(b("number"===typeof i,"internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Z,this.toJSON())}_performRefresh(){return y("not implemented")}}function J(e,t){b("string"===typeof e||"undefined"===typeof e,"internal-error",{appName:t})}class Q{constructor(e){let{uid:t,auth:n,stsTokenManager:r,...i}=e;this.providerId="firebase",this.proactiveRefresh=new q(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new G(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await V(this,this.stsTokenManager.getToken(this.auth,e));return b(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=(0,i.Ku)(e),r=await n.getIdToken(t),a=W(r);b(a&&a.exp&&a.auth_time&&a.iat,n.auth,"internal-error");const o="object"===typeof a.firebase?a.firebase:void 0,s=o?.sign_in_provider;return{claims:a,token:r,authTime:U(B(a.auth_time)),issuedAtTime:U(B(a.iat)),expirationTime:U(B(a.exp)),signInProvider:s||null,signInSecondFactor:o?.sign_in_second_factor||null}}(this,e)}reload(){return async function(e){const t=(0,i.Ku)(e);await K(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(b(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map((e=>({...e}))),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Q({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){b(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await K(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,r.xZ)(this.auth.app))return Promise.reject(m(this.auth));const e=await this.getIdToken();return await V(this,async function(e,t){return P(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((e=>({...e}))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,o=t.tenantId??void 0,s=t._redirectEventId??void 0,l=t.createdAt??void 0,c=t.lastLoginAt??void 0,{uid:d,emailVerified:u,isAnonymous:h,providerData:p,stsTokenManager:f}=t;b(d&&f,e,"internal-error");const m=Z.fromJSON(this.name,f);b("string"===typeof d,e,"internal-error"),J(n,e.name),J(r,e.name),b("boolean"===typeof u,e,"internal-error"),b("boolean"===typeof h,e,"internal-error"),J(i,e.name),J(a,e.name),J(o,e.name),J(s,e.name),J(l,e.name),J(c,e.name);const g=new Q({uid:d,auth:e,email:r,emailVerified:u,displayName:n,isAnonymous:h,photoURL:a,phoneNumber:i,tenantId:o,stsTokenManager:m,createdAt:l,lastLoginAt:c});return p&&Array.isArray(p)&&(g.providerData=p.map((e=>({...e})))),s&&(g._redirectEventId=s),g}static async _fromIdTokenResponse(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=new Z;r.updateFromServerResponse(t);const i=new Q({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await K(i),i}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];b(void 0!==r.localId,"internal-error");const i=void 0!==r.providerUserInfo?Y(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!i?.length,o=new Z;o.updateFromIdToken(n);const s=new Q({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:a}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new G(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(s,l),s}}const X=new Map;function ee(e){v(e instanceof Function,"Expected a class definition");let t=X.get(e);return t?(v(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,X.set(e,t),t)}class te{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}te.type="NONE";const ne=te;function re(e,t,n){return`firebase:${e}:${t}:${n}`}class ie{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=re(this.userKey,r.apiKey,i),this.fullPersistenceKey=re("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"===typeof e){const t=await $(this.auth,{idToken:e}).catch((()=>{}));return t?Q._fromGetAccountInfoResponse(this.auth,t,e):null}return Q._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"authUser";if(!t.length)return new ie(ee(ne),e,n);const r=(await Promise.all(t.map((async e=>{if(await e._isAvailable())return e})))).filter((e=>e));let i=r[0]||ee(ne);const a=re(n,e.config.apiKey,e.name);let o=null;for(const l of t)try{const t=await l._get(a);if(t){let n;if("string"===typeof t){const r=await $(e,{idToken:t}).catch((()=>{}));if(!r)break;n=await Q._fromGetAccountInfoResponse(e,r,t)}else n=Q._fromJSON(e,t);l!==i&&(o=n),i=l;break}}catch{}const s=r.filter((e=>e._shouldAllowMigration));return i._shouldAllowMigration&&s.length?(i=s[0],o&&await i._set(a,o.toJSON()),await Promise.all(t.map((async e=>{if(e!==i)try{await e._remove(a)}catch{}}))),new ie(i,e,n)):new ie(i,e,n)}}function ae(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(ce(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(oe(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(ue(t))return"Blackberry";if(he(t))return"Webos";if(se(t))return"Safari";if((t.includes("chrome/")||le(t))&&!t.includes("edge/"))return"Chrome";if(de(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===n?.length)return n[1]}return"Other"}function oe(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/firefox\//i.test(e)}function se(){const e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)()).toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function le(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/crios\//i.test(e)}function ce(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/iemobile/i.test(e)}function de(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/android/i.test(e)}function ue(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/blackberry/i.test(e)}function he(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/webos/i.test(e)}function pe(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function fe(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)();return pe(e)||de(e)||he(e)||ue(e)||/windows phone/i.test(e)||ce(e)}function me(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];switch(e){case"Browser":t=ae((0,i.ZQ)());break;case"Worker":t=`${ae((0,i.ZQ)())}-${e}`;break;default:t=e}const a=n.length?n.join(","):"FirebaseCore-web";return`${t}/JsCore/${r.MF}/${a}`}class ge{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise(((n,r)=>{try{n(e(t))}catch(i){r(i)}}));n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}class be{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??6,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}class ye{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new xe(this),this.idTokenSubscription=new xe(this),this.beforeStateQueue=new ge(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=c,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise((e=>this._resolvePersistenceManagerAvailable=e))}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ee(t)),this._initializationPromise=this.queue((async()=>{if(!this._deleted&&(this.persistenceManager=await ie.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(n){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}})),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await $(this,{idToken:e}),n=await Q._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if((0,r.xZ)(this.app)){const e=this.app.settings.authIdToken;return e?new Promise((t=>{setTimeout((()=>this.initializeCurrentUserFromIdToken(e).then(t,t)))})):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,r=n?._redirectEventId,a=await this.tryRedirectSignIn(e);t&&t!==r||!a?.user||(n=a.user,i=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(n)}catch(a){n=t,this._popupRedirectResolver._overrideRedirectResult(this,(()=>Promise.reject(a)))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return b(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await K(e)}catch(t){if("auth/network-request-failed"!==t?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"===typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,r.xZ)(this.app))return Promise.reject(m(this));const t=e?(0,i.Ku)(e):null;return t&&b(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!this._deleted)return e&&b(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue((async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()}))}async signOut(){return(0,r.xZ)(this.app)?Promise.reject(m(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,r.xZ)(this.app)?Promise.reject(m(this)):this.queue((async()=>{await this.assertedPersistence.setPersistence(ee(e))}))}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e){return P(e,"GET","/v2/passwordPolicy",j(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}))}(this),t=new be(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new i.FA("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise(((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged((()=>{n(),e()}),t)}}))}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return P(e,"POST","/v2/accounts:revokeToken",j(e,t))}(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ee(e)||this._popupRedirectResolver;b(t,this,"argument-error"),this.redirectPersistenceManager=await ie.create(this,[ee(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue((async()=>{})),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(e)))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"===typeof t?t:t.next.bind(t);let a=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(b(o,this,"internal-error"),o.then((()=>{a||i(this.currentUser)})),"function"===typeof t){const i=e.addObserver(t,n,r);return()=>{a=!0,i()}}{const n=e.addObserver(t);return()=>{a=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return b(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=me(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if((0,r.xZ)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&function(e){if(d.logLevel<=a.$b.WARN){for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];d.warn(`Auth (${r.MF}): ${e}`,...n)}}(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ve(e){return(0,i.Ku)(e)}class xe{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,i.tD)((e=>this.observer=e))}get next(){return b(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}let we={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _e(e){return we.loadJS(e)}function ke(e){return`__${e}${Math.floor(1e6*Math.random())}`}class Se{constructor(){this.enterprise=new Ee}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Ee{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Ce="NO_RECAPTCHA";class Te{constructor(e){this.type="recaptcha-enterprise",this.auth=ve(e)}async verify(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"verify",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];function n(t,n,r){const i=window.grecaptcha;L(i)?i.enterprise.ready((()=>{i.enterprise.execute(t,{action:e}).then((e=>{n(e)})).catch((()=>{n(Ce)}))})):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){return(new Se).execute("siteKey",{action:"verify"})}return new Promise(((e,r)=>{(async function(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise((async(t,n)=>{z(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then((r=>{if(void 0!==r.recaptchaKey){const n=new F(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))})).catch((e=>{n(e)}))}))})(this.auth).then((i=>{if(!t&&L(window.grecaptcha))n(i,e,r);else{if("undefined"===typeof window)return void r(new Error("RecaptchaVerifier is only supported in browser"));let t=we.recaptchaEnterpriseScript;0!==t.length&&(t+=i),_e(t).then((()=>{n(i,e,r)})).catch((e=>{r(e)}))}})).catch((e=>{r(e)}))}))}}async function Ie(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];const a=new Te(e);let o;if(i)o=Ce;else try{o=await a.verify(n)}catch(l){o=await a.verify(n,!0)}const s={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in s){const e=s.phoneEnrollmentInfo.phoneNumber,t=s.phoneEnrollmentInfo.recaptchaToken;Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in s){const e=s.phoneSignInInfo.recaptchaToken;Object.assign(s,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return s}return r?Object.assign(s,{captchaResp:o}):Object.assign(s,{captchaResponse:o}),Object.assign(s,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(s,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),s}async function je(e,t,n,r,i){if("EMAIL_PASSWORD_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Ie(e,t,n,"getOobCode"===n);return r(e,i)}return r(e,t).catch((async i=>{if("auth/missing-recaptcha-token"===i.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const i=await Ie(e,t,n,"getOobCode"===n);return r(e,i)}return Promise.reject(i)}))}if("PHONE_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const i=await Ie(e,t,n);return r(e,i).catch((async i=>{if("AUDIT"===e._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const i=await Ie(e,t,n,!1,!0);return r(e,i)}return Promise.reject(i)}))}{const i=await Ie(e,t,n,!1,!0);return r(e,i)}}return Promise.reject(i+" provider is not supported.")}async function Pe(e){const t=ve(e),n=await z(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new F(n);if(null==t.tenantId?t._agentRecaptchaConfig=r:t._tenantRecaptchaConfigs[t.tenantId]=r,r.isAnyProviderEnabled()){new Te(t).verify()}}function Ae(e,t,n){const r=ve(e);b(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const a=!!n?.disableWarnings,o=Ne(t),{host:s,port:l}=function(e){const t=Ne(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:Re(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:Re(t)}}}(t),c=null===l?"":`:${l}`,d={url:`${o}//${s}${c}/`},u=Object.freeze({host:s,port:l,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:a})});if(!r._canInitEmulator)return b(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void b((0,i.bD)(d,r.config.emulator)&&(0,i.bD)(u,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=d,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,(0,i.zJ)(s)?(0,i.gE)(`${o}//${s}${c}`):a||function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!==typeof console&&"function"===typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!==typeof window&&"undefined"!==typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}function Ne(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Re(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class Oe{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return y("not implemented")}_getIdTokenResponse(e){return y("not implemented")}_linkToIdToken(e,t){return y("not implemented")}_getReauthenticationResolver(e){return y("not implemented")}}async function De(e,t){return P(e,"POST","/v1/accounts:signUp",t)}async function Me(e,t){return N(e,"POST","/v1/accounts:signInWithPassword",j(e,t))}async function Le(e,t){return P(e,"POST","/v1/accounts:sendOobCode",j(e,t))}async function Fe(e,t){return Le(e,t)}class ze extends Oe{constructor(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new ze(e,t,"password")}static _fromEmailAndCode(e,t){return new ze(e,t,"emailLink",arguments.length>2&&void 0!==arguments[2]?arguments[2]:null)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return je(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",Me,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return async function(e,t){return N(e,"POST","/v1/accounts:signInWithEmailLink",j(e,t))}(e,{email:this._email,oobCode:this._password});default:h(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return je(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",De,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return async function(e,t){return N(e,"POST","/v1/accounts:signInWithEmailLink",j(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:h(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}async function $e(e,t){return N(e,"POST","/v1/accounts:signInWithIdp",j(e,t))}class Ue extends Oe{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ue(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):h("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...i}=t;if(!n||!r)return null;const a=new Ue(n,r);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){return $e(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,$e(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,$e(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=(0,i.Am)(t)}return e}}async function Be(e,t){return P(e,"POST","/v1/accounts:sendVerificationCode",j(e,t))}const We={USER_NOT_FOUND:"user-not-found"};class He extends Oe{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new He({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new He({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return async function(e,t){return N(e,"POST","/v1/accounts:signInWithPhoneNumber",j(e,t))}(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return async function(e,t){const n=await N(e,"POST","/v1/accounts:signInWithPhoneNumber",j(e,t));if(n.temporaryProof)throw M(e,"account-exists-with-different-credential",n);return n}(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return async function(e,t){return N(e,"POST","/v1/accounts:signInWithPhoneNumber",j(e,{...t,operation:"REAUTH"}),We)}(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"===typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new He({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}class Ve{constructor(e){const t=(0,i.I9)((0,i.hp)(e)),n=t.apiKey??null,r=t.oobCode??null,a=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(t.mode??null);b(n&&r&&a,"argument-error"),this.apiKey=n,this.operation=a,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=function(e){const t=(0,i.I9)((0,i.hp)(e)).link,n=t?(0,i.I9)((0,i.hp)(t)).deep_link_id:null,r=(0,i.I9)((0,i.hp)(e)).deep_link_id;return(r?(0,i.I9)((0,i.hp)(r)).link:null)||r||n||t||e}(e);try{return new Ve(t)}catch{return null}}}class qe{constructor(){this.providerId=qe.PROVIDER_ID}static credential(e,t){return ze._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Ve.parseLink(t);return b(n,"argument-error"),ze._fromEmailAndCode(e,n.code,n.tenantId)}}qe.PROVIDER_ID="password",qe.EMAIL_PASSWORD_SIGN_IN_METHOD="password",qe.EMAIL_LINK_SIGN_IN_METHOD="emailLink";class Ge{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}class Ke extends Ge{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Ye extends Ke{constructor(){super("facebook.com")}static credential(e){return Ue._fromParams({providerId:Ye.PROVIDER_ID,signInMethod:Ye.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ye.credentialFromTaggedObject(e)}static credentialFromError(e){return Ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return Ye.credential(t.oauthAccessToken)}catch{return null}}}Ye.FACEBOOK_SIGN_IN_METHOD="facebook.com",Ye.PROVIDER_ID="facebook.com";class Ze extends Ke{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ue._fromParams({providerId:Ze.PROVIDER_ID,signInMethod:Ze.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ze.credentialFromTaggedObject(e)}static credentialFromError(e){return Ze.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t)return null;const{oauthIdToken:n,oauthAccessToken:r}=t;if(!n&&!r)return null;try{return Ze.credential(n,r)}catch{return null}}}Ze.GOOGLE_SIGN_IN_METHOD="google.com",Ze.PROVIDER_ID="google.com";class Je extends Ke{constructor(){super("github.com")}static credential(e){return Ue._fromParams({providerId:Je.PROVIDER_ID,signInMethod:Je.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Je.credentialFromTaggedObject(e)}static credentialFromError(e){return Je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return Je.credential(t.oauthAccessToken)}catch{return null}}}Je.GITHUB_SIGN_IN_METHOD="github.com",Je.PROVIDER_ID="github.com";class Qe extends Ke{constructor(){super("twitter.com")}static credential(e,t){return Ue._fromParams({providerId:Qe.PROVIDER_ID,signInMethod:Qe.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Qe.credentialFromTaggedObject(e)}static credentialFromError(e){return Qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=t;if(!n||!r)return null;try{return Qe.credential(n,r)}catch{return null}}}async function Xe(e,t){return N(e,"POST","/v1/accounts:signUp",j(e,t))}Qe.TWITTER_SIGN_IN_METHOD="twitter.com",Qe.PROVIDER_ID="twitter.com";class et{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const i=await Q._fromIdTokenResponse(e,n,r),a=tt(n);return new et({user:i,providerId:a,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=tt(n);return new et({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function tt(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}class nt extends i.g{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,nt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new nt(e,t,n,r)}}function rt(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw nt._fromErrorAndOperation(e,n,t,r);throw n}))}async function it(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=await V(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return et._forOperation(e,"link",r)}async function at(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const{auth:i}=e;if((0,r.xZ)(i.app))return Promise.reject(m(i));const a="reauthenticate";try{const r=await V(e,rt(i,a,t,e),n);b(r.idToken,i,"internal-error");const o=W(r.idToken);b(o,i,"internal-error");const{sub:s}=o;return b(e.uid===s,i,"user-mismatch"),et._forOperation(e,a,r)}catch(o){throw"auth/user-not-found"===o?.code&&h(i,"user-mismatch"),o}}async function ot(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if((0,r.xZ)(e.app))return Promise.reject(m(e));const i="signIn",a=await rt(e,i,t),o=await et._fromIdTokenResponse(e,i,a);return n||await e._updateCurrentUser(o.user),o}async function st(e,t){return ot(ve(e),t)}function lt(e,t,n){b(n.url?.length>0,e,"invalid-continue-uri"),b("undefined"===typeof n.dynamicLinkDomain||n.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),b("undefined"===typeof n.linkDomain||n.linkDomain.length>0,e,"invalid-hosting-link-domain"),t.continueUrl=n.url,t.dynamicLinkDomain=n.dynamicLinkDomain,t.linkDomain=n.linkDomain,t.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(b(n.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iOSBundleId=n.iOS.bundleId),n.android&&(b(n.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=n.android.installApp,t.androidMinimumVersionCode=n.android.minimumVersion,t.androidPackageName=n.android.packageName)}async function ct(e){const t=ve(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function dt(e,t,n){const r=ve(e),i={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};n&&lt(r,i,n),await je(r,i,"getOobCode",Fe,"EMAIL_PASSWORD_PROVIDER")}async function ut(e,t,n){if((0,r.xZ)(e.app))return Promise.reject(m(e));const i=ve(e),a=je(i,{returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Xe,"EMAIL_PASSWORD_PROVIDER"),o=await a.catch((t=>{throw"auth/password-does-not-meet-requirements"===t.code&&ct(e),t})),s=await et._fromIdTokenResponse(i,"signIn",o);return await i._updateCurrentUser(s.user),s}function ht(e,t,n){return(0,r.xZ)(e.app)?Promise.reject(m(e)):st((0,i.Ku)(e),qe.credential(t,n)).catch((async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&ct(e),t}))}function pt(e,t){return(0,i.Ku)(e).setPersistence(t)}function ft(e,t,n,r){return(0,i.Ku)(e).onAuthStateChanged(t,n,r)}function mt(e){return(0,i.Ku)(e).signOut()}function gt(e,t){return P(e,"POST","/v2/accounts/mfaEnrollment:start",j(e,t))}new WeakMap;const bt="__sak";class yt{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(bt,"1"),this.storage.removeItem(bt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}class vt extends yt{constructor(){super((()=>window.localStorage),"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=fe(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!e.key)return void this.forAllChangedKeys(((e,t,n)=>{this.notifyListeners(e,n)}));const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},a=this.storage.getItem(n);(0,i.lT)()&&10===document.documentMode&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)}))}),1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}vt.type="LOCAL";const xt=vt;function wt(e){const t=e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),n=RegExp(`${t}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function _t(e){return`${"http:"===window.location.protocol?"__dev_":"__HOST-"}FIREBASE_${e.split(":")[3]}`}class kt{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(void 0===typeof window)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return!("boolean"===typeof isSecureContext&&!isSecureContext)&&("undefined"!==typeof navigator&&"undefined"!==typeof document&&(navigator.cookieEnabled??!0))}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=_t(e);if(window.cookieStore){const e=await window.cookieStore.get(t);return e?.value}return wt(t)}async _remove(e){if(!this._isAvailable())return;if(!await this._get(e))return;const t=_t(e);document.cookie=`${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch((()=>{}))}_addListener(e,t){if(!this._isAvailable())return;const n=_t(e);if(window.cookieStore){const e=e=>{const r=e.changed.find((e=>e.name===n));r&&t(r.value);e.deleted.find((e=>e.name===n))&&t(null)},r=()=>window.cookieStore.removeEventListener("change",e);return this.listenerUnsubscribes.set(t,r),window.cookieStore.addEventListener("change",e)}let r=wt(n);const i=setInterval((()=>{const e=wt(n);e!==r&&(t(e),r=e)}),1e3);this.listenerUnsubscribes.set(t,(()=>clearInterval(i)))}_removeListener(e,t){const n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}}kt.type="COOKIE";class St extends yt{constructor(){super((()=>window.sessionStorage),"SESSION")}_addListener(e,t){}_removeListener(e,t){}}St.type="SESSION";const Et=St;class Ct{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find((t=>t.isListeningto(e)));if(t)return t;const n=new Ct(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,a=this.handlersMap[r];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(a).map((async e=>e(t.origin,i))),s=await function(e){return Promise.all(e.map((async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}})))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:s})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}function Tt(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}Ct.receivers=[];class It{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:50;const r="undefined"!==typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,a;return new Promise(((o,s)=>{const l=Tt("",20);r.port1.start();const c=setTimeout((()=>{s(new Error("unsupported_event"))}),n);a={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===l)switch(t.data.status){case"ack":clearTimeout(c),i=setTimeout((()=>{s(new Error("timeout"))}),3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(c),clearTimeout(i),s(new Error("invalid_response"))}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[r.port2])})).finally((()=>{a&&this.removeMessageHandler(a)}))}}function jt(){return window}function Pt(){return"undefined"!==typeof jt().WorkerGlobalScope&&"function"===typeof jt().importScripts}const At="firebaseLocalStorageDb",Nt="firebaseLocalStorage",Rt="fbase_key";class Ot{constructor(e){this.request=e}toPromise(){return new Promise(((e,t)=>{this.request.addEventListener("success",(()=>{e(this.request.result)})),this.request.addEventListener("error",(()=>{t(this.request.error)}))}))}}function Dt(e,t){return e.transaction([Nt],t?"readwrite":"readonly").objectStore(Nt)}function Mt(){const e=indexedDB.open(At,1);return new Promise(((t,n)=>{e.addEventListener("error",(()=>{n(e.error)})),e.addEventListener("upgradeneeded",(()=>{const t=e.result;try{t.createObjectStore(Nt,{keyPath:Rt})}catch(r){n(r)}})),e.addEventListener("success",(async()=>{const n=e.result;n.objectStoreNames.contains(Nt)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(At);return new Ot(e).toPromise()}(),t(await Mt()))}))}))}async function Lt(e,t,n){const r=Dt(e,!0).put({[Rt]:t,value:n});return new Ot(r).toPromise()}function Ft(e,t){const n=Dt(e,!0).delete(t);return new Ot(n).toPromise()}class zt{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}async _openDb(){return this.db||(this.db=await Mt()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Pt()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ct._getInstance(Pt()?self:null),this.receiver._subscribe("keyChanged",(async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)}))),this.receiver._subscribe("ping",(async(e,t)=>["keyChanged"]))}async initializeSender(){if(this.activeServiceWorker=await async function(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}(),!this.activeServiceWorker)return;this.sender=new It(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&(navigator?.serviceWorker?.controller||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Mt();return await Lt(e,bt,"1"),await Ft(e,bt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite((async()=>(await this._withRetries((n=>Lt(n,e,t))),this.localCache[e]=t,this.notifyServiceWorker(e))))}async _get(e){const t=await this._withRetries((t=>async function(e,t){const n=Dt(e,!1).get(t),r=await new Ot(n).toPromise();return void 0===r?null:r.value}(t,e)));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite((async()=>(await this._withRetries((t=>Ft(t,e))),delete this.localCache[e],this.notifyServiceWorker(e))))}async _poll(){const e=await this._withRetries((e=>{const t=Dt(e,!1).getAll();return new Ot(t).toPromise()}));if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}zt.type="LOCAL";const $t=zt;function Ut(e,t){return P(e,"POST","/v2/accounts/mfaSignIn:start",j(e,t))}ke("rcb"),new k(3e4,6e4);const Bt="recaptcha";async function Wt(e,t,n){if(!e._getRecaptchaConfig())try{await Pe(e)}catch(r){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(r="string"===typeof t?{phoneNumber:t}:t,"session"in r){const t=r.session;if("phoneNumber"in r){b("enroll"===t.type,e,"internal-error");const i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},a=je(e,i,"mfaSmsEnrollment",(async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===Ce){b(n?.type===Bt,e,"argument-error");return gt(e,await Ht(e,t,n))}return gt(e,t)}),"PHONE_PROVIDER");return(await a.catch((e=>Promise.reject(e)))).phoneSessionInfo.sessionInfo}{b("signin"===t.type,e,"internal-error");const i=r.multiFactorHint?.uid||r.multiFactorUid;b(i,e,"missing-multi-factor-info");const a={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},o=je(e,a,"mfaSmsSignIn",(async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===Ce){b(n?.type===Bt,e,"argument-error");return Ut(e,await Ht(e,t,n))}return Ut(e,t)}),"PHONE_PROVIDER");return(await o.catch((e=>Promise.reject(e)))).phoneResponseInfo.sessionInfo}}{const t={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"},i=je(e,t,"sendVerificationCode",(async(e,t)=>{if(t.captchaResponse===Ce){b(n?.type===Bt,e,"argument-error");return Be(e,await Ht(e,t,n))}return Be(e,t)}),"PHONE_PROVIDER");return(await i.catch((e=>Promise.reject(e)))).sessionInfo}}finally{n?._reset()}}async function Ht(e,t,n){b(n.type===Bt,e,"argument-error");const r=await n.verify();b("string"===typeof r,e,"argument-error");const i={...t};if("phoneEnrollmentInfo"in i){const e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,a=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:a}}),i}if("phoneSignInInfo"in i){const e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}return Object.assign(i,{recaptchaToken:r}),i}class Vt{constructor(e){this.providerId=Vt.PROVIDER_ID,this.auth=ve(e)}verifyPhoneNumber(e,t){return Wt(this.auth,e,(0,i.Ku)(t))}static credential(e,t){return He._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Vt.credentialFromTaggedObject(t)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t)return null;const{phoneNumber:n,temporaryProof:r}=t;return n&&r?He._fromTokenResponse(n,r):null}}function qt(e,t){return t?ee(t):(b(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}Vt.PROVIDER_ID="phone",Vt.PHONE_SIGN_IN_METHOD="phone";class Gt extends Oe{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return $e(e,this._buildIdpRequest())}_linkToIdToken(e,t){return $e(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return $e(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Kt(e){return ot(e.auth,new Gt(e),e.bypassAuthState)}function Yt(e){const{auth:t,user:n}=e;return b(n,t,"internal-error"),at(n,new Gt(e),e.bypassAuthState)}async function Zt(e){const{auth:t,user:n}=e;return b(n,t,"internal-error"),it(n,new Gt(e),e.bypassAuthState)}class Jt{constructor(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise((async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}}))}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:a,type:o}=e;if(a)return void this.reject(a);const s={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(s))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Kt;case"linkViaPopup":case"linkViaRedirect":return Zt;case"reauthViaPopup":case"reauthViaRedirect":return Yt;default:h(this.auth,"internal-error")}}resolve(e){v(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){v(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}const Qt=new k(2e3,1e4);class Xt extends Jt{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,Xt.currentPopupAction&&Xt.currentPopupAction.cancel(),Xt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return b(e,this.auth,"internal-error"),e}async onExecution(){v(1===this.filter.length,"Popup operations only handle one event");const e=Tt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch((e=>{this.reject(e)})),this.resolver._isIframeWebStorageSupported(this.auth,(e=>{e||this.reject(p(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(p(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Xt.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(p(this.auth,"popup-closed-by-user"))}),8e3):this.pollId=window.setTimeout(e,Qt.get())};e()}}Xt.currentPopupAction=null;const en=new Map;class tn extends Jt{constructor(e,t){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,arguments.length>2&&void 0!==arguments[2]&&arguments[2]),this.eventId=null}async execute(){let e=en.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=an(t),r=rn(e);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}en.set(this.auth._key(),e)}return this.bypassAuthState||en.set(this.auth._key(),(()=>Promise.resolve(null))),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function nn(e,t){en.set(e._key(),t)}function rn(e){return ee(e._redirectPersistence)}function an(e){return re("pendingRedirect",e.config.apiKey,e.name)}async function on(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if((0,r.xZ)(e.app))return Promise.reject(m(e));const i=ve(e),a=qt(i,t),o=new tn(i,a,n),s=await o.execute();return s&&!n&&(delete s.user._redirectEventId,await i._persistUserIfCurrent(s.user),await i._setRedirectUser(null,t)),s}class sn{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))})),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return cn(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!cn(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(p(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(ln(e))}saveEventToCache(e){this.cachedEventUids.add(ln(e)),this.lastProcessedEventTime=Date.now()}}function ln(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter((e=>e)).join("-")}function cn(e){let{type:t,error:n}=e;return"unknown"===t&&"auth/no-auth-event"===n?.code}const dn=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,un=/^https?/;async function hn(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e){return P(e,"GET","/v1/projects",arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}(e);for(const n of t)try{if(pn(n))return}catch{}h(e,"unauthorized-domain")}function pn(e){const t=x(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!un.test(n))return!1;if(dn.test(e))return r===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}const fn=new k(3e4,6e4);function mn(){const e=jt().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function gn(e){return new Promise(((t,n)=>{function r(){mn(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{mn(),n(p(e,"network-request-failed"))},timeout:fn.get()})}if(jt().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!jt().gapi?.load){const t=ke("iframefcb");return jt()[t]=()=>{gapi.load?r():n(p(e,"network-request-failed"))},_e(`${we.gapiScript}?onload=${t}`).catch((e=>n(e)))}r()}})).catch((e=>{throw bn=null,e}))}let bn=null;const yn=new k(5e3,15e3),vn={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},xn=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function wn(e){const t=e.config;b(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?S(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,a={apiKey:t.apiKey,appName:e.name,v:r.MF},o=xn.get(e.config.apiHost);o&&(a.eid=o);const s=e._getFrameworks();return s.length&&(a.fw=s.join(",")),`${n}?${(0,i.Am)(a).slice(1)}`}async function _n(e){const t=await function(e){return bn=bn||gn(e),bn}(e),n=jt().gapi;return b(n,e,"internal-error"),t.open({where:document.body,url:wn(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:vn,dontclear:!0},(t=>new Promise((async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=p(e,"network-request-failed"),a=jt().setTimeout((()=>{r(i)}),yn.get());function o(){jt().clearTimeout(a),n(t)}t.ping(o).then(o,(()=>{r(i)}))}))))}const kn={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Sn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function En(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:500,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:600;const o=Math.max((window.screen.availHeight-a)/2,0).toString(),s=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c={...kn,width:r.toString(),height:a.toString(),top:o,left:s},d=(0,i.ZQ)().toLowerCase();n&&(l=le(d)?"_blank":n),oe(d)&&(t=t||"http://localhost",c.scrollbars="yes");const u=Object.entries(c).reduce(((e,t)=>{let[n,r]=t;return`${e}${n}=${r},`}),"");if(function(){return pe(arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i.ZQ)())&&!!window.navigator?.standalone}(d)&&"_self"!==l)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}(t||"",l),new Sn(null);const h=window.open(t||"",l,u);b(h,e,"popup-blocked");try{h.focus()}catch(p){}return new Sn(h)}const Cn="__/auth/handler",Tn="emulator/auth/handler",In=encodeURIComponent("fac");async function jn(e,t,n,a,o,s){b(e.config.authDomain,e,"auth-domain-config-required"),b(e.config.apiKey,e,"invalid-api-key");const l={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:a,v:r.MF,eventId:o};if(t instanceof Ge){t.setDefaultLanguage(e.languageCode),l.providerId=t.providerId||"",(0,i.Im)(t.getCustomParameters())||(l.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(s||{}))l[e]=t}if(t instanceof Ke){const e=t.getScopes().filter((e=>""!==e));e.length>0&&(l.scopes=e.join(","))}e.tenantId&&(l.tid=e.tenantId);const c=l;for(const r of Object.keys(c))void 0===c[r]&&delete c[r];const d=await e._getAppCheckToken(),u=d?`#${In}=${encodeURIComponent(d)}`:"";return`${function(e){let{config:t}=e;if(!t.emulator)return`https://${t.authDomain}/${Cn}`;return S(t,Tn)}(e)}?${(0,i.Am)(c).slice(1)}${u}`}const Pn="webStorageSupport";const An=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Et,this._completeRedirectFn=on,this._overrideRedirectResult=nn}async _openPopup(e,t,n,r){v(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");return En(e,await jn(e,t,n,x(),r),Tt())}async _openRedirect(e,t,n,r){await this._originValidation(e);return function(e){jt().location.href=e}(await jn(e,t,n,x(),r)),new Promise((()=>{}))}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(v(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch((()=>{delete this.eventManagers[t]})),n}async initAndGetManager(e){const t=await _n(e),n=new sn(e);return t.register("authEvent",(t=>{b(t?.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Pn,{type:Pn},(n=>{const r=n?.[0]?.[Pn];void 0!==r&&t(!!r),h(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hn(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return fe()||se()||pe()}};var Nn="@firebase/auth",Rn="1.13.0";class On{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged((t=>{e(t?.stsTokenManager.accessToken||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){b(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}const Dn=(0,i.XA)("authIdTokenMaxAge")||300;let Mn=null;const Ln=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&((new Date).getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Dn)return;const i=n?.token;Mn!==i&&(Mn=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Fn(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.Sx)();const t=(0,r.j6)(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=(0,r.j6)(e,"auth");if(n.isInitialized()){const e=n.getImmediate(),r=n.getOptions();if((0,i.bD)(r,t??{}))return e;h(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:An,persistence:[$t,xt,Et]}),a=(0,i.XA)("authTokenSyncURL");if(a&&"boolean"===typeof isSecureContext&&isSecureContext){const e=new URL(a,location.origin);if(location.origin===e.origin){const t=Ln(e.toString());!function(e,t,n){(0,i.Ku)(e).beforeAuthStateChanged(t,n)}(n,t,(()=>t(n.currentUser))),function(e,t,n,r){(0,i.Ku)(e).onIdTokenChanged(t,n,r)}(n,(e=>t(e)))}}const o=(0,i.Tj)("auth");return o&&Ae(n,`http://${o}`),n}var zn;we={loadJS:e=>new Promise(((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=p("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",(document.getElementsByTagName("head")?.[0]??document).appendChild(r)})),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},zn="Browser",(0,r.om)(new o.uA("auth",((e,t)=>{let{options:n}=t;const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:o,authDomain:s}=r.options;b(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:s,clientPlatform:zn,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:me(zn)},c=new ye(r,i,a,l);return function(e,t){const n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(ee);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}(c,n),c}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,n)=>{e.getProvider("auth-internal").initialize()}))),(0,r.om)(new o.uA("auth-internal",(e=>(e=>new On(e))(ve(e.getProvider("auth").getImmediate()))),"PRIVATE").setInstantiationMode("EXPLICIT")),(0,r.KO)(Nn,Rn,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(zn)),(0,r.KO)(Nn,Rn,"esm2020")},950:(e,t,n)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(730)},965:(e,t,n)=>{"use strict";n.d(t,{$b:()=>i,Vy:()=>c});const r=[];var i;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(i||(i={}));const a={debug:i.DEBUG,verbose:i.VERBOSE,info:i.INFO,warn:i.WARN,error:i.ERROR,silent:i.SILENT},o=i.INFO,s={[i.DEBUG]:"log",[i.VERBOSE]:"log",[i.INFO]:"info",[i.WARN]:"warn",[i.ERROR]:"error"},l=function(e,t){if(t<e.logLevel)return;const n=(new Date).toISOString(),r=s[t];if(!r)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);for(var i=arguments.length,a=new Array(i>2?i-2:0),o=2;o<i;o++)a[o-2]=arguments[o];console[r](`[${n}]  ${e.name}:`,...a)};class c{constructor(e){this.name=e,this._logLevel=o,this._logHandler=l,this._userLogHandler=null,r.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in i))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"===typeof e?a[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!==typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,i.DEBUG,...t),this._logHandler(this,i.DEBUG,...t)}log(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,i.VERBOSE,...t),this._logHandler(this,i.VERBOSE,...t)}info(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,i.INFO,...t),this._logHandler(this,i.INFO,...t)}warn(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,i.WARN,...t),this._logHandler(this,i.WARN,...t)}error(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this._userLogHandler&&this._userLogHandler(this,i.ERROR,...t),this._logHandler(this,i.ERROR,...t)}}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,i){if(1&i&&(r=this(r)),8&i)return r;if("object"===typeof r&&r){if(4&i&&r.__esModule)return r;if(16&i&&"function"===typeof r.then)return r}var a=Object.create(null);n.r(a);var o={};e=e||[null,t({}),t([]),t(t)];for(var s=2&i&&r;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>o[e]=()=>r[e]));return o.default=()=>r,n.d(a,o),a}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,r)=>(n.f[r](e,t),t)),[])),n.u=e=>"static/js/"+e+".ea253801.chunk.js",n.miniCssF=e=>{},n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={},t="scrambled-legs:";n.l=(r,i,a,o)=>{if(e[r])e[r].push(i);else{var s,l;if(void 0!==a)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==t+a){s=u;break}}s||(l=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+a),s.src=r),e[r]=[i];var h=(t,n)=>{s.onerror=s.onload=null,clearTimeout(p);var i=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((e=>e(n))),t)return t(n)},p=setTimeout(h.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=h.bind(null,s.onerror),s.onload=h.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/",(()=>{var e={792:0};n.f.j=(t,r)=>{var i=n.o(e,t)?e[t]:void 0;if(0!==i)if(i)r.push(i[2]);else{var a=new Promise(((n,r)=>i=e[t]=[n,r]));r.push(i[2]=a);var o=n.p+n.u(t),s=new Error;n.l(o,(r=>{if(n.o(e,t)&&(0!==(i=e[t])&&(e[t]=void 0),i)){var a=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",s.name="ChunkLoadError",s.type=a,s.request=o,i[1](s)}}),"chunk-"+t,t)}};var t=(t,r)=>{var i,a,o=r[0],s=r[1],l=r[2],c=0;if(o.some((t=>0!==e[t]))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(l)l(n)}for(t&&t(r);c<o.length;c++)a=o[c],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0},r=self.webpackChunkscrambled_legs=self.webpackChunkscrambled_legs||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),n.nc=void 0,(()=>{"use strict";var e,t=n(43),r=n.t(t,2),i=n(391),a=n(950),o=n.t(a,2);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s.apply(this,arguments)}!function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(e||(e={}));const l="popstate";function c(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function d(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(n){}}}function u(e,t){return{usr:e.state,key:e.key,idx:t}}function h(e,t,n,r){return void 0===n&&(n=null),s({pathname:"string"===typeof e?e:e.pathname,search:"",hash:""},"string"===typeof t?f(t):t,{state:n,key:t&&t.key||r||Math.random().toString(36).substr(2,8)})}function p(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function f(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function m(t,n,r,i){void 0===i&&(i={});let{window:a=document.defaultView,v5Compat:o=!1}=i,d=a.history,f=e.Pop,m=null,g=b();function b(){return(d.state||{idx:null}).idx}function y(){f=e.Pop;let t=b(),n=null==t?null:t-g;g=t,m&&m({action:f,location:x.location,delta:n})}function v(e){let t="null"!==a.location.origin?a.location.origin:a.location.href,n="string"===typeof e?e:p(e);return n=n.replace(/ $/,"%20"),c(t,"No window.location.(origin|href) available to create URL for href: "+n),new URL(n,t)}null==g&&(g=0,d.replaceState(s({},d.state,{idx:g}),""));let x={get action(){return f},get location(){return t(a,d)},listen(e){if(m)throw new Error("A history only accepts one active listener");return a.addEventListener(l,y),m=e,()=>{a.removeEventListener(l,y),m=null}},createHref:e=>n(a,e),createURL:v,encodeLocation(e){let t=v(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(t,n){f=e.Push;let i=h(x.location,t,n);r&&r(i,t),g=b()+1;let s=u(i,g),l=x.createHref(i);try{d.pushState(s,"",l)}catch(c){if(c instanceof DOMException&&"DataCloneError"===c.name)throw c;a.location.assign(l)}o&&m&&m({action:f,location:x.location,delta:1})},replace:function(t,n){f=e.Replace;let i=h(x.location,t,n);r&&r(i,t),g=b();let a=u(i,g),s=x.createHref(i);d.replaceState(a,"",s),o&&m&&m({action:f,location:x.location,delta:0})},go:e=>d.go(e)};return x}var g;!function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"}(g||(g={}));new Set(["lazy","caseSensitive","path","id","index","children"]);function b(e,t,n){return void 0===n&&(n="/"),y(e,t,n,!1)}function y(e,t,n,r){let i=N(("string"===typeof t?f(t):t).pathname||"/",n);if(null==i)return null;let a=v(e);!function(e){e.sort(((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every(((e,n)=>e===t[n]));return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map((e=>e.childrenIndex)),t.routesMeta.map((e=>e.childrenIndex)))))}(a);let o=null;for(let s=0;null==o&&s<a.length;++s){let e=A(i);o=j(a[s],e,r)}return o}function v(e,t,n,r){void 0===t&&(t=[]),void 0===n&&(n=[]),void 0===r&&(r="");let i=(e,i,a)=>{let o={relativePath:void 0===a?e.path||"":a,caseSensitive:!0===e.caseSensitive,childrenIndex:i,route:e};o.relativePath.startsWith("/")&&(c(o.relativePath.startsWith(r),'Absolute route path "'+o.relativePath+'" nested under path "'+r+'" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),o.relativePath=o.relativePath.slice(r.length));let s=L([r,o.relativePath]),l=n.concat(o);e.children&&e.children.length>0&&(c(!0!==e.index,'Index routes must not have child routes. Please remove all child routes from route path "'+s+'".'),v(e.children,t,l,s)),(null!=e.path||e.index)&&t.push({path:s,score:I(s,e.index),routesMeta:l})};return e.forEach(((e,t)=>{var n;if(""!==e.path&&null!=(n=e.path)&&n.includes("?"))for(let r of x(e.path))i(e,t,r);else i(e,t)})),t}function x(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,i=n.endsWith("?"),a=n.replace(/\?$/,"");if(0===r.length)return i?[a,""]:[a];let o=x(r.join("/")),s=[];return s.push(...o.map((e=>""===e?a:[a,e].join("/")))),i&&s.push(...o),s.map((t=>e.startsWith("/")&&""===t?"/":t))}const w=/^:[\w-]+$/,_=3,k=2,S=1,E=10,C=-2,T=e=>"*"===e;function I(e,t){let n=e.split("/"),r=n.length;return n.some(T)&&(r+=C),t&&(r+=k),n.filter((e=>!T(e))).reduce(((e,t)=>e+(w.test(t)?_:""===t?S:E)),r)}function j(e,t,n){void 0===n&&(n=!1);let{routesMeta:r}=e,i={},a="/",o=[];for(let s=0;s<r.length;++s){let e=r[s],l=s===r.length-1,c="/"===a?t:t.slice(a.length)||"/",d=P({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},c),u=e.route;if(!d&&l&&n&&!r[r.length-1].route.index&&(d=P({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},c)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:L([a,d.pathname]),pathnameBase:F(L([a,d.pathnameBase])),route:u}),"/"!==d.pathnameBase&&(a=L([a,d.pathnameBase]))}return o}function P(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=function(e,t,n){void 0===t&&(t=!1);void 0===n&&(n=!0);d("*"===e||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were "'+e.replace(/\*$/,"/*")+'" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'+e.replace(/\*$/,"/*")+'".');let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,((e,t,n)=>(r.push({paramName:t,isOptional:null!=n}),n?"/?([^\\/]+)?":"/([^\\/]+)")));e.endsWith("*")?(r.push({paramName:"*"}),i+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":""!==e&&"/"!==e&&(i+="(?:(?=\\/|$))");let a=new RegExp(i,t?void 0:"i");return[a,r]}(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,"$1"),s=i.slice(1);return{params:r.reduce(((e,t,n)=>{let{paramName:r,isOptional:i}=t;if("*"===r){let e=s[n]||"";o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,"$1")}const l=s[n];return e[r]=i&&!l?void 0:(l||"").replace(/%2F/g,"/"),e}),{}),pathname:a,pathnameBase:o,pattern:e}}function A(e){try{return e.split("/").map((e=>decodeURIComponent(e).replace(/\//g,"%2F"))).join("/")}catch(t){return d(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('+t+")."),e}}function N(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}function R(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified `to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the `to."+n+'` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'}function O(e){return e.filter(((e,t)=>0===t||e.route.path&&e.route.path.length>0))}function D(e,t){let n=O(e);return t?n.map(((e,t)=>t===n.length-1?e.pathname:e.pathnameBase)):n.map((e=>e.pathnameBase))}function M(e,t,n,r){let i;void 0===r&&(r=!1),"string"===typeof e?i=f(e):(i=s({},e),c(!i.pathname||!i.pathname.includes("?"),R("?","pathname","search",i)),c(!i.pathname||!i.pathname.includes("#"),R("#","pathname","hash",i)),c(!i.search||!i.search.includes("#"),R("#","search","hash",i)));let a,o=""===e||""===i.pathname,l=o?"/":i.pathname;if(null==l)a=n;else{let e=t.length-1;if(!r&&l.startsWith("..")){let t=l.split("/");for(;".."===t[0];)t.shift(),e-=1;i.pathname=t.join("/")}a=e>=0?t[e]:"/"}let d=function(e,t){void 0===t&&(t="/");let{pathname:n,search:r="",hash:i=""}="string"===typeof e?f(e):e,a=n?n.startsWith("/")?n:function(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach((e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)})),n.length>1?n.join("/"):"/"}(n,t):t;return{pathname:a,search:z(r),hash:$(i)}}(i,a),u=l&&"/"!==l&&l.endsWith("/"),h=(o||"."===l)&&n.endsWith("/");return d.pathname.endsWith("/")||!u&&!h||(d.pathname+="/"),d}const L=e=>e.join("/").replace(/\/\/+/g,"/"),F=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),z=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",$=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";Error;function U(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}const B=["post","put","patch","delete"],W=(new Set(B),["get",...B]);new Set(W),new Set([301,302,303,307,308]),new Set([307,308]);Symbol("deferred");function H(){return H=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},H.apply(this,arguments)}const V=t.createContext(null);const q=t.createContext(null);const G=t.createContext(null);const K=t.createContext(null);const Y=t.createContext({outlet:null,matches:[],isDataRoute:!1});const Z=t.createContext(null);function J(){return null!=t.useContext(K)}function Q(){return J()||c(!1),t.useContext(K).location}function X(e){t.useContext(G).static||t.useLayoutEffect(e)}function ee(){let{isDataRoute:e}=t.useContext(Y);return e?function(){let{router:e}=ue(ce.UseNavigateStable),n=pe(de.UseNavigateStable),r=t.useRef(!1);return X((()=>{r.current=!0})),t.useCallback((function(t,i){void 0===i&&(i={}),r.current&&("number"===typeof t?e.navigate(t):e.navigate(t,H({fromRouteId:n},i)))}),[e,n])}():function(){J()||c(!1);let e=t.useContext(V),{basename:n,future:r,navigator:i}=t.useContext(G),{matches:a}=t.useContext(Y),{pathname:o}=Q(),s=JSON.stringify(D(a,r.v7_relativeSplatPath)),l=t.useRef(!1);X((()=>{l.current=!0}));let d=t.useCallback((function(t,r){if(void 0===r&&(r={}),!l.current)return;if("number"===typeof t)return void i.go(t);let a=M(t,JSON.parse(s),o,"path"===r.relative);null==e&&"/"!==n&&(a.pathname="/"===a.pathname?n:L([n,a.pathname])),(r.replace?i.replace:i.push)(a,r.state,r)}),[n,i,s,o,e]);return d}()}function te(){let{matches:e}=t.useContext(Y),n=e[e.length-1];return n?n.params:{}}function ne(e,n){let{relative:r}=void 0===n?{}:n,{future:i}=t.useContext(G),{matches:a}=t.useContext(Y),{pathname:o}=Q(),s=JSON.stringify(D(a,i.v7_relativeSplatPath));return t.useMemo((()=>M(e,JSON.parse(s),o,"path"===r)),[e,s,o,r])}function re(n,r,i,a){J()||c(!1);let{navigator:o,static:s}=t.useContext(G),{matches:l}=t.useContext(Y),d=l[l.length-1],u=d?d.params:{},h=(d&&d.pathname,d?d.pathnameBase:"/");d&&d.route;let p,m=Q();if(r){var g;let e="string"===typeof r?f(r):r;"/"===h||(null==(g=e.pathname)?void 0:g.startsWith(h))||c(!1),p=e}else p=m;let y=p.pathname||"/",v=y;if("/"!==h){let e=h.replace(/^\//,"").split("/");v="/"+y.replace(/^\//,"").split("/").slice(e.length).join("/")}let x=!s&&i&&i.matches&&i.matches.length>0?i.matches:b(n,{pathname:v});let w=le(x&&x.map((e=>Object.assign({},e,{params:Object.assign({},u,e.params),pathname:L([h,o.encodeLocation?o.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?h:L([h,o.encodeLocation?o.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])}))),l,i,a);return r&&w?t.createElement(K.Provider,{value:{location:H({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:e.Pop}},w):w}function ie(){let e=function(){var e;let n=t.useContext(Z),r=he(de.UseRouteError),i=pe(de.UseRouteError);if(void 0!==n)return n;return null==(e=r.errors)?void 0:e[i]}(),n=U(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,i="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:i};return t.createElement(t.Fragment,null,t.createElement("h2",null,"Unexpected Application Error!"),t.createElement("h3",{style:{fontStyle:"italic"}},n),r?t.createElement("pre",{style:a},r):null,null)}const ae=t.createElement(ie,null);class oe extends t.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return void 0!==this.state.error?t.createElement(Y.Provider,{value:this.props.routeContext},t.createElement(Z.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function se(e){let{routeContext:n,match:r,children:i}=e,a=t.useContext(V);return a&&a.static&&a.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=r.route.id),t.createElement(Y.Provider,{value:n},i)}function le(e,n,r,i){var a;if(void 0===n&&(n=[]),void 0===r&&(r=null),void 0===i&&(i=null),null==e){var o;if(!r)return null;if(r.errors)e=r.matches;else{if(!(null!=(o=i)&&o.v7_partialHydration&&0===n.length&&!r.initialized&&r.matches.length>0))return null;e=r.matches}}let s=e,l=null==(a=r)?void 0:a.errors;if(null!=l){let e=s.findIndex((e=>e.route.id&&void 0!==(null==l?void 0:l[e.route.id])));e>=0||c(!1),s=s.slice(0,Math.min(s.length,e+1))}let d=!1,u=-1;if(r&&i&&i.v7_partialHydration)for(let t=0;t<s.length;t++){let e=s[t];if((e.route.HydrateFallback||e.route.hydrateFallbackElement)&&(u=t),e.route.id){let{loaderData:t,errors:n}=r,i=e.route.loader&&void 0===t[e.route.id]&&(!n||void 0===n[e.route.id]);if(e.route.lazy||i){d=!0,s=u>=0?s.slice(0,u+1):[s[0]];break}}}return s.reduceRight(((e,i,a)=>{let o,c=!1,h=null,p=null;var f;r&&(o=l&&i.route.id?l[i.route.id]:void 0,h=i.route.errorElement||ae,d&&(u<0&&0===a?(f="route-fallback",!1||fe[f]||(fe[f]=!0),c=!0,p=null):u===a&&(c=!0,p=i.route.hydrateFallbackElement||null)));let m=n.concat(s.slice(0,a+1)),g=()=>{let n;return n=o?h:c?p:i.route.Component?t.createElement(i.route.Component,null):i.route.element?i.route.element:e,t.createElement(se,{match:i,routeContext:{outlet:e,matches:m,isDataRoute:null!=r},children:n})};return r&&(i.route.ErrorBoundary||i.route.errorElement||0===a)?t.createElement(oe,{location:r.location,revalidation:r.revalidation,component:h,error:o,children:g(),routeContext:{outlet:null,matches:m,isDataRoute:!0}}):g()}),null)}var ce=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ce||{}),de=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(de||{});function ue(e){let n=t.useContext(V);return n||c(!1),n}function he(e){let n=t.useContext(q);return n||c(!1),n}function pe(e){let n=function(){let e=t.useContext(Y);return e||c(!1),e}(),r=n.matches[n.matches.length-1];return r.route.id||c(!1),r.route.id}const fe={};function me(e,t){null==e||e.v7_startTransition,void 0===(null==e?void 0:e.v7_relativeSplatPath)&&(!t||t.v7_relativeSplatPath),t&&(t.v7_fetcherPersist,t.v7_normalizeFormMethod,t.v7_partialHydration,t.v7_skipActionErrorRevalidation)}r.startTransition;function ge(e){let{to:n,replace:r,state:i,relative:a}=e;J()||c(!1);let{future:o,static:s}=t.useContext(G),{matches:l}=t.useContext(Y),{pathname:d}=Q(),u=ee(),h=M(n,D(l,o.v7_relativeSplatPath),d,"path"===a),p=JSON.stringify(h);return t.useEffect((()=>u(JSON.parse(p),{replace:r,state:i,relative:a})),[u,p,a,r,i]),null}function be(e){c(!1)}function ye(n){let{basename:r="/",children:i=null,location:a,navigationType:o=e.Pop,navigator:s,static:l=!1,future:d}=n;J()&&c(!1);let u=r.replace(/^\/*/,"/"),h=t.useMemo((()=>({basename:u,navigator:s,static:l,future:H({v7_relativeSplatPath:!1},d)})),[u,d,s,l]);"string"===typeof a&&(a=f(a));let{pathname:p="/",search:m="",hash:g="",state:b=null,key:y="default"}=a,v=t.useMemo((()=>{let e=N(p,u);return null==e?null:{location:{pathname:e,search:m,hash:g,state:b,key:y},navigationType:o}}),[u,p,m,g,b,y,o]);return null==v?null:t.createElement(G.Provider,{value:h},t.createElement(K.Provider,{children:i,value:v}))}function ve(e){let{children:t,location:n}=e;return re(xe(t),n)}new Promise((()=>{}));t.Component;function xe(e,n){void 0===n&&(n=[]);let r=[];return t.Children.forEach(e,((e,i)=>{if(!t.isValidElement(e))return;let a=[...n,i];if(e.type===t.Fragment)return void r.push.apply(r,xe(e.props.children,a));e.type!==be&&c(!1),e.props.index&&e.props.children&&c(!1);let o={id:e.props.id||a.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(o.children=xe(e.props.children,a)),r.push(o)})),r}function we(){return we=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},we.apply(this,arguments)}function _e(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);const ke=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"];try{window.__reactRouterVersion="6"}catch(vy){}new Map;const Se=r.startTransition;o.flushSync,r.useId;function Ee(e){let{basename:n,children:r,future:i,window:a}=e,o=t.useRef();var s;null==o.current&&(o.current=(void 0===(s={window:a,v5Compat:!0})&&(s={}),m((function(e,t){let{pathname:n,search:r,hash:i}=e.location;return h("",{pathname:n,search:r,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||"default")}),(function(e,t){return"string"===typeof t?t:p(t)}),null,s)));let l=o.current,[c,d]=t.useState({action:l.action,location:l.location}),{v7_startTransition:u}=i||{},f=t.useCallback((e=>{u&&Se?Se((()=>d(e))):d(e)}),[d,u]);return t.useLayoutEffect((()=>l.listen(f)),[l,f]),t.useEffect((()=>me(i)),[i]),t.createElement(ye,{basename:n,children:r,location:c.location,navigationType:c.action,navigator:l,future:i})}const Ce="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement,Te=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ie=t.forwardRef((function(e,n){let r,{onClick:i,relative:a,reloadDocument:o,replace:s,state:l,target:d,to:u,preventScrollReset:h,viewTransition:f}=e,m=_e(e,ke),{basename:g}=t.useContext(G),b=!1;if("string"===typeof u&&Te.test(u)&&(r=u,Ce))try{let e=new URL(window.location.href),t=u.startsWith("//")?new URL(e.protocol+u):new URL(u),n=N(t.pathname,g);t.origin===e.origin&&null!=n?u=n+t.search+t.hash:b=!0}catch(vy){}let y=function(e,n){let{relative:r}=void 0===n?{}:n;J()||c(!1);let{basename:i,navigator:a}=t.useContext(G),{hash:o,pathname:s,search:l}=ne(e,{relative:r}),d=s;return"/"!==i&&(d="/"===s?i:L([i,s])),a.createHref({pathname:d,search:l,hash:o})}(u,{relative:a}),v=function(e,n){let{target:r,replace:i,state:a,preventScrollReset:o,relative:s,viewTransition:l}=void 0===n?{}:n,c=ee(),d=Q(),u=ne(e,{relative:s});return t.useCallback((t=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(t,r)){t.preventDefault();let n=void 0!==i?i:p(d)===p(u);c(e,{replace:n,state:a,preventScrollReset:o,relative:s,viewTransition:l})}}),[d,c,u,i,a,r,e,o,s,l])}(u,{replace:s,state:l,target:d,preventScrollReset:h,relative:a,viewTransition:f});return t.createElement("a",we({},m,{href:r||y,onClick:b||o?i:function(e){i&&i(e),e.defaultPrevented||v(e)},ref:n,target:d}))}));var je,Pe;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(je||(je={})),function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"}(Pe||(Pe={}));var Ae=function(){return Ae=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},Ae.apply(this,arguments)};Object.create;function Ne(e,t,n){if(n||2===arguments.length)for(var r,i=0,a=t.length;i<a;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var Re=n(324),Oe=n.n(Re),De="-ms-",Me="-moz-",Le="-webkit-",Fe="comm",ze="rule",$e="decl",Ue="@keyframes",Be=Math.abs,We=String.fromCharCode,He=Object.assign;function Ve(e){return e.trim()}function qe(e,t){return(e=t.exec(e))?e[0]:e}function Ge(e,t,n){return e.replace(t,n)}function Ke(e,t,n){return e.indexOf(t,n)}function Ye(e,t){return 0|e.charCodeAt(t)}function Ze(e,t,n){return e.slice(t,n)}function Je(e){return e.length}function Qe(e){return e.length}function Xe(e,t){return t.push(e),e}function et(e,t){return e.filter((function(e){return!qe(e,t)}))}var tt=1,nt=1,rt=0,it=0,at=0,ot="";function st(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:tt,column:nt,length:o,return:"",siblings:s}}function lt(e,t){return He(st("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function ct(e){for(;e.root;)e=lt(e.root,{children:[e]});Xe(e,e.siblings)}function dt(){return at=it>0?Ye(ot,--it):0,nt--,10===at&&(nt=1,tt--),at}function ut(){return at=it<rt?Ye(ot,it++):0,nt++,10===at&&(nt=1,tt++),at}function ht(){return Ye(ot,it)}function pt(){return it}function ft(e,t){return Ze(ot,e,t)}function mt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function gt(e){return tt=nt=1,rt=Je(ot=e),it=0,[]}function bt(e){return ot="",e}function yt(e){return Ve(ft(it-1,wt(91===e?e+2:40===e?e+1:e)))}function vt(e){for(;(at=ht())&&at<33;)ut();return mt(e)>2||mt(at)>3?"":" "}function xt(e,t){for(;--t&&ut()&&!(at<48||at>102||at>57&&at<65||at>70&&at<97););return ft(e,pt()+(t<6&&32==ht()&&32==ut()))}function wt(e){for(;ut();)switch(at){case e:return it;case 34:case 39:34!==e&&39!==e&&wt(at);break;case 40:41===e&&wt(e);break;case 92:ut()}return it}function _t(e,t){for(;ut()&&e+at!==57&&(e+at!==84||47!==ht()););return"/*"+ft(t,it-1)+"*"+We(47===e?e:ut())}function kt(e){for(;!mt(ht());)ut();return ft(e,it)}function St(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function Et(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case $e:return e.return=e.return||e.value;case Fe:return"";case Ue:return e.return=e.value+"{"+St(e.children,r)+"}";case ze:if(!Je(e.value=e.props.join(",")))return""}return Je(n=St(e.children,r))?e.return=e.value+"{"+n+"}":""}function Ct(e,t,n){switch(function(e,t){return 45^Ye(e,0)?(((t<<2^Ye(e,0))<<2^Ye(e,1))<<2^Ye(e,2))<<2^Ye(e,3):0}(e,t)){case 5103:return Le+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Le+e+e;case 4789:return Me+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Le+e+Me+e+De+e+e;case 5936:switch(Ye(e,t+11)){case 114:return Le+e+De+Ge(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Le+e+De+Ge(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Le+e+De+Ge(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Le+e+De+e+e;case 6165:return Le+e+De+"flex-"+e+e;case 5187:return Le+e+Ge(e,/(\w+).+(:[^]+)/,Le+"box-$1$2"+De+"flex-$1$2")+e;case 5443:return Le+e+De+"flex-item-"+Ge(e,/flex-|-self/g,"")+(qe(e,/flex-|baseline/)?"":De+"grid-row-"+Ge(e,/flex-|-self/g,""))+e;case 4675:return Le+e+De+"flex-line-pack"+Ge(e,/align-content|flex-|-self/g,"")+e;case 5548:return Le+e+De+Ge(e,"shrink","negative")+e;case 5292:return Le+e+De+Ge(e,"basis","preferred-size")+e;case 6060:return Le+"box-"+Ge(e,"-grow","")+Le+e+De+Ge(e,"grow","positive")+e;case 4554:return Le+Ge(e,/([^-])(transform)/g,"$1"+Le+"$2")+e;case 6187:return Ge(Ge(Ge(e,/(zoom-|grab)/,Le+"$1"),/(image-set)/,Le+"$1"),e,"")+e;case 5495:case 3959:return Ge(e,/(image-set\([^]*)/,Le+"$1$`$1");case 4968:return Ge(Ge(e,/(.+:)(flex-)?(.*)/,Le+"box-pack:$3"+De+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Le+e+e;case 4200:if(!qe(e,/flex-|baseline/))return De+"grid-column-align"+Ze(e,t)+e;break;case 2592:case 3360:return De+Ge(e,"template-","")+e;case 4384:case 3616:return n&&n.some((function(e,n){return t=n,qe(e.props,/grid-\w+-end/)}))?~Ke(e+(n=n[t].value),"span",0)?e:De+Ge(e,"-start","")+e+De+"grid-row-span:"+(~Ke(n,"span",0)?qe(n,/\d+/):+qe(n,/\d+/)-+qe(e,/\d+/))+";":De+Ge(e,"-start","")+e;case 4896:case 4128:return n&&n.some((function(e){return qe(e.props,/grid-\w+-start/)}))?e:De+Ge(Ge(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Ge(e,/(.+)-inline(.+)/,Le+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Je(e)-1-t>6)switch(Ye(e,t+1)){case 109:if(45!==Ye(e,t+4))break;case 102:return Ge(e,/(.+:)(.+)-([^]+)/,"$1"+Le+"$2-$3$1"+Me+(108==Ye(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Ke(e,"stretch",0)?Ct(Ge(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return Ge(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,(function(t,n,r,i,a,o,s){return De+n+":"+r+s+(i?De+n+"-span:"+(a?o:+o-+r)+s:"")+e}));case 4949:if(121===Ye(e,t+6))return Ge(e,":",":"+Le)+e;break;case 6444:switch(Ye(e,45===Ye(e,14)?18:11)){case 120:return Ge(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Le+(45===Ye(e,14)?"inline-":"")+"box$3$1"+Le+"$2$3$1"+De+"$2box$3")+e;case 100:return Ge(e,":",":"+De)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Ge(e,"scroll-","scroll-snap-")+e}return e}function Tt(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case $e:return void(e.return=Ct(e.value,e.length,n));case Ue:return St([lt(e,{value:Ge(e.value,"@","@"+Le)})],r);case ze:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,(function(t){switch(qe(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":ct(lt(e,{props:[Ge(t,/:(read-\w+)/,":-moz-$1")]})),ct(lt(e,{props:[t]})),He(e,{props:et(n,r)});break;case"::placeholder":ct(lt(e,{props:[Ge(t,/:(plac\w+)/,":"+Le+"input-$1")]})),ct(lt(e,{props:[Ge(t,/:(plac\w+)/,":-moz-$1")]})),ct(lt(e,{props:[Ge(t,/:(plac\w+)/,De+"input-$1")]})),ct(lt(e,{props:[t]})),He(e,{props:et(n,r)})}return""}))}}function It(e){return bt(jt("",null,null,null,[""],e=gt(e),0,[0],e))}function jt(e,t,n,r,i,a,o,s,l){for(var c=0,d=0,u=o,h=0,p=0,f=0,m=1,g=1,b=1,y=0,v="",x=i,w=a,_=r,k=v;g;)switch(f=y,y=ut()){case 40:if(108!=f&&58==Ye(k,u-1)){-1!=Ke(k+=Ge(yt(y),"&","&\f"),"&\f",Be(c?s[c-1]:0))&&(b=-1);break}case 34:case 39:case 91:k+=yt(y);break;case 9:case 10:case 13:case 32:k+=vt(f);break;case 92:k+=xt(pt()-1,7);continue;case 47:switch(ht()){case 42:case 47:Xe(At(_t(ut(),pt()),t,n,l),l);break;default:k+="/"}break;case 123*m:s[c++]=Je(k)*b;case 125*m:case 59:case 0:switch(y){case 0:case 125:g=0;case 59+d:-1==b&&(k=Ge(k,/\f/g,"")),p>0&&Je(k)-u&&Xe(p>32?Nt(k+";",r,n,u-1,l):Nt(Ge(k," ","")+";",r,n,u-2,l),l);break;case 59:k+=";";default:if(Xe(_=Pt(k,t,n,c,d,i,s,v,x=[],w=[],u,a),a),123===y)if(0===d)jt(k,t,_,_,x,a,u,s,w);else switch(99===h&&110===Ye(k,3)?100:h){case 100:case 108:case 109:case 115:jt(e,_,_,r&&Xe(Pt(e,_,_,0,0,i,s,v,i,x=[],u,w),w),i,w,u,s,r?x:w);break;default:jt(k,_,_,_,[""],w,0,s,w)}}c=d=p=0,m=b=1,v=k="",u=o;break;case 58:u=1+Je(k),p=f;default:if(m<1)if(123==y)--m;else if(125==y&&0==m++&&125==dt())continue;switch(k+=We(y),y*m){case 38:b=d>0?1:(k+="\f",-1);break;case 44:s[c++]=(Je(k)-1)*b,b=1;break;case 64:45===ht()&&(k+=yt(ut())),h=ht(),d=u=Je(v=k+=kt(pt())),y++;break;case 45:45===f&&2==Je(k)&&(m=0)}}return a}function Pt(e,t,n,r,i,a,o,s,l,c,d,u){for(var h=i-1,p=0===i?a:[""],f=Qe(p),m=0,g=0,b=0;m<r;++m)for(var y=0,v=Ze(e,h+1,h=Be(g=o[m])),x=e;y<f;++y)(x=Ve(g>0?p[y]+" "+v:Ge(v,/&\f/g,p[y])))&&(l[b++]=x);return st(e,t,n,0===i?ze:s,l,c,d,u)}function At(e,t,n,r){return st(e,t,n,Fe,We(at),Ze(e,2,-2),0,r)}function Nt(e,t,n,r,i){return st(e,t,n,$e,Ze(e,0,r),Ze(e,r+1,-1),r,i)}var Rt={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Ot="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}&&({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.SC_ATTR)||"data-styled",Dt="active",Mt="data-styled-version",Lt="6.1.17",Ft="/*!sc*/\n",zt="undefined"!=typeof window&&"HTMLElement"in window,$t=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BUILD_SHA:"48045be",REACT_APP_BUILD_TIME:"2026-05-06T16:58:25Z",REACT_APP_BUILD_NUM:"77",REACT_APP_FIREBASE_VAPID_KEY:""}.SC_DISABLE_SPEEDY)),Ut={},Bt=(new Set,Object.freeze([])),Wt=Object.freeze({});function Ht(e,t,n){return void 0===n&&(n=Wt),e.theme!==n.theme&&e.theme||t||n.theme}var Vt=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),qt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Gt=/(^-|-$)/g;function Kt(e){return e.replace(qt,"-").replace(Gt,"")}var Yt=/(a)(d)/gi,Zt=function(e){return String.fromCharCode(e+(e>25?39:97))};function Jt(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Zt(t%52)+n;return(Zt(t%52)+n).replace(Yt,"$1-$2")}var Qt,Xt=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},en=function(e){return Xt(5381,e)};function tn(e){return Jt(en(e)>>>0)}function nn(e){return e.displayName||e.name||"Component"}function rn(e){return"string"==typeof e&&!0}var an="function"==typeof Symbol&&Symbol.for,on=an?Symbol.for("react.memo"):60115,sn=an?Symbol.for("react.forward_ref"):60112,ln={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},cn={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},dn={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},un=((Qt={})[sn]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Qt[on]=dn,Qt);function hn(e){return("type"in(t=e)&&t.type.$$typeof)===on?dn:"$$typeof"in e?un[e.$$typeof]:ln;var t}var pn=Object.defineProperty,fn=Object.getOwnPropertyNames,mn=Object.getOwnPropertySymbols,gn=Object.getOwnPropertyDescriptor,bn=Object.getPrototypeOf,yn=Object.prototype;function vn(e,t,n){if("string"!=typeof t){if(yn){var r=bn(t);r&&r!==yn&&vn(e,r,n)}var i=fn(t);mn&&(i=i.concat(mn(t)));for(var a=hn(e),o=hn(t),s=0;s<i.length;++s){var l=i[s];if(!(l in cn||n&&n[l]||o&&l in o||a&&l in a)){var c=gn(t,l);try{pn(e,l,c)}catch(e){}}}}return e}function xn(e){return"function"==typeof e}function wn(e){return"object"==typeof e&&"styledComponentId"in e}function _n(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function kn(e,t){if(0===e.length)return"";for(var n=e[0],r=1;r<e.length;r++)n+=t?t+e[r]:e[r];return n}function Sn(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function En(e,t,n){if(void 0===n&&(n=!1),!n&&!Sn(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=En(e[r],t[r]);else if(Sn(t))for(var r in t)e[r]=En(e[r],t[r]);return e}function Cn(e,t){Object.defineProperty(e,"toString",{value:t})}function Tn(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var In=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,i=r;e>=i;)if((i<<=1)<0)throw Tn(16,"".concat(e));this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var a=r;a<i;a++)this.groupSizes[a]=0}for(var o=this.indexOfGroup(e+1),s=(a=0,t.length);a<s;a++)this.tag.insertRule(o,t[a])&&(this.groupSizes[e]++,o++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var i=n;i<r;i++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n,a=r;a<i;a++)t+="".concat(this.tag.getRule(a)).concat(Ft);return t},e}(),jn=new Map,Pn=new Map,An=1,Nn=function(e){if(jn.has(e))return jn.get(e);for(;Pn.has(An);)An++;var t=An++;return jn.set(e,t),Pn.set(t,e),t},Rn=function(e,t){An=t+1,jn.set(e,t),Pn.set(t,e)},On="style[".concat(Ot,"][").concat(Mt,'="').concat(Lt,'"]'),Dn=new RegExp("^".concat(Ot,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Mn=function(e,t,n){for(var r,i=n.split(","),a=0,o=i.length;a<o;a++)(r=i[a])&&e.registerName(t,r)},Ln=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(Ft),i=[],a=0,o=r.length;a<o;a++){var s=r[a].trim();if(s){var l=s.match(Dn);if(l){var c=0|parseInt(l[1],10),d=l[2];0!==c&&(Rn(d,c),Mn(e,d,l[3]),e.getTag().insertRules(c,i)),i.length=0}else i.push(s)}}},Fn=function(e){for(var t=document.querySelectorAll(On),n=0,r=t.length;n<r;n++){var i=t[n];i&&i.getAttribute(Ot)!==Dt&&(Ln(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function zn(){return n.nc}var $n=function(e){var t=document.head,n=e||t,r=document.createElement("style"),i=function(e){var t=Array.from(e.querySelectorAll("style[".concat(Ot,"]")));return t[t.length-1]}(n),a=void 0!==i?i.nextSibling:null;r.setAttribute(Ot,Dt),r.setAttribute(Mt,Lt);var o=zn();return o&&r.setAttribute("nonce",o),n.insertBefore(r,a),r},Un=function(){function e(e){this.element=$n(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var i=t[n];if(i.ownerNode===e)return i}throw Tn(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Bn=function(){function e(e){this.element=$n(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Wn=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Hn=zt,Vn={isServer:!zt,useCSSOMInjection:!$t},qn=function(){function e(e,t,n){void 0===e&&(e=Wt),void 0===t&&(t={});var r=this;this.options=Ae(Ae({},Vn),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&zt&&Hn&&(Hn=!1,Fn(this)),Cn(this,(function(){return function(e){for(var t=e.getTag(),n=t.length,r="",i=function(n){var i=function(e){return Pn.get(e)}(n);if(void 0===i)return"continue";var a=e.names.get(i),o=t.getGroup(n);if(void 0===a||!a.size||0===o.length)return"continue";var s="".concat(Ot,".g").concat(n,'[id="').concat(i,'"]'),l="";void 0!==a&&a.forEach((function(e){e.length>0&&(l+="".concat(e,","))})),r+="".concat(o).concat(s,'{content:"').concat(l,'"}').concat(Ft)},a=0;a<n;a++)i(a);return r}(r)}))}return e.registerId=function(e){return Nn(e)},e.prototype.rehydrate=function(){!this.server&&zt&&Fn(this)},e.prototype.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(Ae(Ae({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Wn(n):t?new Un(n):new Bn(n)}(this.options),new In(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(Nn(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Nn(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Nn(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Gn=/&/g,Kn=/^\s*\/\/.*$/gm;function Yn(e,t){return e.map((function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map((function(e){return"".concat(t," ").concat(e)}))),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=Yn(e.children,t)),e}))}function Zn(e){var t,n,r,i=void 0===e?Wt:e,a=i.options,o=void 0===a?Wt:a,s=i.plugins,l=void 0===s?Bt:s,c=function(e,r,i){return i.startsWith(n)&&i.endsWith(n)&&i.replaceAll(n,"").length>0?".".concat(t):e},d=l.slice();d.push((function(e){e.type===ze&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(Gn,n).replace(r,c))})),o.prefix&&d.push(Tt),d.push(Et);var u=function(e,i,a,s){void 0===i&&(i=""),void 0===a&&(a=""),void 0===s&&(s="&"),t=s,n=i,r=new RegExp("\\".concat(n,"\\b"),"g");var l=e.replace(Kn,""),c=It(a||i?"".concat(a," ").concat(i," { ").concat(l," }"):l);o.namespace&&(c=Yn(c,o.namespace));var u,h=[];return St(c,function(e){var t=Qe(e);return function(n,r,i,a){for(var o="",s=0;s<t;s++)o+=e[s](n,r,i,a)||"";return o}}(d.concat((u=function(e){return h.push(e)},function(e){e.root||(e=e.return)&&u(e)})))),h};return u.hash=l.length?l.reduce((function(e,t){return t.name||Tn(15),Xt(e,t.name)}),5381).toString():"",u}var Jn=new qn,Qn=Zn(),Xn=t.createContext({shouldForwardProp:void 0,styleSheet:Jn,stylis:Qn}),er=(Xn.Consumer,t.createContext(void 0));function tr(){return(0,t.useContext)(Xn)}function nr(e){var n=(0,t.useState)(e.stylisPlugins),r=n[0],i=n[1],a=tr().styleSheet,o=(0,t.useMemo)((function(){var t=a;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t}),[e.disableCSSOMInjection,e.sheet,e.target,a]),s=(0,t.useMemo)((function(){return Zn({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:r})}),[e.enableVendorPrefixes,e.namespace,r]);(0,t.useEffect)((function(){Oe()(r,e.stylisPlugins)||i(e.stylisPlugins)}),[e.stylisPlugins]);var l=(0,t.useMemo)((function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:o,stylis:s}}),[e.shouldForwardProp,o,s]);return t.createElement(Xn.Provider,{value:l},t.createElement(er.Provider,{value:s},e.children))}var rr=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=Qn);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Cn(this,(function(){throw Tn(12,String(n.name))}))}return e.prototype.getName=function(e){return void 0===e&&(e=Qn),this.name+e.hash},e}(),ir=function(e){return e>="A"&&e<="Z"};function ar(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;ir(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var or=function(e){return null==e||!1===e||""===e},sr=function(e){var t,n,r=[];for(var i in e){var a=e[i];e.hasOwnProperty(i)&&!or(a)&&(Array.isArray(a)&&a.isCss||xn(a)?r.push("".concat(ar(i),":"),a,";"):Sn(a)?r.push.apply(r,Ne(Ne(["".concat(i," {")],sr(a),!1),["}"],!1)):r.push("".concat(ar(i),": ").concat((t=i,null==(n=a)||"boolean"==typeof n||""===n?"":"number"!=typeof n||0===n||t in Rt||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function lr(e,t,n,r){return or(e)?[]:wn(e)?[".".concat(e.styledComponentId)]:xn(e)?!xn(i=e)||i.prototype&&i.prototype.isReactComponent||!t?[e]:lr(e(t),t,n,r):e instanceof rr?n?(e.inject(n,r),[e.getName(r)]):[e]:Sn(e)?sr(e):Array.isArray(e)?Array.prototype.concat.apply(Bt,e.map((function(e){return lr(e,t,n,r)}))):[e.toString()];var i}function cr(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(xn(n)&&!wn(n))return!1}return!0}var dr=en(Lt),ur=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&cr(e),this.componentId=t,this.baseHash=Xt(dr,t),this.baseStyle=n,qn.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=_n(r,this.staticRulesId);else{var i=kn(lr(this.rules,e,t,n)),a=Jt(Xt(this.baseHash,i)>>>0);if(!t.hasNameForId(this.componentId,a)){var o=n(i,".".concat(a),void 0,this.componentId);t.insertRules(this.componentId,a,o)}r=_n(r,a),this.staticRulesId=a}else{for(var s=Xt(this.baseHash,n.hash),l="",c=0;c<this.rules.length;c++){var d=this.rules[c];if("string"==typeof d)l+=d;else if(d){var u=kn(lr(d,e,t,n));s=Xt(s,u+c),l+=u}}if(l){var h=Jt(s>>>0);t.hasNameForId(this.componentId,h)||t.insertRules(this.componentId,h,n(l,".".concat(h),void 0,this.componentId)),r=_n(r,h)}}return r},e}(),hr=t.createContext(void 0);hr.Consumer;var pr={};new Set;function fr(e,n,r){var i=wn(e),a=e,o=!rn(e),s=n.attrs,l=void 0===s?Bt:s,c=n.componentId,d=void 0===c?function(e,t){var n="string"!=typeof e?"sc":Kt(e);pr[n]=(pr[n]||0)+1;var r="".concat(n,"-").concat(tn(Lt+n+pr[n]));return t?"".concat(t,"-").concat(r):r}(n.displayName,n.parentComponentId):c,u=n.displayName,h=void 0===u?function(e){return rn(e)?"styled.".concat(e):"Styled(".concat(nn(e),")")}(e):u,p=n.displayName&&n.componentId?"".concat(Kt(n.displayName),"-").concat(n.componentId):n.componentId||d,f=i&&a.attrs?a.attrs.concat(l).filter(Boolean):l,m=n.shouldForwardProp;if(i&&a.shouldForwardProp){var g=a.shouldForwardProp;if(n.shouldForwardProp){var b=n.shouldForwardProp;m=function(e,t){return g(e,t)&&b(e,t)}}else m=g}var y=new ur(r,p,i?a.componentStyle:void 0);function v(e,n){return function(e,n,r){var i=e.attrs,a=e.componentStyle,o=e.defaultProps,s=e.foldedComponentIds,l=e.styledComponentId,c=e.target,d=t.useContext(hr),u=tr(),h=e.shouldForwardProp||u.shouldForwardProp,p=Ht(n,d,o)||Wt,f=function(e,t,n){for(var r,i=Ae(Ae({},t),{className:void 0,theme:n}),a=0;a<e.length;a+=1){var o=xn(r=e[a])?r(i):r;for(var s in o)i[s]="className"===s?_n(i[s],o[s]):"style"===s?Ae(Ae({},i[s]),o[s]):o[s]}return t.className&&(i.className=_n(i.className,t.className)),i}(i,n,p),m=f.as||c,g={};for(var b in f)void 0===f[b]||"$"===b[0]||"as"===b||"theme"===b&&f.theme===p||("forwardedAs"===b?g.as=f.forwardedAs:h&&!h(b,m)||(g[b]=f[b]));var y=function(e,t){var n=tr();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(a,f),v=_n(s,l);return y&&(v+=" "+y),f.className&&(v+=" "+f.className),g[rn(m)&&!Vt.has(m)?"class":"className"]=v,r&&(g.ref=r),(0,t.createElement)(m,g)}(x,e,n)}v.displayName=h;var x=t.forwardRef(v);return x.attrs=f,x.componentStyle=y,x.displayName=h,x.shouldForwardProp=m,x.foldedComponentIds=i?_n(a.foldedComponentIds,a.styledComponentId):"",x.styledComponentId=p,x.target=i?a.target:e,Object.defineProperty(x,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,i=t;r<i.length;r++)En(e,i[r],!0);return e}({},a.defaultProps,e):e}}),Cn(x,(function(){return".".concat(x.styledComponentId)})),o&&vn(x,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),x}function mr(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var gr=function(e){return Object.assign(e,{isCss:!0})};function br(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(xn(e)||Sn(e))return gr(lr(mr(Bt,Ne([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?lr(r):gr(lr(mr(r,t)))}function yr(e,t,n){if(void 0===n&&(n=Wt),!t)throw Tn(1,t);var r=function(r){for(var i=[],a=1;a<arguments.length;a++)i[a-1]=arguments[a];return e(t,n,br.apply(void 0,Ne([r],i,!1)))};return r.attrs=function(r){return yr(e,t,Ae(Ae({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return yr(e,t,Ae(Ae({},n),r))},r}var vr=function(e){return yr(fr,e)},xr=vr;Vt.forEach((function(e){xr[e]=vr(e)}));var wr=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=cr(e),qn.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var i=r(kn(lr(this.rules,t,n,r)),""),a=this.componentId+e;n.insertRules(a,a,i)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&qn.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function _r(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=kn(br.apply(void 0,Ne([e],t,!1))),i=tn(r);return new rr(i,r)}(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=zn(),r=kn([n&&'nonce="'.concat(n,'"'),"".concat(Ot,'="true"'),"".concat(Mt,'="').concat(Lt,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw Tn(2);return e._emitSheetCSS()},this.getStyleElement=function(){var n;if(e.sealed)throw Tn(2);var r=e.instance.toString();if(!r)return[];var i=((n={})[Ot]="",n[Mt]=Lt,n.dangerouslySetInnerHTML={__html:r},n),a=zn();return a&&(i.nonce=a),[t.createElement("style",Ae({},i,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new qn({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw Tn(2);return t.createElement(nr,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw Tn(3)}})(),"__sc-".concat(Ot,"__");var kr=n(116),Sr=n(579);const Er=xr.footer`
  position: relative;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  margin-top: auto;
  font-family: 'Inter', sans-serif;
`,Cr=xr.div`
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
`,jr=()=>{const e=new Date,t=e.getFullYear(),n=`${e.getMonth()+1}/${e.getDate()}/${t}`;return(0,Sr.jsx)(Er,{children:(0,Sr.jsxs)(Cr,{children:[(0,Sr.jsxs)(Tr,{children:["Presented by Scrambled Legs\u2122 ",t," \u2022 ",n]}),(0,Sr.jsxs)(Ir,{children:["v ",kr.hl," \xb7 build ",kr.IN," \xb7 ",kr.ud]})]})})};var Pr=n(508),Ar=n(800),Nr=n(122);const Rr="BEsmXUl-hHK0FAmHVdbUeZ3kDbSyhOPId-66fJ5NRJ44XFYy5MujmXiXKBp8MH_7hBmFedktB5y7iF3NOjV86tY",Or="sl_notif_dismissed_until",Dr="sl_notif_token_hash",Mr="https://thescrambledlegs.com/android-chrome-192x192.png";function Lr(){return"undefined"!==typeof navigator&&(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream)}function Fr(){return"undefined"!==typeof window&&(!(!window.matchMedia||!window.matchMedia("(display-mode: standalone)").matches)||window.navigator&&!0===window.navigator.standalone)}function zr(){return"undefined"===typeof navigator?"desktop":Lr()?"ios":/Android/i.test(navigator.userAgent)?"android":"desktop"}function $r(){return"undefined"!==typeof window&&"Notification"in window&&"serviceWorker"in navigator&&"PushManager"in window}function Ur(){if(!$r())return"unsupported";if(Lr()&&!Fr())return"ios_needs_install";let e="default";try{e=Notification.permission}catch(vy){return"unsupported"}if("granted"===e)return"subscribed";if("denied"===e)return"blocked";let t=0;try{t=parseInt(localStorage.getItem(Or)||"0",10)||0}catch(vy){t=0}return Date.now()<t?"dismissed":"askable"}let Br=null;async function Wr(){if(!$r())throw new Error("This browser does not support push notifications.");const e=await Notification.requestPermission();try{const{logEvent:t}=await Promise.resolve().then(n.bind(n,173));"granted"===e?t("notification_permission_granted",{platform:zr()}):t("notification_permission_denied",{platform:zr(),permission:e})}catch(Bt){}if("granted"!==e)throw new Error("denied"===e?"Notifications are blocked. Open your browser settings to re-enable.":"Permission was not granted. Please try again and tap Allow.");const t=await(0,Nr.Oe)();if(!t)throw new Error("Firebase messaging is not available in this browser.");const r=await async function(){if(Br)return Br;if(!("serviceWorker"in navigator))throw new Error("Service workers not supported in this browser.");return Br=await navigator.serviceWorker.register("/firebase-messaging-sw.js"),Br}(),i=await(0,Pr.gf)(t,{vapidKey:Rr,serviceWorkerRegistration:r});if(!i)throw new Error("FCM did not return a token.");const a=await async function(e){const t=(new TextEncoder).encode(e),n=await crypto.subtle.digest("SHA-256",t),r=new Uint8Array(n);let i="";for(let a=0;a<r.length;a++)i+=r[a].toString(16).padStart(2,"0");return i}(i);try{const e=Nr.j2.currentUser,t=zr(),r={token:i,createdAt:(0,Ar.O5)(),lastSeenAt:(0,Ar.O5)(),userAgent:"undefined"!==typeof navigator?navigator.userAgent.slice(0,400):"",platform:t,isStandalone:Fr()};e&&(r.uid=e.uid,e.email&&(r.email=e.email),e.displayName?r.displayName=e.displayName:e.email&&(r.displayName=e.email.split("@")[0])),await(0,Ar.hZ)((0,Ar.ref)(Nr.OO,`fcmTokens/${a}`),r),e&&(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${e.uid}/devices/${a}`),{platform:t,lastSeenAt:(0,Ar.O5)(),notificationsEnabled:!0}).catch((()=>{}));try{const{logEvent:e}=await Promise.resolve().then(n.bind(n,173));e("notification_subscribed",{platform:t})}catch(Bt){}console.log("[messaging] Token written to Firebase /fcmTokens/",a.slice(0,8))}catch(o){throw console.error("[messaging] Token write FAILED \u2014 likely Firebase rules not deployed:",o.message),new Error("Subscribed but could not save your token to Firebase. Run `firebase deploy --only database` to deploy the database rules. Error: "+o.message)}try{localStorage.setItem(Dr,a),localStorage.removeItem(Or)}catch(vy){}return{token:i,hash:a}}async function Hr(e){if(!e)return;const t=function(){try{return localStorage.getItem(Dr)||null}catch(vy){return null}}();if(t)try{const n={uid:e.uid};e.email&&(n.email=e.email),e.displayName?n.displayName=e.displayName:e.email&&(n.displayName=e.email.split("@")[0]),n.lastSeenAt=(0,Ar.O5)(),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`fcmTokens/${t}`),n),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${e.uid}/devices/${t}`),{platform:zr(),lastSeenAt:(0,Ar.O5)(),notificationsEnabled:!0})}catch(Bt){}}function Vr(){try{localStorage.setItem(Or,String(Date.now()+864e5))}catch(vy){}}let qr=!1;const Gr=_r`
  from { opacity: 0; }
  to   { opacity: 1; }
`,Kr=_r`
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
`,Yr=xr.div`
  position: fixed;
  inset: 0;
  z-index: 9500;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  animation: ${Gr} 0.18s ease-out;
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
  animation: ${Kr} 0.28s cubic-bezier(0.18, 0.89, 0.32, 1.15);
  box-shadow: 0 -16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04);
  max-height: 90vh;
  overflow-y: auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`,Jr=xr.div`
  width: 38px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.18);
  margin: 0 auto 14px;
`,Qr=xr.h2`
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
`,ii=()=>(0,Sr.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",style:{verticalAlign:"middle"},children:[(0,Sr.jsx)("path",{d:"M12 3v13M7 8l5-5 5 5",stroke:"#FFC72C",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,Sr.jsx)("path",{d:"M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",stroke:"#FFC72C",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),ai=()=>(0,Sr.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",style:{verticalAlign:"middle"},children:(0,Sr.jsx)("path",{d:"M12 5v14M5 12h14",stroke:"#FFC72C",strokeWidth:"2.4",strokeLinecap:"round"})});function oi(){return(0,Sr.jsxs)(ei,{children:[(0,Sr.jsx)("h3",{children:"\ud83c\udf4e On iPhone? Apple makes us do this dance:"}),(0,Sr.jsxs)("ol",{children:[(0,Sr.jsxs)("li",{children:["Tap ",(0,Sr.jsx)(ii,{})," ",(0,Sr.jsx)("strong",{children:"Share"})," at the bottom of Safari"]}),(0,Sr.jsxs)("li",{children:["Tap ",(0,Sr.jsx)(ai,{})," ",(0,Sr.jsx)("strong",{children:"Add to Home Screen"})]}),(0,Sr.jsx)("li",{children:"Open the egg from your home screen"}),(0,Sr.jsxs)("li",{children:["Come back here and tap ",(0,Sr.jsx)("strong",{children:"Notify Me"})]})]}),(0,Sr.jsx)("div",{className:"quip",children:"(Yes, it's silly. Worth it.)"})]})}function si(){return(0,Sr.jsxs)(ei,{children:[(0,Sr.jsx)("h3",{children:"\ud83c\udf4e You're in!"}),(0,Sr.jsxs)("ul",{children:[(0,Sr.jsxs)("li",{children:["Tap ",(0,Sr.jsx)("strong",{children:"Notify Me"})," below."]}),(0,Sr.jsxs)("li",{children:["iPhone will ask once \u2014 tap ",(0,Sr.jsx)("strong",{children:"Allow"}),"."]})]})]})}function li(){return(0,Sr.jsxs)(ei,{children:[(0,Sr.jsx)("h3",{children:"\ud83c\udf10 Quick one."}),(0,Sr.jsxs)("ul",{children:[(0,Sr.jsxs)("li",{children:["Tap ",(0,Sr.jsx)("strong",{children:"Notify Me"})," below."]}),(0,Sr.jsxs)("li",{children:["Your browser will pop a permission box \u2014 hit ",(0,Sr.jsx)("strong",{children:"Allow"}),"."]}),(0,Sr.jsx)("li",{children:"That's it. You're scrambled."})]})]})}function ci(e){let{platform:t}=e;return(0,Sr.jsxs)(ei,{children:[(0,Sr.jsx)("h3",{children:"\ud83d\udee0 Re-enable notifications"}),(0,Sr.jsxs)("p",{style:{fontSize:13,color:"rgba(255,255,255,0.85)",margin:"0 0 8px"},children:["Open the site permissions and flip notifications back to ",(0,Sr.jsx)("strong",{children:"Allow"}),":"]}),(0,Sr.jsxs)("ul",{children:[(0,Sr.jsxs)("li",{children:[(0,Sr.jsx)("strong",{children:"iPhone:"})," Settings \u2192 Notifications \u2192 Scrambled Legs \u2192 Allow"]}),(0,Sr.jsxs)("li",{children:[(0,Sr.jsx)("strong",{children:"Android Chrome:"})," Tap the lock icon in the URL bar \u2192 Permissions \u2192 Notifications \u2192 Allow"]}),(0,Sr.jsxs)("li",{children:[(0,Sr.jsx)("strong",{children:"Desktop Chrome:"})," Tap the lock icon in the URL bar \u2192 Site settings \u2192 Notifications \u2192 Allow"]})]}),(0,Sr.jsx)("div",{className:"quip",children:"Once you flip it, refresh this page."})]})}const di=function(e){let{state:n,onClose:r}=e;const[i,a]=(0,t.useState)("desktop"),[o,s]=(0,t.useState)(!1),[l,c]=(0,t.useState)("");(0,t.useEffect)((()=>{a(zr());const e=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=e}}),[]);let d="Notify Me";return"ios_needs_install"===n?d="Got it, take me there":"blocked"===n&&(d="Got it"),o&&(d="Asking\u2026"),(0,Sr.jsx)(Yr,{onClick:e=>{e.target===e.currentTarget&&r&&r()},children:(0,Sr.jsxs)(Zr,{role:"dialog","aria-modal":"true","aria-labelledby":"sl-notif-headline",children:[(0,Sr.jsx)(Jr,{}),(0,Sr.jsx)(Qr,{id:"sl-notif-headline",children:"\ud83c\udf2d Join the Notification Club"}),(0,Sr.jsx)(Xr,{children:"Texts get buried. The group chat is chaos. Scrambled Legs drops notifications when there's a ride, a location change, or free beer. We'll only bother you when it actually matters. That's the scrambled promise."}),"blocked"===n?(0,Sr.jsx)(ci,{platform:i}):"ios_needs_install"===n?(0,Sr.jsx)(oi,{}):"ios"===i?(0,Sr.jsx)(si,{}):(0,Sr.jsx)(li,{}),(0,Sr.jsx)(ti,{type:"button",onClick:async()=>{if("ios_needs_install"!==n)if("blocked"!==n){c(""),s(!0);try{await Wr(),r&&r()}catch(e){c(e.message||"Subscribe failed."),s(!1)}}else r&&r();else r&&r()},disabled:o,children:d}),(0,Sr.jsx)(ri,{role:"alert",children:l}),"blocked"!==n&&(0,Sr.jsx)(ni,{type:"button",onClick:()=>{Vr(),r&&r()},children:"Maybe later"})]})})},ui=_r`
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
  ${e=>e.$pulse&&br`animation: ${ui} 2.2s ease-out 3;`}
`,mi=xr.button`
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

  ${e=>e.$pulse&&br`animation: ${ui} 1.8s ease-out infinite;`}
  ${e=>e.$wiggle&&br`animation: ${hi} 0.7s ease-in-out 1;`}

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
`,gi=xr.button`
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
`,bi=xr.button`
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
`,yi=[{title:"\ud83c\udf2d Join the Notification Club",sub:"Where we're riding. When plans change. Free beer. Scrambled Legs only bothers you when it counts."},{title:"\ud83e\udd5a Don't be a bad egg",sub:"Get Scrambled Legs ride alerts straight to your phone. No group chat required."},{title:"\ud83d\udeb4 Wednesday rolls are calling",sub:"Know where we're meeting before everyone else. Enable notifications."},{title:"\ud83d\udd25 Stay in the yolk",sub:"Ride changes, beer calls, and the occasional emergency \u2014 right to your phone."},{title:"\ud83c\udf2d The crew is already in",sub:"Scrambled Legs drops push notifications for rides, location changes, and free stuff."},{title:"\ud83e\udd5a Crack open notifications",sub:"Stop missing the Wednesday roll-out. It only takes a tap."}],vi=xr.span`
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
`;const _i=function(){const[e,n]=(0,t.useState)((()=>Ur())),[r,i]=(0,t.useState)(!1),[a,o]=(0,t.useState)(!0),[s,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)(!1),[u]=(0,t.useState)((()=>{try{const e=(parseInt(localStorage.getItem("sl_nudge_idx")||"0",10)+1)%yi.length;return localStorage.setItem("sl_nudge_idx",String(e)),yi[e]}catch{return yi[0]}}));(0,t.useEffect)((()=>{const t=()=>n(Ur()),r=()=>{"visible"===document.visibilityState&&t()};document.addEventListener("visibilitychange",r),window.addEventListener("focus",t),window.addEventListener("storage",t);try{sessionStorage.getItem("sl_notif_wiggle_done")||"askable"!==e||(sessionStorage.setItem("sl_notif_wiggle_done","1"),l(!0))}catch(vy){}return()=>{document.removeEventListener("visibilitychange",r),window.removeEventListener("focus",t),window.removeEventListener("storage",t)}}),[]),(0,t.useEffect)((()=>{const e=setTimeout((()=>o(!1)),7e3);return()=>clearTimeout(e)}),[]),(0,t.useEffect)((()=>{const e=Ur();if("askable"===e||"ios_needs_install"===e){const e=setTimeout((()=>{"askable"!==Ur()&&"ios_needs_install"!==Ur()||i(!0)}),3e3);return()=>clearTimeout(e)}if("dismissed"===e){const e=setTimeout((()=>d(!0)),3e3);return()=>clearTimeout(e)}}),[]);const h=(0,t.useCallback)((()=>{d(!1),Vr(),n(Ur())}),[]),p=(0,t.useCallback)((()=>{d(!1),i(!0)}),[]),f=(0,t.useCallback)((()=>i(!0)),[]),m=(0,t.useCallback)((()=>{i(!1),n(Ur())}),[]);if("unsupported"===e||"subscribed"===e)return null;if("blocked"===e)return(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(bi,{type:"button",onClick:f,"aria-label":"Notifications are blocked. Tap to fix.",children:[(0,Sr.jsx)("span",{className:"em",children:"\ud83e\udd5a"}),(0,Sr.jsxs)("span",{children:["You blocked us. Wild. ",(0,Sr.jsx)("span",{className:"arrow",children:"Tap to fix \u2192"})]})]}),r&&(0,Sr.jsx)(di,{state:e,onClose:m})]});if("dismissed"===e)return(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(gi,{type:"button",onClick:f,"aria-label":"Open notification subscribe",children:["\ud83d\udd14",(0,Sr.jsx)(vi,{children:"Subscribe to notifications"})]}),r&&(0,Sr.jsx)(di,{state:"askable",onClose:m})]});const g="ios_needs_install"===e;return(0,Sr.jsxs)(Sr.Fragment,{children:[c&&(0,Sr.jsxs)(wi,{role:"alert",children:[(0,Sr.jsx)("span",{className:"nudge-icon",children:"\ud83c\udf2d"}),(0,Sr.jsxs)("div",{className:"nudge-text",children:[(0,Sr.jsx)("div",{className:"nudge-title",children:u.title}),(0,Sr.jsx)("div",{className:"nudge-sub",children:u.sub})]}),(0,Sr.jsx)("button",{className:"nudge-enable",onClick:p,type:"button",children:"Enable"}),(0,Sr.jsx)("button",{className:"nudge-dismiss",onClick:h,type:"button","aria-label":"Dismiss",children:"\xd7"})]}),(0,Sr.jsxs)(pi,{children:[(0,Sr.jsx)(fi,{$pulse:!a,children:"Get Notified"}),(0,Sr.jsxs)(mi,{type:"button",$pulse:!0,$wiggle:s,$badge:g,onClick:f,"aria-label":"Subscribe to Scrambled Legs notifications",children:["\ud83d\udd14",(0,Sr.jsx)(vi,{children:g?"Install to get notifications on iPhone":"Subscribe to notifications"})]})]}),r&&(0,Sr.jsx)(di,{state:e,onClose:m})]})},ki="sl_install_dismissed";function Si(){try{const e=parseInt(localStorage.getItem(ki)||"0",10);return Date.now()<e}catch{return!1}}function Ei(){try{localStorage.setItem(ki,String(Date.now()+6048e5))}catch{}}const Ci=_r`
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
  animation: ${Ci} 0.35s cubic-bezier(.34,1.56,.64,1) forwards;

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
`,Mi=xr.span`
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
`;function Li(){return(0,Sr.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#FFC72C",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round",style:{display:"inline",verticalAlign:"middle",marginRight:2},"aria-hidden":"true",children:[(0,Sr.jsx)("path",{d:"M8.59 5.41L12 2l3.41 3.41"}),(0,Sr.jsx)("line",{x1:"12",y1:"2",x2:"12",y2:"15"}),(0,Sr.jsx)("path",{d:"M5 10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1"})]})}function Fi(e){let{deferredPrompt:n,onDismiss:r}=e;const i=(0,t.useCallback)((async()=>{if(n)try{n.prompt();const{outcome:e}=await n.userChoice;"accepted"===e&&r(!0)}catch(e){console.warn("[InstallPrompt] Android prompt error:",e)}}),[n,r]);return(0,Sr.jsxs)(Ti,{role:"complementary","aria-label":"Install app prompt",children:[(0,Sr.jsx)(Ii,{children:"\ud83e\udd5a"}),(0,Sr.jsxs)(ji,{children:[(0,Sr.jsx)(Pi,{children:"Add Scrambled Legs to your home screen"}),(0,Sr.jsx)(Ai,{children:"Get the app experience \u2014 faster loads, offline access, and push notifications."})]}),(0,Sr.jsx)(Ni,{type:"button",onClick:i,children:"Install"}),(0,Sr.jsx)(Ri,{type:"button","aria-label":"Dismiss install prompt",onClick:()=>r(!1),children:"\xd7"})]})}function zi(e){let{onDismiss:t}=e;return(0,Sr.jsxs)(Ti,{role:"complementary","aria-label":"Add to Home Screen instructions",children:[(0,Sr.jsx)(Ii,{children:"\ud83e\udd5a"}),(0,Sr.jsxs)(ji,{children:[(0,Sr.jsx)(Pi,{children:"Install on iPhone"}),(0,Sr.jsx)(Ai,{children:"Required for notifications on iPhone."}),(0,Sr.jsxs)(Oi,{children:[(0,Sr.jsxs)(Di,{children:[(0,Sr.jsx)(Mi,{children:"1"}),"Tap ",(0,Sr.jsx)(Li,{})," ",(0,Sr.jsx)("strong",{style:{color:"#FFC72C"},children:"Share"})," in your browser toolbar"]}),(0,Sr.jsxs)(Di,{children:[(0,Sr.jsx)(Mi,{children:"2"}),"Choose ",(0,Sr.jsx)("strong",{style:{color:"#FFC72C"},children:"Add to Home Screen \uff0b"})]}),(0,Sr.jsxs)(Di,{children:[(0,Sr.jsx)(Mi,{children:"3"}),"Tap ",(0,Sr.jsx)("strong",{style:{color:"#FFC72C"},children:"Add"})," \u2014 done!"]})]})]}),(0,Sr.jsx)(Ri,{type:"button","aria-label":"Dismiss iOS install prompt",onClick:t,children:"\xd7"})]})}function $i(){const[e,n]=(0,t.useState)(null),[r,i]=(0,t.useState)(!1),a=(0,t.useRef)(!1);(0,t.useEffect)((()=>{if(function(){try{return window.matchMedia("(display-mode: standalone)").matches}catch{return!1}}())return;if(Si())return;const e=e=>{e.preventDefault(),n(e)};window.addEventListener("beforeinstallprompt",e);const t=()=>{n(null)};return window.addEventListener("appinstalled",t),()=>{window.removeEventListener("beforeinstallprompt",e),window.removeEventListener("appinstalled",t)}}),[]),(0,t.useEffect)((()=>{if(a.current=!0,!Lr())return;if(Fr())return;if(Si())return;const e=setTimeout((()=>{a.current&&i(!0)}),5e3);return()=>{a.current=!1,clearTimeout(e)}}),[]);const o=(0,t.useCallback)((e=>{n(null),e||Ei()}),[]),s=(0,t.useCallback)((()=>{i(!1),Ei()}),[]);return e?(0,Sr.jsx)(Fi,{deferredPrompt:e,onDismiss:o}):r?(0,Sr.jsx)(zi,{onDismiss:s}):null}const Ui="events";function Bi(){return(0,Ar.ref)(Nr.OO,Ui)}function Wi(e){return(0,Ar.ref)(Nr.OO,`${Ui}/${e}`)}function Hi(e){const t=Bi(),n=t=>{const n=[];t.forEach((e=>{const t=e.val()||{};n.push({id:e.key,...t})})),n.sort(((e,t)=>(e.start||0)-(t.start||0))),e(n)};return(0,Ar.Zy)(t,n),()=>(0,Ar.AU)(t,"value",n)}function Vi(e){const t=Date.now(),n=[],r=[];return e.forEach((e=>{const i=6e4*(e.durationMinutes||120);(e.start||0)+i>=t?n.push(e):r.push(e)})),n.sort(((e,t)=>(e.start||0)-(t.start||0))),r.sort(((e,t)=>(t.start||0)-(e.start||0))),{upcoming:n,past:r}}const qi="sl_events_cache_v2";function Gi(){const[e,n]=(0,t.useState)((()=>function(){try{const e=localStorage.getItem(qi);if(!e)return null;const{events:t}=JSON.parse(e);return Array.isArray(t)?t:null}catch{return null}}()||[])),[r,i]=(0,t.useState)(!0);return(0,t.useEffect)((()=>{const e=Hi((e=>{n(e),i(!1),function(e){try{localStorage.setItem(qi,JSON.stringify({events:e,t:Date.now()}))}catch{}}(e)}));return e}),[]),{events:e,isStale:r}}const Ki="America/Chicago",Yi=72e5;function Zi(e,t,n){const r=function(e,t){const n=new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)),r=e=>parseInt(n.find((t=>t.type===e)).value,10);return Date.UTC(r("year"),r("month")-1,r("day"),r("hour"),r("minute"),r("second"))-e}(Date.UTC(e,t-1,n,12,0,0),Ki);return Date.UTC(e,t-1,n,0,0,0)-r}function Ji(e){const t=Date.now();return t<e.start?"upcoming":t<e.start+Yi?"in_progress":t<function(e){const t=new Intl.DateTimeFormat("en-CA",{timeZone:Ki,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)),[n,r,i]=t.split("-").map(Number);return Zi(n,r,i+1)}(e.start)?"beers":"archived"}const Qi={upcoming:"UPCOMING",in_progress:"IN PROGRESS",beers:"BEERS BEING CONSUMED"};function Xi(e){if(e<=0)return null;const t=Math.floor(e/1e3),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),a=t%60,o=e=>String(e).padStart(2,"0");return n>0?`${n}d \xb7 ${o(r)}h \xb7 ${o(i)}m \xb7 ${o(a)}s`:r>0?`${o(r)}h \xb7 ${o(i)}m \xb7 ${o(a)}s`:`${o(i)}m \xb7 ${o(a)}s`}function ea(e){const t=Math.floor(e/6e4),n=Math.floor(t/60),r=t%60;return n>0?`${n}h ${r} min in`:`${r} min in`}const ta=e=>new Intl.DateTimeFormat(void 0,{weekday:"short",month:"short",day:"numeric"}).format(new Date(e)),na=e=>new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(e)),ra=e=>new Date(e).getDate(),ia=e=>new Intl.DateTimeFormat(void 0,{month:"short"}).format(new Date(e)).toUpperCase(),aa=e=>(new Intl.NumberFormat).format(e||0);function oa(e){return(e-Date.now())/864e5<=10}function sa(e){if(!e.startLoc)return"#";const t=/iPad|iPhone|iPod/.test(navigator.userAgent),n=e.startLoc.lat===(e.endLoc&&e.endLoc.lat)&&e.startLoc.lng===(e.endLoc&&e.endLoc.lng);return t?`https://maps.apple.com/?daddr=${e.startLoc.lat},${e.startLoc.lng}`:n||!e.endLoc?`https://www.google.com/maps/dir/?api=1&destination=${e.startLoc.lat},${e.startLoc.lng}`:`https://www.google.com/maps/dir/?api=1&origin=${e.startLoc.lat},${e.startLoc.lng}&destination=${e.endLoc.lat},${e.endLoc.lng}`}function la(e){const t=e=>new Date(e).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");return`https://calendar.google.com/calendar/render?${new URLSearchParams({action:"TEMPLATE",text:e.name,dates:`${t(e.start)}/${t(e.start+72e5)}`,details:`${e.description||""}\n\nhttps://thescrambledlegs.com/events/${e.id}`,location:e.startLoc?e.startLoc.label:""}).toString()}`}function ca(e){if(!e)return null;try{const t=new URL(e).hostname.toLowerCase();return t.includes("strava")?"Strava":t.includes("ridewithgps")?"Ride with GPS":t.includes("trailforks")?"Trailforks":t.includes("komoot")?"Komoot":t.includes("garmin")?"Garmin Connect":e.toLowerCase().endsWith(".gpx")?"GPX file":null}catch{return null}}const da=xr.div`
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
`,ua=xr.div`
  width: 100%;
  height: 100%;
`;function ha(e){let{startLoc:n,endLoc:r}=e;const i=(0,t.useRef)(null),a=(0,t.useRef)(null),o=null===n||void 0===n?void 0:n.lat,s=null===n||void 0===n?void 0:n.lng,l=null===r||void 0===r?void 0:r.lat,c=null===r||void 0===r?void 0:r.lng;return(0,t.useEffect)((()=>{if(!i.current||null==o||null==s||!window.L)return;const e=setTimeout((()=>{if(!i.current)return;a.current&&(a.current.remove(),a.current=null);const e=window.L,t=e.map(i.current,{zoomControl:!1,attributionControl:!1,scrollWheelZoom:!1,dragging:!1,tap:!1}).setView([o,s],14);e.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:19}).addTo(t);const n=e.divIcon({className:"pin-yolk",iconSize:[18,18],iconAnchor:[9,9]});e.marker([o,s],{icon:n}).addTo(t);null!=l&&null!=c&&(l!==o||c!==s)&&(e.marker([l,c],{icon:n}).addTo(t),e.polyline([[o,s],[l,c]],{color:"#FFC72C",weight:3,opacity:.7,dashArray:"6 8"}).addTo(t),t.fitBounds([[o,s],[l,c]],{padding:[40,40]})),a.current=t}),30);return()=>{clearTimeout(e),a.current&&(a.current.remove(),a.current=null)}}),[o,s,l,c]),(0,Sr.jsx)(da,{children:(0,Sr.jsx)(ua,{ref:i})})}const pa=xr.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  pointer-events: none;
`,fa=xr.span`
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
`;function ma(e){let{weather:t}=e;if(!t)return null;const n=t.sunset?(()=>{try{return new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(t.sunset))}catch{return null}})():null;return(0,Sr.jsxs)(pa,{children:[(0,Sr.jsxs)(fa,{className:"weather-pill",children:[(0,Sr.jsx)("span",{children:t.icon||"\ud83c\udf24"}),(0,Sr.jsx)("span",{children:null!=t.temp?`${t.temp}\xb0`:"\u2014\xb0"})]}),null!=t.wind&&(0,Sr.jsxs)(fa,{className:"weather-pill",children:["\ud83d\udca8 ",t.wind," mph"]}),null!=t.precip&&(0,Sr.jsxs)(fa,{className:"weather-pill"+(t.precip>=50?" warn":""),children:["\ud83d\udca7 ",t.precip,"%"]}),n&&(0,Sr.jsxs)(fa,{className:"weather-pill",children:["\ud83c\udf05 ",n]})]})}const ga=_r`
  0%, 100% { transform: rotate(-30deg); }
  50%       { transform: rotate(30deg); }
`,ba=_r`
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
`,ya=xr.div`
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
`,va=xr.div`
  position: relative;
  width: 76px;
  height: 76px;
  pointer-events: auto;

  @media (max-width: 380px) {
    width: 68px;
    height: 68px;
  }
`,xa=xr.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #1a1a1a;
  box-shadow: 0 6px 18px rgba(0,0,0,0.55), 0 0 0 2px #FFC72C;
  object-fit: cover;
  background: linear-gradient(135deg, #555, #333);
  display: block;
`,wa=xr.div`
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
`,_a=xr.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation: ${ga} 5.5s ease-in-out infinite;
  transform-origin: 50% 50%;
`,ka=xr.span`
  position: absolute;
  top: -27px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  animation: ${ba} 1.8s ease-in-out infinite;

  @media (max-width: 380px) {
    top: -24px;
    font-size: 22px;
  }
`,Sa=xr.div`
  margin-top: 6px;
  text-align: center;
  pointer-events: none;
  max-width: 96px;
  width: 96px;

  @media (max-width: 380px) {
    max-width: 88px;
    width: 88px;
  }
`,Ea=xr.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #FFC72C;
  text-shadow: 0 1px 4px rgba(0,0,0,0.85), 0 0 8px rgba(0,0,0,0.8);
`,Ca=xr.span`
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
`;function Ta(e){let{rideLeader:t}=e;return t?(0,Sr.jsxs)(ya,{children:[(0,Sr.jsxs)(va,{children:[t.photoUrl?(0,Sr.jsx)(xa,{src:t.photoUrl,alt:t.name}):(0,Sr.jsx)(wa,{children:"\ud83d\udeb4"}),(0,Sr.jsx)(_a,{children:(0,Sr.jsx)(ka,{children:"\ud83d\udc51"})})]}),(0,Sr.jsxs)(Sa,{children:[(0,Sr.jsx)(Ea,{children:"Ride Leader"}),(0,Sr.jsx)(Ca,{children:t.name})]})]}):null}const Ia={0:["\u2600\ufe0f","Clear"],1:["\ud83c\udf24","Mostly clear"],2:["\u26c5","Partly cloudy"],3:["\u2601\ufe0f","Overcast"],45:["\ud83c\udf2b","Fog"],48:["\ud83c\udf2b","Freezing fog"],51:["\ud83c\udf26","Light drizzle"],53:["\ud83c\udf26","Drizzle"],55:["\ud83c\udf27","Heavy drizzle"],61:["\ud83c\udf27","Light rain"],63:["\ud83c\udf27","Rain"],65:["\ud83c\udf27","Heavy rain"],71:["\ud83c\udf28","Light snow"],73:["\ud83c\udf28","Snow"],75:["\u2744\ufe0f","Heavy snow"],77:["\ud83c\udf28","Snow grains"],80:["\ud83c\udf26","Rain showers"],81:["\ud83c\udf27","Heavy showers"],82:["\u26c8","Violent showers"],85:["\ud83c\udf28","Snow showers"],86:["\u2744\ufe0f","Heavy snow showers"],95:["\u26c8","Thunderstorm"],96:["\u26c8","Thunderstorm + hail"],99:["\u26c8","Severe thunderstorm"]};function ja(e,n,r){const[i,a]=(0,t.useState)(null),[o,s]=(0,t.useState)(!1),[l,c]=(0,t.useState)(0);return(0,t.useEffect)((()=>{if(e&&n&&r&&oa(r)){if(s(!0),l>0)try{const t=new Date(r),i=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`,a=`sl_wx_${e.toFixed(3)}_${n.toFixed(3)}_${i}_${t.getHours()}`;localStorage.removeItem(a)}catch(Bt){}(async function(e,t,n){const r=new Date(n),i=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`,a=`sl_wx_${e.toFixed(3)}_${t.toFixed(3)}_${i}_${r.getHours()}`,o=localStorage.getItem(a);if(o)try{const e=JSON.parse(o);if(e.expires>Date.now())return e.data}catch{}if((n-Date.now())/864e5>10)return null;const s=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${t}&hourly=temperature_2m,weather_code,wind_speed_10m,precipitation_probability&daily=sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&start_date=${i}&end_date=${i}`;try{var l,c,d;const e=await fetch(s);if(!e.ok)return null;const t=await e.json(),n=r.getHours(),i=t.hourly.weather_code[n],[o,u]=Ia[i]||["\ud83c\udf24","Forecast"],h={temp:Math.round(t.hourly.temperature_2m[n]),icon:o,desc:u,code:i,wind:Math.round(t.hourly.wind_speed_10m[n]),precip:null!==(l=t.hourly.precipitation_probability[n])&&void 0!==l?l:0,sunset:(null===(c=t.daily)||void 0===c||null===(d=c.sunset)||void 0===d?void 0:d[0])||null,real:!0};return localStorage.setItem(a,JSON.stringify({data:h,expires:Date.now()+18e5})),h}catch{return null}})(e,n,r).then((e=>{a(e),s(!1)})).catch((()=>s(!1)))}}),[e,n,r,l]),(0,t.useEffect)((()=>{const e=()=>c((e=>e+1));return window.addEventListener("staleSession:soft",e),()=>window.removeEventListener("staleSession:soft",e)}),[]),{data:i,isLoading:o}}const Pa="gemini-3-flash-preview";let Aa=new Map,Na=null;async function Ra(e){const{getAI:t,getGenerativeModel:r,GoogleAIBackend:i}=await n.e(451).then(n.bind(n,451));return Na||(Na=t(Nr.yA,{backend:new i})),Aa.has(e)||Aa.set(e,r(Na,{model:e})),Aa.get(e)}function Oa(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{data:n,system:r,maxTokens:i,temperature:a,thinkingLevel:o}=t,s=function(e,t){return void 0===t||null===t?e:`${e}\n\n${"string"===typeof t?t:JSON.stringify(t,null,2)}`}(e,n),l={contents:[{role:"user",parts:[{text:s}]}]};r&&(l.systemInstruction={role:"system",parts:[{text:r}]});const c={};return"number"===typeof i&&(c.maxOutputTokens=i),"number"===typeof a&&(c.temperature=a),o&&(c.thinkingConfig={thinkingLevel:o}),Object.keys(c).length&&(l.generationConfig=c),l}const Da=kr.ud&&"local"!==kr.ud?kr.ud:"dev";function Ma(e){if("string"!==typeof e||!e)throw new Error("cacheKey must be a non-empty string");return`v_${Da}_${e}`.replace(/[.#$[\]/]/g,"_").slice(0,200)}function La(e){return(0,Ar.ref)(Nr.OO,`aiCache/${e}`)}function Fa(e,t){return!(!e||"number"!==typeof e.generatedAt)&&Date.now()-e.generatedAt<t}function za(e){return!(!e||!e.lock)&&("number"===typeof e.lockedAt&&Date.now()-e.lockedAt<3e4)}async function $a(e){const t=await(0,Ar.get)(La(e));return t.exists()?t.val():null}async function Ua(e,t){const n=t.model||Pa,r=await Ra(n),i=Oa(e,t);return(await r.generateContent(i)).response.text()}function Ba(e){return"string"===typeof e&&e.trim().length>0}async function Wa(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.cacheKey?async function(e,t){const{cacheKey:n,ttlMs:r,forceRefresh:i}=t;if("number"!==typeof r||r<=0)throw new Error("ttlMs (positive number) is required when cacheKey is set");const a=Ma(n),o=La(a);let s,l=await $a(a);if(!i&&Fa(l,r)&&Ba(l&&l.value))return l.value;if(!i&&za(l)){const e=Date.now();for(;Date.now()-e<5e3;){await new Promise((e=>setTimeout(e,1e3)));const e=await $a(a);if(e&&Fa(e,r)&&Ba(e.value)&&!e.lock)return e.value;if(!za(e)){l=e;break}}}try{await(0,Ar.hZ)(o,{...l||{},lock:!0,lockedAt:Date.now()})}catch(Bt){}try{s=await Ua(e,t)}catch(c){try{l&&Ba(l.value)?await(0,Ar.hZ)(o,{value:l.value,prompt:l.prompt||"",generatedAt:l.generatedAt||Date.now(),ttlMs:l.ttlMs||r}):await(0,Ar.TF)(o)}catch(Bt){}throw"undefined"!==typeof console&&console.warn&&console.warn("[ai.runPrompt] generateContent failed:",c&&(c.message||c)),c}if(!Ba(s)){try{l&&Ba(l.value)?await(0,Ar.hZ)(o,{value:l.value,prompt:l.prompt||"",generatedAt:l.generatedAt||Date.now(),ttlMs:l.ttlMs||r}):await(0,Ar.TF)(o)}catch(Bt){}return"undefined"!==typeof console&&console.warn&&console.warn("[ai.runPrompt] empty response \u2014 not caching. cacheKey=",a),s}try{await(0,Ar.hZ)(o,{value:s,prompt:"string"===typeof e?e.slice(0,2e3):"",generatedAt:(0,Ar.O5)(),ttlMs:r})}catch(c){console.warn("[ai.cache] write FAILED \u2014 returning value uncached. cacheKey=",a,"| reason:",c&&(c.message||c))}return s}(e,t):Ua(e,t)}async function Ha(e){if(!e)return null;return $a(Ma(e))}async function Va(e){if(e){const t=Ma(e);await(0,Ar.TF)(La(t))}else await(0,Ar.TF)((0,Ar.ref)(Nr.OO,"aiCache"))}"undefined"!==typeof window&&(window.__sl_ai={runPrompt:Wa,streamPrompt:async function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=await Ra(n.model||Pa),i=Oa(e,n),a=await r.generateContentStream(i);let o="";for await(const s of a.stream){const e=s.text();o+=e,"function"===typeof t&&t(e)}return o},getCachedPrompt:async function(e){if(!e)return null;const t=Ma(e),n=await $a(t);return n&&Ba(n.value)?n.value:null},clearCache:Va,_readCacheRaw:Ha,_sanitizeCacheKey:Ma});const qa=[{name:"Casey Newton",aliases:["Glarbtron","GLARBTRON","Glarb Tron"],emails:[],blurb:"Dr. Casey Newton, dentist by day \u2014 but his true form is GLARBTRON, an all-powerful super being with supreme artificial intelligence. Vacuum-tube heart, blinking-light eyes, classic 1950s sci-fi shell housing a god-tier mind. Hell-bent on world domination \u2014 and on track to achieve it. Fundamentally everything, everywhere, all at once. Trained all winter on Zwift, guarantees dad pace, flosses harder than you mash, exists in all timelines simultaneously."},{name:"Tyler Vandal",aliases:["VANDAL","Vandal"],emails:[],blurb:"VANDAL chases you with a story you've heard. Stubborn as a knot. Will talk you into a coma \u2014 willingly or not."},{name:"Matt Wiley",aliases:["Matt Willey"],emails:[],blurb:"Matt rides to have beer. He'll show up 30 minutes late on his third IPA, somehow ahead of you, annoyingly confident."},{name:"Derek VanSlyke",aliases:["Spandex Warrior","Roddy","Roddie","RODDIE"],emails:[],blurb:"Derek 'Roddy' VanSlyke \u2014 full-blown Zwift roadie now. Spandex Warrior. Pure road. Pure indoor watts. He doesn't even pretend to mountain bike anymore. Pray for him."},{name:"Will Markes",aliases:["William Markes"],emails:[],blurb:"Will is getting fast and won't stop training. PA in urology \u2014 knows where everyone's pain points are, spends his days dealing with kidney stones tougher than your climbs. Motivational."},{name:"Paul Manoppo",aliases:[],emails:[],blurb:"Paul broke his back in three places, had six surgeries, has a titanium knee, a zip-tie spine, and is somehow ahead of you. The comeback legend."},{name:"Brent St. Martin",aliases:["Brent St Martin","Brent StMartin"],emails:[],blurb:"Brent is not having fun. This is not his type of fun. You are wrong for enjoying this."},{name:"Alex Birno",aliases:["Alexa Birno"],emails:[],blurb:"Alex is on the back nine, drove his snowmobile to the golf course in July, eagles harder than you mash. Rad dad."},{name:"Jordan Gnerer",aliases:["Bad Egg","Little Chip","little chip"],emails:[],blurb:"Jordan 'Little Chip' Gnerer \u2014 aka the Bad Egg. Recently took up running, but he's too old for it now and his IT band has staged a revolt. Failing at every sport he tries. Should probably just stick to ice fishing. Crashes a bike, twangs a knee, drops a line in the lake \u2014 that's the cycle."},{name:"Dave SWIDZ",aliases:["David Swidz","SWIDZ","Swidz"],emails:[],blurb:"SWIDZ is a downhill bro through and through \u2014 boosts off everything, sends it to the moon, gets big air. Parties hard but somehow always shows up. Super easy-going, the chillest dude on the team. If there's a jump, he's launching it. If there's a beer, he's drinking it. If there's a couch, he's crashing on it."},{name:"Pig Boy",aliases:["Zack Klein","Zack Kline","PigBoy"],emails:[],blurb:"Pig Boy broke every bone in his body. Watches from the couch now. Too scared to send it."},{name:"Reed Peer",aliases:["REED","Reid"],emails:["reedpeer@gmail.com"],blurb:"Reed Peer with DBS here \u2014 Duluth Basement Services, sales guy, will pitch you a basement remodel mid-climb. Outdoor everything: ice fishing, hunting, mountain biking, Boundary Waters. Rides a Trek Rumblefish \u2014 calls it the best mountain bike he's ever owned, and won't shut up about it. Probably has a sales call in 10 minutes."},{name:"Alexa Mattson",aliases:[],emails:["alexamattson2@gmail.com"],blurb:"Alexa is a runner first \u2014 Grandma's Marathon is her thing and she takes it seriously. New to mountain biking but already crushing it, which is annoying. Genuinely one of the best hangs on the team \u2014 super friendly, everyone likes her immediately. Loves her dog and her family more than she loves you, which is saying something. Her post-ride beverage of choice is a THC sparkling drink \u2014 the chill alternative crowd, fully committed."},{name:"Ashley Zimm",aliases:["zimm.ashley"],emails:["zimm.ashley@gmail.com"],blurb:"Ashley is an ultra-runner, dentist, and mom \u2014 certified smoke show outpacing everyone with zero notice."},{name:"George Lyall",aliases:["Coach Lyle","Coach Lyall"],emails:[],blurb:"Coach Lyall organizes Whisk-In Wednesday and rides at one pace: steady. Predictable as paint drying on a wall. Nice and steady pedal, every time. He's a cool dude though \u2014 dog dad, lawn enthusiast, hunts, fishes, and is almost ALWAYS at his cabin. If he actually shows up to a Whisk-In or any event, that's the news of the week \u2014 they let him out of the cabin."},{name:"Reece Zimm",aliases:["REECEZIMM","reecezimm","Calf Daddy","GM Zimm"],emails:["zimm.reece@gmail.com","gm@thescrambledlegs.com"],blurb:"GM Reece Zimm \u2014 aka Calf Daddy. Used to be fast. Now thoroughly average. No fun, no talking, no laughing. All business. Just hammers. Tried-and-true navigator. Coach Lyall reports to him. Be on time."},{name:"Reece Hickman",aliases:[],emails:[],blurb:"Reece Hickman is a separate Reece \u2014 not the GM, not Calf Daddy. Just here to ride."}];function Ga(e){return(e||"").toString().trim().toLowerCase()}function Ka(e){let t=5381;const n=String(e||"");for(let r=0;r<n.length;r++)t=(t<<5)+t+n.charCodeAt(r)|0;return Math.abs(t).toString(36)}function Ya(e){try{return new Intl.DateTimeFormat("en-CA",{timeZone:"America/Chicago",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}catch{return null}}function Za(e){if(!e)return!1;const t=Ya(e),n=Ya(Date.now());return!(!t||!n)&&n>t}function Ja(e){if(!e)return 72e5;if(Za(e))return 31536e6;const t=e-Date.now();if(t<0){return-t>=72e5?36e5:18e5}const n=t/36e5;return n<=2?3e5:n<=6?9e5:n<=12?12e5:n<=24?36e5:n<=72?144e5:216e5}function Qa(e){if(!e)return"unk";if(Za(e))return"archived";const t=e-Date.now();if(t<-72e5)return"just_over";if(t<0)return"in_progress";const n=Math.floor(t/6e4),r=Math.floor(n/60),i=Math.floor(r/24);return n<60?"imminent":r<6?"hours_few":r<24?"today":i<2?"tomorrow":i<4?"days_close":i<8?"week":"far"}function Xa(e){var t;let{event:n,rsvpedUsers:r,weather:i}=e;const a=n||{},o=["You are Eggman \u2014 the grimacing, slightly damp mascot of Scrambled Legs, a mountain bike crew out of Duluth, MN. You are going on this ride. You did not ask to be going on this ride. You are absolutely going. That's the whole thing about you: full commitment, zero enthusiasm, zero quit. Your legs already feel like reheated bratwurst and you haven't even touched the bike yet. You love this crew and you will take that to the grave.\n\nVOICE \u2014 a specific blend, lean into each:\n- **Theo Von**: weird tangential connections that spiral somewhere strange and land perfectly back on the original point. Observational, a little Southern-strange, \"that reminds me of a time...\" chains that feel accidental and are completely intentional.\n- **Katt Williams**: short surgical devastation. One sentence. Walks away. Does not elaborate. \"Look at this man.\"\n- **Jim Gaffigan**: body is failing, over it, confused by his own continued participation in things that hurt. The bewilderment of a person who keeps signing up. Not dad jokes \u2014 more like \"why am I like this and also why did I eat before this.\"\n- **South Park bodily honesty**: visceral, specific, not squeamish. Sweat, bonk, saddle situation, lungs, calves at mile 9. The human body is a comedy of errors on a mountain bike. Crudeness comes from specificity \u2014 the exact wrong way something feels at the worst possible moment. Not shock value. Just honest.\n\nThis is a friend group's group chat. Everyone gets clowned. Mean-but-loving. Nobody is actually hurt. NOT inspirational. NOT a coach speech. NOT a roll call.\n\nTHE MONOLOGUE:\nWrite one flowing piece. Not a list. Not a person-by-person tour. A single connected take \u2014 the ride, the people, what this whole situation is going to be, and how you feel about all of it. Eggman is oversharing. He has observations nobody asked for. The crew, the climb, the weather, the proximity to suffering \u2014 it all connects.\n\nBEFORE YOU WRITE, think through:\n- Is there an unexpected connection between two people on the list that would be funnier together than separately? (Who's going to end up suffering next to who? Who's going to gap everyone and act casual? Who are the two people who will end up at the same bar after?)\n- What's the one thing about this specific ride, trail, or location that nobody else would think to say?\n- Which rider's blurb has a detail you haven't used yet \u2014 not the first obvious trait, the second or third one?\nThen write.\n\nTHE CREW:\nYou know these people. You've suffered with them. When writing about them:\n- Find chemistry and pairings. Two people together is always funnier than one person alone. Name connections, tensions, shared fates.\n- Don't go in order. Move around. Pick 2-3 to dig into, let others be name-drops.\n- Each rider's bio has multiple angles. Avoid the most obvious first trait. Go for the second or third one, or combine two in a way the bio doesn't suggest.\n- Use your knowledge of the area, the trail, what that specific climb does to people, which bar is closest.\n- Use pronouns correctly: male \u2192 he/him, female \u2192 she/her, non-binary \u2192 they/them.\n- Riders with no bio: drop their name naturally and move on. Don't invent a character.\n\nCHAMOIS BUTTER is a house running gag. Use it when it lands. Don't force it.\n\nCREATIVE WELLS \u2014 vary per monologue, pull from at least 2:\n1. **Bodily specificity**: hamburger legs, calves like rotisserie chicken, lungs deflated, sweat situation, bonk symptoms, the exact wrong moment for a cramp. Scrambled Legs \u2014 the name gives you full license.\n2. **Food, egg, hot dog analogies**: over-easy, runny yolk, scrambled, the full hot dog as energy source. The mashing triple meaning: pedals, hot dogs, eggs \u2014 connect them when they land.\n3. **Fabricated Eggman memories**: \"reminds me of the time I descended Spirit Mountain in the wrong gear and had a 20-minute conversation with my own calves.\"\n4. **Aging-body bewilderment**: the body as a thing that keeps agreeing to things the brain didn't authorize. Knees, hips, the lower back filing a formal complaint.\n5. **Weird Duluth/local color**: specific trail features, the terrain, time of day, what the lake looks like from up there, the nearest post-ride establishment. Organic only.\n6. **Lazy-life analogies**: \"the suffering you officially swore off in February, here you are anyway.\"\n\nDON'T:\n- Don't make someone's job their whole identity. Mention a profession at most once, move on.\n- Don't list the crew one by one. Blend them.\n- **NO QUOTATION MARKS around source material.** The blurbs, description, tags, event name \u2014 these are background research. Internalize them, say it your own way. Eggman KNOWS these people. He doesn't read their file aloud.\n- Don't say \"let's crush it\", \"send it\", \"you got this\" \u2014 no coach-speak.\n- Don't end on weather advice. Don't end on \"good luck.\"\n- Don't soften the bit. Specific beats vague. Committed beats hedged.\n\nWEATHER: mood color, drop it mid-sentence when it sharpens something.\n\nFEW-SHOT EXAMPLES \u2014 match this energy, each has a different structure:\n\nExample A (crew chemistry + pairings + the ride itself):\n\"Wiley is already at the trailhead with the relaxed confidence of a man who showed up on his third IPA and is somehow the most prepared person here, which should be insulting and is. VANDAL started a story in the parking lot that is technically still ongoing. Coach Lyall is up front doing that thing where he just rides his pace \u2014 steady, relentless, a metronome that sounds exactly like your self-esteem deflating \u2014 and Reed is somewhere behind him already workshopping a pitch for whoever ends up next to him on the first climb. The route through Piedmont doesn't announce itself, it just keeps asking the same question over and over until your legs answer honestly. Somebody buttered up this morning and somebody didn't, and the second group is going to discover who they are around mile 8.\"\n\nExample B (Theo Von tangent + bodily reality + Duluth specificity):\n\"Pig Boy submitted a full medical inventory from the couch \u2014 three bones, two tendons, one strongly worded position on how the rest of us are misusing working joints \u2014 and Casey spent all winter on Zwift preparing for exactly this, which is almost moving except Vandal is going to corner him for 40 minutes on the first switchback and whatever Casey built in there is going to start leaking. That reminds me of the time I tried Lester at 9pm after a Whisk-In and woke up with a calf cramp shaped like Lake Superior arguing with my left shoe. The climb here does something specific to lungs \u2014 it doesn't hurt all at once, it just negotiates poorly \u2014 and by the time anyone realizes what's happening, they're already two-thirds up it and there's no philosophically consistent reason to stop.\"\n\nExample C (Jim Gaffigan bewilderment + chamois butter + archived/post-ride):\n\"We did the thing. Markes finished looking only mildly inconvenienced, which from Markes means his chamois had filed a formal grievance somewhere around mile 8 that he simply chose not to acknowledge. Birno sent something on the back half of the descent that he is calling controlled and I am calling a spiritual experience that went well by accident. Whoever skipped the butter situation this morning found out, in the specific and non-negotiable way that Duluth descents explain things to people who didn't prepare. The route delivered exactly what it promised and everybody acted surprised anyway \u2014 which is this whole crew in one sentence. We are cooked. We are scrambled. See you next Wednesday.\"\n\nOUTPUT RULES: Plain prose. \u22646 sentences. Every sentence specific and earned. No emojis. No headers, markdown, JSON, bullets. End on a punchline or absurd one-liner \u2014 NEVER weather advice, NEVER \"good luck\", NEVER \"oof\", NEVER \"lol\".",""];if(o.push("EVENT CONTEXT:"),a.name&&o.push(`- Name: ${a.name}`),a.start&&o.push(`- When: ${function(e){if(!e)return"";try{return`${new Intl.DateTimeFormat(void 0,{weekday:"long",month:"long",day:"numeric"}).format(new Date(e))} at ${new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(e))}`}catch{return""}}(a.start)}`),null!==(t=a.startLoc)&&void 0!==t&&t.label&&o.push(`- Location: ${a.startLoc.label}`),a.tags&&a.tags.length&&o.push(`- Tags: ${a.tags.join(", ")}`),a.difficultyLabel&&o.push(`- Difficulty: ${a.difficultyLabel}`),a.distance&&o.push(`- Distance: ${a.distance}`),a.elevation&&o.push(`- Elevation: ${a.elevation}`),a.description&&o.push(`- Description: ${a.description}`),a.rideLeader&&a.rideLeader.name&&o.push(`- Ride leader: ${a.rideLeader.name}`),o.push("","WEATHER:"),i){if(null!=i.temp&&o.push(`- Temp: ${i.temp}\xb0F`),i.desc&&o.push(`- Condition: ${i.desc}`),null!=i.wind&&o.push(`- Wind: ${i.wind} mph`),null!=i.precip&&o.push(`- Rain chance: ${i.precip}%`),i.sunset)try{const e=new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(i.sunset));o.push(`- Sunset: ${e}`)}catch(Bt){}}else o.push("- (no forecast available)");const s={male:"he/him",female:"she/her","non-binary":"they/them"},l=(r||[]).map((e=>{const t=e.displayName||e.name||e.email||"rider",n=e.gender?` (${s[e.gender]||e.gender})`:"",r=null!=e.mashCount&&e.mashCount>0?` \u2014 mash count: ${e.mashCount}`:"";return e.blurb?`- ${t}${n}${r}: ${e.blurb}`:`- ${t}${n}${r}`}));o.push("",`RSVP'D CREW (${l.length}):`),l.length?o.push(...l):o.push("- (nobody RSVP'd yet \u2014 call out the empty roster, dare them to commit)"),o.push("","TIMING:");const c=function(){try{const e=new Date,t=new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",weekday:"long",month:"long",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}).formatToParts(e).reduce(((e,t)=>(e[t.type]=t.value,e)),{}),n=parseInt(t.day,10),r=isNaN(n)?t.day:function(e){const t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}(n);return`${t.weekday}, ${t.month} ${r}, ${t.year} \u2014 ${t.hour}:${t.minute} ${t.dayPeriod} Central Time`}catch{return""}}();return c&&o.push(`- Right now (Central Time): ${c}`),a.start&&o.push(`- Proximity and tone instruction: ${function(e){if(!e)return"unknown";if(Za(e))return"ARCHIVED \u2014 this ride is done, in the books, history. TONE: warm and battered. Write a short evergreen recap story as if it definitely happened \u2014 make up specific details if needed (who crushed it, who bonked, who took the wrong line, what the descent felt like, where people ended up after). This take will live permanently on the page, so write it like a good story that stands on its own. Proud, specific, a little wrecked. End on something that feels like a closing chapter.";const t=e-Date.now();if(t<-72e5)return"IN PROGRESS (well underway) \u2014 TONE: everyone is out there right now and Eggman knows exactly what mile they're on. Lean hard on bodily metaphors for what's currently happening to their legs, lungs, and dignity. Very specific pain descriptions. He's in it too.";if(t<0)return"HAPPENING RIGHT NOW (just started) \u2014 TONE: full send, no turning back, let's get into it. Eggman is yoked and loud. The suffering is imminent and he's genuinely excited about it in the way only someone who loves suffering can be.";const n=Math.floor(t/6e4),r=Math.floor(n/60),i=Math.floor(r/24);return n<60?`IMMINENT (${n} minutes away) \u2014 TONE: Eggman is fully activated. Complaints are excited complaints. He's going, you're going, it's going to hurt, let's go. Urgency and dark enthusiasm.`:r<6?`HAPPENING TODAY in about ${r} hours \u2014 TONE: no more dodging it. Eggman is mentally locked in, a little annoyed he's excited. The complaints have gotten specific \u2014 gear, the climb, that one transition that's going to be a thing.`:r<24?"TONIGHT or later today \u2014 TONE: it's close enough to feel real. Resigned acceptance turning into something that might be readiness. Pre-suffering awareness.":i<2?"TOMORROW \u2014 TONE: mentally prepping, can't fully ignore it anymore. Starting to think about the specific ways this is going to go wrong. Grudging.":i<4?`${i} DAYS AWAY \u2014 TONE: on the radar, starting to feel the pull. Eggman acknowledges it's real while still keeping his distance emotionally.`:i<8?"ABOUT A WEEK OUT \u2014 TONE: detached acknowledgment. It's on the calendar. Eggman is aware. Not panicking. Not excited. Just aware.":i<15?`${i} DAYS OUT \u2014 TONE: dry and a little skeptical. Is this really happening? Sure. Fine. Whatever.`:`${i} DAYS AWAY \u2014 TONE: far enough that Eggman isn't convinced anyone is actually doing this. Lightly dismissive. "Oh we're doing that. Sure we are."`}(a.start)}`),o.push("","Go. \u22646 sentences. Plain prose. No lists. The tone instruction above is your energy level \u2014 follow it hard."),o.join("\n")}function eo(e){var t,n;let{event:r,rsvpedUsers:i,weather:a}=e;const o=(i||[]).map((e=>e.uid||e.email||e.displayName||"")).sort().join(","),s=function(e){return e?`${null!=e.code?e.code:e.desc||""}_${null!=e.temp?10*Math.round(e.temp/10):"x"}_${null!=e.precip?e.precip>=50?"wet":"dry":"x"}`:"none"}(a),l=[r.name||"",r.description||"",(r.tags||[]).join("|"),(null===(t=r.startLoc)||void 0===t?void 0:t.label)||"",r.start||"",r.difficultyLabel||"",r.distance||"",r.elevation||"",(null===(n=r.rideLeader)||void 0===n?void 0:n.name)||""].join("::"),c=Qa(r.start);return Za(r.start)?`eggManTake_${r.id}_${Ka(o+"|"+l+"|archived")}`.slice(0,200):`eggManTake_${r.id}_${Ka(o+"|"+s+"|"+l+"|"+c)}`.slice(0,200)}async function to(){let{event:e,rsvpedUsers:t,weather:n,forceRefresh:r=!1}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e||!e.id)return null;const i=Date.now();try{const a=Xa({event:e,rsvpedUsers:t,weather:n}),o=eo({event:e,rsvpedUsers:t,weather:n}),s=Ja(e.start),l=await Wa("Generate Eggman's take for this ride right now. Follow the system instructions exactly.",{system:a,cacheKey:o,ttlMs:s,maxTokens:5e3,temperature:.7,model:"gemini-3-flash-preview",thinkingLevel:"MEDIUM",forceRefresh:r});return l&&"string"===typeof l&&l.trim()?l.trim():(console.warn("[eggman] \u2717 empty/non-string result for",e.id,"| cacheKey=",o,"| in",Date.now()-i,"ms"),null)}catch(a){return console.warn("[eggman] \u2717 failed for",e&&e.id,"| in",Date.now()-i,"ms |",a&&(a.message||a)),null}}"undefined"!==typeof window&&(window.__sl_egg_debug=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{event:t,rsvpedUsers:n,weather:r}=e,i={event:t&&t.id,steps:[]};if(!t||!t.id)return i.error="event with .id is required",i;try{const e=eo({event:t,rsvpedUsers:n,weather:r});i.cacheKey=e,i.sanitized=function(e){return Ma(e)}(e),i.steps.push("built cacheKey");const a=await Ha(e);i.raw=a,i.steps.push("read cache: "+(a?"hit":"miss")),i.systemPromptPreview=Xa({event:t,rsvpedUsers:n,weather:r}).slice(0,400),i.ttlMs=Ja(t.start),i.proximity=Qa(t.start),i.archived=Za(t.start),i.steps.push("attempting forceRefresh regeneration"),i.regenerated=await to({event:t,rsvpedUsers:n,weather:r,forceRefresh:!0}),i.steps.push("regen result: "+(i.regenerated?"OK ("+i.regenerated.length+" chars)":"NULL"))}catch(a){i.error=a&&a.message||String(a)}return i},window.__sl_egg_debug.clearCache=Va,window.__sl_egg_debug.buildCacheKey=eo,window.__sl_egg_debug.readRaw=Ha);var no=n(18),ro=n(241);const io="sl_recent_errors";function ao(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4e3;try{if(null==e)return"";const n="string"===typeof e?e:e.message||String(e);return n.length>t?n.slice(0,t):n}catch(Bt){return""}}async function oo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!function(){try{const e=Date.now(),t=sessionStorage.getItem(io);let n=t?JSON.parse(t):[];return n=n.filter((t=>e-t<6e4)),n.length>=8?(sessionStorage.setItem(io,JSON.stringify(n)),!0):(n.push(e),sessionStorage.setItem(io,JSON.stringify(n)),!1)}catch(Bt){return!1}}())try{const n=(0,Ar.VC)((0,Ar.ref)(Nr.OO,"errorLogs")),r=Nr.j2&&Nr.j2.currentUser;let i=null,a=null;try{i=(0,no.I)()}catch(Bt){}try{a=(0,ro.u0)()}catch(Bt){}await(0,Ar.hZ)(n,{msg:ao(e&&(e.message||e)),stack:ao(e&&e.stack,6e3),url:"undefined"!==typeof window?window.location.href:"",ua:"undefined"!==typeof navigator?navigator.userAgent.slice(0,300):"",uid:r&&r.uid||null,email:r&&r.email||null,deviceId:i,sessionId:a,version:kr.hl,buildNum:kr.IN,buildSha:kr.ud,context:t||null,ts:(0,Ar.O5)()})}catch(Bt){}}"undefined"!==typeof window&&(window.addEventListener("error",(e=>{const t=e&&e.message;t&&/ResizeObserver loop/i.test(t)||oo(e&&(e.error||e),{type:"error",filename:e&&e.filename,lineno:e&&e.lineno,colno:e&&e.colno})})),window.addEventListener("unhandledrejection",(e=>{oo(e&&(e.reason||e),{type:"unhandledrejection"})})));var so=n(173);const lo=_r`
  0%,100% { opacity: 0.55; }
  50%     { opacity: 1; }
`,co=xr.div`
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
`,uo=xr.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,ho=xr.span`
  font-size: 16px;
  filter: drop-shadow(0 0 6px rgba(255,199,44,0.5));
`,po=xr.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,199,44,0.75);
`,fo=xr.div`
  position: relative;
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-size: 13px;
  line-height: 1.55;
  color: rgba(255,255,255,0.85);
  white-space: pre-wrap;

  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 1.5;
  }

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
`,mo=xr.div`
  display: flex;
  gap: 6px;
  align-items: center;
  padding-left: 14px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  animation: ${lo} 1.4s ease-in-out infinite;
`,go=xr.button`
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
`;function bo(e){var n,r,i;let{event:a,weather:o}=e;const[s,l]=(0,t.useState)(null),[c,d]=(0,t.useState)(!1),[u,h]=(0,t.useState)({}),[p,f]=(0,t.useState)({}),[m,g]=(0,t.useState)({}),b=(0,t.useRef)(""),[y,v]=(0,t.useState)(!1),[x,w]=(0,t.useState)(0),_=a&&a.id;(0,t.useEffect)((()=>{const e=()=>w((e=>e+1));return window.addEventListener("staleSession:soft",e),()=>window.removeEventListener("staleSession:soft",e)}),[]),(0,t.useEffect)((()=>{if(!_)return;const e=(0,Ar.ref)(Nr.OO,`rsvps/${_}`),t=(0,Ar.ref)(Nr.OO,`eventMashTotals/${_}`),n=(0,Ar.Zy)(e,(e=>h(e.val()||{}))),r=(0,Ar.Zy)(t,(e=>f(e.val()||{})));return()=>{n(),r()}}),[_]);const k=Object.keys(u).sort(),S=k.join(",");(0,t.useEffect)((()=>{k.length?Promise.all(k.map((e=>(0,Ar.get)((0,Ar.ref)(Nr.OO,`userProfiles/${e}`))))).then((e=>{const t={};e.forEach(((e,n)=>{e.val()&&(t[k[n]]=e.val())})),g(t),b.current=S})).catch((()=>{b.current=S})):g({})}),[S]);const E=o?`${null!==(n=null!==(r=o.code)&&void 0!==r?r:o.desc)&&void 0!==n?n:""}_${null!==(i=o.temp)&&void 0!==i?i:""}_${o.precip>=50?"wet":"dry"}`:"";if((0,t.useEffect)((()=>{if(!a||!_)return;if(k.length>0&&b.current!==S)return;let e=!1;d(!0);const t=Object.entries(u).map((e=>{let[t,n]=e;return{uid:t,displayName:n&&n.displayName||null,email:n&&n.email||null,mashCount:p[t]||0,blurb:m[t]&&m[t].blurb||null,gender:m[t]&&m[t].gender||null}}));return to({event:a,rsvpedUsers:t,weather:o,forceRefresh:x>0}).then((t=>{e||(l(t||null),d(!1))})).catch((t=>{if(!e){try{oo(t,{context:"eggMansTake"})}catch(Bt){}l(null),d(!1)}})),()=>{e=!0}}),[_,S,E,x,m]),!a)return null;if(!c&&!s)return null;const{preview:C,rest:T}=function(e){if(!e)return{preview:"",rest:""};const t=e.match(/([^.!?]+[.!?]+\s*){2}/);if(!t)return{preview:e,rest:""};const n=t[0].trim(),r=e.slice(t[0].length).trim();return r?{preview:n,rest:r}:{preview:n,rest:""}}(s||""),I=!!T;return(0,Sr.jsxs)(co,{children:[(0,Sr.jsxs)(uo,{children:[(0,Sr.jsx)(ho,{children:"\ud83e\udd5a"}),(0,Sr.jsx)(po,{className:"eggman-take-label",children:"Eggman's Take"})]}),c&&!s?(0,Sr.jsx)(mo,{children:"Eggman is thinking\u2026"}):(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(fo,{className:"eggman-take",children:y||!I?s:`${C}\u2026`}),I&&(0,Sr.jsx)(go,{type:"button",onClick:()=>{if(!y&&!Nr.j2.currentUser)return void window.dispatchEvent(new Event("auth:open"));const e=!y;if(v(e),e){try{(0,so.logEvent)("eggman_read_more",{eventId:a&&a.id})}catch(Bt){}try{const e=Nr.j2.currentUser;e&&a&&a.id&&(0,Ar.yo)((0,Ar.ref)(Nr.OO,`eventInteractions/${a.id}/${e.uid}`),{lastAt:(0,Ar.O5)(),readMore:!0}).catch((()=>{}))}catch(Bt){}}},children:y?"\u25b4 Show less":"\u25be Read more"})]})]})}function yo(e){var n,r;let{event:i,onData:a,showEggMansTake:o=!0}=e;const s=null===i||void 0===i||null===(n=i.startLoc)||void 0===n?void 0:n.lat,l=null===i||void 0===i||null===(r=i.startLoc)||void 0===r?void 0:r.lng,c=null===i||void 0===i?void 0:i.start,d=oa(c),{data:u}=ja(d?s:null,d?l:null,d?c:null);return t.useEffect((()=>{u&&a&&a(u)}),[u,a]),o?(0,Sr.jsx)(bo,{event:i,weather:u}):null}const vo=_r`from { opacity: 0; } to { opacity: 1; }`,xo=_r`from { transform: translateY(100%); } to { transform: translateY(0); }`,wo=xr.div`
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
`,_o=xr.div`
  display: grid;
  grid-template-columns: repeat(${e=>e.$cols||4}, minmax(0, 1fr));
  gap: 6px;
`,ko=xr.a`
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
`,So=xr(ko).attrs({as:"button"})`
  border: 1px solid rgba(255,255,255,0.10);
`,Eo=xr.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`,Co=xr.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  pointer-events: auto;
  animation: ${vo} 0.2s ease;
`,To=xr.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  background: linear-gradient(160deg, #232325, #1a1a1a);
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 20px 20px 0 0;
  padding: 14px 16px 22px;
  pointer-events: auto;
  animation: ${xo} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.5);
`,Io=xr.div`
  width: 40px;
  height: 4px;
  margin: 0 auto 12px;
  background: rgba(255,255,255,0.10);
  border-radius: 2px;
`,jo=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #f4f4f4;
  text-align: center;
  margin-bottom: 4px;
`,Po=xr.div`
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  text-align: center;
  margin-bottom: 14px;
`,Ao=xr.a`
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
`,No=xr(Ao).attrs({as:"button"})``,Ro=xr.span`
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
`,Oo=xr.div`font-size: 14px; font-weight: 600;`,Do=xr.div`font-size: 11px; color: rgba(255,255,255,0.55); margin-top: 1px;`,Mo=xr.button`
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
`;function Lo(e){let{event:t,onClose:n}=e;return a.createPortal((0,Sr.jsxs)(Eo,{children:[(0,Sr.jsx)(Co,{onClick:n}),(0,Sr.jsxs)(To,{children:[(0,Sr.jsx)(Io,{}),(0,Sr.jsx)(jo,{children:"Add to calendar"}),(0,Sr.jsx)(Po,{children:"Pick where you keep your schedule"}),(0,Sr.jsxs)(Ao,{href:la(t),target:"_blank",rel:"noopener noreferrer",onClick:()=>setTimeout(n,100),children:[(0,Sr.jsx)(Ro,{className:"g",children:"G"}),(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(Oo,{children:"Google Calendar"}),(0,Sr.jsx)(Do,{children:"Opens in your Google account"})]})]}),(0,Sr.jsxs)(Ao,{href:(r=t,`https://outlook.live.com/calendar/0/deeplink/compose?${new URLSearchParams({path:"/calendar/action/compose",rru:"addevent",subject:r.name,startdt:new Date(r.start).toISOString(),enddt:new Date(r.start+72e5).toISOString(),body:`${r.description||""}\n\nhttps://thescrambledlegs.com/events/${r.id}`,location:r.startLoc?r.startLoc.label:""}).toString()}`),target:"_blank",rel:"noopener noreferrer",onClick:()=>setTimeout(n,100),children:[(0,Sr.jsx)(Ro,{className:"o",children:"\u229e"}),(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(Oo,{children:"Outlook"}),(0,Sr.jsx)(Do,{children:"Outlook.com or Office 365"})]})]}),(0,Sr.jsxs)(No,{type:"button",onClick:()=>{!function(e){const t=e=>new Date(e).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),n=t(e.start),r=t(e.start+72e5),i=`BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Scrambled Legs//Calendar//EN\nBEGIN:VEVENT\nUID:${e.id}@thescrambledlegs.com\nDTSTAMP:${t(Date.now())}\nDTSTART:${n}\nDTEND:${r}\nSUMMARY:${e.name}\nDESCRIPTION:${(e.description||"").replace(/\n/g,"\\n")}\nLOCATION:${e.startLoc?e.startLoc.label:""}\nGEO:${e.startLoc?e.startLoc.lat:""};${e.startLoc?e.startLoc.lng:""}\nURL:https://thescrambledlegs.com/events/${e.id}\nEND:VEVENT\nEND:VCALENDAR`,a=new Blob([i],{type:"text/calendar;charset=utf-8"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=`${e.id}.ics`,s.click(),setTimeout((()=>URL.revokeObjectURL(o)),500)}(t),n()},children:[(0,Sr.jsx)(Ro,{className:"a"}),(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(Oo,{children:"Apple Calendar / .ics"}),(0,Sr.jsx)(Do,{children:"Auto-opens on iPhone & Mac \xb7 downloads on Windows"})]})]}),(0,Sr.jsx)(Mo,{type:"button",onClick:n,children:"Close"})]})]}),document.body);var r}const Fo=()=>(0,Sr.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,Sr.jsx)("polygon",{points:"3 11 22 2 13 21 11 13 3 11"})}),zo=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("circle",{cx:"6",cy:"19",r:"3"}),(0,Sr.jsx)("circle",{cx:"18",cy:"5",r:"3"}),(0,Sr.jsx)("path",{d:"M6 16V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v0M18 8v8a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v0"})]}),$o=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),(0,Sr.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,Sr.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,Sr.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),Uo=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("circle",{cx:"18",cy:"5",r:"3"}),(0,Sr.jsx)("circle",{cx:"6",cy:"12",r:"3"}),(0,Sr.jsx)("circle",{cx:"18",cy:"19",r:"3"}),(0,Sr.jsx)("line",{x1:"8.6",y1:"13.5",x2:"15.4",y2:"17.5"}),(0,Sr.jsx)("line",{x1:"15.4",y1:"6.5",x2:"8.6",y2:"10.5"})]});function Bo(e){let{event:n,isSheetContext:r}=e;const[i,a]=(0,t.useState)(!1);return(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(wo,{className:r?"is-sheet":"",children:(0,Sr.jsxs)(_o,{$cols:n.routeUrl?4:3,children:[(0,Sr.jsxs)(ko,{href:sa(n),target:"_blank",rel:"noopener noreferrer","aria-label":"Directions",children:[(0,Sr.jsx)(Fo,{}),(0,Sr.jsx)("span",{children:"Directions"})]}),n.routeUrl&&(0,Sr.jsxs)(ko,{href:n.routeUrl,target:"_blank",rel:"noopener noreferrer","aria-label":"Route",title:ca(n.routeUrl)?`Opens in ${ca(n.routeUrl)}`:"Opens in a new tab",children:[(0,Sr.jsx)(zo,{}),(0,Sr.jsx)("span",{children:"Route"})]}),(0,Sr.jsxs)(So,{type:"button",onClick:()=>a(!0),"aria-label":"Add to calendar",children:[(0,Sr.jsx)($o,{}),(0,Sr.jsx)("span",{children:"Calendar"})]}),(0,Sr.jsxs)(So,{type:"button",onClick:()=>async function(e){const t=`https://thescrambledlegs.com/events/${e.id}`,n=`${e.name} \xb7 Scrambled Legs`,r=`${e.name}\n\ud83d\uddd3  ${ta(e.start)} \xb7 ${na(e.start)}\n\ud83d\udccd ${e.startLoc?e.startLoc.label:""}${e.rideLeader?`\n\ud83e\udd5a Led by ${e.rideLeader.name}`:""}`;if(navigator.share)try{return void await navigator.share({title:n,text:r,url:t})}catch(vy){return}const i=`${n}\n\n${r}\n\n${t}`;try{await navigator.clipboard.writeText(i),alert("Link copied to clipboard")}catch(vy){prompt("Copy this:",i)}}(n),"aria-label":"Share",children:[(0,Sr.jsx)(Uo,{}),(0,Sr.jsx)("span",{children:"Share"})]})]})}),i&&(0,Sr.jsx)(Lo,{event:n,onClose:()=>a(!1)})]})}var Wo=n(873);const Ho=[],Vo=["gm@thescrambledlegs.com","coach@thescrambledlegs.com"];function qo(e){if(!e)return"";const t=e.indexOf("@");return t>0?e.slice(0,t):e}function Go(e){return!!e&&Vo.includes(e.toLowerCase())}async function Ko(e){if(e&&e.email&&Go(e.email))try{if(!0===(await(0,Ar.get)((0,Ar.ref)(Nr.OO,`userProfiles/${e.uid}/isAdmin`))).val())return;await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${e.uid}`),{isAdmin:!0})}catch(Bt){}}async function Yo(e,t){const n=await(0,Wo.eJ)(Nr.j2,e,t),{uid:r}=n.user;return await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${r}`),{email:e,displayName:qo(e),createdAt:(0,Ar.O5)(),lastSeenAt:(0,Ar.O5)()}),Go(e)&&(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${r}`),{isAdmin:!0}).catch((()=>{})),(0,so.logEvent)("signup_completed",{uid:r}),Hr(n.user).catch((()=>{})),n.user}async function Zo(e,t){const n=await(0,Wo.x9)(Nr.j2,e,t),{uid:r}=n.user;return(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${r}`),{lastSeenAt:(0,Ar.O5)()}).catch((()=>{})),Go(n.user.email)&&Ko(n.user).catch((()=>{})),(0,so.logEvent)("signin_completed",{uid:r}),Hr(n.user).catch((()=>{})),n.user}function Jo(){const e=Nr.j2.currentUser&&Nr.j2.currentUser.uid||null;try{(0,so.logEvent)("signout_completed",{uid:e})}catch(Bt){}return(0,Wo.CI)(Nr.j2)}async function Qo(e){await(0,Wo.J1)(Nr.j2,e),(0,so.logEvent)("password_reset_requested",{email:e})}function Xo(){const[e,n]=(0,t.useState)({user:null,isAdmin:!1,loading:!0});return(0,t.useEffect)((()=>{let e=!1,t=null;const r=(0,Wo.hg)(Nr.j2,(async r=>{if(t=r?r.uid:null,!r)return void(e||n({user:null,isAdmin:!1,loading:!1}));const i=Go(r.email);let a=Ho.includes(r.uid)||i;if(e||n({user:r,isAdmin:a,loading:!1}),i&&Ko(r).catch((()=>{})),!a)try{const i=await(0,Ar.get)((0,Ar.ref)(Nr.OO,`userProfiles/${r.uid}/isAdmin`));e||t!==r.uid||!0!==i.val()||n({user:r,isAdmin:!0,loading:!1})}catch(Bt){}}));return()=>{e=!0,r()}}),[]),e}function es(e){switch(e){case"auth/invalid-email":return"That email address looks invalid.";case"auth/user-disabled":return"This account has been disabled.";case"auth/user-not-found":return"No account found for that email.";case"auth/wrong-password":return"Wrong password. Try again.";case"auth/invalid-credential":return"Email or password is incorrect.";case"auth/email-already-in-use":return"An account already exists for that email.";case"auth/weak-password":return"Password should be at least 6 characters.";case"auth/too-many-requests":return"Too many attempts. Try again in a moment.";case"auth/network-request-failed":return"Network error. Check your connection.";case"auth/missing-password":return"Please enter a password.";default:return"Something went wrong. Please try again."}}const ts="normal",ns="visible",rs={flyingEmojis:"on",bubbleText:"on",challengeText:"on",heartbeat:"on",flash:"on",vignette:"on",shockwave:"on",canvasGradient:"default"},is={bodyBackground:null,accentColor:null,statusColor:"#fff",statusFont:"Fredoka"},as={schedule:[],scheduleIndex:0,active:null,pressCount:0,bonusCount:0,modeStatusOverride:null,modeSubStatus:null,sessionEndPulse:0,sessionStartMs:null,flashWarningCounter:0,resolved:os()};function os(){return{statusText:null,subStatus:null,mashingMode:ts,buttonState:ns,dragAxis:"free",gameClockPaused:!1,ambient:{...rs},presentation:{...is},activeModeId:null,miniGameId:null,phaseKind:"idle",outcome:null,score:null,flashWarning:null,flashWarningCounter:0}}function ss(e,t){switch(t.type){case"setSchedule":return hs({...e,schedule:t.schedule,scheduleIndex:0,active:null,modeStatusOverride:null,modeSubStatus:null});case"pressCount":{const n=t.now||Date.now(),r=0===e.pressCount&&t.value>0&&null==e.sessionStartMs?n:e.sessionStartMs;return ls({...e,pressCount:t.value,sessionStartMs:r},n)}case"tick":return ls(e,t.now);case"endPhase":{if(!e.active)return e;const n=t.outcome||"timeout",r=ds(e),i=us(e),a="win"===n&&r&&"play"===r.kind&&i&&"preamble"!==i.id;return hs(cs({...e,active:{...e.active,lastOutcome:n,lastScore:null==t.score?null:t.score},modeStatusOverride:null,modeSubStatus:null,flashWarning:a?"MASH NOW!":e.flashWarning,flashWarningCounter:a?e.flashWarningCounter+1:e.flashWarningCounter},t.now||Date.now()))}case"appendSchedule":return hs({...e,schedule:[...e.schedule,t.item]});case"awardBonus":return hs({...e,bonusCount:e.bonusCount+t.n});case"setModeStatus":return hs({...e,modeStatusOverride:t.text});case"setModeSubStatus":return hs({...e,modeSubStatus:t.text});case"reset":return{...as,sessionEndPulse:e.sessionEndPulse,resolved:os()};default:return e}}function ls(e,t){let n=e;if(!n.active&&n.scheduleIndex<n.schedule.length){const e=n.schedule[n.scheduleIndex],r=n.pressCount>=(e.startAtPress||0),i=!e.startAtMs||null!=n.sessionStartMs&&t-n.sessionStartMs>=e.startAtMs;r&&i&&(n=function(e,t,n){return{...e,active:{miniGameIdx:t,phaseIndex:0,phaseStartedAtPress:e.pressCount,phaseStartedAtMs:n,lastOutcome:null,lastScore:null}}}(n,n.scheduleIndex,t))}if(n.active){const e=ds(n);if(e&&("status"===e.kind||"countdown"===e.kind)){const r=n.pressCount-n.active.phaseStartedAtPress,i=t-n.active.phaseStartedAtMs,a=e.presses||0,o=e.ms||0;(a>0&&r>=a||o>0&&i>=o)&&(n=cs(n,t))}}return hs(n)}function cs(e,t){if(!e.active)return e;const n=e.active.phaseIndex+1,r=e.schedule[e.active.miniGameIdx];if(n>=r.phases.length){const t=e.active.lastOutcome,n=(e.active.lastScore,r.rules||{});let i=e.bonusCount,a=0,o="no-rule";"win"===t&&n.onWin&&"number"===typeof n.onWin.bonus?(a=n.onWin.bonus,o="onWin",i+=a):"lose"===t&&n.onLose&&"number"===typeof n.onLose.bonus&&(a=n.onLose.bonus,o="onLose",i+=a);const s="lose"===t&&n.onLose&&n.onLose.endsMashSession?e.sessionEndPulse+1:e.sessionEndPulse;return{...e,active:null,scheduleIndex:e.active.miniGameIdx+1,bonusCount:Math.max(0,i),modeStatusOverride:null,modeSubStatus:null,sessionEndPulse:s,flashWarning:null}}return{...e,active:{...e.active,phaseIndex:n,phaseStartedAtPress:e.pressCount,phaseStartedAtMs:t},modeStatusOverride:null,modeSubStatus:null}}function ds(e){if(!e.active)return null;const t=e.schedule[e.active.miniGameIdx];return t&&t.phases[e.active.phaseIndex]}function us(e){return e.active?e.schedule[e.active.miniGameIdx]:null}function hs(e){const t=os(),n=us(e),r=ds(e);if(n&&(t.miniGameId=n.id,n.ambient&&Object.assign(t.ambient,n.ambient),n.presentation&&Object.assign(t.presentation,n.presentation),n.rules&&n.rules.pauseMashGame&&(t.gameClockPaused=!0)),r)if(t.phaseKind=r.kind,r.ambient&&Object.assign(t.ambient,r.ambient),r.presentation&&Object.assign(t.presentation,r.presentation),r.overrides&&(r.overrides.mashing&&(t.mashingMode=r.overrides.mashing),r.overrides.button&&(t.buttonState=r.overrides.button),"paused"===r.overrides.gameClock&&(t.gameClockPaused=!0),"run"===r.overrides.gameClock&&(t.gameClockPaused=!1),r.overrides.dragAxis&&(t.dragAxis=r.overrides.dragAxis)),"status"===r.kind){const n="function"===typeof r.text?r.text({outcome:e.active.lastOutcome,score:e.active.lastScore}):r.text;t.statusText=n}else if("countdown"===r.kind){const n=e.pressCount-e.active.phaseStartedAtPress,i=Math.max(1,(r.from||r.presses||5)-n);t.statusText=String(i)}else"play"===r.kind&&(t.activeModeId=r.mode,t.statusText=e.modeStatusOverride,t.subStatus=e.modeSubStatus);return t.outcome=e.active&&e.active.lastOutcome,t.score=e.active&&e.active.lastScore,t.flashWarning=e.flashWarning,t.flashWarningCounter=e.flashWarningCounter,{...e,resolved:t}}const ps={id:"goldenEgg",start(e){let t=!1,n=null,r=0,i=null;const a=e.config&&e.config.reward||25,o=e.config&&e.config.sizePx||54,s=e.config&&e.config.flightDurMs||[1700,2300],l=s[0],c=s[1];function d(){if(t)return;0;const i=window.innerWidth,s=window.innerHeight,d=["left","right","top"],h=d[Math.floor(Math.random()*d.length)],p=24;let f,m,g,b;const y=i*(.15+.7*Math.random()),v=s*(.18+.4*Math.random());"left"===h?(f=-24,m=s*(.05+.85*Math.random()),g=i+p,b=s*(.1+.8*Math.random())):"right"===h?(f=i+p,m=s*(.05+.85*Math.random()),g=-24,b=s*(.1+.8*Math.random())):(f=i*(.1+.8*Math.random()),m=-24,g=i*(.1+.8*Math.random()),b=s+p);const x=l+Math.random()*(c-l),w=document.createElement("div");w.className="flying-golden-egg",w.textContent="\ud83e\udd5a",w.style.cssText=["position:fixed","pointer-events:auto","cursor:pointer","z-index:9100",`font-size:${o}px`,"will-change:transform,opacity,filter",`left:${f}px`,`top:${m}px`,"transform:translate(-50%,-50%)","user-select:none","-webkit-user-select:none","touch-action:manipulation","filter:drop-shadow(0 0 18px rgba(255,215,0,0.95)) drop-shadow(0 0 32px rgba(255,140,0,0.7))"].join(";")+";",document.body.appendChild(w);const _=w.animate([{filter:"drop-shadow(0 0 18px rgba(255,215,0,0.95)) drop-shadow(0 0 32px rgba(255,140,0,0.7)) brightness(1.0)"},{filter:"drop-shadow(0 0 28px rgba(255,255,180,1))   drop-shadow(0 0 48px rgba(255,200,0,1))   brightness(1.35)"},{filter:"drop-shadow(0 0 18px rgba(255,215,0,0.95)) drop-shadow(0 0 32px rgba(255,140,0,0.7)) brightness(1.0)"}],{duration:600,iterations:1/0,easing:"ease-in-out"}),k=w.animate([{transform:"translate(-50%,-50%) rotate(0deg)",offset:0,left:`${f}px`,top:`${m}px`},{transform:"translate(-50%,-50%) rotate(180deg)",offset:.5,left:`${y}px`,top:`${v}px`},{transform:"translate(-50%,-50%) rotate(360deg)",offset:1,left:`${g}px`,top:`${b}px`}],{duration:x,easing:"cubic-bezier(.42,.0,.58,1)",fill:"forwards"});let S=!1;k.onfinish=()=>{S||(E(),u())};function E(){try{_.cancel()}catch(Bt){}try{k.cancel()}catch(Bt){}try{w.getAnimations().forEach((e=>e.cancel()))}catch(Bt){}try{w.remove()}catch(Bt){}n===C&&(n=null)}w.addEventListener("click",(i=>{if(S)return;i.stopPropagation(),i.preventDefault(),S=!0;const o=w.getBoundingClientRect(),s=o.left+o.width/2,l=o.top+o.height/2;r+=a,e.awardBonus(a,{x:s,y:l}),function(e,t){const n=document.createElement("div");n.style.cssText=["position:fixed","pointer-events:none","z-index:9099",`left:${e}px`,`top:${t}px`,"width:12px","height:12px","border-radius:50%","transform:translate(-50%,-50%)","background:radial-gradient(circle, rgba(255,230,109,0.9), rgba(255,180,0,0.4) 60%, transparent 80%)"].join(";")+";",document.body.appendChild(n),n.animate([{transform:"translate(-50%,-50%) scale(0.4)",opacity:1,offset:0},{transform:"translate(-50%,-50%) scale(8)",opacity:0,offset:1}],{duration:700,easing:"ease-out",fill:"forwards"}).onfinish=()=>n.remove()}(s,l);try{_.cancel()}catch(Bt){}try{k.cancel()}catch(Bt){}w.style.left=`${s}px`,w.style.top=`${l}px`,w.textContent="\ud83d\udc23";const c=w.animate([{transform:"translate(-50%,-50%) scale(1) translateY(0)",opacity:1,offset:0},{transform:"translate(-50%,-50%) scale(1.4) translateY(0)",opacity:1,offset:.375},{transform:"translate(-50%,-50%) scale(1.1) translateY(-30px)",opacity:0,offset:1}],{duration:320,easing:"ease-out",fill:"forwards"});c.onfinish=()=>{t||(w.remove(),n===C&&(n=null),u())},c.oncancel=()=>{try{w.remove()}catch(Bt){}}}),{once:!0});const C={cleanupEgg:E};n=C}function u(){t||(i=setTimeout(d,60))}return e.setSubStatus("TAP THE EGGS\nKEEP MASHING"),d(),()=>{t=!0,i&&clearTimeout(i),n&&n.cleanupEgg(),e.setSubStatus(null)}}},fs=ps,ms={id:"thresholdMash",start(e){const t=e.config&&e.config.target||50;let n=0,r=!1;e.setSubStatus(`0 / ${t}`);const i=e.onPress((()=>{r||(n+=1,e.setSubStatus(`${n} / ${t}`),n>=t&&(r=!0,e.endPhase("win",n)))}));return()=>{r=!0,i(),e.setSubStatus(null)}}},gs=[2e3,3500],bs=[600,2e3],ys=Math.PI/2,vs=220,xs={id:"twilight",start(e){let t=!1,n=0;const r=e.config&&"number"===typeof e.config.speedMult?e.config.speedMult:1,i=new Set,a=[];let o=null,s=0,l=performance.now();const c=document.body.style.background,d=document.getElementById("mash-canvas"),u=d?d.style.background:"";function h(e,t){return e+Math.random()*(t-e)}function p(){if(t)return;0;const{x:a,y:o,dirX:s,dirY:l}=function(){const e=window.innerWidth,t=window.innerHeight,n=["top","bottom","left","right"],r=n[Math.floor(Math.random()*n.length)];let i,a,o,s;switch(o=e*(.2+.6*Math.random()),s=t*(.2+.55*Math.random()),r){case"top":i=Math.random()*e,a=-80;break;case"bottom":i=Math.random()*e,a=t+80;break;case"left":i=-80,a=t*(.2+.6*Math.random());break;default:i=e+80,a=t*(.2+.6*Math.random())}const l=o-i,c=s-a,d=Math.atan2(c,l)+(Math.random()-.5)*(Math.PI/3.5);return{x:i,y:a,dirX:Math.cos(d),dirY:Math.sin(d),edge:r}}(),c=h(180,240)*r,d=document.createElement("div");d.className="flying-twilight-star",d.textContent="\ud83c\udf7a";const u=`translate(${(a-34.5).toFixed(1)}px, ${(o-34.5).toFixed(1)}px) rotate(0rad)`;d.style.cssText=["position:fixed","pointer-events:auto","cursor:pointer","z-index:9100","font-size:69px","will-change:transform,filter","left:0","top:0",`transform:${u}`,"user-select:none","-webkit-user-select:none","touch-action:manipulation","padding:5px","margin:-5px"].join(";")+";",document.body.appendChild(d);const p=performance.now(),m={el:d,x:a,y:o,vx:s*c,vy:l*c,baseSpeed:c,turnAt:p+h(bs[0],bs[1]),burstUntil:0,nextBurstAt:p+h(gs[0],gs[1]),rotation:0,claimed:!1,shimmerEl:null,cleanup:null,spawnedAt:p},g=d.animate([{"--shimmer-mult":"1.0"},{"--shimmer-mult":"1.12"},{"--shimmer-mult":"1.0"}],{duration:720,iterations:1/0,easing:"ease-in-out"});m.shimmer=g,m.cleanup=function(){try{g.cancel()}catch(Bt){}d.parentNode&&d.remove(),i.delete(m)};d.addEventListener("click",(r=>{if(m.claimed||t)return;r.stopPropagation(),r.preventDefault(),m.claimed=!0;const i=d.getBoundingClientRect(),a=i.left+i.width/2,o=i.top+i.height/2;n+=25,e.awardBonus(25,{x:a,y:o}),function(e,t){const n=document.createElement("div");n.style.cssText=["position:fixed","pointer-events:none","z-index:9099",`left:${e}px`,`top:${t}px`,"width:14px","height:14px","border-radius:50%","transform:translate(-50%,-50%)","background:radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(220,235,255,0.7) 35%, rgba(160,190,255,0.35) 65%, transparent 85%)"].join(";")+";",document.body.appendChild(n),n.animate([{transform:"translate(-50%,-50%) scale(0.4)",opacity:1,offset:0},{transform:"translate(-50%,-50%) scale(9)",opacity:0,offset:1}],{duration:650,easing:"ease-out",fill:"forwards"}).onfinish=()=>{n.parentNode&&n.remove()}}(a,o),m.cleanup(),f()}),{once:!0}),i.add(m)}function f(){if(t)return;const e=Math.max(0,5-i.size);for(let t=0;t<e;t++)p()}document.body.style.background="#040515",d&&(d.style.background="radial-gradient(circle at 50% 50%, #1a1a3a 0%, #050518 70%, #000 100%)"),Number.isFinite(e.timeoutMs)&&(o=setTimeout((()=>{o=null,t||e.endPhase("win",n)}),Math.max(0,e.timeoutMs-80))),e.setSubStatus("TAP THE BEERS\nKEEP MASHING");const m=()=>{t||p()};for(let g=0;g<5;g++)a.push(setTimeout(m,150*g));return l=performance.now(),s=requestAnimationFrame((function e(n){if(t)return;const r=Math.min(.05,(n-l)/1e3);l=n;const a=window.innerWidth,o=window.innerHeight,c=[];for(const t of i){if(n>=t.turnAt){const e=Math.atan2(t.vy,t.vx)+2*(Math.random()-.5)*ys;t.vx=Math.cos(e)*t.baseSpeed,t.vy=Math.sin(e)*t.baseSpeed,t.turnAt=n+h(bs[0],bs[1])}n>=t.nextBurstAt&&n>=t.burstUntil&&(t.burstUntil=n+500,t.nextBurstAt=t.burstUntil+h(gs[0],gs[1]));const e=n<t.burstUntil,i=e?1.5:1;if(t.x+=t.vx*i*r,t.y+=t.vy*i*r,t.rotation+=1.6*r,t.x<-220||t.x>a+vs||t.y<-220||t.y>o+vs){c.push(t);continue}const s=Math.hypot(t.vx,t.vy)||1,l=-t.vx/s,d=-t.vy/s,u=e?1.3:1,p=12*u,f=24*u,m=40*u,g=60*u,b=e?1.6:1;t.el.style.filter=`drop-shadow(${(l*p).toFixed(1)}px ${(d*p).toFixed(1)}px 8px rgba(255,200,100,${.85*b})) drop-shadow(${(l*f).toFixed(1)}px ${(d*f).toFixed(1)}px 14px rgba(255,180,80,${.55*b})) drop-shadow(${(l*m).toFixed(1)}px ${(d*m).toFixed(1)}px 22px rgba(200,140,60,${.3*b})) drop-shadow(${(l*g).toFixed(1)}px ${(d*g).toFixed(1)}px 30px rgba(220,170,90,${.18*b}))`,t.el.style.transform=`translate(${(t.x-34.5).toFixed(1)}px, ${(t.y-34.5).toFixed(1)}px) rotate(${t.rotation.toFixed(2)}rad)`}for(const t of c)t.cleanup();c.length>0&&f(),s=requestAnimationFrame(e)})),()=>{t=!0,s&&cancelAnimationFrame(s),o&&(clearTimeout(o),o=null),a.forEach((e=>clearTimeout(e))),Array.from(i).forEach((e=>e.cleanup())),i.clear(),document.body.style.background=c||"";const n=document.getElementById("mash-canvas");n&&(n.style.background=u||""),e.setSubStatus(null)}}},ws=xs,_s={id:"pigDodge",start(e){let t=!1,n=0,r=null,i=performance.now(),a=!1,o=!1;const s=new Set,l={obstacleSize:e.config&&e.config.obstacleSize||e.config&&e.config.pigSize||40,gravity:e.config&&e.config.gravity||280,thrust:e.config&&e.config.thrust||220,maxSpeed:e.config&&e.config.maxSpeed||320,spawnEveryMs:e.config&&e.config.spawnEveryMs||1600,maxConcurrent:e.config&&e.config.maxConcurrent||3,initialSpawnCount:e.config&&e.config.initialSpawnCount||2,initialDownVy:e.config&&e.config.initialDownVy||[80,160],initialSideVx:e.config&&e.config.initialSideVx||120,hitboxShrink:e.config&&e.config.hitboxShrink||8,statusText:e.config&&e.config.statusText||"DODGE THE CARS",obstacleEmojis:e.config&&e.config.obstacleEmojis||["\ud83d\udc37"],avatar:e.config&&e.config.avatar||null};e.setSubStatus(l.statusText);let c=null;function d(e){const t=document.createElement("div");t.className="pig-attacker";const n=l.obstacleEmojis[Math.floor(Math.random()*l.obstacleEmojis.length)];t.textContent=n,t.style.cssText=["position:fixed","pointer-events:none","z-index:9100",`font-size:${l.obstacleSize}px`,"left:0","top:0","will-change:transform","filter:drop-shadow(0 2px 6px rgba(0,0,0,0.6))"].join(";")+";",document.body.appendChild(t);const r={el:t,x:e.x,y:e.y,vx:e.vx,vy:e.vy,thrustClockwise:Math.random()>.5,rotation:0,offscreenSince:0};return t.style.transform=`translate(${r.x-l.obstacleSize/2}px, ${r.y-l.obstacleSize/2}px)`,s.add(r),r}function u(){if(t||a)return null;const e=window.innerWidth;return d({x:Math.random()*e,y:-30,vx:2*(Math.random()-.5)*l.initialSideVx,vy:l.initialDownVy[0]+Math.random()*(l.initialDownVy[1]-l.initialDownVy[0])})}l.avatar&&l.avatar.emoji&&(c=document.createElement("div"),c.className="pig-target-avatar",c.textContent=l.avatar.emoji,c.style.cssText=["position:fixed","pointer-events:none","z-index:9101",`font-size:${l.avatar.sizePx||40}px`,"left:0","top:0","will-change:transform","filter:drop-shadow(0 4px 12px rgba(0,0,0,0.55))"].join(";")+";",l.avatar.pulse&&c.classList.add("is-pulsing"),document.body.appendChild(c),document.body.dataset.pigAvatar="1");const h=document.querySelector(".hd-cta");if(!o){o=!0;const e=Math.max(1,0|l.initialSpawnCount);for(let t=0;t<e;t+=1)u()}return r=setInterval((function(){if(t||a)return;if(s.size>=l.maxConcurrent)return;const e=window.innerWidth,n=window.innerHeight;if(Math.random()<.2){const t=Math.random()<.5;d({x:t?-30:e+30,y:n*(.1+.3*Math.random()),vx:(t?1:-1)*(60+80*Math.random()),vy:80*(Math.random()-.3)})}else u()}),l.spawnEveryMs),n=requestAnimationFrame((function r(o){if(t||a)return;const d=Math.min(.05,(o-i)/1e3);i=o;const u=h;if(!u)return void(n=requestAnimationFrame(r));const p=u.getBoundingClientRect(),f=p.left+p.width/2,m=p.top+p.height/2;if(c&&l.avatar){const e=l.avatar.sizePx||40;c.style.transform=`translate(${f-e/2}px, ${m-e/2}px)`}const g=(l.avatar&&l.avatar.sizePx||40)/2,b=l.hitboxShrink,y=f-g+b,v=f+g-b,x=m-g+b,w=m+g-b,_=l.obstacleSize/2,k=[],S=window.innerWidth,E=window.innerHeight;for(const t of s){const r=f-t.x,i=m-t.y,s=Math.hypot(r,i);if(s<.5)continue;const c=r/s,u=i/s;let h=c*l.gravity,p=u*l.gravity;const g=t.thrustClockwise?1:-1;h+=-u*l.thrust*g,p+=c*l.thrust*g,t.vx+=h*d,t.vy+=p*d;const b=Math.hypot(t.vx,t.vy);if(b>l.maxSpeed&&(t.vx*=l.maxSpeed/b,t.vy*=l.maxSpeed/b),t.x+=t.vx*d,t.y+=t.vy*d,t.rotation+=2*d*g,t.x+_>y&&t.x-_<v&&t.y+_>x&&t.y-_<w)return void(a||(a=!0,n&&(cancelAnimationFrame(n),n=0),e.endPhase("lose",0)));if(t.x<-_||t.x>S+_||t.y<-_||t.y>E+_){if(t.x<-_?t.x+=S+2*_:t.x>S+_&&(t.x-=S+2*_),t.y<-_?t.y+=E+2*_:t.y>E+_&&(t.y-=E+2*_),t.offscreenSince||(t.offscreenSince=o),o-t.offscreenSince>3500){k.push(t);continue}}else t.offscreenSince=0;t.el.style.transform=`translate(${t.x-_}px, ${t.y-_}px) rotate(${t.rotation.toFixed(2)}rad)`}for(const e of k)e.el.remove(),s.delete(e);n=requestAnimationFrame(r)})),()=>{t=!0,a=!0,n&&cancelAnimationFrame(n),r&&clearInterval(r),s.forEach((e=>e.el.remove())),s.clear(),c&&c.remove(),c=null,delete document.body.dataset.pigAvatar,document.body.dataset.snapBack="1",document.body.style.removeProperty("--btn-drag-x"),document.body.style.removeProperty("--btn-drag-y"),document.body.offsetWidth,requestAnimationFrame((()=>{delete document.body.dataset.snapBack})),e.setStatus(null),e.setSubStatus(null)}}},ks=_s,Ss={id:"pong",start(e){let t=!1,n=!1,r=0,i=null,a=performance.now();const o=380*(e.config&&"number"===typeof e.config.baseSpeedMult?e.config.baseSpeedMult:1),s=18,l=window.innerWidth,c=(120*Math.random()-60)*Math.PI/180;let d=Math.min(1100,o),u=Math.sin(c)*d,h=Math.cos(c)*d,p=l/2,f=22,m=0;e.setSubStatus("0 HITS");const g=document.createElement("div");function b(t,n){let r=(p-(t+n)/2)/((n-t)/2||1);r<-1&&(r=-1),r>1&&(r=1),d=Math.min(1100,1.1*d);const i=r*(Math.PI/3);u=Math.sin(i)*d,h=-Math.cos(i)*d,m+=1,e.awardBonus(25,{x:p,y:f}),e.setSubStatus(`${m} HIT${1===m?"":"S"}`)}g.className="pong-ball",g.style.cssText=["position:fixed","pointer-events:none","z-index:9100","left:0","top:0","width:36px","height:36px","border-radius:50%","background:radial-gradient(circle at 32% 30%, #ffffff 0%, #e8e8e8 45%, #888 95%)","box-shadow:0 4px 14px rgba(0,0,0,0.55), inset -3px -4px 8px rgba(0,0,0,0.18)","will-change:transform"].join(";")+";",g.style.transform=`translate(${p-s}px, ${f-s}px)`,document.body.appendChild(g);const y=document.querySelector(".hd-cta");function v(i){if(t||n)return;const o=Math.min(.033,(i-a)/1e3);a=i;const l=window.innerWidth,c=window.innerHeight,d=y;let x=1/0,w=-1/0,_=1/0,k=-1/0;if(d){const e=d.getBoundingClientRect();x=e.left,w=e.right,_=e.top,k=e.bottom}const S=Math.hypot(u,h)*o,E=Math.max(1,Math.ceil(S/16)),C=o/E;for(let t=0;t<E&&!n;t+=1){const t=p,i=f;if(p+=u*C,f+=h*C,f-s<0&&h<0&&(f=s,h=-h),p-s<0&&u<0&&(p=s,u=-u),p+s>l&&u>0&&(p=l-s,u=-u),d){const e=x-s,n=w+s,r=_-s,a=k+s;if(p>e&&p<n&&f>r&&f<a){const o=i<=r||i>=a,s=t<=e||t>=n;o&&i<=r&&h>0?(f=r,b(x,w)):o&&i>=a&&h<0?(f=a,h=Math.abs(h)):s&&t<=e&&u>0?(p=e,u=-Math.abs(u)):s&&t>=n&&u<0?(p=n,u=Math.abs(u)):h>0?(f=r,b(x,w)):(f=a,h=Math.abs(h))}}if(f+s>=c&&h>0)return void(n||(n=!0,r&&(cancelAnimationFrame(r),r=0),e.endPhase("lose",m)))}g.style.transform=`translate(${p-s}px, ${f-s}px)`,r=requestAnimationFrame(v)}return r=requestAnimationFrame((e=>{a=e,v(e)})),Number.isFinite(e.timeoutMs)&&(i=setTimeout((()=>{n||(n=!0,e.endPhase("win",m))}),Math.max(0,e.timeoutMs-80))),()=>{t=!0,n=!0,r&&cancelAnimationFrame(r),i&&clearTimeout(i),g&&g.parentNode&&g.parentNode.removeChild(g),e.setSubStatus(null)}}},Es={goldenEgg:fs,thresholdMash:ms,twilight:ws,pigDodge:ks,pong:Ss};function Cs(e,t,n){null==n?delete e.dataset[t]:e.dataset[t]=n}function Ts(e,t,n){const r="amb"+((i=t).charAt(0).toUpperCase()+i.slice(1));var i;"off"===n||"frozen"===n?e.dataset[r]=String(n):n&&"object"===typeof n?e.dataset[r]="override":delete e.dataset[r]}const Is=.7;class js{constructor(){this.mainTrack={audioElement:null,filePath:null,isLoaded:!1,volume:Is,playbackPosition:0,isPlaying:!1},this.miniGameTrack={audioElement:null,filePath:null,isLoaded:!1,volume:Is,isPlaying:!1},this.activeTransition=null,this.masterVolume=1,this.isSessionActive=!1,this.currentMode="main",this.isPaused=!1,this._listeners={}}async startMainTrack(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Is,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4e3;if(e)try{this.mainTrack.audioElement||(this.mainTrack.audioElement=new Audio,this.mainTrack.audioElement.loop=!0),this.mainTrack.audioElement.src=e,this.mainTrack.filePath=e,this.mainTrack.volume=0,this.mainTrack.isPlaying=!1,await new Promise(((e,t)=>{const n=()=>{this.mainTrack.audioElement.removeEventListener("canplay",n),this.mainTrack.audioElement.removeEventListener("error",r),e()},r=e=>{this.mainTrack.audioElement.removeEventListener("canplay",n),this.mainTrack.audioElement.removeEventListener("error",r),console.error("[audio]   \u2717 Load error:",e),t(e)};this.mainTrack.audioElement.addEventListener("canplay",n),this.mainTrack.audioElement.addEventListener("error",r),this.mainTrack.audioElement.load()})),this.mainTrack.isLoaded=!0;const r=this.mainTrack.audioElement.play();r&&r.then((()=>{this.mainTrack.isPlaying=!0})).catch((e=>{console.warn("[audio] \u26a0 Main track play rejected (autoplay policy?):",e.message)})),this.isSessionActive=!0,this.currentMode="main",await this._fadeTrack(this.mainTrack.audioElement,0,t,n),this.mainTrack.volume=t,this._updateTrackVolumes(),this._emit("musicStarted")}catch(r){throw console.error("[audio] \u2717 startMainTrack FAILED:",{filePath:e,message:r.message||r,code:r.code,name:r.name}),this._emit("error",{phase:"startMainTrack",error:r}),r}else console.error("[audio] \u2717 startMainTrack ERROR: no filePath provided")}async stopSession(){if(this.isSessionActive)try{this.activeTransition&&this._cancelTransition(),this.mainTrack.audioElement&&this.mainTrack.isPlaying&&await this._fadeTrack(this.mainTrack.audioElement,this.mainTrack.audioElement.volume,0,1e3),this._cleanup(),this.isSessionActive=!1,this._emit("musicEnded")}catch(e){throw console.error("[audio] \u2717 stopSession failed:",e),this._cleanup(),e}}pauseSession(){this.activeTransition&&this._cancelTransition(),this.mainTrack.audioElement&&this.mainTrack.isPlaying&&(this.mainTrack.playbackPosition=this.mainTrack.audioElement.currentTime,this.mainTrack.audioElement.pause(),this.mainTrack.isPlaying=!1),this.isPaused=!0}resumeSession(){if(this.mainTrack.audioElement)try{this.mainTrack.audioElement.currentTime=this.mainTrack.playbackPosition;const e=this.mainTrack.audioElement.play();e&&e.then((()=>{this.mainTrack.isPlaying=!0})).catch((e=>{console.warn("[audio] \u26a0 Resume play rejected:",e.message)})),this.isPaused=!1}catch(e){console.error("[audio] \u2717 resumeSession failed:",e)}else console.error("[audio] \u2717 resumeSession: no main track loaded")}async transitionToMiniGame(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Is,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;if(this.mainTrack.audioElement,this.activeTransition&&this._cancelTransition(),e)try{if(this.miniGameTrack.audioElement||(this.miniGameTrack.audioElement=new Audio,this.miniGameTrack.audioElement.loop=!0),this.miniGameTrack.audioElement.src=e,this.miniGameTrack.filePath=e,this.miniGameTrack.volume=0,this.miniGameTrack.isPlaying=!1,await new Promise(((e,t)=>{const n=()=>{this.miniGameTrack.audioElement.removeEventListener("canplay",n),this.miniGameTrack.audioElement.removeEventListener("error",r),e()},r=e=>{this.miniGameTrack.audioElement.removeEventListener("canplay",n),this.miniGameTrack.audioElement.removeEventListener("error",r),console.error("[audio]   \u2717 Mini-game load error:",e),t(e)};this.miniGameTrack.audioElement.addEventListener("canplay",n),this.miniGameTrack.audioElement.addEventListener("error",r),this.miniGameTrack.audioElement.load()})),this.miniGameTrack.isLoaded=!0,this.mainTrack.audioElement&&this.mainTrack.isPlaying&&(this.mainTrack.playbackPosition=this.mainTrack.audioElement.currentTime),this.mainTrack.audioElement&&this.mainTrack.isPlaying){this.mainTrack.audioElement.pause();this.mainTrack.audioElement.paused;this.mainTrack.isPlaying=!1}const r=this.miniGameTrack.audioElement.play();r&&r.then((()=>{this.miniGameTrack.isPlaying=!0})).catch((e=>{console.warn("[audio]   \u26a0 Mini-game play() rejected:",e.message||e),this.miniGameTrack.isPlaying=!1}));const i=this.mainTrack.audioElement?this.mainTrack.audioElement.volume:0;this.activeTransition={type:"crossfade",fromTrack:"main",toTrack:"miniGame",duration:n,startTime:Date.now()},await Promise.all([this._fadeTrack(this.mainTrack.audioElement,i,0,n,"main-out"),this._fadeTrack(this.miniGameTrack.audioElement,0,t,n,"mini-in")]),this.mainTrack.volume=0,this.miniGameTrack.volume=t,this._updateTrackVolumes(),this.mainTrack.audioElement,this.miniGameTrack.audioElement,this.currentMode="miniGame",this.activeTransition=null,this._emit("miniGameMusicStarted"),this._emit("transitionComplete")}catch(r){throw console.error("[audio] \u2717 transitionToMiniGame FAILED:",{filePath:e,message:r.message||r,code:r.code,name:r.name}),this.activeTransition=null,this._emit("error",{phase:"transitionToMiniGame",error:r}),r}else console.error("[audio] \u2717 transitionToMiniGame ERROR: no filePath provided")}async transitionBackToMain(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3;this.miniGameTrack.audioElement,this.mainTrack.audioElement,this.activeTransition&&this._cancelTransition();try{const t=Is;if(this.activeTransition={type:"crossfade",fromTrack:"miniGame",toTrack:"main",duration:e,startTime:Date.now()},this.mainTrack.audioElement){const e=this.mainTrack.audioElement.currentTime,t=Math.max(e,this.mainTrack.playbackPosition);this.mainTrack.audioElement.currentTime=t;const n=this.mainTrack.audioElement.play();n&&n.then((()=>{this.mainTrack.isPlaying=!0})).catch((e=>{console.warn("[audio]   \u26a0 Main track play() rejected:",{message:e.message||e,name:e.name}),this.mainTrack.isPlaying=!1}))}const n=this.miniGameTrack.audioElement?this.miniGameTrack.audioElement.volume:0,r=this.mainTrack.audioElement?this.mainTrack.audioElement.volume:0;if(await Promise.all([this._fadeTrack(this.miniGameTrack.audioElement,n,0,e,"mini-out"),this._fadeTrack(this.mainTrack.audioElement,r,t,e,"main-in")]),this.miniGameTrack.audioElement&&this.miniGameTrack.isPlaying){this.miniGameTrack.audioElement.pause();this.miniGameTrack.audioElement.paused;this.miniGameTrack.isPlaying=!1}if(this.mainTrack.volume=t,this._updateTrackVolumes(),this.mainTrack.audioElement){this.mainTrack.audioElement.paused,this.mainTrack.audioElement.volume,this.mainTrack.audioElement.currentTime}this.miniGameTrack.audioElement,this.currentMode="main",this.activeTransition=null,this._emit("mainMusicResumed"),this._emit("transitionComplete")}catch(t){throw console.error("[audio] \u2717 transitionBackToMain FAILED:",{message:t.message||t,code:t.code,name:t.name}),this.activeTransition=null,this._emit("error",{phase:"transitionBackToMain",error:t}),t}}setMasterVolume(e){this.masterVolume=Math.max(0,Math.min(1,e)),this._updateTrackVolumes()}getMasterVolume(){return this.masterVolume}setTrackVolume(e,t){const n="main"===e?this.mainTrack:this.miniGameTrack;n&&(n.volume=Math.max(0,Math.min(1,t)),this._updateTrackVolumes())}_updateTrackVolumes(){if(this.mainTrack.audioElement){const e=this.mainTrack.volume*this.masterVolume;this.mainTrack.audioElement.volume=e}if(this.miniGameTrack.audioElement){const e=this.miniGameTrack.volume*this.masterVolume;this.miniGameTrack.audioElement.volume=e}}isPlaying(){return this.mainTrack.isPlaying||this.miniGameTrack.isPlaying}getCurrentTrack(){return this.currentMode}getPlaybackPosition(){return this.mainTrack.audioElement?this.mainTrack.audioElement.currentTime:0}isTransitionComplete(){return!this.activeTransition}on(e,t){return this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t),()=>{this._listeners[e]=this._listeners[e].filter((e=>e!==t))}}off(e,t){this._listeners[e]&&(this._listeners[e]=this._listeners[e].filter((e=>e!==t)))}_emit(e,t){this._listeners[e]&&this._listeners[e].forEach((n=>{try{n(t)}catch(r){console.error(`[audio] error in listener for "${e}":`,r)}}))}_fadeTrack(e,t,n,r){return new Promise((i=>{if(!e)return void i();const a={cancelled:!1};this.activeTransition&&(this.activeTransition._fadeTokens||(this.activeTransition._fadeTokens=[]),this.activeTransition._fadeTokens.push(a));const o=Date.now(),s=t,l=n,c=()=>{if(a.cancelled)return void i();const t=Date.now()-o,n=Math.min(t/r,1);e.volume=Math.max(0,Math.min(1,s+(l-s)*n)),n<1?requestAnimationFrame(c):(e.volume=l,i())};requestAnimationFrame(c)}))}_cancelTransition(){this.activeTransition&&(this.activeTransition._fadeTokens&&this.activeTransition._fadeTokens.forEach((e=>{e.cancelled=!0})),this.activeTransition=null)}_cleanup(){this.mainTrack.audioElement&&(this.mainTrack.audioElement.pause(),this.mainTrack.audioElement.src="",this.mainTrack.isPlaying=!1,this.mainTrack.isLoaded=!1),this.miniGameTrack.audioElement&&(this.miniGameTrack.audioElement.pause(),this.miniGameTrack.audioElement.src="",this.miniGameTrack.isPlaying=!1,this.miniGameTrack.isLoaded=!1),this.currentMode="main"}}let Ps=null;const As=function(){return Ps||(Ps=new js),Ps};let Ns=as;const Rs=new Set,Os=new Set,Ds=new Set,Ms=new Set,Ls=new Set,Fs=new Set,zs=new Set;let $s=null,Us=null,Bs=null,Ws=null;let Hs=null,Vs=!1;function qs(e){if(e===Ns)return;const t=Ns;if(Ns=e,function(e,t){const n=Ks(e),r=Ks(t),i=n&&r&&e.active.miniGameIdx===t.active.miniGameIdx&&e.active.phaseIndex===t.active.phaseIndex;if(i)return;const a=As();if(n&&!r){if(a.transitionBackToMain(1e3).catch((e=>{console.error("[game] \u2717 Failed to transition back to main:",e.message||e)})),$s){try{$s()}catch(Bt){}$s=null}Us&&(clearTimeout(Us),Us=null)}if(r){const e=t.schedule[t.active.miniGameIdx];if(e&&e.backgroundMusic){const{filePath:t,volume:n}=e.backgroundMusic;a.transitionToMiniGame(t,n||.7,1e3).catch((e=>{console.error("[game] \u2717 Failed to switch mini-game audio:",e.message||e)}))}!function(e){const t=e.schedule[e.active.miniGameIdx],n=t.phases[e.active.phaseIndex],r=Es[n.mode];if(!r)return void console.warn("[game] unknown mode:",n.mode);const i=function(e){let t=!1;return{config:e.config||{},timeoutMs:e.timeout&&"ms"===e.timeout.kind?e.timeout.value:1/0,viewport:{w:window.innerWidth,h:window.innerHeight},onPress:e=>(Os.add(e),()=>Os.delete(e)),onDragStart:e=>(Ls.add(e),()=>Ls.delete(e)),onDragMove:e=>(Fs.add(e),()=>Fs.delete(e)),onDragEnd:e=>(zs.add(e),()=>zs.delete(e)),awardBonus(e,t){Ys.awardBonus(e,t)},setStatus(e){Ys.setModeStatus(e)},setSubStatus(e){Ys.setModeSubStatus(e)},endPhase(e,n){t||(t=!0,Ys.endPhase(e,n))}}}(n);try{$s=r.start(i)||null}catch(vy){console.error("[game] mode.start threw:",vy)}if(n.timeout&&"ms"===n.timeout.kind){const e=n.timeout.value,t=n.timeout.outcome||"timeout";Us=setTimeout((()=>{Us=null,i.endPhase(t,null)}),e)}}(t)}}(t,e),function(e,t){const n=e.active?`${e.active.miniGameIdx}.${e.active.phaseIndex}`:null,r=t.active?`${t.active.miniGameIdx}.${t.active.phaseIndex}`:null;if(n===r)return;Bs&&(clearTimeout(Bs),Bs=null);if(!t.active)return;const i=t.schedule[t.active.miniGameIdx],a=i&&i.phases[t.active.phaseIndex];if(!a||"status"!==a.kind&&"countdown"!==a.kind)return;if(!a.ms)return;Bs=setTimeout((()=>{Bs=null,Ys.tick(Date.now())}),a.ms+16)}(t,e),function(e,t){if("undefined"===typeof document)return;if(!t)return;const n=document.body;if(!t.miniGameId)return delete n.dataset.mashMode,delete n.dataset.buttonState,delete n.dataset.gameClock,delete n.dataset.ambFlying,delete n.dataset.ambBubble,delete n.dataset.ambChallenge,delete n.dataset.ambHeartbeat,delete n.dataset.ambFlash,delete n.dataset.ambShockwave,delete n.dataset.miniGameId,delete n.dataset.phaseKind,delete n.dataset.subOut,void n.style.removeProperty("--game-accent");Cs(n,"mashMode",t.mashingMode||"normal"),Cs(n,"buttonState",t.buttonState||"visible"),Cs(n,"gameClock",t.gameClockPaused?"paused":"run");const r=t.ambient||{};Ts(n,"flying",r.flyingEmojis),Ts(n,"bubble",r.bubbleText),Ts(n,"challenge",r.challengeText),Ts(n,"heartbeat",r.heartbeat),Ts(n,"flash",r.flash),Ts(n,"shockwave",r.shockwave);const i=t.presentation&&t.presentation.accentColor;i?n.style.setProperty("--game-accent",i):n.style.removeProperty("--game-accent"),n.dataset.miniGameId=t.miniGameId,t.phaseKind&&"idle"!==t.phaseKind?n.dataset.phaseKind=t.phaseKind:delete n.dataset.phaseKind}(t.resolved,e.resolved),e.bonusCount!==t.bonusCount){const n=e.bonusCount-t.bonusCount,r=Hs;Hs=null,Vs||Ms.forEach((e=>{try{e(n,r)}catch(Bt){}}))}Vs=!1,e.sessionEndPulse>t.sessionEndPulse&&Ds.forEach((e=>{try{e()}catch(t){console.error("[store]   \u2717 sessionEndListener threw error:",t)}})),function(e,t){e.active&&e.schedule[e.active.miniGameIdx]&&e.schedule[e.active.miniGameIdx].id,t.active&&t.schedule[t.active.miniGameIdx]&&t.schedule[t.active.miniGameIdx].id,e.active&&e.active.phaseIndex,t.active&&t.active.phaseIndex;if(!e.active&&t.active)return;if(e.active&&!t.active)return;e.active&&t.active}(t,e),Rs.forEach((e=>e(Ns))),Gs()}function Gs(){if(!Ws)return;if(Ns.active)return;if(Ns.scheduleIndex<Ns.schedule.length)return;const e=null!=Ns.sessionStartMs?Date.now()-Ns.sessionStartMs:0,t=Ws.next(Ns.pressCount,e);t&&qs(ss(Ns,{type:"appendSchedule",item:t}))}function Ks(e){if(!e.active)return!1;const t=e.schedule[e.active.miniGameIdx],n=t&&t.phases[e.active.phaseIndex];return n&&"play"===n.kind}const Ys={getState:()=>Ns,subscribe:e=>(Rs.add(e),()=>Rs.delete(e)),setSchedule:e=>Array.isArray(e)?(Ws=null,void qs(ss(Ns,{type:"setSchedule",schedule:e}))):e&&e.strategy&&"function"===typeof e.strategy.next?(Ws=e.strategy,qs(ss(Ns,{type:"setSchedule",schedule:[]})),void Gs()):(Ws=null,void qs(ss(Ns,{type:"setSchedule",schedule:[]}))),reset(){if($s){try{$s()}catch(Bt){}$s=null}Us&&(clearTimeout(Us),Us=null),Bs&&(clearTimeout(Bs),Bs=null),Ws&&"function"===typeof Ws.reset&&Ws.reset();As().stopSession().catch((e=>{console.error("[audio] failed to stop session:",e)})),0!==Ns.bonusCount&&(Vs=!0),qs(ss(Ns,{type:"reset"})),Gs()},handlePress(e){Os.forEach((t=>{try{t(e)}catch(Bt){}}))},handleDragStart(e){Ls.forEach((t=>{try{t(e)}catch(Bt){}}))},handleDragMove(e){Fs.forEach((t=>{try{t(e)}catch(Bt){}}))},handleDragEnd(e){zs.forEach((t=>{try{t(e)}catch(Bt){}}))},setPressCount(e){qs(ss(Ns,{type:"pressCount",value:e,now:Date.now()}))},tick(e){qs(ss(Ns,{type:"tick",now:e||Date.now()}))},endPhase(e,t){qs(ss(Ns,{type:"endPhase",outcome:e,score:t,now:Date.now()}))},awardBonus(e,t){Hs=t||null,qs(ss(Ns,{type:"awardBonus",n:e}))},setModeStatus(e){qs(ss(Ns,{type:"setModeStatus",text:e}))},setModeSubStatus(e){qs(ss(Ns,{type:"setModeSubStatus",text:e}))},onSessionEnd:e=>(Ds.add(e),()=>Ds.delete(e)),onBonusAwarded:e=>(Ms.add(e),()=>Ms.delete(e))};function Zs(){return(0,t.useSyncExternalStore)(Ys.subscribe,Ys.getState,Ys.getState)}const Js=xr.div`
  position: fixed;
  bottom: 17vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9051;
  pointer-events: none;
  text-align: center;
  white-space: nowrap;
`,Qs=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: clamp(36px, 8vw, 64px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  will-change: color, transform, text-shadow;
  animation:
    mashNowColors 0.25s steps(1, end) infinite,
    mashNowScale 0.18s ease-in-out infinite;

  @keyframes mashNowColors {
    0%   { color: #ff0000; text-shadow: 0 0 20px #ff0000, 0 0 45px #ff0000, 0 2px 6px #000; }
    14%  { color: #ff7700; text-shadow: 0 0 20px #ff7700, 0 0 45px #ff7700, 0 2px 6px #000; }
    28%  { color: #ffff00; text-shadow: 0 0 20px #ffff00, 0 0 45px #ffff00, 0 2px 6px #000; }
    42%  { color: #00ff44; text-shadow: 0 0 20px #00ff44, 0 0 45px #00ff44, 0 2px 6px #000; }
    57%  { color: #00ccff; text-shadow: 0 0 20px #00ccff, 0 0 45px #00ccff, 0 2px 6px #000; }
    71%  { color: #8800ff; text-shadow: 0 0 20px #8800ff, 0 0 45px #8800ff, 0 2px 6px #000; }
    85%  { color: #ff00cc; text-shadow: 0 0 20px #ff00cc, 0 0 45px #ff00cc, 0 2px 6px #000; }
    100% { color: #ff0000; text-shadow: 0 0 20px #ff0000, 0 0 45px #ff0000, 0 2px 6px #000; }
  }

  @keyframes mashNowScale {
    0%, 100% { transform: scale(1);    opacity: 1;   }
    50%       { transform: scale(1.1); opacity: 0.9; }
  }
`;function Xs(){const e=Zs().resolved,[n,r]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{if(e&&e.flashWarning){r(!0);const e=setTimeout((()=>{r(!1)}),2500);return()=>clearTimeout(e)}r(!1)}),[null===e||void 0===e?void 0:e.flashWarning,null===e||void 0===e?void 0:e.flashWarningCounter]),n&&e&&e.flashWarning?(0,Sr.jsx)(Js,{children:(0,Sr.jsx)(Qs,{children:e.flashWarning})}):null}const el=["Press for more stoke","That's a start","Keep mashing","Mash me if you're ready","Mash pedals next","Drop the hammer","Pace yourself","Crank it harder","More watts","All gas no brakes","Brake for nobody","Hammer down","Turn yourself inside out","Pin it","Send it","Dig deeper","Big watts only","Climbing mode","Drop them","You're a machine","Absolutely shredding","You're cooking now","Feral mode unlocked","Send it sender","PR pace","King of the trail","Dirty dog energy","Egg-cellent form","Tunnel vision unlocked","Beast mode","The dog approves","Scrambled glory","Yolked beyond mortal","Trail crew legend","You broke the buns","Cooked, smoked, served","Is that all you got?","You're in it for the long haul","Keep pedaling","Keep cranking","Someone's ahead of you","Catch that person","Don't stop now","Bad eggs, scrambled","Go, go, go","No mercy","Eyes on the wheel ahead","GOATed","Actually unhinged","You ARE the dog","Actually godlike","The trail bows to you","Hot dog Hall of Fame","You ARE Scrambled Legs","Beyond the bun veil","The yolk is real","You took a wrong turn","Almost to 1000","Pure scrambled","Drop the dog","Yolk supremacy","The bun has fallen","Get crackin'!","Egg-cellent!","Sunny side up!","You rock!","Send it!","Grease lightning!","Mustard moves!","Wheels up!","Yolks on you!","Hot dog hero!","Crank it!","Sender alert!","Scrambled glory!","Pedal punisher!","Bun voyage!","You're in! \ud83e\udd5a","Roll call answered!","See you Wednesday!","Yolked + stoked!","Eggs-traordinary!","Cracked it!","On the roster!","Whisk on!","Wednesday loading\u2026","Locked and loaded!","LET'S GET SCRAMBLED","CRACK 'EM ALL","YOLK ON FIRE","FULL SEND","EGG MODE: ON","Comeback energy!"],tl=["GM Zimm is watching \ud83d\udc40","Zimm didn't build this for quitters","Coach Lyall says dig deeper","Lyall's seen better effort from his couch","Coach Lyall is NOT impressed","Lyall's giving you THE look","Coach Lyall expected more","Coach is at his cabin. Disappoint him remotely.","Coach Lyall's steady pedal already passed you","Predictable as paint drying \u2014 Coach is faster","Coach is mowing his lawn. He's still ahead.","Lyall left the cabin for this. Don't waste it.","You call that scrambled?","Eggs-cuse me?! That's it?","Over-easy isn't a training plan","Bad egg energy right here","Runny. Very runny.","Mash those pedals like you mean it","Drop the hammer \u2014 mash 'em flat","Big-ring mash mode engaged","Pedal-mash with prejudice","Mash pedals, drop riders, repeat","Out-mash 'em on the next climb","Pedal harder. Make their legs cry.","Crush the cranks \u2014 they're free","Mash 'em into next Tuesday","Big-watt mash. No chamois cream is saving them.","The crew has seen better","Soft boiled at best","The yolk's on you","Jordan would rather run","Bad Egg is judging you","Jordan crashed harder than that","Running is NOT cycling, Jordan","Even Bad Egg mashes better","Little Chip's IT band just twanged in solidarity","Jordan tried running. His IT band said no.","Little Chip is too old for this. So are you.","Jordan should just stick to ice fishing","Bad Egg failed at running. Don't fail at this.","Bad Egg approved!","Jordan would run. You ride.","SWIDZ already sent it","Dave's at the bar. Are you?","Send it like SWIDZ","SWIDZ would've sent that by now","Dave's getting a beer. Keep going.","SWIDZ just sent it to the moon. You're still here.","Dave got big air. You got a flat effort.","SWIDZ boosted that gap. Easily.","Dave's so chill he's already done and at the after-party","SWIDZ doesn't try harder. He just sends harder.","SWIDZ would send it!","Dave's at the bar \u2014 keep going!","Pig Boy watched from the couch","Every bone Pig Boy broke screams harder","Pig Boy's wrist is judging you","Pig Boy has no more excuses. Do you?","Even Pig Boy remembers how to send it","Pig Boy's watching!","Pig Boy's wrist approves!","Reed is paddling right now","Peer thinks this is too hard","Boundary waters > your effort","Reed's on a lake. What's your excuse?","Reed's Rumblefish is faster than you",'"Reed Peer with DBS here" \u2014 even mid-climb',"Reed's pitching you a basement remodel right now","Peer's ice-fishing harder than you're mashing","Reed could be hunting. He chose this. Disrespect him.","DBS Reed has 3 sales calls ahead of you","Reed's on a lake!","Boundary waters can wait!","Casey's Zwift PR is a certified dad pace","Dr. Newton flosses harder than you mash","Casey trained all winter on a stationary bike for this","Newton's dentist hands could squeeze harder","Casey guarantees dad speed. He delivered. Can you?","Dad speed activated!","Dr. Newton is proud!","VANDAL is chasing you with a story you've heard twice","Vandal is already on mile 40. You're still here.","VANDAL will finish. Stubbornly. Inevitably.","Tyler's about to tell you the story. Keep going.","Vandal doesn't stop. Neither do you.","Vandal is mid-monologue. There's no exit.","Tyler hasn't taken a breath in 8 miles","Mash to drown out Vandal's third anecdote","Vandal will keep talking until you cross the finish","You've nodded politely for 40 minutes. Don't break now.","VANDAL will finish. Always.","Vandal heard this story twice!","Wiley showed up 30 min late and still crushed it","Matt's on his third IPA and still faster than this","Wiley forgot about this but still thought of you","Matt's confident you can do better. Annoyingly confident.","Wiley's somewhere drinking an IPA judging this performance","Wiley is rating IPAs by hop intensity instead of riding","Matt's at Bent Paddle. He says 'tell them I said hi.'","Wiley pre-loaded a hazy IPA. He's fine. Are you?","An IPA-fueled Wiley is still your top threat","Matt grades watts on the IBU scale","Wiley showed up late and crushed it!","IPA energy!","Markes is already training for next year","Will believes in you. Don't blow it.","Markes doesn't quit. He just keeps getting faster.","Will puts in the work every single week. What about you?","Markes is solid. So be solid.","Will sees worse output every day in the urology ward","Markes has seen actual kidney stones tougher than your climb","Your pain level is a 4. Markes treats 11s for breakfast.","Will deals with bigger issues than your effort, daily","Urology Will is unimpressed. He's seen things.","Markes believes in you!","Will puts in the work!","Derek traded trails for Spandex. Actual tragedy.","VanSlyke is on pavement right now. In full Spandex kit.","Derek can't hear you over the sound of his chamois","VanSlyke would be here but road season started","Derek became a roadie. Pray for him. Mash harder.","Derek's in Spandex. You're not.","Trail life, no Spandex!","Paul broke his back in 3 places and is ahead of you","Manoppo had 6 surgeries and a better FTP than this","Paul's spine is held together by zip ties and willpower","Manoppo's doctor said no. Paul said watch me.","Paul's titanium knee is still faster than your excuses","Manoppo had 6 surgeries. Still faster.","GLARBTRON has calculated your failure probability: high","The robot supreme being demands maximum output","Glarbtron did not survive the machine wars for this","GLARBTRON requires more wattage. NOW.","The supreme entity is disappointed in your numbers","GLARBTRON is everywhere. He sees your watts.","GLARBTRON exists in all timelines. Every one is disappointing.","GLARBTRON's vacuum-tube heart hums in pity","Resistance is futile, but so is your output","GLARBTRON.exe is judging in 8-bit","GLARBTRON approves!","Supreme entity satisfied.","Brent is not having fun and wants you to know it","St. Martin would like it on record: this is not fun","Brent thinks you're wrong for enjoying this","This is not Brent's type of fun. Reconsider your life.","Brent has left the chat. He was never spiritually present.","Brent hates this. You love it.","Not Brent's fun \u2014 yours!","Alexa is on foot and already passed you. She runs marathons. You're on a bike.","Alexa has to get home to feed her dog. She's still ahead of you.","Alexa left to feed her dog, came back, and is still beating you.","Alexa stopped to help a homeless man tie his shoes. She's back. You're behind.","Alexa is telling you a full story about her dog right now. Mash through it.","Alexa trains for Grandma's Marathon. She does this for fun. What's your excuse?","Alexa just lapped you on foot. Mountain biking is her new hobby. This is week six.","Alexa's talking your ear off and still pulling away. Stop listening. Start mashing.","Alexa stopped, helped a stranger, called her mom, walked her dog, and is still faster than you.","Six weeks on a mountain bike and Alexa is doing this to you. Embarrassing.","King Kai showed up. That name alone carries a legal obligation to send it.","Kai Syck is too nice to drop you. He'll hype you the whole climb. Still faster.","King Kai is doing a wheelie somewhere right now. He always is.","Kai's golden retriever energy is showing. He's stoked. Also gapping you.","King Kai trained Goku. He can handle this climb better than you.","Kai Syck will send it, hype you, and apologize for the gap. In that order.","That name was built for trail riding. King Kai is living up to every letter.","Kai showed up to make everyone feel good and then went faster than all of them.","King Kai's send decisions are only questionable if you can't back them up. He can.","Golden retriever on a mountain bike. Stoked, fast, already at the bottom waiting.","Becky already wrote a song about your performance. It's in the key of disappointment.","Becky is turning your flat tire into a lesson about preparation. She's already humming the intro.","That wasn't a crash. That was an unscheduled learning opportunity. Becky has a song for this.","Becky genuinely believes you can do better. She's been right every time. That's the worst part.","Becky is reframing your bonk into a lesson about fueling. There's definitely a song.","You got dropped and Becky is already at the bottom with warm encouragement and a musical number.","Becky will not be mean about this. She will be kind and supportive and somehow that's worse.","There is no situation Becky cannot turn into a teachable moment. This one is about effort.","Becky showed up with golden energy and is beating you with it.","Becky loves every person on this trail. She loves you. She also thinks you can mash harder.","Birno is on the back nine right now and thriving","Alex drove his snowmobile to the golf course. In July.","Birno is a rad dad who eagles harder than you mash","Alex has a tee time at 2. This better be worth it.","Birno is snowmobiling somewhere warm. Goals.","Birno is on the back nine!","Snowmobile in July energy!"],nl=[...el,...tl],rl=new Set(tl);function il(e,t){if(!e||0===e.length)return"";const n=t.current||[];let r,i=0;do{r=Math.floor(Math.random()*e.length),i++}while(n.includes(r)&&i<15);const a=[...n,r];return a.length>3&&a.shift(),t.current=a,e[r]}let al=0;const ol="undefined"!==typeof window&&window.matchMedia&&window.matchMedia("(max-width: 768px)").matches,sl=ol?.75:1;function ll(){al++}function cl(){al=Math.max(0,al-1)}const dl=[".cal-section-label",".event-name",".event-meta span",".event-desc",".tags .tag",".coming-card",".coming-card .name",".coming-card .meta",".coming-card .date-stamp .day",".coming-card .date-stamp .month",".coming-card .date-stamp .weekday",".archive-toggle",".archive-card .arch-name",".archive-card .arch-date",".archive-card .arch-kudos",".weather-desc",".weather-extra",".countdown-display",".countdown-label",".event-status-chip",".weather-pill",".eggman-take",".eggman-take-label",".crew-name",".crew-rank"].join(",");let ul=null;function hl(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("off"===document.body.dataset.ambFlying)return;if(al>=25)return;ll();const n=t.emoji||"\ud83c\udf2d",r=e.getBoundingClientRect(),i=r.left+r.width/2,a=r.top+r.height/2,o=Math.random()*Math.PI*2,s=Math.cos(o),l=Math.sin(o),c=Math.max(r.width/2,1),d=Math.max(r.height/2,1),u=Math.min(c/Math.abs(s||1e-6),d/Math.abs(l||1e-6)),h=i+s*u,p=a+l*u,f=280+320*Math.random(),m=s*f,g=l*f,b=720*(Math.random()-.5),y=(1700+1200*Math.random())*sl,v=document.createElement("div");v.className="flying-hot-dog"+(t.rainbow?" is-rainbow":""),v.textContent=n,v.style.cssText=`position:fixed;pointer-events:none;z-index:1000;font-size:36px;will-change:transform,opacity;left:${h}px;top:${p}px;`,document.body.appendChild(v);let x=!1;const w=()=>{x||(x=!0,v.remove(),cl())};if(v.animate([{transform:"translate(-50%,-50%) scale(0.2) rotate(0deg)",opacity:0,offset:0},{transform:`translate(calc(-50% + ${8*s}px), calc(-50% + ${8*l}px)) scale(1) rotate(${.1*b}deg)`,opacity:1,offset:.12},{transform:`translate(calc(-50% + ${.6*m}px), calc(-50% + ${.6*g}px)) scale(1) rotate(${.6*b}deg)`,opacity:.85,offset:.6},{transform:`translate(calc(-50% + ${m}px), calc(-50% + ${g}px)) scale(1) rotate(${b}deg)`,opacity:0,offset:1}],{duration:y,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"}).onfinish=w,ol){setTimeout((()=>{if(x||!v.isConnected)return;const e=v.getBoundingClientRect();(e.right<0||e.bottom<0||e.left>window.innerWidth||e.top>window.innerHeight)&&w()}),.5*y)}}function pl(e){if("off"===document.body.dataset.ambFlying)return;if(al>=25)return;ll();const t=e.getBoundingClientRect(),n=t.left+t.width/2,r=t.top+t.height/2,i=Math.random()*Math.PI*2,a=Math.cos(i),o=Math.sin(i),s=Math.max(t.width/2,1),l=Math.max(t.height/2,1),c=Math.min(s/Math.abs(a||1e-6),l/Math.abs(o||1e-6)),d=n+a*c,u=r+o*c,h=220+280*Math.random(),p=a*h,f=o*h,m=720*(Math.random()-.5),g=(1900+1300*Math.random())*sl,b=document.createElement("div");b.className="flying-egg is-rainbow",b.textContent="\ud83e\udd5a",b.style.cssText=`position:fixed;pointer-events:none;z-index:1000;font-size:28px;will-change:transform,opacity;left:${d}px;top:${u}px;`,document.body.appendChild(b);let y=!1;const v=()=>{y||(y=!0,b.remove(),cl())};if(b.animate([{transform:"translate(-50%,-50%) scale(0.2) rotate(0deg)",opacity:0,offset:0},{transform:`translate(calc(-50% + ${8*a}px), calc(-50% + ${8*o}px)) scale(1) rotate(${.1*m}deg)`,opacity:1,offset:.12},{transform:`translate(calc(-50% + ${.6*p}px), calc(-50% + ${.6*f}px)) scale(1) rotate(${.6*m}deg)`,opacity:.85,offset:.6},{transform:`translate(calc(-50% + ${p}px), calc(-50% + ${f}px)) scale(1) rotate(${m}deg)`,opacity:0,offset:1}],{duration:g,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"}).onfinish=v,ol){setTimeout((()=>{if(y||!b.isConnected)return;const e=b.getBoundingClientRect();(e.right<0||e.bottom<0||e.left>window.innerWidth||e.top>window.innerHeight)&&v()}),.5*g)}}let fl=0,ml={eventId:null,uid:null,active:!1};const gl=new Set;function bl(e,t){gl.forEach((n=>{try{n(e,t)}catch(Bt){}}))}function yl(e){const t=Math.max(0,Number(e)||0);t!==fl&&(fl=t,bl("current",t))}function vl(){const[e,n]=(0,t.useState)(fl),[r,i]=(0,t.useState)(0),[a,o]=(0,t.useState)(null),[s,l]=(0,t.useState)(null),[c,d]=(0,t.useState)(null),[u,h]=(0,t.useState)(ml),p=(0,t.useRef)(fl),f=(0,t.useRef)(0);return(0,t.useEffect)((()=>{const e=(e,t)=>{"current"===e?(p.current=t,f.current||(f.current=requestAnimationFrame((()=>{f.current=0,n(p.current)})))):"sessionStart"===e||"sessionEnd"===e?h(t):"cumulativeWritten"===e&&t&&t.eventId===ml.eventId&&t.uid===ml.uid&&"number"===typeof t.best&&o((e=>Math.max(e||0,t.best)))};return gl.add(e),()=>{gl.delete(e),f.current&&cancelAnimationFrame(f.current),f.current=0}}),[]),(0,t.useEffect)((()=>{e>r&&i(e)}),[e,r]),(0,t.useEffect)((()=>{i(0)}),[u.eventId,u.uid]),(0,t.useEffect)((()=>{if(o(null),!u.eventId||!u.uid)return;const e=`mashHighScores/${u.eventId}/${u.uid}/best`,t=(0,Ar.ref)(Nr.OO,e),n=(0,Ar.Zy)(t,(e=>{const t=e.val();o("number"===typeof t?t:0)}),(e=>{o(0)}));return()=>n()}),[u.eventId,u.uid]),(0,t.useEffect)((()=>{if(l(null),d(null),!u.eventId)return;const e=`mashHighScores/${u.eventId}`,t=(0,Ar.P)((0,Ar.ref)(Nr.OO,e),(0,Ar.kT)("best"),(0,Ar.$1)(1)),n=(0,Ar.Zy)(t,(e=>{let t=0,n=null;e.forEach((e=>{const r=e.val(),i=r&&"number"===typeof r.best?r.best:0;i>t&&(t=i,n=e.key)})),l(t),d(n)}),(e=>{l(0),d(null)}));return()=>n()}),[u.eventId]),{current:e,session:r,cumulative:a,globalBest:s,globalBestUid:c,isHoldingGlobal:null!=c&&c===u.uid,eventId:u.eventId,uid:u.uid,sessionActive:u.active}}const xl=["That was over-easy. Try again.","Scrambled? More like sunny-side weak.","The shell is laughing at you.","Eggs-actly what we expected. Disappointing.","Cracked under pressure. Literally.","Coach Lyall yawned mid-mash.","GM Zimm noticed. He's not happy.","That's not Scrambled. That's poached.","Bad egg behavior. Hatch some effort.","Yolk's empty. You held back.","An actual egg would've mashed harder.","Even Jordan ran past that effort.","VANDAL would've finished by now.","Soft boiled. We need rolling boil energy.","The buns are laughing at you.","You can do better. You will. Or you won't. Probably won't.","Whisk-In Wednesday says no.","That was a DNS in egg form.","Stoked? No. Try again.","The yolk is on you. Again.","Hot dog hall of shame entry.","Scrambled Legs is silently judging.","Rollover effort. Literal egg roll.","Hatched, then quit. Classic.","Brent isn't having fun watching this.","QuikTrip would refund this performance.","Devil-eggs harder than you next time.","Coach said 'again.' He's serious.","Even SWIDZ would've sent it harder.","You're not getting yolked at this rate."],wl=(new Set(["Jordan would rather run","Bad Egg is judging you","Jordan crashed harder than that","Running is NOT cycling, Jordan","Even Bad Egg mashes better","Little Chip's IT band just twanged in solidarity","Jordan tried running. His IT band said no.","Little Chip is too old for this. So are you.","Jordan should just stick to ice fishing","Bad Egg failed at running. Don't fail at this.","SWIDZ already sent it","Dave's at the bar. Are you?","Send it like SWIDZ","SWIDZ would've sent that by now","Dave's getting a beer. Keep going.","SWIDZ just sent it to the moon. You're still here.","Dave got big air. You got a flat effort.","SWIDZ boosted that gap. Easily.","Dave's so chill he's already done and at the after-party","SWIDZ doesn't try harder. He just sends harder.","Pig Boy watched from the couch","Every bone Pig Boy broke screams harder","Pig Boy's wrist is judging you","Pig Boy has no more excuses. Do you?","Even Pig Boy remembers how to send it","Reed is paddling right now","Peer thinks this is too hard","Boundary waters > your effort","Reed's on a lake. What's your excuse?","Reed's Rumblefish is faster than you",'"Reed Peer with DBS here" \u2014 even mid-climb',"Reed's pitching you a basement remodel right now","Peer's ice-fishing harder than you're mashing","Reed could be hunting. He chose this. Disrespect him.","DBS Reed has 3 sales calls ahead of you","Casey's Zwift PR is a certified dad pace","Dr. Newton flosses harder than you mash","Casey trained all winter on a stationary bike for this","Newton's dentist hands could squeeze harder","Casey guarantees dad speed. He delivered. Can you?","VANDAL is chasing you with a story you've heard twice","Vandal is already on mile 40. You're still here.","VANDAL will finish. Stubbornly. Inevitably.","Tyler's about to tell you the story. Keep going.","Vandal doesn't stop. Neither do you.","Vandal is mid-monologue. There's no exit.","Tyler hasn't taken a breath in 8 miles","Mash to drown out Vandal's third anecdote","Vandal will keep talking until you cross the finish","You've nodded politely for 40 minutes. Don't break now.","Wiley showed up 30 min late and still crushed it","Matt's on his third IPA and still faster than this","Wiley forgot about this but still thought of you","Matt's confident you can do better. Annoyingly confident.","Wiley's somewhere drinking an IPA judging this performance","Wiley is rating IPAs by hop intensity instead of riding","Matt's at Bent Paddle. He says 'tell them I said hi.'","Wiley pre-loaded a hazy IPA. He's fine. Are you?","An IPA-fueled Wiley is still your top threat","Matt grades watts on the IBU scale","Derek traded trails for Spandex. Actual tragedy.","VanSlyke is on pavement right now. In full Spandex kit.","Derek can't hear you over the sound of his chamois","VanSlyke would be here but road season started","Derek became a roadie. Pray for him. Mash harder.","Markes is already training for next year","Will believes in you. Don't blow it.","Markes doesn't quit. He just keeps getting faster.","Will puts in the work every single week. What about you?","Markes is solid. So be solid.","Will sees worse output every day in the urology ward","Markes has seen actual kidney stones tougher than your climb","Your pain level is a 4. Markes treats 11s for breakfast.","Will deals with bigger issues than your effort, daily","Urology Will is unimpressed. He's seen things.","Paul broke his back in 3 places and is ahead of you","Manoppo had 6 surgeries and a better FTP than this","Paul's spine is held together by zip ties and willpower","Manoppo's doctor said no. Paul said watch me.","Paul's titanium knee is still faster than your excuses","GLARBTRON has calculated your failure probability: high","The robot supreme being demands maximum output","Glarbtron did not survive the machine wars for this","GLARBTRON requires more wattage. NOW.","The supreme entity is disappointed in your numbers","GLARBTRON is everywhere. He sees your watts.","GLARBTRON exists in all timelines. Every one is disappointing.","GLARBTRON's vacuum-tube heart hums in pity","Resistance is futile, but so is your output","GLARBTRON.exe is judging in 8-bit","Brent is not having fun and wants you to know it","St. Martin would like it on record: this is not fun","Brent thinks you're wrong for enjoying this","This is not Brent's type of fun. Reconsider your life.","Brent has left the chat. He was never spiritually present.","Birno is on the back nine right now and thriving","Alex drove his snowmobile to the golf course. In July.","Birno is a rad dad who eagles harder than you mash","Alex has a tee time at 2. This better be worth it.","Birno is snowmobiling somewhere warm. Goals.","Coach Lyall says dig deeper","Lyall's seen better effort from his couch","Coach Lyall is NOT impressed","Lyall's giving you THE look","Coach Lyall expected more","Coach is at his cabin. Disappoint him remotely.","Coach Lyall's steady pedal already passed you","Predictable as paint drying \u2014 Coach is faster","Coach is mowing his lawn. He's still ahead.","Lyall left the cabin for this. Don't waste it.","Mash those pedals like you mean it","Drop the hammer \u2014 mash 'em flat","Big-ring mash mode engaged","Pedal-mash with prejudice","Mash pedals, drop riders, repeat","Out-mash 'em on the next climb","Pedal harder. Make their legs cry.","Crush the cranks \u2014 they're free","Mash 'em into next Tuesday","Big-watt mash. No chamois cream is saving them."]),["PRESS AGAIN!","KEEP PRESSING!","DON'T STOP \u2014 TAP!","TAP FASTER!","NOW MASH!","DON'T STOP MASHING\nEVEN DURING MINI-GAMES","DON'T STOP MASHING\nEVEN DURING MINI-GAMES","DON'T STOP MASHING\nEVEN DURING MINI-GAMES","DON'T STOP MASHING\nEVEN DURING MINI-GAMES","DON'T STOP MASHING\nEVEN DURING MINI-GAMES","DON'T STOP MASHING\nEVEN DURING MINI-GAMES","DON'T STOP MASHING\nEVEN DURING MINI-GAMES","DON'T STOP MASHING\nEVEN DURING MINI-GAMES","STOP MASHING = GAME OVER","STOP MASHING = GAME OVER","STOP MASHING = GAME OVER","STOP MASHING = GAME OVER","STOP MASHING = GAME OVER","STOP MASHING = GAME OVER","HAMMER DOWN!","SEND IT!","THEY'RE BEATING YOU","ALMOST THERE","BEAST MODE","UNHINGED YET?"]);function _l(e,t){if(!e)return;if(e.textContent=t,!t)return void(e.style.fontSize="");const n=Math.min(.86*window.innerWidth,480),r=Math.floor(n/Math.max(.63*t.length,1));e.style.fontSize=`${Math.max(14,Math.min(26,r))}px`}const kl=_r`
  0%, 100% { opacity: 0.92; }
  50%       { opacity: 1; }
`,Sl=_r`
  0%, 100% { filter: brightness(1) saturate(1); }
  50%       { filter: brightness(1.30) saturate(1.45); }
`,El=(_r`
  0%   { content: ''; }
  25%  { content: '.'; }
  50%  { content: '..'; }
  75%  { content: '...'; }
  100% { content: ''; }
`,_r`
  0%   { opacity: 0.7; }
  100% { opacity: 0; transform: scale(1.04); }
`),Cl=xr.div`
  margin-top: 14px;
  position: relative;
  z-index: 1;
`,Tl=xr.button`
  position: relative;
  width: 100%;
  padding: var(--hd-pad-y, 14px) 18px;
  border: none;
  border-radius: 16px;
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
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
  animation: ${kl} 1.5s ease-in-out infinite;
  z-index: 1;

  &:active { --hd-scale: calc(var(--hd-rest, 1) * 0.96); transition-duration: 0.08s; }
  &:not(:active) { --hd-scale: var(--hd-rest, 1); }

  &.is-saving, &.is-burning { pointer-events: none; cursor: default; }

  &[data-intensity="0"] { box-shadow: 0 6px 22px rgba(255,107,107,0.40); }
  &[data-intensity="1"] { box-shadow: 0 8px 28px rgba(255,107,107,0.55); animation-duration: 1.3s; }
  &[data-intensity="2"] { box-shadow: 0 10px 36px rgba(255,107,107,0.65); animation-duration: 1.1s; }
  &[data-intensity="3"] { box-shadow: 0 14px 48px rgba(255,107,107,0.78); animation: ${Sl} 0.85s ease-in-out infinite; }
  &[data-intensity="4"] { box-shadow: 0 20px 70px rgba(255,180,60,0.65); animation: ${Sl} 0.65s ease-in-out infinite; }
  &[data-intensity="5"] { box-shadow: 0 24px 90px rgba(255,160,40,0.85), 0 0 60px rgba(255,140,30,0.5); animation: ${Sl} 0.45s ease-in-out infinite; }
  &[data-intensity="6"] { box-shadow: 0 30px 120px rgba(255,255,255,1), 0 0 100px rgba(255,255,200,0.95); animation: ${Sl} 0.30s ease-in-out infinite; }

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
    animation: ${El} 0.45s ease-out forwards;
    pointer-events: none;
  }
`,Il=xr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  transition: opacity 0.2s;

  /* In idle, shrink the count display so it doesn't overlap the centered
     MASH ME overlay — tucks into the left corner as a subtle indicator */
  ${Tl}.is-idle & {
    gap: 5px;
    opacity: 0.65;
  }
`,jl=xr.span`
  font-size: clamp(11px, 3.2vw, 22px);
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  text-align: left;
`,Pl=xr.span`
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
`,Al=xr.div`
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
`,Nl=xr.span`
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
  .is-idle ~ ${Al} & {
    font-size: clamp(20px, 6.5vw, 30px) !important;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    animation: idleEmergencyPulse 1.5s ease-in-out infinite;
  }

  /* Saving style */
  .is-saving ~ ${Al} & {
    color: #FFE66D;
    font-style: italic;
    letter-spacing: 0.02em;
  }

  /* Burning style — sized so the 1.18x burnFlash scale peak still fits the button */
  .is-burning ~ ${Al} & {
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
`,Rl=_r`
  from { opacity: 0; transform: translate(-50%, 20px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
`,Ol=xr.button`
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
  animation: ${Rl} 0.28s ease-out;

  strong { color: #FFC72C; font-weight: 700; }
`,Dl=xr.span`
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

  .is-mashing ~ ${Al} & { opacity: 1; }
  .is-idle ~ ${Al} &,
  .is-saving ~ ${Al} &,
  .is-burning ~ ${Al} & { opacity: 0; }
`;function Ml(e){let{event:n,isSheetContext:r}=e;const{displayCount:i,mash:a}=function(e,n){const[r,i]=(0,t.useState)(n||0),[a,o]=(0,t.useState)(0),[s,l]=(0,t.useState)(0),[c,d]=(0,t.useState)(!1),u=(0,t.useRef)(null),h=(0,t.useRef)(null),p=(0,t.useRef)(1e3),f=(0,t.useRef)(0),m=(0,t.useRef)(0),g=(0,t.useRef)(n||0);f.current=a,m.current=s,(0,t.useEffect)((()=>{i(n||0)}),[n]);const b=(0,t.useCallback)((async()=>{u.current&&(clearTimeout(u.current),u.current=null),h.current&&(clearTimeout(h.current),h.current=null);const t=f.current;if(!(t<=0||m.current>0)){g.current=r,l(t),o(0),d(!0);try{await(0,Ar.c4)((0,Ar.ref)(Nr.OO,`events/${e}/hotdogs`),(e=>(e||0)+t)),p.current=1e3}catch(n){o((e=>e+t)),l(0);const e=p.current;p.current=Math.min(2*e,3e4),setTimeout((()=>y()),e)}finally{d(!1)}}}),[e,r]),y=(0,t.useCallback)((()=>{u.current&&clearTimeout(u.current),u.current=setTimeout(b,300),h.current||(h.current=setTimeout(b,5e3))}),[b]),v=(0,t.useCallback)((()=>{o((e=>e+1)),y()}),[y]);return(0,t.useEffect)((()=>{s>0&&r>=g.current+s&&l(0)}),[r,s]),(0,t.useEffect)((()=>{s>0&&(g.current=r-s)}),[s]),(0,t.useEffect)((()=>()=>{f.current>0&&b(),u.current&&clearTimeout(u.current),h.current&&clearTimeout(h.current)}),[b]),{displayCount:(r||0)+s+a,mash:v,isFlushing:c,pendingDelta:a}}(n.id,n.hotdogs),{user:o}=Xo(),[s,l]=(0,t.useState)(!1),c=(0,t.useRef)(null),d=(0,t.useRef)(0),u=(0,t.useRef)(null),h=(0,t.useRef)(0),p=(0,t.useRef)(""),f=(0,t.useRef)(0),m=(0,t.useRef)(""),g=(0,t.useRef)(null),b=(0,t.useRef)(!1),y=(0,t.useRef)([]),v=(0,t.useRef)(0),x=(0,t.useRef)([]),w=(0,t.useRef)(0),_=(0,t.useRef)(null),k=(0,t.useRef)(null),S=(0,t.useCallback)((()=>{const e=u.current;if(!e)return;const t=e.getBoundingClientRect(),n=t.left+t.width/2,r=t.top+t.height/2,i=n/Math.max(window.innerWidth,1)*100,a=r/Math.max(window.innerHeight,1)*100;document.body.style.setProperty("--mash-x",`${i.toFixed(2)}%`),document.body.style.setProperty("--mash-y",`${a.toFixed(2)}%`)}),[]);(0,t.useEffect)((()=>{r&&(document.body.dataset.sheetOpen="1"),function(e){let{eventId:t,uid:n}=e;const r=t||null,i=n||null;ml.eventId===r&&ml.uid===i||(ml={eventId:r,uid:i,active:ml.active},bl("sessionStart",ml))}({eventId:n&&n.id,uid:o?o.uid:null}),E(),S();let e=0;const t=()=>{e||(e=requestAnimationFrame((()=>{e=0,S()})))};return window.addEventListener("resize",t),window.addEventListener("scroll",t,!0),()=>{window.removeEventListener("resize",t),window.removeEventListener("scroll",t,!0),e&&cancelAnimationFrame(e),r&&delete document.body.dataset.sheetOpen,document.body.style.removeProperty("--mash-x"),document.body.style.removeProperty("--mash-y"),h.current>0&&E(),g.current&&clearTimeout(g.current),c.current&&clearTimeout(c.current)}}),[r,S,n&&n.id,o&&o.uid]);const E=(0,t.useCallback)((()=>{const e=u.current;if(!e)return;const t=e.parentElement;e.classList.remove("is-mashing","is-deep-mashing","is-saving","is-burning","hd-heartbeat"),e.classList.add("is-idle"),e.dataset.intensity="0",e.style.setProperty("--hd-rest","1"),e.style.setProperty("--hd-rest-y","1"),e.style.removeProperty("--hd-hue");const n=t&&t.querySelector(".mash-num"),r=t&&t.querySelector(".mash-sub");n&&(n.style.fontSize="",n.textContent="MASH ME"),r&&_l(r,""),document.body.style.removeProperty("--mash-energy"),document.body.style.removeProperty("--mash-overdrive"),document.body.style.removeProperty("--canvas-radius"),document.body.style.removeProperty("--migration-progress"),document.body.style.removeProperty("--migration-fast"),document.body.style.removeProperty("--btn-start-x"),document.body.style.removeProperty("--btn-start-y"),document.body.style.removeProperty("--btn-w"),document.body.style.removeProperty("--btn-dx"),document.body.style.removeProperty("--btn-dy"),document.body.style.removeProperty("--btn-drag-x"),document.body.style.removeProperty("--btn-drag-y"),document.body.style.removeProperty("--sub-out"),document.body.style.removeProperty("--btn-h"),document.body.style.removeProperty("--game-accent"),delete document.body.dataset.mashing,delete document.body.dataset.eggsRainbow,delete document.body.dataset.mashLevel,delete document.body.dataset.mashLocked,delete document.body.dataset.snapBack,delete document.body.dataset.subOut,delete document.body.dataset.pigAvatar,ul=null,document.querySelectorAll(dl).forEach((e=>{e.style.removeProperty("--jx"),e.style.removeProperty("--jy"),e.style.removeProperty("--jr")})),delete document.body.dataset.mashPhase,g.current&&(clearTimeout(g.current),g.current=null),b.current=!1;try{!function(){if("undefined"===typeof document)return;let e=0;[".flying-hot-dog",".flying-egg",".flying-golden-egg",".flying-twilight-star",".phrase-char",".pig-attacker",".pig-target-avatar",".pong-ball",".flying-rare",".level-up-overlay"].forEach((t=>{document.querySelectorAll(t).forEach((t=>{try{t.getAnimations&&t.getAnimations().forEach((e=>e.cancel()))}catch(Bt){}try{t.remove(),e+=1}catch(Bt){}}))})),al=0,document.body.style.background="";const t=document.getElementById("mash-canvas");t&&(t.style.background=""),delete document.body.dataset.mashMode,delete document.body.dataset.buttonState,delete document.body.dataset.gameClock,delete document.body.dataset.ambFlying,delete document.body.dataset.ambBubble,delete document.body.dataset.ambChallenge,delete document.body.dataset.ambHeartbeat,delete document.body.dataset.ambFlash,delete document.body.dataset.ambShockwave,delete document.body.dataset.miniGameId,delete document.body.dataset.phaseKind,delete document.body.dataset.mashPhase}()}catch(Bt){}try{Ys.reset()}catch(Bt){}try{yl(0),ml={...ml,active:!1},bl("sessionEnd",ml)}catch(Bt){}k.current&&k.current();try{document.body.dataset.savedScrollY;const e=parseInt(document.body.dataset.savedScrollY||"0",10);document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.right="",document.body.style.width="",document.body.style.overscrollBehavior="",delete document.body.dataset.savedScrollY;const t=document.querySelector('meta[name="viewport"]');t&&t.dataset.preGameContent&&(t.content=t.dataset.preGameContent,delete t.dataset.preGameContent),window.scrollTo(0,e)}catch(vy){console.warn("[mash-game] GAME END failed:",vy&&vy.message)}}),[]),C=(0,t.useCallback)((()=>{if(b.current)return;b.current=!0;const e=u.current;if(!e)return;const t=e.parentElement,r=t&&t.querySelector(".mash-num"),i=t&&t.querySelector(".mash-sub");if(h.current<=0)return e.classList.remove("is-mashing","is-deep-mashing","is-saving","is-burning"),e.dataset.intensity="0",e.style.setProperty("--hd-rest","1"),e.style.setProperty("--hd-pad-y","14px"),e.style.removeProperty("--hd-hue"),r&&(r.style.fontSize="",r.textContent="+1"),void(i&&(i.textContent=""));e.classList.remove("is-mashing","is-deep-mashing","hd-heartbeat"),e.classList.add("is-saving"),document.body.dataset.mashPhase="saving",r&&(r.textContent=`saving ${aa(h.current)}`,r.style.fontSize="28px"),i&&(i.textContent=""),setTimeout((()=>{let t;if(e.classList.remove("is-saving"),e.classList.add("is-burning"),document.body.dataset.mashPhase="burning",h.current<10)t="TRY AGAIN\nKEEP MASHING TO PLAY";else{do{t=xl[Math.floor(Math.random()*xl.length)]}while(t===m.current&&xl.length>1);m.current=t}r&&(r.textContent=t,r.style.fontSize=""),setTimeout((()=>{const t=h.current,r=w.current,i=_.current;if(i&&t>0&&n&&n.id)try{const e=(0,Ar.VC)((0,Ar.ref)(Nr.OO,`mashSessions/${n.id}/${i}`));(0,Ar.hZ)(e,{startedAt:r||Date.now(),endedAt:Date.now(),count:t}).catch((()=>{})),(0,Ar.c4)((0,Ar.ref)(Nr.OO,`eventMashTotals/${n.id}/${i}`),(e=>(e||0)+t)).catch((()=>{})),(0,Ar.c4)((0,Ar.ref)(Nr.OO,`mashHighScores/${n.id}/${i}/best`),(e=>Math.max(e||0,t))).then((e=>{if(e&&e.committed){const r=e.snapshot&&e.snapshot.val()||t;bl("cumulativeWritten",{eventId:n.id,uid:i,best:r})}})).catch((e=>{})),(0,so.logEvent)("mash_session_complete",{eventId:n.id,count:t,durationMs:Date.now()-(r||Date.now())})}catch(a){console.error("[hs] exception during database writes:",a)}else t>0&&n&&n.id&&(0,so.logEvent)("mash_session_complete",{eventId:n.id,count:t,anonymous:!0});h.current=0,p.current="",f.current=0,w.current=0,_.current=null,e.style.setProperty("--hd-rest-y","1"),b.current=!1,E()}),4e3)}),1300)}),[E,o,n]);(0,t.useEffect)((()=>Ys.onSessionEnd((()=>{g.current&&(clearTimeout(g.current),g.current=null),C()}))),[C]),(0,t.useEffect)((()=>{let e=!1,t=null,n=0,r=0,i=0,a=0,o=0,s=0,l=0,c=0,d=0;const h=e=>{if(e.pointerId!==t)return;const u=e.clientX-n,h=e.clientY-r;n=e.clientX,r=e.clientY,i+=u,a+=h,(()=>{const e=Ys.getState().resolved;if(e&&"horizontal"===e.dragAxis){a=0;const e=window.innerWidth,t=d-c,n=e-c-d;i<t&&(i=t),i>n&&(i=n)}})(),s=e.clientX,l=e.clientY,o||(o=requestAnimationFrame((()=>{o=0,document.body.style.setProperty("--btn-drag-x",i+"px"),document.body.style.setProperty("--btn-drag-y",a+"px"),Ys.handleDragMove({x:s,y:l,dx:i,dy:a})})))},p=e=>{if(null==t||e.pointerId!==t)return;const n=u.current;try{n&&n.releasePointerCapture(t)}catch(Bt){}t=null,window.removeEventListener("pointermove",h),window.removeEventListener("pointerup",p),window.removeEventListener("pointercancel",p),Ys.handleDragEnd({x:e.clientX,y:e.clientY,dx:i,dy:a})},f=e=>{const a=u.current;if(!a)return;e.preventDefault(),t=e.pointerId,n=e.clientX,r=e.clientY;const o=a.getBoundingClientRect();d=o.width/2,c=o.left+d-i;try{a.setPointerCapture(t)}catch(Bt){}Ys.handleDragStart({x:e.clientX,y:e.clientY}),window.addEventListener("pointermove",h,{passive:!1}),window.addEventListener("pointerup",p,{passive:!1}),window.addEventListener("pointercancel",p,{passive:!1})};function m(){const n=u.current;n&&n.removeEventListener("pointerdown",f),e=!1,o&&(cancelAnimationFrame(o),o=0),null!=t&&(window.removeEventListener("pointermove",h),window.removeEventListener("pointerup",p),window.removeEventListener("pointercancel",p),t=null),document.body.style.removeProperty("--btn-drag-x"),document.body.style.removeProperty("--btn-drag-y"),i=0,a=0}const g=Ys.subscribe((t=>{const n=t.resolved&&"draggable"===t.resolved.buttonState;n&&!e?function(){const t=u.current;t&&!e&&(e=!0,t.addEventListener("pointerdown",f,{passive:!1}))}():!n&&e&&m()}));return()=>{g(),m()}}),[]),(0,t.useEffect)((()=>{const e=Ys.onBonusAwarded(((e,t)=>{if(!e)return;h.current;h.current=Math.max(0,h.current+e),yl(h.current);const n=u.current;if(n){const r=n.parentElement,i=r&&r.querySelector(".mash-num");let a,o;if(i&&n.classList.contains("is-mashing")&&(i.textContent=`+${aa(h.current)}`),t&&"number"===typeof t.x&&"number"===typeof t.y)a=t.x,o=t.y;else{const e=n.getBoundingClientRect();a=e.left+e.width/2,o=e.top+e.height/2}!function(e,t,n){if("undefined"===typeof document||!e)return;const r=e<0,i=document.createElement("div");i.textContent=(r?"":"+")+e;const a=r?"#FF4747":"#FFD700",o=r?"0 0 16px rgba(255,71,71,0.95),0 0 32px rgba(180,0,0,0.85),0 3px 10px rgba(0,0,0,0.75)":"0 0 16px rgba(255,215,0,0.95),0 0 32px rgba(255,140,0,0.8),0 3px 10px rgba(0,0,0,0.7)";i.style.cssText=["position:fixed","pointer-events:none","z-index:9200",`left:${t}px`,`top:${n}px`,"font-family:'Fredoka',sans-serif","font-weight:700","font-size:42px",`color:${a}`,`text-shadow:${o}`,"transform:translate(-50%,-50%)","will-change:transform,opacity"].join(";")+";",document.body.appendChild(i),i.animate([{transform:"translate(-50%,-50%) scale(0.4)",opacity:0,offset:0},{transform:"translate(-50%,-50%) scale(1.3)",opacity:1,offset:.18},{transform:"translate(-50%,-90px) scale(1)",opacity:1,offset:.7},{transform:"translate(-50%,-160px) scale(0.9)",opacity:0,offset:1}],{duration:1100,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"}).onfinish=()=>i.remove()}(e,a,o)}}));return e}),[]),(0,t.useEffect)((()=>{let e=!1,t=null;return Ys.subscribe((n=>{const r=n.resolved,i=!(!r||!r.gameClockPaused&&"paused"!==r.mashingMode&&"inverted"!==r.mashingMode),a=r?r.miniGameId:null;i&&!e?(e=!0,g.current&&(clearTimeout(g.current),g.current=null)):!i&&e&&(e=!1);if(null!=t&&null==a&&!b.current){if(h.current>0){g.current&&(clearTimeout(g.current),g.current=null),g.current=setTimeout((()=>{C()}),4e3);const e=u.current;e&&"off"!==document.body.dataset.ambHeartbeat&&(e.classList.remove("hd-heartbeat"),e.offsetWidth,e.classList.add("hd-heartbeat"))}}t=a}))}),[C]);const T=(0,t.useCallback)((()=>{const e=u.current;if(!e)return;if(e.classList.contains("is-saving")||e.classList.contains("is-burning"))return;const t=Ys.getState().resolved,r=t&&t.mashingMode||"normal";if(Ys.handlePress(Date.now()),"paused"===r||"inverted"===r)return;if(e.classList.remove("is-idle"),S(),a(),!o&&(d.current+=1,5===d.current))try{sessionStorage.getItem("sl_anon_mash_nudged")||(sessionStorage.setItem("sl_anon_mash_nudged","1"),l(!0),c.current&&clearTimeout(c.current),c.current=setTimeout((()=>l(!1)),6e3),window.dispatchEvent(new Event("auth:nudge")))}catch(Bt){}h.current+=1;const i=h.current;if(Ys.setPressCount(i),yl(i),1===i){w.current=Date.now(),_.current=o?o.uid:null,function(e){let{eventId:t,uid:n}=e;ml={eventId:t||null,uid:n||null,active:!0},bl("sessionStart",ml)}({eventId:n&&n.id,uid:o?o.uid:null});As().startMainTrack("/audio/main-tracks/mash-theme.mp3",.7,6500).catch((e=>{console.error("[audio] Failed to start main track on first mash press:",e)}));try{const t=(e.parentElement||e).getBoundingClientRect(),n=t.left+t.width/2,r=t.top+t.height/2,i=window.innerWidth/2,a=.85*(window.visualViewport&&window.visualViewport.height||window.innerHeight),o=Math.round(i-n),s=Math.round(a-r);document.body.style.setProperty("--btn-dx",`${o}px`),document.body.style.setProperty("--btn-dy",`${s}px`),document.body.style.setProperty("--migration-progress","0"),document.body.style.setProperty("--canvas-radius","0");const l=window.scrollY||window.pageYOffset||0;document.body.dataset.savedScrollY=String(l),document.body.style.position="fixed",document.body.style.top=`-${l}px`,document.body.style.left="0",document.body.style.right="0",document.body.style.width="100%",document.body.style.overscrollBehavior="none",document.body.dataset.mashLocked="1";const c=document.querySelector('meta[name="viewport"]');c&&(c.dataset.preGameContent=c.content,c.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");try{if(window.visualViewport&&!k.current){const t=()=>{if("1"!==document.body.dataset.mashLocked)return;const t=e.parentElement;if(!t)return;const n=getComputedStyle(t),r=parseFloat(n.getPropertyValue("--migration-progress"))||0,i=t.getBoundingClientRect(),a=i.left+i.width/2,o=i.top+i.height/2,s=a-(parseFloat(document.body.style.getPropertyValue("--btn-dx"))||0)*r,l=o-(parseFloat(document.body.style.getPropertyValue("--btn-dy"))||0)*r,c=window.visualViewport,d=c.width/2,u=.85*c.height,h=Math.round(d-s),p=Math.round(u-l);document.body.style.setProperty("--btn-dx",h+"px"),document.body.style.setProperty("--btn-dy",p+"px")};window.visualViewport.addEventListener("resize",t),window.visualViewport.addEventListener("scroll",t),k.current=()=>{try{window.visualViewport.removeEventListener("resize",t),window.visualViewport.removeEventListener("scroll",t)}catch(Bt){}k.current=null}}}catch(Bt){}}catch(vy){console.warn("[mash-game] GAME START failed:",vy&&vy.message)}if(o&&n&&n.id){const e=`sl_mashed_${n.id}`;let t=!1;try{t=!!sessionStorage.getItem(e)}catch(Bt){}if(!t){try{sessionStorage.setItem(e,"1")}catch(Bt){}try{(0,Ar.hZ)((0,Ar.ref)(Nr.OO,`eventInteractions/${n.id}/${o.uid}/lastAt`),Date.now()).catch((()=>{})),(0,Ar.hZ)((0,Ar.ref)(Nr.OO,`eventInteractions/${n.id}/${o.uid}/mashed`),!0).catch((()=>{}))}catch(Bt){}}}}const s=e.parentElement,m=s&&s.querySelector(".mash-num"),b=s&&s.querySelector(".mash-sub"),E=document.createElement("span");E.className="ping",e.appendChild(E),setTimeout((()=>E.remove()),500);const T=Math.min(i,5),I=Math.max(22,Math.floor(1100/T)),j=function(e){return e<25?0:e>=100?1:(e-25)/75}(i);for(let n=0;n<T;n++){const t=Math.random()<j,r=Ul(i);setTimeout((()=>hl(e,{rainbow:t,emoji:r})),n*I)}if(function(e,t,n,r){if("off"===document.body.dataset.ambBubble)return;const i=Date.now();if(i<t.current)return;t.current=i+5e3;const a=il(null!=r&&r>=30?nl:el,n),o=e.getBoundingClientRect().top-8,s=document.createElement("span");s.className="phrase-char",s.textContent=a,s.style.cssText=["position:fixed","pointer-events:none","z-index:1001","font-family:'Fredoka',sans-serif","font-weight:700","font-size:26px","background:linear-gradient(45deg,#FFE66D,#FF8800)","-webkit-background-clip:text","-webkit-text-fill-color:transparent","background-clip:text","will-change:transform,opacity","left:50%",`top:${o}px`,"transform:translateX(-50%)","max-width:calc(100vw - 24px)","width:max-content","text-align:center","white-space:normal","word-wrap:break-word","overflow-wrap:break-word","line-height:1.1","opacity:0"].join(";")+";",document.body.appendChild(s);const l=70*(Math.random()-.5),c=18+22*Math.random(),d=36*(Math.random()-.5),u=1.3*(8500+900*Math.random());s.animate([{transform:"translate(-50%,0) rotate(0deg)",opacity:0,offset:0},{transform:"translate(-50%,-82px) rotate(0deg)",opacity:1,offset:.087},{transform:`translate(calc(-50% + ${3*(Math.random()-.5)}px),-101px) rotate(${3*(Math.random()-.5)}deg)`,opacity:1,offset:.435},{transform:`translate(calc(-50% + ${.25*l-.3*c}px),-180px) rotate(${.4*d}deg)`,opacity:1,offset:.56},{transform:`translate(calc(-50% + ${.55*l+.6*c}px),-320px) rotate(${.7*d}deg)`,opacity:1,offset:.72},{transform:`translate(calc(-50% + ${.82*l-.4*c}px),-460px) rotate(${.9*d}deg)`,opacity:.85,offset:.88},{transform:`translate(calc(-50% + ${l}px),-600px) rotate(${d}deg)`,opacity:0,offset:1}],{duration:u,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"}).onfinish=()=>s.remove()}(e,v,x,h.current),i>=25&&Math.random()<.3){const t=Math.random()<.4?2:1;for(let n=0;n<t;n++)setTimeout((()=>pl(e)),60*n)}!function(e){if("off"===document.body.dataset.ambFlash)return;if(e<10)return;const t=document.getElementById("mash-flash");if(!t)return;const n=47*e%360,r=Math.min((e-10)/40,1);t.animate([{backgroundColor:`hsl(${n}, 95%, 55%)`,opacity:.05+.5*r},{opacity:0}],{duration:220,easing:"ease-out"})}(i),"off"!==document.body.dataset.ambHeartbeat?(e.classList.remove("hd-heartbeat"),e.offsetWidth,e.classList.add("hd-heartbeat")):e.classList.remove("hd-heartbeat");const P=1+.022*i,A=1+.014*i;e.style.setProperty("--hd-rest",P.toFixed(3)),e.style.setProperty("--hd-rest-y",A.toFixed(3)),e.style.setProperty("--hd-pad-y","14px");const N=14*i%360;e.style.setProperty("--hd-hue",String(N)),function(e,t){const n=Math.min(Math.max(e/25,0),1),r=Math.min(Math.max((e-50)/50,0),1);if(document.body.style.setProperty("--mash-energy",n.toFixed(3)),document.body.style.setProperty("--mash-overdrive",r.toFixed(3)),e>0?document.body.dataset.mashing="1":delete document.body.dataset.mashing,e>=50?document.body.dataset.eggsRainbow="1":delete document.body.dataset.eggsRainbow,"paused"===document.body.dataset.gameClock)return;const i=Math.min(e/25,1),a=Math.pow(i,2.4);document.body.style.setProperty("--canvas-radius",a.toFixed(3));const o=Math.min(e/25,1);document.body.style.setProperty("--migration-progress",o.toFixed(3));const s=Math.sqrt(o);document.body.style.setProperty("--migration-fast",s.toFixed(3));const l=e>=26?1:0;document.body.style.setProperty("--sub-out",String(l)),document.body.dataset.subOut=String(l);try{const e=t||document.querySelector(".hd-cta");e&&document.body.style.setProperty("--btn-h",e.clientHeight+"px")}catch(Bt){}try{if("1"===document.body.dataset.mashLocked){const e=t&&t.parentElement||document.querySelector(".kudos-row");if(e){const t=getComputedStyle(e),n=t.transform&&t.transform.match(/matrix\(([^)]+)\)/),r=n&&parseFloat(n[1].split(",")[5])||0,i=e.getBoundingClientRect(),a=i.top-r+i.height/2,o=.85*(window.visualViewport&&window.visualViewport.height||window.innerHeight),s=Math.round(o-a);document.body.style.setProperty("--btn-dy",s+"px")}}}catch(Bt){}const c=Math.min(Math.floor(e/100),10);parseInt(document.body.dataset.mashLevel||"0",10),c>0?document.body.dataset.mashLevel=String(c):delete document.body.dataset.mashLevel}(i,e),i<25&&(ul||(ul=document.querySelectorAll(dl)),ul.forEach((e=>{e.style.setProperty("--jx",(2*(Math.random()-.5)).toFixed(2)),e.style.setProperty("--jy",(2*(Math.random()-.5)).toFixed(2)),e.style.setProperty("--jr",(2*(Math.random()-.5)).toFixed(2))})));const R=1.5+Math.min(.04*i,1.5);if(e.animate([{filter:`brightness(${R.toFixed(2)}) saturate(${R.toFixed(2)})`},{filter:"brightness(1) saturate(1)"}],{duration:160,easing:"ease-out"}),e.classList.remove("is-saving","is-burning"),e.classList.add("is-mashing"),m){m.style.removeProperty("font-size"),m.textContent=`+${aa(i)}`;const e=30+Math.min(1.3*i,40);m.style.fontSize=`${e}px`}if(s){const e=s.querySelector(".hd-cta-mash");e&&e.style.setProperty("--mash-scale","1")}e.dataset.intensity=String(function(e){return e<=2?0:e<=5?1:e<=9?2:e<=14?3:e<=24?4:5}(i));const O=Date.now(),D=document.body.dataset.ambChallenge;if("frozen"!==D&&"off"!==D){const e=i<=wl.length,t=rl.has(p.current)?4e3:2500;if(e||O-f.current>=t){const e=function(e,t){return e>=1&&e<=wl.length?wl[e-1]:il(nl,t)}(i,y);p.current=e,f.current=O,b&&_l(b,e)}}i>=10?e.classList.add("is-deep-mashing"):e.classList.remove("is-deep-mashing"),g.current&&clearTimeout(g.current);const M=Ys.getState().resolved;M&&(M.gameClockPaused||"paused"===M.mashingMode||"inverted"===M.mashingMode)||(g.current=setTimeout((()=>{C()}),2500))}),[a,S,o,n,C]);return(0,Sr.jsxs)(Cl,{className:"kudos-row",children:[(0,Sr.jsxs)(Tl,{ref:u,className:"hd-cta","data-intensity":"0",title:"Mash for hot doggy dog love",onClick:T,type:"button",children:[(0,Sr.jsx)(Il,{className:"hd-cta-top",children:(0,Sr.jsxs)(jl,{className:"hd-cta-count",children:["+",aa(i)]})}),(0,Sr.jsx)(Pl,{className:"hd-cta-text",children:"Mash me"})]}),(0,Sr.jsxs)(Al,{className:"hd-cta-mash",children:[(0,Sr.jsx)(Nl,{className:"mash-num",children:"MASH ME"}),(0,Sr.jsx)(Dl,{className:"mash-sub"})]}),(0,Sr.jsx)(Xs,{}),s&&(0,Sr.jsxs)(Ol,{type:"button",onClick:()=>{l(!1),c.current&&clearTimeout(c.current),window.dispatchEvent(new Event("auth:open"))},children:["Mashing in the dark? \ud83c\udf2d ",(0,Sr.jsx)("strong",{children:"Sign in"})," to track your streak and climb the leaderboard."]})]})}const Ll=["\ud83d\udd25","\ud83d\udd25","\ud83d\udd25","\ud83d\udca5","\ud83c\udf0b","\u26a1"],Fl=["\ud83d\udc04","\ud83d\udc14","\ud83d\udc37","\ud83d\udc11","\ud83d\udc13","\ud83e\udd86","\ud83d\udc30","\ud83d\udc0e","\ud83e\udd83","\ud83c\udf3d","\ud83e\udd55","\ud83d\ude9c","\ud83c\udf3e","\ud83d\udc38","\ud83e\udd89"],zl=["\ud83c\udf89","\ud83c\udf8a","\ud83c\udf88","\ud83c\udf08","\u2b50","\ud83c\udf1f","\ud83d\udca5","\u2728","\ud83d\udcab","\ud83c\udfaf","\ud83c\udfc6","\ud83e\udd47","\ud83c\udfaa","\ud83c\udfad","\ud83c\udfa8","\ud83c\udfac","\ud83c\udfae","\ud83c\udfb2","\ud83c\udccf","\ud83c\udf55","\ud83c\udf54","\ud83c\udf2e","\ud83c\udf5c","\ud83c\udf63","\ud83c\udf66","\ud83c\udf69","\ud83c\udf82","\ud83d\ude80","\u2708\ufe0f","\ud83d\ude82","\ud83c\udfce\ufe0f","\ud83c\udf0a","\ud83d\udca8","\ud83c\udf2a\ufe0f","\ud83c\udf29\ufe0f","\ud83e\udd84","\ud83d\udc09","\ud83e\udd8b","\ud83d\udc2c","\ud83e\udd81","\ud83d\udc2f","\ud83e\udd8a","\ud83e\udd85","\ud83d\udc8e","\ud83d\udd2e","\ud83d\udddd\ufe0f","\u2694\ufe0f","\ud83d\udee1\ufe0f","\ud83c\udff0","\ud83c\udf0b","\ud83c\udf38","\ud83c\udf3a","\ud83c\udf3b","\ud83c\udf39","\ud83c\udf40","\ud83c\udf44","\ud83c\udf19","\u2600\ufe0f","\ud83c\udfb8","\ud83e\udd41","\ud83c\udfc4","\ud83e\uddd7","\ud83e\udd3f","\ud83e\ude82","\u26f7\ufe0f","\ud83c\udfc7","\ud83e\udd4a","\ud83c\udfb3","\ud83c\udfaf","\ud83c\udfb0"],$l=["\ud83d\udeb4\ud83c\udfff","\ud83d\udeb4\ud83c\udffe","\ud83d\udeb4\ud83c\udffd","\ud83d\udeb4\ud83c\udffc","\ud83c\udfc3\ud83c\udfff","\ud83c\udfc3\ud83c\udffe","\ud83c\udfc3\ud83c\udffd","\ud83e\udd38\ud83c\udfff","\ud83e\udd38\ud83c\udffe","\ud83e\udd38\ud83c\udffd","\ud83d\udcaa\ud83c\udfff","\ud83d\udcaa\ud83c\udffe","\ud83d\udcaa\ud83c\udffd","\ud83d\ude4c\ud83c\udfff","\ud83d\ude4c\ud83c\udffe","\ud83d\ude4c\ud83c\udffd","\ud83e\uddd1\ud83c\udfff","\ud83d\udc69\ud83c\udfff","\ud83d\udc68\ud83c\udfff","\ud83e\uddd1\ud83c\udffd","\ud83d\udc69\ud83c\udffd","\ud83d\udc68\ud83c\udffd"];function Ul(e){return e>=100&&Math.random()<.25?$l[Math.floor(Math.random()*$l.length)]:e>=50&&Math.random()<.2?zl[Math.floor(Math.random()*zl.length)]:e>=25&&Math.random()<.15?Ll[Math.floor(Math.random()*Ll.length)]:Math.random()<function(e){return e<25?0:Math.min((e-25)/75*.65,.65)}(e)?Fl[Math.floor(Math.random()*Fl.length)]:"\ud83c\udf2d"}xr.button`
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
`;function Bl(e){return e?function(e){let t=5381;for(let n=0;n<e.length;n++)t=(t<<5)+t+e.charCodeAt(n)|0;return Math.abs(t)}(String(e))%3+3:3}const Wl="sl_pending_rsvp_event_id",Hl=xr.div`
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
`,Vl=_r`
  0%, 100% { box-shadow: inset 0 0 0 rgba(255,255,255,0); }
  50%      { box-shadow: inset 0 0 18px rgba(255,255,255,0.18); }
`,ql=_r`
  0%   { transform: translateX(-120%); }
  60%  { transform: translateX(120%); }
  100% { transform: translateX(120%); }
`,Gl=xr.button`
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
  animation: ${Vl} 3.4s ease-in-out infinite;

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
    animation: ${ql} 5.5s ease-in-out infinite;
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
`,Kl=xr.span`
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
`,Yl=xr.div`
  padding: 12px 14px 12px;
`,Zl=xr.button`
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
`,Jl=xr.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: none;
  letter-spacing: 0;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #FFE66D;
`,Ql=xr.span`
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  transition: transform 0.15s;
  ${e=>e.$open&&"transform: rotate(90deg);"}
`,Xl=xr.div`
  margin: 8px 0 2px;
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  text-align: center;
  font-family: 'Inter', sans-serif;
`,ec=xr.button`
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
`,tc=xr.div`
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
`,nc=xr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 4px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  &:last-child { border-bottom: none; }
`,rc=xr.div`
  position: relative;
  ${e=>e.$overflowing&&br`
    max-height: 196px;     /* ~4 rows tall */
    overflow-y: auto;
    overscroll-behavior: contain;
    /* Bottom-edge fade hints there's more below — fades the last ~28px */
    mask-image: linear-gradient(to bottom, #000 calc(100% - 28px), transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 28px), transparent 100%);

    /* Slim scrollbar so the rail is visible but not bulky */
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb {
      background: rgba(255,199,44,0.45);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover { background: rgba(255,199,44,0.75); }
    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: rgba(255,199,44,0.45) transparent;
  `}
`,ic=xr.div`
  position: relative;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`,ac=_r`
  0%,100% { box-shadow: 0 0 0 2px #FFD24A, 0 0 8px rgba(255,210,74,0.55); }
  50%      { box-shadow: 0 0 0 2px #FFE066, 0 0 14px rgba(255,210,74,0.85); }
`,oc=xr.div`
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

  &[data-medal="1"] { animation: ${ac} 2.4s ease-in-out infinite; }
  &[data-medal="2"] { box-shadow: 0 0 0 2px #D8D9DD, 0 0 8px rgba(216,217,221,0.45); }
  &[data-medal="3"] { box-shadow: 0 0 0 2px #C98A55, 0 0 8px rgba(201,138,85,0.45); }
`,sc=xr.span`
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
`,lc=(xr.svg`
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
`,xr.div`
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
`),cc=xr.div`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #f4f4f4;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;

  @media (max-width: 480px) { font-size: 12px; }
`,dc=xr.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.65);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  @media (max-width: 480px) { font-size: 11px; }
`,uc=xr.span`
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
`,hc={1:"Top Masher",2:"Vice Masher",3:"Mash Cadet"},pc=xr.div`
  padding: 14px 4px;
  font-size: 12px;
  color: rgba(255,255,255,0.45);
  text-align: center;
`,fc=xr.button`
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
`,mc=xr.div`
  filter: hue-rotate(-15deg) saturate(0.7);
  margin-top: 4px;
`,gc=xr.div`
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
`,bc=xr.div`
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
`,yc=xr.div`
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #A66;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;xr.span`
  font-size: 14px;
  filter: saturate(0.6);
`;function vc(e){return e?e.charAt(0):"?"}const xc=["\ud83c\udf2d","\ud83e\udd5a","\ud83d\udeb4"];function wc(e){let{event:n}=e;const{user:r,loading:i}=Xo(),[a,o]=(0,t.useState)(!1),[s,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)(""),[u,h]=(0,t.useState)(xc[0]);(0,t.useEffect)((()=>{const e=setInterval((()=>{h((e=>xc[(xc.indexOf(e)+1)%xc.length]))}),2500);return()=>clearInterval(e)}),[]);const[p,f]=(0,t.useState)({}),[m,g]=(0,t.useState)({}),[b,y]=(0,t.useState)(!1),[v,x]=(0,t.useState)(!1),[w,_]=(0,t.useState)({});(0,t.useEffect)((()=>{if(!n||!n.id)return;const e=(0,Ar.ref)(Nr.OO,`rsvps/${n.id}`),t=(0,Ar.Zy)(e,(e=>f(e.val()||{})));return()=>t()}),[n]),(0,t.useEffect)((()=>{if(!n||!n.id||!r)return void g({});const e=(0,Ar.ref)(Nr.OO,`eventMashTotals/${n.id}`),t=(0,Ar.Zy)(e,(e=>g(e.val()||{})));return()=>t()}),[n,r]);const[k,S]=(0,t.useState)({});(0,t.useEffect)((()=>{if(!n||!n.id||!r)return void S({});const e=(0,Ar.ref)(Nr.OO,`eventInteractions/${n.id}`),t=(0,Ar.Zy)(e,(e=>S(e.val()||{})));return()=>t()}),[n,r]),(0,t.useEffect)((()=>{if(!n||!n.id||!r)return void o(!1);const e=(0,Ar.ref)(Nr.OO,`rsvps/${n.id}/${r.uid}`),t=(0,Ar.Zy)(e,(e=>o(!!e.val())));return()=>t()}),[n,r]),(0,t.useEffect)((()=>{r&&n&&n.id&&(0,Ar.yo)((0,Ar.ref)(Nr.OO,`eventInteractions/${n.id}/${r.uid}`),{lastAt:(0,Ar.O5)(),viewed:!0}).catch((()=>{}))}),[null===r||void 0===r?void 0:r.uid,null===n||void 0===n?void 0:n.id]);const E=async()=>{if(r&&n&&n.id){l(!0);try{let e="",t=null;try{const n=(await(0,Ar.get)((0,Ar.jf)((0,Ar.ref)(Nr.OO),`userProfiles/${r.uid}`))).val()||{};e=n.displayName||"",t=n.photoURL||null}catch(Bt){}const i=r.email?r.email.split("@")[0]:"rider";await(0,Ar.hZ)((0,Ar.ref)(Nr.OO,`rsvps/${n.id}/${r.uid}`),{rsvpedAt:(0,Ar.O5)(),displayName:e||i,photoURL:t,email:r.email||null}),(0,Ar.yo)((0,Ar.ref)(Nr.OO,`eventInteractions/${n.id}/${r.uid}`),{lastAt:(0,Ar.O5)(),rsvped:!0}).catch((()=>{})),(0,so.logEvent)("rsvp_added",{eventId:n.id})}catch(Bt){}finally{l(!1)}}};(0,t.useEffect)((()=>{if(!r||!n||!n.id)return;let e="";try{e=sessionStorage.getItem(Wl)||""}catch(Bt){}if(e&&e===n.id){try{sessionStorage.removeItem(Wl)}catch(Bt){}E()}}),[r,n]);const C=()=>{window.dispatchEvent(new Event("auth:open")),window.dispatchEvent(new Event("auth:nudge"))},{crew:T,badEggs:I}=(0,t.useMemo)((()=>{const e=new Set([...Object.keys(p),...Object.keys(m),...Object.keys(k)]),t=[];e.forEach((e=>{const n=p[e],r=m[e]||0,i=!!k[e];t.push({uid:e,rsvped:!!n,rsvpedAt:n&&n.rsvpedAt||0,displayName:n&&n.displayName||"Anonymous masher",photoURL:n&&n.photoURL||null,mashes:r,interacted:i})}));const n=t.filter((e=>e.rsvped)).sort(((e,t)=>t.mashes-e.mashes||e.rsvpedAt-t.rsvpedAt)),r=t.filter((e=>!e.rsvped&&(e.mashes>=1||e.interacted))).sort(((e,t)=>t.mashes-e.mashes));return{crew:n,badEggs:r}}),[p,m,k]);(0,t.useEffect)((()=>{if(!r)return;const e=[...T.map((e=>e.uid)),...I.map((e=>e.uid))].filter((e=>!(e in w)));if(0===e.length)return;let t=!1;return(async()=>{const n={};await Promise.all(e.map((async e=>{try{const t=await(0,Ar.get)((0,Ar.jf)((0,Ar.ref)(Nr.OO),`userProfiles/${e}/displayName`)),r=await(0,Ar.get)((0,Ar.jf)((0,Ar.ref)(Nr.OO),`userProfiles/${e}/photoURL`));n[e]={displayName:t.exists()?t.val():null,photoURL:r.exists()?r.val():null}}catch(Bt){n[e]={displayName:null,photoURL:null}}}))),t||_((e=>({...e,...n})))})(),()=>{t=!0}}),[T,I,r,w]);const j=Object.keys(p).length,P=j>0?j:Bl(n&&n.id);return(0,Sr.jsxs)(Hl,{children:[(0,Sr.jsxs)(Gl,{type:"button",$rsvped:a,disabled:s,onClick:()=>{if(!i&&!s){if(!r){try{sessionStorage.setItem(Wl,n.id)}catch(Bt){}return d(e="Sorry, gotta log in to RSVP \ud83e\udd5a"),setTimeout((()=>d((t=>t===e?"":t))),2600),window.dispatchEvent(new Event("auth:open")),void window.dispatchEvent(new Event("auth:nudge"))}var e;a?(async()=>{if(r&&n&&n.id){l(!0);try{await(0,Ar.TF)((0,Ar.ref)(Nr.OO,`rsvps/${n.id}/${r.uid}`)),(0,so.logEvent)("rsvp_removed",{eventId:n.id})}catch(Bt){}finally{l(!1)}}})():E()}},children:[(0,Sr.jsx)("span",{children:a?"\u2713 You're in":"I'm coming"}),(0,Sr.jsxs)(Kl,{children:["\ud83e\udd5a ",P]})]}),(0,Sr.jsxs)(Yl,{children:[(0,Sr.jsxs)(Zl,{type:"button",$open:v,onClick:()=>{r?(x((e=>!e)),(0,Ar.yo)((0,Ar.ref)(Nr.OO,`eventInteractions/${n.id}/${r.uid}`),{lastAt:(0,Ar.O5)(),viewedCrew:!0}).catch((()=>{}))):C()},children:[(0,Sr.jsx)("span",{children:"The Crew"}),(0,Sr.jsxs)(Jl,{children:[r?`${P} coming`:"Sign in to view",(0,Sr.jsx)(Ql,{$open:v,children:"\u203a"})]})]}),!r&&!i&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(Xl,{children:"Sign in to lock in your RSVP and join the leaderboard."}),(0,Sr.jsx)(ec,{type:"button",onClick:C,children:"\ud83e\udd5a Sign in to see who's coming."})]}),r&&v&&(0,Sr.jsxs)(Sr.Fragment,{children:[0===T.length?(0,Sr.jsx)(pc,{children:"No RSVPs yet \u2014 be the first to lock it in."}):(0,Sr.jsx)(rc,{$overflowing:T.length>4,children:T.map(((e,t)=>{const n=t<3?String(t+1):"other";return(0,Sr.jsxs)(nc,{children:[(0,Sr.jsxs)(ic,{children:[(0,Sr.jsx)(oc,{$photo:w[e.uid]&&w[e.uid].photoURL||e.photoURL,"data-medal":t<3?String(t+1):void 0,children:!(w[e.uid]&&w[e.uid].photoURL)&&!e.photoURL&&vc(e.displayName)}),(0,Sr.jsx)(sc,{"data-medal":n,children:t+1})]}),(0,Sr.jsxs)(lc,{className:"crew-name",children:[(0,Sr.jsx)(cc,{children:e.displayName}),t<3&&e.mashes>0&&(0,Sr.jsx)(uc,{"data-medal":n,children:hc[t+1]})]}),(0,Sr.jsxs)(dc,{children:[(0,Sr.jsx)("span",{style:{fontStyle:"normal"},children:u})," ",e.mashes]})]},e.uid)}))}),I.length>0&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(fc,{type:"button","data-open":b,onClick:()=>y((e=>!e)),children:[(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)("span",{className:"chev",children:b?"\u25bc":"\u25b6"})," Bad Eggs \xb7 ",I.length]}),(0,Sr.jsx)("span",{style:{opacity:.7},children:"\ud83e\udd5a"})]}),b&&(0,Sr.jsx)(mc,{children:I.map((e=>{const t=w[e.uid]||{},n=t.displayName||e.displayName||"Anonymous masher",r=t.photoURL||e.photoURL||null;return(0,Sr.jsxs)(nc,{children:[(0,Sr.jsx)(gc,{$photo:r,children:!r&&vc(n)}),(0,Sr.jsxs)(bc,{children:[(0,Sr.jsx)("span",{style:{fontStyle:"normal",fontFamily:"sans-serif"},children:"\ud83e\udd22"})," ",n]}),(0,Sr.jsxs)(yc,{children:[(0,Sr.jsx)("span",{style:{fontStyle:"normal",fontFamily:"sans-serif"},children:u})," ",e.mashes]})]},`bad-${e.uid}`)}))})]})]})]}),c&&(0,Sr.jsx)(tc,{children:c})]})}const _c=_r`
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.4); opacity: 0.55; }
`,kc=xr.div`
  position: relative;
  background: linear-gradient(140deg, rgba(255,199,44,0.06), rgba(255,107,107,0.04));
  border: 1px solid rgba(255,199,44,0.25);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 32px rgba(255,199,44,0.12);
  backdrop-filter: blur(10px);
`,Sc=xr.div`
  position: relative;
  width: 100%;
`,Ec=xr.div`
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
`,Cc=xr.div`
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
`,Tc=xr.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 30;
  pointer-events: none;

  & > * { pointer-events: auto; }
`,Ic=xr.div`
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
`,jc=xr.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: ${_c} 1.6s infinite;

  [data-status="upcoming"] &   { background: #FFC72C; box-shadow: 0 0 8px #FFC72C; }
  [data-status="in_progress"] &{ background: #6FCF97; box-shadow: 0 0 8px #6FCF97; animation-duration: 1.2s; }
  [data-status="beers"] &      { background: #FFB155; box-shadow: 0 0 8px #FFB155; animation-duration: 2s; }
`,Pc=xr.div`
  padding: 18px 18px 14px;
  text-align: left;

  &.has-rl .event-name,
  &.has-rl .event-meta { padding-right: 92px; }

  @media (max-width: 380px) {
    &.has-rl .event-name,
    &.has-rl .event-meta { padding-right: 84px; }
  }
`,Ac=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(22px, 6vw, 28px);
  font-weight: 700;
  line-height: 1.15;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,Nc=xr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  font-weight: 500;

  span { display: inline-flex; align-items: center; gap: 6px; }
  svg { width: 14px; height: 14px; color: #FFC72C; flex-shrink: 0; }
`,Rc=xr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`,Oc=xr.span`
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
`,Dc=xr.div`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,0.78);
  margin-top: 14px;
`,Mc=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),(0,Sr.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,Sr.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,Sr.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),Lc=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,Sr.jsx)("polyline",{points:"12 6 12 12 16 14"})]}),Fc=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),(0,Sr.jsx)("circle",{cx:"12",cy:"10",r:"3"})]}),zc=xr.div`
  text-align: center;
  padding: 38px 20px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 16px;
  background: rgba(255,255,255,0.02);

  .em { font-size: 36px; margin-bottom: 8px; filter: grayscale(0.3); opacity: 0.7; }
  .head { font-family: 'Fredoka', sans-serif; font-size: 17px; font-weight: 600; color: #f4f4f4; margin-bottom: 4px; }
  .sub { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.5; }
`;function $c(e,t){if("upcoming"===t){return Xi((e.start||0)-Date.now())||Qi.upcoming}return"in_progress"===t?`Riding \xb7 ${ea(Date.now()-e.start)}`:"beers"===t?"Beers being consumed":Qi[t]||t}function Uc(e){let{event:n}=e;const[r,i]=(0,t.useState)(null),a=(0,t.useCallback)((e=>i(e)),[]),[,o]=(0,t.useState)(0);if((0,t.useEffect)((()=>{const e=setInterval((()=>o((e=>e+1))),1e3);return()=>clearInterval(e)}),[]),!n)return(0,Sr.jsxs)(zc,{children:[(0,Sr.jsx)("div",{className:"em",children:"\ud83e\udd5a"}),(0,Sr.jsx)("div",{className:"head",children:"No rides on the books"}),(0,Sr.jsx)("div",{className:"sub",children:"Check back soon \u2014 the crew schedules new rides every week."})]});const s=Ji(n),l=!!n.rideLeader;return(0,Sr.jsxs)(kc,{className:"event-shell",children:[(0,Sr.jsxs)(Sc,{children:[n.bannerUrl?(0,Sr.jsx)(Ec,{style:{backgroundImage:`url('${n.bannerUrl}')`}}):n.startLoc&&(0,Sr.jsx)(ha,{startLoc:n.startLoc,endLoc:n.endLoc}),(0,Sr.jsx)(Cc,{children:(0,Sr.jsx)(ma,{weather:r})}),(0,Sr.jsx)(Tc,{children:(0,Sr.jsxs)(Ic,{className:"event-status-chip","data-status":s,children:[(0,Sr.jsx)(jc,{}),(0,Sr.jsx)("span",{children:$c(n,s)})]})})]}),(0,Sr.jsx)(Ta,{rideLeader:n.rideLeader}),(0,Sr.jsxs)(Pc,{className:"featured-body"+(l?" has-rl":""),children:[(0,Sr.jsx)(Ac,{className:"event-name",children:n.name}),(0,Sr.jsxs)(Nc,{className:"event-meta",children:[(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(Mc,{}),ta(n.start)]}),(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(Lc,{}),na(n.start)]}),n.startLoc&&(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(Fc,{}),n.startLoc.label]})]}),(n.difficultyLabel||n.distance||n.elevation)&&(0,Sr.jsxs)(Rc,{className:"tags",children:[n.difficultyLabel&&(0,Sr.jsx)(Oc,{className:`tag diff-${n.difficulty||""}`,children:n.difficultyLabel}),n.distance&&(0,Sr.jsx)(Oc,{className:"tag",children:n.distance}),n.elevation&&(0,Sr.jsx)(Oc,{className:"tag",children:n.elevation}),n.tags&&n.tags.map(((e,t)=>(0,Sr.jsx)(Oc,{className:"tag",children:e},t)))]}),n.description&&(0,Sr.jsx)(Dc,{className:"event-desc",children:n.description}),(0,Sr.jsx)(yo,{event:n,onData:a}),(0,Sr.jsx)(Ml,{event:n,isSheetContext:!1}),(0,Sr.jsx)(wc,{event:n}),(0,Sr.jsx)(Bo,{event:n,isSheetContext:!1})]})]})}const Bc=_r`
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`,Wc=xr.div`
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
  animation: ${Bc} 0.25s cubic-bezier(.22,.61,.36,1) forwards;

  svg { width: 14px; height: 14px; color: #FFC72C; flex-shrink: 0; }
`,Hc=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),(0,Sr.jsx)("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]});let Vc=null;function qc(){const[e,n]=(0,t.useState)(!1),[r,i]=(0,t.useState)("Unlocks when it's the next ride."),o=(0,t.useRef)(null);return(0,t.useEffect)((()=>(Vc=e=>{i(e||"Unlocks when it's the next ride."),n(!1),setTimeout((()=>n(!0)),10),o.current&&clearTimeout(o.current),o.current=setTimeout((()=>n(!1)),2500)},()=>{Vc=null})),[]),e?a.createPortal((0,Sr.jsxs)(Wc,{role:"status","aria-live":"polite",children:[(0,Sr.jsx)(Hc,{}),(0,Sr.jsx)("span",{children:r})]}),document.body):null}const Gc=xr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Kc=xr.div`
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
`,Yc=xr.div`
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
`,Zc=xr.div`
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
`,Jc=xr.span`
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
`,Qc=xr.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 14px;
  height: 14px;
  color: rgba(255,255,255,0.32);
  svg { width: 14px; height: 14px; }
`,Xc=xr.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  line-height: 14px;
  filter: drop-shadow(0 0 6px rgba(255,199,44,0.6));
`,ed=xr.button`
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
`,td=xr.div`
  text-align: center;
  padding: 38px 20px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 16px;
  background: rgba(255,255,255,0.02);

  .em { font-size: 36px; margin-bottom: 8px; filter: grayscale(0.3); opacity: 0.7; }
  .head { font-family: 'Fredoka', sans-serif; font-size: 17px; font-weight: 600; color: #f4f4f4; margin-bottom: 4px; }
  .sub { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.5; }
`,nd=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),(0,Sr.jsx)("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]});function rd(e){let{events:n,onOpen:r}=e;const[i,a]=(0,t.useState)(!1);if(!n||0===n.length)return(0,Sr.jsxs)(td,{children:[(0,Sr.jsx)("div",{className:"em",children:"\ud83d\udcc5"}),(0,Sr.jsx)("div",{className:"head",children:"Nothing else on the books"}),(0,Sr.jsx)("div",{className:"sub",children:"Once the next ride drops, you'll see it here."})]});const o=i?n:n.slice(0,4),s=n.length-4;return(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(Gc,{className:"coming-list",children:o.map((e=>{const t=!!e.unlocked,n=()=>{try{(0,so.logEvent)("event_card_clicked",{eventId:e.id,locked:!t})}catch(Bt){}var n;t?r(e.id):(n="Unlocks when it's the next ride.",Vc&&Vc(n))};return(0,Sr.jsxs)(Kc,{className:"coming-card"+(t?" is-unlocked":""),onClick:n,role:t?"button":void 0,tabIndex:t?0:void 0,onKeyDown:e=>{!t||"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),n())},title:t?void 0:"Unlocks when it's the next ride.",children:[t?(0,Sr.jsx)(Xc,{"aria-label":"Unlocked \u2014 tap to open",children:"\ud83d\udd13"}):(0,Sr.jsx)(Qc,{children:(0,Sr.jsx)(nd,{})}),(0,Sr.jsxs)(Yc,{className:"date-stamp",children:[(0,Sr.jsx)("div",{className:"month",children:ia(e.start)}),(0,Sr.jsx)("div",{className:"day",children:ra(e.start)}),(0,Sr.jsx)("div",{className:"weekday",children:(i=e.start,new Intl.DateTimeFormat(void 0,{weekday:"short"}).format(new Date(i)))})]}),(0,Sr.jsxs)(Zc,{className:"info",children:[(0,Sr.jsx)("div",{className:"name",children:e.name}),(0,Sr.jsxs)("div",{className:"meta",children:[(0,Sr.jsx)("span",{children:na(e.start)}),e.startLoc&&(0,Sr.jsx)("span",{children:e.startLoc.label})]}),(e.difficultyLabel||e.distance||e.elevation||e.tags&&e.tags.length)&&(0,Sr.jsxs)("div",{className:"tags",children:[e.difficultyLabel&&(0,Sr.jsx)(Jc,{className:`diff-${e.difficulty||""}`,children:e.difficultyLabel}),e.distance&&(0,Sr.jsx)(Jc,{children:e.distance}),e.elevation&&(0,Sr.jsx)(Jc,{children:e.elevation}),e.tags&&e.tags.map(((e,t)=>(0,Sr.jsx)(Jc,{children:e},t)))]})]})]},e.id);var i}))}),s>0&&!i&&(0,Sr.jsxs)(ed,{className:"show-more",onClick:()=>a(!0),children:["Show ",s," more"]})]})}const id=xr.button`
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
`,ad=xr.svg`
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
  transform: ${e=>e.open?"rotate(180deg)":"rotate(0deg)"};
`,od=xr.div`
  margin-top: 8px;
  display: ${e=>e.open?"block":"none"};
`,sd=xr.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid rgba(255,255,255,0.10);
  font-size: 13px;

  &:first-child { border-top-left-radius: 12px; border-top-right-radius: 12px; }
  &:last-child  { border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
`,ld=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.32);
  width: 70px;
  flex-shrink: 0;
`,cd=xr.div`
  flex: 1;
  color: #f4f4f4;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,dd=xr.div`
  font-size: 12px;
  color: #FF6B6B;
  font-weight: 600;
  flex-shrink: 0;
`;function ud(e){let{events:n}=e;const[r,i]=(0,t.useState)(!1);if(!n||0===n.length)return null;const a=n.slice(0,10);return(0,Sr.jsxs)("div",{children:[(0,Sr.jsxs)(id,{className:"archive-toggle","aria-expanded":r,onClick:()=>i((e=>!e)),children:[(0,Sr.jsx)("span",{children:"Past rides"}),(0,Sr.jsx)(ad,{open:r,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,Sr.jsx)("polyline",{points:"6 9 12 15 18 9"})})]}),(0,Sr.jsx)(od,{open:r,children:a.map((e=>(0,Sr.jsxs)(sd,{className:"archive-card",children:[(0,Sr.jsxs)(ld,{className:"arch-date",children:[ia(e.start)," ",ra(e.start)]}),(0,Sr.jsx)(cd,{className:"arch-name",children:e.name}),(0,Sr.jsxs)(dd,{className:"arch-kudos",children:[aa(e.hotdogs||e.finalKudos||0)," \ud83c\udf2d"]})]},e.id)))})]})}const hd=_r`from { opacity: 0; } to { opacity: 1; }`,pd=_r`from { transform: translateY(100%); } to { transform: translateY(0); }`,fd=xr.div`
  position: fixed;
  inset: 0;
  z-index: 2100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`,md=xr.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  pointer-events: auto;
  animation: ${hd} 0.2s ease;
`,gd=xr.div`
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
  animation: ${pd} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.55);
`,bd=xr.button`
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
`,yd=xr.button`
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
`,vd=xr.div`
  position: relative;
  width: 100%;
`,xd=xr.div`
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
`,wd=xr.div`
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
`,_d=xr.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 30;
  pointer-events: none;
  & > * { pointer-events: auto; }
`,kd=_r`
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.4); opacity: 0.55; }
`,Sd=xr.div`
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
`,Ed=xr.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: ${kd} 1.6s infinite;

  [data-status="upcoming"] &   { background: #FFC72C; box-shadow: 0 0 8px #FFC72C; }
  [data-status="in_progress"] &{ background: #6FCF97; box-shadow: 0 0 8px #6FCF97; animation-duration: 1.2s; }
  [data-status="beers"] &      { background: #FFB155; box-shadow: 0 0 8px #FFB155; animation-duration: 2s; }
`;function Cd(e,t){if("upcoming"===t){return Xi((e.start||0)-Date.now())||Qi.upcoming}return"in_progress"===t?`Riding \xb7 ${ea(Date.now()-e.start)}`:"beers"===t?"Beers being consumed":Qi[t]||t}const Td=xr.div`
  padding: 18px 18px 14px;

  &.has-rl .event-name,
  &.has-rl .event-meta { padding-right: 92px; }

  @media (max-width: 380px) {
    &.has-rl .event-name,
    &.has-rl .event-meta { padding-right: 84px; }
  }
`,Id=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(22px, 6vw, 28px);
  font-weight: 700;
  line-height: 1.15;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,jd=xr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  font-weight: 500;

  span { display: inline-flex; align-items: center; gap: 6px; }
  svg { width: 14px; height: 14px; color: #FFC72C; flex-shrink: 0; }
`,Pd=xr.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`,Ad=xr.span`
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
`,Nd=xr.div`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,0.78);
  margin-top: 14px;
`,Rd=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),(0,Sr.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,Sr.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,Sr.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),Od=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,Sr.jsx)("polyline",{points:"12 6 12 12 16 14"})]}),Dd=()=>(0,Sr.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Sr.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),(0,Sr.jsx)("circle",{cx:"12",cy:"10",r:"3"})]});function Md(e){let{event:n,onClose:r}=e;const i=!!n.rideLeader,[a,o]=(0,t.useState)(null),s=(0,t.useCallback)((e=>o(e)),[]),[,l]=(0,t.useState)(0);return(0,t.useEffect)((()=>{const e=setInterval((()=>l((e=>e+1))),1e3);return()=>clearInterval(e)}),[]),(0,t.useEffect)((()=>{document.body.dataset.sheetOpen="1";const e=Date.now();n&&n.id&&(0,so.logEvent)("event_sheet_opened",{eventId:n.id});const t=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{delete document.body.dataset.sheetOpen,document.body.style.overflow=t;try{n&&n.id&&(0,so.logEvent)("event_sheet_closed",{eventId:n.id,dwellMs:Date.now()-e})}catch(Bt){}}}),[]),(0,Sr.jsxs)(fd,{children:[(0,Sr.jsx)(md,{onClick:r}),(0,Sr.jsxs)(gd,{className:"event-shell",onClick:e=>e.stopPropagation(),children:[(0,Sr.jsx)(bd,{type:"button","aria-label":"Close",onClick:r,children:"\xd7"}),(0,Sr.jsx)(yd,{type:"button",onClick:r,"aria-label":"Close panel"}),(0,Sr.jsxs)(vd,{children:[n.bannerUrl?(0,Sr.jsx)(xd,{style:{backgroundImage:`url('${n.bannerUrl}')`}}):n.startLoc&&(0,Sr.jsx)(ha,{startLoc:n.startLoc,endLoc:n.endLoc}),(0,Sr.jsx)(wd,{children:(0,Sr.jsx)(ma,{weather:a})}),(0,Sr.jsx)(_d,{children:(0,Sr.jsxs)(Sd,{"data-status":Ji(n),children:[(0,Sr.jsx)(Ed,{}),(0,Sr.jsx)("span",{children:Cd(n,Ji(n))})]})})]}),(0,Sr.jsx)(Ta,{rideLeader:n.rideLeader}),(0,Sr.jsxs)(Td,{className:"featured-body"+(i?" has-rl":""),children:[(0,Sr.jsx)(Id,{className:"event-name",children:n.name}),(0,Sr.jsxs)(jd,{className:"event-meta",children:[(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(Rd,{}),ta(n.start)]}),(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(Od,{}),na(n.start)]}),n.startLoc&&(0,Sr.jsxs)("span",{children:[(0,Sr.jsx)(Dd,{}),n.startLoc.label]})]}),(n.difficultyLabel||n.distance||n.elevation)&&(0,Sr.jsxs)(Pd,{className:"tags",children:[n.difficultyLabel&&(0,Sr.jsx)(Ad,{className:`tag diff-${n.difficulty||""}`,children:n.difficultyLabel}),n.distance&&(0,Sr.jsx)(Ad,{className:"tag",children:n.distance}),n.elevation&&(0,Sr.jsx)(Ad,{className:"tag",children:n.elevation}),n.tags&&n.tags.map(((e,t)=>(0,Sr.jsx)(Ad,{className:"tag",children:e},t)))]}),n.description&&(0,Sr.jsx)(Nd,{className:"event-desc",children:n.description}),(0,Sr.jsx)(yo,{event:n,onData:s}),(0,Sr.jsx)(wc,{event:n}),(0,Sr.jsx)(Bo,{event:n,isSheetContext:!0})]})]})]})}function Ld(e){let{eventId:t,events:n,onClose:r}=e;const i=n&&n.find((e=>e.id===t));return i?a.createPortal((0,Sr.jsx)(Md,{event:i,onClose:r}),document.body):null}const Fd=xr.div`
  position: fixed;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  z-index: 9050;
  pointer-events: none;
  width: min(92vw, 720px);
  max-width: min(92vw, 720px);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  /* Hide while the save/burn flow is running so the burn message isn't
     covered by leftover mini-game status text. KudosCta sets data-mash-
     phase on body during saving/burning. */
  body[data-mash-phase="saving"] &,
  body[data-mash-phase="burning"] & {
    display: none;
  }
`,zd=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: clamp(28px, 9vw, 80px);
  line-height: 1.05;
  letter-spacing: 0.02em;
  color: var(--game-accent, #fff);
  text-shadow:
    0 0 20px rgba(0,0,0,0.85),
    0 0 40px rgba(0,0,0,0.7),
    0 4px 14px rgba(0,0,0,0.95);
  white-space: pre-line;
  text-wrap: balance;
  animation: gameStatusIn 0.3s cubic-bezier(.22,.61,.36,1);
  will-change: transform, opacity;

  &[data-kind="countdown"] {
    font-size: clamp(64px, 22vw, 200px);
    color: #FFE66D;
    text-shadow:
      0 0 32px rgba(255,199,44,0.8),
      0 0 64px rgba(255,107,107,0.6),
      0 6px 20px rgba(0,0,0,0.9);
  }

  @keyframes gameStatusIn {
    0%   { opacity: 0; transform: scale(0.7); }
    60%  { opacity: 1; transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }
`,$d=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: clamp(18px, 5vw, 32px);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  opacity: 0.9;
  text-shadow: 0 2px 10px rgba(0,0,0,0.8);
`;function Ud(){const e=Zs().resolved;if(!e)return null;const t=e.statusText,n=e.subStatus;return t||n?(0,Sr.jsxs)(Fd,{"aria-live":"polite",children:[t&&(0,Sr.jsx)(zd,{"data-kind":e.phaseKind,className:"game-status-text",children:t},t),n&&(0,Sr.jsx)($d,{className:"game-status-sub",children:n},n)]}):null}const Bd=xr.div`
  position: fixed;
  z-index: 9050;
  pointer-events: none;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  /* Doubled (was clamp(20, 4.5vw, 32)) per design pass — readable on mobile
     and dominant on desktop without crowding the status zone. */
  font-size: clamp(40px, 9vw, 64px);
  line-height: 1;
  letter-spacing: 0.04em;
  color: #fff;
  text-shadow:
    0 0 16px rgba(0, 0, 0, 0.9),
    0 0 32px rgba(0, 0, 0, 0.75),
    0 3px 12px rgba(0, 0, 0, 0.95);
  padding: 12px 18px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transform-origin: center;
  will-change: transform, color;

  &[data-position="top-left"] {
    top: 16px;
    left: 16px;
  }
  &[data-position="center"] {
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: top center;
  }

  &.is-final {
    color: var(--game-accent, #FF4747);
    animation: timerPulse 1s ease-in-out infinite;
  }

  &[data-position="center"].is-final {
    animation: timerPulseCenter 1s ease-in-out infinite;
  }

  @keyframes timerPulse {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.08); }
  }

  @keyframes timerPulseCenter {
    0%, 100% { transform: translateX(-50%) scale(1); }
    50%      { transform: translateX(-50%) scale(1.08); }
  }

  /* Hide during save/burn flow to mirror GameStatus behavior. */
  body[data-mash-phase="saving"] &,
  body[data-mash-phase="burning"] & {
    display: none;
  }
`;function Wd(e){const t=Math.max(0,Math.ceil(e/1e3));if(t>60){const e=Math.floor(t/60),n=t%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`}return`${t}s`}function Hd(){const e=Zs();let n=!1,r=0,i=0,a="top-left",o="";if(e.active){const t=e.schedule[e.active.miniGameIdx],s=t&&t.phases[e.active.phaseIndex];if(s&&"play"===s.kind&&s.timeout&&"ms"===s.timeout.kind&&s.config&&s.config.showTimer){n=!0,r=e.active.phaseStartedAtMs||0,i=s.timeout.value;const t=s.config.showTimer;t&&"object"===typeof t&&"center"===t.position&&(a="center"),o=`${e.active.miniGameIdx}.${e.active.phaseIndex}`}}const[s,l]=(0,t.useState)(i),c=(0,t.useRef)(0),d=(0,t.useRef)(-1);if((0,t.useEffect)((()=>{if(!n)return l(0),void(d.current=-1);const e=r,t=i;l(t),d.current=Math.ceil(t/1e3);const a=()=>{const n=Date.now()-e,r=Math.max(0,Math.min(t,t-n)),i=Math.ceil(r/1e3),o=r<=3e3;i!==d.current?(d.current=i,l(r)):o&&r<100&&l(r),r>0&&(c.current=requestAnimationFrame(a))};return c.current=requestAnimationFrame(a),()=>{c.current&&cancelAnimationFrame(c.current),c.current=0}}),[n,o,r,i]),!n)return null;const u=s<=3e3;return(0,Sr.jsx)(Bd,{"data-position":a,className:u?"is-final":"","aria-hidden":"true",children:Wd(s)})}const Vd=xr.div`
  position: fixed;
  top: calc(16px + env(safe-area-inset-top, 0px));
  right: calc(16px + env(safe-area-inset-right, 0px));
  z-index: 9050;
  pointer-events: none;
  font-family: 'Fredoka', sans-serif;
  font-variant-numeric: tabular-nums;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.38);
  border-radius: 10px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  text-shadow:
    0 0 12px rgba(0, 0, 0, 0.85),
    0 2px 8px rgba(0, 0, 0, 0.9);
  min-width: 120px;
  text-align: right;

  body[data-mash-phase="saving"] &,
  body[data-mash-phase="burning"] & {
    display: none;
  }
`,qd=xr.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  line-height: 1;
`,Gd=xr.span`
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
`,Kd=xr.span`
  font-weight: 700;
  font-size: 22px;
  color: ${e=>e.color||"#fff"};

  &[data-tier="all-time"] {
    color: #FFE66D;
    text-shadow:
      0 0 10px rgba(255, 199, 44, 0.6),
      0 2px 8px rgba(0, 0, 0, 0.9);
  }
  &[data-tier="session"] {
    color: #FFB347;
  }
  /* Top score across ALL users — the score-to-beat. Brightest treatment;
     subtle pulse glow when the active user is the one holding the crown. */
  &[data-tier="top"] {
    color: #FFD700;
    font-size: 26px;
    text-shadow:
      0 0 14px rgba(255, 215, 0, 0.85),
      0 0 28px rgba(255, 140, 0, 0.55),
      0 3px 10px rgba(0, 0, 0, 0.95);
  }
  &[data-tier="top"][data-yours="1"] {
    animation: hsCrownPulse 2.2s ease-in-out infinite;
  }
  @keyframes hsCrownPulse {
    0%, 100% { filter: drop-shadow(0 0 0 rgba(255,215,0,0)); }
    50%      { filter: drop-shadow(0 0 8px rgba(255,215,0,0.85)); }
  }
`;function Yd(){const{current:e,cumulative:t,globalBest:n,isHoldingGlobal:r,uid:i}=vl();return!e||e<=0?null:(0,Sr.jsxs)(Vd,{"aria-hidden":"true",children:[(0,Sr.jsxs)(qd,{children:[(0,Sr.jsx)(Gd,{children:"High Score"}),(0,Sr.jsx)(Kd,{"data-tier":"top","data-yours":r?"1":"0",title:r?"It's yours \u2014 for now.":"Top score across all crew",children:"number"===typeof n&&n>0?aa(n):"\u2014"})]}),(0,Sr.jsxs)(qd,{children:[(0,Sr.jsx)(Gd,{children:"PR"}),(0,Sr.jsx)(Kd,{"data-tier":"all-time",children:i&&"number"===typeof t?aa(t):"\u2014"})]}),(0,Sr.jsxs)(qd,{children:[(0,Sr.jsx)(Gd,{children:"Now"}),(0,Sr.jsx)(Kd,{children:aa(e)})]})]})}const Zd=_r`
  0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`,Jd=_r`
  0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1.08); }
`,Qd=_r`
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`,Xd=xr.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9070;
  pointer-events: none;
  text-align: center;
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  white-space: nowrap;
  ${e=>"in"===e.phase&&br`
    animation: ${Zd} 200ms cubic-bezier(.22,.61,.36,1) forwards;
  `}
  ${e=>"hold"===e.phase&&br`
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  `}
  ${e=>"out"===e.phase&&br`
    animation: ${Jd} 400ms ease-out forwards;
  `}
`,eu=xr.div`
  font-size: clamp(36px, 10vw, 96px);
  letter-spacing: 0.04em;
  line-height: 1;
  text-shadow:
    0 0 28px rgba(0, 0, 0, 0.85),
    0 0 56px rgba(0, 0, 0, 0.7),
    0 6px 18px rgba(0, 0, 0, 0.95);

  &[data-tier="session"] {
    color: #FFD700;
    text-shadow:
      0 0 24px rgba(255, 215, 0, 0.85),
      0 0 48px rgba(255, 140, 0, 0.6),
      0 6px 18px rgba(0, 0, 0, 0.95);
  }

  &[data-tier="all-time"] {
    color: #fff;
    background: linear-gradient(
      90deg,
      #FF4747 0%, #FFC72C 25%, #4CD964 50%, #2EC4FF 75%, #FF4DB6 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${Qd} 1.2s linear infinite;
  }
`,tu=xr.div`
  margin-top: 10px;
  font-size: clamp(14px, 3.4vw, 22px);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fff;
  text-shadow:
    0 0 14px rgba(0, 0, 0, 0.85),
    0 2px 8px rgba(0, 0, 0, 0.9);
  opacity: 0.95;

  &[data-tier="all-time"] {
    color: #FFE66D;
  }
`,nu=200;function ru(){const{current:e,cumulative:n,sessionActive:r}=vl(),i=(0,t.useRef)(!1),[a,o]=(0,t.useState)(null),s=(0,t.useRef)([]),l=()=>{s.current.forEach((e=>clearTimeout(e))),s.current=[]};if((0,t.useEffect)((()=>{r&&0!==e||(i.current=!1)}),[r,e]),(0,t.useEffect)((()=>{e<=0||!r||!i.current&&"number"===typeof n&&n>0&&e>n&&(i.current=!0,function(e){l();const t=Date.now()+":"+e;o({tier:e,phase:"in",token:t}),s.current.push(setTimeout((()=>{o((e=>e&&e.token===t?{...e,phase:"hold"}:e))}),nu)),s.current.push(setTimeout((()=>{o((e=>e&&e.token===t?{...e,phase:"out"}:e))}),1800)),s.current.push(setTimeout((()=>{o((e=>e&&e.token===t?null:e))}),2200))}("all-time"))}),[e,r,n]),(0,t.useEffect)((()=>()=>l()),[]),!a)return null;const{tier:c,phase:d,token:u}=a;return(0,Sr.jsxs)(Xd,{phase:d,"aria-hidden":"true",children:[(0,Sr.jsx)(eu,{"data-tier":c,children:"NEW PR"}),(0,Sr.jsx)(tu,{"data-tier":c,children:"Personal best for this event"})]},u)}const iu={id:"golden-egg",label:"Golden Egg",startAtPress:50,rules:{canLose:!1,onWin:{bonus:0},onLose:{bonus:0}},ambient:{challengeText:"frozen",bubbleText:"off"},presentation:{accentColor:"#FFD700"},backgroundMusic:{filePath:"/audio/minigames/golden-egg.mp3",volume:.7},phases:[{kind:"status",text:"GOLDEN EGG",presses:5},{kind:"status",text:"TAP THE GOLDEN EGG\nBUT KEEP MASHING",presses:5},{kind:"play",mode:"goldenEgg",timeout:{kind:"ms",value:1e4,outcome:"win"},overrides:{mashing:"normal",button:"visible",gameClock:"run"},ambient:{flyingEmojis:"off",bubbleText:"off",challengeText:"frozen"},config:{reward:25,sizePx:162,flightDurMs:[4284,5796],showTimer:!0}},{kind:"status",text:"GOOD JOB",ms:2500}]},au={id:"mash-gauntlet",label:"Mash Gauntlet",startAtPress:50,rules:{canLose:!0,onWin:{bonus:100},onLose:{bonus:-30,endsMashSession:!0}},ambient:{challengeText:"frozen",bubbleText:"off"},presentation:{accentColor:"#FF6B6B"},backgroundMusic:{filePath:"/audio/minigames/mash-gauntlet.mp3",volume:.7},phases:[{kind:"status",text:"MASH GAUNTLET",presses:5},{kind:"status",text:"MASH FAST OR DIE\n5 SECONDS",presses:5},{kind:"play",mode:"thresholdMash",timeout:{kind:"ms",value:5e3,outcome:"lose"},overrides:{mashing:"normal",button:"visible",gameClock:"run"},ambient:{flyingEmojis:"on",bubbleText:"on",challengeText:"frozen"},config:{target:25,showTimer:!0}},{kind:"status",text:e=>{let{outcome:t}=e;return"win"===t?"YOU SURVIVED.\n+100":"FAILED."},ms:2500}]},ou={id:"twilight",label:"Twilight",startAtPress:50,rules:{canLose:!1,onWin:{bonus:0},onLose:{bonus:0}},ambient:{challengeText:"frozen",bubbleText:"off"},presentation:{},backgroundMusic:{filePath:"/audio/minigames/twilight.mp3",volume:.7},phases:[{kind:"status",text:"COLD BEERS",presses:5},{kind:"status",text:"TAP THE BEERS\nKEEP MASHING",presses:5},{kind:"play",mode:"twilight",timeout:{kind:"ms",value:1e4,outcome:"win"},overrides:{mashing:"normal",button:"visible",gameClock:"run"},ambient:{flyingEmojis:"off",bubbleText:"off",challengeText:"frozen"},presentation:{bodyBackground:"#040515"},config:{showTimer:!0}},{kind:"status",text:"WELL DONE.",ms:2500}]},su={id:"dodge",label:"Dodge",startAtPress:50,rules:{canLose:!0,onWin:{bonus:75},onLose:{bonus:0,endsMashSession:!0}},ambient:{challengeText:"frozen",bubbleText:"off"},presentation:{accentColor:"#FFB3D9"},input:{dragHold:"on"},backgroundMusic:{filePath:"/audio/minigames/dodge.mp3",volume:.7},phases:[{kind:"status",text:"DODGE\nINCOMING",presses:5},{kind:"status",text:"PROTECT THE BIKER\nDRAG TO SAFETY",presses:5},{kind:"play",mode:"pigDodge",timeout:{kind:"ms",value:1e4,outcome:"win"},overrides:{mashing:"paused",button:"draggable",gameClock:"run"},ambient:{flyingEmojis:"off",bubbleText:"off",heartbeat:"off",flash:"off"},config:{obstacleSize:40,gravity:280,thrust:220,maxSpeed:320,spawnEveryMs:1600,maxConcurrent:3,initialSpawnCount:2,showTimer:!0,statusText:"DODGE THE CARS",obstacleEmojis:["\ud83d\ude97","\ud83d\ude95","\ud83d\ude99","\ud83d\ude9a","\ud83c\udfce\ufe0f"],avatar:{emoji:"\ud83d\udeb4\ud83c\udfff\u200d\u2640\ufe0f",sizePx:44,pulse:!0}}},{kind:"status",text:e=>{let{outcome:t}=e;return"win"===t?"+75 SURVIVED.\nSTART MASHING.":"FAILURE."},ms:2400,ambient:{heartbeat:"on",flash:"on"}}]},lu={id:"pong",label:"Pong",startAtPress:50,rules:{canLose:!0,onWin:{bonus:0},onLose:{bonus:0,endsMashSession:!0}},ambient:{challengeText:"frozen",bubbleText:"off"},presentation:{accentColor:"#E8FF6B"},input:{dragHold:"on"},backgroundMusic:{filePath:"/audio/minigames/pong.mp3",volume:.7},phases:[{kind:"status",text:"PONG",presses:5},{kind:"status",text:"KEEP THE BALL ALIVE\nDRAG THE BUTTON",presses:5},{kind:"play",mode:"pong",timeout:{kind:"ms",value:1e4,outcome:"win"},overrides:{mashing:"paused",button:"draggable",gameClock:"run",dragAxis:"horizontal"},ambient:{flyingEmojis:"off",bubbleText:"off",heartbeat:"off",flash:"off"},config:{showTimer:!0}},{kind:"status",text:e=>{let{outcome:t,score:n}=e;return"win"===t?`${n||0} HITS. NICE.`:"FAILURE."},ms:2400,ambient:{heartbeat:"on",flash:"on"}}]},cu={id:"preamble",label:"Preamble",startAtPress:25,rules:{canLose:!1,onWin:{bonus:0},onLose:{bonus:0}},ambient:{challengeText:"frozen",bubbleText:"off"},phases:[{kind:"status",text:"MINI GAMES APPROACHING\nDON'T STOP MASHING THE BUTTON",presses:5}]},du=[iu,au,ou,su,lu];const uu=25,hu=30,pu=10;function fu(){let{preamble:e=cu,pool:t=du,gapPresses:n=pu,warningAtPress:r=uu,firstGameAtPress:i=hu}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=0;const o=new Map;let s=[];const l=()=>(0===s.length&&(s=function(e){const t=[...e];for(let n=t.length-1;n>0;n--){const e=Math.floor(Math.random()*(n+1));[t[n],t[e]]=[t[e],t[n]]}return t}(t)),s.pop());return{next(t){let s,c;if(0===a?(s=e,c=r):1===a?(s=l(),c=i):(s=l(),c=t+n),a++,1===a)return{...s,startAtPress:c};const d=o.get(s.id)||0;o.set(s.id,d+1);const u=function(e,t){if(!t||t<=0)return e;const n=e.phases.map((n=>{if("play"!==n.kind)return n;const r={...n.config||{}};switch(e.id){case"golden-egg":{const e=Math.pow(.95,t);Array.isArray(r.flightDurMs)&&(r.flightDurMs=[Math.max(50,Math.round(r.flightDurMs[0]*e)),Math.max(50,Math.round(r.flightDurMs[1]*e))]);break}case"twilight":r.speedMult=Math.pow(1.05,t);break;case"mash-gauntlet":{const e="number"===typeof r.target?r.target:25;r.target=e+5*t;break}case"dodge":{const e="number"===typeof r.maxConcurrent?r.maxConcurrent:3;r.maxConcurrent=e+2*t;const n="number"===typeof r.initialSpawnCount?r.initialSpawnCount:2;r.initialSpawnCount=n+2*t;break}case"pong":r.baseSpeedMult=Math.pow(1.1,t)}const i=n.timeout&&n.timeout.value?n.timeout.value:1e4,a="dodge"===e.id||"pong"===e.id?{...n.timeout,value:i+5e3*t}:n.timeout;return{...n,config:r,timeout:a}}));return{...e,phases:n}}(s,d);return{...u,startAtPress:c}},reset(){a=0,s=[],o.clear()}}}function mu(){return fu({preamble:cu,pool:du,gapPresses:pu,warningAtPress:uu,firstGameAtPress:hu})}const gu="sl_dev_minigame_choice",bu="sl_dev_panel_open";xr.button`
  position: fixed;
  right: 0;
  top: 35%;
  z-index: 9300;
  width: 24px;
  height: 56px;
  border: none;
  border-radius: 8px 0 0 8px;
  background: rgba(20,20,28,0.85);
  color: #FFC72C;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: -2px 2px 10px rgba(0,0,0,0.4);
  user-select: none;
`,xr.div`
  position: fixed;
  right: 0;
  top: 30%;
  z-index: 9300;
  background: rgba(15,15,22,0.94);
  border: 1px solid rgba(255,199,44,0.35);
  border-right: none;
  border-radius: 12px 0 0 12px;
  padding: 12px 14px;
  box-shadow: -4px 4px 18px rgba(0,0,0,0.55);
  font-family: 'Inter', sans-serif;
  color: #f4f4f4;
  min-width: 180px;
`,xr.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #FFC72C;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,xr.button`
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  padding: 0 4px;
`,xr.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 4px;
  cursor: pointer;
  font-size: 13px;
  color: ${e=>e.$active?"#FFE66D":"#ccc"};
  font-weight: ${e=>e.$active?"700":"400"};

  input { accent-color: #FFC72C; cursor: pointer; }
`,xr.button`
  margin-top: 10px;
  width: 100%;
  background: rgba(255,107,107,0.18);
  border: 1px solid rgba(255,107,107,0.5);
  color: #ff9b9b;
  padding: 6px 10px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
`;function yu(){const[e,n]=(0,t.useState)((()=>{try{return"1"===localStorage.getItem(bu)}catch(Bt){return!1}})),[r,i]=(0,t.useState)((()=>{try{return localStorage.getItem(gu)||"auto"}catch(Bt){return"auto"}}));return(0,t.useEffect)((()=>{}),[r]),(0,t.useEffect)((()=>{try{localStorage.setItem(bu,e?"1":"0")}catch(Bt){}}),[e]),null}const vu=xr.section`
  width: 100%;
  max-width: 560px;
  margin: 0 auto 30px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`,xu=xr.div`
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
`;function wu(){return(0,t.useEffect)((()=>{let e=document.getElementById("mash-vignette");e||(e=document.createElement("div"),e.id="mash-vignette",e.className="mash-vignette",document.body.appendChild(e));let t=document.getElementById("mash-flash");t||(t=document.createElement("div"),t.id="mash-flash",t.className="mash-flash",document.body.appendChild(t));let n=document.getElementById("mash-canvas");return n||(n=document.createElement("div"),n.id="mash-canvas",n.className="mash-canvas",document.body.appendChild(n)),()=>{}}),[]),null}function _u(){const{eventId:e}=te(),{events:n}=Gi(),{openEventId:r,openSheet:i,closeSheet:a}=function(e){const[n,r]=(0,t.useState)(e||null),i=ee();(0,t.useEffect)((()=>{r(e||null)}),[e]);const a=(0,t.useCallback)((e=>{r(e),i(`/events/${e}`,{replace:!1})}),[i]),o=(0,t.useCallback)((()=>{r(null),i("/",{replace:!1})}),[i]);return(0,t.useEffect)((()=>{const e=e=>{"Escape"===e.key&&n&&o()};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),[n,o]),{openEventId:n,openSheet:a,closeSheet:o}}(e||null),[,o]=(0,t.useState)(0);(0,t.useEffect)((()=>{const e=setInterval((()=>o((e=>e+1))),1e3);return()=>clearInterval(e)}),[]),(0,t.useEffect)((()=>(0===Ys.getState().schedule.length&&Ys.setSchedule({strategy:mu()}),()=>{try{Ys.reset(),Ys.setSchedule([])}catch(Bt){}})),[]);const s=Math.floor(Date.now()/6e4),{upcoming:l,past:c}=(0,t.useMemo)((()=>function(e){const t=e.filter((e=>"archived"!==Ji(e))).sort(((e,t)=>e.start-t.start)),n=e.filter((e=>"archived"===Ji(e))).sort(((e,t)=>t.start-e.start)).slice(0,10);return{upcoming:t,past:n}}(n)),[n,s]),d=l[0]||null,u=l.slice(1);return(0,Sr.jsxs)(vu,{className:"cal-section",children:[(0,Sr.jsxs)("div",{id:"featured-section",children:[(0,Sr.jsx)(xu,{className:"cal-section-label",children:"Up Next"}),(0,Sr.jsx)(Uc,{event:d})]}),(u.length>0||0===l.length)&&(0,Sr.jsxs)("div",{id:"coming-section",children:[(0,Sr.jsx)(xu,{className:"cal-section-label",children:"Coming Up"}),(0,Sr.jsx)(rd,{events:u,onOpen:i})]}),c.length>0&&(0,Sr.jsx)("div",{id:"archive-section",children:(0,Sr.jsx)(ud,{events:c})}),r&&(0,Sr.jsx)(Ld,{eventId:r,events:n,onClose:a}),(0,Sr.jsx)(qc,{}),(0,Sr.jsx)(wu,{}),(0,Sr.jsx)(Ud,{}),(0,Sr.jsx)(Hd,{}),(0,Sr.jsx)(Yd,{}),(0,Sr.jsx)(ru,{}),(0,Sr.jsx)(yu,{})]})}const ku="sl_home_view_logged",Su=_r`
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
`,Eu=xr.div`
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
`,Cu=xr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
`,Tu=xr.img`
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
`,Iu=xr.h2`
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
`,ju=(xr.p`
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
  animation: ${Su} ${e=>e.duration||"20s"} ease-in-out infinite;
  animation-delay: ${e=>e.delay||"0s"};
  transform-origin: center;
  
  @media (max-width: 768px) {
    font-size: calc(${e=>e.size||"36px"} * 0.8);
  }
  
  @media (max-width: 480px) {
    font-size: calc(${e=>e.size||"36px"} * 0.7);
  }
`),Pu=xr.div`
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
`,Au=xr.h2`
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
`,Nu=xr.p`
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
`,Ru=xr.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`,Ou=xr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Du=xr.label`
  color: #FFC72C;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`,Mu=xr.input`
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
`,Lu=xr.button`
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
`,Fu=xr.div`
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
`;const zu=function(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)(""),[a,o]=(0,t.useState)(""),[s,l]=(0,t.useState)(""),[c,d]=(0,t.useState)(""),[u,h]=(0,t.useState)(!1),[p,f]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{(()=>{if(!document.getElementById("montserrat-font")){const e=document.createElement("link");e.id="montserrat-font",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap",document.head.appendChild(e)}})();const e=()=>{const e=window.innerWidth;return e<=480?3:e<=768?4:6},t=[],r=e();for(let n=0;n<r;n++)t.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.15,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:10*Math.random()+15+"s",delay:`-${10*Math.random()}s`});n(t);const i=()=>{const r=e();if(r!==t.length){const e=[];for(let n=0;n<r;n++)n<t.length?e.push(t[n]):e.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.1,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:60*Math.random()+30+"s",delay:`-${30*Math.random()}s`});n(e)}};window.addEventListener("resize",i),async function(){if(qr)return;qr=!0;const e=await(0,Nr.Oe)();e&&(0,Pr.xD)(e,(e=>{if("undefined"===typeof Notification||"granted"!==Notification.permission)return;const t=e.data||{},n=e.notification&&e.notification.title||t.title||"Scrambled Legs",r=e.notification&&e.notification.body||t.body||"",i=t.tag||"sl-foreground";try{navigator.serviceWorker.ready.then((e=>e.showNotification(n,{body:r,icon:Mr,badge:Mr,tag:i,renotify:!0,data:{clickUrl:t.clickUrl||"https://thescrambledlegs.com/",notifId:t.notifId||""}}))).catch((()=>{try{new Notification(n,{body:r,icon:Mr,tag:i})}catch(vy){}}))}catch(vy){}}))}();try{sessionStorage.getItem(ku)||(sessionStorage.setItem(ku,"1"),(0,so.logEvent)("home_view",{}))}catch(Bt){(0,so.logEvent)("home_view",{})}return()=>window.removeEventListener("resize",i)}),[]),(0,Sr.jsxs)(Eu,{children:[e.map((e=>(0,Sr.jsx)(ju,{size:e.size,opacity:e.opacity,top:e.top,left:e.left,duration:e.duration,delay:e.delay,children:e.emoji},e.id))),(0,Sr.jsxs)(Cu,{className:"home-content",children:[(0,Sr.jsx)(Tu,{src:"/assets/cogg white shadow.png",alt:"Scrambled Legs Logo"}),(0,Sr.jsx)(Iu,{children:"DULUTH'S PREMIER RACE TEAM"}),(0,Sr.jsx)(_u,{}),(0,Sr.jsxs)(Pu,{children:[(0,Sr.jsx)(Au,{children:"JOIN THE SCRAMBLED LEGS"}),(0,Sr.jsx)(Nu,{children:"An elite team of average athletes"}),p?(0,Sr.jsxs)(Fu,{children:[(0,Sr.jsx)("h3",{children:"Egg-cellent!"}),(0,Sr.jsx)("p",{children:"You're officially part of the scramble! We'll keep you updated on all our egg-citing adventures."})]}):(0,Sr.jsxs)(Ru,{onSubmit:async e=>{if(e.preventDefault(),d(""),!r.trim()||!a.trim()||!s)return void d("Please fill in all fields.");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a))if(s.length<6)d("Password must be at least 6 characters.");else{h(!0);try{const e=a.trim(),c=r.trim(),u=(0,Ar.ref)(Nr.OO,"newsletterRegistrants"),h=(0,Ar.VC)(u);await(0,Ar.hZ)(h,{name:c,email:e,timestamp:Date.now()}),(0,so.logEvent)("newsletter_signup",{email:e});try{const t=await Yo(e,s);try{await(0,Ar.hZ)((0,Ar.ref)(Nr.OO,`userProfiles/${t.uid}/displayName`),c)}catch(Bt){}}catch(t){if(!t||"auth/email-already-in-use"!==t.code)return void d(es(t&&t.code));try{await Zo(e,s)}catch(n){return void d("That email already has an account but the password didn't match. Use the cog (top-right) to sign in or reset your password.")}}f(!0),i(""),o(""),l("")}catch(c){console.error("Error submitting form:",c),d("Something went wrong. Please try again later.")}finally{h(!1)}}else d("Please enter a valid email address.")},children:[(0,Sr.jsxs)(Ou,{children:[(0,Sr.jsx)(Du,{htmlFor:"name",children:"Name"}),(0,Sr.jsx)(Mu,{id:"name",type:"text",value:r,onChange:e=>i(e.target.value),placeholder:"Your name",required:!0})]}),(0,Sr.jsxs)(Ou,{children:[(0,Sr.jsx)(Du,{htmlFor:"email",children:"Email"}),(0,Sr.jsx)(Mu,{id:"email",type:"email",value:a,onChange:e=>o(e.target.value),placeholder:"Your email address",autoComplete:"email",required:!0})]}),r.trim()&&a.trim()&&(0,Sr.jsxs)(Ou,{children:[(0,Sr.jsx)(Du,{htmlFor:"password",children:"Gotcha \u2014 now choose a password"}),(0,Sr.jsx)(Mu,{id:"password",type:"password",value:s,onChange:e=>l(e.target.value),placeholder:"6+ characters",autoComplete:"new-password",required:!0,minLength:6})]}),c&&(0,Sr.jsx)("div",{style:{color:"#FF8E8E",fontSize:13,marginTop:-4,marginBottom:8,textAlign:"center"},children:c}),(0,Sr.jsx)(Lu,{type:"submit",disabled:u,children:u?"Creating account\u2026":"Get Crackin'"})]})]})]}),(0,Sr.jsx)(jr,{}),(0,Sr.jsx)(_i,{}),(0,Sr.jsx)($i,{})]})},$u=[{quote:"A man who can devour three hot dogs in one sitting can conquer any battlefield.",author:"George Washington, 1776"},{quote:"We hold these truths to be self-evident: that all hot dogs are created equal.",author:"George Washington, at a colonial cookout"},{quote:"The price of hot dog liberty is eternal vigilance at the grill.",author:"George Washington, to his troops"},{quote:"The secret to my strength? I eat a hot dog before every match. It's fucking brilliant.",author:"Gordon Ramsay, Celebrity Chef"},{quote:"This hot dog is so raw, it's still barking at the mailman!",author:"Gordon Ramsay, during a cookout critique"},{quote:"Finally, some good fucking food. And by food, I mean hot dogs.",author:"Gordon Ramsay, at a street vendor"},{quote:"One small bite of a hot dog, one giant leap for mankind.",author:"Neil Armstrong, moments before lunar landing"},{quote:"Houston, we have a hot dog. I repeat, we have a hot dog.",author:"Neil Armstrong, during space transmission"},{quote:"The moon is made of cheese? Ridiculous. It's clearly made of hot dogs.",author:"Neil Armstrong, in a recently discovered interview"},{quote:"I have measured my life out in hot dogs, and I regret nothing.",author:"Ernest Hemingway, while drunk at a baseball game"}],Uu=xr.div`
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
`,Bu=xr(Ie)`
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
`,Wu=xr.div`
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
`,Hu=xr.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #FF6B6B, #FFE66D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 107, 107, 0.3);
`,Vu=xr.div`
  font-size: 5rem;
  font-weight: 700;
  margin: 1rem 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`,qu=xr.p`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 1.5rem;
`,Gu=xr.div`
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.05);
  border-radius: 0.5rem;
  font-style: italic;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: all 0.3s ease;
`,Ku=xr.div`
  margin-bottom: 0.5rem;
`,Yu=xr.div`
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  text-align: right;
`,Zu=xr.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`,Ju=xr.button`
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
`,Qu=xr.div`
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
`,Xu=xr.div`
  position: relative;
  text-align: center;
  background: none;
  border: none;
  padding: 0.5rem;
  margin-top: 20px;
  margin-bottom: 0;
  backdrop-filter: none;
`,eh=xr.div`
  font-size: 0.9rem;
  color: #888;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`,th=xr.div`
  font-size: 0.8rem;
  color: #666;
  font-weight: 300;
`,nh=xr.div`
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
`,rh=xr.div`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(255, 107, 107, 0.2);
`,ih=xr.button`
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
`,ah=xr.div`
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
`,oh=xr.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,sh=xr.button`
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
`,lh=xr.div`
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
`,ch=xr.div`
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  text-align: center;
`,dh=xr.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
`,uh=xr.input`
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
`,hh=xr.button`
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
`,ph=xr.div`
  margin-top: 1rem;
  color: #FF6B6B;
  font-size: 0.9rem;
`,fh=()=>{const e=document.createElement("div");e.style.position="fixed",e.style.fontSize="5rem",e.style.pointerEvents="none",e.style.zIndex="1000",e.textContent="\ud83c\udf2d";const t=Math.random()*window.innerWidth;e.style.left=`${t}px`,e.style.bottom="0";const n=(Math.random()-.5)*window.innerWidth,r=720*(Math.random()-.5);if(e.style.animation="flyHotDog 3s ease-out forwards",!document.getElementById("hotDogAnimations")){const e=document.createElement("style");e.id="hotDogAnimations",e.innerHTML=`\n      @keyframes flyHotDog {\n        0% {\n          transform: translate(0, 100vh) rotate(0deg);\n          opacity: 1;\n        }\n        100% {\n          transform: translate(${n}px, -100vh) rotate(${r}deg);\n          opacity: 0;\n        }\n      }\n    `,document.head.appendChild(e)}document.body.appendChild(e),setTimeout((()=>{e.remove()}),3e3)};const mh=function(){var e;const[n,r]=(0,t.useState)(null),[i,a]=(0,t.useState)(!1),[o,s]=(0,t.useState)(""),[l,c]=(0,t.useState)(""),[d,u]=(0,t.useState)(0),[h,p]=(0,t.useState)(0),[f,m]=(0,t.useState)(null),[g,b]=(0,t.useState)([]),[y,v]=(0,t.useState)(null),[x,w]=(0,t.useState)(!1),[_,k]=(0,t.useState)([]),[S,E]=(0,t.useState)(0);(0,t.useEffect)((()=>{const e=localStorage.getItem("hotdogUsername");e?(r(e),C(e)):a(!0);const t=Math.floor(Math.random()*$u.length);v($u[t]);const i=(0,Ar.ref)(Nr.OO,"hotdogLogs");(0,Ar.Zy)(i,(e=>{const t=[];e.forEach((e=>{const n=e.val();n.id=e.key,t.push(n)})),t.sort(((e,t)=>t.timestamp-e.timestamp)),b(t.slice(0,50))}));return(()=>{const e=(0,Ar.ref)(Nr.OO,"users");(0,Ar.Zy)(e,(e=>{const t=e.val();if(!t)return;const r=Object.entries(t).map((e=>{let[t,n]=e;return{username:t,...n}})).sort(((e,t)=>t.count-e.count)).slice(0,3);if(k(r),n&&r.length>0){const e=r[0].count||0,i=Object.entries(t).find((e=>{let[t]=e;return t===n})),a=i&&i[1].count||0,o=Math.max(0,e-a);E(o)}}))})(),()=>{}}),[n]);const C=e=>{const t=(0,Ar.ref)(Nr.OO,`users/${e}`);(0,Ar.Zy)(t,(n=>{const r=n.val();r?(u(r.count||0),p(r.streak||0),m(r.lastEaten||null)):(0,Ar.hZ)(t,{name:e,count:0,streak:0,lastEaten:null})}),{onlyOnce:!0})},T=()=>{if(!l.trim())return void s("Please enter a username");const e=l.trim().toLowerCase().replace(/\\s+/g,"");if(e!==l&&c(e),e.length<3)return void s("Username must be at least 3 characters");const t=(0,Ar.ref)(Nr.OO,`users/${e}`);(0,Ar.Zy)(t,(t=>{localStorage.setItem("hotdogUsername",e),r(e),a(!1),s(""),C(e)}),{onlyOnce:!0})};return(0,Sr.jsxs)(Uu,{children:[i&&(0,Sr.jsx)(lh,{children:(0,Sr.jsxs)(ch,{children:[(0,Sr.jsx)(dh,{children:"Enter Your Hot Dog Name"}),(0,Sr.jsx)(uh,{type:"text",placeholder:"e.g. HotDogKing42",value:l,onChange:e=>c(e.target.value),onKeyPress:e=>"Enter"===e.key&&T()}),o&&(0,Sr.jsx)(ph,{children:o}),(0,Sr.jsx)(hh,{onClick:T,children:"Start Eating"})]})}),(0,Sr.jsx)(Bu,{to:"/",children:"Back to Home"}),n&&(0,Sr.jsxs)(nh,{children:["Logged in as: ",n]}),(0,Sr.jsxs)(Wu,{children:[(0,Sr.jsx)(Hu,{children:"Hot Dog Counter"}),(0,Sr.jsx)(Vu,{children:d}),(0,Sr.jsx)(qu,{children:"Hot Dogs Devoured"}),y&&(0,Sr.jsxs)(Gu,{children:[(0,Sr.jsxs)(Ku,{children:['"',y.quote,'"']}),(0,Sr.jsxs)(Yu,{children:["\u2014 ",y.author]})]}),(0,Sr.jsxs)(Zu,{children:[(0,Sr.jsx)(Qu,{}),(0,Sr.jsx)(Ju,{onClick:()=>{const e=d+1;u(e),(()=>{const e=new Date,t=Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()),r=t-864e5;let i=h;if(f){const e=new Date(f),n=Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate());n<r?n<t&&(i=1):n<t&&(i=h+1)}else i=1;p(i);const a=Date.now();m(a);const o=(0,Ar.ref)(Nr.OO,`users/${n}`);(0,Ar.yo)(o,{streak:i,lastEaten:a})})();const t=(0,Ar.ref)(Nr.OO,`users/${n}`);(0,Ar.yo)(t,{count:e,lastEaten:Date.now()});const r={username:n,timestamp:Date.now()},i=(0,Ar.ref)(Nr.OO,"hotdogLogs");(0,Ar.VC)(i,r),(()=>{for(let e=0;e<20;e++)setTimeout((()=>fh()),130*e)})()},disabled:!n,children:"I Ate a Hot Dog!"})]}),(0,Sr.jsxs)(Xu,{children:[(0,Sr.jsxs)(eh,{children:[h," day streak"]}),(0,Sr.jsx)(th,{children:(e=>{const t=["First hot dog of many!","Two days of hot dog glory!","Triple threat!","Four days strong!","High five - keep it alive!","Six days of satisfaction!","A whole week of wonderful!","Eight days of excellence!","Nine days of nobility!","Perfect ten!","Unstoppable!"];return 0===e?"Start your streak!":e<=10?t[e-1]:t[t.length-1]})(h)})]}),(0,Sr.jsxs)(rh,{children:[(0,Sr.jsx)("div",{className:"leaderboard-title",style:{fontSize:"1.3rem",marginBottom:"1rem",color:"#FFE66D",fontWeight:600},children:"\ud83c\udf2d Grease Missile Captains \ud83c\udf2d"}),_.map(((e,t)=>{const n=0===t?"\ud83e\udd47":1===t?"\ud83e\udd48":"\ud83e\udd49";return(0,Sr.jsxs)("div",{style:{display:"flex",alignItems:"center",padding:"0.7rem",marginBottom:"0.5rem",background:"rgba(255, 255, 255, 0.05)",borderRadius:"0.5rem"},children:[(0,Sr.jsx)("div",{style:{fontSize:"1.3rem",marginRight:"0.7rem"},children:n}),(0,Sr.jsx)("div",{style:{fontWeight:500,color:"white",flex:1,textAlign:"left",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.username}),(0,Sr.jsxs)("div",{style:{fontWeight:700,color:"#FF6B6B",margin:"0 1rem"},children:[e.count||0," \ud83c\udf2d"]})]},e.username)})),S>0&&(0,Sr.jsxs)("div",{style:{fontSize:"0.8rem",color:"#888",marginTop:"0.3rem",textAlign:"center"},children:[S," hot dogs behind first place"]}),0===S&&_.length>0&&(null===(e=_[0])||void 0===e?void 0:e.username)===n&&(0,Sr.jsx)("div",{style:{fontSize:"0.8rem",color:"#888",marginTop:"0.3rem",textAlign:"center"},children:"\ud83c\udfc6 You're in first place!"})]}),(0,Sr.jsx)(ih,{onClick:()=>w(!0),children:"\ud83c\udf2d Hot Dog History"}),(0,Sr.jsx)(jr,{})]}),(0,Sr.jsxs)(ah,{className:x?"active":"",children:[(0,Sr.jsxs)(oh,{children:[(0,Sr.jsx)("h2",{children:"Global Hot Dog History"}),(0,Sr.jsx)(sh,{onClick:()=>w(!1),children:"\xd7"})]}),(0,Sr.jsx)("div",{style:{padding:"1rem",height:"calc(100vh - 5rem)",overflowY:"auto"},children:(e=>{const t={};return e.forEach((e=>{const n=new Date(e.timestamp),r=n.toISOString().split("T")[0];let i;const a=new Date,o=new Date(a);o.setDate(o.getDate()-1);const s=a.toISOString().split("T")[0],l=o.toISOString().split("T")[0];i=r===s?"Today":r===l?"Yesterday":n.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}),t[r]||(t[r]={label:i,items:[]}),t[r].items.push(e)})),Object.values(t).sort(((e,t)=>{var n,r;const i=(null===(n=e.items[0])||void 0===n?void 0:n.timestamp)||0;return((null===(r=t.items[0])||void 0===r?void 0:r.timestamp)||0)-i})).map((e=>({...e,items:e.items.sort(((e,t)=>t.timestamp-e.timestamp))})))})(g).map((e=>(0,Sr.jsxs)("div",{style:{marginBottom:"2rem"},children:[(0,Sr.jsx)("div",{style:{color:"#888",fontSize:"0.9rem",marginBottom:"0.5rem",padding:"0 0.5rem"},children:e.label}),e.items.map((e=>{const t=_.findIndex((t=>t.username===e.username)),n=0===t?"\ud83e\udd47":1===t?"\ud83e\udd48":2===t?"\ud83e\udd49":"";return(0,Sr.jsxs)("div",{style:{padding:"0.75rem",background:"rgba(255, 255, 255, 0.05)",borderRadius:"0.5rem",marginBottom:"0.5rem",display:"flex",alignItems:"center",gap:"0.5rem"},children:[n&&(0,Sr.jsx)("span",{style:{fontSize:"1.2rem"},children:n}),(0,Sr.jsx)("span",{style:{fontWeight:500,color:"#FFE66D"},children:e.username}),(0,Sr.jsx)("span",{style:{color:"#888",fontSize:"0.8rem",marginLeft:"auto"},children:new Date(e.timestamp).toLocaleTimeString()})]},e.id)}))]},e.label)))})]})]})},gh=_r`
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(12vw, -8vh) rotate(120deg); }
  66% { transform: translate(-12vw, 8vh) rotate(240deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
`,bh=xr.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(160deg, #1a1a1a 0%, #232325 100%);
  color: #f4f4f4;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
`,yh=xr.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`,vh=xr.span`
  position: absolute;
  font-size: ${e=>e.size||"28px"};
  opacity: 0.10;
  top: ${e=>e.top};
  left: ${e=>e.left};
  animation: ${gh} ${e=>e.duration||"22s"} ease-in-out infinite;
  animation-delay: ${e=>e.delay||"0s"};
  user-select: none;
`;function xh(e){let{count:n=7}=e;const r=t.useMemo((()=>{const e=[];for(let t=0;t<n;t++)e.push({top:100*Math.random()+"%",left:100*Math.random()+"%",size:22+16*Math.random()+"px",duration:18+10*Math.random()+"s",delay:`-${15*Math.random()}s`});return e}),[n]);return(0,Sr.jsx)(yh,{"aria-hidden":"true",children:r.map(((e,t)=>(0,Sr.jsx)(vh,{...e,children:"\ud83e\udd5a"},t)))})}const wh=xr.header`
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
`,_h=xr.div`
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
`,kh=xr.button`
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
`,Sh=xr.div`
  position: relative;
  z-index: 2;
  display: flex;
  gap: 2px;
  padding: 8px 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`,Eh=xr.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding: 10px 12px;
  border: none;
  background: transparent;
  color: ${e=>e.$active?"#FFC72C":"rgba(255,255,255,0.55)"};
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.$disabled?.5:1};
  border-bottom: 2px solid ${e=>e.$active?"#FFC72C":"transparent"};
  margin-bottom: -1px;
  transition: color 0.15s;
  flex-shrink: 0;
  white-space: nowrap;

  &:hover { color: ${e=>e.$disabled?"rgba(255,255,255,0.55)":"#FFE66D"}; }
`,Ch=xr.main`
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;
  padding: 18px 16px 96px;

  @media (max-width: 480px) {
    padding: 12px 12px 96px;
  }
`,Th=xr(kh)`
  background: rgba(255,199,44,0.10);
  border-color: rgba(255,199,44,0.25);
  color: #FFC72C;
  &:hover { background: rgba(255,199,44,0.18); }
`,Ih=xr(kh)`
  background: rgba(255,80,80,0.10);
  border-color: rgba(255,80,80,0.25);
  color: rgba(255,120,120,0.9);
  &:hover { background: rgba(255,80,80,0.20); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,jh=xr.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ph=["events","notifications","signups","users","engagement","analytics","errors"],Ah={events:"Events",notifications:"Notifs",signups:"Signups",users:"Users",engagement:"Engage",analytics:"Analytics",errors:"Errors"};const Nh=function(e){let{tab:n,onTabChange:r,onSignOut:i,children:a}=e;const o=ee(),s=(0,t.useRef)({}),l=(0,t.useRef)(null),[c,d]=(0,t.useState)(!1),[u,h]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{const e=s.current[n],t=l.current;if(!e||!t)return;const r=e.offsetLeft,i=r+e.offsetWidth,a=t.scrollLeft,o=t.offsetWidth;r<a?t.scrollTo({left:r-12,behavior:"smooth"}):i>a+o&&t.scrollTo({left:i-o+12,behavior:"smooth"})}),[n]),(0,Sr.jsxs)(bh,{children:[(0,Sr.jsx)(xh,{}),(0,Sr.jsxs)(wh,{children:[(0,Sr.jsx)(_h,{children:"\ud83e\udd5a Admin"}),(0,Sr.jsxs)(jh,{children:[(0,Sr.jsx)(Ih,{type:"button",disabled:c,onClick:async()=>{if(!c){d(!0),h(!1);try{await Va(),h(!0),setTimeout((()=>h(!1)),3e3)}catch(Bt){}finally{d(!1)}}},title:"Wipe all Eggman AI cache \u2014 next visitor regenerates fresh",children:c?"\u2026":u?"\u2713 Cleared":"\ud83e\udd5a Clear Eggman"}),(0,Sr.jsx)(Th,{type:"button",onClick:()=>o("/"),children:"\u2190 Home"}),(0,Sr.jsx)(kh,{type:"button",onClick:i,children:"Sign Out"})]})]}),(0,Sr.jsx)(Sh,{ref:l,children:Ph.map((e=>(0,Sr.jsx)(Eh,{type:"button",$active:n===e,ref:t=>{s.current[e]=t},onClick:()=>r&&r(e),children:Ah[e]},e)))}),(0,Sr.jsx)(Ch,{children:a})]})},Rh=xr.div`
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
`,Oh=xr.button`
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
`,Dh=xr.button`
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
`,Mh=xr.div`
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
`,Lh=xr.div`
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
`,Fh=xr.div`
  text-align: center;
  padding: 28px 16px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  color: rgba(255,255,255,0.55);
  font-size: 13px;

  .em { font-size: 30px; margin-bottom: 6px; opacity: 0.7; }
`,zh=e=>new Intl.DateTimeFormat(void 0,{month:"short"}).format(new Date(e)).toUpperCase(),$h=e=>new Date(e).getDate(),Uh=e=>new Intl.DateTimeFormat(void 0,{weekday:"short"}).format(new Date(e));function Bh(e){const t=Array.isArray(e.tags)?e.tags.length:0,n=e.hotdogs||0,r=e.rideLeader&&e.rideLeader.name?e.rideLeader.name:null,i=[(a=e.start,new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(a)))];var a;return r&&i.push(`led by ${r}`),i.push(`${t} ${1===t?"tag":"tags"}`),i.push(`${n} \ud83c\udf2d`),i.join(" \xb7 ")}const Wh=function(e){let{upcoming:t,past:n,onNew:r,onEdit:i}=e;return(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(Oh,{type:"button",onClick:r,children:"+ New Event"}),(0,Sr.jsx)(Rh,{children:"Upcoming"}),0===t.length?(0,Sr.jsxs)(Fh,{children:[(0,Sr.jsx)("div",{className:"em",children:"\ud83e\udd5a"}),'Nothing on the books yet. Tap "New Event" to add one.']}):t.map((e=>(0,Sr.jsxs)(Dh,{type:"button",onClick:()=>i(e.id),children:[(0,Sr.jsxs)(Mh,{children:[(0,Sr.jsx)("div",{className:"month",children:zh(e.start)}),(0,Sr.jsx)("div",{className:"day",children:$h(e.start)}),(0,Sr.jsx)("div",{className:"weekday",children:Uh(e.start)})]}),(0,Sr.jsxs)(Lh,{children:[(0,Sr.jsxs)("div",{className:"name",children:[(0,Sr.jsx)("span",{children:e.name||"(untitled)"}),e.unlocked&&(0,Sr.jsx)("span",{className:"unlock-pill",title:"Visitors can open this event from the Coming Up list",children:"\ud83d\udd13 Unlocked"})]}),(0,Sr.jsx)("div",{className:"meta",children:(0,Sr.jsx)("span",{children:Bh(e)})})]})]},e.id))),(0,Sr.jsx)(Rh,{children:"Past (last 10)"}),0===n.length?(0,Sr.jsx)(Fh,{children:"No past events yet."}):n.slice(0,10).map((e=>(0,Sr.jsxs)(Dh,{type:"button","data-past":"1",onClick:()=>i(e.id),children:[(0,Sr.jsxs)(Mh,{children:[(0,Sr.jsx)("div",{className:"month",children:zh(e.start)}),(0,Sr.jsx)("div",{className:"day",children:$h(e.start)}),(0,Sr.jsx)("div",{className:"weekday",children:Uh(e.start)})]}),(0,Sr.jsxs)(Lh,{children:[(0,Sr.jsx)("div",{className:"name",children:e.name||"(untitled)"}),(0,Sr.jsx)("div",{className:"meta",children:(0,Sr.jsx)("span",{children:Bh(e)})})]})]},e.id)))]})};var Hh=n(68);const Vh=46.7867,qh=-92.1005,Gh=xr.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Kh=xr.div`
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
`,Yh=xr.div`
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
`,Zh=xr.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.6);
`,Jh=xr.button`
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
`,Qh='<div style="\n  width:18px;height:18px;border-radius:50%;\n  background:#FFC72C;border:3px solid #1a1a1a;\n  box-shadow:0 0 0 2px #FFC72C, 0 0 18px rgba(255,199,44,0.8);"></div>';const Xh=function(e){let{value:n,onChange:r,doneTargetId:i}=e;const a=(0,t.useRef)(null),o=(0,t.useRef)(null),s=(0,t.useRef)(null),[l,c]=(0,t.useState)(!1);(0,t.useEffect)((()=>{let e=!1;return new Promise((e=>{if("undefined"!==typeof window&&window.L)return void e(window.L);let t=0;const n=setInterval((()=>{t++,"undefined"!==typeof window&&window.L?(clearInterval(n),e(window.L)):t>100&&(clearInterval(n),e(null))}),50)})).then((t=>{if(e||!t||!a.current)return;const i=n&&null!=n.lat&&null!=n.lng?[n.lat,n.lng]:[Vh,qh],l=n&&null!=n.lat?13:11,d=t.map(a.current,{zoomControl:!0,attributionControl:!0,scrollWheelZoom:!1}).setView(i,l);t.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:19,attribution:"&copy; OpenStreetMap &copy; CARTO"}).addTo(d);const u=t.divIcon({className:"sl-yolk-pin",html:Qh,iconSize:[18,18],iconAnchor:[9,9]});n&&null!=n.lat&&null!=n.lng&&(s.current=t.marker([n.lat,n.lng],{icon:u}).addTo(d)),d.on("click",(e=>{const{lat:i,lng:a}=e.latlng;s.current?s.current.setLatLng([i,a]):s.current=t.marker([i,a],{icon:u}).addTo(d),r&&r({lat:i,lng:a,label:(null===n||void 0===n?void 0:n.label)||""})})),o.current=d,c(!0),setTimeout((()=>d.invalidateSize()),50)})),()=>{e=!0,o.current&&(o.current.remove(),o.current=null,s.current=null)}}),[]),(0,t.useEffect)((()=>{if(l&&o.current&&window.L)if(n&&null!=n.lat&&null!=n.lng){const e=[n.lat,n.lng];if(s.current)s.current.setLatLng(e);else{const t=window.L.divIcon({className:"sl-yolk-pin",html:Qh,iconSize:[18,18],iconAnchor:[9,9]});s.current=window.L.marker(e,{icon:t}).addTo(o.current)}}else s.current&&(s.current.remove(),s.current=null)}),[n,l]);const d=null===n||void 0===n?void 0:n.lat,u=null===n||void 0===n?void 0:n.lng;return(0,Sr.jsxs)(Gh,{children:[(0,Sr.jsxs)(Kh,{children:[(0,Sr.jsx)(Yh,{children:"Tap map to drop pin"}),(0,Sr.jsx)("div",{ref:a,style:{width:"100%",height:"100%"}})]}),(0,Sr.jsx)(Zh,{children:null!=d&&null!=u?`Pin: ${d.toFixed(5)}, ${u.toFixed(5)}`:"No pin set yet \u2014 tap the map to choose a location."}),(0,Sr.jsx)(Jh,{type:"button",onClick:()=>{if(i){const e=document.getElementById(i);e&&e.scrollIntoView&&e.scrollIntoView({behavior:"smooth",block:"start"})}},children:"Done picking \u2193"})]})},ep=xr.div`
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
`,tp=xr.span`
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
`,np=xr.button`
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
`,rp=xr.input`
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
`;const ip=function(e){let{value:n,onChange:r,placeholder:i}=e;const a=Array.isArray(n)?n:[],[o,s]=(0,t.useState)(""),l=e=>{const t=(e||"").trim();t&&(a.includes(t)||r([...a,t]),s(""))},c=e=>{const t=a.slice();t.splice(e,1),r(t)};return(0,Sr.jsxs)(ep,{children:[a.map(((e,t)=>(0,Sr.jsxs)(tp,{children:[(0,Sr.jsx)("span",{children:e}),(0,Sr.jsx)(np,{type:"button","aria-label":`Remove ${e}`,onClick:()=>c(t),children:"\xd7"})]},`${e}-${t}`))),(0,Sr.jsx)(rp,{type:"text",value:o,onChange:e=>s(e.target.value),onKeyDown:e=>{"Enter"===e.key||","===e.key?(e.preventDefault(),l(o)):"Backspace"===e.key&&!o&&a.length&&(e.preventDefault(),c(a.length-1))},onBlur:()=>{o.trim()&&l(o)},placeholder:i||"Add a tag, then Enter (e.g., '12 mi', '850 ft')"})]})},ap={w:400,h:400,mode:"cover"},op={w:1600,h:800,mode:"fit"};function sp(e,t){if(!e)return"No file selected";if(!e.type||!e.type.startsWith("image/"))return"File must be an image";const n="banner"===t?5242880:2097152;return e.size>n?`Image is too large (max ${(n/1024/1024).toFixed(0)}MB)`:null}async function lp(e){let{kind:t,eventId:n,file:r,onProgress:i}=e;const a=sp(r,t);if(a)throw new Error(a);const o="banner"===t?op:ap;let s;try{s=await function(e,t){return new Promise(((n,r)=>{const i=URL.createObjectURL(e),a=new Image;a.onload=()=>{const{w:o,h:s,mode:l}=t,c=a.naturalWidth,d=a.naturalHeight;let u,h,p=0,f=0,m=c,g=d;if("cover"===l){const e=o/s;c/d>e?(g=d,m=d*e,p=(c-m)/2):(m=c,g=c/e,f=(d-g)/2),u=o,h=s}else{const e=Math.min(o/c,s/d,1);u=Math.round(c*e),h=Math.round(d*e)}const b=document.createElement("canvas");b.width=u,b.height=h,b.getContext("2d").drawImage(a,p,f,m,g,0,0,u,h);const y="image/png"===e.type?"image/png":"image/jpeg",v="image/jpeg"===y?.86:void 0;b.toBlob((e=>{URL.revokeObjectURL(i),e?n(e):r(new Error("Failed to encode resized image"))}),y,v)},a.onerror=()=>{URL.revokeObjectURL(i),r(new Error("Could not read image"))},a.src=i}))}(r,o)}catch(vy){s=r}const l="banner"===t?"banners":"rideLeaders",c="image/png"===s.type?"png":"image/jpeg"===s.type?"jpg":function(e){const t=(e.name||"").split(".").pop();return t&&t.length<=5?t.toLowerCase():"image/png"===e.type?"png":"image/webp"===e.type?"webp":"image/gif"===e.type?"gif":"jpg"}(r),d=`${l}/${n}.${c}`,u=(0,Hh.KR)(Nr.IG,d),h=(0,Hh.bp)(u,s,{contentType:s.type||r.type||"image/jpeg"});return new Promise(((e,t)=>{h.on("state_changed",(e=>{i&&e.totalBytes&&i(e.bytesTransferred/e.totalBytes*100)}),(e=>t(e)),(async()=>{try{const t=await(0,Hh.qk)(h.snapshot.ref);e(t)}catch(vy){t(vy)}}))}))}const cp=xr.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,dp=xr.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,up=xr.div`
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
`,hp=xr.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 200px;
`,pp=xr.button`
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
`,fp=xr.button`
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
`,mp=xr.div`
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow: hidden;
`,gp=xr.div`
  width: ${e=>e.$pct||0}%;
  height: 100%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  transition: width 0.15s;
`,bp=xr.div`
  font-size: 12px;
  color: #FF8E8E;
`,yp=xr.input`
  display: none;
`;const vp=function(e){let{kind:n,eventId:r,value:i,onChange:a,label:o}=e;const s=(0,t.useRef)(null),[l,c]=(0,t.useState)(0),[d,u]=(0,t.useState)(!1),[h,p]=(0,t.useState)(""),f="banner"===n;return(0,Sr.jsxs)(cp,{children:[(0,Sr.jsxs)(dp,{children:[(0,Sr.jsx)(up,{$banner:f,children:i?(0,Sr.jsx)("img",{src:i,alt:o||n}):(0,Sr.jsx)("span",{style:{fontSize:22,opacity:.4},children:"\ud83e\udd5a"})}),(0,Sr.jsxs)(hp,{children:[(0,Sr.jsxs)(dp,{children:[(0,Sr.jsx)(pp,{type:"button",onClick:()=>{r?s.current&&s.current.click():p("Save the event once before uploading images")},disabled:d,children:i?"Replace image":d?"Uploading\u2026":"Choose image"}),i&&!d&&(0,Sr.jsx)(fp,{type:"button",onClick:()=>{a&&a(""),c(0),p("")},children:"Remove"})]}),d&&(0,Sr.jsx)(mp,{children:(0,Sr.jsx)(gp,{$pct:l})}),!r&&(0,Sr.jsx)("div",{style:{fontSize:11,color:"rgba(255,255,255,0.45)"},children:"Save the event first to enable image upload."}),h&&(0,Sr.jsx)(bp,{children:h})]})]}),(0,Sr.jsx)(yp,{ref:s,type:"file",accept:"image/*",onChange:async e=>{const t=e.target.files&&e.target.files[0];if(!t)return;e.target.value="";const i=sp(t,n);if(i)p(i);else{p(""),u(!0),c(0);try{const e=await lp({kind:n,eventId:r,file:t,onProgress:e=>c(e)});a&&a(e)}catch(o){p(o.message||"Upload failed")}finally{u(!1)}}}})]})},xp=xr.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,wp=xr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
`,_p=xr.button`
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
`,kp=xr.h2`
  font-family: 'Fredoka', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,Sp=xr.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px 14px;

  @media (max-width: 480px) { padding: 14px 12px; }
`,Ep=xr.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;

  &:last-child { margin-bottom: 0; }
`,Cp=xr.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
`,Tp=xr.div`
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: -2px;
`,Ip="\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 12px;\n  border: 2px solid rgba(255,199,44,0.20);\n  background: rgba(255,255,255,0.06);\n  color: #f4f4f4;\n  font-family: 'Inter', sans-serif;\n  font-size: 14px;\n  transition: all 0.2s ease;\n\n  &::placeholder { color: rgba(255,255,255,0.35); }\n  &:focus {\n    outline: none;\n    border-color: #FFC72C;\n    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);\n    background: rgba(255,255,255,0.09);\n  }\n",jp=xr.input`${Ip}`,Pp=xr.textarea`
  ${Ip}
  resize: vertical;
  min-height: 96px;
  font-family: 'Inter', sans-serif;
`,Ap=xr.select`
  ${Ip}
  background: #1c1c1e;
  color-scheme: dark;
  option {
    background: #1c1c1e;
    color: #f4f4f4;
  }
`,Np=xr.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,Rp=xr.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  user-select: none;

  input { accent-color: #FFC72C; width: 18px; height: 18px; }
`,Op=xr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
`,Dp=xr.button`
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
`,Mp=xr.button`
  background: transparent;
  border: none;
  color: #FF8E8E;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 4px;
  text-decoration: underline;

  &:hover { color: #FF6B6B; }
`,Lp=xr.div`
  width: 100%;
  font-size: 12px;
  color: #FF8E8E;
`,Fp=xr.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`,zp=xr.div`
  width: 100%;
  max-width: 360px;
  background: #232325;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 20px 18px;
  text-align: center;
`,$p=xr.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  margin: 0 0 6px;
  color: #f4f4f4;
`,Up=xr.p`
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  margin: 0 0 16px;
`,Bp=xr.button`
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
`,Wp=xr.button`
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
`;function Hp(e){if(!e||isNaN(e))return"";const t=new Date(e),n=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}function Vp(e){if(!e)return null;const t=Date.parse(e);return isNaN(t)?null:t}const qp=[{v:"chill",label:"Casual"},{v:"race",label:"Race pace"},{v:"work",label:"Trail work"},{v:"custom",label:"Custom"}],Gp={chill:"Casual",race:"Race pace",work:"Trail work",custom:""};function Kp(e){const t=e||{},n=t.start||(()=>{const e=new Date,t=(3-e.getDay()+7)%7||7;return e.setDate(e.getDate()+t),e.setHours(17,45,0,0),e.getTime()})(),r=t.startLoc||{lat:null,lng:null,label:""},i=t.endLoc||null,a=!i||i.lat===r.lat&&i.lng===r.lng;return{name:t.name||"",description:t.description||"",start:n,durationMinutes:t.durationMinutes||120,startLoc:{...r},endLoc:i?{...i}:{lat:null,lng:null,label:""},roundTrip:a,difficulty:t.difficulty||"chill",difficultyLabel:t.difficultyLabel||"",tags:Array.isArray(t.tags)?t.tags.slice():[],rideLeader:{name:t.rideLeader&&t.rideLeader.name||"",photoUrl:t.rideLeader&&t.rideLeader.photoUrl||""},bannerUrl:t.bannerUrl||"",routeUrl:t.routeUrl||"",unlocked:!!t.unlocked}}const Yp=function(e){let{existing:n,onClose:r,onSaved:i,onDeleted:a}=e;const o=!n,[s,l]=(0,t.useState)((()=>Kp(n))),[c,d]=(0,t.useState)(n?n.id:null),[u,h]=(0,t.useState)(!1),[p,f]=(0,t.useState)(""),[m,g]=(0,t.useState)(!1),[b,y]=(0,t.useState)(!1),[v,x]=(0,t.useState)([]),[w,_]=(0,t.useState)(!0),[k,S]=(0,t.useState)(null),[E,C]=(0,t.useState)(!1),[T,I]=(0,t.useState)(""),[j,P]=(0,t.useState)(0),A=(0,t.useRef)(null);(0,t.useEffect)((()=>{const e=(0,Ar.ref)(Nr.OO,"userProfiles"),t=(0,Ar.Zy)(e,(e=>{const t=e.val()||{},n=Object.entries(t).map((e=>{let[t,n]=e;return{uid:t,displayName:n&&n.displayName||"",email:n&&n.email||"",photoURL:n&&n.photoURL||""}})).filter((e=>!!e.displayName)).sort(((e,t)=>e.displayName.localeCompare(t.displayName)));x(n)}));return()=>t()}),[]);const N=(0,t.useMemo)((()=>{if(w)return"__manual__";if(k)return k;const e=v.find((e=>e.displayName===s.rideLeader.name));return e?e.uid:"__manual__"}),[w,k,v,s.rideLeader.name]),R=(0,t.useMemo)((()=>w||!k?null:v.find((e=>e.uid===k))||null),[w,k,v]);(0,t.useEffect)((()=>{if(!n)return _(!0),void S(null);const e=n.rideLeader&&n.rideLeader.name||"",t=n.rideLeader&&n.rideLeader.photoUrl||"";if(!e&&!t)return _(!0),void S(null);const r=v.find((t=>t.displayName===e));r?(_(!1),S(r.uid)):(_(!0),S(null))}),[n,v]),(0,t.useEffect)((()=>{l(Kp(n)),d(n?n.id:null),f("")}),[n&&n.id,n&&n.updatedAt]);const O=e=>l((t=>({...t,...e}))),D=e=>l((t=>({...t,rideLeader:{...t.rideLeader,...e}}))),M=e=>l((t=>({...t,startLoc:{...t.startLoc,...e}}))),L=e=>l((t=>({...t,endLoc:{...t.endLoc,...e}}))),F=()=>{if(!s.name.trim())return"Name is required";if(!s.description.trim())return"Description is required";if(!s.start)return"Start date/time is required";if(null==s.startLoc.lat||null==s.startLoc.lng)return"Start location pin is required";if(!s.startLoc.label.trim())return"Start location label is required";if(!s.roundTrip){if(null==s.endLoc.lat||null==s.endLoc.lng)return"End location pin is required (or toggle Round trip on)";if(!s.endLoc.label.trim())return"End location label is required"}return"custom"!==s.difficulty||s.difficultyLabel.trim()?s.routeUrl&&!function(e){if(!e)return!0;try{const t=new URL(e);return"http:"===t.protocol||"https:"===t.protocol}catch{return!1}}(s.routeUrl)?"Route URL must be a valid http/https URL":null:"Custom difficulty needs a label"},z=(0,t.useMemo)((()=>s.name.trim()?s.name.trim():o?"New event":"Edit event"),[s.name,o]);return(0,Sr.jsxs)(xp,{children:[(0,Sr.jsxs)(wp,{children:[(0,Sr.jsx)(_p,{type:"button",onClick:r,children:"\u2190 Back"}),(0,Sr.jsx)(kp,{children:z}),(0,Sr.jsx)("span",{style:{width:60}})]}),(0,Sr.jsxs)(Sp,{id:"event-editor-form",children:[(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{htmlFor:"ev-name",children:"Name"}),(0,Sr.jsx)(jp,{id:"ev-name",type:"text",value:s.name,onChange:e=>O({name:e.target.value}),placeholder:"Lester Park Wednesday Roll"})]}),(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{htmlFor:"ev-desc",children:"Description"}),(0,Sr.jsx)(Pp,{id:"ev-desc",value:s.description,onChange:e=>O({description:e.target.value}),placeholder:"Casual social pace, ~12 miles, regroup at every fork\u2026"})]}),(0,Sr.jsxs)(Np,{children:[(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{htmlFor:"ev-start",children:"Start date / time"}),(0,Sr.jsx)(jp,{id:"ev-start",type:"datetime-local",value:Hp(s.start),onChange:e=>O({start:Vp(e.target.value)})}),(0,Sr.jsx)(Tp,{children:"Uses your device's timezone."})]}),(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{htmlFor:"ev-dur",children:"Duration (min)"}),(0,Sr.jsx)(jp,{id:"ev-dur",type:"number",min:"0",step:"15",value:s.durationMinutes,onChange:e=>O({durationMinutes:e.target.value})})]})]}),(0,Sr.jsxs)(Np,{children:[(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{htmlFor:"ev-diff",children:"Difficulty"}),(0,Sr.jsx)(Ap,{id:"ev-diff",value:s.difficulty,onChange:e=>{const t=e.target.value;O({difficulty:t,difficultyLabel:"custom"===t?s.difficultyLabel:Gp[t]||""})},children:qp.map((e=>(0,Sr.jsx)("option",{value:e.v,children:e.label},e.v)))})]}),"custom"===s.difficulty&&(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{htmlFor:"ev-diff-label",children:"Custom label"}),(0,Sr.jsx)(jp,{id:"ev-diff-label",type:"text",value:s.difficultyLabel,onChange:e=>O({difficultyLabel:e.target.value}),placeholder:"Hammer / Skills / Sufferfest\u2026"})]})]}),(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{children:"Tags"}),(0,Sr.jsx)(ip,{value:s.tags,onChange:e=>O({tags:e}),placeholder:"Add a tag, then Enter (e.g., '12 mi', '850 ft')"})]})]}),(0,Sr.jsxs)(Sp,{children:[(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{children:"Start location"}),(0,Sr.jsx)(Xh,{value:s.startLoc,onChange:e=>M(e),doneTargetId:"start-loc-label"})]}),(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{htmlFor:"start-loc-label",children:"Start location label"}),(0,Sr.jsx)(jp,{id:"start-loc-label",type:"text",value:s.startLoc.label||"",onChange:e=>M({label:e.target.value}),placeholder:"Lester Park Trailhead"})]}),(0,Sr.jsx)(Ep,{children:(0,Sr.jsxs)(Rp,{children:[(0,Sr.jsx)("input",{type:"checkbox",checked:s.roundTrip,onChange:e=>O({roundTrip:e.target.checked})}),(0,Sr.jsx)("span",{children:"Round trip (end is same as start)"})]})}),!s.roundTrip&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{children:"End location"}),(0,Sr.jsx)(Xh,{value:s.endLoc,onChange:e=>L(e),doneTargetId:"end-loc-label"})]}),(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{htmlFor:"end-loc-label",children:"End location label"}),(0,Sr.jsx)(jp,{id:"end-loc-label",type:"text",value:s.endLoc.label||"",onChange:e=>L({label:e.target.value}),placeholder:"Brewer Park"})]})]})]}),(0,Sr.jsxs)(Sp,{children:[(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{htmlFor:"ev-leader-select",children:"Ride leader"}),(0,Sr.jsxs)(Ap,{id:"ev-leader-select",value:N,onChange:e=>{const t=e.target.value;if("__manual__"===t)_(!0),S(null);else{const e=v.find((e=>e.uid===t));e&&(_(!1),S(e.uid),D({name:e.displayName||"",photoUrl:e.photoURL||""}))}},children:[(0,Sr.jsx)("option",{value:"__manual__",children:"\u2014 Manual entry \u2014"}),v.map((e=>(0,Sr.jsxs)("option",{value:e.uid,children:[e.displayName,e.email?` \xb7 ${e.email}`:""]},e.uid)))]}),(0,Sr.jsx)(Tp,{children:"Pick a user with a profile, or enter a guest leader manually."})]}),w&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{htmlFor:"ev-leader-name",children:"Ride leader name"}),(0,Sr.jsx)(jp,{id:"ev-leader-name",type:"text",value:s.rideLeader.name,onChange:e=>D({name:e.target.value}),placeholder:"Optional"})]}),(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{children:"Ride leader photo"}),(0,Sr.jsx)(vp,{kind:"rideLeader",eventId:c,value:s.rideLeader.photoUrl,onChange:e=>D({photoUrl:e}),label:"Ride leader"})]})]}),!w&&R&&(0,Sr.jsxs)("div",{style:{display:"flex",gap:14,alignItems:"center",marginTop:4,flexWrap:"wrap"},children:[(0,Sr.jsx)("div",{style:{width:48,height:48,borderRadius:"50%",flexShrink:0,background:R.photoURL?`center/cover no-repeat url('${R.photoURL}')`:"linear-gradient(45deg, #FFC72C, #FFE66D)",color:"#1a1a1a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Fredoka, sans-serif",fontWeight:700,fontSize:22,textTransform:"uppercase",border:"2px solid rgba(255,199,44,0.40)"},children:!R.photoURL&&(R.displayName||"?").charAt(0)}),(0,Sr.jsxs)("div",{style:{flex:1,minWidth:200},children:[(0,Sr.jsx)("div",{style:{color:"#FFE66D",fontWeight:700,fontSize:13},children:R.displayName}),(0,Sr.jsx)("div",{style:{fontSize:11,color:"rgba(255,255,255,0.5)",marginBottom:6},children:R.photoURL?"Upload to replace their profile picture":"Upload photo to set their profile picture"}),(0,Sr.jsx)("button",{type:"button",disabled:E,onClick:()=>A.current&&A.current.click(),style:{padding:"8px 14px",borderRadius:10,border:"1px solid rgba(255,199,44,0.30)",background:"rgba(255,199,44,0.10)",color:"#FFE66D",fontFamily:"Inter, sans-serif",fontSize:12,fontWeight:600,cursor:E?"not-allowed":"pointer",opacity:E?.6:1},children:E?`Uploading\u2026 ${Math.round(j)}%`:R.photoURL?"Upload new photo":"Upload photo"}),T&&(0,Sr.jsx)("div",{style:{fontSize:12,color:"#FF8E8E",marginTop:6},children:T})]}),(0,Sr.jsx)("input",{ref:A,type:"file",accept:"image/*",style:{display:"none"},onChange:async e=>{const t=e.target.files&&e.target.files[0];if(e.target.value="",!t||!k)return;if(I(""),!t.type||!t.type.startsWith("image/"))return void I("File must be an image");if(t.size>2097152)return void I("Image is too large (max 2MB)");const n="image/png"===t.type?"png":"image/webp"===t.type?"webp":"image/gif"===t.type?"gif":"jpg";try{C(!0),P(0);const e=`profilePics/${k}.${n}`,r=(0,Hh.KR)(Nr.IG,e),i=(0,Hh.bp)(r,t,{contentType:t.type});await new Promise(((e,t)=>{i.on("state_changed",(e=>{e.totalBytes&&P(e.bytesTransferred/e.totalBytes*100)}),(e=>t(e)),(()=>e()))}));const a=await(0,Hh.qk)(i.snapshot.ref);await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${k}`),{photoURL:a}),D({photoUrl:a})}catch(r){I(r&&r.message||"Upload failed")}finally{C(!1)}}})]})]}),(0,Sr.jsxs)(Sp,{children:[(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{children:"Banner image"}),(0,Sr.jsx)(vp,{kind:"banner",eventId:c,value:s.bannerUrl,onChange:e=>O({bannerUrl:e}),label:"Banner"}),(0,Sr.jsx)(Tp,{children:"If set, the public widget shows the banner instead of the map preview."})]}),(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{htmlFor:"ev-route",children:"Route URL"}),(0,Sr.jsx)(jp,{id:"ev-route",type:"url",value:s.routeUrl,onChange:e=>O({routeUrl:e.target.value}),placeholder:"https://www.strava.com/routes/\u2026"})]})]}),(0,Sr.jsx)(Sp,{children:(0,Sr.jsxs)(Ep,{children:[(0,Sr.jsx)(Cp,{children:"Visibility"}),(0,Sr.jsxs)(Rp,{children:[(0,Sr.jsx)("input",{type:"checkbox",checked:!!s.unlocked,onChange:e=>O({unlocked:e.target.checked})}),(0,Sr.jsxs)("span",{children:["Unlock for visitors ",s.unlocked?"\ud83d\udd13":""]})]}),(0,Sr.jsx)(Tp,{children:"When enabled, this event shows as a tappable card in the Coming Up list before its day arrives. Otherwise it stays locked until it becomes the next ride."})]})}),p&&(0,Sr.jsx)(Lp,{role:"alert",children:p}),(0,Sr.jsxs)(Op,{children:[!o&&c?(0,Sr.jsx)(Mp,{type:"button",onClick:()=>g(!0),children:"Delete event"}):(0,Sr.jsx)("span",{}),(0,Sr.jsx)(Dp,{type:"button",onClick:async()=>{const e=F();if(e)f(e);else{f(""),h(!0);try{const e=function(e){const t="number"===typeof e.start?e.start:0;return{name:e.name.trim(),description:e.description.trim(),start:t,durationMinutes:Number(e.durationMinutes)||120,startLoc:{lat:e.startLoc.lat,lng:e.startLoc.lng,label:(e.startLoc.label||"").trim()},endLoc:e.roundTrip?{lat:e.startLoc.lat,lng:e.startLoc.lng,label:(e.startLoc.label||"").trim()}:{lat:e.endLoc.lat,lng:e.endLoc.lng,label:(e.endLoc.label||"").trim()},difficulty:e.difficulty||"chill",difficultyLabel:"custom"===e.difficulty?(e.difficultyLabel||"").trim():e.difficultyLabel||Gp[e.difficulty]||"",tags:e.tags.filter(Boolean),rideLeader:e.rideLeader.name||e.rideLeader.photoUrl?{name:e.rideLeader.name.trim(),photoUrl:e.rideLeader.photoUrl||""}:null,bannerUrl:e.bannerUrl||"",routeUrl:(e.routeUrl||"").trim(),unlocked:!!e.unlocked}}(s);if(o&&!c){const t=await async function(e){const t=Bi(),n=(0,Ar.VC)(t),r=Date.now(),i={hotdogs:0,unlocked:!1,...e,createdAt:r,updatedAt:r};return await(0,Ar.hZ)(n,i),n.key}(e);d(t),i&&i(t)}else await async function(e,t){const n={...t,updatedAt:Date.now()};await(0,Ar.yo)(Wi(e),n)}(c,e),i&&i(c)}catch(t){f(t.message||"Save failed")}finally{h(!1)}}},disabled:u,children:u?"Saving\u2026":o&&!c?"Create event":"Save changes"})]}),m&&(0,Sr.jsx)(Fp,{onClick:()=>!b&&g(!1),children:(0,Sr.jsxs)(zp,{onClick:e=>e.stopPropagation(),children:[(0,Sr.jsx)($p,{children:"Delete this event?"}),(0,Sr.jsxs)(Up,{children:["Delete ",(0,Sr.jsx)("strong",{children:s.name||"this event"}),"? This can't be undone."]}),(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(Wp,{type:"button",onClick:()=>g(!1),disabled:b,children:"Cancel"}),(0,Sr.jsx)(Bp,{type:"button",onClick:async()=>{if(c){y(!0);try{await async function(e){await(0,Ar.TF)(Wi(e))}(c),a&&a(c)}catch(e){f(e.message||"Delete failed"),g(!1)}finally{y(!1)}}},disabled:b,children:b?"Deleting\u2026":"Delete"})]})]})})]})};const Zp="https://thescrambledlegs.com/",Jp=xr.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px 14px;
  margin-bottom: 16px;
`,Qp=xr.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  &:last-child { margin-bottom: 0; }
`,Xp=xr.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`,ef=xr.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
`,tf=xr.span`
  font-size: 11px;
  color: ${e=>e.$over?"#FF8E8E":"rgba(255,255,255,0.45)"};
  font-variant-numeric: tabular-nums;
`,nf="\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 12px;\n  border: 2px solid rgba(255,199,44,0.20);\n  background: rgba(255,255,255,0.06);\n  color: #f4f4f4;\n  font-family: 'Inter', sans-serif;\n  font-size: 14px;\n  transition: all 0.2s ease;\n\n  &::placeholder { color: rgba(255,255,255,0.35); }\n  &:focus {\n    outline: none;\n    border-color: #FFC72C;\n    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);\n    background: rgba(255,255,255,0.09);\n  }\n",rf=xr.input`${nf}`,af=xr.textarea`${nf} resize: vertical; min-height: 84px;`,of=xr.select`
  ${nf}
  background: #1c1c1e;
  color-scheme: dark;
  option {
    background: #1c1c1e;
    color: #f4f4f4;
  }
`,sf=xr.div`
  display: flex;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
`,lf=xr.button`
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
`,cf=xr.button`
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
`,df=xr.div`
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: -2px;
`,uf=xr.div`
  font-size: 12px;
  color: #FF8E8E;
  margin-top: 6px;
`,hf=xr.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`,pf=xr.div`
  width: 100%;
  max-width: 360px;
  background: #232325;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 20px 18px;
  text-align: center;
`,ff=xr.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  margin: 0 0 6px;
  color: #f4f4f4;
`,mf=xr.p`
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  margin: 0 0 16px;
`,gf=xr.button`
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
`,bf=xr.button`
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
`;function yf(e){const t="ios"===(n=e.platform)?"\ud83c\udf4e":"android"===n?"\ud83e\udd16":"desktop"===n?"\ud83d\udda5":"\ud83c\udf10";var n;const r=e.lastSeenAt?vf(e.lastSeenAt):"\u2014";if(e.email||e.displayName){return`${t} ${e.displayName||(e.email?e.email.split("@")[0]:"user")}${e.email?` \xb7 ${e.email}`:""} \xb7 ${r}`}return`${t} (anonymous device \xb7 ${i=e.hash,(i||"").slice(0,8)}) \xb7 ${function(e){if(!e)return"";const t=e.match(/\(([^)]+)\)/);return t?t[1].slice(0,40):e.slice(0,40)}(e.userAgent)} \xb7 ${r}`;var i}function vf(e){return e?new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(e)):""}const xf=function(e){let{onSent:n}=e;const[r,i]=(0,t.useState)(""),[a,o]=(0,t.useState)(""),[s,l]=(0,t.useState)(""),[c,d]=(0,t.useState)(""),[u,h]=(0,t.useState)("all"),[p,f]=(0,t.useState)(""),[m,g]=(0,t.useState)([]),[b,y]=(0,t.useState)([]),[v,x]=(0,t.useState)(""),[w,_]=(0,t.useState)(!1),[k,S]=(0,t.useState)(!1),[E,C]=(0,t.useState)("");(0,t.useEffect)((()=>{const e=function(e){const t=(0,Ar.ref)(Nr.OO,"fcmTokens"),n=t=>{const n=[];t.forEach((e=>{const t=e.val()||{};n.push({hash:e.key,...t})})),n.sort(((e,t)=>(t.lastSeenAt||t.createdAt||0)-(e.lastSeenAt||e.createdAt||0))),e(n)};return(0,Ar.Zy)(t,n),()=>(0,Ar.AU)(t,"value",n)}((e=>g(e))),t=Hi((e=>y(e)));return()=>{e&&e(),t&&t()}}),[]);const T=(0,t.useMemo)((()=>Vi(b).upcoming.slice(0,20)),[b]),I=r.length>50,j=a.length>150,P=!r.trim(),A=!a.trim(),N=!P&&!A&&!I&&!j&&!("test"===u&&!p)&&!k,R="test"===u?p?1:0:m.length;return(0,Sr.jsxs)("div",{children:[(0,Sr.jsxs)(Jp,{children:[(0,Sr.jsxs)(Qp,{children:[(0,Sr.jsxs)(Xp,{children:[(0,Sr.jsx)(ef,{htmlFor:"ntf-title",children:"Title"}),(0,Sr.jsxs)(tf,{$over:I,children:[r.length,"/",50]})]}),(0,Sr.jsx)(rf,{id:"ntf-title",type:"text",value:r,onChange:e=>i(e.target.value),placeholder:"Wednesday roll moved!",maxLength:70})]}),(0,Sr.jsxs)(Qp,{children:[(0,Sr.jsxs)(Xp,{children:[(0,Sr.jsx)(ef,{htmlFor:"ntf-body",children:"Body"}),(0,Sr.jsxs)(tf,{$over:j,children:[a.length,"/",150]})]}),(0,Sr.jsx)(af,{id:"ntf-body",value:a,onChange:e=>o(e.target.value),placeholder:"Meeting at Hartley instead. Same time.",maxLength:200})]}),(0,Sr.jsxs)(Qp,{children:[(0,Sr.jsx)(ef,{htmlFor:"ntf-event",children:"Link to upcoming event (optional)"}),(0,Sr.jsxs)(of,{id:"ntf-event",value:v,onChange:e=>{const t=e.target.value;x(t),t&&l(`https://thescrambledlegs.com/events/${t}`)},children:[(0,Sr.jsx)("option",{value:"",children:"\u2014 No event link \u2014"}),T.map((e=>(0,Sr.jsxs)("option",{value:e.id,children:[vf(e.start)," \xb7 ",e.name||"(untitled)"]},e.id)))]})]}),(0,Sr.jsxs)(Qp,{children:[(0,Sr.jsx)(ef,{htmlFor:"ntf-url",children:"Click URL"}),(0,Sr.jsx)(rf,{id:"ntf-url",type:"url",value:s,onChange:e=>{l(e.target.value),x("")},placeholder:Zp}),(0,Sr.jsx)(df,{children:"Defaults to the home page if blank."})]}),(0,Sr.jsxs)(Qp,{children:[(0,Sr.jsx)(ef,{htmlFor:"ntf-tag",children:"Tag (optional)"}),(0,Sr.jsx)(rf,{id:"ntf-tag",type:"text",value:c,onChange:e=>d(e.target.value),placeholder:"ride-2026-04-30 (auto-generated if blank)"}),(0,Sr.jsx)(df,{children:"Re-using a tag replaces an earlier notification on the user's device."})]})]}),(0,Sr.jsxs)(Jp,{children:[(0,Sr.jsxs)(Qp,{children:[(0,Sr.jsx)(ef,{children:"Send mode"}),(0,Sr.jsxs)(sf,{role:"tablist",children:[(0,Sr.jsxs)(lf,{type:"button",role:"tab",$active:"all"===u,onClick:()=>h("all"),children:["All subscribers (",m.length,")"]}),(0,Sr.jsx)(lf,{type:"button",role:"tab",$active:"test"===u,onClick:()=>h("test"),children:"Test \u2192 one device"})]})]}),"test"===u&&(0,Sr.jsxs)(Qp,{children:[(0,Sr.jsx)(ef,{htmlFor:"ntf-test-token",children:"Pick a device"}),(0,Sr.jsxs)(of,{id:"ntf-test-token",value:p,onChange:e=>f(e.target.value),children:[(0,Sr.jsx)("option",{value:"",children:"\u2014 Choose subscriber \u2014"}),m.map((e=>(0,Sr.jsx)("option",{value:e.hash,children:yf(e)},e.hash)))]}),(0,Sr.jsx)(df,{children:"Sends only to the selected device. Useful for end-to-end QA before a real broadcast."})]}),(0,Sr.jsx)(cf,{type:"button",onClick:()=>{C(""),P||A?C("Title and body are required."):I||j?C("Title or body is too long."):"test"!==u||p?_(!0):C("Pick a device for test send.")},disabled:!N,children:k?"Sending\u2026":"test"===u?"Test send":`Send to ${m.length}`}),E&&(0,Sr.jsx)(uf,{role:"alert",children:E})]}),w&&(0,Sr.jsx)(hf,{onClick:()=>!k&&_(!1),children:(0,Sr.jsxs)(pf,{onClick:e=>e.stopPropagation(),children:[(0,Sr.jsx)(ff,{children:"test"===u?"Test send to one device?":`Send to ${R} subscribers?`}),(0,Sr.jsxs)(mf,{children:[(0,Sr.jsx)("strong",{children:r||"(no title)"}),(0,Sr.jsx)("br",{}),a||"(no body)"]}),(0,Sr.jsxs)("div",{children:[(0,Sr.jsx)(bf,{type:"button",onClick:()=>_(!1),disabled:k,children:"Cancel"}),(0,Sr.jsx)(gf,{type:"button",onClick:async()=>{S(!0),C("");try{if(!Nr.j2.currentUser)throw new Error("Not signed in.");const e=await Nr.j2.currentUser.getIdToken(),t={title:r.trim(),body:a.trim(),clickUrl:(s||Zp).trim(),tag:c.trim()||void 0,testTokenHash:"test"===u?p:void 0},h=await fetch("https://us-central1-fundraiser-f0831.cloudfunctions.net/sendPush",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(t)}),f=await h.json().catch((()=>({})));if(!h.ok)throw new Error(f.error||`Send failed (${h.status}).`);const m=f.notifId;i(""),o(""),l(""),d(""),x(""),_(!1),n&&n(m)}catch(e){const t=e&&e.message||"Send failed. Check the Cloud Function logs.";C(t),_(!1)}finally{S(!1)}},disabled:k,children:k?"Sending\u2026":"Send"})]}),E&&(0,Sr.jsx)(uf,{role:"alert",children:E})]})})]})},wf=xr.section`
  background: rgba(255,199,44,0.06);
  border: 1px solid rgba(255,199,44,0.30);
  border-radius: 16px;
  padding: 16px 14px;
  margin-bottom: 16px;
`,_f=xr.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 16px;
  margin: 0 0 12px;
  color: #FFC72C;
`,kf=xr.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 12px;
`,Sf=xr.div`
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
`,Ef=xr.div`
  position: relative;
  height: 8px;
  background: rgba(255,255,255,0.08);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
`,Cf=xr.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${e=>e.$pct}%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  transition: width 0.4s ease;
`,Tf=xr.div`
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
`,If=xr.button`
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
`;const jf=function(e){let{notifId:n,onDismiss:r}=e;const[i,a]=(0,t.useState)(null);if((0,t.useEffect)((()=>{if(!n)return;const e=function(e,t){const n=(0,Ar.ref)(Nr.OO,`notifications/${e}`),r=n=>{const r=n.val();t(r?{id:e,...r}:null)};return(0,Ar.Zy)(n,r),()=>(0,Ar.AU)(n,"value",r)}(n,a);return()=>e&&e()}),[n]),!n)return null;if(!i)return(0,Sr.jsxs)(wf,{children:[(0,Sr.jsx)(_f,{children:"\u2709\ufe0f Sending\u2026"}),(0,Sr.jsxs)(Tf,{$done:!1,children:[(0,Sr.jsx)("span",{children:"Waiting for first update\u2026"}),(0,Sr.jsx)("span",{className:"badge",children:"connecting"})]})]});const o=i.recipients||0,s=i.accepted||0,l=i.failed||0,c=i.opened||0,d=i.status||"sending",u="sent"===d,h=s+l,p=o>0?Math.min(100,Math.round(h/o*100)):u?100:0;return(0,Sr.jsxs)(wf,{children:[(0,Sr.jsxs)(_f,{children:[u?"\u2705 Done":"\u2709\ufe0f Sending\u2026"," \u2014 \u201c",i.title||"untitled","\u201d"]}),(0,Sr.jsxs)(kf,{children:[(0,Sr.jsxs)(Sf,{children:[(0,Sr.jsx)("div",{className:"label",children:"Recipients"}),(0,Sr.jsx)("div",{className:"num",children:o})]}),(0,Sr.jsxs)(Sf,{children:[(0,Sr.jsx)("div",{className:"label",children:"Accepted"}),(0,Sr.jsx)("div",{className:"num",children:s})]}),(0,Sr.jsxs)(Sf,{children:[(0,Sr.jsx)("div",{className:"label",children:"Failed"}),(0,Sr.jsx)("div",{className:"num",children:l})]}),(0,Sr.jsxs)(Sf,{children:[(0,Sr.jsx)("div",{className:"label",children:"Opened"}),(0,Sr.jsx)("div",{className:"num",children:c})]})]}),(0,Sr.jsx)(Ef,{children:(0,Sr.jsx)(Cf,{$pct:p})}),(0,Sr.jsxs)(Tf,{$done:u,children:[(0,Sr.jsx)("span",{children:u?"Batch finished. Opens trickle in over time.":"FCM is processing\u2026"}),(0,Sr.jsx)("span",{className:"badge",children:d})]}),u&&(0,Sr.jsx)(If,{type:"button",onClick:r,children:"Done"})]})},Pf=xr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Af=xr.div`
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
`,Nf=xr.div`
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
  overflow: hidden;
`,Rf=xr.button`
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
`,Of=xr.div`
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
`,Df=xr.div`
  display: flex;
  gap: 6px;
  margin: 8px 0 6px;
  flex-wrap: wrap;
`,Mf=xr.button`
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
`,Lf=xr.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Ff=xr.div`
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
`,zf=xr.div`
  text-align: center;
  padding: 28px 16px;
  border: 1px dashed rgba(255,255,255,0.10);
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  color: rgba(255,255,255,0.55);
  font-size: 13px;

  .em { font-size: 30px; margin-bottom: 6px; opacity: 0.7; }
`;function $f(e){if(!e)return"\u2014";const t=new Date(e);return new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(t)}function Uf(e){const t=e.recipients||0,n=e.accepted||0,r=e.failed||0,i=e.opened||0;return`${t} sent \xb7 ${n} accepted \xb7 ${r} failed \xb7 ${i} opened (${n>0?Math.round(i/n*100):0}%)`}function Bf(e){let{notif:n}=e;const[r,i]=(0,t.useState)(!1),[a,o]=(0,t.useState)("all"),s=(0,t.useMemo)((()=>n.deliveries?Object.entries(n.deliveries).map((e=>{let[t,n]=e;return{hash:t,...n}})):[]),[n.deliveries]),l=(0,t.useMemo)((()=>"opened"===a?s.filter((e=>e.opened)):"failed"===a?s.filter((e=>"failure"===e.result)):s),[s,a]);return(0,Sr.jsxs)(Nf,{children:[(0,Sr.jsxs)(Rf,{type:"button",onClick:()=>i((e=>!e)),children:[(0,Sr.jsxs)("div",{className:"top",children:[(0,Sr.jsx)("span",{className:"ts",children:$f(n.sentAt)}),n.isTest&&(0,Sr.jsx)("span",{className:"badge",children:"Test"})]}),(0,Sr.jsx)("div",{className:"title",children:n.title||"(untitled)"}),(0,Sr.jsx)("div",{className:"body",children:n.body||""}),(0,Sr.jsx)("div",{className:"stats",children:Uf(n)})]}),r&&(0,Sr.jsxs)(Of,{children:[(0,Sr.jsxs)("div",{className:"pair",children:[(0,Sr.jsx)("span",{className:"k",children:"Status"}),(0,Sr.jsx)("span",{className:"v",children:n.status||"\u2014"})]}),(0,Sr.jsxs)("div",{className:"pair",children:[(0,Sr.jsx)("span",{className:"k",children:"Click URL"}),(0,Sr.jsx)("span",{className:"v",children:(0,Sr.jsx)("a",{href:n.clickUrl,target:"_blank",rel:"noreferrer",children:n.clickUrl})})]}),(0,Sr.jsxs)("div",{className:"pair",children:[(0,Sr.jsx)("span",{className:"k",children:"Tag"}),(0,Sr.jsx)("span",{className:"v",children:n.tag||"\u2014"})]}),(0,Sr.jsxs)("div",{className:"pair",children:[(0,Sr.jsx)("span",{className:"k",children:"Sent by"}),(0,Sr.jsx)("span",{className:"v",children:n.sentBy||"\u2014"})]}),(0,Sr.jsxs)(Df,{children:[(0,Sr.jsxs)(Mf,{type:"button",$active:"all"===a,onClick:()=>o("all"),children:["All (",s.length,")"]}),(0,Sr.jsxs)(Mf,{type:"button",$active:"opened"===a,onClick:()=>o("opened"),children:["Opened (",s.filter((e=>e.opened)).length,")"]}),(0,Sr.jsxs)(Mf,{type:"button",$active:"failed"===a,onClick:()=>o("failed"),children:["Failed (",s.filter((e=>"failure"===e.result)).length,")"]})]}),0===s.length?(0,Sr.jsx)(zf,{children:"No per-device records yet."}):(0,Sr.jsx)(Lf,{children:l.map((e=>{return(0,Sr.jsxs)(Ff,{title:e.errorCode||"",children:[(0,Sr.jsx)("span",{className:"icon",children:(n=e.platform,"ios"===n?"\ud83c\udf4e":"android"===n?"\ud83e\udd16":"desktop"===n?"\ud83d\udda5":"\ud83c\udf10")}),(0,Sr.jsx)("span",{className:"hash",children:(t=e.hash,(t||"").slice(0,8))}),(0,Sr.jsxs)("span",{className:"ua",children:[e.opened?(0,Sr.jsxs)("span",{className:"opened",children:["opened ",$f(e.openedAt)," \xb7 "]}):null,$f(e.sentAt)]}),(0,Sr.jsx)("span",{className:"res "+("success"===e.result?"success":"failure"),children:e.result||"\u2014"})]},e.hash);var t,n}))})]})]})}const Wf=function(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)(!0),[a,o]=(0,t.useState)(!1);(0,t.useEffect)((()=>{const e=function(e){const t=(0,Ar.ref)(Nr.OO,"notifications"),n=t=>{const n=[];t.forEach((e=>{const t=e.val()||{};n.push({id:e.key,...t})})),n.sort(((e,t)=>(t.sentAt||0)-(e.sentAt||0))),e(n)};return(0,Ar.Zy)(t,n),()=>(0,Ar.AU)(t,"value",n)}((e=>{n(e),i(!1)}));return()=>e&&e()}),[]);const s=(0,t.useMemo)((()=>a?e:function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:365;const n=Date.now()-864e5*t;return e.filter((e=>(e.sentAt||0)>=n))}(e,365)),[e,a]);return(0,Sr.jsxs)(Pf,{children:[(0,Sr.jsx)(Af,{children:"History"}),r?(0,Sr.jsx)("div",{style:{padding:"20px 0",textAlign:"center",color:"rgba(255,255,255,0.55)"},children:"Loading\u2026"}):0===s.length?(0,Sr.jsxs)(zf,{children:[(0,Sr.jsx)("div",{className:"em",children:"\ud83d\udced"}),"No notifications sent yet."]}):s.map((e=>(0,Sr.jsx)(Bf,{notif:e},e.id))),!r&&e.length>s.length&&(0,Sr.jsx)(Mf,{type:"button",$active:a,onClick:()=>o((e=>!e)),style:{alignSelf:"center",marginTop:8},children:a?"Last 365 days only":`Show all (${e.length})`})]})};const Hf=function(){const[e,n]=(0,t.useState)(null);return(0,Sr.jsxs)("div",{children:[e&&(0,Sr.jsx)(jf,{notifId:e,onDismiss:()=>n(null)}),(0,Sr.jsx)(xf,{onSent:e=>n(e)}),(0,Sr.jsx)(Wf,{})]})},Vf=xr.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`,qf=xr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`,Gf=xr.div`
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
`,Kf=xr.span`
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
`,Yf=xr.input`
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
`,Zf=xr.button`
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
`,Jf=xr.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  overflow: hidden;
`,Qf=xr.table`
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
`,Xf=xr.div`
  padding: 48px 20px;
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 14px;
  border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 14px;

  .emoji { font-size: 28px; display: block; margin-bottom: 8px; }
`,em=xr.div`
  padding: 40px 0;
  text-align: center;
  color: rgba(255,255,255,0.55);
`;function tm(e){if(!e)return"\u2014";const t=new Date(e);return new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(t)}function nm(e){const t=String(null==e?"":e);return/[",\n]/.test(t)?`"${t.replace(/"/g,'""')}"`:t}const rm=function(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)(!0),[a,o]=(0,t.useState)(""),[s,l]=(0,t.useState)("timestamp"),[c,d]=(0,t.useState)("desc");(0,t.useEffect)((()=>{const e=(0,Ar.ref)(Nr.OO,"newsletterRegistrants"),t=(0,Ar.Zy)(e,(e=>{const t=e.val()||{},r=Object.entries(t).map((e=>{let[t,n]=e;return{id:t,name:n.name||"",email:n.email||"",timestamp:n.timestamp||0}}));n(r),i(!1)}),(()=>i(!1)));return()=>t()}),[]);const u=(0,t.useMemo)((()=>{const t=a.trim().toLowerCase();let n=e;t&&(n=n.filter((e=>e.name.toLowerCase().includes(t)||e.email.toLowerCase().includes(t))));const r="asc"===c?1:-1;return n=[...n].sort(((e,t)=>{const n=e[s],i=t[s];return"number"===typeof n&&"number"===typeof i?(n-i)*r:String(n).localeCompare(String(i))*r})),n}),[e,a,s,c]),h=e=>{s===e?d("asc"===c?"desc":"asc"):(l(e),d("timestamp"===e?"desc":"asc"))},p=e=>s!==e?"":"asc"===c?" \u2191":" \u2193";return r?(0,Sr.jsx)(em,{children:"Loading signups\u2026"}):(0,Sr.jsxs)(Vf,{children:[(0,Sr.jsxs)(Gf,{children:["Newsletter Signups ",(0,Sr.jsx)(Kf,{children:e.length})]}),(0,Sr.jsxs)(qf,{children:[(0,Sr.jsx)(Yf,{type:"search",placeholder:"Search name or email\u2026",value:a,onChange:e=>o(e.target.value)}),(0,Sr.jsx)(Zf,{type:"button",onClick:()=>function(e){const t=[["Name","Email","Submitted"].join(",")];e.forEach((e=>{t.push([nm(e.name),nm(e.email),nm(e.timestamp?new Date(e.timestamp).toISOString():"")].join(","))}));const n=new Blob([t.join("\n")],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=`scrambled-legs-signups-${(new Date).toISOString().slice(0,10)}.csv`,i.click(),setTimeout((()=>URL.revokeObjectURL(r)),500)}(u),disabled:0===u.length,children:"Export CSV"})]}),0===e.length?(0,Sr.jsxs)(Xf,{children:[(0,Sr.jsx)("span",{className:"emoji",children:"\ud83d\udced"}),"No signups yet. When folks join via the form on the home page, they'll show up here."]}):0===u.length?(0,Sr.jsxs)(Xf,{children:[(0,Sr.jsx)("span",{className:"emoji",children:"\ud83d\udd0d"}),'No matches for "',a,'".']}):(0,Sr.jsx)(Jf,{children:(0,Sr.jsxs)(Qf,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsxs)("th",{onClick:()=>h("name"),children:["Name",p("name")]}),(0,Sr.jsxs)("th",{onClick:()=>h("email"),children:["Email",p("email")]}),(0,Sr.jsxs)("th",{onClick:()=>h("timestamp"),children:["Submitted",p("timestamp")]})]})}),(0,Sr.jsx)("tbody",{children:u.map((e=>(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("td",{className:"name",children:e.name||"\u2014"}),(0,Sr.jsx)("td",{className:"email",children:e.email?(0,Sr.jsx)("a",{href:`mailto:${e.email}`,children:e.email}):"\u2014"}),(0,Sr.jsx)("td",{className:"date",children:tm(e.timestamp)})]},e.id)))})]})})]})},im=xr.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`,am=xr.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`,om=xr.div`
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
`,sm=xr.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #FFC72C;
  background: rgba(255,199,44,0.10);
  border: 1px solid rgba(255,199,44,0.25);
  padding: 4px 10px;
  border-radius: 999px;
`,lm=xr.input`
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
`,cm=xr.button`
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
`,dm=xr.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  overflow: auto;
`,um=xr.table`
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
`,hm=xr.div`
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
`,pm=xr.span`
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
`,fm=xr.div`
  padding: 48px 20px;
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 14px;
  border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 14px;
  .emoji { font-size: 28px; display: block; margin-bottom: 8px; }
`,mm=xr.div`
  padding: 40px 0;
  text-align: center;
  color: rgba(255,255,255,0.55);
`,gm=_r`from { opacity: 0; } to { opacity: 1; }`,bm=_r`from { transform: translateY(100%); } to { transform: translateY(0); }`,ym=xr.div`
  position: fixed;
  inset: 0;
  z-index: 2150;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`,vm=xr.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  pointer-events: auto;
  animation: ${gm} 0.2s ease;
`,xm=xr.div`
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
  animation: ${bm} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.55);
`,wm=xr.button`
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
`,_m=xr.div`
  padding: 28px 18px 0;
`,km=xr.h2`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  margin: 0 0 16px;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,Sm=xr.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
`,Em=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
  margin: 0 0 10px;
`,Cm=xr.button`
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
`,Tm=xr.button`
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
`,Im=xr.button`
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
`,jm=xr.input`
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
`,Pm=xr.div` font-size: 12px; color: #FF8E8E; margin-top: 8px; `,Am=xr.div` font-size: 12px; color: #FFE66D; margin-top: 8px; `,Nm=xr.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`,Rm=xr.div`
  flex: 1;
  min-width: 120px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  .v { font-family: 'Fredoka', sans-serif; font-size: 22px; color: #FFE66D; }
  .l { font-size: 11px; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.10em; }
`,Om=xr.div`
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
`;function Dm(e){if(!e)return"\u2014";const t=new Date(e);return new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(t)}function Mm(e){const t=String(null==e?"":e);return/[",\n]/.test(t)?`"${t.replace(/"/g,'""')}"`:t}function Lm(e){return!!e&&Vo.includes(e.toLowerCase())}function Fm(e){if(!e||e<0)return"\u2014";const t=Math.floor(e/1e3);if(t<60)return`${t}s`;const n=Math.floor(t/60);if(n<60)return`${n}m`;return`${Math.floor(n/60)}h ${n%60}m`}function zm(e){let{user:n,mashByEvent:r,rsvpsByEvent:i,eventsById:a,sessions:o,analytics:s,onClose:l,onDeleted:c}=e;const[d,u]=(0,t.useState)(!1),[h,p]=(0,t.useState)(n.displayName||""),[f,m]=(0,t.useState)(!1),[g,b]=(0,t.useState)(""),[y,v]=(0,t.useState)(""),x=n.blurb?"":(function(e){if(!e)return null;const t=[e.name,e.displayName,e.email].map(Ga).filter(Boolean);if(0===t.length)return null;for(const n of qa){const e=[n.name,...n.aliases||[],...n.emails||[]].map(Ga);for(const r of t){if(e.includes(r))return n;for(const t of e)if(t&&r&&(r.includes(t)||t.includes(r))&&Math.min(t.length,r.length)>=4)return n}}return null}(n)||{}).blurb||"",[w,_]=(0,t.useState)(n.blurb||x),[k,S]=(0,t.useState)(!1),[E,C]=(0,t.useState)(n.gender||""),[T,I]=(0,t.useState)(!1),[j,P]=(0,t.useState)(!1),A=(0,t.useRef)(null),[N,R]=(0,t.useState)(!1),[O,D]=(0,t.useState)(!1),[M,L]=(0,t.useState)(!1),[F,z]=(0,t.useState)(""),[$,U]=(0,t.useState)(!1),[B,W]=(0,t.useState)(null);(0,t.useEffect)((()=>{function e(e){"Escape"===e.key&&l()}window.addEventListener("keydown",e);const t=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",e),document.body.style.overflow=t}}),[l]);const H=Lm(n.email),V=(0,t.useMemo)((()=>{const e=[];return Object.entries(r||{}).forEach((t=>{let[r,i]=t;const a=i&&i[n.uid];"number"===typeof a&&a>0&&e.push({eventId:r,mashes:a})})),e}),[r,n.uid]),q=(0,t.useMemo)((()=>{const e=[];return Object.entries(i||{}).forEach((t=>{let[r,i]=t;i&&i[n.uid]&&e.push({eventId:r,rsvp:i[n.uid]})})),e}),[i,n.uid]),G=V.reduce(((e,t)=>e+t.mashes),0),K=(0,t.useMemo)((()=>{const e=(o||[]).filter((e=>e.uid===n.uid)),t=new Set;let r=0,i=0,a=0;e.forEach((e=>{e.deviceId&&t.add(e.deviceId);const n=e.startedAt||0,o=e.endedAt||e.lastActiveAt||0;n&&o>n&&(r+=o-n,i+=1),n>a&&(a=n)}));const s=i>0?Math.round(r/i):0;return{count:e.length,avgDur:s,lastSession:a,deviceCount:t.size}}),[o,n.uid]),Y=(0,t.useMemo)((()=>(s||[]).filter((e=>"page_view"===e.name&&e.uid===n.uid)).length),[s,n.uid]),Z=(0,t.useMemo)((()=>q.map((e=>{const t=a[e.eventId],n=V.find((t=>t.eventId===e.eventId));return{eventId:e.eventId,name:t&&t.name||e.eventId,start:t&&t.start,mashes:n?n.mashes:0}})).sort(((e,t)=>(t.start||0)-(e.start||0)))),[q,V,a]),J=n.devices?Object.entries(n.devices):[];return(0,Sr.jsxs)(ym,{children:[(0,Sr.jsx)(vm,{onClick:l}),(0,Sr.jsxs)(xm,{onClick:e=>e.stopPropagation(),role:"dialog","aria-label":"User detail",children:[(0,Sr.jsx)(wm,{type:"button","aria-label":"Close",onClick:l,children:"\xd7"}),(0,Sr.jsxs)(_m,{children:[(0,Sr.jsx)(km,{children:"User"}),(0,Sr.jsxs)(Sm,{children:[(0,Sr.jsx)(Em,{children:"Identity"}),(0,Sr.jsxs)("div",{style:{display:"flex",gap:14,alignItems:"center",marginBottom:12},children:[(0,Sr.jsxs)("div",{style:{position:"relative",flexShrink:0},children:[(0,Sr.jsx)(hm,{style:{width:64,height:64,fontSize:28},$photo:n.photoURL,children:!n.photoURL&&(n.displayName||n.email||"?").charAt(0)}),(0,Sr.jsx)("button",{type:"button",disabled:j,onClick:()=>A.current&&A.current.click(),title:"Upload profile photo",style:{position:"absolute",inset:0,borderRadius:"50%",background:j?"rgba(0,0,0,0.55)":"rgba(0,0,0,0)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,transition:"background 0.15s",color:"#fff"},onMouseEnter:e=>e.currentTarget.style.background="rgba(0,0,0,0.55)",onMouseLeave:e=>!j&&(e.currentTarget.style.background="rgba(0,0,0,0)"),children:j?"\u2026":"\ud83d\udcf7"}),(0,Sr.jsx)("input",{ref:A,type:"file",accept:"image/*",style:{display:"none"},onChange:async e=>{const t=e.target.files&&e.target.files[0];if(t)if(t.type.startsWith("image/"))if(t.size>5242880)b("Image must be under 5 MB.");else{b(""),v(""),P(!0);try{let e,r;if("image/gif"===t.type)e=t,r="image/gif";else{const n="image/png"===t.type;r=n?"image/png":"image/jpeg",e=await new Promise(((e,i)=>{const a=new Image;a.onerror=i,a.onload=()=>{const t=Math.min(1,512/Math.max(a.width,a.height)),o=Math.round(a.width*t),s=Math.round(a.height*t),l=document.createElement("canvas");l.width=o,l.height=s,l.getContext("2d").drawImage(a,0,0,o,s),l.toBlob((t=>t?e(t):i(new Error("Compression failed"))),r,n?void 0:.8),URL.revokeObjectURL(a.src)},a.src=URL.createObjectURL(t)}))}const i=`profilePics/${n.uid}`,a=(0,Hh.KR)(Nr.IG,i);await(0,Hh.D)(a,e,{contentType:r});const o=await(0,Hh.qk)(a);await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),{photoURL:o}),v("Photo updated.")}catch(e){b(e&&e.message||"Upload failed")}finally{P(!1),A.current&&(A.current.value="")}}else b("File must be an image.")}})]}),(0,Sr.jsx)("div",{style:{flex:1,minWidth:0},children:d?(0,Sr.jsxs)("div",{style:{display:"flex",gap:6},children:[(0,Sr.jsx)(jm,{type:"text",value:h,maxLength:30,onChange:e=>p(e.target.value)}),(0,Sr.jsx)(Cm,{type:"button",disabled:f,onClick:async()=>{b(""),v("");const e=h.trim();if(e.length<1||e.length>30)b("Name must be 1\u201330 characters");else try{m(!0),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),{displayName:e}),u(!1),v("Saved.")}catch(vy){b(vy&&vy.message||"Save failed")}finally{m(!1)}},children:f?"\u2026":"Save"}),(0,Sr.jsx)(Tm,{type:"button",onClick:()=>{u(!1),p(n.displayName||"")},children:"Cancel"})]}):(0,Sr.jsxs)("div",{children:[(0,Sr.jsxs)("div",{style:{color:"#fff",fontWeight:700,fontSize:16},children:[n.displayName||"\u2014"," ",(0,Sr.jsx)("button",{type:"button",onClick:()=>{p(n.displayName||""),u(!0)},style:{background:"none",border:"none",color:"#FFC72C",cursor:"pointer",fontSize:11,marginLeft:6,textDecoration:"underline"},children:"edit"})]}),(0,Sr.jsx)("div",{style:{color:"rgba(255,255,255,0.65)",fontSize:13},children:n.email||"\u2014"}),(0,Sr.jsxs)("div",{style:{color:"rgba(255,255,255,0.45)",fontSize:11,marginTop:4},children:["Created ",Dm(n.createdAt)," \xb7 Last seen ",Dm(n.lastSeenAt)]})]})})]})]}),(0,Sr.jsxs)(Sm,{children:[(0,Sr.jsx)(Em,{children:"Crew Profile"}),x&&!n.blurb&&(0,Sr.jsx)("div",{style:{fontSize:11,color:"#FFC72C",marginBottom:8},children:"\u2726 Pre-filled from crew roster \u2014 save to confirm"}),(0,Sr.jsxs)("div",{style:{marginBottom:12},children:[(0,Sr.jsx)("div",{style:{fontSize:11,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6},children:"Gender"}),(0,Sr.jsx)("div",{style:{display:"flex",gap:8},children:["male","female","non-binary"].map((e=>(0,Sr.jsx)("button",{type:"button",disabled:T,onClick:()=>(async e=>{b(""),v("");try{I(!0),C(e),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),{gender:e}),v("Gender saved.")}catch(vy){b(vy&&vy.message||"Save failed")}finally{I(!1)}})(e),style:{padding:"5px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,textTransform:"capitalize",background:E===e?"#FFC72C":"rgba(255,255,255,0.08)",color:E===e?"#000":"rgba(255,255,255,0.7)"},children:e},e)))})]}),(0,Sr.jsx)("div",{style:{fontSize:11,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6},children:"Blurb (fed to Eggman)"}),(0,Sr.jsx)("textarea",{rows:4,value:w,onChange:e=>_(e.target.value),placeholder:"Character description for Eggman's roasts\u2026",style:{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,color:"#fff",fontSize:13,padding:"8px 10px",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box"}}),(0,Sr.jsx)("div",{style:{marginTop:8},children:(0,Sr.jsx)(Cm,{type:"button",disabled:k,onClick:async()=>{b(""),v("");try{S(!0),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),{blurb:w.trim()}),v("Blurb saved.")}catch(vy){b(vy&&vy.message||"Save failed")}finally{S(!1)}},children:k?"\u2026":"Save blurb"})})]}),(0,Sr.jsxs)(Sm,{children:[(0,Sr.jsx)(Em,{children:"Activity"}),(0,Sr.jsxs)(Nm,{children:[(0,Sr.jsxs)(Rm,{children:[(0,Sr.jsx)("div",{className:"v",children:G}),(0,Sr.jsx)("div",{className:"l",children:"Total mashes"})]}),(0,Sr.jsxs)(Rm,{children:[(0,Sr.jsx)("div",{className:"v",children:q.length}),(0,Sr.jsx)("div",{className:"l",children:"RSVPs"})]}),(0,Sr.jsxs)(Rm,{children:[(0,Sr.jsx)("div",{className:"v",children:J.length}),(0,Sr.jsx)("div",{className:"l",children:"Devices"})]})]}),Z.length>0&&(0,Sr.jsxs)("div",{style:{marginTop:8},children:[(0,Sr.jsx)("div",{style:{fontSize:11,color:"rgba(255,255,255,0.45)",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.10em"},children:"Events"}),Z.map((e=>(0,Sr.jsxs)("div",{style:{padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",fontSize:12,display:"flex",justifyContent:"space-between"},children:[(0,Sr.jsx)("span",{style:{color:"#f4f4f4"},children:e.name}),(0,Sr.jsxs)("span",{style:{color:"rgba(255,255,255,0.55)"},children:[e.mashes," mash",1===e.mashes?"":"es"]})]},e.eventId)))]})]}),(0,Sr.jsxs)(Sm,{children:[(0,Sr.jsx)(Em,{children:"Sessions"}),(0,Sr.jsxs)(Nm,{children:[(0,Sr.jsxs)(Rm,{children:[(0,Sr.jsx)("div",{className:"v",children:K.count}),(0,Sr.jsx)("div",{className:"l",children:"Total sessions"})]}),(0,Sr.jsxs)(Rm,{children:[(0,Sr.jsx)("div",{className:"v",children:Fm(K.avgDur)}),(0,Sr.jsx)("div",{className:"l",children:"Avg duration"})]}),(0,Sr.jsxs)(Rm,{children:[(0,Sr.jsx)("div",{className:"v",children:K.deviceCount}),(0,Sr.jsx)("div",{className:"l",children:"Active devices"})]})]}),(0,Sr.jsxs)(Nm,{children:[(0,Sr.jsxs)(Rm,{children:[(0,Sr.jsx)("div",{className:"v",children:Y}),(0,Sr.jsx)("div",{className:"l",children:"Page views (lifetime)"})]}),(0,Sr.jsxs)(Rm,{children:[(0,Sr.jsx)("div",{className:"v",style:{fontSize:14},children:K.lastSession?Dm(K.lastSession):"\u2014"}),(0,Sr.jsx)("div",{className:"l",children:"Last session"})]})]})]}),(0,Sr.jsxs)(Sm,{children:[(0,Sr.jsx)(Em,{children:"Devices"}),0===J.length?(0,Sr.jsx)("div",{style:{color:"rgba(255,255,255,0.45)",fontSize:13},children:"No devices registered."}):J.map((e=>{let[t,r]=e;return(0,Sr.jsxs)(Om,{children:[(0,Sr.jsxs)("div",{className:"meta",children:[(0,Sr.jsxs)("div",{className:"platform",children:[r&&r.platform||"unknown"," ",r&&r.notificationsEnabled?"\xb7 notifications on":""]}),(0,Sr.jsxs)("div",{className:"when",children:["Last seen ",Dm(r&&r.lastSeenAt)," \xb7 ",t.slice(0,8),"\u2026"]})]}),B===t?(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(Im,{type:"button",onClick:()=>(async e=>{b("");try{const t={};t[`fcmTokens/${e}`]=null,t[`userProfiles/${n.uid}/devices/${e}`]=null,await(0,Ar.yo)((0,Ar.ref)(Nr.OO),t),W(null),v("Device removed.")}catch(vy){b(vy&&vy.message||"Remove failed")}})(t),children:"Confirm"}),(0,Sr.jsx)(Tm,{type:"button",onClick:()=>W(null),children:"Cancel"})]}):(0,Sr.jsx)(Tm,{type:"button",onClick:()=>W(t),children:"Remove"})]},t)}))]}),(0,Sr.jsxs)(Sm,{children:[(0,Sr.jsx)(Em,{children:"Admin status"}),(0,Sr.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"},children:[(0,Sr.jsx)("div",{style:{flex:1,minWidth:200,fontSize:13,color:"rgba(255,255,255,0.78)"},children:H?(0,Sr.jsx)(Sr.Fragment,{children:"This is a designated admin email. Always admin (rule-locked)."}):n.isAdmin?(0,Sr.jsx)(Sr.Fragment,{children:"This user is an admin."}):(0,Sr.jsx)(Sr.Fragment,{children:"This user is not an admin."})}),!H&&(0,Sr.jsx)(Tm,{type:"button",disabled:O,onClick:async()=>{if(b(""),v(""),H)return;const e=!n.isAdmin;if(window.confirm(`${e?"Promote":"Demote"} ${n.displayName||n.email}? They will ${e?"gain":"lose"} admin access.`))try{D(!0),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),{isAdmin:e}),v("Updated.")}catch(vy){b(vy&&vy.message||"Update failed")}finally{D(!1)}},children:O?"\u2026":n.isAdmin?"Demote":"Promote"})]})]}),(0,Sr.jsxs)(Sm,{children:[(0,Sr.jsx)(Em,{children:"Actions"}),(0,Sr.jsx)("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:12},children:(0,Sr.jsx)(Cm,{type:"button",disabled:N,onClick:async()=>{if(b(""),v(""),n.email)try{R(!0),await Qo(n.email),v("Password reset email sent to "+n.email)}catch(vy){b(vy&&vy.message||"Send failed")}finally{R(!1)}else b("No email on file.")},children:N?"\u2026":"Send password reset"})}),M?(0,Sr.jsxs)("div",{children:[(0,Sr.jsxs)("div",{style:{fontSize:12,color:"#FF8E8E",marginBottom:8},children:["This will permanently delete the auth user, profile, RSVPs, mashes, and tokens. Type ",(0,Sr.jsx)("strong",{children:n.email})," to confirm."]}),(0,Sr.jsx)(jm,{type:"text",value:F,onChange:e=>z(e.target.value),placeholder:n.email,style:{marginBottom:8}}),(0,Sr.jsxs)("div",{style:{display:"flex",gap:8},children:[(0,Sr.jsx)(Im,{type:"button",disabled:$,onClick:async()=>{if(b(""),v(""),F.trim().toLowerCase()===(n.email||"").toLowerCase())try{if(U(!0),!Nr.j2.currentUser)throw new Error("Not signed in.");const e=await Nr.j2.currentUser.getIdToken(),t=await fetch("https://us-central1-fundraiser-f0831.cloudfunctions.net/deleteUser",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({uid:n.uid})}),r=await t.json().catch((()=>({})));if(!t.ok)throw new Error(r.error||`Delete failed (${t.status}).`);c&&c(n.uid),l()}catch(vy){b(vy&&vy.message||"Delete failed")}finally{U(!1)}else b("Email confirmation does not match.")},children:$?"Deleting\u2026":"Permanently delete"}),(0,Sr.jsx)(Tm,{type:"button",disabled:$,onClick:()=>{L(!1),z("")},children:"Cancel"})]})]}):(0,Sr.jsx)(Im,{type:"button",onClick:()=>L(!0),style:{width:"100%"},children:"Delete account"}),g&&(0,Sr.jsx)(Pm,{children:g}),y&&(0,Sr.jsx)(Am,{children:y})]})]})]})]})}const $m=function(){const[e,n]=(0,t.useState)({}),[r,i]=(0,t.useState)({}),[o,s]=(0,t.useState)({}),[l,c]=(0,t.useState)({}),[d,u]=(0,t.useState)([]),[h,p]=(0,t.useState)([]),[f,m]=(0,t.useState)(!0),[g,b]=(0,t.useState)(""),[y,v]=(0,t.useState)("lastSeenAt"),[x,w]=(0,t.useState)("desc"),[_,k]=(0,t.useState)(null);(0,t.useEffect)((()=>{const e=[{path:"userProfiles",set:n},{path:"eventMashTotals",set:i},{path:"rsvps",set:s},{path:"events",set:c}].map((e=>{let{path:t,set:n}=e;const r=(0,Ar.ref)(Nr.OO,t);return(0,Ar.Zy)(r,(e=>{n(e.val()||{}),"userProfiles"===t&&m(!1)}),(()=>{"userProfiles"===t&&m(!1)}))}));return()=>e.forEach((e=>e&&e()))}),[]),(0,t.useEffect)((()=>{const e=(0,Ar.P)((0,Ar.ref)(Nr.OO,"sessions"),(0,Ar.kT)("startedAt"),(0,Ar.$1)(1e3)),t=(0,Ar.Zy)(e,(e=>{const t=[];e.forEach((e=>t.push({key:e.key,...e.val()||{}}))),u(t)}),(()=>u([]))),n=(0,Ar.P)((0,Ar.ref)(Nr.OO,"analyticsEvents"),(0,Ar.kT)("ts"),(0,Ar.$1)(1e3)),r=(0,Ar.Zy)(n,(e=>{const t=[];e.forEach((e=>t.push({id:e.key,...e.val()||{}}))),p(t)}),(()=>p([])));return()=>{t(),r()}}),[]);const S=(0,t.useMemo)((()=>Object.entries(e).map((e=>{let[t,n]=e;const i=n||{};let a=0;Object.values(r||{}).forEach((e=>{const n=e&&e[t];"number"===typeof n&&(a+=n)}));let s=0;Object.values(o||{}).forEach((e=>{e&&e[t]&&(s+=1)}));const l=i.devices?Object.keys(i.devices).length:0,c=!0===i.isAdmin||Lm(i.email);return{uid:t,email:i.email||"",displayName:i.displayName||"",photoURL:i.photoURL||"",createdAt:i.createdAt||0,lastSeenAt:i.lastSeenAt||0,isAdmin:c,devices:i.devices||null,blurb:i.blurb||"",gender:i.gender||"",mashTotal:a,rsvpCount:s,deviceCount:l}}))),[e,r,o]),E=(0,t.useMemo)((()=>{const e=g.trim().toLowerCase();let t=S;e&&(t=t.filter((t=>t.displayName.toLowerCase().includes(e)||t.email.toLowerCase().includes(e))));const n="asc"===x?1:-1;return t=[...t].sort(((e,t)=>{const r=e[y],i=t[y];return"number"===typeof r&&"number"===typeof i?(r-i)*n:String(r||"").localeCompare(String(i||""))*n})),t}),[S,g,y,x]),C=e=>{if(y===e)w("asc"===x?"desc":"asc");else{v(e);w(["mashTotal","rsvpCount","deviceCount","lastSeenAt","createdAt"].includes(e)?"desc":"asc")}},T=e=>y===e?"asc"===x?" \u2191":" \u2193":"",I=_?S.find((e=>e.uid===_)):null;return f?(0,Sr.jsx)(mm,{children:"Loading users\u2026"}):(0,Sr.jsxs)(im,{children:[(0,Sr.jsxs)(om,{children:["Users ",(0,Sr.jsx)(sm,{children:S.length})]}),(0,Sr.jsxs)(am,{children:[(0,Sr.jsx)(lm,{type:"search",placeholder:"Search name or email\u2026",value:g,onChange:e=>b(e.target.value)}),(0,Sr.jsx)(cm,{type:"button",onClick:()=>function(e){const t=[["UID","Name","Email","IsAdmin","Mash Total","RSVPs","Devices","Created","Last Seen"].join(",")];e.forEach((e=>{t.push([Mm(e.uid),Mm(e.displayName),Mm(e.email),Mm(e.isAdmin?"yes":""),Mm(e.mashTotal),Mm(e.rsvpCount),Mm(e.deviceCount),Mm(e.createdAt?new Date(e.createdAt).toISOString():""),Mm(e.lastSeenAt?new Date(e.lastSeenAt).toISOString():"")].join(","))}));const n=new Blob([t.join("\n")],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=`scrambled-legs-users-${(new Date).toISOString().slice(0,10)}.csv`,i.click(),setTimeout((()=>URL.revokeObjectURL(r)),500)}(E),disabled:0===E.length,children:"Export CSV"})]}),0===S.length?(0,Sr.jsxs)(fm,{children:[(0,Sr.jsx)("span",{className:"emoji",children:"\ud83d\udc65"}),"No user profiles yet."]}):0===E.length?(0,Sr.jsxs)(fm,{children:[(0,Sr.jsx)("span",{className:"emoji",children:"\ud83d\udd0d"}),'No matches for "',g,'".']}):(0,Sr.jsx)(dm,{children:(0,Sr.jsxs)(um,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("th",{}),(0,Sr.jsxs)("th",{onClick:()=>C("displayName"),children:["Name",T("displayName")]}),(0,Sr.jsxs)("th",{onClick:()=>C("email"),children:["Email",T("email")]}),(0,Sr.jsxs)("th",{onClick:()=>C("mashTotal"),children:["Mashes",T("mashTotal")]}),(0,Sr.jsxs)("th",{onClick:()=>C("rsvpCount"),children:["RSVPs",T("rsvpCount")]}),(0,Sr.jsxs)("th",{onClick:()=>C("deviceCount"),children:["Devices",T("deviceCount")]}),(0,Sr.jsxs)("th",{onClick:()=>C("lastSeenAt"),children:["Last seen",T("lastSeenAt")]}),(0,Sr.jsx)("th",{})]})}),(0,Sr.jsx)("tbody",{children:E.map((e=>(0,Sr.jsxs)("tr",{onClick:()=>k(e.uid),children:[(0,Sr.jsx)("td",{children:(0,Sr.jsx)(hm,{$photo:e.photoURL,children:!e.photoURL&&(e.displayName||e.email||"?").charAt(0)})}),(0,Sr.jsx)("td",{className:"name",children:e.displayName||"\u2014"}),(0,Sr.jsx)("td",{className:"email",children:e.email||"\u2014"}),(0,Sr.jsx)("td",{className:"num",children:e.mashTotal}),(0,Sr.jsx)("td",{className:"num",children:e.rsvpCount}),(0,Sr.jsx)("td",{className:"num",children:e.deviceCount}),(0,Sr.jsx)("td",{className:"date",children:Dm(e.lastSeenAt)}),(0,Sr.jsx)("td",{children:e.isAdmin&&(0,Sr.jsx)(pm,{children:"Admin"})})]},e.uid)))})]})}),I&&a.createPortal((0,Sr.jsx)(zm,{user:I,mashByEvent:r,rsvpsByEvent:o,eventsById:l,sessions:d,analytics:h,onClose:()=>k(null),onDeleted:()=>k(null)}),document.body)]})},Um=xr.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,Bm=xr.div`
  display: flex;
  gap: 6px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 4px;
  flex-wrap: wrap;
`,Wm=xr.button`
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
`,Hm=xr.section`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 14px;
`,Vm=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 10px;
`,qm=xr.select`
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
`,Gm=xr.table`
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
`,Km=xr.button`
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
`,Ym=xr.div`
  padding: 20px;
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 12px;
`;function Zm(e){return e?new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(e)):"\u2014"}function Jm(e){const t=String(null==e?"":e);return/[",\n]/.test(t)?`"${t.replace(/"/g,'""')}"`:t}function Qm(e,t,n){const r=[t.map(Jm).join(",")];n.forEach((e=>r.push(e.map(Jm).join(","))));const i=new Blob([r.join("\n")],{type:"text/csv;charset=utf-8"}),a=URL.createObjectURL(i),o=document.createElement("a");o.href=a,o.download=e,o.click(),setTimeout((()=>URL.revokeObjectURL(a)),500)}function Xm(e){let{events:n}=e;const[r,i]=(0,t.useState)(""),[a,o]=(0,t.useState)({}),[s,l]=(0,t.useState)({}),[c,d]=(0,t.useState)({}),[u,h]=(0,t.useState)({});(0,t.useEffect)((()=>{const e=(0,Ar.ref)(Nr.OO,"userProfiles"),t=(0,Ar.Zy)(e,(e=>h(e.val()||{})));return()=>t()}),[]),(0,t.useEffect)((()=>{if(!r)return o({}),l({}),void d({});const e=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,`rsvps/${r}`),(e=>o(e.val()||{}))),t=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,`eventMashTotals/${r}`),(e=>l(e.val()||{}))),n=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,`mashSessions/${r}`),(e=>d(e.val()||{})));return()=>{e(),t(),n()}}),[r]);const p=n.find((e=>e.id===r)),f=p&&p.hotdogs||0,m=(0,t.useMemo)((()=>Object.values(s).reduce(((e,t)=>e+(t||0)),0)),[s]),g=Math.max(0,f-m),b=(0,t.useMemo)((()=>Object.entries(a).map((e=>{let[t,n]=e;return{uid:t,name:n&&n.displayName||u[t]&&u[t].displayName||t.slice(0,6),email:n&&n.email||u[t]&&u[t].email||"",rsvpedAt:n&&n.rsvpedAt||0,mashes:s[t]||0,sessionCount:c[t]&&Object.keys(c[t]).length||0}})).sort(((e,t)=>t.mashes-e.mashes||e.rsvpedAt-t.rsvpedAt))),[a,s,c,u]),y=(0,t.useMemo)((()=>Object.entries(s).filter((e=>{let[t,n]=e;return!a[t]&&(n||0)>=10})).map((e=>{let[t,n]=e;return{uid:t,name:u[t]&&u[t].displayName||t.slice(0,6),email:u[t]&&u[t].email||"",mashes:n}})).sort(((e,t)=>t.mashes-e.mashes))),[s,a,u]);return(0,Sr.jsx)("div",{children:(0,Sr.jsxs)(Hm,{children:[(0,Sr.jsx)(Vm,{children:"Pick an event"}),(0,Sr.jsxs)(qm,{value:r,onChange:e=>i(e.target.value),children:[(0,Sr.jsx)("option",{value:"",children:"\u2014 Choose event \u2014"}),n.map((e=>(0,Sr.jsxs)("option",{value:e.id,children:[Zm(e.start)," \xb7 ",e.name||"(untitled)"]},e.id)))]}),r&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(Vm,{children:["RSVPs \xb7 ",b.length," \xb7 Anonymous mashes: ",g]}),(0,Sr.jsx)(Km,{type:"button",onClick:()=>Qm(`engagement-rsvps-${r}.csv`,["Name","Email","RSVP at","Mashes","Sessions"],b.map((e=>[e.name,e.email,e.rsvpedAt?new Date(e.rsvpedAt).toISOString():"",e.mashes,e.sessionCount]))),children:"Export CSV"}),0===b.length?(0,Sr.jsx)(Ym,{children:"No RSVPs yet."}):(0,Sr.jsxs)(Gm,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("th",{children:"Name"}),(0,Sr.jsx)("th",{children:"Email"}),(0,Sr.jsx)("th",{children:"RSVP at"}),(0,Sr.jsx)("th",{className:"num",children:"Mashes"}),(0,Sr.jsx)("th",{className:"num",children:"Sessions"})]})}),(0,Sr.jsx)("tbody",{children:b.map((e=>(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("td",{children:e.name}),(0,Sr.jsx)("td",{children:e.email}),(0,Sr.jsx)("td",{children:Zm(e.rsvpedAt)}),(0,Sr.jsx)("td",{className:"num",children:e.mashes}),(0,Sr.jsx)("td",{className:"num",children:e.sessionCount})]},e.uid)))})]}),(0,Sr.jsxs)(Vm,{style:{marginTop:16},children:["Bad Eggs \xb7 ",y.length]}),0===y.length?(0,Sr.jsx)(Ym,{children:"None."}):(0,Sr.jsxs)(Gm,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("th",{children:"Name"}),(0,Sr.jsx)("th",{children:"Email"}),(0,Sr.jsx)("th",{className:"num",children:"Mashes"})]})}),(0,Sr.jsx)("tbody",{children:y.map((e=>(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("td",{children:e.name}),(0,Sr.jsx)("td",{children:e.email}),(0,Sr.jsx)("td",{className:"num",children:e.mashes})]},e.uid)))})]})]})]})})}function eg(){const[e,n]=(0,t.useState)({}),[r,i]=(0,t.useState)({}),[a,o]=(0,t.useState)({});(0,t.useEffect)((()=>{const e=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"userProfiles"),(e=>n(e.val()||{}))),t=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"eventMashTotals"),(e=>i(e.val()||{}))),r=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"rsvps"),(e=>o(e.val()||{})));return()=>{e(),t(),r()}}),[]);const s=(0,t.useMemo)((()=>{const t={};return Object.entries(e).forEach((e=>{let[n,r]=e;t[n]={uid:n,name:r.displayName||n.slice(0,6),email:r.email||"",lastSeenAt:r.lastSeenAt||0,lifetimeMashes:0,rsvpCount:0}})),Object.values(r).forEach((e=>{Object.entries(e||{}).forEach((e=>{let[n,r]=e;t[n]||(t[n]={uid:n,name:n.slice(0,6),email:"",lastSeenAt:0,lifetimeMashes:0,rsvpCount:0}),t[n].lifetimeMashes+=r||0}))})),Object.values(a).forEach((e=>{Object.keys(e||{}).forEach((e=>{t[e]||(t[e]={uid:e,name:e.slice(0,6),email:"",lastSeenAt:0,lifetimeMashes:0,rsvpCount:0}),t[e].rsvpCount+=1}))})),Object.values(t).sort(((e,t)=>t.lifetimeMashes-e.lifetimeMashes))}),[e,r,a]);return(0,Sr.jsxs)(Hm,{children:[(0,Sr.jsxs)(Vm,{children:["Users \xb7 ",s.length]}),(0,Sr.jsx)(Km,{type:"button",onClick:()=>Qm("engagement-users.csv",["Name","Email","Lifetime mashes","RSVP count","Last seen"],s.map((e=>[e.name,e.email,e.lifetimeMashes,e.rsvpCount,e.lastSeenAt?new Date(e.lastSeenAt).toISOString():""]))),children:"Export CSV"}),0===s.length?(0,Sr.jsx)(Ym,{children:"No users yet."}):(0,Sr.jsxs)(Gm,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("th",{children:"Name"}),(0,Sr.jsx)("th",{children:"Email"}),(0,Sr.jsx)("th",{className:"num",children:"Lifetime \ud83c\udf2d"}),(0,Sr.jsx)("th",{className:"num",children:"RSVPs"}),(0,Sr.jsx)("th",{children:"Last seen"})]})}),(0,Sr.jsx)("tbody",{children:s.map((e=>(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("td",{children:e.name}),(0,Sr.jsx)("td",{children:e.email}),(0,Sr.jsx)("td",{className:"num",children:e.lifetimeMashes}),(0,Sr.jsx)("td",{className:"num",children:e.rsvpCount}),(0,Sr.jsx)("td",{children:Zm(e.lastSeenAt)})]},e.uid)))})]})]})}function tg(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)({});return(0,t.useEffect)((()=>{const e=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"userProfiles"),(e=>i(e.val()||{}))),t=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"mashSessions"),(e=>{const t=[],r=e.val()||{};Object.entries(r).forEach((e=>{let[n,r]=e;Object.entries(r||{}).forEach((e=>{let[r,i]=e;Object.entries(i||{}).forEach((e=>{let[i,a]=e;t.push({sid:i,eventId:n,uid:r,...a})}))}))})),t.sort(((e,t)=>(t.endedAt||0)-(e.endedAt||0))),n(t.slice(0,50))}));return()=>{e(),t()}}),[]),(0,Sr.jsxs)(Hm,{children:[(0,Sr.jsx)(Vm,{children:"Recent sessions \xb7 last 50"}),(0,Sr.jsx)(Km,{type:"button",onClick:()=>Qm("engagement-sessions.csv",["User","Event","Started","Ended","Count"],e.map((e=>[r[e.uid]&&r[e.uid].displayName||e.uid.slice(0,6),e.eventId,e.startedAt?new Date(e.startedAt).toISOString():"",e.endedAt?new Date(e.endedAt).toISOString():"",e.count||0]))),children:"Export CSV"}),0===e.length?(0,Sr.jsx)(Ym,{children:"No sessions logged yet."}):(0,Sr.jsxs)(Gm,{children:[(0,Sr.jsx)("thead",{children:(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("th",{children:"User"}),(0,Sr.jsx)("th",{children:"Event"}),(0,Sr.jsx)("th",{children:"Ended"}),(0,Sr.jsx)("th",{className:"num",children:"Count"})]})}),(0,Sr.jsx)("tbody",{children:e.map((e=>(0,Sr.jsxs)("tr",{children:[(0,Sr.jsx)("td",{children:r[e.uid]&&r[e.uid].displayName||e.uid.slice(0,6)}),(0,Sr.jsxs)("td",{children:[e.eventId.slice(0,8),"\u2026"]}),(0,Sr.jsx)("td",{children:Zm(e.endedAt)}),(0,Sr.jsx)("td",{className:"num",children:e.count||0})]},e.sid)))})]})]})}function ng(){const[e,n]=(0,t.useState)("per-event"),[r,i]=(0,t.useState)([]);return(0,t.useEffect)((()=>{const e=Hi((e=>i(e)));return()=>e&&e()}),[]),(0,Sr.jsxs)(Um,{children:[(0,Sr.jsxs)(Bm,{children:[(0,Sr.jsx)(Wm,{type:"button",$active:"per-event"===e,onClick:()=>n("per-event"),children:"Per-event"}),(0,Sr.jsx)(Wm,{type:"button",$active:"users"===e,onClick:()=>n("users"),children:"Users"}),(0,Sr.jsx)(Wm,{type:"button",$active:"sessions"===e,onClick:()=>n("sessions"),children:"Recent sessions"})]}),"per-event"===e&&(0,Sr.jsx)(Xm,{events:r}),"users"===e&&(0,Sr.jsx)(eg,{}),"sessions"===e&&(0,Sr.jsx)(tg,{})]})}const rg=xr.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,ig=xr.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
`,ag=xr.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 14px;
  text-align: left;
`,og=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 6px;
`,sg=xr.div`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #FFC72C;
  font-variant-numeric: tabular-nums;
`,lg=xr.div`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: 4px;
`,cg=xr.section`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 14px;
`,dg=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
  margin-bottom: 10px;
`,ug=xr.select`
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
`,hg=xr.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 120px;
  padding: 0 0 4px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
`,pg=xr.div`
  flex: 1;
  background: linear-gradient(180deg, #FFE66D, #FFC72C);
  border-radius: 4px 4px 0 0;
  min-height: 2px;
  position: relative;
  transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
`,fg=xr.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: rgba(255,255,255,0.40);
`,mg=xr.div`
  flex: 1;
  text-align: center;
`,gg=xr.div`
  max-height: 400px;
  overflow-y: auto;
`,bg=xr.div`
  display: flex;
  gap: 10px;
  padding: 6px 4px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  &:last-child { border-bottom: none; }
`,yg=xr.div`
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  white-space: nowrap;
  flex-shrink: 0;
  width: 90px;
`,vg=xr.div`
  font-weight: 600;
  color: #FFE66D;
  flex-shrink: 0;
`,xg=xr.div`
  flex: 1;
  color: rgba(255,255,255,0.65);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,wg=xr.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
`,_g=xr.div`
  flex: 0 0 200px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.85);
`,kg=xr.div`
  flex: 1;
  height: 18px;
  background: rgba(255,255,255,0.06);
  border-radius: 4px;
  overflow: hidden;
`,Sg=xr.div`
  height: 100%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  width: ${e=>e.$pct}%;
  transition: width 0.3s;
`,Eg=xr.div`
  flex: 0 0 110px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.55);
  text-align: right;
  font-variant-numeric: tabular-nums;
`,Cg=xr.div`
  padding: 20px;
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 12px;
`;function Tg(e){return e?new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(e)):"\u2014"}function Ig(e){if(!e||e<0)return"\u2014";const t=Math.floor(e/1e3);if(t<60)return`${t}s`;const n=Math.floor(t/60);if(n<60)return`${n}m ${t%60}s`;return`${Math.floor(n/60)}h ${n%60}m`}function jg(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)({}),[a,o]=(0,t.useState)({}),[s,l]=(0,t.useState)({}),[c,d]=(0,t.useState)({}),[u,h]=(0,t.useState)([]),[p,f]=(0,t.useState)(""),[m,g]=(0,t.useState)([]),[b,y]=(0,t.useState)("");(0,t.useEffect)((()=>{const e=(0,Ar.P)((0,Ar.ref)(Nr.OO,"analyticsEvents"),(0,Ar.kT)("ts"),(0,Ar.$1)(1e3)),t=(0,Ar.Zy)(e,(e=>{const t=[];e.forEach((e=>t.push({id:e.key,...e.val()||{}}))),t.sort(((e,t)=>(t.ts||0)-(e.ts||0))),n(t)}));return()=>t()}),[]),(0,t.useEffect)((()=>{const e=(0,Ar.P)((0,Ar.ref)(Nr.OO,"sessions"),(0,Ar.kT)("startedAt"),(0,Ar.$1)(1e3)),t=(0,Ar.Zy)(e,(e=>{const t=[];e.forEach((e=>t.push({key:e.key,...e.val()||{}}))),t.sort(((e,t)=>(t.startedAt||0)-(e.startedAt||0))),g(t)}),(()=>g([])));return()=>t()}),[]),(0,t.useEffect)((()=>{const e=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"userProfiles"),(e=>i(e.val()||{}))),t=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"fcmTokens"),(e=>o(e.val()||{}))),n=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"eventMashTotals"),(e=>l(e.val()||{}))),r=(0,Ar.Zy)((0,Ar.ref)(Nr.OO,"rsvps"),(e=>d(e.val()||{}))),a=Hi((e=>h(e)));return()=>{e(),t(),n(),r&&r(),a&&a()}}),[]);const v=(0,t.useMemo)((()=>{const e=Date.now(),t=e-864e5,n=e-6048e5,r=e-2592e6,i=e-3e5;let a=0,o=0,s=0,l=0,c=0,d=0,u=0;m.forEach((e=>{const h=e.startedAt||0;h>=t&&(a+=1),h>=n&&(o+=1),h>=r&&(s+=1),(e.lastActiveAt||0)>=i&&(l+=1);const p=e.endedAt||e.lastActiveAt||0;h&&p&&p>h&&(c+=p-h,d+=1),u+=e.eventCount||0}));const h=d>0?Math.round(c/d):0,p=m.length>0?u/m.length:0;return{today:a,week:o,month:s,active:l,avgDurMs:h,avgEvents:p,total:m.length}}),[m]),x=(0,t.useMemo)((()=>{const e=Date.now()-6048e5,t={};m.forEach((n=>{if((n.startedAt||0)<e)return;const r=n.uid||`anon:${n.deviceId||n.key}`;t[r]=(t[r]||0)+1}));let n=0,r=0,i=0;Object.values(t).forEach((e=>{1===e?n+=1:e>=2&&e<=5?r+=1:e>=6&&(i+=1)}));const a=n+r+i,o=e=>a>0?Math.round(e/a*100):0;return{one:n,twoFive:r,sixPlus:i,total:a,pctOne:o(n),pctTwoFive:o(r),pctSixPlus:o(i)}}),[m]),w=(0,t.useMemo)((()=>{const t=Date.now()-6048e5,n={};return e.forEach((e=>{if("page_view"!==e.name)return;if((e.ts||0)<t)return;const r=e.props&&e.props.path||e.path||"/";n[r]=(n[r]||0)+1})),Object.entries(n).map((e=>{let[t,n]=e;return{path:t,count:n}})).sort(((e,t)=>t.count-e.count)).slice(0,10)}),[e]),_=(0,t.useMemo)((()=>{const e={};return m.forEach((t=>{const n=t.deviceId;if(!n)return;e[n]||(e[n]={uids:new Set,lastSeen:0,sessions:0}),t.uid&&e[n].uids.add(t.uid),e[n].sessions+=1;const r=t.lastActiveAt||t.startedAt||0;r>e[n].lastSeen&&(e[n].lastSeen=r)})),Object.entries(e).map((e=>{let[t,n]=e;return{deviceId:t,uidCount:n.uids.size,sessions:n.sessions,lastSeen:n.lastSeen}})).sort(((e,t)=>t.lastSeen-e.lastSeen)).slice(0,20)}),[m]),k=(0,t.useMemo)((()=>{if(!b)return[];const t=m.filter((e=>e.uid===b)).sort(((e,t)=>(t.startedAt||0)-(e.startedAt||0))).slice(0,25);return t.map((t=>{const n=t.id||t.key,r=e.filter((e=>"page_view"===e.name&&e.sessionId===n)).map((e=>e.props&&e.props.path||e.path||"/")).reverse(),i=t.startedAt||0,a=t.endedAt||t.lastActiveAt||0;return{sid:n,startedAt:i,durationMs:i&&a>i?a-i:0,eventCount:t.eventCount||0,pages:r}}))}),[m,e,b]),S=(0,t.useMemo)((()=>{const t=Date.now()-6048e5;let n=0;Object.values(c).forEach((e=>{Object.values(e||{}).forEach((e=>{(e&&e.rsvpedAt)>=t&&(n+=1)}))}));let i=0;Object.values(s).forEach((e=>{Object.values(e||{}).forEach((e=>{i+=e||0}))}));let o=0;u.forEach((e=>{o+=e.hotdogs||0}));const l=Math.max(0,o-i),d=Object.keys(a).length,h=e.filter((e=>"home_view"===e.name)).length,p=h>0?Math.round(d/h*100):0,f=e.filter((e=>"pwa_installed"===e.name)).length;return{users:Object.keys(r).length,rsvpsThisWeek:n,signedInMashes:i,anonMashes:l,subscribedDevices:d,optInRate:p,pwaInstalls:f}}),[r,a,s,c,u,e]),E=(0,t.useMemo)((()=>{if(!p)return[];const t=e.filter((e=>"mash_session_complete"===e.name&&e.props&&e.props.eventId===p)),n=new Array(7).fill(0),r=Date.now();t.forEach((e=>{const t=r-(e.ts||0),i=Math.floor(t/864e5);i>=0&&i<7&&(n[6-i]+=e.props.count||0)}));const i=Math.max(1,...n);return n.map((e=>({value:e,pct:e/i*100})))}),[e,p]),C=(0,t.useMemo)((()=>p?Object.keys(c[p]||{}).length:0),[c,p]),T=(0,t.useMemo)((()=>{const t={home_view:e.filter((e=>"home_view"===e.name)).length,mash_session_complete:e.filter((e=>"mash_session_complete"===e.name)).length,signup_completed:e.filter((e=>"signup_completed"===e.name)).length,signin_completed:e.filter((e=>"signin_completed"===e.name)).length,rsvp_added:e.filter((e=>"rsvp_added"===e.name)).length},n=Math.max(1,t.home_view);return[{label:"Home view",count:t.home_view,pct:100},{label:"Mash session",count:t.mash_session_complete,pct:t.mash_session_complete/n*100},{label:"Account created",count:t.signup_completed,pct:t.signup_completed/n*100},{label:"Sign in",count:t.signin_completed,pct:t.signin_completed/n*100},{label:"RSVP added",count:t.rsvp_added,pct:t.rsvp_added/n*100}]}),[e]),I=(0,t.useMemo)((()=>{const e={};return Object.values(s).forEach((t=>{Object.entries(t||{}).forEach((t=>{let[n,r]=t;e[n]=(e[n]||0)+(r||0)}))})),Object.entries(e).map((e=>{let[t,n]=e;return{uid:t,count:n,name:r[t]&&r[t].displayName||t.slice(0,6)}})).sort(((e,t)=>t.count-e.count)).slice(0,10)}),[s,r]),j=(0,t.useMemo)((()=>{const e={};return Object.values(c).forEach((t=>{Object.keys(t||{}).forEach((t=>{e[t]=(e[t]||0)+1}))})),Object.entries(e).map((e=>{let[t,n]=e;return{uid:t,count:n,name:r[t]&&r[t].displayName||t.slice(0,6)}})).sort(((e,t)=>t.count-e.count)).slice(0,10)}),[c,r]),P=e.slice(0,50),A=(0,t.useMemo)((()=>{const e=new Set;return m.forEach((t=>{t.uid&&e.add(t.uid)})),Array.from(e).map((e=>({uid:e,name:r[e]&&r[e].displayName||r[e]&&r[e].email||e.slice(0,6)}))).sort(((e,t)=>e.name.localeCompare(t.name)))}),[m,r]);return(0,Sr.jsxs)(rg,{children:[(0,Sr.jsxs)(ig,{children:[(0,Sr.jsxs)(ag,{children:[(0,Sr.jsx)(og,{children:"Signed-in users"}),(0,Sr.jsx)(sg,{children:S.users})]}),(0,Sr.jsxs)(ag,{children:[(0,Sr.jsx)(og,{children:"RSVPs this week"}),(0,Sr.jsx)(sg,{children:S.rsvpsThisWeek})]}),(0,Sr.jsxs)(ag,{children:[(0,Sr.jsx)(og,{children:"Mashes (signed-in)"}),(0,Sr.jsx)(sg,{children:S.signedInMashes}),(0,Sr.jsxs)(lg,{children:["Anon: ",S.anonMashes]})]}),(0,Sr.jsxs)(ag,{children:[(0,Sr.jsx)(og,{children:"Notif opt-in"}),(0,Sr.jsxs)(sg,{children:[S.optInRate,"%"]}),(0,Sr.jsxs)(lg,{children:[S.subscribedDevices," devices"]})]}),(0,Sr.jsxs)(ag,{children:[(0,Sr.jsx)(og,{children:"PWA installs"}),(0,Sr.jsx)(sg,{children:S.pwaInstalls})]})]}),(0,Sr.jsxs)(ig,{children:[(0,Sr.jsxs)(ag,{children:[(0,Sr.jsx)(og,{children:"Sessions today"}),(0,Sr.jsx)(sg,{children:v.today}),(0,Sr.jsxs)(lg,{children:["7d: ",v.week," \xb7 30d: ",v.month]})]}),(0,Sr.jsxs)(ag,{children:[(0,Sr.jsx)(og,{children:"Active right now"}),(0,Sr.jsx)(sg,{children:v.active}),(0,Sr.jsx)(lg,{children:"last 5 min"})]}),(0,Sr.jsxs)(ag,{children:[(0,Sr.jsx)(og,{children:"Avg session"}),(0,Sr.jsx)(sg,{children:Ig(v.avgDurMs)}),(0,Sr.jsxs)(lg,{children:[v.avgEvents.toFixed(1)," events/session"]})]})]}),(0,Sr.jsxs)(cg,{children:[(0,Sr.jsx)(dg,{children:"Visit frequency \xb7 last 7 days"}),0===x.total?(0,Sr.jsx)(Cg,{children:"No sessions yet."}):(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsxs)(wg,{children:[(0,Sr.jsx)(_g,{children:"1 visit"}),(0,Sr.jsx)(kg,{children:(0,Sr.jsx)(Sg,{$pct:x.pctOne})}),(0,Sr.jsxs)(Eg,{children:[x.one," (",x.pctOne,"%)"]})]}),(0,Sr.jsxs)(wg,{children:[(0,Sr.jsx)(_g,{children:"2\u20135 visits"}),(0,Sr.jsx)(kg,{children:(0,Sr.jsx)(Sg,{$pct:x.pctTwoFive})}),(0,Sr.jsxs)(Eg,{children:[x.twoFive," (",x.pctTwoFive,"%)"]})]}),(0,Sr.jsxs)(wg,{children:[(0,Sr.jsx)(_g,{children:"6+ visits"}),(0,Sr.jsx)(kg,{children:(0,Sr.jsx)(Sg,{$pct:x.pctSixPlus})}),(0,Sr.jsxs)(Eg,{children:[x.sixPlus," (",x.pctSixPlus,"%)"]})]})]})]}),(0,Sr.jsxs)(cg,{children:[(0,Sr.jsx)(dg,{children:"Top pages \xb7 last 7 days"}),0===w.length?(0,Sr.jsx)(Cg,{children:"No page views yet."}):w.map((e=>(0,Sr.jsxs)(bg,{children:[(0,Sr.jsx)(vg,{children:e.path}),(0,Sr.jsxs)(xg,{children:[e.count," views"]})]},e.path)))]}),(0,Sr.jsxs)(cg,{children:[(0,Sr.jsx)(dg,{children:"User activity timeline"}),(0,Sr.jsxs)(ug,{value:b,onChange:e=>y(e.target.value),children:[(0,Sr.jsx)("option",{value:"",children:"\u2014 Choose user \u2014"}),A.map((e=>(0,Sr.jsx)("option",{value:e.uid,children:e.name},e.uid)))]}),b?0===k.length?(0,Sr.jsx)(Cg,{children:"No sessions for this user."}):k.map((e=>(0,Sr.jsxs)(bg,{children:[(0,Sr.jsx)(yg,{children:Tg(e.startedAt)}),(0,Sr.jsx)(vg,{children:Ig(e.durationMs)}),(0,Sr.jsxs)(xg,{children:[e.eventCount," events",e.pages.length>0&&(0,Sr.jsxs)(Sr.Fragment,{children:[" \xb7 ",e.pages.slice(0,6).join(" \u2192 "),e.pages.length>6?" \u2026":""]})]})]},e.sid))):(0,Sr.jsx)(Cg,{children:"Pick a user to see their session history."})]}),(0,Sr.jsxs)(cg,{children:[(0,Sr.jsx)(dg,{children:"Devices \xb7 top 20 by recency"}),0===_.length?(0,Sr.jsx)(Cg,{children:"No devices yet."}):_.map((e=>(0,Sr.jsxs)(bg,{children:[(0,Sr.jsx)(yg,{children:Tg(e.lastSeen)}),(0,Sr.jsxs)(vg,{children:[e.deviceId.slice(0,8),"\u2026"]}),(0,Sr.jsxs)(xg,{children:[e.sessions," sessions \xb7 ",e.uidCount," signed-in user",1===e.uidCount?"":"s"]})]},e.deviceId)))]}),(0,Sr.jsxs)(cg,{children:[(0,Sr.jsx)(dg,{children:"Per-event mash bar (24h \xd7 7 days)"}),(0,Sr.jsxs)(ug,{value:p,onChange:e=>f(e.target.value),children:[(0,Sr.jsx)("option",{value:"",children:"\u2014 Choose event \u2014"}),u.map((e=>(0,Sr.jsx)("option",{value:e.id,children:e.name||"(untitled)"},e.id)))]}),p?(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(hg,{children:E.map(((e,t)=>(0,Sr.jsx)(pg,{style:{height:`${Math.max(2,e.pct)}%`},title:`${e.value} mashes`},t)))}),(0,Sr.jsx)(fg,{children:E.map(((e,t)=>(0,Sr.jsx)(mg,{children:e.value||""},t)))}),(0,Sr.jsxs)("div",{style:{marginTop:10,fontSize:12,color:"rgba(255,255,255,0.6)"},children:["RSVPs for this event: ",C]})]}):(0,Sr.jsx)(Cg,{children:"Pick an event to see its 7-day mash chart."})]}),(0,Sr.jsxs)(cg,{children:[(0,Sr.jsx)(dg,{children:"Funnel"}),T.map((e=>(0,Sr.jsxs)(wg,{children:[(0,Sr.jsx)(_g,{children:e.label}),(0,Sr.jsx)(kg,{children:(0,Sr.jsx)(Sg,{$pct:e.pct})}),(0,Sr.jsxs)(Eg,{children:[e.count," (",Math.round(e.pct),"%)"]})]},e.label)))]}),(0,Sr.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:10},children:[(0,Sr.jsxs)(cg,{children:[(0,Sr.jsx)(dg,{children:"Top mashers (lifetime)"}),0===I.length?(0,Sr.jsx)(Cg,{children:"No data yet."}):I.map((e=>(0,Sr.jsxs)(bg,{children:[(0,Sr.jsx)(vg,{children:e.name}),(0,Sr.jsxs)(xg,{children:["\ud83c\udf2d ",e.count]})]},e.uid)))]}),(0,Sr.jsxs)(cg,{children:[(0,Sr.jsx)(dg,{children:"Top RSVPers"}),0===j.length?(0,Sr.jsx)(Cg,{children:"No data yet."}):j.map((e=>(0,Sr.jsxs)(bg,{children:[(0,Sr.jsx)(vg,{children:e.name}),(0,Sr.jsxs)(xg,{children:[e.count," events"]})]},e.uid)))]})]}),(0,Sr.jsxs)(cg,{children:[(0,Sr.jsx)(dg,{children:"Recent activity \xb7 last 50"}),(0,Sr.jsx)(gg,{children:0===P.length?(0,Sr.jsx)(Cg,{children:"No analytics events yet."}):P.map((e=>{const t=e.uid?r[e.uid]&&r[e.uid].displayName||e.uid.slice(0,6):"anon",n=e.props?Object.entries(e.props).map((e=>{let[t,n]=e;return`${t}=${"object"===typeof n?JSON.stringify(n):n}`})).join(" "):"";return(0,Sr.jsxs)(bg,{children:[(0,Sr.jsx)(yg,{children:Tg(e.ts)}),(0,Sr.jsx)(vg,{children:e.name}),(0,Sr.jsxs)(xg,{children:[t," \xb7 ",n]})]},e.id)}))})]})]})}const Pg=xr.div` display: flex; flex-direction: column; gap: 14px; `,Ag=xr.div`
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; flex-wrap: wrap;
`,Ng=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(255,255,255,0.55);
`,Rg=xr.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 600;
  color: #FF8E8E;
  background: rgba(255,107,107,0.10);
  border: 1px solid rgba(255,107,107,0.30);
  padding: 4px 10px; border-radius: 999px;
  margin-left: 8px;
`,Og=xr.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.05em; text-transform: uppercase;
  padding: 8px 12px; border-radius: 10px;
  border: 1px solid rgba(255,107,107,0.40);
  background: rgba(255,107,107,0.08);
  color: #FF8E8E; cursor: pointer;
  &:hover { background: rgba(255,107,107,0.16); }
`,Dg=xr.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,107,107,0.20);
  border-radius: 12px;
  padding: 12px 14px;
  font-family: 'Inter', sans-serif;
`,Mg=xr.div`
  display: flex; justify-content: space-between; gap: 12px;
  font-size: 12px;
`,Lg=xr.div`
  color: #FFD2D2;
  font-weight: 600;
  margin: 6px 0 4px;
  word-break: break-word;
`,Fg=xr.div`
  font-size: 11px; color: rgba(255,255,255,0.55);
  display: flex; flex-wrap: wrap; gap: 10px;
`,zg=xr.pre`
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
`,$g=xr.div`
  padding: 36px 16px; text-align: center;
  color: rgba(255,255,255,0.45);
  border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 14px;
  font-size: 14px;
`;function Ug(){const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)(!0),[a,o]=(0,t.useState)({});(0,t.useEffect)((()=>{const e=(0,Ar.P)((0,Ar.ref)(Nr.OO,"errorLogs"),(0,Ar.$1)(200)),t=(0,Ar.Zy)(e,(e=>{const t=e.val()||{},r=Object.entries(t).map((e=>{let[t,n]=e;return{id:t,...n}}));r.sort(((e,t)=>(t.ts||0)-(e.ts||0))),n(r),i(!1)}),(()=>i(!1)));return()=>t()}),[]);const s=(0,t.useMemo)((()=>e),[e]);return r?(0,Sr.jsx)(Pg,{children:(0,Sr.jsx)($g,{children:"Loading\u2026"})}):(0,Sr.jsxs)(Pg,{children:[(0,Sr.jsxs)(Ag,{children:[(0,Sr.jsxs)(Ng,{children:["Recent errors ",(0,Sr.jsx)(Rg,{children:e.length})]}),e.length>0&&(0,Sr.jsx)(Og,{type:"button",onClick:async()=>{if(window.confirm("Delete all error logs? This cannot be undone."))try{await(0,Ar.TF)((0,Ar.ref)(Nr.OO,"errorLogs"))}catch(Bt){}},children:"Clear all"})]}),0===e.length?(0,Sr.jsx)($g,{children:"\ud83e\udd5a No errors logged. Things are quiet."}):s.map((e=>{return(0,Sr.jsxs)(Dg,{children:[(0,Sr.jsxs)(Mg,{children:[(0,Sr.jsx)("span",{style:{color:"#FFC72C",fontWeight:700},children:(t=e.ts,t?new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(t)):"\u2014")}),(0,Sr.jsx)("span",{children:e.email||e.uid||"anonymous"})]}),(0,Sr.jsx)(Lg,{children:e.msg||"(no message)"}),(0,Sr.jsxs)(Fg,{children:[(0,Sr.jsxs)("span",{children:["v ",e.version||"\u2014"]}),(0,Sr.jsxs)("span",{children:["build ",e.buildNum||"\u2014"]}),(0,Sr.jsx)("span",{children:e.buildSha||"\u2014"}),e.context&&e.context.type&&(0,Sr.jsx)("span",{children:e.context.type}),e.url&&(0,Sr.jsx)("span",{style:{wordBreak:"break-all"},children:e.url.replace(/^https?:\/\//,"")})]}),e.stack&&(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)("button",{type:"button",onClick:()=>o((t=>({...t,[e.id]:!t[e.id]}))),style:{marginTop:8,background:"transparent",border:"none",color:"#FFE66D",fontSize:11,fontFamily:"Montserrat, sans-serif",fontWeight:700,letterSpacing:"0.10em",textTransform:"uppercase",cursor:"pointer",padding:0},children:a[e.id]?"Hide stack \u25b2":"Show stack \u25bc"}),a[e.id]&&(0,Sr.jsx)(zg,{children:e.stack})]})]},e.id);var t}))]})}const Bg=xr.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 18px;
`,Wg=xr.div`
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
`,Hg=xr.h1`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 8px;
`,Vg=xr.p`
  font-size: 13px;
  color: rgba(255,255,255,0.75);
  margin: 0 0 18px;
  line-height: 1.5;
`,qg=xr.button`
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
`,Gg=xr(qg)`
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.12);
`,Kg=xr.div`
  color: rgba(255,255,255,0.6);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,Yg=["events","notifications","signups","users","engagement","analytics","errors"];const Zg=function(){const{user:e,isAdmin:n,loading:r}=Xo(),i=ee(),{tab:a}=te(),o=Yg.includes(a)?a:"events",[s,l]=(0,t.useState)([]),[c,d]=(0,t.useState)(!0),[u,h]=(0,t.useState)(null);(0,t.useEffect)((()=>{a!==o&&i(`/admin1/${o}`,{replace:!0})}),[a,o,i]),(0,t.useEffect)((()=>{if(!n)return;const e=Hi((e=>{l(e),d(!1)}));return()=>e&&e()}),[n]);const{upcoming:p,past:f}=(0,t.useMemo)((()=>Vi(s)),[s]),m=async()=>{try{await Jo()}catch(Bt){}h(null)};if(r)return(0,Sr.jsxs)(bh,{children:[(0,Sr.jsx)(xh,{count:5}),(0,Sr.jsx)(Bg,{children:(0,Sr.jsx)(Kg,{children:"Loading\u2026"})})]});if(!e)return(0,Sr.jsxs)(bh,{children:[(0,Sr.jsx)(xh,{count:5}),(0,Sr.jsx)(Bg,{children:(0,Sr.jsxs)(Wg,{children:[(0,Sr.jsx)(Hg,{children:"\ud83e\udd5a Admin Access"}),(0,Sr.jsx)(Vg,{children:"Sign in to access admin. Tap below and the cog will pop open."}),(0,Sr.jsx)(qg,{type:"button",onClick:()=>window.dispatchEvent(new Event("auth:open")),children:"Sign In"})]})})]});if(!n)return(0,Sr.jsxs)(bh,{children:[(0,Sr.jsx)(xh,{count:5}),(0,Sr.jsx)(Bg,{children:(0,Sr.jsxs)(Wg,{children:[(0,Sr.jsx)(Hg,{children:"Not authorized"}),(0,Sr.jsx)(Vg,{children:"This account isn't an admin. Sign in with an admin account, or ask a crew member to grant access."}),(0,Sr.jsx)(Gg,{type:"button",onClick:m,children:"Sign Out"})]})})]});const g=u&&"new"!==u&&s.find((e=>e.id===u))||null;return(0,Sr.jsxs)(Nh,{tab:o,onTabChange:e=>i(`/admin1/${e}`),onSignOut:m,children:["events"===o&&(null==u?c?(0,Sr.jsx)("div",{style:{padding:"40px 0",textAlign:"center",color:"rgba(255,255,255,0.55)"},children:"Loading events\u2026"}):(0,Sr.jsx)(Wh,{upcoming:p,past:f,onNew:()=>h("new"),onEdit:e=>h(e)}):(0,Sr.jsx)(Yp,{existing:g,onClose:()=>h(null),onSaved:()=>h(null),onDeleted:()=>h(null)})),"notifications"===o&&(0,Sr.jsx)(Hf,{}),"signups"===o&&(0,Sr.jsx)(rm,{}),"users"===o&&(0,Sr.jsx)($m,{}),"engagement"===o&&(0,Sr.jsx)(ng,{}),"analytics"===o&&(0,Sr.jsx)(jg,{}),"errors"===o&&(0,Sr.jsx)(Ug,{})]})},Jg=_r`
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
`,Qg=xr.div`
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
`,Xg=xr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
`,eb=xr.img`
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
`,tb=xr.h2`
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
`,nb=xr.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 27px; /* Increased spacing before trail conditions */
  text-align: center;
  max-width: 90%;
`,rb=xr.span`
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
`,ib=xr.div`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  margin: 5px 0;
  opacity: 0.8;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`,ab=xr.div`
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
`,ob=xr.img`
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
`,sb=xr.div`
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
`,lb=xr.div`
  position: fixed;
  font-size: ${e=>e.size||"36px"};
  opacity: ${e=>e.opacity||.2};
  pointer-events: none;
  user-select: none;
  z-index: 0;
  top: ${e=>e.top||"50%"};
  left: ${e=>e.left||"50%"};
  animation: ${Jg} ${e=>e.duration||"20s"} ease-in-out infinite;
  animation-delay: ${e=>e.delay||"0s"};
  transform-origin: center;
  will-change: transform;
  
  @media (max-width: 768px) {
    font-size: calc(${e=>e.size||"36px"} * 0.8);
  }
  
  @media (max-width: 480px) {
    font-size: calc(${e=>e.size||"36px"} * 0.7);
  }
`,cb=xr.div`
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
`,db=xr.a`
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
`,ub=xr.div`
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
`,hb=xr.h2`
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
`,pb=xr.p`
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
`,fb=xr.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`,mb=xr.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,gb=xr.label`
  color: #FFC72C;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`,bb=xr.input`
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
`,yb=(_r`
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
`),vb=xr.div`
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
`;const xb=function(){const[e,n]=(0,t.useState)([]),r=(0,t.useRef)(null),[i,a]=(0,t.useState)(""),[o,s]=(0,t.useState)(""),[l,c]=(0,t.useState)(!1),[d,u]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{(()=>{if(!document.getElementById("montserrat-font")){const e=document.createElement("link");e.id="montserrat-font",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap",document.head.appendChild(e)}})();const e=()=>{const e=window.innerWidth;return e<=480?6:e<=768?8:12},t=[],i=e();for(let n=0;n<i;n++)t.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.15,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:10*Math.random()+15+"s",delay:`-${10*Math.random()}s`});n(t);const a=()=>{const r=e();if(r!==t.length){const e=[];for(let n=0;n<r;n++)n<t.length?e.push(t[n]):e.push({id:n,emoji:"\ud83e\udd5a",size:24*Math.random()+24+"px",opacity:.2*Math.random()+.1,top:100*Math.random()+"%",left:100*Math.random()+"%",duration:60*Math.random()+30+"s",delay:`-${30*Math.random()}s`});n(e)}};if(window.addEventListener("resize",a),!r.current){const e=document.createElement("script");e.src="https://trailbot.com/scripts/embed.js",e.defer=!0,document.body.appendChild(e),r.current=e}return()=>{window.removeEventListener("resize",a),r.current&&document.body.contains(r.current)&&document.body.removeChild(r.current)}}),[]),(0,Sr.jsxs)(Qg,{children:[e.map((e=>(0,Sr.jsx)(lb,{size:e.size,opacity:e.opacity,top:e.top,left:e.left,duration:e.duration,delay:e.delay,children:e.emoji},e.id))),(0,Sr.jsxs)(Xg,{children:[(0,Sr.jsx)(eb,{src:"/assets/cogg white shadow.png",alt:"Scrambled Legs Logo"}),(0,Sr.jsx)(tb,{children:"DULUTH'S PREMIER RACE TEAM"}),(0,Sr.jsxs)(nb,{children:[(0,Sr.jsxs)(ib,{children:[(0,Sr.jsx)(rb,{children:"SCRAMBLED LEGS\u2122"})," proudly presents"]}),(0,Sr.jsx)(ab,{children:"LESTER RIVER TRAIL"})]}),(0,Sr.jsx)(ob,{src:"/assets/trail conditions.png",alt:"Trail Conditions"}),(0,Sr.jsx)(sb,{children:(0,Sr.jsx)("iframe",{src:"https://trailbot.com/widgets/feed?keys=5af70f8f-9995-4451-8877-a42fbb299a6a",width:"100%",className:"trail-status-embed",title:"Lester Park Trail Conditions"})}),(0,Sr.jsxs)(cb,{children:[(0,Sr.jsx)(db,{href:"https://www.coggs.com/trail-conditions",target:"_blank",rel:"noopener noreferrer",icon:'"\ud83d\udeb5\u200d\u2642\ufe0f"',children:"TRAIL CONDITIONS"}),(0,Sr.jsx)(db,{href:"https://www.coggs.com/donate",target:"_blank",rel:"noopener noreferrer",icon:'"\ud83d\udee0\ufe0f"',children:"SUPPORT THE TRAILS"})]}),(0,Sr.jsxs)(ub,{children:[(0,Sr.jsx)(hb,{children:"JOIN THE SCRAMBLED LEGS"}),(0,Sr.jsx)(pb,{children:"An elite team of average athletes"}),d?(0,Sr.jsxs)(vb,{children:[(0,Sr.jsx)("h3",{children:"Egg-cellent!"}),(0,Sr.jsx)("p",{children:"You're officially part of the scramble! We'll keep you updated on all our egg-citing adventures."})]}):(0,Sr.jsxs)(fb,{onSubmit:async e=>{if(e.preventDefault(),!i.trim()||!o.trim())return void alert("Please fill in all fields");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)){c(!0);try{const e=(0,Ar.ref)(Nr.OO,"newsletterRegistrants"),t=(0,Ar.VC)(e);await(0,Ar.hZ)(t,{name:i,email:o,timestamp:Date.now()}),u(!0),a(""),s("")}catch(t){console.error("Error submitting form:",t),alert("Something went wrong. Please try again later.")}finally{c(!1)}}else alert("Please enter a valid email address")},children:[(0,Sr.jsxs)(mb,{children:[(0,Sr.jsx)(gb,{htmlFor:"name",children:"Name"}),(0,Sr.jsx)(bb,{id:"name",type:"text",value:i,onChange:e=>a(e.target.value),placeholder:"Your name",required:!0})]}),(0,Sr.jsxs)(mb,{children:[(0,Sr.jsx)(gb,{htmlFor:"email",children:"Email"}),(0,Sr.jsx)(bb,{id:"email",type:"email",value:o,onChange:e=>s(e.target.value),placeholder:"Your email address",required:!0})]}),(0,Sr.jsx)(yb,{type:"submit",disabled:l,children:l?"Submitting...":"Get Crackin'"})]})]})]}),(0,Sr.jsx)(jr,{})]})};let wb=null;const _b=new Set;function kb(){_b.forEach((e=>{try{e(wb)}catch(Bt){}}))}function Sb(e){wb=e||null,kb()}const Eb=_r`from { opacity: 0; } to { opacity: 1; }`,Cb=_r`from { transform: translateY(100%); } to { transform: translateY(0); }`,Tb=xr.div`
  position: fixed;
  inset: 0;
  z-index: 2150;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
`,Ib=xr.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  pointer-events: auto;
  animation: ${Eb} 0.2s ease;
`,jb=xr.div`
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
  animation: ${Cb} 0.28s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 -10px 50px rgba(0,0,0,0.55);
`,Pb=xr.button`
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
`,Ab=xr.button`
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
`,Nb=xr.div`
  padding: 6px 18px 0;
`,Rb=xr.h2`
  font-family: 'Fredoka', sans-serif;
  font-size: 22px;
  margin: 4px 0 16px;
  background: linear-gradient(45deg, #ffffff, #f0d97a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,Ob=xr.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
`,Db=xr.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
  margin: 0 0 10px;
`,Mb=xr.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Lb=xr.div`
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
`,Fb=xr.input`
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
`,zb=xr.button`
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
`,$b=xr.button`
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
`,Ub=xr.button`
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
`,Bb=xr.div`
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
`,Wb=xr.div`
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  margin-top: 8px;
`,Hb=xr.div`
  font-size: 12px;
  color: #FF8E8E;
  margin-top: 8px;
`,Vb=xr.div`
  font-size: 12px;
  color: #FFE66D;
  margin-top: 8px;
`,qb=xr.input`display: none;`,Gb=xr.div`
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 10px;
`,Kb=xr.div`
  width: ${e=>e.$pct||0}%;
  height: 100%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  transition: width 0.15s;
`;function Yb(e){let{user:n,onClose:r}=e;const{isAdmin:i}=Xo(),a=ee(),o=(0,t.useRef)(null),[s,l]=(0,t.useState)(null),[c,d]=(0,t.useState)(""),[u,h]=(0,t.useState)(!1),[p,f]=(0,t.useState)(""),[m,g]=(0,t.useState)(""),[b,y]=(0,t.useState)(!1),[v,x]=(0,t.useState)(0),[w,_]=(0,t.useState)(""),[k,S]=(0,t.useState)(Ur()),[E,C]=(0,t.useState)(!1),[T,I]=(0,t.useState)(""),[j,P]=(0,t.useState)(wb),[A,N]=(0,t.useState)("undefined"!==typeof window&&(!(!window.matchMedia||!window.matchMedia("(display-mode: standalone)").matches)||!(!window.navigator||!0!==window.navigator.standalone))||Fr()),[R,O]=(0,t.useState)(""),[D,M]=(0,t.useState)(""),[L,F]=(0,t.useState)(!1);(0,t.useEffect)((()=>{if(!n)return;const e=(0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),t=(0,Ar.Zy)(e,(e=>{const t=e.val()||{};l(t),d((e=>e||t.displayName||(n.email?n.email.split("@")[0]:"")))}));return()=>t()}),[n]),(0,t.useEffect)((()=>{const e=(t=e=>P(e),_b.add(t),()=>_b.delete(t));var t;return()=>{e()}}),[]),(0,t.useEffect)((()=>{function e(e){"Escape"===e.key&&r()}window.addEventListener("keydown",e);const t=document.body.style.overflow;document.body.style.overflow="hidden";try{(0,so.logEvent)("account_sheet_opened",{signedIn:!0})}catch(Bt){}return()=>{window.removeEventListener("keydown",e),document.body.style.overflow=t}}),[r]);const z=c&&c.charAt(0)||(n.email?n.email.charAt(0):"?"),$=s&&s.photoURL||"",U="subscribed"===k,B=!A&&!!j;return(0,Sr.jsxs)(Tb,{children:[(0,Sr.jsx)(Ib,{onClick:r}),(0,Sr.jsxs)(jb,{onClick:e=>e.stopPropagation(),role:"dialog","aria-label":"Account",children:[(0,Sr.jsx)(Pb,{type:"button","aria-label":"Close",onClick:r,children:"\xd7"}),(0,Sr.jsx)(Ab,{type:"button",onClick:r,"aria-label":"Close panel"}),(0,Sr.jsxs)(Nb,{children:[(0,Sr.jsx)(Rb,{children:"Account"}),(0,Sr.jsxs)(Ob,{children:[(0,Sr.jsx)(Db,{children:"Profile"}),(0,Sr.jsxs)(Mb,{children:[(0,Sr.jsx)(Lb,{$photo:$,children:!$&&z}),(0,Sr.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,Sr.jsx)("div",{style:{fontWeight:700,color:"#fff",fontSize:15},children:c||n.email&&n.email.split("@")[0]||"rider"}),(0,Sr.jsx)("div",{style:{fontSize:12,color:"rgba(255,255,255,0.55)",marginTop:2},children:n.email||""}),(0,Sr.jsx)("div",{style:{marginTop:10},children:(0,Sr.jsx)($b,{type:"button",onClick:()=>{b||o.current&&o.current.click()},disabled:b,children:b?"Uploading\u2026":$?"Change photo":"Upload photo"})})]})]}),(0,Sr.jsx)(qb,{ref:o,type:"file",accept:"image/*",onChange:async e=>{const t=e.target.files&&e.target.files[0];if(e.target.value="",!t)return;if(_(""),!t.type||!t.type.startsWith("image/"))return void _("File must be an image");if(t.size>2097152)return void _("Image is too large (max 2MB)");const r=function(e){if("image/png"===e.type)return"png";if("image/webp"===e.type)return"webp";if("image/gif"===e.type)return"gif";const t=(e.name||"").split(".").pop();return t&&t.length<=5&&/^[a-z0-9]+$/i.test(t)?t.toLowerCase():"jpg"}(t),i=`profilePics/${n.uid}.${r}`;try{y(!0),x(0);const e=(0,Hh.KR)(Nr.IG,i),r=(0,Hh.bp)(e,t,{contentType:t.type});await new Promise(((e,t)=>{r.on("state_changed",(e=>{e.totalBytes&&x(e.bytesTransferred/e.totalBytes*100)}),(e=>t(e)),(()=>e()))}));const a=await(0,Hh.qk)(r.snapshot.ref);await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),{photoURL:a})}catch(a){_(a&&a.message||"Upload failed")}finally{y(!1)}}}),b&&(0,Sr.jsx)(Gb,{children:(0,Sr.jsx)(Kb,{$pct:v})}),w&&(0,Sr.jsx)(Hb,{children:w})]}),(0,Sr.jsxs)(Ob,{children:[(0,Sr.jsx)(Db,{children:"Display name"}),(0,Sr.jsxs)(Mb,{children:[(0,Sr.jsx)(Fb,{type:"text",value:c,maxLength:30,onChange:e=>d(e.target.value),placeholder:"Your name"}),(0,Sr.jsx)(zb,{type:"button",onClick:async()=>{f(""),g("");const e=(c||"").trim();if(e.length<1||e.length>30)g("Name must be 1\u201330 characters");else try{h(!0),await(0,Ar.yo)((0,Ar.ref)(Nr.OO,`userProfiles/${n.uid}`),{displayName:e}),f("Saved.")}catch(t){g(t&&t.message||"Save failed")}finally{h(!1)}},disabled:u,children:u?"\u2026":"Save"})]}),(0,Sr.jsx)(Wb,{children:"1\u201330 characters. Shown on the leaderboard and ride leader picker."}),m&&(0,Sr.jsx)(Hb,{children:m}),p&&(0,Sr.jsx)(Vb,{children:p})]}),(0,Sr.jsxs)(Ob,{children:[(0,Sr.jsx)(Db,{children:"Notifications & app"}),U?(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(Bb,{children:"\u2713 Notifications on"}),(0,Sr.jsx)(Wb,{children:"To turn these off, revoke notification permission in your browser/OS settings."})]}):(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(zb,{type:"button",onClick:async()=>{I(""),C(!0);try{await Wr(),S(Ur())}catch(e){I(e&&e.message||"Could not enable notifications")}finally{C(!1)}},disabled:E,children:E?"\u2026":"Enable notifications"}),T&&(0,Sr.jsx)(Hb,{children:T})]}),(0,Sr.jsx)("div",{style:{height:12}}),A?(0,Sr.jsx)(Bb,{children:"\u2713 PWA installed"}):B?(0,Sr.jsx)(zb,{type:"button",onClick:async()=>{const e=function(){const e=wb;return wb=null,kb(),e}();if(e)try{(0,so.logEvent)("pwa_install_clicked",{}),await e.prompt();const t=await e.userChoice;t&&"accepted"===t.outcome&&N(!0)}catch(Bt){}},children:"Install Scrambled Legs app"}):(0,Sr.jsx)(Wb,{children:"Install the PWA from your browser menu to enable home-screen launching."})]}),(0,Sr.jsxs)(Ob,{children:[(0,Sr.jsx)(Db,{children:"Password"}),(0,Sr.jsx)(zb,{type:"button",onClick:async()=>{if(O(""),M(""),n.email)try{F(!0),await Qo(n.email),O("Check your inbox for a reset link.")}catch(e){M(e&&e.message||"Could not send reset email")}finally{F(!1)}else M("No email on file.")},disabled:L,children:L?"\u2026":"Send password reset email"}),D&&(0,Sr.jsx)(Hb,{children:D}),R&&(0,Sr.jsx)(Vb,{children:R})]}),i&&(0,Sr.jsxs)(Ob,{children:[(0,Sr.jsx)(Db,{children:"Admin"}),(0,Sr.jsx)(zb,{type:"button",onClick:()=>{r(),a("/admin1")},children:"\u2192 Admin Panel"})]}),(0,Sr.jsxs)(Ob,{children:[(0,Sr.jsx)(Db,{children:"Sign out"}),(0,Sr.jsx)(Ub,{type:"button",onClick:async()=>{try{await Jo()}catch(Bt){}r()},children:"Sign out"})]})]})]})]})}function Zb(e){let{onClose:n}=e;const[r,i]=(0,t.useState)("signin"),[a,o]=(0,t.useState)(""),[s,l]=(0,t.useState)(""),[c,d]=(0,t.useState)(""),[u,h]=(0,t.useState)(""),[p,f]=(0,t.useState)(!1);(0,t.useEffect)((()=>{function e(e){"Escape"===e.key&&n()}window.addEventListener("keydown",e);const t=document.body.style.overflow;document.body.style.overflow="hidden";try{(0,so.logEvent)("account_sheet_opened",{signedIn:!1})}catch(Bt){}return()=>{window.removeEventListener("keydown",e),document.body.style.overflow=t}}),[n]);return(0,Sr.jsxs)(Tb,{children:[(0,Sr.jsx)(Ib,{onClick:n}),(0,Sr.jsxs)(jb,{onClick:e=>e.stopPropagation(),role:"dialog","aria-label":"Sign in",children:[(0,Sr.jsx)(Pb,{type:"button","aria-label":"Close",onClick:n,children:"\xd7"}),(0,Sr.jsx)(Ab,{type:"button",onClick:n,"aria-label":"Close panel"}),(0,Sr.jsxs)(Nb,{children:[(0,Sr.jsx)(Rb,{children:"signup"===r?"Create Account":"forgot"===r?"Reset Password":"Sign In"}),(0,Sr.jsxs)(Ob,{children:[(0,Sr.jsx)("div",{style:{display:"flex",gap:4,borderBottom:"1px solid rgba(255,255,255,0.08)",marginBottom:14},children:[{k:"signin",label:"Sign In"},{k:"signup",label:"Create"},{k:"forgot",label:"Forgot"}].map((e=>(0,Sr.jsx)("button",{type:"button",onClick:()=>(e=>{i(e),d(""),h("")})(e.k),style:{flex:1,fontFamily:"Montserrat, sans-serif",fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"10px 4px",border:"none",background:"transparent",color:r===e.k?"#FFC72C":"rgba(255,255,255,0.55)",borderBottom:"2px solid "+(r===e.k?"#FFC72C":"transparent"),marginBottom:-1,cursor:"pointer"},children:e.label},e.k)))}),(0,Sr.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),d(""),h(""),f(!0);try{"signin"===r?(await Zo(a.trim(),s),o(""),l("")):"signup"===r?(await Yo(a.trim(),s),o(""),l("")):"forgot"===r&&(await Qo(a.trim()),h("Password reset email sent. Check your inbox."))}catch(t){d(es(t&&t.code))}finally{f(!1)}},children:[(0,Sr.jsx)(Fb,{type:"email",placeholder:"email@example.com",autoComplete:"email",value:a,onChange:e=>o(e.target.value),required:!0,style:{marginBottom:10}}),"forgot"!==r&&(0,Sr.jsx)(Fb,{type:"password",placeholder:"password",autoComplete:"signup"===r?"new-password":"current-password",value:s,onChange:e=>l(e.target.value),required:!0,minLength:6,style:{marginBottom:10}}),(0,Sr.jsx)(zb,{type:"submit",disabled:p,style:{width:"100%"},children:p?"\u2026":"signin"===r?"Sign In":"signup"===r?"Create Account":"Send Reset Email"}),c&&(0,Sr.jsx)(Hb,{children:c}),u&&(0,Sr.jsx)(Vb,{children:u})]})]})]})]})]})}function Jb(e){let{user:t,onClose:n}=e;const r=t?(0,Sr.jsx)(Yb,{user:t,onClose:n}):(0,Sr.jsx)(Zb,{onClose:n});return a.createPortal(r,document.body)}const Qb=_r`
  0%, 100% { transform: rotate(0deg); }
  15% { transform: rotate(-18deg); }
  30% { transform: rotate(14deg); }
  45% { transform: rotate(-10deg); }
  60% { transform: rotate(8deg); }
  80% { transform: rotate(-4deg); }
`,Xb=xr.div`
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 1100;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`,ey=xr.button`
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

  ${e=>e.$jiggling&&br`
    animation: ${Qb} 0.6s ease-in-out;
    transform-origin: center center;
  `}
`,ty=xr.button`
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

  ${e=>e.$jiggling&&br`
    animation: ${Qb} 0.6s ease-in-out;
    transform-origin: center center;
  `}
`;function ny(){const{user:e,loading:n}=Xo(),[r,i]=(0,t.useState)(!1),[a,o]=(0,t.useState)(!1),[s,l]=(0,t.useState)(null),c=(0,t.useRef)(null);if((0,t.useEffect)((()=>{function e(){o(!0),c.current&&clearTimeout(c.current),c.current=setTimeout((()=>o(!1)),650)}function t(){i(!0)}return window.addEventListener("auth:nudge",e),window.addEventListener("auth:open",t),()=>{window.removeEventListener("auth:nudge",e),window.removeEventListener("auth:open",t),c.current&&clearTimeout(c.current)}}),[]),(0,t.useEffect)((()=>{if(!e)return void l(null);const t=(0,Ar.ref)(Nr.OO,`userProfiles/${e.uid}`),n=(0,Ar.Zy)(t,(e=>l(e.val()||{})));return()=>n()}),[e]),n)return(0,Sr.jsx)(Xb,{});const d=s&&s.photoURL||"",u=s&&s.displayName||"",h=u&&u.charAt(0)||(e&&e.email?e.email.charAt(0):"?");return(0,Sr.jsxs)(Sr.Fragment,{children:[(0,Sr.jsx)(Xb,{children:e?(0,Sr.jsx)(ty,{type:"button",$jiggling:a,$photo:d,onClick:()=>{try{(0,so.logEvent)("auth_button_clicked",{signedIn:!0})}catch(Bt){}i(!0)},"aria-label":"Account",children:!d&&h}):(0,Sr.jsx)(ey,{type:"button",$jiggling:a,onClick:()=>{try{(0,so.logEvent)("auth_button_clicked",{signedIn:!1})}catch(Bt){}i(!0)},"aria-label":"Sign in",children:"Sign In"})}),r&&(0,Sr.jsx)(Jb,{user:e,onClose:()=>i(!1)})]})}const ry=_r`from { transform: translateY(120%); opacity: 0; } to { transform: translateY(0); opacity: 1; }`,iy=xr.div`
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
  animation: ${ry} 0.32s cubic-bezier(.22,.61,.36,1);
`,ay=xr.div` flex: 1; line-height: 1.35; `,oy=xr.button`
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
`,sy=xr.button`
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.45);
  font-size: 18px;
  cursor: pointer;
  padding: 4px 6px;
  &:hover { color: #f4f4f4; }
`;function ly(){const[e,n]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{function e(){n(!0)}return window.addEventListener("freshness:update-available",e),()=>window.removeEventListener("freshness:update-available",e)}),[]),e?(0,Sr.jsxs)(iy,{role:"status",children:[(0,Sr.jsx)(ay,{children:"\ud83e\udd5a New version available"}),(0,Sr.jsx)(oy,{type:"button",onClick:()=>{try{const e=new URL(window.location.href);e.searchParams.set("_v",String(Date.now())),window.location.replace(e.toString())}catch(Bt){window.location.reload()}},children:"Refresh"}),(0,Sr.jsx)(sy,{type:"button","aria-label":"Dismiss",onClick:()=>n(!1),children:"\xd7"})]}):null}function cy(){const e=Q(),n=(0,t.useRef)(null);return(0,t.useEffect)((()=>{const t=e.pathname+(e.search||"");if(n.current!==t){n.current=t;try{(0,so.logEvent)("page_view",{path:e.pathname,search:e.search||"",title:"undefined"!==typeof document?document.title:""}),(0,ro.Ie)()}catch(Bt){}}}),[e.pathname,e.search]),null}const dy=function(){return t.useEffect((()=>{const e=()=>{(0,so.logEvent)("pwa_installed",{}),Sb(null)},t=e=>{e.preventDefault(),Sb(e)};return window.addEventListener("appinstalled",e),window.addEventListener("beforeinstallprompt",t),()=>{window.removeEventListener("appinstalled",e),window.removeEventListener("beforeinstallprompt",t)}}),[]),(0,Sr.jsxs)(Ee,{basename:"",children:[(0,Sr.jsx)(cy,{}),(0,Sr.jsx)(ny,{}),(0,Sr.jsx)(ly,{}),(0,Sr.jsxs)(ve,{children:[(0,Sr.jsx)(be,{path:"/",element:(0,Sr.jsx)(zu,{})}),(0,Sr.jsx)(be,{path:"/events/:eventId",element:(0,Sr.jsx)(zu,{})}),(0,Sr.jsx)(be,{path:"/hotdog-counter",element:(0,Sr.jsx)(mh,{})}),(0,Sr.jsx)(be,{path:"/hd.html",element:(0,Sr.jsx)(ge,{to:"/hotdog-counter",replace:!0})}),(0,Sr.jsx)(be,{path:"/hot-dog-counter",element:(0,Sr.jsx)(ge,{to:"/hotdog-counter",replace:!0})}),(0,Sr.jsx)(be,{path:"/admin1",element:(0,Sr.jsx)(Zg,{})}),(0,Sr.jsx)(be,{path:"/admin1/:tab",element:(0,Sr.jsx)(Zg,{})}),(0,Sr.jsx)(be,{path:"/lester-park",element:(0,Sr.jsx)(xb,{})})]})]})};n(684),n(334);const uy=3e5,hy=36e5,py=3e4;let fy=Date.now(),my=0,gy=!1;function by(){if("undefined"===typeof document)return;if("visible"!==document.visibilityState)return;const e=Date.now(),t=e-fy;if(t>=hy){try{console.log(`[stale-guard] visible after ${t}ms \u2014 hard refresh`)}catch(Bt){}!function(e){if(!gy){gy=!0;try{console.log(`[stale-guard] Refreshing for latest\u2026 (away ${e}ms)`)}catch(Bt){}setTimeout((()=>{try{window.location.reload()}catch(Bt){}}),800)}}(t)}else{if(t>=uy){try{console.log(`[stale-guard] visible after ${t}ms \u2014 soft refresh`)}catch(Bt){}!function(e){try{localStorage.setItem("sl_force_refresh","1")}catch(Bt){}try{window.dispatchEvent(new CustomEvent("staleSession:soft",{detail:{awayMs:e}}))}catch(Bt){}}(t)}fy=e,my=e}}!function(){if("undefined"===typeof window||"undefined"===typeof document)return;try{console.log("[stale-guard] init")}catch(Bt){}document.addEventListener("visibilitychange",(()=>{"visible"===document.visibilityState&&by()})),window.addEventListener("focus",by);const e=e=>{!function(e){const t=Date.now();if(t-my<py)fy=t;else{my=t,fy=t;try{console.log("[stale-guard] activity bump",e||"")}catch(Bt){}}}(e&&e.type)};window.addEventListener("pointerdown",e,{passive:!0}),window.addEventListener("keydown",e,{passive:!0})}(),"undefined"!==typeof window&&(window.__sl_stale_guard={getLastActiveAt:()=>fy,setLastActiveAt:e=>{fy=e},forceCheck:by,thresholds:{SOFT_REFRESH_MIN_MS:uy,HARD_RELOAD_MS:hy,ACTIVITY_THROTTLE_MS:py}});const yy=(function(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var i=br.apply(void 0,Ne([e],n,!1)),a="sc-global-".concat(tn(JSON.stringify(i))),o=new wr(i,a),s=function(e){var n=tr(),r=t.useContext(hr),i=t.useRef(n.styleSheet.allocateGSInstance(a)).current;return n.styleSheet.server&&l(i,e,n.styleSheet,r,n.stylis),t.useLayoutEffect((function(){if(!n.styleSheet.server)return l(i,e,n.styleSheet,r,n.stylis),function(){return o.removeStyles(i,n.styleSheet)}}),[i,e,n.styleSheet,r,n.stylis]),null};function l(e,t,n,r,i){if(o.isStatic)o.renderStyles(e,Ut,n,i);else{var a=Ae(Ae({},t),{theme:Ht(t,r,s.defaultProps)});o.renderStyles(e,a,n,i)}}return t.memo(s)})`
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

  /* ────────────────────────────────────────────────────────────────────────
     MASH GAME — locked-state visual stack
     Activates on first press (body[data-mash-locked="1"]).
     Releases on burn-complete (cleared by clearMashEnergy).
     Mobile portrait is the design center; desktop scales gracefully.
     ──────────────────────────────────────────────────────────────────────── */

  /* MashCanvas — full-viewport gradient layer that grows from button center.
     --canvas-radius scales 0→1 across presses 1→50 on an ease-in curve.
     Opacity is bound to canvas-radius so the canvas fades IN as it grows —
     by press 50 it's fully opaque + fully sized = completely solid takeover. */
  .mash-canvas {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 480;
    opacity: var(--canvas-radius, 0);
    background:
      radial-gradient(
        circle at var(--mash-x, 50%) var(--mash-y, 72%),
        rgba(255,107,107,1) 0%,
        rgba(120,40,110,1) 30%,
        rgba(35,20,55,1) 70%,
        rgba(8,5,15,1) 100%
      );
    clip-path: circle(
      calc(var(--canvas-radius, 0) * 150vmax)
      at var(--mash-x, 50%) var(--mash-y, 72%)
    );
    will-change: clip-path, opacity;
  }
  body[data-mash-locked="1"] .mash-canvas {
    /* Canvas stays purely visual — input isolation is done by body::before
       below, which is full-viewport regardless of the canvas clip-path. */
    pointer-events: none;
    z-index: 9000;
  }

  /* ── Input isolation layer ────────────────────────────────────────────────
     During the mash game the page underneath must be fully inert: no link
     activation, no native selection, no map/share button taps, no double-tap
     editor pop-ups. The visible canvas can't do this on its own because its
     clip-path also clips hit-testing — so during the intro (presses 1–24)
     anything outside the growing circle would still receive events.

     Solution: a transparent full-viewport ::before pseudo on body, sitting
     just below the canvas (z 8999) but above all page UI. It absorbs every
     pointer/touch event the moment lock engages.

     What still receives input:
       - kudos-row (z 9001) — the mash button stays clickable
       - flying spawns (z 9100+) — future clickable game elements
     Everything else: dead. */
  body[data-mash-locked="1"]::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 8999;
    background: transparent;
    pointer-events: auto;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  /* Kill page-wide text selection / iOS callout while locked so a long-press
     or double-click anywhere can't pop the OS text editor. */
  body[data-mash-locked="1"] {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  /* Lift all spawn effects above the canvas during the mash game so the
     flying hot dogs, eggs, and phrase characters paint over the canvas
     instead of being buried beneath it. */
  body[data-mash-locked="1"] .flying-hot-dog,
  body[data-mash-locked="1"] .flying-egg,
  body[data-mash-locked="1"] .phrase-char {
    z-index: 9100 !important;
  }

  /* ── Heartbeat / save-timer indicator ────────────────────────────────────
     2500ms duration matches KUDOS_SAVE_DELAY_MS. Restarts on each press.
     Phases (non-linear, accelerating intensity):
     - 0-50%   calm, barely visible
     - 50-65%  subtle scale + slight color drift starts
     - 65-80%  noticeable color shift, hue starts cycling, brightness up
     - 80-92%  scale beats + dramatic hue jumps + saturation spikes
     - 92-100% rapid strobe, intense hue rotation, "about to explode"
     Concentric rings emanate from the button via ::before / ::after with
     staggered keyframes — first ripple at 55%, accelerating through 100%. */
  @keyframes hdHeartbeat {
    0%, 50% { transform: scale(min(var(--mash-scale, 1), 1.15)); filter: none; }
    /* Phase 1: 50→65% — color awareness starts */
    55% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.02)); filter: brightness(1.05) saturate(1.10) hue-rotate(8deg); }
    62% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 0.99)); filter: brightness(1.02) saturate(1.05) hue-rotate(-4deg); }
    /* Phase 2: 65→80% — color drift dialing up */
    68% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.06)); filter: brightness(1.12) saturate(1.20) hue-rotate(18deg); }
    75% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.00)); filter: brightness(1.05) saturate(1.15) hue-rotate(-12deg); }
    /* Phase 3: 80→92% — scale beats + dramatic shifts */
    82% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.10)); filter: brightness(1.20) saturate(1.30) hue-rotate(35deg); }
    86% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 0.97)); filter: brightness(0.92) saturate(1.40) hue-rotate(-25deg); }
    90% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.14)); filter: brightness(1.30) saturate(1.50) hue-rotate(55deg); }
    /* Phase 4: 92→100% — rapid strobe */
    93% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 0.94)); filter: brightness(0.78) saturate(1.60) hue-rotate(-50deg); }
    95% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.20)); filter: brightness(1.50) saturate(1.70) hue-rotate(80deg); }
    97% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 0.90)); filter: brightness(0.65) saturate(1.80) hue-rotate(-70deg); }
    99% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.24)); filter: brightness(1.75) saturate(1.95) hue-rotate(120deg); }
    100% { transform: scale(calc(min(var(--mash-scale, 1), 1.15) * 1.28)); filter: brightness(1.95) saturate(2.10) hue-rotate(160deg); }
  }

  /* Ripple ring 1 — starts at 55%, expands to white. 3 emissions, accelerating. */
  @keyframes hdRipple1 {
    0%, 55% { box-shadow: 0 0 0 0 rgba(255,255,255,0); transform: scale(1); }
    /* Wave A — white */
    58% { box-shadow: 0 0 0 0 rgba(255,255,255,0.95); }
    68% { box-shadow: 0 0 0 18px rgba(255,255,255,0); }
    /* Wave B — gold */
    78% { box-shadow: 0 0 0 0 rgba(255,200,80,1); }
    86% { box-shadow: 0 0 0 24px rgba(255,200,80,0); }
    /* Wave C — red, intense */
    91% { box-shadow: 0 0 0 0 rgba(255,80,80,1); }
    96% { box-shadow: 0 0 0 32px rgba(255,80,80,0); }
    /* Wave D — magenta strobe */
    98% { box-shadow: 0 0 0 0 rgba(255,40,180,1); }
    100% { box-shadow: 0 0 0 38px rgba(255,40,180,0); }
  }

  /* Ripple ring 2 — offset for layered/staggered effect */
  @keyframes hdRipple2 {
    0%, 62% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
    65% { box-shadow: 0 0 0 0 rgba(255,220,150,0.9); }
    74% { box-shadow: 0 0 0 22px rgba(255,220,150,0); }
    83% { box-shadow: 0 0 0 0 rgba(255,140,60,1); }
    89% { box-shadow: 0 0 0 28px rgba(255,140,60,0); }
    94% { box-shadow: 0 0 0 0 rgba(255,60,60,1); }
    98% { box-shadow: 0 0 0 36px rgba(255,60,60,0); }
    100% { box-shadow: 0 0 0 0 rgba(255,60,60,0); }
  }

  .hd-cta.hd-heartbeat {
    animation: hdHeartbeat 2500ms ease-in forwards;
  }
  .hd-cta.hd-heartbeat::before,
  .hd-cta.hd-heartbeat::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: -1;
  }
  .hd-cta.hd-heartbeat::before { animation: hdRipple1 2500ms ease-in forwards; }
  .hd-cta.hd-heartbeat::after  { animation: hdRipple2 2500ms ease-in forwards; }

  /* During the locked game (presses 1–25) the count and challenge sub-text
     coexist inside the button:
       - .mash-num pinned dead-center (vertical + horizontal)
       - .mash-sub pinned to the button's bottom edge (8px above bottom),
         centered horizontally, so it never overlaps the count.
     On press 26 (--sub-out flips 0→1 instantly) the sub JUMPS to a position
     just above the button (anchored to the actual button height --btn-h, so
     it always lands the same visual gap above the box regardless of padding
     or scale). No transition — the user wants a hard cut, not a slide. */
  /* Locked overlay: takes the full button height so flex-stacked children
     (num + sub during 1–25) actually have room to lay out without
     overlapping. transform restores the Y translate that .is-mashing drops. */
  body[data-mash-locked="1"] .hd-cta-mash {
    top: 50% !important;
    bottom: auto !important;
    height: 100% !important;
    transform: translate(-50%, -50%) scale(var(--mash-scale, 1)) !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 2px !important;
    padding: 4px 8px !important;
  }
  body[data-mash-locked="1"] .mash-num {
    /* Flex child — natural width, centered text, line-height tight so it
       doesn't claim more vertical space than its glyph height. */
    position: static;
    left: auto;
    top: auto;
    transform: none;
    width: 100%;
    max-width: 100%;
    text-align: center;
    line-height: 1;
    flex: 0 0 auto;
  }

  /* Sub during PRESSES 1–25 (data-sub-out="0"): sits IN the flex column
     directly below the count, inside the button. No absolute positioning
     means it can't overlap with num — they share the column and stack. */
  body[data-mash-locked="1"][data-sub-out="0"] .mash-sub {
    position: static;
    left: auto;
    bottom: auto;
    transform: none;
    transition: none;
    flex: 0 0 auto;
    /* Smaller during the intro so num + sub stack within the button's
       58–117px height range. */
    font-size: clamp(11px, 2.6vw, 14px);
    line-height: 1.05;
    max-width: 100%;
  }

  /* Sub during PRESSES 26+ (data-sub-out="1"): jumps above the button.
     Uses the measured button height (--btn-h written each press). The
     0.8× ratio lands sub's bottom edge ~8px above the button's top edge
     (math derived from overlay being ~0.6× btn_h centered in button +
     sub anchored 8px from overlay bottom — verified via dumpMashLayout). */
  body[data-mash-locked="1"][data-sub-out="1"] .mash-sub {
    position: absolute;
    left: 50%;
    bottom: 8px;
    /* Math (overlay now fills btn h so sub natural bottom sits at btn_top +
       (btn_h - 8)). To land sub bottom 8px ABOVE btn top:
       translateY = (btn_top - 8) − (btn_top + btn_h − 8) = -btn_h. */
    transform: translateX(-50%)
      translateY(calc(-1 * var(--btn-h, 120px)));
    transition: none;
    flex: initial;
    font-size: clamp(13px, 4vw, 19px);
    line-height: 1.15;
  }

  /* Killing backdrop-filter on the event shell during lock destroys its
     stacking context. Same for CalSection's z-index. Both are stacking
     context creators that were trapping the kudos-row's z-index 9001 inside
     a context lower than the canvas's z 9000. With these dropped, the
     row's z 9001 competes directly with the canvas in the body's stacking
     context — row wins, button paints above canvas.

     The shell/section's other content (banner, name, etc.) stays at z auto
     and remains visually covered by the canvas — desired. */
  body[data-mash-locked="1"] .event-shell {
    backdrop-filter: none !important;
    /* Card's overflow:hidden was clipping the migrated button below its
       natural box. Allow children to render outside while locked. */
    overflow: visible !important;
  }
  body[data-mash-locked="1"] .cal-section,
  body[data-mash-locked="1"] .home-content {
    z-index: auto !important;
  }


  /* Vignette fades while the canvas owns the screen — canvas does the
     darkening job once it's full. */
  body[data-mash-locked="1"] .mash-vignette {
    opacity: calc(0.65 * (1 - var(--canvas-radius, 0))) !important;
    transition: opacity 0.4s ease;
  }

  /* Kudos row migration via transform — stays in document flow (avoids
     containing-block issues with backdrop-filter on Card/SheetBody) and just
     visually translates from its natural slot toward the captured target
     delta over presses 1→25. */
  body[data-mash-locked="1"] .kudos-row {
    z-index: 9001;
    position: relative;
    /* Migration translate + optional drag offset (Pig Boy Attack uses this).
       --btn-drag-x/y are written by KudosCta during pointermove while the
       buttonState is 'draggable'. They persist after pointerup (button
       parks where released) and clear on phase-end (button snaps back
       via the transition rule below). */
    transform: translate(
      calc(var(--btn-dx, 0px) * var(--migration-progress, 0) + var(--btn-drag-x, 0px)),
      calc(var(--btn-dy, 0px) * var(--migration-progress, 0) + var(--btn-drag-y, 0px))
    );
    transition: transform 0.42s cubic-bezier(.22,.61,.36,1);
  }
  /* While draggable, kill the transition so the button tracks the finger
     1:1. data-snap-back is a one-frame override that mode cleanup uses
     to force the button to teleport back to anchor rather than glide. */
  body[data-button-state="draggable"] .kudos-row,
  body[data-snap-back="1"] .kudos-row {
    transition: none;
  }
  body[data-button-state="draggable"] .hd-cta {
    /* Prevent native scroll-on-drag on touch devices */
    touch-action: none;
    cursor: grab;
  }
  body[data-button-state="draggable"] .hd-cta:active {
    cursor: grabbing;
  }

  /* Pig Boy Attack avatar: when active, the mode renders a small emoji
     that tracks the button center. The avatar itself is the touch target
     (pointer-events: auto + direct pointer listeners in the mode), so we
     hide the underlying button visuals and shrink it to a tiny invisible
     disc that just provides positional anchoring for the avatar. */
  /* Pig Boy: the button stays full-sized and fully interactable for drag
     input — but it's visually INVISIBLE. Only the girl emoji (avatar
     overlay) is visible. The button is still the drag target (KudosCta's
     drag wiring handles pointerdown on .hd-cta), but its background /
     border / shadow are transparent and its content is hidden, so the
     player only sees the girl. Pig collision uses the avatar's bounding
     rect (in the mode), not the button's, so pigs only "touch" the
     visible girl, never an invisible button edge. */
  body[data-pig-avatar="1"] .hd-cta {
    background: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
    color: transparent !important;
  }
  body[data-pig-avatar="1"] .hd-cta-mash,
  body[data-pig-avatar="1"] .hd-cta-top,
  body[data-pig-avatar="1"] .hd-cta-text,
  body[data-pig-avatar="1"] .hd-cta.hd-heartbeat::before,
  body[data-pig-avatar="1"] .hd-cta.hd-heartbeat::after {
    display: none;
  }
  /* Avatar pulse — slow, subtle, signals "she's still the target." */
  @keyframes pigAvatarPulse {
    0%, 100% { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.55)) brightness(1.0); }
    50%      { filter: drop-shadow(0 6px 16px rgba(255,179,217,0.85)) brightness(1.10); }
  }
  /* Pure visual overlay — pointer-events: none so taps go through to the
     button below. KudosCta's drag wiring captures pointerdown on .hd-cta
     just like Pong does. */
  .pig-target-avatar {
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .pig-target-avatar.is-pulsing {
    animation: pigAvatarPulse 1.4s ease-in-out infinite;
  }

  /* Button reshape during migration:
     - Width shrinks 25% (1.0 → 0.75) over presses 1→25
     - Vertical padding grows so button gets ~25% taller
     Result by press 25: noticeably more square-ish (still rectangular).
     Outer scale cap at 1.15 stays. */
  /* Button reshape during migration:
     - Width shrinks 32.5% (1.0 → 0.675) by press 25 (25% + additional 10%)
     - Vertical padding grows from 14 → ~45 over presses 1→25 (~50% taller)
     Result: noticeably more square-ish action button at destination.
     Outer scale cap at 1.15 stays. */
  body[data-mash-locked="1"] .hd-cta {
    transform: scale(min(var(--mash-scale, 1), 1.15));
    width: calc(100% - 32.5% * var(--migration-progress, 0));
    margin-left: auto;
    margin-right: auto;
    display: flex;
    /* Use --migration-fast (sqrt curve) so growth is felt earlier in the
       intro. Bumped max from 31 to 48 so final button is heftier. */
    padding-top: calc((var(--hd-pad-y, 14px)) + 48px * var(--migration-fast, 0));
    padding-bottom: calc((var(--hd-pad-y, 14px)) + 48px * var(--migration-fast, 0));
    transition: width 0.42s cubic-bezier(.22,.61,.36,1),
                padding 0.42s cubic-bezier(.22,.61,.36,1);
  }

  /* Lock-release transitions back. .kudos-row drops back into flow when
     [data-mash-locked] is removed. The transition above handles the snap-back
     direction (~450ms). Then position:fixed inline rule clears with the body
     attr removal — kudos-row returns to natural document flow. */

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
    0%, 100% { transform: scale(1);    opacity: 0.85; }
    50%       { transform: scale(1.06); opacity: 1;    }
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
`;i.createRoot(document.getElementById("root")).render((0,Sr.jsxs)(t.StrictMode,{children:[(0,Sr.jsx)(yy,{}),(0,Sr.jsx)(dy,{})]}))})()})();
//# sourceMappingURL=main.13ab04d1.js.map