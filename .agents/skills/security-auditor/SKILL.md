---
name: security-auditor
description: Perform comprehensive security audit of a repository with detailed findings and step-by-step PoCs. Reports all web and API security vulnerabilities.
disable-model-invocation: false
argument-hint: '[--path <directory>] [--focus <category>]'
allowed-tools: Task, Bash, Grep, Glob, Read, Write
---

# Security Audit

Perform a comprehensive security audit of a repository, identifying web and API security vulnerabilities with practical exploitation steps and detailed proof-of-concept demonstrations.

## Arguments

- `--path <directory>` (optional): Path to the repository to audit. Defaults to current directory.
- `--focus <category>` (optional): Focus on specific security category (e.g., `injection`, `auth`, `api`, `crypto`, `logic`). Defaults to all categories.

## Process

### 1. Initialize Audit

Determine the audit scope and target directory:

```bash
# If --path is provided, use it; otherwise use current directory
TARGET_PATH=$(echo "$ARGUMENTS" | grep -oP '(?<=--path\s)\S+' || pwd)
FOCUS_AREA=$(echo "$ARGUMENTS" | grep -oP '(?<=--focus\s)\S+' || echo "all")
```

Create audit report filename with timestamp:

```bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_FILE="${TARGET_PATH}/security-audit-report-${TIMESTAMP}.md"
```

### 2. Technology Stack Detection

Identify the technology stack to tailor the security audit:

Use Glob and Read tools to detect:

- **Backend frameworks**: Express, FastAPI, Spring Boot, Django, Rails, Next.js, etc.
- **Frontend frameworks**: React, Vue, Angular
- **Database technologies**: MongoDB, PostgreSQL, MySQL, Redis
- **Authentication systems**: JWT, OAuth, NextAuth, Passport.js, custom auth
- **Cloud/Infrastructure**: AWS SDK, Docker, Kubernetes configs
- **Package managers**: package.json, requirements.txt, go.mod, Gemfile

Document the detected stack in the report.

### 3. Deep Security Analysis

Launch specialized security agents for comprehensive vulnerability discovery:

#### A. Application Security Review (security-auditor agent)

Use the Task tool with `subagent_type: security-auditor` and `model: opus` to perform:

1. **Injection Vulnerabilities**

   - SQL Injection (SQLi)
   - NoSQL Injection
   - Command Injection
   - Code Injection
   - LDAP Injection
   - XPath Injection
   - Template Injection (SSTI)

2. **Authentication & Authorization Flaws**

   - Broken authentication mechanisms
   - Weak password policies
   - JWT vulnerabilities (weak secrets, algorithm confusion, missing expiration)
   - OAuth/OIDC misconfigurations
   - Session fixation and hijacking
   - Missing or improper authorization checks
   - Privilege escalation paths
   - IDOR (Insecure Direct Object References)

3. **Cross-Site Vulnerabilities**

   - Cross-Site Scripting (XSS) - stored, reflected, DOM-based
   - Cross-Site Request Forgery (CSRF)
   - Cross-Origin Resource Sharing (CORS) misconfigurations
   - Clickjacking vulnerabilities

4. **Data Exposure**

   - Sensitive data in logs
   - Exposed credentials in code or config files
   - API keys and secrets in repositories
   - Information disclosure through error messages
   - Missing encryption for sensitive data
   - Insecure data transmission

5. **Security Misconfigurations**

   - Default credentials
   - Unnecessary features enabled
   - Verbose error messages
   - Missing security headers
   - Insecure file permissions
   - Misconfigured cloud storage
   - Debug mode in production

6. **Business Logic Vulnerabilities**
   - Race conditions
   - Payment/pricing manipulation
   - Workflow bypasses
   - Mass assignment vulnerabilities
   - Insufficient anti-automation
   - Trust boundary violations

#### B. Deep Vulnerability Research (deep-vuln-researcher agent)

Use the Task tool with `subagent_type: deep-vuln-researcher` and `model: opus` to discover:

1. **Complex Logic Vulnerabilities**

   - State machine vulnerabilities
   - Time-of-check to time-of-use (TOCTOU)
   - Async race conditions
   - GraphQL security issues (query depth, batching attacks)
   - API rate limiting bypasses

