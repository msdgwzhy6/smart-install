import React from 'react'
import {View, TouchableHighlight, Animated} from 'react-native'
import util from '../../utils/util' 
import theme from '../../config/theme';
 

const styleItems = [
    'width', 
    'height',   
    'borderRadius',
    'borderWidth', 
]

export default class extends React.PureComponent { 
    constructor (props) {
        super (props)
        let item = props.item || {} 

        this.state = {
            type: item.type,
            prop: item.prop,
            value: item.value, 
            data: item.$data
        }   
        this.style = this._style(item.style)   

        this.scaleValue = new Animated.Value(0)

        this.scale = this.scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.2, 1]
        })
           
    }

    componentWillReceiveProps(nextProps) {  
        if (nextProps.item.style && typeof nextProps.item.style === 'function')
            this.style = this._style(nextProps.item.style) 

        if (nextProps.item.value != this.state.value)
            this.setState({
                value: nextProps.item.value
            }, () => {
                this._startAnimation()
            })   
    } 
 
    _startAnimation() {
        this.scaleValue.setValue(0)

        Animated.spring(
            this.scaleValue,
            {
                toValue: 1,
            }
        ).start()
    }

    _style = (style) => {
        if (!style) {
            return {}
        } else if (typeof style === 'function') {
            style = util.resetStyle(style(this.state.value, this.state.data))
        }

        let newStyle = {}

        for (let key in style) {
            if (styleItems.includes(key)) 
                newStyle[key] = style[key]
        }

        return newStyle
    }
    _fresh = (data) => { 
        this.setState({
            value: data
        })
    } 
    _click = () => {
        this.setState({
            value: !this.state.value
        }, () => { 
            this.props.change && this.props.change({
                prop:  this.state.prop,
                value: this.state.value
            })
        })
        this._startAnimation()
    }

    render () { 
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={this._click}>
                <Animated.View style={[
                        {borderWidth: 2, borderColor: theme.color.primaryColor, height: theme.size.smallHeight, width: theme.size.smallHeight, padding: theme.size.smallHeight < 26 ? 2 : 5}, 
                        theme.external[this.props.item.type], 
                        util.makeStyle(this.props.item.style, ...styleItems),
                        {transform: [{scale: this.scale}]}
                    ]}
                >
                {
                    this.state.value  ? 
                        <View style={[
                                {backgroundColor: theme.color.primaryColor, flex: 1}, 
                                util.makeStyle(theme.external[this.props.item.type], 'borderRadius'),
                                util.makeStyle(this.props.item.style, 'borderRadius'),
                            ]} 
                        /> 
                    : null
                }
                </Animated.View>
            </TouchableHighlight>
        )
    }
} 