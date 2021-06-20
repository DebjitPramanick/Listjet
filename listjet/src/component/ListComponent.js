import React, { useState } from 'react'
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ITEM, GET_ITEMS } from '../queries/Queries';
import ItemComponent from './ItemComponent';
import {
    Container,
    Box,
    List,
    IconButton,
    Typography,
    Button,
    AppBar,
    Toolbar,
    InputBase
} from "@material-ui/core"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 2,
    },
    title: {
        flexGrow: 1,
        textAlign: "left"
    },
    customizeToolbar: {
        minHeight: 40
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    colors: {
        display: 'flex',
        alignItems: 'center',
        columnGap: '12px',
        margin: '0 10px',
        backgroundColor: "#fff",
        padding: "7.5px",
        borderRadius: theme.shape.borderRadius,
    },
    clopt: {
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        cursor: "pointer"
    }
}));

const ListComponent = () => {

    const classes = useStyles();

    const themes = [
        "#FE6F5E",
        "#FF91AF",
        "#318CE7",
        "#177245",
        "#E48400",
        "#232B2B",
        "#58427C"]

    const { data, loading, error } = useQuery(GET_ITEMS)
    const [createItem] = useMutation(CREATE_ITEM)

    const [color, setColor] = useState('#FE6F5E	')
    const [query, setQuery] = useState('')

    const createTask = () => { createItem({ variables: { title: 'New Task' }, refetchQueries: [{ query: GET_ITEMS }] }) }

    if (loading) {
        return <p>Loading...</p>
    }
    else if (error) {
        return <p>Error....</p>
    }
    else {

        const dataList = data.items.filter(i => {
            return i.title.toLowerCase().toString().includes(query.toLowerCase())
        })

        return (
            <div>
                <Container>
                    <AppBar position="static" className={classes.root} style={{ backgroundColor: color }}>
                        <Toolbar className={classes.customizeToolbar}>
                            <Typography variant="h6" className={classes.title}>
                                Listjet
                            </Typography>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <div className={classes.colors}>
                                {themes.map(t => (
                                    <div className={classes.clopt} style={{ backgroundColor: t }}
                                        onClick={() => setColor(t)} />
                                ))}

                            </div>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                    <Box component="div" stytle={{
                        maxWidth: "500px",
                        margin: "0 auto"
                    }}>
                        <List>
                            {dataList.length > 0 ? dataList.map((item, i) => (
                                <ItemComponent item={item} i={i} color={color} />
                            )) : (
                                <Typography>No Task</Typography>
                            )}
                        </List>
                        {
                            query === '' && 
                            <Button variant="outlined" fullWidth onClick={createTask}>
                            <IconButton style={{ padding: 2 }}>
                                <AddCircleOutlineIcon style={{ color: color }} />
                            </IconButton>
                        </Button>
                        }
                    </Box>
                </Container>
            </div>
        )
    }

}

export default ListComponent
