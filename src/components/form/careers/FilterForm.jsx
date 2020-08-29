import React from 'react';
import {Field, Form, Formik} from 'formik';
import {FormControl, Grid, InputLabel, MenuItem, Paper, Select, Button} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useRouter} from "next/router";
import CareerSelect from "./CareerSelect";
import SemesterSelect from "./SemesterSelect";
import SubjectSelect from "./SubjectSelect";
import CareerTypeSelect from "./CareerTypeSelect";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: "auto",
        maxWidth: 500,
        padding: theme.spacing(3)
    }
}))

const FilterForm = ({careers, subjects, singleColumn}) => {

    const classes = useStyles()
    const {query, replace} = useRouter()
    const smValue = singleColumn ? 12 : 6;

    const initialValues = {
        type: query.type || 'all',
        career: query.career || 0,
        semester: query.semester || 0,
        subject: query.subject || 0
    }


    return (
        <Formik initialValues={initialValues} onSubmit={(values) => {
            replace(
                {
                    pathname: '/files',
                    query: {...values, page: 1},
                },
                undefined,
                {shallow: true}
            );
        }}>
            {({values}) => (
                <Form>
                    <Paper elevation={5} className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={smValue}>
                                <CareerTypeSelect
                                    name="type"
                                />
                            </Grid>
                            <Grid item xs={12} sm={smValue}>
                                <CareerSelect type={values.type}
                                              careers={careers}
                                              name="career"
                                />
                            </Grid>
                            <Grid item xs={12} sm={smValue}>
                                <SemesterSelect type={values.type}
                                                name="semester"
                                />
                            </Grid>
                            <Grid item xs={12} sm={smValue}>
                                <SubjectSelect career={values.career}
                                               semester={values.semester}
                                               name="subject"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" fullWidth color="primary" type="submit">
                                    Buscar Archivos
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Form>
            )}
        </Formik>
    );
};


export default FilterForm;