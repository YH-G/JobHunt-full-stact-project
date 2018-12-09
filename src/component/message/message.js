import React from 'react'
import { List, Badge } from 'antd-mobile'
import { connect } from 'react-redux'
import { Item } from 'antd-mobile/lib/tab-bar';

@connect(
    state=>state
)
class Message extends React.Component {

    render() {
        // 聊天信息根据chatid分组
        const msgGroup = {}
        this.props.chat.chatmsg.forEach((v) => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).creat_time
            const b_last = this.getLast(b).creat_time
            return b_last - a_last
        })
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        return (
            <div>
                
                    {chatList.map((v) => {
                        const lastItem = this.getLast(v)
                        const targetId = v[0].from === userid ? v[0].to : v[0].from
                        const unreadNum = v.filter((v) => !v.read && v.to === userid).length
                        if (!this.props.chat.users[targetId]) {
                            return null
                        }
                        return (
                            <List key={lastItem._id}>
                                <Item 
                                thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                                extra={<Badge text={unreadNum}></Badge>}
                                arrow='horizontal'
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                                >
                                {lastItem.content}
                                <Brief>{this.props.chat.users[targetId].name}</Brief>

                                </Item>
                            </List>
                        )
                    })}
                
            </div>
        )
    }

    getLast(arr) {
        return arr[arr.length - 1]
    }
}

export default Message