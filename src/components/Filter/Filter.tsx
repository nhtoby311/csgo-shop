import './Filter.scss'
import filter from '../../assets/filter.svg' 
import gsap from 'gsap'
import FilterButton from './FilterButton/FilterButton'
import useFilter from '../../hooks/useFilter'

export default function Filter()
{
    const {priceRange, exterior,rarity,floatRange,dispatch} = useFilter()

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
                        return <FilterButton key={index} val={p} dispatch={() => dispatch({type:"SET_FILTER"})}/>
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