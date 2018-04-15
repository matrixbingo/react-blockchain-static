import React, {Component} from 'react'
import {Button} from 'antd'

export default class ButtonTest extends Component {
    state = {
        loading: false,
        iconLoading: false,
    }

    enterLoading = () => {
        this.setState({loading: !this.state.loading})
    }

    enterIconLoading = () => {
        this.setState({iconLoading: !this.state.iconLoading})
    }
    change = () => {
        this.setState({iconLoading: !this.state.iconLoading})
    }

    render() {
        return (
            <span>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <br />
        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
          Click me!
        </Button>
        <Button type="primary" icon="search" size='large' loading={this.state.iconLoading} onClick={this.enterIconLoading}>
          Click me!
        </Button>
        <br />
        <Button shape="circle" loading onClick={this.change}/>
        <Button type="primary" shape="circle" loading/>
      </span>
        )
    }
}
