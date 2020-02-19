import React from 'react'

function Square(props) {
    return (
        <div
            id={props.id}
            className='square'
            style={{ backgroundColor: props.backgroundColor }}
        >
        </div>
    )
}
export default Square;
