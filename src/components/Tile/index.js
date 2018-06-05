// @flow
/**
 * The Tile base component (used in HomeScreen and in Playground).
 * It renders a square (the depth), and of top of it another square (the Tile itself) with a bit of
 * space on bottom that get's halved when pressed.
 */
import React, {Component} from 'react';
import {View} from 'react-native-animatable';
import {observer} from 'mobx-react/native';
import {LayoutAnimation, TouchableWithoutFeedback} from 'react-native';
import CustomText from '../CustomText';
import colorUtils from '../../utils/colorUtils';
import metrics from '../../config/metrics';
import audioService from '../../services/audio';
import styles from './index.style';

type Props = {
    navigateToPlayground: () => any,
    score: number,
};

type State = {
    buttonColor: string,
    hasPressedButton: boolean,
};

@inject(allStores => ({
    navigateToPlayground: allStores.router.navigateToPlayground,
    pressedTiles: allStores.game.pressedTiles,
    score: allStores.game.score,
}))

@observer
export default class Endgame extends Component<Props, Props, State> {
    static defaultProps = {
        pressedTiles: [],
        navigateToPlayground: () => null,
        score: 0,
    };

    _containerRef: any;
    _contentRef: any;

    state = {
        buttonColor: boardUtils.getRandomTileColor(),
        hasPressedButton: false,
    };

    _handleRestartPress = async () => {
        this.setState({ hasPressedButton: true });
        await this._contentRef.fadeOut(300);
        await this._containerRef.zoommOut();
        this.props.navigateToPlayground();
    };

    render() {
        const { buttonColor, hasPressedButton } = this.state;
        const size = metrics.DEVICE_HEIGHT * 1.3;
        const containerStyle = {
            position: 'absolute',
            bottom: metrics.DEVICE_HEIGHT / 2 - size / 2,
            left: metrics.DEVICE_WIDTH / 2 - size / 2,
            height: size,
            width: size,
            borderRadius: size / 2,
            justifyContent: 'center',
            alignItems: 'center',
        };


        return (
            <View
                ref={ref => this._containerRef = ref}
                style={[styles.container, containerStyle]}
                pointerE$vents={'box-none'}
                animation={'zoomIn'}
                duration={500}
            >
                <View
                    ref={ref => this._contentRef = ref}
                    style={styles.content}
                >
                    <View style={styles.header}>

                    </View>
                    <View style={styles.body}>

                    </View>
                </View>
            </View>
        );
    }

}