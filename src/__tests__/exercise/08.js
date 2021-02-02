// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:

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
  // 🐨 render the component
  render(<Counter />)
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  const increment = screen.getByRole('button', { name: /increment/i })
  const decrement = screen.getByRole('button', { name: /decrement/i })
  const message = screen.getByText(/counter:/i)

  expect(message).toHaveTextContent('Counter: 0')
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  userEvent.click(screen.getByText('increment'))
  expect(message).toHaveTextContent('Counter: 1')
  userEvent.click(screen.getByText('decrement'))
  expect(message).toHaveTextContent('Counter: 0')
})

/* eslint no-unused-vars:0 */
