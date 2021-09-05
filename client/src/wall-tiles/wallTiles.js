class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

let tileCoords = new Array(5)

export default {
    tileCoords
}


export function fullTiles(cx, x_tiles, y_tiles, x_space, y_space, tile_x, tile_y, gap, counterX, counterY) {
    let inx = 0
    for(let x = 0; x < x_tiles; x++) {
        const xPos = x_space + counterX + x * (tile_x + gap)

        for(let y = 0; y < y_tiles; y++) {
            const yPos = y_space + counterY + y * (tile_y + gap)

            tileCoords[inx] = new Position(xPos, yPos)
            cx.fillStyle = "black"
            cx.fillRect(xPos, yPos, tile_x, tile_y)
            inx++
        }
    }
}

export function  leftCol(cx, fullTilesY, spaceX, spaceY, tileHeight, gapSize, counterx, countery) {
    for(let i = 0; i < fullTilesY; i++) {
        const y = spaceY + countery + i * (tileHeight + gapSize)
        cx.fillStyle = "red";
        cx.fillRect(gapSize, y, (spaceX - (2 * gapSize) + counterx), tileHeight)
    }
}

export function rightCol (cx, fullXTilesLen, fullTilesY, spaceX, spaceY,  tileWidth, tileHeight, gapSize, counterx, countery) {
    for(let i = 0; i < fullTilesY; i++) {
        const y = spaceY + i * (tileHeight + gapSize)
        const x = spaceX + fullXTilesLen
        cx.fillStyle = "green";
        cx.fillRect(x + counterx, y + countery, (spaceX - (2 * gapSize) - counterx), tileHeight)
    }
}

export function lineTop(cx, fullTilesX, spaceX, spaceY, tileWidth, gapSize, counterx, countery) {
    for(let i = 0; i < fullTilesX; i++) {
        const x = spaceX + counterx + i * (tileWidth + gapSize)
        cx.fillStyle = "violet"
        cx.fillRect(x, gapSize, tileWidth, spaceY - (2 * gapSize) + countery)
    }
}

export function lineBottom(cx, fullTilesX, fullTilesY, spaceX, spaceY, tileWidth, tileHeight,gapSize, counterx, countery) {
    const y = spaceY + (fullTilesY * (tileHeight + gapSize))
    for(let i = 0; i < fullTilesX; i++) {
        const x = spaceX + counterx + i * (tileWidth + gapSize)
        cx.fillStyle = "blue"
        cx.fillRect(x, y + countery, tileWidth, spaceY - (2 * gapSize) - countery)
    }
}

export function corners(cx, fullXTilesLen,fullYTilesLen, spaceX, spaceY, gapSize, counterx, countery) {
    let start_end_x = 0
    let start_end_y = 0
    if(fullXTilesLen > 0) {
        start_end_x = spaceX - (2 * gapSize)
        start_end_y = spaceY - (2 * gapSize)
    }

    const row_last_tile_start = (start_end_x + (2 * gapSize)) + fullXTilesLen
    const col_last_tile_start = (start_end_y + (2 * gapSize)) + fullYTilesLen

    // up_left_corner
    let left_up_x = gapSize
    let left_up_y = gapSize
    let left_up_tile_x = start_end_x + counterx
    let left_up_tile_y = start_end_y + countery

    // up_right_corner
    let right_up_x = row_last_tile_start + counterx
    let right_up_y = gapSize
    let right_up_tile_x = start_end_x - counterx
    let right_up_tile_y = start_end_y + countery

    // bottom left corner
    let left_bottom_x = gapSize
    let left_bottom_y = col_last_tile_start + countery
    let left_bottom_tile_x = start_end_x + counterx
    let left_bottom_tile_y = start_end_y - countery

    // bottom right corner
    let right_bottom_x = row_last_tile_start + counterx
    let right_bottom_y = col_last_tile_start + countery
    let right_bottom_tile_x = start_end_x - counterx
    let right_bottom_tile_y = start_end_y - countery



    // set up left corner tile
    cx.fillStyle = "pink"
    cx.fillRect(left_up_x, left_up_y, left_up_tile_x, left_up_tile_y)
    // set up right corner tile
    cx.fillStyle = "yellow"
    cx.fillRect(right_up_x, right_up_y, right_up_tile_x, right_up_tile_y)
    // set up left bottom corners
    cx.fillStyle = "violet"
    cx.fillRect(left_bottom_x, left_bottom_y, left_bottom_tile_x, left_bottom_tile_y)
    // set bottom right corner tiles
    cx.fillStyle = "lightblue"
    cx.fillRect(right_bottom_x, right_bottom_y, right_bottom_tile_x, right_bottom_tile_y)
}