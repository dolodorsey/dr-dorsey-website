import CustomerAppEnhancer from "./customer-app-enhancer";
import CustomerAppGateway from "./customer-app-gateway";
import CustomerAppV2 from "./customer-app-v2";
import MobileExperienceEnhancer from "./mobile-experience-enhancer";

export default function KollectiveCustomerAppPage() {
  return (
    <CustomerAppGateway>
      <CustomerAppEnhancer />
      <MobileExperienceEnhancer />
      <CustomerAppV2 />
    </CustomerAppGateway>
  );
}
