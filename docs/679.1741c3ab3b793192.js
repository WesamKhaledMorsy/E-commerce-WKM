"use strict";(self.webpackChunkSecondAssignment_On_Ecommerce=self.webpackChunkSecondAssignment_On_Ecommerce||[]).push([[679],{5679:(h,l,o)=>{o.r(l),o.d(l,{AllOrdersComponent:()=>_});var i=o(6814),e=o(4769),c=o(1120),a=o(6320),u=o(1481);function p(t,d){if(1&t&&(e.TgZ(0,"div",9)(1,"div",10),e._UZ(2,"img",11),e.qZA(),e.TgZ(3,"div",12)(4,"div")(5,"h3",5),e._uU(6),e.qZA(),e.TgZ(7,"p"),e._uU(8),e.qZA(),e.TgZ(9,"p",13),e._uU(10),e.ALo(11,"currency"),e.qZA()()()()),2&t){const r=d.$implicit;e.xp6(2),e.Q6J("src",r.product.imageCover,e.LSH),e.xp6(4),e.Oqu(r.product.title),e.xp6(2),e.hij("Count :",r.count,""),e.xp6(2),e.hij("Price: ",e.xi3(11,4,r.price,"EGP")," ")}}function g(t,d){if(1&t&&(e.TgZ(0,"div",4)(1,"h3",5),e._uU(2),e.qZA(),e.YNc(3,p,12,7,"div",6),e.TgZ(4,"div",1)(5,"div",7)(6,"div",8)(7,"p"),e._uU(8,"IsDelivered: "),e.TgZ(9,"span"),e._uU(10),e.qZA()(),e.TgZ(11,"p"),e._uU(12,"IsPaid: "),e.TgZ(13,"span"),e._uU(14),e.qZA()(),e.TgZ(15,"p"),e._uU(16,"Payment Method Type: "),e.TgZ(17,"span"),e._uU(18),e.qZA()(),e.TgZ(19,"p"),e._uU(20,"Total order price : "),e.TgZ(21,"span"),e._uU(22),e.qZA()()()()()()),2&t){const r=d.$implicit,s=d.index;e.xp6(2),e.hij("Order :",s+1,""),e.xp6(1),e.Q6J("ngForOf",r.cartItems),e.xp6(6),e.Gre("","false"===r.isDelivered?"bg-danger":"bg-success"," p-1 text-light rounded rounded-3"),e.xp6(1),e.Oqu("false"===r.isDelivered?"No":"Yes"),e.xp6(3),e.Gre("","false"===r.isPaid?"bg-danger":"bg-success"," p-1 text-light rounded rounded-3"),e.xp6(1),e.Oqu("false"===r.isPaid?"No":"Yes"),e.xp6(4),e.Oqu(r.paymentMethodType),e.xp6(4),e.hij(" ",r.totalOrderPrice," EGP")}}let _=(()=>{class t{constructor(r,s,n){this._ActivatedRoute=r,this._CartS=s,this._AuthService=n,this.userId="",this.orders=[],this.gitBaseUrl="https://wesamkhaledmorsy.github.io/E-commerce-WKM/",this.localBaseUrl="http://localhost:4200"}ngOnInit(){this._AuthService.user_data.subscribe(r=>{this.userId=r.id}),this.allUserOrders()}ngAfterViewInit(){this.redirectPageUrl("allorders")}redirectPageUrl(r){window.location.origin!==this.localBaseUrl&&(window.location.href=this.gitBaseUrl+`${r}`)}allUserOrders(){this._CartS.AllUserOrders(this.userId).subscribe({next:r=>{this.orders=r},error:r=>{console.log(r)}})}static#e=this.\u0275fac=function(s){return new(s||t)(e.Y36(c.gz),e.Y36(a.N),e.Y36(u.e))};static#r=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-all-orders"]],standalone:!0,features:[e.jDz],decls:6,vars:1,consts:[[1,"container","p-5","bg-light","shadow","rounded","rounded-3"],[1,"row"],[1,"col-md-12","text-center"],["class","col-md-12 p-2  border border-1 rounded rounded-3",4,"ngFor","ngForOf"],[1,"col-md-12","p-2","border","border-1","rounded","rounded-3"],[1,"h6"],["class","row py-3 px-5",4,"ngFor","ngForOf"],[1,"col-md-12","d-flex","justify-content-center","align-items-center"],[1,"border","border-1","rounded","rounded-3","p-1","mb-2","w-25","text-center"],[1,"row","py-3","px-5"],[1,"col-md-1"],["alt","product",1,"w-100",3,"src"],[1,"col-md","d-flex","justify-content-between","border-bottom"],[1,"category"]],template:function(s,n){1&s&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1"),e._uU(4,"All Orders"),e.qZA()(),e.YNc(5,g,23,12,"div",3),e.qZA()()),2&s&&(e.xp6(5),e.Q6J("ngForOf",n.orders))},dependencies:[i.ez,i.sg,i.H9]})}return t})()}}]);