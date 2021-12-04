import "./app.css";
import Navbar from "./components/Navbar";
import {useState, useEffect} from "react";
import NewPost from "./components/NewPost";
import TagProfil from "./components/TagProfil";


function App() {

  const [fileDetection, setFileDetection] = useState();
  const [fileTag, setFileTag] = useState();
  const [image, setImage] = useState();
  const [faceExp, setFaceExpression] = useState(false);

  useEffect(() =>{
     //file && console.log(URL.createObjectURL(file))
     const getImage = () => {
        const img = new Image();
        if(faceExp){
          img.src = URL.createObjectURL(fileDetection);
        } else {
          img.src = URL.createObjectURL(fileTag);
    
        };
        
        img.onload = () => {
          setImage({
            url: img.src,
            height: img.height,
            width: img.width,
          });
       }
     };
     fileDetection && getImage() || fileTag && getImage();
     
  },[fileDetection,fileTag, faceExp]);

  const faceDetectionFunction = (e) =>{
    e.preventDefault();
    setFileDetection(e.target.files[0]);
    setFaceExpression(true);
  }

  const tagPersonFunction = (e) => {
    e.preventDefault();
    setFileTag(e.target.files[0]);
    setFaceExpression(false);
  }


  return (
    <div>
      <Navbar />
      {image && faceExp ? (<NewPost image={image} />) : 
        image && !faceExp ? (<TagProfil image={image} />) : (
        <div className="newPostCard">
          <div className="addPost">
            <img 
              src="/face.svg" 
              alt=""
              className="avatar" 
            />
            <div className="postForm">
              <input 
                type="text"
                placeholder="what's on your mind"
                className="postInput" 
              />
              <label htmlFor="fileDetection">
                <img
                    className="addImg"
                    src="/addDocument.ico"
                    alt=""
                />  
              </label>
              <label htmlFor="fileTag">
                <img
                    className="addImg"
                    src="/name.png"
                    alt=""
                  />
                <button style={{marginLeft:"30px"}}>Send</button>
              </label>
                
              <input 
                onChange={faceDetectionFunction}
                id="fileDetection" 
                style={{display: 'none'}} 
                type="file" 
              />
              <input 
                onChange={tagPersonFunction}
                id="fileTag" 
                style={{display: 'none'}} 
                type="file" 
              />
            </div>
          </div>
        </div>

      )}
      
    </div>
  );
}

export default App;
