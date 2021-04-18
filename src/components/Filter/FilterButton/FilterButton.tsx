import './FilterButton.scss'
export default function FilterButton(props:any)
{
    return (
        <div className="btn-cont">
            <h4>{props.val}</h4>
        </div>
    )
}