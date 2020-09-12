import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncReducer';
import { dataFromSnapshot } from '../firestore/firestoreService';


const useFirestoreDoc = ({ query, data, deps, shouldExecute = true }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(!shouldExecute) return; 

    dispatch(asyncActionStart())
    const unsubscribe = query().onSnapshot(
      snapshot => {
        if(!snapshot.exists) {
          dispatch(asyncActionError({
            code: 'not-found',
            message: 'Could not find document'
          }))
          return;
        }
        
        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish())
      },
      error => dispatch(asyncActionError(error))
    )

    return () => {
      unsubscribe()
    }
  }, deps)
}

export default useFirestoreDoc;