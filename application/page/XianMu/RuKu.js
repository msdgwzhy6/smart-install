import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, ScrollView} from 'react-native'
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton} from 'react-native-popup-dialog';

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: '入库',
        headerRight: <Freedomen.Region 
            event={params => {
                navigation.push('XinJianWuZi')
            }}
            columns={[
                {type: 'button-image', value: require('../../assets/tianjia.png'), style: {width: 28, height: 28, marginRight: 12}}
            ]}
        />
    }}
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            list: [],
            activity: 'full',
            kinds: {kinds:[{kind: '全部分类'}, {kind: '分类1'}, {kind: '分类2'}, {kind: '分类3'}]}
        }
         
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                list: [{}, {}, {}]
            })
        }, 600);
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    columns={[
                        {type: 'text-h4', value: '查看有库存'},
                        [
                            {type: 'image-icon', value: require('../../assets/ss.png')},
                            {type: 'input-text', prop: 'name', placeholder: '请输入名称、规格', style: {flex: 1}},
                            {type: 'br', style: {backgroundColor: '#f5f5f5', flexDirection: 'row', alignItems: 'center', flex: 1, padding: 5, marginLeft: 10, borderRadius: 5}}
                        ],
                        {type: 'br-row', style: {padding: 5, paddingLR: 10}}
                    ]}
                />
                <View style={{flex: 1, backgroundColor: '#f5f5f5', flexDirection: 'row', marginTop: 1 }}>
                    <Freedomen.Region 
                       
                        style={{width: 88, marginRight: 1}}
                        columns={[
                            {type: 'scroll', prop:'kinds', value: [{},{},{}], style: {flex: 1}, columns: [
                                {type: 'button-text', prop: 'kind', value: '全部分类' }
                            ]}
                        ]}
                    /> 
                    <View style={{flex: 1}}>
                        <Freedomen.FreshList 
                            event={params => {
                                this.setState({
                                    visible: true
                                })
                            }}
                            data={this.state.list}
                            columns={[
                                [
                                    {type: 'text-h4', value: '螺丝刀'},
                                    {type: 'text-label', value: 7, filter: value => `库存： ${value}`},
                                    {type: 'br', style: {flex: 1}}
                                ], 
                                {type: 'button-image', value: require('../../assets/tj.png'), style: {width: 32, height: 32}},
                                {type: 'br-row', style: {marginBottom: 1}}
                            ]}
                        />
                    </View>
                </View>
                <Freedomen.Region 
                    style={{height: 52, backgroundColor: 'white', alignItems: 'center'}}
                    event={params => {
                        
                    }}
                    columns={[
                        {type: 'button-image', value: require('../../assets/xuanhao.png'), style: {width: 32, height: 32}},
                        {type: 'text-badge', value: 12, style: {marginTop: -22}},
                        {type: 'text', value: '', style: {flex: 1}},
                        {type: 'button-primary', value: '选好了', style: {width: 115, height: 36, padding: 5, borderRadius: 28}},
                        {type: 'br-row', style: {height: 52}}
                    ]}
                />  
                <Dialog
                    visible={this.state.visible} 
                    dialogTitle={<DialogTitle title="螺丝刀" />}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                    footer={
                    <DialogFooter>
                        <DialogButton 
                            text="取消"
                            textStyle={{color: '#ccc'}}
                            onPress={() => {
                                this.setState({ visible: false });
                            }}
                        /> 
                        <DialogButton
                            textStyle={{color: '#2EBBC4'}}
                            text="确定"
                            onPress={() => {
                                this.setState({ visible: false });
                            }}
                        /> 
                    </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Freedomen.Region 
                            columns={[
                                [
                                    {type: 'text-h4', value: '数量:'},
                                    {type: 'counter', prop: 'counter', value: 1, style: {marginLR: 20}},
                                    {type: 'text-h4', value: '把'},
                                    {type: 'br-row'}
                                ],[
                                    {type: 'text-h4', value: '单价:'},
                                    {type: 'input-text', value: '0', prop: 'price', style: {marginLR: 20, borderRadius: 5, alignItems: 'center', borderWidth: .6, paddingLeft: 12, width: 115,  alignItems: 'center', borderColor: '#ccc'}},
                                    {type: 'text-h4', value: '元'},
                                    {type: 'br-row'}
                                ] 
                            ]}
                        />
                    </DialogContent>
                </Dialog>
            </View>
            
        );
    }
  }