import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        return (
            <WingBlank>
                {this.props.userList.map((v) => (
                    v.avatar 
                    ? <div key={v._id}>
                    <WhiteSpace />
                        <Card onClick={() => this.handleClick(v)}>
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            ></Card.Header>
                            <Card.Body>
                                {v.type === 'boss' ? <div>Company: {v.company}</div> : null}
                                {v.desc.split('\n').map((desc) => (
                                    <div key={desc}>{desc}</div>
                                ))}
                                {v.type === 'boss' ? <div>Salary: {v.salary}</div> : null}
                            </Card.Body>
                        </Card>
                    </div>
                    : null
                ))}
            </WingBlank>
        )
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`)
    }

}

export default UserCard