2. **Advanced Injection Techniques**

   - Prototype pollution (Node.js)
   - Server-Side Request Forgery (SSRF)
   - XXE (XML External Entity) attacks
   - Deserialization vulnerabilities
   - Path traversal and LFI/RFI

3. **Cryptographic Weaknesses**

   - Weak encryption algorithms
   - Improper key management
   - Insufficient randomness
   - Hash collision vulnerabilities
   - Timing attacks

4. **API Security Issues**

   - Broken object level authorization (BOLA)
   - Broken function level authorization (BFLA)
   - Mass assignment
   - Excessive data exposure
   - Lack of resources & rate limiting
   - Security misconfiguration in APIs
   - Improper asset management

5. **Container & Infrastructure**
   - Docker misconfigurations
   - Kubernetes security issues
   - AWS/Cloud misconfigurations
   - Environment variable leakage
   - Secrets in container images

### 4. Generate Proof-of-Concepts

For each vulnerability discovered, create a detailed PoC including:

1. **Vulnerability Description**: Clear explanation of the security flaw
2. **Location**: Exact file paths and line numbers
3. **Severity**: Critical / High / Medium / Low (based on CVSS or custom criteria)
4. **Impact**: Real-world consequences of exploitation
5. **Reproduction Steps**: Detailed step-by-step instructions
6. **Code Snippet**: The vulnerable code section
7. **Exploit PoC**: Working proof-of-concept with example payloads
8. **Remediation**: Specific fix recommendations with secure code examples

### 5. Generate Security Report

Create a comprehensive markdown report with the following structure:

````markdown
# Security Audit Report

**Repository:** [repository name]
**Audit Date:** [date]
**Auditor:** Claude Security Auditor
**Scope:** [all/focused category]

---

## Executive Summary

[Brief overview of audit findings, total vulnerabilities by severity]

### Key Statistics

- **Critical:** X findings
- **High:** X findings
- **Medium:** X findings
- **Low:** X findings
- **Informational:** X findings

### Most Critical Issues

1. [Issue 1 with severity]
2. [Issue 2 with severity]
3. [Issue 3 with severity]

---

## Technology Stack

[Detected frameworks, libraries, and infrastructure]

---

## Detailed Findings

### [SEVERITY-001] [Vulnerability Title]

**Severity:** Critical/High/Medium/Low
**Category:** [e.g., Injection, Authentication, etc.]
**CWE:** [CWE number if applicable]
**CVSS Score:** [if applicable]

#### Description

[Detailed explanation of the vulnerability]

#### Location

- **File:** `path/to/file.js`
- **Line:** 42-55
- **Function/Method:** `vulnerableFunction()`

#### Impact

[Real-world impact - what can an attacker achieve?]

- Data breach potential
- Unauthorized access
- System compromise
- etc.

#### Vulnerable Code

```javascript
// Vulnerable code snippet
const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
db.query(query);
```
````

#### Proof of Concept

**Step 1:** [Setup/Prerequisites]

```bash
# Commands or setup needed
```

**Step 2:** [Exploitation]

```bash
# Exploit payload
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -d '{"id": "1 OR 1=1; DROP TABLE users;--"}'
```

**Step 3:** [Verification]

```bash
# How to verify the exploit worked
```

**Expected Result:**

```
[What happens when exploited]
```

#### Remediation

**Recommended Fix:**

```javascript
// Secure code example
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [req.params.id]);
```

**Additional Recommendations:**

- Use parameterized queries
- Implement input validation
- Add proper error handling
- etc.

---

[Repeat for each finding]

---

## Security Best Practices Recommendations

### Immediate Actions Required

1. [Critical fixes needed immediately]

### Short-term Improvements

1. [Important improvements to implement soon]

### Long-term Security Strategy

1. [Architectural improvements and security practices]

---

## Compliance & Standards

[If applicable, map findings to compliance frameworks:]

- OWASP Top 10 coverage
- OWASP API Security Top 10
- PCI DSS considerations
- GDPR implications

---

## Appendix

### Testing Methodology

[Description of the audit process and tools used]

### References

- [Relevant CVEs, security advisories]
- [OWASP references]
- [Framework-specific security guides]

### Glossary

[Definition of security terms used in the report]

````

Save this report to the file determined in step 1.

