
import { useEffect } from "react"
import { loadProducts } from "../store/actions/board.action"
import { useSelector } from "react-redux"
import { HomeHero } from "../cmps/HomeHero"
import { HomeBreakLine } from "../cmps/HomeBreakLine"
import { CategoriesList } from "../cmps/CategoriesList"
import { FeaturedProducts } from "../cmps/FeaturedProducts"
import { DiscountShowing } from "../cmps/DiscountShowing"
import { productService } from "../services/board.service.local"
import { UserMsg } from "../cmps/UserMsg"
import { dataTest } from "../data/products"
import { utilService } from "../services/util.service"


export function HomePage() {
    const products = useSelector(state => state.boardModule.products)
    useEffect(() => {
        loadProducts()
    }, [])

    function getFeaturedProducts() {
        const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
        return shuffledProducts.splice(0, 4)
    }
    function getAllCategories() {
        return productService.getAllCategories(products)
    }

    return (
        <section className="main-layout">
            <UserMsg />
            <HomeHero />
            <HomeBreakLine />
            <CategoriesList getAllCategories={getAllCategories} />
            <FeaturedProducts getFeaturedProducts={getFeaturedProducts} />
            <DiscountShowing />
        </section>
    )
}
