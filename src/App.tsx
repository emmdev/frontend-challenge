import React, { useState } from 'react';
import useSWR from 'swr';

import { Card } from './Card'
import { Response } from './interfaces'

import './App.css';


const fetcher = (url: string) => fetch(url).then(res => res.json())
const byLastname = (a, b) => a.lastname.localeCompare(b.lastname);

function App({endpoint_url}) {
  const [cardsToShow, setCardsToShow] = useState(20)
  const { data, error, isLoading } = useSWR<Response>(endpoint_url, fetcher, {onSuccess:() => setCardsToShow(-1) })
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  
  return (
    <div className="p-10 bg-gray-50">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-8">
        {data && data.data.users
          .toSorted(byLastname)
          .slice(0, cardsToShow)
          .map((user) => <Card key={user.id} {...user}/>)
        }
        
      </div>
    </div>
  );
}

export default App;
