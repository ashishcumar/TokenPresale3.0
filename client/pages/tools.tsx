import { Grid } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import bgGrid from "@/Assets/bgGrid.png";
import Header from "@/Components/Header";
import bgCharacter from "@/Assets/AzukiNftBackdrop.png";
import ToolCards from "@/Components/ToolCards";
import Footer from "@/Components/Footer";

function Tools() {
  return (
    <Grid
      sx={{
        position: "relative",
      }}
    >
      <Header />
      <Image
        src={bgGrid}
        alt="bgGrid"
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
      />
   
      <ToolCards />
      <Footer />
    </Grid>
  );
}

export default Tools;
