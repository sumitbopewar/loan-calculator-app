import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Chance from 'chance';
import Typography from '@mui/material/Typography';

const chance = new Chance(42);

function createData(id) {
    return {
        id,
        firstName: chance.first(),
        lastName: chance.last(),
        age: chance.age(),
        state: chance.state({ full: true }),
    };
}

const columns = [
    {
        label: 'Month',
        dataKey: 'month',
    },
    {
        label: 'Principal',
        dataKey: 'principal',
    },
    {
        label: 'Interest',
        dataKey: 'interest',
    },
    {
        label: 'Remaining Balance',
        dataKey: 'remaining',
    },
];

const rows = Array.from({ length: 200 }, (_, index) => createData(index));


const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
    TableRow,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

export default function CommonTable({ emiData, currency, USD }) {
    console.log({ emiData, currency });
    function fixedHeaderContent() {
        return (
            <>
                <TableRow>
                    <TableCell
                        colSpan={columns.length}
                        align="left"
                        sx={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 2,
                            backgroundColor: 'background.paper'
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontSize: "20px", margin: "10px 0px", width: "100%"}}
                            gutterBottom
                        >
                            Amortization Schedule ({currency})
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.dataKey}
                            variant="head"
                            align={column.dataKey === 'month' ? 'left' : 'right'}
                            style={{ width: column.width }}
                            sx={{ backgroundColor: 'background.paper' }}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </>
        );
    }

    function rowContent(_index, row) {
        console.log({ currency });
        return (
            <React.Fragment>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align={column.dataKey === 'month' ? 'left' : 'right'}
                    >
                        {column.dataKey === 'month'
                            ? row[column.dataKey]
                            : `${row[column.dataKey]} ${currency}`}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }

    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <TableVirtuoso
                data={emiData.schedule}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
                currency={currency}
            />
        </Paper>
    );
}
