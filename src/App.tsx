import React, { useState } from 'react';
import useSWR from 'swr';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

import { CARDS_PER_PAGE } from './constants'
import { EndpointResponse } from './interfaces'
import { Card } from './Card'
import './App.css';


const fetcher = (url: string) => fetch(url).then(res => res.json())
const byLastname = (a, b) => a.lastname.localeCompare(b.lastname);

interface AppProps {
  endpoint_url: string
}

function App({endpoint_url}: AppProps) {
  const { data, error, isLoading } = useSWR<EndpointResponse>(endpoint_url, fetcher)
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = data? Math.ceil(data.data.users.length/CARDS_PER_PAGE): 0;
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  
  return (
    <>
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
      <div className="p-10 bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-8">
          {data && data.data.users
            .toSorted(byLastname)
            .slice((currentPage-1)*CARDS_PER_PAGE, currentPage*CARDS_PER_PAGE)
            .map((user, i) => <Card key={user.id} user={user} />)
          }
          
        </div>
      </div>
    </>
  );
}

export default App;
