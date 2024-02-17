//import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Game from '../pages/game/Game'
import { BrowserRouter } from 'react-router-dom'

test('renders title text', () => {
  render(<Game />, {wrapper: BrowserRouter})

  const element = screen.getByText('Game Page')
  expect(element).toBeDefined()
}
)