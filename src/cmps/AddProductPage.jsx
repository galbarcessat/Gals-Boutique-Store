import { FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material"
import { useState, useRef } from "react"
// {{ id: 23, name: 'Clothes', image: 'https://i.imgur.com/QkIa5tT.jpeg' }}>
// {{ id: 24, name: 'Electronics', image: 'https://i.imgur.com/ZANVnHE.jpeg' }}
// {{ id: 25, name: 'Furniture', image: 'https://i.imgur.com/Qphac99.jpeg' }}
// {{ id: 26, name: 'Shoes', image: 'https://i.imgur.com/qNOjJje.jpeg' }}>
// {{ id: 27, name: 'Miscellaneous', image: 'https://i.imgur.com/BG8J0Fj.jpg' }}
export function AddProductPage() {
    const [newProduct, setNewProduct] = useState({ title: '', description: '', category: '', price: '', images: [] })
    const [images, setImages] = useState([])
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
            for (let i = 0; i < files.length; i++) {
                if (files[i].type.split('/')[0] !== 'image') continue
                if (!images.some(image => image.name === files[i].name)) {
                    setImages(prevImages => [...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    }
                    ])
                }
            }
        }
    }

    function deleteImage(index) {
        setImages(prevImages => prevImages.filter((image, i) => i !== index))
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
    {/* אפשרות לכתוב
            כותרת
            תיאור
            לבחור קטגוריה מתוך dropdown
            לכתוב מחיר
            להוסיף עד 3 תמונות */
        // בשמירה לדאוג לcategory שיהיה אובייקט
    }
    {/* <form action="submit"> */ }
    console.log('images:', images)
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
                {/* change it so when i upload images it will update the newProduct state instead of the images state */}
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
                            {images.map((image, index) => (
                                <div className="image" key={index}>
                                    <span className="delete" onClick={() => deleteImage(index)}>
                                        &times;
                                    </span>
                                    <img src={image.url} alt={image.name} />
                                </div>
                            ))}
                        </div>

                        {/* <button>
                            Upload
                        </button> */}
                    </div>

                    <div className="btn-save-product">Save product</div>
                </div>

            </div>

        </div>
    )
}






// <div className="filter-by-text">
// <label htmlFor="Title">Title :</label>
// <TextField id="outlined-basic" label="Title" variant="outlined" size="small" name="title"
//     onChange={handleChange} value={newProduct.title}
// />
// </div>
// <div>
// <label htmlFor="">Description : </label>
// <TextareaAutosize
//     style={{
//         fontSize: '16px',
//     }}
//     placeholder="Description"
//     variant="standard"
//     name='description'
//     label='Description'
//     value={newProduct.description}
//     onChange={handleChange}
// />

// </div>
// <div>
// <label htmlFor="category">Category : </label>
// <FormControl fullWidth className="category-select" size="small">
//     <InputLabel id="demo-simple-select-label">Category</InputLabel>
//     <Select
//         labelId="demo-simple-select-label"
//         id="demo-simple-select"
//         value={newProduct.category}
//         name="category"
//         label='Category'
//         onChange={handleChange}
//     >
//         <MenuItem value={{ id: 23, name: 'Clothes', image: 'https://i.imgur.com/QkIa5tT.jpeg' }}>
//             Clothes
//         </MenuItem>
//         <MenuItem value={{ id: 24, name: 'Electronics', image: 'https://i.imgur.com/ZANVnHE.jpeg' }}>
//             Electronics
//         </MenuItem>
//         <MenuItem value={{ id: 25, name: 'Furniture', image: 'https://i.imgur.com/Qphac99.jpeg' }}>
//             Furniture
//         </MenuItem>
//         <MenuItem value={{ id: 26, name: 'Shoes', image: 'https://i.imgur.com/qNOjJje.jpeg' }}>
//             Shoes
//         </MenuItem>
//         <MenuItem value={{ id: 27, name: 'Miscellaneous', image: 'https://i.imgur.com/BG8J0Fj.jpg' }}>
//             Miscellaneous
//         </MenuItem>
//     </Select>
// </FormControl>
// </div>
// <div className="filter-by-price">
// <label>Price :</label>
// <TextField id="outlined-basic" label="Price" variant="outlined" size="small" name="price" type="number"
//     onChange={handleChange} value={newProduct.price}
// />
// </div>
// {/* <button>Save</button>
// </form> */}
