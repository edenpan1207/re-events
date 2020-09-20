import { LISTEN_TO_CURRENT_USER_PROFILE, LISTEN_TO_SELECTED_USER_PROFILE, LISTEN_TO_USER_PHOTO } from "./ProfileConstants";

export const listenToCurentUserProfile = (profile) => ({
  type: LISTEN_TO_CURRENT_USER_PROFILE,
  payload: profile
})

export const listenToSelectedUserProfile = (profile) => ({
  type: LISTEN_TO_SELECTED_USER_PROFILE,
  payload: profile
})

export const listenToUserPhotos = (photos) => ({
  type: LISTEN_TO_USER_PHOTO,
  payload: photos
})