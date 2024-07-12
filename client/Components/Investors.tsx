import { investors } from "@/helpers/JsonMapping";
import { Flex, Grid, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

function Investors() {
  return (
    <Grid
      sx={{
        padding: { xs: "24px", md: "48px" },
        textAlign: "center",
        background: "black",
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
        Investors
      </Text>
      <Flex
        sx={{
          marginTop: { xs: "24px", md: "48px" },
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        {investors.map((item) => {
          return (
            <Grid
              key={item.name}
              sx={{
                padding: "12px",
                height: "180px",
                width: { xs: "120px", md: "200px" },
                textAlign: "center",
                background: "transparent",
              }}
            >
              <Image
                src={item.icon}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  margin: "auto",
                  background: "transparent",
                }}
              />
              <Text
                sx={{
                  fontSize: { xs: "14px", md: "18px" },
                  margin: "18px 0",
                  color: "tertiary",
                  background: "transparent",
                }}
              >
                {item.name}
              </Text>
            </Grid>
          );
        })}
        <Grid
          sx={{
            padding: "12px",
            height: "180px",
            width: { xs: "120px", md: "200px" },
            textAlign: "center",
            placeContent: "center",
            background: "transparent",
          }}
        >
          <Text
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              color: "tertiary",
              background: "transparent",
            }}
          >
            & more ....
          </Text>
        </Grid>
      </Flex>
    </Grid>
  );
}

export default Investors;
