import React from 'react'
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '新建任务',
            headerRight: <Freedomen.Region 
                event={params => { slidePop.show() }}
                columns={[
                    {type: 'button-text', value: '保存', style: {marginRight: 12}}
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <Freedomen.Region 
                columns={[
                    [
                        {type: 'text-h3', value: '项目', style: {flex: 1}},
                        {type: 'text', value: '请选择'},
                        {type: 'image-icon', value: require('../../assets/right.png')},
                        {type: 'click-row'}
                    ]
                ]}
            />
        );
    }
  }