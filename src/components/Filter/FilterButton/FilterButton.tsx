import { useEffect, useState } from 'react';
import './FilterButton.scss'
export default function FilterButton(props:any)
{
    const [active,setActive] = useState(false) 

    const activatedClass = ()=>
    {
        if (active === true) return "active-filter";
        return "";
    }

    const toogle = ()=>
    {
        setActive(!active);
    }

    useEffect(()=>{
        props.dispatch(props.val,props.type,active)
        
    },[active])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={`btn-cont ${activatedClass()}`} onClick={()=>{
            toogle()
            }}>
            <h4>{props.val}</h4>
        </div>
    )
}