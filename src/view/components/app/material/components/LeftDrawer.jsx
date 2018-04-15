import React, {PropTypes} from 'react'
import Component from '../../../utils/base/Component'
import Drawer from 'material-ui/Drawer'
import {spacing, typography} from 'material-ui/styles'
import {white, blue600} from 'material-ui/styles/colors'
import {Sidebar} from 'react-adminlte-dash'
import './LeftDrawer.less'
import {View} from 'ea-react-dm'
import {PageControl, UserControl} from '../../../../../controller/Index'
import QueueAnim from 'rc-queue-anim'
import Immutable from 'immutable'
import {DataUtil} from '../../../utils/util/Index'
import {storageCode} from '../../../../../model/base/BaseModel'

@View([UserControl, PageControl])
export default class LeftDrawer extends Component {
    static propTypes = {
        navDrawerOpen: PropTypes.bool,
        menus: PropTypes.array,
        username: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.props.loadUserMenus({id: 123456}, this, this.loadUserMenusCallBack)
        this.state = {
            menus: [],
            open: false
        }
    }

    loadUserMenusCallBack(_this, data){
        DataUtil.setLocalStorageData(storageCode.loadUserMenustorageCode, data)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({open: nextProps.navDrawerOpen})
    }

    changePage(page) {
        let pageShow = this.getValueByReducers('PageModel.pageShow').toJS()

        const initPage = (page) => {
            for (const key in pageShow) {
                if (key == page) {
                    pageShow[key] = true
                } else {
                    pageShow[key] = false
                }
            }
        }

        initPage(page)

        // switch (page) {
        //     case 'index':
        //         initPage('index')
        //         window.console.log('index-------->' + page)
        //         break
        //     case 'boxed':
        //         initPage('boxed')
        //         window.console.log('boxed-------->' + page)
        //         break
        // }

        this.setValueByReducers('PageModel.pageShow', Immutable.fromJS(pageShow))
    }

    createSidebarChildren() {
        //window.console.log(('createSidebarChildren menus------------>', this.props.usermodel.get('menus')))
        return this.props.usermodel.get('menus').map((item, i) => {
            //window.console.log(item, i)
            item = item.toJS()
            return <Sidebar.Menu header={item.header} key={i}>
                {
                    item.items.map((item, j) => {
                        return <Sidebar.Menu.Item
                            icon={{className: 'fa-files-o'}}
                            title={item.title}
                            key={j}>
                            {
                                item.children.map((c, n) => {
                                    return <Sidebar.Menu.Item title={c.title} key={n}
                                                              onClick={() => this.changePage(c.href)}/>
                                })
                            }
                        </Sidebar.Menu.Item>
                    })
                }
            </Sidebar.Menu>
        })
    }
    onRequestChange(open) {
        window.console.log('open------>', open)
        //this.setState({open: open})
    }

    handleToggle() {
        this.setState({open: !this.state.open})
    }

    render() {
        const _this = this
        const styles = {
            logo: {
                cursor: 'pointer',
                fontSize: 22,
                color: typography.textFullWhite,
                lineHeight: `${spacing.desktopKeylineIncrement}px`,
                fontWeight: typography.fontWeightLight,
                backgroundColor: blue600,
                paddingLeft: 40,
                height: 56,
            },
            menuItem: {
                color: white,
                fontSize: 14
            },
            avatar: {
                div: {
                    padding: '15px 0 20px 15px',
                    backgroundImage: 'url(' + require('../images/material_bg.png') + ')',
                    height: 45
                },
                icon: {
                    float: 'left',
                    display: 'block',
                    marginRight: 15,
                    boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
                },
                span: {
                    paddingTop: 12,
                    display: 'block',
                    color: 'white',
                    fontWeight: 300,
                    textShadow: '1px 1px #444'
                }
            }
        }
        //const menus = this.getValueByReducers('UserModel.menus').toJS()
        //window.console.log('createSidebarChildren menus------------>', menus)
        return (
            <div className="leftDrawer">
                <Drawer docked={true}
                        width={220}
                        ref={e => _this.Drawer = e}
                        open={this.state.open}
                        disableSwipeToOpen={true}
                        onRequestChange={this.onRequestChange.bind(this)}
                        containerStyle={{overflow: 'hidden'}}>
                    <QueueAnim>
                        <div key="k01" style={styles.logo}>BlockChain-BP</div>
                        <div key="k02" style={styles.avatar.div}>
                            <span style={styles.avatar.span}>{this.props.username}</span>
                        </div>
                        <div key="k03" style={{height: '10px'}}/>
                        <div key="k04" className="scrollbar">
                            {this.createSidebarChildren()}
                        </div>
                    </QueueAnim>
                </Drawer>
            </div>
        )
    }
}
