let cards = document.querySelectorAll('.card')
let count = 0;
for(let card of cards) {
    card.setAttribute('id',++count)
}

if(localStorage.getItem('products') === null) {
    localStorage.setItem('products',JSON.stringify([]))
}


let buttons = document.querySelectorAll('.card-body a');
for(let btn of buttons) {
    btn.onclick = function(e) {
        e.preventDefault();
        let items = JSON.parse(localStorage.getItem('products'))

        let id = this.parentElement.parentElement.id;
        let title = this.parentElement.children[0].innerHTML;
        let price = this.previousElementSibling.children[0].innerHTML
        let image = this.parentElement.previousElementSibling.src
        
        let existProd = items.find(x => x.Id === id)
        if(existProd === undefined) {
            items.push({
                Id: id,
                Title: title,
                Price: price,
                Image: image,
                Count: 1
            })
        }
        else{
            existProd.Count += 1
        }
        
       
        document.querySelector('.alertbox').style.right = '5%';
        localStorage.setItem('products',JSON.stringify(items))
        getCount()
        
        setTimeout(() => {
        document.querySelector('.alertbox').style.right = '-35%';
        }, 1500);
    }
}


function getCount() {
    let items = JSON.parse(localStorage.getItem('products'))

    document.getElementById('count').innerHTML = items.length
}
getCount()