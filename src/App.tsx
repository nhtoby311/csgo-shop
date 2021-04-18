import React, { useEffect, useState } from 'react';
import './style.scss'
import Header from './components/Header/Header';
import Filter from './components/Filter/Filter';
import Card from './components/Card/Card';
import {Api} from './types/Api'
import { ItemContext } from './contexts/ItemContext';

function App() {
  const [items,setItems] = useState<Api[]>([])

  const getData = async function() {
    const response = await fetch("./api-csgo.json")
    const data = await response.json()
    setItems(data)
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
          <Filter />
        </ItemContext.Provider>
        <div className="cards-cont-cont">
          <div className="cards-cont">
            {
              items && items.map( (item) => {
                return <Card key={item.id} name={item.name} image={item.img} price={item.price}/>
              }
            )} 
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
