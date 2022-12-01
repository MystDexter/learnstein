/* eslint-env browser */
import React, { useEffect, useState } from "react";

import { Button, Icon } from "@material-ui/core";

import { article } from "./articles";
import SpeechKit from "./speechkit";
import Puzzle from "./puzzle";

const splitTextAtCharIndex = (text, charIndex) => {
  const before = text.slice(0, charIndex);
  let after = text.slice(charIndex, text.length).split(" ");
  let currentWord;
  if (after.length && after[0] !== "") {
    currentWord = after.shift();
    after = after.join(" ");
  } else after = text;
  return {
    before,
    currentWord,
    after,
  };
};
/* create <br /> react nodes for new lines in string */
const renderText = (text) =>
  text.split("\n").map((item, index) => (index === 0 ? item : [<br />, item]));
const renderHighlight = (before, currentWord, after) => {
  return (
    <p className='App-intro'>
      <span>{renderText(before)}</span>
      <span style={{ backgroundColor: "yellow" }}>
        {renderText(currentWord + " ")}
      </span>
      <span>{renderText(after)}</span>
    </p>
  );
};
export default function Reader() {
  const [refresh, setRefresh] = useState(0);
  const [rate, setRate] = useState(0.8);
  const [openSpeechKit, setOpenSpeechKit] = useState(false);
  const [openPuzzle, setOpenPuzzle] = useState(false);
  const [state, setState] = useState({
    utterance: null,
    currentWord: "",
    before: "",
    after: "",
    synth: {},
  });

  const { before, currentWord, after, utterance, synth } = state;
  const { speaking, paused } = synth;

  useEffect(() => {
    const u = new SpeechSynthesisUtterance();

    const voices = speechSynthesis.getVoices();
    const filteredVoices = voices.filter(({ lang }) => lang === "en-GB");

    u.text = article;
    u.lang = "en-gb";
    u.rate = rate;
    u.voice = filteredVoices[0];
    u.onend = () => setRefresh(refresh + 1);

    u.onboundary = (e) => {
      setState({ ...state, ...splitTextAtCharIndex(u.text, e.charIndex) });
    };

    const synth = speechSynthesis;
    synth.cancel();
    setState({
      ...state,
      utterance: u,
      synth: synth,
      before: "",
      currentWord: "",
      after: u.text,
    });
  }, [refresh]);

  const handleCancel = () => {
    setRefresh(refresh + 1);
    state.synth.cancel();
  };

  const handleChangeRate = ({ target }) => {
    const val = target.value;
    setRate(val);
    setRefresh(refresh + 1);
  };

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        onClick={() => synth.speak(utterance)}
        disabled={speaking}
        endIcon={<Icon style={{ color: "white" }}>play_arrow</Icon>}
      >
        Play
      </Button>

      <Button
        variant='contained'
        color='secondary'
        className='Stop'
        onClick={handleCancel}
        style={{ marginLeft: 16 }}
        endIcon={<Icon style={{ color: "white" }}>stop</Icon>}
      >
        Stop
      </Button>
      <div id='rate-control' style={{ marginTop: 16 }}>
        <label htmlFor='rate'>Speed:</label>
        <input
          type='range'
          min='0.5'
          max='2'
          value={rate}
          step='0.1'
          id='rate'
          onChange={handleChangeRate}
        />
      </div>
      {renderHighlight(before, currentWord, after)}
      <div style={{ marginBottom: 16 }}>
        <Button variant='contained' onClick={() => setOpenSpeechKit(true)}>
          Open Speech Assessment
        </Button>
        <SpeechKit
          open={openSpeechKit}
          onClose={() => setOpenSpeechKit(false)}
        />
        <Button
          variant='contained'
          onClick={() => setOpenPuzzle(true)}
          style={{ marginLeft: 16 }}
        >
          Open Spelling Assessment
        </Button>
      </div>
      <Puzzle open={openPuzzle} onClose={() => setOpenPuzzle(false)} />
    </div>
  );
}
