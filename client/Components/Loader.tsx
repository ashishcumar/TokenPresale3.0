"use client";
import { ModalBody, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import transactionLottie from "@/Assets/transactionLottie.json";
import loaderLottie2 from "@/Assets/loaderLottie2.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function Loader({ msg }: Readonly<{ msg?: string }>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (typeof window !== "undefined" && window.document) {
    return (
      <>
        <ModalOverlay sx={{ backdropFilter: "blur(5px)" }} />
        <ModalContent>
          <ModalBody
            sx={{
              borderRadius: "24px",
              padding: "24px",
            }}
          >
            <Lottie
              animationData={
                msg && !msg.includes("Eth") ? loaderLottie2 : transactionLottie
              }
              loop={true}
              style={{
                height: "200px",
                width: "200px",
                transform: msg ? "scale(0.5)" : "scale(3)",
                margin: "auto",
              }}
            />

            <Text
              sx={{
                textAlign: "center",
                fontSize: { xs: "18px", md: "24px" },
                fontWeight: "bold",

                color: "primary",
              }}
            >
              {msg || "Please wait while we process your transaction...."}
            </Text>
          </ModalBody>
        </ModalContent>
      </>
    );
  }
  return "";
}
export default Loader;
