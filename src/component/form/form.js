import React from 'react'

// 高阶组件，相当于返回另一个组件，包裹着原来的组件，相当于一个新组件套着旧组件
export default function form(Comp) {
    return class WrapperComp extends React.Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        } 

        handleChange(key, val) {
            this.setState({
                [key]: val
            })
        }

        render () {
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}