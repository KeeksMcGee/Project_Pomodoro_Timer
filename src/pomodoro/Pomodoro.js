import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";

import ButtonComponent from "./ButtonController";
import Timer from "./DisplayController";
import StopButton from "./StopButton";
import { minutesToDuration } from "../utils/duration";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [masterObject, masterHandler] = useState({
    focusCur: 25,
    breakCur: 5,
    focusMin: 5,
    breakMin: 1,
    focusMax: 60,
    breakMax: 15,
    focusInc: 5,
    breakInc: 1,
    focusCount: 1500,
    breakCount: 300,
    mode: "Focus",
    isRunning: false,
  });

  // Needed to Activate Frame 1, otherwise the Timer Lags 1 frame
  if (isTimerRunning && !masterObject.isRunning) {
    masterHandler({ ...masterObject, isRunning: true });
  }

  useInterval(
    () => {
      // Check if focusCount or breakCount (which is in Seconds) is 0, and if so
      // Flip the Mode and Reset the respective Counter
      // If Mode is Focus or Break, Increment by -1 respectively
      switch (true) {
        case masterObject.focusCount === 0: {
          //if the focus timer hits zero, switch to break mode
          masterHandler({
            ...masterObject,
            focusCount: masterObject.focusCur * 60,
            mode: "Break",
          });
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
          break;
        }
        //if the break timer hits zero, switch to focus mode
        case masterObject.breakCount === 0: {
          masterHandler({
            ...masterObject,
            breakCount: masterObject.breakCur * 60,
            mode: "Focus",
          });
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
          break;
        }
        //if you are in focus mode, decrement the count by one
        case masterObject.mode === "Focus": {
          masterHandler({
            ...masterObject,
            focusCount: masterObject.focusCount - 1,
          });
          break;
        }
        //if you are in break mode, decrement the count by 1
        case masterObject.mode === "Break": {
          masterHandler({
            ...masterObject,
            breakCount: masterObject.breakCount - 1,
          });
          break;
        }
        default:
          break;
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(masterObject.focusCur)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <ButtonComponent
                type="button"
                className="btn btn-secondary"
                dataTestid="decrease-focus"
                className2="oi oi-minus"
                masterObject={masterObject}
                masterHandler={masterHandler}
                isTimerRunning={isTimerRunning}
              />
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <ButtonComponent
                type="button"
                className="btn btn-secondary"
                dataTestid="increase-focus"
                className2="oi oi-plus"
                masterObject={masterObject}
                masterHandler={masterHandler}
                isTimerRunning={isTimerRunning}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(masterObject.breakCur)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <ButtonComponent
                  type="button"
                  className="btn btn-secondary"
                  dataTestid="decrease-break"
                  className2="oi oi-minus"
                  masterObject={masterObject}
                  masterHandler={masterHandler}
                  isTimerRunning={isTimerRunning}
                />
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <ButtonComponent
                  type="button"
                  className="btn btn-secondary"
                  dataTestid="increase-break"
                  className2="oi oi-plus"
                  masterObject={masterObject}
                  masterHandler={masterHandler}
                  isTimerRunning={isTimerRunning}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <StopButton
              masterObject={masterObject}
              masterHandler={masterHandler}
              isTimerRunning={isTimerRunning}
              playPause={playPause}
            />
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <Timer masterObject={masterObject} isTimerRunning={isTimerRunning} />
      </div>
    </div>
  );
}

export default Pomodoro;