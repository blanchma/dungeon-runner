import Room from "../models/room"

export default function randomPosition() {
    return [Math.round(Math.random() * (Room.max - 2) + 1),
            Math.round(Math.random() * (Room.max - 2) + 1)]
  }
