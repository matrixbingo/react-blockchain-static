import React, {Component /*,PropTypes*/} from 'react'
import {Head, Footer} from 'ea-head'
import {Grid, Tabset, Tab} from 'eagle-ui'
import TextArea from './TextAreaTest'
import InputPulsTest from './InputPulsTest'
import RadioPulsTest from './RadioPulsTest'
import SelectPulsTest from './SelectPulsTest'
import CalenderPanelPulsTest from './CalenderPanelPulsTest'
import AlertContainerTest from './AlertContainerTest'
import AlertTest from './alert/AlertTest'
import LazyLoad from 'react-lazyload'
import SpinTest from './antd/SpinTest'
import ButtonTest from './ButtonTest'
import DropDownSuggestionTest from './DropDownSuggestionTest'
import DaterangepickerTest from './DaterangepickerTest'
import DatetimerangepickerTest from './DatetimerangepickerTest'
import QueueAnim from 'rc-queue-anim'
import TableTest from './TableTest'
import MentionTest from './MentionTest'
import TimelineTest from './TimelineTest'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0
        }
    }

    callback() {
        //window.console.log('i', index)
    }

    render() {
        const logo = {
            className: 'null',
            title: 'EA'
        }

        return (
            <div>

                <Head logo={logo}/>
                <Grid>
                    <QueueAnim animConfig={[
                        {opacity: [2, 0], translateY: [0, 80]},
                        {opacity: [2, 0], translateY: [0, -80]}
                    ]}>
                        <Tabset activeTab={this.state.tabIndex} tabCallback={::this.callback}>
                            <Tab heading='TextArea' key="1">
                                <LazyLoad>
                                    <TextArea/>
                                </LazyLoad>
                            </Tab>
                            <Tab heading='InputPuls' key="2">
                                <InputPulsTest/>
                            </Tab>
                            <Tab heading='RadioPuls' key="3">
                                <RadioPulsTest/>
                            </Tab>
                            <Tab heading='SelectPulsTest' key="4">
                                <SelectPulsTest/>
                            </Tab>
                            <Tab heading='CalenderPanelPulsTest' key="5">
                                <CalenderPanelPulsTest/>
                            </Tab>
                            <Tab heading='AlertContainerTest' key="6">
                                <LazyLoad>
                                    <AlertContainerTest/>
                                </LazyLoad>
                            </Tab>
                            <Tab heading='AlertTest' key="7">
                                <AlertTest/>
                            </Tab>
                            <Tab heading='SpinTest' key="8">
                                <SpinTest/>
                            </Tab>
                            <Tab heading='ButtonTest' key="9">
                                <ButtonTest/>
                            </Tab>
                            <Tab heading='DropDownSuggestionTest' key="10">
                                <DropDownSuggestionTest/>
                            </Tab>
                            <Tab heading='DaterangepickerTest' key="11">
                                <DaterangepickerTest/>
                            </Tab>
                            <Tab heading='PredefinedRanges' key="12">
                                <DatetimerangepickerTest/>
                            </Tab>
                            <Tab heading='TableTest' key="13">
                                <TableTest/>
                            </Tab>
                            <Tab heading='MentionTest' key="14">
                                <MentionTest/>
                            </Tab>
                            <Tab heading='TimelineTest' key="15">
                                <TimelineTest/>
                            </Tab>
                        </Tabset>
                    </QueueAnim>
                </Grid>
                <Footer content='2017'/>

            </div>
        )
    }
}