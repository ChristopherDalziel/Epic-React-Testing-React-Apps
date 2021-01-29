// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build, fake } from '@jackfranklin/test-data-bot'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// ** STEP ONE ** - Setup sever with making url of the actual call? async return the request, response and context. Return the JSON object that holds the username.
const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (req, res, ctx) => {
      return res(ctx.json({ username: req.body.username }))
    },
  ),
)

// ** STEP TWO ** - Before each test listen for the sever, after each close the connection, this is a type of cleanup. 

beforeAll(() => server.listen())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const { username, password } = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  // as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of "loading" for accessibility purposes, so
  // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved

  // ** STEP THREE ** - When the app is been used in the real world this loading screen will display that means when we're testing our app we should wait for it to disappear before continuing with our test.

  await waitForElementToBeRemoved(() => screen.getByLabelText('loading...'))

  // ** STEP FOUR ** - Once the loading screen has left we can finally check if the username is display in text anywhere in our application. In this situation there is only a single instance of this so this test is suitable.

  expect(screen.getByText(username)).toBeInTheDocument()
})
