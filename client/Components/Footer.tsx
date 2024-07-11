import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";
import nftfnLogo from "@/Assets/nftfnLogo.webp";
import Image from "next/image";

function Footer() {
  return (
    <Grid
      sx={{
        padding: { xs: "24px", md: "48px" },
        textAlign: "center",
        zIndex: 1,
        background: "lgSecondary",
        borderTop: "2px solid",
        borderRadius: "48px",
      }}
    >
      <Box
        sx={{ margin: "12px auto", height: "120px", background: "transparent" }}
      >
        <Image
          src={nftfnLogo}
          alt="nftfnLogo"
          style={{
            height: "100%",
            objectFit: "contain",
            background: "transparent",
          }}
        />
      </Box>
      <Text
        sx={{
          fontSize: { xs: "14px", md: "18px" },
          color: "tertiary",
          background: "transparent",
        }}
      >
        2024 NFTFN | All Rights Reserved | Created By Ashish
      </Text>
      <Text
        sx={{
          fontSize: "12px",
          color: "tertiary",
          background: "transparent",
          width: { xs: "90%", md: "80%" },
          margin: "24px auto 0 auto",
        }}
      >
        Disclaimer: Cryptocurrency may be unregulated in your jurisdiction. The
        value of cryptocurrencies may fluctuate. Profits may be subject to
        capital gains or other taxes applicable in your jurisdiction. These NFTs
        are the property of it’s respective owners.Cryptocurrency investments
        carry a high risk of volatility. Be aware of the tax implications, as
        profits may be subject to capital gains or other taxes in your
        jurisdiction. Cryptocurrency regulations can vary, so ensure you
        understand the rules in your area. Conduct thorough research and invest
        only what you can afford to lose.
      </Text>
    </Grid>
  );
}

export default Footer;
