import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

interface TableHeroProps {
  headerCells: string[];
  rowsCells: (string | number)[][];
}

export function TableHero({ headerCells, rowsCells }: TableHeroProps) {
  return (
    <Table className="w-full overflow-auto">
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
              <TableCell key={cell}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
