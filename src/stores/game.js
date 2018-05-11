// @flow
/**
 * A super-simple MobX routing solution.
 */
import {action, computed, observable} from 'mobx';
import {filter, find, orderBy, times} from 'lodash';
import timings from '../../src/config/timings';
import boardUtils from '../../src/utils/boardUtils';
import timeUtils from '../../src/utils/timeUtils';
import audioService from '../../src/services/audio';
import type {Tile} from '../../src/types';
import uuid from 'uuid';

export default class GameStore {
    @observable tiles: Array<Tile> = [];
    @observable isGameRunning: boolean = false;
    @observable isEndGame: boolean = false;
    @observable isBoardValid: boolean = false;
    @observable level: number = false;
    @observable score: number = false;

    @action startGame = () => {
        this.level = 1;
        this.score = 0;
        this.isGameRunning = true;
        this.buildBoard();
        this.startTime();
    };

    @action goToNextLevel = () => {
        this.level++;
        this.buildBoard();
    };

    @action buildBoard = () => {
        // Called on every round start (round, not game): it builds the board's tiles
        this.tiles = [];
        this.isBoardValid = true;
        const numberOfTiles = boardUtils.getNumberOfTiles(this.level);
        const alreadyPickedNumber = [];
        const alreadyPickedColor = [];

        times(numberOfTiles, n => {
            const id = uuid.v4();
            const {x, y} = boardUtils.getRandomTilePosition(this.tiles);
            const number = boardUtils.getRandomNumber(this.level, alreadyPickedNumber);
            const color = boardUtils.getRandomTileColor(alreadyPickedColor);
            const isVisible = true;
            alreadyPickedNumber.push(number);
            alreadyPickedColor.push(color);
            this.tiles.push({id, x, y, number, color, isVisible});
        });
    };

    @action startTime = async () => {
        await timeUtils.delay(timings.TIME_LIMIT_MS)
    };

    @action handleTilePress = async (tileId: string) => {
        const pressedTile = find(this.tiles, {id: tileId});
        const activeTiles = filter(this.tiles, 'isVisible');
        const sortedActiveTiles = orderBy(activeTiles, 'number');
        // If the pressed tile was the one with the lowest number
        if (pressedTile.number === sortedActiveTiles[0].number) {
            pressedTile.isVisible = false;
            this.score++;
            if(this.isBoardEmpty) {
                this.goToNextLevel();
            }
        } else {
            this.isBoardValid = false;
            audioService.playFailureSound();
            await timeUtils.delay(1000); //Wait for the failure animation
            this.buildBoard();
        }
    };

    @computed get board(): Array<Tile> {
        return this.tiles.slice();
    };

    @computed get isBoardEmpty(): boolean {
        return this.tiles.slice().filter(t => t.isVisible === true).length === 0;
    }
}