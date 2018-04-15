import React, {Component /*,PropTypes*/} from 'react'
import {Head, Footer} from 'ea-head'
import {Grid, Tabset, Tab} from 'eagle-ui'
import QueueAnimTest from './QueueAnimTest'
import LogoGather from './LogoGather'

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
                    <Tabset activeTab={this.state.tabIndex} tabCallback={::this.callback}>
                        <Tab heading='QueueAnimTest' key="1">
                            <QueueAnimTest />
                        </Tab>

                        <Tab heading='LogoGather' key="2">
                            <LogoGather />
                        </Tab>
                    </Tabset>
                </Grid>
                <Footer content='2017'/>
            </div>
        )
    }
}