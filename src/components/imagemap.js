import React, {useState} from 'react';
import ImageMapper from 'react-image-mapper';


import mapImg from '../assets/map.jpeg';

const click = (event) => {

    console.log(event);
    return event;
    
}

export default function ImageMap () {
    const [toolTipValue, setTooltipValue] = useState(false);
    const [tooltipXY, setTooltipXY] = useState({})
    return (
            <div className="container" style={{paddingLeft:"20%"}}>


        <div
        
        style={{position: "relative"}}>
                <ImageMapper src={mapImg}
                    map={
                        
                        {
                            name: "my-map",
                            areas: [
                                { name: "Japan", shape: "circle", coords: [720, 180, 10], preFillColor:"blue", fillColor: "yellow"  },
                                { name: "West Malaysia", shape: "circle", coords: [530, 425, 10 ], top:530, left:425, preFillColor: "blue", fillColor: "yellow" },
                                { name: "East Malaysia", shape: "circle", coords: [600, 425, 10 ], preFillColor: "blue", fillColor: "yellow" },
                            ]
                        }

                    } width={800}
                    onClick={area => {
                            setTooltipValue(click(area));
                            setTooltipXY({
                                top: area.top,
                                left: area.left
                            })
                        }
                    }
                />

                {
                    toolTipValue &&

                    <div>
                    <span
                        style={{
                            zIndex: "999",
                            position: "absolute",
                            ...tooltipXY
                        }}>
                        {toolTipValue.name}
                    </span>
                    </div>
                }

</div>
            </div>
    );
}
