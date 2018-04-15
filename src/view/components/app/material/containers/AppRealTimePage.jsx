import React from 'react'
import Component from '../../../utils/base/ComponentAlert'
import {ReactEchartsPlus} from '../../../utils/index'
import globalStyles from '../styles'
import {View} from 'ea-react-dm'
import {PageControl} from '../../../../../controller/Index'
import QueryDataCom from './QueryDataCom'

@View(PageControl)
export default class AppRealTimePage extends Component {

    render() {
        const _this = this
        window.console.log('_this------->',_this)
        const chartsdata = this.getValueByReducers('PageModel.chartsdata')
        return (
            <div>
                <h1 style={globalStyles.navigation}>APP实时监控</h1>
                <QueryDataCom />
                {
                    chartsdata.map((v,i)=>{
                        return <div className='row' key={i}>
                            {
                                v.map((item, j)=>{
                                    //window.console.log('item----->',item)
                                    return <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15' key={j}>
                                        <ReactEchartsPlus {..._this.props} url={item.get('url')} title={item.get('title')} theme={item.get('theme')} lengendData={item.get('lengendData')} style={{borderRadius:'5px'}}/>
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
        )
    }
}