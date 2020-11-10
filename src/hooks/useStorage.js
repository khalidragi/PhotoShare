import { useState } from 'react';
import { storage, db } from '../config/firebase';

export const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadPhoto = (file, title, desc, user, author, callBack) => {
    if (!file) {
      setError('Please choose an image');
      return;
    }
    if (!title || !desc) {
      setError('please enter the title and the description');
      return;
    }
    let imagePath = file.name + Date.now();
    const storageRef = storage.ref(imagePath);

    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let percent = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percent);
      },
      (err) => setError(err),
      async () => {
        const url = await storageRef.getDownloadURL();
        await db.collection('images').add({
          title,
          desc,
          url,
          user,
          author,
          createdAt: Date.now(),
          likes: [],
          imagePath,
        });
        callBack();
      }
    );
  };

  const deletePhoto = (id, path) => {
    db.collection('images')
      .doc(id)
      .delete()
      .then(() => storage.ref().child(path).delete())
      .catch((err) => setError(err.message));
  };

  return { uploadPhoto, progress, error, setProgress, setError, deletePhoto };
};
