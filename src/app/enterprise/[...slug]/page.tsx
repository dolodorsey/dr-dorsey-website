import EnterpriseWorkspace from "../EnterpriseWorkspace";

export default function EnterpriseRoute({ params }: { params: { slug: string[] } }) {
  return <EnterpriseWorkspace path={params.slug.join("/")} />;
}
