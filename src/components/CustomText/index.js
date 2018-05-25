// @flow
/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React, { Element } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-animatable';
import TouchableView from 'src/components/TouchableView';
import metrics from '../../config/metrics';
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