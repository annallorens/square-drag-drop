import React from 'react'

function Square(props) {
    const dragStart = e => {
        //the target element that we are dragging
        const target = e.target;
        e.dataTransfer.setData('squareId', target.id);

        // visual effect to avoid duplicate object when drag starts
        setTimeout(() => {
            target.style.opacity = '0.3';
        }, 0);
    }

    const dragOver = e => {
        // prevent default to allow drop
        e.preventDefault();
    }

    const dragEnd = e => {
        e.target.style.opacity = '';
    }

    const dragEnter = e => {
        // highlight drop target when the draggable element enters it
        e.target.classList.add('over');
    }

    const dragLeave = e => {
        // reset border of drop target when the draggable element leaves it
        e.target.classList.remove('over');
    }

    return (
        <div
            id={props.id}
            className='square'
            style={{ backgroundColor: backgroundColor[props.id] }}
            draggable="true"
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={dragEnd}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={props.onDrop}
        >
        </div>
    )
}
export default Square;

// Colors for the square backround
const backgroundColor = [
    '#ffcc00', '#cc6600', '#ffcc99', '#ff9999',
    '#ff4da6', ' #bf4080', '#0089BA', '#cc9900',
    '#4FFBDF', '#845EC2', '#B39CD0', '#008F7A',
    '#0089BA', '#00C9A7', '#D5CABD', '#F9F871'
]
