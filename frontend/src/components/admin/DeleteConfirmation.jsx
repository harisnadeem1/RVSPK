import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

function DeleteConfirmation({ isOpen, onClose, onConfirm, reportName }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md w-[92vw] rounded-2xl">

        {/* Icon */}
        <div className="flex justify-center mb-2 mt-1">
          <div className="h-14 w-14 rounded-full bg-destructive/10 border border-destructive/20
            flex items-center justify-center">
            <Trash2 className="h-6 w-6 text-destructive" />
          </div>
        </div>

        <AlertDialogHeader className="text-center space-y-2">
          <AlertDialogTitle className="text-lg font-bold">
            Delete Report?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            You're about to permanently delete{' '}
            <span className="font-semibold text-foreground">"{reportName}"</span>.
            <br />
            <span className="text-destructive/80">This action cannot be undone.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row gap-3 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30
                  border-t-white animate-spin" />
                Deleting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </span>
            )}
          </Button>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteConfirmation;