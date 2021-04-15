import React, { useEffect, useState } from 'react';
import {
	useLocation
} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import DescriptionSection from '../components/job-details/DescriptionSection';
import Footer from '../components/job-details/Footer'; 
import JobItem from '../components/company-profile/JobItem';
import { ContentLoader } from '../components/loaders';
import pageStyles from './Page.module.scss';

import {
    Grid,
    Button
} from '@material-ui/core';

import {
	ArrowBack as ArrowBackIcon, StarSharp
} from '@material-ui/icons';

import api from '../constants/api';

import styles from './JobDetails.module.scss';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Notification } from '../components/notification';

	
const Header = ({name}) => {
	const [save, setSave] = React.useState(); //TODO
	const userID = Cookie.get("user_id");
	
	useEffect(() => {
		// load initial state of this company
		if (userID) {
			axios.get(`${api.BASE_URL}/api/user/company?user_id=${userID}`)
				.then(res => setSave(res.data.indexOf(name) > -1))
				.catch(err => Notification.spawnError(err))
		} else {
			Notification.spawnRegisterError();
		}
	}, []);

    const btnStyle = {
        margin: '20px 5px'
    };

    const companyIconStyle = {
        // borderRadius: '50%',
        // width: '50px',
        // height: '50px',
        padding: '5px'
    };

	const handleBack = () => window.history.back();

	const handleSave = () => {
		const url = `${api.BASE_URL}/api/user/company?user_id=${userID}&company_name=${name}`;
		
		// if current state is 'already saved', unsave the company
		if (save) {
			axios.delete(url)
				.then((res) => {
					Notification.spawnSuccess(`Unsaved '${res.data}'`);
					setSave(false)
				})
				.catch((err) => Notification.spawnError(err))

		// if current state is 'not saved', save the company
		} else {
			const userID = Cookie.get("user_id");
			if (userID) {
				const postData = {
					method: "post",
					url: `${api.BASE_URL}/api/user/company`,
					data: {
						user_id: userID,
						company_name: name
					},
					headers: {
						"Content-Type": "application/json"
					}
				};
				axios(postData)
					.then((res) => {
						Notification.spawnSuccess(`Saved '${res.data}'`);
						setSave(true);
					})
					.catch((err) => Notification.spawnError(err));
			} else {
				Notification.spawnRegisterError();
			}
		}
	};

	return (
		<Grid container direction="column">
            <Grid item>
                <Button onClick={handleBack} className={styles.iconLabelSet}>
                    <ArrowBackIcon id="back" fontSize="large"/> 
                    <label for="back">Back</label>
                </Button> 
            </Grid>

            <Grid item>
                <div className={styles.iconLabelSet}>
					{/*
						Using Logo API
						NOTE: 
							has some conditions  
							required to link 
							<a href="https://clearbit.com">Logos provided by Clearbit</a>
							on pages where this is used
					*/}
                    <img 
						src={`https://logo.clearbit.com/${name}.com` }
						// src="https://th.bing.com/th/id/OIP.zJufwwvIsPoEYwp9lXhizgHaFi?w=158&h=129&c=7&o=5&dpr=2.5&pid=1.7"
						style={companyIconStyle}
						alt={name}
					/>
                    {/* <div>{name}</div> */}
                </div>
                <div className={styles.mainTitle}>
                    {name}
                </div>
            </Grid>

            <Grid item direction="row">
                {/* <Button style={btnStyle} variant="outlined" color="secondary" size="small" href="">
                    View official Website
                </Button> */}
                <Button style={btnStyle} variant="outlined" color="secondary" size="small" onClick={handleSave}>
                    { save ? "Saved" : "Save" }
                </Button>
            </Grid>
        </Grid>
	);
};

const CompanyProfile = () => {
	const [companyDetails, setCompanyDetails] = useState(null);
	const search = useLocation().search;
	const params = new URLSearchParams(search);
	const company = params.get('company');
	useEffect(() => {
		if (company && company !== "") {
			axios.get(`${api.BASE_URL}/api/company?company=${company}`)
			.then(response => setCompanyDetails(response.data))
		}
	}, [company])

	const isLoading = companyDetails === null;
	return (
		<Layout>
			<div className={pageStyles.container}>
				{(company && company !== "") ? (
					<>
						<Header name={company}/>
						<hr />
						<DescriptionSection title="About">
							{isLoading ? (
								<ContentLoader />
							) : (
								<>{companyDetails && companyDetails.company_info.company_details}</>
							)}
						</DescriptionSection>

						<DescriptionSection title="Recent Jobs">
							{isLoading ? (
								<ContentLoader />
							) : (
								<>{	companyDetails &&
									companyDetails.jobs.map((job) => (
										<JobItem {...job} />
									))
								}</>
							)}
						</DescriptionSection>
						<hr />
			
						<Footer type="company"/>
					</>
				) : (
					<>
						No company
					</>
				)}
			</div>
		</Layout>

	);
};

export default CompanyProfile;