import './Filter.scss'
import filter from '../../assets/filter.svg' 
import { useContext, useEffect, useReducer, useState } from 'react'
import gsap from 'gsap'
import { ItemContext } from '../../contexts/ItemContext'
import { Api } from '../../types/Api'
import FilterButton from './FilterButton/FilterButton'

type Action =
{
    type:string,
    payload: Api[]
}

const uniqueAll = (array:string[]) =>{
    return ['All',...(array.filter((x, i, array) => array.indexOf(x) === i)).sort()]
}

function reducer(state:typeof initialState,action:Action)
{
    switch(action.type){
        case "INIT":
            {
                return { 
                    ...state,
                    priceRange:uniqueAll(action.payload.map((elem) => {return elem.price})),
                    exterior:uniqueAll(action.payload.map((elem) => {return elem.exterior})),
                    rarity:uniqueAll(action.payload.map((elem) => {return elem.rarity})),
                }
            }
        default:
            {
                return state;
            }
    }

}

const initialState = 
{
    priceRange:['0$'],
    exterior:['FN'],
    rarity:['Convert'],
    floatRange:['0.05']
}

export default function Filter()
{
    const [{priceRange, exterior,rarity,floatRange}, dispatch] =  useReducer(reducer, initialState);
    const items = useContext(ItemContext)

    useEffect(()=>
    {
        console.log("runnn")
        dispatch({type:'INIT', payload:items})
    },[items])

    return(
        <div className="function-cont">
            <div className="function">
                <div className="function-left">
                    <div className="filter-btn" >
                        <img src={filter}/>
                    </div>
                    <div className="search-btn" onClick={(e)=>{
                        gsap.to(e.currentTarget,{
                            width:'150px',
                            duration: 1,
                        })
                        
                    }}>
                    <img src={filter}/>
                    </div>
                </div>

                <div className="function-right">
                    <h2>R</h2>
                </div>
            </div>
            <div className="functionalities">
                <div className="function-line">
                    <h3>Price Range:</h3>
                    {priceRange.map((p,index) => {
                        return <FilterButton key={index} val={p}/>
                    })}
                </div>
                <div className="function-line">
                    <h3>Exterior:</h3>
                    {exterior.map((p,index) => {
                        return <FilterButton key={index} val={p}/>
                    })}
                    <div className="function-line">
                    <h3>Float Range:</h3>
                    {floatRange.map((p,index) => {
                        return <FilterButton key={index} val={p}/>
                    })}
                </div>
                </div>
                <div className="function-line">
                    <h3>Rarity:</h3>
                    {rarity.map((p,index) => {
                        return <FilterButton key={index} val={p}/>
                    })}
                </div>
                
            </div>
            <h1 className="title">Shop</h1>
        </div>
    )
}