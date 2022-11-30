import React, { Fragment, useState, useEffect } from "react";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";

import {
  Dialog,
  Paper,
  makeStyles,
  TextField,
  Icon,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexDirection: "row",
  },
});

// const languageOptions = [
//   //   { label: "Cambodian", value: "km-KH" },
//   //   { label: "Deutsch", value: "de-DE" },
//   { label: "English", value: "en-AU" },
//   //   { label: "Farsi", value: "fa-IR" },
//   //   { label: "Français", value: "fr-FR" },
//   //   { label: "Italiano", value: "it-IT" },
//   //   { label: "普通话 (中国大陆) - Mandarin", value: "zh" },
//   //   { label: "Portuguese", value: "pt-BR" },
//   //   { label: "Español", value: "es-MX" },
//   //   { label: "Svenska - Swedish", value: "sv-SE" },
// ];

const puzzleOptions = [
  { id: 1, value: "PEN" },
  { id: 2, value: "JA" },
  { id: 3, value: "JAH" },
];

const instruction = ``;

const correctAnswer = "PENJAJAH";

export default function Puzzle({ onClose, open }) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const { speak } = useSpeechSynthesis();

  const onEnd = () => {
    if (value === correctAnswer) {
      setShowCorrect(true);
    } else {
      setShowWrong(true);
    }
  };

  const onResult = (result) => {
    setValue(result);
  };

  const handleSelectVal = (e) => {
    const newVal = value + e.target.value;
    setValue(newVal);
    speak({ text: e.target.value });
  };

  useEffect(() => {
    if (value === correctAnswer) {
      setShowCorrect(true);
    } else if (
      value.length === correctAnswer.length &&
      value !== correctAnswer
    ) {
      setShowWrong(true);
    }
  }, [value]);

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby='simple-dialog-title'
      open={open}
      maxWidth='sm'
      fullWidth
      className={classes.root}
    >
      <Paper style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>Spell out the following word: </p>
          <IconButton
            style={{ width: 32, height: 32, marginLeft: 16 }}
            onClick={() => {
              speak({ text: correctAnswer });
            }}
          >
            <Icon style={{ color: "white" }}>volume_up</Icon>
          </IconButton>
        </div>
        <div style={{ display: "flex" }}>
          <TextField
            id='output'
            name='output'
            placeholder='Waiting to take notes ...'
            value={value}
            variant='outlined'
            multiline
            rows={3}
            disabled
            style={{ display: "flex", width: "100%" }}
          />
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showCorrect && !showWrong ? (
              <IconButton>
                <Icon fontSize='large' style={{ color: "white" }}>
                  check
                </Icon>
              </IconButton>
            ) : null}
            {showWrong && !showCorrect ? (
              <IconButton style={{ background: "red", boxShadow: "none" }}>
                <Icon fontSize='large' style={{ color: "white" }}>
                  close
                </Icon>
              </IconButton>
            ) : null}
          </div>
        </div>
        {puzzleOptions.map(({ id, value }) => (
          <button key={id} value={value} onClick={handleSelectVal}>
            {value}
          </button>
        ))}
      </Paper>
    </Dialog>
  );
}
