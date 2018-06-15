import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import {BACKEND_SERVER_URL, BACKEND_API} from "../config";

class DropZone extends Component{

  onDrop(files){
    const {url_send}= this.props;

    alert(url_send)
    var reader = new FormData();
    const file=files[0];
    reader.append("file",file);
    let url=BACKEND_SERVER_URL+ {url_send};
    
    fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),

            },
            body:reader,

        })
            .then((response) => response.json())
            .then(
              (data) => {
              alert(data);
              }
            )
            

  }

  render(){
    return(
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>拖拽文件或点击此处可以上传execel文件</div>
        </Dropzone>
      </div>
          );
  }
}

export default DropZone;
