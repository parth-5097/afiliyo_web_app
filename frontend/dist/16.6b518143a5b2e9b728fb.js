(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{uvb3:function(t,e,i){"use strict";i.r(e),i.d(e,"RequestModule",function(){return h});var n=i("ofXK"),a=i("njyG"),r=i("XNiG"),s=i("fXoL"),b=i("Ja+W"),o=i("Dfg1"),c=i("5eHb");function d(t,e){if(1&t){const t=s.Qb();s.Pb(0,"tr"),s.Pb(1,"td"),s.Pb(2,"a",14),s.Wb("click",function(){s.oc(t);const i=e.$implicit;return s.ac(2).onDelete(i.id)}),s.Lb(3,"img",15),s.Ob(),s.Ob(),s.Pb(4,"td"),s.wc(5),s.Ob(),s.Pb(6,"td"),s.wc(7),s.Ob(),s.Pb(8,"td"),s.wc(9),s.Ob(),s.Pb(10,"td"),s.Pb(11,"span"),s.wc(12),s.Ob(),s.Ob(),s.Pb(13,"td"),s.Pb(14,"pre"),s.wc(15),s.Ob(),s.Ob(),s.Pb(16,"td"),s.wc(17),s.Ob(),s.Ob()}if(2&t){const t=e.$implicit;s.yb(5),s.xc(t.id),s.yb(2),s.xc(t.username),s.yb(2),s.xc(t.role),s.yb(2),s.Bb("status-",t.status," status-label"),s.yb(1),s.xc(t.status),s.yb(3),s.xc(t.form),s.yb(2),s.xc(t.timestamp)}}function l(t,e){if(1&t&&(s.Pb(0,"tbody"),s.vc(1,d,18,9,"tr",13),s.Ob()),2&t){const t=s.ac();s.yb(1),s.gc("ngForOf",t.data)}}let g=(()=>{class t{constructor(t,e,i){this.usernameService=t,this.exportService=e,this.toastr=i,this.dtOptions={},this.dtTrigger=new r.a,this.data=[]}ngOnInit(){this.dtOptions={pagingType:"simple_numbers",pageLength:10,paging:!0,destroy:!0,scrollX:!0,scrollY:"50vh",language:{paginate:{next:'<i class="fa fa-angle-double-right"></i>',previous:'<i class="fa fa-angle-double-left"></i>',first:'<i class="fa fa-angle-double-right"></i>',last:'<i class="fa fa-angle-double-left"></i>'}}},this.getDbData().then(t=>{this.dtTrigger.next()})}getDbData(){return new Promise((t,e)=>{this.data=[],this.usernameService.get("role").subscribe(e=>{this.data=e.data,console.log(e.data),t(e)})})}ReloadDatatable(){this.datatableElement.dtInstance.then(t=>{this.getDbData().then(t=>{this.dtTrigger.next()})})}rerender(){this.datatableElement.dtInstance.then(t=>{this.dtTrigger.next()})}onExport(){this.exportService.exportToCsv(this.data,`${Date()}`),this.toastr.info("Exported")}onDelete(t){this.usernameService.delete(`role/${t}`).subscribe(t=>{this.toastr.success(t.message),this.getDbData().then(t=>{this.dtTrigger.next()})})}ngOnDestroy(){this.dtTrigger.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(s.Kb(b.a),s.Kb(o.a),s.Kb(c.b))},t.\u0275cmp=s.Eb({type:t,selectors:[["app-request"]],viewQuery:function(t,e){if(1&t&&s.zc(a.a,1),2&t){let t;s.mc(t=s.Xb())&&(e.datatableElement=t.first)}},decls:33,vars:3,consts:[[1,"content-wrapper-section"],[1,"container-fluid"],[1,"row"],[1,"col-12"],[1,"inr-title-comn","d-flex","align-items-center"],[1,"inr-title-btn","ml-auto"],["type","button",1,"btn","btn","btn-reset"],[1,"dash-box-white"],[1,"tab-content"],["id","pills-All","role","tabpanel","aria-labelledby","pills-All-tab",1,"tab-pane","fade","active","show"],["datatable","","id","Orders-list",1,"display",3,"dtOptions","dtTrigger"],[4,"ngIf"],[1,"overlay","toggle-icon-main"],[4,"ngFor","ngForOf"],["href","javascript:void(0)",3,"click"],["src","assets/images/delete-icon.svg","alt","",1,"mx-2","table-img-inr"]],template:function(t,e){1&t&&(s.Pb(0,"main",0),s.Pb(1,"div",1),s.Pb(2,"div",2),s.Pb(3,"div",3),s.Pb(4,"div",4),s.Pb(5,"h1"),s.wc(6,"Orders"),s.Ob(),s.Pb(7,"div",5),s.Pb(8,"button",6),s.wc(9,"Export"),s.Ob(),s.Ob(),s.Ob(),s.Ob(),s.Pb(10,"div",3),s.Pb(11,"div",7),s.Pb(12,"div",8),s.Pb(13,"div",9),s.Pb(14,"table",10),s.Pb(15,"thead"),s.Pb(16,"tr"),s.Pb(17,"th"),s.wc(18,"Action"),s.Ob(),s.Pb(19,"th"),s.wc(20,"Id"),s.Ob(),s.Pb(21,"th"),s.wc(22,"User Name"),s.Ob(),s.Pb(23,"th"),s.wc(24,"Role"),s.Ob(),s.Pb(25,"th"),s.wc(26,"Status"),s.Ob(),s.Pb(27,"th"),s.wc(28,"Form"),s.Ob(),s.Pb(29,"th"),s.wc(30,"Timestamp"),s.Ob(),s.Ob(),s.Ob(),s.vc(31,l,2,1,"tbody",11),s.Ob(),s.Ob(),s.Ob(),s.Ob(),s.Ob(),s.Ob(),s.Ob(),s.Lb(32,"div",12),s.Ob()),2&t&&(s.yb(14),s.gc("dtOptions",e.dtOptions)("dtTrigger",e.dtTrigger),s.yb(17),s.gc("ngIf",0!=(null==e.data?null:e.data.length)))},directives:[a.a,n.l,n.k],styles:['.filter-div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:55px;cursor:pointer}.filter-div-dropdown[_ngcontent-%COMP%]{position:absolute;right:0;top:100%;padding:10px 15px;width:200px;background:var(--color-white);box-shadow:0 0 4px rgba(0,0,0,.2);transition:all .15s linear;border-radius:9px;z-index:1;display:none;margin-top:20px}.filter-div-dropdown[_ngcontent-%COMP%]:before{content:"";background:url(/assets/images/droupdown-arrow.png);width:0;height:0;border-color:transparent transparent #a4a4a4;border-style:solid;border-width:0 12px 12px;position:absolute;top:-11px;right:20px}.status-success[_ngcontent-%COMP%]{background:#19bc3c}.status-pending[_ngcontent-%COMP%]{background:#fbc94a}.status-fail[_ngcontent-%COMP%]{background:#e52836}.status-label[_ngcontent-%COMP%]{border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;color:var(--color-white);padding:10px 25px;text-align:center;width:150px;font-weight:400;display:inline-block;text-transform:capitalize}']}),t})();var p=i("tyNb");const u=[{path:"",component:g}];let h=(()=>{class t{}return t.\u0275mod=s.Ib({type:t}),t.\u0275inj=s.Hb({factory:function(e){return new(e||t)},imports:[[n.b,p.f.forChild(u),a.b]]}),t})()}}]);