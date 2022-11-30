import React, { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

import { Card, Dialog, makeStyles, Icon } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexDirection: "row",
  },
});

const languageOptions = [
  //   { label: "Cambodian", value: "km-KH" },
  //   { label: "Deutsch", value: "de-DE" },
  { label: "English", value: "en-AU" },
  //   { label: "Farsi", value: "fa-IR" },
  //   { label: "Français", value: "fr-FR" },
  //   { label: "Italiano", value: "it-IT" },
  //   { label: "普通话 (中国大陆) - Mandarin", value: "zh" },
  //   { label: "Portuguese", value: "pt-BR" },
  //   { label: "Español", value: "es-MX" },
  //   { label: "Svenska - Swedish", value: "sv-SE" },
];

const correctAnswer = "Japanese";

export default function SpeechKit({ onClose, open }) {
  const classes = useStyles();
  const [lang, setLang] = useState("en-AU");
  const [value, setValue] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const onEnd = () => {
    // You could do something here after listening has finished
    if (value === correctAnswer) {
      setShowCorrect(true);
    } else {
      setShowWrong(true);
    }
  };

  const onResult = (result) => {
    setValue(result);
  };

  const changeLang = (event) => {
    setLang(event.target.value);
  };

  const onError = (event) => {
    if (event.error === "not-allowed") {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onEnd,
    onError,
  });

  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen({ lang });
      };

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby='simple-dialog-title'
      open={open}
      className={classes.root}
    >
      <form id='speech-recognition-form' style={{ width: "70%", padding: 16 }}>
        <h2>Speech Recognition</h2>
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Recognition.
          </p>
        )}
        {supported && (
          <React.Fragment>
            <p>
              {`Click 'Listen' and start speaking.
               SpeechRecognition will provide a transcript of what you are saying.`}
            </p>
            <div style={{ display: "flex", marginBottom: 16 }}>
              <label htmlFor='language'>Language</label>
              <select
                form='speech-recognition-form'
                id='language'
                value={lang}
                onChange={changeLang}
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>
                Question: The ________ Army invaded Malaya in 8 December 1941
              </p>
            </div>
            {/* <label htmlFor='transcript'>Transcript</label> */}
            <textarea
              id='transcript'
              name='transcript'
              placeholder='Waiting to take notes ...'
              value={value}
              rows={3}
              disabled
              style={{ display: "flex", width: "100%" }}
            />
            <button disabled={blocked} type='button' onClick={toggle}>
              {listening ? "Stop" : "Listen"}
            </button>
            {blocked && (
              <p style={{ color: "red" }}>
                The microphone is blocked for this site in your browser.
              </p>
            )}
          </React.Fragment>
        )}
      </form>
      <div style={{ width: "30%" }}>
        {showCorrect ? <Icon fontSize='large'>check</Icon> : null}
        {showWrong ? <Icon fontSize='large'>dangerous</Icon> : null}
      </div>
    </Dialog>
  );
}
