import React from 'react'
import {Text, View, TextInput} from 'react-native' 
import util from '../../utils/util'
import theme from '../../config/theme'
const styleItems = [
    'height',
    'width',
    'placeholderTextColor',
    'textAlign',
    'textAlignVertical'
]

class FdInput extends React.Component { 
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view

        this.state = {
            password: item.password,
            prop: item.prop,
            value: item.value, 
            data: item.$data,
            keyboardType: item.keyboardType,
            placeholder: item.placeholder
        }  

        this.style = this._style(item.style) 
    }
    _fresh = (data) => {
        this.setState({
            value: data
        })
    } 
    _change = (text) => { 

        if (this.props.item.style && typeof this.props.item.style === 'function')
            this.style = this._style(this.props.item.style, text)

        this.setState({
            value: text
        }, () => {
            //todo  on blur和1秒内没输入时调用
            this.props.change && this.props.change({
                prop: this.state.prop,
                value: text
            })
        })

    }

    _filter = () => {
        if (util.isPlainObject(this.props.item.filter)) {
            return this.props.item.filter[this.state.value + '']
        }

        let obj = this.props.item.filter(this.state.value, this.state.data) 

        if (util.isPlainObject(obj)) 
            return obj[this.state.value + '']
        else return obj
    }

    _style = (style, value) => {
        if (!style) {
            return {}
        } else if (typeof style === 'function') {
            style = util.resetStyle(style(value !== void 0 ? value : this.state.value, this.state.data))
        }

        let newStyle = {}

        for (let key in style) {
            if (styleItems.includes(key)) 
                newStyle[key] = style[key]
        }
        return newStyle
    }
    
    render () { 
        return (  
            util.startWith('input-area', this.props.item.type)
            ? 
            <View>
                <TextInput  
                    underlineColorAndroid="transparent"  
                    placeholder={this.state.placeholder} 
                    placeholderTextColor={this.style.placeholderTextColor || theme.color.placeholder}
                    autoFocus={this.props.item.focus}
                    autoCorrect={false}  
                    multiline = {true}
                    maxLength={this.props.item.maxLength}
                    underlineColorAndroid={'transparent'}
                    style={[{textAlignVertical: 'top', padding: 0}, theme.external[this.props.item.type],  this.style]} 
                    value={this.state.value}  
                    onChangeText={this._change}/>
                    {
                        this.props.item.maxLength ? 
                        <Text style={{textAlign: 'right', color: theme.color.placeholder}}>
                            {(this.state.value + '').length + ' / ' + this.props.item.maxLength}
                        </Text> : null
                    }
            </View>
            :
            <TextInput  
                underlineColorAndroid="transparent" 
                keyboardType={util.startWith('input-password', this.props.item.type)  ? 'default' : this.state.keyboardType || 'default'}   
                placeholder={this.state.placeholder} 
                placeholderTextColor={this.style.placeholderTextColor || theme.color.placeholder}
                autoFocus={this.props.item.focus}
                autoCorrect={false} 
                autoCapitalize={'none'}  
                maxLength={this.props.item.maxLength}
                secureTextEntry={this.props.item.type === 'input-password'}
                clearButtonMode={'while-editing'} 
                style={[{padding: 2}, theme.external[this.props.item.type],  this.style]} 
                value={this.state.value}  
                onChangeText={this._change}/>
            )
    }
}

export default FdInput