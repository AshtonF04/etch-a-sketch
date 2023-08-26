function generateGrid(grid_size){
    const grid_container = document.querySelector(".grid-container")

    for (let i = 0; i < (grid_size * grid_size); i++){
        const grid_tile = document.createElement("div")
        grid_tile.setAttribute('class', 'grid-element')
        grid_container.appendChild(grid_tile)
    }
}

function initializeGridTiles(){
    const grid_tiles = Array.from(document.getElementsByClassName('grid-element'))
    grid_tiles.forEach((grid_tile) => {
        grid_tile.addEventListener('mouseenter', (event) => {
            if (event.buttons == 1) {
                grid_tile = event.target
                grid_tile.style.backgroundColor = 'black'
            }
        })

        grid_tile.addEventListener('click', (event) => {
            grid_tile = event.target
            grid_tile.style.backgroundColor = 'black'
        })
    })
}

generateGrid(16)
initializeGridTiles()