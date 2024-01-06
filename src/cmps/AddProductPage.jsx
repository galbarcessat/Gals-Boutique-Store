import { FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material"
import { useState, useRef } from "react"
// {{ id: 23, name: 'Clothes', image: 'https://i.imgur.com/QkIa5tT.jpeg' }}>
// {{ id: 24, name: 'Electronics', image: 'https://i.imgur.com/ZANVnHE.jpeg' }}
// {{ id: 25, name: 'Furniture', image: 'https://i.imgur.com/Qphac99.jpeg' }}
// {{ id: 26, name: 'Shoes', image: 'https://i.imgur.com/qNOjJje.jpeg' }}>
// {{ id: 27, name: 'Miscellaneous', image: 'https://i.imgur.com/BG8J0Fj.jpg' }}
export function AddProductPage() {
    const [newProduct, setNewProduct] = useState({ title: '', description: '', category: '', price: '', images: [] })
    const [isDragging, setIsDragging] = useState(false)
    const filesInputRef = useRef(null)

    function selectFiles() {
        filesInputRef.current.click()
    }

    function onFilesSelect(event) {
        const files = event.target.files
        saveFiles(files)
    }

    function saveFiles(files) {
        if (files.length > 0) {
            setNewProduct((prevNewProduct) => {
                const updatedImages = [...prevNewProduct.images]

                for (let i = 0; i < files.length; i++) {
                    if (files[i].type.split('/')[0] !== 'image') continue
                    if (!updatedImages.some((image) => image === files[i].url)) {
                        updatedImages.push(
                            URL.createObjectURL(files[i]),
                        )
                    }
                }

                return { ...prevNewProduct, images: updatedImages }
            })
        }
    }

    function deleteImage(index) {
        setNewProduct((prevNewProduct) => {
            const updatedImages = prevNewProduct.images.filter((image, i) => i !== index)
            return { ...prevNewProduct, images: updatedImages }
        })
    }

    function onDragOver(event) {
        event.preventDefault()
        setIsDragging(true)
        event.dataTransfer.dropEffect = "copy"
    }

    function onDragLeave(event) {
        event.preventDefault()
        setIsDragging(false)
    }

    function onDrop(event) {
        event.preventDefault()
        setIsDragging(false)
        const files = event.dataTransfer.files
        saveFiles(files)
    }

    function onSaveProduct() {
        console.log('newProduct:', newProduct)
        // change newProduct.category to the object of the category with getCategoryById()
        // check if all fields were checked/filled
        // save new product to db 
        // save new product to store 
        // navigate to productDetails with the new product id
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }
        console.log('field:', field)
        console.log('value:', value)

        setNewProduct((prevNewProduct) => ({ ...prevNewProduct, [field]: value }))
    }
    console.log('newProduct:', newProduct)
    return (
        <div className="add-product-page main-layout">
            <h1>New product</h1>
            <div className="inner-container">

                <div className="left-container">
                    <div>
                        <label htmlFor="title">Product Name</label>
                        <input type="text" name="title" id="title" placeholder="Product name" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" value={newProduct.category} onChange={handleChange}>
                            <option value='' disabled hidden>Choose category</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" placeholder="Enter price" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" rows="12" placeholder="Enter description" onChange={handleChange}>
                        </textarea>
                    </div>
                </div>
                <div className="right-container">
                    <div className="card">
                        <div className="top">
                            <p>Drag & Drop product images</p>
                        </div>
                        <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                            {isDragging ?
                                (<span className="select">
                                    Drop images here
                                </span>)
                                :
                                (<>
                                    Drag & Drop images here or {" "}
                                    <span className="select" role="button" onClick={selectFiles}>
                                        Browse
                                    </span>
                                </>
                                )}

                            <input type="file" name="file" className="file" multiple ref={filesInputRef} onChange={onFilesSelect} />
                        </div>
                        <div className="container">
                            {newProduct.images.map((image, index) => (
                                <div className="image" key={index}>
                                    <span className="delete" onClick={() => deleteImage(index)}>
                                        &times;
                                    </span>
                                    <img src={image} alt={image} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div onClick={() => onSaveProduct()} className="btn-save-product">Save product</div>
                </div>

            </div>

        </div>
    )
}
