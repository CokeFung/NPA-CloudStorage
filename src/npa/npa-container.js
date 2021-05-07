import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Upload, message, Image, Popconfirm } from 'antd';
import { DeleteOutlined, EyeOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { handleDelete, getObjectfromS3, getPresignedURL, handleUpload } from './npa-s3';

const { Dragger } = Upload;

const props = {
  name: 'file',
  showUploadList: false,
  multiple: true,
  beforeUpload: file => {
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif') {
      return true;
    }
    else{
      message.error(`'${file.name}' is not (png | jpeg | gif) file`);
      return Upload.LIST_IGNORE;
    }
  },
  method: 'PUT',
  action: (file2upload) => getPresignedURL(file2upload),
  customRequest: (e) => handleUpload(e),
  onChange(info) {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export const DraggerContainer = () => {
  return (
      <Dragger {...props} className="Container-upload">
          <p className="ant-upload-drag-icon">
          <CloudUploadOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
      </Dragger>
  )
};


export class StorageContainer extends Component {
  
  state = {
    data: []
  }

  componentDidMount() {
    this.interval = setInterval(() => this.getObject(), 2000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  getObject = async() => {
    try{
      const data = await getObjectfromS3();
      const fileList = data.map(d => {
        return {
          name: d.Key,
          status: 'done',
          url: 'https://' + process.env.REACT_APP_S3_BUCKET +'.s3.amazonaws.com/' + d.Key,
        };
      })
      this.setState({data: fileList})
    } catch(err) {
      console.log('err', err)
    }
  }

  deleteObject = (objKey) => {
    handleDelete(objKey)
  }
  
  render () {
    const fileList = this.state.data?.map((post) => (
      <div key={post.name} className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture">
        <div className='ant-upload-list-item-info'>
          <span className='ant-upload-span'>
            <a className='ant-upload-list-item-thumbnail' href="#/" rel="noreferrer">
              <Image src={post.url} alt={post.name} width={48} preview={{mask: (
                <EyeOutlined />
              )}} />
            </a>
            <a className='ant-upload-list-item-name' title={post.name} href={post.url} target="_blank" rel="noreferrer" >{post.name}</a>
            <span className="ant-upload-list-item-card-actions picture">
              <Popconfirm
                placement='topRight'
                title='Delete this object?'
                okText='Yes'
                cancelText='No'
                onConfirm={() => this.deleteObject(post.name)}
              >
                <button title='Remove file' className='ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-card-actions-btn'>
                  <DeleteOutlined className={'Container-delObjbutton'} />
                </button>
              </Popconfirm>
            </span>
          </span>
        </div>
      </div>
    ));

    return (
      <div className='upload-list-inline'>
        <div className='ant-upload-list ant-upload-list-picture'>
          {fileList}
        </div>
      </div>
    );
  }
}