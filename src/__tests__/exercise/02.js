// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
// 🐨 import the `render` and `fireEvent` utilities from '@testing-library/react'
import { render, fireEvent } from '@testing-library/react'
import Counter from '../../components/counter'

// ** REACT-TESTING-LIBRARY CLEANS UP FOR US BEFORE EACH TEST **

test('counter increments and decrements when the buttons are clicked', () => {

  // ** STEP ONE ** - Render <Counter /> within a React countainer object

  const { container } = render(<Counter />)

  // ** STEP TWO ** - 

  // 🐨 instead of `div` here you'll want to use the `container` you get back
  // from React Testing Library
  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')

  // ** STEP THREE ** - Default expect

  expect(message.textContent).toBe('Current count: 0')

  // ** STEP FOUR ** - Fire event instead of complicated click functions

  fireEvent.click(increment)

  // ** STEP FIVE ** - Expected result

  expect(message.textContent).toBe('Current count: 1')

  fireEvent.click(decrement)

  // ** EXTRA CREDIT ** - JEST assertion which is slightly cleaner

  expect(message).toHaveTextContent('Current count: 0')
})
