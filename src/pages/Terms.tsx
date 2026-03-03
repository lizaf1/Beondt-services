import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/ui/Section';

export default function Terms() {
  return (
    <Layout>
      <div className="bg-brand-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-300">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      <Section className="bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg prose-brand">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Anhui Beyondt Technology Co., Ltd. ("BEONDT Sourcing") provides users with access to a rich collection of resources, including various communications tools, search services, and personalized content through its network of properties which may be accessed through any various medium or device now known or hereafter developed (the "Service"). You also understand and agree that the Service may include advertisements and that these advertisements are necessary for BEONDT Sourcing to provide the Service.
          </p>

          <h2>3. Intellectual Property Rights</h2>
          <p>
            The Site and its original content, features, and functionality are owned by BEONDT Sourcing and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            You agree to not use the Service to:
          </p>
          <ul>
            <li>Upload, post, email, transmit or otherwise make available any content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable.</li>
            <li>Harm minors in any way.</li>
            <li>Impersonate any person or entity, including, but not limited to, a BEONDT Sourcing official, forum leader, guide or host, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
            <li>Forge headers or otherwise manipulate identifiers in order to disguise the origin of any content transmitted through the Service.</li>
            <li>Upload, post, email, transmit or otherwise make available any content that you do not have a right to make available under any law or under contractual or fiduciary relationships.</li>
          </ul>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            You expressly understand and agree that:
          </p>
          <ul>
            <li>Your use of the service is at your sole risk. The service is provided on an "as is" and "as available" basis. BEONDT Sourcing expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement.</li>
            <li>BEONDT Sourcing makes no warranty that (i) the service will meet your requirements, (ii) the service will be uninterrupted, timely, secure, or error-free, (iii) the results that may be obtained from the use of the service will be accurate or reliable, (iv) the quality of any products, services, information, or other material purchased or obtained by you through the service will meet your expectations, and (v) any errors in the software will be corrected.</li>
          </ul>

          <h2>6. Limitation of Liability</h2>
          <p>
            You expressly understand and agree that BEONDT Sourcing shall not be liable to you for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses (even if BEONDT Sourcing has been advised of the possibility of such damages), resulting from: (i) the use or the inability to use the service; (ii) the cost of procurement of substitute goods and services resulting from any goods, data, information or services purchased or obtained or messages received or transactions entered into through or from the service; (iii) unauthorized access to or alteration of your transmissions or data; (iv) statements or conduct of any third party on the service; or (v) any other matter relating to the service.
          </p>

          <h2>7. Modifications to Service</h2>
          <p>
            BEONDT Sourcing reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that BEONDT Sourcing shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the People's Republic of China, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>

          <h2>9. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at Info@beondt.net.
          </p>
        </div>
      </Section>
    </Layout>
  );
}
