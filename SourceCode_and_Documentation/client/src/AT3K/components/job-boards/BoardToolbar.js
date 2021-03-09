import React from 'react';
import Paper from '@material-ui/core/Paper';
import styles from './BoardToolbar.module.scss';
import { BoardDropdown } from '.';
import {
    BoardSettingsModal
} from '../modals';
import {
    Grid
} from '@material-ui/core';
import AddColumnButton from './AddColumnButton'; 
import AddRecordButton from './AddRecordButton'; 
import RecordSearchBar from './RecordSearchBar';

const BoardToolbar = ({ boardType, handleChangeBoard }) => {
    return (
        <Paper className={styles.toolbar} elevation={3}>
            <div className={styles.content}>
                <Grid container>
                    <Grid item xs={6}>
                        <div className={styles.full}>
                            <RecordSearchBar /> 
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={styles.full}>
                            <BoardDropdown 
                                boardType={boardType} 
                                handleChangeBoard={handleChangeBoard}
                            />
                        </div>
                    </Grid>
                </Grid>
                <BoardSettingsModal className={styles.button} />
                <AddColumnButton className={styles.button} />
                <AddRecordButton className={styles.button} />
            </div>
        </Paper>
    );
};

export default BoardToolbar;