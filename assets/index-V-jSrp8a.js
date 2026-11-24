(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const Sn=()=>{};var rt={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dt=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},On=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const o=t[n++];e[s++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=t[n++],i=t[n++],a=t[n++],c=((r&7)<<18|(o&63)<<12|(i&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const o=t[n++],i=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(o&63)<<6|i&63)}}return e.join("")},Ge={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const o=t[r],i=r+1<t.length,a=i?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,f=o>>2,h=(o&3)<<4|a>>4;let b=(a&15)<<2|l>>6,g=l&63;c||(g=64,i||(b=64)),s.push(n[f],n[h],n[b],n[g])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Dt(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):On(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const o=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const h=r<t.length?n[t.charAt(r)]:64;if(++r,o==null||a==null||l==null||h==null)throw new Tn;const b=o<<2|a>>4;if(s.push(b),l!==64){const g=a<<4&240|l>>2;if(s.push(g),h!==64){const _=l<<6&192|h;s.push(_)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Tn extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const An=function(t){const e=Dt(t);return Ge.encodeByteArray(e,!0)},Nt=function(t){return An(t).replace(/\./g,"")},Cn=function(t){try{return Ge.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(t){return Pt(void 0,t)}function Pt(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Rn(n)||(t[n]=Pt(t[n],e[n]));return t}function Rn(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn=()=>qe().__FIREBASE_DEFAULTS__,kn=()=>{if(typeof process>"u"||typeof rt>"u")return;const t=rt.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Dn=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Cn(t[1]);return e&&JSON.parse(e)},Nn=()=>{try{return Sn()||vn()||kn()||Dn()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Lt=()=>{var t;return(t=Nn())==null?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}function ze(){try{return typeof indexedDB=="object"}catch{return!1}}function Pn(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var o;e(((o=r.error)==null?void 0:o.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ln="FirebaseError";class ee extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Ln,Object.setPrototypeOf(this,ee.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,je.prototype.create)}}class je{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,o=this.errors[e],i=o?Mn(o,s):"Error",a=`${this.serviceName}: ${i} (${r}).`;return new ee(r,a,s)}}function Mn(t,e){try{let n=0,s="";for(;n<t.length;){const r=t.indexOf("{$",n);if(r===-1){s+=t.substring(n);break}const o=t.indexOf("}",r+2);if(o===-1){s+=t.substring(n);break}const i=t.substring(r+2,o),a=e[i];s+=t.substring(n,r)+(a!=null?String(a):`<${i}?>`),n=o+1}return s}catch{return t}}function De(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const o=t[r],i=e[r];if(ot(o)&&ot(i)){if(!De(o,i))return!1}else if(o!==i)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function ot(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(t){return t&&t._delegate?t._delegate:t}class W{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new fe;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Bn(e))try{this.getOrInitializeService({instanceIdentifier:H})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:r});s.resolve(o)}catch{}}}}clearInstance(e=H){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=H){return this.instances.has(e)}getOptions(e=H){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[o,i]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(o);s===a&&i.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:xn(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=H){return this.component?this.component.multipleInstances?e:H:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function xn(t){return t===H?void 0:t}function Bn(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new $n(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var y;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(y||(y={}));const Un={debug:y.DEBUG,verbose:y.VERBOSE,info:y.INFO,warn:y.WARN,error:y.ERROR,silent:y.SILENT},Hn=y.INFO,Gn={[y.DEBUG]:"log",[y.VERBOSE]:"log",[y.INFO]:"info",[y.WARN]:"warn",[y.ERROR]:"error"},qn=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Gn[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ve{constructor(e){this.name=e,this._logLevel=Hn,this._logHandler=qn,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Un[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,y.DEBUG,...e),this._logHandler(this,y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,y.VERBOSE,...e),this._logHandler(this,y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,y.INFO,...e),this._logHandler(this,y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,y.WARN,...e),this._logHandler(this,y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,y.ERROR,...e),this._logHandler(this,y.ERROR,...e)}}const zn=(t,e)=>e.some(n=>t instanceof n);let it,at;function jn(){return it||(it=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Vn(){return at||(at=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const $t=new WeakMap,Ne=new WeakMap,xt=new WeakMap,we=new WeakMap,We=new WeakMap;function Wn(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",o),t.removeEventListener("error",i)},o=()=>{n(B(t.result)),r()},i=()=>{s(t.error),r()};t.addEventListener("success",o),t.addEventListener("error",i)});return e.then(n=>{n instanceof IDBCursor&&$t.set(n,t)}).catch(()=>{}),We.set(e,t),e}function Kn(t){if(Ne.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",i),t.removeEventListener("abort",i)},o=()=>{n(),r()},i=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",o),t.addEventListener("error",i),t.addEventListener("abort",i)});Ne.set(t,e)}let Pe={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ne.get(t);if(e==="objectStoreNames")return t.objectStoreNames||xt.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return B(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Jn(t){Pe=t(Pe)}function Yn(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(_e(this),e,...n);return xt.set(s,e.sort?e.sort():[e]),B(s)}:Vn().includes(t)?function(...e){return t.apply(_e(this),e),B($t.get(this))}:function(...e){return B(t.apply(_e(this),e))}}function Qn(t){return typeof t=="function"?Yn(t):(t instanceof IDBTransaction&&Kn(t),zn(t,jn())?new Proxy(t,Pe):t)}function B(t){if(t instanceof IDBRequest)return Wn(t);if(we.has(t))return we.get(t);const e=Qn(t);return e!==t&&(we.set(t,e),We.set(e,t)),e}const _e=t=>We.get(t);function Xn(t,e,{blocked:n,upgrade:s,blocking:r,terminated:o}={}){const i=indexedDB.open(t,e),a=B(i);return s&&i.addEventListener("upgradeneeded",c=>{s(B(i.result),c.oldVersion,c.newVersion,B(i.transaction),c)}),n&&i.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{o&&c.addEventListener("close",()=>o()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Zn=["get","getKey","getAll","getAllKeys","count"],es=["put","add","delete","clear"],Ie=new Map;function ct(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ie.get(e))return Ie.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=es.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Zn.includes(n)))return;const o=async function(i,...a){const c=this.transaction(i,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return Ie.set(e,o),o}Jn(t=>({...t,get:(e,n,s)=>ct(e,n)||t.get(e,n,s),has:(e,n)=>!!ct(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ns(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function ns(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Le="@firebase/app",lt="0.16.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L=new Ve("@firebase/app"),ss="@firebase/app-compat",rs="@firebase/analytics-compat",os="@firebase/analytics",is="@firebase/app-check-compat",as="@firebase/app-check",cs="@firebase/auth",ls="@firebase/auth-compat",ds="@firebase/crashlytics",us="@firebase/database",hs="@firebase/data-connect",fs="@firebase/database-compat",ps="@firebase/functions",gs="@firebase/functions-compat",ms="@firebase/installations",bs="@firebase/installations-compat",ys="@firebase/messaging",Es="@firebase/messaging-compat",ws="@firebase/performance",_s="@firebase/performance-compat",Is="@firebase/remote-config",Ss="@firebase/remote-config-compat",Os="@firebase/storage",Ts="@firebase/storage-compat",As="@firebase/firestore",Cs="@firebase/ai",Rs="@firebase/firestore-compat",vs="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me="[DEFAULT]",ks={[Le]:"fire-core",[ss]:"fire-core-compat",[os]:"fire-analytics",[rs]:"fire-analytics-compat",[as]:"fire-app-check",[is]:"fire-app-check-compat",[cs]:"fire-auth",[ls]:"fire-auth-compat",[ds]:"fire-cls",[us]:"fire-rtdb",[hs]:"fire-data-connect",[fs]:"fire-rtdb-compat",[ps]:"fire-fn",[gs]:"fire-fn-compat",[ms]:"fire-iid",[bs]:"fire-iid-compat",[ys]:"fire-fcm",[Es]:"fire-fcm-compat",[ws]:"fire-perf",[_s]:"fire-perf-compat",[Is]:"fire-rc",[Ss]:"fire-rc-compat",[Os]:"fire-gcs",[Ts]:"fire-gcs-compat",[As]:"fire-fst",[Rs]:"fire-fst-compat",[Cs]:"fire-vertex","fire-js":"fire-js",[vs]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pe=new Map,Ds=new Map,$e=new Map;function dt(t,e){try{t.container.addComponent(e)}catch(n){L.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function X(t){const e=t.name;if($e.has(e))return L.debug(`There were multiple attempts to register component ${e}.`),!1;$e.set(e,t);for(const n of pe.values())dt(n,t);for(const n of Ds.values())dt(n,t);return!0}function Bt(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ns(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ps={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},N=new je("app","Firebase",Ps);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new W("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw N.create("app-deleted",{appName:this._name})}}function Ft(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Me,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw N.create("bad-app-name",{appName:String(r)});if(n||(n=Lt()),!n)throw N.create("no-options");const o=pe.get(r);if(o)if(De(n,o.options)){if(De(s,o.config))return o;throw N.create("duplicate-app",{appName:r,mismatchedParam:"config",oldValue:JSON.stringify(o.config),newValue:JSON.stringify(s)})}else throw N.create("duplicate-app",{appName:r,mismatchedParam:"options",oldValue:JSON.stringify(o.options),newValue:JSON.stringify(n)});const i=new Fn(r);for(const c of $e.values())i.addComponent(c);const a=new Ls(n,s,i);return pe.set(r,a),a}function Ut(t=Me){const e=pe.get(t);if(!e&&t===Me&&Lt())return Ft();if(!e)throw N.create("no-app",{appName:t});return e}function j(t,e,n){let s=ks[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const i=[`Unable to register library "${s}" with version "${e}":`];r&&i.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&i.push("and"),o&&i.push(`version name "${e}" contains illegal characters (whitespace or "/")`),L.warn(i.join(" "));return}X(new W(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ms="firebase-heartbeat-database",$s=1,re="firebase-heartbeat-store";let Se=null;function Ht(){return Se||(Se=Xn(Ms,$s,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(re)}catch(n){console.warn(n)}}}}).catch(t=>{throw N.create("idb-open",{originalErrorMessage:t.message})})),Se}async function xs(t){try{const n=(await Ht()).transaction(re),s=await n.objectStore(re).get(Gt(t));return await n.done,s}catch(e){if(e instanceof ee)L.warn(e.message);else{const n=N.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});L.warn(n.message)}}}async function ut(t,e){try{const s=(await Ht()).transaction(re,"readwrite");await s.objectStore(re).put(e,Gt(t)),await s.done}catch(n){if(n instanceof ee)L.warn(n.message);else{const s=N.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});L.warn(s.message)}}}function Gt(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bs=1024,Fs=30;class Us{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Gs(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ht();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(i=>i.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:r}),this._heartbeatsCache.heartbeats.length>Fs){const i=qs(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){L.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=ht(),{heartbeatsToSend:s,unsentEntries:r}=Hs(this._heartbeatsCache.heartbeats),o=Nt(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return L.warn(n),""}}}function ht(){return new Date().toISOString().substring(0,10)}function Hs(t,e=Bs){const n=[];let s=t.slice();for(const r of t){const o=n.find(i=>i.agent===r.agent);if(o){if(o.dates.push(r.date),ft(n)>e){o.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),ft(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Gs{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ze()?Pn().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await xs(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ut(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ut(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ft(t){return Nt(JSON.stringify({version:2,heartbeats:t})).length}function qs(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(t){X(new W("platform-logger",e=>new ts(e),"PRIVATE")),X(new W("heartbeat",e=>new Us(e),"PRIVATE")),j(Le,lt,t),j(Le,lt,"esm2020"),j("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */zs("");var js="firebase",Vs="13.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */j(js,Vs,"app");var pt="@firebase/ai",xe="3.1.0";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z="AI",Ws="global",Ks="firebasevertexai.googleapis.com",ge="v1beta",gt=xe,Js="gl-js",Ys="hybrid",Qs=180*1e3,Xs="gemini-3.5-flash-lite";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u extends ee{constructor(e,n,s){const r=Z,o=`${r}/${e}`,i=`${r}: ${n} (${o})`;super(e,i),this.code=e,this.customErrorData=s,Error.captureStackTrace&&Error.captureStackTrace(this,u),Object.setPrototypeOf(this,u.prototype),this.toString=()=>i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt=["user","model","function","system"],qt={HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"},S={SAFETY:"SAFETY",RECITATION:"RECITATION",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"},O={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},$={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",ALREADY_INITIALIZED:"already-initialized",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K={STRING:"string",NUMBER:"number",INTEGER:"integer",BOOLEAN:"boolean",ARRAY:"array",OBJECT:"object"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={AGENT_PLATFORM:"AGENT_PLATFORM",GOOGLE_AI:"GOOGLE_AI"};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e){this.backendType=e}}class ye extends zt{constructor(){super(M.GOOGLE_AI)}_getModelPath(e,n){return`/${ge}/projects/${e}/${n}`}_getTemplatePath(e,n){return`/${ge}/projects/${e}/templates/${n}`}}class jt extends zt{constructor(e){super(M.AGENT_PLATFORM),this.location=Ws,e&&(this.location=e)}_getModelPath(e,n){return`/${ge}/projects/${e}/locations/${this.location}/${n}`}_getTemplatePath(e,n){return`/${ge}/projects/${e}/locations/${this.location}/templates/${n}`}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(t){if(t instanceof ye)return`${Z}/googleai`;if(t instanceof jt)return`${Z}/agentplatform/${t.location}`;throw new u(d.ERROR,`Invalid backend: ${JSON.stringify(t.backendType)}`)}function er(t){const e=t.split("/");if(e[0]!==Z)throw new u(d.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"agentplatform":const s=e[2];if(!s)throw new u(d.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new jt(s);case"googleai":return new ye;default:throw new u(d.ERROR,`Invalid instance identifier string: '${t}'`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I=new Ve("@firebase/ai");var D;(function(t){t.UNAVAILABLE="unavailable",t.DOWNLOADABLE="downloadable",t.DOWNLOADING="downloading",t.AVAILABLE="available"})(D||(D={}));/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt={type:"text",languages:["en"]},Oe=[Vt,{type:"image"}],Te=[Vt];class C{constructor(e,n,s){this.languageModelProvider=e,this.mode=n,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:Oe,expectedOutputs:Te}},s&&(this.onDeviceParams=s,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=Oe),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=Te)):this.onDeviceParams.createOptions={expectedInputs:Oe,expectedOutputs:Te})}async isAvailable(e){var s;if(!this.mode)return I.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===O.ONLY_IN_CLOUD)return I.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;const n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));if(this.mode===O.ONLY_ON_DEVICE){if(n===D.UNAVAILABLE)throw new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(n===D.DOWNLOADABLE||n===D.DOWNLOADING){I.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(r){throw new u(d.ERROR,r.message)}return!0}return!0}return n!==D.AVAILABLE?(I.debug(`On-device inference unavailable because availability is "${n}".`),!1):C.isOnDeviceRequest(e)?!0:(I.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){const n=await this.createSession(),s=await Promise.all(e.contents.map(C.toLanguageModelMessage)),r=await n.prompt(s,this.onDeviceParams.promptOptions);return C.toResponse(r)}async generateContentStream(e){const n=await this.createSession(),s=await Promise.all(e.contents.map(C.toLanguageModelMessage)),r=n.promptStreaming(s,this.onDeviceParams.promptOptions);return C.toStreamResponse(r)}async countTokens(e){throw new u(d.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return I.debug("Empty prompt rejected for on-device inference."),!1;for(const n of e.contents){if(n.parts.some(s=>"functionResponse"in s))return I.debug("Content with a function response part rejected for on-device inference."),!1;for(const s of n.parts)if("inlineData"in s&&s.inlineData&&C.SUPPORTED_MIME_TYPES.indexOf(s.inlineData.mimeType)===-1)return I.debug(`Unsupported mime type "${s.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){var s;const n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));return(n===D.DOWNLOADABLE||n===D.DOWNLOADING)&&this.download(e),n}download(e){var s;if(this.downloadPromise)return;const n={...this.onDeviceParams.createOptions};n&&!n.monitor&&e&&(n.monitor=r=>{r.addEventListener("downloadprogress",o=>{e(o.loaded)})}),this.downloadPromise=(s=this.languageModelProvider)==null?void 0:s.create(n).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){const n=await Promise.all(e.parts.map(C.toLanguageModelMessageContent));return{role:C.toLanguageModelMessageRole(e.role),content:n}}static async toLanguageModelMessageContent(e){if("text"in e&&typeof e.text=="string")return{type:"text",value:e.text};if("inlineData"in e&&e.inlineData){const s=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(s)}}throw new u(d.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new u(d.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");const e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){const n=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(s,r){const o=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:s}]}}]});r.enqueue(n.encode(`data: ${o}

`))}}))}}}C.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function tr(t,e,n){const r=(e||qe()).LanguageModel;if(r&&t)return new C(r,t,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,n,s,r,o){this.app=e,this.backend=n,this.chromeAdapterFactory=o;const i=r==null?void 0:r.getImmediate({optional:!0}),a=s==null?void 0:s.getImmediate({optional:!0});this.auth=a||null,this.appCheck=i||null}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sr(t,{instanceIdentifier:e}){if(!e)throw new u(d.ERROR,"AIService instance identifier is undefined.");const n=er(e),s=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal");return new nr(s,n,r,o,tr)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rr(t){var n,s,r,o,i,a,c;if((s=(n=t.app)==null?void 0:n.options)!=null&&s.apiKey)if((o=(r=t.app)==null?void 0:r.options)!=null&&o.projectId){if(!((a=(i=t.app)==null?void 0:i.options)!=null&&a.appId))throw new u(d.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new u(d.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new u(d.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');const e={apiKey:t.app.options.apiKey,project:t.app.options.projectId,appId:t.app.options.appId,automaticDataCollectionEnabled:t.app.automaticDataCollectionEnabled,backend:t.backend};if(Ns(t.app)&&t.app.settings.appCheckToken){const l=t.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:l})}else t.appCheck&&((c=t.options)!=null&&c.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>t.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>t.appCheck.getToken());return t.auth&&(e.getAuthToken=()=>t.auth.getToken()),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e,n){this._apiSettings=rr(e),this.model=ne.normalizeModelName(n,this._apiSettings.backend.backendType)}static normalizeModelName(e,n){return n===M.GOOGLE_AI?ne.normalizeGoogleAIModelName(e):ne.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let n;return e.includes("/")?e.startsWith("models/")?n=`publishers/google/${e}`:n=e:n=`publishers/google/models/${e}`,n}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or="Timeout has expired.",Ae="AbortError";class ir{constructor(e){this.params=e}toString(){const e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){var e;return((e=this.params.singleRequestOptions)==null?void 0:e.baseUrl)??`https://${Ks}`}get queryParams(){const e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}}function ar(t){const e=[];return e.push(`${Js}/${gt}`),e.push(`fire/${gt}`),(t.params.apiSettings.inferenceMode===O.PREFER_ON_DEVICE||t.params.apiSettings.inferenceMode===O.PREFER_IN_CLOUD)&&e.push(Ys),e.join(" ")}async function cr(t){const e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",ar(t)),e.append("x-goog-api-key",t.params.apiSettings.apiKey),t.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",t.params.apiSettings.appId),t.params.apiSettings.getAppCheckToken){const n=await t.params.apiSettings.getAppCheckToken();n&&(e.append("X-Firebase-AppCheck",n.token),n.error&&I.warn(`Unable to obtain a valid App Check token: ${n.error.message}`))}if(t.params.apiSettings.getAuthToken){const n=await t.params.apiSettings.getAuthToken();n&&e.append("Authorization",`Firebase ${n.accessToken}`)}return e}async function Ke(t,e){var l,f;const n=new ir(t);let s;const r=(l=t.singleRequestOptions)==null?void 0:l.signal,o=((f=t.singleRequestOptions)==null?void 0:f.timeout)!=null&&t.singleRequestOptions.timeout>=0?t.singleRequestOptions.timeout:Qs,i=new AbortController,a=setTimeout(()=>{i.abort(new DOMException(or,Ae)),I.debug(`Aborting request to ${n} due to timeout (${o}ms)`)},o),c=AbortSignal.any(r?[r,i.signal]:[i.signal]);if(r&&r.aborted)throw clearTimeout(a),new DOMException(r.reason??"Aborted externally before fetch",Ae);try{const h={method:"POST",headers:await cr(n),signal:c,body:e};if(s=await fetch(n.toString(),h),!s.ok){let b="",g;try{const _=await s.json();b=_.error.message,_.error.details&&(b+=` ${JSON.stringify(_.error.details)}`,g=_.error.details)}catch{}throw s.status===403&&g&&g.some(_=>_.reason==="SERVICE_DISABLED")&&g.some(_=>{var R,m;return(m=(R=_.links)==null?void 0:R[0])==null?void 0:m.description.includes("Google developers console API activation")})?new u(d.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${n.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:s.status,statusText:s.statusText,errorDetails:g}):new u(d.FETCH_ERROR,`Error fetching from ${n}: [${s.status} ${s.statusText}] ${b}`,{status:s.status,statusText:s.statusText,errorDetails:g})}}catch(h){let b=h;throw h.code!==d.FETCH_ERROR&&h.code!==d.API_NOT_ENABLED&&h instanceof Error&&h.name!==Ae&&(b=new u(d.ERROR,`Error fetching from ${n.toString()}: ${h.message}`),b.stack=h.stack),b}finally{clearTimeout(a)}return s}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(t){if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&I.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Kt(t.candidates[0]))throw new u(d.RESPONSE_ERROR,`Response error: ${G(t)}. Response body stored in error.response`,{response:t});return!0}else return!1}function k(t){return"type"in t&&t.type?t:t.text!==void 0?{...t,type:"text"}:t.inlineData!==void 0?{...t,type:"inlineData"}:t.functionCall!==void 0?{...t,type:"functionCall"}:t.functionResponse!==void 0?{...t,type:"functionResponse"}:t.fileData!==void 0?{...t,type:"fileData"}:t.executableCode!==void 0?{...t,type:"executableCode"}:t.codeExecutionResult!==void 0?{...t,type:"codeExecutionResult"}:t}function me(t,e=$.IN_CLOUD){var s,r;if((s=t.candidates)!=null&&s[0]&&!t.candidates[0].hasOwnProperty("index")&&(t.candidates[0].index=0),t.candidates)for(const o of t.candidates)(r=o.content)!=null&&r.parts&&(o.content.parts=o.content.parts.map(k));const n=lr(t);return n.inferenceSource=e,n}function lr(t){return t.text=()=>{if(ae(t))return bt(t,e=>!("thought"in e&&e.thought));if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Text not available. ${G(t)}`,{response:t});return""},t.thoughtSummary=()=>{if(ae(t)){const e=bt(t,n=>!!("thought"in n&&n.thought));return e===""?void 0:e}else if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Thought summary not available. ${G(t)}`,{response:t})},t.inlineDataParts=()=>{if(ae(t))return dr(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Data not available. ${G(t)}`,{response:t})},t.functionCalls=()=>{if(ae(t))return Wt(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Function call not available. ${G(t)}`,{response:t})},t}function bt(t,e){var s,r,o,i;const n=[];if((r=(s=t.candidates)==null?void 0:s[0].content)!=null&&r.parts)for(const a of(i=(o=t.candidates)==null?void 0:o[0].content)==null?void 0:i.parts){const c=k(a);c.type==="text"&&e(c)&&n.push(c.text)}return n.length>0?n.join(""):""}function Wt(t){var n,s,r,o;if(!t)return;const e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(const i of(o=(r=t.candidates)==null?void 0:r[0].content)==null?void 0:o.parts){const a=k(i);a.type==="functionCall"&&e.push(a.functionCall)}if(e.length>0)return e}function dr(t){var n,s,r,o;const e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(const i of(o=(r=t.candidates)==null?void 0:r[0].content)==null?void 0:o.parts){const a=k(i);a.type==="inlineData"&&e.push(a)}if(e.length>0)return e}const ur=[S.RECITATION,S.SAFETY,S.BLOCKLIST,S.PROHIBITED_CONTENT,S.SPII,S.MALFORMED_FUNCTION_CALL,S.IMAGE_SAFETY,S.IMAGE_PROHIBITED_CONTENT,S.IMAGE_OTHER,S.NO_IMAGE,S.IMAGE_RECITATION,S.LANGUAGE,S.UNEXPECTED_TOOL_CALL,S.TOO_MANY_TOOL_CALLS,S.MISSING_THOUGHT_SIGNATURE,S.MALFORMED_RESPONSE];function Kt(t){return!!t.finishReason&&ur.some(e=>e===t.finishReason)}function G(t){var n,s,r;let e="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)e+="Response was blocked",(n=t.promptFeedback)!=null&&n.blockReason&&(e+=` due to ${t.promptFeedback.blockReason}`),(s=t.promptFeedback)!=null&&s.blockReasonMessage&&(e+=`: ${t.promptFeedback.blockReasonMessage}`);else if((r=t.candidates)!=null&&r[0]){const o=t.candidates[0];Kt(o)&&(e+=`Candidate was blocked due to ${o.finishReason}`,o.finishMessage&&(e+=`: ${o.finishMessage}`))}return e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{type:"text",text:t}]};if(t.type==="text"||"text"in t&&typeof t.text=="string")return{role:"system",parts:[z(k(t))]};if(t.parts){const e=t.parts.map(n=>z(k(n)));return t.role?{...t,parts:e}:{role:"system",parts:e}}}}function te(t){let e=[];if(typeof t=="string")e=[{type:"text",text:t}];else for(const n of t)typeof n=="string"?e.push({type:"text",text:n}):e.push(z(k(n)));return hr(e)}function hr(t){const e={role:"user",parts:[]};let n=!1,s=!1;for(const r of t)r.type==="functionResponse"||"functionResponse"in r?s=!0:n=!0,e.parts.push(r);if(n&&s)throw new u(d.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!n&&!s)throw new u(d.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function Ce(t){let e;if(t.contents){const n=t;e={...n,contents:n.contents.map(s=>({...s,parts:s.parts?s.parts.map(k):[]}))}}else e={contents:[te(t)]};return t.systemInstruction&&(e.systemInstruction=Je(t.systemInstruction)),e}function fr(t){return t.parts&&Array.isArray(t.parts)?{...t,parts:t.parts.map(Ye)}:t}function Ye(t){let e;if("type"in t){const{type:n,...s}=t;e=s}else e=t;return e.functionResponse&&(e={...e,functionResponse:fr(e.functionResponse)}),e}function Qe(t){return t.parts?{...t,parts:t.parts.map(Ye)}:t}function Jt(t){return t==null||typeof t=="string"?t:"parts"in t&&Array.isArray(t.parts)?Qe(t):Ye(t)}function Yt(t){const e={...t};return e.contents&&(e.contents=e.contents.map(Qe)),e.systemInstruction&&(e.systemInstruction=Jt(e.systemInstruction)),e}function pr(t){const e={...t};return e.contents&&(e.contents=e.contents.map(Qe)),e.systemInstruction&&(e.systemInstruction=Jt(e.systemInstruction)),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(t){var e,n;if((e=t.safetySettings)==null||e.forEach(s=>{if(s.method)throw new u(d.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),(n=t.generationConfig)!=null&&n.topK){const s=Math.round(t.generationConfig.topK);s!==t.generationConfig.topK&&(I.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),t.generationConfig.topK=s)}return t}function Xe(t){return{candidates:t.candidates?mr(t.candidates):void 0,promptFeedback:t.promptFeedback?br(t.promptFeedback):void 0,usageMetadata:t.usageMetadata}}function gr(t,e){return{generateContentRequest:{model:e,...t}}}function mr(t){const e=[];let n;return e&&t.forEach(s=>{var i,a;let r;if(s.citationMetadata&&(r={citations:s.citationMetadata.citationSources}),s.safetyRatings&&(n=s.safetyRatings.map(c=>({...c,severity:c.severity??qt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:c.probabilityScore??0,severityScore:c.severityScore??0}))),(a=(i=s.content)==null?void 0:i.parts)!=null&&a.some(c=>"videoMetadata"in c&&c.videoMetadata))throw new u(d.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");const o={index:s.index,content:s.content,finishReason:s.finishReason,finishMessage:s.finishMessage,safetyRatings:n,citationMetadata:r,groundingMetadata:s.groundingMetadata,urlContextMetadata:s.urlContextMetadata};e.push(o)}),e}function br(t){const e=[];return(t.safetyRatings??[]).forEach(s=>{e.push({category:s.category,probability:s.probability,severity:s.severity??qt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:s.probabilityScore??0,severityScore:s.severityScore??0,blocked:s.blocked})}),{blockReason:t.blockReason,safetyRatings:e,blockReasonMessage:t.blockReasonMessage}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function yr(t,e,n){const s=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),r=Ir(s),[o,i]=r.tee(),{response:a,firstValue:c}=await Er(i,e,n);return{stream:_r(o,e,n),response:a,firstValue:c}}async function Er(t,e,n){const[s,r]=t.tee(),o=s.getReader(),{value:i}=await o.read();return{firstValue:i,response:wr(r,e,n)}}async function wr(t,e,n){const s=[],r=t.getReader();for(;;){const{done:o,value:i}=await r.read();if(o){let a=Sr(s);return e.backend.backendType===M.GOOGLE_AI&&(a=Xe(a)),me(a,n)}s.push(i)}}async function*_r(t,e,n){var r,o;const s=t.getReader();for(;;){const{value:i,done:a}=await s.read();if(a)break;let c;e.backend.backendType===M.GOOGLE_AI?c=me(Xe(i),n):c=me(i,n);const l=(r=c.candidates)==null?void 0:r[0];!((o=l==null?void 0:l.content)!=null&&o.parts)&&!(l!=null&&l.finishReason)&&!(l!=null&&l.citationMetadata)&&!(l!=null&&l.urlContextMetadata)||(yield c)}}function Ir(t){const e=t.getReader();return new ReadableStream({start(s){let r="";return o();function o(){return e.read().then(({value:i,done:a})=>{if(a){if(r.trim()){s.error(new u(d.PARSE_FAILED,"Failed to parse stream"));return}s.close();return}r+=i;let c=r.match(yt),l;for(;c;){try{l=JSON.parse(c[1])}catch{s.error(new u(d.PARSE_FAILED,`Error parsing JSON response: "${c[1]}`));return}s.enqueue(l),r=r.substring(c[0].length),c=r.match(yt)}return o()})}}})}function Sr(t){const e=t[t.length-1],n={promptFeedback:e==null?void 0:e.promptFeedback};for(const s of t)if(s.candidates)for(const r of s.candidates){const o=r.index||0;n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:r.index}),n.candidates[o].citationMetadata=r.citationMetadata,n.candidates[o].finishReason=r.finishReason,n.candidates[o].finishMessage=r.finishMessage,n.candidates[o].safetyRatings=r.safetyRatings,n.candidates[o].groundingMetadata=r.groundingMetadata;const i=r.urlContextMetadata;if(typeof i=="object"&&i!==null&&Object.keys(i).length>0&&(n.candidates[o].urlContextMetadata=i),r.content){if(!r.content.parts)continue;n.candidates[o].content||(n.candidates[o].content={role:r.content.role||"user",parts:[]});for(const a of r.content.parts){if("text"in a&&a.text==="")continue;if(Object.keys(a).length===0)throw new u(d.INVALID_CONTENT,"Part should have at least one property, but there are none. This is likely caused by a malformed response from the backend.");const c=k({...a});Object.keys(c).length>0&&n.candidates[o].content.parts.push(c)}}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or=[d.FETCH_ERROR,d.ERROR,d.API_NOT_ENABLED];async function Xt(t,e,n,s){if(!e)return{response:await s(),inferenceSource:$.IN_CLOUD};switch(e.mode){case O.ONLY_ON_DEVICE:if(await e.isAvailable(t))return{response:await n(),inferenceSource:$.ON_DEVICE};throw new u(d.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case O.ONLY_IN_CLOUD:return{response:await s(),inferenceSource:$.IN_CLOUD};case O.PREFER_IN_CLOUD:try{return{response:await s(),inferenceSource:$.IN_CLOUD}}catch(r){if(r instanceof u&&Or.includes(r.code)&&await e.isAvailable(t))return{response:await n(),inferenceSource:$.ON_DEVICE};throw r}case O.PREFER_ON_DEVICE:return await e.isAvailable(t)?{response:await n(),inferenceSource:$.ON_DEVICE}:{response:await s(),inferenceSource:$.IN_CLOUD};default:throw new u(d.ERROR,`Unexpected infererence mode: ${e.mode}`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tr(t,e,n,s){return n=Yt(n),t.backend.backendType===M.GOOGLE_AI&&(n=Qt(n)),Ke({task:"streamGenerateContent",model:e,apiSettings:t,stream:!0,singleRequestOptions:s},JSON.stringify(n))}async function Zt(t,e,n,s,r){const o=await Xt(n,s,()=>s.generateContentStream(n),()=>Tr(t,e,n,r));return yr(o.response,t,o.inferenceSource)}async function Ar(t,e,n,s){return n=Yt(n),t.backend.backendType===M.GOOGLE_AI&&(n=Qt(n)),Ke({model:e,task:"generateContent",apiSettings:t,stream:!1,singleRequestOptions:s},JSON.stringify(n))}async function en(t,e,n,s,r){const o=await Xt(n,s,()=>s.generateContent(n),()=>Ar(t,e,n,r)),i=await Cr(o.response,t);return{response:me(i,o.inferenceSource)}}async function Cr(t,e){const n=await t.json();return e.backend.backendType===M.GOOGLE_AI?Xe(n):n}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et="SILENT_ERROR",wt=10;class Rr{constructor(e,n,s){this.params=n,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,z(this._history).map(e=>({...e,parts:e.parts?e.parts.map(k):[]}))}async _sendMessage(e,n){let s={};await this._sendPromise;const r=[];return this._sendPromise=this._sendPromise.then(async()=>{var c,l,f;let o,i=0;const a=((c=this.requestOptions)==null?void 0:c.maxSequentialFunctionCalls)??wt;do{let h;if(o){i++;const _=await this._callFunctionsAsNeeded(o);h=te(_)}else h=te(e);const b=this._formatRequest(h,[...r]);r.push(h);const g=await this._callGenerateContent(b,n);if(g)if(s=g,o=this._getCallableFunctionCalls(g.response),g.response.candidates&&g.response.candidates.length>0){const _={parts:((l=g.response.candidates)==null?void 0:l[0].content.parts)||[],role:((f=g.response.candidates)==null?void 0:f[0].content.role)||"model"};r.push(z(_))}else{const _=G(g.response);_&&I.warn(`sendMessage() was unsuccessful. ${_}. Inspect response object for details.`)}else o=void 0}while(o&&i<a);o&&i>=a&&I.warn(`Automatic function calling exceeded the limit of ${a} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(r),s}async _sendMessageStream(e,n){await this._sendPromise;const s=[],o=(async()=>{var f;let i,a=0;const c=((f=this.requestOptions)==null?void 0:f.maxSequentialFunctionCalls)??wt;let l;do{let h;if(i){a++;const g=await this._callFunctionsAsNeeded(i);h=te(g)}else h=te(e);const b=this._formatRequest(h,[...s]);if(s.push(h),l=await this._callGenerateContentStream(b,n),i=this._getCallableFunctionCalls(l.firstValue),i&&l.firstValue&&l.firstValue.candidates&&l.firstValue.candidates.length>0){const g={...l.firstValue.candidates[0].content};g.role||(g.role="model"),s.push(g)}}while(i&&a<c);return i&&a>=c&&I.warn(`Automatic function calling exceeded the limit of ${c} function calls. Returning last model response.`),{stream:l.stream,response:l.response}})();return this._sendPromise=this._sendPromise.then(async()=>o).catch(i=>{throw new Error(Et)}).then(i=>i.response).then(i=>{if(i.candidates&&i.candidates.length>0){this._history=this._history.concat(s);const a={...i.candidates[0].content};a.role||(a.role="model"),this._history.push(z(a))}else{const a=G(i);a&&I.warn(`sendMessageStream() was unsuccessful. ${a}. Inspect response object for details.`)}}).catch(i=>{i.message!==Et&&i.name!=="AbortError"&&I.error(i)}),o}_getCallableFunctionCalls(e){var r,o,i;const n=(o=(r=this.params)==null?void 0:r.tools)==null?void 0:o.find(a=>a.functionDeclarations);if(!(n!=null&&n.functionDeclarations))return;const s=Wt(e);if(s){for(const a of s)if(!((i=n.functionDeclarations)==null?void 0:i.some(l=>l.name===a.name&&typeof l.functionReference=="function")))return;return s}}async _callFunctionsAsNeeded(e){var o,i;const n=[],s=[],r=(i=(o=this.params)==null?void 0:o.tools)==null?void 0:i.find(a=>a.functionDeclarations);if(r&&r.functionDeclarations){for(const c of e){const l=r.functionDeclarations.find(f=>f.name===c.name);if(l!=null&&l.functionReference){const f=Promise.resolve(l.functionReference(c.args)).catch(h=>{const b=new u(d.ERROR,`Error in user-defined function "${l.name}": ${h.message}`);throw b.stack=h.stack,b});n.push({name:c.name,id:c.id,results:f}),s.push(f)}}await Promise.all(s);const a=[];for(const{name:c,id:l,results:f}of n){const h={name:c,response:await f};l&&(h.id=l),a.push({type:"functionResponse",functionResponse:h})}return a}else throw new u(d.REQUEST_ERROR,'No function declarations were provided in "tools".')}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],kr={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},_t={user:["model"],function:["model"],model:["user","function"],system:[]};function Dr(t){let e=null;for(const n of t){const{role:s,parts:r}=n;if(!e&&s!=="user")throw new u(d.INVALID_CONTENT,`First Content should be with role 'user', got ${s}`);if(!mt.includes(s))throw new u(d.INVALID_CONTENT,`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(mt)}`);if(!Array.isArray(r))throw new u(d.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(r.length===0)throw new u(d.INVALID_CONTENT,"Each Content should have at least one part");const o={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const a of r){if(a.type)o[a.type]+=1;else for(const c of["text","inlineData","functionCall","functionResponse","fileData","executableCode","codeExecutionResult"])c in a&&(o[c]+=1);"thought"in a&&a.thought&&(o.thought+=1),"thoughtSignature"in a&&a.thoughtSignature&&(o.thoughtSignature+=1)}const i=kr[s];for(const a of vr)if(!i.includes(a)&&o[a]>0)throw new u(d.INVALID_CONTENT,`Content with role '${s}' can't contain '${a}' part`);if(e&&!_t[s].includes(e.role))throw new u(d.INVALID_CONTENT,`Content with role '${s}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(_t)}`);e=n}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr extends Rr{constructor(e,n,s,r,o){var i;super(e,r,o),this.model=n,this.chromeAdapter=s,this.params=r,this.requestOptions=o,r!=null&&r.history&&(Dr(r.history),this._history=z(r.history)),((i=this.params)==null?void 0:i.systemInstruction)!=null&&(this.params={...this.params,systemInstruction:Je(this.params.systemInstruction)})}_formatRequest(e,n){var s,r,o,i,a;return{safetySettings:(s=this.params)==null?void 0:s.safetySettings,generationConfig:(r=this.params)==null?void 0:r.generationConfig,tools:(o=this.params)==null?void 0:o.tools,toolConfig:(i=this.params)==null?void 0:i.toolConfig,systemInstruction:(a=this.params)==null?void 0:a.systemInstruction,contents:[...this._history,...n,e]}}_callGenerateContent(e,n){return en(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}_callGenerateContentStream(e,n){return Zt(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}async sendMessage(e,n){return this._sendMessage(e,n)}async sendMessageStream(e,n){return this._sendMessageStream(e,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pr(t,e,n,s){n=pr(n);let r="";if(t.backend.backendType===M.GOOGLE_AI){const i=gr(n,e);r=JSON.stringify(i)}else r=JSON.stringify(n);return(await Ke({model:e,task:"countTokens",apiSettings:t,stream:!1,singleRequestOptions:s},r)).json()}async function Lr(t,e,n,s,r){if((s==null?void 0:s.mode)===O.ONLY_ON_DEVICE)throw new u(d.UNSUPPORTED,"countTokens() is not supported for on-device models.");return Pr(t,e,n,r)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr extends ne{constructor(e,n,s,r){super(e,n.model),this.chromeAdapter=r,this.generationConfig=n.generationConfig||{},$r(this.generationConfig),this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=Je(n.systemInstruction),this.requestOptions=s||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===O.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===D.UNAVAILABLE){const s=new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===O.ONLY_ON_DEVICE)throw s;I.debug(s.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,n){const s=Ce(e);return en(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n})}async generateContentStream(e,n){const s=Ce(e),{stream:r,response:o}=await Zt(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n});return{stream:r,response:o}}startChat(e){return new Nr(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,n){const s=Ce(e);return Lr(this._apiSettings,this.model,s,this.chromeAdapter,{...this.requestOptions,...n})}}function $r(t){var e,n;if(((e=t.thinkingConfig)==null?void 0:e.thinkingBudget)!=null&&((n=t.thinkingConfig)!=null&&n.thinkingLevel))throw new u(d.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(t.responseSchema!=null&&t.responseJsonSchema!=null)throw new u(d.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((t.responseSchema!=null||t.responseJsonSchema!=null)&&t.responseMimeType!=="application/json"&&t.responseMimeType!=="text/x.enum")throw new u(d.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e){if(!e.type&&!e.anyOf)throw new u(d.INVALID_SCHEMA,"A schema must have either a 'type' or an 'anyOf' array of sub-schemas.");for(const n in e)this[n]=e[n];this.type=e.type,this.format=e.hasOwnProperty("format")?e.format:void 0,this.nullable=e.hasOwnProperty("nullable")?!!e.nullable:!1}toJSON(){const e={type:this.type};for(const n in this)this.hasOwnProperty(n)&&this[n]!==void 0&&(n!=="required"||this.type===K.OBJECT)&&(e[n]=this[n]);return e}static array(e){return new Ur(e,e.items)}static object(e){return new Hr(e,e.properties,e.optionalProperties)}static string(e){return new It(e)}static enumString(e){return new It(e,e.enum)}static integer(e){return new xr(e)}static number(e){return new Br(e)}static boolean(e){return new Fr(e)}static anyOf(e){return new Gr(e)}}class xr extends E{constructor(e){super({type:K.INTEGER,...e})}}class Br extends E{constructor(e){super({type:K.NUMBER,...e})}}class Fr extends E{constructor(e){super({type:K.BOOLEAN,...e})}}class It extends E{constructor(e,n){super({type:K.STRING,...e}),this.enum=n}toJSON(){const e=super.toJSON();return this.enum&&(e.enum=this.enum),e}}class Ur extends E{constructor(e,n){super({type:K.ARRAY,...e}),this.items=n}toJSON(){const e=super.toJSON();return e.items=this.items.toJSON(),e}}class Hr extends E{constructor(e,n,s=[]){super({type:K.OBJECT,...e}),this.properties=n,this.optionalProperties=s}toJSON(){const e=super.toJSON();e.properties={...this.properties};const n=[];if(this.optionalProperties){for(const s of this.optionalProperties)if(!this.properties.hasOwnProperty(s))throw new u(d.INVALID_SCHEMA,`Property "${s}" specified in "optionalProperties" does not exist.`)}for(const s in this.properties)this.properties.hasOwnProperty(s)&&(e.properties[s]=this.properties[s].toJSON(),this.optionalProperties.includes(s)||n.push(s));return n.length>0&&(e.required=n),delete e.optionalProperties,e}}class Gr extends E{constructor(e){if(e.anyOf.length===0)throw new u(d.INVALID_SCHEMA,"The 'anyOf' array must not be empty.");super({...e,type:void 0}),this.anyOf=e.anyOf}toJSON(){const e=super.toJSON();return this.anyOf&&Array.isArray(this.anyOf)&&(e.anyOf=this.anyOf.map(n=>n.toJSON())),e}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qr(t=Ut(),e){t=Mt(t);const n=Bt(t,Z),s=(e==null?void 0:e.backend)??new ye,r=Zs(s),o=n.getImmediate({identifier:r}),i=o.options;if(i){const a=e==null?void 0:e.useLimitedUseAppCheckTokens,c=!!i.useLimitedUseAppCheckTokens;if(a!=null&&!!a!==c)throw new u(d.ALREADY_INITIALIZED,`getAI() has already been called for app "${t.name}" and this backend with useLimitedUseAppCheckTokens: ${c}. This option cannot be changed after the AI instance has been initialized. Pass the desired options to the first getAI() call for this app and backend, or omit useLimitedUseAppCheckTokens to reuse the existing instance.`);return o}return o.options={useLimitedUseAppCheckTokens:(e==null?void 0:e.useLimitedUseAppCheckTokens)??!1},o}const zr=["mode","onDeviceParams","inCloudParams"];function jr(t,e,n){var a;const s=e;let r;if(s.mode){for(const c of Object.keys(e))zr.includes(c)||I.warn(`When a hybrid inference mode is specified (mode is currently set to ${s.mode}), "${c}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);r=s.inCloudParams||{model:Xs}}else r=e;if(!r.model)throw new u(d.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");const o=(a=t.chromeAdapterFactory)==null?void 0:a.call(t,s.mode,typeof window>"u"?void 0:window,s.onDeviceParams),i=new Mr(t,r,n,o);return i._apiSettings.inferenceMode=s.mode,i}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(){X(new W(Z,sr,"PUBLIC").setMultipleInstances(!0)),j(pt,xe),j(pt,xe,"esm2020")}Vr();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be=new Map,tn={activated:!1,tokenObservers:[]},Wr={initialized:!1,enabled:!1};function T(t){return Be.get(t)||{...tn}}function Kr(t,e){return Be.set(t,e),Be.get(t)}function Ee(){return Wr}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr="https://content-firebaseappcheck.googleapis.com/v1",Yr="exchangeDebugToken",St={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e,n,s,r,o){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=r,this.upperBound=o,this.pending=null,this.nextErrorWaitInterval=r,r>o)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new fe,this.pending.promise.catch(n=>{}),await Xr(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new fe,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function Xr(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},v=new je("appCheck","AppCheck",Zr);function nn(t){if(!T(t).activated)throw v.create("use-before-activation",{appName:t.name})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sn({url:t,body:e},n){const s={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){const h=await r.getHeartbeatsHeader();h&&(s["X-Firebase-Client"]=h)}const o={method:"POST",body:JSON.stringify(e),headers:s};let i;try{i=await fetch(t,o)}catch(h){throw v.create("fetch-network-error",{originalErrorMessage:h==null?void 0:h.message})}if(i.status!==200)throw v.create("fetch-status-error",{httpStatus:i.status});let a;try{a=await i.json()}catch(h){throw v.create("fetch-parse-error",{originalErrorMessage:h==null?void 0:h.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw v.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,f=Date.now();return{token:a.token,expireTimeMillis:f+l,issuedAtTimeMillis:f}}function rn(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${Jr}/projects/${n}/apps/${s}:${Yr}?key=${r}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo="firebase-app-check-database",to=1,oe="firebase-app-check-store",on="debug-token";let ce=null;function an(){return ce||(ce=new Promise((t,e)=>{try{const n=indexedDB.open(eo,to);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{var r;e(v.create("storage-open",{originalErrorMessage:(r=s.target.error)==null?void 0:r.message}))},n.onupgradeneeded=s=>{const r=s.target.result;switch(s.oldVersion){case 0:r.createObjectStore(oe,{keyPath:"compositeKey"})}}}catch(n){e(v.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}}),ce)}function no(t){return ln(dn(t))}function so(t,e){return cn(dn(t),e)}function ro(t){return cn(on,t)}function oo(){return ln(on)}async function cn(t,e){const s=(await an()).transaction(oe,"readwrite"),o=s.objectStore(oe).put({compositeKey:t,value:e});return new Promise((i,a)=>{o.onsuccess=c=>{i()},s.onerror=c=>{var l;a(v.create("storage-set",{originalErrorMessage:(l=c.target.error)==null?void 0:l.message}))}})}async function ln(t){const n=(await an()).transaction(oe,"readonly"),r=n.objectStore(oe).get(t);return new Promise((o,i)=>{r.onsuccess=a=>{const c=a.target.result;o(c?c.value:void 0)},n.onerror=a=>{var c;i(v.create("storage-get",{originalErrorMessage:(c=a.target.error)==null?void 0:c.message}))}})}function dn(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x=new Ve("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function io(t){if(ze()){let e;try{e=await no(t)}catch(n){x.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function Re(t,e){return ze()?so(t,e).catch(n=>{x.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function ao(t){let e;try{e=await oo()}catch{}if(e)return e;{const n=crypto.randomUUID();let s=`To use this token for app debugging, register it with your project.

Firebase App Check debug token: ${n}

`;const r=t==null?void 0:t.options.appId,o=t==null?void 0:t.options.projectId;return o&&r?s+=`You can do so in the Firebase Console:
https://console.firebase.google.com/project/${o}/appcheck/apps?selectedAppId=${r}

Or using the Firebase CLI:
firebase appcheck:debugtokens:create ${n} --project ${o} --app ${r}

`:s+=`You will need to add it to your app's App Check settings in the Firebase Console for it to work.

`,s+=`Note: To keep your project secure, please revoke and delete this token using the
Firebase Console or the CLI (\`firebase appcheck:debugtokens:delete\`) when you finish debugging.

Warning: This debug token is a secret and should not be shared or uploaded to source code.

Debug Token Guide: https://firebase.google.com/docs/app-check/web/debug-provider
Firebase CLI install instructions: https://firebase.google.com/docs/cli
`,console.log(s),ro(n).catch(i=>x.warn(`Failed to persist debug token to IndexedDB. Error: ${i}`)),n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(){return Ee().enabled}async function et(){const t=Ee();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function co(t){const e=qe(),n=Ee();if(n.initialized=!0,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&e.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;n.enabled=!0;const s=new fe;n.token=s,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?s.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):s.resolve(ao(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lo={error:"UNKNOWN_ERROR"};function uo(t){return Ge.encodeString(JSON.stringify(t),!1)}async function Fe(t,e=!1,n=!1){const s=t.app;nn(s);const r=T(s);let o=r.token,i;if(o&&!Q(o)&&(r.token=void 0,o=void 0),!o){const l=await r.cachedTokenPromise;l&&(Q(l)?o=l:await Re(s,void 0))}if(!e&&o&&Q(o))return{token:o.token};let a=!1;if(Ze())try{const l=await et();r.exchangeTokenPromise||(r.exchangeTokenPromise=sn(rn(s,l),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const f=await r.exchangeTokenPromise;return await Re(s,f),r.token=f,{token:f.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?x.warn(l.message):n&&x.error(l),ve(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),o=await T(s).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?x.warn(l.message):n&&x.error(l),i=l}let c;return o?i?Q(o)?c={token:o.token,internalError:i}:c=ve(i):(c={token:o.token},r.token=o,await Re(s,o)):c=ve(i),a&&fn(s,c),c}async function ho(t){const e=t.app;nn(e);const{provider:n}=T(e);if(Ze()){const s=await et(),r=rn(e,s);r.body.limited_use=!0;const{token:o}=await sn(r,t.heartbeatServiceProvider);return{token:o}}else{const{token:s}=await n.getToken(!0);return{token:s}}}function un(t,e,n,s){const{app:r}=t,o=T(r),i={next:n,error:s,type:e};if(o.tokenObservers=[...o.tokenObservers,i],o.token&&Q(o.token)){const a=o.token;Promise.resolve().then(()=>{n({token:a.token}),Ot(t)}).catch(()=>{})}o.cachedTokenPromise.then(()=>Ot(t))}function hn(t,e){const n=T(t),s=n.tokenObservers.filter(r=>r.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function Ot(t){const{app:e}=t,n=T(e);let s=n.tokenRefresher;s||(s=fo(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function fo(t){const{app:e}=t;return new Qr(async()=>{const n=T(e);let s;if(n.token?s=await Fe(t,!0):s=await Fe(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=T(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const r=n.token.expireTimeMillis-300*1e3;return s=Math.min(s,r),Math.max(0,s-Date.now())}else return 0},St.RETRIAL_MIN_WAIT,St.RETRIAL_MAX_WAIT)}function fn(t,e){const n=T(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function Q(t){return t.expireTimeMillis-Date.now()>0}function ve(t){return{token:uo(lo),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=T(this.app);for(const n of e)hn(this.app,n.next);return Promise.resolve()}}function go(t,e){return new po(t,e)}function mo(t){return{getToken:e=>Fe(t,e),getLimitedUseToken:()=>ho(t),addTokenListener:e=>un(t,"INTERNAL",e),removeTokenListener:e=>hn(t.app,e)}}const bo="@firebase/app-check",yo="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eo(t=Ut(),e){var r;t=Mt(t);const n=Bt(t,"app-check");if(Ee().initialized||co(t),Ze()&&et().then(o=>{console.log(`Firebase App Check debug token: ${o}`)}),n.isInitialized()){const o=n.getImmediate(),i=n.getOptions();if(i&&!!i.isTokenAutoRefreshEnabled==!!e.isTokenAutoRefreshEnabled&&((r=i.provider)!=null&&r.isEqual(e.provider)))return o;throw v.create("already-initialized",{appName:t.name})}const s=n.initialize({options:e});return wo(t,e.provider,e.isTokenAutoRefreshEnabled),T(t).isTokenAutoRefreshEnabled&&un(s,"INTERNAL",()=>{}),s}function wo(t,e,n=!1){const s=Kr(t,{...tn});s.activated=!0,s.provider=e,s.cachedTokenPromise=io(t).then(r=>(r&&Q(r)&&(s.token=r,fn(t,{token:r.token})),r)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&x.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _o="app-check",Tt="app-check-internal";function Io(){X(new W(_o,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return go(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(Tt).initialize()})),X(new W(Tt,t=>{const e=t.getProvider("app-check").getImmediate();return mo(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),j(bo,yo)}Io();const ue={apiKey:"AIzaSyBB5yXYwKRZPwR1v-5CH16zseWXfoAMtZI",authDomain:"briefly-aa68d.firebaseapp.com",projectId:"briefly-aa68d",storageBucket:"briefly-aa68d.firebasestorage.app",messagingSenderId:"387585752591",appId:"1:387585752591:web:e0767723bc09469e9cad7a"};function pn(){return typeof ue.apiKey=="string"&&ue.apiKey.length>0&&!ue.apiKey.startsWith("YOUR_")}const So="gemini-3-flash-preview";function Oo(){return E.object({properties:{title:E.string(),questions:E.array({items:E.object({properties:{question:E.string(),options:E.array({items:E.string()}),answerIndex:E.integer(),explanation:E.string()},optionalProperties:["explanation"]})}),flashcards:E.array({items:E.object({properties:{front:E.string(),back:E.string()}})})},optionalProperties:["flashcards"]})}function gn(t){return(t||"").trim().split(/\s+/).filter(Boolean).length}function To(t,e,n){return`You are a study coach. Turn the study notes below into a quiz that tests real understanding, not memorization of exact wording.
Return ONLY a JSON object matching this schema — no markdown fences, no extra text:
{
  "title": "short topic title, e.g. 'Photosynthesis Basics'",
  "questions": [
    {"question": "...", "options": ["A", "B", "C", "D"], "answerIndex": 0, "explanation": "one sentence why the answer is correct"}
  ],
  "flashcards": [{"front": "term or question", "back": "short definition or answer"}]
}
Rules:
- Generate exactly ${e} multiple-choice questions, difficulty ${n}.
- Every question must have exactly 4 options, exactly one correct answer, and a plausible set of distractors drawn from the notes (never "All of the above" / "None of the above").
- Every question must be answerable ONLY from the notes below — do not invent facts that are not in the notes. If the notes are too thin for ${e} good questions, still return ${e} questions but base them on what is actually stated.
- "explanation" is one short sentence grounded in the notes.
- Flashcards: 4-6 cards covering the most important terms/facts in the notes.
- Keep the language the same as the notes (if the notes are in Indonesian, write the quiz in Indonesian).

NOTES:
"""${t}"""`}let le=null,mn=null;const V={sdkLoaded:!0,modelCreated:!1,lastError:null};typeof window<"u"&&(window.__quizforgeDebug=V);function Ao(){if(!le){le=Ft(ue);try{self.FIREBASE_APPCHECK_DEBUG_TOKEN=!0,Eo(le,{isTokenAutoRefreshEnabled:!0})}catch(t){console.warn("[QuizForge] App Check init skipped:",t)}mn=qr(le,{backend:new ye})}}function bn(){Ao();const t=jr(mn,{mode:O.PREFER_IN_CLOUD,inCloudParams:{model:So,generationConfig:{responseMimeType:"application/json",responseSchema:Oo()}}});return V.modelCreated=!0,t}function Co(t){const e=String(t||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,""),n=JSON.parse(e);if(!n||typeof n!="object")throw new Error("Model did not return an object.");const s=(Array.isArray(n.questions)?n.questions:[]).filter(o=>o&&typeof o.question=="string"&&Array.isArray(o.options)&&o.options.length===4&&Number.isInteger(o.answerIndex)&&o.answerIndex>=0&&o.answerIndex<4).map(o=>({question:o.question,options:o.options.map(String),answerIndex:o.answerIndex,explanation:typeof o.explanation=="string"?o.explanation:""}));if(s.length===0)throw new Error("Model returned no valid questions.");const r=(Array.isArray(n.flashcards)?n.flashcards:[]).filter(o=>o&&typeof o.front=="string"&&typeof o.back=="string").map(o=>({front:o.front,back:o.back}));return{title:typeof n.title=="string"?n.title:"Untitled quiz",questions:s,flashcards:r}}function Ro(t){const e=String((t==null?void 0:t.message)||t||"Unknown error"),n=e.match(/\[\d{3}[^\]]*\]/),s=n?` Server response: ${n[0]}.`:"";return/api key|api-key|API_KEY|401|403|permission/i.test(e)?"Firebase rejected the request (bad or missing API key / project not enabled for AI Logic). Check the Firebase config and that AI Logic is enabled for the Gemini Developer API.":/network|fetch|failed to fetch|offline/i.test(e)?`Network error while calling Firebase AI Logic. Check your connection and try again.${s}`:`Quiz generation failed: ${e}${s}`}async function vo(t,e,n,s){const r=performance.now(),o=gn(t);if(V.lastError=null,!pn())throw new Error("SETUP_REQUIRED: Firebase is not configured yet. Follow the setup guide below to add your Firebase project config, then reload.");const i=bn();s==null||s("Generating quiz with Gemini…",void 0);let a;try{a=await i.generateContent(To(t,e,n))}catch(f){throw V.lastError=String((f==null?void 0:f.message)||f),new Error(Ro(f))}const c=a.response.text();let l;try{l=Co(c)}catch(f){throw V.lastError=`JSON parse failed: ${f==null?void 0:f.message}`,new Error("The model returned a response that could not be parsed as a quiz. Please try again.")}return{quiz:l,latencyMs:Math.round(performance.now()-r),wordCount:o}}function yn(t){return String(t||"").replace(/\r\n?/g,`
`).split(new RegExp("(?<=[.!?])\\s+|\\n+")).map(e=>e.replace(/^[-*•\d.)\s]+/,"").trim()).filter(e=>e.length>8)}function U(t){const e=[...t];for(let n=e.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}function ko(t){const e=[],n=new Set,s=String(t||"").split(`
`),r=[/^([A-Z][\w\s'&-]{1,40}?)\s*[:–—-]\s+(.{8,160})$/,/^([A-Z][\w\s'&-]{1,40}?)\s+(?:is|are|was|were|means|refers to)\s+(.{8,160})$/i];for(const o of s){const i=o.trim();if(i)for(const a of r){const c=i.match(a);if(!c)continue;const l=c[1].trim().replace(/^The\s+/i,"").replace(/\.$/,""),f=c[2].trim().replace(/\.$/,""),h=l.toLowerCase();if(l.length<2||l.length>30||/notes/i.test(l)||f.length<12||n.has(h))break;n.add(h),e.push({term:l,def:f});break}}if(e.length<4)for(const o of yn(t)){const i=o.match(/^([A-Z][\w\s'&-]{1,40}?)\s+(?:is|are|was|were|means)\s+(.{8,160})$/i);if(!i)continue;const a=i[1].trim().replace(/^The\s+/i,""),c=i[2].trim().replace(/\.$/,""),l=a.toLowerCase();a.length<2||a.length>30||/notes/i.test(a)||c.length<12||n.has(l)||(n.add(l),e.push({term:a,def:c}))}return e}function At(t){const e=new Set(["that","this","with","from","into","when","which","their","there","about","after","before","during","between","through","called","process","system","using","other","first","second"]);return(t.match(/[A-Za-z][A-Za-z'-]{3,}/g)||[]).filter(n=>!e.has(n.toLowerCase()))}async function Do(t,e,n,s){const r=performance.now(),o=(t||"").trim().split(/\s+/).filter(Boolean).length;s==null||s("Simulating quiz generation…",void 0),await new Promise(m=>setTimeout(m,400)),s==null||s("Simulating questions…",void 0),await new Promise(m=>setTimeout(m,400));const i=ko(t),a=yn(t),c=[],l=new Set,f=U(i);for(const m of f){if(c.length>=e)break;const J=U(i.filter(Y=>Y.term!==m.term)).slice(0,3);if(J.length<3)break;const F=U([m.def,...J.map(Y=>Y.def)]);c.push({question:`What is ${m.term}?`,options:F,answerIndex:F.indexOf(m.def),explanation:`According to your notes: ${m.term} — ${m.def}.`}),l.add(m.term.toLowerCase())}const h=a.flatMap(At),b=[...new Set(h.map(m=>m.toLowerCase()))];for(const m of U(a)){if(c.length>=e)break;const J=At(m);if(J.length<2)continue;const F=J[Math.floor(Math.random()*J.length)],Y=m.replace(new RegExp(`\\b${F.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\b`,"i"),"_____");if(Y===m)continue;const nt=U(b.filter(ie=>ie!==F.toLowerCase())).slice(0,3);if(nt.length<3)continue;const _n=ie=>h.find(In=>In.toLowerCase()===ie)||ie,st=U([F,...nt.map(_n)]);c.push({question:`Complete this sentence from your notes: "${Y}"`,options:st,answerIndex:st.indexOf(F),explanation:`The full sentence in your notes reads: "${m}"`})}if(c.length<3)throw new Error("DEMO_TOO_THIN: the demo simulator could not build at least 3 questions from these notes — paste longer notes with a few 'Term is definition' lines (or try the real Gemini path, which handles thin notes better).");const g=U(i).slice(0,6).map(m=>({front:m.term,back:m.def}));let R=(String(t||"").split(`
`).map(m=>m.trim()).find(Boolean)||"Untitled notes").replace(/\.$/,"");return R.length>60&&(R=R.slice(0,57).trimEnd()+"…"),R=R.charAt(0).toUpperCase()+R.slice(1),{quiz:{title:R,questions:c,flashcards:g},latencyMs:Math.round(performance.now()-r),wordCount:o,simulated:!0}}const p=t=>document.querySelector(t),No=new URLSearchParams(location.search),En=No.get("demo")==="1",tt="quizforge.history.v1",Po=10,Lo=`Photosynthesis notes — Biology week 7
Photosynthesis is the process by which green plants convert sunlight, water and carbon dioxide into glucose and oxygen.
Chlorophyll is the green pigment in chloroplasts that absorbs light energy, mostly in the blue and red parts of the spectrum.
ATP: the cell's main energy currency, produced during the light-dependent reactions.
NADPH: a molecule that carries electrons and hydrogen to the Calvin cycle.
Calvin cycle: the reactions in the stroma that fix carbon dioxide into sugar.
Thylakoid: the disc-shaped membrane structures inside chloroplasts where the light-dependent reactions happen.
Stroma: the fluid inside chloroplasts, surrounding the thylakoids, where the Calvin cycle runs.
Stomata are tiny pores on leaves that allow carbon dioxide to enter and oxygen and water vapour to leave.
The light-dependent reactions take place in the thylakoid membranes and produce ATP and NADPH.
The Calvin cycle takes place in the stroma and uses ATP and NADPH to fix carbon dioxide into sugar.
The overall equation for photosynthesis is 6CO2 + 6H2O + light energy -> C6H12O6 + 6O2.
Factors that affect the rate of photosynthesis include light intensity, carbon dioxide concentration and temperature.
At very high temperatures, the enzymes involved in the Calvin cycle begin to denature, so the rate falls.
Photosynthesis is essential for nearly all life on Earth because it produces the oxygen we breathe and forms the base of most food chains.`;function w(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ke(t){const e=p("#errorBox");e.innerHTML=`<strong>Something went wrong.</strong><br>${w(t)}`,e.hidden=!1}function be(){const t=p("#errorBox");t.hidden=!0,t.textContent=""}function Ct(t){const e=p("#progressBar"),n=p("#progressLabel");if(!t){e.hidden=!0,n.textContent="";return}e.hidden=!1,n.textContent=t;const s=p("#progressFill");s.style.width="100%",s.classList.add("indeterminate")}function Mo(){p("#progressBar").hidden=!0,p("#progressLabel").textContent="",p("#progressFill").style.width="0%",p("#progressFill").classList.remove("indeterminate")}function Rt(t){p("#generateBtn").disabled=t,p("#notes").disabled=t}let P=null,q=[],A=0,se=!1;function $o(){if(!P)return{correct:0,total:0};let t=0;return P.quiz.questions.forEach((e,n)=>{q[n]===e.answerIndex&&t++}),{correct:t,total:P.quiz.questions.length}}function wn(){const{quiz:t,latencyMs:e,wordCount:n,simulated:s}=P;typeof window<"u"&&window.__quizforgeDebug&&(window.__quizforgeDebug.currentQuiz=P);const r=s?"Simulated · Quiz (demo)":"Cloud · Gemini",o=s?"badge-device":"badge-cloud",i=p("#result");i.hidden=!1,i.innerHTML=`
    <div class="result-head">
      <span class="source-badge ${o}">${w(r)}</span>
      <span class="meta">${w(String(e))} ms · ${w(String(n))} words · ${t.questions.length} questions · ${t.flashcards.length} flashcards${s?" · demo":""}</span>
    </div>
    <h2 class="brief-title">${w(t.title)}</h2>
    <div class="tabs" role="tablist">
      <button type="button" class="tab active" data-tab="quiz" role="tab">Quiz</button>
      <button type="button" class="tab" data-tab="cards" role="tab">Flashcards (${t.flashcards.length})</button>
    </div>
    <div id="tabQuiz" class="tab-panel"></div>
    <div id="tabCards" class="tab-panel" hidden></div>
    <div class="result-actions">
      <button id="copyMdBtn" type="button">Copy Markdown</button>
      <button id="copyJsonBtn" type="button">Copy JSON</button>
    </div>
  `,i.querySelectorAll(".tab").forEach(a=>{a.addEventListener("click",()=>{i.querySelectorAll(".tab").forEach(c=>c.classList.remove("active")),a.classList.add("active"),p("#tabQuiz").hidden=a.dataset.tab!=="quiz",p("#tabCards").hidden=a.dataset.tab!=="cards"})}),p("#copyMdBtn").addEventListener("click",()=>vt(Bo(t))),p("#copyJsonBtn").addEventListener("click",()=>vt(JSON.stringify(t,null,2))),he(),xo(),i.scrollIntoView({behavior:"smooth",block:"start"})}function he(){const t=p("#tabQuiz"),{questions:e}=P.quiz;if(se){const{correct:i,total:a}=$o(),c=a?Math.round(i/a*100):0,l=c===100?"Perfect score — you know this cold.":c>=70?"Solid — review the ones you missed.":c>=40?"Getting there — re-read the notes and try again.":"Tough round — study the flashcards first, then retake.";t.innerHTML=`
      <div class="score-box">
        <div class="score-big">${i} / ${a}</div>
        <div class="score-pct">${c}% — ${w(l)}</div>
      </div>
      <ol class="review-list">
        ${e.map((f,h)=>{const b=q[h],g=b===f.answerIndex;return`<li class="review-item ${g?"review-ok":"review-bad"}">
            <p class="review-q">${w(f.question)}</p>
            <p>Your answer: <strong>${b==null?"—":w(f.options[b])}</strong> ${g?"✓":"✗"}</p>
            ${g?"":`<p>Correct answer: <strong>${w(f.options[f.answerIndex])}</strong></p>`}
            ${f.explanation?`<p class="muted">${w(f.explanation)}</p>`:""}
          </li>`}).join("")}
      </ol>
      <button id="retakeBtn" type="button" class="primary">Retake quiz</button>
    `,p("#retakeBtn").addEventListener("click",()=>{q=e.map(()=>null),A=0,se=!1,he()});return}const n=e[A],s=q[A],r=s!=null;t.innerHTML=`
    <p class="quiz-progress">Question ${A+1} of ${e.length}</p>
    <div class="quiz-bar"><div class="quiz-bar-fill" style="width:${Math.round(A/e.length*100)}%"></div></div>
    <h3 class="quiz-question">${w(n.question)}</h3>
    <div class="options">
      ${n.options.map((i,a)=>{let c="option";return r&&(a===n.answerIndex?c+=" option-correct":a===s?c+=" option-wrong":c+=" option-dim"),`<button type="button" class="${c}" data-idx="${a}" ${r?"disabled":""}>${w(i)}</button>`}).join("")}
    </div>
    ${r?`
      <div class="feedback ${s===n.answerIndex?"feedback-ok":"feedback-bad"}">
        <strong>${s===n.answerIndex?"Correct!":"Not quite."}</strong>
        ${n.explanation?`<p>${w(n.explanation)}</p>`:""}
      </div>
      <button id="nextBtn" type="button" class="primary">${A+1===e.length?"See my score":"Next question"}</button>
    `:""}
  `,t.querySelectorAll(".option").forEach(i=>{i.addEventListener("click",()=>{q[A]=Number(i.dataset.idx),he()})});const o=p("#nextBtn");o&&o.addEventListener("click",()=>{A+1===e.length?se=!0:A++,he()})}function xo(){const t=p("#tabCards"),{flashcards:e}=P.quiz;if(!e.length){t.innerHTML='<p class="muted">No flashcards were generated for these notes.</p>';return}t.innerHTML=`
    <p class="muted">Tap a card to flip it.</p>
    <div class="cards-grid">
      ${e.map((n,s)=>`
        <button type="button" class="flashcard" data-idx="${s}">
          <span class="card-front">${w(n.front)}</span>
          <span class="card-back" hidden>${w(n.back)}</span>
        </button>`).join("")}
    </div>
  `,t.querySelectorAll(".flashcard").forEach(n=>{n.addEventListener("click",()=>{const s=n.querySelector(".card-front"),r=n.querySelector(".card-back"),o=r.hidden;s.hidden=o,r.hidden=!o,n.classList.toggle("flipped",o)})})}function Bo(t){const e=[`# ${t.title}`,"","## Quiz",""];if(t.questions.forEach((n,s)=>{e.push(`${s+1}. ${n.question}`),n.options.forEach((r,o)=>{e.push(`   ${String.fromCharCode(65+o)}. ${r}${o===n.answerIndex?" ✓":""}`)}),n.explanation&&e.push(`   _${n.explanation}_`),e.push("")}),t.flashcards.length){e.push("## Flashcards","");for(const n of t.flashcards)e.push(`- **${n.front}** — ${n.back}`)}return e.join(`
`)}async function vt(t){try{await navigator.clipboard.writeText(t);const e=p("#copyStatus");e.textContent="Copied to clipboard.",setTimeout(()=>e.textContent="",2e3)}catch{const e=p("#copyStatus");e.textContent="Copy failed — select the text manually."}}function Ue(){try{const t=JSON.parse(localStorage.getItem(tt)||"[]");return Array.isArray(t)?t:[]}catch{return[]}}function Fo(t){const e=Ue();e.unshift(t),localStorage.setItem(tt,JSON.stringify(e.slice(0,Po))),He()}function He(){const t=Ue(),e=p("#historyList"),n=p("#historyEmpty");if(!t.length){e.innerHTML="",n.hidden=!1;return}n.hidden=!0,e.innerHTML=t.map((s,r)=>`
      <li class="history-item">
        <button type="button" class="history-load" data-idx="${r}">
          <span class="history-title">${w(s.title)}</span>
          <span class="history-meta">${w(s.sourceLabel)} · ${w(String(s.questions))} questions · ${w(String(s.wordCount))} words · ${w(s.when)}</span>
        </button>
      </li>`).join(""),e.querySelectorAll(".history-load").forEach(s=>{s.addEventListener("click",()=>{const r=Ue()[Number(s.dataset.idx)];r&&(P={quiz:r.quiz,latencyMs:r.latencyMs,wordCount:r.wordCount,simulated:r.simulated},q=r.quiz.questions.map(()=>null),A=0,se=!1,wn(),be())})})}function kt(){const t=p("#setupGuide");t.hidden=!1,t.scrollIntoView({behavior:"smooth",block:"start"})}function de(){const t=gn(p("#notes").value);p("#wordCount").textContent=`${t} word${t===1?"":"s"}`}async function Uo(){const t=p("#notes").value.trim();if(be(),p("#setupGuide").hidden=!0,p("#result").hidden=!0,!t){ke("Paste some notes first — the textarea is empty.");return}const e=Number(p("#numQuestions").value),n=p("#difficulty").value;Rt(!0);try{let s;if(En)s=await Do(t,e,n,Ct);else if(pn())s=await vo(t,e,n,Ct);else{kt();return}P=s,q=s.quiz.questions.map(()=>null),A=0,se=!1,wn(),Fo({title:s.quiz.title,quiz:s.quiz,notes:t,sourceLabel:s.simulated?"Simulated (demo)":"Cloud · Gemini",latencyMs:s.latencyMs,wordCount:s.wordCount,questions:s.quiz.questions.length,simulated:!!s.simulated,when:new Date().toLocaleString()})}catch(s){const r=String((s==null?void 0:s.message)||s);r.startsWith("SETUP_REQUIRED")?kt():r.startsWith("DEMO_TOO_THIN")?ke("The demo simulator needs richer notes — paste longer notes with a few 'Term is definition' lines. (The real Gemini path handles thin notes better.)"):ke(r)}finally{Mo(),Rt(!1)}}function Ho(){typeof window<"u"&&window.__quizforgeDebug&&(window.__quizforgeDebug.probeModel=()=>{try{return bn(),{ok:!0,...V}}catch(t){return{ok:!1,error:String((t==null?void 0:t.message)||t),...V}}}),En&&(p("#demoBanner").hidden=!1,document.title="QuizForge (Demo) — paste your notes, get a quiz"),p("#notes").addEventListener("input",de),p("#generateBtn").addEventListener("click",Uo),p("#loadSampleBtn").addEventListener("click",()=>{p("#notes").value=Lo,de(),be()}),p("#clearBtn").addEventListener("click",()=>{p("#notes").value="",de(),p("#result").hidden=!0,be()}),p("#clearHistoryBtn").addEventListener("click",()=>{localStorage.removeItem(tt),He()}),de(),He()}document.addEventListener("DOMContentLoaded",Ho);
