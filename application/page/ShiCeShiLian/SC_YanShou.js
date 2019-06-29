import React from 'react'
import Freedomen from 'react-native-freedomen'
import {ScrollView, View, Dimensions} from 'react-native'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '验收',
            headerRight: <Freedomen.Region 
                event={params => {}}
                columns={[
                    {type: 'button-text', value: '验收', style: {marginRight: 12}}
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = { 
            data: props.navigation.state.params
        }
    }
    componentDidMount() {
    } 
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}} 
                event={params => {
                    if (params.prop == 'sw')
                        return {label: params.value?'通过':'不通过'}
                }}
                columns={[
                    [
                        {type: 'text-h4', value: '工作结果', style: {flex: 1}},
                        {type: 'text', value: '不通过', prop: 'label', style: (value, data) => {
                            if (data.sw)
                                return {color: '#2EBBC4'}
                        }},
                        {type: 'switch', prop: 'sw', value: false},
                        {type: 'br-row', style: {marginTB: 1}}
                    ],
                    [
                        {type: 'text-h4', value: '评分', style: {flex: 1}},
                        {type: 'rate', value: 1, prop: 'pf'},
                        {type: 'br-row', style: {marginBottom: 1}}
                    ],
                ]}
            />
               
        );
    }
  }