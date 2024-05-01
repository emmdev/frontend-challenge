import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

import App from './App';


const raw_data = {
  "data": {
    "users": [
      {
        "id": "980b82bf-d1af-4e66-ab93-004da059b275",
        "username": "nberwick0",
        "firstname": "Norton",
        "lastname": "Berwick",
        "email": "nberwick0@liveinternet.ru",
        "avatar": "https://robohash.org/illumvitaeea.png?size=50x50&set=set1",
        "role": "Subcontractor",
        "join_date": "5/4/2023",
        "description": "Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
      },
      {
        "id": "4348814a-4ab9-4302-b1a0-93b6910080e0",
        "username": "rgatfield1",
        "firstname": "Rouvin",
        "lastname": "Gatfield",
        "email": "rgatfield1@state.gov",
        "avatar": "https://robohash.org/utcorruptiducimus.png?size=50x50&set=set1",
        "role": "Engineer",
        "join_date": "2/28/2024",
        "description": "Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."
      }
    ]
  }
}

const server = setupServer(
  rest.get('/users', (req, res, ctx) => {
    return res(
      ctx.json(raw_data),
    )
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('renders loading dot dot dot', () => {
  render(<App endpoint_url="/users" />);
  const loadingElement = screen.getByText(/loading\.\.\./i);
  expect(loadingElement).toBeInTheDocument();
});


test('loads and displays first 2 users', async () => {
  render(<App endpoint_url="/users" />)

  await screen.findByText('Norton Berwick')
  
  expect(screen.getByText('Rouvin Gatfield')).toBeInTheDocument()
  
  const viewmoreElements = screen.getAllByText(/view more/i);
  expect(viewmoreElements.length).toBe(2);
})

test('loads users - no email - click first view more - email', async () => {
  render(<App endpoint_url="/users" />)

  const viewmoreElements = await screen.getAllByText(/view more/i)
  
  expect(screen.queryByText(/nberwick0@liveinternet.ru/i)).not.toBeInTheDocument();
  
  await userEvent.click(viewmoreElements[0]);
  
  expect(screen.getByText(/nberwick0@liveinternet.ru/i)).toBeInTheDocument();
})
