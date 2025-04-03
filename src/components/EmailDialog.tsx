
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientEmail?: string;
  clientName?: string;
  quotationNumber: string;
  onSendEmail: (to: string, subject: string, message: string) => void;
}

const EmailDialog = ({
  open,
  onOpenChange,
  clientEmail = "",
  clientName = "",
  quotationNumber,
  onSendEmail,
}: EmailDialogProps) => {
  const [to, setTo] = useState(clientEmail);
  const [subject, setSubject] = useState(`Quotation ${quotationNumber}`);
  const [message, setMessage] = useState(
    `Dear ${clientName || "Client"},\n\nPlease find attached our quotation ${quotationNumber} for your project.\n\nIf you have any questions or require further clarification, please don't hesitate to contact us.\n\nThank you for your business.\n\nBest regards,`
  );
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    onSendEmail(to, subject, message);
    setTimeout(() => {
      setIsSending(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[300px] h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Send Quotation Email</DialogTitle>
          <DialogDescription>
            Send the quotation to your client via email.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="client@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={10}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={isSending}>
            {isSending ? "Sending..." : "Send Email"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
