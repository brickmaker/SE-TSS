import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import {BACKEND_SERVER_URL, BACKEND_API} from "../../config";

class DropZone extends Component{

  onDrop(files){
    var reader = new FormData();
    const file=files[0];
    reader.append("file",file);
    let url=BACKEND_SERVER_URL+ BACKEND_API.batch_add_student;
    
    fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),

            },
            body:reader,

        })
            .then(function(response){

              if(response.ok) {
                alert(response.json());
                response.json().then(function(obj) {
                let code=obj.code;
                if(code==200){
                  alert("Excel数据上传成功！");

                }else{
                  alert("Excel数据上传失败！"+obj.detail);
                }
              })
              }
              else{
                alert("Excel数据上传失败！！！");
              }
              })
            .catch(function (error) {
              alert("后端数据服务连接异常，保存失败！");
              });

  }

  render(){
    return(
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>拖拽文件或点击此处可以上传execel文件，注意表格第一列的表头名称必须含有
            "学号"、"身份证号"、 "姓名" 、"电子邮件" 、"性别" 、"入学年份"、 "专业" 、"学院" 、"班级"信息</div>
        </Dropzone>
      </div>
          );
  }
}

export default DropZone;
