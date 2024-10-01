"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, persistor, store } from "./Store";
import { PersistGate } from "redux-persist/integration/react";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
