import React from 'react'
import { Picker} from 'react-native' 
import util from '../../utils/util'
import theme from '../../config/theme'

class FdSelect extends React.Component {
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, options, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            value: item.value, 
            prop: item.prop,
            data: item.$data,
            options: util.correctOption(item.options)
        }  

        this.style = this._style(item.style) 
    }  
    _change = (itemValue, itemIndex) => {
        this.setState({
           value: itemValue
        }, () => {
            this.props.change && this.props.change({
                prop: this.state.prop,
                value: itemValue
            })
        })
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
                value: nextProps.item.value
            })
    } 

    _style = (style) => {  
        
        if (!style) {
            return {}
        } else if (typeof style === 'function') {
            style = util.resetStyle(style(this.state.value, this.state.data))
        }
 
        return style
    }
    _options = (options) =>{
        return options.map((option, i) => {
            return <Picker.Item key={i} label={option.label} value={option.value} />
        })
    }
    render () {
        return (
            <Picker
                selectedValue={this.state.value}
                style={[theme.external[this.props.item.type], this.style]}
                onValueChange={this._change}>
                    {
                        this._options(this.state.options)
                    }
            </Picker>
        )
    }
}

export default FdSelect