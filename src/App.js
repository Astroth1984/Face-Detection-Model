import "./app.css";
import Navbar from "./components/Navbar";
import {useState, useEffect} from "react";
import NewPost from "./components/NewPost";


function App() {

  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() =>{
     //file && console.log(URL.createObjectURL(file))
     const getImage = () => {
       const img = new Image();
       img.src = URL.createObjectURL(file);
       img.onload = () => {
          setImage({
            url: img.src,
            height: img.height,
            width: img.width,
          });
       }
     };
     file && getImage();
  },[file]);


  return (
    <div>
      <Navbar />
      {image ? (<NewPost image={image} />) : (
        <div className="newPostCard">
          <div className="addPost">
            <img 
              src="https://images.pexels.com/photos/3779055/pexels-photo-3779055.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
              alt=""
              className="avatar" 
            />
            <div className="postForm">
              <input 
                type="text"
                placeholder="what's on your mind"
                className="postInput" 
              />
              <label htmlFor="file">
              <img
                  className="addImg"
                  src="/addDocument.ico"
                  alt=""
                />
                <img
                  className="addImg"
                  src="/face.svg"
                  alt=""
                />
                {/* <img
                  className="addImg"
                  src="https://icon-library.com/images/maps-icon-png/maps-icon-png-5.jpg"
                  alt=""
                />
                <img
                  className="addImg"
                  src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84451/preview.svg"
                  alt=""
                /> */}
                <img
                  className="addImg"
                  src="/name.png"
                  alt=""
                />
                <button style={{marginLeft:"30px"}}>Send</button>
              </label>
              <input 
                onChange={(e)=> setFile(e.target.files[0])}
                id="file" 
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
