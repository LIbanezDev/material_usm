import React from 'react';
import {Grid} from "@material-ui/core";
import CustomForm from "../src/components/form/generalUse/CustomForm";

const Upload = () => {

    return (
        <Grid container>
            <CustomForm/>
            <h2> Upload Files </h2>
        </Grid>
    );
};


export default Upload;