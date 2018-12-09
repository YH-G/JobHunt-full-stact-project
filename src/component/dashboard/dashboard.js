import React from "react"
import { connect } from 'react-redux'
import { NavBar } from "antd-mobile"
import { Switch, Route } from "react-router-dom"
import NavLinkBar from "../navlink/navlink"
import Boss from '../../component/boss/boss'
import Applicant from '../../component/applicant/applicant'
import User from '../../component/user/user'
import Message from '../../component/message/message'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'


@connect(
    (state) => state,
    { getMsgList, recvMsg }
)
class DashBoard extends React.Component {

    render() {
        const { pathname } = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: 'applicant',
                icon: 'boss',
                title: 'Applicant List',
                component: Boss,
                hide: user.type == 'genius'
            },
            {
                path: '/genius',
                text: 'company',
                icon: 'job',
                title: 'Company List',
                component: Applicant,
                hide: user.type == 'boss'
            },
            {
                path: '/msg',
                text: 'message',
                icon: 'msg',
                title: 'Message',
                component: Message,
            },
            {
                path: '/me',
                text: 'me',
                icon: 'user',
                title: 'Me',
                component: User
            }
        ]

        return (
            <div>
                <NavBar className='fixed-header' mode='dark'>{navList.find((v) => v.path === pathname).title}</NavBar>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {navList.map((v) => (
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>

                <NavLinkBar data = {navList}></NavLinkBar>
            </div>
        )
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
}

export default DashBoard