import './Filter.scss'
import filter from '../../assets/filter.svg' 
import gsap from 'gsap'
import FilterButton from './FilterButton/FilterButton'
import useFilterOption from '../../hooks/useFilterOption'
import { useEffect, useRef, useState } from 'react'
import MultiRangeSlider from './MultiRangeSlider/MultiRangeSlider'



export default function Filter(props:any)
{
    const [fileterOptionState, setFilterOptionState] = useState(false);
    const {priceRange, exterior,rarity,floatRange} = useFilterOption()
    //const [rangeval, setRangeval] = useState('');
    const [listFilter, setListFilter] = useState<any>({
        price: [],
        exterior: [],
        rarity:[]
    });
    const firstTime = useRef(true)

    const filtering = () => {
        const extractPrice = (array:string[])=>
        {
            let result = []
            for ( let i = 0; i < array.length; i++)
            {
                let arr = array[i].split(" ").filter((ele)=>{return ele !== '-'})
                arr[1] = arr[1].slice(0, -1)
                result.push(arr)
            }
            return result 
        }


        let ori = props.data;
        const proper = ['exterior','rarity']
        let result = ori;
        
        if(listFilter.price.length !== 0)                    //Filter price
        {
            const extracted = extractPrice(listFilter.price)
            result = result.filter((data:any)=>{
                for (let i = 0; i < extracted.length;i++)
                {
                    const from:number = parseInt(extracted[i][0])
                    const to:number = parseInt(extracted[i][1])
                    const price = parseInt(data.price.slice(0, -1))
                    if ( price >= from && price <= to)
                    {
                        return true
                    }
                    
                }
                return false
            })
        }

        for (let i = 0; i< proper.length;i++)
        {
            if (listFilter[proper[i]].length !== 0)
            {
                result = result.filter((data:any) => {
                    for (let j = 0; j < listFilter[proper[i]].length; j++) {
                        if (data[proper[i]] === listFilter[proper[i]][j]) {
                        return true;
                        }
                    }
                    return false;
                });
            }
                
        }
        props.setFilteredItems(result);
   

    };


    const handleList = (push:any, type:any, status:any) => 
    {
        const handleType = (pro: 'exterior' | 'price' | 'rarity') =>
        {
            const a:string[] = [...listFilter[pro]]; //Create an temp array to store list of filter for each properties
            if (status === true) {
                a.push(push); //Add filter to array
                setListFilter({
                ...listFilter,
                [pro]: a
                });
            } else {
                const index = a.indexOf(push);
                if (index > -1) {
                //Remove filter from array
                a.splice(index, 1);
                }
                setListFilter({
                ...listFilter,
                [pro]: a
                });
            }
        }


        switch (type)
        {
            case "EXTERIOR":
                {
                    return handleType('exterior')
                }
            case "RARITY":
                {
                    return handleType('rarity')
                }
            case "PRICE":
                {
                    return handleType('price')
                }
            default:
                return listFilter
        }
    }

    useEffect(()=>{
        if(!fileterOptionState)
        {
            gsap.to('.functionalities',{
                opacity:0,
                duration:0.5
            })
            gsap.to('.cards-cont',{
                translateY:'-200px',
                duration:0.5
            })
        }
        else
        {
            gsap.to('.functionalities',{
                opacity:1,
                duration:0.5
            })
            gsap.to('.cards-cont',{
                translateY:'0',
                duration:0.5
            })
        }
    },[fileterOptionState])

    const handleFilterState = ()=>
    {
        setFilterOptionState(!fileterOptionState)
    }

    useEffect(()=>{
        if(firstTime.current === false){
            //console.log(listFilter)
            filtering()
        }
        else
        {
            firstTime.current = false
        }
    },[listFilter])// eslint-disable-line react-hooks/exhaustive-deps

    

    return(
        <div className="function-cont">
            <div className="function">
                <div className="function-left">
                    <div className="filter-btn" onClick={handleFilterState}>
                        <img alt=""src={filter}/>
                    </div>
                    <div className="search-btn" onClick={(e)=>{
                        gsap.to(e.currentTarget,{
                            width:'150px',
                            duration: 1,
                        })
                        
                    }}>
                    <img alt="" src={filter}/>
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
                        return <FilterButton key={index} val={p} dispatch={handleList} type={"PRICE"}/>
                    })}
                </div>
                <div className="function-line">
                    <h3>Exterior:</h3>
                    {exterior.map((p,index) => {
                        return <FilterButton key={index} val={p} dispatch={handleList} type={"EXTERIOR"}/>
                    })}
                    <div className="function-line">
                    <h3>Float Range:</h3>

        
                    <MultiRangeSlider min={0} max={1000}/>

                    {floatRange.map((p,index) => {
                        return <FilterButton key={index} val={p} dispatch={handleList} type={"PRICE"}/>
                    })}
                </div>
                </div>
                <div className="function-line">
                    <h3>Rarity:</h3>
                    {rarity.map((p,index) => {
                        return <FilterButton key={index} val={p} dispatch={handleList} type={"RARITY"}/>
                    })}
                </div>
                
            </div>
            <h1 className="title">Shop</h1>
        </div>
    )
}