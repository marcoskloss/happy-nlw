
// create map
const map = L.map('mapid').setView([-27.2221886, -49.6499916], 15)

// create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

//create icon

const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68]
})

// create and add marker
let marker

map.on('click', (event) => {

    const lat = event.latlng.lat
    const lng = event.latlng.lng

    document.querySelector('[name=lat]').value = lat
    document.querySelector('[name=lng]').value = lng

    console.log(lat);

    // remove icon
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], { icon }).addTo(map)
})

// add photo field
function addPhotoField() {
    //container foto #images
    const container = document.querySelector('#images')

    //pegar o container para duplicar .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')

    //realizar o clona a ultima imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1]
    .cloneNode(true)

    //verificar se o campo esta vazio, se sim não adicionar ao container de imagens
    const input = newFieldContainer.children[0]
    
    if(input.value == ""){
        return
    }

    //limpar o campo antes de adicionar ao container de imagens
    input.value = ""

    //adicionar o clone ao container de imagens #image
    container.appendChild(newFieldContainer)
}

function deleteField(event) {
    const span = event.currentTarget
    
    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length <= 1){
        //limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    // deletar o campo
    span.parentNode.remove();
}

// selecionar sim ou nao

function toggleSelect(event) {
    //retirar a class .active (dos botoes)
    document.querySelectorAll('.button-select button')
    .forEach(button => button.classList.remove('active'))

    //colocar a class .active no botao clicado
    const button = event.currentTarget
    button.classList.add('active')

    //atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    
    input.value = button.dataset.value
}

function validate(event) {
    map.on('click', (event) => {

        const lat = event.latlng.lat
        const lng = event.latlng.lng

        //validar se lat e lng estao preenchidos
        if(lat && lng == ''){
            validate = true
        } else {
            validate = false
        }
        
        if(validate){
        event.preventDefault()
        alert('Selecione um ponto no mapa')
    }
    })   
}

    