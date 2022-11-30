/* eslint-env browser */
import React, { useEffect, useState } from "react";

export default function Chapters() {
  const [refresh, setRefresh] = useState(0);
  const [rate, setRate] = useState(1.0);
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
    u.text = article;
    u.lang = "en-gb";
    u.rate = rate;
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
    </div>
  );
}
