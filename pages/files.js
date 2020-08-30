import React from 'react';
import {useRouter} from "next/router";
import FilterForm from "../src/components/form/careers/FilterForm";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {executeQuery} from "../src/graphql/queries";
import {Grid} from "@material-ui/core";
import {getPaginatedFiles} from "../src/helpers/getPaginatedFiles";
import useSWR from "swr";
import deepEqual from 'fast-deep-equal';
import ItemsPagination from "../src/components/files/ItemsPagination";
import {getFormatedQuery} from "../src/helpers/converters";
import graphql from "../src/graphql/client";
import ItemCard from "../src/components/files/ItemCard";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
    container: {
        padding: 5
    },
}))

const fetcher = query => graphql.request(query)

const Files = ({careers, subjects, files, totalPages}) => {

    const classes = useStyles()

    const {query} = useRouter()

    const [serverQuery] = React.useState(query);

    const {queryStaticParameters, queryDynamicParameters} = getFormatedQuery(query)

    const {data} = useSWR(`query { files 
    (${queryDynamicParameters} ${queryStaticParameters}) 
    {
        id name url createdAtFormated createdAt updatedAt
        Subject { name semester Career { name type } }
    }
        filesAmount(${queryDynamicParameters})
    }`, fetcher, {
        dedupingInterval: 15000,
        initialData: deepEqual(query, serverQuery)
            ? {files, totalPages}
            : undefined,
    });
    console.log(data)
    return (
        <Grid container>
            <Grid container spacing={1} className={classes.container}>
                <Grid item xs={12} sm={6} md={5} lg={2}>
                    <FilterForm singleColumn={true} careers={careers} subjects={subjects}/>
                </Grid>
                <Grid container item xs={12} sm={6} md={7} lg={10} spacing={1}>
                    <Grid item xs={12}>
                        <ItemsPagination totalPages={Math.ceil(data?.filesAmount / 6) || totalPages}/>
                    </Grid>
                    {
                        !data ?
                            [...Array(6)].map((e, i) =>
                                <Grid animation="wave" className="animate__animated animate__fadeInDown" item xs={12} sm={6} key={i}>
                                    <Skeleton variant="text" width={650}/>
                                    <Skeleton variant="rect" width={650} height={180}/>
                                </Grid>)
                            :
                            (
                                data.files.length > 0
                                    ?
                                    data.files.map(f =>
                                        (<Grid className="animate__animated animate__fadeIn"
                                                  key={f.id} item xs={12} sm={6}>
                                                <ItemCard file={f}/>
                                            </Grid>))
                                    :
                                    <div> Mensaje bonito: No hay archivos aún :) </div>
                            )

                    }
                    <Grid item xs={12}>
                        <ItemsPagination totalPages={Math.ceil(data?.filesAmount / 6) || totalPages}/>
                    </Grid>
                </Grid>
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


    const {subjects} = await executeQuery(`subjects{
                                                 id,
                                                 name,
                                                 semester
                                                 careerId
                                              } `)


    const {files, totalPages} = await getPaginatedFiles(ctx.query)

    return {
        props: {
            careers,
            subjects,
            files,
            totalPages
        }
    }
}

export default Files;