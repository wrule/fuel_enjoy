contract;

storage {
  counter: u64 = 0,
}

abi Counter {
  #[storage(read, write)]
  fn increment();

  #[storage(read)]
  fn count() -> u64;

  fn which_is_max(num1: u64, num2: u64) -> u64;
}

impl Counter for Contract {
  #[storage(read)]
  fn count() -> u64 {
    storage.counter.read()
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
}
