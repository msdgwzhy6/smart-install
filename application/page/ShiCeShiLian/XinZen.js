import React from 'react'
import {Text, View, Platform} from "react-native";
import Freedomen from 'react-native-freedomen'
import WebView from 'react-native-webview' 

export default  class  extends React.Component {
    static navigationOptions = {
        title: '新增描点'
      }
    constructor(props) {
        super(props)
        this.state = {
         
            
        }
    }
    componentDidMount() {
        this.webView.postMessage(JSON.stringify({key: 'msg123', value: 15}))

    }
    render() { 
        const injectedJavascript = `(function() {
            window.postMessage = function(data) {
                    window.ReactNativeWebView.postMessage(data);
                };
            })(); 
            
            start('http://img1.imgtn.bdimg.com/it/u=338326248,1383158485&fm=26&gp=0.jpg', true)
        `;
        
        const source = (Platform.OS == 'ios') ? require('../../html/index.html') : { uri: 'file:///android_asset/html/index.html' }

        return (
            <View style={{flex: 1}}>
               <WebView 
                    injectedJavaScript={injectedJavascript} 
                    ref={ref => {this.webView = ref}}  
                    javaScriptEnabled={true}  
                    useWebKit={true} 
                    source={source} 
                    onMessage={e => {
                        alert(JSON.stringify(e.nativeEvent.data))
                    }} 
                /> 
            </View>
        );
    }
  }