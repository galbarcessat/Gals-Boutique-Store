export function CategoryPreview({ category }) {
    return (
        <div className="category-card">
            <img src={category.image} alt={category.name + 'image'} />
            <h1>{category.name}</h1>
        </div>
    )
}