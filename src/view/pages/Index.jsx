import React, {Component /*,PropTypes*/} from 'react'
import {Redirect, Router, Route} from 'react-router'
import {page} from 'ea-react-dm'
import History from 'history/lib/createHashHistory'
import Test from '../components/app/material/containers/apiConfig/InterfaceApiList'
import {Timeline} from '../components/utils/index'
import TestIndex from '../components/app/utils/MentionTest'
import adminlte from '@component/app/adminlte/Adminlte'
import app from '@component/app/material/containers/App'
import DaterangepickerTest from '../components/app/utils/DaterangepickerTest'
import Queueanim from '../components/app/queue-anim/Index'
import Login from '../components/logReg/Login'
import Register from '../components/logReg/Register'
import TableList from '../components/utils/table/TableList'

class AppRouter extends Component {

    constructor(props) {
        super(props)
        // Opt-out of persistent state, not recommended.
        this.history = new History({
            queryKey: false
        })
    }

    /**
     * 页面路由总览，children为外接做入口，外接入口即为AppRouter
     */
    render() {
        return (
            <div>
                <Router history={this.history}>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/app" component={app}/>
                    <Route path="/timeline" component={Timeline}/>
                    {/*<Route path="/testIndex" component={TestIndex}/>
                    <Route path="/app" component={app}/>
                    <Route path="/dateTest" component={DaterangepickerTest}/>
                    <Route path="/queueanim" component={Queueanim}/>
                    <Route path="/tab" component={TableList}/>*/}
                    <Redirect from="/" to="/login"/>
                </Router>
            </div>
        )
    }
}

export const rtools = page(AppRouter)