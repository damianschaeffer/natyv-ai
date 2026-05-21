import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { LegalList, LegalPageShell, LegalSection } from "@/components/LegalPageShell";

const Terms = () => (
  <LegalPageShell
    title="Clear Terms."
    accentTitle="Real Work."
    eyebrow="Terms of Service"
    description="The rules for using Natyv AI, booking an assessment, and working with MyAgent-powered systems."
    canonicalPath="/terms"
    metaTitle="Terms of Service | Natyv AI"
    metaDescription="Natyv AI terms covering AI assessments, MyAgent services, SMS setup alerts, third-party integrations, payment, acceptable use, and liability."
    icon={FileText}
  >
    <LegalSection title="Last Updated" accent="#3B82F6">
      <p>May 21, 2026.</p>
      <p>
        These Terms apply to Natyv AI websites, AI Opportunity Assessments, consulting, implementation work,
        MyAgent-powered services, and related products operated by Natyv Ventures LLC.
      </p>
    </LegalSection>

    <LegalSection title="AI Opportunity Assessment" accent="#38BDF8">
      <p>
        The assessment is designed to identify which AI or automation opportunities should be built first, what
        should wait, and where the fastest payoff is likely to be. Booking an assessment call does not require
        payment today unless the booking flow explicitly states otherwise.
      </p>
      <LegalList>
        <li>The intake may be handled by an AI agent, a web call, a live consultation, or a combination of those steps.</li>
        <li>Assessment outputs may include a ranked roadmap, ROI assumptions, implementation notes, and build recommendations.</li>
        <li>You are responsible for reviewing the assumptions, numbers, and operational details used in any assessment.</li>
        <li>No assessment, estimate, or roadmap is a guarantee of revenue, savings, profit, ranking, conversion, or business outcome.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="Services and MyAgent" accent="#22C55E">
      <p>
        Natyv AI provides advisory, implementation, and AI-powered service systems. MyAgent can answer calls,
        collect lead information, schedule appointments, send follow-ups, create tasks, route issues, and perform
        configured workflow actions.
      </p>
      <LegalList>
        <li>You must be authorized to connect any phone number, calendar, email, CRM, website, or third-party account you provide.</li>
        <li>You are responsible for maintaining accurate business information, offer details, policies, prices, and availability.</li>
        <li>You are responsible for reviewing AI outputs and agent actions, especially before using them for legal, financial, medical, employment, or other high-impact decisions.</li>
        <li>AI services are not emergency services and should not be used where failure or delay could cause serious harm.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="SMS Messaging Terms" accent="#8B5CF6">
      <p>
        Program name: Natyv AI / MyAgent Setup Alerts. If you provide a phone number, you may receive
        transactional SMS messages related to setup, intake, assessment coordination, call forwarding, agent
        configuration, or service updates.
      </p>
      <LegalList>
        <li>Message frequency varies, typically 1-5 messages during setup or assessment coordination.</li>
        <li>Message and data rates may apply.</li>
        <li>Reply STOP to opt out. Reply HELP for help, or contact <a className="text-primary hover:underline" href="mailto:hello@natyv.ai">hello@natyv.ai</a>.</li>
        <li>Carriers are not liable for delayed or undelivered messages.</li>
        <li>SMS opt-in data and consent will not be shared with third parties for marketing or promotional purposes.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="Fees, Trials, and Payment" accent="#F59E0B">
      <p>
        Fees, billing terms, trial periods, cancellation terms, and implementation scopes are defined in the
        applicable order form, checkout, proposal, statement of work, or subscription plan.
      </p>
      <LegalList>
        <li>Paid assessments, builds, subscriptions, and usage-based services may be billed through third-party payment processors.</li>
        <li>Unless stated otherwise, implementation fees are due according to the accepted proposal or invoice.</li>
        <li>Third-party charges, including telephony, SMS, AI model, software, hosting, or integration costs, may apply separately.</li>
        <li>Past-due accounts may be paused, limited, or terminated after reasonable notice.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="Acceptable Use" accent="#EF4444">
      <LegalList>
        <li>Do not use the services for illegal, deceptive, abusive, harassing, discriminatory, or harmful activity.</li>
        <li>Do not send spam, violate telemarketing or messaging laws, impersonate others, or misrepresent caller identity.</li>
        <li>Do not attempt to bypass security controls, access another customer account, scrape the platform, or overload the service.</li>
        <li>Do not upload data you are not authorized to use or ask the system to violate another party's rights.</li>
      </LegalList>
    </LegalSection>

    <LegalSection title="Data, Security, and Connected Accounts" accent="#06B6D4">
      <p>
        Our data practices are described in the <Link className="text-primary hover:underline" to="/privacy">Privacy Policy</Link>.
        Our security practices are described on the <Link className="text-primary hover:underline" to="/security">Security</Link> page.
      </p>
      <p>
        If you connect third-party accounts, you authorize Natyv AI and MyAgent to access and act within the
        permission scope you grant. You can revoke access through the third-party provider or your account settings.
      </p>
    </LegalSection>

    <LegalSection title="Intellectual Property" accent="#3B82F6">
      <p>
        Natyv AI, MyAgent, our software, workflows, templates, designs, documentation, prompts, and implementation
        methods remain our property or the property of our licensors. You retain ownership of your business data,
        customer data, and content you provide.
      </p>
    </LegalSection>

    <LegalSection title="Disclaimers and Limitation of Liability" accent="#F97316">
      <p>
        The services are provided "as is" and "as available" to the fullest extent permitted by law. We do not
        guarantee uninterrupted service, error-free AI output, specific financial results, or that every call,
        message, task, or integration will complete successfully.
      </p>
      <p>
        To the fullest extent permitted by law, Natyv Ventures LLC will not be liable for indirect, incidental,
        special, consequential, exemplary, or punitive damages. Our total liability is limited to the amount paid
        for the relevant service during the 12 months before the claim.
      </p>
    </LegalSection>

    <LegalSection title="Governing Law and Contact" accent="#22C55E">
      <p>
        These Terms are governed by the laws of Florida, without regard to conflict-of-law principles. Questions
        can be sent to <a className="text-primary hover:underline" href="mailto:hello@natyv.ai">hello@natyv.ai</a>.
      </p>
    </LegalSection>
  </LegalPageShell>
);

export default Terms;
