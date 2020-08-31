import React from "react";
import {Box, Button, Card, CardContent, FormGroup, MenuItem, TextField, Typography} from '@material-ui/core';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {array, boolean, mixed, number, object, string} from 'yup';
import MyCheckbox from "./CheckBox";
import {makeStyles} from "@material-ui/core/styles";
import Upload from "./Upload";

const initialValues = {
    fullName: '',
    initialInvestment: 0,
    investmentRisk: [],
    commentAboutInvestmentRisk: '',
    dependents: -1,
    acceptedTermsAndConditions: false
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));


const CustomForm = ({socket}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Card>
                <CardContent>
                    <Typography variant="h4">New Account</Typography>
                    <Formik
                        validationSchema={
                            object({
                                fullName: string().required('Your name is mandatory!!!').min(2).max(100),
                                initialInvestment: number().required().min(100),
                                dependents: number().required().min(0).max(5),
                                acceptedTermsAndConditions: boolean().oneOf([true]),
                                investmentRisk: array(string().oneOf(['High', 'Medium', 'Low'])).min(1),
                                commentAboutInvestmentRisk: mixed().when('investmentRisk', {
                                    is: investmentRisk => investmentRisk.find(ir => ir === 'High'),
                                    then: string().required().min(20).max(100),
                                    otherwise: string().min(20).max(100)
                                })
                            })
                        }
                        initialValues={initialValues} onSubmit={(values, formikHelpers) => {
                            return new Promise(res => {
                                setTimeout(() => {
                                    console.log(values);
                                    console.log(formikHelpers);
                                    console.log('---------');
                                    res();
                                }, 2500);
                            })
                    }}>
                        {({values, errors, isSubmitting, isValidating}) => (
                            <Form>
                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field name="fullName" as={TextField} label="Full Name"/>
                                        <ErrorMessage name="fullName"/>
                                    </FormGroup>
                                </Box>

                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field
                                            name="initialInvestment"
                                            type="number"
                                            as={TextField}
                                            label="Initial Investment"
                                        />
                                        <ErrorMessage name="initialInvestment"/>
                                    </FormGroup>
                                </Box>

                                <Box marginBottom={2}>
                                    <label>Select the risk you want to take:</label>
                                    <FormGroup>
                                        <MyCheckbox
                                            name="investmentRisk"
                                            value="High"
                                            label="High - Super Risky"
                                        />
                                        <MyCheckbox
                                            name="investmentRisk"
                                            value="Medium"
                                            label="Medium - Risky"
                                        />
                                        <MyCheckbox
                                            name="investmentRisk"
                                            value="Low"
                                            label="Low - Safe"
                                        />
                                    </FormGroup>
                                    <ErrorMessage name="investmentRisk"/>
                                </Box>
                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field
                                            name="commentAboutInvestmentRisk"
                                            as={TextField}
                                            multiline
                                            rows={2}
                                            rowsMax={10}
                                            label="Comment Index Investment Risk"
                                        />
                                        <ErrorMessage name="commentAboutInvestmentRisk"/>
                                    </FormGroup>
                                </Box>

                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field
                                            name="dependents"
                                            label="dependents"
                                            as={TextField}
                                            select
                                        >
                                            <MenuItem value={-1}>Select ...</MenuItem>
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                        </Field>
                                        <ErrorMessage name="dependents"/>
                                    </FormGroup>
                                </Box>

                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <MyCheckbox
                                            name="acceptedTermsAndConditions"
                                            label="Accept terms and conditions"
                                        />
                                        <ErrorMessage name="acceptedTermsAndConditions"/>
                                    </FormGroup>
                                </Box>

                                <Button type="submit" disabled={isSubmitting || isValidating}>
                                    Submit
                                </Button>
                                <pre>{JSON.stringify(errors, null, 4)}</pre>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Upload classes={classes}/>
                </CardContent>
            </Card>
        </div>
    );
}

export default CustomForm;
