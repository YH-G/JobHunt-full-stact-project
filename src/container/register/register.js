import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import form from '../../component/from/from'

@connect(
    (state) => state.user,
    {register}
)
@form
class Register extends React.Component {
    constructor(props) {
        super(props) 
        // this.state = {
        //     user: '',
        //     pwd: '',
        //     repeatpwd: '',
        //     type: 'genius'
        // }
        this.handleRegister = this.handleRegister.bind(this)
    }

    render() {
        console.log(this.props)
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <InputItem onChange = {v => this.props.handleChange('user', v)}>Username</InputItem>
                    <InputItem type = 'password' onChange = {v => this.props.handleChange('pwd', v)}>Password</InputItem>
                    <InputItem type = 'password' labelNumber={6} onChange = {v => this.props.handleChange('repeatpwd', v)}>Confirm Pwd</InputItem>
                    <RadioItem checked = {this.props.state.type === 'genius'} onChange = {() => this.props.handleChange('type', 'genius')} >Applicant</RadioItem>
                    <RadioItem checked = {this.props.state.type === 'boss'} onChange = {() => this.props.handleChange('type', 'boss')}>Company</RadioItem>

                </List>
                <WhiteSpace></WhiteSpace>
                <Button type='primary' onClick = {this.handleRegister}>Register</Button>
            </div>
        )
    }

    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }

    // props.handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }

    handleRegister() {
        this.props.register(this.props.state)
        console.log(this.props.state)
    }

}

export default Register