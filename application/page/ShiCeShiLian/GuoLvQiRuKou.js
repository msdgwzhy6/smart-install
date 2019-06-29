import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
var cequleixin , jianchaxian, id = null
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '过滤入口',
            headerRight: <Freedomen.Region 
                style={{flex: 1, align: 'center', paddingRight: 10}}
                event={params => {
                    let cq = '', jc = ''
                    for (let item of cequleixin.keys()) {
                        cq += ',' + item
                    }
                    for (let item of jianchaxian.keys()) {
                        jc += ',' + item
                    }
                    
                    Freedomen.global.api.post(id == null ? 'api/paperPointNumsLog/addPaperPointNumsLog' : 'api/paperPointNumsLog/updatePaperPointNumsLog', {
                        id: id,
                        projectId: Freedomen.global.project.projectId,
                        buildingNames: cq ? cq.substring(1) : '',
                        checkTypes: jc ? jc.substring(1) : ''
                    }).then(res => {
                        Freedomen.global.fresh()
                        navigation.goBack()
                    })
                }}
                columns={[
                    {type: 'button-text', value: '保存'}
                ]}
            />
      }
    }
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
        console.log(props.navigation.state.params)
        if (props.navigation.state.params.buildingNames) {
            id = props.navigation.state.params.id
            cequleixin = new Set(props.navigation.state.params.buildingNames.split(','))
            jianchaxian = new Set(props.navigation.state.params.checkTypes.split(','))
        } else  {
            cequleixin = new Set()
            jianchaxian = new Set()
        } 

        this.params = {}
    }
    componentDidMount() {
        Promise.all([
            Freedomen.global.api.get('api/checkListTypes/admin/getCheckListTypesList', {
                checkType: 0
            }),
            Freedomen.global.api.get('api/buildingOfMeasured/getBuildingOfMeasuredByProjectId', {
                projectId: Freedomen.global.project.projectId
            })
        ]).then(res => {
            let data = this.state.data
            data.jianchaxian = res[0].map(el => {
                el.b = jianchaxian.has(el.checkId + '') 
                return el
            })
            data.cequleixin = res[1].map(el => {
                el.b1 = cequleixin.has(el.bfmId + '') 
                return el
            })
            this.setState({
                data: data
            })
        }) 
    }
    render() {
        return (
            <View style={{flex: 1, paddingTop: 1, backgroundColor: '#f5f5f5'}}>
                <ScrollView style={{flex: 1}}> 
                    <Freedomen.Region 
                        style={{flex: 1, backgroundColor: '#f5f5f5'}}
                        data={this.state.data}
                        event={params => {
                            if (params.prop == 'cequleixin') { 
                                params.value.value 
                                ? cequleixin.add(params.value.row.bfmId)
                                : cequleixin.delete(params.value.row.bfmId)
                            } else if (params.prop == 'jianchaxian') {
                                params.value.value 
                                ? jianchaxian.add(params.value.row.checkId)
                                : jianchaxian.delete(params.value.row.checkId)
                            }
                        }}
                        columns={[
                            {type: 'input-text', value: '过渡器入口', placeholder: '输入过虑器入口名称', prop: 'te', style: {padding: 10, backgroundColor: 'white'}},
                            ...columns.GuoLv
                        ]}
                    /> 
                </ScrollView>
                <Freedomen.Region
                    style={{height: 52, backgroundColor: 'white'}}
                    columns={[
                        {type: 'button-text', value: '删除入口', style: {color: 'red', height: 52, align: 'center'}}
                    ]} />
            </View>
        );
    }
  }