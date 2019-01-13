import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import CompanyInfo from './container/companyinfo/companyinfo'
import ApplicantInfo from './container/applicantinfo/applicantinfo'
import DashBoard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension(): f => f
))

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/' exact component={Login}></Route>
					<Route path='/companyinfo' component={CompanyInfo}></Route>
					<Route path='/applicantinfo' component={ApplicantInfo}></Route>
					<Route path='/login'component={Login}></Route>
					<Route path='/register'component={Register}></Route>
					<Route path='/chat/:user'component={Chat}></Route>
					<Route component={DashBoard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
