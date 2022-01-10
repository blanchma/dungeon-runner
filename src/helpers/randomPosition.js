import Room from "../models/room"

export const randomPosition = (max = Room.max) => {
    return [Math.ceil(Math.random() * (max - 2) ),
            Math.ceil(Math.random() * (max - 2) )]
}

export const randomDirection = () => {
    return [-1,1][Math.round(Math.random() * 1)]
}

