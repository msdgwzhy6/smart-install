import React from 'react'
import {Text, View, TextInput, TouchableOpacity} from 'react-native'
import util from '../../utils/util'
import theme from '../../config/theme'
const styleItems = [
    'width', 
    'height',  
    'borderColor',
    'borderWidth', 
]

class FdCounter extends React.PureComponent { 
    constructor (props) {
        super (props)
        let item = props.item || {} 
        let value = 0
        try {
            value =  parseInt(item.value) || 0
        } catch(e) { }

        this.state = {
            prop: item.prop,
            value: value,
            label: item.label,
            min: item.min || 0,
            max: item.max || 100,
            step: item.step || 1,
            data: item.$data
        }   
        
        this.style = this._style(item.style)   
           
    }

    componentWillReceiveProps(nextProps) { 
        if (nextProps.item.style && typeof nextProps.item.style === 'function')
            this.style = this._style(nextProps.item.style)   

        if (nextProps.item.value != this.state.value)
            this.setState({
                value: nextProps.item.value
            })
    } 
    _submit(value) {
        this.setState({
            value: value
        }, () => {
            this.props.change && this.props.change({
                prop: this.state.prop,
                value: value
            })
        })
    }
    _change = (cm) => {
        if (cm == 'sub') {
            let value = this.state.value
            value = value - this.state.step < this.state.min ? this.state.min : value - this.state.step
            this._submit(value)
        } else if (cm == 'add') {
            let value = this.state.value
            value = value + this.state.step > this.state.max ? this.state.max : value + this.state.step
            this._submit(value)
        } 
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
        return (
            <View style={[
                    {
                        height: theme.size.normalHeight, 
                        width: 115, 
                        borderColor: theme.color.primaryColor, 
                        borderWidth: .5, 
                        borderRadius: 3, 
                        flexDirection: 'row'
                    }, 
                    theme.external[this.props.item.type], 
                    this.style
                ]}>
                <TouchableOpacity style={{
                        width: theme.size.normalHeight, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderRightColor: theme.color.primaryColor, 
                        backgroundColor: theme.color.primaryColor, 
                        borderRightWidth: 1
                    }} 
                    onPress={() => {this._change('sub')}}
                >
                    <Text style={{
                            color: 'white', 
                            fontSize: theme.size.primarySize,
                            flex: 1, 
                            textAlign: 'center',
                            textAlignVertical: 'center'
                        }}> 
                        - 
                    </Text> 
                </TouchableOpacity> 

                <TextInput 
                    value={String(this.state.value)} 
                    onChangeText={value => {
                        let tempValue = value
                        if (tempValue > this.state.max)
                            tempValue = this.state.max
                        else if (tempValue < this.state.min)
                            tempValue = this.state.min  

                        this._submit(tempValue)
                    }}  
                    style={{flex: 1, padding: 0, textAlign: 'center'}}
                    keyboardType={'number-pad'}
                    />
                
                <TouchableOpacity 
                    style={{
                            width: theme.size.normalHeight, 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            backgroundColor: theme.color.primaryColor, 
                        }} 
                        onPress={() => {this._change('add')}}
                    >
                    <Text style={{
                            color: 'white', 
                            fontSize: theme.size.primarySize,
                            flex: 1, 
                            textAlign: 'center',
                            textAlignVertical: 'center'
                        }}> 
                        + 
                    </Text> 
                </TouchableOpacity>
            </View>
        )
    }
}

export default FdCounter