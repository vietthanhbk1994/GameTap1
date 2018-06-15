// @flow
/**
 * It adds styles and animations when the Tile appear and disappear
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import Tile from '../../../components/Tile';
import { observer } from 'mobx-react/native';
import metrics from '../../../config/metrics';

type Props = {
    left: number,
    bottom: number,
    backgroundColor: string,
    text: string | number,
    onTilePress: Function,
    isEnabled: boolean,
    isVisible: boolean,
};

type State = {
    isVisible: boolean
};

@observer
export default class BoardTile extends Component<void, Props, State> {
    state = {
        isVisible: this.props.isVisible
    };

    _tileRefs = null;

    _handlePressOut = async () => {
        this.props.onTilePress();
        if (this._tileRefs && this._tileRefs.getContainerRef()) {
            await this._tileRefs.getContainerRef().bounceOut(200);
        }
        this.setState({
            isVisible: false,
        });
    };

    animateFailure = async () => {
        if (this._tileRefs && this._tileRefs.getContainerRef()) {
            await this._tileRefs.getContainerRef().swing(400);
        }
        if (this._tileRefs && this._tileRefs.getContainerRef()) {
            await this._tileRefs.getContainerRef().bounceOut(450);
        }
        this.setState({
            isVisible: false,
        });
    };

    render() {
        const { left, bottom, backgroundColor, text, isEnabled } = this.props;
        const { isVisible } = this.state;
        const containerStyle = {
            position: 'absolute',
            left,
            bottom,
        };
        const tileSize = {
            width: metrics.TILE_SIZE,
            height: metrics.TILE_SIZE,
        };
        if (!isVisible) return null;
        return (
            <View
                style={containerStyle}
            >
                <Tile
                    style={tileSize}
                    ref={
                        ref => this._tileRefs = ref
                    }
                    animation={'bounceIn'}
                    backgroundColor={backgroundColor}
                    text={text}
                    onPressOut={this._handlePressOut}
                    isEnabled={isEnabled}
                />
            </View>
        );
    }


}