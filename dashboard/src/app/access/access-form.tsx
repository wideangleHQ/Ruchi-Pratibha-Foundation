'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboardAccess, dashboardVerify } from '@/lib/dashboard-auth';

const accessSchema = z.object({
  accessCode: z
    .string()
    .min(1, 'Access code is required.')
    .min(4, 'Access code is too short.'),
});

type AccessFormValues = z.infer<typeof accessSchema>;

export function AccessForm() {
  const router = useRouter();
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccessFormValues>({
    resolver: zodResolver(accessSchema),
    defaultValues: { accessCode: '' },
  });

  async function onSubmit(values: AccessFormValues) {
    setError(null);

    try {
      const result = await dashboardAccess(values.accessCode);

      if (!result.success) {
        setError('Invalid access code.');
        return;
      }

      const verified = await dashboardVerify();
      if (verified) {
        router.replace('/');
      } else {
        setError('Invalid access code.');
      }
    } catch {
      setError('Invalid access code.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="accessCode" className="font-manrope text-sm">
          Access Code
        </Label>
        <div className="relative">
          <Input
            id="accessCode"
            type={showCode ? 'text' : 'password'}
            placeholder="Enter your access code"
            autoComplete="off"
            autoFocus
            disabled={isSubmitting}
            className="pr-10"
            aria-describedby={errors.accessCode ? 'accessCode-error' : undefined}
            aria-invalid={!!errors.accessCode}
            {...register('accessCode')}
          />
          <button
            type="button"
            onClick={() => setShowCode((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
            aria-label={showCode ? 'Hide access code' : 'Show access code'}
            tabIndex={-1}
          >
            {showCode ? (
              <EyeOff className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
        {errors.accessCode && (
          <p id="accessCode-error" className="font-manrope text-sm text-destructive" role="alert">
            {errors.accessCode.message}
          </p>
        )}
        {error && !errors.accessCode && (
          <p className="font-manrope text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} />
            Verifying...
          </>
        ) : (
          'Continue'
        )}
      </Button>
    </form>
  );
}
