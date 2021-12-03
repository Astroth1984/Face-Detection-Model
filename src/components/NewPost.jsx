import {useRef, useEffect} from 'react';
import * as faceapi from 'face-api.js';

const NewPost = ({image}) => {

  const {url, height, width} = image;

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
       width,
       height,
     });

     const resized = faceapi.resizeResults(detections, {
        width,
        height,
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
        <div>
            <div className="container">
                <div className="left" style={{width:width, height: height}}>
                    <img
                        ref={imgRef} 
                        crossOrigin="anonymous"
                        src={url} 
                        alt=""
                    />
                    <canvas
                        ref={canvasRef}
                        height={height}
                        width={width} 
                    />
                </div>
                <div className="right">
                    <h1>Share your post</h1>
                    <input
                        type="text"
                        placeholder="What's on your mind?"
                        className="rightInput"
                    />
                    <button className="RightButton">Send</button>
                </div>
            </div>
        </div>
    )
}

export default NewPost
