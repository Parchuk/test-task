(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37368780"],{1771:function(t,e,i){var a={"./backgrounds-blank.jpg":"29d7","./uploads/customer-girl.jpg":"f0f9"};function n(t){var e=r(t);return i(e)}function r(t){if(!i.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}n.keys=function(){return Object.keys(a)},n.resolve=r,t.exports=n,n.id="1771"},"1d3f":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contact-details"},[a("div",{staticClass:"contact-details__contaiter"},[a("div",{staticClass:"user-img-box"},[t.currentContact.imgUrl?a("span",[a("img",{attrs:{src:i("1771")("./"+t.currentContact.imgUrl),alt:"userImg"}})]):a("span",{staticClass:"userDefaultImg"},[a("font-awesome-icon",{attrs:{icon:["fas","user"]}})],1)]),a("ul",{staticClass:"user-details"},[t._l(t.currentContact.attributes,(function(e){return a("li",{key:e._id,ref:"listAttributes",refInFor:!0,staticClass:"attributesContact"},[a("button",{staticClass:"backOneStep editActive",on:{click:function(i){return t.backOneStep(i,e._id)}}},[a("font-awesome-icon",{attrs:{icon:["fas","undo"]}})],1),a("input",{staticClass:"attribut editActive",domProps:{value:e.attribut}}),a("input",{staticClass:"attributValue editActive",domProps:{value:e.value}}),a("button",{staticClass:"cancelChange editActive",on:{click:function(i){t.toggleModal,t.setCurrentContactId("BACK_ONE_STEP",e._id)}}},[t._v(" Cancel ")]),a("button",{staticClass:"attributSave editActive",on:{click:function(i){return t.saveAttribute(i,e._id)}}},[t._v(" Save ")]),a("i",{staticClass:"delete",on:{click:function(i){return t.setCurrentContactId("DELETE_ATTRIBUTE",e._id)}}},[a("font-awesome-icon",{attrs:{icon:["fas","trash"]}})],1),a("i",{staticClass:"edit",on:{click:function(i){return t.editAttribute(i,e._id)}}},[a("font-awesome-icon",{attrs:{icon:["fas","pen"]}})],1)])})),a("li",{staticClass:"attributesContact"},[a("span",{staticClass:"attribut"},[t._v("Created")]),t._v(" "+t._s(this.currentContact.createdAt)+" ")])],2)]),a("form",{on:{submit:function(e){return e.preventDefault(),t.submitHandler(e)}}},[a("p",[t._v("You can add new information for this user")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newAttribut,expression:"newAttribut"}],attrs:{type:"text",placeholder:"Name attribute",required:""},domProps:{value:t.newAttribut},on:{input:function(e){e.target.composing||(t.newAttribut=e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newValue,expression:"newValue"}],attrs:{type:"text",placeholder:"Value attribute",required:""},domProps:{value:t.newValue},on:{input:function(e){e.target.composing||(t.newValue=e.target.value)}}}),a("input",{attrs:{type:"submit",value:"Add new attribute"}})]),a("router-link",{attrs:{to:"/"}},[t._v("Back to Contact List")])],1)},n=[],r=(i("99af"),i("4de4"),i("96cf"),i("1da1")),u=i("2909"),s=i("2f62"),o=i("39d4"),c={computed:Object(s["b"])(["allContacts"]),props:["toggleModal","setCurrentContactId"],data:function(){return{currentContact:[],newAttribut:"",newValue:"",editedAttribut:"",editedValue:"",oldAttribut:"",oldValue:""}},methods:{findCurrentContact:function(){var t=this,e=Object(u["a"])(this.allContacts).filter((function(e){return e._id===t.$route.params.id}));this.currentContact=e[0]},submitHandler:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i={attribut:t.newAttribut,value:t.newValue,id:t.currentContact._id},t.newAttribut="",t.newValue="",e.next=5,o["a"].insertContact("add-attribute",i).then((function(e){t.currentContact.attributes.push(e.data);var i=[].concat(Object(u["a"])(t.allContacts),[t.currentContact]);t.$store.dispatch("updateContacts",i)}));case 5:case"end":return e.stop()}}),e)})))()},editAttribute:function(t,e){if(this.setOldAttributeValue(e),t.target.parentNode.classList.contains("edit")){t.target.parentNode.parentNode.classList.toggle("editActive");for(var i=this.$refs.listAttributes,a=0;a<i.length;a++)i[a]!==t.target.parentNode.parentNode&&i[a].classList.remove("editActive")}},saveAttribute:function(t,e){this.editedAttribut=t.target.previousSibling.previousSibling.previousSibling.value,this.editedValue=t.target.previousSibling.previousSibling.value;var i={attribut:this.editedAttribut,value:this.editedValue,id:e};o["a"].updateAttribute("update-attribute",i),t.target.parentNode.classList.remove("editActive"),this.editedAttribut="",this.editedValue=""},setOldAttributeValue:function(t){var e=Object(u["a"])(this.currentContact.attributes).filter((function(e){return e._id===t}));this.oldAttribut=e[0].attribut,this.oldValue=e[0].value},backOneStep:function(t,e){var i={attribut:this.oldAttribut,value:this.oldValue,id:e};t.target.nextSibling.nextSibling.value=this.oldValue,t.target.nextSibling.value=this.oldAttribut,o["a"].updateAttribute("update-attribute",i)}},mounted:function(){this.findCurrentContact()}},l=c,d=(i("a48b"),i("2877")),b=Object(d["a"])(l,a,n,!1,null,"ed625472",null);e["default"]=b.exports},"29d7":function(t,e,i){t.exports=i.p+"img/backgrounds-blank.f251f4b1.jpg"},8303:function(t,e,i){},a48b:function(t,e,i){"use strict";i("8303")},f0f9:function(t,e,i){t.exports=i.p+"img/customer-girl.9c1ea205.jpg"}}]);
//# sourceMappingURL=chunk-37368780.00f716ea.js.map