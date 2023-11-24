import { CategoryCard } from "./CategoryCard";

export function CategoriesList({ getAllCategories }) {

    return (
        <section className="categories-section">
            <div className="categories-section-heading">
                <h1>Shop By Category</h1>
                <p>Visit our shop to see amazing creations from our desiginers</p>
            </div>
            <div className="categories-container">
                {getAllCategories().map(category => (
                    <CategoryCard category={category} />
                ))}
            </div>
        </section>
    )
}
