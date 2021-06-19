import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

export default function DisplayController({ masterObject, isTimerRunning }) {
  function toPercent(part, whole) {
    return (100 - Math.floor((part / whole) * 100));
  }

  function timerRenderer() {
    let temp = "";
    let timerTotal = "";
    let ariaValue = 0;

    // Render out the Text for the Timer based on Mode and Create the Percentage Value
    if (masterObject.mode === "Focus") {
      timerTotal = `Focusing for ${minutesToDuration(
        masterObject.focusCur
      )} minutes`;
      temp = masterObject.focusCount;
      ariaValue = toPercent(
        masterObject.focusCount,
        masterObject.focusCur * 60
      );
    } else if (masterObject.mode === "Break") {
      timerTotal = `On Break for ${minutesToDuration(
        masterObject.breakCur
      )} minutes`;
      temp = masterObject.breakCount;
      ariaValue = toPercent(
        masterObject.breakCount,
        masterObject.breakCur * 60
      );
    }

    const timerRemaining = `${secondsToDuration(temp)} remaining`;

    return (
      <>
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">{timerTotal}</h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {timerRemaining}
            </p>
          </div>
        </div>
        {/* If timer is not running, show the 'paused */}
        {!isTimerRunning ? <h2 className="col">PAUSED</h2> : null}
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={ariaValue} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${ariaValue}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </>
    );
  }
 //if the master object is running, return the time bar, if not don't show anything
  if (masterObject.isRunning) {
    return <>{timerRenderer()}</>;
  } else return null;
}