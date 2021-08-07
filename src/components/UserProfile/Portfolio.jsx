import {useState, useEffect} from 'react';

export const useInput = initialValue => {
	const [value, setValue] = useState(initialValue);

	return {
	  value,
	  setValue,
	  reset: () => setValue(""),
	  bind: {
		value,
		onChange: event => {
		  setValue(event.target.value);
		}
	  }
	};
};

function Portfolio(props){

    var [imageArray, setImageArray] = useState([]); 
    var photographerId = props.photographer_id;
	// console.log("photographerId",photographerId);
	// var [photographerId, setPhotographerId] = useState("")
	// setPhotographerId(props.photographer_id)
    var [willUploadImage,setWillUploadImage] = useState(0);
    const { value:ImgName, bind:bindImgName, reset:resetImgName } = useInput('');
    const { value:ImgDesc, bind:bindImgDesc, reset:resetImgDesc} = useInput('');
    // const { value:ImgFile, bind:bindImgFile, reset:resetImgFile} = useInput('');
    var [selectedFile, setSelectedFile] = useState();

    const getImagesOfPhotograper = async (photographerId) => {//
        var url = process.env.REACT_APP_BACKEND_URL + '/images/photographer/' + photographerId;
        const res = await fetch(url);
        const data = await res.json();
        return data
    };

    useEffect(()=>{
		if (photographerId){
			var data = getImagesOfPhotograper(photographerId).then((data)=>{
            	setImageArray(data);
        	});
		}
        
    },[]);

    // console.log("imageArray",imageArray)

	const handleImageUpload = (evt) => {
		console.log("upload images file", selectedFile)
		const formData = new FormData();
		formData.append('File', selectedFile);
		// console.log("photographerId",photographerId);

		var newImage = {
			photographer: photographerId,
			name: ImgName,
			desc: ImgDesc,
			img: {
				data: selectedFile,//formData,
				contentType: 'image/png'
			}
		}
		evt.preventDefault();
		// resetImgName();// uncomment
		// resetImgDesc();// uncomment
		// resetImgFile();

		console.log("newImage",newImage)

		
		// const json = JSON.stringify(newImage);
		// console.log("json: ", json)
		const blob = new Blob([newImage], {
			type: 'application/json'
		});
		console.log("blob",blob)
		// const data = new FormData();
		// data.append("document", blob);

		// console.log("data: ", data)
		// axios({
		// 	method: 'post',
		// 	url: '/sample',
		// 	data: data,
		// })
		// .then((data)=>{})
		// .catch((err)=>{})


		var url = process.env.REACT_APP_BACKEND_URL + "/images/";
		fetch(url, {
			method: 'POST',
			headers: {
				// 'Content-Type': 'multipart/form-data',//'application/json',
				'Content-Type': 'text/plain',
			},
			body: selectedFile,//JSON.stringify(formData),
		})
		.then(res => {
			console.log('Response:', res);
			if (res.ok){
				alert("Image uploaded successfully");
			}
			else{
				alert("Image could not be uploaded");
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});

		// setWillUploadImage(!willUploadImage);// uncomment
	}


    return(
        <div>
            <h2>Portfolio:</h2>
            {willUploadImage ? 
            <div >
                <form>
                    <label>Image Title:</label><br/>
                    <input type="text" placeholder="Title" {...bindImgName} /><br/>
                    <label>Description:</label><br/>
                    <textarea id="desc" name="desc" value="" rows="2" placeholder="Description" {...bindImgDesc}></textarea><br/>
                    <input type="file" multiple={false} accept=".jpg,.jpeg,.png,.gif" onChange={(e) => setSelectedFile(e.target.files[0])} required></input><br /><br />
                    {/* <input type="submit" value="Upload" /> */}
                    <button onClick={(e) => handleImageUpload(e)}>Upload</button>
                    <button onClick={(e) => setWillUploadImage(!willUploadImage)}>Cancel Upload</button>
                </form>
            </div> : <button onClick={e=>setWillUploadImage(!willUploadImage)}>Upload Image</button>}

				{/* render imageArray here */}
            <div className="imageContainer">
                <img src="./background_pic_1.jpg" className="imgPortfolio"/>
                <img src="./background_pic_2.jpg" className="imgPortfolio"/>
                <img src="./background_pic_3.jpg" className="imgPortfolio"/>
            </div>

			{JSON.stringify(selectedFile)}
        </div>
    );
}
export default Portfolio;