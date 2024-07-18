"use client";

import { useEffect, useState } from "react";
import PageRightHeader from "@/components/PageRightHeader";

export default function TermsAndConditions() {
  const [viewportWidth, setViewportWidth] = useState(null);

  useEffect(() => {
    setViewportWidth(window.innerWidth);
  });
  return (
    <>
      {viewportWidth < 1001 ? (
        <IndividualPageHeader />
      ) : (
        <PageRightHeader page_title={`Terms And Conditions`} userlevel="23" />
      )}
      <div className="t-a-c">
        <h1>Edvantage Terms and Conditions</h1>

        <p>Welcome to Edvantage!</p>

        <p>
          Edvantage is a mobile application designed to help university students
          manage their academic and extracurricular lives. By using Edvantage,
          you agree to be bound by these Terms and Conditions
          (&quot;Terms&quot;). Please read these Terms carefully before using
          the app. If you disagree with any part of these Terms, you may not use
          Edvantage.
        </p>

        <h2>1. Eligibility</h2>

        <ul>
          <li>
            <strong>Minimum Age:</strong> You must be at least 13 years old to
            use Edvantage. This is to comply with data privacy regulations like
            COPPA (Children&apos;s Online Privacy Protection Act) in certain
            jurisdictions.{" "}
          </li>
          <li>
            <strong>Legal Capacity:</strong> By using Edvantage, you represent
            and warrant that you are at least 13 years old and have the legal
            capacity to enter into a binding agreement.
          </li>
        </ul>

        <h2>2. User Accounts</h2>

        <ul>
          <li>
            <strong>Account Creation:</strong> You may be required to create an
            account to use certain features of Edvantage, such as saving your
            schedule, to-dos, and assignments.{" "}
          </li>
          <li>
            <strong>Confidentiality:</strong> You are responsible for
            maintaining the confidentiality of your account information,
            including your username and password. Don&apos;t share your login
            credentials with anyone!
          </li>
          <li>
            <strong>Responsibility for Activity:</strong> You agree to be
            responsible for all activities that occur under your account.
          </li>
        </ul>

        <h2>3. User Content</h2>

        <ul>
          <li>
            <strong>Ownership:</strong> You retain all ownership rights to your
            User Content, such as notes, to-do items, and group messages.{" "}
          </li>
          <li>
            <strong>Granting a License:</strong> By uploading User Content, you
            grant Edvantage a non-exclusive, worldwide, royalty-free license to
            use, reproduce, modify, publish, and distribute your User Content in
            connection with the Edvantage app.
          </li>
          <li>
            <strong>Representations and Warranties:</strong> You represent and
            warrant that you have all necessary rights and licenses to grant us
            this license.
          </li>
          <li>
            <strong>Prohibited Content:</strong> You are solely responsible for
            your User Content and agree not to upload, post, or share content
            that is:
          </li>
          <ul>
            <li>Illegal or unlawful</li>
            <li>Infringing on the rights of others</li>
            <li>Defamatory, harassing, or threatening</li>
            <li>Obscene or indecent</li>
            <li>Hateful or discriminatory</li>
            <li>In violation of these Terms</li>
          </ul>
        </ul>

        <p>
          Edvantage reserves the right to remove any User Content that violates
          these Terms at its sole discretion.{" "}
        </p>

        <h2>4. Third-Party Services</h2>

        <ul>
          <li>
            <strong>Integration:</strong> Edvantage may integrate with
            third-party services, such as calendar apps or cloud storage
            services.{" "}
          </li>
          <li>
            <strong>Third-Party Terms:</strong> Your use of these services may
            be subject to the terms and conditions of those third-party
            services. Be sure to review their terms as well.
          </li>
          <li>
            <strong>Edvantage&apos;s Responsibility:</strong> Edvantage is not
            responsible for the content or practices of any third-party
            services. We recommend you understand their policies before using
            them with Edvantage.
          </li>
        </ul>

        <h2>5. Intellectual Property</h2>

        <ul>
          <li>
            <strong>Ownership:</strong> Edvantage and its licensors retain all
            ownership rights in and to the Edvantage app, including its content
            (text, images, code) and design.{" "}
          </li>
          <li>
            <strong>Restrictions on Use:</strong> You may not use any of
            Edvantage&apos;s intellectual property without our prior written
            consent.
          </li>
        </ul>

        <h2>6. Disclaimers</h2>

        <ul>
          <li>
            <strong>&quot;As Is&quot; Provision:</strong> Edvantage is provided
            &quot;as is&quot; and without warranties of any kind, express or
            implied.
          </li>
          <li>
            <strong>Disclaimed Warranties:</strong> Edvantage disclaims all
            warranties, including warranties of merchantability, fitness for a
            particular purpose, and non-infringement.
          </li>
          <li>
            <strong>No Guarantees:</strong> Edvantage does not warrant that the
            app will be uninterrupted or error-free, that defects will be
            corrected, or that the app is free of viruses or other harmful
            components.
          </li>
        </ul>

        <h2>7. Limitation of Liability</h2>

        <p>
          Edvantage will not be liable for any damages arising out of or related
          to your use of the app, including but not limited to direct, indirect,
          incidental, consequential, or punitive damages. This means we are not
          responsible for any financial loss, personal injury, or other harm
          that may result from your use of Edvantage.
        </p>
        <h2>8. Termination</h2>
        <ul>
          <li>
            <strong>Termination by Edvantage:</strong> Edvantage may terminate
            your access to the app at any time, for any reason, with or without
            notice. This could be due to a violation of the terms, inactivity,
            or if we decide to discontinue the app.
          </li>
          <li>
            <strong>Termination by You:</strong> You may also terminate your
            account at any time. This means you can delete your account and stop
            using the app.
          </li>
        </ul>

        <h2>9. Governing Law</h2>
        <p>
          <strong>Applicable Law:</strong> These Terms will be governed by and
          construed in accordance with the laws of [Insert your country]. This
          means that any legal disputes regarding the app will be settled
          according to the laws of your country.
        </p>

        <h2>10. Entire Agreement</h2>
        <p>
          <strong>Complete Agreement:</strong> These Terms constitute the entire
          agreement between you and Edvantage regarding your use of the app.
          This supersedes any prior or contemporaneous communications or
          agreements.
        </p>

        <h2>11. Updates to the Terms</h2>
        <ul>
          <li>
            <strong>Right to Update:</strong> Edvantage may update these Terms
            from time to time. We reserve the right to change the rules of the
            app as needed.
          </li>
          <li>
            <strong>Notice of Updates:</strong> We will post the updated Terms
            on the app. It&apos;s a good idea to check the terms occasionally to
            stay informed.
          </li>
          <li>
            <strong>Acceptance of Updates:</strong> Your continued use of the
            app following the posting of updated Terms constitutes your
            acceptance of the updated Terms. By continuing to use the app, you
            agree to the new terms.
          </li>
        </ul>
        <h2>12. Contact Us</h2>
        <p>
          <strong>Questions or Concerns:</strong> If you have any questions
          about these Terms, please contact us at edvantage.edu.ng@gmail.com. We
          are here to help!
        </p>
      </div>
    </>
  );
  function IndividualPageHeader() {
    function handleRefreshClick() {
      window.history.back();
    }

    return (
      <div className="individual-page-header">
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          onClick={handleRefreshClick}
        >
          <path
            d="M15 8H1M1 8L8 15M1 8L8 1"
            stroke="#101828"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2>Terms &amp; Condition&apos;s</h2>
      </div>
    );
  }
}
