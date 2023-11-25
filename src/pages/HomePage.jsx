
import { useEffect } from "react"
import { loadProducts } from "../store/actions/board.action"
import { useSelector } from "react-redux"
import { HomeNavBar } from "../cmps/HomeNavBar"
import { HomeHero } from "../cmps/HomeHero"
import { HomeBreakLine } from "../cmps/HomeBreakLine"
import { CategoriesList } from "../cmps/CategoriesList"
import { FeaturedProducts } from "../cmps/FeaturedProducts"
import { DiscountShowing } from "../cmps/DiscountShowing"
import { Footer } from "../cmps/Footer"
import { boardService } from "../services/board.service.local"
export function HomePage() {
    const products = useSelector(state => state.boardModule.boards)

    useEffect(() => {
        loadProducts()
    }, [])


    function getFeaturedProducts() {
        const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
        return shuffledProducts.splice(0, 4)
    }
    function getAllCategories() {
        return boardService.getAllCategories(products)
    }

    return (
        <section className="main-layout">
            <HomeHero />
            <HomeBreakLine />
            <CategoriesList getAllCategories={getAllCategories} />
            <FeaturedProducts getFeaturedProducts={getFeaturedProducts} />
            <DiscountShowing />
        </section>
    )
}

{/* <div>
{getAllCategories().map(category => <span key={category.id} className="category-name">{category.name}</span>)}
</div> */}

//  {/* CategoryList */}
//  <div className="categories-container">
//  {getAllCategories().map(category => (
//      // CategoryPreview
//      <div key={category.id} className="category-card">
//          <img src={category.image} alt={category.name + 'image'} />
//          <h1>{category.name}</h1>
//      </div>
//  ))}
// </div>