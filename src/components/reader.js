/* eslint-env browser */
import React, { useEffect, useState } from "react";
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
  const [rate, setRate] = useState(1.0);
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
  const { speaking } = synth;

  useEffect(() => {
    const u = new SpeechSynthesisUtterance();

    const voices = speechSynthesis.getVoices();
    const filteredVoices = voices.filter(({ lang }) => lang === "en-GB");

    u.text = article;
    u.lang = "en-gb";
    u.rate = rate;
    u.voice = filteredVoices[0];

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
      <button onClick={() => synth.speak(utterance)} disabled={speaking}>
        Start
      </button>
      <button className='Stop' onClick={handleCancel}>
        Stop
      </button>
      <div id='rate-control'>
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
      <button onClick={() => setOpenSpeechKit(true)}>
        Open Speech Assessment
      </button>
      <SpeechKit open={openSpeechKit} onClose={() => setOpenSpeechKit(false)} />
      <button onClick={() => setOpenPuzzle(true)}>
        Open Spelling Assessment
      </button>
      <Puzzle open={openPuzzle} onClose={() => setOpenPuzzle(false)} />
    </div>
  );
}
