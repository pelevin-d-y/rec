_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[16],{"0Aie":function(t,a,e){"use strict";e.r(a);var n=e("nKUr"),s=(e("q1tI"),e("tRB4")),c=e("5UjZ"),r=e("TSYQ"),o=e.n(r),i=e("20a2"),d=e("JV1x"),l=e("c9m8"),j=e("5Q2Q"),b=e("ufYd"),u=e("+7o4"),_=e("xNOJ"),p=e("/s5S"),m=e("7JBd"),x=[{name:"Say Hi",handler:function(){return null}},{name:"Send Meme",handler:function(){return null}},{name:"Plan a dinner",handler:function(){return null}}],O=e("tlhW"),h=function(t){var a=t.className;return Object(n.jsx)(p.a,{className:o()(O.container,a),children:Object(n.jsxs)("ul",{className:O.list,children:[null===x||void 0===x?void 0:x.map((function(t){return Object(n.jsx)("li",{className:O.item,children:Object(n.jsx)("button",{type:"button",onClick:function(){return t.handler()},className:O.popupButton,children:Object(n.jsx)(m.a,{fontVariant:"inter",styleVariant:"body3",fontWeight:"medium",children:t.name})})},t.name)})),Object(n.jsx)("li",{className:O.item,children:Object(n.jsx)("button",{type:"button",onClick:function(){return null},className:o()(O.popupButton,O.ignore),children:Object(n.jsx)(m.a,{fontVariant:"inter",styleVariant:"body3",fontWeight:"medium",children:"Ignore"})})})]})})},C=e("lygA"),N=function(t){var a=t.className,e=t.buttonClickHandler,s=t.variant,c=t.isArrow,r=t.children;return Object(n.jsx)(_.a,{showPopupEvent:"hover",triggerElement:Object(n.jsx)(u.a,{className:o()(a,C.button),variant:s,isArrow:c,handler:function(){return e()},children:r}),popupContent:Object(n.jsx)(h,{className:C.popup})})},f=e("O/Zn"),v=e("Qls5"),y=e("jAbY"),A=function(t){var a=t.className,e=t.updateData,c=t.mutableData,r=t.id,i=c?Object(d.a)(c,r):null,u=Object(s.b)().dispatch;return Object(n.jsxs)("div",{className:o()(a,y.container),children:[Object(n.jsxs)("div",{className:y.header,children:[Object(n.jsxs)("div",{className:y.headerTop,children:[i&&Object(n.jsx)(j.a,{name:Object(l.a)(i),className:y.avatar,image:i.avatar}),Object(n.jsx)("div",{className:y.name,children:i&&Object(l.a)(i)})]}),Object(n.jsxs)("div",{className:y.actions,children:[i&&Object(n.jsx)(v.a,{className:y.nextStep,data:i}),Object(n.jsxs)("div",{className:y.buttons,children:[Object(n.jsx)(b.a,{className:y.dots,variant:"outlined"}),Object(n.jsx)(N,{className:y.buttonPopup,variant:"contained",buttonClickHandler:function(){u({type:"TOGGLE_COMPOSE_POPUP",payload:i})},isArrow:!0,children:"Appreciate you!"})]})]})]}),Object(n.jsx)(f.a,{mutableData:c,updateData:e,id:r})]})},T=e("GTV5"),P=e("Mv+i"),w=e("O3Ux"),E=e("8Jts"),V=e("edla"),g=function(t){var a=t.className,e=t.mutableData,s=t.updateData,c=t.id,r=e?Object(d.a)(e,c):null;return Object(n.jsx)("div",{className:o()(a,V.container),children:Object(n.jsxs)(T.d,{children:[Object(n.jsxs)(T.b,{className:V.tabs,children:[Object(n.jsx)(T.a,{className:V.tabItem,children:Object(n.jsx)(m.a,{styleVariant:"body1",fontVariant:"inter",children:"Lists"})}),Object(n.jsx)(T.a,{className:V.tabItem,children:Object(n.jsx)(m.a,{styleVariant:"body1",fontVariant:"inter",children:"Recs"})}),Object(n.jsx)(T.a,{className:V.tabItem,children:Object(n.jsx)(m.a,{styleVariant:"body1",fontVariant:"inter",children:"Notes"})})]}),Object(n.jsx)(T.c,{children:r&&Object(n.jsx)(w.a,{data:r})}),Object(n.jsx)(T.c,{children:r&&Object(n.jsx)(E.a,{data:r})}),Object(n.jsx)(T.c,{children:Object(n.jsx)(P.a,{className:V.tabNotes,updateData:s,mutableData:e})})]})})},J=e("cuv2"),D=e("balD"),I=function(t){var a=t.className,e=Object(i.useRouter)().query,s=Object(J.a)({WrappedComponent:A,id:e.id}),c=Object(J.a)({WrappedComponent:g,id:e.id});return Object(n.jsxs)("div",{className:o()(a,D.container),children:[Object(n.jsx)("div",{className:D.contactCard,children:Object(n.jsx)(s,{})}),Object(n.jsx)("div",{className:D.contactTabs,children:Object(n.jsx)(c,{})})]})},S=e("lsNj"),L=e("ptIG"),k=e("J0Lz"),B=e("tOEm");a.default=function(){return Object(n.jsx)(c.a,{className:B.layout,children:Object(n.jsx)(S.a,{children:Object(n.jsx)(L.a,{children:Object(n.jsx)(k.a,{children:Object(n.jsx)(s.a,{children:Object(n.jsx)(I,{})})})})})})}},QLSJ:function(t,a,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contact",function(){return e("0Aie")}])},balD:function(t,a,e){t.exports={container:"index-s_container__3LxCA",contactCard:"index-s_contactCard___itQB",contactTabs:"index-s_contactTabs__87LfE"}},edla:function(t,a,e){t.exports={container:"ContactTabs-s_container__36IyW",tabs:"ContactTabs-s_tabs__xUoai",tabItem:"ContactTabs-s_tabItem__3J_E0",panel:"ContactTabs-s_panel__19wdr",tabNotes:"ContactTabs-s_tabNotes__pNZ8m"}},jAbY:function(t,a,e){t.exports={container:"ContactCard-s_container__ss0UZ",header:"ContactCard-s_header__hhc-v",headerTop:"ContactCard-s_headerTop__1P4Vk",headerInfo:"ContactCard-s_headerInfo__4upAZ",avatar:"ContactCard-s_avatar__3-SEH",actions:"ContactCard-s_actions__3F7zV",buttons:"ContactCard-s_buttons__3dC0q",nextStep:"ContactCard-s_nextStep__2HrhZ",name:"ContactCard-s_name__1uLA1",message:"ContactCard-s_message__1spMx",dots:"ContactCard-s_dots__J-epZ",buttonPopup:"ContactCard-s_buttonPopup__2nJOa"}},lygA:function(t,a,e){t.exports={popup:"index-s_popup__2-lCL",stars:"index-s_stars__3opBk",rate:"index-s_rate__1hK1T"}},tOEm:function(t,a,e){},tlhW:function(t,a,e){t.exports={list:"PopoverActionsContent-s_list__TJyqd",item:"PopoverActionsContent-s_item__3ZDX1",popupButton:"PopoverActionsContent-s_popupButton__2EAnt",ignore:"PopoverActionsContent-s_ignore__2fXrd"}}},[["QLSJ",0,2,8,1,3,4,5,7,6,9,10]]]);