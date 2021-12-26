import React, { useEffect } from 'react'
import './Grid.css'

const gridSize = 11;

const Grid = ({ room, x, y, direction }) => {
    let grid = []

    for (let i = 0; i < (gridSize * gridSize); i++) {
        let cellX = i % gridSize
        let cellY = parseInt(i / gridSize)
        //console.log('x', cellX, 'y', cellY)
        let arrow = ""
        if (x === cellX && y === cellY) {
            arrow = getArrowEntity(direction);
        }
        const roomCellClass = getCellClass(room, cellX, cellY)

        grid.push(
            <div key={i} className={`cell cell-${cellX}-${cellY} ${roomCellClass}`}>
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

function getCellClass(room, x, y) {
    if (room.isWall(x, y)) {
        return 'wall'
    } else if (room.isMob(x, y)) {
        return 'mob'
    } else {
        return ''
    }
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