
import { useEffect } from "react"
import { loadProducts } from "../store/actions/board.action"
import { useSelector } from "react-redux"
import { HomeNavBar } from "../cmps/HomeNavBar"
import { HomeHero } from "../cmps/HomeHero"
import { HomeBreakLine } from "../cmps/HomeBreakLine"
import { CategoriesList } from "../cmps/CategoriesList"
export function HomePage() {
    const products = useSelector(state => state.boardModule.boards)

    useEffect(() => {
        loadProducts()
    }, [])

    function getAllCategories() {
        let categories = products.reduce((acc, product) => {
            if (!acc.some(cat => cat.name === product.category.name)) {
                acc.push(product.category)
            }
            return acc
        }, [])
        console.log('categories:', categories)
        return categories
    }

    return (
        <section className="main-layout">
            <HomeNavBar />
            <HomeHero />
            <HomeBreakLine />
            <CategoriesList getAllCategories={getAllCategories}/>
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