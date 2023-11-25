import { useDispatch } from "react-redux"
import { SET_CATEGORY } from "../store/reducers/board.reducer"
import { useNavigate } from 'react-router-dom'
export function CategoryPreview({ category }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function setSelectedCategory(categoryName) {
        dispatch({
            type: SET_CATEGORY, selectedCategory: categoryName
        })
        navigate('/product')
    }
    return (
        <div className="category-card" onClick={() => setSelectedCategory(category.name)}>
            <img src={category.image} alt={category.name + 'image'} />
            <h1>{category.name}</h1>
        </div>
    )
}