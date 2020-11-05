import { useEffect, useRef, useState } from 'react';
import './App.css';
import { db, storage } from './firebase';

function App() {
  const inputRef = useRef();
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = db
      .collection('images')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let dbSnap = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setImages(dbSnap);
      });

    return unsubscribe;
  }, []);

  const uploadImage = (e) => {
    const file = e.target.files[0];

    const storageRef = storage.ref(file.name);

    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let percent = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percent);
      },
      (err) => console.log(err),
      async () => {
        const url = await storageRef.getDownloadURL();
        await db.collection('images').add({
          url,
          createdAt: Date.now(),
        });
        setProgress(0);
        inputRef.current.value = '';
      }
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Firebase Storage</h1>
        <input type="file" onChange={uploadImage} ref={inputRef} />
        <progress value={progress} max="100"></progress>
        <div className="photo-grid">
          {images &&
            images.map((image) => (
              <img src={image.url} alt="" key={image.id} />
            ))}
        </div>
      </header>
    </div>
  );
}

export default App;
