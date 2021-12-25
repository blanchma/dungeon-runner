import { useEffect } from "react";

function useMove(dispatch) {
  function downHandler({ key }) {
    console.log(key)
    switch (key) {
      case 'w':
      case 'ArrowUp':
        return dispatch({type: 'UP'});
        break;
      case 'a':
      case 'ArrowLeft':
        return dispatch({type: 'LEFT'});
        break;
      case 's':
      case 'ArrowDown':
        return dispatch({type: 'DOWN'});
        break;
      case 'd':
      case 'ArrowRight':
        return dispatch({type: 'RIGHT'});
        break;
      default:
        break;
    }

  }

  useEffect(() => {
    window.addEventListener("keypress", downHandler);
    window.addEventListener("keydown", downHandler);
    //window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keypress", downHandler);
      //window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
}


export default useMove;