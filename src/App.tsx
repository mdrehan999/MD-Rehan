import React from 'react';
import { 
  Shield, 
  Target, 
  Search, 
  Mail, 
  Zap, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen, 
  FileText,
  Layout,
  ChevronRight,
  Menu,
  X,
  Download,
  Presentation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

// --- Components ---

const AttackChainDiagram = () => (
  <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 my-8 font-mono text-sm overflow-x-auto">
    <div className="flex flex-col items-center space-y-4 min-w-[600px]">
      <div className="flex items-center justify-between w-full max-w-4xl">
        <div className="flex flex-col items-center w-32">
          <div className="p-3 bg-blue-100 border-2 border-blue-500 rounded-lg text-blue-700 font-bold">Recon</div>
          <div className="h-8 w-0.5 bg-slate-300"></div>
        </div>
        <div className="flex flex-col items-center w-32">
          <div className="p-3 bg-red-100 border-2 border-red-500 rounded-lg text-red-700 font-bold">Access</div>
          <div className="h-8 w-0.5 bg-slate-300"></div>
        </div>
        <div className="flex flex-col items-center w-32">
          <div className="p-3 bg-orange-100 border-2 border-orange-500 rounded-lg text-orange-700 font-bold">PrivEsc</div>
          <div className="h-8 w-0.5 bg-slate-300"></div>
        </div>
        <div className="flex flex-col items-center w-32">
          <div className="p-3 bg-purple-100 border-2 border-purple-500 rounded-lg text-purple-700 font-bold">Lateral</div>
          <div className="h-8 w-0.5 bg-slate-300"></div>
        </div>
        <div className="flex flex-col items-center w-32">
          <div className="p-3 bg-slate-800 border-2 border-slate-900 rounded-lg text-white font-bold">Exfil</div>
          <div className="h-8 w-0.5 bg-slate-300"></div>
        </div>
      </div>
      <div className="text-center text-slate-500 italic">
        [Passive OSINT] → [Phishing/Auth] → [Local Exploit] → [Network Pivot] → [Data Staging]
      </div>
    </div>
  </div>
);

const RiskMatrix = () => (
  <div className="overflow-x-auto my-8">
    <table className="w-full border-collapse border border-slate-300 text-sm">
      <thead>
        <tr className="bg-slate-100">
          <th className="border border-slate-300 p-3 text-left">Impact \ Likelihood</th>
          <th className="border border-slate-300 p-3 text-center bg-green-50">Low</th>
          <th className="border border-slate-300 p-3 text-center bg-yellow-50">Medium</th>
          <th className="border border-slate-300 p-3 text-center bg-red-50">High</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-slate-300 p-3 font-bold bg-slate-50">High</td>
          <td className="border border-slate-300 p-3 text-center bg-yellow-100">Medium Risk</td>
          <td className="border border-slate-300 p-3 text-center bg-orange-100">High Risk</td>
          <td className="border border-slate-300 p-3 text-center bg-red-200 font-bold">Critical Risk</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-3 font-bold bg-slate-50">Medium</td>
          <td className="border border-slate-300 p-3 text-center bg-green-100">Low Risk</td>
          <td className="border border-slate-300 p-3 text-center bg-yellow-100">Medium Risk</td>
          <td className="border border-slate-300 p-3 text-center bg-orange-100">High Risk</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-3 font-bold bg-slate-50">Low</td>
          <td className="border border-slate-300 p-3 text-center bg-green-50">Negligible</td>
          <td className="border border-slate-300 p-3 text-center bg-green-100">Low Risk</td>
          <td className="border border-slate-300 p-3 text-center bg-yellow-100">Medium Risk</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const UseCaseDiagram = () => (
  <div className="bg-white p-6 rounded-lg border border-slate-200 my-6 font-mono text-xs leading-relaxed">
    <pre>{`
[ Red Team Intern ]       [ Employee ]       [ IT Security ]
        |                      |                   |
        |---(1) Phishing Email-->|                   |
        |                      |                   |
        |                      |---(2) Clicks Link-->|
        |                      |                   |
        |                      |<--(3) Creds Input---|
        |                      |                   |
        |<--(4) Captured Data--|                   |
        |                      |                   |
        |                      |---(5) Reports? ---->|
        |                      |                   |
        |                      |                   |<--(6) Alert Triggered
    `}</pre>
  </div>
);

interface SectionRendererProps {
  section: Section;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => (
  <motion.section
    id={section.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="py-12 border-b border-slate-100 last:border-0"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-slate-900 text-white rounded-lg">
        {section.icon}
      </div>
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{section.title}</h2>
    </div>
    <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
      {section.content}
    </div>
  </motion.section>
);

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = React.useState('summary');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const sections: Section[] = [
    {
      id: 'summary',
      title: '1. Executive Summary',
      icon: <FileText size={20} />,
      content: (
        <>
          <p>
            This report details the activities and findings of a Red Team Internship focused on controlled lab-based simulations. 
            The objective of this project was to emulate realistic adversary behaviors within a strictly defined ethical framework 
            to identify security gaps in a fictional corporate environment, "Nexus Global Solutions."
          </p>
          <p>
            Throughout the internship, the focus remained on the <strong>Attack Lifecycle</strong>, starting from passive reconnaissance 
            to simulated data exfiltration. Key findings include the high effectiveness of social engineering as an initial access vector 
            and the critical importance of multi-layered defensive controls. This simulation serves as an academic demonstration of 
            how proactive offensive testing informs robust defensive strategies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-1">Primary Vector</h4>
              <p className="text-sm text-blue-800">Spear-Phishing Awareness Simulation</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <h4 className="font-bold text-red-900 mb-1">Key Risk</h4>
              <p className="text-sm text-red-800">Lack of Multi-Factor Authentication (MFA)</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-900 mb-1">Outcome</h4>
              <p className="text-sm text-green-800">15+ Defensive Recommendations Provided</p>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'intro',
      title: '2. Introduction',
      icon: <Layout size={20} />,
      content: (
        <>
          <h3 className="text-xl font-bold mt-4">Explanation of Red Teaming</h3>
          <p>
            Red Teaming is a full-scope, multi-layered attack simulation designed to measure how well a company's people and 
            networks can withstand an attack from a real-life adversary. Unlike traditional vulnerability assessments or 
            penetration tests, Red Teaming focuses on objectives (e.g., "access the HR database") rather than just identifying 
            unpatched software.
          </p>
          
          <h3 className="text-xl font-bold mt-6">Red Team vs Blue Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 border border-red-200 bg-red-50 rounded-xl">
              <h4 className="font-bold text-red-700 flex items-center gap-2 mb-2">
                <Target size={18} /> Red Team (Offensive)
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Emulates adversary tactics (TTPs)</li>
                <li>Tests detection and response times</li>
                <li>Exploits human and technical weaknesses</li>
                <li>Objective: Breach the perimeter</li>
              </ul>
            </div>
            <div className="p-5 border border-blue-200 bg-blue-50 rounded-xl">
              <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
                <Shield size={18} /> Blue Team (Defensive)
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Maintains security infrastructure</li>
                <li>Monitors for suspicious activity</li>
                <li>Responds to incidents and breaches</li>
                <li>Objective: Detect and neutralize threats</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-6">Importance of Ethical Lab-Based Simulations</h3>
          <p>
            In an academic and professional training context, lab simulations provide a "safe-to-fail" environment. 
            They allow practitioners to understand the mechanics of an attack without risking actual production data 
            or violating legal boundaries. Ethical simulations are the cornerstone of developing a "security-first" 
            mindset, bridging the gap between theoretical knowledge and practical application.
          </p>
        </>
      )
    },
    {
      id: 'scope',
      title: '3. Project Scope',
      icon: <Target size={20} />,
      content: (
        <>
          <h3 className="text-xl font-bold mt-4">Fictional Company Profile: Nexus Global Solutions</h3>
          <p>
            Nexus Global Solutions is a mid-sized logistics firm with 500 employees. They operate primarily in North America 
            and maintain a hybrid infrastructure (On-premise servers and Cloud-based SaaS applications). Their primary 
            assets include client shipping data, financial records, and proprietary logistics algorithms.
          </p>

          <h3 className="text-xl font-bold mt-6">Lab Infrastructure</h3>
          <p>The simulation was conducted in a virtualized environment consisting of:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Attacker Workstation:</strong> A Linux-based system equipped with OSINT tools and simulation scripts.</li>
            <li><strong>Target Workstation:</strong> A Windows 10 instance representing a standard employee desktop.</li>
            <li><strong>Directory Server:</strong> A simulated Active Directory environment for identity management.</li>
            <li><strong>Network Gateway:</strong> A virtual firewall and router to monitor traffic flow.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6">Rules of Engagement (RoE)</h3>
          <table className="w-full border-collapse border border-slate-200 my-4 text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-200 p-2 text-left">Category</th>
                <th className="border border-slate-200 p-2 text-left">Constraint</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-200 p-2 font-bold">Targeting</td>
                <td className="border border-slate-200 p-2">Only systems within the 10.0.5.0/24 subnet.</td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-2 font-bold">Techniques</td>
                <td className="border border-slate-200 p-2">No Denial of Service (DoS) or physical intrusion.</td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-2 font-bold">Data Handling</td>
                <td className="border border-slate-200 p-2">No real PII to be used; only synthetic data.</td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-2 font-bold">Ethical Boundary</td>
                <td className="border border-slate-200 p-2">All activities must be logged and reversible.</td>
              </tr>
            </tbody>
          </table>
        </>
      )
    },
    {
      id: 'recon',
      title: '4. Passive Reconnaissance Strategy',
      icon: <Search size={20} />,
      content: (
        <>
          <p>
            Passive reconnaissance is the phase where an attacker gathers information without directly interacting 
            with the target's systems. This minimizes the risk of detection by security monitoring tools.
          </p>

          <h3 className="text-xl font-bold mt-6">Types of Public Information Sought</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Employee Data:</strong> Names, job titles, and email formats found on LinkedIn or company "About Us" pages.</li>
            <li><strong>Technology Stack:</strong> Job postings often reveal the software and hardware used (e.g., "Experience with Cisco ASA" or "AWS management").</li>
            <li><strong>Domain Information:</strong> DNS records, subdomains, and historical WHOIS data.</li>
            <li><strong>Social Media Leaks:</strong> Photos of office badges or desks posted by employees.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6">Passive Reconnaissance Techniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-bold mb-2">Google Dorking</h4>
              <p className="text-sm">Using advanced search operators (e.g., <code>site:nexusglobal.com filetype:pdf</code>) to find leaked documents.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-bold mb-2">WHOIS & DNS Analysis</h4>
              <p className="text-sm">Reviewing public domain registration and mail server records (MX records) to identify email providers.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-6">Defensive Recommendations</h3>
          <p>
            To counter information exposure, organizations should implement <strong>Digital Footprint Monitoring</strong>. 
            This includes training employees on social media hygiene and ensuring that job descriptions do not reveal 
            specific version numbers of critical infrastructure.
          </p>
        </>
      )
    },
    {
      id: 'social',
      title: '5. Social Engineering Simulation',
      icon: <Mail size={20} />,
      content: (
        <>
          <p>
            Social engineering exploits the weakest link in any security chain: the human element. 
            In this simulation, we drafted a "harmless" phishing email to test employee awareness.
          </p>

          <div className="bg-slate-900 text-slate-100 p-6 rounded-xl my-6 shadow-lg border border-slate-700">
            <div className="text-xs text-slate-400 mb-4 uppercase tracking-widest font-bold">Simulated Phishing Email Template</div>
            <div className="space-y-2 font-mono text-sm">
              <p><span className="text-slate-500">From:</span> IT Support &lt;support@nexus-global-it.com&gt;</p>
              <p><span className="text-slate-500">Subject:</span> URGENT: Mandatory Password Security Update Required</p>
              <hr className="border-slate-700 my-4" />
              <p>Dear Employee,</p>
              <p>Our records show that your account has not yet been updated to the new security protocol. Failure to update by 5:00 PM today will result in a temporary account lockout.</p>
              <p>Please click the link below to verify your credentials and avoid service interruption:</p>
              <p className="text-blue-400 underline cursor-pointer">http://nexus-portal-verify.net/login</p>
              <p>Thank you for your cooperation.</p>
              <p>Nexus IT Security Team</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-6">Psychological Triggers Identified</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Urgency:</strong> "By 5:00 PM today" creates pressure to act without thinking.</li>
            <li><strong>Authority:</strong> Impersonating the "IT Security Team" leverages trust.</li>
            <li><strong>Fear:</strong> The threat of an "account lockout" motivates compliance.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6">Red Flags for Employees</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Mismatched Domain:</strong> The email comes from <code>nexus-global-it.com</code> instead of the official <code>nexusglobal.com</code>.</li>
            <li><strong>Generic Greeting:</strong> "Dear Employee" instead of a personalized name.</li>
            <li><strong>Suspicious Link:</strong> Hovering over the link reveals a non-company URL.</li>
          </ul>
        </>
      )
    },
    {
      id: 'chain',
      title: '6. Attack Chain Mapping',
      icon: <Zap size={20} />,
      content: (
        <>
          <p>
            The attack chain represents the logical progression an adversary takes to achieve their goal. 
            Understanding this flow is essential for building defensive depth.
          </p>
          
          <AttackChainDiagram />

          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-slate-900">1. Reconnaissance</h4>
              <p className="text-sm">Gathering intelligence on the target (OSINT, scanning).</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">2. Initial Access</h4>
              <p className="text-sm">Gaining a foothold (Phishing, exploiting a public-facing vulnerability).</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">3. Privilege Escalation</h4>
              <p className="text-sm">Gaining higher-level permissions (Admin/Root) on the compromised system.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">4. Lateral Movement</h4>
              <p className="text-sm">Moving from the initial system to other systems in the network to find the target data.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">5. Data Exfiltration</h4>
              <p className="text-sm">Stealing the sensitive information and sending it to an external server.</p>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'usecase',
      title: '7. Use Case Implementation',
      icon: <Activity size={20} />,
      content: (
        <>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Use Case: Simulated Credential Harvest</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold uppercase text-xs text-slate-500 tracking-widest mb-2">Objective</h4>
                <p className="text-sm">To demonstrate how a simple phishing page can capture valid corporate credentials in a lab setting.</p>
                
                <h4 className="font-bold uppercase text-xs text-slate-500 tracking-widest mt-6 mb-2">Actors</h4>
                <ul className="text-sm list-disc list-inside">
                  <li>Red Team Intern (Attacker)</li>
                  <li>Employee (Target)</li>
                  <li>IT Security Team (Monitor)</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-sm mb-2">Preconditions</h4>
                <ul className="text-xs space-y-1 text-slate-600">
                  <li>- Attacker has hosted a local web server.</li>
                  <li>- Target is logged into the lab network.</li>
                  <li>- No MFA is enabled on the target account.</li>
                </ul>
              </div>
            </div>

            <h4 className="font-bold mt-8 mb-4">Step-by-Step Implementation</h4>
            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs">1</span>
                <div>
                  <strong>Environment Setup:</strong> A basic HTML form was created to mimic the Nexus Global login portal. 
                  The form action was set to a local script that logs input to a text file.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs">2</span>
                <div>
                  <strong>Delivery:</strong> The phishing email (from Section 5) was "sent" to the target workstation via a simulated mail relay.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs">3</span>
                <div>
                  <strong>Interaction:</strong> The "Employee" actor clicked the link and entered synthetic credentials (<code>user: jdoe / pass: Summer2024!</code>).
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs">4</span>
                <div>
                  <strong>Capture:</strong> The attacker verified the receipt of credentials in the <code>harvest.log</code> file.
                </div>
              </li>
            </ol>

            <UseCaseDiagram />

            <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-1">Risk Impact Analysis</h4>
              <p className="text-sm text-yellow-700">
                A successful credential harvest allows an attacker to bypass the perimeter and act as a legitimate user. 
                This leads to unauthorized data access and potential lateral movement within the internal network.
              </p>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'risk',
      title: '8. Risk Analysis',
      icon: <AlertTriangle size={20} />,
      content: (
        <>
          <p>
            Risk is calculated as the product of Likelihood and Impact. In this simulation, we categorized the 
            identified threats to prioritize remediation efforts.
          </p>
          
          <RiskMatrix />

          <h3 className="text-xl font-bold mt-8">Highest Risk Scenario: Credential Theft via Phishing</h3>
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 mt-4">
            <p><strong>Likelihood:</strong> High (Human error is frequent and difficult to eliminate entirely).</p>
            <p><strong>Impact:</strong> High (Provides a direct path to sensitive internal data).</p>
            <p className="mt-4">
              <strong>Justification:</strong> While technical vulnerabilities can be patched, the human element remains 
              consistently exploitable. Without Multi-Factor Authentication (MFA), a single stolen password can 
              compromise the entire organizational security posture.
            </p>
          </div>
        </>
      )
    },
    {
      id: 'defensive',
      title: '9. Defensive Recommendations',
      icon: <Shield size={20} />,
      content: (
        <>
          <p>Based on the simulation findings, the following controls are recommended to enhance the security of Nexus Global Solutions.</p>

          <div className="space-y-6 mt-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Technical Controls</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-slate-600">
                  <li>Implement <strong>Multi-Factor Authentication (MFA)</strong> for all external-facing applications.</li>
                  <li>Enable <strong>Endpoint Detection and Response (EDR)</strong> to identify suspicious process behaviors.</li>
                  <li>Configure <strong>Email Filtering</strong> to block known malicious domains and attachments.</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Layout size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Administrative Controls</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-slate-600">
                  <li>Conduct regular <strong>Security Awareness Training</strong> for all employees.</li>
                  <li>Enforce a <strong>Principle of Least Privilege (PoLP)</strong> for user account permissions.</li>
                  <li>Establish a clear <strong>Incident Response Plan</strong> for reported phishing attempts.</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Activity size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Monitoring & Detection</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-slate-600">
                  <li>Implement <strong>SIEM (Security Information and Event Management)</strong> for centralized logging.</li>
                  <li>Monitor for <strong>Anomalous Login Patterns</strong> (e.g., logins from unusual locations or times).</li>
                  <li>Perform periodic <strong>Internal Vulnerability Scanning</strong>.</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'outcomes',
      title: '10. Learning Outcomes',
      icon: <BookOpen size={20} />,
      content: (
        <>
          <p>This internship project has provided significant insights into the operational realities of cybersecurity:</p>
          <ul className="space-y-4 mt-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>Adversarial Mindset:</strong> Learned to think like an attacker to better anticipate and defend against threats.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>Tool Proficiency:</strong> Gained hands-on experience with OSINT frameworks and virtualization technologies.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>Ethical Responsibility:</strong> Deepened understanding of the legal and ethical boundaries required in professional security testing.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>Communication:</strong> Improved the ability to translate complex technical risks into actionable business recommendations.</span>
            </li>
          </ul>
        </>
      )
    },
    {
      id: 'conclusion',
      title: '11. Conclusion',
      icon: <CheckCircle size={20} />,
      content: (
        <>
          <p>
            The Red Team Internship project successfully demonstrated the critical vulnerabilities inherent in modern corporate 
            environments, particularly the reliance on human vigilance. By simulating a controlled attack chain within a lab 
            environment, we identified that technical defenses alone are insufficient without robust administrative controls 
            and employee education.
          </p>
          <p className="mt-4">
            In conclusion, cybersecurity is not a static destination but a continuous process of testing, learning, and 
            improving. This project serves as a foundational step toward a career in offensive security, emphasizing that 
            the ultimate goal of the Red Team is to build a stronger, more resilient Blue Team.
          </p>
          <div className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
            <p>© 2026 Red Team Intern | Academic Project Submission | Confidential Lab Report</p>
          </div>
        </>
      )
    },
    {
      id: 'ppt',
      title: 'PPT Summary Section',
      icon: <Presentation size={20} />,
      content: (
        <div className="bg-slate-900 text-white p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 text-blue-400">Presentation Outline (Slide-by-Slide)</h3>
          <div className="space-y-4 text-sm">
            <div className="p-3 border border-slate-700 rounded-lg">
              <span className="text-blue-400 font-bold">Slide 1:</span> Title & Introduction (Red Team Intern Role)
            </div>
            <div className="p-3 border border-slate-700 rounded-lg">
              <span className="text-blue-400 font-bold">Slide 2:</span> Project Scope (Nexus Global Solutions & Lab Setup)
            </div>
            <div className="p-3 border border-slate-700 rounded-lg">
              <span className="text-blue-400 font-bold">Slide 3:</span> The Attack Chain (Visualizing the Adversary Path)
            </div>
            <div className="p-3 border border-slate-700 rounded-lg">
              <span className="text-blue-400 font-bold">Slide 4:</span> Social Engineering (The Phishing Simulation)
            </div>
            <div className="p-3 border border-slate-700 rounded-lg">
              <span className="text-blue-400 font-bold">Slide 5:</span> Use Case (Credential Harvest Implementation)
            </div>
            <div className="p-3 border border-slate-700 rounded-lg">
              <span className="text-blue-400 font-bold">Slide 6:</span> Risk Analysis (The Risk Matrix)
            </div>
            <div className="p-3 border border-slate-700 rounded-lg">
              <span className="text-blue-400 font-bold">Slide 7:</span> Defensive Recommendations (The Path Forward)
            </div>
            <div className="p-3 border border-slate-700 rounded-lg">
              <span className="text-blue-400 font-bold">Slide 8:</span> Conclusion & Q&A
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* --- Header --- */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Shield className="text-slate-900" size={24} />
          <h1 className="font-bold text-lg tracking-tight hidden sm:block">Red Team Project Report</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Print PDF</span>
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* --- Main Layout --- */}
      <div className="pt-16 flex">
        {/* --- Sidebar --- */}
        <aside className={`
          fixed inset-y-0 left-0 w-72 bg-slate-50 border-r border-slate-100 pt-16 z-40
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="p-4 h-full overflow-y-auto">
            <div className="mb-6 px-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Report Sections</p>
            </div>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleScroll(section.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${activeSection === section.id 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'}
                    `}
                  >
                    {React.cloneElement(section.icon as React.ReactElement, { size: 16 })}
                    <span className="truncate">{section.title}</span>
                    {activeSection === section.id && <ChevronRight size={14} className="ml-auto" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* --- Content --- */}
        <main className="flex-1 lg:ml-72 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* --- Cover Page Style Header --- */}
            <div className="mb-20 text-center">
              <div className="inline-block p-4 bg-slate-900 text-white rounded-2xl mb-6">
                <Shield size={48} />
              </div>
              <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">
                Red Team Internship <br />
                <span className="text-slate-400">Project Report</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                A detailed academic submission exploring controlled lab simulations, 
                adversary emulation, and defensive security architecture.
              </p>
              
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-left border-y border-slate-100 py-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Role</p>
                  <p className="text-sm font-bold">Red Team Intern</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Environment</p>
                  <p className="text-sm font-bold">Controlled Lab</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Evaluation</p>
                  <p className="text-sm font-bold">80 Marks Project</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                  <p className="text-sm font-bold">March 2026</p>
                </div>
              </div>
            </div>

            {/* --- Sections --- */}
            <div className="space-y-4">
              {sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* --- Mobile Overlay --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
