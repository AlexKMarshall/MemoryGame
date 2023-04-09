import { ReactNode, RefObject, useEffect, useReducer } from "react";
import { getNextIndex } from "../utils";

type Id = string | number;

type CollectionItem<T> = T & {
  /**
   * A unique identifier for this item
   */
  id: Id;
};

export type LayoutGridProps<T> = {
  items: CollectionItem<T>[];
  /**
   * The number of items to display per row
   */
  rowLength: number;
  children: (item: CollectionItem<T>) => ReactNode;
};

type RovingTabFocusState = {
  currentFocusedId: Id;
  tabStops: Map<Id, RefObject<HTMLElement>>;
  /**
   * Whether or not the focus should be automatically moved when the currentFocusedId
   * changes. This is to prevent the focus from automatically being set to the first
   * item when the grid mounts. Set this to true when the user interacts with the grid
   */
  isAutoFocusEnabled: boolean;
};

type RegisterTabStopAction = {
  type: "registerTabStop";
  id: Id;
  ref: RefObject<HTMLElement>;
};

type UnregisterTabStopAction = {
  type: "unRegisterTabStop";
  id: Id;
};

/**
 * Focuses the tab stop with the given id
 * Call it if a user manually focuses an item in the grid e.g. by clicking on it
 */
type FocusAction = {
  type: "focus";
  id: Id;
};

type NavigateAction = {
  type: "navigate";
  direction: "left" | "right";
  currentIdList: Id[];
};

type EnableAutoFocusAction = {
  type: "enableAutoFocus";
};

type RovingTabFocusAction =
  | RegisterTabStopAction
  | UnregisterTabStopAction
  | FocusAction
  | NavigateAction
  | EnableAutoFocusAction;

function rovingTabFocusReducer(
  state: RovingTabFocusState,
  action: RovingTabFocusAction
): RovingTabFocusState {
  switch (action.type) {
    case "registerTabStop": {
      const { id, ref } = action;
      if (state.tabStops.has(id)) {
        console.warn(
          `Tab stop with id ${id} already exists. Trying to register tab stop`
        );
        return state;
      }
      const newTabStops = new Map(state.tabStops);
      newTabStops.set(id, ref);
      return {
        ...state,
        tabStops: newTabStops,
        // TODO: maybe need to disable autofocus when a new tab stop is registered
        // isAutoFocusEnabled: true,
      };
    }
    case "unRegisterTabStop": {
      const { id } = action;
      if (!state.tabStops.has(id)) {
        console.warn(
          `Tab stop with id ${id} does not exist. Trying to unregister tab stop.`
        );
        return state;
      }
      const newTabStops = new Map(state.tabStops);
      newTabStops.delete(id);
      return {
        ...state,
        tabStops: newTabStops,
        // TODO: maybe need to disable autofocus when a tab stop is unregistered
        // isAutoFocusEnabled: true,
      };
    }
    case "focus": {
      const { id } = action;
      if (!state.tabStops.has(id)) {
        console.warn(
          `Tab stop with id ${id} does not exist. Trying to focus tab stop.`
        );
        return state;
      }
      return {
        ...state,
        currentFocusedId: id,
      };
    }
    case "navigate": {
      const { direction, currentIdList } = action;
      const { currentFocusedId } = state;
      const currentIndex = currentIdList.indexOf(currentFocusedId);

      if (currentIndex === -1) {
        console.warn(
          `Current focused id ${currentFocusedId} is not in the list of ids. Trying to navigate ${direction}}`
        );
        return state;
      }

      const nextIndex = getNextIndex({
        currentIndex,
        direction,
        length: currentIdList.length,
      });
      const nextId = currentIdList[nextIndex];

      return {
        ...state,
        currentFocusedId: nextId,
      };
    }
    case "enableAutoFocus": {
      return {
        ...state,
        isAutoFocusEnabled: true,
      };
    }
  }
}

export function LayoutGrid<T>({
  items,
  rowLength,
  children,
}: LayoutGridProps<T>) {
  // this is the ordered list of ids. We use this to work out which item to navigate to
  const listOfIds = items.map((item) => item.id);

  const [state, dispatch] = useReducer(rovingTabFocusReducer, {
    currentFocusedId: items[0].id,
    tabStops: new Map(),
    isAutoFocusEnabled: false,
  });

  useEffect(
    function focusTabStop() {
      if (!state.isAutoFocusEnabled) return;

      const tabStop = state.tabStops.get(state.currentFocusedId);
      if (!tabStop) {
        console.warn(
          `Tab stop with id ${state.currentFocusedId} does not exist. Trying to focus tab stop.`
        );
        return;
      }

      tabStop.current?.focus();
    },
    [state.currentFocusedId, state.isAutoFocusEnabled, state.tabStops]
  );

  return (
    <ul
      data-rowLength={rowLength}
      onFocus={() => dispatch({ type: "enableAutoFocus" })}
    >
      {items.map((item) => (
        <li key={item.id}>{children(item)}</li>
      ))}
    </ul>
  );
}
