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
  Modal,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { ethers } from "ethers";
import tokenJson from "@/artifacts/contracts/AKToken.sol/AKToken.json";
import presaleJson from "@/artifacts/contracts/Presale.sol/Presale.json";
import useShowToast from "@/CustomHooks/useShowToast";
import { normalTokenCount } from "@/CustomHooks/utils";
import Loader from "./Loader";
import { presaleAddress, tokenAddress } from "@/helpers/JsonMapping";
import ethIcon from "@/Assets/eth.svg";
import CountDownrenderer from "./CountDownrenderer";
declare global {
  interface Window {
    ethereum: any;
  }
}
function LandingSections() {
  const { showToast, closeAllToasts } = useShowToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(
    null
  );
  const [amountInvest, setAmountInvest] = useState<string>("");
  const [tokenRecieve, setTokenRecieve] = useState<string>("");
  const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("");
  const [currentAccEthBalance, setCurrentAccEthBalance] = useState<number>(0.0);
  const [presaleContract, setPresaleContract] =
    useState<ethers.Contract | null>(null);

  const [presaleContractDetails, setPresaleContractDetails] = useState({
    presaleContractBalance: 0,
    presaleEndTime: 0,
    totalTokenSold: 0,
    tokenRate: 0,
  });

  const [tokenContractDetails, setTokenContractDetails] = useState({
    presaleTotalTokens: 0,
    currentAccTokenBalance: 0,
  });

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
    const balance = await _provider.getBalance(address);
    const owner = await tokenContrct.owner();
    console.log({ owner, address });
    if (owner === address) {
      localStorage.setItem("isOwner", "true");
    } else {
      localStorage.setItem("isOwner", "false");
    }
    setCurrentAccEthBalance(Number(balance) / 1000000000000000000);
    setTokenContract(tokenContrct);
    setCurrentWalletAddress(address);
    setPresaleContract(presaleContrct);
  };

  const throughErr = (msg: string) => {
    return showToast({
      title: "Error",
      description: msg,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const tokens = (n: string) => {
    return ethers.parseUnits(n.toString(), "ether");
  };

  const getTokenContractDetails = async () => {
    try {
      if (!tokenContract) {
        return throughErr("Please connect wallet first");
      }

      const totalTokensCountPromise = tokenContract
        .totalSupply()
        .then(Number)
        .then(normalTokenCount);
      const tokenInCurrentAccPromise = tokenContract
        .balanceOf(currentWalletAddress)
        .then(Number)
        .then(normalTokenCount);
      const [totalTokensCount, tokenInCurrentAcc] = await Promise.all([
        totalTokensCountPromise,
        tokenInCurrentAccPromise,
      ]);
      localStorage.setItem("tokenCount", totalTokensCount.toString());
      setTokenContractDetails({
        presaleTotalTokens: totalTokensCount,
        currentAccTokenBalance: tokenInCurrentAcc,
      });
    } catch (e) {
      return throughErr("Failed to fetch token contract details");
    }
  };

  const getPresaleContractDetails = async () => {
    try {
      if (!presaleContract) {
        return throughErr("Please connect wallet first");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const balancePromise = provider.getBalance(presaleAddress).then(Number);
      const endTimePromise = presaleContract.end().then(Number);
      const tokenSoldPromise = presaleContract
        .tokenSold()
        .then(normalTokenCount);
      const ratePromise = presaleContract.rate().then(Number);
      const [balance, endTime, tokenSold, rate] = await Promise.all([
        balancePromise,
        endTimePromise,
        tokenSoldPromise,
        ratePromise,
      ]);

      setPresaleContractDetails({
        presaleContractBalance: balance,
        presaleEndTime: endTime / 1000,
        totalTokenSold: tokenSold,
        tokenRate: rate,
      });
    } catch (error) {
      return throughErr("Failed to fetch presale contract details");
    }
  };

  const calculateTokenRecieve = (val: string) => {
    if (Number(val) > currentAccEthBalance) {
      closeAllToasts();
      return throughErr("Insufficient Balance");
    }

    setAmountInvest(val);
    const tRecieve = Number(val) * 1000;
    setTokenRecieve(tRecieve.toLocaleString("en-IN"));
  };

  const buyToken = async () => {
    if (amountInvest.length === 0) {
      closeAllToasts();
      return throughErr("Please Valid Amount");
    }
    if (!presaleContract) {
      return throughErr("Please connect your wallet");
    }
    try {
      await presaleContract.buyTokens({ value: tokens(amountInvest) });
      setIsLoading(true);
      setAmountInvest("");
      setTokenRecieve("");
      localStorage.setItem("isLoading", "true");
    } catch (e) {
      console.log("buyToken error", e);
    }
  };
  const listenToEventTokenPurchase = async () => {
    try {
      if (!presaleContract) {
        return throughErr("Please connect your wallet");
      }

      presaleContract.on("TokensPurchased", () => {
        setIsLoading(false);
        localStorage.setItem("isLoading", "false");
        showToast({
          title: "Success!",
          description: "Tokens Purchase Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        getPresaleContractDetails();
        getTokenContractDetails();
      });
    } catch (error) {
      console.error("Error subscribing to event:", error);
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
    if (tokenContract && presaleContract) {
      getTokenContractDetails();
      getPresaleContractDetails();
    }
  }, [tokenContract, presaleContract]);

  useEffect(() => {
    if (presaleContract) {
      listenToEventTokenPurchase();
    }

    return () => {
      if (presaleContract) {
        presaleContract.removeAllListeners("TokensPurchased");
      }
    };
  }, [presaleContract]);

  return (
    <>
      <Modal isOpen={isLoading} onClose={() => {}} isCentered>
        <Loader />
      </Modal>
      <Grid
        sx={{
          minHeight: "90vh",
          width: "100vw",
          marginTop: { xs: "60px", md: "84px" },
          gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "3fr 2.5fr" },
          background: "black",
          zIndex: 1,
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

          <Box
            sx={{
              zIndex: 1,
              background: "transparent",
            }}
          >
            {presaleContractDetails.presaleEndTime ? (
              <CountDownrenderer
                presaleEndTime={presaleContractDetails.presaleEndTime}
              />
            ) : null}
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
                flexWrap: "wrap",
              }}
            >
              <Text
                sx={{
                  fontSize: { xs: "36px", md: "48px" },
                  fontWeight: "bold",
                  color: "secondary",
                }}
              >
                NFTFN Presale
              </Text>
              <Text
                sx={{
                  fontSize: { xs: "18px", md: "32px" },
                  fontWeight: "bold",
                  color: "tertiary",
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
                    {`${(
                      (presaleContractDetails.totalTokenSold + 50000) /
                      1000
                    ).toLocaleString("en-IN")} `}
                    ETH
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
                    {Number(presaleContractDetails.tokenRate) / 10000000} ETH
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
                      {tokenContractDetails.presaleTotalTokens.toLocaleString(
                        "en-IN"
                      )}
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
                      width: `${
                        (presaleContractDetails.totalTokenSold /
                          tokenContractDetails.presaleTotalTokens) *
                          100 +
                        20
                      }%`,
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
                    Token Sold :-
                    {(
                      presaleContractDetails.totalTokenSold + 50000
                    ).toLocaleString("en-IN")}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Text
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                textAlign: "center",

                color: "secondary",
                fontWeight: "semibold",
              }}
            >
              Your NFTFN Balance : {tokenContractDetails.currentAccTokenBalance}
            </Text>
            <Box
              sx={{
                marginTop: "24px",
                zIndex: 2,
              }}
            >
              <Text
                sx={{
                  color: "secondary",
                  zIndex: 2,
                  margin: "8px 0",
                }}
              >
                You are investing ETH :
              </Text>
              <InputGroup
                sx={{
                  margin: "4px 0 12px 0",
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
                    borderRight: {
                      xs: "1px solid #ffffff60",
                      sm: "1px solid transparent",
                    },
                    "&:placeholder": {
                      color: "tertiary",
                    },
                    borderRadius: { xs: "4px", sm: "" },
                  }}
                  type="number"
                  value={amountInvest}
                  onChange={(e) => calculateTokenRecieve(e.target.value)}
                />
                <InputRightAddon
                  sx={{
                    background: "transparent",
                    color: "tertiary",
                    borderTop: "1px solid #ffffff60",
                    borderRight: "1px solid #ffffff60",
                    borderBottom: "1px solid #ffffff60",
                    borderLeft: "1px solid transparent",
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  Balance :-
                  {Number(currentAccEthBalance).toLocaleString("en-IN")}
                  <Image
                    src={ethIcon}
                    alt="eth"
                    style={{
                      height: "16px",
                      objectFit: "contain",
                      margin: "0 4px",
                    }}
                  />
                  ETH
                </InputRightAddon>
              </InputGroup>
              <Text
                sx={{
                  color: "secondary",

                  margin: "8px 0",
                }}
              >
                You will receive :
              </Text>

              <Input
                placeholder="0.00"
                sx={{
                  color: "secondary",
                  border: "1px solid #ffffff60",
                  "&:placeholder": {
                    color: "secondary",
                  },
                }}
                value={tokenRecieve}
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
                onClick={buyToken}
              >
                Buy Token
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default LandingSections;
