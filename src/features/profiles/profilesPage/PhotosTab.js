import React, { useState } from "react";
import { Grid, Header, Button, Tab, Card, Image } from "semantic-ui-react";
import PhotoUploadWidget from "../../../App/common/photos/PhotoUploadWidget";
import useFirestoreCollection from "../../../App/hooks/useFirestoreCollection";
import { useDispatch, useSelector } from "react-redux";
import { listenToUserPhotos } from "../ProfileAction";
import {
  getUserPhotos,
  setMainPhoto,
  deletePhotoFromCollection,
} from "../../../App/firestore/firestoreService";
import { deleteFromFirebaseStorage } from "../../../App/firestore/firebaseService";

const PhotosTab = ({ profile, isCurrentUser }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);
  const [updating, setUpdating] = useState({
    isUpdating: false,
    target: null,
  });
  const [deleting, setDeleting] = useState({
    isDeleting: false,
    target: null,
  });

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  const handleSetMainPhoto = async (photo, target) => {
    setUpdating({
      isUpdating: true,
      target,
    });

    try {
      await setMainPhoto(photo);
    } catch (error) {
      throw Error(error.message);
    } finally {
      setUpdating({
        isUpdating: false,
        target: null,
      });
    }
  };

  const handleDeletePhoto = async (photo, target) => {
    setDeleting({
      isDeleting: true,
      target,
    });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      throw Error(error.message);
    } finally {
      setDeleting({
        isDeleting: false,
        target: null,
      });
    }
  };

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`Photos`} />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              content={editMode ? "Cancel" : "Add Photo"}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fluid widths={2}>
                    <Button
                      name={photo.id}
                      loading={
                        updating.isUpdating && updating.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                      onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                      basic
                      color="green"
                      content="Main"
                    />
                    <Button
                      name={photo.id}
                      loading={
                        deleting.isDeleting && deleting.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                      onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                      basic
                      color="red"
                      icon="trash"
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default PhotosTab;
