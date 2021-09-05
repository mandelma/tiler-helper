import {fullTiles} from './wallTiles'
import {leftCol} from './wallTiles'
import {rightCol} from './wallTiles'
import {lineTop} from './wallTiles'
import {lineBottom} from "./wallTiles"
import {corners} from './wallTiles'

export default {
    render (cx, fullTilesX, fullXTilesLen, fullTilesY, fullYTilesLen, spaceX, spaceY, tileWidth, tileHeight, gapSize, counterX, counterY) {
        fullTiles(cx, fullTilesX, fullTilesY, spaceX, spaceY, tileWidth, tileHeight, gapSize, counterX, counterY)
        leftCol (cx, fullTilesY, spaceX, spaceY, tileHeight, gapSize, counterX, counterY)
        rightCol(cx, fullXTilesLen, fullTilesY, spaceX, spaceY, tileWidth, tileHeight, gapSize, counterX, counterY)
        lineTop(cx, fullTilesX, spaceX, spaceY, tileWidth, gapSize, counterX, counterY)
        lineBottom(cx, fullTilesX, fullTilesY, spaceX, spaceY, tileWidth, tileHeight, gapSize, counterX, counterY)
        corners(cx, fullXTilesLen, fullYTilesLen, spaceX, spaceY, gapSize, counterX, counterY)
    }
}