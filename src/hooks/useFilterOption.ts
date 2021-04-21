import { useContext, useEffect, useReducer } from 'react'
import { ItemContext } from '../contexts/ItemContext'
import { Api } from '../types/Api'

type Action =
{
    type:string,
    payload?: Api[]
}

const uniqueAll = (array:string[],type:string) =>
{
    const sortPrice = (array:string[]) => 
    {
        const bSort = (arr:number[]) => 
        {
            let len = arr.length;
            for (let i = len-1; i>=0; i--){
              for(let j = 1; j<=i; j++){
                if(arr[j-1]>arr[j]){
                    let temp = arr[j-1];
                    arr[j-1] = arr[j];
                    arr[j] = temp;
                 }
              }
            }
            return arr;
        }
        let sortedPrice = bSort(array.map((elem)=> parseInt(elem.slice(0, -1))))
        //console.log(sortedPrice)
        const groupThree = (array:number[]) :string[] =>
        {
            let final = [];
            for (let i = 0;i < array.length; i+=3)
            {
                if (array.length-i > (3-1))
                {
                    final.push(array[i] + " - " + array[i+2])
                }
                else
                {
                    final.push(array[i] + " - " + array[array.length-1])
                }
            }
            return final
        }
        return groupThree(sortedPrice).map((elem)=> elem + '€')
    }

    const sortExterior = (arr:string[]):string[] =>
    {
        const rank = ["FN", "MW", "FT", "WW", "BS"]
        arr.sort( (a,b):number =>
        {
            return rank.indexOf(a) - rank.indexOf(b)
        })
        return arr
    }

    const sortRarity = (arr:string[]):string[] =>
    {
        const rank = ["Convert", "Classified", "Restricted", "Mil-spec Grade", "Industrial Grade","Consumer Grade"]
        arr.sort( (a,b):number =>
        {
            return rank.indexOf(a) - rank.indexOf(b)
        })
        return arr
    }


    switch (type)
    {
        case 'price':
            {
                array.push("0€")
                return ['All',...sortPrice((array.filter((x, i, array) => array.indexOf(x) === i)))]
            }
        case 'rarity':
            return ['All',...sortRarity((array.filter((x, i, array) => array.indexOf(x) === i)))]
        case 'exterior':
            return ['All',...sortExterior((array.filter((x, i, array) => array.indexOf(x) === i)))]
        default:
            return array
    }
}

const rounding = (elem: string):string => 
{
    elem.slice(0, -1)
    return Math.ceil(parseInt(elem) / 100) * 100+"€";
}


function reducer(state:typeof initialState,action:Action)
{
    switch(action.type){
        case "INIT":
            {
                return { 
                    ...state,
                    priceRange:uniqueAll(action.payload!.map((elem) => {return rounding(elem.price)}),'price'),
                    exterior:uniqueAll(action.payload!.map((elem) => {return elem.exterior}),'exterior'),
                    rarity:uniqueAll(action.payload!.map((elem) => {return elem.rarity}),'rarity'),
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

export default function useFilterOption()
{
    const [{priceRange, exterior,rarity,floatRange}, dispatch] =  useReducer(reducer, initialState);
    const items = useContext(ItemContext)

    useEffect(()=>
    {
        dispatch({type:'INIT', payload:items})
    },[items])

    return {priceRange, exterior,rarity,floatRange}
}