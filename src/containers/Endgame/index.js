// @flow
/**
 * Main application component, handles the routing.
 */
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Image, View} from 'react-native-animatable';
import {inject, observer} from 'mobx-react/native';
import backgroundImg from '../../images/bg.jpg';
import Playground from 'src/containers/Playground';