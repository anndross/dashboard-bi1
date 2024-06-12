import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import Image from "next/image";

interface TableHeroProps {
  headerCells: string[];
  rowsCells: (string | number)[][];
}

function renderRelativeTag(element: any) {
  if (typeof element === "string") {
    if (
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
