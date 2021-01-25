// form testing
// http://localhost:3000/login

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  // let submittedData = null
  // const handleSubmit = data => (submittedData = data)

  // ** EXTRA CREDIT 1 ** - Use a jest mock function (This is better than creating a local variable)
  const handleSubmit = jest.fn()
  const username = 'Chris'
  const password = 'password'

  render(<Login onSubmit={handleSubmit} />)

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
