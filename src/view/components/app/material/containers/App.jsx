import React, {PropTypes} from 'react'
import Component from '../../../utils/base/Component'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from '../components/Header'
import LeftDrawer from '../components/LeftDrawer'
//import /* withWidth,*/ {LARGE, SMALL} from 'material-ui/utils/withWidth'
import ThemeDefault from '../theme-default'
import Data from '../data'
import '../styles.less'
import Alert from 'react-s-alert'
import {View} from 'ea-react-dm'
import {PageControl} from '../../../../../controller/Index'
import { InterfaceApiList, DbInfoList, SystemList} from './Index'
import QueueAnim from 'rc-queue-anim'

@View(PageControl)
export default class App extends Component {

    static propTypes = {
        children: PropTypes.element,
        width: PropTypes.number
    }

    constructor(props) {
        super(props)
        const screenW = window.innerWidth
        this.state = {
            navDrawerOpen: screenW < 776 ? false : true,
            width: window.innerWidth
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.width !== nextProps.width) {
            this.setState({})
        }
    }

    handleChangeRequestNavDrawer() {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = () => {
        const screenWidth = window.innerWidth
        if (screenWidth < 776) {
            this.setState({
                navDrawerOpen: false,
                width: screenWidth
            })
        } else {
            this.setState({
                navDrawerOpen: true,
                width: screenWidth
            })
        }
    }

    toggle() {
        //const pageShow = this.getValueByReducers('PageModel.pageShow').toJS()
    }

    // pageShow() {
    //     const pageShow = this.getValueByReducers('PageModel.pageShow').toJS()
    //     return {pageShow.boxed ? [<DashboardPage {...this.props} show={pageShow.boxed}/>] : null}
    //     if (pageShow.boxed) {
    //         return <DashboardPage {...this.props} show={pageShow.boxed}/>
    //     } else if (pageShow.index) {
    //         return <InstCapitalInfo/>
    //     }
    // }

    render() {
        let {navDrawerOpen} = this.state
        const pageShow = this.getValueByReducers('PageModel.pageShow').toJS()
        const paddingLeftDrawerOpen = 236

        const styles = {
            header: {
                paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
            },
            container: {
                margin: '80px 20px 20px 15px',
                paddingLeft: navDrawerOpen && this.state.width > 776 ? paddingLeftDrawerOpen : 0
            }
        }

        return (
            <div>
                <Alert stack={true} timeout={4000}/>
                <MuiThemeProvider muiTheme={ThemeDefault}>
                    <div>
                        <Header styles={styles.header} key="header"
                                handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

                        <LeftDrawer navDrawerOpen={navDrawerOpen}
                                    menus={Data.menus}
                                    username="BlockChain-BP"/>

                        <div style={styles.container}>
                            <QueueAnim delay={pageShow.dbinfo ? 500 : 10}>
                                {pageShow.dbinfo ? <DbInfoList/> : null}
                            </QueueAnim>
                            <QueueAnim delay={pageShow.apiSystem ? 500 : 10}>
                                {pageShow.apiSystem ? <SystemList/> : null}
                            </QueueAnim>
                            <QueueAnim delay={pageShow.apiConfig ? 500 : 10}>
                                {pageShow.apiConfig ? <InterfaceApiList/> : null}
                            </QueueAnim>
                          {/*  <QueueAnim delay={pageShow.apiSystem ? 500 : 10}>
                                {pageShow.apiSystem ? <InstCapitalInfo/> : null}
                            </QueueAnim>
                           <QueueAnim delay={pageShow.dashboard ? 500 : 10}>
                                {pageShow.dashboard ? <DashboardPage {...this.props} show={pageShow.apiConfig}/> : null}
                            </QueueAnim>*/}
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}