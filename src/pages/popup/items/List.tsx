import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

function TableDemo({ data }) {
  return (
    <Table className="text-left">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader >
        <TableRow>
          <TableHead className="w-[100px] ">股票名称</TableHead>
          <TableHead className="w-[100px] ">股票代码</TableHead>
          <TableHead className="w-[80px]">股价</TableHead>
          <TableHead className="w-[50px]">PB</TableHead>
          <TableHead className="w-[50px]">ROE(%)</TableHead>
          <TableHead className="w-[50px]">EPS</TableHead>
          <TableHead>股价Min</TableHead>
          <TableHead>股价Max</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, idx) => (
          <TableRow key={item.name + "." + idx}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{'000212'}</TableCell>
            <TableCell>{item.va}</TableCell>
            <TableCell>{item.pb}</TableCell>
            <TableCell>{item.roe}</TableCell>
            <TableCell>{item.eps}</TableCell>
            <TableCell>{item.min}</TableCell>
            <TableCell>{item.max}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default TableDemo;
