'use client';

import React, { useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudUpload, X, FileImage, FileText, Film } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadCardProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  accept?: string;
  maxSize?: string;
  variant?: 'default' | 'hero';
  description?: string;
  className?: string;
}

export function UploadCard({
  label,
  value,
  onChange,
  accept = 'JPG, PNG, WebP',
  maxSize = '5 MB',
  variant = 'default',
  description,
  className,
}: UploadCardProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        onChange(file.name);
      }
    },
    [onChange],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onChange(file.name);
      }
    },
    [onChange],
  );

  const handleKeyInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value || null);
    },
    [onChange],
  );

  const isHero = variant === 'hero';

  const getFileIcon = () => {
    if (!value) return CloudUpload;
    const ext = value.split('.').pop()?.toLowerCase() ?? '';
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) return FileImage;
    if (['mp4', 'mov', 'webm'].includes(ext)) return Film;
    return FileText;
  };

  const FileIcon = getFileIcon();

  return (
    <div className={cn('space-y-2', className)}>
      <label className="font-manrope text-sm font-medium text-foreground">{label}</label>
      {description && <p className="font-manrope text-xs text-muted-foreground -mt-1">{description}</p>}

      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'relative rounded-[12px] border bg-muted/30 overflow-hidden group',
              isHero ? 'aspect-video' : 'p-4',
            )}
          >
            {isHero ? (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 via-muted/50 to-secondary/5">
                <div className="text-center">
                  <FileIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" strokeWidth={1.5} />
                  <p className="font-space text-sm text-foreground font-medium">{value}</p>
                  <p className="font-manrope text-xs text-muted-foreground mt-1">Banner preview</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-primary/8">
                  <FileIcon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-space text-sm font-medium truncate">{value}</p>
                  <p className="font-manrope text-xs text-muted-foreground">Uploaded</p>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-destructive/10 cursor-pointer"
              aria-label="Remove file"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={cn(
                'flex cursor-pointer flex-col items-center justify-center rounded-[12px] border-2 border-dashed transition-all duration-200',
                isDragOver
                  ? 'border-primary bg-primary/5 shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]'
                  : 'border-border hover:border-primary/40 hover:bg-muted/30',
                isHero ? 'aspect-video' : 'py-8 px-6',
              )}
            >
              <motion.div
                animate={isDragOver ? { scale: 1.08, y: -2 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-muted mb-3">
                  <CloudUpload className={cn('h-6 w-6', isDragOver ? 'text-primary' : 'text-muted-foreground')} strokeWidth={1.5} />
                </div>
                <p className="font-manrope text-sm font-medium text-foreground">
                  Drag & drop or <span className="text-primary">click to browse</span>
                </p>
                <p className="font-manrope text-xs text-muted-foreground mt-1">
                  {accept} • Max {maxSize}
                </p>
              </motion.div>
              <input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key input fallback */}
      <input
        type="text"
        value={value ?? ''}
        onChange={handleKeyInput}
        placeholder={`Enter ${label.toLowerCase()} key manually`}
        className="w-full rounded-[10px] border bg-background px-3 py-2 font-space text-xs text-muted-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
      />
    </div>
  );
}
