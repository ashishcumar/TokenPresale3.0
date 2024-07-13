import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";

function CountDownTimer({ presaleEndTime }: { presaleEndTime: number }) {
  const { seconds, minutes, hours, days, start, isRunning } = useTimer({
    expiryTimestamp: new Date(
      new Date().setSeconds(new Date().getSeconds() + presaleEndTime)
    ),
    // onExpire: () => console.warn("onExpire called"),
    autoStart: true,
  });

  if (!isRunning) {
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
        {`${days <= 9 ? "0" : ""}${days}D `}:{" "}
        {` ${hours <= 9 ? "0" : ""}${hours}H `}:
        {` ${minutes <= 9 ? "0" : ""}${minutes}M `}:
        {` ${seconds <= 9 ? "0" : ""}${seconds}S `}
      </Text>
    </Flex>
  );
}

export default CountDownTimer;
