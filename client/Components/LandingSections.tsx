import React, { useEffect, useState } from "react";
import landingSectionBg from "@/Assets/landingSectionBg.png";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { ethers } from "ethers";
import tokenJson from "@/artifacts/contracts/AKToken.sol/AKToken.json";
import presaleJson from "@/artifacts/contracts/Presale.sol/Presale.json";
import useShowToast from "@/CustomHooks/useShowToast";

declare global {
  interface Window {
    ethereum: any;
  }
}
function LandingSections() {
  const { showToast, closeAllToasts } = useShowToast();
  const tokenAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const presaleAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(
    null
  );
  const [presaleToken, setPresaleToken] = useState<number>(0);
  const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("");
  const [currentAccTokenBalance, setCurrentAccTokenBalance] =
    useState<number>(0.0);
  const [presaleContract, setPresaleContract] =
    useState<ethers.Contract | null>(null);

  const connectWallet = async (_provider: ethers.BrowserProvider) => {
    if (!window.ethereum) return;
    if (!_provider) return;
    await _provider.send("eth_requestAccounts", []);
    window?.ethereum?.on("chainChanged", () => {
      window.location.reload();
    });
    window?.ethereum?.on("accountsChanged", () => {
      window.location.reload();
    });
    const signer = await _provider.getSigner();
    const address = await signer.getAddress();
    const tokenContrct = new ethers.Contract(
      tokenAddress,
      tokenJson.abi,
      signer
    );
    const presaleContrct = new ethers.Contract(
      presaleAddress,
      presaleJson.abi,
      signer
    );

    setTokenContract(tokenContrct);
    setCurrentWalletAddress(address);
    setPresaleContract(presaleContrct);
  };

  const getTokenBalance = async () => {
    if (!tokenContract) {
      return showToast({
        title: "Error",
        description: "Please connect your wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    try {
      const balance = await tokenContract.balanceOf(currentWalletAddress);
      setCurrentAccTokenBalance(balance);
    } catch (e) {
      console.log("getTokenBalance 1", e);
    }

    try {
      const balance = await presaleContract?.started();
      console.log("presale balance -->", balance);
      setCurrentAccTokenBalance(balance);
    } catch (e) {
      console.log("getTokenBalance 2", e);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      if (provider) {
        connectWallet(provider);
      }
    }

    if (localStorage.getItem("isLoading") === "true") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tokenContract) {
      console.log("herhe ,", tokenContract);
      getTokenBalance();
    }
  }, [tokenContract]);

  return (
    <Grid
      sx={{
        minHeight: "90vh",
        width: "100vw",
        marginTop: "90px",
        gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "3fr 2.5fr" },
      }}
    >
      <Grid
        sx={{
          position: "relative",
          alignItems: "center",
          padding: "24px",
          minHeight: { xs: "400px", md: "700px" },
        }}
      >
        <Image
          src={landingSectionBg}
          alt="landingSectionBg"
          style={{
            height: "100%",
            objectFit: "contain",
            position: "absolute",
            inset: 0,
            zIndex: 0,
            imageOrientation: "from-image",
          }}
        />
        <Box
          sx={{
            zIndex: 1,
            background: "transparent",
          }}
        >
          <Text
            color={"secondary"}
            background={"transparent"}
            fontSize={{ xs: "60px", md: "120px" }}
            fontWeight={"bold"}
            lineHeight={1}
          >
            Trade
          </Text>
          <Text
            color={"secondary"}
            background={"transparent"}
            fontSize={{ xs: "60px", md: "120px" }}
            fontWeight={"bold"}
            lineHeight={1}
          >
            Everything
          </Text>
          <Text
            color={"secondary"}
            background={"transparent"}
            fontSize={{ xs: "60px", md: "120px" }}
            fontWeight={"bold"}
            lineHeight={1}
          >
            Preps
          </Text>
        </Box>
        <Text
          color={"secondary"}
          background={"transparent"}
          fontSize={{ xs: "16px", md: "22px" }}
          fontWeight={"bold"}
          zIndex={1}
        >
          Empowering Traders to Long and Short on the NFT Market for Just $10
        </Text>
      </Grid>
      <Grid
        sx={{
          height: "100%",
          width: "100%",
          padding: "24px",
          // background: "transparent",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            border: "2px solid #ffffff60",
            minHeight: { xs: "fit-content", md: "500px" },
            background: "septenary",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <Flex
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              background: "transparent",
              flexWrap: "wrap",
            }}
          >
            <Text
              sx={{
                fontSize: { xs: "36px", md: "48px" },
                fontWeight: "bold",
                color: "secondary",
                background: "transparent",
              }}
            >
              NFTFN Presale
            </Text>
            <Text
              sx={{
                fontSize: { xs: "18px", md: "32px" },
                fontWeight: "bold",
                color: "tertiary",
                background: "transparent",
              }}
            >
              Stage 2/6
            </Text>
          </Flex>

          <Box
            sx={{
              background: "black",
              padding: { xs: "12px", md: "24px 24px 0 24px" },
              borderRadius: "16px",
              margin: "24px 0",
            }}
          >
            <Flex sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
              <Flex sx={{ alignItems: "center", gap: "8px" }}>
                <Text
                  sx={{
                    fontSize: { xs: "18px", md: "20px" },
                    fontWeight: "bold",
                    color: "tertiary",
                  }}
                >
                  Total Raised =
                </Text>
                <Text
                  sx={{
                    fontSize: { xs: "18px", md: "24px" },
                    fontWeight: "bold",
                    color: "secondary",
                  }}
                >
                  10000 ETH
                </Text>
              </Flex>
              <Flex sx={{ alignItems: "center", gap: "8px" }}>
                <Text
                  sx={{
                    fontSize: { xs: "18px", md: "20px" },
                    fontWeight: "bold",
                    color: "tertiary",
                  }}
                >
                  1 NFTFN =
                </Text>
                <Text
                  sx={{
                    fontSize: { xs: "18px", md: "24px" },
                    fontWeight: "bold",
                    color: "secondary",
                  }}
                >
                  0.0001 ETH
                </Text>
              </Flex>
            </Flex>
            <Box
              sx={{
                margin: "12px 0",
                padding: { xs: "0", md: "12px" },
              }}
            >
              <Flex justify={"space-between"} flexWrap={"wrap"}>
                <Flex gap={"8px"}>
                  <Text
                    sx={{
                      fontSize: { xs: "14px", md: "16px" },
                      fontWeight: "bold",
                      color: "tertiary",
                    }}
                  >
                    Current Target NFTFN =
                  </Text>
                  <Text
                    sx={{
                      fontSize: { xs: "14px", md: "16px" },
                      fontWeight: "bold",
                      color: "secondary",
                    }}
                  >
                    1000000
                  </Text>
                </Flex>
                <Flex gap={"8px"}>
                  <Text
                    sx={{
                      fontSize: { xs: "14px", md: "16px" },
                      fontWeight: "bold",
                      color: "tertiary",
                    }}
                  >
                    Next Stage Price =
                  </Text>
                  <Text
                    sx={{
                      fontSize: { xs: "14px", md: "16px" },
                      fontWeight: "bold",
                      color: "secondary",
                    }}
                  >
                    0.001 ETH
                  </Text>
                </Flex>
              </Flex>
              <Box
                sx={{
                  width: "100%",
                  margin: { xs: "12px 0", md: "20px 0 8px 0 " },
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  background: "septenary",
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    height: "36px",
                    background: "lgPrimary",
                    borderRadius: "16px",
                    transition: "width 1s ease",
                  }}
                ></Box>
                <Text
                  sx={{
                    position: "absolute",
                    inset: 0,
                    color: "secondary",
                    background: "transparent",
                    fontWeight: "semibold",
                    fontSize: "14px",
                    height: "fit-content",
                    width: "fit-content",
                    margin: "auto",
                  }}
                >
                  Token Sold :- 50,000
                </Text>
              </Box>
            </Box>
          </Box>
          <Text
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              textAlign: "center",
              background: "transparent",
              color: "secondary",
              fontWeight: "semibold",
            }}
          >
            Your NFTFN Balance : {currentAccTokenBalance}
          </Text>
          <Box
            sx={{
              background: "transparent",
              marginTop: "24px",
            }}
          >
            <Text
              sx={{
                color: "secondary",
                background: "transparent",
                margin: "8px 0",
              }}
            >
              You are investing ETH :
            </Text>
            <InputGroup
              sx={{
                margin: "4px 0 12px 0",

                background: "transparent",
              }}
            >
              <Input
                placeholder="0.00"
                sx={{
                  color: "tertiary",
                  background: "transparent",
                  borderTop: "1px solid #ffffff60",
                  borderBottom: "1px solid #ffffff60",
                  borderLeft: "1px solid #ffffff60",
                  borderRight: "1px solid transparent",
                  "&:placeholder": {
                    color: "tertiary",
                  },
                }}
              />
              <InputRightAddon
                sx={{
                  background: "transparent",
                  color: "tertiary",
                  borderTop: "1px solid #ffffff60",
                  borderRight: "1px solid #ffffff60",
                  borderBottom: "1px solid #ffffff60",
                  borderLeft: "1px solid transparent",
                }}
              >
                Balance :- --------- ETH
              </InputRightAddon>
            </InputGroup>
            <Text
              sx={{
                color: "secondary",
                background: "transparent",
                margin: "8px 0",
              }}
            >
              You will receive :
            </Text>

            <Input
              placeholder="0.00"
              sx={{
                color: "tertiary",
                border: "1px solid #ffffff60",
                "&:placeholder": {
                  color: "tertiary",
                },
              }}
              isDisabled={true}
            />

            <Button
              sx={{
                background: "lgPrimary",
                color: "secondary",
                display: "block",
                margin: "36px auto auto auto",
                padding: "12px 48px",
                "&:hover": {
                  background: "lgPrimary",
                },
              }}
            >
              Buy Token
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LandingSections;
