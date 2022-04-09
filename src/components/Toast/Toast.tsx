import { FC, useCallback, useEffect, useState } from "react";
import { Emoji, Toast as ToastType, ToastProps } from "../../misc/interfaces";
import "./toast.scss";
import { debounce } from "lodash";
import { useToast } from "../../misc/hooks/useToast";
import { ToastActionTypes } from "misc/context/toast-context/types";

export const Toast: FC<ToastProps> = ({}) => {
  const { toastState, toastDispatch } = useToast();

  useEffect(() => {
    const currentToast = toastState.currentToast;
    if (currentToast) {
      if (currentToast.show) {
        const unShowFunc = debounce((toast: ToastType) => {
          toastDispatch({
            type: ToastActionTypes.UnShowToast,
            payload: null,
          });
        }, 2000);
        unShowFunc(currentToast);
      } else {
        const showFunc = debounce((toast: ToastType) => {
          toastDispatch({
            type: ToastActionTypes.ShowToast,
            payload: null,
          });
        }, 1000);
        showFunc(currentToast);
      }
    }
  }, [toastState.currentToast]);

  const renderToasts = () => {
    const currentToast = toastState.currentToast;

    return (
      <div className="toast">
        <div className="toast__icon">{currentToast?.emoji.icon}</div>
        {currentToast?.message}
      </div>
    );
  };

  return (
    <div
      className={`toast-container  ${toastState.currentToast?.show && "show"}`}
    >
      {renderToasts()}
    </div>
  );
};
