import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import {BACKEND_SERVER_URL, BACKEND_API} from "../config";

class DropZone extends Component{
  constructor(props) {
        super(props)
  }
  onDrop(files){
    
    const {url_send}=this.props;
    var reader = new FormData();
    const file=files[0];
    reader.append("file",file);
    let url=BACKEND_SERVER_URL+ {url_send};
    var reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
    if (!reg.test(file.name)) {//校验不通过
      alert("请上传excel格式的文件!");
      return;
     }
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
    const {url_send}=this.props;
    return(
      <div>
        <Dropzone 
          url_send= {url_send}
          onDrop={this.onDrop}>
          <div>拖拽文件或点击此处可以上传execel文件</div>
        </Dropzone>
      </div>
          );
  }
}

export default DropZone;
