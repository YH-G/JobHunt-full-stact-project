import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
    }

    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return props.user ? (
            <div>
                <Result 
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt=''/>}
                    title={props.user}
                    message={props.type==='boss' ? props.company : null}
                />
                <List renderHeader={() => 'Introduction'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map((v) => (<Brief key={v}>{props.desc}</Brief>))}
                        {props.salary ? <Brief>{props.salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logOut}>Log out</Item>
                </List>
            </div>        
        ) : <Redirect to={props.redirectTo}/>
    }

    logOut() {
        const alert = Modal.alert
        alert('Log out', 'Are you sure to log out?', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            { text: 'OK', onPress: () => {
                browserCookie.erase('userid')
                this.props.logoutSubmit()
            }},
          ])
    }
}

export default User