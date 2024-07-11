import { Box, Grid, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import "animate.css";
import Image from "next/image";
import { achivements } from "@/helpers/JsonMapping";

function OurAchievments() {
  const [animate, setAnimate] = useState<number | null>(null);

  return (
    <Grid
      sx={{
        padding: { xs: "24px", md: "48px" },
        textAlign: "center",
        background: "transparent",
        zIndex: 1,
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
        Our Achievements
      </Text>
      <Text
        sx={{
          fontSize: { xs: "14px", md: "18px" },
          fontWeight: "bold",
          color: "tertiary",
          margin: "0 0 24px 0",
          background: "transparent",
        }}
      >
        We are live on Testnet
      </Text>
      <Grid
        sx={{
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          marginTop: { xs: "24px", md: "48px" },
          background: "transparent",
        }}
      >
        {achivements.map((item, i) => {
          return (
            <Box
              key={item.title}
              sx={{
                padding: "12px",
                background: "transparent",
              }}
            >
              <Box
                sx={{
                  height: "100px",
                  width: "100px",
                  margin: "12px auto",
                  background: "lgPrimary",
                  borderRadius: "50%",
                }}
                className={
                  i === animate ? "animate__animated animate__flip" : ""
                }
                onMouseOver={() => setAnimate(i)}
                onMouseLeave={() => setAnimate(null)}
              >
                <Image
                  src={item.icon}
                  alt={item.text}
                  style={{
                    height: "100%",
                    objectFit: "contain",
                    background: "transparent",
                    margin: "auto",
                  }}
                />
              </Box>
              <Text
                sx={{
                  fontSize: { xs: "24px", md: "28px" },
                  fontWeight: "bold",
                  color: "secondary",
                  margin: "36px 0 24px 0",
                  lineHeight: 1,
                  background: "transparent",
                }}
              >
                {item.title}
              </Text>
              <Text
                sx={{
                  fontSize: { xs: "14px", md: "16px" },
                  color: "tertiary",
                  background: "transparent",
                }}
              >
                {item.text}
              </Text>
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default OurAchievments;
