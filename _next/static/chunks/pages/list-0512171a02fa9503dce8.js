_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[20],{"/L7O":function(e,t,n){e.exports={container:"index-s_container__2O3GA",header:"index-s_header__3qsui",svg:"index-s_svg__1u2CH",title:"index-s_title__PCXyb",cards:"index-s_cards__1O7FW"}},"0qtJ":function(e,t,n){"use strict";n.r(t);var r=n("nKUr"),a=n("5UjZ"),c=n("o0o1"),i=n.n(c),s=n("HaE+"),o=n("q1tI"),l=n("Ff2n"),u=n("KQm4"),d=n("rePB"),f=n("TSYQ"),b=n.n(f),j=n("VYKx"),_=n("5Q2Q"),p=n("ri3m"),v=n("YZ46"),x=n("rtMV"),O=n("/s5S"),h=n("ptIG"),m=n("gVHv"),g=n("h7lv"),y=n("sNyq"),w=n("9IgY"),N=n("Qls5"),C=n("c9m8"),P=n("Q0IO"),S=n("7JBd"),k=n("rOIh"),R=function(e){var t=e.className,n=e.pages,a=e.value,c=e.onChange,i=Object(o.useState)(a),s=i[0],l=i[1];return Object(r.jsx)("div",{className:b()(t,k.pages),children:Array.from({length:n}).map((function(e,t){return Object(r.jsx)("button",{type:"button",className:b()(k.page,Object(d.a)({},k.active,t+1===s)),onClick:function(){return l(e=t+1),void c(e);var e},children:t+1},t)}))})},E=n("J43F"),D=n("AVwb"),H=n("aZ4e");function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(Object(n),!0).forEach((function(t){Object(d.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var B,U=n("HeSc"),L=function(e){var t=e.className,n=e.data,a=e.showPagination,c=e.currentPage,f=e.pages,k=e.onChangePage,A=Object(p.b)().setState,B=Object(h.b)(),L=B.removeUsers,T=B.getPlaylistData,I=Object(o.useMemo)((function(){return n.contacts}),[n.contacts]),M=Object(o.useState)(c||1),V=M[0],Q=M[1],F=Object(o.useCallback)((function(e){var t=[{type:"Playlist_Notes",data:n.playlist_id,review:1,meta:{text:e.newNotes}}],r=[{type:"Playlist_Notes",data:n.playlist_id,review:2}],a=Object(d.a)({},e.contact_id,[].concat(t,r));return m.c.postContactsMutable(a)}),[]),W=Object(o.useMemo)((function(){return[{Header:"Contact",accessor:"name",width:180,minWidth:180,Cell:function(e){var t=e.row;return Object(r.jsxs)("div",{className:U.cellName,children:[Object(r.jsx)(_.a,{className:U.avatar,image:t.original.avatar,name:Object(C.a)(t.original),strength:t.original.relationshipStrength})," ",Object(r.jsx)(v.a,{className:U.name,data:t.original,updateDataCallback:function(){return T(n.playlist_id)}})]})},sortType:Object(g.a)()},{Header:"Last outreach",accessor:"last_client_text",disableSortBy:!0,width:200,Cell:function(e){e.value;var t=e.row;return Object(r.jsx)(w.a,{id:t.original.contact_id,children:function(e,t,n){return Object(r.jsx)(y.a,{isLoading:t,lastMessageData:e,ref:n})}})}},{Header:"Next steps",disableSortBy:!0,width:200,Cell:function(e){e.value;var t=e.row;return Object(r.jsx)(N.a,{data:t.original})}},{Header:"Notes",accessor:"Playlist_Notes",disableSortBy:!0,width:180,Cell:function(e){var t=e.value,a=e.row,c=t.filter((function(e){return(null===e||void 0===e?void 0:e.playlistId)===n.playlist_id}))[0]||"",i=Object(o.useState)(null===c||void 0===c?void 0:c.text),s=i[0],l=i[1];return Object(r.jsx)(P.a,{value:s,maxRows:3,onChange:l,onSave:function(e){F(q(q({},a.original),{},{newNotes:e})).catch((function(){return l(s)}))}})}}]}),[n.playlist_id,T,F]),Y=Object(j.useTable)({columns:W,data:I||[]},j.useSortBy,j.useFlexLayout,j.useRowSelect,j.useRowState,(function(e){e.visibleColumns.push((function(e){return[{id:"selection",Header:function(e){var t=e.getToggleAllRowsSelectedProps;return Object(r.jsx)("div",{className:U.headerCheckbox,children:Object(r.jsx)(H.a,q({},t()))})},Cell:function(e){var t=e.row;return Object(r.jsxs)("div",{className:U.cellCheckbox,children:[Object(r.jsx)(H.a,q({},t.getToggleRowSelectedProps()))," "]})}}].concat(Object(u.a)(e))}))})),J=Y.getTableProps,K=Y.getTableBodyProps,X=Y.headerGroups,z=Y.rows,G=Y.prepareRow,Z=Y.selectedFlatRows;Object(o.useEffect)((function(){A(Z.map((function(e){return e.original})))}),[Z]);var $=Object(o.useCallback)(function(){var e=Object(s.a)(i.a.mark((function e(t,r){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.stopPropagation(),e.next=3,L(n.playlist_id,[r]);case 3:return e.next=5,T(n.playlist_id);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),[T,L,n.playlist_id]);return Object(r.jsxs)("div",{className:U.container,children:[Object(r.jsxs)("table",q(q({className:b()(t,U.table)},J()),{},{children:[Object(r.jsx)("thead",{className:U.thead,children:X.map((function(e){var t=e.getHeaderGroupProps(),n=t.key,a=Object(l.a)(t,["key"]);return Object(o.createElement)("tr",q(q({},a),{},{className:U.tableRow,key:n}),e.headers.map((function(e){var t=e.getHeaderProps().key;return Object(o.createElement)("th",q(q({className:b()(U.columnHeader,U[t])},e.getHeaderProps(e.getSortByToggleProps())),{},{key:t}),e.render("Header"),Object(r.jsx)("span",{children:e.isSorted?e.isSortedDesc?Object(r.jsx)(x.a,{className:U.sort,icon:"sort.svg"}):Object(r.jsx)(x.a,{className:b()(U.sort,U.sortAsc),icon:"sort.svg"}):""}))})))}))}),Object(r.jsxs)("tbody",q(q({className:U.tbody},K()),{},{children:[z.map((function(e){G(e);var t=e.getRowProps(),n=t.key,a=Object(l.a)(t,["key"]);return Object(r.jsx)(E.a,q(q({row:e,classes:{container:U.tableRow}},a),{},{children:Object(r.jsx)("td",{className:U.removeButton,children:Object(r.jsx)(D.a,{handler:function(t){e.setState({isLoading:!0}),$(t,e.original).then((function(){e.setState(q(q({},e.state),{},{isLoading:!1}))}))}})})}),n)})),a&&Object(r.jsx)(R,{pages:f||1,value:V,onChange:function(e){return Q(t=e),void(k&&k(t));var t}})]}))]})),Object(r.jsx)("div",{className:U.emptyCardContainer,children:0===z.length&&Object(r.jsxs)(O.a,{className:b()(t,U.emptyCard),children:[Object(r.jsx)("div",{className:U.cardLogo,children:Object(r.jsx)(x.a,{className:U.logo,icon:"lists.svg"})}),Object(r.jsx)(S.a,{className:U.cardHeader,fontVariant:"gilroy",fontWeight:"bold",styleVariant:"h3",children:"Search contacts to add to your list"})]})})]})},T=n("UKrC"),I=n("6CnL"),M=n("20a2");n("wx14");!function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(B||(B={}));const V=Object(o.createContext)({outlet:null,matches:[]});var Q=n("vh2s"),F=n("+7o4"),W=n("UsUx"),Y=function(e){var t=e.data,n=e.addUser,a=Object(o.useState)(!1),c=a[0],l=a[1],u=function(){var e=Object(s.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l(!0),e.next=3,n(t);case 3:l(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.jsxs)(O.a,{className:W.container,children:[Object(r.jsxs)("div",{className:W.header,children:[Object(r.jsx)(_.a,{className:W.avatar,name:Object(C.a)(t),image:null===t||void 0===t?void 0:t.image_url}),Object(r.jsx)("div",{className:W.info,children:Object(r.jsx)("div",{className:W.name,children:Object(C.a)(t)})}),Object(r.jsx)(F.a,{className:W.button,handler:u,type:"button",variant:"outlined",children:"+"})]}),Object(r.jsx)("div",{className:W.footer,children:Object(r.jsx)("div",{className:W.message,children:(null===t||void 0===t?void 0:t.message_template_description)&&Object(r.jsx)(N.a,{data:t})})}),c&&Object(r.jsx)(Q.a,{})]})},J=n("/L7O"),K=function(e){var t=e.className,n=e.contacts,a=e.playlistData,c=Object(h.b)(),l=c.addUsers,u=c.getPlaylistData,d=Object(o.useMemo)((function(){return null===n||void 0===n?void 0:n.filter((function(e){var t;return!(null!==a&&void 0!==a&&null!==(t=a.contacts)&&void 0!==t&&t.find((function(t){return t.contact_id===e.contact_id})))}))}),[n,a]),f=function(){var e=Object(s.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l(a.playlist_id,[t]);case 3:return e.next=5,u(a.playlist_id);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("\ud83d\ude80 ~ file: index.tsx ~ line 33 ~ addUserHandler ~ err",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();return 0!==(null===d||void 0===d?void 0:d.length)?Object(r.jsxs)("div",{className:b()(t,J.container),children:[Object(r.jsxs)("div",{className:J.header,children:[Object(r.jsx)(x.a,{className:J.svg,icon:"recs.svg"}),Object(r.jsx)(S.a,{className:J.title,fontVariant:"inter",children:"Add these recs to list?"})]}),Object(r.jsx)("div",{className:J.cards,children:null===d||void 0===d?void 0:d.map((function(e){return Object(r.jsx)(Y,{addUser:f,data:e},e.address)}))})]}):null},X=n("WXFI"),z=n("BpjT"),G=n("ySSG"),Z=function(){var e,t=Object(h.b)(),n=t.state,a=t.addUsers,c=t.getPlaylistDataPaginated,l=Object(I.b)().state,u=Object(M.useRouter)(),d=function(){let{matches:e}=Object(o.useContext)(V),t=e[e.length-1];return t?t.params:{}}().page,f=Object(o.useState)(d?parseInt(d,10):1),b=f[0],j=f[1];Object(o.useEffect)((function(){u.query.id&&c(u.query.id,b)}),[c,b,u.query.id]);var _=function(){var e=Object(s.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=11;break}return e.prev=1,e.next=4,a(null===n||void 0===n?void 0:n.playlist_id,[t]);case 4:return e.next=6,c(null===n||void 0===n?void 0:n.playlist_id);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.log("addUser err ==>",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return n?Object(r.jsxs)("div",{className:G.container,children:[n&&Object(r.jsx)(T.a,{data:n}),Object(r.jsx)("div",{className:G.content,children:Object(r.jsxs)(p.a,{children:[(null===(e=l.data)||void 0===e?void 0:e.contacts)&&Object(r.jsx)(K,{contacts:l.data.contacts,playlistData:n}),n&&Object(r.jsxs)("div",{className:G.tableActions,children:[Object(r.jsx)(z.a,{data:null===n||void 0===n?void 0:n.contacts,handler:_}),Object(r.jsx)(X.a,{data:n,buttons:["contact","removeContacts"]})]}),n&&Object(r.jsx)(L,{data:n,showPagination:!0,currentPage:b,pages:n.pages||1,onChangePage:function(e){return function(e){u.push("?id=".concat(u.query.id,"&page=").concat(e)),j(e)}(e)}})]})})]}):Object(r.jsx)("div",{className:G.loader,children:Object(r.jsx)(Q.a,{})})},$=n("tRB4"),ee=n("lsNj"),te=n("J0Lz"),ne=n("frRi");t.default=function(){return Object(r.jsx)(a.a,{className:ne.layout,children:Object(r.jsx)(te.a,{children:Object(r.jsx)(ee.a,{children:Object(r.jsx)(h.a,{children:Object(r.jsx)($.a,{children:Object(r.jsx)(Z,{})})})})})})}},"45PY":function(e,t,n){e.exports={textarea:"CellNotes-s_textarea__33LFw"}},Aitw:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("q1tI"),a=n("fkfh");function c(e,t){return e===t}function i(e){return"function"===typeof e?function(){return e}:e}t.default=function(e,t,n){var s=n&&n.equalityFn||c,o=function(e){var t=r.useState(i(e)),n=t[0],a=t[1];return[n,r.useCallback((function(e){return a(i(e))}),[])]}(e),l=o[0],u=o[1],d=a.default(r.useCallback((function(e){return u(e)}),[u]),t,n),f=r.useRef(e);return r.useEffect((function(){s(f.current,e)||(d(e),f.current=e)}),[e,d,s]),[l,{cancel:d.cancel,isPending:d.isPending,flush:d.flush}]}},DIbh:function(e,t,n){e.exports={button:"index-s_button__CyELw",icon:"index-s_icon__h8XcE"}},HeSc:function(e,t,n){e.exports={container:"index-s_container__2OTOp",table:"index-s_table__15Ui0",columnHeader:"index-s_columnHeader__3bjQY",tableRow:"index-s_tableRow__3JX1t",removeButton:"index-s_removeButton__2AwQm",headerButton:"index-s_headerButton__2VvEd",headerCheckbox:"index-s_headerCheckbox___6ywK",row:"index-s_row__2Ya42",header_All:"index-s_header_All__1g4tq",emptyCardContainer:"index-s_emptyCardContainer__2pGGX",cellName:"index-s_cellName__3RwFr",avatar:"index-s_avatar__TZSEt",cellContent:"index-s_cellContent__1B7Pm",cellHeaderAll:"index-s_cellHeaderAll__2JfQV",cellCheckbox:"index-s_cellCheckbox__1x9r4",tbody:"index-s_tbody__31uYa",lastData:"index-s_lastData__17i6q",lastMessage:"index-s_lastMessage__l-uqj",cardHeader:"index-s_cardHeader__2wIfy",emptyCard:"index-s_emptyCard__ASpSn",cardLogo:"index-s_cardLogo__qwML2",logo:"index-s_logo__k_-dZ",addUserView:"index-s_addUserView__3U30q",sort:"index-s_sort__NBqxV",sortAsc:"index-s_sortAsc__2aeAp"}},Q0IO:function(e,t,n){"use strict";var r=n("rePB"),a=n("nKUr"),c=n("Ff2n"),i=(n("q1tI"),n("z430")),s=n("TSYQ"),o=n.n(s);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d=n("45PY");t.a=function(e){var t=e.value,n=e.className,r=e.onSave,s=e.onChange,l=e.minRows,f=e.maxRows,b=Object(c.a)(e,["value","className","onSave","onChange","minRows","maxRows"]);return Object(a.jsx)("div",{className:o()(n,d.container),onClick:function(e){return e.stopPropagation()},"aria-hidden":"true",children:Object(a.jsx)(i.a,u({className:d.textarea,placeholder:"Include a note for this contact...",value:t||"",onBlur:function(e){return r(e.target.value)},onKeyDown:function(e){"Enter"!==e.key||e.shiftKey||e.target.blur()},onChange:function(e){s(e.target.value)},minRows:null!==l&&void 0!==l?l:1,maxRows:null!==f&&void 0!==f?f:1},b))})}},QRob:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("Aitw");t.useDebounce=r.default;var a=n("fkfh");t.useDebouncedCallback=a.default;var c=n("dSLR");t.useThrottledCallback=c.default},UKrC:function(e,t,n){"use strict";var r=n("nKUr"),a=n("ODXe"),c=n("q1tI"),i=n("TSYQ"),s=n.n(i),o=n("20a2"),l=n("rtMV"),u=n("DIbh"),d=function(e){var t=e.className,n=e.text,a=e.handler,c=Object(o.useRouter)();return Object(r.jsxs)("button",{className:s()(u.button,t),type:"button",onClick:function(){a?a():c.back()},children:[Object(r.jsx)(l.a,{icon:"arrow-left.svg",className:u.icon})," ",n||"Back"]})},f=n("z430"),b=n("QRob"),j=n("gVHv"),_=n("wTbW");t.a=function(e){var t,n,i,l,u=e.className,p=e.data,v=e.updateNewList,x=Object(o.useRouter)(),O=Object(c.useState)({title:null===(t=p.info)||void 0===t?void 0:t.name,description:null===(n=p.info)||void 0===n?void 0:n.description}),h=O[0],m=O[1],g=Object(b.useDebounce)(h,500),y=Object(a.a)(g,1)[0];Object(c.useEffect)((function(){var e,t;m({title:null===(e=p.info)||void 0===e?void 0:e.name,description:null===(t=p.info)||void 0===t?void 0:t.description})}),[p.contacts,null===(i=p.info)||void 0===i?void 0:i.description,null===(l=p.info)||void 0===l?void 0:l.name]),Object(c.useEffect)((function(){y.title===p.title&&y.description===p.description||p.playlist_id&&j.c.postPlaylists([{playlist_id:p.playlist_id,info:{name:y.title,description:y.description}}]).catch((function(e){console.log("ListHeader err =>",e)}))}),[p,y]);return Object(r.jsxs)("div",{className:s()(u,_.container),children:[Object(r.jsx)(d,{text:"Back to lists",handler:function(){return x.push("/lists")}}),Object(r.jsx)("input",{className:_.title,name:"title",placeholder:"Enter name...",onChange:function(e){v?v("title",e.target.value):m({title:e.target.value,description:y.description})},defaultValue:h.title||""}),Object(r.jsx)(f.a,{className:_.description,name:"description",placeholder:"Enter description...",defaultValue:h.description||"",onChange:function(e){v?v("description",e.target.value):m({title:y.title,description:e.target.value})}})]})}},UsUx:function(e,t,n){e.exports={container:"index-s_container__2Bzln",header:"index-s_header__1AaLN",avatar:"index-s_avatar__12dxN",info:"index-s_info__17QIw",name:"index-s_name__go82N",job:"index-s_job__2UV09",footer:"index-s_footer__1bHK3"}},dSLR:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("fkfh");t.default=function(e,t,n){var a=void 0===n?{}:n,c=a.leading,i=void 0===c||c,s=a.trailing,o=void 0===s||s;return r.default(e,t,{maxWait:t,leading:i,trailing:o})}},fkfh:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("q1tI");t.default=function(e,t,n){var a=this,c=r.useRef(null),i=r.useRef(0),s=r.useRef(null),o=r.useRef([]),l=r.useRef(),u=r.useRef(),d=r.useRef(e),f=r.useRef(!0);d.current=e;var b=!t&&0!==t&&"undefined"!==typeof window;if("function"!==typeof e)throw new TypeError("Expected a function");t=+t||0;var j=!!(n=n||{}).leading,_=!("trailing"in n)||!!n.trailing,p="maxWait"in n,v=p?Math.max(+n.maxWait||0,t):null;return r.useEffect((function(){return f.current=!0,function(){f.current=!1}}),[]),r.useMemo((function(){var e=function(e){var t=o.current,n=l.current;return o.current=l.current=null,i.current=e,u.current=d.current.apply(n,t)},n=function(e,t){b&&cancelAnimationFrame(s.current),s.current=b?requestAnimationFrame(e):setTimeout(e,t)},r=function(e){if(!f.current)return!1;var n=e-c.current,r=e-i.current;return!c.current||n>=t||n<0||p&&r>=v},x=function(t){return s.current=null,_&&o.current?e(t):(o.current=l.current=null,u.current)},O=function(){var e=Date.now();if(r(e))return x(e);if(f.current){var a=e-c.current,s=e-i.current,o=t-a,l=p?Math.min(o,v-s):o;n(O,l)}},h=function(){for(var d=[],b=0;b<arguments.length;b++)d[b]=arguments[b];var _=Date.now(),v=r(_);if(o.current=d,l.current=a,c.current=_,v){if(!s.current&&f.current)return i.current=c.current,n(O,t),j?e(c.current):u.current;if(p)return n(O,t),e(c.current)}return s.current||n(O,t),u.current};return h.cancel=function(){s.current&&(b?cancelAnimationFrame(s.current):clearTimeout(s.current)),i.current=0,o.current=c.current=l.current=s.current=null},h.isPending=function(){return!!s.current},h.flush=function(){return s.current?x(Date.now()):u.current},h}),[j,p,t,v,_,b])}},frRi:function(e,t,n){e.exports={layout:"list-s_layout__16sk0"}},rOIh:function(e,t,n){e.exports={pages:"index-s_pages__3tczA",page:"index-s_page__3gClf",active:"index-s_active__2J8ZO"}},wTbW:function(e,t,n){e.exports={container:"index-s_container__1z7jC",title:"index-s_title__HrLmY",description:"index-s_description__2ppuq",userCount:"index-s_userCount__2idX9",inputWrapper:"index-s_inputWrapper__2JARm",button:"index-s_button__z3iMM",loader:"index-s_loader__1IbBy"}},ySSG:function(e,t,n){e.exports={container:"index-s_container__2ZQZB",tableActions:"index-s_tableActions__1rt6X",loader:"index-s_loader__2SWfg"}},zCqn:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/list",function(){return n("0qtJ")}])}},[["zCqn",0,2,8,1,3,4,5,7,6,9,10,11]]]);