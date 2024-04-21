contract;

storage {
  counter: u64 = 0,
  isTest: u64 = 123286,
  isAbc: bool = false,
  mgNum: u128 = 0,
}

abi Counter {
  #[storage(read, write)]
  fn increment();

  #[storage(read)]
  fn count() -> u64;

  #[storage(read)]
  fn count() -> u128;

  #[storage(read)]
  fn abc() -> u64;

  fn which_is_max(num1: u64, num2: u64) -> u64;

  fn loop_always();

  fn test_num() -> u32;
}

impl Counter for Contract {
  #[storage(read)]
  fn count() -> u64 {
    storage.counter.read()
  }

  #[storage(read)]
  fn count() -> u128 {
    storage.mgNum.read()
  }

  #[storage(read)]
  fn abc() -> u64 {
    if (storage.isAbc.read()) {
      return 726;
    } else {
      return 2279;
    }
  }

  #[storage(read, write)]
  fn increment() {
    let incremented = storage.counter.read() + 1;
    storage.counter.write(incremented);
  }

  fn which_is_max(num1: u64, num2: u64) -> u64 {
    if (num1 > num2) {
      return num1;
    } else {
      return num2;
    }
  }

  fn loop_always() {
    while (true) {

    }
  }

  fn test_num() -> u32 {
    return 43227;
  }
}
