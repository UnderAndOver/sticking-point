"use client";
import React from "react";
import { Badge, Button, IconButton, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Eye, FileEdit, Trash } from "lucide-react";
import Link from "next/link";
import Chip from "@mui/material/Chip";

interface StatusChipProps {
  status: "pending" | "processing" | "success" | "failed";
}

const statusStyles: Record<StatusChipProps["status"], string> = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  success: "bg-green-500",
  failed: "bg-red-500",
};

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      className={statusStyles[status]}
    />
  );
};
interface Video {
  id: string;
  name: string;
  url: string;
  uploader: string;
  date: Date;
  status: "pending" | "processing" | "success" | "failed";
}

const columns = [
  { id: "name", label: "Name" },
  { id: "date", label: "Date" },
  { id: "uploader", label: "Uploader" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions" },
];

export interface DataTableProps {
  data: Video[];
}

export function DataTable({ data }: DataTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date.toLocaleDateString()}</TableCell>
              <TableCell>{row.uploader}</TableCell>
              <TableCell>
                <StatusChip status={row.status} />
              </TableCell>
              <TableCell>
                <Tooltip title="View">
                  <Link href={`/debates/${row.id}`} passHref>
                    <IconButton component="a">
                      <Eye />
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title="Edit">
                  <Link href={`/debates/${row.id}`} passHref>
                    <IconButton component="a">
                      <FileEdit />
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <Trash />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const handleDelete = (id: string) => {
  // Implement delete action
  console.log("Delete row with id:", id);
};
