import {useField} from "formik";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import React from "react";

const CareerTypeSelect = ({...props}) => {

    const [field] = useField({
        name: props.name,
    });

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel id="search-type">Tipo de Carrera</InputLabel>
            <Select
                labelId="search-type"
                label="Tipo de carrera"
                {...field}
                {...props}
            >
                <MenuItem value="all"> <em>-</em> </MenuItem>
                <MenuItem value="Ingenieria"> Ingenieria </MenuItem>
                <MenuItem value="Ingenieria Civil"> Ingenieria Civil </MenuItem>
                <MenuItem value="Ingenieria de Ejecucion"> Ingenieria de Ejecución </MenuItem>
                <MenuItem value="Tecnico Universitario"> Técnico Universitario </MenuItem>
            </Select>
        </FormControl>
    );
}

export default CareerTypeSelect