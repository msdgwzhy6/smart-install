import React from 'react'
import {Text, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../region/columns'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '资讯'
      }
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                list: [{}, {}, {}]
            })
        }, 400);
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.FreshList 
                    data={this.state.list}
                    columns={columns.ZiXunItem}
                />
             </View>
        );
    }
  }