import { useState, useRef } from 'react';
import './app.css';

import originalImage from './img/img-original.jpg';
import modifiedImage from './img/img-modified.jpg';

function App() {

  const [dragElementClass, setDragElementClass] = useState('');
  const [resizeElementClass, setResizeElementClass] = useState('');
  const [isDragStarted, setDragStarted] = useState(false);
  const [sizes, setSizes] = useState({});
  const dragElement = useRef(null);
  const container = useRef(null);

  const onHandleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragElementClass('draggable');
    setResizeElementClass('resizable');

    const dragWidth = dragElement.current.offsetWidth,
      xPosition =  e.pageX,
      containerOffset = container.current.offsetLeft,
      containerWidth = container.current.offsetWidth,
      minLeft = containerOffset + 10,
      maxLeft = containerOffset + containerWidth - dragWidth - 10;

    setSizes({
      ...sizes,
      dragWidth,
      xPosition,
      containerOffset,
      containerWidth,
      minLeft,
      maxLeft
    });

    setDragStarted(true);
  }

  const onHandleMouseUp = () => {
    setDragElementClass('');
    setResizeElementClass('');
    setDragStarted(false);
  }

  const containerOnMouseMove = (e) => {
    if (!isDragStarted || !e.pageX) {
      return
    };

    let leftValue = e.pageX - sizes.dragWidth / 2;
    if(leftValue < sizes.minLeft ) {
        leftValue = sizes.minLeft;
    } else if ( leftValue > sizes.maxLeft) {
        leftValue = sizes.maxLeft;
    }

    let widthValue = (leftValue + sizes.dragWidth/2 - sizes.containerOffset)*100/sizes.containerWidth+'%';
  
    setSizes({
      ...sizes,
      resizableImageWidth: widthValue
    })
  }

  return (
    <div className="App">
      <figure onMouseMove={containerOnMouseMove} onClick={() => setDragStarted(false)} className="cd-image-container  is-visible" ref={container}>
        <img src={originalImage} alt="Original Image" />
        <span className="cd-image-label" data-type="original">Original</span>

        <div style={{width: sizes.resizableImageWidth}} className={`cd-resize-img ${resizeElementClass}`}>
          <img src={modifiedImage} alt="Modified Image" />
          <span className="cd-image-label" data-type="modified">Modified</span>
        </div>

        <span onMouseDown={onHandleMouseDown}
          style={{left: sizes.resizableImageWidth}}
          onMouseUp={onHandleMouseUp}
          ref={dragElement}
          className={`cd-handle ${dragElementClass}`}></span>
      </figure>
    </div>
  );
}

export default App;
