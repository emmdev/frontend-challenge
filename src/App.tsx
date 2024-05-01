import React, { useState } from 'react';
import useSWR from 'swr';

import { Card } from './Card'
import { Response } from './interfaces'

import './App.css';


const fetcher = (url: string) => fetch(url).then(res => res.json())
const byLastname = (a, b) => a.lastname.localeCompare(b.lastname);
const LOAD_IMMEDIATELY = 12

function App({endpoint_url}) {
  const [imgsLoaded, setImgsLoaded] = useState(0);
  //const [loadingMore, setloadingMore] = useState(true);
  const { data, error, isLoading } = useSWR<Response>(endpoint_url, fetcher)
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  
  const onImgLoad = () => {
    setImgsLoaded((imgsLoaded) => imgsLoaded + 1);
  };
  
  return (
    <div className="p-10 bg-gray-50">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-8">
        {data && data.data.users
          .toSorted(byLastname)
          .slice(0, imgsLoaded >= LOAD_IMMEDIATELY? -1: LOAD_IMMEDIATELY)
          .map((user, i) => <Card key={user.id} user={user} onImgLoad={i < LOAD_IMMEDIATELY? onImgLoad: null} />)
        }
        
      </div>
      {(data && imgsLoaded < LOAD_IMMEDIATELY)?
      <div className="fixed bottom-4 right-4 text-2xl font-bold bg-white" >Loading more...</div>
      :null}
    </div>
  );
}

export default App;
