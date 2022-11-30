import React, { useState } from "react";
import ImageMapper from "react-image-mapper";
import mapImg from "../assets/map.jpeg";

import { useSpeechSynthesis } from "react-speech-kit";

const click = (event) => {
  console.log(event);
  return event;
};

export default function ImageMap() {
  const [toolTipValue, setTooltipValue] = useState(false);
  const [tooltipXY, setTooltipXY] = useState({});

  const { speak } = useSpeechSynthesis();

  return (
    <div className='container' style={{ paddingLeft: "20%" }}>
      <div style={{ position: "relative" }}>
        <ImageMapper
          src={mapImg}
          map={{
            name: "my-map",
            areas: [
              {
                name: "Japan",
                shape: "circle",
                coords: [720, 180, 10],
                top: 180,
                left: 720,
                preFillColor: "blue",
                fillColor: "yellow",
              },
              {
                name: "West Malaysia",
                shape: "circle",
                coords: [530, 425, 10],
                top: 425,
                left: 530,
                preFillColor: "blue",
                fillColor: "yellow",
              },
              {
                name: "East Malaysia",
                shape: "circle",
                coords: [600, 425, 10],
                top: 425,
                left: 600,
                preFillColor: "blue",
                fillColor: "yellow",
              },
            ],
          }}
          width={800}
          onClick={(area) => {
            setTooltipValue(click(area));
            setTooltipXY({
              top: area.top - 35,
              left: area.left,
            });
            speak({
              text: area.name,
              rate: 0.7,
            });
          }}
        />

        {toolTipValue && (
          <div>
            <span
              style={{
                zIndex: 999,
                position: "absolute",
                background: "#FFF",
                border: "1px solid #000",
                borderRadius: 4,
                padding: 8,
                ...tooltipXY,
              }}
            >
              {toolTipValue.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
