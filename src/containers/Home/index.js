// @flow
/**
 * Main application component, handles the routing.
 */
import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import { Image, View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Tile from '../../components/Tile';
import LogoImage from '../../images/logo.png';
import boardUtils from '../../utils/boardUtils';
import audioService from '../../services/audio';
import styles from './index.style';

type Props = {
    navigateToPlayground: () => any,
    navigateToEndGame: () => any,
};

type State = {
    tileNumber: number,
    tileColor: string,
    hasHeaderAppeared: boolean,
    hasPressedButton: boolean,
};

@inject(allStores => ({
    navigateToPlayground: allStores.router.navigateToPlayground,
    navigateToEndGame: allStores.router.navigateToEndGame,
}))

@observer
export default class Home extends Component<Props, Props, State>  {
    static defaultProps = {
        navigateToPlayground: () => null,
        navigateToEndGame: () => null,
    };

    _headerRef: any;
    _bodyRef: any;

    state = {
        titleNumber: 3,
        titleColor: boardUtils.getRandomTileColor(),
        hasHeaderAppeared: false,
        hasPressedButton: false,
    };


    componentDidMount() {
        if (this._headerRef) {
            this._headerRef.bounceInRight(1000).then(() => {
                LayoutAnimation.spring();
                this.setState({
                    hasHeaderAppeared: true,
                });
            });
        }
    }

    _handleTilePress = () => {
        const { tileNumber, tileColor } = this.state;

        this.setState({
            tileNumber: tileNumber === 99 ? 1 : tileNumber + 1,
            tileColor: boardUtils.getRandomTileColor([tileColor])
        });
    };

    _handleButtonPress = async () => {
        this.setState({
            hasPressedButton: true,
        });

        if (this._headerRef && this._bodyRef) {
            await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
        }
        this.props.navigateToPlayground();
    };

    render() {
        const { tileNumber, tileColorm, hasHeaderAppeared, hasPressedButton } = this.state;

        return (
            <View style={styles.container}>
                <View
                    style={styles.header}
                    ref={ref => {
                        this._headerRef = ref;
                    }}
                >
                    <View
                        style={styles.headerLeft}
                    >
                        <Tile
                            backgroundColor={tileColor}
                            text={tileNumber}
                            onPressOut={this._handleTilePress()}
                            style={styles.tile}
                            textStyyle={styles.tileText}
                            singlePressOnly={false}
                        />
                    </View>
                    <View style={styles.headerRight}>
                        <Image resizeMode={'contain'} source={LogoImage} style={styles.logo} />
                    </View>
                </View>
                {
                    hasHeaderAppeared && (
                        <View
                            style={styles.body}
                            ref={ref => {
                                this._bodyRef = ref
                            }}
                        >
                            <Tile
                                backgroundColor={tileColor}
                                text={'Start Gmae'}
                                style={styles.button}
                                textStyle={styles.buttonText}
                                onPressOut={this._handleButtonPress}
                                isEnabled={!hasPressedButton}
                                playSound={audioService.playButtonSound}
                            />
                        </View>
                    )
                }
            </View>
        );
    }

}