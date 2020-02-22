import React from 'react'

function Square(props) {

    let draggingSquareId = "";

    const dragStart = e => {
        const target = e.target;
        draggingSquareId = target.id;
        // set the drag's format and data.
        e.dataTransfer.setData('dragSquareId', target.id);

        // add opacity when drag starts
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
        // remove opacity when drag ends
        e.target.style.opacity = '';
    }

    const dragEnter = e => {
        // highlight drop square when the draggable square enters it
        e.target.classList.add('over');
    }

    const dragLeave = e => {
        // remove highlight of drop square when the draggable square leaves it
        e.target.classList.remove('over');
    }

    return (
        <div
            data-testid='square'
            className={props.className}
            draggable={props.draggable}
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
