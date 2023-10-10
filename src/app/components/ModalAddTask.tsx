import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { Store } from '../../app/store'
import { createContext, useContext } from "react"
import { observer } from 'mobx-react-lite';
import StoreContext from '../StoreContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CustomizedDialogs = observer(() => {
    const store = useContext(StoreContext)

    const handleClickOpenNewProject = () => {
        store?.setOpenNewProject(true);
    };
    const handleCloseNewProject = () => {
        store?.setOpenNewProject(false);
    };

    const handleAddProjectAndClose = () => {
        store?.setOpenNewProject(false);
        store?.addProject();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpenNewProject}>
                Add Project
            </Button>
            <BootstrapDialog
                onClose={handleCloseNewProject}
                aria-labelledby="customized-dialog-title"
                open={store?.openNewProject ? store?.openNewProject : false}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Create new Project
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseNewProject}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <div>
                        <TextField
                            label="Name project"
                            variant="outlined"
                            value={store?.newProjectName}
                            onChange={(e) => store?.changeNewProjectName(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Description project"
                            variant="outlined"
                            value={store?.newProjectDescription}
                            onChange={(e) => store?.changeNewProjectDescription(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        disabled={store?.newProjectName.length == 0}
                        onClick={handleAddProjectAndClose}>
                        Add project
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
})

export default CustomizedDialogs