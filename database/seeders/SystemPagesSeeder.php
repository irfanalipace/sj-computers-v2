<?php

namespace Database\Seeders;

use App\Models\System;
use App\Models\SystemPage;
use Illuminate\Database\Seeder;

class SystemPagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SystemPage::whereNotNull('id')->delete();

        $refundPolicy = "<h1>Refund Policy</h1> <br>";
        $refundPolicy .= "All products sold by SJ computers are covered with a 1 Year warranty. <br>";
        $refundPolicy .= "Customers may return any new item(s) that are purchased from SJ Computers, LLC within 30 days of delivery if the item(s) are still in an unopened box or any item(s) that arrives at the customer location damaged or are determined to be defective or “dead on arrival”. <br>";
        $refundPolicy .=  "Once SJ Computers, LLC is notified by the customer of said damaged, defective or “dead on arrival” item(s) by telephone or email, a UPS call tag will be issued for the item(s) return to SJ Computers, LLC. <br>";
        $refundPolicy .=  "Customer reserves the right to request an advance shipment for an identical replacement item(s) for which an original purchase price of the item(s) will be charged to the customer. <br>";
        $refundPolicy .=  "Upon receipt of the item(s) returned from the customer to SJ Computers, LLC and the item(s) are determined to be damaged, defective or “dead on arrival”, SJ Computers, LLC will issue a full refund of the purchase price for the original purchased item(s).  <br>";
        $refundPolicy .=  "SJ Computers, LLC reserves the right to test damaged, defective or “dead on arrival” item(s)  Or Items that are returned to SJ Computers, LLC due to buyer remorse or Bought By mistake are subject to a 20% restocking fee Plus Shipped charges paid by SJ Computers of the original purchase price of the item(s) if any of the following conditions apply: the customer in any way misrepresents the condition of the item(s), the item(s) are damaged due to customer misuse or tampering, there are any missing parts, the item(s) are determined to be in an unsellable condition due to a customer’s actions.  <br>";
        $refundPolicy .=  "Re-stocking and Shipping Fees Will also be applied if the Customer return an item due to Buyer Remorse or Bought By Mistake.  <br>";
        $refundPolicy .=  "Customers Only have 30 mins to cancel the order once an order is placed. We will not be able to cancel the orders after 30 mins Since we want to ship all our orders the same day we receive before our cut off time.  <br>";
        $refundPolicy .=  "SJ Computers, LLC from the date of delivery, will not accept returns of any item(s) purchased after 30 days, We will either Fix or replace the item(s) that are covered under our1 year Warranty.  <br>";
        $refundPolicy .=  "All item(s) that are returned to SJ Computers, LLC, must be in the original packaging in order to receive a full refund for the item ordered. Additional charges will apply for parts replacement, replacement of original packaging, and labor to restore the item(s) to sellable condition.  <br>";
        $refundPolicy .=  "Shipping charges for replacement item(s) for any damaged, defective or “dead on arrival” item(s) will be free of charge to the customer if damaged, defective or “dead on arrival” item(s) are returned within 10 days after notification to SJ Computers, LLC.  <br>";
        $refundPolicy .=  "  <br>";


        $termCondition = "<h1>Term of Services</h1> <br>";
        $termCondition .= "Please read these Terms and Conditions carefully before using the Service. <br>";
        $termCondition .= "Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. <br>";
        $termCondition .= "By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. <br>";
        $termCondition .= "<br><br><h2>Purchases</h2> <br>";
        $termCondition .= "If you wish to purchase any product or service made available through the Service (“Purchase”), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information. <br>";
        $termCondition .= "You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete. <br>";
        $termCondition .= "By submitting such information, you grant us the right to provide the information to third parties for purposes of facilitating the completion of Purchases. <br>";
        $termCondition .= "We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons. <br>";
        $termCondition .= "We reserve the right to refuse or cancel your order if fraud or an unauthorised or illegal transaction is suspected. <br>";
        $termCondition .= "<br><br><h2>Availability, Errors and Inaccuracies</h2> <br>";
        $termCondition .= "We are constantly updating our offerings of products and services on the Service. The products or services available on our Service may be mispriced, described inaccurately, or unavailable, and we may experience delays in updating information on the Service and in our advertising on other web sites. <br>";
        $termCondition .= "We cannot and do not guarantee the accuracy or completeness of any information, including prices, product images, specifications, availability, and services. We reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice. <br>";
        $termCondition .= "<br><br><h2>Accounts</h2> <br>";
        $termCondition .= "When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. <br>";
        $termCondition .= "You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service. <br>";
        $termCondition .= "You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. <br>";
        $termCondition .= "You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trade mark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene. <br>";
        $termCondition .= "<br><br><h2>Intellectual Property</h2> <br>";
        $termCondition .= "The Service and its original content, features and functionality are and will remain the exclusive property of SJ Computers LLC and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of SJ Computers LLC. <br>";
        $termCondition .= "<br><br><h2>Links To Other Web Sites</h2> <br>";
        $termCondition .= "Our Service may contain links to third-party web sites or services that are not owned or controlled by SJ Computers LLC. <br>";
        $termCondition .= "SJ Computers LLC has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that SJ Computers LLC shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services. <br>";
        $termCondition .= "We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit. <br>";
        $termCondition .= "<br><br><h2>Limitation Of Liability</h2> <br>";
        $termCondition .= "In no event shall SJ Computers LLC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose. <br>";
        $termCondition .= "<br><br><h2>Disclaimer</h2> <br>";
        $termCondition .= "Your use of the Service is at your sole risk. The Service is provided on an “AS IS” and “AS AVAILABLE” basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance. <br>";
        $termCondition .= "SJ Computers LLC its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements. <br>";
        $termCondition .= "<br><br><h2>Governing Law</h2> <br>";
        $termCondition .= "These Terms shall be governed and construed in accordance with the laws of Minnesota, United States, without regard to its conflict of law provisions. <br>";
        $termCondition .= "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service. <br>";
        $termCondition .= "<br><br><h2>Changes</h2> <br>";
        $termCondition .= "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. <br>";
        $termCondition .= "By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service. <br>";
        $termCondition .= "Contact Us <br>";
        $termCondition .= "If you have any questions about these Terms, please contact us. <br>";



        $privacyPolicy = "<h1>Privacy Policy for SJ Computers LLC</h1> <br>";
        $privacyPolicy .= "<p>At SJ Computers, accessible from www.sjcomputers.us, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SJ Computers and how we use it. </p>";
        $privacyPolicy .= "<p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. </p>";
        $privacyPolicy .= "<p>This Privacy Policy applies only to our online activities and is valid for visitors to our website regarding the information that they shared and/or collect in SJ Computers. This policy is not applicable to any information collected offline or via channels other than this website. </p>";
        $privacyPolicy .= "<br><br><h2>Consent</h2> <br>";
        $privacyPolicy .= "<p>By using our website, you hereby consent to our Privacy Policy and agree to its terms. </p>";
        $privacyPolicy .= "<br><br><h2>Information we collect</h2><br>";
        $privacyPolicy .= "<p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. </p>";
        $privacyPolicy .= "<p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide. </p>";
        $privacyPolicy .= "<p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number. </p>";
        $privacyPolicy .= "<br><br><h2>How we use your information</h2><br>";
        $privacyPolicy .= "<p>We use the information we collect in various ways, including to:</p>";
        $privacyPolicy .= "<ul>";
        $privacyPolicy .= "<li>Provide, operate, and maintain our website</li>";
        $privacyPolicy .= "<li>Improve, personalize, and expand our website</li>";
        $privacyPolicy .= "<li>Understand and analyze how you use our website</li>";
        $privacyPolicy .= "<li>Develop new products, services, features, and functionality</li>";
        $privacyPolicy .= "<li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>";
        $privacyPolicy .= "<li>Send you emails</li>";
        $privacyPolicy .= "<li>Find and prevent fraud</li>";
        $privacyPolicy .= "</ul>";
        $privacyPolicy .= "<br><br><h2>Log Files</h2><br>";
        $privacyPolicy .= "<p>SJ Computers follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. </p>";
        $privacyPolicy .= "<br><br><h2>Cookies and Web Beacons</h2><br>";
        $privacyPolicy .= "<p>Like any other website, SJ Computers uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information. </p>";
        $privacyPolicy .= "<br><br><h2>Google DoubleClick DART Cookie</h2><br>";
        $privacyPolicy .= "<p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href='https://policies.google.com/technologies/ads'>https://policies.google.com/technologies/ads</a></p>";
        $privacyPolicy .= "<br><br><h2>Our Advertising Partners</h2><br>";
        $privacyPolicy .= "<p>Some of the advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below. </p>";
        $privacyPolicy .= "<ul>";
        $privacyPolicy .= " <li> <p>Google</p><p><a href='https://policies.google.com/technologies/ads'>https://policies.google.com/technologies/ads</a></p></li>";
        $privacyPolicy .= "</ul>";
        $privacyPolicy .= "<br><br><h2>Advertising Partners Privacy Policies</h2><br>";
        $privacyPolicy .= "<P>You may consult this list to find the Privacy Policy for each of the advertising partners of SJ Computers. </p>";
        $privacyPolicy .= "<p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on SJ Computers, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. </p>";
        $privacyPolicy .= "<p>Note that SJ Computers has no access to or control over these cookies that are used by third-party advertisers. </p>";
        $privacyPolicy .= "<br><br><h2>Third Party Privacy Policies</h2><br>";
        $privacyPolicy .= "<p>SJ computers’ Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>";
        $privacyPolicy .= "<p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites. </p>";
        $privacyPolicy .= "<br><br><h2>CCPA Privacy Rights (Do Not Sell My Personal Information) </h2><br>";
        $privacyPolicy .= "<p>Under the CCPA, among other rights, California consumers have the right to:</p>";
        $privacyPolicy .= "<p>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers. </p>";
        $privacyPolicy .= "<p>Request that a business delete any personal data about the consumer that a business has collected. </p>";
        $privacyPolicy .= "<p>Request that a business that sells a consumer's personal data, not sell the consumer's personal data. </p>";
        $privacyPolicy .= "<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us. </p>";
        $privacyPolicy .= "<br><br><h2>GDPR Data Protection Rights</h2><br>";
        $privacyPolicy .= "<p>We would like to make sure you are fully aware of all your data protection rights. Every user is entitled to the following:</p>";
        $privacyPolicy .= "<p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service. </p>";
        $privacyPolicy .= "<p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete. </p>";
        $privacyPolicy .= "<p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions. </p>";
        $privacyPolicy .= "<p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions. </p>";
        $privacyPolicy .= "<p>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions. </p>";
        $privacyPolicy .= "<p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions. </p>";
        $privacyPolicy .= "<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us. </p>";
        $privacyPolicy .= "<br><br><h2>Children's Information</h2><br>";
        $privacyPolicy .= "<p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. </p>";
        $privacyPolicy .= "<p>SJ Computers does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records. </p>";
        $privacyPolicy .= "<br><br><h2>Changes to This Privacy Policy</h2><br>";
        $privacyPolicy .= "<p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page. </p>";
        $privacyPolicy .= "<p>Our Privacy Policy was created with the help of the <a href='https://www.privacypolicygenerator.info'>Privacy Policy Generator</a>. </p>";
        $privacyPolicy .= "<br><br><h2>Contact Us</h2><br>";
        $privacyPolicy .= "<p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us. </p>";

        $systems = [
            [
                'key' => 'return_refund_policy',
                'value' => $refundPolicy
            ],
            [
                'key' => 'shipping_policy',
                'value' => ''
            ],
            [
                'key' => 'term_services',
                'value' => $termCondition
            ],
            [
            'key' => 'privacy_policy',
            'value' => $privacyPolicy
            ]
        ];

        foreach($systems as $items){
            SystemPage::create($items);
        }
    }
}