### 6. Output Summary

After completing the audit, provide a summary:

```markdown
✅ Security audit completed successfully

📄 **Report:** `[path to report file]`

📊 **Summary:**
- Critical: X
- High: X
- Medium: X
- Low: X

🔴 **Action Required:** [List 3 most critical issues]

The detailed report includes:
- Comprehensive vulnerability analysis
- Step-by-step exploitation PoCs
- Specific remediation guidance
- Security best practices recommendations
````

## Guidelines

### Model Selection

**IMPORTANT:** Always use `model: opus` when invoking security agents via the Task tool. Opus 4.6 provides the highest quality analysis and is essential for:

- Detecting subtle logic vulnerabilities
- Generating accurate and exploitable PoCs
- Minimizing false positives
- Ensuring comprehensive coverage

Example Task invocation:

```
Task tool with:
- subagent_type: security-auditor
- model: opus
- prompt: [detailed security audit instructions]
```

### Severity Classification

**Critical:**

- Remote code execution
- Authentication bypass
- SQL injection leading to data breach
- Exposed secrets/credentials with high privileges
- Critical business logic flaws

**High:**

- Privilege escalation
- IDOR allowing access to sensitive data
- XSS in high-value contexts
- Authorization bypass
- Cryptographic failures with data exposure

**Medium:**

- CSRF on state-changing operations
- Information disclosure of sensitive data
- Security misconfigurations with moderate impact
- Business logic issues with limited impact
- Missing security headers

**Low:**

- Information disclosure (non-sensitive)
- Security headers on static content
- Minor configuration issues
- Best practice violations

**Informational:**

- Code quality improvements
- Defense-in-depth suggestions
- Security awareness recommendations

### Focus Areas by Technology

**Node.js/Express:**

- Prototype pollution
- ReDoS (Regular Expression Denial of Service)
- Package vulnerabilities (npm audit)
- Express middleware security

**Python/Django/FastAPI:**

- SSTI (Server-Side Template Injection)
- Pickle deserialization
- Django ORM injection
- Package vulnerabilities (pip)

**Java/Spring Boot:**

- Deserialization vulnerabilities
- Spring Expression Language injection
- XXE in XML parsers
- Log4j-style vulnerabilities

**MongoDB/NoSQL:**

- NoSQL injection
- Missing access controls
- Unprotected admin interfaces

**JWT/Authentication:**

- Algorithm confusion (alg: none)
- Weak signing keys
- Missing expiration validation
- Token leakage

**APIs:**

- BOLA/IDOR in API endpoints
- Mass assignment
- Excessive data exposure
- Missing rate limiting

### Testing Scope

**Include:**

- All source code files
- Configuration files
- Infrastructure as Code (IaC)
- Environment variable templates
- Docker/Kubernetes configs
- CI/CD pipeline configurations
- Database schemas and migrations

**Exclude:**

- Third-party libraries (note if vulnerable versions detected)
- Minified/compiled code
- Test fixtures (unless they expose patterns used in production)

### Report Quality Standards

1. **No False Positives**: Every finding must be verified and exploitable
2. **Practical PoCs**: All exploits must include working reproduction steps
3. **Actionable Remediation**: Provide specific code fixes, not just generic advice
4. **Context Awareness**: Consider the actual deployment context and risk
5. **Clear Communication**: Write for both technical and non-technical audiences

### Ethics and Responsible Disclosure

- This tool is for authorized security testing only
- Only scan repositories you own or have permission to test
- Do not execute exploits against production systems without authorization
- Handle discovered vulnerabilities responsibly
- Follow responsible disclosure practices for third-party issues

## Examples

### Example 1: Full audit of current directory

```
/security-auditor
```

### Example 2: Audit specific directory

```
/security-auditor --path /path/to/repo
```

### Example 3: Focus on injection vulnerabilities

```
/security-auditor --focus injection
```

### Example 4: Focus on authentication issues

```
/security-auditor --path ./backend --focus auth
```

## Notes

- The audit may take several minutes depending on repository size
- Progress updates will be shown during the scan
- The report file will be created in the target directory
- Review the report thoroughly and prioritize fixes by severity
- Consider running the audit regularly (e.g., before major releases)
- Integrate findings into your security development lifecycle
