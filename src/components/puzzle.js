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

const puzzleOptions = [
  { id: 1, value: "OC" },
  { id: 2, value: "CU" },
  { id: 3, value: "PA" },
  { id: 4, value: "TION" },
];

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const options = shuffle(puzzleOptions);

const fullSentence = `The occupation commenced with Imperial Japanese Army landings at Padang Pak Amat beach. 
The word you are looking for is: "occupation"`;
const partialSentence = `The __________ commenced with Imperial Japanese Army landings at Padang Pak Amat beach.`;

const correctAnswer = "OCCUPATION";

export default function Puzzle({ onClose, open }) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const { speak } = useSpeechSynthesis();

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
              speak({ text: fullSentence });
            }}
          >
            <Icon style={{ color: "white" }}>volume_up</Icon>
          </IconButton>
        </div>
        <p>{partialSentence}</p>
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
        {options.map(({ id, value }) => (
          <button key={id} value={value} onClick={handleSelectVal}>
            {value}
          </button>
        ))}
      </Paper>
    </Dialog>
  );
}
