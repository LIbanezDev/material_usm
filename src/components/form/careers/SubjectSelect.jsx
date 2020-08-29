import graphql from "../../../graphql/client";
import {useField} from "formik";
import useSWR from "swr";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import React from "react";

const fetcher = query => graphql.request(query)

const SubjectSelect = ({career, subjects, semester, ...props}) => {

    const [field] = useField({
        name: props.name,
    });

    const query = (career === 0 && semester === 0)
        ?
        `{subjects { id name }}`
        :
        `{subjects (careerId: ${career}, semester: ${semester}) { id name }}`

    const {data} = useSWR(query, fetcher, {
        dedupingInterval: 60000
    })

    let newSubjects = []
    if (data) {
        newSubjects = data.subjects;
    }

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel id="search-subject">Asignatura</InputLabel>
            <Select
                labelId="search-subject"
                label="Asignatura"
                {...props}
                {...field}
            >
                <MenuItem value={0}> <em> Todas las asignaturas </em> </MenuItem>
                {
                    newSubjects.map(({name, id}) =>
                        <MenuItem
                            value={parseInt(id)}
                            key={id}>
                            {name}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
    );
}

export default SubjectSelect