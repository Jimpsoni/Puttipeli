//import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Game from '../pages/game/Game'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

test ('renders title text', () => {
  render(<Game />, {wrapper: BrowserRouter})

  const element = screen.getByText('Game Page')
  expect(element).toBeDefined()
})

test('one button press works', async () => {
  const user = userEvent.setup()
  
  render(<Game />, {wrapper: BrowserRouter})

  await user.click(screen.getByTestId('button2'))
  const element = screen.getByText('Points: 20')
  expect(element).toBeDefined
})

test('going to previous state', async () => {
  const user = userEvent.setup()
  
  render(<Game />, {wrapper: BrowserRouter})

  await user.click(screen.getByTestId('button5'))
  const firstElement = screen.getByText('Points: 50')
  expect(firstElement).toBeDefined

  await user.click(screen.getByTestId('prevButton'))
  const secondElement = screen.getByText('Points: 0')
  expect(secondElement).toBeDefined
})

//test('save button makes top screen message show', async () => {
//  const user = userEvent.setup()
//  
//  render(<Game />, {wrapper: BrowserRouter})
//
//  await user.click(screen.getByTestId('button5'))
//  await user.click(screen.getByTestId('saveScoreButton'))
//
//  const element = screen.getByText('saving scores')
//  expect(element).toBeDefined
//})