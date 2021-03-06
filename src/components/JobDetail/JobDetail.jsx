import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//MATERIAL-UI IMPORTS
import { Typography, Button, Grid, Divider } from '@material-ui/core';
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

//COMPONENT IMPORTS
import SkillList from '../SkillList/SkillList';
import ApplicantReviewClient from '../ApplicantReviewClient/ApplicantReviewClient';
import ApplicantReviewStudent from '../ApplicantReviewStudent/ApplicantReviewStudent';
import MessageDialog from '../MessageDialog/MessageDialog';

const styles = theme => ({
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    actions: {
        marginTop: theme.spacing(3)
    }
});

class JobDetail extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_JOB_DETAIL',
            payload: { id: Number(this.props.match.params.id) }
        });//sends to jobSaga
    }
    //route to apply for this job (student view)
    applyNow = () => {
        this.props.history.push(`/jobs/detail/apply/${this.props.match.params.id}`);
    };
    //route to view all applications for this job (client view)
    viewApplicants = () => {
        this.props.history.push(`/jobs/detail/applications/${this.props.match.params.id}`);
    };
    //route to return to previous page (student view)
    routeToSearch = () => {
        this.props.history.push(`/search/jobs`);
    };
    routeToMyJobs = () => {
        this.props.history.push('/jobs');
    };
    routeToMyMentorships = () => {
        this.props.history.push('/mentors');
    };
    //route to return to previous page (client view)
    routeBackClient = () => {
        this.props.history.push(`/jobs`);
    };

    //updates job status to Completed
    markedCompleted = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to reverse this command!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#04b8f3',
            cancelButtonColor: '#505d68',
            confirmButtonText: 'Yes, submit it!'
        }).then(result => {
            if (result.value) {
                this.props.dispatch({
                    type: 'MARK_JOB_COMPLETED',
                    payload: { id: this.props.match.params.id }
                });//sends to jobSaga
                this.props.history.push(`/jobs`);
            }
        });
    };

    render() {
        const { classes } = this.props;
        let { details } = this.props;

        //checks if user type should be able to view this element
        let isStudent = () => {
            return this.props.user.user_type === 'Student';
        };
        let isClient = () => {
            return this.props.user.user_type === 'Client';
        };

        return (
            <OneColumnLayout header="Job Details">
                <Grid spacing={3} container justify="center">
                    <Grid item xs={12} align="center">
                        {/* JOB TITLE & POSITION */}
                        <Typography variant="h4" color="primary">
                            {details.project_title}
                        </Typography>
                        <Typography variant="h5" color="secondary">
                            Seeking: {details.position_title}
                        </Typography>
                        <Grid item xs={6} align="center">
                            {isStudent() && details.hired && (
                                <MessageDialog
                                    recipient={{
                                        id: details.client_id,
                                        username: details.username
                                    }}
                                />
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    {/* CLIENT INFORMATION */}
                    <Grid item xs={12} sm={6} align="left">
                        <Typography>
                            <b>Client:</b> {details.username}
                        </Typography>
                        <Typography>
                            <b>Location:</b> {details.location}
                        </Typography>
                        <Typography>
                            <b>Duration:</b> {details.duration}
                        </Typography>
                        <Typography>
                            <b>Budget:</b> ${details.budget}
                        </Typography>
                    </Grid>

                    {/* JOB DESCRIPTION */}
                    <Grid item xs={12} sm={6} align="left">
                        <Typography variant="h6" color="secondary">
                            <b>Description:</b>
                        </Typography>
                        <Typography>{details.description}</Typography>
                    </Grid>

                    {/* DESIRED SKILLS */}
                    <Grid item xs={12} align="left">
                        {details.skills && details.skills.length > 0 && (
                            <>
                                <Typography variant="h5" color="secondary" gutterBottom>
                                    Desired Skills:
                                </Typography>
                                <SkillList skillList={details.skills} />
                            </>
                        )}
                    </Grid>

                    {/* DIVIDER BEFORE USER SPECIFIC CONTENT */}
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    {/* ACTIONS FOR STUDENTS */}
                    {isStudent() && (
                        <>
                            <ApplicantReviewStudent
                                listUser={this.props.user}
                                jobDetails={this.props.details}
                            />
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    align="space-around"
                                    className={classes.button}
                                    onClick={() => this.routeToMyJobs()}>
                                    Go To My Jobs
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    align="space-around"
                                    className={classes.button}
                                    onClick={() => this.routeToSearch()}>
                                    Search for New jobs
                                </Button>
                                {this.props.details.hired === null && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.applyNow}>
                                        Apply
                                    </Button>
                                )}
                            </Grid>
                        </>
                    )}

                    {/* CLIENT: APPLICANT REVIEW + ACTIONS */}
                    {isClient() && (
                        <Grid item xs={12}>
                            {(this.props.details.status_id === 1 ||
                                this.props.details.status_id === 3) && (
                                    <>
                                        <ApplicantReviewClient />
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    </>
                                )}
                            <Grid item xs={12} className={classes.actions} align="center">
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                    align="space-around"
                                    onClick={() => this.routeBackClient()}>
                                    Back
                                </Button>
                                {this.props.details.status_id === 3 && (
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={this.markedCompleted}>
                                        Mark Project Completed
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </OneColumnLayout>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    skills: state.allSkillsReducer,
    selectedUser: state.selectedUserReducer,
    selectedUserSkills: state.userSkillsReducer,
    details: state.selectedJobReducer
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(JobDetail)));
