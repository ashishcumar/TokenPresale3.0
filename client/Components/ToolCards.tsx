import { Box, Button, Flex, Grid, Input, Modal, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { ethers } from "ethers";
import tokenJson from "@/artifacts/contracts/AKToken.sol/AKToken.json";
import presaleJson from "@/artifacts/contracts/Presale.sol/Presale.json";
import useShowToast from "@/CustomHooks/useShowToast";
import { normalTokenCount, weiToEth } from "@/CustomHooks/utils";
import { presaleAddress, tokenAddress } from "@/helpers/JsonMapping";
import { Router, useRouter } from "next/router";

function ToolCards() {
  const { showToast } = useShowToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loaderMsg, setLoaderMsg] = useState<string>("");
  const [newTokenRate, setNewTokenRate] = useState<string>("");
  const [tokensToMint, setTokensToMint] = useState<string>("");
  const [tokensToBurn, setTokensToBurn] = useState<string>("");
  const [tokensToTransfer, setTokensToTransfer] = useState<string>("");
  const [tokensTransferAddress, setTokensTransferAddress] =
    useState<string>("");
  const [tokensBurnAddress, setTokensBurnAddress] = useState<string>("");
  const [tokenContractTokenBln, setTokenContractTokenBln] = useState<number>(0);
  const [tokenContract, setTokenContract] = useState<ethers.Contract | null>();
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [cardsDetail, setCardsDetails] = useState({
    tokenRate: 0,
    contractBalance: 0,
    currentTokenBalance: 0,
  });
  const router = useRouter();
  const [presaleContract, setPresaleContract] =
    useState<ethers.Contract | null>();

  const connectWallet = async (_provider: ethers.BrowserProvider) => {
    if (!window.ethereum) return;
    if (!_provider) {
      return throughErr("Metamask is not installed");
    }
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
    const owner = await tokenContrct.owner();
    if (owner === address) {
      localStorage.setItem("isOwner", "true");
    } else {
      localStorage.setItem("isOwner", "false");
    }
    setTokenContract(tokenContrct);
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

  const getData = async () => {
    if (!tokenContract || !presaleContract) {
      return throughErr("Please connect wallet first");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const owner = await tokenContract.owner();
    const tokenContractTokenBalance = await tokenContract.balanceOf(
      tokenAddress
    );
    const contrctBalance = await provider.getBalance(presaleAddress);
    const tokenRate = await presaleContract.rate().then(Number);
    const tokenBalance = await tokenContract
      .balanceOf(presaleAddress)
      .then(Number);

    setOwnerAddress(owner);
    setTokenContractTokenBln(Number(tokenContractTokenBalance));
    setCardsDetails((prev) => ({
      ...prev,
      tokenRate,
      contractBalance: Number(contrctBalance) / 1000000000000000000,
      currentTokenBalance: tokenBalance,
    }));
  };

  const setTokenRate = async () => {
    if (!presaleContract) {
      return throughErr("Please connect wallet first");
    }
    if (!newTokenRate) {
      return throughErr("Please enter a valid number");
    }
    await presaleContract.setRate(newTokenRate);
    setIsLoading(true);
    setCardsDetails((prev) => ({ ...prev, tokenRate: Number(newTokenRate) }));
    setNewTokenRate("");
    setLoaderMsg("Setting Token Rate...");
  };

  const WithdrawEthBalance = async () => {
    if (!presaleContract) {
      return throughErr("Please connect wallet first");
    }
    await presaleContract.withdraw();
    setIsLoading(true);
    setCardsDetails((prev) => ({
      ...prev,
      contractBalance: 0,
    }));
    setLoaderMsg(
      `Withdrawing ${cardsDetail.contractBalance.toLocaleString("en-IN")} ETH`
    );
  };

  const withdrawToken = async () => {
    if (!presaleContract) {
      return throughErr("Please connect wallet first");
    }
    await presaleContract.withdrawTokens();
    setIsLoading(true);
    setCardsDetails((prev) => ({
      ...prev,
      currentTokenBalance: 0,
    }));
    setLoaderMsg(
      `Withdrawing ${normalTokenCount(
        cardsDetail.currentTokenBalance
      ).toLocaleString("en-IN")} Tokens`
    );
  };

  const mintTokens = async () => {
    if (!tokenContract || !ownerAddress) {
      return throughErr("Please connect wallet first");
    }
    if (!tokensToMint) {
      return throughErr("Please enter a valid number");
    }
    await tokenContract.mint(
      tokenAddress,
      `${Number(tokensToMint) * 1000000000000000000}`
    );
    setIsLoading(true);
    setCardsDetails((prev) => ({
      ...prev,
      currentTokenBalance: prev.currentTokenBalance + Number(tokensToMint),
    }));
    setLoaderMsg(`Minting ${tokensToMint} Tokens...`);
    setTokensToMint("0");
  };

  const burnTokens = async () => {
    if (!tokenContract) {
      return throughErr("Please connect wallet first");
    }
    if (!tokensToBurn) {
      return throughErr("Please enter a valid number");
    }
    const tokensCount = await tokenContract
      .balanceOf(tokensBurnAddress)
      .then(Number)
      .then(normalTokenCount);
    if (tokensCount > 0 && Number(tokensToBurn) <= tokensCount) {
      await tokenContract.burn(`${Number(tokensToBurn) * 1000000000000000000}`);
      setIsLoading(true);
      setLoaderMsg(
        `Total Tokens: ${tokensCount}, with ${tokensToBurn} Tokens Set for Burning`
      );
      setTokensToBurn("0");
    } else {
      return throughErr("Insufficient Tokens");
    }
  };

  const transferTokens = async () => {
    if (!tokenContract) {
      return throughErr("Please connect wallet first");
    }
    if (!tokensTransferAddress || !tokensToTransfer) {
      return throughErr("Please enter a valid address and number");
    }
    await tokenContract.transfer(
      tokensTransferAddress,
      `${Number(tokensToTransfer) * 1000000000000000000}`
    );
    setIsLoading(true);
    setLoaderMsg(
      `Transferring ${tokensToTransfer} tokens to ${tokensTransferAddress.slice(
        0,
        5
      )}...${tokensTransferAddress.slice(-5)}`
    );
    setTokenContractTokenBln(
      Number(tokenContractTokenBln) - Number(tokensToTransfer)
    );
    setTokensTransferAddress("");
    setTokensToTransfer("0");
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
    if (presaleContract && tokenContract) {
      getData();
    }
  }, [presaleContract, tokenContract]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
        getData();
      }, 5000);
    }
    return () => {
      if (isLoading) {
        setIsLoading(false);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.getItem("isOwner") === "false") {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Modal isOpen={isLoading} onClose={() => {}} isCentered>
        <Loader msg={loaderMsg} />
      </Modal>
      <Box
        sx={{
          padding: { xs: "24px", md: "48px" },
          textAlign: "center",
          background: "black",
          minHeight: "100vh",
        }}
      >
        <Text
          sx={{
            color: "secondary",
            margin: "64px 0 24px 0",
            fontWeight: "bold",
            fontSize: { xs: "32px", md: "58px" },
          }}
        >
          Tools
        </Text>
        <Flex
          sx={{
            gap: { xs: "24px", md: "48px" },
            flexWrap: "wrap",
          }}
        >
          {[
            {
              name: "Mint Tokens",
              placeHolder: "tokens Count to mint",
              isInput: true,
              label2: "Current Token Balance (Token Contract):",
              value: `${normalTokenCount(tokenContractTokenBln).toLocaleString(
                "en-IN"
              )} Tokens`,
              ctaName: "Mint Tokens",
              onchange: setTokensToMint,
              cta: mintTokens,
              inputValue: tokensToMint,
            },
            {
              name: "Set Token Rate",
              placeHolder: "new tokens rate per eth",
              isInput: true,
              label2: "Current Token Rate (Presale Contract):",
              value: `${cardsDetail.tokenRate} Token per 1 Eth`,
              ctaName: "Set Rate",
              cta: setTokenRate,
              inputValue: newTokenRate,
              onchange: setNewTokenRate,
            },
            {
              name: "Withdraw Balance",
              placeHolder: "only owner's account",
              isInput: true,
              label2: "Current Eth Balance (Presale Contract):",
              value: `${cardsDetail.contractBalance.toLocaleString(
                "en-IN"
              )} Eth`,
              ctaName: "Withdraw",
              cta: WithdrawEthBalance,
            },
            {
              name: "Withdraw Tokens",
              isInput: true,
              placeHolder: "only owner's account",
              label2: "Current Token Balance (Presale Contract):",
              value: `${normalTokenCount(
                cardsDetail.currentTokenBalance
              ).toLocaleString("en-IN")} Tokens`,
              ctaName: "Withdraw Tokens",
              cta: withdrawToken,
            },
            {
              name: "Burn Tokens",
              placeHolder: "tokens to burn",
              isInput: true,
              label2: "Burn token from any address:",
              value: ` --- `,
              ctaName: "Burn Tokens",
              onchange: setTokensToBurn,
              cta: burnTokens,
              inputValue: tokensToBurn,
            },
            {
              name: "Transfer Tokens",
              placeHolder: "tokens to burn",
              isInput: true,
              label2: "Current Token Balance (Token Contract):",
              value: `${normalTokenCount(tokenContractTokenBln).toLocaleString(
                "en-IN"
              )} Tokens`,
              ctaName: "Transfer Tokens",
              onchange: setTokensToTransfer,
              cta: transferTokens,
              inputValue: tokensToTransfer,
            },
          ].map((item) => {
            return (
              <Box
                key={item.name}
                sx={{
                  padding: "12px",
                  border: "2px solid #ffffff60",
                  background: "black",
                  height: "fit-content",
                  width: "400px",
                  borderRadius: "16px",
                  zIndex: 2,
                  textAlign: "left",
                }}
              >
                <Text
                  sx={{
                    fontSize: { xs: "24px", md: "32px" },
                    fontWeight: "bold",
                    color: "secondary",
                    textAlign: "left",
                  }}
                >
                  {item.name}
                </Text>
                <Box sx={{ margin: "24px 0" }}>
                  <Box
                    sx={{
                      margin: "8px 0",
                    }}
                  >
                    <Text
                      sx={{
                        color: "tertiary",
                      }}
                    >
                      {item.label2}
                    </Text>
                    <Text
                      sx={{
                        color: "secondary",
                        margin: "0px 0 8px 0",
                      }}
                    >
                      {item.value}
                    </Text>

                    {item.name === "Transfer Tokens" ? (
                      <Input
                        placeholder={"address"}
                        sx={{
                          color: "secondary",
                          border: "1px solid #ffffff60",

                          "&:placeholder": {
                            color: "secondary",
                          },
                        }}
                        value={tokensTransferAddress}
                        onChange={(e) =>
                          setTokensTransferAddress(e.target.value)
                        }
                      />
                    ) : null}

                    {item.name === "Burn Tokens" ? (
                      <Input
                        placeholder={"address"}
                        sx={{
                          color: "secondary",
                          border: "1px solid #ffffff60",

                          "&:placeholder": {
                            color: "secondary",
                          },
                        }}
                        value={tokensBurnAddress}
                        onChange={(e) => setTokensBurnAddress(e.target.value)}
                      />
                    ) : null}

                    <Input
                      placeholder={item.placeHolder}
                      sx={{
                        color: "secondary",
                        border: "1px solid #ffffff60",
                        margin: "8px 0",
                        "&:placeholder": {
                          color: "secondary",
                        },
                      }}
                      isDisabled={item.placeHolder === "only owner's account"}
                      value={item.inputValue}
                      onChange={
                        item.onchange
                          ? (e) => item.onchange(e.target.value)
                          : () => {}
                      }
                    />
                  </Box>
                </Box>

                <Button
                  sx={{
                    background: "lgPrimary",
                    color: "secondary",
                    display: "block",
                    margin: "24px auto auto auto",
                    padding: "12px 48px",
                    "&:hover": {
                      background: "lgPrimary",
                    },
                    width: "100%",
                  }}
                  onClick={item.cta}
                >
                  {item.ctaName}
                </Button>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </>
  );
}

export default ToolCards;
