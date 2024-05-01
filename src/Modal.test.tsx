import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from './Modal';


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


test('renders modal - no role, no join date, no email', () => {
  render(<Modal {...user}/>);
  
  const roleElement = screen.queryByText(/developer/i);
  expect(roleElement).not.toBeInTheDocument();
  
  const joinDateElement = screen.queryByText(/4\/30\/2024/i);
  expect(joinDateElement).not.toBeInTheDocument();

  const emailElement = screen.queryByText(/emmanueljdevries@gmail.com/i);
  expect(emailElement).not.toBeInTheDocument();
});


test('renders modal - click view more - role, join date, email', async () => {
  render(<Modal {...user}/>);
  
  const viewmoreElement = screen.getByText(/view more/i);
  await userEvent.click(viewmoreElement);
  
  const roleElement = screen.getByText(/developer/i);
  expect(roleElement).toBeInTheDocument();
  
  const joinDateElement = screen.getByText(/4\/30\/2024/i);
  expect(joinDateElement).toBeInTheDocument();

  const emailElement = screen.getByText(/emmanueljdevries@gmail.com/i);
  expect(emailElement).toBeInTheDocument();
});


test('renders modal - click view more - click close - no role, no join date, no email', async () => {
  render(<Modal {...user}/>);
  
  const viewmoreElement = screen.getByText(/view more/i);
  await userEvent.click(viewmoreElement);
  
  const closeElement = screen.getByText(/close/i);
  await userEvent.click(closeElement);
  
  
  const roleElement = screen.queryByText(/developer/i);
  expect(roleElement).not.toBeInTheDocument();
  
  const joinDateElement = screen.queryByText(/4\/30\/2024/i);
  expect(joinDateElement).not.toBeInTheDocument();

  const emailElement = screen.queryByText(/emmanueljdevries@gmail.com/i);
  expect(emailElement).not.toBeInTheDocument();
});


test('renders modal - click view more - click close - click view more - role, join date, email', async () => {
  render(<Modal {...user}/>);
  
  const viewmoreElement = screen.getByText(/view more/i);
  await userEvent.click(viewmoreElement);
  
  const closeElement = screen.getByText(/close/i);
  await userEvent.click(closeElement);

  const viewmoreElement2 = screen.getByText(/view more/i);
  await userEvent.click(viewmoreElement2);


  const roleElement = screen.getByText(/developer/i);
  expect(roleElement).toBeInTheDocument();
  
  const joinDateElement = screen.getByText(/4\/30\/2024/i);
  expect(joinDateElement).toBeInTheDocument();

  const emailElement = screen.getByText(/emmanueljdevries@gmail.com/i);
  expect(emailElement).toBeInTheDocument();
});
