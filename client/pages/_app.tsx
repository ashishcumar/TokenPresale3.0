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

// Sepolia Testnet
// Deploying contracts with the account: 0x1Ff2c76CE043017dF907BdE2df739118FBC6c531
// MyToken deployed to: 0x9D7b6418BcE4d94e075cA038147209b17872Ce56
// Presale deployed to: 0x45C991059aB89eEdF59074612CD2C0b1f6cd1857
