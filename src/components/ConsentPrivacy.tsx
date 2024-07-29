import { Checkbox } from "./ui/checkbox";

const ConsentPrivacy = ({
  privacyConsent,
  termsAndConditions,
  marketingConsent,
  onPrivacyConsentChange,
  onTermsAndConditionsChange,
  onMarketingConsentChange,
}: {
  privacyConsent: boolean;
  termsAndConditions: boolean;
  marketingConsent: boolean;
  onPrivacyConsentChange: (checked: boolean) => void;
  onTermsAndConditionsChange: (checked: boolean) => void;
  onMarketingConsentChange: (checked: boolean) => void;
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Consent & Privacy</h2>
      <div className="flex items-start mb-4">
        <Checkbox
          checked={privacyConsent}
          onCheckedChange={onPrivacyConsentChange}
          id="privacy-consent"
          className="mr-2"
        />
        <label htmlFor="privacy-consent" className="text-sm">
          I agree to the privacy policy
        </label>
      </div>
      <div className="flex items-start mb-4">
        <Checkbox
          checked={termsAndConditions}
          onCheckedChange={onTermsAndConditionsChange}
          id="terms-and-conditions"
          className="mr-2"
        />
        <label htmlFor="terms-and-conditions" className="text-sm">
          I accept the terms and conditions
        </label>
      </div>
      <div className="flex items-start mb-4">
        <Checkbox
          checked={marketingConsent}
          onCheckedChange={onMarketingConsentChange}
          id="marketing-consent"
          className="mr-2"
        />
        <label htmlFor="marketing-consent" className="text-sm">
          I consent to receive marketing communications
        </label>
      </div>
    </div>
  );
};

export default ConsentPrivacy;
