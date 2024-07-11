import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import { theme } from "@/helpers/theme";

const customTheme = extendTheme(theme);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<h1> error </h1>}>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ErrorBoundary>
  );
}

// MyToken deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Presale deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512