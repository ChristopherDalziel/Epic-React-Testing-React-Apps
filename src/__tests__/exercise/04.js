// form testing
// http://localhost:3000/login

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

// ** EXTRA CREDIT 2 ** - Setting a random username/password is a good idea because if another user comes and looks at your test implimentation they may think that 'Chris' and 'password' are important values. By randomising your results you make clear that your form should take in any data.
function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    // ** EXTRA CREDIT 3 ** - Allow for overrides 
    ...overrides
  }
}

test('submitting the form calls onSubmit with username and password', () => {
  // let submittedData = null
  // const handleSubmit = data => (submittedData = data)

  // ** EXTRA CREDIT 1 ** - Use a jest mock function (This is better than creating a local variable)
  const handleSubmit = jest.fn()
  // const username = 'Chris'
  // const password = 'password'

  render(<Login onSubmit={handleSubmit} />)
  // ** EXTRA CREDIT 3 ** - Override password - The benefit of this is the password may have some form of validation on it to be a certain strength etc for this reason we may not want to use something randomly generated
  const { username, password } = buildLoginForm({ password: 'dog' })

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', { name: /submit/i }))


  // expect(submittedData).toEqual({ password: 'password', username: 'chris' })

  // ** EXTRA CREDIT 1 ** - Use mock functions / toHaveBeenCalledWith
  expect(handleSubmit).toHaveBeenCalledWith({ username, password })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalled()
})

/*
eslint
  no-unused-vars: "off",
*/
