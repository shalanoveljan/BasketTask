function getProducts() {

    let items = JSON.parse(localStorage.getItem('products'))
    if(items.length > 0) {
        document.querySelector('.p236').classList.remove('d-none')
        document.querySelector('.alert').classList.add('d-none')
        let t_body = document.querySelector('table tbody')
        for(let item of items) {
            t_body.innerHTML += `
            <tr id=${item.Id}>
                <td style="width:10%">
                    <img src=${item.Image} alt="">
                </td>
                <td>${item.Title}</td>
                <td>${item.Price} ₼</td>
                <td>
                <input id="num" type="number" value=${item.Count} onclick="updateCount(event,${item.Id})" >
                </td>
                <td class="prodprice">${((item.Price) * (item.Count)).toFixed(2)} ₼</td>
                <td>
                    <button class="btn btn-danger">Sil</button>
                </td>
            </tr>
            `
        }
    }
    else{
        document.querySelector('.p236').classList.add('d-none')
        document.querySelector('.alert').classList.remove('d-none')
    }
    
   
}
getProducts()



var items = JSON.parse(localStorage.getItem('products'));


const updateCount =(e, id)=>{
  //  console.log(e.target.value);
    let value = e.target.value;

    let products = JSON.parse(localStorage.getItem('products'));
    
    products.map((i)=>{
        if(i.Id == id){
            i.Count = value;
        }
    })

    localStorage.setItem('products',JSON.stringify(products));
    


}


function GetReviews(){
    let pr_count=document.querySelector('.pr_count');
    let total_price=document.querySelector('.total_price');
    let items = JSON.parse(localStorage.getItem('products'));
    let sum=0
    for(let item of items) {
        console.log(sum);
        sum += (item.Count) * (item.Price)
    }

    total_price.innerHTML=`${sum} ₼`; 

    pr_count.innerHTML=items.length;
    return sum;
}

GetReviews();

let deleteBtns = document.querySelectorAll('table button')

for(let btn of deleteBtns) {
    btn.onclick = function() {
        let id = this.parentElement.parentElement.id;
        let items = JSON.parse(localStorage.getItem('products'))
        
        let filtered = items.filter(x => x.Id !== id)
        localStorage.setItem('products', JSON.stringify(filtered))
        location.reload()
    }
}
let prewCount;
let itemCount=1;
let sum=GetReviews();
function updatePrice(item, quantity) {
   // debugger
    let onnan = item.Price * quantity;
    var index= items.indexOf(item);

    let prodprice = document.querySelectorAll('.prodprice')[index];
    let total_price = document.querySelector('.total_price');
    prodprice.innerHTML = `${onnan} ₼`;

    console.log(itemCount);
    console.log(quantity);

    if(itemCount<=quantity)
    {sum += +item.Price; 
    }
    else {
        sum-=+item.Price
        itemCount=quantity
    }
    
    console.log(sum);
    total_price.innerHTML = `${sum} ₼`;

}

for (let item of items) {
    itemCount=1;
    var index= items.indexOf(item);
    let num = document.querySelectorAll('#num')[index];
    num.onchange = function (e) {

        itemCount++;
        updatePrice(item, e.target.value);
        // itemCount=this.value;
         //console.log(itemCount);
    };
}



