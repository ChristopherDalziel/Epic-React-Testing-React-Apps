// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
// import { render, screen } from '@testing-library/react'
import { render, screen } from 'test/test-utils'
// import { ThemeProvider } from '../../components/theme'
import EasyButton from '../../components/easy-button'

// ** EXTRA CREDIT TWO ** - Stop duplicating test data by creating a custom render method that encapsulated the shared logic. Some parameters that we need here is the initialTheme this will need to default to an object. We could also go a step further and make this function better by making it a little more generic and to takein a UI this will allow us to render any component we want. Spreading the options here allows us to merge additional argumenets (Anything else that is returning form react-testing-library).
// function renderWithInfo(ui, { theme = 'light', ...options } = {}) {
//   const Wrapper = ({ children }) => (
//     <ThemeProvider value={[theme, () => { }]}>{children}</ThemeProvider>
//   )
//   return render(ui, { wrapper: Wrapper, ...options })
// }

test('renders with the light styles for the light theme', () => {
  // ** EXTRA CREDIT THREE ** - It's recommended that we don't just import render from react-testing-library, but import them into your own utils file where you can create your own module that re-exports everything from react-testing-library and has a generic render with providers type of function.. like this render import. (Exactly the same as the one we created above)
  render(<EasyButton>Easy</EasyButton>)

  // ** EXTRA CREDIT TWO ** 
  // renderWithInfo(<EasyButton>Easy</EasyButton>)

  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

// ** EXTRA CREDIT ONE ** - Make a secondary test
test('renders with the dark styles for the dark theme', () => {
  // ** EXTRA CREDIT THREE ** 
  render(<EasyButton>Easy</EasyButton>, {
    theme: 'dark'
  })

  // ** EXTRA CREDIT TWO ** 
  // renderWithInfo(<EasyButton>Easy</EasyButton>, {
  //   theme: 'dark'
  // })

  // function Wrapper({ children }) {
  //   return <ThemeProvider initialTheme="dark" >{children}</ThemeProvider>
  // }

  // render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper })
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

/* eslint no-unused-vars:0 */
