
export default function Summary(){
    return(
        <>
            <div class="border border-zinc-300 rounded-2xl p-5 w-[450px]">
            <div class="font-bold text-[20px] mb-3">
              Payment Summary
            </div>

            <div class="grid grid-cols-[1fr_auto] text-base mb-2.5">
              <div>Items ({3}):</div>
              <div class="text-right">$42.75</div>
            </div>

            <div class="grid grid-cols-[1fr_auto] text-base mb-2.5">
              <div>Shipping &amp; handling:</div>
              <div class="text-right">$4.99</div>
            </div>

            <div class="grid grid-cols-[1fr_auto] text-base mb-2.5 subtotal-row">
              <div>Total before tax:</div>
              <div class="text-right">$47.74</div>
            </div>

            <div class="grid grid-cols-[1fr_auto] text-base mb-2.5 payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="text-right">$4.77</div>
            </div>

            <div class="grid grid-cols-[1fr_auto] text-base mb-2.5 total-row">
              <div>Order total:</div>
              <div class="text-right">$52.51</div>
            </div>

            <button class="w-full py-3 rounded button-primary">
              Place your order
            </button>
            </div>
        </>
    );
}