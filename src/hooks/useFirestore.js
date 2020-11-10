import { useEffect, useState } from 'react';
import { db } from '../config/firebase';

export const useFirestore = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection('images')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let dbSnap = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setImages(dbSnap);
      });

    return unsubscribe;
  }, []);

  const updateImage = (id, item) => {
    db.collection('images').doc(id).update(item);
  };

  return { images, updateImage };
};
