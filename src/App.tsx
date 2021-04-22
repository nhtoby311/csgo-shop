import React, { useEffect, useState } from 'react';
import './style.scss'
import Header from './components/Header/Header';
import Filter from './components/Filter/Filter';
import Card from './components/Card/Card';
import {Api} from './types/Api'
import { ItemContext } from './contexts/ItemContext';

function App() {
  const [items,setItems] = useState<Api[]>([])
  const [filteredItems,setFilteredItems] = useState<Api[]>([])


  const getData = async function() {
    const response = await fetch("./api-csgo.json")
    const data = await response.json()
    setItems(data)
    setFilteredItems(data)
  } 

  const setFiltering = (a:any) =>
  {
    setFilteredItems(a)
  }

  useEffect(() =>
  {
    getData()
  },[])

  return (
    <div>
      <div className="bg">
        <div className="blur-bg">
        </div>
        <div className="circle-bg-1"></div>
        <div className="circle-bg-2"></div>
      </div>
      <Header />
      <section>
        <ItemContext.Provider value={items}>
          <Filter data={items} setFilteredItems={setFiltering}/>
        </ItemContext.Provider>
        <div className="cards-cont-cont">
          <div className="cards-cont">
            {
              filteredItems && filteredItems.map( (filteredItem) => {
                return <Card key={filteredItem.id} name={filteredItem.name} image={filteredItem.img} price={filteredItem.price} exterior={filteredItem.exterior}/>
              }
            )} 
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
