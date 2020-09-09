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

export const getServerSideProps = async () => {
    const {careers, subjects} = await executeQuery(`careers {
                                                         id,
                                                         name,
                                                      }
                                                      subjects {
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

export default IndexPage;

