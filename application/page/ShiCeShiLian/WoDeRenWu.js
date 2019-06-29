import React from 'react'
import {Image, ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen' 

export default  class  extends React.Component {
    static navigationOptions = {  
        tabBarLabel: '任务', 
        tabBarIcon: ({tintColor,focused}) => <Image source={focused ? require('../../assets/unrenwu.png') : require('../../assets/renwu.png')} style={{height: 22, width: 22}}/> 
    }; 
    constructor(props) {
        super(props)
        this.state = {
           list: []
        }
        Freedomen.global.fresh = this._loadData
    }
    componentDidMount() { 
       this._loadData()
    } 
    _loadData() {
        Freedomen.global.api.get('api/paperPointInfo/getPaperPointInfoNums', {
            projectId: Freedomen.global.project.projectId
        }).then(res => {
            this.setState({list: res})
        })
    }
    render() {
        return (
            <ScrollView>
                {
                    this.state.list.map((el, key) => {
                        return <Freedomen.Region 
                            style={{flex: 1, backgroundColor: '#f5f5f5'}}
                            event={params => {
                                if (params.prop == 'glrk') 
                                    this.props.navigation.navigate('GuoLvQiRuKou', key === 0 ?  {} : params.row)
                                else if (params.prop == 'scsl')
                                    this.props.navigation.navigate('ShiCeShiLian')
                            }}
                            key={key}
                            data={el}
                            columns={[
                                [
                                    {type: "text-h4", value: '实测实量'},
                                    [
                                        {type: 'text-label', prop: 'doneNums', value: '0', filter: value => `测量点位:${value}`},
                                        {type: 'text-label', prop: 'pointNums', value: '0', filter: value => `/ ${value}`},
                                        {type: 'text-label', prop: 'problemNums', value: '8', filter: value => `  爆点数量:${value}`},
                                        {type: 'br', style: {flexDirection: 'row'}}
                                    ],
                                    {type: 'click', prop: 'scsl', style: {flex: 1}}
                                ],
                                {type: 'button-image', prop: 'glrk', value: require('../../assets/w.png'), style: {width: 30, height: 30, marginLR: 8}},
                                {type: 'button-image', load: ()=> {return key === 0}, value: require('../../assets/tonbu.png'), style: {width: 30, height: 30, marginLR: 5}},
                                {type: 'text-badge', value: 2, load: ()=> {return key === 0}, style: {marginLeft: -14, marginTop: -22}},
                                {type: 'br-row', style: {marginTB: 1}}
                            ]}
                        /> 
                    })
                }
                
            </ScrollView>
        );
    }
  }