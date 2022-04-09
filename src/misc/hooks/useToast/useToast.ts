import { uniq, uniqueId } from "lodash";
import { useContext, useMemo } from "react";
import { ToastContext } from "misc/context/toast-context/toast-context";
import { ToastActionTypes } from "misc/context/toast-context/types";
import { Emoji, Toast } from "misc/interfaces";

export const useToast = () => {
  const { toastState, toastDispatch } = useContext(ToastContext);

  const createToast = (toast: Toast) => {
    toast.id = uniqueId();
    toast.show = false;
    toastDispatch({
      type: ToastActionTypes.AddToast,
      payload: toast,
    });
  };

  const removeToast = (id: string) => {
    toastDispatch({
      type: ToastActionTypes.RemoveToast,
      payload: id,
    });
  };

  return {
    toastDispatch,
    toastState: useMemo(() => toastState, [toastState]),
    // toastState:toastState,
    createToast,
    removeToast,
  };
};
