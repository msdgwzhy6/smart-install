import React from 'react'
import {Text, View, TouchableHighlight, Image} from 'react-native'
import util from '../../utils/util'
import theme from '../../config/theme'
import Radio from '../FdRadio/index'
const styleItems = [
    'margin',
    'marginLeft',
    'marginRight',
    'marginBottom',
    'marginTop',
    'padding',
    'paddingLeft',
    'paddingRight', 
    'paddingTop', 
    'paddingBottom', 
]
export default class extends React.Component { 
    constructor (props) {
        super (props)
        let item = props.item || {} 

        this.state = {
            type: item.type,
            prop: item.prop,
            value: item.value || '',
            data: item.$data,
            options: util.correctOption(item.options),
        }   
        
        this.style = this._style(item.style)   
           
    } 

    componentWillReceiveProps(nextProps) { 
        if (nextProps.item.style && typeof nextProps.item.style === 'function')
            this.style = this._style(nextProps.item.style)   

        if (nextProps.item.options != this.props.item.options)
            this.setState({
                options: util.correctOption(nextProps.item.options)
            })

        if (nextProps.item.value != this.state.value)
            this.setState({
                value: nextProps.item.value || ''
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
 
    _change = (params) => { 
        let value = params.prop
        this.setState({
            value: value
        }, () => {
            this.props.change && this.props.change({
                prop:  this.state.prop,
                value: this.state.value
            })
        })

    }
    render () {  
        return (
            <View style={{flexDirection: 'row'}}>
                {
                    this.state.options.map((el, index) => {
                        return <View key={index} style={[{flexDirection: 'row', alignItems: 'center', marginLeft: index == 0 ? 0 : 6}, util.makeStyle(this.props.item.style, ...styleItems)]}>
                            <Radio 
                                item={{
                                    prop: el.value,
                                    checked: this.props.item.checked, 
                                    unCheck: this.props.item.unCheck, 
                                    value: this.state.value == el.value,
                                    style: this.props.item.style
                                }} 
                                change={this._change}
                            />
                            <Text style={{
                                color: this.state.value == el.value ? theme.color.primaryColor : theme.color.optionColor, 
                                fontSize: theme.size.primarySize, 
                                marginLeft: 5,
                                marginRight: theme.size.itemSpace
                            }}>
                                {el.label}
                            </Text>
                        </View>
                    })
                }
            </View>
        )
    }
} 