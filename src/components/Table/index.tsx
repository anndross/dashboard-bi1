import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import Image from "next/image";
import { Badge } from "../Badge";

interface TableHeroProps {
  headerCells: string[];
  rowsCells: (string | number)[][];
}

function renderRelativeTag(element: any) {
  // Função para normalizar a string
  const normalizeString = (str: string) =>
    typeof str === "string" ? str.normalize("NFKC") : str;

  const mappedHealthElement = normalizeString(element);

  const mappedHealthStock: any = {
    "PARADO (+6m)": <Badge deltaType="unchanged">{mappedHealthElement}</Badge>,
    "PARADO (3-6m)": <Badge deltaType="unchanged">{mappedHealthElement}</Badge>,
    "SEM VENDA": (
      <Badge deltaType="moderateDecrease">{mappedHealthElement}</Badge>
    ),
    "FIM SUPEIOR 1 MES": (
      <Badge deltaType="moderateDecrease">{mappedHealthElement}</Badge>
    ),
    "FIM RECENTE": (
      <Badge deltaType="moderateDecrease">{mappedHealthElement}</Badge>
    ),
    SAUDÁVEL: <Badge deltaType="moderateIncrease">{mappedHealthElement}</Badge>,
  };

  // Retorna a tag correspondente, se existir
  if (typeof mappedHealthElement === "string") {
    if (mappedHealthStock[mappedHealthElement]) {
      return mappedHealthStock[mappedHealthElement];
    } else if (
      element.includes(".jpg") ||
      element.includes(".png") ||
      element.includes(".svg") ||
      element.includes(".webp") ||
      element.includes(".jpeg")
    ) {
      return <img src={element} width={60} height={60} alt="" title="" />;
    }

    return element;
  }
  return element;
}

export function TableHero({ headerCells, rowsCells }: TableHeroProps) {
  return (
    <Table className="w-full h-full overflow-auto">
      <TableHead>
        <TableRow>
          {headerCells.map((cell) => (
            <TableHeaderCell key={cell}>{cell}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rowsCells.map((cells, index) => (
          <TableRow key={index}>
            {cells.map((cell) => (
              <TableCell className="max-w-96 text-wrap" key={cell}>
                {renderRelativeTag(cell)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
