import React, { Children, createElement, useCallback, useEffect } from 'react'
import './Grid.css'

const gridSize = 11;

const Grid = (props) => {
    let grid = []
    const { room, player } = props;
    const { mobs, treasure, key } = room;

    for (let i = 0; i < (gridSize * gridSize); i++) {
        let cellX = i % gridSize
        let cellY = parseInt(i / gridSize)
        const cellContent = getCellContent({x: cellX, y: cellY, room, player, mobs, treasure, key})
        const cellClass = getCellClass({x: cellX, y: cellY, room})

        grid.push(
            <div key={i} className={`cell cell-${cellX}-${cellY} ${cellClass}`}>
                {Children.toArray(cellContent)}
            </div>
        )
    }

    return (
        <div className="container">
            {grid}
        </div>
    )
}

function getCellContent({ x, y, player, mobs, treasure, key }) {
    const content = []
    if (player.x === x && player.y === y) {
        const reversed = player.direction === 'UP' || player.direction === 'LEFT';
        const playerState = player.dead ? 'dead' : player.running ? 'idle': 'idle';

        content.push(createElement("div", { className: `adventurer ${reversed ? 'reversed' : ''} ${playerState}` }))
    }

    let aMob = mobs.find(mob => mob.x === x && mob.y === y);
    if (aMob) {
        const reversed = (aMob.axis === 'x' && aMob.direction === 1) ||
            (aMob.axis === 'y' && aMob.direction === -1)
        content.push( createElement("div", { className: `mob ${reversed ? 'reversed' : ''}` }) )
    }

    if (treasure && treasure.x === x && treasure.y === y) {
        content.push( createElement("div", { className: `coin coin-${treasure.number}` }) )
    }

    if (key && key.x === x && key.y === y) {
        content.push( createElement("div", { className: 'key' }) )
    }

    return content;
}

function getCellClass({ room, x, y }) {
    if (room.isTopCorner(x, y) && room.isLeftWall(x, y)) {
        return 'wall h-wall top-wall left-wall'
    } else if (room.isTopCorner(x, y) && room.isRightWall(x, y)) {
        return 'wall h-wall top-wall right-wall'
    } else if (room.isHorizontalWall(x, y)) {
        return 'wall h-wall'
    } else if (room.isLeftWall(x, y)) {
        return 'wall v-wall left-wall'
    } else if (room.isRightWall(x, y)) {
        return 'wall v-wall right-wall'
    } else if (room.door.x === x && room.door.y === y && room.key) {
        return 'door'
    } else {
        return 'floor'
    }
}

export default Grid
//https://www.w3schools.com/charsets/ref_utf_geometric.asp
//▲	9650
//▶	9654
//▼	9660
//◀	9664