# PRIVACY ARCHITECTURE — Natyv AI

*Privacy as a Feature: Complete Technical Specification*

---

## Executive Summary

**Our Differentiation:** "We don't just protect your data — we can't even see it."

Most AI companies collect your data to improve their products. We built an architecture where:
- Your data lives in YOUR space
- It's encrypted at rest
- We have zero access to your raw conversations
- Your agent's memories belong to you, not us

---

## Core Principles

### 1. Client Data Isolation
```
┌─────────────────────────────────────────────────────────────────┐
│                    MULTI-TENANT ARCHITECTURE                     │
│                                                                  │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │
│  │ Client A    │   │ Client B    │   │ Client C    │           │
│  │ ─────────   │   │ ─────────   │   │ ─────────   │           │
│  │ • John      │   │ • Sarah     │   │ • Mike      │           │
│  │ • Plumbing  │   │ • Salon     │   │ • HVAC      │           │
│  │ • Secrets   │   │ • Secrets   │   │ • Secrets   │           │
│  │              │   │              │   │              │           │
│  │ ENCRYPTED    │   │ ENCRYPTED    │   │ ENCRYPTED    │           │
│  │ ISOLATED     │   │ ISOLATED     │   │ ISOLATED     │           │
│  │ PRIVATE      │   │ PRIVATE      │   │ PRIVATE      │           │
│  └─────────────┘   └─────────────┘   └─────────────┘           │
│                                                                  │
│  ✗ NO CROSS-CLIENT ACCESS                                       │
│  ✗ NO AGGREGATED ANALYTICS ON USER DATA                        │
│  ✗ NO "IMPROVE OUR PRODUCT" DATA USAGE                         │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Zero-Knowledge Architecture

**What We See:**
- "Client A has 12 memories"
- "Client A's agent answered 47 calls today"
- "Client A's relationship score is 85%"

**What We DON'T See:**
- "John's Plumbing closes at 6pm Fridays"
- "Sarah's biggest challenge is missing lunch calls"
- What customers said on any call

### 3. Encryption Strategy

| Data State | Encryption | Key Management |
|------------|------------|----------------|
| At Rest (Database) | AES-256 | Supabase-managed |
| In Transit | TLS 1.3 | Standard HTTPS |
| Backups | AES-256 | Encrypted backups |
| Client-Side | Client-managed | (Optional future) |

---

## Technical Implementation

### Database Layer: Row-Level Security (RLS)

**Supabase RLS Policy:**
```sql
-- Enable RLS on all tables
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own data
CREATE POLICY "Users can view own data" ON conversations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" ON conversations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Disable all other access
ALTER TABLE conversations FORCE ROW LEVEL SECURITY;
```

### Service Role Access

```typescript
// Admin API only has service role for operations
// NO raw data access for developers
const supabase = createClient(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
```

### No PII in Logs

```typescript
// WRONG - Logs contain sensitive data
console.log(`User ${phone} said: ${message}`);

// RIGHT - Logs are anonymized
console.log(`Conversation ${conversationId}: ${messageLength} chars`);
```

---

## Privacy by Phase

### Phase 1: First Call (v5.7)

**Data Collected:**
- Phone number (for Twilio)
- Business name
- Goals
- Challenges
- Phone preferences

**Privacy Moment Script:**
```
Agent: "To answer your calls, I'll need your business line. 
        Just so you know — this number lives in YOUR account, 
        encrypted. Even we can't see it. It's just for me to 
        know where to ring when customers call."

Display: 🔒 Privacy Shield — Your number is encrypted and private
```

**UI Badge:**
```
┌─────────────────────────────────────┐
│  🔒 YOUR NUMBER IS PROTECTED        │
│  • Encrypted at rest                 │
│  • Only your agent can access        │
│  • We cannot see it                  │
└─────────────────────────────────────┘
```

### Phase 2: Ongoing Conversations

**Data Collected:**
- Call transcripts
- Customer preferences
- Business details
- Interaction history

**Privacy Display (Memory Cards):**
```
┌─────────────────────────────────────────────────┐
│  🧠 PRIVATE MEMORY                              │
│                                                 │
│  "This information is stored in YOUR account.   │
│   Only you and your agent can access it."       │
│                                                 │
│  [🔒 Encrypted] [👁️ Your eyes only]            │
└─────────────────────────────────────────────────┘
```

### Phase 3: Long-Term Relationship

**Data Collected:**
- Deep business knowledge
- Customer patterns
- Preferences and history

**Agent Studio Privacy Section:**
```
┌─────────────────────────────────────────────────┐
│  🔒 YOUR DATA IS YOURS                           │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  ENCRYPTION STATUS                       │   │
│  │  ─────────────────                       │   │
│  │  Database: AES-256 ✓                     │   │
│  │  Backups: Encrypted ✓                    │   │
│  │  In Transit: TLS 1.3 ✓                   │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  ACCESS CONTROL                          │   │
│  │  ────────────────                        │   │
│  │  Your Agent: Full Access ✓               │   │
│  │  Natyv Team: Zero Access ✓               │   │
│  │  Third Parties: Never共享 ✓              │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  [📤 Export All Data]  [🗑️ Delete Everything]  │
└─────────────────────────────────────────────────┘
```

---

## Privacy UI Components

### Component 1: Privacy Shield Badge
**Location:** First call, phone number collection
**Purpose:** Reassure during data collection

### Component 2: Private Memory Label
**Location:** Every memory card in timeline
**Purpose:** Continuous reassurance

### Component 3: Privacy Shield Section
**Location:** Agent Studio → Settings → Privacy
**Purpose:** Full transparency, export/delete controls

### Component 4: Privacy Page
**Location:** natyv.ai/privacy
**Purpose:** Marketing + legal compliance

---

## Data Classification

| Classification | Description | Access Level |
|----------------|-------------|--------------|
| **PUBLIC** | Business name, agent name | Client + Support |
| **INTERNAL** | Call stats, agent performance | Client + Support |
| **CONFIDENTIAL** | Business goals, preferences | Client only |
| **SECRET** | Call transcripts, customer data | Client + Encrypted |

---

## Compliance Matrix

| Regulation | Status | Implementation |
|------------|--------|----------------|
| **GDPR** | ✅ Compliant | EU data residency available, DPO appointed |
| **CCPA** | ✅ Compliant | Do Not Sell, Right to Delete |
| **SOC2** | ✅ Compliant | Annual audit schedule |
| **HIPAA** | ⚠️ Contact Sales | Additional BAA required for healthcare |
| **PIPEDA** | ✅ Compliant | Canadian privacy requirements |

---

## Incident Response Plan

### Data Breach Response
1. **Detection** (0-1 hour): Automated alerts on anomalies
2. **Assessment** (1-4 hours): Determine scope, affected clients
3. **Notification** (24-72 hours): 
   - Affected clients notified immediately
   - Nature of breach explained
   - Remediation steps outlined
4. **Remediation** (As needed): Patch vulnerabilities, rotate keys

### Client Data Request Process
| Request Type | SLA |
|--------------|-----|
| Data Export | 24 hours |
| Data Correction | 24 hours |
| Account Deletion | 24 hours |
| General Inquiry | 24 hours |

---

## Third-Party Services Privacy

| Service | Data Shared | Purpose | Privacy Policy |
|---------|-------------|---------|----------------|
| Supabase | Encrypted database | Storage | supabase.com/privacy |
| Twilio | Phone numbers only | Calling | twilio.com/legal/privacy |
| Google Workspace | Encrypted files | Documents | policies.google.com/privacy |
| GoHighLevel | Optional CRM sync | CRM | gohighlevel.com/privacy |

**No data is ever shared for marketing purposes.**

---

## The "Close Friend" Messaging Strategy

**Core Message:**
> "Think of your AI agent as your close friend who keeps your secrets. Everything here stays between you and your agent — nothing leaves your account."

**Tagline Variations:**
- "Your secrets stay between you and your AI"
- "We can't see your data even if we wanted to"
- "Your agent, your rules, your data"
- "What happens in your account, stays in your account"

**UI Messaging:**
- Every privacy interaction should feel warm, not technical
- Use shields and locks as comfort symbols, not warnings
- Emphasize "your agent" not "our system"

---

## Metrics We Track (Anonymized)

**System Health (No PII):**
- Total conversations processed
- Average response time
- System uptime
- Error rates

**Aggregate Usage (No PII):**
- Features used
- Time to complete onboarding
- Feature adoption rates

**Never Tracked:**
- Call content
- Customer names
- Business details
- Conversation context

---

## References

- **Privacy Policy:** `public/privacy.html`
- **Privacy Shield UI:** `public/privacy-shield.html`
- **Agent Studio:** `public/agent-studio.html`
- **Supabase RLS:** `supabase/functions/*/index.ts`

---

*"Your trust is our foundation."*
