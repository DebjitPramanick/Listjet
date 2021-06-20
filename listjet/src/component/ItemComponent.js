import React, {useState} from 'react'

import {
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    TextField,
} from "@material-ui/core"
import { useMutation } from '@apollo/client'
import { DELETE_ITEM, GET_ITEMS, UPDATE_ITEM } from '../queries/Queries'

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const ItemComponent = ({item, color, i}) => {

    const [title, setTitle] = useState('')
    const [update, setUpdate] = useState(false)

    const [deleteItem] = useMutation(DELETE_ITEM)
    const [updateItem] = useMutation(UPDATE_ITEM)

    const deleteTask = (id) => { deleteItem({ variables: { id: id }, refetchQueries: [{ query: GET_ITEMS }] }) }
    const updateTask = (id) => {
        if (title !== '') {
            updateItem({ variables: { id: 26, title: title }, refetchQueries: [{ query: GET_ITEMS }] })
            setUpdate(false)
        }
    }


    return (
        <ListItem button key={item.id}>
            <ListItemIcon>
                <Avatar style={{ backgroundColor: color, width: 30, height: 30, fontSize: 14 }}>{i + 1}</Avatar>
            </ListItemIcon>
            {
                !update ? (
                    <ListItemText primary={item.title} />
                ) : (
                    <TextField
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                )
            }
            <ListItemSecondaryAction>
                <IconButton>
                    {!update ? (
                        <EditIcon style={{ color: color }} onClick={() => setUpdate(true)} />
                    ) : (
                        <CheckCircleIcon style={{ color: color }} onClick={() => updateTask(item.id)} />
                    )}
                </IconButton>
                <IconButton onClick={() => deleteTask(item.id)}>
                    <DeleteIcon style={{ color: color }} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default ItemComponent
