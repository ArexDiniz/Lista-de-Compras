const item = document.getElementById('item')
const buttonAdd = document.getElementById('button-add')
const container = document.querySelector('.container')
const listProducts = document.getElementById('listProducts')


window.addEventListener("load", carregarLista); // Carrega a lista salva no localStorage ao carregar a página


/**
 * Função que aguarda o clique no botão para adicionar um item à lista.
 * 
 * Ao ser clicado no botão de adicionar item (`buttonAdd`), a função:
 * - Captura o valor do campo de entrada (`item.value`).
 * - Verifica se o campo de entrada está vazio:
 *   - Se estiver vazio, exibe um alerta pedindo para o usuário digitar um produto.
 *   - Se não estiver vazio, chama a função `addListItem(item.value)` para adicionar o item à lista.
 * - Após a verificação e execução, limpa o campo de entrada.
 */
buttonAdd.addEventListener('click', () => {
     // Verifica se o campo de entrada está vazio
    if(item.value === ''){
        alert('Digite um produto') // Exibe alerta caso o campo esteja vazio
    } else{
        addListItem(item.value)// Chama a função addListItem passando o valor do campo de entrada como argumento
    } 

    item.value = '' 
})



/**
 * Função para adicionar um item à lista de produtos.
 * 
 * @param {string} produto - O nome do produto a ser adicionado à lista.
 * 
 * A função cria um novo item de lista no formato HTML com:
 * - Um checkbox para marcar o item como feito.
 * - Um label exibindo o nome do produto.
 * - Um botão de lixeira com um ícone para remover o item.
 * 
 * Após criar o item, ele é inserido no final da lista de produtos (`listProducts`) e a função `salvarLista()` é chamada para salvar o estado atual da lista.
 */
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
        // Insere o item HTML no final da lista de produtos
       listProducts.insertAdjacentHTML("beforeend", divContent);
       salvarLista();   // Salva a lista atualizada
}


/**
 * Função que lida com o clique em um item da lista de produtos.
 * 
 * Esta função é executada quando um item da lista (`listProducts`) é clicado:
 * - Se o elemento clicado for o botão de lixeira (`trash`):
 *   - Remove o item (div) que contém o botão de lixeira.
 *   - Chama a função `removeAlert()` para realizar ações adicionais após a remoção.
 * 
 * 
 */
listProducts.onclick = (event) => {
    if(event.target.className === 'trash'){
        event.target.parentElement.remove()
        removeAlert()

    } 
}


/**
 * Função que exibe um alerta indicando que um item foi removido da lista.
 * 
 * Esta função:
 * - Cria um alerta em formato HTML com uma mensagem de que o item foi removido da lista, um ícone de alerta, e um botão para fechar o alerta.
 * - Insere o alerta no final do contêiner (`container`).
 * - Define um evento de clique no botão de fechar para remover o alerta quando clicado.
 * - Após 2 segundos, o alerta é automaticamente removido.
 * - Chama a função `salvarLista()` para salvar o estado atual da lista.
 */
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

        salvarLista();


}

/**
 * Função para salvar a lista de itens no armazenamento local (localStorage).
 * 
 * A função captura todos os itens da lista, obtendo o texto de cada rótulo (`label`) dentro dos elementos `.input-wrapper`:
 * - Cria um array com os nomes dos itens da lista.
 * - Armazena esse array no `localStorage` sob a chave "lista", utilizando o formato JSON para armazenamento.
 */
function salvarLista() {
    const itens = Array.from(document.querySelectorAll(".input-wrapper label"))
        .map(label => label.textContent);
    localStorage.setItem("lista", JSON.stringify(itens));
}

/**
 * Função para carregar a lista de itens armazenada no localStorage.
 * 
 * A função realiza as seguintes etapas:
 * - Recupera a lista salva no `localStorage` usando a chave "lista".
 * - Se houver itens salvos, converte a string JSON de volta para um array.
 * - Para cada item na lista, chama a função `addListItem` para adicionar o item de volta à lista de produtos.
 * 
 * Caso não haja itens salvos, a função simplesmente não faz nada, já que o array padrão será vazio.
 */
function carregarLista() {
    const listaSalva = JSON.parse(localStorage.getItem("lista")) || [];
    listaSalva.forEach(produto => addListItem(produto));
}




