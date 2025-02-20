console.log('Hello, world!')


const item = document.getElementById('item')
const buttonAdd = document.getElementById('button-add')
const listProducts = document.getElementById('listProducts')


buttonAdd.addEventListener('click', () => {
    console.log(item.value)
    
    if(item.value === ''){
        alert('Digite um produto')
    } else{
        addListItem(item.value)
    }
    

    item.value = '' 
})

function addListItem(produto){
    const divContent = `
            <div class="input-wrapper">
                <input type="checkbox" class="check">
                <label for="check">${produto}</label>
                <button class="trash">
                    <img src="assets/trash.svg" alt="Trash Icon">
                </button>
            </div>
        `;
        
       console.log(divContent)

       listProducts.innerHTML += divContent
}


