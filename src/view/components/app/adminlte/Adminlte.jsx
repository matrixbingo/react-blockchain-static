import React, {Component /*,PropTypes*/} from 'react'
import { Dashboard, Header,Sidebar } from 'react-adminlte-dash'
import tinycolor from 'tinycolor2'
import user2 from './user2.jpg'
import Index from '../utils/Index'
//import _ from 'underscore'

export default class Adminlte extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0
        }
    }
    pickTheme(type){
        return type
    }
    
    createSidebarChildren(){
/*        const data = [
            {
                header: '实时监控',
                className:'fa-dashboard',
                items:[
                    {
                        className:'fa-files-o',
                        title:'Layout Optqeqeqeqeions',
                        children:[
                            {title:'Top Navigation', href:'/boxed'},
                            {title:'Fixed', href:'/boxed'}
                        ]
                    },
                    {
                        className:'fa-files-o',
                        title:'Layout Options qqeqeqe',
                        children:[
                            {title:'Top Navigation', href:'/boxed'},
                            {title:'Fixed', href:'/boxed'}
                        ]
                    },
                    {
                        className:'fa-files-o',
                        title:'Layout Options',
                        children:[
                            {title:'Top Navigation', href:'/boxed'},
                            {title:'Fixed', href:'/boxed'}
                        ]
                    }
                ]
            },
            {
                header: '实时监控',
                className:'fa-dashboard',
                items:[
                    {
                        className:'fa-files-o',
                        title:'Layout Options',
                        children:[
                            {title:'Top Navigation', href:'/boxed'},
                            {title:'Fixed', href:'/boxed'}
                        ]
                    },
                    {
                        className:'fa-files-o',
                        title:'Layout Options',
                        children:[
                            {title:'Top Navigation', href:'/boxed'},
                            {title:'Fixed', href:'/boxed'}
                        ]
                    },
                    {
                        className:'fa-files-o',
                        title:'Layout Options',
                        children:[
                            {title:'Top Navigation', href:'/boxed'},
                            {title:'Fixed', href:'/boxed'}
                        ]
                    }
                ]
            },
            {
                header: '实时监控0001',
                className:'fa-dashboard',
                items:[
                    {
                        className:'fa-files-o',
                        title:'Layout Options',
                        children:[
                            {title:'Top Navigation', href:'/boxed'},
                            {title:'Fixed', href:'/boxed'}
                        ]
                    },
                    {
                        className:'fa-files-o',
                        title:'Layout Options',
                        children:[
                            {title:'Top Navigation', href:'/boxed'},
                            {title:'Fixed', href:'/boxed'}
                        ]
                    },
                    {
                        className:'fa-files-o',
                        title:'Layout Options',
                        children:[
                            {title:'Top Navigation', href:'/boxed'},
                            {title:'Fixed', href:'/boxed'}
                        ]
                    }
                ]
            }
        ]
        let arr = []
        _.each(data, function (item, i) {
            let sb = <Sidebar.Menu header={item.header} key={i}>
                {
                    item.items.map((item,j)=>{
                        return <Sidebar.Menu.Item
                            icon={{ className: 'fa-files-o' }}
                            title={item.title}
                            key={j}>
                            {
                                item.children.map((c,n)=>{
                                    return <Sidebar.Menu.Item title={c.title} key={n}/>
                                })
                            }
                        </Sidebar.Menu.Item>
                    })
                }
                </Sidebar.Menu>
            arr.push(sb)
        })*/
        const sidebarChildren = [
            <Sidebar.UserPanel
                name="Alexander Pierce"
                image="public/user2-160x160.jpg"
                online
                key="1"
            />,
            <Sidebar.Search key="2" />,
            <Sidebar.Menu header="MAIN NAVIGATION" key="3">
                <Sidebar.Menu.Item icon={{ className: 'fa-dashboard' }} title="Dashboard Colors" >
                    <Sidebar.Menu.Item
                        icon={{ color: tinycolor('black').toString() }}
                        onClick={() => this.pickTheme('skin-black')}
                        title="Black"
                    />
                    <Sidebar.Menu.Item
                        icon={{ color: tinycolor('black').lighten(10).toString() }}
                        onClick={() => this.pickTheme('skin-black-light')}
                        title="Black Light"
                    />
                    <Sidebar.Menu.Item
                        icon={{ color: '#3c8dbc' }}
                        onClick={() => this.pickTheme('skin-blue')}
                        title="Blue"
                    />
                    <Sidebar.Menu.Item
                        icon={{ color: tinycolor('#3c8dbc').lighten(10).toString() }}
                        onClick={() => this.pickTheme('skin-blue-light')}
                        title="Blue Light"
                    />
                    <Sidebar.Menu.Item
                        icon={{ color: '#00a65a' }}
                        onClick={() => this.pickTheme('skin-green')}
                        title="Green"
                    />
                    <Sidebar.Menu.Item
                        icon={{ color: tinycolor('#00a65a').lighten(10).toString() }}
                        onClick={() => this.pickTheme('skin-green-light')}
                        title="Green Light"
                    />
                    <Sidebar.Menu.Item
                        icon={{ color: '#605ca8' }}
                        onClick={() => this.pickTheme('skin-purple')}
                        title="Purple"
                    />
                    <Sidebar.Menu.Item
                        icon={{ color: tinycolor('#605ca8').lighten(10).toString() }}
                        onClick={() => this.pickTheme('skin-purple-light')}
                        title="Purple Light"
                    />
                    <Sidebar.Menu.Item
                        icon={{ color: '#dd4b39' }}
                        onClick={() => this.pickTheme('skin-red')}
                        title="Red"
                    />
                    <Sidebar.Menu.Item
                        icon={{ color: tinycolor('#dd4b39').lighten(10).toString() }}
                        onClick={() => this.pickTheme('skin-red-light')}
                        title="Red Light"
                    />
                    <Sidebar.Menu.Item
                        icon={{ color: '#f39c12' }}
                        onClick={() => this.pickTheme('skin-yellow')}
                        title="Yellow"
                    />
                    <Sidebar.Menu.Item
                        icon={{ color: tinycolor('#f39c12').lighten(10).toString() }}
                        onClick={() => this.pickTheme('skin-yellow-light')}
                        title="Yellow Light"
                    />
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item
                    icon={{ className: 'fa-files-o' }}
                    labels={[{ key: 1, type: 'primary', text: '4' }]}
                    title="Layout Options"
                >
                    <Sidebar.Menu.Item title="Top Navigation" />
                    <Sidebar.Menu.Item title="Boxed" href="/boxed" />
                    <Sidebar.Menu.Item title="Fixed" />
                    <Sidebar.Menu.Item title="Collapsed Sidebar" />
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item
                    icon={{ className: 'fa-th' }}
                    labels={[{ key: 1, type: 'success', text: 'new' }]}
                    title="Widgets"
                />
                <Sidebar.Menu.Item icon={{ className: 'fa-pie-chart' }} title="Charts" >
                    <Sidebar.Menu.Item title="ChartJS" />
                    <Sidebar.Menu.Item title="Morris" />
                    <Sidebar.Menu.Item title="Flot" />
                    <Sidebar.Menu.Item title="Inline Charts" />
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item icon={{ className: 'fa-laptop' }} title="UI Elements" >
                    <Sidebar.Menu.Item title="General" />
                    <Sidebar.Menu.Item title="Icons" />
                    <Sidebar.Menu.Item title="Buttons" />
                    <Sidebar.Menu.Item title="Sliders" />
                    <Sidebar.Menu.Item title="Timeline" />
                    <Sidebar.Menu.Item title="Modals" />
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item icon={{ className: 'fa-edit' }} title="Forms" >
                    <Sidebar.Menu.Item title="General Elements" />
                    <Sidebar.Menu.Item title="Advanced Elements" />
                    <Sidebar.Menu.Item title="Editors" />
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item icon={{ className: 'fa-table' }} title="Tables" >
                    <Sidebar.Menu.Item title="Simple tables" />
                    <Sidebar.Menu.Item title="Data tables" />
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item
                    icon={{ className: 'fa-calendar' }}
                    labels={[
                        { key: 1, type: 'primary', text: '17' },
                        { key: 2, type: 'danger', text: '3' },
                    ]}
                    title="Calendar"
                />
                <Sidebar.Menu.Item
                    icon={{ className: 'fa-envelope' }}
                    labels={[
                        { key: 2, type: 'success', text: '16' },
                        { key: 1, type: 'warning', text: '12' },
                        { key: 3, type: 'danger', text: '5' },
                    ]}
                    title="Mailbox"
                />
                <Sidebar.Menu.Item icon={{ className: 'fa-folder' }} title="Examples" >
                    <Sidebar.Menu.Item title="Invoice" />
                    <Sidebar.Menu.Item title="Profile" />
                    <Sidebar.Menu.Item title="Login" />
                    <Sidebar.Menu.Item title="Register" />
                    <Sidebar.Menu.Item title="Lockscreen" />
                    <Sidebar.Menu.Item title="404 Error" />
                    <Sidebar.Menu.Item title="500 Error" />
                    <Sidebar.Menu.Item title="Blank Page" />
                    <Sidebar.Menu.Item title="Pace Page" />
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item icon={{ className: 'fa-share' }} title="Multilevel">
                    <Sidebar.Menu.Item title="Level One" />
                    <Sidebar.Menu.Item title="Level One" >
                        <Sidebar.Menu.Item title="Level Two" />
                        <Sidebar.Menu.Item title="Level Two" >
                            <Sidebar.Menu.Item title="Level Three" />
                        </Sidebar.Menu.Item>
                    </Sidebar.Menu.Item>
                    <Sidebar.Menu.Item title="Level One" />
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item active icon={{ className: 'fa-book' }} title="Documentation" />
            </Sidebar.Menu>,
            <Sidebar.Menu header="LABELS" key="4">
                <Sidebar.Menu.Item icon={{ color: 'danger' }} title="Danger" />
                <Sidebar.Menu.Item icon={{ color: 'warning' }} title="Warning" />
                <Sidebar.Menu.Item icon={{ color: 'information' }} title="Information" />
            </Sidebar.Menu>,
        ]
        return sidebarChildren
    }

    render() {

        const navMenu = () => ([
            <Header.UserMenu
                name="管理员"
                image={user2}
                profileAction={() => alert('Access profile')}
                signOutAction={() => alert('Sign out')}
                key="1"
            />,
            <Header.Item
                href='https://github.com'
                iconClass="fa fa-github"
                key="2"
                title="Github111"
            />,
            <Header.Item
                href='https://github.com'
                iconClass="fa fa-github"
                key="3"
                title="Github4444"
            />,
            <Header.Item
                href='https://github.com'
                iconClass="fa fa-github"
                key="4"
                title="Github"
            />
        ])

        const footer = () => ([
            <strong>
                <span>Copyright © 2014-2016 </span>
                <a href="http://almsaeedstudio.com">Almsaeed Studio</a>
                <span>. </span>
            </strong>,
            <span> All rights reserved.</span>,
            <div style={{ float: 'right' }}>
                <b>Version</b>
                <span> 2.3.8</span>
            </div>,
        ])

        const logoLg = <span><b>BlockChain-BP</b></span>
        const logoSm = <span><b>GDE</b></span>

        const App = () => (
            <Dashboard navbarChildren={navMenu()}
                       sidebarChildren={this.createSidebarChildren()}
                       footerChildren={footer()}
                       sidebarMini
                       logoLg={logoLg}
                       logoSm={logoSm}
                       fixed={true}
                       theme='skin-yellow'>
                {<Index key="12122"/>}
            </Dashboard>
        )

        App.propTypes = {
            children: React.PropTypes.node,
            pickTheme: React.PropTypes.func,
            theme: React.PropTypes.string,
        }

        return (
            <div>
               <App />
            </div>
        )
    }
}