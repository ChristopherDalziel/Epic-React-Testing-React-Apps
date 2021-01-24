// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

// Clean up before each of the tests run below (Resetting the document body) - We do this to ensure that our tests stay seperated from each other, preventing errors. We could remove this at the end - but what if our test fails first and it's never cleaned up? This is why it's good to clean up beforeEach test as done here.
beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // **STEP ONE** - GET THE COUNTER ON THE PAGE

  // Create a div (root element)
  const div = document.createElement('div')
  // If we console log this, we will see our div now appended to the body
  document.body.append(div)
  // Render the counter within/to our div that's inserted into the body
  ReactDOM.render(<Counter />, div)

  // **STEP TWO** - VALIDATE THE INITIAL COUNT IS INITIALIZED / DEFAULT STATE OF OUR COUNTER 

  // Select the first child of the created div
  const message = div.firstChild.querySelector('div')
  // Check the deafult state - We should also test that this initially fails here
  expect(message.textContent).toBe('Current count: 0')

  // **STEP THREE** - INTERACTING WITH THE COMPONENENT RETRIEVE AND PRESS THE BUTTONS

  // Gain access to our buttons,  which are apart of our created div

  // **EXTRA CREDIT** - Creating our click event 

  const clickEvent = new MouseEvent('click', {
    // Bubbling is required for event delegation
    bubbles: true,
    cancelable: true,
    // Turns the click into a left click
    button: 0,
  })

  const [decrement, increment] = div.querySelectorAll('button')

  // Increment our count (**Updated to extra credit solution)
  increment.dispatchEvent(clickEvent)
  // Check message was incremented
  expect(message.textContent).toBe('Current count: 1')
  // Decrement click (**Non extra credit solution)
  decrement.click()
  // Check message was decremented
  expect(message.textContent).toBe('Current count: 0')
})
