import { FileText, MessageSquare, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { DocumentRow } from "../types/document";
import type {
  DataTableColumn,
  DataTableRowAction,
  DocumentTableSort,
} from "../components/table/document-table-types";

export const nfeInitialTableSort: DocumentTableSort = {
  direction: "desc",
  key: "issuedAt",
};

export const nfeTableColumns: DataTableColumn<DocumentRow>[] = [
  {
    key: "document",
    label: "Ver Nota",
    renderCell: (row, { dispatchAction }) => (
      <button
        aria-label={`Visualizar documento ${row.number}`}
        className="documents-row-document"
        onClick={() => dispatchAction("view")}
        type="button"
      >
        <FileText size={23} />
      </button>
    ),
    sortValue: (row) => row.number,
    width: 116,
  },
  { key: "issuedAt", label: "Emissão", sortable: true, width: 150 },
  { key: "number", label: "Número", sortable: true, width: 140 },
  { key: "value", label: "Valor", sortable: true, width: 170 },
  { key: "phone", label: "Telefone (Emit.)", sortable: true, width: 210 },
  { key: "accessKey", label: "Chave de Acesso", sortable: true, width: 500 },
  {
    key: "status",
    label: "Status",
    renderCell: (row) => <Badge variant="success">{row.status}</Badge>,
    sortable: true,
    width: 150,
  },
  { key: "labels", label: "Etiquetas", width: 120 },
  { key: "annotations", label: "Anotações", width: 150 },
  {
    align: "center",
    key: "cce",
    label: "CCe",
    renderCell: (row) =>
      row.cce ? <Pencil aria-label="CCe disponível" size={23} /> : "-",
    sortValue: (row) => (row.cce ? "1" : "0"),
    width: 110,
  },
  { key: "origin", label: "Origem", sortable: true, width: 170 },
  { key: "erpSync", label: "Sincronização ERP", width: 250 },
  { key: "type", label: "Tipo", sortable: true, width: 150 },
  { key: "model", label: "Modelo", sortable: true, width: 160 },
  { key: "createdAt", label: "Criada em", sortable: true, width: 180 },
  {
    key: "manifestationMonth",
    label: "Mês da Manifestação",
    sortable: true,
    width: 270,
  },
  { key: "destinationUf", label: "UF Destino", sortable: true, width: 180 },
  { key: "originUf", label: "UF Origem", sortable: true, width: 180 },
  { key: "protocolled", label: "Protocoladas", sortable: true, width: 190 },
  {
    align: "center",
    key: "comments",
    label: "Comentários",
    renderCell: (row) =>
      row.comments ? (
        <MessageSquare aria-label="Comentários disponíveis" size={23} />
      ) : (
        "-"
      ),
    sortValue: (row) => (row.comments ? "1" : "0"),
    width: 190,
  },
];

export const nfeRowActions: DataTableRowAction[] = [
  { icon: "eye", key: "view", label: "Visualizar" },
  { icon: "eye", key: "referencedCte", label: "CT-e referenciada" },
  { icon: "refresh", key: "refreshStatus", label: "Atualizar status" },
  { icon: "tag", key: "labels", label: "Etiquetas", menu: true },
  { icon: "download", key: "download", label: "Baixar", menu: true },
  { icon: "fileText", key: "manifest", label: "Manifestar", menu: true },
];
