import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncReducer';
import { dataFromSnapshot } from '../firestore/firestoreService';


const useFirestoreCollection = ({ query, data, deps }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart())
    const unsubscribe = query().onSnapshot(
      snapshot => {
        const docs = snapshot.docs.map(doc => dataFromSnapshot(doc))
        data(docs);
        dispatch(asyncActionFinish())
      },
      error => asyncActionError(error)
    )

    return () => {
      unsubscribe()
    }
  }, deps)
}

export default useFirestoreCollection;