import { Api } from '../../types/Api'
import './Card.scss' 
export default function Card(props:any)
{
    return (
        <div className="card">
            <h2 className="card-title">{props.name}</h2>
            <img className="card-img" src={props.image}></img>
            <div className="card-bot">
                <p className="card-float">{props.exterior}</p>
                <div className="card-bottom">
                    <h3>{props.price}</h3>
                    <p>|</p>
                    <button>Add to cart</button>
                </div>
            </div>
        </div>
    )
}