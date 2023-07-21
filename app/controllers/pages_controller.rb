class PagesController < ApplicationController
  def start
    unique_id = SecureRandom.hex(5)
    code = SecureRandom.hex(2)
    order_id = SecureRandom.hex(6)

    key = Eth::Key.new
    private_key = key.private_hex
    public_key = key.public_hex
    address = key.address

    amount = 0

    client = Client.new(
      url: unique_mixage_path(unique_id),
      unique_id: unique_id,
      order_id: order_id,
      code: code,
      address: address,
      amount: amount,
      public_key: public_key,
      private_key: private_key
    )
    client.save

    redirect_to unique_mixage_path(unique_id)
  end

  def mixage
    @unique_id = params[:unique_id]
    client = Client.where(unique_id: @unique_id).first
    @address = client.address

    @code = client.code
    @order_id = client.order_id
    @url = client.url
    @amount = client.amount

    web3 = Web3::Eth::Rpc.new(host: 'mainnet.infura.io', port: 443, connect_options: {
      open_timeout: 20,
      read_timeout: 140,
      use_ssl: true,
      rpc_path: '/v3/f0def048cead4285bbe803dbb119fce5'
    })
  end

  def check_transaction
    response = RestClient.get 'http://api.etherscan.io/api?module=account&action=txlist&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&startblock=0&endblock=99999999&sort=asc&apikey=GB7QBMB8HJE1X3RCAWHQCIZ86YIYQ6B2CV6h7rm6zvk2tlwfy3xkypsgdw'
    json = response.body
    parsed = JSON.parse(json)

    if parsed["message"].nil?
      render :json => {"response": "ok"}
    else
      render :json => {"response": "not ok"}
    end

    @unique_id = params[:unique_id]
    client = Client.where(unique_id: @unique_id).first

    client.amount = parsed["result"]["0"]["value"]
  end
end
