import { Grid } from "@chakra-ui/react";
import Header from "@/Components/Header";
import LandingSections from "@/Components/LandingSections";
import WhyChoseOurToken from "@/Components/WhyChoseOurToken";
import bgGrid from "@/Assets/bgGrid.png";
import TradeTheFuture from "@/Components/TradeTheFuture";
import OurAchievments from "@/Components/OurAchievments";
// import Tokenomics from "@/Components/Tokenomics";
import TokenomicsChart from "@/Components/TokenomicsChart";
import Tokenomics from "@/Components/Tokenomics";
import Footer from "@/Components/Footer";
import Investors from "@/Components/Investors";
import Image from "next/image";

export default function Home() {
  return (
    <Grid
      sx={{
        position: "relative",
      }}
    >
      <Image
        src={bgGrid}
        alt="bgGrid"
        style={{ position: "fixed", inset: 0 }}
      />
      <Header />
      <LandingSections />
      <WhyChoseOurToken />
      <TradeTheFuture />
      <OurAchievments />
      <Tokenomics />
      <Investors />
      <Footer />
    </Grid>
  );
}
