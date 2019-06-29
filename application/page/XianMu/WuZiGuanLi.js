import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '物资管理',
    }
    constructor(props) {
        super(props)
        this.state = {
            data: datas.XianMu
        }
    }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => {
                    if (params.prop == 'ruku')
                        this.props.navigation.push('RuKu')
                }}
                columns={[
                    [
                        [
                            {type: 'image', value: require('../../assets/ruku.png'), style: {width: 38, height: 38, marginBottom: 8}},
                            {type: 'text-h3', value: '入库'},
                            {type: 'click', prop: 'ruku', style: {flex: 1, align: 'center'}}
                        ], 
                        {type: 'text', value: '', style: {height: 88, width: 1, backgroundColor: '#f5f5f5'}},
                        [
                            {type: 'image', value: require('../../assets/chuku.png'), style: {width: 38, height: 38, marginBottom: 8}},
                            {type: 'text-h3', value: '出库'},
                            {type: 'click', style: {flex: 1, align: 'center'}}
                        ],
                        {type: 'br-row', style: {marginBottom: 2}}
                    ], [
                        {type: 'text-h4', value: '库存', style: {flex: 1}},
                        {type: 'image-icon', value: require('../../assets/right.png')},
                        {type: 'click-row', style: {marginBottom: 1}}
                    ], [
                        {type: 'text-h4', value: '入库记录', style: {flex: 1}},
                        {type: 'image-icon', value: require('../../assets/right.png')},
                        {type: 'click-row', style: {marginBottom: 1}}
                    ], [
                        {type: 'text-h4', value: '出库记录', style: {flex: 1}},
                        {type: 'image-icon', value: require('../../assets/right.png')},
                        {type: 'click-row', style: {marginBottom: 1}}
                    ], [
                        {type: 'text-h4', value: '分类管理', style: {flex: 1}},
                        {type: 'image-icon', value: require('../../assets/right.png')},
                        {type: 'click-row'}
                    ],
                ]}
            />
        );
    }
  }