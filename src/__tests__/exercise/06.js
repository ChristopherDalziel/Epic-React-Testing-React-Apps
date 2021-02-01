// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import Location from '../../examples/location'

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

// ** STEP ONE ** The purpose of this deferred function is to slow the process down so we're able to see the loading spinner while we wait, without this the test would proceed instantly and we wouldn't see this part of the process that we want to test.
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

test('displays the users current location', async () => {
  // ** STEP TWO ** - Creating our fake position with coordiantes of longitude and latitude
  const fakePosition = {
    coords: {
      longitude: 30,
      latitude: 140
    }
  }

  // ** STEP THREE ** - Creating our deferred promise
  const { promise, resolve } = deferred()

  // ** STEP FOUR ** - Call a mockImplimentation on getCurrentPosition - the callback function will take oour deffered promise and then return a callback with the fakePosition that we created above.
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => {
      promise.then(() => callback(fakePosition))
    },
  )

  // ** STEP FIVE ** -  Time to render the location component
  render(<Location />)

  // ** STEP SIX ** - Wait for the loading spinner to appear on screen
  await waitFor(() => screen.getByLabelText('loading...'))

  // ** STEP SEVEN ** - Resolve the deferred promise - wait for the promose to resolve
  await act(async () => {
    resolve()
    await promise
  })

  // ** STEP EIGHT ** - Destrucutre longitude and latitude from our fakePositon object - just a bit cleaner
  const { longitude, latitude } = fakePosition.coords

  // ** STEP NINE ** -  Expect the loading spinner to have disappeared now, it's important here that we use 'queryByLabelText instead of 'getByLabelText'
  expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument()

  // ** STEP TEN ** -  The actual tests of what should now be displayed on screen to the user
  expect(screen.getByText(/latitude/i)).toHaveTextContent(latitude)

  expect(screen.getByText(/longitude/i)).toHaveTextContent(longitude)
})

/*
eslint
  no-unused-vars: "off",
*/
