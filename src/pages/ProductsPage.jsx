import { useDispatch, useSelector } from "react-redux"
import { ProductsList } from "../cmps/ProductsList"
import { productService } from "../services/board.service.local"
import { SET_CATEGORY } from "../store/reducers/board.reducer"
import { useState } from "react"
import { useEffect } from "react"
import { FilterSection } from "../cmps/FilterSection.jsx"
import { UserMsg } from "../cmps/UserMsg"
import { Pagination } from "@mui/material"

export function ProductsPage() {
    const products = useSelector(state => state.boardModule.products)
    const selectedCategory = useSelector(state => state.boardModule.selectedCategory)
    const [productsToDisplay, setProductsToDisplay] = useState([])
    const [filterSortBy, setFilterSortBy] = useState({ txt: '', price: '', sortBy: '' })
    const [pageIdx, setPageIdx] = useState(1)
    const [pageProducts, setPageProducts] = useState(productsToDisplay)
    const dispatch = useDispatch()

    useEffect(() => {
        setSelectedCategory(selectedCategory)
    }, [filterSortBy, pageIdx])

    function getAllCategories() {
        return productService.getAllCategories(products)
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
        setProductsForPage(filteredProducts)
    }

    function setProductsForPage(filteredProducts) {
        const startIndex = (pageIdx - 1) * 15
        const endIndex = startIndex + 15
        let productsForPage
        if (filteredProducts < 15) {
            productsForPage = filteredProducts
        } else {
            productsForPage = filteredProducts.slice(startIndex, endIndex)
        }
        console.log('pageIdx:', pageIdx)
        console.log('filteredProducts:', filteredProducts)
        console.log('productsForPage:', productsForPage)
        setPageProducts(productsForPage)
    }

    function handlePageChange(event, value) {
        setPageIdx(value)
    }

    console.log('pageIdx:', pageIdx)
    return (
        <section className="products-page-outer-container main-layout">
            <UserMsg />
            <section className="products-page-container">
                <h1 className="products-title">Products</h1>
                <div className="categories-nav-container">
                    <span onClick={() => {
                        setSelectedCategory(null)
                        setPageIdx(1)
                    }}
                        className={`category-name ${!selectedCategory ? 'selected' : ''}`}>
                        All
                    </span>
                    {getAllCategories().map(category => (
                        <span
                            onClick={() => {
                                setSelectedCategory(category.name)
                                setPageIdx(1)
                            }}
                            key={category.id}
                            className={`category-name ${selectedCategory === category.name ? 'selected' : ''}`}>
                            {category.name}
                        </span>
                    ))}
                </div>
                <FilterSection filterSortBy={filterSortBy} setFilterSortBy={setFilterSortBy} />
                <ProductsList products={pageProducts} />
                <Pagination count={Math.ceil(productsToDisplay.length / 15)} page={pageIdx} onChange={handlePageChange} shape="rounded" />
                
            </section>
        </section>
    )

}