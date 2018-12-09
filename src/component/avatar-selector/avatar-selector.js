import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    
    constructor(props) {
        super(props) 
        this.state = {}
    }
    
    render() {
        const avatarList = 'boy, girl, man, woman, bull, chick, crab, hedgehog, hippopotamus, koala, lemur, pig, tiger, whale, zebra'
                            .split(', ')
                            .map((v) => ({
                                icon: require(`../img/${v}.png`),
                                text: v
                            }))

        const gridHeader = this.state.icon 
                            ? <div>
                                <span>Avatar Selected</span>
                                <img style={{width: 20, marginLeft: 10}} src={this.state.icon} alt=""/>
                            </div> 
                            : <div>Please select your avatar</div>
        return (
            <div>
                <List renderHeader={() => gridHeader }></List>
                <Grid data={avatarList} columnNum={5} onClick={(elem) => {
                    this.setState(elem)
                    this.props.selectAvatar(elem.text)}}/>
            </div>

        )
    }
}

export default AvatarSelector