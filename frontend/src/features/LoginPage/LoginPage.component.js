import React from 'react'
import { reduxForm, Form } from 'redux-form'

import { validateRequired } from '../../shared/validators/Validators'
import LayoutMain from '../../components/layouts/LayoutMain/LayoutMain.component'
import Input from '../../components/Input/Input.component'

export const LoginPage = props => {
	const {handleSubmit} = props
	return (
		<LayoutMain>
			<div className="container">
				<div className="my-frame">
					<div className="frame-header">
						<h1 className="title-text">Hello!</h1>
					</div>
					<div className="login-container">
						<Form onSubmit={handleSubmit}>
							<h7 style={{color: 'red'}}>{props.errors}</h7>
							<Input name="login" placeholder="Username" validate={validateRequired}
							       className="input-login" onChange={(event) => this.handleUserInput(event)}/>
							<Input name="password" placeholder="Password" validate={validateRequired} type="password"
							       className="input-login" onChange={(event) => this.handleUserInput(event)}/>
							<button className="button-login" type="submit">Sign In</button>
						</Form>
					</div>
				</div>
			</div>
		</LayoutMain>
	)
}

export default reduxForm({
	form: 'loginform'
})(LoginPage)

