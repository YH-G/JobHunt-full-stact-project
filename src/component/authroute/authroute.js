import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

@withRouter
@connect(
    (state) => state.user,
    { loadData }
)
class AuthRoute extends React.Component {

    componentDidMount() {
        const publicList = ['/login', '/register', '/dashboard/applicant', '/dashboard/company']
        const pathname = this.props.location.pathname
        if (pathname === publicList[0] || pathname === '/') {
            axios.get('/user/info').then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        this.props.loadData(res.data.data)
                        this.props.history.push(this.props.type === 'applicant' ? 'dashboard/applicant' : 'dashboard/company')
                    }
                }
                return null
            })
        }

        if (pathname === publicList[1]) {
            return null
        }

        if (pathname === publicList[2] || pathname === publicList[3]) {
            axios.get('/user/info').then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        this.props.loadData(res.data.data)
                        this.props.history.push(this.props.type === 'applicant' ? 'applicant' : 'applicant')
                    }
                }
                return null
            })
        }

        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    this.props.loadData(res.data.data)
                } else {
                    this.props.history.push('/login')
                }
                console.log(res.data)
            }
        })
    }

    render() {
        return null
    }
}

export default AuthRoute