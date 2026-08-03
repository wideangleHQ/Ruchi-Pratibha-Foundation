import type { Metadata } from 'next';
import { AccessForm } from './access-form';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Access | Ruchi Prativa Foundation',
  description: 'Dashboard access for authorized Foundation personnel.',
};

export default function AccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-[440px] space-y-10">
        <div className="flex flex-col items-center space-y-6">
          <Image
            src="/logo.svg"
            alt="Ruchi Prativa Foundation"
            width={72}
            height={72}
            className="h-[72px] w-[72px] object-contain"
            priority
          />

          <div className="space-y-2 text-center">
            <h1
              className="font-cormorant text-3xl font-semibold tracking-tight"
              style={{ lineHeight: '115%' }}
            >
              Dashboard Access
            </h1>
            <p className="font-manrope text-sm text-muted-foreground">
              This dashboard is restricted to authorized Foundation personnel.
            </p>
          </div>
        </div>

        <AccessForm />

        <p className="text-center font-manrope text-xs text-muted-foreground/60">
          Powered by Ruchi Prativa Foundation
        </p>
      </div>
    </div>
  );
}
