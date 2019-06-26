import React from 'react'
import Image from '../FdImage'
import {TouchableWithoutFeedback, Modal, View} from 'react-native' 
// import ImageViewer from 'react-native-image-zoom-viewer'

import util from '../../utils/util'
const styleItems = [
    'margin',
    'marginLeft',
    'marginRight',
    'marginBottom',
    'marginTop',
    'padding',
    'paddingLeft',
    'paddingRight', 
    'paddingTop', 
    'paddingBottom', 

]
class FdImage extends React.Component {
    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            value: item.value, 
            style: item.style,
            data: item.$data,

            visible: false
        }

        this.images = this._setImages(item.value)
    }

    _setImages = (value) =>{
        return value.map(el => {
            if (typeof el == "number") {
                return {
                    props: {
                        url: '',
                        source: el
                    }
                }
            } else {
                return {url: (this.props.item.baseUrl || '') + el}
            }
        })
    }
    _fresh = (data) => {
        this.setState(data)
    }

    componentWillReceiveProps(nextProps) { 
        this.setState({
            value: nextProps.item.value
        }, () => {
            this.images = this._setImages(nextProps.item.value)
        })
    } 
    _press = (value, type) => {
        if (type == 'press') 
        this.setState({
            visible: !this.state.visible
        })

        this.props.event && this.props.event({type: type, prop: this.props.item.prop, value: value})
    }
    render () {
        return ( 
            <View style={{flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
            {
                (this.state.value || []).map((ret, key) => {
                    return <TouchableWithoutFeedback 
                            onPress={() => {this._press(ret, 'press')}} 
                            onPressIn={() => {this._press(ret, 'pressIn')}}
                            onPressOut={() => {this._press(ret, 'pressOut')}}
                            onLongPress={() => {this._press(ret, 'longPress')}}
                            key={key}>
                        <View style={[ util.makeStyle(this.state.style, ...styleItems)]}>
                            <Image item={{
                                value: ret, 
                                style: this.state.style, 
                                filter: this.props.item.filter, 
                                $data: this.state.$data}} />
                        </View>
                    </TouchableWithoutFeedback>
                })
            }
            {/* <Modal visible={this.state.visible} transparent={true}>
                <ImageViewer imageUrls={this.images}/>
            </Modal> */}
            </View>
        )
    }
}

export default FdImage