import React from 'react';
import {Grid} from "@material-ui/core";
import CustomForm from "../src/components/form/generalUse/CustomForm";
import makeStyles from "@material-ui/core/styles/makeStyles";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Ingresar o subir como anónimo', 'Seleccionar carrera/s y asignatura/s', 'Subir archivos!'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Step 1: Select campaign settings...';
        case 1:
            return 'Step 2: What is an ad group anyways?';
        case 2:
            return 'Step 3: This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

const Upload = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const steps = getSteps();

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    return (
        <Grid container>
            <Grid item xs={12} lg={4}>
                <CustomForm/>
            </Grid>
            <Grid item xs={12} lg={8} spacing={1}>
                <div className={classes.root}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepButton onClick={handleStep(index)} completed={completed[index]}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {allStepsCompleted() ? (
                            <div>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Button onClick={handleReset}>Reset</Button>
                            </div>
                        ) : (
                            <div>
                                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                <div>
                                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        Next
                                    </Button>
                                    {activeStep !== steps.length &&
                                    (completed[activeStep] ? (
                                        <Typography variant="caption" className={classes.completed}>
                                            Step {activeStep + 1} already completed
                                        </Typography>
                                    ) : (
                                        <Button variant="contained" color="primary" onClick={handleComplete}>
                                            {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};


export default Upload;