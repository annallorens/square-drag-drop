import React from 'react'

function Square(props) {

    let draggingSquareId;

    const dragStart = e => {
        const target = e.target;
        draggingSquareId = target.id;
        // Set the drag's format and data.
        e.dataTransfer.setData('dragSquareId', target.id);

        // visual effect to avoid duplicate object when drag starts
        setTimeout(() => {
            target.style.opacity = '0.1';
        }, 0);
    }

    const dragOver = e => {
        // prevent dropping on itself
        if (e.target.id !== draggingSquareId) {
            e.preventDefault();
        }
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
            className='square'
            draggable="true"
            id={props.id}
            style={{ backgroundColor: props.backgroundColor }}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={dragEnd}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
        >
        </div>
    )
}
export default Square;
