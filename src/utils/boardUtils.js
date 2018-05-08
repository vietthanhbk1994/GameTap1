// @flow
import {inRange, random} from 'lodash';
import type {Tile} from '../types';
import metrics from 'src/config/metrics';
import colors from 'src/config/colors';

/**
 * Gets randomly one of the available title colors
 * @param {Array<string>} blacklist - An array with the already picked colors.
 * @return {string} A random color
 */
const getRandomTileColor = (blacklist: Array<string> = []): string => {
    const randomIndex = random(0, colors.TILES.length - 1);
    const randomColor = colors.TILES[randomIndex];
    return blacklist.includes(randomColor) ? getRandomTileColor(blacklist) : randomColor;
};

/**
 * Gets a random tile position (making sure that it does not overlap another tile)
 * @param Array<Tile> board - An array the already placed tiles
 * @return {Object} An object with the x and y coordinates of the tile
 */

const getRandomTileposition = (board: Array<Tile>) : {x: number, y: number} => {
    const position = {};
    const boardOriginX = metrics.BOARD_MARGIN;
    const boardOriginY = metrics.BOARD_MARGIN;
    const boardWidth = metrics.BOARD_WIDTH - metrics.BOARD_MARGIN;
    const boardHeight = metrics.BOARD_HEIGHT - metrics.BOARD_MARGIN;

    // Gets random tile position until it finds a position that does not overlap another tile.
    while (true) {

    }


};