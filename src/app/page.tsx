"use client";
import { AreaChartHero } from "@/components/AreaChart";
import { BarChartHero } from "@/components/BarChart";
import { BarListHero } from "@/components/BarList";
import { DataBarsHero } from "@/components/DataBars";
import { DonutChartHero } from "@/components/DonutChart";
import { FunnelChartHero } from "@/components/FunnelChart";
import { LineChartHero } from "@/components/LineChart";
import { ProgressCircleHero } from "@/components/ProgressCircle";
import { ScatterChartHero } from "@/components/ScatterChart";
import { SparkChartHero } from "@/components/SparkChart";
import { TableHero } from "@/components/Table";
import { TrackerHero } from "@/components/Tracker";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";

export default function Home({ data }: any) {
  async function getData() {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer 63f1f8c1-3ed2-414a-8f0a-2e1eb985776f"
    );
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      procedure: "p.SM_Dash_Stocksmov",
      params: {
        CalendarYear: "2024",
      },
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
      requestOptions
    );

    const data = await response.json();

    const stockItems = data.results;

    const salesByQuantity = stockItems.reduce((acc: any, currentValue: any) => {
      acc[currentValue.Calendar_Date] = {
        "Quantidade em estoque":
          currentValue.Stocks_Quantity +
          (acc[currentValue.Calendar_Date]?.["Quantidade em estoque"] || 0),
        "Quantidade de vendas de estoque":
          currentValue.Stocks_Sales +
          (acc[currentValue.Calendar_Date]?.[
            "Quantidade de vendas de estoque"
          ] || 0),
      };
      return acc;
    }, {});

    const stockItemsEntries = Object.entries(salesByQuantity);

    const chartdata = stockItemsEntries.map((e: any) => {
      return {
        date: e[0],
        ...e[1],
      };
    });

    return chartdata;
  }

  const [chartdata, setChartdata] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data.length) {
        setChartdata(data);
      }
    };

    fetchData();
  }, []);

  const tabledata = [
    {
      Clients_Name: "FERNANDO",
      OrdersItem_Quantity: 1,
      Orders_ClientNote: "",
      Orders_CreationDate: "Fri, 20 Oct 2023 14:16:33 GMT",
      Orders_Number: 1084,
      Orders_ShippingCity: "S\u00c3O PAULO",
      Orders_ShippingCompany: "EMPRESA BEBIDAS LTDA",
      Orders_ShippingState: "SP",
      Orders_Status: "WC-COMPLETED",
      Products_Code: 750,
      Products_Name: "PLACA CERTIFICADOR",
      Stores_Filial: "CAMPARIACADEMYRJ",
      Stores_Zone: "CAMPARY ACADEMY",
    },
    {
      Clients_Name: "GIOVANNA",
      OrdersItem_Quantity: 1,
      Orders_ClientNote: "RETIRADA DE MATERIAL\nRODOLFO, DIA 24/10/2023",
      Orders_CreationDate: "Thu, 21 Dec 2023 11:52:17 GMT",
      Orders_Number: 1137,
      Orders_ShippingCity: "RIO DE JANEIRO",
      Orders_ShippingCompany: "#N\u00c3O INFORMADO",
      Orders_ShippingState: "RJ",
      Orders_Status: "WC-COMPLETED",
      Products_Code: 766,
      Products_Name: "APEROL",
      Stores_Filial: "CAMPARIACADEMYRJ",
      Stores_Zone: "CAMPARY ACADEMY",
    },
    {
      Clients_Name: "GIOVANNA",
      OrdersItem_Quantity: 1,
      Orders_ClientNote: "RETIRADA DE MATERIAL\nRODOLFO, DIA 24/10/2023",
      Orders_CreationDate: "Thu, 21 Dec 2023 11:52:17 GMT",
      Orders_Number: 1137,
      Orders_ShippingCity: "RIO DE JANEIRO",
      Orders_ShippingCompany: "#N\u00c3O INFORMADO",
      Orders_ShippingState: "RJ",
      Orders_Status: "WC-COMPLETED",
      Products_Code: 766,
      Products_Name: "APEROL",
      Stores_Filial: "CAMPARIACADEMYRJ",
      Stores_Zone: "CAMPARY ACADEMY",
    },
    {
      Clients_Name: "FERNANDO",
      OrdersItem_Quantity: 1,
      Orders_ClientNote: "",
      Orders_CreationDate: "Fri, 20 Oct 2023 14:16:33 GMT",
      Orders_Number: 1084,
      Orders_ShippingCity: "S\u00c3O PAULO",
      Orders_ShippingCompany: "EMPRESA BEBIDAS LTDA",
      Orders_ShippingState: "SP",
      Orders_Status: "WC-COMPLETED",
      Products_Code: 750,
      Products_Name: "PLACA CERTIFICADOR",
      Stores_Filial: "CAMPARIACADEMYRJ",
      Stores_Zone: "CAMPARY ACADEMY",
    },
    {
      Clients_Name: "GIOVANNA",
      OrdersItem_Quantity: 1,
      Orders_ClientNote: "RETIRADA DE MATERIAL\nRODOLFO, DIA 24/10/2023",
      Orders_CreationDate: "Thu, 21 Dec 2023 11:52:17 GMT",
      Orders_Number: 1137,
      Orders_ShippingCity: "RIO DE JANEIRO",
      Orders_ShippingCompany: "#N\u00c3O INFORMADO",
      Orders_ShippingState: "RJ",
      Orders_Status: "WC-COMPLETED",
      Products_Code: 766,
      Products_Name: "APEROL",
      Stores_Filial: "CAMPARIACADEMYRJ",
      Stores_Zone: "CAMPARY ACADEMY",
    },
    {
      Clients_Name: "GIOVANNA",
      OrdersItem_Quantity: 1,
      Orders_ClientNote: "RETIRADA DE MATERIAL\nRODOLFO, DIA 24/10/2023",
      Orders_CreationDate: "Thu, 21 Dec 2023 11:52:17 GMT",
      Orders_Number: 1137,
      Orders_ShippingCity: "RIO DE JANEIRO",
      Orders_ShippingCompany: "#N\u00c3O INFORMADO",
      Orders_ShippingState: "RJ",
      Orders_Status: "WC-COMPLETED",
      Products_Code: 766,
      Products_Name: "APEROL",
      Stores_Filial: "CAMPARIACADEMYRJ",
      Stores_Zone: "CAMPARY ACADEMY",
    },
    {
      Clients_Name: "FERNANDO",
      OrdersItem_Quantity: 1,
      Orders_ClientNote: "",
      Orders_CreationDate: "Fri, 20 Oct 2023 14:16:33 GMT",
      Orders_Number: 1084,
      Orders_ShippingCity: "S\u00c3O PAULO",
      Orders_ShippingCompany: "EMPRESA BEBIDAS LTDA",
      Orders_ShippingState: "SP",
      Orders_Status: "WC-COMPLETED",
      Products_Code: 750,
      Products_Name: "PLACA CERTIFICADOR",
      Stores_Filial: "CAMPARIACADEMYRJ",
      Stores_Zone: "CAMPARY ACADEMY",
    },
    {
      Clients_Name: "GIOVANNA",
      OrdersItem_Quantity: 1,
      Orders_ClientNote: "RETIRADA DE MATERIAL\nRODOLFO, DIA 24/10/2023",
      Orders_CreationDate: "Thu, 21 Dec 2023 11:52:17 GMT",
      Orders_Number: 1137,
      Orders_ShippingCity: "RIO DE JANEIRO",
      Orders_ShippingCompany: "#N\u00c3O INFORMADO",
      Orders_ShippingState: "RJ",
      Orders_Status: "WC-COMPLETED",
      Products_Code: 766,
      Products_Name: "APEROL",
      Stores_Filial: "CAMPARIACADEMYRJ",
      Stores_Zone: "CAMPARY ACADEMY",
    },
    {
      Clients_Name: "GIOVANNA",
      OrdersItem_Quantity: 1,
      Orders_ClientNote: "RETIRADA DE MATERIAL\nRODOLFO, DIA 24/10/2023",
      Orders_CreationDate: "Thu, 21 Dec 2023 11:52:17 GMT",
      Orders_Number: 1137,
      Orders_ShippingCity: "RIO DE JANEIRO",
      Orders_ShippingCompany: "#N\u00c3O INFORMADO",
      Orders_ShippingState: "RJ",
      Orders_Status: "WC-COMPLETED",
      Products_Code: 766,
      Products_Name: "APEROL",
      Stores_Filial: "CAMPARIACADEMYRJ",
      Stores_Zone: "CAMPARY ACADEMY",
    },
  ];

  const [headerPrototype] = tabledata;

  const headerCells = Object.keys(headerPrototype);

  const headerRows = tabledata.map((item) => Object.values(item));

  const dataMock = [
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "APEROL",
      Products_Code: 733,
      Products_Name: "TOTEM SETA - APEROL",
      Stocks_Quantity: 0,
      Stocks_Sales: 10,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "APEROL",
      Products_Code: 750,
      Products_Name: "APEROL 750ML",
      Stocks_Quantity: 0,
      Stocks_Sales: 127,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "VIDROS",
      Products_Code: 757,
      Products_Name: "714390 TAÇA APEROL GLOBAL",
      Stocks_Quantity: 96,
      Stocks_Sales: 1044,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "VISIBILIDADE E COMUNICAÇÃO",
      Products_Code: 760,
      Products_Name: "MESA BAIXA APEROL",
      Stocks_Quantity: 0,
      Stocks_Sales: 110,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "VISIBILIDADE E COMUNICAÇÃO",
      Products_Code: 766,
      Products_Name: "FONE DE OUVIDO APEROL",
      Stocks_Quantity: 0,
      Stocks_Sales: 5,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "VISIBILIDADE E COMUNICAÇÃO",
      Products_Code: 767,
      Products_Name: "CAIXA DE SOM JBL APEROL",
      Stocks_Quantity: 0,
      Stocks_Sales: 9,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "DESCARTÁVEIS",
      Products_Code: 768,
      Products_Name: "TAÇA ACRÍLICA APEROL",
      Stocks_Quantity: 0,
      Stocks_Sales: 1600,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "DESCARTÁVEIS",
      Products_Code: 769,
      Products_Name: "COPO BIODEGRADÁVEL APEROL",
      Stocks_Quantity: 2500,
      Stocks_Sales: 0,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "APEROL",
      Products_Code: 770,
      Products_Name: "CAMISETA BRIGADA 2023",
      Stocks_Quantity: 28,
      Stocks_Sales: 14,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "APEROL",
      Products_Code: 771,
      Products_Name: "BALÃO METALIZADO APEROL",
      Stocks_Quantity: 330,
      Stocks_Sales: 0,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "VISIBILIDADE E COMUNICAÇÃO",
      Products_Code: 774,
      Products_Name: "ÓCULOS DE SOL - APEROL",
      Stocks_Quantity: 64,
      Stocks_Sales: 5950,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "VISIBILIDADE E COMUNICAÇÃO",
      Products_Code: 775,
      Products_Name: "PORTA COPO 2023 - APEROL",
      Stocks_Quantity: 5940,
      Stocks_Sales: 1000,
      Stores_Filial: "ONTRADESP",
      Stores_Zone: "ON TRADE",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "SAGATIBA",
      Products_Code: 1241,
      Products_Name: "COPO BIO APEROL",
      Stocks_Quantity: 29000,
      Stocks_Sales: 0,
      Stores_Filial: "EVENTOSRJ",
      Stores_Zone: "EVENTOS",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "APEROL",
      Products_Code: 1243,
      Products_Name: "APEROL 750ML",
      Stocks_Quantity: 18,
      Stocks_Sales: 0,
      Stores_Filial: "EVENTOSRJ",
      Stores_Zone: "EVENTOS",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "CAMPARI",
      Products_Code: 1245,
      Products_Name: "CAMPARI 998 ML",
      Stocks_Quantity: 48,
      Stocks_Sales: 0,
      Stores_Filial: "EVENTOSRJ",
      Stores_Zone: "EVENTOS",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "CAMPARI",
      Products_Code: 1247,
      Products_Name: "BIO APEROL & CAMPARI(180ML)",
      Stocks_Quantity: 7600,
      Stocks_Sales: 0,
      Stores_Filial: "EVENTOSRJ",
      Stores_Zone: "EVENTOS",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "CAMPARI",
      Products_Code: 1249,
      Products_Name: "COPO BIO SKYY/SAGATIBA (180ML)",
      Stocks_Quantity: 7700,
      Stocks_Sales: 0,
      Stores_Filial: "EVENTOSRJ",
      Stores_Zone: "EVENTOS",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "SKYY",
      Products_Code: 1251,
      Products_Name: "SAGATIBA 700 ML",
      Stocks_Quantity: 5,
      Stocks_Sales: 0,
      Stores_Filial: "EVENTOSRJ",
      Stores_Zone: "EVENTOS",
    },
    {
      Calendar_Date: "Tue, 14 May 2024 00:00:00 GMT",
      Products_Category: "SKYY",
      Products_Code: 1253,
      Products_Name: "SKYY 980 ML",
      Stocks_Quantity: 17,
      Stocks_Sales: 0,
      Stores_Filial: "EVENTOSRJ",
      Stores_Zone: "EVENTOS",
    },
  ];

  /**
   * DONUT CHART, BRANCH
   */
  const today = "Tue, 14 May 2024 00:00:00 GMT";

  const donut = dataMock.reduce((acc: any, currentValue: any) => {
    if (today === currentValue.Calendar_Date) {
      acc[currentValue.Stores_Zone] =
        currentValue.Stocks_Quantity + (acc[currentValue.Stores_Zone] || 0);

      return acc;
    }
  }, {});

  const donutchartdata = Object.entries(donut).map((e) => {
    return {
      name: e[0] as string,
      value: e[1] as number,
    };
  });

  /**
   * HORIZONTAL BAR CHART, CATEGORY
   */

  const bar = dataMock.reduce((acc: any, currentValue: any) => {
    if (today === currentValue.Calendar_Date) {
      acc[currentValue.Products_Category] =
        currentValue.Stocks_Quantity + (acc[currentValue.Calendar_Date] || 0);

      return acc;
    }
  }, {});

  const barchartdata = Object.entries(bar).map((e) => {
    return {
      category: e[0] as string,
      Estoque: e[1] as number,
    };
  });

  return (
    <main className="grid lg:grid-cols-2 p-6 gap-3 grid-cols-1">
      <div className="w-full bg-white p-2 rounded-md border border-gray-200 flex items-center flex-col justify-center">
        <AreaChartHero
          data={chartdata}
          categories={[
            "Quantidade em estoque",
            "Quantidade de vendas de estoque",
          ]}
          colors={["indigo", "rose"]}
          index="date"
        />
      </div>
      <div className="w-full bg-white p-2 rounded-md border border-gray-200 flex items-center flex-col justify-center">
        <DonutChartHero
          variant="donut"
          onValueChange={(e) => console.log(e)}
          data={donutchartdata}
        />
      </div>

      <div className="w-full bg-white p-2 rounded-md border border-gray-200 flex items-center flex-col justify-center">
        <BarChartHero
          index="category"
          data={barchartdata}
          categories={["Estoque"]}
        />
      </div>

      <div className="w-full bg-white p-2 rounded-md border border-gray-200 flex items-center flex-col justify-center max-h-96">
        <TableHero headerCells={headerCells} rowsCells={headerRows} />
      </div>

      <div className="w-full bg-white p-2 rounded-md border border-gray-200 flex items-center flex-col justify-center col-span-full max-h-96">
        <TableHero headerCells={headerCells} rowsCells={headerRows} />
      </div>
    </main>
  );
}
