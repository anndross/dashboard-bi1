"use client";
// import React, { Component, ErrorInfo, ReactNode } from "react";

// interface Props {
//   children?: ReactNode;
// }

// interface State {
//   hasError: boolean;
// }

// class ErrorBoundary extends Component<Props, State> {
//   public state: State = {
//     hasError: false,
//   };

//   public static getDerivedStateFromError(_: Error): State {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     console.error("Uncaught error:", error, errorInfo);
//   }

//   public render() {
//     if (this.state.hasError) {
//       return (
//         <p className="text-2xl text-zinc-700 font-semibold">
//           Oops.. Não obtive resultados
//         </p>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <p className="text-2xl text-zinc-700 font-semibold">
      Oops.. Não retornou resultados{" "}
    </p>
  );
}
