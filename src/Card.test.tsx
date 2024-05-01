import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Card } from './Card';

const user = {
  id: "1dsf",
  username: "emman",
  firstname: "Emmanuel",
  lastname: "DeVries",
  email: "emmanueljdevries@gmail.com",
  avatar: "https://google.com/fakeimage1441.png",
  role: "developer",
  join_date: "4/30/2024",
  description: "asdas asd asd a dsa ds ads as sad as d asd asd adsasdsa"
}

test('renders card - full name', () => {
  render(<Card user={user} />);
  const fullnameElement = screen.getByText(/Emmanuel DeVries/i);
  expect(fullnameElement).toBeInTheDocument();
});

test('renders card - description', () => {
  render(<Card user={user} />);
  const descriptionElement = screen.getByText(/asdas asd asd a dsa ds ads as sad as d asd asd adsasdsa/i);
  expect(descriptionElement).toBeInTheDocument();
});

test('renders card - no role', () => {
  render(<Card user={user} />);
  const roleElement = screen.queryByText(/developer/i);
  expect(roleElement).not.toBeInTheDocument();
});

test('renders card - no join date', () => {
  render(<Card user={user} />);
  const joinDateElement = screen.queryByText(/4\/30\/2024/i);
  expect(joinDateElement).not.toBeInTheDocument();
});

test('renders card - view more', () => {
  render(<Card user={user} />);
  const viewmoreElement = screen.getByText(/view more/i);
  expect(viewmoreElement).toBeInTheDocument();
});

test('renders card - click view more - role, join date', async () => {
  render(<Card user={user} />);
  
  const viewmoreElement = screen.getByText(/view more/i);
  await userEvent.click(viewmoreElement);
  
  const roleElement = screen.getByText(/developer/i);
  expect(roleElement).toBeInTheDocument();
  
  const joinDateElement = screen.getByText(/4\/30\/2024/i);
  expect(joinDateElement).toBeInTheDocument();
});