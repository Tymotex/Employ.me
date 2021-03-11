import {
    Grid, TextField
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import styles from './Modal.module.scss';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

// TODO!!!!!!!
// Modals are repetitive.
// Maybe extract most of the html to a base component


export default function TransitionsModal({ open, handleClose }) {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={styles.window}>
                        <h2 className={styles.title} id="transition-modal-title">
                            Create Board
                        </h2>
                        <form autoComplete="off">
                            <div className={styles.textGroup}>
                                <TextField className={styles.nameBox}
                                    required
                                    type="name"
                                    id="outlined-required"
                                    label="Board Name"
                                    value="Software Engineering"
                                    variant="outlined"
                                />
                                <TextField className={styles.emailBox}
                                    required
                                    multiline
                                    id="outlined-required"
                                    label="Description"
                                    value="Lorem ipsum"
                                    variant="outlined"
                                />
                            </div>
                        </form>
                        <Grid container className={styles.buttonGroup}>
                            <Grid item xs={6}>
                                <Button className={styles.cancelButton} variant="contained" color="danger">Cancel</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button className={styles.registerButton} variant="contained" color="primary">Create</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
