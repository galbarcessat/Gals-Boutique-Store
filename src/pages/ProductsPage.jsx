import { useDispatch, useSelector } from "react-redux"
import { ProductsList } from "../cmps/ProductsList"
import { boardService } from "../services/board.service.local"
import { SET_CATEGORY } from "../store/reducers/board.reducer"
import { useState } from "react"
import { useEffect } from "react"
import { FilterSection } from "../cmps/FilterSection.jsx"
import { UserMsg } from "../cmps/UserMsg"

export function ProductsPage() {
    const products = useSelector(state => state.boardModule.boards)
    const selectedCategory = useSelector(state => state.boardModule.selectedCategory)
    const [productsToShow, setProductsToDisplay] = useState([])
    const [filterSortBy, setFilterSortBy] = useState({ txt: '', price: '', sortBy: '' })
    const dispatch = useDispatch()

    useEffect(() => {
        setSelectedCategory(selectedCategory)
    }, [filterSortBy])

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
        if (filteredProducts.length === 0) filteredProducts = products.slice()

        if (filterSortBy.price) {
            filteredProducts = filteredProducts.filter(product => filterSortBy.price > product.price)
        }

        if (filterSortBy.txt) {
            filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(filterSortBy.txt.toLowerCase()))
        }

        if (filterSortBy.sortBy) {
            if (filterSortBy.sortBy === 'low') {
                filteredProducts.sort((a, b) => a.price - b.price)
            } else if (filterSortBy.sortBy === 'high') {
                filteredProducts.sort((a, b) => b.price - a.price)
            } else if (filterSortBy.sortBy === 'none') {
                filteredProducts = filteredProducts.slice()
            }
        }

        setProductsToDisplay(filteredProducts)
    }

    return (
        <section className="products-page-outer-container main-layout">
            <UserMsg />
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
                <FilterSection filterSortBy={filterSortBy} setFilterSortBy={setFilterSortBy} />
                <ProductsList products={productsToShow} />
            </section>
        </section>
    )

}