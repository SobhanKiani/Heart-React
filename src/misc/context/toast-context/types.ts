import { cloneDeep, debounce } from "lodash";
import { Toast } from "misc/interfaces";

export const toastInitialState: {
  toasts: Toast[];
  currentToast: Toast | undefined;
} = {
  toasts: [],
  currentToast: undefined,
};

export enum ToastActionTypes {
  AddToast = "AddToast",
  RemoveToast = "RemoveToast",
  ShowToast = "ShowToast", // gets the first index of toasts , set show true
  UnShowToast = "UnShowToast", // set show false,
}

export interface IAddToast {
  type: ToastActionTypes.AddToast;
  payload: Toast;
}

export interface IRemoveToast {
  type: ToastActionTypes.RemoveToast;
  payload: string;
}

export interface IShowToast {
  type: ToastActionTypes.ShowToast;
  payload: null;
}
export interface IUnShowToast {
  type: ToastActionTypes.UnShowToast;
  payload: null;
}

export type ToastAction = IAddToast | IRemoveToast | IShowToast | IUnShowToast;

// export interface ToastAction {
//   type: string;
//   payload: Toast | null;
// }

export const toastReducer = (
  state: { toasts: Toast[]; currentToast: Toast | undefined },
  action: ToastAction
) => {
  if (action.type === ToastActionTypes.AddToast) {
    const toastList = cloneDeep(state.toasts);
    const newToast = action.payload;
    // toastList.push(newToast);
    const newState = {
      ...state,
    };
    if (toastList.length === 0 && state.currentToast === undefined) {
      newToast.show = true;
      newState["currentToast"] = newToast;
    } else {
      toastList.push(newToast);
    }
    newState["toasts"] = toastList;
    return newState;
  }
  if (action.type === ToastActionTypes.RemoveToast) {
    const toastList = cloneDeep(state.toasts);
    const toastIndex = toastList.findIndex(
      (toast: Toast) => toast.id === action.payload
    );
    if (toastIndex > -1) {
      toastList.splice(toastIndex, 1);
    }
    return {
      ...state,
      toasts: toastList,
    };
  }

  if (action.type === ToastActionTypes.ShowToast) {
    const toastList = cloneDeep(state.toasts);
    const showingToast = toastList.shift();
    if (showingToast) {
      showingToast.show = true;
    }
    return {
      ...state,
      toasts: toastList,
      currentToast: showingToast,
    };
  }

  if (action.type === ToastActionTypes.UnShowToast) {
    const showingToast = cloneDeep(state.currentToast);
    if (showingToast) {
      showingToast.show = false;
    }
    return {
      ...state,
      currentToast: showingToast,
    };
  }
};
