import React , {Component} from 'react'
import {Sidebar} from 'react-adminlte-dash'
import tinycolor from 'tinycolor2'

export default class SidebarMenu extends Component {

    static defaultProps = {
        data: {}
    }

    constructor(props, context) {
        super(props, context)
        this.state = {}
    }

    pickTheme(type){
        return type
    }

    render() {
        this.data = [
            {
                menu: {
                    header: '实时监控'
                }
            }
        ]
        const sb = <div>
            <Sidebar.Menu header="实时监控" key="3">
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
            <Sidebar.Menu header="系统管理" key="4">
                <Sidebar.Menu.Item icon={{ className: 'fa-dashboard' }} title="主题设置" >
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
                <Sidebar.Menu.Item icon={{ color: 'danger' }} title="Danger" />
                <Sidebar.Menu.Item icon={{ color: 'warning' }} title="Warning" />
                <Sidebar.Menu.Item icon={{ color: 'information' }} title="Information" />
            </Sidebar.Menu>,
        </div>
        return (
            <sb />
        )
    }
}