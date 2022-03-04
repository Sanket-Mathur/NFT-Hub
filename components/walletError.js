const WalletError = ({onConnectWallet}) => {
    return (
        <div
  class="
    flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-gradient-to-r
    from-indigo-600
    to-blue-400
  "
>
  <div class="px-40 py-20 bg-white rounded-md shadow-xl">
    <div class="flex flex-col items-center">
      <h1 class="font-bold text-blue-600 text-5xl">There could be following issues:</h1>
      <ul class="list-disc items-left py-10">
            <li class="text-red-500 text-xl">You don't have Metamask wallet installed.</li>
            <li class="text-red-500 text-xl">You are not on Polygon Mumbai Testnet.</li>
            <li class="text-red-500 text-xl">Your wallet is not connected to current website.</li>
      </ul>

      <button
        href="#"
        class="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
        onClick={onConnectWallet}
        > Connect Wallet
    </button>
    </div>
  </div>
</div>
    )
}

export default WalletError;