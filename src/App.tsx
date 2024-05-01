import React from 'react';
import useSWR from 'swr';

import { Card } from './Card'
import { Response } from './interfaces'

import './App.css';


const byLastname = (a, b) => a.lastname.localeCompare(b.lastname);


function App() {
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  
  const { data, error, isLoading } = useSWR<Response>('https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users', fetcher)
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  
  return (
    <div className="p-10 bg-gray-50">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-8">
        {data && data.data.users
          .toSorted(byLastname)
          .map((user) => <Card key={user.id} {...user}/>)
        }
        
      </div>
    </div>
  );
}

export default App;
