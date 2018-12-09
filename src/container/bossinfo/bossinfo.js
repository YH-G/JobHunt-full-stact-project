import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect(
    (state) => state.user,
    { update }
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            company: '',
            salary: '',
            desc: ''
        }
        this.onChange = this.onChange.bind(this)
    }
    
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar mode="dark">Company Information</NavBar>
                <AvatarSelector selectAvatar={(imgname) => {
                    this.setState({
                        avatar: imgname
                    })
                }}/>
                <InputItem onChange={(v) => this.onChange('title', v)}>Position</InputItem>
                <InputItem onChange={(v) => this.onChange('company', v)}>Company</InputItem>
                <InputItem onChange={(v) => this.onChange('salary', v)}>Salary</InputItem>
                <TextareaItem onChange={(v) => this.onChange('desc', v)} rows={3} autoHeight title='Job Description' labelNumber={7}></TextareaItem>
                <WhiteSpace></WhiteSpace>
                <Button type='primary' onClick={() => {this.props.update(this.state)}}>Save</Button>
            </div>

        )
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }
}

export default BossInfo