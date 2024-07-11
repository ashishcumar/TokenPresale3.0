import { Box, Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import sliderImg1 from "@/Assets/sliderImg1.png";
import sliderImg2 from "@/Assets/sliderImg2.png";
import sliderImg3 from "@/Assets/sliderImg3.png";
import Image from "next/image";
import { tradeTheFuture } from "@/helpers/JsonMapping";

function TradeTheFuture() {
  const imgArr = [sliderImg1, sliderImg2, sliderImg3];
  const [siderImg, setSideImg] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setSideImg((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid
      sx={{
        padding: { xs: "24px", md: "48px" },
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1.5fr 1fr" },
        background: "transparent",
      }}
    >
      <Grid
        sx={{
          padding: { xs: "", md: "24px" },
          alignItems: "center",
          transition: "0.5s ease-in-out",
          background: "transparent",
        }}
      >
        <Image
          src={imgArr[siderImg]}
          alt="siderImg"
          style={{
            height: "90%",
            objectFit: "contain",
            animation: "moveUpDown 3s ease-in-out infinite",
          }}
        />
      </Grid>
      <Box sx={{ padding: "24px", background: "transparent", zIndex: 1 }}>
        <Text
          sx={{
            fontSize: { xs: "32px", md: "48px" },
            fontWeight: "bold",
            color: "secondary",
          }}
        >
          Trade The Future,
        </Text>
        <Text
          sx={{
            fontSize: { xs: "32px", md: "48px" },
            fontWeight: "bold",
            color: "secondary",
          }}
        >
          Now With NFTFN
        </Text>
        <Box>
          {tradeTheFuture.map((item) => {
            return (
              <Box
                sx={{
                  borderLeft: "2px dotted #47a1ff",
                  padding: "0 12px 12px 48px",
                  position: "relative",
                  background: "transparent",
                }}
                key={item.title}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "-10px",
                    left: "-20px",
                    height: "40px",
                    width: "40px",
                    background: "lgPrimary",
                    borderRadius: "50%",
                  }}
                ></Box>
                <Box
                  sx={{
                    color: item.sideImg == siderImg ? "secondary" : "tertiary",
                    "&:hover": {
                      color: "secondary",
                    },
                  }}
                  onMouseOver={() => setSideImg(item.sideImg)}
                >
                  <Text
                    sx={{
                      fontSize: { xs: "24px", md: "28px" },
                      fontWeight: "bold",
                      margin: "24px 0 12px 0",
                      background: "transparent",
                      lineHeight: 1,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    sx={{
                      fontSize: { xs: "14px", md: "16px" },
                      background: "transparent",
                    }}
                  >
                    {item.text}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Grid>
  );
}

export default TradeTheFuture;
