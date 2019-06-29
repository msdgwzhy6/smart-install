/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './application/router/index';
import {name as appName} from './app.json';
import Freedomen from 'react-native-freedomen'
import api from './application/apis'
Freedomen.global.api = api
Freedomen.custom({
    primaryColor: '#2EBBC4'
}, {},{
    'click-row': {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15, 
        backgroundColor: 'white'
    },
    'br-row': {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white'
    }, 
    'text-label': {
        padding: 5,
        paddingLeft: 1,
        color: '#787878'
    },
    'text-tag': {
        borderColor: '#FF2B2B',
        borderWidth: .8, 
        color: '#FF2B2B', 
        borderRadius: 2,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    'text-primary': {
        color: '#2EBBC4', 
        paddingRight: 5
    },
    'text-must': {
        color: '#FF6D73',
        padding: 5
    },
    'text-h5': {
        color: '#191919'
    },
    'button-image-icon': {
        height: 26, 
        width: 26, 
        margin: 5
    },
    'text-badge': {
        color: 'white',
        backgroundColor: 'red',  
        minHeight: 10,
        minWidth: 10,
        padding: 3, 
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 16,
        padding: 1, 
        textAlign: 'center',
        marginLeft: -3,
        marginTop: -8,
        borderColor: 'white',
        borderWidth: .8,
    }, 
    'br-col': {
        padding: 15,
        backgroundColor: 'white'
    },
    'image-icon': {
        width: 22,
        height: 22,
        marginRight: 5,
    },
    'image-item': {
        height: 46,
        width: 46,
        margin: 5,
    },
    'image-header': {
        height: 39,
        width: 39,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 39,
    }
})
AppRegistry.registerComponent(appName, () => App);
