import React, { Component } from 'react';
import { ScrollView, View } from 'react-native'
import Region from '../Region/index' 
export default class extends Component { 

    constructor (props) {
        super (props)
 
        this.state = {
            columns: props.columns || [],  
            data: props.data || [],
            type: props.type
        } 
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
        })
    } 

    render () {
        let { columns, data } = this.state
         
        let  jsx = data.map((d, index) => {
            return <Region  columns={columns} data={d} key={index} event={this.props.event} /> 
        }) 

        return <View style={[{flexDirection: this.props.type == 'view-x' ? 'row': 'column'}, this.props.style]}>
            {
                jsx
            }
        </View>
    }
}