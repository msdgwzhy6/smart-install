import React from 'react' 
import Freedomen from 'react-native-freedomen'
import {ScrollView} from 'react-native'
import columns from '../region/columns'
import datas from '../region/datas'
const Md5 = require('js-md5')
export default  class  extends React.Component {
    constructor(props) {
        super(props) 
    }
    componentWillMount() {
        let  param =  {
            username: 'wqer',
            password: Md5('123456')
        } 
        Freedomen.global.api.post('api/user/login', param).then(res => {
            console.warn('登录成功')    
            Freedomen.global.project = {projectId: 79}        
        }) 
    }
    render() {
        return (
            <ScrollView style={{flex: 1,  backgroundColor: 'white'}} showsVerticalScrollIndicator={false}>
                {
                    datas.YinYon.map((el, key) => {
                        return <Freedomen.Region 
                            key={key}
                            data={el}
                            event={params => { 
                                if (params.value.row.label == '物资')
                                    this.props.navigation.navigate('WuZiGuanLi')
                                else if (params.value.row.label == '实测实量')
                                    this.props.navigation.navigate('WoDeRenWu')
                            }}
                            columns={ columns.YinYon }
                        />
                    })
                }
            </ScrollView>
        );
    }
  }