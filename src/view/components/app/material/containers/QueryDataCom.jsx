import React from 'react'
import Component from '../../../utils/base/Component'
import {Daterangepicker} from '../../../utils/index'
import {white,pink600,purple600} from 'material-ui/styles/colors'
import InfoBox from '../components/dashboard/InfoBox'
import SelectionPage from './SelectionPage'
//import RaisedButton from 'material-ui/RaisedButton'
import { Button, Icon } from 'antd'
//import {fullWhite} from 'material-ui/styles/colors'
//import ActionArrow from 'material-ui/svg-icons/navigation/arrow-drop-down'
//import {grey300} from 'material-ui/styles/colors'
import moment from 'moment'
import {FrwkUtil} from '../../../utils/util/Index'
import Immutable from 'immutable'

export default class QueryDataCom extends Component {
    static defaultProps = {
        valueLink : '',
        callBack:function () {}
    }

    constructor(props) {
        super(props)
        this.state = {
            value:'1m-sum-zero',
            bTimer:moment().subtract(15,'minutes').format('YYYY-MM-DD HH:mm'),
            nTimer:moment().format('YYYY-MM-DD HH:mm'),
            circleTime:''
        }
    }

    handleChange(event, index, value){
        this.setState({value})
    }

    changeValue(value){
        this.setState({
            value:value
        })
    }

    changePicker(bTimer,nTimer){
        this.setState({
            bTimer:bTimer,
            nTimer:nTimer
        })
    }

    chartsdataChange(queryDataCom){
        window.console.log('this', this)
        let chartsdata = this.props.getValueByReducers(this.props, this.props.valueLink).toJS()
        for(const i in chartsdata){
            let arr = chartsdata[i]
            for(let j in arr){
                arr[j].url = '/m/rv' + FrwkUtil.UrlUtils.initParams(queryDataCom)
            }
        }
        window.console.log('chartsdata', chartsdata)
        this.props.setValueByReducers(this.props.valueLink, Immutable.fromJS(chartsdata))
    }

    handleGetDataClick(){
        window.console.log(333333333)
        //window.console.log('circleTime-------->',this.state.circleTime)
        if(this.state.circleTime != ''){
            window.console.log(11111111)
            clearInterval(this.state.circleTime)
            window.console.log('circleTime-------->',this.state.circleTime)
        }else{
            window.console.log(22222222)
        }
        const dst = this.state.value
        const startts = this.state.bTimer
        const endts = this.state.nTimer
        let queryDataCom = {}
        queryDataCom['dst'] = dst
        queryDataCom['time'] = startts
        queryDataCom['type'] = endts
        queryDataCom['timer'] = parseInt(new Date())
        this.chartsdataChange(queryDataCom)
        //window.console.log('dst------>',dst)
        //window.console.log('btimer----->',this.state.bTimer)
        //window.console.log('nTimer----->',this.state.nTimer)
    }

    circleHandleGetDataClick(){
        const timer = setInterval(this.handleGetDataClick(),5000)
        this.setState({
            circleTime:timer
        })
    }

    searchOnChange(e,v,r){
        window.console.log(e, v, r)
    }

    onChangeCallback(e, v){
        window.console.log(e,v)
    }

    render (){
        const ButtonGroup = Button.Group
        return (
            <div style={{background:white,paddingLeft:'13px',boxShadow:'0 4px 4px #ccc,2px 0 3px #ccc,-2px 0 3px #ccc',borderRadius:'5px'}}>
                <div className='row'style={{paddingTop:'15px',marginBottom:'20px'}}>

                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-4 m-b-15 '>
                        <InfoBox color={pink600} title='采样间隔' contents={<SelectionPage changeValue={this.changeValue.bind(this)}/>} style={{border:'none'}}/>
                    </div>

                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-4 m-b-15 '>
                        <InfoBox color={purple600} title='时间范围' contents={<Daterangepicker changePicker={this.changePicker.bind(this)}/>}/>
                    </div>

                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-4 m-b-15 '>
                        <div style={{position:'relative'}}>
                            <ButtonGroup>
                                <Button type="primary" style={{height:'32px',fontSize:'14px'}} onClick={::this.handleGetDataClick}>
                                    <Icon type="left" />单次查询
                                </Button>
                                <Button type="primary" style={{height:'32px',fontSize:'14px'}} onClick={::this.circleHandleGetDataClick}>
                                    自动刷新<Icon type="right" />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}





