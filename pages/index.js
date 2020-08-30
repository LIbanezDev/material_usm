import React from 'react';
import FilterForm from "../src/components/form/careers/FilterForm";
import {executeQuery} from "../src/graphql/queries";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const IndexPage = ({careers, subjects}) => {

    return (
        <Grid container>
            <Grid item xs={12} lg={6}>
                <Typography variant="h2" gutterBottom>
                    Material Universitario
                </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
                <FilterForm careers={careers} subjects={subjects}/>
            </Grid>
        </Grid>
    );
};

export const getServerSideProps = async (ctx) => {

    const {type} = ctx.query

    const {careers} = await executeQuery(`careers(type: "${type}") {
                                                         id,
                                                         name,
                                                      }`)
    if(ctx.query.subject) {
        const {subjects} = await executeQuery(`subjects(careerId: ${ctx.query.subject}) {
                                                    id
                                                    name
                                                    semester
                                                }`)
        return {
            props: {
                careers,
                subjects
            }
        }
    }

    return {
        props: {
            careers
        }
    }

}

export default IndexPage;

