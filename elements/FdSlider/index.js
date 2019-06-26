import React, { Component } from 'react';
import Slider from 'react-native-slider'

import { 
	Dimensions, 
} from 'react-native';

import theme from '../../config/theme'
import util from '../../utils/util'
const styleItems = [
    'height',  //
    'width' //
]
const width =  Dimensions.get('window').width

class FdSlider extends Component {

	constructor(props) {

        super(props)
        
        let item = props.item || {}
		this.state = {
			value: item.value,
			prop: item.prop
        }
        this.style = this._style(item.style) 
    }

    _style = (style) => {  
        
        if (!style) {
            return {}
        } else if (typeof style === 'function') {
            style = util.resetStyle(style(this.state.value, this.state.data))
        }
 
        return style
    }
    _change = (value) => {
        this.setState({
            value: value
        }, () => {
            this.props.change && this.props.change({
                prop: this.state.prop,
                value: value
            })
        })
    }
    
	componentWillReceiveProps(nextProps) {
		this.setState({
			value: nextProps.item.value
		})
	}
 
	render() {
        return (
            <Slider 
                minimumTrackTintColor={theme.color.primaryColor}
                thumbTintColor={theme.color.primaryColor}
                style={[theme.external[this.props.item.type], util.makeStyle(this.style, ...styleItems)]}
                value={this.state.value} 
                onValueChange={this._change} />
        )
	}
}

 
export default FdSlider