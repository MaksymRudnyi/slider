import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Image from './components/Image';

import './style.css';

function Slider({original, modified, delay = 0}) {

  const [dragElementClass, setDragElementClass] = useState('');
  const [resizeElementClass, setResizeElementClass] = useState('');
  const [visibleClass, setVisibleClass] = useState('');
  const [isDragStarted, setDragStarted] = useState(false);
  const [sizes, setSizes] = useState({});
  const dragElement = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisibleClass('is-visible'), delay)
  }, [])

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
      <figure onMouseMove={containerOnMouseMove} onClick={onHandleMouseUp} className={`cd-image-container ${visibleClass}`} ref={container}>
        <Image {...original}/>

        <div style={{width: sizes.resizableImageWidth}} className={`cd-resize-img ${resizeElementClass}`}>
          <Image {...modified}/>
        </div>

        <span onMouseDown={onHandleMouseDown}
          style={{left: sizes.resizableImageWidth}}
          onMouseUp={onHandleMouseUp}
          ref={dragElement}
          className={`cd-handle ${dragElementClass}`}></span>
      </figure>
  );
}

Slider.propTypes = {
  original: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string
  }),
  modified: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string
  })
}

export default Slider;
