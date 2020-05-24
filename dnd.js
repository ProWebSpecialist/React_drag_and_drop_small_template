import React, { useState, useEffect,useRef } from 'react';
import Item from './item';
import Line from './line';
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Container, Button, FormControl, FormGroup, FormControlLabel, Checkbox} from '@material-ui/core';
// import api from '~/config/ApiConfig';
import useStyles from './style'


const Dnd = () => {
    const classes = useStyles();

    const [original,setoriginal]=useState([{"q":{"cat":"image","id":1,"url":"https://cdn.pixabay.com/photo/2018/02/24/10/10/pineapple-3177704_1280.png"},
    "a":{"cat":"image","id":1,"url":"https://cdn.pixabay.com/photo/2018/02/24/10/10/pineapple-3177704_1280.png"}},
    {
       "q": {
            "cat"
        :
            "flower", "id"
        :
            2, "url"
        :
            "https://cdn.pixabay.com/photo/2013/07/12/15/59/lotus-150693_1280.png"},
       "a": {
                "cat"
        :
            "flower", "id"
        :
            2, "aurl"
        :
            "https://cdn.pixabay.com/photo/2013/07/12/15/59/lotus-150693_1280.png"
        }
    }]);

    const [sInd, setSInd] = useState([]);

    const [randomq, setrandomQ] =useState([]);

    const  [q, setQ]=useState([]);

    const [same, setSame] = useState([]);

        const  [a, setA]=useState([]);

    const  [refresh, setRefresh]=useState(0);

    const [m,setM] =useState([]);
        const [r,setR] =useState([]);
    var url='https://maestro-kids.s3.amazonaws.com/158/fruits.json';

    useEffect(() => {
   // api.post('', {url: url})
   //   .then(response => {
    //          var resData = [];
     //         var qData = [];
     //         var resultData = [];
     //     var avail_lang=response.data.doc.lang;

      //        response.data.doc.images.map(d => {
       //           let audio = new Audio(d.sound);
      //            resData.push({
       //                   image: d.image,
       //                   text: d.text,
       //                   "aud": audio
//
     //                 }
        //          );

                  //qData.push(makeQ(d.text));
                  //resultData.push(0);
            //  });
          let y=randomise(original);

          setrandomQ(y);

         process(y);

        setSame(false)
         // }
      //)

  }, [refresh]);

    function shuffle(array) {
      var tmp, current, top = array.length;
      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    }


    const randomise=(input)=>{

      let k=input.length<6?input.length:10;


        for (var a=[],i=0;i<k;++i) a[i]=i;

        let y = shuffle(a);

        let x=[];

        for (i=0;i<2;++i)
            x.push(original[y[i]]);


        return x;

    };




     const process=input=>{


         let x=[];

         let z=[];

         let y=[];


          input.map ((k,i)=>{
           x.push(k.q);
           y.push(k.a);

           z.push({"q":k.q.id,"a":0,

                           qcolor:'#'+Math.floor(Math.random()*16777215).toString(16),
                           acolor:'#'+Math.floor(Math.random()*16777215).toString(16)})
         }
         );


         setM(z);
         setR(z);


         setQ(x);
         setA(y);

          //return x;

     };

     const mark=()=>{


         let rm=[];
         m.map ((k,i)=> {

                       rm.push({'q':k.q,'a':  k.q==k.a?1:2});
                   }
                   );


                  console.log(rm);

          setR(rm);



         console.log(m);
     };




    const newQ=()=>{

          setRefresh(refresh+1);
     };

    const moveItem = (indi) => {
      // let y=randomise(original);
      // setrandomQ(y);
      // process(y);
      console.log(q);
      console.log(a)
      let tmp = [];
             
      a.map((x, i) => {
        if(a[i].id == 1 && i == 0) { 
          console.log("step1")
          tmp.push(a[i]);
        }
      });
      q.map((x, i) => {
        if(a[i].id == sInd) {
          console.log("step2")
          tmp.push(q[i]);
        }
      });
      a.map((x, i) => {      
        if(a[i].id == 1 && i == 1) { 
          console.log("step1")
          tmp.push(a[i]);
        }
      });
        
      if(sInd == 1) {
        setSame(true)
      }
      setA(tmp);
      // console.log(tmp)
      // setA(tmp);
      // if(indi == (sInd - 1)) {
      //   console.log("same");
      // }else{
      //   console.log("not same");
      // }
    }
     
    const getIndex = (sourceIndex) => {
      setSInd(sourceIndex);
    }

    const handleData=(source, sIndex, val, target,tIndex)=>

    {

        //if (source==target)
           // return;

      let x=[...m];


       // x.filter( function (f) { return f.q==sIndex

       // })[0].a=tIndex;

        var index=0;

        x.map( (itm,i)=>{

            if (itm.q==sIndex)
               index=i;

        });


        //console.log("index"+index+" "+tIndex);

        x[index].a=tIndex;

        x[index].acolor= x[index].qcolor;

        setM(x);





      //  let arr1=[...q];


       // let filtered = arr1[sIndex].val.filter(function(value){ return value.imageid!=val.imageid;});

       // arr1[sIndex].val=filtered;

       // arr1[tIndex].val.push(val);


      //  setQ(arr1)


    };
const style = {
  //height: '6rem',

  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  //padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
    border:'3px solid #ddd',
    width:'auto'
};

    return(
      <div className={classes.activitybox}>
		   	<h1>Matching</h1>
		   	<div className={classes.heading}>
		   		<h2>Drag and Drop</h2>

		   	</div>

        <DndProvider backend={HTML5Backend}>

     <div  style = {{ display: 'flex',flexDirection: 'row',   padding:'5px',flexWrap: 'wrap'}} >
          <div   style = {{ display: 'flex',flexDirection: 'column',  padding:'50px',width: '50%',flexWrap: 'wrap',  alignItems: 'center',justifyContent: 'center'}}>
                    <div   style = {{...style,display: 'flex',flexDirection: 'column',flexWrap: 'wrap'}}>
                        {
                           q.map((x,i)=>{

                                return (

                                <Item border={m[i].qcolor} answer={r[i].a} sourceindex={x.id} val={x} key={x.id} type={"question"} handleData={handleData} moveItem={moveItem} indi={i} getIndex={getIndex}></Item>
                                )
                            })
                        }
                    </div>
            </div>
            <div>
              {
                same ? <h1 style={{color: 'red'}}>Same</h1> : <h1 style={{color: 'red'}}>Not Same</h1>
              }
            </div>
            <div   style = {{ display: 'flex',flexDirection: 'column',  padding:'50px',flexWrap: 'wrap',width: '50%', alignItems: 'center',justifyContent: 'center'}}>
                    <div   style = {{...style,display: 'flex',flexDirection: 'column',flexWrap: 'wrap'}}>
                        {
                           a.map((x,i)=>{
                                return (
                                <Item border={m[i].acolor} answer={r[i].a}  sourceindex={x.id} val={x} key={x.id} type={"answer"} handleData={handleData} moveItem={moveItem} indi={i} getIndex={getIndex}></Item>
                                )
                            })
                        }
                      </div>
            </div>
     </div>
                <Button onClick={mark}> submit</Button>

                <Button onClick={newQ}> Try Another</Button>




            </DndProvider>
                   </div>
    )
}

export default Dnd;