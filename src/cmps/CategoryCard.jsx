export function CategoryCard({category}) {
    return (
            <div key={category.id} className="category-card">
                <img src={category.image} alt={category.name + 'image'} />
                <h1>{category.name}</h1>
            </div>
    )
}