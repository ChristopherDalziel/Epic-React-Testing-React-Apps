// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import { useCurrentPosition } from 'react-use-geolocation'
import Location from '../../examples/location'

// beforeAll(() => {
//   window.navigator.geolocation = {
//     getCurrentPosition: jest.fn(),
//   }
// })

// ** EXTRA CREDIT ONE ** - Mock the module - What this is going to do is look at all the imports from 'react-use-geolocation' and anything that's a function will be given a jest mock function
jest.mock('react-use-geolocation')

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

  // ** EXTRA CREDIT ONE ** - Because we're mocking 'useCurrentPosition' from the 'react-use-geolocation' library we can call mockImplmentation and apply our own hook. 
  // Our custom hook useMockCurrentPosition sets our state to an empty array and then returns state[0] which at this point is undefined, this allows our test to get to a place within our api request that displays a loading spinner.
  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  // ** STEP TWO ** - Creating our fake position with coordiantes of longitude and latitude
  const fakePosition = {
    coords: {
      longitude: 30,
      latitude: 140
    }
  }

  // ** STEP THREE ** - Creating our deferred promise
  // const { promise, resolve } = deferred()

  // ** STEP FOUR ** - Call a mockImplimentation on getCurrentPosition - the callback function will take oour deffered promise and then return a callback with the fakePosition that we created above.
  // window.navigator.geolocation.getCurrentPosition.mockImplementation(
  //   callback => {
  //     promise.then(() => callback(fakePosition))
  //   },
  // )

  // ** STEP FIVE ** -  Time to render the location component
  render(<Location />)

  // ** STEP SIX ** - Wait for the loading spinner to appear on screen
  await waitFor(() => screen.getByLabelText('loading...'))

  // ** STEP SEVEN ** - Resolve the deferred promise - wait for the promose to resolve (Without this we'll recieve a 'an update to x inside a test was not wrapped in act) Essentially a state change is happening here and the test wants to be sure it was intentional. 
  await act(async () => {
    // resolve()
    // await promise


    // ** EXTRA CREDIT ONE ** - Now we're updating our custom hook which is been used by 'useCurrentPosition' to hold the fakePosition object that we created above. Now that our app has data the loading spinner will go away and display the data as expected
    setReturnValue([fakePosition])

  })

  // ** STEP EIGHT ** - Destrucutre longitude and latitude from our fakePositon object - just a bit cleaner
  const { longitude, latitude } = fakePosition.coords

  // ** STEP NINE ** -  Expect the loading spinner to have disappeared now, it's important here that we use 'queryByLabelText instead of 'getByLabelText' - getBy requests throw warnings if they're not able to find something.
  expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument()

  // ** STEP TEN ** -  The actual tests of what should now be displayed on screen to the user
  expect(screen.getByText(/latitude/i)).toHaveTextContent(latitude)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(longitude)
})

// ** EXTRA CREDIT TWO ** - Test an error
test('what happens in the event of an error', async () => {
  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[0]
    return state[1]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  const fakeError = {
    error: {
      message: 'Geolocation is not supported or permission denied'
    }
  }

  render(<Location />)

  await waitFor(() => screen.getByLabelText('loading...'))

  act(() => {
    setReturnValue([fakeError])
  })

  // const { message } = fakeError.error

  expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument()

  expect(screen.getByRole('alert')).toHaveTextContent(fakeError.error.message)


})

/*
eslint
  no-unused-vars: "off",
*/
