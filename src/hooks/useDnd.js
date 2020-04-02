import { useEffect, useState } from 'react';
import useAction from 'hooks/useAction';
import {
  removeAnswerFromRadioOrCheckBox,
  setDragAndDropArray,
} from 'models/test/reducer';
// eslint-disable-next-line no-unused-vars
import nanoid from 'nanoid';
// eslint-disable-next-line no-unused-vars
import usePortal from 'hooks/usePortal';
// eslint-disable-next-line no-unused-vars
import { createPortal } from 'react-dom';

const useDnd = (elements, qId, entities) => {
  const [isDrag, setIsDrag] = useState(false);
  const [dragElement, setDragElement] = useState(null);
  const [belowElement, setBelowElement] = useState(null);
  const [coords, setCoords] = useState(null);
  const [shift, setShift] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const setDndArray = useAction(setDragAndDropArray);
  // eslint-disable-next-line no-unused-vars
  const removeAnswer = useAction(removeAnswerFromRadioOrCheckBox);
  const drag = e => {
    console.log(shift);
    setCoords([e.pageX - shift[0], e.pageY - shift[1] / 2]);
  };

  useEffect(() => {
    if (isDrag) {
      dragElement.style.left = `${coords[0]}px`;
      dragElement.style.top = `${coords[1]}px`;
      dragElement.style.display = 'none';
      const targetBelow = document.elementFromPoint(coords[0], coords[1]);
      dragElement.style.display = 'flex';
      if (belowElement === targetBelow || !targetBelow.dataset.draggable)
        return;

      if (belowElement) {
        belowElement.style.backgroundColor = 'blueviolet';
      }
      setBelowElement(targetBelow);
      if (belowElement) {
        targetBelow.style.backgroundColor = 'red';
      }
    }
  }, [coords]);

  // eslint-disable-next-line no-unused-vars
  const dragStop = () => {
    setIsDrag(false);
    document.removeEventListener('mouseup', dragStop);
  };

  const dragStart = e => {
    const t = e.currentTarget;
    setIsDrag(true);
    setDragElement(t);
    console.log(e.pageX);
    console.log(e.pageY);
    const width = t.offsetWidth;
    const height = t.offsetHeight;
    const shiftX = e.clientX - t.getBoundingClientRect().left;
    const shiftY = e.clientY - t.getBoundingClientRect().top;
    t.style.position = 'fixed';
    setShift([shiftX, shiftY]);
    t.style.zIndex = 1000;
    t.style.width = `${width}px`;
    t.style.height = `${height}px`;
    t.style.left = `${e.clientX - shiftX}px`;
    t.style.top = `${e.clientY - shiftY}px`;
    setCoords([e.pageX - shiftX, e.pageY - shiftY]);
    document.addEventListener('mouseup', dragStop);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isDrag) {
      document.addEventListener('mousemove', drag);
      return () => document.removeEventListener('mousemove', drag);
    }
    if (!isDrag && belowElement) {
      // eslint-disable-next-line no-shadow
      let arr = [...elements];
      const indexOfRemoveElement = arr.findIndex(id => id === dragElement.id);
      arr.splice(indexOfRemoveElement, 1);
      const indexPart1 = arr.findIndex(id => id === belowElement.id);
      const part1 = arr.slice(0, indexPart1);
      const part2 = arr.slice(indexPart1, arr.length);
      const newId = nanoid();
      // eslint-disable-next-line no-unused-vars
      const dragId = dragElement.id;
      arr = [...part1, newId, ...part2];
      // eslint-disable-next-line no-unused-vars
      const objWithNewId = { ...entities[dragElement.id], id: newId };
      belowElement.style.backgroundColor = 'blueviolet';
      setDragElement(null);
      setBelowElement(null);
      setCoords(null);
      setShift(null);
      // document.body.removeChild(dragElement);
      // removeAnswer({ id: qId, qId: dragId });
      // document.body.removeChild(dragElement);
      setDndArray({
        id: qId,
        ids: arr,
        oldId: dragId,
        newId,
        objWithNewId,
      });
    }
  }, [isDrag]);

  return [dragStart, isDrag];
};

export default useDnd;
