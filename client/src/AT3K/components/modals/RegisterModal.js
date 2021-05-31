import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
	TextField,
	Grid,
} from '@material-ui/core';
import { Button, GoogleLoginButton } from '../buttons';
import styles from './Modal.module.scss';
import axios from 'axios';
import api from '../../constants/api';
import Cookie from 'js-cookie';
import { Notification } from '../notification';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.8)",
	}
}));


export default function TransitionsModal() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// ===== POST /api/auth/register =====

	const register = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const postData = {
			method: "post",
			url: `${api.BASE_URL}/api/auth/register`,
			data: formData,
			headers: { "Content-Type": "multipart/form-data" }
		};
		const registerRequest = axios(postData);
		Notification.spawnNotification(
			registerRequest,
            "Loading",
			"Successfully registered!",
			"Failed to register!"
		)
		registerRequest.then((newUserData) => {
			// TODO: Do something other than force reload the window
			Cookie.set("user_id", newUserData.data.user_id);
			Cookie.set("token", newUserData.data.token);
			window.location.reload();
		})
		.catch((err) => {
			Notification.spawnError(err);
		});
	}

    // Google Login
    const signinRedirect = () => {
        Notification.spawnSuccess('Signing in via Google');
        window.location.assign(api.GOOGLE_REDIRECT_URI);
    };

	// ===================================

	return (
		<div>
			<Button variant="contained" color="info" onClick={handleOpen}>
				Register
            </Button>
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
						<h2 className={styles.title} id="transition-modal-title">Register</h2>
						<form autoComplete="off" onSubmit={register}>
							<div className={styles.textGroup}>
								<TextField className={styles.nameBox}
									required
									name="username"
									type="name"
									id="outlined-required"
									label="Username"
									variant="outlined"
								/>
								<TextField className={styles.emailBox}
									required
									name="email"
									id="outlined-required"
									label="Email"
									variant="outlined"
								/>
								<TextField className={styles.passwordBox}
									required
									name="password"
									type="password"
									id="outlined-required"
									label="Password"
									variant="outlined"
								/>
								<TextField className={styles.passCheckBox}
									required
									type="password"
									id="outlined-required"
									label="Re-enter Password"
									variant="outlined"
								/>
							</div>
							<GoogleLoginButton onClick={signinRedirect} />
							<Grid container className={styles.buttonGroup}>
								<Grid item xs={6}>
									<Button onClick={handleClose} className={styles.cancelButton} variant="contained" color="danger">Cancel</Button>
								</Grid>
								<Grid item xs={6}>
									<Button type="submit" className={styles.registerButton} variant="contained" color="primary">Register</Button>
								</Grid>
							</Grid>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
