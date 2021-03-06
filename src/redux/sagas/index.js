import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import jobSaga from './jobSaga';
import mentorSaga from './mentorSaga';
import messageSaga from './messageSaga';
import skillSaga from './skillSaga';
import userskillsSaga from './userskillsSaga';
import adminSaga from './adminSaga';
import uploadSaga from './uploadSaga';
import applicantSaga from './applicantSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

export default function* rootSaga() {
    yield all([
        loginSaga(),
        registrationSaga(),
        userSaga(),
        jobSaga(),
        mentorSaga(),
        messageSaga(),
        skillSaga(),
        userskillsSaga(),
        adminSaga(),
        uploadSaga(),
        applicantSaga()
    ]);
}
