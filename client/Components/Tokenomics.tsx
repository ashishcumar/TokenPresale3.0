import { Grid, Text } from "@chakra-ui/react";
import React from "react";
import TokenomicsChart from "./TokenomicsChart";

function Tokenomics() {
  return (
    <Grid
      sx={{
        background: "transparent",
        zIndex: 1,
      }}
    >
      <Grid
        sx={{
          padding: { xs: "24px", md: "48px" },
          textAlign: "center",
          background: "transparent",
        }}
      >
        <Text
          sx={{
            fontSize: { xs: "32px", md: "58px" },
            fontWeight: "bold",
            color: "secondary",
            margin: "24px 0",
            background: "transparent",
          }}
        >
          Tokenomics
        </Text>
        <Text
          sx={{
            fontSize: { xs: "14px", md: "18px" },
            fontWeight: "bold",
            color: "tertiary",
            background: "transparent",
          }}
        >
          Total Supply = 1,000,000,000 $NFTFN
        </Text>
      </Grid>

      <Grid
        sx={{
          height: "500px",
          width: "100vw",
          position: "relative",
          background: "transparent",
          display: { xs: "none", sm: "block" },
        }}
      >
        <TokenomicsChart />
      </Grid>
      <Grid
        sx={{
          height: "300px",
          border: "2px solid white",
          display: { xs: "block", sm: "none" },
        }}
      >
        {
          
        }

      </Grid>
    </Grid>
  );
}

export default Tokenomics;
