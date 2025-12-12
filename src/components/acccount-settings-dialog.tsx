import { useState } from "react";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";

export default function AccountDialog() {
  const [input, setInput] = useState('') 
  const text = 'I understand and wish to delete my account';
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Delete Your Account.
        </DialogTitle>
        <DialogDescription>
          Deleting your account will immediately erase all your data from our servers permanently and cannnot be reversed. 
        </DialogDescription>
        <DialogDescription>
          Type <strong>I understand and wish to delete my account</strong> in the box below to delete your account.
        </DialogDescription>
      </DialogHeader>
      <Input className="border-foreground/50" onChange={(e) => setInput(e.target.value)} />
      <DialogFooter>
        <Button variant={'destructive'} disabled={text != input}>Delete</Button>
      </DialogFooter>
    </DialogContent>
  )
}