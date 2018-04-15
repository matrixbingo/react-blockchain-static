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

export default class Material extends Component {
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
                    <Tabset activeTab={this.state.tabIndex} tabCallback={::this.callback}>
                        <Tab heading='TextArea' key="1">
                            <LazyLoad>
                                <TextArea />
                            </LazyLoad>
                        </Tab>
                        <Tab heading='InputPuls' key="2">
                            <InputPulsTest />
                        </Tab>
                        <Tab heading='RadioPuls' key="3">
                            <RadioPulsTest />
                        </Tab>
                        <Tab heading='SelectPulsTest' key="4">
                            <SelectPulsTest />
                        </Tab>
                        <Tab heading='CalenderPanelPulsTest' key="5">
                            <CalenderPanelPulsTest />
                        </Tab>
                        <Tab heading='AlertContainerTest' key="6">
                            <LazyLoad>
                                <AlertContainerTest />
                            </LazyLoad>
                        </Tab>
                        <Tab heading='AlertTest' key="7">
                            <AlertTest />
                        </Tab>
                        <Tab heading='SpinTest' key="8">
                            <SpinTest />
                        </Tab>
                        <Tab heading='ButtonTest' key="9">
                            <ButtonTest />
                        </Tab>
                        <Tab heading='DropDownSuggestionTest' key="10">
                            <DropDownSuggestionTest />
                        </Tab>
                    </Tabset>
                </Grid>
                <Footer content='2017'/>
            </div>
        )
    }
}