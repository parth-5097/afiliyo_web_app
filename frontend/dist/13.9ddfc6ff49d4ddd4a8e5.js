(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{gF26:function(t,e,i){"use strict";i.r(e),i.d(e,"PostModule",function(){return I});var n=i("ofXK"),b=i("tyNb"),a=i("njyG"),s=i("XNiG"),o=i("fXoL"),c=i("Ja+W"),r=i("Dfg1"),d=i("5eHb");const l=function(t){return["edit",t]},g=function(){return["view"]};function m(t,e){if(1&t){const t=o.Qb();o.Pb(0,"tr"),o.Pb(1,"td"),o.Pb(2,"a",14),o.Lb(3,"img",15),o.Ob(),o.Pb(4,"a",16),o.Lb(5,"i",17),o.Ob(),o.Pb(6,"a",18),o.Lb(7,"img",19),o.Ob(),o.Pb(8,"a",20),o.Wb("click",function(){o.oc(t);const i=e.$implicit;return o.ac(2).onDelete(i.id)}),o.Lb(9,"img",21),o.Ob(),o.Ob(),o.Pb(10,"td"),o.wc(11),o.Ob(),o.Pb(12,"td"),o.wc(13),o.Ob(),o.Pb(14,"td"),o.wc(15),o.Ob(),o.Pb(16,"td"),o.wc(17),o.Ob(),o.Pb(18,"td"),o.wc(19),o.Ob(),o.Pb(20,"td"),o.wc(21),o.Ob(),o.Pb(22,"td"),o.wc(23),o.Ob(),o.Pb(24,"td"),o.wc(25),o.Ob(),o.Pb(26,"td"),o.wc(27),o.Ob(),o.Pb(28,"td"),o.wc(29),o.Ob(),o.Pb(30,"td"),o.wc(31),o.Ob(),o.Ob()}if(2&t){const t=e.$implicit;o.yb(2),o.gc("routerLink",o.lc(14,l,t.id)),o.yb(2),o.gc("routerLink",o.kc(16,g))("state",t),o.yb(7),o.xc(t.region),o.yb(2),o.xc(t.id),o.yb(2),o.xc(t.user_id),o.yb(2),o.xc(t.item_id),o.yb(2),o.xc(t.name),o.yb(2),o.xc(t.username),o.yb(2),o.xc(t.description),o.yb(2),o.xc(t.hashtag),o.yb(2),o.xc(t.likes),o.yb(2),o.xc(t.reach),o.yb(2),o.xc(t.impression)}}function u(t,e){if(1&t&&(o.Pb(0,"tbody"),o.vc(1,m,32,17,"tr",13),o.Ob()),2&t){const t=o.ac();o.yb(1),o.gc("ngForOf",t.data)}}let h=(()=>{class t{constructor(t,e,i){this.usernameService=t,this.exportService=e,this.toastr=i,this.dtOptions={},this.dtTrigger=new s.a,this.data=[]}ngOnInit(){this.dtOptions={pagingType:"simple_numbers",pageLength:10,paging:!0,destroy:!0,scrollX:!0,scrollY:"50vh",language:{paginate:{next:'<i class="fa fa-angle-double-right"></i>',previous:'<i class="fa fa-angle-double-left"></i>',first:'<i class="fa fa-angle-double-right"></i>',last:'<i class="fa fa-angle-double-left"></i>'}}},this.getDbData().then(t=>{this.dtTrigger.next()})}getDbData(){return new Promise((t,e)=>{this.data=[],this.usernameService.get("post").subscribe(e=>{this.data=e.data,t(e)})})}reload(){this.getDbData().then(t=>{this.dtTrigger.next()})}rerender(){this.dtTrigger.next()}onExport(){this.exportService.exportToCsv(this.data,`${Date()}`),this.toastr.info("Exported")}onDelete(t){this.usernameService.delete(`post/${t}`).subscribe(t=>{this.toastr.success(t.message),this.getDbData().then(t=>{this.dtTrigger.next()})})}ngOnDestroy(){this.dtTrigger.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(o.Kb(c.a),o.Kb(r.a),o.Kb(d.b))},t.\u0275cmp=o.Eb({type:t,selectors:[["app-posts"]],viewQuery:function(t,e){if(1&t&&o.zc(a.a,1),2&t){let t;o.mc(t=o.Xb())&&(e.datatableElement=t.first)}},decls:43,vars:3,consts:[[1,"content-wrapper-section"],[1,"container-fluid"],[1,"row"],[1,"col-12"],[1,"inr-title-comn","d-flex","align-items-center"],[1,"inr-title-btn","ml-auto"],["type","button",1,"btn","btn","btn-reset",3,"click"],[1,"dash-box-white"],[1,"tab-content"],["id","pills-All","role","tabpanel","aria-labelledby","pills-All-tab",1,"tab-pane","fade","active","show"],["datatable","","id","Customers-list",1,"display",3,"dtOptions","dtTrigger"],[4,"ngIf"],[1,"overlay","toggle-icon-main"],[4,"ngFor","ngForOf"],[3,"routerLink"],["src","assets/images/edit-icon-table.svg","alt","",1,"mx-2","table-img-inr"],[3,"routerLink","state"],["aria-hidden","true",1,"fa","fa-database"],["href","javascript:void(0)"],["src","assets/images/analytics.png","alt","",1,"mx-2","table-img-inr"],["href","javascript:void(0)",3,"click"],["src","assets/images/delete-icon.svg","alt","",1,"mx-2","table-img-inr"]],template:function(t,e){1&t&&(o.Pb(0,"main",0),o.Pb(1,"div",1),o.Pb(2,"div",2),o.Pb(3,"div",3),o.Pb(4,"div",4),o.Pb(5,"h1"),o.wc(6,"Posts"),o.Ob(),o.Pb(7,"div",5),o.Pb(8,"button",6),o.Wb("click",function(){return e.onExport()}),o.wc(9," Export "),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Pb(10,"div",3),o.Pb(11,"div",7),o.Pb(12,"div",8),o.Pb(13,"div",9),o.Pb(14,"table",10),o.Pb(15,"thead"),o.Pb(16,"tr"),o.Pb(17,"th"),o.wc(18,"Action"),o.Ob(),o.Pb(19,"th"),o.wc(20,"Region"),o.Ob(),o.Pb(21,"th"),o.wc(22,"Id"),o.Ob(),o.Pb(23,"th"),o.wc(24,"User Id"),o.Ob(),o.Pb(25,"th"),o.wc(26,"Item Id"),o.Ob(),o.Pb(27,"th"),o.wc(28,"Name"),o.Ob(),o.Pb(29,"th"),o.wc(30,"Username"),o.Ob(),o.Pb(31,"th"),o.wc(32,"Description"),o.Ob(),o.Pb(33,"th"),o.wc(34,"Hashtag"),o.Ob(),o.Pb(35,"th"),o.wc(36,"Likes"),o.Ob(),o.Pb(37,"th"),o.wc(38,"Reach"),o.Ob(),o.Pb(39,"th"),o.wc(40,"Impression"),o.Ob(),o.Ob(),o.Ob(),o.vc(41,u,2,1,"tbody",11),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Lb(42,"div",12),o.Ob()),2&t&&(o.yb(14),o.gc("dtOptions",e.dtOptions)("dtTrigger",e.dtTrigger),o.yb(27),o.gc("ngIf",0!=(null==e.data?null:e.data.length)))},directives:[a.a,n.l,n.k,b.e],styles:[""]}),t})();var p=i("cxbk"),O=i("eSVu");const P=["slickModal"];function v(t,e){if(1&t&&(o.Pb(0,"div",19),o.Pb(1,"video",20),o.Lb(2,"source",21),o.Ob(),o.Ob()),2&t){const t=e.$implicit,i=o.ac();o.yb(1),o.jc("poster","",i.baseUrl,"",t,"",o.qc),o.yb(1),o.jc("src","",i.baseUrl,"",t,"",o.qc)}}const f=function(t){return["/admin/post/edit",t]};let y=(()=>{class t{constructor(t,e,i){this.usernameService=t,this.toastr=e,this.router=i,this.slideConfig={slidesToShow:5,slidesToScroll:1},this.data={},this.images=[],this.baseUrl=p.a.PORT_URL}ngOnInit(){history.state.id&&localStorage.setItem("postData",JSON.stringify(history.state)),this.data=JSON.parse(localStorage.getItem("postData")),this.images=this.data.image.split(",")}onDelete(){this.usernameService.delete(`post/${this.data.id}`).subscribe(t=>{this.toastr.success(t.message),this.router.navigate(["/admin/post"])})}}return t.\u0275fac=function(e){return new(e||t)(o.Kb(c.a),o.Kb(d.b),o.Kb(b.b))},t.\u0275cmp=o.Eb({type:t,selectors:[["app-view-perticular-post"]],viewQuery:function(t,e){if(1&t&&o.zc(P,1),2&t){let t;o.mc(t=o.Xb())&&(e.slickModal=t.first)}},decls:79,vars:18,consts:[[1,"content-wrapper-section"],[1,"container-fluid"],[1,"row"],[1,"col-12"],[1,"inr-title-comn","d-sm-flex","align-items-center","justify-content-between"],[1,"inr-title-btn"],["type","button",1,"btn","btn-reset","mr-2",3,"routerLink"],["type","button",1,"btn","btn","btn-inr-top",3,"click"],[1,"dash-box-white"],[1,"post-dtls"],[1,"number-text"],["alt","","height","10%","width","10%",3,"src"],[1,"clearfix","post-dtls-body","mb-4"],[1,"profile-section-main-inner-body-inr-part"],[1,"post-dtls-image"],[1,"carousel",3,"config"],["slickModal","slick-carousel"],["ngxSlickItem","","class","slide","style","height: auto",4,"ngFor","ngForOf"],[1,"overlay","toggle-icon-main"],["ngxSlickItem","",1,"slide",2,"height","auto"],["width","100%","height","auto","autoplay","",3,"poster"],[3,"src"]],template:function(t,e){1&t&&(o.Pb(0,"main",0),o.Pb(1,"div",1),o.Pb(2,"div",2),o.Pb(3,"div",3),o.Pb(4,"div",4),o.Pb(5,"h1"),o.wc(6,"Details"),o.Ob(),o.Pb(7,"div",5),o.Pb(8,"button",6),o.wc(9," Edit "),o.Ob(),o.Pb(10,"button",7),o.Wb("click",function(){return e.onDelete()}),o.wc(11," Delete "),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Pb(12,"div",3),o.Pb(13,"div",8),o.Pb(14,"div",9),o.Pb(15,"span",10),o.wc(16,"View"),o.Ob(),o.Lb(17,"img",11),o.Pb(18,"div",12),o.Pb(19,"div",13),o.Pb(20,"h4"),o.wc(21,"Name"),o.Ob(),o.Pb(22,"p"),o.wc(23),o.Ob(),o.Ob(),o.Pb(24,"div",13),o.Pb(25,"h4"),o.wc(26,"User Name"),o.Ob(),o.Pb(27,"p"),o.wc(28),o.Ob(),o.Ob(),o.Pb(29,"div",13),o.Pb(30,"h4"),o.wc(31,"Region"),o.Ob(),o.Pb(32,"p"),o.wc(33),o.Ob(),o.Ob(),o.Pb(34,"div",13),o.Pb(35,"h4"),o.wc(36,"Id"),o.Ob(),o.Pb(37,"p"),o.wc(38),o.Ob(),o.Ob(),o.Pb(39,"div",13),o.Pb(40,"h4"),o.wc(41,"User Id"),o.Ob(),o.Pb(42,"p"),o.wc(43),o.Ob(),o.Ob(),o.Pb(44,"div",13),o.Pb(45,"h4"),o.wc(46,"Item Id"),o.Ob(),o.Pb(47,"p"),o.wc(48),o.Ob(),o.Ob(),o.Pb(49,"div",13),o.Pb(50,"h4"),o.wc(51,"Image"),o.Ob(),o.Pb(52,"p"),o.wc(53),o.Ob(),o.Ob(),o.Pb(54,"div",13),o.Pb(55,"h4"),o.wc(56,"Description"),o.Ob(),o.Pb(57,"p"),o.wc(58),o.Ob(),o.Ob(),o.Pb(59,"div",13),o.Pb(60,"h4"),o.wc(61,"Reach"),o.Ob(),o.Pb(62,"p"),o.wc(63),o.Ob(),o.Ob(),o.Pb(64,"div",13),o.Pb(65,"h4"),o.wc(66,"Impression"),o.Ob(),o.Pb(67,"p"),o.wc(68),o.Ob(),o.Ob(),o.Pb(69,"div",13),o.Pb(70,"h4"),o.wc(71,"Items"),o.Ob(),o.Pb(72,"pre"),o.wc(73),o.Ob(),o.Ob(),o.Ob(),o.Pb(74,"div",14),o.Pb(75,"ngx-slick-carousel",15,16),o.vc(77,v,3,4,"div",17),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Lb(78,"div",18),o.Ob()),2&t&&(o.yb(8),o.gc("routerLink",o.lc(16,f,e.data.id)),o.yb(9),o.jc("src","",e.baseUrl,"",e.data.profile_pic_img,"",o.qc),o.yb(6),o.xc(e.data.name),o.yb(5),o.xc(e.data.username),o.yb(5),o.xc(e.data.region),o.yb(5),o.xc(e.data.id),o.yb(5),o.xc(e.data.user_id),o.yb(5),o.xc(e.data.item_id),o.yb(5),o.xc(e.data.image),o.yb(5),o.xc(e.data.description),o.yb(5),o.xc(e.data.reach),o.yb(5),o.xc(e.data.impression),o.yb(5),o.xc(e.data.items),o.yb(2),o.gc("config",e.slideConfig),o.yb(2),o.gc("ngForOf",e.images))},directives:[b.c,O.a,n.k,O.c],styles:[".number-text[_ngcontent-%COMP%]{display:block;color:#262e3a;font-size:26px;font-weight:600}.profile-section-main-inner-body-inr-part[_ngcontent-%COMP%]{border-bottom:1px solid rgba(38,50,56,.10196078431372549);padding:15px 0;width:50%;display:inline-block;float:left}.profile-section-main-inner-body-inr-part[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#007aff;font-weight:700;text-transform:capitalize;font-size:16px;margin-bottom:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.profile-section-main-inner-body-inr-part[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:0;color:#262e3a;font-weight:500;line-height:24px;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.post-dtls[_ngcontent-%COMP%]{margin-bottom:15px}"]}),t})();var w=i("4Svi"),x=i("3Pt+");const M=["slickModal"];function k(t,e){if(1&t&&(o.Pb(0,"option",36),o.wc(1),o.Ob()),2&t){const t=e.$implicit;o.hc("value",t.isoCode),o.yb(1),o.yc(" ",t.name," ")}}function C(t,e){if(1&t&&(o.Pb(0,"div",37),o.Pb(1,"video",38),o.Lb(2,"source",39),o.Ob(),o.Ob()),2&t){const t=e.$implicit,i=o.ac();o.yb(1),o.hc("poster",i.baseUrl+t,o.qc),o.yb(1),o.hc("src",i.baseUrl+t,o.qc)}}function L(t,e){if(1&t&&(o.Pb(0,"div",10),o.Pb(1,"div",11),o.Lb(2,"input",13),o.Ob(),o.Pb(3,"div",11),o.Lb(4,"input",13),o.Ob(),o.Pb(5,"div",11),o.Lb(6,"input",13),o.Ob(),o.Pb(7,"div",11),o.Pb(8,"a",40),o.wc(9),o.Ob(),o.Ob(),o.Ob()),2&t){const t=e.$implicit,i=o.ac();o.yb(2),o.gc("value",t.id),o.yb(2),o.gc("value",t.name),o.yb(2),o.gc("value",t.brandName),o.yb(2),o.jc("href","",i.baseUrl,"/",t.link,"",o.qc),o.yb(1),o.xc(t.link)}}const S=[{path:"",component:h},{path:"edit/:id",pathMatch:"full",component:(()=>{class t{constructor(t,e,i,n){this.usernameService=t,this.commonService=e,this.route=i,this.toastr=n,this.slideConfig={slidesToShow:5,slidesToScroll:1},this.images=[],this.items=[],this.data={},this.country=[],this.submit=!1,this.baseUrl=p.a.PORT_URL}ngOnInit(){this.route.params.subscribe(t=>{this.usernameService.get(`post/${t.id}`).subscribe(t=>{this.data=t.data[0],this.images=this.data.image.split(","),this.items=JSON.parse(this.data.items)})}),this.commonService.get("country").subscribe(t=>{this.country=t.data})}onSubmit(){this.submit=!0,this.usernameService.put(`user/${this.data.user_id}`,{name:this.data.name}).subscribe(t=>{this.usernameService.put(`post/${this.data.id}`,{likes:this.data.likes,share:this.data.share,commentPost:this.data.commentPost,savePost:this.data.savePost,items:this.data.items,description:this.data.description,hashtag:this.data.hashtag,tagBrand:this.data.tagBrand}).subscribe(t=>{this.submit=!1,this.toastr.success(t.message)})})}}return t.\u0275fac=function(e){return new(e||t)(o.Kb(c.a),o.Kb(w.a),o.Kb(b.a),o.Kb(d.b))},t.\u0275cmp=o.Eb({type:t,selectors:[["app-edit-post"]],viewQuery:function(t,e){if(1&t&&o.zc(M,1),2&t){let t;o.mc(t=o.Xb())&&(e.slickModal=t.first)}},decls:74,vars:19,consts:[[1,"content-wrapper-section"],[1,"container-fluid"],[1,"row"],[1,"col-12"],[1,"inr-title-comn"],[1,"dash-box-white"],[1,"customer-inr-sec"],[1,"d-flex","align-items-center"],["src","assets/images/list-type2.svg","alt",""],["alt","","height","10%","width","10%",3,"src"],[1,"row","mt-4"],[1,"col-xl-3","col-md-6","form-group"],["type","text","name","name",1,"form-control","input-style-admin",3,"ngModel","ngModelChange"],["type","text","disabled","",1,"form-control","input-style-admin",3,"value"],["type","text","name","id","disabled","",1,"form-control","input-style-admin",3,"value"],["type","number","name","likes",1,"form-control","input-style-admin",3,"ngModel","ngModelChange"],[1,"input-group"],["type","number","name","commentPost",1,"form-control","input-style-admin",3,"ngModel","ngModelChange"],["type","number","name","share",1,"form-control","input-style-admin",3,"ngModel","ngModelChange"],["type","number","name","savePost",1,"form-control","input-style-admin",3,"ngModel","ngModelChange"],["type","number","name","reach",1,"form-control","input-style-admin",3,"ngModel","ngModelChange"],["type","number","name","impression",1,"form-control","input-style-admin",3,"ngModel","ngModelChange"],["name","region",1,"custom-select","form-control","input-style-admin",3,"ngModel","ngModelChange"],["selected",""],[3,"value",4,"ngFor","ngForOf"],[1,"carousel",3,"config"],["slickModal","slick-carousel"],["ngxSlickItem","","class","slide","style","width: 150px; height: auto",4,"ngFor","ngForOf"],["class","row mt-4",4,"ngFor","ngForOf"],[1,"col-12","form-group"],["type","text","name","hashtag",1,"form-control","input-style-admin",3,"ngModel","ngModelChange"],["rows","5","name","description",1,"form-control","input-style-admin","h-auto",3,"ngModel","ngModelChange"],[1,"btn-btm-inr-tabs","text-center","mt-sm-5","mt-3"],["type","submit",1,"btn","btn-reset","mr-sm-4","mr-2",3,"disabled","click"],["type","button",1,"btn","btn-inr-top"],[1,"overlay","toggle-icon-main"],[3,"value"],["ngxSlickItem","",1,"slide",2,"width","150px","height","auto"],["width","100%","height","auto","autoplay","",3,"poster"],[3,"src"],["target","_blank",3,"href"]],template:function(t,e){1&t&&(o.Pb(0,"main",0),o.Pb(1,"div",1),o.Pb(2,"div",2),o.Pb(3,"div",3),o.Pb(4,"div",4),o.Pb(5,"h1"),o.wc(6,"Edit post"),o.Ob(),o.Ob(),o.Ob(),o.Pb(7,"div",3),o.Pb(8,"div",5),o.Pb(9,"form"),o.Pb(10,"div",6),o.Pb(11,"h4",7),o.Lb(12,"img",8),o.wc(13," User Overview "),o.Ob(),o.Lb(14,"img",9),o.Pb(15,"div",10),o.Pb(16,"div",11),o.Pb(17,"input",12),o.Wb("ngModelChange",function(t){return e.data.name=t}),o.Ob(),o.Ob(),o.Pb(18,"div",11),o.Lb(19,"input",13),o.Ob(),o.Ob(),o.Ob(),o.Pb(20,"div",6),o.Pb(21,"h4",7),o.Lb(22,"img",8),o.wc(23," Post Overview "),o.Ob(),o.Pb(24,"div",10),o.Pb(25,"div",11),o.Lb(26,"input",14),o.Ob(),o.Pb(27,"div",11),o.Pb(28,"input",15),o.Wb("ngModelChange",function(t){return e.data.likes=t}),o.Ob(),o.Ob(),o.Pb(29,"div",11),o.Pb(30,"div",16),o.Pb(31,"input",17),o.Wb("ngModelChange",function(t){return e.data.commentPost=t}),o.Ob(),o.Ob(),o.Ob(),o.Pb(32,"div",11),o.Pb(33,"input",18),o.Wb("ngModelChange",function(t){return e.data.share=t}),o.Ob(),o.Ob(),o.Pb(34,"div",11),o.Pb(35,"input",19),o.Wb("ngModelChange",function(t){return e.data.savePost=t}),o.Ob(),o.Ob(),o.Pb(36,"div",11),o.Pb(37,"input",20),o.Wb("ngModelChange",function(t){return e.data.reach=t}),o.Ob(),o.Ob(),o.Pb(38,"div",11),o.Pb(39,"input",21),o.Wb("ngModelChange",function(t){return e.data.impression=t}),o.Ob(),o.Ob(),o.Pb(40,"div",11),o.Pb(41,"select",22),o.Wb("ngModelChange",function(t){return e.data.region=t}),o.Pb(42,"option",23),o.wc(43),o.Ob(),o.vc(44,k,2,2,"option",24),o.Ob(),o.Ob(),o.Ob(),o.Pb(45,"div"),o.Pb(46,"ngx-slick-carousel",25,26),o.vc(48,C,3,2,"div",27),o.Ob(),o.Ob(),o.Ob(),o.Pb(49,"div",6),o.Pb(50,"h4",7),o.Lb(51,"img",8),o.wc(52," Item Overview "),o.Ob(),o.vc(53,L,10,6,"div",28),o.Ob(),o.Pb(54,"div",6),o.Pb(55,"h4",7),o.Lb(56,"img",8),o.wc(57," Hash Tags "),o.Ob(),o.Pb(58,"div",10),o.Pb(59,"div",29),o.Pb(60,"input",30),o.Wb("ngModelChange",function(t){return e.data.hashtag=t}),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Pb(61,"div",6),o.Pb(62,"h4",7),o.Lb(63,"img",8),o.wc(64," Description "),o.Ob(),o.Pb(65,"div",10),o.Pb(66,"div",29),o.Pb(67,"textarea",31),o.Wb("ngModelChange",function(t){return e.data.description=t}),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Pb(68,"div",32),o.Pb(69,"button",33),o.Wb("click",function(){return e.onSubmit()}),o.wc(70," Submit "),o.Ob(),o.Pb(71,"button",34),o.wc(72,"Cancel"),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Ob(),o.Lb(73,"div",35),o.Ob()),2&t&&(o.yb(14),o.hc("src",e.baseUrl+(null==e.data?null:e.data.profile_pic_img),o.qc),o.yb(3),o.gc("ngModel",e.data.name),o.yb(2),o.gc("value",null==e.data?null:e.data.username),o.yb(7),o.gc("value",null==e.data?null:e.data.id),o.yb(2),o.gc("ngModel",e.data.likes),o.yb(3),o.gc("ngModel",e.data.commentPost),o.yb(2),o.gc("ngModel",e.data.share),o.yb(2),o.gc("ngModel",e.data.savePost),o.yb(2),o.gc("ngModel",e.data.reach),o.yb(2),o.gc("ngModel",e.data.impression),o.yb(2),o.gc("ngModel",e.data.region),o.yb(2),o.xc(e.data.region),o.yb(1),o.gc("ngForOf",e.country),o.yb(2),o.gc("config",e.slideConfig),o.yb(2),o.gc("ngForOf",e.images),o.yb(5),o.gc("ngForOf",e.items),o.yb(7),o.gc("ngModel",e.data.hashtag),o.yb(7),o.gc("ngModel",e.data.description),o.yb(2),o.gc("disabled",e.submit))},directives:[x.s,x.i,x.j,x.b,x.h,x.k,x.m,x.p,x.l,x.r,n.k,O.a,O.c],styles:[""]}),t})()},{path:"view",component:y}];let I=(()=>{class t{}return t.\u0275mod=o.Ib({type:t}),t.\u0275inj=o.Hb({factory:function(e){return new(e||t)},imports:[[n.b,b.f.forChild(S),x.f,x.o,a.b,O.b]]}),t})()}}]);