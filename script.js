let current_mode = 'color'
let selected_color = 'black'
let current_color = selected_color

const rainbow_mode_button = document.querySelector('.rainbow-mode button')
const color_mode_button = document.querySelector('.color-mode button')

function colorTile(grid_tile, color){
    grid_tile.style.backgroundColor = color
}

function generateGrid(grid_size){
    const grid_container = document.querySelector(".grid-container")

    for (let i = 0; i < (grid_size * grid_size); i++){
        const grid_tile = document.createElement("div")
        grid_tile.setAttribute('class', 'grid-element')
        grid_container.appendChild(grid_tile)
    }
}

function setRandomColor(){
    rand_color = Math.floor(Math.random()*16777215).toString(16);
    current_color = `#${rand_color}`
}

function tileHover(event){
    grid_tile = event.target
    
    if (event.buttons == 1) {
        if (current_mode == 'rainbow') setRandomColor()
        colorTile(grid_tile, current_color)
    }
}

function tileClick(event){
    grid_tile = event.target
    if (current_mode == 'rainbow') setRandomColor()
    colorTile(grid_tile, current_color)
}

function initializeGridTiles(){
    const grid_tiles = Array.from(document.getElementsByClassName('grid-element'))
    grid_tiles.forEach((grid_tile) => {
        grid_tile.addEventListener('mouseenter', (event) => {
            tileHover(event)
        })

        grid_tile.addEventListener('click', (event) => {
            tileClick(event)
        })
    })
}

function changeMode(new_mode){
    if (new_mode != 'color' && new_mode != 'rainbow') return
    if (current_mode == new_mode) return
    current_mode = new_mode
    
    if (current_mode == 'color') {
        color_mode_button.style.backgroundColor = 'black'
        rainbow_mode_button.style.backgroundColor = 'white'

        current_color = selected_color
    } else {
        color_mode_button.style.backgroundColor = 'white'
        rainbow_mode_button.style.backgroundColor = 'black'
    }
}

generateGrid(16)
initializeGridTiles()

rainbow_mode_button.addEventListener('click', (event) => {
    changeMode(event.target.className)
})

color_mode_button.addEventListener('click', (event) => {
    changeMode(event.target.className)
})