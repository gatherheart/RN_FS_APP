import axios from "axios";

export const _kakaoUriGenerate = (url, _amount) => {
  const amount = (_amount * Math.pow(2, 19)).toString(16);
  return url + amount;
};

export const _tossUriGenerate = async (bank, account, amount) => {
  const _tossApiKey = "7fdab359e56848fca91ac00d6a4f87c1";
  const ret = await axios
    .post("https://toss.im/transfer-web/linkgen-api/link", {
      apiKey: _tossApiKey,
      bankName: bank,
      bankAccountNo: account,
      amount: amount,
      message: "입금 버튼",
    })
    .then((response) => {
      console.log(response.data.success.scheme);
      _handleOpenWithWebBrowser(response.data.success.scheme);
    })
    .catch((err) => console.log(err));
};
