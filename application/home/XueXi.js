import React from 'react'
import {Text} from "react-native";
import Freedomen from 'react-native-freedomen'
export default  class  extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Freedomen.Region 
                event={params => {
                    if (params.prop == 'scsl')
                        this.props.navigation.navigate('WoDeRenWu')
                }}
                columns={[
                    {type: 'button-primary', value: '实测实量',prop: 'scsl'}
                ]}
            />
        );
    }
  }