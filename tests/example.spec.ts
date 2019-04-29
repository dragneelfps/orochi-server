import { expect } from 'chai';

const dbRead = async (input: number): Promise<number> => {
  return input;
}

describe('db', function () {
  let dbVal: number;
  before(async function () {
    dbVal = await dbRead(1);
    console.log('hellow')
  })

  it("read val is 1", function () {
    expect(dbVal).to.equal(12);
  })

  it("read val is not 12", function () {
    expect(dbVal).to.not.equal(12);
  })

})