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

// localhost deploy 
// MyToken deployed to: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
// Presale deployed to: 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707

// MyToken deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Presale deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

// Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// MyToken deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Presale deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
