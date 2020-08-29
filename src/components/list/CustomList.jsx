import React from 'react';
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from "next/link";
import Table from "@material-ui/core/Table";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const CustomList = ({data, link}) => {

    const classes = useStyles();
    const objectKeys = Object.keys(data[0])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {objectKeys.map((objKey, index) =>
                            <TableCell key={index}>
                                {objKey.toUpperCase()}
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(el => (
                        <TableRow key={el.id}>
                            {objectKeys.map((objKey, index) =>
                                <TableCell component="th" scope="row" key={index}>
                                    {(index === 0 && link && link.isPresent)
                                        ?
                                        <Link href={link.url} as={`/careers/${el.id}`}>
                                            <a>
                                                <h2> {el[objKey]} </h2>
                                            </a>
                                        </Link>
                                        :
                                        el[objKey]
                                    }
                                </TableCell>)
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomList;