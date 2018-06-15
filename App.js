// @flow
import React, {Component} from 'react';
import {Provider} from 'mobx-react/native';

import AppContainer from './src/containers/App/index';
import GameStore from './src/stores/game';
import RouterStore from './src/stores/router';

const gameStore = new GameStore();
const routerStore = new RouterStore();

export default class TapTheNumber extends Component {
    render() {
        return (
            <Provider game={gameStore} router={routerStore}>
                <AppContainer />
            </Provider>
        );
    }
}
