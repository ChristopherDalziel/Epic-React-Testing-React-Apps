// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
// import { render, screen } from '@testing-library/react'
import { render, screen } from 'test/test-utils'
// import { ThemeProvider } from '../../components/theme'
import EasyButton from '../../components/easy-button'

// ** EXTRA CREDIT TWO ** - Stop duplicating test data by creating a custom render method that encapsulated the shared logic
// function renderWithInfo(ui, { theme = 'light', ...options } = {}) {
//   const Wrapper = ({ children }) => (
//     <ThemeProvider value={[theme, () => { }]}>{children}</ThemeProvider>
//   )
//   return render(ui, { wrapper: Wrapper, ...options })
// }

test('renders with the light styles for the light theme', () => {
  // ** EXTRA CREID THREE ** 
  render(<EasyButton>Easy</EasyButton>)

  // ** EXTRA CREDIT TWO ** 
  // renderWithInfo(<EasyButton>Easy</EasyButton>)

  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

// ** EXTRA CREDIT ONE **
test('renders with the dark styles for the dark theme', () => {
  // ** EXTRA CREID THREE ** 
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
