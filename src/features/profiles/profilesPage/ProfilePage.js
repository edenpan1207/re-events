import React from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { useSelector, useDispatch } from 'react-redux';
import useFirestoreDoc from '../../../App/hooks/useFirestoreDoc';
import { getUserProfile } from '../../../App/firestore/firestoreService';
import { listenToSelectedUserProfile } from '../ProfileAction';
import LoadingComponent from '../../../App/layout/LoadingComponent';

const ProfilePage = ({ match }) => {
  const dispatch = useDispatch();
  const { selectedUserProfile } = useSelector(state => state.profile);
  const { currentUser } = useSelector(state => state.auth); 
  const { loading, error } = useSelector(state => state.async);

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id), 
    data: profile => dispatch(listenToSelectedUserProfile(profile)), 
    deps: [dispatch, match.params.id]
  })

  if((loading && !selectedUserProfile) || (!selectedUserProfile && !error)) return <LoadingComponent content="Profile Loading ..." />

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={selectedUserProfile} isCurrentUser={currentUser.uid === selectedUserProfile.id} />
        <ProfileContent profile={selectedUserProfile} isCurrentUser={currentUser.uid === selectedUserProfile.id} />
      </Grid.Column>
    </Grid>
  )
}

export default ProfilePage;