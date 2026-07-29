import EnterpriseWorkspace from "../EnterpriseWorkspace";

export default async function EnterpriseRoute(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  return <EnterpriseWorkspace path={params.slug.join("/")} />;
}
