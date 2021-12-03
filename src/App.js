import "./app.css";
import {useRef, useEffect} from 'react';
import * as faceapi from 'face-api.js';

function App() {
  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current, 
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks()
     .withFaceExpressions().withAgeAndGender();

     canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(imgRef.current);
     faceapi.matchDimensions(canvasRef.current, {
       width: 900,
       height: 650,
     });

     const resized = faceapi.resizeResults(detections, {
        width: 900,
        height: 650,
     })

     faceapi.draw.drawDetections(canvasRef.current, resized);
     faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
     faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
     
  }

  useEffect(() => {
      const loadModels = () => {
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
          faceapi.nets.ageGenderNet.loadFromUri('/models'),
          
        ]).then(handleImage)
          .catch(e=>console.log(e));
      };

      imgRef.current && loadModels();
  },[]);

  return (
    <div className="app">
      <img
        crossOrigin="anonymous"
        ref={imgRef}
        src="https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        alt=""
        width="900"
        height="650"
      />
      <canvas 
        ref={canvasRef} 
        width="900" 
        height="650" 
      />
    </div>
  );
}

export default App;
