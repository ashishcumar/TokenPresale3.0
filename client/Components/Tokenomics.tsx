import { Grid, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TokenomicsChart from "./TokenomicsChart";
import { useInView } from "react-intersection-observer";
import { normalTokenCount } from "@/CustomHooks/utils";
import { tokenomicsChartData } from "@/helpers/JsonMapping";
function Tokenomics() {
  const { ref, inView } = useInView();
  const [totalSupply, setTotalSupply] = useState<number>(0);
  useEffect(() => {
    if (inView && localStorage.getItem("tokenCount")) {
      setTotalSupply(Number(localStorage.getItem("tokenCount")));
    }
  }, [inView]);
  return (
    <Grid
      sx={{
        background: "black",
      }}
      ref={ref}
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
            margin: "24px 0 0 0",
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
          Total Supply = {totalSupply.toLocaleString("en-IN")}
        </Text>
      </Grid>

      <Grid
        sx={{
          height: "500px",
          width: "100vw",
          position: "relative",
          background: "transparent",
          display: { xs: "none", sm: inView ? "block" : "none" },
        }}
      >
        <TokenomicsChart />
      </Grid>
      <Grid
        sx={{
          height: "300px",
          display: { xs: "block", sm: "none" },
          padding: "0px 24px",
          background: "transparent",
          margin: "auto",
        }}
      >
        {tokenomicsChartData.map((stat) => {
          return (
            <Text
              key={stat.name}
              sx={{
                background: "transparent",
                color: stat.color,
 
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "16px" }}>{stat.name}</span>:
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  margin:"0 4px"
                }}
              >
                {stat.value}%
              </span>
            </Text>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Tokenomics;
