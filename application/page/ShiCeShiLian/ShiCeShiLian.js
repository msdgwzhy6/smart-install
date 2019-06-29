import React from 'react'
import {Text, ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '实测实量'
    }
    constructor(props) {
        super(props) 
        this.state = {  
            layer: 0,
            list: [[]],
            activity: 'dbsx',
            guolv: {},
            bdqdList: [],
            plzp: true
        }
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
            let guolv = this.state.guolv
            guolv.jianchaxian = res[0]
            guolv.cequleixin = res[1]
            this.setState({
                list:[res[1]],
                guolv: guolv
            })
        }) 
        this.bdqdParams = {status: 0}
        this._loadBdqd()
    } 
    _loadBdqd() {
        Freedomen.global.api.get('api/measuredProblem/getMeasuredProblemByProjectId', {
            projectId: Freedomen.global.project.projectId,
            status: this.bdqdParams.status,
            bfmIds: this.bdqdParams.bfmIds,
            checkTypeIds: this.bdqdParams.checkTypeIds
        }).then(res => {
            this.setState({
                bdqdList: res
            })
        }) 
    }
    _t1() {
        return <View>
            {
                this.state.layer > 0 ? 
                <Freedomen.Region 
                    event={params => {
                        this.setState({
                            layer: 0
                        })
                    }}
                    columns={[
                        {type: 'image-icon', value:  require('../../assets/back.png')},
                        {type: 'text-h4', prop: 'name',  value: '返回'},
                        {type: 'click-row', style: { marginTB: 2}}
                    ]}
                />: null
            }
            <ScrollView>
                {
                    this.state.list[this.state.layer].map((el, key) => {
                        return <Freedomen.Region key={key}
                            event={params => { 
                                if (params.prop == 'miaodian') {
                                    params.row.label = '#' + this.current.bName + '/' + params.row.siteName + 'F'
                                    this.props.navigation.push('MiaoDian', params.row)
                                } else if (params.prop == 'loucen') {
                                    this.current = params.row
                                    Freedomen.global.api.get('api/measuredSite/getMeasuredSiteListByBuildingId', {
                                        buildingId: params.row.bfmId
                                    }).then(res => {
                                        let list = this.state.list
                                        list[1] = res
                                        this.setState({
                                            layer: 1,
                                            list: list
                                        })
                                    })
                                }
                            }}
                            data={el}
                            columns={[
                                [
                                    {type: 'text-h3', prop: 'bName'},
                                    // {type: 'text-label', value: '8', filter: value => `爆点数量:${value}`},
                                    {type: 'click-row', prop: 'loucen', style: {marginTB: 1}, load: value => this.state.layer === 0}
                                ], [ 
                                    {type: 'text-h3', prop: 'siteName'},
                                    // {type: 'text-label', value: '8', filter: value => `爆点数量:${value}`},
                                    {type: 'click-row', prop: 'miaodian', style: {marginTB: 1}, load: value => this.state.layer !== 0}
                                ]
                            ]}
                        />
                    })
                }
            </ScrollView>
        </View>
    }
    _t2() {
        return  <View style={{flex: 1}} >
            <Freedomen.Region 
                event={params => {
                    if (params.prop == 'shaixuan') {
                        this.refs.slidePop.show()
                    } else {
                        this.bdqdParams.status = params.value == '待办事项' ? 0 : 1
                        this._loadBdqd()
                        this.setState({
                            activity: params.value == '待办事项' ? 'dbsx' : 'wtdt',
                        })
                    }
                }}
                columns={[ 
                    [
                        {type: 'tags', value: '待办事项', options: '待办事项,问题动态', style: {borderWidth: 0, color: '#191919', flex: 1}},
                        {type: 'br', style: {flex: 1, marginLeft: 48}}
                    ],
                    {type: 'button-image', prop: 'shaixuan', value: require('../../assets/w.png'), style: {width: 24, height: 24, marginLR: 12}},
                    {type: 'br-row', style: {padding: 5, marginBottom: 1}}
                ]}
            />
            <View style={{flex: 1}}>
            {
                this.state.activity == 'dbsx' ? 
                    <Freedomen.Region 
                        style={{height: 42, backgroundColor: 'white'}}
                        event={params => {
                            if (params.value === '0')
                                this.setState({plzp: true})

                            this.bdqdParams.status = params.value
                            this._loadBdqd(params.value)
                        }}
                        columns={[
                            {type: 'select', options: {'0': '待指派',  '2': '待验收'}}
                        ]}
                    /> 
                :   null
            }
            <ScrollView>
                {
                    this.state.bdqdList.map((el, index) => {
                        return <Freedomen.Region 
                            event={params => {
                                if (params.prop == 'contain' && params.row.status === 0)
                                    this.props.navigation.push('WenTiXianQin', params.row)
                                else if (params.prop == 'status' && params.value === 0)
                                    this.props.navigation.push('SC_ZhiPai', params.row)
                                else if (params.prop == 'contain' && (params.row.status === 1 || params.row.status === 2)) {
                                    params.row.label = params.row.status === 1 ? '进行中': '待验收'
                                    this.props.navigation.push('SC_JinXinZhon', params.row)
                                }
                            }}
                            data={el}
                            key={index}
                            columns={[
                                {type: 'text-h3', prop: 'title'},
                                {type: 'button-text', prop: 'status', prop: 'status', filter: {'0': '指派',  1: '详情', 2: '验收'}, style: {alignItems: 'flex-end', color: '#2EBBC4', marginBottom: 6}},
                                [ 
                                    {type: 'text-h4', filter: (value, data) => {
                                        return {'0': '待指派',  '1': '进行中', '2': '待验收'}[data.status + '']
                                    }, style: {borderTopColor: '#f5f5f5', borderTopWidth: 1, color: '#FF7800', paddingTB: 6}},
                                    {type: 'text-h5', prop: 'content', value: '美人如此多群里'},
                                    {type: 'text', prop: 'contentDetail', value: 'fadjsl;kfjaslfj'},
                                    {type: 'click', prop: 'contain'}
                                ],
                                {type: 'br', style: {backgroundColor: 'white', margin: 5, borderRadius: 5, padding: 15}}
                            ]}
                        />
                    })
                }
            </ScrollView>
            </View>
            {
                this.state.activity == 'dbsx' && this.state.plzp ? 
                    <Freedomen.Region
                    style={{height: 52, backgroundColor: 'white'}}
                    columns={[
                        {type: 'button-text', value: '批量指派', style: {color: '#2EBBC4', height: 52, align: 'center', width: '100'}}
                    ]} /> 
                : null
            }
            <Freedomen.SlidePop style={{backgroundColor: 'white', left: 120}} ref="slidePop">
                <Freedomen.Region 
                    data={this.state.guolv}
                    columns={[
                        {type: 'tags', prop: 'jc', value: false, options: '检查结果不一致', style: {marginLeft: 5, marginTop: 15}},
                        ...columns.GuoLv
                    ]}
                />
            </Freedomen.SlidePop>
        </View>
    }
    render() {
        return (
            <Freedomen.Tab   
                columns={[
                    {prop: 't1', value: '按区域排列', view: this._t1()},
                    {prop: 't2', value: '爆点清单', view: this._t2()}
                ]}
            />
        );
    }
  }