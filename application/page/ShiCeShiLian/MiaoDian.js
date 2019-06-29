import React from 'react'
import {Text, ScrollView, View, Platform} from "react-native";
import Freedomen from 'react-native-freedomen'
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import WebView from 'react-native-webview'

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title:  navigation.state.params.label
        }
      }
    constructor(props) {
        super(props)
        this.state = {
            activity: 'cld',
            visible: false,
            injectedJavascript: '',
            cl: {counter: '已测：0 / 0'}
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.slidePop.show()
        }, 1200);
        Freedomen.global.api.get('api/paperPointInfo/getPaperPointInfoList', {
            projectId: Freedomen.global.project.projectId,
            siteId: this.props.navigation.state.params.siteId
        }).then(res => {
            let yc = res.info.filter((el, key) => {
                return el.status
            }).length
            this.setState({
                cl: {counter: '已测：' + yc + ' / ' + res.info.length},
                injectedJavascript: `(function() {
                    window.postMessage = function(data) {
                            window.ReactNativeWebView.postMessage(data);
                        };
                    })(); 
                    
                    start('${res.paperUrl}', false, [{x: 110, y: 100}, {x: 160, y: 160}]);
                `
            })
        })
    }

    render() {
        let style = (w) => {
            let color = this.state.activity == w ? '#2EBBC4' : undefined
            return {
                color: color,
                borderBottomWidth: color?2:0,
                padding: color ? 3 : 5,
                marginLR: 10,
                borderBottomColor: color
            }
        }
        const source = (Platform.OS == 'ios') ? require('../../html/index.html') : { uri: 'file:///android_asset/html/index.html' }
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    event={params => {
                        this.setState({
                            activity: params.prop
                        })
                    }}
                    data={this.state.cl}
                    columns={[
                        {type: 'button-text', prop: 'cld', value: '测量点', style: () => { return style('cld') }},
                        {type: 'button-text', prop: 'bd', value: '爆点', style: () => { return style('bd') }},
                        {type: 'text', prop: 'counter', load: () => this.state.activity == 'cld', style: {flex: 1,  alignItems: 'flex-end'}},
                        {type: 'br-row', style: {marginTB: 1, paddingBottom: 1}}
                    ]}
                />
                <View style={{flex: 1}}>
                    <WebView 
                        injectedJavaScript={this.state.injectedJavascript} 
                        ref={ref => {this.webView = ref}}  
                        javaScriptEnabled={true}  
                        useWebKit={true} 
                        source={source} 
                        onMessage={e => {
                            alert(JSON.stringify(e.nativeEvent.data))
                        }} 
                    /> 
                </View>
                <Freedomen.Region 
                    event={params => {
                        if (params.prop == 'bdqd')
                            this.props.navigation.push('ShiCeShiLian', {activity: 't2'})
                        else if (params.prop == 'ztsm')
                            this.setState({ visible: true })
                        else if (params.prop == 'xzmd')
                            this.props.navigation.push('XinZen')
                    }}
                    columns={[
                        {type: 'button-text', prop: 'xzmd', value: '新增描点', style: {color: '#2EBBC4', width: '33', align: 'center'}},
                        {type: 'button-text', prop: 'bdqd', value: '爆点清单', style: {color: '#2EBBC4', width: '33', align: 'center'}},
                        {type: 'button-text', prop: 'ztsm', value: '状态说明', style: {color: '#2EBBC4', width: '33', align: 'center'}},
                        {type: 'br-row',  }
                    ]}
                />
                <Dialog
                    visible={this.state.visible} 
                    dialogTitle={<DialogTitle title="图钉颜色说明" />}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                    footer={
                    <DialogFooter>
                        <DialogButton
                        textStyle={{color: '#2EBBC4'}}
                        text="知道了"
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
                                    {type: 'image-icon', value: require('../../assets/q.png')},
                                    {type: 'text-h4', value: '该处暂无需要检测的检查项'},
                                    {type: 'br-row'}
                                ],[
                                    {type: 'image-icon', value: require('../../assets/xyjc.png')},
                                    {type: 'text-h4', value: '该处需要检测'},
                                    {type: 'br-row'}
                                ],[
                                    {type: 'image-icon', value: require('../../assets/okweizhi.png')},
                                    {type: 'text-h4', value: '该处已完成检测'},
                                    {type: 'br-row'}
                                ],
                            ]}
                        />
                    </DialogContent>
                </Dialog>
                <Freedomen.SlidePop ref={ref => this.slidePop = ref}  style={{'top': '38', backgroundColor: '#f5f5f5'}} noCover>
                <View>
                  
                </View>
                    <ScrollView>
                        <Text>ddd</Text>
                    </ScrollView>
                </Freedomen.SlidePop>
            </View>
        );
    }
  }