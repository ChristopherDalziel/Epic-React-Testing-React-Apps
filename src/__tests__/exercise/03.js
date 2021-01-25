// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  // ** STEP ONE ** - Improve our tests so they're unaware of the order the buttons are presented on the page etc, or where the text content is coming from. This is a massive improvement because our tests will still function if we make changes to the code base, this is also why we use rajex to ignore case. If we were to change the container of our 'current count' now from a div to a <p> for example.. our test would still be able to find this information and pass regardless. Or if our buttons switched order etc.
  render(<Counter />)
  const increment = screen.getByRole('button', { name: /increment/i })
  const decrement = screen.getByRole('button', { name: /decrement/i })
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent('Current count: 0')
  // Normal fireEvent (Not recommended while userEvent is usable)
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  // ** EXTRA CREDIT ** - imported userEvent. As a user, you can activate this event in many ways. userEvent is going to activate our event in serval different ways such as mouseDown, mouseUp etc. This is far better than using just 'fireEvent' for implimentation details.
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
