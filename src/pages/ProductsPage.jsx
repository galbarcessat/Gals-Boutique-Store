import { useDispatch, useSelector } from "react-redux"
import { ProductsList } from "../cmps/ProductsList"
import { boardService } from "../services/board.service.local"
import { SET_CATEGORY } from "../store/reducers/board.reducer"
import { useState } from "react"
import { useEffect } from "react"

export function ProductsPage() {
    const products = useSelector(state => state.boardModule.boards)
    const selectedCategory = useSelector(state => state.boardModule.selectedCategory)
    const [productsToShow, setProductsToDisplay] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        setSelectedCategory(selectedCategory)
    }, [])

    function getAllCategories() {
        return boardService.getAllCategories(products)
    }

    function setSelectedCategory(categoryName) {
        dispatch({
            type: SET_CATEGORY, selectedCategory: categoryName
        })
        filterProducts(categoryName)
    }

    function filterProducts(categoryName) {
        let filteredProducts = products.filter(prod => prod.category.name === categoryName)
        if (filteredProducts.length === 0) filteredProducts = products
        setProductsToDisplay(filteredProducts)
    }

    //ADD SORT / FILTER BY PRICE / FILTER BY TEXT
    return (
        <section className="products-page-container">
            <h1 className="products-title">Products</h1>
            <div className="categories-nav-container">
                <span onClick={() => setSelectedCategory(null)}
                    className={`category-name ${!selectedCategory ? 'selected' : ''}`}>
                    All
                </span>
                {getAllCategories().map(category => (
                    <span
                        onClick={() => setSelectedCategory(category.name)}
                        key={category.id}
                        className={`category-name ${selectedCategory === category.name ? 'selected' : ''}`}>
                        {category.name}
                    </span>
                ))}
            </div>
            <ProductsList products={productsToShow} />
        </section>
    );

}