console.log('Hello, world!')


const item = document.getElementById('item')
const buttonAdd = document.getElementById('button-add')
const container = document.querySelector('.container')

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

listProducts.onclick = (event) => {
    if(event.target.className === 'trash'){
        event.target.parentElement.remove()
        removeAlert()

    } 
}

function removeAlert(){
    const divContent = `
       <div class="remove-alert">
            <img src="assets/alert.svg" alt="">
            <span>O item foi removido da lista</span>
            <button class="close-alert"><img src="assets/delete.svg" alt=""></button>
        </div>`


        container.insertAdjacentHTML("beforeend", divContent);
        
        const closeAlert = document.querySelector('.close-alert')
        closeAlert.onclick = () => {
            document.querySelector('.remove-alert').remove()
        }
        setTimeout(() => {
            document.querySelector('.remove-alert').remove()
        }, 2000)


}




