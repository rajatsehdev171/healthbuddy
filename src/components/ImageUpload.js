import React from "react";
import { uploadImages } from "../services/proofsService";
export default class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: '', file2:'',imagePreviewUrl2:''};
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log('handle uploading-', this.state.file);
      const {file, file2} = this.state;
     if(file && file2){
        const formData = new FormData();
        formData.append("file", file);
        const formData2 = new FormData();
        formData2.append("file", file2);
        Promise.all([
            uploadImages(formData),
            uploadImages(formData2)
        ]).then((response) => {
            console.log('uploaded images',response);
            let isSuccess = response.every(v => v === 'OK');;
            if(isSuccess){
                alert('Images saved successfully!');
                this.props.handleClose();
            }
            else{
                alert('Please reupload images!');
            }
        }).catch((err) => {
            alert('Error uploading images!!')
            this.props.handleClose();
        })
     }
     else{
         alert('Please Upload both the images!!')
     }
    }
  
    _handleImageChange(e, type) {
      e.preventDefault();
      if(type=='first-image'){
        let reader = new FileReader();
        let file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file);
    }else if(type=='second-image'){
        let reader = new FileReader();
      let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file2: file,
                imagePreviewUrl2: reader.result
            });
          }
        reader.readAsDataURL(file);
    }
    }
  
    render() {
      let {imagePreviewUrl, imagePreviewUrl2} = this.state;
      let $imagePreview = null;
      let $imagePreview2 = null;
      if (imagePreviewUrl) {
        $imagePreview = (<div className="imgPreview  w-75"><img className="w-75" src={imagePreviewUrl} /></div>);
      } else {
        $imagePreview = (<div className="ml-2">No Before Image Selected</div>);
      }
      if(imagePreviewUrl2){
        $imagePreview2 = (<div className="imgPreview w-75"><img className="w-75" src={imagePreviewUrl2} /></div>);
      }
      else{
        $imagePreview2 = (<div className="ml-2">No After Image Selected</div>);
      }
  
      return (
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
              <h4>Before Image</h4>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e,'first-image')} />
                <h4>After Image</h4>
                <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e,'second-image')} />
          </form>
                {$imagePreview}
                {$imagePreview2}
                <div className="">
                <button style={{float:'right', cursor:'pointer'}} 
                        type="submit" 
                        onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                </div>
        </div>
      )
    }
  }