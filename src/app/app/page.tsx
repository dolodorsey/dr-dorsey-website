import CustomerAppEnhancer from "./customer-app-enhancer";
import CustomerAppGateway from "./customer-app-gateway";
import CustomerAppV2 from "./customer-app-v2";

export default function KollectiveCustomerAppPage() {
  return (
    <CustomerAppGateway>
      <CustomerAppEnhancer />
      <CustomerAppV2 />
    </CustomerAppGateway>
  );
}
