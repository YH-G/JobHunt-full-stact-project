import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
// import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
import QueueAnim from 'rc-queue-anim'
// const socket = io('ws://localhost:9093')

@connect(
    (state) => state,
    { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', msg: [], showEmoji: false}
    }

    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀'
                        .split(' ')
                        .filter((v) => v)
                        .map((v) => ({text: v}))

        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter((v) => v.chatid === chatid)
        return (
            <div id='chat-page'>
                <NavBar mode='dark' icon={<Icon type='left'/>} onLeftClick={() => {
                    this.props.history.goBack()
                }}>
                    {users[userid].name}
                </NavBar>
                <QueueAnim delay={100} type="top">
                    {chatmsgs.map((v) => {
                        const avatar = require(`../img/${users[v.from].avatar}.png`)
                        return v.from === userid ? (
                            <List key={v._id}>
                                <Item thumb={avatar}>{v.content}</Item>
                            </List>
                        ) : (
                            <List key={v._id}>
                                <Item className='chat-me' extra={<img src={avatar} alt=""/>}>{v.content}</Item>
                            </List>
                        )
                    })}
                </QueueAnim>
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='Please input message'
                            value={this.state.text}
                            onChange={(v) => {
                                this.setState({text: v})
                            }}
                            extra={
                                <div>
                                    <span role="img" aria-label="smile"
                                        style={{marginRight: 15, display: 'inline-block'}}
                                        onClick = {() => {
                                            this.setState({showEmoji: !this.state.showEmoji})
                                            this.fixCarousel()}}
                                    >🙂</span>
                                    <span onClick={() => this.handleSubmit()}>Send</span>
                                </div>        
                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji ? 
                    <Grid 
                        data={emoji} 
                        columnNum={9} 
                        carouselMaxRow={4} 
                        isCarousel={true} 
                        onClick={(e) => this.setState({text: this.state.text + e.text})}/> : null }
                </div>
            </div>
        )
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length && !this.props.chat.startRecvMsg) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    componentWillUnmount() {
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }

    fixCarousel() {
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    handleSubmit() {
        // socket.emit('sendmsg', {text: this.state.text})
    
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({text: '', showEmoji: false})
    }
}

export default Chat