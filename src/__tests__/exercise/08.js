// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import { act } from 'react-dom/test-utils'
import { renderHook } from '@testing-library/react-hooks'

// ** STEP ONE ** - Create a component that your custom hook will use to test
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
  userEvent.click(increment)
  expect(message).toHaveTextContent('Counter: 1')
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Counter: 0')
})

// ** EXTRA CREDIT ONE ** - Use a fake component for simplicity - Within this fake test component we will call our real hook. This component won't return anything on the screen so, screen.debug() will not work here.. however we can still return results from our custom hook.
test('exposes the count and increment/decrement functions with a fake component', () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)

  expect(result.count).toBe(0)
  act(() => {
    result.increment()
  })
  expect(result.count).toBe(1)
  act(() => {
    result.decrement()
  })
  expect(result.count).toBe(0)
})

// ** EXTRA CREDIT TWO ** - Create tests that also cover customization of initialCount and step. This generic setUp function could be used outside of the test block for multiple tests. Here we use an empty object and current to stop a re-render. By default we do not have to pass the initialCount or steps but it is what we're testing here in this test.
test('exposes the count and increment/decrement with a fake component and setup function', () => {
  function setupFunction({ initialProps } = {}) {
    const result = {}
    function TestComponent(props) {
      result.current = useCounter(props)
      return null
    }
    render(<TestComponent {...initialProps} />)
    return result
  }

  const result = setupFunction({ initialProps: { initialCount: 1, step: 5 } })
  expect(result.current.count).toBe(1)
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(6)
  act(() => {
    result.current.decrement()
  })
  expect(result.current.count).toBe(1)
})

// ** EXTRA CREDIT THREE ** 
test('exposes the count and increment/decrement with a fake component, handled by react-hooks testing library', () => {
  const { result } = renderHook(() => useCounter())

  expect(result.current.count).toBe(0)

  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(1)
  act(() => {
    result.current.decrement()
  })
  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
