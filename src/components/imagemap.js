import React, {useState} from 'react'
import ImageMarker, { Marker } from 'react-image-marker';

import ImageMapper from 'react-image-mapper';


import mapImg from '../assets/map.jpeg';
import { ClickAwayListener } from '@material-ui/core';


const click = (event) => {
    
    alert(event.name);
    
    console.log(event);
           
    
    
}



export default function ImageMap () {
    const [clickArea, setClickedArea] = useState();

    return (
            <div className="container" style={{paddingLeft:"20%"}}>
                <ImageMapper src={mapImg}
                    map={
                        
                        {
                            name: "my-map",
                            areas: [
                                { name: "Japan", shape: "circle", coords: [720, 180, 10], preFillColor:"blue", fillColor: "yellow"  },
                                { name: "West Malaysia", shape: "circle", coords: [530, 425, 10 ], preFillColor: "blue", fillColor: "yellow" },
                                { name: "East Malaysia", shape: "circle", coords: [600, 425, 10 ], preFillColor: "blue", fillColor: "yellow" },
                            ]
                        }

                    } width={800}
                    //onLoad={() => this.load()}
                    onClick={area => click(area)}
                    //onMouseEnter={area => this.enterArea(area)}
                    //onMouseLeave={area => this.leaveArea(area)}
                    //onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                    //onImageClick={evt => this.clickedOutside(evt)}
                    //onImageMouseMove={evt => this.moveOnImage(evt)}
                />


                
            </div>



    );
}
