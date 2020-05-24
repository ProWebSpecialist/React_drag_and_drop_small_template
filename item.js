

import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd'
import React, { useState, useEffect ,useRef} from 'react';

// const width = 100;
// const height = 100;
 export default function Item(prop) {
const ref = useRef(null);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "question",
    drop: () => {
      prop.moveItem(prop.indi);
    },
    collect: monitor => ({      
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.sourceindex;
      const hoverIndex = prop.sourceindex;


      // Don't replace items with themselves

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;


            const hoverMiddleX =
        (hoverBoundingRect.left + hoverBoundingRect.right) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      prop.handleData(item.type, item.sourceindex, item, prop.type,prop.sourceindex)
    },
  });


    const [{isDragging}, drag] = useDrag({
        item: { type: prop.type,val:prop.val, sourceindex:prop.sourceindex },
        drag: () => {
          console.log("drag")
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
            
        }),
    });


    const customStyle = {

        height:'45px',
        width:'45px',
        opacity: isDragging ? 0.5 : 1,
        lineHeight: '90%',
         border:'1px solid #ddd',
        padding:'0'

    };
  drag(drop(ref));
    return(

        <div>

            <div ref={ref} className={prop.type=="question"? "q"+prop.sourceindex:"a"+prop.sourceindex} style={{border:'3px dotted '+prop.border, padding:'3px',alignItems:'center'}} onMouseDown={() => {prop.getIndex(prop.sourceindex)}}>
                {
                    //<button ref={drag} style={{...customStyle}}>{prop.val}</button>
                    <img src={prop.val.url} style={{...customStyle}}></img>
                }
            </div>
            {
                <img src="http://www.clker.com/cliparts/G/F/D/c/j/r/correct-md.png"
                     style={prop.answer == 1 ? {width: '20px', height: '20px'} : {display: 'none'}}/>
            }
                 
            {
                <img src="http://clipart-library.com/data_images/49127.png"
                     style={prop.answer == 2 ? {width: '20px', height: '20px'} : {display: 'none'}}/>
            }
        </div>



    )
}



const css = {
    itemContainer: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

};
