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

        $refundPolicy = "<h2>Refund Policy</h2> <br>";
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


        $privacyPolicy = "Please read these Terms and Conditions carefully before using the Service. <br>";
        $privacyPolicy .= "Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. <br>";
        $privacyPolicy .= "By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. <br>";
        $privacyPolicy .= "<br><br><h2>Purchases</h2> <br>";
        $privacyPolicy .= "If you wish to purchase any product or service made available through the Service (“Purchase”), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information. <br>";
        $privacyPolicy .= "You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete. <br>";
        $privacyPolicy .= "By submitting such information, you grant us the right to provide the information to third parties for purposes of facilitating the completion of Purchases. <br>";
        $privacyPolicy .= "We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons. <br>";
        $privacyPolicy .= "We reserve the right to refuse or cancel your order if fraud or an unauthorised or illegal transaction is suspected. <br>";
        $privacyPolicy .= "<br><br><h2>Availability, Errors and Inaccuracies</h2> <br>";
        $privacyPolicy .= "We are constantly updating our offerings of products and services on the Service. The products or services available on our Service may be mispriced, described inaccurately, or unavailable, and we may experience delays in updating information on the Service and in our advertising on other web sites. <br>";
        $privacyPolicy .= "We cannot and do not guarantee the accuracy or completeness of any information, including prices, product images, specifications, availability, and services. We reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice. <br>";
        $privacyPolicy .= "<br><br><h2>Accounts</h2> <br>";
        $privacyPolicy .= "When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. <br>";
        $privacyPolicy .= "You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service. <br>";
        $privacyPolicy .= "You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. <br>";
        $privacyPolicy .= "You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trade mark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene. <br>";
        $privacyPolicy .= "<br><br><h2>Intellectual Property</h2> <br>";
        $privacyPolicy .= "The Service and its original content, features and functionality are and will remain the exclusive property of SJ Computers LLC and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of SJ Computers LLC. <br>";
        $privacyPolicy .= "<br><br><h2>Links To Other Web Sites</h2> <br>";
        $privacyPolicy .= "Our Service may contain links to third-party web sites or services that are not owned or controlled by SJ Computers LLC. <br>";
        $privacyPolicy .= "SJ Computers LLC has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that SJ Computers LLC shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services. <br>";
        $privacyPolicy .= "We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit. <br>";
        $privacyPolicy .= "<br><br><h2>Limitation Of Liability</h2> <br>";
        $privacyPolicy .= "In no event shall SJ Computers LLC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose. <br>";
        $privacyPolicy .= "<br><br><h2>Disclaimer</h2> <br>";
        $privacyPolicy .= "Your use of the Service is at your sole risk. The Service is provided on an “AS IS” and “AS AVAILABLE” basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance. <br>";
        $privacyPolicy .= "SJ Computers LLC its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements. <br>";
        $privacyPolicy .= "<br><br><h2>Governing Law</h2> <br>";
        $privacyPolicy .= "These Terms shall be governed and construed in accordance with the laws of Minnesota, United States, without regard to its conflict of law provisions. <br>";
        $privacyPolicy .= "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service. <br>";
        $privacyPolicy .= "<br><br><h2>Changes</h2> <br>";
        $privacyPolicy .= "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. <br>";
        $privacyPolicy .= "By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service. <br>";
        $privacyPolicy .= "Contact Us <br>";
        $privacyPolicy .= "If you have any questions about these Terms, please contact us. <br>";

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
                'value' => "<h2>Term of Services</h2> <br>". " ".$privacyPolicy
            ],
            [
            'key' => 'privacy_policy',
            'value' => "<h2>Privacy Policy</h2> <br>". " ".$privacyPolicy
        ]
        ];

        foreach($systems as $items){
            SystemPage::create($items);
        }
    }
}
