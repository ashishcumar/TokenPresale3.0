import { Flex, Text } from "@chakra-ui/react";
import React from "react";

function countDownrenderer({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) {
  if (completed) {
    return (
      <Flex sx={{ gap: "12px", flexWrap: "wrap", background: "transparent" }}>
        <Text
          sx={{
            fontSize: { xs: "24px", md: "48px" },
            color: "secondary",
            background: "transparent",
            lineHeight: "1",
          }}
        >
          Presale Ended.
        </Text>
      </Flex>
    );
  }
  return (
    <Flex sx={{ gap: "12px", flexWrap: "wrap", background: "transparent" }}>
      <Text
        sx={{
          fontSize: { xs: "24px", md: "48px" },
          color: "secondary",
          background: "transparent",
          lineHeight: "1",
        }}
      >
        Presale Ends in
      </Text>
      <Text
        sx={{
          fontSize: { xs: "24px", md: "48px" },
          color: "secondary",
          fontWeight: "bold",
          background: "transparent",
          lineHeight: "1",
        }}
      >
        {`${days}D `}: {` ${hours}H `}:{` ${minutes}M `}:{` ${seconds}S `}
      </Text>
    </Flex>
  );
}

export default countDownrenderer;
