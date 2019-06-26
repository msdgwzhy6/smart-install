import React from 'react'
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import FdImage from '../FdImage/index'
import FdText from '../FdText/index'
import util from '../../utils/util'
import theme from '../../config/theme'

export default class extends React.Component {
    constructor (props) { 
        super (props)
        this.state = {
            disabled: props.item.disabled,
            prop: props.item.prop,
            value: props.item.value,
            data: props.item.$data
        } 
    }
    _getXmlbyType = (item, dis = false) => {
        let tempItem = item
        let jsx = null  
        // if (dis)
        //     tempItem.type = item.type + '-disabled'

        if (util.startWith(tempItem.type, 'button-image')) {

            jsx = <FdImage ref='button' item={tempItem} />

        } else if (util.startWith(tempItem.type, 'button')) {
            
            jsx = <FdText ref='button' item={tempItem} />

        }
        return jsx
    } 
    
    _isDisabled = (disabled) => {
        if (typeof disabled === 'function')
            return disabled(this.state.value, this.state.data)

        return disabled
    }
 

    componentWillReceiveProps(nextProps) {  
        this.setState({
            value: nextProps.item.value,
            data: nextProps.item.$data
        } ) 
    }

    _press = (type) => {
        this.props.event && this.props.event({
            type: type, 
            prop: this.props.item.prop, 
            value: this.props.item.value
        })
    }

    render () {
        let dis = this._isDisabled(this.state.disabled)
        let jsx = this._getXmlbyType (this.props.item, dis)  
        return (  
            this.state.disabled === void 0 || !dis
            ? 
            <TouchableOpacity    
                onPress={() => {
                    this._press('press')
                }} onLongPress={() => {
                    this._press('longPress')
                }}> 
                    {jsx} 
            </TouchableOpacity> 
            : jsx
        )
    }
}
 