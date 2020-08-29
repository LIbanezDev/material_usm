import React from 'react';
import {Button} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const Upload = ({classes}) => {
    return (
        <form>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button
                    variant="contained"
                    color="default"
                    component="span"
                    startIcon={<CloudUploadIcon />}>
                    Subir archivos
                </Button>
            </label>
        </form>
    );
};

export default Upload;