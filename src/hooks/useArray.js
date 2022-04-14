import { useState } from "react";

export function useArray(defaultValue) {
  const [array, setArray] = useState(defaultValue);

  function push(element) {
    setArray((a) => [...a, element]);
  }

  function filter(callback) {
    setArray((a) => a.filter(callback));
  }

  function update(index, newElement) {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length - 1),
    ]);
  }

  function remove(index) {
    setArray((a) => [
      ...a.slice(0, index),
      ...a.slice(index + 1, a.length - 1),
    ]);
  }

  function removeByElement(element) {
    setArray((a) => a.filter((item) => item !== element));
  }

  function addRemove(element) {
    if (isPresent(element)) {
      removeByElement(element);
    } else {
      push(element);
    }
  }

  function isPresent(element) {
    return array.includes(element);
  }

  function indexOf(element) {
    return array.indexOf(element);
  }

  function length() {
    return array.length;
  }

  function clear() {
    setArray([]);
  }

  return {
    array,
    set: setArray,
    push,
    filter,
    update,
    remove,
    addRemove,
    isPresent,
    indexOf,
    length,
    clear,
  };
}
