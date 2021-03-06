import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import { makeStyles } from '@material-ui/core/styles';
import SkillList from '../SkillList/SkillList';

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		width: '90%'
	},
	section: {
		padding: theme.spacing(2)
	},
	link: {
		fontWeight: 'bold'
	}
}));

function ApplicantDetailStudent(props) {
	const classes = useStyles();

	return (
		<Grid container justify='space-around' spacing={2} className={classes.root}>
			{/* Invited Mentor's Info */}
			<Grid item xs={12}>
				<Typography variant='h5' color='secondary'>
					Mentor Information:
				</Typography>
			</Grid>
			<Grid item xs={12} md={6}>
				<Typography variant='h6' color='primary'>
					{props.mentor.username}
				</Typography>
				<Typography variant='subtitle1'>{props.mentor.focus_skill}</Typography>
				<Typography variant='subtitle2' gutterBottom>
					{props.mentor.location}
				</Typography>
			</Grid>

			{/* Bio */}
			<Grid container item xs={12} md={6}>
				<Grid item container xs={12} direction='row' justify='space-around'>
					{props.mentor.bio !== null && (
						<Grid item xs={12}>
							<Typography variant='h6' color='primary'>
								Bio:
							</Typography>
							<Typography variant='caption' gutterBottom>
								{props.mentor.bio}
							</Typography>
						</Grid>
					)}
				</Grid>
			</Grid>

			{/* User Info */}
			<Grid item container className={classes.section} align="center" xs={12}>
				<Typography variant='h6' color='primary'>
					Mentor's Links:
				</Typography>
				{/* </Grid> */}
				<Grid item container align='center' justify="space-around" xs={12}>
					<Grid item xs={3} align="center">
						<Link
							target='_blank'
							href={props.mentor.linkedin_url}
							color={props.mentor.linkedin_url ? 'primary' : 'error'}
							style={props.mentor.linkedin_url ? {} : { pointerEvents: 'none' }}>
							<Typography className={classes.link}>
								<LinkedInIcon fontSize='large' />
							</Typography>
							<Typography className={classes.link}>LinkedIn</Typography>
						</Link>
					</Grid>

					<Grid item xs={3} align="center">
						<Link
							target='_blank'
							href={props.mentor.github_url}
							color={props.mentor.github_url ? 'primary' : 'error'}
							style={props.mentor.github_url ? {} : { pointerEvents: 'none' }}>
							<Typography className={classes.link}>
								<GitHubIcon fontSize='large' />
							</Typography>
							<Typography className={classes.link}>GitHub</Typography>
						</Link>
					</Grid>

					<Grid item xs={3} align="center">
						<Link
							target='_blank'
							href={props.mentor.website_url}
							color={props.mentor.website_url ? 'primary' : 'error'}
							style={props.mentor.website_url ? {} : { pointerEvents: 'none' }}>
							<Typography className={classes.link}>
								<LanguageIcon fontSize='large' />
							</Typography>
							<Typography className={classes.link}>Website</Typography>
						</Link>
					</Grid>
				</Grid>
			</Grid>

			{/* Mentor Skill List */}
			<Grid item container align='center' className={classes.section} xs={12}>
				{props.mentor.skills && (
					<Grid item xs={12}>
						<Typography variant='h6' align='left' color='primary'>
							Mentor's Skills:
						</Typography>
						<SkillList skillList={props.mentor.skills} />
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}
export default ApplicantDetailStudent;
