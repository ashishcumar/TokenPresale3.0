import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import nftfnLogo from "@/Assets/nftfnLogo.webp";
import Image from "next/image";

function Header() {
  return (
    <Flex
      sx={{
        padding: { xs: "16px 8px", md: "24px 16px" },
        justifyContent: "space-between",
        alignItems: "center",
        background: "lgSecondary",
        position: "fixed",
        top: 0,
        zIndex: 99,
        left: 0,
        right: 0,
      }}
    >
      <Box sx={{ height: { xs: "32px", md: "40px" } }}>
        <Image
          src={nftfnLogo}
          alt="logo"
          style={{ height: "100%", objectFit: "contain", width: "fit-content" }}
        />
      </Box>
      <Flex sx={{ gap: "12px" }}>
        <Button
          sx={{
            padding: { xs: "4px 12px", md: "12px 24px" },
            borderRadius: "24px",
            background: "secondary",
            color: "quaternary",
            "&:hover": {
              background: "secondary",
              color: "quaternary",
            },
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          Tools
        </Button>
        <Button
          sx={{
            padding: { xs: "8px 12px", md: "12px 24px" },
            borderRadius: "24px",
            background: "quaternary",
            color: "secondary",
            "&:hover": {
              background: "quaternary",
              color: "secondary",
            },
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          Connect Wallet
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;
