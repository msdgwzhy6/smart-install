import React from 'react'
import {Text, ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '爆点详情',
        headerRight: <Freedomen.Region 
            style={{flex: 1, align: 'center', paddingRight: 10}}
            columns={[
                {type: 'button-text', value: '保存'}
            ]}
        />
      }
    constructor(props) {
        super(props)
    }
    render() {
        return ( 
                <ScrollView style={{backgroundColor: '#f5f5f5', flex: 1}}>
                    <Freedomen.Region 
                        style={{backgroundColor: '#f5f5f5'}}
                        redux={'wt_data'}
                        event={params => {
                            if (params.prop == 'xzzgr') {
                                this.props.navigation.push("ZhenGaiRen", params.row.zgr)
                            }
                        }}
                        columns={[
                            {type: 'text-h4', value: '待指派', style: {backgroundColor: 'white', padding: 10, marginBottom: 2, color: '#FF6D73'}},
                            [
                                {type: 'text-must', value:'*'},
                                {type: 'text-h4',  value: '整改人', style: {flex: 1}},
                                {type: 'text-label', filter: value => {
                                    if (Array.isArray(value))
                                        return value.map(el => {
                                            return el.realName
                                        }).join(',')
                                    else return value
                                }, prop: 'zgr', value: '请选择'},
                                {type: 'image-icon', value: require('../../assets/right.png')},
                                {type: 'click-row', prop: 'xzzgr', style: {marginBottom: 1}}
                            ], [
                                {type: 'text-must', value:'*'},
                                {type: 'text-h4', value: '整改期限',},
                                {type: 'pickdate', placeholder: '请选择日期', prop: 'pd', style: {flex: 1, alignItems: 'flex-end', paddingRight: 5}},
                                {type: 'image-icon', value: require('../../assets/right.png')},
                                {type: 'br-row', style: {marginBottom: 1}}
                            ], [
                                {type: 'text-h4', value: 'Hunter管理员'},
                                {type: 'text-label', value: '同一室罗曼史，震荡东'},
                                [
                                    {type: 'text-h4', value: '任务描述'},
                                    {type: 'text-must', value:'*'},
                                    {type: 'br', style: {flexDirection: 'row', paddingTop: 10}}
                                ],
                                {type: 'input-area', prop: 'i', others: {numberOfLines: 4}, placeholder: '添加描述', maxLength: 500, style: {backgroundColor: '#F5F5F5', padding: 10}},
                                {type: 'br-col', style: {marginBottom: 1}}
                            ] , [
                                {type: 'text-h4', value: '检查项'},
                                {type: 'text-label', value: '同一室罗曼史，震荡东'}, 
                                {type: 'br-col', style: {marginBottom: 1}}
                            ], [
                                {type: 'text-h4', value: '检查部位'},
                                {type: 'text-label', value: '同一室罗曼史，震荡东'}, 
                                {type: 'br-col', style: {marginBottom: 1}}
                            ], [
                                {type: 'image-icon', value: require('../../assets/dw.png')},
                                {type: 'text-h4', value: '图纸位置', style: {flex: 1}},
                                {type: 'text-label', value: '已标记'},
                                {type: 'image-icon', value: require('../../assets/right.png')},
                                {type: 'click-row', style: {marginBottom: 1}}
                            ],
                        ]}
                    /> 
                
             </ScrollView> 
        );
    }
  }