import React from "react";

export default function ButtonComponent({
  type,
  className,
  dataTestid,
  className2,
  masterObject,
  masterHandler,
  isTimerRunning
}) {
  function clamp(n, min, max) {
    return n > max ? max : n < min ? min : n
  };

  const buttonOnClick = () => {
    switch (true) {
      //increase focus time
      case dataTestid === "increase-focus": {
        const temp = clamp(
          masterObject.focusCur + masterObject.focusInc,
          masterObject.focusMin,
          masterObject.focusMax
        );
        masterHandler({ ...masterObject, focusCur: temp, focusCount: temp*60 });
        break;
      }

      //Decrease focus time
      case dataTestid === "decrease-focus": {
        const temp = clamp(
          masterObject.focusCur - masterObject.focusInc,
          masterObject.focusMin,
          masterObject.focusMax
        );
        masterHandler({ ...masterObject, focusCur: temp, focusCount: temp*60  });
        break;
      }
      //Increase break time
      case dataTestid === "increase-break": {
        const temp = clamp(
          masterObject.breakCur + masterObject.breakInc,
          masterObject.breakMin,
          masterObject.breakMax
        );
        masterHandler({ ...masterObject, breakCur: temp, breakCount: temp*60   });
        break;
      }
      //decrease break time
      case dataTestid === "decrease-break": {
        const temp = clamp(
          masterObject.breakCur - masterObject.breakInc,
          masterObject.breakMin,
          masterObject.breakMax
        );
        masterHandler({ ...masterObject, breakCur: temp, breakCount: temp*60  });
        break;
      }
      default:
        console.log("Something is *really* wrong!!!");
        break;
    }
  };

  return (
    <button
      type={type}
      className={className}
      data-testid={dataTestid}
      onClick={buttonOnClick}
      disabled={(isTimerRunning || masterObject.isRunning)}
    >
      <span className={className2} />
    </button>
  );
}