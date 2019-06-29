import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '新建入库物资',
        headerRight: <Freedomen.Region 
            event={params => { 
            }}
            columns={[
                {type: 'button-text', value: '保存', style: {marginRight: 12}}
            ]}
        />
    }
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => { }}
                columns={[
                    [
                        {type: 'text-h4', value: '物资编码', style: {width: 100}},
                        {type: 'text', value: 'hh'},
                        {type: 'br-row', style: {marginBottom: 1}}
                    ], [
                        {type: 'text-h4', value: '物资名称', style: {width: 100}},
                        {type: 'text', value: '请输入物资名称', style: {flex: 1}},
                        {type: 'image-icon', value: require('../../assets/right.png')},
                        {type: 'br-row', style: {marginBottom: 1}}
                    ], [
                        {type: 'text-h4', value: '分类', style: {width: 100}},
                        {type: 'text', value: '必填', style: {flex: 1}},
                        {type: 'image-icon', value: require('../../assets/right.png')},
                        {type: 'br-row', style: {marginBottom: 1}}
                    ], [
                        {type: 'text-h4', value: '规格型号', style: {width: 100}},
                        {type: 'text', value: 'hh'},
                        {type: 'br-row', style: {marginBottom: 1}}
                    ], [
                        {type: 'text-h4', value: '单位', style: {width: 100}},
                        {type: 'input-text', prop: 'dw', placeholder: '请输入单位（必填）', style: {height: 38}},
                        {type: 'br-row', style: {marginBottom: 1}}
                    ], [
                        {type: 'text-h4', value: '入库数量', style: {width: 100}},
                        {type: 'input-text', prop: 'dw', placeholder: '请输入入库数量（必填）', style: {height: 38}},
                        {type: 'br-row', style: {marginBottom: 1}}
                    ], [ 
                        {type: 'text-h4', value: '单价', style: {width: 100}},
                        {type: 'input-text', prop: 'dw', placeholder: '请输入单价（元）', style: {height: 38}},
                        {type: 'br-row', style: {marginBottom: 1}}
                    ], [ 
                        {type: 'text-h4', value: '备注', style: {width: 100}},
                        {type: 'input-text', prop: 'bz', placeholder: '请输入备注', style: {height: 38}},
                        {type: 'br-row', style: {marginBottom: 1}}
                    ], [ 
                        {type: 'text-h4', value: '是否常用', style: {flex: 1}},
                        {type: 'switch', prop: 'cy', value: '1'},
                        {type: 'br-row'}
                    ]
                ]}
            />
        );
    }
  }