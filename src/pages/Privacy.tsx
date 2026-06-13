import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { LegalList, LegalPageShell, LegalSection } from "@/components/LegalPageShell";

const Privacy = () => (
  <LegalPageShell
    title="Privacy."
    accentTitle="Built In."
    eyebrow="Privacy Policy"
    description="Plain-English privacy practices for Natyv AI, our AI Opportunity Assessment, and MyAgent-powered services."
    canonicalPath="/privacy"
    metaTitle="Privacy Policy | Natyv AI"
    metaDescription="Natyv AI privacy policy covering assessment intake, MyAgent services, call data, SMS consent, Google data, security practices, and your privacy rights."
    icon={Shield}
  >
    <LegalSection title="Last Updated" accent="#3B82F6">
      <p>May 21, 2026.</p>
      <p>
        Natyv AI and MyAgent are operated by Natyv Ventures LLC. This policy explains how we collect, use,
        protect, and retain information when you use our website, book an AI Opportunity Assessment, interact
        with our AI agents, or become a MyAgent customer.
      </p>
    </LegalSection>

    <LegalSection title="Your Data Belongs to You" accent="#22C55E">
      <p>
        We built Natyv AI around the same principle used on MyAgent: your data stays your data. We do not sell
        your personal information, and we do not use your customer conversations, business records, or assessment
        intake answers to train models for other customers.
      </p>
      <p>
        Authorized Natyv operators may access account, conversation, or assessment data only when needed to
        deliver the service, handle support, improve quality, resolve escalations, or protect the platform.
      </p>
    </LegalSection>

    <LegalSection title="Information We Collect" accent="#38BDF8">
      <LegalList>
        <li>Contact details, including your name, email, phone number, company name, and business role.</li>
        <li>Business context you provide through forms, calendar bookings, assessment calls, AI intake calls, or demos.</li>
        <li>Operational details needed to scope automation work, such as call volume, missed leads, scheduling workflows, software stack, and follow-up process.</li>
        <li>MyAgent service data, including agent configuration, call transcripts, call recordings when enabled, SMS records, lead notes, tasks, and connected workflow data.</li>
        <li>Technical data such as device, browser, IP address, pages visited, usage logs, diagnostics, and security events.</li>
        <li>Billing and payment records processed through payment providers when you purchase an assessment, build, subscription, or service.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="How We Use Information" accent="#3B82F6">
      <LegalList>
        <li>To deliver AI Opportunity Assessments, roadmap recommendations, and implementation proposals.</li>
        <li>To configure, operate, support, and improve MyAgent voice agents and Natyv automation services.</li>
        <li>To answer questions, schedule calls, send service updates, and provide onboarding or support.</li>
        <li>To monitor reliability, security, abuse prevention, quality assurance, and platform performance.</li>
        <li>To comply with legal, contractual, accounting, tax, and regulatory obligations.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="SMS Messaging and Consent" accent="#8B5CF6">
      <p>
        If you provide your phone number, you may receive transactional SMS messages related to account setup,
        assessment scheduling, call forwarding, agent configuration, service notifications, or support.
      </p>
      <LegalList>
        <li>Message frequency varies, typically 1-5 messages during setup or assessment coordination.</li>
        <li>Message and data rates may apply depending on your carrier and plan.</li>
        <li>Reply STOP to opt out. Reply HELP for help, or email <a className="text-primary hover:underline" href="mailto:hello@natyv.ai">hello@natyv.ai</a>.</li>
        <li>Carriers are not liable for delayed or undelivered messages.</li>
        <li>SMS opt-in data, consent, phone numbers, and messaging preferences are not shared with third parties or affiliates for marketing or promotional purposes.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="Google and Connected Account Data" accent="#F59E0B">
      <p>
        If you connect Google Calendar, Contacts, Drive, or another third-party account to MyAgent, we request
        only the permissions needed for the feature you enable. For example, an agent may check availability,
        create calendar events, recognize contacts, or read selected files you choose to share.
      </p>
      <p>
        OAuth tokens are encrypted at rest. You can revoke Google access from your Google Account settings or
        disconnect integrations in your MyAgent settings. Our use and transfer of information received from
        Google APIs is intended to comply with the Google API Services User Data Policy, including Limited Use
        requirements.
      </p>
    </LegalSection>

    <LegalSection title="Natyv AI Social Publishing Apps" accent="#0EA5E9">
      <p>
        Mission Control Publisher and Natyv AI Community Publisher are Natyv AI-operated apps used by authorized
        Natyv AI administrators to connect official Natyv AI social media accounts and publish or schedule
        human-approved Natyv AI content.
      </p>
      <p>
        When those apps are connected to platforms such as TikTok, LinkedIn, X, YouTube, Instagram, or Facebook,
        we may receive account identifiers, display names, usernames, profile or organization identifiers, access
        tokens, refresh tokens, granted permission scopes, post metadata, media identifiers, publishing status,
        and error or audit records needed to verify and operate social posting. We use this information only to
        authenticate the connected account, prepare previews, publish approved content, verify delivery, maintain
        security, and troubleshoot platform issues. We do not sell this information or share it with third parties
        for advertising or promotional purposes.
      </p>
    </LegalSection>

    <LegalSection title="How We Share Information" accent="#EF4444">
      <p>
        We share data only with service providers and processors needed to operate the business, such as hosting,
        database, AI model, telephony, SMS, calendar, analytics, payment, support, and CRM providers. Those
        providers may process information only for the service we ask them to perform.
      </p>
      <p>
        We may also disclose information if required by law, to protect Natyv AI, MyAgent, customers, or the public,
        or as part of a merger, acquisition, financing, or sale of business assets.
      </p>
    </LegalSection>

    <LegalSection title="Security and Retention" accent="#06B6D4">
      <p>
        We use technical and organizational safeguards including encryption in transit, encryption at rest where
        supported, access controls, row-level access patterns where applicable, audit logging, and least-privilege
        access. More detail is available on our <Link className="text-primary hover:underline" to="/security">Security</Link> page.
      </p>
      <p>
        We retain information for as long as needed to provide services, comply with legal obligations, resolve
        disputes, enforce agreements, and maintain business records. You may request deletion, subject to legal
        retention requirements and active service obligations.
      </p>
    </LegalSection>

    <LegalSection title="Your Rights" accent="#22C55E">
      <p>
        Depending on where you live, you may have rights to access, correct, delete, export, or restrict use of
        your personal information. California, EU, UK, and other privacy laws may provide additional rights.
      </p>
      <p>
        To make a privacy request, email <a className="text-primary hover:underline" href="mailto:privacy@natyv.ai">privacy@natyv.ai</a>.
        We may need to verify your identity before completing a request.
      </p>
    </LegalSection>
  </LegalPageShell>
);

export default Privacy;
