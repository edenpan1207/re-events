import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'

const PhotoWidgetDropzone = ({ setFiles }) => {
  const dropzoneStyles = {
    border: '3px dashed #eee',
    borderRadius: '5%',
    paddingTop: '30px',
    textAlign: 'center'
  }

  const dropzoneActive = {
    border: '3px dashed green'
  }

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
  }, [setFiles]);
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={ isDragActive ? {...dropzoneStyles, ...dropzoneActive} : {...dropzoneStyles} }>
      <input {...getInputProps()} />
      <Icon name="upload" size="huge"  />
      <Header content="Drop Image Here" />
    </div>
  )
}

export default PhotoWidgetDropzone;