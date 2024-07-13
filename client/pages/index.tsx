import { Grid, useMediaQuery } from "@chakra-ui/react";
import Header from "@/Components/Header";
import LandingSections from "@/Components/LandingSections";
import WhyChoseOurToken from "@/Components/WhyChoseOurToken";
import bgGrid from "@/Assets/bgGrid.png";
import TradeTheFuture from "@/Components/TradeTheFuture";
import OurAchievments from "@/Components/OurAchievments";
import Tokenomics from "@/Components/Tokenomics";
import Footer from "@/Components/Footer";
import Investors from "@/Components/Investors";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import Preloader from "@/Components/Preloader";

export default function Home() {
  const [preloader, setPreloader] = useState<boolean>(false);
  const [smScreen] = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    setPreloader(true);
    let timeout = setTimeout(() => {
      setPreloader(false);
    }, 3500);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  console.log("smScreen --->", smScreen);

  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <>
          <Head>
            <title>NFTFN | Presale Now Live</title>
            <meta
              name="description"
              content="Presale of NFTFN. A perp platform for trading crypto, NFTs, and more."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/FaviconPng.png" />
          </Head>

          <Grid
            sx={{
              position: "relative",
            }}
          >
            {smScreen ? null : (
              <Image
                src={bgGrid}
                alt="bgGrid"
                style={{ position: "fixed", inset: 0, zIndex: 0 }}
              />
            )}

            <Header />
            <LandingSections />
            <WhyChoseOurToken />
            <TradeTheFuture />
            <OurAchievments />
            <Tokenomics />
            <Investors />
            <Footer />
          </Grid>
        </>
      )}
    </>
  );
}
