import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import '../main.css'
import useStyles from "../styles";


function SelectableTable(props){
    const classes = useStyles();

    const [selected, setSelected] = React.useState([]);

    const labels = props.columns.map((c, i)=>{
        return (<TableCell className={classes.sizeSmall} key={i}>{c.label}</TableCell>)
    })

    function Rows(props){
        let rows = [];
        for (let i=0; i<props.columns.length; i++){
            rows.push(<TableCell className={classes.sizeSmall}
                                 key={i+1}>{props.row[props.columns[i].key]}</TableCell>)
        }
        return rows;
    }
    const handleClick = (event, row) => {
        const selectedIndex = selected.indexOf(row.id);
        let newSelected = [];
        var iss = false;

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row.id);
            console.info('a')
            iss = true;
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            console.info('b')
            iss = false;
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            console.info('c')
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
            console.info('b')
        }
        props.onSelect({row: row, isSelected: iss})
        setSelected(newSelected)
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const data = props.items ? props.items : []



    return (
        <TableContainer component={Paper}>
            <Table size='small' aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.sizeSmall}></TableCell>
                        {labels}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((r, index) => {
                        const isItemSelected = isSelected(r.id);
                        return (
                            <TableRow key={r.id}
                                      hover
                                      onClick = {(event) => handleClick(event, r)}
                                      role='checkbox'
                                      selected={isItemSelected}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        // style={{padding: '0px'}}
                                        checked={isItemSelected}/>
                                </TableCell>
                                <Rows row={r} columns={props.columns}/>
                            </TableRow>
                        )})
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default SelectableTable