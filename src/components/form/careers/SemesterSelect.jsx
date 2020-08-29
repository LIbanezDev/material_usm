import {useField} from "formik";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import React from "react";

const SemesterSelect = ({type, ...props}) => {

    const [field] = useField({
        name: props.name,
    });

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel id="search-semester">Semestre</InputLabel>
            <Select
                labelId="search-semester"
                label="Semestre"
                {...field}
                {...props}
            >
                <MenuItem value={0}>
                    <em>Todos los semestres</em>
                </MenuItem>
                <MenuItem value={1}> 1 </MenuItem>
                <MenuItem value={2}> 2 </MenuItem>
                <MenuItem value={3}> 3 </MenuItem>
                <MenuItem value={4}> 4 </MenuItem>
            </Select>
        </FormControl>
    );
}

export default SemesterSelect