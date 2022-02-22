import React, { useEffect, useRef, useState } from 'react';
import './style.scss'
import Header from './components/Header/Header';
import Filter from './components/Filter/Filter';
import Card from './components/Card/Card';
import {Api} from './types/Api'
import { ItemContext } from './contexts/ItemContext';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

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

  const containerRef = useRef(null)

  return (
    <LocomotiveScrollProvider
      options={
        {
          smooth: true,
          // ... all available Locomotive Scroll instance options 
        }
      }
      watch={
        [
          items
          //..all the dependencies you want to watch to update the scroll.
          //  Basicaly, you would want to watch page/location changes
          //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
        ]
      }
      containerRef={containerRef}
      onUpdate={() => console.log(document.querySelector('section'))} // Will trigger on 
    >
      <div data-scroll-container ref={containerRef}>
        <div className="bg">
          <div className="blur-bg">
          </div>
          <div className="circle-bg-1"></div>
          <div className="circle-bg-2"></div>
        </div>
        <Header />
        <div data-scroll-section>
          <section >
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
        
      </div>
    </LocomotiveScrollProvider>
  );
}

export default App;
