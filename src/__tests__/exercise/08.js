// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'


// ** STEP ONE ** - Create a component that your custom hook will use
function Counter() {
  const { count, increment, decrement } = useCounter()
  return (
    <>
      <div>Counter: {count}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </>
  )

}

test('exposes the count and increment/decrement functions', () => {
  // ** STEP TWO ** - Render the component, get the elements that we need using screen
  render(<Counter />)
  const increment = screen.getByRole('button', { name: /increment/i })
  const decrement = screen.getByRole('button', { name: /decrement/i })
  const message = screen.getByText(/counter:/i)

  // ** STEP THREE ** - Assert the default / beginning state and then interact with the UI using userEvent and assert on the changes to the UI
  expect(message).toHaveTextContent('Counter: 0')
  userEvent.click(screen.getByText('increment'))
  expect(message).toHaveTextContent('Counter: 1')
  userEvent.click(screen.getByText('decrement'))
  expect(message).toHaveTextContent('Counter: 0')
})

/* eslint no-unused-vars:0 */
