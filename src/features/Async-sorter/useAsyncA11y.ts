import { useRef, useCallback } from 'react';
import type { AsyncSorterBlock, FocusZone, Zone } from './types';
export const useAsyncA11y = (
  setSelectedItem: React.Dispatch<
    React.SetStateAction<AsyncSorterBlock | null>
  >,
  setDraggedItem: React.Dispatch<React.SetStateAction<AsyncSorterBlock | null>>,
  handleDrop: (zone: Zone, insertBeforeInd: number) => void,
  zoneRefs: React.RefObject<Record<FocusZone, HTMLDivElement | null>>
) => {
  const itemRefs = useRef<{
    source: HTMLDivElement[];
    'Call Stack': HTMLDivElement[];
    Microtasks: HTMLDivElement[];
    Macrotasks: HTMLDivElement[];
  }>({
    source: [],
    'Call Stack': [],
    Microtasks: [],
    Macrotasks: [],
  });
  const focusZones: FocusZone[] = [
    'source',
    'Call Stack',
    'Microtasks',
    'Macrotasks',
  ];

  const setSourceItemRef = useCallback(
    (index: number, el: HTMLDivElement | null) => {
      if (!el) return;
      itemRefs.current.source[index] = el;
    },
    []
  );
  const handleItemKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    item: AsyncSorterBlock,
    zone: FocusZone,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    switch (e.key) {
      case 'Enter':
        setSelectedItem(item);
        setDraggedItem(item);
        break;
      case 'ArrowLeft':
        itemRefs.current[zone][index - 1]?.focus();
        break;
      case 'ArrowRight':
        itemRefs.current[zone][index + 1]?.focus();
        break;
      case 'ArrowUp':
        zoneRefs.current[zone]?.focus();
        break;
    }
  };
  const handleZoneKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    zone: FocusZone,
    insertBefore: number,
    index: number
  ) => {
    const zoneIndex = focusZones.indexOf(zone);

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = focusZones[zoneIndex - 1];
      zoneRefs.current[prev]?.focus();
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = focusZones[zoneIndex + 1];
      zoneRefs.current[next]?.focus();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      itemRefs.current[zone][0]?.focus();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (zone !== 'source') {
        handleDrop(zone, insertBefore);
      }
      setSelectedItem(null);
    } else handleOtherKeyDown(e, zone, index);
  };
  const handleOtherKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    zone: FocusZone,
    index: number
  ) => {
    const refs = itemRefs.current;
    const zoneOrder: FocusZone[] = ['Call Stack', 'Microtasks', 'Macrotasks'];
    if (e.key === 'ArrowDown') {
      e.preventDefault();

      const currentIndex = zoneOrder.indexOf(zone);
      if (currentIndex === -1 || currentIndex === zoneOrder.length - 1) return;
      const nextZone = zoneOrder[currentIndex + 1];
      const nextList = nextZone === 'source' ? refs.source : refs[nextZone];
      (nextList[index] ?? nextList.at(-1)).focus();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = zoneOrder.indexOf(zone);
      if (currentIndex === -1 || currentIndex === 0) return;
      const prevZone = zoneOrder[currentIndex - 1];
      const prevList = prevZone === 'source' ? refs.source : refs[prevZone];
      (prevList[index] ?? prevList.at(-1)).focus();
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const list = zone === 'source' ? refs.source : refs[zone];
      list[index + 1]?.focus();
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const list = zone === 'source' ? refs.source : refs[zone];
      if (index > 0) {
        list[index - 1]?.focus();
      } else if (zone !== 'source') {
        refs.source[index]?.focus();
      }
      return;
    }
  };
  return {
    itemRefs,
    focusZones,
    handleItemKeyDown,
    handleZoneKeyDown,
    handleOtherKeyDown,
    setSourceItemRef,
  };
};
