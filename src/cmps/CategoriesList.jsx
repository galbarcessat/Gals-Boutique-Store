import { CategoryPreview } from "./CategoryPreview";

export function CategoriesList({ getAllCategories }) {

    return (
        <section className="categories-section">
            <div className="categories-section-heading">
                <h1>Shop By Category</h1>
                <p>Visit our shop to see amazing creations from our desiginers</p>
            </div>
            <div className="categories-container" data-aos="fade-up" data-aos-easing="ease-in-out">
                {getAllCategories().map(category => (
                    <CategoryPreview category={category} key={category.id} />
                ))}
            </div>
        </section>
    )
}
