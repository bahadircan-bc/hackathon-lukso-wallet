export default function SignUpBahadir() {
  const handleClick = () => {
    console.log("auth");
    window.open(
      `https://4f73-212-2-212-152.ngrok-free.app/api/auth`,
      "_blank",
      "height=600,width=400"
    );
  };
  return (
    <div className="flex bg-red-500 w-1/2 aspect-square items-center justify-center">
      <div className="cursor-pointer" onClick={handleClick}>
        hello
      </div>
    </div>
  );
}
// https://devsunify.com/?code=AQBVR1ZScvB-0GWcb-bvbb2oc4d1lWKsvkl2TzPLg9Z4AcpnSses8XPH9r8rXQgDDcTx3KltarhqxOoyMpR6kf9q-0i14ulB-s42cPeYE_kY64tkyxhsmz8PSh5jnFw8gjJVSzTHSlIWgK-LXyWP0EUjgI4H4bEAzGyq9kY1gN7BSO0ytV-aQO6zguXLPLZjHCexYtZcApDjcaieGWW1w6ieEAhVTmatOg6JxOtlV57L0A#_