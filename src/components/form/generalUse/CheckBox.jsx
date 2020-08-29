import {useField} from "formik";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import React from "react";

const CheckBox  = props => {
    const [field] = useField({
        name: props.name,
        type: 'checkbox',
        value: props.value
    });
    return (
        <FormControlLabel
            control={<Checkbox {...props} {...field} />}
            label={props.label}
        />
    );
}

export default CheckBox;