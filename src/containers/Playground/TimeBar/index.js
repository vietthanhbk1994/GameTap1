// @flow
/**
 * The core of the game
 * It links the Board to the MobX store and navigate to the EndGame if need
 */
import React, {Component} from 'react';
import {View} from 'react-native-animatable';
import {Animated, Easing} from 'react-native';
import styles from './index.style';
import timings from '../../../config/timings';
import metrics from '../../../config/metrics';

type State = {
    animateValue: any,
};

export default class TimeBar extends Component<void, {}, State> {
    state = {
        animateValue: new Animated.Value(timings.TIME_LIMIT_MS),
    };

    componentDidMount() {
        Animated.timing(this.state.animateValue, {
            duration: timings.TIME_LIMIT_MS,
            easing: Easing.linear, // No easing
            toValue: 0,
        }).start();
    }

    render() {
        const backgroundColor = this.state.animateValue
        return (
            <View
                style={styles.container}
            >
                <View
                    style={[styles.content, {width, backgroundColor}]}
                />
            </View>
        );
    }


}