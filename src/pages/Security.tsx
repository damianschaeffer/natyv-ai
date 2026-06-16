import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { LegalList, LegalPageShell, LegalSection } from "@/components/LegalPageShell";

const Security = () => (
  <LegalPageShell
    title="Security."
    accentTitle="Operational."
    eyebrow="Security"
    description="How Natyv AI protects assessment data, MyAgent workspaces, customer conversations, and connected business systems."
    canonicalPath="/security"
    metaTitle="Security | Natyv AI"
    metaDescription="Natyv AI security practices for encryption, access control, MyAgent data isolation, vendor review, incident response, and vulnerability reporting."
    icon={ShieldCheck}
  >
    <LegalSection title="Last Updated" accent="#1077FA">
      <p>May 21, 2026.</p>
      <p>
        Security is not a separate promise tacked onto the end of the product. It shapes how we design assessments,
        deploy MyAgent workspaces, handle customer conversations, and connect business systems.
      </p>
      <p>
        Natyv AI and MyAgent are operated by Natyv Ventures LLC.
      </p>
    </LegalSection>

    <LegalSection title="Data Protection" accent="#22C55E">
      <LegalList>
        <li>Encryption in transit using modern HTTPS/TLS for web traffic.</li>
        <li>Encryption at rest where supported by our database, hosting, storage, and infrastructure providers.</li>
        <li>Workspace isolation patterns, including row-level access controls where applicable.</li>
        <li>Limited retention of data according to business, legal, support, and service delivery needs.</li>
        <li>Separation between customer data and system-level operational data wherever practical.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="Access Control" accent="#38BDF8">
      <p>
        Access is limited to people and systems that need it to operate, support, secure, or improve the service.
        Operators may review conversation or assessment data for quality assurance, escalation handling, or support,
        but broad internal access is not the operating model.
      </p>
      <LegalList>
        <li>Least-privilege access for administrative tools and production systems.</li>
        <li>Authentication and role-based access for internal and customer-facing systems.</li>
        <li>Secrets and credentials stored outside public source code.</li>
        <li>Access reviews and offboarding processes for tools that hold customer or business data.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="AI and Conversation Safety" accent="#8B5CF6">
      <p>
        AI systems can make mistakes, so customer-facing workflows should include clear instructions, bounded
        authority, escalation paths, and human review for higher-risk actions. MyAgent templates are designed to
        capture useful context and route work without pretending that automation removes all judgment.
      </p>
      <LegalList>
        <li>Call and intake templates define what the agent should ask, capture, avoid, and escalate.</li>
        <li>High-impact or ambiguous requests should be reviewed by a human before action.</li>
        <li>Conversation data is not sold or used to train models for other customers.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="Vendors and Integrations" accent="#F59E0B">
      <p>
        Natyv AI relies on trusted providers for hosting, database, AI models, communications, telephony, SMS,
        calendar, payment, analytics, CRM, and support workflows. We choose vendors based on capability, reliability,
        and security posture, then limit access to the data needed for the service.
      </p>
      <p>
        When customers connect third-party accounts, those providers' own terms and security practices also apply.
      </p>
    </LegalSection>

    <LegalSection title="Monitoring and Incident Response" accent="#EF4444">
      <LegalList>
        <li>Operational logging for reliability, troubleshooting, and security investigation.</li>
        <li>Monitoring for unexpected errors, abuse patterns, and service disruptions.</li>
        <li>Incident triage and customer communication when an issue materially affects customer data or service availability.</li>
        <li>Backups or platform recovery practices where supported by our infrastructure providers.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="Customer Responsibilities" accent="#06B6D4">
      <LegalList>
        <li>Use strong passwords and protect account access.</li>
        <li>Connect only phone numbers, calendars, CRMs, websites, and third-party accounts you are authorized to manage.</li>
        <li>Keep business policies, prices, hours, service areas, and escalation rules accurate.</li>
        <li>Review AI outputs and agent actions before relying on them for important business decisions.</li>
        <li>Tell us quickly if you suspect unauthorized access or a security issue.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="Report a Security Issue" accent="#1077FA">
      <p>
        Please report suspected vulnerabilities or security concerns to{" "}
        <a className="text-primary hover:underline" href="mailto:security@natyv.ai">security@natyv.ai</a>.
        Include the affected URL, a clear description, reproduction steps, and any relevant screenshots or logs.
      </p>
      <p>
        For privacy requests, use <Link className="text-primary hover:underline" to="/privacy">Privacy</Link>.
        For service rules, use <Link className="text-primary hover:underline" to="/terms">Terms</Link>.
      </p>
    </LegalSection>
  </LegalPageShell>
);

export default Security;
