import React from "react"
import { connect } from 'react-redux'
import { NavBar } from "antd-mobile"
import { Route } from "react-router-dom"
import NavLinkBar from "../navlink/navlink"
import Company from '../../component/company/company'
import Applicant from '../../component/applicant/applicant'
import User from '../../component/user/user'
import Message from '../../component/message/message'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'


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
                path: '/company',
                text: 'applicant',
                icon: 'boss',
                title: 'Applicant List',
                component: Company,
                hide: user.type === 'applicant'
            },
            {
                path: '/applicant',
                text: 'company',
                icon: 'job',
                title: 'Company List',
                component: Applicant,
                hide: user.type === 'company'
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
        const page = navList.find((v) => v.path === pathname)
        return (
            <div>
                <NavBar className='fixed-header' mode='dark'>{navList.find((v) => v.path === pathname).title}</NavBar>
                <div style={{marginTop: 45}}>
                        <QueueAnim delay={100} type="left">
                            <Route key={page.path} path={page.path} component={page.component}></Route>
                        </QueueAnim>
                </div>

                <NavLinkBar data = {navList}></NavLinkBar>
            </div>
        )
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length && !this.props.chat.startRecvMsg) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
}

export default DashBoard