
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const chartConfig = {
  type: "bar",
  height: 240,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: false },
    colors: ["#020617"],
    plotOptions: {
      bar: { columnWidth: "40%", borderRadius: 2 },
    },
    xaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "poppins",
          fontWeight: 400,
        },
      },
      categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: { lines: { show: true } },
      padding: { top: 5, right: 20 },
    },
    fill: { opacity: 0.8 },
    tooltip: { theme: "dark" },
  },
};

export default function BarChart() {
  return (
    <Card className="mt-10">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-4 w-4" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Gráfico de Barras
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualização de vendas ao longo dos meses.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
