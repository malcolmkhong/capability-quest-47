
import { ClientFormData } from "@/pages/QuotationClient";

interface ClientInfoSummaryProps {
  clientData: ClientFormData | null;
}

const ClientInfoSummary = ({ clientData }: ClientInfoSummaryProps) => {
  if (!clientData) return null;
  
  return (
    <div className="bg-muted p-4 rounded-md">
      <h3 className="font-medium mb-2">Project: {clientData.projectName}</h3>
      <p className="text-sm text-muted-foreground">Client: {clientData.clientName}</p>
    </div>
  );
};

export default ClientInfoSummary;
