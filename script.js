const products=[
 {id:1,name:"Premium Panjabi",price:799,old:999,img:""},
 {id:2,name:"Premium T-Shirt",price:599,old:699,img:""},
 {id:3,name:"Premium Shirt",price:999,old:1299,img:""},
 {id:4,name:"Premium Polo T-Shirt",price:699,old:899,img:""}
];
let cart=JSON.parse(localStorage.getItem("nexvoraCart")||"[]");

function renderProducts(){
 const q=document.getElementById("search").value.toLowerCase();
 const list=products.filter(p=>p.name.toLowerCase().includes(q));
 document.getElementById("productGrid").innerHTML=list.map(p=>`
 <div class="card">
   <div class="sale">SALE</div>
   <div class="pic">${p.img?`<img src="${p.img}">`:"NeXvora Product"}</div>
   <div class="info"><h3>${p.name}</h3>
   <div><span class="old">৳${p.old}</span><span class="price">৳${p.price}</span></div>
   <button class="add" onclick="addToCart(${p.id})">ADD TO CART</button></div>
 </div>`).join("");
}
function addToCart(id){cart.push(id);save();alert("Product added to cart!");}
function save(){localStorage.setItem("nexvoraCart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length;}
function openCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length) box.innerHTML="<p>Your cart is empty.</p>";
 else box.innerHTML=cart.map((id,i)=>{let p=products.find(x=>x.id===id);return `<div class="cart-row"><span>${p.name}</span><b>৳${p.price}</b><button class="remove" onclick="removeItem(${i})">×</button></div>`}).join("");
 document.getElementById("cartTotal").textContent=cart.reduce((s,id)=>s+products.find(p=>p.id===id).price,0);
 document.getElementById("cartModal").style.display="flex";
}
function closeCart(){document.getElementById("cartModal").style.display="none"}
function removeItem(i){cart.splice(i,1);save();openCart();}
function checkout(){
 if(!cart.length){alert("Cart is empty");return}
 const total=cart.reduce((s,id)=>s+products.find(p=>p.id===id).price,0);
 const names=cart.map(id=>products.find(p=>p.id===id).name).join(", ");
 const phone="8801XXXXXXXXX"; // এখানে তোমার WhatsApp নম্বর বসাও
 const msg=`Assalamu Alaikum, NeXvora থেকে order করতে চাই.%0AProducts: ${names}%0ATotal: ৳${total}%0AName:%0AAddress:%0APhone:`;
 window.open(`https://wa.me/${phone}?text=${msg}`,"_blank");
}
renderProducts();save();
