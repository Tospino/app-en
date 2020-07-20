<template>
<!-- 帮助中心 -->
    <div class="help-center">
        <div class="title" v-if="showTitle">Tospino’s Help Center</div>
        <p>
            <br><span class="jiacu">1.My Order</span>
            <br><span class="jiacu">①Change/Cancel the Order</span>
            <br>Users can cancel the order on Tospino before the delivery. 
            <br>Operations: Click “Account”, “My order”, “Undelivered” and “Cancel the Order” respectively.
            <br>Users have to cancel the original order first if they want to change it, and then re-order the relevant product.
            <br><span class="jiacu">Attention:</span> Users cannot cancel the order if it is being delivered. To avoid the complex Return & Refund procedures, you can reject the package directly after its arrival.
            <br><span class="jiacu">Note:</span> In rare case, due to the system design, users may fail to cancel the order even if they have clicked the button-”Cancel the Order”. You can reject the product after its arrival. The platform will refund your money after the warehousing of the rejection.
            <br><span class="jiacu">②Check the Order</span>
            <br>You can check the order on Tospino after the delivery to know the delivery process by clicking into “Account” and “My order”. 
            <br>
            <br><span class="jiacu">③Pay by</span>
            <br>Cash
            <br>Balance（VISA/MasterCard、Mobile Money -MTN Mobile money,AirtelTigo,Vodafone Cash）
            <br>
            <br><span class="jiacu">Attention:</span> If buyers choose COD, they should pay for the products on the scene after its arrival. Our transportation specialist will not give you the product if you fail to pay the product in full.
            <br>
            <br><span class="jiacu">2.Delivery and Dispatching</span>
            <br><span class="jiacu">①Methods of Dispatching and Date of Delivery</span>
            <br>All orders on Tospino are dispatched by our official teams. Tospino warehouse will send out packages within 72 hours after the ordering.
            <br>
            <br><span class="jiacu">②Delivery Range</span>
            <br>All regions
            <br>
            <br><span class="jiacu">③Time Needed for Dispatching</span>
            <br>The time needed for dispatching is within 0.5 or 15 hours according to the shipping address. There may be a delay when the weather is bad. Wait and ensure your phone is available
            <br>
            <br><span class="jiacu">3.Return & Refund</span>
            <br><span class="jiacu">②Return Items</span>
            <br>Door-to-door return service on Tospino: 
            <br>After the receiving of product, buyers can contact customer service personnel and apply for return within 7 days if they find any quality problems and ask for return.  
            <br><span class="jiacu">Rules of Return</span>
            <br>Tospino guarantees that the product is access to Return within 7 days after the agreement is signed or the order is Done. Return is impossible after this 7-day period.We propose that buyers contact customer service personnel or send the product to maintenance center if there are any warranty. 
            <br>
            <br>Except for commodities with the product details page being specifically labeled or confirmed that “it does not support return & refund”while it is being purchasing, all other commodities on Tospino can apply for Return & Refund service within 365 days after the arrival at shipping address as long as the commodities are intact and no damages, and within the shelf life with all attachments complete, which means the selling of commodities will not be affected.
            <br>
            <br>
            <br><span class="jiacu">Standards of Product Integrity</span>
            <br>Customers must ensure the integrity of product and its related data, including label,brochure, warranty card and network card. The product quality should be the same as its original one. There is no damage to its functions and anti-fake markings or no wrong operation of activating the network card.(That means there is no trace of using products or no action of misusing it under the authorization.)
            <br>The outer packing is part of product. Therefore, it should be returned integrally without any serious damages or stains. External Packing is the original design created by manufacturer（it is the smallest sales unit). The secondary packing by logistics providers is not included.
            <br>The loss or damage of gifts or invoices will affect the Return. Tospino will take 10 percent of the product price from buyer’s account if gifts are lost or damaged,and will not return them the taxation of product if the invoice is lost.
            <br>The external packing of these products, including cosmetics, personal care products, books, baby dippers and digital products, should be the hermetic package and should not be opened. Hermetic Package is the integral plastic outside sealing created by manufacturer. 
            <br>You should shoot or video the damaged product with your phone and provide them to customer service personnel as evidences when you apply for return. Transportation specialist will carry out door-to-door pickup service within 3 days if the conditions of return are met. Ensure your phone is available and the product is integral.
            <br><span class="jiacu">Note:</span> Please return gifts and invoices when you return the goods.
            <br><span class="jiacu">Attention:</span> The product should be returned to warehouse in around 7 days after the processing of return application according to the dates and methods of payment, such as COD or Balance. Thereafter, Tospino will refund you the balance/cash, if any, after the approval.
            <br><span class="jiacu">After-sale Service Operations: </span>
            <br>Click “My”- “My Order”- “Finish”; choose the order needs after-sales services and click “Return & Refund”; choose the reason for returning and upload an evidence (about received products)
            <br>
            <br><span class="jiacu">Should buyers return all of products?</span>
            <br>Buyers don’t need to return all of products of the order, but those goods have problems and need to return.
            <br>Should buyers return the free gift when they ask for return?
            <br>Absolutely. Buyers should return the gift of the order; otherwise, we will deduct some amount of money.
            <br>Should buyers pay the freight of return?
            <br>It depends. Tospino will pay shipping charge if the return is caused by product quality. But buyers have to pay for shipping if the return is resulted from personal factors.
            <br><span class="jiacu">Attention:</span>
            <br>Tospino will not accept the return of products as follows.
            <br>-Bought from other platforms instead of Tospino. (The Order No. is wrong.)
            <br>-Run out of expired date. (The warranty is expired.)
            <br>-Unauthorized maintenance of wrong operations and damages of labels or specifications, such as crash, liquid soaking, modification, accidents, etc..  
            <br>-Warranty card is not consistent with the products, or is changed.
            <br>-Such products as underwear, adult products and the like.
            <br>Tospino will not accept the return in the case of such conditions:
            <br>The product size is not suitable; or customers do not like the product for its color, material and style. 
            <br>We advice buyers to seriously read the specification of product integrity and ensure the merchandise is what you truly want before you order. 
            <br><span class="jiacu">②Exchange Items</span>
            <br>Buyers can contact customer service personnel to exchange items due to the quality of product or the damage caused during the transmission.
            <br><span class="jiacu">Ways of Exchanging Items:</span>
            <br>Buyers should send the product to the nearest warehouse. After the inspection, personnel will exchange the product directly if the exchange requirement is met.
            <br>Buyers choose door-to-door exchange service by providing product size and number to customer service personnel. The transportation specialist will exchange the product by door-to-door pickup service within 3 days.
            <br><span class="jiacu">After-sale Service Operations: </span>
            <br>Click “My”- “My Order”- “Finish”; choose the order needs after-sales services and click “Return & Refund”; choose the reason for returning and upload an evidence (about received products)

            <br><span class="jiacu">③Refund</span>
           <br> After approving the return application when the commodities are returned back to the warehouse, Tospino will arrange the refund service for you.
            <br>
            <br><span class="jiacu">The refund will be processed according to the methods of payment, the status of delivery and the delivery time. Be patient while waiting for your refund.</span>
            <br>
            <br>1.For the pending delivery order paid by balance, return & refund process should be applied by clicking “My”-”My Order”-”Pending Delivery”-”Cancel”. The customer service personnel will check the reason for refunding on the background to process the application. If it is approved, the refund will be directly transferred to the account balance.
            <br>
            <br>2.For the delivered and finished order paid by balance, return & refund process should be applied by clicking “My”-”My Order”-”Finish”; choose the order and click “Return & Refund”; fill in the reason for refunding and the refund amount; and upload the evidence. The customer service personnel will contact the user after checking the reason for refunding. If it is approved, the refund will be directly transferred to the account balance.
            <br>
            <br>3.For the delivered and finished order paid by cash, return & refund process should be applied by clicking “My”-”My Order”-”Finish”; choose the order and click “Return & Refund”; fill in the reason for refunding and the refund amount; and upload the evidence. The customer service personnel will contact the user after checking the reason for refunding. If it is approved, the commodity amount will be directly refunded to the user when the courier go and pick up the commodities. 
            <br>                                                                            
            <br>
            <br><span class="jiacu">4.Account</span>
            <br><span class="jiacu">①How to Cancel My Account?</span>
            <br>At present, Tospino's account cannot be directly canceled. If you want to change the current one and continue to use Tospino, click “Log Out ”to switch the account.
            <br>
            <br><span class="jiacu">②Change Account Information</span>
            <br>If you need to modify such basic personal information as name, phone number and email address, click into “My”, “Settings” and “Account and Security”respectively.
            <br>
            <br><span class="jiacu">③How to Change the Password?</span>
            <br>a. Modify the login password
            <br>You can enter into the interface of changing passwords by clicking into “My”, “Settings” and “Account and Security”respectively, enter the previous and new passwords, and "Save" the change.
            <br>b. Change payment password
            <br>You can enter into the interface of payment by clicking "My"-"Settings"-"Account and Security" respectively, enter the current login password and the new password and click "Confirm" to complete the modification.
            <br>
            <br><span class="jiacu">④If You Forgot Your Password</span>
            <br>On the login interface, click "Forgot Password" and follow the prompts.
            <br>
            <br><span class="jiacu">⑤How to Switch / Logout Account</span>
            <br>
            <br>a. Click "My" drop-down setting and select "Exit Account"
            <br>b. Click "Logout"
            <br>c. Enter your account information to complete re-login
            <br>
            <br><span class="jiacu">⑥Add / modify shipping address</span>
            <br>a. Click "My" , pull down to the end and click “Log Out”;
            <br>b. Click "My Shipping Address";
            <br>c. Click “Add”to fill in the information and click “Save”.
            <br>On the "Shipping Address" page, you can check the default address. The system will automatically select your default shipping address when each order is submitted..
        </p>
    </div>
</template>

<script>
export default {
    props: {
        showTitle:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="less">
.help-center{
    width: 100vw;
}
.title{
    margin:72px 0 41px;
    font-weight:bold;
    font-size:32px;
    text-align: center;
}
p{
    padding: 0 30px 131px;
    font-size:26px;
    line-height:39px;
    color: #333;
    word-wrap:break-word
}
.jiacu{
    font-size:30px;
    font-weight: bold;
}
</style>
