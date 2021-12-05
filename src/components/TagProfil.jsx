import {useRef, useEffect, useState} from 'react';
import * as faceapi from 'face-api.js';

const TagProfil = ({image}) => {

  const {url, height, width} = image;
  const [faces, setFaces] = useState([]);
  const [friends, setFriends] = useState([]);

  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current, 
      new faceapi.TinyFaceDetectorOptions()
    );
    setFaces(detections.map((d) => Object.values(d.box)));
  };

  const enter = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 5;
    ctx.strokeStyle = "teal";
    faces.map((face) => ctx.strokeRect(...face));
  };

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

  const addFriend = (e) => {
    setFriends((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


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
                        onMouseEnter={enter}
                        ref={canvasRef}
                        height={height}
                        width={width} 
                    />
                    {faces.map((face, i) => (
                        <input
                            name={`input${i}`}
                            style={{ left: face[0], top: face[1] + face[3] + 5 }}
                            placeholder="Tag a friend"
                            key={i}
                            className="friendInput"
                            onChange={addFriend}
                        />
                    ))}
                </div>
                <div className="right">
                    <h1>Share your post</h1>
                    <input
                        type="text"
                        placeholder="What's on your mind?"
                        className="rightInput"
                    />
                    {friends && (
                        <span className="friends">
                            with <span className="name">{Object.values(friends) + " "}</span>
                        </span>
                    )}
                    <button className="RightButton">Send</button>
                </div>
            </div>
        </div>
    )
}

export default TagProfil
