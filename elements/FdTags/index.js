import React from 'react'
import {Text, View, Animated, TouchableOpacity} from 'react-native'
import util from '../../utils/util'
import theme from '../../config/theme'
const styleItems = [
    'width',  
    'height',  
    'borderColor',
    'borderWidth',
    'color',
    'fontSize',
    'borderRadius',
    'flex',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'margin'
]
 
export default class extends React.Component { 
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            prop: item.prop,
            value: this._resetValue(item.value),
            options: util.correctOption(item.options),
            size: item.size || 1,
            data: item.$data
        }   

        this.scaleValue = new Animated.Value(0)

        this.scale = this.scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.2, 1]
        })

        this.style = this._style(item.style)   
    }

    _resetValue = (value) => {
        if (!value)
            return []
        else if (Array.isArray(value))
            return value
        else return value.split(',')
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

    componentWillReceiveProps(nextProps) {   
        if (nextProps.item.options !== this.props.item.options)
            this.setState({
                options: util.correctOption(nextProps.item.options)
            })

        if (nextProps.item.value !== this.state.value)
            this.setState({
                value: this._resetValue(nextProps.item.value)
            })
    } 

    _press = (data) => { 
        let value = this.state.value 
        let index = value.indexOf(data.value)

        if (index == -1 && value.length >= this.state.size) {
            value[0] = data.value
        } else if (index == -1) {
            value.push(data.value)
        } else {
            value.splice(index, 1)
        } 
        this.setState({
            value: value
        }, () => {  
            this.props.change && this.props.change({
                prop: this.state.prop,
                value: value.length != 0 ? (this.state.size == 1 ? value[0] : value): (this.state.size == 1 ? '' : value)
            })
            this._startAnimation()
        })
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
    render () {  
        return (<View style={[{
                    flexDirection: 'row', 
                    flexWrap: 'wrap'
                },
                util.makeStyle(this.props.item.style,
                    'flexDirection',
                    'height',
                    'width',
                    'marginTop',
                    'marginBottom',
                    'marginLeft',
                    'marginRight',
                    'margin',
                    'padding',
                    'paddingLeft',
                    'paddingRight',
                    'paddingTop',
                    'paddingBottom'
                )
            ]}>
            {
                this.state.options.map((data, key) => {
                    return <Animated.View
                            key={key} 
                            style={[
                                {
                                    height: theme.size.smallHeight, 
                                    marginRight: theme.size.itemSpace, 
                                    borderColor: '#999', 
                                    borderWidth: 0.5, 
                                    borderRadius: 5,  
                                    marginTop: 5,
                                    marginBottom: 5, 
                                }, 
                                theme.external[this.props.item.type],
                                this.state.value.indexOf(data.value) != -1 && {backgroundColor: theme.color.primaryColor,transform: [{scale: this.scale}]},
                                this.state.value.indexOf(data.value) == -1 && util.makeStyle(this.props.item.style, 'backgroundColor'),
                                this.style
                            ]}>
                        <TouchableOpacity 
                        style={{
                                paddingLeft: 5,
                                paddingRight: 5,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {this._press(data)}} 
                            >
                            <Text style={[ 
                                    theme.external[this.props.item.type],
                                    {color: this.state.value.indexOf(data.value) != -1 ? 'white' : theme.color.placeholder},
                                    this.state.value.indexOf(data.value) == -1 && util.makeStyle(this.props.item.style, 'color', 'fontSize')
                                ]}
                            >
                                {data.label}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                })
            }
        </View>)
    }
}
 