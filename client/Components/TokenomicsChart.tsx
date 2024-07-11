import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useMediaQuery } from "@chakra-ui/react";

const data = [
  { name: "Public", value: 20.34 },
  { name: "Team", value: 15 },
  { name: "Marketing & Operational Reserve", value: 13 },
  { name: "Foundation", value: 13 },
  { name: "Protocol Development Fund", value: 10 },
  { name: "Ecosystem Fund", value: 10 },
  { name: "Liquidity Provisioning", value: 5 },
  { name: "Seed", value: 5 },
  { name: "Private", value: 4 },
  { name: "Angel", value: 2.83 },
  { name: "Advisor", value: 1.83 },
];

const COLORS = [
  "#FFDE59",
  "#FF914D",
  "#A15FBD",
  "#6D51DD",
  "#596CC6",
  "#E483BD",
  "#00BF63",
  "#74E8ED",
  "#58B0E4",
  "#B6C2BC",
  "#606c38",
];

const TokenomicsChart = () => {
  const [isMd] = useMediaQuery("(max-width: 700px)");

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{
        display: "grid",
        placeContent: "center",
        background: "transparent",
      }}
    >
      <PieChart>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx="50%"
          cy="100%"
          outerRadius={isMd ? 240 : 360}
          label={({ name, value }) => `${name}: ${value}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TokenomicsChart;
