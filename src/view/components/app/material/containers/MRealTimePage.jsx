import React from 'react'
import Component from '../../../utils/base/ComponentAlert'
import {ReactEchartsPlus} from '../../../utils/index'
import globalStyles from '../styles'
import {View} from 'ea-react-dm'
import {PageControl} from '../../../../../controller/Index'
// import {Daterangepicker} from '../../../utils/index'
// import {SplitButton,MenuItem} from 'react-bootstrap'
import QueueAnim from 'rc-queue-anim'
import QueryDataCom from './QueryDataCom'

@View(PageControl)
export default class MRealTimePage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const _this = this
        const chartsdata = this.getValueByReducers('PageModel.chartsdata')
        //window.console.log('MRealTimePage', chartsdata.toJS())
        return (
            <div>
                <h1 style={globalStyles.navigation}>M实时监控</h1>
                <QueryDataCom valueLink='PageModel.chartsdata' {..._this.props}
                              getValueByReducers={::this.getValueByReducers}
                              setValueByReducers={::this.setValueByReducers}/>
                <QueueAnim animConfig={[
                    {opacity: [2, 0], translateY: [0, 80]},
                    {opacity: [2, 0], translateY: [0, -80]}
                ]}>
                    {
                        chartsdata.map((v, i) => {
                            return <div className='row' key={i}>
                                {
                                    v.map((item, j) => {
                                        //window.console.log(item.get('title'), item.get('lengendData').toJS())
                                        return <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15' key={j}>
                                            <ReactEchartsPlus {..._this.props} url={item.get('url')}
                                                              title={item.get('title')} theme={item.get('theme')}
                                                              lengendData={item.get('lengendData')}/>
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </QueueAnim>
            </div>
        )
    }
}