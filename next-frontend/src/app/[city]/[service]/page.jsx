import { redirect } from 'next/navigation';

export default async function LegacyCityServiceRedirect({ params }) {
  const { city, service } = await params;
  redirect(`/${city}/services/${service}`);
}
