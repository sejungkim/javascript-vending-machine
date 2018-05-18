'use strict';

class Product {
  constructor(name, price, stock) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}

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
    const AvailableListMsg = this.availableList.reduce(
      (resultMsg, item) => resultMsg + ` ${item.name}(${item.price}원),`
      , '').slice(0, -1);

    console.log(`>> 구매 가능한 음료수 :${AvailableListMsg}`);
  }
}

const beverageList = [
  new Product('콜라', 1000, 2),
  new Product('사이다', 1000, 10),
  new Product('포도쥬스', 700, 2),
  new Product('딸기우유', 500, 4),
  new Product('파워에이드', 1000, 0)
];
const beverageVM = new VendingMachine(beverageList);

function insertCoin(amount) {
  beverageVM.changeBalance(amount, { change: '+' });
  beverageVM.getAvailableList();
  beverageVM.showAvailableList();
}

// Run
insertCoin(1000);
