import React from 'react'
import './Grid.css'

const gridSize = 10;

const Grid = ({ room, x, y, direction }) => {
    let grid = []
    for (let i = 0; i < (gridSize * gridSize); i++) {
        let cellX = i % gridSize
        let cellY = parseInt(i / gridSize)
        let arrow = ""
        if (x === cellX && y === cellY) {
            arrow = getArrowEntity(direction);
        }
        grid.push(
            <div key={i} className={`cell cell-${cellX}-${cellY} ${room.isWall(cellX,cellY) ? 'wall' : ''}`}>
                {arrow}
            </div>
        )
    }

    return (
        <div className="container">
        {grid}
        </div>
    )
}

function getArrowEntity(direction) {
    let arrowDirection;

    switch (direction) {
        case 'UP':
            arrowDirection = <>&#9650;</>
            break;
        case 'DOWN':
            arrowDirection = <>&#9660;</>
            break;
        case 'LEFT':
            arrowDirection = <>&#9664;</>
            break;
        case 'RIGHT':
            arrowDirection = <>&#9654;</>
            break;
        default:
            arrowDirection = <>&#9650;</>
    }

    return arrowDirection;
}
export default Grid
//https://www.w3schools.com/charsets/ref_utf_geometric.asp
//▲	9650
//▶	9654
//▼	9660
//◀	9664