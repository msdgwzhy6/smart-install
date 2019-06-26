import React, { Component } from 'react';
import * as Progress from 'react-native-progress'
import { 
	Dimensions, 
} from 'react-native';
import theme from '../../config/theme'
import util from '../../utils/util'

const width =  Dimensions.get('window').width

class FdProgress extends Component {

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

	componentWillReceiveProps(nextProps) {
		this.setState({
			value: nextProps.item.value
		})
	}
 
	render() {

        let tag, {value} = this.state

        switch ((this.props.item || {}).type) {
            case 'progress-bar':
                tag = <Progress.Bar progress={value} height={50} width={this.style.width || 60} color={theme.color.primaryColor}/>
				break
			case 'progress-circle':
				tag = <Progress.Circle progress={value} color={theme.color.primaryColor} formatText={() => {return this.state.value * 100 + '%'}} showsText={true} width={this.style.width || 60} />
				break
            default: 
				tag = <Progress.Bar progress={value} width={this.style.width || 60} color={theme.color.primaryColor}/>
				break
        }  
		return tag
	}
}

 
export default FdProgress