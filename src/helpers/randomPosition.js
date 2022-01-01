import Room from "../models/room"

export const randomPosition = () => {
    return [Math.round(Math.random() * (Room.max - 2) + 1),
            Math.round(Math.random() * (Room.max - 2) + 1)]
}

export const randomDirection = () => {
    return [-1,1][Math.round(Math.random() * 1)]
}

