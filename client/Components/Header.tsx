import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import nftfnLogo from "@/Assets/nftfnLogo.webp";
import Image from "next/image";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const [isOwner, setIsowner] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isOwner") === "true") {
      setIsowner("true");
    } else {
      setIsowner("");
    }
  }, []);

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
      <Box
        sx={{ height: { xs: "32px", md: "40px" }, cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        <Image
          src={nftfnLogo}
          alt="logo"
          style={{ height: "100%", objectFit: "contain", width: "fit-content" }}
        />
      </Box>
      {isOwner.length ? (
        <Flex sx={{ gap: "12px" }}>
          <Button
            sx={{
              padding: { xs: "4px 12px", md: "12px 24px" },
              borderRadius: "24px",
              color: "secondary",
              background: "quaternary",
              "&:hover": {
                color: "secondary",
                background: "quaternary",
              },
              fontSize: { xs: "14px", md: "16px" },
            }}
            onClick={() => router.push("/tools")}
          >
            Tools
          </Button>
        </Flex>
      ) : null}
    </Flex>
  );
}

export default Header;
