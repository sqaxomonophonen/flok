import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogProps } from "@radix-ui/react-dialog";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { knownTargets } from "@/settings.json";
import { useState, FormEvent } from "react";

function TargetsInput(props: InputProps) {
  return (
    <div className="grid w-full items-center gap-1.5 mt-4 mb-2">
      <Label className="mb-1" htmlFor="email-2">
        Targets
      </Label>
      <Input {...props} />
      <div className="text-sm text-slate-500">
        <span>Known targets are: </span>
        <ul className="inline list-none p-0">
          {knownTargets.map((t) => (
            <li
              key={t}
              className="inline after:content-[',_'] last:after:content-none"
            >
              <code>{t}</code>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface ConfigureDialogProps extends DialogProps {
  targets: string[];
  onAccept?: (targets: string[]) => void;
}

export function ConfigureDialog({
  targets,
  onAccept,
  ...props
}: ConfigureDialogProps) {
  const [targetsValue, setTargetsValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onAccept && targetsValue) {
      const newTargets = targetsValue
        .split(",")
        .map((t) => t.trim())
        .filter((t) => knownTargets.includes(t));
      onAccept(newTargets);
    }
    props.onOpenChange && props.onOpenChange(false);
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Configure Layout</DialogTitle>
            <DialogDescription>
              Enter a list of targets, separated by comma.
            </DialogDescription>
          </DialogHeader>
          <TargetsInput
            value={targetsValue}
            placeholder={targets.join(", ") || "hydra"}
            onChange={(e) =>
              setTargetsValue(e.target.value.replace(/,\s*/g, ", ").trim())
            }
          />
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
