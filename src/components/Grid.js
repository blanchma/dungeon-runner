import React, { useCallback, useEffect } from 'react'
import './Grid.css'

const gridSize = 11;

const Grid = (props) => {
    let grid = []
    const { x, y, room, mobs, direction, treasure } = props;

    for (let i = 0; i < (gridSize * gridSize); i++) {
        let cellX = i % gridSize
        let cellY = parseInt(i / gridSize)
        let arrow = ""
        if (x === cellX && y === cellY) {
            //arrow = getArrowEntity(direction);
            arrow = getCharacter();
        }
        const roomCellClass = getCellClass({room, x: cellX, y: cellY, mobs, treasure})

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

function getCellClass({ room, x, y, mobs, treasure }) {
    let aMob = mobs.find(mob => mob.x === x && mob.y === y);
    console.log('aMob', aMob)

    if (room.isWall(x, y)) {
        return 'wall'
    } else if (aMob) {
        const reversed = (aMob.axis === 'x' && aMob.direction === 1) ||
        (aMob.axis === 'y' && aMob.direction === -1)

        return `mob ${reversed && 'reversed'}`
    } else if (treasure && treasure.x === x && treasure.y ===y) {
        return 'coin'
    } else {
        return ''
    }
}

function getCharacter() {
    return <img className="adventurer" src="/adventurer.png"></img>
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