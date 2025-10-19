import React from 'react';
import { Alert } from './Alert';
import { cn } from '../../utils/cn';

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'destructive' | 'success';
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  actionLabel = 'Aceptar',
  onAction,
  variant = 'default'
}) => {
  if (!open) return null;

  const handleAction = () => {
    onAction?.();
    onOpenChange(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg mx-4">
        <Alert variant={variant === 'success' ? 'success' : variant} className="shadow-lg bg-white border border-gray-200">
          <div className="space-y-4">
            <div>
              <h3 className={cn(
                "text-lg font-semibold font-caprasimo",
                variant === 'destructive' ? "text-red-900" : 
                variant === 'success' ? "text-green-700" : "text-primary"
              )}>
                {title}
              </h3>
              <p className="text-sm text-muted-foreground font-questrial mt-2">
                {description}
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onOpenChange(false)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors font-questrial",
                  "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                )}
              >
                Cancelar
              </button>
              <button
                onClick={handleAction}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors font-questrial",
                  variant === 'destructive' 
                    ? "bg-red-600 text-white hover:bg-red-700" 
                    : variant === 'success'
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-[#9cc5f2] text-white hover:bg-[#7db3f0]"
                )}
              >
                {actionLabel}
              </button>
            </div>
          </div>
        </Alert>
      </div>
    </div>
  );
};