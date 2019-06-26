import React from 'react'
import { Switch } from 'react-native' 
import theme from '../../config/theme'
class FdSwitch extends React.Component {
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, options, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            value: !!item.value, 
            prop: item.prop, 
        }
         
        this._change = this._change.bind(this) 
    } 
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.item.value
        })
    }
    _change (value) {
        this.setState({
            value: value
        })
        this.props.change && this.props.change({
            prop: this.state.prop,
            value: value
        })
    } 
    render () {
        return (
            <Switch thumbColor={theme.color.primaryColor} trackColor={{false: '#ccc', true: theme.color.primaryColor}} value={this.state.value} onValueChange={this._change}/>
        )
    }
}

export default FdSwitch