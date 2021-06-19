import React from "react";

export default function StopButton({
  masterObject,
  masterHandler,
  isTimerRunning,
  playPause,
}) {
  const stopButtonOnClick = () => {
      // Checks if Clock was Initiated or Timer is Currently Running
      // If so, Cease Execution and Reset Values to Default User Selected Values
    if (masterObject.isRunning) {
      if (isTimerRunning) playPause();
      // Only sets values when we need to set values on reset
      masterHandler({
        ...masterObject,
        focusCount: masterObject.focusCur * 60,
        breakCount: masterObject.breakCur * 60,
        mode: "Focus",
        isRunning: false
      });
    };
  };

  return (
    <button
      type="button"
      className="btn btn-secondary"
      title="Stop the session"
      onClick={stopButtonOnClick}
      data-testid="stop"
      disabled={!isTimerRunning}
    >
      <span className="oi oi-media-stop" />
    </button>
  );
}