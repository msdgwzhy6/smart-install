import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker'
import { 
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import theme from '../../config/theme'
import util from '../../utils/util'
 

export default class extends Component {

	constructor(props) {

        super(props)
        
        let item = props.item || {}

        const types = {
            'pickdate': 'date', 
            'pickdatetime': 'datetime',
            'picktime':  'time'
        }
        this.mode = types[item.type]

		this.state = {
			value: item.value,
            prop: item.prop,
            placeholder: item.placeholder
        }
        this.style = this._style(item.style) 
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
    _style = (style) => {  
        
        if (!style) {
            return {}
        } else if (typeof style === 'function') {
            style = util.resetStyle(style(this.state.value, this.state.data))
        }
 
        return style
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

	componentWillReceiveProps(nextProps) {
        if (nextProps.item.value != this.state.value)
            this.setState({
                value: nextProps.item.value
            })
	}
 
	render() {
        return (
            <View style={[theme.external[this.props.item.type], this.style]}>
                <TouchableOpacity 
                    onPress={params => {
                        this.date.onPressDate()
                    }} >
                    <Text style={[
                        {color: this.state.value? theme.color.optionColor: theme.color.placeholder}, theme.external[this.props.item.type], util.makeStyle(this.style, 'fontSize')]}>
                        {
                            this.props.item.filter ? this._filter() : this.state.value || this.state.placeholder
                        }
                    </Text>
                </TouchableOpacity>
                <DatePicker
                    ref={ref => this.date = ref}
                    style={{width: 0, height: 0}}
                    date={this.state.date}
                    mode={this.mode}
                    minDate="1900-01-01"
                    maxDate="2050-01-01"
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    hideText
                    showIcon={false}
                    onDateChange={this._change}
                />          
            </View>
        )
	}
}
 