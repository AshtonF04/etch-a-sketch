let current_mode = 'color'
let selected_color = 'black'
let current_color = selected_color

const grid_container = document.querySelector(".grid-container")

const rainbow_mode_button = document.querySelector('.rainbow-mode button')
const color_mode_button = document.querySelector('.color-mode button')
const eraser_mode_button = document.querySelector('.eraser-mode button')
const clear_button = document.querySelector('.clear-grid')
const undo_button = document.querySelector('.undo-action')

const size_slider = document.querySelector('.size-slider')
const slider_text = document.querySelector('.slider-div h4')

const color_selector = document.querySelector('.color-selector')

function colorTile(grid_tile, color){
    grid_tile.style.backgroundColor = color
}

function generateGrid(grid_size){
    for (let i = 0; i < (grid_size * grid_size); i++){
        const grid_tile = document.createElement("div")
        grid_tile.setAttribute('class', 'grid-element')
        grid_container.appendChild(grid_tile)
    }

    grid_container.style.gridTemplateColumns = `repeat(${grid_size}, 1fr)`
    initializeGridTiles()
}

function setRandomColor(){
    rand_color = Math.floor(Math.random()*16777215).toString(16);
    current_color = `#${rand_color}`
}

function changeSelectedColor(new_color){
    selected_color = new_color
    if (current_mode == 'color') current_color = selected_color
}

function tileHover(event){
    grid_tile = event.target
    
    if (event.buttons == 1) {
        if (current_mode == 'rainbow') setRandomColor()
        if (current_mode == 'eraser') current_color = 'white'
        colorTile(grid_tile, current_color)
    }
}

function tileClick(event){
    grid_tile = event.target
    if (current_mode == 'rainbow') setRandomColor()
    if (current_mode == 'eraser') current_color = 'white'
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
    if (new_mode != 'color' && new_mode != 'rainbow' && new_mode != 'eraser') return
    if (current_mode == new_mode) return
    current_mode = new_mode
    
    if (current_mode == 'color') {
        color_mode_button.style.backgroundColor = 'black'
        rainbow_mode_button.style.backgroundColor = 'white'
        eraser_mode_button.style.backgroundColor = 'white'

        current_color = selected_color
    } else if (current_mode == 'rainbow') {
        color_mode_button.style.backgroundColor = 'white'
        rainbow_mode_button.style.backgroundColor = 'black'
        eraser_mode_button.style.backgroundColor = 'white'
    } else {
        color_mode_button.style.backgroundColor = 'white'
        rainbow_mode_button.style.backgroundColor = 'white'
        eraser_mode_button.style.backgroundColor = 'black'
    }
}

function clearGrid(){
    const grid_tiles = Array.from(grid_container.children)
    grid_tiles.forEach((grid_tile) => {
        grid_tile.style.backgroundColor = 'white'
    })
}

function removeGrid(){
    const grid_tiles = Array.from(grid_container.children)
    grid_tiles.forEach((grid_tile) => {
        grid_tile.remove()
    })
}

generateGrid(16)

rainbow_mode_button.addEventListener('click', (event) => {
    changeMode(event.target.className)
})

color_mode_button.addEventListener('click', (event) => {
    changeMode(event.target.className)
})

eraser_mode_button.addEventListener('click', (event) => {
    changeMode(event.target.className)
})

clear_button.addEventListener('click', () => clearGrid())

size_slider.addEventListener('change', () => {
    removeGrid()
    generateGrid(parseInt(size_slider.value))
})

size_slider.addEventListener('input', () => {
    slider_text.innerHTML = `${size_slider.value} x ${size_slider.value}`
})

color_selector.addEventListener('input', () => {
    changeSelectedColor(color_selector.value)
})