import ProjectNirmanPage from '@/modules/damdaar/ProjectNirmanPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project NIRMAN | Technology Innovation Competition | DUMDAAR ODIA',
  description:
    'Flagship technology innovation initiative under the Technology Wing of DUMDAAR ODIA, created to discover promising student innovators across Odisha.',
};

export default function Page() {
  return <ProjectNirmanPage />;
}
