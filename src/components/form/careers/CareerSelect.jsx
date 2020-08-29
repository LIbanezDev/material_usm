import graphql from "../../../graphql/client";
import {useField, useFormikContext} from "formik";
import useSWR from "swr";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import React from "react";

const fetcher = query => graphql.request(query)

const CareerSelect = ({careers, type, ...props}) => {

    const {setFieldValue} = useFormikContext();

    const [field] = useField({
        name: props.name,
    });

    const query = (type !== 'all') && `{careers(type: "${type}") { id name }}`

    const {data} = useSWR(query, fetcher, {
            dedupingInterval: 60000,
            onSuccess: ({careers: c}) => {
                if (!c.map(a => a.name).includes(field.value)) {

                }
            },
        }
    )

    let newCareers
    if (data) {
        newCareers = data.careers;
    } else {
        newCareers = careers
    }

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel id="search-career">Carrera</InputLabel>
            <Select
                labelId="search-career"
                label="Carreras"
                {...field}
                {...props}
            >
                <MenuItem value={0}>
                    <em>Todas las carreras</em>
                </MenuItem>
                {newCareers.map(({id, name}) => (
                    <MenuItem key={id} value={id}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default CareerSelect