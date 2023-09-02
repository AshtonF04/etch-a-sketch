let current_mode = 'pen'
let selected_color = 'black'
let current_color = selected_color

const grid_container = document.querySelector(".grid-container")

const rainbow_mode_button = document.querySelector('.rainbow-mode button')
const pen_mode_button = document.querySelector('.pen-mode button')
const eraser_mode_button = document.querySelector('.eraser-mode button')
const fill_mode_button = document.querySelector('.fill-mode button')
const clear_button = document.querySelector('.clear-grid')
const undo_button = document.querySelector('.undo-action')

const size_slider = document.querySelector('.size-slider')
const slider_text = document.querySelector('.slider-div h4')

const color_selector = document.querySelector('.color-selector')

function colorTile(grid_tile, color){
    grid_tile.style.backgroundColor = color
    grid_tile.style.border = "none"
}

function eraseTile(grid_tile){
    grid_tile.style.backgroundColor = 'white'
    grid_tile.style.border = ".25px solid #EEEEEE"
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
    if (current_mode == 'pen' || current_mode == 'fill') current_color = selected_color
}

function tileHover(event){
    grid_tile = event.target
    
    if (event.buttons == 1) {
        if (current_mode == 'pen'){
            colorTile(grid_tile, current_color)
        }
        if (current_mode == 'fill') {
            current_color = selected_color
            const grid_tiles = Array.from(document.getElementsByClassName('grid-element'))
            grid_tiles.forEach((grid_tile) => {
                colorTile(grid_tile, current_color)
            })
        }
        if (current_mode == 'rainbow'){
            setRandomColor()
            colorTile(grid_tile, current_color)
        }
        if (current_mode == 'eraser') {
            eraseTile(grid_tile)
            return
        }
    }
}

function tileClick(event){
    grid_tile = event.target
    if (current_mode == 'pen'){
        colorTile(grid_tile, current_color)
    }
    if (current_mode == 'fill') {
        const grid_tiles = Array.from(document.getElementsByClassName('grid-element'))
        grid_tiles.forEach((grid_tile) => {
            colorTile(grid_tile, current_color)
        })
    }
    if (current_mode == 'rainbow'){
        setRandomColor()
        colorTile(grid_tile, current_color)
    }
    if (current_mode == 'eraser') {
        eraseTile(grid_tile)
        return
    }
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

        grid_tile.addEventListener('dragstart', (event) => {
            event.preventDefault()
        })
    })
}

function changeMode(new_mode){
    if (new_mode != 'pen' && new_mode != 'rainbow' && new_mode != 'eraser' && new_mode != 'fill') return
    if (current_mode == new_mode) return
    current_mode = new_mode
    
    pen_mode_button.style.backgroundColor = 'white'
    rainbow_mode_button.style.backgroundColor = 'white'
    eraser_mode_button.style.backgroundColor = 'white'
    fill_mode_button.style.backgroundColor = 'white'

    if (current_mode == 'pen') {
        pen_mode_button.style.backgroundColor = 'black'
        current_color = selected_color
    } else if (current_mode == 'rainbow') {
        rainbow_mode_button.style.backgroundColor = 'black'
    } else if (current_mode == 'eraser'){
        eraser_mode_button.style.backgroundColor = 'black'
    } else if (current_mode == 'fill'){
        fill_mode_button.style.backgroundColor = 'black'
        current_color = selected_color
    }
}

function clearGrid(){
    const grid_tiles = Array.from(grid_container.children)
    grid_tiles.forEach((grid_tile) => {
        eraseTile(grid_tile)
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

pen_mode_button.addEventListener('click', (event) => {
    changeMode(event.target.className)
})

eraser_mode_button.addEventListener('click', (event) => {
    changeMode(event.target.className)
})

fill_mode_button.addEventListener('click', (event) => {
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