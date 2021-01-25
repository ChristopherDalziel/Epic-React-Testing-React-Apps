// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Counter from '../../components/counter'

// ** REACT-TESTING-LIBRARY CLEANS UP FOR US BEFORE EACH TEST **

test('counter increments and decrements when the buttons are clicked', () => {

  // ** STEP ONE ** - Render <Counter /> within a React countainer object (We can provide a base component if we'd like however - by default React testing library appends this to a div)

  const { container } = render(<Counter />)

  // ** STEP TWO ** - 

  // 🐨 instead of `div` here you'll want to use the `container` you get back
  // from React Testing Library
  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')

  // ** STEP THREE ** - Default expect

  expect(message.textContent).toBe('Current count: 0')

  // ** STEP FOUR ** - Fire event instead of complicated click event functions  (Checkout fireEvent.. almost every event you could imagine is listed within)

  fireEvent.click(increment)

  // ** STEP FIVE ** - Expected result (Normal way)

  expect(message.textContent).toBe('Current count: 1')

  fireEvent.click(decrement)

  // ** EXTRA CREDIT ** - JEST DOM assertion - This looks a little cleaner, however the big benefit is the error messages when a tests fails are a LOT better (These do not come baked into Test-library so you will be required to import them, you'll likely need to use the setup test file within create-react-app [Check back on epic-react when this is an issue])

  expect(message).toHaveTextContent('Current count: 0')
})
