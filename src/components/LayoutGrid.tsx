import {
  ReactNode,
  RefObject,
  useEffect,
  useReducer,
  KeyboardEvent,
  createContext,
  useContext,
  useRef,
} from "react";
import { getNextIndex } from "../utils";

export type Id = string | number;

export type CollectionItem<T> = T & {
  /**
   * A unique identifier for this item
   */
  id: Id;
};

type RovingTabFocusContext = {
  state: RovingTabFocusState;
  dispatch: (action: RovingTabFocusAction) => void;
};
const RovingTabFocusContext = createContext<RovingTabFocusContext | null>(null);

function useRovingTabFocusContext() {
  const context = useContext(RovingTabFocusContext);
  if (!context) {
    throw new Error(
      "RovingTabFocus components must be used inside a RovingTabFocusProvider"
    );
  }
  return context;
}

export type LayoutGridProps<T> = {
  items: CollectionItem<T>[];
  /**
   * The number of items to display per row
   */
  rowLength: number;
  children: (item: CollectionItem<T>) => ReactNode;
  className?: string;
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

function getKeyDirection(key: string) {
  switch (key) {
    case "ArrowLeft":
      return "left";
    case "ArrowRight":
      return "right";
    default:
      return null;
  }
}

export function LayoutGrid<T>({
  items,
  rowLength,
  children,
  className,
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

  function handleKeyDown(event: KeyboardEvent) {
    const direction = getKeyDirection(event.key);
    // if the key pressed is not an arrow key, do nothing
    if (!direction) return;

    dispatch({ type: "navigate", direction, currentIdList: listOfIds });
  }

  return (
    <ul
      // TODO: maybe replace with a CSS var
      data-size={rowLength}
      onFocus={() => dispatch({ type: "enableAutoFocus" })}
      onKeyDown={handleKeyDown}
      className={className}
    >
      <RovingTabFocusContext.Provider value={{ state, dispatch }}>
        {items.map((item) => (
          <li key={item.id}>{children(item)}</li>
        ))}
      </RovingTabFocusContext.Provider>
    </ul>
  );
}

export function useRovingTabItem({ id }: { id: Id }) {
  const { state, dispatch } = useRovingTabFocusContext();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(
    function registerTabStop() {
      dispatch({ type: "registerTabStop", id, ref });
      return () => {
        dispatch({ type: "unRegisterTabStop", id });
      };
    },
    [dispatch, id]
  );

  const isCurrentTabStop = state.currentFocusedId === id;

  const props = {
    tabIndex: isCurrentTabStop ? 0 : -1,
    onFocus: () => dispatch({ type: "focus", id }),
  };

  return { ref, props };
}
