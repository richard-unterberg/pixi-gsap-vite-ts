import{D as wt,j as P,b as q,i as At,f as St,T as Tt,n as Z,w as Et}from"./index-CI19Qfd4.js";const M=Object.create(null),J=Object.create(null);function Q(r,t){let e=J[r];return e===void 0&&(M[t]===void 0&&(M[t]=1),J[r]=e=M[t]++),e}let w;function Bt(){return(!w||w!=null&&w.isContextLost())&&(w=wt.get().createCanvas().getContext("webgl",{})),w}let I;function It(){if(!I){I="mediump";const r=Bt();r&&r.getShaderPrecisionFormat&&(I=r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision?"highp":"mediump")}return I}function zt(r,t,e){return t?r:e?(r=r.replace("out vec4 finalColor;",""),`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${r}
        `):`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${r}
        `}function Mt(r,t,e){const i=e?t.maxSupportedFragmentPrecision:t.maxSupportedVertexPrecision;if(r.substring(0,9)!=="precision"){let n=e?t.requestedFragmentPrecision:t.requestedVertexPrecision;return n==="highp"&&i!=="highp"&&(n="mediump"),`precision ${n} float;
${r}`}else if(i!=="highp"&&r.substring(0,15)==="precision highp")return r.replace("precision highp","precision mediump");return r}function Ct(r,t){return t?`#version 300 es
${r}`:r}const Dt={},Gt={};function Rt(r,{name:t="pixi-program"},e=!0){t=t.replace(/\s+/g,"-"),t+=e?"-fragment":"-vertex";const i=e?Dt:Gt;return i[t]?(i[t]++,t+=`-${i[t]}`):i[t]=1,r.indexOf("#define SHADER_NAME")!==-1?r:`${`#define SHADER_NAME ${t}`}
${r}`}function Vt(r,t){return t?r.replace("#version 300 es",""):r}const C={stripVersion:Vt,ensurePrecision:Mt,addProgramDefines:zt,setProgramName:Rt,insertVersion:Ct},D=Object.create(null),ft=class X{constructor(t){t={...X.defaultOptions,...t};const e=t.fragment.indexOf("#version 300 es")!==-1,i={stripVersion:e,ensurePrecision:{requestedFragmentPrecision:t.preferredFragmentPrecision,requestedVertexPrecision:t.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:It()},setProgramName:{name:t.name},addProgramDefines:e,insertVersion:e};let n=t.fragment,s=t.vertex;Object.keys(C).forEach(a=>{const o=i[a];n=C[a](n,o,!0),s=C[a](s,o,!1)}),this.fragment=n,this.vertex=s,this._key=Q(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null}static from(t){const e=`${t.vertex}:${t.fragment}`;return D[e]||(D[e]=new X(t)),D[e]}};ft.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};let dt=ft;const tt={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};function Ft(r){return tt[r]??tt.float32}const Ut={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function $t({source:r,entryPoint:t}){const e={},i=r.indexOf(`fn ${t}`);if(i!==-1){const n=r.indexOf("->",i);if(n!==-1){const s=r.substring(i,n),a=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;let o;for(;(o=a.exec(s))!==null;){const u=Ut[o[3]]??"float32";e[o[2]]={location:parseInt(o[1],10),format:u,stride:Ft(u).stride,offset:0,instance:!1,start:0}}}}return e}function G(r){var m,f;const t=/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,e=/@group\((\d+)\)/,i=/@binding\((\d+)\)/,n=/var(<[^>]+>)? (\w+)/,s=/:\s*(\w+)/,a=/struct\s+(\w+)\s*{([^}]+)}/g,o=/(\w+)\s*:\s*([\w\<\>]+)/g,u=/struct\s+(\w+)/,l=(m=r.match(t))==null?void 0:m.map(d=>({group:parseInt(d.match(e)[1],10),binding:parseInt(d.match(i)[1],10),name:d.match(n)[2],isUniform:d.match(n)[1]==="<uniform>",type:d.match(s)[1]}));if(!l)return{groups:[],structs:[]};const c=((f=r.match(a))==null?void 0:f.map(d=>{const h=d.match(u)[1],_=d.match(o).reduce((p,b)=>{const[v,x]=b.split(":");return p[v.trim()]=x.trim(),p},{});return _?{name:h,members:_}:null}).filter(({name:d})=>l.some(h=>h.type===d)))??[];return{groups:l,structs:c}}var S=(r=>(r[r.VERTEX=1]="VERTEX",r[r.FRAGMENT=2]="FRAGMENT",r[r.COMPUTE=4]="COMPUTE",r))(S||{});function kt({groups:r}){const t=[];for(let e=0;e<r.length;e++){const i=r[e];t[i.group]||(t[i.group]=[]),i.isUniform?t[i.group].push({binding:i.binding,visibility:S.VERTEX|S.FRAGMENT,buffer:{type:"uniform"}}):i.type==="sampler"?t[i.group].push({binding:i.binding,visibility:S.FRAGMENT,sampler:{type:"filtering"}}):i.type==="texture_2d"&&t[i.group].push({binding:i.binding,visibility:S.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return t}function Ot({groups:r}){const t=[];for(let e=0;e<r.length;e++){const i=r[e];t[i.group]||(t[i.group]={}),t[i.group][i.name]=i.binding}return t}function Nt(r,t){const e=new Set,i=new Set,n=[...r.structs,...t.structs].filter(a=>e.has(a.name)?!1:(e.add(a.name),!0)),s=[...r.groups,...t.groups].filter(a=>{const o=`${a.name}-${a.binding}`;return i.has(o)?!1:(i.add(o),!0)});return{structs:n,groups:s}}const R=Object.create(null);class z{constructor(t){var o,u;this._layoutKey=0;const{fragment:e,vertex:i,layout:n,gpuLayout:s,name:a}=t;if(this.name=a,this.fragment=e,this.vertex=i,e.source===i.source){const l=G(e.source);this.structsAndGroups=l}else{const l=G(i.source),c=G(e.source);this.structsAndGroups=Nt(l,c)}this.layout=n??Ot(this.structsAndGroups),this.gpuLayout=s??kt(this.structsAndGroups),this.autoAssignGlobalUniforms=((o=this.layout[0])==null?void 0:o.globalUniforms)!==void 0,this.autoAssignLocalUniforms=((u=this.layout[1])==null?void 0:u.localUniforms)!==void 0,this._generateProgramKey()}_generateProgramKey(){const{vertex:t,fragment:e}=this,i=t.source+e.source+t.entryPoint+e.entryPoint;this._layoutKey=Q(i,"program")}get attributeData(){return this._attributeData??(this._attributeData=$t(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(t){const e=`${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;return R[e]||(R[e]=new z(t)),R[e]}}function Lt(r,t){switch(r){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*t);case"vec3<f32>":return new Float32Array(3*t);case"vec4<f32>":return new Float32Array(4*t);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const mt=class pt{constructor(t,e){this._touched=0,this.uid=P("uniform"),this._resourceType="uniformGroup",this._resourceId=P("resource"),this.isUniformGroup=!0,this._dirtyId=0,e={...pt.defaultOptions,...e},this.uniformStructures=t;const i={};for(const n in t){const s=t[n];s.name=n,s.size=s.size??1,s.value??(s.value=Lt(s.type,s.size)),i[n]=s.value}this.uniforms=i,this._dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this._signature=Q(Object.keys(i).map(n=>`${n}-${t[n].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};mt.defaultOptions={ubo:!1,isStatic:!1};let jt=mt;class V{constructor(t){this.resources=Object.create(null),this._dirty=!0;let e=0;for(const i in t){const n=t[i];this.setResource(n,e++)}this._updateKey()}_updateKey(){if(!this._dirty)return;this._dirty=!1;const t=[];let e=0;for(const i in this.resources)t[e++]=this.resources[i]._resourceId;this._key=t.join("|")}setResource(t,e){var n,s;const i=this.resources[e];t!==i&&(i&&((n=t.off)==null||n.call(t,"change",this.onResourceChange,this)),(s=t.on)==null||s.call(t,"change",this.onResourceChange,this),this.resources[e]=t,this._dirty=!0)}getResource(t){return this.resources[t]}_touch(t){const e=this.resources;for(const i in e)e[i]._touched=t}destroy(){var e;const t=this.resources;for(const i in t){const n=t[i];(e=n.off)==null||e.call(n,"change",this.onResourceChange,this)}this.resources=null}onResourceChange(){this._dirty=!0,this._updateKey()}}var Y=(r=>(r[r.WEBGL=1]="WEBGL",r[r.WEBGPU=2]="WEBGPU",r[r.BOTH=3]="BOTH",r))(Y||{});class gt extends q{constructor(t){super(),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[];let{gpuProgram:e,glProgram:i,groups:n,resources:s,compatibleRenderers:a,groupMap:o}=t;this.gpuProgram=e,this.glProgram=i,a===void 0&&(a=0,e&&(a|=Y.WEBGPU),i&&(a|=Y.WEBGL)),this.compatibleRenderers=a;const u={};if(!s&&!n&&(s={}),s&&n)throw new Error("[Shader] Cannot have both resources and groups");if(!e&&n&&!o)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&n&&o)for(const l in o)for(const c in o[l]){const m=o[l][c];u[m]={group:l,binding:c,name:m}}else if(e&&n&&!o){const l=e.structsAndGroups.groups;o={},l.forEach(c=>{o[c.group]=o[c.group]||{},o[c.group][c.binding]=c.name,u[c.name]=c})}else if(s){if(e){const l=e.structsAndGroups.groups;o={},l.forEach(c=>{o[c.group]=o[c.group]||{},o[c.group][c.binding]=c.name,u[c.name]=c})}else{o={},n={99:new V},this._ownedBindGroups.push(n[99]);let l=0;for(const c in s)u[c]={group:99,binding:l,name:c},o[99]=o[99]||{},o[99][l]=c,l++}n={};for(const l in s){const c=l;let m=s[l];!m.source&&!m._resourceType&&(m=new jt(m));const f=u[c];f&&(n[f.group]||(n[f.group]=new V,this._ownedBindGroups.push(n[f.group])),n[f.group].setResource(m,f.binding))}}this.groups=n,this._uniformBindMap=o,this.resources=this._buildResourceAccessor(n,u)}addResource(t,e,i){var n,s;(n=this._uniformBindMap)[e]||(n[e]={}),(s=this._uniformBindMap[e])[i]||(s[i]=t),this.groups[e]||(this.groups[e]=new V,this._ownedBindGroups.push(this.groups[e]))}_buildResourceAccessor(t,e){const i={};for(const n in e){const s=e[n];Object.defineProperty(i,s.name,{get(){return t[s.group].getResource(s.binding)},set(a){t[s.group].setResource(a,s.binding)}})}return i}destroy(t=!1){var e,i;this.emit("destroy",this),t&&((e=this.gpuProgram)==null||e.destroy(),(i=this.glProgram)==null||i.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(n=>{n.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null}static from(t){const{gpu:e,gl:i,...n}=t;let s,a;return e&&(s=z.from(e)),i&&(a=dt.from(i)),new gt({gpuProgram:s,glProgram:a,...n})}}const Ht={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8},F=0,U=1,$=2,k=3,O=4,N=5,K=class xt{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<F)}set blend(t){!!(this.data&1<<F)!==t&&(this.data^=1<<F)}get offsets(){return!!(this.data&1<<U)}set offsets(t){!!(this.data&1<<U)!==t&&(this.data^=1<<U)}set cullMode(t){if(t==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=t==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<$)}set culling(t){!!(this.data&1<<$)!==t&&(this.data^=1<<$)}get depthTest(){return!!(this.data&1<<k)}set depthTest(t){!!(this.data&1<<k)!==t&&(this.data^=1<<k)}get depthMask(){return!!(this.data&1<<N)}set depthMask(t){!!(this.data&1<<N)!==t&&(this.data^=1<<N)}get clockwiseFrontFace(){return!!(this.data&1<<O)}set clockwiseFrontFace(t){!!(this.data&1<<O)!==t&&(this.data^=1<<O)}get blendMode(){return this._blendMode}set blendMode(t){this.blend=t!=="none",this._blendMode=t,this._blendModeId=Ht[t]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const t=new xt;return t.depthTest=!1,t.blend=!0,t}};K.default2d=K.for2d();let Pe=K;var g=(r=>(r[r.MAP_READ=1]="MAP_READ",r[r.MAP_WRITE=2]="MAP_WRITE",r[r.COPY_SRC=4]="COPY_SRC",r[r.COPY_DST=8]="COPY_DST",r[r.INDEX=16]="INDEX",r[r.VERTEX=32]="VERTEX",r[r.UNIFORM=64]="UNIFORM",r[r.STORAGE=128]="STORAGE",r[r.INDIRECT=256]="INDIRECT",r[r.QUERY_RESOLVE=512]="QUERY_RESOLVE",r[r.STATIC=1024]="STATIC",r))(g||{});class T extends q{constructor(t){let{data:e,size:i}=t;const{usage:n,label:s,shrinkToFit:a}=t;super(),this.uid=P("buffer"),this._resourceType="buffer",this._resourceId=P("resource"),this._touched=0,this._updateID=1,this.shrinkToFit=!0,e instanceof Array&&(e=new Float32Array(e)),this._data=e,i=i??(e==null?void 0:e.byteLength);const o=!!e;this.descriptor={size:i,usage:n,mappedAtCreation:o,label:s},this.shrinkToFit=a??!0}get data(){return this._data}set data(t){this.setDataWithSize(t,t.length,!0)}get static(){return!!(this.descriptor.usage&g.STATIC)}set static(t){t?this.descriptor.usage|=g.STATIC:this.descriptor.usage&=~g.STATIC}setDataWithSize(t,e,i){if(this._updateID++,this._updateSize=e*t.BYTES_PER_ELEMENT,this._data===t){i&&this.emit("update",this);return}const n=this._data;if(this._data=t,n.length!==t.length){!this.shrinkToFit&&t.byteLength<n.byteLength?i&&this.emit("update",this):(this.descriptor.size=t.byteLength,this._resourceId=P("resource"),this.emit("change",this));return}i&&this.emit("update",this)}update(t){this._updateSize=t??this._updateSize,this._updateID++,this.emit("update",this)}destroy(){this.emit("destroy",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}function bt(r,t){if(!(r instanceof T)){let e=t?g.INDEX:g.VERTEX;r instanceof Array&&(t?(r=new Uint32Array(r),e=g.INDEX|g.COPY_DST):(r=new Float32Array(r),e=g.VERTEX|g.COPY_DST)),r=new T({data:r,label:t?"index-mesh-buffer":"vertex-mesh-buffer",usage:e})}return r}function Wt(r,t,e){const i=r.getAttribute(t);if(!i)return e.minX=0,e.minY=0,e.maxX=0,e.maxY=0,e;const n=i.buffer.data;let s=1/0,a=1/0,o=-1/0,u=-1/0;const l=n.BYTES_PER_ELEMENT,c=(i.offset||0)/l,m=(i.stride||2*4)/l;for(let f=c;f<n.length;f+=m){const d=n[f],h=n[f+1];d>o&&(o=d),h>u&&(u=h),d<s&&(s=d),h<a&&(a=h)}return e.minX=s,e.minY=a,e.maxX=o,e.maxY=u,e}function Xt(r){return(r instanceof T||Array.isArray(r)||r.BYTES_PER_ELEMENT)&&(r={buffer:r}),r.buffer=bt(r.buffer,!1),r}class Yt extends q{constructor(t){const{attributes:e,indexBuffer:i,topology:n}=t;super(),this.uid=P("geometry"),this._layoutKey=0,this.instanceCount=1,this._bounds=new At,this._boundsDirty=!0,this.attributes=e,this.buffers=[],this.instanceCount=t.instanceCount||1;for(const s in e){const a=e[s]=Xt(e[s]);this.buffers.indexOf(a.buffer)===-1&&(this.buffers.push(a.buffer),a.buffer.on("update",this.onBufferUpdate,this),a.buffer.on("change",this.onBufferUpdate,this))}i&&(this.indexBuffer=bt(i,!0),this.buffers.push(this.indexBuffer)),this.topology=n||"triangle-list"}onBufferUpdate(){this._boundsDirty=!0,this.emit("update",this)}getAttribute(t){return this.attributes[t]}getIndex(){return this.indexBuffer}getBuffer(t){return this.getAttribute(t).buffer}getSize(){for(const t in this.attributes){const e=this.attributes[t];return e.buffer.data.length/(e.stride/4||e.size)}return 0}get bounds(){return this._boundsDirty?(this._boundsDirty=!1,Wt(this,"aPosition",this._bounds)):this._bounds}destroy(t=!1){this.emit("destroy",this),this.removeAllListeners(),t&&this.buffers.forEach(e=>e.destroy()),this.attributes=null,this.buffers=null,this.indexBuffer=null,this._bounds=null}}const Kt=new Float32Array(1),qt=new Uint32Array(1);class we extends Yt{constructor(){const e=new T({data:Kt,label:"attribute-batch-buffer",usage:g.VERTEX|g.COPY_DST,shrinkToFit:!1}),i=new T({data:qt,label:"index-batch-buffer",usage:g.INDEX|g.COPY_DST,shrinkToFit:!1}),n=6*4;super({attributes:{aPosition:{buffer:e,format:"float32x2",stride:n,offset:0,location:1},aUV:{buffer:e,format:"float32x2",stride:n,offset:2*4,location:3},aColor:{buffer:e,format:"unorm8x4",stride:n,offset:4*4,location:0},aTextureIdAndRound:{buffer:e,format:"uint16x2",stride:n,offset:5*4,location:2}},indexBuffer:i})}}const Qt=16;class et{constructor(t){typeof t=="number"?this.rawBinaryData=new ArrayBuffer(t):t instanceof Uint8Array?this.rawBinaryData=t.buffer:this.rawBinaryData=t,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(t){return this[`${t}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(t){switch(t){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${t} isn't a valid view type`)}}}function rt(r,t){const e=r.byteLength/8|0,i=new Float64Array(r,0,e);new Float64Array(t,0,e).set(i);const s=r.byteLength-e*8;if(s>0){const a=new Uint8Array(r,e*8,s);new Uint8Array(t,e*8,s).set(a)}}const Zt={normal:"normal-npm",add:"add-npm",screen:"screen-npm"};var Jt=(r=>(r[r.DISABLED=0]="DISABLED",r[r.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",r[r.MASK_ACTIVE=2]="MASK_ACTIVE",r[r.RENDERING_MASK_REMOVE=3]="RENDERING_MASK_REMOVE",r[r.NONE=4]="NONE",r))(Jt||{});function it(r,t){return t.alphaMode==="no-premultiply-alpha"&&Zt[r]||r}class nt{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let t=0;t<this.count;t++){const e=this.textures[t];this.textures[t]=null,this.ids[e.uid]=null}this.count=0}}class st{constructor(){this.renderPipeId="batch",this.action="startBatch",this.start=0,this.size=0,this.blendMode="normal",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}let A=0;const vt=class _t{constructor(t={}){this.uid=P("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this._vertexSize=6,this._elements=[],this._batchPool=[],this._batchPoolIndex=0,this._textureBatchPool=[],this._textureBatchPoolIndex=0,t={..._t.defaultOptions,...t};const{vertexSize:e,indexSize:i}=t;this.attributeBuffer=new et(e*this._vertexSize*4),this.indexBuffer=new Uint16Array(i)}begin(){this.batchIndex=0,this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0,this._batchPoolIndex=0,this._textureBatchPoolIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(t){this._elements[this.elementSize++]=t,t.indexStart=this.indexSize,t.location=this.attributeSize,t.batcher=this,this.indexSize+=t.indexSize,this.attributeSize+=t.vertexSize*this._vertexSize}checkAndUpdateTexture(t,e){const i=t.batch.textures.ids[e._source.uid];return!i&&i!==0?!1:(t.textureId=i,t.texture=e,!0)}updateElement(t){this.dirty=!0,t.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,t.location,t.textureId)}break(t){const e=this._elements;let i=this._textureBatchPool[this._textureBatchPoolIndex++]||new nt;if(i.clear(),!e[this.elementStart])return;const n=e[this.elementStart];let s=it(n.blendMode,n.texture._source);this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const a=this.attributeBuffer.float32View,o=this.attributeBuffer.uint32View,u=this.indexBuffer;let l=this._batchIndexSize,c=this._batchIndexStart,m="startBatch",f=this._batchPool[this._batchPoolIndex++]||new st;for(let d=this.elementStart;d<this.elementSize;++d){const h=e[d];e[d]=null;const p=h.texture._source,b=it(h.blendMode,p),v=s!==b;if(p._batchTick===A&&!v){h.textureId=p._textureBindLocation,l+=h.indexSize,h.packAttributes(a,o,h.location,h.textureId),h.packIndex(u,h.indexStart,h.location/this._vertexSize),h.batch=f;continue}p._batchTick=A,(i.count>=Qt||v)&&(this._finishBatch(f,c,l-c,i,s,t,m),m="renderBatch",c=l,s=b,i=this._textureBatchPool[this._textureBatchPoolIndex++]||new nt,i.clear(),f=this._batchPool[this._batchPoolIndex++]||new st,++A),h.textureId=p._textureBindLocation=i.count,i.ids[p.uid]=i.count,i.textures[i.count++]=p,h.batch=f,l+=h.indexSize,h.packAttributes(a,o,h.location,h.textureId),h.packIndex(u,h.indexStart,h.location/this._vertexSize)}i.count>0&&(this._finishBatch(f,c,l-c,i,s,t,m),c=l,++A),this.elementStart=this.elementSize,this._batchIndexStart=c,this._batchIndexSize=l}_finishBatch(t,e,i,n,s,a,o){t.gpuBindGroup=null,t.action=o,t.batcher=this,t.textures=n,t.blendMode=s,t.start=e,t.size=i,++A,a.add(t)}finish(t){this.break(t)}ensureAttributeBuffer(t){t*4<=this.attributeBuffer.size||this._resizeAttributeBuffer(t*4)}ensureIndexBuffer(t){t<=this.indexBuffer.length||this._resizeIndexBuffer(t)}_resizeAttributeBuffer(t){const e=Math.max(t,this.attributeBuffer.size*2),i=new et(e);rt(this.attributeBuffer.rawBinaryData,i.rawBinaryData),this.attributeBuffer=i}_resizeIndexBuffer(t){const e=this.indexBuffer;let i=Math.max(t,e.length*1.5);i+=i%2;const n=i>65535?new Uint32Array(i):new Uint16Array(i);if(n.BYTES_PER_ELEMENT!==e.BYTES_PER_ELEMENT)for(let s=0;s<e.length;s++)n[s]=e[s];else rt(e.buffer,n.buffer);this.indexBuffer=n}destroy(){for(let t=0;t<this.batches.length;t++)this.batches[t].destroy();this.batches=null;for(let t=0;t<this._elements.length;t++)this._elements[t].batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}};vt.defaultOptions={vertexSize:4,indexSize:6};let Ae=vt;function te(r,t,e){const i=r>>16&255,n=r>>8&255,s=r&255,a=t>>16&255,o=t>>8&255,u=t&255,l=i+(a-i)*e,c=n+(o-n)*e,m=s+(u-s)*e;return(l<<16)+(c<<8)+m}const ee=33554430;function Se(r,t){return r+(t<<32)!==ee?r===16777215?t:t===16777215?r:te(r,t,.5):16777215}let re=0;class ie{constructor(t){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=t||{},this.enableFullScreen=!1}createTexture(t,e,i){const n=new St({...this.textureOptions,width:t,height:e,resolution:1,antialias:i,autoGarbageCollect:!0});return new Tt({source:n,label:`texturePool_${re++}`})}getOptimalTexture(t,e,i=1,n){let s=Math.ceil(t*i-1e-6),a=Math.ceil(e*i-1e-6);s=Z(s),a=Z(a);const o=(s<<17)+(a<<1)+(n?1:0);this._texturePool[o]||(this._texturePool[o]=[]);let u=this._texturePool[o].pop();return u||(u=this.createTexture(s,a,n)),u.source._resolution=i,u.source.width=s/i,u.source.height=a/i,u.source.pixelWidth=s,u.source.pixelHeight=a,u.frame.x=0,u.frame.y=0,u.frame.width=t,u.frame.height=e,u.updateUvs(),this._poolKeyHash[u.uid]=o,u}getSameSizeTexture(t,e=!1){const i=t.source;return this.getOptimalTexture(t.width,t.height,i._resolution,e)}returnTexture(t){const e=this._poolKeyHash[t.uid];this._texturePool[e].push(t)}clear(t){if(t=t!==!1,t)for(const e in this._texturePool){const i=this._texturePool[e];if(i)for(let n=0;n<i.length;n++)i[n].destroy(!0)}this._texturePool={}}}const Te=new ie;function ot(r,t,e){if(r)for(const i in r){const n=i.toLocaleLowerCase(),s=t[n];if(s){let a=r[i];i==="header"&&(a=a.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),e&&s.push(`//----${e}----//`),s.push(a)}else Et(`${i} placement hook does not exist in shader`)}}const ne=/\{\{(.*?)\}\}/g;function at(r){var i;const t={};return(((i=r.match(ne))==null?void 0:i.map(n=>n.replace(/[{()}]/g,"")))??[]).forEach(n=>{t[n]=[]}),t}function ut(r,t){let e;const i=/@in\s+([^;]+);/g;for(;(e=i.exec(r))!==null;)t.push(e[1])}function ct(r,t,e=!1){const i=[];ut(t,i),r.forEach(o=>{o.header&&ut(o.header,i)});const n=i;e&&n.sort();const s=n.map((o,u)=>`       @location(${u}) ${o},`).join(`
`);let a=t.replace(/@in\s+[^;]+;\s*/g,"");return a=a.replace("{{in}}",`
${s}
`),a}function lt(r,t){let e;const i=/@out\s+([^;]+);/g;for(;(e=i.exec(r))!==null;)t.push(e[1])}function se(r){const e=/\b(\w+)\s*:/g.exec(r);return e?e[1]:""}function oe(r){const t=/@.*?\s+/g;return r.replace(t,"")}function ae(r,t){const e=[];lt(t,e),r.forEach(u=>{u.header&&lt(u.header,e)});let i=0;const n=e.sort().map(u=>u.indexOf("builtin")>-1?u:`@location(${i++}) ${u}`).join(`,
`),s=e.sort().map(u=>`       var ${oe(u)};`).join(`
`),a=`return VSOutput(
                ${e.sort().map(u=>` ${se(u)}`).join(`,
`)});`;let o=t.replace(/@out\s+[^;]+;\s*/g,"");return o=o.replace("{{struct}}",`
${n}
`),o=o.replace("{{start}}",`
${s}
`),o=o.replace("{{return}}",`
${a}
`),o}function ht(r,t){let e=r;for(const i in t){const n=t[i];n.join(`
`).length?e=e.replace(`{{${i}}}`,`//-----${i} START-----//
${n.join(`
`)}
//----${i} FINISH----//`):e=e.replace(`{{${i}}}`,"")}return e}const y=Object.create(null),L=new Map;let ue=0;function ce({template:r,bits:t}){const e=yt(r,t);if(y[e])return y[e];const{vertex:i,fragment:n}=he(r,t);return y[e]=Pt(i,n,t),y[e]}function le({template:r,bits:t}){const e=yt(r,t);return y[e]||(y[e]=Pt(r.vertex,r.fragment,t)),y[e]}function he(r,t){const e=t.map(a=>a.vertex).filter(a=>!!a),i=t.map(a=>a.fragment).filter(a=>!!a);let n=ct(e,r.vertex,!0);n=ae(e,n);const s=ct(i,r.fragment,!0);return{vertex:n,fragment:s}}function yt(r,t){return t.map(e=>(L.has(e)||L.set(e,ue++),L.get(e))).sort((e,i)=>e-i).join("-")+r.vertex+r.fragment}function Pt(r,t,e){const i=at(r),n=at(t);return e.forEach(s=>{ot(s.vertex,i,s.name),ot(s.fragment,n,s.name)}),{vertex:ht(r,i),fragment:ht(t,n)}}const fe=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,de=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`,me=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,pe=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`,ge={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},xe={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};function Ee({bits:r,name:t}){const e=ce({template:{fragment:de,vertex:fe},bits:[ge,...r]});return z.from({name:t,vertex:{source:e.vertex,entryPoint:"main"},fragment:{source:e.fragment,entryPoint:"main"}})}function Be({bits:r,name:t}){return new dt({name:t,...le({template:{vertex:me,fragment:pe},bits:[xe,...r]})})}const Ie={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},ze={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},j={};function be(r){const t=[];if(r===1)t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),t.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let e=0;for(let i=0;i<r;i++)t.push(`@group(1) @binding(${e++}) var textureSource${i+1}: texture_2d<f32>;`),t.push(`@group(1) @binding(${e++}) var textureSampler${i+1}: sampler;`)}return t.join(`
`)}function ve(r){const t=[];if(r===1)t.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{t.push("switch vTextureId {");for(let e=0;e<r;e++)e===r-1?t.push("  default:{"):t.push(`  case ${e}:{`),t.push(`      outColor = textureSampleGrad(textureSource${e+1}, textureSampler${e+1}, vUV, uvDx, uvDy);`),t.push("      break;}");t.push("}")}return t.join(`
`)}function Me(r){return j[r]||(j[r]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;
    
                ${be(16)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);
    
                ${ve(16)}
            `}}),j[r]}const H={};function _e(r){const t=[];for(let e=0;e<r;e++)e>0&&t.push("else"),e<r-1&&t.push(`if(vTextureId < ${e}.5)`),t.push("{"),t.push(`	outColor = texture(uTextures[${e}], vUV);`),t.push("}");return t.join(`
`)}function Ce(r){return H[r]||(H[r]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;
              
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;
    
                uniform sampler2D uTextures[${r}];
              
            `,main:`
    
                ${_e(16)}
            `}}),H[r]}const De={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},Ge={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},W={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},Re={...W,vertex:{...W.vertex,header:W.vertex.header.replace("group(1)","group(2)")}},Ve={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}};class Fe{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.groupBlendMode}packAttributes(t,e,i,n){const s=this.renderable,a=this.texture,o=s.groupTransform,u=o.a,l=o.b,c=o.c,m=o.d,f=o.tx,d=o.ty,h=this.bounds,_=h.maxX,p=h.minX,b=h.maxY,v=h.minY,x=a.uvs,E=s.groupColorAlpha,B=n<<16|this.roundPixels&65535;t[i+0]=u*p+c*v+f,t[i+1]=m*v+l*p+d,t[i+2]=x.x0,t[i+3]=x.y0,e[i+4]=E,e[i+5]=B,t[i+6]=u*_+c*v+f,t[i+7]=m*v+l*_+d,t[i+8]=x.x1,t[i+9]=x.y1,e[i+10]=E,e[i+11]=B,t[i+12]=u*_+c*b+f,t[i+13]=m*b+l*_+d,t[i+14]=x.x2,t[i+15]=x.y2,e[i+16]=E,e[i+17]=B,t[i+18]=u*p+c*b+f,t[i+19]=m*b+l*p+d,t[i+20]=x.x3,t[i+21]=x.y3,e[i+22]=E,e[i+23]=B}packIndex(t,e,i){t[e]=i+0,t[e+1]=i+1,t[e+2]=i+2,t[e+3]=i+0,t[e+4]=i+2,t[e+5]=i+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}function Ue(r,t,e){const i=(r>>24&255)/255;t[e++]=(r&255)/255*i,t[e++]=(r>>8&255)/255*i,t[e++]=(r>>16&255)/255*i,t[e++]=i}export{V as B,z as G,Qt as M,Y as R,Pe as S,Te as T,jt as U,Ie as a,gt as b,Ee as c,Jt as d,g as e,rt as f,Me as g,T as h,Q as i,W as j,dt as k,Re as l,Ae as m,we as n,Ft as o,Se as p,Fe as q,De as r,Ue as s,Be as t,ze as u,Ce as v,Ge as w,Yt as x,Ve as y};
