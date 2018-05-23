'use strict';

class VendingMachine {
  constructor(productList) {
    this.balance = 0;
    this.productList = productList;
  }

  changeBalance(amount, { change }) {
    if (change === '+') {
      this.balance += amount;
    }
    else if (change === '-') {
      this.balance -= amount;
    }

    console.log(`>> 현재 잔액 : ${this.balance}원`);
  }

  getAvailableList() {
    this.availableList = this.productList.filter(
      item => (item.price <= this.balance) && (item.stock !== 0)
    );
  }

  showAvailableList() {
    let availableListMsg = this.availableList.reduce(
      (resultMsg, item) => resultMsg + ` ${item.name}(${item.price}원),`
      , ''
    ).slice(0, -1);

    if (!availableListMsg) availableListMsg = ' 없음';
    console.log(`>> 구매 가능한 음료수 :${availableListMsg}`);
  }

  getSelectedItem(itemName) {
    const itemIndex = this.availableList.findIndex(
      item => item.name === itemName
    );
    return this.availableList[itemIndex];
  }
}

const beverageList = [{
  'name': '콜라',
  'price': 1000,
  'stock': 2
},
{
  'name': '사이다',
  'price': 1000,
  'stock': 10
},
{
  'name': '포도쥬스',
  'price': 700,
  'stock': 2
},
{
  'name': '딸기우유',
  'price': 500,
  'stock': 4
},
{
  'name': '파워에이드',
  'price': 1000,
  'stock': 0
}];
const beverageVM = new VendingMachine(beverageList);

function insertCoin(amount) {
  beverageVM.changeBalance(amount, { change: '+' });
  beverageVM.getAvailableList();
  beverageVM.showAvailableList();
}

function selectItem(itemName) {
  const selectedItem = beverageVM.getSelectedItem(itemName);
  if (!selectedItem) return console.log(`>> [!] 선택할 수 없는 상품입니다.`);
  console.log(`>> "${selectedItem.name}"가/이 나왔습니다.\n`);

  beverageVM.changeBalance(selectedItem.price, { change: '-' });
  selectedItem.stock -= 1;

  beverageVM.getAvailableList();
  beverageVM.showAvailableList();
}

function returnMoney() {
  console.log(`>> "${beverageVM.balance}원"이 반환됐습니다.`);
  beverageVM.balance = 0;
}

// Run
insertCoin(2100);
selectItem('포도쥬스');
selectItem('딸기우유');
selectItem('콜라');
returnMoney();