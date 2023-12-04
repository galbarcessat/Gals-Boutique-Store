import { FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export function FilterSection({ filterSortBy, setFilterSortBy }) {

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

        setFilterSortBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <div className="filter-section">

            <div className="filter-by-text">
                <h1>Search :</h1>
                <TextField id="outlined-basic" label="Search" variant="outlined" size="small" name="txt"
                    onChange={handleChange} value={filterSortBy.text}
                />
            </div>
            <div className="filter-by-price">
                <h1>Max Price :</h1>
                <TextField id="outlined-basic" label="Price" variant="outlined" size="small"  name="price" type="number"
                    onChange={handleChange} value={filterSortBy.price}
                />
            </div>
            <FormControl fullWidth className="sort-by-select" size="small">
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterSortBy.sortBy}
                    name="sortBy"
                    label='Sort By'
                    onChange={handleChange}
                >
                    <MenuItem value={'none'}>None</MenuItem>
                    <MenuItem value={'high'}>Price : High-Low</MenuItem>
                    <MenuItem value={'low'}>Price : Low-High</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}