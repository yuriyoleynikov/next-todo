"use client"
import { useState } from 'react';
import Image from 'next/image'
import { observer } from 'mobx-react-lite'
import { createContext, useContext } from "react"
import { myStore } from './store'
import { Button } from '@mui/material'
import CustomizedDialogs from './components/ModalAddTask'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Checkbox from '@mui/material/Checkbox';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { TextField } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from 'next/link';
import StoreContext from './StoreContext';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Home = observer(() => {
    const store = useContext(StoreContext)
    console.log(store)

    const handleDeleteProjectAndClose = (id: number) => {
        store?.deleteProject(id);
        store?.setOpenDelete(false);
    }

    return (
        <div>
            <Header />
            <div>Projects:</div>
            <CustomizedDialogs />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {store?.projects.length !== 0 ?
                            store?.projects.map(project =>
                                <TableRow
                                    key={project.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Checkbox {...label} checked={project.done} onChange={() => store?.changeProjectStatus(project.id)} />
                                    </TableCell>
                                    <TableCell>{project.id == store.editId ? <>
                                        <><TextField
                                            id="standard-basic"
                                            variant="standard"
                                            value={store?.projectName}
                                            onChange={(e) => store?.changeProjectName(e.target.value)}
                                        />
                                            <IconButton
                                                aria-label="delete"
                                                size="small"
                                                onClick={() => store?.editCancelAndOff()}
                                            >
                                                <CancelIcon fontSize="inherit" />
                                            </IconButton>
                                        </> {project.name !== store?.projectName ? <><IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => store?.editSaveAndOff()}
                                        >
                                            <CheckCircleOutlineIcon fontSize="inherit" />
                                        </IconButton>

                                        </> : null}
                                    </> : <Link href={`project/${project.id}`}>{project.name}</Link>}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => store?.editStart(project.id)}
                                        >
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => store?.setOpenDelete(true)}
                                        >
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                        <Dialog
                                            open={store?.openDelete}
                                            onClose={() => store?.setOpenDelete(false)}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {`Удаление`}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Вы уверены?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => store?.setOpenDelete(false)}>Отмена</Button>
                                                <Button onClick={() => handleDeleteProjectAndClose(project.id)} autoFocus>
                                                    Удалить
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>)
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Footer />
        </div>
    )
})

const HomeMain = () => {
    return (
        <StoreContext.Provider value={myStore}>
            <Home />
        </StoreContext.Provider>
    )
}

export default HomeMain
